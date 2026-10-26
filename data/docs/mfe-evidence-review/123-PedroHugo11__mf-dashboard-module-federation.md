---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Repository overview

React dashboard proof of concept with three independent root-level Vite projects, without workspace: `shell` (host), `mfe-weather` and `mfe-counter` (remotes). All three are frontend units with their own manifests, entries and builds (#11, #12, #13).

Module Federation chain is complete in both relationships:
- **Dependency:** `@originjs/vite-plugin-federation` `^1.4.1`, declared in three units (#1, #2, #3).
- **Configuration:** each remote names itself (`counter`, `weather`), generates `remoteEntry.js`, exposes `./Widget` and shares `react` and `react-dom` (#4, #5); shell declares both remotes through URLs and shares same libraries (#6).
- **Code:** shell imports `weather/Widget` and `counter/Widget` through `React.lazy` (#7, #8) and renders both components in cards of same grid, under `Suspense` (#9, #10).
- **Relationship:** active shell → mfe-weather and shell → mfe-counter relationships result (#14, #15).

Three builds are separate, without observed deployment: only way to serve builds is local `vite preview` (#16, #17, #18). Remote URLs in shell are fixed at `localhost`, on ports 4173 and 4174, absent from remote configurations; they depend on previews starting in README order (#6, #14, #15). This limits execution to one machine without changing composition.

Documentation is root README. Ten of eleven claims are corroborated by observations above (#19 through #25, #27 through #29). Sole claim without artifact is independent deployment (#26): no Dockerfile, CI or hosting exists in snapshot, and three applications have `not observed` deployment. History has 4 commits on one day and generated no points because earlier reviews left no ambiguity. Nothing remains ambiguous in snapshot.

## Observations

### 1. mfe-counter/package.json:13

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `dependencies`.

**Interpretation:** Federation technology is present in mfe-counter build.

### 2. mfe-weather/package.json:13

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `dependencies`.

**Interpretation:** Federation technology is present in mfe-weather build.

### 3. shell/package.json:13

**Observation:** `@originjs/vite-plugin-federation` (`^1.4.1`) is declared in `dependencies`.

**Interpretation:** Federation technology is present in shell build.

### 4. mfe-counter/vite.config.ts:3, 14-21

**Observation:** `vite.config.ts` imports `federation` and invokes it in `plugins` with `name: "counter"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/bootstrap" }` and `shared: ["react", "react-dom"]`.

**Interpretation:** Mfe-counter is configured as Module Federation remote, with own name and a module exposed to a host.

**Note:** `server.port: 5174` (lines 6-8) is development port and excluded.

### 5. mfe-weather/vite.config.ts:3, 14-21

**Observation:** `vite.config.ts` imports `federation` and invokes it in `plugins` with `name: "weather"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/bootstrap" }` and `shared: ["react", "react-dom"]`.

**Interpretation:** Mfe-weather is configured as Module Federation remote, with own name and a module exposed to a host.

**Note:** `server.port: 5173` (lines 6-8) is development port and excluded.

### 6. shell/vite.config.ts:3, 14-20

**Observation:** `vite.config.ts` imports `federation` and invokes it in `plugins` with `remotes: { weather: "http://localhost:4173/assets/remoteEntry.js", counter: "http://localhost:4174/assets/remoteEntry.js" }` and `shared: ["react", "react-dom"]`.

**Interpretation:** Host configuration declares both remotes, with names matching their self-declared names (#4, #5), and local address of each.

**Note:** `server.port: 5175` (lines 6-8) is development port and excluded.

### 7. shell/src/App.tsx:3

**Observation:** `const WeatherWidget = React.lazy(() => import("weather/Widget"));`

**Interpretation:** Shell loads `./Widget` module from remote `weather` by name at runtime.

### 8. shell/src/App.tsx:4

**Observation:** `const CounterWidget = React.lazy(() => import("counter/Widget"));`

**Interpretation:** Shell loads `./Widget` module from remote `counter` by name at runtime.

### 9. shell/src/App.tsx:19; shell/src/App.tsx:17-21

**Observation:** `<WeatherWidget />`, inside `<Suspense fallback={<CardSkeleton title="Weather" />}>` and `<WidgetCard title="Weather">`. Component comes from `React.lazy` on line 3.

**Interpretation:** Shell renders federated weather component in dashboard card.

### 10. shell/src/App.tsx:25; shell/src/App.tsx:23-27

**Observation:** `<CounterWidget />`, inside `<Suspense fallback={<CardSkeleton title="Counter" />}>` and `<WidgetCard title="Counter">`. Component comes from `React.lazy` on line 4.

**Interpretation:** Shell renders federated counter component in dashboard card.

### 11. mfe-counter; mfe-counter/package.json:1-31; mfe-counter/index.html:10-11; mfe-counter/src/main.tsx:4-6; mfe-counter/vite.config.ts:5-23; mfe-counter/package.json:8

**Observation:** Directory with own `package.json`, `index.html` loading `/src/main.tsx`, entry mounting `CounterWidget` with `ReactDOM.createRoot`, own `vite.config.ts` and `build` script `tsc -b && vite build`. No workspace.

**Interpretation:** Frontend unit with its own boundary, also running standalone.

### 12. mfe-weather; mfe-weather/package.json:1-31; mfe-weather/index.html:10-11; mfe-weather/src/main.tsx:4-6; mfe-weather/vite.config.ts:5-23; mfe-weather/package.json:8

**Observation:** Directory with own `package.json`, `index.html` loading `/src/main.tsx`, entry mounting `WeatherWidget` with `ReactDOM.createRoot`, own `vite.config.ts` and `build` script `tsc -b && vite build`. No workspace.

**Interpretation:** Frontend unit with its own boundary, also running standalone.

### 13. shell; shell/package.json:1-31; shell/index.html:10-11; shell/src/main.tsx:5-7; shell/vite.config.ts:5-22; shell/package.json:8

**Observation:** Directory with own `package.json`, `index.html` loading `/src/main.tsx`, entry mounting `App` with React, own `vite.config.ts` and `build` script `tsc -b && vite build`. No workspace.

**Interpretation:** Frontend unit with its own boundary, containing federated imports (#7, #8).

### 14. shell/src/App.tsx:3; shell/src/App.tsx:19; shell/vite.config.ts:16, 19; mfe-weather/vite.config.ts:15-18; mfe-weather/src/bootstrap.tsx:1-2

**Observation:** Shell specifier `weather/Widget` matches remote `weather` (`http://localhost:4173/assets/remoteEntry.js`) in shell configuration and, in mfe-weather, `name: "weather"` and key `./Widget`, pointing to `src/bootstrap`, reexporting `WeatherWidget`. Component is rendered in card "Weather". Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from shell to mfe-weather. Target resolved through name and exposed key; port 4173 depends on weather preview starting first (README.md:67-69).

### 15. shell/src/App.tsx:4; shell/src/App.tsx:25; shell/vite.config.ts:17, 19; mfe-counter/vite.config.ts:15-18; mfe-counter/src/bootstrap.tsx:1-2

**Observation:** Shell specifier `counter/Widget` matches remote `counter` (`http://localhost:4174/assets/remoteEntry.js`) in shell configuration and, in mfe-counter, `name: "counter"` and key `./Widget`, pointing to `src/bootstrap`, reexporting `CounterWidget`. Component is rendered in card "Counter". Relationship has In snapshot `Yes` and Active `Yes`.

**Interpretation:** An active Module Federation host → remote relationship from shell to mfe-counter. Port 4174 corresponds to second `vite preview` in README sequence (README.md:71-73).

### 16. mfe-counter/package.json:8; mfe-counter/vite.config.ts:5-23; mfe-counter/package.json:10

**Observation:** Script `build` `tsc -b && vite build` with own `vite.config.ts`, generating `remoteEntry.js` of remote `counter`. Sole command serving build is local `vite preview`. No Dockerfile, CI or hosting configuration. `version: "0.0.0"` with `private: true`.

**Interpretation:** Mfe-counter has separate build. Deployment unobserved, and no versioning used in publication.

### 17. mfe-weather/package.json:8; mfe-weather/vite.config.ts:5-23; mfe-weather/package.json:10

**Observation:** Script `build` `tsc -b && vite build` with own `vite.config.ts`, generating `remoteEntry.js` of remote `weather`. Sole command serving build is local `vite preview`. No Dockerfile, CI or hosting configuration. `version: "0.0.0"` with `private: true`.

**Interpretation:** Mfe-weather has separate build. Deployment unobserved, and no versioning used in publication.

### 18. shell/package.json:8; shell/vite.config.ts:5-22

**Observation:** Script `build` `tsc -b && vite build` with own `vite.config.ts`, storing only `localhost` URLs of `remoteEntry.js` files, without remote code. No Dockerfile, CI or hosting configuration. `version: "0.0.0"` with `private: true`.

**Interpretation:** Shell has separate build, only working against remotes served on same machine. Deployment unobserved, and no versioning used in publication.

### 19. README.md:3

**Observation:** "demonstrate the usage of **Microfrontends with Module Federation** using **Vite, React and TypeScript**"

**Interpretation:** Claims project has micro-frontends linked through Module Federation. Three units (#11, #12, #13) and two Module Federation relationships (#14, #15) confirm claim.

### 20. README.md:5

**Observation:** "focusing on **application decoupling**, **independent builds**, and **runtime loading of remote front-end applications**"

**Interpretation:** Claims decoupling, independent builds and runtime loading. Three separate builds (#16, #17, #18), imports through `React.lazy` (#7, #8) and active relationships (#14, #15) confirm three points.

### 21. README.md:11

**Observation:** "The application is composed of three independent front-end applications"

**Interpretation:** Claims three independent frontend applications, the three snapshot units (#11, #12, #13).

### 22. README.md:13-14

**Observation:** "**Shell (Host)** Responsible for layout, orchestration and dynamically loading the microfrontends."

**Interpretation:** Assigns shell host role loading micro-frontends. Shell loads both remotes (#7, #8) and originates both relationships (#14, #15).

### 23. README.md:16-17

**Observation:** "**Weather Microfrontend** A standalone widget exposed remotely and loaded by the Shell."

**Interpretation:** Claims weather runs standalone, is exposed and loaded by shell. Unit with own entry (#12), `./Widget` exposure (#5), shell relationship (#14) and entry mounting widget standalone (mfe-weather/src/main.tsx:4-6) confirm claim.

### 24. README.md:19-20

**Observation:** "**Counter Microfrontend** Another standalone widget, independently built and consumed by the Shell."

**Interpretation:** Claims counter runs standalone, has own build and is consumed by shell. Unit (#11), separate build (#16), shell relationship (#15) and entry mounting widget standalone (mfe-counter/src/main.tsx:4-6) confirm claim.

### 25. README.md:22, 24

**Observation:** "Each microfrontend: […] Can be developed […] independently"

**Interpretation:** Claims independent development of each micro-frontend. Each remote has own manifest, `dev`, `build` and `preview` scripts and an entry running without shell (#11, #12; mfe-weather/package.json:6-11; mfe-counter/package.json:6-11), confirming claim.

### 26. README.md:22, 24

**Observation:** "Each microfrontend: […] Can be […] deployed independently"

**Interpretation:** Claims independent deployment of each micro-frontend. No snapshot artifact deploys: three applications have unobserved deployment (#16, #17, #18). Claim remains uncorroborated; fixed `localhost` URLs neither refute nor support it.

### 27. README.md:22, 25

**Observation:** "Each microfrontend: […] Is loaded at runtime via Module Federation"

**Interpretation:** Claims runtime loading through Module Federation. Federated imports through `React.lazy` (#7, #8) and both active relationships (#14, #15) confirm claim.

### 28. README.md:32-33

**Observation:** "**Module Federation** (`@originjs/vite-plugin-federation`)"

**Interpretation:** Names federation technology, same one declared in three units (#1, #2, #3) and used in both relationships (#14, #15).

### 29. README.md:45

**Observation:** "Integration of multiple applications in a single UI"

**Interpretation:** Claims integration of multiple applications in one interface. Both remote widgets render in cards of same shell grid (#9, #10; shell/src/App.tsx:16-28).

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (mfe-counter/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #4 |
| 2 | 3.4.2 (mfe-weather/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #5 |
| 3 | 3.4.2 (shell/package.json:13) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 4 | 3.4.2 (mfe-counter/package.json:13, Evidence); 3.4.3 (mfe-counter, Markers and Build); 3.4.4 (shell/src/App.tsx:4, Observation); 3.4.5 #2 (Configuration); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #11; configures #15 |
| 5 | 3.4.2 (mfe-weather/package.json:13, Evidence); 3.4.3 (mfe-weather, Markers and Build); 3.4.4 (shell/src/App.tsx:3, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #5 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #12; configures #14 |
| 6 | 3.4.2 (shell/package.json:13, Evidence); 3.4.3 (shell, Markers and Build); 3.4.4 (shell/src/App.tsx:3, shell/src/App.tsx:4, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | module-federation | architectural | strong | configures #13; configures #14; configures #15 |
| 7 | 3.4.4 (shell/src/App.tsx:3) | 3 code | source code | module-federation | architectural | strong | implements #14 |
| 8 | 3.4.4 (shell/src/App.tsx:4) | 3 code | source code | module-federation | architectural | strong | implements #15 |
| 9 | 3.4.4 (shell/src/App.tsx:19) | 3 code | source code | module-federation | architectural | moderate | implements #14 |
| 10 | 3.4.4 (shell/src/App.tsx:25) | 3 code | source code | module-federation | architectural | moderate | implements #15 |
| 11 | 3.4.3 (mfe-counter) | 4 structure | directory | — | architectural | moderate | — |
| 12 | 3.4.3 (mfe-weather) | 4 structure | directory | — | architectural | moderate | — |
| 13 | 3.4.3 (shell) | 4 structure | directory | — | architectural | moderate | — |
| 14 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #13; links #12 |
| 15 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #13; links #11 |
| 16 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #11 |
| 17 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #12 |
| 18 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #13 |
| 19 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #11; corroborates #12; corroborates #13; corroborates #14; corroborates #15 |
| 20 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #16; corroborates #17; corroborates #18; corroborates #7; corroborates #8; corroborates #14; corroborates #15 |
| 21 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #11; corroborates #12; corroborates #13 |
| 22 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #14; corroborates #15; corroborates #7; corroborates #8 |
| 23 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #14; corroborates #5; corroborates mfe-weather/src/main.tsx:4-6 |
| 24 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #11; corroborates #16; corroborates #15; corroborates mfe-counter/src/main.tsx:4-6 |
| 25 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #11; corroborates #12; corroborates mfe-weather/package.json:6-11; corroborates mfe-counter/package.json:6-11 |
| 26 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | — |
| 27 | 3.4.7 #9 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #7; corroborates #8; corroborates #14; corroborates #15 |
| 28 | 3.4.7 #10 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #14; corroborates #15 |
| 29 | 3.4.7 #11 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #10; corroborates shell/src/App.tsx:16-28 |

## Summary

Observations: 29. Dimensions (technology: 3, configuration: 3, code: 4, structure: 3, composition: 2, build-deploy: 3, documentation: 11, history: 0). Strength (strong: 5, moderate: 10, weak: 14, ambiguous: 0). Evidence (technological: 6, architectural: 23, context: 0).


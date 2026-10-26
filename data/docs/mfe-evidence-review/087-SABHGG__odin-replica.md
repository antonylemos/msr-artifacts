---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
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

# 087 — SABHGG/odin-replica

## Repository overview

Snapshot is a single Create React App project at root (#15). It is simultaneously the single-spa root-config and local React application, registering an external Angular application absent from repository. No configuration file declares a composition element: remote URL is in entry code itself, so there is no configuration observation.

The architecture-supporting chain runs through code:
- **Dependency:** `single-spa` is declared (#1) and used in entry.
- **Code:** registration `leadocs-angular` names external unit (#7), loader injects remote bundle `<script>` (#10) and `start()` starts orchestrator (#14).
- **Relationship:** this produces the sole relationship, active root-config → application with target outside snapshot (#17).

Application has its own build, without deployment in repository (#18).

Misleading signals:
- **Local lifecycles:** `single-spa-react` lifecycles (#2, #3–#5, #8, #9) and `odin-react` registration (#6) use mechanism for same unit in same bundle. They do not link units.
- **Event `toggle-leapdocs`:** emitter/receiver pair (#11–#13) looks like inter-MFE communication, but is internal to unit. It only feeds remote activity function.

Documentation is in comments and console messages of `src/index.js`. It confirms event activation (#20), local Odin (#21, #22) and script loader (#24). Remote's "Angular" and `leapdocs` contract are only partially confirmed (#23, #25), because remote side has no artifact. Two claims are refuted by code: `libraryName` `leadocs` (#26) and "dynamic import" of `src/root.app.js` (#27). History clarifies three discrepancies: remote was never in repository (#28), and message and comment originated alongside contradicting code (#29, #30). Nothing remains ambiguous in snapshot. Remote itself is unobserved.

## Observations

### 1. package.json:13

**Observation:** `single-spa` `^6.0.3` in `dependencies`. Review marks it configured through import and uses in src/index.js:3, 56-60, 63-100 and 103.

**Interpretation:** Application declares single-spa orchestrator and uses it in entry.

### 2. package.json:14

**Observation:** `single-spa-react` `^6.0.2` in `dependencies`. Review marks it configured through import and call in src/root.app.js:3 and 6-14.

**Interpretation:** Application declares single-spa React adapter and uses it for local application.

### 3. src/root.app.js:16

**Observation:** `export const bootstrap = reactLifecycles.bootstrap`. Object is created in src/root.app.js:6-14, and sole consumer is `odin-react` registration in src/index.js:56-60, in same bundle.

**Interpretation:** A single-spa lifecycle of unit itself, internal to it.

### 4. src/root.app.js:17

**Observation:** `export const mount = reactLifecycles.mount`, from same object, with same internal consumer.

**Interpretation:** A single-spa lifecycle of unit itself, internal to it.

### 5. src/root.app.js:18

**Observation:** `export const unmount = reactLifecycles.unmount`, from same object, with same internal consumer.

**Interpretation:** A single-spa lifecycle of unit itself, internal to it.

### 6. src/index.js:56-60; src/index.js:4

**Observation:** `registerApplication('odin-react', async () => RootApp, () => true)`. `RootApp` comes from static import of `./root.app`.

**Interpretation:** Root registers its own React application, always active, involving no other unit.

### 7. src/index.js:63-100

**Observation:** `registerApplication('leadocs-angular', ...)`, with a loading function injecting a script (src/index.js:65-94), activity function `() => isLeadocsActive` (src/index.js:96) and `domElementGetter` for `#microfrontend-container` (src/index.js:98), node created in src/App.js:57.

**Interpretation:** Root registers an external application by name in orchestrator and defines when and where it mounts.

### 8. src/root.app.js:3

**Observation:** `import singleSpaReact from 'single-spa-react'`.

**Interpretation:** Unit imports adapter to create its own lifecycles.

### 9. src/root.app.js:6-14

**Observation:** `singleSpaReact({ React, ReactDOM, rootComponent: App, errorBoundary, domElementGetter: () => document.getElementById('root') })`.

**Interpretation:** Local `App` is adapted to single-spa lifecycles for orchestrator in same bundle.

### 10. src/index.js:72-73; src/index.js:93; src/index.js:7-9; src/index.js:78-80

**Observation:** Inside `leadocs-angular` loading function, `document.createElement('script')` receives `src = LEAPDOCS_BUNDLE_URL` (default `http://localhost:4200/main.js`, overridable through `REACT_APP_LEAPDOCS_ORIGIN` and `REACT_APP_LEAPDOCS_BUNDLE_URL`) and is appended to `document.head`. In `onload`, promise resolves with `globalThis.leapdocs`.

**Interpretation:** Single-spa loader fetches external unit bundle through a script at runtime and reads lifecycles from a global.

### 11. src/App.js:18-22; src/App.js:29-38

**Observation:** `window.dispatchEvent(...)` in `handleSectionChange`, triggered by sidebar buttons.

**Interpretation:** An event dispatched by unit itself, whose sole receiver is also in it.

### 12. src/App.js:19-21

**Observation:** `new CustomEvent('toggle-leapdocs', { detail: { isActive: sectionId === 'microfrontend' } })`.

**Interpretation:** Internal event of observation #11.

### 13. src/index.js:47-51

**Observation:** `globalThis.addEventListener('toggle-leapdocs', ...)` writes `isLeadocsActive`, calls `normalizeCurrentUrl()` and `triggerAppChange()`.

**Interpretation:** Receiver in same unit of event from observations #11 and #12. It changes state read by remote activity function.

### 14. src/index.js:103; src/index.js:3

**Observation:** `start()`, imported from `single-spa`.

**Interpretation:** Starts orchestrator. Without it, no registration mounts, including external unit.

### 15. .; package.json; src/index.js:56-60; src/index.js:103; public/index.html:31; package.json:20

**Observation:** Root CRA application, with manifest, `src/index.js` entry (registers `odin-react` and calls `start()`), template with `<div id="root">` and `react-scripts build`, without own configuration file or workspace.

**Interpretation:** Sole frontend unit in snapshot, with its own boundary.

### 16. public; public/index.html

**Observation:** CRA HTML template folder.

**Interpretation:** Part of root application rather than another unit.

### 17. src/index.js:63; src/index.js:72; src/index.js:103; src/index.js:7-9

**Observation:** Root `.` registers `leadocs-angular` in single-spa, loads its bundle through a script from a URL (default `http://localhost:4200/main.js`) and starts orchestrator. Target is not in snapshot, and no snapshot unit produces this bundle.

**Interpretation:** An active root-config → application relationship with external target.

### 18. package.json:20; .gitignore:11-12

**Observation:** `"build": "react-scripts build"`, with git-ignored `/build` output. No deployment artifact, and version `0.1.0` of a `private` package is not used in publication.

**Interpretation:** Application has its own build, separate from remote, without observed deployment or independent versioning.

### 19. src/index.js:7

**Observation:** "Puerto donde corre tu 'ng serve'" (English translation: port where your `ng serve` runs).

**Interpretation:** Claims remote is served separately by Angular development server. Nothing in snapshot runs that server, and claim remains uncorroborated.

### 20. src/index.js:44

**Observation:** "Activación por evento (sin rutas)" (English translation: event activation, without routes).

**Interpretation:** Claims remote is activated by event rather than route. Claim corroborated.

### 21. src/index.js:55

**Observation:** "Registrar Odin (React Local)" (English translation: register Odin, local React).

**Interpretation:** Claims Odin is repository's own React application. Claim corroborated.

### 22. src/index.js:58

**Observation:** "Carga directa del componente exportado" (English translation: direct loading of exported component).

**Interpretation:** Claims local lifecycles are delivered without remote loading. Claim corroborated.

### 23. src/index.js:62

**Observation:** "Registrar Leadocs (Angular Remoto)" (English translation: register Leadocs, remote Angular).

**Interpretation:** Claims Leadocs is a remote Angular application. "Remote" is confirmed; "Angular" has no snapshot artifact, and claim is partially corroborated.

### 24. src/index.js:66

**Observation:** "Promesa que carga el script y devuelve el módulo" (English translation: promise loading script and returning module).

**Interpretation:** Claims remote loads through a script in a promise. Claim corroborated; returned "module" is a global.

### 25. src/index.js:77

**Observation:** "Al terminar de cargar, Angular debe haber expuesto 'window.leapdocs'" (English translation: when loading finishes, Angular should have exposed `window.leapdocs`).

**Interpretation:** Claims host–remote contract through global `leapdocs`. Host side confirmed; remote side has no artifact, and claim partially corroborated.

### 26. src/index.js:83

**Observation:** Console message: "Asegúrate de que en el 'angular.json' de Leadocs, la propiedad 'libraryName' sea 'leadocs'" (English translation: ensure that in Leadocs `angular.json`, property `libraryName` is `leadocs`).

**Interpretation:** Claims how remote must be built. Code reads `globalThis.leapdocs` (src/index.js:69, 78), contradicting requested name.

### 27. src/root.app.js:20

**Observation:** "Exportamos todo el objeto para el import dinámico" (English translation: we export entire object for dynamic import).

**Interpretation:** Claims lifecycle object is imported dynamically. Sole consumer imports it statically (src/index.js:4), contradicting claim.

### 28. 80616f7 2026-03-11 (.); 06ce2bd 2026-03-16 (.)

**Observation:** Both commit trees contain only CRA scaffold and, from `06ce2bd`, `src/root.app.js`. Neither contains `angular.json`, Angular project or any other remote file, and no commit removes a file.

**Interpretation:** Remote was never in repository. Its absence does not come from extraction or removal, and history does not show whether it is Angular or publishes `leapdocs`.

### 29. 80616f7 2026-03-11 (src/index.js); 06ce2bd 2026-03-16 (src/index.js)

**Observation:** `src/index.js` has two versions. Snapshot version, `06ce2bd`, introducing single-spa root, simultaneously contains message with `leadocs` and reading of `globalThis.leapdocs`. Contents of `80616f7` are unavailable in clone, and no later commit exists.

**Interpretation:** Message and read global entered together. Discrepancy does not remain from a versioned change.

### 30. 06ce2bd 2026-03-16 (src/root.app.js; src/index.js)

**Observation:** `src/root.app.js` is created in `06ce2bd`, same commit as sole version of `src/index.js` with static `import RootApp from './root.app'`.

**Interpretation:** Comment and static import originated together. Comment does not remain from a stage with dynamic import.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:13) | 1 technology | manifest | single-spa | technological | weak | declares #6; declares #7; declares #14 |
| 2 | 3.4.2 (package.json:14) | 1 technology | manifest | single-spa | technological | weak | declares #8; declares #9 |
| 3 | 3.4.4 (src/root.app.js:16) | 3 code | source code | single-spa | technological | weak | — |
| 4 | 3.4.4 (src/root.app.js:17) | 3 code | source code | single-spa | technological | weak | — |
| 5 | 3.4.4 (src/root.app.js:18) | 3 code | source code | single-spa | technological | weak | — |
| 6 | 3.4.4 (src/index.js:56) | 3 code | source code | single-spa | technological | weak | — |
| 7 | 3.4.4 (src/index.js:63) | 3 code | source code | single-spa | architectural | strong | implements #17 |
| 8 | 3.4.4 (src/root.app.js:3) | 3 code | source code | single-spa | technological | weak | — |
| 9 | 3.4.4 (src/root.app.js:6) | 3 code | source code | single-spa | technological | weak | — |
| 10 | 3.4.4 (src/index.js:72) | 3 code | source code | script | technological | moderate | implements #17 |
| 11 | 3.4.4 (src/App.js:18) | 3 code | source code | — | context | weak | — |
| 12 | 3.4.4 (src/App.js:19) | 3 code | source code | — | context | weak | — |
| 13 | 3.4.4 (src/index.js:47) | 3 code | source code | — | context | weak | — |
| 14 | 3.4.4 (src/index.js:103) | 3 code | source code | single-spa | technological | moderate | implements #17 |
| 15 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 16 | 3.4.3 (public) | 4 structure | directory | — | context | weak | — |
| 17 | 3.4.5 #1 | 5 composition | source code | single-spa | architectural | strong | links #15 |
| 18 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #15 |
| 19 | 3.4.7 #1 | 7 documentation | comment | — | architectural | weak | — |
| 20 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #13; corroborates #11; corroborates #17 |
| 21 | 3.4.7 #3 | 7 documentation | comment | — | architectural | weak | corroborates #15; corroborates #6 |
| 22 | 3.4.7 #4 | 7 documentation | comment | — | technological | weak | corroborates #6 |
| 23 | 3.4.7 #5 | 7 documentation | comment | — | architectural | weak | partially corroborates #7; partially corroborates #17 |
| 24 | 3.4.7 #6 | 7 documentation | comment | script | technological | weak | corroborates #10; corroborates #17 |
| 25 | 3.4.7 #7 | 7 documentation | comment | — | architectural | weak | partially corroborates #10 |
| 26 | 3.4.7 #8 | 7 documentation | comment | — | architectural | weak | contradicts #7; contradicts #10 |
| 27 | 3.4.7 #9 | 7 documentation | comment | — | technological | weak | contradicts #6 |
| 28 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #23; explains #25 |
| 29 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #26 |
| 30 | 3.4.8 #3 | 8 history | history | — | technological | weak | explains #27 |

## Summary

Observations: 30. Dimensions (technology: 2, configuration: 0, code: 12, structure: 2, composition: 1, build-deploy: 1, documentation: 9, history: 3). Strength (strong: 2, moderate: 4, weak: 24, ambiguous: 0). Evidence (technological: 14, architectural: 12, context: 4).


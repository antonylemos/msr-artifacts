---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
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

# 136 — swtbhsmn/micro-frontend-demo

## Repository overview

Minimal webpack 5 Module Federation demonstration, with two React applications in separate folders: `app1` (host) and `app2` (remote). Complete chain:
- **Configuration:** app2 declares itself with `remoteEntry.js` and exposes `./RemoteApp` (#2), and app1 declares remote `app2` at a localhost URL (#1). Both share React as singleton.
- **Code:** host imports `app2/RemoteApp` by remote name (#3) and renders it in `Suspense` (#6).
- **Relationship:** an active host → remote relationship results (#9), between two units with own boundaries (#7, #8) and separate builds (#10, #11).

No technology dimension: `ModuleFederationPlugin` comes from `webpack` package itself, and dependency review has no row. Technology appears only in configuration. Both `import('./bootstrap')` calls are internal bootstraps (#4, #5), not independently showing federation.

Limitation is publication: both applications only run in development mode, and no deployment artifact exists (#10, #11). README confirms roles and composition (#12 through #14). History has two same-day commits and no ambiguous point, so no historical observation.

## Observations

### 1. app1/webpack.config.js:2, 28-34

**Observation:** `ModuleFederationPlugin`, imported from `webpack`, declares `name: "app1"`, remote `app2: "app2@http://localhost:3002/remoteEntry.js"` and shares `react` and `react-dom` as singletons.

**Interpretation:** Host configuration declares app2 as remote and where to find it in development.

### 2. app2/webpack.config.js:2, 28-35

**Observation:** `ModuleFederationPlugin`, imported from `webpack`, declares `name: "app2"` and `filename: "remoteEntry.js"`, exposes `./RemoteApp` (`./src/RemoteApp`) and shares `react` and `react-dom` as singletons.

**Interpretation:** App2 is configured as remote and offers its component to a host.

### 3. app1/src/App.jsx:2

**Observation:** `const RemoteApp = React.lazy(() => import('app2/RemoteApp'));`.

**Interpretation:** Host imports component exposed by app2 on demand, by remote name.

### 4. app1/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to app1.

### 5. app2/src/index.js:1

**Observation:** `import('./bootstrap');`.

**Interpretation:** An asynchronous bootstrap internal to app2.

### 6. app1/src/App.jsx:8-10

**Observation:** `<RemoteApp />` inside `Suspense`, with fallback "Loading remote...".

**Interpretation:** Host renders remote app2 component on its own page.

### 7. app1; app1/package.json:1-21; app1/src/index.js:1; app1/src/bootstrap.js:5-6; app1/webpack.config.js:5-40; app1/package.json:6

**Observation:** Own package, `./src/index.js` entry, React mounting in `#root` and own webpack configuration, served through `webpack serve` on port 3001.

**Interpretation:** Frontend unit with its own boundary.

### 8. app2; app2/package.json:1-21; app2/src/index.js:1; app2/src/bootstrap.js:5-6; app2/webpack.config.js:5-41; app2/package.json:6

**Observation:** Own package, `./src/index.js` entry, React mounting in `#root` and own webpack configuration, served through `webpack serve` on port 3002.

**Interpretation:** Frontend unit with its own boundary.

### 9. app1/src/App.jsx:2, 9; app1/webpack.config.js:30-31; app2/webpack.config.js:29-32

**Observation:** App1 imports `app2/RemoteApp` and renders it. Name `app2`, `remoteEntry.js` and module `./RemoteApp` match app2 configuration.

**Interpretation:** An active host → remote relationship.

### 10. app1/webpack.config.js:5-40; app1/package.json:6

**Observation:** Own webpack configuration and `start` script (`webpack serve --mode development --port 3001`), without production build script. No deployment artifact.

**Interpretation:** Own build boundary used only in development, without observed deployment.

### 11. app2/webpack.config.js:5-41; app2/package.json:6

**Observation:** Own webpack configuration and `start` script (`webpack serve --mode development --port 3002`), generating `remoteEntry.js`, without production build script. No deployment artifact.

**Interpretation:** Own build boundary used only in development, without observed deployment.

### 12. README.txt:1

**Observation:** "Microfrontend Webpack Module Federation demo".

**Interpretation:** Presents project as micro-frontends with webpack Module Federation. Claim corroborated.

### 13. README.txt:3-5

**Observation:** "Two apps: / - app1 (host) -> http://localhost:3001 / - app2 (remote) -> http://localhost:3002".

**Interpretation:** Claims two applications with host and remote roles. Claim corroborated.

### 14. README.txt:14

**Observation:** "app1 will open at http://localhost:3001 and load remote component from app2".

**Interpretation:** Claims host loads remote component. Claim corroborated.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (app1, Markers, Entry and Build); 3.4.4 (app1/src/App.jsx:2, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.6 #2 (Where served); 3.4.7 #1 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #7; configures #9 |
| 2 | 3.4.3 (app2, Markers, Entry and Build); 3.4.4 (app1/src/App.jsx:2, Observation); 3.4.5 #1 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #1 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #8; configures #9 |
| 3 | 3.4.4 (app1/src/App.jsx:2) | 3 code | source code | module-federation | architectural | strong | implements #9 |
| 4 | 3.4.4 (app1/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 5 | 3.4.4 (app2/src/index.js:1) | 3 code | source code | — | technological | weak | — |
| 6 | 3.4.4 (app1/src/App.jsx:9) | 3 code | source code | module-federation | technological | moderate | implements #9 |
| 7 | 3.4.3 (app1) | 4 structure | directory | — | architectural | moderate | — |
| 8 | 3.4.3 (app2) | 4 structure | directory | — | architectural | moderate | — |
| 9 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #7; links #8 |
| 10 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #7 |
| 11 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #8 |
| 12 | 3.4.7 #1 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #7; corroborates #8; corroborates #9; corroborates #1; corroborates #2 |
| 13 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #7; corroborates #8; corroborates #9; corroborates #10; corroborates #11 |
| 14 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #3; corroborates #6 |

## Summary

Observations: 14. Dimensions (technology: 0, configuration: 2, code: 4, structure: 2, composition: 1, build-deploy: 2, documentation: 3, history: 0). Strength (strong: 3, moderate: 6, weak: 5, ambiguous: 0). Evidence (technological: 4, architectural: 10, context: 0).


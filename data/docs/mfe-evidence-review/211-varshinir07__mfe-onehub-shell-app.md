---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
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

# 211 — varshinir07/mfe-onehub-shell-app

## Repository overview

Snapshot contains only React host `onehub`, with own entry and build (#12, #17). Single Webpack configuration declares two external remotes, `subscription` and `ownership`, at localhost URLs, plus React sharing (#1). Five imports name modules from these remotes (#2–#6), and five elements insert them in Dashboard under Suspense (#7–#11). Chain supports two active host → remote relationships (#15, #16), without inspecting absent providers or confirming their builds, deployments or library sharing.

No dependency to extract from 3.4.2: mechanism is Webpack’s own plugin, observed in configuration. Folders public and src belong to same unit (#13, #14). Observed separate build belongs to host and uses development mode; deployment not observed (#17).

README calls project a remote, contradicting host role (#18). Consumption and federation comments corroborated (#19–#21), while singleton sharing confirmed only on host side (#22). History shows code originated as host and providers never belonged to this repository (#23, #24). Absence of first README blob limits origin of label without making snapshot architecture ambiguous.

## Observations

### 1. src/webpack.config.js:3; src/webpack.config.js:5-102

**Observation:** Configuration uses `ModuleFederationPlugin`, declaring name `onehub` and mapping `remote1` to `subscription@http://localhost:3001/remoteEntry.js` and `remote2` to `ownership@http://localhost:3002/remoteEntry.js`. Declares `react` and `react-dom` as `singleton`, with `requiredVersion: '^19.1.0'` and `eager: true`, without `exposes`.

**Interpretation:** Declares host and Module Federation links to two external units. Sharing configured by host; does not demonstrate absent provider configurations.

### 2. src/pages/Dashboard.jsx:3

**Observation:** `const ModemAuthorization = React.lazy(() => import('remote1/ModemAuthorization'));`.

**Interpretation:** Host names module `ModemAuthorization` of remote `remote1`, declaring on-demand loading through federated import.

### 3. src/pages/Dashboard.jsx:4

**Observation:** `const SecurityPackage = React.lazy(() => import('remote1/SecurityPackage'));`.

**Interpretation:** Host names module `SecurityPackage` of remote `remote1`, declaring on-demand loading through federated import.

### 4. src/pages/Dashboard.jsx:6

**Observation:** `const LabourHourHold = React.lazy(() => import('remote2/LabourHourHold'));`.

**Interpretation:** Host names module `LabourHourHold` of remote `remote2`, declaring on-demand loading through federated import.

### 5. src/pages/Dashboard.jsx:7

**Observation:** `const MobileService = React.lazy(() => import('remote2/MobileService'));`.

**Interpretation:** Host names module `MobileService` of remote `remote2`, declaring on-demand loading through federated import.

### 6. src/pages/Dashboard.jsx:9

**Observation:** `const Card = React.lazy(() => import('remote1/Card'));`.

**Interpretation:** Host names module `Card` of remote `remote1`, declaring on-demand loading through federated import.

### 7. src/pages/Dashboard.jsx:16; src/pages/Dashboard.jsx:3; src/pages/Dashboard.jsx:15-26

**Observation:** `<ModemAuthorization />` rendered under `React.Suspense` with fallback `Loading...`; component comes from import at line 3.

**Interpretation:** Rendering inserts remote component in host dashboard. Element alone uses already loaded component without independently declaring federated target.

### 8. src/pages/Dashboard.jsx:17; src/pages/Dashboard.jsx:4; src/pages/Dashboard.jsx:15-26

**Observation:** `<SecurityPackage />` rendered under `React.Suspense` with fallback `Loading...`; component comes from import at line 4.

**Interpretation:** Rendering inserts remote component in host dashboard. Element alone uses already loaded component without independently declaring federated target.

### 9. src/pages/Dashboard.jsx:18; src/pages/Dashboard.jsx:6; src/pages/Dashboard.jsx:15-26

**Observation:** `<LabourHourHold />` rendered under `React.Suspense` with fallback `Loading...`; component comes from import at line 6.

**Interpretation:** Rendering inserts remote component in host dashboard. Element alone uses already loaded component without independently declaring federated target.

### 10. src/pages/Dashboard.jsx:19; src/pages/Dashboard.jsx:7; src/pages/Dashboard.jsx:15-26

**Observation:** `<MobileService />` rendered under `React.Suspense` with fallback `Loading...`; component comes from import at line 7.

**Interpretation:** Rendering inserts remote component in host dashboard. Element alone uses already loaded component without independently declaring federated target.

### 11. src/pages/Dashboard.jsx:22-25; src/pages/Dashboard.jsx:9; src/pages/Dashboard.jsx:15-26

**Observation:** `Card` rendered under `React.Suspense`, receiving `topic="OneHUB"` and `description="Welcome to OneHUB"`; comes from import at line 9.

**Interpretation:** Rendering inserts remote component in host dashboard. Element alone uses already loaded component without independently declaring federated target.

### 12. .; package.json:19-20; src/webpack.config.js:10; src/webpack.config.js:68-70; src/index.js:7-12; src/App.js:3-8

**Observation:** Root combines own manifest, React entry and Webpack build. Entry renders App, mounting Dashboard; build uses template public/index.html.

**Interpretation:** Confirms boundary of only frontend unit present in snapshot, host. Two referenced remotes are not inspected directories.

### 13. public; public/index.html:31; src/webpack.config.js:68-70

**Observation:** public/index.html contains root element and is HtmlWebpackPlugin template of root application.

**Interpretation:** Directory belongs to root unit without another application entry/build.

### 14. src; src/index.js:7-12; src/webpack.config.js:10; package.json:19-20

**Observation:** src contains entry and configuration used by start and build scripts of root manifest.

**Interpretation:** Part of root unit. Configuration located here does not establish another frontend unit.

### 15. src/pages/Dashboard.jsx:3-4; src/pages/Dashboard.jsx:9; src/pages/Dashboard.jsx:16-17; src/pages/Dashboard.jsx:22-25; src/webpack.config.js:76; src/App.js:3-8; src/index.js:8-12

**Observation:** Dashboard imports ModemAuthorization, SecurityPackage and Card from remote1, rendering them and passing props to Card. Configuration resolves remote1 as subscription at localhost:3001. Entry chain mounts App and Dashboard.

**Interpretation:** Active host → remote relationship between root unit and subscription, external to snapshot. Consumption recorded from host side; no provider source to check implementation.

### 16. src/pages/Dashboard.jsx:6-7; src/pages/Dashboard.jsx:18-19; src/webpack.config.js:77; src/App.js:3-8; src/index.js:8-12

**Observation:** Dashboard imports LabourHourHold and MobileService from remote2, rendering them. Configuration resolves remote2 as ownership at localhost:3002. Entry chain mounts App and Dashboard.

**Interpretation:** Active host → remote relationship between root unit and ownership, external to snapshot, observed from consumer side.

### 17. package.json:20; src/webpack.config.js:5-29; src/webpack.config.js:72-92

**Observation:** Build script calls webpack with own configuration and development mode. Output dist/bundle.js, publicPath http://localhost:3000/. Review records separate build, deployment not observed and independent versioning No; remotes referenced by URLs external to build.

**Interpretation:** Confirms host build boundary. Development configuration does not establish publication or remote deployment independence.

### 18. README.md:2

**Observation:** “MFE Remote App for OnehubShell”.

**Interpretation:** Claims project remote role. Section 3.4.7 records claim contradicted: configuration and two relationships show project as consuming host. Label misleading semantic signal.

### 19. src/pages/Dashboard.jsx:21

**Observation:** Comment says “Using Card from Remote App”.

**Interpretation:** Claims remote origin of Card, corroborated by federated import, rendering and relationship with subscription. Confirmation limited to host.

### 20. src/webpack.config.js:71

**Observation:** Comment says “Module Federation configuration for micro-frontends”.

**Interpretation:** Names composition technology, corroborated by configured plugin and two active relationships. Phrase alone semantic evidence.

### 21. src/webpack.config.js:75

**Observation:** Comment presents remotes as “Remote apps to consume modules from”.

**Interpretation:** Claims consumption of remote applications, corroborated by mappings and imports used in two relationships. Providers absent from snapshot.

### 22. src/webpack.config.js:80

**Observation:** Comment says “Share React and ReactDOM as singletons to avoid version conflicts”.

**Interpretation:** Claims singleton sharing. Section 3.4.7 records partial corroboration: host configures shared, but no remote artifact confirming other side or conflict prevention.

### 23. 74cbf87 2025-06-05 (README.md); 1ddddc4241157e335c1b6e39372f050aa1705c1d 2025-06-05 (README.md; src/webpack.config.js; src/pages/Dashboard.jsx)

**Observation:** Historical review records two commits: first creates only README.md; second changes README and creates all host code. First README blob absent. Point result: clarified.

**Interpretation:** Remote label and host code coexist in only version with code; no previous stage implemented as remote in repository. Textual origin of label unknown without changing snapshot role.

### 24. 74cbf87 2025-06-05 (README.md); 1ddddc4241157e335c1b6e39372f050aa1705c1d 2025-06-05 (src/webpack.config.js; src/pages/Dashboard.jsx)

**Observation:** File lists of both commits record only initial README and host files added in snapshot. No creation/removal of subscription and ownership remote files. Point result: clarified.

**Interpretation:** Remotes neither extracted nor removed from repository. History explains provider absence but does not verify shared declarations; sharing claim remains partial.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (., Entry and Build; src, Markers); 3.4.4 (src/pages/Dashboard.jsx:3,4,6,7,9, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1 (Artifacts); 3.4.7 #1, #3, #4, #5 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #12; configures #15; configures #16 |
| 2 | 3.4.4 (src/pages/Dashboard.jsx:3, src-remote-import) | 3 code | source code | module-federation | architectural | strong | implements #15 |
| 3 | 3.4.4 (src/pages/Dashboard.jsx:4, src-remote-import) | 3 code | source code | module-federation | architectural | strong | implements #15 |
| 4 | 3.4.4 (src/pages/Dashboard.jsx:6, src-remote-import) | 3 code | source code | module-federation | architectural | strong | implements #16 |
| 5 | 3.4.4 (src/pages/Dashboard.jsx:7, src-remote-import) | 3 code | source code | module-federation | architectural | strong | implements #16 |
| 6 | 3.4.4 (src/pages/Dashboard.jsx:9, src-remote-import) | 3 code | source code | module-federation | architectural | strong | implements #15 |
| 7 | 3.4.4 (src/pages/Dashboard.jsx:16, manual) | 3 code | source code | module-federation | architectural | moderate | implements #15 |
| 8 | 3.4.4 (src/pages/Dashboard.jsx:17, manual) | 3 code | source code | module-federation | architectural | moderate | implements #15 |
| 9 | 3.4.4 (src/pages/Dashboard.jsx:18, manual) | 3 code | source code | module-federation | architectural | moderate | implements #16 |
| 10 | 3.4.4 (src/pages/Dashboard.jsx:19, manual) | 3 code | source code | module-federation | architectural | moderate | implements #16 |
| 11 | 3.4.4 (src/pages/Dashboard.jsx:22, manual) | 3 code | source code | module-federation | architectural | moderate | implements #15 |
| 12 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 13 | 3.4.3 (public) | 4 structure | directory | — | context | weak | — |
| 14 | 3.4.3 (src) | 4 structure | directory | — | context | weak | — |
| 15 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #12; links src/webpack.config.js:76 |
| 16 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #12; links src/webpack.config.js:77 |
| 17 | 3.4.6 #1 | 6 build-deploy | configuration | module-federation | architectural | moderate | publishes #12 |
| 18 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | contradicts #1; contradicts #15; contradicts #16 |
| 19 | 3.4.7 #2 | 7 documentation | comment | — | architectural | weak | corroborates #6; corroborates #11; corroborates #15 |
| 20 | 3.4.7 #3 | 7 documentation | comment | module-federation | technological | weak | corroborates #1; corroborates #15; corroborates #16 |
| 21 | 3.4.7 #4 | 7 documentation | comment | — | architectural | weak | corroborates #1; corroborates #2; corroborates #3; corroborates #4; corroborates #5; corroborates #6; corroborates #15; corroborates #16 |
| 22 | 3.4.7 #5 | 7 documentation | comment | — | technological | weak | partially corroborates #1 |
| 23 | 3.4.8 #1 | 8 history | history | — | architectural | weak | explains #18; explains #1; explains #15; explains #16 |
| 24 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #22; explains #1; explains #15; explains #16 |

## Summary

Observations: 24. Dimensions (technology: 0, configuration: 1, code: 10, structure: 3, composition: 2, build-deploy: 1, documentation: 5, history: 2). Strength (strong: 8, moderate: 7, weak: 9, ambiguous: 0). Evidence (technological: 2, architectural: 20, context: 2).


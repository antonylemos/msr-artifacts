---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
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

# 245 — dvreddy007/mfe-sample

## Repository overview

Three Vue/Vite applications have own entries/builds in npm workspace (#21–#24). Module Federation declarations (#2–#5) lead to two remote configurations exposing `./entry` and host configuration sharing Vue without declaring static remotes (#6–#8). Host-executed manifest names `app1` and `app2`, their URLs/routes (#18); generic registration/loader resolve modules and invoke mounting/unmounting contract (#9–#15, #19–#20). Chain yields two active host → remote relationships (#25–#26). Internal Vue rendering is no further composition boundary (#16–#17).

Builds separate, but workflow publishes tree zip without building packages; deployment of three applications remains undetermined (#27–#29). History locates workflow addition without resolving whether publication functional (#49). Lerna declaration ambiguous regarding tool usage without changing three unit boundaries (#1, #48).

Documentary claims describe organization but are weak evidence alone (#30–#47). Misleading claims concern workflow build/deployment (#30), routes supposedly originating from and independent in remotes (#34, #42), route updates after registration (#36) and comment suggesting host-exposed modules (#47). Snapshot supports central routes in fixed manifest and host without `exposes`; discrepancy origins remain inconclusive without making observed composition ambiguous (#50–#51).

## Observations

### 1. package.json:12

**Observation:** Root manifest declares `lerna: ^8.1.9` in `devDependencies`.

**Interpretation:** Monorepo coordination dependency with configuration `Undetermined` in 3.4.2: both local coordination usage and declaration without actual usage remain plausible. Declaration does not locate frontend units.

### 2. packages/app-1/package.json:16

**Observation:** Package declares `@module-federation/vite: ^1.2.2` in `devDependencies`.

**Interpretation:** Declaration signals Module Federation; 3.4.2 records configuration `Yes`, whose implementation has own observations.

### 3. packages/app-2/package.json:16

**Observation:** Package declares `@module-federation/vite: ^1.2.2` in `devDependencies`.

**Interpretation:** Declaration signals Module Federation; 3.4.2 records configuration `Yes`, whose implementation has own observations.

### 4. packages/host/package.json:18

**Observation:** Package declares `@module-federation/runtime: ^0.8.9` in `devDependencies`.

**Interpretation:** Declaration signals Module Federation; 3.4.2 records configuration `Yes`, whose implementation has own observations.

### 5. packages/host/package.json:19

**Observation:** Package declares `@module-federation/vite: ^1.2.2` in `devDependencies`.

**Interpretation:** Declaration signals Module Federation; 3.4.2 records configuration `Yes`, whose implementation has own observations.

### 6. packages/app-1/vite.config.js:9-16

**Observation:** Plugin `federation` declares `name: app1`, `filename: remoteEntry.js` and `shared: [vue]`, with `exposes` from `./entry` to `./src/entry.js`.

**Interpretation:** Configures Module Federation in unit without naming another target unit. Defines contract host can load.

### 7. packages/app-2/vite.config.js:9-16

**Observation:** Plugin `federation` declares `name: app2`, `filename: remoteEntry.js` and `shared: [vue]`, with `exposes` from `./entry` to `./src/entry.js`.

**Interpretation:** Configures Module Federation in unit without naming another target unit. Defines contract host can load.

### 8. packages/host/vite.config.js:10-14

**Observation:** Plugin `federation` declares `name: host`, `filename: remoteEntry.js` and `shared: [vue]`. No `exposes` or `remotes`.

**Interpretation:** Configures Module Federation in unit without naming another target unit. Host `filename` does not establish remote relationship.

### 9. packages/host/src/components/Loader.vue:63-84

**Observation:** Component calls `moduleFederation.loadRemote(mfeConfig.module)`, storing returned methods.

**Interpretation:** Loads parameter-supplied name through federation mechanism without fixing target in call.

### 10. packages/host/src/components/Loader.vue:87-108

**Observation:** `initializeRemote` retrieves current route entry and calls local function `loadRemote(remote)`; runs on mounting and route changes.

**Interpretation:** Connects route selection to generic remote loader without naming target in call.

### 11. packages/host/src/plugins/federationPlugin.js:1; packages/host/src/plugins/federationPlugin.js:27-35

**Observation:** Wrapper calls `_loadRemote(`${module}/entry`)`, returning `mount` and `unmount` from loaded module.

**Interpretation:** Uses Module Federation to resolve module parameterized by remote name.

### 12. packages/app-1/src/entry.js:6-18

**Observation:** Module exports `mount`, receiving container and creating own Vue instance.

**Interpretation:** Offers mounting portion of lifecycle contract consumed by host; declaration alone names no consumer.

### 13. packages/app-1/src/entry.js:20-25

**Observation:** Module exports `unmount`, unmounting Vue instance and clearing its reference.

**Interpretation:** Offers unmounting portion of lifecycle contract consumed by host; declaration alone names no consumer.

### 14. packages/app-2/src/entry.js:6-18

**Observation:** Module exports `mount`, receiving container and creating own Vue instance.

**Interpretation:** Offers mounting portion of lifecycle contract consumed by host; declaration alone names no consumer.

### 15. packages/app-2/src/entry.js:20-25

**Observation:** Module exports `unmount`, unmounting Vue instance and clearing its reference.

**Interpretation:** Offers unmounting portion of lifecycle contract consumed by host; declaration alone names no consumer.

### 16. packages/app-1/src/entry.js:13

**Observation:** `app.mount(container)` renders application’s own Vue instance in supplied container.

**Interpretation:** Internal Vue rendering. Section 3.4.4 records Composition `No`; composition boundary is export `mount` rather than this call.

### 17. packages/app-2/src/entry.js:13

**Observation:** `app.mount(container)` renders application’s own Vue instance in supplied container.

**Interpretation:** Internal Vue rendering. Section 3.4.4 records Composition `No`; composition boundary is export `mount` rather than this call.

### 18. packages/host/src/routeManifest.js:1-35

**Observation:** Array declares `app1`, entry `http://localhost:5011/remoteEntry.js` and route `/app-1`; also declares `app2`, entry `http://localhost:5012/remoteEntry.js` and `/app-2`. `getRemotes` extracts `remote` objects.

**Interpretation:** Explicitly links host routes to two named remotes. Application-executed code classified in dimension 3.

### 19. packages/host/src/plugins/federationPlugin.js:9-18; packages/host/src/main.js:15

**Observation:** Plugin transforms received remotes into `name`, `entry` and `type: module`, calling `init({ name: host, remotes: mfRemotes })`. Host installs plugin with `getRemotes()`.

**Interpretation:** Registers federated mechanism with parameter-supplied targets without naming them in registration block.

### 20. packages/host/src/components/Loader.vue:2; packages/host/src/components/Loader.vue:63-84

**Observation:** After loading host calls `remoteModule.mount(containerRef.value)`; before switching calls `unmount` of previous module.

**Interpretation:** Mounts/unmounts loaded remote in host container without fixing unit name in call.

### 21. .; package.json:4-9; .github/workflows/main_vdumpavue3.yml:26-33; .github/workflows/main_vdumpavue3.yml:67-73

**Observation:** Root declares workspace `packages/*` and script `dev: lerna run dev`, without UI entry/build script; workflow archives/publishes repository tree.

**Interpretation:** Coordination root, recorded Frontend unit `No`, rather than fourth application.

### 22. packages/app-1; packages/app-1/index.html:11; packages/app-1/src/main.js:5; packages/app-1/package.json:6-10; packages/app-1/vite.config.js:6-21

**Observation:** Directory has own manifest, HTML loading `/src/main.js`, Vue-mounting entry, Vite configuration and script `build: vite build`.

**Interpretation:** Confirms frontend unit boundary, recorded `Yes` in 3.4.3, without alone establishing inter-application link.

### 23. packages/app-2; packages/app-2/index.html:11; packages/app-2/src/main.js:5; packages/app-2/package.json:6-10; packages/app-2/vite.config.js:6-21

**Observation:** Directory has own manifest, HTML loading `/src/main.js`, Vue-mounting entry, Vite configuration and script `build: vite build`.

**Interpretation:** Confirms frontend unit boundary, recorded `Yes` in 3.4.3, without alone establishing inter-application link.

### 24. packages/host; packages/host/index.html:11; packages/host/src/main.js:8-17; packages/host/package.json:6-10; packages/host/vite.config.js:7-24

**Observation:** Directory has own manifest, HTML loading `/src/main.js`, Vue-mounting entry, Vite configuration and script `build: vite build`.

**Interpretation:** Confirms frontend unit boundary, recorded `Yes` in 3.4.3, without alone establishing inter-application link.

### 25. packages/host/src/routeManifest.js:3-9; packages/app-1/vite.config.js:9-16; packages/app-1/src/entry.js:6-25; packages/host/src/plugins/federationPlugin.js:9-18; packages/host/src/plugins/federationPlugin.js:27-35; packages/host/src/components/Loader.vue:63-108

**Observation:** Manifest associates route `/app-1` with remote `app1` and its `remoteEntry.js`. Name matches configuration of `packages/app-1`, exposing `./entry`. Host registers remote, resolves `<remote>/entry` and calls exports `mount`/`unmount`.

**Interpretation:** Establishes active host → remote Module Federation relationship between snapshot units per 3.4.5.

### 26. packages/host/src/routeManifest.js:16-22; packages/app-2/vite.config.js:9-16; packages/app-2/src/entry.js:6-25; packages/host/src/plugins/federationPlugin.js:9-18; packages/host/src/plugins/federationPlugin.js:27-35; packages/host/src/components/Loader.vue:63-108

**Observation:** Manifest associates route `/app-2` with remote `app2` and its `remoteEntry.js`. Name matches configuration of `packages/app-2`, exposing `./entry`. Host registers remote, resolves `<remote>/entry` and calls exports `mount`/`unmount`.

**Interpretation:** Establishes active host → remote Module Federation relationship between snapshot units per 3.4.5.

### 27. packages/app-1/package.json:3-9; packages/app-1/vite.config.js:6-21; .github/workflows/main_vdumpavue3.yml:26-33; .github/workflows/main_vdumpavue3.yml:67-73; package.json:7-9

**Observation:** `packages/app-1` has own `vite build` and configuration, version `0.0.0` and `private: true`. Workflow runs optional root build without `build` script, archives tree and publishes zip to Azure Web App `vdumpavue3`.

**Interpretation:** Build `separate` confirms application boundary. Deploy `Undetermined` and Versioning `No` remain as in 3.4.6: workflow does not demonstrate built application served.

### 28. packages/app-2/package.json:3-9; packages/app-2/vite.config.js:6-21; .github/workflows/main_vdumpavue3.yml:26-33; .github/workflows/main_vdumpavue3.yml:67-73; package.json:7-9

**Observation:** `packages/app-2` has own `vite build` and configuration, version `0.0.0` and `private: true`. Workflow runs optional root build without `build` script, archives tree and publishes zip to Azure Web App `vdumpavue3`.

**Interpretation:** Build `separate` confirms application boundary. Deploy `Undetermined` and Versioning `No` remain as in 3.4.6: workflow does not demonstrate built application served.

### 29. packages/host/package.json:3-9; packages/host/vite.config.js:7-24; .github/workflows/main_vdumpavue3.yml:26-33; .github/workflows/main_vdumpavue3.yml:67-73; package.json:7-9

**Observation:** `packages/host` has own `vite build` and configuration, version `0.0.0` and `private: true`. Workflow runs optional root build without `build` script, archives tree and publishes zip to Azure Web App `vdumpavue3`.

**Interpretation:** Build `separate` confirms application boundary. Deploy `Undetermined` and Versioning `No` remain as in 3.4.6: workflow does not demonstrate built application served.

### 30. .github/workflows/main_vdumpavue3.yml:4

**Observation:** Workflow name field states: "Build and deploy Node.js app to Azure Web App - vdumpavue3".

**Interpretation:** Build/deployment claim contradicted: workflow publishes sources; root defines no build. Does not demonstrate functional application deployment.

### 31. README.md:3

**Observation:** README states: "demonstrate the Micro Frontend Architecture using Vue 3, Vite, and Module Federation to build modular applications".

**Interpretation:** Architectural presentation corroborated by three units and two federated relationships.

### 32. README.md:3

**Observation:** README states: "Each micro frontend runs with its own Vue instance, initialized separately via `entry.js`, rather than sharing the host's Vue instance.".

**Interpretation:** Instance separation corroborated by mounting exports; sharing Vue library does not mean sharing instance.

### 33. README.md:5

**Observation:** README states: "this project utilizes a Route Manifest to dynamically define and manage routing for different micro frontends".

**Interpretation:** Central host manifest derives routes/remotes; claim corroborated in this sense.

### 34. README.md:7

**Observation:** README states: "Dynamically loading routes from micro frontends".

**Interpretation:** Attribution of routes to remotes contradicted: host manifest defines paths, remotes only expose `./entry`.

### 35. README.md:8

**Observation:** README states: "Ensuring seamless navigation between different micro apps".

**Interpretation:** Inter-unit navigation corroborated by links and remote switching in same container; experience quality not measured.

### 36. README.md:9

**Observation:** README states: "Registering and updating route configurations at runtime".

**Interpretation:** Partial claim: registration on router creation without demonstrated later update.

### 37. README.md:10

**Observation:** README states: "Maintaining consistency in route structure across the micro frontends".

**Interpretation:** Common manifest entry form and uniform route conversion corroborate claim.

### 38. README.md:11

**Observation:** README states: "Delegating rendering responsibilities to `Loader.vue`, which mounts or unmounts micro frontends dynamically".

**Interpretation:** Delegation of mounting/unmounting to host loader corroborated by code.

### 39. README.md:16

**Observation:** README states: "Vite for fast development and bundling".

**Interpretation:** Per-application Vite builds corroborate tool claim; speed not measured.

### 40. README.md:17

**Observation:** README states: "Module Federation to dynamically load micro frontends".

**Interpretation:** Federated loading corroborated by active relationships/runtime.

### 41. README.md:18

**Observation:** README states: "Lerna for monorepo management".

**Interpretation:** Partial claim: development script invokes Lerna, but configuration minimal and dependency remains `Undetermined` in 3.4.2.

### 42. README.md:19

**Observation:** README states: "Independent Routing per micro frontend".

**Interpretation:** Independent per-remote routing contradicted by central host routes and router-free remote exports.

### 43. README.md:28-30

**Observation:** README states: "host/ # Shell application (Main container)", "app-1/ # Micro frontend 1", "app-2/ # Micro frontend 2".

**Interpretation:** Shell/remote roles corroborated by recorded units/relationships.

### 44. README.md:32

**Observation:** README states: "package.json # Monorepo package manager with workspaces".

**Interpretation:** Npm workspace corroborated by root manifest; describes directory coordination rather than composition.

### 45. README.md:58-63

**Observation:** README states: "Alternatively, you can start each package individually".

**Interpretation:** Own entries/scripts corroborate individual development execution without demonstrating separate deployment.

### 46. packages/host/src/plugins/federationPlugin.js:3-6

**Observation:** Comment states: "initializes the module federation plugin before the app is mounted".

**Interpretation:** Announced initialization order corroborated by plugin installation before host mounting.

### 47. packages/host/vite.config.js:12

**Observation:** Comment states: "Entry point for the host's own remote modules".

**Interpretation:** Claim of host-exposed own modules contradicted by configuration without `exposes`.

### 48. e4a97c4 2025-05-17 (package.json; lerna.json)

**Observation:** First commit already contains Lerna declaration, script `dev` and minimal configuration; files unchanged through snapshot.

**Interpretation:** History does not clarify Lerna usage before first observable presence. Uncertainty establishes no frontend composition alternative; dependency remains `Undetermined`.

### 49. e4a97c4 2025-05-17 (package.json); d4cef45 2025-05-25 (.github/workflows/main_vdumpavue3.yml)

**Observation:** Azure workflow enters alone in second and final commit without manifest changes; root still lacks build/start.

**Interpretation:** Whether deployment serves application or configuration never produced functional publication remains undetermined. Uncertainty affects snapshot unit deployment reading.

### 50. e4a97c4 2025-05-17 (README.md; packages/host/src/routeManifest.js; packages/host/src/router/index.js)

**Observation:** README, manifest and router arrive together in first commit, unchanged through snapshot. No observable stage with routes originating from remotes.

**Interpretation:** Inconclusive whether documentation corresponded to stage predating history; snapshot remains clear about central host routing.

### 51. e4a97c4 2025-05-17 (packages/host/vite.config.js)

**Observation:** Host-own-remote-module comment and configuration without `exposes` already coexist in first commit, unchanged afterward.

**Interpretation:** History does not clarify whether comment came from intention or earlier configuration; snapshot exposes no modules through host.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:12) | 1 technology | manifest | — | context | ambiguous | — |
| 2 | 3.4.2 (packages/app-1/package.json:16) | 1 technology | manifest | module-federation | technological | weak | declares #6 |
| 3 | 3.4.2 (packages/app-2/package.json:16) | 1 technology | manifest | module-federation | technological | weak | declares #7 |
| 4 | 3.4.2 (packages/host/package.json:18) | 1 technology | manifest | module-federation | technological | weak | declares #19; declares #11 |
| 5 | 3.4.2 (packages/host/package.json:19) | 1 technology | manifest | module-federation | technological | weak | declares #8 |
| 6 | 3.4.2 (packages/app-1/package.json:16, Evidence); 3.4.3 (packages/app-1, Markers and Build); 3.4.4 (packages/app-1/src/entry.js:6, Observation); 3.4.5 #1 (Configuration); 3.4.6 #1 (Artifacts); 3.4.4 (packages/host/src/plugins/federationPlugin.js:29, Observation); 3.4.7 #5 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #22; configures #12; configures #25 |
| 7 | 3.4.2 (packages/app-2/package.json:16, Evidence); 3.4.3 (packages/app-2, Markers and Build); 3.4.4 (packages/app-2/src/entry.js:6, Observation); 3.4.5 #2 (Configuration); 3.4.6 #2 (Artifacts); 3.4.4 (packages/host/src/plugins/federationPlugin.js:29, Observation); 3.4.7 #5 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #23; configures #14; configures #26 |
| 8 | 3.4.2 (packages/host/package.json:19, Evidence); 3.4.3 (packages/host, Markers and Build); 3.4.5 #1, #2 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #18 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #24; configures #19 |
| 9 | 3.4.4 (packages/host/src/components/Loader.vue:70, src-load-remote) | 3 code | source code | module-federation | technological | moderate | implements #25; implements #26 |
| 10 | 3.4.4 (packages/host/src/components/Loader.vue:96, src-load-remote) | 3 code | source code | module-federation | technological | moderate | implements #25; implements #26 |
| 11 | 3.4.4 (packages/host/src/plugins/federationPlugin.js:29, src-load-remote) | 3 code | source code | module-federation | technological | moderate | implements #25; implements #26 |
| 12 | 3.4.4 (packages/app-1/src/entry.js:6, src-mount-export) | 3 code | source code | module-federation | architectural | moderate | implements #25 |
| 13 | 3.4.4 (packages/app-1/src/entry.js:20, src-mount-export) | 3 code | source code | module-federation | architectural | moderate | implements #25 |
| 14 | 3.4.4 (packages/app-2/src/entry.js:6, src-mount-export) | 3 code | source code | module-federation | architectural | moderate | implements #26 |
| 15 | 3.4.4 (packages/app-2/src/entry.js:20, src-mount-export) | 3 code | source code | module-federation | architectural | moderate | implements #26 |
| 16 | 3.4.4 (packages/app-1/src/entry.js:13, src-mount-call) | 3 code | source code | — | context | weak | — |
| 17 | 3.4.4 (packages/app-2/src/entry.js:13, src-mount-call) | 3 code | source code | — | context | weak | — |
| 18 | 3.4.4 (packages/host/src/routeManifest.js:1, manual) | 3 code | source code | module-federation | architectural | strong | implements #25; implements #26 |
| 19 | 3.4.4 (packages/host/src/plugins/federationPlugin.js:15, manual) | 3 code | source code | module-federation | technological | moderate | implements #25; implements #26 |
| 20 | 3.4.4 (packages/host/src/components/Loader.vue:74, manual) | 3 code | source code | module-federation | architectural | moderate | implements #25; implements #26 |
| 21 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 22 | 3.4.3 (packages/app-1) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.3 (packages/app-2) | 4 structure | directory | — | architectural | moderate | — |
| 24 | 3.4.3 (packages/host) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #24; links #22 |
| 26 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #24; links #23 |
| 27 | 3.4.6 #1 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #22 |
| 28 | 3.4.6 #2 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #23 |
| 29 | 3.4.6 #3 | 6 build-deploy | manifest | module-federation | architectural | moderate | publishes #24 |
| 30 | 3.4.7 #1 | 7 documentation | comment | — | context | weak | contradicts package.json:7-9; contradicts .github/workflows/main_vdumpavue3.yml:26-33 |
| 31 | 3.4.7 #2 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26 |
| 32 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #14; corroborates packages/host/src/main.js:8-17 |
| 33 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #18; corroborates packages/host/src/router/index.js:4-22 |
| 34 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | contradicts #18; contradicts #6; contradicts #7 |
| 35 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #26; corroborates #20; corroborates packages/host/src/App.vue:4-8 |
| 36 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | partially corroborates packages/host/src/router/index.js:4-22; partially corroborates packages/host/src/main.js:13 |
| 37 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #18; corroborates packages/host/src/router/index.js:5-12 |
| 38 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #10; corroborates #20 |
| 39 | 3.4.7 #10 | 7 documentation | documentation | — | context | weak | corroborates #27; corroborates #28; corroborates #29 |
| 40 | 3.4.7 #11 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #25; corroborates #26; corroborates #11; corroborates #19 |
| 41 | 3.4.7 #12 | 7 documentation | documentation | — | context | weak | partially corroborates package.json:4-8; partially corroborates lerna.json:1-4 |
| 42 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | contradicts #18; contradicts packages/app-1/src/entry.js:8-13; contradicts packages/app-1/package.json:11-13; contradicts packages/app-2/package.json:11-13 |
| 43 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26 |
| 44 | 3.4.7 #15 | 7 documentation | documentation | — | context | weak | corroborates #21; corroborates package.json:4-6 |
| 45 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | corroborates #22; corroborates #23; corroborates #24; corroborates packages/app-1/package.json:7; corroborates packages/app-2/package.json:7; corroborates packages/host/package.json:7 |
| 46 | 3.4.7 #17 | 7 documentation | comment | module-federation | technological | weak | corroborates #19; corroborates packages/host/src/main.js:15-17 |
| 47 | 3.4.7 #18 | 7 documentation | comment | — | architectural | weak | contradicts #8 |
| 48 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #1; explains #41 |
| 49 | 3.4.8 #2 | 8 history | history | — | architectural | ambiguous | explains #27; explains #28; explains #29; explains #30 |
| 50 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #34; explains #36; explains #42 |
| 51 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #8; explains #47 |

## Summary

Observations: 51. Dimensions (technology: 5, configuration: 3, code: 12, structure: 4, composition: 2, build-deploy: 3, documentation: 18, history: 4). Strength (strong: 3, moderate: 18, weak: 28, ambiguous: 2). Evidence (technological: 12, architectural: 30, context: 9).


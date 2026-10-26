---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Repository overview

Documentation is English root README. Presents Vue 3/Vite/Module Federation micro frontend example in Lerna monorepo, host shell/two micro frontends, each own Vue instance. Most text describes host "Route Manifest" and `Loader.vue`, mounting/unmounting remotes by route. READMEs in `packages/app-1/`, `packages/app-2/`, `packages/host/` are Vite templates (packages/app-1/README.md:1-5), without project claims.

Generally matches reviews: three Vite workspace applications, host loads two through `@module-federation/runtime`, manifest routes all point to `Loader.vue`. Differences routing details. README assigns own routes/routing to micro frontends, but all in host manifest (packages/host/src/routeManifest.js:7-13, 20-26), remotes no routers. Advertises runtime route updates, no implementing code. Two example blocks (README.md:79-98, 101-122) reproduce source, no rows, mismatch snapshot. README.md:78 title `packages/host/src/router/routeManifest.js`, actual `packages/host/src/routeManifest.js`. Example modules `app1/App`/`app2/App`, actual `module: 'app1'` (packages/host/src/routeManifest.js:4), plugin appending `/entry` (packages/host/src/plugins/federationPlugin.js:29). Example router default exports `router`, actual exports `useRoute` (packages/host/src/router/index.js:24-26). Clone targets another repository `lmlong-huynh/micro-frontend-sample` (README.md:41-42).

Excluded:
- `localhost` 5010, 5011, 5012 address table (README.md:65-70), infrastructure ports matching packages/host/vite.config.js:22, packages/app-1/vite.config.js:19, packages/app-2/vite.config.js:19;
- `npm run dev` "will start the host app and all micro frontends simultaneously" (README.md:52-56), run instruction matching `lerna run dev` (package.json:8).

`doc-*` occurrences excluded: README.md:1 title; README.md:26 tree root; README.md:41/:42 clone command; README.md:52/:56 run instruction above; README.md:65/:66 address-table title/header; README.md:106-109 code block. Others in table: README.md:3 (#2/#3), :5 (#4), :7 (#5), :9 (#7), :10 (#8), :11 (#9), :15 (#2), :17 (#11), :19 (#13), :20 (#3), :29-30 (#14), :72 (#4/#11), :76 (#4/#9), :124 (#9).

Comments/fields read: root/three package `package.json` (none `description`), `lerna.json`, three `vite.config.js`, `index.html` ("Vite + Vue" title), `packages/host/src/main.js`, `App.vue`, `router/index.js`, `routeManifest.js`, `plugins/federationPlugin.js`, `components/Loader.vue`, remote `entry.js`/`main.js`, workflow `.github/workflows/main_vdumpavue3.yml`. Rows: workflow name (#1), `federationPlugin.js` comment (#17), host `filename` comment (#18). `Loader.vue` comments (:62, :66, :69, :99, `unmount` contract :43-46) repeat #9/#11. Read without rows: `Remote` type (packages/host/src/components/Loader.vue:22-26), no `entry` means module default export, plugin always requests `<remote>/entry` (packages/host/src/plugins/federationPlugin.js:29), internal host detail; `getRemotes` comment (packages/host/src/routeManifest.js:30-32) function description; `// Ensure shared dependencies are listed` (packages/host/vite.config.js:13), instruction beside `shared: ['vue']` declared by three (packages/app-1/vite.config.js:15; packages/app-2/vite.config.js:15); workflow comments (:1-2, :16, :48) Azure-template links/permissions.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | .github/workflows/main_vdumpavue3.yml:4 | "Build and deploy Node.js app to Azure Web App - vdumpavue3" | build-deploy | contradicted | 3.4.6 #1, #2, #3; .github/workflows/main_vdumpavue3.yml:26-33, 67-73; package.json:7-9 |
| 2 | README.md:3 | "demonstrate the Micro Frontend Architecture using Vue 3, Vite, and Module Federation to build modular applications" | structure | corroborated | 3.4.3 (packages/app-1, packages/app-2 and packages/host `Yes`); 3.4.2 (`@module-federation/vite` and `@module-federation/runtime` `Yes`); 3.4.5 #1, #2 |
| 3 | README.md:3 | "Each micro frontend runs with its own Vue instance, initialized separately via `entry.js`, rather than sharing the host's Vue instance." | composition | corroborated | 3.4.4 (src-mount-export from packages/app-1/src/entry.js:6 and packages/app-2/src/entry.js:6); packages/app-1/src/entry.js:6-13; packages/app-2/src/entry.js:6-13; packages/host/src/main.js:8-17 |
| 4 | README.md:5 | "this project utilizes a Route Manifest to dynamically define and manage routing for different micro frontends" | composition | corroborated | 3.4.4 (manual packages/host/src/routeManifest.js:1); packages/host/src/routeManifest.js:1-28; packages/host/src/router/index.js:4-22 |
| 5 | README.md:7 | "Dynamically loading routes from micro frontends" | composition | contradicted | packages/host/src/routeManifest.js:7-13, 20-26; packages/app-1/vite.config.js:12-14; packages/app-2/vite.config.js:12-14 |
| 6 | README.md:8 | "Ensuring seamless navigation between different micro apps" | composition | corroborated | 3.4.5 #2; packages/host/src/App.vue:4-8; packages/host/src/components/Loader.vue:64-74, 103-108 |
| 7 | README.md:9 | "Registering and updating route configurations at runtime" | composition | partial | packages/host/src/router/index.js:4-22; packages/host/src/main.js:13 |
| 8 | README.md:10 | "Maintaining consistency in route structure across the micro frontends" | composition | corroborated | packages/host/src/routeManifest.js:2-27; packages/host/src/router/index.js:5-12 |
| 9 | README.md:11 | "Delegating rendering responsibilities to `Loader.vue`, which mounts or unmounts micro frontends dynamically" | composition | corroborated | 3.4.4 (packages/host/src/components/Loader.vue:70, :96 and :74); packages/host/src/router/index.js:11; packages/host/src/components/Loader.vue:63-84 |
| 10 | README.md:16 | "Vite for fast development and bundling" | build-deploy | corroborated | 3.4.6 #1, #2, #3 (build `separate`); packages/app-1/package.json:7-8; packages/app-2/package.json:7-8; packages/host/package.json:7-8 |
| 11 | README.md:17 | "Module Federation to dynamically load micro frontends" | composition | corroborated | 3.4.5 #1, #2; packages/host/src/plugins/federationPlugin.js:15-18, 29 |
| 12 | README.md:18 | "Lerna for monorepo management" | structure | partial | 3.4.2 (lerna `Undetermined`); package.json:4-8; lerna.json:1-4 |
| 13 | README.md:19 | "Independent Routing per micro frontend" | independence | contradicted | packages/host/src/routeManifest.js:7-13, 20-26; packages/app-1/package.json:11-13; packages/app-2/package.json:11-13; packages/app-1/src/entry.js:8-13 |
| 14 | README.md:28-30 | "host/ # Shell application (Main container)", "app-1/ # Micro frontend 1", "app-2/ # Micro frontend 2" | structure | corroborated | 3.4.3 (packages/host, packages/app-1, packages/app-2 `Yes`); 3.4.5 #1, #2 |
| 15 | README.md:32 | "package.json # Monorepo package manager with workspaces" | structure | corroborated | 3.4.3 (workspace); package.json:4-6 |
| 16 | README.md:58-63 | "Alternatively, you can start each package individually" | independence | corroborated | packages/host/package.json:7; packages/app-1/package.json:7; packages/app-2/package.json:7; packages/app-1/src/main.js:5; packages/app-2/src/main.js:5 |
| 17 | packages/host/src/plugins/federationPlugin.js:3-6 | "initializes the module federation plugin before the app is mounted" | composition | corroborated | 3.4.4 (manual packages/host/src/plugins/federationPlugin.js:15); packages/host/src/plugins/federationPlugin.js:9-18; packages/host/src/main.js:15-17 |
| 18 | packages/host/vite.config.js:12 | "Entry point for the host's own remote modules" | composition | contradicted | packages/host/vite.config.js:10-14; 3.4.5 (only relationships host → remote) |

## Observations

**1. .github/workflows/main_vdumpavue3.yml:4.** Workflow name says builds/deploys application. Deployment exists: job `deploy` publishes zip to Azure Web App `vdumpavue3` (.github/workflows/main_vdumpavue3.yml:67-73). Build refuted: step runs root `npm run build --if-present` (:26-30), without `build` script (package.json:7-9), zip includes source tree without package `vite build` (:32-33). Hence build and deployment review Deploy `Undetermined` for three. Name Azure Node.js wizard default, root no `start`.

**2. README.md:3.** Three Vue 3/Vite workspace applications, Module Federation: `@module-federation/vite` in three configurations, `@module-federation/runtime` in host. Composition two active host → remote relationships. "Micro Frontend Architecture with Vue 3" (README.md:15) repeats.

**3. README.md:3.** Each remote own `createApp` instance inside `mount` (packages/app-1/src/entry.js:8-13; packages/app-2/src/entry.js:8-13), host own at packages/host/src/main.js:8. Host calls each remote `mount` in container (packages/host/src/components/Loader.vue:74). Separate instance but library `vue` declared `shared` in three configurations (packages/host/vite.config.js:13; packages/app-1/vite.config.js:15; packages/app-2/vite.config.js:15), no contradiction. "Separate Vue Instances for each micro frontend" (README.md:20) repeats.

**4. README.md:5.** Manifest fixed host array (packages/host/src/routeManifest.js:1-28), each micro frontend's remote/route. Router derives routes on initialization (packages/host/src/router/index.js:4-22), `getRemotes` (packages/host/src/routeManifest.js:33-35) feeds remote registration. "Dinâmico" (English translation: "Dynamic") means routes derived through code rather than declared individually; manifest itself compiled into host. Repetitions: "Dynamic Route Manifest Management" (README.md:21), "manages routing through the Route Manifest" (README.md:72), "The Route Manifest is used to dynamically register micro frontend routes in the host application" (README.md:76).

**5. README.md:7.** Literally says routes come from micro frontends. Names/paths in host manifest (packages/host/src/routeManifest.js:7-13, 20-26). Remotes expose only `./entry` with `mount`/`unmount` (packages/app-1/vite.config.js:12-14; packages/app-2/vite.config.js:12-14), no routes. Dynamically loaded object is route's micro frontend rather than route.

**6. README.md:8.** Host links `/app-1`/`/app-2`, sole `<RouterView />` (packages/host/src/App.vue:4-8). Route change `Loader.vue` unmounts current remote/mounts new in same container (packages/host/src/components/Loader.vue:64-74, 103-108), without page reload. "Seamless" unmeasured quality; navigation mechanism exists.

**7. README.md:9.** Registration exists: router created at runtime from manifest (packages/host/src/router/index.js:4-22), installed at packages/host/src/main.js:13. Updates lack artifacts: no `addRoute`, `removeRoute`, other post-creation changes, manifest constant. Hence `partial`.

**8. README.md:10.** Both manifest entries same shape: `remote` (`module`, `entry`), `route` (`name`, `path`, `meta`) (packages/host/src/routeManifest.js:2-27). Router converts alike with same component (packages/host/src/router/index.js:5-12). Consistency from single host file rather than micro frontend internals.

**9. README.md:11.** All routes use `Loader.vue` (packages/host/src/router/index.js:11), finding route remote/unmounting previous/loading new/calling `mount` (packages/host/src/components/Loader.vue:63-84, 87-97). Repetitions: "Instead of directly referencing remote apps, all routes are set to render `Loader.vue`, which is responsible for loading, mounting, and unmounting the micro frontends dynamically" (README.md:76), "using `Loader.vue` as the single entry point for rendering micro frontends" (README.md:124), comments packages/host/src/components/Loader.vue:43-46, 62, 66, 99.

**10. README.md:16.** Each package `vite` development/`vite build` own artifact (packages/app-1/package.json:7-8; packages/app-2/package.json:7-8; packages/host/package.json:7-8). Build and deployment review `separate` builds for three. "Fast" unverifiable.

**11. README.md:17.** Host registers through `init` of `@module-federation/runtime`, loads on demand through `loadRemote(`${module}/entry`)` (packages/host/src/plugins/federationPlugin.js:15-18, 29), called by `Loader.vue` on route render (packages/host/src/components/Loader.vue:70). Repetitions: "The Host dynamically loads App 1 and App 2 via Module Federation" (README.md:72), "Load the remote module dynamically via Vite Module Federation" (packages/host/src/components/Loader.vue:69). Comment names Vite, call from runtime library; both Module Federation, dependency-reviewed technology, host also uses `@module-federation/vite` (packages/host/vite.config.js:3, 10-14).

**12. README.md:18.** Lerna development dependency orchestrating root `dev` (`lerna run dev`, package.json:8). `lerna.json` only `$schema`/`version` (lerna.json:1-4), npm `workspaces` defines packages (package.json:4-6). No Lerna build/versioning/publishing. Dependency review `lerna` `Undetermined`. `dev` role holds, rest of "gestão do monorepo" (English translation: "monorepo management") lacks artifact. "lerna.json # Lerna configuration" (README.md:33) repeats.

**13. README.md:19.** No micro frontend own routing. Remotes lack `vue-router` dependency (packages/app-1/package.json:11-13; packages/app-2/package.json:11-13), `mount` creates app without router (packages/app-1/src/entry.js:8-13). Host manifest defines app-1/app-2 routes (packages/host/src/routeManifest.js:7-13, 20-26). Host-central routing opposite claim. Theme `independence`, per-unit routing claimed as own property.

**14. README.md:28-30.** Tree roles: `host` shell/main container, `app-1`/`app-2` micro frontends. Structural three frontend units, composition host loads both.

**15. README.md:32.** Root declares `packages/*` in `workspaces` (package.json:4-6), structural-review workspace.

**16. README.md:58-63.** Each own `dev` through `vite` (packages/host/package.json:7; packages/app-1/package.json:7; packages/app-2/package.json:7). Standalone remotes through `main.js` mounting own app on `#app`, bypassing `entry.js` (packages/app-1/src/main.js:5; packages/app-2/src/main.js:5). Host starts alone but only displays if remotes served at manifest addresses (packages/host/src/routeManifest.js:5, 18). Failure caught/logged (packages/host/src/components/Loader.vue:81-83).

**17. packages/host/src/plugins/federationPlugin.js:3-6.** Host Vue plugin calls `init` from `@module-federation/runtime` with manifest remotes (packages/host/src/plugins/federationPlugin.js:9-18). Installed at packages/host/src/main.js:15 before `app.mount('#app')` at :17, as comment says. Same `remote-resolution` construct in source-code review.

**18. packages/host/vite.config.js:12.** Comment says host `remoteEntry.js` entry for host's own remote modules. Host plugin lacks `exposes` (packages/host/vite.config.js:10-14), offers no modules. Composition no host-as-remote relationship, notes `filename` without `exposes` creates none.

## Summary

Claims: 18 (corroborated: 12, partial: 2, contradicted: 4, uncorroborated: 0). Themes: (structure: 4, composition: 10, build-deploy: 2, independence: 2).

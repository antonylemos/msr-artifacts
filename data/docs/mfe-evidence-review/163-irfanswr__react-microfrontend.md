---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
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

# 163 — irfanswr/react-microfrontend

## Repository overview

Single-spa example with three sibling projects and no root workspace. `parent-app` is root config (#32), and applications are React `react-child-app` (#33) and Vue 3 `vue-child-app` (#34). Each project has own build and none has observed deployment (#37–#39).

Architecture-supporting chain is short and entirely in snapshot:
- **Dependencies:** `single-spa` and `single-spa-layout` in root (#2, #3), and adapters `single-spa-react` and `single-spa-vue` in applications (#5, #7). Create-single-spa webpack configurations are in root and React (#4, #6).
- **Configuration:** layout declares both applications at default route and each at own route (#12). Root page local import map translates application names to URLs at `localhost:8081` and `localhost:8082` (#9). Webpack configurations give each project name requested by import map (#10, #11).
- **Code:** root config constructs applications from layout, loading through name-based `import()` (#27). Then registers all and calls `start()` (#28, #29). Import map row (#30) and route table (#31) name targets. On other side, each application exports lifecycles created by its framework adapter (#13–#19).
- **Relationships:** two root-config → application relationships result, both active (#35, #36).

Caveat applies to entire chain: application import map only exists when page is generated with `isLocal`, through `start` script (#9, #10). Production map is commented out, and history does not say whether planned or merely generator text (#44). Executable example path is development.

Misleading signals:
- **Import-map libraries:** `index.ejs` lines matched as import map or external script are template comments (#20–#22) or CDN libraries, `import-map-overrides` and injector (#23–#26). None loads a unit.
- **`@types/systemjs`:** declared and unused (#1). Import map uses single-spa injector rather than SystemJS, and history does not explain declaration origin (#41).

Vue side remains ambiguous. `vue-cli-plugin-single-spa` is declared but configured by no file (#8). Vue bundle format depends on it, and history does not resolve uncertainty (#42). Vue relationship is declared in layout and import map (#9, #12), but snapshot does not show whether bundle served at `/js/app.js` is compatible with root native `import()`. React ESM bundle is explicitly configured (#11).

Documentation is one sentence, subtitle displayed by React application. Corroborated (#40).

Configuration: 4 blocks retained, one per file, because each file serves one unit. Page `parent-app/src/index.ejs` included through its shared-dependency and application import maps (#9). Layout included as application registry (#12). Excluded:
- `vue-child-app/vue.config.js:1-4`, containing only `transpileDependencies`;
- `vue-child-app/.env.standalone:1`, enabling standalone development mode;
- `scripts` of `package.json` files, which concern build or development server (dimension 6) and whose ports 3.4.5 marked as corroboration;
- `name` fields of `package.json` files (react-child-app/package.json:2; vue-child-app/package.json:2). Package identifiers, read by no snapshot file for composition. Composition names are in import map and layout.

## Observations

### 1. parent-app/package.json:41

**Observation:** `@types/systemjs` `^6.1.1` in `dependencies`. Review marks it unconfigured: no snapshot file imports package, references types or uses `systemjs`/`System.`, and no TypeScript file exists. Import map in parent-app/src/index.ejs:9, 15 and 45 uses `@single-spa/import-map-injector`.

**Interpretation:** Unused declaration. Does not indicate SystemJS in composition.

### 2. parent-app/package.json:42

**Observation:** `single-spa` `^5.9.3` in `dependencies`. Review marks it configured through import and calls `registerApplication` and `start()` in parent-app/src/frontenddevs-root-config.js:1, 18-20.

**Interpretation:** Root declares single-spa orchestrator and uses it in entry.

### 3. parent-app/package.json:43

**Observation:** `single-spa-layout` `^1.6.0` in `dependencies`. Review marks it configured through import of `constructApplications`, `constructRoutes` and `constructLayoutEngine`, used with `./microfrontend-layout.html` in parent-app/src/frontenddevs-root-config.js:2-19.

**Interpretation:** Root declares single-spa declarative layout engine and uses it to construct routes and applications.

### 4. parent-app/package.json:35

**Observation:** `webpack-config-single-spa` `^8.0.0` in `devDependencies`. Review marks it configured through `singleSpaDefaults({ orgName, projectName: "root-config", ... })` in parent-app/webpack.config.js:2, 7-13, read by `webpack serve` and `webpack --mode=production` (parent-app/package.json:4, 11).

**Interpretation:** Root declares default single-spa webpack configuration and uses it in build.

### 5. react-child-app/package.json:49

**Observation:** `single-spa-react` `^6.0.2` in `dependencies`. Review marks it configured through import and call `singleSpaReact(...)` in react-child-app/src/frontenddevs-react-mfe.js:3, 6-16, creating exported lifecycles.

**Interpretation:** React application declares single-spa adapter and uses it to expose itself to root.

### 6. react-child-app/package.json:42

**Observation:** `webpack-config-single-spa-react` `^8.0.0` in `devDependencies`. Review marks it configured through `singleSpaDefaults({ orgName: "frontenddevs", projectName: "react-mfe", ... })` in react-child-app/webpack.config.js:2, 5-11, read by scripts in react-child-app/package.json:4, 7.

**Interpretation:** React application declares single-spa webpack configuration for React and uses it in build.

### 7. vue-child-app/package.json:13

**Observation:** `single-spa-vue` `^3.0.1` in `dependencies`. Review marks it configured through import and call `singleSpaVue(...)` in vue-child-app/src/main.js:2, 6-26, default `vue-cli-service` entry.

**Interpretation:** Vue application declares single-spa adapter and uses it to expose itself to root.

### 8. vue-child-app/package.json:24

**Observation:** `vue-cli-plugin-single-spa` `~4.0.0` in `devDependencies`. No snapshot file imports or invokes it, and vue-child-app/vue.config.js:1-4 does not mention it. Scripts use `vue-cli-service serve`/`build` and `--mode standalone` (vue-child-app/package.json:6-9), and vue-child-app/.env.standalone:1 defines `STANDALONE_SINGLE_SPA=true`. Review marks it undetermined.

**Interpretation:** Two readings remain plausible. Under Vue CLI convention plugin would load because declared, defining Vue single-spa bundle format. Or it does not participate in build, producing default Vue CLI format. Snapshot does not show which applies.

### 9. parent-app/src/index.ejs:9; parent-app/src/index.ejs:15-26; parent-app/src/index.ejs:32-41; parent-app/src/index.ejs:45; parent-app/webpack.config.js:21-22

**Observation:** Root page contains two `<script type="injector-importmap">` blocks, installed by CDN `@single-spa/import-map-injector`. First (:15-26) maps `react`, `react-dom`, `react-dom/client`, `process`, `scheduler` and `single-spa` to CDN URLs. Second (:33-41) only generated with `isLocal` (:32), a parameter from `--env isLocal` through HtmlWebpackPlugin. Maps `@frontenddevs/root-config` → `//localhost:9000/frontenddevs-root-config.js`, `@frontenddevs/react-mfe` → `http://localhost:8081/frontenddevs-react-mfe.js` and `@frontenddevs/vue-child-app` → `http://localhost:8082/js/app.js`. Production map commented out (:30).

**Interpretation:** Root declares both application URLs and CDN-shared dependencies through import map. Resolves composition targets only in local mode.

### 10. parent-app/webpack.config.js:5-27

**Observation:** `singleSpaDefaults({ orgName: "frontenddevs", projectName: "root-config", ..., disableHtmlGeneration: true })`, combined with `HtmlWebpackPlugin` generating page from `src/index.ejs`, with parameters `isLocal` and `orgName`.

**Interpretation:** Configures root single-spa builder with own name. Also decides through `isLocal` whether page receives application import map.

### 11. react-child-app/webpack.config.js:4-16

**Observation:** `singleSpaDefaults({ orgName: "frontenddevs", projectName: "react-mfe", ..., outputSystemJS: false })`, without other options.

**Interpretation:** Configures React application single-spa builder with own name and ESM output. Bundle name, `frontenddevs-react-mfe.js`, is requested by root import map.

### 12. parent-app/src/microfrontend-layout.html:1-14; parent-app/src/frontenddevs-root-config.js:7-9

**Observation:** `<single-spa-router>` with `<main>`. Route `default` contains applications `@frontenddevs/react-mfe` and `@frontenddevs/vue-child-app` (:3-6), route `react-app` contains `@frontenddevs/react-mfe` (:7-9) and route `vue-app` contains `@frontenddevs/vue-child-app` (:10-12). Root config imports file and converts it to routes.

**Interpretation:** Root layout declares both applications and routes where each mounts.

### 13. vue-child-app/src/main.js:24; vue-child-app/src/main.js:6-22

**Observation:** `export const bootstrap = vueLifecycles.bootstrap`. Object created by `singleSpaVue` at :6-22. Application resolved as `@frontenddevs/vue-child-app` through root import map (parent-app/src/index.ejs:38) and registered in parent-app/src/frontenddevs-root-config.js:18.

**Interpretation:** Vue application lifecycle called by root orchestrator when mounting application.

### 14. vue-child-app/src/main.js:25

**Observation:** `export const mount = vueLifecycles.mount`, from same object, called when activating routes `default` and `vue-app` (parent-app/src/microfrontend-layout.html:3-5, 10-11).

**Interpretation:** Vue application lifecycle called by root orchestrator when mounting application.

### 15. vue-child-app/src/main.js:26

**Observation:** `export const unmount = vueLifecycles.unmount`, from same object, with same consumer in parent-app/src/frontenddevs-root-config.js:18-20.

**Interpretation:** Vue application lifecycle called by root orchestrator when unmounting application.

### 16. react-child-app/src/frontenddevs-react-mfe.js:3

**Observation:** `import singleSpaReact from "single-spa-react"`, used at :6.

**Interpretation:** React application imports adapter creating its lifecycles.

### 17. react-child-app/src/frontenddevs-react-mfe.js:6-14; react-child-app/src/frontenddevs-react-mfe.js:16

**Observation:** `singleSpaReact({ React, ReactDOMClient, rootComponent: Root, errorBoundary })`, with `export const { bootstrap, mount, unmount } = lifecycles`. Application resolved as `@frontenddevs/react-mfe` through root import map (parent-app/src/index.ejs:37) and registered in routes of parent-app/src/microfrontend-layout.html:4, 8.

**Interpretation:** React component adapted to single-spa lifecycles and exposed to root orchestrator.

### 18. vue-child-app/src/main.js:2

**Observation:** `import singleSpaVue from 'single-spa-vue'`, used at :6.

**Interpretation:** Vue application imports adapter creating its lifecycles.

### 19. vue-child-app/src/main.js:6-22

**Observation:** `singleSpaVue({ createApp, appOptions: { render() { return h(App, {...}) } } })`, with lifecycles exported at :24-26.

**Interpretation:** Vue App adapted to single-spa lifecycles and exposed to root orchestrator.

### 20. parent-app/src/index.ejs:10

**Observation:** HTML comment: "If you wish to turn off import-map-overrides for specific environments (prod), uncomment the line below".

**Interpretation:** Template instruction to developer rather than active code.

### 21. parent-app/src/index.ejs:11

**Observation:** HTML comment with link to `import-map-overrides` configuration documentation.

**Interpretation:** Template instruction to developer rather than active code.

### 22. parent-app/src/index.ejs:12

**Observation:** `<meta name="import-map-overrides-domains" content="denylist:prod.example.com" />`, entirely inside HTML comment.

**Interpretation:** Disabled development option rather than active code.

### 23. parent-app/src/index.ejs:44

**Observation:** `<script src="https://cdn.jsdelivr.net/npm/import-map-overrides@5.1.1/dist/import-map-overrides.js">`, matched by import-map pattern.

**Interpretation:** Loads CDN development library overriding import-map entries. Does not load another unit bundle.

### 24. parent-app/src/index.ejs:57

**Observation:** `<import-map-overrides-full show-when-local-storage="devtools" dev-libs>`, panel of library from observation #23, displayed only with `devtools` key in localStorage.

**Interpretation:** Development tool rather than another unit custom element.

### 25. parent-app/src/index.ejs:44

**Observation:** Same `<script>` for `import-map-overrides`, now matched by external-script pattern.

**Interpretation:** CDN library from observation #23 rather than another unit bundle.

### 26. parent-app/src/index.ejs:45

**Observation:** `<script src="https://cdn.jsdelivr.net/npm/@single-spa/import-map-injector@2.0.1/lib/import-map-injector.js">`. Library installs `<script type="injector-importmap">` blocks at :9, :15 and :33.

**Interpretation:** Loads CDN library installing import maps. Does not load another unit bundle.

### 27. parent-app/src/frontenddevs-root-config.js:12-14; parent-app/src/index.ejs:37-38

**Observation:** `loadApp({ name }) { return import(/* webpackIgnore: true */ name); }`, inside `constructApplications`. Names come from layout and are resolved by local import map to both application URLs.

**Interpretation:** Root loads application whose name it receives as parameter at runtime through native `import()`.

### 28. parent-app/src/frontenddevs-root-config.js:18; parent-app/src/frontenddevs-root-config.js:9-16; parent-app/src/frontenddevs-root-config.js:19

**Observation:** `applications.forEach(registerApplication)`, over applications constructed from layout at :9-15. Layout engine created at :16 is activated at :19.

**Interpretation:** Root registers all layout applications in single-spa without naming them in row.

### 29. parent-app/src/frontenddevs-root-config.js:20; parent-app/src/frontenddevs-root-config.js:1

**Observation:** `start()`, imported from `single-spa`.

**Interpretation:** Starts orchestrator. Without it, registrations mount no application.

### 30. parent-app/src/index.ejs:33-41; parent-app/src/index.ejs:32

**Observation:** `<script type="injector-importmap">`, mapping `@frontenddevs/react-mfe` to `http://localhost:8081/frontenddevs-react-mfe.js` (:37) and `@frontenddevs/vue-child-app` to `http://localhost:8082/js/app.js` (:38). Generated only with `isLocal` (:32).

**Interpretation:** Resolves both application names to bundle URLs only in local mode.

### 31. parent-app/src/microfrontend-layout.html:1-14

**Observation:** `<single-spa-router>`, root route table: default route with both applications, `react-app` with `@frontenddevs/react-mfe` and `vue-app` with `@frontenddevs/vue-child-app`. Imported and converted to routes in parent-app/src/frontenddevs-root-config.js:7-9.

**Interpretation:** Route table linking paths to applications of other units.

### 32. parent-app; parent-app/package.json; parent-app/webpack.config.js:7-9, 18-20; parent-app/src/frontenddevs-root-config.js:9-20; parent-app/package.json:10-11

**Observation:** Project with own manifest, `webpack.config.js` and lockfile. Entry `src/frontenddevs-root-config.js` comes from `webpack-config-single-spa` convention, page from `src/index.ejs`. Build is `webpack --mode=production`. No workspace declared.

**Interpretation:** Frontend unit with own boundary, composition root config.

### 33. react-child-app; react-child-app/package.json; react-child-app/webpack.config.js:5-7; react-child-app/src/frontenddevs-react-mfe.js:6-16; react-child-app/package.json:6-7

**Observation:** Project with own manifest, `webpack.config.js` and lockfile. Entry `src/frontenddevs-react-mfe.js` comes from `webpack-config-single-spa-react` convention and exports lifecycles. Build is `webpack --mode=production`.

**Interpretation:** Frontend unit with own boundary, a single-spa React application.

### 34. vue-child-app; vue-child-app/package.json; vue-child-app/src/main.js:6-26; vue-child-app/public/index.html:14; vue-child-app/vue.config.js:1-4; vue-child-app/package.json:7

**Observation:** Project with own manifest, `vue.config.js` and lockfile. Entry `src/main.js` comes from Vue CLI convention and exports lifecycles, and template has `<div id="app">`. Build is `vue-cli-service build`.

**Interpretation:** Frontend unit with own boundary, a single-spa Vue application.

### 35. parent-app/src/microfrontend-layout.html:5, 11; parent-app/src/index.ejs:38; parent-app/src/frontenddevs-root-config.js:13, 18, 20; vue-child-app/src/main.js:24-26

**Observation:** Root `parent-app` places `@frontenddevs/vue-child-app` at default route and route `vue-app`. Loads it through name-based `import()`, resolved by local import map to `http://localhost:8082/js/app.js`, registering in single-spa. Name is Vue project manifest `name` (vue-child-app/package.json:2). Application exports lifecycles created by `singleSpaVue`. Map only exists with `isLocal`.

**Interpretation:** An active root-config → application relationship between `parent-app` and `vue-child-app` in local mode.

### 36. parent-app/src/microfrontend-layout.html:4, 8; parent-app/src/index.ejs:37; parent-app/src/frontenddevs-root-config.js:13, 18, 20; react-child-app/webpack.config.js:6-7, 10; react-child-app/src/frontenddevs-react-mfe.js:16

**Observation:** Root `parent-app` places `@frontenddevs/react-mfe` at default route and route `react-app`, and local import map resolves it to `http://localhost:8081/frontenddevs-react-mfe.js`. Name matches manifest `name` (react-child-app/package.json:2). Requested file matches `orgName`/`projectName` of webpack configuration, with ESM output. Application exports `singleSpaReact` lifecycles. Map only exists with `isLocal`.

**Interpretation:** An active root-config → application relationship between `parent-app` and `react-child-app` in local mode.

### 37. parent-app/package.json:10-11; parent-app/webpack.config.js:7-26

**Observation:** `"build": "concurrently npm:build:*"` and `"build:webpack": "webpack --mode=production"`, over `webpack-config-single-spa` with `projectName: "root-config"` and page from `src/index.ejs`. No deployment artifact, and manifest has no `version`. Root only served at `localhost:9000` through `webpack serve`.

**Interpretation:** Root has separate build without observed deployment or independent versioning.

### 38. react-child-app/package.json:6-7; react-child-app/webpack.config.js:5-11

**Observation:** Same pair of build scripts over `webpack-config-single-spa-react` with `projectName: "react-mfe"` and `outputSystemJS: false`. No deployment artifact, and manifest has no `version`. Application only served at `localhost:8081` through `webpack serve`.

**Interpretation:** React application has separate build without observed deployment or independent versioning.

### 39. vue-child-app/package.json:7; vue-child-app/package.json:24; vue-child-app/vue.config.js:1-4

**Observation:** `"build": "vue-cli-service build"`, with `vue-cli-plugin-single-spa` declared and `vue.config.js` without output option. No deployment artifact, and version `0.1.0` of a `private` package unused in publication. Application only served at `localhost:8082` through `vue-cli-service serve`.

**Interpretation:** Vue application has separate build without observed deployment or independent versioning.

### 40. react-child-app/src/root.component.js:6

**Observation:** Subtitle displayed by React application root component: "This is MFE with Single SPA (React Child App)".

**Interpretation:** Claims React project is single-spa micro-frontend and child application. Claim corroborated: project is own unit, lifecycles come from `singleSpaReact` and root registers it in layout.

### 41. 00ca0bf 2025-08-21 (parent-app/package.json)

**Observation:** `parent-app/package.json` arrives with `@types/systemjs` declaration in sole repository commit, without another version.

**Interpretation:** History does not say whether package was used before first commit or came only from generator. Uncertainty concerns only past: package unused in snapshot.

### 42. 00ca0bf 2025-08-21 (vue-child-app/package.json, vue-child-app/vue.config.js)

**Observation:** `vue-child-app/package.json`, with plugin in `devDependencies`, and `vue-child-app/vue.config.js`, without output option, arrive together in sole commit. No version shows plugin configured.

**Interpretation:** History does not say whether plugin loads or Vue bundle format. Both readings from observation #8 remain plausible: Vue application has format root loads, or relationship remains only declared.

### 43. 00ca0bf 2025-08-21 (parent-app/src/index.ejs)

**Observation:** `parent-app/src/index.ejs` arrives in sole commit with lines 10 through 12 already commented out.

**Interpretation:** History does not say whether meta `import-map-overrides-domains` was active before first commit or never uncommented. Uncertainty concerns only past.

### 44. 00ca0bf 2025-08-21 (parent-app/src/index.ejs)

**Observation:** Same `parent-app/src/index.ejs` arrives in sole commit with production map commented out and placeholder `src="/importmap.json"`, beside local map. No version has active production map.

**Interpretation:** History does not say whether production map was planned but never connected or merely generator text. Uncertainty concerns only past: only local mode connects applications in snapshot.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (parent-app/package.json:41) | 1 technology | manifest | import-maps | technological | weak | — |
| 2 | 3.4.2 (parent-app/package.json:42) | 1 technology | manifest | single-spa | technological | weak | declares #28; declares #29 |
| 3 | 3.4.2 (parent-app/package.json:43) | 1 technology | manifest | single-spa | technological | weak | declares #12; declares #27 |
| 4 | 3.4.2 (parent-app/package.json:35) | 1 technology | manifest | single-spa | technological | weak | declares #10 |
| 5 | 3.4.2 (react-child-app/package.json:49) | 1 technology | manifest | single-spa | technological | weak | declares #16; declares #17 |
| 6 | 3.4.2 (react-child-app/package.json:42) | 1 technology | manifest | single-spa | technological | weak | declares #11 |
| 7 | 3.4.2 (vue-child-app/package.json:13) | 1 technology | manifest | single-spa | technological | weak | declares #18; declares #19 |
| 8 | 3.4.2 (vue-child-app/package.json:24) | 1 technology | manifest | single-spa | technological | ambiguous | — |
| 9 | 3.4.2 (parent-app/package.json:41, :42, Evidence); 3.4.2 (react-child-app/package.json:49, Evidence); 3.4.2 (vue-child-app/package.json:13, Evidence); 3.4.4 (parent-app/src/index.ejs:33, File:line); 3.4.4 (vue-child-app/src/main.js:24; react-child-app/src/frontenddevs-react-mfe.js:6; vue-child-app/src/main.js:6; parent-app/src/index.ejs:44, :45; parent-app/src/frontenddevs-root-config.js:13; parent-app/src/index.ejs:33, Observation); 3.4.5 #1, #2 (Configuration); 3.4.6 #1, #2, #3 (Where served) | 2 configuration | configuration | import-maps | architectural | strong | configures #35; configures #36; configures #27 |
| 10 | 3.4.2 (parent-app/package.json:42, :43, :35, Evidence); 3.4.3 (parent-app, Markers, Entry and Build); 3.4.4 (parent-app/src/frontenddevs-root-config.js:13; parent-app/src/index.ejs:33, Observation); 3.4.6 #1 (Artifacts) | 2 configuration | configuration | single-spa | technological | moderate | configures #32; configures #30 |
| 11 | 3.4.2 (react-child-app/package.json:49, :42, Evidence); 3.4.3 (react-child-app, Markers, Entry and Build); 3.4.4 (react-child-app/src/frontenddevs-react-mfe.js:6, Observation); 3.4.5 #2 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | single-spa | technological | moderate | configures #33; configures #36 |
| 12 | 3.4.4 (parent-app/src/microfrontend-layout.html:1, File:line); 3.4.4 (vue-child-app/src/main.js:24, :25; react-child-app/src/frontenddevs-react-mfe.js:6, Observation); 3.4.5 #1, #2 (Configuration, Code); 3.4.7 #1 (Evidence) | 2 configuration | configuration | single-spa | architectural | strong | configures #35; configures #36 |
| 13 | 3.4.4 (vue-child-app/src/main.js:24) | 3 code | source code | single-spa | technological | moderate | implements #35 |
| 14 | 3.4.4 (vue-child-app/src/main.js:25) | 3 code | source code | single-spa | technological | moderate | implements #35 |
| 15 | 3.4.4 (vue-child-app/src/main.js:26) | 3 code | source code | single-spa | technological | moderate | implements #35 |
| 16 | 3.4.4 (react-child-app/src/frontenddevs-react-mfe.js:3) | 3 code | source code | single-spa | technological | moderate | implements #36 |
| 17 | 3.4.4 (react-child-app/src/frontenddevs-react-mfe.js:6) | 3 code | source code | single-spa | technological | moderate | implements #36 |
| 18 | 3.4.4 (vue-child-app/src/main.js:2) | 3 code | source code | single-spa | technological | moderate | implements #35 |
| 19 | 3.4.4 (vue-child-app/src/main.js:6) | 3 code | source code | single-spa | technological | moderate | implements #35 |
| 20 | 3.4.4 (parent-app/src/index.ejs:10) | 3 code | comment | — | context | weak | — |
| 21 | 3.4.4 (parent-app/src/index.ejs:11) | 3 code | comment | — | context | weak | — |
| 22 | 3.4.4 (parent-app/src/index.ejs:12) | 3 code | comment | — | context | weak | — |
| 23 | 3.4.4 (parent-app/src/index.ejs:44, src-import-map) | 3 code | source code | import-maps | technological | weak | — |
| 24 | 3.4.4 (parent-app/src/index.ejs:57) | 3 code | source code | import-maps | technological | weak | — |
| 25 | 3.4.4 (parent-app/src/index.ejs:44, src-html-external-script) | 3 code | source code | import-maps | technological | weak | — |
| 26 | 3.4.4 (parent-app/src/index.ejs:45) | 3 code | source code | import-maps | technological | weak | — |
| 27 | 3.4.4 (parent-app/src/frontenddevs-root-config.js:13) | 3 code | source code | single-spa | technological | moderate | implements #35; implements #36 |
| 28 | 3.4.4 (parent-app/src/frontenddevs-root-config.js:18) | 3 code | source code | single-spa | technological | moderate | implements #35; implements #36 |
| 29 | 3.4.4 (parent-app/src/frontenddevs-root-config.js:20) | 3 code | source code | single-spa | technological | moderate | implements #35; implements #36 |
| 30 | 3.4.4 (parent-app/src/index.ejs:33) | 3 code | source code | import-maps | architectural | strong | implements #35; implements #36 |
| 31 | 3.4.4 (parent-app/src/microfrontend-layout.html:1) | 3 code | source code | single-spa | architectural | strong | implements #35; implements #36 |
| 32 | 3.4.3 (parent-app) | 4 structure | directory | — | architectural | moderate | — |
| 33 | 3.4.3 (react-child-app) | 4 structure | directory | — | architectural | moderate | — |
| 34 | 3.4.3 (vue-child-app) | 4 structure | directory | — | architectural | moderate | — |
| 35 | 3.4.5 #1 | 5 composition | configuration | single-spa | architectural | strong | links #32; links #34 |
| 36 | 3.4.5 #2 | 5 composition | configuration | single-spa | architectural | strong | links #32; links #33 |
| 37 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #32 |
| 38 | 3.4.6 #2 | 6 build-deploy | manifest | — | architectural | moderate | publishes #33 |
| 39 | 3.4.6 #3 | 6 build-deploy | manifest | — | architectural | moderate | publishes #34 |
| 40 | 3.4.7 #1 | 7 documentation | comment | single-spa | architectural | weak | corroborates #33; corroborates #17; corroborates #36 |
| 41 | 3.4.8 #1 | 8 history | history | — | technological | weak | explains #1 |
| 42 | 3.4.8 #2 | 8 history | history | — | technological | ambiguous | explains #8; explains #35 |
| 43 | 3.4.8 #3 | 8 history | history | — | context | weak | explains #20; explains #21; explains #22 |
| 44 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #9; explains #30 |

## Summary

Observations: 44. Dimensions (technology: 8, configuration: 4, code: 19, structure: 3, composition: 2, build-deploy: 3, documentation: 1, history: 4). Strength (strong: 6, moderate: 18, weak: 18, ambiguous: 2). Evidence (technological: 26, architectural: 14, context: 4).


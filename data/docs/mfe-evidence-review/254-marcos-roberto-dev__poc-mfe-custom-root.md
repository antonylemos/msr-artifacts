---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
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

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Repository overview

Single-spa proof of concept with Vue 3 in four sibling projects, without root workspace. `content-app` and `topbar-app` Vite applications only export lifecycles (#60, #63). Other two projects alternative hosts composing same two remotes through same development-server URLs: `root-app`, Vue "custom root" (#61), and `root-classic`, classic create-single-spa root config (#62). Each project has own build, none observed deployment (#68 to #71).

Architecture chain has two branches, one per host.

- **Remotes:** `single-spa-vue` declared/used in both remotes (#2, #12). `singleSpaVue` creates entry-exported lifecycles (#20 to #29). Own mounting commented, so UI starts only when host calls `mount`.
- **`root-classic`:**
  - dependencies: `single-spa`, `single-spa-layout` and single-spa webpack configuration (#7, #8, #10);
  - configuration: builder with own name (#15), layout placing both applications in default route (#16), local import map resolving them to development-server URLs (#14);
  - code: page has import map (#55) and route table (#56); root config loads each application through name `import()`, registers all, calls `start()` (#57 to #59);
  - relationships: two active root-config → application relationships (#65, #66).
- **`root-app`:**
  - dependencies: `single-spa` and `single-spa-vue` (#3, #4);
  - configuration: native page import map (#13);
  - code: root template names two parcels (#51, #52); helper loads through native `import()` (#54), wrapper mounts through `mountRootParcel` (#53); import map line names targets (#30);
  - relationships: two active host → remote relationships (#64, #67).

Qualification for `root-classic`: application import map emitted only with `isLocal` through `start` script; production map commented (#14). History shows this since first commit (#86).

Ambiguities:
- **Target of `@org/header-app` (#67):** `root-app` calls topbar by name no unit has. Link to `topbar-app` comes only from same URL as `@org/topbar-app` in other host (#13, #14), where only port distinguishes unit. Relationship active; target retains artifact name. History shows both names coexist since first commit without renaming (#87).
- **SystemJS fallback (#41):** helper `System.import` runs only if native `import()` fails. Only SystemJS map commented (#31), so path has no confirmed target. History shows path arriving this way in first commit (#83).

Misleading signals:
- **Unused dependencies:** `single-spa` in both remotes (#1, #11), `vite-plugin-single-spa` in `root-app` (#5), `@types/systemjs` in `root-classic` (#6). History shows no usage of any (#78 to #80).
- **Unread import maps:** `root-app/mfe-app.json`, `root-app/src/importMap.dev.json` and `root-app/src/importMap.json` name both units but no file reads them (#17 to #19, #85).
- **Mining rows:** comments, logs and type declarations (#34 to #40, #42 to #46). Also CDN libraries, `import-map-overrides` and SystemJS loader (#32, #33, #47 to #50). None loads unit.
- **Topbar copy in `root-app`:** arrives already disconnected after `topbar-app` (#82).

Documentation consists of `root-app` comments and topbar screen title. Native import map and `import()` claims corroborated (#72, #74, #75). Claims about SystemJS microfrontends partially corroborated (#73, #76). Title "Topbar - MFE" corroborated (#77).

Configuration: 7 blocks retained, one per file, since each file serves single unit. Both host pages included through import maps (#13, #14), `root-classic` webpack configuration through named single-spa builder (#15), layout through application registration (#16). Three `root-app` JSON files included as import maps cited in 3.4.8 #8 Point (#17 to #19). Excluded:
- `topbar-app/vite.config.ts:8-19`, cited in 3.4.3 (Entry, Build) and 3.4.6 #4 (Artifacts). Entry, `preserveEntrySignatures`, format `system` and output `app.js` Rollup build options (dimension 6), without federation builder, name, exposed module, shared dependency or remote URL;
- `content-app/vite.config.ts:1-7` and `root-app/vite.config.ts:1-7`, only registering `vue()`;
- `root-classic/tsconfig.json:2`, only inheriting `ts-config-single-spa` types;
- `scripts` in `package.json` files, build/development server (dimension 6);
- `name` fields in `package.json` files (content-app/package.json:2; topbar-app/package.json:2), cited in 3.4.5 #1 to #3 (Configuration). Package identifiers read by no snapshot file for composition; composition names reside in import maps/layout.

## Observations

### 1. content-app/package.json:12

**Observation:** `single-spa` `^6.0.3` in `dependencies`. Review marks not configured: no `content-app/` file imports package; content-app/src/main.ts:4 imports only `single-spa-vue`.

**Interpretation:** Unused remote declaration. Orchestrator on host side.

### 2. content-app/package.json:13

**Observation:** `single-spa-vue` `^3.0.1` in `dependencies`. Review marks configured through import/call `singleSpaVue(...)` in content-app/src/main.ts:4, 8-22, creating exported lifecycles.

**Interpretation:** Remote declares single-spa Vue adapter, using it to expose itself to hosts.

### 3. root-app/package.json:12

**Observation:** `single-spa` `^6.0.3` in `dependencies`. Review marks configured through import of `mountRootParcel` in root-app/src/components/ParcelWrapper.vue:11, passed to `Parcel` at :4 and :46.

**Interpretation:** Vue host declares single-spa, using it to mount parcels.

### 4. root-app/package.json:13

**Observation:** `single-spa-vue` `^3.0.1` in `dependencies`. Review marks configured through component `Parcel` from `single-spa-vue/parcel` in root-app/src/components/ParcelWrapper.vue:2-5, 10.

**Interpretation:** Vue host declares adapter, using parcel component in template.

### 5. root-app/package.json:14

**Observation:** `vite-plugin-single-spa` `^1.1.0` in `dependencies`. Review marks not configured: no snapshot file imports/invokes it; root-app/vite.config.ts:1-7 only registers `vue()`.

**Interpretation:** Unused declaration. Build of `root-app` does not pass through single-spa plugin.

### 6. root-classic/package.json:44

**Observation:** `@types/systemjs` `^6.1.1` in `dependencies`. Review marks not configured: no `root-classic/` file references types or uses `System.`; page import map uses `@single-spa/import-map-injector` (root-classic/src/index.ejs:11, 17, 41-43).

**Interpretation:** Unused declaration. Does not indicate SystemJS in `root-classic` composition.

### 7. root-classic/package.json:45

**Observation:** `single-spa` `^5.9.3` in `dependencies`. Review marks configured through import/calls `registerApplication` and `start()` in root-classic/src/org-root-config.ts:1, 18-20. Shared page import map points to `single-spa@6.0.3` through CDN (root-classic/src/index.ejs:17-24).

**Interpretation:** Root declares single-spa orchestrator, using it in entry.

### 8. root-classic/package.json:47

**Observation:** `single-spa-layout` `^1.6.0` in `dependencies`. Review marks configured through imports `constructApplications`, `constructRoutes` and `constructLayoutEngine`, used with `./microfrontend-layout.html` in root-classic/src/org-root-config.ts:2-19.

**Interpretation:** Root declares single-spa declarative layout engine, using it to construct routes/applications.

### 9. root-classic/package.json:40

**Observation:** `ts-config-single-spa` `^3.0.0` in `devDependencies`. Review marks configured through `"extends": "ts-config-single-spa"` in root-classic/tsconfig.json:2, read by `tsc` of script `build:types` (root-classic/package.json:12).

**Interpretation:** Root inherits standard single-spa TypeScript configuration. Does not participate in composition.

### 10. root-classic/package.json:39

**Observation:** `webpack-config-single-spa-ts` `^8.0.0` in `devDependencies`. Review marks configured through `singleSpaDefaults({ orgName, projectName: "root-config", ... })` in root-classic/webpack.config.js:2, 7-13, read by `webpack serve` and `webpack --mode=production` (root-classic/package.json:4, 11).

**Interpretation:** Root declares standard single-spa webpack configuration, using it in build.

### 11. topbar-app/package.json:12

**Observation:** `single-spa` `^6.0.3` in `dependencies`. Review marks not configured: no `topbar-app/` file imports package; topbar-app/src/main.ts:4 imports only `single-spa-vue`.

**Interpretation:** Unused remote declaration as in `content-app` (#1).

### 12. topbar-app/package.json:13

**Observation:** `single-spa-vue` `^3.0.1` in `dependencies`. Review marks configured through import/call `singleSpaVue(...)` in topbar-app/src/main.ts:4, 8-22, creating exported lifecycles.

**Interpretation:** Remote declares single-spa Vue adapter, using it to expose itself to hosts.

### 13. root-app/index.html:11-18; root-app/index.html:24-30

**Observation:** Native `<script type="importmap">` mapping `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` (:14) and `@org/header-app` → `http://127.0.0.1:5175/src/main.ts` (:15). Immediately below, `<script type="systemjs-importmap">` mapping `@org/header-app` → `http://127.0.0.1:4173/app.js` entirely inside HTML comment (:24-30).

**Interpretation:** Vue host declares through import map URLs of two parcel-mounted remotes. SystemJS map, other resolution form envisaged on page, disabled.

### 14. root-classic/src/index.ejs:17-23; root-classic/src/index.ejs:27; root-classic/src/index.ejs:29-39; root-classic/webpack.config.js:21-22

**Observation:** Root page contains two `<script type="injector-importmap">` elements. First maps `single-spa` to `single-spa@6.0.3` through CDN (:17-23). Second generated only with `isLocal` (:29), parameter coming from `--env isLocal` through HtmlWebpackPlugin. Maps `@org/root-config` → `//localhost:9000/org-root-config.js` (:33), `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` (:34) and `@org/topbar-app` → `http://127.0.0.1:5175/src/main.ts` (:35). Production map commented (:27).

**Interpretation:** Root declares through import map URLs of both applications and CDN shared dependency. Composition target resolution only in local mode.

### 15. root-classic/webpack.config.js:5-27

**Observation:** `singleSpaDefaults({ orgName: "org", projectName: "root-config", ..., disableHtmlGeneration: true })`, combined with `HtmlWebpackPlugin` generating page from `src/index.ejs` with parameters `isLocal` and `orgName`.

**Interpretation:** Configures named single-spa builder in root. Also decides through `isLocal` whether page receives application import map.

### 16. root-classic/src/microfrontend-layout.html:1-26; root-classic/src/org-root-config.ts:7-9

**Observation:** `<single-spa-router>` with `<main>`. Route `default` contains applications `@org/topbar-app` (:22) and `@org/content-app` (:23). Examples `@org/navbar` and `@org/settings` commented (:9-18). Root config imports file, converting to routes.

**Interpretation:** Root layout declares two applications and route mounting them together.

### 17. root-app/mfe-app.json:1-7

**Observation:** Map `imports` with `@org/header-app` → `http://127.0.0.1:5175/src/main.ts`, `@org/content-app` → `http://127.0.0.1:5173/src/main.ts` and `vue` → `unpkg.com`. No snapshot file reads file.

**Interpretation:** Host import map naming both remotes, with different content port. Does not participate in composition.

**Note:** Guidance for configuration declaring units elsewhere is `strong`, but file read by neither build nor runtime (3.4.8 #8). Remains `weak`, without `configures` relationship.

### 18. root-app/src/importMap.dev.json:1-6

**Observation:** Map `imports` with `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` and `@org/header-app` → `http://127.0.0.1:5175/src/main.ts`, same URLs as page map (root-app/index.html:14-15). No snapshot file reads file.

**Interpretation:** JSON copy of active host import map. Does not participate in composition.

**Note:** Same reason as #17: file unread (3.4.8 #8), therefore `weak` rather than `strong`, without `configures` relationship.

### 19. root-app/src/importMap.json:1-6

**Observation:** Map `imports` with `@org/content-app` → `http://127.0.0.1:5174/spa.js` and `@org/header-app` → `http://127.0.0.1:5175/spa.js`. No snapshot file reads file; no snapshot build generates `spa.js`.

**Interpretation:** Host import map pointing both remotes to bundles snapshot does not produce. Does not participate in composition.

**Note:** Same reason as #17: file unread (3.4.8 #8), therefore `weak` rather than `strong`, without `configures` relationship.

### 20. content-app/src/main.ts:20; content-app/src/main.ts:8-18

**Observation:** `export const bootstrap = vueLifecycles.bootstrap`, from object created by `singleSpaVue`. Unit resolved as `@org/content-app` by both host import maps (root-app/index.html:14; root-classic/src/index.ejs:34).

**Interpretation:** Content lifecycle called by both hosts when mounting unit.

### 21. content-app/src/main.ts:21

**Observation:** `export const mount = vueLifecycles.mount`, from same object. `root-app` checks `mount` before mounting parcel (root-app/src/components/ParcelWrapper.vue:33); `root-classic` calls it on activating route `default` (root-classic/src/microfrontend-layout.html:21-24).

**Interpretation:** Content lifecycle called by both hosts when mounting unit.

### 22. content-app/src/main.ts:22

**Observation:** `export const unmount = vueLifecycles.unmount`, from same object with same consumers.

**Interpretation:** Content lifecycle called by both hosts when unmounting unit.

### 23. topbar-app/src/main.ts:20; topbar-app/src/main.ts:8-18

**Observation:** `export const bootstrap = vueLifecycles.bootstrap`, from object created by `singleSpaVue`. Unit resolved as `@org/topbar-app` in `root-classic` (root-classic/src/index.ejs:35), and through same URL as `@org/header-app` in `root-app` (root-app/index.html:15).

**Interpretation:** Topbar lifecycle called by host mounting unit.

### 24. topbar-app/src/main.ts:21

**Observation:** `export const mount = vueLifecycles.mount`, from same object, called by `root-app` parcel (root-app/src/components/ParcelWrapper.vue:3-5, 33) and `root-classic` single-spa (root-classic/src/org-root-config.ts:18-20).

**Interpretation:** Topbar lifecycle called by host mounting unit.

### 25. topbar-app/src/main.ts:22

**Observation:** `export const unmount = vueLifecycles.unmount`, from same object with same consumers.

**Interpretation:** Topbar lifecycle called by host unmounting unit.

### 26. content-app/src/main.ts:4

**Observation:** `import singleSpaVue from 'single-spa-vue'`, used at :8.

**Interpretation:** Content imports adapter creating lifecycles.

### 27. content-app/src/main.ts:8-18; content-app/src/main.ts:6

**Observation:** `singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })`, with lifecycles exported at :20-22. Own mounting, `createApp(App).mount('#app')`, commented (:6).

**Interpretation:** Content Vue App adapted to single-spa lifecycles, starts only when host calls `mount`.

### 28. topbar-app/src/main.ts:4

**Observation:** `import singleSpaVue from 'single-spa-vue'`, used at :8.

**Interpretation:** Topbar imports adapter creating lifecycles.

### 29. topbar-app/src/main.ts:8-18; topbar-app/src/main.ts:6

**Observation:** `singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })`, with lifecycles exported at :20-22. Own mounting commented (:6).

**Interpretation:** Topbar Vue App adapted to single-spa lifecycles, starts only when host calls `mount`.

### 30. root-app/index.html:11-18

**Observation:** `<script type="importmap">` mapping `@org/content-app` to `http://127.0.0.1:5174/src/main.ts` (:14) and `@org/header-app` to `http://127.0.0.1:5175/src/main.ts` (:15). Names passed to `ParcelWrapper` (root-app/src/App.vue:8-9), resolved by `import()` in root-app/src/utils/dynamicImport.ts:15.

**Interpretation:** Resolution of two host parcel names to remote development-server URLs.

### 31. root-app/index.html:24-30

**Observation:** `<!-- <script type="systemjs-importmap">`, opening HTML comment through :30. Commented map points `@org/header-app` to `http://127.0.0.1:4173/app.js`.

**Interpretation:** Disabled SystemJS map rather than active code.

### 32. root-app/index.html:33-34

**Observation:** `<script src="https://cdn.jsdelivr.net/npm/import-map-overrides/dist/import-map-overrides.js">`, identified by import map pattern.

**Interpretation:** Loads development library overriding import map entries from CDN. Does not load another unit bundle.

### 33. root-app/index.html:41

**Observation:** `<import-map-overrides-full show-when-local-storage="overrides-ui" dev-libs>`, library panel from observation #32, displayed only with localStorage key `overrides-ui`.

**Interpretation:** Development tool rather than another unit custom element.

### 34. root-app/src/global.d.ts:1

**Observation:** Type declaration file comment: "Global type declarations for single-spa, SystemJS, and import-map-overrides".

**Interpretation:** Describes types. Not executable code.

### 35. root-app/src/global.d.ts:14

**Observation:** JSDoc comment on property `importMapOverrides` in type declaration of `Window` (:13-17).

**Interpretation:** Describes type. Not executable code.

### 36. root-app/src/global.d.ts:15

**Observation:** Documentation URL for `import-map-overrides` inside same JSDoc comment (:13-16).

**Interpretation:** Documentation reference. Not executable code.

### 37. root-app/src/global.d.ts:17-24

**Observation:** Type declaration `importMapOverrides?: { ... }` in `Window`. No `root-app` code uses `window.importMapOverrides`.

**Interpretation:** Only typing. Does not participate in composition.

### 38. root-app/src/utils/dynamicImport.ts:6

**Observation:** JSDoc comment line describing helper strategy (:1-9).

**Interpretation:** Helper documentation rather than executable code. Claim from same comment in #76.

### 39. root-app/src/utils/dynamicImport.ts:19

**Observation:** `console.warn(...)` in `catch` of native `import()`.

**Interpretation:** Only logging.

### 40. root-app/src/utils/dynamicImport.ts:21

**Observation:** Line comment before SystemJS fallback (:22-33).

**Interpretation:** Comment rather than executable code.

### 41. root-app/src/utils/dynamicImport.ts:24; root-app/src/utils/dynamicImport.ts:22-23; root-app/index.html:21; root-app/index.html:24-30

**Observation:** `window.System.import(url)`, executed only when native `import()` at :15 fails and `window.System` exists. SystemJS loaded on page (root-app/index.html:21), but only `systemjs-importmap` commented (root-app/index.html:24-30). Names `@org/header-app` and `@org/content-app` only in native import map.

**Interpretation:** Two readings remain plausible. Fallback may never resolve unit because no active SystemJS map gives URLs to supplied names. Or second loading path for topbar SystemJS build when map provided outside snapshot. Snapshot does not show which applies.

### 42. root-app/src/utils/dynamicImport.ts:25

**Observation:** `console.log(...)` on fallback success.

**Interpretation:** Only logging.

### 43. root-app/src/utils/dynamicImport.ts:28

**Observation:** `console.error(...)` when both paths fail.

**Interpretation:** Only logging.

### 44. root-classic/src/index.ejs:12

**Observation:** HTML comment: "If you wish to turn off import-map-overrides for specific environments (prod), uncomment the line below".

**Interpretation:** Template instruction to developer rather than active code.

### 45. root-classic/src/index.ejs:13

**Observation:** HTML comment linking to `import-map-overrides` configuration documentation.

**Interpretation:** Template instruction to developer rather than active code.

### 46. root-classic/src/index.ejs:14

**Observation:** `<meta name="import-map-overrides-domains" content="denylist:prod.example.com" />`, entirely inside HTML comment.

**Interpretation:** Disabled development option rather than active code.

### 47. root-classic/src/index.ejs:41

**Observation:** `<script src="https://cdn.jsdelivr.net/npm/import-map-overrides@5.1.1/dist/import-map-overrides.js">`, identified by import map pattern.

**Interpretation:** Loads development library overriding import map entries from CDN. Does not load another unit bundle.

### 48. root-classic/src/index.ejs:56

**Observation:** `<import-map-overrides-full show-when-local-storage="devtools" dev-libs>`, library panel from observation #47, displayed only with localStorage key `devtools`.

**Interpretation:** Development tool rather than another unit custom element.

### 49. root-app/index.html:21

**Observation:** `<script src="https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/system.min.js">`, identified by external-script pattern. Only code using `window.System` is fallback in root-app/src/utils/dynamicImport.ts:22-24.

**Interpretation:** Loads SystemJS loader library from CDN. Does not load another unit bundle.

### 50. root-classic/src/index.ejs:41

**Observation:** Same `<script>` for `import-map-overrides` as #47, now identified by external-script pattern.

**Interpretation:** CDN library from observation #47 rather than another unit bundle.

### 51. root-app/src/App.vue:8; root-app/index.html:15

**Observation:** `<ParcelWrapper app-name="@org/header-app">`, first parcel in host root template mounted in root-app/src/main.ts:5. Name resolved to `http://127.0.0.1:5175/src/main.ts`, same URL as `@org/topbar-app` in root-classic/src/index.ejs:35.

**Interpretation:** Host names first parcel unit in template, remote served at port 5175.

### 52. root-app/src/App.vue:9; root-app/index.html:14

**Observation:** `<ParcelWrapper app-name="@org/content-app">`, second parcel in root template. Name resolved to `http://127.0.0.1:5174/src/main.ts`.

**Interpretation:** Host names content as second parcel in template.

### 53. root-app/src/components/ParcelWrapper.vue:3-5; root-app/src/components/ParcelWrapper.vue:10-11; root-app/src/components/ParcelWrapper.vue:22; root-app/src/components/ParcelWrapper.vue:33; root-app/src/components/ParcelWrapper.vue:46

**Observation:** `<Parcel ... :config="parcelConfigRef" :mountParcel="mountParcel" ...>`, component from `single-spa-vue/parcel`, with `mountParcel = mountRootParcel` from `single-spa`. Configuration is module loaded by `dynamicImport(props.appName)` (:22), accepted when containing `mount` and `unmount` (:33).

**Interpretation:** Wrapper mounts parameter-supplied remote as single-spa parcel without naming it.

### 54. root-app/src/utils/dynamicImport.ts:15; root-app/index.html:11-18

**Observation:** `await import(/* @vite-ignore */ url)`, called by `dynamicImport(props.appName)` in root-app/src/components/ParcelWrapper.vue:22. Supplied names, `@org/header-app` and `@org/content-app`, resolved by native page import map.

**Interpretation:** Host loads parameter-named remote at runtime through native `import()`.

### 55. root-classic/src/index.ejs:30-38; root-classic/src/index.ejs:29

**Observation:** `<script type="injector-importmap">`, mapping `@org/content-app` to `http://127.0.0.1:5174/src/main.ts` (:34) and `@org/topbar-app` to `http://127.0.0.1:5175/src/main.ts` (:35), plus own `@org/root-config` (:33). Generated only with `isLocal` (:29).

**Interpretation:** Resolution of two application names to development-server URLs only in local mode.

### 56. root-classic/src/microfrontend-layout.html:1-26

**Observation:** `<single-spa-router>`, root route table: route `default` with `@org/topbar-app` (:22) and `@org/content-app` (:23) inside `<main>`. Imported/converted to routes in root-classic/src/org-root-config.ts:7-9.

**Interpretation:** Route table linking default route to other-unit applications.

### 57. root-classic/src/org-root-config.ts:12-14; root-classic/src/index.ejs:34-35

**Observation:** `loadApp({ name }) { return import(/* webpackIgnore: true */ name); }`, inside `constructApplications`. Names from layout resolved by local import map to two application URLs.

**Interpretation:** Root loads parameter-named application at runtime through native `import()`.

### 58. root-classic/src/org-root-config.ts:18; root-classic/src/org-root-config.ts:9-16; root-classic/src/org-root-config.ts:19

**Observation:** `applications.forEach(registerApplication)`, over applications constructed from layout at :9-15. Layout engine created at :16 activated at :19.

**Interpretation:** Root registers all layout applications in single-spa without naming them in line.

### 59. root-classic/src/org-root-config.ts:20; root-classic/src/org-root-config.ts:1

**Observation:** `start()`, imported from `single-spa`.

**Interpretation:** Starts orchestrator. Without it registrations mount no application.

### 60. content-app; content-app/package.json; content-app/index.html:11; content-app/src/main.ts:8-22; content-app/vite.config.ts:1-7; content-app/package.json:8

**Observation:** Project with own manifest, `vite.config.ts` and lockfile. Page loads `/src/main.ts`, exporting `singleSpaVue` lifecycles. Build `vue-tsc -b && vite build`. Declares no workspace.

**Interpretation:** Frontend unit with own boundary, single-spa Vue application.

### 61. root-app; root-app/package.json; root-app/index.html:43; root-app/src/main.ts:5; root-app/vite.config.ts:1-7; root-app/package.json:8

**Observation:** Project with own manifest, `vite.config.ts` and lockfile. Page loads `/src/main.ts`, mounting Vue App in `#app`. Build `vue-tsc -b && vite build`. Contains topbar copy in `src/modules/Topbar/`, without manifest/build and with commented import.

**Interpretation:** Frontend unit with own boundary, Vue host mounting remotes as parcels.

### 62. root-classic; root-classic/package.json; root-classic/webpack.config.js:7-9, 18-20; root-classic/src/org-root-config.ts:9-20; root-classic/package.json:10-11

**Observation:** Project with own manifest, `webpack.config.js` and lockfile. Entry `src/org-root-config.ts` from `webpack-config-single-spa-ts` convention; page from `src/index.ejs`. Build `concurrently npm:build:*`, with `webpack --mode=production`.

**Interpretation:** Frontend unit with own boundary, composition single-spa root config.

### 63. topbar-app; topbar-app/package.json; topbar-app/index.html:11; topbar-app/vite.config.ts:8-19; topbar-app/src/main.ts:8-22; topbar-app/package.json:8

**Observation:** Project with own manifest, `vite.config.ts` and lockfile. Page/Rollup entry point to `src/main.ts`, exporting `singleSpaVue` lifecycles. Build `vue-tsc -b && vite build`, output `app.js` in `system` format.

**Interpretation:** Frontend unit with own boundary, single-spa Vue application.

### 64. root-app/src/App.vue:9; root-app/index.html:14; root-app/src/utils/dynamicImport.ts:15; root-app/src/components/ParcelWrapper.vue:3, 46; content-app/src/main.ts:20-22

**Observation:** `root-app` places `@org/content-app` as root-template parcel, loading through name `import()`, resolved by native import map to `http://127.0.0.1:5174/src/main.ts`. Wrapper mounts module with `mountRootParcel` using content-exported lifecycles. Target identified by name, unit manifest `name`, `content-app`, with scope `@org/` (content-app/package.json:2). Content configuration does not fix port.

**Interpretation:** Active host → remote relationship between `root-app` and `content-app` without orchestrator registration.

### 65. root-classic/src/microfrontend-layout.html:21-23; root-classic/src/index.ejs:34; root-classic/src/org-root-config.ts:13, 18, 20; content-app/src/main.ts:20-22

**Observation:** `root-classic` places `@org/content-app` in route `default`, loading through name `import()`, resolved by local import map to `http://127.0.0.1:5174/src/main.ts`, registering in single-spa. Name is unit manifest `name` with scope `@org/` (content-app/package.json:2). Map exists only with `isLocal`.

**Interpretation:** Active root-config → application relationship between `root-classic` and `content-app` in local mode.

### 66. root-classic/src/microfrontend-layout.html:21-22; root-classic/src/index.ejs:35; root-classic/src/org-root-config.ts:13, 18, 20; topbar-app/src/main.ts:20-22

**Observation:** Same path as #65 with `@org/topbar-app`, resolved to `http://127.0.0.1:5175/src/main.ts`, topbar manifest `name` with scope `@org/` (topbar-app/package.json:2). Topbar mounts before content in same route. Map exists only with `isLocal`.

**Interpretation:** Active root-config → application relationship between `root-classic` and `topbar-app` in local mode.

### 67. root-app/src/App.vue:8; root-app/index.html:15; root-app/src/utils/dynamicImport.ts:15; root-app/src/components/ParcelWrapper.vue:3

**Observation:** `root-app` loads/mounts parcel `@org/header-app` through same path as #64, resolved to `http://127.0.0.1:5175/src/main.ts`. No snapshot unit named `header-app`. Same URL as `@org/topbar-app` in other host (root-classic/src/index.ejs:35); only port 5175, not fixed in configuration, distinguishes remote.

**Interpretation:** Active host → remote relationship. Target retains artifact name: correspondence to `topbar-app` plausible through URL but not explicit.

### 68. content-app/package.json:8; content-app/vite.config.ts:5-7

**Observation:** `"build": "vue-tsc -b && vite build"`, over default Vite configuration. No deployment artifact. Version `0.0.0` of `private` package unused for publication. Unit served only at `127.0.0.1:5174` through development server.

**Interpretation:** Content has separate build without observed deployment or independent versioning.

### 69. root-app/package.json:8; root-app/vite.config.ts:5-7

**Observation:** Same build script over default Vite configuration. No deployment artifact; version `0.0.0` of `private` package unused for publication. No artifact fixes own host address.

**Interpretation:** Vue host has separate build without observed deployment or independent versioning.

### 70. root-classic/package.json:10-12; root-classic/webpack.config.js:5-27

**Observation:** `"build": "concurrently npm:build:*"`, with `build:webpack` (`webpack --mode=production`) and `build:types` (`tsc`), over `webpack-config-single-spa-ts` with `projectName: "root-config"` and page from `src/index.ejs`. No deployment artifact; manifest lacks `version`. Root served only at `localhost:9000` through `webpack serve`.

**Interpretation:** Root has separate build without observed deployment or independent versioning.

### 71. topbar-app/package.json:8; topbar-app/vite.config.ts:8-18

**Observation:** Same build script as Vite projects, output `app.js` in `system` format with preserved export signatures. No host uses build; map pointing to it commented. No deployment artifact; version `0.0.0` of `private` package unused for publication.

**Interpretation:** Topbar has separate build prepared for host loading without observed deployment or independent versioning.

### 72. root-app/index.html:10

**Observation:** HTML comment: "Static import map for microfrontends esmodule".

**Interpretation:** Claims following block is static ES-module microfrontend import map. Claim corroborated: native import map resolves two parcel names.

### 73. root-app/index.html:20

**Observation:** HTML comment: "SystemJS for legacy microfrontends".

**Interpretation:** Claims loaded SystemJS serves legacy microfrontends. Loader active but no microfrontend mapped to it. Claim partially corroborated.

### 74. root-app/src/utils/dynamicImport.ts:2

**Observation:** JSDoc comment: "Hybrid dynamic import helper that supports both modern ESM and legacy SystemJS."

**Interpretation:** Claims helper capabilities. Claim corroborated: code has native `import()` and fallback `System.import`, with SystemJS loaded on page.

### 75. root-app/src/utils/dynamicImport.ts:5

**Observation:** JSDoc comment: "Try native import() first (for modules in native import map)".

**Interpretation:** Claims helper first tries native `import()` for native import-map modules. Claim corroborated.

### 76. root-app/src/utils/dynamicImport.ts:6

**Observation:** JSDoc comment: "If that fails, try System.import() (for modules in systemjs-importmap)".

**Interpretation:** Claims fallback and modules served. Attempt order in code; `systemjs-importmap` commented, leaving its modules without active artifact. Claim partially corroborated.

### 77. topbar-app/src/App.vue:4

**Observation:** Title displayed by topbar root component: "Topbar - MFE".

**Interpretation:** Claims topbar microfrontend. Claim corroborated: own project unit, lifecycles from `singleSpaVue` and `root-classic` layout registration.

### 78. 546aa27 2026-01-09 (content-app/package.json, topbar-app/package.json); 0cccd59 2026-01-09 (topbar-app/src/main.ts); 6ae6565 2026-01-09 (content-app/src/main.ts)

**Observation:** Both manifests unchanged since first commit, with `single-spa` in all versions. Files `main.ts` change later; earlier versions unavailable in partial clone.

**Interpretation:** History does not establish whether remote directly imported `single-spa`. Uncertainty only about past: snapshot package unused in remotes.

### 79. 546aa27 2026-01-09 (root-app/package.json, root-app/vite.config.ts)

**Observation:** Manifest and Vite configuration of `root-app` have same object in all commits. No version has plugin in `vite.config.ts`.

**Interpretation:** `vite-plugin-single-spa` declared and never configured in history. Not disconnected later.

### 80. 546aa27 2026-01-09 (root-classic/package.json)

**Observation:** No `root-classic` file changes after first commit; no version references package.

**Interpretation:** `@types/systemjs` arrives with project, never used in history.

### 81. 546aa27 2026-01-09 (content-app/src/main.ts, topbar-app/src/main.ts); 0cccd59 2026-01-09 (topbar-app/src/main.ts); 6ae6565 2026-01-09 (content-app/src/main.ts)

**Observation:** Both `main.ts` files exist since first commit, each changes once. Earlier versions unavailable.

**Interpretation:** History does not establish whether own mounting commented initially or remote mounted UI alone. Uncertainty only about past: snapshot remotes start only through host `mount`.

### 82. 546aa27 2026-01-09 (topbar-app/src/TopbarApp.vue); 0cccd59 2026-01-09 (topbar-app/src/App.vue); f2f2494 2026-01-09 (root-app/src/modules/Topbar/, root-app/src/App.vue); 6ae6565 2026-01-09 (topbar-app/src/App.vue)

**Observation:** `topbar-app` exists since first commit. Copy in `root-app/src/modules/Topbar/` appears only in `f2f2494`, with same objects as `topbar-app`; `root-app/src/App.vue` in that commit already has import/usage commented.

**Interpretation:** Topbar not extracted from copy, which is later and arrives already disconnected in host.

### 83. 546aa27 2026-01-09 (root-app/index.html, root-app/src/utils/dynamicImport.ts, topbar-app/vite.config.ts)

**Observation:** Three SystemJS-path files have same objects in all commits. `systemjs-importmap` commented in all versions.

**Interpretation:** SystemJS path arrives without target in first commit, not disabled later.

### 84. 546aa27 2026-01-09 (root-classic/src/index.ejs)

**Observation:** `root-classic/src/index.ejs` arrives in first commit with lines 12 to 14 commented, unchanged afterward.

**Interpretation:** Meta `import-map-overrides-domains` never active in history. Template comments.

### 85. 546aa27 2026-01-09 (root-app/mfe-app.json, root-app/src/importMap.json, root-app/src/importMap.dev.json, root-app/index.html)

**Observation:** Three unread maps created in same commit as native page import map; none of four changes afterward.

**Interpretation:** Different URLs do not belong to observable earlier stage: unread maps and active map coexist since first commit.

### 86. 546aa27 2026-01-09 (root-classic/src/index.ejs)

**Observation:** Same `root-classic/src/index.ejs` arrives with production map commented and local map conditional on `isLocal`, unchanged afterward.

**Interpretation:** History does not establish whether production map planned/never connected or merely generator text. Snapshot links applications only in local mode.

### 87. 546aa27 2026-01-09 (root-app/index.html, root-classic/src/index.ejs, root-classic/src/microfrontend-layout.html, topbar-app/package.json); f2f2494 2026-01-09 (root-app/src/App.vue)

**Observation:** Files with `@org/header-app` and `@org/topbar-app` unchanged since first commit; no commit renames unit. `root-app/src/App.vue` changes in `f2f2494`, but name-resolving map identical in all versions.

**Interpretation:** Two topbar names coexist since first commit rather than belonging to different stages. History does not link `@org/header-app` to `topbar-app`.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (content-app/package.json:12) | 1 technology | manifest | single-spa | technological | weak | — |
| 2 | 3.4.2 (content-app/package.json:13) | 1 technology | manifest | single-spa | technological | weak | declares #26; declares #27 |
| 3 | 3.4.2 (root-app/package.json:12) | 1 technology | manifest | single-spa | technological | weak | declares #53 |
| 4 | 3.4.2 (root-app/package.json:13) | 1 technology | manifest | single-spa | technological | weak | declares #53 |
| 5 | 3.4.2 (root-app/package.json:14) | 1 technology | manifest | single-spa | technological | weak | — |
| 6 | 3.4.2 (root-classic/package.json:44) | 1 technology | manifest | import-maps | technological | weak | — |
| 7 | 3.4.2 (root-classic/package.json:45) | 1 technology | manifest | single-spa | technological | weak | declares #58; declares #59 |
| 8 | 3.4.2 (root-classic/package.json:47) | 1 technology | manifest | single-spa | technological | weak | declares #16; declares #57 |
| 9 | 3.4.2 (root-classic/package.json:40) | 1 technology | manifest | single-spa | technological | weak | declares root-classic/tsconfig.json:2 |
| 10 | 3.4.2 (root-classic/package.json:39) | 1 technology | manifest | single-spa | technological | weak | declares #15 |
| 11 | 3.4.2 (topbar-app/package.json:12) | 1 technology | manifest | single-spa | technological | weak | — |
| 12 | 3.4.2 (topbar-app/package.json:13) | 1 technology | manifest | single-spa | technological | weak | declares #28; declares #29 |
| 13 | 3.4.2 (content-app/package.json:13, topbar-app/package.json:13, root-app/package.json:12, :13, Evidence); 3.4.3 (root-app, Markers and Entry); 3.4.4 (root-app/index.html:11, :24, :34, :41, File:line); 3.4.4 (root-app/index.html:21, src-html-external-script, File:line); 3.4.4 (content-app/src/main.ts:20; topbar-app/src/main.ts:20; root-app/src/utils/dynamicImport.ts:24, :15; root-app/src/App.vue:8, :9, Observation); 3.4.5 #1, #4 (Configuration, Code); 3.4.6 #1, #4 (Where served); 3.4.7 #1, #2, #3, #4, #5 (Evidence) | 2 configuration | configuration | import-maps | architectural | strong | configures #64; configures #67; configures #54 |
| 14 | 3.4.2 (content-app/package.json:13, topbar-app/package.json:13, root-classic/package.json:44, :45, :47, Evidence); 3.4.4 (root-classic/src/index.ejs:12, :13, :14, :41, :56, File:line); 3.4.4 (root-classic/src/index.ejs:30, File:line); 3.4.4 (content-app/src/main.ts:20; topbar-app/src/main.ts:20; root-app/src/App.vue:8; root-classic/src/org-root-config.ts:13, Observation); 3.4.5 #2, #3 (Configuration, Code); 3.4.6 #1, #3, #4 (Where served) | 2 configuration | configuration | import-maps | architectural | strong | configures #65; configures #66; configures #57 |
| 15 | 3.4.2 (root-classic/package.json:45, :47, :39, Evidence); 3.4.3 (root-classic, Markers, Entry and Build); 3.4.4 (root-classic/src/index.ejs:30; root-classic/src/org-root-config.ts:13, Observation); 3.4.6 #3 (Artifacts) | 2 configuration | configuration | single-spa | technological | moderate | configures #62; configures #55 |
| 16 | 3.4.4 (content-app/src/main.ts:20, :21; topbar-app/src/main.ts:8, Observation); 3.4.4 (root-classic/src/microfrontend-layout.html:1, File:line); 3.4.5 #2, #3 (Configuration, Code) | 2 configuration | configuration | single-spa | architectural | strong | configures #65; configures #66 |
| 17 | 3.4.8 #8 (Point) | 2 configuration | configuration | import-maps | architectural | weak | — |
| 18 | 3.4.8 #8 (Point) | 2 configuration | configuration | import-maps | architectural | weak | — |
| 19 | 3.4.8 #8 (Point) | 2 configuration | configuration | import-maps | architectural | weak | — |
| 20 | 3.4.4 (content-app/src/main.ts:20) | 3 code | source code | single-spa | technological | moderate | implements #64; implements #65 |
| 21 | 3.4.4 (content-app/src/main.ts:21) | 3 code | source code | single-spa | technological | moderate | implements #64; implements #65 |
| 22 | 3.4.4 (content-app/src/main.ts:22) | 3 code | source code | single-spa | technological | moderate | implements #64; implements #65 |
| 23 | 3.4.4 (topbar-app/src/main.ts:20) | 3 code | source code | single-spa | technological | moderate | implements #66 |
| 24 | 3.4.4 (topbar-app/src/main.ts:21) | 3 code | source code | single-spa | technological | moderate | implements #66 |
| 25 | 3.4.4 (topbar-app/src/main.ts:22) | 3 code | source code | single-spa | technological | moderate | implements #66 |
| 26 | 3.4.4 (content-app/src/main.ts:4) | 3 code | source code | single-spa | technological | moderate | implements #64; implements #65 |
| 27 | 3.4.4 (content-app/src/main.ts:8) | 3 code | source code | single-spa | technological | moderate | implements #64; implements #65 |
| 28 | 3.4.4 (topbar-app/src/main.ts:4) | 3 code | source code | single-spa | technological | moderate | implements #66 |
| 29 | 3.4.4 (topbar-app/src/main.ts:8) | 3 code | source code | single-spa | technological | moderate | implements #66 |
| 30 | 3.4.4 (root-app/index.html:11) | 3 code | source code | import-maps | architectural | strong | implements #64; implements #67 |
| 31 | 3.4.4 (root-app/index.html:24) | 3 code | comment | — | context | weak | — |
| 32 | 3.4.4 (root-app/index.html:34) | 3 code | source code | import-maps | technological | weak | — |
| 33 | 3.4.4 (root-app/index.html:41) | 3 code | source code | import-maps | technological | weak | — |
| 34 | 3.4.4 (root-app/src/global.d.ts:1) | 3 code | comment | — | context | weak | — |
| 35 | 3.4.4 (root-app/src/global.d.ts:14) | 3 code | comment | — | context | weak | — |
| 36 | 3.4.4 (root-app/src/global.d.ts:15) | 3 code | comment | — | context | weak | — |
| 37 | 3.4.4 (root-app/src/global.d.ts:17) | 3 code | source code | — | context | weak | — |
| 38 | 3.4.4 (root-app/src/utils/dynamicImport.ts:6) | 3 code | comment | — | context | weak | — |
| 39 | 3.4.4 (root-app/src/utils/dynamicImport.ts:19) | 3 code | source code | — | context | weak | — |
| 40 | 3.4.4 (root-app/src/utils/dynamicImport.ts:21) | 3 code | comment | — | context | weak | — |
| 41 | 3.4.4 (root-app/src/utils/dynamicImport.ts:24) | 3 code | source code | import-maps | technological | ambiguous | — |
| 42 | 3.4.4 (root-app/src/utils/dynamicImport.ts:25) | 3 code | source code | — | context | weak | — |
| 43 | 3.4.4 (root-app/src/utils/dynamicImport.ts:28) | 3 code | source code | — | context | weak | — |
| 44 | 3.4.4 (root-classic/src/index.ejs:12) | 3 code | comment | — | context | weak | — |
| 45 | 3.4.4 (root-classic/src/index.ejs:13) | 3 code | comment | — | context | weak | — |
| 46 | 3.4.4 (root-classic/src/index.ejs:14) | 3 code | comment | — | context | weak | — |
| 47 | 3.4.4 (root-classic/src/index.ejs:41, src-import-map) | 3 code | source code | import-maps | technological | weak | — |
| 48 | 3.4.4 (root-classic/src/index.ejs:56) | 3 code | source code | import-maps | technological | weak | — |
| 49 | 3.4.4 (root-app/index.html:21) | 3 code | source code | import-maps | technological | weak | — |
| 50 | 3.4.4 (root-classic/src/index.ejs:41, src-html-external-script) | 3 code | source code | import-maps | technological | weak | — |
| 51 | 3.4.4 (root-app/src/App.vue:8) | 3 code | source code | single-spa | architectural | strong | implements #67 |
| 52 | 3.4.4 (root-app/src/App.vue:9) | 3 code | source code | single-spa | architectural | strong | implements #64 |
| 53 | 3.4.4 (root-app/src/components/ParcelWrapper.vue:3) | 3 code | source code | single-spa | technological | moderate | implements #64; implements #67 |
| 54 | 3.4.4 (root-app/src/utils/dynamicImport.ts:15) | 3 code | source code | import-maps | technological | moderate | implements #64; implements #67 |
| 55 | 3.4.4 (root-classic/src/index.ejs:30) | 3 code | source code | import-maps | architectural | strong | implements #65; implements #66 |
| 56 | 3.4.4 (root-classic/src/microfrontend-layout.html:1) | 3 code | source code | single-spa | architectural | strong | implements #65; implements #66 |
| 57 | 3.4.4 (root-classic/src/org-root-config.ts:13) | 3 code | source code | single-spa | technological | moderate | implements #65; implements #66 |
| 58 | 3.4.4 (root-classic/src/org-root-config.ts:18) | 3 code | source code | single-spa | technological | moderate | implements #65; implements #66 |
| 59 | 3.4.4 (root-classic/src/org-root-config.ts:20) | 3 code | source code | single-spa | technological | moderate | implements #65; implements #66 |
| 60 | 3.4.3 (content-app) | 4 structure | directory | — | architectural | moderate | — |
| 61 | 3.4.3 (root-app) | 4 structure | directory | — | architectural | moderate | — |
| 62 | 3.4.3 (root-classic) | 4 structure | directory | — | architectural | moderate | — |
| 63 | 3.4.3 (topbar-app) | 4 structure | directory | — | architectural | moderate | — |
| 64 | 3.4.5 #1 | 5 composition | source code | single-spa | architectural | strong | links #61; links #60 |
| 65 | 3.4.5 #2 | 5 composition | configuration | single-spa | architectural | strong | links #62; links #60 |
| 66 | 3.4.5 #3 | 5 composition | configuration | single-spa | architectural | strong | links #62; links #63 |
| 67 | 3.4.5 #4 | 5 composition | source code | single-spa | architectural | strong | links #61; links root-app/index.html:15 |
| 68 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #60 |
| 69 | 3.4.6 #2 | 6 build-deploy | manifest | — | architectural | moderate | publishes #61 |
| 70 | 3.4.6 #3 | 6 build-deploy | manifest | — | architectural | moderate | publishes #62 |
| 71 | 3.4.6 #4 | 6 build-deploy | manifest | — | architectural | moderate | publishes #63 |
| 72 | 3.4.7 #1 | 7 documentation | comment | import-maps | technological | weak | corroborates #30; corroborates #13 |
| 73 | 3.4.7 #2 | 7 documentation | comment | import-maps | technological | weak | partially corroborates #49 |
| 74 | 3.4.7 #3 | 7 documentation | comment | import-maps | technological | weak | corroborates #54; corroborates #49 |
| 75 | 3.4.7 #4 | 7 documentation | comment | import-maps | technological | weak | corroborates #54; corroborates #30 |
| 76 | 3.4.7 #5 | 7 documentation | comment | import-maps | technological | weak | partially corroborates #54 |
| 77 | 3.4.7 #6 | 7 documentation | comment | — | architectural | weak | corroborates #63; corroborates #29; corroborates #66 |
| 78 | 3.4.8 #1 | 8 history | history | — | technological | weak | explains #1; explains #11 |
| 79 | 3.4.8 #2 | 8 history | history | — | technological | weak | explains #5 |
| 80 | 3.4.8 #3 | 8 history | history | — | technological | weak | explains #6 |
| 81 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #27; explains #29 |
| 82 | 3.4.8 #5 | 8 history | history | — | architectural | weak | explains #61 |
| 83 | 3.4.8 #6 | 8 history | history | — | technological | weak | explains #31; explains #41; explains #49; explains #73; explains #76 |
| 84 | 3.4.8 #7 | 8 history | history | — | context | weak | explains #44; explains #45; explains #46 |
| 85 | 3.4.8 #8 | 8 history | history | — | architectural | weak | explains #17; explains #18; explains #19 |
| 86 | 3.4.8 #9 | 8 history | history | — | architectural | weak | explains #14; explains #55 |
| 87 | 3.4.8 #10 | 8 history | history | — | architectural | weak | explains #67; explains #51 |

## Summary

Observations: 87. Dimensions (technology: 12, configuration: 7, code: 40, structure: 4, composition: 4, build-deploy: 4, documentation: 6, history: 10). Strength (strong: 12, moderate: 24, weak: 50, ambiguous: 1). Evidence (technological: 44, architectural: 29, context: 14).


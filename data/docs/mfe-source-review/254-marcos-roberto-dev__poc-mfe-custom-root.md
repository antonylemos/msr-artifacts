---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-mount-export | content-app/src/main.ts:20 | content-app | runtime-composition | Yes | Exports the `bootstrap` lifecycle created by `singleSpaVue` at content-app/src/main.ts:8-18. The unit is resolved as `@org/content-app` through both hosts’ import maps (root-app/index.html:14; root-classic/src/index.ejs:34) and consumed by root-app’s `ParcelWrapper` (root-app/src/App.vue:9; root-app/src/components/ParcelWrapper.vue:22-35) and root-classic’s `registerApplication` (root-classic/src/org-root-config.ts:18; root-classic/src/microfrontend-layout.html:23). |
| src-mount-export | content-app/src/main.ts:21 | content-app | runtime-composition | Yes | Exports the `mount` lifecycle from the same object at content-app/src/main.ts:8-18; root-app checks `config.mount` before mounting the parcel (root-app/src/components/ParcelWrapper.vue:33) and root-classic calls it on activating route `default` (root-classic/src/microfrontend-layout.html:21-24). |
| src-mount-export | content-app/src/main.ts:22 | content-app | runtime-composition | Yes | Exports the `unmount` lifecycle from the same object, with the same consumers (root-app/src/components/ParcelWrapper.vue:33; root-classic/src/org-root-config.ts:18-20). |
| src-mount-export | topbar-app/src/main.ts:20 | topbar-app | runtime-composition | Yes | Exports the `bootstrap` lifecycle created by `singleSpaVue` at topbar-app/src/main.ts:8-18. The unit is resolved as `@org/topbar-app` in root-classic (root-classic/src/index.ejs:35; root-classic/src/microfrontend-layout.html:22) and, through the same URL `http://127.0.0.1:5175/src/main.ts`, as `@org/header-app` in root-app (root-app/index.html:15; root-app/src/App.vue:8). |
| src-mount-export | topbar-app/src/main.ts:21 | topbar-app | runtime-composition | Yes | Exports the `mount` lifecycle from the same object at topbar-app/src/main.ts:8-18, called by root-app’s parcel (root-app/src/components/ParcelWrapper.vue:3-5, :33) and root-classic’s single-spa (root-classic/src/org-root-config.ts:18-20). |
| src-mount-export | topbar-app/src/main.ts:22 | topbar-app | runtime-composition | Yes | Exports the `unmount` lifecycle from the same object, with the same consumers (root-app/src/components/ParcelWrapper.vue:33; root-classic/src/org-root-config.ts:18-20). |
| src-lifecycles | content-app/src/main.ts:4 | content-app | runtime-composition | Yes | Imports `singleSpaVue`, used at content-app/src/main.ts:8; the use it enables is `Yes`. |
| src-lifecycles | content-app/src/main.ts:8 | content-app | runtime-composition | Yes | `singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })` (content-app/src/main.ts:8-18) adapts the Vue App to single-spa lifecycles, exported at content-app/src/main.ts:20-22; its own mount is commented out at content-app/src/main.ts:6, so the UI starts only when a host calls `mount`. |
| src-lifecycles | topbar-app/src/main.ts:4 | topbar-app | runtime-composition | Yes | Imports `singleSpaVue`, used at topbar-app/src/main.ts:8; the use it enables is `Yes`. |
| src-lifecycles | topbar-app/src/main.ts:8 | topbar-app | runtime-composition | Yes | `singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })` (topbar-app/src/main.ts:8-18) creates lifecycles exported at topbar-app/src/main.ts:20-22; its own mount is commented out at topbar-app/src/main.ts:6. Consumed by both hosts (root-app/src/App.vue:8; root-classic/src/microfrontend-layout.html:22). |
| src-import-map | root-app/index.html:11 | root-app | remote-resolution | Yes | Native `<script type="importmap">` (root-app/index.html:11-18) maps `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` (:14) and `@org/header-app` → `http://127.0.0.1:5175/src/main.ts` (:15). These names are passed to `ParcelWrapper` (root-app/src/App.vue:8-9) and resolved by `import(url)` at root-app/src/utils/dynamicImport.ts:15. Targets: content-app and topbar-app (same URLs as root-classic/src/index.ejs:34-35). |
| src-import-map | root-app/index.html:24 | root-app | none | No | `<!-- <script type="systemjs-importmap">` opens an HTML comment extending to root-app/index.html:30 (`</script> -->`); the SystemJS map for `@org/header-app` → `http://127.0.0.1:4173/app.js` (:27) is inactive. |
| src-import-map | root-app/index.html:34 | root-app | none | No | `src` of the `<script>` at root-app/index.html:33-34 loading the import-map-overrides library from a CDN (development tool for overriding the import map); does not load another unit’s bundle. |
| src-import-map | root-app/index.html:41 | root-app | none | No | `<import-map-overrides-full show-when-local-storage="overrides-ui" dev-libs>` is the panel of the library loaded at root-app/index.html:33-34, shown only with the `overrides-ui` key in localStorage; not a custom element from another unit. |
| src-import-map | root-app/src/global.d.ts:1 | root-app | none | No | Comment in a type declaration file (`declare global { interface Window ... }`, root-app/src/global.d.ts:3-26); not executable code. |
| src-import-map | root-app/src/global.d.ts:14 | root-app | none | No | JSDoc comment of property `importMapOverrides` in the `Window` type declaration (root-app/src/global.d.ts:13-17). |
| src-import-map | root-app/src/global.d.ts:15 | root-app | none | No | URL of the import-map-overrides documentation within the same JSDoc comment (root-app/src/global.d.ts:13-16). |
| src-import-map | root-app/src/global.d.ts:17 | root-app | none | No | Type declaration `importMapOverrides?: { ... }` (root-app/src/global.d.ts:17-24); only typing, no use of `window.importMapOverrides` in root-app code. |
| src-import-map | root-app/src/utils/dynamicImport.ts:6 | root-app | none | No | JSDoc comment describing the helper strategy (root-app/src/utils/dynamicImport.ts:1-9). |
| src-import-map | root-app/src/utils/dynamicImport.ts:19 | root-app | none | No | `console.warn(...)` in the `catch` of native `import()`; only logging. |
| src-import-map | root-app/src/utils/dynamicImport.ts:21 | root-app | none | No | Line comment before the SystemJS fallback (root-app/src/utils/dynamicImport.ts:22-33). |
| src-import-map | root-app/src/utils/dynamicImport.ts:24 | root-app | dynamic-loading | Undetermined | `window.System.import(url)` is the fallback executed only when native `import()` at root-app/src/utils/dynamicImport.ts:15 fails. SystemJS is loaded (root-app/index.html:21), but the only `systemjs-importmap` map is commented out (root-app/index.html:24-30), and names `@org/header-app` and `@org/content-app` (root-app/src/App.vue:8-9) are only in the native import map (root-app/index.html:11-18). This path cannot be confirmed to load any unit; see Notes. |
| src-import-map | root-app/src/utils/dynamicImport.ts:25 | root-app | none | No | `console.log(...)` on fallback success; only logging. |
| src-import-map | root-app/src/utils/dynamicImport.ts:28 | root-app | none | No | `console.error(...)` when both paths fail; only logging. |
| src-import-map | root-classic/src/index.ejs:12 | root-classic | none | No | HTML comment (`<!-- ... -->` on the same line) with import-map-overrides usage instructions; not active code. |
| src-import-map | root-classic/src/index.ejs:13 | root-classic | none | No | HTML comment with a link to import-map-overrides documentation; not active code. |
| src-import-map | root-classic/src/index.ejs:14 | root-classic | none | No | `<meta name="import-map-overrides-domains" ...>` entirely within an HTML comment (`<!--` and `-->` on the same line); inactive. |
| src-import-map | root-classic/src/index.ejs:41 | root-classic | none | No | `<script src=".../import-map-overrides@5.1.1/...">` loads the import map development library from a CDN; does not load another unit’s bundle. Unit resolution is in the import map at root-classic/src/index.ejs:30-38 (manual row). |
| src-import-map | root-classic/src/index.ejs:56 | root-classic | none | No | `<import-map-overrides-full show-when-local-storage="devtools" dev-libs>` is the panel of the library loaded at root-classic/src/index.ejs:41, shown only with the `devtools` key in localStorage; not a custom element from another unit. |
| src-html-external-script | root-app/index.html:21 | root-app | none | No | `<script src=".../systemjs@6.14.2/dist/system.min.js">` loads the SystemJS loader from a CDN, used only by the fallback at root-app/src/utils/dynamicImport.ts:22-24; a library rather than another unit’s bundle. |
| src-html-external-script | root-classic/src/index.ejs:41 | root-classic | none | No | The same script as the `src-import-map` row at root-classic/src/index.ejs:41: CDN import-map-overrides library rather than another unit’s bundle. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | root-app/src/App.vue:8 | root-app | host-relationship | Yes | `<ParcelWrapper app-name="@org/header-app">` declares in the host root template (mounted at root-app/src/main.ts:5) that topbar enters as the first parcel; the name resolves to `http://127.0.0.1:5175/src/main.ts` (root-app/index.html:15), the topbar-app URL at root-classic/src/index.ejs:35. |
| manual | root-app/src/App.vue:9 | root-app | host-relationship | Yes | `<ParcelWrapper app-name="@org/content-app">` declares the host’s second parcel, resolved to `http://127.0.0.1:5174/src/main.ts` (root-app/index.html:14), content-app. |
| manual | root-app/src/components/ParcelWrapper.vue:3 | root-app | runtime-composition | Yes | `<Parcel ... :config="parcelConfigRef" :mountParcel="mountParcel" ...>` (root-app/src/components/ParcelWrapper.vue:3-5), a component from `single-spa-vue/parcel` (:10), mounts as a parcel the remote module loaded at :22 using single-spa’s `mountRootParcel` (:11, :46); the object requires `mount` and `unmount` (:33), exported by content-app/src/main.ts:20-22 and topbar-app/src/main.ts:20-22. |
| manual | root-app/src/utils/dynamicImport.ts:15 | root-app | dynamic-loading | Yes | `await import(/* @vite-ignore */ url)` loads at runtime the module by the received name; called by `dynamicImport(props.appName)` at root-app/src/components/ParcelWrapper.vue:22 with `@org/header-app` and `@org/content-app` (root-app/src/App.vue:8-9), resolved by the native import map (root-app/index.html:11-18) to topbar-app and content-app. |
| manual | root-classic/src/index.ejs:30 | root-classic | remote-resolution | Yes | `<script type="injector-importmap">` (root-classic/src/index.ejs:30-38) maps `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` (:34) and `@org/topbar-app` → `http://127.0.0.1:5175/src/main.ts` (:35), as well as its own `@org/root-config` (:33). Active only when `isLocal` (root-classic/src/index.ejs:29; root-classic/webpack.config.js:21-22), passed by the `start` script (`--env isLocal`, root-classic/package.json:4). |
| manual | root-classic/src/microfrontend-layout.html:1 | root-classic | host-relationship | Yes | `<single-spa-router>` (root-classic/src/microfrontend-layout.html:1-26) is the host route table: in route `default` (:21-24), `@org/topbar-app` (:22) and `@org/content-app` (:23) inside `<main>`. The examples at :9-18 are commented out. Imported and converted into routes at root-classic/src/org-root-config.ts:7-9. |
| manual | root-classic/src/org-root-config.ts:13 | root-classic | dynamic-loading | Yes | `loadApp({ name }) { return import(/* webpackIgnore: true */ name); }` (root-classic/src/org-root-config.ts:12-14) loads at runtime, by the name resolved in the import map (root-classic/src/index.ejs:34-35), units `@org/topbar-app` and `@org/content-app`. Root config is the bundle entry (root-classic/webpack.config.js:7-13) and is imported by the page at root-classic/src/index.ejs:52-54. |
| manual | root-classic/src/org-root-config.ts:18 | root-classic | runtime-composition | Yes | `applications.forEach(registerApplication)` registers in single-spa the applications built from the layout at root-classic/src/org-root-config.ts:9-15 (`registerApplication` imported at :1); the layout engine created at :16 and activated at :19 positions the units in the route’s `<main>`. |
| manual | root-classic/src/org-root-config.ts:20 | root-classic | runtime-composition | Yes | `start()` from single-spa (imported at root-classic/src/org-root-config.ts:1) starts the orchestrator; without it, registrations at :18 do not mount topbar-app and content-app. |

## Summary

Constructs participating in composition: 20 (runtime-composition: 13, remote-resolution: 2, host-relationship: 3, dynamic-loading: 2).

## Notes

- The two hosts are alternatives and use the same remotes through the same URLs: root-app mounts topbar-app and content-app as parcels (`mountRootParcel`), and root-classic registers them as single-spa applications with single-spa-layout. In root-app topbar is named `@org/header-app` (root-app/index.html:15), and in root-classic `@org/topbar-app` (root-classic/src/index.ejs:35).
- The remote URLs use fixed ports (5174 for content-app, 5175 for topbar), but no `vite.config.ts` fixes a port (content-app/vite.config.ts:5-7; topbar-app/vite.config.ts:5-20), and `package.json` files only have `"dev": "vite"`. The name → unit association comes from matching URLs in both hosts; the snapshot does not show the server startup order.
- The root-app `System.import` fallback (root-app/src/utils/dynamicImport.ts:22-33) appears intended for topbar-app’s `format: "system"` build (topbar-app/vite.config.ts:14-15, output `app.js`), referenced only in the commented SystemJS map (root-app/index.html:27). With the map commented out, the path has no confirmed target; hence `Undetermined`. This does not change the other answers: the native path (:15) loads both units.
- `root-app/src/importMap.json`, `root-app/src/importMap.dev.json` and `root-app/mfe-app.json` have maps with the units (including `spa.js` and port 5173 for content-app at root-app/mfe-app.json:4), but no snapshot file imports or references them; they did not become rows.
- The root-classic map exists only in local mode (`<% if (isLocal) { %>`, root-classic/src/index.ejs:29-39); the production map is commented out at root-classic/src/index.ejs:27. The constructs were annotated `Yes` through the active `start` path.
- `import('@org/root-config')` at root-classic/src/index.ejs:53 loads root config itself (mapped at :33), internal to unit `root-classic`; it did not become a manual row.
- The import of `root-app/src/modules/Topbar/src/TopbarApp.vue` and its use are commented out (root-app/src/App.vue:3 and :7); this is root-app local code rather than composition.
- The `src-import-map` pattern captured comments, logs and type declarations at root-app/src/global.d.ts and root-app/src/utils/dynamicImport.ts rather than the native `import()` (root-app/src/utils/dynamicImport.ts:15) or root-classic’s import map (root-classic/src/index.ejs:30-38).

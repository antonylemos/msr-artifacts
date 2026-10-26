---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 163 — irfanswr/react-microfrontend

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-mount-export | vue-child-app/src/main.js:24 | vue-child-app | runtime-composition | Yes | Exports the `bootstrap` lifecycle created by `singleSpaVue` at vue-child-app/src/main.js:6-22; the unit is resolved as `@frontenddevs/vue-child-app` by the root config import map (parent-app/src/index.ejs:38), loaded by parent-app/src/frontenddevs-root-config.js:13 and registered at parent-app/src/frontenddevs-root-config.js:18, according to layout parent-app/src/microfrontend-layout.html:5 and :11. |
| src-mount-export | vue-child-app/src/main.js:25 | vue-child-app | runtime-composition | Yes | Exports the `mount` lifecycle from the same object at vue-child-app/src/main.js:6-22, called by the root config’s single-spa when activating the `default` and `vue-app` routes (parent-app/src/microfrontend-layout.html:3-5 and :10-11). |
| src-mount-export | vue-child-app/src/main.js:26 | vue-child-app | runtime-composition | Yes | Exports the `unmount` lifecycle from the same object, with the same consumer at parent-app/src/frontenddevs-root-config.js:18-20. |
| src-lifecycles | react-child-app/src/frontenddevs-react-mfe.js:3 | react-child-app | runtime-composition | Yes | Imports `singleSpaReact`, used at react-child-app/src/frontenddevs-react-mfe.js:6; the use it enables is `Yes`. |
| src-lifecycles | react-child-app/src/frontenddevs-react-mfe.js:6 | react-child-app | runtime-composition | Yes | `singleSpaReact({ React, ReactDOMClient, rootComponent: Root, ... })` (react-child-app/src/frontenddevs-react-mfe.js:6-14) creates the lifecycles exported at react-child-app/src/frontenddevs-react-mfe.js:16; the unit is resolved as `@frontenddevs/react-mfe` at parent-app/src/index.ejs:37 (ESM bundle, `outputSystemJS: false` at react-child-app/webpack.config.js:10) and registered by root config at parent-app/src/frontenddevs-root-config.js:18, in the routes at parent-app/src/microfrontend-layout.html:4 and :8. |
| src-lifecycles | vue-child-app/src/main.js:2 | vue-child-app | runtime-composition | Yes | Imports `singleSpaVue`, used at vue-child-app/src/main.js:6; the use it enables is `Yes`. |
| src-lifecycles | vue-child-app/src/main.js:6 | vue-child-app | runtime-composition | Yes | `singleSpaVue({ createApp, appOptions: { render() ... } })` (vue-child-app/src/main.js:6-22) adapts the Vue App to single-spa lifecycles, exported at vue-child-app/src/main.js:24-26 and consumed by root config (parent-app/src/index.ejs:38; parent-app/src/frontenddevs-root-config.js:18). |
| src-import-map | parent-app/src/index.ejs:10 | parent-app | none | No | HTML comment (`<!-- ... -->`) with import-map-overrides usage instructions; not active code. |
| src-import-map | parent-app/src/index.ejs:11 | parent-app | none | No | HTML comment with a link to import-map-overrides documentation; not active code. |
| src-import-map | parent-app/src/index.ejs:12 | parent-app | none | No | `<meta name="import-map-overrides-domains" ...>` entirely within an HTML comment (`<!--` and `-->` on the same line); inactive. |
| src-import-map | parent-app/src/index.ejs:44 | parent-app | none | No | `<script src=".../import-map-overrides@5.1.1/...">` loads from a CDN the development library allowing import map entries to be overridden; does not load another unit’s bundle. Unit resolution is in the import map at parent-app/src/index.ejs:33-41 (manual row). |
| src-import-map | parent-app/src/index.ejs:57 | parent-app | none | No | `<import-map-overrides-full show-when-local-storage="devtools" dev-libs>` is the development panel of the library loaded at parent-app/src/index.ejs:44, shown only with the `devtools` key in localStorage; not a custom element from another unit. |
| src-html-external-script | parent-app/src/index.ejs:44 | parent-app | none | No | The same script as the earlier parent-app/src/index.ejs:44 row: CDN import-map-overrides library rather than another unit’s bundle. |
| src-html-external-script | parent-app/src/index.ejs:45 | parent-app | none | No | `<script src=".../@single-spa/import-map-injector@2.0.1/...">` loads from a CDN the library installing `<script type="injector-importmap">` elements (parent-app/src/index.ejs:9, :15, :33); a library rather than another unit’s bundle. The units are loaded by parent-app/src/frontenddevs-root-config.js:13. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | parent-app/src/frontenddevs-root-config.js:13 | parent-app | dynamic-loading | Yes | `loadApp({ name }) { return import(/* webpackIgnore: true */ name); }` (parent-app/src/frontenddevs-root-config.js:12-14) loads at runtime, through the name resolved in the import map, units `@frontenddevs/react-mfe` and `@frontenddevs/vue-child-app` (parent-app/src/index.ejs:37-38). Root config is the bundle entry (parent-app/webpack.config.js:7-13) and is imported by the page at parent-app/src/index.ejs:53-55. |
| manual | parent-app/src/frontenddevs-root-config.js:18 | parent-app | runtime-composition | Yes | `applications.forEach(registerApplication)` registers in single-spa the applications built from the layout at parent-app/src/frontenddevs-root-config.js:9-15 (`registerApplication` imported at :1); the layout engine created at :16 and activated at :19 positions the units in the routes’ `<main>`. |
| manual | parent-app/src/frontenddevs-root-config.js:20 | parent-app | runtime-composition | Yes | `start()` from single-spa (imported at parent-app/src/frontenddevs-root-config.js:1) starts the orchestrator; without it, the registrations at :18 do not mount the React and Vue units. |
| manual | parent-app/src/index.ejs:33 | parent-app | remote-resolution | Yes | `<script type="injector-importmap">` (parent-app/src/index.ejs:33-41) maps unit names to entry URLs: `@frontenddevs/react-mfe` → `http://localhost:8081/frontenddevs-react-mfe.js` (:37) and `@frontenddevs/vue-child-app` → `http://localhost:8082/js/app.js` (:38). Active only when `isLocal` (parent-app/src/index.ejs:32; parent-app/webpack.config.js:21-22), passed by the `start` script (`--env isLocal`, parent-app/package.json:4). |
| manual | parent-app/src/microfrontend-layout.html:1 | parent-app | host-relationship | Yes | `<single-spa-router>` (parent-app/src/microfrontend-layout.html:1-14) is the host route table: default route with both units (:3-6), `react-app` with `@frontenddevs/react-mfe` (:7-9) and `vue-app` with `@frontenddevs/vue-child-app` (:10-12). Imported and converted into routes at parent-app/src/frontenddevs-root-config.js:7-9. |

## Summary

Constructs participating in composition: 12 (runtime-composition: 9, dynamic-loading: 1, remote-resolution: 1, host-relationship: 1).

## Notes

- The import map with unit URLs exists only in local mode (`<% if (isLocal) { %>`, parent-app/src/index.ejs:32-42). In the production build (`webpack --mode=production`, parent-app/package.json:11), there is no map for the units: the production map line is commented out at parent-app/src/index.ejs:30. The constructs were annotated `Yes` through the active `start` path.
- `import('@frontenddevs/root-config')` at parent-app/src/index.ejs:54 loads root config itself (mapped to `//localhost:9000/frontenddevs-root-config.js` at parent-app/src/index.ejs:36), internal to unit `parent-app`; it did not become a manual row.
- The vue-child-app bundle format depends on `vue-cli-plugin-single-spa` (vue-child-app/package.json:24), without options at vue-child-app/vue.config.js:1-4; the snapshot does not show whether output is compatible with root config’s native `import()`. This does not change the answer: the connection is declared at parent-app/src/index.ejs:38 and parent-app/src/microfrontend-layout.html:5 and :11.
- The `src-import-map` pattern captured HTML comments and the import-map-overrides library rather than the units’ import map (parent-app/src/index.ejs:33-41).

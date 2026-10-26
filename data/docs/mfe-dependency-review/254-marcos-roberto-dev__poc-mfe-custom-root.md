---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| content-app/package.json:12 | dependencies | single-spa | ^6.0.3 | single-spa | No | no import of `single-spa` in content-app/ (grep, excluding the lockfiles); content-app/src/main.ts:4 imports only `single-spa-vue`; only declared in content-app/package.json:12 |
| content-app/package.json:13 | dependencies | single-spa-vue | ^3.0.1 | single-spa | Yes | content-app/src/main.ts:4 and 8-22 (`import singleSpaVue from 'single-spa-vue'`; `singleSpaVue({ createApp, appOptions: ... })`; exports `bootstrap`, `mount`, `unmount`); content-app/index.html:11 (`<script type="module" src="/src/main.ts">`, Vite entry point); root-app/index.html:14 and root-classic/src/index.ejs:34 (`"@org/content-app": "http://127.0.0.1:5174/src/main.ts"`) |
| root-app/package.json:12 | dependencies | single-spa | ^6.0.3 | single-spa | Yes | root-app/src/components/ParcelWrapper.vue:11 and 46 (`import { mountRootParcel } from 'single-spa'`; `const mountParcel = mountRootParcel`, passed to `Parcel` in :4); root-app/src/App.vue:2 and 8-9 (imports and uses `ParcelWrapper`); root-app/src/main.ts:3-5 (`createApp(App).mount('#app')`); root-app/index.html:43 (`/src/main.ts`, Vite entry point) |
| root-app/package.json:13 | dependencies | single-spa-vue | ^3.0.1 | single-spa | Yes | root-app/src/components/ParcelWrapper.vue:10 and 2-5 (`import Parcel from 'single-spa-vue/parcel'`; `<Parcel ... :config="parcelConfigRef" :mountParcel="mountParcel" ...>`); same use chain as the previous row (root-app/src/App.vue:2 and 8-9; root-app/src/main.ts:3-5; root-app/index.html:43) |
| root-app/package.json:14 | dependencies | vite-plugin-single-spa | ^1.1.0 | single-spa | No | no import or invocation of `vite-plugin-single-spa` in snapshot files (grep, excluding the lockfiles); root-app/vite.config.ts:1-7 only registers `vue()`; only declared in root-app/package.json:14 |
| root-classic/package.json:44 | dependencies | @types/systemjs | ^6.1.1 | import-maps | No | no type reference, import or use of `System.` in root-classic/ (grep, excluding the lockfiles); root-classic/tsconfig.json:1-9 and root-classic/src/declarations.d.ts:1-39 do not mention it; root-classic/src/index.ejs:11, 17 and 41-43 (import map through `@single-spa/import-map-injector` and `import-map-overrides` via CDN, not SystemJS); only declared in root-classic/package.json:44 |
| root-classic/package.json:45 | dependencies | single-spa | ^5.9.3 | single-spa | Yes | root-classic/src/org-root-config.ts:1 and 18-20 (`import { registerApplication, start } from "single-spa"`; `applications.forEach(registerApplication)`; `start()`); root-classic/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, whose entry point is `src/org-root-config.ts`); root-classic/src/index.ejs:33 and 52-54 (`"@org/root-config": "//localhost:9000/org-root-config.js"`; `import('@org/root-config')`) |
| root-classic/package.json:47 | dependencies | single-spa-layout | ^1.6.0 | single-spa | Yes | root-classic/src/org-root-config.ts:2-6 and 9-19 (`import { constructApplications, constructRoutes, constructLayoutEngine } from "single-spa-layout"`; routes from `./microfrontend-layout.html`; `layoutEngine.activate()`); same entry file as the previous row (root-classic/webpack.config.js:7-9; root-classic/src/index.ejs:52-54) |
| root-classic/package.json:40 | devDependencies | ts-config-single-spa | ^3.0.0 | single-spa | Yes | root-classic/tsconfig.json:2 (`"extends": "ts-config-single-spa"`); root-classic/package.json:10 and 12 (`concurrently npm:build:*` and `build:types`: `tsc`, which reads the `tsconfig.json`) |
| root-classic/package.json:39 | devDependencies | webpack-config-single-spa-ts | ^8.0.0 | single-spa | Yes | root-classic/webpack.config.js:2 and 7-13 (`require("webpack-config-single-spa-ts")`; `singleSpaDefaults({ orgName, projectName: "root-config", ... })`); root-classic/package.json:4 and 11 (`webpack serve --port 9000 --env isLocal` and `webpack --mode=production`, which read the default `webpack.config.js`) |
| topbar-app/package.json:12 | dependencies | single-spa | ^6.0.3 | single-spa | No | no import of `single-spa` in topbar-app/ (grep, excluding the lockfiles); topbar-app/src/main.ts:4 imports only `single-spa-vue`; only declared in topbar-app/package.json:12 |
| topbar-app/package.json:13 | dependencies | single-spa-vue | ^3.0.1 | single-spa | Yes | topbar-app/src/main.ts:4 and 8-22 (`import singleSpaVue from 'single-spa-vue'`; `singleSpaVue({ createApp, appOptions: ... })`; exports `bootstrap`, `mount`, `unmount`); topbar-app/index.html:11 (`/src/main.ts`, Vite entry point); topbar-app/vite.config.ts:10 (`input: 'src/main.ts'`); root-app/index.html:15 and root-classic/src/index.ejs:35 (port 5175, `/src/main.ts`) |

## Notes

- `single-spa` in `content-app` and `topbar-app`: `same_package_matches` (`src/main.ts:4` and `:8`) is the import and call of `single-spa-vue`, not this package. The `mountRootParcel` from `single-spa` is used only in `root-app`, which has its own `package.json` and lockfile, with no root workspace; hence the occurrence does not count for the remotes.
- `@types/systemjs`: the seven `same_package_matches` occurrences in `root-classic/src/index.ejs` are import map patterns (`importmap-type` meta, comments, `injector-importmap` scripts, injector), not use of the types package. The `System.import` in `root-app/src/utils/dynamicImport.ts:22-24` belongs to another package, which does not declare `@types/systemjs` and types `window.System` in `root-app/src/global.d.ts:8-11`.
- `root-classic`: the code imports `single-spa` declared as `^5.9.3`, but the shared import map points to `single-spa@6.0.3` via CDN (`root-classic/src/index.ejs:17-24`). This does not change the answer.


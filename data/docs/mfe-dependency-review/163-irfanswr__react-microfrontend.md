---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 163 — irfanswr/react-microfrontend

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| parent-app/package.json:41 | dependencies | @types/systemjs | ^6.1.1 | import-maps | No | no import, type reference or use of `systemjs`/`System.` in the snapshot code and build files (grep, excluding the lockfiles); there is no TypeScript file; only declared in parent-app/package.json:41; parent-app/src/index.ejs:9, 15 and 45 (the import map uses `@single-spa/import-map-injector` via CDN, not SystemJS) |
| parent-app/package.json:42 | dependencies | single-spa | ^5.9.3 | single-spa | Yes | parent-app/src/frontenddevs-root-config.js:1 and 18-20 (`import { registerApplication, start } from "single-spa"`; `applications.forEach(registerApplication)`; `start()`); parent-app/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, whose entry point is `src/frontenddevs-root-config.js`); parent-app/src/index.ejs:36 and 53-55 (local import map and `import('@frontenddevs/root-config')`) |
| parent-app/package.json:43 | dependencies | single-spa-layout | ^1.6.0 | single-spa | Yes | parent-app/src/frontenddevs-root-config.js:2-7 and 9-19 (`import { constructApplications, constructRoutes, constructLayoutEngine } from "single-spa-layout"`; routes from `./microfrontend-layout.html`; `layoutEngine.activate()`); same entry file as the previous row (parent-app/webpack.config.js:7-9; parent-app/src/index.ejs:53-55) |
| parent-app/package.json:35 | devDependencies | webpack-config-single-spa | ^8.0.0 | single-spa | Yes | parent-app/webpack.config.js:2 and 7-13 (`require("webpack-config-single-spa")`; `singleSpaDefaults({ orgName, projectName: "root-config", ... })`); parent-app/package.json:4 and 11 (`webpack serve` and `webpack --mode=production`, which read the default `webpack.config.js`) |
| react-child-app/package.json:49 | dependencies | single-spa-react | ^6.0.2 | single-spa | Yes | react-child-app/src/frontenddevs-react-mfe.js:3, 6-14 and 16 (`import singleSpaReact from "single-spa-react"`; `singleSpaReact({ React, ReactDOMClient, rootComponent: Root, ... })`; exports `bootstrap`, `mount`, `unmount`); react-child-app/webpack.config.js:5-7 (`projectName: "react-mfe"`, whose entry point is `src/frontenddevs-react-mfe.js`); parent-app/src/index.ejs:37 (`"@frontenddevs/react-mfe": "http://localhost:8081/frontenddevs-react-mfe.js"`) |
| react-child-app/package.json:42 | devDependencies | webpack-config-single-spa-react | ^8.0.0 | single-spa | Yes | react-child-app/webpack.config.js:2 and 5-11 (`require("webpack-config-single-spa-react")`; `singleSpaDefaults({ orgName: "frontenddevs", projectName: "react-mfe", ... })`); react-child-app/package.json:4 and 7 (`webpack serve --port 8081` and `webpack --mode=production`, which read the default `webpack.config.js`) |
| vue-child-app/package.json:13 | dependencies | single-spa-vue | ^3.0.1 | single-spa | Yes | vue-child-app/src/main.js:2, 6-22 and 24-26 (`import singleSpaVue from 'single-spa-vue'`; `singleSpaVue({ createApp, appOptions: ... })`; exports the lifecycles); `src/main.js` is the default entry point for `vue-cli-service` (vue-child-app/package.json:6-7); parent-app/src/index.ejs:38 (`"@frontenddevs/vue-child-app": "http://localhost:8082/js/app.js"`) |
| vue-child-app/package.json:24 | devDependencies | vue-cli-plugin-single-spa | ~4.0.0 | single-spa | Undetermined | no import or invocation of `vue-cli-plugin-single-spa` in snapshot files (grep, excluding the lockfiles); vue-child-app/vue.config.js:1-4 does not mention it; vue-child-app/package.json:6-9 (`vue-cli-service serve`/`build`, `--mode standalone`); vue-child-app/.env.standalone:1 (`STANDALONE_SINGLE_SPA=true`); plugin loading depends on Vue CLI convention, with no snapshot file showing it |

## Notes

- The inspection lists give the `parent-app/` rows only occurrences in `react-child-app/` and `vue-child-app/` (imports of `single-spa-react` and `single-spa-vue`), which do not use those packages. Evidence for `single-spa`, `single-spa-layout` and `webpack-config-single-spa` came from grep in `parent-app/`, outside the lists.
- `@types/systemjs`: the seven `same_package_matches` occurrences in `parent-app/src/index.ejs` are import map patterns (`importmap-type` meta, `injector-importmap` scripts, comments, injector), rather than use of the types package. Context from the `create-single-spa` template; it does not change the classification.
- `single-spa` is also served by CDN in the shared import map (parent-app/src/index.ejs:23, version 6.0.3, differing from the declared `^5.9.3`). The root config import remains package use.
- The `src/frontenddevs-root-config.js` and `src/frontenddevs-react-mfe.js` entry points follow the `src/<orgName>-<projectName>.js` convention of `webpack-config-single-spa*`; there is no explicit `entry` in the snapshot.
- `vue-cli-plugin-single-spa`: Vue CLI loads `vue-cli-plugin-*` plugins declared in `package.json`, and the variable `STANDALONE_SINGLE_SPA` from `.env.standalone` is read by this plugin, according to its documentation. No snapshot file imports or invokes the package, and `vue.config.js` does not configure it; with uncertainty between `Yes` and `Undetermined`, it remained `Undetermined`.


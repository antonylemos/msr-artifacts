---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| angular-app | angular-app/angular.json;angular-app/package.json | angular-app/package.json | angular-app/angular.json:24-25 (`"index": "src/index.html"`, `"main": "src/main.single-spa.ts"`); angular-app/src/main.single-spa.ts:20-31 and 112-114 (`singleSpaAngular({ ..., template: '<app-root />' })` and exported lifecycles) | angular-app/angular.json:20-21 and 31-34 (`build` target with `@angular-builders/custom-webpack:browser`, `customWebpackConfig.path: extra-webpack.config.js`) + angular-app/package.json:7 (`"build": "ng build"`) | — | — | Yes | single-spa Angular application with its own entry and Angular CLI build. |
| common-lib-webpack | common-lib-webpack/index.html;common-lib-webpack/package.json;common-lib-webpack/webpack.config.js | common-lib-webpack/package.json | common-lib-webpack/webpack.config.js:5-7 (`index: "./src/index.ts"`, library entry); common-lib-webpack/src/index.ts:1-2 (only re-exports `Calculator` and `userState`); common-lib-webpack/index.html:1-11 (“Hello world!” page without a script) | common-lib-webpack/webpack.config.js:49-55 (`index.js` with `library.type: "system"`) + common-lib-webpack/package.json:8 (`"build": "webpack --mode production"`) | — | — | No | Shared utility module (state and calculator), with no application entry. |
| react-app | react-app/package.json;react-app/webpack.config.js | react-app/package.json | react-app/webpack.config.js:5-10 (`singleSpaDefaults({ orgName: "org1", projectName: "react-app", ... })`, `src/org1-react-app.tsx` entry by preset convention); react-app/src/org1-react-app.tsx:6-16 (`singleSpaReact({ ..., rootComponent: Root })` and exported lifecycles) | react-app/webpack.config.js:1-19 + react-app/package.json:6 (`"build": "webpack --mode=production"`) | — | — | Yes | single-spa React application with its own entry and webpack build. |
| react-vite-app | react-vite-app/index.html;react-vite-app/package.json;react-vite-app/vite.config.ts | react-vite-app/package.json | react-vite-app/index.html:11 (`<script type="module" src="/src/main.tsx">`, Vite entry); react-vite-app/vite.config.ts:40 (`spaEntryPoints: ["src/spa.tsx"]`); react-vite-app/src/spa.tsx:8-15 and 99-101 (`singleSpaReact(...)` and exported lifecycles) | react-vite-app/vite.config.ts:14-41 (output `format: "system"` and `vitePluginSingleSpa({ type: "mife", ... })`) + react-vite-app/package.json:8 (`"build": "tsc -b && vite build"`) | — | — | Yes | single-spa React application with its own entry and Vite build. |
| root-config | root-config/package.json;root-config/webpack.config.js | root-config/package.json | root-config/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, `src/org1-root-config.ts` entry by preset convention); root-config/webpack.config.js:19-21 (`HtmlWebpackPlugin` with `template: "src/index.ejs"`); root-config/src/org1-root-config.ts:3-23 (registers the three applications and calls `start`) | root-config/webpack.config.js:1-29 + root-config/package.json:9 (`"build": "webpack --mode=production"`) | — | — | Yes | single-spa root config with its own entry and webpack build. |
| styleguide | styleguide/index.html;styleguide/package.json;styleguide/vite.config.ts | styleguide/package.json | styleguide/vite.config.ts:20-24 (`build.lib` with `entry: src/styleguide.ts`, `formats: ['system']`); styleguide/src/styleguide.ts:3-5 (only exports components); styleguide/index.html:11 (`/src/main.tsx`, Vite scaffold page used only in development `vite`) | styleguide/vite.config.ts:19-38 (library build, external React and MUI) + styleguide/package.json:10 (`"build": "tsc -b && vite build"`) | — | — | No | Shared component library; the build generates only the package (`main: ./dist/styleguide.system.js`, package.json:6), with no application entry. |
| vue-app | vue-app/index.html;vue-app/package.json;vue-app/vite.config.ts | vue-app/package.json | vue-app/index.html:11 (`<script type="module" src="/src/main.ts">`, Vite entry); vue-app/src/main.ts:7-11 (`createApp(App)`, `app.mount("#app")`) | vue-app/vite.config.ts:8-15 + vue-app/package.json:6 and 8 (`"build": "run-p type-check build-only"`, `"build-only": "vite build"`) | — | — | Yes | Vue application with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 5 (angular-app, react-app, react-vite-app, root-config, vue-app).

## Notes

- The count differs from the classification’s `frontend_units: 4` because it includes `vue-app`, a Vue scaffold that mounts on its own in `#app` and does not appear in the root config or import map (`root-config/src/org1-root-config.ts:3-19`; `root-config/src/index.ejs:63-84`). The other four `Yes` rows are the units counted by the classification.
- `angular-app/angular.json:8-9` has a single project (`angular-app`), and there is no `package.json` at the root; the `workspace-config` files in `artifacts.csv` are the projects’ `package.json` and `tsconfig*.json`, without `workspaces`. The dependencies `file:../common-lib-webpack` and `file:../styleguide` (`react-app/package.json:56`, `65`; `angular-app/package.json:23`; `react-vite-app/package.json:14`, `18`) are local references, not a workspace declaration. `matches.csv` has no `ci-*` occurrences; it has 1 `ws-path-alias` (vue-app/tsconfig.json:6) and 1 `ops-cors` (common-lib-webpack/webpack.config.js:38). There is no Dockerfile, CI or hosting configuration in the snapshot.
- `styleguide`: `index.html` starts the Vite example page (`styleguide/src/main.tsx:6-10`, `App.tsx` with the default counter) only in the development server; `build.lib` mode does not use this HTML, and `dev:single-spa` (`styleguide/package.json:15`) serves the generated package on port 3002 (`styleguide/vite.config.ts:39-41`), consumed by the root import map (`root-config/src/index.ejs:70`).
- `react-vite-app` has two entries: `index.html` → `src/main.tsx` (`createRoot(...).render`, standalone use) and `src/spa.tsx` (single-spa lifecycles), which is what the root loads as `spa.js` (`root-config/src/index.ejs:69`).
- `react-app` and `root-config` do not write the entry in `webpack.config.js`; it follows from `orgName`/`projectName` in the preset, and the root import map points to `org1-react-app.js` and `org1-root-config.js` (`root-config/src/index.ejs:66-67`).

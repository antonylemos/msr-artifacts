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

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| parent-app | parent-app/package.json;parent-app/webpack.config.js | parent-app/package.json | parent-app/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, `src/frontenddevs-root-config.js` entry by `webpack-config-single-spa` convention); parent-app/webpack.config.js:18-20 (`HtmlWebpackPlugin` with `template: "src/index.ejs"`); parent-app/src/frontenddevs-root-config.js:9-20 (registers applications and calls `start()`) | parent-app/webpack.config.js:1-28 + parent-app/package.json:10-11 (`"build": "concurrently npm:build:*"`, `"build:webpack": "webpack --mode=production"`) | — | — | Yes | single-spa root config with its own entry and webpack build. |
| react-child-app | react-child-app/package.json;react-child-app/webpack.config.js | react-child-app/package.json | react-child-app/webpack.config.js:5-7 (`projectName: "react-mfe"`, `src/frontenddevs-react-mfe.js` entry by `webpack-config-single-spa-react` convention); react-child-app/src/frontenddevs-react-mfe.js:6-16 (`singleSpaReact` with `rootComponent: Root` and exported lifecycles) | react-child-app/webpack.config.js:1-16 + react-child-app/package.json:6-7 (`"build": "concurrently npm:build:*"`, `"build:webpack": "webpack --mode=production"`) | — | — | Yes | single-spa React application with its own entry and webpack build. |
| vue-child-app | vue-child-app/package.json | vue-child-app/package.json | vue-child-app/src/main.js:6-26 (`src/main.js` entry by Vue CLI convention; `singleSpaVue({ createApp, ... })` and exported lifecycles); vue-child-app/public/index.html:14 (`<div id="app">`, Vue CLI HTML template) | vue-child-app/vue.config.js:1-4 (`defineConfig`) + vue-child-app/package.json:7 (`"build": "vue-cli-service build"`) | — | — | Yes | single-spa Vue application with its own entry and `vue-cli-service` build. |

## Summary

Frontend applications in the snapshot: 3 (parent-app, react-child-app, vue-child-app).

## Notes

- N matches the classification’s `frontend_units: 3`: the root config and the two child applications, all in the snapshot.
- The three `package.json` files appear as `workspace-config` in `artifacts.csv`, but none declares `workspaces` (parent-app/package.json:1-45, react-child-app/package.json:1-51, vue-child-app/package.json:1-46); there is no root manifest or `ws-*`, `ops-*` or `ci-*` occurrences in `matches.csv`.
- There is no explicit `entry` in either `webpack.config.js`; the entries follow the `src/<orgName>-<projectName>.js` convention of `webpack-config-single-spa*`, and the files exist in the snapshot. In Vue, the entry follows the Vue CLI convention, like CRA’s in other reviews.
- Each project has its own lockfile (`package-lock.json`) and development port (parent-app/package.json:4, react-child-app/package.json:4, vue-child-app/package.json:6), with no deployment artifact in the snapshot.

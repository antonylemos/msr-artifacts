---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — | — | vercel.json:2-3 (`npm run install:all && npm run build:all`, publishes `dist`) | No | Only orchestrates the other directories: scripts that install, build and copy each project’s builds (package.json:7-12); with neither entry nor build configuration of its own |
| angular-mfe | angular-mfe/angular.json;angular-mfe/package.json;angular-mfe/webpack.config.js | angular-mfe/package.json | angular-mfe/angular.json:19-20 (`index: src/index.html`, `main: src/main.ts`); angular-mfe/src/main.ts:7-9 (`AppModule` bootstrap) | angular-mfe/angular.json:12-17 (`build` target with `@angular-builders/custom-webpack:browser` and `webpack.config.js`); angular-mfe/package.json:8 (`ng build`) | — | angular-mfe/vercel.json:2-3 (`outputDirectory: dist/angular-mfe`, `npm run build`) | Yes | Angular application with its own entry and build target |
| host | host/package.json;host/webpack.config.js | host/package.json | host/webpack.config.js:49 (`entry: ./src/index.js`); host/src/index.js:7 (loads `./bootstrap`) | host/webpack.config.js + host/package.json:8 (`webpack --mode production`) | — | host/vercel.json:2-3 (`outputDirectory: dist`, `npm run build`) | Yes | React application (host) with its own entry and webpack build |
| react-mfe-1 | react-mfe-1/package.json;react-mfe-1/webpack.config.js | react-mfe-1/package.json | react-mfe-1/webpack.config.js:12 (`entry: ./src/index.js`); react-mfe-1/src/index.js:3 (loads `./bootstrap`) | react-mfe-1/webpack.config.js + react-mfe-1/package.json:8 (`webpack --mode production`) | — | react-mfe-1/vercel.json:2-3 (`outputDirectory: dist`, `npm run build`) | Yes | React application with its own entry and webpack build |
| react-mfe-2 | react-mfe-2/package.json;react-mfe-2/webpack.config.js | react-mfe-2/package.json | react-mfe-2/webpack.config.js:11 (`entry: ./src/index.js`); react-mfe-2/src/index.js:1 (loads `./bootstrap`) | react-mfe-2/webpack.config.js + react-mfe-2/package.json:8 (`webpack --mode production`) | — | react-mfe-2/vercel.json:2-3 (`outputDirectory: dist`, `npm run build`) | Yes | React application with its own entry and webpack build |
| vue-mfe | vue-mfe/package.json;vue-mfe/webpack.config.js | vue-mfe/package.json | vue-mfe/webpack.config.js:13 (`entry: ./src/index.js`); vue-mfe/src/index.js:1 (loads `./bootstrap`) | vue-mfe/webpack.config.js + vue-mfe/package.json:8 (`webpack --mode production`) | — | vue-mfe/vercel.json:2-3 (`outputDirectory: dist`, `npm run build`) | Yes | Vue application with its own entry and webpack build |

## Summary

Frontend applications in the snapshot: 5 (angular-mfe, host, react-mfe-1, react-mfe-2, vue-mfe).

## Notes

- The classification records `frontend_units: 7`: the five local applications above and two external applications loaded in iframes by the host, Route Map and Multibank (host/src/App.jsx:38-41). These are outside the snapshot and do not become rows.
- There is no workspace: the root does not declare `workspaces` (package.json:1-17), and angular-mfe/angular.json:5-6 has only one project. Each directory has its own lockfile and is installed separately through `npm install --prefix` (package.json:7).
- `matches.csv` has no `ws-*` or `ci-*` occurrences; it has 35 `ops-*` occurrences (6 `ops-deployment-file`, which are the six `vercel.json` files; 17 `ops-hosting`; 12 `ops-cors`). The `vercel.json` files also appear as `deployment` in `artifacts.csv` and were opened directly. There are two publishing paths: one `vercel.json` per directory and the root vercel.json, which builds all and copies the `dist` outputs to a single directory (package.json:11).

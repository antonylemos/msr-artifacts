---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| frontend/order-tracking | frontend/order-tracking/package.json;frontend/order-tracking/webpack.config.js | frontend/order-tracking/package.json | frontend/order-tracking/webpack.config.js:7 (`entry: './src/index.js'`, which loads `bootstrap.js` with `createRoot` in src/bootstrap.js:7-8); frontend/order-tracking/webpack.config.js:61 (`template: './public/index.html'`) | frontend/order-tracking/webpack.config.js:44-64 (plugins, with remote `ModuleFederationPlugin`); frontend/order-tracking/package.json:8 (`webpack --mode production`) | — | frontend/order-tracking/Dockerfile:16 and :25 (`npm run build`, `dist` served by nginx); docker-compose.yml:317-319 (`order-tracking` service, `context: ./frontend/order-tracking`) | Yes | React application with its own entry, webpack build and container |
| frontend/restaurant-catalog | frontend/restaurant-catalog/package.json;frontend/restaurant-catalog/webpack.config.js | frontend/restaurant-catalog/package.json | frontend/restaurant-catalog/webpack.config.js:7 (`entry: './src/index.js'`, `createRoot` in src/bootstrap.js:7-8); frontend/restaurant-catalog/webpack.config.js:60 (`template: './public/index.html'`) | frontend/restaurant-catalog/webpack.config.js:43-63 (plugins, with remote `ModuleFederationPlugin`); frontend/restaurant-catalog/package.json:8 (`webpack --mode production`) | — | frontend/restaurant-catalog/Dockerfile:16 and :25 (`npm run build`, `dist` served by nginx); docker-compose.yml:301-303 (`restaurant-catalog` service, `context: ./frontend/restaurant-catalog`) | Yes | React application with its own entry, webpack build and container |
| frontend/shell-app | frontend/shell-app/package.json;frontend/shell-app/webpack.config.js | frontend/shell-app/package.json | frontend/shell-app/webpack.config.js:7 (`entry: './src/index.js'`, `ReactDOM.createRoot` in src/bootstrap.js:5-6); frontend/shell-app/webpack.config.js:65 (`template: './public/index.html'`) | frontend/shell-app/webpack.config.js:47-68 (plugins, with host `ModuleFederationPlugin`); frontend/shell-app/package.json:8 (`webpack --mode production`) | — | frontend/shell-app/Dockerfile:16 and :25 (`npm run build`, `dist` served by nginx); docker-compose.yml:349-351 (`shell-app` service, `context: ./frontend/shell-app`) | Yes | React application (host) with its own entry, webpack build and container |
| frontend/user-dashboard | frontend/user-dashboard/package.json;frontend/user-dashboard/webpack.config.js | frontend/user-dashboard/package.json | frontend/user-dashboard/webpack.config.js:8 (`entry: './src/index.js'`, `createRoot` in src/bootstrap.js:7-8); frontend/user-dashboard/webpack.config.js:69 (`template: './public/index.html'`) | frontend/user-dashboard/webpack.config.js:49-72 (plugins, with webpack remote `ModuleFederationPlugin`); frontend/user-dashboard/package.json:19 (`webpack --mode production`) | — | frontend/user-dashboard/Dockerfile:16 and :25 (`npm run build`, `dist` served by nginx); docker-compose.yml:333-335 (`user-dashboard` service, `context: ./frontend/user-dashboard`) | Yes | React application with its own entry, webpack build and container |
| infrastructure/faas/order-completion | infrastructure/faas/order-completion/package.json | infrastructure/faas/order-completion/package.json | — (infrastructure/faas/order-completion/package.json:5 `main: handler.js`, Express server in handler.js:1-2, not UI) | — | — | infrastructure/faas/order-completion/Dockerfile:1 and :25 (`node:18-alpine`, `CMD ["node", "handler.js"]`) | No | OpenFaaS function in Node/Express, not frontend |

## Summary

Frontend applications in the snapshot: 4 (frontend/order-tracking, frontend/restaurant-catalog, frontend/shell-app, frontend/user-dashboard).

## Notes

- N = 4 matches the classification’s `frontend_units: 4`.
- There is no `package.json` at the root or in `frontend/`; the four projects are independent, with no workspace. The `workspace-config` files in `artifacts.csv` are only each directory’s `package.json`, without `workspaces`.
- The `build` scripts (`webpack --mode production`) do not pass `--config`, so they read `webpack.config.js` from their own directory.
- The remaining `ops-*` occurrences (Java Dockerfiles in `backend/`, Python functions in `infrastructure/faas/`, `infrastructure/nginx/nginx.conf`, guides with `kubectl`) do not belong to units in `units.csv`. There are no `ci-*` occurrences.

---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| frontend/order-tracking/package.json:27 | devDependencies | @module-federation/enhanced | ^0.2.3 | module-federation | Yes | frontend/order-tracking/webpack.config.js:2 (`require('@module-federation/enhanced/webpack')`); frontend/order-tracking/webpack.config.js:45-59 (`new ModuleFederationPlugin({ name: 'orderTracking', filename: 'remoteEntry.js', exposes: { './OrderTracking' } … })`); frontend/order-tracking/package.json:7-8 (`webpack serve` / `webpack --mode production`, without `--config`, which read the default `webpack.config.js`); frontend/order-tracking/Dockerfile:16 (`RUN npm run build`) |
| frontend/restaurant-catalog/package.json:25 | devDependencies | @module-federation/enhanced | ^0.2.3 | module-federation | Yes | frontend/restaurant-catalog/webpack.config.js:2 (`require('@module-federation/enhanced/webpack')`); frontend/restaurant-catalog/webpack.config.js:44-58 (`new ModuleFederationPlugin({ name: 'restaurantCatalog', filename: 'remoteEntry.js', exposes: { './RestaurantCatalog' } … })`); frontend/restaurant-catalog/package.json:7-8 (`webpack serve` / `webpack --mode production`, default configuration); frontend/restaurant-catalog/Dockerfile:16 (`RUN npm run build`) |
| frontend/shell-app/package.json:28 | devDependencies | @module-federation/enhanced | ^0.2.3 | module-federation | Yes | frontend/shell-app/webpack.config.js:2 (`require('@module-federation/enhanced/webpack')`); frontend/shell-app/webpack.config.js:48-63 (`new ModuleFederationPlugin({ name: 'shellApp', remotes: { restaurantCatalog, orderTracking, userDashboard } … })`); frontend/shell-app/package.json:7-8 (`webpack serve` / `webpack --mode production`, default configuration); frontend/shell-app/Dockerfile:16 (`RUN npm run build`) |

## Notes

- Each `frontend/` project has its own `package.json`, with no aggregating root; each row was judged only by its own package's evidence. The `other_package_matches` occurrences are the other projects' configurations, which use the copy declared in their own `package.json`.
- `frontend/user-dashboard/` does not declare `@module-federation/enhanced` (`frontend/user-dashboard/package.json:22-34`) and uses webpack 5's built-in plugin: `frontend/user-dashboard/webpack.config.js:2-3` (`// FIX: Use the standard built-in plugin from 'webpack'`, `require('webpack').container`). The lines from that file appearing in `other_package_matches` are not use of this package.
- Searching for `module-federation` in the snapshot's `*.js`, `*.ts`, `*.mjs`, `*.cjs`, `*.json` and `Dockerfile` files returns only the three declarations and three `require` calls above.


---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Repository overview

A "Buy Now, Pay Later" system with a Django backend and React frontend in a pnpm workspace (`frontend/`). The frontend has a host, `frontend/shell` (port 3000), and two Module Federation remotes, `frontend/customer-app` (port 3001) and `frontend/merchant-app` (port 3002), plus library `frontend/shared` (`@bnpl/shared`), which is not a frontend unit and enters each app at build time. Federation uses webpack 5's native plugin (`require("webpack").container`, frontend/shell/webpack.config.js:3), hence the dependency review found no configured federation package.

The shell declares both remotes (frontend/shell/webpack.config.js:59-64) and, in adapters, loads each one's `createAdminAppConfig` module through `import()` (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10; frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10). What comes from the remotes is not a component mounted by them: it is a factory receiving `onBack` and `basename` from the shell and returning props for `AdminApp`, the common library's react-admin component, with each area's own screens (frontend/customer-app/src/application/services/create-admin-app-config.service.ts:7-25; frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:8-23). The comment in frontend/customer-app/webpack.config.js:84 explains the choice: avoiding multiple React trees in the shell. The shell then renders `AdminApp` under `/customer/*` and `/merchant/*` (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45-66; default paths in frontend/shared/src/infrastructure/context/global-settings.context.tsx:30-31).

Each remote has two modes in the same `webpack.config.js`, selected by `env.standalone` (frontend/customer-app/webpack.config.js:8): standalone has its own entry point with `HtmlWebpackPlugin` (:14-18, :74-79); remote mode has `ModuleFederationPlugin` (:80-116) with an empty entry (`remote-entry.module.ts`, 0 bytes). Scripts `dev` and `build` use remote mode (frontend/customer-app/package.json:6-7; frontend/merchant-app/package.json:6-7). The `onBack` callback passed by the shell (customer-app.adapter.ts:12) only redirects the window to `/`; there is no inter-unit message exchange. It is a portfolio project, with `localhost` URLs and no production federation configuration.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/shell | frontend/customer-app | host → remote | source → target | module-federation | Yes | Yes | frontend/shell/webpack.config.js:61-62 (remote `customer_app@http://localhost:3001/remoteEntry.js`); frontend/customer-app/webpack.config.js:81-88 (`name: "customer_app"`, `filename: "remoteEntry.js"`, exposes `./createAdminAppConfig`); frontend/customer-app/webpack.config.js:121 (port 3001) | frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:52 |
| 2 | frontend/shell | frontend/merchant-app | host → remote | source → target | module-federation | Yes | Yes | frontend/shell/webpack.config.js:61,63 (remote `merchant_app@http://localhost:3002/remoteEntry.js`); frontend/merchant-app/webpack.config.js:81-88 (`name: "merchant_app"`, `filename: "remoteEntry.js"`, exposes `./createAdminAppConfig`); frontend/merchant-app/webpack.config.js:121 (port 3002) | frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:62 |

## Observations

**1. frontend/shell → frontend/customer-app.** The adapter imports `customer_app/createAdminAppConfig` (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10) and calls the factory with `onBack` and `basename: settings.customerBasePath` (:11-14). The target was resolved through `name: "customer_app"` and exposure `./createAdminAppConfig` in frontend/customer-app/webpack.config.js:82-87, matching the shell remote (frontend/shell/webpack.config.js:62); port 3001 (frontend/customer-app/webpack.config.js:121) only corroborates. The shell calls `loadCustomerConfig` on mounting (shell-app.bootstrap.tsx:35) and renders `AdminApp` with returned props at `${customerBasePath}/*` (:47-55); the `Routes` line (:45) supports both relationships. Federation exists only in customer-app's remote mode, used by scripts `dev` and `build` (frontend/customer-app/package.json:6-7). The :35-36 promises have no `catch`, and the shell renders only when both configurations arrive (:39-41); this does not change the relationship.

**2. frontend/shell → frontend/merchant-app.** The same pattern: `import('merchant_app/createAdminAppConfig')` in frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10, with `basename: settings.merchantBasePath` (:13). The target was resolved through `name: "merchant_app"` and the exposure in frontend/merchant-app/webpack.config.js:82-87, matching the shell remote (frontend/shell/webpack.config.js:63); port 3002 (frontend/merchant-app/webpack.config.js:121) only corroborates. `AdminApp` is rendered with merchant-app props at `${merchantBasePath}/*` (shell-app.bootstrap.tsx:57-65). Merchant-app configuration adds a `dashboard` to the screens (frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:13).

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.


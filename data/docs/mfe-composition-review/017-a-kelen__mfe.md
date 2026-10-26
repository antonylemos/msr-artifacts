---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
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
  date: 2026-10-21
---

# 017 — a-kelen/mfe

## Repository overview

An example with a React `container` and three remotes: `auth` and `marketing` in React and `dashboard` in Vue. All use webpack 5's native Module Federation. Each remote exposes a `mount` function (e.g.: packages/auth/src/bootstrap.js:34), and the container calls it inside a wrapper component for each remote, connected to the routes (packages/container/src/App.js:40-48). Because the contract is only this function, the React container can mount a Vue remote.

The contract is not the same for all of them. In auth and marketing, `mount(el, opções)` (English translation: mount with an element and options) also carries navigation synchronization: the container passes `onNavigate` and `onSignIn` and receives `onParentNavigate` back (packages/container/src/components/AuthApp.js:11-21; packages/container/src/components/MarketingApp.js:11-20). Thus these remotes' memory history (packages/auth/src/bootstrap.js:7-9) follows the container's browser history, and login in auth notifies the container. The dashboard defines only `mount(el)`, with no history or callbacks (packages/dashboard/src/bootstrap.js:4-7), and the container passes only the element (packages/container/src/components/DashboardApp.js:8). These callback exchanges were not recorded as constructs in the source code review (protocol section 3.4.4), so they do not appear as a `communication` relationship.

In the production build, each application publishes under `/<app>/latest/` (`publicPath`, e.g.: packages/auth/config/webpack.prod.js:10), and the container looks up remotes on a domain from `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6, 17-20). Together with the per-application workflows identified in the structural review, this shows independent deployment of each unit on the same domain.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/auth | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.prod.js:17, 19 (remote `auth@${domain}/auth/latest/remoteEntry.js`); packages/container/config/webpack.dev.js:20, 22 (remote `auth@http://localhost:8082/remoteEntry.js`); packages/auth/config/webpack.prod.js:10-17 (`publicPath: '/auth/latest/'`, `name: 'auth'`, `filename: 'remoteEntry.js'`, exposes `./AuthApp`) | packages/auth/src/bootstrap.js:34; packages/container/src/components/AuthApp.js:4; packages/container/src/components/AuthApp.js:11; packages/container/src/App.js:40 |
| 2 | packages/container | packages/dashboard | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.prod.js:17, 20 (remote `dashboard@${domain}/dashboard/latest/remoteEntry.js`); packages/container/config/webpack.dev.js:20, 23 (remote `dashboard@http://localhost:8084/remoteEntry.js`); packages/dashboard/config/webpack.prod.js:10-17 (`publicPath: '/dashboard/latest/'`, `name: 'dashboard'`, `filename: 'remoteEntry.js'`, exposes `./DashboardApp`) | packages/dashboard/src/bootstrap.js:16; packages/container/src/components/DashboardApp.js:2; packages/container/src/components/DashboardApp.js:8; packages/container/src/App.js:40 |
| 3 | packages/container | packages/marketing | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.prod.js:17-18 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); packages/container/config/webpack.dev.js:20-21 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/marketing/config/webpack.prod.js:10-17 (`publicPath: '/marketing/latest/'`, `name: 'marketing'`, `filename: 'remoteEntry.js'`, exposes `./MarketingApp`) | packages/marketing/src/bootstrap.js:33; packages/container/src/components/MarketingApp.js:4; packages/container/src/components/MarketingApp.js:11; packages/container/src/App.js:40 |

## Observations

**1. packages/container → packages/auth.** The container imports `mount` from `auth/AuthApp` (packages/container/src/components/AuthApp.js:4) and calls it in the wrapper (packages/container/src/components/AuthApp.js:11). The name, module and `/auth/latest/` path match packages/auth/config/webpack.prod.js:10-17.

**2. packages/container → packages/dashboard.** The same pattern with `dashboard/DashboardApp` (packages/container/src/components/DashboardApp.js:2, 8). The name, module and `/dashboard/latest/` path match packages/dashboard/config/webpack.prod.js:10-17. Inside the remote, `mount` creates the Vue application; that `app.mount` is internal to the unit.

**3. packages/container → packages/marketing.** The same pattern with `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:4, 11). The name, module and `/marketing/latest/` path match packages/marketing/config/webpack.prod.js:10-17.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


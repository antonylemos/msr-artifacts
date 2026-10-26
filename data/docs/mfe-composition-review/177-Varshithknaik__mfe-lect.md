---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
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

# 177 — Varshithknaik/mfe-lect

## Repository overview

A project for learning Module Federation with webpack 5 (README.md:1-5): a React shell (`container`) loads React remotes `marketing` and `auth` and, in one copy, a Vue dashboard. The snapshot has two trees with the same unit names. At the root, `container`, `marketing` and `auth` form the version developed by the author and published through workflows: each synchronizes its `dist` to `<bucket>/<unidade>/latest` (English translation of the path placeholder: unit) (.github/workflows/container.yml:25; .github/workflows/marketing.yml:23; .github/workflows/auth.yml:23). In `packages/`, `container`, `marketing`, `auth` and `dashboard` form a complete copy without a workflow. In each tree, container is the only host: it declares remotes in `ModuleFederationPlugin` (container/config/webpack.dev.js:20-23; packages/container/config/webpack.dev.js:20-24), and each remote exposes its `./src/bootstrap` with `filename: "remoteEntry.js"` (for example marketing/config/webpack.dev.js:19-23).

Integration follows the same design in both trees. For each remote, container has a React wrapper importing `mount` from the exposed module and calling it on a `div` (container/src/components/MarketingApp.js:1, 13-18); wrappers enter through `lazy` and connect to routes in container's `BrowserRouter`: `/auth/*` for auth and `/*` for marketing (container/src/App.js:35-45), plus `/dashboard`, only with login, in the `packages/` copy (packages/container/src/App.js:33-35). Each remote defines `mount` and exports it (auth/src/bootstrap.js:7-32, 46).

What did not become a relationship: callbacks exchanged in `mount`. Container passes `onNavigate` and `initialPath` (and `onSignIn` for auth) and stores the returned `onParentNavigate`, synchronizing browser history with remote memory history (container/src/components/AuthApp.js:12-27; auth/src/bootstrap.js:8-31); dashboard receives only the element (packages/container/src/components/DashboardApp.js:8; packages/dashboard/src/bootstrap.js:5-8). These exchanges were not recorded as constructs in 3.4.4 and do not appear as `communication`. At the root, the `/dashboard` route and `dashboard` remote are commented out (container/src/App.js:16, 40-43; container/config/webpack.prod.js:20), and root `dashboard/` has only `package.json`, without a unit or code. The `import('./bootstrap')` calls in each `src/index.js` and each remote's isolated development execution mode (marketing/src/bootstrap.js:33-38) are internal to each unit. Containers and remotes share `packageJson.dependencies`; in the `packages/` copy, React, ReactDOM and React Router are `singleton` (packages/container/config/webpack.dev.js:25-39; packages/marketing/config/webpack.dev.js:25-39).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | auth | host → remote | source → target | module-federation | Yes | Yes | container/config/webpack.dev.js:22 (remote `auth` at `http://localhost:8082/remoteEntry.js`); container/config/webpack.prod.js:19 (remote `auth` at `${domain}/auth/latest/remoteEntry.js`); auth/config/webpack.dev.js:19-23 (`name: "auth"`, `filename: "remoteEntry.js"`, exposes `./AuthApp`); auth/config/webpack.dev.js:9 (`publicPath` `http://localhost:8082/`); auth/config/webpack.prod.js:10 (`publicPath` `/auth/latest/`); auth/config/webpack.prod.js:14-17 (`name: "auth"`, `filename: "remoteEntry.js"`, exposes `./AuthApp`) | auth/src/bootstrap.js:46; container/src/components/AuthApp.js:12; container/src/components/AuthApp.js:1; container/src/App.js:35 |
| 2 | container | marketing | host → remote | source → target | module-federation | Yes | Yes | container/config/webpack.dev.js:21 (remote `marketing` at `http://localhost:8081/remoteEntry.js`); container/config/webpack.prod.js:18 (remote `marketing` at `${domain}/marketing/latest/remoteEntry.js`); marketing/config/webpack.dev.js:19-23 (`name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`); marketing/config/webpack.dev.js:9 (`publicPath` `http://localhost:8081/`); marketing/config/webpack.prod.js:10 (`publicPath` `/marketing/latest/`); marketing/config/webpack.prod.js:14-17 (`name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`) | marketing/src/bootstrap.js:41; container/src/components/MarketingApp.js:13; container/src/components/MarketingApp.js:1; container/src/App.js:35 |
| 3 | packages/container | packages/auth | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:22 (remote `auth` at `http://localhost:8082/remoteEntry.js`); packages/container/config/webpack.prod.js:19 (remote `auth` at `${domain}/auth/latest/remoteEntry.js`); packages/auth/config/webpack.dev.js:20-24 (`name: 'auth'`, `filename: 'remoteEntry.js'`, exposes `./AuthApp`); packages/auth/config/webpack.dev.js:10 (`publicPath` `http://localhost:8082/`); packages/auth/config/webpack.prod.js:10 (`publicPath` `/auth/latest/`); packages/auth/config/webpack.prod.js:14-17 (`name: 'auth'`, `filename: 'remoteEntry.js'`, exposes `./AuthApp`) | packages/auth/src/bootstrap.js:46; packages/container/src/components/AuthApp.js:13; packages/container/src/components/AuthApp.js:1; packages/container/src/App.js:29 |
| 4 | packages/container | packages/dashboard | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:23 (remote `dashboard` at `http://localhost:8083/remoteEntry.js`); packages/container/config/webpack.prod.js:20 (remote `dashboard` at `${domain}/dashboard/latest/remoteEntry.js`); packages/dashboard/config/webpack.dev.js:23-27 (`name: 'dashboard'`, `filename: 'remoteEntry.js'`, exposes `./DashboardApp`); packages/dashboard/config/webpack.dev.js:10 (`publicPath` `http://localhost:8083/`); packages/dashboard/config/webpack.prod.js:10 (`publicPath` `/dashboard/latest/`); packages/dashboard/config/webpack.prod.js:14-17 (`name: 'dashboard'`, `filename: 'remoteEntry.js'`, exposes `./DashboardApp`) | packages/dashboard/src/bootstrap.js:22; packages/container/src/components/DashboardApp.js:8; packages/container/src/components/DashboardApp.js:1; packages/container/src/App.js:29 |
| 5 | packages/container | packages/marketing | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:21 (remote `marketing` at `http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:18 (remote `marketing` at `${domain}/marketing/latest/remoteEntry.js`); packages/marketing/config/webpack.dev.js:20-24 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, exposes `./MarketingApp`); packages/marketing/config/webpack.dev.js:10 (`publicPath` `http://localhost:8081/`); packages/marketing/config/webpack.prod.js:10 (`publicPath` `/marketing/latest/`); packages/marketing/config/webpack.prod.js:14-17 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, exposes `./MarketingApp`) | packages/marketing/src/bootstrap.js:46; packages/container/src/components/MarketingApp.js:13; packages/container/src/components/MarketingApp.js:1; packages/container/src/App.js:29 |

## Observations

**1. container → auth.** Container's `auth` remote matches the unit through `name: "auth"`, `remoteEntry.js` and `publicPath` `/auth/latest/` (auth/config/webpack.prod.js:10-17); port 8082 only corroborates. The same name and `publicPath` exist in packages/auth (packages/auth/config/webpack.prod.js:10-17), so configuration alone does not distinguish the copies. The target was taken as root auth, as in the source code review (note on both copies), because the workflow publishes it under `auth/latest`, the production remote path (.github/workflows/auth.yml:8, 23; container/config/webpack.prod.js:19). The relationship is active: the wrapper imports `mount` from `auth/AuthApp` (container/src/components/AuthApp.js:1) and calls it on mounting (container/src/components/AuthApp.js:12-18), and the wrapper enters route `/auth/*` (container/src/App.js:36-39).

**2. container → marketing.** Resolved as in relationship 1: `name: "marketing"`, `remoteEntry.js` and `publicPath` `/marketing/latest/` (marketing/config/webpack.prod.js:10-17), with port 8081 only corroborating; the production path is published by the `marketing/**` workflow (.github/workflows/marketing.yml:8, 23). The wrapper imports and calls `mount` (container/src/components/MarketingApp.js:1, 13-18) and connects to route `/*` (container/src/App.js:44), so the relationship is active and is container's default page.

**3. packages/container → packages/auth.** Remote `auth` matches packages/auth through `name`, `remoteEntry.js` and `publicPath` `/auth/latest/` (packages/auth/config/webpack.prod.js:10-17). The same match applies to root auth; the target was taken from the same copy, as in the source code review. In either case the target is in the snapshot. Mounting is active (packages/container/src/components/AuthApp.js:1, 13-19), on route `/auth/*` (packages/container/src/App.js:30-32).

**4. packages/container → packages/dashboard.** This is the only relationship without copy ambiguity: only packages/dashboard declares `name: 'dashboard'` with `exposes` `./DashboardApp` (packages/dashboard/config/webpack.prod.js:14-17), and `publicPath` `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:10) matches the production remote (packages/container/config/webpack.prod.js:20). Container passes only the element to `mount` (packages/container/src/components/DashboardApp.js:8), without callbacks; dashboard is Vue and mounts its component with `createApp` (packages/dashboard/src/bootstrap.js:5-8). Route `/dashboard` renders the wrapper only with login and redirects to `/` without it (packages/container/src/App.js:33-35); the relationship is active because loading and mounting are in the code.

**5. packages/container → packages/marketing.** Resolved as in relationship 3, through `name`, `remoteEntry.js` and `publicPath` `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10-17), in the same copy. Mounting is active (packages/container/src/components/MarketingApp.js:1, 13-18), at route `/*` (packages/container/src/App.js:36).

## Summary

Relationships: 5 (host → remote: 5). Active: 5. Target outside the snapshot: 0.
Units without a relationship: none.


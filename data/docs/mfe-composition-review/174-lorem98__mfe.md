---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
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

# 174 — lorem98/mfe

## Repository overview

A Module Federation (webpack 5) proof of concept in a monorepo without a workspace: `packages/container` is the React shell and `packages/marketing`, `packages/auth` (React) and `packages/dashboard` (Vue 3) are remotes. The container declares all three remotes in `ModuleFederationPlugin`, with `remoteEntry.js` on localhost:8081-8083 in development (packages/container/config/webpack.dev.js:17-21) or at `${domain}/<pacote>/latest/remoteEntry.js` (English translation of the path placeholder: package) in production (packages/container/config/webpack.prod.js:6, 17-21). Each remote exposes a single module, its own `./src/bootstrap`, exporting a `mount(el, opções)` function (English translation: mount with an element and options) (for example packages/auth/config/webpack.prod.js:15-20 and packages/auth/src/bootstrap.js:22, 57). In the container, one React wrapper per remote imports `mount` and calls it on a `div` (packages/container/src/components/AuthApp.js:1, 26), and App's `Switch` places each wrapper on a route: auth at `/auth`, dashboard at `/dashboard` only when `signedIn`, marketing at `/` (packages/container/src/App.js:25-44). Integration uses a function, independent of framework: the Vue dashboard enters React without an interop library (packages/container/src/components/DashboardApp.js:11-13, 21; packages/dashboard/src/bootstrap.js:12-14). All three relationships have the same form.

What did not become a relationship: callbacks passed in `mount` do not form a `communication` relationship, following the source code review note. The container passes `onNavigate` and receives `onParentNavigate` to synchronize browser history with the remote's memory history (packages/container/src/components/MarketingApp.js:10-22; packages/container/src/components/AuthApp.js:26-38; packages/marketing/src/bootstrap.js:13-29); auth also receives `onSignIn` and `initialPath` (packages/container/src/components/AuthApp.js:27-28), calls `onSignIn` after login or registration (packages/auth/src/components/Signin.js:57-58), and the container uses this signal to unlock `/dashboard` (packages/container/src/App.js:28, 33). In dashboard, `onParentNavigate` is an empty placeholder (packages/dashboard/src/bootstrap.js:19) and the container does not use the return from `mount` (packages/container/src/components/DashboardApp.js:21). All four `import("./bootstrap")` calls (for example packages/container/src/index.js:1) are internal to each unit, as is each remote's isolated development execution mode (packages/marketing/src/bootstrap.js:34-41). The React remotes share `packageJson.dependencies` (packages/marketing/config/webpack.prod.js:19); dashboard shares only `vue` as a singleton (packages/dashboard/config/webpack.prod.js:21-26), unused by the container. There is no `customElements`, `iframe`, `postMessage`, `CustomEvent` or `BroadcastChannel`, according to the source code review.

Each package has its own production `publicPath` (`/container/latest/`, `/marketing/latest/`, `/auth/latest/`, `/dashboard/latest/`; for example packages/container/config/webpack.prod.js:12) and its own workflow synchronizing `dist` to `s3://…/<pacote>/latest` (English translation of the path placeholder: package) (for example .github/workflows/auth.yml:26), matching the container's remote URLs. Deployment itself is addressed in 3.4.6.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/auth | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:19 (remote `auth@http://localhost:8082/remoteEntry.js`); packages/container/config/webpack.prod.js:19 (remote `auth@${domain}/auth/latest/remoteEntry.js`); packages/auth/config/webpack.dev.js:9 (port 8082); packages/auth/config/webpack.dev.js:16-21 (`name: "auth"`, `filename: "remoteEntry.js"`, exposes `./AuthApp`); packages/auth/config/webpack.prod.js:12 (`publicPath: "/auth/latest/"`); packages/auth/config/webpack.prod.js:16-20 (`name: "auth"`, `filename: "remoteEntry.js"`, exposes `./AuthApp`) | packages/auth/src/bootstrap.js:57; packages/container/src/components/AuthApp.js:26; packages/container/src/components/AuthApp.js:1; packages/container/src/App.js:25 |
| 2 | packages/container | packages/dashboard | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:20 (remote `dashboard@http://localhost:8083/remoteEntry.js`); packages/container/config/webpack.prod.js:20 (remote `dashboard@${domain}/dashboard/latest/remoteEntry.js`); packages/dashboard/config/webpack.dev.js:10 (port 8083); packages/dashboard/config/webpack.dev.js:17-22 (`name: "dashboard"`, `filename: "remoteEntry.js"`, exposes `./DashboardApp`); packages/dashboard/config/webpack.prod.js:12 (`publicPath: "/dashboard/latest/"`); packages/dashboard/config/webpack.prod.js:16-20 (`name: "dashboard"`, `filename: "remoteEntry.js"`, exposes `./DashboardApp`) | packages/dashboard/src/bootstrap.js:36; packages/container/src/components/DashboardApp.js:21; packages/container/src/components/DashboardApp.js:1; packages/container/src/App.js:25 |
| 3 | packages/container | packages/marketing | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:18 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:18 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); packages/marketing/config/webpack.dev.js:10 (port 8081); packages/marketing/config/webpack.dev.js:17-21 (`name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`); packages/marketing/config/webpack.prod.js:10 (`publicPath: "/marketing/latest/"`); packages/marketing/config/webpack.prod.js:14-18 (`name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`) | packages/marketing/src/bootstrap.js:46; packages/container/src/components/MarketingApp.js:10; packages/container/src/components/MarketingApp.js:1; packages/container/src/App.js:25 |

## Observations

**1. packages/container → packages/auth.** The container's `auth` remote (packages/container/config/webpack.dev.js:19; packages/container/config/webpack.prod.js:19) matches the unit through `name: "auth"` and the exposed `./AuthApp` (packages/auth/config/webpack.dev.js:16-20; packages/auth/config/webpack.prod.js:16-19), the module imported in packages/container/src/components/AuthApp.js:1; in production, the URL's `/auth/latest/` path matches auth's `publicPath` (packages/auth/config/webpack.prod.js:12), and port 8082 only corroborates. The relationship is active: the wrapper calls `mount` (packages/container/src/components/AuthApp.js:26), exported in packages/auth/src/bootstrap.js:57, and is rendered on the `/auth` route (packages/container/src/App.js:27-29). It is the only relationship where the remote returns a state signal to the host (`onSignIn`, packages/container/src/App.js:28), addressed in the overview as a callback rather than its own relationship. The comment line packages/auth/config/webpack.dev.js:19 (Composition `No` in the source code review) does not enter the Code column.

**2. packages/container → packages/dashboard.** Remote `dashboard` (packages/container/config/webpack.dev.js:20; packages/container/config/webpack.prod.js:20), resolved through `name: "dashboard"` and `./DashboardApp` (packages/dashboard/config/webpack.dev.js:17-21; packages/dashboard/config/webpack.prod.js:16-19) and `publicPath` `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:12). The wrapper imports and calls `mount` (packages/container/src/components/DashboardApp.js:1, 21), and the `/dashboard` route renders it only with `signedIn`, otherwise redirecting to `/auth/signin` (packages/container/src/App.js:32-38). The target is Vue 3: `mount` creates and mounts a Vue application on the received element (packages/dashboard/src/bootstrap.js:12-14); that `app.mount(el)` is internal to the unit (Composition `No` in the source code review). There is no navigation or callback exchange in this relationship. Dashboard's `shared` declares `vue` as a singleton and does not include React (packages/dashboard/config/webpack.prod.js:21-26); this does not change the relationship.

**3. packages/container → packages/marketing.** Remote `marketing` (packages/container/config/webpack.dev.js:18; packages/container/config/webpack.prod.js:18), resolved through `name: "marketing"` and `./MarketingApp` (packages/marketing/config/webpack.dev.js:17-20; packages/marketing/config/webpack.prod.js:14-17) and `publicPath` `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10). The wrapper imports `mount`, calls it with `onNavigate` and registers the returned `onParentNavigate` in container history (packages/container/src/components/MarketingApp.js:1, 10-22); it is rendered at `/`, the last route in `Switch` (packages/container/src/App.js:41-43), receiving every path not previously captured.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


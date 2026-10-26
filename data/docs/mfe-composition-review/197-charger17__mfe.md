---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
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

# 197 — charger17/mfe

## Repository overview

An example with four webpack 5 packages in `packages/`, joined by Module Federation (webpack's own `ModuleFederationPlugin`). `container` is the React host: it declares remotes `marketing`, `auth` and `dashboard`, through `localhost:8081-8083` in development (packages/container/config/webpack.dev.js:20-24) and `${domain}/<nome>/latest/remoteEntry.js` in production (English translation of the path placeholder: name) (packages/container/config/webpack.prod.js:17-21), with `domain` from `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6), injected by the deploy workflow from a secret (.github/workflows/container.yml:29-32). Each remote exposes a single module, its own `src/bootstrap`, exporting a `mount(el, …)` function. Two remotes are React (`auth`, `marketing`) and one Vue 3 (`dashboard`, packages/dashboard/src/bootstrap.js:1-7), so the host does not render remote components: it imports `mount` and calls it on its own `div`.

Container loads each wrapper through `lazy` (packages/container/src/App.js:11-13) and distributes them by route in `Switch` (packages/container/src/App.js:42-55): `/auth` for auth, `/dashboard` for dashboard (redirecting to `/` without login, packages/container/src/App.js:46-51) and `/` for marketing. Host-remote coordination uses callbacks passed in `mount`, which do not become relationships: the host passes `initialPath` and `onNavigate` and receives `onParentNavigate`, registered in `history.listen` (packages/container/src/components/AuthApp.js:10-24; packages/container/src/components/MarketingApp.js:10-20), and React remotes use `createMemoryHistory` when mounted by the host (packages/auth/src/bootstrap.js:7-9; packages/marketing/src/bootstrap.js:7-9). Auth also receives `onSignIn`, reaching login and registration buttons (packages/auth/src/App.js:21-26; packages/auth/src/components/Signin.js:102; packages/auth/src/components/Signup.js:127) and changing host state `isSignedIn` (packages/container/src/App.js:22-30, 44). The `isSignedIn` passed to `MarketingLazy` (packages/container/src/App.js:53) does not reach the remote, because the wrapper receives no props (packages/container/src/components/MarketingApp.js:5).

Each remote also runs independently in development, mounting on an element `#_<nome>-dev-root` (English translation of the placeholder: name) (packages/auth/src/bootstrap.js:27-33; packages/dashboard/src/bootstrap.js:9-15; packages/marketing/src/bootstrap.js:28-34); these isolated mounts are not relationships. There are no custom elements, iframes or inter-unit message exchanges. No README describes the purpose; the classification records the repository as `example`.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/auth | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:22 (remote `auth@http://localhost:8082/remoteEntry.js`); packages/container/config/webpack.prod.js:19 (remote `auth@${domain}/auth/latest/remoteEntry.js`); packages/auth/config/webpack.dev.js:20-24 (`name: 'auth'`, `filename: 'remoteEntry.js'`, exposes `./AuthApp`); packages/auth/config/webpack.dev.js:10 (`publicPath: 'http://localhost:8082/'`); packages/auth/config/webpack.dev.js:13 (port 8082); packages/auth/config/webpack.prod.js:14-18 (`name: 'auth'`, `filename: 'remoteEntry.js'`, exposes `./AuthApp`); packages/auth/config/webpack.prod.js:10 (`publicPath: '/auth/latest/'`) | packages/auth/src/bootstrap.js:35; packages/container/src/components/AuthApp.js:10; packages/container/src/components/AuthApp.js:1; packages/container/src/App.js:42 |
| 2 | packages/container | packages/dashboard | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:23 (remote `dashboard@http://localhost:8083/remoteEntry.js`); packages/container/config/webpack.prod.js:20 (remote `dashboard@${domain}/dashboard/latest/remoteEntry.js`); packages/dashboard/config/webpack.dev.js:23-27 (`name: 'dashboard'`, `filename: 'remoteEntry.js'`, exposes `./DashboardApp`); packages/dashboard/config/webpack.dev.js:10 (`publicPath: 'http://localhost:8083/'`); packages/dashboard/config/webpack.dev.js:13 (port 8083); packages/dashboard/config/webpack.prod.js:14-18 (`name: 'dashboard'`, `filename: 'remoteEntry.js'`, exposes `./DashboardApp`); packages/dashboard/config/webpack.prod.js:10 (`publicPath: '/dashboard/latest/'`) | packages/dashboard/src/bootstrap.js:17; packages/container/src/components/DashboardApp.js:8; packages/container/src/components/DashboardApp.js:1; packages/container/src/App.js:42 |
| 3 | packages/container | packages/marketing | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:21 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:18 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); packages/marketing/config/webpack.dev.js:20-24 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, exposes `./MarketingApp`); packages/marketing/config/webpack.dev.js:10 (`publicPath: 'http://localhost:8081/'`); packages/marketing/config/webpack.dev.js:13 (port 8081); packages/marketing/config/webpack.prod.js:14-18 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, exposes `./MarketingApp`); packages/marketing/config/webpack.prod.js:10 (`publicPath: '/marketing/latest/'`) | packages/marketing/src/bootstrap.js:36; packages/container/src/components/MarketingApp.js:10; packages/container/src/components/MarketingApp.js:1; packages/container/src/App.js:42 |

## Observations

**1. packages/container → packages/auth.** Container's `auth` remote matches the packages/auth unit through `name: 'auth'` and `filename: 'remoteEntry.js'` (packages/auth/config/webpack.dev.js:20-21; packages/auth/config/webpack.prod.js:14-15), through the development `publicPath` equaling the remote URL (packages/auth/config/webpack.dev.js:10), and production `publicPath: '/auth/latest/'`, the remote path in packages/container/config/webpack.prod.js:19; port 8082 only corroborates. Container imports `mount` from `auth/AuthApp` (packages/container/src/components/AuthApp.js:1), the exposed `./AuthApp`, and calls it on the wrapper `ref` (packages/container/src/components/AuthApp.js:10), rendered at `/auth` (packages/container/src/App.js:43-45). Through the `Yes` lines, the relationship is active. The packages/container/src/App.js:42 line also supports relationships 2 and 3.

**2. packages/container → packages/dashboard.** The target was resolved through `name: 'dashboard'` and `filename` (packages/dashboard/config/webpack.dev.js:23-24; packages/dashboard/config/webpack.prod.js:14-15), development `publicPath` (packages/dashboard/config/webpack.dev.js:10) and production `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:10), matching packages/container/config/webpack.prod.js:20. The remote is Vue 3 inside a React host: the exported `mount(el)` creates the Vue app on the received element (packages/dashboard/src/bootstrap.js:4-7, 17), and the container wrapper calls it without options (packages/container/src/components/DashboardApp.js:8), without navigation callbacks. Only dashboard remote enables CORS on the development server (packages/dashboard/config/webpack.dev.js:17-19). Route `/dashboard` redirects to `/` without login (packages/container/src/App.js:46-51), conditioning when the remote appears, but not the active relationship.

**3. packages/container → packages/marketing.** The target was resolved through `name: 'marketing'` and `filename` (packages/marketing/config/webpack.dev.js:20-21; packages/marketing/config/webpack.prod.js:14-15), development `publicPath` (packages/marketing/config/webpack.dev.js:10) and production `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10), matching packages/container/config/webpack.prod.js:18. Container imports `mount` from `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:1) and calls it with `initialPath` and `onNavigate` (packages/container/src/components/MarketingApp.js:10-18); the wrapper is rendered at `/`, the default `Switch` route (packages/container/src/App.js:52-54). The relationship is active.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


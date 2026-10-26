---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
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

# 046 — pgarr/microfrontend-template

## Repository overview

A template with the same architecture as repository 017: a React `container` and three remotes, `auth` and `marketing` in React and `dashboard` in Vue, using webpack 5's native Module Federation. Each remote exposes a `mount` function (e.g.: auth/src/bootstrap.js:46), and the container calls it in wrappers loaded *lazily* by the routes (container/src/App.js:29-36).

In auth and marketing, `mount(el, opções)` (English translation: mount with an element and options) synchronizes navigation: the container passes `onNavigate` and `onSignIn` and receives `onParentNavigate` (container/src/components/AuthApp.js:13-29; container/src/components/MarketingApp.js:13-28), and these remotes use memory history when mounted by the container (auth/src/bootstrap.js:7-11). Dashboard defines only `mount(el)`, without history or options (dashboard/src/bootstrap.js:5-8), and the container passes only the element (container/src/components/DashboardApp.js:8).

The container also controls when dashboard appears: it stores `isSignedIn`, which the auth login callback enables before navigating to `/dashboard` (container/src/App.js:13-18), and on that route it renders dashboard only when logged in; otherwise it redirects to `/` (container/src/App.js:33-35). These callback exchanges did not become constructs in the source code review (protocol section 3.4.4), so they do not appear as `communication`.

In production, each application publishes under `/<app>/latest/` (e.g.: auth/config/webpack.prod.js:10), and the container looks up remotes on the `PRODUCTION_DOMAIN` domain (container/config/webpack.prod.js:6, 17-20): independent deployment per unit, on the same domain. As a template, its screen contents are generic; the value lies in the structure.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | auth | host → remote | source → target | module-federation | Yes | Yes | container/config/webpack.prod.js:17, 19 (remote `auth@${domain}/auth/latest/remoteEntry.js`); container/config/webpack.dev.js:20, 22 (remote `auth@http://localhost:8082/remoteEntry.js`); auth/config/webpack.prod.js:10-17 (`publicPath: '/auth/latest/'`, `name: 'auth'`, `filename: 'remoteEntry.js'`, exposes `./AuthApp`) | auth/src/bootstrap.js:46; container/src/components/AuthApp.js:13; container/src/components/AuthApp.js:1; container/src/App.js:29 |
| 2 | container | dashboard | host → remote | source → target | module-federation | Yes | Yes | container/config/webpack.prod.js:17, 20 (remote `dashboard@${domain}/dashboard/latest/remoteEntry.js`); container/config/webpack.dev.js:20, 23 (remote `dashboard@http://localhost:8083/remoteEntry.js`); dashboard/config/webpack.prod.js:10-17 (`publicPath: '/dashboard/latest/'`, `name: 'dashboard'`, `filename: 'remoteEntry.js'`, exposes `./DashboardApp`) | dashboard/src/bootstrap.js:22; container/src/components/DashboardApp.js:8; container/src/components/DashboardApp.js:1; container/src/App.js:29 |
| 3 | container | marketing | host → remote | source → target | module-federation | Yes | Yes | container/config/webpack.prod.js:17-18 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); container/config/webpack.dev.js:20-21 (remote `marketing@http://localhost:8081/remoteEntry.js`); marketing/config/webpack.prod.js:10-17 (`publicPath: '/marketing/latest/'`, `name: 'marketing'`, `filename: 'remoteEntry.js'`, exposes `./MarketingApp`) | marketing/src/bootstrap.js:46; container/src/components/MarketingApp.js:13; container/src/components/MarketingApp.js:1; container/src/App.js:29 |

## Observations

**1. container → auth.** The container imports `mount` from `auth/AuthApp` and calls it in the wrapper (container/src/components/AuthApp.js:1, 13). The name, module and `/auth/latest/` path match auth/config/webpack.prod.js:10-17.

**2. container → dashboard.** The same pattern with `dashboard/DashboardApp` (container/src/components/DashboardApp.js:1, 8). The name, module and path match dashboard/config/webpack.prod.js:10-17. Vue's `app.mount` inside the remote is internal to the unit.

**3. container → marketing.** The same pattern with `marketing/MarketingApp` (container/src/components/MarketingApp.js:1, 13). The name, module and path match marketing/config/webpack.prod.js:10-17.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


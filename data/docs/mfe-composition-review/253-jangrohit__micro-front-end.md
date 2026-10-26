---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Repository overview

A micro-frontends example with webpack 5's native Module Federation (README.md:3). The host is `packages/container`, in React, and its only connected remote is `packages/marketing`, also React, with Landing and Pricing pages (README.md:10-14). Marketing exposes `./MarketingApp` from its `src/bootstrap` (packages/marketing/config/webpack.prod.js:19-24), exporting a `mount(el)` function rendering marketing's `App` on the received element (packages/marketing/src/bootstrap.js:5-7, 17). Container imports this function and calls it in a wrapper component (packages/container/src/components/MarketingApp.js:3, 9), rendered directly in the host's `App`, without a selecting route (packages/container/src/App.js:19).

The contract is only the element: container passes neither callbacks nor history, and the remote returns nothing (packages/container/src/components/MarketingApp.js:9). There is no inter-unit message exchange. In development, marketing also mounts itself independently at `#_marketing-dev-root` (packages/marketing/src/bootstrap.js:9-13), an isolated mount of the unit itself, not composition.

In the production build, each application publishes under `/<app>/latest/` (packages/container/config/webpack.prod.js:10; packages/marketing/config/webpack.prod.js:10), and container fetches the remote on a domain from `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:5, 22). Together with the per-application workflows identified in the structural review, this points to independent deployment of both units on the same domain.

`packages/auth` and `packages/dashboard` have only `package.json` and lockfiles; they are `No` in the structural review, container declares no remote for them (packages/container/config/webpack.prod.js:21-23), and the README says they are not connected to the host (README.md:47-48). Hence they enter no relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/marketing | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.prod.js:21-22 (remote `marketing@${domain}/marketing/latest/remoteEntry.js`); packages/container/config/webpack.dev.js:16-17 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/marketing/config/webpack.prod.js:10, 20-23 (`publicPath: "/marketing/latest/"`, `name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`); packages/marketing/config/webpack.dev.js:9, 16-19 (port 8081, `name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`) | packages/marketing/src/bootstrap.js:17; packages/container/src/components/MarketingApp.js:9; packages/container/src/components/MarketingApp.js:3 |

## Observations

**1. packages/container → packages/marketing.** Container imports `mount` from `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:3) and calls it with the wrapper's `div` (packages/container/src/components/MarketingApp.js:9). The target was resolved through remote name and exposed module: `name: "marketing"` and `./MarketingApp` in packages/marketing/config/webpack.prod.js:20-23, with path `/marketing/latest/` equaling marketing's `publicPath` (packages/marketing/config/webpack.prod.js:10). In development, the remote's `localhost:8081` URL (packages/container/config/webpack.dev.js:17) matches marketing's devServer port (packages/marketing/config/webpack.dev.js:9), but the match comes from the name. The relationship is active: the wrapper is rendered in packages/container/src/App.js:19, `App` starts in packages/container/src/bootstrap.js:5 and bootstrap is loaded by packages/container/src/index.js:1.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.


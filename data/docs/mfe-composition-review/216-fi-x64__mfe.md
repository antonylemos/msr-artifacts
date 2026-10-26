---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
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

# 216 — fi-x64/mfe

## Repository overview

An early-stage example from a course sequence with webpack 5 and Module Federation in `packages/`. There are two React applications: `container`, the host, and `marketing`, the remote. Marketing exposes its own bootstrap as `./MarketingApp`, under `name: "marketing"` and `filename: "remoteEntry.js"` (packages/marketing/config/webpack.dev.js:16-21; packages/marketing/config/webpack.prod.js:13-18). This bootstrap exports a `mount(el)` function rendering marketing's App on the received element (packages/marketing/src/bootstrap.js:6-8, 22). Container declares remote `marketing` (packages/container/config/webpack.dev.js:18-20; packages/container/config/webpack.prod.js:17-19), imports `mount` in a wrapper component and calls it on its own `div` inside `useEffect` (packages/container/src/components/MarketingApp.js:1-11). The wrapper is always rendered, immediately below `Header`, without routes separating units (packages/container/src/App.js:10-11).

Integration depends only on `mount`. Container passes no props, callbacks or history to the remote (packages/container/src/components/MarketingApp.js:8), and `Header` accepts `signedIn` and `onSignOut` (packages/container/src/components/Header.js:57), which container does not supply (packages/container/src/App.js:10). No inter-unit communication appears. Marketing also runs independently in development, mounting itself at `#_marketing-dev-root` (packages/marketing/src/bootstrap.js:12-17; packages/marketing/public/index.html:5); this is not a relationship. In production, the remote is sought at `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`, a path matching marketing's `publicPath` (packages/marketing/config/webpack.prod.js:10) and the S3 deploy target (.github/workflows/marketing.yml:24). `packages/auth` and `packages/dashboard` have only `package.json` and lockfiles, are not units and appear in no composition configuration.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/container | packages/marketing | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:18-20 (remote `marketing` at `http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:17-19 (remote `marketing` at `${domain}/marketing/latest/remoteEntry.js`); packages/marketing/config/webpack.dev.js:17-21 (`name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`); packages/marketing/config/webpack.prod.js:10 (`publicPath: "/marketing/latest/"`); packages/marketing/config/webpack.prod.js:14-18 (`name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`); packages/marketing/config/webpack.dev.js:10 (port 8081) | packages/marketing/src/bootstrap.js:22; packages/container/src/components/MarketingApp.js:8; packages/container/src/components/MarketingApp.js:1 |

## Observations

**1. packages/container → packages/marketing.** Container's `marketing` remote matches unit `packages/marketing` through `name` and `remoteEntry.js` in its `ModuleFederationPlugin` (packages/marketing/config/webpack.dev.js:17-18; packages/marketing/config/webpack.prod.js:14-15). In production, path `/marketing/latest/` also matches `publicPath` (packages/marketing/config/webpack.prod.js:10); in development, port 8081 (packages/marketing/config/webpack.dev.js:10) only corroborates. The imported module, `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:1), is the exposed `./MarketingApp`, pointing to `./src/bootstrap` (packages/marketing/config/webpack.dev.js:20; packages/marketing/config/webpack.prod.js:17). The relationship is active: all three source code review lines are `Yes`, and the wrapper calling `mount` is rendered unconditionally by container's App (packages/container/src/App.js:11), loaded by the entry point (packages/container/src/index.js:1; packages/container/src/bootstrap.js:5). The production domain comes from `process.env.PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6), supplied by a secret during the workflow build (.github/workflows/container.yml:21-23); its value is absent from the snapshot, but the target is resolved by name and path.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.


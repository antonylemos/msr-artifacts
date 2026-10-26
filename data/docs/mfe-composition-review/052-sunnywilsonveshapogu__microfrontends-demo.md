---
schema: 1
id: 1065269096
full_name: sunnywilsonveshapogu/microfrontends-demo
commit: f56f903190312e938d0ad5a9a146ad4dbe333589
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

# 052 — sunnywilsonveshapogu/microfrontends-demo

## Repository overview

A demonstration with a React `shell` and two remotes, `header-mf` and `products-mf`, linked by webpack 5's native Module Federation. The shell assembles the page with one remote's header and the other's product list, each loaded through `import()` with failure handling and rendered in `Suspense` (shell/src/App.js:3-34). All three applications share `react` and `react-dom` as singletons (e.g.: header-mf/webpack.config.js:28-43).

Distinctive feature: all three units are Undetermined in the structural review because the `public/index.html` required by the build is absent from the snapshot (e.g.: shell/webpack.config.js:40). The snapshot does not compile as it stands, but the composition code is complete and connected to the entry points.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | header-mf | host → remote | source → target | module-federation | Yes | Yes | shell/webpack.config.js:23-25 (remote `headerMf@http://localhost:3001/remoteEntry.js`); header-mf/webpack.config.js:23-26 (`name: 'headerMf'`, `filename: 'remoteEntry.js'`, exposes `./Header`); header-mf/webpack.config.js:7 (port 3001) | shell/src/App.js:5; shell/src/App.js:25 |
| 2 | shell | products-mf | host → remote | source → target | module-federation | Yes | Yes | shell/webpack.config.js:23-24, 26 (remote `productsMf@http://localhost:3002/remoteEntry.js`); products-mf/webpack.config.js:23-26 (`name: 'productsMf'`, `filename: 'remoteEntry.js'`, exposes `./Products`); products-mf/webpack.config.js:7 (port 3002) | shell/src/App.js:13; shell/src/App.js:33 |

## Observations

**1. shell → header-mf.** The shell imports `headerMf/Header` (shell/src/App.js:3-9) and renders it in `Suspense` (shell/src/App.js:24-26). The name `headerMf` and module `./Header` match header-mf/webpack.config.js:23-26; port 3001 only corroborates.

**2. shell → products-mf.** The same pattern with `productsMf/Products` (shell/src/App.js:11-17, 32-34). The name and module match products-mf/webpack.config.js:23-26; port 3002 only corroborates.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.


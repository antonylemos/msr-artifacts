---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
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

# 007 — Vishal-Kamra/Microfrontend-examples

## Repository overview

A study repository with two independent Module Federation examples, both using webpack 5's native plugin (hence the dependency review found no specific package):

- **simple-js:** a plain JavaScript `Container` and two remotes, `Products` and `Cart`, which expose `mount(el)` and are mounted on fixed page elements (simple-js/Container/src/bootstrap.js:1-5).
- **react-js:** a React `container` and the `marketing` remote. The `auth` and `dashboard` directories have only a manifest and lockfile, with no code, and do not participate in composition.

In both examples, the contract between units is the `mount` function exported by the remote, independent of framework. In the React example, federation exists only in the development configuration: `webpack.prod.js` is empty (structural review). The `mount` exported by the React container itself has no consumer.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | react-js/container | react-js/marketing | host → remote | source → target | module-federation | Yes | Yes | react-js/container/config/webpack.dev.js:19-23 (remote `marketing@http://localhost:8081/remoteEntry.js`); react-js/marketing/config/webpack.dev.js:19-23 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, exposes `./MarketingApp`); react-js/marketing/config/webpack.dev.js:10 (port 8081) | react-js/marketing/src/bootstrap.js:22; react-js/container/src/components/MarketingApp.js:9; react-js/container/src/components/MarketingApp.js:3 |
| 2 | simple-js/Container | simple-js/Cart | host → remote | source → target | module-federation | Yes | Yes | simple-js/Container/webpack.config.js:10-14 (remote `cart@http://localhost:8082/remoteEntry.js`); simple-js/Cart/webpack.config.js:10-15 (`name: 'cart'`, `filename: 'remoteEntry.js'`, exposes `./CartShow`); simple-js/Cart/webpack.config.js:7 (port 8082) | simple-js/Cart/src/bootstrap.js:3; simple-js/Container/src/bootstrap.js:2; simple-js/Container/src/bootstrap.js:5 |
| 3 | simple-js/Container | simple-js/Products | host → remote | source → target | module-federation | Yes | Yes | simple-js/Container/webpack.config.js:10-13 (remote `products@http://localhost:8081/remoteEntry.js`); simple-js/Products/webpack.config.js:10-15 (`name: 'products'`, `filename: 'remoteEntry.js'`, exposes `./ProductsIndex`); simple-js/Products/webpack.config.js:7 (port 8081) | simple-js/Products/src/bootstrap.js:3; simple-js/Container/src/bootstrap.js:1; simple-js/Container/src/bootstrap.js:4 |

## Observations

**1. react-js/container → react-js/marketing.** The container imports `mount` from `marketing/MarketingApp` (react-js/container/src/components/MarketingApp.js:3) and mounts the remote on the ref of a wrapper component (react-js/container/src/components/MarketingApp.js:8-10). The name and module match react-js/marketing/config/webpack.dev.js:20-23; port 8081 only corroborates.

**2. simple-js/Container → simple-js/Cart.** The container imports `mount` from `cart/CartShow` as `mountCart` and calls it on `#dev-cart` (simple-js/Container/src/bootstrap.js:2, 5). The name and module match simple-js/Cart/webpack.config.js:11-14; port 8082 only corroborates.

**3. simple-js/Container → simple-js/Products.** The same pattern with `products/ProductsIndex` as `mountProducts`, on `#dev-products` (simple-js/Container/src/bootstrap.js:1, 4). The name and module match simple-js/Products/webpack.config.js:11-14. Port 8081 is also used by react-js/marketing, but each applies within its own example.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


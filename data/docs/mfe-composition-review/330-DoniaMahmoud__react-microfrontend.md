---
schema: 1
id: 1147094315
full_name: DoniaMahmoud/react-microfrontend
commit: adc0ef9de42ce63b3082f8297d0146b59ac0d612
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

# 330 — DoniaMahmoud/react-microfrontend

## Repository overview

An educational Module Federation example in plain JavaScript, with three webpack applications: `container` is the host, and `products` and `cart` are remotes. The host declares both remotes by name and `remoteEntry.js` URL (container/webpack.config.js:12-15), imports each one's `mount` function (container/src/bootstrap.js:1-2) and calls it on two `div` elements in its page (container/src/bootstrap.js:6-7; container/public/index.html:5-6). The host bootstrap is loaded asynchronously (container/src/index.js:2), the usual pattern for webpack to resolve remotes before use.

Each remote exposes its `bootstrap` (products/webpack.config.js:13-15; cart/webpack.config.js:13-15), whose `mount(el)` function only writes HTML generated with `faker` into the received element (products/src/bootstrap.js:4-13; cart/src/bootstrap.js:3-6). Both remotes also run independently in development, mounting at `#dev-products`/`#dev-cart` when the element exists (products/src/bootstrap.js:17-25; cart/src/bootstrap.js:8-13); that mounting is internal to each unit and did not become a relationship. `faker` appears in `shared` in both remotes (products/webpack.config.js:16; cart/webpack.config.js:16), but is a shared dependency rather than composition. There is no message exchange between units or between both remotes, and only development mode exists (`mode: "development"` in all three configurations, line 5).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | cart | host → remote | source → target | module-federation | Yes | Yes | container/webpack.config.js:14 (remote `cart` at `cart@http://localhost:8082/remoteEntry.js`); cart/webpack.config.js:11-14 (`name: "cart"`, `filename: "remoteEntry.js"`, exposes `./CartShow`); cart/webpack.config.js:7 (port 8082) | cart/src/bootstrap.js:15; container/src/bootstrap.js:2; container/src/bootstrap.js:7 |
| 2 | container | products | host → remote | source → target | module-federation | Yes | Yes | container/webpack.config.js:13 (remote `products` at `products@http://localhost:8081/remoteEntry.js`); products/webpack.config.js:11-14 (`name: "products"`, `filename: "remoteEntry.js"`, exposes `./ProductsIndex`); products/webpack.config.js:7 (port 8081) | products/src/bootstrap.js:26; container/src/bootstrap.js:1; container/src/bootstrap.js:6 |

## Observations

**1. container → cart.** The host's remote `cart` matches unit cart through name and module: the host imports `cart/CartShow` (container/src/bootstrap.js:2), and cart declares `name: "cart"` and exposes `./CartShow` (cart/webpack.config.js:11-14); port 8082 only corroborates. The host mounts the cart at `#my-cart` (container/src/bootstrap.js:7; container/public/index.html:6), using `mount` exported in cart/src/bootstrap.js:15. All three code lines are `Yes` in the source code review, hence the relationship is active.

**2. container → products.** Same chain: the host imports `products/ProductsIndex` (container/src/bootstrap.js:1), and products declares `name: "products"` and exposes `./ProductsIndex` (products/webpack.config.js:11-14), with port 8081 (products/webpack.config.js:7). The host mounts the product list at `#my-products` (container/src/bootstrap.js:6; container/public/index.html:5), using `mount` exported in products/src/bootstrap.js:26. All three code lines are `Yes`, hence the relationship is active.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.


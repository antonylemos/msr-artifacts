---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
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

# 106 — alimohammadi/micro-frontend

## Repository overview

The source repository for a micro frontends course, with two independent Module Federation examples. Both use webpack 5's native plugin (`webpack/lib/container/ModuleFederationPlugin`, ecomm/container/webpack.config.js:2; packages/container/config/webpack.dev.js:3), hence the dependency review found no specific package.

- **ecomm:** a plain JavaScript `container` and two remotes, `products` and `cart`, generating HTML with `faker` and exposing `mount(el)`. The container imports both `mount` functions and calls them on its page's `#my-products` and `#my-cart` (ecomm/container/src/bootstrap.js:1-6; ecomm/container/public/index.html:9-10).
- **packages:** a React `container` and the `marketing` remote, also React. The container mounts Marketing in an adapter component with `useRef`/`useEffect` (packages/container/src/components/MarketingApp.js:1-11), rendered by the host App (packages/container/src/App.js:10). `packages/auth` and `packages/dashboard` have only manifests and lockfiles and do not participate in composition.

In both examples, the inter-unit contract is the remote's exported `mount(el)` function, independent of framework; each remote also mounts itself independently in development on its own element (`#dev-cart`, `#dev-products`, `#_marketing-dev-root`), internal to the unit. The examples do not connect to one another: ecomm/products and packages/marketing use the same port 8081 (ecomm/products/webpack.config.js:7; packages/marketing/config/webpack.dev.js:10), but each applies within its own example. Only the `packages` example has production federation configuration, with the remote pointing to `PRODUCTION_DOMAIN`, with no value in the snapshot (packages/container/config/webpack.prod.js:6,18).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ecomm/container | ecomm/cart | host → remote | source → target | module-federation | Yes | Yes | ecomm/container/webpack.config.js:20-23 (remote `carts` → `cart@http://localhost:8082/remoteEntry.js`); ecomm/cart/webpack.config.js:10-15 (`name: "cart"`, `filename: "remoteEntry.js"`, exposes `./CartShow`); ecomm/cart/webpack.config.js:7 (port 8082) | ecomm/cart/src/mount.js:26; ecomm/container/src/bootstrap.js:3; ecomm/container/src/bootstrap.js:6 |
| 2 | ecomm/container | ecomm/products | host → remote | source → target | module-federation | Yes | Yes | ecomm/container/webpack.config.js:20-21 (remote `products@http://localhost:8081/remoteEntry.js`); ecomm/products/webpack.config.js:10-15 (`name: "products"`, `filename: "remoteEntry.js"`, exposes `./ProductsIndex`); ecomm/products/webpack.config.js:7 (port 8081) | ecomm/products/src/mount.js:31; ecomm/container/src/bootstrap.js:1; ecomm/container/src/bootstrap.js:5 |
| 3 | packages/container | packages/marketing | host → remote | source → target | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:16-20 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:15-19 (remote `marketing@${domain}/marketing/remoteEntry.js`); packages/marketing/config/webpack.dev.js:17-22 (`name: "marketing"`, `filename: "remoteEntry.js"`, exposes `./MarketingApp`); packages/marketing/config/webpack.prod.js:12-17 (same `name`, `filename` and `exposes`); packages/marketing/config/webpack.dev.js:10 (port 8081) | packages/marketing/src/bootstrap.js:17; packages/container/src/components/MarketingApp.js:8; packages/container/src/components/MarketingApp.js:1 |

## Observations

**1. ecomm/container → ecomm/cart.** The container imports `mount` from `carts/CartShow` under alias `cartMount` (ecomm/container/src/bootstrap.js:3) and calls it on `#my-cart` (ecomm/container/src/bootstrap.js:6). The local remote name is `carts`, but its value points to container `cart` (ecomm/container/webpack.config.js:22), matching `name: "cart"` and the exposed module `./CartShow` → `./src/mount` in ecomm/cart/webpack.config.js:11-15; port 8082 only corroborates. The exported `mount` resides in ecomm/cart/src/mount.js:26.

**2. ecomm/container → ecomm/products.** The same pattern: `mount` from `products/ProductsIndex` as `productsMount` (ecomm/container/src/bootstrap.js:1), called on `#my-products` (ecomm/container/src/bootstrap.js:5). The target was resolved through `name: "products"` and exposure `./ProductsIndex` → `./src/mount.js` (ecomm/products/webpack.config.js:11-14); port 8081 only corroborates. The ecomm/products `package.json` declares `name` `container` (structural review), which does not interfere with federation, which uses the plugin's `name`.

**3. packages/container → packages/marketing.** The host adapter imports `mount` from `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:1) and calls it on the `ref` of its `div` (packages/container/src/components/MarketingApp.js:8-11). The target was resolved through `name: "marketing"` and exposure `./MarketingApp` → `./src/bootstrap` (packages/marketing/config/webpack.dev.js:18-22), exporting `mount` in packages/marketing/src/bootstrap.js:17. The production configuration declares the same remote under `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6,18), and Marketing repeats `name`/`exposes` in packages/marketing/config/webpack.prod.js:13-17; the active relationship relies on development configuration triggered by the `webpack serve` script.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


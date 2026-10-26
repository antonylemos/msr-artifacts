---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
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

# 006 — Pandian-it/eager-workspace1

## Repository overview

An Nx workspace with an Angular shell and three remotes (`cart`, `checkout`, `orders`) linked by Module Federation (`@angular-architects/module-federation`), plus two shared libraries, `shared-lib` and `shared-ui`, which the shell loads as *eager* singletons (projects/shell/webpack.config.js:20-33). Each remote exposes the same `./Module` module (e.g.: projects/cart/webpack.config.js:7-8), and each shell route loads a remote (projects/shell/src/app/app-routing.module.ts:8-28).

Loading does not use webpack's static `remotes`. A `ManifestService` reads `mfe.manifest.json` when running on localhost and `deployment-manifest.json` in production. In production, the URL is assembled as `<origin com www→mfe>/apps/<app>/<versão>/remoteEntry.js` (English translation of the template: origin with www replaced by mfe, followed by the app and version) (projects/shell/src/app/manifest.service.ts:23-58), pointing to an independent, versioned deployment of each remote on its own subdomain.

Distinctive features: projects/cart is Undetermined in the structural review because its standalone bootstrap does not start a UI, but this does not affect its role as a remote. The projects/shell/public/federation.manifest.json file (with `mfe1` and `mfe2`) is not read by the shell code and appears to be a template remnant.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/shell | projects/cart | host → remote | source → target | module-federation | Yes | Yes | projects/shell/webpack.config.js:7-8 (remote `cart` at `http://localhost:4201/remoteEntry.js`); projects/shell/public/mfe.manifest.json:3 (`cart` → `http://localhost:4201/remoteEntry.js`); projects/cart/webpack.config.js:5-8 (`name: 'cart'`, exposes `./Module`); projects/cart/project.json:79 (port 4201) | projects/shell/src/app/app-routing.module.ts:13; projects/shell/src/app/manifest.service.ts:4; projects/shell/src/app/manifest.service.ts:23; projects/shell/src/app/manifest.service.ts:63; projects/shell/src/app/manifest.service.ts:65; projects/shell/src/app/manifest.service.ts:71; projects/shell/src/app/app-routing.module.ts:8; projects/shell/src/app/manifest.service.ts:40 |
| 2 | projects/shell | projects/checkout | host → remote | source → target | module-federation | Yes | Yes | projects/shell/webpack.config.js:7, 9 (remote `checkout` at `http://localhost:4202/remoteEntry.js`); projects/shell/public/mfe.manifest.json:4 (`checkout` → `http://localhost:4202/remoteEntry.js`); projects/checkout/webpack.config.js:5-8 (`name: 'checkout'`, exposes `./Module`); projects/checkout/project.json:88 (port 4202) | projects/shell/src/app/app-routing.module.ts:20; projects/shell/src/app/manifest.service.ts:4; projects/shell/src/app/manifest.service.ts:23; projects/shell/src/app/manifest.service.ts:63; projects/shell/src/app/manifest.service.ts:65; projects/shell/src/app/manifest.service.ts:71; projects/shell/src/app/app-routing.module.ts:8; projects/shell/src/app/manifest.service.ts:40 |
| 3 | projects/shell | projects/orders | host → remote | source → target | module-federation | Yes | Yes | projects/shell/webpack.config.js:7, 10 (remote `orders` at `http://localhost:4203/remoteEntry.js`); projects/shell/public/mfe.manifest.json:2 (`orders` → `http://localhost:4203/remoteEntry.js`); projects/orders/webpack.config.js:5-8 (`name: 'orders'`, exposes `./Module`); projects/orders/project.json:87 (port 4203) | projects/shell/src/app/app-routing.module.ts:27; projects/shell/src/app/manifest.service.ts:4; projects/shell/src/app/manifest.service.ts:23; projects/shell/src/app/manifest.service.ts:63; projects/shell/src/app/manifest.service.ts:65; projects/shell/src/app/manifest.service.ts:71; projects/shell/src/app/app-routing.module.ts:8; projects/shell/src/app/manifest.service.ts:40 |

## Observations

**1. projects/shell → projects/cart.** The `cart` route calls `loadRemoteModule('cart')` (projects/shell/src/app/app-routing.module.ts:13). The service reads the local manifest (projects/shell/src/app/manifest.service.ts:18) and loads `./Module` (projects/shell/src/app/manifest.service.ts:70-74). The name `cart` and module `./Module` match projects/cart/webpack.config.js:5-8; port 4201 only corroborates. The service lines support all three relationships because a single flow serves all three remotes.

**2. projects/shell → projects/checkout.** The same flow, through the `checkout` route (projects/shell/src/app/app-routing.module.ts:20). The name and module match projects/checkout/webpack.config.js:5-8; port 4202 only corroborates.

**3. projects/shell → projects/orders.** The same flow, through the `orders` route (projects/shell/src/app/app-routing.module.ts:27). The name and module match projects/orders/webpack.config.js:5-8; port 4203 only corroborates.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


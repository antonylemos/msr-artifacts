---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
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

# 045 — mrgleam/mf-tanstack-demo

## Repository overview

A demonstration with two React/Vite applications joined by Module Federation (`@originjs/vite-plugin-federation`): `shell` is the host and `shop` is the remote, exposing its routes (shop/vite.config.ts:9-12). The shell does not import the remote directly in its routes. It uses its own `ModuleLoader`, with caching, retries and a fallback (shell/src/moduleLoader.ts:26-98, 127-136). The retries do not repeat the import: `import('shop/ShopRoutes')` is created only once in shell/src/moduleLoader.ts:130, and the loop only awaits the same promise again (shell/src/moduleLoader.ts:43-47), so a loading failure goes straight to the fallback. The shell fits the received routes into the TanStack Router tree during router creation (shell/src/router.tsx:52-103).

The distinctive feature is the contract between both sides: the shell expects `default.routes` (shell/src/router.tsx:61-68), but shop exports `routes` and `shopRouter` only by name (shop/src/routes/ShopRoutes.tsx:49-53). The remote module is loaded, but nothing in the code guarantees that the routes reach the tree; the `{ default: { routes: [] } }` fallback (shell/src/moduleLoader.ts:134) indicates that the shell can continue without them. Shop also runs independently, with its own router (shop/src/main.tsx:4-7).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | shop | host → remote | source → target | module-federation | Yes | Yes | shell/vite.config.ts:9-11 (remote `shop` at `http://localhost:3001/shop/assets/remoteEntry.js`); shop/vite.config.ts:10-12 (`name: 'shop'`, `filename: 'remoteEntry.js'`, exposes `./ShopRoutes`); shop/vite.config.ts:6 (`base: '/shop/'`); shop/vite.config.ts:17 (port 3001) | shell/src/moduleLoader.ts:130; shell/src/moduleLoader.ts:127; shell/src/router.tsx:52; shell/src/router.tsx:64 |

## Observations

**1. shell → shop.** The `shop` remote declared by the shell matches the shop unit through its name and `remoteEntry.js` (shop/vite.config.ts:10-11) and the `/shop/` path (shop/vite.config.ts:6); port 3001 only corroborates. The relationship is active because the import is requested during router initialization (shell/src/main.tsx:4-7 → shell/src/router.tsx:116). The only Undetermined line (shell/src/router.tsx:64) is route extraction, affected by the export mismatch described in the overview.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.


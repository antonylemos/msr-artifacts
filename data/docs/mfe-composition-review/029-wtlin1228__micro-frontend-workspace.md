---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
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

# 029 — wtlin1228/micro-frontend-workspace

## Repository overview

A pnpm workspace with a React host (Rsbuild) composing four applications through **two mechanisms simultaneously**, from a single `APP_CONFIGS` registry (packages/host/src/configs/apps.ts:9-34). A comment in that file says that in a real scenario this registry would come from a backend API (packages/host/src/configs/apps.ts:8).

- `app-mf-1` and `app-mf-2` enter through **runtime Module Federation**: the host registers and loads each remote on demand when the `/apps/<id>` route is accessed (packages/host/src/app-loaders/module-federation.ts:27-34; packages/host/src/routes/apps.$baseRoute.tsx:12-56). The host's static `remotes` are commented out (packages/host/module-federation.config.ts:5-10).
- `app-qiankun-1` and `app-qiankun-2` enter through **qiankun**: the host registers them with path-based `activeRule` and starts the orchestrator (packages/host/src/app-loaders/qiankun.ts:10-26). They are packaged as UMD and export lifecycles.

All four receive the same contract (`basepath`, type `HostProps`) from the `lib-app-interface` library, which is not a unit. This is a repository demonstrating a comparison of mechanisms, not a product.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/host | packages/app-mf-1 | host → remote | source → target | module-federation | Yes | Yes | packages/app-mf-1/module-federation.config.ts:4-7 (`name: 'mf1'`, exposes `.`); packages/app-mf-1/module-federation.config.ts:12 (public path `http://localhost:4001/`); packages/app-mf-1/rsbuild.config.ts:9, 23 (`assetPrefix` and port 4001) | packages/host/src/app-loaders/module-federation.ts:3; packages/host/src/app-loaders/module-federation.ts:27; packages/host/src/app-loaders/module-federation.ts:34; packages/host/src/configs/apps.ts:9; packages/host/src/routes/apps.$baseRoute.tsx:24; packages/host/src/routes/apps.$baseRoute.tsx:43; packages/host/src/routes/apps.$baseRoute.tsx:54 |
| 2 | packages/host | packages/app-mf-2 | host → remote | source → target | module-federation | Yes | Yes | packages/app-mf-2/module-federation.config.ts:4-7 (`name: 'mf2'`, exposes `.`); packages/app-mf-2/module-federation.config.ts:12 (public path `http://localhost:4002/`); packages/app-mf-2/rsbuild.config.ts:9, 23 (`assetPrefix` and port 4002) | packages/host/src/app-loaders/module-federation.ts:3; packages/host/src/app-loaders/module-federation.ts:27; packages/host/src/app-loaders/module-federation.ts:34; packages/host/src/configs/apps.ts:9; packages/host/src/routes/apps.$baseRoute.tsx:24; packages/host/src/routes/apps.$baseRoute.tsx:43; packages/host/src/routes/apps.$baseRoute.tsx:54 |
| 3 | packages/host | packages/app-qiankun-1 | root-config → application | source → target | qiankun | Yes | Yes | packages/app-qiankun-1/rsbuild.config.ts:7 (`assetPrefix` `http://localhost:3001/`); packages/app-qiankun-1/rsbuild.config.ts:12-16 (library `umd` `qiankun1`); packages/app-qiankun-1/rsbuild.config.ts:27 (port 3001) | packages/app-qiankun-1/src/index.tsx:1; packages/app-qiankun-1/src/lifecycles.tsx:14; packages/app-qiankun-1/src/lifecycles.tsx:22; packages/app-qiankun-1/src/lifecycles.tsx:45; packages/host/src/app-loaders/qiankun.ts:2; packages/host/src/app-loaders/qiankun.ts:25; packages/host/src/App.tsx:8; packages/host/src/app-loaders/qiankun.ts:26; packages/host/src/configs/apps.ts:9 |
| 4 | packages/host | packages/app-qiankun-2 | root-config → application | source → target | qiankun | Yes | Yes | packages/app-qiankun-2/rsbuild.config.ts:7 (`assetPrefix` `http://localhost:3002/`); packages/app-qiankun-2/rsbuild.config.ts:12-16 (library `umd` `qiankun2`); packages/app-qiankun-2/rsbuild.config.ts:27 (port 3002) | packages/app-qiankun-2/src/index.tsx:1; packages/app-qiankun-2/src/lifecycles.tsx:14; packages/app-qiankun-2/src/lifecycles.tsx:22; packages/app-qiankun-2/src/lifecycles.tsx:45; packages/host/src/app-loaders/qiankun.ts:2; packages/host/src/app-loaders/qiankun.ts:25; packages/host/src/App.tsx:8; packages/host/src/app-loaders/qiankun.ts:26; packages/host/src/configs/apps.ts:9 |

## Observations

**1. packages/host → packages/app-mf-1.** The registry declares `id: 'app-mf-1'`, `name: 'mf1'` and entry `http://localhost:4001/mf-manifest.json` (packages/host/src/configs/apps.ts:10-15). The name `mf1` matches packages/app-mf-1/module-federation.config.ts:4, and the id matches the directory; the port only corroborates. The host calls the `getRootComponent` factory exported by the remote, passing `basepath`, and renders the result in `Suspense` (packages/host/src/app-loaders/module-federation.ts:34-43; packages/host/src/routes/apps.$baseRoute.tsx:52-56).

**2. packages/host → packages/app-mf-2.** The same flow, with `id: 'app-mf-2'` and `name: 'mf2'` (packages/host/src/configs/apps.ts:16-21), matching packages/app-mf-2/module-federation.config.ts:4.

**3. packages/host → packages/app-qiankun-1.** The registry declares `id: 'app-qiankun-1'`, `name: 'qiankun1'` and entry `http://localhost:3001/index.html` (packages/host/src/configs/apps.ts:22-27). The host registers the application in qiankun with that id and `activeRule` `/apps/app-qiankun-1` (packages/host/src/app-loaders/qiankun.ts:12-21). The name `qiankun1` matches the UMD library in packages/app-qiankun-1/rsbuild.config.ts:13-15. The unit's exported lifecycles (`bootstrap`, `mount`, `unmount`) belong to this relationship; `bootstrap` only logs.

**4. packages/host → packages/app-qiankun-2.** The same flow, with `id: 'app-qiankun-2'` and `name: 'qiankun2'` (packages/host/src/configs/apps.ts:28-33), matching packages/app-qiankun-2/rsbuild.config.ts:13-15.

## Summary

Relationships: 4 (host → remote: 2, root-config → application: 2). Active: 4. Target outside the snapshot: 0.
Units without a relationship: none.


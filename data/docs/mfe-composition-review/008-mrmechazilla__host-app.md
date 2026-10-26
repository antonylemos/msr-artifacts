---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
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

# 008 — mrmechazilla/host-app

## Repository overview

The repository contains only the Angular host of a system distributed across several repositories. The `users-mfe` and `payments-mfe` remotes are outside the snapshot and known only through the `public/mf.manifest.json` manifest, which points to `localhost:4202` and `localhost:4203`. The host loads this manifest before bootstrap (src/main.ts:4-7) and mounts the `users-mfe` routes at the root route (src/app/app.routes.ts:4-15). If the remote fails, it only logs "service unavailable" (src/app/app.routes.ts:14).

The manifest contains metadata beyond what loading requires (`displayName`, `routePath`, `exportName`, `type`; public/mf.manifest.json:2-19), suggesting a menu or routing generated from it, but the active code uses only `users-mfe`, with fixed values. `payments-mfe` is resolved and never loaded. There is also an entirely commented-out generic loader (src/app/shared/utils/remote-loader.ts) and an unused `RemoteConfig` type (src/app/core/models/remote-config.ts:2), remnants of a more dynamic version. The host itself declares itself as `host-mfe`, with empty `exposes` (webpack.config.js:3-7).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | users-mfe | host → remote | source → target | module-federation | No | Yes | public/mf.manifest.json:2-9 (`users-mfe` with `remoteEntry` `http://localhost:4202/remoteEntry.js` and `exposedModule` `./users`) | src/app/app.routes.ts:1; src/app/app.routes.ts:8; src/main.ts:2; src/main.ts:4 |
| 2 | . | payments-mfe | host → remote | source → target | module-federation | No | Yes | public/mf.manifest.json:11-18 (`payments-mfe` with `remoteEntry` `http://localhost:4203/remoteEntry.js` and `exposedModule` `./payments`) | src/main.ts:2; src/main.ts:4 |

## Observations

**1. . → users-mfe.** The host loads `./users` from `users-mfe` through the manifest (src/app/app.routes.ts:8-13), after resolving it in src/main.ts:4. The snapshot has a single unit, and the remote is outside it.

**2. . → payments-mfe.** The active `loadManifest` (src/main.ts:4) resolves `payments-mfe`, but no route loads it (src/app/app.routes.ts:4-15 uses only `users-mfe`). Active = Yes because the line resolving it is Yes in the source code review; actual use of the module is not observed. Outside the snapshot.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 2.
Units without a relationship: none.


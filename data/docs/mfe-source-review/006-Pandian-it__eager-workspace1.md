---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 006 — Pandian-it/eager-workspace1

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/cart/src/main.ts:1 | projects/cart | dynamic-loading | No | Imports the local cart bootstrap at projects/cart/src/main.ts:1; does not load another unit. |
| src-async-bootstrap | projects/checkout/src/main.ts:1 | projects/checkout | dynamic-loading | No | Imports the local checkout bootstrap at projects/checkout/src/main.ts:1; internal to the unit. |
| src-async-bootstrap | projects/orders/src/main.ts:1 | projects/orders | dynamic-loading | No | Imports the local orders bootstrap at projects/orders/src/main.ts:1; internal to the unit. |
| src-async-bootstrap | projects/shell/src/main.ts:1 | projects/shell | dynamic-loading | No | Imports the local shell bootstrap at projects/shell/src/main.ts:1; internal to the unit. |
| src-load-remote | projects/shell/src/app/app-routing.module.ts:13 | projects/shell | remote-resolution | Yes | The cart route calls the ManifestService loader (projects/shell/src/app/app-routing.module.ts:9-14); routes registered at projects/shell/src/app/app-routing.module.ts:41-45 and imported by projects/shell/src/app/app.module.ts:24. |
| src-load-remote | projects/shell/src/app/app-routing.module.ts:20 | projects/shell | remote-resolution | Yes | The checkout route calls the remote loader (projects/shell/src/app/app-routing.module.ts:16-21), connected to AppModule through projects/shell/src/app/app.module.ts:4 and projects/shell/src/app/app.module.ts:24. |
| src-load-remote | projects/shell/src/app/app-routing.module.ts:27 | projects/shell | remote-resolution | Yes | The orders route calls the remote loader (projects/shell/src/app/app-routing.module.ts:23-28), connected to AppModule through projects/shell/src/app/app.module.ts:4 and projects/shell/src/app/app.module.ts:24. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:4 | projects/shell | remote-resolution | Yes | Imports the API used at projects/shell/src/app/manifest.service.ts:71-75 to load the module of another application; the service is invoked by the routes at projects/shell/src/app/app-routing.module.ts:13-27. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:23 | projects/shell | remote-resolution | Yes | Method that fetches the local or production manifest (projects/shell/src/app/manifest.service.ts:23-36) to resolve the remote entries; called at projects/shell/src/app/manifest.service.ts:65. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:63 | projects/shell | remote-resolution | Yes | Defines the loader used in the shell routes (projects/shell/src/app/app-routing.module.ts:13-27); resolves remoteEntry and loads ./Module at projects/shell/src/app/manifest.service.ts:63-75. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:65 | projects/shell | remote-resolution | Yes | Loads the manifest before resolving remoteEntry, within the active loader flow at projects/shell/src/app/manifest.service.ts:63-75. |
| src-load-remote | projects/shell/src/app/manifest.service.ts:71 | projects/shell | remote-resolution | Yes | Invokes the API with remoteEntry and exposedModule ./Module (projects/shell/src/app/manifest.service.ts:71-75), returning MfeModule to the shell route at projects/shell/src/app/app-routing.module.ts:13-27. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | projects/shell/src/app/app-routing.module.ts:8 | projects/shell | host-relationship | Yes | Declares the routes naming cart, checkout and orders (projects/shell/src/app/app-routing.module.ts:8-28), registered by RouterModule.forRoot at projects/shell/src/app/app-routing.module.ts:42. |
| manual | projects/shell/src/app/manifest.service.ts:40 | projects/shell | remote-resolution | Yes | getRemoteUrl resolves another application’s entry through the manifest: a direct URL in development or a versioned path in production (projects/shell/src/app/manifest.service.ts:40-58); called at projects/shell/src/app/manifest.service.ts:68. |

## Summary

Constructs participating in composition: 10 (remote-resolution: 9, host-relationship: 1).

## Notes

- Active chain: projects/shell/project.json:24 → projects/shell/src/main.ts:1 → projects/shell/src/bootstrap.ts:3-7 → projects/shell/src/app/app.module.ts:4 and projects/shell/src/app/app.module.ts:24 → AppRoutingModule and ManifestService.
- projects/cart is Undetermined in the structural review because of standalone initialization; this does not make the shell construct requesting the cart remote inactive. The judgment here describes the composition code without asserting successful execution or server availability.
- The additional searches found the route declaration and URL resolution not captured by src-*. Local bootstrap imports do not participate in interaction between units.

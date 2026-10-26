---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-20
---

# 008 — mrmechazilla/host-app

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | src/main.ts:6 | . | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap after the manifest; internal to the unit |
| src-load-remote | src/app/app.routes.ts:1 | . | remote-resolution | Yes | Imports `loadRemoteModule`, used at src/app/app.routes.ts:8 |
| src-load-remote | src/app/app.routes.ts:8 | . | remote-resolution | Yes | `loadRemoteModule({ type: 'manifest', remoteName: 'users-mfe', exposedModule: './users' })` at src/app/app.routes.ts:8-12 loads the external `users-mfe` remote’s routes; routes registered by `provideRouter(routes)` at src/app/app.config.ts:13 |
| src-load-remote | src/app/shared/utils/remote-loader.ts:1 | . | remote-resolution | No | Entire file commented out (`/*` at src/app/shared/utils/remote-loader.ts:1, `*/` on line 28) |
| src-load-remote | src/app/shared/utils/remote-loader.ts:14 | . | remote-resolution | No | Inside the commented block at src/app/shared/utils/remote-loader.ts:1-28 |
| src-load-remote | src/main.ts:2 | . | remote-resolution | Yes | Imports `loadManifest`, used at src/main.ts:4 |
| src-load-remote | src/main.ts:4 | . | remote-resolution | Yes | `loadManifest("mf.manifest.json")` resolves the `users-mfe` (public/mf.manifest.json:2-10) and `payments-mfe` (public/mf.manifest.json:11-19) remotes before bootstrap; `main` at angular.json:41 |

## Constructs outside mining

No additional constructs.

## Summary

Constructs participating in composition: 4 (remote-resolution: 4).

## Notes

- The files are in `src`, which the structural review judged `No` (part of application `.`); the unit is therefore `.`.
- `payments-mfe` is only resolved through the manifest; no active route loads it (the only active `loadRemoteModule` is for `users-mfe`).
- The search for constructs outside mining (method step 4) found only `import()` of local files inside the commented block in src/app/shared/utils/remote-loader.ts (lines 5 and 9) and the `remoteEntry` field of a type at src/app/core/models/remote-config.ts:2; neither is an active composition construct.

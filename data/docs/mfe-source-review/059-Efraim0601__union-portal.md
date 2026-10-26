---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 059 — Efraim0601/union-portal

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/diaspora/src/main.ts:5 | projects/diaspora | dynamic-loading | No | projects/diaspora/src/main.ts:5 imports its own bootstrap; loading internal to the unit. |
| src-async-bootstrap | projects/promote/src/main.ts:5 | projects/promote | dynamic-loading | No | projects/promote/src/main.ts:5 imports its own bootstrap; loading internal to the unit. |
| src-async-bootstrap | projects/shell/src/main.ts:5 | projects/shell | dynamic-loading | No | projects/shell/src/main.ts:5 imports the local bootstrap after resolving the manifest. |
| src-load-remote | projects/diaspora/src/main.ts:1 | projects/diaspora | remote-resolution | No | Imports initFederation for the call without a manifest at projects/diaspora/src/main.ts:3; prepares the unit’s own standalone runtime without resolving another observable application. |
| src-load-remote | projects/diaspora/src/main.ts:3 | projects/diaspora | remote-resolution | No | projects/diaspora/src/main.ts:3 initializes the local runtime before bootstrap. The shell consumes ./Routes directly, exposed at projects/diaspora/federation.config.js:8-9; it does not go through this standalone main. |
| src-load-remote | projects/promote/src/main.ts:1 | projects/promote | remote-resolution | No | Imports initFederation for the local runtime used at projects/promote/src/main.ts:3, without a manifest of other units. |
| src-load-remote | projects/promote/src/main.ts:3 | projects/promote | remote-resolution | No | projects/promote/src/main.ts:3 prepares its own standalone application; composition through the shell loads ./Routes exposed at projects/promote/federation.config.js:8-9, without executing this main. |
| src-load-remote | projects/shell/src/app/app.routes.ts:2 | projects/shell | remote-resolution | Yes | Imports loadRemoteModule for the active calls at projects/shell/src/app/app.routes.ts:13-18; routes registered at projects/shell/src/app/app.config.ts:7-10. |
| src-load-remote | projects/shell/src/app/app.routes.ts:13 | projects/shell | remote-resolution | Yes | Loads the other unit promote’s routes at projects/shell/src/app/app.routes.ts:11-13; the exposed module exports routes at projects/promote/src/app/remote.routes.ts:23-38. |
| src-load-remote | projects/shell/src/app/app.routes.ts:18 | projects/shell | remote-resolution | Yes | Loads the other unit diaspora’s routes at projects/shell/src/app/app.routes.ts:16-18; the exposed module exports routes at projects/diaspora/src/app/remote.routes.ts:12-18. |
| src-load-remote | projects/shell/src/main.ts:1 | projects/shell | remote-resolution | Yes | Imports initFederation used with a manifest at projects/shell/src/main.ts:3; the manifest names promote and diaspora at projects/shell/public/federation.manifest.json:2-3. |
| src-load-remote | projects/shell/src/main.ts:3 | projects/shell | remote-resolution | Yes | Resolves the promote and diaspora entries before bootstrap through projects/shell/src/main.ts:3-5 and projects/shell/public/federation.manifest.json:2-3. |
| src-iframe | projects/diaspora/src/app/pages/legacy-onboarding.ts:31 | projects/diaspora | embedding | Undetermined | Iframe active through the route at projects/diaspora/src/app/app.routes.ts:11; src calculated at projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24 and projects/diaspora/src/app/pages/legacy-onboarding.ts:53-54. The target application of the /open-account-flow-test path is not confirmed in the snapshot. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | projects/shell/src/app/app.routes.ts:9 | projects/shell | host-relationship | Yes | Declares the routes naming promote and diaspora (projects/shell/src/app/app.routes.ts:9-20), registered at projects/shell/src/app/app.config.ts:7-10 and used by the bootstrap at projects/shell/src/bootstrap.ts:2-5. |
| manual | projects/auth/src/lib/client-auth-store.ts:71 | — | communication | No | Storage listener for session sharing (projects/auth/src/lib/client-auth-store.ts:68-75), but the library is not imported/injected by any frontend; projects/diaspora/src/app/core/admin-auth.ts:19-23 also records that it is not connected. |

## Summary

Constructs participating in composition: 6 (remote-resolution: 5, host-relationship: 1).

## Notes

- Shell chain: projects/shell/src/main.ts:3-5 → projects/shell/src/bootstrap.ts:2-5 → projects/shell/src/app/app.config.ts:7-10 → projects/shell/src/app/app.routes.ts:9-20. The remotes’ initFederation calls without a manifest are internal to the standalone flow rather than calls resolving other units.
- Point of doubt: the iframe defaults to /open-account-flow-test, described in a comment as an external FastAPI flow. There is no implementation or override of __LEGACY_ONBOARDING_URL__ in the snapshot. deploy/nginx.conf:125-130 uses a shell fallback for other paths; it does not demonstrate forwarding this endpoint to the legacy frontend. The iframe therefore received Undetermined; the URL resolver serves as evidence for this row.
- The search for ClientAuthStore and @union/auth found only definition, re-export, alias and documentation, without an application import. The SSO comment at projects/shell/src/app/app.ts:5-7 does not prove use; the storage construct (listener at projects/auth/src/lib/client-auth-store.ts:71) received No and Unit — because projects/auth is a library.
- The local page imports at projects/diaspora/src/app/app.routes.ts:6-17 and projects/promote/src/app/app.routes.ts:6-20 are internal lazy loading; @mediapipe/tasks-vision imports are a library rather than another frontend unit. They were not added as composition.
- Under the criteria for constructs outside mining (method step 4), the exposed route exports (projects/diaspora/src/app/remote.routes.ts:12-18 and projects/promote/src/app/remote.routes.ts:23-38), the iframe URL calculation at projects/diaspora/src/app/pages/legacy-onboarding.ts:19-24 (a step of the src-iframe row) and session writing at projects/auth/src/lib/client-auth-store.ts:153-158 (a usage point of the mechanism recorded at :71) remain outside the table.

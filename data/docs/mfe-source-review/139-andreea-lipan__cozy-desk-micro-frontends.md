---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | sticky-notes/src/main.ts:5 | sticky-notes | dynamic-loading | No | Imports the local sticky-notes bootstrap after initFederation (sticky-notes/src/main.ts:3-5); internal to the unit. |
| src-async-bootstrap | tea-tracker/src/main.ts:5 | tea-tracker | dynamic-loading | No | Imports the local tea-tracker bootstrap after initFederation (tea-tracker/src/main.ts:3-5); internal to the unit. |
| src-async-bootstrap | test-base/src/main.ts:5 | test-base | dynamic-loading | No | Imports the host test-base’s local bootstrap after initFederation (test-base/src/main.ts:3-5); internal to the unit. |
| src-load-remote | sticky-notes/src/main.ts:1 | sticky-notes | remote-resolution | No | Imports initFederation for the call without a manifest at sticky-notes/src/main.ts:3; prepares the unit’s own runtime without resolving another application. |
| src-load-remote | sticky-notes/src/main.ts:3 | sticky-notes | remote-resolution | No | initFederation() without a manifest or remotes (sticky-notes/src/main.ts:3); sticky-notes only exposes ./App (sticky-notes/federation.config.js:6-8) and does not resolve another unit. |
| src-load-remote | tea-tracker/src/main.ts:1 | tea-tracker | remote-resolution | No | Imports initFederation for the call without a manifest at tea-tracker/src/main.ts:3; prepares the unit’s own runtime without resolving another application. |
| src-load-remote | tea-tracker/src/main.ts:3 | tea-tracker | remote-resolution | No | initFederation() without a manifest or remotes (tea-tracker/src/main.ts:3); tea-tracker only exposes ./App (tea-tracker/federation.config.js:6-8) and does not resolve another unit. |
| src-load-remote | test-base/src/app/app.routes.ts:3 | test-base | remote-resolution | Yes | Imports loadRemoteModule used in the tea-tracker and sticky-notes routes (test-base/src/app/app.routes.ts:14 and test-base/src/app/app.routes.ts:18). |
| src-load-remote | test-base/src/app/app.routes.ts:14 | test-base | remote-resolution | Yes | The tea-tracker route loads ./App from remote tea-tracker (test-base/src/app/app.routes.ts:12-15); routes registered by provideRouter at test-base/src/app/app.config.ts:4-9, used at test-base/src/bootstrap.ts:5. Exposure at tea-tracker/federation.config.js:4-8. |
| src-load-remote | test-base/src/app/app.routes.ts:18 | test-base | remote-resolution | Yes | The sticky-notes route loads ./App from remote sticky-notes (test-base/src/app/app.routes.ts:16-19), in the same active flow at test-base/src/app/app.config.ts:4-9. Exposure at sticky-notes/federation.config.js:4-8. |
| src-load-remote | test-base/src/main.ts:1 | test-base | remote-resolution | Yes | Imports initFederation used with a manifest at test-base/src/main.ts:3. |
| src-load-remote | test-base/src/main.ts:3 | test-base | remote-resolution | Yes | Initializes federation with federation.manifest.json, which names tea-tracker at http://localhost:4222/remoteEntry.json and sticky-notes at http://localhost:4333/remoteEntry.json (test-base/public/federation.manifest.json:2-3). |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | test-base/src/app/app.routes.ts:5 | test-base | host-relationship | Yes | Declares the host routes naming tea-tracker and sticky-notes (test-base/src/app/app.routes.ts:5-20), registered by provideRouter at test-base/src/app/app.config.ts:9; the remote components appear in the `<router-outlet>` at test-base/src/app/app.html:26, with links at test-base/src/app/app.html:12 and test-base/src/app/app.html:17. |

## Summary

Constructs participating in composition: 6 (remote-resolution: 5, host-relationship: 1).

## Notes

- Active host chain: test-base/angular.json:46 → test-base/src/main.ts:3-5 → test-base/src/bootstrap.ts:5 → test-base/src/app/app.config.ts:4-9 → test-base/src/app/app.routes.ts:5-20.
- The sticky-notes and tea-tracker initFederation() calls without arguments serve each remote’s standalone flow; neither declares remotes or a manifest.
- The step 4 search in the three units’ code files found no `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `<script>` injection, `registerApplication`, `registerMicroApps`, `registerRemotes` or `System.import`; there is also no `localStorage`, `addEventListener` or shared inter-unit service in `*/src/app`. Composition is only through routes with loadRemoteModule.

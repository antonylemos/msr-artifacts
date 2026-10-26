---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Repository overview

An Angular micro frontends tutorial with **Native Federation** (`@angular-architects/native-federation`, esbuild build). There are three sibling Angular projects at the root, without a workspace: host `test-base` and remotes `tea-tracker` and `sticky-notes`. The host initializes federation with `federation.manifest.json` before bootstrap (test-base/src/main.ts:3-5). This manifest resides in `public/`, copied as an asset (test-base/angular.json:48-53), and maps each remote name to a `remoteEntry.json` on `localhost` (test-base/public/federation.manifest.json:2-3). The host declares one route per remote, using `loadComponent` over `loadRemoteModule('<remote>', './App')` (test-base/src/app/app.routes.ts:12-19), registered by `provideRouter` (test-base/src/app/app.config.ts:9). The sidebar menu links the routes (test-base/src/app/app.html:12, 17), and the remote component appears in `<router-outlet>` (test-base/src/app/app.html:26).

Each remote exposes only `./App`, its own application's root component (tea-tracker/federation.config.js:4-8; sticky-notes/federation.config.js:4-8). That component renders the feature, `<app-tea-tracker/>` or `<app-sticky-notes/>` (tea-tracker/src/app/app.html:1; sticky-notes/src/app/app.html:1). The host exposes nothing (test-base/federation.config.js:3-8). The remotes' argument-free `initFederation()` calls (tea-tracker/src/main.ts:3; sticky-notes/src/main.ts:3) serve each one's isolated execution and resolve no other unit. There is no inter-unit communication, iframe, custom element or orchestrator. There is also no deployment: manifest URLs are development ports. The remotes do not know each other; every relationship originates from the host.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | test-base | sticky-notes | host → remote | source → target | native-federation | Yes | Yes | test-base/public/federation.manifest.json:3 (`sticky-notes` → `http://localhost:4333/remoteEntry.json`); sticky-notes/federation.config.js:4-8 (`name: 'sticky-notes'`, exposes `./App`); sticky-notes/angular.json:97 (port 4333) | test-base/src/app/app.routes.ts:3; test-base/src/app/app.routes.ts:18; test-base/src/main.ts:1; test-base/src/main.ts:3; test-base/src/app/app.routes.ts:5 |
| 2 | test-base | tea-tracker | host → remote | source → target | native-federation | Yes | Yes | test-base/public/federation.manifest.json:2 (`tea-tracker` → `http://localhost:4222/remoteEntry.json`); tea-tracker/federation.config.js:4-8 (`name: 'tea-tracker'`, exposes `./App`); tea-tracker/angular.json:97 (port 4222) | test-base/src/app/app.routes.ts:3; test-base/src/app/app.routes.ts:14; test-base/src/main.ts:1; test-base/src/main.ts:3; test-base/src/app/app.routes.ts:5 |

## Observations

**1. test-base → sticky-notes.** The `sticky-notes` route loads `./App` from remote `sticky-notes` and uses export `App` (test-base/src/app/app.routes.ts:16-18). The name and module match sticky-notes/federation.config.js:4-8, and the export matches sticky-notes/src/app/app.ts:11. The manifest URL uses port 4333 (test-base/public/federation.manifest.json:3), the same as the project's `serve-original` (sticky-notes/angular.json:97). The port only corroborates: the target is resolved through `name`. The `loadRemoteModule` import, `initFederation` with manifest and route declaration lines apply to both relationships.

**2. test-base → tea-tracker.** The same flow, at route `tea-tracker` (test-base/src/app/app.routes.ts:12-14). The name and module match tea-tracker/federation.config.js:4-8, and the export matches tea-tracker/src/app/app.ts:11. The manifest's port 4222 (test-base/public/federation.manifest.json:2) matches tea-tracker/angular.json:97.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.


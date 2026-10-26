---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
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

# 368 — Ba5ik7/seed-mfe-remote

## Repository overview

An Angular workspace with two projects: `seed-mfe-remote`, a Module Federation remote seed (`@angular-architects/module-federation`), and `demo`, a demonstration host consuming it. The remote is named `seedMfeRemote` and exposes a single component, `./RemoteWidget` (projects/seed-mfe-remote/webpack.config.js:5, 7-8), whose content is only text "Remote Widget LOADED!!!!" (projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:6). Otherwise, the remote has a minimal page of its own ("Remote App", projects/seed-mfe-remote/src/app/app.component.ts:6) and an empty route table (projects/seed-mfe-remote/src/app/app.routes.ts:3).

`demo` loads the same module in two ways: in the root component's `ngAfterViewInit`, it mounts the component in `ng-container #mfeHost` (projects/demo/src/app/app.component.ts:12, 24-36), and at route `remote`, it returns it through `loadComponent` for `<router-outlet>` (projects/demo/src/app/app.routes.ts:5-13; projects/demo/src/app/app.component.ts:15). Both calls use `loadRemoteModule` with `type: 'module'` and fixed URL `http://localhost:4202/remoteEntry.js` (projects/demo/src/app/app.component.ts:27-29; projects/demo/src/app/app.routes.ts:9-11), the remote dev-server's port and `publicHost` (angular.json:80-81). Hence entry `seedMfeRemote` in `remotes` (projects/demo/webpack.config.js:5-7) is declared but unused by code.

Selector `app-remote-widget` (projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:4) appears in no demo template; the component enters only as a loaded module. Production configurations only reuse development configurations (projects/demo/webpack.prod.config.js:1; projects/seed-mfe-remote/webpack.prod.config.js:1), and there is no remote URL beyond `localhost`. The repository is a minimal template: its value lies in the chain configured end to end, rather than content.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/demo | projects/seed-mfe-remote | host → remote | source → target | module-federation | Yes | Yes | projects/demo/webpack.config.js:5-7 (remote `seedMfeRemote` at `http://localhost:4202/remoteEntry.js`); projects/seed-mfe-remote/webpack.config.js:5, 7-8 (`name: 'seedMfeRemote'`, exposes `./RemoteWidget`); angular.json:80-81 (remote dev-server on port 4202, `publicHost: http://localhost:4202`) | projects/demo/src/app/app.component.ts:1; projects/demo/src/app/app.component.ts:26; projects/demo/src/app/app.routes.ts:2; projects/demo/src/app/app.routes.ts:8; projects/demo/src/app/app.component.ts:36; projects/demo/src/app/app.routes.ts:4 |

## Observations

**1. projects/demo → projects/seed-mfe-remote.** The target was resolved through two explicit matches: `exposedModule: './RemoteWidget'` in host calls (projects/demo/src/app/app.component.ts:29; projects/demo/src/app/app.routes.ts:11) matches the remote's `exposes` (projects/seed-mfe-remote/webpack.config.js:7-8), and name `seedMfeRemote` declared in host `remotes` (projects/demo/webpack.config.js:6) matches the remote's `name` (projects/seed-mfe-remote/webpack.config.js:5). Dev-server port 4202 (angular.json:80) confirms but is insufficient alone. Mounting through `createComponent` (projects/demo/src/app/app.component.ts:36) and route `remote` (projects/demo/src/app/app.routes.ts:4) load the same module from the same target, hence remain in one row. Active `Yes` because all six source code review constructs are `Yes`. Code resolves the remote by URL, rather than the name declared in `remotes`, which remains unused.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.


---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
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

# 009 — pmathulan/frontend-coding-exercises

## Repository overview

A frontend exercise repository. Only the `microfrontend-workspace` directory implements micro-frontends; `angular-frontend-practical`, `react-performance-practical` and `ssr-app` are independent applications, unrelated to it or one another.

The Angular workspace has a `shell`, an `mfe1` remote and a `shared` library, linked by Module Federation (`@angular-architects/module-federation`). The shell loads mfe1's `AppComponent` at the `mfe1` route with a fixed URL, and redirects the empty route there (microfrontend-workspace/projects/shell/src/app/app.routes.ts:4-24). An `mfe2` route is commented out (microfrontend-workspace/projects/shell/src/app/app.routes.ts:14-21).

Besides loading, both units communicate through a `MessageService` with `BehaviorSubject` in the shared library. It works as an inter-unit channel only because both configurations share dependencies as singletons (`shareAll`) and the `shared` alias points to the same build (microfrontend-workspace/tsconfig.json:15-18). The shell also exposes `./Component` (microfrontend-workspace/projects/shell/webpack.config.js:7-9), with no consumer in the snapshot.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | microfrontend-workspace/projects/shell | microfrontend-workspace/projects/mfe1 | host → remote | source → target | module-federation | Yes | Yes | microfrontend-workspace/projects/shell/webpack.config.js:14-16 (remote `mfe1@http://localhost:4201/remoteEntry.js`); microfrontend-workspace/projects/mfe1/webpack.config.js:5-10 (`name: 'mfe1'`, `filename: 'remoteEntry.js'`, exposes `./Component`); microfrontend-workspace/angular.json:191 (port 4201 of project mfe1) | microfrontend-workspace/projects/shell/src/app/app.routes.ts:2; microfrontend-workspace/projects/shell/src/app/app.routes.ts:8; microfrontend-workspace/projects/shell/src/app/app.routes.ts:4 |
| 2 | microfrontend-workspace/projects/shell | microfrontend-workspace/projects/mfe1 | communication | source → target | events | Yes | Yes | microfrontend-workspace/projects/shell/webpack.config.js:11-13 (`shareAll` singleton); microfrontend-workspace/projects/mfe1/webpack.config.js:12-14 (`shareAll` singleton); microfrontend-workspace/tsconfig.json:15-18 (alias `shared` to `./dist/shared`) | microfrontend-workspace/projects/shared/src/lib/message.service.ts:12 |

## Observations

**1. shell → mfe1 (host → remote).** The route loads `./Component` from `http://localhost:4201/remoteEntry.js` (microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12). The module and name `mfe1` of the remote declared in the shell (microfrontend-workspace/projects/shell/webpack.config.js:15) match microfrontend-workspace/projects/mfe1/webpack.config.js:5-9; port 4201 only corroborates. The shell's static `remotes` points to the same URL used directly by the route.

**2. shell → mfe1 (communication).** The shell sends through `setMessage` (microfrontend-workspace/projects/shell/src/app/app.component.ts:19) and mfe1 subscribes to `message$` (microfrontend-workspace/projects/mfe1/src/app/app.component.ts:16-18); there is no sending in the reverse direction. The code evidence is in the shared library, which is not a unit; the participants come from the source code review.

## Summary

Relationships: 2 (host → remote: 1, communication: 1). Active: 2. Target outside the snapshot: 0.
Units without a relationship: angular-frontend-practical, react-performance-practical, ssr-app.


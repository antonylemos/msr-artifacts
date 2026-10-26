---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
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

# 316 — Tutul33/mf-workspace

## Repository overview

An Angular workspace assembled as a step-by-step guide, with three projects connected through **Native Federation** (`@angular-architects/native-federation`): host `host-app` and remotes `customer-app` and `orders-app`, each with its own build target and development port (4200, 4301 and 4302; angular.json:114, angular.json:227, angular.json:340). The host has no federation manifest or `remotes` in configuration (projects/host-app/federation.config.js:3-7 only declares `shared`). Both connections are in route code: `customers` and `orders` load each remote's exposed routes module through `loadChildren` and `loadRemoteModule`, with the `remoteEntry.json` URL written directly in the call (projects/host-app/src/app/app.routes.ts:4-20). The host presents both routes through links and a `<router-outlet />` (projects/host-app/src/app/app.html:1-3).

Each remote exposes a single `NgModule` with `RouterModule.forChild` showing page `Home` (projects/customer-app/federation.config.js:7-10; projects/orders-app/federation.config.js:7-10; projects/customer-app/src/app/customer/customer-routes.module.ts:5-12). A minimal example: there is no message exchange or shared state between units, and deployment is absent from the snapshot.

The host's `initFederation`, registering remote `customerApp` at `http://localhost:4200/remoteEntry.json` (projects/host-app/src/main.ts:3-5), remained outside relationships. Port 4200 belongs to the host itself (angular.json:114), and no route uses name `customerApp`. The source code review gave that line `No`, and it does not support a relationship. Remotes' argumentless `initFederation()` calls only prepare their own runtime (projects/customer-app/src/main.ts:3; projects/orders-app/src/main.ts:3). Each remote's configuration retains a commented-out alternative exposure of `./Component` (projects/customer-app/federation.config.js:8; projects/orders-app/federation.config.js:8).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/host-app | projects/customer-app | host → remote | source → target | native-federation | Yes | Yes | projects/customer-app/federation.config.js:5-9 (`name: 'customer-app'`, exposes `./CustomerRoutes`); angular.json:227 (port 4301 of project customer-app) | projects/host-app/src/app/app.routes.ts:2; projects/host-app/src/app/app.routes.ts:8; projects/host-app/src/app/app.routes.ts:4 |
| 2 | projects/host-app | projects/orders-app | host → remote | source → target | native-federation | Yes | Yes | projects/orders-app/federation.config.js:5-9 (`name: 'orders-app'`, exposes `./OrdersRoutes`); angular.json:340 (port 4302 of project orders-app) | projects/host-app/src/app/app.routes.ts:2; projects/host-app/src/app/app.routes.ts:16; projects/host-app/src/app/app.routes.ts:4 |

## Observations

**1. projects/host-app → projects/customer-app.** Route `customers` loads `./CustomerRoutes` from `http://localhost:4301/remoteEntry.json` and uses `CustomerRoutesModule` (projects/host-app/src/app/app.routes.ts:6-11). The requested module matches `exposes` in projects/customer-app/federation.config.js:9, whose class is in projects/customer-app/src/app/customer/customer-routes.module.ts:12. The project's port 4301 (angular.json:227) only corroborates. Routes enter the host through `provideRouter` (projects/host-app/src/app/app.config.ts:10), used in bootstrap (projects/host-app/src/bootstrap.ts:5). Hence the relationship is Active.

**2. projects/host-app → projects/orders-app.** Same flow at route `orders`: `./OrdersRoutes` from `http://localhost:4302/remoteEntry.json`, using `OrdersRoutesModule` (projects/host-app/src/app/app.routes.ts:14-19). The module matches projects/orders-app/federation.config.js:9, with the class in projects/orders-app/src/app/orders/orders-routes.module.ts:12. Port 4302 (angular.json:340) only corroborates.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.


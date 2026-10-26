---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/customer-app/src/main.ts:5 | projects/customer-app | dynamic-loading | No | `import('./bootstrap')` loads the local customer-app bootstrap after initFederation (projects/customer-app/src/main.ts:3-5; projects/customer-app/src/bootstrap.ts:5); internal to the unit. |
| src-async-bootstrap | projects/host-app/src/main.ts:7 | projects/host-app | dynamic-loading | No | `import('./bootstrap')` loads the host’s local bootstrap after initFederation (projects/host-app/src/main.ts:3-7; projects/host-app/src/bootstrap.ts:5); internal to the unit. |
| src-async-bootstrap | projects/orders-app/src/main.ts:5 | projects/orders-app | dynamic-loading | No | `import('./bootstrap')` loads the local orders-app bootstrap after initFederation (projects/orders-app/src/main.ts:3-5; projects/orders-app/src/bootstrap.ts:5); internal to the unit. |
| src-load-remote | projects/customer-app/src/main.ts:1 | projects/customer-app | remote-resolution | No | Imports initFederation for the call without arguments at projects/customer-app/src/main.ts:3; prepares the unit’s own runtime without resolving another application. |
| src-load-remote | projects/customer-app/src/main.ts:3 | projects/customer-app | remote-resolution | No | `initFederation()` without a manifest or remotes; customer-app only exposes `./CustomerRoutes` (projects/customer-app/federation.config.js:7-10), loaded by the host without executing this main. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:2 | projects/host-app | remote-resolution | Yes | Imports loadRemoteModule used in routes `customers` and `orders` (projects/host-app/src/app/app.routes.ts:8 and projects/host-app/src/app/app.routes.ts:16). |
| src-load-remote | projects/host-app/src/app/app.routes.ts:8 | projects/host-app | remote-resolution | Yes | Route `customers` loads `./CustomerRoutes` from http://localhost:4301/remoteEntry.json and uses `CustomerRoutesModule` (projects/host-app/src/app/app.routes.ts:5-11); 4301 is customer-app’s port (angular.json:227), exposing the module at projects/customer-app/federation.config.js:9 (class at projects/customer-app/src/app/customer/customer-routes.module.ts:12). Routes registered by provideRouter at projects/host-app/src/app/app.config.ts:10, used at projects/host-app/src/bootstrap.ts:5. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:16 | projects/host-app | remote-resolution | Yes | Route `orders` loads `./OrdersRoutes` from http://localhost:4302/remoteEntry.json and uses `OrdersRoutesModule` (projects/host-app/src/app/app.routes.ts:13-19); 4302 is orders-app’s port (angular.json:340), exposing the module at projects/orders-app/federation.config.js:9 (class at projects/orders-app/src/app/orders/orders-routes.module.ts:12). Same registration chain as line 8. |
| src-load-remote | projects/host-app/src/main.ts:1 | projects/host-app | remote-resolution | No | Imports initFederation for the call at projects/host-app/src/main.ts:3, which received No (see the following row). |
| src-load-remote | projects/host-app/src/main.ts:3 | projects/host-app | remote-resolution | No | `initFederation` registers remote `customerApp` at http://localhost:4200/remoteEntry.json (projects/host-app/src/main.ts:3-5), but 4200 is the host’s own port (angular.json:114; README.md:192) rather than customer-app’s (4301, angular.json:227); name `customerApp` is used by no loadRemoteModule, which receives the URL directly (projects/host-app/src/app/app.routes.ts:9 and :17). Does not resolve another unit; see Notes. |
| src-load-remote | projects/orders-app/src/main.ts:1 | projects/orders-app | remote-resolution | No | Imports initFederation for the call without arguments at projects/orders-app/src/main.ts:3; prepares the unit’s own runtime without resolving another application. |
| src-load-remote | projects/orders-app/src/main.ts:3 | projects/orders-app | remote-resolution | No | `initFederation()` without a manifest or remotes; orders-app only exposes `./OrdersRoutes` (projects/orders-app/federation.config.js:7-10), loaded by the host without executing this main. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | projects/host-app/src/app/app.routes.ts:4 | projects/host-app | host-relationship | Yes | `routes` declares paths `customers` and `orders` naming customer-app and orders-app (projects/host-app/src/app/app.routes.ts:4-26), registered by provideRouter at projects/host-app/src/app/app.config.ts:10; presented through links and the `<router-outlet />` at projects/host-app/src/app/app.html:1-3. |

## Summary

Constructs participating in composition: 4 (remote-resolution: 3, host-relationship: 1).

## Notes

- Active host chain: angular.json:62 → projects/host-app/src/main.ts:3-7 → projects/host-app/src/bootstrap.ts:5 → projects/host-app/src/app/app.config.ts:10 → projects/host-app/src/app/app.routes.ts:4-26.
- The host’s `initFederation` (projects/host-app/src/main.ts:3-5) received No rather than Undetermined because the URL points to the host’s own port and all customer-app composition goes through loadRemoteModule with an explicit URL. If the intention was to register customer-app, the port is wrong; this does not change the Summary, since neither No nor Undetermined counts.
- The step 4 search also found `import('./customer/home/home')` at projects/customer-app/src/app/app.routes.ts:7, internal customer-app lazy loading, and code excerpts in README.md and angular_20_microfrontend_app_guide.md, which are not constructs. There are no `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `<script>` injection, `registerRemotes`, `addEventListener` or shared inter-unit service in `projects/`.
- The host’s empty route redirects to itself (projects/host-app/src/app/app.routes.ts:21-25); it does not affect the remote routes.

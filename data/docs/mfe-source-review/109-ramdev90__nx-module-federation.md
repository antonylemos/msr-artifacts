---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 109 — ramdev90/nx-module-federation

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | shell/src/app/app.routes.ts:7 | shell | dynamic-loading | Yes | `loadChildren` imports `customer/Routes` and uses `m!.remoteRoutes` (shell/src/app/app.routes.ts:5-8); the target is unit customer, which exposes `./Routes` pointing to customer/src/app/remote-entry/entry.routes.ts (customer/module-federation.config.ts:5-7), a file exporting `remoteRoutes` (customer/src/app/remote-entry/entry.routes.ts:4). Active chain: shell/src/main.ts:1 → shell/src/bootstrap.ts:5 → shell/src/app/app.config.ts:6-9 → `appRoutes`. |
| src-remote-import | shell/src/app/app.routes.ts:11 | shell | dynamic-loading | Yes | `loadChildren` imports `orders/Routes` and uses `m!.remoteRoutes` (shell/src/app/app.routes.ts:9-12); target orders, which exposes `./Routes` for orders/src/app/remote-entry/entry.routes.ts (orders/module-federation.config.ts:5-7), with `remoteRoutes` exported at orders/src/app/remote-entry/entry.routes.ts:4. |
| src-remote-import | shell/src/app/app.routes.ts:15 | shell | dynamic-loading | Yes | `loadChildren` imports `products/Routes` and uses `m!.remoteRoutes` (shell/src/app/app.routes.ts:13-16); target products, which exposes `./Routes` for products/src/app/remote-entry/entry.routes.ts (products/module-federation.config.ts:5-7), with `remoteRoutes` exported at products/src/app/remote-entry/entry.routes.ts:5-8. |
| src-async-bootstrap | customer/src/main.ts:1 | customer | dynamic-loading | No | Imports the unit’s own local bootstrap (customer/src/main.ts:1 → customer/src/bootstrap.ts:5); does not cross a unit boundary. |
| src-async-bootstrap | orders/src/main.ts:1 | orders | dynamic-loading | No | Imports the unit’s own local bootstrap (orders/src/main.ts:1 → orders/src/bootstrap.ts:5); internal to the unit. |
| src-async-bootstrap | products/src/main.ts:1 | products | dynamic-loading | No | Imports the unit’s own local bootstrap (products/src/main.ts:1 → products/src/bootstrap.ts:5); internal to the unit. |
| src-async-bootstrap | shell/src/main.ts:1 | shell | dynamic-loading | No | Imports the shell’s local bootstrap (shell/src/main.ts:1 → shell/src/bootstrap.ts:5); internal to the unit. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | shell/src/app/app.routes.ts:4 | shell | host-relationship | Yes | `appRoutes` declares under which paths shell uses customer, orders and products (shell/src/app/app.routes.ts:4-21); registered by `provideRouter(appRoutes)` at shell/src/app/app.config.ts:6-9 and presented by the `router-outlet` and menu at shell/src/app/app.html:1-7. |
| manual | orders/src/app/remote-entry/nx-welcome.ts:512 | orders | other | Yes | The orders template renders `<app-product-list>` (orders/src/app/remote-entry/nx-welcome.ts:512), a component from unit products imported through a relative path crossing the project boundary (orders/src/app/remote-entry/nx-welcome.ts:3, declared in `imports` on line 7; selector at products/src/app/product-list.ts:4). This is not Module Federation: inclusion happens at build time, hence `other`. Active construct: orders/src/app/remote-entry/entry.routes.ts:4 → orders/src/app/remote-entry/entry.ts:5-7 → this template. |

## Summary

Constructs participating in composition: 5 (dynamic-loading: 3, host-relationship: 1, other: 1).

## Notes

- The four `src-async-bootstrap` occurrences are the Nx/Angular asynchronous bootstrap pattern within the unit itself; they are a recurring false positive for inter-unit interaction.
- The step 4 searches also found `import('./remote-entry/entry.routes')` at customer/src/app/app.routes.ts:7, orders/src/app/app.routes.ts:7 and products/src/app/app.routes.ts:7: these import modules of the unit itself and do not enter the table.
- `withModuleFederation` (shell/webpack.config.ts:9; products/webpack.config.ts:9; orders/webpack.config.ts:9; customer/webpack.config.ts:9) and `remotes`/`exposes` (shell/module-federation.config.ts:17; products/module-federation.config.ts:5-7; orders/module-federation.config.ts:5-7; customer/module-federation.config.ts:5-7) are build configuration rather than source code constructs; they appear here only as evidence for the rows above.
- `apps/microfrontend-workspace` (a `Yes` unit in the structural review) has no composition construct: its routes are empty (apps/microfrontend-workspace/src/app/app.routes.ts:1-3) and the template has only NxWelcome and a router-outlet without routes (apps/microfrontend-workspace/src/app/app.html:1-2).
- The cross-import orders → products recorded in the manual row coincides with the exception already noted in the classification (`docs/mfe-classification/109-ramdev90__nx-module-federation.md`, Q2); here it is described as a construct without revisiting the classification.
- Searches for `customElements`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `<iframe>`, `registerApplication`, `registerMicroApps`, `loadRemote*`, `System.import` and `createElement('script'` in the snapshot files (except `package-lock.json`) returned nothing: there is no explicit communication mechanism between the units.

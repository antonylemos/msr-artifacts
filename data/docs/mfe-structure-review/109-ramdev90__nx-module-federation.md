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

## Workspace

nx.json:1-51 (Nx workspace: `namedInputs`, `targetDefaults`, `generators`); Nx `project.json` in each project (shell/project.json:2-8, products/project.json:2-8, orders/project.json:2-8, customer/project.json:2-8, apps/microfrontend-workspace/project.json:2-8); no `workspaces` in package.json:1-47.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-47 (workspace manifest, empty `scripts` at `:5`) | — | — | nx.json:1-51 (Nx workspace root) | — | No | Workspace coordination root, with no UI entry or build of its own. |
| apps/microfrontend-workspace | apps/microfrontend-workspace/project.json | — | apps/microfrontend-workspace/project.json:14-15 (own `index` and `main`); apps/microfrontend-workspace/src/main.ts:1-5 (`bootstrapApplication(App, appConfig)`) | apps/microfrontend-workspace/project.json:9-24 (`build` target with `@angular-devkit/build-angular:browser` and its own output) | apps/microfrontend-workspace/project.json:2-4 (Nx project `microfrontend-workspace`, `application`) | — | Yes | Angular application with its own entry and build target. |
| customer | customer/module-federation.config.ts;customer/project.json;customer/webpack.config.ts;customer/webpack.prod.config.ts | — | customer/project.json:14-15 (own `index` and `main`); customer/src/main.ts:1 (imports `./bootstrap`); customer/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | customer/project.json:9-26 (`build` target with `@nx/angular:webpack-browser`, its own output and `customWebpackConfig` in customer/webpack.config.ts:1-9) | customer/project.json:2-4 (Nx project `customer`, `application`) | — | Yes | Angular application with its own entry and build target. |
| orders | orders/module-federation.config.ts;orders/project.json;orders/webpack.config.ts;orders/webpack.prod.config.ts | — | orders/project.json:14-15 (own `index` and `main`); orders/src/main.ts:1 (imports `./bootstrap`); orders/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | orders/project.json:9-26 (`build` target with `@nx/angular:webpack-browser`, its own output and `customWebpackConfig` in orders/webpack.config.ts:1-9) | orders/project.json:2-4 (Nx project `orders`, `application`) | — | Yes | Angular application with its own entry and build target. |
| products | products/module-federation.config.ts;products/project.json;products/webpack.config.ts;products/webpack.prod.config.ts | — | products/project.json:14-15 (own `index` and `main`); products/src/main.ts:1 (imports `./bootstrap`); products/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | products/project.json:9-26 (`build` target with `@nx/angular:webpack-browser`, its own output and `customWebpackConfig` in products/webpack.config.ts:1-9) | products/project.json:2-4 (Nx project `products`, `application`) | — | Yes | Angular application with its own entry and build target. |
| shell | shell/module-federation.config.ts;shell/project.json;shell/webpack.config.ts;shell/webpack.prod.config.ts | — | shell/project.json:14-15 (own `index` and `main`); shell/src/main.ts:1 (imports `./bootstrap`); shell/src/bootstrap.ts:1-5 (`bootstrapApplication(App, appConfig)`) | shell/project.json:9-26 (`build` target with `@nx/angular:webpack-browser`, its own output and `customWebpackConfig` in shell/webpack.config.ts:1-9) | shell/project.json:2-4 (Nx project `shell`, `application`) | — | Yes | Angular application with its own entry and build target. |

## Summary

Frontend applications in the snapshot: 5 (apps/microfrontend-workspace, customer, orders, products, shell).

## Notes

- The count differs from the classification’s `frontend_units: 4` because `apps/microfrontend-workspace` is an application with its own entry and build, but does not participate in composition (it is neither a shell remote nor a remote consumer); the classification inventories it and does not add it to the units.
- No directory has a Dockerfile, CI job or hosting configuration; `matches.csv` has no `ops-*` or `ci-*` occurrences. The `serve-static` targets (`@nx/web:file-server`, e.g., shell/project.json:84-91) serve the build locally and were not counted as deployment.
- No unit has its own `package.json`; the boundaries come from Nx `project.json` files. The only `ws-*` occurrence is `ws-path-alias` in tsconfig.base.json:17-20 (remote aliases for typing), which does not declare workspace members.
- `products/my-component.ts` and sibling files are outside `products/src`, but belong to the `products` project; they do not form another unit.

---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 006 — Pandian-it/eager-workspace1

## Workspace

package.json:4-6 (`workspaces: ["projects/*"]`); nx.json:3-20 (Nx target defaults).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-17 (workspace manifest) | — | — | — | — | No | Workspace coordination root, with no UI entry or build of its own. |
| projects/cart | projects/cart/package.json;projects/cart/project.json;projects/cart/webpack.config.js | projects/cart/package.json:1-5 (own manifest) | projects/cart/project.json:23-24 (own index and main); projects/cart/src/bootstrap.ts:1-7 (calls bootstrapModule); projects/cart/src/app/mfe.module.ts:8-19 (module with neither bootstrap nor ngDoBootstrap) | projects/cart/project.json:19-24 (own build target and output); projects/cart/project.json:39-40 (own webpack); .github/workflows/Push-Event-To-Release.yml:140-145 (`nx build` per project) | package.json:4-5 (`projects/*`) | .github/workflows/Push-Event-To-Release.yml:155-162 (publishes each project’s dist under its own name and version) | Undetermined | Own entry and build declared, but the module used by bootstrap does not define how to start the UI. |
| projects/checkout | projects/checkout/package.json;projects/checkout/project.json;projects/checkout/webpack.config.js | projects/checkout/package.json:1-5 (own manifest) | projects/checkout/project.json:24-25 (own index and main); projects/checkout/src/bootstrap.ts:1-7 (Angular bootstrap) | projects/checkout/project.json:20-25 (own build target and output); projects/checkout/project.json:40-41 (own webpack); .github/workflows/Push-Event-To-Release.yml:140-145 (`nx build` per project) | package.json:4-5 (`projects/*`) | .github/workflows/Push-Event-To-Release.yml:155-162 (publishes each project’s dist under its own name and version) | Yes | Angular application with its own entry and build target. |
| projects/orders | projects/orders/package.json;projects/orders/project.json;projects/orders/webpack.config.js | projects/orders/package.json:1-5 (own manifest) | projects/orders/project.json:23-24 (own index and main); projects/orders/src/bootstrap.ts:1-7 (Angular bootstrap) | projects/orders/project.json:19-24 (own build target and output); projects/orders/project.json:39-40 (own webpack); .github/workflows/Push-Event-To-Release.yml:140-145 (`nx build` per project) | package.json:4-5 (`projects/*`) | .github/workflows/Push-Event-To-Release.yml:155-162 (publishes each project’s dist under its own name and version) | Yes | Angular application with its own entry and build target. |
| projects/shared-lib | projects/shared-lib/package.json;projects/shared-lib/project.json | projects/shared-lib/package.json:1-12 (library manifest) | — | projects/shared-lib/project.json:4-11 (library target with ng-packagr) | package.json:4-5 (`projects/*`) | projects/shared-lib/project.json:22-24 (library dist artifact) | No | Shared library; ng-packagr build with no application entry. |
| projects/shared-ui | projects/shared-ui/package.json;projects/shared-ui/project.json | projects/shared-ui/package.json:1-12 (library manifest) | — | projects/shared-ui/project.json:4-11 (library target with ng-packagr) | package.json:4-5 (`projects/*`) | projects/shared-ui/project.json:22-24 (library dist artifact) | No | Shared library; ng-packagr build with no application entry. |
| projects/shell | projects/shell/package.json;projects/shell/project.json;projects/shell/webpack.config.js | projects/shell/package.json:1-5 (own manifest) | projects/shell/project.json:23-24 (own index and main); projects/shell/src/bootstrap.ts:1-7 (Angular bootstrap) | projects/shell/project.json:19-24 (own build target and output); projects/shell/project.json:39-40 (own webpack); package.json:13 (`nx build shell`) | package.json:4-5 (`projects/*`) | .github/workflows/Push-Event-To-Release.yml:155-162 (publishes each project’s dist under its own name and version) | Yes | Angular application with its own entry and build target. |

## Summary

Frontend applications in the snapshot: 3 (projects/checkout, projects/orders, projects/shell).

## Notes

- The root coordinates the projects; the two libraries have their own artifacts, but do not start a UI. The workflow publishes affected projects by name and version, without making these libraries frontend applications.
- projects/cart/src/bootstrap.ts:4-7 calls `bootstrapModule(MfeModule)`, but projects/cart/src/app/mfe.module.ts:8-19 defines neither `bootstrap` nor `ngDoBootstrap`. The entry does not establish UI initialization; under the contradictory artifacts rule, projects/cart received Undetermined.
- The same `MfeModule` is exposed as a remote in projects/cart/webpack.config.js:7-8 (`'./Module'`) and loaded by the shell in projects/shell/src/app/manifest.service.ts:75. Undetermined refers to running projects/cart on its own, not its role as a remote, which is addressed by the composition review (protocol section 3.4.5).
- The classification records frontend_units: 4. This review counts three Yes rows; the fourth unit, projects/cart, remains Undetermined because of the bootstrap contradiction. The classification was not changed.

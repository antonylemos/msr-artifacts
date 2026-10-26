---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Workspace

Nx workspace: `nx.json:1-99` at the root (`targetDefaults`, `plugins` and `generators`), with one `project.json` per project (for example, `appshell/host/project.json:2-4`, project `host`, `application`; `libs/shared/data/project.json:2-6`, project `data`, `library`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-64 (workspace manifest, empty `scripts` at `:5`) | — | — | nx.json:1-99 (Nx workspace root) | — | No | Workspace coordination root, with no UI entry or build of its own. |
| apps/angular-monorepo | apps/angular-monorepo/project.json | — | apps/angular-monorepo/project.json:14-15 (own `index` and `main`); apps/angular-monorepo/src/main.ts:1-5 (`bootstrapApplication(App, appConfig)`) | apps/angular-monorepo/project.json:9-52 (`build` target with `@angular-devkit/build-angular:browser` and its own output at `:13`) | apps/angular-monorepo/project.json:2-4 (Nx project `angular-monorepo`, `application`) | — | Yes | Angular application with its own entry and build target. |
| apps/angular-monorepo-e2e | apps/angular-monorepo-e2e/project.json | — | — | — (apps/angular-monorepo-e2e/project.json:8-9, empty `targets`; apps/angular-monorepo-e2e/cypress.config.ts:1-17 configures Cypress tests) | apps/angular-monorepo-e2e/project.json:2-4 (Nx project `angular-monorepo-e2e`) | — | No | e2e testing project for `apps/angular-monorepo`, with neither UI entry nor build. |
| appshell/host | appshell/host/module-federation.config.ts;appshell/host/project.json;appshell/host/webpack.config.ts;appshell/host/webpack.prod.config.ts | — | appshell/host/project.json:14-15 (own `index` and `main`); appshell/host/src/main.ts:1 (imports `./bootstrap`); appshell/host/src/bootstrap.ts:1-5 (`bootstrapApplication(App, appConfig)`) | appshell/host/project.json:9-27 (`build` target with `@nx/angular:webpack-browser`, its own output and `customWebpackConfig` in appshell/host/webpack.config.ts:1-9) | appshell/host/project.json:2-4 (Nx project `host`, `application`) | — | Yes | Angular application with its own entry and build target. |
| appshell/host-e2e | appshell/host-e2e/project.json | — | — | — (appshell/host-e2e/project.json:7-8, empty `targets`; appshell/host-e2e/playwright.config.ts:17-31 configures Playwright tests) | appshell/host-e2e/project.json:2-4 (Nx project `host-e2e`) | — | No | e2e testing project for the host, with neither UI entry nor build. |
| appshell/mfe1 | appshell/mfe1/module-federation.config.ts;appshell/mfe1/project.json;appshell/mfe1/webpack.config.ts;appshell/mfe1/webpack.prod.config.ts | — | appshell/mfe1/project.json:14-15 (own `index` and `main`); appshell/mfe1/src/main.ts:1 (imports `./bootstrap`); appshell/mfe1/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | appshell/mfe1/project.json:9-27 (`build` target with `@nx/angular:webpack-browser`, its own output and `customWebpackConfig` in appshell/mfe1/webpack.config.ts:1-9) | appshell/mfe1/project.json:2-4 (Nx project `mfe1`, `application`) | — | Yes | Angular application with its own entry and build target. |
| appshell/mfe1-e2e | appshell/mfe1-e2e/project.json | — | — | — (appshell/mfe1-e2e/project.json:7-8, empty `targets`; appshell/mfe1-e2e/playwright.config.ts configures Playwright tests) | appshell/mfe1-e2e/project.json:2-4 (Nx project `mfe1-e2e`) | — | No | e2e testing project for `mfe1`, with neither UI entry nor build. |
| appshell/mfe2 | appshell/mfe2/module-federation.config.ts;appshell/mfe2/project.json;appshell/mfe2/webpack.config.ts;appshell/mfe2/webpack.prod.config.ts | — | appshell/mfe2/project.json:14-15 (own `index` and `main`); appshell/mfe2/src/main.ts:1 (imports `./bootstrap`); appshell/mfe2/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | appshell/mfe2/project.json:9-27 (`build` target with `@nx/angular:webpack-browser`, its own output and `customWebpackConfig` in appshell/mfe2/webpack.config.ts:1-9) | appshell/mfe2/project.json:2-4 (Nx project `mfe2`, `application`) | — | Yes | Angular application with its own entry and build target. |
| appshell/mfe2-e2e | appshell/mfe2-e2e/project.json | — | — | — (appshell/mfe2-e2e/project.json:7-8, empty `targets`; appshell/mfe2-e2e/playwright.config.ts configures Playwright tests) | appshell/mfe2-e2e/project.json:2-4 (Nx project `mfe2-e2e`) | — | No | e2e testing project for `mfe2`, with neither UI entry nor build. |
| libs/shared/data | libs/shared/data/project.json | — | — | — (libs/shared/data/project.json:8-19 has only `test` and `lint` targets) | libs/shared/data/project.json:2-6 (Nx project `data`, `library`) | — | No | Shared library (libs/shared/data/src/index.ts:1, `UserService`), with no application entry. |
| libs/shared/ui | libs/shared/ui/project.json | — | — | — (libs/shared/ui/project.json:8-19 has only `test` and `lint` targets) | libs/shared/ui/project.json:2-6 (Nx project `button`, `library`) | — | No | Shared UI library (libs/shared/ui/src/index.ts:1, button), with no application entry. |

## Summary

Frontend applications in the snapshot: 4 (apps/angular-monorepo, appshell/host, appshell/mfe1, appshell/mfe2).

## Notes

- The count differs from the classification’s `frontend_units: 3` because `apps/angular-monorepo` is the default application generated by Nx, with its own entry and build, but no composition relationship (it is neither a host remote nor a remote consumer); the classification mentions it and does not add it to the units.
- No directory has a Dockerfile, CI job or hosting configuration; `matches.csv` has no `ops-*` or `ci-*` occurrences. The `serve-static` targets (`@nx/web:file-server`, e.g., appshell/host/project.json:92-99) serve the build locally and were not counted as deployment.
- No unit has its own `package.json`; the boundaries come from Nx `project.json` files. The only `ws-*` occurrence is `ws-path-alias` in tsconfig.base.json:17-22 (aliases for the libraries and `mfe1/Routes`/`mfe2/Routes` for typing), which does not declare workspace members.
- The `*-e2e` projects have `projectType: application` in `project.json`, but contain only tests; the `e2e` targets are inferred by the plugins registered in nx.json:61-83.

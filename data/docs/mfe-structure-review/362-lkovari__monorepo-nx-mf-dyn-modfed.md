---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Workspace

nx-mf-df/nx.json:1-91 (Nx workspace: `namedInputs`, `targetDefaults`, `plugins`, `generators`); Nx `project.json` in each project (e.g., nx-mf-df/apps/main-host/project.json:2-4, nx-mf-df/libs/common-ui-lib/project.json:2-6); nx-mf-df/pnpm-workspace.yaml:1-4 has only `autoInstallPeers` and `patchedDependencies`, without `packages`; no `workspaces` in nx-mf-df/package.json:1-100.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| nx-mf-df | nx-mf-df/package.json | nx-mf-df/package.json:1-100 (workspace manifest `@nx-mf-df/source`, `nx run ...` scripts at `:5-27`) | — | — | nx-mf-df/nx.json:1-91 (Nx workspace root) | — | No | Workspace coordination root, with no UI entry or build of its own. |
| nx-mf-df/apps/main-host | nx-mf-df/apps/main-host/federation.config.js;nx-mf-df/apps/main-host/project.json | — | nx-mf-df/apps/main-host/project.json:65 (`browser: apps/main-host/src/main.ts`); nx-mf-df/apps/main-host/src/main.ts:3-5 (`initFederation(...)` and `import('./bootstrap')`); nx-mf-df/apps/main-host/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | nx-mf-df/apps/main-host/project.json:9-22 (`build` target with `@angular-architects/native-federation:build` over `main-host:esbuild`) and `:58-65` (`@angular/build:application`, `outputPath: dist/apps/main-host`); nx-mf-df/apps/main-host/federation.config.js:3-9 | nx-mf-df/apps/main-host/project.json:2-4 (Nx project `main-host`, `application`) | nx-mf-df/scripts/gh-build.mjs:51 (own build with `--baseHref=${base}`); nx-mf-df/scripts/gh-stage.mjs:13-18 (copies `dist/apps/main-host/browser` to the site root); .github/workflows/deploy-github-pages.yml:37-47 (`gh-build`, `gh-stage` and upload to GitHub Pages) | Yes | Angular shell with its own entry and build target. |
| nx-mf-df/apps/main-host-e2e | nx-mf-df/apps/main-host-e2e/project.json | — | — | — (nx-mf-df/apps/main-host-e2e/project.json:8, empty `targets`; nx-mf-df/apps/main-host-e2e/playwright.config.ts:17-31 configures Playwright tests) | nx-mf-df/apps/main-host-e2e/project.json:2-4 (Nx project `main-host-e2e`) | — | No | e2e testing project for the host, with neither UI entry nor build. |
| nx-mf-df/apps/mf_remote_a | nx-mf-df/apps/mf_remote_a/federation.config.js;nx-mf-df/apps/mf_remote_a/project.json | — | nx-mf-df/apps/mf_remote_a/project.json:65 (`browser: apps/mf_remote_a/src/main.ts`); nx-mf-df/apps/mf_remote_a/src/main.ts:3-5 (`initFederation()` and `import('./bootstrap')`); nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | nx-mf-df/apps/mf_remote_a/project.json:9-22 (`build` target with `@angular-architects/native-federation:build`) and `:58-65` (`@angular/build:application`, `outputPath: dist/apps/mf_remote_a`); nx-mf-df/apps/mf_remote_a/federation.config.js:3-10 (`exposes: { './Component': ... }`) | nx-mf-df/apps/mf_remote_a/project.json:2-4 (Nx project `mf_remote_a`, `application`) | nx-mf-df/scripts/gh-build.mjs:53-54 (own build with `--baseHref=${base}${name}/`); nx-mf-df/scripts/gh-stage.mjs:19-25 (copies `dist/apps/mf_remote_a/browser` to `gh-pages-dist/mf_remote_a`); .github/workflows/deploy-github-pages.yml:37-47 | Yes | Angular remote with its own entry and build target. |
| nx-mf-df/apps/mf_remote_a-e2e | nx-mf-df/apps/mf_remote_a-e2e/project.json | — | — | — (nx-mf-df/apps/mf_remote_a-e2e/project.json:8, empty `targets`; nx-mf-df/apps/mf_remote_a-e2e/playwright.config.ts configures Playwright tests) | nx-mf-df/apps/mf_remote_a-e2e/project.json:2-4 (Nx project `mf_remote_a-e2e`) | — | No | e2e testing project for `mf_remote_a`, with neither UI entry nor build. |
| nx-mf-df/apps/mf_remote_b | nx-mf-df/apps/mf_remote_b/federation.config.js;nx-mf-df/apps/mf_remote_b/project.json | — | nx-mf-df/apps/mf_remote_b/project.json:65 (`browser: apps/mf_remote_b/src/main.ts`); nx-mf-df/apps/mf_remote_b/src/main.ts:3-5; nx-mf-df/apps/mf_remote_b/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | nx-mf-df/apps/mf_remote_b/project.json:9-22 (`build` target with `@angular-architects/native-federation:build`) and `:58-65` (`@angular/build:application`, `outputPath: dist/apps/mf_remote_b`); nx-mf-df/apps/mf_remote_b/federation.config.js:3-10 | nx-mf-df/apps/mf_remote_b/project.json:2-4 (Nx project `mf_remote_b`, `application`) | nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25 (copies `dist/apps/mf_remote_b/browser` to `gh-pages-dist/mf_remote_b`); .github/workflows/deploy-github-pages.yml:37-47 | Yes | Angular remote with its own entry and build target. |
| nx-mf-df/apps/mf_remote_b-e2e | nx-mf-df/apps/mf_remote_b-e2e/project.json | — | — | — (nx-mf-df/apps/mf_remote_b-e2e/project.json:8, empty `targets`; nx-mf-df/apps/mf_remote_b-e2e/playwright.config.ts configures Playwright tests) | nx-mf-df/apps/mf_remote_b-e2e/project.json:2-4 (Nx project `mf_remote_b-e2e`) | — | No | e2e testing project for `mf_remote_b`, with neither UI entry nor build. |
| nx-mf-df/apps/mf_remote_c | nx-mf-df/apps/mf_remote_c/federation.config.js;nx-mf-df/apps/mf_remote_c/project.json | — | nx-mf-df/apps/mf_remote_c/project.json:65 (`browser: apps/mf_remote_c/src/main.ts`); nx-mf-df/apps/mf_remote_c/src/main.ts:3-5; nx-mf-df/apps/mf_remote_c/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | nx-mf-df/apps/mf_remote_c/project.json:9-22 (`build` target with `@angular-architects/native-federation:build`) and `:58-65` (`@angular/build:application`, `outputPath: dist/apps/mf_remote_c`); nx-mf-df/apps/mf_remote_c/federation.config.js:3-10 | nx-mf-df/apps/mf_remote_c/project.json:2-4 (Nx project `mf_remote_c`, `application`) | nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25 (copies `dist/apps/mf_remote_c/browser` to `gh-pages-dist/mf_remote_c`); .github/workflows/deploy-github-pages.yml:37-47 | Yes | Angular remote with its own entry and build target. |
| nx-mf-df/apps/mf_remote_c-e2e | nx-mf-df/apps/mf_remote_c-e2e/project.json | — | — | — (nx-mf-df/apps/mf_remote_c-e2e/project.json:8, empty `targets`; nx-mf-df/apps/mf_remote_c-e2e/playwright.config.ts configures Playwright tests) | nx-mf-df/apps/mf_remote_c-e2e/project.json:2-4 (Nx project `mf_remote_c-e2e`) | — | No | e2e testing project for `mf_remote_c`, with neither UI entry nor build. |
| nx-mf-df/libs/common-ui-lib | nx-mf-df/libs/common-ui-lib/package.json;nx-mf-df/libs/common-ui-lib/project.json | nx-mf-df/libs/common-ui-lib/package.json:1-16 (`@nx-mf-df/common-ui-lib`, only `peerDependencies`) | — | nx-mf-df/libs/common-ui-lib/project.json:10-24 (`build` target with `@nx/angular:ng-packagr-lite`); nx-mf-df/libs/common-ui-lib/ng-package.json:3-6 (`entryFile: src/index.ts`, library) | nx-mf-df/libs/common-ui-lib/project.json:2-6 (Nx project `common-ui-lib`, `library`) | — | No | Shared UI and messaging library, with no application entry. |
| nx-mf-df/libs/contracts-platform-messaging | nx-mf-df/libs/contracts-platform-messaging/package.json;nx-mf-df/libs/contracts-platform-messaging/project.json | nx-mf-df/libs/contracts-platform-messaging/package.json:1-11 (`@nx-mf-df/contracts-platform-messaging`, `main: ./src/index.js`) | — | nx-mf-df/libs/contracts-platform-messaging/project.json:8-16 (`build` target with `@nx/js:tsc`) | nx-mf-df/libs/contracts-platform-messaging/project.json:2-5 (Nx project `contracts-platform-messaging`, `library`) | — | No | Messaging contracts library, with no application entry. |

## Summary

Frontend applications in the snapshot: 4 (nx-mf-df/apps/main-host, nx-mf-df/apps/mf_remote_a, nx-mf-df/apps/mf_remote_b, nx-mf-df/apps/mf_remote_c).

## Notes

- The count is equal to the classification’s `frontend_units: 4`.
- No unit has its own `package.json`; the boundaries come from Nx `project.json` files. The only `ws-*` occurrence is `ws-path-alias` in nx-mf-df/tsconfig.base.json:17-22 (aliases for the two libs), which does not declare workspace members.
- Deploy: a single workflow publishes a single site to GitHub Pages, but each app has its own build with its own `baseHref` (nx-mf-df/scripts/gh-build.mjs:51-54) and its own output copied to its subdirectory (nx-mf-df/scripts/gh-stage.mjs:18, `:25`), as in 313. The `ops-hosting` occurrence in README.md:207 (`pnpm gh-deploy`) is documentation and was not used. The `serve-static` targets (`@nx/web:file-server`, e.g., nx-mf-df/apps/main-host/project.json:48-56) serve the build locally and were not counted as deployment.
- Each app has `src/index.html` (e.g., nx-mf-df/apps/main-host/src/index.html), which is the default index for `@angular/build:application`; `project.json` declares only `browser`.

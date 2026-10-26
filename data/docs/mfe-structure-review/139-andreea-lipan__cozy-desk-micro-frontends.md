---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| sticky-notes | sticky-notes/angular.json;sticky-notes/federation.config.js;sticky-notes/package.json | sticky-notes/package.json:1-48 (own package `sticky-notes`) | sticky-notes/angular.json:46 (`browser: src/main.ts`); sticky-notes/src/main.ts:3-5 (`initFederation()` and `import('./bootstrap')`); sticky-notes/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | sticky-notes/angular.json:16-29 (`build` target, builder `@angular-architects/native-federation:build` over the `esbuild` target, angular.json:43-44 `@angular/build:application`); sticky-notes/package.json:7 (`ng build`) | — | — | Yes | Angular project with its own package, entry and build target, served on port 4333. |
| tea-tracker | tea-tracker/angular.json;tea-tracker/federation.config.js;tea-tracker/package.json | tea-tracker/package.json:1-48 (own package `tea-tracker`) | tea-tracker/angular.json:46 (`browser: src/main.ts`); tea-tracker/src/main.ts:3-5 (`initFederation()` and `import('./bootstrap')`); tea-tracker/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | tea-tracker/angular.json:16-29 (`build` target, builder `@angular-architects/native-federation:build` over the `esbuild` target, angular.json:43-44 `@angular/build:application`); tea-tracker/package.json:7 (`ng build`) | — | — | Yes | Angular project with its own package, entry and build target, served on port 4222. |
| test-base | test-base/angular.json;test-base/federation.config.js;test-base/package.json | test-base/package.json:1-48 (own package `test-base`) | test-base/angular.json:46 (`browser: src/main.ts`); test-base/src/main.ts:3-5 (`initFederation('federation.manifest.json')` and `import('./bootstrap')`); test-base/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | test-base/angular.json:16-29 (`build` target, builder `@angular-architects/native-federation:build` over the `esbuild` target, angular.json:43-44 `@angular/build:application`); test-base/package.json:7 (`ng build`) | — | — | Yes | Angular project with its own package, entry and build target, served on port 4200. |

## Summary

Frontend applications in the snapshot: 3 (sticky-notes, tea-tracker, test-base).

## Notes

- There is no manifest at the snapshot root; each `angular.json` declares a single project (`sticky-notes/angular.json:8-9`, `tea-tracker/angular.json:8-9`, `test-base/angular.json:8-9`), and no `package.json` has `workspaces`. `artifacts.csv` marks `package.json` and `tsconfig*.json` as `workspace-config`, but `matches.csv` has no `ws-*` occurrence.
- The ports come from the `serve-original` target (`sticky-notes/angular.json:96-98`, `tea-tracker/angular.json:96-98`, `test-base/angular.json:96-98`).
- There is no Dockerfile, CI or hosting configuration in the snapshot, and `matches.csv` has no `ops-*` or `ci-*` occurrences.
- The count of 3 matches the classification’s `frontend_units: 3`.

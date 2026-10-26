---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| athletes | athletes/angular.json;athletes/federation.config.js;athletes/package.json | athletes/package.json:1-41 (own package `athletes`) | athletes/angular.json:46 (`browser: src/main.ts`); athletes/src/main.ts:3-5 (`initFederation()` and `import('./bootstrap')`); athletes/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | athletes/angular.json:16-29 (`build` target, builder `@angular-architects/native-federation:build` over the `esbuild` target, athletes/angular.json:43-44 `@angular/build:application`); athletes/package.json:7 (`ng build`) | — | athletes/wrangler.jsonc:3-15 (Cloudflare Worker `mf-angular-athletes` publishing `./dist/athletes/browser`); athletes/public/_headers:1-2 (CORS `*`) | Yes | Own Angular workspace with its own package, entry, build target and hosting configuration, served on port 4201 (athletes/angular.json:93). |
| ranking | ranking/angular.json;ranking/federation.config.js;ranking/package.json | ranking/package.json:1-41 (own package `ranking`) | ranking/angular.json:46 (`browser: src/main.ts`); ranking/src/main.ts:3-5 (`initFederation()` and `import('./bootstrap')`); ranking/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | ranking/angular.json:16-29 (`build` target, builder `@angular-architects/native-federation:build` over the `esbuild` target, ranking/angular.json:43-44 `@angular/build:application`); ranking/package.json:7 (`ng build`) | — | ranking/wrangler.jsonc:3-15 (Cloudflare Worker `mf-angular-ranking` publishing `./dist/ranking/browser`); ranking/public/_headers:1-2 (CORS `*`) | Yes | Own Angular workspace with its own package, entry, build target and hosting configuration, served on port 4202 (ranking/angular.json:93). |
| shell | shell/angular.json;shell/federation.config.js;shell/package.json | shell/package.json:1-41 (own package `shell`) | shell/angular.json:46 (`browser: src/main.ts`); shell/src/main.ts:3-5 (`initFederation('federation.manifest.json')` and `import('./bootstrap')`); shell/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | shell/angular.json:16-29 (`build` target, builder `@angular-architects/native-federation:build` over the `esbuild` target, shell/angular.json:43-44 `@angular/build:application`); shell/package.json:7 (`ng build`) | — | shell/wrangler.jsonc:3-15 (Cloudflare Worker `mf-angular-shell` publishing `./dist/shell/browser`) | Yes | Own Angular workspace with its own package, entry, build target and hosting configuration, served on port 4200 (shell/angular.json:93). |

## Summary

Frontend applications in the snapshot: 3 (athletes, ranking, shell).

## Notes

- Each `angular.json` declares a single project (`athletes/angular.json:8-9`, `ranking/angular.json:8-9`, `shell/angular.json:8-9`), with empty `root`; no `package.json` has `workspaces`, and there is no `package.json` or workspace configuration at the snapshot root (only `.gitignore`, `athletes/`, `ranking/` and `shell/`).
- Each directory’s `wrangler.jsonc` is not among the `ops-*` occurrences in `matches.csv` (which only contains the two remotes’ `_headers`); it was recorded in the Deploy column as hosting configuration read in the snapshot. There is no Dockerfile or CI.
- N = 3 matches the classification’s `frontend_units: 3`.

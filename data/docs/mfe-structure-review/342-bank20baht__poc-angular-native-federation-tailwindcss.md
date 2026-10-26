---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| host | host/angular.json;host/federation.config.js;host/package.json | host/package.json:1-55 (own package `host`) | host/angular.json:60 (`browser: src/main.ts`); host/src/main.ts:3-7 (`initFederation` with the remote and `import('./bootstrap')`); host/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | host/angular.json:16-29 (`build` target, builder `@angular-architects/native-federation:build` over the `esbuild` target, host/angular.json:57-58 `@angular/build:application`); host/package.json:7 (`ng build`) | — | — | Yes | Own Angular workspace with its own package, entry and build target, served on port 4200 (host/angular.json:111). |
| remote | remote/angular.json;remote/federation.config.js;remote/package.json | remote/package.json:1-55 (own package `remote`) | remote/angular.json:61 (`browser: src/main.ts`); remote/src/main.ts:3-6 (`initFederation()` and `import('./bootstrap')`); remote/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | remote/angular.json:16-31 (`build` target, builder `@angular-architects/native-federation:build` over the `esbuild` target, remote/angular.json:58-59 `@angular/build:application`); remote/package.json:7 (`ng build`) | — | — | Yes | Own Angular workspace with its own package, entry and build target, served on port 4201 (remote/angular.json:108). |

## Summary

Frontend applications in the snapshot: 2 (host, remote).

## Notes

- Each `angular.json` declares a single project (host/angular.json:8-9 `host`; remote/angular.json:8-9 `remote`), with empty `root`; there is no workspace grouping the two directories. The snapshot root has only `.gitignore`, `README.md`, `host/` and `remote/`.
- There is no Dockerfile, CI or hosting configuration in the snapshot.
- N = 2 matches the classification’s `frontend_units: 2`.
- `host/src/styles.css:4` makes the host’s Tailwind scan `../../remote/src/**`; this is CSS generation in the host build, neither entry nor build for the remote, and does not change the rows above. Its effect on classification is the classification’s open point, not this stage’s.

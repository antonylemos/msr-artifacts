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

## Workspace

angular.json:5 (`projects`) with three projects: angular.json:6 and angular.json:13 (host-app, `root: projects/host-app`); angular.json:119 and angular.json:126 (customer-app, `root: projects/customer-app`); angular.json:232 and angular.json:239 (orders-app, `root: projects/orders-app`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json | package.json:1-10 (workspace manifest, script `build` = `ng build`) | — | — | — | — | No | Angular coordination root; the targets belong to the three applications in projects/, with no UI of its own at the root. |
| projects/customer-app | projects/customer-app/federation.config.js | — | angular.json:175 (`browser` customer-app); projects/customer-app/src/main.ts:1-6 (loads bootstrap); projects/customer-app/src/bootstrap.ts:1-6 (starts the UI) | angular.json:130-142 (customer-app `build` target, native-federation); angular.json:172-175 (`esbuild` target, `@angular/build:application`) | angular.json:119 and angular.json:126 (customer-app project) | — | Yes | Angular project with its own entry and build target, without requiring a local manifest. |
| projects/host-app | projects/host-app/federation.config.js | — | angular.json:62 (`browser` host-app); projects/host-app/src/main.ts:1-8 (loads bootstrap); projects/host-app/src/bootstrap.ts:1-6 (starts the UI) | angular.json:17-29 (host-app `build` target, native-federation); angular.json:59-62 (`esbuild` target, `@angular/build:application`) | angular.json:6 and angular.json:13 (host-app project) | — | Yes | Angular project with its own entry and build target, without requiring a local manifest. |
| projects/orders-app | projects/orders-app/federation.config.js | — | angular.json:288 (`browser` orders-app); projects/orders-app/src/main.ts:1-6 (loads bootstrap); projects/orders-app/src/bootstrap.ts:1-6 (starts the UI) | angular.json:243-255 (orders-app `build` target, native-federation); angular.json:285-288 (`esbuild` target, `@angular/build:application`) | angular.json:232 and angular.json:239 (orders-app project) | — | Yes | Angular project with its own entry and build target, without requiring a local manifest. |

## Summary

Frontend applications in the snapshot: 3 (projects/customer-app, projects/host-app, projects/orders-app).

## Notes

- N matches the classification’s `frontend_units: 3`.
- No `Dockerfile`, CI or hosting configuration in the snapshot, and no `ws-*`, `ops-*` or `ci-*` occurrences in matches.csv; the applications are separated only by angular.json targets and ports.
- The `assets` of each `esbuild` target point to `projects/<app>/public` (e.g., angular.json:67-68), a directory missing from the snapshot; this does not affect entry or build.

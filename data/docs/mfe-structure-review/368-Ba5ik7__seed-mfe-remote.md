---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 368 — Ba5ik7/seed-mfe-remote

## Workspace

angular.json:5 (`projects`) with two projects: angular.json:6 and angular.json:13 (seed-mfe-remote, `root: projects/seed-mfe-remote`); angular.json:111 and angular.json:118 (demo, `root: projects/demo`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json | package.json:1-41 (single workspace manifest, script `build` = `ng build` in package.json:7) | — | — | — | — | No | Angular workspace coordination root; the targets belong to the two projects in projects/, with no UI of its own at the root. |
| projects/demo | projects/demo/webpack.config.js;projects/demo/webpack.prod.config.js | — | angular.json:143 (`main: projects/demo/src/main.ts`); angular.json:126 (`index: projects/demo/src/index.html`); projects/demo/src/main.ts:1-2 (loads bootstrap); projects/demo/src/bootstrap.ts:5-6 (`bootstrapApplication(AppComponent, appConfig)`) | angular.json:122-125 (`build` target with `ngx-build-plus:browser`, `outputPath: dist/demo`); angular.json:144 (`extraWebpackConfig: projects/demo/webpack.config.js`); angular.json:162 (`webpack.prod.config.js` in production); angular.json:172-173 and :185 (`serve` target, port 4201) | angular.json:111 and angular.json:118 (demo project) | — | Yes | Angular project (host) with its own entry and build target, without requiring a local manifest. |
| projects/seed-mfe-remote | projects/seed-mfe-remote/webpack.config.js;projects/seed-mfe-remote/webpack.prod.config.js | — | angular.json:38 (`main: projects/seed-mfe-remote/src/main.ts`); angular.json:21 (`index: projects/seed-mfe-remote/src/index.html`); projects/seed-mfe-remote/src/main.ts:1-2 (loads bootstrap); projects/seed-mfe-remote/src/bootstrap.ts:5-6 (`bootstrapApplication(AppRemoteComponent, appConfig)`) | angular.json:17-20 (`build` target with `ngx-build-plus:browser`, `outputPath: dist/seed-mfe-remote`); angular.json:39 (`extraWebpackConfig: projects/seed-mfe-remote/webpack.config.js`); angular.json:57 (`webpack.prod.config.js` in production); angular.json:67-68 and :80 (`serve` target, port 4202) | angular.json:6 and angular.json:13 (seed-mfe-remote project) | — | Yes | Angular project (remote) with its own entry and build target, without requiring a local manifest. |

## Summary

Frontend applications in the snapshot: 2 (projects/demo, projects/seed-mfe-remote).

## Notes

- N matches the classification’s `frontend_units: 2`.
- No `Dockerfile`, CI or hosting configuration in the snapshot, and no `ws-*`, `ops-*` or `ci-*` occurrences in matches.csv; the two projects are separated only by angular.json targets, `outputPath` and ports.
- The `assets` of each `build` target point to `projects/<app>/public` (angular.json:30 and angular.json:135), a directory missing from the snapshot; this does not affect entry or build.

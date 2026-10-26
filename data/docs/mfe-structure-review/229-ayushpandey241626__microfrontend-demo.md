---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 229 — ayushpandey241626/microfrontend-demo

## Workspace

angular.json:5 (`projects` with four projects): angular.json:6 (host-app), angular.json:107 (mfe1), angular.json:208 (mfe2), angular.json:309 (login-mfe-app).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json | package.json:1-45 (single workspace manifest) | — | — | — | — | No | Angular workspace coordination root; the targets belong to the four projects in projects/, with no UI of its own at the root. |
| projects/host-app | projects/host-app/webpack.config.js;projects/host-app/webpack.prod.config.js | — | angular.json:34 (`main: projects/host-app/src/main.ts`); angular.json:17 (`index`); projects/host-app/src/main.ts:1 (loads bootstrap); projects/host-app/src/bootstrap.ts:5 (starts the UI) | angular.json:13-14 (`build` target with `ngx-build-plus:browser`); angular.json:35 (`extraWebpackConfig: projects/host-app/webpack.config.js`) | angular.json:6 (host-app project) | — | Yes | Angular project with its own entry and build target. |
| projects/login-mfe-app | projects/login-mfe-app/webpack.config.js;projects/login-mfe-app/webpack.prod.config.js | — | angular.json:341 (`main: projects/login-mfe-app/src/main.ts`); angular.json:324 (`index`); projects/login-mfe-app/src/main.ts:1 (loads bootstrap); projects/login-mfe-app/src/bootstrap.ts:5 (starts the UI) | angular.json:320-321 (`build` target with `ngx-build-plus:browser`); angular.json:342 (`extraWebpackConfig: projects/login-mfe-app/webpack.config.js`) | angular.json:309 (login-mfe-app project) | — | Yes | Angular project with its own entry and build target. |
| projects/mfe1 | projects/mfe1/webpack.config.js;projects/mfe1/webpack.prod.config.js | — | angular.json:135 (`main: projects/mfe1/src/main.ts`); angular.json:118 (`index`); projects/mfe1/src/main.ts:1 (loads bootstrap); projects/mfe1/src/bootstrap.ts:5 (starts the UI) | angular.json:114-115 (`build` target with `ngx-build-plus:browser`); angular.json:136 (`extraWebpackConfig: projects/mfe1/webpack.config.js`) | angular.json:107 (mfe1 project) | — | Yes | Angular project with its own entry and build target. |
| projects/mfe2 | projects/mfe2/webpack.config.js;projects/mfe2/webpack.prod.config.js | — | angular.json:236 (`main: projects/mfe2/src/main.ts`); angular.json:219 (`index`); projects/mfe2/src/main.ts:1 (loads bootstrap); projects/mfe2/src/bootstrap.ts:5 (starts the UI) | angular.json:215-216 (`build` target with `ngx-build-plus:browser`); angular.json:237 (`extraWebpackConfig: projects/mfe2/webpack.config.js`) | angular.json:208 (mfe2 project) | — | Yes | Angular project with its own entry and build target. |

## Summary

Frontend applications in the snapshot: 4 (projects/host-app, projects/login-mfe-app, projects/mfe1, projects/mfe2).

## Notes

- N = 4 matches the classification’s `frontend_units: 4`; there are no external units.
- No `ws-*`, `ops-*` or `ci-*` occurrence in `matches.csv`, and no Dockerfile, workflow or hosting configuration in the snapshot. The `tsconfig*.json` files marked as `workspace-config` in `artifacts.csv` do not declare a workspace.
- Each project also has its own `serve` target with a fixed port: angular.json:76 (4200), :177 (4201), :278 (4202), :383 (4203).

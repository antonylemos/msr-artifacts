---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 017 — a-kelen/mfe

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-7 (own manifest) | packages/auth/src/index.js:1 (webpack entry); packages/auth/src/bootstrap.js:7-16 (mounts the UI); packages/auth/config/webpack.common.js:25-26 (build entry or template) | packages/auth/package.json:6 (production `webpack --config`); packages/auth/config/webpack.prod.js:1-10 (own configuration) | — | .github/workflows/auth.yml:10-23 (job in the application directory); .github/workflows/auth.yml:26 (publishes dist under its own prefix) | Yes | Application with its own entry, webpack build and workflow. |
| packages/auth/config | packages/auth/config/webpack.common.js;packages/auth/config/webpack.dev.js;packages/auth/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for packages/auth; does not constitute a separate application. |
| packages/container | packages/container/package.json | packages/container/package.json:1-7 (own manifest) | packages/container/src/index.js:1 (webpack entry); packages/container/src/bootstrap.js:1-5 (mounts the UI); packages/container/config/webpack.common.js:25-26 (build entry or template) | packages/container/package.json:6 (production `webpack --config`); packages/container/config/webpack.prod.js:1-10 (own configuration) | — | .github/workflows/container.yml:10-23 (job in the application directory); .github/workflows/container.yml:28 (publishes dist under its own prefix) | Yes | Application with its own entry, webpack build and workflow. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for packages/container; does not constitute a separate application. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-7 (own manifest) | packages/dashboard/src/index.js:1 (webpack entry); packages/dashboard/src/bootstrap.js:4-12 (mounts the UI); packages/dashboard/config/webpack.common.js:5 (build entry or template) | packages/dashboard/package.json:6 (production `webpack --config`); packages/dashboard/config/webpack.prod.js:1-10 (own configuration) | — | .github/workflows/dashboard.yml:10-23 (job in the application directory); .github/workflows/dashboard.yml:26 (publishes dist under its own prefix) | Yes | Application with its own entry, webpack build and workflow. |
| packages/dashboard/config | packages/dashboard/config/webpack.common.js;packages/dashboard/config/webpack.dev.js;packages/dashboard/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for packages/dashboard; does not constitute a separate application. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-7 (own manifest) | packages/marketing/src/index.js:1 (webpack entry); packages/marketing/src/bootstrap.js:6-15 (mounts the UI); packages/marketing/config/webpack.common.js:25-26 (build entry or template) | packages/marketing/package.json:6 (production `webpack --config`); packages/marketing/config/webpack.prod.js:1-10 (own configuration) | — | .github/workflows/marketing.yml:10-23 (job in the application directory); .github/workflows/marketing.yml:26 (publishes dist under its own prefix) | Yes | Application with its own entry, webpack build and workflow. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for packages/marketing; does not constitute a separate application. |

## Summary

Frontend applications in the snapshot: 4 (packages/auth, packages/container, packages/dashboard, packages/marketing).

## Notes

- The grouping under packages/ does not declare a package manager workspace. The workflows use each application as working-directory.
- The packages/<app>/config rows belong to the applications above and do not receive their characteristics as though they were new units.

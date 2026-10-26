---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 046 — pgarr/microfrontend-template

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| auth | auth/package.json | auth/package.json:1-7 (own manifest) | auth/src/index.js:1 (webpack entry); auth/src/bootstrap.js:20-21 (mounts the UI) | auth/config/webpack.prod.js:1-10 (own configuration); auth/package.json:6 (`webpack --config config/webpack.prod.js`) | — | .github/workflows/auth.yml:9-20 (build in the application directory); .github/workflows/auth.yml:23 (publishes dist under its own prefix) | Yes | Application with its own entry, webpack build and workflow. |
| auth/config | auth/config/webpack.common.js;auth/config/webpack.dev.js;auth/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for auth; not a separate application. |
| container | container/package.json | container/package.json:1-7 (own manifest) | container/src/index.js:1 (webpack entry); container/src/bootstrap.js:5-6 (mounts the UI) | container/config/webpack.prod.js:1-10 (own configuration); container/package.json:6 (`webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:9-20 (build in the application directory); .github/workflows/container.yml:25 (publishes dist under its own prefix) | Yes | Application with its own entry, webpack build and workflow. |
| container/config | container/config/webpack.common.js;container/config/webpack.dev.js;container/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for container; not a separate application. |
| dashboard | dashboard/package.json | dashboard/package.json:1-7 (own manifest) | dashboard/src/index.js:1 (webpack entry); dashboard/src/bootstrap.js:5-8 (mounts the UI) | dashboard/config/webpack.prod.js:1-10 (own configuration); dashboard/package.json:6 (`webpack --config config/webpack.prod.js`) | — | .github/workflows/dashboard.yml:9-20 (build in the application directory); .github/workflows/dashboard.yml:23 (publishes dist under its own prefix) | Yes | Application with its own entry, webpack build and workflow. |
| dashboard/config | dashboard/config/webpack.common.js;dashboard/config/webpack.dev.js;dashboard/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for dashboard; not a separate application. |
| marketing | marketing/package.json | marketing/package.json:1-7 (own manifest) | marketing/src/index.js:1 (webpack entry); marketing/src/bootstrap.js:20-21 (mounts the UI) | marketing/config/webpack.prod.js:1-10 (own configuration); marketing/package.json:6 (`webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:9-20 (build in the application directory); .github/workflows/marketing.yml:23 (publishes dist under its own prefix) | Yes | Application with its own entry, webpack build and workflow. |
| marketing/config | marketing/config/webpack.common.js;marketing/config/webpack.dev.js;marketing/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for marketing; not a separate application. |

## Summary

Frontend applications in the snapshot: 4 (auth, container, dashboard, marketing).

## Notes

- The four applications are sibling directories, with no package manager workspace declaration. Each workflow defines working-directory and publishes under its own prefix.
- The config rows are parts of the applications and do not receive their builds or entries as their own characteristics.

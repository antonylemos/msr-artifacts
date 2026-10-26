---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 253 — jangrohit/micro-front-end

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-6 (manifest and test script only) | — | — | — | — | No | Manifest and lockfile only; there is no UI code, application entry or build in the snapshot. |
| packages/container | packages/container/package.json | packages/container/package.json:1-7 (own manifest) | packages/container/src/index.js:1 (conventional webpack entry, no `entry` in configuration); packages/container/src/bootstrap.js:5 (mounts React at `#_container-dev-root`); packages/container/config/webpack.common.js:19-21 (template `./public/index.html`) | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:1-29 (own configuration) | — | .github/workflows/container.yml:8-13 (trigger and working-directory in `packages/container`); .github/workflows/container.yml:30-31 (`npm run build`); .github/workflows/container.yml:36 (publishes dist to `/container/latest`) | Yes | Application with its own entry, webpack build and workflow. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for packages/container; does not constitute a separate application. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-7 (own manifest) | — (no `src/` in the directory) | — (packages/dashboard/package.json:6 `webpack --config config/webpack.prod.js`, but `config/` does not exist in the snapshot) | — | — | No | Manifest and lockfile only; the build script points to missing configuration and there is neither UI code nor entry. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-7 (own manifest) | packages/marketing/src/index.js:1 (conventional webpack entry, no `entry` in configuration); packages/marketing/src/bootstrap.js:5-14 (`mount` and standalone mounting in development); packages/marketing/config/webpack.common.js:19-21 (template `./public/index.html`) | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:1-29 (own configuration) | — | .github/workflows/marketing.yml:8-13 (trigger and working-directory in `packages/marketing`); .github/workflows/marketing.yml:30-31 (`npm run build`); .github/workflows/marketing.yml:34 (publishes dist to `/marketing/latest`) | Yes | Application with its own entry, webpack build and workflow. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Build configurations for packages/marketing; does not constitute a separate application. |

## Summary

Frontend applications in the snapshot: 2 (packages/container, packages/marketing).

## Notes

- The grouping under `packages/` does not declare a workspace: there is no `package.json` at the root and none of the four manifests has `workspaces`. The workflows use each application as working-directory.
- `packages/dashboard/package.json:5-6` declares `start` and `build` with `config/webpack.dev.js` and `config/webpack.prod.js`, missing from the snapshot; with neither entry nor build configuration, the row remains `No` (manifest and lockfile only). `Undetermined` would not change the summary count either.
- The count (2) matches the classification’s `frontend_units: 2`.

---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json;webpack.dev.config.js;webpack.prod.config.js | package.json | src/index.jsx:41 (`src/index.*` convention of `createConfig` from `@openedx/frontend-build`, no `entry` declared in the snapshot; `createRoot(document.getElementById('root'))`); public/index.html:17 (template with `<div id="root">`) | webpack.prod.config.js:2-5 (`createConfig('webpack-prod')` from `@openedx/frontend-build`); webpack.dev.config.js:2-4 (`createConfig('webpack-dev')`); package.json:13 (`fedx-scripts webpack`) | — | .github/workflows/validate.yml:17 (`make validate.ci`, which runs `npm run build` in Makefile:60) | Yes | The snapshot’s only application (the Learning MFE, React), with its own entry and build |
| public | public/index.html | — | — | — | — | — | No | Part of unit `.`: `public/index.html` is the HTML template for the root build, and webpack.prod.config.js:8-15 copies `public/static` to `dist/static` |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 2`: this application and the Discussions MFE, which is outside the snapshot and only enters through `<iframe>` with the URL `DISCUSSIONS_MFE_BASE_URL`.
- The `entry` and use of `public/index.html` come from the default configuration of `@openedx/frontend-build` (external package, outside the snapshot); the snapshot only shows the `createConfig` call and the files in conventional locations.
- The only `ws-*` in `matches.csv` is `ws-path-alias` in tsconfig.json:6 (`paths` with `@src/*`), an import alias, not a workspace declaration.
- The `validate.yml` workflow runs tests, lint and build in CI, without publishing a deployment artifact; the other workflows (`ci-workflow-file`) manage issues, commitlint and lockfile. `catalog-info.yaml` is catalog metadata, not deployment.

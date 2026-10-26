---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 216 — fi-x64/mfe

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-29 (own package `auth`) | — | — (packages/auth/package.json:4-6 has only the default `test` script; no build configuration in the directory) | — | — | No | Only `package.json` and lockfile, with neither entry nor build. |
| packages/container | packages/container/package.json | packages/container/package.json:1-30 (own package `container`) | packages/container/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); packages/container/src/bootstrap.js:5 (mounts React at `#root`); packages/container/config/webpack.common.js:20-22 (template `./public/index.html`) | packages/container/config/webpack.dev.js:7-29 (development configuration, port 8080); packages/container/config/webpack.prod.js:8-25 (production configuration); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:7-26 (triggered by `packages/container/**`, `npm run build` in `packages/container` and `aws s3 sync dist …/container/latest`) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/container build; not a separate application. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-33 (own package `dashboard`) | — | — (packages/dashboard/package.json:4-6 has only the default `test` script; no build configuration in the directory) | — | — | No | Only `package.json` and lockfile, with neither entry nor build. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-30 (own package `marketing`) | packages/marketing/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); packages/marketing/src/bootstrap.js:12-17 (in development, mounts React at `#_marketing-dev-root`); packages/marketing/config/webpack.dev.js:24-26 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-30 (development configuration, port 8081); packages/marketing/config/webpack.prod.js:6-24 (production configuration); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:7-24 (triggered by `packages/marketing/**`, `npm run build` in `packages/marketing` and `aws s3 sync dist …/marketing/latest`) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/marketing build; not a separate application. |

## Summary

Frontend applications in the snapshot: 2 (packages/container, packages/marketing).

## Notes

- There is no `package.json` at the root. `artifacts.csv` marks the four `package.json` files as `workspace-config`, but none declares `workspaces`, `matches.csv` has no `ws-*` occurrences and there is no other workspace file in the snapshot.
- No webpack configuration declares `entry`; the cited entries are webpack’s `src/index.*` convention.
- `packages/auth` and `packages/dashboard` have only `package.json` and `package-lock.json`; the React/webpack (auth) and Vue/webpack (dashboard) dependencies are only declared.
- Deployment was checked through the `ops-hosting` and `ci-path-trigger` occurrences in `matches.csv` and the workflows opened in the snapshot.
- The count of 2 matches the classification’s `frontend_units`.

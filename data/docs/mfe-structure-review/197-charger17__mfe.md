---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 197 — charger17/mfe

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-30 (own package `auth`) | packages/auth/src/index.js:1 (conventional webpack entry, `import ('./bootstrap.js')`); packages/auth/src/bootstrap.js:27-33 (in development, mounts React at `#_auth-dev-root`); packages/auth/config/webpack.dev.js:27-29 (template `./public/index.html`) | packages/auth/config/webpack.dev.js:7-31 (development configuration, port 8082); packages/auth/config/webpack.prod.js:6-22 (production configuration); packages/auth/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/auth.yml:7-8 (triggered by `packages/auth/**`); .github/workflows/auth.yml:13 (`working-directory: packages/auth`); .github/workflows/auth.yml:29-30 (`npm run build`); .github/workflows/auth.yml:49-52 (`aws s3 sync dist …/auth/latest` and CloudFront invalidation) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/auth/config | packages/auth/config/webpack.common.js;packages/auth/config/webpack.dev.js;packages/auth/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/auth build; not a separate application. |
| packages/container | packages/container/package.json | packages/container/package.json:1-30 (own package `container`) | packages/container/src/index.js:1 (conventional webpack entry, `import ('./bootstrap')`); packages/container/src/bootstrap.js:5-8 (mounts React at `#root`); packages/container/config/webpack.common.js:19-23 (template `./public/index.html`) | packages/container/config/webpack.dev.js:6-28 (development configuration, port 8080); packages/container/config/webpack.prod.js:8-25 (production configuration); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:7-8 (triggered by `packages/container/**`); .github/workflows/container.yml:13 (`working-directory: packages/container`); .github/workflows/container.yml:29-32 (`npm run build` with `PRODUCTION_DOMAIN`); .github/workflows/container.yml:50-54 (`aws s3 sync dist …/container/latest` and CloudFront invalidation) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/container build; not a separate application. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-34 (own package `dashboard`) | packages/dashboard/config/webpack.common.js:4 (`entry: "./src/index.js"`); packages/dashboard/src/index.js:1 (`import ('./bootstrap.js')`); packages/dashboard/src/bootstrap.js:9-15 (in development, mounts Vue at `#_dashboard-dev-root`); packages/dashboard/config/webpack.dev.js:30-32 (template `./public/index.html`) | packages/dashboard/config/webpack.dev.js:7-34 (development configuration, port 8083); packages/dashboard/config/webpack.prod.js:6-22 (production configuration); packages/dashboard/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/dashboard.yml:7-8 (triggered by `packages/dashboard/**`); .github/workflows/dashboard.yml:13 (`working-directory: packages/dashboard`); .github/workflows/dashboard.yml:30 (`npm run build`); .github/workflows/dashboard.yml:49-52 (`aws s3 sync dist …/dashboard/latest` and CloudFront invalidation) | Yes | Vue application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/dashboard/config | packages/dashboard/config/webpack.common.js;packages/dashboard/config/webpack.dev.js;packages/dashboard/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/dashboard build; not a separate application. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-30 (own package `marketing`) | packages/marketing/src/index.js:1 (conventional webpack entry, `import ('./bootstrap.js')`); packages/marketing/src/bootstrap.js:28-34 (in development, mounts React at `#_marketing-feed-dev-root`); packages/marketing/config/webpack.dev.js:27-29 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-31 (development configuration, port 8081); packages/marketing/config/webpack.prod.js:6-22 (production configuration); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:7-8 (triggered by `packages/marketing/**`); .github/workflows/marketing.yml:13 (`working-directory: packages/marketing`); .github/workflows/marketing.yml:30 (`npm run build`); .github/workflows/marketing.yml:49-52 (`aws s3 sync dist …/marketing/latest` and CloudFront invalidation) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/marketing build; not a separate application. |

## Summary

Frontend applications in the snapshot: 4 (packages/auth, packages/container, packages/dashboard, packages/marketing).

## Notes

- There is no `package.json` at the root. `artifacts.csv` marks the four `package.json` files as `workspace-config`, but none declares `workspaces` (grep in the snapshot), `matches.csv` has no `ws-*` occurrences and there is no other workspace file.
- Only `packages/dashboard/config/webpack.common.js:4` declares `entry`; in the other three `Yes` rows the cited entry is webpack’s `src/index.*` convention.
- In `auth`, `dashboard` and `marketing`, `HtmlWebpackPlugin` is only in `webpack.dev.js`; `webpack.prod.js` generates `remoteEntry.js` without its own page. These remotes’ standalone UI starts through the development `mount` in `bootstrap.js`.
- The count of 4 matches the classification’s `frontend_units`.

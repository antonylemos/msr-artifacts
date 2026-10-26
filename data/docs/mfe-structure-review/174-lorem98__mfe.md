---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 174 — lorem98/mfe

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-30 (own package `auth`) | packages/auth/src/index.js:4 (conventional webpack entry, `import("./bootstrap")`); packages/auth/src/bootstrap.js:48-53 (in development, mounts React at `#_auth-dev-root`); packages/auth/config/webpack.common.js:19-23 (template `./public/index.html`) | packages/auth/config/webpack.dev.js:6-25 (development configuration, port 8082); packages/auth/config/webpack.prod.js:8-24 (production configuration); packages/auth/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/auth.yml:7-26 (triggered by `packages/auth/**`, `npm run build` in `./packages/auth` and `aws s3 sync dist …/auth/latest`) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/auth/config | packages/auth/config/webpack.common.js;packages/auth/config/webpack.dev.js;packages/auth/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/auth build; not a separate application. |
| packages/container | packages/container/package.json | packages/container/package.json:1-31 (own package `container`) | packages/container/src/index.js:1 (conventional webpack entry, `import("./bootstrap")`); packages/container/src/bootstrap.js:5 (mounts React at `#root`); packages/container/config/webpack.common.js:19-23 (template `./public/index.html`) | packages/container/config/webpack.dev.js:6-25 (development configuration, port 8080); packages/container/config/webpack.prod.js:8-25 (production configuration); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:7-26 (triggered by `packages/container/**`, `npm run build` in `./packages/container` and `aws s3 sync dist …/container/latest`) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/container build; not a separate application. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-34 (own package `dashboard`) | packages/dashboard/src/index.js:3 (conventional webpack entry, `import("./bootstrap")`); packages/dashboard/src/bootstrap.js:26-32 (in development, mounts Vue at `#_dashboard-dev-root`); packages/dashboard/config/webpack.dev.js:31-33 (template `./public/index.html`) | packages/dashboard/config/webpack.dev.js:7-35 (development configuration, port 8083); packages/dashboard/config/webpack.prod.js:8-29 (production configuration); packages/dashboard/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/dashboard.yml:7-26 (triggered by `packages/dashboard/**`, `npm run build` in `./packages/dashboard` and `aws s3 sync dist …/dashboard/latest`) | Yes | Vue application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/dashboard/config | packages/dashboard/config/webpack.common.js;packages/dashboard/config/webpack.dev.js;packages/dashboard/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/dashboard build; not a separate application. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-30 (own package `marketing`) | packages/marketing/src/index.js:1 (conventional webpack entry, `import("./bootstrap")`); packages/marketing/src/bootstrap.js:34-41 (in development, mounts React at `#_marketing-dev-root`); packages/marketing/config/webpack.dev.js:24-26 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-28 (development configuration, port 8081); packages/marketing/config/webpack.prod.js:6-22 (production configuration); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:7-24 (triggered by `packages/marketing/**`, `npm run build` in `./packages/marketing` and `aws s3 sync dist …/marketing/latest`) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/marketing build; not a separate application. |

## Summary

Frontend applications in the snapshot: 4 (packages/auth, packages/container, packages/dashboard, packages/marketing).

## Notes

- There is no `package.json` at the root. `artifacts.csv` marks the four `package.json` files as `workspace-config`, but none declares `workspaces`, `matches.csv` has no `ws-*` occurrences and there is no other workspace file in the snapshot.
- No webpack configuration declares `entry`; the cited entries are webpack’s `src/index.*` convention.
- `matches.csv` has 13 `ops-hosting` (8 in the four workflows in .github/workflows/ and 5 in README.md) and 8 `ci-*` (4 `ci-workflow-file` and 4 `ci-path-trigger`, in those same workflows); the four deployment workflows were found through `artifacts.csv` (`ci-workflow`) and opened in the snapshot.
- The `config` directories belong to the packages immediately above them; they do not inherit their entries or builds as their own characteristics.
- The count of 4 matches the classification’s `frontend_units`.

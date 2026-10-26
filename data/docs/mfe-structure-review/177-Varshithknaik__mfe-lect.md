---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 177 — Varshithknaik/mfe-lect

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| auth | auth/package.json | auth/package.json:1-33 (own package `auth`) | auth/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); auth/src/bootstrap.js:36-41 (in development, mounts React at `#_auth-dev-root`); auth/config/webpack.common.js:20-22 (template `./public/index.html`) | auth/config/webpack.dev.js:6-29 (development configuration, port 8082); auth/config/webpack.prod.js:6-24 (production configuration); auth/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/auth.yml:7-28 (triggered by `auth/**`, `npm run build` in `auth`, `aws s3 sync dist …/auth/latest` and CloudFront invalidation) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| auth/config | auth/config/webpack.common.js;auth/config/webpack.dev.js;auth/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the auth build; not a separate application. |
| container | container/package.json | container/package.json:1-32 (own package `container`) | container/src/index.js:1 (conventional webpack entry, `import("./bootstrap")`); container/src/bootstrap.js:5-6 (mounts React at `#root`); container/config/webpack.common.js:20-22 (template `./public/index.html`) | container/config/webpack.dev.js:6-29 (development configuration, port 8080); container/config/webpack.prod.js:8-27 (production configuration); container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/container.yml:7-30 (triggered by `container/**`, `npm run build` in `container`, `aws s3 sync dist …/container/latest` and CloudFront invalidation) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| container/config | container/config/webpack.common.js;container/config/webpack.dev.js;container/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the container build; not a separate application. |
| dashboard | dashboard/package.json | dashboard/package.json:1-34 (own package `dashboard`) | — | — (dashboard/package.json:5-6 calls `config/webpack.dev.js` and `config/webpack.prod.js`, missing from the snapshot) | — | — | No | Only `package.json` and `package-lock.json`, with neither entry nor build configuration in the directory. |
| marketing | marketing/package.json | marketing/package.json:1-33 (own package `marketing`) | marketing/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); marketing/src/bootstrap.js:33-38 (in development, mounts React at `#_marketing-dev-root`); marketing/config/webpack.common.js:20-22 (template `./public/index.html`) | marketing/config/webpack.dev.js:6-29 (development configuration, port 8081); marketing/config/webpack.prod.js:6-24 (production configuration); marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | .github/workflows/marketing.yml:7-28 (triggered by `marketing/**`, `npm run build` in `marketing`, `aws s3 sync dist …/marketing/latest` and CloudFront invalidation) | Yes | React application with its own entry, webpack builds referenced by the scripts and its own deployment. |
| marketing/config | marketing/config/webpack.common.js;marketing/config/webpack.dev.js;marketing/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the marketing build; not a separate application. |
| packages/auth | packages/auth/package.json | packages/auth/package.json:1-33 (own package `auth`) | packages/auth/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); packages/auth/src/bootstrap.js:36-41 (in development, mounts React at `#_auth-dev-root`); packages/auth/config/webpack.dev.js:41-43 (template `./public/index.html`) | packages/auth/config/webpack.dev.js:7-47 (development configuration, port 8082); packages/auth/config/webpack.prod.js:6-38 (production configuration); packages/auth/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | React application with its own entry and webpack builds referenced by the scripts. |
| packages/auth/config | packages/auth/config/webpack.common.js;packages/auth/config/webpack.dev.js;packages/auth/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/auth build; not a separate application. |
| packages/container | packages/container/package.json | packages/container/package.json:1-32 (own package `container`) | packages/container/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); packages/container/src/bootstrap.js:5-6 (mounts React at `#root`); packages/container/config/webpack.common.js:20-22 (template `./public/index.html`) | packages/container/config/webpack.dev.js:6-44 (development configuration, port 8080); packages/container/config/webpack.prod.js:8-41 (production configuration); packages/container/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | React application with its own entry and webpack builds referenced by the scripts. |
| packages/container/config | packages/container/config/webpack.common.js;packages/container/config/webpack.dev.js;packages/container/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/container build; not a separate application. |
| packages/dashboard | packages/dashboard/package.json | packages/dashboard/package.json:1-34 (own package `dashboard`) | packages/dashboard/config/webpack.common.js:4 (`entry: './src/index.js'`); packages/dashboard/src/index.js:1 (`import('./bootstrap')`); packages/dashboard/src/bootstrap.js:12-17 (in development, mounts Vue at `#_dashboard-dev-root`); packages/dashboard/config/webpack.dev.js:30-32 (template `./public/index.html`) | packages/dashboard/config/webpack.dev.js:7-36 (development configuration, port 8083); packages/dashboard/config/webpack.prod.js:6-24 (production configuration); packages/dashboard/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | Vue application with its own entry and webpack builds referenced by the scripts. |
| packages/dashboard/config | packages/dashboard/config/webpack.common.js;packages/dashboard/config/webpack.dev.js;packages/dashboard/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/dashboard build; not a separate application. |
| packages/marketing | packages/marketing/package.json | packages/marketing/package.json:1-33 (own package `marketing`) | packages/marketing/src/index.js:1 (conventional webpack entry, `import('./bootstrap')`); packages/marketing/src/bootstrap.js:36-41 (in development, mounts React at `#_marketing-dev-root`); packages/marketing/config/webpack.dev.js:41-43 (template `./public/index.html`) | packages/marketing/config/webpack.dev.js:7-47 (development configuration, port 8081); packages/marketing/config/webpack.prod.js:6-38 (production configuration); packages/marketing/package.json:5-6 (`webpack serve --config config/webpack.dev.js`, `webpack --config config/webpack.prod.js`) | — | — | Yes | React application with its own entry and webpack builds referenced by the scripts. |
| packages/marketing/config | packages/marketing/config/webpack.common.js;packages/marketing/config/webpack.dev.js;packages/marketing/config/webpack.prod.js | — | — | — | — | — | No | Configuration directory used by the packages/marketing build; not a separate application. |

## Summary

Frontend applications in the snapshot: 7 (auth, container, marketing, packages/auth, packages/container, packages/dashboard, packages/marketing).

## Notes

- There is no `package.json` at the root. `artifacts.csv` marks the eight `package.json` files as `workspace-config`, but none declares `workspaces`, `matches.csv` has no `ws-*` occurrences and there is no other workspace file in the snapshot.
- Only `packages/dashboard/config/webpack.common.js:4` declares `entry`; in the other `Yes` rows the cited entry is webpack’s `src/index.*` convention.
- The three workflows (`ops-hosting` and `ci-path-trigger` in `matches.csv`) filter and build only `auth/`, `container/` and `marketing/` at the root. No workflow covers `packages/`; `packages/container/config/webpack.prod.js:18-20` points to `…/<pacote>/latest/remoteEntry.js`, but there is no job publishing these paths from `packages/`.
- The root `dashboard/` has scripts calling webpack configurations missing from the directory; with neither entry nor build configuration, it remains `No`. The classification does not count it either.
- The `config` directories belong to the packages immediately above them; they do not inherit their entries or builds as their own characteristics.
- The count of 7 matches the classification’s `frontend_units`.

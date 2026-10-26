---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 017 — a-kelen/mfe

## Repository overview

Four applications in `packages/` (container, auth, dashboard and marketing), without a workspace or root `package.json`. Each has its own manifest, lockfile and webpack configurations (`webpack.common.js`, `webpack.dev.js` and `webpack.prod.js`). Each application’s `build` script uses the production configuration (for example: packages/auth/package.json:6), fixing a `publicPath` at `/<app>/latest/` (for example: packages/auth/config/webpack.prod.js:10). Container receives the production domain through `PRODUCTION_DOMAIN` and uses it to assemble the three remote URLs (packages/container/config/webpack.prod.js:6, 17-21).

Deployment uses **one GitHub Actions workflow per application**. Each workflow triggers only when its application folder changes (for example: .github/workflows/auth.yml:3-8), runs in that folder (.github/workflows/auth.yml:10-12), installs and builds, and syncs `dist` with prefix `<app>/latest` in a shared S3 bucket (.github/workflows/auth.yml:26). It then invalidates only the application entry file in CloudFront: `remoteEntry.js` for remotes and `index.html` for container (.github/workflows/auth.yml:32; .github/workflows/container.yml:34). All four workflows are identical except for the application name. Container’s passes `PRODUCTION_DOMAIN` to the build (.github/workflows/container.yml:22-25). Bucket, distribution and domain come from secrets, so final addresses are absent from the snapshot.

In development, each application runs its own `webpack serve`, on ports 8080 (container), 8081 (marketing), 8082 (auth) and 8084 (dashboard) (packages/container/config/webpack.dev.js:12; packages/marketing/config/webpack.dev.js:12; packages/auth/config/webpack.dev.js:12; packages/dashboard/config/webpack.dev.js:12). Dashboard enables CORS on the development server (packages/dashboard/config/webpack.dev.js:16-18).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | packages/auth | separate | separate | `s3://<bucket>/auth/latest`, served at `<domínio>/auth/latest/` (.github/workflows/auth.yml:26; packages/auth/config/webpack.prod.js:10); `http://localhost:8082` in development (packages/auth/config/webpack.dev.js:9, 12) | No | packages/auth/package.json:6 (`webpack --config config/webpack.prod.js`); packages/auth/config/webpack.prod.js:1-10 (own production configuration); .github/workflows/auth.yml:3-12 (application trigger and directory); .github/workflows/auth.yml:26 (sync to its own prefix); .github/workflows/auth.yml:32 (invalidation of `remoteEntry.js`) |
| 2 | packages/container | separate | separate | `s3://<bucket>/container/latest`, served at `<domínio>/container/latest/` (.github/workflows/container.yml:28; packages/container/config/webpack.prod.js:12); `http://localhost:8080` in development (packages/container/config/webpack.dev.js:9, 12) | No | packages/container/package.json:6 (`webpack --config ./config/webpack.prod.js`); packages/container/config/webpack.prod.js:1-27 (production configuration with remotes); .github/workflows/container.yml:3-12 (application trigger and directory); .github/workflows/container.yml:22-25 (build with `PRODUCTION_DOMAIN`); .github/workflows/container.yml:28 (sync to its own prefix); .github/workflows/container.yml:34 (invalidation of `index.html`) |
| 3 | packages/dashboard | separate | separate | `s3://<bucket>/dashboard/latest`, served at `<domínio>/dashboard/latest/` (.github/workflows/dashboard.yml:26; packages/dashboard/config/webpack.prod.js:10); `http://localhost:8084` in development (packages/dashboard/config/webpack.dev.js:9, 12) | No | packages/dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); packages/dashboard/config/webpack.prod.js:1-10 (own production configuration); .github/workflows/dashboard.yml:3-12 (application trigger and directory); .github/workflows/dashboard.yml:26 (sync to its own prefix); .github/workflows/dashboard.yml:32 (invalidation of `remoteEntry.js`) |
| 4 | packages/marketing | separate | separate | `s3://<bucket>/marketing/latest`, served at `<domínio>/marketing/latest/` (.github/workflows/marketing.yml:26; packages/marketing/config/webpack.prod.js:10); `http://localhost:8081` in development (packages/marketing/config/webpack.dev.js:9, 12) | No | packages/marketing/package.json:6 (`webpack --config ./config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:1-10 (own production configuration); .github/workflows/marketing.yml:3-12 (application trigger and directory); .github/workflows/marketing.yml:26 (sync to its own prefix); .github/workflows/marketing.yml:32 (invalidation of `remoteEntry.js`) |

## Observations

**1. packages/auth.** Own build and deployment: the workflow runs only when the folder changes and publishes only this application’s `dist`. Prefix `latest` is overwritten on every deployment, so versions do not coexist. Version `1.0.0` from package.json (packages/auth/package.json:3) does not appear in publication.

**2. packages/container.** Same arrangement. It is the only application whose build depends on the deployment environment, because remote URLs are fixed at build time from `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6, 17-21). Remotes can be republished without rebuilding container, because it always fetches them at path `latest`. Invalidating `index.html` corresponds to container being the entry page.

**3. packages/dashboard.** Same arrangement as the other remotes. Dashboard uses Vue, but the build and deployment process is the same as React applications. No version used in publication.

**4. packages/marketing.** Same arrangement as the other remotes. No version used in publication.

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 0.

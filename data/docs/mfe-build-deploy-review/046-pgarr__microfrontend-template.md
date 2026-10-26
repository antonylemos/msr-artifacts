---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
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

# 046 — pgarr/microfrontend-template

## Repository overview

Template with the same build and deployment arrangement as repository 017: four root applications (`container`, `auth`, `dashboard` and `marketing`), without a workspace, each with its own manifest, lockfile and webpack configurations. Each application’s `build` uses `config/webpack.prod.js` (for example: auth/package.json:6), fixing `publicPath` at `/<app>/latest/` (for example: auth/config/webpack.prod.js:10). Container assembles remote URLs from `PRODUCTION_DOMAIN` (container/config/webpack.prod.js:6, 17-21).

There is one GitHub Actions workflow per application. Each triggers only when the application folder changes (for example: .github/workflows/auth.yml:2-7), runs in that folder (.github/workflows/auth.yml:9-11), builds and syncs `dist` to prefix `<app>/latest` in a shared S3 bucket (.github/workflows/auth.yml:23). Then invalidates only the application entry in CloudFront (.github/workflows/auth.yml:28; .github/workflows/container.yml:30). All four workflows are identical except for the application name. Only container’s passes `PRODUCTION_DOMAIN` to build (.github/workflows/container.yml:20-22). They differ from repository 017 only in details such as AWS region coming from a secret (.github/workflows/container.yml:29). Bucket, distribution and domain come from secrets.

In development, each application runs its own `webpack serve`: container on port 8080, marketing on 8081, auth on 8082 and dashboard on 8083 (container/config/webpack.dev.js:12; marketing/config/webpack.dev.js:13; auth/config/webpack.dev.js:13; dashboard/config/webpack.dev.js:13). Dashboard enables CORS (dashboard/config/webpack.dev.js:17-19).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | auth | separate | separate | `s3://<bucket>/auth/latest`, served at `<domínio>/auth/latest/` (.github/workflows/auth.yml:23; auth/config/webpack.prod.js:10); `http://localhost:8082` in development (auth/config/webpack.dev.js:10, 13) | No | auth/package.json:6 (`webpack --config config/webpack.prod.js`); auth/config/webpack.prod.js:1-10 (own production configuration); .github/workflows/auth.yml:2-11 (application trigger and directory); .github/workflows/auth.yml:23 (sync to its own prefix); .github/workflows/auth.yml:28 (invalidation of `remoteEntry.js`) |
| 2 | container | separate | separate | `s3://<bucket>/container/latest`, served at `<domínio>/container/latest/` (.github/workflows/container.yml:25; container/config/webpack.prod.js:12); `http://localhost:8080` in development (container/config/webpack.dev.js:9, 12) | No | container/package.json:6 (`webpack --config config/webpack.prod.js`); container/config/webpack.prod.js:6-21 (production configuration with remotes); .github/workflows/container.yml:2-11 (application trigger and directory); .github/workflows/container.yml:20-22 (build with `PRODUCTION_DOMAIN`); .github/workflows/container.yml:25 (sync to its own prefix); .github/workflows/container.yml:30 (invalidation of `index.html`) |
| 3 | dashboard | separate | separate | `s3://<bucket>/dashboard/latest`, served at `<domínio>/dashboard/latest/` (.github/workflows/dashboard.yml:23; dashboard/config/webpack.prod.js:10); `http://localhost:8083` in development (dashboard/config/webpack.dev.js:10, 13) | No | dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); dashboard/config/webpack.prod.js:1-10 (own production configuration); .github/workflows/dashboard.yml:2-11 (application trigger and directory); .github/workflows/dashboard.yml:23 (sync to its own prefix); .github/workflows/dashboard.yml:28 (invalidation of `remoteEntry.js`) |
| 4 | marketing | separate | separate | `s3://<bucket>/marketing/latest`, served at `<domínio>/marketing/latest/` (.github/workflows/marketing.yml:23; marketing/config/webpack.prod.js:10); `http://localhost:8081` in development (marketing/config/webpack.dev.js:10, 13) | No | marketing/package.json:6 (`webpack --config config/webpack.prod.js`); marketing/config/webpack.prod.js:1-10 (own production configuration); .github/workflows/marketing.yml:2-11 (application trigger and directory); .github/workflows/marketing.yml:23 (sync to its own prefix); .github/workflows/marketing.yml:28 (invalidation of `remoteEntry.js`) |

## Observations

**1. auth.** Own build and deployment, triggered only by folder changes. Prefix `latest` is overwritten at each deployment, and version `1.0.0` (auth/package.json:3) does not appear in publication.

**2. container.** Same arrangement. Build depends on deployment environment because remote URLs are fixed with `PRODUCTION_DOMAIN` (container/config/webpack.prod.js:6, 17-21). Remotes can be republished without rebuilding container, because it always fetches them at `latest`.

**3. dashboard.** Same arrangement as other remotes, although it uses Vue. No version used in publication.

**4. marketing.** Same arrangement as other remotes. No version used in publication.

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 0.

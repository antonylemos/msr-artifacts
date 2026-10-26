---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
inputs:
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

## Repository overview

Monorepo without root `package.json` or workspace, with four independent webpack 5 packages in `packages/`: `container` (React shell), `marketing` and `auth` (React) and `dashboard` (Vue 3). Each package has its own `package.json`, `package-lock.json` and same two scripts: `start` runs `webpack serve` with development configuration and `build` runs `webpack` with production configuration (packages/container/package.json:4-7; packages/auth/package.json:4-7; packages/dashboard/package.json:4-7; packages/marketing/package.json:4-7). Each production configuration defines `mode: "production"`, filenames with `contenthash` and a fixed `publicPath` at prefix `/<pacote>/latest/` (packages/container/config/webpack.prod.js:8-13; packages/auth/config/webpack.prod.js:8-13; packages/dashboard/config/webpack.prod.js:8-13; packages/marketing/config/webpack.prod.js:6-11); output goes to each package’s default `dist`, ignored by git (.gitignore:2). No script triggers all four builds together.

Deploy uses one GitHub Actions workflow per package. Each triggers on push to `master` only when its package directory changes, runs there, installs, builds and synchronizes `dist` to prefix `<pacote>/latest` in an S3 bucket whose name comes from a secret, shared by all four (.github/workflows/auth.yml:3-12, 19-21, 26; .github/workflows/container.yml:26; .github/workflows/dashboard.yml:26; .github/workflows/marketing.yml:24). Then it invalidates a single prefix file in CloudFront, also in a shared distribution: `index.html` in container, auth and dashboard and `remoteEntry.js` in marketing (.github/workflows/container.yml:32; .github/workflows/auth.yml:32; .github/workflows/dashboard.yml:32; .github/workflows/marketing.yml:30). For auth and dashboard, which are remotes, invalidated file is `index.html` rather than `remoteEntry.js` loaded by container; this affects only caching, not deploy separation. Container, auth and dashboard workflows pass `PRODUCTION_DOMAIN` to build (.github/workflows/container.yml:21-23; .github/workflows/auth.yml:21-23; .github/workflows/dashboard.yml:21-23), but only container uses it, to construct remote URLs (packages/container/config/webpack.prod.js:6, 17-21); auth and dashboard read variable without using it (packages/auth/config/webpack.prod.js:6; packages/dashboard/config/webpack.prod.js:6), and marketing neither reads nor receives it (.github/workflows/marketing.yml:21).

The result is four independent publications on one domain, distinguished by prefix, matching container production URLs (`${domain}/<pacote>/latest/remoteEntry.js`, composition review, Configuration column). Bucket, distribution and domain come from secrets, so final addresses are absent from snapshot. No Dockerfile, compose or other deployment artifact is present, and no backend. README `ops-hosting` occurrences (README.md:453, 464, 477, 479, 481) describe the same S3 + CloudFront and workflow secrets; they are documentation and do not decide Deploy column.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | packages/auth | separate | separate | `s3://<bucket>/auth/latest`, served at `<domínio>/auth/latest/` (.github/workflows/auth.yml:26; packages/auth/config/webpack.prod.js:12); `http://localhost:8082` in development (packages/auth/config/webpack.dev.js:9) | No | packages/auth/package.json:6 (`webpack --config config/webpack.prod.js`); packages/auth/config/webpack.prod.js:8-23 (own production configuration, `remoteEntry.js`); .github/workflows/auth.yml:3-12 (application trigger and directory); .github/workflows/auth.yml:20-23 (installs and builds); .github/workflows/auth.yml:26 (sync to own prefix); .github/workflows/auth.yml:32 (invalidation of `index.html`) |
| 2 | packages/container | separate | separate | `s3://<bucket>/container/latest`, served at `<domínio>/container/latest/` (.github/workflows/container.yml:26; packages/container/config/webpack.prod.js:12); `http://localhost:8080` in development (packages/container/config/webpack.dev.js:9) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:6-24 (production configuration with remotes at `PRODUCTION_DOMAIN`); .github/workflows/container.yml:3-12 (application trigger and directory); .github/workflows/container.yml:20-23 (build with `PRODUCTION_DOMAIN`); .github/workflows/container.yml:26 (sync to own prefix); .github/workflows/container.yml:32 (invalidation of `index.html`) |
| 3 | packages/dashboard | separate | separate | `s3://<bucket>/dashboard/latest`, served at `<domínio>/dashboard/latest/` (.github/workflows/dashboard.yml:26; packages/dashboard/config/webpack.prod.js:12); `http://localhost:8083` in development (packages/dashboard/config/webpack.dev.js:10) | No | packages/dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); packages/dashboard/config/webpack.prod.js:8-28 (own production configuration, `remoteEntry.js`); .github/workflows/dashboard.yml:3-12 (application trigger and directory); .github/workflows/dashboard.yml:20-23 (installs and builds); .github/workflows/dashboard.yml:26 (sync to own prefix); .github/workflows/dashboard.yml:32 (invalidation of `index.html`) |
| 4 | packages/marketing | separate | separate | `s3://<bucket>/marketing/latest`, served at `<domínio>/marketing/latest/` (.github/workflows/marketing.yml:24; packages/marketing/config/webpack.prod.js:10); `http://localhost:8081` in development (packages/marketing/config/webpack.dev.js:10) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-21 (own production configuration, `remoteEntry.js`); .github/workflows/marketing.yml:3-12 (application trigger and directory); .github/workflows/marketing.yml:20-21 (installs and builds); .github/workflows/marketing.yml:24 (sync to own prefix); .github/workflows/marketing.yml:30 (invalidation of `remoteEntry.js`) |

## Observations

**1. packages/auth.** Own build with package production configuration, generating `remoteEntry.js` for remote `auth` with `publicPath` `/auth/latest/` (packages/auth/config/webpack.prod.js:12, 15-21). Workflow `deploy-auth` triggers only on changes in `packages/auth/**` and publishes only this package’s `dist` to prefix `auth/latest` (.github/workflows/auth.yml:7-8, 26), supporting `separate` deploy, although bucket and distribution are shared with other packages. Invalidates `index.html` instead of `remoteEntry.js` (.github/workflows/auth.yml:32). Receives `PRODUCTION_DOMAIN` without using it (packages/auth/config/webpack.prod.js:6). Prefix is always `latest`; version `1.0.0` (packages/auth/package.json:3) does not enter publication.

**2. packages/container.** Own build; the only one depending on `PRODUCTION_DOMAIN`, interpolated into all three remote URLs (packages/container/config/webpack.prod.js:6, 17-21) and supplied by workflow (.github/workflows/container.yml:21-23). Workflow `deploy-container` publishes only container `dist` to `container/latest` and invalidates `index.html`, shell entry page (.github/workflows/container.yml:26, 32). Remotes do not enter container artifact: they load at runtime from their prefixes, so container is published without rebuilding others. Version `1.0.0` unused in publication (packages/container/package.json:3).

**3. packages/dashboard.** Own Vue remote build, with `remoteEntry.js` and `publicPath` `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:12, 15-27). Workflow `deploy-dashboard` publishes only this package to `dashboard/latest` (.github/workflows/dashboard.yml:7-8, 26). Like auth, invalidates `index.html` rather than `remoteEntry.js` (.github/workflows/dashboard.yml:32) and receives `PRODUCTION_DOMAIN` without using it (packages/dashboard/config/webpack.prod.js:6). Version `1.0.0` unused in publication (packages/dashboard/package.json:3).

**4. packages/marketing.** Own build, with `remoteEntry.js` and `publicPath` `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10, 13-20). Workflow `deploy-marketing` publishes only this package to `marketing/latest` (.github/workflows/marketing.yml:7-8, 24) and is the only one invalidating `remoteEntry.js` (.github/workflows/marketing.yml:30); also the only one not passing `PRODUCTION_DOMAIN` to build (.github/workflows/marketing.yml:21), consistent with configuration not reading variable. Version `1.0.0` unused in publication (packages/marketing/package.json:3).

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 0.

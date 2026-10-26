---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
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

# 197 — charger17/mfe

## Repository overview

Four applications in `packages/` (auth, container, dashboard and marketing), without workspace or root `package.json`. Each has its own manifest and webpack configurations (`webpack.common.js`, `webpack.dev.js`, `webpack.prod.js`); snapshot has no lockfile because `.gitignore` excludes `**/package-lock.json` (.gitignore:5). Each application’s `build` script uses production configuration (e.g.: packages/auth/package.json:6), fixing `publicPath` at `/<app>/latest/` (e.g.: packages/auth/config/webpack.prod.js:10; packages/container/config/webpack.prod.js:12). Container receives production domain through `PRODUCTION_DOMAIN` and uses it to construct all three remote URLs (packages/container/config/webpack.prod.js:6, 17-21).

Deploy uses one GitHub Actions workflow per application. Each triggers on push to `main` when application directory changes, or manually (.github/workflows/auth.yml:3-9), runs in its directory (.github/workflows/auth.yml:11-13), installs and builds (.github/workflows/auth.yml:26-30) and synchronizes `dist` to prefix `<app>/latest` in a shared S3 bucket (.github/workflows/auth.yml:49). Then it invalidates only application entry file in CloudFront: `remoteEntry.js` for remotes and `index.html` for container (.github/workflows/auth.yml:52; .github/workflows/container.yml:54). All four workflows are identical except application name; only container workflow passes `PRODUCTION_DOMAIN` to build (.github/workflows/container.yml:29-32). Bucket, distribution and domain come from secrets, so final addresses are absent from snapshot. All four workflows publish to same bucket and distribution, but each packages and uploads only its application’s `dist`, in its own prefix.

In development, each application runs its own `webpack serve` (e.g.: packages/auth/package.json:5), on ports 8080 (container), 8081 (marketing), 8082 (auth) and 8083 (dashboard) (packages/container/config/webpack.dev.js:12; packages/marketing/config/webpack.dev.js:13; packages/auth/config/webpack.dev.js:13; packages/dashboard/config/webpack.dev.js:13). The only `ops-cors` occurrence is dashboard development server header `Access-Control-Allow-Origin: '*'` (packages/dashboard/config/webpack.dev.js:17-19), not a deployment artifact. No Dockerfile, compose or other hosting configuration exists; root `readme.txt` is empty.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | packages/auth | separate | separate | `s3://<bucket>/auth/latest`, served at `<domínio>/auth/latest/` (.github/workflows/auth.yml:49; packages/auth/config/webpack.prod.js:10); `http://localhost:8082` in development (packages/auth/config/webpack.dev.js:10, 13) | No | packages/auth/package.json:6 (`webpack --config config/webpack.prod.js`); packages/auth/config/webpack.prod.js:6-21 (own production configuration, generates `remoteEntry.js`); .github/workflows/auth.yml:3-13 (application trigger and directory); .github/workflows/auth.yml:29-30 (build); .github/workflows/auth.yml:49 (sync to own prefix); .github/workflows/auth.yml:52 (invalidation of `remoteEntry.js`) |
| 2 | packages/container | separate | separate | `s3://<bucket>/container/latest`, served at `<domínio>/container/latest/` (.github/workflows/container.yml:51; packages/container/config/webpack.prod.js:12); `http://localhost:8080` in development (packages/container/config/webpack.dev.js:9, 12) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:6-25 (production configuration with remotes); .github/workflows/container.yml:3-13 (application trigger and directory); .github/workflows/container.yml:29-32 (build with `PRODUCTION_DOMAIN`); .github/workflows/container.yml:51 (sync to own prefix); .github/workflows/container.yml:54 (invalidation of `index.html`) |
| 3 | packages/dashboard | separate | separate | `s3://<bucket>/dashboard/latest`, served at `<domínio>/dashboard/latest/` (.github/workflows/dashboard.yml:49; packages/dashboard/config/webpack.prod.js:10); `http://localhost:8083` in development (packages/dashboard/config/webpack.dev.js:10, 13) | No | packages/dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); packages/dashboard/config/webpack.prod.js:6-21 (own production configuration, generates `remoteEntry.js`); .github/workflows/dashboard.yml:3-13 (application trigger and directory); .github/workflows/dashboard.yml:29-30 (build); .github/workflows/dashboard.yml:49 (sync to own prefix); .github/workflows/dashboard.yml:52 (invalidation of `remoteEntry.js`) |
| 4 | packages/marketing | separate | separate | `s3://<bucket>/marketing/latest`, served at `<domínio>/marketing/latest/` (.github/workflows/marketing.yml:49; packages/marketing/config/webpack.prod.js:10); `http://localhost:8081` in development (packages/marketing/config/webpack.dev.js:10, 13) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-21 (own production configuration, generates `remoteEntry.js`); .github/workflows/marketing.yml:3-13 (application trigger and directory); .github/workflows/marketing.yml:29-30 (build); .github/workflows/marketing.yml:49 (sync to own prefix); .github/workflows/marketing.yml:52 (invalidation of `remoteEntry.js`) |

## Observations

**1. packages/auth.** Own build and deploy: workflow runs only when `packages/auth/**` changes (.github/workflows/auth.yml:7-8) and publishes only this application’s `dist` to prefix `auth/latest` (.github/workflows/auth.yml:49), same path container uses for remote (packages/container/config/webpack.prod.js:19). Prefix `latest` is overwritten on every deploy, so no versions coexist. Version `1.0.0` (packages/auth/package.json:3) does not appear in publication.

**2. packages/container.** Same arrangement. The only application whose build depends on deployment environment: remote URLs are fixed at build time from `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6, 17-21), injected by workflow from a secret (.github/workflows/container.yml:31-32). Because container always fetches remotes from `latest`, they can be republished without a new container build. Also the only application with its own page in production build, through `HtmlWebpackPlugin` in `webpack.common.js` (packages/container/config/webpack.common.js:19-23), matching `index.html` invalidation (.github/workflows/container.yml:54). No version used in publication (packages/container/package.json:3).

**3. packages/dashboard.** Same arrangement as other remotes, with prefix `dashboard/latest` (.github/workflows/dashboard.yml:49), matching packages/container/config/webpack.prod.js:20. Application uses Vue, with its own `entry` and loaders in `webpack.common.js` (packages/dashboard/config/webpack.common.js:1-4, 46), but build and deploy process is the same as React applications. Enabled CORS applies only to development server (packages/dashboard/config/webpack.dev.js:17-19). No version used in publication (packages/dashboard/package.json:3).

**4. packages/marketing.** Same arrangement as other remotes, with prefix `marketing/latest` (.github/workflows/marketing.yml:49), matching packages/container/config/webpack.prod.js:18. No version used in publication (packages/marketing/package.json:3).

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 0.

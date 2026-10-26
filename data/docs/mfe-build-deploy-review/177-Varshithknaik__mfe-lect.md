---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
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

# 177 — Varshithknaik/mfe-lect

## Repository overview

Module Federation learning project with webpack 5 (README.md:3-5), without root `package.json` or workspace. Each application is an isolated npm package, with the same two scripts: `start` runs `webpack serve` with development configuration and `build` runs `webpack` with production configuration (auth/package.json:5-6; container/package.json:5-6; marketing/package.json:5-6; packages/auth/package.json:5-6; packages/container/package.json:5-6; packages/dashboard/package.json:5-6; packages/marketing/package.json:5-6). Each production build generates its own application artifact, with `publicPath` `/<aplicação>/latest/` (for example auth/config/webpack.prod.js:8-11; container/config/webpack.prod.js:10-13); remotes also generate their `remoteEntry.js` (auth/config/webpack.prod.js:13-17). Development configurations use fixed ports, 8080 for container, 8081 for marketing, 8082 for auth and 8083 for dashboard (container/config/webpack.dev.js:8-12; packages/dashboard/config/webpack.dev.js:9-13); only dashboard enables CORS on development server (packages/dashboard/config/webpack.dev.js:17-19, `ops-cors` occurrence), which is not deploy.

Production deploy exists only for root tree. Three GitHub Actions workflows exist, one per application, each triggered by a push to `main` changing its own directory (.github/workflows/auth.yml:3-8; .github/workflows/container.yml:3-8; .github/workflows/marketing.yml:3-8). Each installs and builds only its directory (.github/workflows/auth.yml:10-20), synchronizes `dist` to `s3://<bucket>/<aplicação>/latest` and invalidates entry file in CloudFront: remotes’ `remoteEntry.js` and container `index.html` (.github/workflows/auth.yml:23, 28; .github/workflows/marketing.yml:23, 28; .github/workflows/container.yml:25, 30). Bucket and distribution are shared by all three, read from secrets, each application in its own prefix. Container receives production domain at build time (.github/workflows/container.yml:20-22), composing remote addresses (container/config/webpack.prod.js:6, 17-20); paths `/marketing/latest/remoteEntry.js` and `/auth/latest/remoteEntry.js` match prefixes published by remote workflows. Names `latest` and overwriting same prefix indicate no versions published side by side.

Copy in `packages/` (container, marketing, auth and dashboard) has the same production configurations, with same `publicPath` values (packages/container/config/webpack.prod.js:12, 17-21; packages/dashboard/config/webpack.prod.js:10), but no workflow filters or builds it: `paths` filters cover only root `auth/**`, `container/**` and `marketing/**`. Remote `dashboard` is commented out in root container (container/config/webpack.prod.js:20) and root `dashboard/` contains only `package.json`, calling absent configurations (dashboard/package.json:4-6); because it is not an application in structural review, it does not enter table. The `dist` directories are ignored by git (.gitignore:2), so builds occur in CI or author’s machine. No Dockerfile, compose or hosting configuration beyond workflows.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | auth | separate | separate | `<bucket>/auth/latest` on S3/CloudFront (.github/workflows/auth.yml:23, 28; auth/config/webpack.prod.js:10); `http://localhost:8082/` in development (auth/config/webpack.dev.js:9, 12) | No | auth/package.json:6 (`webpack --config config/webpack.prod.js`); auth/config/webpack.prod.js:6-21 (production build of remote `auth`, `publicPath` `/auth/latest/`); .github/workflows/auth.yml:7-8, 12, 20 (job triggered by `auth/**`, build only of `auth`); .github/workflows/auth.yml:23 (publishes `dist` to `auth/latest`); .github/workflows/auth.yml:28 (invalidates `/auth/latest/remoteEntry.js`) |
| 2 | container | separate | separate | `<bucket>/container/latest` on S3/CloudFront (.github/workflows/container.yml:25, 30; container/config/webpack.prod.js:12); `http://localhost:8080/` in development (container/config/webpack.dev.js:9, 12) | No | container/package.json:6 (`webpack --config config/webpack.prod.js`); container/config/webpack.prod.js:8-24 (production build of host, remotes at `${domain}/<remote>/latest/remoteEntry.js`); .github/workflows/container.yml:7-8, 12, 20-22 (job triggered by `container/**`, build only of `container` with `PRODUCTION_DOMAIN`); .github/workflows/container.yml:25 (publishes `dist` to `container/latest`); .github/workflows/container.yml:30 (invalidates `/container/latest/index.html`) |
| 3 | marketing | separate | separate | `<bucket>/marketing/latest` on S3/CloudFront (.github/workflows/marketing.yml:23, 28; marketing/config/webpack.prod.js:10); `http://localhost:8081/` in development (marketing/config/webpack.dev.js:9, 12) | No | marketing/package.json:6 (`webpack --config config/webpack.prod.js`); marketing/config/webpack.prod.js:6-21 (production build of remote `marketing`, `publicPath` `/marketing/latest/`); .github/workflows/marketing.yml:7-8, 12, 20 (job triggered by `marketing/**`, build only of `marketing`); .github/workflows/marketing.yml:23 (publishes `dist` to `marketing/latest`); .github/workflows/marketing.yml:28 (invalidates `/marketing/latest/remoteEntry.js`) |
| 4 | packages/auth | separate | not observed | `http://localhost:8082/` in development (packages/auth/config/webpack.dev.js:10, 13) | No | packages/auth/package.json:6 (`webpack --config config/webpack.prod.js`); packages/auth/config/webpack.prod.js:6-35 (production build of remote `auth`, `publicPath` `/auth/latest/`) |
| 5 | packages/container | separate | not observed | `http://localhost:8080/` in development (packages/container/config/webpack.dev.js:9, 12) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:8-38 (production build of host, `publicPath` `/container/latest/`, three remotes) |
| 6 | packages/dashboard | separate | not observed | `http://localhost:8083/` in development (packages/dashboard/config/webpack.dev.js:10, 13) | No | packages/dashboard/package.json:6 (`webpack --config config/webpack.prod.js`); packages/dashboard/config/webpack.prod.js:6-21 (production build of remote `dashboard`, `publicPath` `/dashboard/latest/`) |
| 7 | packages/marketing | separate | not observed | `http://localhost:8081/` in development (packages/marketing/config/webpack.dev.js:10, 13) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-35 (production build of remote `marketing`, `publicPath` `/marketing/latest/`) |

## Observations

**1. auth.** Separate build: package script `build` runs production configuration, generating remote `auth` artifact with its `remoteEntry.js` (auth/package.json:6; auth/config/webpack.prod.js:13-17). Separate deploy: workflow `deploy-auth` triggers only on changes in `auth/**`, builds only this directory and publishes its `dist` to prefix `auth/latest` (.github/workflows/auth.yml:1-8, 12, 20, 23), apart from other applications, although in same bucket and distribution. The `publicPath` `/auth/latest/` (auth/config/webpack.prod.js:10) matches this prefix and address used by container (container/config/webpack.prod.js:19). The `version: 1.0.0` (auth/package.json:3) is unused in publication, always going to `latest`.

**2. container.** Separate build (container/package.json:6; container/config/webpack.prod.js:8-24) and separate deploy through workflow `deploy-container`, triggered by `container/**`, publishing `dist` to `container/latest` and invalidating `index.html` (.github/workflows/container.yml:1-8, 25, 30). Build depends on secret `PRODUCTION_DOMAIN` (.github/workflows/container.yml:20-22) to construct remote addresses (container/config/webpack.prod.js:6, 18-19), but does not include their code: remotes resolve at runtime in prefixes published by other workflows. Changing a remote requires no container rebuild, because path `latest/remoteEntry.js` is fixed and invalidated in CloudFront on each remote deploy (.github/workflows/marketing.yml:28; .github/workflows/auth.yml:28). No own version used in publication (container/package.json:3).

**3. marketing.** Same arrangement as auth: own build (marketing/package.json:6; marketing/config/webpack.prod.js:13-17), workflow `deploy-marketing` triggered by `marketing/**` publishes to `marketing/latest` and invalidates `remoteEntry.js` (.github/workflows/marketing.yml:1-8, 23, 28). The `publicPath` `/marketing/latest/` (marketing/config/webpack.prod.js:10) matches container remote (container/config/webpack.prod.js:18). No own version used in publication.

**4. packages/auth.** Separate build through own script and production configuration (packages/auth/package.json:6; packages/auth/config/webpack.prod.js:6-35). No deployment artifact covers `packages/`: all three workflows filter and build only root directories (.github/workflows/auth.yml:8, 12). The `publicPath` `/auth/latest/` (packages/auth/config/webpack.prod.js:10) is the same as root auth’s, but only root auth is published at this prefix. Deploy `not observed`; "Where served" records only development address.

**5. packages/container.** Separate build (packages/container/package.json:6; packages/container/config/webpack.prod.js:8-38), no observed deploy, for same reason as packages/auth. Unlike root container, also declares remote `dashboard` at `${domain}/dashboard/latest/remoteEntry.js` (packages/container/config/webpack.prod.js:20), a path published by no workflow.

**6. packages/dashboard.** Separate build (packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:6-21), with `publicPath` `/dashboard/latest/` (packages/dashboard/config/webpack.prod.js:10). No dashboard workflow exists in either tree, so deploy is `not observed`. It is the only application enabling CORS on development server (packages/dashboard/config/webpack.dev.js:17-19), configuration not counting as deploy.

**7. packages/marketing.** Separate build (packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:6-35), no observed deploy, like packages/auth; `publicPath` `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10) repeats root marketing’s.

## Summary

Applications: 7. Build (separate: 7). Deploy (separate: 3, not observed: 4). Independent versioning: 0.

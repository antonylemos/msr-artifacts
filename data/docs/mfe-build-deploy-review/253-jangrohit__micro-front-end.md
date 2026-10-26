---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
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

# 253 — jangrohit/micro-front-end

## Repository overview

Example with two webpack 5 applications in `packages/`, without workspace or root `package.json`: host `packages/container` and remote `packages/marketing`. Each has its own `package.json` with `start` (`webpack serve`, development only) and `build` (`webpack --config config/webpack.prod.js --mode production`) (packages/container/package.json:5-6; packages/marketing/package.json:5-6), and own `config/webpack.{common,dev,prod}.js` configurations. Production configuration defines no `output.path`, so each build writes to its own package’s default `dist/` (README says the same, README.md:82), with `publicPath` `/container/latest/` and `/marketing/latest/` (packages/container/config/webpack.prod.js:10; packages/marketing/config/webpack.prod.js:10). Blocks `devServer` on ports 8080 and 8081 (packages/container/config/webpack.dev.js:7-8; packages/marketing/config/webpack.dev.js:7-9) are for development and do not count as deploy.

Production deploy resides in two GitHub Actions workflows, one per application. Each triggers on push to `main`/`master` only when application directory changes (.github/workflows/container.yml:3-9; .github/workflows/marketing.yml:3-9), runs in its directory (.github/workflows/container.yml:11-13; .github/workflows/marketing.yml:11-13), installs and builds (`npm run build`, .github/workflows/container.yml:27-31; .github/workflows/marketing.yml:27-31), synchronizes `dist` to own prefix in S3 bucket and invalidates application entry file in CloudFront (.github/workflows/container.yml:35-42; .github/workflows/marketing.yml:33-40). Bucket and distribution are shared by both (`secrets.AWS_S3_BUCKET_NAME` and `secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID`), with values outside snapshot. Container job passes `PRODUCTION_DOMAIN` to build (.github/workflows/container.yml:32-33), used to construct remote URL (packages/container/config/webpack.prod.js:5, 22); domain is also a secret. No Dockerfile, compose or other hosting configuration exists.

Contradiction with documentation: README says repository includes no deployment pipeline publishing these artifacts (README.md:104), but both workflows do exactly that. Under this stage’s rule, README does not decide Deploy column. The `packages/auth` and `packages/dashboard` are `No` in structural review and covered by no workflow. Neither application has versioning used in publication: both are at `1.0.0` (packages/container/package.json:3; packages/marketing/package.json:3) and workflows always publish to `latest`.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | packages/container | separate | separate | `s3://${AWS_S3_BUCKET_NAME}/container/latest`, bucket value outside snapshot (.github/workflows/container.yml:36); `/container/latest/` (packages/container/config/webpack.prod.js:10); `http://localhost:8080` in development (packages/container/config/webpack.dev.js:8) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:6-26 (own build, host MF); .github/workflows/container.yml:8-13 (container trigger and directory); .github/workflows/container.yml:30-33 (build with `PRODUCTION_DOMAIN`); .github/workflows/container.yml:36 (S3 sync to `/container/latest`); .github/workflows/container.yml:42 (invalidates `/container/latest/index.html`) |
| 2 | packages/marketing | separate | separate | `s3://${AWS_S3_BUCKET_NAME}/marketing/latest`, bucket value outside snapshot (.github/workflows/marketing.yml:34); `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10); `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js` (packages/container/config/webpack.prod.js:22); `http://localhost:8081` in development (packages/marketing/config/webpack.dev.js:9) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-27 (own build, generates `remoteEntry.js`); .github/workflows/marketing.yml:8-13 (marketing trigger and directory); .github/workflows/marketing.yml:30-31 (build); .github/workflows/marketing.yml:34 (S3 sync to `/marketing/latest`); .github/workflows/marketing.yml:40 (invalidates `/marketing/latest/remoteEntry.js`) |

## Observations

**1. packages/container.** Own build through production configuration, declaring host `container` with remote `marketing` (packages/container/config/webpack.prod.js:19-23) and generating `index.html` from package template (packages/container/config/webpack.common.js:19-21). Separate deploy: workflow `deploy-container` runs only when `packages/container/**` changes and copies only container `dist` to `/container/latest` (.github/workflows/container.yml:8-9, 36). The only application whose build depends on a deploy value: remote address comes from `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:5, 22; .github/workflows/container.yml:33), and fixed path `latest` makes host always load latest published marketing version, without needing rebuild. Shares bucket and CloudFront distribution with marketing, separated only by prefix. Version `1.0.0` (packages/container/package.json:3) unused in publication.

**2. packages/marketing.** Own build, exposing `./MarketingApp` and emitting `remoteEntry.js` (packages/marketing/config/webpack.prod.js:19-24). Separate deploy: workflow `deploy-marketing` runs only when `packages/marketing/**` changes and copies only marketing `dist` to `/marketing/latest` (.github/workflows/marketing.yml:8-9, 34), invalidating only `remoteEntry.js` (:40), file fetched by host (packages/container/config/webpack.prod.js:22). Configuration reads `PRODUCTION_DOMAIN` (packages/marketing/config/webpack.prod.js:5), but does not use it, and workflow does not define it. Version `1.0.0` (packages/marketing/package.json:3) unused in publication.

## Summary

Applications: 2. Build (separate: 2). Deploy (separate: 2). Independent versioning: 0.

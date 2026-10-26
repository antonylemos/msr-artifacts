---
schema: 1
id: 1133729895
full_name: fi-x64/mfe
commit: fa4088ae3313734c98a027db5fccfee4db34a46d
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

# 216 — fi-x64/mfe

## Repository overview

Repository without root `package.json` or workspace: each package in `packages/` is a separate npm project, with its own `package.json` and `package-lock.json`. Both frontend applications, `packages/container` (host) and `packages/marketing` (remote), have identical scripts: `start` runs webpack development server and `build` runs `webpack --config config/webpack.prod.js` (packages/container/package.json:4-7; packages/marketing/package.json:4-7). No configuration defines `output.path`, so build outputs to each package’s default webpack `dist`, the directory published by workflows (.github/workflows/container.yml:26; .github/workflows/marketing.yml:24); `.gitignore` excludes `dist` (.gitignore:2). The `webpack.dev.js` files, with ports 8080 and 8081, are for development and do not count as deploy (packages/marketing/config/webpack.dev.js:9-10).

Production publication uses GitHub Actions to AWS S3 with CloudFront, one workflow per application. Each triggers on push to `main` touching only application directory, runs `npm install` and `npm run build` there and synchronizes `dist` to its own bucket prefix, `container/latest` or `marketing/latest`, then invalidates application entry file in CloudFront: `/container/latest/index.html` or `/marketing/latest/remoteEntry.js` (.github/workflows/container.yml:1-31; .github/workflows/marketing.yml:1-29). Both use same bucket and distribution secrets (.github/workflows/container.yml:26, 31; .github/workflows/marketing.yml:24, 29), so applications reside in same bucket behind same CloudFront, but each is uploaded by its own job with only its own artifact. Production `publicPath` values match these prefixes (packages/container/config/webpack.prod.js:12; packages/marketing/config/webpack.prod.js:10), and container looks for remote at `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js` (packages/container/config/webpack.prod.js:6, 18), with domain from a secret at workflow build time (.github/workflows/container.yml:21-23). Secret values are absent from snapshot. Fixed prefix `latest` indicates each deploy overwrites previous one, without version in path.

The `packages/auth` and `packages/dashboard` contain only `package.json` with default `test` script and lockfile (packages/auth/package.json:4-6; packages/dashboard/package.json:4-6); no build or deploy exists for them. No Dockerfile, compose or other deployment artifact is present in snapshot.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | packages/container | separate | separate | `s3://${AWS_S3_BUCKET_NAME}/container/latest` (.github/workflows/container.yml:26); `/container/latest/` (packages/container/config/webpack.prod.js:12) | No | packages/container/package.json:6 (`webpack --config config/webpack.prod.js`); packages/container/config/webpack.prod.js:8-25 (production configuration, `publicPath` and remote `marketing`); packages/container/config/webpack.common.js:19-23 (generates `index.html`); .github/workflows/container.yml:1-35 (triggered by `packages/container/**`, build and `aws s3 sync` of `dist` to `container/latest`, CloudFront invalidation) |
| 2 | packages/marketing | separate | separate | `s3://${AWS_S3_BUCKET_NAME}/marketing/latest` (.github/workflows/marketing.yml:24); `/marketing/latest/` (packages/marketing/config/webpack.prod.js:10); `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`, as container expects (packages/container/config/webpack.prod.js:18) | No | packages/marketing/package.json:6 (`webpack --config config/webpack.prod.js`); packages/marketing/config/webpack.prod.js:6-24 (production configuration, `publicPath` and `remoteEntry.js`); .github/workflows/marketing.yml:1-33 (triggered by `packages/marketing/**`, build and `aws s3 sync` of `dist` to `marketing/latest`, invalidation of `remoteEntry.js` in CloudFront) |

## Observations

**1. packages/container.** Separate build: own script and webpack configuration (packages/container/package.json:6; packages/container/config/webpack.prod.js:8-25); marketing code does not enter artifact, storing only `remoteEntry.js` address (packages/container/config/webpack.prod.js:17-19). The only application whose build generates `index.html`, through `HtmlWebpackPlugin` in common configuration (packages/container/config/webpack.common.js:19-23). Separate deploy: workflow `deploy-container` runs only when `packages/container/**` changes and uploads only its `dist` to `container/latest`, invalidating `/container/latest/index.html` (.github/workflows/container.yml:7-8, 12, 26, 31). Because remote domain is fixed at build time through secret `PRODUCTION_DOMAIN` (.github/workflows/container.yml:21-23; packages/container/config/webpack.prod.js:6), changing domain requires rebuilding container, but a new marketing version at same `latest` path does not. Versioning `No`: `version: "1.0.0"` (packages/container/package.json:3), unused in publication.

**2. packages/marketing.** Separate build: own script and webpack configuration, generating `remoteEntry.js` for remote `marketing` (packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:13-18). Production configuration has no `HtmlWebpackPlugin`, present only in development configuration (packages/marketing/config/webpack.common.js:1-17; packages/marketing/config/webpack.dev.js:24-26): marketing is published only as a remote in production, while standalone page remains for development. Separate deploy: workflow `deploy-marketing` runs only when `packages/marketing/**` changes and uploads only its `dist` to `marketing/latest`, invalidating `/marketing/latest/remoteEntry.js` (.github/workflows/marketing.yml:7-8, 12, 24, 29). This is the path container seeks in production (packages/container/config/webpack.prod.js:18). Versioning `No`: `version: "1.0.0"` (packages/marketing/package.json:3), unused in publication; prefix `latest` carries no version.

## Summary

Applications: 2. Build (separate: 2). Deploy (separate: 2). Independent versioning: 0.

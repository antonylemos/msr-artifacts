---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Repository overview

npm workspaces monorepo (package.json:4-8) with four React/Vite applications linked by Module Federation: shell `apps/host` and remotes `apps/header`, `apps/footer` and `apps/products`. Each application has its own `vite.config.ts`, with `outDir` at root `dist/<app>` (apps/host/vite.config.ts:90-96; apps/header/vite.config.ts:63-69; apps/footer/vite.config.ts:47-53; apps/products/vite.config.ts:63-69), and a `build` script in its `package.json`. Root `build` only chains `tsc -b` and all four `vite build` commands (package.json:18-22); scripts `dev:*` and `preview:*` (package.json:12-17 and :25-29) and configuration `server`/`preview` blocks, with ports 3000-3003 and open CORS (`cors: true`, `Access-Control-Allow-Origin: '*'`, e.g.: apps/host/vite.config.ts:67-89), are for development and do not count as deploy.

Production deploy resides in the only workflow, .github/workflows/ci-cd.yml. Job `detect` calculates apps affected by diff (.github/workflows/ci-cd.yml:30-60) using scripts/ci/affected-workspaces.mjs, marking each app on changes in `apps/<app>/` (scripts/ci/affected-workspaces.mjs:37-41) and all four when shared content changes (`package.json`, `packages/*`, `.github/` etc.; :4-13 and :43-44). Job `deploy`, only on push to `main`, runs in a matrix over these apps (.github/workflows/ci-cd.yml:85-99): builds app through its workspace (:116-117) and synchronizes `dist/<app>` to its own S3 bucket, invalidating its own CloudFront distribution (:125-152), with bucket and distribution from per-app secrets (e.g.: `AWS_S3_BUCKET_HEADER`, `AWS_CLOUDFRONT_DISTRIBUTION_HEADER`, :131-132). Job `rollback`, through `workflow_dispatch`, does the same for one selected app and given ref (:9-27, :181-248). Remote URLs used in host build come from repository variables (:102-104), whose values are absent from snapshot; bucket names and distribution addresses are also absent. README lists four CloudFront addresses, one per app (README.md:142-162), but is documentation and does not decide Deploy column.

Versioning is shared across repository: job `release` runs `semantic-release` (.github/workflows/ci-cd.yml:154-179; package.json:31), configured to generate CHANGELOG.md and version only root `package.json` and `package-lock.json` (.releaserc.json:18-28), with GitHub tags and releases (:29). The CHANGELOG.md records whole-repository versions (CHANGELOG.md:1 and :13). Application `package.json` files remain at `0.0.0` and `private` (e.g.: apps/host/package.json:3-4), and job `release` neither depends on `deploy` nor publishes any application. No Dockerfile, compose or other hosting configuration is present in snapshot.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/footer | separate | separate | bucket `AWS_S3_BUCKET_FOOTER` and distribution `AWS_CLOUDFRONT_DISTRIBUTION_FOOTER`, values outside snapshot (.github/workflows/ci-cd.yml:134-137, :151-152); `http://localhost:3002` in development (apps/footer/vite.config.ts:25-27) | No | apps/footer/vite.config.ts:47-53 (own build, output `dist/footer`); apps/footer/package.json:8 (`vite build`); .github/workflows/ci-cd.yml:117 (build through workspace in matrix); .github/workflows/ci-cd.yml:134-137, :151-152 (own S3 and CloudFront); .github/workflows/ci-cd.yml:230-233, :247-248 (own rollback) |
| 2 | apps/header | separate | separate | bucket `AWS_S3_BUCKET_HEADER` and distribution `AWS_CLOUDFRONT_DISTRIBUTION_HEADER`, values outside snapshot (.github/workflows/ci-cd.yml:129-132, :151-152); `http://localhost:3001` in development (apps/header/vite.config.ts:41-43) | No | apps/header/vite.config.ts:63-69 (own build, output `dist/header`); apps/header/package.json:8 (`vite build`); .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:129-132, :151-152 (own S3 and CloudFront); .github/workflows/ci-cd.yml:225-228, :247-248 (own rollback) |
| 3 | apps/host | separate | separate | bucket `AWS_S3_BUCKET_HOST` and distribution `AWS_CLOUDFRONT_DISTRIBUTION_HOST`, values outside snapshot (.github/workflows/ci-cd.yml:144-147, :151-152); `http://localhost:3000` in development (apps/host/vite.config.ts:68-69) | No | apps/host/vite.config.ts:90-96 (own build, output `dist/host`); apps/host/package.json:8 (`vite build`); .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:144-147, :151-152 (own S3 and CloudFront); .github/workflows/ci-cd.yml:240-243, :247-248 (own rollback) |
| 4 | apps/products | separate | separate | bucket `AWS_S3_BUCKET_PRODUCTS` and distribution `AWS_CLOUDFRONT_DISTRIBUTION_PRODUCTS`, values outside snapshot (.github/workflows/ci-cd.yml:139-142, :151-152); `http://localhost:3003` in development (apps/products/vite.config.ts:41-43) | No | apps/products/vite.config.ts:63-69 (own build, output `dist/products`); apps/products/package.json:8 (`vite build`); .github/workflows/ci-cd.yml:117; .github/workflows/ci-cd.yml:139-142, :151-152 (own S3 and CloudFront); .github/workflows/ci-cd.yml:235-238, :247-248 (own rollback) |

## Observations

**1. apps/footer.** Own build: workspace `vite build` (apps/footer/package.json:8) uses footer configuration, generating `remoteEntry.js` with `./Footer` (apps/footer/vite.config.ts:13-19) in `dist/footer` (:49). Separate deploy: in job `deploy`, matrix entry `footer` copies only `dist/footer` to footer bucket and invalidates footer distribution (.github/workflows/ci-cd.yml:134-137, :151-152), and footer only enters matrix when it or shared content changes (scripts/ci/affected-workspaces.mjs:39, :43-44). Public address cannot be resolved in snapshot: bucket and distribution are secrets. Host finds it through `VITE_FOOTER_REMOTE_URL` (.github/workflows/ci-cd.yml:103; apps/host/vite.config.ts:13). Version `0.0.0` (apps/footer/package.json:4) is unused in publication, hence Versioning `No`.

**2. apps/header.** Same arrangement as footer: build through header configuration (apps/header/vite.config.ts:13-19, :63-69) and deploy of matrix entry `header` to own bucket and distribution (.github/workflows/ci-cd.yml:129-132, :151-152). The first case of `case`, also with isolated rollback (:225-228). Host loads it through `VITE_HEADER_REMOTE_URL` (.github/workflows/ci-cd.yml:102; apps/host/vite.config.ts:12). Header tests run before deploy (`npm run test --workspace`, .github/workflows/ci-cd.yml:82-83; apps/header/package.json:10). Version `0.0.0` unused (apps/header/package.json:4).

**3. apps/host.** Own build (apps/host/vite.config.ts:90-96), but the only build depending on remote URLs: they enter build through `loadEnv` and variables `VITE_*_REMOTE_URL` (apps/host/vite.config.ts:10-15), populated in job (.github/workflows/ci-cd.yml:102-104). Thus host is published separately (host bucket and distribution, :144-147, :151-152), but is not rebuilt when only a remote changes (scripts/ci/affected-workspaces.mjs:41), and continues pointing to same remote addresses. Unlike remotes, host script `build` does not run `tsc -b` (apps/host/package.json:8). Version `0.0.0` unused (apps/host/package.json:4).

**4. apps/products.** Same arrangement as other remotes: build through products configuration, exposing `./ProductsList` (apps/products/vite.config.ts:13-19) in `dist/products` (:65), and deploy to own bucket and distribution (.github/workflows/ci-cd.yml:139-142, :151-152), with isolated rollback (:235-238). Host loads it through `VITE_PRODUCTS_REMOTE_URL` (.github/workflows/ci-cd.yml:104; apps/host/vite.config.ts:14-15). Also has tests in job `test` (apps/products/package.json:10). Version `0.0.0` unused (apps/products/package.json:4).

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 0.

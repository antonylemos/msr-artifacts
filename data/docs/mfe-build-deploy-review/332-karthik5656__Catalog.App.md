---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
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

# 332 — karthik5656/Catalog.App

## Repository overview

No workspace exists. The `src/frontend/package.json` only declares pnpm as package manager and a placeholder script `test` (src/frontend/package.json:6-8, 19). Each of three applications in `src/frontend/apps/` has its own manifest, lockfile, `vite.config.ts` and build script: `tsc -noemit && vite build` in shell (src/frontend/apps/ui-catalog/package.json:8) and `tsc --noemit && vite build` in remotes (src/frontend/apps/ui-catalog-consumer/package.json:8; src/frontend/apps/ui-catalog-merchant/package.json:8). No root script triggers builds.

Each application has its own Dockerfile, identical across all three: a `node:22-alpine` stage installs dependencies with pnpm and runs `pnpm run build` in application directory (src/frontend/apps/ui-catalog/Dockerfile:1-13), and an `nginx:alpine` stage copies `dist` and serves on port 80 with SPA fallback to `/index.html` (src/frontend/apps/ui-catalog/Dockerfile:16-23; same in src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23 and src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23). Each image contains only its application’s build.

Workflow `.github/workflows/ci-pipeline.yml` runs on pull request events (.github/workflows/ci-pipeline.yml:3-5). Job `changes` uses `dorny/paths-filter` with one filter per application (.github/workflows/ci-pipeline.yml:59-64) and global filter for `docker/**` and `.github/workflows/**` (.github/workflows/ci-pipeline.yml:67-69). Job `publish-containers` has one `docker/build-push-action` step per application, each with application directory as context, its Dockerfile, `push: true` and own GHCR image: `ui-catalog`, `ui-catalog-consumer` and `ui-catalog-merchant` (.github/workflows/ci-pipeline.yml:238-271). Each step runs only when its application or global configuration changes (.github/workflows/ci-pipeline.yml:240, 252, 264). At end, job comments published image list on PR (.github/workflows/ci-pipeline.yml:276-377). Non-Docker test and build jobs are commented out (.github/workflows/ci-pipeline.yml:74-140).

Images are PR previews. Tag is `pr<número>-<sha curto>` (.github/workflows/ci-pipeline.yml:169-171). Branch changing tag to `latest` on `main`/`master` (.github/workflows/ci-pipeline.yml:175-177) should not be reached because workflow triggers only on pull request; this was not verified through execution. Workflow `.github/workflows/delete-merged-branch.yml` runs when PR closes and deletes from GHCR versions tagged `pr<número>` of repository’s seven images, including three frontend images (.github/workflows/delete-merged-branch.yml:3-5, 47-57, 95-103). No compose, Kubernetes manifest, proxy or hosting configuration is present in snapshot; directory `docker/` contains only a database initialization SQL script (docker/init-scripts/01-init-databases.sql). Nothing in snapshot indicates how images run together.

Production build and addresses contradict each other. Remote addresses embedded by shell build are `http://localhost:3001/assets/remoteEntry.js` and `http://localhost:3002/assets/remoteEntry.js` (src/frontend/apps/ui-catalog/remotes.json:4, 11; src/frontend/apps/ui-catalog/vite.config.ts:14-17), ports of remotes’ Vite `server`/`preview` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:9, 12; src/frontend/apps/ui-catalog-consumer/vite.config.ts:9, 12). In images, remotes serve on port 80 (src/frontend/apps/ui-catalog-consumer/Dockerfile:20, 22). Shell fixes `base: '/ui-catalog/'` (src/frontend/apps/ui-catalog/vite.config.ts:75), the `cfg-public-path` occurrence, but nginx in its image serves `dist` at root `/` (src/frontend/apps/ui-catalog/Dockerfile:17, 20). Without a proxy mapping these addresses, absent from snapshot, images do not compose as is.

.NET backend Dockerfiles (src/backend/Catalog.App/Dockerfile:1, 15; src/backend/Catalog.Chat/Dockerfile:1, 15; src/backend/Catalog.Gateway/Dockerfile:1, 15; src/backend/Catalog.Rag/Dockerfile:1, 15) build and run API services on port 8080 and are published by backend steps of same job (.github/workflows/ci-pipeline.yml:186-231). They cover no frontend application. Workflow `.github/workflows/copilot-code-review.yml` performs automated code review on PRs and builds nothing.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | src/frontend/apps/ui-catalog | separate | separate | port 80 of image nginx `ghcr.io/<repositório>/ui-catalog` (src/frontend/apps/ui-catalog/Dockerfile:20, 22; .github/workflows/ci-pipeline.yml:247); `base` `/ui-catalog/` (src/frontend/apps/ui-catalog/vite.config.ts:75) | No | src/frontend/apps/ui-catalog/package.json:8 (`tsc -noemit && vite build`); src/frontend/apps/ui-catalog/vite.config.ts:74-110 (own configuration, `base`); src/frontend/apps/ui-catalog/Dockerfile:1-23 (build with pnpm and own nginx image); .github/workflows/ci-pipeline.yml:238-247 (builds and publishes image `ui-catalog` to GHCR) |
| 2 | src/frontend/apps/ui-catalog-consumer | separate | separate | port 80 of image nginx `ghcr.io/<repositório>/ui-catalog-consumer` (src/frontend/apps/ui-catalog-consumer/Dockerfile:20, 22; .github/workflows/ci-pipeline.yml:259); `http://localhost:3002/assets/remoteEntry.js` in shell (src/frontend/apps/ui-catalog/remotes.json:11) | No | src/frontend/apps/ui-catalog-consumer/package.json:8 (`tsc --noemit && vite build`); src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53 (own configuration, `remoteEntry.js`); src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23 (build with pnpm and own nginx image); .github/workflows/ci-pipeline.yml:250-259 (builds and publishes image `ui-catalog-consumer` to GHCR) |
| 3 | src/frontend/apps/ui-catalog-merchant | separate | separate | port 80 of image nginx `ghcr.io/<repositório>/ui-catalog-merchant` (src/frontend/apps/ui-catalog-merchant/Dockerfile:20, 22; .github/workflows/ci-pipeline.yml:271); `http://localhost:3001/assets/remoteEntry.js` in shell (src/frontend/apps/ui-catalog/remotes.json:4) | No | src/frontend/apps/ui-catalog-merchant/package.json:8 (`tsc --noemit && vite build`); src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53 (own configuration, `remoteEntry.js`); src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23 (build with pnpm and own nginx image); .github/workflows/ci-pipeline.yml:262-271 (builds and publishes image `ui-catalog-merchant` to GHCR) |

## Observations

**1. src/frontend/apps/ui-catalog.** Separate build: own script and `vite.config.ts` (src/frontend/apps/ui-catalog/package.json:8; src/frontend/apps/ui-catalog/vite.config.ts:74-110), executed within application Dockerfile (src/frontend/apps/ui-catalog/Dockerfile:13). Build does not include remote code: only fixes addresses read from `remotes.json` (src/frontend/apps/ui-catalog/vite.config.ts:10-17, 85-89), so changing where a remote is served requires rebuilding shell. Separate deploy: own CI step packages and publishes only this application, in own image, running only when it or global configuration changes (.github/workflows/ci-pipeline.yml:238-247). The `base` `/ui-catalog/` (src/frontend/apps/ui-catalog/vite.config.ts:75) does not match image nginx, serving at root (src/frontend/apps/ui-catalog/Dockerfile:20); recorded as contradiction without changing column. The `version: "0.0.0"` of a `private` package (src/frontend/apps/ui-catalog/package.json:3-4) is unused in publication, and image tag is same for all PR images (.github/workflows/ci-pipeline.yml:169-171, 247): Versioning `No`.

**2. src/frontend/apps/ui-catalog-consumer.** Separate build (src/frontend/apps/ui-catalog-consumer/package.json:8; src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53), generating `remoteEntry.js` exposed to shell (src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23). Separate deploy through own CI step, with own nginx image (.github/workflows/ci-pipeline.yml:250-259; src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23). Address shell uses for this remote belongs to development and preview port 3002 (src/frontend/apps/ui-catalog/remotes.json:11; src/frontend/apps/ui-catalog-consumer/vite.config.ts:9, 12), not image. Plugin notifying shell on every rebuild (src/frontend/apps/ui-catalog-consumer/vite.config.ts:24-45) is development tool. No own version (src/frontend/apps/ui-catalog-consumer/package.json:3-4): Versioning `No`.

**3. src/frontend/apps/ui-catalog-merchant.** Same arrangement as consumer: own build (src/frontend/apps/ui-catalog-merchant/package.json:8; src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53), own CI step and image (.github/workflows/ci-pipeline.yml:262-271; src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23). The `vite.config.ts` matches consumer except port 3001 (src/frontend/apps/ui-catalog-merchant/vite.config.ts:9, 12), address port in shell (src/frontend/apps/ui-catalog/remotes.json:4). Repeated `name: "consumerApp"` (src/frontend/apps/ui-catalog-merchant/vite.config.ts:17), addressed in composition review, affects neither build nor deploy. No own version (src/frontend/apps/ui-catalog-merchant/package.json:3-4): Versioning `No`.

## Summary

Applications: 3. Build (separate: 3). Deploy (separate: 3). Independent versioning: 0.

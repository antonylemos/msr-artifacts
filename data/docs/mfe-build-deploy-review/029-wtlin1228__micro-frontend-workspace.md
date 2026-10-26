---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
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

# 029 — wtlin1228/micro-frontend-workspace

## Repository overview

pnpm workspace with five Rsbuild applications in `packages/`: a `host`, two Module Federation remotes (`app-mf-1` and `app-mf-2`) and two qiankun sub-apps (`app-qiankun-1` and `app-qiankun-2`). There is also a library, `lib-app-interface`, built with Rslib (packages/lib-app-interface/package.json:16). All are workspace members (pnpm-workspace.yaml:1-2) and share a single root lockfile. Each application has its own `rsbuild.config.ts` and `package.json`, with `build` and `preview` (for example: packages/app-mf-1/package.json:7-8).

Root organizes build into three stages, which README instructs running in order: libraries, applications and host (package.json:9-15; README.md:17-23). `build:apps` builds the four remotes in parallel, each with its own command (package.json:11). Then `preview:apps` and `preview:host` serve the built output locally (package.json:12, 15; README.md:21-23).

Build configuration fixes `localhost` addresses even in production output. Remotes define `assetPrefix` at `http://localhost:<porta>/` (for example: packages/app-mf-1/rsbuild.config.ts:8-10; packages/app-qiankun-1/rsbuild.config.ts:6-8), Module Federation remotes repeat this in `getPublicPath` (packages/app-mf-1/module-federation.config.ts:12), and host registers all four entries at `localhost` (packages/host/src/configs/apps.ts:14, 20, 26, 32). Build generates separate artifacts, but they work only when served on those ports. There is no Dockerfile, CI or hosting configuration, and mining `ops-*`, `ci-*` and `cfg-public-path` occurrences are empty.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | packages/app-mf-1 | separate | not observed | `http://localhost:4001/` (packages/app-mf-1/rsbuild.config.ts:9, 23) | No | packages/app-mf-1/rsbuild.config.ts:7-25 (own configuration, `assetPrefix` fixed); packages/app-mf-1/package.json:7 (`rsbuild build`); package.json:11 (`build:apps`) |
| 2 | packages/app-mf-2 | separate | not observed | `http://localhost:4002/` (packages/app-mf-2/rsbuild.config.ts:9, 23) | No | packages/app-mf-2/rsbuild.config.ts:7-25 (own configuration, `assetPrefix` fixed); packages/app-mf-2/package.json:7 (`rsbuild build`); package.json:11 (`build:apps`) |
| 3 | packages/app-qiankun-1 | separate | not observed | `http://localhost:3001/` (packages/app-qiankun-1/rsbuild.config.ts:7, 27) | No | packages/app-qiankun-1/rsbuild.config.ts:5-29 (own configuration, bundle `umd`, `assetPrefix` fixed); packages/app-qiankun-1/package.json:7 (`rsbuild build`); package.json:11 (`build:apps`) |
| 4 | packages/app-qiankun-2 | separate | not observed | `http://localhost:3002/` (packages/app-qiankun-2/rsbuild.config.ts:7, 27) | No | packages/app-qiankun-2/rsbuild.config.ts:5-29 (own configuration, bundle `umd`, `assetPrefix` fixed); packages/app-qiankun-2/package.json:7 (`rsbuild build`); package.json:11 (`build:apps`) |
| 5 | packages/host | separate | not observed | `http://localhost:3000/` (packages/host/rsbuild.config.ts:19-20) | No | packages/host/rsbuild.config.ts:7-22 (own configuration); packages/host/package.json:7 (`rsbuild build`); package.json:14 (`build:host`) |

## Observations

**1. packages/app-mf-1.** Own build, triggered together with other remotes by `build:apps`. The `assetPrefix` and `getPublicPath` fixed at `localhost:4001` bind the artifact to that port. No observed deployment: `preview` only serves locally. Version `1.0.0` is unused in publication.

**2. packages/app-mf-2.** Same arrangement, on port 4002 (packages/app-mf-2/rsbuild.config.ts:9, 23).

**3. packages/app-qiankun-1.** Own build generating a `umd` library named `qiankun1` (packages/app-qiankun-1/rsbuild.config.ts:12-16), with `assetPrefix` fixed on port 3001. No observed deployment.

**4. packages/app-qiankun-2.** Same arrangement, library `qiankun2`, port 3002 (packages/app-qiankun-2/rsbuild.config.ts:7, 27).

**5. packages/host.** Own build, with a separate root script run after remotes (package.json:14; README.md:17-20). Host does not fix `assetPrefix`, but remote entries remain at `localhost` in code (packages/host/src/configs/apps.ts:14-32). Module Federation entries in `remotes` are commented out (packages/host/module-federation.config.ts:8-9). No observed deployment.

## Summary

Applications: 5. Build (separate: 5). Deploy (not observed: 5). Independent versioning: 0.

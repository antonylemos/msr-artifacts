---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
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

# 040 — AlanOlimpio/list

## Repository overview

Repository with a single application, `ListApp`, made in a webpack course (README.md:1-3). It is both a remote, exposing `./ListRoutes`, and a consumer of remote `RegisterApp`, located in another repository and published at its own Vercel domain (webpack.config.js:46-55). Build is `webpack --mode production` with output in `dist` and `publicPath: 'auto'` (package.json:9; webpack.config.js:6-11). Chunks are thus resolved from wherever `remoteEntry.js` is served, without a fixed application address.

Deployment is on Vercel, configured in the repository. The `vercel.json` uses `@vercel/static-build` on `package.json`, publishes `dist` and rewrites all routes to `/` (vercel.json:2-11). README only explains local execution on port 9004 (README.md:29-37; webpack.config.js:17).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | separate | Vercel domain, not recorded in the snapshot (vercel.json:5-11); `http://localhost:9004` in development (webpack.config.js:17) | No | webpack.config.js:4-11 (own configuration and output); package.json:9 (`webpack --mode production`); vercel.json:5-11 (static build and publication of `dist`) |

## Observations

**1. Root (`.`).** Root application. Own build and deployment: Vercel configuration publishes only this application. Its consumer, if any, and remote `RegisterApp` are in other repositories, and remote has its own domain (webpack.config.js:53-54), consistent with independent publications. This application’s address does not appear in the snapshot. Version `1.0.0` (package.json:3) is unused in publication.

## Summary

Applications: 1. Build (separate: 1). Deploy (separate: 1). Independent versioning: 0.

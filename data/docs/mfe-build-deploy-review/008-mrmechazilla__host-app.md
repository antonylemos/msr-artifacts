---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
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

# 008 — mrmechazilla/host-app

## Repository overview

Repository with a single Angular application, the host. The two remotes it loads (`users-mfe` and `payments-mfe`) are absent from the snapshot: they appear only in the manifest as `localhost:4202` and `localhost:4203` (see the composition review). Their builds and deployments, if any, are outside the repository. Build uses `ngx-build-plus` with extra webpack configuration for Module Federation and writes to `dist/host-app` (angular.json:18-20, 42). In production, the extra configuration is `webpack.prod.config.js` (angular.json:63), only re-exporting the development configuration (webpack.prod.config.js:1).

The scripts are Angular CLI defaults plus a `run:all` calling the Module Federation package development server (package.json:5-11). There is no Dockerfile, CI, hosting configuration or publication script, and mining `ops-*`, `ci-*` and `cfg-public-path` occurrences are empty. README provides no build or deployment instructions.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | not observed | `http://localhost:4201` in development (angular.json:86-87) | No | angular.json:17-20 (target `build` with `ngx-build-plus:browser`, output `dist/host-app`); angular.json:42 and 63 (extra webpack configuration); package.json:7 (`ng build`) |

## Observations

**1. Root (`.`).** Root application. Separate build: host has its own build and output, and remote code is absent from this repository. No observed deployment: the development server runs on port 4201 (angular.json:86-87), and nothing in the snapshot publishes the application. No versioning: package.json:3 declares `0.0.0`.

## Summary

Applications: 1. Build (separate: 1). Deploy (not observed: 1). Independent versioning: 0.

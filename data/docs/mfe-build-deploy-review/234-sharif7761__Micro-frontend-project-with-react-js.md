---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
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

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Repository overview

The repository contains three React/Rsbuild applications with their own builds. Root declares no workspace: its scripts enter each application directory to install dependencies, start development or build projects. The `build:all` executes builds of common_simple, users_simple and core_simple sequentially (package.json:7-14). Each application runs `rsbuild build` using its local configuration, with its own federation name (common_simple/package.json:8; common_simple/rsbuild.config.ts:5-14; core_simple/package.json:8; core_simple/rsbuild.config.ts:5-14; users_simple/package.json:8; users_simple/rsbuild.config.ts:5-16). Aggregate command does not combine all three applications in one build artifact.

Server configurations and remote addresses describe local execution: core_simple uses port 3000 and fetches common_simple on port 3001 and users_simple on port 3002; users_simple also fetches common_simple on port 3001 (core_simple/rsbuild.config.ts:11-14, :31-33; users_simple/rsbuild.config.ts:14-16, :33-35; common_simple/rsbuild.config.ts:28-30). Available application scripts are `dev`, `build` and `preview` (common_simple/package.json:6-10; core_simple/package.json:6-10; users_simple/package.json:6-10). No CI/CD workflow, Dockerfile, compose, deployment manifest or hosting configuration is present in snapshot; no `ops-*`, `ci-*` or `cfg-public-path` occurrences in matches.csv either. Thus separate builds and local ports do not support separate deploy: deploy of all three applications is `not observed`.

All three manifests declare `version: 1.0.0` and `private: true`, but snapshot artifacts do not use this version for publication or release (common_simple/package.json:2-10; core_simple/package.json:2-10; users_simple/package.json:2-10). Independent versioning is therefore `No` for all three applications.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | common_simple | separate | not observed | Port 3001 in development (common_simple/rsbuild.config.ts:28-30); remote `http://localhost:3001/remoteEntry.js` (core_simple/rsbuild.config.ts:12; users_simple/rsbuild.config.ts:15) | No | common_simple/package.json:2-10 (declared version, private package and build `rsbuild build`); common_simple/rsbuild.config.ts:5-26 (own configuration, exposes Button and Card in `remoteEntry.js`); package.json:11-12 (aggregate build calls application build) |
| 2 | core_simple | separate | not observed | Port 3000 in development (core_simple/rsbuild.config.ts:31-33) | No | core_simple/package.json:2-10 (declared version, private package and build `rsbuild build`); core_simple/rsbuild.config.ts:5-29 (own configuration with remotes); package.json:11, :14 (aggregate build calls application build) |
| 3 | users_simple | separate | not observed | Port 3002 in development (users_simple/rsbuild.config.ts:33-35); remote `http://localhost:3002/remoteEntry.js` (core_simple/rsbuild.config.ts:13) | No | users_simple/package.json:2-10 (declared version, private package and build `rsbuild build`); users_simple/rsbuild.config.ts:5-31 (own configuration, exposes UserList in `remoteEntry.js` and consumes common_simple); package.json:11, :13 (aggregate build calls application build) |

## Observations

**1. common_simple.** Has its own build, exposing Button and Card components under name common_simple and file `remoteEntry.js` (common_simple/package.json:8; common_simple/rsbuild.config.ts:9-14). Shell and users_simple reference this file at localhost:3001 (core_simple/rsbuild.config.ts:12; users_simple/rsbuild.config.ts:15). These addresses and local server port do not constitute a deployment artifact. Version 1.0.0 remains only declared in manifest, without observed publication (common_simple/package.json:2-10).

**2. core_simple.** Own build configures shell as a consumer of both remotes through local URLs, without incorporating other applications’ source into its build configuration (core_simple/package.json:8; core_simple/rsbuild.config.ts:9-14). Root only delegates build to directory core_simple (package.json:14). Port 3000 is local server configuration, without observed production hosting (core_simple/rsbuild.config.ts:31-33). Version field is unused in publication (core_simple/package.json:2-10).

**3. users_simple.** Its build exposes `./UserList`, pointing to local App, and references remote common_simple at localhost:3001 (users_simple/package.json:8; users_simple/rsbuild.config.ts:9-16). Shell fetches it at localhost:3002, corresponding to its configured server port (core_simple/rsbuild.config.ts:13; users_simple/rsbuild.config.ts:33-35). This demonstrates separate build targets and local consumption configuration, but no deploy in snapshot. Version 1.0.0 also has no observed publication use (users_simple/package.json:2-10).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.

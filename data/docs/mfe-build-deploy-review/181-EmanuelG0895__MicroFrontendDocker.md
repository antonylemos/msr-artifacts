---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
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

# 181 — EmanuelG0895/MicroFrontendDocker

## Repository overview

Technical assessment with three React applications built with Rspack, without workspace: each directory has `package.json`, lockfile and same script set, `build` (`NODE_ENV=production rspack build`) and `start:prod` (`npx serve -s dist -l <porta>`) (MF-Shell/package.json:5,9; MF-Characters/package.json:5,9; MF-CharacterDetail/package.json:5,9). No root script or CI. The `webpack.config.js` files of MF-Characters and MF-CharacterDetail, with `publicPath: 'auto'` and `mode: 'development'` (MF-Characters/webpack.config.js:7,13; MF-CharacterDetail/webpack.config.js:7,13), are called by no script; current build uses `rspack.config.ts`.

Packaging uses Docker. Three multi-stage Dockerfiles have the same form: a `node:18-alpine` stage installs dependencies and runs `pnpm run build`, and a production stage copies `dist`, installs `serve` and production dependencies (Dockerfile:2-38; MF-Characters/Dockerfile:2-34; MF-CharacterDetail/Dockerfile:2-34). Root file builds only `MF-Shell/` (Dockerfile:7-8,15) and starts through start.sh, waiting for `/health` of both remotes before running `start:prod` (Dockerfile:34,44; start.sh:7-21); remote files run `start:prod` directly (MF-Characters/Dockerfile:40; MF-CharacterDetail/Dockerfile:40). The docker-compose.yml has one service per application, each with its own `build` (docker-compose.yml:18-21, 35-38, 52-55), and a service `nginx:alpine`, the only one with a published port (docker-compose.yml:3-8). The nginx.conf proxies `/` to `mf-shell:3000`, `/characters` to `mf-characters:3001` and `/character-detail` to `mf-character-detail:3002` (nginx.conf:6-16, 29-30, 38-39, 47-48); `/health` responds from nginx itself and `/ws` goes to shell (nginx.conf:23-24, 56-57). The `.dockerignore` files (at root and each directory) only exclude dependencies, builds, documentation and local files from image context.

Production arrangement does not match composition. Remote URLs in host are fixed, `http://localhost:3003/remoteEntry.js` and `http://localhost:3002/remoteEntry.js` (MF-Shell/module-federation.config.ts:4-5), and remotes generate bundle with absolute `publicPath` on development server ports, 3003 and 3002 (MF-CharacterDetail/rspack.config.ts:25,38; MF-Characters/rspack.config.ts:25,33). In images, remotes serve on 3001 and 3002 (MF-Characters/package.json:9; MF-CharacterDetail/package.json:9), ports compose does not publish, and proxy exposes them only through path prefixes unused by host. According to snapshot, browser would not reach `remoteEntry.js` files in Docker profile; this limits deploy delivery, but does not change that each application is packaged separately. The validate-project.sh and validate-project.ps1 only check compose and nginx routes (validate-project.sh:45, 59-84; validate-project.ps1:44, 60-88). The `ops-cors` occurrences are development server headers (MF-Shell/rspack.config.ts:28-29; MF-CharacterDetail/rspack.config.ts:29).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | MF-CharacterDetail | separate | separate | `/character-detail` through nginx on port 80 (nginx.conf:47-48; docker-compose.yml:5-6); internal service `mf-character-detail:3002` (nginx.conf:15; MF-CharacterDetail/package.json:9); port 3003 in development (MF-CharacterDetail/rspack.config.ts:25) | No | MF-CharacterDetail/package.json:5 (`rspack build`); MF-CharacterDetail/rspack.config.ts:38 (`publicPath: "http://localhost:3003/"`); MF-CharacterDetail/Dockerfile:2-40 (own build and image, `EXPOSE 3002`); docker-compose.yml:52-55 (service `mf-character-detail`); nginx.conf:47-48 (route `/character-detail`) |
| 2 | MF-Characters | separate | separate | `/characters` through nginx on port 80 (nginx.conf:38-39; docker-compose.yml:5-6); internal service `mf-characters:3001` (nginx.conf:11; MF-Characters/package.json:9); port 3002 in development (MF-Characters/rspack.config.ts:25) | No | MF-Characters/package.json:5 (`rspack build`); MF-Characters/rspack.config.ts:33 (`publicPath: "http://localhost:3002/"`); MF-Characters/Dockerfile:2-40 (own build and image, `EXPOSE 3001`); docker-compose.yml:35-38 (service `mf-characters`); nginx.conf:38-39 (route `/characters`) |
| 3 | MF-Shell | separate | separate | `/` through nginx on port 80 (nginx.conf:29-30; docker-compose.yml:5-6); internal service `mf-shell:3000` (nginx.conf:7; MF-Shell/package.json:9) | No | MF-Shell/package.json:5 (`rspack build`); MF-Shell/rspack.config.ts:35 (`publicPath: "auto"`); Dockerfile:2-44 (own build and image from `MF-Shell/`, `EXPOSE 3000`); start.sh:7-21 (waits for remotes and starts shell); docker-compose.yml:18-21 (service `mf-shell`); nginx.conf:29-30 (route `/`) |

## Observations

**1. MF-CharacterDetail.** Own build and image, assembled from application directory (MF-CharacterDetail/Dockerfile:7-18), in own compose service (docker-compose.yml:52-55): separate deploy. Bundle is generated with `publicPath: "http://localhost:3003/"` (MF-CharacterDetail/rspack.config.ts:38), address used by host (MF-Shell/module-federation.config.ts:4), but container serves on port 3002 (MF-CharacterDetail/Dockerfile:37; MF-CharacterDetail/package.json:9) and reaches browser only through `/character-detail` (nginx.conf:47-48). The `version: "0.0.1"` (MF-CharacterDetail/package.json:3) is unused in publication and service has no named image or tag (docker-compose.yml:52-55): Versioning `No`.

**2. MF-Characters.** Same arrangement: own build and image (MF-Characters/Dockerfile:7-18), service `mf-characters` (docker-compose.yml:35-38). Bundle points to `http://localhost:3002/` (MF-Characters/rspack.config.ts:33), consistent with host (MF-Shell/module-federation.config.ts:5) only in development; in image application serves on 3001 (MF-Characters/Dockerfile:37; MF-Characters/package.json:9), exposed through `/characters` (nginx.conf:38-39). No own version used in publication (MF-Characters/package.json:3; docker-compose.yml:35-38).

**3. MF-Shell.** Root Dockerfile belongs to it: copies only `MF-Shell/` (Dockerfile:7-8,15) and generates an image containing only host `dist` (Dockerfile:29); remotes do not enter it, loading at runtime through fixed URLs at `localhost` (MF-Shell/module-federation.config.ts:4-5). Dependency between deploys is in start.sh, starting shell only when both remotes respond (start.sh:7-16). It is the only application with `publicPath: "auto"` (MF-Shell/rspack.config.ts:35) and nginx entry port (nginx.conf:29-30). No observed versioning (MF-Shell/package.json:3; docker-compose.yml:18-21).

## Summary

Applications: 3. Build (separate: 3). Deploy (separate: 3). Independent versioning: 0.

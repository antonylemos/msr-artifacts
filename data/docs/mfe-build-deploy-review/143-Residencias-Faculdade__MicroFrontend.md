---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
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

# 143 — Residencias-Faculdade/MicroFrontend

## Repository overview

The repository has only one frontend application, root Vite shell (`.`). No workspace or CI workflow is present, and `matches.csv` has no `ci-*` or `cfg-public-path` occurrence. Build is `tsc && vite build` (package.json:8), with output in `dist` (vite.config.ts:8); other scripts are development server `vite` on port 3000 and `vite preview` (package.json:7, :9; vite.config.ts:7).

Packaging is a two-stage Docker image: `node:22-alpine` installs dependencies and runs `npm run build` (Dockerfile:2-9), and `nginx:alpine` copies `nginx.conf` and shell `dist/` to `/usr/share/nginx/html/` and exposes port 80 (Dockerfile:12-18). The `nginx.conf` serves SPA with `try_files ... /index.html` (nginx.conf:9-11), one-year caching with `Access-Control-Allow-Origin "*"` for assets (nginx.conf:14-19) and `no-cache` for `index.html` (nginx.conf:22-25). The `docker-compose.yml` builds this image in service `shell`, with `context: .`, publishing container port 80 at host `${SHELL_PORT:-3000}` (docker-compose.yml:4-15). This is a local setup: Keycloak in same compose runs in `start-dev` (docker-compose.yml:36).

Other `ops-*` artifacts do not cover snapshot frontend applications. Compose service `posts-crud` builds a "Micro frontend Angular (outro repo)" (English translation: "Angular micro frontend (another repo)") from `context: ../Caio/aprendendo/primeiro-projeto`, outside repository (docker-compose.yml:17-24); the `ops-cors` occurrence at docker-compose.yml:18 is a comment requesting this frontend expose `main.js` with CORS. Service `keycloak` uses published image `quay.io/keycloak/keycloak:26.2` (docker-compose.yml:34-35), and `Dockerfile.keycloak` packages Keycloak with project realm (Dockerfile.keycloak:1-8), without a compose service using it. The `ops-hosting` occurrences are in README, citing Vercel/Railway as production scenario for shell (README.md:56) and instructing publication of plugged-in frontend and recording `main.js` URL (README.md:182); no hosting configuration is present in snapshot, and README does not decide Deploy column. README registration example uses `posts-crud` at `http://localhost:4200/main.js` (README.md:64), whereas snapshot registry points to `member-manager` at `https://crud-member-manager.vercel.app/main.js` (public/microfrontends.json:6), external unit’s address, not shell’s.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | separate | port `${SHELL_PORT:-3000}` on host, 80 in container (docker-compose.yml:9; Dockerfile:17; nginx.conf:3) | No | package.json:8 (`tsc && vite build`); vite.config.ts:8 (`outDir: 'dist'`); Dockerfile:2-9 (shell build); Dockerfile:12-18 (Nginx image with shell `dist/`); nginx.conf:9-25 (SPA and cache); docker-compose.yml:4-15 (service `shell`, `context: .`) |

## Observations

**1. ..** Root shell. Separate build: Vite build generates only its own `dist` (package.json:8; vite.config.ts:8); custom element `member-manager` code does not enter artifact, loading at runtime from another address (public/microfrontends.json:6). Separate deploy: Dockerfile image packages only shell `dist/` (Dockerfile:16), and compose service `shell` builds it separately from `posts-crud`, having its own image and port from another repository (docker-compose.yml:4-9, :19-24). No versioning: package.json:3 declares `1.0.0`, unused in publication, and package is `private` (package.json:4).

## Summary

Applications: 1. Build (separate: 1). Deploy (separate: 1). Independent versioning: 0.

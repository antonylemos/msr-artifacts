---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
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

# 128 — fudoyoki/ai-portal-mfe-example

## Repository overview

npm workspaces monorepo (`apps/*` and `packages/*`) orchestrated by Turborepo: root `build` only delegates to `turbo run build` (package.json:5-11), and Turbo `build` task depends on builds of packages each app depends on and saves `dist/**` (turbo.json:4-7). Both frontend applications, `apps/shell` (host) and `apps/mfe-dashboard` (remote), have the same `build` script (`tsc && vite build`) and their own `vite.config.ts` with `build.target: 'esnext'` (apps/shell/package.json:8; apps/shell/vite.config.ts:71-75; apps/mfe-dashboard/package.json:8; apps/mfe-dashboard/vite.config.ts:51-55). Packages `packages/shared-types` and `packages/ui-kit` are libraries compiled with `tsup`, without deploy. The snapshot has no lockfile or CI workflow, and `matches.csv` has no `ci-*` or `cfg-public-path` occurrences.

Production packaging uses Docker. Each frontend application has a two-stage Dockerfile with root context: stage `builder` copies root, `packages/` and only its own app directory, builds `shared-types`, `ui-kit` and app, and stage `production` (`nginx:alpine`) copies only app `dist` and its `nginx.conf` (apps/shell/Dockerfile:2-33; apps/mfe-dashboard/Dockerfile:2-33). The `docker-compose.yml` starts one image per service: `shell` on port 3000, depending on `mfe-dashboard` and `bff`, and `mfe-dashboard` on 3001 (docker-compose.yml:5-27); service `mfe-chat` is only commented out (docker-compose.yml:29-37). The `nginx.conf` files serve shell SPA with fallback to `index.html` (apps/shell/nginx.conf:1-5, 24-26) and dashboard with open CORS and no fallback (apps/mfe-dashboard/nginx.conf:1-9, 28-30); both disable `remoteEntry.js` caching (apps/shell/nginx.conf:18-21; apps/mfe-dashboard/nginx.conf:22-26). The `.dockerignore` excludes `dist/` and `node_modules/` from context (.dockerignore:1-8).

Two production paths do not connect in the snapshot. Compose publishes dashboard in its own container on port 3001, but shell outside development points remote to `${CDN_URL}/mfeDashboard/remoteEntry.js`, defaulting to `https://cdn.example.com` (apps/shell/vite.config.ts:5, 17-23); Dockerfiles define neither `CDN_URL` nor `NODE_ENV` (apps/shell/Dockerfile:14-20; docker-compose.yml:5-16), and `/assets/remoteEntry.js` at `localhost:3001` applies only in development branch (apps/shell/vite.config.ts:18-19). README describes another publication, through `npm run build` and `aws s3 sync` of each `dist` to `s3://cdn/shell/` and `s3://cdn/mfe-dashboard/` (README.md:185-196, `ops-hosting` occurrences), with prefix `mfe-dashboard` differing from `mfeDashboard` expected by shell; under the rule, README does not decide Deploy column. The `docker-compose.dev.yml` is for development: it runs `npm run dev` (Vite) for each workspace in `node:22-alpine` with mounted code (docker-compose.dev.yml:8-37) and does not count as deploy. The `cors: true` occurrences in Vite `server` are also development-only (apps/shell/vite.config.ts:62-66; apps/mfe-dashboard/vite.config.ts:42-46).

Outside frontend applications, `apps/bff` (NestJS) has its own Dockerfile, with `npm run build`, non-root user and healthcheck at `/api/health` (apps/bff/Dockerfile:2-43), and service `bff` on port 4000 in compose (docker-compose.yml:40-58), plus development service (docker-compose.dev.yml:40-52).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/mfe-dashboard | separate | separate | port 3001 (apps/mfe-dashboard/nginx.conf:2; docker-compose.yml:23-24); `${CDN_URL}/mfeDashboard/remoteEntry.js`, default `https://cdn.example.com`, as shell expects in production (apps/shell/vite.config.ts:22) | No | apps/mfe-dashboard/package.json:8 (`tsc && vite build`); apps/mfe-dashboard/vite.config.ts:8-56 (own configuration, generates `remoteEntry.js`); apps/mfe-dashboard/Dockerfile:2-33 (app build and nginx image containing only its `dist`); apps/mfe-dashboard/nginx.conf:1-38 (remote server, with CORS); docker-compose.yml:19-27 (service `mfe-dashboard`) |
| 2 | apps/shell | separate | separate | port 3000 (apps/shell/nginx.conf:2; docker-compose.yml:9-10) | No | apps/shell/package.json:8 (`tsc && vite build`); apps/shell/vite.config.ts:25-76 (own configuration, consumes remote by URL); apps/shell/Dockerfile:2-33 (app build and nginx image containing only its `dist`); apps/shell/nginx.conf:1-34 (SPA server); docker-compose.yml:5-16 (service `shell`) |

## Observations

**1. apps/mfe-dashboard.** Separate build: own script and `vite.config.ts`, generating `dist` for remote `mfeDashboard` with `remoteEntry.js` (apps/mfe-dashboard/package.json:8; apps/mfe-dashboard/vite.config.ts:11-17); shared packages are built separately and declared `shared` (apps/mfe-dashboard/Dockerfile:18-19; apps/mfe-dashboard/vite.config.ts:20-39). Separate deploy: own image, whose final stage copies only `apps/mfe-dashboard/dist` (apps/mfe-dashboard/Dockerfile:23-29), published by compose service `mfe-dashboard` on port 3001 (docker-compose.yml:19-24). Its `nginx.conf` is designed to serve a remote: CORS `*` on all responses and again on `remoteEntry.js`, without caching for that file (apps/mfe-dashboard/nginx.conf:6-9, 21-26). Address shell uses in production is different, a configurable CDN (apps/shell/vite.config.ts:22), published by no snapshot artifact. Versioning `No`: `version: "0.1.0"` with `private: true` (apps/mfe-dashboard/package.json:2-4), unused in publication.

**2. apps/shell.** Separate build: `tsc && vite build` with own configuration (apps/shell/package.json:8; apps/shell/vite.config.ts:25-76); dashboard code does not enter artifact, which only stores `remoteEntry.js` URL (apps/shell/vite.config.ts:30-31). Separate deploy: own image containing only `apps/shell/dist` (apps/shell/Dockerfile:23-29) and service `shell` on port 3000 (docker-compose.yml:5-10); `depends_on` only orders container startup (docker-compose.yml:11-13). Because remote URL is fixed during build (apps/shell/vite.config.ts:17-23) and image does not define `CDN_URL` (apps/shell/Dockerfile:14-20), changing dashboard address requires rebuilding shell. Versioning `No`: `version: "0.1.0"` with `private: true` (apps/shell/package.json:2-4).

## Summary

Applications: 2. Build (separate: 2). Deploy (separate: 2). Independent versioning: 0.

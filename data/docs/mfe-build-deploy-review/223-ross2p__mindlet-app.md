---
schema: 1
id: 1091389540
full_name: ross2p/mindlet-app
commit: 868bf9c81af85085a6befc5921bea6c01211228d
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

# 223 — ross2p/mindlet-app

## Repository overview

The repository is Mindlet superproject and contains no frontend application code. All five Next.js zones (dashboard, auth, profile, study and decks) and libraries `libs/types` and `libs/shared` are Git submodules with their own repositories (.gitmodules:1-21), and directories `apps/*` and `libs/*` are absent from snapshot. Structural review has an empty "Units" table and counts 0 applications; therefore table below has no rows. Snapshot has no `package.json`, Dockerfile or CI workflow, and `matches.csv` has no `ci-*` or `cfg-public-path` occurrences.

What is versioned here is local orchestration. The `compose.yml` presents itself as "frontend stack", started with `docker compose build --parallel 1 && docker compose up` and entry at `http://localhost:8080` (compose.yml:1-8). It declares one service per zone, each built from submodule directory with its `Dockerfile`, receiving `NEXT_PUBLIC_API_BASE_URL` as build argument and publishing container port 3000 on host ports 3001-3005 (compose.yml:15-32 for `dashboard`; equivalents in compose.yml:34-51, :53-70, :72-89 and :91-108). These Dockerfiles reside in submodules and cannot be opened. Service `nginx` uses public image `nginx:1.27-alpine`, publishes port 8080, mounts configurations from `infra/nginx/` and depends on all five zones (compose.yml:110-127). README describes this as local development environment: `infra/nginx` is "dev reverse proxy" and `compose.yml` is "one-command local stack" (README.md:10-11), under title "Local dev (Docker)" (README.md:26-35). They contradict each other: README says each service runs `npm install` and `npm run dev` in `node:20-alpine` with repository mounted at `/workspace` (README.md:37), but `compose.yml` builds each zone through its own Dockerfile and mounts no volumes in zones (compose.yml:16-18, :28-29). What each zone Dockerfile does (production build or development server) is not visible in snapshot.

All `ops-*` occurrences in `matches.csv` belong to nginx gateway, not a frontend application. The `infra/nginx/nginx.conf`, file mounted by compose (compose.yml:115), defines one upstream per zone on service port 3000 (infra/nginx/nginx.conf:14-18), redirects `/` to `/dashboard/` (infra/nginx/nginx.conf:29-31) and forwards each prefix to its upstream (infra/nginx/nginx.conf:36-38 for `/dashboard/`, :43-45 for `/auth/`, :50-52 for `/profile/`, :57-59 for `/study/` and :64-66 for `/decks/`). The `config/nginx/nginx.conf` repeats same routes but points to service ports 3001-3005 (config/nginx/nginx.conf:11-25; routes in config/nginx/nginx.conf:31-73), whereas containers listen on 3000 (compose.yml:24-25); compose does not mount this file (compose.yml:114-118), and it appears to be an earlier version. The `infra/nginx/nginx.conf.local` is non-Docker variant, with upstreams at `localhost:3001-3005` and listening on 8080 (infra/nginx/nginx.conf.local:16-23), used by `start-local-dev.sh`, which only checks submodules and prints instructions for manually running `npm run dev` in each zone and nginx (start-local-dev.sh:24-39; start-local-dev.sh:75-97). The `infra/nginx/api-gateway.conf` and `infra/nginx/api-gateway.host.conf` are backend API gateway (`/api/v1/...` to services such as `auth-service:3000`) (infra/nginx/api-gateway.conf:5-7; infra/nginx/api-gateway.conf:57-68; infra/nginx/api-gateway.host.conf:1-5), not mounted by compose and unrelated to frontend zones. Backend resides in another repository, `mindlet-api` (compose.yml:10-12).

Regarding versioning, the only package with described publication is `@ross2p/shared`, published to GitHub Packages from repository `mindlet-shared` (README.md:53-65), a library also outside snapshot. This is documentation, not a snapshot artifact. None of this contradicts classification (`multi-zones`, five `multi-repo` units): compose and gateway suggest per-zone build and deploy, each in its own container, but zones are not applications in this snapshot.

## Applications

No frontend applications in the structural review.

## Observations

No frontend applications in the structural review.

## Summary

Applications: 0.

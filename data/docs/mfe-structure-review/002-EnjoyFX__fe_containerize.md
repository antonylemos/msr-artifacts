---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 002 — EnjoyFX/fe_containerize

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| backend | backend/package.json | backend/package.json:1-8 (NestJS package) | backend/src/main.ts:5-21 (starts an HTTP server, no UI) | backend/nest-cli.json:1-5 (Nest configuration); backend/package.json:6 (`nest build`) | — | backend/Dockerfile:2-17 (server image); docker-compose.yml:18-19 (backend context) | No | NestJS server, with no frontend application entry. |
| frontend | frontend/index.html;frontend/package.json;frontend/vite.config.js | frontend/package.json:1-10 (React/Vite package) | frontend/index.html:9-10 (loads src/main.jsx); frontend/src/main.jsx:6-9 (mounts the UI) | frontend/vite.config.js:4-13 (Vite configuration); frontend/package.json:8 (`vite build`) | — | frontend/Dockerfile:2-14 (build and nginx image); docker-compose.yml:39-40 (frontend context) | Yes | React application with its own entry, Vite build and image. |
| microfrontend | microfrontend/index.html;microfrontend/package.json;microfrontend/vite.config.js | microfrontend/package.json:1-10 (widget package) | microfrontend/vite.config.js:25-29 (src/main.jsx entry); microfrontend/src/main.jsx:7-11 (mounts the UI); microfrontend/index.html:9-12 (standalone entry) | microfrontend/vite.config.js:19-32 (own IIFE build); microfrontend/package.json:8 (`vite build`) | — | microfrontend/Dockerfile:2-14 (build and nginx image); docker-compose.yml:35-36 (microfrontend context) | Yes | Frontend widget with a mount function and its own build, runnable independently through the local HTML. |

## Summary

Frontend applications in the snapshot: 2 (frontend, microfrontend).

---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
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

# 002 — EnjoyFX/fe_containerize

## Repository overview

Demonstration of "containerization" with four services: a React/Vite `frontend`, a React/Vite `microfrontend` generating an `iife` widget, a NestJS `backend` and PostgreSQL. There is no workspace: each application has its own `package.json`, Dockerfile and build (frontend/package.json:8; microfrontend/package.json:8). The frontend and microfrontend Dockerfiles are identical: a Node stage runs `npm run build` and an nginx stage serves `dist` with the folder’s own `nginx.conf` (frontend/Dockerfile:2-14; microfrontend/Dockerfile:2-14). The backend has its own Node image (backend/Dockerfile:2-20).

There are two execution arrangements, and both keep each application in its own container:
- **docker-compose.yml:** one service per application, each with `build` from its folder (docker-compose.yml:18-19, 35-36, 39-40). Only frontend publishes a port externally (docker-compose.yml:42-43). The microfrontend nginx only serves static build files (microfrontend/nginx.conf:1-9). Microfrontend remains on the internal network and reaches the browser through the frontend nginx proxy, forwarding `/mfe/` to service `microfrontend` and disabling caching because "bundle changes on redeploy" (frontend/nginx.conf:56-63). The same nginx proxies `/api/` to backend (frontend/nginx.conf:45-46).
- **Helm (k3s):** a chart with one Deployment and one Service for each application, each with its own image (helm/fe-containerize/templates/frontend.yaml:1-56; helm/fe-containerize/templates/microfrontend.yaml:1-56; helm/fe-containerize/values.yaml:4-7). The domain Ingress points only to frontend (helm/fe-containerize/templates/frontend.yaml:58-84; helm/fe-containerize/values.yaml:36-38). Script helm/build-and-deploy.sh builds all images with `docker compose build`, imports each into k3s and installs the chart in a single release (helm/build-and-deploy.sh:11, 15-18, 29-38). README also describes updating an isolated application: rebuilding only service `frontend`, importing only its image and recreating only its pods (helm/README.md:160-170).

The other chart files (helm/fe-containerize/templates/backend.yaml, helm/fe-containerize/templates/db.yaml, helm/fe-containerize/templates/secrets.yaml, helm/fe-containerize/templates/_helpers.tpl and helm/fe-containerize/Chart.yaml) handle backend, database, secrets and common labels, and do not cover frontend applications. The `ops-hosting` occurrences are all in helm/README.md, in `kubectl` and `helm` commands. In development, frontend Vite reproduces the proxy, sending `/mfe` to microfrontend port 3001 (frontend/vite.config.js:7-10; microfrontend/vite.config.js:34). There is no CI.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | frontend | separate | separate | Ingress `demo.triggers.online`, path `/` (helm/fe-containerize/values.yaml:36-38; helm/fe-containerize/templates/frontend.yaml:74-83); host port 3000 in compose (docker-compose.yml:42-43) | No | frontend/package.json:8 (`vite build`); frontend/Dockerfile:2-14 (own build and nginx image); docker-compose.yml:39-40 (service `frontend`); helm/fe-containerize/templates/frontend.yaml:1-84 (own Deployment, Service and Ingress); helm/fe-containerize/values.yaml:5 (image `fe_containerize-frontend:latest`) |
| 2 | microfrontend | separate | separate | Internal service `microfrontend:80`, exposed at `/mfe/` by frontend nginx (frontend/nginx.conf:57-58); port 3001 in development (microfrontend/vite.config.js:34) | No | microfrontend/package.json:8 (`vite build`); microfrontend/Dockerfile:2-14 (own build and nginx image); docker-compose.yml:35-36 (service `microfrontend`); helm/fe-containerize/templates/microfrontend.yaml:1-56 (own Deployment and Service); helm/fe-containerize/values.yaml:7 (image `fe_containerize-microfrontend:latest`) |

## Observations

**1. frontend.** Own build and image, own compose service and own chart Deployment. Deployment is therefore separate, even though the chart script publishes everything at once (helm/build-and-deploy.sh:11, 29-38) and README shows this application’s isolated update (helm/README.md:160-170). This is the entry point: it concentrates the Ingress and proxies to microfrontend and backend (frontend/nginx.conf:45-46, 57-58). No observed versioning: the image uses tag `latest` (helm/fe-containerize/values.yaml:5), and `version: 1.0.0` from frontend/package.json:4 does not appear in publication.

**2. microfrontend.** Same arrangement as frontend: own nginx image, own compose service and own chart Deployment, whose readiness check queries its own bundle `/widget.iife.js` (helm/fe-containerize/templates/microfrontend.yaml:29-31). It has no public address of its own: it reaches the browser through frontend path `/mfe/`. Deployment separation is therefore by process and image rather than origin. The `version: 1.0.1` in package.json (microfrontend/package.json:4) is written into the bundle and shown in the widget (microfrontend/vite.config.js:5-14; microfrontend/src/Widget.jsx:64), but not used for publishing: the image also uses `latest` (helm/fe-containerize/values.yaml:7). Versioning is therefore `No`.

## Summary

Applications: 2. Build (separate: 2). Deploy (separate: 2). Independent versioning: 0.

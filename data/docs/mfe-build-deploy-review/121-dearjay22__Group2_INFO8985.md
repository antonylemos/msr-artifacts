---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
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

# 121 — dearjay22/Group2_INFO8985

## Repository overview

Course project starting four Spring Boot services, two React applications (CRA) and a monitoring and load stack through Docker Compose. No root `package.json` or workspace: each frontend application has its own manifest, lockfile and scripts, and build is each application’s `react-scripts build` (frontend/shell-app/package.json:15-20; frontend/products-mf/package.json:15-20). Both have identical two-stage Dockerfiles: they install dependencies with `npm ci`, run `npm run build` and copy directory `build` to their own `nginx:alpine` image (frontend/shell-app/Dockerfile:1-12; frontend/products-mf/Dockerfile:1-12). The `nginx.conf` files are also identical, with a single `location /` returning `index.html` for unknown routes (frontend/shell-app/nginx.conf:1-11; frontend/products-mf/nginx.conf:1-11).

The docker-compose.yml declares one service per application, each built from its own directory: `shell-app` on host port 3000 and `products-mf` on 3001 (docker-compose.yml:59-71). The same file builds backends `discovery-service`, `product-service`, `order-service` and `api-gateway` (docker-compose.yml:7-54), each with its own Maven + JRE Dockerfile (backend/api-gateway/Dockerfile:1-12; backend/discovery-service/Dockerfile:1-22; backend/order-service/Dockerfile:1-12; backend/product-service/Dockerfile:1-12), and starts ready-made image services covering no frontend application: a `seeder` with curl, Prometheus, Grafana (port 3030), InfluxDB and k6 (docker-compose.yml:76-135).

The only workflow (.github/workflows/ci.yml:1-42) runs on push to `main` with three jobs: `build` performs `docker compose build` for all services (.github/workflows/ci.yml:18-19), `deploy` performs `docker compose up -d` on runner itself (.github/workflows/ci.yml:31-32) and `cleanup` shuts everything down with `docker compose down -v` (.github/workflows/ci.yml:41-42). No image push or external destination: CI "deploy" starts and stops containers on runner machine. Observed publication is Compose itself, where each application is a separate image and service; README says everything runs in GitHub Codespaces (README.md:2, 16), matching iframe URL constructed by shell for Codespace port 3001 (frontend/shell-app/src/App.js:6-15).

README contradicts artifacts in several places. It says to enter `shell-app` and `products-mf` from root (README.md:54, 57, 66), but directories are in `frontend/`; says to run `npm run dev` (README.md:67, 73), a script absent from both `package.json` files (frontend/shell-app/package.json:15-20; frontend/products-mf/package.json:15-20); and lists applications on ports 5173 and 4173 (README.md:82-83) and Grafana on 3000 (README.md:46, 86), whereas Compose places shell on 3000 and Grafana on 3030 (docker-compose.yml:62, 110). Under the rule, README does not decide Deploy column.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | frontend/products-mf | separate | separate | host port 3001 (docker-compose.yml:69); `https://${codespaceName}-3001.app.github.dev` in Codespaces, as shell iframe destination (frontend/shell-app/src/App.js:14) | No | frontend/products-mf/package.json:17 (`react-scripts build`); frontend/products-mf/Dockerfile:1-12 (own build and nginx image); frontend/products-mf/nginx.conf:1-11 (serves build with fallback to `index.html`); docker-compose.yml:66-71 (service `products-mf`, `build: ./frontend/products-mf`, `3001:80`); .github/workflows/ci.yml:18-19, 31-32 (build and startup of all Compose services) |
| 2 | frontend/shell-app | separate | separate | host port 3000 (docker-compose.yml:62) | No | frontend/shell-app/package.json:17 (`react-scripts build`); frontend/shell-app/Dockerfile:1-12 (own build and nginx image); frontend/shell-app/nginx.conf:1-11 (serves build with fallback to `index.html`); docker-compose.yml:59-64 (service `shell-app`, `build: ./frontend/shell-app`, `3000:80`); .github/workflows/ci.yml:18-19, 31-32 (build and startup of all Compose services) |

## Observations

**1. frontend/products-mf.** Separate build: `react-scripts build` runs within application’s own image and generates only its build (frontend/products-mf/Dockerfile:3-6). Separate deploy: application has its own nginx image (frontend/products-mf/Dockerfile:8-12) and Compose service, published on port 3001 (docker-compose.yml:66-71). CI builds and starts all services with one command (.github/workflows/ci.yml:19, 32), but each application retains its own image and container, and job publishes nothing outside runner. Port 3001 is what shell uses to construct iframe URL in Codespaces (frontend/shell-app/src/App.js:14); composition review left this destination `Undetermined`, because it is only a port. Versioning `No`: `version: "0.1.0"` with `private: true` (frontend/products-mf/package.json:3-4) is unused in any publication.

**2. frontend/shell-app.** Same arrangement as products-mf: `react-scripts` build inside own image (frontend/shell-app/Dockerfile:1-12) and own Compose service on port 3000 (docker-compose.yml:59-64). Dockerfile and `nginx.conf` copy those of products-mf, without any path, proxy or `publicPath` adjustment; shell nginx forwards nothing to products-mf, reached directly through its port. Versioning `No`: `version: "0.1.0"` and `private: true` (frontend/shell-app/package.json:3-4), unused in publication.

## Summary

Applications: 2. Build (separate: 2). Deploy (separate: 2). Independent versioning: 0.

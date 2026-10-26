---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
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

# 190 — dmalancioiu/SOA-project

## Repository overview

Academic food delivery platform project: Spring Boot microservices in `backend/`, OpenFaaS functions in `infrastructure/faas/` and four React applications with webpack in `frontend/`. No `package.json` at root or in `frontend/`, no workspace or CI. Each application has the same script pair, `start` with development server and `build` with `webpack --mode production` (frontend/shell-app/package.json:7-8; frontend/restaurant-catalog/package.json:7-8; frontend/order-tracking/package.json:7-8; frontend/user-dashboard/package.json:18-19), reading `webpack.config.js` from its own directory. All four configurations use `publicPath: 'auto'` (frontend/shell-app/webpack.config.js:18; frontend/restaurant-catalog/webpack.config.js:18; frontend/order-tracking/webpack.config.js:18; frontend/user-dashboard/webpack.config.js:19). The `ops-cors` occurrences are development server headers (`devServer.headers`, frontend/shell-app/webpack.config.js:13-15 and equivalents).

Packaging uses Docker. Each application has an identical multi-stage Dockerfile: a `node:18-alpine` stage runs `npm ci` and `npm run build`, and an `nginx:alpine` stage copies its directory’s `nginx.conf` and `dist` to `/usr/share/nginx/html`, on port 80 (frontend/shell-app/Dockerfile:2-31 and equivalents in frontend/restaurant-catalog, frontend/order-tracking and frontend/user-dashboard). All four `nginx.conf` files are also identical: cached static files, `/` fallback to `index.html` and `/health` (frontend/shell-app/nginx.conf:20-35 and equivalents). Root docker-compose.yml has one service per application, each with `build.context` in its directory and a published port: `restaurant-catalog` on 3001, `order-tracking` on 3002, `user-dashboard` on 3003 and `shell-app` on 3000 (docker-compose.yml:301-310, 317-326, 333-342, 349-361). These ports match host’s fixed remote URLs, `http://localhost:300N/remoteEntry.js` (frontend/shell-app/webpack.config.js:51-53), so browser reaches each `remoteEntry.js` in remote container under Docker profile. Compose `REACT_APP_*` variables, including remote URLs passed to shell (docker-compose.yml:354-359), are runtime environment of nginx containers serving only static files; compose does not pass them as build arguments, and host reads no variables for remote URLs.

In front sits an `nginx:alpine` service on port 80 with mounted infrastructure/nginx/nginx.conf (docker-compose.yml:372-384). It proxies `/` only to `shell-app:80` and `/api/` and `/ws/` to gateway and notification service (infrastructure/nginx/nginx.conf:13-15, 37-38, 46-47, 60-61); remotes do not pass through it. One point limits image reproducibility: Dockerfiles run `npm ci` (frontend/shell-app/Dockerfile:10 and equivalents), requiring `package-lock.json`, but no frontend directory contains a lockfile in snapshot, and each `.gitignore` excludes it (frontend/shell-app/.gitignore:3 and equivalents). This affects whether image builds as is, not the fact that each application is packaged separately.

Other `ops-*` artifacts do not cover frontend applications. Dockerfiles in `backend/` are Maven/Temurin images for Java microservices (backend/api-gateway/Dockerfile:2, 11 and equivalents), built by services `user-service` through `api-gateway` in root compose (docker-compose.yml:97-260); backend/api-gateway/docker-compose.yml and backend/notification-service/docker-compose.yml are local compose files for those two services (backend/api-gateway/docker-compose.yml:16-17; backend/notification-service/docker-compose.yml:77-79). Dockerfiles in `infrastructure/faas/` are functions `delivery-analytics`, `auto-close-orders` (Python) and `order-completion` (Node/Express, `CMD ["node", "handler.js"]`, infrastructure/faas/order-completion/Dockerfile:1, 25), listed in infrastructure/faas/stack.yml:11-13, 35-37, 68-70; compose OpenFaaS gateway is commented out (docker-compose.yml:272-296). The `ops-hosting` occurrences are `kubectl` and `helm` commands in Markdown guides in backend/notification-service and infrastructure/faas, documentation rather than deployment artifacts; none mentions frontend applications.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | frontend/order-tracking | separate | separate | port 3002 (docker-compose.yml:326); `http://localhost:3002/remoteEntry.js` (frontend/shell-app/webpack.config.js:52); port 3002 in development (frontend/order-tracking/webpack.config.js:10) | No | frontend/order-tracking/package.json:8 (`webpack --mode production`); frontend/order-tracking/webpack.config.js:46-47 (`orderTracking`, `remoteEntry.js`); frontend/order-tracking/Dockerfile:2-31 (own build and nginx image); frontend/order-tracking/nginx.conf:26-28 (serves `dist`); docker-compose.yml:317-326 (service `order-tracking`) |
| 2 | frontend/restaurant-catalog | separate | separate | port 3001 (docker-compose.yml:310); `http://localhost:3001/remoteEntry.js` (frontend/shell-app/webpack.config.js:51); port 3001 in development (frontend/restaurant-catalog/webpack.config.js:10) | No | frontend/restaurant-catalog/package.json:8 (`webpack --mode production`); frontend/restaurant-catalog/webpack.config.js:45-46 (`restaurantCatalog`, `remoteEntry.js`); frontend/restaurant-catalog/Dockerfile:2-31 (own build and nginx image); frontend/restaurant-catalog/nginx.conf:26-28 (serves `dist`); docker-compose.yml:301-310 (service `restaurant-catalog`) |
| 3 | frontend/shell-app | separate | separate | `/` through nginx on port 80 (infrastructure/nginx/nginx.conf:14, 37-38; docker-compose.yml:378); port 3000 (docker-compose.yml:361); port 3000 in development (frontend/shell-app/webpack.config.js:10) | No | frontend/shell-app/package.json:8 (`webpack --mode production`); frontend/shell-app/webpack.config.js:48-54 (host with all three remotes); frontend/shell-app/Dockerfile:2-31 (own build and nginx image); frontend/shell-app/nginx.conf:26-28 (serves `dist`); docker-compose.yml:349-361 (service `shell-app`); infrastructure/nginx/nginx.conf:13-15, 37-38 (proxy for `/`) |
| 4 | frontend/user-dashboard | separate | separate | port 3003 (docker-compose.yml:342); `http://localhost:3003/remoteEntry.js` (frontend/shell-app/webpack.config.js:53); port 3003 in development (frontend/user-dashboard/webpack.config.js:11) | No | frontend/user-dashboard/package.json:19 (`webpack --mode production`); frontend/user-dashboard/webpack.config.js:51-52 (`userDashboard`, `remoteEntry.js`); frontend/user-dashboard/Dockerfile:2-31 (own build and nginx image); frontend/user-dashboard/nginx.conf:26-28 (serves `dist`); docker-compose.yml:333-342 (service `user-dashboard`) |

## Observations

**1. frontend/order-tracking.** Own webpack build, generating unit `remoteEntry.js` (frontend/order-tracking/webpack.config.js:46-47), and own image assembled only from application directory (frontend/order-tracking/Dockerfile:7-16, 25; docker-compose.yml:318-320): separate deploy. Container publishes port 3002 (docker-compose.yml:326), matching URL used by host (frontend/shell-app/webpack.config.js:52) and development server (frontend/order-tracking/webpack.config.js:10). The `version: "1.0.0"` (frontend/order-tracking/package.json:3) is unused in publication, and service has no named image or tag (docker-compose.yml:317-330): Versioning `No`.

**2. frontend/restaurant-catalog.** Same arrangement: own build (frontend/restaurant-catalog/package.json:8; frontend/restaurant-catalog/webpack.config.js:45-46), own image (frontend/restaurant-catalog/Dockerfile:2-31) and service `restaurant-catalog` on port 3001 (docker-compose.yml:301-310), matching `http://localhost:3001/remoteEntry.js` in host (frontend/shell-app/webpack.config.js:51). No own version used in publication (frontend/restaurant-catalog/package.json:3; docker-compose.yml:301-314).

**3. frontend/shell-app.** Host has its own build and image (frontend/shell-app/package.json:8; frontend/shell-app/Dockerfile:2-31), and image contains only its `dist`: remotes do not enter it and are fetched at runtime through fixed URLs (frontend/shell-app/webpack.config.js:51-53). The only application behind edge nginx, proxying `/` to `shell-app:80` (infrastructure/nginx/nginx.conf:13-15, 37-38), besides publishing port 3000 directly (docker-compose.yml:361). Compose declares shell depends on all three remotes (docker-compose.yml:364-367) and passes their URLs in `REACT_APP_*_URL` (docker-compose.yml:357-359), but these variables do not reach bundle, because URLs are fixed in `webpack.config.js`. No observed versioning (frontend/shell-app/package.json:3; docker-compose.yml:349-367).

**4. frontend/user-dashboard.** Own build (frontend/user-dashboard/package.json:19; frontend/user-dashboard/webpack.config.js:51-52), own image (frontend/user-dashboard/Dockerfile:2-31) and service `user-dashboard` on port 3003 (docker-compose.yml:333-342), matching `http://localhost:3003/remoteEntry.js` in host (frontend/shell-app/webpack.config.js:53). Differs from others only in script `start`, passing port on command line, `webpack serve --port 3003` (frontend/user-dashboard/package.json:18), and built-in webpack federation plugin, not changing build. No own version used in publication (frontend/user-dashboard/package.json:3; docker-compose.yml:333-346).

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 0.

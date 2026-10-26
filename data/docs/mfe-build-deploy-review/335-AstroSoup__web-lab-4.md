---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
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

# 335 — AstroSoup/web-lab-4

## Repository overview

Laboratory assignment with Vue/Vite frontend in three independent packages under `frontend/vite/` (host, remote-inputs, remote-results) and Java/WildFly backends under `backend/`. No workspace or root script: each frontend package has its own `package.json` with `vite build` (frontend/vite/host/package.json:8; frontend/vite/remote-inputs/package.json:8; frontend/vite/remote-results/package.json:8) and own Vite configuration with federation plugin (frontend/vite/host/vite.config.js:5-40; frontend/vite/remote-inputs/vite.config.js:5-32; frontend/vite/remote-results/vite.config.js:5-32). In development, each runs its own `vite` on ports 3000, 3001 and 3002, with open CORS (frontend/vite/host/vite.config.js:7-10; frontend/vite/remote-inputs/vite.config.js:7-10; frontend/vite/remote-results/vite.config.js:7-10). The `base` values align each build with serving path: `/`, `/remote-inputs/` and `/remote-results/` (frontend/vite/host/vite.config.js:6; frontend/vite/remote-inputs/vite.config.js:6; frontend/vite/remote-results/vite.config.js:6).

Deploy is a docker-compose in `config/` with postgres, services `auth`, `geometry` and `broker`, a service `nginx`, prometheus and grafana (config/docker-compose.yaml:1-74). All three frontends are released in a **single nginx image**: Dockerfile copies all three `dist` directories to separate directories in same image (config/nginx/Dockerfile:5-7), and nginx has one server per application, on ports 3000, 3001 and 3002 (config/nginx/nginx.conf:18-35, 37-53, 55-71), plus a TLS server on 8443 proxying `/`, `/remote-inputs/` and `/remote-results/` to these ports and `/auth/` and `/geometry/` to backends (config/nginx/nginx.conf:73-103, 105-142). Compose publishes nginx ports (config/docker-compose.yaml:42-47). Dockerfile runs no build: copies `dist` that must already exist, and `dist` is in `.gitignore` (.gitignore:6), as are certificates it copies (config/nginx/Dockerfile:4; .gitignore:2). Dockerfile declares `EXPOSE 80 443` (config/nginx/Dockerfile:10), but nginx listens on 8080 and 8443 (config/nginx/nginx.conf:12, 74), mapped by compose (config/docker-compose.yaml:43-44). CORS in nginx (config/nginx/nginx.conf:22, 44, 62, 80, 114, 134) and `vite.config.js` files (`cors: true`, :9 in each) supports cross-port loading.

Artifacts covering no frontend application: Dockerfiles of backends `auth`, `broker` and `geometry` copy already-built `ROOT.war` to WildFly (config/backend/auth/Dockerfile:5; config/backend/broker/Dockerfile:5; config/backend/geometry/Dockerfile:5) and are compose service `build` targets (config/docker-compose.yaml:16-37). The config/backend/history/Dockerfile builds `backend/historyService` with gradle (config/backend/history/Dockerfile:3-5), but directory is absent from snapshot and no compose service uses this Dockerfile. The config/frontend/Dockerfile is empty (0 bytes). The config/prometheus/prometheus.yml only collects metrics from `auth` and `geometry` (config/prometheus/prometheus.yml:6-13). No CI exists. README has only title (README.md:1).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | frontend/vite/host | separate | joint | port 3000 (config/nginx/nginx.conf:19; config/docker-compose.yaml:45); `/` in TLS server (config/nginx/nginx.conf:90-93) | No | frontend/vite/host/package.json:8 (`vite build`); frontend/vite/host/vite.config.js:5-40 (own Vite configuration, `base: '/'`); config/nginx/Dockerfile:5 (copies `dist` to joint image); config/nginx/nginx.conf:18-35 (own server on port 3000); config/docker-compose.yaml:38-52 (single service `nginx`) |
| 2 | frontend/vite/remote-inputs | separate | joint | port 3001 (config/nginx/nginx.conf:38; config/docker-compose.yaml:46); `/remote-inputs/` in TLS server (config/nginx/nginx.conf:95-98) | No | frontend/vite/remote-inputs/package.json:8 (`vite build`); frontend/vite/remote-inputs/vite.config.js:5-32 (own Vite configuration, `base: '/remote-inputs/'`); config/nginx/Dockerfile:6 (copies `dist` to joint image); config/nginx/nginx.conf:37-53 (own server on port 3001); config/docker-compose.yaml:38-52 (single service `nginx`) |
| 3 | frontend/vite/remote-results | separate | joint | port 3002 (config/nginx/nginx.conf:56; config/docker-compose.yaml:47); `/remote-results/` in TLS server (config/nginx/nginx.conf:100-103) | No | frontend/vite/remote-results/package.json:8 (`vite build`); frontend/vite/remote-results/vite.config.js:5-32 (own Vite configuration, `base: '/remote-results/'`); config/nginx/Dockerfile:7 (copies `dist` to joint image); config/nginx/nginx.conf:55-71 (own server on port 3002); config/docker-compose.yaml:38-52 (single service `nginx`) |

## Observations

**1. frontend/vite/host.** Separate build: own package, lockfile and `vite build` (frontend/vite/host/package.json:8), generating `dist` copied by Dockerfile to `html/host` (config/nginx/Dockerfile:5). Joint deploy: this `dist` enters same image as both remotes, and compose starts one service `nginx` (config/docker-compose.yaml:38-52). Having its own `server` in nginx (config/nginx/nginx.conf:18-35) separates address, not published artifact. Host is also TLS server destination at root (config/nginx/nginx.conf:90-93), address where remotes load it as remote `host` (frontend/vite/remote-inputs/vite.config.js:23). All three `package.json` files have same name `vite-vue-starter` and `version: 0.0.0`, with `private: true` (frontend/vite/host/package.json:2-4), without publication version use: Versioning `No`.

**2. frontend/vite/remote-inputs.** Same arrangement: own `vite build` (frontend/vite/remote-inputs/package.json:8), with `base: '/remote-inputs/'` (frontend/vite/remote-inputs/vite.config.js:6) matching prefix through which TLS server forwards to port 3001 (config/nginx/nginx.conf:95-98) and address used by host for `remoteEntry.js` (frontend/vite/host/vite.config.js:24). The `dist` goes to `html/remote-inputs` in joint image (config/nginx/Dockerfile:6). Structural review marks directory `Undetermined` because `src/main.js` is empty; this does not change build, generating `remoteEntry.js` served by nginx. No own version (frontend/vite/remote-inputs/package.json:2-4).

**3. frontend/vite/remote-results.** Like remote-inputs: own `vite build` (frontend/vite/remote-results/package.json:8), `base: '/remote-results/'` (frontend/vite/remote-results/vite.config.js:6), served on port 3002 and at `/remote-results/` (config/nginx/nginx.conf:55-71, 100-103), address of remote `remote_results` in host (frontend/vite/host/vite.config.js:29). The `dist` goes to same image (config/nginx/Dockerfile:7). No own version (frontend/vite/remote-results/package.json:2-4).

## Summary

Applications: 3. Build (separate: 3). Deploy (joint: 3). Independent versioning: 0.

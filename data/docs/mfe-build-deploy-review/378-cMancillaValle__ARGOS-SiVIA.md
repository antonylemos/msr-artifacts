---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
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

# 378 — cMancillaValle/ARGOS-SiVIA

## Repository overview

Academic project with FastAPI backend and two frontend units, without workspace: root `package-lock.json` has no corresponding `package.json` and lists `"packages": {}` (`package-lock.json:1-6`). The `frontend` is a set of HTML/JS pages without build. The `frontend-hermes` is the only npm package (`frontend-hermes/package.json:1-31`); its script `build` runs `tsc -b && vite build` (`frontend-hermes/package.json:8`), and Vite generates a single-file IIFE library `hermes-widget.js`, with embedded React and CSS injected by JS itself (`frontend-hermes/vite.config.ts:6-9`, `:11-15`, `:17-19`). The `dist` is not versioned (`frontend-hermes/.gitignore:11`).

Neither unit has its own server. Same FastAPI process serves pages of `frontend` (`/`, `/login`, `/dashboard` at `backend/main.py:257`, `:265`, `:273`, and other static files mounted at `/` in `backend/main.py:292-293`) and `dist` of `frontend-hermes` at path `/hermes/` (`backend/main.py:92`, `:281-288`). The only deployment artifact is `docker-compose.yml`, with a single service, `argos-backend-ia`: image `python:3.11-slim`, entire repository mounted at `/app`, Python dependency installation and `uvicorn` on port 5000, with healthcheck and `restart: unless-stopped` (`docker-compose.yml:3-35`, particularly `:5`, `:12`, `:17-22`, `:24`). Compose runs neither `npm` nor widget build: `/hermes/` only responds if `frontend-hermes/dist` already exists in mounted directory; otherwise route returns 404 (`backend/main.py:286-287`).

Widget build is tied to publication in `ngrok_tunnel.py`: script runs `npm run build` in `frontend-hermes` (`ngrok_tunnel.py:52-62`), starts same `uvicorn main:app` (`ngrok_tunnel.py:95-111`) and opens a public HTTP tunnel to its port (`ngrok_tunnel.py:153-161`); `start_ngrok.sh:29` only calls this script. The `start.py:34-36` starts same server without building widget. All three paths (compose, `start.py`, ngrok tunnel) publish both units together through same server and port. README describes same local execution and optional tunnel (`README.md:248-265`) and mentions a Windows installer through Inno Setup (`README.md:221`), without a snapshot artifact. No CI, Dockerfile, nginx or hosting configuration exists.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | frontend | no build | joint | `/`, `/login`, `/dashboard` and static files at `/` (backend/main.py:257; backend/main.py:265; backend/main.py:273; backend/main.py:293); port 5000 (docker-compose.yml:24) | No | backend/main.py:91 (points to directory `frontend`); backend/main.py:257-293 (serves pages and static files); docker-compose.yml:3-24 (single service mounting repository and starting FastAPI on port 5000); ngrok_tunnel.py:95-111 (starts same FastAPI); ngrok_tunnel.py:153-161 (public tunnel to port) |
| 2 | frontend-hermes | separate | joint | `/hermes/hermes-widget.js` (backend/main.py:281; frontend/dashboard.html:366); port 5000 (docker-compose.yml:24) | No | frontend-hermes/package.json:8 (`tsc -b && vite build`); frontend-hermes/vite.config.ts:11-15 (IIFE library `hermes-widget.js`); backend/main.py:92 (points to `frontend-hermes/dist`); backend/main.py:281-288 (serves `dist` at `/hermes/`); docker-compose.yml:3-24 (same service); ngrok_tunnel.py:52-62 (`npm run build` before starting server); ngrok_tunnel.py:153-161 (same tunnel) |

## Observations

**1. frontend.** HTML pages with static scripts and CDNs, without `package.json` or build step: files are released as they exist in repository (`backend/main.py:91`, `:257-278`). Deploy `joint`: service `argos-backend-ia` (`docker-compose.yml:3-24`) and tunnel of `ngrok_tunnel.py` publish same FastAPI process also serving `frontend-hermes`. Host unit: `dashboard.html` loads widget through path relative to same server (`frontend/dashboard.html:366`). No own version.

**2. frontend-hermes.** Build `separate`: own package and Vite build, generating its own bundle (`frontend-hermes/package.json:8`, `frontend-hermes/vite.config.ts:11-15`), without any `frontend` code. Deploy `joint`: `dist` has no own packaging and is served by same FastAPI at `/hermes/` (`backend/main.py:92`, `:281-288`), within same compose service and tunnel. Compose does not build widget; only `ngrok_tunnel.py:52-62` triggers build before starting server. Versioning `No`: `version` `0.0.0` and `private: true` (`frontend-hermes/package.json:3-4`), unused in publication.

## Summary

Applications: 2. Build (separate: 1, no build: 1). Deploy (joint: 2). Independent versioning: 0.

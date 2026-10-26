---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
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

# 045 — mrgleam/mf-tanstack-demo

## Repository overview

Two independent Vite applications, `shell` and `shop`, each with its own manifest, lockfile and `vite.config.ts`, without a workspace. The `shop` is built with `base: '/shop/'` and output in `dist` (shop/vite.config.ts:6, 20-25). Shell fetches remote at `http://localhost:3001/shop/assets/remoteEntry.js` (shell/vite.config.ts:9-11). README instructs running both with `npm run dev`, each in its own terminal (README.md:22-30). Both also have `preview` with a fixed port (shell/vite.config.ts:30-33; shop/vite.config.ts:26-29).

Folders `kong-shell/` and `kong-remote/` provide two alternative Kong gateway arrangements in Docker, without a database and with declarative configuration, presented by README as "Choose one" (README.md:32-44). Neither packages or publishes the applications: Kong runs in a container and forwards to servers already running on the machine (`host.docker.internal:3000` and `:3001`).
- **kong-shell:** only one route, `/` → shell (kong-shell/kong.yml:3-9), with TLS and manually generated certificates (kong-shell/docker-compose.yml:12-17; kong-shell/start-kong-ssl.sh:6-11).
- **kong-remote:** adds route `/shop` → shop without stripping the prefix (kong-remote/kong.yml:8-13), to access remote on its own as well, according to README (README.md:10, 41-44).

The arrangements have inconsistencies between them:
- **Ports:** README indicates `http://localhost:8000` (README.md:46-49), which is what `kong-remote` publishes (kong-remote/docker-compose.yml:5-7). However, `kong-shell` publishes container HTTP port 8000 on host port 8080 (kong-shell/docker-compose.yml:5-8), and its script announces internal ports 8000/8443 (kong-shell/start-kong-ssl.sh:29-31).
- **Remote in kong-shell:** shell continues fetching remote directly at `localhost:3001`, outside the gateway.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | shell | separate | not observed | `http://localhost:3000` (shell/vite.config.ts:15-16, 30-31); `/` of the Kong gateway, forwarded to the local server (kong-shell/kong.yml:3-8; kong-remote/kong.yml:3-7) | No | shell/vite.config.ts:5-34 (own configuration); shell/package.json:7 (`vite build`); kong-shell/kong.yml:3-9 (gateway route to the local server) |
| 2 | shop | separate | not observed | `http://localhost:3001/shop/` (shop/vite.config.ts:6, 16-17); `/shop` of the Kong gateway, forwarded to the local server (kong-remote/kong.yml:8-13) | No | shop/vite.config.ts:5-30 (own configuration, `base: '/shop/'`); shop/package.json:7 (`vite build`); kong-remote/kong.yml:8-13 (gateway route to the local server) |

## Observations

**1. shell.** Own build. Deploy is `not observed`: gateway only forwards to shell’s development server, which README instructs starting with `npm run dev` (README.md:28-29). Nothing packages or publishes the build. Version `1.0.0` is unused.

**2. shop.** Own build with its own `base`. This allows remote to share an origin with shell under prefix `/shop`, as `kong-remote` does. This is the same per-application path principle as repositories 059 and 017, but here on local servers. Deploy is `not observed` for the same reason as shell.

## Summary

Applications: 2. Build (separate: 2). Deploy (not observed: 2). Independent versioning: 0.

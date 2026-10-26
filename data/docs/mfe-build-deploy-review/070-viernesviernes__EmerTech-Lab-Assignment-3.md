---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
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

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Repository overview

Academic project with three Vite applications in `client/`: `shell-app`, `auth-app` and `community-app`, each with its own manifest, lockfile and `vite.config.js`. There is also a backend in `server/`, with two microservices and an Apollo gateway on port 4000 (server/gateway.js:5, 105), not a frontend application. The `client/package.json` is not a workspace: it has only a `dev` script starting all three applications together with `concurrently` (client/package.json:11).

Remotes have a script named `deploy`, but it only runs `build` followed by local `preview` on the application’s fixed port (client/auth-app/package.json:10-11; client/community-app/package.json:10-11). This is how client `dev` starts both remotes while shell runs on the development server (client/package.json:11). This combination exists because the Vite federation plugin generates `remoteEntry.js` only during build. Despite its name, the script publishes nothing: it is local execution. There is no Dockerfile, CI or hosting configuration, and mining `ops-*`, `ci-*` and `cfg-public-path` occurrences are empty. Gateway lists the three applications’ `localhost` origins for CORS (server/gateway.js:12).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | client/auth-app | separate | not observed | `http://localhost:3001`, in local `preview` (client/auth-app/package.json:10; client/auth-app/vite.config.js:27-31) | No | client/auth-app/vite.config.js:21-26 (own build configuration); client/auth-app/package.json:8 (`vite build`); client/auth-app/package.json:11 (`deploy` = build + local preview) |
| 2 | client/community-app | separate | not observed | `http://localhost:3002`, in local `preview` (client/community-app/package.json:10; client/community-app/vite.config.js:27-31) | No | client/community-app/vite.config.js:21-26 (own build configuration); client/community-app/package.json:8 (`vite build`); client/community-app/package.json:11 (`deploy` = build + local preview) |
| 3 | client/shell-app | separate | not observed | `http://localhost:3000` in development (client/shell-app/package.json:7) | No | client/shell-app/vite.config.js:18-23 (own build configuration); client/shell-app/package.json:8 (`vite build`) |

## Observations

**1. client/auth-app.** Own build. Script `deploy` does not count as deployment: it serves build locally with `vite preview` (client/auth-app/package.json:10-11), a development command. Version `0.0.0` is unused.

**2. client/community-app.** Same arrangement, port 3002 (client/community-app/package.json:10-11).

**3. client/shell-app.** Own build. It does not even have `deploy`: runs only with the development server on port 3000 (client/shell-app/package.json:7). Remotes are fixed at `localhost` (see the composition review).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.

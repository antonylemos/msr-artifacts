---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
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

# 324 — lmedhub/zephyr-microfrontends

## Repository overview

Frontend resides in `frontend/`, with four Rspack applications in `frontend/apps/`, and repository also has a Go backend in `backend/`. No workspace: root `install:all` installs each application separately (frontend/package.json:6). Each application has its own `build`, `NODE_ENV=production rspack build` (frontend/apps/host/package.json:9; frontend/apps/remote-header/package.json:5; frontend/apps/remote-footer/package.json:5; frontend/apps/url-shortener/package.json:5), and `frontend/package.json` only enters each directory to run it (`build:host`, `build:header`, `build:footer`, `build:shortener`), with `build:all` chaining all four, remotes before host (frontend/package.json:12-16). The `clean:build` deletes `apps/*/dist` (frontend/package.json:28), so each build outputs to application’s own `dist`, outside git (.gitignore:85).

Publication comes from Zephyr Cloud. All four `rspack.config.ts` files export configuration wrapped in `withZephyr()` from `zephyr-webpack-plugin` (frontend/apps/host/rspack.config.ts:5, 7; frontend/apps/remote-header/rspack.config.ts:5, 7; frontend/apps/remote-footer/rspack.config.ts:5, 7; frontend/apps/url-shortener/rspack.config.ts:3, 5), a build plugin uploading each build result to Zephyr Cloud; this was deployment artifact identified by structural review. Other signs of service use exist: `.gitignore` ignores directory `.zephyr` (.gitignore:118-119), and host declares `zephyr:dependencies` with `remote-header@^1.0.0` and `remote-footer@^1.0.0` (frontend/apps/host/package.json:4-7). Snapshot has no further Zephyr configuration (nor address where each application is published), and host still points remotes to fixed `localhost` (frontend/apps/host/rspack.config.ts:84-88). README only describes project as using "Zephyr Cloud" and lists local ports (frontend/README.md:3, 7-9).

Outside Zephyr, only development configuration exists: each application’s `devServer`, with ports 3000 to 3003 (frontend/apps/host/rspack.config.ts:17-18; frontend/apps/remote-header/rspack.config.ts:13-14; frontend/apps/remote-footer/rspack.config.ts:13-14; frontend/apps/url-shortener/rspack.config.ts:11-12), and scripts `serve`/`start` with `rspack serve` (frontend/apps/host/package.json:11-13; frontend/apps/url-shortener/package.json:7-8), triggered together by `serve:all` and `start:all` (frontend/package.json:21, 26). Root `serve:header` and `serve:footer` call script `serve` absent from those two applications (frontend/package.json:18-19; frontend/apps/remote-header/package.json:4-8; frontend/apps/remote-footer/package.json:4-8). The `ops-cors` occurrences in `matches.csv` are `Access-Control-Allow-Origin: *` headers of these three remote `devServer` blocks (frontend/apps/remote-header/rspack.config.ts:17-19; frontend/apps/remote-footer/rspack.config.ts:17-19; frontend/apps/url-shortener/rspack.config.ts:15-17), and `cfg-public-path` is host `publicPath: "auto"` (frontend/apps/host/rspack.config.ts:13-15). Host fixes `mode: "development"` in configuration (frontend/apps/host/rspack.config.ts:12), even for production `build`.

Artifacts `ops-dockerfile`, `ops-compose-service` and `ops-deployment-file` all belong to Go backend and cover no frontend application. The `backend/Dockerfile` compiles server in two stages (backend/Dockerfile:1, 10, 12), and `backend/docker-compose.yml` starts this service on port 8080 with Postgres and Redis (backend/docker-compose.yml:4-9, 17-18, 27-28). Dockerfile generates binary `url-shortener` (backend/Dockerfile:10), but copies and executes `backend` (backend/Dockerfile:16, 18), a name produced only by `Makefile` (backend/Makefile:8-9). No CI workflow is present in snapshot.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | frontend/apps/host | separate | separate | `http://localhost:3000` in development (frontend/apps/host/rspack.config.ts:18; frontend/apps/host/package.json:12) | No | frontend/apps/host/package.json:9 (`rspack build`); frontend/apps/host/rspack.config.ts:7 (`withZephyr()`, publication to Zephyr Cloud); frontend/apps/host/rspack.config.ts:82-94 (federation `host`); frontend/package.json:12, :16 (`build:host`, `build:all`) |
| 2 | frontend/apps/remote-footer | separate | separate | `http://localhost:3002` in development (frontend/apps/remote-footer/rspack.config.ts:14; frontend/apps/host/rspack.config.ts:86) | No | frontend/apps/remote-footer/package.json:5 (`rspack build`); frontend/apps/remote-footer/rspack.config.ts:7 (`withZephyr()`, publication to Zephyr Cloud); frontend/apps/remote-footer/rspack.config.ts:73-79 (federation `remote_footer`, generates `remoteEntry.js`); frontend/package.json:14, :16 (`build:footer`, `build:all`) |
| 3 | frontend/apps/remote-header | separate | separate | `http://localhost:3001` in development (frontend/apps/remote-header/rspack.config.ts:14; frontend/apps/host/rspack.config.ts:85) | No | frontend/apps/remote-header/package.json:5 (`rspack build`); frontend/apps/remote-header/rspack.config.ts:7 (`withZephyr()`, publication to Zephyr Cloud); frontend/apps/remote-header/rspack.config.ts:73-79 (federation `remote_header`, generates `remoteEntry.js`); frontend/package.json:13, :16 (`build:header`, `build:all`) |
| 4 | frontend/apps/url-shortener | separate | separate | `http://localhost:3003` in development (frontend/apps/url-shortener/rspack.config.ts:12; frontend/apps/host/rspack.config.ts:87) | No | frontend/apps/url-shortener/package.json:5 (`rspack build`); frontend/apps/url-shortener/rspack.config.ts:5 (`withZephyr()`, publication to Zephyr Cloud); frontend/apps/url-shortener/rspack.config.ts:74-79 (federation `url_shortener`, generates `remoteEntry.js`); frontend/package.json:15, :16 (`build:shortener`, `build:all`) |

## Observations

**1. frontend/apps/host.** Own Rspack build, with entry `src/App.tsx` (frontend/apps/host/rspack.config.ts:9-10). Remotes do not enter host artifact: loads them at runtime through `localhost` URLs in frontend/apps/host/rspack.config.ts:84-88, embedded in build; if `withZephyr()` replaces them at publication, this is absent from snapshot. Separate deploy through `withZephyr()` of own configuration (frontend/apps/host/rspack.config.ts:7), same arrangement as other applications; no published address is present in snapshot, and `serve` on port 3000 (frontend/apps/host/package.json:12) is Rspack server, not publication. Version `1.0.0` (frontend/apps/host/package.json:3) appears in no publication. The `zephyr:dependencies` (frontend/apps/host/package.json:4-7) cites versions of header and footer remotes, not host, and does not cite url-shortener.

**2. frontend/apps/remote-footer.** Own build, generating `remoteEntry.js` for remote `remote_footer` (frontend/apps/remote-footer/rspack.config.ts:74-75), and separate deploy through `withZephyr()` of its configuration (frontend/apps/remote-footer/rspack.config.ts:7). Port 3002 in `devServer` (frontend/apps/remote-footer/rspack.config.ts:14), same as used by host (frontend/apps/host/rspack.config.ts:86). Version `1.0.0` (frontend/apps/remote-footer/package.json:3) is range requested by host in `zephyr:dependencies` (frontend/apps/host/package.json:6), but snapshot does not show this version used in footer publication, hence `No`.

**3. frontend/apps/remote-header.** Same arrangement as footer, with remote `remote_header` (frontend/apps/remote-header/rspack.config.ts:74-75), own `withZephyr()` (frontend/apps/remote-header/rspack.config.ts:7) and port 3001 (frontend/apps/remote-header/rspack.config.ts:14; frontend/apps/host/rspack.config.ts:85). Version `1.0.0` (frontend/apps/remote-header/package.json:3) matches host `zephyr:dependencies` range (frontend/apps/host/package.json:5), with same limitation as footer.

**4. frontend/apps/url-shortener.** Vue 3 remote with own Rspack build (with `vue-loader`, frontend/apps/url-shortener/rspack.config.ts:33-46), generating `remoteEntry.js` for remote `url_shortener` (frontend/apps/url-shortener/rspack.config.ts:75-76), and separate deploy through `withZephyr()` of its configuration (frontend/apps/url-shortener/rspack.config.ts:5). Port 3003 (frontend/apps/url-shortener/rspack.config.ts:12; frontend/apps/host/rspack.config.ts:87). The only remote with script `serve` (frontend/apps/url-shortener/package.json:8), also `rspack serve`. Absent from host `zephyr:dependencies`, and its version `1.0.0` (frontend/apps/url-shortener/package.json:3) appears in no publication. Also excluded from root scripts `lint` and `type-check` (frontend/package.json:29-30), not part of build.

## Summary

Applications: 4. Build (separate: 4). Deploy (separate: 4). Independent versioning: 0.

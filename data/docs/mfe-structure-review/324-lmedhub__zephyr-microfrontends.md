---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
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

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| frontend | frontend/index.html;frontend/package.json | frontend/package.json | — | — | — | — | No | Root aggregating the apps: `frontend/index.html` loads no script and is not used by any build, and the `build:*` scripts (frontend/package.json:12-16) only enter `apps/*` |
| frontend/apps/host | frontend/apps/host/package.json;frontend/apps/host/rspack.config.ts | frontend/apps/host/package.json | frontend/apps/host/rspack.config.ts:9-10 (`entry` `main: "./src/App.tsx"`); frontend/apps/host/rspack.config.ts:102-103 (`HtmlRspackPlugin` with `template: "./index.html"`) | frontend/apps/host/rspack.config.ts + frontend/apps/host/package.json:9 (`rspack build`) | — | frontend/apps/host/rspack.config.ts:5-7 (`withZephyr()` wraps the configuration, publishing to Zephyr Cloud) | Yes | React host with its own entry and Rspack build |
| frontend/apps/remote-footer | frontend/apps/remote-footer/package.json;frontend/apps/remote-footer/rspack.config.ts | frontend/apps/remote-footer/package.json | frontend/apps/remote-footer/rspack.config.ts:9-10 (`entry` `main: "./src/index.tsx"`); frontend/apps/remote-footer/rspack.config.ts:89-90 (`HtmlRspackPlugin` with `template: "./index.html"`) | frontend/apps/remote-footer/rspack.config.ts + frontend/apps/remote-footer/package.json:5 (`rspack build`) | — | frontend/apps/remote-footer/rspack.config.ts:5-7 (`withZephyr()` wraps the configuration, publishing to Zephyr Cloud) | Yes | React remote with its own UI-mounting entry and Rspack build |
| frontend/apps/remote-header | frontend/apps/remote-header/package.json;frontend/apps/remote-header/rspack.config.ts | frontend/apps/remote-header/package.json | frontend/apps/remote-header/rspack.config.ts:9-10 (`entry` `main: "./src/index.tsx"`); frontend/apps/remote-header/rspack.config.ts:89-90 (`HtmlRspackPlugin` with `template: "./index.html"`) | frontend/apps/remote-header/rspack.config.ts + frontend/apps/remote-header/package.json:5 (`rspack build`) | — | frontend/apps/remote-header/rspack.config.ts:5-7 (`withZephyr()` wraps the configuration, publishing to Zephyr Cloud) | Yes | React remote with its own UI-mounting entry and Rspack build |
| frontend/apps/url-shortener | frontend/apps/url-shortener/package.json;frontend/apps/url-shortener/rspack.config.ts | frontend/apps/url-shortener/package.json | frontend/apps/url-shortener/rspack.config.ts:7-8 (`entry` `main: "./src/index.ts"`); frontend/apps/url-shortener/rspack.config.ts:96-97 (`HtmlRspackPlugin` with `template: "./index.html"`) | frontend/apps/url-shortener/rspack.config.ts + frontend/apps/url-shortener/package.json:5 (`rspack build`) | — | frontend/apps/url-shortener/rspack.config.ts:3-5 (`withZephyr()` wraps the configuration, publishing to Zephyr Cloud) | Yes | Vue 3 remote with a UI-mounting entry (`app.mount("#app")`) and its own Rspack build |

## Summary

Frontend applications in the snapshot: 4 (frontend/apps/host, frontend/apps/remote-footer, frontend/apps/remote-header, frontend/apps/url-shortener).

## Notes

- N = 4 matches the classification’s `frontend_units: 4`.
- No workspace: `frontend/package.json` has no `workspaces`; each app is installed separately by the `install:all` script (frontend/package.json:6). The `workspace-config` markers in `artifacts.csv` (manifests and `frontend/tsconfig.json`) provide no workspace declaration, and `matches.csv` has only 1 `ws-*` occurrence, a `ws-path-alias` (`paths` in `frontend/tsconfig.json`, line 15), which is not a workspace declaration.
- `matches.csv` has no `ci-*` occurrences; it has 11 `ops-*` (4 `ops-compose-service`, 3 `ops-cors`, 2 `ops-deployment-file`, 2 `ops-dockerfile`). The only Dockerfile (`backend/Dockerfile`, used by `backend/docker-compose.yml:5-7`) belongs to the Go backend, outside the units. The Deploy column records `withZephyr()` in each `rspack.config.ts`, a build plugin publishing each app’s artifact to Zephyr Cloud; there is no other deployment artifact per app.
- In the host, the build entry is `src/App.tsx` (frontend/apps/host/rspack.config.ts:10), which mounts the UI in frontend/apps/host/src/App.tsx:27-28; `src/index.ts` (`import("./App")`) is not referenced by the build.

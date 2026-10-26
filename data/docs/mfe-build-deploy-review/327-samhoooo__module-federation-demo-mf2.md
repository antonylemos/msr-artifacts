---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
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

# 327 — samhoooo/module-federation-demo-mf2

## Repository overview

Two independent React/Rspack applications, `header-app` (remote) and `home-app` (host), each with its own `package.json` and `rspack.config.js`, without workspace. Root has no `package.json`, and root `package-lock.json` declares no packages (package-lock.json:1-6). Each application has script `build` with `rspack build` and `start` with `rspack serve` (header-app/package.json:9-13; home-app/package.json:9-13). README instructs installing and running each through `npm start` in its directory, `header-app` first (README.md:19-25), and opening host at `http://localhost:4000` and remote at `http://localhost:4001` (README.md:27-28).

Everything present is development configuration. Both configurations use `mode: "development"` (header-app/rspack.config.js:8; home-app/rspack.config.js:7), fix `publicPath` at `localhost` (header-app/rspack.config.js:23; home-app/rspack.config.js:12) and define development server port (header-app/rspack.config.js:9-10; home-app/rspack.config.js:8-9). Host fetches remote at `http://localhost:4001/mf-manifest.json` (home-app/rspack.config.js:51-53). The only `ops-*` occurrence is `Access-Control-Allow-Origin: *` header of development server of `header-app` (header-app/rspack.config.js:11-13), allowing host from another origin to load remote; same `devServer` serves `dist/` as static files for plugin `dts` type files (header-app/rspack.config.js:14-20). No Dockerfile, compose, CI workflow, hosting configuration or proxy is present in snapshot, and `.gitignore` excludes `dist` (.gitignore:2).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | header-app | separate | not observed | `http://localhost:4001/` (header-app/rspack.config.js:10, 23) | No | header-app/rspack.config.js:6-81 (own Rspack configuration, remote `HeaderApp`); header-app/package.json:11 (`rspack build`) |
| 2 | home-app | separate | not observed | `http://localhost:4000/` (home-app/rspack.config.js:9, 12) | No | home-app/rspack.config.js:5-72 (own Rspack configuration, host `HomeApp`); home-app/package.json:11 (`rspack build`) |

## Observations

**1. header-app.** Own build (header-app/package.json:11), with output in `remoteEntry.js` and Module Federation manifest (header-app/rspack.config.js:57-63). Deploy is `not observed`: application is served only by `rspack serve` (header-app/package.json:10), a development command, on port 4001. CORS header and `static` of `devServer` (header-app/rspack.config.js:11-20) are also for development. Version `0.1.0` (header-app/package.json:3) is unused in publication, and package is `private` (header-app/package.json:4).

**2. home-app.** Own build (home-app/package.json:11), separate from remote: `header-app` code arrives only at runtime through manifest at `localhost:4001` (home-app/rspack.config.js:51-53). Deploy is `not observed` for same reason as header-app: only `rspack serve` on port 4000 (home-app/package.json:10; home-app/rspack.config.js:8-9). Version `0.1.0` (home-app/package.json:3) is unused in publication.

## Summary

Applications: 2. Build (separate: 2). Deploy (not observed: 2). Independent versioning: 0.

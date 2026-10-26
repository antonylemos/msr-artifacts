---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
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

# 043 — dhiman1987/micro-frontend-demo

## Repository overview

Web Components demonstration with four folders. Three are static, without `package.json` or build: `app-shell`, with `index.html` and `style.css`, and `app1` and `app2`, each with `index.html` and `app.js`. Only `app3` has a build: a library-mode `vite build` generating the `iife` bundle `my-counter-app` (app3/package.json:8; app3/vite.config.js:9-15).

There is no deployment artifact in the repository: no Dockerfile, CI or hosting configuration. Mining `ops-*`, `ci-*` and `cfg-public-path` occurrences are empty. Execution described in README is entirely local and manual: install `http-server` globally and open a terminal per folder, each served on a port with CORS enabled (3000 to 3003). In `app3`, build runs before serving (README.md:42, 47-69). These are the ports shell uses in script URLs (see the composition review).

In `app3`, README starts the server at the folder root (README.md:65-69). Since configuration does not define `outDir`, Vite writes the bundle to `dist/`. Shell, however, requests the bundle at server root without `/dist/` (app-shell/index.html:26), and README does not say how the server reaches the file. This does not change table values, but shows that the demonstration as described does not serve the bundle at the path requested by shell.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | app-shell | no build | not observed | `http://localhost:3000`, served manually with `http-server` (README.md:46-50, 72) | No | — |
| 2 | app1 | no build | not observed | `http://localhost:3001`, served manually with `http-server` (README.md:52-56) | No | — |
| 3 | app2 | no build | not observed | `http://localhost:3002`, served manually with `http-server` (README.md:58-62) | No | — |
| 4 | app3 | separate | not observed | `http://localhost:3003`, served manually with `http-server` after build (README.md:64-70) | No | app3/vite.config.js:4-16 (own `lib` `iife` build); app3/package.json:8 (`vite build`) |

## Observations

**1. app-shell.** Static page served as is. No deployment artifact: `http-server` is run manually in development, so does not count. It has no `package.json`, hence no version.

**2. app1.** Static page with an `app.js` defining tag `hello-app`. Shell loads this file from port 3001. No build, no observed deployment.

**3. app2.** Same arrangement as app1, with tag `world-app`, on port 3002.

**4. app3.** Only application with a build: produces its own `iife` bundle, consumed by shell through a URL. No observed deployment. Version `0.0.0` (app3/package.json:4) is unused.

## Summary

Applications: 4. Build (separate: 1, no build: 3). Deploy (not observed: 4). Independent versioning: 0.

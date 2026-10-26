---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
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

# 136 — swtbhsmn/micro-frontend-demo

## Repository overview

Minimal Module Federation demonstration with two React applications, `app1` (host) and `app2` (remote), each in a directory with its own `package.json`, lockfile and webpack configuration. No root manifest or workspace. Each application’s only script is `start`, running `webpack serve` in development mode on a fixed port (app1/package.json:5-7; app2/package.json:5-7). Both configurations also fix `mode: "development"` and development server on ports 3001 and 3002 (app1/webpack.config.js:7-11; app2/webpack.config.js:7-11). No `build` script or production configuration.

No deployment artifact is present in the snapshot: no Dockerfile, compose, CI or hosting configuration, and `matches.csv` has no `ops-*` or `ci-*` occurrences. Both `cfg-public-path` occurrences are `publicPath: "auto"` in each configuration (app1/webpack.config.js:13; app2/webpack.config.js:13), allowing webpack to resolve chunk paths from script origin; this is build configuration, not publication. Execution described in README is entirely local: one terminal per directory, `npm install` and `npm start`, app2 first then app1 (README.txt:7-14). Remote address in host is fixed at `http://localhost:3002/remoteEntry.js` (app1/webpack.config.js:31), so composition only works with both development servers running.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | app1 | separate | not observed | `http://localhost:3001` in development (app1/webpack.config.js:8-9) | No | app1/webpack.config.js:5-40 (own configuration, development mode, Module Federation host); app1/package.json:6 (`webpack serve`) |
| 2 | app2 | separate | not observed | `http://localhost:3002` in development (app2/webpack.config.js:8-9); `remoteEntry.js` at this origin, expected by host (app1/webpack.config.js:31) | No | app2/webpack.config.js:5-41 (own configuration, development mode, generates `remoteEntry.js`); app2/package.json:6 (`webpack serve`) |

## Observations

**1. app1.** Separate build: webpack configuration and dependencies belong only to this application, even if development server is the only use (app1/package.json:6). It consumes remote `app2` through localhost URL (app1/webpack.config.js:30-31) and does not package app2 code. No observed deploy. Version `1.0.0` (app1/package.json:3) is unused in publication, and package is `private` (app1/package.json:4).

**2. app2.** Same arrangement, on port 3002, generating `remoteEntry.js` exposing `./RemoteApp` (app2/webpack.config.js:29-32). Also runs alone, with its own page from template (app2/webpack.config.js:36-38). No observed deploy. Version `1.0.0` (app2/package.json:3) unused in publication; `private` package (app2/package.json:4).

## Summary

Applications: 2. Build (separate: 2). Deploy (not observed: 2). Independent versioning: 0.

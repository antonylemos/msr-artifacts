---
schema: 1
id: 1205888629
full_name: farzanemadani/todo-app-using-mfe
commit: 21fc4773aa4d577351ce2000de48b52a73db8378
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

# 318 — farzanemadani/todo-app-using-mfe

## Repository overview

Three webpack 5 projects side by side, without root `package.json` or workspace: each installs its own dependencies and has same two scripts, `start` with `webpack serve --config
webpack.dev.js` and `build` with `webpack --config webpack.prod.js` (host-app/package.json:7-8; todoForm-app/package.json:7-8; todoList-app/package.json:8-9). No script triggers all three builds together. Each `webpack.prod.js` uses mode `production` and writes `bundle.js` to own project `build/` (host-app/webpack.prod.js:12-16; todoForm-app/webpack.prod.js:10-14; todoList-app/webpack.prod.js:9-13), with `index.html` generated from local `public/index.html` and ModuleFederationPlugin `remoteEntry.js` (host-app/webpack.prod.js:45-51; todoForm-app/webpack.prod.js:44-50; todoList-app/webpack.prod.js:43-49). The `build/` is in `.gitignore` (.gitignore:2), and no generated artifact is present in snapshot.

Nothing in snapshot publishes applications: no Dockerfile, compose, CI workflow, deployment manifest or hosting configuration exists, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrence. Existing configuration is for development: `devServer` blocks on ports 3000, 3001 and 3002 (host-app/webpack.dev.js:13-16; todoForm-app/webpack.dev.js:15-18; todoList-app/webpack.dev.js:14-17), commented out in `webpack.prod.js` files (host-app/webpack.prod.js:17-20; todoForm-app/webpack.prod.js:15-18; todoList-app/webpack.prod.js:14-17). Even host production configuration points remotes to `http://localhost:3001` and `http://localhost:3002` (host-app/webpack.prod.js:7-8, used at :53-54), and README itself acknowledges deploy would require replacing these URLs (README.md:128). README describes each application build separately (README.md:97-105), matching scripts but not deciding Deploy column.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | host-app | separate | not observed | `http://localhost:3000` in development (host-app/webpack.dev.js:14) | No | host-app/package.json:8 (`webpack --config webpack.prod.js`); host-app/webpack.prod.js:11-16 (entry and output `build/bundle.js` of its own); host-app/webpack.prod.js:49-55 (ModuleFederationPlugin `host_app` with both remotes) |
| 2 | todoForm-app | separate | not observed | `http://localhost:3001` in development (todoForm-app/webpack.dev.js:16); `http://localhost:3001/remoteEntry.js` in host production configuration (host-app/webpack.prod.js:7, 53) | No | todoForm-app/package.json:8 (`webpack --config webpack.prod.js`); todoForm-app/webpack.prod.js:9-14 (entry and output `build/bundle.js` of its own); todoForm-app/webpack.prod.js:48-53 (`remoteEntry.js` exposing `./TodoForm`) |
| 3 | todoList-app | separate | not observed | `http://localhost:3002` in development (todoList-app/webpack.dev.js:15); `http://localhost:3002/remoteEntry.js` in host production configuration (host-app/webpack.prod.js:8, 54) | No | todoList-app/package.json:9 (`webpack --config webpack.prod.js`); todoList-app/webpack.prod.js:8-13 (entry and output `build/bundle.js` of its own); todoList-app/webpack.prod.js:47-52 (`remoteEntry.js` exposing `./todoList`) |

## Observations

**1. host-app.** Separate build: project has its own `package.json` and `webpack.prod.js`, generating `build/bundle.js` from `./src/bootstrap.js` (host-app/webpack.prod.js:11-14). Remote code does not enter bundle; loaded at runtime through remote URLs (host-app/webpack.prod.js:52-55). Deploy not observed: only development server on port 3000 with `historyApiFallback` (host-app/webpack.dev.js:13-16) serves application. No versioning: `version` `1.0.0` (host-app/package.json:3) is unused in any publication.

**2. todoForm-app.** Separate build: own `webpack.prod.js`, with output in project `build/` (todoForm-app/webpack.prod.js:9-14) and `remoteEntry.js` named `todoForm_app` (todoForm-app/webpack.prod.js:48-53). Deploy not observed: address host expects in production is still `localhost:3001` (host-app/webpack.prod.js:7), same port as remote `devServer` (todoForm-app/webpack.dev.js:16); nothing in snapshot serves `build/` at this address. No versioning: `version` `1.0.0` unused (todoForm-app/package.json:3).

**3. todoList-app.** Same arrangement as form: own `webpack.prod.js` with output in `build/` (todoList-app/webpack.prod.js:8-13) and `remoteEntry.js` named `todoList_app` (todoList-app/webpack.prod.js:47-52). The `name` in `package.json` is `todolist-app`, lowercase (todoList-app/package.json:2), differing from directory without build effect. Deploy not observed: host expects remote at `localhost:3002` (host-app/webpack.prod.js:8), port of `devServer` (todoList-app/webpack.dev.js:15). No versioning: `version` `1.0.0` unused (todoList-app/package.json:3).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.

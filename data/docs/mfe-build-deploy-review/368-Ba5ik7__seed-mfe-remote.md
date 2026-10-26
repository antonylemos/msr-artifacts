---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
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

# 368 — Ba5ik7/seed-mfe-remote

## Repository overview

Single Angular workspace, with a root `package.json` and two projects in `angular.json`: `seed-mfe-remote` (remote) and `demo` (demonstration host) (angular.json:5-6, :111). Each project has its own target `build` with `ngx-build-plus:browser` and output in `dist/<projeto>` (angular.json:17-20, :122-125), with Module Federation configuration passed through `extraWebpackConfig` (angular.json:39, :144). Configuration `production`, build default (angular.json:65, :170), switches to `webpack.prod.config.js` (angular.json:57, :162), but this file only reexports development configuration (projects/seed-mfe-remote/webpack.prod.config.js:1; projects/demo/webpack.prod.config.js:1); hence host still points to `http://localhost:4202/remoteEntry.js` even in production build (projects/demo/webpack.config.js:5-7).

Root scripts are Angular CLI defaults: `start` = `ng serve`, `build` = `ng build`, `watch` and `test`, none with project name (package.json:5-9), and `run:all`, calling `mf-dev-server` from `@angular-architects/module-federation` to start development servers (package.json:10). Dev-servers use ports 4201 (demo) and 4202 (remote) (angular.json:185-186, :80-81). VS Code tasks only run `start` and `test` (.vscode/tasks.json:6-7, :24-25). All this is development.

No deploy is present in snapshot: no Dockerfile, compose, CI workflow, hosting configuration or publication script, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. The `dist/` is in `.gitignore` (.gitignore:4). README is standard Angular CLI text, only discussing `ng serve` at `localhost:4202` and `ng build` generating `dist/` (README.md:10-13, :34-37). The `package.json` has `"version": "0.0.0"` and `"private": true` (package.json:3, :12), without publication. A minimal template prepared for separate builds, but without any recorded publication method.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | projects/demo | separate | not observed | port 4201 of dev-server, `publicHost: http://localhost:4201` (angular.json:185-186) | No | angular.json:122-125 (target `build` with `ngx-build-plus:browser`, output `dist/demo`); angular.json:144 (`extraWebpackConfig` with Module Federation); angular.json:162 (`webpack.prod.config.js` in production); projects/demo/webpack.prod.config.js:1 (reexports development configuration) |
| 2 | projects/seed-mfe-remote | separate | not observed | port 4202 of dev-server, `publicHost: http://localhost:4202` (angular.json:80-81) | No | angular.json:17-20 (target `build` with `ngx-build-plus:browser`, output `dist/seed-mfe-remote`); angular.json:39 (`extraWebpackConfig` with Module Federation); angular.json:57 (`webpack.prod.config.js` in production); projects/seed-mfe-remote/webpack.prod.config.js:1 (reexports development configuration) |

## Observations

**1. projects/demo.** Build `separate`: project target `build` generates `dist/demo` (angular.json:122-125) from own entry (angular.json:143). Remote does not enter artifact: host declares it in `remotes` (projects/demo/webpack.config.js:5-7) and loads it at runtime through `remoteEntry.js` URL, as recorded in composition review. Deploy `not observed`: only dev-server on port 4201 (angular.json:172-173, :185-186), not counting as deploy, and no snapshot artifact publishes `dist/demo`. Versioning `No`: project has no own `package.json`, and root manifest is `0.0.0`, `private` (package.json:3, :12).

**2. projects/seed-mfe-remote.** Build `separate`: own target with output `dist/seed-mfe-remote` (angular.json:17-20), with `ModuleFederationPlugin` named `seedMfeRemote` exposing `./RemoteWidget` (projects/seed-mfe-remote/webpack.config.js:5-8), generating `remoteEntry.js` consumed by host. Deploy `not observed`: remote’s only address belongs to dev-server, `http://localhost:4202` (angular.json:80-81), same as Configuration column of composition review; no artifact publishes build output. Versioning `No`: no own `package.json`.

## Summary

Applications: 2. Build (separate: 2). Deploy (not observed: 2). Independent versioning: 0.

---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
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

# 229 — ayushpandey241626/microfrontend-demo

## Repository overview

Single Angular workspace, with one root `package.json` and four projects in `projects/` declared in angular.json:5 (host-app, mfe1, mfe2 and login-mfe-app). Each project has its own target `build` with `ngx-build-plus:browser` and its own `outputPath`: `dist/host-app`, `dist/mfe1`, `dist/mfe2` and `dist/login-mfe-app` (angular.json:13-16, 114-117, 215-218, 320-323). Each build’s `extraWebpackConfig` points to project `webpack.config.js`, and `production` configuration switches to `webpack.prod.config.js` (for example angular.json:35, 53), which only reexports `webpack.config.js` (projects/host-app/webpack.prod.config.js:1, likewise in other three). The `dist/` is ignored by git (.gitignore:4).

Root scripts are Angular generator defaults: `start` (`ng serve`), `build` (`ng build`, without naming project), `watch` and `test` (package.json:5-9). The `run:all` (package.json:10) runs development server from package `@angular-architects/module-federation`. Each project has target `serve` with `ngx-build-plus:dev-server` and fixed port at `localhost`: 4200, 4201, 4202 and 4203 (angular.json:63-78, 164-179, 265-280, 370-385). VS Code tasks only trigger `npm start` and `npm test` (.vscode/tasks.json:5-25; .vscode/launch.json:5-17).

No deployment artifact is present in snapshot: no CI workflow, Dockerfile, compose, manifest or hosting configuration, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. This is development configuration: remote URLs are fixed at `localhost`, both in host `remotes` (projects/host-app/webpack.config.js:21-25) and routes loading remote modules (projects/host-app/src/app/app.routes.ts:20, 30, 39), and production build uses same webpack configuration, thus still points to `localhost`. README only describes `ng serve` at `http://localhost:4200/` and `ng build` to `dist/` (README.md:9-13, 29-37). No project has its own version; the only one is `0.0.0` of root `package.json` (package.json:3), unused in publication.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | projects/host-app | separate | not observed | `http://localhost:4200` in development (angular.json:76-77) | No | angular.json:13-16 (build `ngx-build-plus:browser`, output `dist/host-app`); angular.json:35 (project `extraWebpackConfig`); projects/host-app/webpack.config.js:11-36 (own configuration, `uniqueName: "hostApp"`) |
| 2 | projects/login-mfe-app | separate | not observed | `http://localhost:4203` in development (angular.json:383-384) | No | angular.json:320-323 (build `ngx-build-plus:browser`, output `dist/login-mfe-app`); angular.json:342 (project `extraWebpackConfig`); projects/login-mfe-app/webpack.config.js:6-11 (own configuration, generates remote `login-mfe-app`) |
| 3 | projects/mfe1 | separate | not observed | `http://localhost:4201` in development (angular.json:177-178) | No | angular.json:114-117 (build `ngx-build-plus:browser`, output `dist/mfe1`); angular.json:136 (project `extraWebpackConfig`); projects/mfe1/webpack.config.js:6-11 (own configuration, generates remote `mfe1`) |
| 4 | projects/mfe2 | separate | not observed | `http://localhost:4202` in development (angular.json:278-279) | No | angular.json:215-218 (build `ngx-build-plus:browser`, output `dist/mfe2`); angular.json:237 (project `extraWebpackConfig`); projects/mfe2/webpack.config.js:6-11 (own configuration, generates remote `mfe2`) |

## Observations

**1. projects/host-app.** Own build, with output in `dist/host-app` (angular.json:13-16). Does not include remote code: declares them as `remotes` at `localhost` (projects/host-app/webpack.config.js:21-25) and loads them at runtime through routes (projects/host-app/src/app/app.routes.ts:20, 30, 39); hence `separate`, although all four projects share workspace. Uses `publicPath: "auto"` (projects/host-app/webpack.config.js:14). Served only by `ng serve` on port 4200 (angular.json:76-77), as README describes (README.md:9-13). No own version.

**2. projects/login-mfe-app.** Own build, with output in `dist/login-mfe-app` (angular.json:320-323), generating remote `login-mfe-app` with exposure `./LoginModule` (projects/login-mfe-app/webpack.config.js:6-11). Served only by development server on port 4203 (angular.json:383-384), same port as `remoteEntry.js` loaded by host (projects/host-app/src/app/app.routes.ts:39). No own version.

**3. projects/mfe1.** Same arrangement as application 2: own build with output in `dist/mfe1` (angular.json:114-117), remote `mfe1` exposing `./ContactsModule` (projects/mfe1/webpack.config.js:6-11), served on port 4201 (angular.json:177-178), the port of `remoteEntry.js` loaded by host (projects/host-app/src/app/app.routes.ts:20). No own version.

**4. projects/mfe2.** Same arrangement: own build with output in `dist/mfe2` (angular.json:215-218), remote `mfe2` exposing `./AdminModule` (projects/mfe2/webpack.config.js:6-11), served on port 4202 (angular.json:278-279), the port of `remoteEntry.js` loaded by host (projects/host-app/src/app/app.routes.ts:30). No own version.

## Summary

Applications: 4. Build (separate: 4). Deploy (not observed: 4). Independent versioning: 0.

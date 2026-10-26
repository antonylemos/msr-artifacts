---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
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

# 316 — Tutul33/mf-workspace

## Repository overview

Single Angular workspace (one `package.json` and one `angular.json` at root) with three projects linked by Native Federation: `host-app`, `customer-app` and `orders-app`. Each project has its own target `build`, with builder `@angular-architects/native-federation:build` (angular.json:17-18; angular.json:130-131; angular.json:243-244), delegating in configuration `production` to same project’s `esbuild` target (angular.json:21-22; angular.json:134-135; angular.json:247-248), its own `@angular/build:application` (angular.json:59-60; angular.json:172-173; angular.json:285-286). No target defines `outputPath`, and output directory `/dist` is ignored by git (.gitignore:4). Root scripts only call CLI: `start` = `ng serve`, `build` = `ng build`, `watch` = `ng build --watch --configuration development` (package.json:6-8), without project name.

Everything present is for development. Each project has `serve-original` with own port, 4200, 4301 and 4302 (angular.json:114; angular.json:227; angular.json:340), and host points to remotes at `http://localhost:4301/remoteEntry.json` and `http://localhost:4302/remoteEntry.json` (projects/host-app/src/app/app.routes.ts:9; projects/host-app/src/app/app.routes.ts:17). README and guide `angular_20_microfrontend_app_guide.md` instruct opening three terminals with `ng serve` (README.md:189-191), which is not deploy. The `.vscode/tasks.json` only runs scripts `start` and `test` (.vscode/tasks.json:6-7; .vscode/tasks.json:24-25). No Dockerfile, compose, CI or hosting configuration is present in snapshot, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | projects/customer-app | separate | not observed | `http://localhost:4301` in development (angular.json:227; projects/host-app/src/app/app.routes.ts:9) | No | angular.json:130-135 (own target `build`, native-federation); angular.json:172-173 (own target `esbuild`, `@angular/build:application`) |
| 2 | projects/host-app | separate | not observed | `http://localhost:4200` in development (angular.json:114) | No | angular.json:17-22 (own target `build`, native-federation); angular.json:59-60 (own target `esbuild`, `@angular/build:application`) |
| 3 | projects/orders-app | separate | not observed | `http://localhost:4302` in development (angular.json:340; projects/host-app/src/app/app.routes.ts:17) | No | angular.json:243-248 (own target `build`, native-federation); angular.json:285-286 (own target `esbuild`, `@angular/build:application`) |

## Observations

**1. projects/customer-app.** Separate build: project has its own target `build` and target `esbuild`, with entry at projects/customer-app/src/main.ts (angular.json:130-135; angular.json:172-175), generating `remoteEntry.json` loaded by host from port 4301 (projects/host-app/src/app/app.routes.ts:9). This port belongs to `serve-original` (angular.json:227), development-only, and no snapshot artifact publishes application, hence `not observed`. No own version: the only `version` is workspace `0.0.0` (package.json:3), unused in publication.

**2. projects/host-app.** Same arrangement: own target `build` and target `esbuild` (angular.json:17-22; angular.json:59-60), served in development on port 4200 (angular.json:114). Remote addresses are written in code as `localhost` (projects/host-app/src/app/app.routes.ts:9; projects/host-app/src/app/app.routes.ts:17), without per-environment configuration, reinforcing repository’s lack of a publication method.

**3. projects/orders-app.** Like customer-app: own target `build` and target `esbuild` (angular.json:243-248; angular.json:285-286), `remoteEntry.json` consumed by host on port 4302 (projects/host-app/src/app/app.routes.ts:17; angular.json:340), without deploy or own version.

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.

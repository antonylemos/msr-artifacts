---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Repository overview

Angular micro frontends tutorial with Native Federation. Three sibling Angular projects at root, without shared manifest or workspace: host `test-base` and remotes `tea-tracker` and `sticky-notes`. Each has its own `package.json`, lockfile and `angular.json`, and all three `angular.json` files are identical except project name and port. Target `build` uses builder `@angular-architects/native-federation:build` over project’s own `esbuild` target, with default `production` configuration (test-base/angular.json:16-29). Target `esbuild` is `@angular/build:application`, with entry `src/main.ts` and production optimization (`outputHashing: all`) (test-base/angular.json:43-84). Each package’s scripts are Angular CLI defaults: `start` runs `ng serve` and `build` runs `ng build` (test-base/package.json:4-9; tea-tracker/package.json:4-9; sticky-notes/package.json:4-9). Result would go into `dist/`, ignored by each project in git (test-base/.gitignore:4).

No deployment artifact is present in the snapshot: no Dockerfile, compose, CI or hosting configuration, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. The `.vscode` directories only contain editor tasks running `npm start` (test-base/.vscode/tasks.json:5-7). The `serve` is a development server on ports 4200, 4222 and 4333 (test-base/angular.json:85-98; tea-tracker/angular.json:96-97; sticky-notes/angular.json:96-97). Host resolves remotes through a federation manifest copied as an asset (test-base/angular.json:48-53), pointing to `http://localhost:4222/remoteEntry.json` and `http://localhost:4333/remoteEntry.json` (test-base/public/federation.manifest.json:2-3). Composition therefore only works with all three development servers running. README presents independent deployment as an architectural benefit and promises "two independently deployable micro frontends" (README.md:45-47; README.md:88), but procedure is entirely local, with `ng serve --port 4222` (README.md:197-208). This is documentation, not a deployment artifact.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | sticky-notes | separate | not observed | `http://localhost:4333` in development (sticky-notes/angular.json:96-97); `remoteEntry.json` at this origin, expected by host (test-base/public/federation.manifest.json:3) | No | sticky-notes/angular.json:16-29 (target `build` with native-federation); sticky-notes/angular.json:43-84 (target `esbuild`, `@angular/build:application`); sticky-notes/package.json:7 (`ng build`) |
| 2 | tea-tracker | separate | not observed | `http://localhost:4222` in development (tea-tracker/angular.json:96-97); `remoteEntry.json` at this origin, expected by host (test-base/public/federation.manifest.json:2) | No | tea-tracker/angular.json:16-29 (target `build` with native-federation); tea-tracker/angular.json:43-84 (target `esbuild`, `@angular/build:application`); tea-tracker/package.json:7 (`ng build`) |
| 3 | test-base | separate | not observed | `http://localhost:4200` in development (test-base/angular.json:96-97) | No | test-base/angular.json:16-29 (target `build` with native-federation); test-base/angular.json:43-84 (target `esbuild`, copies `public/` with federation manifest); test-base/package.json:7 (`ng build`) |

## Observations

**1. sticky-notes.** Separate build: own Angular project, whose `ng build` generates its own artifact (sticky-notes/package.json:7; sticky-notes/angular.json:16-29), with `remoteEntry.json` exposing `./App` (sticky-notes/federation.config.js:4-8). Does not package other applications’ code. No observed deploy: the only address is development server on port 4333, repeated by host manifest. Version `0.0.0` (sticky-notes/package.json:3) is unused in publication, and package is `private` (sticky-notes/package.json:23).

**2. tea-tracker.** Same arrangement as sticky-notes, on port 4222, exposing `./App` (tea-tracker/federation.config.js:4-8). Separate build, no observed deploy. Version `0.0.0` (tea-tracker/package.json:3) unused in publication; `private` package (tea-tracker/package.json:23).

**3. test-base.** Host with own build (test-base/package.json:7; test-base/angular.json:16-29). Does not include remote code: loads remotes at runtime through manifest localhost URLs, entering build as an asset of `public/` (test-base/angular.json:48-53; test-base/public/federation.manifest.json:2-3). Publishing host outside local environment would require changing these URLs, and nothing in snapshot does so. No observed deploy. Version `0.0.0` (test-base/package.json:3) unused in publication; `private` package (test-base/package.json:23).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.

---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
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

# 349 — LaurineLeNet/microfrontend-angular-angular

## Repository overview

The snapshot contains only three Angular workspaces side by side, `athletes`, `ranking` and `shell`, without root `package.json` or workspace (root contains only `.gitignore`, .gitignore:1-2). Each directory has its own `package.json` with `ng build` (athletes/package.json:7; ranking/package.json:7; shell/package.json:7) and its own `angular.json`, whose target `build` uses builder `@angular-architects/native-federation:build` over target `esbuild` with `@angular/build:application`, production by default (athletes/angular.json:16-29, 43-44; same in ranking/angular.json and shell/angular.json). Without `outputPath`, each build outputs to `dist/<projeto>` of its directory. All three files are identical except name and development port (4201, 4202 and 4200, athletes/angular.json:93; ranking/angular.json:93; shell/angular.json:93), applying only to `ng serve`.

Publication uses Cloudflare Workers with static assets: each directory has a `wrangler.jsonc` with its own worker (`mf-angular-athletes`, `mf-angular-ranking`, `mf-angular-shell`) serving that directory’s `./dist/<projeto>/browser` as SPA (athletes/wrangler.jsonc:3, 13-16; ranking/wrangler.jsonc:3, 13-16; shell/wrangler.jsonc:3, 13-16), and `wrangler` is a development dependency of each (athletes/package.json:39; ranking/package.json:39; shell/package.json:39). No script calls `wrangler deploy`, and no CI, Dockerfile or compose exists; publication would be manual through wrangler. Evidence suggests remote workers are in use: shell manifest points to `remoteEntry.json` at `mf-angular-athletes.lenetlaurine.workers.dev` and `mf-angular-ranking.lenetlaurine.workers.dev` (shell/public/federation.manifest.json:2-3), hosts matching worker names. Shell worker address is absent from snapshot.

The `ops-*` occurrences in `matches.csv` are `_headers` of both remotes (`ops-deployment-file` and `ops-cors`): athletes/public/_headers:1-2 and ranking/public/_headers:1-2 enable `Access-Control-Allow-Origin: *` for all paths, allowing shell in another worker to fetch `remoteEntry.json` and modules. The `public/` enters build assets (athletes/angular.json:48-53), and this `_headers` format is read by Cloudflare for static assets. Shell has no `_headers`. No `ci-*` or `cfg-public-path` occurrence exists. Each directory’s README is Angular CLI-generated and only describes `ng build` (athletes/README.md:29-37).

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | athletes | separate | separate | `https://mf-angular-athletes.lenetlaurine.workers.dev` (shell/public/federation.manifest.json:2; athletes/wrangler.jsonc:3); `http://localhost:4201` in development (athletes/angular.json:93) | No | athletes/angular.json:16-29 (target `build` with native federation over `esbuild`, athletes/angular.json:43-44); athletes/package.json:7 (`ng build`); athletes/wrangler.jsonc:3-16 (worker `mf-angular-athletes` publishing `./dist/athletes/browser`); athletes/public/_headers:1-2 (CORS `*`) |
| 2 | ranking | separate | separate | `https://mf-angular-ranking.lenetlaurine.workers.dev` (shell/public/federation.manifest.json:3; ranking/wrangler.jsonc:3); `http://localhost:4202` in development (ranking/angular.json:93) | No | ranking/angular.json:16-29 (target `build` with native federation over `esbuild`, ranking/angular.json:43-44); ranking/package.json:7 (`ng build`); ranking/wrangler.jsonc:3-16 (worker `mf-angular-ranking` publishing `./dist/ranking/browser`); ranking/public/_headers:1-2 (CORS `*`) |
| 3 | shell | separate | separate | worker `mf-angular-shell`, without snapshot address (shell/wrangler.jsonc:3); `http://localhost:4200` in development (shell/angular.json:93) | No | shell/angular.json:16-29 (target `build` with native federation over `esbuild`, shell/angular.json:43-44); shell/package.json:7 (`ng build`); shell/wrangler.jsonc:3-16 (worker `mf-angular-shell` publishing `./dist/shell/browser`) |

## Observations

**1. athletes.** Own build: `ng build` in directory generates `dist/athletes` only for this application (athletes/package.json:7; athletes/angular.json:16-29). Deploy also: worker `mf-angular-athletes` publishes only `./dist/athletes/browser` (athletes/wrangler.jsonc:3, 14), and shell consumes remote at exactly this host (shell/public/federation.manifest.json:2). The `_headers` with open CORS (athletes/public/_headers:1-2) support this cross-origin consumption. Version is `0.0.0` in a `private` package (athletes/package.json:3, 11), unused in publication.

**2. ranking.** Same arrangement as athletes: own build (ranking/package.json:7; ranking/angular.json:16-29), own worker `mf-angular-ranking` publishing `./dist/ranking/browser` (ranking/wrangler.jsonc:3, 14), consumed by shell at this host (shell/public/federation.manifest.json:3), with open CORS (ranking/public/_headers:1-2). Version `0.0.0` in a `private` package (ranking/package.json:3, 11).

**3. shell.** Own build (shell/package.json:7; shell/angular.json:16-29), and `federation.manifest.json` containing remote URLs accompanies it, because `public/` enters assets (shell/public/federation.manifest.json:1-4). Deploy uses own worker `mf-angular-shell`, publishing `./dist/shell/browser` (shell/wrangler.jsonc:3, 14); unlike remotes, nothing in snapshot gives this worker’s address, and shell has no `_headers`, because not loaded by another origin. Version `0.0.0` in a `private` package (shell/package.json:3, 11).

## Summary

Applications: 3. Build (separate: 3). Deploy (separate: 3). Independent versioning: 0.

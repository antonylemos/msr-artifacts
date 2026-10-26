---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
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

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Repository overview

Code resides in an Nx workspace at `nx-mf-df/`, with an Angular host (`main-host`) and three remotes (`mf_remote_a`, `mf_remote_b`, `mf_remote_c`) linked by Native Federation. No application has its own `package.json`: each is an Nx project with two chained targets, `build` (`@angular-architects/native-federation:build`, delegating to `esbuild`) and `esbuild` (`@angular/build:application`, with output in `dist/apps/<app>`) (e.g.: nx-mf-df/apps/main-host/project.json:9-22, :58-64). Root `package.json` has one build script per application and scripts triggering all (nx-mf-df/package.json:17-24). Development uses each app’s `serve` and `start:all`, starting three remotes on ports 4201-4203 then host (nx-mf-df/package.json:6-10; nx-mf-df/scripts/start-all.mjs:9-13, :113-121), and `serve-static` (`@nx/web:file-server`), serving each app `dist` locally (e.g.: nx-mf-df/apps/main-host/project.json:48-56). None counts as deploy.

Production deploy is one GitHub Pages site. Workflow `Deploy GitHub Pages`, triggered by push to `main`, runs `gh-build` and `gh-stage` and uploads directory `nx-mf-df/gh-pages-dist` as **one** Pages artifact, then published by `actions/deploy-pages` (.github/workflows/deploy-github-pages.yml:3-6, :37-47, :50-58). The `gh-build` builds lib `common-ui-lib`, host with `baseHref` at site root and each remote with `baseHref` in its subdirectory, and rewrites host `federation.manifest.json` to `remoteEntry.json` files in these subdirectories (nx-mf-df/scripts/gh-build.mjs:49-64). The `gh-stage` copies host `browser/` to `gh-pages-dist` root and each remote’s to `gh-pages-dist/<remote>` (nx-mf-df/scripts/gh-stage.mjs:9-25). Thus separate builds, combined in one tree and published in one hosting deploy, like single nginx image of repository 059. Manual path `gh-deploy` also exists, repeating build and stage and pushing same directory to branch `gh-pages` (nx-mf-df/scripts/gh-deploy.mjs:8-46; nx-mf-df/package.json:27, :64); also a single deploy of all four applications. Both `ops-hosting` occurrences in `matches.csv` are upload `path` (.github/workflows/deploy-github-pages.yml:47) and README script table (README.md:207), documentation; README also shows manual use with `GH_PAGES_BASE` (README.md:293-299).

Outside applications, lib `common-ui-lib` has own build with `ng-packagr-lite` (nx-mf-df/libs/common-ui-lib/project.json:10-14), called at start of `gh-build` (nx-mf-df/scripts/gh-build.mjs:49), but apps import it through `tsconfig` alias to source code (nx-mf-df/tsconfig.base.json:17-22), and library output is not published. Libraries have `"version": "0.0.1"` (nx-mf-df/libs/common-ui-lib/package.json:3), without publication. No Dockerfile, compose or other hosting configuration exists.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | nx-mf-df/apps/main-host | separate | joint | GitHub Pages site root, `/${{ github.event.repository.name }}/` (.github/workflows/deploy-github-pages.yml:39; nx-mf-df/scripts/gh-build.mjs:51; nx-mf-df/scripts/gh-stage.mjs:18); port 4200 of local `serve-static` (nx-mf-df/apps/main-host/project.json:53) | No | nx-mf-df/apps/main-host/project.json:9-22 (target `build` with Native Federation); nx-mf-df/apps/main-host/project.json:58-64 (`@angular/build:application`, output `dist/apps/main-host`); nx-mf-df/scripts/gh-build.mjs:51 (host-only build with root `baseHref`); nx-mf-df/scripts/gh-build.mjs:57-64 (production federation manifest); nx-mf-df/scripts/gh-stage.mjs:13-18 (copies host to root of `gh-pages-dist`); .github/workflows/deploy-github-pages.yml:37-58 (build, stage and a single Pages upload and deploy); nx-mf-df/scripts/gh-deploy.mjs:33-46 (manual publication of `gh-pages-dist` to branch `gh-pages`) |
| 2 | nx-mf-df/apps/mf_remote_a | separate | joint | subdirectory `mf_remote_a/` of GitHub Pages site (nx-mf-df/scripts/gh-build.mjs:54, :58; nx-mf-df/scripts/gh-stage.mjs:25); port 4201 of local `serve-static` (nx-mf-df/apps/mf_remote_a/project.json:53) | No | nx-mf-df/apps/mf_remote_a/project.json:9-22 (target `build` with Native Federation); nx-mf-df/apps/mf_remote_a/project.json:58-64 (output `dist/apps/mf_remote_a`); nx-mf-df/scripts/gh-build.mjs:53-54 (remote-only build with own `baseHref`); nx-mf-df/scripts/gh-stage.mjs:19-25 (copies to `gh-pages-dist/mf_remote_a`); .github/workflows/deploy-github-pages.yml:37-58 (same upload and deploy as host); nx-mf-df/scripts/gh-deploy.mjs:33-46 |
| 3 | nx-mf-df/apps/mf_remote_b | separate | joint | subdirectory `mf_remote_b/` of GitHub Pages site (nx-mf-df/scripts/gh-build.mjs:54, :59; nx-mf-df/scripts/gh-stage.mjs:25); port 4202 of local `serve-static` (nx-mf-df/apps/mf_remote_b/project.json:53) | No | nx-mf-df/apps/mf_remote_b/project.json:9-22; nx-mf-df/apps/mf_remote_b/project.json:58-64 (output `dist/apps/mf_remote_b`); nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25 (copies to `gh-pages-dist/mf_remote_b`); .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46 |
| 4 | nx-mf-df/apps/mf_remote_c | separate | joint | subdirectory `mf_remote_c/` of GitHub Pages site (nx-mf-df/scripts/gh-build.mjs:54, :60; nx-mf-df/scripts/gh-stage.mjs:25); port 4203 of local `serve-static` (nx-mf-df/apps/mf_remote_c/project.json:53) | No | nx-mf-df/apps/mf_remote_c/project.json:9-22; nx-mf-df/apps/mf_remote_c/project.json:58-64 (output `dist/apps/mf_remote_c`); nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25 (copies to `gh-pages-dist/mf_remote_c`); .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46 |

## Observations

**1. nx-mf-df/apps/main-host.** Build `separate`: Nx project target `build` generates `dist/apps/main-host` containing only host (nx-mf-df/apps/main-host/project.json:9-22, :58-64), and `gh-build` calls it alone (nx-mf-df/scripts/gh-build.mjs:51). Library code enters bundle through `tsconfig` alias (nx-mf-df/tsconfig.base.json:17-22), but this adds no other application code to artifact. After build, `gh-build` overwrites host `federation.manifest.json`, replacing addresses `localhost:4201-4203` (nx-mf-df/apps/main-host/public/federation.manifest.json:2-4) with site subdirectories (nx-mf-df/scripts/gh-build.mjs:57-64); the only stage where host build depends on remote deploy layout. Deploy `joint`: host goes to `gh-pages-dist` root (nx-mf-df/scripts/gh-stage.mjs:18), with all three remotes, and this directory is uploaded once and published in one Pages deploy (.github/workflows/deploy-github-pages.yml:45-58). The `404.html` copied from host `index.html` provides SPA routing fallback for whole site (nx-mf-df/scripts/gh-stage.mjs:27). Versioning `No`: host has no `package.json`, and root manifest is `"version": "0.0.0"`, `"private": true` (nx-mf-df/package.json:3, :29).

**2. nx-mf-df/apps/mf_remote_a.** Build `separate`: own target with output `dist/apps/mf_remote_a` (nx-mf-df/apps/mf_remote_a/project.json:9-22, :58-64), called in remote loop with `baseHref` `${base}mf_remote_a/` (nx-mf-df/scripts/gh-build.mjs:53-54). Deploy `joint`: output is copied to `gh-pages-dist/mf_remote_a` (nx-mf-df/scripts/gh-stage.mjs:19-25) and published in same Pages artifact as host and other remotes (.github/workflows/deploy-github-pages.yml:45-58). Subdirectory is address used by host production manifest for this remote (nx-mf-df/scripts/gh-build.mjs:58), same as Configuration column of composition review. Versioning `No`: no own `package.json`.

**3. nx-mf-df/apps/mf_remote_b.** Same situation as application 2: own build with output `dist/apps/mf_remote_b` (nx-mf-df/apps/mf_remote_b/project.json:9-22, :58-64; nx-mf-df/scripts/gh-build.mjs:53-54), copy to `gh-pages-dist/mf_remote_b` (nx-mf-df/scripts/gh-stage.mjs:19-25) and publication in single Pages deploy (.github/workflows/deploy-github-pages.yml:45-58). Host loads it through `${base}mf_remote_b/remoteEntry.json` (nx-mf-df/scripts/gh-build.mjs:59). Versioning `No`.

**4. nx-mf-df/apps/mf_remote_c.** Same situation as application 2: own build with output `dist/apps/mf_remote_c` (nx-mf-df/apps/mf_remote_c/project.json:9-22, :58-64; nx-mf-df/scripts/gh-build.mjs:53-54), copy to `gh-pages-dist/mf_remote_c` (nx-mf-df/scripts/gh-stage.mjs:19-25) and publication in single Pages deploy (.github/workflows/deploy-github-pages.yml:45-58). Host loads it through `${base}mf_remote_c/remoteEntry.json` (nx-mf-df/scripts/gh-build.mjs:60). Versioning `No`.

## Summary

Applications: 4. Build (separate: 4). Deploy (joint: 4). Independent versioning: 0.

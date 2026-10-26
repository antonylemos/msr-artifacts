---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
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

# 343 — Jonadersonmoura/descompara

## Repository overview

Single Nx workspace with four Angular applications (`shell` and remotes `admin`, `intranet` and `marAberto`) and libraries in `libs/shared/`. Root `package.json` has no scripts (package.json:5); builds are Nx targets in each application’s `project.json`. In all four, target `build` uses builder `@angular-architects/native-federation:build` over target `esbuild` (`@angular/build:application`), with default configuration `production`, and each `esbuild` writes to its own directory: `dist/shell`, `dist/admin`, `dist/intranet` and `dist/marAberto` (shell/project.json:9-24, 63-70; admin/project.json:9-24, 72-79; intranet/project.json:9-24, 72-79; marAberto/project.json:9-24, 72-79). README shows building one application at a time or all four with `run-many` (README.md:86-87).

The only CI artifact is workflow `.github/workflows/ci.yml`, on push to `main` and pull requests installs dependencies and runs `npx nx run-many -t lint test build typecheck e2e` across all projects (.github/workflows/ci.yml:3-7, 33, 37), with task distribution through Nx Cloud (.github/workflows/ci.yml:25). It builds and tests but neither packages nor publishes anything: no upload, image or deploy step. Both `ci-*` occurrences in `matches.csv` (`ci-workflow-file` and `ci-monorepo-tooling` at .github/workflows/ci.yml:37) point to this file; no `ops-*` or `cfg-public-path` occurrences exist.

No Dockerfile, compose, deployment manifest, hosting configuration or publication script is present in snapshot. Existing means of serving applications are for development: each `serve` wraps Nx dev-server (`serve-original`, `@nx/angular:dev-server`) on ports 4200 to 4203 (shell/project.json:117-124; admin/project.json:126-133; intranet/project.json:126-133; marAberto/project.json:126-133), and `serve-static` (`@nx/web:file-server`) serves build locally on same ports (shell/project.json:54-62; admin/project.json:54-62). README instructs starting all four dev-servers in separate terminals (README.md:66-73). Shell e2e tests start shell’s own dev-server (shell-e2e/playwright.config.mts:33-37). Federation manifest, copied to shell build as an asset of `shell/public` (shell/project.json:74-79), fixes remotes at `http://localhost:4201` to `4203` (shell/public/federation.manifest.json:2-4), namely dev-servers.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | admin | separate | not observed | `http://localhost:4203` (admin/project.json:132); `http://localhost:4203/remoteEntry.json`, consumed by shell (shell/public/federation.manifest.json:2) | No | admin/project.json:9-24 (target `build` with Native Federation over `esbuild`); admin/project.json:72-79 (target `esbuild`, `@angular/build:application`, `outputPath: dist/admin`); .github/workflows/ci.yml:37 (CI runs `build` of all projects) |
| 2 | intranet | separate | not observed | `http://localhost:4202` (intranet/project.json:132); `http://localhost:4202/remoteEntry.json`, consumed by shell (shell/public/federation.manifest.json:3) | No | intranet/project.json:9-24 (target `build` with Native Federation over `esbuild`); intranet/project.json:72-79 (target `esbuild`, `@angular/build:application`, `outputPath: dist/intranet`); .github/workflows/ci.yml:37 (CI runs `build` of all projects) |
| 3 | marAberto | separate | not observed | `http://localhost:4201` (marAberto/project.json:132); `http://localhost:4201/remoteEntry.json`, consumed by shell (shell/public/federation.manifest.json:4) | No | marAberto/project.json:9-24 (target `build` with Native Federation over `esbuild`); marAberto/project.json:72-79 (target `esbuild`, `@angular/build:application`, `outputPath: dist/marAberto`); .github/workflows/ci.yml:37 (CI runs `build` of all projects) |
| 4 | shell | separate | not observed | `http://localhost:4200` (shell/project.json:123) | No | shell/project.json:9-24 (target `build` with Native Federation over `esbuild`); shell/project.json:63-79 (target `esbuild`, `@angular/build:application`, `outputPath: dist/shell`, with `shell/public` as asset); .github/workflows/ci.yml:37 (CI runs `build` of all projects) |

## Observations

**1. admin.** Own build through project Nx target, generating admin-only artifact in `dist/admin` (admin/project.json:9-24, 72-79); library code from `libs/shared/` enters artifact as dependency, not another application. CI executes this build with other project builds (.github/workflows/ci.yml:37), but executing builds is not publishing, and no snapshot artifact packages or publishes `dist/admin`: Deploy `not observed`. Recorded address belongs to dev-server, port 4203 (admin/project.json:130-133), same as shell manifest uses for `remoteEntry.json` (shell/public/federation.manifest.json:2). No own `package.json` or version used in publication.

**2. intranet.** Same arrangement as admin: own build in `dist/intranet` (intranet/project.json:9-24, 72-79), executed by CI with others (.github/workflows/ci.yml:37), without deployment artifact. Served only by dev-server on port 4202 (intranet/project.json:130-133), shell manifest address (shell/public/federation.manifest.json:3). No own version.

**3. marAberto.** Same arrangement: own build in `dist/marAberto` (marAberto/project.json:9-24, 72-79), executed by CI with others (.github/workflows/ci.yml:37), without deployment artifact. Served only by dev-server on port 4201 (marAberto/project.json:130-133), shell manifest address (shell/public/federation.manifest.json:4). No own version.

**4. shell.** Own build in `dist/shell` (shell/project.json:9-24, 63-70). Artifact carries federation manifest as asset (shell/project.json:74-79), but no remote code, fetched at runtime through manifest URLs (shell/src/main.ts:3; shell/public/federation.manifest.json:2-4). Because URLs point to `localhost`, shell build only composes with remotes running in local dev-servers; publication would require replacing manifest, which snapshot does not do. Deploy `not observed`: only dev-server on port 4200 (shell/project.json:117-124) and local `serve-static` (shell/project.json:54-62). No own version; version `0.0.0` of root `package.json` (package.json:3) belongs to private workspace and is unused in publication.

## Summary

Applications: 4. Build (separate: 4). Deploy (not observed: 4). Independent versioning: 0.

---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
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

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Repository overview

Proof of concept with two independent Angular workspaces, `host` and `remote`, without a grouping workspace; snapshot root contains only `.gitignore`, `README.md` (one title line, README.md:1) and both directories. Each workspace has its own `package.json` with Angular CLI default scripts, `start: ng serve` and `build: ng build` (host/package.json:6-7; remote/package.json:6-7), and its own `angular.json` with a single project. In both, target `build` uses builder `@angular-architects/native-federation:build` over target `esbuild` (`@angular/build:application`), with default configuration `production` (host/angular.json:16-29, 57-58; remote/angular.json:16-31, 58-59). The `outputPath` is undeclared, so each build outputs to its own workspace `dist/`, as CLI-generated READMEs state (host/README.md:34-37; remote/README.md:34-37).

No Dockerfile, compose, CI workflow, hosting configuration or publication script is present in snapshot, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. Existing means of executing applications are for development: each workspace’s `serve` wraps Angular dev-server (`serve-original`, `@angular/build:dev-server`) on ports 4200 and 4201 (host/angular.json:30-37, 99-112; remote/angular.json:32-35, 96-109), and VS Code tasks only run `npm start` (host/.vscode/tasks.json:5-7). Host points remote to `http://localhost:4201/remoteEntry.json` (host/src/main.ts:3-5), remote dev-server.

A CSS-level build coupling exists: host Tailwind also scans remote templates (host/src/styles.css:3-4) to generate classes they use when mounted in host. This does not put remote code in host artifact; only CSS classes generated from it. Host build does, however, depend on directory `remote/src` being present alongside.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | host | separate | not observed | `http://localhost:4200` (host/angular.json:111) | No | host/angular.json:16-29 (target `build` with Native Federation over `esbuild`); host/angular.json:57-98 (target `esbuild`, `@angular/build:application`); host/package.json:7 (`ng build`); host/src/styles.css:3-4 (Tailwind scans own code and remote code) |
| 2 | remote | separate | not observed | `http://localhost:4201` (remote/angular.json:108); `http://localhost:4201/remoteEntry.json`, consumed by host (host/src/main.ts:4) | No | remote/angular.json:16-31 (target `build` with Native Federation over `esbuild`); remote/angular.json:58-95 (target `esbuild`, `@angular/build:application`); remote/package.json:7 (`ng build`) |

## Observations

**1. host.** Own build in its workspace, generating host-only artifact in `host/dist/`. CSS generation includes classes from remote templates (host/src/styles.css:4), but remote code remains outside artifact and loads at runtime through `remoteEntry.json` (host/src/main.ts:3-5). Deploy is `not observed`: the snapshot’s only way to serve host is dev-server on port 4200 (host/angular.json:99-112). Version `0.0.0` of private package (host/package.json:3, 21) is unused in publication.

**2. remote.** Own build in its workspace, with same arrangement as host (remote/angular.json:16-31, 58-59). Deploy is `not observed` for same reason: remote is served only by dev-server on port 4201 (remote/angular.json:96-109), address fixed by host for `remoteEntry.json` (host/src/main.ts:4). Version `0.0.0` of private package (remote/package.json:3, 21) is unused in publication.

## Summary

Applications: 2. Build (separate: 2). Deploy (not observed: 2). Independent versioning: 0.

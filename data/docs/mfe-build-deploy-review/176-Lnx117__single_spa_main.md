---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
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

# 176 — Lnx117/single_spa_main

## Repository overview

The snapshot contains only a single-spa application root config: a root Vite project without workspace, with `package.json`, `package-lock.json`, `vite.config.ts`, `index.html`, `src/main.ts` and `.envtest`. The `package.json` has three scripts: `dev` (`vite`), `build` (`vite build`) and `preview` (`vite preview`) (package.json:6-10). Build uses `vite.config.ts` configuration, with `vitePluginSingleSpa` in `type: 'root'` (vite.config.ts:12-15); output goes to default Vite directory, because configuration defines neither `build` nor `base`. Block `server` applies only to dev server: port 9080 and `host: true` (vite.config.ts:17-22).

No deployment artifact exists. The `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences, and snapshot has no Dockerfile, compose, CI workflow or hosting configuration. Existing configuration is for development: both microfrontends loaded by root config, `menu` and `base`, are outside repository and referenced by Vite dev server URLs at `localhost` (.envtest:8, 11; src/main.ts:15, 23). An `.envtest` comment mentions using CDN-published builds as a future step, with an example URL (.envtest:5); this is a comment, not a deployment artifact, and does not decide Deploy column.

Because `menu` and `base` are absent from snapshot, they do not enter table; structural review has only root as an application. No backend or API server exists.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | not observed | `http://localhost:9080` in development (vite.config.ts:18) | No | package.json:8 (`vite build`); vite.config.ts:5-16 (Vite configuration with `vitePluginSingleSpa` in `type: 'root'`) |

## Observations

**1. Root (`.`).** Own build: script `build` runs `vite build` at root (package.json:8), with root config configuration (vite.config.ts:5-16), generating an artifact only for this application. Microfrontends do not enter it: `import()` of `VITE_MENU` and `VITE_BASE` URLs is marked `@vite-ignore` (src/main.ts:15, 23) and resolved at runtime. Deploy `not observed`: no snapshot artifact packages or publishes application; `dev` and `preview` (package.json:7, 9) are development commands and port 9080 belongs to dev server (vite.config.ts:17-18). Version `1.0.0` (package.json:3) is unused in any publication, hence Versioning `No`.

## Summary

Applications: 1. Build (separate: 1). Deploy (not observed: 1). Independent versioning: 0.

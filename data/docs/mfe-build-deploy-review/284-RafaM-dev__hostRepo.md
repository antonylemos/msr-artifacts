---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
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

# 284 — RafaM-dev/hostRepo

## Repository overview

The repository has a single React + Vite application, host at root. Remote it loads, `mf-remoteDetails`, is absent from snapshot: appears only as `http://localhost:5001/assets/remoteEntry.js` in Module Federation configuration (vite.config.ts:11-13; see composition review). This remote’s build and deploy, if present, are outside repository. Host build is Vite default, `tsc -b && vite build` (package.json:8), with plugin `@originjs/vite-plugin-federation` (vite.config.ts:3, 8-15). Configuration defines neither `build.outDir` nor `base`, so output is Vite default; `.gitignore:11` ignores `dist`.

Other scripts are for development: `vite` and `vite preview` (package.json:7, 10). No Dockerfile, CI, hosting configuration or publication script exists, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. README only instructs running `npm run build` and `npm run preview` locally and mentions development server port 5173 (README.md:52, 56-62, 318-322); it does not describe deploy. Empty root file `remote-root@0.0.0` is neither a build nor deployment artifact.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | not observed | — | No | package.json:8 (`tsc -b && vite build`); vite.config.ts:5-17 (Vite configuration with `react()` and host `federation(...)`) |

## Observations

**1. Root (`.`).** Root application, the host. Separate build: own build script and configuration (package.json:8; vite.config.ts:5-17), and remote code is absent from repository. No observed deploy: only development commands `vite` and `vite preview` (package.json:7, 10), and nothing in snapshot publishes application. Where served remains `—`: `vite.config.ts` fixes neither port nor `base`; port 5173 appears only in README (README.md:52), not an artifact. No versioning: package.json:4 declares `0.0.0`, unused in publication.

## Summary

Applications: 1. Build (separate: 1). Deploy (not observed: 1). Independent versioning: 0.

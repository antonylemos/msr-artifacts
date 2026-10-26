---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
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

# 309 — tonoizer/react-mf-patch-skew-repro

## Repository overview

Minimal reproduction of a Module Federation defect with Vite (README.md:3), organized as pnpm workspace with four packages: `host`, `remote_a`, `remote_b` and `remote_c` (pnpm-workspace.yaml:1-5). Each package has its own `package.json` and `vite.config.js`, with `build` (`vite build`) and `preview` (`vite preview`) (e.g.: host/package.json:5-8). Root only orchestrates: `build` triggers each package build by filter, and `build:all` runs them sequentially, from remotes to host (package.json:6-7); scripts `preview:*` serve each built package on its port, from 5000 to 5003 (package.json:8-11). README instructs doing same manually, building packages one by one and starting four `vite preview` servers at `127.0.0.1` before running Playwright procedure (README.md:33-45).

Everything present is local execution of an experiment. Each `vite.config.js` fixes `base` at `http://localhost:<porta>/` and a `preview` port with `strictPort` (host/vite.config.js:14-16; remote_a/vite.config.js:14-16; remote_b/vite.config.js:14-16; remote_c/vite.config.js:14-16), and build only adjusts `target` and disables minification (host/vite.config.js:38). Generated artifacts are tied to these `localhost` ports. The `scripts/capture.mjs` opens host at `http://localhost:5000/` (scripts/capture.mjs:58) and writes reports in `evidence/` (scripts/capture.mjs:6, 124-130); test tool, not deploy. The `dist/` is ignored in git (.gitignore:2). No Dockerfile, compose, CI or hosting configuration exists, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | host | separate | not observed | `http://localhost:5000/` (host/vite.config.js:15-16) | No | host/vite.config.js:13-39 (own configuration, fixed `base`); host/package.json:6 (`vite build`); package.json:6-7 (`build`, `build:all`) |
| 2 | remote_a | separate | not observed | `http://localhost:5001/` (remote_a/vite.config.js:15-16) | No | remote_a/vite.config.js:13-38 (own configuration, fixed `base`); remote_a/package.json:6 (`vite build`); package.json:6-7 (`build`, `build:all`) |
| 3 | remote_b | separate | not observed | `http://localhost:5002/` (remote_b/vite.config.js:15-16) | No | remote_b/vite.config.js:13-31 (own configuration, fixed `base`); remote_b/package.json:6 (`vite build`); package.json:6-7 (`build`, `build:all`) |
| 4 | remote_c | separate | not observed | `http://localhost:5003/` (remote_c/vite.config.js:15-16) | No | remote_c/vite.config.js:13-31 (own configuration, fixed `base`); remote_c/package.json:6 (`vite build`); package.json:6-7 (`build`, `build:all`) |

## Observations

**1. host.** Own Vite build (host/package.json:6), triggered last in `build:all` (package.json:7). Remote addresses are fixed at `localhost:5001` and `localhost:5002` in configuration (host/vite.config.js:22-31), and own `base` at `localhost:5000`. No observed deploy: `preview:host` (package.json:11) and README `vite preview` (README.md:43) only serve locally. Package is `private` and version is unused for publication.

**2. remote_a.** Own build (remote_a/package.json:6). Remote of host and host of remote_c, whose entry is fixed at `http://localhost:5003/remoteEntry.js` (remote_a/vite.config.js:26-30); hence `build:all` builds remote_c before it (package.json:7). Served only by `preview:remote_a` on port 5001 (package.json:10). No observed deploy.

**3. remote_b.** Own build (remote_b/package.json:6), with `base` at `localhost:5002`. Served only by `preview:remote_b` (package.json:9). No observed deploy.

**4. remote_c.** Own build (remote_c/package.json:6), first in `build:all` (package.json:7), with `base` at `localhost:5003`. Served only by `preview:remote_c` (package.json:8). No observed deploy.

## Summary

Applications: 4. Build (separate: 4). Deploy (not observed: 4). Independent versioning: 0.

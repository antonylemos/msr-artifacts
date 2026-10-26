---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
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

# 123 — PedroHugo11/mf-dashboard-module-federation

## Repository overview

Proof of concept with three independent Vite projects at root (`shell`, `mfe-weather` and `mfe-counter`), without root `package.json` or workspace. Each project has its own manifest, lockfile and scripts, identical across all three: `dev` (`vite`), `build` (`tsc -b && vite build`) and `preview` (`vite preview`) (shell/package.json:6-11; mfe-weather/package.json:6-11; mfe-counter/package.json:6-11). Each `vite.config.ts` is its own, with `build.target: "esnext"` and plugin `@originjs/vite-plugin-federation`: both remotes generate `remoteEntry.js` (mfe-weather/vite.config.ts:14-21; mfe-counter/vite.config.ts:14-21) and shell points to them (shell/vite.config.ts:14-20). No configuration defines `base` or another public path, and build-generated `dist` directory is ignored by git (.gitignore:2; shell/.gitignore:11).

The snapshot has no Dockerfile, Compose, CI workflow or hosting configuration, and `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. Existing configuration is for development: `server.port` ports (shell 5175, weather 5173, counter 5174; shell/vite.config.ts:6-8; mfe-weather/vite.config.ts:6-8; mfe-counter/vite.config.ts:6-8) and remote URLs fixed at `localhost`, on ports 4173 and 4174 (shell/vite.config.ts:16-17), matching remotes’ default `vite preview`. README describes exactly this local procedure: build and preview of weather, then counter, and `npm run dev` in shell, opened at `http://localhost:5175` (README.md:65-82). README also lists "Independent builds and deployments" among demonstrated concepts (README.md:43), but no snapshot artifact deploys; under the rule, README does not decide Deploy column.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | mfe-counter | separate | not observed | `http://localhost:5174` in development (mfe-counter/vite.config.ts:6-8); `http://localhost:4174` in `vite preview`, as shell expects (shell/vite.config.ts:17) | No | mfe-counter/package.json:8 (`tsc -b && vite build`); mfe-counter/vite.config.ts:5-23 (own configuration, generates `remoteEntry.js`); mfe-counter/package.json:10 (`vite preview`, local only) |
| 2 | mfe-weather | separate | not observed | `http://localhost:5173` in development (mfe-weather/vite.config.ts:6-8); `http://localhost:4173` in `vite preview`, as shell expects (shell/vite.config.ts:16) | No | mfe-weather/package.json:8 (`tsc -b && vite build`); mfe-weather/vite.config.ts:5-23 (own configuration, generates `remoteEntry.js`); mfe-weather/package.json:10 (`vite preview`, local only) |
| 3 | shell | separate | not observed | `http://localhost:5175` in development (shell/vite.config.ts:6-8) | No | shell/package.json:8 (`tsc -b && vite build`); shell/vite.config.ts:5-22 (own configuration, consumes remotes through `localhost`) |

## Observations

**1. mfe-counter.** Separate build: project has its own `vite.config.ts` and `build` script, generating its own `dist` with `remoteEntry.js` for remote `counter` (mfe-counter/package.json:8; mfe-counter/vite.config.ts:14-18). Deploy not observed: the snapshot’s only way to serve build is `vite preview` (mfe-counter/package.json:10), a local command; port 4174 is not fixed in remote configuration and works only if weather preview already occupies 4173, as in README order (README.md:67-73). Versioning `No`: `version: "0.0.0"` with `private: true` (mfe-counter/package.json:3-4), unused in publication.

**2. mfe-weather.** Same arrangement as counter: own build (mfe-weather/package.json:8; mfe-weather/vite.config.ts:14-18), served only by local commands `vite` and `vite preview` (mfe-weather/package.json:7, 10). Port 4173 of shell URL (shell/vite.config.ts:16) is `vite preview` default, without configuration in remote. Versioning `No`: `version: "0.0.0"` and `private: true` (mfe-weather/package.json:3-4).

**3. shell.** Separate build: `tsc -b && vite build` with own configuration (shell/package.json:8; shell/vite.config.ts:5-22); remote code does not enter shell artifact, which only stores `remoteEntry.js` URLs (shell/vite.config.ts:15-18). Because these URLs are fixed at `localhost`, a shell build only works against remotes served on the same machine. README runs shell with `npm run dev`, rather than preview (README.md:77-82). Deploy not observed and Versioning `No`: `version: "0.0.0"` and `private: true` (shell/package.json:3-4).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.

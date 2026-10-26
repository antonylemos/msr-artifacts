---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
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

# 228 — Christian-Encalada/examen-microfrontend

## Repository overview

Three independent npm projects, without workspace: host `appclases` at root and remotes `alert-sender` and `alert-dashboard` in subdirectories, each with its own `package.json`, `package-lock.json` and `rspack.config.ts`. All three `package.json` files have identical scripts: `build` (`rspack build` in production), `build:dev`, `build:start` (`cd dist && rspack serve`) and `start` (`rspack serve` in development) (package.json:4-9; alert-sender/package.json:4-9; alert-dashboard/package.json:4-9). No root script triggers remote builds; README instructs installing and starting each project in its directory, in three terminals (README.md:23-66).

All three Rspack configurations are nearly identical: entry `./src/index.ts`, `HtmlRspackPlugin` with project `index.html` and `ModuleFederationPlugin` with project `module-federation.config.ts` (rspack.config.ts:17-19, 77-83). They differ in development server port (rspack.config.ts:25; alert-sender/rspack.config.ts:25; alert-dashboard/rspack.config.ts:25: 3000, 3001 and 3002) and `output`, where `uniqueName` and `publicPath` belong to each application (rspack.config.ts:29-34; alert-sender/rspack.config.ts:29-34; alert-dashboard/rspack.config.ts:29-34). None defines `output.path`, so each build outputs to its own project `dist`, ignored by git (.gitignore:85).

No deployment artifact is present in snapshot: no CI workflow, Dockerfile, compose, manifest or hosting configuration, and `matches.csv` has no `ops-*` or `ci-*` occurrences. The only occurrences in selected scope are three `cfg-public-path`, all at `http://localhost` (rspack.config.ts:33; alert-sender/rspack.config.ts:33; alert-dashboard/rspack.config.ts:33), same ports as remote URLs in host (module-federation.config.ts:6-7). This is development configuration: even production build remains tied to `localhost` by `publicPath`, and `build:start` only serves `dist` through Rspack server, run manually.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | . | separate | not observed | `http://localhost:3000` in development (rspack.config.ts:25, 33) | No | rspack.config.ts:15-92 (own configuration, entry `./src/index.ts`); package.json:5 (`rspack build`) |
| 2 | alert-dashboard | separate | not observed | `http://localhost:3002` in development (alert-dashboard/rspack.config.ts:25, 33) | No | alert-dashboard/rspack.config.ts:15-92 (own configuration, generates `remoteEntry.js` through alert-dashboard/module-federation.config.ts:2-6); alert-dashboard/package.json:5 (`rspack build`) |
| 3 | alert-sender | separate | not observed | `http://localhost:3001` in development (alert-sender/rspack.config.ts:25, 33) | No | alert-sender/rspack.config.ts:15-92 (own configuration, generates `remoteEntry.js` through alert-sender/module-federation.config.ts:2-6); alert-sender/package.json:5 (`rspack build`) |

## Observations

**1. . (host `appclases`).** Root build starts only from `./src/index.ts` (rspack.config.ts:17-19) and does not include remote code, consumed by host at runtime through `remoteEntry.js` files at localhost (module-federation.config.ts:5-8); hence `separate`, although remotes are in its subdirectories. The `publicPath` `http://localhost:3000/` (rspack.config.ts:33) and port 3000 (rspack.config.ts:25) are for development. The `version` `0.0.1` (package.json:3) is unused in publication.

**2. alert-dashboard.** Separate project, with own Rspack build (alert-dashboard/package.json:5; alert-dashboard/rspack.config.ts:15-92) generating `remoteEntry.js` for remote `AlertDashboard` (alert-dashboard/module-federation.config.ts:2-6). Served only by development server on port 3002, with `publicPath` `http://localhost:3002/` (alert-dashboard/rspack.config.ts:25, 33). The `version` `0.0.1` is unused (alert-dashboard/package.json:3).

**3. alert-sender.** Same arrangement as application 2: own build (alert-sender/package.json:5; alert-sender/rspack.config.ts:15-92), `remoteEntry.js` for remote `AlertSender` (alert-sender/module-federation.config.ts:2-6), port 3001 and `publicPath` `http://localhost:3001/` (alert-sender/rspack.config.ts:25, 33). The `version` `0.0.1` is unused (alert-sender/package.json:3).

## Summary

Applications: 3. Build (separate: 3). Deploy (not observed: 3). Independent versioning: 0.

---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
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

# 025 — raiane-honorato/software-eng-mba

## Repository overview

Undergraduate final project repository implementing the same React Native app (MyGym) in three versions to compare modularization regimes: Expo monolith, Turborepo (build-time) and Re.Pack with Module Federation (runtime) (README.md:29-33). There is also an earlier spike in `apps/repack-poc/`, with minimal host and remote. There is no Dockerfile, compose, CI workflow, hosting configuration or store publication configuration (no `ops-*`, `ci-*` or `cfg-public-path` occurrence in matches.csv). Monolith and Turborepo app `app.json` files contain only name, version, icons and splash (apps/monolith/app.json:2-29; apps/turborepo/apps/mygym/app.json:2-29), and no native `android/`/`ios/` folders are in the snapshot. The entire arrangement is for development and measurement.

Build exists in three forms. Monolith and Turborepo app have a `build` script using `expo export --platform android` (apps/monolith/package.json:10; apps/turborepo/apps/mygym/package.json:11); in Turborepo, root triggers `turbo run build` (apps/turborepo/package.json:5) with output `dist/**` (apps/turborepo/turbo.json:5-8), and features enter as workspace packages in the single `mygym` bundle (README.md:32). Re.Pack packages have no `build` script: each has its own `rspack.config.mjs` and replaces React Native commands with Re.Pack commands (apps/repack/packages/host/react-native.config.js:2). Measurement script `scripts/measure-repack.sh` generates, separately for `host`, `check-in` and `dashboard`, a production Android bundle with `react-native bundle --dev false` within each package, in a temporary folder (scripts/measure-repack.sh:25-33, 40-42); results are at scripts/results/repack_build_isolated.csv:1. The `scripts/measure.sh` does the same for monolith and Turborepo using `expo export` (scripts/measure.sh:75, 100, 132). None of these scripts publishes its output.

To run the Re.Pack version, `apps/repack/package.json:6` calls `mprocs`, starting the three dev servers (apps/repack/mprocs.yaml:4-10): check-in on 9001, dashboard on 9002 (apps/repack/packages/check-in/package.json:9; apps/repack/packages/dashboard/package.json:9) and host on 8081, according to the comment at apps/repack/mprocs.yaml:2-3. Host fetches remotes’ `mf-manifest.json` files on these ports at `localhost` (apps/repack/packages/host/rspack.config.mjs:49-52), and the app is installed in the simulator with `react-native run-ios` (apps/repack/README.md:118). In the spike, host fetches remote at `localhost:9001` (apps/repack-poc/host/rspack.config.mjs:44-46), a port passed manually to remote `start` (apps/repack-poc/README.md:101). README claims Re.Pack allows independent deployment and OTA (README.md:33, 37), but no snapshot artifact publishes bundles or containers; this is a documentation claim.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/monolith | separate | not observed | — | No | apps/monolith/package.json:10 (`expo export --platform android`); apps/monolith/app.json:2-29 (own Expo configuration); scripts/measure.sh:75 (measures monolith build) |
| 2 | apps/repack-poc/host | separate | not observed | — | No | apps/repack-poc/host/rspack.config.mjs:15-54 (own Re.Pack/Rspack configuration, remote at `localhost:9001`); apps/repack-poc/host/react-native.config.js:2 (Re.Pack rspack commands) |
| 3 | apps/repack-poc/remote | separate | not observed | `http://localhost:9001/${platform}/` (apps/repack-poc/host/rspack.config.mjs:45) | No | apps/repack-poc/remote/rspack.config.mjs:15-47 (own configuration, container `remote.container.bundle`); apps/repack-poc/remote/react-native.config.js:2 (Re.Pack rspack commands) |
| 4 | apps/repack/packages/check-in | separate | not observed | `http://localhost:9001/${platform}/` (apps/repack/packages/host/rspack.config.mjs:50; apps/repack/packages/check-in/package.json:9) | No | apps/repack/packages/check-in/rspack.config.mjs:14-51 (own configuration, container `check-in.container.js.bundle`); apps/repack/packages/check-in/react-native.config.js:2 (Re.Pack rspack commands); scripts/measure-repack.sh:29-31, 41 (isolated production bundle) |
| 5 | apps/repack/packages/dashboard | separate | not observed | `http://localhost:9002/${platform}/` (apps/repack/packages/host/rspack.config.mjs:51; apps/repack/packages/dashboard/package.json:9) | No | apps/repack/packages/dashboard/rspack.config.mjs:14-49 (own configuration, container `dashboard.container.js.bundle`); apps/repack/packages/dashboard/react-native.config.js:2 (Re.Pack rspack commands); scripts/measure-repack.sh:29-31, 42 (isolated production bundle) |
| 6 | apps/repack/packages/host | separate | not observed | dev server port 8081 (apps/repack/mprocs.yaml:2-3) | No | apps/repack/packages/host/rspack.config.mjs:16-58 (own configuration, external remotes); apps/repack/packages/host/react-native.config.js:2 (Re.Pack rspack commands); scripts/measure-repack.sh:29-31, 40 (isolated production bundle) |
| 7 | apps/turborepo/apps/mygym | separate | not observed | — | No | apps/turborepo/apps/mygym/package.json:11 (`expo export --platform android`); apps/turborepo/package.json:5 (`turbo run build`); apps/turborepo/turbo.json:5-8 (task `build`, output `dist/**`); scripts/measure.sh:100, 132 (measures build) |

## Observations

**1. apps/monolith.** Own build through `expo export` (apps/monolith/package.json:10), outside any workspace and without sharing an artifact with the other versions. The remaining scripts use development `expo start` (apps/monolith/package.json:6-9). Deploy `not observed`: nothing packages or publishes the export. The `version` `1.0.0` (apps/monolith/package.json:3; apps/monolith/app.json:5) is used in no publication.

**2. apps/repack-poc/host.** Own build through the spike’s `rspack.config.mjs`, declaring remote as external (apps/repack-poc/host/rspack.config.mjs:41-46), so remote code does not enter the host bundle. There is no `build` script; the bundle comes from `react-native start` or `run-ios`/`run-android` (apps/repack-poc/host/package.json:6-9). Host port 8081 appears only in README (apps/repack-poc/README.md:19, 103), so the column remains `—`. Deploy `not observed`.

**3. apps/repack-poc/remote.** Own build generating container `remote.container.bundle` (apps/repack-poc/remote/rspack.config.mjs:37-40). Served only by the dev server: `start` fixes no port (apps/repack-poc/remote/package.json:9), and 9001 comes from the host URL and README command (apps/repack-poc/README.md:101). Deploy `not observed`.

**4. apps/repack/packages/check-in.** Own build, with container `check-in.container.js.bundle` (apps/repack/packages/check-in/rspack.config.mjs:42-46), and the only case where the snapshot also provides a separately generated production bundle, albeit for measurement and in a temporary folder (scripts/measure-repack.sh:25-33, 41). Shares helper `sharedDeps` with host and dashboard (apps/repack/packages/check-in/rspack.config.mjs:4, 48) and workspace `@mygym/*` packages (apps/repack/packages/check-in/package.json:14-19), which does not change the separate artifact. Served by dev server on 9001 (apps/repack/packages/check-in/package.json:9). Deploy `not observed`: README discusses independent deployment/OTA (README.md:37), but no artifact publishes the container.

**5. apps/repack/packages/dashboard.** Same situation as check-in: own `dashboard.container.js.bundle` container (apps/repack/packages/dashboard/rspack.config.mjs:39-44), isolated production bundle in the measurement script (scripts/measure-repack.sh:42), dev server on 9002 (apps/repack/packages/dashboard/package.json:9). Deploy `not observed`.

**6. apps/repack/packages/host.** Own build; both mini-apps are remotes loaded over the network and do not enter the host bundle (apps/repack/packages/host/rspack.config.mjs:49-52). According to README, this is the installable shell, assembled with `react-native run-ios` (apps/repack/README.md:118), but there is no native project or publication configuration in the snapshot. Port 8081 is only in an `mprocs` comment (apps/repack/mprocs.yaml:2-3) and README (apps/repack/README.md:104); `start` does not fix it (apps/repack/packages/host/package.json:9). Deploy `not observed`.

**7. apps/turborepo/apps/mygym.** Own build through `expo export` (apps/turborepo/apps/mygym/package.json:11), triggered by root with `turbo run build` (apps/turborepo/package.json:5). Features `feature-check-in` and `feature-dashboard` are workspace packages rather than units, and output inside this same bundle (README.md:32); build is therefore `separate` relative to other snapshot applications. Deploy `not observed`. Version `0.0.0` (apps/turborepo/apps/mygym/package.json:3) is unused.

## Summary

Applications: 7. Build (separate: 7). Deploy (not observed: 7). Independent versioning: 0.

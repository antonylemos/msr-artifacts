---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
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

# 185 — Marcel-b-velop/vue-mf

## Repository overview

pnpm workspace with four Vue 3 + Vite applications (pnpm-workspace.yaml:1-5: `lib`, `app-1`, `app-2`, `host`). Each has `package.json` with its own `build`, `vue-tsc -b && vite build` (app-1/package.json:8; app-2/package.json:8; host/package.json:8; lib/package.json:11), and its own `vite.config.ts` with Module Federation plugin, generating one `remoteEntry.js` per application (app-1/vite.config.ts:11-13; app-2/vite.config.ts:11-13; lib/vite.config.ts:17-19). Root `build` only delegates to members (package.json:8, `pnpm -r run build`); each `vite build` generates its directory’s `dist`, ignored by git (.gitignore:2).

The only workflow, "Build UI" (.github/workflows/node.js.yml:1-3), runs on every push, installs workspace and calls root `pnpm build` (.github/workflows/node.js.yml:20-23), then restores, builds and tests .NET solution in `Api/` (.github/workflows/node.js.yml:25-34). This is continuous integration: it neither stores `dist` directories nor publishes them anywhere. No Dockerfile, compose, deployment manifest or hosting configuration is present in snapshot.

Existing means of serving applications are for development. Host sees remotes at fixed `localhost` addresses (host/vite.config.ts:16-18: ports 5174, 5175 and 5177), matching each remote’s `vite preview` (app-1/package.json:10; app-2/package.json:10; lib/package.json:9) or, for app-2, also `server.port` (app-2/vite.config.ts:40). Scripts `dev:all` combine `vite build --watch` and `vite preview` with `concurrently` (app-1/package.json:9-11; app-2/package.json:9-11; lib/package.json:8-10), and README describes this arrangement as how to see lib and app-1 within host (README.md:22). All eight `ops-cors` occurrences are `Access-Control-Allow-Origin: "*"` headers of each application’s development `server` (app-1/vite.config.ts:37-39; app-2/vite.config.ts:41-43; host/vite.config.ts:43-45; lib/vite.config.ts:52-54), not deployment artifacts.

Outside frontend applications: .NET API and IdentityServer in `Api/` are built by same workflow (.github/workflows/node.js.yml:30-34) and have VS Code `build`/`publish` tasks (.vscode/tasks.json:5-27) and launch profiles at `localhost:5282` and `localhost:5283` (Api/Api/Properties/launchSettings.json:9; Api/IdentityServer/Properties/launchSettings.json:9), also for development. The lib `playwright.config.ts` starts `pnpm dev` for e2e tests (lib/playwright.config.ts:11, 21-22), and a Playwright report is versioned in `lib/playwright-report/`, test output rather than build output.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | app-1 | separate | not observed | `http://localhost:5174` in development (app-1/package.json:10; host/vite.config.ts:16) | No | app-1/package.json:8 (`vue-tsc -b && vite build`); app-1/vite.config.ts:7-44 (Vite configuration with federation, generates `remoteEntry.js`); package.json:8 (`pnpm -r run build`); .github/workflows/node.js.yml:20-23 (CI installs and builds workspace, without publication) |
| 2 | app-2 | separate | not observed | `http://localhost:5175` in development (app-2/vite.config.ts:40; app-2/package.json:10; host/vite.config.ts:17) | No | app-2/package.json:8 (`vue-tsc -b && vite build`); app-2/vite.config.ts:7-48 (Vite configuration with federation, generates `remoteEntry.js`); package.json:8 (`pnpm -r run build`); .github/workflows/node.js.yml:20-23 (CI installs and builds workspace, without publication) |
| 3 | host | separate | not observed | — | No | host/package.json:8 (`vue-tsc -b && vite build`); host/vite.config.ts:7-50 (Vite configuration with remotes); package.json:8 (`pnpm -r run build`); .github/workflows/node.js.yml:20-23 (CI installs and builds workspace, without publication) |
| 4 | lib | separate | not observed | `http://localhost:5177` in development (lib/package.json:9; host/vite.config.ts:18) | No | lib/package.json:11 (`vue-tsc -b && vite build`); lib/vite.config.ts:8-59 (Vite configuration with federation, generates `remoteEntry.js`); package.json:8 (`pnpm -r run build`); .github/workflows/node.js.yml:20-23 (CI installs and builds workspace, without publication) |

## Observations

**1. app-1.** Own build, generating app-1 `dist` with `remoteEntry.js` for remote `remote-app1` (app-1/vite.config.ts:12-13); workflow only triggers it through root `pnpm build`, together with others (.github/workflows/node.js.yml:22-23; package.json:8). No artifact publishes this `dist`: address `localhost:5174` used by host (host/vite.config.ts:16) comes from `vite preview --port 5174` (app-1/package.json:10), a local command. Version `0.0.0` (app-1/package.json:4) is unused in publication; package is `private` (app-1/package.json:3).

**2. app-2.** Same arrangement, with remote `remote-app2` (app-2/vite.config.ts:12-13). The only application also fixing port in development `server` (app-2/vite.config.ts:40), matching `preview` (app-2/package.json:10) and address used by host (host/vite.config.ts:17). Unlike others, it has no own `.gitignore`, but root file excludes `dist/` (.gitignore:2). Version `0.0.0` unused in publication (app-2/package.json:4).

**3. host.** Own build, embedding `localhost` URLs of all three remotes (host/vite.config.ts:15-19), so host `dist` only works with remotes served on these local ports. No fixed port: `dev` and `preview` use Vite defaults (host/package.json:7, 10), hence "Where served" remains `—`. The `filename: "remoteEntry.js"` (host/vite.config.ts:13) has no `exposes`. Version `0.0.0` unused in publication (host/package.json:4).

**4. lib.** Own build of remote `remote-lib` (lib/vite.config.ts:18-19), without minification and with sourcemap (lib/vite.config.ts:42-44). Besides build, it has unit and e2e tests (lib/package.json:12-17), the latter against development server (lib/playwright.config.ts:11, 21-22); workflow does not run these tests. Served at `localhost:5177` by `vite preview` (lib/package.json:9), address used by host, app-1 and app-2 (host/vite.config.ts:18; app-1/vite.config.ts:19; app-2/vite.config.ts:22). Version `0.0.0` unused in publication (lib/package.json:4).

## Summary

Applications: 4. Build (separate: 4). Deploy (not observed: 4). Independent versioning: 0.

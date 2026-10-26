---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
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

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Repository overview

pnpm + Turborepo monorepo with four Vue 3 + Vite applications in `apps/*` and a library in `packages/*` (pnpm-workspace.yaml:1-3). Root `build` is `turbo build` (package.json:8), only delegating to each package’s task `build`, with output in `dist/**` (turbo.json:8-11). Each application has its own `build`, `vue-tsc -b && vite build` (apps/cms/package.json:8; apps/dashboard/package.json:8; apps/kanban/package.json:8; apps/shell/package.json:8), and its own `vite.config.ts` with plugin `@originjs/vite-plugin-federation`: all three remotes each generate their own `remoteEntry.js` (apps/cms/vite.config.ts:16-23; apps/dashboard/vite.config.ts:18-25; apps/kanban/vite.config.ts:16-23), and shell declares remotes (apps/shell/vite.config.ts:19-27). The `dist` directories remain outside git (.gitignore:2; apps/*/.gitignore:11).

No CI workflow, Dockerfile, compose, deployment manifest or hosting configuration is present in snapshot. Existing means of serving applications are local. Shell fetches remotes at fixed `localhost` addresses, ports 5001, 5002 and 5003 (apps/shell/vite.config.ts:22-24), ports of each remote’s `server` and `preview` (apps/dashboard/vite.config.ts:8, :14; apps/cms/vite.config.ts:8, :12; apps/kanban/vite.config.ts:8, :12). Remotes have script `serve:prod`, `vite build && vite preview` (apps/cms/package.json:10; apps/dashboard/package.json:10; apps/kanban/package.json:10), and root has `dev:hybrid`, starting shell in mode `dev` and all three remotes with `serve:prod` through `concurrently` (package.json:10). Despite name, `vite preview` is a local server, not publication. README discusses "Independencia de Despliegue" (English translation: "Deployment Independence") (README.mkd:150) and `pnpm build` + `pnpm preview` to "simular el entorno real de producción" (English translation: "simulate the real production environment") (README.mkd:106-111), but root has no script `preview` (package.json:6-11); regardless, documentation does not decide Deploy column. README also lists ports 5173-5176 (README.mkd:99-102), differing from fixed configuration ports.

The only `ops-*` occurrence in `matches.csv` is `ops-cors` at apps/dashboard/vite.config.ts:10 (`cors: true` of development `server`, beside `origin: "http://localhost:5000"` at :11), not a deployment artifact. No `ci-*` or `cfg-public-path` occurrences exist. Library `packages/ui-kit` has no build (only script `lint`) and is not an application; version `1.0.0` of `@repo/ui-kit` (packages/ui-kit/package.json:2-3) is unused in publication.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | apps/cms | separate | not observed | `http://localhost:5002` in development (apps/cms/vite.config.ts:8, :12; apps/shell/vite.config.ts:23) | No | apps/cms/package.json:8 (`vue-tsc -b && vite build`); apps/cms/vite.config.ts:16-23 (federation `cms_app`, generates `remoteEntry.js`); package.json:8 (`turbo build`); turbo.json:8-11 (task `build`, output `dist/**`) |
| 2 | apps/dashboard | separate | not observed | `http://localhost:5001` in development (apps/dashboard/vite.config.ts:8, :14; apps/shell/vite.config.ts:22) | No | apps/dashboard/package.json:8 (`vue-tsc -b && vite build`); apps/dashboard/vite.config.ts:18-25 (federation `dashboard_app`, generates `remoteEntry.js`); package.json:8 (`turbo build`); turbo.json:8-11 (task `build`, output `dist/**`) |
| 3 | apps/kanban | separate | not observed | `http://localhost:5003` in development (apps/kanban/vite.config.ts:8, :12; apps/shell/vite.config.ts:24) | No | apps/kanban/package.json:8 (`vue-tsc -b && vite build`); apps/kanban/vite.config.ts:16-23 (federation `kanban_app`, generates `remoteEntry.js`); package.json:8 (`turbo build`); turbo.json:8-11 (task `build`, output `dist/**`) |
| 4 | apps/shell | separate | not observed | `http://localhost:5000` in development (apps/shell/vite.config.ts:9, :13) | No | apps/shell/package.json:8 (`vue-tsc -b && vite build`); apps/shell/vite.config.ts:19-27 (federation `shell` with all three remotes); package.json:8 (`turbo build`); turbo.json:8-11 (task `build`, output `dist/**`) |

## Observations

**1. apps/cms.** Own build, generating cms `dist` with `remoteEntry.js` for remote `cms_app` (apps/cms/vite.config.ts:17-18); root `turbo build` triggers this build with others, but each outputs to own `dist` (turbo.json:10). No artifact publishes this `dist`: address `localhost:5002` used by shell (apps/shell/vite.config.ts:23) belongs to local `vite preview` (apps/cms/vite.config.ts:11-14), triggered by `serve:prod` (apps/cms/package.json:10). Version `0.0.0` is unused in publication, and package is `private` (apps/cms/package.json:3-4).

**2. apps/dashboard.** Same arrangement, with remote `dashboard_app` (apps/dashboard/vite.config.ts:19-20). The only remote whose development `server` enables `cors` and fixes `origin` at shell address (apps/dashboard/vite.config.ts:10-11), the `ops-cors` occurrence in `matches.csv`; applies to development server, not deploy. Port 5001 in `server` and `preview` (apps/dashboard/vite.config.ts:8, :14), same as used by shell (apps/shell/vite.config.ts:22). Version `0.0.0`, `private`, unused in publication (apps/dashboard/package.json:3-4).

**3. apps/kanban.** Same arrangement as cms, with remote `kanban_app` (apps/kanban/vite.config.ts:17-18), port 5003 in `server` and `preview` (apps/kanban/vite.config.ts:8, :12) and local `serve:prod` (apps/kanban/package.json:10). Version `0.0.0`, `private`, unused in publication (apps/kanban/package.json:3-4).

**4. apps/shell.** Own build, embedding `localhost` URLs of all three remotes (apps/shell/vite.config.ts:22-24): shell `dist` only works with remotes served on these local ports. Port 5000 in `server` and `preview` (apps/shell/vite.config.ts:9, :13). Unlike remotes, has no `serve:prod` (apps/shell/package.json:6-10); in root `dev:hybrid` it runs in mode `dev` (package.json:10). Consumes `@repo/ui-kit` as workspace dependency (apps/shell/package.json:12), entering shell’s own build. Version `0.0.0`, `private`, unused in publication (apps/shell/package.json:3-4).

## Summary

Applications: 4. Build (separate: 4). Deploy (not observed: 4). Independent versioning: 0.

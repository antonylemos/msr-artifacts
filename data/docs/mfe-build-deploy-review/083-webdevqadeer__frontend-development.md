---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
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

# 083 — webdevqadeer/frontend-development

## Repository overview

The snapshot is a single npm workspaces monorepo in `react/mv-marketplace/`, with the `mv-theme` library and five Vite applications: `admin`, `buyer`, `payment`, `seller` and `shell` (react/mv-marketplace/package.json:4-11). Builds are local only, through npm scripts. Root `build` builds the theme first and then each application sequentially, with `npm run build -w <nome>` (react/mv-marketplace/package.json:13-15). Each application has its own `build: vite build` and `preview: vite preview` (for example react/mv-marketplace/apps/admin/package.json:6-11) and its own `vite.config.js` with `@originjs/vite-plugin-federation`. Each application’s `dist` output is ignored by git (react/mv-marketplace/apps/admin/.gitignore:11). For development, `dev:apps` starts all five servers with `concurrently` (react/mv-marketplace/package.json:18).

There are no deployment artifacts: no Dockerfile, compose, CI workflow, hosting configuration or proxy. The `matches.csv` has no `ops-*`, `ci-*` or `cfg-public-path` occurrences. Application READMEs contain the standard React + Vite template text (react/mv-marketplace/apps/admin/README.md:1-3). The snapshot’s only addresses are local machine addresses. Remotes fix the port only in `preview` (5001–5004), and shell fetches each `remoteEntry.js` from `http://localhost:500N/assets/` (react/mv-marketplace/apps/shell/vite.config.js:11-17). Shell fixes port 5173 on the development server (react/mv-marketplace/apps/shell/vite.config.js:21-25). This is a development and demonstration configuration, without publication.

The `mv-theme` library generates an ES/UMD library build in `dist` (react/mv-marketplace/packages/mvp-theme/vite.config.js:7-14). It is `private` and has no publication script (react/mv-marketplace/packages/mvp-theme/package.json:3-12). It is not a frontend application in the structural review, so it has no table row. The snapshot’s `react/mv-marketplace/node_modules/` directory contains only lockfiles copied from applications (for example `node_modules/admin/package-lock.json`), without build or deployment configuration.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | react/mv-marketplace/apps/admin | separate | not observed | `http://localhost:5003` (react/mv-marketplace/apps/admin/vite.config.js:20; react/mv-marketplace/apps/shell/vite.config.js:14) | No | react/mv-marketplace/apps/admin/vite.config.js:5-21 (own configuration, generates `remoteEntry.js`); react/mv-marketplace/apps/admin/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w admin`) |
| 2 | react/mv-marketplace/apps/buyer | separate | not observed | `http://localhost:5001` (react/mv-marketplace/apps/buyer/vite.config.js:20; react/mv-marketplace/apps/shell/vite.config.js:12) | No | react/mv-marketplace/apps/buyer/vite.config.js:5-21 (own configuration, generates `remoteEntry.js`); react/mv-marketplace/apps/buyer/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w buyer`) |
| 3 | react/mv-marketplace/apps/payment | separate | not observed | `http://localhost:5004` (react/mv-marketplace/apps/payment/vite.config.js:18; react/mv-marketplace/apps/shell/vite.config.js:15) | No | react/mv-marketplace/apps/payment/vite.config.js:5-19 (own configuration, generates `remoteEntry.js`); react/mv-marketplace/apps/payment/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w payment`) |
| 4 | react/mv-marketplace/apps/seller | separate | not observed | `http://localhost:5002` (react/mv-marketplace/apps/seller/vite.config.js:18; react/mv-marketplace/apps/shell/vite.config.js:13) | No | react/mv-marketplace/apps/seller/vite.config.js:5-19 (own configuration, generates `remoteEntry.js`); react/mv-marketplace/apps/seller/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w seller`) |
| 5 | react/mv-marketplace/apps/shell | separate | not observed | `http://localhost:5173` (react/mv-marketplace/apps/shell/vite.config.js:21-25) | No | react/mv-marketplace/apps/shell/vite.config.js:6-35 (own configuration, output `dist`); react/mv-marketplace/apps/shell/package.json:8 (`vite build`); react/mv-marketplace/package.json:15 (`npm run build -w shell`) |

## Observations

**1. react/mv-marketplace/apps/admin.** Own build: the application’s `vite build` (react/mv-marketplace/apps/admin/package.json:8) uses its configuration, which generates `remoteEntry.js` for remote `admin_app` (react/mv-marketplace/apps/admin/vite.config.js:9-13). Root script only triggers this build (react/mv-marketplace/package.json:15). Deploy is `not observed`: the only address is port 5003 of `vite preview` (react/mv-marketplace/apps/admin/vite.config.js:20), used by shell (react/mv-marketplace/apps/shell/vite.config.js:14). Version `0.0.0` of a `private` package (react/mv-marketplace/apps/admin/package.json:3-4) is unused in publication.

**2. react/mv-marketplace/apps/buyer.** Same arrangement as admin, with remote `buyer_app` (react/mv-marketplace/apps/buyer/vite.config.js:9-13) and preview port 5001 (react/mv-marketplace/apps/buyer/vite.config.js:20). Build `separate`, deploy `not observed`, version `0.0.0` unused (react/mv-marketplace/apps/buyer/package.json:3-4).

**3. react/mv-marketplace/apps/payment.** Same arrangement, with remote declared as `payment-app` (react/mv-marketplace/apps/payment/vite.config.js:9-11) and preview port 5004 (react/mv-marketplace/apps/payment/vite.config.js:18). The difference between this name and shell’s `payment_app` key is already in the composition review and changes neither build nor deploy. Version `0.0.0` unused (react/mv-marketplace/apps/payment/package.json:3-4).

**4. react/mv-marketplace/apps/seller.** Same arrangement, with remote `seller_app` (react/mv-marketplace/apps/seller/vite.config.js:9-11) and preview port 5002 (react/mv-marketplace/apps/seller/vite.config.js:18). Build `separate`, deploy `not observed`, version `0.0.0` unused (react/mv-marketplace/apps/seller/package.json:3-4).

**5. react/mv-marketplace/apps/shell.** Own build configuration, with `dist` output (react/mv-marketplace/apps/shell/vite.config.js:26-29), and own `vite build` (react/mv-marketplace/apps/shell/package.json:8). The artifact would contain only shell, because remotes enter by URL at runtime (react/mv-marketplace/apps/shell/vite.config.js:11-17), hence Build `separate`. One caveat remains: the entry imports `./App.jsx` (react/mv-marketplace/apps/shell/src/main.jsx:3), and the snapshot contains only `src/app.jsx`. On a case-sensitive filesystem, this build cannot resolve the entry. This explains `Undetermined` in the structural review, but does not change that the build is separate from other applications. The only address is development server port 5173 (react/mv-marketplace/apps/shell/vite.config.js:21-25). Shell does not fix a preview port, and nothing publishes it. Deploy `not observed`, version `0.0.0` unused (react/mv-marketplace/apps/shell/package.json:3-4).

## Summary

Applications: 5. Build (separate: 5). Deploy (not observed: 5). Independent versioning: 0.

---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Workspace

`package.json:4-6` (`workspaces` with `packages/*`), with `lerna.json:1-4` (only `$schema` and `version`, no package list of its own).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-14 (workspace root manifest) | — | — (package.json:8 `lerna run dev` only orchestrates members; no `build` script) | — | — (.github/workflows/main_vdumpavue3.yml:26-33 and 61-73 compress and publish the entire repository to an Azure Web App, without a root UI build) | No | Workspace coordination root, with neither UI entry nor build of its own. |
| packages/app-1 | packages/app-1/package.json;packages/app-1/vite.config.js | packages/app-1/package.json:1-19 | packages/app-1/index.html:11 (`/src/main.js`); packages/app-1/src/main.js:5 (mounts the Vue UI) | packages/app-1/vite.config.js:6-21 (own configuration, port 5011); packages/app-1/package.json:8 (`vite build`) | package.json:5 (`packages/*`) | — | Yes | Vue/Vite application with its own entry and build. |
| packages/app-2 | packages/app-2/package.json;packages/app-2/vite.config.js | packages/app-2/package.json:1-19 | packages/app-2/index.html:11 (`/src/main.js`); packages/app-2/src/main.js:5 (mounts the Vue UI) | packages/app-2/vite.config.js:6-21 (own configuration, port 5012); packages/app-2/package.json:8 (`vite build`) | package.json:5 (`packages/*`) | — | Yes | Vue/Vite application with its own entry and build. |
| packages/host | packages/host/package.json;packages/host/vite.config.js | packages/host/package.json:1-21 | packages/host/index.html:11 (`/src/main.js`); packages/host/src/main.js:8-17 (creates and mounts the Vue UI) | packages/host/vite.config.js:7-24 (own configuration, port 5010); packages/host/package.json:8 (`vite build`) | package.json:5 (`packages/*`) | — | Yes | Vue/Vite application with its own entry and build. |

## Summary

Frontend applications in the snapshot: 3 (packages/app-1, packages/app-2, packages/host).

## Notes

- N = 3 matches the classification’s `frontend_units: 3`.
- The only workflow (`.github/workflows/main_vdumpavue3.yml`, `ci-workflow-file` in `matches.csv`) runs `npm run build --if-present` at the root, which does not define `build` (`:26-30`), and publishes the zip of the entire repository (`:32-33`, `:72-73`); it neither builds nor publishes any package separately, so no row has deployment.

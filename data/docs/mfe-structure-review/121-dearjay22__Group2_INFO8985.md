---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 121 — dearjay22/Group2_INFO8985

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| frontend/products-mf | frontend/products-mf/package.json | frontend/products-mf/package.json | frontend/products-mf/src/index.js:7-12 (`src/index.*` entry by CRA convention; `ReactDOM.createRoot` renders `App`); frontend/products-mf/public/index.html:31 (`<div id="root">`, CRA HTML template) | frontend/products-mf/package.json:17 (`"build": "react-scripts build"`, without its own configuration file) | — | frontend/products-mf/Dockerfile:1-12 (`npm run build` build and publishing in Nginx); docker-compose.yml:66-69 (`products-mf` service, `build: ./frontend/products-mf`, port `3001:80`) | Yes | CRA application with its own entry, build through `react-scripts` and its own image. |
| frontend/shell-app | frontend/shell-app/package.json | frontend/shell-app/package.json | frontend/shell-app/src/index.js:7-12 (`src/index.*` entry by CRA convention; `ReactDOM.createRoot` renders `App`); frontend/shell-app/public/index.html:31 (`<div id="root">`, CRA HTML template) | frontend/shell-app/package.json:17 (`"build": "react-scripts build"`, without its own configuration file) | — | frontend/shell-app/Dockerfile:1-12 (`npm run build` build and publishing in Nginx); docker-compose.yml:59-62 (`shell-app` service, `build: ./frontend/shell-app`, port `3000:80`) | Yes | CRA application with its own entry, build through `react-scripts` and its own image. |

## Summary

Frontend applications in the snapshot: 2 (frontend/products-mf, frontend/shell-app).

## Notes

- Both `package.json` files have the `workspace-config` marker in `artifacts.csv`, but do not declare `workspaces` (`frontend/shell-app/package.json:1-39`; `frontend/products-mf/package.json:1-39`), and there is no `package.json` at the root, nor `pnpm-workspace.yaml`, `lerna.json`, `turbo.json`, `nx.json`, `rush.json`, `angular.json` or `project.json` in the snapshot. `matches.csv` has no `ws-*` occurrences.
- The only workflow (`.github/workflows/ci.yml:18-19`, `docker compose build`) builds all services together; it is not a separate job for any directory. Separate deployment comes from the Dockerfiles and their own services in Compose.
- The Dockerfiles in `backend/*` and the Compose monitoring services are not frontend and are not in `units.csv`.
- The count (2) matches the classification’s `frontend_units: 2`.

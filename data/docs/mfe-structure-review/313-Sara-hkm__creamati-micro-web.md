---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — | — | — | No | Manifest with only scripts entering `frontend/*` (package.json:8-15) and `concurrently` (package.json:29); with neither entry nor build of its own. |
| frontend/analytics-app | frontend/analytics-app/package.json | frontend/analytics-app/package.json | frontend/analytics-app/src/index.tsx:7-14 (`src/index.*` entry by CRA convention; `ReactDOM.createRoot(...).render(<App />)`); frontend/analytics-app/public/index.html:31 (`<div id="root">`, CRA HTML template) | frontend/analytics-app/package.json:22 (`"build": "react-scripts build"`, without its own configuration file) | — | .github/workflows/deploy-analytics.yml:6-7 and 28-43 (triggered by `frontend/analytics-app/**`; `npm run build` and publishing `frontend/analytics-app/build` to GitHub Pages under `analytics`); .github/workflows/deploy-all.yml:88 and 101-116 (`deploy-micro-frontends` matrix, destination `analytics`) | Yes | CRA application with its own entry and build through `react-scripts`. |
| frontend/container | frontend/container/package.json | frontend/container/package.json | frontend/container/src/index.tsx:7-14 (`src/index.*` entry by CRA convention; `ReactDOM.createRoot(...).render(<App />)`); frontend/container/public/index.html:31 (`<div id="root">`, CRA HTML template) | frontend/container/package.json:22 (`"build": "react-scripts build"`, without its own configuration file) | — | .github/workflows/deploy-container.yml:6-7 and 28-43 (triggered by `frontend/container/**`; `npm run build` and publishing `frontend/container/build` to GitHub Pages under `container`); .github/workflows/deploy-all.yml:49-78 (job `deploy-container`) | Yes | CRA application with its own entry and build through `react-scripts`. |
| frontend/data-grid-app | frontend/data-grid-app/package.json | frontend/data-grid-app/package.json | frontend/data-grid-app/src/index.tsx:7-14 (`src/index.*` entry by CRA convention; `ReactDOM.createRoot(...).render(<App />)`); frontend/data-grid-app/public/index.html:31 (`<div id="root">`, CRA HTML template) | frontend/data-grid-app/package.json:22 (`"build": "react-scripts build"`, without its own configuration file) | — | .github/workflows/deploy-data-grid.yml:6-7 and 28-43 (triggered by `frontend/data-grid-app/**`; `npm run build` and publishing `frontend/data-grid-app/build` to GitHub Pages under `data-grid`); .github/workflows/deploy-all.yml:87 and 101-116 (`deploy-micro-frontends` matrix, destination `data-grid`) | Yes | CRA application with its own entry and build through `react-scripts`. |
| frontend/settings-app | frontend/settings-app/package.json | frontend/settings-app/package.json | frontend/settings-app/src/index.tsx:7-14 (`src/index.*` entry by CRA convention; `ReactDOM.createRoot(...).render(<App />)`); frontend/settings-app/public/index.html:31 (`<div id="root">`, CRA HTML template) | frontend/settings-app/package.json:22 (`"build": "react-scripts build"`, without its own configuration file) | — | .github/workflows/deploy-settings.yml:6-7 and 28-43 (triggered by `frontend/settings-app/**`; `npm run build` and publishing `frontend/settings-app/build` to GitHub Pages under `settings`); .github/workflows/deploy-all.yml:89 and 101-116 (`deploy-micro-frontends` matrix, destination `settings`) | Yes | CRA application with its own entry and build through `react-scripts`. |
| frontend/user-management-app | frontend/user-management-app/package.json | frontend/user-management-app/package.json | frontend/user-management-app/src/index.tsx:7-14 (`src/index.*` entry by CRA convention; `ReactDOM.createRoot(...).render(<App />)`); frontend/user-management-app/public/index.html:31 (`<div id="root">`, CRA HTML template) | frontend/user-management-app/package.json:22 (`"build": "react-scripts build"`, without its own configuration file) | — | .github/workflows/deploy-user-management.yml:6-7 and 28-43 (triggered by `frontend/user-management-app/**`; `npm run build` and publishing `frontend/user-management-app/build` to GitHub Pages under `user-management`); .github/workflows/deploy-all.yml:86 and 101-116 (`deploy-micro-frontends` matrix, destination `user-management`) | Yes | CRA application with its own entry and build through `react-scripts`. |

## Summary

Frontend applications in the snapshot: 5 (frontend/analytics-app, frontend/container, frontend/data-grid-app, frontend/settings-app, frontend/user-management-app).

## Notes

- N = 5 matches the classification’s `frontend_units: 5` (the container and the four micro-frontends).
- The `package.json` files in `frontend/*` appear as `workspace-config` in `artifacts.csv`, but no `package.json` in the snapshot declares `workspaces`, and there are no `ws-*` occurrences in `matches.csv`. The root installs and builds each app with `cd` in scripts (package.json:13-14), and each app has its own `package-lock.json`.
- The four micro-frontends’ `package.json` files are identical to the container’s except for `name`; no app has `webpack.config.*` or another build file besides `react-scripts`.
- `DEPLOYMENT.md` describes deployment to Vercel and Netlify (`ops-hosting` occurrences), but the snapshot workflows publish to GitHub Pages; only the workflows were used as deployment evidence.

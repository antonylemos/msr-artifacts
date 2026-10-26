---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
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

## Workspace

`react/mv-marketplace/package.json:4-11` (`workspaces` with `packages/mvp-theme`, `apps/admin`, `apps/buyer`, `apps/payment`, `apps/seller` and `apps/shell`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| react/mv-marketplace | react/mv-marketplace/package.json | react/mv-marketplace/package.json:1-21 (coordination manifest, only `workspaces` and scripts) | — | — (react/mv-marketplace/package.json:13-15 only delegates `npm run build -w` to workspaces) | — | — | No | npm workspaces orchestration root, with neither UI entry nor application build of its own. |
| react/mv-marketplace/apps/admin | react/mv-marketplace/apps/admin/package.json;react/mv-marketplace/apps/admin/vite.config.js | react/mv-marketplace/apps/admin/package.json:1-28 (own manifest) | react/mv-marketplace/apps/admin/index.html:11 (`/src/main.jsx` entry); react/mv-marketplace/apps/admin/src/main.jsx:1-9 (mounts React with `createRoot`) | react/mv-marketplace/apps/admin/vite.config.js:5-21 (own configuration); react/mv-marketplace/apps/admin/package.json:8 (`vite build`) | react/mv-marketplace/package.json:6 (`apps/admin`) | — | Yes | React application with its own entry and Vite build. |
| react/mv-marketplace/apps/buyer | react/mv-marketplace/apps/buyer/package.json;react/mv-marketplace/apps/buyer/vite.config.js | react/mv-marketplace/apps/buyer/package.json:1-28 (own manifest) | react/mv-marketplace/apps/buyer/index.html:11 (`/src/main.jsx` entry); react/mv-marketplace/apps/buyer/src/main.jsx:1-9 (mounts React with `createRoot`) | react/mv-marketplace/apps/buyer/vite.config.js:5-21 (own configuration); react/mv-marketplace/apps/buyer/package.json:8 (`vite build`) | react/mv-marketplace/package.json:7 (`apps/buyer`) | — | Yes | React application with its own entry and Vite build. |
| react/mv-marketplace/apps/payment | react/mv-marketplace/apps/payment/package.json;react/mv-marketplace/apps/payment/vite.config.js | react/mv-marketplace/apps/payment/package.json:1-28 (own manifest) | react/mv-marketplace/apps/payment/index.html:11 (`/src/main.jsx` entry); react/mv-marketplace/apps/payment/src/main.jsx:1-9 (mounts React with `createRoot`) | react/mv-marketplace/apps/payment/vite.config.js:5-19 (own configuration); react/mv-marketplace/apps/payment/package.json:8 (`vite build`) | react/mv-marketplace/package.json:8 (`apps/payment`) | — | Yes | React application with its own entry and Vite build. |
| react/mv-marketplace/apps/seller | react/mv-marketplace/apps/seller/package.json;react/mv-marketplace/apps/seller/vite.config.js | react/mv-marketplace/apps/seller/package.json:1-28 (own manifest) | react/mv-marketplace/apps/seller/index.html:11 (`/src/main.jsx` entry); react/mv-marketplace/apps/seller/src/main.jsx:1-9 (mounts React with `createRoot`) | react/mv-marketplace/apps/seller/vite.config.js:5-19 (own configuration); react/mv-marketplace/apps/seller/package.json:8 (`vite build`) | react/mv-marketplace/package.json:9 (`apps/seller`) | — | Yes | React application with its own entry and Vite build. |
| react/mv-marketplace/apps/shell | react/mv-marketplace/apps/shell/package.json;react/mv-marketplace/apps/shell/vite.config.js | react/mv-marketplace/apps/shell/package.json:1-29 (own manifest) | react/mv-marketplace/apps/shell/index.html:11 (`/src/main.jsx` entry); react/mv-marketplace/apps/shell/src/main.jsx:3,5-9 (mounts React, but imports `./App.jsx`, missing from the snapshot, which has only `src/app.jsx`) | react/mv-marketplace/apps/shell/vite.config.js:6-35 (own configuration); react/mv-marketplace/apps/shell/package.json:8 (`vite build`) | react/mv-marketplace/package.json:10 (`apps/shell`) | — | Undetermined | Own entry and build, but the entry imports a file missing from the snapshot (`App.jsx` differs from `app.jsx` in case). |
| react/mv-marketplace/packages/mvp-theme | react/mv-marketplace/packages/mvp-theme/package.json;react/mv-marketplace/packages/mvp-theme/vite.config.js | react/mv-marketplace/packages/mvp-theme/package.json:1-27 (own manifest, `mv-theme`) | — (react/mv-marketplace/packages/mvp-theme/vite.config.js:8-13 only declares library entry `src/index.js`, which re-exports a Button in src/index.js:1; no `index.html`) | react/mv-marketplace/packages/mvp-theme/vite.config.js:7-24 (ES/UMD library build); react/mv-marketplace/packages/mvp-theme/package.json:10 (`vite build`) | react/mv-marketplace/package.json:5 (`packages/mvp-theme`) | — | No | Shared component library, with no application entry. |

## Summary

Frontend applications in the snapshot: 4 (react/mv-marketplace/apps/admin, react/mv-marketplace/apps/buyer, react/mv-marketplace/apps/payment, react/mv-marketplace/apps/seller).

## Notes

- The classification records `frontend_units: 5` (shell and four remotes). This review counts four Yes rows; `react/mv-marketplace/apps/shell` was Undetermined under the contradictory artifacts rule. The shell’s `index.html` and build exist, but `src/main.jsx:3` imports `./App.jsx`, and the snapshot has only `src/app.jsx`. On a case-sensitive filesystem, the entry does not resolve. The classification already records this discrepancy as a portability defect (likely built on Windows) and was not changed. Undetermined applies only to building the shell on its own; composition is addressed by the composition relationships review (protocol section 3.4.5).
- No directory has a Dockerfile, hosting configuration or CI workflow in the snapshot; `matches.csv` has only the `ws-workspaces` occurrence in `react/mv-marketplace/package.json:4`. The Deploy column remains `—` in all rows.
- The remote `package` (`localhost:5005`), declared in `react/mv-marketplace/apps/shell/vite.config.js:16` and in the remotes, does not correspond to any directory serving `remoteEntry.js`; `packages/mvp-theme` does not configure federation. No unit is missing from `units.csv`.

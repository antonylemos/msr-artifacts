---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 136 — swtbhsmn/micro-frontend-demo

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| app1 | app1/package.json;app1/webpack.config.js | app1/package.json:1-21 (own package `app1`) | app1/webpack.config.js:6 (`entry: "./src/index.js"`); app1/src/index.js:1 (`import('./bootstrap')`); app1/src/bootstrap.js:5-6 (mounts React at `#root`); app1/webpack.config.js:35-37 (template `./public/index.html`) | app1/webpack.config.js:5-40 (own configuration, port 3001); app1/package.json:6 (`webpack serve --mode development --port 3001`) | — | — | Yes | React application with its own entry and webpack configuration, served independently. |
| app2 | app2/package.json;app2/webpack.config.js | app2/package.json:1-21 (own package `app2`) | app2/webpack.config.js:6 (`entry: "./src/index.js"`); app2/src/index.js:1 (`import('./bootstrap')`); app2/src/bootstrap.js:5-6 (mounts React at `#root`); app2/webpack.config.js:36-38 (template `./public/index.html`) | app2/webpack.config.js:5-41 (own configuration, port 3002); app2/package.json:6 (`webpack serve --mode development --port 3002`) | — | — | Yes | React application with its own entry and webpack configuration, served independently. |

## Summary

Frontend applications in the snapshot: 2 (app1, app2).

## Notes

- `artifacts.csv` marks both `package.json` files as `workspace-config`, but neither has a `workspaces` field (app1/package.json:1-21; app2/package.json:1-21), `matches.csv` has no `ws-*` occurrence, and there is no root manifest or other workspace file in the snapshot.
- Both `package.json` files have only the `start` script (`webpack serve` in development mode); there is no `build` script or production configuration. The build is the webpack configuration itself invoked by this script.
- There is no Dockerfile, CI or hosting configuration in the snapshot, and `matches.csv` has no `ops-*` or `ci-*` occurrences.
- The count of 2 matches the classification’s `frontend_units: 2`.

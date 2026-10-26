---
schema: 1
id: 1136702019
full_name: santhoshreddy500939/webpackconfig
commit: e1f97e37c21a6893a8dbf8cd6ea7a7f8c4a9058a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 271 — santhoshreddy500939/webpackconfig

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;webpack.common.config.js;webpack.dev.config.js;webpack.prod.config.js | package.json | webpack.common.config.js:7 (`entry:"./index.js"`); index.js:19-20 (`createRoot(...).render(<App/>)`); webpack.common.config.js:37-39 (`HtmlWebpackPlugin` with `template:"index.html"`) | webpack.dev.config.js:5 (`merge(common, …)`) + package.json:9 (`build:dev`: `webpack serve --config webpack.dev.config.js`); webpack.prod.config.js:4-34 + package.json:8 (`build`: `webpack --config webpack.prod.config.js`) | — | — | Yes | The snapshot’s only React application (the host), with its own entry and webpack build |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 2`: the host `.` and the remote `RemoteApp` (`webpack.common.config.js:34`, `RemoteApp@http://localhost:9001/remoteappbuild.js`), which is outside the snapshot.
- `package.json` appears as `workspace-config` in `artifacts.csv`, but has no `workspaces` field (`package.json:1-34`); there is no other workspace declaration.
- `webpack.prod.config.js:4-34` neither declares `entry` nor performs `merge` with the common configuration; the `./index.js` entry is declared only in `webpack.common.config.js:7`, used by the development build. The production build depends on webpack’s default `entry` (`./src`), missing from the snapshot. This does not change the result: the development build already provides its own entry and build.
- No `ops-*` or `ci-*` occurrence in `matches.csv` and no Dockerfile, workflow or hosting configuration in the snapshot.

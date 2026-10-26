---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 228 — Christian-Encalada/examen-microfrontend

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | index.html;module-federation.config.ts;package.json;rspack.config.ts | package.json | rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); rspack.config.ts:78-80 (`HtmlRspackPlugin` with `template: "./index.html"`); src/App.tsx:72-74 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | rspack.config.ts:15-92 + package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`) | — | — | Yes | React application (host) with its own entry and Rspack build. |
| alert-dashboard | alert-dashboard/index.html;alert-dashboard/module-federation.config.ts;alert-dashboard/package.json;alert-dashboard/rspack.config.ts | alert-dashboard/package.json | alert-dashboard/rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); alert-dashboard/rspack.config.ts:78-80 (`HtmlRspackPlugin` with `template: "./index.html"`); alert-dashboard/src/App.tsx:8-10 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | alert-dashboard/rspack.config.ts:15-92 + alert-dashboard/package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`) | — | — | Yes | React application with its own entry and Rspack build. |
| alert-sender | alert-sender/index.html;alert-sender/module-federation.config.ts;alert-sender/package.json;alert-sender/rspack.config.ts | alert-sender/package.json | alert-sender/rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); alert-sender/rspack.config.ts:78-80 (`HtmlRspackPlugin` with `template: "./index.html"`); alert-sender/src/App.tsx:8-10 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | alert-sender/rspack.config.ts:15-92 + alert-sender/package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`) | — | — | Yes | React application with its own entry and Rspack build. |

## Summary

Frontend applications in the snapshot: 3 (., alert-dashboard, alert-sender).

## Notes

- N matches the classification’s `frontend_units: 3`: the root host and the remotes `alert-dashboard` and `alert-sender`, all in the snapshot.
- The `package.json` and `tsconfig.json` files appear as `workspace-config` in `artifacts.csv`, but no `package.json` declares `workspaces` (package.json:1-32, alert-sender/package.json:1-32, alert-dashboard/package.json:1-32). The only `ws-*` occurrences in `matches.csv` are `ws-path-alias` in `tsconfig.json:15`, `alert-sender/tsconfig.json:15` and `alert-dashboard/tsconfig.json:15`, pointing `"*"` to `./@mf-types/*` (tsconfig.json:15-17), not a workspace declaration. There are no `ops-*` or `ci-*` occurrences.
- The remotes are inside the host directory, but are not part of it: the root build starts only from `./src/index.ts` (rspack.config.ts:17-19) and each remote has its own `package.json`, lockfile, `rspack.config.ts` and port (rspack.config.ts:25, alert-sender/rspack.config.ts:25, alert-dashboard/rspack.config.ts:25: 3000/3001/3002), with no deployment artifact in the snapshot.

---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 164 — horoshopodumaj/micro-frontends

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| host | host/index.html;host/module-federation.config.ts;host/package.json;host/rspack.config.ts | host/package.json | host/rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); host/rspack.config.ts:78-80 (`HtmlRspackPlugin` with `template: "./index.html"`); host/src/App.tsx:24-25 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | host/rspack.config.ts:15-92 + host/package.json:5 (`"build": "NODE_ENV=production rspack build"`) | — | — | Yes | React application with its own entry and Rspack build. |
| remote | remote/index.html;remote/module-federation.config.ts;remote/package.json;remote/rspack.config.ts | remote/package.json | remote/rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); remote/rspack.config.ts:78-80 (`HtmlRspackPlugin` with `template: "./index.html"`); remote/src/App.tsx:13-14 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | remote/rspack.config.ts:15-92 + remote/package.json:5 (`"build": "NODE_ENV=production rspack build"`) | — | — | Yes | React application with its own entry and Rspack build. |
| vue-remote | vue-remote/index.html;vue-remote/module-federation.config.ts;vue-remote/package.json;vue-remote/rspack.config.ts | vue-remote/package.json | vue-remote/rspack.config.ts:16-18 (`entry: { main: "./src/index.ts" }`); vue-remote/rspack.config.ts:79-81 (`HtmlRspackPlugin` with `template: "./index.html"`); vue-remote/src/bootloader.ts:8 (`createApp(App).mount("#app")`) | vue-remote/rspack.config.ts:14-92 + vue-remote/package.json:5 (`"build": "NODE_ENV=production rspack build"`) | — | — | Yes | Vue application with its own entry and Rspack build. |

## Summary

Frontend applications in the snapshot: 3 (host, remote, vue-remote).

## Notes

- N matches the classification’s `frontend_units: 3`: host, remote and vue-remote, all in the snapshot.
- The `package.json` and `tsconfig.json` files appear as `workspace-config` in `artifacts.csv`, but no `package.json` declares `workspaces` (host/package.json:1-29, remote/package.json:1-29, vue-remote/package.json:1-28); there is no root manifest. The only `ws-*` occurrences in `matches.csv` are `ws-path-alias` in `*/tsconfig.json:15`, pointing `"*"` to `./@mf-types/*` (host/tsconfig.json:15-17), not a workspace declaration. There are no `ops-*` or `ci-*` occurrences.
- Each project has its own lockfile (`package-lock.json`) and development port (host/rspack.config.ts:25, remote/rspack.config.ts:25, vue-remote/rspack.config.ts:24: 3000/3001/3002), with no deployment artifact in the snapshot.

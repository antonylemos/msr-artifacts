---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 327 — samhoooo/module-federation-demo-mf2

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| header-app | header-app/package.json;header-app/rspack.config.js | header-app/package.json | header-app/rspack.config.js:7 (`entry: "./src/entry.ts"`, which loads header-app/src/index.tsx:11-16 with `createRoot(...).render(<App … />)`); header-app/rspack.config.js:54-56 (`HtmlRspackPlugin` with `template: "./public/index.html"`) | header-app/rspack.config.js:6-81 (Rspack configuration, port 4001 at :10); header-app/package.json:11 (`rspack build`) | — | — | Yes | Remote `HeaderApp` with its own React entry and Rspack build |
| home-app | home-app/package.json;home-app/rspack.config.js | home-app/package.json | home-app/rspack.config.js:6 (`entry: "./src/entry.ts"`, which loads home-app/src/index.tsx:11-16 with `createRoot(...).render(<App />)`); home-app/rspack.config.js:43-45 (`HtmlRspackPlugin` with `template: "./public/index.html"`) | home-app/rspack.config.js:5-72 (Rspack configuration, port 4000 at :9); home-app/package.json:11 (`rspack build`) | — | — | Yes | Host `HomeApp` with its own React entry and Rspack build |

## Summary

Frontend applications in the snapshot: 2 (header-app, home-app).

## Notes

- N = 2 matches the classification’s `frontend_units: 2`.
- `artifacts.csv` marks both apps’ `package.json` and `tsconfig.json` as `workspace-config`, but neither declares a workspace (no `workspaces`); the root has no `package.json`, and the root `package-lock.json` has only `packages: {}`.
- `matches.csv` has no `ci-*` occurrences; it has 1 `ws-path-alias` (`paths` in `home-app/tsconfig.json`, line 15) and 1 `ops-cors` (`header-app/rspack.config.js`, line 12). There is no Dockerfile, workflow or hosting configuration in the snapshot.

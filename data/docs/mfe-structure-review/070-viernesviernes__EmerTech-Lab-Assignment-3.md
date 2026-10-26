---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| client | client/package.json | client/package.json:1-16 (coordination manifest) | — | — | — | — | No | Directory coordinating application commands; has no UI entry or build of its own. |
| client/auth-app | client/auth-app/package.json;client/auth-app/vite.config.js | client/auth-app/package.json:1-12 (own manifest) | client/auth-app/index.html:10-11 (main.jsx entry); client/auth-app/src/main.jsx:7-11 (mounts React) | client/auth-app/vite.config.js:21-26 (own configuration); client/auth-app/package.json:8 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| client/community-app | client/community-app/package.json;client/community-app/vite.config.js | client/community-app/package.json:1-12 (own manifest) | client/community-app/index.html:10-11 (main.jsx entry); client/community-app/src/main.jsx:6-10 (mounts React) | client/community-app/vite.config.js:21-26 (own configuration); client/community-app/package.json:8 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| client/shell-app | client/shell-app/package.json;client/shell-app/vite.config.js | client/shell-app/package.json:1-12 (own manifest) | client/shell-app/index.html:10-11 (main.jsx entry); client/shell-app/src/main.jsx:16-24 (mounts React) | client/shell-app/vite.config.js:18-23 (own configuration); client/shell-app/package.json:8 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| server | server/package.json | server/package.json:1-20 (services package) | server/package.json:15-19 (starts services and gateway); server/gateway.js:85-108 (GraphQL/HTTP server, no UI) | — | — | — | No | GraphQL backend and HTTP gateway, with no frontend application entry. |

## Summary

Frontend applications in the snapshot: 3 (client/auth-app, client/community-app, client/shell-app).

## Notes

- client/package.json:11 coordinates processes through --prefix; this does not declare a workspace.
- The remotes’ deploy scripts in client/auth-app/package.json:11 and client/community-app/package.json:11 only run local build and preview. There is no hosting artifact or workflow to record in Deploy.
- The index.html pages of the three applications are in the snapshot and were opened, although they do not appear as markers in units.csv. The markers were preserved exactly as in the CSV.

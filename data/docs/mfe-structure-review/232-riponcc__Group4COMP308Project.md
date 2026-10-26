---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| client/issue-app | client/issue-app/package.json;client/issue-app/vite.config.js | client/issue-app/package.json:1-34 (own manifest) | client/issue-app/index.html:10-11 (`/src/main.jsx` entry); client/issue-app/src/main.jsx:6-10 (mounts React) | client/issue-app/vite.config.js:6-35 (own configuration); client/issue-app/package.json:8 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| client/shell-app | client/shell-app/package.json;client/shell-app/vite.config.js | client/shell-app/package.json:1-28 (own manifest) | client/shell-app/index.html:10-11 (`/src/main.jsx` entry); client/shell-app/src/main.jsx:27-33 (mounts React with ApolloProvider) | client/shell-app/vite.config.js:32-56 (own configuration); client/shell-app/package.json:8 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| client/user-app | client/user-app/package.json;client/user-app/vite.config.js | client/user-app/package.json:1-32 (own manifest) | client/user-app/index.html:10-11 (`/src/main.jsx` entry); client/user-app/src/main.jsx:6-10 (mounts React) | client/user-app/vite.config.js:7-26 (own configuration); client/user-app/package.json:8 (`vite build`) | — | — | Yes | React application with its own entry and Vite build. |
| server | server/package.json | server/package.json:1-13 (manifest without dependencies) | — (server/package.json:5 declares `main: index.js`, missing from the snapshot) | — | — | — | No | Not frontend; manifest only, with neither entry nor build. |
| server/microservices/analytics-ai-service | server/microservices/analytics-ai-service/package.json | server/microservices/analytics-ai-service/package.json:1-20 (Node package) | server/microservices/analytics-ai-service/package.json:7 (`node analytics-ai-microservice.js`); server/microservices/analytics-ai-service/analytics-ai-microservice.js:40 (`app.listen`, no UI) | — | — | — | No | Backend service, not frontend. |
| server/microservices/auth-service | server/microservices/auth-service/package.json | server/microservices/auth-service/package.json:1-20 (Node package) | server/microservices/auth-service/package.json:7 (`node auth-microservice.js`); server/microservices/auth-service/auth-microservice.js:244 (`app.listen`, no UI) | — | — | — | No | GraphQL backend service, not frontend. |
| server/microservices/issue-management-service | server/microservices/issue-management-service/package.json | server/microservices/issue-management-service/package.json:1-20 (Node package) | server/microservices/issue-management-service/package.json:7 (`node issue-microservice.js`); server/microservices/issue-management-service/issue-microservice.js:147 (`httpServer.listen`, no UI) | — | — | — | No | GraphQL backend service, not frontend. |

## Summary

Frontend applications in the snapshot: 3 (client/issue-app, client/shell-app, client/user-app).

## Notes

- The `package.json` files appear as `workspace-config` in `artifacts.csv`, but none declares `workspaces`, and the snapshot has no `pnpm-workspace.yaml`, `lerna.json`, `turbo.json` or `nx.json`. `matches.csv` has no `ws-*`, `ops-*` or `ci-*` occurrences.
- The snapshot has no Dockerfile, CI workflow or hosting configuration; the `deploy` scripts in `client/issue-app/package.json:11` and `client/user-app/package.json:11` only run `vite build` and `vite preview` locally.
- N = 3 matches the classification’s `frontend_units: 3`.

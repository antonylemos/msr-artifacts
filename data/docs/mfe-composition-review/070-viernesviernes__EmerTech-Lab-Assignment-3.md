---
schema: 1
id: 1183615585
full_name: viernesviernes/EmerTech-Lab-Assignment-3
commit: 98845d1a3f9c1b41df04512b4472ee2d21085b6b
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 070 — viernesviernes/EmerTech-Lab-Assignment-3

## Repository overview

An academic project with three React/Vite applications joined by Module Federation (`@originjs/vite-plugin-federation`) and a GraphQL backend. `shell-app` routes `/login` to `auth-app` and `/community` to `community-app` (client/shell-app/src/App.jsx:43-47). All three share `react`, `react-dom`, `@apollo/client` and `graphql` (e.g.: client/shell-app/vite.config.js:15).

Besides loading, there is explicit communication: after login, auth-app fires the `loginSuccess` event on `window` (client/auth-app/src/subcomponents/Login.jsx:37), and the shell listens to update its state (client/shell-app/src/App.jsx:23-28). Distinctive feature: immediately after the event, auth-app reloads the page with `window.location.href = '/'` (client/auth-app/src/subcomponents/Login.jsx:38). The event's effect is therefore brief, and login state comes to depend on the shell's session query to the backend (client/shell-app/src/App.jsx:19-21). In practice, the channel between frontends coexists with a channel through the backend.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | client/shell-app | client/auth-app | host → remote | source → target | module-federation | Yes | Yes | client/shell-app/vite.config.js:9-12 (remote `authApp` at `http://localhost:3001/assets/remoteEntry.js`); client/auth-app/vite.config.js:9-14 (`name: 'authApp'`, `filename: 'remoteEntry.js'`, exposes `./App`); client/auth-app/vite.config.js:28, 31 (port 3001) | client/shell-app/src/App.jsx:5; client/shell-app/src/App.jsx:43; client/shell-app/src/App.jsx:45 |
| 2 | client/shell-app | client/community-app | host → remote | source → target | module-federation | Yes | Yes | client/shell-app/vite.config.js:9-11, 13 (remote `communityApp` at `http://localhost:3002/assets/remoteEntry.js`); client/community-app/vite.config.js:9-14 (`name: 'communityApp'`, `filename: 'remoteEntry.js'`, exposes `./App`); client/community-app/vite.config.js:28, 31 (port 3002) | client/shell-app/src/App.jsx:6; client/shell-app/src/App.jsx:43; client/shell-app/src/App.jsx:46 |
| 3 | client/auth-app | client/shell-app | communication | source → target | events | Yes | Yes | — | client/auth-app/src/subcomponents/Login.jsx:37; client/shell-app/src/App.jsx:28 |

## Observations

**1. client/shell-app → client/auth-app.** The shell imports `authApp/App` (client/shell-app/src/App.jsx:5) and renders it at `/login` (client/shell-app/src/App.jsx:45). The name `authApp` and module `./App` match client/auth-app/vite.config.js:10-13; port 3001 only corroborates.

**2. client/shell-app → client/community-app.** The same pattern with `communityApp/App` at `/community` (client/shell-app/src/App.jsx:6, 46). The name and module match client/community-app/vite.config.js:10-13; port 3002 only corroborates.

**3. client/auth-app → client/shell-app.** Auth-app emits `loginSuccess` with `isLoggedIn` (client/auth-app/src/subcomponents/Login.jsx:37), and the shell listens and removes the listener during cleanup (client/shell-app/src/App.jsx:28, 35). There is no sending in the reverse direction. See the overview on reloading immediately after the event.

## Summary

Relationships: 3 (host → remote: 2, communication: 1). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
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
  date: 2026-10-24
---

# 232 — riponcc/Group4COMP308Project

## Repository overview

A group course project (COMP308) with three React/Vite applications joined by Module Federation (`@originjs/vite-plugin-federation`) and GraphQL microservices in `server/`. `client/shell-app` is the host: it declares remotes `userApp` and `issueApp` (client/shell-app/vite.config.js:39-42) and loads each one's `./App` with `lazy(() => import(...))` (client/shell-app/src/App.jsx:10-11). All three share `react`, `react-dom`, `@apollo/client` and `graphql` (client/shell-app/vite.config.js:44-49).

There is no routing between units: the shell switches what it shows through state `isLoggedIn`. Without login, it renders user-app (login and registration screen); with login, it renders issue-app and passes the user as a prop (client/shell-app/src/App.jsx:64, 67). This switching is driven by `window` events: user-app fires `loginSuccess` on login and `logout` on exit (client/user-app/src/UserComponent.jsx:56, 74), issue-app fires `logout` through its header (client/issue-app/src/components/Header.jsx:39), and the shell listens to both events (client/shell-app/src/App.jsx:42-43). The shell never sends events to units; handlers also repeat the `CurrentUser` backend query (client/shell-app/src/App.jsx:31-40), so login state depends on both the event and server session.

Details: `client/shell-app/vite.config.js:1-26` retains an earlier configuration version, entirely commented out, with only `userApp`; the active configuration is at :28-56. Units also read `token` and `user` from `localStorage` (for example client/issue-app/src/components/Header.jsx:26), but nobody listens for `storage`, and this did not become a relationship. User-app does not fix a port in `vite.config.js`; port 3001 expected by the shell comes from scripts (client/user-app/package.json:7, 10).

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | client/shell-app | client/user-app | host → remote | source → target | module-federation | Yes | Yes | client/shell-app/vite.config.js:39-40 (remote `userApp` at `http://localhost:3001/assets/remoteEntry.js`); client/user-app/vite.config.js:11-15 (`name: 'userApp'`, `filename: 'remoteEntry.js'`, exposes `./App`); client/user-app/package.json:7, 10 (port 3001) | client/shell-app/src/App.jsx:10; client/shell-app/src/App.jsx:64 |
| 2 | client/shell-app | client/issue-app | host → remote | source → target | module-federation | Yes | Yes | client/shell-app/vite.config.js:39, 41 (remote `issueApp` at `http://localhost:3002/assets/remoteEntry.js`); client/issue-app/vite.config.js:15-19 (`name: 'issueApp'`, `filename: 'remoteEntry.js'`, exposes `./App`); client/issue-app/vite.config.js:8 (port 3002) | client/shell-app/src/App.jsx:11; client/shell-app/src/App.jsx:67 |
| 3 | client/issue-app | client/shell-app | communication | source → target | events | Yes | Yes | — | client/issue-app/src/components/Header.jsx:39 |
| 4 | client/user-app | client/shell-app | communication | source → target | events | Yes | Yes | — | client/shell-app/src/App.jsx:42; client/user-app/src/UserComponent.jsx:56; client/user-app/src/UserComponent.jsx:74 |

## Observations

**1. client/shell-app → client/user-app.** The shell imports `userApp/App` (client/shell-app/src/App.jsx:10) and renders it inside `Suspense` while not logged in (client/shell-app/src/App.jsx:61-64). The name `userApp` and module `./App` match client/user-app/vite.config.js:11-14; script port 3001 (client/user-app/package.json:7, 10) only corroborates.

**2. client/shell-app → client/issue-app.** The same pattern with `issueApp/App` (client/shell-app/src/App.jsx:11), rendered after login with `currentUser` from the shell query (client/shell-app/src/App.jsx:14-20, 67). The name and module match client/issue-app/vite.config.js:15-18; port 3002 (client/issue-app/vite.config.js:8) only corroborates.

**3. client/issue-app → client/shell-app.** The issue-app header's `handleLogout` performs the logout mutation, clears `localStorage` and fires `logout` without `detail` (client/issue-app/src/components/Header.jsx:32-39). The shell listens to `logout` in client/shell-app/src/App.jsx:43, a point not recorded as its own source code review row, and returns to showing user-app. Header enters the exposed App in client/issue-app/src/App.jsx:21, 105. There is no sending in the reverse direction.

**4. client/user-app → client/shell-app.** User-app fires `loginSuccess` with `isLoggedIn: true` upon completing login (client/user-app/src/UserComponent.jsx:50-56) and `logout` with `isLoggedIn: false` upon completing the logout mutation (client/user-app/src/UserComponent.jsx:70-74). The shell listens to `loginSuccess` in client/shell-app/src/App.jsx:42 and `logout` at :43, removing both listeners at :51-52. The `loginSuccess` handler ignores `detail`, only setting `isLoggedIn` and repeating the query (client/shell-app/src/App.jsx:31-34). There is no sending in the reverse direction.

## Summary

Relationships: 4 (host → remote: 2, communication: 2). Active: 4. Target outside the snapshot: 0.
Units without a relationship: none.


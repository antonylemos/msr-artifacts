---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
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

# 211 — varshinir07/mfe-onehub-shell-app

## Repository overview

The repository contains only a Module Federation host, a React project created with Create React App and moved to its own Webpack 5 configuration (src/webpack.config.js:1-102). The host declares itself as `onehub` and exposes nothing; it consumes two remotes outside the snapshot, declared with local keys differing from their container names: `remote1` → `subscription@http://localhost:3001/remoteEntry.js` and `remote2` → `ownership@http://localhost:3002/remoteEntry.js` (src/webpack.config.js:72-78). `react` and `react-dom` are shared as singletons and `eager` (src/webpack.config.js:79-91), and the entry point renders App directly, without asynchronous bootstrap (src/index.js:7-12).

All composition resides in a single screen: `src/pages/Dashboard.jsx` loads through `React.lazy` three modules from `subscription` (`ModemAuthorization`, `SecurityPackage`, `Card`) and two from `ownership` (`LabourHourHold`, `MobileService`) (src/pages/Dashboard.jsx:3-9), rendering them side by side under a single `React.Suspense` (src/pages/Dashboard.jsx:15-26); only `Card` receives host props (src/pages/Dashboard.jsx:22-25). Dashboard is mounted by App (src/App.js:3, 8). There is no routing, inter-unit communication or loading-failure handling beyond the "Loading..." fallback.

It is an example: fixed `localhost` URLs, no deployment, with the standard CRA README. The README header calls the project "MFE Remote App for OnehubShell" (README.md:1-2), differing from the code, where it is the host. The remotes are absent from the snapshot and are not located through any reference beyond the local URL.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | subscription | host → remote | source → target | module-federation | No | Yes | src/webpack.config.js:76 (`remote1: 'subscription@http://localhost:3001/remoteEntry.js'`) | src/pages/Dashboard.jsx:3; src/pages/Dashboard.jsx:4; src/pages/Dashboard.jsx:9; src/pages/Dashboard.jsx:16; src/pages/Dashboard.jsx:17; src/pages/Dashboard.jsx:22 |
| 2 | . | ownership | host → remote | source → target | module-federation | No | Yes | src/webpack.config.js:77 (`remote2: 'ownership@http://localhost:3002/remoteEntry.js'`) | src/pages/Dashboard.jsx:6; src/pages/Dashboard.jsx:7; src/pages/Dashboard.jsx:18; src/pages/Dashboard.jsx:19 |

## Observations

**1. . → subscription.** The host imports `remote1/ModemAuthorization`, `remote1/SecurityPackage` and `remote1/Card` (src/pages/Dashboard.jsx:3, 4, 9) and renders them in src/pages/Dashboard.jsx:16, 17 and 22-25, the last with props `topic` and `description`. Key `remote1` is mapped to container `subscription` at `localhost:3001` (src/webpack.config.js:76); Target is the container name as appearing in the artifact, since no snapshot unit matches it. Active = Yes through the `Yes` source code review lines, in chain src/index.js:8-12 → src/App.js:8 → Dashboard.

**2. . → ownership.** The host imports `remote2/LabourHourHold` and `remote2/MobileService` (src/pages/Dashboard.jsx:6-7) and renders them in src/pages/Dashboard.jsx:18-19. Key `remote2` is mapped to container `ownership` at `localhost:3002` (src/webpack.config.js:77), outside the snapshot. Active = Yes through the same chain as relationship 1.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 2.
Units without a relationship: none.


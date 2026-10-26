---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
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

# 305 — martinkuba/micro-frontend-test

## Repository overview

A Grafana Faro test application in a micro-frontends architecture. An npm workspaces monorepo with three webpack 5 packages (package.json:14-18). `packages/shell` is the React host: its `ModuleFederationPlugin` declares remote `mainContent` (packages/shell/webpack.config.js:32-35). The entry point loads bootstrap asynchronously (packages/shell/src/index.tsx:2), and bootstrap mounts `App` (packages/shell/src/bootstrap.tsx:14-19). `App` loads `mainContent/MainContent` with `React.lazy` (packages/shell/src/App.tsx:6) and renders it inside `ErrorBoundary` and `Suspense` (packages/shell/src/App.tsx:199-203). `packages/main-content` is the remote: it exposes `./MainContent` in a `remoteEntry.js` (packages/main-content/webpack.config.js:31-36). The only mechanism is Module Federation, with `react`, `react-dom` and `@grafana/faro-web-sdk` shared as singletons (packages/shell/webpack.config.js:38-42; packages/main-content/webpack.config.js:37-41).

The third package, `packages/sidebar`, has complete remote configuration (`name: 'sidebar'`, `exposes: { './Sidebar' }`, packages/sidebar/webpack.config.js:32-36), but is disabled in the snapshot. Its remote declaration in the shell is commented out (packages/shell/webpack.config.js:36), as are the import (packages/shell/src/App.tsx:7) and mounting (packages/shell/src/App.tsx:206-214). Only type declaration `sidebar/Sidebar` remains (packages/shell/src/remotes.d.ts:7-10), loading nothing. Script `start` starts only main-content and shell (package.json:7); `start:sidebar` remains separate (package.json:10). Hence sidebar did not become a relationship.

There is no inter-unit communication. Each initializes its own Faro instance (packages/shell/src/bootstrap.tsx:7), which is telemetry rather than message exchange, and the snapshot search found no `CustomEvent`, `postMessage`, `dispatchEvent` or `BroadcastChannel` in `packages/`.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/shell | packages/main-content | host → remote | source → target | module-federation | Yes | Yes | packages/shell/webpack.config.js:34-35 (remote `mainContent` at `http://localhost:3001/remoteEntry.js`); packages/main-content/webpack.config.js:32-36 (`name: 'mainContent'`, `filename: 'remoteEntry.js'`, exposes `./MainContent`); packages/main-content/webpack.config.js:11 (`publicPath: 'http://localhost:3001/'`); packages/main-content/webpack.config.js:45 (port 3001) | packages/shell/src/App.tsx:6; packages/shell/src/App.tsx:201 |

## Observations

**1. packages/shell → packages/main-content.** Remote `mainContent` declared by the shell (packages/shell/webpack.config.js:35) matches `packages/main-content` through `name: 'mainContent'` and `filename: 'remoteEntry.js'` (packages/main-content/webpack.config.js:32-33). Imported module `mainContent/MainContent` is exposed `./MainContent` (packages/main-content/webpack.config.js:34-36), whose default export is the component (packages/main-content/src/MainContent.tsx:104). `publicPath` and port 3001 (packages/main-content/webpack.config.js:11, 45) only corroborate. The relationship is active: both `Yes` source code review lines are `React.lazy` (packages/shell/src/App.tsx:6) and rendering `<MainContent />` (packages/shell/src/App.tsx:201), and `App` is mounted on initialization (packages/shell/src/bootstrap.tsx:14-19). The structural review left `packages/main-content` as `Undetermined` because the package does not run independently; its remote role is established by configuration and consumption.

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.


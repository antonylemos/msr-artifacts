---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
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

# 136 — swtbhsmn/micro-frontend-demo

## Repository overview

A minimal webpack Module Federation demonstration with two React applications in the same repository (README.txt:1-5): `app1` is the host and `app2` is the remote. Both use the `ModuleFederationPlugin` bundled with webpack (app1/webpack.config.js:2; app2/webpack.config.js:2), rather than a separate package; hence the dependency review has no technology row. App2 publishes as `app2` with `remoteEntry.js` and exposes a single component, `./RemoteApp` (app2/webpack.config.js:29-32). App1 declares this remote (app1/webpack.config.js:30-31), loads the component with `React.lazy` and renders it inside `Suspense` (app1/src/App.jsx:2, 8-10). Both share `react` and `react-dom` as singletons (app1/webpack.config.js:33; app2/webpack.config.js:34).

The repository is only a usage example: the remote component is a `div` with a sentence (app2/src/RemoteApp.jsx:3-5), there are no props or data exchanges between units, and both configurations are in development mode, with local servers on ports 3001 and 3002 (app1/webpack.config.js:7-9; app2/webpack.config.js:7-9). App2 also runs independently, rendering the same component on its own page (app2/src/bootstrap.js:3-6); this isolated mode is not a relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | app1 | app2 | host → remote | source → target | module-federation | Yes | Yes | app1/webpack.config.js:30-31 (remote `app2` at `http://localhost:3002/remoteEntry.js`); app2/webpack.config.js:29-32 (`name: "app2"`, `filename: "remoteEntry.js"`, exposes `./RemoteApp`); app2/webpack.config.js:9 (port 3002) | app1/src/App.jsx:2; app1/src/App.jsx:9 |

## Observations

**1. app1 → app2.** The `app2@…/remoteEntry.js` remote declared by the host (app1/webpack.config.js:31) matches the app2 unit through `name: "app2"` and `filename: "remoteEntry.js"` (app2/webpack.config.js:29-30); port 3002 (app2/webpack.config.js:9) only corroborates. The imported module, `app2/RemoteApp` (app1/src/App.jsx:2), is the `./RemoteApp` exposed in app2/webpack.config.js:31-32. The relationship is active because the component is rendered in the host's `App` (app1/src/App.jsx:9), and that `App` is mounted at the entry point (app1/src/index.js:1 → app1/src/bootstrap.js:3, 6).

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.


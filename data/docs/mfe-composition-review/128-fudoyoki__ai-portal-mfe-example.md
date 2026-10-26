---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
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

# 128 — fudoyoki/ai-portal-mfe-example

## Repository overview

A portal example with two React/Vite applications in an npm workspaces monorepo: `apps/shell` is the host and `apps/mfe-dashboard` is the only remote, linked by Module Federation (`@originjs/vite-plugin-federation`). The shell declares a `mfeDashboard` remote (apps/shell/vite.config.ts:28-31), whose URL is assembled by `getRemoteUrl`: in development, `http://localhost:3001/assets/remoteEntry.js`; in production, `${CDN_URL}/mfeDashboard/remoteEntry.js`, defaulting to `https://cdn.example.com` (apps/shell/vite.config.ts:17-23). Dashboard publishes as `mfeDashboard`, with `filename: 'remoteEntry.js'`, and exposes `./DashboardApp` (apps/mfe-dashboard/vite.config.ts:11-17). Both sides declare as `shared` singletons `react`, `react-dom`, `react-router-dom` and the internal packages `@ai-portal/ui-kit` and `@ai-portal/shared-types` (apps/shell/vite.config.ts:39-59; apps/mfe-dashboard/vite.config.ts:20-39).

The shell loads the component with `React.lazy` (apps/shell/src/App.tsx:7) and inserts it at `/dashboard/*`, inside an error boundary and `Suspense` (apps/shell/src/App.tsx:165-176). The contract between both sides consists only of props: the shell passes `user`, from its `AuthContext`, and `basePath="/dashboard"` (apps/shell/src/App.tsx:172), following the shared package's `MfeProps` interface (packages/shared-types/src/index.ts:48-51). Dashboard receives `basePath` but does not use it (apps/mfe-dashboard/src/DashboardApp.tsx:89). There is no message exchange between units; passing props did not become a `communication` relationship. Dashboard also runs independently, with its own `BrowserRouter` and a fictitious user (apps/mfe-dashboard/src/main.tsx:17-26).

What did not become a relationship: the `mfeChat`, `mfeTools` and `mfeAdmin` remotes are commented out in shell configuration (apps/shell/vite.config.ts:32-35), and the `/chat/*` and `/tools/*` routes only show the local `ComingSoon` placeholder (apps/shell/src/App.tsx:177-178). The `packages/ui-kit` and `packages/shared-types` packages are shared libraries, not frontend units.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/mfe-dashboard | host → remote | source → target | module-federation | Yes | Yes | apps/shell/vite.config.ts:28-31 (`name: 'shell'`, remote `mfeDashboard`); apps/shell/vite.config.ts:17-23 (URL of `remoteEntry.js`: `localhost:3001/assets` in dev, `${CDN_URL}/mfeDashboard` in production); apps/mfe-dashboard/vite.config.ts:11-17 (`name: 'mfeDashboard'`, `filename: 'remoteEntry.js'`, exposes `./DashboardApp`); apps/mfe-dashboard/vite.config.ts:6 (port 3001) | apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:165; apps/shell/src/App.tsx:172 |

## Observations

**1. apps/shell → apps/mfe-dashboard.** The shell's `mfeDashboard` remote matches the apps/mfe-dashboard unit through `name: 'mfeDashboard'` and `filename: 'remoteEntry.js'` (apps/mfe-dashboard/vite.config.ts:12-13), and the imported module, `mfeDashboard/DashboardApp` (apps/shell/src/App.tsx:7), is the exposed `./DashboardApp` (apps/mfe-dashboard/vite.config.ts:15-17); port 3001 in the development URL (apps/shell/vite.config.ts:10, 19) and dashboard (apps/mfe-dashboard/vite.config.ts:6) only corroborates. In production, the URL points to a CDN configurable through `CDN_URL`, with fictitious default `cdn.example.com` (apps/shell/vite.config.ts:22); this does not change target identity, the same unit. The relationship is active: all three source code review lines are `Yes`, and the component is rendered on the `/dashboard/*` route of `AppRoutes`, used by `App` (apps/shell/src/App.tsx:165-176, 184-189).

## Summary

Relationships: 1 (host → remote: 1). Active: 1. Target outside the snapshot: 0.
Units without a relationship: none.


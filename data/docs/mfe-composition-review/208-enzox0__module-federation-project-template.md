---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
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

# 208 — enzox0/module-federation-project-template

## Repository overview

A pnpm/Turbo monorepo template with five React/Vite applications in `apps/`, joined by Module Federation (`@originjs/vite-plugin-federation`). `apps/shell` is the host, on port 3000 (apps/shell/vite.config.ts:15), and exposes nothing. Its `module-federation.config.ts` declares four remotes, `authMf`, `dashboardMf`, `adminMf` and `messagingMf`, each at `http://localhost:300N/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:4-9). This object is passed to the plugin in apps/shell/vite.config.ts:4 and :7. All four remotes have the same form: a `module-federation.config.ts` with `name`, `filename: 'remoteEntry.js'` and a single `exposes` `./App` → `./src/exposes.tsx` (for example apps/auth-mf/module-federation.config.ts:2-6), and a `vite.config.ts` with its own port (for example apps/auth-mf/vite.config.ts:15). All share `react`, `react-dom` and `react-router-dom` (apps/shell/module-federation.config.ts:10).

The shell loads all four remotes identically: one `lazy(() => import('<remote>/App'))` per remote (apps/shell/src/App.tsx:7-10) and one route for each (`/auth`, `/admin`, `/dashboard`, `/messaging`), with the remote component inside `ErrorBoundary` and `Suspense` (apps/shell/src/App.tsx:36-75). The shell's `App` is mounted by asynchronous bootstrap (apps/shell/src/main.tsx:1; apps/shell/src/bootstrap.tsx:5-9). Remotes are stubs: admin, dashboard and messaging only render a title (for example apps/admin-mf/src/exposes.tsx:14), and auth a login form firing `alert` (apps/auth-mf/src/exposes.tsx:7-10).

What did not become a relationship: remote modules are declared only for TypeScript (apps/shell/src/vite-env.d.ts:3-21), and `RemoteHealthCheck` only lists all four `remoteEntry.js` URLs to check availability (apps/shell/src/components/RemoteHealthCheck.tsx:11-16), loading nothing. There is no inter-unit communication. The `packages/*` packages are not units and no app imports them. Each app also versions compiled configuration `.js` files. In remotes they repeat `name` and `exposes` (for example apps/auth-mf/module-federation.config.js:2-5). In the shell, obsolete `.js` points remotes to `localhost:3004…3007/assets/remoteEntry.js` (apps/shell/module-federation.config.js:5-8). The classification records that in the default flow, `.ts` (3001 to 3004) governs. Remote keys and imported modules are the same in both files, so relationships do not change. All five structural review units participate in a relationship.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/auth-mf | host → remote | source → target | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:5 (remote `authMf` at `http://localhost:3001/dist/assets/remoteEntry.js`); apps/shell/vite.config.ts:7 (`federation(mfConfig)`); apps/auth-mf/module-federation.config.ts:2-6 (`name: 'authMf'`, `filename: 'remoteEntry.js'`, exposes `./App`); apps/auth-mf/vite.config.ts:15 (port 3001) | apps/shell/src/App.tsx:7; apps/shell/src/App.tsx:24; apps/shell/src/App.tsx:41 |
| 2 | apps/shell | apps/admin-mf | host → remote | source → target | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:7 (remote `adminMf` at `http://localhost:3003/dist/assets/remoteEntry.js`); apps/shell/vite.config.ts:7 (`federation(mfConfig)`); apps/admin-mf/module-federation.config.ts:2-6 (`name: 'adminMf'`, `filename: 'remoteEntry.js'`, exposes `./App`); apps/admin-mf/vite.config.ts:15 (port 3003) | apps/shell/src/App.tsx:8; apps/shell/src/App.tsx:24; apps/shell/src/App.tsx:51 |
| 3 | apps/shell | apps/dashboard-mf | host → remote | source → target | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:6 (remote `dashboardMf` at `http://localhost:3002/dist/assets/remoteEntry.js`); apps/shell/vite.config.ts:7 (`federation(mfConfig)`); apps/dashboard-mf/module-federation.config.ts:2-6 (`name: 'dashboardMf'`, `filename: 'remoteEntry.js'`, exposes `./App`); apps/dashboard-mf/vite.config.ts:15 (port 3002) | apps/shell/src/App.tsx:9; apps/shell/src/App.tsx:24; apps/shell/src/App.tsx:61 |
| 4 | apps/shell | apps/messaging-mf | host → remote | source → target | module-federation | Yes | Yes | apps/shell/module-federation.config.ts:8 (remote `messagingMf` at `http://localhost:3004/dist/assets/remoteEntry.js`); apps/shell/vite.config.ts:7 (`federation(mfConfig)`); apps/messaging-mf/module-federation.config.ts:2-6 (`name: 'messagingMf'`, `filename: 'remoteEntry.js'`, exposes `./App`); apps/messaging-mf/vite.config.ts:15 (port 3004) | apps/shell/src/App.tsx:10; apps/shell/src/App.tsx:24; apps/shell/src/App.tsx:71 |

## Observations

**1. apps/shell → apps/auth-mf.** The target was resolved through remote key `authMf` (apps/shell/module-federation.config.ts:5), matching apps/auth-mf's federation `name` (apps/auth-mf/module-federation.config.ts:2). The URL's file is the `filename` declared there (apps/auth-mf/module-federation.config.ts:3). Port 3001 (apps/auth-mf/vite.config.ts:15) only corroborates. The imported module, `authMf/App` (apps/shell/src/App.tsx:7), is the exposed `./App` (apps/auth-mf/module-federation.config.ts:4-6). The relationship is active: `AuthApp` is rendered at `/auth` (apps/shell/src/App.tsx:36-45). It is the only remote with any behavior, a local login form only showing an `alert` and returning nothing to the shell (apps/auth-mf/src/exposes.tsx:7-10). In the shell's obsolete `.js`, `authMf` points to port 3004 (apps/shell/module-federation.config.js:5), messaging-mf's port in `.ts`. That file does not govern the default flow, according to the classification, and target identity comes from the name, not the port.

**2. apps/shell → apps/admin-mf.** The target was resolved identically: key `adminMf` (apps/shell/module-federation.config.ts:7) matches apps/admin-mf's `name` and `filename` (apps/admin-mf/module-federation.config.ts:2-3), exposing `./App` (apps/admin-mf/module-federation.config.ts:4-6). Port 3003 (apps/admin-mf/vite.config.ts:15) only corroborates. The relationship is active through the import of `adminMf/App` (apps/shell/src/App.tsx:8) and rendering at `/admin` (apps/shell/src/App.tsx:46-55). The exposed component only renders the title "Admin Microfrontend" (apps/admin-mf/src/exposes.tsx:14).

**3. apps/shell → apps/dashboard-mf.** Key `dashboardMf` (apps/shell/module-federation.config.ts:6) matches apps/dashboard-mf's `name` and `filename` (apps/dashboard-mf/module-federation.config.ts:2-3), exposing `./App` (apps/dashboard-mf/module-federation.config.ts:4-6). Port 3002 (apps/dashboard-mf/vite.config.ts:15) only corroborates. The relationship is active through the import of `dashboardMf/App` (apps/shell/src/App.tsx:9) and rendering at `/dashboard` (apps/shell/src/App.tsx:56-65). The exposed component renders only a title (apps/dashboard-mf/src/exposes.tsx:14).

**4. apps/shell → apps/messaging-mf.** Key `messagingMf` (apps/shell/module-federation.config.ts:8) matches apps/messaging-mf's `name` and `filename` (apps/messaging-mf/module-federation.config.ts:2-3), exposing `./App` (apps/messaging-mf/module-federation.config.ts:4-6). Port 3004 (apps/messaging-mf/vite.config.ts:15) only corroborates. The relationship is active through the import of `messagingMf/App` (apps/shell/src/App.tsx:10) and rendering at `/messaging` (apps/shell/src/App.tsx:66-75). Despite its name, the remote does not exchange messages with other units: the exposed component renders only a title (apps/messaging-mf/src/exposes.tsx:14).

## Summary

Relationships: 4 (host → remote: 4). Active: 4. Target outside the snapshot: 0.
Units without a relationship: none.


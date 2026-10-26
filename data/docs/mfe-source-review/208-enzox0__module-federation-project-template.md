---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 208 — enzox0/module-federation-project-template

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.tsx:7 | apps/shell | dynamic-loading | Yes | `lazy(() => import('authMf/App'))` loads the `./App` exposed by apps/auth-mf (apps/auth-mf/module-federation.config.ts:2-6); remote `authMf` points to `http://localhost:3001/dist/assets/remoteEntry.js` at apps/shell/module-federation.config.ts:5, passed to the plugin at apps/shell/vite.config.ts:7. Active: route `/auth` at apps/shell/src/App.tsx:36-45; App mounted at apps/shell/src/bootstrap.tsx:5-9, loaded by apps/shell/src/main.tsx:1 (entry at apps/shell/index.html:10). |
| src-remote-import | apps/shell/src/App.tsx:8 | apps/shell | dynamic-loading | Yes | `lazy(() => import('adminMf/App'))` loads the `./App` exposed by apps/admin-mf (apps/admin-mf/module-federation.config.ts:2-6); remote `adminMf` at `http://localhost:3003/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:7). Active: route `/admin` at apps/shell/src/App.tsx:46-55. |
| src-remote-import | apps/shell/src/App.tsx:9 | apps/shell | dynamic-loading | Yes | `lazy(() => import('dashboardMf/App'))` loads the `./App` exposed by apps/dashboard-mf (apps/dashboard-mf/module-federation.config.ts:2-6); remote `dashboardMf` at `http://localhost:3002/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:6). Active: route `/dashboard` at apps/shell/src/App.tsx:56-65. |
| src-remote-import | apps/shell/src/App.tsx:10 | apps/shell | dynamic-loading | Yes | `lazy(() => import('messagingMf/App'))` loads the `./App` exposed by apps/messaging-mf (apps/messaging-mf/module-federation.config.ts:2-6); remote `messagingMf` at `http://localhost:3004/dist/assets/remoteEntry.js` (apps/shell/module-federation.config.ts:8). Active: route `/messaging` at apps/shell/src/App.tsx:66-75. |
| src-async-bootstrap | apps/shell/src/main.tsx:1 | apps/shell | dynamic-loading | No | `import('./bootstrap')` loads the shell’s own bootstrap (apps/shell/src/bootstrap.tsx); internal to the unit. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.tsx:24 | apps/shell | host-relationship | Yes | `Routes` declares where shell uses each remote: `/auth` → `AuthApp`, `/admin` → `AdminApp`, `/dashboard` → `DashboardApp`, `/messaging` → `MessagingApp` (apps/shell/src/App.tsx:24-76), components from the lazy imports at apps/shell/src/App.tsx:7-10; `Routes` inside `Router` at apps/shell/src/App.tsx:14. |
| manual | apps/shell/src/App.tsx:41 | apps/shell | runtime-composition | Yes | Renders `AuthApp`, a component of unit apps/auth-mf, inside `ErrorBoundary` + `Suspense` (apps/shell/src/App.tsx:39-43); from the lazy import at apps/shell/src/App.tsx:7. |
| manual | apps/shell/src/App.tsx:51 | apps/shell | runtime-composition | Yes | Renders `AdminApp`, a component of unit apps/admin-mf, inside `ErrorBoundary` + `Suspense` (apps/shell/src/App.tsx:49-53); from the lazy import at apps/shell/src/App.tsx:8. |
| manual | apps/shell/src/App.tsx:61 | apps/shell | runtime-composition | Yes | Renders `DashboardApp`, a component of unit apps/dashboard-mf, inside `ErrorBoundary` + `Suspense` (apps/shell/src/App.tsx:59-63); from the lazy import at apps/shell/src/App.tsx:9. |
| manual | apps/shell/src/App.tsx:71 | apps/shell | runtime-composition | Yes | Renders `MessagingApp`, a component of unit apps/messaging-mf, inside `ErrorBoundary` + `Suspense` (apps/shell/src/App.tsx:69-73); from the lazy import at apps/shell/src/App.tsx:10. |

## Summary

Constructs participating in composition: 9 (dynamic-loading: 4, host-relationship: 1, runtime-composition: 4).

## Notes

- The remote modules are declared for TypeScript at apps/shell/src/vite-env.d.ts:3-21; this is only typing and does not become a row.
- apps/shell/src/components/RemoteHealthCheck.tsx:11-16 lists the `remoteEntry.js` URLs and performs `fetch` `HEAD` every 10 s (:24-58) only to show whether the remotes respond; it loads or mounts nothing and does not become a row.
- The step 4 search found no communication mechanism between units: no app imports the `packages/` packages (the only imports in `apps/*/src` are local or from `react`), and `WebSocketClient` at packages/sdk/src/websocket/index.ts:2-14 remains in a library judged `No` and unused.
- The `import()` calls at README.md:353 and README.md:394 are documentation examples rather than code.

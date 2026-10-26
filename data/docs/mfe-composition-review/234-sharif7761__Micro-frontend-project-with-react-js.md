---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
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

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Repository overview

A minimal Module Federation demonstration (README.md:3) with three React/Rsbuild applications, all using `@module-federation/rsbuild-plugin`. `core_simple` is the shell (README.md:10; port 3000 in core_simple/rsbuild.config.ts:31-33), declaring two remotes, `common_simple` and `users_simple` (core_simple/rsbuild.config.ts:11-14). `users_simple` exposes its entire application as `./UserList` (users_simple/rsbuild.config.ts:11-13) and itself consumes remote `common_simple` (users_simple/rsbuild.config.ts:14-16). `common_simple` is a federated component library exposing `./Button` and `./Card` (common_simple/rsbuild.config.ts:11-14), consuming nobody. The result is three `host → remote` relationships, one between two units other than the shell: `users_simple`, when mounted in the shell, brings `common_simple` components with it.

The shell loads `UserList` through `lazy(() => import('users_simple/UserList'))` (core_simple/src/App.tsx:9) and places it at `/users` (core_simple/src/App.tsx:57-60); the home page uses remote `Card` (core_simple/src/App.tsx:15, :24). Components from `common_simple` enter through static imports (core_simple/src/App.tsx:4-6; users_simple/src/App.tsx:3-5), resolved by the federation runtime after asynchronous bootstrap (`import('./bootstrap')` in core_simple/src/index.tsx:1 and users_simple/src/index.tsx:1). The shell imports `common_simple/Button` (core_simple/src/App.tsx:4) but does not render `<Button>`, although the README lists this consumption (README.md:45-48); the import adds no relationship, because pair core_simple → common_simple already exists through `Card`. Each unit also runs independently with its own bootstrap (core_simple/src/bootstrap.tsx:5-10; users_simple/src/bootstrap.tsx:5-10), and there is no inter-unit communication: the shell passes no props to `UserList` (core_simple/src/App.tsx:59), and user data comes from JSONPlaceholder (users_simple/src/App.tsx:25). All remotes point to `localhost`, with no deployment configuration in the snapshot.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | core_simple | users_simple | host → remote | source → target | module-federation | Yes | Yes | core_simple/rsbuild.config.ts:13 (remote `users_simple@http://localhost:3002/remoteEntry.js`); users_simple/rsbuild.config.ts:9-13 (`name: 'users_simple'`, `filename: 'remoteEntry.js'`, exposes `./UserList` → `./src/App.tsx`); users_simple/rsbuild.config.ts:33-35 (port 3002) | core_simple/src/App.tsx:9; core_simple/src/App.tsx:57 |
| 2 | core_simple | common_simple | host → remote | source → target | module-federation | Yes | Yes | core_simple/rsbuild.config.ts:12 (remote `common_simple@http://localhost:3001/remoteEntry.js`); common_simple/rsbuild.config.ts:9-14 (`name: 'common_simple'`, `filename: 'remoteEntry.js'`, exposes `./Button` and `./Card`); common_simple/rsbuild.config.ts:28-30 (port 3001) | core_simple/src/App.tsx:15; core_simple/src/App.tsx:24 |
| 3 | users_simple | common_simple | host → remote | source → target | module-federation | Yes | Yes | users_simple/rsbuild.config.ts:14-16 (remote `common_simple@http://localhost:3001/remoteEntry.js`); common_simple/rsbuild.config.ts:9-14 (`name: 'common_simple'`, `filename: 'remoteEntry.js'`, exposes `./Button` and `./Card`); common_simple/rsbuild.config.ts:28-30 (port 3001) | users_simple/src/App.tsx:40; users_simple/src/App.tsx:49 |

## Observations

**1. core_simple → users_simple.** The shell's `users_simple` remote (core_simple/rsbuild.config.ts:13) matches unit users_simple through `name` and `filename: 'remoteEntry.js'` (users_simple/rsbuild.config.ts:9-10); port 3002 (users_simple/rsbuild.config.ts:33-35) only corroborates. The requested module, `users_simple/UserList` (core_simple/src/App.tsx:9), is the exposed `./UserList`, users_simple's entire `App` (users_simple/rsbuild.config.ts:12). The relationship is active: the import uses `lazy` and the component is rendered at `/users` inside `Suspense` (core_simple/src/App.tsx:56-61), with a navigation link in core_simple/src/App.tsx:50. The core_simple/src/App.tsx:57 line (`Routes`) enters here because this is where the shell decides on which route the remote unit appears.

**2. core_simple → common_simple.** Remote `common_simple` (core_simple/rsbuild.config.ts:12) matches unit common_simple through `name` and `filename` (common_simple/rsbuild.config.ts:9-10). The shell renders the remote `Card` twice on page `Home` (core_simple/src/App.tsx:15, :24), the element of route `/` (core_simple/src/App.tsx:58), from the static import in core_simple/src/App.tsx:6. `Button` is also imported (core_simple/src/App.tsx:4), but unused in the file, so does not appear in Code.

**3. users_simple → common_simple.** Users_simple declares the same remote `common_simple` (users_simple/rsbuild.config.ts:14-16), resolved to unit common_simple as in relationship 2. It renders `<Button>` to reload the list (users_simple/src/App.tsx:40-42) and one `<Card>` per user (users_simple/src/App.tsx:48-53), from imports in users_simple/src/App.tsx:3-5. The relationship applies when users_simple runs independently (users_simple/src/bootstrap.tsx:5-10) and also when mounted in the shell through relationship 1, since the exposed `App` is the same component; in that case the shell receives `Button` and `Card` through users_simple, besides the `Card` it uses directly.

## Summary

Relationships: 3 (host → remote: 3). Active: 3. Target outside the snapshot: 0.
Units without a relationship: none.


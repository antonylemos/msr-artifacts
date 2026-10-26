---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 174 — lorem98/mfe

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/auth/src/index.js:4 | packages/auth | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (packages/auth/src/bootstrap.js); internal to the unit. |
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (packages/container/src/bootstrap.js); internal to the unit. |
| src-async-bootstrap | packages/dashboard/src/index.js:3 | packages/dashboard | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (packages/dashboard/src/bootstrap.js); internal to the unit. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap (packages/marketing/src/bootstrap.js); internal to the unit. |
| src-mount-export | packages/auth/src/bootstrap.js:57 | packages/auth | runtime-composition | Yes | Exports `mount` (packages/auth/src/bootstrap.js:22-42), exposed as `./AuthApp` at packages/auth/config/webpack.prod.js:18-20 and packages/auth/config/webpack.dev.js:18-21, and called by container at packages/container/src/components/AuthApp.js:26. |
| src-mount-export | packages/dashboard/src/bootstrap.js:36 | packages/dashboard | runtime-composition | Yes | Exports `mount` (packages/dashboard/src/bootstrap.js:12-21), exposed as `./DashboardApp` at packages/dashboard/config/webpack.prod.js:18-20 and packages/dashboard/config/webpack.dev.js:19-22, and called by container at packages/container/src/components/DashboardApp.js:21. |
| src-mount-export | packages/marketing/src/bootstrap.js:46 | packages/marketing | runtime-composition | Yes | Exports `mount` (packages/marketing/src/bootstrap.js:7-30), exposed as `./MarketingApp` at packages/marketing/config/webpack.prod.js:16-18 and packages/marketing/config/webpack.dev.js:19-21, and called by container at packages/container/src/components/MarketingApp.js:10. |
| src-mount-call | packages/container/src/components/AuthApp.js:26 | packages/container | runtime-composition | Yes | `mount(ref.current, {...})` (packages/container/src/components/AuthApp.js:26-36) mounts unit auth, imported from `auth/AuthApp` at packages/container/src/components/AuthApp.js:1 and resolved by remote `auth` at packages/container/config/webpack.prod.js:19; the wrapper is rendered in route `/auth` at packages/container/src/App.js:27-29, and App is mounted at packages/container/src/bootstrap.js:5. |
| src-mount-call | packages/container/src/components/DashboardApp.js:21 | packages/container | runtime-composition | Yes | `mount(ref.current)` mounts unit dashboard (Vue), imported from `dashboard/DashboardApp` at packages/container/src/components/DashboardApp.js:1 and resolved by remote `dashboard` at packages/container/config/webpack.prod.js:20; the wrapper is rendered in route `/dashboard` when `signedIn` at packages/container/src/App.js:32-38. |
| src-mount-call | packages/container/src/components/MarketingApp.js:10 | packages/container | runtime-composition | Yes | `mount(ref.current, {...})` (packages/container/src/components/MarketingApp.js:10-20) mounts unit marketing, imported from `marketing/MarketingApp` at packages/container/src/components/MarketingApp.js:1 and resolved by remote `marketing` at packages/container/config/webpack.prod.js:18; the wrapper is rendered in route `/` at packages/container/src/App.js:41-43. |
| src-mount-call | packages/dashboard/src/bootstrap.js:14 | packages/dashboard | runtime-composition | No | Vue’s `app.mount(el)` renders the unit’s own UI within function `mount` (packages/dashboard/src/bootstrap.js:12-14); the container boundary is the export at packages/dashboard/src/bootstrap.js:36. |
| src-mount-import | packages/auth/config/webpack.dev.js:19 | packages/auth | none | No | Comment line (`// The container imports this as: import { mount } from "auth/AuthApp"`) above `exposes` at packages/auth/config/webpack.dev.js:18-21; not executable code. |
| src-mount-import | packages/container/src/components/AuthApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `auth/AuthApp`; called at packages/container/src/components/AuthApp.js:26. |
| src-mount-import | packages/container/src/components/DashboardApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `dashboard/DashboardApp`; called at packages/container/src/components/DashboardApp.js:21. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `marketing/MarketingApp`; called at packages/container/src/components/MarketingApp.js:10. |
| src-mount-import | packages/dashboard/config/webpack.dev.js:20 | packages/dashboard | none | No | Comment line (`// The container imports this as: import { mount } from "dashboard/DashboardApp"`) above `exposes` at packages/dashboard/config/webpack.dev.js:19-22; not executable code. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | packages/container/src/App.js:25 | packages/container | host-relationship | Yes | The `Switch` (packages/container/src/App.js:25-44) declares where units enter the UI: `AuthApp` at `/auth` (:27-29), `DashboardApp` at `/dashboard`, protected by `signedIn` with a redirect to `/auth/signin` (:32-38), and `MarketingApp` at `/` (:41-43); wrappers imported at packages/container/src/App.js:5-7 and App mounted at packages/container/src/bootstrap.js:5. |

## Summary

Constructs participating in composition: 10 (runtime-composition: 9, host-relationship: 1).

## Notes

- The container’s `mount` calls use the name imported from the remote, and mining captured them (`src-mount-call`); there are therefore no manual mounting rows.
- Under step 4, callbacks exchanged in `mount` do not become rows: container passes `onSignIn`, `onNavigate` and `initialPath` and receives `onParentNavigate` (packages/container/src/components/AuthApp.js:26-38; packages/container/src/components/MarketingApp.js:10-22); auth calls `onSignIn` at packages/auth/src/components/Signin.js:58 and packages/auth/src/components/Signup.js:59, and container uses this signal to allow `/dashboard` (packages/container/src/App.js:28 and :33). The dashboard’s `onParentNavigate` is empty (packages/dashboard/src/bootstrap.js:19) and container does not use it (packages/container/src/components/DashboardApp.js:21).
- The step 4 search found only the four `import("./bootstrap")` calls already in mining; there are no `customElements`, `iframe`, `postMessage`, `CustomEvent` or `BroadcastChannel` in the units.
- The remotes’ production URLs depend on `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6 and :18-20); in development they point to localhost:8081-8083 (packages/container/config/webpack.dev.js:18-20).

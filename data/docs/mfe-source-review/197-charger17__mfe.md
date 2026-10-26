---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 197 — charger17/mfe

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-mount-export | packages/auth/src/bootstrap.js:35 | packages/auth | runtime-composition | Yes | Exports `mount(el, { onNavigate, defaultHistory, initialPath, onSignIn })`, which renders the auth App at packages/auth/src/bootstrap.js:6-25; exposed as `./AuthApp` at packages/auth/config/webpack.prod.js:16-17 and packages/auth/config/webpack.dev.js:22-23 and consumed by container at packages/container/src/components/AuthApp.js:1 and :10. |
| src-mount-export | packages/dashboard/src/bootstrap.js:17 | packages/dashboard | runtime-composition | Yes | Exports `mount(el)`, which creates the dashboard Vue app at packages/dashboard/src/bootstrap.js:4-7; exposed as `./DashboardApp` at packages/dashboard/config/webpack.prod.js:16-17 and packages/dashboard/config/webpack.dev.js:25-26 and consumed by container at packages/container/src/components/DashboardApp.js:1 and :8. |
| src-mount-export | packages/marketing/src/bootstrap.js:36 | packages/marketing | runtime-composition | Yes | Exports `mount(el, { onNavigate, defaultHistory, initialPath })`, which renders the marketing App at packages/marketing/src/bootstrap.js:6-26; exposed as `./MarketingApp` at packages/marketing/config/webpack.prod.js:16-17 and packages/marketing/config/webpack.dev.js:22-23 and consumed by container at packages/container/src/components/MarketingApp.js:1 and :10. |
| src-mount-call | packages/container/src/components/AuthApp.js:10 | packages/container | runtime-composition | Yes | Mounts remote `auth` on the wrapper’s `ref` (packages/container/src/components/AuthApp.js:9-25); remote declared at packages/container/config/webpack.prod.js:19 and packages/container/config/webpack.dev.js:22; wrapper loaded by `lazy` at packages/container/src/App.js:12 and rendered in route `/auth` at packages/container/src/App.js:43-45; App rendered at packages/container/src/bootstrap.js:5-8, loaded by entry packages/container/src/index.js:1. |
| src-mount-call | packages/container/src/components/DashboardApp.js:8 | packages/container | runtime-composition | Yes | Mounts remote `dashboard` on the wrapper’s `ref` (packages/container/src/components/DashboardApp.js:7-9); remote declared at packages/container/config/webpack.prod.js:20 and packages/container/config/webpack.dev.js:23; wrapper loaded by `lazy` at packages/container/src/App.js:13 and rendered in route `/dashboard` at packages/container/src/App.js:46-51; App rendered at packages/container/src/bootstrap.js:5-8. |
| src-mount-call | packages/container/src/components/MarketingApp.js:10 | packages/container | runtime-composition | Yes | Mounts remote `marketing` on the wrapper’s `ref` (packages/container/src/components/MarketingApp.js:9-21); remote declared at packages/container/config/webpack.prod.js:18 and packages/container/config/webpack.dev.js:21; wrapper loaded by `lazy` at packages/container/src/App.js:11 and rendered in route `/` at packages/container/src/App.js:52-54; App rendered at packages/container/src/bootstrap.js:5-8. |
| src-mount-call | packages/dashboard/src/bootstrap.js:6 | packages/dashboard | runtime-composition | No | Vue’s `app.mount(el)` renders the unit’s own Dashboard component (packages/dashboard/src/bootstrap.js:4-7); the container boundary is the `mount` export at packages/dashboard/src/bootstrap.js:17. |
| src-mount-import | packages/container/src/components/AuthApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `auth/AuthApp`, used at packages/container/src/components/AuthApp.js:10. |
| src-mount-import | packages/container/src/components/DashboardApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `dashboard/DashboardApp`, used at packages/container/src/components/DashboardApp.js:8. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `marketing/MarketingApp`, used at packages/container/src/components/MarketingApp.js:10. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | packages/container/src/App.js:42 | packages/container | host-relationship | Yes | The `Switch` declares where auth (`/auth`), dashboard (`/dashboard`, with a redirect to `/` without login) and marketing (`/`) enter the container UI (packages/container/src/App.js:42-55), through the wrappers at packages/container/src/App.js:11-13; App rendered at packages/container/src/bootstrap.js:5-8. |

## Summary

Constructs participating in composition: 10 (runtime-composition: 9, host-relationship: 1).

## Notes

- The `import()` calls at packages/container/src/App.js:11-13 load local container wrappers, and the `import ('./bootstrap…')` calls in the four `src/index.js` files load their own bootstrap; they are internal and do not become rows.
- Under step 4, callbacks exchanged in `mount` do not become rows: container passes `initialPath`, `onNavigate` and, to auth, `onSignIn` (packages/container/src/components/AuthApp.js:10-22, packages/container/src/components/MarketingApp.js:10-18) and receives `onParentNavigate`, registered in `history.listen` (packages/container/src/components/AuthApp.js:24, packages/container/src/components/MarketingApp.js:20); auth passes `onSignIn` to the buttons at packages/auth/src/components/Signin.js:102 and packages/auth/src/components/Signup.js:127.
- Container passes `isSignedIn` to `MarketingLazy` (packages/container/src/App.js:53), but the wrapper at packages/container/src/components/MarketingApp.js:5 does not receive props; the value does not reach the remote.
- The development `mount(devRoot, …)` calls (packages/auth/src/bootstrap.js:31, packages/dashboard/src/bootstrap.js:13, packages/marketing/src/bootstrap.js:32) are isolated mounts of each remote and are not in `matches.csv`; they do not become rows.
- No custom element, iframe, `postMessage`, `CustomEvent` or shared storage in the units’ code.

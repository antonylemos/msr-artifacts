---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 017 — a-kelen/mfe

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/auth/src/index.js:1 | packages/auth | dynamic-loading | No | packages/auth/src/index.js:1 imports the unit’s own bootstrap. |
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | packages/container/src/index.js:1 imports the unit’s own bootstrap. |
| src-async-bootstrap | packages/dashboard/src/index.js:1 | packages/dashboard | dynamic-loading | No | packages/dashboard/src/index.js:1 imports the unit’s own bootstrap. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | packages/marketing/src/index.js:1 imports the unit’s own bootstrap. |
| src-mount-export | packages/auth/src/bootstrap.js:34 | packages/auth | runtime-composition | Yes | Exports mount at packages/auth/src/bootstrap.js:34, exposed at packages/auth/config/webpack.prod.js:16-17 and consumed by the wrapper at packages/container/src/components/AuthApp.js:11. |
| src-mount-export | packages/dashboard/src/bootstrap.js:16 | packages/dashboard | runtime-composition | Yes | Exports mount at packages/dashboard/src/bootstrap.js:16, exposed at packages/dashboard/config/webpack.prod.js:16-17 and consumed by the wrapper at packages/container/src/components/DashboardApp.js:8. |
| src-mount-export | packages/marketing/src/bootstrap.js:33 | packages/marketing | runtime-composition | Yes | Exports mount at packages/marketing/src/bootstrap.js:33, exposed at packages/marketing/config/webpack.prod.js:16-17 and consumed by the wrapper at packages/container/src/components/MarketingApp.js:11. |
| src-mount-call | packages/dashboard/src/bootstrap.js:6 | packages/dashboard | runtime-composition | No | packages/dashboard/src/bootstrap.js:4-6 calls Vue’s app.mount(el) to render the unit’s own UI; the external boundary is the mount export at packages/dashboard/src/bootstrap.js:16. |
| src-mount-import | packages/container/src/components/AuthApp.js:4 | packages/container | runtime-composition | Yes | Imports mount from the auth unit; invoked in the wrapper at packages/container/src/components/AuthApp.js:11; wrapper connected to routes at packages/container/src/App.js:41-48. |
| src-mount-import | packages/container/src/components/DashboardApp.js:2 | packages/container | runtime-composition | Yes | Imports mount from the dashboard unit; invoked in the wrapper at packages/container/src/components/DashboardApp.js:8; wrapper connected to routes at packages/container/src/App.js:41-48. |
| src-mount-import | packages/container/src/components/MarketingApp.js:4 | packages/container | runtime-composition | Yes | Imports mount from the marketing unit; invoked in the wrapper at packages/container/src/components/MarketingApp.js:11; wrapper connected to routes at packages/container/src/App.js:41-48. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | packages/container/src/components/AuthApp.js:11 | packages/container | runtime-composition | Yes | Mounts the auth unit using the alias imported in the wrapper; component rendered by routes at packages/container/src/App.js:41-48 and App started at packages/container/src/bootstrap.js:3-5. |
| manual | packages/container/src/components/DashboardApp.js:8 | packages/container | runtime-composition | Yes | Mounts the dashboard unit using the alias imported in the wrapper; component rendered by routes at packages/container/src/App.js:41-48 and App started at packages/container/src/bootstrap.js:3-5. |
| manual | packages/container/src/components/MarketingApp.js:11 | packages/container | runtime-composition | Yes | Mounts the marketing unit using the alias imported in the wrapper; component rendered by routes at packages/container/src/App.js:41-48 and App started at packages/container/src/bootstrap.js:3-5. |
| manual | packages/container/src/App.js:40 | packages/container | host-relationship | Yes | The Switch declares where AuthApp, DashboardApp and MarketingApp participate in the UI (packages/container/src/App.js:40-48); App mounted at packages/container/src/bootstrap.js:5. |

## Summary

Constructs participating in composition: 10 (runtime-composition: 9, host-relationship: 1).

## Notes

- The dynamic wrapper imports at packages/container/src/App.js:7-9 are local. Remote mounts using aliases escaped src-mount-call and appear in the second table.
- Vue’s app.mount(el) renders internally to dashboard, although the enclosing mount function is exported and consumed by the host.
- Under the criteria for constructs outside mining (method step 4), callbacks exchanged in `mount` do not become rows: the host passes `onNavigate` and `onSignIn` and receives `onParentNavigate` at packages/container/src/components/AuthApp.js:11-21 and packages/container/src/components/MarketingApp.js:11-20; the remotes register them at packages/auth/src/bootstrap.js:7-23 and packages/marketing/src/bootstrap.js:6-23, and `onSignIn` is called at packages/auth/src/components/Signin.js:102 and packages/auth/src/components/Signup.js:127.

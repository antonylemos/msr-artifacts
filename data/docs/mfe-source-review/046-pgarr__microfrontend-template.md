---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 046 — pgarr/microfrontend-template

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | auth/src/index.js:1 | auth | dynamic-loading | No | auth/src/index.js:1 imports the local bootstrap; does not cross a unit boundary. |
| src-async-bootstrap | container/src/index.js:1 | container | dynamic-loading | No | container/src/index.js:1 imports the local bootstrap; does not cross a unit boundary. |
| src-async-bootstrap | dashboard/src/index.js:1 | dashboard | dynamic-loading | No | dashboard/src/index.js:1 imports the local bootstrap; does not cross a unit boundary. |
| src-async-bootstrap | marketing/src/index.js:1 | marketing | dynamic-loading | No | marketing/src/index.js:1 imports the local bootstrap; does not cross a unit boundary. |
| src-mount-export | auth/src/bootstrap.js:46 | auth | runtime-composition | Yes | Exports mount at auth/src/bootstrap.js:46, exposed at auth/config/webpack.prod.js:16-17 and called by the wrapper at container/src/components/AuthApp.js:13. |
| src-mount-export | dashboard/src/bootstrap.js:22 | dashboard | runtime-composition | Yes | Exports mount at dashboard/src/bootstrap.js:22, exposed at dashboard/config/webpack.prod.js:16-17 and called by the wrapper at container/src/components/DashboardApp.js:8. |
| src-mount-export | marketing/src/bootstrap.js:46 | marketing | runtime-composition | Yes | Exports mount at marketing/src/bootstrap.js:46, exposed at marketing/config/webpack.prod.js:16-17 and called by the wrapper at container/src/components/MarketingApp.js:13. |
| src-mount-call | container/src/components/AuthApp.js:13 | container | runtime-composition | Yes | Mounts the auth unit on the wrapper ref (container/src/components/AuthApp.js:13); wrapper participates in the host routes at container/src/App.js:29-36. |
| src-mount-call | container/src/components/DashboardApp.js:8 | container | runtime-composition | Yes | Mounts the dashboard unit on the wrapper ref (container/src/components/DashboardApp.js:8); wrapper participates in the host routes at container/src/App.js:29-36. |
| src-mount-call | container/src/components/MarketingApp.js:13 | container | runtime-composition | Yes | Mounts the marketing unit on the wrapper ref (container/src/components/MarketingApp.js:13); wrapper participates in the host routes at container/src/App.js:29-36. |
| src-mount-call | dashboard/src/bootstrap.js:7 | dashboard | runtime-composition | No | dashboard/src/bootstrap.js:5-8 uses Vue’s app.mount(el) to render its own UI; the external interaction is in the mount export at dashboard/src/bootstrap.js:22. |
| src-mount-import | container/src/components/AuthApp.js:1 | container | runtime-composition | Yes | Imports mount from auth/AuthApp at container/src/components/AuthApp.js:1; called at container/src/components/AuthApp.js:13 and used in routes at container/src/App.js:29-36. |
| src-mount-import | container/src/components/DashboardApp.js:1 | container | runtime-composition | Yes | Imports mount from dashboard/DashboardApp at container/src/components/DashboardApp.js:1; called at container/src/components/DashboardApp.js:8 and used in routes at container/src/App.js:29-36. |
| src-mount-import | container/src/components/MarketingApp.js:1 | container | runtime-composition | Yes | Imports mount from marketing/MarketingApp at container/src/components/MarketingApp.js:1; called at container/src/components/MarketingApp.js:13 and used in routes at container/src/App.js:29-36. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | container/src/App.js:29 | container | host-relationship | Yes | Routes declares the usage points of AuthLazy, DashboardLazy and MarketingLazy (container/src/App.js:29-36); App is mounted at container/src/bootstrap.js:3-6. |

## Summary

Constructs participating in composition: 10 (runtime-composition: 9, host-relationship: 1).

## Notes

- The container chain is container/src/index.js:1 → container/src/bootstrap.js:3-6 → container/src/App.js:8-10 and container/src/App.js:29-36 → wrappers. The lazy wrapper imports are local; these wrappers’ mount imports cross the boundary.
- The Vue mount is internal to the dashboard unit, and the development standalone mounts at auth/src/bootstrap.js:36-41, marketing/src/bootstrap.js:36-41 and dashboard/src/bootstrap.js:12-17 are also not inter-unit composition.
- Under the criteria for constructs outside mining (method step 4), callbacks exchanged in `mount` do not become rows: the host passes `onNavigate` and `onSignIn` and receives `onParentNavigate` at container/src/components/AuthApp.js:13-29 and container/src/components/MarketingApp.js:13-28; the remotes register them at auth/src/bootstrap.js:14-31 and marketing/src/bootstrap.js:14-31, and `onSignIn` is called at auth/src/components/Signin.js:96 and auth/src/components/Signup.js:121.

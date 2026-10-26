---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 177 — Varshithknaik/mfe-lect

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | auth/src/index.js:1 | auth | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap; internal to auth. |
| src-async-bootstrap | container/src/index.js:1 | container | dynamic-loading | No | `import("./bootstrap")` loads the unit’s own bootstrap; internal to container. |
| src-async-bootstrap | marketing/src/index.js:1 | marketing | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap; internal to marketing. |
| src-async-bootstrap | packages/auth/src/index.js:1 | packages/auth | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap; internal to packages/auth. |
| src-async-bootstrap | packages/container/src/index.js:1 | packages/container | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap; internal to packages/container. |
| src-async-bootstrap | packages/dashboard/src/index.js:1 | packages/dashboard | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap; internal to packages/dashboard. |
| src-async-bootstrap | packages/marketing/src/index.js:1 | packages/marketing | dynamic-loading | No | `import('./bootstrap')` loads the unit’s own bootstrap; internal to packages/marketing. |
| src-mount-export | auth/src/bootstrap.js:46 | auth | runtime-composition | Yes | Exports `mount(el, { onSignIn, onNavigate, defaultHistory, initialPath })` defined at auth/src/bootstrap.js:7-32; exposed as `./AuthApp` at auth/config/webpack.prod.js:16-17 and auth/config/webpack.dev.js:21-22; consumed by container at container/src/components/AuthApp.js:12. |
| src-mount-export | marketing/src/bootstrap.js:41 | marketing | runtime-composition | Yes | Exports `mount(el, { onNavigate, defaultHistory, initialPath })` defined at marketing/src/bootstrap.js:7-30; exposed as `./MarketingApp` at marketing/config/webpack.prod.js:16-17 and marketing/config/webpack.dev.js:21-22; consumed by container at container/src/components/MarketingApp.js:13. |
| src-mount-export | packages/auth/src/bootstrap.js:46 | packages/auth | runtime-composition | Yes | Exports `mount` defined at packages/auth/src/bootstrap.js:7-32; exposed as `./AuthApp` at packages/auth/config/webpack.prod.js:16-17 and packages/auth/config/webpack.dev.js:22-23; consumed by packages/container at packages/container/src/components/AuthApp.js:13. |
| src-mount-export | packages/dashboard/src/bootstrap.js:22 | packages/dashboard | runtime-composition | Yes | Exports `mount(el)` defined at packages/dashboard/src/bootstrap.js:5-8; exposed as `./DashboardApp` at packages/dashboard/config/webpack.prod.js:16-17 and packages/dashboard/config/webpack.dev.js:25-26; consumed by packages/container at packages/container/src/components/DashboardApp.js:8. |
| src-mount-export | packages/marketing/src/bootstrap.js:46 | packages/marketing | runtime-composition | Yes | Exports `mount` defined at packages/marketing/src/bootstrap.js:7-32; exposed as `./MarketingApp` at packages/marketing/config/webpack.prod.js:16-17 and packages/marketing/config/webpack.dev.js:22-23; consumed by packages/container at packages/container/src/components/MarketingApp.js:13. |
| src-mount-call | container/src/components/AuthApp.js:12 | container | runtime-composition | Yes | Mounts remote `auth` (auth/AuthApp) in the wrapper’s `div`, passing `initialPath`, `onNavigate` and `onSignIn` and storing `onParentNavigate` (container/src/components/AuthApp.js:12-20); remote declared at container/config/webpack.prod.js:19 and container/config/webpack.dev.js:22; wrapper loaded by `lazy` at container/src/App.js:15 and connected to route `/auth/*` at container/src/App.js:36-39. |
| src-mount-call | container/src/components/MarketingApp.js:13 | container | runtime-composition | Yes | Mounts remote `marketing` (marketing/MarketingApp) in the wrapper’s `div`, with `onNavigate` and `initialPath` (container/src/components/MarketingApp.js:13-20); remote declared at container/config/webpack.prod.js:18 and container/config/webpack.dev.js:21; wrapper loaded at container/src/App.js:14 and connected to route `/*` at container/src/App.js:44. |
| src-mount-call | packages/container/src/components/AuthApp.js:13 | packages/container | runtime-composition | Yes | Mounts remote `auth` in the wrapper’s `div`, with `initialPath`, `onNavigate` and `onSignIn` (packages/container/src/components/AuthApp.js:13-21); remote declared at packages/container/config/webpack.dev.js:22 and packages/container/config/webpack.prod.js:19; wrapper loaded at packages/container/src/App.js:9 and connected to route `/auth/*` at packages/container/src/App.js:30-32. |
| src-mount-call | packages/container/src/components/DashboardApp.js:8 | packages/container | runtime-composition | Yes | Mounts remote `dashboard` (Vue) in the wrapper’s `div`; remote declared at packages/container/config/webpack.dev.js:23 and packages/container/config/webpack.prod.js:20; wrapper loaded at packages/container/src/App.js:10 and connected to route `/dashboard` at packages/container/src/App.js:33-35 (only with `isSignedIn`). |
| src-mount-call | packages/container/src/components/MarketingApp.js:13 | packages/container | runtime-composition | Yes | Mounts remote `marketing` in the wrapper’s `div`, with `initialPath` and `onNavigate` (packages/container/src/components/MarketingApp.js:13-20); remote declared at packages/container/config/webpack.dev.js:21 and packages/container/config/webpack.prod.js:18; wrapper loaded at packages/container/src/App.js:8 and connected to route `/*` at packages/container/src/App.js:36. |
| src-mount-call | packages/dashboard/src/bootstrap.js:7 | packages/dashboard | runtime-composition | No | Vue’s `app.mount(el)` renders the unit’s own Dashboard component (packages/dashboard/src/bootstrap.js:5-8); the host boundary is `export { mount }` at packages/dashboard/src/bootstrap.js:22. |
| src-mount-import | container/src/components/AuthApp.js:1 | container | runtime-composition | Yes | Imports `mount` from remote `auth/AuthApp`; used at container/src/components/AuthApp.js:12. |
| src-mount-import | container/src/components/MarketingApp.js:1 | container | runtime-composition | Yes | Imports `mount` from remote `marketing/MarketingApp`; used at container/src/components/MarketingApp.js:13. |
| src-mount-import | packages/container/src/components/AuthApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `auth/AuthApp`; used at packages/container/src/components/AuthApp.js:13. |
| src-mount-import | packages/container/src/components/DashboardApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `dashboard/DashboardApp`; used at packages/container/src/components/DashboardApp.js:8. |
| src-mount-import | packages/container/src/components/MarketingApp.js:1 | packages/container | runtime-composition | Yes | Imports `mount` from remote `marketing/MarketingApp`; used at packages/container/src/components/MarketingApp.js:13. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | container/src/App.js:35 | container | host-relationship | Yes | `Routes` declares where remote wrappers enter: `AuthLazy` at `/auth/*` and `MarketingLazy` at `/*` (container/src/App.js:35-45); route `/dashboard` with `DashboardLazy` is commented out (container/src/App.js:16 and 40-43). App mounted at container/src/bootstrap.js:5-6. |
| manual | packages/container/src/App.js:29 | packages/container | host-relationship | Yes | `Routes` declares `AuthLazy` at `/auth/*`, `DashboardLazy` at `/dashboard` (protected by `isSignedIn`) and `MarketingLazy` at `/*` (packages/container/src/App.js:29-37). App mounted at packages/container/src/bootstrap.js:5-6. |

## Summary

Constructs participating in composition: 17 (runtime-composition: 15, host-relationship: 2).

## Notes

- The `lazy(() => import('./components/...'))` calls at container/src/App.js:14-15 and packages/container/src/App.js:8-10 load local wrappers of the container itself; they did not become manual rows. `DashboardLazy` at container/src/App.js:16 is commented out, as is remote `dashboard` at container/config/webpack.prod.js:20.
- Navigation between host and remotes uses callbacks (`onNavigate`, `onParentNavigate`, `onSignIn`), recorded in the mounting rows’ Observation; the step 4 search found no `CustomEvent`, `postMessage`, `BroadcastChannel`, iframes or custom elements.
- There are two application copies: the root copy (auth, container, marketing) and the `packages/` copy (which adds dashboard). Each container’s remotes use the same names and ports (8081 marketing, 8082 auth) in both copies (auth/config/webpack.dev.js:12, packages/auth/config/webpack.dev.js:13, marketing/config/webpack.dev.js:12, packages/marketing/config/webpack.dev.js:13), and production paths `…/auth/latest` and `…/marketing/latest` are published only from the root (.github/workflows/marketing.yml:7-8 and 23). Each mount’s target unit was taken to be from the same copy; this does not change the answers, because in either case the target is another unit.
- Root `dashboard/` is not a unit and has no source code in the snapshot.

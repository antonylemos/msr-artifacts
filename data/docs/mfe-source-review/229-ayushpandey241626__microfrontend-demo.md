---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 229 — ayushpandey241626/microfrontend-demo

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/host-app/src/main.ts:1 | projects/host-app | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap (projects/host-app/src/bootstrap.ts:5); internal to the unit. |
| src-async-bootstrap | projects/login-mfe-app/src/main.ts:1 | projects/login-mfe-app | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap (projects/login-mfe-app/src/bootstrap.ts:5); internal to the unit. |
| src-async-bootstrap | projects/mfe1/src/main.ts:1 | projects/mfe1 | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap (projects/mfe1/src/bootstrap.ts:5); internal to the unit. |
| src-async-bootstrap | projects/mfe2/src/main.ts:1 | projects/mfe2 | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap (projects/mfe2/src/bootstrap.ts:5); internal to the unit. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:3 | projects/host-app | remote-resolution | Yes | Imports `loadRemoteModule` from `@angular-architects/module-federation`, used at projects/host-app/src/app/app.routes.ts:17, :27 and :36. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:17 | projects/host-app | remote-resolution | Yes | `loadRemoteModule({ type: 'module', exposedModule: './ContactsModule', remoteEntry: 'http://localhost:4201/remoteEntry.js' })` (projects/host-app/src/app/app.routes.ts:17-21) loads projects/mfe1’s routes in route `contacts`; `./ContactsModule` exposed at projects/mfe1/webpack.config.js:10-11 and port 4201 at angular.json:177; routes registered by `provideRouter(routes)` at projects/host-app/src/app/app.config.ts:12, used at projects/host-app/src/bootstrap.ts:5. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:27 | projects/host-app | remote-resolution | Yes | `loadRemoteModule({ type: 'module', exposedModule: './AdminModule', remoteEntry: 'http://localhost:4202/remoteEntry.js' })` (projects/host-app/src/app/app.routes.ts:27-31) loads projects/mfe2’s routes in route `admin`; `./AdminModule` exposed at projects/mfe2/webpack.config.js:10-11 and port 4202 at angular.json:278; same registration chain as the preceding row. |
| src-load-remote | projects/host-app/src/app/app.routes.ts:36 | projects/host-app | remote-resolution | Yes | `loadRemoteModule({ type: 'module', exposedModule: './LoginModule', remoteEntry: 'http://localhost:4203/remoteEntry.js' })` (projects/host-app/src/app/app.routes.ts:36-40) loads projects/login-mfe-app’s routes in route `login`; `./LoginModule` exposed at projects/login-mfe-app/webpack.config.js:10-11 and port 4203 at angular.json:383; same registration chain. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | projects/host-app/src/app/app.routes.ts:7 | projects/host-app | host-relationship | Yes | The `routes` table declares where each remote enters the host: `contacts` → mfe1, `admin` → mfe2, `login` → login-mfe-app, with an initial redirect to `login` (projects/host-app/src/app/app.routes.ts:7-46); `contacts` and `admin` protected by `AuthGuard` (:15, :25); registered by `provideRouter(routes)` at projects/host-app/src/app/app.config.ts:12. |
| manual | projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63 | projects/login-mfe-app | communication | Yes | `localStorage.setItem('isLoggedIn', 'true')` writes session state during login and navigates to `/contacts` (:64); the same key is read by the host’s `AuthGuard` (projects/host-app/src/app/auth.guard.ts:11) to allow routes `contacts` and `admin` (projects/host-app/src/app/app.routes.ts:15, :25). The component enters the host through routes exposed at projects/login-mfe-app/src/app/login/login-form.routes.ts:4. |

## Summary

Constructs participating in composition: 6 (remote-resolution: 4, host-relationship: 1, communication: 1).

## Notes

- The static `remotes` at projects/host-app/webpack.config.js:21-25 (`mfe1`, `mfe2`, `loginMfeApp`) are not used in code: there is no `import('mfe1/...')` or equivalent; the host loads all three remotes only through `loadRemoteModule` with `type: 'module'` and a `remoteEntry` URL. The `loginMfeApp` name differs from `name: "login-mfe-app"` at projects/login-mfe-app/webpack.config.js:7, which does not affect URL-based loading.
- The host logout (projects/host-app/src/app/app.component.ts:71-74) only navigates to `/login`; no code removes the `isLoggedIn` key.
- The step 4 search also found local `import()` calls of internal routes (projects/mfe1/src/app/app.routes.ts:8, projects/mfe2/src/app/app.routes.ts:7, projects/login-mfe-app/src/app/app.routes.ts:7) and `localStorage` use of key `contacts` within mfe1 (projects/mfe1/src/app/contact-list/contact-list.component.ts:109, :301, :318); these are internal to the unit and did not become rows. There are no custom elements, iframes, `postMessage`, `CustomEvent`, `BroadcastChannel` or script injection.

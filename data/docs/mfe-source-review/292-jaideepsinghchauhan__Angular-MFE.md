---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | appshell/host/src/app/app.routes.ts:7 | appshell/host | dynamic-loading | Yes | `loadChildren: () => import('mfe2/Routes')` loads the routes exposed by appshell/mfe2 (`./Routes` at appshell/mfe2/module-federation.config.ts:6) under path `mfe2`; remote declared at appshell/host/module-federation.config.ts:17; routes registered by `provideRouter(appRoutes)` at appshell/host/src/app/app.config.ts:13, used at appshell/host/src/bootstrap.ts:5 |
| src-remote-import | appshell/host/src/app/app.routes.ts:11 | appshell/host | dynamic-loading | Yes | `loadChildren: () => import('mfe1/Routes')` loads the routes exposed by appshell/mfe1 (`./Routes` at appshell/mfe1/module-federation.config.ts:6) under path `mfe1`; same registration chain as line 7 |
| src-remote-import | appshell/host/src/app/app.routes.ts:16 | appshell/host | dynamic-loading | Undetermined | `import('mfe1/GreetingRoutes')` under path `greeting` (appshell/host/src/app/app.routes.ts:13-17), but appshell/mfe1 does not expose `./GreetingRoutes`: only `./Routes` and `./GreetingComponent` (appshell/mfe1/module-federation.config.ts:5-9); see Notes |
| src-async-bootstrap | appshell/host/src/main.ts:1 | appshell/host | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap (appshell/host/src/bootstrap.ts:1-5); internal to the unit |
| src-async-bootstrap | appshell/mfe1/src/main.ts:1 | appshell/mfe1 | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap; internal to the unit |
| src-async-bootstrap | appshell/mfe2/src/main.ts:1 | appshell/mfe2 | dynamic-loading | No | `import('./bootstrap')` loads its own bootstrap; internal to the unit |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | appshell/host/src/app/app.routes.ts:4 | appshell/host | host-relationship | Yes | `appRoutes` declares under which paths the host uses mfe2, mfe1 and mfe1’s greeting (appshell/host/src/app/app.routes.ts:4-22); registered by `provideRouter(appRoutes)` at appshell/host/src/app/app.config.ts:13 and presented by the menu and `router-outlet` at appshell/host/src/app/app.html:1-5 and :17 |
| manual | libs/shared/data/src/lib/user.service.ts:11 | — | communication | Yes | `login()` writes signal `isLoggenIn` of `UserService` (`providedIn: 'root'`, libs/shared/data/src/lib/user.service.ts:3-7; `logout()` at :14-16), triggered by host buttons (appshell/host/src/app/app.ts:18-23, appshell/host/src/app/app.html:6-15); the same service is read at appshell/mfe1/src/app/remote-entry/nx-welcome.ts:875-877 and displayed at :9, in component `RemoteEntry` (appshell/mfe1/src/app/remote-entry/entry.ts:6-8) of the `./Routes` routes loaded by the host |

## Summary

Constructs participating in composition: 4 (dynamic-loading: 2, host-relationship: 1, communication: 1).

## Notes

- `mfe1/GreetingRoutes` (appshell/host/src/app/app.routes.ts:16) is in the active route table and has a type declared at appshell/host/src/remotes.d.ts:8-11, but the module is not in the `exposes` at appshell/mfe1/module-federation.config.ts:5-9. README.md:171-176 instructs adding `'./GreetingRoutes': 'appshell/mfe1/src/app/greeting/greeting.routes.ts'`, and the file shown immediately below (README.md:181-190) already lacks this line. With the snapshot as it stands, loading would fail at runtime; hence `Undetermined` rather than `Yes`.
- `UserService` works as a host–mfe1 channel only if `@angular-monorepo/data` is a shared runtime instance. No `module-federation.config.ts` declares `shared`; sharing comes from Nx’s `withModuleFederation` default (appshell/host/webpack.config.ts:1-9, appshell/mfe1/webpack.config.ts:1-9), which shares workspace libraries mapped at tsconfig.base.json:17-22.
- `Button` from `@angular-monorepo/button` is used in the host (appshell/host/src/app/app.ts:4) and imported at appshell/mfe1/src/app/remote-entry/entry.ts:4. This is a shared UI library without a communication mechanism and did not become a row.
- The step 4 search also found local file `import()` calls at appshell/mfe1/src/app/app.routes.ts:7 and :12, appshell/mfe2/src/app/app.routes.ts:7 and appshell/mfe1/src/app/greeting/greeting.routes.ts:7, all internal to the unit, and README.md code excerpts, which are not constructs.
- `apps/angular-monorepo` has no composition construct.

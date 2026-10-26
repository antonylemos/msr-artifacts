---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | host/src/main.ts:7 | host | dynamic-loading | No | `import('./bootstrap')` of a local file after `initFederation` (host/src/main.ts:3-8); internal to host. |
| src-async-bootstrap | remote/src/main.ts:5 | remote | dynamic-loading | No | `import('./bootstrap')` of a local file after `initFederation()` (remote/src/main.ts:3-6); internal to remote. |
| src-load-remote | host/src/app/app.routes.ts:1 | host | remote-resolution | Yes | Import of `loadRemoteModule`, enabling resolutions at host/src/app/app.routes.ts:11 and :22 (both `Yes`). |
| src-load-remote | host/src/app/app.routes.ts:11 | host | remote-resolution | Yes | `loadRemoteModule('remote', './Component')` in route `''` with `loadComponent` (host/src/app/app.routes.ts:8-16); resolves the `App` exposed by remote at `./Component` (remote/federation.config.js:7-8), with `Fallback` on error. Active: `routes` registered by `provideRouter` (host/src/app/app.config.ts:10), used at host/src/bootstrap.ts:5, loaded by host/src/main.ts:7. |
| src-load-remote | host/src/app/app.routes.ts:22 | host | remote-resolution | Yes | `loadRemoteModule('remote', './routes')` in route `flights` with `loadChildren` (host/src/app/app.routes.ts:18-28); resolves `APP_ROUTES` exposed by remote at `./routes` (remote/federation.config.js:9; remote/src/app/modules/home/home.routes.ts:3), with `fallbackRoutes` on error. Same active chain as line 11. |
| src-load-remote | host/src/main.ts:1 | host | remote-resolution | Yes | Import of `initFederation`, enabling the call at host/src/main.ts:3 (`Yes`). |
| src-load-remote | host/src/main.ts:3 | host | remote-resolution | Yes | `initFederation` with map `'remote': 'http://localhost:4201/remoteEntry.json'` (host/src/main.ts:3-5); registers remote, served on port 4201 (remote/angular.json:108), before host bootstrap (host/src/main.ts:7). Host entry point (host/angular.json:60). |
| src-load-remote | remote/src/main.ts:1 | remote | remote-resolution | No | Import of `initFederation`, enabling the call at remote/src/main.ts:3 (`No`). |
| src-load-remote | remote/src/main.ts:3 | remote | remote-resolution | No | `initFederation()` without a manifest or remotes (remote/src/main.ts:3); remote only exposes `./Component` and `./routes` (remote/federation.config.js:7-10) and does not resolve another unit. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | host/src/app/app.routes.ts:7 | host | host-relationship | Yes | Host route table naming remote and where it enters: `''` → `remote/./Component` and `flights` → `remote/./routes` (host/src/app/app.routes.ts:7-29); registered by `provideRouter(routes)` at host/src/app/app.config.ts:10, and host renders the result in the `<router-outlet>` at host/src/app/app.html:2. |

## Summary

Constructs participating in composition: 6 (remote-resolution: 5, host-relationship: 1).

## Notes

- The `import()` calls in remote’s own routes (remote/src/app/app.routes.ts:7; remote/src/app/modules/home/home.routes.ts:7, :12) are local files and do not enter the manual table.
- host/src/remote.d.ts:1 declares module `remote/Styles?inline`, but no host file imports it and remote does not expose `./Styles` (remote/federation.config.js:7-10); not a composition construct.
- There is no `cfg-route-rewrites` in this repository’s `matches.csv`; the option B rule does not apply.

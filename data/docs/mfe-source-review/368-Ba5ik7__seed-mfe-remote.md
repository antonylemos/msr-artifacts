---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 368 — Ba5ik7/seed-mfe-remote

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/demo/src/main.ts:1 | projects/demo | dynamic-loading | No | `import('./bootstrap')` loads demo’s local bootstrap (projects/demo/src/main.ts:1, projects/demo/src/bootstrap.ts:5); internal to the unit. |
| src-async-bootstrap | projects/seed-mfe-remote/src/main.ts:1 | projects/seed-mfe-remote | dynamic-loading | No | `import('./bootstrap')` loads remote’s local bootstrap (projects/seed-mfe-remote/src/main.ts:1, projects/seed-mfe-remote/src/bootstrap.ts:5); internal to the unit. |
| src-load-remote | projects/demo/src/app/app.component.ts:1 | projects/demo | remote-resolution | Yes | Imports `loadRemoteModule`, used at projects/demo/src/app/app.component.ts:26-30 to load `./RemoteWidget` from seed-mfe-remote. |
| src-load-remote | projects/demo/src/app/app.component.ts:26 | projects/demo | remote-resolution | Yes | In `ngAfterViewInit`, `loadRemoteModule` with `remoteEntry: 'http://localhost:4202/remoteEntry.js'` and `exposedModule: './RemoteWidget'` (projects/demo/src/app/app.component.ts:24-30); target is projects/seed-mfe-remote, exposing `./RemoteWidget` at projects/seed-mfe-remote/webpack.config.js:7-8 and serving on port 4202 (angular.json:80). AppComponent is demo’s root (projects/demo/src/bootstrap.ts:5). |
| src-load-remote | projects/demo/src/app/app.routes.ts:2 | projects/demo | remote-resolution | Yes | Imports `loadRemoteModule`, used in route `remote` at projects/demo/src/app/app.routes.ts:8-12. |
| src-load-remote | projects/demo/src/app/app.routes.ts:8 | projects/demo | remote-resolution | Yes | `loadComponent` of route `remote` calls `loadRemoteModule` with the same remoteEntry and `./RemoteWidget` and returns `RemoteWidgetComponent` (projects/demo/src/app/app.routes.ts:7-12); routes registered by `provideRouter(routes)` at projects/demo/src/app/app.config.ts:7, used at projects/demo/src/bootstrap.ts:5. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | projects/demo/src/app/app.component.ts:36 | projects/demo | runtime-composition | Yes | `this.mfeHost.createComponent(remoteComponent.RemoteWidgetComponent)` mounts the seed-mfe-remote component in the template’s `ng-container #mfeHost` (projects/demo/src/app/app.component.ts:12, :21-22, :36). |
| manual | projects/demo/src/app/app.routes.ts:4 | projects/demo | host-relationship | Yes | The `routes` table declares that path `remote` uses seed-mfe-remote’s `./RemoteWidget` (projects/demo/src/app/app.routes.ts:4-14), shown in the host’s `<router-outlet>` (projects/demo/src/app/app.component.ts:15); registered at projects/demo/src/app/app.config.ts:7. |

## Summary

Constructs participating in composition: 6 (remote-resolution: 4, runtime-composition: 1, host-relationship: 1).

## Notes

- The `remoteEntry` is fixed at `http://localhost:4202/remoteEntry.js` in both calls; the `remotes.seedMfeRemote` declaration at projects/demo/webpack.config.js:5-7 is unused by code, which resolves remote by URL with `type: 'module'`.
- Selector `app-remote-widget` (projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:4) appears in no demo template; the component enters only through `createComponent` and the route.

---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | microfrontend-workspace/projects/mfe1/src/main.ts:1 | microfrontend-workspace/projects/mfe1 | dynamic-loading | No | microfrontend-workspace/projects/mfe1/src/main.ts:1 imports its own bootstrap, rather than another unit. |
| src-async-bootstrap | microfrontend-workspace/projects/shell/src/main.ts:1 | microfrontend-workspace/projects/shell | dynamic-loading | No | microfrontend-workspace/projects/shell/src/main.ts:1 imports the shell’s own bootstrap. |
| src-load-remote | microfrontend-workspace/projects/shell/src/app/app.routes.ts:2 | microfrontend-workspace/projects/shell | remote-resolution | Yes | Imports loadRemoteModule for the active call at microfrontend-workspace/projects/shell/src/app/app.routes.ts:8-12; routes registered by microfrontend-workspace/projects/shell/src/app/app.config.ts:4-7. |
| src-load-remote | microfrontend-workspace/projects/shell/src/app/app.routes.ts:8 | microfrontend-workspace/projects/shell | remote-resolution | Yes | Loads the mfe1 unit’s AppComponent through remoteEntry and ./Component (microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12); active route at microfrontend-workspace/projects/shell/src/app/app.config.ts:7. |
| src-load-remote | microfrontend-workspace/projects/shell/src/app/app.routes.ts:17 | microfrontend-workspace/projects/shell | remote-resolution | No | The mfe2 route call is commented out along with the route at microfrontend-workspace/projects/shell/src/app/app.routes.ts:14-21. |
| src-html-external-script | angular-frontend-practical/src/index.html:13 | angular-frontend-practical | none | No | angular-frontend-practical/src/index.html:13-15 loads Bootstrap, a UI library, from a CDN; it does not load another frontend application. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | microfrontend-workspace/projects/shell/src/app/app.routes.ts:4 | microfrontend-workspace/projects/shell | host-relationship | Yes | The route table names mfe1 and the initial redirect at microfrontend-workspace/projects/shell/src/app/app.routes.ts:4-23; registered by microfrontend-workspace/projects/shell/src/app/app.config.ts:7. |
| manual | microfrontend-workspace/projects/shared/src/lib/message.service.ts:12 | — | communication | Yes | Publishes to the BehaviorSubject used as a channel between shell and mfe1 (microfrontend-workspace/projects/shared/src/lib/message.service.ts:8-12); producers and consumers at microfrontend-workspace/projects/shell/src/app/app.component.ts:19 and microfrontend-workspace/projects/mfe1/src/app/app.component.ts:16. |

## Summary

Constructs participating in composition: 4 (remote-resolution: 2, host-relationship: 1, communication: 1).

## Notes

- The shell chain is microfrontend-workspace/projects/shell/src/main.ts:1 → microfrontend-workspace/projects/shell/src/bootstrap.ts:2-5 → microfrontend-workspace/projects/shell/src/app/app.config.ts:4-7 → app.routes. The mfe1 component is exposed at microfrontend-workspace/projects/mfe1/webpack.config.js:8-9.
- Communication through MessageService was found outside the patterns. The shared alias points to dist/shared at microfrontend-workspace/tsconfig.json:15-18; both configurations use withModuleFederationPlugin and shareAll (microfrontend-workspace/projects/shell/webpack.config.js:1-12; microfrontend-workspace/projects/mfe1/webpack.config.js:1-13). The library is not a frontend unit in the structural review; its row receives Unit —.
- The local dynamic imports at angular-frontend-practical/src/app/app.routes.ts:12-22, ssr-app/src/app/app.routes.ts:23-36 and ssr-app/src/app/components/home/home.component.ts:21 are internal lazy loading, without an additional inter-unit composition construct.
- Under the criteria for constructs outside mining (method step 4), the `MessageService` channel has one row where it is defined (microfrontend-workspace/projects/shared/src/lib/message.service.ts:12); its usage points remain outside the table: shell imports and sends at microfrontend-workspace/projects/shell/src/app/app.component.ts:4 and :19, and mfe1 imports and subscribes to `message$` at microfrontend-workspace/projects/mfe1/src/app/app.component.ts:3 and :16-18.

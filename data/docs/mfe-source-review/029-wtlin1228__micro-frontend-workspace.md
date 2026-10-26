---
schema: 1
id: 1043597864
full_name: wtlin1228/micro-frontend-workspace
commit: 9b81d2c5b6156084e0e9a4a3ecfdd89494d0b692
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 029 — wtlin1228/micro-frontend-workspace

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-async-bootstrap | packages/app-mf-1/src/index.tsx:1 | packages/app-mf-1 | dynamic-loading | No | packages/app-mf-1/src/index.tsx:1 imports the unit’s own bootstrap. |
| src-async-bootstrap | packages/app-mf-2/src/index.tsx:1 | packages/app-mf-2 | dynamic-loading | No | packages/app-mf-2/src/index.tsx:1 imports the unit’s own bootstrap. |
| src-async-bootstrap | packages/host/src/index.tsx:1 | packages/host | dynamic-loading | No | packages/host/src/index.tsx:1 imports the unit’s own bootstrap. |
| src-load-remote | packages/host/src/app-loaders/module-federation.ts:3 | packages/host | remote-resolution | Yes | Imports registerRemotes, invoked at packages/host/src/app-loaders/module-federation.ts:27-32; manager used by the route at packages/host/src/routes/apps.$baseRoute.tsx:24. |
| src-load-remote | packages/host/src/app-loaders/module-federation.ts:27 | packages/host | remote-resolution | Yes | Registers the remote application’s name and entry (packages/host/src/app-loaders/module-federation.ts:27-32), from the registry at packages/host/src/configs/apps.ts:9-20. |
| src-load-remote | packages/host/src/app-loaders/module-federation.ts:34 | packages/host | remote-resolution | Yes | Loads the remote module and obtains the component factory (packages/host/src/app-loaders/module-federation.ts:34-43), using loadRemote imported at packages/host/src/app-loaders/module-federation.ts:1-4; flow called at packages/host/src/routes/apps.$baseRoute.tsx:24. |
| src-mount-export | packages/app-qiankun-1/src/index.tsx:1 | packages/app-qiankun-1 | runtime-composition | Yes | packages/app-qiankun-1/src/index.tsx:1 re-exports the lifecycles consumed by the qiankun host, which registers the units at packages/host/src/app-loaders/qiankun.ts:13-26. |
| src-mount-export | packages/app-qiankun-1/src/lifecycles.tsx:14 | packages/app-qiankun-1 | runtime-composition | Yes | Defines the bootstrap lifecycle at packages/app-qiankun-1/src/lifecycles.tsx:14-16, re-exported at packages/app-qiankun-1/src/index.tsx:1; unit registered by the host at packages/host/src/configs/apps.ts:23-32 and packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-1/src/lifecycles.tsx:22 | packages/app-qiankun-1 | runtime-composition | Yes | Defines the mount lifecycle at packages/app-qiankun-1/src/lifecycles.tsx:22-39, re-exported at packages/app-qiankun-1/src/index.tsx:1; unit registered by the host at packages/host/src/configs/apps.ts:23-32 and packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-1/src/lifecycles.tsx:45 | packages/app-qiankun-1 | runtime-composition | Yes | Defines the unmount lifecycle at packages/app-qiankun-1/src/lifecycles.tsx:45-52, re-exported at packages/app-qiankun-1/src/index.tsx:1; unit registered by the host at packages/host/src/configs/apps.ts:23-32 and packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-2/src/index.tsx:1 | packages/app-qiankun-2 | runtime-composition | Yes | packages/app-qiankun-2/src/index.tsx:1 re-exports the lifecycles consumed by the qiankun host, which registers the units at packages/host/src/app-loaders/qiankun.ts:13-26. |
| src-mount-export | packages/app-qiankun-2/src/lifecycles.tsx:14 | packages/app-qiankun-2 | runtime-composition | Yes | Defines the bootstrap lifecycle at packages/app-qiankun-2/src/lifecycles.tsx:14-16, re-exported at packages/app-qiankun-2/src/index.tsx:1; unit registered by the host at packages/host/src/configs/apps.ts:23-32 and packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-2/src/lifecycles.tsx:22 | packages/app-qiankun-2 | runtime-composition | Yes | Defines the mount lifecycle at packages/app-qiankun-2/src/lifecycles.tsx:22-39, re-exported at packages/app-qiankun-2/src/index.tsx:1; unit registered by the host at packages/host/src/configs/apps.ts:23-32 and packages/host/src/app-loaders/qiankun.ts:25. |
| src-mount-export | packages/app-qiankun-2/src/lifecycles.tsx:45 | packages/app-qiankun-2 | runtime-composition | Yes | Defines the unmount lifecycle at packages/app-qiankun-2/src/lifecycles.tsx:45-52, re-exported at packages/app-qiankun-2/src/index.tsx:1; unit registered by the host at packages/host/src/configs/apps.ts:23-32 and packages/host/src/app-loaders/qiankun.ts:25. |
| src-lifecycles | packages/host/src/app-loaders/qiankun.ts:2 | packages/host | runtime-composition | Yes | Imports registerMicroApps and start, used at packages/host/src/app-loaders/qiankun.ts:25-26; registration activated by App at packages/host/src/App.tsx:7-9. |
| src-lifecycles | packages/host/src/app-loaders/qiankun.ts:25 | packages/host | runtime-composition | Yes | Registers the qiankun units with entry, container and activeRule (packages/host/src/app-loaders/qiankun.ts:10-26); invoked by packages/host/src/App.tsx:8. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | packages/host/src/App.tsx:8 | packages/host | runtime-composition | Yes | The App effect starts registration of the qiankun applications (packages/host/src/App.tsx:7-9), through packages/host/src/app-loaders/index.ts:2; App mounted at packages/host/src/bootstrap.tsx:3-11. |
| manual | packages/host/src/app-loaders/qiankun.ts:26 | packages/host | runtime-composition | Yes | start begins orchestration after registerMicroApps at packages/host/src/app-loaders/qiankun.ts:25-26; active call through packages/host/src/App.tsx:8. |
| manual | packages/host/src/configs/apps.ts:9 | packages/host | host-relationship | Yes | APP_CONFIGS declares the applications, architecture and entries (packages/host/src/configs/apps.ts:9-34), used by both loaders at packages/host/src/app-loaders/qiankun.ts:10-21 and packages/host/src/routes/apps.$baseRoute.tsx:14-24. |
| manual | packages/host/src/routes/apps.$baseRoute.tsx:24 | packages/host | remote-resolution | Yes | The route calls the manager’s getRemote for the selected record (packages/host/src/routes/apps.$baseRoute.tsx:12-25); route connected to the router through packages/host/src/routeTree.gen.ts:15-16 and packages/host/src/router.tsx:2-4. |
| manual | packages/host/src/routes/apps.$baseRoute.tsx:43 | packages/host | dynamic-loading | Yes | React.lazy awaits the component provided by the remote unit (packages/host/src/routes/apps.$baseRoute.tsx:39-45); the result comes from the route loader at packages/host/src/routes/apps.$baseRoute.tsx:24. |
| manual | packages/host/src/routes/apps.$baseRoute.tsx:54 | packages/host | runtime-composition | Yes | Renders the remote RootComponent inside Suspense (packages/host/src/routes/apps.$baseRoute.tsx:52-56), obtained through the manager at packages/host/src/app-loaders/module-federation.ts:34-43. |

## Summary

Constructs participating in composition: 19 (remote-resolution: 4, runtime-composition: 13, host-relationship: 1, dynamic-loading: 1).

## Notes

- The multiline loadRemote import at packages/host/src/app-loaders/module-federation.ts:1-4 was not captured, although registerRemotes on the next line was. Under the criteria for constructs outside mining (method step 4), the static import remains evidence of the call at :34, without its own manual row. React.lazy and the getRemote call were recorded outside mining.
- Host chain: packages/host/src/index.tsx:1 → packages/host/src/bootstrap.tsx:3-11 → packages/host/src/App.tsx:3-11 → qiankun registration and router. The generated routes file was consulted only to confirm the chain; it did not generate a manual row.
- The qiankun remotes’ bootstrap hooks only log messages, but participate in the lifecycle contract exported to the orchestrator. Internal root.unmount calls are not another inter-unit interaction construct.
- The optional update hooks at packages/app-qiankun-1/src/lifecycles.tsx:57-59 and packages/app-qiankun-2/src/lifecycles.tsx:57-59 have no observable invocation; they were not added as active composition.
- Under the criteria for constructs outside mining (method step 4), the `getRootComponent` factory call at packages/host/src/app-loaders/module-federation.ts:40-42 (the next step of `loadRemote` at :34) remains outside the table, as do the remote exports defining it: packages/app-mf-1/src/App.tsx:5-8 and packages/app-mf-1/src/exposed.tsx:1, packages/app-mf-2/src/App.tsx:5-8 and packages/app-mf-2/src/exposed.tsx:1.

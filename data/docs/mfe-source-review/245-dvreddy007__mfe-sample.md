---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-load-remote | packages/host/src/components/Loader.vue:70 | packages/host | remote-resolution | Yes | Calls `useModuleFederation().loadRemote` (packages/host/src/plugins/federationPlugin.js:27-35) with the route’s remote name (`app1` or `app2`, packages/host/src/routeManifest.js:4 and :17); Loader.vue is the component of all routes at packages/host/src/router/index.js:5-12, router installed at packages/host/src/main.js:13 and rendered by `<RouterView />` at packages/host/src/App.vue:8. |
| src-load-remote | packages/host/src/components/Loader.vue:96 | packages/host | remote-resolution | Yes | Calls local function `loadRemote` (packages/host/src/components/Loader.vue:63-84), which resolves and mounts the current route’s remote; triggered by `initializeRemote` in `onMounted` and on route changes (packages/host/src/components/Loader.vue:100-108). Targets: packages/app-1 and packages/app-2. |
| src-load-remote | packages/host/src/plugins/federationPlugin.js:29 | packages/host | remote-resolution | Yes | `loadRemote` from `@module-federation/runtime` (imported as `_loadRemote` at packages/host/src/plugins/federationPlugin.js:1) resolves `<remote>/entry`, exposed by packages/app-1/vite.config.js:10-14 and packages/app-2/vite.config.js:10-14; used at packages/host/src/components/Loader.vue:70. |
| src-mount-export | packages/app-1/src/entry.js:6 | packages/app-1 | runtime-composition | Yes | Exports `mount(container)` (packages/app-1/src/entry.js:6-18), exposed as `./entry` at packages/app-1/vite.config.js:12-14 and called by the host at packages/host/src/components/Loader.vue:74. |
| src-mount-export | packages/app-1/src/entry.js:20 | packages/app-1 | runtime-composition | Yes | Exports `unmount()` (packages/app-1/src/entry.js:20-25), called by the host before mounting another remote at packages/host/src/components/Loader.vue:66. |
| src-mount-export | packages/app-2/src/entry.js:6 | packages/app-2 | runtime-composition | Yes | Exports `mount(container)` (packages/app-2/src/entry.js:6-18), exposed as `./entry` at packages/app-2/vite.config.js:12-14 and called by the host at packages/host/src/components/Loader.vue:74. |
| src-mount-export | packages/app-2/src/entry.js:20 | packages/app-2 | runtime-composition | Yes | Exports `unmount()` (packages/app-2/src/entry.js:20-25), called by the host before mounting another remote at packages/host/src/components/Loader.vue:66. |
| src-mount-call | packages/app-1/src/entry.js:13 | packages/app-1 | runtime-composition | No | Vue’s `app.mount(container)` renders the unit’s own UI inside the `mount` export (packages/app-1/src/entry.js:6-18); the host boundary is the export at :6. |
| src-mount-call | packages/app-2/src/entry.js:13 | packages/app-2 | runtime-composition | No | Vue’s `app.mount(container)` renders the unit’s own UI inside the `mount` export (packages/app-2/src/entry.js:6-18); the host boundary is the export at :6. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | packages/host/src/routeManifest.js:1 | packages/host | host-relationship | Yes | `routeManifest` (packages/host/src/routeManifest.js:1-28) declares remotes `app1` (`http://localhost:5011/remoteEntry.js`, route `/app-1`) and `app2` (`http://localhost:5012/remoteEntry.js`, route `/app-2`), the ports at packages/app-1/vite.config.js:19 and packages/app-2/vite.config.js:19; becomes routes at packages/host/src/router/index.js:4-12 and a remote list through `getRemotes` (:33-35). |
| manual | packages/host/src/plugins/federationPlugin.js:15 | packages/host | remote-resolution | Yes | `init` from `@module-federation/runtime` registers remotes `app1` and `app2` with name and entry URL (packages/host/src/plugins/federationPlugin.js:9-18); the src-load-remote pattern does not cover `init(`. Activated by `app.use(federationPlugin, getRemotes())` at packages/host/src/main.js:15. |
| manual | packages/host/src/components/Loader.vue:74 | packages/host | runtime-composition | Yes | `remoteModule.mount(containerRef.value)` mounts the loaded remote (packages/app-1 or packages/app-2) in the host’s `<div ref="containerRef">` (packages/host/src/components/Loader.vue:2); argument `containerRef.value` does not match src-mount-call. The previous remote’s `unmount` is called at :66. |

## Summary

Constructs participating in composition: 10 (remote-resolution: 4, runtime-composition: 5, host-relationship: 1).

## Notes

- The `import()` calls in `packages/*/.__mf__temp/*/localSharedImportMap.js` are files generated by plugin `@module-federation/vite` and were ignored; `import('@/components/Loader.vue')` at packages/host/src/router/index.js:11 is local to the host and does not become a row.
- The remotes import nothing from the host; `packages/app-1/src/main.js` and `packages/app-2/src/main.js` are standalone entries that do not use `entry.js`.

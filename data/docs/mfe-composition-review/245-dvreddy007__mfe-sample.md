---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Repository overview

A Vue 3 and Vite micro frontends example in an npm/Lerna workspace: `packages/host` is the host and `packages/app-1` and `packages/app-2` are remotes, all three using `@module-federation/vite`. The remotes expose the same `./entry` module (packages/app-1/vite.config.js:10-14; packages/app-2/vite.config.js:10-14), exporting a `mount(container)`/`unmount()` contract and creating a separate Vue instance for each remote (packages/app-1/src/entry.js:6-25; packages/app-2/src/entry.js:6-25). The host declares no `remotes` in `vite.config.js`: its plugin contains only `name`, `filename` and `shared` (packages/host/vite.config.js:10-14). Remotes reside in a route manifest (packages/host/src/routeManifest.js:1-28), with each one's name, `remoteEntry.js` URL and route. This manifest feeds two things: `init` from `@module-federation/runtime`, registering remotes at initialization (packages/host/src/main.js:15; packages/host/src/plugins/federationPlugin.js:9-18), and Vue Router routes, all with the same `Loader.vue` component (packages/host/src/router/index.js:4-12).

During navigation (packages/host/src/App.vue:4-8), `Loader.vue` finds the route's remote, unmounts the previous one, loads `<remote>/entry` through `loadRemote` and calls `mount` on its `<div>` (packages/host/src/components/Loader.vue:2, 63-84, 87-108; packages/host/src/plugins/federationPlugin.js:27-35). The same code path serves both remotes; the manifest selects the target. Each remote also runs independently through a `main.js` not using `entry.js` (packages/app-1/src/main.js:5). There is no inter-unit message exchange. The host also has `filename: 'remoteEntry.js'` without `exposes` (packages/host/vite.config.js:12), generating no relationship. The README shows a manifest at another path with `module: 'app1/App'` (README.md:78-98), differing from the actual file. Relationships follow the code.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/host | packages/app-1 | host → remote | source → target | module-federation | Yes | Yes | packages/host/vite.config.js:10-14 (plugin `federation` of the host, `name: 'host'`, only `shared: ['vue']`, without `remotes`); packages/app-1/vite.config.js:10-14 (`name: 'app1'`, `filename: 'remoteEntry.js'`, exposes `./entry`); packages/app-1/vite.config.js:19 (port 5011) | packages/host/src/components/Loader.vue:70; packages/host/src/components/Loader.vue:96; packages/host/src/plugins/federationPlugin.js:29; packages/app-1/src/entry.js:6; packages/app-1/src/entry.js:20; packages/host/src/routeManifest.js:1; packages/host/src/plugins/federationPlugin.js:15; packages/host/src/components/Loader.vue:74 |
| 2 | packages/host | packages/app-2 | host → remote | source → target | module-federation | Yes | Yes | packages/host/vite.config.js:10-14 (plugin `federation` of the host, `name: 'host'`, only `shared: ['vue']`, without `remotes`); packages/app-2/vite.config.js:10-14 (`name: 'app2'`, `filename: 'remoteEntry.js'`, exposes `./entry`); packages/app-2/vite.config.js:19 (port 5012) | packages/host/src/components/Loader.vue:70; packages/host/src/components/Loader.vue:96; packages/host/src/plugins/federationPlugin.js:29; packages/app-2/src/entry.js:6; packages/app-2/src/entry.js:20; packages/host/src/routeManifest.js:1; packages/host/src/plugins/federationPlugin.js:15; packages/host/src/components/Loader.vue:74 |

## Observations

**1. packages/host → packages/app-1.** The manifest declares remote `app1` with entry `http://localhost:5011/remoteEntry.js` and route `/app-1` (packages/host/src/routeManifest.js:3-9). The name `app1` is the `name` in packages/app-1/vite.config.js:10, and `remoteEntry.js` is the `filename` at :11. This is the explicit match resolving the target; port 5011 (packages/app-1/vite.config.js:19) only confirms. The host requests `app1/entry` (packages/host/src/plugins/federationPlugin.js:29), matching `./entry` exposed in packages/app-1/vite.config.js:12-14 and exports `mount`/`unmount` in packages/app-1/src/entry.js:6 and :20. The relationship is active: `init` runs at host initialization (packages/host/src/main.js:15), and loading with mounting occurs when `/app-1` renders `Loader.vue` (packages/host/src/components/Loader.vue:70-74, 100-108). Lines in `Loader.vue`, `federationPlugin.js` and `routeManifest.js` are generic and also support relationship 2.

**2. packages/host → packages/app-2.** The same path as relationship 1, with remote `app2`, entry `http://localhost:5012/remoteEntry.js` and route `/app-2` (packages/host/src/routeManifest.js:16-22). The target is resolved through `name: 'app2'` and `filename: 'remoteEntry.js'` (packages/app-2/vite.config.js:10-11); port 5012 (:19) only confirms. Module `./entry` (packages/app-2/vite.config.js:12-14) exports `mount` and `unmount` (packages/app-2/src/entry.js:6 and :20). When the route changes, the host calls `unmount` on the previously mounted remote before loading the other (packages/host/src/components/Loader.vue:66). Thus app-1 and app-2 mounting alternates in the same container.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.


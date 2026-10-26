---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
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

# 164 — horoshopodumaj/micro-frontends

## Repository overview

A Module Federation demonstration with Rspack and `@module-federation/enhanced`, with three sibling projects and no root workspace: `host` (React), `remote` (React) and `vue-remote` (Vue 3). Composition is chained, what the README calls nested federation `host → remote → vue_remote` (README.md:133). The host exposes nothing (host/module-federation.config.ts:6) and consumes only container `remote` (host/module-federation.config.ts:3-5); in the page content area beside a static sidebar menu, it renders `<RemoteContent/>` (host/src/App.tsx:3, 18-20). `remote` is simultaneously provider and consumer: it exposes `./RemoteContent` (remote/module-federation.config.ts:8) and consumes container `vue_remote` (remote/module-federation.config.ts:4-6). The exposed `RemoteContent` consists of a title and `CounterWrapper` (remote/src/RemoteContent.tsx:4-12), and this React wrapper mounts the remote Vue component (remote/src/CounterWrapper.tsx:8-13).

Cross-framework integration works by exposing both component `./Counter` and the `vue` runtime itself as `./vue` (vue-remote/module-federation.config.ts:4-7). `remote` imports both through federated names and mounts the component with the provider's `createApp` (remote/src/CounterWrapper.tsx:2-3, 9-10); `vue` is shared as a singleton and eager in the provider (vue-remote/module-federation.config.ts:10-13). The Vue component is a counter with local state (vue-remote/src/Counter.vue:1-22), without outward events.

Each unit also runs independently: `remote` renders its own `RemoteContent` on its page (remote/src/App.tsx:5-14), and `vue-remote` mounts its own `App.vue` (vue-remote/src/bootloader.ts:6-8). These mounts are internal to each unit and did not become relationships, as with the asynchronous `import("./App")`/`import("./bootloader")` bootstraps and remote types generated in `host/@mf-types/` (host/@mf-types/remote/apis.d.ts:3), recorded as `No` by the source code review. There is no inter-unit communication: data does not cross boundaries, and rendering is the only connection. Vue app cleanup returns `counter.unmount` without calling it (remote/src/CounterWrapper.tsx:12), a defect already recorded in previous reviews that does not change the relationship. All addresses are local development (`localhost:3001` and `localhost:3002`), with no deployment configuration in the snapshot.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | remote | vue-remote | host → remote | source → target | module-federation | Yes | Yes | remote/module-federation.config.ts:5 (`remotes` `vue_remote@http://localhost:3002/remoteEntry.js`); vue-remote/module-federation.config.ts:2 (`name: "vue_remote"`); vue-remote/module-federation.config.ts:3 (`filename: 'remoteEntry.js'`); vue-remote/module-federation.config.ts:5 (`exposes` `./Counter`); vue-remote/module-federation.config.ts:6 (`exposes` `./vue`); vue-remote/module-federation.config.ts:10-13 (`vue` singleton and eager); vue-remote/rspack.config.ts:33 (`publicPath: "http://localhost:3002/"`) | remote/src/CounterWrapper.tsx:10 |
| 2 | host | remote | host → remote | source → target | module-federation | Yes | Yes | host/module-federation.config.ts:4 (`remotes` `remote@http://localhost:3001/remoteEntry.js`); remote/module-federation.config.ts:2 (`name: "remote"`); remote/module-federation.config.ts:3 (`filename: 'remoteEntry.js'`); remote/module-federation.config.ts:8 (`exposes` `./RemoteContent`); remote/rspack.config.ts:33 (`publicPath: "http://localhost:3001/"`) | host/src/App.tsx:19 |

## Observations

**1. remote → vue-remote.** `remote` declares container `vue_remote` at `http://localhost:3002/remoteEntry.js` (remote/module-federation.config.ts:5). The target was resolved through `name: "vue_remote"` and `filename: 'remoteEntry.js'` in `vue-remote` configuration (vue-remote/module-federation.config.ts:2-3), and `publicPath` `http://localhost:3002/` (vue-remote/rspack.config.ts:33) confirms the address. The container name, with an underscore, differs from directory `vue-remote`, with a hyphen. Both consumed modules, `vue_remote/Counter` and `vue_remote/vue` (remote/src/CounterWrapper.tsx:2-3), are the two `exposes` entries (vue-remote/module-federation.config.ts:5-6). One comes as a component and the other as the runtime mounting it: the provider's `createApp` creates the app (remote/src/CounterWrapper.tsx:9) and `mount` places it in a React `div` (remote/src/CounterWrapper.tsx:10, 16). It is mounted through a framework API, but the target enters as a federated module, hence `host → remote`. Active = `Yes` through the `Yes` line remote/src/CounterWrapper.tsx:10, running only when `CounterWrapper` is rendered; this happens inside `RemoteContent` (remote/src/RemoteContent.tsx:10), both on `remote`'s own page and in the host through relationship 2.

**2. host → remote.** The host declares container `remote` at `http://localhost:3001/remoteEntry.js` (host/module-federation.config.ts:4). The target was resolved through `name: "remote"` and `filename: 'remoteEntry.js'` (remote/module-federation.config.ts:2-3), confirmed by `publicPath` `http://localhost:3001/` (remote/rspack.config.ts:33). The imported module, `remote/RemoteContent` (host/src/App.tsx:3), is the remote's only `exposes` (remote/module-federation.config.ts:8), and the host renders it in the content section (host/src/App.tsx:19). Active = `Yes` through that line. Because `RemoteContent` embeds `CounterWrapper`, the host page also shows the Vue component, but through `remote`: the host does not declare `vue_remote` (host/module-federation.config.ts:3-5), hence there is no direct host → vue-remote relationship.

## Summary

Relationships: 2 (host → remote: 2). Active: 2. Target outside the snapshot: 0.
Units without a relationship: none.


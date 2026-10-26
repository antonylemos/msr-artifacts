---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
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

# 299 — DATou-love/micro-frontEnd

## Repository overview

A minimal qiankun example with two projects without a workspace: a Vue 3/Vite host (`main-vue3`) and a Vue 2/Vue CLI sub-application (`sub-vue2`). At its entry point (main-vue3/index.html:11), the host registers two sub-applications in the orchestrator with `registerMicroApps` (main-vue3/src/main.ts:10-23), both in the same container `#subapp-viewport` and activated by path, then calls `start` with `strictStyleIsolation: true` (main-vue3/src/main.ts:26-36). The container is in the host's `App.vue`, alongside links `/sub-vue2` and `/sub-react16`, and the host's own `router-view` is hidden on those routes (main-vue3/src/App.vue:4-14, main-vue3/src/App.vue:26-32).

`sub-vue2` follows qiankun's contract without importing the package. It generates a UMD bundle `subVue2` with its own `chunkLoadingGlobal` (sub-vue2/vue.config.js:12-20), serves on port 8081 with CORS enabled (sub-vue2/vue.config.js:5-10), adjusts `__webpack_public_path__` when running inside qiankun and only mounts independently outside it (sub-vue2/src/main.js:20-29). It also exports `bootstrap`, `mount` and `unmount` (sub-vue2/src/main.js:32-46). The second sub-application, `sub-react16` (`//localhost:3000`, main-vue3/src/main.ts:17-22), has no code in the repository. The repository is a demonstration, with a single commit and only development configuration on `localhost`.

There is no inter-unit communication: `props` received by `mount` are used only to obtain `container` (sub-vue2/src/main.js:11, sub-vue2/src/main.js:36-38), and the source code review found no `initGlobalState`, events or `postMessage`. As recorded in classification, mounting under `strictStyleIsolation` was not verified: `render` looks for `#app` with `container.querySelector` (sub-vue2/src/main.js:16), and this might not reach content inside a shadow root. This is a possible execution defect and does not change relationships. The sub-app's `public/index.html` also has a `<div id="subapp-viewport">` before `#app` (sub-vue2/public/index.html:16-17), which has no role when it runs independently.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | main-vue3 | sub-vue2 | root-config → application | source → target | qiankun | Yes | Yes | sub-vue2/vue.config.js:6 (port 8081 of the dev server); sub-vue2/vue.config.js:15-18 (library `subVue2`, `libraryTarget: 'umd'`, `chunkLoadingGlobal`); sub-vue2/public/index.html:8 (`<base href="/sub-vue2/">`) | sub-vue2/src/main.js:32; sub-vue2/src/main.js:36; sub-vue2/src/main.js:41; sub-vue2/src/main.js:16; main-vue3/src/main.ts:3; main-vue3/src/main.ts:10; main-vue3/src/main.ts:26 |
| 2 | main-vue3 | sub-react16 | root-config → application | source → target | qiankun | No | Yes | — | main-vue3/src/main.ts:3; main-vue3/src/main.ts:10; main-vue3/src/main.ts:26 |

## Observations

**1. main-vue3 → sub-vue2.** The host registers `name: 'sub-vue2'`, `entry: '//localhost:8081'`, `container: '#subapp-viewport'` and `activeRule: '/sub-vue2'` (main-vue3/src/main.ts:11-16). The target has an explicit match in the snapshot: the registered name is the directory name, and the activation path matches the sub-app's `<base href="/sub-vue2/">` (sub-vue2/public/index.html:8) and its router's `base: '/sub-vue2'` (sub-vue2/src/router/index.js:12). Port 8081 (sub-vue2/vue.config.js:6) only confirms `entry`. Lifecycles exported by the sub-app and the `$mount` call in `render` (sub-vue2/src/main.js:16, sub-vue2/src/main.js:32-46) enter this relationship, together with the host's qiankun import, registration and `start`. The host registers the sub-app in an orchestrator rather than loading its modules, hence type `root-config → application`. Active is `Yes` because all code lines are `Yes` in the source code review. Execution uncertainty with `strictStyleIsolation`, described in the overview, does not change the row's values.

**2. main-vue3 → sub-react16.** This is the second entry in the same `registerMicroApps`: `name: 'sub-react16'`, `entry: '//localhost:3000'`, same container, `activeRule: '/sub-react16'` (main-vue3/src/main.ts:17-22). The host also has a link to that route (main-vue3/src/App.vue:7). No snapshot directory matches the name, path or port, so the target is written as it appears in registration and marked outside the snapshot: configuration identifies it as a separate application served at another address. There is no target configuration to cite. Active is `Yes` because registration is `Yes` code (main-vue3/src/main.ts:10), and the host's import and `start` lines also support this relationship.

## Summary

Relationships: 2 (root-config → application: 2). Active: 2. Target outside the snapshot: 1.
Units without a relationship: none.


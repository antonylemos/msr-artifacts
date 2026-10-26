---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-mount-export | sub-vue2/src/main.js:32 | sub-vue2 | runtime-composition | Yes | qiankun `bootstrap` lifecycle (sub-vue2/src/main.js:32-34), exported by the unit entry and consumed by host main-vue3, which registers `sub-vue2` with `entry: '//localhost:8081'` at main-vue3/src/main.ts:11-16 (dev server port at sub-vue2/vue.config.js:6; `umd` bundle at sub-vue2/vue.config.js:15-16). |
| src-mount-export | sub-vue2/src/main.js:36 | sub-vue2 | runtime-composition | Yes | Lifecycle `mount(props)` (sub-vue2/src/main.js:36-39) calls `render(props)`, mounting the app in the container received from the qiankun host; unit registered by the host at main-vue3/src/main.ts:11-16. |
| src-mount-export | sub-vue2/src/main.js:41 | sub-vue2 | runtime-composition | Yes | Lifecycle `unmount` (sub-vue2/src/main.js:41-46) destroys the Vue instance and clears the element when the host deactivates route `/sub-vue2` (main-vue3/src/main.ts:15). |
| src-mount-call | sub-vue2/src/main.js:16 | sub-vue2 | runtime-composition | Yes | `$mount(container ? container.querySelector('#app') : '#app')` inside `render` (sub-vue2/src/main.js:10-17): called by lifecycle `mount(props)` (sub-vue2/src/main.js:38), mounts the app in the container supplied by host main-vue3 (`container: '#subapp-viewport'` at main-vue3/src/main.ts:14; node at main-vue3/src/App.vue:11). Outside qiankun, the same line mounts the isolated app in `#app` (sub-vue2/src/main.js:27-29). |
| src-lifecycles | main-vue3/src/main.ts:3 | main-vue3 | runtime-composition | Yes | Imports qiankun’s `registerMicroApps` and `start`, used at main-vue3/src/main.ts:10-23 and main-vue3/src/main.ts:26-36; main.ts is the host entry (main-vue3/index.html:11). |
| src-lifecycles | main-vue3/src/main.ts:10 | main-vue3 | runtime-composition | Yes | `registerMicroApps([...])` (main-vue3/src/main.ts:10-23) registers `sub-vue2` (`entry: '//localhost:8081'`, `activeRule: '/sub-vue2'`) and `sub-react16` (`entry: '//localhost:3000'`, `activeRule: '/sub-react16'`), both in container `#subapp-viewport` (main-vue3/src/App.vue:11); `sub-react16` has no code in the snapshot. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | main-vue3/src/main.ts:26 | main-vue3 | runtime-composition | Yes | `start({ sandbox: { strictStyleIsolation: true } })` (main-vue3/src/main.ts:26-36) starts qiankun after registration at main-vue3/src/main.ts:10-23; the call is at entry module level (main-vue3/index.html:11). |

## Summary

Constructs participating in composition: 7 (runtime-composition: 7).

## Notes

- `sub-react16`, registered at main-vue3/src/main.ts:17-22 and linked at main-vue3/src/App.vue:7, is a target unit outside the snapshot (only URL `//localhost:3000`).
- There is no communication mechanism between units: the step 4 search (including `initGlobalState`, `postMessage`, `CustomEvent`, `addEventListener`, `localStorage`, `<iframe`, `customElements`, `import(`) found only main-vue3/src/main.ts:3, :10 and :26. The `props` received in `mount(props)` (sub-vue2/src/main.js:36) only carry `container`.
- The `matches.csv` has no `cfg-route-rewrites`, so the host `rewrites()` rule does not apply to this repository.

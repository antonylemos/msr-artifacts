---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 164 — horoshopodumaj/micro-frontends

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | host/@mf-types/remote/apis.d.ts:3 | host | none | No | `typeof import('remote/RemoteContent')` is a conditional type in a generated Module Federation DTS declaration file (host/@mf-types/index.d.ts:1-22), used only by TypeScript through `paths` (host/tsconfig.json:15-17); it loads nothing at runtime. Actual loading is the static import at host/src/App.tsx:3 (manual row). |
| src-mount-call | remote/src/CounterWrapper.tsx:10 | remote | runtime-composition | Yes | `counter.mount(containerRef.current)` mounts, within a React component, the Vue app created at remote/src/CounterWrapper.tsx:9 with `createApp(Counter)`; `Counter` and `createApp` come from `vue_remote/Counter` and `vue_remote/vue` (remote/src/CounterWrapper.tsx:2-3), exposed by unit vue-remote (vue-remote/module-federation.config.ts:4-7) and resolved by remote `vue_remote@http://localhost:3002/remoteEntry.js` (remote/module-federation.config.ts:5). Active: CounterWrapper is rendered at remote/src/RemoteContent.tsx:10, which is exposed (remote/module-federation.config.ts:8) and rendered by remote/src/App.tsx:9 (entry remote/src/index.ts:1). |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | host/src/App.tsx:19 | host | runtime-composition | Yes | Renders `<RemoteContent/>`, a component of unit remote, in the host content section (host/src/App.tsx:18-20); the component comes from static import `remote/RemoteContent` at host/src/App.tsx:3, resolved by remote `remote@http://localhost:3001/remoteEntry.js` (host/module-federation.config.ts:4) and exposed at remote/module-federation.config.ts:8. App is loaded by host/src/index.ts:1 and rendered at host/src/App.tsx:24-25. |

## Summary

Constructs participating in composition: 2 (runtime-composition: 2).

## Notes

- Composition is chained: host renders `RemoteContent` from unit remote, and this component mounts the Vue `Counter` from unit vue-remote. The full relationship is recorded in the composition review (protocol section 3.4.5).
- Unmounting at remote/src/CounterWrapper.tsx:12 returns `() => counter.unmount` without calling the function, so cleanup does not unmount the Vue app; this is a subsequent mounting step and did not become a row.
- The `import("./App")`/`import("./bootloader")` calls at host/src/index.ts:1, remote/src/index.ts:1 and vue-remote/src/index.ts:1 are internal to their own units and not included in step 4; they did not become rows.
- The step 4 search found no custom elements, iframes, `postMessage`, `CustomEvent`, `BroadcastChannel`, `loadRemote` calls or script injection; there is no communication mechanism between units.

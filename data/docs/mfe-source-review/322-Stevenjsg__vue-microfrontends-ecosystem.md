---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.vue:6 | apps/shell | dynamic-loading | Yes | `defineAsyncComponent(() => import('dashboard/Widget'))` (apps/shell/src/App.vue:5-7, `defineAsyncComponent` imported from `vue` at :2) loads at runtime the `./Widget` exposed by unit apps/dashboard (`./src/components/WidgetDinero.vue`, apps/dashboard/vite.config.ts:21-23), through remote `dashboard` → `http://localhost:5001/assets/remoteEntry.js` (apps/shell/vite.config.ts:22); type declared at apps/shell/src/vite-env.d.ts:3-7. Active: `App.vue` is mounted by the shell entry (apps/shell/src/main.ts:3-5, apps/shell/index.html:11) and renders the component at :23. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.vue:23 | apps/shell | runtime-composition | Yes | `<DashboardWidget />` renders in the host the `Widget` from apps/dashboard, loaded by `defineAsyncComponent` at apps/shell/src/App.vue:5-7, inside `<Suspense>` with fallback "Cargando microfrontend..." (**English translation:** "Loading microfrontend...") (apps/shell/src/App.vue:21-28); `App.vue` is the root component mounted at apps/shell/src/main.ts:5. |

## Summary

Constructs participating in composition: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notes

- Remotes `cms` and `kanban` are declared in shell (apps/shell/vite.config.ts:23-24), and apps/cms and apps/kanban expose `./Cms` and `./Kanban` (apps/cms/vite.config.ts:19-21, apps/kanban/vite.config.ts:19-21), but no shell code imports `cms/...` or `kanban/...`: the snapshot’s only `import()` is at apps/shell/src/App.vue:6.
- The step 4 search (`*.ts`, `*.vue`, `*.html`, `*.js`) found no `customElements`, `<iframe>`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `dispatchEvent`, `addEventListener` or script loading; the remotes have no communication code (apps/cms/src/App.vue, apps/kanban/src/App.vue and apps/dashboard/src/components/WidgetDinero.vue have only templates and local state).
- Shell also uses `MyButton` and `setupMsg` from packages/ui-kit (apps/shell/src/App.vue:3, :14-15), through a static workspace import; packages/ui-kit is `No` in the structural review, so this is not inter-unit composition.

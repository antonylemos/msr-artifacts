---
schema: 1
id: 1135167821
full_name: PedroHugo11/mf-dashboard-module-federation
commit: 184ec1b1762b6ea93f1f8f8de44118412a9ab6a8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 123 — PedroHugo11/mf-dashboard-module-federation

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | shell/src/App.tsx:3 | shell | dynamic-loading | Yes | `React.lazy(() => import("weather/Widget"))` loads module `./Widget` exposed by unit mfe-weather (mfe-weather/vite.config.ts:15-18), resolved by remote `weather` at shell/vite.config.ts:16; the component is rendered at shell/src/App.tsx:19, and App is mounted by shell/src/main.tsx:5-7, the entry of shell/index.html:11. |
| src-remote-import | shell/src/App.tsx:4 | shell | dynamic-loading | Yes | `React.lazy(() => import("counter/Widget"))` loads module `./Widget` exposed by unit mfe-counter (mfe-counter/vite.config.ts:15-18), resolved by remote `counter` at shell/vite.config.ts:17; the component is rendered at shell/src/App.tsx:25, and App is mounted by shell/src/main.tsx:5-7, the entry of shell/index.html:11. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | shell/src/App.tsx:19 | shell | runtime-composition | Yes | Renders `<WeatherWidget />`, a component of unit mfe-weather, inside `Suspense` + `WidgetCard` (shell/src/App.tsx:17-21); the component comes from `React.lazy` at shell/src/App.tsx:3. |
| manual | shell/src/App.tsx:25 | shell | runtime-composition | Yes | Renders `<CounterWidget />`, a component of unit mfe-counter, inside `Suspense` + `WidgetCard` (shell/src/App.tsx:23-27); the component comes from `React.lazy` at shell/src/App.tsx:4. |

## Summary

Constructs participating in composition: 4 (dynamic-loading: 2, runtime-composition: 2).

## Notes

- The remotes do not use `import()` internally: `./Widget` points to `src/bootstrap.tsx`, which only re-exports the widget (mfe-weather/src/bootstrap.tsx:1-2, mfe-counter/src/bootstrap.tsx:1-2); the remotes’ `main.tsx` files mount the widget in isolation (mfe-weather/src/main.tsx:4-6, mfe-counter/src/main.tsx:4-6). The step 4 searches found no custom elements, iframes, injected scripts or communication mechanisms.
- The remote URLs are fixed at `localhost` on ports 4173 (weather) and 4174 (counter) (shell/vite.config.ts:16-17), different from the remotes’ `server.port` ports (mfe-weather/vite.config.ts:7, mfe-counter/vite.config.ts:7); they correspond to the remotes’ `vite preview` in README.md:65-73 order (without a specific port in `preview`), which does not change composition.

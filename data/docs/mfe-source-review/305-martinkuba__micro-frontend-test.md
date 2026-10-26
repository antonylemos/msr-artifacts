---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 305 — martinkuba/micro-frontend-test

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | packages/shell/src/App.tsx:6 | packages/shell | dynamic-loading | Yes | `React.lazy(() => import('mainContent/MainContent'))` loads the module exposed by remote `mainContent` (packages/main-content/webpack.config.js:34-36, `./MainContent`), declared at packages/shell/webpack.config.js:35 (`mainContent@http://localhost:3001/remoteEntry.js`); rendered at packages/shell/src/App.tsx:201; `App` mounted at packages/shell/src/bootstrap.tsx:14-19, loaded by packages/shell/src/index.tsx:2 (`entry` at packages/shell/webpack.config.js:9) |
| src-remote-import | packages/shell/src/App.tsx:7 | packages/shell | dynamic-loading | No | Commented line (`//`); rendering of `<Sidebar />` is also commented out (packages/shell/src/App.tsx:206-214), and remote `sidebar` is commented out at packages/shell/webpack.config.js:36 |
| src-async-bootstrap | packages/shell/src/index.tsx:2 | packages/shell | dynamic-loading | No | `import('./bootstrap')` loads the shell’s own bootstrap (packages/shell/src/bootstrap.tsx); internal to the unit |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | packages/shell/src/App.tsx:201 | packages/shell | runtime-composition | Yes | `<MainContent />` renders in the host the component of remote `mainContent` (loaded by `React.lazy` at packages/shell/src/App.tsx:6), inside `ErrorBoundary` and `Suspense` (packages/shell/src/App.tsx:199-203) |

## Summary

Constructs participating in composition: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notes

- Remote `sidebar` (packages/sidebar) does not participate in snapshot composition: import, rendering and remote declaration are commented out (packages/shell/src/App.tsx:7 and 206-214; packages/shell/webpack.config.js:36). The type declaration at packages/shell/src/remotes.d.ts:7-10 loads nothing.
- Each unit initializes Grafana Faro on its own (packages/shell/src/bootstrap.tsx:7; packages/main-content/src/MainContent.tsx:108-110 with `isolate: true` at packages/main-content/src/faro.ts:28), and `@grafana/faro-web-sdk` is a `shared` singleton (packages/shell/webpack.config.js:41; packages/main-content/webpack.config.js:40). This is telemetry sent to distinct collectors rather than an inter-unit communication mechanism; it did not become a row.
- The step 4 search found no custom elements, iframes, injected scripts or inter-unit events/messages.

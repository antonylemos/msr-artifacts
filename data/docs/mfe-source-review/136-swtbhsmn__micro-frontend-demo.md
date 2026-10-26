---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 136 — swtbhsmn/micro-frontend-demo

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | app1/src/App.jsx:2 | app1 | dynamic-loading | Yes | `React.lazy(() => import('app2/RemoteApp'))` loads at runtime the module exposed by unit app2 (app2/webpack.config.js:31-32), resolved by remote `app2@http://localhost:3002/remoteEntry.js` (app1/webpack.config.js:30-31). Active: app1/src/index.js:1 → app1/src/bootstrap.js:3,6 → app1/src/App.jsx:9. |
| src-async-bootstrap | app1/src/index.js:1 | app1 | dynamic-loading | No | `import('./bootstrap')` loads a local file of the unit itself (app1/src/bootstrap.js); internal construct. |
| src-async-bootstrap | app2/src/index.js:1 | app2 | dynamic-loading | No | `import('./bootstrap')` loads a local file of the unit itself (app2/src/bootstrap.js); internal construct. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | app1/src/App.jsx:9 | app1 | runtime-composition | Yes | Renders in the host, inside `Suspense` (app1/src/App.jsx:8-10), unit app2’s `RemoteApp` component, obtained through `React.lazy` at app1/src/App.jsx:2; the component is defined at app2/src/RemoteApp.jsx:3-5. App is rendered at app1/src/bootstrap.js:6. |

## Summary

Constructs participating in composition: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notes

- The step 4 search found no custom elements, iframes, script loading, `postMessage`, `CustomEvent` or `BroadcastChannel`; there is no communication mechanism between the units in the snapshot.
- Rendering `RemoteApp` at app2/src/bootstrap.js:6 is the isolated mode of unit app2 itself and does not become a row.

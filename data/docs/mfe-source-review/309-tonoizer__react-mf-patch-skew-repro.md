---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | host/src/App.jsx:3 | host | dynamic-loading | Yes | `lazy(() => import('remote_a/App'))` loads the `./App` exposed by unit remote_a (remote_a/vite.config.js:22-24), declared as a remote at host/vite.config.js:22-26 (`http://localhost:5001/remoteEntry.js`); `RemoteA` is rendered at host/src/App.jsx:76; active chain host/index.html:9 → host/src/main.jsx:3,7 → host/src/App.jsx |
| src-remote-import | host/src/App.jsx:4 | host | dynamic-loading | Yes | `lazy(() => import('remote_b/App'))` loads the `./App` exposed by unit remote_b (remote_b/vite.config.js:22-24), declared as a remote at host/vite.config.js:27-31 (`http://localhost:5002/remoteEntry.js`); `RemoteB` is rendered at host/src/App.jsx:88; same entry chain from host/src/main.jsx:3,7 |
| src-remote-import | remote_a/src/App.jsx:3 | remote_a | dynamic-loading | Yes | `lazy(() => import('remote_c/App'))` loads the `./App` exposed by unit remote_c (remote_c/vite.config.js:22-24), declared as a remote at remote_a/vite.config.js:26-30 (`http://localhost:5003/remoteEntry.js`); `RemoteC` is rendered at remote_a/src/App.jsx:12; the file is the standalone entry (remote_a/src/main.jsx:3,5) and exposed module `./App` (remote_a/vite.config.js:23) |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | host/src/App.jsx:76 | host | runtime-composition | Yes | Renders `<RemoteA />`, a component of unit remote_a, inside `ErrorBoundary` + `Suspense` (host/src/App.jsx:74-78); the component comes from `lazy` at host/src/App.jsx:3; `onError={setAErr}` is a host callback for ErrorBoundary |
| manual | host/src/App.jsx:88 | host | runtime-composition | Yes | Renders `<RemoteB />`, a component of unit remote_b, inside `ErrorBoundary` + `Suspense` (host/src/App.jsx:86-90); the component comes from `lazy` at host/src/App.jsx:4 |
| manual | remote_a/src/App.jsx:12 | remote_a | runtime-composition | Yes | Renders `<RemoteC />`, a component of unit remote_c, inside `Suspense` (remote_a/src/App.jsx:11-13); the component comes from `lazy` at remote_a/src/App.jsx:3 |

## Summary

Constructs participating in composition: 6 (dynamic-loading: 3, runtime-composition: 3).

## Notes

- remote_a is a nested host: loaded by host (host/src/App.jsx:3) and loads remote_c (remote_a/src/App.jsx:3), as described at README.md:12.
- `ShareDump` (host/src/App.jsx:6-57) only reads federation runtime globals (`__mf_module_cache__`, `__FEDERATION__`) and writes `__SKEW_DUMP__` for Playwright (host/src/App.jsx:46); it neither loads nor communicates with another unit and did not become a row. The same applies to `__SKEW_CRASHES__` (host/src/App.jsx:109-114).
- The step 4 search found no other construct; `scripts/capture.mjs` is not a unit.

---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 257 — ral-facilities/scigateway

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:50 | dependencies | single-spa | 6.0.3 | single-spa | Yes | src/state/actions/loadMicroFrontends.tsx:2 and 31-49 (`import * as singleSpa from 'single-spa'`; `singleSpa.registerApplication(name, () => loadReactApp(name), (location) => ...)`); src/state/actions/scigateway.actions.tsx:8, 69, 363 and 391/401/408 (imports `single-spa` and `./loadMicroFrontends`; `loadMicroFrontends.init(settings.plugins)`; `singleSpa.start()`); src/App.tsx:9-11 and 50 (imports `configureSite` and calls `dispatch(configureSite())`); src/main.tsx:3 and 9 (imports `./App` and renders); index.html:32 (`<script type="module" src="/src/main.tsx">`, Vite entry point) |

## Notes

- `server/e2e-plugin/main.js:9`, in `same_package_matches`, is a compiled bundle of the demonstration plugin (another repository, according to `server/README.md`), with embedded single-spa code; it is not use of this package by the host and was not used as evidence.
- Outside the lists, grep for `single-spa` also finds `src/state/middleware/scigateway.middleware.tsx:6` and 153-156 (`getAppStatus`, `triggerAppChange`) and `src/routing/routing.component.tsx:6` and 165 (`unloadApplication`), besides test mocks (`src/setupTests.ts:32`).


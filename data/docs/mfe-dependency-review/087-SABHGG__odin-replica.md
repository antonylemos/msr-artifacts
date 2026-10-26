---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
inspection:
  output: data/inspections/mfe-dependencies-001
  version: "1"
  config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Dependencies

| Manifest:line | Section | Package | Version | Technology | Configured | Evidence (artifact:line) |
|---|---|---|---|---|---|---|
| package.json:13 | dependencies | single-spa | ^6.0.3 | single-spa | Yes | src/index.js:3 (`import { registerApplication, start, triggerAppChange } from 'single-spa'`); src/index.js:56-60 and 63-100 (`registerApplication('odin-react', ...)` and `registerApplication('leadocs-angular', ...)` loading the remote bundle); src/index.js:103 (`start()`); package.json:19-20 (`react-scripts start`/`build`, whose entry point is `src/index.js`) |
| package.json:14 | dependencies | single-spa-react | ^6.0.2 | single-spa | Yes | src/root.app.js:3 and 6-14 (`import singleSpaReact from 'single-spa-react'`; `singleSpaReact({ React, ReactDOM, rootComponent: App, ... })`); src/index.js:4 and 58 (imports `./root.app` and passes it as lifecycles for `odin-react`) |

## Notes

- The inspection lists give the same four occurrences to both rows; `src/index.js` supports only `single-spa`, and `src/root.app.js` supports only `single-spa-react`. Each row's evidence was taken from its own package's import (grep for `single-spa` in the snapshot's `.js`/`.json` files).
- `src/index.js` is the entry point by CRA convention (`react-scripts`), with no build configuration in the snapshot.


---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | src/index.js:56-60 and 103 (`src/index.*` entry by CRA convention; registers `odin-react` and calls `start()`); public/index.html:31 (`<div id="root">`, CRA HTML template) | package.json:20 (`"build": "react-scripts build"`, without its own configuration file) | — | — | Yes | CRA application with its own entry and build through `react-scripts`. |
| public | public/index.html | — | — | — | — | — | No | HTML template for the root application, used by the `react-scripts` build of row `.`. |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 2`: the root (single-spa host with the local `odin-react` unit in the same bundle) and the external remote `leadocs-angular`, loaded from `LEAPDOCS_BUNDLE_URL` (src/index.js:9 and 63-100). The remote is not in the snapshot and does not become a row.
- `package.json` appears as `workspace-config` in `artifacts.csv`, but does not declare `workspaces` (package.json:1-45) and there are no `ws-*`, `ops-*` or `ci-*` occurrences in `matches.csv`.

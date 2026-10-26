---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 040 — AlanOlimpio/list

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json;webpack.config.js | package.json:1-11 (application manifest) | webpack.config.js:5 (entry src/index.js); src/index.js:1 (loads bootstrap); src/bootstrap.js:7-15 (mounts React) | webpack.config.js:4-11 (own configuration and output); package.json:9 (`webpack --mode production`) | — | vercel.json:5-11 (static build with dist output) | Yes | Root React application with its own entry, webpack build and hosting configuration. |
| public | public/index.html | — | — | — | — | — | No | HTML template directory for the root application, referenced in webpack.config.js:41-43. |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records frontend_units: 2: ListApp and RegisterApp. Only ListApp is in the snapshot; RegisterApp is external (webpack.config.js:52-54) and does not become a table row. Therefore there is one local frontend unit.
- package.json:5 declares main as index.js, but the entry used by the build is explicitly in webpack.config.js:5: src/index.js.

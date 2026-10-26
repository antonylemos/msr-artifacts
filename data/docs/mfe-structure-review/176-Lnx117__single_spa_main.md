---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;vite.config.ts | package.json | index.html:20 (`<script type="module" src="/src/main.ts">`, Vite entry page in the directory) | vite.config.ts:5-16 (`defineConfig` with `vitePluginSingleSpa`); package.json:8 (`vite build`) | — | — | Yes | single-spa root config with its own `index.html` entry and Vite build |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 3`: the root config and the microfrontends `menu` and `base`, which are outside the snapshot and appear only as URLs in `.envtest:8` and `.envtest:11` (`localhost:9083` and `localhost:9081`), loaded by `src/main.ts:15` and `:23`.
- `artifacts.csv` marks `package.json` as `workspace-config`, but the file has no `workspaces` field (`package.json:1-22`) and `matches.csv` has no `ws-*` occurrences; there is no workspace.
- No `ops-*` or `ci-*` occurrence in `matches.csv` and no Dockerfile, workflow or hosting configuration in the snapshot (6 files).

---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 284 — RafaM-dev/hostRepo

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;vite.config.ts | package.json | index.html:11 (`<script type="module" src="/src/main.tsx">`); src/main.tsx:7-13 (`createRoot(...).render(<App />)`) | vite.config.ts:5-17 (Vite configuration with `react()` and `federation(...)`); package.json:8 (`tsc -b && vite build`) | — | — | Yes | The snapshot’s only React + Vite application (the host), with its own entry and build |

## Summary

Frontend applications in the snapshot: 1 (.).

## Notes

- The classification records `frontend_units: 2`: the host and the remote `mf-remoteDetails`, which is outside the snapshot and appears only in vite.config.ts:12 (`http://localhost:5001/assets/remoteEntry.js`).
- The `workspace-config` marker for `package.json` and the `tsconfig*.json` files in `artifacts.csv` does not correspond to a workspace declaration: `package.json:1-40` has no `workspaces`, and `matches.csv` has no `ws-*` occurrences.
- The empty file `remote-root@0.0.0` at the root is neither a unit nor a manifest.
- No `ops-*` or `ci-*` occurrence in `matches.csv` and no Dockerfile, workflow or hosting configuration in the snapshot.

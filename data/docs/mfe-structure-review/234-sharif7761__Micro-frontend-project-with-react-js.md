---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-22 (scripts manifest, no dependencies) | — | — | — | — | No | Root with neither entry nor build of its own; the scripts only enter the subdirectories (`package.json:7-14`). |
| common_simple | common_simple/package.json;common_simple/rsbuild.config.ts | common_simple/package.json:1-23 (own manifest) | common_simple/src/index.tsx:1-10 (conventional Rsbuild entry; mounts React) | common_simple/rsbuild.config.ts:5-31 (own configuration); common_simple/package.json:8 (`rsbuild build`) | — | — | Yes | Demonstration React application with its own entry and Rsbuild build. |
| core_simple | core_simple/package.json;core_simple/rsbuild.config.ts | core_simple/package.json:1-24 (own manifest) | core_simple/src/index.tsx:1 (conventional Rsbuild entry, `import('./bootstrap')`); core_simple/src/bootstrap.tsx:5-10 (mounts React) | core_simple/rsbuild.config.ts:5-34 (own configuration); core_simple/package.json:8 (`rsbuild build`) | — | — | Yes | React application with its own entry and Rsbuild build. |
| users_simple | users_simple/package.json;users_simple/rsbuild.config.ts | users_simple/package.json:1-24 (own manifest) | users_simple/src/index.tsx:1 (conventional Rsbuild entry, `import('./bootstrap')`); users_simple/src/bootstrap.tsx:5-10 (mounts React) | users_simple/rsbuild.config.ts:5-36 (own configuration); users_simple/package.json:8 (`rsbuild build`) | — | — | Yes | React application with its own entry and Rsbuild build. |

## Summary

Frontend applications in the snapshot: 3 (common_simple, core_simple, users_simple).

## Notes

- The `package.json` and `tsconfig.json` files appear as `workspace-config` in `artifacts.csv`, but no `package.json` declares `workspaces` and there is no `pnpm-workspace.yaml`, `lerna.json`, `turbo.json` or `nx.json`. `matches.csv` has no `ws-*`, `ops-*` or `ci-*` occurrences, and the snapshot has no Dockerfile, workflow or hosting configuration.
- Each project has `public/index.html`, but no `rsbuild.config.ts` defines `html.template`; the cited entry is the `src/index.tsx` convention.
- N = 3 matches the classification’s `frontend_units: 3`. `common_simple` is the federated component library, but has its own demonstration app, so it counts as an application boundary here.

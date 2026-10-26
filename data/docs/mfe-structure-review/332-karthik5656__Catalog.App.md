---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 332 — karthik5656/Catalog.App

## Workspace

No workspace declaration.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| src/frontend | src/frontend/package.json | src/frontend/package.json:1-21 (manifest with only the placeholder `test` script and `packageManager`) | — | — | — | — | No | Only `package.json`, with neither entry nor build; the apps in `apps/` have their own manifests. |
| src/frontend/apps/ui-catalog | src/frontend/apps/ui-catalog/package.json;src/frontend/apps/ui-catalog/vite.config.ts | src/frontend/apps/ui-catalog/package.json:1-33 (own manifest) | src/frontend/apps/ui-catalog/index.html:11 (`/src/main.tsx` entry); src/frontend/apps/ui-catalog/src/main.tsx:7 (`createRoot(...).render`) | src/frontend/apps/ui-catalog/vite.config.ts:74-110 (own configuration); src/frontend/apps/ui-catalog/package.json:8 (`tsc -noemit && vite build`) | — | src/frontend/apps/ui-catalog/Dockerfile:1-23 (build with pnpm and nginx); .github/workflows/ci-pipeline.yml:238-247 (job builds and publishes image `ui-catalog`) | Yes | React application (shell) with its own entry and Vite build. |
| src/frontend/apps/ui-catalog-consumer | src/frontend/apps/ui-catalog-consumer/package.json;src/frontend/apps/ui-catalog-consumer/vite.config.ts | src/frontend/apps/ui-catalog-consumer/package.json:1-33 (own manifest) | src/frontend/apps/ui-catalog-consumer/index.html:11 (`/src/main.tsx` entry); src/frontend/apps/ui-catalog-consumer/src/main.tsx:7 (`createRoot(...).render`) | src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53 (own configuration); src/frontend/apps/ui-catalog-consumer/package.json:8 (`tsc --noemit && vite build`) | — | src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23 (build with pnpm and nginx); .github/workflows/ci-pipeline.yml:250-259 (job builds and publishes image `ui-catalog-consumer`) | Yes | React application (remote) with its own entry and Vite build. |
| src/frontend/apps/ui-catalog-merchant | src/frontend/apps/ui-catalog-merchant/package.json;src/frontend/apps/ui-catalog-merchant/vite.config.ts | src/frontend/apps/ui-catalog-merchant/package.json:1-33 (own manifest) | src/frontend/apps/ui-catalog-merchant/index.html:11 (`/src/main.tsx` entry); src/frontend/apps/ui-catalog-merchant/src/main.tsx:7 (`createRoot(...).render`) | src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53 (own configuration); src/frontend/apps/ui-catalog-merchant/package.json:8 (`tsc --noemit && vite build`) | — | src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23 (build with pnpm and nginx); .github/workflows/ci-pipeline.yml:262-271 (job builds and publishes image `ui-catalog-merchant`) | Yes | React application (remote) with its own entry and Vite build. |

## Summary

Frontend applications in the snapshot: 3 (src/frontend/apps/ui-catalog, src/frontend/apps/ui-catalog-consumer, src/frontend/apps/ui-catalog-merchant).

## Notes

- N = 3 matches the classification’s `frontend_units: 3`.
- There is no `pnpm-workspace.yaml`, `turbo.json`, `nx.json`, `lerna.json` or `workspaces` in `package.json`; each app has its own `pnpm-lock.yaml`. The `tsconfig*.json` files marked as `workspace-config` in `artifacts.csv` are each app’s TypeScript configurations, not a workspace declaration.
- The .NET backends in `src/backend/` also have a Dockerfile and CI job, but are not in `units.csv` and are not frontend.

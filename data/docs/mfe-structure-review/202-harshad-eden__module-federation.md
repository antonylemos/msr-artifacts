---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 202 — harshad-eden/module-federation

## Workspace

`pnpm-workspace.yaml:1-3` (`packages:` with `apps/*` and `packages/*`); `package.json:6-9` (`workspaces` with the same patterns).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-43 (workspace manifest `insurance-platform`, `private`) | — | — (package.json:16-22: `build` only delegates to packages and apps through `cd … && pnpm run build`) | — | — | No | Workspace coordination root, with neither UI entry nor UI build configuration of its own. |
| apps/product-config | apps/product-config/package.json;apps/product-config/vite.config.ts | apps/product-config/package.json:1-9 (manifest `@insurance/product-config`) | apps/product-config/index.html:10-11 (`#root` and `/src/main.tsx`); apps/product-config/src/main.tsx:7-13 (mounts React) | apps/product-config/vite.config.ts:5-33 (own configuration, port 3004); apps/product-config/package.json:7 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | React application with its own entry and Vite build. |
| apps/sales-portal | apps/sales-portal/package.json;apps/sales-portal/vite.config.ts | apps/sales-portal/package.json:1-9 (manifest `@insurance/sales-portal`) | apps/sales-portal/index.html:10-11 (`#root` and `/src/main.tsx`); apps/sales-portal/src/main.tsx:7-13 (mounts React) | apps/sales-portal/vite.config.ts:5-33 (own configuration, port 3001); apps/sales-portal/package.json:7 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | React application with its own entry and Vite build. |
| apps/shell | apps/shell/package.json;apps/shell/vite.config.ts | apps/shell/package.json:1-9 (manifest `@insurance/shell`) | apps/shell/index.html:10-11 (`#root` and `/src/main.tsx`); apps/shell/src/main.tsx:7-13 (mounts React) | apps/shell/vite.config.ts:5-26 (own configuration, port 3000); apps/shell/package.json:7 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | React application with its own entry and Vite build. |
| apps/underwriter-portal | apps/underwriter-portal/package.json;apps/underwriter-portal/vite.config.ts | apps/underwriter-portal/package.json:1-9 (manifest `@insurance/underwriter-portal`) | apps/underwriter-portal/index.html:10-11 (`#root` and `/src/main.tsx`); apps/underwriter-portal/src/main.tsx:7-13 (mounts React) | apps/underwriter-portal/vite.config.ts:5-33 (own configuration, port 3002); apps/underwriter-portal/package.json:7 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | React application with its own entry and Vite build. |
| packages/shared-types | packages/shared-types/package.json | packages/shared-types/package.json:1-17 (manifest `@insurance/shared-types`, `main: dist/index.js`) | — | packages/shared-types/package.json:8 (`tsc`, library) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Shared types package, with no application entry. |
| packages/shared-ui | packages/shared-ui/package.json | packages/shared-ui/package.json:1-39 (manifest `@insurance/shared-ui`, `main: dist/index.js`) | — | packages/shared-ui/package.json:8 (`tsc` and `tailwindcss`, library) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Shared component library, with no application entry. |

## Summary

Frontend applications in the snapshot: 4 (apps/product-config, apps/sales-portal, apps/shell, apps/underwriter-portal).

## Notes

- N = 4 matches the classification’s `frontend_units: 4`.
- The `ops-hosting` occurrences are all in `DEPLOYMENT_GUIDE.md` (for example `:35-46`, `:136-142`, `:205-207`), which describes Vercel projects per app and `vercel.json` per directory; no `vercel.json`, Dockerfile or workflow exists in the snapshot, so the Deploy cells remain `—`. The guide also cites `apps/employer-portal` and `apps/service-provider`, missing from the snapshot.
- The `ops-cors` occurrences (`apps/*/vite.config.ts:28`) are headers for the remotes’ development server, not a deployment artifact.

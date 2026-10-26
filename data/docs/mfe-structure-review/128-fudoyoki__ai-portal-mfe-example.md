---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 128 — fudoyoki/ai-portal-mfe-example

## Workspace

`package.json:5-8` declares `workspaces` with `apps/*` and `packages/*` (npm workspaces); `turbo.json:3-25` defines Turborepo tasks over this workspace.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-25 (workspace manifest) | — | — | — | docker-compose.yml:3-58 (orchestrates subdirectory services `shell`, `mfe-dashboard` and `bff`, not an artifact of this directory) | No | Workspace coordination root; `package.json:10-11` only delegates `dev`/`build` to `turbo run`. |
| apps/bff | apps/bff/package.json | apps/bff/package.json:1-32 (own manifest) | — | apps/bff/package.json:6 (`nest build`); apps/bff/nest-cli.json:1-8 (Nest CLI configuration, `sourceRoot: src`) | package.json:6 (`apps/*`) | apps/bff/Dockerfile:2-16 (own image with `npm run build`); docker-compose.yml:40-43 (`bff` service) | No | NestJS server (BFF), not frontend. |
| apps/mfe-dashboard | apps/mfe-dashboard/package.json;apps/mfe-dashboard/vite.config.ts | apps/mfe-dashboard/package.json:1-31 (own manifest) | apps/mfe-dashboard/index.html:10-11 (`/src/main.tsx` entry); apps/mfe-dashboard/src/main.tsx:17-26 (mounts `DashboardApp` with React in standalone mode) | apps/mfe-dashboard/vite.config.ts:8-56 (own configuration); apps/mfe-dashboard/package.json:8 (`tsc && vite build`) | package.json:6 (`apps/*`) | apps/mfe-dashboard/Dockerfile:12-33 (build of only this app and nginx image); docker-compose.yml:19-22 (`mfe-dashboard` service) | Yes | React application with its own entry and Vite build and a separate deployment image. |
| apps/shell | apps/shell/package.json;apps/shell/vite.config.ts | apps/shell/package.json:1-32 (own manifest) | apps/shell/index.html:10-11 (`/src/main.tsx` entry); apps/shell/src/main.tsx:8-16 (mounts `App` with React) | apps/shell/vite.config.ts:25-76 (own configuration); apps/shell/package.json:8 (`tsc && vite build`) | package.json:6 (`apps/*`) | apps/shell/Dockerfile:12-33 (build of only this app and nginx image); docker-compose.yml:5-8 (`shell` service) | Yes | React application with its own entry and Vite build and a separate deployment image. |
| packages/shared-types | packages/shared-types/package.json | packages/shared-types/package.json:1-25 (own manifest) | — | packages/shared-types/package.json:17 (`tsup src/index.ts`, library build) | package.json:7 (`packages/*`) | — | No | Shared types package, with no application entry. |
| packages/ui-kit | packages/ui-kit/package.json | packages/ui-kit/package.json:1-35 (own manifest) | — | packages/ui-kit/package.json:18 (`tsup src/index.ts`, library build) | package.json:7 (`packages/*`) | — | No | Shared component library, with no application entry. |

## Summary

Frontend applications in the snapshot: 2 (apps/mfe-dashboard, apps/shell).

## Notes

- N = 2 matches the classification’s `frontend_units: 2`. The Chat, Tools and Admin remotes appear only as comments (apps/shell/vite.config.ts:32-35; docker-compose.yml:29-37) and have no directory in the snapshot.
- The markers in `units.csv` do not include the `index.html` files of `apps/shell` and `apps/mfe-dashboard`, although the files exist and are the Vite entry.
- The Dockerfiles of `apps/shell` and `apps/mfe-dashboard` also build `packages/shared-types` and `packages/ui-kit` (Dockerfile:18-19), but the final image copies only the app’s own `dist` (Dockerfile:26).

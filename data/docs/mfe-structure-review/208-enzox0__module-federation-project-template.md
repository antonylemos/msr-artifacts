---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 208 — enzox0/module-federation-project-template

## Workspace

`pnpm-workspace.yaml:1-3` (`packages:` with `apps/*` and `packages/*`), orchestrated by `turbo.json:4-19`.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-43 (workspace root manifest) | — | — (package.json:12 `turbo run build` only orchestrates members) | — | — | No | Workspace coordination root, with neither UI entry nor build of its own. |
| apps/admin-mf | apps/admin-mf/module-federation.config.d.ts;apps/admin-mf/module-federation.config.js;apps/admin-mf/module-federation.config.ts;apps/admin-mf/package.json;apps/admin-mf/vite.config.d.ts;apps/admin-mf/vite.config.js;apps/admin-mf/vite.config.ts | apps/admin-mf/package.json:1-29 | apps/admin-mf/index.html:10 (`/src/bootstrap.tsx`); apps/admin-mf/src/bootstrap.tsx:5-9 (mounts the React UI) | apps/admin-mf/vite.config.ts:6-18 (own configuration, port 3003); apps/admin-mf/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/admin-mf/Dockerfile:9-10 (nginx image with `apps/admin-mf/dist`) | Yes | React/Vite application with its own entry, build and Dockerfile. |
| apps/auth-mf | apps/auth-mf/module-federation.config.d.ts;apps/auth-mf/module-federation.config.js;apps/auth-mf/module-federation.config.ts;apps/auth-mf/package.json;apps/auth-mf/vite.config.d.ts;apps/auth-mf/vite.config.js;apps/auth-mf/vite.config.ts | apps/auth-mf/package.json:1-29 | apps/auth-mf/index.html:10 (`/src/bootstrap.tsx`); apps/auth-mf/src/bootstrap.tsx:5-9 (mounts the React UI) | apps/auth-mf/vite.config.ts:6-18 (own configuration, port 3001); apps/auth-mf/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/auth-mf/Dockerfile:9-10 (nginx image with `apps/auth-mf/dist`) | Yes | React/Vite application with its own entry, build and Dockerfile. |
| apps/dashboard-mf | apps/dashboard-mf/module-federation.config.d.ts;apps/dashboard-mf/module-federation.config.js;apps/dashboard-mf/module-federation.config.ts;apps/dashboard-mf/package.json;apps/dashboard-mf/vite.config.d.ts;apps/dashboard-mf/vite.config.js;apps/dashboard-mf/vite.config.ts | apps/dashboard-mf/package.json:1-29 | apps/dashboard-mf/index.html:10 (`/src/bootstrap.tsx`); apps/dashboard-mf/src/bootstrap.tsx:5-9 (mounts the React UI) | apps/dashboard-mf/vite.config.ts:6-18 (own configuration, port 3002); apps/dashboard-mf/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/dashboard-mf/Dockerfile:9-10 (nginx image with `apps/dashboard-mf/dist`) | Yes | React/Vite application with its own entry, build and Dockerfile. |
| apps/messaging-mf | apps/messaging-mf/module-federation.config.d.ts;apps/messaging-mf/module-federation.config.js;apps/messaging-mf/module-federation.config.ts;apps/messaging-mf/package.json;apps/messaging-mf/vite.config.d.ts;apps/messaging-mf/vite.config.js;apps/messaging-mf/vite.config.ts | apps/messaging-mf/package.json:1-29 | apps/messaging-mf/index.html:10 (`/src/bootstrap.tsx`); apps/messaging-mf/src/bootstrap.tsx:5-9 (mounts the React UI) | apps/messaging-mf/vite.config.ts:6-18 (own configuration, port 3004); apps/messaging-mf/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/messaging-mf/Dockerfile:9-10 (nginx image with `apps/messaging-mf/dist`) | Yes | React/Vite application with its own entry, build and Dockerfile. |
| apps/shell | apps/shell/module-federation.config.d.ts;apps/shell/module-federation.config.js;apps/shell/module-federation.config.ts;apps/shell/package.json;apps/shell/vite.config.d.ts;apps/shell/vite.config.js;apps/shell/vite.config.ts | apps/shell/package.json:1-31 | apps/shell/index.html:10 (`/src/main.tsx`); apps/shell/src/main.tsx:1 (`import('./bootstrap')`); apps/shell/src/bootstrap.tsx:5-9 (mounts the React UI) | apps/shell/vite.config.ts:6-18 (own configuration, port 3000); apps/shell/package.json:8 (`tsc && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | apps/shell/Dockerfile:9-10 (nginx image with `apps/shell/dist`); infrastructure/docker/production/Dockerfile.shell:9-11 (shell nginx image with `nginx.conf`) | Yes | React/Vite host application with its own entry, build and Dockerfiles. |
| packages/sdk | packages/sdk/package.json | packages/sdk/package.json:1-17 | — (package.json:5 `main: ./src/index.ts` is a library export) | — (scripts only `lint` and `clean`, package.json:7-10) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Shared package (HTTP/auth/websocket client) with no application entry. |
| packages/shared | packages/shared/package.json | packages/shared/package.json:1-14 | — (package.json:5 `main: ./src/index.ts` is a library export) | — (scripts only `lint` and `clean`, package.json:7-10) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Shared utilities package with no application entry. |
| packages/types | packages/types/package.json | packages/types/package.json:1-14 | — (package.json:5 `main: ./src/index.ts` is a library export) | — (scripts only `lint` and `clean`, package.json:7-10) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Types package with no application entry. |
| packages/ui | packages/ui/package.json | packages/ui/package.json:1-19 | — (package.json:5 `main: ./src/index.ts` is a library export) | — (scripts only `lint` and `clean`, package.json:7-10) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Component library with no application entry. |

## Summary

Frontend applications in the snapshot: 5 (apps/admin-mf, apps/auth-mf, apps/dashboard-mf, apps/messaging-mf, apps/shell).

## Notes

- N = 5 matches the classification’s `frontend_units: 5` (shell and four remotes); there is no external unit.
- Each app versions `vite.config.ts` and the compiled `vite.config.js` with the same configuration; the Build column cites `.ts`.
- The apps’ Dockerfiles run `pnpm build` on the entire workspace (`apps/*/Dockerfile:7`) and copy only the app’s own `dist`. CD only prints "Deploying..." (`.github/workflows/cd.yml:14-15`) and the Kubernetes manifests are placeholders (`infrastructure/kubernetes/shell/index.yaml:1`); CI (`.github/workflows/ci.yml:25-26`) builds the entire workspace, not one app.
- `packages/config` is not in `units.csv`; it contains only `tsconfig/tsconfig.json`, without `package.json`, and is not a unit.

---
schema: 1
id: 1033705813
full_name: hscale/adx-core-k
commit: 683dec7ebc233c685f97166a135032d5668070c1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 060 — hscale/adx-core-k

## Workspace

`package.json:5-10` with `workspaces` (`apps/*`, `packages/*`, `bff-services/*`, `tools/*`), relative to the root; only `tools/` exists at the root, and the directories `adx-core/apps/*`, `adx-core/packages/*` and `adx-core/bff-services/*` are not covered by these patterns.

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-26 (root manifest `adx-core-monorepo`) | — | — (package.json:14 `yarn workspaces run build` only delegates to members) | package.json:5-10 (root declaring the workspace) | — | No | Workspace root, with neither application entry nor build. |
| adx-core/apps/auth | adx-core/apps/auth/package.json;adx-core/apps/auth/vite.config.ts | adx-core/apps/auth/package.json:1-9 (own manifest) | adx-core/apps/auth/index.html:10-11 (`/src/main.tsx` entry); adx-core/apps/auth/src/main.tsx:6-10 (mounts React) | adx-core/apps/auth/vite.config.ts:5-48 (own configuration); adx-core/apps/auth/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (build and upload to S3 per app in the matrix, with path `apps/<app>`, without the `adx-core/` prefix) | Yes | React application with its own entry and Vite build; exposed modules present. |
| adx-core/apps/file | adx-core/apps/file/package.json;adx-core/apps/file/vite.config.ts | adx-core/apps/file/package.json:1-9 (own manifest) | — (no `index.html` in the directory) | adx-core/apps/file/vite.config.ts:5-30 (own configuration; exposes at :13-15 point to missing `src/components/*`); adx-core/apps/file/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (path `apps/<app>`, without the `adx-core/` prefix) | Undetermined | Own build, but no entry and exposes for missing files. |
| adx-core/apps/module | adx-core/apps/module/package.json;adx-core/apps/module/vite.config.ts | adx-core/apps/module/package.json:1-9 (own manifest) | adx-core/apps/module/index.html:10-11 (`/src/main.tsx` entry); adx-core/apps/module/src/main.tsx:4,6-10 (mounts React; imports missing `./index.css`) | adx-core/apps/module/vite.config.ts:5-48 (own configuration; exposes at :15-17 point to missing files); adx-core/apps/module/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (path `apps/<app>`, without the `adx-core/` prefix) | Undetermined | Own entry and build, but the build references files missing from the snapshot. |
| adx-core/apps/shell | adx-core/apps/shell/package.json;adx-core/apps/shell/vite.config.ts | adx-core/apps/shell/package.json:1-9 (own manifest) | adx-core/apps/shell/index.html:10-11 (`/src/main.tsx` entry); adx-core/apps/shell/src/main.tsx:6-10 (mounts React) | adx-core/apps/shell/vite.config.ts:6-69 (own configuration); adx-core/apps/shell/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (path `apps/shell`, without the `adx-core/` prefix) | Yes | React application with its own entry and Vite build. |
| adx-core/apps/tenant | adx-core/apps/tenant/package.json;adx-core/apps/tenant/vite.config.ts | adx-core/apps/tenant/package.json:1-9 (own manifest) | — (no `index.html` in the directory) | adx-core/apps/tenant/vite.config.ts:5-47 (own configuration; expose at :13 points to missing `src/components/TenantSwitcher.tsx`); adx-core/apps/tenant/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (path `apps/<app>`, without the `adx-core/` prefix) | Undetermined | Own build, but no entry and an expose for a missing file. |
| adx-core/apps/user | adx-core/apps/user/package.json;adx-core/apps/user/vite.config.ts | adx-core/apps/user/package.json:1-9 (own manifest) | — (no `index.html` in the directory) | adx-core/apps/user/vite.config.ts:5-30 (own configuration; exposes at :13-15 point to missing `src/components/*`); adx-core/apps/user/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (path `apps/<app>`, without the `adx-core/` prefix) | Undetermined | Own build, but no entry and exposes for missing files. |
| adx-core/apps/workflow | adx-core/apps/workflow/package.json;adx-core/apps/workflow/vite.config.ts | adx-core/apps/workflow/package.json:1-9 (own manifest) | — (no `index.html` in the directory) | adx-core/apps/workflow/vite.config.ts:5-30 (own configuration; exposes at :13-15 point to missing `src/components/*`); adx-core/apps/workflow/package.json:8 (`tsc && vite build`) | — | .github/workflows/deploy-microfrontends.yml:105-111,151-159 (path `apps/<app>`, without the `adx-core/` prefix) | Undetermined | Own build, but no entry and exposes for missing files. |
| adx-core/bff-services/auth-bff | adx-core/bff-services/auth-bff/package.json | adx-core/bff-services/auth-bff/package.json (own manifest) | — | — (adx-core/bff-services/auth-bff/package.json:7-9 `tsx watch src/server.ts`, `tsc`, Node server) | — | — | No | Express BFF service, not frontend. |
| adx-core/bff-services/file-bff | adx-core/bff-services/file-bff/package.json | adx-core/bff-services/file-bff/package.json (own manifest) | — | — (adx-core/bff-services/file-bff/package.json:8-10 `tsx watch src/server.ts`, `tsc`, Node server) | — | — | No | Express BFF service, not frontend. |
| adx-core/bff-services/module-bff | adx-core/bff-services/module-bff/package.json | adx-core/bff-services/module-bff/package.json (own manifest) | — | — (adx-core/bff-services/module-bff/package.json:7-9 `tsx watch src/server.ts`, `tsc`, Node server) | — | — | No | Express BFF service, not frontend. |
| adx-core/bff-services/tenant-bff | adx-core/bff-services/tenant-bff/package.json | adx-core/bff-services/tenant-bff/package.json (own manifest) | — | — (adx-core/bff-services/tenant-bff/package.json:7-9 `tsx watch src/server.ts`, `tsc`, Node server) | — | — | No | Express BFF service, not frontend. |
| adx-core/packages/bff-client | adx-core/packages/bff-client/package.json | adx-core/packages/bff-client/package.json (own manifest) | — (adx-core/packages/bff-client/package.json:5 `main: dist/index.js`, library) | — (adx-core/packages/bff-client/package.json:8 `tsc`) | — | — | No | Shared library with no application entry. |
| adx-core/packages/design-system | adx-core/packages/design-system/package.json | adx-core/packages/design-system/package.json (own manifest) | — (adx-core/packages/design-system/package.json:5 `main: dist/index.js`, library) | — (adx-core/packages/design-system/package.json:8 `tsc && vite build`, no `vite.config.*` in the directory) | — | — | No | Component library with no application entry. |
| adx-core/packages/event-bus | adx-core/packages/event-bus/package.json | adx-core/packages/event-bus/package.json (own manifest) | — (adx-core/packages/event-bus/package.json:5 `main: dist/index.js`, library) | — (adx-core/packages/event-bus/package.json:8 `tsc`) | — | — | No | Shared library with no application entry. |
| adx-core/packages/i18n | adx-core/packages/i18n/package.json | adx-core/packages/i18n/package.json (own manifest) | — (adx-core/packages/i18n/package.json:5 `main: dist/index.js`, library) | — (adx-core/packages/i18n/package.json:8 `tsc`) | — | — | No | Shared library with no application entry. |
| adx-core/packages/shared-context | adx-core/packages/shared-context/package.json | adx-core/packages/shared-context/package.json (own manifest) | — (adx-core/packages/shared-context/package.json:5 `main: dist/index.js`, library) | — (adx-core/packages/shared-context/package.json:8 `tsc`) | — | — | No | Shared library with no application entry. |
| tools/kiro-github-task-sync | tools/kiro-github-task-sync/package.json | tools/kiro-github-task-sync/package.json (own manifest) | — | — (tools/kiro-github-task-sync/package.json:7-9 `tsc`, `tsx watch src/index.ts` ; no `src/` in the directory) | package.json:9 (`tools/*`) | — | No | Command-line tool, not frontend; only `package.json`. |

## Summary

Frontend applications in the snapshot: 2 (adx-core/apps/auth, adx-core/apps/shell).

## Notes

- The classification records `frontend_units: 7` (shell and six remotes). The seven directories in
  `adx-core/apps/` are in the snapshot; the difference comes from the five `Undetermined`: `file`, `tenant`,
  `user` and `workflow` have no `index.html`, and the `vite.config.ts` files of `file`, `tenant`, `user`,
  `workflow` and `module` expose files that do not exist in the snapshot. In `module`,
  `src/components/ModuleInstaller`, `ModuleSettings` and `ModuleDeveloper`, imported in
  `adx-core/apps/module/src/App.tsx:10-12`, and `src/index.css` (`src/main.tsx:4`) are also missing. This matches
  the classification’s completeness caveat.
- The CI workflows (`.github/workflows/deploy-microfrontends.yml:7-8,105-111`) and the root
  workspace (`package.json:5-10`) use `apps/*` and `packages/*` at the root, but the directories are in
  `adx-core/`; there is no `package.json` in `adx-core/`. Therefore the Workspace column is `—` in
  the `adx-core/` rows, and the cited Deploy points to a path that does not match the snapshot.
- `package-workspace.json` at the root (`:5-8`, `workspaces` `apps/*`, `packages/*`) is not a
  `package.json`, so it was not taken as a workspace declaration.
- `adx-core/bff-services/user-bff` and `adx-core/bff-services/workflow-bff` are Rust crates
  (`Cargo.toml`), without `package.json`, and are not in `units.csv`; they are not frontend.

---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 343 — Jonadersonmoura/descompara

## Workspace

nx.json:1-94 (Nx workspace: `namedInputs`, `plugins`, `targetDefaults`, `generators`); Nx `project.json` in each project (e.g., shell/project.json:2-4, admin/project.json:2-4, libs/shared/ui/project.json:2-6); package.json:53-56 (`workspaces: ["packages/*", "libs/shared/*"]`).

## Units

| Directory | Markers | Manifest | Entry | Build | Workspace | Deploy | Frontend unit | Rationale |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-69 (workspace manifest, empty `scripts` at `:5`) | — | — | nx.json:1-94 (Nx workspace root); package.json:53-56 (`workspaces`) | — | No | Workspace coordination root, with no UI entry or build of its own. |
| admin | admin/federation.config.mjs;admin/project.json;admin/vite.config.mts | — | admin/project.json:80 and `:100` (own `index` and `browser`); admin/src/main.ts:1-5 (`initFederation` and `import('./bootstrap')`); admin/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | admin/project.json:9-24 (`build` target with `@angular-architects/native-federation:build` over `admin:esbuild`); admin/project.json:72-79 (`esbuild` with `@angular/build:application`, `outputPath: dist/admin`) | admin/project.json:2-4 (Nx project `admin`, `application`) | — | Yes | Angular application with its own entry and build target. |
| admin-e2e | admin-e2e/package.json;admin-e2e/project.json | admin-e2e/package.json:1-8 (`@org/admin-e2e`, private) | — | — (admin-e2e/project.json:8, empty `targets`; admin-e2e/playwright.config.mts:1-3 configures Playwright tests) | admin-e2e/project.json:2-6 (Nx project `admin-e2e`, `implicitDependencies: ["admin"]`) | — | No | e2e testing project for `admin`, with neither UI entry nor build. |
| intranet | intranet/federation.config.mjs;intranet/project.json;intranet/vite.config.mts | — | intranet/project.json:80 and `:100` (own `index` and `browser`); intranet/src/main.ts:1-5 (`initFederation` and `import('./bootstrap')`); intranet/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | intranet/project.json:9-24 (`build` target with `@angular-architects/native-federation:build` over `intranet:esbuild`); intranet/project.json:72-79 (`esbuild` with `@angular/build:application`, `outputPath: dist/intranet`) | intranet/project.json:2-4 (Nx project `intranet`, `application`) | — | Yes | Angular application with its own entry and build target. |
| intranet-e2e | intranet-e2e/package.json;intranet-e2e/project.json | intranet-e2e/package.json:1-8 (`@org/intranet-e2e`, private) | — | — (intranet-e2e/project.json:8, empty `targets`; intranet-e2e/playwright.config.mts:1-3 configures Playwright tests) | intranet-e2e/project.json:2-6 (Nx project `intranet-e2e`, `implicitDependencies: ["intranet"]`) | — | No | e2e testing project for `intranet`, with neither UI entry nor build. |
| libs/shared/data-access | libs/shared/data-access/project.json | — | — | — (libs/shared/data-access/project.json:8-12, only the `lint` target) | libs/shared/data-access/project.json:2-6 (Nx project `data-access`, `library`) | — | No | Shared library (services exported in libs/shared/data-access/src/index.ts:1-4), with no application entry. |
| libs/shared/guards | libs/shared/guards/project.json | — | — | — (libs/shared/guards/project.json:8-12, only the `lint` target) | libs/shared/guards/project.json:2-6 (Nx project `guards`, `library`) | — | No | Shared library, with no application entry. |
| libs/shared/theme | libs/shared/theme/project.json | — | — | — (libs/shared/theme/project.json:8-12, only the `lint` target) | libs/shared/theme/project.json:2-6 (Nx project `theme`, `library`) | — | No | Shared library, with no application entry. |
| libs/shared/types | libs/shared/types/package.json;libs/shared/types/project.json | libs/shared/types/package.json:1-17 (`@descompara/shared-types`, `main: ./src/index.ts`) | — | — (libs/shared/types/project.json:1-4, no targets) | package.json:55 (`libs/shared/*`); libs/shared/types/project.json:2 (Nx project `@descompara/shared-types`) | — | No | Shared types package, with no application entry. |
| libs/shared/ui | libs/shared/ui/project.json | — | — | — (libs/shared/ui/project.json:8-12, only the `lint` target) | libs/shared/ui/project.json:2-6 (Nx project `ui`, `library`) | — | No | Shared UI library, with no application entry. |
| marAberto | marAberto/federation.config.mjs;marAberto/project.json;marAberto/vite.config.mts | — | marAberto/project.json:80 and `:100` (own `index` and `browser`); marAberto/src/main.ts:1-5 (`initFederation` and `import('./bootstrap')`); marAberto/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | marAberto/project.json:9-24 (`build` target with `@angular-architects/native-federation:build` over `marAberto:esbuild`); marAberto/project.json:72-79 (`esbuild` with `@angular/build:application`, `outputPath: dist/marAberto`) | marAberto/project.json:2-4 (Nx project `marAberto`, `application`) | — | Yes | Angular application with its own entry and build target. |
| marAberto-e2e | marAberto-e2e/package.json;marAberto-e2e/project.json | marAberto-e2e/package.json:1-8 (`@org/marAberto-e2e`, private) | — | — (marAberto-e2e/project.json:8, empty `targets`; marAberto-e2e/playwright.config.mts:1-3 configures Playwright tests) | marAberto-e2e/project.json:2-6 (Nx project `marAberto-e2e`, `implicitDependencies: ["marAberto"]`) | — | No | e2e testing project for `marAberto`, with neither UI entry nor build. |
| shell | shell/federation.config.mjs;shell/project.json;shell/vite.config.mts | — | shell/project.json:71 and `:91` (own `index` and `browser`); shell/src/main.ts:1-5 (`initFederation('/federation.manifest.json')` and `import('./bootstrap')`); shell/src/bootstrap.ts:1-5 (`bootstrapApplication(App, appConfig)`) | shell/project.json:9-24 (`build` target with `@angular-architects/native-federation:build` over `shell:esbuild`); shell/project.json:63-70 (`esbuild` with `@angular/build:application`, `outputPath: dist/shell`) | shell/project.json:2-4 (Nx project `shell`, `application`) | — | Yes | Angular application with its own entry and build target. |
| shell-e2e | shell-e2e/package.json;shell-e2e/project.json | shell-e2e/package.json:1-8 (`@org/shell-e2e`, private) | — | — (shell-e2e/project.json:8, empty `targets`; shell-e2e/playwright.config.mts:24-38 configura Playwright tests with `webServer` `npx nx run shell:serve`) | shell-e2e/project.json:2-6 (Nx project `shell-e2e`, `implicitDependencies: ["shell"]`) | — | No | e2e testing project for `shell`, with neither UI entry nor build. |

## Summary

Frontend applications in the snapshot: 4 (admin, intranet, marAberto, shell).

## Notes

- The count matches the classification’s `frontend_units: 4` (shell and the remotes `marAberto`, `intranet`, `admin`).
- No directory has a Dockerfile, its own CI job or hosting configuration; `matches.csv` has no `ops-*` occurrences, but has 1 `ws-workspaces` (package.json:53), 1 `ws-path-alias` (tsconfig.base.json:22) and 2 `ci-*` (`ci-workflow-file` and `ci-monorepo-tooling`, the latter in .github/workflows/ci.yml:37). The only workflow, .github/workflows/ci.yml:37, runs `nx run-many -t lint test build typecheck e2e` for all projects at once and was not counted as deployment of a directory. The `serve-static` targets (`@nx/web:file-server`, e.g., shell/project.json:54-62) serve the build locally and do not count either.
- The four apps’ `vite.config.mts` files (e.g., shell/vite.config.mts:1-20) configure Vitest (`test`), not the build, which is performed by the `project.json` targets.
- The root `workspaces` (package.json:53-56) only reaches `libs/shared/types`, the only library with `package.json`; `packages/` has only `.gitkeep`. The other boundaries come from Nx `project.json` files.
- The snapshot also contains coding assistant configuration directories (`.agents/`, `.claude/`, `.codex/`, `.cursor/`, `.gemini/`, `.opencode/`, `.github/skills/`), without frontend units.

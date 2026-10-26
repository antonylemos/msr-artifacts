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

nx.json:1-94 (workspace Nx: `namedInputs`, `plugins`, `targetDefaults`, `generators`); `project.json` do Nx em cada projeto (ex.: shell/project.json:2-4, admin/project.json:2-4, libs/shared/ui/project.json:2-6); package.json:53-56 (`workspaces: ["packages/*", "libs/shared/*"]`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-69 (manifesto do workspace, `scripts` vazio em `:5`) | — | — | nx.json:1-94 (raiz do workspace Nx); package.json:53-56 (`workspaces`) | — | No | Raiz de coordenação do workspace, sem entrada ou build de UI próprios. |
| admin | admin/federation.config.mjs;admin/project.json;admin/vite.config.mts | — | admin/project.json:80 e `:100` (`index` e `browser` próprios); admin/src/main.ts:1-5 (`initFederation` e `import('./bootstrap')`); admin/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | admin/project.json:9-24 (target `build` com `@angular-architects/native-federation:build` sobre `admin:esbuild`); admin/project.json:72-79 (`esbuild` com `@angular/build:application`, `outputPath: dist/admin`) | admin/project.json:2-4 (projeto Nx `admin`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| admin-e2e | admin-e2e/package.json;admin-e2e/project.json | admin-e2e/package.json:1-8 (`@org/admin-e2e`, privado) | — | — (admin-e2e/project.json:8, `targets` vazio; admin-e2e/playwright.config.mts:1-3 configura testes Playwright) | admin-e2e/project.json:2-6 (projeto Nx `admin-e2e`, `implicitDependencies: ["admin"]`) | — | No | Projeto de testes e2e do `admin`, sem entrada nem build de UI. |
| intranet | intranet/federation.config.mjs;intranet/project.json;intranet/vite.config.mts | — | intranet/project.json:80 e `:100` (`index` e `browser` próprios); intranet/src/main.ts:1-5 (`initFederation` e `import('./bootstrap')`); intranet/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | intranet/project.json:9-24 (target `build` com `@angular-architects/native-federation:build` sobre `intranet:esbuild`); intranet/project.json:72-79 (`esbuild` com `@angular/build:application`, `outputPath: dist/intranet`) | intranet/project.json:2-4 (projeto Nx `intranet`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| intranet-e2e | intranet-e2e/package.json;intranet-e2e/project.json | intranet-e2e/package.json:1-8 (`@org/intranet-e2e`, privado) | — | — (intranet-e2e/project.json:8, `targets` vazio; intranet-e2e/playwright.config.mts:1-3 configura testes Playwright) | intranet-e2e/project.json:2-6 (projeto Nx `intranet-e2e`, `implicitDependencies: ["intranet"]`) | — | No | Projeto de testes e2e do `intranet`, sem entrada nem build de UI. |
| libs/shared/data-access | libs/shared/data-access/project.json | — | — | — (libs/shared/data-access/project.json:8-12, só o target `lint`) | libs/shared/data-access/project.json:2-6 (projeto Nx `data-access`, `library`) | — | No | Biblioteca compartilhada (serviços exportados em libs/shared/data-access/src/index.ts:1-4), sem entrada de aplicação. |
| libs/shared/guards | libs/shared/guards/project.json | — | — | — (libs/shared/guards/project.json:8-12, só o target `lint`) | libs/shared/guards/project.json:2-6 (projeto Nx `guards`, `library`) | — | No | Biblioteca compartilhada, sem entrada de aplicação. |
| libs/shared/theme | libs/shared/theme/project.json | — | — | — (libs/shared/theme/project.json:8-12, só o target `lint`) | libs/shared/theme/project.json:2-6 (projeto Nx `theme`, `library`) | — | No | Biblioteca compartilhada, sem entrada de aplicação. |
| libs/shared/types | libs/shared/types/package.json;libs/shared/types/project.json | libs/shared/types/package.json:1-17 (`@descompara/shared-types`, `main: ./src/index.ts`) | — | — (libs/shared/types/project.json:1-4, sem targets) | package.json:55 (`libs/shared/*`); libs/shared/types/project.json:2 (projeto Nx `@descompara/shared-types`) | — | No | Pacote compartilhado de tipos, sem entrada de aplicação. |
| libs/shared/ui | libs/shared/ui/project.json | — | — | — (libs/shared/ui/project.json:8-12, só o target `lint`) | libs/shared/ui/project.json:2-6 (projeto Nx `ui`, `library`) | — | No | Biblioteca compartilhada de UI, sem entrada de aplicação. |
| marAberto | marAberto/federation.config.mjs;marAberto/project.json;marAberto/vite.config.mts | — | marAberto/project.json:80 e `:100` (`index` e `browser` próprios); marAberto/src/main.ts:1-5 (`initFederation` e `import('./bootstrap')`); marAberto/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | marAberto/project.json:9-24 (target `build` com `@angular-architects/native-federation:build` sobre `marAberto:esbuild`); marAberto/project.json:72-79 (`esbuild` com `@angular/build:application`, `outputPath: dist/marAberto`) | marAberto/project.json:2-4 (projeto Nx `marAberto`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| marAberto-e2e | marAberto-e2e/package.json;marAberto-e2e/project.json | marAberto-e2e/package.json:1-8 (`@org/marAberto-e2e`, privado) | — | — (marAberto-e2e/project.json:8, `targets` vazio; marAberto-e2e/playwright.config.mts:1-3 configura testes Playwright) | marAberto-e2e/project.json:2-6 (projeto Nx `marAberto-e2e`, `implicitDependencies: ["marAberto"]`) | — | No | Projeto de testes e2e do `marAberto`, sem entrada nem build de UI. |
| shell | shell/federation.config.mjs;shell/project.json;shell/vite.config.mts | — | shell/project.json:71 e `:91` (`index` e `browser` próprios); shell/src/main.ts:1-5 (`initFederation('/federation.manifest.json')` e `import('./bootstrap')`); shell/src/bootstrap.ts:1-5 (`bootstrapApplication(App, appConfig)`) | shell/project.json:9-24 (target `build` com `@angular-architects/native-federation:build` sobre `shell:esbuild`); shell/project.json:63-70 (`esbuild` com `@angular/build:application`, `outputPath: dist/shell`) | shell/project.json:2-4 (projeto Nx `shell`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| shell-e2e | shell-e2e/package.json;shell-e2e/project.json | shell-e2e/package.json:1-8 (`@org/shell-e2e`, privado) | — | — (shell-e2e/project.json:8, `targets` vazio; shell-e2e/playwright.config.mts:24-38 configura testes Playwright com `webServer` `npx nx run shell:serve`) | shell-e2e/project.json:2-6 (projeto Nx `shell-e2e`, `implicitDependencies: ["shell"]`) | — | No | Projeto de testes e2e do `shell`, sem entrada nem build de UI. |

## Resumo

Aplicações frontend no snapshot: 4 (admin, intranet, marAberto, shell).

## Notas

- A contagem coincide com `frontend_units: 4` da classificação (shell e os remotes `marAberto`, `intranet`, `admin`).
- Nenhum diretório tem Dockerfile, job de CI próprio ou configuração de hospedagem; o `matches.csv` não tem ocorrências `ops-*`, mas tem 1 `ws-workspaces` (package.json:53), 1 `ws-path-alias` (tsconfig.base.json:22) e 2 `ci-*` (`ci-workflow-file` e `ci-monorepo-tooling`, esta em .github/workflows/ci.yml:37). O único workflow, .github/workflows/ci.yml:37, roda `nx run-many -t lint test build typecheck e2e` para todos os projetos de uma vez e não foi contado como deploy de um diretório. Os targets `serve-static` (`@nx/web:file-server`, ex.: shell/project.json:54-62) servem o build localmente e também não contam.
- Os `vite.config.mts` dos quatro apps (ex.: shell/vite.config.mts:1-20) configuram o Vitest (`test`), não o build, que é feito pelos targets do `project.json`.
- O `workspaces` da raiz (package.json:53-56) só alcança `libs/shared/types`, a única biblioteca com `package.json`; `packages/` tem apenas `.gitkeep`. As demais fronteiras vêm dos `project.json` do Nx.
- O snapshot traz também diretórios de configuração de assistentes de código (`.agents/`, `.claude/`, `.codex/`, `.cursor/`, `.gemini/`, `.opencode/`, `.github/skills/`), sem unidades frontend.

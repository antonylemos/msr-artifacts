---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Workspace

nx-mf-df/nx.json:1-91 (workspace Nx: `namedInputs`, `targetDefaults`, `plugins`, `generators`); `project.json` do Nx em cada projeto (ex.: nx-mf-df/apps/main-host/project.json:2-4, nx-mf-df/libs/common-ui-lib/project.json:2-6); nx-mf-df/pnpm-workspace.yaml:1-4 só tem `autoInstallPeers` e `patchedDependencies`, sem `packages`; sem `workspaces` em nx-mf-df/package.json:1-100.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| nx-mf-df | nx-mf-df/package.json | nx-mf-df/package.json:1-100 (manifesto do workspace `@nx-mf-df/source`, scripts `nx run ...` em `:5-27`) | — | — | nx-mf-df/nx.json:1-91 (raiz do workspace Nx) | — | No | Raiz de coordenação do workspace, sem entrada ou build de UI próprios. |
| nx-mf-df/apps/main-host | nx-mf-df/apps/main-host/federation.config.js;nx-mf-df/apps/main-host/project.json | — | nx-mf-df/apps/main-host/project.json:65 (`browser: apps/main-host/src/main.ts`); nx-mf-df/apps/main-host/src/main.ts:3-5 (`initFederation(...)` e `import('./bootstrap')`); nx-mf-df/apps/main-host/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | nx-mf-df/apps/main-host/project.json:9-22 (target `build` com `@angular-architects/native-federation:build` sobre `main-host:esbuild`) e `:58-65` (`@angular/build:application`, `outputPath: dist/apps/main-host`); nx-mf-df/apps/main-host/federation.config.js:3-9 | nx-mf-df/apps/main-host/project.json:2-4 (projeto Nx `main-host`, `application`) | nx-mf-df/scripts/gh-build.mjs:51 (build próprio com `--baseHref=${base}`); nx-mf-df/scripts/gh-stage.mjs:13-18 (copia `dist/apps/main-host/browser` para a raiz do site); .github/workflows/deploy-github-pages.yml:37-47 (`gh-build`, `gh-stage` e upload para o GitHub Pages) | Yes | Shell Angular com entrada e target de build próprios. |
| nx-mf-df/apps/main-host-e2e | nx-mf-df/apps/main-host-e2e/project.json | — | — | — (nx-mf-df/apps/main-host-e2e/project.json:8, `targets` vazio; nx-mf-df/apps/main-host-e2e/playwright.config.ts:17-31 configura testes Playwright) | nx-mf-df/apps/main-host-e2e/project.json:2-4 (projeto Nx `main-host-e2e`) | — | No | Projeto de testes e2e do host, sem entrada nem build de UI. |
| nx-mf-df/apps/mf_remote_a | nx-mf-df/apps/mf_remote_a/federation.config.js;nx-mf-df/apps/mf_remote_a/project.json | — | nx-mf-df/apps/mf_remote_a/project.json:65 (`browser: apps/mf_remote_a/src/main.ts`); nx-mf-df/apps/mf_remote_a/src/main.ts:3-5 (`initFederation()` e `import('./bootstrap')`); nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | nx-mf-df/apps/mf_remote_a/project.json:9-22 (target `build` com `@angular-architects/native-federation:build`) e `:58-65` (`@angular/build:application`, `outputPath: dist/apps/mf_remote_a`); nx-mf-df/apps/mf_remote_a/federation.config.js:3-10 (`exposes: { './Component': ... }`) | nx-mf-df/apps/mf_remote_a/project.json:2-4 (projeto Nx `mf_remote_a`, `application`) | nx-mf-df/scripts/gh-build.mjs:53-54 (build próprio com `--baseHref=${base}${name}/`); nx-mf-df/scripts/gh-stage.mjs:19-25 (copia `dist/apps/mf_remote_a/browser` para `gh-pages-dist/mf_remote_a`); .github/workflows/deploy-github-pages.yml:37-47 | Yes | Remote Angular com entrada e target de build próprios. |
| nx-mf-df/apps/mf_remote_a-e2e | nx-mf-df/apps/mf_remote_a-e2e/project.json | — | — | — (nx-mf-df/apps/mf_remote_a-e2e/project.json:8, `targets` vazio; nx-mf-df/apps/mf_remote_a-e2e/playwright.config.ts configura testes Playwright) | nx-mf-df/apps/mf_remote_a-e2e/project.json:2-4 (projeto Nx `mf_remote_a-e2e`) | — | No | Projeto de testes e2e de `mf_remote_a`, sem entrada nem build de UI. |
| nx-mf-df/apps/mf_remote_b | nx-mf-df/apps/mf_remote_b/federation.config.js;nx-mf-df/apps/mf_remote_b/project.json | — | nx-mf-df/apps/mf_remote_b/project.json:65 (`browser: apps/mf_remote_b/src/main.ts`); nx-mf-df/apps/mf_remote_b/src/main.ts:3-5; nx-mf-df/apps/mf_remote_b/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | nx-mf-df/apps/mf_remote_b/project.json:9-22 (target `build` com `@angular-architects/native-federation:build`) e `:58-65` (`@angular/build:application`, `outputPath: dist/apps/mf_remote_b`); nx-mf-df/apps/mf_remote_b/federation.config.js:3-10 | nx-mf-df/apps/mf_remote_b/project.json:2-4 (projeto Nx `mf_remote_b`, `application`) | nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25 (copia `dist/apps/mf_remote_b/browser` para `gh-pages-dist/mf_remote_b`); .github/workflows/deploy-github-pages.yml:37-47 | Yes | Remote Angular com entrada e target de build próprios. |
| nx-mf-df/apps/mf_remote_b-e2e | nx-mf-df/apps/mf_remote_b-e2e/project.json | — | — | — (nx-mf-df/apps/mf_remote_b-e2e/project.json:8, `targets` vazio; nx-mf-df/apps/mf_remote_b-e2e/playwright.config.ts configura testes Playwright) | nx-mf-df/apps/mf_remote_b-e2e/project.json:2-4 (projeto Nx `mf_remote_b-e2e`) | — | No | Projeto de testes e2e de `mf_remote_b`, sem entrada nem build de UI. |
| nx-mf-df/apps/mf_remote_c | nx-mf-df/apps/mf_remote_c/federation.config.js;nx-mf-df/apps/mf_remote_c/project.json | — | nx-mf-df/apps/mf_remote_c/project.json:65 (`browser: apps/mf_remote_c/src/main.ts`); nx-mf-df/apps/mf_remote_c/src/main.ts:3-5; nx-mf-df/apps/mf_remote_c/src/bootstrap.ts:5 (`bootstrapApplication(App, appConfig)`) | nx-mf-df/apps/mf_remote_c/project.json:9-22 (target `build` com `@angular-architects/native-federation:build`) e `:58-65` (`@angular/build:application`, `outputPath: dist/apps/mf_remote_c`); nx-mf-df/apps/mf_remote_c/federation.config.js:3-10 | nx-mf-df/apps/mf_remote_c/project.json:2-4 (projeto Nx `mf_remote_c`, `application`) | nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25 (copia `dist/apps/mf_remote_c/browser` para `gh-pages-dist/mf_remote_c`); .github/workflows/deploy-github-pages.yml:37-47 | Yes | Remote Angular com entrada e target de build próprios. |
| nx-mf-df/apps/mf_remote_c-e2e | nx-mf-df/apps/mf_remote_c-e2e/project.json | — | — | — (nx-mf-df/apps/mf_remote_c-e2e/project.json:8, `targets` vazio; nx-mf-df/apps/mf_remote_c-e2e/playwright.config.ts configura testes Playwright) | nx-mf-df/apps/mf_remote_c-e2e/project.json:2-4 (projeto Nx `mf_remote_c-e2e`) | — | No | Projeto de testes e2e de `mf_remote_c`, sem entrada nem build de UI. |
| nx-mf-df/libs/common-ui-lib | nx-mf-df/libs/common-ui-lib/package.json;nx-mf-df/libs/common-ui-lib/project.json | nx-mf-df/libs/common-ui-lib/package.json:1-16 (`@nx-mf-df/common-ui-lib`, só `peerDependencies`) | — | nx-mf-df/libs/common-ui-lib/project.json:10-24 (target `build` com `@nx/angular:ng-packagr-lite`); nx-mf-df/libs/common-ui-lib/ng-package.json:3-6 (`entryFile: src/index.ts`, biblioteca) | nx-mf-df/libs/common-ui-lib/project.json:2-6 (projeto Nx `common-ui-lib`, `library`) | — | No | Biblioteca compartilhada de UI e mensageria, sem entrada de aplicação. |
| nx-mf-df/libs/contracts-platform-messaging | nx-mf-df/libs/contracts-platform-messaging/package.json;nx-mf-df/libs/contracts-platform-messaging/project.json | nx-mf-df/libs/contracts-platform-messaging/package.json:1-11 (`@nx-mf-df/contracts-platform-messaging`, `main: ./src/index.js`) | — | nx-mf-df/libs/contracts-platform-messaging/project.json:8-16 (target `build` com `@nx/js:tsc`) | nx-mf-df/libs/contracts-platform-messaging/project.json:2-5 (projeto Nx `contracts-platform-messaging`, `library`) | — | No | Biblioteca de contratos de mensageria, sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 4 (nx-mf-df/apps/main-host, nx-mf-df/apps/mf_remote_a, nx-mf-df/apps/mf_remote_b, nx-mf-df/apps/mf_remote_c).

## Notas

- A contagem é igual a `frontend_units: 4` da classificação.
- Nenhuma unidade tem `package.json` próprio; as fronteiras vêm dos `project.json` do Nx. A única ocorrência `ws-*` é `ws-path-alias` em nx-mf-df/tsconfig.base.json:17-22 (aliases das duas libs), que não declara membros do workspace.
- Deploy: um único workflow publica um único site no GitHub Pages, mas cada app tem build próprio com `baseHref` próprio (nx-mf-df/scripts/gh-build.mjs:51-54) e saída própria copiada para seu subdiretório (nx-mf-df/scripts/gh-stage.mjs:18, `:25`), como em 313. A ocorrência `ops-hosting` em README.md:207 (`pnpm gh-deploy`) é documentação e não foi usada. Os targets `serve-static` (`@nx/web:file-server`, ex.: nx-mf-df/apps/main-host/project.json:48-56) servem o build localmente e não foram contados como deploy.
- Cada app tem `src/index.html` (ex.: nx-mf-df/apps/main-host/src/index.html), que é o índice padrão de `@angular/build:application`; o `project.json` só declara `browser`.

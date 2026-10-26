---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Workspace

Workspace Nx: `nx.json:1-99` na raiz (`targetDefaults`, `plugins` e `generators`), com um `project.json` por projeto (por exemplo, `appshell/host/project.json:2-4`, projeto `host`, `application`; `libs/shared/data/project.json:2-6`, projeto `data`, `library`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-64 (manifesto do workspace, `scripts` vazio em `:5`) | — | — | nx.json:1-99 (raiz do workspace Nx) | — | No | Raiz de coordenação do workspace, sem entrada ou build de UI próprios. |
| apps/angular-monorepo | apps/angular-monorepo/project.json | — | apps/angular-monorepo/project.json:14-15 (`index` e `main` próprios); apps/angular-monorepo/src/main.ts:1-5 (`bootstrapApplication(App, appConfig)`) | apps/angular-monorepo/project.json:9-52 (target `build` com `@angular-devkit/build-angular:browser` e output próprio em `:13`) | apps/angular-monorepo/project.json:2-4 (projeto Nx `angular-monorepo`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| apps/angular-monorepo-e2e | apps/angular-monorepo-e2e/project.json | — | — | — (apps/angular-monorepo-e2e/project.json:8-9, `targets` vazio; apps/angular-monorepo-e2e/cypress.config.ts:1-17 configura testes Cypress) | apps/angular-monorepo-e2e/project.json:2-4 (projeto Nx `angular-monorepo-e2e`) | — | No | Projeto de testes e2e de `apps/angular-monorepo`, sem entrada nem build de UI. |
| appshell/host | appshell/host/module-federation.config.ts;appshell/host/project.json;appshell/host/webpack.config.ts;appshell/host/webpack.prod.config.ts | — | appshell/host/project.json:14-15 (`index` e `main` próprios); appshell/host/src/main.ts:1 (importa `./bootstrap`); appshell/host/src/bootstrap.ts:1-5 (`bootstrapApplication(App, appConfig)`) | appshell/host/project.json:9-27 (target `build` com `@nx/angular:webpack-browser`, output próprio e `customWebpackConfig` em appshell/host/webpack.config.ts:1-9) | appshell/host/project.json:2-4 (projeto Nx `host`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| appshell/host-e2e | appshell/host-e2e/project.json | — | — | — (appshell/host-e2e/project.json:7-8, `targets` vazio; appshell/host-e2e/playwright.config.ts:17-31 configura testes Playwright) | appshell/host-e2e/project.json:2-4 (projeto Nx `host-e2e`) | — | No | Projeto de testes e2e do host, sem entrada nem build de UI. |
| appshell/mfe1 | appshell/mfe1/module-federation.config.ts;appshell/mfe1/project.json;appshell/mfe1/webpack.config.ts;appshell/mfe1/webpack.prod.config.ts | — | appshell/mfe1/project.json:14-15 (`index` e `main` próprios); appshell/mfe1/src/main.ts:1 (importa `./bootstrap`); appshell/mfe1/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | appshell/mfe1/project.json:9-27 (target `build` com `@nx/angular:webpack-browser`, output próprio e `customWebpackConfig` em appshell/mfe1/webpack.config.ts:1-9) | appshell/mfe1/project.json:2-4 (projeto Nx `mfe1`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| appshell/mfe1-e2e | appshell/mfe1-e2e/project.json | — | — | — (appshell/mfe1-e2e/project.json:7-8, `targets` vazio; appshell/mfe1-e2e/playwright.config.ts configura testes Playwright) | appshell/mfe1-e2e/project.json:2-4 (projeto Nx `mfe1-e2e`) | — | No | Projeto de testes e2e de `mfe1`, sem entrada nem build de UI. |
| appshell/mfe2 | appshell/mfe2/module-federation.config.ts;appshell/mfe2/project.json;appshell/mfe2/webpack.config.ts;appshell/mfe2/webpack.prod.config.ts | — | appshell/mfe2/project.json:14-15 (`index` e `main` próprios); appshell/mfe2/src/main.ts:1 (importa `./bootstrap`); appshell/mfe2/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | appshell/mfe2/project.json:9-27 (target `build` com `@nx/angular:webpack-browser`, output próprio e `customWebpackConfig` em appshell/mfe2/webpack.config.ts:1-9) | appshell/mfe2/project.json:2-4 (projeto Nx `mfe2`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| appshell/mfe2-e2e | appshell/mfe2-e2e/project.json | — | — | — (appshell/mfe2-e2e/project.json:7-8, `targets` vazio; appshell/mfe2-e2e/playwright.config.ts configura testes Playwright) | appshell/mfe2-e2e/project.json:2-4 (projeto Nx `mfe2-e2e`) | — | No | Projeto de testes e2e de `mfe2`, sem entrada nem build de UI. |
| libs/shared/data | libs/shared/data/project.json | — | — | — (libs/shared/data/project.json:8-19 só tem targets `test` e `lint`) | libs/shared/data/project.json:2-6 (projeto Nx `data`, `library`) | — | No | Biblioteca compartilhada (libs/shared/data/src/index.ts:1, `UserService`), sem entrada de aplicação. |
| libs/shared/ui | libs/shared/ui/project.json | — | — | — (libs/shared/ui/project.json:8-19 só tem targets `test` e `lint`) | libs/shared/ui/project.json:2-6 (projeto Nx `button`, `library`) | — | No | Biblioteca compartilhada de UI (libs/shared/ui/src/index.ts:1, botão), sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 4 (apps/angular-monorepo, appshell/host, appshell/mfe1, appshell/mfe2).

## Notas

- A contagem difere de `frontend_units: 3` da classificação porque `apps/angular-monorepo` é a aplicação padrão gerada pelo Nx, com entrada e build próprios, mas sem relação de composição (não é remote do host nem consome remotes); a classificação a menciona e não a soma às unidades.
- Nenhum diretório tem Dockerfile, job de CI ou configuração de hospedagem; o `matches.csv` não tem ocorrências `ops-*` nem `ci-*`. Os targets `serve-static` (`@nx/web:file-server`, ex.: appshell/host/project.json:92-99) servem o build localmente e não foram contados como deploy.
- Nenhuma unidade tem `package.json` próprio; as fronteiras vêm dos `project.json` do Nx. A única ocorrência `ws-*` é `ws-path-alias` em tsconfig.base.json:17-22 (aliases das bibliotecas e de `mfe1/Routes`/`mfe2/Routes` para tipagem), que não declara membros do workspace.
- Os projetos `*-e2e` têm `projectType: application` no `project.json`, mas só contêm testes; os targets `e2e` são inferidos pelos plugins registrados em nx.json:61-83.

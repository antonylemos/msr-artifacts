---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 109 — ramdev90/nx-module-federation

## Workspace

nx.json:1-51 (workspace Nx: `namedInputs`, `targetDefaults`, `generators`); `project.json` do Nx em cada projeto (shell/project.json:2-8, products/project.json:2-8, orders/project.json:2-8, customer/project.json:2-8, apps/microfrontend-workspace/project.json:2-8); sem `workspaces` em package.json:1-47.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-47 (manifesto do workspace, `scripts` vazio em `:5`) | — | — | nx.json:1-51 (raiz do workspace Nx) | — | No | Raiz de coordenação do workspace, sem entrada ou build de UI próprios. |
| apps/microfrontend-workspace | apps/microfrontend-workspace/project.json | — | apps/microfrontend-workspace/project.json:14-15 (`index` e `main` próprios); apps/microfrontend-workspace/src/main.ts:1-5 (`bootstrapApplication(App, appConfig)`) | apps/microfrontend-workspace/project.json:9-24 (target `build` com `@angular-devkit/build-angular:browser` e output próprio) | apps/microfrontend-workspace/project.json:2-4 (projeto Nx `microfrontend-workspace`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| customer | customer/module-federation.config.ts;customer/project.json;customer/webpack.config.ts;customer/webpack.prod.config.ts | — | customer/project.json:14-15 (`index` e `main` próprios); customer/src/main.ts:1 (importa `./bootstrap`); customer/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | customer/project.json:9-26 (target `build` com `@nx/angular:webpack-browser`, output próprio e `customWebpackConfig` em customer/webpack.config.ts:1-9) | customer/project.json:2-4 (projeto Nx `customer`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| orders | orders/module-federation.config.ts;orders/project.json;orders/webpack.config.ts;orders/webpack.prod.config.ts | — | orders/project.json:14-15 (`index` e `main` próprios); orders/src/main.ts:1 (importa `./bootstrap`); orders/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | orders/project.json:9-26 (target `build` com `@nx/angular:webpack-browser`, output próprio e `customWebpackConfig` em orders/webpack.config.ts:1-9) | orders/project.json:2-4 (projeto Nx `orders`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| products | products/module-federation.config.ts;products/project.json;products/webpack.config.ts;products/webpack.prod.config.ts | — | products/project.json:14-15 (`index` e `main` próprios); products/src/main.ts:1 (importa `./bootstrap`); products/src/bootstrap.ts:1-5 (`bootstrapApplication(RemoteEntry, appConfig)`) | products/project.json:9-26 (target `build` com `@nx/angular:webpack-browser`, output próprio e `customWebpackConfig` em products/webpack.config.ts:1-9) | products/project.json:2-4 (projeto Nx `products`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |
| shell | shell/module-federation.config.ts;shell/project.json;shell/webpack.config.ts;shell/webpack.prod.config.ts | — | shell/project.json:14-15 (`index` e `main` próprios); shell/src/main.ts:1 (importa `./bootstrap`); shell/src/bootstrap.ts:1-5 (`bootstrapApplication(App, appConfig)`) | shell/project.json:9-26 (target `build` com `@nx/angular:webpack-browser`, output próprio e `customWebpackConfig` em shell/webpack.config.ts:1-9) | shell/project.json:2-4 (projeto Nx `shell`, `application`) | — | Yes | Aplicação Angular com entrada e target de build próprios. |

## Resumo

Aplicações frontend no snapshot: 5 (apps/microfrontend-workspace, customer, orders, products, shell).

## Notas

- A contagem difere de `frontend_units: 4` da classificação porque `apps/microfrontend-workspace` é uma aplicação com entrada e build próprios, mas não participa da composição (não é remote do shell nem consome remotes); a classificação a inventaria e não a soma às unidades.
- Nenhum diretório tem Dockerfile, job de CI ou configuração de hospedagem; o `matches.csv` não tem ocorrências `ops-*` nem `ci-*`. Os targets `serve-static` (`@nx/web:file-server`, ex.: shell/project.json:84-91) servem o build localmente e não foram contados como deploy.
- Nenhuma unidade tem `package.json` próprio; as fronteiras vêm dos `project.json` do Nx. A única ocorrência `ws-*` é `ws-path-alias` em tsconfig.base.json:17-20 (aliases dos remotes para tipagem), que não declara membros do workspace.
- `products/my-component.ts` e arquivos irmãos ficam fora de `products/src`, mas pertencem ao projeto `products`; não formam outra unidade.

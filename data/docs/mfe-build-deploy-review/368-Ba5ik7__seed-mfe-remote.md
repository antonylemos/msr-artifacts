---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 368 — Ba5ik7/seed-mfe-remote

## Leitura do repositório

Workspace Angular único, com um `package.json` na raiz e dois projetos no `angular.json`: `seed-mfe-remote` (o remote) e `demo` (o host de demonstração) (angular.json:5-6, :111). Cada projeto tem target `build` próprio com `ngx-build-plus:browser` e saída em `dist/<projeto>` (angular.json:17-20, :122-125), com a configuração de Module Federation passada por `extraWebpackConfig` (angular.json:39, :144). A configuração `production`, que é a padrão do build (angular.json:65, :170), troca para `webpack.prod.config.js` (angular.json:57, :162), mas esse arquivo só reexporta o de desenvolvimento (projects/seed-mfe-remote/webpack.prod.config.js:1; projects/demo/webpack.prod.config.js:1); por isso o host continua apontando para `http://localhost:4202/remoteEntry.js` mesmo no build de produção (projects/demo/webpack.config.js:5-7).

Os scripts da raiz são os gerados pelo Angular CLI: `start` = `ng serve`, `build` = `ng build`, `watch` e `test`, nenhum deles com nome de projeto (package.json:5-9), e `run:all`, que chama o `mf-dev-server` do `@angular-architects/module-federation` para subir os servidores de desenvolvimento (package.json:10). Os dev-servers ficam nas portas 4201 (demo) e 4202 (remote) (angular.json:185-186, :80-81). As tarefas do VS Code só rodam `start` e `test` (.vscode/tasks.json:6-7, :24-25). Tudo isso é desenvolvimento.

Não há deploy no snapshot: nenhum Dockerfile, compose, workflow de CI, configuração de hospedagem ou script de publicação, e o `matches.csv` não tem nenhuma ocorrência `ops-*`, `ci-*` ou `cfg-public-path`. O `dist/` está no `.gitignore` (.gitignore:4). O README é o texto padrão do Angular CLI e só fala de `ng serve` em `localhost:4202` e de `ng build` gerando `dist/` (README.md:10-13, :34-37). O `package.json` tem `"version": "0.0.0"` e `"private": true` (package.json:3, :12), sem publicação. É um template mínimo, preparado para builds separados, mas sem nenhuma forma de publicação registrada.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | projects/demo | separado | não observado | porta 4201 do dev-server, `publicHost: http://localhost:4201` (angular.json:185-186) | No | angular.json:122-125 (target `build` com `ngx-build-plus:browser`, saída `dist/demo`); angular.json:144 (`extraWebpackConfig` com Module Federation); angular.json:162 (`webpack.prod.config.js` em production); projects/demo/webpack.prod.config.js:1 (reexporta a configuração de desenvolvimento) |
| 2 | projects/seed-mfe-remote | separado | não observado | porta 4202 do dev-server, `publicHost: http://localhost:4202` (angular.json:80-81) | No | angular.json:17-20 (target `build` com `ngx-build-plus:browser`, saída `dist/seed-mfe-remote`); angular.json:39 (`extraWebpackConfig` com Module Federation); angular.json:57 (`webpack.prod.config.js` em production); projects/seed-mfe-remote/webpack.prod.config.js:1 (reexporta a configuração de desenvolvimento) |

## Observações

**1. projects/demo.** Build `separado`: o target `build` do projeto gera `dist/demo` (angular.json:122-125) a partir da própria entrada (angular.json:143). O remote não entra nesse artefato: o host o declara em `remotes` (projects/demo/webpack.config.js:5-7) e o carrega em tempo de execução pela URL do `remoteEntry.js`, como registrado na revisão de composição. Deploy `não observado`: só existe o dev-server na porta 4201 (angular.json:172-173, :185-186), que não conta como deploy, e nenhum artefato do snapshot publica o `dist/demo`. Versionamento `No`: o projeto não tem `package.json` próprio, e o da raiz é `0.0.0`, `private` (package.json:3, :12).

**2. projects/seed-mfe-remote.** Build `separado`: target próprio com saída `dist/seed-mfe-remote` (angular.json:17-20), com o `ModuleFederationPlugin` de nome `seedMfeRemote` expondo `./RemoteWidget` (projects/seed-mfe-remote/webpack.config.js:5-8), o que gera o `remoteEntry.js` que o host consome. Deploy `não observado`: o único endereço do remote é o do dev-server, `http://localhost:4202` (angular.json:80-81), o mesmo da coluna Configuração da revisão de composição; nenhum artefato publica a saída do build. Versionamento `No`: sem `package.json` próprio.

## Resumo

Aplicações: 2. Build (separado: 2). Deploy (não observado: 2). Versionamento independente: 0.

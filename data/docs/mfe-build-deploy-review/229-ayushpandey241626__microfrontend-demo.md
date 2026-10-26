---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
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

# 229 — ayushpandey241626/microfrontend-demo

## Leitura do repositório

Workspace Angular único, com um só `package.json` na raiz e quatro projetos em `projects/`
declarados no angular.json:5 (host-app, mfe1, mfe2 e login-mfe-app). Cada projeto tem o próprio
target `build` com `ngx-build-plus:browser` e um `outputPath` próprio: `dist/host-app`,
`dist/mfe1`, `dist/mfe2` e `dist/login-mfe-app` (angular.json:13-16, 114-117, 215-218, 320-323).
O `extraWebpackConfig` de cada build aponta para o `webpack.config.js` do projeto, e a
configuração `production` troca para o `webpack.prod.config.js` (por exemplo angular.json:35, 53),
que só reexporta o `webpack.config.js` (projects/host-app/webpack.prod.config.js:1, e o mesmo nos
outros três). O `dist/` é ignorado pelo git (.gitignore:4).

Os scripts da raiz são os do gerador do Angular: `start` (`ng serve`), `build` (`ng build`, sem
nomear projeto), `watch` e `test` (package.json:5-9). O `run:all` (package.json:10) roda o
servidor de desenvolvimento do pacote `@angular-architects/module-federation`. Cada projeto tem
alvo `serve` com `ngx-build-plus:dev-server` e porta fixa em `localhost`: 4200, 4201, 4202 e 4203
(angular.json:63-78, 164-179, 265-280, 370-385). As tarefas do VS Code só disparam `npm start` e
`npm test` (.vscode/tasks.json:5-25; .vscode/launch.json:5-17).

Não há artefato de deploy no snapshot: nenhum workflow de CI, Dockerfile, compose, manifesto ou
configuração de hospedagem, e o `matches.csv` não tem ocorrência `ops-*`, `ci-*` nem
`cfg-public-path`. É configuração de desenvolvimento: as URLs dos remotes estão fixas em
`localhost`, tanto nos `remotes` do host (projects/host-app/webpack.config.js:21-25) quanto nas
rotas que carregam os módulos remotos (projects/host-app/src/app/app.routes.ts:20, 30, 39), e o
build de produção usa a mesma configuração webpack, então continua apontando para `localhost`.
O README só descreve `ng serve` em `http://localhost:4200/` e `ng build` para `dist/`
(README.md:9-13, 29-37). Nenhum projeto tem versão própria; a única é a `0.0.0` do `package.json`
da raiz (package.json:3), sem uso em publicação.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | projects/host-app | separado | não observado | `http://localhost:4200` em desenvolvimento (angular.json:76-77) | No | angular.json:13-16 (build `ngx-build-plus:browser`, saída `dist/host-app`); angular.json:35 (`extraWebpackConfig` do projeto); projects/host-app/webpack.config.js:11-36 (configuração própria, `uniqueName: "hostApp"`) |
| 2 | projects/login-mfe-app | separado | não observado | `http://localhost:4203` em desenvolvimento (angular.json:383-384) | No | angular.json:320-323 (build `ngx-build-plus:browser`, saída `dist/login-mfe-app`); angular.json:342 (`extraWebpackConfig` do projeto); projects/login-mfe-app/webpack.config.js:6-11 (configuração própria, gera o remote `login-mfe-app`) |
| 3 | projects/mfe1 | separado | não observado | `http://localhost:4201` em desenvolvimento (angular.json:177-178) | No | angular.json:114-117 (build `ngx-build-plus:browser`, saída `dist/mfe1`); angular.json:136 (`extraWebpackConfig` do projeto); projects/mfe1/webpack.config.js:6-11 (configuração própria, gera o remote `mfe1`) |
| 4 | projects/mfe2 | separado | não observado | `http://localhost:4202` em desenvolvimento (angular.json:278-279) | No | angular.json:215-218 (build `ngx-build-plus:browser`, saída `dist/mfe2`); angular.json:237 (`extraWebpackConfig` do projeto); projects/mfe2/webpack.config.js:6-11 (configuração própria, gera o remote `mfe2`) |

## Observações

**1. projects/host-app.** Build próprio, com saída em `dist/host-app` (angular.json:13-16). Não
inclui o código dos remotes: declara-os como `remotes` em `localhost`
(projects/host-app/webpack.config.js:21-25) e os carrega em tempo de execução pelas rotas
(projects/host-app/src/app/app.routes.ts:20, 30, 39); por isso `separado`, embora os quatro
projetos estejam no mesmo workspace. Usa `publicPath: "auto"`
(projects/host-app/webpack.config.js:14). Só é servido pelo `ng serve` na porta 4200
(angular.json:76-77), que é o que o README descreve (README.md:9-13). Sem versão própria.

**2. projects/login-mfe-app.** Build próprio, com saída em `dist/login-mfe-app`
(angular.json:320-323), que gera o remote `login-mfe-app` com a exposição `./LoginModule`
(projects/login-mfe-app/webpack.config.js:6-11). Servido só pelo servidor de desenvolvimento na
porta 4203 (angular.json:383-384), a mesma do `remoteEntry.js` que o host carrega
(projects/host-app/src/app/app.routes.ts:39). Sem versão própria.

**3. projects/mfe1.** Mesma forma da aplicação 2: build próprio com saída em `dist/mfe1`
(angular.json:114-117), remote `mfe1` expondo `./ContactsModule`
(projects/mfe1/webpack.config.js:6-11), servido na porta 4201 (angular.json:177-178), a do
`remoteEntry.js` carregado pelo host (projects/host-app/src/app/app.routes.ts:20). Sem versão
própria.

**4. projects/mfe2.** Mesma forma: build próprio com saída em `dist/mfe2`
(angular.json:215-218), remote `mfe2` expondo `./AdminModule`
(projects/mfe2/webpack.config.js:6-11), servido na porta 4202 (angular.json:278-279), a do
`remoteEntry.js` carregado pelo host (projects/host-app/src/app/app.routes.ts:30). Sem versão
própria.

## Resumo

Aplicações: 4. Build (separado: 4). Deploy (não observado: 4). Versionamento independente: 0.

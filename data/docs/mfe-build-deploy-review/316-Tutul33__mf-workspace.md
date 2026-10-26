---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
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

# 316 — Tutul33/mf-workspace

## Leitura do repositório

Workspace Angular único (um `package.json` e um `angular.json` na raiz) com três projetos ligados por Native Federation: `host-app`, `customer-app` e `orders-app`. Cada projeto tem o próprio target `build`, com o builder `@angular-architects/native-federation:build` (angular.json:17-18; angular.json:130-131; angular.json:243-244), que na configuração `production` delega ao alvo `esbuild` do mesmo projeto (angular.json:21-22; angular.json:134-135; angular.json:247-248), um `@angular/build:application` próprio (angular.json:59-60; angular.json:172-173; angular.json:285-286). Nenhum alvo define `outputPath`, e a pasta de saída `/dist` é ignorada pelo git (.gitignore:4). Os scripts da raiz só chamam o CLI: `start` = `ng serve`, `build` = `ng build`, `watch` = `ng build --watch --configuration development` (package.json:6-8), sem nome de projeto.

Tudo o que existe é de desenvolvimento. Cada projeto tem um `serve-original` com porta própria, 4200, 4301 e 4302 (angular.json:114; angular.json:227; angular.json:340), e o host aponta para os remotes em `http://localhost:4301/remoteEntry.json` e `http://localhost:4302/remoteEntry.json` (projects/host-app/src/app/app.routes.ts:9; projects/host-app/src/app/app.routes.ts:17). O README e o guia `angular_20_microfrontend_app_guide.md` mandam abrir três terminais com `ng serve` (README.md:189-191), o que não é deploy. A `.vscode/tasks.json` só roda os scripts `start` e `test` (.vscode/tasks.json:6-7; .vscode/tasks.json:24-25). Não há Dockerfile, compose, CI nem configuração de hospedagem no snapshot, e o `matches.csv` não tem ocorrências `ops-*`, `ci-*` ou `cfg-public-path`.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | projects/customer-app | separado | não observado | `http://localhost:4301` em desenvolvimento (angular.json:227; projects/host-app/src/app/app.routes.ts:9) | No | angular.json:130-135 (target `build` próprio, native-federation); angular.json:172-173 (alvo `esbuild` próprio, `@angular/build:application`) |
| 2 | projects/host-app | separado | não observado | `http://localhost:4200` em desenvolvimento (angular.json:114) | No | angular.json:17-22 (target `build` próprio, native-federation); angular.json:59-60 (alvo `esbuild` próprio, `@angular/build:application`) |
| 3 | projects/orders-app | separado | não observado | `http://localhost:4302` em desenvolvimento (angular.json:340; projects/host-app/src/app/app.routes.ts:17) | No | angular.json:243-248 (target `build` próprio, native-federation); angular.json:285-286 (alvo `esbuild` próprio, `@angular/build:application`) |

## Observações

**1. projects/customer-app.** O build é separado: o projeto tem target `build` e alvo `esbuild` próprios, com entrada em projects/customer-app/src/main.ts (angular.json:130-135; angular.json:172-175), e gera o `remoteEntry.json` que o host carrega da porta 4301 (projects/host-app/src/app/app.routes.ts:9). Essa porta é a do `serve-original` (angular.json:227), só de desenvolvimento, e nenhum artefato do snapshot publica a aplicação, daí `não observado`. Não há versão própria: o único `version` é o `0.0.0` do workspace (package.json:3), sem uso em publicação.

**2. projects/host-app.** Mesma forma: target `build` e alvo `esbuild` próprios (angular.json:17-22; angular.json:59-60), servido em desenvolvimento na porta 4200 (angular.json:114). Os endereços dos remotes ficam escritos em código como `localhost` (projects/host-app/src/app/app.routes.ts:9; projects/host-app/src/app/app.routes.ts:17), sem configuração por ambiente, o que reforça que o repositório não traz uma forma de publicação.

**3. projects/orders-app.** Igual ao customer-app: target `build` e alvo `esbuild` próprios (angular.json:243-248; angular.json:285-286), `remoteEntry.json` consumido pelo host na porta 4302 (projects/host-app/src/app/app.routes.ts:17; angular.json:340), sem deploy nem versão própria.

## Resumo

Aplicações: 3. Build (separado: 3). Deploy (não observado: 3). Versionamento independente: 0.

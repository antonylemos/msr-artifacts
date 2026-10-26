---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 008 — mrmechazilla/host-app

## Leitura do repositório

Repositório com uma só aplicação Angular, o host. Os dois remotes que ele carrega (`users-mfe` e `payments-mfe`) não estão no snapshot: aparecem só no manifesto, como `localhost:4202` e `localhost:4203` (ver a revisão de composição). O build e o deploy deles, se existem, estão fora do repositório. O build usa `ngx-build-plus` com configuração webpack extra para o Module Federation e grava em `dist/host-app` (angular.json:18-20, 42). Em produção, a configuração extra é `webpack.prod.config.js` (angular.json:63), que só reexporta a de desenvolvimento (webpack.prod.config.js:1).

Os scripts são os padrões do Angular CLI, mais um `run:all` que chama o servidor de desenvolvimento do pacote de Module Federation (package.json:5-11). Não há Dockerfile, CI, configuração de hospedagem nem script de publicação, e as ocorrências `ops-*`, `ci-*` e `cfg-public-path` da mineração estão vazias. O README não traz instruções de build nem de deploy.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | . | separado | não observado | `http://localhost:4201` em desenvolvimento (angular.json:86-87) | No | angular.json:17-20 (target `build` com `ngx-build-plus:browser`, saída `dist/host-app`); angular.json:42 e 63 (configuração webpack extra); package.json:7 (`ng build`) |

## Observações

**1. Raiz (`.`).** Aplicação da raiz. Build separado: o host tem build e saída próprios, e o código dos remotes não está neste repositório. Sem deploy observado: o servidor de desenvolvimento roda na porta 4201 (angular.json:86-87), e nada no snapshot publica a aplicação. Sem versionamento: package.json:3 declara `0.0.0`.

## Resumo

Aplicações: 1. Build (separado: 1). Deploy (não observado: 1). Versionamento independente: 0.

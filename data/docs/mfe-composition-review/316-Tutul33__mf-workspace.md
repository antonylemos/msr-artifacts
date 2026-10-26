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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Leitura do repositório

Workspace Angular montado como guia passo a passo, com três projetos ligados por **Native Federation** (`@angular-architects/native-federation`): o host `host-app` e os remotes `customer-app` e `orders-app`, cada um com seu target de build e sua porta de desenvolvimento (4200, 4301 e 4302; angular.json:114, angular.json:227, angular.json:340). O host não tem manifesto de federação nem `remotes` na configuração (projects/host-app/federation.config.js:3-7 só declara `shared`). As duas ligações estão no código das rotas: `customers` e `orders` carregam, por `loadChildren` e `loadRemoteModule`, o módulo de rotas exposto por cada remote, com a URL do `remoteEntry.json` escrita direto na chamada (projects/host-app/src/app/app.routes.ts:4-20). O host apresenta as duas rotas por links e um `<router-outlet />` (projects/host-app/src/app/app.html:1-3).

Cada remote expõe um único `NgModule` com `RouterModule.forChild` que mostra a página `Home` (projects/customer-app/federation.config.js:7-10; projects/orders-app/federation.config.js:7-10; projects/customer-app/src/app/customer/customer-routes.module.ts:5-12). É um exemplo mínimo: não há troca de mensagens nem estado compartilhado entre as unidades, e o deploy não está no snapshot.

Ficou fora das relações o `initFederation` do host, que registra um remote `customerApp` em `http://localhost:4200/remoteEntry.json` (projects/host-app/src/main.ts:3-5). A porta 4200 é a do próprio host (angular.json:114), e nenhuma rota usa o nome `customerApp`. A revisão de código-fonte deu `No` a essa linha, e ela não sustenta relação. Os `initFederation()` sem argumentos dos remotes só preparam o runtime da própria unidade (projects/customer-app/src/main.ts:3; projects/orders-app/src/main.ts:3). A configuração de cada remote mantém comentada uma exposição alternativa de `./Component` (projects/customer-app/federation.config.js:8; projects/orders-app/federation.config.js:8).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/host-app | projects/customer-app | host → remote | origem → destino | native-federation | Yes | Yes | projects/customer-app/federation.config.js:5-9 (`name: 'customer-app'`, expõe `./CustomerRoutes`); angular.json:227 (porta 4301 do projeto customer-app) | projects/host-app/src/app/app.routes.ts:2; projects/host-app/src/app/app.routes.ts:8; projects/host-app/src/app/app.routes.ts:4 |
| 2 | projects/host-app | projects/orders-app | host → remote | origem → destino | native-federation | Yes | Yes | projects/orders-app/federation.config.js:5-9 (`name: 'orders-app'`, expõe `./OrdersRoutes`); angular.json:340 (porta 4302 do projeto orders-app) | projects/host-app/src/app/app.routes.ts:2; projects/host-app/src/app/app.routes.ts:16; projects/host-app/src/app/app.routes.ts:4 |

## Observações

**1. projects/host-app → projects/customer-app.** A rota `customers` carrega `./CustomerRoutes` de `http://localhost:4301/remoteEntry.json` e usa `CustomerRoutesModule` (projects/host-app/src/app/app.routes.ts:6-11). O módulo pedido corresponde ao `exposes` de projects/customer-app/federation.config.js:9, cuja classe é a de projects/customer-app/src/app/customer/customer-routes.module.ts:12. A porta 4301 do projeto (angular.json:227) só corrobora. As rotas entram no host por `provideRouter` (projects/host-app/src/app/app.config.ts:10), usado no bootstrap (projects/host-app/src/bootstrap.ts:5). Por isso a relação é Ativa.

**2. projects/host-app → projects/orders-app.** Mesmo fluxo na rota `orders`: `./OrdersRoutes` de `http://localhost:4302/remoteEntry.json`, usando `OrdersRoutesModule` (projects/host-app/src/app/app.routes.ts:14-19). O módulo corresponde a projects/orders-app/federation.config.js:9, com a classe em projects/orders-app/src/app/orders/orders-routes.module.ts:12. A porta 4302 (angular.json:340) só corrobora.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

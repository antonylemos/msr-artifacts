---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
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

# 109 — ramdev90/nx-module-federation

## Leitura do repositório

Exemplo Angular num workspace Nx, em boa parte gerado pelo scaffold da ferramenta (telas NxWelcome, comentários de exemplo nas configurações). `shell` é o host e `customer`, `orders` e `products` são remotes de Module Federation. O shell declara os três pelo nome (shell/module-federation.config.ts:17) e cada remote expõe a chave `./Routes`, que aponta para o seu `entry.routes.ts` (customer/module-federation.config.ts:4-7; orders/module-federation.config.ts:4-7; products/module-federation.config.ts:4-7). As quatro configurações são passadas a `withModuleFederation` de `@nx/module-federation/angular` (shell/webpack.config.ts:1-2, 9, com arquivo idêntico nas três outras unidades), e os builds as leem por `customWebpackConfig` (shell/project.json:24-25). Não há URL de remote: o Nx resolve cada nome para o projeto do mesmo workspace, e o shell sobe os remotes com o executor `@nx/angular:module-federation-dev-server` (shell/project.json:60).

A composição é por rotas. O shell carrega `customer/Routes`, `orders/Routes` e `products/Routes` em `loadChildren` e usa o `remoteRoutes` de cada um (shell/src/app/app.routes.ts:4-16); as rotas são registradas por `provideRouter(appRoutes)` (shell/src/app/app.config.ts:9) e apresentadas por um menu com `router-outlet` (shell/src/app/app.html:1-7). O contrato é só uma lista de rotas Angular; as entradas de `customer` e `orders` mostram a tela NxWelcome (customer/src/app/remote-entry/entry.ts:5-7; orders/src/app/remote-entry/entry.ts:5-7), e `products` acrescenta a rota `list` com o componente `ProductList` (products/src/app/remote-entry/entry.routes.ts:5-8). Os aliases `customer/Routes` etc. do tsconfig.base.json:17-20 servem à tipagem dos mesmos especificadores federados.

A particularidade é um acoplamento lateral entre dois remotes, fora da federação: o NxWelcome de `orders` importa `ProductList` das fontes de `products` por caminho relativo (orders/src/app/remote-entry/nx-welcome.ts:3, 7) e renderiza `<app-product-list>` (orders/src/app/remote-entry/nx-welcome.ts:512), fora do bloco comentado do template. Isso virou a relação 4, de tipo `other`. A aplicação inicial `apps/microfrontend-workspace` é uma unidade isolada: rotas vazias (apps/microfrontend-workspace/src/app/app.routes.ts:1-3) e nenhuma ligação com as outras quatro. Não há comunicação explícita entre as unidades (revisão de código-fonte, Notas). O remote externo em shell/module-federation.config.ts:9 é exemplo comentado do scaffold e não entrou como relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | customer | host → remote | origem → destino | module-federation | Yes | Yes | shell/module-federation.config.ts:17 (remote `customer`); customer/module-federation.config.ts:4-7 (`name: 'customer'`, expõe `./Routes`); shell/webpack.config.ts:1-2, 9 e customer/webpack.config.ts:1-2, 9 (`withModuleFederation`); shell/project.json:24-25 e customer/project.json:24-25 (`customWebpackConfig`) | shell/src/app/app.routes.ts:7; shell/src/app/app.routes.ts:4 |
| 2 | shell | orders | host → remote | origem → destino | module-federation | Yes | Yes | shell/module-federation.config.ts:17 (remote `orders`); orders/module-federation.config.ts:4-7 (`name: 'orders'`, expõe `./Routes`); shell/webpack.config.ts:1-2, 9 e orders/webpack.config.ts:1-2, 9 (`withModuleFederation`); shell/project.json:24-25 e orders/project.json:24-25 (`customWebpackConfig`) | shell/src/app/app.routes.ts:11; shell/src/app/app.routes.ts:4 |
| 3 | shell | products | host → remote | origem → destino | module-federation | Yes | Yes | shell/module-federation.config.ts:17 (remote `products`); products/module-federation.config.ts:4-7 (`name: 'products'`, expõe `./Routes`); shell/webpack.config.ts:1-2, 9 e products/webpack.config.ts:1-2, 9 (`withModuleFederation`); shell/project.json:24-25 e products/project.json:24-25 (`customWebpackConfig`) | shell/src/app/app.routes.ts:15; shell/src/app/app.routes.ts:4 |
| 4 | orders | products | other | origem → destino | other | Yes | Yes | — | orders/src/app/remote-entry/nx-welcome.ts:512 |

## Observações

**1. shell → customer.** O remote `customer` do shell (shell/module-federation.config.ts:17) corresponde à unidade customer pelo `name: 'customer'` e pela chave `./Routes` (customer/module-federation.config.ts:4-7), que é o especificador importado em shell/src/app/app.routes.ts:7; o arquivo exposto exporta `remoteRoutes` (customer/src/app/remote-entry/entry.routes.ts:4), que é o que o shell lê. Não há URL nem `publicPath` declarados; a porta 4203 (customer/project.json:62) só corrobora. Ativa porque as duas linhas de código são `Yes` e `appRoutes` é registrado por shell/src/app/app.config.ts:9. A linha shell/src/app/app.routes.ts:4 (`appRoutes`) sustenta também as relações 2 e 3.

**2. shell → orders.** Mesma resolução: remote `orders` (shell/module-federation.config.ts:17), `name: 'orders'` e `./Routes` (orders/module-federation.config.ts:4-7), import em shell/src/app/app.routes.ts:11 e `remoteRoutes` em orders/src/app/remote-entry/entry.routes.ts:4. A rota exposta mostra o NxWelcome de orders (orders/src/app/remote-entry/entry.ts:5-7), onde está a relação 4.

**3. shell → products.** Mesma resolução: remote `products` (shell/module-federation.config.ts:17), `name: 'products'` e `./Routes` (products/module-federation.config.ts:4-7), import em shell/src/app/app.routes.ts:15 e `remoteRoutes` em products/src/app/remote-entry/entry.routes.ts:5-8. É o único remote com mais de uma rota (`''` e `list`). O menu do shell só aponta para a raiz de cada remote (shell/src/app/app.html:3-5).

**4. orders → products.** `orders` embute o componente `ProductList` de `products` importando o arquivo-fonte por caminho relativo que sai do projeto (orders/src/app/remote-entry/nx-welcome.ts:3), declarando-o em `imports` (orders/src/app/remote-entry/nx-welcome.ts:7) e usando a tag `<app-product-list>` (orders/src/app/remote-entry/nx-welcome.ts:512; seletor em products/src/app/product-list.ts:4). O destino é a unidade products pelo caminho do arquivo. Não é Module Federation nem custom element: o componente entra no bundle de orders em tempo de build, por isso tipo e mecanismo `other`, como na revisão de código-fonte. Não há configuração que declare essa ligação. Ativa porque a linha é `Yes`: o NxWelcome é o componente da rota exposta de orders (orders/src/app/remote-entry/entry.ts:2-7; orders/src/app/remote-entry/entry.routes.ts:4), então aparece tanto em orders sozinho quanto dentro do shell. O `ProductList` só mostra "Product List works!" (products/src/app/product-list.html:1-3).

## Resumo

Relações: 4 (host → remote: 3, other: 1). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: apps/microfrontend-workspace.

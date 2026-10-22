---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Leitura do repositório

Repositório de estudo com dois exemplos independentes de Module Federation, ambos com o plugin nativo do webpack 5 (por isso a revisão de dependências não encontrou pacote específico):

- **simple-js:** um `Container` em JavaScript puro e dois remotes, `Products` e `Cart`, que expõem `mount(el)` e são montados em elementos fixos da página (simple-js/Container/src/bootstrap.js:1-5).
- **react-js:** um `container` React e o remote `marketing`. Os diretórios `auth` e `dashboard` só têm manifesto e lockfile, sem código, e não participam da composição.

Nos dois exemplos, o contrato entre as unidades é a função `mount` exportada pelo remote, independente de framework. No exemplo React, a federação só existe na configuração de desenvolvimento: `webpack.prod.js` está vazio (revisão estrutural). O `mount` exportado pelo próprio container React não tem consumidor.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | react-js/container | react-js/marketing | host → remote | origem → destino | module-federation | Yes | Yes | react-js/container/config/webpack.dev.js:19-23 (remote `marketing@http://localhost:8081/remoteEntry.js`); react-js/marketing/config/webpack.dev.js:19-23 (`name: 'marketing'`, `filename: 'remoteEntry.js'`, expõe `./MarketingApp`); react-js/marketing/config/webpack.dev.js:10 (porta 8081) | react-js/marketing/src/bootstrap.js:22; react-js/container/src/components/MarketingApp.js:9; react-js/container/src/components/MarketingApp.js:3 |
| 2 | simple-js/Container | simple-js/Cart | host → remote | origem → destino | module-federation | Yes | Yes | simple-js/Container/webpack.config.js:10-14 (remote `cart@http://localhost:8082/remoteEntry.js`); simple-js/Cart/webpack.config.js:10-15 (`name: 'cart'`, `filename: 'remoteEntry.js'`, expõe `./CartShow`); simple-js/Cart/webpack.config.js:7 (porta 8082) | simple-js/Cart/src/bootstrap.js:3; simple-js/Container/src/bootstrap.js:2; simple-js/Container/src/bootstrap.js:5 |
| 3 | simple-js/Container | simple-js/Products | host → remote | origem → destino | module-federation | Yes | Yes | simple-js/Container/webpack.config.js:10-13 (remote `products@http://localhost:8081/remoteEntry.js`); simple-js/Products/webpack.config.js:10-15 (`name: 'products'`, `filename: 'remoteEntry.js'`, expõe `./ProductsIndex`); simple-js/Products/webpack.config.js:7 (porta 8081) | simple-js/Products/src/bootstrap.js:3; simple-js/Container/src/bootstrap.js:1; simple-js/Container/src/bootstrap.js:4 |

## Observações

**1. react-js/container → react-js/marketing.** O container importa `mount` de `marketing/MarketingApp` (react-js/container/src/components/MarketingApp.js:3) e monta o remote no ref de um componente wrapper (react-js/container/src/components/MarketingApp.js:8-10). O nome e o módulo correspondem a react-js/marketing/config/webpack.dev.js:20-23; a porta 8081 só corrobora.

**2. simple-js/Container → simple-js/Cart.** O container importa `mount` de `cart/CartShow` como `mountCart` e o chama sobre `#dev-cart` (simple-js/Container/src/bootstrap.js:2, 5). O nome e o módulo correspondem a simple-js/Cart/webpack.config.js:11-14; a porta 8082 só corrobora.

**3. simple-js/Container → simple-js/Products.** Mesmo padrão com `products/ProductsIndex` como `mountProducts`, sobre `#dev-products` (simple-js/Container/src/bootstrap.js:1, 4). O nome e o módulo correspondem a simple-js/Products/webpack.config.js:11-14. A porta 8081 também é usada por react-js/marketing, mas cada uma vale dentro do seu exemplo.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

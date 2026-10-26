---
schema: 1
id: 1147094315
full_name: DoniaMahmoud/react-microfrontend
commit: adc0ef9de42ce63b3082f8297d0146b59ac0d612
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

# 330 — DoniaMahmoud/react-microfrontend

## Leitura do repositório

Exemplo didático de Module Federation em JavaScript puro, com três aplicações webpack: `container` é o host e `products` e `cart` são remotes. O host declara os dois remotes por nome e URL do `remoteEntry.js` (container/webpack.config.js:12-15), importa a função `mount` de cada um (container/src/bootstrap.js:1-2) e a chama sobre dois `div` da sua página (container/src/bootstrap.js:6-7; container/public/index.html:5-6). O bootstrap do host é carregado de forma assíncrona (container/src/index.js:2), o padrão usual para que o webpack resolva os remotes antes do uso.

Cada remote expõe o seu `bootstrap` (products/webpack.config.js:13-15; cart/webpack.config.js:13-15), cuja função `mount(el)` só escreve HTML gerado com `faker` no elemento recebido (products/src/bootstrap.js:4-13; cart/src/bootstrap.js:3-6). Os dois remotes também rodam sozinhos em desenvolvimento, montando em `#dev-products`/`#dev-cart` quando o elemento existe (products/src/bootstrap.js:17-25; cart/src/bootstrap.js:8-13); essa montagem é interna a cada unidade e não virou relação. O `faker` aparece em `shared` nos dois remotes (products/webpack.config.js:16; cart/webpack.config.js:16), mas é dependência compartilhada, não composição. Não há troca de mensagens entre as unidades nem entre os dois remotes, e só há modo de desenvolvimento (`mode: "development"` nos três configs, linha 5).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | cart | host → remote | origem → destino | module-federation | Yes | Yes | container/webpack.config.js:14 (remote `cart` em `cart@http://localhost:8082/remoteEntry.js`); cart/webpack.config.js:11-14 (`name: "cart"`, `filename: "remoteEntry.js"`, expõe `./CartShow`); cart/webpack.config.js:7 (porta 8082) | cart/src/bootstrap.js:15; container/src/bootstrap.js:2; container/src/bootstrap.js:7 |
| 2 | container | products | host → remote | origem → destino | module-federation | Yes | Yes | container/webpack.config.js:13 (remote `products` em `products@http://localhost:8081/remoteEntry.js`); products/webpack.config.js:11-14 (`name: "products"`, `filename: "remoteEntry.js"`, expõe `./ProductsIndex`); products/webpack.config.js:7 (porta 8081) | products/src/bootstrap.js:26; container/src/bootstrap.js:1; container/src/bootstrap.js:6 |

## Observações

**1. container → cart.** O remote `cart` do host corresponde à unidade cart pelo nome e pelo módulo: o host importa `cart/CartShow` (container/src/bootstrap.js:2) e cart declara `name: "cart"` e expõe `./CartShow` (cart/webpack.config.js:11-14); a porta 8082 só corrobora. O host monta o carrinho em `#my-cart` (container/src/bootstrap.js:7; container/public/index.html:6), usando o `mount` exportado em cart/src/bootstrap.js:15. As três linhas de código são `Yes` na revisão de código-fonte, por isso a relação é ativa.

**2. container → products.** Mesma cadeia: o host importa `products/ProductsIndex` (container/src/bootstrap.js:1), e products declara `name: "products"` e expõe `./ProductsIndex` (products/webpack.config.js:11-14), com porta 8081 (products/webpack.config.js:7). O host monta a lista de produtos em `#my-products` (container/src/bootstrap.js:6; container/public/index.html:5), usando o `mount` exportado em products/src/bootstrap.js:26. As três linhas de código são `Yes`, por isso a relação é ativa.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

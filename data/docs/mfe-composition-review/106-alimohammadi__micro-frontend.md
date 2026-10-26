---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
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

# 106 — alimohammadi/micro-frontend

## Leitura do repositório

Repositório de código-fonte de um curso de micro frontends, com dois exemplos independentes de Module Federation. Os dois usam o plugin nativo do webpack 5 (`webpack/lib/container/ModuleFederationPlugin`, ecomm/container/webpack.config.js:2; packages/container/config/webpack.dev.js:3), por isso a revisão de dependências não encontrou pacote específico.

- **ecomm:** um `container` em JavaScript puro e dois remotes, `products` e `cart`, que geram HTML com `faker` e expõem `mount(el)`. O container importa os dois `mount` e os chama sobre `#my-products` e `#my-cart` da sua página (ecomm/container/src/bootstrap.js:1-6; ecomm/container/public/index.html:9-10).
- **packages:** um `container` React e o remote `marketing`, também React. O container monta o Marketing num componente adaptador com `useRef`/`useEffect` (packages/container/src/components/MarketingApp.js:1-11), renderizado pelo App do host (packages/container/src/App.js:10). `packages/auth` e `packages/dashboard` só têm manifesto e lockfile e não participam da composição.

Nos dois exemplos o contrato entre as unidades é a função `mount(el)` exportada pelo remote, independente de framework; cada remote também se monta sozinho em desenvolvimento num elemento próprio (`#dev-cart`, `#dev-products`, `#_marketing-dev-root`), o que é interno à unidade. Os dois exemplos não se ligam entre si: ecomm/products e packages/marketing usam a mesma porta 8081 (ecomm/products/webpack.config.js:7; packages/marketing/config/webpack.dev.js:10), mas cada uma vale dentro do seu exemplo. Só o exemplo `packages` tem configuração de produção da federação, com o remote apontando para `PRODUCTION_DOMAIN`, sem valor no snapshot (packages/container/config/webpack.prod.js:6,18).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ecomm/container | ecomm/cart | host → remote | origem → destino | module-federation | Yes | Yes | ecomm/container/webpack.config.js:20-23 (remote `carts` → `cart@http://localhost:8082/remoteEntry.js`); ecomm/cart/webpack.config.js:10-15 (`name: "cart"`, `filename: "remoteEntry.js"`, expõe `./CartShow`); ecomm/cart/webpack.config.js:7 (porta 8082) | ecomm/cart/src/mount.js:26; ecomm/container/src/bootstrap.js:3; ecomm/container/src/bootstrap.js:6 |
| 2 | ecomm/container | ecomm/products | host → remote | origem → destino | module-federation | Yes | Yes | ecomm/container/webpack.config.js:20-21 (remote `products@http://localhost:8081/remoteEntry.js`); ecomm/products/webpack.config.js:10-15 (`name: "products"`, `filename: "remoteEntry.js"`, expõe `./ProductsIndex`); ecomm/products/webpack.config.js:7 (porta 8081) | ecomm/products/src/mount.js:31; ecomm/container/src/bootstrap.js:1; ecomm/container/src/bootstrap.js:5 |
| 3 | packages/container | packages/marketing | host → remote | origem → destino | module-federation | Yes | Yes | packages/container/config/webpack.dev.js:16-20 (remote `marketing@http://localhost:8081/remoteEntry.js`); packages/container/config/webpack.prod.js:15-19 (remote `marketing@${domain}/marketing/remoteEntry.js`); packages/marketing/config/webpack.dev.js:17-22 (`name: "marketing"`, `filename: "remoteEntry.js"`, expõe `./MarketingApp`); packages/marketing/config/webpack.prod.js:12-17 (mesmo `name`, `filename` e `exposes`); packages/marketing/config/webpack.dev.js:10 (porta 8081) | packages/marketing/src/bootstrap.js:17; packages/container/src/components/MarketingApp.js:8; packages/container/src/components/MarketingApp.js:1 |

## Observações

**1. ecomm/container → ecomm/cart.** O container importa `mount` de `carts/CartShow` sob o alias `cartMount` (ecomm/container/src/bootstrap.js:3) e o chama sobre `#my-cart` (ecomm/container/src/bootstrap.js:6). O nome local do remote é `carts`, mas o valor aponta para o container `cart` (ecomm/container/webpack.config.js:22), que corresponde ao `name: "cart"` e ao módulo exposto `./CartShow` → `./src/mount` de ecomm/cart/webpack.config.js:11-15; a porta 8082 só corrobora. O `mount` exportado está em ecomm/cart/src/mount.js:26.

**2. ecomm/container → ecomm/products.** Mesmo padrão: `mount` de `products/ProductsIndex` como `productsMount` (ecomm/container/src/bootstrap.js:1), chamado sobre `#my-products` (ecomm/container/src/bootstrap.js:5). O destino foi resolvido pelo `name: "products"` e pela exposição `./ProductsIndex` → `./src/mount.js` (ecomm/products/webpack.config.js:11-14); a porta 8081 só corrobora. O `package.json` de ecomm/products declara `name` `container` (revisão estrutural), o que não interfere na federação, que usa o `name` do plugin.

**3. packages/container → packages/marketing.** O adaptador do host importa `mount` de `marketing/MarketingApp` (packages/container/src/components/MarketingApp.js:1) e o chama sobre o `ref` do seu `div` (packages/container/src/components/MarketingApp.js:8-11). O destino foi resolvido pelo `name: "marketing"` e pela exposição `./MarketingApp` → `./src/bootstrap` (packages/marketing/config/webpack.dev.js:18-22), que exporta `mount` em packages/marketing/src/bootstrap.js:17. A configuração de produção declara o mesmo remote sob `PRODUCTION_DOMAIN` (packages/container/config/webpack.prod.js:6,18), e o Marketing repete `name`/`exposes` em packages/marketing/config/webpack.prod.js:13-17; a relação ativa se apoia na configuração de desenvolvimento acionada pelo script `webpack serve`.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Leitura do repositório

Exemplo de e-commerce em React/Vite num monorepo de npm workspaces, unido por Module Federation (`@module-federation/vite`). `apps/host` é o shell: declara três remotes, `header`, `footer` e `products` (apps/host/vite.config.ts:25-47), e os carrega com `lazy(() => import('<remote>/<módulo>'))` (apps/host/src/App.tsx:5-7). Cada remote é uma aplicação própria que expõe um único componente por `remoteEntry.js`: `./Header` (apps/header/vite.config.ts:14-19), `./Footer` (apps/footer/vite.config.ts:14-19) e `./ProductsList` (apps/products/vite.config.ts:14-19). O host monta a página em três faixas, cada uma com `RemoteErrorBoundary` e `Suspense` com skeleton de `@microfrontend/ui` (apps/host/src/App.tsx:12-30), de modo que a falha de um remote não derruba os outros.

As URLs dos remotes vêm de variáveis de ambiente, com `http://localhost:300N/remoteEntry.js` como padrão (apps/host/vite.config.ts:12-15). No CI elas são preenchidas por variáveis do repositório (.github/workflows/ci-cd.yml:102-104), cujos valores não estão no snapshot. Os destinos foram resolvidos pelo `name` e pelos `exposes` dos remotes, não pela URL.

Além da composição visual, os remotes `products` e `header` conversam pelo carrinho: o store Zustand `useCartStore` de packages/shared (packages/shared/src/state/cart-store.ts:12), declarado singleton no host e nos dois remotes. packages/shared não é unidade, então não aparece como Origem nem Destino. O host só provê o store compartilhado e não o lê nem escreve, e o footer não o usa (apps/footer/vite.config.ts:20 compartilha só `react` e `react-dom`). O README descreve o mesmo arranjo (README.md:34-38 e :171). Todas as quatro unidades estruturais participam de ao menos uma relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/host | apps/header | host → remote | origem → destino | module-federation | Yes | Yes | apps/host/vite.config.ts:26-32 (remote `header`, `name: 'header'`, `entry: headerRemote`); apps/host/vite.config.ts:12 (`VITE_HEADER_REMOTE_URL` ou `http://localhost:3001/remoteEntry.js`); apps/header/vite.config.ts:14-19 (`name: "header"`, `filename: "remoteEntry.js"`, expõe `./Header`); apps/header/vite.config.ts:41 (porta 3001) | apps/host/src/App.tsx:5; apps/host/src/App.tsx:14 |
| 2 | apps/host | apps/footer | host → remote | origem → destino | module-federation | Yes | Yes | apps/host/vite.config.ts:33-39 (remote `footer`, `name: 'footer'`, `entry: footerRemote`); apps/host/vite.config.ts:13 (`VITE_FOOTER_REMOTE_URL` ou `http://localhost:3002/remoteEntry.js`); apps/footer/vite.config.ts:14-19 (`name: 'footer'`, `filename: 'remoteEntry.js'`, expõe `./Footer`); apps/footer/vite.config.ts:25 (porta 3002) | apps/host/src/App.tsx:6; apps/host/src/App.tsx:28 |
| 3 | apps/host | apps/products | host → remote | origem → destino | module-federation | Yes | Yes | apps/host/vite.config.ts:40-46 (remote `products`, `name: 'products'`, `entry: productsRemote`); apps/host/vite.config.ts:14-15 (`VITE_PRODUCTS_REMOTE_URL` ou `http://localhost:3003/remoteEntry.js`); apps/products/vite.config.ts:14-19 (`name: "products"`, `filename: "remoteEntry.js"`, expõe `./ProductsList`); apps/products/vite.config.ts:41 (porta 3003) | apps/host/src/App.tsx:7; apps/host/src/App.tsx:21 |
| 4 | apps/products | apps/header | communication | origem → destino | events | Yes | Yes | apps/host/vite.config.ts:55-60 (`zustand` e `@microfrontend/shared` singleton); apps/header/vite.config.ts:27-32 (idem); apps/products/vite.config.ts:27-32 (idem) | packages/shared/src/state/cart-store.ts:12 |

## Observações

**1. apps/host → apps/header.** O remote `header` do host corresponde a apps/header pelo `name: "header"` e pelo módulo exposto `./Header` (apps/header/vite.config.ts:14-18), que é o especificador `header/Header` importado em apps/host/src/App.tsx:5; a porta 3001 da URL padrão (apps/host/vite.config.ts:12; apps/header/vite.config.ts:41) só corrobora. O componente é renderizado em apps/host/src/App.tsx:14, e `App` é montado pela entrada do host (apps/host/src/main.tsx:5 e :13), por isso a relação é ativa.

**2. apps/host → apps/footer.** Resolvido do mesmo modo: `name: 'footer'` e `./Footer` exposto (apps/footer/vite.config.ts:14-18) correspondem a `footer/Footer` em apps/host/src/App.tsx:6; porta 3002 (apps/footer/vite.config.ts:25) como corroboração. Renderizado em apps/host/src/App.tsx:28. Diferente dos outros dois remotes, o footer compartilha só `react` e `react-dom` (apps/footer/vite.config.ts:20), sem `singleton`, enquanto o host pede `singleton: true` para ambos (apps/host/vite.config.ts:49-54).

**3. apps/host → apps/products.** `name: "products"` e `./ProductsList` exposto (apps/products/vite.config.ts:14-18) correspondem a `products/ProductsList` em apps/host/src/App.tsx:7; porta 3003 (apps/products/vite.config.ts:41) como corroboração. Renderizado em apps/host/src/App.tsx:21, dentro da `section` principal da página (apps/host/src/App.tsx:18-24).

**4. apps/products → apps/header.** O canal é `useCartStore` (packages/shared/src/state/cart-store.ts:12), Zustand com `persist` na chave `cart-storage` (:70-72), exportado por packages/shared/src/index.ts:4. Ele vira estado único entre os remotes por ser singleton do Module Federation (`zustand` e `@microfrontend/shared`) no host e nos dois remotes. apps/products escreve: `ProductCard` chama `addProduct` (apps/products/src/components/Product.tsx:14 e :36), e `ProductCard` é usado em apps/products/src/ProductsList.tsx:30, o módulo exposto. apps/header lê os itens e a quantidade total (apps/header/src/Header.tsx:16-17). O header também escreve, ao remover itens com `removeAllProduct` (apps/header/src/Header.tsx:18 e :27), mas apps/products não lê o carrinho: só usa `addProduct`. Por isso a direção é `origem → destino`, de products para header, e não `bidirecional`. O mecanismo é `events`, como serviço reativo compartilhado. O host provê o store mas não o usa (apps/host/src/main.tsx:4 importa de `@microfrontend/shared` só `createAppQueryClient`), então não entra na relação. A relação é ativa porque a linha da revisão de código-fonte é `Yes`.

## Resumo

Relações: 4 (host → remote: 3, communication: 1). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

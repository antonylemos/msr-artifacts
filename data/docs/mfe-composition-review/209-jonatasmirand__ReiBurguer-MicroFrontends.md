---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
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

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Leitura do repositório

Projeto de aprendizado com três aplicações Next.js (Pages Router) em pastas irmãs, sem workspace: `container` é o host, `cardapio` e `pedido` são remotes. As três usam `NextFederationPlugin` de `@module-federation/nextjs-mf` dentro de `webpack(config)`. O host declara os dois remotes com URLs `localhost` fixas (container/next.config.mjs:12-15) e, na rota `/`, carrega por `next/dynamic` com `ssr: false` o componente exposto por cada um (container/src/pages/index.js:5-6), montando o cardápio e, abaixo dele, o pedido na mesma página (container/src/pages/index.js:20-26).

Além do carregamento, os dois remotes trocam dados por um `CustomEvent` no `window` da página do container: o botão de cada prato do cardápio dispara `adicionarCarrinho` com nome e preço (cardapio/src/components/Cardapio.jsx:30-40), e o pedido escuta o evento e soma os itens (pedido/src/_components/Pedido.jsx:7-18). O container não envia nem recebe mensagens; só junta os dois na página.

Particularidades que não viraram relação: `cardapio` tem dois arquivos de configuração. O `next.config.js`, que o Next 14 carrega com precedência, expõe `./src/components/Cardapio.jsx` (cardapio/next.config.js:10-12); o `next.config.mjs` expõe `./src/_components/Cardapio.jsx` (cardapio/next.config.mjs:12-14), ausente do snapshot. Em `Cardapio.jsx` há ainda a função `adicionarPedido`, que dispara outro evento (cardapio/src/components/Cardapio.jsx:5-8), nunca é chamada e não tem ouvinte; a revisão de código-fonte a marcou `No`. O container declara `filename: 'static/chunks/remoteEntry.js'` (container/next.config.mjs:11), mas não expõe nada. As imagens dos pratos vêm da origem do remote (cardapio/src/components/Cardapio.jsx:21), o que reforça a porta 3001, mas é recurso estático, não composição.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | container | cardapio | host → remote | origem → destino | module-federation | Yes | Yes | container/next.config.mjs:14 (remote `cardapio@http://localhost:3001/_next/static/chunks/remoteEntry.js`); cardapio/next.config.js:8-12 (`name: "cardapio"`, `filename: "static/chunks/remoteEntry.js"`, expõe `./Cardapio`); cardapio/package.json:6 (`next dev --port 3001`) | container/src/pages/index.js:5; container/src/pages/index.js:20 |
| 2 | container | pedido | host → remote | origem → destino | module-federation | Yes | Yes | container/next.config.mjs:13 (remote `pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js`); pedido/next.config.mjs:10-14 (`name: 'pedido'`, `filename: 'static/chunks/remoteEntry.js'`, expõe `./Pedido`); pedido/package.json:6 (`next dev --port 3002`) | container/src/pages/index.js:6; container/src/pages/index.js:25 |
| 3 | cardapio | pedido | communication | origem → destino | events | Yes | Yes | — | cardapio/src/components/Cardapio.jsx:32; cardapio/src/components/Cardapio.jsx:33; pedido/src/_components/Pedido.jsx:13 |

## Observações

**1. container → cardapio.** O import `cardapio/Cardapio` (container/src/pages/index.js:5) usa o remote `cardapio` do host (container/next.config.mjs:14), cujo nome e módulo correspondem a `name: "cardapio"` e à chave `./Cardapio` de cardapio/next.config.js:8-11; a porta 3001 do script `dev` (cardapio/package.json:6) só corrobora. O componente é renderizado na rota `/` (container/src/pages/index.js:20). A configuração citada é a do `next.config.js`, que tem precedência; o `next.config.mjs` declara o mesmo `name` e a mesma chave exposta, mas com um caminho que não existe (cardapio/next.config.mjs:10-13), o que não muda o destino nem a direção.

**2. container → pedido.** O import `pedido/Pedido` (container/src/pages/index.js:6) usa o remote `pedido` (container/next.config.mjs:13), que corresponde a `name: 'pedido'` e à chave `./Pedido` de pedido/next.config.mjs:10-13; a porta 3002 (pedido/package.json:6) corrobora. O componente é renderizado dentro de `styles.section` (container/src/pages/index.js:24-26).

**3. cardapio → pedido.** O cardápio envia `adicionarCarrinho` por `window.top.dispatchEvent` (cardapio/src/components/Cardapio.jsx:32-38) e o pedido o recebe por `window.addEventListener` (pedido/src/_components/Pedido.jsx:13); não há envio no sentido inverso, por isso a direção é `origem → destino`. O canal só liga as duas unidades porque o container monta os dois componentes na mesma página (container/src/pages/index.js:20 e 25); sem iframe no snapshot, `window.top` é o mesmo `window` que o pedido escuta. Não há configuração própria do canal. As linhas `adicionarPedido` (cardapio/src/components/Cardapio.jsx:6-7), marcadas `No` na revisão de código-fonte, ficaram fora.

## Resumo

Relações: 3 (host → remote: 2, communication: 1). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

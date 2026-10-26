---
schema: 1
id: 1031213794
full_name: Axiean/micro-store
commit: 7ed9142db806ba9851416ae0b8bb207d5d10bdca
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

# 237 — Axiean/micro-store

## Leitura do repositório

Exemplo feito como avaliação técnica de frontend (README.md:3): uma loja com duas aplicações
Next.js independentes unidas por Next.js Multi-Zones (README.md:5-12). O `store-app` é a vitrine
e o ponto de entrada dos usuários (docker-compose.yml:6-7, porta 3000 em :15); o `cart-app` é o
carrinho, servido sob `basePath: "/cart"` (cart-app/next.config.ts:4).

A composição é por rota no servidor, não por montagem na página. O `store-app` declara em
`rewrites()` que toda requisição `/cart/:path*` vai para `http://cart-app:3000/cart/:path*`
(store-app/next.config.ts:32-41), e o próprio comentário chama isso de "the core of the
Multi-Zone micro-frontend architecture" (store-app/next.config.ts:28). O hostname `cart-app` é o
nome do serviço do Compose construído de `./cart-app` (docker-compose.yml:20-24). Cada zona
renderiza a página inteira com layout próprio. Como em 013, nenhum dos tipos `host → remote`,
`root-config → application`, `application → custom-element` ou `page → embedded-frontend`
descreve essa forma de entrada, por isso a relação de rota está como `other`.

A segunda ligação é o estado do carrinho. As duas zonas têm uma cópia do mesmo store zustand,
persistido na mesma chave `cart-storage` do `localStorage` (store-app/src/store/cartStore.ts:83-84;
cart-app/src/store/cartStore.ts:83-84). O `store-app` grava ao adicionar produtos e o `cart-app`
lê a lista para exibir o carrinho. Isso funciona porque o rewrite coloca o `cart-app` sob a origem
do `store-app`; acessado direto pela porta 3001 (docker-compose.yml:25-28), o `cart-app` fica em
outra origem e não vê o mesmo `localStorage`.

O que não virou relação: a navegação do `store-app` para o carrinho é um link de página inteira
(`<a href="/cart">`, store-app/src/components/Header.tsx:29), que não é tipo de relação. O
`cartStore.ts` é cópia em cada zona, não import entre unidades. O alias `@repo/ui/*` para
`../../packages/ui/*` nos dois `tsconfig.json` aponta para um diretório ausente do snapshot e não
é usado. Não há dependência das tecnologias inspecionadas (revisão de dependências) nem
carregamento de módulos de uma zona pela outra.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | store-app | cart-app | other | origem → destino | other | Yes | Yes | store-app/next.config.ts:36-39 (`/cart/:path*` → `http://cart-app:3000/cart/:path*`); docker-compose.yml:20-24 (serviço `cart-app`, `context: ./cart-app`); cart-app/next.config.ts:4 (`basePath: "/cart"`) | store-app/next.config.ts:32 |
| 2 | store-app | cart-app | communication | origem → destino | other | Yes | Yes | — | store-app/src/store/cartStore.ts:83 |

## Observações

**1. store-app → cart-app.** O `store-app` repassa `/cart/:path*` para
`http://cart-app:3000/cart/:path*` (store-app/next.config.ts:36-39). O destino foi resolvido por
duas correspondências: o hostname `cart-app` é o serviço do Compose construído de `./cart-app`
(docker-compose.yml:20-23), com o contêiner na porta interna 3000 (docker-compose.yml:28;
`EXPOSE 3000` em cart-app/Dockerfile:32); e o prefixo `/cart` do destino é o `basePath` da zona
(cart-app/next.config.ts:4), cuja página `Home` monta o carrinho (cart-app/src/app/page.tsx:10).
Tipo e mecanismo são `other`: o `store-app` não carrega módulos da zona nem a registra num
orquestrador; ele encaminha requisições de um caminho para outra aplicação, que responde com a
página inteira (Next.js Multi-Zones por `rewrites`), como nas relações 1-3 de 013. A direção é a
do encaminhamento. Diferente de 013, o destino está fixo na configuração, sem variável de ambiente.

**2. store-app → cart-app.** O `store-app` grava o carrinho no store persistido na chave
`cart-storage` (store-app/src/store/cartStore.ts:83-84; `localStorage.setItem` em :26) ao adicionar
produtos (`addToCart`, :38-55), chamado por `ProductCard` (store-app/src/components/ProductCart.tsx:17).
O `cart-app` declara o mesmo store na mesma chave (cart-app/src/store/cartStore.ts:83-84) e lê os
itens em `CartDisplay` (cart-app/src/components/CartDisplay.tsx:15). Mecanismo `other`: é estado
compartilhado por `localStorage` sob a mesma origem, não troca de eventos, como as relações 4-6 de
013. A leitura só vê os dados porque o rewrite da relação 1 une as zonas numa origem. O `cart-app`
também regrava a chave em `removeItem` e `updateQuantity` (cart-app/src/store/cartStore.ts:58-80),
e o `Header` do `store-app` lê os itens persistidos (store-app/src/components/Header.tsx:8). A
revisão de código-fonte não registrou essas linhas como construção, então, como em 013, a direção
fica a da gravação registrada (store-app/src/store/cartStore.ts:83) e não `bidirecional`.

## Resumo

Relações: 2 (other: 1, communication: 1). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

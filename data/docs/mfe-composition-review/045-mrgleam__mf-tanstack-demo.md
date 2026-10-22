---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
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

# 045 — mrgleam/mf-tanstack-demo

## Leitura do repositório

Demonstração com duas aplicações React/Vite unidas por Module Federation (`@originjs/vite-plugin-federation`): `shell` é o host e `shop` é o remote, que expõe suas rotas (shop/vite.config.ts:9-12). O shell não importa o remote diretamente nas rotas. Ele usa um `ModuleLoader` próprio, com cache, retentativas e fallback (shell/src/moduleLoader.ts:26-98, 127-136). As retentativas não refazem a importação: o `import('shop/ShopRoutes')` é criado uma única vez em shell/src/moduleLoader.ts:130, e o laço só aguarda de novo a mesma promessa (shell/src/moduleLoader.ts:43-47), então uma falha de carga leva direto ao fallback. O shell encaixa as rotas recebidas na árvore do TanStack Router durante a criação do router (shell/src/router.tsx:52-103).

A particularidade está no contrato entre os dois lados: o shell espera `default.routes` (shell/src/router.tsx:61-68), mas o shop exporta `routes` e `shopRouter` só por nome (shop/src/routes/ShopRoutes.tsx:49-53). O módulo remoto é carregado, mas nada no código garante que as rotas cheguem à árvore; o fallback `{ default: { routes: [] } }` (shell/src/moduleLoader.ts:134) indica que o shell pode seguir sem elas. O shop também roda sozinho, com seu próprio router (shop/src/main.tsx:4-7).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | shop | host → remote | origem → destino | module-federation | Yes | Yes | shell/vite.config.ts:9-11 (remote `shop` em `http://localhost:3001/shop/assets/remoteEntry.js`); shop/vite.config.ts:10-12 (`name: 'shop'`, `filename: 'remoteEntry.js'`, expõe `./ShopRoutes`); shop/vite.config.ts:6 (`base: '/shop/'`); shop/vite.config.ts:17 (porta 3001) | shell/src/moduleLoader.ts:130; shell/src/moduleLoader.ts:127; shell/src/router.tsx:52; shell/src/router.tsx:64 |

## Observações

**1. shell → shop.** O remote `shop` declarado pelo shell corresponde à unidade shop pelo nome e pelo `remoteEntry.js` (shop/vite.config.ts:10-11) e pelo caminho `/shop/` (shop/vite.config.ts:6); a porta 3001 só corrobora. A relação é ativa porque o import é solicitado na inicialização do router (shell/src/main.tsx:4-7 → shell/src/router.tsx:116). A única linha Undetermined (shell/src/router.tsx:64) é a extração das rotas, afetada pelo desencontro de export descrito na leitura.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

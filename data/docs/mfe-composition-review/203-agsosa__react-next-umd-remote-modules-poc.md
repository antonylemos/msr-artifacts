---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
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

# 203 — agsosa/react-next-umd-remote-modules-poc

## Leitura do repositório

Prova de conceito com duas aplicações Next.js, `shell` e `mf-1`, que o README apresenta como microfrontends baseados em UMD, "not Module Federation" (README.md:1-3, 12-17). O `mf-1` é uma aplicação completa (porta 3001, mf-1/package.json:7) e, no mesmo build, empacota com Vite três componentes React (`Header`, `Fulfilment`, `FulfilmentDetails`, mf-1/src/RemoteModules/RemoteModules.ts:6-10) num bundle UMD `bundle.js` que publica a global `MF1_RemoteModules` e fica em `public/remote-modules` (mf-1/vite.mf.ts:28, 33, 37-39). React e ReactDOM ficam fora do bundle e são esperados como globais do host (mf-1/vite.mf.ts:35, 42-45).

O `shell` é o host. Um hook genérico, `useRemoteModule`, expõe `window.React`/`window.ReactDOM`, injeta o `<script>` do bundle e lê o componente pedido em `window[moduleName][componentName]` (shell/src/hooks/useRemoteModule.ts:23-24, 36-37, 79-99); se o script já está no `head`, ele é reaproveitado (shell/src/hooks/useRemoteModule.ts:55-75). Três componentes do shell usam o hook, cada um pedindo um componente do bundle, e o renderizam como componente React comum, com props e callbacks do shell (shell/src/components/RemoteHeader.tsx:18-22, 37; shell/src/components/RemoteFulfilment.tsx:29-33, 65-68; shell/src/components/RemoteFulfilmentDetails.tsx:29-33, 65-68). A URL base do `mf-1` vem de `publicRuntimeConfig.MF1_BASE_URL`, com padrão `http://localhost:3001` (shell/next.config.js:7-9).

O contrato entre as unidades é a global UMD, os nomes dos componentes e as props. Não há canal de mensagens: o shell passa ao `Header` remoto o próprio `router` do Next, que o remote usa para navegar (mf-1/src/RemoteModules/Header.tsx:83-85, 104-106), e callbacks como `onFulfil`, `onTrack` e `onStatusChange`; isso não virou relação `communication`. O `postMessage` registrado pela mineração em `mf-1/public/remote-modules/bundle.js:10` é do axios embutido no bundle gerado, e a revisão de código-fonte o marcou `No`. O `mf-1` também usa os mesmos componentes localmente, o que é interno à unidade.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | shell | mf-1 | host → remote | origem → destino | script | Yes | Yes | mf-1/vite.mf.ts:28 (`outDir: "public/remote-modules"`); mf-1/vite.mf.ts:33 (entrada `src/RemoteModules/RemoteModules.ts`); mf-1/vite.mf.ts:37-39 (`bundle.js`, formato `umd`, global `MF1_RemoteModules`); mf-1/vite.mf.ts:35 (`external: ["react", "react-dom"]`); shell/next.config.js:8 (`MF1_BASE_URL`, padrão `http://localhost:3001`) | shell/src/hooks/useRemoteModule.ts:79; shell/src/components/RemoteHeader.tsx:18; shell/src/components/RemoteHeader.tsx:37; shell/src/components/RemoteFulfilment.tsx:29; shell/src/components/RemoteFulfilment.tsx:65; shell/src/components/RemoteFulfilmentDetails.tsx:29; shell/src/components/RemoteFulfilmentDetails.tsx:65 |

## Observações

**1. shell → mf-1.** O destino foi resolvido por correspondência explícita: o shell pede `MF1_BASE_URL + "/remote-modules/bundle.js"` com `moduleName: "MF1_RemoteModules"` (shell/src/components/RemoteHeader.tsx:19-20), e o build Vite do `mf-1` gera `bundle.js` em `public/remote-modules` com a global `MF1_RemoteModules` (mf-1/vite.mf.ts:28, 37-39); os nomes `Header`, `Fulfilment` e `FulfilmentDetails` são as exportações da entrada do bundle (mf-1/src/RemoteModules/RemoteModules.ts:10). A porta 3001 do padrão de `MF1_BASE_URL` (shell/next.config.js:8; mf-1/package.json:7) só reforça. O tipo é `host → remote` e não `page → embedded-frontend`: o shell não monta o destino por uma API global (`mount`/`render`), e sim lê componentes React expostos pelo bundle e os renderiza na própria árvore (shell/src/hooks/useRemoteModule.ts:23-24, 84-87; shell/src/components/RemoteHeader.tsx:37), ou seja, o destino entra como módulo de componentes; o mecanismo é `script` porque o carregamento é por `<script>` injetado, sem runtime de federação. Ativa `Yes`: as sete linhas da revisão de código-fonte são `Yes`, e os componentes são usados nas páginas do shell (shell/src/pages/index.tsx:178; shell/src/pages/fulfilment.tsx:29-30; shell/src/pages/orders/[id].tsx:410). As três chamadas ao hook e as três renderizações caem no mesmo trio Origem, Destino, Tipo e formam uma relação só.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

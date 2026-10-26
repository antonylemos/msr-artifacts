---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
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

# 305 — martinkuba/micro-frontend-test

## Leitura do repositório

Aplicação de teste do Grafana Faro numa arquitetura de micro-frontends. É um monorepo com npm workspaces e três pacotes webpack 5 (package.json:14-18). `packages/shell` é o host React: seu `ModuleFederationPlugin` declara o remote `mainContent` (packages/shell/webpack.config.js:32-35). A entrada carrega o bootstrap de forma assíncrona (packages/shell/src/index.tsx:2), e o bootstrap monta o `App` (packages/shell/src/bootstrap.tsx:14-19). O `App` carrega `mainContent/MainContent` com `React.lazy` (packages/shell/src/App.tsx:6) e o renderiza dentro de `ErrorBoundary` e `Suspense` (packages/shell/src/App.tsx:199-203). `packages/main-content` é o remote: expõe `./MainContent` num `remoteEntry.js` (packages/main-content/webpack.config.js:31-36). O único mecanismo é Module Federation, com `react`, `react-dom` e `@grafana/faro-web-sdk` compartilhados como singletons (packages/shell/webpack.config.js:38-42; packages/main-content/webpack.config.js:37-41).

O terceiro pacote, `packages/sidebar`, tem configuração de remote completa (`name: 'sidebar'`, `exposes: { './Sidebar' }`, packages/sidebar/webpack.config.js:32-36), mas está desligado no snapshot. A declaração do remote no shell está comentada (packages/shell/webpack.config.js:36), assim como o import (packages/shell/src/App.tsx:7) e a montagem (packages/shell/src/App.tsx:206-214). Só a declaração de tipo `sidebar/Sidebar` permanece (packages/shell/src/remotes.d.ts:7-10), e ela não carrega nada. O script `start` sobe só main-content e shell (package.json:7); `start:sidebar` fica à parte (package.json:10). Por isso o sidebar não virou relação.

Não há comunicação entre as unidades. Cada uma inicializa sua própria instância do Faro (packages/shell/src/bootstrap.tsx:7), o que é telemetria, não troca de mensagens, e a busca no snapshot não achou `CustomEvent`, `postMessage`, `dispatchEvent` nem `BroadcastChannel` em `packages/`.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/shell | packages/main-content | host → remote | origem → destino | module-federation | Yes | Yes | packages/shell/webpack.config.js:34-35 (remote `mainContent` em `http://localhost:3001/remoteEntry.js`); packages/main-content/webpack.config.js:32-36 (`name: 'mainContent'`, `filename: 'remoteEntry.js'`, expõe `./MainContent`); packages/main-content/webpack.config.js:11 (`publicPath: 'http://localhost:3001/'`); packages/main-content/webpack.config.js:45 (porta 3001) | packages/shell/src/App.tsx:6; packages/shell/src/App.tsx:201 |

## Observações

**1. packages/shell → packages/main-content.** O remote `mainContent` declarado pelo shell (packages/shell/webpack.config.js:35) corresponde a `packages/main-content` pelo `name: 'mainContent'` e pelo `filename: 'remoteEntry.js'` (packages/main-content/webpack.config.js:32-33). O módulo importado, `mainContent/MainContent`, é o `./MainContent` exposto (packages/main-content/webpack.config.js:34-36), cujo export default é o componente (packages/main-content/src/MainContent.tsx:104). O `publicPath` e a porta 3001 (packages/main-content/webpack.config.js:11, 45) só corroboram. A relação é ativa: as duas linhas `Yes` da revisão de código-fonte são o `React.lazy` (packages/shell/src/App.tsx:6) e a renderização `<MainContent />` (packages/shell/src/App.tsx:201), e o `App` é montado na inicialização (packages/shell/src/bootstrap.tsx:14-19). A revisão estrutural deixou `packages/main-content` como `Undetermined` porque o pacote não roda sozinho; o papel dele de remote está estabelecido pela configuração e pelo consumo.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

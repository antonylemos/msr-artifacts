---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 305 — martinkuba/micro-frontend-test

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | packages/shell/src/App.tsx:6 | packages/shell | dynamic-loading | Yes | `React.lazy(() => import('mainContent/MainContent'))` carrega o módulo exposto pelo remote `mainContent` (packages/main-content/webpack.config.js:34-36, `./MainContent`), declarado em packages/shell/webpack.config.js:35 (`mainContent@http://localhost:3001/remoteEntry.js`); renderizado em packages/shell/src/App.tsx:201; `App` montado em packages/shell/src/bootstrap.tsx:14-19, carregado por packages/shell/src/index.tsx:2 (`entry` em packages/shell/webpack.config.js:9) |
| src-remote-import | packages/shell/src/App.tsx:7 | packages/shell | dynamic-loading | No | Linha comentada (`//`); o render `<Sidebar />` também está comentado (packages/shell/src/App.tsx:206-214) e o remote `sidebar` está comentado em packages/shell/webpack.config.js:36 |
| src-async-bootstrap | packages/shell/src/index.tsx:2 | packages/shell | dynamic-loading | No | `import('./bootstrap')` carrega o próprio bootstrap do shell (packages/shell/src/bootstrap.tsx); interno à unidade |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | packages/shell/src/App.tsx:201 | packages/shell | runtime-composition | Yes | `<MainContent />` renderiza no host o componente do remote `mainContent` (carregado por `React.lazy` em packages/shell/src/App.tsx:6), dentro de `ErrorBoundary` e `Suspense` (packages/shell/src/App.tsx:199-203) |

## Resumo

Construções com composição: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notas

- O remote `sidebar` (packages/sidebar) não participa da composição no snapshot: import, render e declaração do remote estão comentados (packages/shell/src/App.tsx:7 e 206-214; packages/shell/webpack.config.js:36). A declaração de tipo em packages/shell/src/remotes.d.ts:7-10 não carrega nada.
- Cada unidade inicializa o Grafana Faro por conta própria (packages/shell/src/bootstrap.tsx:7; packages/main-content/src/MainContent.tsx:108-110 com `isolate: true` em packages/main-content/src/faro.ts:28), e `@grafana/faro-web-sdk` é `shared` singleton (packages/shell/webpack.config.js:41; packages/main-content/webpack.config.js:40). É telemetria enviada a coletores distintos, não mecanismo de comunicação entre unidades; não virou linha.
- A busca do passo 4 não encontrou custom elements, iframes, scripts injetados nem eventos/mensagens entre unidades.

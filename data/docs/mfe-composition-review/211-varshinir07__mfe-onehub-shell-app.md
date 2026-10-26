---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
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

# 211 — varshinir07/mfe-onehub-shell-app

## Leitura do repositório

O repositório contém só o host de Module Federation, um projeto React criado com Create React App e passado para uma configuração Webpack 5 própria (src/webpack.config.js:1-102). O host se declara `onehub` e não expõe nada; consome dois remotes fora do snapshot, declarados com chaves locais distintas dos nomes dos containers: `remote1` → `subscription@http://localhost:3001/remoteEntry.js` e `remote2` → `ownership@http://localhost:3002/remoteEntry.js` (src/webpack.config.js:72-78). `react` e `react-dom` são compartilhados como singleton e `eager` (src/webpack.config.js:79-91), e a entrada renderiza o App diretamente, sem bootstrap assíncrono (src/index.js:7-12).

Toda a composição está numa única tela: `src/pages/Dashboard.jsx` carrega por `React.lazy` três módulos de `subscription` (`ModemAuthorization`, `SecurityPackage`, `Card`) e dois de `ownership` (`LabourHourHold`, `MobileService`) (src/pages/Dashboard.jsx:3-9) e os renderiza lado a lado sob um único `React.Suspense` (src/pages/Dashboard.jsx:15-26); só `Card` recebe props do host (src/pages/Dashboard.jsx:22-25). O Dashboard é montado pelo App (src/App.js:3, 8). Não há roteamento, comunicação entre unidades nem tratamento de falha de carga além do fallback "Loading...".

É um exemplo: URLs fixas de `localhost`, sem deploy, com o README padrão do CRA. O cabeçalho do README chama o projeto de "MFE Remote App for OnehubShell" (README.md:1-2), o que diverge do código, em que ele é o host. Os remotes não estão no snapshot nem são localizados por outra referência além da URL local.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | subscription | host → remote | origem → destino | module-federation | No | Yes | src/webpack.config.js:76 (`remote1: 'subscription@http://localhost:3001/remoteEntry.js'`) | src/pages/Dashboard.jsx:3; src/pages/Dashboard.jsx:4; src/pages/Dashboard.jsx:9; src/pages/Dashboard.jsx:16; src/pages/Dashboard.jsx:17; src/pages/Dashboard.jsx:22 |
| 2 | . | ownership | host → remote | origem → destino | module-federation | No | Yes | src/webpack.config.js:77 (`remote2: 'ownership@http://localhost:3002/remoteEntry.js'`) | src/pages/Dashboard.jsx:6; src/pages/Dashboard.jsx:7; src/pages/Dashboard.jsx:18; src/pages/Dashboard.jsx:19 |

## Observações

**1. . → subscription.** O host importa `remote1/ModemAuthorization`, `remote1/SecurityPackage` e `remote1/Card` (src/pages/Dashboard.jsx:3, 4, 9) e os renderiza em src/pages/Dashboard.jsx:16, 17 e 22-25, este último com as props `topic` e `description`. A chave `remote1` é mapeada para o container `subscription` em `localhost:3001` (src/webpack.config.js:76); o Destino é o nome do container como aparece no artefato, já que não há unidade correspondente no snapshot. Ativa = Yes pelas linhas `Yes` da revisão de código-fonte, na cadeia src/index.js:8-12 → src/App.js:8 → Dashboard.

**2. . → ownership.** O host importa `remote2/LabourHourHold` e `remote2/MobileService` (src/pages/Dashboard.jsx:6-7) e os renderiza em src/pages/Dashboard.jsx:18-19. A chave `remote2` é mapeada para o container `ownership` em `localhost:3002` (src/webpack.config.js:77), fora do snapshot. Ativa = Yes pela mesma cadeia da relação 1.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 2.
Unidades sem relação: nenhuma.

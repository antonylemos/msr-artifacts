---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
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

# 294 — angelantilantil-web/micro-frontend

## Leitura do repositório

Painel bancário de demonstração com onze aplicações React, todas com Webpack Module Federation pelo plugin embutido do webpack (`require('webpack/lib/container/ModuleFederationPlugin')`, host-app/webpack.config.js:2), o que explica a revisão de dependências não ter linha de tecnologia. `host-app` é o shell (`name: 'hdfcHostApp'`, host-app/webpack.config.js:45) e declara sete remotes, um por módulo, todos em `http://localhost:30xx/remoteEntry.js` (host-app/webpack.config.js:47-55), com `react` e `react-dom` compartilhados como singleton (host-app/webpack.config.js:56-67). No código, cada remoto entra por `React.lazy(() => import('<remote>/<App>'))` com um `.catch` que troca o módulo por um aviso `ModuleLoadUnavailable` (host-app/src/App.js:30-57), e a tabela de rotas do shell monta cada um numa rota própria, dentro de `ModuleErrorBoundary` e `Suspense` (host-app/src/App.js:228-238). O `App` é renderizado na entrada do host (host-app/src/index.js:3,7), então as sete cargas são alcançáveis por navegação. `/http-access-logs` é só um placeholder local (host-app/src/App.js:235). Os sete remotos usam o mesmo esqueleto: `name`, `filename: 'remoteEntry.js'` e um único `exposes` apontando para `./src/App.js` (por exemplo business-reports/webpack.config.js:45-48), `publicPath: 'auto'` (linha 11) e uma porta própria de 3010 a 3016 (linha 15).

O que não virou relação: `accounts-module`, `cards-module` e `loans-module` são remotos prontos, cada um expondo app e serviço (accounts-module/webpack.config.js:45-49, cards-module/webpack.config.js:45-49, loans-module/webpack.config.js:45-49), nas portas 3001, 3003 e 3002 (linha 15 de cada um), mas o host não os declara nos remotes (host-app/webpack.config.js:47-55) e nenhuma outra unidade os carrega. O host também define um event bus (`subscribe`/`publish`, host-app/src/App.js:6-24) e o publica em `window.EventBus` (host-app/src/App.js:27), mas não publica nada nele, e nenhum dos sete remotos carregados o usa. Os únicos assinantes são justamente os três módulos não carregados, que caem num bus local quando o global não existe (`window.EventBus || {...}`, accounts-module/src/App.js:5, cards-module/src/App.js:5, loans-module/src/App.js:5), assinam `account:updated`, `card:updated` e `loan:updated` (linha 46 de cada um) e procuram `getAccounts`/`getCards`/`getLoans` (linhas 38-39), métodos que o bus do host não tem. A revisão de código-fonte registrou o event bus como `Composição = No`, por isso não há relação `communication`; a regra do pesquisador de 24/10 sobre juntar canais events e de estado não chega a se aplicar aqui. O único `publish(` fora das definições é um exemplo no README.md:171.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host-app | business-reports | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.config.js:48 (remote `businessReports@http://localhost:3010/remoteEntry.js`); business-reports/webpack.config.js:45-48 (`name: 'businessReports'`, `filename: 'remoteEntry.js'`, expõe `./BusinessReportsApp`); business-reports/webpack.config.js:15 (porta 3010) | host-app/src/App.js:30; host-app/src/App.js:230 |
| 2 | host-app | model-portfolio-configuration | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.config.js:49 (remote `modelPortfolio@http://localhost:3011/remoteEntry.js`); model-portfolio-configuration/webpack.config.js:45-48 (`name: 'modelPortfolio'`, `filename: 'remoteEntry.js'`, expõe `./ModelPortfolioApp`); model-portfolio-configuration/webpack.config.js:15 (porta 3011) | host-app/src/App.js:34; host-app/src/App.js:230 |
| 3 | host-app | outgoing-api-logs | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.config.js:50 (remote `outgoingApiLogs@http://localhost:3012/remoteEntry.js`); outgoing-api-logs/webpack.config.js:45-48 (`name: 'outgoingApiLogs'`, `filename: 'remoteEntry.js'`, expõe `./OutgoingApiLogsApp`); outgoing-api-logs/webpack.config.js:15 (porta 3012) | host-app/src/App.js:38; host-app/src/App.js:230 |
| 4 | host-app | incoming-api-logs | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.config.js:51 (remote `incomingApiLogs@http://localhost:3013/remoteEntry.js`); incoming-api-logs/webpack.config.js:45-48 (`name: 'incomingApiLogs'`, `filename: 'remoteEntry.js'`, expõe `./IncomingApiLogsApp`); incoming-api-logs/webpack.config.js:15 (porta 3013) | host-app/src/App.js:42; host-app/src/App.js:230 |
| 5 | host-app | maker-requests | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.config.js:52 (remote `makerRequests@http://localhost:3014/remoteEntry.js`); maker-requests/webpack.config.js:45-48 (`name: 'makerRequests'`, `filename: 'remoteEntry.js'`, expõe `./MakerRequestsApp`); maker-requests/webpack.config.js:15 (porta 3014) | host-app/src/App.js:46; host-app/src/App.js:230 |
| 6 | host-app | vro-uploads | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.config.js:53 (remote `vroUploads@http://localhost:3015/remoteEntry.js`); vro-uploads/webpack.config.js:45-48 (`name: 'vroUploads'`, `filename: 'remoteEntry.js'`, expõe `./VroUploadsApp`); vro-uploads/webpack.config.js:15 (porta 3015) | host-app/src/App.js:50; host-app/src/App.js:230 |
| 7 | host-app | ai-agent-module | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.config.js:54 (remote `aiAgent@http://localhost:3016/remoteEntry.js`); ai-agent-module/webpack.config.js:45-48 (`name: 'aiAgent'`, `filename: 'remoteEntry.js'`, expõe `./AIAgentApp`); ai-agent-module/webpack.config.js:15 (porta 3016) | host-app/src/App.js:54; host-app/src/App.js:230 |

## Observações

**1. host-app → business-reports.** O remote `businessReports` do host corresponde à unidade business-reports pelo `name: 'businessReports'` e pelo `remoteEntry.js` (business-reports/webpack.config.js:45-46), e o módulo pedido em host-app/src/App.js:30 é exatamente o `./BusinessReportsApp` exposto (business-reports/webpack.config.js:48); a porta 3010 (business-reports/webpack.config.js:15) só corrobora. Ativa: o componente é renderizado na rota `/business-reports` (host-app/src/App.js:231). O `.catch` (host-app/src/App.js:31-32) só troca o remoto por um aviso se a carga falhar; não muda a relação.

**2. host-app → model-portfolio-configuration.** O remote `modelPortfolio` (host-app/webpack.config.js:49) não tem o nome do diretório, mas casa com `name: 'modelPortfolio'` e `exposes './ModelPortfolioApp'` de model-portfolio-configuration/webpack.config.js:45-48, que é o módulo importado em host-app/src/App.js:34. Ativa pela rota `/model-portfolio` (host-app/src/App.js:232).

**3. host-app → outgoing-api-logs.** Resolvido por `name: 'outgoingApiLogs'` e `exposes './OutgoingApiLogsApp'` (outgoing-api-logs/webpack.config.js:45-48), o módulo importado em host-app/src/App.js:38. Ativa pela rota `/outgoing-api` (host-app/src/App.js:233).

**4. host-app → incoming-api-logs.** Resolvido por `name: 'incomingApiLogs'` e `exposes './IncomingApiLogsApp'` (incoming-api-logs/webpack.config.js:45-48), o módulo importado em host-app/src/App.js:42. Ativa pela rota `/incoming-api` (host-app/src/App.js:234).

**5. host-app → maker-requests.** Resolvido por `name: 'makerRequests'` e `exposes './MakerRequestsApp'` (maker-requests/webpack.config.js:45-48), o módulo importado em host-app/src/App.js:46. Ativa pela rota `/maker-requests` (host-app/src/App.js:236).

**6. host-app → vro-uploads.** Resolvido por `name: 'vroUploads'` e `exposes './VroUploadsApp'` (vro-uploads/webpack.config.js:45-48), o módulo importado em host-app/src/App.js:50. Ativa pela rota `/vro-uploads` (host-app/src/App.js:237).

**7. host-app → ai-agent-module.** O remote `aiAgent` (host-app/webpack.config.js:54) casa com `name: 'aiAgent'` e `exposes './AIAgentApp'` de ai-agent-module/webpack.config.js:45-48, o módulo importado em host-app/src/App.js:54. Ativa pela rota `/ai-agent` (host-app/src/App.js:238). O módulo tem uma chamada a um backend em `http://localhost:8000/chat`, mas ela está comentada (ai-agent-module/src/App.js:84-109, "API integration is currently disabled for static demo mode"); o backend é o Python de `ai-agent-backend/`, que não é unidade frontend e fica fora da relação.

## Resumo

Relações: 7 (host → remote: 7). Ativas: 7. Destino fora do snapshot: 0.
Unidades sem relação: accounts-module, cards-module, loans-module.

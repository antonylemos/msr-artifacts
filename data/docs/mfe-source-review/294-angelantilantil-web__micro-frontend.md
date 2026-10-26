---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 294 — angelantilantil-web/micro-frontend

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | host-app/src/App.js:30 | host-app | dynamic-loading | Yes | `React.lazy(() => import('businessReports/BusinessReportsApp'))` carrega o remoto `business-reports` (remote `businessReports@http://localhost:3010/remoteEntry.js` em host-app/webpack.config.js:48; `name: 'businessReports'` e `exposes './BusinessReportsApp'` em business-reports/webpack.config.js:45-48). Ativo: renderizado na rota `/business-reports` (host-app/src/App.js:231), App importado e renderizado em host-app/src/index.js:3,7. Fallback `ModuleLoadUnavailable` no `.catch` (host-app/src/App.js:31-32) |
| src-remote-import | host-app/src/App.js:34 | host-app | dynamic-loading | Yes | `React.lazy(() => import('modelPortfolio/ModelPortfolioApp'))` carrega o remoto `model-portfolio-configuration` (host-app/webpack.config.js:49; model-portfolio-configuration/webpack.config.js:45-48). Renderizado na rota `/model-portfolio` (host-app/src/App.js:232) |
| src-remote-import | host-app/src/App.js:38 | host-app | dynamic-loading | Yes | `React.lazy(() => import('outgoingApiLogs/OutgoingApiLogsApp'))` carrega o remoto `outgoing-api-logs` (host-app/webpack.config.js:50; outgoing-api-logs/webpack.config.js:45-48). Renderizado na rota `/outgoing-api` (host-app/src/App.js:233) |
| src-remote-import | host-app/src/App.js:42 | host-app | dynamic-loading | Yes | `React.lazy(() => import('incomingApiLogs/IncomingApiLogsApp'))` carrega o remoto `incoming-api-logs` (host-app/webpack.config.js:51; incoming-api-logs/webpack.config.js:45-48). Renderizado na rota `/incoming-api` (host-app/src/App.js:234) |
| src-remote-import | host-app/src/App.js:46 | host-app | dynamic-loading | Yes | `React.lazy(() => import('makerRequests/MakerRequestsApp'))` carrega o remoto `maker-requests` (host-app/webpack.config.js:52; maker-requests/webpack.config.js:45-48). Renderizado na rota `/maker-requests` (host-app/src/App.js:236) |
| src-remote-import | host-app/src/App.js:50 | host-app | dynamic-loading | Yes | `React.lazy(() => import('vroUploads/VroUploadsApp'))` carrega o remoto `vro-uploads` (host-app/webpack.config.js:53; vro-uploads/webpack.config.js:45-48). Renderizado na rota `/vro-uploads` (host-app/src/App.js:237) |
| src-remote-import | host-app/src/App.js:54 | host-app | dynamic-loading | Yes | `React.lazy(() => import('aiAgent/AIAgentApp'))` carrega o remoto `ai-agent-module` (host-app/webpack.config.js:54; ai-agent-module/webpack.config.js:45-48). Renderizado na rota `/ai-agent` (host-app/src/App.js:238) |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | host-app/src/App.js:230 | host-app | host-relationship | Yes | Tabela de rotas do shell nomeia os sete remotos e onde cada um aparece: `/business-reports`, `/model-portfolio`, `/outgoing-api`, `/incoming-api`, `/maker-requests`, `/vro-uploads`, `/ai-agent` (host-app/src/App.js:231-238), dentro de `ModuleErrorBoundary` e `Suspense` (host-app/src/App.js:228-229); `/http-access-logs` é um placeholder local (host-app/src/App.js:235). Ativa: `App` renderizado em host-app/src/index.js:7 |
| manual | host-app/src/App.js:6 | host-app | communication | No | Event bus (`subscribe`/`publish`, host-app/src/App.js:6-24) exposto como `window.EventBus` (host-app/src/App.js:27). O host não publica nada nele, e nenhum remoto carregado pelo host o usa (sem ocorrência de `EventBus` em business-reports, model-portfolio-configuration, outgoing-api-logs, incoming-api-logs, maker-requests, vro-uploads nem ai-agent-module). Os únicos assinantes são `accounts-module/src/App.js:5,46`, `cards-module/src/App.js:5,46` e `loans-module/src/App.js:5,46`, unidades que o host não declara entre os remotes (host-app/webpack.config.js:47-55); nenhuma chamada `publish(` existe fora das definições. Não chega a comunicar com outra unidade |

## Resumo

Construções com composição: 8 (dynamic-loading: 7, host-relationship: 1).

## Notas

- `accounts-module`, `cards-module` e `loans-module` expõem app e serviço (accounts-module/webpack.config.js:47-49, cards-module/webpack.config.js:47-49, loans-module/webpack.config.js:47-49), mas nenhuma unidade do snapshot os carrega; cada um assina o `window.EventBus` com fallback local (`window.EventBus || {...}`, linha 5) e chama `window.EventBus.getLoans`/`getCards`/`getAccounts` (linha 38-39), métodos que o bus do host não define (host-app/src/App.js:6-24). Por isso o event bus ficou `No`; se o pesquisador entender que basta o mecanismo estar definido e ativo no host, a linha passaria a `Yes` ou `Undetermined`.
- A mineração pegou as sete cargas por `React.lazy`; a tabela de rotas e o event bus ficaram de fora dos padrões `src-*`.

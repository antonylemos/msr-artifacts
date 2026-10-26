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

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-remote-import | host-app/src/App.js:30 | host-app | dynamic-loading | Yes | `React.lazy(() => import('businessReports/BusinessReportsApp'))` loads remote `business-reports` (remote `businessReports@http://localhost:3010/remoteEntry.js` at host-app/webpack.config.js:48; `name: 'businessReports'` and `exposes './BusinessReportsApp'` at business-reports/webpack.config.js:45-48). Active: rendered in route `/business-reports` (host-app/src/App.js:231), App imported and rendered at host-app/src/index.js:3,7. Fallback `ModuleLoadUnavailable` in `.catch` (host-app/src/App.js:31-32) |
| src-remote-import | host-app/src/App.js:34 | host-app | dynamic-loading | Yes | `React.lazy(() => import('modelPortfolio/ModelPortfolioApp'))` loads remote `model-portfolio-configuration` (host-app/webpack.config.js:49; model-portfolio-configuration/webpack.config.js:45-48). Rendered in route `/model-portfolio` (host-app/src/App.js:232) |
| src-remote-import | host-app/src/App.js:38 | host-app | dynamic-loading | Yes | `React.lazy(() => import('outgoingApiLogs/OutgoingApiLogsApp'))` loads remote `outgoing-api-logs` (host-app/webpack.config.js:50; outgoing-api-logs/webpack.config.js:45-48). Rendered in route `/outgoing-api` (host-app/src/App.js:233) |
| src-remote-import | host-app/src/App.js:42 | host-app | dynamic-loading | Yes | `React.lazy(() => import('incomingApiLogs/IncomingApiLogsApp'))` loads remote `incoming-api-logs` (host-app/webpack.config.js:51; incoming-api-logs/webpack.config.js:45-48). Rendered in route `/incoming-api` (host-app/src/App.js:234) |
| src-remote-import | host-app/src/App.js:46 | host-app | dynamic-loading | Yes | `React.lazy(() => import('makerRequests/MakerRequestsApp'))` loads remote `maker-requests` (host-app/webpack.config.js:52; maker-requests/webpack.config.js:45-48). Rendered in route `/maker-requests` (host-app/src/App.js:236) |
| src-remote-import | host-app/src/App.js:50 | host-app | dynamic-loading | Yes | `React.lazy(() => import('vroUploads/VroUploadsApp'))` loads remote `vro-uploads` (host-app/webpack.config.js:53; vro-uploads/webpack.config.js:45-48). Rendered in route `/vro-uploads` (host-app/src/App.js:237) |
| src-remote-import | host-app/src/App.js:54 | host-app | dynamic-loading | Yes | `React.lazy(() => import('aiAgent/AIAgentApp'))` loads remote `ai-agent-module` (host-app/webpack.config.js:54; ai-agent-module/webpack.config.js:45-48). Rendered in route `/ai-agent` (host-app/src/App.js:238) |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | host-app/src/App.js:230 | host-app | host-relationship | Yes | The shell route table names all seven remotes and where each appears: `/business-reports`, `/model-portfolio`, `/outgoing-api`, `/incoming-api`, `/maker-requests`, `/vro-uploads`, `/ai-agent` (host-app/src/App.js:231-238), inside `ModuleErrorBoundary` and `Suspense` (host-app/src/App.js:228-229); `/http-access-logs` is a local placeholder (host-app/src/App.js:235). Active: `App` rendered at host-app/src/index.js:7 |
| manual | host-app/src/App.js:6 | host-app | communication | No | Event bus (`subscribe`/`publish`, host-app/src/App.js:6-24) exposed as `window.EventBus` (host-app/src/App.js:27). The host publishes nothing to it, and no remote loaded by the host uses it (no `EventBus` occurrence in business-reports, model-portfolio-configuration, outgoing-api-logs, incoming-api-logs, maker-requests, vro-uploads or ai-agent-module). The only subscribers are `accounts-module/src/App.js:5,46`, `cards-module/src/App.js:5,46` and `loans-module/src/App.js:5,46`, units not declared among the host’s remotes (host-app/webpack.config.js:47-55); no `publish(` call exists outside definitions. It does not actually communicate with another unit |

## Summary

Constructs participating in composition: 8 (dynamic-loading: 7, host-relationship: 1).

## Notes

- `accounts-module`, `cards-module` and `loans-module` expose app and service (accounts-module/webpack.config.js:47-49, cards-module/webpack.config.js:47-49, loans-module/webpack.config.js:47-49), but no snapshot unit loads them; each subscribes to `window.EventBus` with local fallback (`window.EventBus || {...}`, line 5) and calls `window.EventBus.getLoans`/`getCards`/`getAccounts` (line 38-39), methods not defined by the host bus (host-app/src/App.js:6-24). The event bus therefore remained `No`; if the researcher considers it sufficient for the mechanism to be defined and active in the host, the row would become `Yes` or `Undetermined`.
- Mining captured the seven `React.lazy` loads; the route table and event bus were outside the `src-*` patterns.

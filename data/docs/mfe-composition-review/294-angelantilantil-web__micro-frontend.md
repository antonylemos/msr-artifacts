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

## Repository overview

A demonstration banking dashboard with eleven React applications, all with Webpack Module Federation through webpack's built-in plugin (`require('webpack/lib/container/ModuleFederationPlugin')`, host-app/webpack.config.js:2), explaining the dependency review's lack of a technology row. `host-app` is the shell (`name: 'hdfcHostApp'`, host-app/webpack.config.js:45) and declares seven remotes, one per module, all at `http://localhost:30xx/remoteEntry.js` (host-app/webpack.config.js:47-55), with `react` and `react-dom` shared as singletons (host-app/webpack.config.js:56-67). In code, each remote enters through `React.lazy(() => import('<remote>/<App>'))` with a `.catch` replacing the module with a `ModuleLoadUnavailable` notice (host-app/src/App.js:30-57), and the shell's route table mounts each at its own route, inside `ModuleErrorBoundary` and `Suspense` (host-app/src/App.js:228-238). `App` is rendered at the host entry point (host-app/src/index.js:3,7), so all seven loads are reachable through navigation. `/http-access-logs` is only a local placeholder (host-app/src/App.js:235). All seven remotes use the same skeleton: `name`, `filename: 'remoteEntry.js'` and a single `exposes` pointing to `./src/App.js` (for example business-reports/webpack.config.js:45-48), `publicPath: 'auto'` (line 11) and their own port from 3010 to 3016 (line 15).

What did not become a relationship: `accounts-module`, `cards-module` and `loans-module` are ready remotes, each exposing an app and service (accounts-module/webpack.config.js:45-49, cards-module/webpack.config.js:45-49, loans-module/webpack.config.js:45-49), on ports 3001, 3003 and 3002 (line 15 of each), but the host does not declare them in remotes (host-app/webpack.config.js:47-55), and no other unit loads them. The host also defines an event bus (`subscribe`/`publish`, host-app/src/App.js:6-24) and publishes it at `window.EventBus` (host-app/src/App.js:27), but publishes nothing on it, and none of the seven loaded remotes uses it. The only subscribers are precisely the three unloaded modules, which fall back to a local bus when the global does not exist (`window.EventBus || {...}`, accounts-module/src/App.js:5, cards-module/src/App.js:5, loans-module/src/App.js:5), subscribe to `account:updated`, `card:updated` and `loan:updated` (line 46 of each) and look for `getAccounts`/`getCards`/`getLoans` (lines 38-39), methods absent from the host bus. The source code review recorded the event bus as `Composition = No`, hence no `communication` relationship; the researcher's rule of 24/10 on combining events and state channels does not apply here. The only `publish(` outside definitions is an example in README.md:171.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host-app | business-reports | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.config.js:48 (remote `businessReports@http://localhost:3010/remoteEntry.js`); business-reports/webpack.config.js:45-48 (`name: 'businessReports'`, `filename: 'remoteEntry.js'`, exposes `./BusinessReportsApp`); business-reports/webpack.config.js:15 (port 3010) | host-app/src/App.js:30; host-app/src/App.js:230 |
| 2 | host-app | model-portfolio-configuration | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.config.js:49 (remote `modelPortfolio@http://localhost:3011/remoteEntry.js`); model-portfolio-configuration/webpack.config.js:45-48 (`name: 'modelPortfolio'`, `filename: 'remoteEntry.js'`, exposes `./ModelPortfolioApp`); model-portfolio-configuration/webpack.config.js:15 (port 3011) | host-app/src/App.js:34; host-app/src/App.js:230 |
| 3 | host-app | outgoing-api-logs | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.config.js:50 (remote `outgoingApiLogs@http://localhost:3012/remoteEntry.js`); outgoing-api-logs/webpack.config.js:45-48 (`name: 'outgoingApiLogs'`, `filename: 'remoteEntry.js'`, exposes `./OutgoingApiLogsApp`); outgoing-api-logs/webpack.config.js:15 (port 3012) | host-app/src/App.js:38; host-app/src/App.js:230 |
| 4 | host-app | incoming-api-logs | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.config.js:51 (remote `incomingApiLogs@http://localhost:3013/remoteEntry.js`); incoming-api-logs/webpack.config.js:45-48 (`name: 'incomingApiLogs'`, `filename: 'remoteEntry.js'`, exposes `./IncomingApiLogsApp`); incoming-api-logs/webpack.config.js:15 (port 3013) | host-app/src/App.js:42; host-app/src/App.js:230 |
| 5 | host-app | maker-requests | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.config.js:52 (remote `makerRequests@http://localhost:3014/remoteEntry.js`); maker-requests/webpack.config.js:45-48 (`name: 'makerRequests'`, `filename: 'remoteEntry.js'`, exposes `./MakerRequestsApp`); maker-requests/webpack.config.js:15 (port 3014) | host-app/src/App.js:46; host-app/src/App.js:230 |
| 6 | host-app | vro-uploads | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.config.js:53 (remote `vroUploads@http://localhost:3015/remoteEntry.js`); vro-uploads/webpack.config.js:45-48 (`name: 'vroUploads'`, `filename: 'remoteEntry.js'`, exposes `./VroUploadsApp`); vro-uploads/webpack.config.js:15 (port 3015) | host-app/src/App.js:50; host-app/src/App.js:230 |
| 7 | host-app | ai-agent-module | host → remote | source → target | module-federation | Yes | Yes | host-app/webpack.config.js:54 (remote `aiAgent@http://localhost:3016/remoteEntry.js`); ai-agent-module/webpack.config.js:45-48 (`name: 'aiAgent'`, `filename: 'remoteEntry.js'`, exposes `./AIAgentApp`); ai-agent-module/webpack.config.js:15 (port 3016) | host-app/src/App.js:54; host-app/src/App.js:230 |

## Observations

**1. host-app → business-reports.** The host's remote `businessReports` matches unit business-reports through `name: 'businessReports'` and `remoteEntry.js` (business-reports/webpack.config.js:45-46), and the module requested in host-app/src/App.js:30 is exactly exposed `./BusinessReportsApp` (business-reports/webpack.config.js:48); port 3010 (business-reports/webpack.config.js:15) only corroborates. Active: the component is rendered at route `/business-reports` (host-app/src/App.js:231). The `.catch` (host-app/src/App.js:31-32) only replaces the remote with a notice if loading fails; it does not change the relationship.

**2. host-app → model-portfolio-configuration.** Remote `modelPortfolio` (host-app/webpack.config.js:49) does not have the directory name but matches `name: 'modelPortfolio'` and `exposes './ModelPortfolioApp'` in model-portfolio-configuration/webpack.config.js:45-48, the module imported in host-app/src/App.js:34. Active through route `/model-portfolio` (host-app/src/App.js:232).

**3. host-app → outgoing-api-logs.** Resolved through `name: 'outgoingApiLogs'` and `exposes './OutgoingApiLogsApp'` (outgoing-api-logs/webpack.config.js:45-48), the module imported in host-app/src/App.js:38. Active through route `/outgoing-api` (host-app/src/App.js:233).

**4. host-app → incoming-api-logs.** Resolved through `name: 'incomingApiLogs'` and `exposes './IncomingApiLogsApp'` (incoming-api-logs/webpack.config.js:45-48), the module imported in host-app/src/App.js:42. Active through route `/incoming-api` (host-app/src/App.js:234).

**5. host-app → maker-requests.** Resolved through `name: 'makerRequests'` and `exposes './MakerRequestsApp'` (maker-requests/webpack.config.js:45-48), the module imported in host-app/src/App.js:46. Active through route `/maker-requests` (host-app/src/App.js:236).

**6. host-app → vro-uploads.** Resolved through `name: 'vroUploads'` and `exposes './VroUploadsApp'` (vro-uploads/webpack.config.js:45-48), the module imported in host-app/src/App.js:50. Active through route `/vro-uploads` (host-app/src/App.js:237).

**7. host-app → ai-agent-module.** Remote `aiAgent` (host-app/webpack.config.js:54) matches `name: 'aiAgent'` and `exposes './AIAgentApp'` in ai-agent-module/webpack.config.js:45-48, the module imported in host-app/src/App.js:54. Active through route `/ai-agent` (host-app/src/App.js:238). The module has a backend call to `http://localhost:8000/chat`, but it is commented out (ai-agent-module/src/App.js:84-109, "API integration is currently disabled for static demo mode"); the backend is the Python code in `ai-agent-backend/`, not a frontend unit and outside the relationship.

## Summary

Relationships: 7 (host → remote: 7). Active: 7. Target outside the snapshot: 0.
Units without a relationship: accounts-module, cards-module, loans-module.


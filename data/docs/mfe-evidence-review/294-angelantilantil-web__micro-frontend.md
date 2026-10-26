---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 294 — angelantilantil-web/micro-frontend

## Repository overview

Demonstration banking dashboard with eleven React applications in own directories, all using webpack built-in `ModuleFederationPlugin`. Therefore no dependency observation: dependency review has no technology row. Architecture chain:
- **Configuration:** host declares seven repository remotes (#5); each declares own name, exposing module (#2, #3, #6, #8 to #11).
- **Code:** host imports each remote by name through `React.lazy` (#12 to #18), mounting seven in route table (#19).
- **Relationships:** yields seven active host → remote relationships (#32 to #38).
- **Structure/build:** eleven units have own boundaries (#21 to #31) and builds (#39 to #49), none observed deployment: each only address development server.

Signals misleading alone:
- **Consumer-free remotes:** accounts-module, cards-module and loans-module configured as remotes with application/service exposed (#1, #4, #7), but host does not declare them (#5). Units (#21, #24, #27) outside composition.
- **Event bus:** host exposes global bus (#20) without publisher; only subscribers three unloaded modules. No communication between composed units.
- **Documentation:** confirms shell/remote group (#50, #63) and route loading of linked units, but overstates three areas. Says host loads all modules including three consumer-free modules (#60, #71, #82, #93, #104); attributes communication/shared store to bus (#66, #72, #73, #83, #84, #94, #95); promises isolated styles contradicted by unscoped global CSS (#70, #77, #81, #92, #97, #100, #103, #106). Independent deployment uncorroborated (#65).

History (#108 to #110) does not decide whether host formerly loaded three modules or bus had publisher, since old host versions absent from clone; shows only isolation promise/unscoped CSS coexist since first commit. Uncertainties do not change snapshot reading: seven active relationships, three consumer-free remotes.

## Observations

### 1. accounts-module/webpack.config.js:2, 44-63

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'accountsModule'` and `filename: 'remoteEntry.js'`, exposes `./AccountsApp` and `./AccountsService` (`./src/App.js` and `./src/accountsService.js`) and shares `react` and `react-dom` as singleton, `eager`. No other unit configuration declares name as remote.

**Interpretation:** `accounts-module` configured as named remote, offering application/service but without snapshot consumer.

### 2. ai-agent-module/webpack.config.js:2, 44-62

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'aiAgent'` and `filename: 'remoteEntry.js'`, exposes `./AIAgentApp` (`./src/App.js`) and shares `react` and `react-dom` as singleton, `eager`.

**Interpretation:** `ai-agent-module` configured as named remote, offering module to host.

### 3. business-reports/webpack.config.js:2, 44-62

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'businessReports'` and `filename: 'remoteEntry.js'`, exposes `./BusinessReportsApp` (`./src/App.js`) and shares `react` and `react-dom` as singleton, `eager`.

**Interpretation:** `business-reports` configured as named remote, offering module to host.

### 4. cards-module/webpack.config.js:2, 44-63

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'cardsModule'` and `filename: 'remoteEntry.js'`, exposes `./CardsApp` and `./CardsService` (`./src/App.js` and `./src/cardsService.js`) and shares `react` and `react-dom` as singleton, `eager`. No other unit configuration declares name as remote.

**Interpretation:** `cards-module` configured as named remote, offering application/service but without snapshot consumer.

### 5. host-app/webpack.config.js:2, 44-68

**Observation:** Imports webpack built-in `ModuleFederationPlugin` (`webpack/lib/container/ModuleFederationPlugin`, line 2), configuring with `name: 'hdfcHostApp'`, `filename: 'remoteEntry.js'` and no `exposes`. Declares seven remotes, all at `http://localhost:30xx/remoteEntry.js`: `businessReports` (3010), `modelPortfolio` (3011), `outgoingApiLogs` (3012), `incomingApiLogs` (3013), `makerRequests` (3014), `vroUploads` (3015) and `aiAgent` (3016) (lines 47-55). Shares `react` and `react-dom` as singleton, `eager`, with version from own `package.json` (lines 56-67). No remote for `accountsModule`, `cardsModule` or `loansModule`.

**Interpretation:** Host configuration declares seven repository units as remotes with development locations; other three remote-prepared units excluded.

### 6. incoming-api-logs/webpack.config.js:2, 44-62

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'incomingApiLogs'` and `filename: 'remoteEntry.js'`, exposes `./IncomingApiLogsApp` (`./src/App.js`) and shares `react` and `react-dom` as singleton, `eager`.

**Interpretation:** `incoming-api-logs` configured as named remote, offering module to host.

### 7. loans-module/webpack.config.js:2, 44-63

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'loansModule'` and `filename: 'remoteEntry.js'`, exposes `./LoansApp` and `./LoansService` (`./src/App.js` and `./src/loansService.js`) and shares `react` and `react-dom` as singleton, `eager`. No other unit configuration declares name as remote.

**Interpretation:** `loans-module` configured as named remote, offering application/service but without snapshot consumer.

### 8. maker-requests/webpack.config.js:2, 44-62

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'makerRequests'` and `filename: 'remoteEntry.js'`, exposes `./MakerRequestsApp` (`./src/App.js`) and shares `react` and `react-dom` as singleton, `eager`.

**Interpretation:** `maker-requests` configured as named remote, offering module to host.

### 9. model-portfolio-configuration/webpack.config.js:2, 44-62

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'modelPortfolio'` and `filename: 'remoteEntry.js'`, exposes `./ModelPortfolioApp` (`./src/App.js`) and shares `react` and `react-dom` as singleton, `eager`.

**Interpretation:** `model-portfolio-configuration` configured as named remote, offering module to host.

### 10. outgoing-api-logs/webpack.config.js:2, 44-62

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'outgoingApiLogs'` and `filename: 'remoteEntry.js'`, exposes `./OutgoingApiLogsApp` (`./src/App.js`) and shares `react` and `react-dom` as singleton, `eager`.

**Interpretation:** `outgoing-api-logs` configured as named remote, offering module to host.

### 11. vro-uploads/webpack.config.js:2, 44-62

**Observation:** Imports `ModuleFederationPlugin` built into webpack (line 2), configuring with `name: 'vroUploads'` and `filename: 'remoteEntry.js'`, exposes `./VroUploadsApp` (`./src/App.js`) and shares `react` and `react-dom` as singleton, `eager`.

**Interpretation:** `vro-uploads` configured as named remote, offering module to host.

### 12. host-app/src/App.js:30-33

**Observation:** `React.lazy(() => import('businessReports/BusinessReportsApp'))`, with `.catch` logging error, returning component `ModuleLoadUnavailable` instead of module.

**Interpretation:** Host loads at runtime module exposed by remote `businessReports`, unit `business-reports`, by name.

### 13. host-app/src/App.js:34-37

**Observation:** `React.lazy(() => import('modelPortfolio/ModelPortfolioApp'))`, with `.catch` logging error, returning component `ModuleLoadUnavailable` instead of module.

**Interpretation:** Host loads at runtime module exposed by remote `modelPortfolio`, unit `model-portfolio-configuration`, by name.

### 14. host-app/src/App.js:38-41

**Observation:** `React.lazy(() => import('outgoingApiLogs/OutgoingApiLogsApp'))`, with `.catch` logging error, returning component `ModuleLoadUnavailable` instead of module.

**Interpretation:** Host loads at runtime module exposed by remote `outgoingApiLogs`, unit `outgoing-api-logs`, by name.

### 15. host-app/src/App.js:42-45

**Observation:** `React.lazy(() => import('incomingApiLogs/IncomingApiLogsApp'))`, with `.catch` logging error, returning component `ModuleLoadUnavailable` instead of module.

**Interpretation:** Host loads at runtime module exposed by remote `incomingApiLogs`, unit `incoming-api-logs`, by name.

### 16. host-app/src/App.js:46-49

**Observation:** `React.lazy(() => import('makerRequests/MakerRequestsApp'))`, with `.catch` logging error, returning component `ModuleLoadUnavailable` instead of module.

**Interpretation:** Host loads at runtime module exposed by remote `makerRequests`, unit `maker-requests`, by name.

### 17. host-app/src/App.js:50-53

**Observation:** `React.lazy(() => import('vroUploads/VroUploadsApp'))`, with `.catch` logging error, returning component `ModuleLoadUnavailable` instead of module.

**Interpretation:** Host loads at runtime module exposed by remote `vroUploads`, unit `vro-uploads`, by name.

### 18. host-app/src/App.js:54-57

**Observation:** `React.lazy(() => import('aiAgent/AIAgentApp'))`, with `.catch` logging error, returning component `ModuleLoadUnavailable` instead of module.

**Interpretation:** Host loads at runtime module exposed by remote `aiAgent`, unit `ai-agent-module`, by name.

### 19. host-app/src/App.js:228-240; host-app/src/index.js:3, 7

**Observation:** Inside `ModuleErrorBoundary` and `Suspense`, route table links `/business-reports`, `/model-portfolio`, `/outgoing-api`, `/incoming-api`, `/maker-requests`, `/vro-uploads` and `/ai-agent` to seven `React.lazy`-loaded components; `/http-access-logs` and `/` display only local text. `App` rendered in host entry.

**Interpretation:** Shell mounts each of seven remotes at own route, loading reachable through navigation.

### 20. host-app/src/App.js:6-27; accounts-module/src/App.js:5, 46-48; cards-module/src/App.js:5, 46-48; loans-module/src/App.js:5, 46-48; host-app/webpack.config.js:47-55

**Observation:** Object `EventBus` with `subscribe` and `publish` assigned to `window.EventBus`. Host does not call `publish`; none of seven loaded remotes uses `EventBus`. Only subscribers accounts-module, cards-module and loans-module, not declared as host remotes.

**Interpretation:** Communication mechanism available in host but connected to no composed unit; does not participate in composition.

### 21. accounts-module; accounts-module/webpack.config.js:8, 65; accounts-module/src/index.js:6-7; accounts-module/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: remote unreferenced by host.

### 22. ai-agent-module; ai-agent-module/webpack.config.js:8, 64; ai-agent-module/src/index.js:6-7; ai-agent-module/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: host-loaded remote.

### 23. business-reports; business-reports/webpack.config.js:8, 64; business-reports/src/index.js:6-7; business-reports/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: host-loaded remote.

### 24. cards-module; cards-module/webpack.config.js:8, 65; cards-module/src/index.js:6-7; cards-module/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: remote unreferenced by host.

### 25. host-app; host-app/webpack.config.js:8, 70; host-app/src/index.js:6-7; host-app/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: shell.

### 26. incoming-api-logs; incoming-api-logs/webpack.config.js:8, 64; incoming-api-logs/src/index.js:6-7; incoming-api-logs/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: host-loaded remote.

### 27. loans-module; loans-module/webpack.config.js:8, 65; loans-module/src/index.js:6-7; loans-module/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: remote unreferenced by host.

### 28. maker-requests; maker-requests/webpack.config.js:8, 64; maker-requests/src/index.js:6-7; maker-requests/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: host-loaded remote.

### 29. model-portfolio-configuration; model-portfolio-configuration/webpack.config.js:8, 64; model-portfolio-configuration/src/index.js:6-7; model-portfolio-configuration/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: host-loaded remote.

### 30. outgoing-api-logs; outgoing-api-logs/webpack.config.js:8, 64; outgoing-api-logs/src/index.js:6-7; outgoing-api-logs/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: host-loaded remote.

### 31. vro-uploads; vro-uploads/webpack.config.js:8, 64; vro-uploads/src/index.js:6-7; vro-uploads/package.json:6

**Observation:** Directory with own `package.json` and `webpack.config.js`, entry `./src/index.js` with `createRoot` and `render`, page `./src/index.html` and build `webpack --mode production`. No root `package.json` or workspace.

**Interpretation:** React frontend unit with own boundary: host-loaded remote.

### 32. host-app/src/App.js:30; host-app/src/App.js:231; host-app/webpack.config.js:48; business-reports/webpack.config.js:45-48

**Observation:** Host imports `businessReports/BusinessReportsApp` (host-app/src/App.js:30) and mounts at route `/business-reports` (host-app/src/App.js:231). Remote `businessReports` in host (host-app/webpack.config.js:48) matches `name: 'businessReports'` and `exposes './BusinessReportsApp'` in business-reports/webpack.config.js:45-48.

**Interpretation:** Active host → remote Module Federation relationship between host-app and business-reports.

### 33. host-app/src/App.js:34; host-app/src/App.js:232; host-app/webpack.config.js:49; model-portfolio-configuration/webpack.config.js:45-48

**Observation:** Host imports `modelPortfolio/ModelPortfolioApp` (host-app/src/App.js:34) and mounts at route `/model-portfolio` (host-app/src/App.js:232). Remote `modelPortfolio` in host (host-app/webpack.config.js:49) matches `name: 'modelPortfolio'` and `exposes './ModelPortfolioApp'` in model-portfolio-configuration/webpack.config.js:45-48.

**Interpretation:** Active host → remote Module Federation relationship between host-app and model-portfolio-configuration.

### 34. host-app/src/App.js:38; host-app/src/App.js:233; host-app/webpack.config.js:50; outgoing-api-logs/webpack.config.js:45-48

**Observation:** Host imports `outgoingApiLogs/OutgoingApiLogsApp` (host-app/src/App.js:38) and mounts at route `/outgoing-api` (host-app/src/App.js:233). Remote `outgoingApiLogs` in host (host-app/webpack.config.js:50) matches `name: 'outgoingApiLogs'` and `exposes './OutgoingApiLogsApp'` in outgoing-api-logs/webpack.config.js:45-48.

**Interpretation:** Active host → remote Module Federation relationship between host-app and outgoing-api-logs.

### 35. host-app/src/App.js:42; host-app/src/App.js:234; host-app/webpack.config.js:51; incoming-api-logs/webpack.config.js:45-48

**Observation:** Host imports `incomingApiLogs/IncomingApiLogsApp` (host-app/src/App.js:42) and mounts at route `/incoming-api` (host-app/src/App.js:234). Remote `incomingApiLogs` in host (host-app/webpack.config.js:51) matches `name: 'incomingApiLogs'` and `exposes './IncomingApiLogsApp'` in incoming-api-logs/webpack.config.js:45-48.

**Interpretation:** Active host → remote Module Federation relationship between host-app and incoming-api-logs.

### 36. host-app/src/App.js:46; host-app/src/App.js:236; host-app/webpack.config.js:52; maker-requests/webpack.config.js:45-48

**Observation:** Host imports `makerRequests/MakerRequestsApp` (host-app/src/App.js:46) and mounts at route `/maker-requests` (host-app/src/App.js:236). Remote `makerRequests` in host (host-app/webpack.config.js:52) matches `name: 'makerRequests'` and `exposes './MakerRequestsApp'` in maker-requests/webpack.config.js:45-48.

**Interpretation:** Active host → remote Module Federation relationship between host-app and maker-requests.

### 37. host-app/src/App.js:50; host-app/src/App.js:237; host-app/webpack.config.js:53; vro-uploads/webpack.config.js:45-48

**Observation:** Host imports `vroUploads/VroUploadsApp` (host-app/src/App.js:50) and mounts at route `/vro-uploads` (host-app/src/App.js:237). Remote `vroUploads` in host (host-app/webpack.config.js:53) matches `name: 'vroUploads'` and `exposes './VroUploadsApp'` in vro-uploads/webpack.config.js:45-48.

**Interpretation:** Active host → remote Module Federation relationship between host-app and vro-uploads.

### 38. host-app/src/App.js:54; host-app/src/App.js:238; host-app/webpack.config.js:54; ai-agent-module/webpack.config.js:45-48; ai-agent-module/src/App.js:84-109

**Observation:** Host imports `aiAgent/AIAgentApp` (host-app/src/App.js:54) and mounts at route `/ai-agent` (host-app/src/App.js:238). Remote `aiAgent` in host (host-app/webpack.config.js:54) matches `name: 'aiAgent'` and `exposes './AIAgentApp'` in ai-agent-module/webpack.config.js:45-48. Module call to backend at `http://localhost:8000/chat` commented (ai-agent-module/src/App.js:84-109).

**Interpretation:** Active host → remote Module Federation relationship between host-app and ai-agent-module.

### 39. accounts-module/package.json:3, 5-6; accounts-module/webpack.config.js:8-15; start-all-modules.bat:4-12

**Observation:** `webpack --mode production` generates `accounts-module/dist` with `publicPath: 'auto'`. Only address development server at port 3001. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication. File start-all-modules.bat does not start it.

**Interpretation:** Own unit build boundary without observed deployment.

### 40. ai-agent-module/package.json:3, 5-6; ai-agent-module/webpack.config.js:8-15

**Observation:** `webpack --mode production` generates `ai-agent-module/dist` with `publicPath: 'auto'`. Only address development server at port 3016. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication.

**Interpretation:** Own unit build boundary without observed deployment.

### 41. business-reports/package.json:3, 5-6; business-reports/webpack.config.js:8-15

**Observation:** `webpack --mode production` generates `business-reports/dist` with `publicPath: 'auto'`. Only address development server at port 3010. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication.

**Interpretation:** Own unit build boundary without observed deployment.

### 42. cards-module/package.json:3, 5-6; cards-module/webpack.config.js:8-15; start-all-modules.bat:4-12

**Observation:** `webpack --mode production` generates `cards-module/dist` with `publicPath: 'auto'`. Only address development server at port 3003. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication. File start-all-modules.bat does not start it.

**Interpretation:** Own unit build boundary without observed deployment.

### 43. host-app/package.json:3, 5-6; host-app/webpack.config.js:8-15; host-app/webpack.config.js:47-55

**Observation:** `webpack --mode production` generates `host-app/dist` with `publicPath: 'auto'`. Only address development server at port 3000. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication. Remotes enter at runtime through `localhost` addresses rather than bundle.

**Interpretation:** Own unit build boundary without observed deployment.

### 44. incoming-api-logs/package.json:3, 5-6; incoming-api-logs/webpack.config.js:8-15

**Observation:** `webpack --mode production` generates `incoming-api-logs/dist` with `publicPath: 'auto'`. Only address development server at port 3013. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication.

**Interpretation:** Own unit build boundary without observed deployment.

### 45. loans-module/package.json:3, 5-6; loans-module/webpack.config.js:8-15; start-all-modules.bat:4-12

**Observation:** `webpack --mode production` generates `loans-module/dist` with `publicPath: 'auto'`. Only address development server at port 3002. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication. File start-all-modules.bat does not start it.

**Interpretation:** Own unit build boundary without observed deployment.

### 46. maker-requests/package.json:3, 5-6; maker-requests/webpack.config.js:8-15

**Observation:** `webpack --mode production` generates `maker-requests/dist` with `publicPath: 'auto'`. Only address development server at port 3014. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication.

**Interpretation:** Own unit build boundary without observed deployment.

### 47. model-portfolio-configuration/package.json:3, 5-6; model-portfolio-configuration/webpack.config.js:8-15

**Observation:** `webpack --mode production` generates `model-portfolio-configuration/dist` with `publicPath: 'auto'`. Only address development server at port 3011. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication.

**Interpretation:** Own unit build boundary without observed deployment.

### 48. outgoing-api-logs/package.json:3, 5-6; outgoing-api-logs/webpack.config.js:8-15

**Observation:** `webpack --mode production` generates `outgoing-api-logs/dist` with `publicPath: 'auto'`. Only address development server at port 3012. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication.

**Interpretation:** Own unit build boundary without observed deployment.

### 49. vro-uploads/package.json:3, 5-6; vro-uploads/webpack.config.js:8-15

**Observation:** `webpack --mode production` generates `vro-uploads/dist` with `publicPath: 'auto'`. Only address development server at port 3015. No Dockerfile, CI or hosting configuration; version `1.0.0` in `package.json` unused for publication.

**Interpretation:** Own unit build boundary without observed deployment.

### 50. DOCUMENTATION.md:4

**Observation:** "This repository implements a micro-frontend architecture [...] using `host-app` as the shell and multiple remote modules."

**Interpretation:** Claims shell/remote organization. Shell and ten remotes present, seven linked to shell; claim corroborated.

### 51. DOCUMENTATION.md:8

**Observation:** "`accounts-module/` - Accounts management micro-frontend"

**Interpretation:** Claims accounts-module microfrontend. Unit has own entry/remote configuration; claim corroborated without implying shell consumption.

### 52. DOCUMENTATION.md:9

**Observation:** "`business-reports/` - Business reports micro-frontend"

**Interpretation:** Claims business-reports microfrontend. Unit has own entry/remote configuration; claim corroborated.

### 53. DOCUMENTATION.md:10

**Observation:** "`cards-module/` - Cards management micro-frontend"

**Interpretation:** Claims cards-module microfrontend. Unit has own entry/remote configuration; claim corroborated without implying shell consumption.

### 54. DOCUMENTATION.md:11

**Observation:** "`incoming-api-logs/` - Incoming API logs micro-frontend"

**Interpretation:** Claims incoming-api-logs microfrontend. Unit has own entry/remote configuration; claim corroborated.

### 55. DOCUMENTATION.md:12

**Observation:** "`loans-module/` - Loans management micro-frontend"

**Interpretation:** Claims loans-module microfrontend. Unit has own entry/remote configuration; claim corroborated without implying shell consumption.

### 56. DOCUMENTATION.md:13

**Observation:** "`maker-requests/` - Maker-requests workflow micro-frontend"

**Interpretation:** Claims maker-requests microfrontend. Unit has own entry/remote configuration; claim corroborated.

### 57. DOCUMENTATION.md:14

**Observation:** "`model-portfolio-configuration/` - Portfolio configuration micro-frontend"

**Interpretation:** Claims model-portfolio-configuration microfrontend. Unit has own entry/remote configuration; claim corroborated.

### 58. DOCUMENTATION.md:15

**Observation:** "`outgoing-api-logs/` - Outgoing API logs micro-frontend"

**Interpretation:** Claims outgoing-api-logs microfrontend. Unit has own entry/remote configuration; claim corroborated.

### 59. DOCUMENTATION.md:16

**Observation:** "`vro-uploads/` - VRO uploads micro-frontend"

**Interpretation:** Claims vro-uploads microfrontend. Unit has own entry/remote configuration; claim corroborated.

### 60. DOCUMENTATION.md:38

**Observation:** "The host uses Webpack Module Federation to load remote entries from each module."

**Interpretation:** Claims host loads all modules through Module Federation. Mechanism matches seven, but host declares no accounts-module, cards-module or loans-module; claim contradicted.

### 61. DOCUMENTATION.md:39

**Observation:** "Each module is independently runnable and documented at its own folder level."

**Interpretation:** Claims each module runs alone. Each unit has own entry, local server and documentation; claim corroborated without implying publication.

### 62. README.md:15

**Observation:** "ai-agent-module/ [...] # AI Agent chatbot module"

**Interpretation:** Claims ai-agent-module part of group. Unit exists with own entry; claim corroborated.

### 63. README.md:21

**Observation:** "This project uses **Webpack Module Federation** to implement a micro-frontend architecture:"

**Interpretation:** Names Module Federation architectural technology. Webpack built-in plugin configured/used in seven relationships; claim corroborated.

### 64. README.md:24

**Observation:** "Standalone applications that can be independently developed"

**Interpretation:** Claims independently developed applications. Per-unit manifests, entries/builds support claim; corroborated.

### 65. README.md:24

**Observation:** "can be independently [...] deployed"

**Interpretation:** Claims independently deployable applications. No snapshot deployment artifact; claim uncorroborated.

### 66. README.md:135

**Observation:** "Shared event bus for cross-module communication"

**Interpretation:** Claims shared event bus communicates modules. Bus exists in host without publisher; only subscribers unloaded; claim contradicted.

### 67. README.md:145

**Observation:** "Remote module loaded by host app"

**Interpretation:** Claims outgoing-api-logs loaded by host. Host declares/mounts at route `/outgoing-api`; claim corroborated.

### 68. README.md:176

**Observation:** "Build each module for production:"

**Interpretation:** Claims each module has own production build. Eleven `package.json` files have `webpack --mode production`; claim corroborated.

### 69. accounts-module/DOCUMENTATION.md:9

**Observation:** "Remote module configuration for Module Federation"

**Interpretation:** Claims accounts-module remote configuration. Plugin exposes `AccountsApp` and `AccountsService`; corroborated without consumer.

### 70. accounts-module/DOCUMENTATION.md:15

**Observation:** "Uses isolated module styles and components"

**Interpretation:** Claims isolated module styles. CSS global selectors loaded by `style-loader` and `css-loader`, unscoped; claim contradicted.

### 71. accounts-module/DOCUMENTATION.md:26

**Observation:** "The host app loads this module as a federated remote when the user navigates to the Accounts route."

**Interpretation:** Claims host loads accounts-module through route. No remote `accountsModule` or Accounts route in host; claim contradicted.

### 72. accounts-module/src/App.js:4

**Observation:** "Event Bus for cross-module communication"

**Interpretation:** Claims bus communicates modules. Accounts-module subscribes but not host-loaded, no publisher; claim contradicted.

### 73. accounts-module/src/App.js:36

**Observation:** "Initialize accounts from shared store"

**Interpretation:** Claims shared-store data. Host bus lacks sought getter; available path uses local data; claim contradicted.

### 74. ai-agent-module/README.md:21

**Observation:** "This module is built as a Webpack Module Federation remote and is exposed as `AIAgentApp`."

**Interpretation:** Claims ai-agent-module remote exposing `AIAgentApp`. Configuration/host import match; claim corroborated.

### 75. ai-agent-module/src/App.js:84

**Observation:** "API integration is currently disabled for static demo mode."

**Interpretation:** Claims backend integration disabled. HTTP call commented, responses local; claim corroborated.

### 76. business-reports/DOCUMENTATION.md:9

**Observation:** "Remote entry configuration for Module Federation"

**Interpretation:** Claims business-reports remote configuration. Exposure of `BusinessReportsApp` matches; claim corroborated.

### 77. business-reports/DOCUMENTATION.md:15

**Observation:** "Uses isolated CSS for module-specific layout"

**Interpretation:** Claims isolated module CSS. Stylesheet global selectors without loader scoping; claim contradicted.

### 78. business-reports/DOCUMENTATION.md:25

**Observation:** "The module is loaded by `host-app` when the Business Reports route is active."

**Interpretation:** Claims host loads business-reports through route. Configuration/route confirm; claim corroborated.

### 79. cards-module/DOCUMENTATION.md:9

**Observation:** "Module Federation remote configuration"

**Interpretation:** Claims cards-module remote configuration. Plugin exposes `CardsApp` and `CardsService`; corroborated without consumer.

### 80. cards-module/DOCUMENTATION.md:14

**Observation:** "Displays card data as a standalone micro-frontend"

**Interpretation:** Claims cards-module runs alone. Own entry/local example data support autonomous execution; corroborated.

### 81. cards-module/DOCUMENTATION.md:15

**Observation:** "Uses isolated styles for module-specific UI"

**Interpretation:** Claims isolated module styles. CSS global/unscoped; claim contradicted.

### 82. cards-module/DOCUMENTATION.md:26

**Observation:** "The host shell loads this module dynamically as part of the micro-frontend routing."

**Interpretation:** Claims shell loads cards-module through route. Host neither declares `cardsModule` nor mounts `CardsApp`; claim contradicted.

### 83. cards-module/src/App.js:4

**Observation:** "Event Bus for cross-module communication"

**Interpretation:** Claims bus communicates modules. Cards-module subscribes but not host-loaded, no publisher; claim contradicted.

### 84. cards-module/src/App.js:36

**Observation:** "Initialize cards from shared store"

**Interpretation:** Claims shared-store data. Host bus lacks sought getter; available path uses local data; claim contradicted.

### 85. host-app/DOCUMENTATION.md:10

**Observation:** "Global shared styling"

**Interpretation:** Claims shared global host style. Host imports global CSS; mounted remotes subject to rules; claim corroborated.

### 86. host-app/DOCUMENTATION.md:26

**Observation:** "Must run together with remote modules so the federated remotes can be loaded."

**Interpretation:** Claims host depends on running remotes. Remote URLs require their servers; claim corroborated.

### 87. host-app/DOCUMENTATION.md:27

**Observation:** "The host app uses route-based loading for each remote module."

**Interpretation:** Claims host loads each remote through route. Seven configured remotes imported through `React.lazy` and route-mounted; claim corroborated.

### 88. host-app/src/App.js:26

**Observation:** "Make EventBus available globally"

**Interpretation:** Claims global bus availability. Assignment to `window.EventBus` exists; claim corroborated without implying communication.

### 89. host-app/src/App.js:29

**Observation:** "Lazy load remote modules"

**Interpretation:** Claims on-demand remote loading. `React.lazy` wraps seven imports; claim corroborated.

### 90. incoming-api-logs/DOCUMENTATION.md:6

**Observation:** "It is designed as a remote micro-frontend that can be loaded into the `host-app` using Webpack Module Federation."

**Interpretation:** Claims incoming-api-logs host-loaded remote. Configuration/consumption confirm; claim corroborated.

### 91. loans-module/DOCUMENTATION.md:9

**Observation:** "Module Federation remote configuration"

**Interpretation:** Claims loans-module remote configuration. Plugin exposes `LoansApp` and `LoansService`; corroborated without consumer.

### 92. loans-module/DOCUMENTATION.md:14

**Observation:** "Uses independent styling and routing for the loan module"

**Interpretation:** Claims independent module styling/routing. No router; CSS global/unscoped; claim contradicted.

### 93. loans-module/DOCUMENTATION.md:26

**Observation:** "The host loads it dynamically when the Loans route is requested."

**Interpretation:** Claims host loads loans-module through route. No remote `loansModule` or Loans route in host; claim contradicted.

### 94. loans-module/src/App.js:4

**Observation:** "Event Bus for cross-module communication"

**Interpretation:** Claims bus communicates modules. Loans-module subscribes but not host-loaded, no publisher; claim contradicted.

### 95. loans-module/src/App.js:36

**Observation:** "Initialize loans from shared store"

**Interpretation:** Claims shared-store data. Host bus lacks sought getter; available path uses local data; claim contradicted.

### 96. maker-requests/DOCUMENTATION.md:13

**Observation:** "Exposes a remote entry to the host shell"

**Interpretation:** Claims maker-requests offers remote entry to shell. Unit exposes `MakerRequestsApp`, consumed by host; claim corroborated.

### 97. maker-requests/DOCUMENTATION.md:15

**Observation:** "Uses isolated styling to avoid conflicts with other modules"

**Interpretation:** Claims styles isolated from other modules. CSS repeats global unscoped selectors; claim contradicted.

### 98. maker-requests/DOCUMENTATION.md:25

**Observation:** "The host app loads this module on the Maker Requests route."

**Interpretation:** Claims host loads maker-requests through route. Route mounts `MakerRequestsApp`; claim corroborated.

### 99. model-portfolio-configuration/DOCUMENTATION.md:9

**Observation:** "Module Federation remote configuration"

**Interpretation:** Claims model-portfolio-configuration remote configuration. Plugin exposes `ModelPortfolioApp`; claim corroborated.

### 100. model-portfolio-configuration/DOCUMENTATION.md:15

**Observation:** "Isolation ensures styles do not leak into the host or other modules"

**Interpretation:** Claims styles do not leak to host/others. No CSS Modules, Shadow DOM or loader scoping; claim contradicted.

### 101. model-portfolio-configuration/DOCUMENTATION.md:26

**Observation:** "The host app loads it dynamically through Module Federation."

**Interpretation:** Claims host loads model-portfolio-configuration through Module Federation. Dynamic loading/route confirm; claim corroborated.

### 102. outgoing-api-logs/DOCUMENTATION.md:9

**Observation:** "Module Federation remote configuration"

**Interpretation:** Claims outgoing-api-logs remote configuration. Plugin exposes `OutgoingApiLogsApp`; claim corroborated.

### 103. outgoing-api-logs/DOCUMENTATION.md:15

**Observation:** "Uses isolated CSS to keep the module visually separated"

**Interpretation:** Claims isolated module CSS. Stylesheet global unscoped selectors; claim contradicted.

### 104. start-all-modules.bat:2

**Observation:** "Batch file to run all HDFC micro frontend modules and host app in separate terminals"

**Interpretation:** Claims script starts all modules. Opens terminals for host, seven remotes/backend, excluding accounts-module, cards-module and loans-module; claim contradicted.

### 105. vro-uploads/DOCUMENTATION.md:9

**Observation:** "Module Federation remote configuration"

**Interpretation:** Claims vro-uploads remote configuration. Plugin exposes `VroUploadsApp`; claim corroborated.

### 106. vro-uploads/DOCUMENTATION.md:15

**Observation:** "Uses isolated styles so it does not affect the host or other modules"

**Interpretation:** Claims styles affect neither host nor others. Global unscoped selectors present; claim contradicted.

### 107. vro-uploads/DOCUMENTATION.md:25

**Observation:** "This module is loaded when the VRO Uploads route is selected from the host app."

**Interpretation:** Claims host loads vro-uploads through route. Route mounts `VroUploadsApp`; claim corroborated.

### 108. c7a7aa3 2026-05-03 (accounts-module/src/App.js, cards-module/src/App.js, loans-module/src/App.js, host-app/src/App.js, README.md); a1d2264 2026-05-25 (host-app/src/App.js, README.md)

**Observation:** Three bus subscribers present in first commit, unchanged through snapshot. host-app/src/App.js changes once in `a1d2264` ("testing"); version from `c7a7aa3` unavailable in clone.

**Interpretation:** Unknown whether bus remnant of communicating stage or never connected. Uncertainty only about past: snapshot bus links no composed unit.

### 109. c7a7aa3 2026-05-03 (DOCUMENTATION.md, accounts-module/DOCUMENTATION.md, cards-module/DOCUMENTATION.md, loans-module/DOCUMENTATION.md, host-app/webpack.config.js, host-app/src/App.js, start-all-modules.bat); a1d2264 2026-05-25 (host-app/webpack.config.js, host-app/src/App.js, start-all-modules.bat, ai-agent-module)

**Observation:** Documentation claiming host loads accounts/cards/loans in first commit, never changes. host-app/webpack.config.js, host-app/src/App.js and start-all-modules.bat change only in `a1d2264`, creating ai-agent-module; versions from `c7a7aa3` unavailable in clone.

**Interpretation:** Unknown whether host in `c7a7aa3` declared three modules then lost them or never declared them. Uncertainty only about past: snapshot host does not load them.

### 110. c7a7aa3 2026-05-03 (DOCUMENTATION.md, webpack.config.js and src/styles.css of accounts-module, business-reports, cards-module, loans-module, maker-requests, model-portfolio-configuration, outgoing-api-logs and vro-uploads); a1d2264 2026-05-25 (outgoing-api-logs/src/styles.css, vro-uploads/src/styles.css)

**Observation:** Files `DOCUMENTATION.md` with eight isolation claims and remote `webpack.config.js` files with `style-loader` and `css-loader` in first commit, unchanged. Only outgoing-api-logs/vro-uploads stylesheets change afterward in `a1d2264`.

**Interpretation:** Isolation promise/unscoped CSS coexist since first observable presence; no commit creates/removes scoping mechanism. Point clarified.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (accounts-module, Markers, Entry and Build); 3.4.6 #1 (Artifacts); 3.4.7 #2, #20 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #21 |
| 2 | 3.4.3 (ai-agent-module, Markers, Entry and Build); 3.4.4 (host-app/src/App.js:54, Observation); 3.4.5 #7 (Configuration); 3.4.6 #2 (Artifacts); 3.4.7 #25 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #22; configures #38 |
| 3 | 3.4.3 (business-reports, Markers, Entry and Build); 3.4.4 (host-app/src/App.js:30, Observation); 3.4.5 #1 (Configuration); 3.4.6 #3 (Artifacts); 3.4.7 #3, #27 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #23; configures #32 |
| 4 | 3.4.3 (cards-module, Markers, Entry and Build); 3.4.6 #4 (Artifacts); 3.4.7 #4, #30 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #24 |
| 5 | 3.4.3 (host-app, Markers, Entry and Build); 3.4.4 (host-app/src/App.js:30, 34, 38, 42, 46, 50, 54, 6, Observation); 3.4.5 #1, #2, #3, #4, #5, #6, #7 (Configuration); 3.4.6 #5 (Artifacts); 3.4.7 #11, #14, #22, #23, #33, #34, #37, #44, #45 (Evidence) | 2 configuration | configuration | module-federation | architectural | strong | configures #25; configures #32; configures #33; configures #34; configures #35; configures #36; configures #37; configures #38 |
| 6 | 3.4.3 (incoming-api-logs, Markers, Entry and Build); 3.4.4 (host-app/src/App.js:42, Observation); 3.4.5 #4 (Configuration); 3.4.6 #6 (Artifacts); 3.4.7 #5, #41 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #26; configures #35 |
| 7 | 3.4.3 (loans-module, Markers, Entry and Build); 3.4.6 #7 (Artifacts); 3.4.7 #6, #42 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #27 |
| 8 | 3.4.3 (maker-requests, Markers, Entry and Build); 3.4.4 (host-app/src/App.js:46, Observation); 3.4.5 #5 (Configuration); 3.4.6 #8 (Artifacts); 3.4.7 #7, #47 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #28; configures #36 |
| 9 | 3.4.3 (model-portfolio-configuration, Markers, Entry and Build); 3.4.4 (host-app/src/App.js:34, Observation); 3.4.5 #2 (Configuration); 3.4.6 #9 (Artifacts); 3.4.7 #8, #50 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #29; configures #33 |
| 10 | 3.4.3 (outgoing-api-logs, Markers, Entry and Build); 3.4.4 (host-app/src/App.js:38, Observation); 3.4.5 #3 (Configuration); 3.4.6 #10 (Artifacts); 3.4.7 #9, #53 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #30; configures #34 |
| 11 | 3.4.3 (vro-uploads, Markers, Entry and Build); 3.4.4 (host-app/src/App.js:50, Observation); 3.4.5 #6 (Configuration); 3.4.6 #11 (Artifacts); 3.4.7 #10, #56 (Evidence) | 2 configuration | configuration | module-federation | technological | moderate | configures #31; configures #37 |
| 12 | 3.4.4 (host-app/src/App.js:30) | 3 code | source code | module-federation | architectural | strong | implements #32 |
| 13 | 3.4.4 (host-app/src/App.js:34) | 3 code | source code | module-federation | architectural | strong | implements #33 |
| 14 | 3.4.4 (host-app/src/App.js:38) | 3 code | source code | module-federation | architectural | strong | implements #34 |
| 15 | 3.4.4 (host-app/src/App.js:42) | 3 code | source code | module-federation | architectural | strong | implements #35 |
| 16 | 3.4.4 (host-app/src/App.js:46) | 3 code | source code | module-federation | architectural | strong | implements #36 |
| 17 | 3.4.4 (host-app/src/App.js:50) | 3 code | source code | module-federation | architectural | strong | implements #37 |
| 18 | 3.4.4 (host-app/src/App.js:54) | 3 code | source code | module-federation | architectural | strong | implements #38 |
| 19 | 3.4.4 (host-app/src/App.js:230) | 3 code | source code | module-federation | architectural | strong | implements #32; implements #33; implements #34; implements #35; implements #36; implements #37; implements #38 |
| 20 | 3.4.4 (host-app/src/App.js:6) | 3 code | source code | events | technological | weak | — |
| 21 | 3.4.3 (accounts-module) | 4 structure | directory | — | architectural | moderate | — |
| 22 | 3.4.3 (ai-agent-module) | 4 structure | directory | — | architectural | moderate | — |
| 23 | 3.4.3 (business-reports) | 4 structure | directory | — | architectural | moderate | — |
| 24 | 3.4.3 (cards-module) | 4 structure | directory | — | architectural | moderate | — |
| 25 | 3.4.3 (host-app) | 4 structure | directory | — | architectural | moderate | — |
| 26 | 3.4.3 (incoming-api-logs) | 4 structure | directory | — | architectural | moderate | — |
| 27 | 3.4.3 (loans-module) | 4 structure | directory | — | architectural | moderate | — |
| 28 | 3.4.3 (maker-requests) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (model-portfolio-configuration) | 4 structure | directory | — | architectural | moderate | — |
| 30 | 3.4.3 (outgoing-api-logs) | 4 structure | directory | — | architectural | moderate | — |
| 31 | 3.4.3 (vro-uploads) | 4 structure | directory | — | architectural | moderate | — |
| 32 | 3.4.5 #1 | 5 composition | source code | module-federation | architectural | strong | links #25; links #23 |
| 33 | 3.4.5 #2 | 5 composition | source code | module-federation | architectural | strong | links #25; links #29 |
| 34 | 3.4.5 #3 | 5 composition | source code | module-federation | architectural | strong | links #25; links #30 |
| 35 | 3.4.5 #4 | 5 composition | source code | module-federation | architectural | strong | links #25; links #26 |
| 36 | 3.4.5 #5 | 5 composition | source code | module-federation | architectural | strong | links #25; links #28 |
| 37 | 3.4.5 #6 | 5 composition | source code | module-federation | architectural | strong | links #25; links #31 |
| 38 | 3.4.5 #7 | 5 composition | source code | module-federation | architectural | strong | links #25; links #22 |
| 39 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #21 |
| 40 | 3.4.6 #2 | 6 build-deploy | configuration | — | architectural | moderate | publishes #22 |
| 41 | 3.4.6 #3 | 6 build-deploy | configuration | — | architectural | moderate | publishes #23 |
| 42 | 3.4.6 #4 | 6 build-deploy | configuration | — | architectural | moderate | publishes #24 |
| 43 | 3.4.6 #5 | 6 build-deploy | configuration | — | architectural | moderate | publishes #25 |
| 44 | 3.4.6 #6 | 6 build-deploy | configuration | — | architectural | moderate | publishes #26 |
| 45 | 3.4.6 #7 | 6 build-deploy | configuration | — | architectural | moderate | publishes #27 |
| 46 | 3.4.6 #8 | 6 build-deploy | configuration | — | architectural | moderate | publishes #28 |
| 47 | 3.4.6 #9 | 6 build-deploy | configuration | — | architectural | moderate | publishes #29 |
| 48 | 3.4.6 #10 | 6 build-deploy | configuration | — | architectural | moderate | publishes #30 |
| 49 | 3.4.6 #11 | 6 build-deploy | configuration | — | architectural | moderate | publishes #31 |
| 50 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31; corroborates #32; corroborates #33; corroborates #34; corroborates #35; corroborates #36; corroborates #37; corroborates #38 |
| 51 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #1 |
| 52 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | corroborates #23; corroborates #3 |
| 53 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #24; corroborates #4 |
| 54 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | corroborates #26; corroborates #6 |
| 55 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #27; corroborates #7 |
| 56 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | corroborates #28; corroborates #8 |
| 57 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #29; corroborates #9 |
| 58 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #30; corroborates #10 |
| 59 | 3.4.7 #10 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates #11 |
| 60 | 3.4.7 #11 | 7 documentation | documentation | module-federation | architectural | weak | contradicts #5 |
| 61 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31; corroborates #39; corroborates #40; corroborates #41; corroborates #42; corroborates #43; corroborates #44; corroborates #45; corroborates #46; corroborates #47; corroborates #48; corroborates #49 |
| 62 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #22 |
| 63 | 3.4.7 #14 | 7 documentation | documentation | module-federation | technological | weak | corroborates #5; corroborates #32; corroborates #33; corroborates #34; corroborates #35; corroborates #36; corroborates #37; corroborates #38 |
| 64 | 3.4.7 #15 | 7 documentation | documentation | — | architectural | weak | corroborates #21; corroborates #22; corroborates #23; corroborates #24; corroborates #25; corroborates #26; corroborates #27; corroborates #28; corroborates #29; corroborates #30; corroborates #31; corroborates #39; corroborates #40; corroborates #41; corroborates #42; corroborates #43; corroborates #44; corroborates #45; corroborates #46; corroborates #47; corroborates #48; corroborates #49 |
| 65 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | — |
| 66 | 3.4.7 #17 | 7 documentation | documentation | events | architectural | weak | contradicts #20; contradicts accounts-module/src/App.js:5-19, 38-48 |
| 67 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #34; corroborates #14; corroborates #19 |
| 68 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | corroborates #39; corroborates #40; corroborates #41; corroborates #42; corroborates #43; corroborates #44; corroborates #45; corroborates #46; corroborates #47; corroborates #48; corroborates #49 |
| 69 | 3.4.7 #20 | 7 documentation | documentation | module-federation | technological | weak | corroborates #1 |
| 70 | 3.4.7 #21 | 7 documentation | documentation | — | architectural | weak | contradicts accounts-module/src/App.js:1-2; contradicts accounts-module/src/styles.css:8-19; contradicts accounts-module/webpack.config.js:37-40 |
| 71 | 3.4.7 #22 | 7 documentation | documentation | module-federation | architectural | weak | contradicts #5; contradicts #19 |
| 72 | 3.4.7 #23 | 7 documentation | comment | events | architectural | weak | contradicts #20; contradicts accounts-module/src/App.js:5-19, 46-48; contradicts #5 |
| 73 | 3.4.7 #24 | 7 documentation | comment | — | architectural | weak | contradicts accounts-module/src/App.js:38-44; contradicts #20 |
| 74 | 3.4.7 #25 | 7 documentation | documentation | module-federation | technological | weak | corroborates #2; corroborates #38 |
| 75 | 3.4.7 #26 | 7 documentation | comment | — | context | weak | corroborates ai-agent-module/src/App.js:81-109 |
| 76 | 3.4.7 #27 | 7 documentation | documentation | module-federation | technological | weak | corroborates #3 |
| 77 | 3.4.7 #28 | 7 documentation | documentation | — | architectural | weak | contradicts business-reports/src/styles.css:2-26; contradicts business-reports/webpack.config.js:37-40 |
| 78 | 3.4.7 #29 | 7 documentation | documentation | — | architectural | weak | corroborates #32; corroborates #12; corroborates #19 |
| 79 | 3.4.7 #30 | 7 documentation | documentation | module-federation | technological | weak | corroborates #4 |
| 80 | 3.4.7 #31 | 7 documentation | documentation | — | architectural | weak | corroborates #24; corroborates cards-module/src/App.js:38-44; corroborates #42 |
| 81 | 3.4.7 #32 | 7 documentation | documentation | — | architectural | weak | contradicts cards-module/src/styles.css:8-19; contradicts cards-module/webpack.config.js:37-40 |
| 82 | 3.4.7 #33 | 7 documentation | documentation | — | architectural | weak | contradicts #5; contradicts #19 |
| 83 | 3.4.7 #34 | 7 documentation | comment | events | architectural | weak | contradicts #20; contradicts cards-module/src/App.js:5-19, 46-48; contradicts #5 |
| 84 | 3.4.7 #35 | 7 documentation | comment | — | architectural | weak | contradicts cards-module/src/App.js:38-44; contradicts #20 |
| 85 | 3.4.7 #36 | 7 documentation | documentation | — | architectural | weak | corroborates host-app/src/App.js:3; corroborates host-app/src/styles.css:2-13; corroborates #19 |
| 86 | 3.4.7 #37 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #5; corroborates #12; corroborates #13; corroborates #14; corroborates #15; corroborates #16; corroborates #17; corroborates #18 |
| 87 | 3.4.7 #38 | 7 documentation | documentation | — | architectural | weak | corroborates #12; corroborates #13; corroborates #14; corroborates #15; corroborates #16; corroborates #17; corroborates #18; corroborates #19 |
| 88 | 3.4.7 #39 | 7 documentation | comment | events | technological | weak | corroborates #20 |
| 89 | 3.4.7 #40 | 7 documentation | comment | — | technological | weak | corroborates #12; corroborates #13; corroborates #14; corroborates #15; corroborates #16; corroborates #17; corroborates #18 |
| 90 | 3.4.7 #41 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #35; corroborates #6; corroborates #15; corroborates #19 |
| 91 | 3.4.7 #42 | 7 documentation | documentation | module-federation | technological | weak | corroborates #7 |
| 92 | 3.4.7 #43 | 7 documentation | documentation | — | architectural | weak | contradicts loans-module/src/App.js:1-51; contradicts loans-module/src/styles.css:8-19; contradicts loans-module/webpack.config.js:37-40 |
| 93 | 3.4.7 #44 | 7 documentation | documentation | — | architectural | weak | contradicts #5; contradicts #19 |
| 94 | 3.4.7 #45 | 7 documentation | comment | events | architectural | weak | contradicts #20; contradicts loans-module/src/App.js:5-19, 46-48; contradicts #5 |
| 95 | 3.4.7 #46 | 7 documentation | comment | — | architectural | weak | contradicts loans-module/src/App.js:38-44; contradicts #20 |
| 96 | 3.4.7 #47 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #8; corroborates #36 |
| 97 | 3.4.7 #48 | 7 documentation | documentation | — | architectural | weak | contradicts maker-requests/src/styles.css:2-26; contradicts maker-requests/webpack.config.js:37-40 |
| 98 | 3.4.7 #49 | 7 documentation | documentation | — | architectural | weak | corroborates #36; corroborates #16; corroborates #19 |
| 99 | 3.4.7 #50 | 7 documentation | documentation | module-federation | technological | weak | corroborates #9 |
| 100 | 3.4.7 #51 | 7 documentation | documentation | — | architectural | weak | contradicts model-portfolio-configuration/src/styles.css:2-26; contradicts model-portfolio-configuration/webpack.config.js:37-40 |
| 101 | 3.4.7 #52 | 7 documentation | documentation | module-federation | architectural | weak | corroborates #33; corroborates #13; corroborates #19 |
| 102 | 3.4.7 #53 | 7 documentation | documentation | module-federation | technological | weak | corroborates #10 |
| 103 | 3.4.7 #54 | 7 documentation | documentation | — | architectural | weak | contradicts outgoing-api-logs/src/styles.css:2-12; contradicts outgoing-api-logs/webpack.config.js:37-40 |
| 104 | 3.4.7 #55 | 7 documentation | comment | — | architectural | weak | contradicts start-all-modules.bat:4-12; contradicts #21; contradicts #24; contradicts #27 |
| 105 | 3.4.7 #56 | 7 documentation | documentation | module-federation | technological | weak | corroborates #11 |
| 106 | 3.4.7 #57 | 7 documentation | documentation | — | architectural | weak | contradicts vro-uploads/src/styles.css:1-10; contradicts vro-uploads/webpack.config.js:37-40 |
| 107 | 3.4.7 #58 | 7 documentation | documentation | — | architectural | weak | corroborates #37; corroborates #17; corroborates #19 |
| 108 | 3.4.8 #1 | 8 history | history | events | technological | weak | explains #20; explains #66; explains #72; explains #73; explains #83; explains #84; explains #94; explains #95 |
| 109 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #5; explains #60; explains #71; explains #82; explains #93; explains #104 |
| 110 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #70; explains #77; explains #81; explains #92; explains #97; explains #100; explains #103; explains #106 |

## Summary

Observations: 110. Dimensions (technology: 0, configuration: 11, code: 9, structure: 11, composition: 7, build-deploy: 11, documentation: 58, history: 3). Strength (strong: 16, moderate: 32, weak: 62, ambiguous: 0). Evidence (technological: 23, architectural: 86, context: 1).


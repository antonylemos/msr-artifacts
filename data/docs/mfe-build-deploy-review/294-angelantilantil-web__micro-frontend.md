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
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 294 — angelantilantil-web/micro-frontend

## Repository overview

Eleven React applications with webpack, each in its own directory, without root `package.json` or workspace (structural review). All follow same skeleton: `start` runs `webpack serve` on a fixed port and `build` runs `webpack --mode production` (for example host-app/package.json:4-7), and each `webpack.config.js` has its own entry and writes to `<diretório>/dist` with `publicPath: 'auto'` (for example host-app/webpack.config.js:8-13). File declares `mode: 'development'` (host-app/webpack.config.js:7), overridden by build script `--mode production`. Each build is independent: no script builds all at once, and README instructs entering each directory and running `npm run build` (README.md:176-199), listing only host and six remotes. The `.gitignore` excludes `dist/` and `remoteEntry.js` (.gitignore:11, 44), so no build artifact is versioned.

No deployment artifact is present in snapshot: no Dockerfile, compose, CI, nginx or hosting configuration, and `matches.csv` has no `ci-*` occurrences. All eleven `cfg-public-path` occurrences are `publicPath: 'auto'` on line 11 of each `webpack.config.js`, build configuration not indicating where application is published. All eleven `ops-cors` occurrences are `Access-Control-Allow-*` headers of `devServer` (lines 19-23 of each `webpack.config.js`, for example host-app/webpack.config.js:19-23), needed for host to fetch `remoteEntry.js` files from another port in development. Existing means of running the set is start-all-modules.bat, opening one terminal per application with `npm start` and one for Python backend with `uvicorn --reload` on port 8000 (start-all-modules.bat:4-12): local development, omitting `accounts-module`, `cards-module` and `loans-module`, also not loaded by host (composition review). Remote addresses in host are all `http://localhost:30xx/remoteEntry.js` (host-app/webpack.config.js:47-55). Backend `ai-agent-backend/` (FastAPI with `CORSMiddleware`, ai-agent-backend/app.py:108-110) has no own packaging and is not a frontend unit. README states remotes can be "independently developed and deployed" (README.md:24), but nothing in snapshot publishes them.

## Applications

| # | Application | Build | Deploy | Where served | Versioning | Artifacts |
|---|---|---|---|---|---|---|
| 1 | accounts-module | separate | not observed | `http://localhost:3001` in development (accounts-module/webpack.config.js:15; accounts-module/package.json:5) | No | accounts-module/package.json:6 (`webpack --mode production`); accounts-module/webpack.config.js:8-13 (own entry, output `accounts-module/dist`, `publicPath: 'auto'`) |
| 2 | ai-agent-module | separate | not observed | `http://localhost:3016` in development (ai-agent-module/webpack.config.js:15; ai-agent-module/package.json:5) | No | ai-agent-module/package.json:6 (`webpack --mode production`); ai-agent-module/webpack.config.js:8-13 (own entry, output `ai-agent-module/dist`, `publicPath: 'auto'`) |
| 3 | business-reports | separate | not observed | `http://localhost:3010` in development (business-reports/webpack.config.js:15; business-reports/package.json:5) | No | business-reports/package.json:6 (`webpack --mode production`); business-reports/webpack.config.js:8-13 (own entry, output `business-reports/dist`, `publicPath: 'auto'`) |
| 4 | cards-module | separate | not observed | `http://localhost:3003` in development (cards-module/webpack.config.js:15; cards-module/package.json:5) | No | cards-module/package.json:6 (`webpack --mode production`); cards-module/webpack.config.js:8-13 (own entry, output `cards-module/dist`, `publicPath: 'auto'`) |
| 5 | host-app | separate | not observed | `http://localhost:3000` in development (host-app/webpack.config.js:15; host-app/package.json:5) | No | host-app/package.json:6 (`webpack --mode production`); host-app/webpack.config.js:8-13 (own entry, output `host-app/dist`, `publicPath: 'auto'`) |
| 6 | incoming-api-logs | separate | not observed | `http://localhost:3013` in development (incoming-api-logs/webpack.config.js:15; incoming-api-logs/package.json:5) | No | incoming-api-logs/package.json:6 (`webpack --mode production`); incoming-api-logs/webpack.config.js:8-13 (own entry, output `incoming-api-logs/dist`, `publicPath: 'auto'`) |
| 7 | loans-module | separate | not observed | `http://localhost:3002` in development (loans-module/webpack.config.js:15; loans-module/package.json:5) | No | loans-module/package.json:6 (`webpack --mode production`); loans-module/webpack.config.js:8-13 (own entry, output `loans-module/dist`, `publicPath: 'auto'`) |
| 8 | maker-requests | separate | not observed | `http://localhost:3014` in development (maker-requests/webpack.config.js:15; maker-requests/package.json:5) | No | maker-requests/package.json:6 (`webpack --mode production`); maker-requests/webpack.config.js:8-13 (own entry, output `maker-requests/dist`, `publicPath: 'auto'`) |
| 9 | model-portfolio-configuration | separate | not observed | `http://localhost:3011` in development (model-portfolio-configuration/webpack.config.js:15; model-portfolio-configuration/package.json:5) | No | model-portfolio-configuration/package.json:6 (`webpack --mode production`); model-portfolio-configuration/webpack.config.js:8-13 (own entry, output `model-portfolio-configuration/dist`, `publicPath: 'auto'`) |
| 10 | outgoing-api-logs | separate | not observed | `http://localhost:3012` in development (outgoing-api-logs/webpack.config.js:15; outgoing-api-logs/package.json:5) | No | outgoing-api-logs/package.json:6 (`webpack --mode production`); outgoing-api-logs/webpack.config.js:8-13 (own entry, output `outgoing-api-logs/dist`, `publicPath: 'auto'`) |
| 11 | vro-uploads | separate | not observed | `http://localhost:3015` in development (vro-uploads/webpack.config.js:15; vro-uploads/package.json:5) | No | vro-uploads/package.json:6 (`webpack --mode production`); vro-uploads/webpack.config.js:8-13 (own entry, output `vro-uploads/dist`, `publicPath: 'auto'`) |

## Observations

**1. accounts-module.** Ready remote not declared by host in remotes (host-app/webpack.config.js:47-55). Separate build: `webpack --mode production` (accounts-module/package.json:6) generates `accounts-module/dist` (accounts-module/webpack.config.js:10). Deploy not observed: the only address is development server on port 3001 (accounts-module/package.json:5; accounts-module/webpack.config.js:15), and even start-all-modules.bat does not start it (start-all-modules.bat:4-12). Versioning No: `version: 1.0.0` (accounts-module/package.json:3) is unused in any publication.

**2. ai-agent-module.** Remote `aiAgent`, loaded by host (host-app/webpack.config.js:54). Separate build: `webpack --mode production` (ai-agent-module/package.json:6) generates `ai-agent-module/dist` (ai-agent-module/webpack.config.js:10). It has a call to Python backend at `http://localhost:8000/chat`, but inside a commented block (ai-agent-module/src/App.js:84-109, "API integration is currently disabled for static demo mode"); backend has its own process (start-all-modules.bat:11) and does not enter frontend build. Deploy not observed: only development server on port 3016 (ai-agent-module/package.json:5; ai-agent-module/webpack.config.js:15), triggered by start-all-modules.bat:12. README build section does not include it (README.md:176-199). Versioning No: `version: 1.0.0` (ai-agent-module/package.json:3) is unused in any publication.

**3. business-reports.** Remote `businessReports`, loaded by host (host-app/webpack.config.js:48). Separate build: `webpack --mode production` (business-reports/package.json:6) generates `business-reports/dist` (business-reports/webpack.config.js:10), with its `remoteEntry.js`. Deploy not observed: only development server on port 3010 (business-reports/package.json:5; business-reports/webpack.config.js:15), triggered by start-all-modules.bat:5. Versioning No: `version: 1.0.0` (business-reports/package.json:3) is unused in any publication.

**4. cards-module.** Ready remote not declared by host in remotes (host-app/webpack.config.js:47-55). Separate build: `webpack --mode production` (cards-module/package.json:6) generates `cards-module/dist` (cards-module/webpack.config.js:10). Deploy not observed: the only address is development server on port 3003 (cards-module/package.json:5; cards-module/webpack.config.js:15), and even start-all-modules.bat does not start it (start-all-modules.bat:4-12). Versioning No: `version: 1.0.0` (cards-module/package.json:3) is unused in any publication.

**5. host-app.** Shell. Separate build: `webpack --mode production` (host-app/package.json:6) generates `host-app/dist` (host-app/webpack.config.js:10) containing only host code; all seven remotes enter at runtime through addresses `http://localhost:30xx/remoteEntry.js` (host-app/webpack.config.js:47-55), not bundle. Deploy not observed: only development server on port 3000 (host-app/package.json:5; host-app/webpack.config.js:15), triggered by start-all-modules.bat:4. Versioning No: `version: 1.0.0` (host-app/package.json:3) is unused in any publication.

**6. incoming-api-logs.** Remote `incomingApiLogs`, loaded by host (host-app/webpack.config.js:51). Separate build: `webpack --mode production` (incoming-api-logs/package.json:6) generates `incoming-api-logs/dist` (incoming-api-logs/webpack.config.js:10), with its `remoteEntry.js`. Deploy not observed: only development server on port 3013 (incoming-api-logs/package.json:5; incoming-api-logs/webpack.config.js:15), triggered by start-all-modules.bat:8. Versioning No: `version: 1.0.0` (incoming-api-logs/package.json:3) is unused in any publication.

**7. loans-module.** Ready remote not declared by host in remotes (host-app/webpack.config.js:47-55). Separate build: `webpack --mode production` (loans-module/package.json:6) generates `loans-module/dist` (loans-module/webpack.config.js:10). Deploy not observed: the only address is development server on port 3002 (loans-module/package.json:5; loans-module/webpack.config.js:15), and even start-all-modules.bat does not start it (start-all-modules.bat:4-12). Versioning No: `version: 1.0.0` (loans-module/package.json:3) is unused in any publication.

**8. maker-requests.** Remote `makerRequests`, loaded by host (host-app/webpack.config.js:52). Separate build: `webpack --mode production` (maker-requests/package.json:6) generates `maker-requests/dist` (maker-requests/webpack.config.js:10), with its `remoteEntry.js`. Deploy not observed: only development server on port 3014 (maker-requests/package.json:5; maker-requests/webpack.config.js:15), triggered by start-all-modules.bat:9. Versioning No: `version: 1.0.0` (maker-requests/package.json:3) is unused in any publication.

**9. model-portfolio-configuration.** Remote `modelPortfolio`, loaded by host (host-app/webpack.config.js:49). Separate build: `webpack --mode production` (model-portfolio-configuration/package.json:6) generates `model-portfolio-configuration/dist` (model-portfolio-configuration/webpack.config.js:10), with its `remoteEntry.js`. Deploy not observed: only development server on port 3011 (model-portfolio-configuration/package.json:5; model-portfolio-configuration/webpack.config.js:15), triggered by start-all-modules.bat:6. Versioning No: `version: 1.0.0` (model-portfolio-configuration/package.json:3) is unused in any publication.

**10. outgoing-api-logs.** Remote `outgoingApiLogs`, loaded by host (host-app/webpack.config.js:50). Separate build: `webpack --mode production` (outgoing-api-logs/package.json:6) generates `outgoing-api-logs/dist` (outgoing-api-logs/webpack.config.js:10), with its `remoteEntry.js`. Deploy not observed: only development server on port 3012 (outgoing-api-logs/package.json:5; outgoing-api-logs/webpack.config.js:15), triggered by start-all-modules.bat:7. Versioning No: `version: 1.0.0` (outgoing-api-logs/package.json:3) is unused in any publication.

**11. vro-uploads.** Remote `vroUploads`, loaded by host (host-app/webpack.config.js:53). Separate build: `webpack --mode production` (vro-uploads/package.json:6) generates `vro-uploads/dist` (vro-uploads/webpack.config.js:10), with its `remoteEntry.js`. Deploy not observed: only development server on port 3015 (vro-uploads/package.json:5; vro-uploads/webpack.config.js:15), triggered by start-all-modules.bat:10. Versioning No: `version: 1.0.0` (vro-uploads/package.json:3) is unused in any publication.

## Summary

Applications: 11. Build (separate: 11). Deploy (not observed: 11). Independent versioning: 0.

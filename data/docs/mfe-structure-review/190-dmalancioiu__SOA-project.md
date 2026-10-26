---
schema: 1
id: 1134094230
full_name: dmalancioiu/SOA-project
commit: a00d6436b4a6c4f28287e7e90ded084c1241fcf1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 190 — dmalancioiu/SOA-project

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| frontend/order-tracking | frontend/order-tracking/package.json;frontend/order-tracking/webpack.config.js | frontend/order-tracking/package.json | frontend/order-tracking/webpack.config.js:7 (`entry: './src/index.js'`, que carrega `bootstrap.js` com `createRoot` em src/bootstrap.js:7-8); frontend/order-tracking/webpack.config.js:61 (`template: './public/index.html'`) | frontend/order-tracking/webpack.config.js:44-64 (plugins, com `ModuleFederationPlugin` remoto); frontend/order-tracking/package.json:8 (`webpack --mode production`) | — | frontend/order-tracking/Dockerfile:16 e :25 (`npm run build`, `dist` servido por nginx); docker-compose.yml:317-319 (serviço `order-tracking`, `context: ./frontend/order-tracking`) | Yes | Aplicação React com entrada, build webpack e contêiner próprios |
| frontend/restaurant-catalog | frontend/restaurant-catalog/package.json;frontend/restaurant-catalog/webpack.config.js | frontend/restaurant-catalog/package.json | frontend/restaurant-catalog/webpack.config.js:7 (`entry: './src/index.js'`, `createRoot` em src/bootstrap.js:7-8); frontend/restaurant-catalog/webpack.config.js:60 (`template: './public/index.html'`) | frontend/restaurant-catalog/webpack.config.js:43-63 (plugins, com `ModuleFederationPlugin` remoto); frontend/restaurant-catalog/package.json:8 (`webpack --mode production`) | — | frontend/restaurant-catalog/Dockerfile:16 e :25 (`npm run build`, `dist` servido por nginx); docker-compose.yml:301-303 (serviço `restaurant-catalog`, `context: ./frontend/restaurant-catalog`) | Yes | Aplicação React com entrada, build webpack e contêiner próprios |
| frontend/shell-app | frontend/shell-app/package.json;frontend/shell-app/webpack.config.js | frontend/shell-app/package.json | frontend/shell-app/webpack.config.js:7 (`entry: './src/index.js'`, `ReactDOM.createRoot` em src/bootstrap.js:5-6); frontend/shell-app/webpack.config.js:65 (`template: './public/index.html'`) | frontend/shell-app/webpack.config.js:47-68 (plugins, com `ModuleFederationPlugin` host); frontend/shell-app/package.json:8 (`webpack --mode production`) | — | frontend/shell-app/Dockerfile:16 e :25 (`npm run build`, `dist` servido por nginx); docker-compose.yml:349-351 (serviço `shell-app`, `context: ./frontend/shell-app`) | Yes | Aplicação React (host) com entrada, build webpack e contêiner próprios |
| frontend/user-dashboard | frontend/user-dashboard/package.json;frontend/user-dashboard/webpack.config.js | frontend/user-dashboard/package.json | frontend/user-dashboard/webpack.config.js:8 (`entry: './src/index.js'`, `createRoot` em src/bootstrap.js:7-8); frontend/user-dashboard/webpack.config.js:69 (`template: './public/index.html'`) | frontend/user-dashboard/webpack.config.js:49-72 (plugins, com `ModuleFederationPlugin` remoto do webpack); frontend/user-dashboard/package.json:19 (`webpack --mode production`) | — | frontend/user-dashboard/Dockerfile:16 e :25 (`npm run build`, `dist` servido por nginx); docker-compose.yml:333-335 (serviço `user-dashboard`, `context: ./frontend/user-dashboard`) | Yes | Aplicação React com entrada, build webpack e contêiner próprios |
| infrastructure/faas/order-completion | infrastructure/faas/order-completion/package.json | infrastructure/faas/order-completion/package.json | — (infrastructure/faas/order-completion/package.json:5 `main: handler.js`, servidor Express em handler.js:1-2, não UI) | — | — | infrastructure/faas/order-completion/Dockerfile:1 e :25 (`node:18-alpine`, `CMD ["node", "handler.js"]`) | No | Função OpenFaaS em Node/Express, não é frontend |

## Resumo

Aplicações frontend no snapshot: 4 (frontend/order-tracking, frontend/restaurant-catalog, frontend/shell-app, frontend/user-dashboard).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação.
- Não há `package.json` na raiz nem em `frontend/`; os quatro projetos são independentes, sem workspace. Os arquivos `workspace-config` do `artifacts.csv` são só os `package.json` de cada diretório, sem `workspaces`.
- Os scripts `build` (`webpack --mode production`) não passam `--config`, então leem o `webpack.config.js` do próprio diretório.
- As ocorrências `ops-*` restantes (Dockerfiles Java em `backend/`, funções Python em `infrastructure/faas/`, `infrastructure/nginx/nginx.conf`, guias com `kubectl`) não pertencem a unidades do `units.csv`. Não há ocorrências `ci-*`.

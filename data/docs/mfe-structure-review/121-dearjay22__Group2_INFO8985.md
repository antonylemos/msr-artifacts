---
schema: 1
id: 1108713604
full_name: dearjay22/Group2_INFO8985
commit: 9f8b0b7df3c6bcdb67eee8cb21cebde3ff2ce189
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 121 — dearjay22/Group2_INFO8985

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| frontend/products-mf | frontend/products-mf/package.json | frontend/products-mf/package.json | frontend/products-mf/src/index.js:7-12 (entrada `src/index.*` da convenção do CRA; `ReactDOM.createRoot` renderiza `App`); frontend/products-mf/public/index.html:31 (`<div id="root">`, template HTML do CRA) | frontend/products-mf/package.json:17 (`"build": "react-scripts build"`, sem arquivo de configuração próprio) | — | frontend/products-mf/Dockerfile:1-12 (build `npm run build` e publicação em Nginx); docker-compose.yml:66-69 (serviço `products-mf`, `build: ./frontend/products-mf`, porta `3001:80`) | Yes | Aplicação CRA com entrada própria, build por `react-scripts` e imagem própria. |
| frontend/shell-app | frontend/shell-app/package.json | frontend/shell-app/package.json | frontend/shell-app/src/index.js:7-12 (entrada `src/index.*` da convenção do CRA; `ReactDOM.createRoot` renderiza `App`); frontend/shell-app/public/index.html:31 (`<div id="root">`, template HTML do CRA) | frontend/shell-app/package.json:17 (`"build": "react-scripts build"`, sem arquivo de configuração próprio) | — | frontend/shell-app/Dockerfile:1-12 (build `npm run build` e publicação em Nginx); docker-compose.yml:59-62 (serviço `shell-app`, `build: ./frontend/shell-app`, porta `3000:80`) | Yes | Aplicação CRA com entrada própria, build por `react-scripts` e imagem própria. |

## Resumo

Aplicações frontend no snapshot: 2 (frontend/products-mf, frontend/shell-app).

## Notas

- Os dois `package.json` têm a marca `workspace-config` no `artifacts.csv`, mas não declaram `workspaces` (`frontend/shell-app/package.json:1-39`; `frontend/products-mf/package.json:1-39`), e não há `package.json` na raiz nem `pnpm-workspace.yaml`, `lerna.json`, `turbo.json`, `nx.json`, `rush.json`, `angular.json` ou `project.json` no snapshot. O `matches.csv` não tem ocorrências `ws-*`.
- O único workflow (`.github/workflows/ci.yml:18-19`, `docker compose build`) constrói todos os serviços juntos; não é job separado de nenhum dos diretórios. O deploy separado vem dos Dockerfiles e dos serviços próprios no Compose.
- Os Dockerfiles de `backend/*` e os serviços de monitoramento do Compose não são frontend e não estão no `units.csv`.
- A contagem (2) coincide com `frontend_units: 2` da classificação.

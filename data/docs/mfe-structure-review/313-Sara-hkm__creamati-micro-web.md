---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 313 — Sara-hkm/creamati-micro-web

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — | — | — | No | Manifesto só com scripts que entram em `frontend/*` (package.json:8-15) e `concurrently` (package.json:29); sem entrada nem build próprios. |
| frontend/analytics-app | frontend/analytics-app/package.json | frontend/analytics-app/package.json | frontend/analytics-app/src/index.tsx:7-14 (entrada `src/index.*` da convenção do CRA; `ReactDOM.createRoot(...).render(<App />)`); frontend/analytics-app/public/index.html:31 (`<div id="root">`, template HTML do CRA) | frontend/analytics-app/package.json:22 (`"build": "react-scripts build"`, sem arquivo de configuração próprio) | — | .github/workflows/deploy-analytics.yml:6-7 e 28-43 (gatilho por `frontend/analytics-app/**`; `npm run build` e publicação de `frontend/analytics-app/build` no GitHub Pages em `analytics`); .github/workflows/deploy-all.yml:88 e 101-116 (matriz `deploy-micro-frontends`, destino `analytics`) | Yes | Aplicação CRA com entrada própria e build por `react-scripts`. |
| frontend/container | frontend/container/package.json | frontend/container/package.json | frontend/container/src/index.tsx:7-14 (entrada `src/index.*` da convenção do CRA; `ReactDOM.createRoot(...).render(<App />)`); frontend/container/public/index.html:31 (`<div id="root">`, template HTML do CRA) | frontend/container/package.json:22 (`"build": "react-scripts build"`, sem arquivo de configuração próprio) | — | .github/workflows/deploy-container.yml:6-7 e 28-43 (gatilho por `frontend/container/**`; `npm run build` e publicação de `frontend/container/build` no GitHub Pages em `container`); .github/workflows/deploy-all.yml:49-78 (job `deploy-container`) | Yes | Aplicação CRA com entrada própria e build por `react-scripts`. |
| frontend/data-grid-app | frontend/data-grid-app/package.json | frontend/data-grid-app/package.json | frontend/data-grid-app/src/index.tsx:7-14 (entrada `src/index.*` da convenção do CRA; `ReactDOM.createRoot(...).render(<App />)`); frontend/data-grid-app/public/index.html:31 (`<div id="root">`, template HTML do CRA) | frontend/data-grid-app/package.json:22 (`"build": "react-scripts build"`, sem arquivo de configuração próprio) | — | .github/workflows/deploy-data-grid.yml:6-7 e 28-43 (gatilho por `frontend/data-grid-app/**`; `npm run build` e publicação de `frontend/data-grid-app/build` no GitHub Pages em `data-grid`); .github/workflows/deploy-all.yml:87 e 101-116 (matriz `deploy-micro-frontends`, destino `data-grid`) | Yes | Aplicação CRA com entrada própria e build por `react-scripts`. |
| frontend/settings-app | frontend/settings-app/package.json | frontend/settings-app/package.json | frontend/settings-app/src/index.tsx:7-14 (entrada `src/index.*` da convenção do CRA; `ReactDOM.createRoot(...).render(<App />)`); frontend/settings-app/public/index.html:31 (`<div id="root">`, template HTML do CRA) | frontend/settings-app/package.json:22 (`"build": "react-scripts build"`, sem arquivo de configuração próprio) | — | .github/workflows/deploy-settings.yml:6-7 e 28-43 (gatilho por `frontend/settings-app/**`; `npm run build` e publicação de `frontend/settings-app/build` no GitHub Pages em `settings`); .github/workflows/deploy-all.yml:89 e 101-116 (matriz `deploy-micro-frontends`, destino `settings`) | Yes | Aplicação CRA com entrada própria e build por `react-scripts`. |
| frontend/user-management-app | frontend/user-management-app/package.json | frontend/user-management-app/package.json | frontend/user-management-app/src/index.tsx:7-14 (entrada `src/index.*` da convenção do CRA; `ReactDOM.createRoot(...).render(<App />)`); frontend/user-management-app/public/index.html:31 (`<div id="root">`, template HTML do CRA) | frontend/user-management-app/package.json:22 (`"build": "react-scripts build"`, sem arquivo de configuração próprio) | — | .github/workflows/deploy-user-management.yml:6-7 e 28-43 (gatilho por `frontend/user-management-app/**`; `npm run build` e publicação de `frontend/user-management-app/build` no GitHub Pages em `user-management`); .github/workflows/deploy-all.yml:86 e 101-116 (matriz `deploy-micro-frontends`, destino `user-management`) | Yes | Aplicação CRA com entrada própria e build por `react-scripts`. |

## Resumo

Aplicações frontend no snapshot: 5 (frontend/analytics-app, frontend/container, frontend/data-grid-app, frontend/settings-app, frontend/user-management-app).

## Notas

- N = 5 coincide com `frontend_units: 5` da classificação (o container e os quatro micro-frontends).
- Os `package.json` de `frontend/*` aparecem como `workspace-config` no `artifacts.csv`, mas nenhum `package.json` do snapshot declara `workspaces`, e não há ocorrências `ws-*` no `matches.csv`. A raiz instala e constrói cada app com `cd` em scripts (package.json:13-14), e cada app tem `package-lock.json` próprio.
- Os quatro `package.json` dos micro-frontends são iguais ao do container, exceto pelo `name`; nenhum app tem `webpack.config.*` ou outro arquivo de build além do `react-scripts`.
- `DEPLOYMENT.md` descreve deploy no Vercel e no Netlify (ocorrências `ops-hosting`), mas os workflows do snapshot publicam no GitHub Pages; só os workflows foram usados como evidência de deploy.

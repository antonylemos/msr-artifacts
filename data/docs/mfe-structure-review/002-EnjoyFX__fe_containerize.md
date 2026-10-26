---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 002 — EnjoyFX/fe_containerize

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| backend | backend/package.json | backend/package.json:1-8 (pacote NestJS) | backend/src/main.ts:5-21 (inicia servidor HTTP, sem UI) | backend/nest-cli.json:1-5 (configuração Nest); backend/package.json:6 (`nest build`) | — | backend/Dockerfile:2-17 (imagem do servidor); docker-compose.yml:18-19 (contexto backend) | No | Servidor NestJS, sem entrada de aplicação frontend. |
| frontend | frontend/index.html;frontend/package.json;frontend/vite.config.js | frontend/package.json:1-10 (pacote React/Vite) | frontend/index.html:9-10 (carrega src/main.jsx); frontend/src/main.jsx:6-9 (monta a UI) | frontend/vite.config.js:4-13 (configuração Vite); frontend/package.json:8 (`vite build`) | — | frontend/Dockerfile:2-14 (build e imagem nginx); docker-compose.yml:39-40 (contexto frontend) | Yes | Aplicação React com entrada, build Vite e imagem próprios. |
| microfrontend | microfrontend/index.html;microfrontend/package.json;microfrontend/vite.config.js | microfrontend/package.json:1-10 (pacote do widget) | microfrontend/vite.config.js:25-29 (entrada src/main.jsx); microfrontend/src/main.jsx:7-11 (monta a UI); microfrontend/index.html:9-12 (entrada standalone) | microfrontend/vite.config.js:19-32 (build IIFE próprio); microfrontend/package.json:8 (`vite build`) | — | microfrontend/Dockerfile:2-14 (build e imagem nginx); docker-compose.yml:35-36 (contexto microfrontend) | Yes | Widget frontend com função de montagem e build próprio, executável isoladamente pelo HTML local. |

## Resumo

Aplicações frontend no snapshot: 2 (frontend, microfrontend).

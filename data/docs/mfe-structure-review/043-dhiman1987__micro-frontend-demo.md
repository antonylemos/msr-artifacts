---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 043 — dhiman1987/micro-frontend-demo

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| app-shell | app-shell/index.html | — | app-shell/index.html:9-29 (página HTML com UI) | — (estático, sem build) | — | — | Yes | Página HTML própria que carrega só arquivos estáticos (app-shell/index.html:7 `style.css`); não precisa de build. |
| app1 | app1/index.html | — | app1/index.html:3-4 (carrega app.js e instancia elemento); app1/app.js:1-6 (UI do custom element) | — (estático, sem build) | — | — | Yes | Página HTML própria que carrega `app.js` sem imports de pacotes; não precisa de build. |
| app2 | app2/index.html | — | app2/index.html:3-4 (carrega app.js e instancia elemento); app2/app.js:1-6 (UI do custom element) | — (estático, sem build) | — | — | Yes | Página HTML própria que carrega `app.js` sem imports de pacotes; não precisa de build. |
| app3 | app3/index.html;app3/package.json;app3/vite.config.js | app3/package.json:1-11 (pacote próprio) | app3/vite.config.js:9-15 (entrada de build MyCounterElement.jsx); app3/src/MyCounterElement.jsx:20-28 (monta React e registra elemento); app3/index.html:11-12 (entrada standalone) | app3/vite.config.js:4-16 (build IIFE próprio); app3/package.json:8 (`vite build`) | — | — | Yes | Aplicação React encapsulada em custom element, com entrada e build Vite próprios. |

## Resumo

Aplicações frontend no snapshot: 4 (app-shell, app1, app2, app3).

## Notas

- app-shell, app1 e app2 são páginas estáticas servidas diretamente: app1/app.js e app2/app.js não têm imports, e app-shell/index.html só carrega o próprio `style.css` e scripts das outras unidades por URL (app-shell/index.html:14, :20 e :26). Pela regra de página estática sem build, são unidades frontend.
- O resumo (4) coincide com `frontend_units: 4` da classificação.
- README.md:39-69 orienta servir cada diretório com `http-server` em portas distintas (3000 a 3003); são instruções de execução local, não artefato de deploy.

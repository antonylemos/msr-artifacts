---
schema: 1
id: 1205888629
full_name: farzanemadani/todo-app-using-mfe
commit: 21fc4773aa4d577351ce2000de48b52a73db8378
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 318 — farzanemadani/todo-app-using-mfe

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| host-app | host-app/package.json;host-app/webpack.dev.js;host-app/webpack.prod.js | host-app/package.json | host-app/webpack.prod.js:11 (`entry:"./src/bootstrap.js"`); host-app/webpack.dev.js:7 (idem); host-app/src/index.js:5-10 (`createRoot(...).render(<BrowserRouter><App /></BrowserRouter>)`) | host-app/webpack.prod.js + host-app/package.json:8 (`webpack --config webpack.prod.js`); host-app/webpack.dev.js + host-app/package.json:7 (`webpack serve --config webpack.dev.js`) | — | — | Yes | Aplicação React (o host) com entrada e build webpack próprios |
| todoForm-app | todoForm-app/package.json;todoForm-app/webpack.dev.js;todoForm-app/webpack.prod.js | todoForm-app/package.json | todoForm-app/webpack.prod.js:9 (`entry: "./src/bootstrap.js"`); todoForm-app/webpack.dev.js:9 (idem); todoForm-app/src/index.js:3-4 (`createRoot(...).render(<App />)`) | todoForm-app/webpack.prod.js + todoForm-app/package.json:8 (`webpack --config webpack.prod.js`); todoForm-app/webpack.dev.js + todoForm-app/package.json:7 (`webpack serve --config webpack.dev.js`) | — | — | Yes | Aplicação React (remote do formulário) com entrada e build webpack próprios |
| todoList-app | todoList-app/package.json;todoList-app/webpack.dev.js;todoList-app/webpack.prod.js | todoList-app/package.json | todoList-app/webpack.prod.js:8 (`entry: "./src/bootstrap.js"`); todoList-app/webpack.dev.js:8 (idem); todoList-app/src/index.js:3-4 (`createRoot(...).render(<App />)`) | todoList-app/webpack.prod.js + todoList-app/package.json:9 (`webpack --config webpack.prod.js`); todoList-app/webpack.dev.js + todoList-app/package.json:8 (`webpack serve --config webpack.dev.js`) | — | — | Yes | Aplicação React (remote da lista) com entrada e build webpack próprios |

## Resumo

Aplicações frontend no snapshot: 3 (host-app, todoForm-app, todoList-app).

## Notas

- Não há `package.json` na raiz; os três `package.json` não têm `workspaces`, embora o `artifacts.csv` os marque como `workspace-config`. Por isso, nenhuma declaração de workspace.
- Nenhuma ocorrência `ops-*` ou `ci-*` no `matches.csv` e nenhum Dockerfile, workflow ou configuração de hospedagem no snapshot.
- N = 3 coincide com `frontend_units: 3` da classificação.

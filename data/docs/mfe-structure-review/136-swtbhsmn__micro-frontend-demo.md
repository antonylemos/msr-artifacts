---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 136 — swtbhsmn/micro-frontend-demo

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| app1 | app1/package.json;app1/webpack.config.js | app1/package.json:1-21 (pacote próprio `app1`) | app1/webpack.config.js:6 (`entry: "./src/index.js"`); app1/src/index.js:1 (`import('./bootstrap')`); app1/src/bootstrap.js:5-6 (monta React em `#root`); app1/webpack.config.js:35-37 (template `./public/index.html`) | app1/webpack.config.js:5-40 (configuração própria, porta 3001); app1/package.json:6 (`webpack serve --mode development --port 3001`) | — | — | Yes | Aplicação React com entrada e configuração webpack próprias, servida isoladamente. |
| app2 | app2/package.json;app2/webpack.config.js | app2/package.json:1-21 (pacote próprio `app2`) | app2/webpack.config.js:6 (`entry: "./src/index.js"`); app2/src/index.js:1 (`import('./bootstrap')`); app2/src/bootstrap.js:5-6 (monta React em `#root`); app2/webpack.config.js:36-38 (template `./public/index.html`) | app2/webpack.config.js:5-41 (configuração própria, porta 3002); app2/package.json:6 (`webpack serve --mode development --port 3002`) | — | — | Yes | Aplicação React com entrada e configuração webpack próprias, servida isoladamente. |

## Resumo

Aplicações frontend no snapshot: 2 (app1, app2).

## Notas

- O `artifacts.csv` marca os dois `package.json` como `workspace-config`, mas nenhum tem campo `workspaces` (app1/package.json:1-21; app2/package.json:1-21), o `matches.csv` não tem ocorrência `ws-*`, e não há manifesto raiz nem outro arquivo de workspace no snapshot.
- Os dois `package.json` só têm o script `start` (`webpack serve` em modo development); não há script `build` nem configuração de produção. O build é a própria configuração webpack invocada por esse script.
- Não há Dockerfile, CI ou configuração de hospedagem no snapshot, e o `matches.csv` não tem ocorrências `ops-*` ou `ci-*`.
- A contagem 2 coincide com `frontend_units: 2` da classificação.

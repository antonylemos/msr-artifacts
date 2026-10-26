---
schema: 1
id: 1136702019
full_name: santhoshreddy500939/webpackconfig
commit: e1f97e37c21a6893a8dbf8cd6ea7a7f8c4a9058a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 271 — santhoshreddy500939/webpackconfig

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;webpack.common.config.js;webpack.dev.config.js;webpack.prod.config.js | package.json | webpack.common.config.js:7 (`entry:"./index.js"`); index.js:19-20 (`createRoot(...).render(<App/>)`); webpack.common.config.js:37-39 (`HtmlWebpackPlugin` com `template:"index.html"`) | webpack.dev.config.js:5 (`merge(common, …)`) + package.json:9 (`build:dev`: `webpack serve --config webpack.dev.config.js`); webpack.prod.config.js:4-34 + package.json:8 (`build`: `webpack --config webpack.prod.config.js`) | — | — | Yes | Única aplicação React do snapshot (o host), com entrada e build webpack próprios |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 2`: o host `.` e o remoto `RemoteApp` (`webpack.common.config.js:34`, `RemoteApp@http://localhost:9001/remoteappbuild.js`), que está fora do snapshot.
- `package.json` aparece como `workspace-config` no `artifacts.csv`, mas não tem campo `workspaces` (`package.json:1-34`); não há outra declaração de workspace.
- `webpack.prod.config.js:4-34` não declara `entry` nem faz `merge` com a config comum; a entrada `./index.js` é declarada só em `webpack.common.config.js:7`, usada pelo build de desenvolvimento. O build de produção depende do `entry` padrão do webpack (`./src`), ausente do snapshot. Não muda o resultado: o build de desenvolvimento já dá entrada e build próprios.
- Nenhuma ocorrência `ops-*` ou `ci-*` no `matches.csv` e nenhum Dockerfile, workflow ou configuração de hospedagem no snapshot.

---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 211 — varshinir07/mfe-onehub-shell-app

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | src/webpack.config.js:10 (`entry: './src/index.js'`); src/webpack.config.js:68-70 (`HtmlWebpackPlugin` com `template: './public/index.html'`) | src/webpack.config.js:5-102 (config webpack com `ModuleFederationPlugin`); package.json:20 (`webpack --config src/webpack.config.js --mode development`) | — | — | Yes | Única aplicação React do snapshot (o host), com entrada e build próprios |
| public | public/index.html | — | — | — | — | — | No | Parte da unidade `.`: `public/index.html` é o template usado em src/webpack.config.js:69 |
| src | src/webpack.config.js | — | — | — | — | — | No | Parte da unidade `.`: a config e a entrada `src/index.js` são do build invocado por package.json:19-20 da raiz |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 3`: o host e os remotes `subscription` e `ownership`, que estão fora do snapshot e só aparecem em src/webpack.config.js:76-77 (`localhost:3001` e `localhost:3002`).
- A marca `workspace-config` de `package.json` no `artifacts.csv` não corresponde a declaração de workspace: o arquivo não tem `workspaces` (package.json:1-51), e o `matches.csv` não tem ocorrências `ws-*`.
- Nenhuma ocorrência `ops-*` ou `ci-*` no `matches.csv` e nenhum Dockerfile, workflow ou configuração de hospedagem no snapshot.

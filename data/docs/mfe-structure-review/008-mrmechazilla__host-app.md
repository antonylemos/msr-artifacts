---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
annotation:
  method: manual
  status: final
  date: 2026-10-19
---

# 008 — mrmechazilla/host-app

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | angular.json;package.json;webpack.config.js;webpack.prod.config.js | package.json | angular.json:41 (`main: src/main.ts`); angular.json:21 (`index: src/index.html`) | angular.json:17-18 (target `build` com `ngx-build-plus:browser`); angular.json:42 (`extraWebpackConfig: webpack.config.js`); package.json:7 (`ng build`) | — | — | Yes | Única aplicação Angular do snapshot (o host), com entrada e build próprios |
| src | src/index.html | — | — | — | — | — | No | Parte da unidade `.`: `src/index.html` é a página de entrada declarada em angular.json:21 |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 3`: o host e os remotes `users-mfe` e `payments-mfe`, que estão fora do snapshot e só aparecem em `public/mf.manifest.json` (remotes em `localhost:4202` e `localhost:4203`).
- `angular.json:5-6` declara um único projeto (`host-app`); por isso não há workspace.
- Nenhuma ocorrência `ops-*` ou `ci-*` no `matches.csv` e nenhum Dockerfile, workflow ou configuração de hospedagem no snapshot.

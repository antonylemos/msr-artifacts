---
schema: 1
id: 1183434052
full_name: SABHGG/odin-replica
commit: 06ce2bd578663f88243854f6eef292686660dfce
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 087 — SABHGG/odin-replica

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | src/index.js:56-60 e 103 (entrada `src/index.*` da convenção do CRA; registra `odin-react` e chama `start()`); public/index.html:31 (`<div id="root">`, template HTML do CRA) | package.json:20 (`"build": "react-scripts build"`, sem arquivo de configuração próprio) | — | — | Yes | Aplicação CRA com entrada própria e build por `react-scripts`. |
| public | public/index.html | — | — | — | — | — | No | Template HTML da aplicação da raiz, usado pelo build `react-scripts` da linha `.`. |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 2`: a raiz (host single-spa com a unidade local `odin-react` no mesmo bundle) e o remoto externo `leadocs-angular`, carregado de `LEAPDOCS_BUNDLE_URL` (src/index.js:9 e 63-100). O remoto não está no snapshot e não vira linha.
- `package.json` aparece como `workspace-config` no `artifacts.csv`, mas não declara `workspaces` (package.json:1-45) e não há ocorrências `ws-*`, `ops-*` ou `ci-*` no `matches.csv`.

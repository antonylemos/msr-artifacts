---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — (`package.json:5` declara `main: index.js`, ausente do snapshot) | — (`package.json:6-9` só tem scripts `playwright test`) | — | — | No | Pacote de testes e2e (Playwright), sem entrada nem build de aplicação frontend |
| docs | docs/index.html | — | docs/index.html:15-35 (`<div id="app">` e `window.$docsify` com `docsify.min.js` do CDN) | — (estático, sem build) | — | — | No | Site de documentação Docsify, não é aplicação frontend do sistema |

## Resumo

Aplicações frontend no snapshot: 0.

## Notas

- A classificação registra `frontend_units: 42`: módulos ESM externos listados em `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json`, cujas fontes não estão no snapshot. Por isso a contagem aqui é 0.
- O `artifacts.csv` marca `package.json` como `workspace-config`, mas o arquivo não tem campo `workspaces` (`package.json:1-19`) e o `matches.csv` não tem ocorrência `ws-*`.
- As ocorrências `ops-*` do `matches.csv` são Dockerfiles e compose de OpenFn, OpenMRS core, MariaDB e Traefik em `scripts/`, não deploy de `.` nem de `docs`. Os workflows `ci-*` empacotam a distribuição Maven ou rodam os testes Playwright (`.github/workflows/playwright.yml:15-19`); nenhum constrói ou publica `docs`.

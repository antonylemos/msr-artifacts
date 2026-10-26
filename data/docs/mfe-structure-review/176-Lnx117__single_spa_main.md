---
schema: 1
id: 1181945275
full_name: Lnx117/single_spa_main
commit: 112c73b7d0bc4739bcab53de03b404ce2fbde05a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 176 — Lnx117/single_spa_main

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;vite.config.ts | package.json | index.html:20 (`<script type="module" src="/src/main.ts">`, página de entrada do Vite no diretório) | vite.config.ts:5-16 (`defineConfig` com `vitePluginSingleSpa`); package.json:8 (`vite build`) | — | — | Yes | Root config single-spa com entrada `index.html` e build Vite próprios |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 3`: o root config e os microfrontends `menu` e `base`, que estão fora do snapshot e só aparecem como URLs em `.envtest:8` e `.envtest:11` (`localhost:9083` e `localhost:9081`), carregadas por `src/main.ts:15` e `:23`.
- `artifacts.csv` marca `package.json` como `workspace-config`, mas o arquivo não tem campo `workspaces` (`package.json:1-22`) e o `matches.csv` não tem ocorrências `ws-*`; não há workspace.
- Nenhuma ocorrência `ops-*` ou `ci-*` no `matches.csv` e nenhum Dockerfile, workflow ou configuração de hospedagem no snapshot (6 arquivos).

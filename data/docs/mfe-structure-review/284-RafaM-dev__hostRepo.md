---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 284 — RafaM-dev/hostRepo

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | index.html;package.json;vite.config.ts | package.json | index.html:11 (`<script type="module" src="/src/main.tsx">`); src/main.tsx:7-13 (`createRoot(...).render(<App />)`) | vite.config.ts:5-17 (config Vite com `react()` e `federation(...)`); package.json:8 (`tsc -b && vite build`) | — | — | Yes | Única aplicação React + Vite do snapshot (o host), com entrada e build próprios |

## Resumo

Aplicações frontend no snapshot: 1 (.).

## Notas

- A classificação registra `frontend_units: 2`: o host e o remoto `mf-remoteDetails`, que está fora do snapshot e só aparece em vite.config.ts:12 (`http://localhost:5001/assets/remoteEntry.js`).
- A marca `workspace-config` de `package.json` e dos `tsconfig*.json` no `artifacts.csv` não corresponde a declaração de workspace: `package.json:1-40` não tem `workspaces`, e o `matches.csv` não tem ocorrências `ws-*`.
- O arquivo vazio `remote-root@0.0.0` na raiz não é unidade nem manifesto.
- Nenhuma ocorrência `ops-*` ou `ci-*` no `matches.csv` e nenhum Dockerfile, workflow ou configuração de hospedagem no snapshot.

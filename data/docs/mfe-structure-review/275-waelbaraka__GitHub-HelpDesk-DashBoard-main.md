---
schema: 1
id: 1006453202
full_name: waelbaraka/GitHub-HelpDesk-DashBoard-main
commit: ccb8398a4d53178974be0fc2b7483cba5d769013
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 275 — waelbaraka/GitHub-HelpDesk-DashBoard-main

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| Backend | Backend/package.json | Backend/package.json | — | — | — | — | No | Servidor Express/Prisma (`main: index.js` em Backend/package.json:6; `express` em Backend/index.js:7), não é frontend |
| Frontend | Frontend/index.html;Frontend/package.json;Frontend/vite.config.js | Frontend/package.json | Frontend/index.html:11 (`<script type="module" src="/src/main.jsx">`; `createRoot` em Frontend/src/main.jsx:26) | Frontend/vite.config.js:7-61 (`defineConfig` com `react()` e `federation`); Frontend/package.json:8 (`vite build`) | — | — | Yes | Host React + Vite com entrada e build próprios |
| whatsapp-module-frontend | whatsapp-module-frontend/index.html;whatsapp-module-frontend/package.json;whatsapp-module-frontend/vite.config.js | whatsapp-module-frontend/package.json | whatsapp-module-frontend/index.html:11 (`<script type="module" src="/src/main.jsx">`; `ReactDOM.createRoot` em whatsapp-module-frontend/src/main.jsx:6) | whatsapp-module-frontend/vite.config.js:7-61 (`defineConfig` com `react()` e `federation`); whatsapp-module-frontend/package.json:8 (`vite build --watch` com `vite preview --port 5001`) | — | — | Yes | Remoto React + Vite com entrada e build próprios |

## Resumo

Aplicações frontend no snapshot: 2 (Frontend, whatsapp-module-frontend).

## Notas

- N = 2 coincide com `frontend_units: 2` da classificação (host `Frontend/` e remoto `whatsapp-module-frontend/`).
- A única ocorrência `ops-*`/`ci-*` do `matches.csv` é `ops-cors` em whatsapp-module-frontend/vite.config.js:55 (`cors: true` do servidor de desenvolvimento), que não é artefato de deploy. Não há Dockerfile, workflow de CI nem configuração de hospedagem no snapshot.
- O script `build` do remoto (whatsapp-module-frontend/package.json:8) roda `vite build --watch` junto com `vite preview`; continua sendo um build Vite próprio do diretório.

---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 083 — webdevqadeer/frontend-development

## Workspace

`react/mv-marketplace/package.json:4-11` (`workspaces` com `packages/mvp-theme`, `apps/admin`, `apps/buyer`, `apps/payment`, `apps/seller` e `apps/shell`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| react/mv-marketplace | react/mv-marketplace/package.json | react/mv-marketplace/package.json:1-21 (manifesto coordenador, só `workspaces` e scripts) | — | — (react/mv-marketplace/package.json:13-15 só delega `npm run build -w` aos workspaces) | — | — | No | Raiz de orquestração npm workspaces, sem entrada de UI nem build de aplicação próprios. |
| react/mv-marketplace/apps/admin | react/mv-marketplace/apps/admin/package.json;react/mv-marketplace/apps/admin/vite.config.js | react/mv-marketplace/apps/admin/package.json:1-28 (manifesto próprio) | react/mv-marketplace/apps/admin/index.html:11 (entrada `/src/main.jsx`); react/mv-marketplace/apps/admin/src/main.jsx:1-9 (monta React com `createRoot`) | react/mv-marketplace/apps/admin/vite.config.js:5-21 (configuração própria); react/mv-marketplace/apps/admin/package.json:8 (`vite build`) | react/mv-marketplace/package.json:6 (`apps/admin`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| react/mv-marketplace/apps/buyer | react/mv-marketplace/apps/buyer/package.json;react/mv-marketplace/apps/buyer/vite.config.js | react/mv-marketplace/apps/buyer/package.json:1-28 (manifesto próprio) | react/mv-marketplace/apps/buyer/index.html:11 (entrada `/src/main.jsx`); react/mv-marketplace/apps/buyer/src/main.jsx:1-9 (monta React com `createRoot`) | react/mv-marketplace/apps/buyer/vite.config.js:5-21 (configuração própria); react/mv-marketplace/apps/buyer/package.json:8 (`vite build`) | react/mv-marketplace/package.json:7 (`apps/buyer`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| react/mv-marketplace/apps/payment | react/mv-marketplace/apps/payment/package.json;react/mv-marketplace/apps/payment/vite.config.js | react/mv-marketplace/apps/payment/package.json:1-28 (manifesto próprio) | react/mv-marketplace/apps/payment/index.html:11 (entrada `/src/main.jsx`); react/mv-marketplace/apps/payment/src/main.jsx:1-9 (monta React com `createRoot`) | react/mv-marketplace/apps/payment/vite.config.js:5-19 (configuração própria); react/mv-marketplace/apps/payment/package.json:8 (`vite build`) | react/mv-marketplace/package.json:8 (`apps/payment`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| react/mv-marketplace/apps/seller | react/mv-marketplace/apps/seller/package.json;react/mv-marketplace/apps/seller/vite.config.js | react/mv-marketplace/apps/seller/package.json:1-28 (manifesto próprio) | react/mv-marketplace/apps/seller/index.html:11 (entrada `/src/main.jsx`); react/mv-marketplace/apps/seller/src/main.jsx:1-9 (monta React com `createRoot`) | react/mv-marketplace/apps/seller/vite.config.js:5-19 (configuração própria); react/mv-marketplace/apps/seller/package.json:8 (`vite build`) | react/mv-marketplace/package.json:9 (`apps/seller`) | — | Yes | Aplicação React com entrada e build Vite próprios. |
| react/mv-marketplace/apps/shell | react/mv-marketplace/apps/shell/package.json;react/mv-marketplace/apps/shell/vite.config.js | react/mv-marketplace/apps/shell/package.json:1-29 (manifesto próprio) | react/mv-marketplace/apps/shell/index.html:11 (entrada `/src/main.jsx`); react/mv-marketplace/apps/shell/src/main.jsx:3,5-9 (monta React, mas importa `./App.jsx`, ausente do snapshot, que só tem `src/app.jsx`) | react/mv-marketplace/apps/shell/vite.config.js:6-35 (configuração própria); react/mv-marketplace/apps/shell/package.json:8 (`vite build`) | react/mv-marketplace/package.json:10 (`apps/shell`) | — | Undetermined | Entrada e build próprios, mas a entrada importa um arquivo ausente do snapshot (`App.jsx` difere de `app.jsx` na caixa). |
| react/mv-marketplace/packages/mvp-theme | react/mv-marketplace/packages/mvp-theme/package.json;react/mv-marketplace/packages/mvp-theme/vite.config.js | react/mv-marketplace/packages/mvp-theme/package.json:1-27 (manifesto próprio, `mv-theme`) | — (react/mv-marketplace/packages/mvp-theme/vite.config.js:8-13 só declara entrada de biblioteca `src/index.js`, que reexporta um Button em src/index.js:1; sem `index.html`) | react/mv-marketplace/packages/mvp-theme/vite.config.js:7-24 (build de biblioteca ES/UMD); react/mv-marketplace/packages/mvp-theme/package.json:10 (`vite build`) | react/mv-marketplace/package.json:5 (`packages/mvp-theme`) | — | No | Biblioteca de componentes compartilhada, sem entrada de aplicação. |

## Resumo

Aplicações frontend no snapshot: 4 (react/mv-marketplace/apps/admin, react/mv-marketplace/apps/buyer, react/mv-marketplace/apps/payment, react/mv-marketplace/apps/seller).

## Notas

- A classificação registra `frontend_units: 5` (shell e quatro remotes). Esta revisão conta quatro linhas Yes; `react/mv-marketplace/apps/shell` ficou Undetermined pela regra de artefatos contraditórios. O `index.html` e o build do shell existem, mas `src/main.jsx:3` importa `./App.jsx`, e o snapshot só tem `src/app.jsx`. Num sistema de arquivos sensível à caixa, a entrada não resolve. A classificação já registra essa divergência como defeito de portabilidade (provável build em Windows) e não foi alterada. O Undetermined vale só para construir o shell sozinho; a composição é assunto da revisão de relações de composição (seção 3.4.5 do protocolo).
- Nenhum diretório tem Dockerfile, configuração de hospedagem ou workflow de CI no snapshot; `matches.csv` só tem a ocorrência `ws-workspaces` em `react/mv-marketplace/package.json:4`. A coluna Deploy fica `—` em todas as linhas.
- O remote `package` (`localhost:5005`), declarado em `react/mv-marketplace/apps/shell/vite.config.js:16` e nos remotes, não corresponde a nenhum diretório que sirva `remoteEntry.js`; `packages/mvp-theme` não configura federação. Não há unidade faltando no `units.csv`.

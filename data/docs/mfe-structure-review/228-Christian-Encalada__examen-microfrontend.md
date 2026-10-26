---
schema: 1
id: 1149061587
full_name: Christian-Encalada/examen-microfrontend
commit: 9456a399b086d78c65d167e0d08db5d2b8d31bb8
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 228 — Christian-Encalada/examen-microfrontend

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | index.html;module-federation.config.ts;package.json;rspack.config.ts | package.json | rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); rspack.config.ts:78-80 (`HtmlRspackPlugin` com `template: "./index.html"`); src/App.tsx:72-74 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | rspack.config.ts:15-92 + package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`) | — | — | Yes | Aplicação React (host) com entrada própria e build Rspack próprio. |
| alert-dashboard | alert-dashboard/index.html;alert-dashboard/module-federation.config.ts;alert-dashboard/package.json;alert-dashboard/rspack.config.ts | alert-dashboard/package.json | alert-dashboard/rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); alert-dashboard/rspack.config.ts:78-80 (`HtmlRspackPlugin` com `template: "./index.html"`); alert-dashboard/src/App.tsx:8-10 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | alert-dashboard/rspack.config.ts:15-92 + alert-dashboard/package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`) | — | — | Yes | Aplicação React com entrada própria e build Rspack próprio. |
| alert-sender | alert-sender/index.html;alert-sender/module-federation.config.ts;alert-sender/package.json;alert-sender/rspack.config.ts | alert-sender/package.json | alert-sender/rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); alert-sender/rspack.config.ts:78-80 (`HtmlRspackPlugin` com `template: "./index.html"`); alert-sender/src/App.tsx:8-10 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | alert-sender/rspack.config.ts:15-92 + alert-sender/package.json:5 (`"build": "cross-env NODE_ENV=production rspack build"`) | — | — | Yes | Aplicação React com entrada própria e build Rspack próprio. |

## Resumo

Aplicações frontend no snapshot: 3 (., alert-dashboard, alert-sender).

## Notas

- O N coincide com `frontend_units: 3` da classificação: o host na raiz e os remotos `alert-dashboard` e `alert-sender`, todos no snapshot.
- Os `package.json` e `tsconfig.json` aparecem como `workspace-config` no `artifacts.csv`, mas nenhum `package.json` declara `workspaces` (package.json:1-32, alert-sender/package.json:1-32, alert-dashboard/package.json:1-32). As únicas ocorrências `ws-*` do `matches.csv` são `ws-path-alias` em `tsconfig.json:15`, `alert-sender/tsconfig.json:15` e `alert-dashboard/tsconfig.json:15`, que apontam `"*"` para `./@mf-types/*` (tsconfig.json:15-17), não declaração de workspace. Não há ocorrências `ops-*` nem `ci-*`.
- Os remotos ficam dentro do diretório do host, mas não fazem parte dele: o build da raiz só parte de `./src/index.ts` (rspack.config.ts:17-19) e cada remoto tem `package.json`, lockfile, `rspack.config.ts` e porta próprios (rspack.config.ts:25, alert-sender/rspack.config.ts:25, alert-dashboard/rspack.config.ts:25: 3000/3001/3002), sem artefato de deploy no snapshot.

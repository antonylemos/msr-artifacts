---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 327 — samhoooo/module-federation-demo-mf2

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| header-app | header-app/package.json;header-app/rspack.config.js | header-app/package.json | header-app/rspack.config.js:7 (`entry: "./src/entry.ts"`, que carrega header-app/src/index.tsx:11-16 com `createRoot(...).render(<App … />)`); header-app/rspack.config.js:54-56 (`HtmlRspackPlugin` com `template: "./public/index.html"`) | header-app/rspack.config.js:6-81 (configuração Rspack, porta 4001 em :10); header-app/package.json:11 (`rspack build`) | — | — | Yes | Remote `HeaderApp` com entrada React e build Rspack próprios |
| home-app | home-app/package.json;home-app/rspack.config.js | home-app/package.json | home-app/rspack.config.js:6 (`entry: "./src/entry.ts"`, que carrega home-app/src/index.tsx:11-16 com `createRoot(...).render(<App />)`); home-app/rspack.config.js:43-45 (`HtmlRspackPlugin` com `template: "./public/index.html"`) | home-app/rspack.config.js:5-72 (configuração Rspack, porta 4000 em :9); home-app/package.json:11 (`rspack build`) | — | — | Yes | Host `HomeApp` com entrada React e build Rspack próprios |

## Resumo

Aplicações frontend no snapshot: 2 (header-app, home-app).

## Notas

- N = 2 coincide com `frontend_units: 2` da classificação.
- O `artifacts.csv` marca `package.json` e `tsconfig.json` dos dois apps como `workspace-config`, mas nenhum declara workspace (sem `workspaces`); a raiz não tem `package.json`, e o `package-lock.json` da raiz tem só `packages: {}`.
- O `matches.csv` não tem ocorrências `ci-*`; tem 1 `ws-path-alias` (`paths` de `home-app/tsconfig.json`, linha 15) e 1 `ops-cors` (`header-app/rspack.config.js`, linha 12). Não há Dockerfile, workflow nem configuração de hospedagem no snapshot.

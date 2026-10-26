---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 164 — horoshopodumaj/micro-frontends

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| host | host/index.html;host/module-federation.config.ts;host/package.json;host/rspack.config.ts | host/package.json | host/rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); host/rspack.config.ts:78-80 (`HtmlRspackPlugin` com `template: "./index.html"`); host/src/App.tsx:24-25 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | host/rspack.config.ts:15-92 + host/package.json:5 (`"build": "NODE_ENV=production rspack build"`) | — | — | Yes | Aplicação React com entrada própria e build Rspack próprio. |
| remote | remote/index.html;remote/module-federation.config.ts;remote/package.json;remote/rspack.config.ts | remote/package.json | remote/rspack.config.ts:17-19 (`entry: { main: "./src/index.ts" }`); remote/rspack.config.ts:78-80 (`HtmlRspackPlugin` com `template: "./index.html"`); remote/src/App.tsx:13-14 (`ReactDOM.createRoot(...)`, `root.render(<App />)`) | remote/rspack.config.ts:15-92 + remote/package.json:5 (`"build": "NODE_ENV=production rspack build"`) | — | — | Yes | Aplicação React com entrada própria e build Rspack próprio. |
| vue-remote | vue-remote/index.html;vue-remote/module-federation.config.ts;vue-remote/package.json;vue-remote/rspack.config.ts | vue-remote/package.json | vue-remote/rspack.config.ts:16-18 (`entry: { main: "./src/index.ts" }`); vue-remote/rspack.config.ts:79-81 (`HtmlRspackPlugin` com `template: "./index.html"`); vue-remote/src/bootloader.ts:8 (`createApp(App).mount("#app")`) | vue-remote/rspack.config.ts:14-92 + vue-remote/package.json:5 (`"build": "NODE_ENV=production rspack build"`) | — | — | Yes | Aplicação Vue com entrada própria e build Rspack próprio. |

## Resumo

Aplicações frontend no snapshot: 3 (host, remote, vue-remote).

## Notas

- O N coincide com `frontend_units: 3` da classificação: host, remote e vue-remote, todos no snapshot.
- Os `package.json` e `tsconfig.json` aparecem como `workspace-config` no `artifacts.csv`, mas nenhum `package.json` declara `workspaces` (host/package.json:1-29, remote/package.json:1-29, vue-remote/package.json:1-28); não há manifesto na raiz. As únicas ocorrências `ws-*` do `matches.csv` são `ws-path-alias` em `*/tsconfig.json:15`, que apontam `"*"` para `./@mf-types/*` (host/tsconfig.json:15-17), não declaração de workspace. Não há ocorrências `ops-*` nem `ci-*`.
- Cada projeto tem lockfile próprio (`package-lock.json`) e porta própria de desenvolvimento (host/rspack.config.ts:25, remote/rspack.config.ts:25, vue-remote/rspack.config.ts:24: 3000/3001/3002), sem artefato de deploy no snapshot.

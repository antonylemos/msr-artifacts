---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 324 — lmedhub/zephyr-microfrontends

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| frontend | frontend/index.html;frontend/package.json | frontend/package.json | — | — | — | — | No | Raiz que agrega as apps: `frontend/index.html` não carrega script e não é usado por nenhum build, e os scripts `build:*` (frontend/package.json:12-16) só entram em `apps/*` |
| frontend/apps/host | frontend/apps/host/package.json;frontend/apps/host/rspack.config.ts | frontend/apps/host/package.json | frontend/apps/host/rspack.config.ts:9-10 (`entry` `main: "./src/App.tsx"`); frontend/apps/host/rspack.config.ts:102-103 (`HtmlRspackPlugin` com `template: "./index.html"`) | frontend/apps/host/rspack.config.ts + frontend/apps/host/package.json:9 (`rspack build`) | — | frontend/apps/host/rspack.config.ts:5-7 (`withZephyr()` envolve a configuração, publicação no Zephyr Cloud) | Yes | Host React com entrada e build Rspack próprios |
| frontend/apps/remote-footer | frontend/apps/remote-footer/package.json;frontend/apps/remote-footer/rspack.config.ts | frontend/apps/remote-footer/package.json | frontend/apps/remote-footer/rspack.config.ts:9-10 (`entry` `main: "./src/index.tsx"`); frontend/apps/remote-footer/rspack.config.ts:89-90 (`HtmlRspackPlugin` com `template: "./index.html"`) | frontend/apps/remote-footer/rspack.config.ts + frontend/apps/remote-footer/package.json:5 (`rspack build`) | — | frontend/apps/remote-footer/rspack.config.ts:5-7 (`withZephyr()` envolve a configuração, publicação no Zephyr Cloud) | Yes | Remote React com entrada que monta a UI e build Rspack próprio |
| frontend/apps/remote-header | frontend/apps/remote-header/package.json;frontend/apps/remote-header/rspack.config.ts | frontend/apps/remote-header/package.json | frontend/apps/remote-header/rspack.config.ts:9-10 (`entry` `main: "./src/index.tsx"`); frontend/apps/remote-header/rspack.config.ts:89-90 (`HtmlRspackPlugin` com `template: "./index.html"`) | frontend/apps/remote-header/rspack.config.ts + frontend/apps/remote-header/package.json:5 (`rspack build`) | — | frontend/apps/remote-header/rspack.config.ts:5-7 (`withZephyr()` envolve a configuração, publicação no Zephyr Cloud) | Yes | Remote React com entrada que monta a UI e build Rspack próprio |
| frontend/apps/url-shortener | frontend/apps/url-shortener/package.json;frontend/apps/url-shortener/rspack.config.ts | frontend/apps/url-shortener/package.json | frontend/apps/url-shortener/rspack.config.ts:7-8 (`entry` `main: "./src/index.ts"`); frontend/apps/url-shortener/rspack.config.ts:96-97 (`HtmlRspackPlugin` com `template: "./index.html"`) | frontend/apps/url-shortener/rspack.config.ts + frontend/apps/url-shortener/package.json:5 (`rspack build`) | — | frontend/apps/url-shortener/rspack.config.ts:3-5 (`withZephyr()` envolve a configuração, publicação no Zephyr Cloud) | Yes | Remote Vue 3 com entrada que monta a UI (`app.mount("#app")`) e build Rspack próprio |

## Resumo

Aplicações frontend no snapshot: 4 (frontend/apps/host, frontend/apps/remote-footer, frontend/apps/remote-header, frontend/apps/url-shortener).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação.
- Sem workspace: `frontend/package.json` não tem `workspaces`; cada app é instalada à parte pelo script `install:all` (frontend/package.json:6). As marcas `workspace-config` do `artifacts.csv` (manifestos e `frontend/tsconfig.json`) não trazem declaração de workspace, e o `matches.csv` tem só 1 ocorrência `ws-*`, um `ws-path-alias` (`paths` de `frontend/tsconfig.json`, linha 15), que não é declaração de workspace.
- O `matches.csv` não tem ocorrências `ci-*`; tem 11 `ops-*` (4 `ops-compose-service`, 3 `ops-cors`, 2 `ops-deployment-file`, 2 `ops-dockerfile`). O único Dockerfile (`backend/Dockerfile`, usado por `backend/docker-compose.yml:5-7`) é do backend Go, fora das unidades. A coluna Deploy registra o `withZephyr()` de cada `rspack.config.ts`, plugin de build que publica o artefato de cada app no Zephyr Cloud; não há outro artefato de deploy por app.
- No host, a entrada do build é `src/App.tsx` (frontend/apps/host/rspack.config.ts:10), que monta a UI em frontend/apps/host/src/App.tsx:27-28; `src/index.ts` (`import("./App")`) não é referenciado pelo build.

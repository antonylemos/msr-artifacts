---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| main-vue3 | main-vue3/index.html;main-vue3/package.json;main-vue3/vite.config.ts | main-vue3/package.json:1-24 (manifesto próprio) | main-vue3/index.html:10-11 (`<div id="app">` e `<script type="module" src="/src/main.ts">`, entrada Vite); main-vue3/src/main.ts:6-7 e main-vue3/src/main.ts:38 (cria e monta o app Vue 3) | main-vue3/vite.config.ts:6-17 (configuração própria) + main-vue3/package.json:8 (`"build": "vue-tsc -b && vite build"`) | — | — | Yes | Host Vue 3 com entrada HTML própria e build Vite próprio. |
| sub-vue2 | sub-vue2/package.json | sub-vue2/package.json:1-44 (manifesto próprio) | sub-vue2/src/main.js:10-17 e sub-vue2/src/main.js:27-29 (entrada `src/main.js` da convenção do Vue CLI; monta o app Vue 2 fora do qiankun); sub-vue2/public/index.html:17 (`<div id="app">`, template HTML do Vue CLI) | sub-vue2/vue.config.js:3-23 (`defineConfig` com `configureWebpack`) + sub-vue2/package.json:7 (`"build": "vue-cli-service build"`) | — | — | Yes | Sub-app Vue 2 com entrada própria e build `vue-cli-service` próprio. |

## Resumo

Aplicações frontend no snapshot: 2 (main-vue3, sub-vue2).

## Notas

- A classificação registra `frontend_units: 3`; a terceira unidade, `sub-react16` (`main-vue3/src/main.ts:17-22`, `entry: '//localhost:3000'`), não tem código no snapshot e por isso não é linha.
- Não há `package.json` na raiz; os `package.json` marcados como `workspace-config` no `artifacts.csv` não têm campo `workspaces`.
- A única ocorrência `ops-*` do `matches.csv` é `ops-cors` em `main-vue3/vite.config.ts:10` (`cors: true` do servidor de desenvolvimento), que não é artefato de deploy. Não há Dockerfile, CI nem configuração de hospedagem no snapshot.

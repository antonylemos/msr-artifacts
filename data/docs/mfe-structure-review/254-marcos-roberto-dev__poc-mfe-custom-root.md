---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Workspace

Nenhuma declaração de workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| content-app | content-app/index.html;content-app/package.json;content-app/vite.config.ts | content-app/package.json | content-app/index.html:11 (`<script type="module" src="/src/main.ts">`, entrada do Vite); content-app/src/main.ts:8-22 (`singleSpaVue({ createApp, appOptions: { render() { return h(App) } } })` e lifecycles exportados) | content-app/vite.config.ts:1-7 + content-app/package.json:8 (`"build": "vue-tsc -b && vite build"`) | — | — | Yes | Aplicação Vue single-spa com entrada própria e build Vite próprio. |
| root-app | root-app/index.html;root-app/package.json;root-app/vite.config.ts | root-app/package.json | root-app/index.html:43 (`<script type="module" src="/src/main.ts">`, entrada do Vite); root-app/src/main.ts:5 (`createApp(App).mount('#app')`) | root-app/vite.config.ts:1-7 + root-app/package.json:8 (`"build": "vue-tsc -b && vite build"`) | — | — | Yes | Host Vue com entrada própria e build Vite próprio. |
| root-classic | root-classic/package.json;root-classic/webpack.config.js | root-classic/package.json | root-classic/webpack.config.js:7-9 (`singleSpaDefaults({ orgName, projectName: "root-config", ... })`, entrada `src/org-root-config.ts` pela convenção do `webpack-config-single-spa-ts`); root-classic/webpack.config.js:18-20 (`HtmlWebpackPlugin` com `template: "src/index.ejs"`); root-classic/src/org-root-config.ts:9-20 (registra as aplicações, ativa o layout e chama `start()`) | root-classic/webpack.config.js:1-28 + root-classic/package.json:10-11 (`"build": "concurrently npm:build:*"`, `"build:webpack": "webpack --mode=production"`) | — | — | Yes | Root config single-spa com entrada própria e build webpack próprio. |
| topbar-app | topbar-app/index.html;topbar-app/package.json;topbar-app/vite.config.ts | topbar-app/package.json | topbar-app/index.html:11 (`<script type="module" src="/src/main.ts">`, entrada do Vite); topbar-app/vite.config.ts:10 (`input: 'src/main.ts'`); topbar-app/src/main.ts:8-22 (`singleSpaVue(...)` e lifecycles exportados) | topbar-app/vite.config.ts:8-19 (`rollupOptions` com `format: "system"` e `entryFileNames: 'app.js'`) + topbar-app/package.json:8 (`"build": "vue-tsc -b && vite build"`) | — | — | Yes | Aplicação Vue single-spa com entrada própria e build Vite próprio. |

## Resumo

Aplicações frontend no snapshot: 4 (content-app, root-app, root-classic, topbar-app).

## Notas

- A contagem coincide com `frontend_units: 4` da classificação (dois hosts alternativos e dois remotos).
- Não há `package.json` na raiz; os `package.json` e `tsconfig*.json` marcados como `workspace-config` no `artifacts.csv` não declaram `workspaces` nem projetos, e não há ocorrências `ws-*`, `ops-*` ou `ci-*` no `matches.csv`. Não há Dockerfile, CI nem configuração de hospedagem no snapshot; `root-classic/.husky/pre-commit:4` só roda formatação, testes e lint.
- Nos remotos, `content-app/src/main.ts:6` e `topbar-app/src/main.ts:6` deixam `createApp(App).mount('#app')` comentado: a entrada exporta só os lifecycles e não monta a UI sozinha. A entrada inicia a UI quando um host chama `mount`, como nos remotos single-spa de outras revisões.
- `root-app/src/modules/Topbar/` tem uma cópia do topbar sem `package.json` nem build e não está no `units.csv`; o import dela está comentado (`root-app/src/App.vue:3` e `7`). Faz parte do `root-app` e não falta como unidade.

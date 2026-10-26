---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Workspace

`pnpm-workspace.yaml:1-3` declara os pacotes `apps/*` e `packages/*` (pnpm workspaces); `turbo.json:3-18` define as tasks do Turborepo sobre esse workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-52 (manifesto da raiz, só devDependencies de tooling) | — | package.json:19 (`turbo run build`, só delega aos pacotes do workspace) | — | — | No | Raiz do workspace pnpm, sem entrada nem configuração de build próprias. |
| apps/mfe-vue2-admin | apps/mfe-vue2-admin/package.json;apps/mfe-vue2-admin/webpack.config.js | apps/mfe-vue2-admin/package.json:1-32 (manifesto próprio) | apps/mfe-vue2-admin/webpack.config.js:9 (`entry: './src/index.js'`); apps/mfe-vue2-admin/src/index.js:1-8 (`import('./bootstrap')` e `mount` em `#mfe-app`); apps/mfe-vue2-admin/src/bootstrap.js:32-38 (`new Vue(...)` com `h(App)` e `.$mount(el)`); apps/mfe-vue2-admin/webpack.config.js:52-54 (`HtmlWebpackPlugin` com `./public/index.html`) | apps/mfe-vue2-admin/webpack.config.js:8-79 (configuração webpack própria, `ModuleFederationPlugin` `mfe_admin` em :64-71, porta 3002 em :75); apps/mfe-vue2-admin/package.json:7 (`webpack --config webpack.config.js --mode production`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Remote Vue 2 com entrada que monta a UI e build webpack próprios. |
| apps/mfe-vue2-checkout | apps/mfe-vue2-checkout/package.json;apps/mfe-vue2-checkout/webpack.config.js | apps/mfe-vue2-checkout/package.json:1-33 (manifesto próprio) | apps/mfe-vue2-checkout/webpack.config.js:9 (`entry: './src/index.js'`); apps/mfe-vue2-checkout/src/index.js:5-18 (`import('./bootstrap')` e `mount` em `#mfe-app`); apps/mfe-vue2-checkout/src/bootstrap.js:40-46 (`new Vue(...)` com `h(App)` e `.$mount(el)`); apps/mfe-vue2-checkout/webpack.config.js:54-58 (`HtmlWebpackPlugin` com `./public/index.html`) | apps/mfe-vue2-checkout/webpack.config.js:8-81 (configuração webpack própria, `ModuleFederationPlugin` `mfe_checkout` em :66-73, porta 3001 em :77); apps/mfe-vue2-checkout/package.json:7 (`webpack --config webpack.config.js --mode production`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Remote Vue 2 com entrada que monta a UI e build webpack próprios. |
| apps/mfe-vue3-dashboard | apps/mfe-vue3-dashboard/package.json;apps/mfe-vue3-dashboard/webpack.config.js | apps/mfe-vue3-dashboard/package.json:1-32 (manifesto próprio) | apps/mfe-vue3-dashboard/webpack.config.js:8 (`entry: './src/index.js'`); apps/mfe-vue3-dashboard/src/index.js:1-8 (`import('./bootstrap')` e `mount` em `#mfe-app`); apps/mfe-vue3-dashboard/src/bootstrap.js:31-33 (`createApp(App, ...)` e `app.mount(el)`); apps/mfe-vue3-dashboard/webpack.config.js:47-49 (`HtmlWebpackPlugin` com `./public/index.html`) | apps/mfe-vue3-dashboard/webpack.config.js:7-69 (configuração webpack própria, `ModuleFederationPlugin` `mfe_dashboard` em :53-61, porta 3004 em :65); apps/mfe-vue3-dashboard/package.json:7 (`webpack --config webpack.config.js --mode production`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Remote Vue 3 com entrada que monta a UI e build webpack próprios. |
| apps/mfe-vue3-profile | apps/mfe-vue3-profile/package.json;apps/mfe-vue3-profile/webpack.config.js | apps/mfe-vue3-profile/package.json:1-32 (manifesto próprio) | apps/mfe-vue3-profile/webpack.config.js:8 (`entry: './src/index.js'`); apps/mfe-vue3-profile/src/index.js:1-8 (`import('./bootstrap')` e `mount` em `#mfe-app`); apps/mfe-vue3-profile/src/bootstrap.js:38-40 (`createApp(App, ...)` e `app.mount(el)`); apps/mfe-vue3-profile/webpack.config.js:47-49 (`HtmlWebpackPlugin` com `./public/index.html`) | apps/mfe-vue3-profile/webpack.config.js:7-69 (configuração webpack própria, `ModuleFederationPlugin` `mfe_profile` em :53-61, porta 3003 em :65); apps/mfe-vue3-profile/package.json:7 (`webpack --config webpack.config.js --mode production`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Remote Vue 3 com entrada que monta a UI e build webpack próprios. |
| apps/shell | apps/shell/package.json | apps/shell/package.json:1-35 (manifesto próprio) | apps/shell/app.vue:1-5 (raiz Nuxt com `<NuxtPage />`, convenção do Nuxt); páginas por rota em apps/shell/pages/index.vue:1-3 e apps/shell/pages/app/[...mfe].vue:2-3 | apps/shell/nuxt.config.ts:58-91 (`defineNuxtConfig` com `ssr: true` e módulos); apps/shell/package.json:7 (`nuxt build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Host Nuxt 3 com entrada por convenção e build Nuxt próprios. |
| packages/shared | packages/shared/package.json | packages/shared/package.json:1-11 (manifesto próprio) | — (packages/shared/package.json:5-10 exporta `./src/index.ts`, `./auth` e `./types`, sem entrada de aplicação) | — | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Pacote compartilhado de tipos, eventos de autenticação e registro, sem entrada de aplicação. |
| scripts | scripts/webpack.aliases.js | — | — | — | — | — | No | Utilitários de build e de desenvolvimento (aliases webpack, servidor de dist, health check), não é frontend. |

## Resumo

Aplicações frontend no snapshot: 5 (apps/mfe-vue2-admin, apps/mfe-vue2-checkout, apps/mfe-vue3-dashboard, apps/mfe-vue3-profile, apps/shell).

## Notas

- A contagem coincide com `frontend_units: 5` da classificação (shell mais quatro remotes); não há unidade fora do snapshot.
- `scripts/webpack.aliases.js:13-17` é importado pelos quatro `webpack.config.js` (por exemplo, apps/mfe-vue2-checkout/webpack.config.js:4); a marcação de `scripts` como candidato vem desse arquivo de configuração auxiliar.
- Deploy: não há Dockerfile, workflow de CI nem configuração de hospedagem no snapshot. As ocorrências `ops-cors` (por exemplo, apps/mfe-vue2-checkout/webpack.config.js:79) estão no `devServer`, e os scripts de package.json:26-29 servem cada `dist` localmente com scripts/dev-remote-server.js; nenhum deles é artefato de deploy separado.
- A entrada `src/index.js` dos remotes é a execução standalone de desenvolvimento (apps/mfe-vue2-checkout/src/index.js:1-3); o shell carrega `./App` → `src/bootstrap.js` exposto pelo `ModuleFederationPlugin`. As duas passam pelo mesmo `mount` que inicia a UI.

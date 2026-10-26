---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Workspace

`pnpm-workspace.yaml:1-3` declara os pacotes `apps/*` e `packages/*` (pnpm workspaces); `turbo.json:3-13` define as tasks `dev`, `build` e `lint` do Turborepo sobre esse workspace.

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json:1-20 (manifesto da raiz, só devDependencies `concurrently` e `turbo`) | — | package.json:8 (`turbo build`, só delega aos pacotes do workspace) | — | — | No | Raiz do workspace pnpm, sem entrada nem configuração de build próprias. |
| apps/cms | apps/cms/package.json;apps/cms/vite.config.ts | apps/cms/package.json:1-26 (manifesto próprio) | apps/cms/index.html:10-11 (`<div id="app">` e `<script type="module" src="/src/main.ts">`); apps/cms/src/main.ts:3-5 (`createApp(App).mount('#app')`) | apps/cms/vite.config.ts:6-32 (configuração Vite própria, `federation` `cms_app` em :16-23, porta 5002 em :8 e :12); apps/cms/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Remote Vue 3 com entrada que monta a UI e build Vite próprios. |
| apps/dashboard | apps/dashboard/package.json;apps/dashboard/vite.config.ts | apps/dashboard/package.json:1-26 (manifesto próprio) | apps/dashboard/index.html:10-11 (`<div id="app">` e `<script type="module" src="/src/main.ts">`); apps/dashboard/src/main.ts:3-5 (`createApp(App).mount('#app')`) | apps/dashboard/vite.config.ts:6-34 (configuração Vite própria, `federation` `dashboard_app` em :18-25, porta 5001 em :8 e :14); apps/dashboard/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Remote Vue 3 com entrada que monta a UI e build Vite próprios. |
| apps/kanban | apps/kanban/package.json;apps/kanban/vite.config.ts | apps/kanban/package.json:1-26 (manifesto próprio) | apps/kanban/index.html:10-11 (`<div id="app">` e `<script type="module" src="/src/main.ts">`); apps/kanban/src/main.ts:3-5 (`createApp(App).mount('#app')`) | apps/kanban/vite.config.ts:6-32 (configuração Vite própria, `federation` `kanban_app` em :16-23, porta 5003 em :8 e :12); apps/kanban/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Remote Vue 3 com entrada que monta a UI e build Vite próprios. |
| apps/shell | apps/shell/package.json;apps/shell/vite.config.ts | apps/shell/package.json:1-26 (manifesto próprio) | apps/shell/index.html:10-11 (`<div id="app">` e `<script type="module" src="/src/main.ts">`); apps/shell/src/main.ts:3-5 (`createApp(App).mount('#app')`) | apps/shell/vite.config.ts:7-35 (configuração Vite própria, `federation` `shell` com `remotes` em :19-27, porta 5000 em :9 e :13); apps/shell/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`apps/*`) | — | Yes | Host Vue 3 com entrada que monta a UI e build Vite próprios. |
| packages/ui-kit | packages/ui-kit/package.json | packages/ui-kit/package.json:1-21 (manifesto próprio, `@repo/ui-kit`) | — (packages/ui-kit/src/index.ts:1-4 só exporta `MyButton` e `setupMsg`, sem entrada de aplicação) | — (packages/ui-kit/package.json:5-7 só tem o script `lint`) | pnpm-workspace.yaml:3 (`packages/*`) | — | No | Biblioteca compartilhada de componentes, sem entrada de aplicação nem build. |

## Resumo

Aplicações frontend no snapshot: 4 (apps/cms, apps/dashboard, apps/kanban, apps/shell).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação.
- A única ocorrência `ops-*` do `matches.csv` é `ops-cors` em `apps/dashboard/vite.config.ts:10` (`cors: true` do servidor de desenvolvimento), que não é artefato de deploy. Não há Dockerfile, workflow de CI nem configuração de hospedagem no snapshot.
- `packages/ui-kit/package.json:4` declara `"main": "index.ts"`, arquivo ausente na raiz do pacote; o shell importa pelo caminho `@repo/ui-kit/src/index.ts` (`apps/shell/src/App.vue:3`). Não muda a resposta da linha, que já é `No`.

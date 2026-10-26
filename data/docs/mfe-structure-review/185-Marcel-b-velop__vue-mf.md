---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 185 — Marcel-b-velop/vue-mf

## Workspace

`pnpm-workspace.yaml:1-5` (`packages`: `lib`, `app-1`, `app-2`, `host`).

## Unidades

| Diretório | Marcadores | Manifesto | Entrada | Build | Workspace | Deploy | Unidade frontend | Motivo |
|---|---|---|---|---|---|---|---|---|
| . | package.json | package.json | — | — | — | — | No | Raiz do workspace pnpm: `package.json:8` (`pnpm -r run build`) só delega aos membros, sem entrada nem configuração de build próprias |
| app-1 | app-1/index.html;app-1/package.json;app-1/vite.config.ts | app-1/package.json | app-1/index.html:11 (`<script type="module" src="/src/main.ts">`); app-1/src/main.ts:13-21 (`createApp(App)` ... `app.mount("#app")`) | app-1/vite.config.ts:7-44; app-1/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:3 (`'app-1'`) | — | Yes | Aplicação Vue com `index.html` e build Vite próprios (remoto `remote-app1`) |
| app-2 | app-2/index.html;app-2/package.json;app-2/vite.config.ts | app-2/package.json | app-2/index.html:11 (`<script type="module" src="/src/main.ts">`); app-2/src/main.ts:33-37 (`createApp(App)` ... `app.mount("#app")`) | app-2/vite.config.ts:7-48; app-2/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:4 (`'app-2'`) | — | Yes | Aplicação Vue com `index.html`, router próprio em modo standalone e build Vite próprio (remoto `remote-app2`) |
| host | host/index.html;host/package.json;host/vite.config.ts | host/package.json | host/index.html:10 (`<script type="module" src="/src/main.ts">`); host/src/main.ts:17-40 (`createApp(App)` ... `app.mount("#app")`) | host/vite.config.ts:7-50; host/package.json:8 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:5 (`'host'`) | — | Yes | Aplicação Vue host com `index.html` e build Vite próprios |
| lib | lib/index.html;lib/package.json;lib/vite.config.ts | lib/package.json | lib/index.html:11 (`<script type="module" src="/src/main.ts">`); lib/src/main.ts:10-14 (`createApp(App)` ... `app.mount("#app")`) | lib/vite.config.ts:8-59; lib/package.json:11 (`vue-tsc -b && vite build`) | pnpm-workspace.yaml:2 (`'lib'`) | — | Yes | Tem `index.html` que monta um `App.vue` de demonstração e build Vite próprio (remoto `remote-lib`) |

## Resumo

Aplicações frontend no snapshot: 4 (app-1, app-2, host, lib).

## Notas

- N = 4 coincide com `frontend_units: 4` da classificação (host, app-1, app-2, lib).
- `lib` expõe sobretudo componentes e serviços compartilhados (`lib/vite.config.ts:21-25`: `./Confirm`, `./apiClient`, `./types`), mas tem entrada própria que inicia uma UI (`lib/src/App.vue` abre o diálogo `Confirm`) e build próprio; por isso não cai em "biblioteca sem entrada de aplicação".
- O `matches.csv` tem 1 `ws-workspaces` (pnpm-workspace.yaml:1, o workspace da seção Workspace), 8 `ops-cors` (por exemplo app-1/vite.config.ts:37) e 1 `ci-workflow-file` (.github/workflows/node.js.yml). O único workflow, `.github/workflows/node.js.yml:20-23`, roda `pnpm install` e `pnpm build` do workspace inteiro, não de um diretório; não há Dockerfile nem configuração de hospedagem no snapshot.
- `Api/` (.NET) não está no `units.csv` e não é frontend.

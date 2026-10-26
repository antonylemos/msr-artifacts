---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Leitura do repositório

Demonstração de Module Federation com Vue 3 e Vite (`@originjs/vite-plugin-federation`), num monorepo pnpm + Turborepo (README.mkd:1-9; package.json:6-10). `apps/shell` é o host. Ele declara três remotes, `dashboard`, `cms` e `kanban`, com URLs `http://localhost:500N/assets/remoteEntry.js` (apps/shell/vite.config.ts:19-27). Cada remote gera um `remoteEntry.js` e expõe um componente: `./Widget` em apps/dashboard (apps/dashboard/vite.config.ts:18-25), `./Cms` em apps/cms (apps/cms/vite.config.ts:16-23) e `./Kanban` em apps/kanban (apps/kanban/vite.config.ts:16-23). Os quatro compartilham `vue`.

Só uma das três ligações chega ao código. O componente raiz do shell carrega `dashboard/Widget` com `defineAsyncComponent` (apps/shell/src/App.vue:5-7) e o renderiza dentro de `<Suspense>`, com o fallback "Cargando microfrontend..." (apps/shell/src/App.vue:21-28). Nenhum código do shell importa `cms/...` ou `kanban/...`, então esses dois remotes ficam só declarados na configuração; as suas exposições não têm consumidor. O README diz que as aplicações compartilham "diseño, lógica y estado" (README.mkd:5), mas não há troca de mensagens nem estado compartilhado entre as unidades no snapshot. O que o shell compartilha de fato é a biblioteca `packages/ui-kit`, importada por caminho de workspace (apps/shell/src/App.vue:3, :14-15). Ela não é unidade na revisão estrutural, então não entra como relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/shell | apps/dashboard | host → remote | origem → destino | module-federation | Yes | Yes | apps/shell/vite.config.ts:22 (remote `dashboard` em `http://localhost:5001/assets/remoteEntry.js`); apps/dashboard/vite.config.ts:19-23 (`name: "dashboard_app"`, `filename: "remoteEntry.js"`, expõe `./Widget`); apps/dashboard/vite.config.ts:8 (porta 5001) | apps/shell/src/App.vue:6; apps/shell/src/App.vue:23 |
| 2 | apps/shell | apps/cms | host → remote | origem → destino | module-federation | Yes | No | apps/shell/vite.config.ts:23 (remote `cms` em `http://localhost:5002/assets/remoteEntry.js`); apps/cms/vite.config.ts:17-21 (`name: "cms_app"`, `filename: "remoteEntry.js"`, expõe `./Cms`); apps/cms/vite.config.ts:8 (porta 5002) | — |
| 3 | apps/shell | apps/kanban | host → remote | origem → destino | module-federation | Yes | No | apps/shell/vite.config.ts:24 (remote `kanban` em `http://localhost:5003/assets/remoteEntry.js`); apps/kanban/vite.config.ts:17-21 (`name: "kanban_app"`, `filename: "remoteEntry.js"`, expõe `./Kanban`); apps/kanban/vite.config.ts:8 (porta 5003) | — |

## Observações

**1. apps/shell → apps/dashboard.** O especificador `dashboard/Widget` (apps/shell/src/App.vue:6) usa a chave do remote declarado em apps/shell/vite.config.ts:22. A chave não é igual ao `name: "dashboard_app"` do remote (apps/dashboard/vite.config.ts:19). A correspondência vem do arquivo pedido, o `remoteEntry.js` declarado em apps/dashboard/vite.config.ts:20, e do módulo `./Widget`, que é o exposto (apps/dashboard/vite.config.ts:21-23, `./src/components/WidgetDinero.vue`). A porta 5001 (apps/dashboard/vite.config.ts:8) só corrobora. O servidor de desenvolvimento do dashboard também aponta para o shell como origem (`origin: "http://localhost:5000"`, apps/dashboard/vite.config.ts:11). As duas construções são `Yes`: o `App.vue` com o `<DashboardWidget />` (apps/shell/src/App.vue:23) é o componente raiz montado pela entrada do shell (apps/shell/src/main.ts:3-5). O shell declara o tipo do módulo remoto à mão (apps/shell/src/vite-env.d.ts:3-7). O widget exposto só tem estado local, um contador de saldo (apps/dashboard/src/components/WidgetDinero.vue:1-19).

**2. apps/shell → apps/cms.** O remote `cms` (apps/shell/vite.config.ts:23) corresponde a apps/cms pelo `remoteEntry.js` declarado em apps/cms/vite.config.ts:18. A chave `cms` também é o nome do diretório, e o `name` do remote é `cms_app` (apps/cms/vite.config.ts:17). A porta 5002 (apps/cms/vite.config.ts:8) só corrobora. Não há código que importe `cms/Cms`, então a relação existe só na configuração (Ativa `No`). O módulo exposto é o `App.vue` inteiro do remote (apps/cms/vite.config.ts:20).

**3. apps/shell → apps/kanban.** Mesmo caso da relação 2. O remote `kanban` (apps/shell/vite.config.ts:24) corresponde a apps/kanban pelo `remoteEntry.js` (apps/kanban/vite.config.ts:18), com a chave igual ao nome do diretório e `name: "kanban_app"` (apps/kanban/vite.config.ts:17). A porta 5003 (apps/kanban/vite.config.ts:8) só corrobora. A exposição `./Kanban` (apps/kanban/vite.config.ts:20) não tem consumidor no código, então a relação é Ativa `No`.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

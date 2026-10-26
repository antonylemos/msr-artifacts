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

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-remote-import | apps/shell/src/App.vue:6 | apps/shell | dynamic-loading | Yes | `defineAsyncComponent(() => import('dashboard/Widget'))` (apps/shell/src/App.vue:5-7, `defineAsyncComponent` importado de `vue` em :2) carrega em runtime o `./Widget` exposto pela unidade apps/dashboard (`./src/components/WidgetDinero.vue`, apps/dashboard/vite.config.ts:21-23), pelo remote `dashboard` → `http://localhost:5001/assets/remoteEntry.js` (apps/shell/vite.config.ts:22); tipo declarado em apps/shell/src/vite-env.d.ts:3-7. Ativo: `App.vue` é montado pela entrada do shell (apps/shell/src/main.ts:3-5, apps/shell/index.html:11) e renderiza o componente em :23. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | apps/shell/src/App.vue:23 | apps/shell | runtime-composition | Yes | `<DashboardWidget />` renderiza no host o `Widget` de apps/dashboard, carregado por `defineAsyncComponent` em apps/shell/src/App.vue:5-7, dentro de `<Suspense>` com fallback "Cargando microfrontend..." (apps/shell/src/App.vue:21-28); `App.vue` é o componente raiz montado em apps/shell/src/main.ts:5. |

## Resumo

Construções com composição: 2 (dynamic-loading: 1, runtime-composition: 1).

## Notas

- Os remotes `cms` e `kanban` são declarados no shell (apps/shell/vite.config.ts:23-24) e apps/cms e apps/kanban expõem `./Cms` e `./Kanban` (apps/cms/vite.config.ts:19-21, apps/kanban/vite.config.ts:19-21), mas nenhum código do shell importa `cms/...` nem `kanban/...`: o único `import()` do snapshot é o de apps/shell/src/App.vue:6.
- A busca do passo 4 (`*.ts`, `*.vue`, `*.html`, `*.js`) não achou `customElements`, `<iframe>`, `postMessage`, `CustomEvent`, `BroadcastChannel`, `dispatchEvent`, `addEventListener` nem carga de script; os remotes não têm código de comunicação (apps/cms/src/App.vue, apps/kanban/src/App.vue e apps/dashboard/src/components/WidgetDinero.vue só têm template e estado local).
- O shell também usa `MyButton` e `setupMsg` de packages/ui-kit (apps/shell/src/App.vue:3, :14-15), por import estático de workspace; packages/ui-kit é `No` na revisão estrutural, então não é composição entre unidades.

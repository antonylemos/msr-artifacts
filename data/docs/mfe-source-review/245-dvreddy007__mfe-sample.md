---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 245 — dvreddy007/mfe-sample

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-load-remote | packages/host/src/components/Loader.vue:70 | packages/host | remote-resolution | Yes | Chama `useModuleFederation().loadRemote` (packages/host/src/plugins/federationPlugin.js:27-35) com o nome do remote da rota (`app1` ou `app2`, packages/host/src/routeManifest.js:4 e :17); Loader.vue é o componente de todas as rotas em packages/host/src/router/index.js:5-12, router instalado em packages/host/src/main.js:13 e renderizado por `<RouterView />` em packages/host/src/App.vue:8. |
| src-load-remote | packages/host/src/components/Loader.vue:96 | packages/host | remote-resolution | Yes | Chama a função local `loadRemote` (packages/host/src/components/Loader.vue:63-84), que resolve e monta o remote da rota atual; disparada por `initializeRemote` no `onMounted` e na troca de rota (packages/host/src/components/Loader.vue:100-108). Alvos: packages/app-1 e packages/app-2. |
| src-load-remote | packages/host/src/plugins/federationPlugin.js:29 | packages/host | remote-resolution | Yes | `loadRemote` de `@module-federation/runtime` (importado como `_loadRemote` em packages/host/src/plugins/federationPlugin.js:1) resolve `<remote>/entry`, exposto por packages/app-1/vite.config.js:10-14 e packages/app-2/vite.config.js:10-14; usado em packages/host/src/components/Loader.vue:70. |
| src-mount-export | packages/app-1/src/entry.js:6 | packages/app-1 | runtime-composition | Yes | Exporta `mount(container)` (packages/app-1/src/entry.js:6-18), exposto como `./entry` em packages/app-1/vite.config.js:12-14 e chamado pelo host em packages/host/src/components/Loader.vue:74. |
| src-mount-export | packages/app-1/src/entry.js:20 | packages/app-1 | runtime-composition | Yes | Exporta `unmount()` (packages/app-1/src/entry.js:20-25), chamado pelo host antes de montar outro remote em packages/host/src/components/Loader.vue:66. |
| src-mount-export | packages/app-2/src/entry.js:6 | packages/app-2 | runtime-composition | Yes | Exporta `mount(container)` (packages/app-2/src/entry.js:6-18), exposto como `./entry` em packages/app-2/vite.config.js:12-14 e chamado pelo host em packages/host/src/components/Loader.vue:74. |
| src-mount-export | packages/app-2/src/entry.js:20 | packages/app-2 | runtime-composition | Yes | Exporta `unmount()` (packages/app-2/src/entry.js:20-25), chamado pelo host antes de montar outro remote em packages/host/src/components/Loader.vue:66. |
| src-mount-call | packages/app-1/src/entry.js:13 | packages/app-1 | runtime-composition | No | `app.mount(container)` do Vue renderiza a UI da própria unidade dentro do export `mount` (packages/app-1/src/entry.js:6-18); a fronteira com o host é o export em :6. |
| src-mount-call | packages/app-2/src/entry.js:13 | packages/app-2 | runtime-composition | No | `app.mount(container)` do Vue renderiza a UI da própria unidade dentro do export `mount` (packages/app-2/src/entry.js:6-18); a fronteira com o host é o export em :6. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | packages/host/src/routeManifest.js:1 | packages/host | host-relationship | Yes | `routeManifest` (packages/host/src/routeManifest.js:1-28) declara os remotes `app1` (`http://localhost:5011/remoteEntry.js`, rota `/app-1`) e `app2` (`http://localhost:5012/remoteEntry.js`, rota `/app-2`), as portas de packages/app-1/vite.config.js:19 e packages/app-2/vite.config.js:19; vira rotas em packages/host/src/router/index.js:4-12 e lista de remotes via `getRemotes` (:33-35). |
| manual | packages/host/src/plugins/federationPlugin.js:15 | packages/host | remote-resolution | Yes | `init` de `@module-federation/runtime` registra os remotes `app1` e `app2` com nome e URL de entrada (packages/host/src/plugins/federationPlugin.js:9-18); o padrão src-load-remote não cobre `init(`. Ativado por `app.use(federationPlugin, getRemotes())` em packages/host/src/main.js:15. |
| manual | packages/host/src/components/Loader.vue:74 | packages/host | runtime-composition | Yes | `remoteModule.mount(containerRef.value)` monta o remote carregado (packages/app-1 ou packages/app-2) no `<div ref="containerRef">` do host (packages/host/src/components/Loader.vue:2); o argumento `containerRef.value` não casa com src-mount-call. O `unmount` do remote anterior é chamado em :66. |

## Resumo

Construções com composição: 10 (remote-resolution: 4, runtime-composition: 5, host-relationship: 1).

## Notas

- Os `import()` em `packages/*/.__mf__temp/*/localSharedImportMap.js` são arquivos gerados pelo plugin `@module-federation/vite` e foram ignorados; o `import('@/components/Loader.vue')` de packages/host/src/router/index.js:11 é local ao host e não vira linha.
- Os remotes não importam nada do host; `packages/app-1/src/main.js` e `packages/app-2/src/main.js` são entradas standalone que não usam `entry.js`.

---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
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

# 245 — dvreddy007/mfe-sample

## Leitura do repositório

Exemplo de micro frontends com Vue 3 e Vite num workspace npm/Lerna: `packages/host` é o host e `packages/app-1` e `packages/app-2` são remotes, os três com `@module-federation/vite`. Os remotes expõem o mesmo módulo `./entry` (packages/app-1/vite.config.js:10-14; packages/app-2/vite.config.js:10-14), que exporta um contrato `mount(container)`/`unmount()` e cria uma instância Vue própria para cada remote (packages/app-1/src/entry.js:6-25; packages/app-2/src/entry.js:6-25). O host não declara `remotes` no `vite.config.js`: o plugin dele só traz `name`, `filename` e `shared` (packages/host/vite.config.js:10-14). Os remotes ficam num manifesto de rotas (packages/host/src/routeManifest.js:1-28), com nome, URL do `remoteEntry.js` e rota de cada um. Esse manifesto alimenta duas coisas: o `init` de `@module-federation/runtime`, que registra os remotes na inicialização (packages/host/src/main.js:15; packages/host/src/plugins/federationPlugin.js:9-18), e as rotas do Vue Router, todas com o mesmo componente `Loader.vue` (packages/host/src/router/index.js:4-12).

Na navegação (packages/host/src/App.vue:4-8), `Loader.vue` encontra o remote da rota, desmonta o anterior, carrega `<remote>/entry` por `loadRemote` e chama `mount` no seu `<div>` (packages/host/src/components/Loader.vue:2, 63-84, 87-108; packages/host/src/plugins/federationPlugin.js:27-35). O mesmo caminho de código serve aos dois remotes; quem escolhe o destino é o manifesto. Cada remote também roda sozinho, por um `main.js` que não usa `entry.js` (packages/app-1/src/main.js:5). Não há troca de mensagens entre as unidades. O host também tem `filename: 'remoteEntry.js'` sem `exposes` (packages/host/vite.config.js:12), o que não gera relação. O README mostra um manifesto em outro caminho e com `module: 'app1/App'` (README.md:78-98), diferente do arquivo real. As relações seguem o código.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/host | packages/app-1 | host → remote | origem → destino | module-federation | Yes | Yes | packages/host/vite.config.js:10-14 (plugin `federation` do host, `name: 'host'`, só `shared: ['vue']`, sem `remotes`); packages/app-1/vite.config.js:10-14 (`name: 'app1'`, `filename: 'remoteEntry.js'`, expõe `./entry`); packages/app-1/vite.config.js:19 (porta 5011) | packages/host/src/components/Loader.vue:70; packages/host/src/components/Loader.vue:96; packages/host/src/plugins/federationPlugin.js:29; packages/app-1/src/entry.js:6; packages/app-1/src/entry.js:20; packages/host/src/routeManifest.js:1; packages/host/src/plugins/federationPlugin.js:15; packages/host/src/components/Loader.vue:74 |
| 2 | packages/host | packages/app-2 | host → remote | origem → destino | module-federation | Yes | Yes | packages/host/vite.config.js:10-14 (plugin `federation` do host, `name: 'host'`, só `shared: ['vue']`, sem `remotes`); packages/app-2/vite.config.js:10-14 (`name: 'app2'`, `filename: 'remoteEntry.js'`, expõe `./entry`); packages/app-2/vite.config.js:19 (porta 5012) | packages/host/src/components/Loader.vue:70; packages/host/src/components/Loader.vue:96; packages/host/src/plugins/federationPlugin.js:29; packages/app-2/src/entry.js:6; packages/app-2/src/entry.js:20; packages/host/src/routeManifest.js:1; packages/host/src/plugins/federationPlugin.js:15; packages/host/src/components/Loader.vue:74 |

## Observações

**1. packages/host → packages/app-1.** O manifesto declara o remote `app1` com entrada `http://localhost:5011/remoteEntry.js` e rota `/app-1` (packages/host/src/routeManifest.js:3-9). O nome `app1` é o `name` de packages/app-1/vite.config.js:10, e o `remoteEntry.js` é o `filename` de :11. Essa é a correspondência explícita que resolve o destino; a porta 5011 (packages/app-1/vite.config.js:19) só confirma. O host pede `app1/entry` (packages/host/src/plugins/federationPlugin.js:29), que corresponde ao `./entry` exposto em packages/app-1/vite.config.js:12-14 e aos exports `mount`/`unmount` de packages/app-1/src/entry.js:6 e :20. A relação é ativa: o `init` roda na inicialização do host (packages/host/src/main.js:15), e a carga com montagem acontece quando a rota `/app-1` renderiza `Loader.vue` (packages/host/src/components/Loader.vue:70-74, 100-108). As linhas de `Loader.vue`, `federationPlugin.js` e `routeManifest.js` são genéricas e sustentam também a relação 2.

**2. packages/host → packages/app-2.** Mesmo caminho da relação 1, com o remote `app2`, entrada `http://localhost:5012/remoteEntry.js` e rota `/app-2` (packages/host/src/routeManifest.js:16-22). O destino é resolvido pelo `name: 'app2'` e pelo `filename: 'remoteEntry.js'` (packages/app-2/vite.config.js:10-11); a porta 5012 (:19) só confirma. O módulo `./entry` (packages/app-2/vite.config.js:12-14) exporta `mount` e `unmount` (packages/app-2/src/entry.js:6 e :20). Quando a rota muda, o host chama `unmount` do remote que estava montado antes de carregar o outro (packages/host/src/components/Loader.vue:66). Assim, a montagem de app-1 e app-2 se alterna no mesmo contêiner.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

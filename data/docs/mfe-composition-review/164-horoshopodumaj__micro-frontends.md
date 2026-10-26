---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
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

# 164 — horoshopodumaj/micro-frontends

## Leitura do repositório

Demonstração de Module Federation com Rspack e `@module-federation/enhanced`, com três projetos irmãos sem workspace na raiz: `host` (React), `remote` (React) e `vue-remote` (Vue 3). A composição é encadeada, o que o README chama de federação aninhada `host → remote → vue_remote` (README.md:133). O host não expõe nada (host/module-federation.config.ts:6) e consome só o container `remote` (host/module-federation.config.ts:3-5); na área de conteúdo da página, ao lado de um menu lateral estático, renderiza `<RemoteContent/>` (host/src/App.tsx:3, 18-20). O `remote` é ao mesmo tempo fornecedor e consumidor: expõe `./RemoteContent` (remote/module-federation.config.ts:8) e consome o container `vue_remote` (remote/module-federation.config.ts:4-6). O `RemoteContent` exposto é um título e o `CounterWrapper` (remote/src/RemoteContent.tsx:4-12), e é esse wrapper React que monta o componente Vue remoto (remote/src/CounterWrapper.tsx:8-13).

A integração entre frameworks se faz expondo, além do componente `./Counter`, o próprio runtime `vue` como `./vue` (vue-remote/module-federation.config.ts:4-7). O `remote` importa os dois por nome federado e monta o componente com o `createApp` do fornecedor (remote/src/CounterWrapper.tsx:2-3, 9-10); o `vue` é compartilhado como singleton e eager no fornecedor (vue-remote/module-federation.config.ts:10-13). O componente Vue é um contador com estado local (vue-remote/src/Counter.vue:1-22), sem eventos para fora.

Cada unidade também roda sozinha: o `remote` renderiza o próprio `RemoteContent` na sua página (remote/src/App.tsx:5-14), e o `vue-remote` monta o próprio `App.vue` (vue-remote/src/bootloader.ts:6-8). Essas montagens são internas a cada unidade e não viraram relação, assim como os bootstraps assíncronos `import("./App")`/`import("./bootloader")` e os tipos do remoto gerados em `host/@mf-types/` (host/@mf-types/remote/apis.d.ts:3), que a revisão de código-fonte registrou como `No`. Não há comunicação entre as unidades: os dados não cruzam as fronteiras, e o único elo é a renderização. A desmontagem do app Vue retorna `counter.unmount` sem chamá-lo (remote/src/CounterWrapper.tsx:12), defeito já registrado nas revisões anteriores que não muda a relação. Todos os endereços são de desenvolvimento local (`localhost:3001` e `localhost:3002`), sem configuração de deploy no snapshot.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | remote | vue-remote | host → remote | origem → destino | module-federation | Yes | Yes | remote/module-federation.config.ts:5 (`remotes` `vue_remote@http://localhost:3002/remoteEntry.js`); vue-remote/module-federation.config.ts:2 (`name: "vue_remote"`); vue-remote/module-federation.config.ts:3 (`filename: 'remoteEntry.js'`); vue-remote/module-federation.config.ts:5 (`exposes` `./Counter`); vue-remote/module-federation.config.ts:6 (`exposes` `./vue`); vue-remote/module-federation.config.ts:10-13 (`vue` singleton e eager); vue-remote/rspack.config.ts:33 (`publicPath: "http://localhost:3002/"`) | remote/src/CounterWrapper.tsx:10 |
| 2 | host | remote | host → remote | origem → destino | module-federation | Yes | Yes | host/module-federation.config.ts:4 (`remotes` `remote@http://localhost:3001/remoteEntry.js`); remote/module-federation.config.ts:2 (`name: "remote"`); remote/module-federation.config.ts:3 (`filename: 'remoteEntry.js'`); remote/module-federation.config.ts:8 (`exposes` `./RemoteContent`); remote/rspack.config.ts:33 (`publicPath: "http://localhost:3001/"`) | host/src/App.tsx:19 |

## Observações

**1. remote → vue-remote.** O `remote` declara o container `vue_remote` em `http://localhost:3002/remoteEntry.js` (remote/module-federation.config.ts:5). O destino foi resolvido pelo `name: "vue_remote"` e pelo `filename: 'remoteEntry.js'` da configuração do `vue-remote` (vue-remote/module-federation.config.ts:2-3), e o `publicPath` `http://localhost:3002/` (vue-remote/rspack.config.ts:33) confirma o endereço. O nome do container, com sublinhado, difere do diretório `vue-remote`, com hífen. Os dois módulos consumidos, `vue_remote/Counter` e `vue_remote/vue` (remote/src/CounterWrapper.tsx:2-3), são as duas entradas de `exposes` (vue-remote/module-federation.config.ts:5-6). Um vem como componente e o outro como o runtime que o monta: o `createApp` do fornecedor cria o app (remote/src/CounterWrapper.tsx:9) e o `mount` o põe num `div` do React (remote/src/CounterWrapper.tsx:10, 16). É montagem por API do framework, mas o destino entra como módulo federado, daí `host → remote`. Ativa = `Yes` pela linha `Yes` remote/src/CounterWrapper.tsx:10, que só roda quando o `CounterWrapper` é renderizado; isso acontece dentro do `RemoteContent` (remote/src/RemoteContent.tsx:10), tanto na página do próprio `remote` quanto no host, pela relação 2.

**2. host → remote.** O host declara o container `remote` em `http://localhost:3001/remoteEntry.js` (host/module-federation.config.ts:4). O destino foi resolvido pelo `name: "remote"` e pelo `filename: 'remoteEntry.js'` (remote/module-federation.config.ts:2-3), confirmados pelo `publicPath` `http://localhost:3001/` (remote/rspack.config.ts:33). O módulo importado, `remote/RemoteContent` (host/src/App.tsx:3), é o único `exposes` do remote (remote/module-federation.config.ts:8), e o host o renderiza na seção de conteúdo (host/src/App.tsx:19). Ativa = `Yes` por essa linha. Como o `RemoteContent` embute o `CounterWrapper`, a página do host mostra também o componente Vue, mas por meio do `remote`: o host não declara `vue_remote` (host/module-federation.config.ts:3-5), e por isso não há relação direta host → vue-remote.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

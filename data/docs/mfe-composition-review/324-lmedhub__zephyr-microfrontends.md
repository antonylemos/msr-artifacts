---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
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

# 324 — lmedhub/zephyr-microfrontends

## Leitura do repositório

Exemplo de Module Federation com Rspack e publicação no Zephyr Cloud: as quatro apps de `frontend/apps/` envolvem a configuração em `withZephyr()` (frontend/apps/host/rspack.config.ts:7) e usam o `ModuleFederationPlugin` embutido do Rspack (frontend/apps/host/rspack.config.ts:82). O repositório tem também um backend Go, fora das unidades. O host React (`name: "host"`, frontend/apps/host/rspack.config.ts:83) declara três remotes por URL `localhost` fixa (frontend/apps/host/rspack.config.ts:84-88) e monta a página com eles: cabeçalho, conteúdo central e rodapé (frontend/apps/host/src/App.tsx:11-23).

Header e footer são remotes React carregados com `React.lazy` e renderizados dentro de `Suspense` (frontend/apps/host/src/App.tsx:6-7, 12-14, 20-22). A particularidade está no remote `url_shortener`, que é Vue 3: o host não renderiza o componente remoto como componente React. O wrapper local `VueShortener` importa o `vue` compartilhado e o módulo remoto, cria uma aplicação Vue com `createApp(Shortener.default)` e a monta num `div` do React (frontend/apps/host/src/utils/VueShortener.tsx:10-16). O `vue` é declarado `shared` singleton tanto no host (frontend/apps/host/rspack.config.ts:92) quanto no remote (frontend/apps/url-shortener/rspack.config.ts:81-85).

Cada remote também roda sozinho; o url-shortener, por exemplo, monta a própria aplicação em `#app` (frontend/apps/url-shortener/src/index.ts:18-19). Não há troca de mensagens entre as unidades nem exposição sem consumidor: cada remote expõe um único módulo, e os três são consumidos pelo host. O `withZephyr()` pode reescrever as URLs dos remotes na publicação, o que não aparece no snapshot.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | frontend/apps/host | frontend/apps/remote-header | host → remote | origem → destino | module-federation | Yes | Yes | frontend/apps/host/rspack.config.ts:85 (remote `remote_header` em `http://localhost:3001/remoteEntry.js`); frontend/apps/remote-header/rspack.config.ts:74-78 (`name: "remote_header"`, `filename: "remoteEntry.js"`, expõe `./Header`); frontend/apps/remote-header/rspack.config.ts:14 (porta 3001) | frontend/apps/host/src/App.tsx:6; frontend/apps/host/src/App.tsx:13 |
| 2 | frontend/apps/host | frontend/apps/remote-footer | host → remote | origem → destino | module-federation | Yes | Yes | frontend/apps/host/rspack.config.ts:86 (remote `remote_footer` em `http://localhost:3002/remoteEntry.js`); frontend/apps/remote-footer/rspack.config.ts:74-78 (`name: "remote_footer"`, `filename: "remoteEntry.js"`, expõe `./Footer`); frontend/apps/remote-footer/rspack.config.ts:14 (porta 3002) | frontend/apps/host/src/App.tsx:7; frontend/apps/host/src/App.tsx:21 |
| 3 | frontend/apps/host | frontend/apps/url-shortener | host → remote | origem → destino | module-federation | Yes | Yes | frontend/apps/host/rspack.config.ts:87 (remote `url_shortener` em `http://localhost:3003/remoteEntry.js`); frontend/apps/url-shortener/rspack.config.ts:75-78 (`name: "url_shortener"`, `filename: "remoteEntry.js"`, expõe `./Shortener`); frontend/apps/url-shortener/rspack.config.ts:12 (porta 3003) | frontend/apps/host/src/utils/VueShortener.tsx:12; frontend/apps/host/src/utils/VueShortener.tsx:16 |

## Observações

**1. frontend/apps/host → frontend/apps/remote-header.** O remote `remote_header` do host corresponde à unidade pelo `name` e pelo `filename` declarados em frontend/apps/remote-header/rspack.config.ts:74-75, e o módulo `remote_header/Header` importado em frontend/apps/host/src/App.tsx:6 é o `./Header` exposto em frontend/apps/remote-header/rspack.config.ts:77-78; a porta 3001 só corrobora. Ativa porque o componente é renderizado no `App` (frontend/apps/host/src/App.tsx:13), que é a entrada do build do host e é montado em frontend/apps/host/src/App.tsx:27-28.

**2. frontend/apps/host → frontend/apps/remote-footer.** Mesmo arranjo da relação 1: `name: "remote_footer"` e `filename` em frontend/apps/remote-footer/rspack.config.ts:74-75 casam com o remote do host, e `remote_footer/Footer` (frontend/apps/host/src/App.tsx:7) é o `./Footer` exposto em frontend/apps/remote-footer/rspack.config.ts:77-78. O componente é renderizado em frontend/apps/host/src/App.tsx:21.

**3. frontend/apps/host → frontend/apps/url-shortener.** O destino foi resolvido pelo `name: "url_shortener"` e pelo `./Shortener` exposto (frontend/apps/url-shortener/rspack.config.ts:75-78), que casam com o remote do host e com o `import("url_shortener/Shortener")` em frontend/apps/host/src/utils/VueShortener.tsx:12. A relação é mista: o módulo vem por Module Federation e depois é montado como aplicação Vue com `createApp(...).mount(...)` (frontend/apps/host/src/utils/VueShortener.tsx:15-16). Pela regra de relação mista, o tipo segue a forma como o destino entra na origem, carregado como módulo, então `host → remote`. O wrapper é usado no `App` em frontend/apps/host/src/App.tsx:4 e frontend/apps/host/src/App.tsx:17.

## Resumo

Relações: 3 (host → remote: 3). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

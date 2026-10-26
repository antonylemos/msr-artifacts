---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
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

# 039 — coolsamson7/novx

## Leitura do repositório

Monorepo Nx de um framework de portal React (`@novx/portal` e as libs `@novx/core`, `@novx/i18n`, `@novx/communication`) com um app de referência de duas unidades: `apps/app` é o shell e `apps/microfrontend` é o remote, que só gera um `remoteEntry.js` expondo `./Module` e `./MicrofrontendFeature` (apps/microfrontend/webpack.config.js:53-59). O mecanismo de composição está no framework, não nos apps: o shell não importa o remote por `import('microfrontend/...')`; ele lê do seu `applicationConfig` o deployment `microfrontend` com a lista de remotes (apps/app/src/environments/environments.ts:2-8) e entrega essa lista ao `RemoteDeploymentLoader` do portal (apps/app/src/module.ts:226), que busca o `manifest.json` de cada remote (libs/portal/src/lib/loader/remote-loader.ts:28). As features desse manifesto recebem o nome do container e a URL do remote (libs/portal/src/lib/deployment-manager.ts:193-196), e o `RemoteComponentLoader` injeta o `remoteEntry.js` por `<script>`, inicializa o container do Module Federation e obtém primeiro `./Module` e depois o componente da feature (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32-41, :57-73, :106-110, :137-141). O outlet monta o componente carregado dentro do `Environment` de DI do módulo remoto (libs/portal/src/lib/feature-outlet.tsx:230, :245).

O `remotes` estático do webpack do shell (apps/app/webpack.config.js:82-84) declara o mesmo remote, mas o caminho que carrega de fato é o do framework, por script e `window[scope]` (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:47, :69). O manifesto lido em runtime é o `public/manifest.json` do remote, servido pelo dev server (apps/microfrontend/webpack.config.js:19-21); o scan de metadata do target do remote grava em outro lugar, `apps/microfrontend/src/manifest.json` (apps/microfrontend/project.json:11). O repositório é framework com app de demonstração; o remote tem uma única feature, uma página de texto (apps/microfrontend/src/feature.tsx:15-27). O que não virou relação: as libs são dependências compartilhadas como singletons (apps/app/webpack.config.js:6-11, :93), não unidades compostas, e `libs/communication` trata de endpoints HTTP, sem troca de mensagens entre as unidades (revisão de código-fonte, Notas).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/app | apps/microfrontend | host → remote | origem → destino | module-federation | Yes | Yes | apps/app/webpack.config.js:82-84 (remote `microfrontend` em `http://localhost:3001/remoteEntry.js`); apps/microfrontend/webpack.config.js:54-58 (`name: 'microfrontend'`, `filename: 'remoteEntry.js'`, expõe `./Module` e `./MicrofrontendFeature`); apps/microfrontend/webpack.config.js:18-21 (porta 3001, serve `public/`); apps/microfrontend/public/manifest.json:2-10 (módulo `microfrontend`, feature `/microfrontend/feature` com componente `MicrofrontendFeature`) | libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:57; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32; apps/app/src/environments/environments.ts:8; libs/portal/src/lib/loader/remote-loader.ts:28; libs/portal/src/lib/feature-outlet.tsx:245 |

## Observações

**1. apps/app → apps/microfrontend.** O destino foi resolvido pelo nome do container: o shell declara `{ name: 'microfrontend', url: 'http://localhost:3001' }` (apps/app/src/environments/environments.ts:8), e esse nome é o `name` do `ModuleFederationPlugin` de `apps/microfrontend` (apps/microfrontend/webpack.config.js:54), que também é o `id` do seu manifesto (apps/microfrontend/public/manifest.json:2); os módulos pedidos, `./Module` e `./${feature.component}` = `./MicrofrontendFeature`, são os expostos (apps/microfrontend/webpack.config.js:56-58). A porta 3001 (apps/microfrontend/webpack.config.js:18) só corrobora. As linhas de código em `libs/portal` têm Unidade `—` na revisão de código-fonte, mas entram nesta relação porque são o loader que o shell instancia e executa: o `RemoteDeploymentLoader` é criado no shell (apps/app/src/module.ts:226) e acionado em `loadDeployment` (apps/app/src/module.ts:262), e o `RemoteComponentLoader` está na lista de loaders do shell (apps/app/src/module.ts:317). Todas as nove construções são `Yes`, então a relação é ativa. `apps/microfrontend` é `Undetermined` na revisão estrutural porque não inicia a UI sozinho; isso não afeta o papel de destino, que é só fornecer o `remoteEntry.js`. A ligação tem dois níveis, ambos dentro da mesma relação: o shell carrega `./Module`, cuja classe vira um `Environment` filho do ambiente do shell (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:124-131), e depois o componente da feature, que o outlet renderiza com esse ambiente (libs/portal/src/lib/feature-outlet.tsx:245).

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

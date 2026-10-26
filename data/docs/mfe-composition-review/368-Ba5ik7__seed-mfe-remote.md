---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
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

# 368 — Ba5ik7/seed-mfe-remote

## Leitura do repositório

Workspace Angular com dois projetos: `seed-mfe-remote`, uma semente de remote Module Federation (`@angular-architects/module-federation`), e `demo`, um host de demonstração que a consome. O remote se chama `seedMfeRemote` e expõe um único componente, `./RemoteWidget` (projects/seed-mfe-remote/webpack.config.js:5, 7-8), cujo conteúdo é só o texto "Remote Widget LOADED!!!!" (projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:6). Fora isso, o remote tem uma página própria mínima ("Remote App", projects/seed-mfe-remote/src/app/app.component.ts:6) e uma tabela de rotas vazia (projects/seed-mfe-remote/src/app/app.routes.ts:3).

O `demo` carrega o mesmo módulo de duas formas: no `ngAfterViewInit` do componente raiz, monta o componente no `ng-container #mfeHost` (projects/demo/src/app/app.component.ts:12, 24-36), e na rota `remote` o devolve por `loadComponent` para o `<router-outlet>` (projects/demo/src/app/app.routes.ts:5-13; projects/demo/src/app/app.component.ts:15). As duas chamadas usam `loadRemoteModule` com `type: 'module'` e a URL fixa `http://localhost:4202/remoteEntry.js` (projects/demo/src/app/app.component.ts:27-29; projects/demo/src/app/app.routes.ts:9-11), que é a porta e o `publicHost` do dev-server do remote (angular.json:80-81). Por isso a entrada `seedMfeRemote` em `remotes` (projects/demo/webpack.config.js:5-7) fica declarada mas não é usada pelo código.

O seletor `app-remote-widget` (projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:4) não aparece em nenhum template do demo; o componente entra só como módulo carregado. As configurações de produção só reaproveitam as de desenvolvimento (projects/demo/webpack.prod.config.js:1; projects/seed-mfe-remote/webpack.prod.config.js:1) e não há URL de remote além de `localhost`. O repositório é um template mínimo: o valor está na cadeia configurada de ponta a ponta, não no conteúdo.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | projects/demo | projects/seed-mfe-remote | host → remote | origem → destino | module-federation | Yes | Yes | projects/demo/webpack.config.js:5-7 (remote `seedMfeRemote` em `http://localhost:4202/remoteEntry.js`); projects/seed-mfe-remote/webpack.config.js:5, 7-8 (`name: 'seedMfeRemote'`, expõe `./RemoteWidget`); angular.json:80-81 (dev-server do remote na porta 4202, `publicHost: http://localhost:4202`) | projects/demo/src/app/app.component.ts:1; projects/demo/src/app/app.component.ts:26; projects/demo/src/app/app.routes.ts:2; projects/demo/src/app/app.routes.ts:8; projects/demo/src/app/app.component.ts:36; projects/demo/src/app/app.routes.ts:4 |

## Observações

**1. projects/demo → projects/seed-mfe-remote.** O destino foi resolvido por duas correspondências explícitas: `exposedModule: './RemoteWidget'` nas chamadas do host (projects/demo/src/app/app.component.ts:29; projects/demo/src/app/app.routes.ts:11) casa com o `exposes` do remote (projects/seed-mfe-remote/webpack.config.js:7-8), e o nome `seedMfeRemote` declarado em `remotes` do host (projects/demo/webpack.config.js:6) casa com o `name` do remote (projects/seed-mfe-remote/webpack.config.js:5). A porta 4202 do dev-server (angular.json:80) confirma, mas não basta sozinha. A montagem por `createComponent` (projects/demo/src/app/app.component.ts:36) e a rota `remote` (projects/demo/src/app/app.routes.ts:4) carregam o mesmo módulo do mesmo destino e por isso ficam na mesma linha. Ativa `Yes` porque as seis construções da revisão de código-fonte são `Yes`. O código resolve o remote pela URL, não pelo nome declarado em `remotes`, que fica sem uso.

## Resumo

Relações: 1 (host → remote: 1). Ativas: 1. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

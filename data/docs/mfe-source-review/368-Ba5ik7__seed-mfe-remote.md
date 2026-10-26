---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 368 — Ba5ik7/seed-mfe-remote

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | projects/demo/src/main.ts:1 | projects/demo | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap local do demo (projects/demo/src/main.ts:1, projects/demo/src/bootstrap.ts:5); interno à unidade. |
| src-async-bootstrap | projects/seed-mfe-remote/src/main.ts:1 | projects/seed-mfe-remote | dynamic-loading | No | `import('./bootstrap')` carrega o bootstrap local do remote (projects/seed-mfe-remote/src/main.ts:1, projects/seed-mfe-remote/src/bootstrap.ts:5); interno à unidade. |
| src-load-remote | projects/demo/src/app/app.component.ts:1 | projects/demo | remote-resolution | Yes | Importa `loadRemoteModule`, usado em projects/demo/src/app/app.component.ts:26-30 para carregar `./RemoteWidget` de seed-mfe-remote. |
| src-load-remote | projects/demo/src/app/app.component.ts:26 | projects/demo | remote-resolution | Yes | Em `ngAfterViewInit`, `loadRemoteModule` com `remoteEntry: 'http://localhost:4202/remoteEntry.js'` e `exposedModule: './RemoteWidget'` (projects/demo/src/app/app.component.ts:24-30); alvo é projects/seed-mfe-remote, que expõe `./RemoteWidget` em projects/seed-mfe-remote/webpack.config.js:7-8 e serve na porta 4202 (angular.json:80). AppComponent é a raiz do demo (projects/demo/src/bootstrap.ts:5). |
| src-load-remote | projects/demo/src/app/app.routes.ts:2 | projects/demo | remote-resolution | Yes | Importa `loadRemoteModule`, usado na rota `remote` em projects/demo/src/app/app.routes.ts:8-12. |
| src-load-remote | projects/demo/src/app/app.routes.ts:8 | projects/demo | remote-resolution | Yes | `loadComponent` da rota `remote` chama `loadRemoteModule` com o mesmo remoteEntry e `./RemoteWidget` e devolve `RemoteWidgetComponent` (projects/demo/src/app/app.routes.ts:7-12); rotas registradas por `provideRouter(routes)` em projects/demo/src/app/app.config.ts:7, usado em projects/demo/src/bootstrap.ts:5. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | projects/demo/src/app/app.component.ts:36 | projects/demo | runtime-composition | Yes | `this.mfeHost.createComponent(remoteComponent.RemoteWidgetComponent)` monta o componente de seed-mfe-remote no `ng-container #mfeHost` do template (projects/demo/src/app/app.component.ts:12, :21-22, :36). |
| manual | projects/demo/src/app/app.routes.ts:4 | projects/demo | host-relationship | Yes | A tabela `routes` declara que o caminho `remote` usa o `./RemoteWidget` de seed-mfe-remote (projects/demo/src/app/app.routes.ts:4-14), exibido no `<router-outlet>` do host (projects/demo/src/app/app.component.ts:15); registrada em projects/demo/src/app/app.config.ts:7. |

## Resumo

Construções com composição: 6 (remote-resolution: 4, runtime-composition: 1, host-relationship: 1).

## Notas

- O `remoteEntry` está fixo em `http://localhost:4202/remoteEntry.js` nas duas chamadas; a declaração `remotes.seedMfeRemote` em projects/demo/webpack.config.js:5-7 não é usada pelo código, que resolve o remote por URL com `type: 'module'`.
- O seletor `app-remote-widget` (projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:4) não aparece em nenhum template do demo; o componente entra só por `createComponent` e pela rota.

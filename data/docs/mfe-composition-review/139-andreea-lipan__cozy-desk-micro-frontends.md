---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Leitura do repositório

Tutorial de micro frontends em Angular com **Native Federation** (`@angular-architects/native-federation`, build com esbuild). São três projetos Angular irmãos na raiz, sem workspace: o host `test-base` e os remotes `tea-tracker` e `sticky-notes`. O host inicializa a federação com `federation.manifest.json` antes do bootstrap (test-base/src/main.ts:3-5). Esse manifesto fica em `public/`, copiado como asset (test-base/angular.json:48-53), e associa cada nome de remote a um `remoteEntry.json` em `localhost` (test-base/public/federation.manifest.json:2-3). O host declara uma rota por remote, com `loadComponent` sobre `loadRemoteModule('<remote>', './App')` (test-base/src/app/app.routes.ts:12-19), registradas por `provideRouter` (test-base/src/app/app.config.ts:9). O menu lateral liga as rotas (test-base/src/app/app.html:12, 17), e o componente remoto aparece no `<router-outlet>` (test-base/src/app/app.html:26).

Cada remote expõe só `./App`, o componente raiz da própria aplicação (tea-tracker/federation.config.js:4-8; sticky-notes/federation.config.js:4-8). Esse componente renderiza a feature, `<app-tea-tracker/>` ou `<app-sticky-notes/>` (tea-tracker/src/app/app.html:1; sticky-notes/src/app/app.html:1). O host não expõe nada (test-base/federation.config.js:3-8). Os `initFederation()` sem argumento dos remotes (tea-tracker/src/main.ts:3; sticky-notes/src/main.ts:3) servem à execução isolada de cada um e não resolvem outra unidade. Não há comunicação entre as unidades, nem iframe, custom element ou orquestrador. Também não há deploy: as URLs do manifesto são as portas de desenvolvimento. Os remotes não se conhecem; toda relação parte do host.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | test-base | sticky-notes | host → remote | origem → destino | native-federation | Yes | Yes | test-base/public/federation.manifest.json:3 (`sticky-notes` → `http://localhost:4333/remoteEntry.json`); sticky-notes/federation.config.js:4-8 (`name: 'sticky-notes'`, expõe `./App`); sticky-notes/angular.json:97 (porta 4333) | test-base/src/app/app.routes.ts:3; test-base/src/app/app.routes.ts:18; test-base/src/main.ts:1; test-base/src/main.ts:3; test-base/src/app/app.routes.ts:5 |
| 2 | test-base | tea-tracker | host → remote | origem → destino | native-federation | Yes | Yes | test-base/public/federation.manifest.json:2 (`tea-tracker` → `http://localhost:4222/remoteEntry.json`); tea-tracker/federation.config.js:4-8 (`name: 'tea-tracker'`, expõe `./App`); tea-tracker/angular.json:97 (porta 4222) | test-base/src/app/app.routes.ts:3; test-base/src/app/app.routes.ts:14; test-base/src/main.ts:1; test-base/src/main.ts:3; test-base/src/app/app.routes.ts:5 |

## Observações

**1. test-base → sticky-notes.** A rota `sticky-notes` carrega `./App` do remote `sticky-notes` e usa o export `App` (test-base/src/app/app.routes.ts:16-18). O nome e o módulo correspondem a sticky-notes/federation.config.js:4-8, e o export a sticky-notes/src/app/app.ts:11. A URL do manifesto usa a porta 4333 (test-base/public/federation.manifest.json:3), a mesma do `serve-original` do projeto (sticky-notes/angular.json:97). A porta só corrobora: o destino se resolve pelo `name`. As linhas do import de `loadRemoteModule`, do `initFederation` com manifesto e da declaração das rotas valem para as duas relações.

**2. test-base → tea-tracker.** Mesmo fluxo, na rota `tea-tracker` (test-base/src/app/app.routes.ts:12-14). O nome e o módulo correspondem a tea-tracker/federation.config.js:4-8, e o export a tea-tracker/src/app/app.ts:11. A porta 4222 do manifesto (test-base/public/federation.manifest.json:2) coincide com tea-tracker/angular.json:97.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

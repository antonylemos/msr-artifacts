---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: b3f63eb6fb86d8877fda117ccc22eec936a89ff7bf2d414c1dedafc0311f1fb1
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 9441822a7a5f9766a0b955feeac5b7c0421a03c2dd7e07da4b4d476e26caebb0
annotation:
  method: manual
  status: final
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Leitura do repositório

Repositório de exercícios de frontend. Só o diretório `microfrontend-workspace` implementa micro-frontends; `angular-frontend-practical`, `react-performance-practical` e `ssr-app` são aplicações independentes, sem relação com ele nem entre si.

O workspace Angular tem um `shell`, um remote `mfe1` e uma biblioteca `shared`, ligados por Module Federation (`@angular-architects/module-federation`). O shell carrega o `AppComponent` de mfe1 na rota `mfe1`, com URL fixa, e redireciona a rota vazia para ela (microfrontend-workspace/projects/shell/src/app/app.routes.ts:4-24). Uma rota `mfe2` está comentada (microfrontend-workspace/projects/shell/src/app/app.routes.ts:14-21).

Além do carregamento, as duas unidades conversam por um `MessageService` com `BehaviorSubject` na biblioteca compartilhada. Ele só funciona como canal entre unidades porque as duas configurações compartilham dependências como singletons (`shareAll`) e o alias `shared` aponta para o mesmo build (microfrontend-workspace/tsconfig.json:15-18). O shell também expõe `./Component` (microfrontend-workspace/projects/shell/webpack.config.js:7-9), sem consumidor no snapshot.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | microfrontend-workspace/projects/shell | microfrontend-workspace/projects/mfe1 | host → remote | origem → destino | module-federation | Yes | Yes | microfrontend-workspace/projects/shell/webpack.config.js:14-16 (remote `mfe1@http://localhost:4201/remoteEntry.js`); microfrontend-workspace/projects/mfe1/webpack.config.js:5-10 (`name: 'mfe1'`, `filename: 'remoteEntry.js'`, expõe `./Component`); microfrontend-workspace/angular.json:191 (porta 4201 do projeto mfe1) | microfrontend-workspace/projects/shell/src/app/app.routes.ts:2; microfrontend-workspace/projects/shell/src/app/app.routes.ts:8; microfrontend-workspace/projects/shell/src/app/app.routes.ts:4 |
| 2 | microfrontend-workspace/projects/shell | microfrontend-workspace/projects/mfe1 | communication | origem → destino | events | Yes | Yes | microfrontend-workspace/projects/shell/webpack.config.js:11-13 (`shareAll` singleton); microfrontend-workspace/projects/mfe1/webpack.config.js:12-14 (`shareAll` singleton); microfrontend-workspace/tsconfig.json:15-18 (alias `shared` para `./dist/shared`) | microfrontend-workspace/projects/shared/src/lib/message.service.ts:12 |

## Observações

**1. shell → mfe1 (host → remote).** A rota carrega `./Component` de `http://localhost:4201/remoteEntry.js` (microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12). O módulo e o nome `mfe1` do remote declarado no shell (microfrontend-workspace/projects/shell/webpack.config.js:15) correspondem a microfrontend-workspace/projects/mfe1/webpack.config.js:5-9; a porta 4201 só corrobora. O `remotes` estático do shell aponta para a mesma URL que a rota usa diretamente.

**2. shell → mfe1 (communication).** O shell envia por `setMessage` (microfrontend-workspace/projects/shell/src/app/app.component.ts:19) e o mfe1 assina `message$` (microfrontend-workspace/projects/mfe1/src/app/app.component.ts:16-18); não há envio no sentido inverso. A evidência de código está na biblioteca compartilhada, que não é unidade; os participantes vêm da revisão de código-fonte.

## Resumo

Relações: 2 (host → remote: 1, communication: 1). Ativas: 2. Destino fora do snapshot: 0.
Unidades sem relação: angular-frontend-practical, react-performance-practical, ssr-app.

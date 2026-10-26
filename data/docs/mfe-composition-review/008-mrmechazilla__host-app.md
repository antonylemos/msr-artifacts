---
schema: 1
id: 1043375878
full_name: mrmechazilla/host-app
commit: 38ab4eb46b2edf72c07604bbbe2b0ff744c8f3b8
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
  date: 2026-10-21
---

# 008 — mrmechazilla/host-app

## Leitura do repositório

O repositório contém só o host Angular de um sistema distribuído em vários repositórios. Os remotes `users-mfe` e `payments-mfe` estão fora do snapshot e são conhecidos apenas pelo manifesto `public/mf.manifest.json`, que aponta para `localhost:4202` e `localhost:4203`. O host carrega esse manifesto antes do bootstrap (src/main.ts:4-7) e monta as rotas de `users-mfe` na rota raiz (src/app/app.routes.ts:4-15). Se o remote falhar, apenas registra "service unavailable" (src/app/app.routes.ts:14).

O manifesto traz metadados além do necessário para carregar (`displayName`, `routePath`, `exportName`, `type`; public/mf.manifest.json:2-19), sugerindo um menu ou roteamento gerado a partir dele, mas o código ativo usa só `users-mfe`, com valores fixos. `payments-mfe` é resolvido e nunca carregado. Há ainda um carregador genérico todo comentado (src/app/shared/utils/remote-loader.ts) e um tipo `RemoteConfig` sem uso (src/app/core/models/remote-config.ts:2), restos de uma versão mais dinâmica. O próprio host se declara `host-mfe`, com `exposes` vazio (webpack.config.js:3-7).

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | users-mfe | host → remote | origem → destino | module-federation | No | Yes | public/mf.manifest.json:2-9 (`users-mfe` com `remoteEntry` `http://localhost:4202/remoteEntry.js` e `exposedModule` `./users`) | src/app/app.routes.ts:1; src/app/app.routes.ts:8; src/main.ts:2; src/main.ts:4 |
| 2 | . | payments-mfe | host → remote | origem → destino | module-federation | No | Yes | public/mf.manifest.json:11-18 (`payments-mfe` com `remoteEntry` `http://localhost:4203/remoteEntry.js` e `exposedModule` `./payments`) | src/main.ts:2; src/main.ts:4 |

## Observações

**1. . → users-mfe.** O host carrega `./users` de `users-mfe` pelo manifesto (src/app/app.routes.ts:8-13), depois de resolvê-lo em src/main.ts:4. O snapshot tem uma única unidade, e o remote está fora dele.

**2. . → payments-mfe.** O `loadManifest` ativo (src/main.ts:4) resolve `payments-mfe`, mas nenhuma rota o carrega (src/app/app.routes.ts:4-15 só usa `users-mfe`). Ativa = Yes porque a linha que o resolve é Yes na revisão de código-fonte; o uso efetivo do módulo não é observado. Fora do snapshot.

## Resumo

Relações: 2 (host → remote: 2). Ativas: 2. Destino fora do snapshot: 2.
Unidades sem relação: nenhuma.

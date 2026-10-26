---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
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

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Leitura do repositório

Prova de conceito em Angular 21 com Nx, num workspace único em `nx-mf-df/`, de **Native Federation** (`@angular-architects/native-federation`) com mensageria entre micro frontends mediada pelo host (README.md:3, :5). O shell `main-host` registra os três remotes antes do bootstrap, por um manifesto que mapeia `mf_remote_a`, `mf_remote_b` e `mf_remote_c` para `remoteEntry.json` em `localhost:4201-4203` (nx-mf-df/apps/main-host/src/main.ts:3-5; nx-mf-df/apps/main-host/public/federation.manifest.json:2-4), e carrega cada um numa rota própria, pelo componente exposto `./Component` (nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25). O conteúdo aparece no `<router-outlet>` do host (nx-mf-df/apps/main-host/src/app/shared/components/main/main.html:2), com links de navegação no header (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:13-16). Cada remote declara seu `name` e só expõe o componente raiz (ex.: nx-mf-df/apps/mf_remote_a/federation.config.js:4, :8-10). No deploy para o GitHub Pages, o script de build reescreve o manifesto para os subdiretórios de cada remote (nx-mf-df/scripts/gh-build.mjs:57-64).

O assunto do projeto é a comunicação. O host cria um barramento de mensagens do pacote `@lkovari/microfrontend-platform-communication`, do mesmo titular, e o expõe aos três remotes por uma ponte global (nx-mf-df/apps/main-host/src/app/app.config.ts:31-47); o README diz que há um barramento físico por aba, criado pelo host, ao qual os remotes se ligam por `window.__MFE_BRIDGE__` (README.md:13, :19, :25). O código que publica e assina fica na biblioteca `nx-mf-df/libs/common-ui-lib` e os contratos (tópicos, ids dos participantes) em `nx-mf-df/libs/contracts-platform-messaging`, ambos unidades `No` da revisão estrutural. Por isso as relações de comunicação ligam as aplicações que usam esse código: o host, que monta o compositor de mensagens e a suíte de queries/commands no header (header.html:19-20), e os componentes expostos dos remotes, que assinam o barramento e mostram a última mensagem e o histórico (nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_a/src/app/app.html:3, :5).

O que não virou relação: os `initFederation()` sem manifesto dos remotes (ex.: nx-mf-df/apps/mf_remote_a/src/main.ts:3) e os `app.config.ts` deles (ex.: nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:19-30) servem ao modo standalone de cada remote; dentro do host, só o componente exposto é carregado, sem bootstrap próprio (README.md:19). As libs entram nos apps por alias de `tsconfig`, não por federação, e não são unidades.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_a | host → remote | origem → destino | native-federation | Yes | Yes | nx-mf-df/apps/main-host/public/federation.manifest.json:2 (`mf_remote_a` → `http://localhost:4201/remoteEntry.json`); nx-mf-df/scripts/gh-build.mjs:58 (`mf_remote_a` → `${base}mf_remote_a/remoteEntry.json` no deploy); nx-mf-df/apps/mf_remote_a/federation.config.js:4 (`name: 'mf_remote_a'`); nx-mf-df/apps/mf_remote_a/federation.config.js:9 (expõe `./Component`) | nx-mf-df/apps/main-host/src/app/app.routes.ts:2; nx-mf-df/apps/main-host/src/app/app.routes.ts:14; nx-mf-df/apps/main-host/src/main.ts:1; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.routes.ts:6 |
| 2 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_b | host → remote | origem → destino | native-federation | Yes | Yes | nx-mf-df/apps/main-host/public/federation.manifest.json:3 (`mf_remote_b` → `http://localhost:4202/remoteEntry.json`); nx-mf-df/scripts/gh-build.mjs:59 (`mf_remote_b` → `${base}mf_remote_b/remoteEntry.json` no deploy); nx-mf-df/apps/mf_remote_b/federation.config.js:4 (`name: 'mf_remote_b'`); nx-mf-df/apps/mf_remote_b/federation.config.js:9 (expõe `./Component`) | nx-mf-df/apps/main-host/src/app/app.routes.ts:2; nx-mf-df/apps/main-host/src/app/app.routes.ts:19; nx-mf-df/apps/main-host/src/main.ts:1; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.routes.ts:6 |
| 3 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_c | host → remote | origem → destino | native-federation | Yes | Yes | nx-mf-df/apps/main-host/public/federation.manifest.json:4 (`mf_remote_c` → `http://localhost:4203/remoteEntry.json`); nx-mf-df/scripts/gh-build.mjs:60 (`mf_remote_c` → `${base}mf_remote_c/remoteEntry.json` no deploy); nx-mf-df/apps/mf_remote_c/federation.config.js:4 (`name: 'mf_remote_c'`); nx-mf-df/apps/mf_remote_c/federation.config.js:9 (expõe `./Component`) | nx-mf-df/apps/main-host/src/app/app.routes.ts:2; nx-mf-df/apps/main-host/src/app/app.routes.ts:24; nx-mf-df/apps/main-host/src/main.ts:1; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.routes.ts:6 |
| 4 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_a | communication | origem → destino | events | Yes | Yes | — | nx-mf-df/apps/main-host/src/app/app.config.ts:31 |
| 5 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_b | communication | origem → destino | events | Yes | Yes | — | nx-mf-df/apps/main-host/src/app/app.config.ts:31 |
| 6 | nx-mf-df/apps/main-host | nx-mf-df/apps/mf_remote_c | communication | origem → destino | events | Yes | Yes | — | nx-mf-df/apps/main-host/src/app/app.config.ts:31 |

## Observações

**1. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_a.** O nome `mf_remote_a` de `loadRemoteModule('mf_remote_a', './Component')` (nx-mf-df/apps/main-host/src/app/app.routes.ts:14) e da entrada do manifesto (nx-mf-df/apps/main-host/public/federation.manifest.json:2) corresponde ao `name: 'mf_remote_a'` de nx-mf-df/apps/mf_remote_a/federation.config.js:4, e o módulo pedido ao `exposes` da linha 9, que aponta para o `App` (nx-mf-df/apps/mf_remote_a/src/app/app.ts:30), o mesmo `m.App` usado na rota. A porta 4201 do manifesto e o subdiretório `mf_remote_a/` do deploy (nx-mf-df/scripts/gh-build.mjs:54, :58) só corroboram. Ativa `Yes`: o manifesto é carregado antes do bootstrap (nx-mf-df/apps/main-host/src/main.ts:3-5) e as rotas são registradas por `provideRouter(appRoutes)` (nx-mf-df/apps/main-host/src/app/app.config.ts:30); todas as linhas de Código são `Yes`. As linhas compartilhadas (app.routes.ts:2, :6 e main.ts:1, :3) sustentam também as relações 2 e 3.

**2. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_b.** Mesma forma da relação 1: `loadRemoteModule('mf_remote_b', './Component')` (nx-mf-df/apps/main-host/src/app/app.routes.ts:19) e a entrada do manifesto (nx-mf-df/apps/main-host/public/federation.manifest.json:3) correspondem a `name: 'mf_remote_b'` e ao `exposes` `./Component` de nx-mf-df/apps/mf_remote_b/federation.config.js:4, :9. Porta 4202 e subdiretório de deploy (nx-mf-df/scripts/gh-build.mjs:59) só corroboram. Ativa `Yes` pela mesma cadeia da relação 1.

**3. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_c.** Mesma forma da relação 1: `loadRemoteModule('mf_remote_c', './Component')` (nx-mf-df/apps/main-host/src/app/app.routes.ts:24) e a entrada do manifesto (nx-mf-df/apps/main-host/public/federation.manifest.json:4) correspondem a `name: 'mf_remote_c'` e ao `exposes` `./Component` de nx-mf-df/apps/mf_remote_c/federation.config.js:4, :9. Porta 4203 e subdiretório de deploy (nx-mf-df/scripts/gh-build.mjs:60) só corroboram. Ativa `Yes` pela mesma cadeia da relação 1.

**4. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_a.** Barramento publish/subscribe criado no host por `provideBus` e exposto por `provideHostBridge` a `MF_REMOTE_A_ID` (nx-mf-df/apps/main-host/src/app/app.config.ts:31-47), cujo valor `'mf_remote_a'` (nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:3) é o nome do remote da relação 1. É troca de mensagens por um serviço compartilhado (tópicos, `subscribe`, `publish`), por isso `events`; não há `CustomEvent` nem `postMessage`, e a ponte é o objeto `window.__MFE_BRIDGE__` (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/mfe-window-bridge.util.ts:7). O lado do remote é o componente exposto: ele provê `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_a/src/app/app.ts:27), que assina o barramento pelo `BUS_TOKEN` ou pela ponte (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36, :46), e mostra o histórico (nx-mf-df/apps/mf_remote_a/src/app/app.html:5). Direção `origem → destino`: o único ponto de envio de mensagens é o compositor, montado só no header do host (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:20 → nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/message-composer/message-composer.component.ts:242), que usa como remetente o id deduzido da rota atual (nx-mf-df/apps/main-host/src/app/shared/components/header/header.ts:37-39; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:18-33). As respostas a queries e commands (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:134; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-query-queue.service.ts:121) saem de handlers que, na página composta, são registrados pelos providers do host (nx-mf-df/apps/main-host/src/app/app.config.ts:52-53) e respondem em nome de todos os remotes quando o `BUS_TOKEN` existe (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:79-81). O componente exposto do remote não publica nada; por isso não marquei `bidirecional`. Configuração `—`: a ligação passa pelo global `window`, não por uma declaração de configuração.

**5. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_b.** Mesma forma da relação 4, com `MF_REMOTE_B_ID` = `'mf_remote_b'` (nx-mf-df/apps/main-host/src/app/app.config.ts:44; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:5). O componente exposto de mf_remote_b provê o mesmo `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_b/src/app/app.ts:27), sem compositor; a direção segue a da relação 4.

**6. nx-mf-df/apps/main-host → nx-mf-df/apps/mf_remote_c.** Mesma forma da relação 4, com `MF_REMOTE_C_ID` = `'mf_remote_c'` (nx-mf-df/apps/main-host/src/app/app.config.ts:44; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:7). O componente exposto de mf_remote_c provê o mesmo `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_c/src/app/app.ts:27), sem compositor; a direção segue a da relação 4.

## Resumo

Relações: 6 (host → remote: 3, communication: 3). Ativas: 6. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

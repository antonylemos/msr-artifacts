---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | nx-mf-df/apps/main-host/src/main.ts:5 | nx-mf-df/apps/main-host | dynamic-loading | No | `import('./bootstrap')` depois de `initFederation('federation.manifest.json')` (nx-mf-df/apps/main-host/src/main.ts:3-5): carrega o bootstrap local da própria unidade (nx-mf-df/apps/main-host/src/bootstrap.ts:5). |
| src-async-bootstrap | nx-mf-df/apps/mf_remote_a/src/main.ts:5 | nx-mf-df/apps/mf_remote_a | dynamic-loading | No | `import('./bootstrap')` depois de `initFederation()` (nx-mf-df/apps/mf_remote_a/src/main.ts:3-5): carrega o bootstrap local da própria unidade (nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:5). |
| src-async-bootstrap | nx-mf-df/apps/mf_remote_b/src/main.ts:5 | nx-mf-df/apps/mf_remote_b | dynamic-loading | No | `import('./bootstrap')` depois de `initFederation()` (nx-mf-df/apps/mf_remote_b/src/main.ts:3-5): carrega o bootstrap local da própria unidade (nx-mf-df/apps/mf_remote_b/src/bootstrap.ts:5). |
| src-async-bootstrap | nx-mf-df/apps/mf_remote_c/src/main.ts:5 | nx-mf-df/apps/mf_remote_c | dynamic-loading | No | `import('./bootstrap')` depois de `initFederation()` (nx-mf-df/apps/mf_remote_c/src/main.ts:3-5): carrega o bootstrap local da própria unidade (nx-mf-df/apps/mf_remote_c/src/bootstrap.ts:5). |
| src-load-remote | nx-mf-df/apps/main-host/src/app/app.routes.ts:2 | nx-mf-df/apps/main-host | remote-resolution | Yes | Import de `loadRemoteModule`, usado nas rotas `mf_remote_a`, `mf_remote_b` e `mf_remote_c` (nx-mf-df/apps/main-host/src/app/app.routes.ts:14, 19, 24). |
| src-load-remote | nx-mf-df/apps/main-host/src/app/app.routes.ts:14 | nx-mf-df/apps/main-host | remote-resolution | Yes | `loadComponent` da rota `mf_remote_a` resolve `loadRemoteModule('mf_remote_a', './Component')` e usa `m.App` (exposto em nx-mf-df/apps/mf_remote_a/federation.config.js:9 → nx-mf-df/apps/mf_remote_a/src/app/app.ts:30); rotas registradas por `provideRouter(appRoutes)` em nx-mf-df/apps/main-host/src/app/app.config.ts:30, a partir de nx-mf-df/apps/main-host/src/bootstrap.ts:5. Alvo: mf_remote_a. |
| src-load-remote | nx-mf-df/apps/main-host/src/app/app.routes.ts:19 | nx-mf-df/apps/main-host | remote-resolution | Yes | `loadComponent` da rota `mf_remote_b` resolve `loadRemoteModule('mf_remote_b', './Component')` e usa `m.App` (exposto em nx-mf-df/apps/mf_remote_b/federation.config.js:9); mesma cadeia de ativação da linha 14. Alvo: mf_remote_b. |
| src-load-remote | nx-mf-df/apps/main-host/src/app/app.routes.ts:24 | nx-mf-df/apps/main-host | remote-resolution | Yes | `loadComponent` da rota `mf_remote_c` resolve `loadRemoteModule('mf_remote_c', './Component')` e usa `m.App` (exposto em nx-mf-df/apps/mf_remote_c/federation.config.js:9); mesma cadeia de ativação da linha 14. Alvo: mf_remote_c. |
| src-load-remote | nx-mf-df/apps/main-host/src/main.ts:1 | nx-mf-df/apps/main-host | remote-resolution | Yes | Import de `initFederation`, usado com o manifesto na linha 3. |
| src-load-remote | nx-mf-df/apps/main-host/src/main.ts:3 | nx-mf-df/apps/main-host | remote-resolution | Yes | `initFederation('federation.manifest.json')` antes do bootstrap; o manifesto mapeia `mf_remote_a`, `mf_remote_b` e `mf_remote_c` para `remoteEntry.json` em `localhost:4201-4203` (nx-mf-df/apps/main-host/public/federation.manifest.json:2-4), reescrito no build do GitHub Pages para os subdiretórios de cada remote (nx-mf-df/scripts/gh-build.mjs:57-64). Alvos: mf_remote_a, mf_remote_b e mf_remote_c. |
| src-load-remote | nx-mf-df/apps/mf_remote_a/src/main.ts:1 | nx-mf-df/apps/mf_remote_a | remote-resolution | No | Import de `initFederation`, usado só no `initFederation()` sem manifesto da linha 3, que não resolve outra unidade. |
| src-load-remote | nx-mf-df/apps/mf_remote_a/src/main.ts:3 | nx-mf-df/apps/mf_remote_a | remote-resolution | No | `initFederation()` sem manifesto nem remotes; mf_remote_a só expõe `./Component` (nx-mf-df/apps/mf_remote_a/federation.config.js:8-10), que o host carrega sem executar este main. |
| src-load-remote | nx-mf-df/apps/mf_remote_b/src/main.ts:1 | nx-mf-df/apps/mf_remote_b | remote-resolution | No | Import de `initFederation`, usado só no `initFederation()` sem manifesto da linha 3, que não resolve outra unidade. |
| src-load-remote | nx-mf-df/apps/mf_remote_b/src/main.ts:3 | nx-mf-df/apps/mf_remote_b | remote-resolution | No | `initFederation()` sem manifesto nem remotes; mf_remote_b só expõe `./Component` (nx-mf-df/apps/mf_remote_b/federation.config.js:8-10), que o host carrega sem executar este main. |
| src-load-remote | nx-mf-df/apps/mf_remote_c/src/main.ts:1 | nx-mf-df/apps/mf_remote_c | remote-resolution | No | Import de `initFederation`, usado só no `initFederation()` sem manifesto da linha 3, que não resolve outra unidade. |
| src-load-remote | nx-mf-df/apps/mf_remote_c/src/main.ts:3 | nx-mf-df/apps/mf_remote_c | remote-resolution | No | `initFederation()` sem manifesto nem remotes; mf_remote_c só expõe `./Component` (nx-mf-df/apps/mf_remote_c/federation.config.js:8-10), que o host carrega sem executar este main. |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | nx-mf-df/apps/main-host/src/app/app.routes.ts:6 | nx-mf-df/apps/main-host | host-relationship | Yes | Tabela de rotas do host declara a rota raiz `Home` e as rotas `mf_remote_a`, `mf_remote_b` e `mf_remote_c` (nx-mf-df/apps/main-host/src/app/app.routes.ts:6-26); registrada por nx-mf-df/apps/main-host/src/app/app.config.ts:30; links de navegação em nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:13-16 e `<router-outlet>` em nx-mf-df/apps/main-host/src/app/shared/components/main/main.html:2. |
| manual | nx-mf-df/apps/main-host/src/app/app.config.ts:31 | nx-mf-df/apps/main-host | communication | Yes | `provideBus(...)` de `@lkovari/microfrontend-platform-communication/angular` cria no host o barramento de mensagens da plataforma (`appId: SHELL_HOST_ID`, registro de tópicos e validadores, nx-mf-df/apps/main-host/src/app/app.config.ts:31-42), e `provideHostBridge` o expõe aos remotes `MF_REMOTE_A_ID`, `MF_REMOTE_B_ID` e `MF_REMOTE_C_ID` (:43-47). Na página composta, o host executa `providePlatformMessageListenerBootstrap()` e os bootstraps dos handlers h2r de query e command (:50-53). Esses handlers assinam em nome dos três IDs remotos e processam as solicitações no host (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-query-remote-handler.service.ts:74-80, :112-122; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:74-80, :112-121); as respostas de query e os acknowledgements de command são publicados no mesmo barramento por essa execução no host (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-query-queue.service.ts:121-134; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:129-142). Os componentes federados não executam seus `app.config.ts` standalone: as rotas carregam apenas `m.App` (nx-mf-df/apps/main-host/src/app/app.routes.ts:11-25; nx-mf-df/apps/mf_remote_a/federation.config.js:8-10). Cada componente remoto provê `WELCOME_REMOTE_PARTICIPANT_ID` com seu ID e `PlatformWelcomeLastMessageService` (nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_b/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_c/src/app/app.ts:25-28); esse serviço consome `PLATFORM_MESSAGE_V1` pelo `BUS_TOKEN` herdado ou, como alternativa, pela ponte global via `RemotePlatformBusService`, assinando com o ID do remote (nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36, :62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57). O host publica pelo compositor `lib-platform-messaging-trigger` e envia queries/commands pela suíte `lib-demo-shell-h2r-query-suite` do header (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20). Alvos: mf_remote_a, mf_remote_b e mf_remote_c. |

## Resumo

Construções com composição: 8 (remote-resolution: 6, host-relationship: 1, communication: 1).

## Notas

- Cadeia do host: nx-mf-df/apps/main-host/src/main.ts:3-5 → nx-mf-df/apps/main-host/src/bootstrap.ts:5 → nx-mf-df/apps/main-host/src/app/app.config.ts:30 → nx-mf-df/apps/main-host/src/app/app.routes.ts:6-26. Os `initFederation()` sem manifesto dos remotes são internos ao fluxo standalone.
- A busca do passo 4 não encontrou `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, injeção de `<script>`, `registerApplication` nem `registerMicroApps`; os únicos outros `import(` são `await import('jsonc-eslint-parser')` nas configurações de ESLint das libs, fora do código das aplicações.
- A comunicação usa o pacote externo `@lkovari/microfrontend-platform-communication` (nx-mf-df/package.json:89); os serviços que publicam e assinam ficam em nx-mf-df/libs/common-ui-lib (unidade `No` na revisão estrutural), e os contratos (tópicos, ids dos participantes, token de acesso da ponte) em nx-mf-df/libs/contracts-platform-messaging. Os pontos de publicação e assinatura citados na linha manual não viraram linhas próprias, por serem pontos de uso do mesmo barramento.

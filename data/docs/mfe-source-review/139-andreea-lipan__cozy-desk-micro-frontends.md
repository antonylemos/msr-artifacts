---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Construções da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| src-async-bootstrap | sticky-notes/src/main.ts:5 | sticky-notes | dynamic-loading | No | Importa o bootstrap local de sticky-notes depois de initFederation (sticky-notes/src/main.ts:3-5); interno à unidade. |
| src-async-bootstrap | tea-tracker/src/main.ts:5 | tea-tracker | dynamic-loading | No | Importa o bootstrap local de tea-tracker depois de initFederation (tea-tracker/src/main.ts:3-5); interno à unidade. |
| src-async-bootstrap | test-base/src/main.ts:5 | test-base | dynamic-loading | No | Importa o bootstrap local do host test-base depois de initFederation (test-base/src/main.ts:3-5); interno à unidade. |
| src-load-remote | sticky-notes/src/main.ts:1 | sticky-notes | remote-resolution | No | Importa initFederation para a chamada sem manifesto em sticky-notes/src/main.ts:3; prepara o runtime da própria unidade, sem resolver outra aplicação. |
| src-load-remote | sticky-notes/src/main.ts:3 | sticky-notes | remote-resolution | No | initFederation() sem manifesto nem remotes (sticky-notes/src/main.ts:3); sticky-notes só expõe ./App (sticky-notes/federation.config.js:6-8) e não resolve outra unidade. |
| src-load-remote | tea-tracker/src/main.ts:1 | tea-tracker | remote-resolution | No | Importa initFederation para a chamada sem manifesto em tea-tracker/src/main.ts:3; prepara o runtime da própria unidade, sem resolver outra aplicação. |
| src-load-remote | tea-tracker/src/main.ts:3 | tea-tracker | remote-resolution | No | initFederation() sem manifesto nem remotes (tea-tracker/src/main.ts:3); tea-tracker só expõe ./App (tea-tracker/federation.config.js:6-8) e não resolve outra unidade. |
| src-load-remote | test-base/src/app/app.routes.ts:3 | test-base | remote-resolution | Yes | Importa loadRemoteModule usado nas rotas tea-tracker e sticky-notes (test-base/src/app/app.routes.ts:14 e test-base/src/app/app.routes.ts:18). |
| src-load-remote | test-base/src/app/app.routes.ts:14 | test-base | remote-resolution | Yes | Rota tea-tracker carrega ./App do remote tea-tracker (test-base/src/app/app.routes.ts:12-15); rotas registradas por provideRouter em test-base/src/app/app.config.ts:4-9, usado em test-base/src/bootstrap.ts:5. Exposição em tea-tracker/federation.config.js:4-8. |
| src-load-remote | test-base/src/app/app.routes.ts:18 | test-base | remote-resolution | Yes | Rota sticky-notes carrega ./App do remote sticky-notes (test-base/src/app/app.routes.ts:16-19), no mesmo fluxo ativo test-base/src/app/app.config.ts:4-9. Exposição em sticky-notes/federation.config.js:4-8. |
| src-load-remote | test-base/src/main.ts:1 | test-base | remote-resolution | Yes | Importa initFederation usado com manifesto em test-base/src/main.ts:3. |
| src-load-remote | test-base/src/main.ts:3 | test-base | remote-resolution | Yes | Inicializa a federação com federation.manifest.json, que nomeia tea-tracker em http://localhost:4222/remoteEntry.json e sticky-notes em http://localhost:4333/remoteEntry.json (test-base/public/federation.manifest.json:2-3). |

## Construções fora da mineração

| Padrão | Arquivo:linha | Unidade | Categoria | Composição | Observação |
|---|---|---|---|---|---|
| manual | test-base/src/app/app.routes.ts:5 | test-base | host-relationship | Yes | Declara as rotas do host que nomeiam tea-tracker e sticky-notes (test-base/src/app/app.routes.ts:5-20), registradas por provideRouter em test-base/src/app/app.config.ts:9; os componentes remotos aparecem no `<router-outlet>` de test-base/src/app/app.html:26, com links em test-base/src/app/app.html:12 e test-base/src/app/app.html:17. |

## Resumo

Construções com composição: 6 (remote-resolution: 5, host-relationship: 1).

## Notas

- Cadeia ativa do host: test-base/angular.json:46 → test-base/src/main.ts:3-5 → test-base/src/bootstrap.ts:5 → test-base/src/app/app.config.ts:4-9 → test-base/src/app/app.routes.ts:5-20.
- Os initFederation() sem argumento de sticky-notes e tea-tracker servem ao fluxo standalone de cada remote; nenhum dos dois declara remotes ou manifesto.
- A busca do passo 4 nos arquivos de código das três unidades não encontrou `customElements`, `<iframe`, `postMessage`, `CustomEvent`, `BroadcastChannel`, injeção de `<script>`, `registerApplication`, `registerMicroApps`, `registerRemotes` nem `System.import`; também não há `localStorage`, `addEventListener` ou serviço compartilhado entre unidades em `*/src/app`. A composição é só por rotas com loadRemoteModule.

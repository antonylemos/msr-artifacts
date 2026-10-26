---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
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

# 025 — raiane-honorato/software-eng-mba

## Leitura do repositório

Repositório de TCC de MBA que implementa o mesmo app de academia (MyGym) três vezes para comparar regimes de modularização em React Native: monolito, Turborepo (build-time) e Re.Pack (runtime) (README.md:27-33). A regra que vale nas três versões é que os módulos `check-in` e `dashboard` nunca se importam e só se comunicam pela store compartilhada `@mygym/store`, em Zustand (README.md:16-23). Só a versão Re.Pack compõe unidades em runtime. O monolito (`apps/monolith`) e o app Turborepo (`apps/turborepo/apps/mygym`) são unidades isoladas; o Turborepo junta as features como pacotes do workspace num bundle único, e esses pacotes não são unidades na revisão estrutural.

Na versão Re.Pack (`apps/repack/packages/`), `host` é o host de Module Federation 2 (`Repack.plugins.ModuleFederationPluginV2`) e declara os remotes `checkin` e `dashboard` por `mf-manifest.json` por plataforma, nas portas 9001 e 9002 (apps/repack/packages/host/rspack.config.mjs:45-52). Cada mini-app expõe um stack de navegação sem `NavigationContainer`, que fica só no host (apps/repack/packages/check-in/rspack.config.mjs:45-46; apps/repack/packages/dashboard/rspack.config.mjs:43-44). O host carrega cada stack com `React.lazy`, mapeia o export nomeado para `default` e o envolve em `ErrorBoundary` + `Suspense` (apps/repack/packages/host/src/screens/CheckInTab.tsx:11-24). As duas abas do `Tab.Navigator` são os pontos de entrada: `Home` → dashboard e `FindGyms` → check-in (apps/repack/packages/host/src/navigation/RootNavigator.tsx:52-53). A lista `shared` sai de um helper comum: o host fornece os singletons de forma eager e os mini-apps consomem a instância do host (apps/repack/packages/shared-deps/sharedDeps.mjs:61-80; apps/repack/packages/host/rspack.config.mjs:53-54). É assim que a store Zustand vira um canal de comunicação entre os dois mini-apps em runtime.

`apps/repack-poc/` é uma spike anterior com um host e um remote mínimos: o host renderiza a `HelloScreen` exposta pelo remote (apps/repack-poc/README.md:5, 19-20). O README dá como critério de sucesso o fallback do `ErrorBoundary` quando o remote cai, para provar que a carga é em runtime. As unidades são apps React Native, não web; a decisão de escopo mobile × web está em aberto na classificação e não muda as relações registradas aqui. As URLs dos remotes apontam para `localhost`, e os manifestos MF são gerados pelo dev server, sem cópia versionada no snapshot.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | apps/repack-poc/host | apps/repack-poc/remote | host → remote | origem → destino | module-federation | Yes | Yes | apps/repack-poc/host/rspack.config.mjs:41-46 (`name: 'host'`, remote `remote@http://localhost:9001/${platform}/mf-manifest.json`); apps/repack-poc/remote/rspack.config.mjs:37-40 (`name: 'remote'`, `filename: 'remote.container.bundle'`, expõe `./HelloScreen`) | apps/repack-poc/host/App.tsx:26; apps/repack-poc/host/App.tsx:35 |
| 2 | apps/repack/packages/host | apps/repack/packages/check-in | host → remote | origem → destino | module-federation | Yes | Yes | apps/repack/packages/host/rspack.config.mjs:45-50 (`name: 'host'`, remote `checkin@http://localhost:9001/${platform}/mf-manifest.json`); apps/repack/packages/check-in/rspack.config.mjs:42-46 (`name: 'checkin'`, `filename: 'check-in.container.js.bundle'`, expõe `./CheckInStack`); apps/repack/packages/check-in/package.json:9 (porta 9001) | apps/repack/packages/host/src/screens/CheckInTab.tsx:12; apps/repack/packages/host/src/screens/CheckInTab.tsx:21; apps/repack/packages/host/src/navigation/RootNavigator.tsx:52 |
| 3 | apps/repack/packages/host | apps/repack/packages/dashboard | host → remote | origem → destino | module-federation | Yes | Yes | apps/repack/packages/host/rspack.config.mjs:45-51 (`name: 'host'`, remote `dashboard@http://localhost:9002/${platform}/mf-manifest.json`); apps/repack/packages/dashboard/rspack.config.mjs:40-44 (`name: 'dashboard'`, `filename: 'dashboard.container.js.bundle'`, expõe `./DashboardStack`); apps/repack/packages/dashboard/package.json:9 (porta 9002) | apps/repack/packages/host/src/screens/DashboardTab.tsx:9; apps/repack/packages/host/src/screens/DashboardTab.tsx:16; apps/repack/packages/host/src/navigation/RootNavigator.tsx:52 |
| 4 | apps/repack/packages/check-in | apps/repack/packages/dashboard | communication | bidirecional | events | Yes | Yes | apps/repack/packages/shared-deps/sharedDeps.mjs:53 (`@mygym/store` na lista de pacotes locais); apps/repack/packages/shared-deps/sharedDeps.mjs:76 (`singleton: true`); apps/repack/packages/host/rspack.config.mjs:54 (`sharedDeps({ eager: true })`); apps/repack/packages/check-in/rspack.config.mjs:48 (`sharedDeps({ eager: false })`); apps/repack/packages/dashboard/rspack.config.mjs:46 (`sharedDeps({ eager: false })`) | apps/repack/packages/store/src/checkInStore.ts:33 |

## Observações

**1. apps/repack-poc/host → apps/repack-poc/remote.** O remote `remote` declarado pelo host (apps/repack-poc/host/rspack.config.mjs:45) corresponde à unidade apps/repack-poc/remote pelo `name: 'remote'` e pelo `exposes` de `./HelloScreen` (apps/repack-poc/remote/rspack.config.mjs:38-40), que é o módulo pedido em apps/repack-poc/host/App.tsx:26. A porta 9001 não está no `start` do remote (apps/repack-poc/remote/package.json:9); vem do comando documentado `pnpm react-native start --port 9001` (apps/repack-poc/README.md:100-101) e só corrobora. A relação é ativa: o componente é montado em `AppContent` (apps/repack-poc/host/App.tsx:33-37), renderizado pelo `App` (apps/repack-poc/host/App.tsx:21) registrado em apps/repack-poc/host/index.js:9. O remote tem `export default` (apps/repack-poc/remote/src/HelloScreen.tsx:11), que é o que o `React.lazy` resolve.

**2. apps/repack/packages/host → apps/repack/packages/check-in.** O remote `checkin` (apps/repack/packages/host/rspack.config.mjs:50) corresponde à unidade check-in pelo `name: 'checkin'` e pelo `exposes` de `./CheckInStack` (apps/repack/packages/check-in/rspack.config.mjs:42-46). O nome do container não tem o hífen do diretório porque vira identificador JS global, como explica o comentário em apps/repack/packages/check-in/rspack.config.mjs:40-41. A porta 9001 do `start` (apps/repack/packages/check-in/package.json:9) bate com a URL do remote, como registra apps/repack/mprocs.yaml:2-3. O host pega o export nomeado `CheckInStack` (apps/repack/packages/host/src/screens/CheckInTab.tsx:12), que o mini-app define em apps/repack/packages/check-in/src/navigation/CheckInStack.tsx:8. A relação é ativa: a aba `FindGyms` usa `CheckInTab` (apps/repack/packages/host/src/navigation/RootNavigator.tsx:53), dentro do `NavigationContainer` do host (apps/repack/packages/host/App.tsx:19-21). A linha `RootNavigator.tsx:52` da revisão de código-fonte cobre as duas abas e por isso aparece nesta relação e na 3.

**3. apps/repack/packages/host → apps/repack/packages/dashboard.** É o mesmo padrão da relação 2: o remote `dashboard` (apps/repack/packages/host/rspack.config.mjs:51) corresponde à unidade dashboard pelo `name: 'dashboard'` e pelo `exposes` de `./DashboardStack` (apps/repack/packages/dashboard/rspack.config.mjs:40-44), e a porta 9002 (apps/repack/packages/dashboard/package.json:9) corrobora. O export nomeado `DashboardStack` (apps/repack/packages/host/src/screens/DashboardTab.tsx:9) existe em apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:20. A aba `Home`, a primeira do navegador, monta `DashboardTab` (apps/repack/packages/host/src/navigation/RootNavigator.tsx:52).

**4. apps/repack/packages/check-in ↔ apps/repack/packages/dashboard (communication).** O canal é `useCheckInStore` (apps/repack/packages/store/src/checkInStore.ts:33), num pacote que não é unidade. Ele vira estado único entre os mini-apps por ser singleton do Module Federation fornecido pelo host. O host só provê a store e não a lê nem escreve, por isso não entra na relação. O README fala do check-in como produtor e do dashboard como consumidor (README.md:20-21), mas o código envia nos dois sentidos. O check-in escreve ao chamar `startCheckIn` (apps/repack/packages/check-in/src/screens/CheckInConfirmationScreen.tsx:52), e o dashboard lê `isActive` para escolher a tela (apps/repack/packages/dashboard/src/navigation/DashboardStack.tsx:12-17). O dashboard escreve ao chamar `endCheckIn` e `saveRating` (apps/repack/packages/dashboard/src/screens/WorkoutFinishScreen.tsx:50-53), que gravam `history` (apps/repack/packages/store/src/checkInStore.ts:69-76). O check-in lê esse histórico por `canCheckInToday` (apps/repack/packages/store/src/checkInStore.ts:85-90), que habilita o check-in na lista de academias e na confirmação (apps/repack/packages/check-in/src/screens/GymListScreen.tsx:17; apps/repack/packages/check-in/src/screens/CheckInConfirmationScreen.tsx:35). Por isso a direção é `bidirecional`. O mecanismo é `events`, como serviço reativo compartilhado. A relação é ativa porque a linha da revisão de código-fonte é `Yes`.

## Resumo

Relações: 4 (host → remote: 3, communication: 1). Ativas: 4. Destino fora do snapshot: 0.
Unidades sem relação: apps/monolith, apps/turborepo/apps/mygym.

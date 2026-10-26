---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 025 — raiane-honorato/software-eng-mba

## Leitura do repositório

O repositório é um TCC que implementa o mesmo app React Native (MyGym) três vezes para comparar
regimes de modularização: monolito, Turborepo (build-time) e Re.Pack com Module Federation 2
(runtime). Há também uma spike anterior em `apps/repack-poc/`. Só as duas versões Re.Pack compõem
unidades em runtime. As unidades são apps mobile, não web; a decisão de escopo está em aberto na
classificação e não muda as evidências.

A cadeia da versão Re.Pack (`apps/repack/packages/`) está completa:
- **Dependência:** `@module-federation/enhanced` no host e nos dois mini-apps (#3–#5), usada pelo
  plugin `Repack.plugins.ModuleFederationPluginV2`.
- **Configuração:** o host declara os remotes `checkin` e `dashboard` por `mf-manifest.json` (#11);
  cada mini-app se nomeia e expõe um stack de navegação (#9, #10); o helper `sharedDeps` monta a
  mesma lista `shared` de singletons para os três (#12).
- **Código:** o host importa os stacks pelos nomes dos remotes (#14, #15), monta-os em
  `ErrorBoundary` + `Suspense` (#23, #24) e os liga às duas abas do navegador (#25).
- **Relação:** host → check-in e host → dashboard, ativas (#58, #59), sobre unidades com limite
  próprio (#31, #32, #35) e build próprio (#64–#66).

A comunicação entre os mini-apps é a store Zustand `@mygym/store` (#26). Ela vira estado único
porque é singleton do `shared` (#12), fornecido eager pelo host (#11) e consumido pelos mini-apps
(#9, #10). Disso resulta a relação bidirecional check-in ↔ dashboard (#60). A spike repete o par
host → remote em escala mínima (#1, #2, #7, #8, #13, #22, #57).

Sinais que enganam:
- As seis maquetes HTML de `UX/` carregam o CDN do Tailwind, não unidades (#16–#21).
- Os pacotes `@mygym/*` dos dois workspaces são bibliotecas ou configurações, não unidades
  (#33–#43, #46–#56). Os `feature-*` do Turborepo são módulos fundidos no bundle único do app
  `mygym` (#48, #49, #67), e o `turbo` é ferramenta de monorepo, não mecanismo de MFE (#6).
- O monolito e o app Turborepo são unidades com build próprio, mas sem relação com outra
  unidade (#27, #45, #61, #67).

A documentação é extensa e quase toda corroborada (#68–#98). Ficam sem artefato o deploy
independente/OTA (#73), o rebuild do host ao adicionar lib nativa (#94) e o container no build
standalone (#97). Também não têm artefato a medição de antes/depois do `phosphor-react-native` (#79)
e o download do bundle pelo `ScriptManager` (#80). O nativo do host como único binário também não
tem artefato, porque `ios/`/`android/` são ignorados pelo Git (#92, #103). Duas afirmações são
contraditas: o `pnpm catalog` como fonte única de versões (#90) e "webpack + MF" na tabela do
Turborepo, escrita antes da implementação em Rspack (#98, #104).

Nada fica ambíguo no snapshot. O deploy não é observado em nenhuma das sete aplicações: os
endereços dos remotes são `localhost` de dev server.

## Observações

### 1. apps/repack-poc/host/package.json:13

**Observação:** `@module-federation/enhanced` (`^2.6.0`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no host da spike.

### 2. apps/repack-poc/remote/package.json:13

**Observação:** `@module-federation/enhanced` (`^2.6.0`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no remote da spike.

### 3. apps/repack/packages/check-in/package.json:13

**Observação:** `@module-federation/enhanced` (`^2.6.0`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no mini-app check-in.

### 4. apps/repack/packages/dashboard/package.json:13

**Observação:** `@module-federation/enhanced` (`^2.6.0`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no mini-app dashboard.

### 5. apps/repack/packages/host/package.json:13

**Observação:** `@module-federation/enhanced` (`^2.6.0`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no host do MyGym.

### 6. apps/turborepo/package.json:12

**Observação:** `turbo` (`^2.9.5`) está declarada em `devDependencies` da raiz do workspace
Turborepo; `turbo.json` configura as tasks `build`, `typecheck`, `lint`, `dev` e `test`.

**Interpretação:** O Turborepo orquestra tarefas de um monorepo; não é mecanismo de composição de
unidades frontend.

### 7. apps/repack-poc/host/rspack.config.mjs:15-54

**Observação:** `Repack.plugins.ModuleFederationPluginV2` declara `name: 'host'`, o remote
`remote: remote@http://localhost:9001/${platform}/mf-manifest.json` e compartilha `react` e
`react-native` com `singleton: true, eager: true`.

**Interpretação:** A configuração do host da spike declara o remote e onde resolvê-lo, e o host é
o fornecedor dos singletons.

### 8. apps/repack-poc/remote/rspack.config.mjs:15-47

**Observação:** `ModuleFederationPluginV2` declara `name: 'remote'`,
`filename: 'remote.container.bundle'`, expõe `./HelloScreen` (`./src/HelloScreen.tsx`) e compartilha
`react` e `react-native` com `singleton: true, eager: false`.

**Interpretação:** O remote da spike está configurado como container que oferece uma tela a um
host e consome os singletons dele.

### 9. apps/repack/packages/check-in/rspack.config.mjs:14-51

**Observação:** `ModuleFederationPluginV2` declara `name: 'checkin'` (sem hífen, por virar
identificador JS global, segundo o comentário das linhas 40-41),
`filename: 'check-in.container.js.bundle'`, expõe `./CheckInStack` e usa
`shared: sharedDeps({ eager: false })`.

**Interpretação:** O check-in está configurado como remote que expõe seu stack de navegação e
consome os singletons do host.

### 10. apps/repack/packages/dashboard/rspack.config.mjs:14-49

**Observação:** `ModuleFederationPluginV2` declara `name: 'dashboard'`,
`filename: 'dashboard.container.js.bundle'`, expõe `./DashboardStack` e usa
`shared: sharedDeps({ eager: false })`.

**Interpretação:** O dashboard está configurado como remote que expõe seu stack de navegação e
consome os singletons do host.

### 11. apps/repack/packages/host/rspack.config.mjs:16-58

**Observação:** `ModuleFederationPluginV2` declara `name: 'host'`, os remotes
`checkin@http://localhost:9001/${platform}/mf-manifest.json` e
`dashboard@http://localhost:9002/${platform}/mf-manifest.json` e usa
`shared: sharedDeps({ eager: true })`.

**Interpretação:** A configuração do host declara check-in e dashboard como remotes, resolvidos
pela rede em runtime, e faz do host o fornecedor eager dos singletons.

**Nota:** Os outros arquivos de configuração citados nas tabelas da 3.4 não declaram elemento da
composição e não viram observação: `react-native.config.js` (troca os comandos do CLI pelos do
Re.Pack), `pnpm-workspace.yaml` (pacotes e catalog do workspace), `turbo.json`, `app.json`,
`metro.config.js` e `mprocs.yaml` (sobe os dev servers). As portas dos scripts `start` dos
`package.json` são de servidor de desenvolvimento; a URL pela qual o host resolve cada remote está
aqui.

### 12. apps/repack/packages/shared-deps/sharedDeps.mjs:19-80

**Observação:** O helper lista em `RUNTIME_LIBS` as libs externas (`react`, `react-native`,
`@react-navigation/*`, `react-native-safe-area-context`, `react-native-screens`,
`react-native-svg`, `react-native-linear-gradient`, `@react-native-community/blur`,
`phosphor-react-native`, `zustand`) e em `LOCAL_PACKAGES` os pacotes `@mygym/store`, `theme`, `ui`,
`navigation`, `data` e `utils`. `sharedDeps({ eager })` devolve o objeto `shared` com
`singleton: true` e o `eager` recebido para todas; as externas recebem `version` e
`requiredVersion` iguais à versão lida de `node_modules` (`installedVersion`, linhas 19-23), e as
locais `requiredVersion: false`.

**Interpretação:** É a declaração única das dependências compartilhadas do Module Federation, usada
pelo host e pelos dois mini-apps; é ela que torna a store um estado único entre as unidades.

**Nota:** É um arquivo JavaScript dedicado ao build (importado pelos três `rspack.config.mjs`,
linha 4), por isso fica na configuração. Serve três unidades, mas tem um só bloco (a lista e a
função), sem parte por unidade; o `eager` de cada unidade está em #9, #10 e #11.

### 13. apps/repack-poc/host/App.tsx:26

**Observação:** `const HelloScreen = React.lazy(() => import('remote/HelloScreen'))`.

**Interpretação:** O host da spike carrega em runtime o módulo exposto pelo remote, pelo nome dele.

### 14. apps/repack/packages/host/src/screens/CheckInTab.tsx:12

**Observação:** `import('checkin/CheckInStack').then((m) => ({ default: m.CheckInStack }))`, dentro
de `React.lazy` (linhas 11-13).

**Interpretação:** O host carrega em runtime o stack exposto pelo check-in, pelo nome do remote.

### 15. apps/repack/packages/host/src/screens/DashboardTab.tsx:9

**Observação:** `import('dashboard/DashboardStack').then((m) => ({ default: m.DashboardStack }))`,
dentro de `React.lazy` (linhas 8-10).

**Interpretação:** O host carrega em runtime o stack exposto pelo dashboard, pelo nome do remote.

### 16. UX/confirma_o_de_check_in/code.html:15

**Observação:** `<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries">`, numa
maquete de UI.

**Interpretação:** Carrega o CSS utilitário de um CDN; não carrega outra unidade.

### 17. UX/dashboard_check_in_ativo_4/code.html:7

**Observação:** O mesmo `<script>` do CDN do Tailwind, numa maquete de UI.

**Interpretação:** Não carrega outra unidade.

### 18. UX/dashboard_p_s_treino_2/code.html:7

**Observação:** O mesmo `<script>` do CDN do Tailwind, numa maquete de UI.

**Interpretação:** Não carrega outra unidade.

### 19. UX/dashboard_p_s_treino_menu_unificado/code.html:7

**Observação:** O mesmo `<script>` do CDN do Tailwind, numa maquete de UI.

**Interpretação:** Não carrega outra unidade.

### 20. UX/finaliza_o_de_treino/code.html:7

**Observação:** O mesmo `<script>` do CDN do Tailwind, numa maquete de UI.

**Interpretação:** Não carrega outra unidade.

### 21. UX/listagem_de_academias/code.html:7

**Observação:** O mesmo `<script>` do CDN do Tailwind, numa maquete de UI.

**Interpretação:** Não carrega outra unidade.

### 22. apps/repack-poc/host/App.tsx:35

**Observação:** `<HelloScreen />` dentro de `ErrorBoundary` + `Suspense` (linhas 33-37); o
componente vem do import da linha 26.

**Interpretação:** O host da spike renderiza o componente remoto, isolando a falha de carga.

### 23. apps/repack/packages/host/src/screens/CheckInTab.tsx:21

**Observação:** `<CheckInStack />` dentro de `ErrorBoundary` + `React.Suspense` (linhas 19-23); o
componente vem do import da linha 12.

**Interpretação:** O host renderiza o stack do check-in, com fallback de carga e isolamento de erro.

### 24. apps/repack/packages/host/src/screens/DashboardTab.tsx:16

**Observação:** `<DashboardStack />` dentro de `ErrorBoundary` + `React.Suspense` (linhas 14-18); o
componente vem do import da linha 9.

**Interpretação:** O host renderiza o stack do dashboard, com fallback de carga e isolamento de erro.

### 25. apps/repack/packages/host/src/navigation/RootNavigator.tsx:52-53

**Observação:** `<Tab.Screen name="Home" component={DashboardTab} />` e
`<Tab.Screen name="FindGyms" component={CheckInTab} />`, no `Tab.Navigator` do host.

**Interpretação:** As rotas do host ligam cada aba ao componente que carrega um remote.

### 26. apps/repack/packages/store/src/checkInStore.ts:33

**Observação:** `export const useCheckInStore = create<CheckInState>(...)`, store Zustand com
`startCheckIn`, `history` e `canCheckInToday`. O pacote é singleton do `shared` dos três
`rspack.config.mjs`; o check-in escreve nela ao confirmar o check-in, e o dashboard lê o estado
para escolher a tela.

**Interpretação:** É o canal de estado compartilhado entre os dois mini-apps em runtime.

### 27. apps/monolith; apps/monolith/package.json:4; apps/monolith/index.ts:1-8; apps/monolith/package.json:10; apps/monolith/app.json:2-29

**Observação:** App Expo/React Native com manifesto próprio, entrada que registra a UI
(`registerRootComponent(App)`) e build `expo export --platform android`, fora de workspace.

**Interpretação:** É uma unidade frontend com limite próprio: a versão monolítica de comparação.

### 28. apps/repack; apps/repack/package.json:1-14; apps/repack/package.json:6; apps/repack/mprocs.yaml:4-10

**Observação:** Raiz do workspace Re.Pack, sem entrada nem build; o script `start` sobe os três dev
servers por `mprocs`.

**Interpretação:** É raiz de coordenação, não unidade frontend.

### 29. apps/repack-poc/host; apps/repack-poc/host/rspack.config.mjs:21; apps/repack-poc/host/index.js:9; apps/repack-poc/host/rspack.config.mjs:15-54; apps/repack-poc/host/react-native.config.js:2

**Observação:** App React Native com manifesto próprio, entrada `./index.js` que chama
`AppRegistry.registerComponent` e build Rspack/Re.Pack próprio.

**Interpretação:** É uma unidade frontend com limite próprio: o host da spike.

### 30. apps/repack-poc/remote; apps/repack-poc/remote/rspack.config.mjs:17; apps/repack-poc/remote/index.js:9; apps/repack-poc/remote/rspack.config.mjs:15-47; apps/repack-poc/remote/react-native.config.js:2

**Observação:** App React Native com manifesto próprio, entrada `./index.js` que chama
`AppRegistry.registerComponent` e build Rspack/Re.Pack próprio.

**Interpretação:** É uma unidade frontend com limite próprio: o remote da spike.

### 31. apps/repack/packages/check-in; apps/repack/packages/check-in/rspack.config.mjs:16; apps/repack/packages/check-in/index.js:9; apps/repack/packages/check-in/App.tsx:7-21; apps/repack/packages/check-in/rspack.config.mjs:14-51; apps/repack/packages/check-in/package.json:9

**Observação:** Mini-app React Native com manifesto próprio, entrada que registra a UI, `App.tsx`
standalone com `NavigationContainer` próprio e build Rspack/Re.Pack com dev server na porta 9001.

**Interpretação:** É uma unidade frontend com limite próprio, capaz de rodar sozinha.

### 32. apps/repack/packages/dashboard; apps/repack/packages/dashboard/rspack.config.mjs:16; apps/repack/packages/dashboard/index.js:9; apps/repack/packages/dashboard/rspack.config.mjs:14-49; apps/repack/packages/dashboard/package.json:9

**Observação:** Mini-app React Native com manifesto próprio, entrada que registra a UI e build
Rspack/Re.Pack com dev server na porta 9002.

**Interpretação:** É uma unidade frontend com limite próprio.

### 33. apps/repack/packages/data; apps/repack/packages/data/package.json:1-17

**Observação:** Pacote `@mygym/data` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 34. apps/repack/packages/eslint-config; apps/repack/packages/eslint-config/package.json:1-18

**Observação:** Pacote `@mygym/eslint-config`, configuração de lint.

**Interpretação:** É configuração compartilhada, não unidade frontend.

### 35. apps/repack/packages/host; apps/repack/packages/host/rspack.config.mjs:22; apps/repack/packages/host/index.js:9; apps/repack/packages/host/rspack.config.mjs:16-58; apps/repack/packages/host/react-native.config.js:2

**Observação:** App React Native com manifesto próprio, entrada `./index.js` que chama
`AppRegistry.registerComponent` e build Rspack/Re.Pack próprio.

**Interpretação:** É uma unidade frontend com limite próprio: o host do MyGym.

### 36. apps/repack/packages/jest-config; apps/repack/packages/jest-config/package.json:1-14

**Observação:** Pacote `@mygym/jest-config`, configuração de testes.

**Interpretação:** É configuração compartilhada, não unidade frontend.

### 37. apps/repack/packages/navigation; apps/repack/packages/navigation/package.json:1-15

**Observação:** Pacote `@mygym/navigation` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 38. apps/repack/packages/shared-deps; apps/repack/packages/shared-deps/package.json:1-7

**Observação:** Pacote `@mygym/shared-deps` com `main: sharedDeps.mjs`, importado pelos
`rspack.config.mjs`.

**Interpretação:** É helper de build, não unidade frontend; o conteúdo do helper é #12.

### 39. apps/repack/packages/store; apps/repack/packages/store/package.json:1-20

**Observação:** Pacote `@mygym/store` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend; o canal que ela contém é #26.

### 40. apps/repack/packages/theme; apps/repack/packages/theme/package.json:1-15

**Observação:** Pacote `@mygym/theme` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 41. apps/repack/packages/tsconfig; apps/repack/packages/tsconfig/package.json:1-8

**Observação:** Pacote `@mygym/tsconfig`, configuração TypeScript.

**Interpretação:** É configuração compartilhada, não unidade frontend.

### 42. apps/repack/packages/ui; apps/repack/packages/ui/package.json:1-27

**Observação:** Pacote `@mygym/ui` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca de componentes compartilhada, não unidade frontend.

### 43. apps/repack/packages/utils; apps/repack/packages/utils/package.json:1-22

**Observação:** Pacote `@mygym/utils` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 44. apps/turborepo; apps/turborepo/package.json:1-19; apps/turborepo/package.json:4-9

**Observação:** Raiz do workspace Turborepo, sem entrada nem build; os scripts delegam por
`turbo run`.

**Interpretação:** É raiz de coordenação, não unidade frontend.

### 45. apps/turborepo/apps/mygym; apps/turborepo/apps/mygym/package.json:5; apps/turborepo/apps/mygym/src/index.ts:1-8; apps/turborepo/apps/mygym/package.json:11; apps/turborepo/apps/mygym/metro.config.js:1-18

**Observação:** App Expo/React Native com manifesto próprio, entrada que registra a UI e build
`expo export --platform android` com Metro.

**Interpretação:** É uma unidade frontend com limite próprio: a versão Turborepo de comparação.

### 46. apps/turborepo/packages/data; apps/turborepo/packages/data/package.json:1-17

**Observação:** Pacote `@mygym/data` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 47. apps/turborepo/packages/eslint-config; apps/turborepo/packages/eslint-config/package.json:1-18

**Observação:** Pacote `@mygym/eslint-config`, configuração de lint.

**Interpretação:** É configuração compartilhada, não unidade frontend.

### 48. apps/turborepo/packages/feature-check-in; apps/turborepo/packages/feature-check-in/package.json:1-34; apps/turborepo/apps/mygym/src/navigation/RootNavigator.tsx:1

**Observação:** Pacote `@mygym/feature-check-in` sem entrada própria, que exporta `CheckInStack` e é
importado pelo app `mygym`.

**Interpretação:** É módulo de feature integrado em build-time, não unidade frontend.

### 49. apps/turborepo/packages/feature-dashboard; apps/turborepo/packages/feature-dashboard/package.json:1-32; apps/turborepo/apps/mygym/src/navigation/RootNavigator.tsx:2

**Observação:** Pacote `@mygym/feature-dashboard` sem entrada própria, importado pelo app `mygym`.

**Interpretação:** É módulo de feature integrado em build-time, não unidade frontend.

### 50. apps/turborepo/packages/jest-config; apps/turborepo/packages/jest-config/package.json:1-14

**Observação:** Pacote `@mygym/jest-config`, configuração de testes.

**Interpretação:** É configuração compartilhada, não unidade frontend.

### 51. apps/turborepo/packages/navigation; apps/turborepo/packages/navigation/package.json:1-15

**Observação:** Pacote `@mygym/navigation` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 52. apps/turborepo/packages/store; apps/turborepo/packages/store/package.json:1-20

**Observação:** Pacote `@mygym/store` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 53. apps/turborepo/packages/theme; apps/turborepo/packages/theme/package.json:1-15

**Observação:** Pacote `@mygym/theme` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 54. apps/turborepo/packages/tsconfig; apps/turborepo/packages/tsconfig/package.json:1-8

**Observação:** Pacote `@mygym/tsconfig`, configuração TypeScript.

**Interpretação:** É configuração compartilhada, não unidade frontend.

### 55. apps/turborepo/packages/ui; apps/turborepo/packages/ui/package.json:1-27

**Observação:** Pacote `@mygym/ui` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca de componentes compartilhada, não unidade frontend.

### 56. apps/turborepo/packages/utils; apps/turborepo/packages/utils/package.json:1-22

**Observação:** Pacote `@mygym/utils` com `main: ./src/index.ts`, sem entrada de aplicação.

**Interpretação:** É biblioteca compartilhada, não unidade frontend.

### 57. apps/repack-poc/host/App.tsx:26, 35; apps/repack-poc/host/rspack.config.mjs:41-46; apps/repack-poc/remote/rspack.config.mjs:37-40

**Observação:** O host da spike importa e monta `remote/HelloScreen`. O remote `remote` declarado
pelo host corresponde ao `name: 'remote'` e ao `exposes` de `./HelloScreen` do remote.

**Interpretação:** É uma relação host → remote ativa por Module Federation.

### 58. apps/repack/packages/host/src/screens/CheckInTab.tsx:12, 21; apps/repack/packages/host/src/navigation/RootNavigator.tsx:52-53; apps/repack/packages/host/rspack.config.mjs:45-50; apps/repack/packages/check-in/rspack.config.mjs:42-46

**Observação:** O host importa e monta `checkin/CheckInStack` na aba `FindGyms`. O remote `checkin`
(porta 9001) corresponde ao `name: 'checkin'` e ao `exposes` de `./CheckInStack` do check-in, cujo
`start` usa a porta 9001.

**Interpretação:** É uma relação host → remote ativa por Module Federation.

### 59. apps/repack/packages/host/src/screens/DashboardTab.tsx:9, 16; apps/repack/packages/host/src/navigation/RootNavigator.tsx:52; apps/repack/packages/host/rspack.config.mjs:45-51; apps/repack/packages/dashboard/rspack.config.mjs:40-44

**Observação:** O host importa e monta `dashboard/DashboardStack` na aba `Home`. O remote
`dashboard` (porta 9002) corresponde ao `name: 'dashboard'` e ao `exposes` de `./DashboardStack` do
dashboard, cujo `start` usa a porta 9002.

**Interpretação:** É uma relação host → remote ativa por Module Federation.

### 60. apps/repack/packages/store/src/checkInStore.ts:33; apps/repack/packages/shared-deps/sharedDeps.mjs:53, 76; apps/repack/packages/host/rspack.config.mjs:54; apps/repack/packages/check-in/rspack.config.mjs:48; apps/repack/packages/dashboard/rspack.config.mjs:46

**Observação:** `useCheckInStore` é singleton do `shared`, fornecido eager pelo host e consumido pelos
mini-apps. O check-in escreve ao chamar `startCheckIn` e lê o histórico por `canCheckInToday`. O
dashboard lê `isActive` para escolher a tela e escreve ao chamar `endCheckIn` e `saveRating`.

**Interpretação:** É uma relação de comunicação ativa e bidirecional entre check-in e dashboard, por
um serviço reativo compartilhado; o host só provê a store.

### 61. apps/monolith/package.json:10; apps/monolith/app.json:2-29; scripts/measure.sh:75

**Observação:** Build próprio por `expo export --platform android`, medido pelo script de medição.
Nada empacota ou publica o export.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 62. apps/repack-poc/host/rspack.config.mjs:15-54; apps/repack-poc/host/react-native.config.js:2

**Observação:** Configuração Rspack/Re.Pack própria, com o remote como externo em `localhost:9001`;
não há script `build` nem publicação.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 63. apps/repack-poc/remote/rspack.config.mjs:15-47; apps/repack-poc/remote/react-native.config.js:2

**Observação:** Configuração própria que gera o container `remote.container.bundle`, servido pelo dev
server em `http://localhost:9001/${platform}/`; nada o publica.

**Interpretação:** Há uma fronteira de build própria, servida só em desenvolvimento.

### 64. apps/repack/packages/check-in/rspack.config.mjs:14-51; apps/repack/packages/check-in/react-native.config.js:2; scripts/measure-repack.sh:29-31, 41

**Observação:** Configuração própria que gera o container `check-in.container.js.bundle`, servido
pelo dev server na porta 9001. O script de medição gera um bundle de produção do pacote à parte,
numa pasta temporária. Nada publica o container.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 65. apps/repack/packages/dashboard/rspack.config.mjs:14-49; apps/repack/packages/dashboard/react-native.config.js:2; scripts/measure-repack.sh:29-31, 42

**Observação:** Configuração própria que gera o container `dashboard.container.js.bundle`, servido
pelo dev server na porta 9002, e bundle de produção isolado no script de medição. Nada publica o
container.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 66. apps/repack/packages/host/rspack.config.mjs:16-58; apps/repack/packages/host/react-native.config.js:2; scripts/measure-repack.sh:29-31, 40

**Observação:** Configuração própria, com os dois mini-apps como remotes externos, e bundle de
produção isolado no script de medição. A porta 8081 do dev server só aparece em comentário do
`mprocs.yaml`; não há projeto nativo nem configuração de publicação.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 67. apps/turborepo/apps/mygym/package.json:11; apps/turborepo/package.json:5; apps/turborepo/turbo.json:5-8; scripts/measure.sh:100, 132

**Observação:** Build próprio por `expo export`, disparado pela raiz com `turbo run build` (saída
`dist/**`); as features entram como pacotes do workspace no mesmo bundle. Nada o publica.

**Interpretação:** Há uma fronteira de build própria, que reúne as features num bundle único, sem
deploy observado.

### 68. README.md:18-21

**Observação:** "`check-in` | **Produtor** de estado | ...; `dashboard` | **Consumidor** de estado | ..."

**Interpretação:** Atribui a cada módulo seu papel primário na troca de estado. A afirmação é
corroborada.

### 69. README.md:23

**Observação:** "`check-in` e `dashboard` **nunca se importam diretamente** — comunicam-se apenas por
uma store compartilhada (`@mygym/store`, Zustand)".

**Interpretação:** Afirma que os módulos só se ligam pela store, nas três versões. A afirmação é
corroborada.

### 70. README.md:31

**Observação:** "**Monolito** | baseline | Expo + Metro | Um projeto, sem modularização; fronteiras só
por convenção de pastas | `apps/monolith/`".

**Interpretação:** Descreve o monolito como unidade única. A afirmação é corroborada.

### 71. README.md:32

**Observação:** "**Turborepo** | build-time | ... | Módulos em packages separados; fronteiras
enforçadas por `package.json`; **fundidos num bundle único no build** | `apps/turborepo/`".

**Interpretação:** Afirma que a versão Turborepo integra os módulos em build-time. A afirmação é
corroborada.

### 72. README.md:33

**Observação:** "**Re.Pack** | runtime | Re.Pack + Module Federation | Host + mini-apps em **bundles
separados, carregados pela rede em runtime** | `apps/repack/`".

**Interpretação:** Afirma que a versão Re.Pack compõe host e mini-apps em runtime. A afirmação é
corroborada.

### 73. README.md:33

**Observação:** "...; deploy independente / OTA".

**Interpretação:** Afirma o deploy independente dos mini-apps, sem artefato no snapshot. A afirmação
fica sem corroboração.

### 74. README.md:57-58,64

**Observação:** "Module Federation pressupõe controle total do bundler (Rspack), incompatível com o
fluxo gerenciado do Expo" — por isso o Re.Pack roda em "React Native CLI puro (bare)".

**Interpretação:** Liga a tecnologia de federação a um toolchain sem Expo. A afirmação é corroborada.

### 75. README.md:85

**Observação:** "Sustentada pelo modo standalone de cada mini-app...".

**Interpretação:** Afirma que cada mini-app roda sozinho. A afirmação é corroborada.

### 76. README.md:85

**Observação:** "...e pelo **teste de resiliência** (derrubar um remote → `ErrorBoundary` isola o
erro numa aba, sem crashar o app)".

**Interpretação:** Afirma que a falha de um remote fica isolada na aba dele. A afirmação é
corroborada.

### 77. README.md:94

**Observação:** "No build-time o singleton da store é automático... No runtime ele precisa ser
**declarado** (`shared: { singleton: true }`); omitir fragmenta o estado silenciosamente".

**Interpretação:** Afirma que o estado único depende da declaração `shared`. A afirmação é
corroborada.

### 78. README.md:95

**Observação:** "Libs de **view nativa** precisam ser singleton por corretude (senão o app crasha ao
registrar a view duas vezes)".

**Interpretação:** Dá um motivo para libs entrarem no `shared`. A afirmação é corroborada.

### 79. README.md:95

**Observação:** "libs **comuns e pesadas** precisam ser singleton por eficiência (senão cada remote
re-baixa a lib inteira — descoberto medindo os chunks: um esquecimento inflava o download em
~10 MB)".

**Interpretação:** Afirma a correção (lib pesada no `shared`), que está no helper, e uma medição sem
artefato. A afirmação é corroborada em parte.

### 80. apps/repack-poc/README.md:7

**Observação:** "no Network tab só aparece o **manifest** (vem por `fetch`); o **bundle do remote em
si não aparece** porque é baixado pelo `ScriptManager` do Re.Pack via módulo nativo, fora da camada
JS de rede".

**Interpretação:** Descreve como o host obtém o remote. O manifesto se confirma na configuração; o
download pelo `ScriptManager` não tem artefato. A afirmação é corroborada em parte.

**Nota:** A 3.4.7 diz que a captura `poc-evidence.png` não está no snapshot; a 3.4.8 mostra que ela
está no commit e foi retirada só pela normalização da aquisição (#100). A captura não sustenta a
parte do `ScriptManager` por artefato de configuração, e a classificação desta linha não muda.

### 81. apps/repack-poc/README.md:17-20

**Observação:** "`host/` | Consumidor (shell) | ... Importa a tela do remote via `React.lazy`...
`remote/` | Produtor | ... **expõe** `HelloScreen` como um bundle federado".

**Interpretação:** Descreve os papéis de host e remote na spike. A afirmação é corroborada.

### 82. apps/repack-poc/README.md:20

**Observação:** "Não roda sozinho na spike — só serve o bundle."

**Interpretação:** Relata que o remote da spike só serviu o bundle. O snapshot mostra que ele só é
servido pelo dev server, mas também tem entrada própria; o uso relatado não tem artefato. A
afirmação é corroborada em parte.

### 83. apps/repack-poc/README.md:58

**Observação:** "**`eager`: `true` no host, `false` no remote.** O host carrega react/react-native de
imediato (fornecedor); o remote os consome do host... Garante uma única instância (`singleton`)".

**Interpretação:** Descreve a divisão de `eager` entre fornecedor e consumidor na spike. A afirmação
é corroborada.

### 84. apps/repack-poc/README.md:61

**Observação:** "O `ErrorBoundary` não é opcional: é ele que evita a tela branca quando o remote está
fora do ar".

**Interpretação:** Afirma que o host da spike isola a falha do remote. A afirmação é corroborada.

### 85. apps/repack/ARCHITECTURE.md:21-50

**Observação:** "Um package merece ser **mini-app (remote)** se responde **sim** a pelo menos uma [das
três perguntas: deploy independente, time/repo isolado, roda sozinho]... Resultado: 2 mini-apps · 6
shared singletons · 3 configs de build · 1 host".

**Interpretação:** Dá o critério que separa mini-apps de pacotes compartilhados e o resultado da
divisão. A afirmação é corroborada.

### 86. apps/repack/ARCHITECTURE.md:128

**Observação:** "há **um único `NavigationContainer`**, no host".

**Interpretação:** Afirma que a navegação dos mini-apps se aninha no container do host. A afirmação
é corroborada.

### 87. apps/repack/ARCHITECTURE.md:129

**Observação:** "`@react-navigation/*` é **shared singleton** — host e remotes compartilham a mesma
instância de navegação ao aninhar".

**Interpretação:** Afirma que a biblioteca de navegação é compartilhada como instância única. A
afirmação é corroborada.

### 88. apps/repack/ARCHITECTURE.md:130

**Observação:** "os tipos de rota vêm de `@mygym/navigation` (shared)".

**Interpretação:** Afirma que os tipos de rota vêm de um pacote compartilhado. A afirmação é
corroborada.

### 89. apps/repack/ARCHITECTURE.md:192,194

**Observação:** "O host tem `remotes` (consome) + `shared` eager; cada mini-app tem `exposes`
(publica) + `shared` não-eager." / "**`eager: true` no host, `false` nos mini-apps** — o host embute
os singletons no boot (fornecedor); os mini-apps consomem os do host."

**Interpretação:** Descreve os papéis de host e mini-apps na configuração de federação. A afirmação é
corroborada.

### 90. apps/repack/ARCHITECTURE.md:201

**Observação:** "**Fonte única de versões via `pnpm catalog`**".

**Interpretação:** Afirma que o catalog é a fonte única das versões compartilhadas. `react`,
`react-native` e `phosphor-react-native` estão no `shared`, mas fora do catalog, com versão escrita
em cada pacote. A afirmação é contradita.

### 91. apps/repack/ARCHITECTURE.md:201

**Observação:** "o helper faz a ponte: **lê a versão instalada** de cada lib (do `package.json` em
`node_modules`) e a entrega ao MF como `requiredVersion`. Resultado: ... verificação do MF
funcionando".

**Interpretação:** Descreve como as versões chegam ao `shared` do host e dos remotes. A afirmação é
corroborada.

### 92. apps/repack/ARCHITECTURE.md:230

**Observação:** "Os remotes entregam **só JS**; rodam dentro do runtime nativo do host, que é o único
binário instalado."

**Interpretação:** Os containers JS dos remotes se confirmam; o host como único binário não tem
artefato. A afirmação é corroborada em parte.

### 93. apps/repack/ARCHITECTURE.md:237

**Observação:** "**Metade nativa → basta estar no binário do host.** ... por isso o `host/package.json`
declara toda dependência nativa que qualquer remote use".

**Interpretação:** Afirma que as dependências nativas dos remotes ficam declaradas no host. A
afirmação é corroborada.

### 94. apps/repack/ARCHITECTURE.md:239

**Observação:** "adicionar uma lib nativa nova num remote **exige rebuild + release do host** (não dá
OTA)".

**Interpretação:** Relata uma consequência para o ciclo de entrega, que o snapshot não registra. A
afirmação fica sem corroboração.

### 95. apps/repack/ARCHITECTURE.md:273-277

**Observação:** "**ScriptManager + `setStorage(AsyncStorage)`**... foi **deferido**...
**CodeSigningPlugin**... documentado como obrigatório em produção real, desligado neste PoC".

**Interpretação:** Afirma que cache e assinatura de bundles não estão configurados. Nenhuma
configuração do snapshot os tem. A afirmação é corroborada.

### 96. apps/repack/ARCHITECTURE.md:324

**Observação:** "cada mini-app builda independentemente (rebuildar check-in não toca host/dashboard)".

**Interpretação:** Afirma o build isolado por mini-app. A afirmação é corroborada.

### 97. apps/repack/ARCHITECTURE.md:334

**Observação:** "o build standalone do Re.Pack não emite o container federado, só o dev server o
produz".

**Interpretação:** Descreve um comportamento do bundler que o snapshot não registra. A afirmação fica
sem corroboração.

### 98. apps/turborepo/ARCHITECTURE.md:267

**Observação:** "Complexidade de config | ... | Alta (webpack + MF + chunks + shared)".

**Interpretação:** Nomeia a tecnologia do Re.Pack como webpack, e os artefatos usam Rspack. A
afirmação é contradita.

### 99. 5097f5f 2026-07-09 (apps/repack/packages/shared-deps/sharedDeps.mjs, apps/repack/ARCHITECTURE.md); e5a77a1 2026-07-09 (scripts/measure-repack.sh, scripts/results/repack_build_isolated.csv)

**Observação:** `5097f5f` ("phosphor no shared") altera só o helper e o `ARCHITECTURE.md`; a versão
anterior do helper não está no clone. Nenhum commit grava medição de chunks; os de `e5a77a1` medem
build isolado.

**Interpretação:** A correção é um passo próprio, mas não se vê o estado anterior nem os números. A
dúvida é só sobre o passado: no snapshot, `phosphor-react-native` está no `shared`.

### 100. 79cf054 2026-06-29 (apps/repack-poc/poc-evidence.png, apps/repack-poc/README.md)

**Observação:** A captura entra no mesmo commit do README que a cita, nunca é removida e está na
árvore do commit do snapshot. A cópia normalizada do snapshot a retirou pelo preset `binaries`. Nenhum
commit da spike configura o `ScriptManager`.

**Interpretação:** A ausência da captura vem da aquisição, não do repositório. A camada que baixa o
bundle continua sendo comportamento em execução. O ponto está esclarecido quanto à captura.

### 101. 22fcdfc 2026-06-24 (apps/repack-poc/remote/App.tsx, apps/repack-poc/remote/index.js, apps/repack-poc/remote/package.json); 79cf054 2026-06-29 (apps/repack-poc/README.md, apps/repack-poc/remote/rspack.config.mjs)

**Observação:** A entrada do remote, com o `App` do template, vem da criação do projeto e não muda até
o snapshot; o README com a frase é escrito depois, junto da `HelloScreen`.

**Interpretação:** A entrada própria é resto do template, e a frase relata o uso na spike. O ponto
está esclarecido.

### 102. 16317fb 2026-06-29 (apps/repack/pnpm-workspace.yaml); 3d31f97 2026-07-04 (apps/repack/packages/host/package.json); d505d6c 2026-07-09 (apps/repack/packages/check-in/package.json, apps/repack/packages/dashboard/package.json); 8232ce1 2026-07-09 (apps/repack/ARCHITECTURE.md); 5097f5f 2026-07-09 (apps/repack/packages/shared-deps/sharedDeps.mjs)

**Observação:** O catalog e os manifestos chegam à forma do snapshot antes de o `ARCHITECTURE.md` ser
criado; `phosphor-react-native` entra no `shared` depois, sem entrar no catalog.

**Interpretação:** A divergência não é resto de um estágio anterior observável. O ponto está
esclarecido para as versões disponíveis.

### 103. .gitignore:18-19; apps/repack/README.md:83

**Observação:** O `.gitignore` raiz ignora `ios/` e `android/`, e o README diz que o `ios/` não é
versionado. Nenhum caminho `*/ios/*` ou `*/android/*` aparece no histórico.

**Interpretação:** A ausência de projeto nativo é explicada pelo próprio snapshot; o host como único
binário continua sem artefato. O ponto está resolvido pelo snapshot.

### 104. 0d870b5 2026-05-23 (apps/turborepo/ARCHITECTURE.md); 22fcdfc 2026-06-24 (apps/repack-poc/host/rspack.config.mjs, apps/repack-poc/remote/rspack.config.mjs)

**Observação:** O `ARCHITECTURE.md` do Turborepo é criado um mês antes do primeiro arquivo Re.Pack e
nunca muda; o primeiro Re.Pack já usa `rspack.config.mjs`, e nenhum arquivo `*webpack*` existe em
commit algum.

**Interpretação:** A linha foi escrita antes da implementação e não foi revista. O ponto está
esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/repack-poc/host/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #7 |
| 2 | 3.4.2 (apps/repack-poc/remote/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8 |
| 3 | 3.4.2 (apps/repack/packages/check-in/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #9 |
| 4 | 3.4.2 (apps/repack/packages/dashboard/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #10 |
| 5 | 3.4.2 (apps/repack/packages/host/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #11 |
| 6 | 3.4.2 (apps/turborepo/package.json:12) | 1 tecnologia | manifesto | — | contexto | fraca | declara apps/turborepo/turbo.json:4-28 |
| 7 | 3.4.2 (apps/repack-poc/host/package.json:13, Evidência); 3.4.3 (apps/repack-poc/host, Marcadores, Entrada e Build); 3.4.4 (apps/repack-poc/host/App.tsx:26, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.6 #3 (Onde é servida); 3.4.7 #13, #16 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #29; configura #57 |
| 8 | 3.4.2 (apps/repack-poc/remote/package.json:13, Evidência); 3.4.3 (apps/repack-poc/remote, Marcadores, Entrada e Build); 3.4.4 (apps/repack-poc/host/App.tsx:26, Observação); 3.4.5 #1 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #15, #16 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #57 |
| 9 | 3.4.2 (apps/repack/packages/check-in/package.json:13, Evidência); 3.4.3 (apps/repack/packages/check-in, Marcadores, Entrada e Build); 3.4.4 (apps/repack/packages/host/src/screens/CheckInTab.tsx:12 e apps/repack/packages/store/src/checkInStore.ts:33, Observação); 3.4.5 #2, #4 (Configuração); 3.4.6 #4 (Artefatos); 3.4.7 #19, #22, #24 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #31; configura #58; configura #60 |
| 10 | 3.4.2 (apps/repack/packages/dashboard/package.json:13, Evidência); 3.4.3 (apps/repack/packages/dashboard, Marcadores, Entrada e Build); 3.4.4 (apps/repack/packages/host/src/screens/DashboardTab.tsx:9 e apps/repack/packages/store/src/checkInStore.ts:33, Observação); 3.4.5 #3, #4 (Configuração); 3.4.6 #5 (Artefatos); 3.4.7 #19, #22, #24 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #32; configura #59; configura #60 |
| 11 | 3.4.2 (apps/repack/packages/host/package.json:13, Evidência); 3.4.3 (apps/repack/packages/host, Marcadores, Entrada e Build); 3.4.4 (apps/repack/packages/host/src/screens/CheckInTab.tsx:12, DashboardTab.tsx:9 e apps/repack/packages/store/src/checkInStore.ts:33, Observação); 3.4.5 #2, #3, #4 (Configuração); 3.4.6 #4, #5 (Onde é servida); 3.4.6 #6 (Artefatos); 3.4.7 #22, #24, #31 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #35; configura #58; configura #59; configura #60 |
| 12 | 3.4.4 (apps/repack/packages/store/src/checkInStore.ts:33, Observação); 3.4.5 #4 (Configuração); 3.4.7 #10, #11, #12, #20, #21, #22, #23, #24 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #31; configura #32; configura #35; configura #60 |
| 13 | 3.4.4 (apps/repack-poc/host/App.tsx:26) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #57 |
| 14 | 3.4.4 (apps/repack/packages/host/src/screens/CheckInTab.tsx:12) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #58 |
| 15 | 3.4.4 (apps/repack/packages/host/src/screens/DashboardTab.tsx:9) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #59 |
| 16 | 3.4.4 (UX/confirma_o_de_check_in/code.html:15) | 3 código | código-fonte | — | contexto | fraca | — |
| 17 | 3.4.4 (UX/dashboard_check_in_ativo_4/code.html:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 18 | 3.4.4 (UX/dashboard_p_s_treino_2/code.html:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 19 | 3.4.4 (UX/dashboard_p_s_treino_menu_unificado/code.html:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (UX/finaliza_o_de_treino/code.html:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 21 | 3.4.4 (UX/listagem_de_academias/code.html:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 22 | 3.4.4 (apps/repack-poc/host/App.tsx:35) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #57 |
| 23 | 3.4.4 (apps/repack/packages/host/src/screens/CheckInTab.tsx:21) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #58 |
| 24 | 3.4.4 (apps/repack/packages/host/src/screens/DashboardTab.tsx:16) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #59 |
| 25 | 3.4.4 (apps/repack/packages/host/src/navigation/RootNavigator.tsx:52) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #58; implementa #59 |
| 26 | 3.4.4 (apps/repack/packages/store/src/checkInStore.ts:33) | 3 código | código-fonte | events | arquitetural | moderada | implementa #60 |
| 27 | 3.4.3 (apps/monolith) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 28 | 3.4.3 (apps/repack) | 4 estrutura | diretório | — | contexto | fraca | — |
| 29 | 3.4.3 (apps/repack-poc/host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 30 | 3.4.3 (apps/repack-poc/remote) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (apps/repack/packages/check-in) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 32 | 3.4.3 (apps/repack/packages/dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.3 (apps/repack/packages/data) | 4 estrutura | diretório | — | contexto | fraca | — |
| 34 | 3.4.3 (apps/repack/packages/eslint-config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 35 | 3.4.3 (apps/repack/packages/host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 36 | 3.4.3 (apps/repack/packages/jest-config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 37 | 3.4.3 (apps/repack/packages/navigation) | 4 estrutura | diretório | — | contexto | fraca | — |
| 38 | 3.4.3 (apps/repack/packages/shared-deps) | 4 estrutura | diretório | — | contexto | fraca | — |
| 39 | 3.4.3 (apps/repack/packages/store) | 4 estrutura | diretório | — | contexto | fraca | — |
| 40 | 3.4.3 (apps/repack/packages/theme) | 4 estrutura | diretório | — | contexto | fraca | — |
| 41 | 3.4.3 (apps/repack/packages/tsconfig) | 4 estrutura | diretório | — | contexto | fraca | — |
| 42 | 3.4.3 (apps/repack/packages/ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 43 | 3.4.3 (apps/repack/packages/utils) | 4 estrutura | diretório | — | contexto | fraca | — |
| 44 | 3.4.3 (apps/turborepo) | 4 estrutura | diretório | — | contexto | fraca | — |
| 45 | 3.4.3 (apps/turborepo/apps/mygym) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 46 | 3.4.3 (apps/turborepo/packages/data) | 4 estrutura | diretório | — | contexto | fraca | — |
| 47 | 3.4.3 (apps/turborepo/packages/eslint-config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 48 | 3.4.3 (apps/turborepo/packages/feature-check-in) | 4 estrutura | diretório | — | contexto | fraca | — |
| 49 | 3.4.3 (apps/turborepo/packages/feature-dashboard) | 4 estrutura | diretório | — | contexto | fraca | — |
| 50 | 3.4.3 (apps/turborepo/packages/jest-config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 51 | 3.4.3 (apps/turborepo/packages/navigation) | 4 estrutura | diretório | — | contexto | fraca | — |
| 52 | 3.4.3 (apps/turborepo/packages/store) | 4 estrutura | diretório | — | contexto | fraca | — |
| 53 | 3.4.3 (apps/turborepo/packages/theme) | 4 estrutura | diretório | — | contexto | fraca | — |
| 54 | 3.4.3 (apps/turborepo/packages/tsconfig) | 4 estrutura | diretório | — | contexto | fraca | — |
| 55 | 3.4.3 (apps/turborepo/packages/ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 56 | 3.4.3 (apps/turborepo/packages/utils) | 4 estrutura | diretório | — | contexto | fraca | — |
| 57 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #29; liga #30 |
| 58 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #35; liga #31 |
| 59 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #35; liga #32 |
| 60 | 3.4.5 #4 | 5 composição | código-fonte | events | arquitetural | forte | liga #31; liga #32 |
| 61 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #27 |
| 62 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #29 |
| 63 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #30 |
| 64 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #31 |
| 65 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #32 |
| 66 | 3.4.6 #6 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #35 |
| 67 | 3.4.6 #7 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #45 |
| 68 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #60 |
| 69 | 3.4.7 #2 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #31; corrobora #32; corrobora #48; corrobora #49; corrobora #60 |
| 70 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #27 |
| 71 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #45; corrobora #48; corrobora #49; corrobora #67 |
| 72 | 3.4.7 #5 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #58; corrobora #59; corrobora #14; corrobora #15 |
| 73 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 74 | 3.4.7 #7 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #62; corrobora #64; corrobora #65; corrobora #66; corrobora apps/repack/packages/host/app.json:1-4 |
| 75 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora apps/repack/packages/dashboard/App.tsx:1-22 |
| 76 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #23; corrobora #24 |
| 77 | 3.4.7 #10 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #12; corrobora #60 |
| 78 | 3.4.7 #11 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #12 |
| 79 | 3.4.7 #12 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora em parte #12 |
| 80 | 3.4.7 #13 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora em parte #7; corrobora em parte #57 |
| 81 | 3.4.7 #14 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #57; corrobora #13 |
| 82 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #63 |
| 83 | 3.4.7 #16 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #7; corrobora #8 |
| 84 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22 |
| 85 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora #32; corrobora #33; corrobora #37; corrobora #39; corrobora #40; corrobora #42; corrobora #43; corrobora #12 |
| 86 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/repack/packages/host/App.tsx:19-21; corrobora #9; corrobora #10; corrobora #58; corrobora #59 |
| 87 | 3.4.7 #20 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #12; corrobora #25 |
| 88 | 3.4.7 #21 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora apps/repack/packages/navigation/src/params.ts:1-14; corrobora #12 |
| 89 | 3.4.7 #22 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #11; corrobora #9; corrobora #10; corrobora #12; corrobora #60 |
| 90 | 3.4.7 #23 | 7 documentação | documentação | — | tecnológica | fraca | contradiz apps/repack/pnpm-workspace.yaml:7-17; contradiz apps/repack/packages/host/package.json:25-27; contradiz apps/repack/packages/check-in/package.json:25,27-28; contradiz apps/repack/packages/dashboard/package.json:24-26 |
| 91 | 3.4.7 #24 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #12; corrobora #9; corrobora #10; corrobora #11 |
| 92 | 3.4.7 #25 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #64; corrobora em parte #65; corrobora em parte #58; corrobora em parte #59 |
| 93 | 3.4.7 #26 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/repack/packages/host/package.json:20,28-31 |
| 94 | 3.4.7 #27 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 95 | 3.4.7 #28 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #9; corrobora #10; corrobora #11 |
| 96 | 3.4.7 #29 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #64; corrobora #65; corrobora #66; corrobora scripts/measure-repack.sh:3-5 |
| 97 | 3.4.7 #30 | 7 documentação | documentação | module-federation | tecnológica | fraca | — |
| 98 | 3.4.7 #31 | 7 documentação | documentação | module-federation | tecnológica | fraca | contradiz #11 |
| 99 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #79 |
| 100 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #80 |
| 101 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #82; explica #30 |
| 102 | 3.4.8 #4 | 8 histórico | histórico | — | tecnológica | fraca | explica #90 |
| 103 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #92 |
| 104 | 3.4.8 #6 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #98 |

## Resumo

Observações: 104. Dimensões (tecnologia: 6, configuração: 6, código: 14, estrutura: 30, composição: 4, build-deploy: 7, documentação: 31, histórico: 6). Força (forte: 10, moderada: 22, fraca: 72, ambígua: 0). Evidência (tecnológica: 25, arquitetural: 48, contexto: 31).

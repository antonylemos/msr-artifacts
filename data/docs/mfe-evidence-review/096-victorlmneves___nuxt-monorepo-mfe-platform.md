---
schema: 1
id: 1253620135
full_name: victorlmneves/_nuxt-monorepo-mfe-platform
commit: 84ffc2429b311b3c7565ffd35de4de48dafd5929
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

# 096 — victorlmneves/_nuxt-monorepo-mfe-platform

## Leitura do repositório

Monorepo pnpm com um shell Nuxt 3 e quatro remotes Vue com webpack, dois em Vue 2 (admin e checkout) e dois em Vue 3 (dashboard e profile). Cada um tem manifesto, entrada e build próprios (#55 a #59, #70 a #74). Nenhuma dependência declara uma tecnologia de MFE: as cinco linhas da revisão de dependências são o pacote interno `@mfe/shared`, captado pelo nome (#1 a #5), e o `turbo` fica ambíguo, porque só os scripts do `package.json` o chamam (#6). A cadeia começa, então, na configuração:
- **Configuração:** cada remote configura o `ModuleFederationPlugin` com nome próprio, `remoteEntry.js`, `./App` exposto e `vue` (e, nos Vue 3, `vuetify`) como `singleton` (#7 a #10).
- **Código do host:** o shell não tem o plugin. O registro de `packages/shared` nomeia os quatro remotes, com rota, URL do `remoteEntry.js`, nome do container e módulo exposto (#53). A página catch-all escolhe o descritor pela rota e chama a montagem (#52). O loader injeta o script (#49), lê o container, chama `init({})` e `get('./App')` (#15, #16) e chama `mount`/`unmount` (#45, #46).
- **Código dos remotes:** o `bootstrap.js` exposto exporta `mount` e `unmount` (#17 a #24, repetidos por sobreposição de padrões em #25, #28, #30, #33, #35, #38, #40, #43).
- **Relações:** isso resulta em quatro relações host → remote ativas por Module Federation (#62 a #65). A elas se somam quatro relações de eventos de janela, do shell para cada remote (#66 a #69), feitas pelo barramento de `packages/shared` (#50, #51).

Sinais que não são composição: o `import('./bootstrap')` e a chamada `mount` de cada `src/index.js` são a execução standalone de cada remote (#11 a #14, #29, #34, #39, #44); o `.$mount(el)` e o `app.mount(el)` são a renderização interna do Vue (#27, #32, #37, #42); o `onAuthLogout(() => unmount(el))` é a desmontagem da própria unidade ao receber o evento (#26, #31, #36, #41); e as duas linhas da interface `RemoteMount` são declarações de tipo (#47, #48). A raiz, `packages/shared` e `scripts` não são unidades (#54, #60, #61).

Os cinco builds são separados, mas não há deploy no snapshot (#70 a #74): os endereços são todos `localhost`, e o `publicPath` dos remotes fica fixo em `http://localhost:300x/` também em produção (#7 a #10, #106).

A documentação confere com os artefatos em 31 das 35 afirmações. As quatro contradições estão no que se diz compartilhado: o cabeçalho, que só o shell usa (#80, #90), e o escopo `singleton`, que nem isola o Vuetify 2 (#87) nem leva o Vue 3 do shell aos remotes, porque o shell inicia cada container com escopo vazio (#89). O próprio comentário do loader confirma o escopo vazio (#104). O histórico não resolve as duas primeiras dúvidas: o código das aplicações só aparece como arquivo no commit do snapshot, e o conteúdo anterior, num gitlink, não está no clone (#111, #112). Ele esclarece que o título "only shared thing" sempre conviveu com o pacote compartilhado (#113) e que o `turbo` nunca teve outra invocação (#110).

## Observações

### 1. apps/mfe-vue2-admin/package.json:13; apps/mfe-vue2-admin/src/bootstrap.js:3, 27-30

**Observação:** `@mfe/shared` (`workspace:*`) está declarada em `dependencies`. O `bootstrap.js` importa `onAuthChanged` e `onAuthLogout` de `@mfe/shared/auth` e os usa no `mount`.

**Interpretação:** É o pacote interno do workspace, captado pela tecnologia `mfe-term` pelo nome. A declaração, sozinha, não mostra um mecanismo de MFE; o uso fica no código.

### 2. apps/mfe-vue2-checkout/package.json:13; apps/mfe-vue2-checkout/src/bootstrap.js:3, 35-38

**Observação:** `@mfe/shared` (`workspace:*`) está declarada em `dependencies`. O `bootstrap.js` importa `onAuthChanged` e `onAuthLogout` de `@mfe/shared/auth` e os usa no `mount`.

**Interpretação:** É o pacote interno do workspace, captado pelo nome. A declaração, sozinha, não mostra um mecanismo de MFE.

### 3. apps/mfe-vue3-dashboard/package.json:14; apps/mfe-vue3-dashboard/src/bootstrap.js:8, 29-30

**Observação:** `@mfe/shared` (`workspace:*`) está declarada em `dependencies`. O `bootstrap.js` importa `onAuthChanged` e `onAuthLogout` de `@mfe/shared/auth` e os usa no `mount`.

**Interpretação:** É o pacote interno do workspace, captado pelo nome. A declaração, sozinha, não mostra um mecanismo de MFE.

### 4. apps/mfe-vue3-profile/package.json:14; apps/mfe-vue3-profile/src/bootstrap.js:8, 33-36

**Observação:** `@mfe/shared` (`workspace:*`) está declarada em `dependencies`. O `bootstrap.js` importa `onAuthChanged` e `onAuthLogout` de `@mfe/shared/auth` e os usa no `mount`.

**Interpretação:** É o pacote interno do workspace, captado pelo nome. A declaração, sozinha, não mostra um mecanismo de MFE.

### 5. apps/shell/package.json:13; apps/shell/pages/app/[...mfe].vue:30, 40-41; apps/shell/stores/auth.ts:3

**Observação:** `@mfe/shared` (`workspace:*`) está declarada em `dependencies`. A página catch-all importa `MFE_REGISTRY` e o usa para resolver a rota; a store de autenticação importa `broadcastLogin` e `broadcastLogout` de `@mfe/shared/auth`.

**Interpretação:** É o pacote interno do workspace, captado pelo nome. O shell usa dele o registro dos remotes e o envio dos eventos, que ficam no código.

### 6. package.json:34; turbo.json:3-18

**Observação:** `turbo` (`^2.0.0`) está declarada em `devDependencies`. `turbo.json` define as tasks `dev`, `build`, `lint` e `clean`. A única invocação de `turbo` está nos scripts do `package.json` da raiz, sem workflow de CI ou script de automação que o chame.

**Interpretação:** É a ferramenta de monorepo, não uma tecnologia de MFE. Pela regra da revisão de dependências, o uso fica indeterminado: o Turborepo pode ser a orquestração efetiva do build ou só um atalho de scripts.

### 7. apps/mfe-vue2-admin/webpack.config.js:8-79

**Observação:** `ModuleFederationPlugin` com `name: 'mfe_admin'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/bootstrap.js' }` e `vue` compartilhado como `singleton` (`^2.7.0`) (:64-71). O `output.publicPath` é `http://localhost:3002/` (:14), e o `devServer` usa a porta 3002 (:75). Um `NormalModuleReplacementPlugin` redireciona os imports de `vuetify` para o `dist` pré-construído (:60-63).

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece seu módulo de montagem a um host. O Vuetify 2 fica fora do escopo compartilhado.

### 8. apps/mfe-vue2-checkout/webpack.config.js:8-81

**Observação:** `ModuleFederationPlugin` com `name: 'mfe_checkout'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/bootstrap.js' }` e `vue` compartilhado como `singleton` (`^2.7.0`) (:66-73). O `output.publicPath` é `http://localhost:3001/` (:14), e o `devServer` usa a porta 3001 (:77). Um `NormalModuleReplacementPlugin` redireciona os imports de `vuetify` para o `dist` pré-construído (:62-65).

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece seu módulo de montagem a um host. O Vuetify 2 fica fora do escopo compartilhado.

### 9. apps/mfe-vue3-dashboard/webpack.config.js:7-69

**Observação:** `ModuleFederationPlugin` com `name: 'mfe_dashboard'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/bootstrap.js' }` e `vue` (`^3.5.0`) e `vuetify` (`^3.7.0`) compartilhados como `singleton` (:53-61). O `output.publicPath` é `http://localhost:3004/` (:13), e o `devServer` usa a porta 3004 (:65).

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece seu módulo de montagem a um host.

### 10. apps/mfe-vue3-profile/webpack.config.js:7-69

**Observação:** `ModuleFederationPlugin` com `name: 'mfe_profile'`, `filename: 'remoteEntry.js'`, `exposes: { './App': './src/bootstrap.js' }` e `vue` (`^3.5.0`) e `vuetify` (`^3.7.0`) compartilhados como `singleton` (:53-61). O `output.publicPath` é `http://localhost:3003/` (:13), e o `devServer` usa a porta 3003 (:65).

**Interpretação:** A unidade está configurada como remote de Module Federation e oferece seu módulo de montagem a um host.

### 11. apps/mfe-vue2-admin/src/index.js:1

**Observação:** `import('./bootstrap').then(({ mount }) => {`, na entrada standalone de desenvolvimento.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 12. apps/mfe-vue2-checkout/src/index.js:5

**Observação:** `import('./bootstrap').then(({ mount }) => {`. O comentário de :1-3 diz que o arquivo só é usado no modo standalone.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 13. apps/mfe-vue3-dashboard/src/index.js:1

**Observação:** `import('./bootstrap').then(({ mount }) => {`, na entrada standalone de desenvolvimento.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 14. apps/mfe-vue3-profile/src/index.js:1

**Observação:** `import('./bootstrap').then(({ mount }) => {`, na entrada standalone de desenvolvimento.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 15. apps/shell/composables/useMfeLoader.ts:13-49

**Observação:** `async function loadRemoteModule(descriptor: MfeDescriptor)` injeta o `remoteEntry.js` do descritor (:18), lê o container em `window[descriptor.remoteName]` (:21), chama `container.init({})` (:32), obtém `container.get(descriptor.exposedModule)` e executa a factory (:38-40), e exige uma função `mount` (:42-46).

**Interpretação:** O host implementa à mão o consumo de containers de Module Federation, para o remote que receber por parâmetro.

### 16. apps/shell/composables/useMfeLoader.ts:79

**Observação:** `const remote = await loadRemoteModule(descriptor)`, dentro de `mountMfe` (:71-87).

**Interpretação:** O host resolve o container do remote que recebe por parâmetro antes de montá-lo.

### 17. apps/mfe-vue2-admin/src/bootstrap.js:24-39

**Observação:** `export function mount(el, props)`, no arquivo exposto como `./App`. A função assina os eventos de autenticação e cria a instância Vue 2 do admin no elemento recebido.

**Interpretação:** O admin oferece a função de montagem ao host.

### 18. apps/mfe-vue2-admin/src/bootstrap.js:41-45

**Observação:** `export function unmount(el)` destrói a instância Vue e cancela as assinaturas.

**Interpretação:** O admin oferece a função de desmontagem que completa o ciclo de vida.

### 19. apps/mfe-vue2-checkout/src/bootstrap.js:32-47

**Observação:** `export function mount(el, props)`, no arquivo exposto como `./App`. A função assina os eventos de autenticação e cria a instância Vue 2 do checkout no elemento recebido.

**Interpretação:** O checkout oferece a função de montagem ao host.

### 20. apps/mfe-vue2-checkout/src/bootstrap.js:49-53

**Observação:** `export function unmount(el)` destrói a instância Vue e cancela as assinaturas.

**Interpretação:** O checkout oferece a função de desmontagem que completa o ciclo de vida.

### 21. apps/mfe-vue3-dashboard/src/bootstrap.js:26-34

**Observação:** `export function mount(el, props)`, no arquivo exposto como `./App`. A função assina os eventos de autenticação e cria o app Vue 3 do dashboard com `createApp` no elemento recebido.

**Interpretação:** O dashboard oferece a função de montagem ao host.

### 22. apps/mfe-vue3-dashboard/src/bootstrap.js:36-40

**Observação:** `export function unmount(el)` desmonta o app Vue 3 e cancela as assinaturas.

**Interpretação:** O dashboard oferece a função de desmontagem que completa o ciclo de vida.

### 23. apps/mfe-vue3-profile/src/bootstrap.js:28-41

**Observação:** `export function mount(el, props)`, no arquivo exposto como `./App`. A função assina os eventos de autenticação e cria o app Vue 3 do profile com `createApp` no elemento recebido.

**Interpretação:** O profile oferece a função de montagem ao host.

### 24. apps/mfe-vue3-profile/src/bootstrap.js:43-47

**Observação:** `export function unmount(el)` desmonta o app Vue 3 e cancela as assinaturas.

**Interpretação:** O profile oferece a função de desmontagem que completa o ciclo de vida.

### 25. apps/mfe-vue2-admin/src/bootstrap.js:24

**Observação:** É a mesma declaração de `mount` do #17, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O admin oferece a função de montagem, sem chamá-la.

**Nota:** A 3.4.4 manteve as duas linhas por sobreposição de padrões, e a 3.5 mantém uma observação por linha. Vale também para #28, #30, #33, #35, #38, #40 e #43.

### 26. apps/mfe-vue2-admin/src/bootstrap.js:30

**Observação:** `logoutUnsub = onAuthLogout(() => unmount(el))`, dentro do `mount`.

**Interpretação:** O admin assina o evento de logout e desmonta a si mesmo; a desmontagem é interna à unidade.

### 27. apps/mfe-vue2-admin/src/bootstrap.js:32-38

**Observação:** `new Vue({ ... render(h) { return h(App, ...) } }).$mount(el)`.

**Interpretação:** É a renderização interna do `App.vue` do admin, sem mecanismo de MFE.

### 28. apps/mfe-vue2-admin/src/bootstrap.js:41

**Observação:** É a mesma declaração de `unmount` do #18, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O admin oferece a função de desmontagem, sem chamá-la.

### 29. apps/mfe-vue2-admin/src/index.js:2-8

**Observação:** `mount(el, {...})` no `#mfe-app` da página standalone, com um usuário fictício e um `onLogout` que só escreve no console.

**Interpretação:** É uma montagem interna à unidade, para rodá-la sozinha.

### 30. apps/mfe-vue2-checkout/src/bootstrap.js:32

**Observação:** É a mesma declaração de `mount` do #19, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O checkout oferece a função de montagem, sem chamá-la.

### 31. apps/mfe-vue2-checkout/src/bootstrap.js:38

**Observação:** `logoutUnsub = onAuthLogout(() => unmount(el))`, dentro do `mount`.

**Interpretação:** O checkout assina o evento de logout e desmonta a si mesmo; a desmontagem é interna à unidade.

### 32. apps/mfe-vue2-checkout/src/bootstrap.js:40-46

**Observação:** `new Vue({ vuetify, ... render(h) { return h(App, ...) } }).$mount(el)`.

**Interpretação:** É a renderização interna do `App.vue` do checkout, sem mecanismo de MFE.

### 33. apps/mfe-vue2-checkout/src/bootstrap.js:49

**Observação:** É a mesma declaração de `unmount` do #20, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O checkout oferece a função de desmontagem, sem chamá-la.

### 34. apps/mfe-vue2-checkout/src/index.js:6-18

**Observação:** `mount(el, {...})` no `#mfe-app` da página standalone, com um usuário fictício.

**Interpretação:** É uma montagem interna à unidade, para rodá-la sozinha.

### 35. apps/mfe-vue3-dashboard/src/bootstrap.js:26

**Observação:** É a mesma declaração de `mount` do #21, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O dashboard oferece a função de montagem, sem chamá-la.

### 36. apps/mfe-vue3-dashboard/src/bootstrap.js:30

**Observação:** `logoutUnsub = onAuthLogout(() => unmount(el))`, dentro do `mount`.

**Interpretação:** O dashboard assina o evento de logout e desmonta a si mesmo; a desmontagem é interna à unidade.

### 37. apps/mfe-vue3-dashboard/src/bootstrap.js:31-33

**Observação:** `app = createApp(App, { user: userRef, onLogout })`, `app.use(vuetify)` e `app.mount(el)`.

**Interpretação:** É a renderização interna do `App.vue` do dashboard, sem mecanismo de MFE.

### 38. apps/mfe-vue3-dashboard/src/bootstrap.js:36

**Observação:** É a mesma declaração de `unmount` do #22, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O dashboard oferece a função de desmontagem, sem chamá-la.

### 39. apps/mfe-vue3-dashboard/src/index.js:2-8

**Observação:** `mount(el, {...})` no `#mfe-app` da página standalone, com um usuário fictício.

**Interpretação:** É uma montagem interna à unidade, para rodá-la sozinha.

### 40. apps/mfe-vue3-profile/src/bootstrap.js:28

**Observação:** É a mesma declaração de `mount` do #23, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O profile oferece a função de montagem, sem chamá-la.

### 41. apps/mfe-vue3-profile/src/bootstrap.js:36

**Observação:** `logoutUnsub = onAuthLogout(() => unmount(el))`, dentro do `mount`.

**Interpretação:** O profile assina o evento de logout e desmonta a si mesmo; a desmontagem é interna à unidade.

### 42. apps/mfe-vue3-profile/src/bootstrap.js:38-40

**Observação:** `app = createApp(App, { user: userRef, onLogout })`, `app.use(vuetify)` e `app.mount(el)`.

**Interpretação:** É a renderização interna do `App.vue` do profile, sem mecanismo de MFE.

### 43. apps/mfe-vue3-profile/src/bootstrap.js:43

**Observação:** É a mesma declaração de `unmount` do #24, reconhecida pelo padrão de chamada de montagem.

**Interpretação:** O profile oferece a função de desmontagem, sem chamá-la.

### 44. apps/mfe-vue3-profile/src/index.js:2-8

**Observação:** `mount(el, {...})` no `#mfe-app` da página standalone, com um usuário fictício.

**Interpretação:** É uma montagem interna à unidade, para rodá-la sozinha.

### 45. apps/shell/composables/useMfeLoader.ts:76-87; apps/shell/pages/app/[...mfe].vue:24, 47-48

**Observação:** `remote.mount(el, props)`, logo depois de `loadRemoteModule`. O elemento é o `div` de montagem da página catch-all, e as props são `user` e `onLogout`.

**Interpretação:** O host monta no seu DOM o remote resolvido, qualquer que seja.

### 46. apps/shell/composables/useMfeLoader.ts:89-92

**Observação:** `if (remote) remote.unmount(el)`, sobre o remote em cache. `unmountMfe` é chamado pela página catch-all em :54 e :59.

**Interpretação:** O host desmonta o remote que montou, qualquer que seja.

### 47. packages/shared/src/types/index.ts:26

**Observação:** `mount(el: HTMLElement, props: RemoteMountProps): void`, na interface `RemoteMount` (:25-28), sob o comentário "Contract every remote must expose via its MF module".

**Interpretação:** É a assinatura de tipo do contrato de montagem, e não uma chamada.

### 48. packages/shared/src/types/index.ts:27

**Observação:** `unmount(el: HTMLElement): void`, na mesma interface `RemoteMount`.

**Interpretação:** É a assinatura de tipo do contrato de desmontagem, e não uma chamada.

### 49. apps/shell/composables/useMfeLoader.ts:52-64; apps/shell/composables/useMfeLoader.ts:18

**Observação:** `document.createElement('script')` com `src` igual à URL do descritor, anexado ao `head`; `injectScript` é chamado por `loadRemoteModule` com `descriptor.remoteUrl`.

**Interpretação:** O host carrega em runtime o `remoteEntry.js` do remote, como transporte do container de Module Federation.

### 50. packages/shared/src/auth/index.ts:10-16; apps/shell/stores/auth.ts:28

**Observação:** `window.dispatchEvent(new CustomEvent<UserState>(AUTH_CHANGED, { detail: user }))` em `broadcastLogin`, com `AUTH_CHANGED = 'mfe:auth-changed'` (:3). A store de autenticação do shell chama `broadcastLogin(user)`, com o comentário "notifies Vue 2 + Vue 3 remotes via event bus".

**Interpretação:** O shell envia o usuário autenticado por um evento de janela que qualquer unidade pode escutar.

### 51. packages/shared/src/auth/index.ts:18-24; apps/shell/stores/auth.ts:34

**Observação:** `window.dispatchEvent(new CustomEvent(AUTH_LOGOUT))` em `broadcastLogout`, com `AUTH_LOGOUT = 'mfe:auth-logout'` (:4). O `logout` da store do shell chama `broadcastLogout()`.

**Interpretação:** O shell anuncia o logout por um evento de janela que qualquer unidade pode escutar.

### 52. apps/shell/pages/app/[...mfe].vue:46; apps/shell/pages/app/[...mfe].vue:40-42, 24

**Observação:** `await loader.mountMfe(mountEl.value, mfe.value, {...})` em `onMounted`. `mfe` é o descritor do registro cuja `route` é prefixo do caminho atual, e `mountEl` é o `div` de montagem.

**Interpretação:** A página do host monta o remote que a rota escolheu no registro, qualquer que seja.

### 53. packages/shared/src/registry.ts:12-61

**Observação:** `export const MFE_REGISTRY: MfeDescriptor[]` com quatro descritores: checkout `/app/checkout` e `mfe_checkout` (:14-23), admin `/app/admin` e `mfe_admin` (:26-35), profile `/app/profile` e `mfe_profile` (:38-47) e dashboard `/app/dashboard` e `mfe_dashboard` (:50-59). Cada um tem `remoteUrl` do `remoteEntry.js`, por variável de ambiente ou `http://localhost:3001` a `3004` (:5-9), e `exposedModule: './App'`.

**Interpretação:** O host declara, em código, quais unidades usa, onde encontrá-las e em que rota cada uma aparece.

### 54. .; package.json:1-52; package.json:19

**Observação:** É o manifesto da raiz, só com devDependencies de tooling e um `build` que é `turbo run build`. Não tem entrada nem configuração de build próprias.

**Interpretação:** É a raiz de coordenação do workspace, não uma unidade frontend.

### 55. apps/mfe-vue2-admin; apps/mfe-vue2-admin/package.json:1-32; apps/mfe-vue2-admin/webpack.config.js:9, 8-79; apps/mfe-vue2-admin/src/index.js:1-8; apps/mfe-vue2-admin/src/bootstrap.js:32-38; apps/mfe-vue2-admin/package.json:7

**Observação:** É uma aplicação Vue 2 com manifesto, configuração webpack, entrada (`./src/index.js`, que carrega o bootstrap e monta a UI) e `webpack --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 56. apps/mfe-vue2-checkout; apps/mfe-vue2-checkout/package.json:1-33; apps/mfe-vue2-checkout/webpack.config.js:9, 8-81; apps/mfe-vue2-checkout/src/index.js:5-18; apps/mfe-vue2-checkout/src/bootstrap.js:40-46; apps/mfe-vue2-checkout/package.json:7

**Observação:** É uma aplicação Vue 2 com manifesto, configuração webpack, entrada e `webpack --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 57. apps/mfe-vue3-dashboard; apps/mfe-vue3-dashboard/package.json:1-32; apps/mfe-vue3-dashboard/webpack.config.js:8, 7-69; apps/mfe-vue3-dashboard/src/index.js:1-8; apps/mfe-vue3-dashboard/src/bootstrap.js:31-33; apps/mfe-vue3-dashboard/package.json:7

**Observação:** É uma aplicação Vue 3 com manifesto, configuração webpack, entrada e `webpack --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 58. apps/mfe-vue3-profile; apps/mfe-vue3-profile/package.json:1-32; apps/mfe-vue3-profile/webpack.config.js:8, 7-69; apps/mfe-vue3-profile/src/index.js:1-8; apps/mfe-vue3-profile/src/bootstrap.js:38-40; apps/mfe-vue3-profile/package.json:7

**Observação:** É uma aplicação Vue 3 com manifesto, configuração webpack, entrada e `webpack --mode production` próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 59. apps/shell; apps/shell/package.json:1-35; apps/shell/app.vue:1-5; apps/shell/pages/app/[...mfe].vue:2-3; apps/shell/nuxt.config.ts:58-91; apps/shell/package.json:7

**Observação:** É uma aplicação Nuxt 3 com manifesto, raiz `app.vue` com `<NuxtPage />`, páginas por rota, `defineNuxtConfig` com `ssr: true` e `nuxt build` próprios.

**Interpretação:** É uma unidade frontend com limite próprio, no papel de host.

### 60. packages/shared; packages/shared/package.json:1-11; packages/shared/package.json:5-10

**Observação:** É um pacote com manifesto próprio que exporta `./src/index.ts`, `./auth` e `./types`: tipos, eventos de autenticação e o registro. Não tem entrada de aplicação nem build.

**Interpretação:** É um pacote compartilhado do workspace, não uma unidade frontend.

### 61. scripts; scripts/webpack.aliases.js:13-17

**Observação:** Tem os aliases webpack usados pelos remotes, um servidor estático de `dist`, um health check e um script de início local. Não tem manifesto nem entrada de aplicação.

**Interpretação:** São utilitários de build e de desenvolvimento, não uma unidade frontend.

### 62. packages/shared/src/registry.ts:26-35, 5-9; apps/shell/pages/app/[...mfe].vue:40-49; apps/shell/composables/useMfeLoader.ts:13-49, 79-80, 91; apps/mfe-vue2-admin/webpack.config.js:64-67; apps/mfe-vue2-admin/src/bootstrap.js:24, 41

**Observação:** O descritor `admin` pede o container `mfe_admin` e o módulo `./App`, em `http://localhost:3002/remoteEntry.js` quando não há variável de ambiente. O remote se declara `mfe_admin`, gera `remoteEntry.js` e expõe `./App`, com `mount` e `unmount`. A rota `/app/admin` leva à página que carrega o container e chama `mount` no seu `div`.

**Interpretação:** É uma relação host → remote ativa por Module Federation.

### 63. packages/shared/src/registry.ts:14-23, 5-9; apps/shell/pages/app/[...mfe].vue:40-49; apps/shell/composables/useMfeLoader.ts:13-49, 79-80, 91; apps/mfe-vue2-checkout/webpack.config.js:66-69; apps/mfe-vue2-checkout/src/bootstrap.js:32, 49

**Observação:** O descritor `checkout` pede o container `mfe_checkout` e o módulo `./App`, em `http://localhost:3001/remoteEntry.js` quando não há variável de ambiente. O remote se declara `mfe_checkout`, gera `remoteEntry.js` e expõe `./App`, com `mount` e `unmount`.

**Interpretação:** É uma relação host → remote ativa por Module Federation.

### 64. packages/shared/src/registry.ts:50-59, 5-9; apps/shell/pages/app/[...mfe].vue:40-49; apps/shell/composables/useMfeLoader.ts:13-49, 79-80, 91; apps/mfe-vue3-dashboard/webpack.config.js:53-56; apps/mfe-vue3-dashboard/src/bootstrap.js:26, 36

**Observação:** O descritor `dashboard` pede o container `mfe_dashboard` e o módulo `./App`, em `http://localhost:3004/remoteEntry.js` quando não há variável de ambiente. O remote se declara `mfe_dashboard`, gera `remoteEntry.js` e expõe `./App`, com `mount` e `unmount`.

**Interpretação:** É uma relação host → remote ativa por Module Federation. O shell trata o remote Vue 3 pelo mesmo contrato dos Vue 2.

### 65. packages/shared/src/registry.ts:38-47, 5-9; apps/shell/pages/app/[...mfe].vue:40-49; apps/shell/composables/useMfeLoader.ts:13-49, 79-80, 91; apps/mfe-vue3-profile/webpack.config.js:53-56; apps/mfe-vue3-profile/src/bootstrap.js:28, 43

**Observação:** O descritor `profile` pede o container `mfe_profile` e o módulo `./App`, em `http://localhost:3003/remoteEntry.js` quando não há variável de ambiente. O remote se declara `mfe_profile`, gera `remoteEntry.js` e expõe `./App`, com `mount` e `unmount`.

**Interpretação:** É uma relação host → remote ativa por Module Federation.

### 66. apps/shell/stores/auth.ts:28, 34; packages/shared/src/auth/index.ts:14, 22, 28-43; apps/mfe-vue2-admin/src/bootstrap.js:27-30

**Observação:** O shell dispara `mfe:auth-changed` ao sincronizar a sessão e `mfe:auth-logout` no logout. O admin assina os dois eventos no seu `mount`: o primeiro atualiza o usuário da instância, o segundo desmonta o remote. O admin não envia eventos.

**Interpretação:** É uma relação de comunicação por eventos, ativa, do shell para o admin.

### 67. apps/shell/stores/auth.ts:28, 34; packages/shared/src/auth/index.ts:14, 22, 28-43; apps/mfe-vue2-checkout/src/bootstrap.js:35-38

**Observação:** O shell dispara os dois eventos, e o checkout os assina no seu `mount` e só recebe.

**Interpretação:** É uma relação de comunicação por eventos, ativa, do shell para o checkout.

### 68. apps/shell/stores/auth.ts:28, 34; packages/shared/src/auth/index.ts:14, 22, 28-43; apps/mfe-vue3-dashboard/src/bootstrap.js:29-30

**Observação:** O shell dispara os dois eventos, e o dashboard os assina no seu `mount`, atualizando o `ref` do usuário, e só recebe.

**Interpretação:** É uma relação de comunicação por eventos, ativa, do shell para o dashboard.

### 69. apps/shell/stores/auth.ts:28, 34; packages/shared/src/auth/index.ts:14, 22, 28-43; apps/mfe-vue3-profile/src/bootstrap.js:33-36

**Observação:** O shell dispara os dois eventos, e o profile os assina no seu `mount` e só recebe.

**Interpretação:** É uma relação de comunicação por eventos, ativa, do shell para o profile.

### 70. apps/mfe-vue2-admin/package.json:7; apps/mfe-vue2-admin/webpack.config.js:11-16, 64-71; package.json:19, 27

**Observação:** Tem `webpack --config webpack.config.js --mode production` e saída em `dist` próprios, com o container `mfe_admin` em `remoteEntry.js`; o `turbo run build` da raiz só dispara esse build. O único servidor do `dist` é o script de desenvolvimento `dev:remote:admin`, na porta 3002. Nenhum artefato publica a aplicação.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 71. apps/mfe-vue2-checkout/package.json:7; apps/mfe-vue2-checkout/webpack.config.js:11-16, 66-73; package.json:19, 26

**Observação:** Tem `webpack --mode production` e saída em `dist` próprios, com o container `mfe_checkout`. É servido localmente pelo `dev:remote:checkout` na porta 3001 ou pelo `devServer`. Nenhum artefato publica a aplicação.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 72. apps/mfe-vue3-dashboard/package.json:7; apps/mfe-vue3-dashboard/webpack.config.js:10-15, 53-61; package.json:19, 29

**Observação:** Tem `webpack --mode production` e saída em `dist` próprios, com o container `mfe_dashboard`. É servido localmente pelo `dev:remote:dashboard` na porta 3004 ou pelo `devServer`. Nenhum artefato publica a aplicação.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 73. apps/mfe-vue3-profile/package.json:7; apps/mfe-vue3-profile/webpack.config.js:10-15, 53-56; package.json:19, 28

**Observação:** Tem `webpack --mode production` e saída em `dist` próprios, com o container `mfe_profile`. É servido localmente pelo `dev:remote:profile` na porta 3003 ou pelo `devServer`. Nenhum artefato publica a aplicação.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 74. apps/shell/package.json:7-8; apps/shell/nuxt.config.ts:58-91; turbo.json:8-11; package.json:19

**Observação:** Tem `nuxt build`, com saída `.output` só do shell, e `start: node .output/server/index.mjs` para o servidor SSR. O único endereço no snapshot é a porta 3000 do `nuxt dev`. Nenhum artefato empacota ou publica a aplicação.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado. Nenhum remote entra no build do shell.

### 75. README.md:3

**Observação:** "Micro-frontend monorepo supporting **Vue 2 + Vuetify 2** and **Vue 3 + Vuetify 3** remotes side-by-side, orchestrated by a **Nuxt 3 shell**."

**Interpretação:** Apresenta o repositório como um monorepo de remotes Vue 2 e Vue 3 orquestrados por um shell Nuxt 3. A afirmação é corroborada.

### 76. README.md:5

**Observação:** "with Webpack Module Federation, Turborepo and pnpm workspaces".

**Interpretação:** Nomeia as tecnologias do projeto. Os remotes configuram o Module Federation, e o workspace pnpm e o Turborepo estão configurados. A afirmação é corroborada.

### 77. README.md:13-28

**Observação:** Árvore de `apps/` com `shell/ ← Nuxt 3 host`, `mfe-vue2-checkout/` e `mfe-vue2-admin/ ← Vue 2 + Vuetify 2` e `mfe-vue3-profile/` e `mfe-vue3-dashboard/ ← Vue 3 + Vuetify 3`.

**Interpretação:** Descreve as cinco aplicações e o framework de cada uma. A afirmação é corroborada.

### 78. README.md:17

**Observação:** "index.vue ← Homepage / MFE selector grid".

**Interpretação:** Afirma que a página inicial do shell lista os MFEs para escolha. Ela gera um cartão por descritor do registro, e a afirmação é corroborada.

### 79. README.md:18

**Observação:** "app/[...mfe].vue ← Dynamic MFE container".

**Interpretação:** Afirma que a página catch-all é o contêiner onde os remotes são montados. A afirmação é corroborada.

### 80. README.md:20

**Observação:** "ShellHeader.vue ← Shared header (only shared UI element)".

**Interpretação:** Afirma que o cabeçalho é compartilhado entre unidades. Só o shell o usa, e a afirmação é contradita.

### 81. README.md:22

**Observação:** "useMfeLoader.ts ← Dynamic remote loader".

**Interpretação:** Afirma que o composable carrega os remotes em runtime. A afirmação é corroborada.

### 82. README.md:31

**Observação:** "shared/ ← @mfe/shared: types, auth bus, MFE registry".

**Interpretação:** Afirma que um pacote comum às unidades reúne tipos, barramento de autenticação e registro. As cinco unidades o declaram e usam, e a afirmação é corroborada.

### 83. README.md:34

**Observação:** "auth/ ← CustomEvent auth bus (framework-agnostic)".

**Interpretação:** Nomeia o mecanismo de comunicação, eventos `CustomEvent` independentes de framework. A afirmação é corroborada.

### 84. README.md:35

**Observação:** "registry.ts ← List of all MFEs shown on the homepage".

**Interpretação:** Afirma que o registro lista as unidades usadas pelo shell. A afirmação é corroborada.

### 85. README.md:44

**Observação:** "Each Vue 2 remote is a **plain Webpack 5 app** — no Nuxt."

**Interpretação:** Afirma que os remotes Vue 2 têm build webpack próprio. A afirmação é corroborada.

### 86. README.md:44

**Observação:** "Each remote brings its own isolated Vue 2 + Vuetify 2 instance […] completely isolated from the shell's Vue 3."

**Interpretação:** Afirma que cada remote Vue 2 roda com instâncias próprias, isoladas do shell. A afirmação é corroborada.

### 87. README.md:44

**Observação:** "via Module Federation's `singleton` scope".

**Interpretação:** Atribui a instância de Vue 2 e Vuetify 2 ao escopo `singleton` do Module Federation. Só `vue` está no `shared`, o Vuetify 2 vem do `dist` pré-construído, e a afirmação é contradita.

### 88. README.md:46

**Observação:** "Vue 3 remotes are also standalone Webpack apps (simpler than Nuxt for remotes)".

**Interpretação:** Afirma que os remotes Vue 3 têm build webpack próprio. A afirmação é corroborada.

### 89. README.md:46

**Observação:** "and share Vue 3 with the shell via MF's singleton scope".

**Interpretação:** Afirma que host e remotes Vue 3 compartilham o Vue 3. O shell não tem `ModuleFederationPlugin` e inicia cada container com escopo vazio, e a afirmação é contradita.

### 90. README.md:48

**Observação:** "The only shared thing: the header".

**Interpretação:** Afirma que nada além do cabeçalho é compartilhado. O pacote `@mfe/shared` e o barramento de eventos ligam as cinco unidades, e o cabeçalho só é usado pelo shell. A afirmação é contradita.

### 91. README.md:50

**Observação:** "Remotes do **not** render their own header — the shell injects it above the remote's mount point."

**Interpretação:** Afirma que o shell dá a moldura e os remotes só o conteúdo. A afirmação é corroborada.

### 92. README.md:50

**Observação:** "Remotes only receive `user` and `onLogout` as props."

**Interpretação:** Descreve as props que o host passa a cada remote. A afirmação é corroborada.

### 93. README.md:56

**Observação:** "Shell logs in → calls `broadcastLogin(user)` → stores user in `sessionStorage` + fires `mfe:auth-changed`".

**Interpretação:** Descreve o envio do estado de autenticação do shell aos remotes. A afirmação é corroborada.

### 94. README.md:57

**Observação:** "Each remote subscribes to `mfe:auth-changed` on mount and updates its internal user ref".

**Interpretação:** Descreve a recepção do evento em cada remote. A afirmação é corroborada.

### 95. README.md:58

**Observação:** "On logout, shell fires `mfe:auth-logout` → remotes unmount themselves".

**Interpretação:** Descreve o logout propagado por evento. A afirmação é corroborada.

### 96. README.md:62

**Observação:** "Every remote must export `{ mount(el, props), unmount(el) }` from its `bootstrap.js`. This is the `RemoteMount` interface defined in `@mfe/shared`. The shell's `useMfeLoader` composable calls this interface — it never knows whether it's talking to a Vue 2 or Vue 3 app."

**Interpretação:** Descreve o contrato de montagem entre host e remotes, independente do framework. A afirmação é corroborada.

### 97. README.md:87-95

**Observação:** "Individual apps:" e `pnpm dev:shell      # shell only`, seguidos de um comando por remote.

**Interpretação:** Afirma que cada aplicação sobe sozinha em desenvolvimento. A afirmação é corroborada.

### 98. apps/mfe-vue2-admin/webpack.config.js:53

**Observação:** "Admin MFE (standalone dev)", título da página do `HtmlWebpackPlugin`.

**Interpretação:** Afirma que o admin roda sozinho em desenvolvimento. A afirmação é corroborada.

### 99. apps/mfe-vue2-checkout/src/index.js:1-3

**Observação:** "Async entry so Module Federation shared scopes initialise before the app runs. The shell loads bootstrap.js directly; this file is used only when running the checkout MFE standalone for development."

**Interpretação:** Explica o bootstrap assíncrono pelo Module Federation e separa a entrada standalone do módulo que o shell carrega. A afirmação é corroborada.

### 100. apps/mfe-vue3-dashboard/webpack.config.js:48

**Observação:** "Dashboard MFE (standalone dev)", título da página do `HtmlWebpackPlugin`.

**Interpretação:** Afirma que o dashboard roda sozinho em desenvolvimento. A afirmação é corroborada.

### 101. apps/mfe-vue3-profile/webpack.config.js:48

**Observação:** "Profile MFE (standalone dev)", título da página do `HtmlWebpackPlugin`.

**Interpretação:** Afirma que o profile roda sozinho em desenvolvimento. A afirmação é corroborada.

### 102. apps/shell/composables/useMfeLoader.ts:17

**Observação:** "Inject remoteEntry.js as a plain script tag".

**Interpretação:** Descreve o transporte do `remoteEntry.js` por `<script>`. A afirmação é corroborada.

### 103. apps/shell/composables/useMfeLoader.ts:20

**Observação:** "The remote sets itself on window[remoteName] via webpack MF".

**Interpretação:** Descreve como o container de Module Federation fica disponível ao host. A afirmação é corroborada.

### 104. apps/shell/composables/useMfeLoader.ts:28-30

**Observação:** "Shell has no MF plugin, so we pass an empty object — each remote manages its own singleton scope internally."

**Interpretação:** Explica que o host inicia os containers sem escopo compartilhado. A afirmação é corroborada e desmente a de #89.

### 105. apps/shell/nuxt.config.ts:66

**Observação:** "the shell never statically imports any remote module".

**Interpretação:** Afirma que o shell não depende dos remotes em tempo de build. A afirmação é corroborada.

### 106. packages/shared/src/registry.ts:3-4

**Observação:** "Remote URLs fall back to localhost for local dev. In production set CHECKOUT_REMOTE_URL etc. in your environment."

**Interpretação:** Afirma que o endereço de cada remote é trocável por variável de ambiente. A afirmação é corroborada; o `publicPath` dos remotes continua fixo em `localhost`.

### 107. scripts/dev-remote-server.js:4-5

**Observação:** "Serves a built MFE's dist/ folder as a static file server with CORS. Useful when you want to run the shell in dev mode against pre-built remotes."

**Interpretação:** Afirma que cada remote construído pode ser servido à parte para o shell. A afirmação é corroborada.

### 108. scripts/health-check.js:4-5

**Observação:** "Polls all MFE remoteEntry.js URLs until they respond (or times out). Run before starting the shell in production/CI to avoid blank pages."

**Interpretação:** Descreve uma checagem da disponibilidade de cada remote antes de subir o shell. A afirmação é corroborada; nenhum artefato do snapshot a chama em produção ou CI.

### 109. scripts/webpack.aliases.js:3

**Observação:** "Shared path aliases for all MFE remote webpack configs."

**Interpretação:** Descreve um utilitário de build comum aos quatro remotes. A afirmação é corroborada.

### 110. 74f5247 2026-05-29 (package.json, turbo.json); 84ffc24 2026-05-29

**Observação:** `package.json` e `turbo.json` são criados em `74f5247` e não mudam até o snapshot. Nenhum commit cria ou remove workflow de CI, Dockerfile ou script que chame `turbo`; o único caminho removido no histórico é o gitlink `apps`.

**Interpretação:** O `turbo` nunca teve invocação fora dos scripts do `package.json`; o `Undetermined` não é resto de uma automação abandonada. O ponto está esclarecido.

### 111. 74f5247 2026-05-29 (README.md); 8606169 2026-05-29 (apps, gitlink); 84ffc24 2026-05-29 (apps/shell/components/ShellHeader.vue, apps/*/src/App.vue)

**Observação:** O README com "Shared header" é o de `74f5247`, sem mudança até o snapshot. O `ShellHeader.vue` e os `App.vue` dos remotes aparecem como arquivos só em `84ffc24`; antes, `apps` era o gitlink `cb1c03a`, cujo commit não está no clone.

**Interpretação:** O histórico não mostra se alguma versão anterior das aplicações usava o cabeçalho em mais de uma unidade. O ponto é inconclusivo, só sobre o passado: no snapshot, o cabeçalho é só do shell.

### 112. 74f5247 2026-05-29 (README.md); 8606169 2026-05-29 (apps, gitlink); 84ffc24 2026-05-29 (apps/shell/nuxt.config.ts, apps/shell/composables/useMfeLoader.ts, apps/*/webpack.config.js)

**Observação:** As frases sobre o escopo `singleton` estão no README de `74f5247`, sem mudança. Os artefatos que as desmentem têm a primeira presença observável em `84ffc24`, com um único commit no `log` de cada um. O conteúdo anterior, no gitlink `cb1c03a` ou no repositório de origem citado em README.md:5, não está disponível.

**Interpretação:** O histórico não mostra se o shell teve um `ModuleFederationPlugin` com o Vue 3 no escopo compartilhado. O ponto é inconclusivo, só sobre o passado: no snapshot, o shell inicia os containers com escopo vazio.

### 113. 74f5247 2026-05-29 (README.md, packages/shared)

**Observação:** O README e `packages/shared` entram juntos em `74f5247` e não mudam até o snapshot. A versão de `74f5247` do README já traz, logo abaixo de "The only shared thing: the header", a seção "Auth state sharing" com o barramento de `packages/shared/src/auth`.

**Interpretação:** O título nunca conviveu com uma versão sem o pacote compartilhado; a divergência é interna ao README desde a primeira versão observável. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (apps/mfe-vue2-admin/package.json:13) | 1 tecnologia | manifesto | — | contexto | fraca | declara #26 |
| 2 | 3.4.2 (apps/mfe-vue2-checkout/package.json:13) | 1 tecnologia | manifesto | — | contexto | fraca | declara #31 |
| 3 | 3.4.2 (apps/mfe-vue3-dashboard/package.json:14) | 1 tecnologia | manifesto | — | contexto | fraca | declara #36 |
| 4 | 3.4.2 (apps/mfe-vue3-profile/package.json:14) | 1 tecnologia | manifesto | — | contexto | fraca | declara #41 |
| 5 | 3.4.2 (apps/shell/package.json:13) | 1 tecnologia | manifesto | — | contexto | fraca | declara #53; declara #50; declara #51 |
| 6 | 3.4.2 (package.json:34) | 1 tecnologia | manifesto | — | contexto | ambígua | declara turbo.json:3-18 |
| 7 | 3.4.2 (apps/mfe-vue2-admin/package.json:13, Evidência); 3.4.3 (apps/mfe-vue2-admin, Marcadores, Entrada e Build); 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:24, src-mount-export e src-mount-call, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida e Artefatos); 3.4.7 #13, #24, #35 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #55; configura #62 |
| 8 | 3.4.2 (apps/mfe-vue2-checkout/package.json:13, Evidência); 3.4.3 (apps/mfe-vue2-checkout, Marcadores, Entrada e Build); 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:32, src-mount-export e src-mount-call, Observação); 3.4.5 #2 (Configuração); 3.4.6 #2 (Onde é servida e Artefatos); 3.4.7 #2, #11, #13, #25, #29, #30, #35 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #56; configura #63 |
| 9 | 3.4.2 (apps/mfe-vue3-dashboard/package.json:14, Evidência); 3.4.3 (apps/mfe-vue3-dashboard, Marcadores, Entrada e Build); 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:26, src-mount-export e src-mount-call, Observação); 3.4.5 #3 (Configuração); 3.4.6 #3 (Onde é servida e Artefatos); 3.4.7 #26, #35 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #57; configura #64 |
| 10 | 3.4.2 (apps/mfe-vue3-profile/package.json:14, Evidência); 3.4.3 (apps/mfe-vue3-profile, Marcadores, Entrada e Build); 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:28, src-mount-export e src-mount-call, Observação); 3.4.5 #4 (Configuração); 3.4.6 #4 (Onde é servida e Artefatos); 3.4.7 #14, #15, #27, #35 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #58; configura #65 |
| 11 | 3.4.4 (apps/mfe-vue2-admin/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 12 | 3.4.4 (apps/mfe-vue2-checkout/src/index.js:5) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (apps/mfe-vue3-dashboard/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 14 | 3.4.4 (apps/mfe-vue3-profile/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 15 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:13) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62; implementa #63; implementa #64; implementa #65 |
| 16 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:79) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62; implementa #63; implementa #64; implementa #65 |
| 17 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:24, src-mount-export) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62 |
| 18 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:41, src-mount-export) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62 |
| 19 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:32, src-mount-export) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #63 |
| 20 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:49, src-mount-export) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #63 |
| 21 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:26, src-mount-export) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #64 |
| 22 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:36, src-mount-export) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #64 |
| 23 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:28, src-mount-export) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #65 |
| 24 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:43, src-mount-export) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #65 |
| 25 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:24, src-mount-call) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62 |
| 26 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:30) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 27 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:38) | 3 código | código-fonte | — | contexto | fraca | — |
| 28 | 3.4.4 (apps/mfe-vue2-admin/src/bootstrap.js:41, src-mount-call) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62 |
| 29 | 3.4.4 (apps/mfe-vue2-admin/src/index.js:4) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 30 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:32, src-mount-call) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #63 |
| 31 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:38) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 32 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:46) | 3 código | código-fonte | — | contexto | fraca | — |
| 33 | 3.4.4 (apps/mfe-vue2-checkout/src/bootstrap.js:49, src-mount-call) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #63 |
| 34 | 3.4.4 (apps/mfe-vue2-checkout/src/index.js:8) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 35 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:26, src-mount-call) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #64 |
| 36 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:30) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 37 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:33) | 3 código | código-fonte | — | contexto | fraca | — |
| 38 | 3.4.4 (apps/mfe-vue3-dashboard/src/bootstrap.js:36, src-mount-call) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #64 |
| 39 | 3.4.4 (apps/mfe-vue3-dashboard/src/index.js:4) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 40 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:28, src-mount-call) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #65 |
| 41 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:36) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 42 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:40) | 3 código | código-fonte | — | contexto | fraca | — |
| 43 | 3.4.4 (apps/mfe-vue3-profile/src/bootstrap.js:43, src-mount-call) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #65 |
| 44 | 3.4.4 (apps/mfe-vue3-profile/src/index.js:4) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 45 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:80) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62; implementa #63; implementa #64; implementa #65 |
| 46 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:91) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62; implementa #63; implementa #64; implementa #65 |
| 47 | 3.4.4 (packages/shared/src/types/index.ts:26) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 48 | 3.4.4 (packages/shared/src/types/index.ts:27) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 49 | 3.4.4 (apps/shell/composables/useMfeLoader.ts:57) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62; implementa #63; implementa #64; implementa #65 |
| 50 | 3.4.4 (packages/shared/src/auth/index.ts:14) | 3 código | código-fonte | events | tecnológica | moderada | implementa #66; implementa #67; implementa #68; implementa #69 |
| 51 | 3.4.4 (packages/shared/src/auth/index.ts:22) | 3 código | código-fonte | events | tecnológica | moderada | implementa #66; implementa #67; implementa #68; implementa #69 |
| 52 | 3.4.4 (apps/shell/pages/app/[...mfe].vue:46) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #62; implementa #63; implementa #64; implementa #65 |
| 53 | 3.4.4 (packages/shared/src/registry.ts:12) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #62; implementa #63; implementa #64; implementa #65 |
| 54 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 55 | 3.4.3 (apps/mfe-vue2-admin) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 56 | 3.4.3 (apps/mfe-vue2-checkout) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 57 | 3.4.3 (apps/mfe-vue3-dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 58 | 3.4.3 (apps/mfe-vue3-profile) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 59 | 3.4.3 (apps/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 60 | 3.4.3 (packages/shared) | 4 estrutura | diretório | — | contexto | fraca | — |
| 61 | 3.4.3 (scripts) | 4 estrutura | diretório | — | contexto | fraca | — |
| 62 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #59; liga #55 |
| 63 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #59; liga #56 |
| 64 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #59; liga #57 |
| 65 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #59; liga #58 |
| 66 | 3.4.5 #5 | 5 composição | código-fonte | events | arquitetural | forte | liga #59; liga #55 |
| 67 | 3.4.5 #6 | 5 composição | código-fonte | events | arquitetural | forte | liga #59; liga #56 |
| 68 | 3.4.5 #7 | 5 composição | código-fonte | events | arquitetural | forte | liga #59; liga #57 |
| 69 | 3.4.5 #8 | 5 composição | código-fonte | events | arquitetural | forte | liga #59; liga #58 |
| 70 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #55 |
| 71 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #56 |
| 72 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #57 |
| 73 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #58 |
| 74 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #59 |
| 75 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #55; corrobora #56; corrobora #57; corrobora #58; corrobora #59; corrobora #62; corrobora #63; corrobora #64; corrobora #65 |
| 76 | 3.4.7 #2 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #7; corrobora #8; corrobora #9; corrobora #10; corrobora #62; corrobora #63; corrobora #64; corrobora #65; corrobora pnpm-workspace.yaml:1-3; corrobora turbo.json:3-18 |
| 77 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #55; corrobora #56; corrobora #57; corrobora #58; corrobora #59 |
| 78 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/shell/pages/index.vue:12-28 |
| 79 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #52; corrobora #62; corrobora #63; corrobora #64; corrobora #65 |
| 80 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | contradiz apps/shell/pages/index.vue:3; contradiz apps/shell/pages/app/[...mfe].vue:3; contradiz apps/mfe-vue2-checkout/src/App.vue:1-15 |
| 81 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #15; corrobora #16; corrobora #62; corrobora #63; corrobora #64; corrobora #65 |
| 82 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #5; corrobora #60 |
| 83 | 3.4.7 #9 | 7 documentação | documentação | events | tecnológica | fraca | corrobora #50; corrobora #51; corrobora #66; corrobora #67; corrobora #68; corrobora #69 |
| 84 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #53; corrobora apps/shell/pages/index.vue:42 |
| 85 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #70; corrobora #71; corrobora #8 |
| 86 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/mfe-vue2-checkout/src/bootstrap.js:8-20; corrobora #32; corrobora apps/shell/composables/useMfeLoader.ts:28-32 |
| 87 | 3.4.7 #13 | 7 documentação | documentação | module-federation | tecnológica | fraca | contradiz #7; contradiz #8; contradiz apps/mfe-vue2-checkout/src/bootstrap.js:8-9 |
| 88 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #57; corrobora #58; corrobora #72; corrobora #73; corrobora #10 |
| 89 | 3.4.7 #15 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz apps/shell/composables/useMfeLoader.ts:28-32; contradiz apps/shell/nuxt.config.ts:58-91 |
| 90 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #1; contradiz #2; contradiz #3; contradiz #4; contradiz #5; contradiz #66; contradiz #67; contradiz #68; contradiz #69; contradiz apps/shell/pages/index.vue:3; contradiz apps/shell/pages/app/[...mfe].vue:3 |
| 91 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora apps/shell/pages/app/[...mfe].vue:3, 24; corrobora apps/mfe-vue2-admin/src/App.vue:1-15; corrobora apps/mfe-vue3-dashboard/src/App.vue:1-13 |
| 92 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #45; corrobora #52; corrobora packages/shared/src/types/index.ts:30-33 |
| 93 | 3.4.7 #19 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #50; corrobora #66; corrobora #67; corrobora #68; corrobora #69 |
| 94 | 3.4.7 #20 | 7 documentação | documentação | events | arquitetural | fraca | corrobora apps/mfe-vue2-checkout/src/bootstrap.js:35-37; corrobora apps/mfe-vue3-profile/src/bootstrap.js:33-35; corrobora #66; corrobora #67; corrobora #68; corrobora #69 |
| 95 | 3.4.7 #21 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #26; corrobora #51; corrobora #66; corrobora #67; corrobora #68; corrobora #69 |
| 96 | 3.4.7 #22 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #17; corrobora #18; corrobora #19; corrobora #20; corrobora #21; corrobora #22; corrobora #23; corrobora #24; corrobora #47; corrobora #48; corrobora apps/shell/composables/useMfeLoader.ts:38-46; corrobora #45; corrobora #62; corrobora #63; corrobora #64; corrobora #65 |
| 97 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | corrobora package.json:14-18; corrobora apps/shell/package.json:6; corrobora apps/mfe-vue2-checkout/package.json:6; corrobora #29; corrobora #34; corrobora #39; corrobora #44 |
| 98 | 3.4.7 #24 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #55; corrobora #29 |
| 99 | 3.4.7 #25 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #12; corrobora #8; corrobora #63 |
| 100 | 3.4.7 #26 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #57; corrobora #39 |
| 101 | 3.4.7 #27 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #58; corrobora #44 |
| 102 | 3.4.7 #28 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #49 |
| 103 | 3.4.7 #29 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora apps/shell/composables/useMfeLoader.ts:21; corrobora #8; corrobora #53; corrobora #62; corrobora #63; corrobora #64; corrobora #65 |
| 104 | 3.4.7 #30 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora apps/shell/composables/useMfeLoader.ts:31-35; corrobora apps/shell/nuxt.config.ts:58-91; corrobora #8 |
| 105 | 3.4.7 #31 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #74; corrobora apps/shell/package.json:12-20 |
| 106 | 3.4.7 #32 | 7 documentação | comentário | — | arquitetural | fraca | corrobora packages/shared/src/registry.ts:5-9; corrobora #53 |
| 107 | 3.4.7 #33 | 7 documentação | comentário | — | arquitetural | fraca | corrobora package.json:26-30; corrobora scripts/dev-remote-server.js:32-53 |
| 108 | 3.4.7 #34 | 7 documentação | comentário | — | arquitetural | fraca | corrobora scripts/health-check.js:14-19, 38-64; corrobora package.json:25 |
| 109 | 3.4.7 #35 | 7 documentação | comentário | — | contexto | fraca | corrobora #7; corrobora #8; corrobora #9; corrobora #10 |
| 110 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #6 |
| 111 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #80 |
| 112 | 3.4.8 #3 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #87; explica #89 |
| 113 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #90 |

## Resumo

Observações: 113. Dimensões (tecnologia: 6, configuração: 4, código: 43, estrutura: 8, composição: 8, build-deploy: 5, documentação: 35, histórico: 4). Força (forte: 9, moderada: 38, fraca: 65, ambígua: 1). Evidência (tecnológica: 48, arquitetural: 50, contexto: 15).

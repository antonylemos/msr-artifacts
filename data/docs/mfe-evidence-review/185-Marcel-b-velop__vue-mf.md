---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
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

# 185 — Marcel-b-velop/vue-mf

## Leitura do repositório

Experimento com quatro aplicações Vue 3 + Vite num workspace pnpm: `host` (casca), `app-1`, `app-2` e `lib`, todas unidades frontend com `index.html`, entrada e build próprios (#45 a #48). A raiz do workspace só delega o build e não é unidade (#44). Há também uma API e um IdentityServer .NET em `Api/`, que não são unidades frontend.

A cadeia de Module Federation está completa em quatro relações ativas:
- **Dependência:** `@originjs/vite-plugin-federation` `^1.4.1`, declarada nas quatro unidades (#1 a #4).
- **Configuração:** app-1, app-2 e lib se nomeiam (`remote-app1`, `remote-app2`, `remote-lib`), geram `remoteEntry.js` e expõem módulos; o host declara os três remotes por URL `localhost` (#7); app-1 e app-2 também declaram `remote-lib` (#5, #6); lib só expõe (#8). Todas compartilham `vue`, `pinia`, `primevue` e `axios`.
- **Código:** o host carrega `App1` de app-1 e `Confirm` de lib por `defineAsyncComponent` (#10, #12), renderiza `App1` na rota `/` (#40, #41) e importa `LoginForm` e `RegisterForm` de app-2 nas rotas `/login` e `/register` (#13, #14, #40); app-1 carrega `Confirm` de lib (#9) e o usa sem import local (#42).
- **Relação:** host → app-1, host → lib, host → app-2 e app-1 → lib (#49 a #52). O `<Confirm>` de app-1 é resolvido pelo registro global do app que o monta, por isso entra tanto em app-1 → lib quanto em host → lib (#42).

Além da federação, app-2 e lib trocam a sessão pela chave `accessToken` do `localStorage`: app-2 grava o token, e o `apiClient` de lib o lê e o apaga num 401 (#43, #53). Não é um mecanismo de MFE declarado; só funciona porque, no host, as duas unidades rodam na mesma origem.

Sinais que enganam: o host registra `App2` como `AppTwo` sem usá-lo (#11), e app-2 declara `remote-lib` sem importá-lo (#54); os dois ficam na configuração ou no código, sem composição efetiva. O evento `auth:logout` só circula dentro de app-2 (#22 a #24). Das 31 construções da mineração, 20 estão no relatório HTML gerado do Playwright (`lib/playwright-report/`) e duas são o `mount` da biblioteca de testes; todas são falsos positivos (#15 a #21, #25 a #39).

Os quatro builds são separados, e nenhum deploy é observado: o CI só constrói o workspace, e os remotes são servidos por `vite preview` em portas `localhost` fixas que o host embute (#55 a #58).

A documentação (README em alemão) confirma a organização host/remotes, a biblioteca compartilhada, o `shared` e o arranjo de `preview` (#61 a #63, #65 a #68, #70, #72, #73, #75). Está atrasada em relação ao snapshot: fala em três partes, sem app-2 (#64), atribui a todas as páginas origem remota, mas `/about` é local (#59), promete cabeçalho e rodapé que o host não tem (#60) e descreve um bloco `build` que não corresponde às configurações atuais (#69). O histórico mostra que o README é anterior a app-2 e às últimas mudanças das configurações (#81, #82), e deixa em aberto só questões do passado (#78 a #80). Nada fica ambíguo no snapshot.

## Observações

### 1. app-1/package.json:14

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build de app-1.

### 2. app-2/package.json:14

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build de app-2.

### 3. host/package.json:24

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente no build do host.

### 4. lib/package.json:20

**Observação:** `@originjs/vite-plugin-federation` (`^1.4.1`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente no build de lib.

### 5. app-1/vite.config.ts:2, 11-27

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "remote-app1"`, `filename: "remoteEntry.js"`, `exposes: { "./App1": "./src/App.vue" }`, `remotes: { "remote-lib": "http://localhost:5177/assets/remoteEntry.js" }` e `shared` com `vue`, `pinia`, `primevue` e `axios`, todos `generate: false, import: false`.

**Interpretação:** app-1 é ao mesmo tempo remote, com nome próprio e o `App1` exposto ao host, e host de lib, que declara pelo nome e pelo endereço local. As bibliotecas compartilhadas vêm da cópia de quem a carrega.

### 6. app-2/vite.config.ts:2, 11-30

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "remote-app2"`, `filename: "remoteEntry.js"`, `exposes` com `./App2` (`./src/App.vue`, comentário "Für standalone-Modus"), `./Home`, `./LoginForm` e `./RegisterForm`, `remotes: { "remote-lib": "http://localhost:5177/assets/remoteEntry.js" }` e `shared` com `vue`, `pinia` e `primevue` em `generate: false, import: false` e `axios` em `generate: true, import: true`.

**Interpretação:** app-2 é remote com nome próprio e quatro módulos expostos, e declara lib como remote. Nenhum código de app-2 importa `remote-lib` (#54).

**Nota:** O `server.port: 5175` (linha 40) é porta de desenvolvimento, que a revisão de composição marcou como corroboração, e não entra.

### 7. host/vite.config.ts:2, 11-26

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "host-app"`, `filename: "remoteEntry.js"`, o comentário "Modules to expose" sem `exposes`, `remotes` com `remote-app1` (`http://localhost:5174/assets/remoteEntry.js`), `remote-app2` (`:5175`) e `remote-lib` (`:5177`), e `shared` com `vue`, `pinia`, `primevue` (`requiredVersion` e `version` `^4.1.1`) e `axios`, todos com `modulePreload: true`.

**Interpretação:** A configuração do host declara as outras três unidades como remotes, com os nomes que elas se dão (#5, #6, #8) e endereços locais, e fornece as bibliotecas compartilhadas.

### 8. lib/vite.config.ts:2, 17-32

**Observação:** O `vite.config.ts` importa `federation` e o invoca em `plugins` com `name: "remote-lib"`, `filename: "remoteEntry.js"`, `exposes` com `./Confirm`, `./apiClient` e `./types`, e `shared` com `vue`, `pinia`, `primevue` e `axios` em `generate: false, import: false`. Não declara `remotes`.

**Interpretação:** lib está configurada como remote de Module Federation, com nome próprio e três módulos expostos (um componente, um serviço e tipos), sem nomear outra unidade.

### 9. app-1/src/main.ts:11

**Observação:** `const confirmD = defineAsyncComponent(() => import("remote-lib/Confirm"));`, registrado como componente global `Confirm` na linha 16.

**Interpretação:** app-1 carrega em runtime o `./Confirm` do remote `remote-lib`, pelo nome dele.

### 10. host/src/main.ts:12

**Observação:** `const remoteApp1 = defineAsyncComponent(() => import("remote-app1/App1"));`, registrado como `AppOne` na linha 19.

**Interpretação:** O host carrega em runtime o `./App1` do remote `remote-app1`, pelo nome dele.

### 11. host/src/main.ts:13

**Observação:** `const remoteApp2 = defineAsyncComponent(() => import("remote-app2/App2"));`, registrado como `AppTwo` na linha 20. Nenhum template do host nem dos componentes remotos que ele renderiza usa `<AppTwo>`.

**Interpretação:** O mecanismo de carga do `App2` de app-2 está preparado, mas nunca é acionado; não há composição por essa linha.

### 12. host/src/main.ts:14

**Observação:** `const confirmD = defineAsyncComponent(() => import("remote-lib/Confirm"));`, registrado como componente global `Confirm` na linha 21. Nenhum template do host usa `<Confirm>`; o `App1` de app-1 renderizado no host o usa sem import local (app-1/src/App.vue:33).

**Interpretação:** O host carrega o `./Confirm` do remote `remote-lib`, pelo nome dele, e o oferece aos componentes remotos que monta.

### 13. host/src/router/index.ts:7

**Observação:** `{ path: '/login', component: () => import('remote-app2/LoginForm') }`, na tabela `routes` passada ao router em host/src/main.ts:23-28.

**Interpretação:** A rota `/login` do host carrega o `./LoginForm` do remote `remote-app2`.

### 14. host/src/router/index.ts:8

**Observação:** `{ path: '/register', component: () => import('remote-app2/RegisterForm') }`, na mesma tabela `routes`.

**Interpretação:** A rota `/register` do host carrega o `./RegisterForm` do remote `remote-app2`.

### 15. lib/src/App.test.ts:2

**Observação:** `import { mount } from "@vue/test-utils"`, num arquivo de teste Vitest.

**Interpretação:** É o `mount` da biblioteca de testes, sem relação com composição. É um falso positivo da busca.

### 16. lib/src/components/Confirm.test.ts:2

**Observação:** `import { mount } from "@vue/test-utils"`, num arquivo de teste Vitest.

**Interpretação:** É o `mount` da biblioteca de testes, sem relação com composição. É um falso positivo da busca.

### 17. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:115

**Observação:** Ocorrência de custom element em código minificado do relatório HTML gerado pelo Playwright (saída do `reporter: 'html'` de lib/playwright.config.ts:9).

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 18. lib/playwright-report/trace/sw.bundle.js:1

**Observação:** Ocorrência de custom element em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 19. lib/playwright-report/index.html:58

**Observação:** Ocorrência de script dinâmico em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 20. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:50

**Observação:** Ocorrência de script dinâmico em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 21. lib/playwright-report/trace/snapshot.html:5

**Observação:** Ocorrência de iframe no relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 22. app-2/src/App.vue:24

**Observação:** `window.addEventListener("auth:logout", …)`, que chama `authStore.logout()` e redireciona para `/login`. O evento só é disparado em app-2/src/services/authService.ts:57 e :99, e o `App2` que registra o listener não é renderizado no host.

**Interpretação:** É comunicação por evento interna a app-2, sem outra unidade envolvida.

### 23. app-2/src/services/authService.ts:57

**Observação:** `window.dispatchEvent(new CustomEvent("auth:logout"))` no interceptor de resposta 401; o único ouvinte é app-2/src/App.vue:24.

**Interpretação:** É comunicação por evento interna a app-2.

### 24. app-2/src/services/authService.ts:99

**Observação:** `window.dispatchEvent(new CustomEvent("auth:logout"))` em `logout()`; o único ouvinte é app-2/src/App.vue:24.

**Interpretação:** É comunicação por evento interna a app-2.

### 25. lib/playwright-report/index.html:18

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 26. lib/playwright-report/index.html:26

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 27. lib/playwright-report/index.html:34

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 28. lib/playwright-report/index.html:57

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 29. lib/playwright-report/index.html:58

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 30. lib/playwright-report/trace/assets/codeMirrorModule-Bucv2d7q.js:20

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 31. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:18

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 32. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:26

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 33. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:49

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 34. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:50

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 35. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:59

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 36. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:121

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 37. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:124

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 38. lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:266

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 39. lib/playwright-report/trace/sw.bundle.js:3

**Observação:** Ocorrência de comunicação entre janelas ou eventos em código minificado do relatório HTML gerado pelo Playwright.

**Interpretação:** É código de terceiros de um relatório de teste, que nenhuma entrada ou build usa. É um falso positivo da busca.

### 40. host/src/router/index.ts:4; host/src/router/index.ts:5-8; host/src/main.ts:23-28

**Observação:** `export const routes = [` abre a tabela de rotas do host: `/` → `Home` (local, que renderiza `<AppOne />`), `/about` → `About` (local), `/login` → `import('remote-app2/LoginForm')` e `/register` → `import('remote-app2/RegisterForm')`. A tabela é passada a `createRouter`.

**Interpretação:** A tabela de rotas do host declara onde as unidades entram: app-1 na rota inicial, por meio de `Home`, e app-2 nas rotas de login e registro.

### 41. host/src/views/Home.vue:1

**Observação:** `<template><AppOne /></template>`. `AppOne` é o componente registrado em host/src/main.ts:19 a partir do `import("remote-app1/App1")`.

**Interpretação:** O host renderiza o `App1` de app-1 na página `Home`, da rota `/`.

### 42. app-1/src/App.vue:33

**Observação:** `<Confirm v-model:visible="vis" @saved="onSave" />`, sem import local; a tag é resolvida pelo componente global `Confirm`, registrado em app-1/src/main.ts:16 (isolada) ou em host/src/main.ts:21 (dentro do host).

**Interpretação:** app-1 renderiza o diálogo exposto por lib, tanto quando roda sozinha quanto quando é montada no host.

### 43. app-2/src/services/authService.ts:67

**Observação:** `localStorage.setItem("accessToken", response.data.token)` após o registro (também após o login, :76). O interceptor do `apiClient` de lib lê a mesma chave (lib/src/services/apiClient.ts:15).

**Interpretação:** app-2 publica o token da sessão numa chave do `localStorage` que lib consome, um canal de estado compartilhado entre as duas unidades.

### 44. .; package.json:8; pnpm-workspace.yaml:1-5

**Observação:** Raiz com `package.json` (`vue-mf-monorepo`, `private`) cujo `build` é `pnpm -r run build`, e `pnpm-workspace.yaml` com `lib`, `app-1`, `app-2` e `host`. Não há entrada nem configuração de build próprias.

**Interpretação:** É a raiz de coordenação do workspace, sem UI; não é unidade frontend.

### 45. app-1; app-1/package.json; app-1/index.html:11; app-1/src/main.ts:13-21; app-1/vite.config.ts:7-44; app-1/package.json:8; pnpm-workspace.yaml:3

**Observação:** Diretório com `package.json` próprio, `index.html` que carrega `/src/main.ts`, entrada que cria e monta o app Vue, `vite.config.ts` próprio e `build` `vue-tsc -b && vite build`; membro do workspace.

**Interpretação:** É uma unidade frontend com limite próprio (o remote `remote-app1`), que também roda sozinha.

### 46. app-2; app-2/package.json; app-2/index.html:11; app-2/src/main.ts:33-37; app-2/vite.config.ts:7-48; app-2/package.json:8; pnpm-workspace.yaml:4

**Observação:** Diretório com `package.json` próprio, `index.html` que carrega `/src/main.ts`, entrada que cria e monta o app Vue com router próprio em modo standalone, `vite.config.ts` próprio e `build` `vue-tsc -b && vite build`; membro do workspace.

**Interpretação:** É uma unidade frontend com limite próprio (o remote `remote-app2`), que também roda sozinha.

### 47. host; host/package.json; host/index.html:10; host/src/main.ts:17-40; host/vite.config.ts:7-50; host/package.json:8; pnpm-workspace.yaml:5

**Observação:** Diretório com `package.json` próprio, `index.html` que carrega `/src/main.ts`, entrada que cria e monta o app Vue com router e componentes remotos, `vite.config.ts` próprio e `build` `vue-tsc -b && vite build`; membro do workspace.

**Interpretação:** É uma unidade frontend com limite próprio, e é a que contém a maior parte dos imports federados (#10 a #14).

### 48. lib; lib/package.json; lib/index.html:11; lib/src/main.ts:10-14; lib/vite.config.ts:8-59; lib/package.json:11; pnpm-workspace.yaml:2

**Observação:** Diretório com `package.json` próprio, `index.html` que carrega `/src/main.ts`, entrada que monta um `App.vue` de demonstração que abre o `Confirm`, `vite.config.ts` próprio e `build` `vue-tsc -b && vite build`; membro do workspace.

**Interpretação:** É uma unidade frontend com limite próprio (o remote `remote-lib`), que expõe sobretudo componentes e serviços compartilhados, mas tem entrada de aplicação.

### 49. app-1/src/main.ts:11; app-1/src/App.vue:33; app-1/vite.config.ts:18-20; lib/vite.config.ts:18-19, 22-23

**Observação:** O especificador `remote-lib/Confirm` de app-1 corresponde ao remote `remote-lib` (`http://localhost:5177/assets/remoteEntry.js`) da configuração de app-1 e, em lib, a `name: "remote-lib"` e à chave `./Confirm`. O componente é registrado como global e usado em `<Confirm>`. app-1 também importa `remote-lib/apiClient` estaticamente (app-1/src/main.ts:8). A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, de app-1 para lib.

### 50. host/src/main.ts:12; host/src/router/index.ts:4; host/src/views/Home.vue:1; host/vite.config.ts:16; app-1/vite.config.ts:12-13, 16

**Observação:** O especificador `remote-app1/App1` do host corresponde ao remote `remote-app1` (`http://localhost:5174/assets/remoteEntry.js`) da configuração do host e, em app-1, a `name: "remote-app1"` e à chave `./App1`. O componente é registrado como `AppOne` e renderizado em `Home`, rota `/`. A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, do host para app-1, exibida na rota inicial.

### 51. host/src/main.ts:14; app-1/src/App.vue:33; host/vite.config.ts:18; lib/vite.config.ts:18-19, 22

**Observação:** O especificador `remote-lib/Confirm` do host corresponde ao remote `remote-lib` da configuração do host e, em lib, a `name: "remote-lib"` e à chave `./Confirm`. O host registra o componente como global, e quem o usa é o `App1` de app-1 montado no host. A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, do host para lib, que se realiza dentro do componente de outra unidade.

### 52. host/src/router/index.ts:7; host/src/router/index.ts:8; host/src/router/index.ts:4; host/vite.config.ts:17; app-2/vite.config.ts:12-13, 18-19

**Observação:** Os especificadores `remote-app2/LoginForm` e `remote-app2/RegisterForm` das rotas `/login` e `/register` do host correspondem ao remote `remote-app2` (`http://localhost:5175/assets/remoteEntry.js`) da configuração do host e, em app-2, a `name: "remote-app2"` e às chaves `./LoginForm` e `./RegisterForm`. A relação tem No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma relação host → remote de Module Federation, ativa, do host para app-2, por rotas.

### 53. app-2/src/services/authService.ts:67; app-2/src/services/authService.ts:40; lib/src/services/apiClient.ts:15-19; lib/src/services/apiClient.ts:34

**Observação:** app-2 grava e apaga `accessToken` no `localStorage`; o `apiClient` de lib lê a chave para o cabeçalho `Authorization` e a apaga num 401; o `authClient` de app-2 lê a mesma chave em cada requisição. Nenhuma configuração declara o canal. A relação tem tipo communication, direção bidirecional, mecanismo `other`, No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É uma ligação ativa entre app-2 e lib por estado compartilhado, que depende de as duas rodarem na mesma origem, como acontece dentro do host.

### 54. app-2/vite.config.ts:21-23; lib/vite.config.ts:18-19

**Observação:** app-2 declara o remote `remote-lib` (`http://localhost:5177/assets/remoteEntry.js`), que corresponde a lib pelo `name`, mas nenhum arquivo de app-2 importa `remote-lib/...`. A relação tem No snapshot `Yes` e Ativa `No`.

**Interpretação:** É uma relação host → remote de Module Federation só configurada, de app-2 para lib, sem uso no código.

### 55. app-1/package.json:8; app-1/vite.config.ts:7-44; package.json:8; .github/workflows/node.js.yml:20-23; app-1/package.json:10

**Observação:** Script `build` `vue-tsc -b && vite build` com `vite.config.ts` próprio, que gera o `remoteEntry.js` de `remote-app1`. O CI só chama o `pnpm build` da raiz, sem publicar. O único comando que serve o build é `vite preview --port 5174`, local. Versão `0.0.0`, `private`.

**Interpretação:** app-1 tem build separado. O deploy não é observado, e não há versionamento usado em publicação.

### 56. app-2/package.json:8; app-2/vite.config.ts:7-48; package.json:8; .github/workflows/node.js.yml:20-23; app-2/package.json:10

**Observação:** Script `build` `vue-tsc -b && vite build` com `vite.config.ts` próprio, que gera o `remoteEntry.js` de `remote-app2`. O CI só chama o `pnpm build` da raiz, sem publicar. O build é servido por `vite preview` local na porta 5175. Versão `0.0.0`, `private`.

**Interpretação:** app-2 tem build separado. O deploy não é observado, e não há versionamento usado em publicação.

### 57. host/package.json:8; host/vite.config.ts:7-50; package.json:8; .github/workflows/node.js.yml:20-23

**Observação:** Script `build` `vue-tsc -b && vite build` com `vite.config.ts` próprio, que embute as URLs `localhost` dos três remotes. O CI só chama o `pnpm build` da raiz, sem publicar. Não há porta fixa nem configuração de hospedagem. Versão `0.0.0`, `private`.

**Interpretação:** O host tem build separado, que só funciona contra remotes servidos na mesma máquina. O deploy não é observado, e não há versionamento usado em publicação.

### 58. lib/package.json:11; lib/vite.config.ts:8-59; package.json:8; .github/workflows/node.js.yml:20-23; lib/package.json:9

**Observação:** Script `build` `vue-tsc -b && vite build` com `vite.config.ts` próprio, que gera o `remoteEntry.js` de `remote-lib`, sem minificação e com sourcemap. O CI só chama o `pnpm build` da raiz, sem publicar. O build é servido por `vite preview --port 5177`, local. Versão `0.0.0`, `private`.

**Interpretação:** lib tem build separado. O deploy não é observado, e não há versionamento usado em publicação.

### 59. README.md:5

**Observação:** "Die einzelnen Seiten sollen als Remote Module geladen werden." (as páginas devem ser carregadas como módulos remotos)

**Interpretação:** Afirma, como objetivo, que cada página do host é remota. Três das quatro rotas mostram código remoto (#50, #52), mas `/about` é uma página local do host (host/src/router/index.ts:6; host/src/views/About.vue:1-5), o que contradiz a afirmação.

### 60. README.md:5

**Observação:** "Der Host hält die Navigationsleiste, Header und den Footer." (o host mantém a barra de navegação, o cabeçalho e o rodapé)

**Interpretação:** Atribui ao host a moldura da interface. A navegação está no host (host/src/App.vue:8-9; host/src/components/Navigation.vue:26), mas não há cabeçalho nem rodapé; a afirmação se confirma em parte.

### 61. README.md:7

**Observação:** "Mehrfach genutzte Steuerelemente sollen durch eine Library bereitgestellt werden" (controles usados em vários lugares devem ser fornecidos por uma biblioteca)

**Interpretação:** Afirma uma unidade de controles compartilhados. lib expõe o `Confirm` (#8), que app-1 e o host carregam e app-1 renderiza (#9, #12, #42), nas relações app-1 → lib e host → lib (#49, #51).

### 62. README.md:15

**Observação:** "Host: Host der/für Anwendung/en" (host das aplicações)

**Interpretação:** Atribui ao host o papel de casca. O host é unidade (#47), declara os três remotes (#7) e é a origem de três relações ativas (#50, #51, #52).

### 63. README.md:17

**Observação:** "App1: Eine Anwendung, welche zu Testzwecken eine Library mit einem Dialog nuten soll" (uma aplicação que, para teste, usa uma biblioteca com um diálogo)

**Interpretação:** Afirma que app-1 consome o diálogo de lib. O carregamento (#9), o uso em `<Confirm>` (#42) e a relação app-1 → lib (#49) confirmam a afirmação.

### 64. README.md:22

**Observação:** "die drei Teile der anwendung" (as três partes da aplicação)

**Interpretação:** Afirma três partes (Host, App1, Lib, do "Testaufbau"). O snapshot tem quatro unidades frontend no workspace, e app-2 fica fora da contagem (#46; pnpm-workspace.yaml:2-5), o que contradiz a afirmação.

### 65. README.md:22

**Observação:** "Den Host kann man so starten, Lib und App1 müssen gebaut werden und danach über preview bereitgestellt werden, um alles im Host zu sehen." (o host pode rodar com `pnpm dev`; Lib e App1 precisam ser construídas e servidas por `preview` para aparecer no host)

**Interpretação:** Descreve como as unidades são servidas para a composição. As URLs `localhost` do host (#7) correspondem às portas do `vite preview` de app-1 e lib (#55, #58), e os scripts `dev:all` combinam build em watch com `preview` (app-1/package.json:9-11; lib/package.json:8-10); o host roda com `vite` (host/package.json:7).

### 66. README.md:22

**Observação:** "Einzelne Anwendungen kann man natürlich auch direkt starten und debuggen, sie funktionieren dann allerdings nicht in der Hostanwendung." (cada aplicação também pode ser iniciada e depurada sozinha, mas então não funciona no host)

**Interpretação:** Afirma que cada unidade roda sozinha. As quatro têm entrada e `dev` próprios (#45 a #48; app-1/package.json:7; lib/package.json:7), o que confirma a afirmação.

### 67. README.md:24

**Observação:** "Primevue, Pinia, Vue sollten von allen Anwendungen geteilt werden. In der vite.config.ts wird das konfiguriert" (PrimeVue, Pinia e Vue são compartilhados por todas as aplicações, configurados no `vite.config.ts`)

**Interpretação:** Afirma as dependências compartilhadas entre as aplicações. As três estão no `shared` das quatro configurações (#5 a #8), junto com `axios`.

### 68. README.md:24

**Observação:** "Für Primevue musste nur in der Host Anwendung die vite.confit.ts erweitert werden […] Die Lösung war version und requiredVersion." (para o PrimeVue, só a configuração do host precisou de `version` e `requiredVersion`)

**Interpretação:** Afirma que só o host declara versão do PrimeVue compartilhado. A configuração do host tem `requiredVersion` e `version` (#7), e as dos remotes não (#5, #6, #8).

### 69. README.md:26

**Observação:** "Folgender Code hat in der vite.config.ts der Lib und App1 zur Lösung geführt (in der Host Anwendung gab es die Anpassung nicht)" (o bloco `build` com `target: "esnext"`, `minify: false`, `cssCodeSplit: false` está nas configurações de Lib e App1, e não na do host)

**Interpretação:** Atribui a lib e app-1 um bloco `build` ausente no host. O bloco está inteiro só em lib (lib/vite.config.ts:40-44); app-1 usa `minify: "esbuild"` (app-1/vite.config.ts:30-35), e o host também tem `target: "esnext"` (host/vite.config.ts:28-30), o que contradiz a afirmação. São opções de build, sem elemento de composição.

### 70. README.md:62

**Observação:** "Bis jetzt wurde nur lokal getestet, wie der Host sich im Livebetrieb verhält ist noch unklar." (até agora só se testou localmente; o comportamento do host em produção é desconhecido)

**Interpretação:** Afirma que não há execução fora da máquina local. As quatro aplicações têm deploy não observado (#55 a #58), e o host aponta para os remotes em `localhost` (#7).

### 71. README.md:62

**Observação:** "GitHub Action wurde implementiert" (foi implementada uma GitHub Action)

**Interpretação:** Nomeia o CI, que existe (.github/workflows/node.js.yml:1-23) e só constrói o workspace e a solução .NET. Não fala de unidades nem de mecanismo de MFE.

### 72. README.md:62

**Observação:** "Auch ein apiClient wird in der lib gepflegt und den anderen Anwendungen zur Verfügung gestellt." (um `apiClient` é mantido na lib e fornecido às outras aplicações)

**Interpretação:** Afirma um serviço que lib fornece às outras unidades. lib expõe `./apiClient` (#8) e o usa no `Confirm` (lib/src/components/Confirm.vue:7, 22), e app-1 o importa (app-1/src/main.ts:8; app-1/src/composables/api.ts:1). host e app-2 não o importam.

### 73. app-2/README.md:12

**Observação:** "Module Federation: Kann als Remote-Modul in andere Apps geladen werden" (pode ser carregada como módulo remoto em outras aplicações)

**Interpretação:** Afirma que app-2 é remote de Module Federation. A dependência (#2), a configuração com nome e módulos expostos (#6) e a relação ativa com o host (#52) confirmam a afirmação.

### 74. app-2/README.md:16

**Observação:** "Die App kommuniziert mit dem IdentityServer unter `http://localhost:5283/api/identity`" (a aplicação se comunica com o IdentityServer nesse endereço)

**Interpretação:** Fala da ligação de app-2 com um backend do próprio repositório, que não é unidade frontend. O cliente de app-2 usa essa base (app-2/src/services/authService.ts:3, 29-30), e o perfil do IdentityServer expõe a porta (Api/IdentityServer/Properties/launchSettings.json:9).

### 75. app-2/README.md:42

**Observação:** "Die App wird als `remote-app2` exponiert und kann in anderen Apps wie folgt verwendet werden" (a aplicação é exposta como `remote-app2` e usada em outras por `defineAsyncComponent(() => import("remote-app2/App2"))`)

**Interpretação:** Afirma o nome do remote e um uso possível. O nome e a exposição de `./App2` estão na configuração (#6), e o host faz esse carregamento (#11), embora sem renderizá-lo; o host usa de fato `LoginForm` e `RegisterForm` (#52).

### 76. app-2/src/App.vue:9

**Observação:** Comentário "Prüfen ob Router verfügbar ist (nur für standalone-Modus)" (verifica se há router, que só existe no modo standalone).

**Interpretação:** Afirma que app-2 tem um modo em que roda sozinha. A unidade com entrada própria (#46; app-2/index.html:11) e o router criado só na entrada isolada (app-2/src/main.ts:10-37) confirmam a afirmação.

### 77. app-2/vite.config.ts:16

**Observação:** Comentário `// Für standalone-Modus` na exposição `"./App2": "./src/App.vue"`.

**Interpretação:** Afirma que o `./App2` exposto é a aplicação do modo standalone. O arquivo exposto é o componente raiz montado pela entrada isolada (app-2/src/main.ts:4, 33; app-2/src/App.vue:80-82).

### 78. 184c4ab 2025-11-30 (host/src/main.ts, app-2/); 26e7bd2 2025-11-30 (host/src/components/Navigation.vue)

**Observação:** O `host/src/main.ts` do snapshot é a versão de `184c4ab` ("Tests und Login"), o commit que cria app-2. Os templates `App.vue`, `Home.vue` e `About.vue` do host não mudam desde antes desse commit; `Navigation.vue` muda em `184c4ab` e em `26e7bd2` ("Config"), e a versão intermediária não está disponível. Resultado: inconclusivo.

**Interpretação:** O registro de `AppTwo` sem uso nasce junto com app-2; fica em aberto se foi usado em algum momento. A dúvida é só sobre o passado: no snapshot, o carregamento não é usado.

### 79. 9a31597 2025-11-22 (host/src/router/index.ts, host/src/views/About.vue); 1cf6fc1 2025-11-23 (README.md); b09c7eb 2025-11-23 (host/src/views/About.vue); 184c4ab 2025-11-30 (host/src/router/index.ts)

**Observação:** O router do host e a `About.vue` são criados antes do README. O router só muda em `184c4ab`, quando entram as rotas remotas `/login` e `/register`; a `About.vue` fica igual desde `b09c7eb`. Nenhuma versão antiga está disponível. Resultado: inconclusivo.

**Interpretação:** A página local `/about` existe desde antes da frase do README; não se sabe se chegou a ter conteúdo remoto. A dúvida é só sobre o passado: no snapshot, `/about` é local.

### 80. 0f527a1 2025-11-22 (host/); b09c7eb 2025-11-23 (host/src/App.vue, host/src/components/Navigation.vue); 312d8f3 2025-11-23 (README.md)

**Observação:** Nenhum commit até o snapshot tem arquivo com "header" ou "footer" no nome sob `host/`. O `host/src/App.vue` do snapshot é a versão de `b09c7eb`; as anteriores não estão disponíveis. A última versão do README, `312d8f3`, diz "Es fehlt noch der Footer". Resultado: inconclusivo.

**Interpretação:** O host nunca teve componente próprio de cabeçalho ou rodapé; o conteúdo das versões antigas do `App.vue` não pode ser lido. A dúvida é só sobre o passado: no snapshot, não há cabeçalho nem rodapé no host.

### 81. 312d8f3 2025-11-23 (README.md); 184c4ab 2025-11-30 (app-2/, pnpm-workspace.yaml)

**Observação:** O README é alterado pela última vez em `312d8f3`, e o objeto é o mesmo do snapshot. `app-2/` não existe até `184c4ab`, que cria todos os seus arquivos e altera o `pnpm-workspace.yaml`. Resultado: esclarecido.

**Interpretação:** A contagem de três partes vem de um estágio anterior à criação de app-2; o README não foi atualizado depois.

### 82. 312d8f3 2025-11-23 (README.md, host/vite.config.ts, lib/vite.config.ts); a6a6c0c 2025-11-23, a0f3e3b 2025-11-23, 22bb24e 2025-11-24, 1727c5a 2025-11-24 (app-1/vite.config.ts); 184c4ab 2025-11-30, 26e7bd2 2025-11-30 (vite.config.ts)

**Observação:** Depois da última edição do README (`312d8f3`, "Vite Configs optimiert"), as três configurações citadas mudam de novo até o snapshot, várias vezes no caso de app-1; os objetos do snapshot diferem dos de `312d8f3`. As versões antigas não estão disponíveis. Resultado: esclarecido.

**Interpretação:** O bloco `build` do README e as configurações atuais são de estágios diferentes; a diferença vem de mudanças posteriores nas configurações.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (app-1/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 2 | 3.4.2 (app-2/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 3 | 3.4.2 (host/package.json:24) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #7 |
| 4 | 3.4.2 (lib/package.json:20) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8 |
| 5 | 3.4.2 (app-1/package.json:14, Evidência); 3.4.3 (app-1, Marcadores e Build); 3.4.4 (app-1/src/main.ts:11, host/src/main.ts:12, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #9, #10 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #45; configura #49; configura #50 |
| 6 | 3.4.2 (app-2/package.json:14, Evidência); 3.4.3 (app-2, Marcadores e Build); 3.4.4 (host/src/router/index.ts:7, host/src/router/index.ts:8, Observação); 3.4.5 #4, #6 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #9, #10, #15, #17 (Evidência); 3.4.7 #19 (Documento) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #46; configura #52; configura #54 |
| 7 | 3.4.2 (host/package.json:24, Evidência); 3.4.3 (host, Marcadores e Build); 3.4.4 (host/src/main.ts:12, host/src/main.ts:14, host/src/router/index.ts:7, Observação); 3.4.5 #2, #3, #4 (Configuração); 3.4.6 #1, #2, #3, #4 (Onde é servida, Artefatos); 3.4.7 #4, #7, #9, #10, #12 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #47; configura #50; configura #51; configura #52 |
| 8 | 3.4.2 (lib/package.json:20, Evidência); 3.4.3 (lib, Marcadores e Build); 3.4.4 (app-1/src/main.ts:11, host/src/main.ts:14, Observação); 3.4.5 #1, #3, #6 (Configuração); 3.4.6 #4 (Artefatos); 3.4.7 #3, #9, #10, #14 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #48; configura #49; configura #51 |
| 9 | 3.4.4 (app-1/src/main.ts:11) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #49 |
| 10 | 3.4.4 (host/src/main.ts:12) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #50 |
| 11 | 3.4.4 (host/src/main.ts:13) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 12 | 3.4.4 (host/src/main.ts:14) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #51 |
| 13 | 3.4.4 (host/src/router/index.ts:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #52 |
| 14 | 3.4.4 (host/src/router/index.ts:8) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #52 |
| 15 | 3.4.4 (lib/src/App.test.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 16 | 3.4.4 (lib/src/components/Confirm.test.ts:2) | 3 código | código-fonte | — | contexto | fraca | — |
| 17 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:115) | 3 código | código-fonte | — | contexto | fraca | — |
| 18 | 3.4.4 (lib/playwright-report/trace/sw.bundle.js:1) | 3 código | código-fonte | — | contexto | fraca | — |
| 19 | 3.4.4 (lib/playwright-report/index.html:58, src-dynamic-script) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:50, src-dynamic-script) | 3 código | código-fonte | — | contexto | fraca | — |
| 21 | 3.4.4 (lib/playwright-report/trace/snapshot.html:5) | 3 código | código-fonte | — | contexto | fraca | — |
| 22 | 3.4.4 (app-2/src/App.vue:24) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 23 | 3.4.4 (app-2/src/services/authService.ts:57) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 24 | 3.4.4 (app-2/src/services/authService.ts:99) | 3 código | código-fonte | events | tecnológica | fraca | — |
| 25 | 3.4.4 (lib/playwright-report/index.html:18) | 3 código | código-fonte | — | contexto | fraca | — |
| 26 | 3.4.4 (lib/playwright-report/index.html:26) | 3 código | código-fonte | — | contexto | fraca | — |
| 27 | 3.4.4 (lib/playwright-report/index.html:34) | 3 código | código-fonte | — | contexto | fraca | — |
| 28 | 3.4.4 (lib/playwright-report/index.html:57) | 3 código | código-fonte | — | contexto | fraca | — |
| 29 | 3.4.4 (lib/playwright-report/index.html:58, src-cross-unit-communication) | 3 código | código-fonte | — | contexto | fraca | — |
| 30 | 3.4.4 (lib/playwright-report/trace/assets/codeMirrorModule-Bucv2d7q.js:20) | 3 código | código-fonte | — | contexto | fraca | — |
| 31 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:18) | 3 código | código-fonte | — | contexto | fraca | — |
| 32 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:26) | 3 código | código-fonte | — | contexto | fraca | — |
| 33 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:49) | 3 código | código-fonte | — | contexto | fraca | — |
| 34 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:50, src-cross-unit-communication) | 3 código | código-fonte | — | contexto | fraca | — |
| 35 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:59) | 3 código | código-fonte | — | contexto | fraca | — |
| 36 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:121) | 3 código | código-fonte | — | contexto | fraca | — |
| 37 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:124) | 3 código | código-fonte | — | contexto | fraca | — |
| 38 | 3.4.4 (lib/playwright-report/trace/assets/defaultSettingsView-BEpdCv1S.js:266) | 3 código | código-fonte | — | contexto | fraca | — |
| 39 | 3.4.4 (lib/playwright-report/trace/sw.bundle.js:3) | 3 código | código-fonte | — | contexto | fraca | — |
| 40 | 3.4.4 (host/src/router/index.ts:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #50; implementa #52 |
| 41 | 3.4.4 (host/src/views/Home.vue:1) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #50 |
| 42 | 3.4.4 (app-1/src/App.vue:33) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #49; implementa #51 |
| 43 | 3.4.4 (app-2/src/services/authService.ts:67) | 3 código | código-fonte | other | tecnológica | moderada | implementa #53 |
| 44 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 45 | 3.4.3 (app-1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 46 | 3.4.3 (app-2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 47 | 3.4.3 (host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 48 | 3.4.3 (lib) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 49 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #45; liga #48 |
| 50 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #47; liga #45 |
| 51 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #47; liga #48 |
| 52 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #47; liga #46 |
| 53 | 3.4.5 #5 | 5 composição | código-fonte | other | arquitetural | forte | liga #46; liga #48 |
| 54 | 3.4.5 #6 | 5 composição | configuração | module-federation | arquitetural | moderada | liga #46; liga #48 |
| 55 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #45 |
| 56 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #46 |
| 57 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #47 |
| 58 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #48 |
| 59 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | contradiz host/src/router/index.ts:6; contradiz host/src/views/About.vue:1-5 |
| 60 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte host/src/App.vue:8-9; corrobora em parte host/src/components/Navigation.vue:26 |
| 61 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora #9; corrobora #12; corrobora #42; corrobora #49; corrobora #51 |
| 62 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #47; corrobora #7; corrobora #50; corrobora #51; corrobora #52 |
| 63 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #42; corrobora #49 |
| 64 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #46; contradiz pnpm-workspace.yaml:2-5 |
| 65 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #55; corrobora #58; corrobora #7; corrobora app-1/package.json:9-11; corrobora lib/package.json:8-10; corrobora host/package.json:7 |
| 66 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #45; corrobora #46; corrobora #47; corrobora #48; corrobora app-1/package.json:7; corrobora lib/package.json:7 |
| 67 | 3.4.7 #9 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #5; corrobora #6; corrobora #7; corrobora #8 |
| 68 | 3.4.7 #10 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #7; corrobora #5; corrobora #6; corrobora #8 |
| 69 | 3.4.7 #11 | 7 documentação | documentação | — | contexto | fraca | contradiz app-1/vite.config.ts:30-35; contradiz host/vite.config.ts:28-30 |
| 70 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #55; corrobora #56; corrobora #57; corrobora #58; corrobora #7 |
| 71 | 3.4.7 #13 | 7 documentação | documentação | — | contexto | fraca | corrobora .github/workflows/node.js.yml:1-23 |
| 72 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora lib/src/components/Confirm.vue:7, 22; corrobora app-1/src/main.ts:8; corrobora app-1/src/composables/api.ts:1 |
| 73 | 3.4.7 #15 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #2; corrobora #6; corrobora #52 |
| 74 | 3.4.7 #16 | 7 documentação | documentação | — | contexto | fraca | corrobora app-2/src/services/authService.ts:3, 29-30; corrobora Api/IdentityServer/Properties/launchSettings.json:9 |
| 75 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #6; corrobora #11 |
| 76 | 3.4.7 #18 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #46; corrobora app-2/index.html:11; corrobora app-2/src/main.ts:10-37 |
| 77 | 3.4.7 #19 | 7 documentação | comentário | — | arquitetural | fraca | corrobora app-2/src/main.ts:4, 33; corrobora app-2/src/App.vue:80-82 |
| 78 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #11 |
| 79 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #59 |
| 80 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #60 |
| 81 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #64; explica #46 |
| 82 | 3.4.8 #5 | 8 histórico | histórico | — | contexto | fraca | explica #69 |

## Resumo

Observações: 82. Dimensões (tecnologia: 4, configuração: 4, código: 35, estrutura: 5, composição: 6, build-deploy: 4, documentação: 19, histórico: 5). Força (forte: 14, moderada: 13, fraca: 55, ambígua: 0). Evidência (tecnológica: 13, arquitetural: 42, contexto: 27).

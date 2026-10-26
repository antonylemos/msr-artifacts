---
schema: 1
id: 1150753074
full_name: lorem98/mfe
commit: 44eb29500d7b90ac58ec760e35b8e0170d7b6fb4
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

# 174 — lorem98/mfe

## Leitura do repositório

Prova de conceito em que um container React compõe três remotes, `auth` e `marketing` em React e `dashboard` em Vue 3, com o `ModuleFederationPlugin` do próprio webpack 5. Por isso não há observação de dependência: o plugin vem de `webpack/lib/container`, e não de um pacote próprio.

A cadeia está completa e duplicada para desenvolvimento e produção:
- **Configuração:**
  - cada remote se declara com nome próprio, `remoteEntry.js` e um único módulo exposto, o próprio `bootstrap` (#1, #2, #5 a #8);
  - o container declara os três remotes, em localhost no desenvolvimento e em `${domain}/<pacote>/latest/remoteEntry.js` na produção (#3, #4).
- **Código:**
  - os remotes exportam `mount` (#13 a #15);
  - o container importa cada módulo remoto pelo nome (#21 a #23), o monta numa `div` própria (#16 a #18) e o `Switch` decide onde cada um aparece, com o dashboard protegido por login (#25).
- **Relações:** isso resulta nas três relações host → remote ativas (#34 a #36), entre quatro unidades com limites próprios (#26, #28, #30, #32). A integração é por função: o remote Vue entra no host React sem biblioteca de interop (#35, #17, #58).

A publicação é separada por aplicação (#37 a #40): cada pacote tem build próprio e um workflow que só dispara com mudanças na sua pasta e sincroniza o `dist` com o prefixo `<pacote>/latest` de um bucket comum, o mesmo caminho que o container usa para os remotes. Não há versionamento: todos publicam em `latest`.

Sinais que não sustentam a composição: os quatro bootstraps assíncronos (#9 a #12) e o `app.mount` do Vue (#19) são internos a cada unidade; as duas linhas da mineração nas configurações de desenvolvimento são comentários (#20, #24); os diretórios `config` são parte do build de cada pacote (#27, #29, #31, #33).

A documentação (#41 a #73) é um README didático que, no essencial, confere com essa cadeia. As divergências são de generalização: ele atribui a "cada remote" a sincronização de histórico e a montagem isolada com browser history, que o dashboard não segue (#50, #64); diz que todo SFC do dashboard usa `<style scoped>` (#67); explica a ordem de subida no desenvolvimento por um motivo que a configuração não sustenta (#68); e o comentário do `index.html` do auth diz que ele nunca é servido, mas o build o gera e o workflow o publica (#72). O compartilhamento de Vue "entre remotes Vue" é hipotético (#62). O histórico (#74 a #78) mostra que essas afirmações e o código que as desmente são do mesmo estágio, sem versão anterior que as justifique. Nada fica ambíguo no snapshot.

## Observações

### 1. packages/auth/config/webpack.dev.js:1-27

**Observação:** Em desenvolvimento, porta 8082. `ModuleFederationPlugin` declara `name: "auth"` e `filename: "remoteEntry.js"`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`. Um comentário acima do `exposes` mostra o import usado pelo container.

**Interpretação:** O auth está configurado como remote em desenvolvimento.

### 2. packages/auth/config/webpack.prod.js:1-26

**Observação:** Em produção, `publicPath: "/auth/latest/"`. `ModuleFederationPlugin` declara `name: "auth"` e `filename: "remoteEntry.js"`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`. A configuração é mesclada com a comum (`merge(commonConfig, prodConfig)`).

**Interpretação:** O auth está configurado como remote em produção, num caminho próprio.

**Nota:** Os `webpack.common.js` dos quatro pacotes, citados nas mesmas tabelas, só configuram loaders e o `HtmlWebpackPlugin` ou o `VueLoaderPlugin`, sem elemento da composição. Não viraram observação.

### 3. packages/container/config/webpack.dev.js:1-27

**Observação:** Em desenvolvimento, porta 8080. `ModuleFederationPlugin` declara `name: "container"`, os remotes `marketing@http://localhost:8081/remoteEntry.js`, `auth@http://localhost:8082/remoteEntry.js` e `dashboard@http://localhost:8083/remoteEntry.js`, e compartilha as `dependencies` do `package.json`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em desenvolvimento.

### 4. packages/container/config/webpack.prod.js:1-27

**Observação:** Em produção, `publicPath: "/container/latest/"`. `ModuleFederationPlugin` declara `name: "container"` e os remotes `marketing`, `auth` e `dashboard` em `${domain}/<pacote>/latest/remoteEntry.js`, com `domain` vindo de `PRODUCTION_DOMAIN`, e compartilha as `dependencies` do `package.json`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em produção.

### 5. packages/dashboard/config/webpack.dev.js:1-37

**Observação:** Em desenvolvimento, porta 8083. `ModuleFederationPlugin` declara `name: "dashboard"` e `filename: "remoteEntry.js"`, expõe `./DashboardApp` (`./src/bootstrap`) e compartilha só `vue`, com `singleton: true` e a versão do `package.json`. O `HtmlWebpackPlugin` usa `./public/index.html`.

**Interpretação:** O dashboard está configurado como remote em desenvolvimento, com o runtime do Vue como singleton.

### 6. packages/dashboard/config/webpack.prod.js:1-31

**Observação:** Em produção, `publicPath: "/dashboard/latest/"`. `ModuleFederationPlugin` declara `name: "dashboard"` e `filename: "remoteEntry.js"`, expõe `./DashboardApp` (`./src/bootstrap`) e compartilha `vue` como singleton. Não há `HtmlWebpackPlugin`.

**Interpretação:** O dashboard está configurado como remote em produção, num caminho próprio.

### 7. packages/marketing/config/webpack.dev.js:1-30

**Observação:** Em desenvolvimento, porta 8081. `ModuleFederationPlugin` declara `name: "marketing"` e `filename: "remoteEntry.js"`, expõe `./MarketingApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O marketing está configurado como remote em desenvolvimento.

### 8. packages/marketing/config/webpack.prod.js:1-24

**Observação:** Em produção, `publicPath: "/marketing/latest/"`. `ModuleFederationPlugin` declara `name: "marketing"` e `filename: "remoteEntry.js"`, expõe `./MarketingApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O marketing está configurado como remote em produção, num caminho próprio.

### 9. packages/auth/src/index.js:4

**Observação:** `import("./bootstrap")`, precedido de um comentário que o justifica pela negociação das bibliotecas compartilhadas.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 10. packages/container/src/index.js:1

**Observação:** `import("./bootstrap")`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 11. packages/dashboard/src/index.js:3

**Observação:** `import("./bootstrap")`, precedido de um comentário que o justifica pela negociação das bibliotecas compartilhadas.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 12. packages/marketing/src/index.js:1

**Observação:** `import("./bootstrap")`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 13. packages/auth/src/bootstrap.js:57; packages/auth/src/bootstrap.js:22-42

**Observação:** `export { mount }` no arquivo exposto como `./AuthApp`. O `mount(el, { onSignIn, onNavigate, defaultHistory, initialPath })` renderiza a aplicação com um memory history iniciado em `initialPath` (ou `/auth/signin`) e devolve `onParentNavigate`.

**Interpretação:** O auth oferece a função de montagem ao host, com sincronização de navegação e um sinal de login.

### 14. packages/dashboard/src/bootstrap.js:36; packages/dashboard/src/bootstrap.js:12-21

**Observação:** `export { mount }` no arquivo exposto como `./DashboardApp`. O `mount(el)` cria a aplicação Vue com `createApp`, a monta no elemento e devolve um `onParentNavigate` vazio, descrito como placeholder.

**Interpretação:** O dashboard oferece a função de montagem ao host, sem troca de navegação.

### 15. packages/marketing/src/bootstrap.js:46; packages/marketing/src/bootstrap.js:7-30

**Observação:** `export { mount }` no arquivo exposto como `./MarketingApp`. O `mount(el, { onNavigate, defaultHistory })` usa `createMemoryHistory()` quando não recebe history e devolve `onParentNavigate`.

**Interpretação:** O marketing oferece a função de montagem ao host, com sincronização de navegação.

### 16. packages/container/src/components/AuthApp.js:26-38

**Observação:** Chama `mount(ref.current, { onSignIn, initialPath: history.location.pathname, onNavigate })` e registra o `onParentNavigate` devolvido no history do container.

**Interpretação:** O host monta o remote auth num elemento próprio, sincroniza a navegação e recebe o sinal de login.

### 17. packages/container/src/components/DashboardApp.js:21

**Observação:** Chama `mount(ref.current)` e não usa o retorno.

**Interpretação:** O host monta o remote Vue num elemento próprio, sem troca de navegação.

### 18. packages/container/src/components/MarketingApp.js:10-22

**Observação:** Chama `mount(ref.current, { onNavigate })` e registra o `onParentNavigate` devolvido no history do container.

**Interpretação:** O host monta o remote marketing num elemento próprio e sincroniza a navegação com ele.

### 19. packages/dashboard/src/bootstrap.js:14

**Observação:** `app.mount(el)` do Vue, dentro do `mount` exportado.

**Interpretação:** É uma renderização interna ao dashboard, sem mecanismo de MFE.

### 20. packages/auth/config/webpack.dev.js:19

**Observação:** Linha de comentário: `// The container imports this as:  import { mount } from "auth/AuthApp"`.

**Interpretação:** É um comentário explicativo sobre o `exposes`, não código executável.

### 21. packages/container/src/components/AuthApp.js:1

**Observação:** `import { mount } from "auth/AuthApp"`.

**Interpretação:** O host importa o módulo exposto pelo remote auth, pelo nome dele.

### 22. packages/container/src/components/DashboardApp.js:1

**Observação:** `import { mount } from "dashboard/DashboardApp"`.

**Interpretação:** O host importa o módulo exposto pelo remote dashboard, pelo nome dele.

### 23. packages/container/src/components/MarketingApp.js:1

**Observação:** `import { mount } from "marketing/MarketingApp"`.

**Interpretação:** O host importa o módulo exposto pelo remote marketing, pelo nome dele.

### 24. packages/dashboard/config/webpack.dev.js:20

**Observação:** Linha de comentário: `// The container imports this as:  import { mount } from "dashboard/DashboardApp"`.

**Interpretação:** É um comentário explicativo sobre o `exposes`, não código executável.

### 25. packages/container/src/App.js:25-44; packages/container/src/App.js:5-7; packages/container/src/bootstrap.js:5

**Observação:** O `Switch` liga `/auth` ao `AuthApp` (que recebe `onSignIn`), `/dashboard` ao `DashboardApp` só com `signedIn` (senão redireciona para `/auth/signin`) e `/` ao `MarketingApp`. Os wrappers são importados no topo, e o `App` é montado em `#root`.

**Interpretação:** O roteamento do host declara onde cada remote aparece na UI.

### 26. packages/auth; packages/auth/package.json:1-30; packages/auth/src/index.js:4; packages/auth/src/bootstrap.js:48-53; packages/auth/config/webpack.prod.js:8-24; .github/workflows/auth.yml:7-26

**Observação:** Tem manifesto, entrada, configurações webpack de desenvolvimento e produção referenciadas pelos scripts e workflow de deploy próprios. Em desenvolvimento, monta a si mesmo em `#_auth-dev-root`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 27. packages/auth/config

**Observação:** Contém as três configurações webpack do auth.

**Interpretação:** É parte do build do auth, e não uma aplicação.

### 28. packages/container; packages/container/package.json:1-31; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5; packages/container/config/webpack.prod.js:8-25; .github/workflows/container.yml:7-26

**Observação:** Tem manifesto, entrada que monta o React em `#root`, configurações webpack referenciadas pelos scripts e workflow de deploy próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 29. packages/container/config

**Observação:** Contém as três configurações webpack do container.

**Interpretação:** É parte do build do container, e não uma aplicação.

### 30. packages/dashboard; packages/dashboard/package.json:1-34; packages/dashboard/src/index.js:3; packages/dashboard/src/bootstrap.js:26-32; packages/dashboard/config/webpack.prod.js:8-29; .github/workflows/dashboard.yml:7-26

**Observação:** Tem manifesto, entrada, configurações webpack referenciadas pelos scripts e workflow de deploy próprios. Em desenvolvimento, monta a aplicação Vue em `#_dashboard-dev-root`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 31. packages/dashboard/config

**Observação:** Contém as três configurações webpack do dashboard.

**Interpretação:** É parte do build do dashboard, e não uma aplicação.

### 32. packages/marketing; packages/marketing/package.json:1-30; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:34-41; packages/marketing/config/webpack.prod.js:6-22; .github/workflows/marketing.yml:7-24

**Observação:** Tem manifesto, entrada, configurações webpack referenciadas pelos scripts e workflow de deploy próprios. Em desenvolvimento, monta a si mesmo em `#_marketing-dev-root`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 33. packages/marketing/config

**Observação:** Contém as três configurações webpack do marketing.

**Interpretação:** É parte do build do marketing, e não uma aplicação.

### 34. packages/container/src/components/AuthApp.js:1, 26; packages/container/src/App.js:25-29; packages/container/config/webpack.dev.js:19; packages/container/config/webpack.prod.js:19; packages/auth/config/webpack.prod.js:12, 16-20; packages/auth/src/bootstrap.js:57

**Observação:** O container importa `mount` de `auth/AuthApp` e o chama no wrapper ligado à rota `/auth`. O nome `auth`, o módulo `./AuthApp` e o caminho `/auth/latest/` correspondem à configuração do auth.

**Interpretação:** É uma relação host → remote ativa. É a única em que o remote devolve um sinal de estado ao host (`onSignIn`).

### 35. packages/container/src/components/DashboardApp.js:1, 21; packages/container/src/App.js:25, 32-38; packages/container/config/webpack.dev.js:20; packages/container/config/webpack.prod.js:20; packages/dashboard/config/webpack.prod.js:12, 16-20; packages/dashboard/src/bootstrap.js:36

**Observação:** O container importa `mount` de `dashboard/DashboardApp` e o chama no wrapper ligado à rota `/dashboard`, só com `signedIn`. O nome, o módulo e o caminho `/dashboard/latest/` correspondem à configuração do dashboard.

**Interpretação:** É uma relação host → remote ativa entre um host React e um remote Vue, sem troca de navegação.

### 36. packages/container/src/components/MarketingApp.js:1, 10; packages/container/src/App.js:25, 41-43; packages/container/config/webpack.dev.js:18; packages/container/config/webpack.prod.js:18; packages/marketing/config/webpack.prod.js:10, 14-18; packages/marketing/src/bootstrap.js:46

**Observação:** O container importa `mount` de `marketing/MarketingApp` e o chama no wrapper ligado à rota `/`, a última do `Switch`. O nome, o módulo e o caminho `/marketing/latest/` correspondem à configuração do marketing.

**Interpretação:** É uma relação host → remote ativa.

### 37. packages/auth/package.json:6; packages/auth/config/webpack.prod.js:8-23; .github/workflows/auth.yml:3-12, 20-23, 26, 32

**Observação:** O build usa a configuração de produção do pacote. Um workflow próprio dispara em push para `master` quando `packages/auth/**` muda, constrói na pasta do pacote, sincroniza o `dist` com `auth/latest` e invalida `/auth/latest/index.html` no CloudFront. Bucket e distribuição são os mesmos dos outros pacotes.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 38. packages/container/package.json:6; packages/container/config/webpack.prod.js:6-24; .github/workflows/container.yml:3-12, 20-23, 26, 32

**Observação:** Um workflow próprio constrói o container com `PRODUCTION_DOMAIN`, sincroniza o `dist` com `container/latest` e invalida o `index.html`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. Os remotes não entram no artefato do container, que os busca em `latest` em tempo de execução.

### 39. packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:8-28; .github/workflows/dashboard.yml:3-12, 20-23, 26, 32

**Observação:** Um workflow próprio dispara quando `packages/dashboard/**` muda, sincroniza o `dist` com `dashboard/latest` e invalida o `index.html`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 40. packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:6-21; .github/workflows/marketing.yml:3-12, 20-21, 24, 30

**Observação:** Um workflow próprio dispara quando `packages/marketing/**` muda, sincroniza o `dist` com `marketing/latest` e invalida o `remoteEntry.js`. É o único que não passa `PRODUCTION_DOMAIN`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 41. README.md:3

**Observação:** "A production-style **micro frontend monorepo** that demonstrates how to split a web application into independently deployable packages using **Webpack 5 Module Federation**."

**Interpretação:** A documentação apresenta o repositório como monorepo de unidades com deploy independente, ligadas por Module Federation. As quatro unidades, as relações e os deploys separados confirmam.

### 42. README.md:5

**Observação:** "The PoC deliberately spans two JavaScript frameworks (**React 17** and **Vue 3**) to show that Module Federation is framework-agnostic."

**Interpretação:** A documentação diz que a composição independe do framework das unidades. Os `package.json` e as três relações de mesma forma confirmam.

### 43. README.md:45-52

**Observação:** Diagrama: o navegador carrega `container/index.html`, o bundle do container negocia as bibliotecas compartilhadas e busca `marketing/remoteEntry.js`, `auth/remoteEntry.js` e `dashboard/remoteEntry.js`.

**Interpretação:** A documentação descreve o host carregando os três remotes em tempo de execução. Confirmado, com a simplificação de que os remotes expõem o `bootstrap`, não as páginas.

### 44. README.md:54

**Observação:** "Each remote is a **separate webpack build** that can be deployed independently. When the marketing team pushes a change, only `marketing/remoteEntry.js` is updated — the container and other remotes are unaffected."

**Interpretação:** A documentação afirma build e deploy independentes por remote. Os workflows e o caminho fixo do remote no container confirmam.

### 45. README.md:60-90

**Observação:** Diagrama de página única: o container com as rotas `/` → marketing, `/auth` → auth e `/dashboard` (protegida) → dashboard.

**Interpretação:** A documentação descreve a composição por rotas do host. O `Switch` e as relações confirmam.

### 46. README.md:94-105

**Observação:** Diagrama: "container [...] HOST — consumes all remotes", "imports at runtime", "marketing / auth / dashboard [...] REMOTES — expose modules".

**Interpretação:** A documentação descreve a organização host/remotes. A configuração do host e as relações confirmam.

### 47. README.md:119

**Observação:** "Owns the top-level `<BrowserRouter>` and `<Switch>`." (sobre o container)

**Interpretação:** A documentação põe o roteamento de topo no host. Confirmado: os remotes React usam `Router` com o history recebido.

### 48. README.md:120

**Observação:** "Holds the `signedIn` auth state in React's `useState`." (sobre o container)

**Interpretação:** A documentação diz que o estado de autenticação fica no host, não num remote. Confirmado.

### 49. README.md:122-123

**Observação:** "Renders a thin wrapper component for each remote that: 1. Calls the remote's `mount()` function with a DOM ref."

**Interpretação:** A documentação descreve o contrato de montagem entre host e remotes. Os três wrappers confirmam.

### 50. README.md:122, 124

**Observação:** "Renders a thin wrapper component for each remote that: [...] 2. Keeps routing histories in sync".

**Interpretação:** A documentação generaliza para todos os remotes a sincronização de navegação. Vale para marketing e auth; o dashboard não tem history e seu wrapper ignora o retorno de `mount`, o que desmente a generalização.

### 51. README.md:133

**Observação:** "`webpack.prod.js` — production build + remotes via env var" (sobre o container)

**Interpretação:** A documentação diz que os endereços dos remotes vêm de variável de ambiente na produção. A configuração do host e o workflow do container confirmam.

### 52. README.md:152

**Observação:** "**Exposes** `./MarketingApp` via Module Federation."

**Interpretação:** A documentação nomeia o módulo exposto pelo marketing. Confirmado.

### 53. README.md:158

**Observação:** "The app uses an **internal memory history** when embedded in the container and a **browser history** when run in isolation" (sobre o marketing)

**Interpretação:** A documentação descreve o marketing funcionando embutido e isolado. O `bootstrap` e o wrapper confirmam.

### 54. README.md:182

**Observação:** "**Exposes** `./AuthApp` via Module Federation."

**Interpretação:** A documentação nomeia o módulo exposto pelo auth. Confirmado.

### 55. README.md:188-190

**Observação:** "On a successful submission the auth MFE: 1. Calls `onSignIn()` → container sets `signedIn = true`. 2. Navigates its internal history to `/dashboard` → container mirrors this and renders `<DashboardApp>`."

**Interpretação:** A documentação descreve o remote auth sinalizando o login ao host, que libera o dashboard. Confirmado; a revisão de composição tratou esses callbacks dentro da relação, sem relação própria.

### 56. README.md:198, 201

**Observação:** "public/index.html — dev isolation HTML (#_auth-dev-root)" / "bootstrap.js — mount() + dev isolation logic".

**Interpretação:** A documentação diz que o auth roda isolado em desenvolvimento. Confirmado.

### 57. README.md:214

**Observação:** "**Exposes** `./DashboardApp` via Module Federation."

**Interpretação:** A documentação nomeia o módulo exposto pelo dashboard. Confirmado.

### 58. README.md:214

**Observação:** "a Vue app rendered inside a React container with **zero React↔Vue interop library**".

**Interpretação:** A documentação diz que o remote Vue entra no host React só pela função `mount`. Confirmado: o container não tem biblioteca de interop.

### 59. README.md:228, 231

**Observação:** "public/index.html — dev isolation HTML (#_dashboard-dev-root)" / "bootstrap.js — mount() using createApp() + dev isolation".

**Interpretação:** A documentação diz que o dashboard roda isolado em desenvolvimento. Confirmado.

### 60. README.md:243

**Observação:** "Each package has its own `webpack.dev.js` / `webpack.prod.js` and its own CI workflow. You can build and deploy **marketing alone** without touching the container."

**Interpretação:** A documentação afirma build e deploy próprios por pacote. Confirmado.

### 61. README.md:247

**Observação:** "The container and every React remote list their `package.json` `dependencies` as `shared` in `ModuleFederationPlugin`. Webpack ensures **only one copy** of React and ReactDOM is loaded in the browser".

**Interpretação:** A documentação descreve o compartilhamento das dependências React. As configurações confirmam; sem `singleton`, a cópia única depende de faixas de versão compatíveis, como são.

### 62. README.md:256

**Observação:** "For the Vue dashboard, Vue is shared with `singleton: true` so that all Vue-based remotes (should you add more) use the same Vue runtime."

**Interpretação:** A configuração do singleton existe, mas o compartilhamento entre remotes Vue é hipotético: o dashboard é o único pacote com Vue. Confirmada em parte.

### 63. README.md:273

**Observação:** "Every remote can be started **standalone** without the container."

**Interpretação:** A documentação afirma a execução isolada de cada remote. Os três `bootstrap` confirmam.

### 64. README.md:273

**Observação:** "Each `bootstrap.js` detects a dev-specific root element and mounts directly with a browser history".

**Interpretação:** Vale para marketing e auth; o dashboard detecta o elemento, mas monta sem history, o que desmente a generalização.

### 65. README.md:337

**Observação:** "Auth additionally receives `initialPath` so its memory history starts at the current URL segment (e.g. `/auth/signin`)."

**Interpretação:** A documentação descreve um parâmetro do contrato entre host e auth. Confirmado.

### 66. README.md:375-381

**Observação:** "Each app uses `createGenerateClassName` with a unique `productionPrefix`", com a tabela container `co`, marketing `ma`, auth `au`.

**Interpretação:** A documentação descreve o isolamento de CSS entre as unidades React na mesma página. Confirmado; o dashboard não usa Material-UI.

### 67. README.md:383

**Observação:** "The Vue dashboard uses scoped `<style scoped>` in every SFC which emits `data-v-*` attributes — completely isolated from the React CSS."

**Interpretação:** O `Dashboard.vue` usa `scoped`, mas o `App.vue` não, o que desmente o "every SFC"; o isolamento prático vem dos seletores sob `.dashboard-shell`.

### 68. README.md:412

**Observação:** "start the remotes (marketing, auth, dashboard) before the container, otherwise the container's dev server will fail to fetch the remote entry files on first load."

**Interpretação:** Confirma-se só que a primeira carga da página do container precisa dos remotes no ar. A explicação é desmentida: os `remoteEntry.js` são buscados pelo navegador em tempo de execução, não pelo servidor de desenvolvimento.

### 69. README.md:437, 453

**Observação:** "Each package builds to a `dist/` folder" / "Serve each `dist/` from an S3 bucket + CloudFront".

**Interpretação:** A documentação descreve a publicação de cada pacote. Os workflows confirmam.

### 70. README.md:459, 466-471

**Observação:** "GitHub Actions workflows in `.github/workflows/` trigger on pushes to `master` in the relevant package directory.", com uma tabela de um workflow e um caminho S3 por pacote.

**Interpretação:** A documentação descreve o deploy por pacote. Os quatro workflows confirmam.

### 71. README.md:489-493

**Observação:** Roteiro para um remote novo: "Add a wrapper component in `packages/container/src/components/MyApp.js`. Register the remote in the container's `webpack.dev.js` and `webpack.prod.js`. Add a `<Route>` in `packages/container/src/App.js`."

**Interpretação:** A documentação mostra que os remotes são fixos no host: um remote novo exige mudar e republicar o container. Confirmado.

### 72. packages/auth/public/index.html:10-13

**Observação:** Comentário: "it never serves this HTML file directly. This file is only used when the auth package is run in isolation".

**Interpretação:** O comentário é desmentido: a configuração comum do auth, usada na produção, gera esse HTML, e o workflow o publica e invalida no CloudFront.

### 73. packages/dashboard/public/index.html:10-12

**Observação:** Comentário: "this HTML is only used when running the dashboard in isolation".

**Interpretação:** O comentário confere: só a configuração de desenvolvimento usa o template.

### 74. 2be6f54 2026-03-24 (navegação entre container e marketing); 6af9f6d 2026-05-11 (packages/auth); 91feee5 2026-05-11 (README.md, packages/dashboard/src/bootstrap.js, packages/container/src/components/DashboardApp.js)

**Observação:** O padrão de sincronização de histórico entra com o marketing (`2be6f54`) e o auth (`6af9f6d`). O README e o dashboard nascem juntos em `91feee5`, e seus objetos não mudam até o snapshot.

**Interpretação:** A generalização "em cada remote" e o dashboard sem roteamento são do mesmo estágio; a contradição não vem de estágios diferentes do repositório.

### 75. README.md:256; packages/dashboard/config/webpack.prod.js:21-26

**Observação:** O ponto não teve consulta ao histórico: o README marca o caso como hipótese ("should you add more"), e o snapshot tem um só pacote Vue.

**Interpretação:** A frase descreve uma extensão possível, não um estado do repositório; o snapshot resolve o ponto.

### 76. 91feee5 2026-05-11 (packages/dashboard/src/App.vue, packages/dashboard/src/components/Dashboard.vue, README.md); d1cf5a5 2026-05-21 (packages/dashboard/src/App.vue); 44eb295 2026-05-21 (packages/dashboard/src/App.vue)

**Observação:** Os dois SFC e o README são criados em `91feee5`. O `App.vue` muda num commit temporário (`d1cf5a5`) e volta ao objeto de `91feee5` em `44eb295`.

**Interpretação:** O `<style>` sem `scoped` do `App.vue` é do mesmo estágio do README, não resto nem mudança posterior.

### 77. 91feee5 2026-05-11 (packages/container/config/webpack.dev.js, packages/container/src, README.md)

**Observação:** A configuração de desenvolvimento e os wrappers do container estão no snapshot como em `91feee5`, o commit que cria o README.

**Interpretação:** A instrução sobre a ordem de subida foi escrita com a configuração atual; não sobra de uma configuração anterior.

### 78. 6af9f6d 2026-05-11 (packages/auth/public/index.html, packages/auth/config/webpack.common.js); 60008a4 2026-05-21 (.github/workflows/auth.yml)

**Observação:** O `index.html` com o comentário e o `webpack.common.js` que gera o HTML na produção são criados juntos em `6af9f6d` e não mudam até o snapshot. O workflow que publica e invalida o HTML entra depois, em `60008a4`, com a mesma forma do workflow do container.

**Interpretação:** O comentário não descreve um estágio anterior do build: já não conferia no commit em que foi escrito.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Marcadores); 3.4.4 (packages/auth/src/bootstrap.js:57, Observação); 3.4.4 (packages/auth/config/webpack.dev.js:19, Observação); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #26; configura #34 |
| 2 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Marcadores); 3.4.4 (packages/auth/src/bootstrap.js:57, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida, Artefatos); 3.4.7 #14, #21, #32 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #26; configura #34 |
| 3 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.5 #1, #2, #3 (Configuração); 3.4.7 #3, #28, #31 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #28; configura #34; configura #35; configura #36 |
| 4 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.4 (packages/container/src/components/AuthApp.js:26, DashboardApp.js:21, MarketingApp.js:10, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #2 (Onde é servida, Artefatos); 3.4.7 #1, #4, #6, #11, #21, #31 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #28; configura #34; configura #35; configura #36 |
| 5 | 3.4.3 (packages/dashboard, Entrada, Build); 3.4.3 (packages/dashboard/config, Marcadores); 3.4.4 (packages/dashboard/src/bootstrap.js:36, Observação); 3.4.4 (packages/dashboard/config/webpack.dev.js:20, Observação); 3.4.5 #2 (Configuração); 3.4.7 #22, #33 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #35 |
| 6 | 3.4.3 (packages/dashboard, Build); 3.4.3 (packages/dashboard/config, Marcadores); 3.4.4 (packages/dashboard/src/bootstrap.js:36, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Onde é servida, Artefatos); 3.4.7 #17, #22, #33 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #35 |
| 7 | 3.4.3 (packages/marketing, Entrada, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (packages/marketing/src/bootstrap.js:46, Observação); 3.4.5 #3 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #32; configura #36 |
| 8 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (packages/marketing/src/bootstrap.js:46, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Onde é servida, Artefatos); 3.4.7 #12, #21 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #32; configura #36 |
| 9 | 3.4.4 (packages/auth/src/index.js:4) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 10 | 3.4.4 (packages/container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 11 | 3.4.4 (packages/dashboard/src/index.js:3) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 12 | 3.4.4 (packages/marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (packages/auth/src/bootstrap.js:57) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #34 |
| 14 | 3.4.4 (packages/dashboard/src/bootstrap.js:36) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #35 |
| 15 | 3.4.4 (packages/marketing/src/bootstrap.js:46) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #36 |
| 16 | 3.4.4 (packages/container/src/components/AuthApp.js:26) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #34 |
| 17 | 3.4.4 (packages/container/src/components/DashboardApp.js:21) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #35 |
| 18 | 3.4.4 (packages/container/src/components/MarketingApp.js:10) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #36 |
| 19 | 3.4.4 (packages/dashboard/src/bootstrap.js:14) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (packages/auth/config/webpack.dev.js:19) | 3 código | comentário | — | contexto | fraca | — |
| 21 | 3.4.4 (packages/container/src/components/AuthApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #34 |
| 22 | 3.4.4 (packages/container/src/components/DashboardApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #35 |
| 23 | 3.4.4 (packages/container/src/components/MarketingApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #36 |
| 24 | 3.4.4 (packages/dashboard/config/webpack.dev.js:20) | 3 código | comentário | — | contexto | fraca | — |
| 25 | 3.4.4 (packages/container/src/App.js:25) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #34; implementa #35; implementa #36 |
| 26 | 3.4.3 (packages/auth) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.3 (packages/auth/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 28 | 3.4.3 (packages/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (packages/container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 30 | 3.4.3 (packages/dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (packages/dashboard/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 32 | 3.4.3 (packages/marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.3 (packages/marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 34 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #28; liga #26 |
| 35 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #28; liga #30 |
| 36 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #28; liga #32 |
| 37 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #26 |
| 38 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #28 |
| 39 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #30 |
| 40 | 3.4.6 #4 | 6 build-deploy | CI | — | arquitetural | moderada | publica #32 |
| 41 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #26; corrobora #28; corrobora #30; corrobora #32; corrobora #34; corrobora #35; corrobora #36; corrobora #37; corrobora #38; corrobora #39; corrobora #40; corrobora #4; corrobora packages/container/package.json:26 |
| 42 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #34; corrobora #35; corrobora #36; corrobora packages/container/package.json:11; corrobora packages/auth/package.json:11; corrobora packages/marketing/package.json:11; corrobora packages/dashboard/package.json:13 |
| 43 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #34; corrobora #35; corrobora #36; corrobora #3; corrobora packages/marketing/src/App.js:19-20; corrobora packages/auth/src/App.js:18-23; corrobora #14 |
| 44 | 3.4.7 #4 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #37; corrobora #39; corrobora #40; corrobora #4 |
| 45 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora #34; corrobora #35; corrobora #36 |
| 46 | 3.4.7 #6 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #34; corrobora #35; corrobora #36; corrobora #4 |
| 47 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora packages/container/src/App.js:17; corrobora packages/marketing/src/App.js:17; corrobora packages/auth/src/App.js:16 |
| 48 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/container/src/App.js:14; corrobora #25; corrobora packages/auth/src/App.js:13 |
| 49 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #17; corrobora #18; corrobora #34; corrobora #35; corrobora #36 |
| 50 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #35; contradiz #17; contradiz #14 |
| 51 | 3.4.7 #11 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #38; corrobora #4 |
| 52 | 3.4.7 #12 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #36; corrobora #8; corrobora #23 |
| 53 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #15; corrobora #32; corrobora #18 |
| 54 | 3.4.7 #14 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #34; corrobora #2; corrobora #21 |
| 55 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/auth/src/components/Signin.js:57-63; corrobora packages/auth/src/components/Signup.js:58-62; corrobora #16; corrobora #25 |
| 56 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #26; corrobora packages/auth/public/index.html:15 |
| 57 | 3.4.7 #17 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #35; corrobora #6; corrobora #22 |
| 58 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #35; corrobora #22; corrobora #17; corrobora #14; corrobora packages/container/package.json:8-14 |
| 59 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #30; corrobora packages/dashboard/public/index.html:14 |
| 60 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #26; corrobora #28; corrobora #30; corrobora #32; corrobora #37; corrobora #38; corrobora #39; corrobora #40 |
| 61 | 3.4.7 #21 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #4; corrobora #2; corrobora #8; corrobora packages/container/package.json:11-12; corrobora packages/auth/package.json:11-12; corrobora packages/marketing/package.json:11-12 |
| 62 | 3.4.7 #22 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora em parte #6; corrobora em parte #5; corrobora em parte packages/container/package.json:8-14 |
| 63 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #26; corrobora #30; corrobora #32 |
| 64 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #14; contradiz #30 |
| 65 | 3.4.7 #25 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #13 |
| 66 | 3.4.7 #26 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/container/src/App.js:9-11; corrobora packages/marketing/src/App.js:9-11; corrobora packages/auth/src/App.js:9-11 |
| 67 | 3.4.7 #27 | 7 documentação | documentação | — | arquitetural | fraca | contradiz packages/dashboard/src/App.vue:16-28 |
| 68 | 3.4.7 #28 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #3; contradiz #38 |
| 69 | 3.4.7 #29 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #37; corrobora #38; corrobora #39; corrobora #40 |
| 70 | 3.4.7 #30 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #37; corrobora #38; corrobora #39; corrobora #40 |
| 71 | 3.4.7 #31 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #3; corrobora #4; corrobora #25 |
| 72 | 3.4.7 #32 | 7 documentação | comentário | — | arquitetural | fraca | contradiz #37; contradiz #2; contradiz packages/auth/config/webpack.common.js:19-23 |
| 73 | 3.4.7 #33 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #6; corrobora #5; corrobora packages/dashboard/config/webpack.common.js:35 |
| 74 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #50; explica #64 |
| 75 | 3.4.8 #2 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #62 |
| 76 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #67 |
| 77 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #68 |
| 78 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #72 |

## Resumo

Observações: 78. Dimensões (tecnologia: 0, configuração: 8, código: 17, estrutura: 8, composição: 3, build-deploy: 4, documentação: 33, histórico: 5). Força (forte: 9, moderada: 20, fraca: 49, ambígua: 0). Evidência (tecnológica: 22, arquitetural: 49, contexto: 7).

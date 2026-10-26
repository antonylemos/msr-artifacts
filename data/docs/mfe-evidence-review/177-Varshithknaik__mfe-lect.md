---
schema: 1
id: 1063353073
full_name: Varshithknaik/mfe-lect
commit: deea3350c74ee5de8427c190378733b644ae4b53
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

# 177 — Varshithknaik/mfe-lect

## Leitura do repositório

É um projeto de aprendizado de Module Federation com webpack 5. Um container React compõe remotes React `auth` e `marketing` e, numa das cópias, um dashboard Vue. O plugin vem no próprio webpack, por isso não há observação de dependência.

O snapshot tem duas árvores com os mesmos nomes de unidade:
- **raiz:** `container`, `marketing` e `auth`, publicados por workflows;
- **`packages/`:** `container`, `marketing`, `auth` e `dashboard`, uma cópia completa sem workflow.

A cadeia é a mesma nas duas árvores, duplicada para desenvolvimento e produção:
- **Configuração:**
  - cada remote se declara com nome próprio, `remoteEntry.js` e um módulo exposto (#1, #2, #5 a #8, #11 a #14);
  - cada container declara os remotes da sua árvore (#3, #4, #9, #10). Em produção, eles ficam em `<domínio>/<app>/latest/remoteEntry.js`.
- **Código:**
  - os remotes exportam `mount` (#22 a #26);
  - os containers importam cada módulo remoto pelo nome (#33 a #37) e o montam num elemento próprio (#27 a #31);
  - as rotas de cada container decidem onde cada remote aparece (#38, #39).
- **Relações:** isso resulta em cinco relações host → remote ativas (#55 a #59), entre sete unidades com limites próprios (#40, #42, #45, #47, #49, #51, #53).

Build e deploy (#60 a #66):
- as sete aplicações têm build próprio;
- só as três da raiz têm deploy, cada uma com workflow próprio que publica num prefixo `latest` do mesmo bucket e invalida só o seu arquivo de entrada (#60 a #62);
- a cópia de `packages/` não é publicada por nenhum workflow (#63 a #66);
- não há versionamento independente.

Sinais que enganam ou ficam de fora:
- Os bootstraps assíncronos (#15 a #21) e o `app.mount` do Vue (#32) são internos a cada unidade.
- Os diretórios `config` (#41, #43, #46, #48, #50, #52, #54) só guardam o build da unidade acima.
- O `dashboard/` da raiz (#44) só tem `package.json`. Na raiz, o remote e a rota do dashboard estão comentados (#4, #38). O histórico mostra que eles nunca foram ligados nessa árvore (#83).
- As duas cópias usam os mesmos nomes, portas e `publicPath`, então a configuração sozinha não separa o auth e o marketing da raiz dos de `packages/`. A 3.4.5 tomou o destino na mesma cópia (#55, #57). O histórico mostra as duas árvores coexistindo desde o segundo commit: `packages/` como referência fixa e a raiz como reconstrução incremental (#84).

A documentação é o README e comentários de curso. Todas as 16 afirmações são corroboradas pelo snapshot (#67 a #82).

## Observações

### 1. auth/config/webpack.dev.js:6-29

**Observação:** Em desenvolvimento, `publicPath: "http://localhost:8082/"` e porta 8082. `ModuleFederationPlugin` declara `name: "auth"` e `filename: "remoteEntry.js"`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O auth da raiz está configurado como remote em desenvolvimento.

### 2. auth/config/webpack.prod.js:6-24

**Observação:** Em produção, `publicPath: "/auth/latest/"`. `ModuleFederationPlugin` declara `name: "auth"` e `filename: "remoteEntry.js"`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O auth da raiz está configurado como remote em produção, num caminho próprio.

### 3. container/config/webpack.dev.js:6-29

**Observação:** Em desenvolvimento, porta 8080. `ModuleFederationPlugin` declara `name: "container"` e os remotes `marketing@http://localhost:8081/remoteEntry.js` e `auth@http://localhost:8082/remoteEntry.js`, e compartilha as `dependencies` do `package.json`.

**Interpretação:** A configuração do host da raiz declara os remotes auth e marketing e onde encontrá-los em desenvolvimento.

### 4. container/config/webpack.prod.js:8-27

**Observação:** Em produção, `publicPath: "/container/latest/"`. `ModuleFederationPlugin` declara `name: "container"` e os remotes `marketing` e `auth` em `${domain}/<app>/latest/remoteEntry.js`, com `domain` vindo de `PRODUCTION_DOMAIN` (linha 6). A linha do remote `dashboard` está comentada (linha 20).

**Interpretação:** A configuração do host da raiz declara os remotes auth e marketing e onde encontrá-los em produção. O dashboard não é remote nesta árvore.

### 5. marketing/config/webpack.dev.js:6-29

**Observação:** Em desenvolvimento, `publicPath: "http://localhost:8081/"` e porta 8081. `ModuleFederationPlugin` declara `name: "marketing"` e `filename: "remoteEntry.js"`, expõe `./MarketingApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O marketing da raiz está configurado como remote em desenvolvimento.

### 6. marketing/config/webpack.prod.js:6-24

**Observação:** Em produção, `publicPath: "/marketing/latest/"`. `ModuleFederationPlugin` declara `name: "marketing"` e `filename: "remoteEntry.js"`, expõe `./MarketingApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O marketing da raiz está configurado como remote em produção, num caminho próprio.

### 7. packages/auth/config/webpack.dev.js:7-47

**Observação:** Em desenvolvimento, `publicPath: 'http://localhost:8082/'` e porta 8082. `ModuleFederationPlugin` declara `name: 'auth'` e `filename: 'remoteEntry.js'`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies`, com `react`, `react-dom` e `react-router-dom` como `singleton`.

**Interpretação:** O auth de `packages/` está configurado como remote em desenvolvimento, com o mesmo nome e a mesma porta do auth da raiz.

### 8. packages/auth/config/webpack.prod.js:6-38

**Observação:** Em produção, `publicPath: '/auth/latest/'`. `ModuleFederationPlugin` declara `name: 'auth'` e `filename: 'remoteEntry.js'`, expõe `./AuthApp` e compartilha as `dependencies`, com React, ReactDOM e React Router como `singleton`.

**Interpretação:** O auth de `packages/` está configurado como remote em produção, no mesmo caminho que o auth da raiz.

### 9. packages/container/config/webpack.dev.js:6-44

**Observação:** Em desenvolvimento, porta 8080. `ModuleFederationPlugin` declara `name: 'container'` e os remotes `marketing@http://localhost:8081/remoteEntry.js`, `auth@http://localhost:8082/remoteEntry.js` e `dashboard@http://localhost:8083/remoteEntry.js`. Compartilha as `dependencies`, com React, ReactDOM e React Router como `singleton`.

**Interpretação:** A configuração do host de `packages/` declara os três remotes e onde encontrá-los em desenvolvimento.

### 10. packages/container/config/webpack.prod.js:8-41

**Observação:** Em produção, `publicPath: '/container/latest/'`. `ModuleFederationPlugin` declara `name: 'container'` e os remotes `marketing`, `auth` e `dashboard` em `${domain}/<app>/latest/remoteEntry.js`, com `domain` vindo de `PRODUCTION_DOMAIN`. Compartilha as `dependencies`, com React, ReactDOM e React Router como `singleton`.

**Interpretação:** A configuração do host de `packages/` declara os três remotes e onde encontrá-los em produção.

### 11. packages/dashboard/config/webpack.dev.js:7-36

**Observação:** Em desenvolvimento, `publicPath: 'http://localhost:8083/'`, porta 8083 e CORS liberado. `ModuleFederationPlugin` declara `name: 'dashboard'` e `filename: 'remoteEntry.js'`, expõe `./DashboardApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O dashboard está configurado como remote em desenvolvimento.

### 12. packages/dashboard/config/webpack.prod.js:6-24

**Observação:** Em produção, `publicPath: '/dashboard/latest/'`. `ModuleFederationPlugin` declara `name: 'dashboard'` e `filename: 'remoteEntry.js'`, expõe `./DashboardApp` e compartilha as `dependencies` do `package.json`.

**Interpretação:** O dashboard está configurado como remote em produção, num caminho próprio.

### 13. packages/marketing/config/webpack.dev.js:7-47

**Observação:** Em desenvolvimento, `publicPath: 'http://localhost:8081/'` e porta 8081. `ModuleFederationPlugin` declara `name: 'marketing'` e `filename: 'remoteEntry.js'`, expõe `./MarketingApp` (`./src/bootstrap`) e compartilha as `dependencies`, com React, ReactDOM e React Router como `singleton`.

**Interpretação:** O marketing de `packages/` está configurado como remote em desenvolvimento, com o mesmo nome e a mesma porta do marketing da raiz.

### 14. packages/marketing/config/webpack.prod.js:6-38

**Observação:** Em produção, `publicPath: '/marketing/latest/'`. `ModuleFederationPlugin` declara `name: 'marketing'` e `filename: 'remoteEntry.js'`, expõe `./MarketingApp` e compartilha as `dependencies`, com React, ReactDOM e React Router como `singleton`.

**Interpretação:** O marketing de `packages/` está configurado como remote em produção, no mesmo caminho que o marketing da raiz.

**Nota:** Os `webpack.common.js` das sete aplicações, citados na coluna Marcadores da 3.4.3 (e o de packages/dashboard também na coluna Entrada), só configuram loaders, o template HTML e, no dashboard, `entry` e extensões. Nenhum declara elemento da composição, e por isso não viraram observação.

### 15. auth/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 16. container/src/index.js:1

**Observação:** `import("./bootstrap");`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 17. marketing/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 18. packages/auth/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 19. packages/container/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 20. packages/dashboard/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 21. packages/marketing/src/index.js:1

**Observação:** `import('./bootstrap');`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 22. auth/src/bootstrap.js:46; auth/src/bootstrap.js:7-32

**Observação:** `export { mount }` no arquivo exposto como `./AuthApp`. O `mount` recebe o elemento e `onSignIn`, `onNavigate`, `defaultHistory` e `initialPath`, renderiza a aplicação com histórico em memória e devolve `onParentNavigate`.

**Interpretação:** O auth da raiz oferece a função de montagem ao host, com sincronização de navegação e aviso de login.

### 23. marketing/src/bootstrap.js:41; marketing/src/bootstrap.js:7-30

**Observação:** `export { mount }` no arquivo exposto como `./MarketingApp`. O `mount` recebe o elemento e `onNavigate`, `defaultHistory` e `initialPath`, e devolve `onParentNavigate`.

**Interpretação:** O marketing da raiz oferece a função de montagem ao host, com sincronização de navegação.

### 24. packages/auth/src/bootstrap.js:46; packages/auth/src/bootstrap.js:7-32

**Observação:** `export { mount }` no arquivo exposto como `./AuthApp`, com as mesmas opções e o mesmo retorno do auth da raiz.

**Interpretação:** O auth de `packages/` oferece a função de montagem ao host, com sincronização de navegação e aviso de login.

### 25. packages/dashboard/src/bootstrap.js:22; packages/dashboard/src/bootstrap.js:5-8

**Observação:** `export { mount }`, com `mount(el)` que cria e monta a aplicação Vue, no arquivo exposto como `./DashboardApp`.

**Interpretação:** O dashboard oferece a função de montagem ao host, sem troca de navegação.

### 26. packages/marketing/src/bootstrap.js:46; packages/marketing/src/bootstrap.js:7-32

**Observação:** `export { mount }` no arquivo exposto como `./MarketingApp`, com opções de navegação e retorno de `onParentNavigate`.

**Interpretação:** O marketing de `packages/` oferece a função de montagem ao host, com sincronização de navegação.

### 27. container/src/components/AuthApp.js:11-27

**Observação:** Num `useEffect` sem dependências, chama `mount(ref.current, { initialPath, onNavigate, onSignIn })` e guarda o `onParentNavigate` devolvido, que é chamado a cada mudança de `location`.

**Interpretação:** O host da raiz monta o remote num elemento próprio e sincroniza a navegação com ele.

### 28. container/src/components/MarketingApp.js:12-27

**Observação:** Num `useEffect` sem dependências, chama `mount(ref.current, { onNavigate, initialPath })` e guarda o `onParentNavigate`, chamado a cada mudança de `location`.

**Interpretação:** O host da raiz monta o remote num elemento próprio e sincroniza a navegação com ele.

### 29. packages/container/src/components/AuthApp.js:12-29

**Observação:** Num `useEffect` sem dependências, chama `mount(ref.current, { initialPath, onNavigate, onSignIn })` e guarda o `onParentNavigate`, chamado a cada mudança de `location`.

**Interpretação:** O host de `packages/` monta o remote num elemento próprio e sincroniza a navegação com ele.

### 30. packages/container/src/components/DashboardApp.js:7-9

**Observação:** Chama `mount(ref.current)` num `useEffect` sem dependências.

**Interpretação:** O host de `packages/` monta o remote Vue num elemento próprio.

### 31. packages/container/src/components/MarketingApp.js:12-28

**Observação:** Num `useEffect` sem dependências, chama `mount(ref.current, { initialPath, onNavigate })` e guarda o `onParentNavigate`, chamado a cada mudança de `location`.

**Interpretação:** O host de `packages/` monta o remote num elemento próprio e sincroniza a navegação com ele.

### 32. packages/dashboard/src/bootstrap.js:7

**Observação:** `app.mount(el)` do Vue, dentro do `mount` exportado.

**Interpretação:** É uma renderização interna ao dashboard, sem mecanismo de MFE.

### 33. container/src/components/AuthApp.js:1

**Observação:** `import { mount } from "auth/AuthApp";`.

**Interpretação:** O host da raiz importa o módulo exposto pelo remote auth, pelo nome dele.

### 34. container/src/components/MarketingApp.js:1

**Observação:** `import { mount } from "marketing/MarketingApp";`.

**Interpretação:** O host da raiz importa o módulo exposto pelo remote marketing, pelo nome dele.

### 35. packages/container/src/components/AuthApp.js:1

**Observação:** `import { mount } from 'auth/AuthApp';`.

**Interpretação:** O host de `packages/` importa o módulo exposto pelo remote auth, pelo nome dele.

### 36. packages/container/src/components/DashboardApp.js:1

**Observação:** `import { mount } from 'dashboard/DashboardApp';`.

**Interpretação:** O host de `packages/` importa o módulo exposto pelo remote dashboard, pelo nome dele.

### 37. packages/container/src/components/MarketingApp.js:1

**Observação:** `import { mount } from 'marketing/MarketingApp';`.

**Interpretação:** O host de `packages/` importa o módulo exposto pelo remote marketing, pelo nome dele.

### 38. container/src/App.js:35-45; container/src/App.js:14-16

**Observação:** `Routes` liga `/auth/*` ao `AuthLazy` e `/*` ao `MarketingLazy`, wrappers carregados por `lazy`. O `DashboardLazy` e a rota `/dashboard` estão comentados (linhas 16 e 40-43).

**Interpretação:** O roteamento do host da raiz declara onde cada remote aparece; o dashboard não é roteado nesta árvore.

### 39. packages/container/src/App.js:29-37; packages/container/src/App.js:8-10

**Observação:** `Routes` liga `/auth/*` ao `AuthLazy`, `/dashboard` ao `DashboardLazy` (só com `isSignedIn`, senão redireciona para `/`) e `/*` ao `MarketingLazy`.

**Interpretação:** O roteamento do host de `packages/` declara onde cada um dos três remotes aparece.

### 40. auth; auth/package.json:1-33; auth/src/index.js:1; auth/src/bootstrap.js:36-41; auth/config/webpack.prod.js:6-24; .github/workflows/auth.yml:7-28

**Observação:** Tem manifesto, entrada, builds webpack de desenvolvimento e produção e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 41. auth/config

**Observação:** Contém as configurações webpack do auth.

**Interpretação:** É parte do build do auth, e não uma aplicação.

### 42. container; container/package.json:1-32; container/src/index.js:1; container/src/bootstrap.js:5-6; container/config/webpack.prod.js:8-27; .github/workflows/container.yml:7-30

**Observação:** Tem manifesto, entrada, builds webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 43. container/config

**Observação:** Contém as configurações webpack do container.

**Interpretação:** É parte do build do container, e não uma aplicação.

### 44. dashboard; dashboard/package.json:1-34

**Observação:** Só tem `package.json` e `package-lock.json`. Os scripts chamam `config/webpack.dev.js` e `config/webpack.prod.js`, ausentes do snapshot. Não há entrada nem código.

**Interpretação:** Não é unidade frontend no snapshot; é um manifesto sem aplicação.

### 45. marketing; marketing/package.json:1-33; marketing/src/index.js:1; marketing/src/bootstrap.js:33-38; marketing/config/webpack.prod.js:6-24; .github/workflows/marketing.yml:7-28

**Observação:** Tem manifesto, entrada, builds webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 46. marketing/config

**Observação:** Contém as configurações webpack do marketing.

**Interpretação:** É parte do build do marketing, e não uma aplicação.

### 47. packages/auth; packages/auth/package.json:1-33; packages/auth/src/index.js:1; packages/auth/src/bootstrap.js:36-41; packages/auth/config/webpack.prod.js:6-38

**Observação:** Tem manifesto, entrada e builds webpack próprios, sem workflow.

**Interpretação:** É uma unidade frontend com limite próprio.

### 48. packages/auth/config

**Observação:** Contém as configurações webpack do auth de `packages/`.

**Interpretação:** É parte do build de packages/auth, e não uma aplicação.

### 49. packages/container; packages/container/package.json:1-32; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5-6; packages/container/config/webpack.prod.js:8-41

**Observação:** Tem manifesto, entrada e builds webpack próprios, sem workflow.

**Interpretação:** É uma unidade frontend com limite próprio.

### 50. packages/container/config

**Observação:** Contém as configurações webpack do container de `packages/`.

**Interpretação:** É parte do build de packages/container, e não uma aplicação.

### 51. packages/dashboard; packages/dashboard/package.json:1-34; packages/dashboard/config/webpack.common.js:4; packages/dashboard/src/index.js:1; packages/dashboard/src/bootstrap.js:12-17; packages/dashboard/config/webpack.prod.js:6-24

**Observação:** Tem manifesto, entrada declarada, aplicação Vue e builds webpack próprios, sem workflow.

**Interpretação:** É uma unidade frontend com limite próprio.

### 52. packages/dashboard/config

**Observação:** Contém as configurações webpack do dashboard.

**Interpretação:** É parte do build de packages/dashboard, e não uma aplicação.

### 53. packages/marketing; packages/marketing/package.json:1-33; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:36-41; packages/marketing/config/webpack.prod.js:6-38

**Observação:** Tem manifesto, entrada e builds webpack próprios, sem workflow.

**Interpretação:** É uma unidade frontend com limite próprio.

### 54. packages/marketing/config

**Observação:** Contém as configurações webpack do marketing de `packages/`.

**Interpretação:** É parte do build de packages/marketing, e não uma aplicação.

### 55. container/src/components/AuthApp.js:1, 12; container/src/App.js:36-39; container/config/webpack.prod.js:19; auth/config/webpack.prod.js:10-17

**Observação:** O container da raiz importa `mount` de `auth/AuthApp` e o chama no wrapper ligado à rota `/auth/*`. O nome, o módulo e o caminho `/auth/latest/` correspondem à configuração do auth da raiz, que é a publicada nesse caminho.

**Interpretação:** É uma relação host → remote ativa.

**Nota:** A configuração do auth de `packages/` tem o mesmo nome e o mesmo `publicPath`; a 3.4.5 tomou o destino como o auth da raiz, e em qualquer caso o destino está no snapshot.

### 56. container/src/components/MarketingApp.js:1, 13; container/src/App.js:44; container/config/webpack.prod.js:18; marketing/config/webpack.prod.js:10-17

**Observação:** O container da raiz importa `mount` de `marketing/MarketingApp` e o chama no wrapper ligado à rota `/*`. O nome, o módulo e o caminho `/marketing/latest/` correspondem à configuração do marketing da raiz.

**Interpretação:** É uma relação host → remote ativa; o marketing é a página padrão do container.

### 57. packages/container/src/components/AuthApp.js:1, 13; packages/container/src/App.js:30-32; packages/container/config/webpack.prod.js:19; packages/auth/config/webpack.prod.js:10-17

**Observação:** O container de `packages/` importa `mount` de `auth/AuthApp` e o chama no wrapper ligado à rota `/auth/*`. O nome, o módulo e o caminho correspondem à configuração do auth de `packages/`.

**Interpretação:** É uma relação host → remote ativa.

**Nota:** A mesma correspondência vale para o auth da raiz; a 3.4.5 tomou o destino na mesma cópia, e em qualquer caso o destino está no snapshot.

### 58. packages/container/src/components/DashboardApp.js:1, 8; packages/container/src/App.js:33-35; packages/container/config/webpack.prod.js:20; packages/dashboard/config/webpack.prod.js:10-17

**Observação:** O container de `packages/` importa `mount` de `dashboard/DashboardApp` e o chama só com o elemento, no wrapper ligado à rota `/dashboard` (com login). Só packages/dashboard declara `name: 'dashboard'`, e o caminho `/dashboard/latest/` coincide com o remote de produção.

**Interpretação:** É uma relação host → remote ativa entre um host React e um remote Vue.

### 59. packages/container/src/components/MarketingApp.js:1, 13; packages/container/src/App.js:36; packages/container/config/webpack.prod.js:18; packages/marketing/config/webpack.prod.js:10-17

**Observação:** O container de `packages/` importa `mount` de `marketing/MarketingApp` e o chama no wrapper ligado à rota `/*`. O nome, o módulo e o caminho correspondem à configuração do marketing de `packages/`.

**Interpretação:** É uma relação host → remote ativa.

### 60. auth/package.json:6; auth/config/webpack.prod.js:6-21; .github/workflows/auth.yml:7-8, 12, 20, 23, 28

**Observação:** O script `build` roda a configuração de produção. Um workflow próprio dispara quando `auth/**` muda, constrói só esse diretório, sincroniza o `dist` com `auth/latest` e invalida só `/auth/latest/remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 61. container/package.json:6; container/config/webpack.prod.js:8-24; .github/workflows/container.yml:7-8, 12, 20-22, 25, 30

**Observação:** Um workflow próprio dispara quando `container/**` muda, constrói o container com `PRODUCTION_DOMAIN`, sincroniza com `container/latest` e invalida só o `index.html`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. Os remotes podem ser republicados sem rebuild do host, porque ele os busca em `latest`.

### 62. marketing/package.json:6; marketing/config/webpack.prod.js:6-21; .github/workflows/marketing.yml:7-8, 12, 20, 23, 28

**Observação:** Um workflow próprio dispara quando `marketing/**` muda, constrói só esse diretório, sincroniza com `marketing/latest` e invalida só o `remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 63. packages/auth/package.json:6; packages/auth/config/webpack.prod.js:6-35

**Observação:** Tem script e configuração de build de produção próprios, com `publicPath: '/auth/latest/'`. Nenhum workflow filtra ou constrói `packages/`.

**Interpretação:** Há fronteira de build própria; o deploy não é observado.

### 64. packages/container/package.json:6; packages/container/config/webpack.prod.js:8-38

**Observação:** Tem script e configuração de build de produção próprios, com três remotes, inclusive `dashboard` em `${domain}/dashboard/latest/remoteEntry.js`. Nenhum workflow cobre `packages/`.

**Interpretação:** Há fronteira de build própria; o deploy não é observado.

### 65. packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:6-21

**Observação:** Tem script e configuração de build de produção próprios, com `publicPath: '/dashboard/latest/'`. Não há workflow para o dashboard em nenhuma das árvores.

**Interpretação:** Há fronteira de build própria; o deploy não é observado.

### 66. packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:6-35

**Observação:** Tem script e configuração de build de produção próprios, com `publicPath: '/marketing/latest/'`. Nenhum workflow cobre `packages/`.

**Interpretação:** Há fronteira de build própria; o deploy não é observado.

### 67. README.md:1

**Observação:** O título é "MFE learning project".

**Interpretação:** O README apresenta o repositório como um conjunto de micro-frontends, o que as sete unidades e as cinco relações confirmam.

### 68. README.md:3-5

**Observação:** "a webpack Module Federation learning project containing a React shell, React marketing and authentication remotes, and a legacy Vue dashboard example".

**Interpretação:** A afirmação descreve a organização host/remotes com Module Federation. O shell é o container, os remotes React são auth e marketing, e o dashboard Vue só existe como unidade em `packages/`. O README não diz que há duas cópias.

### 69. auth/src/bootstrap.js:34-35

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** O comentário afirma que o auth roda sozinho em desenvolvimento, o que o código confirma pela montagem em `#_auth-dev-root`, elemento do seu próprio `index.html`.

### 70. auth/src/bootstrap.js:44-45

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** O comentário afirma que o auth é montado pelo container, o que o `export { mount }` e o wrapper do container confirmam.

### 71. marketing/src/bootstrap.js:32

**Observação:** "If we are development and in isolation, call mount immediately".

**Interpretação:** O comentário afirma que o marketing roda sozinho em desenvolvimento, confirmado pela montagem em `#_marketing-dev-root`.

### 72. marketing/src/bootstrap.js:40

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** O comentário afirma que o marketing é montado pelo container, o que o código confirma.

### 73. packages/auth/src/bootstrap.js:34-35

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** O comentário afirma que o auth de `packages/` roda sozinho em desenvolvimento, confirmado pela montagem em `#_auth-dev-root`.

### 74. packages/auth/src/bootstrap.js:44-45

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** O comentário afirma que o auth de `packages/` é montado pelo container, o que o código confirma.

### 75. packages/container/src/components/AuthApp.js:11

**Observação:** "Mount the microfrontend once".

**Interpretação:** O comentário afirma que o container monta o auth uma única vez, o que o `useEffect` com dependências vazias confirma.

### 76. packages/container/src/components/AuthApp.js:24

**Observação:** "Sync navigation from container to child".

**Interpretação:** O comentário afirma que a navegação do container é repassada ao auth, o que a chamada de `onParentNavigate` a cada mudança de `location` confirma.

### 77. packages/container/src/components/MarketingApp.js:11

**Observação:** "Mount the microfrontend once".

**Interpretação:** O comentário afirma que o container monta o marketing uma única vez, confirmado pelo `useEffect` com dependências vazias.

### 78. packages/container/src/components/MarketingApp.js:23

**Observação:** "Sync navigation from container to child".

**Interpretação:** O comentário afirma que a navegação do container é repassada ao marketing, confirmado pela chamada de `onParentNavigate`.

### 79. packages/dashboard/src/bootstrap.js:10-11

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** O comentário afirma que o dashboard roda sozinho em desenvolvimento, confirmado pela montagem em `#_dashboard-dev-root`.

### 80. packages/dashboard/src/bootstrap.js:20-21

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** O comentário afirma que o dashboard é montado pelo container, o que o código de `packages/` confirma; o container da raiz não o carrega.

### 81. packages/marketing/src/bootstrap.js:34-35

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** O comentário afirma que o marketing de `packages/` roda sozinho em desenvolvimento, confirmado pela montagem em `#_marketing-dev-root`.

### 82. packages/marketing/src/bootstrap.js:44-45

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** O comentário afirma que o marketing de `packages/` é montado pelo container, o que o código confirma.

### 83. 9584f06 2025-10-05 (dashboard/package.json); 0f9f1e8 2025-10-25 (container/config/webpack.prod.js); 522c5d7 2025-11-03 (container/config/webpack.prod.js); 2d3ac70 2025-11-05 (container/src/App.js)

**Observação:** O `dashboard/` da raiz entra em `9584f06` só com manifestos iguais aos de `packages/dashboard/` e não muda até o snapshot. Nenhum commit cria `container/src/components/DashboardApp.js`. A mensagem de `0f9f1e8` anuncia "comment out unused remote entries in webpack.prod.js"; a versão de `522c5d7`, igual à do snapshot, já tem o remote `dashboard` comentado. O `App.js` do snapshot é o de `2d3ac70`, que anuncia rotas `lazy` só para Auth e Marketing. As versões anteriores não puderam ser lidas no clone parcial.

**Interpretação:** Na árvore da raiz, o dashboard nunca passou de manifesto, e as linhas comentadas são planejadas e nunca conectadas, não resto de um dashboard abandonado.

### 84. 9584f06 2025-10-05 (packages/); fa98fd9 2025-10-05 (container/); dfd5a8c 2025-11-03 (auth/src/bootstrap.js)

**Observação:** `packages/` aparece inteira em `9584f06`, o segundo commit, e não é alterada depois. A raiz começa no mesmo commit só com manifestos iguais aos de `packages/` e ganha código aplicação por aplicação: marketing em `9584f06`, container em `fa98fd9`, auth em `dfd5a8c`. `auth/src/bootstrap.js` e `packages/auth/src/bootstrap.js` têm o mesmo objeto no snapshot.

**Interpretação:** As duas árvores não são estágios sucessivos. `packages/` é uma referência fixa, e a raiz é uma reconstrução paralela, a única que evoluiu e ganhou workflows.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (auth, Build); 3.4.3 (auth/config, Marcadores); 3.4.4 (auth/src/bootstrap.js:46, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40; configura #55 |
| 2 | 3.4.3 (auth, Build); 3.4.3 (auth/config, Marcadores); 3.4.4 (auth/src/bootstrap.js:46, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida, Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40; configura #55 |
| 3 | 3.4.3 (container, Build); 3.4.3 (container/config, Marcadores); 3.4.4 (container/src/components/AuthApp.js:12, MarketingApp.js:13, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #2 (Onde é servida) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #42; configura #55; configura #56 |
| 4 | 3.4.3 (container, Build); 3.4.3 (container/config, Marcadores); 3.4.4 (container/src/components/AuthApp.js:12, MarketingApp.js:13, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #2 (Onde é servida, Artefatos); 3.4.7 #2 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #42; configura #55; configura #56 |
| 5 | 3.4.3 (marketing, Build); 3.4.3 (marketing/config, Marcadores); 3.4.4 (marketing/src/bootstrap.js:41, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Onde é servida) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #45; configura #56 |
| 6 | 3.4.3 (marketing, Build); 3.4.3 (marketing/config, Marcadores); 3.4.4 (marketing/src/bootstrap.js:41, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Onde é servida, Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #45; configura #56 |
| 7 | 3.4.3 (packages/auth, Entrada, Build); 3.4.3 (packages/auth/config, Marcadores); 3.4.4 (packages/auth/src/bootstrap.js:46, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Onde é servida) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #47; configura #57 |
| 8 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Marcadores); 3.4.4 (packages/auth/src/bootstrap.js:46, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #47; configura #57 |
| 9 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.4 (packages/container/src/components/AuthApp.js:13, DashboardApp.js:8, MarketingApp.js:13, Observação); 3.4.5 #3, #4, #5 (Configuração); 3.4.6 #5 (Onde é servida) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #49; configura #57; configura #58; configura #59 |
| 10 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.4 (packages/container/src/components/AuthApp.js:13, DashboardApp.js:8, MarketingApp.js:13, Observação); 3.4.5 #3, #4, #5 (Configuração); 3.4.6 #5 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #49; configura #57; configura #58; configura #59 |
| 11 | 3.4.3 (packages/dashboard, Entrada, Build); 3.4.3 (packages/dashboard/config, Marcadores); 3.4.4 (packages/dashboard/src/bootstrap.js:22, Observação); 3.4.5 #4 (Configuração); 3.4.6 #6 (Onde é servida) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #51; configura #58 |
| 12 | 3.4.3 (packages/dashboard, Build); 3.4.3 (packages/dashboard/config, Marcadores); 3.4.4 (packages/dashboard/src/bootstrap.js:22, Observação); 3.4.5 #4 (Configuração); 3.4.6 #6 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #51; configura #58 |
| 13 | 3.4.3 (packages/marketing, Entrada, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (packages/marketing/src/bootstrap.js:46, Observação); 3.4.5 #5 (Configuração); 3.4.6 #7 (Onde é servida) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #53; configura #59 |
| 14 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (packages/marketing/src/bootstrap.js:46, Observação); 3.4.5 #5 (Configuração); 3.4.6 #7 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #53; configura #59 |
| 15 | 3.4.4 (auth/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 16 | 3.4.4 (container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 17 | 3.4.4 (marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 18 | 3.4.4 (packages/auth/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 19 | 3.4.4 (packages/container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 20 | 3.4.4 (packages/dashboard/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 21 | 3.4.4 (packages/marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 22 | 3.4.4 (auth/src/bootstrap.js:46) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #55 |
| 23 | 3.4.4 (marketing/src/bootstrap.js:41) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #56 |
| 24 | 3.4.4 (packages/auth/src/bootstrap.js:46) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #57 |
| 25 | 3.4.4 (packages/dashboard/src/bootstrap.js:22) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58 |
| 26 | 3.4.4 (packages/marketing/src/bootstrap.js:46) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #59 |
| 27 | 3.4.4 (container/src/components/AuthApp.js:12) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #55 |
| 28 | 3.4.4 (container/src/components/MarketingApp.js:13) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #56 |
| 29 | 3.4.4 (packages/container/src/components/AuthApp.js:13) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #57 |
| 30 | 3.4.4 (packages/container/src/components/DashboardApp.js:8) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #58 |
| 31 | 3.4.4 (packages/container/src/components/MarketingApp.js:13) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #59 |
| 32 | 3.4.4 (packages/dashboard/src/bootstrap.js:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 33 | 3.4.4 (container/src/components/AuthApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #55 |
| 34 | 3.4.4 (container/src/components/MarketingApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #56 |
| 35 | 3.4.4 (packages/container/src/components/AuthApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #57 |
| 36 | 3.4.4 (packages/container/src/components/DashboardApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #58 |
| 37 | 3.4.4 (packages/container/src/components/MarketingApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #59 |
| 38 | 3.4.4 (container/src/App.js:35) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #55; implementa #56 |
| 39 | 3.4.4 (packages/container/src/App.js:29) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #57; implementa #58; implementa #59 |
| 40 | 3.4.3 (auth) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 41 | 3.4.3 (auth/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 42 | 3.4.3 (container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 43 | 3.4.3 (container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 44 | 3.4.3 (dashboard) | 4 estrutura | diretório | — | contexto | fraca | — |
| 45 | 3.4.3 (marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 46 | 3.4.3 (marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 47 | 3.4.3 (packages/auth) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 48 | 3.4.3 (packages/auth/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 49 | 3.4.3 (packages/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 50 | 3.4.3 (packages/container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 51 | 3.4.3 (packages/dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 52 | 3.4.3 (packages/dashboard/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 53 | 3.4.3 (packages/marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 54 | 3.4.3 (packages/marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 55 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #40 |
| 56 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #42; liga #45 |
| 57 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #49; liga #47 |
| 58 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #49; liga #51 |
| 59 | 3.4.5 #5 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #49; liga #53 |
| 60 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #40 |
| 61 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #42 |
| 62 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #45 |
| 63 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #47 |
| 64 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #49 |
| 65 | 3.4.6 #6 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #51 |
| 66 | 3.4.6 #7 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #53 |
| 67 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #40; corrobora #42; corrobora #45; corrobora #47; corrobora #49; corrobora #51; corrobora #53; corrobora #55; corrobora #56; corrobora #57; corrobora #58; corrobora #59 |
| 68 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #42; corrobora #40; corrobora #45; corrobora #51; corrobora #55; corrobora #56; corrobora #57; corrobora #58; corrobora #59; corrobora #4; corrobora packages/dashboard/src/bootstrap.js:1, 5-7 |
| 69 | 3.4.7 #3 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #40; corrobora auth/src/bootstrap.js:36-42; corrobora auth/public/index.html:7 |
| 70 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #55; corrobora #22; corrobora #33; corrobora #27 |
| 71 | 3.4.7 #5 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #45; corrobora marketing/src/bootstrap.js:33-38; corrobora marketing/public/index.html:5 |
| 72 | 3.4.7 #6 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #56; corrobora #23; corrobora #34; corrobora #28 |
| 73 | 3.4.7 #7 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #47; corrobora packages/auth/src/bootstrap.js:36-42; corrobora packages/auth/public/index.html:5 |
| 74 | 3.4.7 #8 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #57; corrobora #24; corrobora #35; corrobora #29 |
| 75 | 3.4.7 #9 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #29 |
| 76 | 3.4.7 #10 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #29; corrobora #24 |
| 77 | 3.4.7 #11 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #31 |
| 78 | 3.4.7 #12 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #31; corrobora #26 |
| 79 | 3.4.7 #13 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #51; corrobora packages/dashboard/src/bootstrap.js:12-18; corrobora packages/dashboard/public/index.html:5 |
| 80 | 3.4.7 #14 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #58; corrobora #25; corrobora #36; corrobora #30 |
| 81 | 3.4.7 #15 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #53; corrobora packages/marketing/src/bootstrap.js:36-42; corrobora packages/marketing/public/index.html:5 |
| 82 | 3.4.7 #16 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #59; corrobora #26; corrobora #37; corrobora #31 |
| 83 | 3.4.8 #1 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #4; explica #38; explica #44; explica #68 |
| 84 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #55; explica #57 |

## Resumo

Observações: 84. Dimensões (tecnologia: 0, configuração: 14, código: 25, estrutura: 15, composição: 5, build-deploy: 7, documentação: 16, histórico: 2). Força (forte: 16, moderada: 34, fraca: 34, ambígua: 0). Evidência (tecnológica: 27, arquitetural: 48, contexto: 9).

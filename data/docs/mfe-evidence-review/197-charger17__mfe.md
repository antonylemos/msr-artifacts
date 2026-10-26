---
schema: 1
id: 997062622
full_name: charger17/mfe
commit: c04d19eb237bd77ce574657d732efe265c0de531
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

# 197 — charger17/mfe

## Leitura do repositório

É um exemplo de Module Federation com webpack 5, com quatro pacotes em `packages/`: um container React que compõe os remotes React `auth` e `marketing` e um remote Vue 3, `dashboard`. O plugin vem no próprio webpack, por isso a revisão de dependências não tem linha e não há observação de tecnologia.

A cadeia está completa no snapshot e aparece duas vezes na configuração, para desenvolvimento e para produção:
- **Configuração:**
  - cada remote se declara com nome próprio, `remoteEntry.js` e um único módulo exposto, o próprio `src/bootstrap` (#1, #2, #5 a #8);
  - o container declara os três remotes (#3, #4). Em desenvolvimento, eles ficam em `localhost:8081-8083`; em produção, em `<domínio>/<app>/latest/remoteEntry.js`, com o domínio injetado no build.
- **Código:**
  - os remotes exportam `mount` (#9 a #11);
  - o container importa cada módulo remoto pelo nome (#16 a #18) e o monta num `div` próprio (#12 a #14);
  - o `Switch` do container decide onde cada remote aparece: `/auth`, `/dashboard` (só com login) e `/` (#19).
- **Relações:** isso resulta em três relações host → remote ativas (#28 a #30), entre quatro unidades com limites próprios (#20, #22, #24, #26). Uma delas liga um host React a um remote Vue (#29).

Build e deploy (#31 a #34): as quatro aplicações têm build próprio e um workflow próprio cada, que dispara só quando muda a pasta da aplicação, publica o `dist` num prefixo `<app>/latest` do mesmo bucket e invalida só o arquivo de entrada dela. Não há versionamento independente; como o container busca os remotes em `latest`, eles podem ser republicados sem novo build do host.

Sinais que enganam ou ficam de fora:
- O `app.mount` do Vue (#15) é a renderização interna do dashboard, dentro do `mount` exportado.
- Os diretórios `config` (#21, #23, #25, #27) só guardam o build da unidade acima.
- Os `webpack.common.js` não declaram elemento da composição e não viraram observação (Nota de #8).
- O container passa `isSignedIn` ao wrapper do marketing, mas o wrapper não recebe props, e o valor não chega ao remote (#19).

Nada fica ambíguo. O repositório não tem documentação (o `readme.txt` está vazio), então não há afirmações a confrontar, e o histórico, feito de uploads pela interface web, não tinha ponto a esclarecer.

## Observações

### 1. packages/auth/config/webpack.dev.js:7-31

**Observação:** Em desenvolvimento, `publicPath: 'http://localhost:8082/'` e porta 8082. `ModuleFederationPlugin` declara `name: 'auth'` e `filename: 'remoteEntry.js'`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`. O `HtmlWebpackPlugin` usa `./public/index.html`.

**Interpretação:** O auth está configurado como remote em desenvolvimento.

### 2. packages/auth/config/webpack.prod.js:6-22

**Observação:** Em produção, `publicPath: '/auth/latest/'`. `ModuleFederationPlugin` declara `name: 'auth'` e `filename: 'remoteEntry.js'`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O auth está configurado como remote em produção, num caminho próprio.

### 3. packages/container/config/webpack.dev.js:6-28

**Observação:** Em desenvolvimento, `publicPath: 'http://localhost:8080/'` e porta 8080. `ModuleFederationPlugin` declara `name: 'container'` e os remotes `marketing@http://localhost:8081/remoteEntry.js`, `auth@http://localhost:8082/remoteEntry.js` e `dashboard@http://localhost:8083/remoteEntry.js`, e compartilha as `dependencies` do `package.json`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em desenvolvimento.

### 4. packages/container/config/webpack.prod.js:8-25; packages/container/config/webpack.prod.js:6

**Observação:** Em produção, `publicPath: '/container/latest/'`. `ModuleFederationPlugin` declara `name: 'container'` e os remotes `marketing`, `auth` e `dashboard` em `${domain}/<app>/latest/remoteEntry.js`, com `domain` vindo de `process.env.PRODUCTION_DOMAIN` (linha 6). Compartilha as `dependencies` do `package.json`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em produção; o domínio é fixado no build.

### 5. packages/dashboard/config/webpack.dev.js:7-34

**Observação:** Em desenvolvimento, `publicPath: 'http://localhost:8083/'`, porta 8083 e cabeçalho `Access-Control-Allow-Origin: '*'`. `ModuleFederationPlugin` declara `name: 'dashboard'` e `filename: 'remoteEntry.js'`, expõe `./DashboardApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`. O `HtmlWebpackPlugin` usa `./public/index.html`.

**Interpretação:** O dashboard está configurado como remote em desenvolvimento.

### 6. packages/dashboard/config/webpack.prod.js:6-22

**Observação:** Em produção, `publicPath: '/dashboard/latest/'`. `ModuleFederationPlugin` declara `name: 'dashboard'` e `filename: 'remoteEntry.js'`, expõe `./DashboardApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O dashboard está configurado como remote em produção, num caminho próprio.

### 7. packages/marketing/config/webpack.dev.js:7-31

**Observação:** Em desenvolvimento, `publicPath: 'http://localhost:8081/'` e porta 8081. `ModuleFederationPlugin` declara `name: 'marketing'` e `filename: 'remoteEntry.js'`, expõe `./MarketingApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`. O `HtmlWebpackPlugin` usa `./public/index.html`.

**Interpretação:** O marketing está configurado como remote em desenvolvimento.

### 8. packages/marketing/config/webpack.prod.js:6-22

**Observação:** Em produção, `publicPath: '/marketing/latest/'`. `ModuleFederationPlugin` declara `name: 'marketing'` e `filename: 'remoteEntry.js'`, expõe `./MarketingApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O marketing está configurado como remote em produção, num caminho próprio.

**Nota:** Os `webpack.common.js` das quatro aplicações, citados na coluna Marcadores da 3.4.3 (o do container também na coluna Entrada, linhas 19-23, e o do dashboard na linha 4), só configuram loaders, o template HTML do container e, no dashboard, `entry`, `output.filename`, extensões e o `VueLoaderPlugin`. Nenhum declara elemento da composição, e por isso não viraram observação.

### 9. packages/auth/src/bootstrap.js:35; packages/auth/src/bootstrap.js:6-25

**Observação:** `export { mount };` no arquivo exposto como `./AuthApp`. O `mount` recebe o elemento e `onNavigate`, `defaultHistory`, `initialPath` e `onSignIn`, cria histórico em memória quando não recebe outro, renderiza a `App` com `onSignIn` e devolve `onParentNavigate`.

**Interpretação:** O auth oferece a função de montagem ao host, com sincronização de navegação e aviso de login.

### 10. packages/dashboard/src/bootstrap.js:17; packages/dashboard/src/bootstrap.js:4-7

**Observação:** `export { mount };` no arquivo exposto como `./DashboardApp`, com `mount(el)` que cria a aplicação Vue com `createApp(Dashboard)` e a monta no elemento.

**Interpretação:** O dashboard oferece a função de montagem ao host, sem troca de navegação.

### 11. packages/marketing/src/bootstrap.js:36; packages/marketing/src/bootstrap.js:6-26

**Observação:** `export { mount };` no arquivo exposto como `./MarketingApp`. O `mount` recebe o elemento e `onNavigate`, `defaultHistory` e `initialPath`, cria histórico em memória quando não recebe outro e devolve `onParentNavigate`.

**Interpretação:** O marketing oferece a função de montagem ao host, com sincronização de navegação.

### 12. packages/container/src/components/AuthApp.js:9-25

**Observação:** Num `useEffect` sem dependências, chama `mount(ref.current, { initialPath, onNavigate, onSignIn })` e registra o `onParentNavigate` devolvido em `history.listen`.

**Interpretação:** O host monta o remote auth num elemento próprio, sincroniza a navegação com ele e recebe o aviso de login.

### 13. packages/container/src/components/DashboardApp.js:7-9

**Observação:** Chama `mount(ref.current)` num `useEffect` sem dependências.

**Interpretação:** O host monta o remote Vue num elemento próprio, sem troca de navegação.

### 14. packages/container/src/components/MarketingApp.js:9-21

**Observação:** Num `useEffect` sem dependências, chama `mount(ref.current, { initialPath, onNavigate })` e registra o `onParentNavigate` devolvido em `history.listen`.

**Interpretação:** O host monta o remote marketing num elemento próprio e sincroniza a navegação com ele.

### 15. packages/dashboard/src/bootstrap.js:6

**Observação:** `app.mount(el);` do Vue, dentro do `mount` exportado.

**Interpretação:** É uma renderização interna ao dashboard, sem mecanismo de MFE.

### 16. packages/container/src/components/AuthApp.js:1

**Observação:** `import { mount } from 'auth/AuthApp';`.

**Interpretação:** O host importa o módulo exposto pelo remote auth, pelo nome dele.

### 17. packages/container/src/components/DashboardApp.js:1

**Observação:** `import { mount } from 'dashboard/DashboardApp';`.

**Interpretação:** O host importa o módulo exposto pelo remote dashboard, pelo nome dele.

### 18. packages/container/src/components/MarketingApp.js:1

**Observação:** `import { mount } from "marketing/MarketingApp";`.

**Interpretação:** O host importa o módulo exposto pelo remote marketing, pelo nome dele.

### 19. packages/container/src/App.js:42-55; packages/container/src/App.js:11-13

**Observação:** O `Switch` liga `/auth` ao `AuthLazy`, com `onSignIn` que muda o estado `isSignedIn`; `/dashboard` ao `DashboardLazy`, com `<Redirect to="/" />` quando `isSignedIn` é falso; e `/` ao `MarketingLazy`, que recebe `isSignedIn`. Os três são wrappers carregados por `lazy`. O wrapper do marketing não recebe props (packages/container/src/components/MarketingApp.js:5).

**Interpretação:** O roteamento do host declara onde cada um dos três remotes aparece. O `isSignedIn` passado ao marketing não chega ao remote.

### 20. packages/auth; packages/auth/package.json:1-30; packages/auth/src/index.js:1; packages/auth/src/bootstrap.js:27-33; packages/auth/config/webpack.prod.js:6-22; .github/workflows/auth.yml:7-8, 13

**Observação:** Tem manifesto, entrada, aplicação React, builds webpack de desenvolvimento e produção e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 21. packages/auth/config

**Observação:** Contém as configurações webpack do auth.

**Interpretação:** É parte do build do auth, e não uma aplicação.

### 22. packages/container; packages/container/package.json:1-30; packages/container/src/index.js:1; packages/container/src/bootstrap.js:5-8; packages/container/config/webpack.prod.js:8-25; .github/workflows/container.yml:7-8, 13

**Observação:** Tem manifesto, entrada, aplicação React montada em `#root`, builds webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 23. packages/container/config

**Observação:** Contém as configurações webpack do container.

**Interpretação:** É parte do build do container, e não uma aplicação.

### 24. packages/dashboard; packages/dashboard/package.json:1-34; packages/dashboard/config/webpack.common.js:4; packages/dashboard/src/index.js:1; packages/dashboard/src/bootstrap.js:9-15; packages/dashboard/config/webpack.prod.js:6-22; .github/workflows/dashboard.yml:7-8, 13

**Observação:** Tem manifesto, entrada declarada, aplicação Vue, builds webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 25. packages/dashboard/config

**Observação:** Contém as configurações webpack do dashboard.

**Interpretação:** É parte do build do dashboard, e não uma aplicação.

### 26. packages/marketing; packages/marketing/package.json:1-30; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:28-34; packages/marketing/config/webpack.prod.js:6-22; .github/workflows/marketing.yml:7-8, 13

**Observação:** Tem manifesto, entrada, aplicação React, builds webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 27. packages/marketing/config

**Observação:** Contém as configurações webpack do marketing.

**Interpretação:** É parte do build do marketing, e não uma aplicação.

### 28. packages/container/src/components/AuthApp.js:1, 10; packages/container/src/App.js:43-45; packages/container/config/webpack.prod.js:19; packages/auth/config/webpack.prod.js:10-18

**Observação:** O container importa `mount` de `auth/AuthApp` e o chama no wrapper ligado à rota `/auth`. O nome `auth`, o módulo `./AuthApp` e o caminho `/auth/latest/` correspondem à configuração de packages/auth.

**Interpretação:** É uma relação host → remote ativa.

### 29. packages/container/src/components/DashboardApp.js:1, 8; packages/container/src/App.js:46-51; packages/container/config/webpack.prod.js:20; packages/dashboard/config/webpack.prod.js:10-18

**Observação:** O container importa `mount` de `dashboard/DashboardApp` e o chama só com o elemento, no wrapper ligado à rota `/dashboard`, que redireciona para `/` sem login. O nome, o módulo e o caminho `/dashboard/latest/` correspondem à configuração de packages/dashboard.

**Interpretação:** É uma relação host → remote ativa entre um host React e um remote Vue.

### 30. packages/container/src/components/MarketingApp.js:1, 10; packages/container/src/App.js:52-54; packages/container/config/webpack.prod.js:18; packages/marketing/config/webpack.prod.js:10-18

**Observação:** O container importa `mount` de `marketing/MarketingApp` e o chama no wrapper ligado à rota `/`, a rota padrão do `Switch`. O nome, o módulo e o caminho `/marketing/latest/` correspondem à configuração de packages/marketing.

**Interpretação:** É uma relação host → remote ativa; o marketing é a página padrão do container.

### 31. packages/auth/package.json:6; packages/auth/config/webpack.prod.js:6-21; .github/workflows/auth.yml:3-13, 29-30, 49, 52

**Observação:** O script `build` roda a configuração de produção, que gera o `remoteEntry.js`. Um workflow próprio dispara quando `packages/auth/**` muda, roda em `packages/auth`, sincroniza o `dist` com `auth/latest` e invalida só `/auth/latest/remoteEntry.js`. A versão `1.0.0` do manifesto não é usada na publicação.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 32. packages/container/package.json:6; packages/container/config/webpack.prod.js:6-25; .github/workflows/container.yml:3-13, 29-32, 51, 54

**Observação:** Um workflow próprio dispara quando `packages/container/**` muda, constrói o container com `PRODUCTION_DOMAIN` vindo de um segredo, sincroniza com `container/latest` e invalida só `/container/latest/index.html`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. Os remotes podem ser republicados sem novo build do host, porque ele os busca em `latest`.

### 33. packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:6-21; .github/workflows/dashboard.yml:3-13, 29-30, 49, 52

**Observação:** Um workflow próprio dispara quando `packages/dashboard/**` muda, constrói só esse diretório, sincroniza com `dashboard/latest` e invalida só o `remoteEntry.js`. O processo é o mesmo das aplicações React.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 34. packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:6-21; .github/workflows/marketing.yml:3-13, 29-30, 49, 52

**Observação:** Um workflow próprio dispara quando `packages/marketing/**` muda, constrói só esse diretório, sincroniza com `marketing/latest` e invalida só o `remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/auth, Entrada, Build); 3.4.3 (packages/auth/config, Marcadores); 3.4.4 (packages/auth/src/bootstrap.js:35, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #20; configura #28 |
| 2 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Marcadores); 3.4.4 (packages/auth/src/bootstrap.js:35, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Onde é servida, Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #20; configura #28 |
| 3 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.4 (packages/container/src/components/AuthApp.js:10, DashboardApp.js:8, MarketingApp.js:10, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #2 (Onde é servida) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #22; configura #28; configura #29; configura #30 |
| 4 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.4 (packages/container/src/components/AuthApp.js:10, DashboardApp.js:8, MarketingApp.js:10, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #2 (Onde é servida, Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #22; configura #28; configura #29; configura #30 |
| 5 | 3.4.3 (packages/dashboard, Entrada, Build); 3.4.3 (packages/dashboard/config, Marcadores); 3.4.4 (packages/dashboard/src/bootstrap.js:17, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Onde é servida) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #29 |
| 6 | 3.4.3 (packages/dashboard, Build); 3.4.3 (packages/dashboard/config, Marcadores); 3.4.4 (packages/dashboard/src/bootstrap.js:17, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Onde é servida, Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #29 |
| 7 | 3.4.3 (packages/marketing, Entrada, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (packages/marketing/src/bootstrap.js:36, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Onde é servida) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #26; configura #30 |
| 8 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (packages/marketing/src/bootstrap.js:36, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Onde é servida, Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #26; configura #30 |
| 9 | 3.4.4 (packages/auth/src/bootstrap.js:35) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #28 |
| 10 | 3.4.4 (packages/dashboard/src/bootstrap.js:17) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #29 |
| 11 | 3.4.4 (packages/marketing/src/bootstrap.js:36) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #30 |
| 12 | 3.4.4 (packages/container/src/components/AuthApp.js:10) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #28 |
| 13 | 3.4.4 (packages/container/src/components/DashboardApp.js:8) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #29 |
| 14 | 3.4.4 (packages/container/src/components/MarketingApp.js:10) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #30 |
| 15 | 3.4.4 (packages/dashboard/src/bootstrap.js:6) | 3 código | código-fonte | — | contexto | fraca | — |
| 16 | 3.4.4 (packages/container/src/components/AuthApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #28 |
| 17 | 3.4.4 (packages/container/src/components/DashboardApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #29 |
| 18 | 3.4.4 (packages/container/src/components/MarketingApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #30 |
| 19 | 3.4.4 (packages/container/src/App.js:42) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #28; implementa #29; implementa #30 |
| 20 | 3.4.3 (packages/auth) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 21 | 3.4.3 (packages/auth/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 22 | 3.4.3 (packages/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (packages/container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 24 | 3.4.3 (packages/dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (packages/dashboard/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 26 | 3.4.3 (packages/marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.3 (packages/marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 28 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #22; liga #20 |
| 29 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #22; liga #24 |
| 30 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #22; liga #26 |
| 31 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #20 |
| 32 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #22 |
| 33 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #24 |
| 34 | 3.4.6 #4 | 6 build-deploy | CI | — | arquitetural | moderada | publica #26 |

## Resumo

Observações: 34. Dimensões (tecnologia: 0, configuração: 8, código: 11, estrutura: 8, composição: 3, build-deploy: 4, documentação: 0, histórico: 0). Força (forte: 9, moderada: 20, fraca: 5, ambígua: 0). Evidência (tecnológica: 12, arquitetural: 17, contexto: 5).

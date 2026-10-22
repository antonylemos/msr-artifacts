---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
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
  date: 2026-10-21
---

# 046 — pgarr/microfrontend-template

## Leitura do repositório

É um template com a mesma arquitetura do repositório 017: um container React e três remotes, `auth` e `marketing` em React e `dashboard` em Vue, com o Module Federation nativo do webpack 5. A cadeia é a mesma, duplicada para desenvolvimento e produção:
- **Configuração:**
  - cada remote se declara e expõe um módulo (#1, #2, #5 a #8);
  - o container declara os três remotes (#3, #4). Em produção, eles ficam em `<domínio>/<app>/latest/remoteEntry.js`.
- **Código:**
  - os remotes exportam `mount` (#13 a #15);
  - o container importa cada módulo remoto pelo nome (#20 a #22), monta cada um num elemento próprio (#16 a #18) e decide nas rotas onde cada um aparece (#23).
- **Relações:** isso resulta nas três relações ativas (#32 a #34).

A separação de publicação é a mesma do repositório 017 (#35 a #38). Cada aplicação tem um workflow próprio, que publica num prefixo próprio do bucket e invalida só o seu arquivo de entrada, sem versionamento.

A diferença em relação ao repositório 017 está na documentação. Os comentários do padrão de curso descrevem a montagem isolada e pelo container, e a sincronização de navegação. As dez afirmações são corroboradas (#39 a #48).

Os bootstraps assíncronos (#9 a #12) e o `app.mount` do Vue (#19) são internos a cada unidade. Não há ponto histórico a esclarecer.

## Observações

### 1. auth/config/webpack.prod.js:1-38

**Observação:** Em produção, `publicPath: '/auth/latest/'`. `ModuleFederationPlugin` declara `name: 'auth'` e `filename: 'remoteEntry.js'`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies`, com `react` singleton.

**Interpretação:** O auth está configurado como remote em produção, num caminho próprio.

### 2. auth/config/webpack.dev.js:1-47

**Observação:** Em desenvolvimento, porta 8082. `ModuleFederationPlugin` declara `name: 'auth'` e expõe `./AuthApp`.

**Interpretação:** O auth está configurado como remote em desenvolvimento.

### 3. container/config/webpack.prod.js:1-41

**Observação:** Em produção, `publicPath: '/container/latest/'`. `ModuleFederationPlugin` declara `name: 'container'` e os remotes `marketing`, `auth` e `dashboard` em `${domain}/<app>/latest/remoteEntry.js`, com `domain` vindo de `PRODUCTION_DOMAIN`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em produção.

### 4. container/config/webpack.dev.js:1-44

**Observação:** Em desenvolvimento, porta 8080. `ModuleFederationPlugin` declara `name: 'container'` e os remotes `marketing@http://localhost:8081`, `auth@http://localhost:8082` e `dashboard@http://localhost:8083/remoteEntry.js`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em desenvolvimento.

### 5. dashboard/config/webpack.prod.js:1-24

**Observação:** Em produção, `publicPath: '/dashboard/latest/'`. `ModuleFederationPlugin` declara `name: 'dashboard'` e expõe `./DashboardApp` (`./src/bootstrap`).

**Interpretação:** O dashboard está configurado como remote em produção, num caminho próprio.

### 6. dashboard/config/webpack.dev.js:1-36

**Observação:** Em desenvolvimento, porta 8083 com CORS liberado. `ModuleFederationPlugin` declara `name: 'dashboard'` e expõe `./DashboardApp`.

**Interpretação:** O dashboard está configurado como remote em desenvolvimento.

### 7. marketing/config/webpack.prod.js:1-38

**Observação:** Em produção, `publicPath: '/marketing/latest/'`. `ModuleFederationPlugin` declara `name: 'marketing'` e expõe `./MarketingApp` (`./src/bootstrap`).

**Interpretação:** O marketing está configurado como remote em produção, num caminho próprio.

### 8. marketing/config/webpack.dev.js:1-47

**Observação:** Em desenvolvimento, porta 8081. `ModuleFederationPlugin` declara `name: 'marketing'` e expõe `./MarketingApp`.

**Interpretação:** O marketing está configurado como remote em desenvolvimento.

**Nota:** Os `webpack.common.js` das quatro aplicações, citados na mesma tabela, não têm elemento da composição. Não viraram observação.

### 9. auth/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 10. container/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 11. dashboard/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 12. marketing/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 13. auth/src/bootstrap.js:46; auth/src/bootstrap.js:14-31

**Observação:** `export { mount }` no arquivo exposto como `./AuthApp`, com opções de navegação.

**Interpretação:** O auth oferece a função de montagem ao host, com sincronização de navegação.

### 14. dashboard/src/bootstrap.js:22; dashboard/src/bootstrap.js:5-8

**Observação:** `export { mount }` no arquivo exposto como `./DashboardApp`, com `mount(el)` que cria a aplicação Vue.

**Interpretação:** O dashboard oferece a função de montagem ao host, sem troca de navegação.

### 15. marketing/src/bootstrap.js:46; marketing/src/bootstrap.js:14-31

**Observação:** `export { mount }` no arquivo exposto como `./MarketingApp`, com opções de navegação.

**Interpretação:** O marketing oferece a função de montagem ao host, com sincronização de navegação.

### 16. container/src/components/AuthApp.js:13-29

**Observação:** Chama o `mount` do auth no `ref` do wrapper, com caminho inicial, `onNavigate` e `onSignIn`, e guarda o `onParentNavigate` devolvido.

**Interpretação:** O host monta o remote num elemento próprio e sincroniza a navegação com ele.

### 17. container/src/components/DashboardApp.js:8

**Observação:** Chama o `mount` do dashboard no `ref` do wrapper.

**Interpretação:** O host monta o remote Vue num elemento próprio.

### 18. container/src/components/MarketingApp.js:13-28

**Observação:** Chama o `mount` do marketing no `ref` do wrapper, com `onNavigate`, e guarda o `onParentNavigate`.

**Interpretação:** O host monta o remote num elemento próprio e sincroniza a navegação com ele.

### 19. dashboard/src/bootstrap.js:5-8

**Observação:** `app.mount(el)` do Vue, dentro do `mount` exportado.

**Interpretação:** É uma renderização interna ao dashboard, sem mecanismo de MFE.

### 20. container/src/components/AuthApp.js:1

**Observação:** Importa `mount` de `auth/AuthApp`.

**Interpretação:** O host importa o módulo exposto pelo remote auth, pelo nome dele.

### 21. container/src/components/DashboardApp.js:1

**Observação:** Importa `mount` de `dashboard/DashboardApp`.

**Interpretação:** O host importa o módulo exposto pelo remote dashboard, pelo nome dele.

### 22. container/src/components/MarketingApp.js:1

**Observação:** Importa `mount` de `marketing/MarketingApp`.

**Interpretação:** O host importa o módulo exposto pelo remote marketing, pelo nome dele.

### 23. container/src/App.js:29-37

**Observação:** `Routes` liga `/auth/*` ao `AuthLazy`, `/dashboard` ao `DashboardLazy` (com redirecionamento para `/` sem login) e `/*` ao `MarketingLazy`.

**Interpretação:** O roteamento do host declara onde cada remote aparece.

### 24. auth; auth/package.json:1-7; auth/src/index.js:1; auth/src/bootstrap.js:20-21; auth/config/webpack.prod.js:1-10; .github/workflows/auth.yml:2-23

**Observação:** Tem manifesto, entrada, build webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 25. auth/config

**Observação:** Contém as configurações webpack do auth.

**Interpretação:** É parte do build do auth, e não uma aplicação.

### 26. container; container/package.json:1-7; container/src/index.js:1; container/src/bootstrap.js:5-6; container/config/webpack.prod.js:1-10; .github/workflows/container.yml:2-25

**Observação:** Tem manifesto, entrada, build webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 27. container/config

**Observação:** Contém as configurações webpack do container.

**Interpretação:** É parte do build do container, e não uma aplicação.

### 28. dashboard; dashboard/package.json:1-7; dashboard/src/index.js:1; dashboard/src/bootstrap.js:5-8; dashboard/config/webpack.prod.js:1-10; .github/workflows/dashboard.yml:2-23

**Observação:** Tem manifesto, entrada, build webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 29. dashboard/config

**Observação:** Contém as configurações webpack do dashboard.

**Interpretação:** É parte do build do dashboard, e não uma aplicação.

### 30. marketing; marketing/package.json:1-7; marketing/src/index.js:1; marketing/src/bootstrap.js:20-21; marketing/config/webpack.prod.js:1-10; .github/workflows/marketing.yml:2-23

**Observação:** Tem manifesto, entrada, build webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 31. marketing/config

**Observação:** Contém as configurações webpack do marketing.

**Interpretação:** É parte do build do marketing, e não uma aplicação.

### 32. container/src/components/AuthApp.js:1, 13; container/src/App.js:30-32; container/config/webpack.prod.js:17, 19; auth/config/webpack.prod.js:10-17

**Observação:** O container importa `mount` de `auth/AuthApp` e o chama no wrapper ligado à rota `/auth/*`. O nome, o módulo e o caminho `/auth/latest/` correspondem à configuração do auth.

**Interpretação:** É uma relação host → remote ativa.

### 33. container/src/components/DashboardApp.js:1, 8; container/src/App.js:33-35; container/config/webpack.prod.js:17, 20; dashboard/config/webpack.prod.js:10-17

**Observação:** O container importa `mount` de `dashboard/DashboardApp` e o chama no wrapper ligado à rota `/dashboard`. O nome, o módulo e o caminho correspondem à configuração do dashboard.

**Interpretação:** É uma relação host → remote ativa entre um host React e um remote Vue.

### 34. container/src/components/MarketingApp.js:1, 13; container/src/App.js:36; container/config/webpack.prod.js:17-18; marketing/config/webpack.prod.js:10-17

**Observação:** O container importa `mount` de `marketing/MarketingApp` e o chama no wrapper ligado à rota `/*`. O nome, o módulo e o caminho correspondem à configuração do marketing.

**Interpretação:** É uma relação host → remote ativa.

### 35. auth/package.json:6; auth/config/webpack.prod.js:1-10; .github/workflows/auth.yml:2-11, 23, 28

**Observação:** Um workflow próprio dispara quando a pasta do auth muda, constrói na pasta dela, sincroniza o `dist` com `auth/latest` e invalida só o `remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 36. container/package.json:6; container/config/webpack.prod.js:6-21; .github/workflows/container.yml:2-11, 20-22, 25, 30

**Observação:** Um workflow próprio constrói o container com `PRODUCTION_DOMAIN`, sincroniza com `container/latest` e invalida só o `index.html`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 37. dashboard/package.json:6; dashboard/config/webpack.prod.js:1-10; .github/workflows/dashboard.yml:2-11, 23, 28

**Observação:** Um workflow próprio dispara quando a pasta do dashboard muda, sincroniza com `dashboard/latest` e invalida só o `remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 38. marketing/package.json:6; marketing/config/webpack.prod.js:1-10; .github/workflows/marketing.yml:2-11, 23, 28

**Observação:** Um workflow próprio dispara quando a pasta do marketing muda, sincroniza com `marketing/latest` e invalida só o `remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 39. auth/src/bootstrap.js:34-35

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** Afirma que o auth monta a si mesmo quando isolado. A afirmação é corroborada.

### 40. auth/src/bootstrap.js:44-45

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** Afirma que o auth é montado pelo container. A afirmação é corroborada.

### 41. container/src/components/AuthApp.js:11

**Observação:** "Mount the microfrontend once".

**Interpretação:** Afirma que o container monta o auth uma única vez. A afirmação é corroborada.

### 42. container/src/components/AuthApp.js:24

**Observação:** "Sync navigation from container to child".

**Interpretação:** Afirma que a navegação do container é repassada ao auth. A afirmação é corroborada.

### 43. container/src/components/MarketingApp.js:11

**Observação:** "Mount the microfrontend once".

**Interpretação:** Afirma que o container monta o marketing uma única vez. A afirmação é corroborada.

### 44. container/src/components/MarketingApp.js:23

**Observação:** "Sync navigation from container to child".

**Interpretação:** Afirma que a navegação do container é repassada ao marketing. A afirmação é corroborada.

### 45. dashboard/src/bootstrap.js:10-11

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** Afirma que o dashboard monta a si mesmo quando isolado. A afirmação é corroborada.

### 46. dashboard/src/bootstrap.js:20-21

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** Afirma que o dashboard é montado pelo container. A afirmação é corroborada.

### 47. marketing/src/bootstrap.js:34-35

**Observação:** "If we are in development and in isolation, call mount immediately".

**Interpretação:** Afirma que o marketing monta a si mesmo quando isolado. A afirmação é corroborada.

### 48. marketing/src/bootstrap.js:44-45

**Observação:** "We are running through container and we should export the mount function".

**Interpretação:** Afirma que o marketing é montado pelo container. A afirmação é corroborada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (auth, Build); 3.4.3 (auth/config, Marcadores); 3.4.4 (auth/src/bootstrap.js:46, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #32 |
| 2 | 3.4.3 (auth/config, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #32 |
| 3 | 3.4.3 (container, Build); 3.4.3 (container/config, Marcadores); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #26; configura #32; configura #33; configura #34 |
| 4 | 3.4.3 (container/config, Marcadores); 3.4.5 #1, #2, #3 (Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #26; configura #32; configura #33; configura #34 |
| 5 | 3.4.3 (dashboard, Build); 3.4.3 (dashboard/config, Marcadores); 3.4.4 (dashboard/src/bootstrap.js:22, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #28; configura #33 |
| 6 | 3.4.3 (dashboard/config, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #28; configura #33 |
| 7 | 3.4.3 (marketing, Build); 3.4.3 (marketing/config, Marcadores); 3.4.4 (marketing/src/bootstrap.js:46, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #34 |
| 8 | 3.4.3 (marketing/config, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #34 |
| 9 | 3.4.4 (auth/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 10 | 3.4.4 (container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 11 | 3.4.4 (dashboard/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 12 | 3.4.4 (marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (auth/src/bootstrap.js:46) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #32 |
| 14 | 3.4.4 (dashboard/src/bootstrap.js:22) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 15 | 3.4.4 (marketing/src/bootstrap.js:46) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #34 |
| 16 | 3.4.4 (container/src/components/AuthApp.js:13) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #32 |
| 17 | 3.4.4 (container/src/components/DashboardApp.js:8) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 18 | 3.4.4 (container/src/components/MarketingApp.js:13) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #34 |
| 19 | 3.4.4 (dashboard/src/bootstrap.js:7) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (container/src/components/AuthApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32 |
| 21 | 3.4.4 (container/src/components/DashboardApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #33 |
| 22 | 3.4.4 (container/src/components/MarketingApp.js:1) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #34 |
| 23 | 3.4.4 (container/src/App.js:29) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32; implementa #33; implementa #34 |
| 24 | 3.4.3 (auth) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (auth/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 26 | 3.4.3 (container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.3 (container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 28 | 3.4.3 (dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (dashboard/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 30 | 3.4.3 (marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 32 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #24 |
| 33 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #28 |
| 34 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #30 |
| 35 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #24 |
| 36 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #26 |
| 37 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #28 |
| 38 | 3.4.6 #4 | 6 build-deploy | CI | — | arquitetural | moderada | publica #30 |
| 39 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #24; corrobora auth/src/bootstrap.js:36-42 |
| 40 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #32; corrobora #20; corrobora #16 |
| 41 | 3.4.7 #3 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #16 |
| 42 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora container/src/components/AuthApp.js:21, 25-29 |
| 43 | 3.4.7 #5 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #18 |
| 44 | 3.4.7 #6 | 7 documentação | comentário | — | arquitetural | fraca | corrobora container/src/components/MarketingApp.js:24-28 |
| 45 | 3.4.7 #7 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #28; corrobora dashboard/src/bootstrap.js:12-18 |
| 46 | 3.4.7 #8 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #33; corrobora #21; corrobora #17 |
| 47 | 3.4.7 #9 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #30; corrobora marketing/src/bootstrap.js:36-42 |
| 48 | 3.4.7 #10 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #34; corrobora #22; corrobora #18 |

## Resumo

Observações: 48. Dimensões (tecnologia: 0, configuração: 8, código: 15, estrutura: 8, composição: 3, build-deploy: 4, documentação: 10, histórico: 0). Força (forte: 9, moderada: 20, fraca: 19, ambígua: 0). Evidência (tecnológica: 16, arquitetural: 27, contexto: 5).

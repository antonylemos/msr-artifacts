---
schema: 1
id: 1007785611
full_name: a-kelen/mfe
commit: 80e4481f9b927142d2c57f4c2787da93ad01b54e
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

# 017 — a-kelen/mfe

## Leitura do repositório

Um container React compõe três remotes, `auth` e `marketing` em React e `dashboard` em Vue, com o Module Federation nativo do webpack 5. Por isso não há observação de dependência.

A cadeia está completa e duplicada para desenvolvimento e produção:
- **Configuração:**
  - cada remote se declara e expõe um módulo, tanto na configuração de desenvolvimento quanto na de produção (#1, #2, #5 a #8);
  - o container declara os três remotes nas duas (#3, #4). Em produção, eles ficam em `<domínio>/<app>/latest/remoteEntry.js`.
- **Código:**
  - os remotes exportam `mount` (#13 a #15);
  - o container importa cada módulo remoto pelo nome (#17 a #19) e o monta num elemento próprio (#20 a #22);
  - as rotas do container decidem onde cada um aparece (#23).
- **Relações:** isso resulta nas três relações ativas (#32 a #34), entre quatro unidades com limites próprios.

A publicação é separada por aplicação (#35 a #38). Cada aplicação tem um workflow próprio, que só roda quando a pasta dela muda, publica num prefixo próprio do bucket e invalida só o seu arquivo de entrada. Não há versionamento: todas publicam em `latest`.

Os bootstraps assíncronos (#9 a #12) e o `app.mount` do Vue (#16) são internos a cada unidade. O repositório não tem documentação nem ponto histórico a esclarecer.

## Observações

### 1. packages/auth/config/webpack.prod.js:1-24

**Observação:** Em produção, `publicPath: '/auth/latest/'`. `ModuleFederationPlugin` declara `name: 'auth'` e `filename: 'remoteEntry.js'`, expõe `./AuthApp` (`./src/bootstrap`) e compartilha as `dependencies` do `package.json`.

**Interpretação:** O auth está configurado como remote em produção, num caminho próprio.

### 2. packages/auth/config/webpack.dev.js:1-29

**Observação:** Em desenvolvimento, porta 8082. `ModuleFederationPlugin` declara `name: 'auth'` e expõe `./AuthApp` (`./src/bootstrap`).

**Interpretação:** O auth está configurado como remote em desenvolvimento.

### 3. packages/container/config/webpack.prod.js:1-27

**Observação:** Em produção, `publicPath: '/container/latest/'`. `ModuleFederationPlugin` declara `name: 'container'` e os remotes `marketing`, `auth` e `dashboard` em `${domain}/<app>/latest/remoteEntry.js`, com `domain` vindo de `PRODUCTION_DOMAIN`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em produção.

### 4. packages/container/config/webpack.dev.js:1-30

**Observação:** Em desenvolvimento, porta 8080. `ModuleFederationPlugin` declara `name: 'container'` e os remotes `marketing@http://localhost:8081`, `auth@http://localhost:8082` e `dashboard@http://localhost:8084/remoteEntry.js`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em desenvolvimento.

### 5. packages/dashboard/config/webpack.prod.js:1-24

**Observação:** Em produção, `publicPath: '/dashboard/latest/'`. `ModuleFederationPlugin` declara `name: 'dashboard'` e expõe `./DashboardApp` (`./src/bootstrap`).

**Interpretação:** O dashboard está configurado como remote em produção, num caminho próprio.

### 6. packages/dashboard/config/webpack.dev.js:1-32

**Observação:** Em desenvolvimento, porta 8084 com CORS liberado. `ModuleFederationPlugin` declara `name: 'dashboard'` e expõe `./DashboardApp`.

**Interpretação:** O dashboard está configurado como remote em desenvolvimento.

### 7. packages/marketing/config/webpack.prod.js:1-24

**Observação:** Em produção, `publicPath: '/marketing/latest/'`. `ModuleFederationPlugin` declara `name: 'marketing'` e expõe `./MarketingApp` (`./src/bootstrap`).

**Interpretação:** O marketing está configurado como remote em produção, num caminho próprio.

### 8. packages/marketing/config/webpack.dev.js:1-29

**Observação:** Em desenvolvimento, porta 8081. `ModuleFederationPlugin` declara `name: 'marketing'` e expõe `./MarketingApp`.

**Interpretação:** O marketing está configurado como remote em desenvolvimento.

**Nota:** Os `webpack.common.js` das quatro aplicações, citados na mesma tabela, só configuram loaders e o template HTML, sem elemento da composição. Não viraram observação.

### 9. packages/auth/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 10. packages/container/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 11. packages/dashboard/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 12. packages/marketing/src/index.js:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 13. packages/auth/src/bootstrap.js:34; packages/auth/src/bootstrap.js:7-23

**Observação:** `export { mount }` no arquivo exposto como `./AuthApp`. O `mount` recebe o elemento e opções de navegação e devolve `onParentNavigate`.

**Interpretação:** O auth oferece a função de montagem ao host, com sincronização de navegação.

### 14. packages/dashboard/src/bootstrap.js:4-16

**Observação:** `export { mount }`, com `mount(el)` que cria e monta a aplicação Vue, no arquivo exposto como `./DashboardApp`.

**Interpretação:** O dashboard oferece a função de montagem ao host, sem troca de navegação.

### 15. packages/marketing/src/bootstrap.js:33; packages/marketing/src/bootstrap.js:6-23

**Observação:** `export { mount }` no arquivo exposto como `./MarketingApp`, com opções de navegação.

**Interpretação:** O marketing oferece a função de montagem ao host, com sincronização de navegação.

### 16. packages/dashboard/src/bootstrap.js:6

**Observação:** `app.mount(el)` do Vue, dentro do `mount` exportado.

**Interpretação:** É uma renderização interna ao dashboard, sem mecanismo de MFE.

### 17. packages/container/src/components/AuthApp.js:4

**Observação:** `import { mount as mountAuthApp } from 'auth/AuthApp'`.

**Interpretação:** O host importa o módulo exposto pelo remote auth, pelo nome dele.

### 18. packages/container/src/components/DashboardApp.js:2

**Observação:** `import { mount as mountDashboardApp } from 'dashboard/DashboardApp'`.

**Interpretação:** O host importa o módulo exposto pelo remote dashboard, pelo nome dele.

### 19. packages/container/src/components/MarketingApp.js:4

**Observação:** `import { mount as mountMarketingApp } from 'marketing/MarketingApp'`.

**Interpretação:** O host importa o módulo exposto pelo remote marketing, pelo nome dele.

### 20. packages/container/src/components/AuthApp.js:10-21

**Observação:** Chama `mountAuthApp(ref.current, { initialPath, onNavigate, onSignIn })` e registra `onParentNavigate` no histórico do container.

**Interpretação:** O host monta o remote num elemento próprio e sincroniza a navegação com ele.

### 21. packages/container/src/components/DashboardApp.js:7-9

**Observação:** Chama `mountDashboardApp(ref.current)`.

**Interpretação:** O host monta o remote Vue num elemento próprio.

### 22. packages/container/src/components/MarketingApp.js:11-20

**Observação:** Chama `mountMarketingApp(ref.current, { … onNavigate })` e registra `onParentNavigate`.

**Interpretação:** O host monta o remote num elemento próprio e sincroniza a navegação com ele.

### 23. packages/container/src/App.js:40-48

**Observação:** O `Switch` liga `/auth` ao `AuthApp`, `/dashboard` ao `DashboardApp` (só com login) e `/` ao `MarketingApp`.

**Interpretação:** O roteamento do host declara onde cada remote aparece.

### 24. packages/auth; packages/auth/package.json:1-7; packages/auth/src/index.js:1; packages/auth/src/bootstrap.js:7-16; packages/auth/config/webpack.prod.js:1-10; .github/workflows/auth.yml:10-26

**Observação:** Tem manifesto, entrada, build webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 25. packages/auth/config

**Observação:** Contém as configurações webpack do auth.

**Interpretação:** É parte do build do auth, e não uma aplicação.

### 26. packages/container; packages/container/package.json:1-7; packages/container/src/index.js:1; packages/container/src/bootstrap.js:1-5; packages/container/config/webpack.prod.js:1-10; .github/workflows/container.yml:10-28

**Observação:** Tem manifesto, entrada, build webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 27. packages/container/config

**Observação:** Contém as configurações webpack do container.

**Interpretação:** É parte do build do container, e não uma aplicação.

### 28. packages/dashboard; packages/dashboard/package.json:1-7; packages/dashboard/src/index.js:1; packages/dashboard/src/bootstrap.js:4-12; packages/dashboard/config/webpack.prod.js:1-10; .github/workflows/dashboard.yml:10-26

**Observação:** Tem manifesto, entrada, build webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 29. packages/dashboard/config

**Observação:** Contém as configurações webpack do dashboard.

**Interpretação:** É parte do build do dashboard, e não uma aplicação.

### 30. packages/marketing; packages/marketing/package.json:1-7; packages/marketing/src/index.js:1; packages/marketing/src/bootstrap.js:6-15; packages/marketing/config/webpack.prod.js:1-10; .github/workflows/marketing.yml:10-26

**Observação:** Tem manifesto, entrada, build webpack e workflow próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 31. packages/marketing/config

**Observação:** Contém as configurações webpack do marketing.

**Interpretação:** É parte do build do marketing, e não uma aplicação.

### 32. packages/container/src/components/AuthApp.js:4, 11; packages/container/src/App.js:41-43; packages/container/config/webpack.prod.js:17, 19; packages/auth/config/webpack.prod.js:10-17

**Observação:** O container importa `mount` de `auth/AuthApp` e o chama no wrapper ligado à rota `/auth`. O nome, o módulo e o caminho `/auth/latest/` correspondem à configuração do auth.

**Interpretação:** É uma relação host → remote ativa.

### 33. packages/container/src/components/DashboardApp.js:2, 8; packages/container/src/App.js:44-47; packages/container/config/webpack.prod.js:17, 20; packages/dashboard/config/webpack.prod.js:10-17

**Observação:** O container importa `mount` de `dashboard/DashboardApp` e o chama no wrapper ligado à rota `/dashboard`. O nome, o módulo e o caminho correspondem à configuração do dashboard.

**Interpretação:** É uma relação host → remote ativa entre um host React e um remote Vue.

### 34. packages/container/src/components/MarketingApp.js:4, 11; packages/container/src/App.js:48; packages/container/config/webpack.prod.js:17-18; packages/marketing/config/webpack.prod.js:10-17

**Observação:** O container importa `mount` de `marketing/MarketingApp` e o chama no wrapper ligado à rota `/`. O nome, o módulo e o caminho correspondem à configuração do marketing.

**Interpretação:** É uma relação host → remote ativa.

### 35. packages/auth/package.json:6; packages/auth/config/webpack.prod.js:1-10; .github/workflows/auth.yml:3-12, 26, 32

**Observação:** Um workflow próprio dispara quando a pasta do auth muda, constrói na pasta dela, sincroniza o `dist` com `auth/latest` e invalida só o `remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 36. packages/container/package.json:6; packages/container/config/webpack.prod.js:1-27; .github/workflows/container.yml:3-12, 22-25, 28, 34

**Observação:** Um workflow próprio constrói o container com `PRODUCTION_DOMAIN`, sincroniza com `container/latest` e invalida só o `index.html`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente. Os remotes podem ser republicados sem rebuild do host, porque ele os busca em `latest`.

### 37. packages/dashboard/package.json:6; packages/dashboard/config/webpack.prod.js:1-10; .github/workflows/dashboard.yml:3-12, 26, 32

**Observação:** Um workflow próprio dispara quando a pasta do dashboard muda, sincroniza com `dashboard/latest` e invalida só o `remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

### 38. packages/marketing/package.json:6; packages/marketing/config/webpack.prod.js:1-10; .github/workflows/marketing.yml:3-12, 26, 32

**Observação:** Um workflow próprio dispara quando a pasta do marketing muda, sincroniza com `marketing/latest` e invalida só o `remoteEntry.js`.

**Interpretação:** Há fronteiras de build e de deploy próprias, sem versionamento independente.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/auth, Build); 3.4.3 (packages/auth/config, Marcadores); 3.4.4 (packages/auth/src/bootstrap.js:34, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #32 |
| 2 | 3.4.3 (packages/auth/config, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #32 |
| 3 | 3.4.3 (packages/container, Build); 3.4.3 (packages/container/config, Marcadores); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #26; configura #32; configura #33; configura #34 |
| 4 | 3.4.3 (packages/container/config, Marcadores); 3.4.5 #1, #2, #3 (Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #26; configura #32; configura #33; configura #34 |
| 5 | 3.4.3 (packages/dashboard, Build); 3.4.3 (packages/dashboard/config, Marcadores); 3.4.4 (packages/dashboard/src/bootstrap.js:16, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #28; configura #33 |
| 6 | 3.4.3 (packages/dashboard/config, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #28; configura #33 |
| 7 | 3.4.3 (packages/marketing, Build); 3.4.3 (packages/marketing/config, Marcadores); 3.4.4 (packages/marketing/src/bootstrap.js:33, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #34 |
| 8 | 3.4.3 (packages/marketing/config, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #30; configura #34 |
| 9 | 3.4.4 (packages/auth/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 10 | 3.4.4 (packages/container/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 11 | 3.4.4 (packages/dashboard/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 12 | 3.4.4 (packages/marketing/src/index.js:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (packages/auth/src/bootstrap.js:34) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #32 |
| 14 | 3.4.4 (packages/dashboard/src/bootstrap.js:16) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 15 | 3.4.4 (packages/marketing/src/bootstrap.js:33) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #34 |
| 16 | 3.4.4 (packages/dashboard/src/bootstrap.js:6) | 3 código | código-fonte | — | contexto | fraca | — |
| 17 | 3.4.4 (packages/container/src/components/AuthApp.js:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32 |
| 18 | 3.4.4 (packages/container/src/components/DashboardApp.js:2) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #33 |
| 19 | 3.4.4 (packages/container/src/components/MarketingApp.js:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #34 |
| 20 | 3.4.4 (packages/container/src/components/AuthApp.js:11) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #32 |
| 21 | 3.4.4 (packages/container/src/components/DashboardApp.js:8) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 22 | 3.4.4 (packages/container/src/components/MarketingApp.js:11) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #34 |
| 23 | 3.4.4 (packages/container/src/App.js:40) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #32; implementa #33; implementa #34 |
| 24 | 3.4.3 (packages/auth) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.3 (packages/auth/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 26 | 3.4.3 (packages/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 27 | 3.4.3 (packages/container/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 28 | 3.4.3 (packages/dashboard) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (packages/dashboard/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 30 | 3.4.3 (packages/marketing) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (packages/marketing/config) | 4 estrutura | diretório | — | contexto | fraca | — |
| 32 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #24 |
| 33 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #28 |
| 34 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #26; liga #30 |
| 35 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #24 |
| 36 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #26 |
| 37 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #28 |
| 38 | 3.4.6 #4 | 6 build-deploy | CI | — | arquitetural | moderada | publica #30 |

## Resumo

Observações: 38. Dimensões (tecnologia: 0, configuração: 8, código: 15, estrutura: 8, composição: 3, build-deploy: 4, documentação: 0, histórico: 0). Força (forte: 9, moderada: 20, fraca: 9, ambígua: 0). Evidência (tecnológica: 16, arquitetural: 17, contexto: 5).

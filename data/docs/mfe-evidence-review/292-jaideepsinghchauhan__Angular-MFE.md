---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
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

# 292 — jaideepsinghchauhan/Angular-MFE

## Leitura do repositório

A cadeia principal combina as declarações de federação (#2, #9), a configuração do host com seus dois remotes (#16), os plugins webpack (#17, #19, #21) e as rotas correspondentes (#25, #26, #31). As relações #44 e #45 ligam o host às unidades mfe2 e mfe1, cujos limites de entrada e build estão em #36, #38 e #40. O canal de estado compartilhado tem implementação em #32 e relação em #46, preservando a dependência do compartilhamento padrão do wrapper Nx registrada na 3.4.

A rota greeting é o limite dessa cadeia: #27 permanece Undetermined porque consome uma chave ausente dos exposes de #18. Isso não desfaz a ligação principal ativa com mfe1. As afirmações do tutorial sobre duas exposições carregadas e independência são contraditas (#53, #57); o histórico (#63, #64) mostra a coexistência inicial da divergência e a estabilidade da dependência de serve, sem provar abandono.

Há quatro aplicações frontend na revisão estrutural: a aplicação padrão #34 fica fora da composição. A raiz, os quatro projetos de testes e as duas bibliotecas não são unidades frontend. Os quatro builds são separados (#47, #48, #49, #50), com deploy não observado e sem versionamento independente registrado. As dependências de ferramentas do workspace são contexto, e os três pontos históricos inconclusivos (#60, #61, #62) dizem respeito ao passado dessas declarações, sem mudar o snapshot. As afirmações documentais continuam evidência fraca, mesmo quando corroboradas.

## Observações

### 1. package.json:17

**Observação:** O manifesto declara `@nx/angular: 21.2.0` em `dependencies`.

**Interpretação:** Ferramenta Angular do workspace, configurada nos targets; a declaração isolada não demonstra a composição. Configurada: `Yes` na 3.4.2.

### 2. package.json:27

**Observação:** O manifesto declara `@module-federation/enhanced: ^0.9.0` em `devDependencies`.

**Interpretação:** Sinal de Module Federation; a revisão registra configuração indireta pelo wrapper Nx e pelo vínculo do lockfile. Configurada: `Yes` na 3.4.2.

### 3. package.json:28

**Observação:** O manifesto declara `@nx/cypress: 21.2.0` em `devDependencies`.

**Interpretação:** Ferramenta de testes configurada, sem demonstrar composição de frontends. Configurada: `Yes` na 3.4.2.

### 4. package.json:29

**Observação:** O manifesto declara `@nx/devkit: 21.2.0` em `devDependencies`.

**Interpretação:** Utilitário do workspace usado nas configurações de testes, sem mecanismo próprio de MFE. Configurada: `Yes` na 3.4.2.

### 5. package.json:30

**Observação:** O manifesto declara `@nx/eslint: 21.2.0` em `devDependencies`.

**Interpretação:** Ferramenta de lint configurada no workspace, sem evidência própria de composição. Configurada: `Yes` na 3.4.2.

### 6. package.json:31

**Observação:** O manifesto declara `@nx/eslint-plugin: 21.2.0` em `devDependencies`.

**Interpretação:** Plugin de análise estática configurado, sem estabelecer a arquitetura de MFE. Configurada: `Yes` na 3.4.2.

### 7. package.json:32

**Observação:** O manifesto declara `@nx/jest: 21.2.0` em `devDependencies`.

**Interpretação:** Ferramenta de testes configurada, sem estabelecer uma ligação entre aplicações. Configurada: `Yes` na 3.4.2.

### 8. package.json:33

**Observação:** O manifesto declara `@nx/js: 21.2.0` em `devDependencies`.

**Interpretação:** Ferramenta declarada sem uso observado na revisão; não sustenta mecanismo de MFE. Configurada: `No` na 3.4.2.

### 9. package.json:34

**Observação:** O manifesto declara `@nx/module-federation: 21.2.0` em `devDependencies`.

**Interpretação:** Sinal de Module Federation, com configuração registrada em observações próprias. Configurada: `Yes` na 3.4.2.

### 10. package.json:35

**Observação:** O manifesto declara `@nx/playwright: 21.2.0` em `devDependencies`.

**Interpretação:** Ferramenta de e2e configurada, sem demonstrar composição. Configurada: `Yes` na 3.4.2.

### 11. package.json:36

**Observação:** O manifesto declara `@nx/web: 21.2.0` em `devDependencies`.

**Interpretação:** Ferramenta de servidor de arquivos local configurada, sem comprovar deploy ou composição. Configurada: `Yes` na 3.4.2.

### 12. package.json:37

**Observação:** O manifesto declara `@nx/webpack: 21.2.0` em `devDependencies`.

**Interpretação:** Ferramenta declarada sem uso observado; os executores de build registrados pertencem a @nx/angular. Configurada: `No` na 3.4.2.

### 13. package.json:38

**Observação:** O manifesto declara `@nx/workspace: 21.2.0` em `devDependencies`.

**Interpretação:** Ferramenta de workspace declarada sem uso observado, sem demonstrar composição. Configurada: `No` na 3.4.2.

### 14. package.json:56

**Observação:** O manifesto declara `nx: 21.2.0` em `devDependencies`.

**Interpretação:** CLI do workspace com invocação registrada nas configurações de e2e; não é, por si, mecanismo de MFE. Configurada: `Yes` na 3.4.2.

### 15. appshell/host/project.json:59-75

**Observação:** O target serve usa `@nx/angular:module-federation-dev-server` e seleciona host:build:production ou host:build:development.

**Interpretação:** Configura o executor de desenvolvimento federado do host, sem declarar um endereço de publicação.

**Nota:** Os targets build dos project.json só conectam o executor genérico webpack-browser aos arquivos webpack. Os demais servidores, aliases de tsconfig.base.json e plugins de testes/lint não declaram elementos de composição e não geram observações de configuração. Portas locais são apenas apoio.

### 16. appshell/host/module-federation.config.ts:3-18

**Observação:** A configuração declara `name: 'host'` e `remotes: ['mfe1', 'mfe2']`. O remote externo do comentário é apenas exemplo.

**Interpretação:** Nomeia as duas unidades que o host resolve por Module Federation dentro do workspace.

### 17. appshell/host/webpack.config.ts:1-9

**Observação:** Importa a configuração local de federação e exporta `withModuleFederation(config, { dts: false })`.

**Interpretação:** Aplica o plugin de federação ao build de host. O bloco não nomeia sozinho outra unidade.

### 18. appshell/mfe1/module-federation.config.ts:3-10

**Observação:** Declara `name: 'mfe1'` e expõe `./Routes` de appshell/mfe1/src/app/remote-entry/entry.routes.ts. Expõe também `./GreetingComponent` de src/app/greeting/greeting.component.ts; não declara `./GreetingRoutes`.

**Interpretação:** Configura as exposições da unidade mfe1; a configuração isolada não identifica um consumidor.

### 19. appshell/mfe1/webpack.config.ts:1-9

**Observação:** Importa a configuração local de federação e exporta `withModuleFederation(config, { dts: false })`.

**Interpretação:** Aplica o plugin de federação ao build de mfe1. O bloco não nomeia sozinho outra unidade.

### 20. appshell/mfe2/module-federation.config.ts:3-8

**Observação:** Declara `name: 'mfe2'` e expõe `./Routes` de appshell/mfe2/src/app/remote-entry/entry.routes.ts.

**Interpretação:** Configura as exposições da unidade mfe2; a configuração isolada não identifica um consumidor.

### 21. appshell/mfe2/webpack.config.ts:1-9

**Observação:** Importa a configuração local de federação e exporta `withModuleFederation(config, { dts: false })`.

**Interpretação:** Aplica o plugin de federação ao build de mfe2. O bloco não nomeia sozinho outra unidade.

### 22. appshell/host/webpack.prod.config.ts:1-24

**Observação:** Invoca `withModuleFederation({ ...config }, { dts: false })`; os exemplos de URLs de produção estão comentados.

**Interpretação:** Reaplica a configuração federada de host em produção, sem acrescentar URLs de publicação.

### 23. appshell/mfe1/webpack.prod.config.ts:1-24

**Observação:** Invoca `withModuleFederation({ ...config }, { dts: false })`; os exemplos de URLs de produção estão comentados.

**Interpretação:** Reaplica a configuração federada de mfe1 em produção, sem acrescentar URLs de publicação.

### 24. appshell/mfe2/webpack.prod.config.ts:1-24

**Observação:** Invoca `withModuleFederation({ ...config }, { dts: false })`; os exemplos de URLs de produção estão comentados.

**Interpretação:** Reaplica a configuração federada de mfe2 em produção, sem acrescentar URLs de publicação.

### 25. appshell/host/src/app/app.routes.ts:7

**Observação:** A rota mfe2 usa `loadChildren` com `import('mfe2/Routes')` e seleciona `remoteRoutes`.

**Interpretação:** O host carrega por navegação as rotas federadas de mfe2.

### 26. appshell/host/src/app/app.routes.ts:11

**Observação:** A rota mfe1 usa `loadChildren` com `import('mfe1/Routes')` e seleciona `remoteRoutes`.

**Interpretação:** O host carrega por navegação as rotas federadas de mfe1.

### 27. appshell/host/src/app/app.routes.ts:13-17; appshell/mfe1/module-federation.config.ts:5-9

**Observação:** A rota greeting importa `mfe1/GreetingRoutes`, mas os exposes de mfe1 são `./Routes` e `./GreetingComponent`.

**Interpretação:** A construção nomeia o remote, mas a chave consumida não corresponde à exposição. Pode representar uma ligação adicional incompleta ou uma configuração divergente sem ligação efetiva por essa rota; não há sustentação para tratá-la como carregamento confirmado. Mantém-se Composição Undetermined da 3.4.4.

### 28. appshell/host/src/main.ts:1

**Observação:** Executa `import('./bootstrap')` e registra eventuais erros.

**Interpretação:** Bootstrap assíncrono interno de host, sem carregar outra unidade nessa construção.

### 29. appshell/mfe1/src/main.ts:1

**Observação:** Executa `import('./bootstrap')` e registra eventuais erros.

**Interpretação:** Bootstrap assíncrono interno de mfe1, sem carregar outra unidade nessa construção.

### 30. appshell/mfe2/src/main.ts:1

**Observação:** Executa `import('./bootstrap')` e registra eventuais erros.

**Interpretação:** Bootstrap assíncrono interno de mfe2, sem carregar outra unidade nessa construção.

### 31. appshell/host/src/app/app.routes.ts:4-22; appshell/host/src/app/app.config.ts:13; appshell/host/src/app/app.html:1-5; appshell/host/src/app/app.html:17

**Observação:** appRoutes associa os caminhos mfe2, mfe1 e greeting aos imports federados; provideRouter registra a tabela, e o template traz navegação e router-outlet.

**Interpretação:** A tabela organiza a composição por navegação no host. Os dois Routes correspondentes sustentam relações ativas; a rota greeting conserva o limite descrito em #27.

### 32. libs/shared/data/src/lib/user.service.ts:3-20; appshell/host/src/app/app.ts:15-23; appshell/host/src/app/app.html:6-15; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:9; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:875-877; appshell/mfe1/src/app/remote-entry/entry.ts:3-8

**Observação:** login e logout alteram o signal do UserService. O host chama esses métodos, e NxWelcome de mfe1 injeta o serviço, lê seu valor e o exibe.

**Interpretação:** O serviço reativo implementa o canal registrado na 3.4.5. Seu funcionamento entre unidades depende da instância compartilhada pelo wrapper Nx, sem shared explícito nas configurações.

### 33. .; package.json:1-6; nx.json:1-99

**Observação:** A raiz contém manifesto de workspace com scripts vazio e configuração Nx, sem entrada ou build de UI próprios.

**Interpretação:** É coordenação de workspace, Unidade frontend No.

### 34. apps/angular-monorepo; apps/angular-monorepo/project.json:9-27; apps/angular-monorepo/src/main.ts:1-5

**Observação:** O projeto angular-monorepo tem entrada e target build próprios, com outputPath específico. main.ts chama bootstrapApplication.

**Interpretação:** É uma unidade frontend com limite de entrada e build próprio, Unidade frontend Yes. Não participa das relações de composição registradas.

### 35. apps/angular-monorepo-e2e; apps/angular-monorepo-e2e/project.json:2-9; apps/angular-monorepo-e2e/cypress.config.ts:1-17

**Observação:** O projeto Nx tem targets explícitos vazios e configuração de testes e2e, sem entrada nem build de UI.

**Interpretação:** É projeto de testes; Unidade frontend No, apesar do projectType application.

### 36. appshell/host; appshell/host/project.json:9-27; appshell/host/src/main.ts:1-1; appshell/host/src/bootstrap.ts:1-5; appshell/host/webpack.config.ts:1-9

**Observação:** O projeto host tem entrada e target build próprios, com outputPath específico. main.ts importa bootstrap, que chama bootstrapApplication.

**Interpretação:** É uma unidade frontend com limite de entrada e build próprio, Unidade frontend Yes.

### 37. appshell/host-e2e; appshell/host-e2e/project.json:2-9; appshell/host-e2e/playwright.config.ts:17-31

**Observação:** O projeto Nx tem targets explícitos vazios e configuração de testes e2e, sem entrada nem build de UI.

**Interpretação:** É projeto de testes; Unidade frontend No, apesar do projectType application.

### 38. appshell/mfe1; appshell/mfe1/project.json:9-27; appshell/mfe1/src/main.ts:1-1; appshell/mfe1/src/bootstrap.ts:1-5; appshell/mfe1/webpack.config.ts:1-9

**Observação:** O projeto mfe1 tem entrada e target build próprios, com outputPath específico. main.ts importa bootstrap, que chama bootstrapApplication.

**Interpretação:** É uma unidade frontend com limite de entrada e build próprio, Unidade frontend Yes.

### 39. appshell/mfe1-e2e; appshell/mfe1-e2e/project.json:2-9; appshell/mfe1-e2e/playwright.config.ts:17-31

**Observação:** O projeto Nx tem targets explícitos vazios e configuração de testes e2e, sem entrada nem build de UI.

**Interpretação:** É projeto de testes; Unidade frontend No, apesar do projectType application.

### 40. appshell/mfe2; appshell/mfe2/project.json:9-27; appshell/mfe2/src/main.ts:1-1; appshell/mfe2/src/bootstrap.ts:1-5; appshell/mfe2/webpack.config.ts:1-9

**Observação:** O projeto mfe2 tem entrada e target build próprios, com outputPath específico. main.ts importa bootstrap, que chama bootstrapApplication.

**Interpretação:** É uma unidade frontend com limite de entrada e build próprio, Unidade frontend Yes.

### 41. appshell/mfe2-e2e; appshell/mfe2-e2e/project.json:2-9; appshell/mfe2-e2e/playwright.config.ts:17-31

**Observação:** O projeto Nx tem targets explícitos vazios e configuração de testes e2e, sem entrada nem build de UI.

**Interpretação:** É projeto de testes; Unidade frontend No, apesar do projectType application.

### 42. libs/shared/data; libs/shared/data/project.json:2-19; libs/shared/data/src/index.ts:1

**Observação:** O projeto é library, exporta UserService e tem apenas targets test e lint.

**Interpretação:** Biblioteca compartilhada, sem entrada de aplicação; Unidade frontend No.

### 43. libs/shared/ui; libs/shared/ui/project.json:2-19; libs/shared/ui/src/index.ts:1

**Observação:** O projeto é library, exporta Button e tem apenas targets test e lint.

**Interpretação:** Biblioteca compartilhada, sem entrada de aplicação; Unidade frontend No.

### 44. appshell/host/src/app/app.routes.ts:7; appshell/host/src/app/app.routes.ts:4; appshell/host/module-federation.config.ts:17; appshell/mfe2/module-federation.config.ts:4-6; appshell/host/webpack.config.ts:1-9; appshell/mfe2/webpack.config.ts:1-9; appshell/host/project.json:25-26; appshell/mfe2/project.json:25-26; appshell/mfe2/src/app/remote-entry/entry.routes.ts:4

**Observação:** O host declara mfe2, importa mfe2/Routes e lê remoteRoutes, exportado pelo arquivo exposto como ./Routes. Os dois builds aplicam withModuleFederation.

**Interpretação:** Relação host → remote ativa entre host e mfe2, por Module Federation.

### 45. appshell/host/src/app/app.routes.ts:11; appshell/host/src/app/app.routes.ts:4; appshell/host/module-federation.config.ts:17; appshell/mfe1/module-federation.config.ts:4-9; appshell/host/webpack.config.ts:1-9; appshell/mfe1/webpack.config.ts:1-9; appshell/host/project.json:25-26; appshell/mfe1/project.json:25-26; appshell/mfe1/src/app/remote-entry/entry.routes.ts:4; appshell/host/src/app/app.routes.ts:16

**Observação:** O host declara mfe1, importa mfe1/Routes e lê remoteRoutes, exportado pelo arquivo exposto como ./Routes. Os dois builds aplicam withModuleFederation. O mesmo remote é nomeado pela importação GreetingRoutes, sem chave exposta correspondente.

**Interpretação:** Relação host → remote ativa entre host e mfe1, por Module Federation. A relação é ativa pela rota principal; o carregamento adicional de greeting permanece sem sustentação.

### 46. libs/shared/data/src/lib/user.service.ts:3-20; appshell/host/src/app/app.ts:15-23; appshell/host/src/app/app.html:6-15; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:9; appshell/mfe1/src/app/remote-entry/nx-welcome.ts:875-877; appshell/host/webpack.config.ts:1-9; appshell/mfe1/webpack.config.ts:1-9; tsconfig.base.json:19

**Observação:** O host escreve no signal do UserService, e mfe1 lê o estado por injeção do mesmo serviço. O alias data aponta para a biblioteca comum, e os builds usam o wrapper Nx sem shared explícito.

**Interpretação:** Relação communication ativa, de host para mfe1, classificada como events na 3.4.5. A instância compartilhada depende do comportamento padrão do wrapper Nx registrado nas revisões.

### 47. apps/angular-monorepo/project.json:9-15; apps/angular-monorepo/project.json:75-82; package.json:3

**Observação:** O target build grava em dist/apps/angular-monorepo. Usa @angular-devkit/build-angular:browser e tem serve-static local. A revisão registra deploy não observado e Versionamento No; a versão da raiz é 0.0.0.

**Interpretação:** Fronteira de build separada da aplicação, sem publicação ou versão independente observadas.

### 48. appshell/host/project.json:9-15; appshell/host/project.json:44-46; appshell/host/webpack.prod.config.ts:1-24; appshell/host/project.json:59-75; package.json:3

**Observação:** O target build grava em dist/appshell/host. Usa @nx/angular:webpack-browser com webpack de produção próprio, sem URLs de deploy acrescentadas. A revisão registra deploy não observado e Versionamento No; a versão da raiz é 0.0.0.

**Interpretação:** Fronteira de build separada da aplicação, sem publicação ou versão independente observadas.

### 49. appshell/mfe1/project.json:9-15; appshell/mfe1/project.json:44-46; appshell/mfe1/webpack.prod.config.ts:1-24; appshell/mfe1/project.json:59-76; package.json:3

**Observação:** O target build grava em dist/appshell/mfe1. Usa @nx/angular:webpack-browser com webpack de produção próprio, sem URLs de deploy acrescentadas. O target serve depende de host:serve. A revisão registra deploy não observado e Versionamento No; a versão da raiz é 0.0.0.

**Interpretação:** Fronteira de build separada da aplicação, sem publicação ou versão independente observadas. A dependência de serve é de execução em desenvolvimento.

### 50. appshell/mfe2/project.json:9-15; appshell/mfe2/project.json:44-46; appshell/mfe2/webpack.prod.config.ts:1-24; appshell/mfe2/project.json:59-76; package.json:3

**Observação:** O target build grava em dist/appshell/mfe2. Usa @nx/angular:webpack-browser com webpack de produção próprio, sem URLs de deploy acrescentadas. O target serve depende de host:serve. A revisão registra deploy não observado e Versionamento No; a versão da raiz é 0.0.0.

**Interpretação:** Fronteira de build separada da aplicação, sem publicação ou versão independente observadas. A dependência de serve é de execução em desenvolvimento.

### 51. README.md:1

**Observação:** O README apresenta um host/Appshell, dois MFEs e duas bibliotecas.

**Interpretação:** Descreve a organização do conjunto federado, corroborada pelas unidades e relações; não é inventário exaustivo de todo o workspace.

### 52. README.md:2

**Observação:** O README atribui a uma biblioteca o compartilhamento de dados entre MFEs e à outra componentes HTML comuns.

**Interpretação:** Afirmação arquitetural corroborada pelo canal de dados e pelos imports da biblioteca de UI, sem provar que o botão seja renderizado em mfe1.

### 53. README.md:3

**Observação:** O README afirma que um MFE exporta dois componentes independentes e ambos são carregados por rota.

**Interpretação:** Afirmação contradita: a exposição GreetingComponent não corresponde à importação GreetingRoutes. A relação principal com mfe1 permanece ativa.

### 54. README.md:134

**Observação:** O README descreve o mapeamento dos dois MFEs no arquivo de configuração de Module Federation do host.

**Interpretação:** Afirmação arquitetural corroborada pelo registro dos remotes e suas exposições.

### 55. README.md:135

**Observação:** O README diz que o mapeamento é local e que as URLs precisam ser acrescentadas à configuração de produção.

**Interpretação:** A afirmação reconhece uma lacuna de produção, corroborada pelo override comentado e pelos registros de deploy não observado.

### 56. README.md:140

**Observação:** O README diz que o host usa lazy loading nas rotas e carrega o MFE para o qual se navega.

**Interpretação:** Afirmação corroborada para as duas rotas principais, sem resolver a divergência da rota adicional.

### 57. README.md:250

**Observação:** O README afirma que o resultado funciona como um MFE standalone independente.

**Interpretação:** Afirmação contradita pelos limites registrados: serve de mfe1 depende do host e o carregamento federado de greeting não tem exposição correspondente.

### 58. README.md:283

**Observação:** O README descreve usar o mesmo import do botão por alias para incorporá-lo em mfe1 ou mfe2 e exemplifica mfe1.

**Interpretação:** Afirmação corroborada sobre reutilização da biblioteca em unidades; o import compartilhado não cria outra relação de composição.

### 59. README.md:346

**Observação:** O README descreve injetar o mesmo serviço num MFE para trabalhar com os dados de login e logout.

**Interpretação:** Afirmação corroborada pelo canal de estado do host para mfe1 registrado na revisão de composição.

### 60. f716548 2025-06-17 (package.json); 6a85acf 2025-06-29 (package.json)

**Observação:** A 3.4.8 registra que package.json existe no primeiro commit, muda no segundo e não muda depois. A versão do segundo declara @nx/js; o manifesto inicial não pôde ser lido por objeto ausente.

**Interpretação:** Ponto inconclusivo sobre o passado da dependência: não distingue inclusão sem configuração, herança ou abandono. O No do snapshot é claro, e a lacuna não muda sua leitura arquitetural.

### 61. f716548 2025-06-17 (package.json); 6a85acf 2025-06-29 (package.json)

**Observação:** A 3.4.8 registra que package.json existe no primeiro commit, muda no segundo e não muda depois. A versão do segundo declara @nx/webpack; o manifesto inicial não pôde ser lido por objeto ausente.

**Interpretação:** Ponto inconclusivo sobre o passado da dependência: não distingue inclusão sem configuração, herança ou abandono. O No do snapshot é claro, e a lacuna não muda sua leitura arquitetural.

### 62. f716548 2025-06-17 (package.json); 6a85acf 2025-06-29 (package.json)

**Observação:** A 3.4.8 registra que package.json existe no primeiro commit, muda no segundo e não muda depois. A versão do segundo declara @nx/workspace; o manifesto inicial não pôde ser lido por objeto ausente.

**Interpretação:** Ponto inconclusivo sobre o passado da dependência: não distingue inclusão sem configuração, herança ou abandono. O No do snapshot é claro, e a lacuna não muda sua leitura arquitetural.

### 63. 6a85acf 2025-06-29 (appshell/host/src/app/app.routes.ts; appshell/mfe1/module-federation.config.ts); 0a0848e 2025-06-29 (README.md); 7648339 2025-06-29 (README.md)

**Observação:** A revisão histórica registra os arquivos de greeting adicionados em 6a85acf já com GreetingRoutes consumido e GreetingComponent exposto, sem alterações posteriores nesses arquivos. O README intermediário não estava disponível.

**Interpretação:** Ponto esclarecido quanto à coexistência das chaves divergentes desde a primeira versão dos artefatos. Não demonstra abandono nem corrige a construção Undetermined ou a afirmação contradita.

### 64. 6a85acf 2025-06-29 (appshell/mfe1/project.json); 0a0848e 2025-06-29 (README.md); 7648339 2025-06-29 (README.md)

**Observação:** A 3.4.8 registra project.json de mfe1 adicionado já com dependsOn host:serve, sem mudanças posteriores. A versão intermediária do README não estava disponível.

**Interpretação:** Ponto esclarecido sobre a estabilidade do target de execução: não há nesse arquivo uma versão anterior sem a dependência que explique a afirmação de independência. Não permite datar a frase nem atribuir intenção.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:17) | 1 tecnologia | manifesto | — | contexto | fraca | declara #15 |
| 2 | 3.4.2 (package.json:27) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #17; declara #19; declara #21 |
| 3 | 3.4.2 (package.json:28) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 4 | 3.4.2 (package.json:29) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 5 | 3.4.2 (package.json:30) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 6 | 3.4.2 (package.json:31) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 7 | 3.4.2 (package.json:32) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 8 | 3.4.2 (package.json:33) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 9 | 3.4.2 (package.json:34) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #16; declara #17; declara #18; declara #19; declara #20; declara #21; declara #22; declara #23; declara #24 |
| 10 | 3.4.2 (package.json:35) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 11 | 3.4.2 (package.json:36) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 12 | 3.4.2 (package.json:37) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 13 | 3.4.2 (package.json:38) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 14 | 3.4.2 (package.json:56) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 15 | 3.4.2 (package.json:17, Evidência); 3.4.3 (appshell/host, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #36 |
| 16 | 3.4.2 (package.json:27,34, Evidência); 3.4.3 (appshell/host, Marcadores); 3.4.4 (appshell/host/src/app/app.routes.ts:7, Observação); 3.4.5 #1, #2 (Configuração); 3.4.7 #4, #5 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #44; configura #45; configura #31; configura #25; configura #26; configura #27 |
| 17 | 3.4.2 (package.json:27,34, Evidência); 3.4.3 (appshell/host, Marcadores e Build); 3.4.5 #1, #2, #3 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #36; configura #45; configura #44; configura #46 |
| 18 | 3.4.2 (package.json:27,34, Evidência); 3.4.3 (appshell/mfe1, Marcadores); 3.4.4 (appshell/host/src/app/app.routes.ts:11,16, Observação); 3.4.5 #2 (Configuração); 3.4.7 #3, #4, #7 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38; configura #45; configura #27 |
| 19 | 3.4.2 (package.json:27,34, Evidência); 3.4.3 (appshell/mfe1, Marcadores e Build); 3.4.5 #2, #3 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38; configura #45; configura #46 |
| 20 | 3.4.2 (package.json:27,34, Evidência); 3.4.3 (appshell/mfe2, Marcadores); 3.4.4 (appshell/host/src/app/app.routes.ts:7, Observação); 3.4.5 #1 (Configuração); 3.4.7 #4 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40; configura #44 |
| 21 | 3.4.2 (package.json:27,34, Evidência); 3.4.3 (appshell/mfe2, Marcadores e Build); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40; configura #44 |
| 22 | 3.4.2 (package.json:34, Evidência); 3.4.3 (appshell/host, Marcadores); 3.4.6 #2 (Artefatos); 3.4.7 #5 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #36 |
| 23 | 3.4.2 (package.json:34, Evidência); 3.4.3 (appshell/mfe1, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38 |
| 24 | 3.4.2 (package.json:34, Evidência); 3.4.3 (appshell/mfe2, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #40 |
| 25 | 3.4.4 (appshell/host/src/app/app.routes.ts:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #44 |
| 26 | 3.4.4 (appshell/host/src/app/app.routes.ts:11) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #45 |
| 27 | 3.4.4 (appshell/host/src/app/app.routes.ts:16) | 3 código | código-fonte | module-federation | arquitetural | ambígua | — |
| 28 | 3.4.4 (appshell/host/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 29 | 3.4.4 (appshell/mfe1/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 30 | 3.4.4 (appshell/mfe2/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 31 | 3.4.4 (appshell/host/src/app/app.routes.ts:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #44; implementa #45 |
| 32 | 3.4.4 (libs/shared/data/src/lib/user.service.ts:11) | 3 código | código-fonte | events | arquitetural | moderada | implementa #46 |
| 33 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 34 | 3.4.3 (apps/angular-monorepo) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 35 | 3.4.3 (apps/angular-monorepo-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 36 | 3.4.3 (appshell/host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 37 | 3.4.3 (appshell/host-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 38 | 3.4.3 (appshell/mfe1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 39 | 3.4.3 (appshell/mfe1-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 40 | 3.4.3 (appshell/mfe2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 41 | 3.4.3 (appshell/mfe2-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 42 | 3.4.3 (libs/shared/data) | 4 estrutura | diretório | — | contexto | fraca | — |
| 43 | 3.4.3 (libs/shared/ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 44 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #36; liga #40 |
| 45 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #36; liga #38 |
| 46 | 3.4.5 #3 | 5 composição | código-fonte | events | arquitetural | forte | liga #36; liga #38 |
| 47 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #34 |
| 48 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #36 |
| 49 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #38 |
| 50 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #40 |
| 51 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #36; corrobora #38; corrobora #40; corrobora #42; corrobora #43; corrobora #44; corrobora #45 |
| 52 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #46; corrobora appshell/host/src/app/app.ts:4-9; corrobora appshell/mfe1/src/app/remote-entry/entry.ts:4-8 |
| 53 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #18; contradiz appshell/host/src/app/app.routes.ts:9-17 |
| 54 | 3.4.7 #4 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #16; corrobora #18; corrobora #20; corrobora #44; corrobora #45 |
| 55 | 3.4.7 #5 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #22; corrobora #48; corrobora #49; corrobora #50 |
| 56 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora #26; corrobora #44; corrobora #45 |
| 57 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #49; contradiz appshell/mfe1/project.json:59-75; contradiz #18; contradiz appshell/host/src/app/app.routes.ts:13-17 |
| 58 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora tsconfig.base.json:18; corrobora appshell/host/src/app/app.ts:4-9; corrobora appshell/mfe1/src/app/remote-entry/entry.ts:4-6 |
| 59 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #46; corrobora #32 |
| 60 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #8 |
| 61 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #12 |
| 62 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #13 |
| 63 | 3.4.8 #4 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #27; explica #18; explica #45; explica #53; explica #57 |
| 64 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #49; explica #57 |

## Resumo

Observações: 64. Dimensões (tecnologia: 14, configuração: 10, código: 8, estrutura: 11, composição: 3, build-deploy: 4, documentação: 9, histórico: 5). Força (forte: 7, moderada: 18, fraca: 38, ambígua: 1). Evidência (tecnológica: 14, arquitetural: 28, contexto: 22).

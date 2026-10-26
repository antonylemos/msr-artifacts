---
schema: 1
id: 1197367428
full_name: lkovari/monorepo-nx-mf-dyn-modfed
commit: 16f0962945720a521bac32e4a43913af1494b61b
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

# 362 — lkovari/monorepo-nx-mf-dyn-modfed

## Leitura do repositório

O workspace reúne um host Angular e três remotes com entrada e build próprios (#47, #49, #51, #53). A cadeia de Native Federation começa na dependência #4, passa pelos executores e configurações #15–#26 e pelo manifesto #27, e chega às rotas que carregam os App expostos (#33–#35, #44). As três relações de federação estão ativas e têm destino no snapshot (#57–#59). Os imports e a preparação da federação são evidência tecnológica (#32, #36, #37); os bootstraps locais e a inicialização standalone dos remotes não compõem outra unidade (#28–#31, #38–#43).

A comunicação usa a dependência #2, o bus e a ponte do host e consumidores nos componentes expostos (#45), formando três relações events do host para os remotes (#60–#62). Os handlers de query/command respondem no processo do host; isso não demonstra publicação pelos App remotos. As bibliotecas e projetos e2e não são unidades frontend (#46, #48, #50, #52, #54–#56). Os builds são separados, mas a publicação reúne as quatro saídas num site Pages, sem versionamento independente (#63–#66).

A documentação corrobora a composição por rotas e a coordenação pelo host (#70–#77), mas contém atribuição incorreta dos bootstraps no diagrama (#78), versão antiga do pacote (#88) e negação excessiva do emissor na rota remota (#89). O histórico explica a coexistência dessas divergências (#97, #99, #100). A filtragem interna do pacote tem corroboração parcial (#80, #98), e o transporte descrito pelo guia externo não foi corroborado (#91). O pacote Node sem uso (#3) e as ferramentas Nx não constituem outra abordagem de MFE. O uso de Jest permanece indeterminado (#9); as lacunas históricas (#93–#96) não mudam a cadeia arquitetural do snapshot.

## Observações

### 1. nx-mf-df/libs/common-ui-lib/package.json:9

**Observação:** O manifesto declara `@lkovari/microfrontend-platform-communication` na seção `peerDependencies`, versão `^0.3.2`.

**Interpretação:** A declaração da biblioteca de mensageria acompanha o consumidor compartilhado usado pelos componentes remotos; isolada, não estabelece as ligações entre aplicações.

### 2. nx-mf-df/package.json:89

**Observação:** O manifesto declara `@lkovari/microfrontend-platform-communication` na seção `dependencies`, versão `^0.3.2`.

**Interpretação:** A dependência fornece os providers de bus e bridge usados pelo host; a declaração sozinha é um sinal tecnológico.

### 3. nx-mf-df/package.json:91

**Observação:** O manifesto declara `@softarc/native-federation-node` na seção `dependencies`, versão `^3.3.4`.

**Interpretação:** A revisão registra Configurada No: o pacote Node não é importado nem invocado. Seu nome não demonstra uma segunda implementação da federação.

### 4. nx-mf-df/package.json:31

**Observação:** O manifesto declara `@angular-architects/native-federation` na seção `devDependencies`, versão `^21.2.3`.

**Interpretação:** A revisão registra Configurada Yes: Native Federation é o mecanismo configurado e usado nos apps. A declaração isolada não demonstra a organização das unidades.

### 5. nx-mf-df/package.json:40

**Observação:** O manifesto declara `@nx/angular` na seção `devDependencies`, versão `^22.6.3`.

**Interpretação:** A revisão confirma o executor de build da biblioteca Angular, não uma unidade frontend adicional.

### 6. nx-mf-df/package.json:41

**Observação:** O manifesto declara `@nx/devkit` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão confirma uso nas configurações Playwright. É ferramenta de testes, sem mecanismo de composição de frontend nesta declaração.

### 7. nx-mf-df/package.json:42

**Observação:** O manifesto declara `@nx/eslint` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão confirma os targets e o plugin de lint; a dependência é infraestrutura do workspace.

### 8. nx-mf-df/package.json:43

**Observação:** O manifesto declara `@nx/eslint-plugin` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão confirma a configuração ESLint e a regra de fronteiras de módulos; isso não liga aplicações em runtime.

### 9. nx-mf-df/package.json:44

**Observação:** O manifesto declara `@nx/jest` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão mantém Configurada Undetermined: o plugin e os arquivos Jest podem ser configuração ainda utilizada ou remanescente, pois o target explícito usa Vitest. A declaração não resolve essa concorrência.

### 10. nx-mf-df/package.json:45

**Observação:** O manifesto declara `@nx/js` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão confirma o build TypeScript da biblioteca de contratos, sem convertê-la em aplicação frontend.

### 11. nx-mf-df/package.json:46

**Observação:** O manifesto declara `@nx/playwright` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão confirma a inferência dos testes e2e pelo plugin; é contexto de verificação do workspace.

### 12. nx-mf-df/package.json:47

**Observação:** O manifesto declara `@nx/web` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão confirma o servidor estático local de cada build; isso não demonstra deploy independente.

### 13. nx-mf-df/package.json:48

**Observação:** O manifesto declara `@nx/workspace` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão registra Configurada No: a declaração de @nx/workspace não tem invocação direta encontrada e não demonstra composição.

### 14. nx-mf-df/package.json:71

**Observação:** O manifesto declara `nx` na seção `devDependencies`, versão `22.6.3`.

**Interpretação:** A revisão confirma comandos Nx no build e na inicialização; Nx coordena o workspace, mas esta declaração não estabelece uma arquitetura de MFE.

### 15. nx-mf-df/apps/main-host/federation.config.js:1-28

**Observação:** `withNativeFederation` declara `name: main-host`, `shared: shareAll` com singleton, strictVersion e requiredVersion auto, uma lista skip e ignoreUnusedDeps.

**Interpretação:** Configura Native Federation na unidade main-host e o compartilhamento de dependências, sem nomear outra unidade.

### 16. nx-mf-df/apps/main-host/project.json:9-22

**Observação:** O target `build` usa `@angular-architects/native-federation:build` e aponta para `main-host:esbuild` nas configurações production/development.

**Interpretação:** Configura o executor de federação no target build de main-host, sem declarar outra aplicação.

### 17. nx-mf-df/apps/main-host/project.json:23-33

**Observação:** O target `serve` usa `@angular-architects/native-federation:build` e aponta para `main-host:serve-original:development`, com dev true e execução contínua.

**Interpretação:** Configura o executor de federação no target serve de main-host, sem declarar outra aplicação.

### 18. nx-mf-df/apps/mf_remote_a/federation.config.js:1-33

**Observação:** `withNativeFederation` declara `name: mf_remote_a`, `shared: shareAll` com singleton, strictVersion e requiredVersion auto, uma lista skip e ignoreUnusedDeps. Expõe `./Component` como `./apps/mf_remote_a/src/app/app.ts`.

**Interpretação:** Configura Native Federation na unidade mf_remote_a, oferecendo seu componente raiz para consumidores, sem nomear um consumidor neste bloco.

### 19. nx-mf-df/apps/mf_remote_a/project.json:9-22

**Observação:** O target `build` usa `@angular-architects/native-federation:build` e aponta para `mf_remote_a:esbuild` nas configurações production/development.

**Interpretação:** Configura o executor de federação no target build de mf_remote_a, sem declarar outra aplicação.

### 20. nx-mf-df/apps/mf_remote_a/project.json:23-33

**Observação:** O target `serve` usa `@angular-architects/native-federation:build` e aponta para `mf_remote_a:serve-original:development`, com dev true e execução contínua.

**Interpretação:** Configura o executor de federação no target serve de mf_remote_a, sem declarar outra aplicação.

### 21. nx-mf-df/apps/mf_remote_b/federation.config.js:1-33

**Observação:** `withNativeFederation` declara `name: mf_remote_b`, `shared: shareAll` com singleton, strictVersion e requiredVersion auto, uma lista skip e ignoreUnusedDeps. Expõe `./Component` como `./apps/mf_remote_b/src/app/app.ts`.

**Interpretação:** Configura Native Federation na unidade mf_remote_b, oferecendo seu componente raiz para consumidores, sem nomear um consumidor neste bloco.

### 22. nx-mf-df/apps/mf_remote_b/project.json:9-22

**Observação:** O target `build` usa `@angular-architects/native-federation:build` e aponta para `mf_remote_b:esbuild` nas configurações production/development.

**Interpretação:** Configura o executor de federação no target build de mf_remote_b, sem declarar outra aplicação.

### 23. nx-mf-df/apps/mf_remote_b/project.json:23-33

**Observação:** O target `serve` usa `@angular-architects/native-federation:build` e aponta para `mf_remote_b:serve-original:development`, com dev true e execução contínua.

**Interpretação:** Configura o executor de federação no target serve de mf_remote_b, sem declarar outra aplicação.

### 24. nx-mf-df/apps/mf_remote_c/federation.config.js:1-33

**Observação:** `withNativeFederation` declara `name: mf_remote_c`, `shared: shareAll` com singleton, strictVersion e requiredVersion auto, uma lista skip e ignoreUnusedDeps. Expõe `./Component` como `./apps/mf_remote_c/src/app/app.ts`.

**Interpretação:** Configura Native Federation na unidade mf_remote_c, oferecendo seu componente raiz para consumidores, sem nomear um consumidor neste bloco.

### 25. nx-mf-df/apps/mf_remote_c/project.json:9-22

**Observação:** O target `build` usa `@angular-architects/native-federation:build` e aponta para `mf_remote_c:esbuild` nas configurações production/development.

**Interpretação:** Configura o executor de federação no target build de mf_remote_c, sem declarar outra aplicação.

### 26. nx-mf-df/apps/mf_remote_c/project.json:23-33

**Observação:** O target `serve` usa `@angular-architects/native-federation:build` e aponta para `mf_remote_c:serve-original:development`, com dev true e execução contínua.

**Interpretação:** Configura o executor de federação no target serve de mf_remote_c, sem declarar outra aplicação.

### 27. nx-mf-df/apps/main-host/public/federation.manifest.json:1-5

**Observação:** O manifesto mapeia `mf_remote_a`, `mf_remote_b` e `mf_remote_c` para `http://localhost:4201/remoteEntry.json`, `:4202/remoteEntry.json` e `:4203/remoteEntry.json`, respectivamente.

**Interpretação:** Declara os três destinos que o host resolve por Native Federation e seus endereços de desenvolvimento.

**Nota:** Os project.json contribuem apenas pelos targets build e serve que declaram o executor de federação. Targets esbuild/serve-original/serve-static, aliases, plugins de testes e lint e registros de projetos não declaram elemento de composição. app.config.ts e app.routes.ts são código executado pela aplicação e permanecem na dimensão 3. gh-build.mjs é script de build que reescreve o manifesto de produção: os trechos de URLs marcados como apoio na composição não geram observação adicional de configuração.

### 28. nx-mf-df/apps/main-host/src/main.ts:5; nx-mf-df/apps/main-host/src/bootstrap.ts:1-5

**Observação:** A continuação chama `import('./bootstrap')`; o bootstrap invoca `bootstrapApplication(App, appConfig)`.

**Interpretação:** Carrega o bootstrap local de main-host. A revisão registra Composição No: esse import não carrega outra unidade.

### 29. nx-mf-df/apps/mf_remote_a/src/main.ts:5; nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:1-5

**Observação:** A continuação chama `import('./bootstrap')`; o bootstrap invoca `bootstrapApplication(App, appConfig)`.

**Interpretação:** Carrega o bootstrap local de mf_remote_a. A revisão registra Composição No: esse import não carrega outra unidade.

### 30. nx-mf-df/apps/mf_remote_b/src/main.ts:5; nx-mf-df/apps/mf_remote_b/src/bootstrap.ts:1-5

**Observação:** A continuação chama `import('./bootstrap')`; o bootstrap invoca `bootstrapApplication(App, appConfig)`.

**Interpretação:** Carrega o bootstrap local de mf_remote_b. A revisão registra Composição No: esse import não carrega outra unidade.

### 31. nx-mf-df/apps/mf_remote_c/src/main.ts:5; nx-mf-df/apps/mf_remote_c/src/bootstrap.ts:1-5

**Observação:** A continuação chama `import('./bootstrap')`; o bootstrap invoca `bootstrapApplication(App, appConfig)`.

**Interpretação:** Carrega o bootstrap local de mf_remote_c. A revisão registra Composição No: esse import não carrega outra unidade.

### 32. nx-mf-df/apps/main-host/src/app/app.routes.ts:2

**Observação:** Importa `loadRemoteModule` de `@angular-architects/native-federation`.

**Interpretação:** Disponibiliza o mecanismo usado pelas rotas; o import sozinho não nomeia uma unidade de destino.

### 33. nx-mf-df/apps/main-host/src/app/app.routes.ts:14

**Observação:** A rota `mf_remote_a` usa `loadComponent` com `loadRemoteModule('mf_remote_a', './Component').then((m) => m.App)`.

**Interpretação:** Liga o caminho de navegação do host ao componente remoto de mf_remote_a por carga federada.

### 34. nx-mf-df/apps/main-host/src/app/app.routes.ts:19

**Observação:** A rota `mf_remote_b` usa `loadComponent` com `loadRemoteModule('mf_remote_b', './Component').then((m) => m.App)`.

**Interpretação:** Liga o caminho de navegação do host ao componente remoto de mf_remote_b por carga federada.

### 35. nx-mf-df/apps/main-host/src/app/app.routes.ts:24

**Observação:** A rota `mf_remote_c` usa `loadComponent` com `loadRemoteModule('mf_remote_c', './Component').then((m) => m.App)`.

**Interpretação:** Liga o caminho de navegação do host ao componente remoto de mf_remote_c por carga federada.

### 36. nx-mf-df/apps/main-host/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Disponibiliza o inicializador de federação no host; a declaração de import não nomeia destinos.

### 37. nx-mf-df/apps/main-host/src/main.ts:3

**Observação:** Chama `initFederation('federation.manifest.json')` antes do import do bootstrap local.

**Interpretação:** Usa a resolução por manifesto para preparar a federação antes de iniciar o host. O nome do manifesto não nomeia sozinho as unidades de destino.

### 38. nx-mf-df/apps/mf_remote_a/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara o modo standalone de mf_remote_a; a revisão registra Composição No. Não resolve outra unidade e não é o main executado quando o host carrega só o componente exposto.

### 39. nx-mf-df/apps/mf_remote_a/src/main.ts:3

**Observação:** Chama `initFederation()` sem manifesto nem argumento de remotes, antes do bootstrap local.

**Interpretação:** Prepara o modo standalone de mf_remote_a; a revisão registra Composição No. Não resolve outra unidade e não é o main executado quando o host carrega só o componente exposto.

### 40. nx-mf-df/apps/mf_remote_b/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara o modo standalone de mf_remote_b; a revisão registra Composição No. Não resolve outra unidade e não é o main executado quando o host carrega só o componente exposto.

### 41. nx-mf-df/apps/mf_remote_b/src/main.ts:3

**Observação:** Chama `initFederation()` sem manifesto nem argumento de remotes, antes do bootstrap local.

**Interpretação:** Prepara o modo standalone de mf_remote_b; a revisão registra Composição No. Não resolve outra unidade e não é o main executado quando o host carrega só o componente exposto.

### 42. nx-mf-df/apps/mf_remote_c/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara o modo standalone de mf_remote_c; a revisão registra Composição No. Não resolve outra unidade e não é o main executado quando o host carrega só o componente exposto.

### 43. nx-mf-df/apps/mf_remote_c/src/main.ts:3

**Observação:** Chama `initFederation()` sem manifesto nem argumento de remotes, antes do bootstrap local.

**Interpretação:** Prepara o modo standalone de mf_remote_c; a revisão registra Composição No. Não resolve outra unidade e não é o main executado quando o host carrega só o componente exposto.

### 44. nx-mf-df/apps/main-host/src/app/app.routes.ts:6-26; nx-mf-df/apps/main-host/src/app/app.config.ts:30; nx-mf-df/apps/main-host/src/app/shared/components/main/main.html:2

**Observação:** A tabela appRoutes declara Home e três caminhos mf_remote_a/b/c, cada qual com carga de m.App por loadRemoteModule. provideRouter(appRoutes) registra a tabela; o layout inclui router-outlet.

**Interpretação:** O roteamento organiza a composição do shell com os três componentes remotos.

### 45. nx-mf-df/apps/main-host/src/app/app.config.ts:31-53; nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20; nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_b/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_c/src/app/app.ts:25-28; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-query-remote-handler.service.ts:74-80; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/demo-shell-h2r-command-remote-handler.service.ts:74-80

**Observação:** O host chama provideBus e provideHostBridge para MF_REMOTE_A_ID/B_ID/C_ID, monta o compositor no header e registra bootstraps de listener e handlers de query/command. Cada App remoto provê seu ID e PlatformWelcomeLastMessageService; o serviço assina PLATFORM_MESSAGE_V1 pelo BUS_TOKEN ou pela ponte global. Os handlers de resposta executam no host na página composta.

**Interpretação:** Há comunicação do host para os consumidores nos três componentes federados pelo barramento compartilhado (events). As respostas dos handlers no host não demonstram publicação pelos componentes remotos nem comunicação bidirecional entre apps.

### 46. nx-mf-df; nx-mf-df/package.json:1-29; nx-mf-df/nx.json:1-91

**Observação:** A raiz contém o manifesto @nx-mf-df/source, scripts de coordenação Nx e configuração de workspace, sem entrada de aplicação ou build de UI próprios.

**Interpretação:** Raiz de coordenação do workspace, sem entrada ou build de UI próprios.

### 47. nx-mf-df/apps/main-host; nx-mf-df/apps/main-host/project.json:9-22; nx-mf-df/apps/main-host/project.json:58-65; nx-mf-df/apps/main-host/src/main.ts:3-5; nx-mf-df/apps/main-host/src/bootstrap.ts:5

**Observação:** O diretório contém um projeto Nx application com entrada src/main.ts, bootstrapApplication e targets próprios build e esbuild; a saída é dist/apps/main-host.

**Interpretação:** Shell Angular com entrada e target de build próprios.

### 48. nx-mf-df/apps/main-host-e2e; nx-mf-df/apps/main-host-e2e/project.json:2-8; nx-mf-df/apps/main-host-e2e/playwright.config.ts:17-31

**Observação:** O diretório é um projeto Nx e2e com targets explícitos vazios e configuração Playwright, sem entrada de aplicação ou build de UI.

**Interpretação:** Projeto de testes e2e do host, sem entrada nem build de UI.

### 49. nx-mf-df/apps/mf_remote_a; nx-mf-df/apps/mf_remote_a/project.json:9-22; nx-mf-df/apps/mf_remote_a/project.json:58-65; nx-mf-df/apps/mf_remote_a/src/main.ts:3-5; nx-mf-df/apps/mf_remote_a/src/bootstrap.ts:5

**Observação:** O diretório contém um projeto Nx application com entrada src/main.ts, bootstrapApplication e targets próprios build e esbuild; a saída é dist/apps/mf_remote_a.

**Interpretação:** Remote Angular com entrada e target de build próprios.

### 50. nx-mf-df/apps/mf_remote_a-e2e; nx-mf-df/apps/mf_remote_a-e2e/project.json:2-8; nx-mf-df/apps/mf_remote_a-e2e/playwright.config.ts:17-31

**Observação:** O diretório é um projeto Nx e2e com targets explícitos vazios e configuração Playwright, sem entrada de aplicação ou build de UI.

**Interpretação:** Projeto de testes e2e de `mf_remote_a`, sem entrada nem build de UI.

### 51. nx-mf-df/apps/mf_remote_b; nx-mf-df/apps/mf_remote_b/project.json:9-22; nx-mf-df/apps/mf_remote_b/project.json:58-65; nx-mf-df/apps/mf_remote_b/src/main.ts:3-5; nx-mf-df/apps/mf_remote_b/src/bootstrap.ts:5

**Observação:** O diretório contém um projeto Nx application com entrada src/main.ts, bootstrapApplication e targets próprios build e esbuild; a saída é dist/apps/mf_remote_b.

**Interpretação:** Remote Angular com entrada e target de build próprios.

### 52. nx-mf-df/apps/mf_remote_b-e2e; nx-mf-df/apps/mf_remote_b-e2e/project.json:2-8; nx-mf-df/apps/mf_remote_b-e2e/playwright.config.ts:17-31

**Observação:** O diretório é um projeto Nx e2e com targets explícitos vazios e configuração Playwright, sem entrada de aplicação ou build de UI.

**Interpretação:** Projeto de testes e2e de `mf_remote_b`, sem entrada nem build de UI.

### 53. nx-mf-df/apps/mf_remote_c; nx-mf-df/apps/mf_remote_c/project.json:9-22; nx-mf-df/apps/mf_remote_c/project.json:58-65; nx-mf-df/apps/mf_remote_c/src/main.ts:3-5; nx-mf-df/apps/mf_remote_c/src/bootstrap.ts:5

**Observação:** O diretório contém um projeto Nx application com entrada src/main.ts, bootstrapApplication e targets próprios build e esbuild; a saída é dist/apps/mf_remote_c.

**Interpretação:** Remote Angular com entrada e target de build próprios.

### 54. nx-mf-df/apps/mf_remote_c-e2e; nx-mf-df/apps/mf_remote_c-e2e/project.json:2-8; nx-mf-df/apps/mf_remote_c-e2e/playwright.config.ts:17-31

**Observação:** O diretório é um projeto Nx e2e com targets explícitos vazios e configuração Playwright, sem entrada de aplicação ou build de UI.

**Interpretação:** Projeto de testes e2e de `mf_remote_c`, sem entrada nem build de UI.

### 55. nx-mf-df/libs/common-ui-lib; nx-mf-df/libs/common-ui-lib/package.json:1-16; nx-mf-df/libs/common-ui-lib/project.json:2-24; nx-mf-df/libs/common-ui-lib/ng-package.json:3-6

**Observação:** O projeto Nx é library, com manifesto próprio e build ng-packagr-lite e entryFile src/index.ts.

**Interpretação:** Biblioteca compartilhada de UI e mensageria, sem entrada de aplicação.

### 56. nx-mf-df/libs/contracts-platform-messaging; nx-mf-df/libs/contracts-platform-messaging/package.json:1-11; nx-mf-df/libs/contracts-platform-messaging/project.json:2-16

**Observação:** O projeto Nx é library, com manifesto próprio e build @nx/js:tsc e entry main ./src/index.js no manifesto.

**Interpretação:** Biblioteca de contratos de mensageria, sem entrada de aplicação.

### 57. nx-mf-df/apps/main-host/src/app/app.routes.ts:14; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.config.ts:30; nx-mf-df/apps/main-host/public/federation.manifest.json:2; nx-mf-df/apps/mf_remote_a/federation.config.js:4-10; nx-mf-df/apps/mf_remote_a/src/app/app.ts:30

**Observação:** O host chama loadRemoteModule para mf_remote_a/./Component. O manifesto resolve esse nome para remoteEntry.json, e a configuração do destino declara o mesmo name e expõe ./Component como App. A inicialização lê o manifesto e o roteador registra a rota.

**Interpretação:** Relação host → remote ativa por Native Federation entre main-host e mf_remote_a, ambos no snapshot.

### 58. nx-mf-df/apps/main-host/src/app/app.routes.ts:19; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.config.ts:30; nx-mf-df/apps/main-host/public/federation.manifest.json:3; nx-mf-df/apps/mf_remote_b/federation.config.js:4-10; nx-mf-df/apps/mf_remote_b/src/app/app.ts:30

**Observação:** O host chama loadRemoteModule para mf_remote_b/./Component. O manifesto resolve esse nome para remoteEntry.json, e a configuração do destino declara o mesmo name e expõe ./Component como App. A inicialização lê o manifesto e o roteador registra a rota.

**Interpretação:** Relação host → remote ativa por Native Federation entre main-host e mf_remote_b, ambos no snapshot.

### 59. nx-mf-df/apps/main-host/src/app/app.routes.ts:24; nx-mf-df/apps/main-host/src/main.ts:3; nx-mf-df/apps/main-host/src/app/app.config.ts:30; nx-mf-df/apps/main-host/public/federation.manifest.json:4; nx-mf-df/apps/mf_remote_c/federation.config.js:4-10; nx-mf-df/apps/mf_remote_c/src/app/app.ts:30

**Observação:** O host chama loadRemoteModule para mf_remote_c/./Component. O manifesto resolve esse nome para remoteEntry.json, e a configuração do destino declara o mesmo name e expõe ./Component como App. A inicialização lê o manifesto e o roteador registra a rota.

**Interpretação:** Relação host → remote ativa por Native Federation entre main-host e mf_remote_c, ambos no snapshot.

### 60. nx-mf-df/apps/main-host/src/app/app.config.ts:31-47; nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:3; nx-mf-df/apps/mf_remote_a/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_a/src/app/app.html:3-5; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57

**Observação:** O host cria o bus e a ponte com o ID mf_remote_a, contém o compositor de mensagens e o componente exposto de mf_remote_a provê PlatformWelcomeLastMessageService, que assina o barramento pelo token herdado ou pela ponte e exibe mensagem/histórico.

**Interpretação:** Relação communication ativa, events, de main-host para mf_remote_a. Na página composta o componente remoto é consumidor; os handlers de resposta da demo rodam no host.

### 61. nx-mf-df/apps/main-host/src/app/app.config.ts:31-47; nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:5; nx-mf-df/apps/mf_remote_b/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_b/src/app/app.html:3-5; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57

**Observação:** O host cria o bus e a ponte com o ID mf_remote_b, contém o compositor de mensagens e o componente exposto de mf_remote_b provê PlatformWelcomeLastMessageService, que assina o barramento pelo token herdado ou pela ponte e exibe mensagem/histórico.

**Interpretação:** Relação communication ativa, events, de main-host para mf_remote_b. Na página composta o componente remoto é consumidor; os handlers de resposta da demo rodam no host.

### 62. nx-mf-df/apps/main-host/src/app/app.config.ts:31-47; nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:19-20; nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:7; nx-mf-df/apps/mf_remote_c/src/app/app.ts:25-28; nx-mf-df/apps/mf_remote_c/src/app/app.html:3-5; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:35-36; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:62-75; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:52-57

**Observação:** O host cria o bus e a ponte com o ID mf_remote_c, contém o compositor de mensagens e o componente exposto de mf_remote_c provê PlatformWelcomeLastMessageService, que assina o barramento pelo token herdado ou pela ponte e exibe mensagem/histórico.

**Interpretação:** Relação communication ativa, events, de main-host para mf_remote_c. Na página composta o componente remoto é consumidor; os handlers de resposta da demo rodam no host.

### 63. nx-mf-df/apps/main-host/project.json:9-22; nx-mf-df/apps/main-host/project.json:58-65; nx-mf-df/scripts/gh-build.mjs:51; nx-mf-df/scripts/gh-stage.mjs:13-18; .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46; nx-mf-df/package.json:3-29

**Observação:** O target de main-host gera dist/apps/main-host; gh-build invoca esse build com baseHref próprio. gh-stage copia a saída para a raiz de gh-pages-dist. O workflow publica gh-pages-dist como um artefato Pages; o script manual publica a mesma árvore. Não há versão própria da aplicação.

**Interpretação:** main-host tem build separado, deploy conjunto com as demais aplicações e Versionamento No, conforme a revisão. O limite do artefato de build não implica deploy independente.

### 64. nx-mf-df/apps/mf_remote_a/project.json:9-22; nx-mf-df/apps/mf_remote_a/project.json:58-65; nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25; .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46; nx-mf-df/package.json:3-29

**Observação:** O target de mf_remote_a gera dist/apps/mf_remote_a; gh-build invoca esse build com baseHref próprio. gh-stage copia a saída para gh-pages-dist/mf_remote_a. O workflow publica gh-pages-dist como um artefato Pages; o script manual publica a mesma árvore. Não há versão própria da aplicação.

**Interpretação:** mf_remote_a tem build separado, deploy conjunto com as demais aplicações e Versionamento No, conforme a revisão. O limite do artefato de build não implica deploy independente.

### 65. nx-mf-df/apps/mf_remote_b/project.json:9-22; nx-mf-df/apps/mf_remote_b/project.json:58-65; nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25; .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46; nx-mf-df/package.json:3-29

**Observação:** O target de mf_remote_b gera dist/apps/mf_remote_b; gh-build invoca esse build com baseHref próprio. gh-stage copia a saída para gh-pages-dist/mf_remote_b. O workflow publica gh-pages-dist como um artefato Pages; o script manual publica a mesma árvore. Não há versão própria da aplicação.

**Interpretação:** mf_remote_b tem build separado, deploy conjunto com as demais aplicações e Versionamento No, conforme a revisão. O limite do artefato de build não implica deploy independente.

### 66. nx-mf-df/apps/mf_remote_c/project.json:9-22; nx-mf-df/apps/mf_remote_c/project.json:58-65; nx-mf-df/scripts/gh-build.mjs:53-54; nx-mf-df/scripts/gh-stage.mjs:19-25; .github/workflows/deploy-github-pages.yml:37-58; nx-mf-df/scripts/gh-deploy.mjs:33-46; nx-mf-df/package.json:3-29

**Observação:** O target de mf_remote_c gera dist/apps/mf_remote_c; gh-build invoca esse build com baseHref próprio. gh-stage copia a saída para gh-pages-dist/mf_remote_c. O workflow publica gh-pages-dist como um artefato Pages; o script manual publica a mesma árvore. Não há versão própria da aplicação.

**Interpretação:** mf_remote_c tem build separado, deploy conjunto com as demais aplicações e Versionamento No, conforme a revisão. O limite do artefato de build não implica deploy independente.

### 67. CHANGELOG-2026-05-24.md:12

**Observação:** O documento afirma: “Native Federation fails without the patch”.

**Interpretação:** Há patch 0.3.2 registrado e alteração de exports .mjs para .js; a necessidade técnica alegada sem patch não está demonstrada. Corroboração parcial.

### 68. CHANGELOG-2026-05-31.md:16

**Observação:** O documento afirma: “a shared compile-time constant is used”.

**Interpretação:** O token comum é fornecido pelo host e consumido pelo adaptador dos remotes; é contrato compartilhado de acesso à ponte, sem prova de isolamento forte.

### 69. CHANGELOG-2026-05-31.md:37

**Observação:** O documento afirma: “Wired into all four app configs”.

**Interpretação:** Os quatro configs têm os bootstraps citados, mas os configs standalone dos remotes não executam quando apenas seus componentes são carregados no host.

### 70. README.md:3

**Observação:** O documento afirma: “Angular 21 + Nx monorepo proof-of-concept for native module federation with host-mediated cross-microfrontend messaging”.

**Interpretação:** A organização declarada corresponde às quatro unidades Angular, federação e mensageria mediada pelo host; native module federation aqui designa Native Federation.

### 71. README.md:13

**Observação:** O documento afirma: “Shell: layout, routing, owns the platform bus and window.__MFE_BRIDGE__”.

**Interpretação:** O papel do shell é confirmado por layout, roteamento, criação do bus e da bridge.

### 72. README.md:14

**Observação:** O documento afirma: “Federated remotes loaded into the shell by route”.

**Interpretação:** A afirmação é confirmada pelas três relações de carga federada por rota.

### 73. README.md:15

**Observação:** O documento afirma: “Versioned Zod contracts, participant IDs, bus validators, topic registry”.

**Interpretação:** A biblioteca define contratos/IDs/validadores de mensagens, consumidos pelo host e serviços compartilhados. Isso não demonstra releases independentes de aplicações.

### 74. README.md:16

**Observação:** O documento afirma: “Shared UI, PrimeNG setup, platform messaging adapters and demo UI”.

**Interpretação:** A biblioteca reúne UI e adaptadores importados pelos apps, sem constituir outra unidade frontend.

### 75. README.md:17

**Observação:** O documento afirma: “npm package: in-process bus, host bridge, Angular providers”.

**Interpretação:** O pacote declarado fornece os providers e o acesso ao bus usados na integração.

### 76. README.md:19

**Observação:** O documento afirma: “They expose only their root component into the host; they do not bootstrap a separate Angular app inside the federated shell page”.

**Interpretação:** O host monta o App exposto, sem executar main.ts e bootstrap standalone do remote nessa composição.

### 77. README.md:25

**Observação:** O documento afirma: “One physical bus per browser tab. The host creates it; remotes attach through the global bridge handle”.

**Interpretação:** O host cria o bus usado pelos componentes remotos por token herdado ou ponte global; não são demonstrados buses isolados comunicantes.

### 78. README.md:66-81

**Observação:** O documento afirma: “mf_remote_a / b / c (federated components) → providePlatformMessageListenerBootstrap / provideDemoShellH2rQueryRemoteHandlerBootstrap”.

**Interpretação:** O diagrama contradiz os providers dos App expostos e do host: os bootstraps de listener e query estão na execução do host, não nos componentes federados.

### 79. README.md:86-95

**Observação:** O documento afirma: “These strings are agreed explicitly in code (not inferred from federation build names)”.

**Interpretação:** Os IDs são constantes explícitas usadas pelos providers e pelas assinaturas; não são inferidos automaticamente dos nomes de build.

### 80. README.md:95

**Observação:** O documento afirma: “Routing uses optional target on messages plus each subscription’s subscriberId”.

**Interpretação:** IDs de assinantes e contratos corroboram parcialmente a alegação. A filtragem de entrega por target é interna ao pacote externo, sem fonte adquirido para confirmação.

### 81. README.md:116

**Observação:** O documento afirma: “Remotes: listen-only UI (...) replay buffer in sessionStorage for subscribers that mount after send”.

**Interpretação:** Os componentes remotos exibem mensagens/histórico e usam replay. A ausência de emissor nesses componentes não elimina o compositor do cabeçalho do host.

### 82. README.md:142

**Observação:** O documento afirma: “the “remote” handler runs in the host process (subscribes as mf_remote_a, mf_remote_b, and mf_remote_c)”.

**Interpretação:** A demo registra no host os handlers que assinam pelos três IDs. O round-trip lógico não comprova resposta executada dentro de cada App remoto.

### 83. README.md:196

**Observação:** O documento afirma: “remotes first, then host”.

**Interpretação:** O orquestrador inicia processos Nx dos remotes, espera portas ou timeout e inicia o host. Isso descreve desenvolvimento, sem provar mensageria standalone sem shell.

### 84. README.md:205

**Observação:** O documento afirma: “Production build + GitHub Pages asset prep”.

**Interpretação:** O script produz builds separados, atualiza o manifesto e reúne as saídas numa árvore de publicação, sem demonstrar deploy separado por app.

### 85. README.md:207

**Observação:** O documento afirma: “Push to gh-pages branch”.

**Interpretação:** O caminho manual publica a árvore conjunta em gh-pages; o workflow publica um site Pages. Os artefatos não demonstram sucesso de execução em produção.

### 86. README.md:248

**Observação:** O documento afirma: “Apps expose build, serve, lint, test (and federation-related esbuild / serve-original)”.

**Interpretação:** Os projetos e scripts oferecem targets por aplicação; a afirmação sobre bibliotecas limita-se aos targets configurados.

### 87. README.md:281

**Observação:** O documento afirma: “Build and lint targets use Nx caching”.

**Interpretação:** O arquivo Nx configura cache e entradas; a afirmação descreve configuração, não medição de desempenho.

### 88. README.md:287

**Observação:** O documento afirma: “is pinned at ^0.2.1 in nx-mf-df/package.json”.

**Interpretação:** O manifesto atual declara ^0.3.2 e o patch é 0.3.2. A versão ^0.2.1 da afirmação é contradita pelo snapshot.

### 89. nx-mf-comm-info.md:204

**Observação:** O documento afirma: “Listen-only (nincs küldő UI remote route-on) (Somente escuta; não há UI de envio na rota remota)”.

**Interpretação:** A alegação amplia a ausência de emissor no componente remoto à rota inteira. O header do host mantém o compositor nessas rotas, contradizendo essa ampliação.

### 90. nx-mf-comm-info.md:241-250

**Observação:** O documento afirma: “önálló dev szerver (...) nincs shell bridge (servidor de desenvolvimento autônomo; não há ponte do shell)”.

**Interpretação:** O remote tem entrada/bootstrap próprios, mas seu config standalone não cria bus/bridge; o adaptador devolve ausência de bus enquanto não existir ponte.

### 91. platform-communication-details.md:63-65

**Observação:** O documento afirma: “backed by a browser EventTarget (...) no postMessage, no WebSocket, and no cross-origin transport”.

**Interpretação:** É descrição do interior do pacote externo. Os adaptadores e imports adquiridos não confirmam EventTarget, CustomEvent nem exclusão de outros transportes no pacote; sem corroboração.

### 92. platform-communication-details.md:251

**Observação:** O documento afirma: “read handle.appId (...) and handle.remotes”.

**Interpretação:** O adaptador lê appId e remotes do handle criado pelo host. A lista é fornecida pelo host e não comprova descoberta dinâmica de unidades.

### 93. a04c0bb 2026-03-31 (nx-mf-df/package.json)

**Observação:** O log registra o manifesto em a04c0bb (2026-03-31), cuja mensagem anuncia instalação do plugin e configuração de host/remotes. O conteúdo inicial do manifesto consultado não está disponível; o snapshot só declara o pacote Node.

**Interpretação:** Inconclusivo quanto a uso anterior, instalação auxiliar ou declaração nunca usada. A dúvida é histórica; não muda o snapshot com Native Federation ativo por outro pacote.

### 94. 82423e0 2026-05-17 (nx-mf-df/libs/contracts-platform-messaging/jest.config.cts); 89e1eb6 2026-06-01 (nx-mf-df/libs/contracts-platform-messaging/vitest.config.ts); 16f0962 2026-06-07 (nx-mf-df/libs/contracts-platform-messaging/project.json)

**Observação:** 82423e0 (2026-05-17) adiciona Jest e projeto da lib de contratos; 89e1eb6 (2026-06-01) adiciona Vitest; 16f0962 (2026-06-07) altera projeto e Vitest. A configuração Jest histórica lida aponta ao preset da raiz, mas os project.json antigos consultados não estão disponíveis. O snapshot usa vitest run e preserva arquivos Jest.

**Interpretação:** Inconclusivo quanto a execução ou abandono de Jest. A sequência data a coexistência, sem resolver o uso indeterminado nem alterar os limites das quatro unidades e sua federação.

### 95. a04c0bb 2026-03-31 (nx-mf-df/package.json)

**Observação:** O manifesto aparece em a04c0bb (2026-03-31) e muda depois; sua versão inicial não está disponível na consulta registrada. No snapshot, @nx/workspace só está declarado.

**Interpretação:** Inconclusivo quanto a uso direto anterior ou declaração nunca conectada; a dúvida sobre o passado do pacote não muda a composição observada.

### 96. 81a1110 2026-05-10 (nx-mf-df/patches); 147d615 2026-05-24 (README.md; nx-mf-df/patches); 89e1eb6 2026-06-01 (nx-mf-df/patches); 16f0962 2026-06-07 (nx-mf-df/patches)

**Observação:** O log registra patches 0.1.4 em 81a1110 (2026-05-10), 0.2.1 em 147d615 (2026-05-24), 0.3.0 em 89e1eb6 (2026-06-01) e 0.3.2 em 16f0962 (2026-06-07). O README lido em 147d615 explica exports .mjs para .js; não há comparação de builds com/sem patch.

**Interpretação:** Inconclusivo quanto à necessidade técnica do patch. O histórico confirma patches versionados, mas não o erro alegado sem eles; a cadeia de composição do snapshot permanece configurada.

### 97. 147d615 2026-05-24 (README.md)

**Observação:** O README de 147d615 (2026-05-24) já contém o diagrama que atribui bootstraps aos componentes federados e a prosa que situa o handler no host. O log não registra alteração posterior do README.

**Interpretação:** Esclarecido: a divergência documental já coexistia na mesma versão. Não há fundamento para atribuir diagrama e prosa a estágios distintos; o código vigente mantém os handlers no host.

### 98. docs/mfe-history-review/362-lkovari__monorepo-nx-mf-dyn-modfed.md:31; README.md:95; nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:66-75

**Observação:** A revisão final registra que o snapshot tem assinaturas, IDs e contratos, mas não o fonte do pacote externo responsável pela entrega. Não houve consulta histórica específica para esse ponto.

**Interpretação:** Resolvido pelo snapshot quanto à origem da lacuna, preservando a corroboração parcial. Não há confirmação da filtragem interna nem indício de configuração local abandonada.

### 99. 147d615 2026-05-24 (README.md; nx-mf-df/package.json; nx-mf-comm-info.md); 89e1eb6 2026-06-01 (nx-mf-df/pnpm-workspace.yaml); 16f0962 2026-06-07 (nx-mf-df/package.json; nx-mf-df/pnpm-workspace.yaml)

**Observação:** O README de 147d615 (2026-05-24) já afirma ^0.2.1 e não muda depois; caminhos de patches mudam em 89e1eb6 (2026-06-01) e 16f0962 (2026-06-07) para 0.3.0 e 0.3.2. O manifesto de maio consultado não está disponível; o atual declara ^0.3.2.

**Interpretação:** Esclarecido: a referência documental ficou sem atualização enquanto os artefatos de dependência evoluíram. Não se afirma que o manifesto de maio declarasse efetivamente 0.2.1.

### 100. 82423e0 2026-05-17 (nx-mf-df/apps/main-host/src/app/shared/components/header/header.html); 147d615 2026-05-24 (nx-mf-comm-info.md)

**Observação:** O header lido em 82423e0 (2026-05-17) contém links das três rotas e lib-platform-messaging-trigger, sem condição de rota, e não muda depois. nx-mf-comm-info.md entra em 147d615 (2026-05-24), sem mudanças posteriores, e nega UI de envio na rota remota.

**Interpretação:** Esclarecido: o compositor já estava no cabeçalho quando o documento foi adicionado. A contradição vem da coexistência dos artefatos, sem inferir remoção posterior ou intenção.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (nx-mf-df/libs/common-ui-lib/package.json:9) | 1 tecnologia | manifesto | events | tecnológica | fraca | declara nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:10; declara nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/message-sender.service.ts:4 |
| 2 | 3.4.2 (nx-mf-df/package.json:89) | 1 tecnologia | manifesto | events | tecnológica | fraca | declara #45 |
| 3 | 3.4.2 (nx-mf-df/package.json:91) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 4 | 3.4.2 (nx-mf-df/package.json:31) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #15; declara #16; declara #17; declara #18; declara #19; declara #20; declara #21; declara #22; declara #23; declara #24; declara #25; declara #26; declara #27; declara #32; declara #36 |
| 5 | 3.4.2 (nx-mf-df/package.json:40) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 6 | 3.4.2 (nx-mf-df/package.json:41) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 7 | 3.4.2 (nx-mf-df/package.json:42) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 8 | 3.4.2 (nx-mf-df/package.json:43) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 9 | 3.4.2 (nx-mf-df/package.json:44) | 1 tecnologia | manifesto | — | contexto | ambígua | — |
| 10 | 3.4.2 (nx-mf-df/package.json:45) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 11 | 3.4.2 (nx-mf-df/package.json:46) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 12 | 3.4.2 (nx-mf-df/package.json:47) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 13 | 3.4.2 (nx-mf-df/package.json:48) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 14 | 3.4.2 (nx-mf-df/package.json:71) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 15 | 3.4.2 (nx-mf-df/package.json:91) (Evidência); 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/main-host) (Marcadores, Build) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #47 |
| 16 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/main-host) (Marcadores, Build); 3.4.6 #1 (Artefatos); 3.4.7 #20 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #47 |
| 17 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/main-host) (Marcadores); 3.4.7 #20 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #47 |
| 18 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_a) (Marcadores, Build); 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:14) (Observação); 3.4.4 (nx-mf-df/apps/mf_remote_a/src/main.ts:3) (Observação); 3.4.4 (nx-mf-df/apps/main-host/src/app/app.config.ts:31) (Observação); 3.4.5 #1 (Configuração); 3.4.7 #10 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #49; configura #57 |
| 19 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_a) (Marcadores, Build); 3.4.6 #2 (Artefatos); 3.4.7 #20 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #49 |
| 20 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_a) (Marcadores); 3.4.7 #20 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #49 |
| 21 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_b) (Marcadores, Build); 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:19) (Observação); 3.4.4 (nx-mf-df/apps/mf_remote_b/src/main.ts:3) (Observação); 3.4.5 #2 (Configuração) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #51; configura #58 |
| 22 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_b) (Marcadores, Build); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #51 |
| 23 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_b) (Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #51 |
| 24 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_c) (Marcadores, Build); 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:24) (Observação); 3.4.4 (nx-mf-df/apps/mf_remote_c/src/main.ts:3) (Observação); 3.4.5 #3 (Configuração) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #53; configura #59 |
| 25 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_c) (Marcadores, Build); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #53 |
| 26 | 3.4.2 (nx-mf-df/package.json:31) (Evidência); 3.4.3 (nx-mf-df/apps/mf_remote_c) (Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #53 |
| 27 | 3.4.4 (nx-mf-df/apps/main-host/src/main.ts:3) (Observação); 3.4.5 #1 (Configuração); 3.4.5 #2 (Configuração); 3.4.5 #3 (Configuração) | 2 configuração | configuração | native-federation | arquitetural | forte | configura #37; configura #57; configura #58; configura #59 |
| 28 | 3.4.4 (nx-mf-df/apps/main-host/src/main.ts:5) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 29 | 3.4.4 (nx-mf-df/apps/mf_remote_a/src/main.ts:5) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 30 | 3.4.4 (nx-mf-df/apps/mf_remote_b/src/main.ts:5) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 31 | 3.4.4 (nx-mf-df/apps/mf_remote_c/src/main.ts:5) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 32 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:2) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #57; implementa #58; implementa #59 |
| 33 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:14) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #57 |
| 34 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:19) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #58 |
| 35 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:24) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #59 |
| 36 | 3.4.4 (nx-mf-df/apps/main-host/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #57; implementa #58; implementa #59 |
| 37 | 3.4.4 (nx-mf-df/apps/main-host/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #57; implementa #58; implementa #59 |
| 38 | 3.4.4 (nx-mf-df/apps/mf_remote_a/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 39 | 3.4.4 (nx-mf-df/apps/mf_remote_a/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 40 | 3.4.4 (nx-mf-df/apps/mf_remote_b/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 41 | 3.4.4 (nx-mf-df/apps/mf_remote_b/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 42 | 3.4.4 (nx-mf-df/apps/mf_remote_c/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 43 | 3.4.4 (nx-mf-df/apps/mf_remote_c/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 44 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.routes.ts:6) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #57; implementa #58; implementa #59 |
| 45 | 3.4.4 (nx-mf-df/apps/main-host/src/app/app.config.ts:31) | 3 código | código-fonte | events | arquitetural | forte | implementa #60; implementa #61; implementa #62 |
| 46 | 3.4.3 (nx-mf-df) | 4 estrutura | diretório | — | contexto | fraca | — |
| 47 | 3.4.3 (nx-mf-df/apps/main-host) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 48 | 3.4.3 (nx-mf-df/apps/main-host-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 49 | 3.4.3 (nx-mf-df/apps/mf_remote_a) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 50 | 3.4.3 (nx-mf-df/apps/mf_remote_a-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 51 | 3.4.3 (nx-mf-df/apps/mf_remote_b) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 52 | 3.4.3 (nx-mf-df/apps/mf_remote_b-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 53 | 3.4.3 (nx-mf-df/apps/mf_remote_c) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 54 | 3.4.3 (nx-mf-df/apps/mf_remote_c-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 55 | 3.4.3 (nx-mf-df/libs/common-ui-lib) | 4 estrutura | diretório | — | contexto | fraca | — |
| 56 | 3.4.3 (nx-mf-df/libs/contracts-platform-messaging) | 4 estrutura | diretório | — | contexto | fraca | — |
| 57 | 3.4.5 #1 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #47; liga #49 |
| 58 | 3.4.5 #2 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #47; liga #51 |
| 59 | 3.4.5 #3 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #47; liga #53 |
| 60 | 3.4.5 #4 | 5 composição | código-fonte | events | arquitetural | forte | liga #47; liga #49 |
| 61 | 3.4.5 #5 | 5 composição | código-fonte | events | arquitetural | forte | liga #47; liga #51 |
| 62 | 3.4.5 #6 | 5 composição | código-fonte | events | arquitetural | forte | liga #47; liga #53 |
| 63 | 3.4.6 #1 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #47 |
| 64 | 3.4.6 #2 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #49 |
| 65 | 3.4.6 #3 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #51 |
| 66 | 3.4.6 #4 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #53 |
| 67 | 3.4.7 #1 | 7 documentação | documentação | native-federation | tecnológica | fraca | corrobora em parte nx-mf-df/pnpm-workspace.yaml:3-4; corrobora em parte nx-mf-df/patches/@lkovari__microfrontend-platform-communication@0.3.2.patch:9-40 |
| 68 | 3.4.7 #2 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #45 |
| 69 | 3.4.7 #3 | 7 documentação | documentação | events | arquitetural | fraca | corrobora nx-mf-df/apps/main-host/src/app/app.config.ts:52-53; corrobora nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:28-29 |
| 70 | 3.4.7 #4 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #47; corrobora #49; corrobora #51; corrobora #53; corrobora #57; corrobora #45 |
| 71 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #44; corrobora #45 |
| 72 | 3.4.7 #6 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #57; corrobora #58; corrobora #59 |
| 73 | 3.4.7 #7 | 7 documentação | documentação | — | contexto | fraca | corrobora nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-messaging-bus-config.ts:30-95 |
| 74 | 3.4.7 #8 | 7 documentação | documentação | — | contexto | fraca | corrobora nx-mf-df/apps/mf_remote_a/src/app/app.ts:4-20; corrobora nx-mf-df/apps/main-host/src/app/app.config.ts:9-22 |
| 75 | 3.4.7 #9 | 7 documentação | documentação | events | tecnológica | fraca | corrobora #2; corrobora #45 |
| 76 | 3.4.7 #10 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #57; corrobora #58; corrobora #59 |
| 77 | 3.4.7 #11 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #45 |
| 78 | 3.4.7 #12 | 7 documentação | documentação | events | arquitetural | fraca | contradiz #45 |
| 79 | 3.4.7 #13 | 7 documentação | documentação | events | arquitetural | fraca | corrobora nx-mf-df/libs/contracts-platform-messaging/src/lib/participant-ids.ts:1-32; corrobora #45 |
| 80 | 3.4.7 #14 | 7 documentação | documentação | events | arquitetural | fraca | corrobora em parte nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:66-75; corrobora em parte nx-mf-df/libs/contracts-platform-messaging/src/lib/platform-messaging-bus-config.ts:47-87 |
| 81 | 3.4.7 #15 | 7 documentação | documentação | events | arquitetural | fraca | corrobora nx-mf-df/apps/mf_remote_a/src/app/app.html:1-5; corrobora nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/message-sender.service.ts:26-29; corrobora nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/platform-welcome-last-message.service.ts:87-95 |
| 82 | 3.4.7 #16 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #45 |
| 83 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | corrobora nx-mf-df/scripts/start-all.mjs:9-17; corrobora nx-mf-df/scripts/start-all.mjs:113-121 |
| 84 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #63; corrobora #64; corrobora #65; corrobora #66 |
| 85 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #63; corrobora #64; corrobora #65; corrobora #66 |
| 86 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #63; corrobora #64; corrobora #65; corrobora #66 |
| 87 | 3.4.7 #21 | 7 documentação | documentação | — | contexto | fraca | corrobora nx-mf-df/nx.json:19-33; corrobora nx-mf-df/nx.json:41-54 |
| 88 | 3.4.7 #22 | 7 documentação | documentação | — | tecnológica | fraca | contradiz #2; contradiz nx-mf-df/pnpm-workspace.yaml:3-4 |
| 89 | 3.4.7 #23 | 7 documentação | documentação | events | arquitetural | fraca | contradiz nx-mf-df/apps/main-host/src/app/shared/components/header/header.html:14-20; contradiz #60; contradiz #61; contradiz #62 |
| 90 | 3.4.7 #24 | 7 documentação | documentação | events | arquitetural | fraca | corrobora nx-mf-df/apps/mf_remote_a/src/app/app.config.ts:19-30; corrobora nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:44-56 |
| 91 | 3.4.7 #25 | 7 documentação | documentação | events | tecnológica | fraca | — |
| 92 | 3.4.7 #26 | 7 documentação | documentação | events | arquitetural | fraca | corrobora nx-mf-df/libs/common-ui-lib/src/lib/platform-messaging/services/remote-platform-bus.service.ts:59-72; corrobora #45 |
| 93 | 3.4.8 #1 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #3 |
| 94 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #9 |
| 95 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #13 |
| 96 | 3.4.8 #4 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #67 |
| 97 | 3.4.8 #5 | 8 histórico | histórico | events | arquitetural | fraca | explica #78; explica #45 |
| 98 | 3.4.8 #6 | 8 histórico | histórico | events | arquitetural | fraca | explica #80 |
| 99 | 3.4.8 #7 | 8 histórico | histórico | — | tecnológica | fraca | explica #88; explica #2 |
| 100 | 3.4.8 #8 | 8 histórico | histórico | events | arquitetural | fraca | explica #89 |

## Resumo

Observações: 100. Dimensões (tecnologia: 14, configuração: 13, código: 18, estrutura: 11, composição: 6, build-deploy: 4, documentação: 26, histórico: 8). Força (forte: 12, moderada: 23, fraca: 64, ambígua: 1). Evidência (tecnológica: 36, arquitetural: 42, contexto: 22).

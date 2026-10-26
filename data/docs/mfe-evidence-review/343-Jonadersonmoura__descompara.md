---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
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

# 343 — Jonadersonmoura/descompara

## Leitura do repositório

O workspace Nx contém quatro aplicações Angular com entrada e build próprios (#47, #49, #56, #58). A cadeia de Native Federation parte da dependência #1, passa pelos builders e pelas configurações de cada aplicação (#15–#22) e chega ao manifesto do host (#27). O shell inicializa a federação e carrega `./Routes` nas rotas raiz, `intranet` e `admin` (#39–#44). Os nomes, módulos expostos e URLs sustentam três relações ativas host → remote (#60–#62).

Os builds geram saídas próprias e o CI os executa em conjunto; deploy e versionamento independente não foram observados (#66–#69). As URLs do manifesto apontam para desenvolvimento local. Os bootstraps assíncronos locais e os registros do próprio nome nos remotes não ligam unidades por si (#28–#37). Raiz, projetos e2e e bibliotecas compartilhadas são contexto estrutural, sem aumentar a contagem de aplicações.

A comunicação por `AuthService` permanece ambígua (#45, #63–#65): o serviço reativo pode conectar os remotes se houver uma única instância entre builds, ou ser estado local em cada aplicação. `shareAll` configura pacotes singleton, mas não demonstra esse compartilhamento da biblioteca local. A declaração de `@softarc/native-federation-orchestrator` também mantém uso indeterminado (#13). Já `@module-federation/enhanced`, `@nx/module-federation` e `@nx/webpack` são declarações sem uso configurado registrado (#3, #8, #12).

A documentação descreve a composição e a separação de aplicações, mas atribui navbar, home e guards ao shell e chama o mecanismo de “Module Federation”; a 3.4.7 registra essas três afirmações como contraditas (#73, #74, #76). O histórico contém um único commit raiz: não comprova estágios anteriores nem explica a origem das declarações excedentes e divergências (#83–#89). As dúvidas sobre o orchestrator e o canal reativo continuam afetando o snapshot; as demais dúvidas históricas dizem respeito apenas ao passado.

## Observações

### 1. package.json:58

**Observação:** O manifesto declara `@angular-architects/native-federation: ^22.0.6` em `dependencies`.

**Interpretação:** É o sinal declarativo da tecnologia usada na federação; a configuração e a ligação das unidades são observações próprias.

### 2. package.json:65

**Observação:** O manifesto declara `@nx/angular: ^23.1.0` em `dependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 3. package.json:18

**Observação:** O manifesto declara `@module-federation/enhanced: ^2.1.0` em `devDependencies`.

**Interpretação:** A declaração isolada é um sinal enganoso de outro mecanismo: a 3.4.2 registra Configurada No.

### 4. package.json:19

**Observação:** O manifesto declara `@nx/devkit: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 5. package.json:20

**Observação:** O manifesto declara `@nx/eslint: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 6. package.json:21

**Observação:** O manifesto declara `@nx/eslint-plugin: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 7. package.json:22

**Observação:** O manifesto declara `@nx/js: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 8. package.json:23

**Observação:** O manifesto declara `@nx/module-federation: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações. A 3.4.2 registra Configurada No, sem uso encontrado no snapshot.

### 9. package.json:24

**Observação:** O manifesto declara `@nx/playwright: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 10. package.json:25

**Observação:** O manifesto declara `@nx/vitest: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 11. package.json:26

**Observação:** O manifesto declara `@nx/web: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 12. package.json:27

**Observação:** O manifesto declara `@nx/webpack: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações. A 3.4.2 registra Configurada No, sem uso encontrado no snapshot.

### 13. package.json:31

**Observação:** O manifesto declara `@softarc/native-federation-orchestrator: ^4.2.2` em `devDependencies`.

**Interpretação:** Pode participar transitivamente da federação usada ou ser uma declaração excedente; o caminho efetivo de execução permanece indeterminado.

### 14. package.json:44

**Observação:** O manifesto declara `nx: 23.1.0` em `devDependencies`.

**Interpretação:** É uma declaração de ferramenta do workspace, sem demonstrar por si composição entre aplicações.

### 15. admin/federation.config.mjs:1-43

**Observação:** `withNativeFederation` define `name: admin` e `shared` com `shareAll`, `singleton: true`, `strictVersion: true` e uma regra própria para `@angular/core`. Expõe `./Routes` por `./admin/src/app/remote-entry/entry.routes.ts`.

**Interpretação:** Configura Native Federation nesta unidade; não nomeia outra aplicação como destino. O compartilhamento de pacotes não demonstra singleton da biblioteca local AuthService.

### 16. admin/project.json:9-24

**Observação:** O target `build` usa `@angular-architects/native-federation:build` e delega para `admin:esbuild` nas configurações production e development.

**Interpretação:** O builder de federação integra o build desta unidade sem ligar sozinho unidades distintas.

### 17. intranet/federation.config.mjs:1-43

**Observação:** `withNativeFederation` define `name: intranet` e `shared` com `shareAll`, `singleton: true`, `strictVersion: true` e uma regra própria para `@angular/core`. Expõe `./Routes` por `./intranet/src/app/remote-entry/entry.routes.ts`.

**Interpretação:** Configura Native Federation nesta unidade; não nomeia outra aplicação como destino. O compartilhamento de pacotes não demonstra singleton da biblioteca local AuthService.

### 18. intranet/project.json:9-24

**Observação:** O target `build` usa `@angular-architects/native-federation:build` e delega para `intranet:esbuild` nas configurações production e development.

**Interpretação:** O builder de federação integra o build desta unidade sem ligar sozinho unidades distintas.

### 19. marAberto/federation.config.mjs:1-43

**Observação:** `withNativeFederation` define `name: marAberto` e `shared` com `shareAll`, `singleton: true`, `strictVersion: true` e uma regra própria para `@angular/core`. Expõe `./Routes` por `./marAberto/src/app/remote-entry/entry.routes.ts`.

**Interpretação:** Configura Native Federation nesta unidade; não nomeia outra aplicação como destino. O compartilhamento de pacotes não demonstra singleton da biblioteca local AuthService.

### 20. marAberto/project.json:9-24

**Observação:** O target `build` usa `@angular-architects/native-federation:build` e delega para `marAberto:esbuild` nas configurações production e development.

**Interpretação:** O builder de federação integra o build desta unidade sem ligar sozinho unidades distintas.

### 21. shell/federation.config.mjs:1-38

**Observação:** `withNativeFederation` define `name: shell` e `shared` com `shareAll`, `singleton: true`, `strictVersion: true` e uma regra própria para `@angular/core`.

**Interpretação:** Configura Native Federation nesta unidade; não nomeia outra aplicação como destino. O compartilhamento de pacotes não demonstra singleton da biblioteca local AuthService.

### 22. shell/project.json:9-24

**Observação:** O target `build` usa `@angular-architects/native-federation:build` e delega para `shell:esbuild` nas configurações production e development.

**Interpretação:** O builder de federação integra o build desta unidade sem ligar sozinho unidades distintas.

### 23. shell/project.json:25-35

**Observação:** O target `serve` usa `@angular-architects/native-federation:build` com `dev: true`, `devServer: true` e `target: shell:serve-original:development`.

**Interpretação:** Configura o mecanismo de federação durante o desenvolvimento de uma unidade.

### 24. admin/project.json:25-35

**Observação:** O target `serve` usa `@angular-architects/native-federation:build` com `dev: true`, `devServer: true` e `target: admin:serve-original:development`.

**Interpretação:** Configura o mecanismo de federação durante o desenvolvimento de uma unidade.

### 25. intranet/project.json:25-35

**Observação:** O target `serve` usa `@angular-architects/native-federation:build` com `dev: true`, `devServer: true` e `target: intranet:serve-original:development`.

**Interpretação:** Configura o mecanismo de federação durante o desenvolvimento de uma unidade.

### 26. marAberto/project.json:25-35

**Observação:** O target `serve` usa `@angular-architects/native-federation:build` com `dev: true`, `devServer: true` e `target: marAberto:serve-original:development`.

**Interpretação:** Configura o mecanismo de federação durante o desenvolvimento de uma unidade.

### 27. shell/public/federation.manifest.json:1-5

**Observação:** O manifesto associa `admin`, `intranet` e `marAberto` às URLs `http://localhost:4203/remoteEntry.json`, `http://localhost:4202/remoteEntry.json` e `http://localhost:4201/remoteEntry.json`, respectivamente.

**Interpretação:** O host declara os três destinos externos à sua unidade por um mecanismo explícito de resolução de remotes. São endereços locais de desenvolvimento.

### 28. admin/src/main.ts:5

**Observação:** `import('./bootstrap')` é chamado no encadeamento de inicialização de `admin`.

**Interpretação:** É carga assíncrona local, sem destino em outra unidade.

### 29. intranet/src/main.ts:5

**Observação:** `import('./bootstrap')` é chamado no encadeamento de inicialização de `intranet`.

**Interpretação:** É carga assíncrona local, sem destino em outra unidade.

### 30. marAberto/src/main.ts:5

**Observação:** `import('./bootstrap')` é chamado no encadeamento de inicialização de `marAberto`.

**Interpretação:** É carga assíncrona local, sem destino em outra unidade.

### 31. shell/src/main.ts:5

**Observação:** `import('./bootstrap')` é chamado no encadeamento de inicialização de `shell`.

**Interpretação:** É carga assíncrona local, sem destino em outra unidade.

### 32. admin/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Importa o mecanismo de inicialização; a linha não nomeia destinos.

### 33. admin/src/main.ts:3

**Observação:** Chama `initFederation({ admin: './remoteEntry.json' })`.

**Interpretação:** Registra só a própria unidade para inicialização standalone; não resolve outra aplicação.

### 34. intranet/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Importa o mecanismo de inicialização; a linha não nomeia destinos.

### 35. intranet/src/main.ts:3

**Observação:** Chama `initFederation({ intranet: './remoteEntry.json' })`.

**Interpretação:** Registra só a própria unidade para inicialização standalone; não resolve outra aplicação.

### 36. marAberto/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Importa o mecanismo de inicialização; a linha não nomeia destinos.

### 37. marAberto/src/main.ts:3

**Observação:** Chama `initFederation({ marAberto: './remoteEntry.json' })`.

**Interpretação:** Registra só a própria unidade para inicialização standalone; não resolve outra aplicação.

### 38. shell/src/app/app.routes.ts:2

**Observação:** Importa `loadRemoteModule` de `@angular-architects/native-federation`.

**Interpretação:** Disponibiliza o carregador utilizado pela composição, sem nomear o destino nesta linha.

### 39. shell/src/app/app.routes.ts:8

**Observação:** A rota `''` usa `loadChildren` com `loadRemoteModule('marAberto', './Routes')` e retorna `m.remoteRoutes`.

**Interpretação:** Liga o caminho de navegação do shell às rotas de outra unidade, `marAberto`, por Native Federation.

### 40. shell/src/app/app.routes.ts:13

**Observação:** A rota `'intranet'` usa `loadChildren` com `loadRemoteModule('intranet', './Routes')` e retorna `m.remoteRoutes`.

**Interpretação:** Liga o caminho de navegação do shell às rotas de outra unidade, `intranet`, por Native Federation.

### 41. shell/src/app/app.routes.ts:18

**Observação:** A rota `'admin'` usa `loadChildren` com `loadRemoteModule('admin', './Routes')` e retorna `m.remoteRoutes`.

**Interpretação:** Liga o caminho de navegação do shell às rotas de outra unidade, `admin`, por Native Federation.

### 42. shell/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Importa o mecanismo de inicialização; a linha não nomeia destinos.

### 43. shell/src/main.ts:3; shell/public/federation.manifest.json:2-4

**Observação:** Chama `initFederation('/federation.manifest.json')` antes do bootstrap. O manifesto nomeia admin, intranet e marAberto.

**Interpretação:** Prepara a resolução dos remotes do host pelo manifesto; a chamada recebe o caminho do mecanismo de resolução.

### 44. shell/src/app/app.routes.ts:4-20; shell/src/app/app.config.ts:9

**Observação:** `appRoutes` mapeia a raiz para marAberto, `intranet` para intranet e `admin` para admin, usando `loadRemoteModule`; `provideRouter(appRoutes)` registra a tabela.

**Interpretação:** Organiza no host os três destinos remotos da navegação.

### 45. libs/shared/data-access/src/lib/auth.service.ts:6-27; marAberto/src/app/login/login.ts:19; intranet/src/app/login/login.ts:19; admin/src/app/login/login.ts:19; intranet/src/app/header/header.ts:17; admin/src/app/header/header.ts:17; libs/shared/guards/src/lib/role.guard.ts:14-17; intranet/src/app/remote-entry/entry.routes.ts:12; admin/src/app/remote-entry/entry.routes.ts:12

**Observação:** `AuthService`, provido em root, mantém um signal de usuário e métodos login/logout/setRole; os logins escrevem no serviço e os guards de admin e intranet leem o papel.

**Interpretação:** Pode ser um canal reativo entre remotes se a instância for única entre builds, ou apenas estado local repetido em cada aplicação. O snapshot não demonstra esse compartilhamento.

### 46. ./; package.json:1-69; nx.json:1-94

**Observação:** A raiz tem manifesto privado do workspace, scripts vazio e configuração Nx; não possui entrada nem build próprios de UI.

**Interpretação:** É coordenação do monorepo, sem outra unidade frontend.

### 47. admin/; admin/project.json:2-4; admin/src/main.ts:1-5; admin/src/bootstrap.ts:1-5; admin/project.json:9-24; admin/project.json:72-79

**Observação:** O diretório `admin` é um projeto Nx `application`, tem main e bootstrap próprios, e target Native Federation sobre esbuild com saída `dist/admin`.

**Interpretação:** É um limite de aplicação frontend com entrada e build próprios.

### 48. admin-e2e/; admin-e2e/package.json:1-8; admin-e2e/project.json:2-8; admin-e2e/playwright.config.mts:1-3

**Observação:** `admin-e2e` é projeto de testes Playwright com dependência implícita de `admin`, manifesto privado e targets explícitos vazios, sem entrada ou build de UI.

**Interpretação:** É infraestrutura de testes de uma aplicação, sem constituir outra unidade frontend.

### 49. intranet/; intranet/project.json:2-4; intranet/src/main.ts:1-5; intranet/src/bootstrap.ts:1-5; intranet/project.json:9-24; intranet/project.json:72-79

**Observação:** O diretório `intranet` é um projeto Nx `application`, tem main e bootstrap próprios, e target Native Federation sobre esbuild com saída `dist/intranet`.

**Interpretação:** É um limite de aplicação frontend com entrada e build próprios.

### 50. intranet-e2e/; intranet-e2e/package.json:1-8; intranet-e2e/project.json:2-8; intranet-e2e/playwright.config.mts:1-3

**Observação:** `intranet-e2e` é projeto de testes Playwright com dependência implícita de `intranet`, manifesto privado e targets explícitos vazios, sem entrada ou build de UI.

**Interpretação:** É infraestrutura de testes de uma aplicação, sem constituir outra unidade frontend.

### 51. libs/shared/data-access/; libs/shared/data-access/project.json:1-13

**Observação:** `libs/shared/data-access` integra as bibliotecas compartilhadas do workspace, sem entrada nem target de build de aplicação.

**Interpretação:** Reúne código compartilhado; não estabelece uma aplicação frontend autônoma.

### 52. libs/shared/guards/; libs/shared/guards/project.json:1-13

**Observação:** `libs/shared/guards` integra as bibliotecas compartilhadas do workspace, sem entrada nem target de build de aplicação.

**Interpretação:** Reúne código compartilhado; não estabelece uma aplicação frontend autônoma.

### 53. libs/shared/theme/; libs/shared/theme/project.json:1-13

**Observação:** `libs/shared/theme` integra as bibliotecas compartilhadas do workspace, sem entrada nem target de build de aplicação.

**Interpretação:** Reúne código compartilhado; não estabelece uma aplicação frontend autônoma.

### 54. libs/shared/types/; libs/shared/types/project.json:1-4; libs/shared/types/package.json:1-17

**Observação:** `libs/shared/types` integra as bibliotecas compartilhadas do workspace, sem entrada nem target de build de aplicação.

**Interpretação:** Reúne código compartilhado; não estabelece uma aplicação frontend autônoma.

### 55. libs/shared/ui/; libs/shared/ui/project.json:1-13

**Observação:** `libs/shared/ui` integra as bibliotecas compartilhadas do workspace, sem entrada nem target de build de aplicação.

**Interpretação:** Reúne código compartilhado; não estabelece uma aplicação frontend autônoma.

### 56. marAberto/; marAberto/project.json:2-4; marAberto/src/main.ts:1-5; marAberto/src/bootstrap.ts:1-5; marAberto/project.json:9-24; marAberto/project.json:72-79

**Observação:** O diretório `marAberto` é um projeto Nx `application`, tem main e bootstrap próprios, e target Native Federation sobre esbuild com saída `dist/marAberto`.

**Interpretação:** É um limite de aplicação frontend com entrada e build próprios.

### 57. marAberto-e2e/; marAberto-e2e/package.json:1-8; marAberto-e2e/project.json:2-8; marAberto-e2e/playwright.config.mts:1-3

**Observação:** `marAberto-e2e` é projeto de testes Playwright com dependência implícita de `marAberto`, manifesto privado e targets explícitos vazios, sem entrada ou build de UI.

**Interpretação:** É infraestrutura de testes de uma aplicação, sem constituir outra unidade frontend.

### 58. shell/; shell/project.json:2-4; shell/src/main.ts:1-5; shell/src/bootstrap.ts:1-5; shell/project.json:9-24; shell/project.json:63-70

**Observação:** O diretório `shell` é um projeto Nx `application`, tem main e bootstrap próprios, e target Native Federation sobre esbuild com saída `dist/shell`.

**Interpretação:** É um limite de aplicação frontend com entrada e build próprios.

### 59. shell-e2e/; shell-e2e/package.json:1-8; shell-e2e/project.json:2-8; shell-e2e/playwright.config.mts:1-3

**Observação:** `shell-e2e` é projeto de testes Playwright com dependência implícita de `shell`, manifesto privado e targets explícitos vazios, sem entrada ou build de UI.

**Interpretação:** É infraestrutura de testes de uma aplicação, sem constituir outra unidade frontend.

### 60. shell/src/app/app.routes.ts:18; shell/src/main.ts:3; shell/public/federation.manifest.json:2; admin/federation.config.mjs:4-10

**Observação:** O shell solicita o módulo `./Routes` de `admin` em sua tabela de rotas; o manifesto resolve `admin` para o remoteEntry local e a configuração de `admin` expõe `./Routes`.

**Interpretação:** É a relação ativa host → remote entre shell e admin registrada na 3.4.5.

### 61. shell/src/app/app.routes.ts:13; shell/src/main.ts:3; shell/public/federation.manifest.json:3; intranet/federation.config.mjs:4-10

**Observação:** O shell solicita o módulo `./Routes` de `intranet` em sua tabela de rotas; o manifesto resolve `intranet` para o remoteEntry local e a configuração de `intranet` expõe `./Routes`.

**Interpretação:** É a relação ativa host → remote entre shell e intranet registrada na 3.4.5.

### 62. shell/src/app/app.routes.ts:8; shell/src/main.ts:3; shell/public/federation.manifest.json:4; marAberto/federation.config.mjs:4-10

**Observação:** O shell solicita o módulo `./Routes` de `marAberto` em sua tabela de rotas; o manifesto resolve `marAberto` para o remoteEntry local e a configuração de `marAberto` expõe `./Routes`.

**Interpretação:** É a relação ativa host → remote entre shell e marAberto registrada na 3.4.5.

### 63. libs/shared/data-access/src/lib/auth.service.ts:6-27; marAberto/src/app/login/login.ts:19; admin/src/app/login/login.ts:19; libs/shared/guards/src/lib/role.guard.ts:14-17; admin/src/app/remote-entry/entry.routes.ts:12; shell/federation.config.mjs:7-18; marAberto/federation.config.mjs:12-23; admin/federation.config.mjs:12-23

**Observação:** `marAberto` e `admin` importam o AuthService local; os logins alteram o usuário e os guards dos remotes restritos leem seu papel. A direção registrada é `origem → destino`, com mecanismo `events` e Ativa `Undetermined`.

**Interpretação:** Com instância única, há comunicação reativa entre as unidades; com instâncias por build, são estados locais independentes. A configuração não resolve essa alternativa.

### 64. libs/shared/data-access/src/lib/auth.service.ts:6-27; admin/src/app/login/login.ts:19; intranet/src/app/login/login.ts:19; libs/shared/guards/src/lib/role.guard.ts:14-17; admin/src/app/remote-entry/entry.routes.ts:12; intranet/src/app/remote-entry/entry.routes.ts:12; shell/federation.config.mjs:7-18; admin/federation.config.mjs:12-23; intranet/federation.config.mjs:12-23

**Observação:** `admin` e `intranet` importam o AuthService local; os logins alteram o usuário e os guards dos remotes restritos leem seu papel. A direção registrada é `bidirecional`, com mecanismo `events` e Ativa `Undetermined`.

**Interpretação:** Com instância única, há comunicação reativa entre as unidades; com instâncias por build, são estados locais independentes. A configuração não resolve essa alternativa.

### 65. libs/shared/data-access/src/lib/auth.service.ts:6-27; marAberto/src/app/login/login.ts:19; intranet/src/app/login/login.ts:19; libs/shared/guards/src/lib/role.guard.ts:14-17; intranet/src/app/remote-entry/entry.routes.ts:12; shell/federation.config.mjs:7-18; marAberto/federation.config.mjs:12-23; intranet/federation.config.mjs:12-23

**Observação:** `marAberto` e `intranet` importam o AuthService local; os logins alteram o usuário e os guards dos remotes restritos leem seu papel. A direção registrada é `origem → destino`, com mecanismo `events` e Ativa `Undetermined`.

**Interpretação:** Com instância única, há comunicação reativa entre as unidades; com instâncias por build, são estados locais independentes. A configuração não resolve essa alternativa.

### 66. admin/project.json:9-24; admin/project.json:72-79; admin/project.json:126-133; .github/workflows/ci.yml:25-39

**Observação:** O target build de `admin` usa Native Federation sobre esbuild, gera `dist/admin` e é executado pelo CI com os demais projetos. Há dev-server próprio. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Confirma separação de build da aplicação. O CI de construção e o serviço local não demonstram publicação nem versionamento independente.

### 67. intranet/project.json:9-24; intranet/project.json:72-79; intranet/project.json:126-133; .github/workflows/ci.yml:25-39

**Observação:** O target build de `intranet` usa Native Federation sobre esbuild, gera `dist/intranet` e é executado pelo CI com os demais projetos. Há dev-server próprio. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Confirma separação de build da aplicação. O CI de construção e o serviço local não demonstram publicação nem versionamento independente.

### 68. marAberto/project.json:9-24; marAberto/project.json:72-79; marAberto/project.json:126-133; .github/workflows/ci.yml:25-39

**Observação:** O target build de `marAberto` usa Native Federation sobre esbuild, gera `dist/marAberto` e é executado pelo CI com os demais projetos. Há dev-server próprio. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Confirma separação de build da aplicação. O CI de construção e o serviço local não demonstram publicação nem versionamento independente.

### 69. shell/project.json:9-24; shell/project.json:63-79; shell/project.json:117-124; .github/workflows/ci.yml:25-39

**Observação:** O target build de `shell` usa Native Federation sobre esbuild, gera `dist/shell` e é executado pelo CI com os demais projetos. Há dev-server próprio. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Confirma separação de build da aplicação. O CI de construção e o serviço local não demonstram publicação nem versionamento independente.

### 70. README.md:3

**Observação:** O README afirma: "construído como microfrontends com **Angular 22** + **Nx**, usando **Module Federation nativo** (`@angular-architects/native-federation`)".

**Interpretação:** Situa o sistema como conjunto de microfrontends e nomeia Native Federation; a afirmação foi corroborada pela cadeia de configuração e composição.

### 71. README.md:5

**Observação:** O README afirma: "dividido em 3 ambientes independentes [...] mas todos reaproveitando os mesmos componentes de UI".

**Interpretação:** Descreve limites próprios dos três remotes e reaproveitamento de UI; a revisão registra corroboração das entradas, builds e imports comuns.

### 72. README.md:13

**Observação:** O README afirma: "Um app **shell** (host, porta 4200) orquestra a navegação entre eles, descobrindo cada remote em runtime via um manifesto de federação — nenhum dos apps precisa saber dos outros em build-time".

**Interpretação:** Descreve a organização host/remotes e descoberta em runtime; manifesto e rotas corroboram essa organização.

### 73. README.md:19

**Observação:** O README afirma: "shell/ # host — navbar, home, rotas, guards".

**Interpretação:** A revisão registra contradita: o shell possui outlet e rotas, enquanto a home pública, os headers e os guards ficam nos remotes.

### 74. README.md:27

**Observação:** O README afirma: "roleGuard — protege rotas do shell por papel do usuário".

**Interpretação:** A revisão registra contradita: as rotas do shell não aplicam guards; admin e intranet protegem suas próprias homes expostas.

### 75. README.md:31

**Observação:** O README afirma: "Cada `shell`/`marAberto`/`intranet`/`admin` é um projeto Angular independente (`project.json` próprio)".

**Interpretação:** Descreve quatro limites de projetos Angular no workspace, corroborados pelos project.json e pelas entradas e builds próprios.

### 76. README.md:31

**Observação:** O README afirma: "ligado por Module Federation".

**Interpretação:** Nomeia Module Federation, enquanto o código importa Native Federation e os pacotes da outra tecnologia não estão configurados; a revisão registra contradita.

### 77. README.md:31

**Observação:** O README afirma: "As libs em `libs/shared/*` são os únicos pontos de acoplamento entre eles — importadas via path mapping [...] nunca por referência direta entre apps".

**Interpretação:** Descreve o compartilhamento de código por bibliotecas locais e a ausência de imports diretos entre aplicações, corroborados pelos aliases e imports citados. Não resolve o compartilhamento de instância entre builds.

### 78. README.md:46

**Observação:** O README afirma: "inclusive quando cada remote roda sozinho (fora do shell)".

**Interpretação:** Afirma execução standalone dos remotes, corroborada por inicialização, entrada e serviço de desenvolvimento próprios; não é comprovação por execução.

### 79. README.md:50

**Observação:** O README afirma: "Cada remote expõe suas rotas via `federation.config.mjs` (`exposes: { './Routes': '.../entry.routes.ts' }`)".

**Interpretação:** Descreve a exposição das rotas dos três remotes, corroborada pelos seus blocos exposes e pelas relações do shell.

### 80. README.md:51

**Observação:** O README afirma: "O shell não importa nada estaticamente: `shell/public/federation.manifest.json` mapeia nome do remote → URL do `remoteEntry.json`, e `shell/src/app/app.routes.ts` carrega cada um em runtime com `loadRemoteModule('marAberto', './Routes')`".

**Interpretação:** Descreve a carga em runtime dos remotes pelo host, corroborada pelo manifesto e pelas chamadas loadRemoteModule nas rotas.

### 81. README.md:52

**Observação:** O README afirma: "`shared: shareAll(...)` no `federation.config.mjs` garante que `@angular/core`, `rxjs` etc. sejam uma instância única compartilhada entre shell e remotes".

**Interpretação:** Descreve o compartilhamento de pacotes na federação, corroborado pela configuração singleton de shareAll. Não demonstra singleton do AuthService local.

### 82. README.md:66

**Observação:** O README afirma: "O shell e os 3 remotes são servidos **separadamente** — cada um roda seu próprio dev-server".

**Interpretação:** Descreve a separação dos servidores de desenvolvimento das quatro aplicações, corroborada pelos targets de serviço; não afirma deploy independente.

### 83. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/federation.config.mjs)

**Observação:** A primeira versão observável já declara @module-federation/enhanced e contém as configurações de Native Federation. Não há versão anterior registrada. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** Não permite distinguir preparação, remoção de outro mecanismo ou declaração excedente; o No do snapshot permanece claro.

### 84. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (admin/federation.config.mjs)

**Observação:** O manifesto com @nx/module-federation e as configurações dos quatro projetos foram adicionados no único commit. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** A origem da declaração sem uso é desconhecida; o No do snapshot não depende dessa explicação histórica.

### 85. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (nx.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/project.json)

**Observação:** @nx/webpack, defaults para @nx/angular:webpack-browser e os builds de Native Federation coexistem no commit raiz. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** Não há sequência que comprove migração de build; a declaração não configurada permanece um sinal isolado.

### 86. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (package-lock.json); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/src/main.ts)

**Observação:** Manifesto, lockfile e entradas das aplicações foram adicionados juntos; não há mudança anterior para esclarecer a participação do orchestrator. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** Continua plausível participação transitiva no mecanismo usado ou declaração excedente; a dúvida afeta o uso da tecnologia no snapshot.

### 87. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (libs/shared/data-access/src/lib/auth.service.ts); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/federation.config.mjs)

**Observação:** O commit adiciona serviço, logins, guards, aliases e configurações de federação em conjunto, sem estágio anterior de compartilhamento. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** Permanece aberta a alternativa entre canal reativo entre unidades e estado local separado por build; o histórico não resolve a organização da comunicação no snapshot.

### 88. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (README.md); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (README.md); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/src/app/app.html); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (shell/src/app/app.routes.ts)

**Observação:** README, outlet e rotas do shell foram adicionados no mesmo commit raiz, junto dos headers e homes dos remotes. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** A divergência documental já existe na primeira versão observável. Não há evidência de um estágio anterior com navbar e home no shell; o retrato atual é claro.

### 89. 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (README.md); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (README.md); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (admin/src/app/remote-entry/entry.routes.ts); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (intranet/src/app/remote-entry/entry.routes.ts); 3dd51466a7d9eece3bcb46e0663ad5ad614daf32 2026-07-29 (libs/shared/data-access/src/lib/auth.service.ts)

**Observação:** O README que coloca guards no shell e o código com guards e login nos remotes foram adicionados juntos. A 3.4.8 registra resultado inconclusivo.

**Interpretação:** O histórico não demonstra transferência dos guards nem uma versão anterior ao login. A divergência do snapshot permanece documental, sem dúvida sobre onde os guards estão.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:58) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #15; declara #16; declara #17; declara #18; declara #19; declara #20; declara #21; declara #22; declara #23; declara #24; declara #25; declara #26; declara #38; declara #39; declara #40; declara #41; declara #42; declara #43 |
| 2 | 3.4.2 (package.json:65) | 1 tecnologia | manifesto | — | contexto | fraca | declara shell/project.json:119; declara admin/project.json:128; declara intranet/project.json:128; declara marAberto/project.json:128 |
| 3 | 3.4.2 (package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | — |
| 4 | 3.4.2 (package.json:19) | 1 tecnologia | manifesto | — | contexto | fraca | declara shell-e2e/playwright.config.mts:3; declara shell-e2e/playwright.config.mts:37 |
| 5 | 3.4.2 (package.json:20) | 1 tecnologia | manifesto | — | contexto | fraca | declara nx.json:35-40; declara shell/project.json:42-44 |
| 6 | 3.4.2 (package.json:21) | 1 tecnologia | manifesto | — | contexto | fraca | declara eslint.config.mjs:1; declara shell/eslint.config.mjs:1 |
| 7 | 3.4.2 (package.json:22) | 1 tecnologia | manifesto | — | contexto | fraca | declara nx.json:15-28 |
| 8 | 3.4.2 (package.json:23) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 9 | 3.4.2 (package.json:24) | 1 tecnologia | manifesto | — | contexto | fraca | declara nx.json:29-34; declara shell-e2e/playwright.config.mts:2-25 |
| 10 | 3.4.2 (package.json:25) | 1 tecnologia | manifesto | — | contexto | fraca | declara shell/project.json:45-53; declara nx.json:60-63 |
| 11 | 3.4.2 (package.json:26) | 1 tecnologia | manifesto | — | contexto | fraca | declara shell/project.json:54-62 |
| 12 | 3.4.2 (package.json:27) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 13 | 3.4.2 (package.json:31) | 1 tecnologia | manifesto | native-federation | tecnológica | ambígua | — |
| 14 | 3.4.2 (package.json:44) | 1 tecnologia | manifesto | — | contexto | fraca | declara .github/workflows/ci.yml:25-37 |
| 15 | 3.4.2 (package.json:58, Evidência); 3.4.2 (package.json:18, Evidência); 3.4.3 (admin, Marcadores); 3.4.4 (admin/src/main.ts:3, Observação); 3.4.4 (shell/src/app/app.routes.ts:18, Observação); 3.4.5 #1 (Configuração); 3.4.5 #4, #5 (Configuração); 3.4.7 #10, #12 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #47 |
| 16 | 3.4.2 (package.json:58, Evidência); 3.4.3 (admin, Marcadores e Build); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #66 |
| 17 | 3.4.2 (package.json:58, Evidência); 3.4.2 (package.json:18, Evidência); 3.4.3 (intranet, Marcadores); 3.4.4 (intranet/src/main.ts:3, Observação); 3.4.4 (shell/src/app/app.routes.ts:13, Observação); 3.4.5 #2 (Configuração); 3.4.5 #5, #6 (Configuração); 3.4.7 #10, #12 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #49 |
| 18 | 3.4.2 (package.json:58, Evidência); 3.4.3 (intranet, Marcadores e Build); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #67 |
| 19 | 3.4.2 (package.json:58, Evidência); 3.4.2 (package.json:18, Evidência); 3.4.3 (marAberto, Marcadores); 3.4.4 (marAberto/src/main.ts:3, Observação); 3.4.4 (shell/src/app/app.routes.ts:8, Observação); 3.4.5 #3 (Configuração); 3.4.5 #4, #6 (Configuração); 3.4.7 #10, #12 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #56 |
| 20 | 3.4.2 (package.json:58, Evidência); 3.4.3 (marAberto, Marcadores e Build); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #68 |
| 21 | 3.4.2 (package.json:58, Evidência); 3.4.2 (package.json:18, Evidência); 3.4.2 (package.json:23, Evidência); 3.4.3 (shell, Marcadores); 3.4.5 #4, #5, #6 (Configuração); 3.4.7 #3, #12 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #58 |
| 22 | 3.4.2 (package.json:58, Evidência); 3.4.2 (package.json:27, Evidência); 3.4.3 (shell, Marcadores e Build); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #69 |
| 23 | 3.4.2 (package.json:65, Evidência); 3.4.3 (shell, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #58 |
| 24 | 3.4.3 (admin, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #47 |
| 25 | 3.4.3 (intranet, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #49 |
| 26 | 3.4.3 (marAberto, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #56 |
| 27 | 3.4.4 (shell/src/app/app.routes.ts:8, :13, :18 e shell/src/main.ts:3, Observação); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #1, #2, #3 (Onde é servida); 3.4.7 #3, #11 (Evidência) | 2 configuração | configuração | native-federation | arquitetural | forte | configura #60; configura #61; configura #62 |
| 28 | 3.4.4 (admin/src/main.ts:5, src-async-bootstrap) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 29 | 3.4.4 (intranet/src/main.ts:5, src-async-bootstrap) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 30 | 3.4.4 (marAberto/src/main.ts:5, src-async-bootstrap) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 31 | 3.4.4 (shell/src/main.ts:5, src-async-bootstrap) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 32 | 3.4.4 (admin/src/main.ts:1, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 33 | 3.4.4 (admin/src/main.ts:3, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 34 | 3.4.4 (intranet/src/main.ts:1, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 35 | 3.4.4 (intranet/src/main.ts:3, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 36 | 3.4.4 (marAberto/src/main.ts:1, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 37 | 3.4.4 (marAberto/src/main.ts:3, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 38 | 3.4.4 (shell/src/app/app.routes.ts:2, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #60; implementa #61; implementa #62 |
| 39 | 3.4.4 (shell/src/app/app.routes.ts:8, src-load-remote) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #62 |
| 40 | 3.4.4 (shell/src/app/app.routes.ts:13, src-load-remote) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #61 |
| 41 | 3.4.4 (shell/src/app/app.routes.ts:18, src-load-remote) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #60 |
| 42 | 3.4.4 (shell/src/main.ts:1, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #60; implementa #61; implementa #62 |
| 43 | 3.4.4 (shell/src/main.ts:3, src-load-remote) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #60; implementa #61; implementa #62 |
| 44 | 3.4.4 (shell/src/app/app.routes.ts:4, manual) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #60; implementa #61; implementa #62 |
| 45 | 3.4.4 (libs/shared/data-access/src/lib/auth.service.ts:8, manual) | 3 código | código-fonte | events | arquitetural | ambígua | implementa #63; implementa #64; implementa #65 |
| 46 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 47 | 3.4.3 (admin) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 48 | 3.4.3 (admin-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 49 | 3.4.3 (intranet) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 50 | 3.4.3 (intranet-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 51 | 3.4.3 (libs/shared/data-access) | 4 estrutura | diretório | — | contexto | fraca | — |
| 52 | 3.4.3 (libs/shared/guards) | 4 estrutura | diretório | — | contexto | fraca | — |
| 53 | 3.4.3 (libs/shared/theme) | 4 estrutura | diretório | — | contexto | fraca | — |
| 54 | 3.4.3 (libs/shared/types) | 4 estrutura | diretório | — | contexto | fraca | — |
| 55 | 3.4.3 (libs/shared/ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 56 | 3.4.3 (marAberto) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 57 | 3.4.3 (marAberto-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 58 | 3.4.3 (shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 59 | 3.4.3 (shell-e2e) | 4 estrutura | diretório | — | contexto | fraca | — |
| 60 | 3.4.5 #1 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #58; liga #47 |
| 61 | 3.4.5 #2 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #58; liga #49 |
| 62 | 3.4.5 #3 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #58; liga #56 |
| 63 | 3.4.5 #4 | 5 composição | código-fonte | events | arquitetural | ambígua | liga #56; liga #47 |
| 64 | 3.4.5 #5 | 5 composição | código-fonte | events | arquitetural | ambígua | liga #47; liga #49 |
| 65 | 3.4.5 #6 | 5 composição | código-fonte | events | arquitetural | ambígua | liga #56; liga #49 |
| 66 | 3.4.6 #1 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #47 |
| 67 | 3.4.6 #2 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #49 |
| 68 | 3.4.6 #3 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #56 |
| 69 | 3.4.6 #4 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #58 |
| 70 | 3.4.7 #1 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #1; corrobora #60; corrobora #61; corrobora #62 |
| 71 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #47; corrobora #49; corrobora #56; corrobora admin/src/app/home/home.ts:7; corrobora intranet/src/app/home/home.ts:8; corrobora marAberto/src/app/home/home.ts:8 |
| 72 | 3.4.7 #3 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #27; corrobora #60; corrobora #61; corrobora #62 |
| 73 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | contradiz shell/src/app/app.html:1; contradiz #44; contradiz marAberto/src/app/remote-entry/entry.routes.ts:9-12; contradiz admin/src/app/remote-entry/entry.routes.ts:12; contradiz intranet/src/app/remote-entry/entry.routes.ts:12 |
| 74 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #44; contradiz admin/src/app/remote-entry/entry.routes.ts:12; contradiz intranet/src/app/remote-entry/entry.routes.ts:12 |
| 75 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #58; corrobora #47; corrobora #49; corrobora #56 |
| 76 | 3.4.7 #7 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #1; contradiz #3; contradiz #8; contradiz #38 |
| 77 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora tsconfig.base.json:22-30; corrobora admin/src/app/home/home.ts:7-8; corrobora intranet/src/app/home/home.ts:8-10; corrobora marAberto/src/app/home/home.ts:8-9; corrobora shell/src/styles.scss:1 |
| 78 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #47; corrobora #49; corrobora #56; corrobora #66; corrobora #67; corrobora #68 |
| 79 | 3.4.7 #10 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #15; corrobora #17; corrobora #19 |
| 80 | 3.4.7 #11 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #27; corrobora #39; corrobora #40; corrobora #41 |
| 81 | 3.4.7 #12 | 7 documentação | documentação | native-federation | tecnológica | fraca | corrobora #21; corrobora #15; corrobora #17; corrobora #19 |
| 82 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #66; corrobora #67; corrobora #68; corrobora #69 |
| 83 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #3 |
| 84 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #8 |
| 85 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #12 |
| 86 | 3.4.8 #4 | 8 histórico | histórico | native-federation | tecnológica | ambígua | explica #13 |
| 87 | 3.4.8 #5 | 8 histórico | histórico | events | arquitetural | ambígua | explica #45; explica #63; explica #64; explica #65 |
| 88 | 3.4.8 #6 | 8 histórico | histórico | — | arquitetural | fraca | explica #73 |
| 89 | 3.4.8 #7 | 8 histórico | histórico | — | arquitetural | fraca | explica #73; explica #74 |

## Resumo

Observações: 89. Dimensões (tecnologia: 14, configuração: 13, código: 18, estrutura: 14, composição: 6, build-deploy: 4, documentação: 13, histórico: 7). Força (forte: 8, moderada: 23, fraca: 51, ambígua: 7). Evidência (tecnológica: 31, arquitetural: 35, contexto: 23).

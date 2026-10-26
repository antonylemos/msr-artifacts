---
schema: 1
id: 994642993
full_name: ayushpandey241626/microfrontend-demo
commit: ec39a278ec6951feeb8d7ff7688cb4f056be589b
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

# 229 — ayushpandey241626/microfrontend-demo

## Leitura do repositório

É um workspace Angular com um só `package.json` na raiz e quatro projetos em `projects/`: o shell `host-app` e os remotes `mfe1`, `mfe2` e `login-mfe-app` (#17 a #20). A raiz só coordena o workspace (#16). A cadeia de Module Federation está completa:
- **Dependência:** `@angular-architects/module-federation` (#1), declarada uma vez para todos os projetos.
- **Configuração:** cada remote se declara com `withModuleFederationPlugin` e expõe um único módulo de rotas (#3 a #5). O host usa o `ModuleFederationPlugin` do webpack e declara os três remotes em `localhost` (#2).
- **Código:** o host importa `loadRemoteModule` (#10) e, na tabela de rotas (#14), carrega cada módulo exposto pela URL do `remoteEntry.js` de cada remote (#11 a #13).
- **Relações:** isso resulta em três relações host → remote ativas (#21 a #23).

Além da federação, o login liga as unidades pela chave `isLoggedIn` do `localStorage`: o formulário do login-mfe-app grava a chave (#15), e o `AuthGuard` do host a lê para liberar `contacts` e `admin` (#24). Não é um mecanismo de MFE declarado; só funciona porque, dentro do host, as unidades rodam na mesma origem.

Os quatro builds são separados, com saída própria em `dist/` (#25 a #28), mas não há artefato de deploy, e todas as URLs dos remotes estão fixas em `localhost`.

Sinais que enganam: o `import('./bootstrap')` de cada projeto é interno à unidade (#6 a #9). O mapa estático de `remotes` do host (#2) não é o que carrega os remotes: o código usa só a URL nas rotas. Por isso a chave `loginMfeApp`, diferente do `name` `login-mfe-app` (#3), não quebra a cadeia.

O repositório não documenta a arquitetura: o README é o padrão do Angular CLI e não tem afirmações. O histórico não tem pontos.

## Observações

### 1. package.json:31

**Observação:** `@angular-architects/module-federation` (`^19.0.3`) está declarada em `devDependencies` do manifesto único do workspace.

**Interpretação:** A tecnologia de federação está presente no build dos quatro projetos. A configuração e o código a usam.

### 2. projects/host-app/webpack.config.js:1-36

**Observação:** Configuração extra do webpack, com `uniqueName: "hostApp"` e `publicPath: "auto"`. `ModuleFederationPlugin` do webpack (:6, :20) com `remotes` `mfe1: "mfe1@http://localhost:4201/remoteEntry.js"`, `mfe2: "mfe2@http://localhost:4202/remoteEntry.js"` e `loginMfeApp: "loginMfeApp@http://localhost:4203/remoteEntry.js"` (:21-25), e `shared` com `shareAll` em singleton e `strictVersion` (:26-32). `SharedMappings` registra o `tsconfig.app.json` do projeto (:8-9, :34).

**Interpretação:** A configuração do host declara as três unidades locais como remotes e onde encontrá-las em desenvolvimento. O código não carrega os remotes por esses nomes, e sim pela URL do `remoteEntry.js` (#11 a #13).

**Nota:** O `angular.json`, citado nas mesmas tabelas, só aponta o builder genérico `ngx-build-plus:browser` para os `webpack.config.js` (`extraWebpackConfig`), registra os projetos do workspace (dimensão 4) e fixa as portas de desenvolvimento, que a 3.4.5 marcou como "só corrobora". Os `webpack.prod.config.js` só reexportam o `webpack.config.js` do projeto, e o script `run:all` (package.json:10) só roda o servidor de desenvolvimento do pacote, sem contar como evidência na 3.4.2. Nenhum deles declara elemento da composição, e por isso não viraram observação.

### 3. projects/login-mfe-app/webpack.config.js:1-21

**Observação:** `withModuleFederationPlugin` declara `name: "login-mfe-app"`, `exposes: { "./LoginModule": "./projects/login-mfe-app/src/app/login/login-form.routes.ts" }` e `shared` com `shareAll` em singleton e `strictVersion`.

**Interpretação:** A unidade está configurada como remote e oferece suas rotas de login a um host.

### 4. projects/mfe1/webpack.config.js:1-21

**Observação:** `withModuleFederationPlugin` declara `name: "mfe1"`, `exposes: { "./ContactsModule": "./projects/mfe1/src/app/contact-list/contact-list.routes.ts" }` e `shared` com `shareAll` em singleton e `strictVersion`.

**Interpretação:** A unidade está configurada como remote e oferece suas rotas de lista de contatos a um host.

### 5. projects/mfe2/webpack.config.js:1-21

**Observação:** `withModuleFederationPlugin` declara `name: "mfe2"`, `exposes: { "./AdminModule": "./projects/mfe2/src/app/contact-admin/contact-admin.routes.ts" }` e `shared` com `shareAll` em singleton e `strictVersion`.

**Interpretação:** A unidade está configurada como remote e oferece suas rotas de administração de contatos a um host.

### 6. projects/host-app/src/main.ts:1

**Observação:** `import('./bootstrap').catch((err) => console.error(err));`.

**Interpretação:** É um bootstrap assíncrono interno ao host.

### 7. projects/login-mfe-app/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 8. projects/mfe1/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 9. projects/mfe2/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 10. projects/host-app/src/app/app.routes.ts:3

**Observação:** Importa `loadRemoteModule` de `@angular-architects/module-federation`, usado em :17, :27 e :36.

**Interpretação:** O mecanismo de carga remota está disponível nas rotas do host.

### 11. projects/host-app/src/app/app.routes.ts:17; projects/mfe1/webpack.config.js:10-11

**Observação:** Na rota `contacts`, protegida por `AuthGuard` (:15), `loadChildren` chama `loadRemoteModule({ type: 'module', exposedModule: './ContactsModule', remoteEntry: 'http://localhost:4201/remoteEntry.js' })` e usa `m.default` (:16-21).

**Interpretação:** O host carrega em runtime as rotas expostas pelo mfe1, pela URL do `remoteEntry.js` dele, e as liga ao caminho `contacts`.

### 12. projects/host-app/src/app/app.routes.ts:27; projects/mfe2/webpack.config.js:10-11

**Observação:** Na rota `admin`, protegida por `AuthGuard` (:25), `loadChildren` chama `loadRemoteModule({ type: 'module', exposedModule: './AdminModule', remoteEntry: 'http://localhost:4202/remoteEntry.js' })` e usa `m.default` (:26-31).

**Interpretação:** O host carrega em runtime as rotas expostas pelo mfe2, pela URL do `remoteEntry.js` dele, e as liga ao caminho `admin`.

### 13. projects/host-app/src/app/app.routes.ts:36; projects/login-mfe-app/webpack.config.js:10-11

**Observação:** Na rota `login`, `loadChildren` chama `loadRemoteModule({ type: 'module', exposedModule: './LoginModule', remoteEntry: 'http://localhost:4203/remoteEntry.js' })` e usa `m.default` (:35-40).

**Interpretação:** O host carrega em runtime as rotas expostas pelo login-mfe-app, pela URL do `remoteEntry.js` dele, e as liga ao caminho `login`.

### 14. projects/host-app/src/app/app.routes.ts:7-46; projects/host-app/src/app/app.config.ts:12

**Observação:** A tabela `routes` redireciona a rota vazia para `login` (:8-12), liga `contacts`, `admin` e `login` aos três `loadRemoteModule` (:13-41) e manda o resto para `NotFoundComponent` (:42-45). É registrada por `provideRouter(routes)`.

**Interpretação:** A tabela de rotas do host liga o caminho de cada unidade remota ao seu carregador.

### 15. projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63

**Observação:** `localStorage.setItem('isLoggedIn', 'true');` no envio do formulário válido, seguido de `this.router.navigate(['/contacts'])` (:64).

**Interpretação:** O login publica o estado da sessão numa chave do `localStorage`, um canal de estado compartilhado. A linha não nomeia a unidade que lê a chave.

### 16. .; package.json:1-45; angular.json:5

**Observação:** É a raiz do workspace Angular, com o manifesto único e o `angular.json` que declara os quatro projetos. Não tem entrada nem UI própria; os targets pertencem aos projetos.

**Interpretação:** É a raiz de coordenação, não uma unidade frontend.

### 17. projects/host-app; angular.json:6, 13-14, 34-35; projects/host-app/src/main.ts:1; projects/host-app/src/bootstrap.ts:5

**Observação:** É um projeto Angular do workspace com entrada (`main.ts` → `bootstrap.ts`), target `build` com `ngx-build-plus:browser` e configuração webpack próprios.

**Interpretação:** É uma unidade frontend com limite próprio, no papel de host.

### 18. projects/login-mfe-app; angular.json:309, 320-321, 341-342; projects/login-mfe-app/src/main.ts:1; projects/login-mfe-app/src/bootstrap.ts:5

**Observação:** É um projeto Angular do workspace com entrada (`main.ts` → `bootstrap.ts`), target `build` com `ngx-build-plus:browser` e configuração webpack próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 19. projects/mfe1; angular.json:107, 114-115, 135-136; projects/mfe1/src/main.ts:1; projects/mfe1/src/bootstrap.ts:5

**Observação:** É um projeto Angular do workspace com entrada (`main.ts` → `bootstrap.ts`), target `build` com `ngx-build-plus:browser` e configuração webpack próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 20. projects/mfe2; angular.json:208, 215-216, 236-237; projects/mfe2/src/main.ts:1; projects/mfe2/src/bootstrap.ts:5

**Observação:** É um projeto Angular do workspace com entrada (`main.ts` → `bootstrap.ts`), target `build` com `ngx-build-plus:browser` e configuração webpack próprios.

**Interpretação:** É uma unidade frontend com limite próprio.

### 21. projects/host-app/src/app/app.routes.ts:3, 7, 36; projects/host-app/webpack.config.js:24; projects/login-mfe-app/webpack.config.js:7, 10-11

**Observação:** A rota `login` do host carrega `./LoginModule` de `http://localhost:4203/remoteEntry.js`, a única exposição do login-mfe-app, que aponta para as rotas do formulário de login. O remote estático do host usa a chave `loginMfeApp`, diferente do `name: "login-mfe-app"`; a carga é pela URL.

**Interpretação:** É uma relação host → remote ativa.

### 22. projects/host-app/src/app/app.routes.ts:3, 7, 17; projects/host-app/webpack.config.js:22; projects/mfe1/webpack.config.js:7, 10-11

**Observação:** A rota `contacts` do host, protegida pelo `AuthGuard`, carrega `./ContactsModule` de `http://localhost:4201/remoteEntry.js`, a exposição do mfe1. O remote estático `mfe1@` do host bate com o `name` do mfe1.

**Interpretação:** É uma relação host → remote ativa.

### 23. projects/host-app/src/app/app.routes.ts:3, 7, 27; projects/host-app/webpack.config.js:23; projects/mfe2/webpack.config.js:7, 10-11

**Observação:** A rota `admin` do host, protegida pelo `AuthGuard`, carrega `./AdminModule` de `http://localhost:4202/remoteEntry.js`, a exposição do mfe2. O remote estático `mfe2@` do host bate com o `name` do mfe2.

**Interpretação:** É uma relação host → remote ativa.

### 24. projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63; projects/host-app/src/app/auth.guard.ts:11; projects/host-app/src/app/app.routes.ts:15, 25

**Observação:** O formulário do login-mfe-app grava `isLoggedIn = 'true'` no `localStorage`, e o `AuthGuard` do host lê a mesma chave para liberar as rotas `contacts` e `admin`. Só o login grava a chave e só o host a lê; nenhum código a apaga, nem o logout do host (projects/host-app/src/app/app.component.ts:71-74). Nenhuma configuração declara o canal.

**Interpretação:** É uma relação de comunicação ativa por estado compartilhado no `localStorage`, do login-mfe-app para o host. Só vale com o login dentro da página do host, na mesma origem; isolado na porta 4203, o login-mfe-app tem `localStorage` próprio.

### 25. angular.json:13-16, 35, 53, 76-77; projects/host-app/webpack.config.js:11-36; projects/host-app/webpack.prod.config.js:1

**Observação:** Target `build` próprio com `ngx-build-plus:browser` e saída `dist/host-app`; a configuração `production` usa o `webpack.prod.config.js`, que só reexporta o `webpack.config.js`. Os remotes são declarados e carregados em runtime, em `localhost`. Só é servido pelo `ng serve` na porta 4200. Não há artefato de deploy nem versão própria.

**Interpretação:** Há uma fronteira de build própria do host, sem deploy observado.

### 26. angular.json:320-323, 342, 383-384; projects/login-mfe-app/webpack.config.js:6-11

**Observação:** Target `build` próprio com `ngx-build-plus:browser` e saída `dist/login-mfe-app`, que gera o remote `login-mfe-app` com `./LoginModule`. Só é servido pelo servidor de desenvolvimento na porta 4203, a do `remoteEntry.js` que o host carrega. Não há artefato de deploy nem versão própria.

**Interpretação:** Há uma fronteira de build própria do remote, sem deploy observado.

### 27. angular.json:114-117, 136, 177-178; projects/mfe1/webpack.config.js:6-11

**Observação:** Target `build` próprio com `ngx-build-plus:browser` e saída `dist/mfe1`, que gera o remote `mfe1` com `./ContactsModule`. Só é servido pelo servidor de desenvolvimento na porta 4201, a do `remoteEntry.js` que o host carrega. Não há artefato de deploy nem versão própria.

**Interpretação:** Há uma fronteira de build própria do remote, sem deploy observado.

### 28. angular.json:215-218, 237, 278-279; projects/mfe2/webpack.config.js:6-11

**Observação:** Target `build` próprio com `ngx-build-plus:browser` e saída `dist/mfe2`, que gera o remote `mfe2` com `./AdminModule`. Só é servido pelo servidor de desenvolvimento na porta 4202, a do `remoteEntry.js` que o host carrega. Não há artefato de deploy nem versão própria.

**Interpretação:** Há uma fronteira de build própria do remote, sem deploy observado.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:31) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #2; declara #3; declara #4; declara #5; declara #10 |
| 2 | 3.4.2 (package.json:31, Evidência); 3.4.3 (projects/host-app, Marcadores); 3.4.5 #1, #2, #3 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #17; configura #21; configura #22; configura #23 |
| 3 | 3.4.2 (package.json:31, Evidência); 3.4.3 (projects/login-mfe-app, Marcadores); 3.4.4 (projects/host-app/src/app/app.routes.ts:36, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #21 |
| 4 | 3.4.2 (package.json:31, Evidência); 3.4.3 (projects/mfe1, Marcadores); 3.4.4 (projects/host-app/src/app/app.routes.ts:17, Observação); 3.4.5 #2 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #19; configura #22 |
| 5 | 3.4.2 (package.json:31, Evidência); 3.4.3 (projects/mfe2, Marcadores); 3.4.4 (projects/host-app/src/app/app.routes.ts:27, Observação); 3.4.5 #3 (Configuração); 3.4.6 #4 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #20; configura #23 |
| 6 | 3.4.4 (projects/host-app/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 7 | 3.4.4 (projects/login-mfe-app/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 8 | 3.4.4 (projects/mfe1/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 9 | 3.4.4 (projects/mfe2/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 10 | 3.4.4 (projects/host-app/src/app/app.routes.ts:3) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #21; implementa #22; implementa #23 |
| 11 | 3.4.4 (projects/host-app/src/app/app.routes.ts:17) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #22 |
| 12 | 3.4.4 (projects/host-app/src/app/app.routes.ts:27) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #23 |
| 13 | 3.4.4 (projects/host-app/src/app/app.routes.ts:36) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #21 |
| 14 | 3.4.4 (projects/host-app/src/app/app.routes.ts:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #21; implementa #22; implementa #23 |
| 15 | 3.4.4 (projects/login-mfe-app/src/app/login/login-form/login-form.component.ts:63) | 3 código | código-fonte | other | tecnológica | moderada | implementa #24 |
| 16 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 17 | 3.4.3 (projects/host-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (projects/login-mfe-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.3 (projects/mfe1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.3 (projects/mfe2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 21 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #18 |
| 22 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #19 |
| 23 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #20 |
| 24 | 3.4.5 #4 | 5 composição | código-fonte | other | arquitetural | forte | liga #18; liga #17 |
| 25 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #17 |
| 26 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #18 |
| 27 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #19 |
| 28 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #20 |

## Resumo

Observações: 28. Dimensões (tecnologia: 1, configuração: 4, código: 10, estrutura: 5, composição: 4, build-deploy: 4, documentação: 0, histórico: 0). Força (forte: 9, moderada: 13, fraca: 6, ambígua: 0). Evidência (tecnológica: 10, arquitetural: 17, contexto: 1).

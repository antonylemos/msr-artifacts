---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Leitura do repositório

Tutorial de micro frontends em Angular, com três projetos irmãos na raiz e sem workspace comum: o host `test-base` e os remotes `tea-tracker` e `sticky-notes`. A arquitetura se sustenta por uma cadeia completa de Native Federation:
- **Dependência:** `@angular-architects/native-federation`, declarada nos três pacotes (#1, #3, #5).
- **Configuração:**
  - os targets `build` e `serve` dos três `angular.json` usam o builder da federação (#7, #8, #10, #11, #13, #14);
  - nos `federation.config.js`, os remotes expõem `./App`, e as três aplicações compartilham dependências com `shareAll` (#9, #12, #15);
  - o manifesto do host dá os endereços dos dois remotes (#16).
- **Código:** o host inicializa a federação com o manifesto (#27, #28) e, nas suas rotas, carrega o `./App` de cada remote por nome (#24 a #26, #29).
- **Relações:** isso resulta nas duas relações ativas, test-base → sticky-notes e test-base → tea-tracker (#33, #34). Elas ligam três unidades com limites confirmados (#30 a #32).

Os três projetos têm build separado (#35 a #37), mas não há nenhum artefato de deploy: as URLs do manifesto são as dos servidores de desenvolvimento, e a composição só funciona com os três no ar. A separação de publicação não aparece neste repositório.

Dois sinais enganam se lidos sozinhos:
- **Dependência sem uso:** `@softarc/native-federation-node` está declarada nos três pacotes e não é usada (#2, #4, #6). O histórico mostra que o código nunca mudou desde o primeiro commit e que ela nunca foi usada no repositório (#54).
- **Inicializações que não compõem:** os remotes também chamam `initFederation` e fazem o bootstrap assíncrono (#17 a #23, exceto #19). São construções de federação que só servem à execução isolada da própria unidade.

Não há ambiguidade arquitetural. A documentação é um README-tutorial com 16 afirmações, todas fracas pelo critério do protocolo (#38 a #53): 15 corroboradas e 1 sem corroboração, a de micro frontends "independently deployable" (#39), que o snapshot não confirma nem desmente.

## Observações

### 1. sticky-notes/package.json:26

**Observação:** `@angular-architects/native-federation` (`^21.0.4`) está declarada em `dependencies` do pacote `sticky-notes`.

**Interpretação:** A tecnologia de federação está presente no sticky-notes. A configuração e o código da unidade a usam.

### 2. sticky-notes/package.json:34

**Observação:** `@softarc/native-federation-node` (`^3.3.4`) está declarada em `dependencies` do pacote `sticky-notes`. Não há import nem invocação dela nos arquivos de código e de build do snapshot.

**Interpretação:** Uma tecnologia de federação é declarada e não é usada. É um sinal enganoso.

### 3. tea-tracker/package.json:26

**Observação:** `@angular-architects/native-federation` (`^21.0.4`) está declarada em `dependencies` do pacote `tea-tracker`.

**Interpretação:** A tecnologia de federação está presente no tea-tracker. A configuração e o código da unidade a usam.

### 4. tea-tracker/package.json:34

**Observação:** `@softarc/native-federation-node` (`^3.3.4`) está declarada em `dependencies` do pacote `tea-tracker`. Não há import nem invocação dela nos arquivos de código e de build do snapshot.

**Interpretação:** Uma tecnologia de federação é declarada e não é usada. É um sinal enganoso.

### 5. test-base/package.json:26

**Observação:** `@angular-architects/native-federation` (`^21.0.4`) está declarada em `dependencies` do pacote `test-base`.

**Interpretação:** A tecnologia de federação está presente no host. A configuração e o código dele a usam.

### 6. test-base/package.json:34

**Observação:** `@softarc/native-federation-node` (`^3.3.4`) está declarada em `dependencies` do pacote `test-base`. Não há import nem invocação dela nos arquivos de código e de build do snapshot.

**Interpretação:** Uma tecnologia de federação é declarada e não é usada. É um sinal enganoso.

### 7. sticky-notes/angular.json:16-29

**Observação:** O target `build` do projeto `sticky-notes` usa o builder `@angular-architects/native-federation:build` sobre o target `esbuild`, com `production` por padrão.

**Interpretação:** O build do sticky-notes está configurado para Native Federation.

### 8. sticky-notes/angular.json:30-39

**Observação:** O target `serve` do projeto `sticky-notes` usa o builder `@angular-architects/native-federation:build` em modo `dev`, sobre o target `serve-original`.

**Interpretação:** O servidor de desenvolvimento do sticky-notes passa pela federação, o que permite rodá-lo sozinho.

### 9. sticky-notes/federation.config.js:1-31

**Observação:** `withNativeFederation` declara `name: 'sticky-notes'`, expõe `./App` (`./src/app/app.ts`) e configura `shared` com `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Declara também exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** O sticky-notes está configurado como remote, oferece seu componente raiz a um host e configura o compartilhamento de dependências, com as exclusões declaradas.

### 10. tea-tracker/angular.json:16-29

**Observação:** O target `build` do projeto `tea-tracker` usa o builder `@angular-architects/native-federation:build` sobre o target `esbuild`, com `production` por padrão.

**Interpretação:** O build do tea-tracker está configurado para Native Federation.

### 11. tea-tracker/angular.json:30-39

**Observação:** O target `serve` do projeto `tea-tracker` usa o builder `@angular-architects/native-federation:build` em modo `dev`, sobre o target `serve-original`.

**Interpretação:** O servidor de desenvolvimento do tea-tracker passa pela federação, o que permite rodá-lo sozinho.

### 12. tea-tracker/federation.config.js:1-31

**Observação:** `withNativeFederation` declara `name: 'tea-tracker'`, expõe `./App` (`./src/app/app.ts`) e configura `shared` com `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Declara também exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** O tea-tracker está configurado como remote, oferece seu componente raiz a um host e configura o compartilhamento de dependências, com as exclusões declaradas.

### 13. test-base/angular.json:16-29

**Observação:** O target `build` do projeto `test-base` usa o builder `@angular-architects/native-federation:build` sobre o target `esbuild`, com `production` por padrão.

**Interpretação:** O build do host está configurado para Native Federation.

### 14. test-base/angular.json:30-39

**Observação:** O target `serve` do projeto `test-base` usa o builder `@angular-architects/native-federation:build` em modo `dev`, sobre o target `serve-original`.

**Interpretação:** O servidor de desenvolvimento do host passa pela federação.

### 15. test-base/federation.config.js:1-27

**Observação:** `withNativeFederation` declara `name: 'test-base'`, sem expor módulos, e configura `shared` com `shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })`. Declara também exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** O host está configurado como participante da federação e configura o compartilhamento de dependências, com as exclusões declaradas.

### 16. test-base/public/federation.manifest.json:2-3

**Observação:** O manifesto do host mapeia `tea-tracker` para `http://localhost:4222/remoteEntry.json` e `sticky-notes` para `http://localhost:4333/remoteEntry.json`.

**Interpretação:** A configuração do host declara os dois remotes e onde encontrá-los. Os endereços são os dos servidores de desenvolvimento.

### 17. sticky-notes/src/main.ts:5

**Observação:** `import('./bootstrap')` depois de `initFederation()` (sticky-notes/src/main.ts:3-5).

**Interpretação:** É um bootstrap assíncrono interno à unidade, que não compõe outra.

### 18. tea-tracker/src/main.ts:5

**Observação:** `import('./bootstrap')` depois de `initFederation()` (tea-tracker/src/main.ts:3-5).

**Interpretação:** É um bootstrap assíncrono interno à unidade, que não compõe outra.

### 19. test-base/src/main.ts:5

**Observação:** `import('./bootstrap')` depois de `initFederation('federation.manifest.json')` (test-base/src/main.ts:3-5).

**Interpretação:** É um bootstrap assíncrono interno ao host. A composição está nas linhas #27 e #28.

### 20. sticky-notes/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara o runtime de federação da execução isolada da própria unidade.

### 21. sticky-notes/src/main.ts:3

**Observação:** `initFederation()`, sem manifesto nem remotes.

**Interpretação:** O runtime isolado não resolve nenhuma outra unidade. O sticky-notes só expõe `./App` (#9).

### 22. tea-tracker/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara o runtime de federação da execução isolada da própria unidade.

### 23. tea-tracker/src/main.ts:3

**Observação:** `initFederation()`, sem manifesto nem remotes.

**Interpretação:** O runtime isolado não resolve nenhuma outra unidade. O tea-tracker só expõe `./App` (#12).

### 24. test-base/src/app/app.routes.ts:3

**Observação:** Importa `loadRemoteModule` de `@angular-architects/native-federation`. As rotas `tea-tracker` e `sticky-notes` o usam (test-base/src/app/app.routes.ts:14, 18).

**Interpretação:** O mecanismo de carga remota está disponível nas rotas do host.

### 25. test-base/src/app/app.routes.ts:12-15

**Observação:** A rota `tea-tracker` tem `loadComponent: () => loadRemoteModule('tea-tracker', './App').then((m) => m.App)`.

**Interpretação:** O host carrega o componente raiz do tea-tracker em runtime, quando a rota é visitada.

### 26. test-base/src/app/app.routes.ts:16-19

**Observação:** A rota `sticky-notes` tem `loadComponent: () => loadRemoteModule('sticky-notes', './App').then((m) => m.App)`.

**Interpretação:** O host carrega o componente raiz do sticky-notes em runtime, quando a rota é visitada.

### 27. test-base/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** O runtime de federação do host está disponível.

### 28. test-base/src/main.ts:3-5

**Observação:** `initFederation('federation.manifest.json')` antes do bootstrap.

**Interpretação:** O host resolve as entradas dos remotes pelo manifesto antes de iniciar.

### 29. test-base/src/app/app.routes.ts:5-20; test-base/src/app/app.config.ts:9; test-base/src/app/app.html:12, 17, 26

**Observação:** As rotas do host declaram `home-page` e, sob o comentário "// The Micro Frontends", as rotas `tea-tracker` e `sticky-notes`. As rotas são registradas por `provideRouter(routes)`. O menu do host tem `routerLink` para as duas rotas, e o conteúdo aparece no `<router-outlet>`.

**Interpretação:** O roteamento do host declara a relação host → remotes e a liga à navegação da página.

### 30. sticky-notes; sticky-notes/package.json:1-48; sticky-notes/angular.json:46; sticky-notes/src/main.ts:3-5; sticky-notes/src/bootstrap.ts:5; sticky-notes/angular.json:16-29

**Observação:** É um projeto Angular com pacote próprio, entrada (`main.ts` → `bootstrap.ts`) e target de build próprios, servido em desenvolvimento na porta 4333.

**Interpretação:** É uma unidade frontend com limite próprio.

### 31. tea-tracker; tea-tracker/package.json:1-48; tea-tracker/angular.json:46; tea-tracker/src/main.ts:3-5; tea-tracker/src/bootstrap.ts:5; tea-tracker/angular.json:16-29

**Observação:** É um projeto Angular com pacote próprio, entrada (`main.ts` → `bootstrap.ts`) e target de build próprios, servido em desenvolvimento na porta 4222.

**Interpretação:** É uma unidade frontend com limite próprio.

### 32. test-base; test-base/package.json:1-48; test-base/angular.json:46; test-base/src/main.ts:3-5; test-base/src/bootstrap.ts:5; test-base/angular.json:16-29

**Observação:** É um projeto Angular com pacote próprio, entrada (`main.ts` → `bootstrap.ts`) e target de build próprios, servido em desenvolvimento na porta 4200.

**Interpretação:** É uma unidade frontend com limite próprio.

### 33. test-base/src/app/app.routes.ts:16-18; test-base/public/federation.manifest.json:3; sticky-notes/federation.config.js:4-8

**Observação:** O host carrega `./App` de `sticky-notes` na rota `sticky-notes`. O nome é resolvido pelo manifesto e corresponde ao nome e ao módulo exposto na configuração do sticky-notes.

**Interpretação:** É uma relação host → remote ativa.

### 34. test-base/src/app/app.routes.ts:12-14; test-base/public/federation.manifest.json:2; tea-tracker/federation.config.js:4-8

**Observação:** O host carrega `./App` de `tea-tracker` na rota `tea-tracker`. O nome é resolvido pelo manifesto e corresponde ao nome e ao módulo exposto na configuração do tea-tracker.

**Interpretação:** É uma relação host → remote ativa.

### 35. sticky-notes/angular.json:16-29; sticky-notes/angular.json:43-84; sticky-notes/package.json:7

**Observação:** O `ng build` do projeto gera um artefato só dele, com o builder da federação sobre `@angular/build:application`. Não há artefato de deploy; o único endereço é o do servidor de desenvolvimento na porta 4333. O pacote é `private`, na versão `0.0.0`.

**Interpretação:** O sticky-notes tem build separado. O deploy não é observável, e não há versionamento próprio.

### 36. tea-tracker/angular.json:16-29; tea-tracker/angular.json:43-84; tea-tracker/package.json:7

**Observação:** O `ng build` do projeto gera um artefato só dele, com o builder da federação sobre `@angular/build:application`. Não há artefato de deploy; o único endereço é o do servidor de desenvolvimento na porta 4222. O pacote é `private`, na versão `0.0.0`.

**Interpretação:** O tea-tracker tem build separado. O deploy não é observável, e não há versionamento próprio.

### 37. test-base/angular.json:16-29; test-base/angular.json:43-84; test-base/package.json:7

**Observação:** O `ng build` do host gera um artefato só dele, que copia `public/` com o manifesto de federação e não inclui o código dos remotes. Não há artefato de deploy; o manifesto aponta para `localhost`. O pacote é `private`, na versão `0.0.0`.

**Interpretação:** O host tem build separado e carrega os remotes em runtime. O deploy não é observável, e as URLs do manifesto só servem ao ambiente local.

### 38. README.md:35-38

**Observação:** "In our example project, we'll build: A **base app** serving as our digital desktop; A **tea tracker** micro frontend [...]; A **sticky notes** micro frontend".

**Interpretação:** Descreve um host e dois micro frontends. A afirmação é corroborada.

### 39. README.md:88

**Observação:** "a working digital desktop with two independently deployable micro frontends".

**Interpretação:** Afirma implantação independente das unidades. O snapshot não tem artefato de deploy, e a afirmação fica sem corroboração.

### 40. README.md:93

**Observação:** "the Tea Tracker micro frontend - a standalone Angular application".

**Interpretação:** Descreve o tea-tracker como aplicação independente. A afirmação é corroborada.

### 41. README.md:143-144

**Observação:** "Native Federation is the technology that enables micro frontends. It allows multiple Angular applications to share code and components at runtime."

**Interpretação:** Nomeia a tecnologia de composição do projeto. A afirmação é corroborada.

### 42. README.md:173

**Observação:** "Choose \"remote\" because this micro frontend will be loaded BY another application (the base app we'll create later)".

**Interpretação:** Atribui ao tea-tracker o papel de remote carregado pelo host. A afirmação é corroborada.

### 43. README.md:187

**Observação:** "Creates `federation.config.js` - defines what this app exposes to other apps".

**Interpretação:** Descreve a configuração da federação como o lugar dos módulos expostos. A afirmação é corroborada.

### 44. README.md:188

**Observação:** "Updates `angular.json` - adds federation build configuration".

**Interpretação:** Descreve o build configurado para a federação. A afirmação é corroborada.

### 45. README.md:276-277

**Observação:** "**`shared`**: Which dependencies are shared between apps / `singleton: true`: Only one instance of shared libraries".

**Interpretação:** Descreve o compartilhamento de dependências entre as aplicações. A afirmação é corroborada.

### 46. README.md:288

**Observação:** "the main application - our digital desktop - that will host all micro frontends".

**Interpretação:** Atribui ao app base o papel de host. A afirmação é corroborada.

### 47. README.md:329

**Observação:** "To add your micro frontends to this app we will use routing".

**Interpretação:** Descreve a composição por rotas do host. A afirmação é corroborada.

### 48. README.md:357

**Observação:** "Uses `loadRemoteModule()` to dynamically load the remote micro frontend".

**Interpretação:** Descreve a carga do remote em runtime pela rota do host. A afirmação é corroborada.

### 49. README.md:364

**Observação:** "The manifest file tells the base app where to find each micro frontend."

**Interpretação:** Descreve o manifesto como a resolução dos remotes pelo host. A afirmação é corroborada.

### 50. README.md:401-404

**Observação:** "**`initFederation()`**: Initializes the federation system / Loads the manifest file / Discovers available micro frontends".

**Interpretação:** Descreve a inicialização da federação no host com o manifesto. A afirmação é corroborada.

### 51. README.md:413

**Observação:** "You need BOTH applications running simultaneously. This is crucial for micro frontends to work."

**Interpretação:** Descreve a dependência de runtime do host em relação aos servidores dos remotes. A afirmação é corroborada.

### 52. README.md:440-441

**Observação:** "I can see my home page, from my base app and I can see the two separate micro frontends from the same application."

**Interpretação:** Descreve os dois remotes compostos no host. A afirmação é corroborada.

### 53. README.md:445-447

**Observação:** "When you clicked \"Tea Tracker\", it dynamically fetched the code from port 4222 / The micro frontend loaded seamlessly into the base app / All without a page refresh!"

**Interpretação:** Descreve a carga do tea-tracker em runtime, dentro do host. A afirmação é corroborada.

### 54. 6e2d0ab 2026-01-14 (sticky-notes/package.json, tea-tracker/package.json, test-base/package.json); 0a2cc14 2026-01-14 (README.md); 7050669 2026-01-14 (README.md)

**Observação:** Os três `package.json` só aparecem no primeiro commit, com os mesmos identificadores de objeto do snapshot. Os dois commits seguintes só alteram o `README.md`.

**Interpretação:** O código do snapshot é o do primeiro commit, e nele a dependência está só declarada: no histórico observável, ela nunca foi usada. O histórico não diz por que foi declarada.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (sticky-notes/package.json:26) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #7; declara #8; declara #9; declara #20 |
| 2 | 3.4.2 (sticky-notes/package.json:34) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 3 | 3.4.2 (tea-tracker/package.json:26) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #10; declara #11; declara #12; declara #22 |
| 4 | 3.4.2 (tea-tracker/package.json:34) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 5 | 3.4.2 (test-base/package.json:26) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #13; declara #14; declara #15; declara #24; declara #27 |
| 6 | 3.4.2 (test-base/package.json:34) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 7 | 3.4.2 (sticky-notes/package.json:26, Evidência); 3.4.3 (sticky-notes, Marcadores); 3.4.3 (sticky-notes, Build); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #30 |
| 8 | 3.4.2 (sticky-notes/package.json:26, Evidência); 3.4.3 (sticky-notes, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #30 |
| 9 | 3.4.2 (sticky-notes/package.json:26, Evidência); 3.4.3 (sticky-notes, Marcadores); 3.4.4 (sticky-notes/src/main.ts:3, Observação); 3.4.4 (test-base/src/app/app.routes.ts:18, Observação); 3.4.5 #1 (Configuração); 3.4.7 #4, #6, #8 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #30; configura #33 |
| 10 | 3.4.2 (tea-tracker/package.json:26, Evidência); 3.4.3 (tea-tracker, Marcadores); 3.4.3 (tea-tracker, Build); 3.4.6 #2 (Artefatos); 3.4.7 #7 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #31 |
| 11 | 3.4.2 (tea-tracker/package.json:26, Evidência); 3.4.3 (tea-tracker, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #31 |
| 12 | 3.4.2 (tea-tracker/package.json:26, Evidência); 3.4.3 (tea-tracker, Marcadores); 3.4.4 (tea-tracker/src/main.ts:3, Observação); 3.4.4 (test-base/src/app/app.routes.ts:14, Observação); 3.4.5 #2 (Configuração); 3.4.7 #4, #5, #6, #8 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #31; configura #34 |
| 13 | 3.4.2 (test-base/package.json:26, Evidência); 3.4.3 (test-base, Marcadores); 3.4.3 (test-base, Build); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #32 |
| 14 | 3.4.2 (test-base/package.json:26, Evidência); 3.4.3 (test-base, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #32 |
| 15 | 3.4.2 (test-base/package.json:26, Evidência); 3.4.3 (test-base, Marcadores); 3.4.7 #4, #8, #9 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #32 |
| 16 | 3.4.4 (test-base/src/main.ts:3, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1, #2 (Onde é servida); 3.4.7 #12, #14, #16 (Evidência) | 2 configuração | configuração | native-federation | arquitetural | forte | configura #28; configura #33; configura #34 |
| 17 | 3.4.4 (sticky-notes/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 18 | 3.4.4 (tea-tracker/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 19 | 3.4.4 (test-base/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 20 | 3.4.4 (sticky-notes/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 21 | 3.4.4 (sticky-notes/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 22 | 3.4.4 (tea-tracker/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 23 | 3.4.4 (tea-tracker/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 24 | 3.4.4 (test-base/src/app/app.routes.ts:3) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #33; implementa #34 |
| 25 | 3.4.4 (test-base/src/app/app.routes.ts:14) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #34 |
| 26 | 3.4.4 (test-base/src/app/app.routes.ts:18) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #33 |
| 27 | 3.4.4 (test-base/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #33; implementa #34 |
| 28 | 3.4.4 (test-base/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #33; implementa #34 |
| 29 | 3.4.4 (test-base/src/app/app.routes.ts:5) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #33; implementa #34 |
| 30 | 3.4.3 (sticky-notes) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 31 | 3.4.3 (tea-tracker) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 32 | 3.4.3 (test-base) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.5 #1 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #32; liga #30 |
| 34 | 3.4.5 #2 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #32; liga #31 |
| 35 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #30 |
| 36 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #31 |
| 37 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #32 |
| 38 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #30; corrobora #31; corrobora #32; corrobora #33; corrobora #34 |
| 39 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 40 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora #18; corrobora #23 |
| 41 | 3.4.7 #4 | 7 documentação | documentação | native-federation | tecnológica | fraca | corrobora #1; corrobora #3; corrobora #5; corrobora #33; corrobora #34; corrobora #9; corrobora #12; corrobora #15 |
| 42 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #34; corrobora #12; corrobora #25 |
| 43 | 3.4.7 #6 | 7 documentação | documentação | native-federation | tecnológica | fraca | corrobora #12; corrobora #9 |
| 44 | 3.4.7 #7 | 7 documentação | documentação | native-federation | tecnológica | fraca | corrobora #10; corrobora #36 |
| 45 | 3.4.7 #8 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #15; corrobora #12; corrobora #9; corrobora test-base/package.json:30; corrobora tea-tracker/package.json:30; corrobora sticky-notes/package.json:30 |
| 46 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #33; corrobora #34; corrobora #28; corrobora #15 |
| 47 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #29; corrobora #25; corrobora #26 |
| 48 | 3.4.7 #11 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #25; corrobora #34 |
| 49 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #28; corrobora #33; corrobora #34 |
| 50 | 3.4.7 #13 | 7 documentação | documentação | native-federation | tecnológica | fraca | corrobora #28; corrobora #27; corrobora test-base/angular.json:48-53 |
| 51 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #16; corrobora #33; corrobora #34 |
| 52 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #33; corrobora #34; corrobora #29 |
| 53 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #34; corrobora #16; corrobora #25; corrobora #29 |
| 54 | 3.4.8 #1 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #2; explica #4; explica #6 |

## Resumo

Observações: 54. Dimensões (tecnologia: 6, configuração: 10, código: 13, estrutura: 3, composição: 2, build-deploy: 3, documentação: 16, histórico: 1). Força (forte: 6, moderada: 18, fraca: 30, ambígua: 0). Evidência (tecnológica: 31, arquitetural: 23, contexto: 0).

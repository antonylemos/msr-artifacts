---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
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

# 316 — Tutul33/mf-workspace

## Leitura do repositório

As evidências descrevem um workspace com três unidades Angular: host-app, customer-app e orders-app (#26–#28). A cadeia parte da dependência declarada (#2), passa pelos builders de federação e pelas configurações das unidades (#3–#11), chega às rotas executáveis do host (#17–#19, #24) e às duas relações host → remote ativas (#29–#30). Cada remoto expõe um módulo de rotas; o host o carrega por URL direta com `loadRemoteModule`. As configurações isoladas não declaram consumidores: a ligação entre unidades está no código das rotas. Os builds separados confirmam limites por aplicação, sem deploy ou versão independente observados (#31–#33).

Há sinais que precisam de leitura restrita. A raiz coordena o workspace sem UI própria (#25). A dependência `@softarc/native-federation-node` não tem uso direto observado (#1). Os imports de bootstrap e as inicializações locais dos remotos não compõem unidades (#12–#16, #22–#23). O mapa `customerApp` do host aponta à própria porta e não é usado pelas rotas (#20–#21); conforme a 3.4.4 final, não estabelece outra relação. O histórico esclarece a coexistência desse mapa com as rotas diretas desde a introdução dos arquivos, sem evidência de sucessão de versões (#40–#42).

O guia documenta o host, os dois remotos e o roteamento federado, corroborados pelos artefatos (#34–#37, #39). Sua árvore tem corroboração parcial no inventário adquirido (#38); o histórico explica que os assets public existem na árvore Git, enquanto saídas, dependências e cache são ignorados (#43). Essa diferença de fontes não altera os valores finais da 3.4. Não há dúvida arquitetural aberta nessas revisões; a evidência é estática e não demonstra execução do exemplo.

## Observações

### 1. package.json:30

**Observação:** O manifesto declara `@softarc/native-federation-node` em dependencies, versão `^3.3.4`; a 3.4.2 registra Configurada `No`, sem uso direto observado.

**Interpretação:** A declaração isolada sinaliza Native Federation, sem estabelecer sua participação na composição.

### 2. package.json:36

**Observação:** O manifesto declara `@angular-architects/native-federation` em devDependencies, versão `^20.1.7`; a 3.4.2 registra Configurada `Yes`.

**Interpretação:** A presença do pacote é um sinal tecnológico cuja configuração e uso têm observações próprias.

### 3. angular.json:17-30

**Observação:** O target `build` de host-app usa `@angular-architects/native-federation:build` e encaminha production/development aos alvos `esbuild` do próprio projeto.

**Interpretação:** Configura o mecanismo de federação para o build de uma unidade, sem declarar outra aplicação.

### 4. angular.json:130-143

**Observação:** O target `build` de customer-app usa `@angular-architects/native-federation:build` e encaminha production/development aos alvos `esbuild` do próprio projeto.

**Interpretação:** Configura o mecanismo de federação para o build de uma unidade, sem declarar outra aplicação.

### 5. angular.json:243-256

**Observação:** O target `build` de orders-app usa `@angular-architects/native-federation:build` e encaminha production/development aos alvos `esbuild` do próprio projeto.

**Interpretação:** Configura o mecanismo de federação para o build de uma unidade, sem declarar outra aplicação.

### 6. projects/customer-app/federation.config.js:1-34

**Observação:** `withNativeFederation` declara `name: customer-app`, expõe `./CustomerRoutes` como módulo de rotas, usa `shareAll` singleton com versão estrita e mantém `./Component` comentado.

**Interpretação:** Configura o mecanismo e a interface exposta de uma unidade; sozinha, essa configuração não declara seu consumidor.

### 7. projects/orders-app/federation.config.js:1-34

**Observação:** `withNativeFederation` declara `name: orders-app`, expõe `./OrdersRoutes` como módulo de rotas, usa `shareAll` singleton com versão estrita e mantém `./Component` comentado.

**Interpretação:** Configura o mecanismo e a interface exposta de uma unidade; sozinha, essa configuração não declara seu consumidor.

### 8. angular.json:31-39

**Observação:** O target `serve` de host-app usa o builder `@angular-architects/native-federation:build`, com `dev: true`, encaminhando para `host-app:serve-original:development`.

**Interpretação:** Configura o mecanismo de federação no serviço de desenvolvimento de uma unidade. Não demonstra deploy.

### 9. angular.json:144-152

**Observação:** O target `serve` de customer-app usa o builder `@angular-architects/native-federation:build`, com `dev: true`, encaminhando para `customer-app:serve-original:development`.

**Interpretação:** Configura o mecanismo de federação no serviço de desenvolvimento de uma unidade. Não demonstra deploy.

### 10. angular.json:257-265

**Observação:** O target `serve` de orders-app usa o builder `@angular-architects/native-federation:build`, com `dev: true`, encaminhando para `orders-app:serve-original:development`.

**Interpretação:** Configura o mecanismo de federação no serviço de desenvolvimento de uma unidade. Não demonstra deploy.

### 11. projects/host-app/federation.config.js:1-27

**Observação:** `withNativeFederation` configura `shared` com `shareAll` singleton e versão estrita, `skip` e `ignoreUnusedDeps`; não declara `remotes` nem manifesto.

**Interpretação:** Parametriza Native Federation no host, sem ligar por si só o host aos remotos.

### 12. projects/customer-app/src/main.ts:5; projects/customer-app/src/bootstrap.ts:1-6

**Observação:** `import('./bootstrap')` carrega o bootstrap local de customer-app, que chama `bootstrapApplication`.

**Interpretação:** É carregamento assíncrono interno à unidade; esse trecho isolado não identifica uma tecnologia de MFE nem liga aplicações.

### 13. projects/host-app/src/main.ts:7; projects/host-app/src/bootstrap.ts:1-6

**Observação:** `import('./bootstrap')` carrega o bootstrap local de host-app, que chama `bootstrapApplication`.

**Interpretação:** É carregamento assíncrono interno à unidade; esse trecho isolado não identifica uma tecnologia de MFE nem liga aplicações.

### 14. projects/orders-app/src/main.ts:5; projects/orders-app/src/bootstrap.ts:1-6

**Observação:** `import('./bootstrap')` carrega o bootstrap local de orders-app, que chama `bootstrapApplication`.

**Interpretação:** É carregamento assíncrono interno à unidade; esse trecho isolado não identifica uma tecnologia de MFE nem liga aplicações.

### 15. projects/customer-app/src/main.ts:1-3

**Observação:** O arquivo importa `initFederation` de `@angular-architects/native-federation` para a chamada local sem argumentos.

**Interpretação:** Importa o mecanismo, sem resolver outra aplicação; Composição `No` na origem.

### 16. projects/customer-app/src/main.ts:3

**Observação:** `initFederation()` é chamado sem manifesto nem remotes.

**Interpretação:** Prepara o runtime da própria unidade, sem ligação com outra; Composição `No`.

### 17. projects/host-app/src/app/app.routes.ts:2; projects/host-app/src/app/app.routes.ts:8-19

**Observação:** O arquivo importa `loadRemoteModule`, usado nas duas rotas remotas.

**Interpretação:** O import prepara o mecanismo de carga usado pela composição, sem ser sozinho uma chamada que nomeia um destino.

### 18. projects/host-app/src/app/app.routes.ts:5-11; projects/customer-app/federation.config.js:5-10; angular.json:227; projects/customer-app/src/app/customer/customer-routes.module.ts:5-12; projects/host-app/src/app/app.config.ts:4-10; projects/host-app/src/bootstrap.ts:5

**Observação:** A rota `customers` usa `loadChildren` e `loadRemoteModule` com `http://localhost:4301/remoteEntry.json`, `./CustomerRoutes` e seleção de `CustomerRoutesModule`. O módulo corresponde ao exposto por customer-app; as rotas são registradas por `provideRouter`.

**Interpretação:** Liga explicitamente o host a uma unidade remota por Native Federation, conforme Composição `Yes`.

### 19. projects/host-app/src/app/app.routes.ts:13-19; projects/orders-app/federation.config.js:5-10; angular.json:340; projects/orders-app/src/app/orders/orders-routes.module.ts:5-12; projects/host-app/src/app/app.config.ts:4-10; projects/host-app/src/bootstrap.ts:5

**Observação:** A rota `orders` usa `loadChildren` e `loadRemoteModule` com `http://localhost:4302/remoteEntry.json`, `./OrdersRoutes` e seleção de `OrdersRoutesModule`. O módulo corresponde ao exposto por orders-app; as rotas são registradas por `provideRouter`.

**Interpretação:** Liga explicitamente o host a uma unidade remota por Native Federation, conforme Composição `Yes`.

### 20. projects/host-app/src/main.ts:1-5

**Observação:** O host importa `initFederation` para a chamada que registra `customerApp` em localhost:4200.

**Interpretação:** Importa o mecanismo para um mapa que a revisão de origem marcou Composição `No`; não estabelece ligação com outro frontend.

### 21. projects/host-app/src/main.ts:3-5; angular.json:114; projects/host-app/src/app/app.routes.ts:8-19

**Observação:** `initFederation` associa `customerApp` a `http://localhost:4200/remoteEntry.json`, porta do próprio host. As rotas usam URLs diretas em 4301 e 4302, sem esse nome.

**Interpretação:** É configuração executada em código, mas não resolve outra unidade segundo a 3.4.4 (Composição `No`). Não sustenta uma terceira relação.

### 22. projects/orders-app/src/main.ts:1-3

**Observação:** O arquivo importa `initFederation` para a chamada local sem argumentos.

**Interpretação:** Importa o mecanismo sem resolver outra aplicação; Composição `No`.

### 23. projects/orders-app/src/main.ts:3

**Observação:** `initFederation()` é chamado sem manifesto nem remotes.

**Interpretação:** Prepara o runtime de orders-app, sem ligação com outra aplicação; Composição `No`.

### 24. projects/host-app/src/app/app.routes.ts:4-26; projects/host-app/src/app/app.config.ts:4-10; projects/host-app/src/app/app.html:1-3; projects/customer-app/federation.config.js:5-10; projects/orders-app/federation.config.js:5-10; angular.json:227; angular.json:340

**Observação:** A tabela `routes` reúne `customers` e `orders`, com cargas dos módulos remotos. `provideRouter` registra a tabela; links e `router-outlet` apresentam a navegação.

**Interpretação:** A tabela de rotas liga caminhos do host aos módulos de customer-app e orders-app, compondo as duas unidades.

### 25. .; package.json:1-10; angular.json:6-18; angular.json:119-131; angular.json:232-244

**Observação:** A raiz tem o manifesto do workspace e `angular.json`, que organiza três projetos. O script build é `ng build`; os targets e as entradas pertencem aos projetos.

**Interpretação:** É raiz de coordenação sem UI própria, marcada Unidade frontend `No`; não constitui uma quarta aplicação.

### 26. projects/customer-app/; angular.json:175; projects/customer-app/src/main.ts:1-6; projects/customer-app/src/bootstrap.ts:1-6; angular.json:130-143; angular.json:172-175

**Observação:** O diretório de customer-app tem entrada `main.ts` que carrega bootstrap, chamada `bootstrapApplication`, target `build` de Native Federation e alvo `esbuild` próprios.

**Interpretação:** Confirma o limite de uma unidade frontend (Yes), mesmo sem manifesto local; não demonstra sozinho como se liga às demais.

### 27. projects/host-app/; angular.json:62; projects/host-app/src/main.ts:1-8; projects/host-app/src/bootstrap.ts:1-6; angular.json:17-30; angular.json:59-62

**Observação:** O diretório de host-app tem entrada `main.ts` que carrega bootstrap, chamada `bootstrapApplication`, target `build` de Native Federation e alvo `esbuild` próprios.

**Interpretação:** Confirma o limite de uma unidade frontend (Yes), mesmo sem manifesto local; não demonstra sozinho como se liga às demais.

### 28. projects/orders-app/; angular.json:288; projects/orders-app/src/main.ts:1-6; projects/orders-app/src/bootstrap.ts:1-6; angular.json:243-256; angular.json:285-288

**Observação:** O diretório de orders-app tem entrada `main.ts` que carrega bootstrap, chamada `bootstrapApplication`, target `build` de Native Federation e alvo `esbuild` próprios.

**Interpretação:** Confirma o limite de uma unidade frontend (Yes), mesmo sem manifesto local; não demonstra sozinho como se liga às demais.

### 29. projects/host-app/src/app/app.routes.ts:6-11; projects/customer-app/federation.config.js:5-10; angular.json:227; projects/host-app/src/app/app.config.ts:10; projects/host-app/src/bootstrap.ts:5

**Observação:** O host carrega `./CustomerRoutes` de `http://localhost:4301/remoteEntry.json`, exposto por customer-app. A 3.4.5 registra host → remote, no snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É relação explícita de composição por Native Federation entre duas unidades presentes no snapshot.

### 30. projects/host-app/src/app/app.routes.ts:14-19; projects/orders-app/federation.config.js:5-10; angular.json:340; projects/host-app/src/app/app.config.ts:10; projects/host-app/src/bootstrap.ts:5

**Observação:** O host carrega `./OrdersRoutes` de `http://localhost:4302/remoteEntry.json`, exposto por orders-app. A 3.4.5 registra host → remote, no snapshot `Yes` e Ativa `Yes`.

**Interpretação:** É relação explícita de composição por Native Federation entre duas unidades presentes no snapshot.

### 31. angular.json:130-143; angular.json:172-175; angular.json:227; package.json:3

**Observação:** customer-app tem targets próprios `build` (Native Federation) e `esbuild` (`@angular/build:application`) e porta de desenvolvimento 4301. A 3.4.6 registra build `separado`, deploy `não observado` e versionamento `No`; só há versão de workspace.

**Interpretação:** Sustenta separação de build por aplicação. Porta de desenvolvimento não demonstra publicação, e não há deploy nem versionamento independente observado.

### 32. angular.json:17-30; angular.json:59-62; angular.json:114; package.json:3

**Observação:** host-app tem targets próprios `build` (Native Federation) e `esbuild` (`@angular/build:application`) e porta de desenvolvimento 4200. A 3.4.6 registra build `separado`, deploy `não observado` e versionamento `No`; só há versão de workspace.

**Interpretação:** Sustenta separação de build por aplicação. Porta de desenvolvimento não demonstra publicação, e não há deploy nem versionamento independente observado.

### 33. angular.json:243-256; angular.json:285-288; angular.json:340; package.json:3

**Observação:** orders-app tem targets próprios `build` (Native Federation) e `esbuild` (`@angular/build:application`) e porta de desenvolvimento 4302. A 3.4.6 registra build `separado`, deploy `não observado` e versionamento `No`; só há versão de workspace.

**Interpretação:** Sustenta separação de build por aplicação. Porta de desenvolvimento não demonstra publicação, e não há deploy nem versionamento independente observado.

### 34. README.md:3; angular_20_microfrontend_app_guide.md:3

**Observação:** O guia apresenta “Host + Customer-App + Orders-App” com Angular 20 e `@angular-architects/native-federation`.

**Interpretação:** Descreve o conjunto de três unidades e seu mecanismo; a 3.4.7 registra corroboração pelos artefatos. A afirmação, sozinha, é evidência semântica.

### 35. README.md:22; angular_20_microfrontend_app_guide.md:22

**Observação:** O guia chama host-app de “main shell”.

**Interpretação:** Atribui ao host o papel de shell, corroborado pelas rotas e navegação. A afirmação, sozinha, é evidência semântica.

### 36. README.md:23; angular_20_microfrontend_app_guide.md:23

**Observação:** O guia chama customer-app de “remote”.

**Interpretação:** Atribui papel de remoto a customer-app, corroborado pela exposição e consumo. A afirmação, sozinha, é evidência semântica.

### 37. README.md:24; angular_20_microfrontend_app_guide.md:24

**Observação:** O guia chama orders-app de “remote”.

**Interpretação:** Atribui papel de remoto a orders-app, corroborado pela exposição e consumo. A afirmação, sozinha, é evidência semântica.

### 38. README.md:213-251

**Observação:** A árvore “MF-WORKSPACE” mostra projects/customer-app, host-app e orders-app, além de public, .angular, dist e node_modules.

**Interpretação:** Descreve organização das unidades, mas a corroboração é parcial: parte da árvore de trabalho não tem arquivos no inventário adquirido. O ponto histórico #43 explica esse limite. A afirmação, sozinha, é evidência semântica.

### 39. README.md:259; angular_20_microfrontend_app_guide.md:218

**Observação:** O guia afirma “Federated routing”.

**Interpretação:** Afirma composição por roteamento, corroborada pelas duas relações de carga dos módulos de rotas remotos. A afirmação, sozinha, é evidência semântica.

### 40. f038259 2025-11-18 (package.json; projects/host-app/src/main.ts; projects/host-app/src/app/app.routes.ts; projects/customer-app/federation.config.js; projects/orders-app/federation.config.js)

**Observação:** A revisão histórica registra que `f038259` já declara `@softarc/native-federation-node`; os arquivos consultados usam `@angular-architects/native-federation` e não mudam depois.

**Interpretação:** Esclarece que a declaração sem uso direto acompanha a introdução dos projetos, sem evidenciar remoção de uso anterior ou intenção de abandono. Resultado `esclarecido` na 3.4.8; a observação explica o snapshot sem sustentar sozinha a arquitetura.

### 41. f038259 2025-11-18 (projects/host-app/src/main.ts; projects/host-app/src/app/app.routes.ts)

**Observação:** A revisão histórica registra que o mapa do host para 4200 e as rotas por URLs diretas em 4301/4302 são criados juntos em `f038259` e não mudam depois.

**Interpretação:** Esclarece sua coexistência desde a primeira versão disponível, sem transição observável entre dois arranjos arquiteturais. Resultado `esclarecido` na 3.4.8; a observação explica o snapshot sem sustentar sozinha a arquitetura.

### 42. f038259 2025-11-18 (projects/customer-app/federation.config.js; projects/orders-app/federation.config.js)

**Observação:** A revisão histórica registra os dois federation.config.js criados em `f038259` com `./Component` já comentado e os módulos de rotas ativos; não mudam depois.

**Interpretação:** Esclarece que não há exposição de componente anteriormente ativa no histórico consultado, sem inferir intenção sobre as alternativas comentadas. Resultado `esclarecido` na 3.4.8; a observação explica o snapshot sem sustentar sozinha a arquitetura.

### 43. f038259 2025-11-18 (angular.json; .gitignore; projects/customer-app/public/favicon.ico; projects/host-app/public/favicon.ico; projects/orders-app/public/favicon.ico); eb6d1cc 2025-11-18 (README.md; projects/customer-app/public/favicon.ico; projects/host-app/public/favicon.ico; projects/orders-app/public/favicon.ico); .gitignore:4; .gitignore:10; .gitignore:32; angular.json:68; angular.json:181; angular.json:294

**Observação:** A revisão histórica registra os três favicon.ico introduzidos em `f038259` e ainda presentes na árvore Git do snapshot `eb6d1cc`, embora ausentes do inventário adquirido. O snapshot configura public como assets e ignora saídas, dependências e cache.

**Interpretação:** Explica a diferença entre árvore Git e inventário adquirido, sem alterar a corroboração parcial da árvore documentada nem indicar remoção dos assets. Resultado `esclarecido` na 3.4.8; a observação explica o snapshot sem sustentar sozinha a arquitetura.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:30) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 2 | 3.4.2 (package.json:36) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #3; declara #4; declara #5; declara #6; declara #7; declara #8; declara #9; declara #10; declara #11; declara #15; declara #16; declara #17; declara #18; declara #19; declara #20; declara #21; declara #22; declara #23 |
| 3 | 3.4.2 (package.json:36, Evidência); 3.4.3 (., Marcadores); 3.4.3 (projects/host-app, Build); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #27; configura #32 |
| 4 | 3.4.2 (package.json:36, Evidência); 3.4.3 (., Marcadores); 3.4.3 (projects/customer-app, Build); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #26; configura #31 |
| 5 | 3.4.2 (package.json:36, Evidência); 3.4.3 (., Marcadores); 3.4.3 (projects/orders-app, Build); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #28; configura #33 |
| 6 | 3.4.2 (package.json:36, Evidência); 3.4.3 (projects/customer-app, Marcadores); 3.4.4 (projects/customer-app/src/main.ts:3, Observação); 3.4.4 (projects/host-app/src/app/app.routes.ts:8, Observação); 3.4.5 #1 (Configuração); 3.4.7 #3 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #26; configura #18; configura #29 |
| 7 | 3.4.2 (package.json:36, Evidência); 3.4.3 (projects/orders-app, Marcadores); 3.4.4 (projects/orders-app/src/main.ts:3, Observação); 3.4.4 (projects/host-app/src/app/app.routes.ts:16, Observação); 3.4.5 #2 (Configuração); 3.4.7 #4 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #28; configura #19; configura #30 |
| 8 | 3.4.3 (., Marcadores: angular.json) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #27; configura #32 |
| 9 | 3.4.3 (., Marcadores: angular.json) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #26; configura #31 |
| 10 | 3.4.3 (., Marcadores: angular.json) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #28; configura #33 |
| 11 | 3.4.3 (projects/host-app, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #27 |
| 12 | 3.4.4 (projects/customer-app/src/main.ts:5, src-async-bootstrap) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (projects/host-app/src/main.ts:7, src-async-bootstrap) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 14 | 3.4.4 (projects/orders-app/src/main.ts:5, src-async-bootstrap) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 15 | 3.4.4 (projects/customer-app/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 16 | 3.4.4 (projects/customer-app/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 17 | 3.4.4 (projects/host-app/src/app/app.routes.ts:2) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #29; implementa #30 |
| 18 | 3.4.4 (projects/host-app/src/app/app.routes.ts:8) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #29 |
| 19 | 3.4.4 (projects/host-app/src/app/app.routes.ts:16) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #30 |
| 20 | 3.4.4 (projects/host-app/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 21 | 3.4.4 (projects/host-app/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 22 | 3.4.4 (projects/orders-app/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 23 | 3.4.4 (projects/orders-app/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 24 | 3.4.4 (projects/host-app/src/app/app.routes.ts:4, manual) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #29; implementa #30 |
| 25 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 26 | 3.4.3 (projects/customer-app) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 27 | 3.4.3 (projects/host-app) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 28 | 3.4.3 (projects/orders-app) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 29 | 3.4.5 #1 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #27; liga #26 |
| 30 | 3.4.5 #2 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #27; liga #28 |
| 31 | 3.4.6 #1 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #26 |
| 32 | 3.4.6 #2 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #27 |
| 33 | 3.4.6 #3 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #28 |
| 34 | 3.4.7 #1 | 7 documentação | documentação | native-federation | arquitetural | fraca | corrobora #26; corrobora #27; corrobora #28; corrobora #2; corrobora #29; corrobora #30 |
| 35 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #29; corrobora #30; corrobora #24 |
| 36 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #6; corrobora #29 |
| 37 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #7; corrobora #30 |
| 38 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #25; corrobora em parte #26; corrobora em parte #27; corrobora em parte #28; corrobora em parte angular.json:68; corrobora em parte angular.json:181; corrobora em parte angular.json:294; corrobora em parte .gitignore:4; corrobora em parte .gitignore:10; corrobora em parte .gitignore:32 |
| 39 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #29; corrobora #30; corrobora #18; corrobora #19 |
| 40 | 3.4.8 #1 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #1 |
| 41 | 3.4.8 #2 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #20; explica #21; explica #18; explica #19; explica #29; explica #30 |
| 42 | 3.4.8 #3 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #6; explica #7 |
| 43 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #38 |

## Resumo

Observações: 43. Dimensões (tecnologia: 2, configuração: 9, código: 13, estrutura: 4, composição: 2, build-deploy: 3, documentação: 6, histórico: 4). Força (forte: 5, moderada: 16, fraca: 22, ambígua: 0). Evidência (tecnológica: 24, arquitetural: 18, contexto: 1).

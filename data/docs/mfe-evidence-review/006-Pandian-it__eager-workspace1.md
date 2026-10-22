---
schema: 1
id: 1036476677
full_name: Pandian-it/eager-workspace1
commit: 9ad83c2d39d410bab0e82efdebca145ebb04adbc
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

# 006 — Pandian-it/eager-workspace1

## Leitura do repositório

A arquitetura se sustenta por uma cadeia de Module Federation com resolução por manifesto:
- **Dependência:** `@angular-architects/module-federation` (#1).
- **Configuração:**
  - os três remotes se declaram e expõem `./Module` (#6 a #8);
  - o shell declara os três remotes e compartilha as bibliotecas como singletons (#5).
- **Manifestos:** o shell não carrega os remotes pelos `remotes` estáticos do webpack. Ele lê um de dois manifestos: o de desenvolvimento, com URLs diretas (#9), ou o de produção, com a versão de cada aplicação (#10).
- **Código:** as rotas do shell nomeiam cada remote (#16 a #18, #24) e chamam um único carregador. Esse carregador lê o manifesto, monta a URL e chama `loadRemoteModule` (#19 a #23, #25).
- **Relações:** isso resulta nas três relações ativas (#33 a #35).

O cart tem limite ambíguo (#27): o bootstrap standalone usa um módulo que não define como iniciar a UI. O histórico mostra que esse arranjo existe desde o primeiro commit (#49), e nada disso afeta o papel do cart como remote.

Build e deploy são o traço mais forte do repositório (#36 a #39). Cada aplicação tem build, publicação e versão próprios, por um fluxo de release com changesets. A versão publicada é a que o shell usa para montar a URL do remote (#10, #25).

Há sinais que enganam se lidos sozinhos:
- **Nx (#2 a #4):** são ferramentas de monorepo, e não de MFE. Por isso ficaram como contexto. `@nx/workspace` nem é usada.
- **Bootstrap assíncrono (#12 a #15):** é interno a cada unidade.
- **Manifesto de federação residual (#11):** nomeia `mfe1` e `mfe2`, que não existem, e o código não o lê. O histórico o liga a um primeiro estágio compatível com Native Federation, substituído por webpack (#50).
- **Documentação contradita:** o comentário do checkout diz que ele usa `@shared-ui`, e ele não usa (#45). O guia do CloudFront põe o shell e o manifesto onde o workflow não os publica (#43). O histórico mostra que os dois já nasceram assim (#51, #52).

## Observações

### 1. package.json:37

**Observação:** `@angular-architects/module-federation` (`^20.0.0`) está declarada em `devDependencies`.

**Interpretação:** A tecnologia de federação está presente. A configuração e o código a usam.

### 2. package.json:46; projects/shell/project.json:19-40

**Observação:** `@nx/angular` (`21.3.11`) está declarada em `devDependencies`. É o executor do target `build` das aplicações.

**Interpretação:** É uma ferramenta de monorepo em uso, e não uma tecnologia de MFE.

### 3. package.json:47

**Observação:** `@nx/workspace` (`21.3.11`) está declarada em `devDependencies`, sem import, executor ou invocação no snapshot.

**Interpretação:** É uma ferramenta de monorepo declarada e não usada.

### 4. package.json:59; .github/workflows/User-Pull-Request.yml:36-54

**Observação:** `nx` (`21.3.11`) está declarada em `devDependencies`. Os workflows invocam `npx nx affected --target=build`.

**Interpretação:** É uma ferramenta de monorepo em uso, que decide quais projetos são construídos.

### 5. projects/shell/webpack.config.js:1-36

**Observação:** `withModuleFederationPlugin` declara `name: 'shell'` e `remotes` para `cart`, `checkout` e `orders` em `http://localhost:4201` a `4203/remoteEntry.js`. Também compartilha as dependências com `shareAll` e declara `@shared-lib` e `@shared-ui` como singletons `eager`.

**Interpretação:** A configuração do host declara os três remotes e carrega as bibliotecas compartilhadas para eles.

**Nota:** A força segue a orientação da configuração do host que nomeia remotes, mas o carregamento em runtime não usa esses `remotes`. Ele usa os manifestos (#9, #10), pelo serviço do shell. O `project.json` de cada aplicação, citado na mesma tabela, só aponta o executor genérico `@nx/angular:webpack-browser` para este arquivo, sem declarar elemento da composição. Por isso não virou observação.

### 6. projects/cart/webpack.config.js:1-27

**Observação:** `withModuleFederationPlugin` declara `name: 'cart'`, expõe `./Module` (`mfe.module.ts`) e compartilha as dependências com `shareAll`, com `@shared-lib` como singleton não `eager`.

**Interpretação:** O cart está configurado como remote e oferece seu módulo a um host.

### 7. projects/checkout/webpack.config.js:1-35

**Observação:** `withModuleFederationPlugin` declara `name: 'checkout'`, expõe `./Module` e compartilha as dependências com `shareAll`, com `@shared-lib` e `@shared-ui` como singletons.

**Interpretação:** O checkout está configurado como remote e oferece seu módulo a um host.

### 8. projects/orders/webpack.config.js:1-27

**Observação:** `withModuleFederationPlugin` declara `name: 'orders'`, expõe `./Module` e compartilha as dependências com `shareAll`, com `@shared-lib` como singleton.

**Interpretação:** O orders está configurado como remote e oferece seu módulo a um host.

### 9. projects/shell/public/mfe.manifest.json:1-5

**Observação:** Mapeia `orders`, `cart` e `checkout` para `http://localhost:4203`, `4201` e `4202/remoteEntry.js`.

**Interpretação:** A configuração do host declara os três remotes e onde encontrá-los em desenvolvimento.

### 10. deployment-manifest.json:1-26

**Observação:** Registra `version` e `release` de cada projeto: as quatro aplicações e as duas bibliotecas. O cart está em `1.0.5`, o checkout em `2.0.4`, o orders em `1.1.3` e o shell em `1.0.7`.

**Interpretação:** Em produção, o host resolve cada remote pela versão publicada, registrada neste manifesto.

### 11. projects/shell/public/federation.manifest.json:1-4

**Observação:** Mapeia `mfe1` e `mfe2` para `http://localhost:4202` e `4204/remoteEntry.json`. Nenhum código do shell lê este arquivo.

**Interpretação:** É uma configuração de host que nomeia remotes inexistentes no snapshot. É um sinal enganoso, resíduo de outro estágio.

**Nota:** A orientação daria `forte` a uma configuração de host que nomeia remotes. Aqui a força é `fraca`, porque os nomes não correspondem a nenhuma unidade e o arquivo não participa da composição.

### 12. projects/cart/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 13. projects/checkout/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 14. projects/orders/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 15. projects/shell/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno ao shell.

### 16. projects/shell/src/app/app-routing.module.ts:9-14

**Observação:** A rota `cart` chama `manifestService.loadRemoteModule('cart')`.

**Interpretação:** O shell carrega o cart em runtime pelo nome.

### 17. projects/shell/src/app/app-routing.module.ts:16-21

**Observação:** A rota `checkout` chama `manifestService.loadRemoteModule('checkout')`.

**Interpretação:** O shell carrega o checkout em runtime pelo nome.

### 18. projects/shell/src/app/app-routing.module.ts:23-28

**Observação:** A rota `orders` chama `manifestService.loadRemoteModule('orders')`.

**Interpretação:** O shell carrega o orders em runtime pelo nome.

### 19. projects/shell/src/app/manifest.service.ts:4

**Observação:** Importa `loadRemoteModule` de `@angular-architects/module-federation`.

**Interpretação:** O mecanismo de carga remota está disponível no serviço do shell.

### 20. projects/shell/src/app/manifest.service.ts:23-38

**Observação:** `loadManifest()` lê `mfe.manifest.json` em `localhost` e `<origem>/deployment-manifest.json` nos demais casos.

**Interpretação:** O shell escolhe a fonte de resolução dos remotes conforme o ambiente.

### 21. projects/shell/src/app/manifest.service.ts:63-76

**Observação:** `loadRemoteModule(appName)` lê o manifesto, obtém a URL e carrega o módulo remoto.

**Interpretação:** Um único carregador atende os três remotes.

### 22. projects/shell/src/app/manifest.service.ts:65

**Observação:** `await this.loadManifest()` dentro do carregador.

**Interpretação:** A resolução pelo manifesto antecede cada carga remota.

### 23. projects/shell/src/app/manifest.service.ts:71-75

**Observação:** `loadRemoteModule({ type: 'module', remoteEntry: remoteUrl, exposedModule: './Module' })` retorna `m.MfeModule`.

**Interpretação:** O shell carrega o módulo exposto pelo remote indicado no parâmetro.

### 24. projects/shell/src/app/app-routing.module.ts:8-28, 42

**Observação:** As rotas do host nomeiam `cart`, `checkout` e `orders` e são registradas por `RouterModule.forRoot`.

**Interpretação:** O roteamento do host declara a relação host → remotes.

### 25. projects/shell/src/app/manifest.service.ts:40-59

**Observação:** `getRemoteUrl(appName)` devolve a URL direta do manifesto em `localhost`. Em produção, monta `<origem com www trocado por mfe>/apps/<app>/<versão>/remoteEntry.js`.

**Interpretação:** O host resolve a entrada de cada remote pela versão publicada.

### 26. .; package.json:1-17; package.json:4-6; nx.json:3-20

**Observação:** É a raiz do workspace (`workspaces: ["projects/*"]`), com os padrões do Nx e sem entrada nem build de UI.

**Interpretação:** É a raiz de coordenação de um monorepo, e não uma unidade.

### 27. projects/cart; projects/cart/package.json:1-5; projects/cart/project.json:19-24; projects/cart/src/bootstrap.ts:1-7; projects/cart/src/app/mfe.module.ts:8-19

**Observação:** Tem manifesto, entrada e target de build próprios. O `bootstrapModule(MfeModule)` usa um módulo sem `bootstrap` nem `ngDoBootstrap`.

**Interpretação:** O limite da unidade é ambíguo: ou é uma aplicação que roda sozinha, ou é só um remote cuja entrada standalone não inicia a UI.

### 28. projects/checkout; projects/checkout/package.json:1-5; projects/checkout/project.json:20-25; projects/checkout/src/bootstrap.ts:1-7

**Observação:** Tem manifesto, entrada e target de build próprios, com bootstrap Angular.

**Interpretação:** É uma unidade frontend com limite próprio.

### 29. projects/orders; projects/orders/package.json:1-5; projects/orders/project.json:19-24; projects/orders/src/bootstrap.ts:1-7

**Observação:** Tem manifesto, entrada e target de build próprios, com bootstrap Angular.

**Interpretação:** É uma unidade frontend com limite próprio.

### 30. projects/shared-lib; projects/shared-lib/package.json:1-12; projects/shared-lib/project.json:4-11

**Observação:** É uma biblioteca com build ng-packagr e sem entrada de aplicação.

**Interpretação:** É uma biblioteca compartilhada, e não uma unidade frontend.

### 31. projects/shared-ui; projects/shared-ui/package.json:1-12; projects/shared-ui/project.json:4-11

**Observação:** É uma biblioteca com build ng-packagr e sem entrada de aplicação.

**Interpretação:** É uma biblioteca compartilhada, e não uma unidade frontend.

### 32. projects/shell; projects/shell/package.json:1-5; projects/shell/project.json:19-24; projects/shell/src/bootstrap.ts:1-7

**Observação:** Tem manifesto, entrada e target de build próprios, com bootstrap Angular.

**Interpretação:** É uma unidade frontend com limite próprio.

### 33. projects/shell/src/app/app-routing.module.ts:13; projects/shell/src/app/manifest.service.ts:40-75; projects/shell/public/mfe.manifest.json:3; projects/cart/webpack.config.js:5-8

**Observação:** A rota `cart` carrega `./Module` do remote `cart`, resolvido pelo manifesto. O nome e o módulo correspondem à configuração do cart.

**Interpretação:** É uma relação host → remote ativa.

### 34. projects/shell/src/app/app-routing.module.ts:20; projects/shell/src/app/manifest.service.ts:40-75; projects/shell/public/mfe.manifest.json:4; projects/checkout/webpack.config.js:5-8

**Observação:** A rota `checkout` carrega `./Module` do remote `checkout`, resolvido pelo manifesto. O nome e o módulo correspondem à configuração do checkout.

**Interpretação:** É uma relação host → remote ativa.

### 35. projects/shell/src/app/app-routing.module.ts:27; projects/shell/src/app/manifest.service.ts:40-75; projects/shell/public/mfe.manifest.json:2; projects/orders/webpack.config.js:5-8

**Observação:** A rota `orders` carrega `./Module` do remote `orders`, resolvido pelo manifesto. O nome e o módulo correspondem à configuração do orders.

**Interpretação:** É uma relação host → remote ativa.

### 36. projects/cart/project.json:19-24; .github/workflows/Push-Event-To-Release.yml:143-145, 158-162; projects/cart/package.json:3; deployment-manifest.json:22-25

**Observação:** O cart é construído só quando o Nx o marca como afetado e é publicado no S3 em `apps/cart/<versão>`. Tem a versão `1.0.5`, registrada no manifesto.

**Interpretação:** Há fronteiras de build, deploy e versão próprias.

### 37. projects/checkout/project.json:20-25; .github/workflows/Push-Event-To-Release.yml:143-145, 158-162; projects/checkout/package.json:3; deployment-manifest.json:10-13

**Observação:** O checkout segue o mesmo laço por aplicação, com a versão `2.0.4`.

**Interpretação:** Há fronteiras de build, deploy e versão próprias.

### 38. projects/orders/project.json:19-24; .github/workflows/Push-Event-To-Release.yml:143-145, 158-162; projects/orders/package.json:3; deployment-manifest.json:14-17

**Observação:** O orders segue o mesmo laço por aplicação, com a versão `1.1.3`.

**Interpretação:** Há fronteiras de build, deploy e versão próprias.

### 39. projects/shell/project.json:19-24; .github/workflows/Push-Event-To-Release.yml:143-145, 158-162; projects/shell/package.json:3; deployment-manifest.json:18-21

**Observação:** O shell é publicado pelo mesmo laço em `apps/shell/<versão>`, com a versão `1.0.7`, numa release diferente da dos remotes.

**Interpretação:** Há fronteiras de build, deploy e versão próprias. O snapshot não mostra como o shell passa a ser servido na raiz do domínio.

### 40. .github/workflows/Initiate-Release.yml:50

**Observação:** "Run changesets/action to bump versions & open PR".

**Interpretação:** Descreve o versionamento de cada pacote por changesets. A afirmação é corroborada.

### 41. .github/workflows/Push-Event-To-Release.yml:137-139

**Observação:** "CASE A: Bot commit → Build, Deploy apps & manifest".

**Interpretação:** Descreve o build e a publicação só das aplicações afetadas e do manifesto. A afirmação é corroborada.

### 42. cloudfront-spa-config.md:70-73

**Observação:** "This will resolve to URLs like: `https://yourdomain.com/apps/cart/v1.0.0/remoteEntry.js` […]".

**Interpretação:** Descreve a resolução de cada remote pelo nome e pela versão. A afirmação é corroborada.

### 43. cloudfront-spa-config.md:78-81

**Observação:** "s3://your-bucket/ ├── index.html (shell app) ├── deployment-manifest.json ├── apps/".

**Interpretação:** Põe o shell e o manifesto na raiz do bucket. O workflow os publica em outros caminhos, e a afirmação é contradita.

### 44. projects/cart/webpack.config.js:18

**Observação:** "Explicitly share the custom shared library".

**Interpretação:** Afirma que `@shared-lib` é compartilhada entre as unidades. A afirmação é corroborada.

### 45. projects/checkout/webpack.config.js:26

**Observação:** "Also share @shared-ui since checkout uses it".

**Interpretação:** Afirma que o checkout usa `@shared-ui`. Ele não a usa, e a afirmação é contradita.

**Nota:** A contradição é por ausência: a revisão de documentação não encontrou nenhuma referência a `shared-ui` nos arquivos de `projects/checkout/src`. Uma ausência não tem `caminho:linha`, e por isso a coluna Relações fica `—`.

### 46. projects/shell/src/app/manifest.service.ts:51-54

**Observação:** "For localhost, mfe.manifest.json contains direct URLs […] For production, deployment-manifest.json contains version objects".

**Interpretação:** Descreve os dois manifestos que resolvem os remotes. A afirmação é corroborada.

### 47. projects/shell/src/app/manifest.service.ts:62

**Observação:** "Centralized method for loading remote modules".

**Interpretação:** Afirma que um único método carrega todos os remotes. A afirmação é corroborada.

### 48. 69e232b 2025-08-12 (package.json, versão ausente); 3a75f71 2025-09-02 (package.json)

**Observação:** O Nx entra em `69e232b`. A versão de `3a75f71`, igual à do snapshot, declara `@nx/workspace`, e a de `69e232b` não está disponível.

**Interpretação:** Não se sabe quando a dependência entrou nem se foi usada antes. A dúvida é só sobre o passado: no snapshot, ela não é usada.

### 49. 85d75fe 2025-08-12 (projects/cart/src/app/mfe.module.ts, projects/cart/src/bootstrap.ts)

**Observação:** Os dois arquivos não mudam desde o primeiro commit.

**Interpretação:** O arranjo que deixa o cart ambíguo existe desde o primeiro commit observado. O ponto está esclarecido.

### 50. 85d75fe 2025-08-12 (projects/shell/public/federation.manifest.json, projects/*/federation.config.js); 3a75f71 2025-09-02 (projects/*/webpack.config.js)

**Observação:** O manifesto residual chega no primeiro commit, junto com os `federation.config.js` das quatro aplicações. Em `3a75f71`, os `federation.config.js` são removidos e substituídos por `webpack.config.js`, e o manifesto fica.

**Interpretação:** O manifesto pertence a um primeiro estágio compatível com Native Federation e sobrou na troca para webpack. O ponto está esclarecido.

### 51. 3a75f71 2025-09-02 (cloudfront-spa-config.md, .github/workflows/Push-Event-To-Release.yml)

**Observação:** O guia é criado no mesmo commit que faz a última alteração do workflow até o snapshot.

**Interpretação:** O guia e o workflow coexistem desde então, sem estágios diferentes. O ponto está esclarecido.

### 52. 3a75f71 2025-09-02 (projects/checkout/webpack.config.js, projects/checkout/src)

**Observação:** O comentário nasce em `3a75f71`, e nenhum arquivo disponível de `projects/checkout/src` nesse commit referencia `shared-ui`.

**Interpretação:** O comentário já não correspondia ao checkout quando foi escrito. O ponto está esclarecido.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:37) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5; declara #6; declara #7; declara #8; declara #19 |
| 2 | 3.4.2 (package.json:46) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 3 | 3.4.2 (package.json:47) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 4 | 3.4.2 (package.json:59) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 5 | 3.4.2 (package.json:37, Evidência); 3.4.3 (projects/shell, Marcadores); 3.4.5 #1, #2, #3 (Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #32; configura #33; configura #34; configura #35 |
| 6 | 3.4.3 (projects/cart, Marcadores); 3.4.5 #1 (Configuração); 3.4.7 #5 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #27; configura #33 |
| 7 | 3.4.3 (projects/checkout, Marcadores); 3.4.5 #2 (Configuração); 3.4.7 #6 (Documento) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #28; configura #34 |
| 8 | 3.4.3 (projects/orders, Marcadores); 3.4.5 #3 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #29; configura #35 |
| 9 | 3.4.5 #1, #2, #3 (Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #20; configura #33; configura #34; configura #35 |
| 10 | 3.4.6 #1, #2, #3, #4 (Artefatos); 3.4.7 #1, #7 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #25; configura #33; configura #34; configura #35 |
| 11 | 3.4.8 #3 (Ponto) | 2 configuração | configuração | native-federation | tecnológica | fraca | — |
| 12 | 3.4.4 (projects/cart/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (projects/checkout/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 14 | 3.4.4 (projects/orders/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 15 | 3.4.4 (projects/shell/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 16 | 3.4.4 (projects/shell/src/app/app-routing.module.ts:13) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #33 |
| 17 | 3.4.4 (projects/shell/src/app/app-routing.module.ts:20) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #34 |
| 18 | 3.4.4 (projects/shell/src/app/app-routing.module.ts:27) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #35 |
| 19 | 3.4.4 (projects/shell/src/app/manifest.service.ts:4) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33; implementa #34; implementa #35 |
| 20 | 3.4.4 (projects/shell/src/app/manifest.service.ts:23) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33; implementa #34; implementa #35 |
| 21 | 3.4.4 (projects/shell/src/app/manifest.service.ts:63) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33; implementa #34; implementa #35 |
| 22 | 3.4.4 (projects/shell/src/app/manifest.service.ts:65) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33; implementa #34; implementa #35 |
| 23 | 3.4.4 (projects/shell/src/app/manifest.service.ts:71) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33; implementa #34; implementa #35 |
| 24 | 3.4.4 (projects/shell/src/app/app-routing.module.ts:8) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #33; implementa #34; implementa #35 |
| 25 | 3.4.4 (projects/shell/src/app/manifest.service.ts:40) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33; implementa #34; implementa #35 |
| 26 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 27 | 3.4.3 (projects/cart) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 28 | 3.4.3 (projects/checkout) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (projects/orders) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 30 | 3.4.3 (projects/shared-lib) | 4 estrutura | diretório | — | contexto | fraca | — |
| 31 | 3.4.3 (projects/shared-ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 32 | 3.4.3 (projects/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 33 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #32; liga #27 |
| 34 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #32; liga #28 |
| 35 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #32; liga #29 |
| 36 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #27 |
| 37 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #28 |
| 38 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #29 |
| 39 | 3.4.6 #4 | 6 build-deploy | CI | — | arquitetural | moderada | publica #32 |
| 40 | 3.4.7 #1 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #36; corrobora #37; corrobora #38; corrobora #39; corrobora #10 |
| 41 | 3.4.7 #2 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #36; corrobora #37; corrobora #38; corrobora #39 |
| 42 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #25; corrobora .github/workflows/Push-Event-To-Release.yml:162 |
| 43 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #39; contradiz .github/workflows/Push-Event-To-Release.yml:167 |
| 44 | 3.4.7 #5 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #6; corrobora projects/cart/src/app/app.component.ts:3; corrobora projects/checkout/src/app/app.component.ts:2; corrobora projects/orders/src/app/app.component.ts:2; corrobora projects/shell/src/app/app.component.ts:2 |
| 45 | 3.4.7 #6 | 7 documentação | comentário | module-federation | arquitetural | fraca | — |
| 46 | 3.4.7 #7 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #9; corrobora #10; corrobora #25 |
| 47 | 3.4.7 #8 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #21; corrobora #16; corrobora #17; corrobora #18 |
| 48 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #3 |
| 49 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #27 |
| 50 | 3.4.8 #3 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #11 |
| 51 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #43 |
| 52 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #45 |

## Resumo

Observações: 52. Dimensões (tecnologia: 4, configuração: 7, código: 14, estrutura: 7, composição: 3, build-deploy: 4, documentação: 8, histórico: 5). Força (forte: 10, moderada: 16, fraca: 25, ambígua: 1). Evidência (tecnológica: 16, arquitetural: 29, contexto: 7).

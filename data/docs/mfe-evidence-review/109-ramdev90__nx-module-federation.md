---
schema: 1
id: 1178836362
full_name: ramdev90/nx-module-federation
commit: cf42f3f1506bfe6f25a263d0763cd09cac7e84f7
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

# 109 — ramdev90/nx-module-federation

## Leitura do repositório

Exemplo Angular num workspace Nx, em boa parte gerado pelo scaffold da ferramenta. Tem um shell e três remotes, `customer`, `orders` e `products`, cada um com entrada e build próprios (#35 a #38, #44 a #47). A arquitetura se sustenta por uma cadeia de Module Federation completa:
- **Dependência:** `@nx/module-federation` dá o `withModuleFederation` que as configurações usam, e esse wrapper depende de `@module-federation/enhanced` (#2, #6).
- **Configuração:** cada remote se declara pelo nome e expõe `./Routes` (#12, #14, #16). O shell nomeia os três remotes (#18). As configurações webpack de cada unidade passam essas declarações a `withModuleFederation`, no build normal e no de produção (#13, #15, #17, #19 a #23). O shell sobe os remotes em desenvolvimento pelo executor de federação do Nx (#11).
- **Código:** a tabela de rotas do shell nomeia os três remotes (#31), e cada `loadChildren` importa `<remote>/Routes` e usa o `remoteRoutes` exposto (#24 a #26).
- **Relações:** isso resulta em três relações host → remote ativas (#39 a #41).

Não há URL de remote: o Nx resolve os nomes para os projetos do mesmo workspace, e o bloco de URLs de produção é só comentário do scaffold (#23). Nenhuma aplicação tem deploy observado; os builds são separados, mas só há servidores de desenvolvimento ou locais (#43 a #47).

A particularidade é um acoplamento lateral fora da federação: a tela NxWelcome de `orders` importa o componente `ProductList` das fontes de `products` e o renderiza (#32), o que vira a relação `other` orders → products (#42). O componente entra no bundle de `orders` em tempo de build.

Há sinais que enganam se lidos sozinhos:
- **Nx (#1, #3 a #5, #7 a #10):** são ferramentas de monorepo, e não de MFE. `@nx/js`, `@nx/webpack` e `@nx/workspace` nem são usadas, e `nx` não tem invocação no snapshot (#10). O histórico não esclarece nenhum desses pontos, porque as versões anteriores dos manifestos não estão disponíveis (#48 a #51).
- **Bootstrap assíncrono (#27 a #30):** é interno a cada unidade.
- **Aplicação inicial (#34, #43):** `apps/microfrontend-workspace` tem entrada e build próprios, mas não participa da composição. É a quinta aplicação da estrutura e fica fora das quatro unidades compostas.

O repositório não tem documentação de arquitetura: a revisão de documentação não registrou nenhuma afirmação.

## Observações

### 1. package.json:15; shell/project.json:9-26, 60; nx.json:28-37

**Observação:** `@nx/angular` (`22.5.4`) está declarada em `dependencies`. É o executor do target `build` das quatro aplicações federadas (`@nx/angular:webpack-browser`), do `serve` do shell (`@nx/angular:module-federation-dev-server`) e do `serve` dos remotes (`@nx/angular:dev-server`).

**Interpretação:** É uma ferramenta de monorepo em uso, e não uma tecnologia de MFE. Ela também fornece o executor de federação que o shell usa em desenvolvimento (#11).

### 2. package.json:25; package-lock.json:7612-7618

**Observação:** `@module-federation/enhanced` (`^0.21.2`) está declarada em `devDependencies`. Nenhum arquivo a importa diretamente; o lockfile registra que `@nx/module-federation` depende dela.

**Interpretação:** A tecnologia de federação está presente e é usada por meio do wrapper do Nx, invocado nas configurações webpack.

### 3. package.json:26; shell/project.json:81-83; nx.json:19-27

**Observação:** `@nx/eslint` (`22.5.4`) está declarada em `devDependencies`. É o executor do target `lint` dos projetos.

**Interpretação:** É uma ferramenta de monorepo em uso, e não uma tecnologia de MFE.

### 4. package.json:27; eslint.config.mjs:1-6, 13

**Observação:** `@nx/eslint-plugin` (`22.5.4`) está declarada em `devDependencies`. A configuração do ESLint a importa e aplica a regra `@nx/enforce-module-boundaries`.

**Interpretação:** É uma ferramenta de monorepo em uso, e não uma tecnologia de MFE.

### 5. package.json:28

**Observação:** `@nx/js` (`22.5.4`) está declarada em `devDependencies`, sem import, executor ou plugin no snapshot.

**Interpretação:** É uma ferramenta de monorepo declarada e não usada.

### 6. package.json:29; shell/webpack.config.ts:1, 9; shell/module-federation.config.ts:1-3

**Observação:** `@nx/module-federation` (`22.5.4`) está declarada em `devDependencies`. As configurações webpack das quatro aplicações importam `withModuleFederation` de `@nx/module-federation/angular` e o invocam; as configurações de federação usam o tipo `ModuleFederationConfig`.

**Interpretação:** A tecnologia de federação está presente, por um wrapper do Nx, e as configurações das quatro unidades a usam.

### 7. package.json:30; shell/project.json:84-91

**Observação:** `@nx/web` (`22.5.4`) está declarada em `devDependencies`. É o executor do target `serve-static` (`@nx/web:file-server`) dos projetos.

**Interpretação:** É uma ferramenta de monorepo em uso, que serve o build localmente, e não uma tecnologia de MFE.

### 8. package.json:31

**Observação:** `@nx/webpack` (`22.5.4`) está declarada em `devDependencies`, sem import, executor ou plugin no snapshot. Os builds usam `@nx/angular:webpack-browser`.

**Interpretação:** É uma ferramenta de monorepo declarada e não usada.

### 9. package.json:32

**Observação:** `@nx/workspace` (`22.5.4`) está declarada em `devDependencies`, sem import, executor ou invocação no snapshot.

**Interpretação:** É uma ferramenta de monorepo declarada e não usada.

### 10. package.json:41; package.json:5; nx.json:13-50

**Observação:** `nx` (`22.5.4`) está declarada em `devDependencies`. `nx.json` e os `project.json` estão configurados, mas `scripts` está vazio e não há CI nem script que invoque `nx`. As menções a `nx build` e `nx graph` estão só na tela de boas-vindas (shell/src/app/nx-welcome.ts:860-905).

**Interpretação:** Continuam plausíveis duas leituras: `nx` é a CLI que executa os targets dos `project.json`, ou é só declarada, sem invocação no snapshot. Nenhuma das duas é uma tecnologia de MFE.

### 11. shell/project.json:58-74

**Observação:** O target `serve` do shell usa o executor `@nx/angular:module-federation-dev-server`, na porta 4200, com `buildTarget` `shell:build:production` ou `shell:build:development`.

**Interpretação:** O shell tem um servidor de desenvolvimento próprio da federação, que também sobe os remotes. Só vale para desenvolvimento.

**Nota:** Do `project.json` de cada aplicação, só este bloco declara elemento da composição. Os targets `build` apontam o executor genérico `@nx/angular:webpack-browser` para os arquivos webpack (`customWebpackConfig`), o `serve` dos remotes usa o `@nx/angular:dev-server` genérico e o `serve-static` usa o servidor de arquivos; nenhum deles virou observação. A porta 4200 é de desenvolvimento e só corrobora.

### 12. customer/module-federation.config.ts:1-13

**Observação:** `ModuleFederationConfig` declara `name: 'customer'` e expõe `./Routes` (`customer/src/app/remote-entry/entry.routes.ts`), com export default.

**Interpretação:** O customer está configurado como remote e oferece suas rotas a um host.

### 13. customer/webpack.config.ts:1-9

**Observação:** Importa a configuração de federação local e exporta `withModuleFederation(config, { dts: false })`.

**Interpretação:** O plugin de federação é aplicado ao build do customer com a configuração de #12.

### 14. orders/module-federation.config.ts:1-13

**Observação:** `ModuleFederationConfig` declara `name: 'orders'` e expõe `./Routes` (`orders/src/app/remote-entry/entry.routes.ts`), com export default.

**Interpretação:** O orders está configurado como remote e oferece suas rotas a um host.

### 15. orders/webpack.config.ts:1-9

**Observação:** Importa a configuração de federação local e exporta `withModuleFederation(config, { dts: false })`.

**Interpretação:** O plugin de federação é aplicado ao build do orders com a configuração de #14.

### 16. products/module-federation.config.ts:1-13

**Observação:** `ModuleFederationConfig` declara `name: 'products'` e expõe `./Routes` (`products/src/app/remote-entry/entry.routes.ts`), com export default.

**Interpretação:** O products está configurado como remote e oferece suas rotas a um host.

### 17. products/webpack.config.ts:1-9

**Observação:** Importa a configuração de federação local e exporta `withModuleFederation(config, { dts: false })`.

**Interpretação:** O plugin de federação é aplicado ao build do products com a configuração de #16.

### 18. shell/module-federation.config.ts:1-23

**Observação:** `ModuleFederationConfig` declara `name: 'shell'` e `remotes: ['products', 'orders', 'customer']`, com export default. Um comentário mostra a sintaxe de tupla para um remote externo ao workspace, com um endereço de exemplo.

**Interpretação:** A configuração do host declara os três remotes pelo nome dos projetos do workspace, sem URL.

**Nota:** O remote externo da linha 9 é exemplo comentado do scaffold e não faz parte da observação. Os aliases `products/Routes`, `orders/Routes` e `customer/Routes` do tsconfig.base.json:17-20 são aliases de caminho e ficam fora da dimensão 2. O `nx.json` só define cache, dependências entre builds e geradores; nenhum bloco dele declara elemento da composição.

### 19. shell/webpack.config.ts:1-9

**Observação:** Importa a configuração de federação local e exporta `withModuleFederation(config, { dts: false })`.

**Interpretação:** O plugin de federação é aplicado ao build do shell com a configuração de #18.

### 20. customer/webpack.prod.config.ts:1-24

**Observação:** Exporta `withModuleFederation({ ...config }, { dts: false })`. O bloco "Remote overrides for production", com exemplos `app1` e `app2`, está só em comentário.

**Interpretação:** O build de produção do customer aplica a mesma configuração de federação, sem override.

### 21. orders/webpack.prod.config.ts:1-24

**Observação:** Exporta `withModuleFederation({ ...config }, { dts: false })`. O bloco "Remote overrides for production" está só em comentário.

**Interpretação:** O build de produção do orders aplica a mesma configuração de federação, sem override.

### 22. products/webpack.prod.config.ts:1-24

**Observação:** Exporta `withModuleFederation({ ...config }, { dts: false })`. O bloco "Remote overrides for production" está só em comentário.

**Interpretação:** O build de produção do products aplica a mesma configuração de federação, sem override.

### 23. shell/webpack.prod.config.ts:1-24

**Observação:** Exporta `withModuleFederation({ ...config }, { dts: false })`. O bloco "Remote overrides for production", onde ficariam as URLs de produção dos remotes, está só em comentário.

**Interpretação:** O build de produção do shell aplica a mesma configuração de federação. O snapshot não diz onde os remotes seriam encontrados em produção.

### 24. shell/src/app/app.routes.ts:7

**Observação:** `loadChildren: () => import('customer/Routes').then((m) => m!.remoteRoutes)`.

**Interpretação:** O shell carrega as rotas expostas pelo customer.

### 25. shell/src/app/app.routes.ts:11

**Observação:** `loadChildren: () => import('orders/Routes').then((m) => m!.remoteRoutes)`.

**Interpretação:** O shell carrega as rotas expostas pelo orders.

### 26. shell/src/app/app.routes.ts:15

**Observação:** `loadChildren: () => import('products/Routes').then((m) => m!.remoteRoutes)`.

**Interpretação:** O shell carrega as rotas expostas pelo products.

### 27. customer/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 28. orders/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 29. products/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 30. shell/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno ao shell.

### 31. shell/src/app/app.routes.ts:4-21; shell/src/app/app.config.ts:6-9; shell/src/app/app.html:1-7

**Observação:** `appRoutes` liga os caminhos `customer`, `orders` e `products` aos `<remote>/Routes` e é registrado por `provideRouter(appRoutes)`. O template do shell tem um menu com os três caminhos e um `router-outlet`.

**Interpretação:** O roteamento do host declara a relação host → remotes e apresenta os três remotes numa mesma aplicação.

### 32. orders/src/app/remote-entry/nx-welcome.ts:512; orders/src/app/remote-entry/nx-welcome.ts:3, 7; products/src/app/product-list.ts:4

**Observação:** O template do NxWelcome de orders renderiza `<app-product-list>`. O componente `ProductList` é importado de `../../../../products/src/app/product-list` e declarado em `imports`. O NxWelcome é o componente da rota exposta de orders.

**Interpretação:** O orders embute, em tempo de build, um componente das fontes do products, fora da federação.

### 33. .; package.json:1-47; nx.json:1-51

**Observação:** É a raiz do workspace Nx, com `scripts` vazio, sem entrada nem build de UI.

**Interpretação:** É a raiz de coordenação de um monorepo, e não uma unidade.

### 34. apps/microfrontend-workspace; apps/microfrontend-workspace/project.json:9-24; apps/microfrontend-workspace/src/main.ts:1-5

**Observação:** Tem `index`, `main` e target de build próprios (`@angular-devkit/build-angular:browser`), com bootstrap Angular. As rotas estão vazias.

**Interpretação:** É uma unidade frontend com limite próprio, que não participa da composição.

### 35. customer; customer/project.json:9-26; customer/src/main.ts:1; customer/src/bootstrap.ts:1-5

**Observação:** Tem `index`, `main` e target de build próprios (`@nx/angular:webpack-browser`, webpack próprio), com bootstrap Angular de `RemoteEntry`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 36. orders; orders/project.json:9-26; orders/src/main.ts:1; orders/src/bootstrap.ts:1-5

**Observação:** Tem `index`, `main` e target de build próprios (`@nx/angular:webpack-browser`, webpack próprio), com bootstrap Angular de `RemoteEntry`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 37. products; products/project.json:9-26; products/src/main.ts:1; products/src/bootstrap.ts:1-5

**Observação:** Tem `index`, `main` e target de build próprios (`@nx/angular:webpack-browser`, webpack próprio), com bootstrap Angular de `RemoteEntry`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 38. shell; shell/project.json:9-26; shell/src/main.ts:1; shell/src/bootstrap.ts:1-5

**Observação:** Tem `index`, `main` e target de build próprios (`@nx/angular:webpack-browser`, webpack próprio), com bootstrap Angular de `App`.

**Interpretação:** É uma unidade frontend com limite próprio.

### 39. shell/src/app/app.routes.ts:7; shell/src/app/app.routes.ts:4; shell/module-federation.config.ts:17; customer/module-federation.config.ts:4-7; customer/src/app/remote-entry/entry.routes.ts:4

**Observação:** A rota `customer` do shell carrega `customer/Routes`. O remote `customer` do shell corresponde ao `name: 'customer'` da unidade, que expõe `./Routes`, e o arquivo exposto exporta `remoteRoutes`.

**Interpretação:** É uma relação host → remote ativa.

### 40. shell/src/app/app.routes.ts:11; shell/src/app/app.routes.ts:4; shell/module-federation.config.ts:17; orders/module-federation.config.ts:4-7; orders/src/app/remote-entry/entry.routes.ts:4

**Observação:** A rota `orders` do shell carrega `orders/Routes`. O nome e a chave correspondem à configuração do orders, e o arquivo exposto exporta `remoteRoutes`.

**Interpretação:** É uma relação host → remote ativa.

### 41. shell/src/app/app.routes.ts:15; shell/src/app/app.routes.ts:4; shell/module-federation.config.ts:17; products/module-federation.config.ts:4-7; products/src/app/remote-entry/entry.routes.ts:5-8

**Observação:** A rota `products` do shell carrega `products/Routes`. O nome e a chave correspondem à configuração do products, e o arquivo exposto exporta `remoteRoutes`, com as rotas `''` e `list`.

**Interpretação:** É uma relação host → remote ativa.

### 42. orders/src/app/remote-entry/nx-welcome.ts:512; orders/src/app/remote-entry/nx-welcome.ts:3, 7; orders/src/app/remote-entry/entry.ts:2-7

**Observação:** O orders renderiza `ProductList`, importado das fontes do products por caminho relativo, no componente da sua rota exposta. Nenhuma configuração declara essa ligação.

**Interpretação:** É uma relação ativa entre dois remotes, por inclusão de código-fonte em tempo de build, e não por Module Federation. Ela aparece tanto no orders sozinho quanto dentro do shell.

### 43. apps/microfrontend-workspace/project.json:9-51, 74-80

**Observação:** Target `build` próprio com `@angular-devkit/build-angular:browser`, saída `dist/apps/microfrontend-workspace`, e `serve-static` local. Não há artefato de deploy.

**Interpretação:** Há fronteira de build própria, sem deploy observado.

### 44. customer/project.json:9-27, 43-45, 58-74, 85-92

**Observação:** Target `build` próprio, saída `dist/customer`, com webpack de desenvolvimento e de produção. O `serve` e o `serve-static` usam `http://localhost:4203`. Não há artefato de deploy nem versão própria.

**Interpretação:** Há fronteira de build própria, sem deploy observado.

### 45. orders/project.json:9-27, 43-45, 58-74, 85-92

**Observação:** Target `build` próprio, saída `dist/orders`, com webpack de desenvolvimento e de produção, e porta local 4202. O bundle inclui também o `ProductList` das fontes do products. Não há artefato de deploy nem versão própria.

**Interpretação:** Há fronteira de build própria, sem deploy observado.

### 46. products/project.json:9-27, 43-45, 58-74, 85-92

**Observação:** Target `build` próprio, saída `dist/products`, com webpack de desenvolvimento e de produção, e porta local 4201. Não há artefato de deploy nem versão própria.

**Interpretação:** Há fronteira de build própria, sem deploy observado.

### 47. shell/project.json:9-27, 43-45, 58-63, 84-91

**Observação:** Target `build` próprio, saída `dist/shell`, com webpack de desenvolvimento e de produção. O único servidor é o de desenvolvimento, na porta 4200, que sobe os remotes, além do `serve-static` local. Não há artefato de deploy nem versão própria.

**Interpretação:** Há fronteira de build própria, sem deploy observado. O snapshot não mostra onde os remotes seriam publicados.

### 48. a6a38c9 2026-03-10 (package.json, versão ausente); cf42f3f 2026-03-11 (package.json)

**Observação:** O `package.json` é criado em `a6a38c9` e alterado só em `cf42f3f`, o snapshot. As versões de `a6a38c9` do `package.json` e do `nx.json` não estão disponíveis.

**Interpretação:** Não se sabe quando `@nx/js` entrou nem se foi usada antes. A dúvida é só sobre o passado: no snapshot, ela não é usada.

### 49. a6a38c9 2026-03-10 (package.json, nx.json, versões ausentes); cf42f3f 2026-03-11 (package.json, */webpack.config.ts)

**Observação:** As configurações webpack das quatro unidades federadas só existem a partir de `cf42f3f`, já com `@nx/angular:webpack-browser`. As versões anteriores do `package.json` e do `nx.json` não estão disponíveis.

**Interpretação:** Não se sabe quando `@nx/webpack` entrou nem se algo a usou entre os dois commits. A dúvida é só sobre o passado: no snapshot, ela não é usada.

### 50. a6a38c9 2026-03-10 (package.json, package-lock.json, versões ausentes); cf42f3f 2026-03-11 (package.json)

**Observação:** As versões anteriores do `package.json` e do `package-lock.json` não estão disponíveis, e nenhum commit cria ou remove um script que pudesse invocar `@nx/workspace`.

**Interpretação:** Não se sabe quando `@nx/workspace` entrou nem se foi usada. A dúvida é só sobre o passado: no snapshot, ela não é usada.

### 51. a6a38c9 2026-03-10 (package.json, versão ausente); cf42f3f 2026-03-11 (package.json)

**Observação:** Nenhum dos quatro commits cria ou remove workflow de CI, Dockerfile ou script, e nenhum remove arquivo. Os `scripts` do `package.json` só são legíveis no snapshot, onde estão vazios.

**Interpretação:** Não houve arquivo de automação que invocasse `nx` e depois tenha sido apagado; não se sabe se a versão anterior do `package.json` tinha scripts com `nx`. A dúvida é só sobre o passado: o snapshot continua sem invocação.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:15) | 1 tecnologia | manifesto | — | contexto | fraca | declara #11 |
| 2 | 3.4.2 (package.json:25) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #13; declara #15; declara #17; declara #19 |
| 3 | 3.4.2 (package.json:26) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 4 | 3.4.2 (package.json:27) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 5 | 3.4.2 (package.json:28) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 6 | 3.4.2 (package.json:29) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #12; declara #13; declara #14; declara #15; declara #16; declara #17; declara #18; declara #19; declara #20; declara #21; declara #22; declara #23 |
| 7 | 3.4.2 (package.json:30) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 8 | 3.4.2 (package.json:31) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 9 | 3.4.2 (package.json:32) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 10 | 3.4.2 (package.json:41) | 1 tecnologia | manifesto | — | contexto | ambígua | — |
| 11 | 3.4.2 (package.json:15, Evidência); 3.4.3 (shell, Marcadores); 3.4.6 #5 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38 |
| 12 | 3.4.2 (package.json:25, package.json:29, Evidência); 3.4.3 (customer, Marcadores); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #35; configura #39 |
| 13 | 3.4.2 (package.json:25, package.json:29, Evidência); 3.4.3 (customer, Marcadores e Build); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #35; configura #39 |
| 14 | 3.4.2 (package.json:25, package.json:29, Evidência); 3.4.3 (orders, Marcadores); 3.4.5 #2 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #36; configura #40 |
| 15 | 3.4.2 (package.json:25, package.json:29, Evidência); 3.4.3 (orders, Marcadores e Build); 3.4.5 #2 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #36; configura #40 |
| 16 | 3.4.2 (package.json:25, package.json:29, Evidência); 3.4.3 (products, Marcadores); 3.4.5 #3 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #37; configura #41 |
| 17 | 3.4.2 (package.json:25, package.json:29, Evidência); 3.4.3 (products, Marcadores e Build); 3.4.5 #3 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #37; configura #41 |
| 18 | 3.4.2 (package.json:25, package.json:29, Evidência); 3.4.3 (shell, Marcadores); 3.4.5 #1, #2, #3 (Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #38; configura #39; configura #40; configura #41 |
| 19 | 3.4.2 (package.json:25, package.json:29, Evidência); 3.4.3 (shell, Marcadores e Build); 3.4.5 #1, #2, #3 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38; configura #39; configura #40; configura #41 |
| 20 | 3.4.2 (package.json:29, Evidência); 3.4.3 (customer, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #35 |
| 21 | 3.4.2 (package.json:29, Evidência); 3.4.3 (orders, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #36 |
| 22 | 3.4.2 (package.json:29, Evidência); 3.4.3 (products, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #37 |
| 23 | 3.4.2 (package.json:29, Evidência); 3.4.3 (shell, Marcadores) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #38 |
| 24 | 3.4.4 (shell/src/app/app.routes.ts:7) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #39 |
| 25 | 3.4.4 (shell/src/app/app.routes.ts:11) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #40 |
| 26 | 3.4.4 (shell/src/app/app.routes.ts:15) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #41 |
| 27 | 3.4.4 (customer/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 28 | 3.4.4 (orders/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 29 | 3.4.4 (products/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 30 | 3.4.4 (shell/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 31 | 3.4.4 (shell/src/app/app.routes.ts:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #39; implementa #40; implementa #41 |
| 32 | 3.4.4 (orders/src/app/remote-entry/nx-welcome.ts:512) | 3 código | código-fonte | other | arquitetural | moderada | implementa #42 |
| 33 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 34 | 3.4.3 (apps/microfrontend-workspace) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 35 | 3.4.3 (customer) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 36 | 3.4.3 (orders) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 37 | 3.4.3 (products) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 38 | 3.4.3 (shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 39 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #38; liga #35 |
| 40 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #38; liga #36 |
| 41 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #38; liga #37 |
| 42 | 3.4.5 #4 | 5 composição | código-fonte | other | arquitetural | forte | liga #36; liga #37 |
| 43 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #34 |
| 44 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #35 |
| 45 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #36 |
| 46 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #37 |
| 47 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #38 |
| 48 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #5 |
| 49 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #8 |
| 50 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #9 |
| 51 | 3.4.8 #4 | 8 histórico | histórico | — | contexto | fraca | explica #10 |

## Resumo

Observações: 51. Dimensões (tecnologia: 10, configuração: 13, código: 9, estrutura: 6, composição: 4, build-deploy: 5, documentação: 0, histórico: 4). Força (forte: 9, moderada: 23, fraca: 18, ambígua: 1). Evidência (tecnológica: 18, arquitetural: 20, contexto: 13).

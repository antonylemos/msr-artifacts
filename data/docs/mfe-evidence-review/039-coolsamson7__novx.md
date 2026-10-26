---
schema: 1
id: 1161566940
full_name: coolsamson7/novx
commit: 128ba9a0f9f373210c09948a19bd1b59d9c7673f
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

# 039 — coolsamson7/novx

## Leitura do repositório

É um monorepo Nx de um framework de portal React (`libs/portal`, com `libs/core`, `libs/i18n` e `libs/communication`) e de um app de referência com duas aplicações, o shell `apps/app` e o remote `apps/microfrontend`. O mecanismo de composição fica na biblioteca, e a instância é o par de apps:
- **Configuração:** o webpack do shell declara o remote `microfrontend` (#10); o do remote se declara com esse nome e expõe `./Module` e `./MicrofrontendFeature` (#11); o `manifest.json` do remote lista a feature e o seu componente (#12).
- **Código:** o shell nomeia o remote e a URL no seu `applicationConfig` (#21). A biblioteca busca o manifesto do remote (#22), injeta o `remoteEntry.js` (#20), inicializa o container (#15, #16) e obtém o módulo e o componente expostos (#17, #18, #19). O outlet renderiza o componente carregado (#23).
- **Relação:** isso resulta na relação ativa `apps/app` → `apps/microfrontend` por Module Federation (#33), entre o shell (#25) e o remote (#26).

O que pode enganar:
- As nove dependências são ferramentas do Nx (#1 a #9), sem tecnologia de MFE declarada. O Module Federation vem do próprio webpack.
- O `remotes` estático do shell (#10) declara o remote, mas o caminho que carrega de fato é o da biblioteca, por script e `window[scope]` (#20, #16).
- As quatro libs, `tools/metadata` e `ui` não são unidades frontend (#27 a #32). `libs/portal` contém o mecanismo, mas é uma biblioteca publicada.
- As duas linhas que só declaram os tipos dos globais do webpack (#13, #14) não executam nada.

O que fica ambíguo é o remote como aplicação própria: a entrada do webpack é um módulo vazio, e o `HtmlWebpackPlugin` está comentado (#26). O histórico mostra que o `main`/`index` e o `entry` vêm de estágios diferentes, mas não diz se o remote chegou a rodar sozinho (#45). O papel de remote não é afetado.

O build é separado nos dois apps (#34, #35). Só o shell é publicado, no GitHub Pages, e lá a feature remota não carrega, porque o remote fica em `localhost:3001`.

A documentação apresenta o portal como framework de microfrontends (#37) e descreve os outlets federados, o caso federado e o showcase de shell e microfrontend, todos corroborados (#38, #41, #43). As afirmações sobre a lógica server side (#39) e sobre o parser no build (#40) são parciais, e o componente de servidor para produção não tem artefato (#42). O histórico mostra que o servidor nunca esteve no repositório (#46), mas não mostra se o build já dependeu do scan (#47) nem quando entrou `@nrwl/eslint-plugin-nx` (#44).

## Observações

### 1. package.json:14

**Observação:** `@nrwl/eslint-plugin-nx` (`^19.8.4`) está declarada em `devDependencies`, sem import, plugin ou invocação no snapshot.

**Interpretação:** É uma ferramenta de monorepo declarada e não usada, e não uma tecnologia de MFE.

### 2. package.json:15; nx.json:18-22; apps/app/project.json:56-61

**Observação:** `@nx/eslint` (`22.5.3`) está declarada em `devDependencies`. É plugin em `nx.json` e executor do target `lint` dos projetos.

**Interpretação:** É uma ferramenta de monorepo em uso, e não uma tecnologia de MFE.

### 3. package.json:16; eslint.config.mjs:1-6, 13

**Observação:** `@nx/eslint-plugin` (`22.5.3`) está declarada em `devDependencies`. A configuração do ESLint a importa e aplica a regra `@nx/enforce-module-boundaries`.

**Interpretação:** É uma ferramenta de monorepo em uso, e não uma tecnologia de MFE.

### 4. package.json:17; nx.json:18-19; libs/portal/project.json:32-41

**Observação:** `@nx/js` (`22.5.3`) está declarada em `devDependencies`. É plugin em `nx.json` e executor do target `build:types` de `libs/portal`.

**Interpretação:** É uma ferramenta de monorepo em uso, e não uma tecnologia de MFE.

### 5. package.json:18; nx.json:18-20; libs/portal/project.json:8-31

**Observação:** `@nx/rollup` (`22.5.3`) está declarada em `devDependencies`. É plugin em `nx.json` e executor do target `build` das libs.

**Interpretação:** É uma ferramenta de monorepo em uso, que constrói as bibliotecas, e não uma tecnologia de MFE.

### 6. package.json:19; apps/app/vitest.config.ts:2, 7-8

**Observação:** `@nx/vite` (`22.5.3`) está declarada em `devDependencies`. `nxViteTsPaths` é importado e usado nos `plugins` do Vitest do shell.

**Interpretação:** É uma ferramenta de monorepo em uso nos testes, e não uma tecnologia de MFE.

### 7. package.json:20; apps/app/project.json:62-67; apps/microfrontend/project.json:38-44

**Observação:** `@nx/vitest` (`22.5.3`) está declarada em `devDependencies`. É o executor do target `test` dos projetos.

**Interpretação:** É uma ferramenta de monorepo em uso nos testes, e não uma tecnologia de MFE.

### 8. package.json:21; apps/app/project.json:14-21, 39-44; apps/microfrontend/project.json:14-30

**Observação:** `@nx/webpack` (`22.5.3`) está declarada em `devDependencies`. É o executor dos targets `build` e `serve` dos dois apps, cada um com o seu `webpack.config.js`.

**Interpretação:** É uma ferramenta de monorepo que roda o webpack de cada app. A federação está nos `webpack.config.js` (#10, #11), e não nesta dependência.

### 9. package.json:44; .github/workflows/ci.yml:31-33; nx.json:18-44

**Observação:** `nx` (`22.5.3`) está declarada em `devDependencies`. O CI executa `pnpm nx run-many -t lint test build`, e `nx.json` configura plugins, `release` e `targetDefaults`.

**Interpretação:** É a ferramenta de monorepo que coordena os projetos, e não uma tecnologia de MFE.

### 10. apps/app/webpack.config.js:6-11, 78-95

**Observação:** O `ModuleFederationPlugin` declara `name: "app"`, `filename: "remoteEntry.js"` e o remote `microfrontend: "microfrontend@http://localhost:3001/remoteEntry.js"`. Compartilha como singletons `eager` `react`, `react-dom`, `react-router-dom`, `react/jsx-runtime`, `reflect-metadata` e as quatro libs `@novx/*`.

**Interpretação:** A configuração do host declara o remote `microfrontend` e onde encontrá-lo em desenvolvimento. As libs do framework entram como dependências compartilhadas, e não como unidades.

### 11. apps/microfrontend/webpack.config.js:5-10, 53-69

**Observação:** O `ModuleFederationPlugin` declara `name: 'microfrontend'` e `filename: 'remoteEntry.js'`, expõe `./Module` (`./apps/microfrontend/src/Module`) e `./MicrofrontendFeature` (`./apps/microfrontend/src/feature`) e compartilha as mesmas bibliotecas como singletons `eager`.

**Interpretação:** `apps/microfrontend` está configurado como remote e oferece um módulo e uma feature a um host.

**Nota:** A porta 3001 do dev server (linha 18), citada na 3.4.5 e na 3.4.6, a própria 3.4.5 marca como "só corrobora"; o `output` (linhas 26-30) é build. Nenhum dos dois entra nesta observação.

### 12. apps/microfrontend/public/manifest.json:1-28

**Observação:** O manifesto declara `"id": "microfrontend"` e uma feature com `"path": "/microfrontend/feature"` e `"component": "MicrofrontendFeature"`, além de `"moduleName": "MicrofrontendModule"`.

**Interpretação:** O remote descreve, no manifesto que o portal busca em runtime, a própria feature e o componente que a serve.

### 13. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:11

**Observação:** `declare function __webpack_init_sharing__(scope: string): Promise<void>`, sob o comentário "Webpack MF globals".

**Interpretação:** Só declara para o TypeScript o tipo de um global do Module Federation. Não participa da composição.

### 14. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:12

**Observação:** `declare const __webpack_share_scopes__: { default: unknown }`.

**Interpretação:** Só declara para o TypeScript o tipo de um global do Module Federation. Não participa da composição.

### 15. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46

**Observação:** `await __webpack_init_sharing__('default')`, dentro de `initializeRemote(scope)`.

**Interpretação:** O framework inicializa o escopo compartilhado antes de iniciar o container de um remote recebido por parâmetro.

### 16. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54

**Observação:** `await remoteContainer.init(__webpack_share_scopes__.default)`, com o container obtido de `window[scope]` (linha 47).

**Interpretação:** O framework inicializa o container do remote cujo nome recebe por parâmetro.

### 17. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:57

**Observação:** `loadRemoteModule(scope, module, url)` carrega `${url}/remoteEntry.js`, inicializa o container e obtém a factory do módulo pedido em `window[scope].get(...)`.

**Interpretação:** É o carregador genérico de módulos federados do framework, que recebe o remote por parâmetro.

### 18. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106

**Observação:** `RemoteComponentLoader.loadRemoteModule(feature.module!, './Module', feature.uri!)`.

**Interpretação:** O framework pede o módulo raiz `./Module` do remote que a feature indica.

### 19. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137

**Observação:** ``outlet.component = await RemoteComponentLoader.loadRemoteModule(feature.module!, `./${feature.component}`, feature.uri!)``.

**Interpretação:** O framework obtém do remote o componente da feature e o entrega ao outlet.

### 20. libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32

**Observação:** `document.createElement('script')` com `script.src = url` e `document.head.appendChild(script)`, em `loadRemoteEntry`.

**Interpretação:** O framework carrega o `remoteEntry.js` de um remote por script dinâmico.

### 21. apps/app/src/environments/environments.ts:8

**Observação:** `{ name: 'microfrontend', url: 'http://localhost:3001' }` na lista `remotes` do deployment `microfrontend`, que é o deployment ativo (linha 2).

**Interpretação:** O shell declara, no seu código, o remote que usa e onde ele está.

### 22. libs/portal/src/lib/loader/remote-loader.ts:28

**Observação:** ``fetch(`${remote.url}/manifest.json`)``, seguido da gravação de `id`, `uri` e `module` com o nome e a URL do remote (linhas 39-41).

**Interpretação:** O framework descobre as features de cada remote da lista que recebe, pelo manifesto dele.

### 23. libs/portal/src/lib/feature-outlet.tsx:245

**Observação:** `<LoadedWrapper Component={Loaded} feature={feature} />`, dentro do `EnvironmentContext.Provider` do módulo carregado.

**Interpretação:** O outlet renderiza o componente que os loaders carregaram. No caminho federado, esse componente vem do remote.

### 24. .; package.json:1-78

**Observação:** É a raiz do workspace, com scripts que só delegam ao nx (`package.json:8-10`), sem entrada ou build de UI.

**Interpretação:** É a raiz de coordenação do monorepo, e não uma unidade.

### 25. apps/app; apps/app/package.json:1-18; apps/app/project.json:14-38; apps/app/webpack.config.js:14, 96-98; apps/app/src/main.tsx:27-32

**Observação:** É uma aplicação React com manifesto e projeto Nx próprios, entrada `main.tsx` que monta a UI com `createRoot(...).render(<App />)` e build webpack com `HtmlWebpackPlugin`.

**Interpretação:** É uma unidade frontend com limite próprio, o shell.

### 26. apps/microfrontend; apps/microfrontend/package.json:1-14; apps/microfrontend/project.json:14-23; apps/microfrontend/webpack.config.js:13-14, 70-72; apps/microfrontend/src/bootstrap.ts:1; apps/microfrontend/src/main.tsx:1-7

**Observação:** Tem manifesto, projeto Nx e build webpack próprios. A entrada do webpack é `bootstrap.ts`, que só contém `export {};`; o `main.tsx` do `project.json` só faz imports, sem render; o `HtmlWebpackPlugin` está comentado.

**Interpretação:** Duas leituras continuam plausíveis: é uma unidade frontend que roda sozinha por um caminho que o snapshot não mostra, ou é só um container de módulos remotos, sem UI própria. O papel de remote não depende disso.

### 27. libs/communication; libs/communication/package.json:1-4; libs/communication/project.json:8-9

**Observação:** `@novx/communication` ("Communication library"), com build Rollup e publicação no npm por `release.sh`, sem entrada de aplicação.

**Interpretação:** É uma biblioteca, e não uma unidade frontend.

### 28. libs/core; libs/core/package.json:1-4; libs/core/project.json:8-9

**Observação:** `@novx/core` ("DI and AOP library"), com build Rollup e publicação no npm por `release.sh`, sem entrada de aplicação.

**Interpretação:** É uma biblioteca, e não uma unidade frontend.

### 29. libs/i18n; libs/i18n/package.json:1-4; libs/i18n/project.json:8-9

**Observação:** `@novx/i18n` ("i18n library"), com build Rollup e publicação no npm por `release.sh`, sem entrada de aplicação.

**Interpretação:** É uma biblioteca, e não uma unidade frontend.

### 30. libs/portal; libs/portal/package.json:1-4; libs/portal/project.json:8-31

**Observação:** `@novx/portal` ("Portal library"), com build Rollup a partir de `src/index.ts` e publicação no npm por `release.sh`, sem entrada de aplicação.

**Interpretação:** É a biblioteca que contém o mecanismo de composição (#15 a #23), e não uma unidade frontend.

### 31. tools/metadata; tools/metadata/package.json:1-8; tools/metadata/project.json:6-16

**Observação:** `@tools/metadata`, com `bin: build-metadata` e os targets `build` (`tsc`) e `scan` (`tsx`).

**Interpretação:** É uma ferramenta de build que gera os manifestos, e não uma unidade frontend.

### 32. ui; ui/package.json:1-4, 35; ui/rollup.config.json:1-13

**Observação:** `@novx/ui` ("ui library"), com configuração de biblioteca Rollup, fora do workspace pnpm e sem `project.json` ativo (só `ui/project.json.txt`).

**Interpretação:** É uma biblioteca desativada, e não uma unidade frontend.

### 33. apps/app/src/environments/environments.ts:8; apps/app/webpack.config.js:82-84; apps/microfrontend/webpack.config.js:54-58; apps/microfrontend/public/manifest.json:2-10; libs/portal/src/lib/loader/remote-loader.ts:28; libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32, 46, 54, 57, 106, 137; libs/portal/src/lib/feature-outlet.tsx:245; apps/app/src/module.ts:226, 262, 317

**Observação:** O shell declara o remote `microfrontend` em `http://localhost:3001` e instancia os loaders do portal. O nome é o `name` do container do remote e o `id` do seu manifesto, e os módulos pedidos, `./Module` e `./MicrofrontendFeature`, são os expostos.

**Interpretação:** É uma relação host → remote ativa, por Module Federation, carregada em runtime pelo framework do portal.

### 34. apps/app/project.json:14-38; apps/app/webpack.config.js:18-23; .github/workflows/docs.yml:34-37, 48-57, 59-69

**Observação:** Tem target `build` e saída `dist/apps/app` próprios. O workflow de docs constrói só este app em produção, copia a saída para `sample/` e publica no GitHub Pages.

**Interpretação:** Há fronteiras de build e de deploy próprias. A versão publicada aponta o remote para `localhost:3001`.

### 35. apps/microfrontend/project.json:14-23; apps/microfrontend/webpack.config.js:26-30; .github/workflows/ci.yml:33

**Observação:** Tem target `build` e saída próprios. O CI o constrói junto com os demais projetos, sem publicar; só o dev server da porta 3001 o serve.

**Interpretação:** Há uma fronteira de build própria, sem deploy observado.

### 36. README.md:9

**Observação:** "NOVX is a monorepo covering a number of Typescript and React solutions in individual packages".

**Interpretação:** Descreve o repositório como monorepo de pacotes, as quatro libs que lista, sem falar de unidades frontend. A afirmação é corroborada.

### 37. README.md:14

**Observação:** "[portal]...a react microfrontend framework".

**Interpretação:** Apresenta o pacote `portal` como framework de microfrontends. A afirmação é corroborada.

### 38. libs/portal/README.md:14

**Observação:** "feature outlets that cover both local and federated components and allow for custom async preloading logic".

**Interpretação:** Afirma que os outlets do framework renderizam componentes locais e federados. A afirmação é corroborada.

### 39. libs/portal/README.md:15

**Observação:** "custom application configurations with support for both client and server side logic".

**Interpretação:** Afirma que a configuração das features pode vir do cliente ou do servidor. O lado cliente do modo `service` existe, mas o servidor não está no snapshot. A afirmação é parcial.

### 40. libs/portal/README.md:36

**Observação:** "A parser - as part of the build - will locate those features and generate a `manifest.json`".

**Interpretação:** Afirma que o manifesto é gerado no build. O target `scan-metadata` existe nos dois apps, mas nenhum `build` depende dele. A afirmação é parcial.

### 41. libs/portal/README.md:205-212

**Observação:** "Federated modules will take a similar approach... The main application will only need to change the corresponding deployment loader to integrate it" / "the manifest is fetched dynamically from the known url and merged with the local manifest".

**Interpretação:** Descreve como a aplicação principal integra módulos federados pelo manifesto de cada remote. A afirmação é corroborada.

### 42. libs/portal/README.md:214-216

**Observação:** "in production the logic would be handed over to a server component that is aware of different microfrontends and configurations also including more sophisticated logic to filter features according to feature flags".

**Interpretação:** Projeta um componente de servidor para produção. Nenhum artefato o confirma ou desmente; a afirmação fica sem corroboração.

### 43. libs/portal/README.md:220

**Observação:** "A showcase app shows a shell and a microfreontend".

**Interpretação:** Descreve o app de referência como um shell e um microfrontend. A afirmação é corroborada.

### 44. d1267d3 2026-02-24 (package.json, versão ausente); 8e0388e 2026-03-16 (package.json)

**Observação:** `package.json` aparece em `d1267d3` e muda em 32 commits. A versão de `8e0388e` é a do snapshot e já traz a dependência; as anteriores e a primeira versão de `eslint.config.mjs` não estão disponíveis.

**Interpretação:** Não se sabe quando `@nrwl/eslint-plugin-nx` entrou nem se já foi usado. A dúvida é só sobre o passado: no snapshot, a dependência não é usada.

### 45. 45b448f 2026-02-26 (apps/microfrontend/src/main.tsx, src/index.html); ed4e20e 2026-02-26 (apps/microfrontend/project.json, webpack.config.js); 3086f67 2026-02-26 (apps/microfrontend/index.html, project.json); c46ce96 2026-02-27 (apps/microfrontend/webpack.config.js); dd4543f 2026-02-27 (apps/microfrontend/src/bootstrap.ts); 5d8c3af 2026-03-06 (apps/microfrontend/webpack.config.js)

**Observação:** `main.tsx` e `src/index.html` são do primeiro estágio do app; `src/index.html` é movido em `3086f67` e não volta. `bootstrap.ts`, com `export {};`, é criado em `dd4543f`, logo depois de uma mudança no webpack. As versões antigas do webpack e do `project.json` não estão disponíveis.

**Interpretação:** O `main`/`index` do `project.json` e o `entry` do webpack vêm de estágios diferentes. O ponto está esclarecido quanto aos estágios, mas o histórico não diz se o remote chegou a rodar sozinho.

### 46. d668c15 2026-02-26 (libs/portal/src/lib/loader/service-loader.ts, libs/portal/src/lib/service/)

**Observação:** O cliente do modo `service` entra em `d668c15` e não muda até o snapshot. Nenhuma das árvores consultadas tem diretório de servidor.

**Interpretação:** O repositório teve só o lado cliente desde que o modo `service` entrou. O ponto está esclarecido.

### 47. 073c63f 2026-02-26 (tools/metadata, apps/app/project.json, versão ausente); 3086f67 2026-02-26 (apps/microfrontend/public/manifest.json); 144cc29 2026-02-27 (apps/microfrontend/public/manifest.json); 9c90397 2026-03-06 (tools/metadata); 5d8c3af 2026-03-06 (apps/microfrontend/webpack.config.js)

**Observação:** `tools/metadata` entra em `073c63f` e muda uma vez. O manifesto do remote é movido de `src/` para `public/` em `3086f67`, mas o `outFile` do scan ainda aponta para `src/manifest.json`. As versões antigas dos `project.json` e do `nx.json` não estão disponíveis.

**Interpretação:** Não se sabe se o `build` já dependeu do `scan-metadata`. A dúvida é só sobre o passado: no snapshot, nenhum build depende dele.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:14) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 2 | 3.4.2 (package.json:15) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 3 | 3.4.2 (package.json:16) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 4 | 3.4.2 (package.json:17) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 5 | 3.4.2 (package.json:18) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 6 | 3.4.2 (package.json:19) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 7 | 3.4.2 (package.json:20) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 8 | 3.4.2 (package.json:21) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 9 | 3.4.2 (package.json:44) | 1 tecnologia | manifesto | — | contexto | fraca | — |
| 10 | 3.4.3 (apps/app, Marcadores, Entrada e Build); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #25; configura #33 |
| 11 | 3.4.3 (apps/microfrontend, Marcadores, Entrada e Build); 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54, :106, :137, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #26; configura #33 |
| 12 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137; libs/portal/src/lib/loader/remote-loader.ts:28, Observação); 3.4.5 #1 (Configuração) | 2 configuração | configuração | — | tecnológica | moderada | configura #26; configura #33 |
| 13 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:11) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 14 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:12) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 15 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:46) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 16 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:54) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 17 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:57) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 18 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:106) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 19 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:137) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 20 | 3.4.4 (libs/portal/src/lib/outlet-loader/remote-component-loader.ts:32) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #33 |
| 21 | 3.4.4 (apps/app/src/environments/environments.ts:8) | 3 código | código-fonte | — | arquitetural | forte | implementa #33 |
| 22 | 3.4.4 (libs/portal/src/lib/loader/remote-loader.ts:28) | 3 código | código-fonte | — | tecnológica | moderada | implementa #33 |
| 23 | 3.4.4 (libs/portal/src/lib/feature-outlet.tsx:245) | 3 código | código-fonte | — | tecnológica | moderada | implementa #33 |
| 24 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 25 | 3.4.3 (apps/app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 26 | 3.4.3 (apps/microfrontend) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 27 | 3.4.3 (libs/communication) | 4 estrutura | diretório | — | contexto | fraca | — |
| 28 | 3.4.3 (libs/core) | 4 estrutura | diretório | — | contexto | fraca | — |
| 29 | 3.4.3 (libs/i18n) | 4 estrutura | diretório | — | contexto | fraca | — |
| 30 | 3.4.3 (libs/portal) | 4 estrutura | diretório | — | contexto | fraca | — |
| 31 | 3.4.3 (tools/metadata) | 4 estrutura | diretório | — | contexto | fraca | — |
| 32 | 3.4.3 (ui) | 4 estrutura | diretório | — | contexto | fraca | — |
| 33 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #25; liga #26 |
| 34 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #25 |
| 35 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #26 |
| 36 | 3.4.7 #1 | 7 documentação | documentação | — | contexto | fraca | corrobora pnpm-workspace.yaml:1-3; corrobora nx.json:18-44 |
| 37 | 3.4.7 #2 | 7 documentação | documentação | — | tecnológica | fraca | corrobora #25; corrobora #33 |
| 38 | 3.4.7 #3 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #18; corrobora #19; corrobora #23; corrobora #33 |
| 39 | 3.4.7 #4 | 7 documentação | documentação | — | tecnológica | fraca | corrobora em parte apps/app/src/module.ts:221-228; corrobora em parte libs/portal/src/lib/loader/service-loader.ts:15-16; corrobora em parte libs/portal/src/lib/service/PortalService.ts:28-41; corrobora em parte apps/app/src/environments/environments.ts:2-5 |
| 40 | 3.4.7 #5 | 7 documentação | documentação | — | tecnológica | fraca | corrobora em parte apps/app/project.json:9-14; corrobora em parte apps/microfrontend/project.json:9-14; corrobora em parte #31 |
| 41 | 3.4.7 #6 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #33; corrobora #21; corrobora #22 |
| 42 | 3.4.7 #7 | 7 documentação | documentação | — | contexto | fraca | — |
| 43 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #25; corrobora #33 |
| 44 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #1 |
| 45 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #26 |
| 46 | 3.4.8 #3 | 8 histórico | histórico | — | contexto | fraca | explica #39 |
| 47 | 3.4.8 #4 | 8 histórico | histórico | — | tecnológica | fraca | explica #40 |

## Resumo

Observações: 47. Dimensões (tecnologia: 9, configuração: 3, código: 11, estrutura: 9, composição: 1, build-deploy: 2, documentação: 8, histórico: 4). Força (forte: 3, moderada: 13, fraca: 30, ambígua: 1). Evidência (tecnológica: 17, arquitetural: 10, contexto: 20).

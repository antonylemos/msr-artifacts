---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
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

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Leitura do repositório

A cadeia combina manifestos single-spa (#2, #5, #10, #13), configurações próprias de build e lifecycles (#18, #20, #23; #37, #39, #41) e registros do root (#42–#44). O mapa local (#21) resolve os três bundles; as relações #76–#78 ligam o root às aplicações Angular, React/webpack e React/Vite, com ativação por rota. Os limites e builds separados (#69, #71, #72, #73; #82–#85) sustentam a independência relativa das unidades.

As aplicações também compartilham estado por um BehaviorSubject (#68); externalização e resolução do mesmo módulo sustentam as três relações events (#79–#81). As bibliotecas common-lib-webpack e styleguide não são aplicações (#70, #74). A unidade Vue tem entrada e build próprios, mas nenhuma relação com o root (#75, #86).

A composição demonstrada é local: o mapa das aplicações depende de isLocal, e o de produção está comentado (#21, #25). Os builds são separados, mas nenhum deploy ou versionamento independente foi observado (#82–#86). Scripts de bibliotecas, painel de desenvolvimento e chamadas comentadas não equivalem a relações entre unidades. As declarações Undetermined (#6, #14–#16) continuam ambíguas quanto ao uso dos pacotes instalados; a presença do carregador CDN e da composição local não depende de resolver isso. O histórico (#90–#101) delimita a continuidade desde o commit inicial ou resolve comentários pelo próprio snapshot, sem transformar essas dependências em Yes. O README (#87–#89) corrobora a organização em caráter semântico.

## Observações

### 1. angular-app/package.json:25

**Observação:** O manifesto declara `single-spa` em `dependencies`, versão `^5.9.3`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 2. angular-app/package.json:26

**Observação:** O manifesto declara `single-spa-angular` em `dependencies`, versão `^5.0.1`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 3. common-lib-webpack/package.json:22

**Observação:** O manifesto declara `@types/systemjs` em `devDependencies`, versão `^6.15.3`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 4. react-app/package.json:60

**Observação:** O manifesto declara `@types/systemjs` em `dependencies`, versão `^6.1.0`.

**Interpretação:** A declaração é um sinal isolado sem uso configurado nessa unidade, conforme a revisão; não demonstra composição.

### 5. react-app/package.json:44

**Observação:** O manifesto declara `single-spa-react` em `devDependencies`, versão `^4.0.0`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 6. react-app/package.json:45

**Observação:** O manifesto declara `ts-config-single-spa` em `devDependencies`, versão `^2.0.0`.

**Interpretação:** A declaração admite uso indireto pelo build ou presença sem uso da cópia instalada; o snapshot não permite decidir entre essas leituras.

### 7. react-app/package.json:49

**Observação:** O manifesto declara `webpack-config-single-spa-react` em `devDependencies`, versão `^2.0.0`.

**Interpretação:** A declaração é um sinal isolado sem uso configurado nessa unidade, conforme a revisão; não demonstra composição.

### 8. react-app/package.json:50

**Observação:** O manifesto declara `webpack-config-single-spa-react-ts` em `devDependencies`, versão `^2.0.0`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 9. react-app/package.json:51

**Observação:** O manifesto declara `webpack-config-single-spa-ts` em `devDependencies`, versão `^2.0.0`.

**Interpretação:** A declaração é um sinal isolado sem uso configurado nessa unidade, conforme a revisão; não demonstra composição.

### 10. react-vite-app/package.json:17

**Observação:** O manifesto declara `single-spa-react` em `dependencies`, versão `^6.0.2`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 11. react-vite-app/package.json:19

**Observação:** O manifesto declara `systemjs` em `dependencies`, versão `^6.15.1`.

**Interpretação:** A declaração é um sinal isolado sem uso configurado nessa unidade, conforme a revisão; não demonstra composição.

### 12. react-vite-app/package.json:36

**Observação:** O manifesto declara `vite-plugin-single-spa` em `devDependencies`, versão `^1.0.0`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 13. root-config/package.json:47

**Observação:** O manifesto declara `single-spa` em `dependencies`, versão `^5.8.2`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 14. root-config/package.json:48

**Observação:** O manifesto declara `systemjs` em `dependencies`, versão `^6.15.1`.

**Interpretação:** O carregador SystemJS roda pela CDN; a declaração não permite decidir se a cópia instalada também participa indiretamente do build ou se permanece sem uso. A composição local está demonstrada por outras observações.

### 15. root-config/package.json:23

**Observação:** O manifesto declara `@types/systemjs` em `devDependencies`, versão `^6.15.3`.

**Interpretação:** A declaração admite uso indireto pelo build ou presença sem uso da cópia instalada; o snapshot não permite decidir entre essas leituras.

### 16. root-config/package.json:36

**Observação:** O manifesto declara `ts-config-single-spa` em `devDependencies`, versão `^2.0.0`.

**Interpretação:** A declaração admite uso indireto pelo build ou presença sem uso da cópia instalada; o snapshot não permite decidir entre essas leituras.

### 17. root-config/package.json:40

**Observação:** O manifesto declara `webpack-config-single-spa-ts` em `devDependencies`, versão `^2.0.0`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a revisão registra configuração ou uso, representado separadamente nas observações seguintes.

### 18. angular-app/angular.json:20-71

**Observação:** O target build usa custom-webpack, entrada src/main.single-spa.ts, libraryName angular-app e libraryTarget umd; a saída é dist/angular-app e deployUrl é localhost:4200.

**Interpretação:** Parametriza a aplicação Angular para integração single-spa, sem nomear outra unidade.

### 19. angular-app/extra-webpack.config.js:1-61

**Observação:** A configuração aplica singleSpaAngularWebpack e externaliza @myapp/common-lib-webpack como @paok/common-lib-webpack.

**Interpretação:** Configura o adaptador single-spa e o consumo do módulo compartilhado na aplicação Angular.

### 20. react-app/webpack.config.js:1-19

**Observação:** O preset webpack-config-single-spa-react-ts recebe orgName org1 e projectName react-app; common-lib-webpack e styleguide são externos.

**Interpretação:** Configura uma aplicação single-spa e suas dependências compartilhadas, sem registrar aplicações de destino.

### 21. root-config/src/index.ejs:62-85

**Observação:** Sob isLocal, o import map associa @org1/root-config, @org1/react-app, angular-app e react-vite-app aos bundles localhost nas portas 9000, 8080, 4200 e 3001; também mapeia styleguide e @paok/common-lib-webpack. Scopes distinguem os React das duas aplicações.

**Interpretação:** Liga explicitamente o root e as três aplicações por resolução SystemJS no caminho local; também resolve os módulos compartilhados.

**Nota:** Os mapas declarativos deste template têm observações de configuração. O script executável com System.set, System.addImportMap e System.import não gera observação adicional na dimensão 2. common-lib-webpack/webpack.config.js só declara entrada e formato de saída SystemJS, sem builder de composição, remote, módulo exposto ou dependências compartilhadas; os trechos citados continuam nos artefatos das relações, sem observação própria de configuração. Aliases, tipos TypeScript e portas isoladas também não acrescentam blocos.

### 22. root-config/webpack.config.js:1-29

**Observação:** O preset webpack-config-single-spa-ts recebe orgName org1 e projectName root-config; HtmlWebpackPlugin lê src/index.ejs e repassa isLocal.

**Interpretação:** Configura o build do root single-spa e a condição usada pela página para emitir o mapa local.

### 23. react-vite-app/vite.config.ts:7-67

**Observação:** O Vite produz formato system, externaliza React e bibliotecas compartilhadas e aplica vitePluginSingleSpa com type mife, serverPort 3001 e spaEntryPoints src/spa.tsx.

**Interpretação:** Prepara a aplicação React/Vite e seus lifecycles para single-spa. O alias participa da mesma configuração; não constitui outra observação.

### 24. root-config/src/index.ejs:50-56

**Observação:** Um systemjs-importmap associa single-spa ao bundle system single-spa@5.9.0 na CDN.

**Interpretação:** Configura a resolução do orquestrador, sem ligar aplicações por si só.

### 25. root-config/src/index.ejs:59-60

**Observação:** Um script systemjs-importmap com src /importmap.json está dentro de comentário HTML.

**Interpretação:** O mapa de produção é inativo; não demonstra resolução de unidades em produção.

**Nota:** Força fraca porque o bloco está comentado: não configura um mapa ativo.

### 26. styleguide/vite.config.ts:9-42

**Observação:** O build.lib entra em src/styleguide.ts, declara formato system e externaliza React, ReactDOM e MUI.

**Interpretação:** Configura a biblioteca visual compartilhada para consumo externo, sem estabelecer uma aplicação composta.

### 27. root-config/src/index.ejs:35-48

**Observação:** O import map nativo associa React 19, React 16, ReactDOM e MUI a endereços CDN.

**Interpretação:** Configura resolução de bibliotecas compartilhadas; não nomeia unidades frontend.

### 28. angular-app/src/main.single-spa.ts:112; angular-app/src/main.single-spa.ts:20-31

**Observação:** Exporta bootstrap = lifecycles.bootstrap.

**Interpretação:** Expõe o contrato de inicialização single-spa da aplicação Angular.

### 29. angular-app/src/main.single-spa.ts:113; angular-app/src/main.single-spa.ts:100-110

**Observação:** Exporta mount = [mountStyles, lifecycles.mount]; mountStyles reativa estilos com atributo paokOle.

**Interpretação:** Prepara montagem da aplicação Angular e de seus estilos pelo orquestrador.

### 30. angular-app/src/main.single-spa.ts:114; angular-app/src/main.single-spa.ts:61-98

**Observação:** Exporta unmount = [unmountStyles, lifecycles.unmount]; unmountStyles desativa os estilos paokOle.

**Interpretação:** Prepara desmontagem da aplicação Angular e seus estilos.

### 31. react-vite-app/src/spa.tsx:99; react-vite-app/src/spa.tsx:8-15; react-vite-app/src/spa.tsx:98

**Observação:** Exporta bootstrap = [cssLc.bootstrap, lc.bootstrap].

**Interpretação:** Combina inicialização de CSS e React nos lifecycles single-spa da aplicação Vite.

### 32. react-vite-app/src/spa.tsx:100; react-vite-app/src/spa.tsx:84-94

**Observação:** Exporta mount = [cssLc.mount, mountStyles, lc.mount]; mountStyles reativa estilos paok.

**Interpretação:** Prepara montagem de React e CSS no contrato single-spa da aplicação Vite.

### 33. react-vite-app/src/spa.tsx:101; react-vite-app/src/spa.tsx:51-82

**Observação:** Exporta unmount = [cssLc.unmount, unmountStyles, lc.unmount].

**Interpretação:** Prepara desmontagem de React e CSS no contrato single-spa da aplicação Vite.

### 34. angular-app/extra-webpack.config.js:1; angular-app/extra-webpack.config.js:1-2

**Observação:** Importa single-spa-angular/lib/webpack por require.

**Interpretação:** É adaptador de build, não composição em runtime; a configuração própria tem observação na dimensão 2.

### 35. angular-app/extra-webpack.config.js:5; angular-app/extra-webpack.config.js:5-10

**Observação:** Chama singleSpaAngularWebpack(config, options) e adiciona o external da biblioteca comum.

**Interpretação:** Ajusta o build da aplicação Angular, sem carregar ou montar outra unidade.

### 36. angular-app/src/main.single-spa.ts:7

**Observação:** Importa singleSpaAngular de single-spa-angular.

**Interpretação:** Disponibiliza o adaptador de lifecycles usado pela entrada Angular.

### 37. angular-app/src/main.single-spa.ts:20; angular-app/src/main.single-spa.ts:20-31

**Observação:** Chama singleSpaAngular com bootstrapFunction, template app-root, Router, NavigationStart e NgZone; repassa props ao subject.

**Interpretação:** Adapta a aplicação Angular ao contrato single-spa, sem nomear outra unidade.

### 38. react-app/src/org1-react-app.tsx:3

**Observação:** Importa singleSpaReact.

**Interpretação:** Disponibiliza o adaptador de lifecycles usado pela aplicação React.

### 39. react-app/src/org1-react-app.tsx:6; react-app/src/org1-react-app.tsx:6-16

**Observação:** Chama singleSpaReact com React, ReactDOM e rootComponent Root e exporta bootstrap, mount e unmount.

**Interpretação:** Adapta a aplicação React ao contrato single-spa, sem nomear outra unidade.

### 40. react-vite-app/src/spa.tsx:3

**Observação:** Importa singleSpaReact.

**Interpretação:** Disponibiliza o adaptador usado pela entrada single-spa de React/Vite.

### 41. react-vite-app/src/spa.tsx:8; react-vite-app/src/spa.tsx:8-15

**Observação:** Chama singleSpaReact com React, ReactDOMClient e rootComponent App.

**Interpretação:** Prepara os lifecycles da aplicação React/Vite, combinados com os de CSS nas exportações.

### 42. root-config/src/org1-root-config.ts:3; root-config/src/org1-root-config.ts:3-7

**Observação:** Registra @org1/react-app, com System.import do mesmo nome e activeWhen /react.

**Interpretação:** Liga o root à aplicação React por registro e ativação de rota single-spa.

### 43. root-config/src/org1-root-config.ts:9; root-config/src/org1-root-config.ts:9-13

**Observação:** Registra angular-app, com System.import do mesmo nome e activeWhen /angular.

**Interpretação:** Liga o root à aplicação Angular por registro e ativação de rota single-spa.

### 44. root-config/src/org1-root-config.ts:15; root-config/src/org1-root-config.ts:15-19

**Observação:** Registra react-vite-app, com System.import do mesmo nome e activeWhen /react-vite.

**Interpretação:** Liga o root à aplicação React/Vite por registro e ativação de rota single-spa.

### 45. react-vite-app/src/App.tsx:26; react-vite-app/src/App.tsx:20-34

**Observação:** Contém System.import de styleguide num useEffect comentado.

**Interpretação:** A construção está inativa; não estabelece carga dinâmica de unidade frontend.

### 46. root-config/src/index.ejs:22

**Observação:** Um comentário instrui a descomentar a restrição de import-map-overrides por ambiente.

**Interpretação:** É orientação do template, sem composição ativa.

### 47. root-config/src/index.ejs:23

**Observação:** Um comentário contém link para a documentação de import-map-overrides.

**Interpretação:** É referência do template, sem composição ativa.

### 48. root-config/src/index.ejs:24

**Observação:** A meta import-map-overrides-domains com denylist:prod.example.com está comentada.

**Interpretação:** Não ativa restrição nem demonstra configuração de produção.

### 49. root-config/src/index.ejs:35; root-config/src/index.ejs:35-48

**Observação:** Um script importmap mapeia React, ReactDOM e MUI para CDNs.

**Interpretação:** É resolução tecnológica de bibliotecas compartilhadas, não composição de unidades.

### 50. root-config/src/index.ejs:50; root-config/src/index.ejs:50-56

**Observação:** Um systemjs-importmap mapeia single-spa para CDN.

**Interpretação:** Resolve a biblioteca do orquestrador, não outra unidade frontend.

### 51. root-config/src/index.ejs:60

**Observação:** Um systemjs-importmap externo /importmap.json está comentado.

**Interpretação:** O mapa de produção está inativo e não compõe unidades nesse caminho.

### 52. root-config/src/index.ejs:63; root-config/src/index.ejs:62-85

**Observação:** Um systemjs-importmap local mapeia root, três aplicações e duas bibliotecas para URLs localhost e define scopes de React.

**Interpretação:** Resolve explicitamente unidades frontend distintas para os registros do root no modo local.

### 53. root-config/src/index.ejs:93

**Observação:** Carrega import-map-overrides@2.2.0 de CDN.

**Interpretação:** É ferramenta de desenvolvimento do import map, não bundle de outra unidade.

### 54. root-config/src/index.ejs:135

**Observação:** Executa System.import de @org1/root-config dentro de script module.

**Interpretação:** Carrega o próprio root; não é relação entre unidades.

### 55. root-config/src/index.ejs:197

**Observação:** Contém chamada System.import de @org1/root-config comentada.

**Interpretação:** A chamada está inativa e seria interna ao root.

### 56. root-config/src/index.ejs:199

**Observação:** Declara import-map-overrides-full com show-when-local-storage devtools e dev-libs.

**Interpretação:** É painel de desenvolvimento, não custom element de outra unidade frontend.

### 57. root-config/src/org1-root-config.ts:5

**Observação:** A função app chama System.import de @org1/react-app.

**Interpretação:** Carrega em runtime os lifecycles da aplicação React registrada no root.

### 58. root-config/src/org1-root-config.ts:11

**Observação:** A função app chama System.import de angular-app.

**Interpretação:** Carrega em runtime os lifecycles da aplicação Angular registrada no root.

### 59. root-config/src/org1-root-config.ts:17

**Observação:** A função app chama System.import de react-vite-app.

**Interpretação:** Carrega em runtime os lifecycles da aplicação React/Vite registrada no root.

### 60. root-config/src/index.ejs:14

**Observação:** Carrega regenerator-runtime@0.13.7 de CDN.

**Interpretação:** É polyfill de Babel, sem composição de unidades.

### 61. root-config/src/index.ejs:91

**Observação:** Um script de CDN de zone.js@0.11.3 está comentado.

**Interpretação:** O trecho está inativo e se refere a biblioteca, não unidade frontend.

### 62. root-config/src/index.ejs:93

**Observação:** Carrega import-map-overrides@2.2.0 de CDN.

**Interpretação:** É a mesma ferramenta de desenvolvimento registrada por outro padrão, sem carregar uma unidade.

### 63. root-config/src/index.ejs:95

**Observação:** Carrega systemjs@6.15.1/dist/system.js de CDN no ramo local.

**Interpretação:** Fornece o carregador usado na resolução SystemJS, sem carregar sozinho uma aplicação.

### 64. root-config/src/index.ejs:96

**Observação:** Carrega extras/amd.js do SystemJS no ramo local.

**Interpretação:** Fornece suporte AMD ao carregador, sem situar uma unidade frontend.

### 65. root-config/src/index.ejs:98

**Observação:** Carrega system.min.js do SystemJS no ramo não local.

**Interpretação:** Fornece o carregador no ramo não local; não demonstra mapa nem ligação entre aplicações nesse ramo.

### 66. root-config/src/index.ejs:99

**Observação:** Carrega extras/amd.min.js no ramo não local.

**Interpretação:** Fornece suporte AMD, sem situar uma unidade frontend.

### 67. root-config/src/org1-root-config.ts:21; root-config/src/org1-root-config.ts:21-23

**Observação:** Chama start({ urlRerouteOnly: true }) do single-spa.

**Interpretação:** Inicia a orquestração dos registros; a chamada sozinha não nomeia destinos.

### 68. common-lib-webpack/src/user-state.ts:9; common-lib-webpack/src/user-state.ts:3-19

**Observação:** setUser publica user em _userSubject.next; user$ expõe o BehaviorSubject, e userState é exportado como instância.

**Interpretação:** Implementa o mecanismo de publicação do estado em userState; sua ligação às aplicações é registrada nas relações de comunicação.

### 69. angular-app/; angular-app/angular.json:24-25; angular-app/src/main.single-spa.ts:20-31 e 112-114; angular-app/angular.json:20-21 e 31-34; angular-app/package.json:7

**Observação:** O diretório contém manifesto, entrada main.single-spa.ts com lifecycles Angular e target build próprio.

**Interpretação:** Aplicação Angular single-spa com entrada própria e build Angular CLI próprio.

### 70. common-lib-webpack/; common-lib-webpack/webpack.config.js:5-7; common-lib-webpack/src/index.ts:1-2; common-lib-webpack/index.html:1-11; common-lib-webpack/webpack.config.js:49-55; common-lib-webpack/package.json:8

**Observação:** O diretório tem entrada src/index.ts que reexporta Calculator e userState, HTML sem script e build de biblioteca index.js em formato system.

**Interpretação:** Módulo utilitário compartilhado (estado e calculadora), sem entrada de aplicação.

### 71. react-app/; react-app/webpack.config.js:5-10; react-app/src/org1-react-app.tsx:6-16; react-app/webpack.config.js:1-19; react-app/package.json:6

**Observação:** O diretório contém manifesto, entrada org1-react-app.tsx com lifecycles React e build pelo preset webpack próprio.

**Interpretação:** Aplicação React single-spa com entrada própria e build webpack próprio.

### 72. react-vite-app/; react-vite-app/index.html:11; react-vite-app/vite.config.ts:40; react-vite-app/src/spa.tsx:8-15 e 99-101; react-vite-app/vite.config.ts:14-41; react-vite-app/package.json:8

**Observação:** O diretório contém manifesto, entrada HTML src/main.tsx, entrada single-spa src/spa.tsx e build Vite próprio.

**Interpretação:** Aplicação React single-spa com entrada própria e build Vite próprio.

### 73. root-config/; root-config/webpack.config.js:7-9; root-config/webpack.config.js:19-21; root-config/src/org1-root-config.ts:3-23; root-config/webpack.config.js:1-29; root-config/package.json:9

**Observação:** O diretório contém manifesto, entrada org1-root-config.ts com registros e start, template index.ejs e build webpack próprio.

**Interpretação:** Root config single-spa com entrada própria e build webpack próprio.

### 74. styleguide/; styleguide/vite.config.ts:20-24; styleguide/src/styleguide.ts:3-5; styleguide/index.html:11; styleguide/vite.config.ts:19-38; styleguide/package.json:10

**Observação:** O diretório contém entrada de biblioteca src/styleguide.ts, exportações de componentes e build.lib Vite; o HTML inicia o scaffold só em desenvolvimento.

**Interpretação:** Biblioteca de componentes compartilhada; o build gera só o pacote (`main: ./dist/styleguide.system.js`, package.json:6), sem entrada de aplicação.

### 75. vue-app/; vue-app/index.html:11; vue-app/src/main.ts:7-11; vue-app/vite.config.ts:8-15; vue-app/package.json:6 e 8

**Observação:** O diretório contém manifesto, index.html apontando para src/main.ts, createApp(App), mount em #app e build Vite próprio.

**Interpretação:** Aplicação Vue com entrada própria e build Vite próprio. Não há relação com o root na revisão de composição.

### 76. root-config/src/org1-root-config.ts:9-13; root-config/src/index.ejs:68; angular-app/angular.json:25; angular-app/angular.json:33-34; angular-app/angular.json:36; angular-app/package.json:11; angular-app/src/main.single-spa.ts:112; angular-app/src/main.single-spa.ts:113; angular-app/src/main.single-spa.ts:114; angular-app/src/main.single-spa.ts:7; angular-app/src/main.single-spa.ts:20; root-config/src/org1-root-config.ts:9; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:11; root-config/src/org1-root-config.ts:21

**Observação:** O root registra angular-app, carrega seu nome por System.import e ativa a rota /angular. O import map local resolve o bundle e o destino exporta os lifecycles single-spa.

**Interpretação:** A relação ativa liga root-config a angular-app por carregamento e montagem single-spa no modo local.

### 77. root-config/src/org1-root-config.ts:15-19; root-config/src/index.ejs:69; react-vite-app/vite.config.ts:25; react-vite-app/vite.config.ts:37-41; react-vite-app/src/spa.tsx:99; react-vite-app/src/spa.tsx:100; react-vite-app/src/spa.tsx:101; react-vite-app/src/spa.tsx:3; react-vite-app/src/spa.tsx:8; root-config/src/org1-root-config.ts:15; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:17; root-config/src/org1-root-config.ts:21

**Observação:** O root registra react-vite-app, carrega seu nome por System.import e ativa a rota /react-vite. O import map local resolve o bundle e o destino exporta os lifecycles single-spa.

**Interpretação:** A relação ativa liga root-config a react-vite-app por carregamento e montagem single-spa no modo local.

### 78. root-config/src/org1-root-config.ts:3-7; root-config/src/index.ejs:67; react-app/webpack.config.js:5-10; react-app/src/org1-react-app.tsx:3; react-app/src/org1-react-app.tsx:6; root-config/src/org1-root-config.ts:3; root-config/src/index.ejs:63; root-config/src/org1-root-config.ts:5; root-config/src/org1-root-config.ts:21

**Observação:** O root registra @org1/react-app, carrega seu nome por System.import e ativa a rota /react. O import map local resolve o bundle e o destino exporta os lifecycles single-spa.

**Interpretação:** A relação ativa liga root-config a react-app por carregamento e montagem single-spa no modo local.

### 79. react-app/src/App.tsx:53-56; react-app/src/App.tsx:72; angular-app/src/app/app.component.ts:15-18; root-config/src/index.ejs:71; common-lib-webpack/webpack.config.js:49-55; react-app/webpack.config.js:13-14; angular-app/extra-webpack.config.js:7-10; common-lib-webpack/src/user-state.ts:9

**Observação:** react-app publica o usuário em setUser; angular-app assina user$. As aplicações externalizam a biblioteca e o import map resolve um único módulo @paok/common-lib-webpack.

**Interpretação:** A relação ativa usa o serviço reativo compartilhado como canal events de react-app para angular-app. O estado persiste entre montagens por rota.

### 80. react-vite-app/src/App.tsx:14-18; react-vite-app/src/App.tsx:47; angular-app/src/app/app.component.ts:15-18; root-config/src/index.ejs:71; common-lib-webpack/webpack.config.js:49-55; react-vite-app/vite.config.ts:11; react-vite-app/vite.config.ts:19; angular-app/extra-webpack.config.js:7-10; common-lib-webpack/src/user-state.ts:9

**Observação:** react-vite-app publica o usuário em setUser; angular-app assina user$. As aplicações externalizam a biblioteca e o import map resolve um único módulo @paok/common-lib-webpack.

**Interpretação:** A relação ativa usa o serviço reativo compartilhado como canal events de react-vite-app para angular-app. O estado persiste entre montagens por rota.

### 81. react-app/src/App.tsx:49-56; react-app/src/App.tsx:72; react-vite-app/src/App.tsx:10-18; react-vite-app/src/App.tsx:47; root-config/src/index.ejs:71; common-lib-webpack/webpack.config.js:49-55; react-app/webpack.config.js:13-14; react-vite-app/vite.config.ts:11; react-vite-app/vite.config.ts:19; common-lib-webpack/src/user-state.ts:9

**Observação:** react-app e react-vite-app publicam por setUser e assinam user$; ambas leem o valor guardado. As aplicações externalizam a biblioteca e o import map resolve um único módulo @paok/common-lib-webpack.

**Interpretação:** A relação ativa usa o serviço reativo compartilhado como canal events bidirecional entre as aplicações React. O estado persiste entre montagens por rota.

### 82. angular-app/package.json:7; angular-app/package.json:10; angular-app/angular.json:20-36; angular-app/extra-webpack.config.js:4-10; angular-app/package.json:11; angular-app/angular.json:36; root-config/src/index.ejs:68

**Observação:** angular-app tem script e configuração próprios de build (separado); os artefatos de serviço citados são locais. A revisão registra deploy não observado e versionamento independente No.

**Interpretação:** O build confirma o limite da unidade. Não há artefato de publicação que demonstre deploy independente.

### 83. react-app/package.json:6; react-app/webpack.config.js:5-18; react-app/package.json:4; root-config/src/index.ejs:67

**Observação:** react-app tem script e configuração próprios de build (separado); os artefatos de serviço citados são locais. A revisão registra deploy não observado e versionamento independente No.

**Interpretação:** O build confirma o limite da unidade. Não há artefato de publicação que demonstre deploy independente.

### 84. react-vite-app/package.json:8; react-vite-app/vite.config.ts:14-41; react-vite-app/package.json:10-11; react-vite-app/vite.config.ts:39; root-config/src/index.ejs:69

**Observação:** react-vite-app tem script e configuração próprios de build (separado); os artefatos de serviço citados são locais. A revisão registra deploy não observado e versionamento independente No.

**Interpretação:** O build confirma o limite da unidade. Não há artefato de publicação que demonstre deploy independente.

### 85. root-config/package.json:9; root-config/webpack.config.js:5-28; root-config/package.json:4; root-config/src/index.ejs:66

**Observação:** root-config tem script e configuração próprios de build (separado); os artefatos de serviço citados são locais. A revisão registra deploy não observado e versionamento independente No.

**Interpretação:** O build confirma o limite da unidade. Não há artefato de publicação que demonstre deploy independente.

### 86. vue-app/package.json:6; vue-app/vite.config.ts:8-15; vue-app/package.json:7

**Observação:** vue-app tem script e configuração próprios de build (separado); os artefatos de serviço citados são locais. A revisão registra deploy não observado e versionamento independente No.

**Interpretação:** O build confirma o limite da unidade. Não há artefato de publicação que demonstre deploy independente. A unidade Vue permanece fora da montagem single-spa.

### 87. README.md:1

**Observação:** O título do README apresenta uma aplicação single-spa com React, Angular, Vite e SystemJS.

**Interpretação:** A afirmação nomeia single-spa, React, Angular, Vite e SystemJS, sem descrever como as unidades se organizam; é evidência tecnológica e semântica, corroborada pelos registros e carregamento.

### 88. README.md:2

**Observação:** O README apresenta o projeto como prova de conceito de arquitetura de microfrontends.

**Interpretação:** A afirmação arquitetural é corroborada pelos limites do root e das três aplicações ligadas a ele.

### 89. README.md:31

**Observação:** O README diz que clicar em React ou Angular no menu encaminha à respectiva aplicação.

**Interpretação:** A afirmação é corroborada pelo menu e pelas relações para React e Angular; não afirma que sejam as únicas aplicações.

### 90. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-app/package.json:60; react-app/tsconfig.json:1-8); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** Os manifestos, tsconfig, declarações e fontes da react-app são adicionados na raiz e não mudam até o snapshot.

**Interpretação:** A continuidade explica a declaração de tipos SystemJS sem referência explícita; não prova uso implícito nem remoção anterior. O No permanece.

### 91. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-app/tsconfig.json:2; react-app/package.json:3-14); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** A extensão ts-config-single-spa e o build Babel/webpack da react-app coexistem desde a raiz, sem alteração posterior.

**Interpretação:** O histórico não verifica se o preset lê o tsconfig; a alternativa entre uso indireto e declaração sem uso continua aberta.

### 92. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-app/package.json:49; react-app/webpack.config.js:2); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** A declaração de webpack-config-single-spa-react e o uso de webpack-config-single-spa-react-ts já coexistem na raiz.

**Interpretação:** Não há troca registrada entre presets; o No de uso direto permanece.

### 93. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-app/package.json:51; root-config/webpack.config.js:2); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** O manifesto e o webpack da react-app não mudam; o preset webpack-config-single-spa-ts também já é usado no root na raiz.

**Interpretação:** Não há transferência registrada; a declaração sem uso direto na react-app permanece No.

### 94. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (react-vite-app/package.json:19; react-vite-app/src/App.tsx:6-34); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** O manifesto, App.tsx e vite.config.ts da react-vite-app não mudam; import estático de styleguide e bloco System.import comentado já coexistem na raiz.

**Interpretação:** O histórico não comprova experimento anterior ou abandono; permanecem os No da dependência e da construção comentada.

### 95. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (root-config/package.json:48; root-config/src/index.ejs:95-99); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** O manifesto do root e index.ejs não mudam; a dependência systemjs e o carregador de CDN já coexistem na raiz.

**Interpretação:** Não há migração registrada nem prova de uso da cópia instalada; o Undetermined permanece.

### 96. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (root-config/package.json:23; root-config/tsconfig.json:3); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** Manifesto, tsconfig, declarações e fontes do root permanecem desde a raiz, incluindo tipos genéricos e acessos a System.

**Interpretação:** A continuidade não verifica checagem interna do preset; o uso do pacote de tipos continua Undetermined.

### 97. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (root-config/tsconfig.json:2; root-config/babel.config.json:1); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** O tsconfig que estende ts-config-single-spa e o build Babel/webpack do root coexistem desde a raiz, sem mudança.

**Interpretação:** Não há mudança histórica de ferramenta que resolva o uso interno pelo preset; permanece Undetermined.

### 98. root-config/src/index.ejs:22-24; root-config/src/index.ejs:93; root-config/src/index.ejs:199

**Observação:** A instrução de descomentar e a meta de restrição de import-map-overrides estão comentadas; a biblioteca é carregada e o painel está declarado.

**Interpretação:** O snapshot resolve a opção inativa de template; não demonstra produção abandonada.

### 99. 8a9367e8cf74242209cff0dd485377744809cc67 2025-05-16 (root-config/src/index.ejs:59-85; root-config/package.json:4-9); 1fe831db68f3ee26779b7c411b39326eed40198f 2025-05-16 (README.md)

**Observação:** index.ejs e scripts do root são os mesmos desde a raiz: mapa de produção comentado e mapa local condicionado a isLocal.

**Interpretação:** A continuidade não comprova abandono ou publicação externa; o deploy permanece não observado.

### 100. root-config/src/index.ejs:135; root-config/src/index.ejs:197

**Observação:** O snapshot contém System.import ativo do root em :135 e sua repetição comentada em :197.

**Interpretação:** A coexistência resolve a dúvida: a chamada comentada não desativa o carregamento do root.

### 101. angular-app/src/main.single-spa.ts:14; angular-app/angular.json:25-26; angular-app/src/polyfills.ts:60; root-config/src/index.ejs:91

**Observação:** A entrada Angular importa zone.js/dist/zone; o build também aponta a polyfills.ts, que importa zone.js. O script de CDN do host está comentado.

**Interpretação:** O snapshot resolve a aparente ausência de ZoneJS; o comentário do host não demonstra falta da biblioteca na aplicação.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (angular-app/package.json:25) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara angular-app/src/single-spa/single-spa-props.ts:2 |
| 2 | 3.4.2 (angular-app/package.json:26) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #19; declara #36; declara #37 |
| 3 | 3.4.2 (common-lib-webpack/package.json:22) | 1 tecnologia | manifesto | import-maps | tecnológica | fraca | declara common-lib-webpack/tsconfig.json:17 |
| 4 | 3.4.2 (react-app/package.json:60) | 1 tecnologia | manifesto | import-maps | tecnológica | fraca | — |
| 5 | 3.4.2 (react-app/package.json:44) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #38; declara #39 |
| 6 | 3.4.2 (react-app/package.json:45) | 1 tecnologia | manifesto | single-spa | tecnológica | ambígua | — |
| 7 | 3.4.2 (react-app/package.json:49) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | — |
| 8 | 3.4.2 (react-app/package.json:50) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #20 |
| 9 | 3.4.2 (react-app/package.json:51) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | — |
| 10 | 3.4.2 (react-vite-app/package.json:17) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #40; declara #41 |
| 11 | 3.4.2 (react-vite-app/package.json:19) | 1 tecnologia | manifesto | import-maps | tecnológica | fraca | — |
| 12 | 3.4.2 (react-vite-app/package.json:36) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #23; declara #31; declara #32; declara #33 |
| 13 | 3.4.2 (root-config/package.json:47) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #42; declara #43; declara #44; declara #67 |
| 14 | 3.4.2 (root-config/package.json:48) | 1 tecnologia | manifesto | import-maps | tecnológica | ambígua | — |
| 15 | 3.4.2 (root-config/package.json:23) | 1 tecnologia | manifesto | import-maps | tecnológica | ambígua | — |
| 16 | 3.4.2 (root-config/package.json:36) | 1 tecnologia | manifesto | single-spa | tecnológica | ambígua | — |
| 17 | 3.4.2 (root-config/package.json:40) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #22 |
| 18 | 3.4.2 (angular-app/package.json:25; Evidência); 3.4.2 (angular-app/package.json:26; Evidência); 3.4.3 (angular-app; Marcadores); 3.4.3 (angular-app; Entrada); 3.4.3 (angular-app; Build); 3.4.4 (angular-app/src/main.single-spa.ts:112; Observação); 3.4.4 (angular-app/extra-webpack.config.js:5; Observação); 3.4.5 (#1; Configuração); 3.4.6 (#1; Onde é servida); 3.4.6 (#1; Artefatos) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #69; configura #76 |
| 19 | 3.4.2 (angular-app/package.json:26; Evidência); 3.4.4 (angular-app/src/main.single-spa.ts:113; Observação); 3.4.4 (angular-app/extra-webpack.config.js:1; Arquivo:linha); 3.4.4 (angular-app/extra-webpack.config.js:1; Observação); 3.4.4 (angular-app/extra-webpack.config.js:5; Arquivo:linha); 3.4.4 (angular-app/extra-webpack.config.js:5; Observação); 3.4.4 (common-lib-webpack/src/user-state.ts:9; Observação); 3.4.5 (#4; Configuração); 3.4.5 (#5; Configuração); 3.4.6 (#1; Artefatos) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #76; configura #79; configura #80 |
| 20 | 3.4.2 (react-app/package.json:44; Evidência); 3.4.2 (react-app/package.json:49; Evidência); 3.4.2 (react-app/package.json:50; Evidência); 3.4.2 (react-app/package.json:51; Evidência); 3.4.3 (react-app; Marcadores); 3.4.3 (react-app; Entrada); 3.4.3 (react-app; Build); 3.4.4 (react-app/src/org1-react-app.tsx:6; Observação); 3.4.4 (common-lib-webpack/src/user-state.ts:9; Observação); 3.4.5 (#3; Configuração); 3.4.5 (#4; Configuração); 3.4.5 (#6; Configuração); 3.4.6 (#2; Artefatos) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #71; configura #78; configura #79; configura #81 |
| 21 | 3.4.2 (react-app/package.json:44; Evidência); 3.4.2 (react-vite-app/package.json:17; Evidência); 3.4.2 (root-config/package.json:47; Evidência); 3.4.2 (root-config/package.json:48; Evidência); 3.4.4 (angular-app/src/main.single-spa.ts:112; Observação); 3.4.4 (react-vite-app/src/spa.tsx:99; Observação); 3.4.4 (react-app/src/org1-react-app.tsx:6; Observação); 3.4.4 (root-config/src/index.ejs:63; Arquivo:linha); 3.4.4 (root-config/src/index.ejs:63; Observação); 3.4.4 (root-config/src/index.ejs:135; Observação); 3.4.4 (root-config/src/org1-root-config.ts:5; Observação); 3.4.4 (root-config/src/org1-root-config.ts:11; Observação); 3.4.4 (root-config/src/org1-root-config.ts:17; Observação); 3.4.4 (common-lib-webpack/src/user-state.ts:9; Observação); 3.4.5 (#1; Código); 3.4.5 (#2; Código); 3.4.5 (#3; Código); 3.4.5 (#4; Configuração); 3.4.5 (#5; Configuração); 3.4.5 (#6; Configuração); 3.4.6 (#1; Onde é servida); 3.4.6 (#2; Onde é servida); 3.4.6 (#3; Onde é servida); 3.4.6 (#4; Onde é servida) | 2 configuração | configuração | import-maps | arquitetural | forte | configura #76; configura #77; configura #78; configura #79; configura #80; configura #81 |
| 22 | 3.4.2 (react-app/package.json:51; Evidência); 3.4.2 (root-config/package.json:47; Evidência); 3.4.2 (root-config/package.json:48; Evidência); 3.4.2 (root-config/package.json:40; Evidência); 3.4.3 (root-config; Marcadores); 3.4.3 (root-config; Entrada); 3.4.3 (root-config; Build); 3.4.4 (root-config/src/org1-root-config.ts:3; Observação); 3.4.4 (root-config/src/index.ejs:63; Observação); 3.4.6 (#4; Artefatos) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #73; configura #42 |
| 23 | 3.4.2 (react-vite-app/package.json:17; Evidência); 3.4.2 (react-vite-app/package.json:19; Evidência); 3.4.2 (react-vite-app/package.json:36; Evidência); 3.4.3 (react-vite-app; Marcadores); 3.4.3 (react-vite-app; Entrada); 3.4.3 (react-vite-app; Build); 3.4.4 (react-vite-app/src/spa.tsx:99; Observação); 3.4.4 (react-vite-app/src/spa.tsx:100; Observação); 3.4.4 (common-lib-webpack/src/user-state.ts:9; Observação); 3.4.5 (#2; Configuração); 3.4.5 (#5; Configuração); 3.4.5 (#6; Configuração); 3.4.6 (#3; Onde é servida); 3.4.6 (#3; Artefatos) | 2 configuração | configuração | single-spa | tecnológica | moderada | configura #72; configura #77; configura #80; configura #81 |
| 24 | 3.4.2 (root-config/package.json:48; Evidência); 3.4.4 (root-config/src/index.ejs:50; Arquivo:linha); 3.4.4 (root-config/src/index.ejs:50; Observação) | 2 configuração | configuração | import-maps | tecnológica | moderada | — |
| 25 | 3.4.2 (root-config/package.json:48; Evidência); 3.4.4 (root-config/src/index.ejs:60; Arquivo:linha); 3.4.8 (#10; Origem) | 2 configuração | configuração | import-maps | tecnológica | fraca | — |
| 26 | 3.4.3 (styleguide; Marcadores); 3.4.3 (styleguide; Entrada); 3.4.3 (styleguide; Build) | 2 configuração | configuração | import-maps | tecnológica | moderada | configura #74 |
| 27 | 3.4.4 (root-config/src/index.ejs:35; Arquivo:linha); 3.4.4 (root-config/src/index.ejs:35; Observação) | 2 configuração | configuração | import-maps | tecnológica | moderada | — |
| 28 | 3.4.4 (angular-app/src/main.single-spa.ts:112; src-mount-export) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #76 |
| 29 | 3.4.4 (angular-app/src/main.single-spa.ts:113; src-mount-export) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #76 |
| 30 | 3.4.4 (angular-app/src/main.single-spa.ts:114; src-mount-export) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #76 |
| 31 | 3.4.4 (react-vite-app/src/spa.tsx:99; src-mount-export) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #77 |
| 32 | 3.4.4 (react-vite-app/src/spa.tsx:100; src-mount-export) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #77 |
| 33 | 3.4.4 (react-vite-app/src/spa.tsx:101; src-mount-export) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #77 |
| 34 | 3.4.4 (angular-app/extra-webpack.config.js:1; src-lifecycles) | 3 código | configuração | single-spa | tecnológica | fraca | — |
| 35 | 3.4.4 (angular-app/extra-webpack.config.js:5; src-lifecycles) | 3 código | configuração | single-spa | tecnológica | fraca | — |
| 36 | 3.4.4 (angular-app/src/main.single-spa.ts:7; src-lifecycles) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #76 |
| 37 | 3.4.4 (angular-app/src/main.single-spa.ts:20; src-lifecycles) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #76 |
| 38 | 3.4.4 (react-app/src/org1-react-app.tsx:3; src-lifecycles) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #78 |
| 39 | 3.4.4 (react-app/src/org1-react-app.tsx:6; src-lifecycles) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #78 |
| 40 | 3.4.4 (react-vite-app/src/spa.tsx:3; src-lifecycles) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #77 |
| 41 | 3.4.4 (react-vite-app/src/spa.tsx:8; src-lifecycles) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #77 |
| 42 | 3.4.4 (root-config/src/org1-root-config.ts:3; src-lifecycles) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #78 |
| 43 | 3.4.4 (root-config/src/org1-root-config.ts:9; src-lifecycles) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #76 |
| 44 | 3.4.4 (root-config/src/org1-root-config.ts:15; src-lifecycles) | 3 código | código-fonte | single-spa | arquitetural | forte | implementa #77 |
| 45 | 3.4.4 (react-vite-app/src/App.tsx:26; src-import-map) | 3 código | comentário | import-maps | tecnológica | fraca | — |
| 46 | 3.4.4 (root-config/src/index.ejs:22; src-import-map) | 3 código | comentário | import-maps | tecnológica | fraca | — |
| 47 | 3.4.4 (root-config/src/index.ejs:23; src-import-map) | 3 código | comentário | import-maps | tecnológica | fraca | — |
| 48 | 3.4.4 (root-config/src/index.ejs:24; src-import-map) | 3 código | comentário | import-maps | tecnológica | fraca | — |
| 49 | 3.4.4 (root-config/src/index.ejs:35; src-import-map) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 50 | 3.4.4 (root-config/src/index.ejs:50; src-import-map) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 51 | 3.4.4 (root-config/src/index.ejs:60; src-import-map) | 3 código | comentário | import-maps | tecnológica | fraca | — |
| 52 | 3.4.4 (root-config/src/index.ejs:63; src-import-map) | 3 código | código-fonte | import-maps | arquitetural | forte | implementa #76; implementa #77; implementa #78 |
| 53 | 3.4.4 (root-config/src/index.ejs:93; src-import-map) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 54 | 3.4.4 (root-config/src/index.ejs:135; src-import-map) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 55 | 3.4.4 (root-config/src/index.ejs:197; src-import-map) | 3 código | comentário | import-maps | tecnológica | fraca | — |
| 56 | 3.4.4 (root-config/src/index.ejs:199; src-import-map) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 57 | 3.4.4 (root-config/src/org1-root-config.ts:5; src-import-map) | 3 código | código-fonte | import-maps | arquitetural | forte | implementa #78 |
| 58 | 3.4.4 (root-config/src/org1-root-config.ts:11; src-import-map) | 3 código | código-fonte | import-maps | arquitetural | forte | implementa #76 |
| 59 | 3.4.4 (root-config/src/org1-root-config.ts:17; src-import-map) | 3 código | código-fonte | import-maps | arquitetural | forte | implementa #77 |
| 60 | 3.4.4 (root-config/src/index.ejs:14; src-html-external-script) | 3 código | código-fonte | — | contexto | fraca | — |
| 61 | 3.4.4 (root-config/src/index.ejs:91; src-html-external-script) | 3 código | comentário | — | contexto | fraca | — |
| 62 | 3.4.4 (root-config/src/index.ejs:93; src-html-external-script) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 63 | 3.4.4 (root-config/src/index.ejs:95; src-html-external-script) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 64 | 3.4.4 (root-config/src/index.ejs:96; src-html-external-script) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 65 | 3.4.4 (root-config/src/index.ejs:98; src-html-external-script) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 66 | 3.4.4 (root-config/src/index.ejs:99; src-html-external-script) | 3 código | código-fonte | import-maps | tecnológica | fraca | — |
| 67 | 3.4.4 (root-config/src/org1-root-config.ts:21; manual) | 3 código | código-fonte | single-spa | tecnológica | moderada | implementa #76; implementa #77; implementa #78 |
| 68 | 3.4.4 (common-lib-webpack/src/user-state.ts:9; manual) | 3 código | código-fonte | events | tecnológica | moderada | implementa #79; implementa #80; implementa #81 |
| 69 | 3.4.3 (angular-app) | 4 estrutura | diretório | single-spa | arquitetural | moderada | — |
| 70 | 3.4.3 (common-lib-webpack) | 4 estrutura | diretório | — | contexto | fraca | — |
| 71 | 3.4.3 (react-app) | 4 estrutura | diretório | single-spa | arquitetural | moderada | — |
| 72 | 3.4.3 (react-vite-app) | 4 estrutura | diretório | single-spa | arquitetural | moderada | — |
| 73 | 3.4.3 (root-config) | 4 estrutura | diretório | single-spa | arquitetural | moderada | — |
| 74 | 3.4.3 (styleguide) | 4 estrutura | diretório | — | contexto | fraca | — |
| 75 | 3.4.3 (vue-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 76 | 3.4.5 #1 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #73; liga #69 |
| 77 | 3.4.5 #2 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #73; liga #72 |
| 78 | 3.4.5 #3 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #73; liga #71 |
| 79 | 3.4.5 #4 | 5 composição | código-fonte | events | arquitetural | forte | liga #71; liga #69 |
| 80 | 3.4.5 #5 | 5 composição | código-fonte | events | arquitetural | forte | liga #72; liga #69 |
| 81 | 3.4.5 #6 | 5 composição | código-fonte | events | arquitetural | forte | liga #71; liga #72 |
| 82 | 3.4.6 #1 | 6 build-deploy | configuração | single-spa | arquitetural | moderada | publica #69 |
| 83 | 3.4.6 #2 | 6 build-deploy | configuração | single-spa | arquitetural | moderada | publica #71 |
| 84 | 3.4.6 #3 | 6 build-deploy | configuração | single-spa | arquitetural | moderada | publica #72 |
| 85 | 3.4.6 #4 | 6 build-deploy | configuração | single-spa | arquitetural | moderada | publica #73 |
| 86 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #75 |
| 87 | 3.4.7 #1 | 7 documentação | documentação | single-spa | tecnológica | fraca | corrobora #76; corrobora #77; corrobora #78 |
| 88 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #73; corrobora #69; corrobora #71; corrobora #72; corrobora #76; corrobora #77; corrobora #78 |
| 89 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #76; corrobora #78 |
| 90 | 3.4.8 #1 | 8 histórico | histórico | import-maps | tecnológica | fraca | explica #4 |
| 91 | 3.4.8 #2 | 8 histórico | histórico | single-spa | tecnológica | fraca | explica #6 |
| 92 | 3.4.8 #3 | 8 histórico | histórico | single-spa | tecnológica | fraca | explica #7 |
| 93 | 3.4.8 #4 | 8 histórico | histórico | single-spa | tecnológica | fraca | explica #9 |
| 94 | 3.4.8 #5 | 8 histórico | histórico | import-maps | tecnológica | fraca | explica #11; explica #45 |
| 95 | 3.4.8 #6 | 8 histórico | histórico | import-maps | tecnológica | fraca | explica #14 |
| 96 | 3.4.8 #7 | 8 histórico | histórico | import-maps | tecnológica | fraca | explica #15 |
| 97 | 3.4.8 #8 | 8 histórico | histórico | single-spa | tecnológica | fraca | explica #16 |
| 98 | 3.4.8 #9 | 8 histórico | histórico | import-maps | tecnológica | fraca | explica #46; explica #47; explica #48 |
| 99 | 3.4.8 #10 | 8 histórico | histórico | import-maps | arquitetural | fraca | explica #25; explica #21; explica #51; explica #85 |
| 100 | 3.4.8 #11 | 8 histórico | histórico | import-maps | tecnológica | fraca | explica #54; explica #55 |
| 101 | 3.4.8 #12 | 8 histórico | histórico | — | contexto | fraca | explica #61 |

## Resumo

Observações: 101. Dimensões (tecnologia: 17, configuração: 10, código: 41, estrutura: 7, composição: 6, build-deploy: 5, documentação: 3, histórico: 12). Força (forte: 14, moderada: 32, fraca: 51, ambígua: 4). Evidência (tecnológica: 69, arquitetural: 27, contexto: 5).

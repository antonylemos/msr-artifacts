---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
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

# 368 — Ba5ik7/seed-mfe-remote

## Leitura do repositório

A dependência de Module Federation (#1) se desdobra na exposição de `./RemoteWidget` pelo remote (#2), na declaração do remote pelo host (#3) e na integração das configurações aos targets Angular (#4–#7). Os diretórios `demo` e `seed-mfe-remote` são duas unidades frontend com entradas e builds próprios (#17–#18, #20–#21), sob uma raiz de coordenação que não é outra unidade (#16).

A ligação efetiva usa `loadRemoteModule` com URL explícita: o host carrega o componente (#11) e o monta no `ViewContainerRef` (#14), além de carregá-lo pela rota `remote` (#13, #15). Esses dois caminhos constituem uma única relação host → remote ativa (#19). Os imports do mecanismo (#10, #12) e os bootstraps assíncronos locais (#8–#9) não estabelecem sozinhos essa arquitetura.

A entrada nominal `remotes.seedMfeRemote` (#3) não é consultada pelas chamadas por URL. O histórico explica que ambas coexistem desde a introdução dos arquivos (#22), sem sustentar hipótese de abandono. Os builds separados não demonstram deploy nem versionamento independente (#20–#21). A 3.4.7 registra zero afirmações arquiteturais: o README padrão não acrescenta observações documentais. Não há indeterminação arquitetural nas revisões de entrada.

Na dimensão de configuração, cada target build/serve ocupa um bloco (#4–#7), incluindo suas variantes. Os arquivos `webpack.prod.config.js:1`, citados nas tabelas, só reexportam outra configuração e não declaram elemento de composição próprio; por isso não acrescentam observações. Portas e publicHost apenas corroboram a resolução e permanecem nos artefatos das observações correspondentes.

## Observações

### 1. package.json:14

**Observação:** O manifesto raiz declara `@angular-architects/module-federation` na versão `^19.0.3`; a revisão de dependências registra Configurada `Yes`.

**Interpretação:** A declaração sinaliza Module Federation; configuração e uso precisam das observações próprias.

### 2. projects/seed-mfe-remote/webpack.config.js:1-15

**Observação:** A configuração chama `withModuleFederationPlugin`, define `name: seedMfeRemote`, expõe `./RemoteWidget` pelo caminho do componente e compartilha as dependências com `shareAll`, singleton e strictVersion.

**Interpretação:** Configura o mecanismo e a interface exposta de uma unidade, sem declarar consumidor.

### 3. projects/demo/webpack.config.js:1-13

**Observação:** A configuração usa `withModuleFederationPlugin`, declara `remotes.seedMfeRemote` em `http://localhost:4202/remoteEntry.js` e compartilha dependências com `shareAll`, singleton e strictVersion.

**Interpretação:** Declara uma ligação do host a outro frontend por Module Federation. A relação nominal está configurada, embora as chamadas do código usem diretamente a URL.

### 4. angular.json:17-66

**Observação:** O target `build` de `seed-mfe-remote` usa `ngx-build-plus:browser` e `extraWebpackConfig: projects/seed-mfe-remote/webpack.config.js`; production seleciona `projects/seed-mfe-remote/webpack.prod.config.js`.

**Interpretação:** Integra a configuração de federação ao build da unidade. O target não declara outra unidade como destino.

### 5. angular.json:67-84

**Observação:** O target `serve` de `seed-mfe-remote` usa `ngx-build-plus:dev-server` e `extraWebpackConfig: projects/seed-mfe-remote/webpack.config.js`; production seleciona `projects/seed-mfe-remote/webpack.prod.config.js`.

**Interpretação:** Integra a configuração de federação ao servidor de desenvolvimento da unidade. O target não declara outra unidade como destino.

### 6. angular.json:122-171

**Observação:** O target `build` de `demo` usa `ngx-build-plus:browser` e `extraWebpackConfig: projects/demo/webpack.config.js`; production seleciona `projects/demo/webpack.prod.config.js`.

**Interpretação:** Integra a configuração de federação ao build da unidade. O target não declara outra unidade como destino.

### 7. angular.json:172-189

**Observação:** O target `serve` de `demo` usa `ngx-build-plus:dev-server` e `extraWebpackConfig: projects/demo/webpack.config.js`; production seleciona `projects/demo/webpack.prod.config.js`.

**Interpretação:** Integra a configuração de federação ao servidor de desenvolvimento da unidade. O target não declara outra unidade como destino.

### 8. projects/demo/src/main.ts:1-2; projects/demo/src/bootstrap.ts:5-6

**Observação:** O entry de `demo` executa `import('./bootstrap')`, e o bootstrap inicia a aplicação Angular local.

**Interpretação:** É bootstrap assíncrono interno à unidade; sozinho não mostra tecnologia de MFE nem composição entre unidades. A 3.4.4 registra Composição `No`.

### 9. projects/seed-mfe-remote/src/main.ts:1-2; projects/seed-mfe-remote/src/bootstrap.ts:5-6

**Observação:** O entry de `seed-mfe-remote` executa `import('./bootstrap')`, e o bootstrap inicia a aplicação Angular local.

**Interpretação:** É bootstrap assíncrono interno à unidade; sozinho não mostra tecnologia de MFE nem composição entre unidades. A 3.4.4 registra Composição `No`.

### 10. projects/demo/src/app/app.component.ts:1

**Observação:** O componente raiz importa `loadRemoteModule` de `@angular-architects/module-federation`.

**Interpretação:** Disponibiliza o mecanismo de carregamento no host, sem identificar destino nesta linha.

### 11. projects/demo/src/app/app.component.ts:24-36; projects/seed-mfe-remote/webpack.config.js:5-8; angular.json:80-81; projects/demo/src/bootstrap.ts:5

**Observação:** Em `ngAfterViewInit`, o componente raiz do demo chama `loadRemoteModule` com `type: module`, `remoteEntry: http://localhost:4202/remoteEntry.js` e `exposedModule: ./RemoteWidget`. O remote expõe esse módulo e tem dev-server no endereço correspondente.

**Interpretação:** O host resolve uma unidade distinta por URL e módulo exposto, ligando demo a seed-mfe-remote em runtime.

### 12. projects/demo/src/app/app.routes.ts:2

**Observação:** O arquivo de rotas importa `loadRemoteModule` de `@angular-architects/module-federation`.

**Interpretação:** Prepara o mecanismo no roteamento, sem nomear uma unidade de destino nesta linha.

### 13. projects/demo/src/app/app.routes.ts:5-13; projects/demo/src/app/app.config.ts:7; projects/demo/src/bootstrap.ts:5; projects/seed-mfe-remote/webpack.config.js:5-8; angular.json:80-81

**Observação:** A rota `remote` usa `loadComponent` para carregar `./RemoteWidget` pela URL `http://localhost:4202/remoteEntry.js` e devolver `RemoteWidgetComponent`; `provideRouter(routes)` registra as rotas no bootstrap do host. O módulo e o endereço correspondem ao remote.

**Interpretação:** A rota conecta um caminho do host ao componente da outra unidade por Module Federation.

### 14. projects/demo/src/app/app.component.ts:12; projects/demo/src/app/app.component.ts:21-22; projects/demo/src/app/app.component.ts:36

**Observação:** O template contém `ng-container #mfeHost`, obtido como `ViewContainerRef`; `createComponent(remoteComponent.RemoteWidgetComponent)` monta nele o componente retornado pelo carregamento.

**Interpretação:** Materializa a montagem do componente remoto na UI do host; a chamada de montagem, isoladamente, recebe o resultado do carregamento e não resolve o destino.

### 15. projects/demo/src/app/app.routes.ts:4-14; projects/demo/src/app/app.config.ts:7; projects/demo/src/app/app.component.ts:15; projects/seed-mfe-remote/webpack.config.js:7-8; angular.json:80-81

**Observação:** A tabela `routes` associa o caminho `remote` ao carregamento de `./RemoteWidget` pela URL do remote. As rotas são registradas por `provideRouter(routes)` e o host contém `router-outlet`.

**Interpretação:** A tabela estabelece a relação entre o caminho navegável do host e o componente exposto por seed-mfe-remote.

### 16. .; package.json:1-41; angular.json:5-6; angular.json:17-20; angular.json:111; angular.json:122-125

**Observação:** A raiz tem o manifesto único e o registro dos dois projetos; os targets pertencem aos diretórios em `projects/`. A 3.4.3 registra Unidade frontend `No` para a raiz.

**Interpretação:** A raiz coordena o workspace e não constitui uma terceira unidade frontend.

### 17. projects/demo/; angular.json:122-125; angular.json:126; angular.json:143-144; angular.json:162; projects/demo/src/main.ts:1-2; projects/demo/src/bootstrap.ts:5-6

**Observação:** O diretório `demo` tem entrada e bootstrap próprios, index e target `build` com saída `dist/demo` e configuração webpack própria. Não tem manifesto local. A 3.4.3 registra Unidade frontend `Yes`.

**Interpretação:** Confirma o limite de uma unidade frontend host, mesmo com dependências declaradas no manifesto compartilhado.

### 18. projects/seed-mfe-remote/; angular.json:17-20; angular.json:21; angular.json:38-39; angular.json:57; projects/seed-mfe-remote/src/main.ts:1-2; projects/seed-mfe-remote/src/bootstrap.ts:5-6

**Observação:** O diretório `seed-mfe-remote` tem entrada e bootstrap próprios, index e target `build` com saída `dist/seed-mfe-remote` e configuração webpack própria. Não tem manifesto local. A 3.4.3 registra Unidade frontend `Yes`.

**Interpretação:** Confirma o limite de uma unidade frontend remote, mesmo com dependências declaradas no manifesto compartilhado.

### 19. projects/demo/src/app/app.component.ts:26-36; projects/demo/src/app/app.routes.ts:4-14; projects/demo/webpack.config.js:5-7; projects/seed-mfe-remote/webpack.config.js:5-8; angular.json:80-81

**Observação:** A relação #1 da 3.4.5 liga `projects/demo` a `projects/seed-mfe-remote`, por Module Federation, com No snapshot `Yes` e Ativa `Yes`. As chamadas resolvem `./RemoteWidget` pelo remoteEntry; a declaração nominal `seedMfeRemote` coincide com o nome do remote, mas não é consultada por elas.

**Interpretação:** Os dois caminhos de consumo pertencem à mesma relação host → remote ativa no snapshot. Atividade descreve a cadeia estática registrada, sem comprovar execução ou deploy.

### 20. angular.json:122-125; angular.json:143-144; angular.json:162; projects/demo/webpack.prod.config.js:1; angular.json:185-186; package.json:3; package.json:12

**Observação:** A aplicação `demo` tem target próprio, saída `dist/demo` e configuração production que reexporta a webpack de desenvolvimento. A 3.4.6 registra Build `separado`, Deploy `não observado` e Versionamento `No`; o endereço registrado é de dev-server.

**Interpretação:** O build confirma uma fronteira por aplicação. Os artefatos não estabelecem publicação nem versionamento independente; servidor de desenvolvimento não comprova deploy.

### 21. angular.json:17-20; angular.json:38-39; angular.json:57; projects/seed-mfe-remote/webpack.prod.config.js:1; angular.json:80-81; package.json:3; package.json:12

**Observação:** A aplicação `seed-mfe-remote` tem target próprio, saída `dist/seed-mfe-remote` e configuração production que reexporta a webpack de desenvolvimento. A 3.4.6 registra Build `separado`, Deploy `não observado` e Versionamento `No`; o endereço registrado é de dev-server.

**Interpretação:** O build confirma uma fronteira por aplicação. Os artefatos não estabelecem publicação nem versionamento independente; servidor de desenvolvimento não comprova deploy.

### 22. b95ce7d 2025-04-19 (angular.json; package.json; README.md); 3565dd8 2025-04-20 (projects/demo/webpack.config.js; projects/demo/src/app/app.component.ts; projects/demo/src/app/app.routes.ts)

**Observação:** A revisão histórica registra dois commits até o snapshot. Os três arquivos do demo foram adicionados em `3565dd8`, já com `remotes.seedMfeRemote` e as duas chamadas por URL explícita; não há versões anteriores desses caminhos no histórico observado. O ponto #1 está `esclarecido`.

**Interpretação:** A coexistência é observável desde a introdução dos arquivos. Não sustenta uma transição de consumo pelo nome para consumo por URL, nem permite inferir abandono ou intenção. Explica a declaração sem uso pelas chamadas no snapshot.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #2; declara #3; declara #10; declara #11; declara #12; declara #13 |
| 2 | 3.4.2 (Evidência); 3.4.3 (projects/seed-mfe-remote, Marcadores); 3.4.4 (src-load-remote, app.component.ts:26, Observação); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #19 |
| 3 | 3.4.2 (Evidência); 3.4.3 (projects/demo, Marcadores); 3.4.5 #1 (Configuração) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #17; configura #19 |
| 4 | 3.4.2 (Evidência, angular.json:18, :39, :57); 3.4.3 (., Marcadores); 3.4.3 (projects/seed-mfe-remote, Build); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #21 |
| 5 | 3.4.2 (Evidência, angular.json:68, :82, :72); 3.4.3 (., Marcadores); 3.4.3 (projects/seed-mfe-remote, Build) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #18; configura #21 |
| 6 | 3.4.2 (Evidência, angular.json:123, :144, :162); 3.4.3 (., Marcadores); 3.4.3 (projects/demo, Build); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #17; configura #20 |
| 7 | 3.4.2 (Evidência, angular.json:173, :187, :177); 3.4.3 (., Marcadores); 3.4.3 (projects/demo, Build) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #17; configura #20 |
| 8 | 3.4.4 (src-async-bootstrap, projects/demo/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 9 | 3.4.4 (src-async-bootstrap, projects/seed-mfe-remote/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 10 | 3.4.4 (src-load-remote, app.component.ts:1) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #19 |
| 11 | 3.4.4 (src-load-remote, app.component.ts:26) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19 |
| 12 | 3.4.4 (src-load-remote, app.routes.ts:2) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #19 |
| 13 | 3.4.4 (src-load-remote, app.routes.ts:8) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19 |
| 14 | 3.4.4 (manual, app.component.ts:36) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #19 |
| 15 | 3.4.4 (manual, app.routes.ts:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #19 |
| 16 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 17 | 3.4.3 (projects/demo) | 4 estrutura | diretório | module-federation | arquitetural | moderada | — |
| 18 | 3.4.3 (projects/seed-mfe-remote) | 4 estrutura | diretório | module-federation | arquitetural | moderada | — |
| 19 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #17; liga #18 |
| 20 | 3.4.6 #1 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #17 |
| 21 | 3.4.6 #2 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #18 |
| 22 | 3.4.8 #1 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #3; explica #11; explica #13; explica #19 |

## Resumo

Observações: 22. Dimensões (tecnologia: 1, configuração: 6, código: 8, estrutura: 3, composição: 1, build-deploy: 2, documentação: 0, histórico: 1). Força (forte: 5, moderada: 12, fraca: 5, ambígua: 0). Evidência (tecnológica: 10, arquitetural: 11, contexto: 1).

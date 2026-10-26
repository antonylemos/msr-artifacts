---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
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

# 305 — martinkuba/micro-frontend-test

## Leitura do repositório

A revisão de dependências não tem linhas, portanto não há observação na dimensão 1. A cadeia começa nas configurações: main-content expõe `./MainContent` (#1), o shell resolve esse remote por URL (#2), importa seu módulo (#4) e o renderiza (#7). Essa cadeia sustenta a relação ativa shell → main-content por Module Federation (#12), com builds separados (#13–#14). O shell tem entrada que monta a UI (#10); a entrada de main-content apenas reexporta o componente, deixando sua execução autônoma indeterminada (#9). O papel de remote está demonstrado sem resolver essa dúvida estrutural. A raiz apenas coordena o workspace (#8).

Sidebar preserva configuração federada (#3) e build separado (#15), mas seu import e montagem estão comentados (#5), assim como sua referência no host (#2). A mensagem de carregamento federado da interface (#27) contradiz esse estado. Seu limite como aplicação autônoma também fica indeterminado (#11). Os históricos das entradas dos remotes explicam que elas já só reexportavam componentes na primeira presença observável (#29–#30); o histórico do sidebar não confirma por conteúdo sua ligação anterior ao host (#31), sem deixar dúvida sobre a desconexão no snapshot.

O README e os textos da interface descrevem host, remote, composição e bundles (#16–#19, #21, #23–#24), mas são afirmações de força fraca. A alegação de execução independente de main-content não tem corroboração (#22). A inicialização local do Faro (#20) é contexto de observabilidade, não comunicação entre unidades; o comentário sobre seu bundle no sidebar (#28) trata de empacotamento. Há três builds separados, sem deploy observado nem versionamento independente (#13–#15). As portas e os servidores locais não demonstram publicação.

## Observações

### 1. packages/main-content/webpack.config.js:4-54

**Observação:** a configuração webpack de main-content usa `ModuleFederationPlugin` com nome `mainContent`, arquivo `remoteEntry.js` e exposição de `./MainContent` a partir de `./src/MainContent`. Compartilha React, React DOM e Faro SDK como singletons.

**Interpretação:** configura Module Federation num produtor de componente com identidade própria. Sem nomear um consumidor, a configuração sozinha é evidência tecnológica moderada.

### 2. packages/shell/webpack.config.js:5-60

**Observação:** o plugin federado do shell declara `name: 'shell'`, resolve `mainContent` por `mainContent@http://localhost:3001/remoteEntry.js` e compartilha React, React DOM e Faro SDK como singletons. A entrada `sidebar` em `remotes` está comentada.

**Interpretação:** liga explicitamente o host ao remote mainContent por Module Federation, constituindo evidência arquitetural forte. A configuração não estabelece uma ligação ativa com sidebar.

### 3. packages/sidebar/webpack.config.js:4-54

**Observação:** o plugin federado de sidebar declara nome `sidebar`, `remoteEntry.js`, exposição de `./Sidebar` a partir de `./src/Sidebar` e compartilhamento singleton de React e React DOM. Faro não está em `shared`.

**Interpretação:** configura um produtor federado, sem declarar consumidor. É evidência tecnológica moderada e não demonstra participação na composição atual.

### 4. packages/shell/src/App.tsx:6; packages/main-content/webpack.config.js:31-42; packages/shell/webpack.config.js:32-43; packages/shell/src/App.tsx:199-203; packages/shell/src/bootstrap.tsx:14-19; packages/shell/src/index.tsx:2

**Observação:** `React.lazy` importa `mainContent/MainContent`; esse identificador corresponde ao remote declarado no shell e ao módulo exposto por main-content. O componente aparece no App montado pelo bootstrap do shell.

**Interpretação:** o import nomeia diretamente o destino federado e integra seu módulo ao host, sustentando composição arquitetural forte.

### 5. packages/shell/src/App.tsx:7; packages/shell/src/App.tsx:206-214; packages/shell/webpack.config.js:36

**Observação:** o import dinâmico de `sidebar/Sidebar` está comentado, assim como a montagem de `Sidebar` e a declaração do remote no shell.

**Interpretação:** a construção preserva a intenção de consumo federado, mas não participa da composição no snapshot. É um sinal tecnológico fraco, não uma ligação ativa.

### 6. packages/shell/src/index.tsx:2; packages/shell/src/bootstrap.tsx:1-19

**Observação:** a entrada faz `import('./bootstrap')`, carregando um arquivo local que importa App e monta a UI do shell.

**Interpretação:** é uma fronteira assíncrona interna, sem destino externo. A observação registra um padrão tecnológico associado à preparação do carregamento, mas não demonstra sozinha um mecanismo de MFE nem composição entre unidades; mantém a força fraca da construção No.

### 7. packages/shell/src/App.tsx:199-203; packages/shell/src/App.tsx:6

**Observação:** `<MainContent />` é renderizado dentro de `ErrorBoundary` e `Suspense`; a variável foi definida pelo import lazy de `mainContent/MainContent`.

**Interpretação:** a renderização integra o componente remoto à interface do host. Como a construção principal apenas renderiza o componente fora de uma rota, sua força é moderada; a resolução federada está nas observações próprias.

### 8. .; package.json:11; package.json:14-18

**Observação:** o manifesto da raiz lista shell, main-content e sidebar como workspaces, e seu script de build delega a `npm run build --workspaces`. A linha estrutural registra ausência de entrada e build próprios na raiz.

**Interpretação:** a raiz coordena pacotes, sem constituir unidade frontend. É contexto fraco, evitando confundir workspace com aplicação.

### 9. packages/main-content; packages/main-content/webpack.config.js:8; packages/main-content/src/index.ts:1; packages/main-content/webpack.config.js:30-43; packages/main-content/package.json:7; package.json:16

**Observação:** o diretório tem manifesto, configuração webpack e build próprios; a entrada `src/index.ts` apenas reexporta MainContent. O plugin produz `remoteEntry.js`; a revisão registra ausência de `index.html` e de montagem da UI nesse diretório.

**Interpretação:** o pacote tem limite de build e função de remote, mas a revisão estrutural mantém Unidade frontend Undetermined: permanecem plausíveis o uso como componente hospedado e uma execução autônoma em outro contexto não demonstrado. A força estrutural é ambígua.

### 10. packages/shell; packages/shell/webpack.config.js:9; packages/shell/src/index.tsx:2; packages/shell/src/bootstrap.tsx:14-19; packages/shell/webpack.config.js:31-48; packages/shell/package.json:7; package.json:15

**Observação:** o diretório tem manifesto e build webpack próprios, entrada que importa o bootstrap e montagem React de App. `HtmlWebpackPlugin` gera `index.html` a partir de `./public/index.html`.

**Interpretação:** confirma o limite de uma unidade frontend com UI e build próprios, de força moderada. A ligação com outra unidade é estabelecida separadamente.

### 11. packages/sidebar; packages/sidebar/webpack.config.js:8; packages/sidebar/src/index.ts:1; packages/sidebar/webpack.config.js:30-42; packages/sidebar/package.json:7; package.json:17

**Observação:** o diretório tem manifesto e build webpack próprios com `remoteEntry.js`; sua entrada apenas reexporta Sidebar. A revisão registra ausência de `index.html` e de código que monte a UI sozinho no diretório.

**Interpretação:** há um pacote produtor de componente federado, mas sua condição de unidade frontend autônoma fica Undetermined: uso hospedado e execução em contexto externo não demonstrado continuam plausíveis. A ambiguidade estrutural é distinta da desconexão do host.

### 12. packages/shell/src/App.tsx:6; packages/shell/src/App.tsx:201; packages/shell/webpack.config.js:34-35; packages/main-content/webpack.config.js:32-36

**Observação:** o shell resolve mainContent por `remoteEntry.js`, importa `mainContent/MainContent` e renderiza o componente; o destino declara esse nome e expõe `./MainContent`.

**Interpretação:** a correspondência entre consumidor e produtor demonstra a relação ativa host → remote por Module Federation. É evidência arquitetural forte, sem pressupor montagem autônoma do remote.

### 13. packages/main-content/webpack.config.js:4-43; packages/main-content/package.json:6-7; package.json:11; packages/main-content/webpack.config.js:44-53; packages/main-content/package.json:3-4

**Observação:** main-content tem comando webpack e saída `dist` próprios com `remoteEntry.js`; o build da raiz pode acioná-lo por workspace. É servido em desenvolvimento por `webpack serve`. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** há limite de build próprio para o produtor federado, com força arquitetural moderada. Servir localmente não demonstra deploy, publicação ou UI autônoma.

### 14. packages/shell/webpack.config.js:5-48; packages/shell/package.json:6-7; package.json:11; packages/shell/webpack.config.js:49-59; packages/shell/package.json:3-4

**Observação:** o shell tem comando webpack e saída `dist` próprios, com geração de `index.html`, acionáveis pelo build dos workspaces. O servidor é de desenvolvimento. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** confirma um artefato de build do host separado dos remotes, evidência arquitetural moderada. Não demonstra deploy independente.

### 15. packages/sidebar/webpack.config.js:4-42; packages/sidebar/package.json:6-7; package.json:11; packages/sidebar/webpack.config.js:44-53; packages/sidebar/package.json:3-4

**Observação:** sidebar tem comando webpack e saída `dist` próprios com `remoteEntry.js`, incluídos no build dos workspaces, e servidor de desenvolvimento. A revisão registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** confirma separação do build do pacote, evidência arquitetural moderada, mesmo sem consumo ativo no host. Não estabelece deploy independente nem montagem autônoma da UI.

### 16. README.md:3

**Observação:** o README apresenta o projeto como uma aplicação simples de micro-frontends para testar Grafana Faro em arquitetura distribuída.

**Interpretação:** a caracterização do conjunto é evidência arquitetural semântica fraca, corroborada pela relação ativa entre host e remote.

### 17. README.md:7

**Observação:** o README descreve Shell como aplicação host que carrega micro-frontends remotos.

**Interpretação:** nomeia o papel do host na organização, evidência arquitetural fraca corroborada pela relação com main-content. A frase não enumera sidebar como remote ativo.

### 18. README.md:8

**Observação:** o README descreve Main Content como micro-frontend remoto com instância própria de Faro.

**Interpretação:** situa o produtor no conjunto e atribui inicialização local de telemetria, evidência arquitetural fraca corroborada pela composição e pelos fontes citados na revisão. O papel de remote não comprova UI autônoma.

### 19. README.md:10

**Observação:** o README afirma uso de Webpack Module Federation para carregar micro-frontends dinamicamente em runtime.

**Interpretação:** descreve composição entre unidades por mecanismo explícito, mas continua uma afirmação arquitetural fraca, corroborada pela ligação ativa.

### 20. README.md:23

**Observação:** o README afirma que cada micro-frontend inicializa sua própria instância do Faro em `src/faro.ts`.

**Interpretação:** descreve telemetria local, sem configurar ou ligar unidades. É contexto fraco, corroborado pelos caminhos de inicialização que a revisão documental confrontou, inclusive a implementação preservada no sidebar desligado.

### 21. packages/main-content/src/MainContent.tsx:159-160

**Observação:** o texto da interface diz que o componente é carregado do micro-frontend main-content por Module Federation.

**Interpretação:** afirma o vínculo de origem do componente com o produtor federado, evidência arquitetural fraca corroborada pelo import e render do shell.

### 22. packages/main-content/src/MainContent.tsx:160

**Observação:** o texto da interface afirma que o componente executa independentemente.

**Interpretação:** é uma alegação arquitetural de independência, de força fraca e sem corroboração na revisão documental. Não resolve o Undetermined estrutural de main-content.

### 23. packages/main-content/src/MainContent.tsx:160

**Observação:** o texto da interface afirma que o componente compartilha React com o shell.

**Interpretação:** descreve uma propriedade entre unidades, evidência arquitetural fraca corroborada pelo uso de React e pelas configurações singleton dos dois lados. O texto não nomeia por si o mecanismo desse compartilhamento.

### 24. packages/main-content/src/MainContent.tsx:218-219

**Observação:** o texto da interface afirma que cada micro-frontend é construído como bundle separado.

**Interpretação:** afirma limites de build entre unidades, evidência arquitetural fraca corroborada pelos três builds separados. Não afirma deploy independente.

### 25. packages/shell/src/App.tsx:206

**Observação:** o comentário informa que Sidebar está oculto por enquanto.

**Interpretação:** é uma afirmação arquitetural fraca sobre a retirada de um participante da interface, corroborada pelo import, render e remote comentados no snapshot.

### 26. packages/shell/src/index.tsx:1

**Observação:** o comentário diz que o import dinâmico garante que as dependências compartilhadas sejam carregadas primeiro.

**Interpretação:** descreve a finalidade técnica da fronteira assíncrona, evidência tecnológica fraca corroborada estaticamente pelo bootstrap e pelo shared do host. Não situa sozinho outra unidade nem nomeia uma abordagem de MFE.

### 27. packages/sidebar/src/Sidebar.tsx:158

**Observação:** o texto de status da interface afirma carregamento por Module Federation.

**Interpretação:** é uma afirmação tecnológica fraca de uso do mecanismo, contradita pelo consumo de sidebar comentado no host. A mensagem preservada não comprova carregamento atual.

### 28. packages/sidebar/webpack.config.js:40

**Observação:** o comentário afirma que Faro SDK não é compartilhado e que esse micro-frontend tem seu próprio bundle.

**Interpretação:** descreve uma propriedade de empacotamento do sidebar, evidência arquitetural fraca corroborada pelo shared sem Faro, pelo import local do SDK e pelo build próprio. Não estabelece consumo ativo pelo shell.

### 29. efec921 2026-01-06 (packages/main-content/src/index.ts); packages/main-content/src/index.ts:1; packages/main-content/webpack.config.js:8

**Observação:** a revisão histórica registra a entrada de main-content em `efec921` apenas reexportando MainContent, sem mudanças posteriores desse arquivo até o snapshot. O resultado do ponto é esclarecido.

**Interpretação:** explica que a entrada sem montagem já aparece assim na primeira presença observável, sem demonstrar execução independente passada ou atual. É evidência histórica arquitetural fraca e mantém a dúvida estrutural e a alegação sem corroboração.

### 30. efec921 2026-01-06 (packages/sidebar/src/index.ts); packages/sidebar/src/index.ts:1; packages/sidebar/webpack.config.js:8

**Observação:** a revisão histórica registra a entrada de sidebar em `efec921` apenas reexportando Sidebar, sem mudanças posteriores desse arquivo até o snapshot. O resultado do ponto é esclarecido.

**Interpretação:** explica a permanência da entrada sem montagem, sem comprovar UI autônoma em outro contexto. É evidência histórica arquitetural fraca, que não altera o Undetermined estrutural.

### 31. eb20348 2026-01-07 (packages/sidebar/src/Sidebar.tsx); 3174dd1 2026-01-07 (package.json; packages/shell/src/App.tsx; packages/shell/webpack.config.js); packages/sidebar/src/Sidebar.tsx:158; packages/shell/src/App.tsx:7; packages/shell/src/App.tsx:206-214; packages/shell/webpack.config.js:36; package.json:7

**Observação:** a revisão histórica encontrou a mensagem de carregamento federado em Sidebar antes de `3174dd1`, cuja mensagem anuncia retirada temporária e cuja listagem altera manifesto, App e configuração do host. Os blobs antigos do App e da configuração consultados estavam ausentes; a ligação anterior não foi confirmada por conteúdo. O ponto permanece inconclusivo.

**Interpretação:** a dúvida é sobre a ligação passada e a intenção de retirada, não sobre a desconexão atual, confirmada no snapshot. A força é fraca: o histórico explica a permanência de uma mensagem contradita, sem provar uso anterior nem abandono definitivo.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.3 (packages/main-content, Marcadores; Entrada; Build); 3.4.4 (App.tsx:6, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #3, #6, #8, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #4; configura #9; configura #12 |
| 2 | 3.4.3 (packages/shell, Marcadores; Entrada; Build); 3.4.4 (App.tsx:6, App.tsx:7, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #2, #4, #8, #9, #10, #11, #12 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #4; configura #7; configura #10; configura #12 |
| 3 | 3.4.3 (packages/sidebar, Marcadores; Entrada; Build); 3.4.6 #3 (Artefatos); 3.4.7 #9, #13 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #11 |
| 4 | 3.4.4 (packages/shell/src/App.tsx:6) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #12 |
| 5 | 3.4.4 (packages/shell/src/App.tsx:7) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 6 | 3.4.4 (packages/shell/src/index.tsx:2) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 7 | 3.4.4 (fora da mineração, packages/shell/src/App.tsx:201) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #12 |
| 8 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 9 | 3.4.3 (packages/main-content) | 4 estrutura | diretório | module-federation | arquitetural | ambígua | — |
| 10 | 3.4.3 (packages/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 11 | 3.4.3 (packages/sidebar) | 4 estrutura | diretório | module-federation | arquitetural | ambígua | — |
| 12 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #10; liga #9 |
| 13 | 3.4.6 #1 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #9 |
| 14 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #10 |
| 15 | 3.4.6 #3 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #11 |
| 16 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12 |
| 17 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12 |
| 18 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora packages/main-content/src/MainContent.tsx:108-110; corrobora packages/main-content/src/faro.ts:9-28 |
| 19 | 3.4.7 #4 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #12 |
| 20 | 3.4.7 #5 | 7 documentação | documentação | — | contexto | fraca | corrobora packages/shell/src/bootstrap.tsx:3-7; corrobora packages/shell/src/faro.ts:10-32; corrobora packages/main-content/src/MainContent.tsx:108-110; corrobora packages/main-content/src/faro.ts:9-28; corrobora packages/sidebar/src/Sidebar.tsx:87-90; corrobora packages/sidebar/src/faro.ts:8-28 |
| 21 | 3.4.7 #6 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #12 |
| 22 | 3.4.7 #7 | 7 documentação | comentário | — | arquitetural | fraca | — |
| 23 | 3.4.7 #8 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #1; corrobora #2; corrobora packages/main-content/src/MainContent.tsx:1; corrobora packages/shell/src/App.tsx:1 |
| 24 | 3.4.7 #9 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #13; corrobora #14; corrobora #15 |
| 25 | 3.4.7 #10 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #5; corrobora #2 |
| 26 | 3.4.7 #11 | 7 documentação | comentário | — | tecnológica | fraca | corrobora #6; corrobora #2; corrobora packages/shell/src/bootstrap.tsx:1-4; corrobora packages/shell/src/bootstrap.tsx:14-19 |
| 27 | 3.4.7 #12 | 7 documentação | comentário | module-federation | tecnológica | fraca | contradiz #5; contradiz #2 |
| 28 | 3.4.7 #13 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #3; corrobora #15; corrobora packages/sidebar/src/faro.ts:1-6; corrobora packages/sidebar/src/faro.ts:15-28 |
| 29 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #9; explica #22 |
| 30 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #11 |
| 31 | 3.4.8 #3 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #5; explica #27 |

## Resumo

Observações: 31. Dimensões (tecnologia: 0, configuração: 3, código: 4, estrutura: 4, composição: 1, build-deploy: 3, documentação: 13, histórico: 3). Força (forte: 3, moderada: 7, fraca: 19, ambígua: 2). Evidência (tecnológica: 6, arquitetural: 23, contexto: 2).

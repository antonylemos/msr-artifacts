---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
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

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Leitura do repositório

O frontend reúne três unidades num workspace pnpm: customer-app, merchant-app e shell (#13, #14, #16). A cadeia que sustenta a arquitetura usa o Module Federation nativo do webpack: o shell declara os dois remotes (#6), cada remote expõe sua fábrica `createAdminAppConfig` (#2, #3), os adaptadores a carregam por nome em runtime (#7, #8), e o shell renderiza as configurações recebidas no `AdminApp` comum sob as rotas das duas áreas (#9–#11). As duas relações host → remote estão ativas e seus destinos estão no snapshot (#17, #18). Os remotes fornecem configurações com componentes de suas áreas; a montagem React é responsabilidade do shell.

Há limites de build por aplicação (#19–#21), e os remotes também possuem entradas standalone (#13, #14). A raiz coordena os pacotes e fornece um ambiente Docker comum de desenvolvimento (#12). A biblioteca `shared` é código compartilhado do workspace, sem ser outra aplicação (#15). Nenhum deploy foi observado: a afirmação sobre implantações isoladas fica sem corroboração (#25), mesmo com builds separados.

O sinal enganoso é a dependência `@module-federation/typescript` (#1). Há declarações dela nos tsconfig (#4, #5), mas o efeito no build continua indeterminado; os plugins das três configurações vêm de webpack. A descrição que atribui o plugin ao pacote é contradita (#30), e o histórico mostra que essa combinação existe desde a introdução dos arquivos (#32). Essa dúvida localizada não torna ambígua a composição observada. As demais afirmações documentais corroboram a organização, o carregamento e os modos de desenvolvimento (#22–#24, #26–#29, #31), com as ressalvas já registradas sobre os comandos standalone e o tratamento da carga assíncrona.

## Observações

### 1. frontend/package.json:40

**Observação:** O manifesto do workspace declara `@module-federation/typescript: ^3.1.3` em `devDependencies`.

**Interpretação:** É um sinal tecnológico de federação cujo uso efetivo permanece `Undetermined` na 3.4.2: a entrada nos tsconfig pode integrar a ferramenta ou ser inoperante. Essa dúvida não se estende ao plugin nativo do webpack registrado nas configurações.

### 2. frontend/customer-app/webpack.config.js:3; frontend/customer-app/webpack.config.js:8; frontend/customer-app/webpack.config.js:80-116

**Observação:** A configuração obtém `ModuleFederationPlugin` de `webpack.container`. No modo remoto, declara `name: "customer_app"`, `filename: "remoteEntry.js"` e expõe `./createAdminAppConfig` pelo serviço `./src/application/services/create-admin-app-config.service.ts`. Compartilha React, React DOM, React Router, react-admin e React Query como singletons; o modo standalone escolhe outro ramo.

**Interpretação:** Configura o mecanismo de federação de uma unidade e o contrato que oferece. O bloco não nomeia uma unidade consumidora.

### 3. frontend/merchant-app/webpack.config.js:3; frontend/merchant-app/webpack.config.js:8; frontend/merchant-app/webpack.config.js:80-116

**Observação:** A configuração obtém `ModuleFederationPlugin` de `webpack.container`. No modo remoto, declara `name: "merchant_app"`, `filename: "remoteEntry.js"` e expõe `./createAdminAppConfig` pelo serviço `./src/application/services/create-admin-app-config.service.ts`. Compartilha React, React DOM, React Router, react-admin e React Query como singletons; o modo standalone escolhe outro ramo.

**Interpretação:** Configura o mecanismo de federação de uma unidade e o contrato que oferece. O bloco não nomeia uma unidade consumidora.

### 4. frontend/shell/tsconfig.build.json:17-24

**Observação:** `compilerOptions.plugins` contém `name: "@module-federation/typescript"` com `configPath: "./webpack.config.js"` em `tsconfig.build.json`.

**Interpretação:** É uma declaração de configuração da ferramenta de tipos associada à federação no shell. A declaração não comprova sua execução: a 3.4.2 mantém o efeito no build indeterminado. Não declara remotes nem estabelece ligação entre unidades.

### 5. frontend/shell/tsconfig.json:25-32

**Observação:** `compilerOptions.plugins` contém `name: "@module-federation/typescript"` com `configPath: "./webpack.config.js"` em `tsconfig.json`.

**Interpretação:** É uma declaração de configuração da ferramenta de tipos associada à federação no shell. A declaração não comprova sua execução: a 3.4.2 mantém o efeito no build indeterminado. Não declara remotes nem estabelece ligação entre unidades.

### 6. frontend/shell/webpack.config.js:3; frontend/shell/webpack.config.js:59-94

**Observação:** O `ModuleFederationPlugin` nativo do webpack declara `name: "shell"`, os remotes `customer_app@http://localhost:3001/remoteEntry.js` e `merchant_app@http://localhost:3002/remoteEntry.js` e cinco dependências singleton (React, React DOM, React Router, react-admin e React Query).

**Interpretação:** A configuração liga explicitamente o host aos dois remotes e fornece os endereços pelos quais serão resolvidos.

### 7. frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:7-14

**Observação:** O adaptador executa `await import('customer_app/createAdminAppConfig')` e chama a fábrica recebida com `onBack` e `basename: settings.customerBasePath`.

**Interpretação:** O shell carrega em runtime um módulo que nomeia a unidade remota de destino e obtém sua configuração de telas. O callback de retorno redireciona a janela; não é um canal de mensagens.

### 8. frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:7-14

**Observação:** O adaptador executa `await import('merchant_app/createAdminAppConfig')` e chama a fábrica recebida com `onBack` e `basename: settings.merchantBasePath`.

**Interpretação:** O shell carrega em runtime um módulo que nomeia a unidade remota de destino e obtém sua configuração de telas. O callback de retorno redireciona a janela; não é um canal de mensagens.

### 9. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34-66; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:81-88

**Observação:** A entrada renderiza `App`; na montagem, ele solicita as configurações customer e merchant e, depois de receber ambas, declara a página inicial e as rotas `${customerBasePath}/*` e `${merchantBasePath}/*`, cada uma com seu `AdminApp`.

**Interpretação:** A tabela de rotas associa caminhos às áreas carregadas dos dois remotes e organiza sua composição no shell.

### 10. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:35; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:50-54; frontend/customer-app/src/application/services/create-admin-app-config.service.ts:7-25

**Observação:** `<AdminApp {...customerAdminProps} />` recebe as props carregadas por `loadCustomerConfig`, dentro de `ErrorBoundary` e `Suspense`. A fábrica do remote inclui `InstallmentList`, `PlanList` e `PlanShow`.

**Interpretação:** É a renderização da configuração de uma área remota no componente comum `AdminApp`. A chamada de renderização usa as props recebidas; a identificação do remote e a resolução federada aparecem nos adaptadores e nas configurações.

### 11. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:36; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:60-64; frontend/merchant-app/src/application/services/create-admin-app-config.service.ts:8-23

**Observação:** `<AdminApp {...merchantAdminProps} />` recebe as props carregadas por `loadMerchantConfig`, dentro de `ErrorBoundary` e `Suspense`. A fábrica do remote inclui `Dashboard`, `PlanList`, `PlanShow` e `PlanCreate`.

**Interpretação:** É a renderização da configuração de uma área remota no componente comum `AdminApp`. A chamada de renderização usa as props recebidas; a identificação do remote e a resolução federada aparecem nos adaptadores e nas configurações.

### 12. frontend; frontend/package.json:5-14; frontend/Dockerfile.dev:3-52; docker-compose.dev.yml:149-174

**Observação:** A raiz do workspace lista quatro pacotes e delega o build a eles. Sua imagem de desenvolvimento termina em `sh`, e o compose monta `./frontend` como volume e expõe as três portas. Não há entrada de aplicação própria na raiz.

**Interpretação:** É coordenação do workspace e ambiente comum de desenvolvimento, sem constituir uma quarta aplicação frontend.

### 13. frontend/customer-app; frontend/customer-app/package.json:1-9; frontend/customer-app/webpack.config.js:14-29; frontend/customer-app/webpack.config.js:74-116; frontend/customer-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8

**Observação:** O pacote `@bnpl/customer-app` tem manifesto, scripts e configuração webpack próprios. O modo standalone seleciona uma entrada que chama `renderStandaloneApp` e inclui HTML próprio; o modo remoto seleciona a entrada remota e expõe a fábrica de configuração.

**Interpretação:** O diretório delimita uma unidade frontend com entrada de UI standalone e build próprios, também disponível como remote.

### 14. frontend/merchant-app; frontend/merchant-app/package.json:1-9; frontend/merchant-app/webpack.config.js:14-29; frontend/merchant-app/webpack.config.js:74-116; frontend/merchant-app/src/infrastructure/standalone/standalone-app.bootstrap.tsx:4-8

**Observação:** O pacote `@bnpl/merchant-app` tem manifesto, scripts e configuração webpack próprios. O modo standalone seleciona uma entrada que chama `renderStandaloneApp` e inclui HTML próprio; o modo remoto seleciona a entrada remota e expõe a fábrica de configuração.

**Interpretação:** O diretório delimita uma unidade frontend com entrada de UI standalone e build próprios, também disponível como remote.

### 15. frontend/shared; frontend/shared/package.json:1-9

**Observação:** O pacote `@bnpl/shared` aponta `main` e `types` para `src/index.ts` e compila por `tsc -p tsconfig.build.json`, sem entrada de aplicação.

**Interpretação:** É uma biblioteca do workspace, sem constituir outra unidade frontend.

### 16. frontend/shell; frontend/shell/package.json:1-7; frontend/shell/webpack.config.js:7; frontend/shell/webpack.config.js:59-98; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:81-88

**Observação:** O pacote `shell` tem scripts e configuração webpack próprios, uma entrada que cria a raiz React e um template HTML. Sua configuração declara dois remotes.

**Interpretação:** O diretório delimita a unidade frontend que exerce o papel de host.

### 17. frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10-14; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34-66; frontend/shell/webpack.config.js:62; frontend/customer-app/webpack.config.js:81-88

**Observação:** O shell importa `customer_app/createAdminAppConfig`, nome resolvido pela URL do remote no webpack do host e pelo `name` e `exposes` no webpack de `frontend/customer-app`. As props devolvidas são renderizadas na rota `${customerBasePath}/*`.

**Interpretação:** É uma relação host → remote ativa por Module Federation, com origem e destino presentes no snapshot. O remote fornece as telas por uma fábrica de configuração; o shell realiza a montagem.

### 18. frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10-14; frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34-66; frontend/shell/webpack.config.js:63; frontend/merchant-app/webpack.config.js:81-88

**Observação:** O shell importa `merchant_app/createAdminAppConfig`, nome resolvido pela URL do remote no webpack do host e pelo `name` e `exposes` no webpack de `frontend/merchant-app`. As props devolvidas são renderizadas na rota `${merchantBasePath}/*`.

**Interpretação:** É uma relação host → remote ativa por Module Federation, com origem e destino presentes no snapshot. O remote fornece as telas por uma fábrica de configuração; o shell realiza a montagem.

### 19. frontend/customer-app/package.json:3-9; frontend/customer-app/webpack.config.js:24-29; frontend/customer-app/webpack.config.js:81-88; frontend/package.json:14; frontend/Dockerfile.dev:15-52; docker-compose.dev.yml:149-174

**Observação:** O script do pacote executa webpack em modo remoto, com saída no seu `dist` e `remoteEntry.js` próprio. O build da raiz dispara os builds dos pacotes; a aplicação é servida em desenvolvimento na porta 3001. O Dockerfile apenas prepara o ambiente, e o compose monta fontes e roda `sh`. O pacote é privado e sua versão `0.1.0` não aparece em publicação.

**Interpretação:** O build é separado por aplicação, mas o deploy não foi observado e não há versionamento independente demonstrado. A imagem comum de desenvolvimento não publica o artefato.

### 20. frontend/merchant-app/package.json:3-9; frontend/merchant-app/webpack.config.js:24-29; frontend/merchant-app/webpack.config.js:81-88; frontend/package.json:14; frontend/Dockerfile.dev:15-52; docker-compose.dev.yml:149-174

**Observação:** O script do pacote executa webpack em modo remoto, com saída no seu `dist` e `remoteEntry.js` próprio. O build da raiz dispara os builds dos pacotes; a aplicação é servida em desenvolvimento na porta 3002. O Dockerfile apenas prepara o ambiente, e o compose monta fontes e roda `sh`. O pacote é privado e sua versão `0.1.0` não aparece em publicação.

**Interpretação:** O build é separado por aplicação, mas o deploy não foi observado e não há versionamento independente demonstrado. A imagem comum de desenvolvimento não publica o artefato.

### 21. frontend/shell/package.json:3-9; frontend/shell/webpack.config.js:7-8; frontend/shell/webpack.config.js:29-32; frontend/shell/webpack.config.js:59-98; frontend/package.json:14; frontend/Dockerfile.dev:15-52; docker-compose.dev.yml:149-174

**Observação:** O script do shell executa sua configuração webpack, com entrada própria e saída sem `output.path` sobrescrito (o `dist` padrão do pacote). O build da raiz dispara os builds dos pacotes; a aplicação é servida em desenvolvimento na porta 3000. O Dockerfile apenas prepara o ambiente, e o compose monta fontes e roda `sh`. O pacote é privado e sua versão `0.1.0` não aparece em publicação.

**Interpretação:** O build é separado por aplicação, mas o deploy não foi observado e não há versionamento independente demonstrado. A imagem comum de desenvolvimento não publica o artefato.

### 22. README.md:10

**Observação:** O README descreve um sistema Django e React com TypeScript que usa arquitetura de micro-frontends.

**Interpretação:** É uma afirmação arquitetural corroborada pelas três unidades e pelas duas relações federadas. O backend Django é contexto do sistema, sem integrar a composição frontend.

### 23. README.md:12

**Observação:** O README afirma que há painéis react-admin separados sob `customer/*` e `merchant/*`.

**Interpretação:** A separação das duas áreas é corroborada pelas rotas e pelas configurações recebidas dos remotes.

### 24. README.md:42

**Observação:** O README nomeia Module Federation, carregamento em runtime de aplicações React independentes e desenvolvimento paralelo.

**Interpretação:** A afirmação é corroborada pelos imports federados e pelos limites de entrada e build das três unidades. A independência técnica convive com a biblioteca de workspace comum; a frase não demonstra equipes distintas.

### 25. README.md:42

**Observação:** O README afirma que a arquitetura permite implantações isoladas.

**Interpretação:** A 3.4.7 registra a afirmação como sem corroboração. Os builds separados não demonstram deploy: a 3.4.6 registra deploy não observado para as três aplicações.

### 26. README.md:245-261

**Observação:** O README apresenta comandos e endereços para desenvolvimento standalone dos dois remotes. Os filtros customer e merchant estão trocados nos comandos.

**Interpretação:** A capacidade standalone é corroborada pelas entradas e scripts dos remotes; a troca dos filtros é um erro de instrução já registrado na 3.4.7.

### 27. README.md:360-369

**Observação:** A árvore do frontend rotula `shell` como host, `customer-app` e `merchant-app` como remotes e `shared` como módulos e utilitários comuns.

**Interpretação:** A organização descrita corresponde às três unidades e às relações ativas; a biblioteca compartilhada não aumenta a contagem de unidades.

### 28. README.md:397

**Observação:** A tabela de tecnologias descreve um monorepo gerido com pnpm workspaces.

**Interpretação:** É uma afirmação sobre a organização dos pacotes, corroborada pela lista de quatro pacotes no workspace. Essa organização não basta sozinha para mostrar composição.

### 29. frontend/customer-app/webpack.config.js:13

**Observação:** O comentário diz que apenas a entrada standalone deve usar `root.render` e que o shell deve renderizar no modo remoto.

**Interpretação:** A divisão de responsabilidade é corroborada pela seleção de entrada e exposição da fábrica no remote, pela renderização de `AdminApp` e pela raiz React criada no shell.

### 30. frontend/package.json:70

**Observação:** O campo `dependenciesDocumentation` associa `@module-federation/typescript` à necessidade do `ModuleFederationPlugin` para fornecer e consumir módulos em runtime.

**Interpretação:** A atribuição do plugin ao pacote é contradita pelas três configurações, que o obtêm de `webpack.container`. A afirmação não comprova o efeito da entrada do pacote nos tsconfig.

### 31. frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:21-24

**Observação:** O comentário diz que o shell carrega configurações AdminApp de customer e merchant, envolve a renderização em ErrorBoundary e Suspense e monta sob rotas.

**Interpretação:** O carregamento e a montagem descritos são corroborados pelo código e pelas relações. As promessas iniciais não têm `catch`; os wrappers da renderização não demonstram proteção contra falha nessa carga.

### 32. 4407d40 2025-06-14 (frontend/package.json); 9b20b3c 2025-06-14 (frontend/shell/tsconfig.build.json, frontend/shell/tsconfig.json, frontend/shell/webpack.config.js); dba76f7 2025-06-14 (frontend/customer-app/webpack.config.js); 785cc27 2025-06-14 (frontend/merchant-app/webpack.config.js)

**Observação:** A 3.4.8 registra que o manifesto, os tsconfig do shell e os webpack.config.js mantêm no snapshot os mesmos objetos de seus commits de introdução. A declaração do pacote, sua descrição e a entrada nos tsconfig já existiam junto das configurações que obtêm o plugin de webpack.

**Interpretação:** O ponto está esclarecido quanto à evolução: nesses arquivos não houve substituição posterior de uma integração que invocasse o pacote pelo plugin nativo. O histórico não esclarece o efeito da entrada nos tsconfig nem a razão da descrição incorreta; preserva `Undetermined` na dependência e a afirmação contradita.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (frontend/package.json:40) | 1 tecnologia | manifesto | module-federation | tecnológica | ambígua | declara #4; declara #5 |
| 2 | 3.4.2 (frontend/package.json:40, Evidência); 3.4.3 (frontend/customer-app, Marcadores, Entrada, Build); 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #5, #8, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #13; configura #17 |
| 3 | 3.4.2 (frontend/package.json:40, Evidência); 3.4.3 (frontend/merchant-app, Marcadores, Entrada, Build); 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10, Observação); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #14; configura #18 |
| 4 | 3.4.2 (frontend/package.json:40, Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #16 |
| 5 | 3.4.2 (frontend/package.json:40, Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #16 |
| 6 | 3.4.2 (frontend/package.json:40, Evidência); 3.4.3 (frontend/shell, Marcadores, Build); 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10, Observação); 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1, #2 (Onde é servida), #3 (Artefatos); 3.4.7 #1, #3, #9 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #7; configura #8; configura #17; configura #18 |
| 7 | 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:10) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #17 |
| 8 | 3.4.4 (frontend/shell/src/infrastructure/shell/remote-modules/merchant-app.adapter.ts:10) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #18 |
| 9 | 3.4.4 (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:45) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #17; implementa #18 |
| 10 | 3.4.4 (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:52) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #17 |
| 11 | 3.4.4 (frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:62) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #18 |
| 12 | 3.4.3 (frontend) | 4 estrutura | diretório | — | contexto | fraca | — |
| 13 | 3.4.3 (frontend/customer-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.3 (frontend/merchant-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (frontend/shared) | 4 estrutura | diretório | — | contexto | fraca | — |
| 16 | 3.4.3 (frontend/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #16; liga #13 |
| 18 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #16; liga #14 |
| 19 | 3.4.6 #1 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #13 |
| 20 | 3.4.6 #2 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #14 |
| 21 | 3.4.6 #3 | 6 build-deploy | configuração | module-federation | arquitetural | moderada | publica #16 |
| 22 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #14; corrobora #16; corrobora #17; corrobora #18 |
| 23 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #10; corrobora #11; corrobora #17; corrobora #18 |
| 24 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #6; corrobora #7; corrobora #8; corrobora #13; corrobora #14; corrobora #16; corrobora #17; corrobora #18 |
| 25 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 26 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #14 |
| 27 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #13; corrobora #14; corrobora #15; corrobora #16; corrobora #17; corrobora #18 |
| 28 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora frontend/pnpm-workspace.yaml:1-5 |
| 29 | 3.4.7 #8 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #2; corrobora #10; corrobora #11; corrobora frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:81-82 |
| 30 | 3.4.7 #9 | 7 documentação | comentário | module-federation | tecnológica | fraca | contradiz #2; contradiz #3; contradiz #6 |
| 31 | 3.4.7 #10 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #7; corrobora #8; corrobora #9; corrobora #10; corrobora #11; corrobora #17; corrobora #18 |
| 32 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #1; explica #2; explica #3; explica #4; explica #5; explica #6; explica #30 |

## Resumo

Observações: 32. Dimensões (tecnologia: 1, configuração: 5, código: 5, estrutura: 5, composição: 2, build-deploy: 3, documentação: 10, histórico: 1). Força (forte: 6, moderada: 12, fraca: 13, ambígua: 1). Evidência (tecnológica: 7, arquitetural: 23, contexto: 2).

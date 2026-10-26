---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
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

# 232 — riponcc/Group4COMP308Project

## Leitura do repositório

As três aplicações React/Vite têm entrada e build próprios (#15–#17). As declarações do plugin de federação (#1–#3) se concretizam nas configurações: a issue-app e a user-app expõem `./App` (#4, #6), e o shell declara os dois remotes (#5). Os imports nomeiam esses destinos (#7, #8); o host os monta dentro de Suspense conforme o login (#13, #14). As relações host → remote (#22, #23) fecham a cadeia entre unidades relativamente independentes e composição em runtime. A comunicação por eventos em window (#9–#12, #24, #25) conduz a troca: a user-app informa login e logout, e a issue-app informa logout ao shell.

Os builds são separados, mas a 3.4.6 não observa deploy nem versionamento independente (#26–#28). Os scripts chamados deploy apenas encadeiam build e preview local. Os diretórios de backend (#18–#21) explicam a arquitetura de microsserviços ao lado do frontend, sem contar como unidades frontend. As afirmações documentais confirmam a tecnologia, os papéis e os fluxos (#29–#33, #35–#38), mas permanecem evidências fracas por serem declarações semânticas. A afirmação de que o shell consulta um Gateway é contradita: o endereço ativo é o auth-service (#34).

Os dois pontos históricos estão esclarecidos (#39, #40): o bloco antigo comentado do shell não é configuração alternativa em uso, e não foi versionado gateway até o snapshot. A indisponibilidade de versões iniciais limita conclusões sobre o passado, sem deixar ambígua a composição atual. A extração usa somente as revisões finais e a conferência de seus trechos no snapshot. Foram selecionados os três blocos ativos de federação; portas locais, scripts e configuração de backend não declaram elementos de composição adicionais. O bloco comentado permanece no ponto histórico #39.

## Observações

### 1. client/issue-app/package.json:15

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `dependencies`, na versão `^1.3.5`.

**Interpretação:** É uma declaração da tecnologia module-federation; a 3.4.2 registra Configurada `Yes`, mas a declaração isolada não estabelece a organização das unidades.

### 2. client/shell-app/package.json:14

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `dependencies`, na versão `^1.3.5`.

**Interpretação:** É uma declaração da tecnologia module-federation; a 3.4.2 registra Configurada `Yes`, mas a declaração isolada não estabelece a organização das unidades.

### 3. client/user-app/package.json:15

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em `dependencies`, na versão `^1.4.1`.

**Interpretação:** É uma declaração da tecnologia module-federation; a 3.4.2 registra Configurada `Yes`, mas a declaração isolada não estabelece a organização das unidades.

### 4. client/issue-app/vite.config.js:14-26

**Observação:** O plugin `federation` recebe `name: issueApp`, `filename: remoteEntry.js`, expõe `./App` como `./src/App` e compartilha `react`, `react-dom`, `@apollo/client` e `graphql`.

**Interpretação:** Configura a exposição e o compartilhamento de dependências da issue-app; o bloco não nomeia um consumidor.

### 5. client/shell-app/vite.config.js:36-50

**Observação:** O plugin nomeia `shellApp`, declara `userApp` em `http://localhost:3001/assets/remoteEntry.js` e `issueApp` em `http://localhost:3002/assets/remoteEntry.js`, e compartilha React, ReactDOM, Apollo Client e GraphQL como singletons.

**Interpretação:** O host declara dois destinos de federação distintos, ligando o shell às outras unidades por seus remotes.

### 6. client/user-app/vite.config.js:10-17

**Observação:** O plugin nomeia `userApp`, gera `remoteEntry.js`, expõe `./App` como `./src/App` e compartilha `react`, `react-dom`, `@apollo/client` e `graphql`.

**Interpretação:** Configura a exposição da user-app como remote; o consumidor não é nomeado neste bloco.

### 7. client/shell-app/src/App.jsx:10

**Observação:** O shell define `UserApp` com `lazy(() => import("userApp/App"))`.

**Interpretação:** O import nomeia o remote userApp e seu módulo App, realizando o carregamento da unidade de autenticação por federação.

### 8. client/shell-app/src/App.jsx:11

**Observação:** O shell define `IssueApp` com `lazy(() => import("issueApp/App"))`.

**Interpretação:** O import nomeia o remote issueApp e seu módulo App, realizando o carregamento da unidade de ocorrências por federação.

### 9. client/issue-app/src/components/Header.jsx:32-39

**Observação:** O handler de logout do cabeçalho executa a mutação, limpa token e usuário e dispara `window.dispatchEvent(new CustomEvent("logout"))`.

**Interpretação:** Implementa a emissão de logout pela issue-app; a chamada só emite um evento global e não nomeia a unidade consumidora.

### 10. client/shell-app/src/App.jsx:31-43; client/shell-app/src/App.jsx:51-52

**Observação:** O shell registra os listeners `loginSuccess` e `logout`, cujos handlers alteram isLoggedIn e refazem CurrentUser; remove os listeners na limpeza do efeito.

**Interpretação:** Implementa a recepção dos eventos que dirigem a alternância dos remotos. O listener não nomeia a unidade emissora.

### 11. client/user-app/src/UserComponent.jsx:50-58

**Observação:** Ao concluir o login, a user-app grava token e usuário no localStorage e emite `loginSuccess` em window com `detail: { isLoggedIn: true }`.

**Interpretação:** Implementa a notificação do login pela user-app, sem identificar o consumidor na chamada de emissão.

### 12. client/user-app/src/UserComponent.jsx:70-76

**Observação:** Ao concluir a mutação de logout, a user-app remove token e usuário e emite `logout` em window com `detail: { isLoggedIn: false }`.

**Interpretação:** Implementa a emissão de logout pela user-app, sem nomear a unidade receptora.

### 13. client/shell-app/src/App.jsx:61-69

**Observação:** Dentro de Suspense, o shell renderiza `<UserApp />` quando isLoggedIn é falso.

**Interpretação:** É o ponto de montagem do componente remoto de autenticação, condicionado ao estado do shell; a renderização isolada usa o componente já carregado.

### 14. client/shell-app/src/App.jsx:61-69

**Observação:** Dentro de Suspense, o shell renderiza `<IssueApp currentUser={data?.currentUser} />` quando isLoggedIn é verdadeiro.

**Interpretação:** É o ponto de montagem do componente remoto de ocorrências após login. A linha registra a passagem da prop, sem demonstrar que o remoto a consome.

### 15. client/issue-app/; client/issue-app/package.json:1-12; client/issue-app/index.html:10-11; client/issue-app/src/main.jsx:6-10; client/issue-app/vite.config.js:6-35

**Observação:** O diretório tem manifesto próprio, entrada HTML em `/src/main.jsx`, montagem React e configuração Vite; o script `build` chama `vite build`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, como Unidade frontend `Yes` na 3.4.3; não estabelece sozinho sua ligação com as demais.

### 16. client/shell-app/; client/shell-app/package.json:1-12; client/shell-app/index.html:10-11; client/shell-app/src/main.jsx:27-33; client/shell-app/vite.config.js:32-56

**Observação:** O diretório tem manifesto próprio, entrada HTML em `/src/main.jsx`, montagem React e configuração Vite; o script `build` chama `vite build`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, como Unidade frontend `Yes` na 3.4.3; não estabelece sozinho sua ligação com as demais.

### 17. client/user-app/; client/user-app/package.json:1-12; client/user-app/index.html:10-11; client/user-app/src/main.jsx:6-10; client/user-app/vite.config.js:7-26

**Observação:** O diretório tem manifesto próprio, entrada HTML em `/src/main.jsx`, montagem React e configuração Vite; o script `build` chama `vite build`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, como Unidade frontend `Yes` na 3.4.3; não estabelece sozinho sua ligação com as demais.

### 18. server/; server/package.json:1-13

**Observação:** O diretório server contém um manifesto sem dependências, que declara main como index.js; a revisão registra que essa entrada está ausente e não há build.

**Interpretação:** É um diretório de backend sem entrada de UI ou build frontend; Unidade frontend `No` na 3.4.3.

### 19. server/microservices/analytics-ai-service/; server/microservices/analytics-ai-service/package.json:1-8; server/microservices/analytics-ai-service/analytics-ai-microservice.js:40

**Observação:** O pacote Node tem script start que executa `analytics-ai-microservice.js` e entrada de servidor com `app.listen`.

**Interpretação:** É um serviço backend sem UI, marcado Unidade frontend `No`; a separação de microsserviços não constitui separação de unidades frontend.

### 20. server/microservices/auth-service/; server/microservices/auth-service/package.json:1-8; server/microservices/auth-service/auth-microservice.js:244

**Observação:** O pacote Node tem script start que executa `auth-microservice.js` e entrada de servidor com `app.listen`.

**Interpretação:** É um serviço backend sem UI, marcado Unidade frontend `No`; a separação de microsserviços não constitui separação de unidades frontend.

### 21. server/microservices/issue-management-service/; server/microservices/issue-management-service/package.json:1-8; server/microservices/issue-management-service/issue-microservice.js:147

**Observação:** O pacote Node tem script start que executa `issue-microservice.js` e entrada de servidor com `httpServer.listen`.

**Interpretação:** É um serviço backend sem UI, marcado Unidade frontend `No`; a separação de microsserviços não constitui separação de unidades frontend.

### 22. client/shell-app/src/App.jsx:10; client/shell-app/src/App.jsx:61-64; client/shell-app/vite.config.js:39-40; client/user-app/vite.config.js:11-15

**Observação:** O shell importa userApp/App e o renderiza sem login; sua configuração resolve userApp para remoteEntry.js, e a user-app expõe ./App.

**Interpretação:** Liga explicitamente o shell à user-app por Module Federation; a relação é No snapshot `Yes` e Ativa `Yes`.

### 23. client/shell-app/src/App.jsx:11; client/shell-app/src/App.jsx:66-67; client/shell-app/vite.config.js:39-41; client/issue-app/vite.config.js:15-19

**Observação:** O shell importa issueApp/App e o renderiza depois do login; sua configuração resolve issueApp para remoteEntry.js, e a issue-app expõe ./App.

**Interpretação:** Liga explicitamente o shell à issue-app por Module Federation; a relação é No snapshot `Yes` e Ativa `Yes`.

### 24. client/issue-app/src/components/Header.jsx:32-39; client/shell-app/src/App.jsx:37-43

**Observação:** A issue-app emite logout pelo cabeçalho; o shell escuta logout em window, marca isLoggedIn como falso e refaz CurrentUser.

**Interpretação:** Estabelece a comunicação issue-app → shell por eventos, que faz o host voltar à tela de autenticação. A relação é No snapshot `Yes` e Ativa `Yes`.

### 25. client/user-app/src/UserComponent.jsx:50-58; client/user-app/src/UserComponent.jsx:70-76; client/shell-app/src/App.jsx:31-43

**Observação:** A user-app emite loginSuccess e logout em window; o shell escuta os dois, altera isLoggedIn e refaz CurrentUser. O handler de login não usa detail.

**Interpretação:** Estabelece comunicação user-app → shell por eventos, dirigindo a alternância dos remotos. A relação é No snapshot `Yes` e Ativa `Yes`, sem envio inverso.

### 26. client/issue-app/package.json:7-10; client/issue-app/vite.config.js:14-34; client/issue-app/package.json:11

**Observação:** O script build executa `vite build` com configuração própria. O script deploy encadeia build e preview local.

**Interpretação:** A 3.4.6 registra Build `separado`, Deploy `não observado` e Versionamento `No`: sustenta autonomia de build da unidade, sem demonstrar publicação ou versionamento independente.

### 27. client/shell-app/package.json:7-10; client/shell-app/vite.config.js:32-56

**Observação:** O script build executa `vite build` com configuração própria. Há dev e preview locais, e nenhum script deploy.

**Interpretação:** A 3.4.6 registra Build `separado`, Deploy `não observado` e Versionamento `No`: sustenta autonomia de build da unidade, sem demonstrar publicação ou versionamento independente.

### 28. client/user-app/package.json:7-10; client/user-app/vite.config.js:7-26; client/user-app/package.json:11

**Observação:** O script build executa `vite build` com configuração própria. O script deploy encadeia build e preview local.

**Interpretação:** A 3.4.6 registra Build `separado`, Deploy `não observado` e Versionamento `No`: sustenta autonomia de build da unidade, sem demonstrar publicação ou versionamento independente.

### 29. README.md:3

**Observação:** O README afirma que a aplicação é construída com arquitetura de microsserviços e React Module Federation.

**Interpretação:** Nomeia a tecnologia de federação, sem descrever os limites das unidades nessa frase; a 3.4.7 registra a afirmação como corroborada.

### 30. README.md:24-27

**Observação:** O README lista Shell App como host de Module Federation, User App como módulo de autenticação e Issue App como módulo de gestão de ocorrências.

**Interpretação:** Descreve a organização de três unidades e seus papéis; a 3.4.7 registra a afirmação como corroborada.

### 31. README.md:41

**Observação:** O README lista Vite com Module Federation na pilha frontend.

**Interpretação:** É uma afirmação tecnológica, corroborada na 3.4.7 pelos manifestos e pelas chamadas do plugin.

### 32. client/issue-app/vite.config.js:15

**Observação:** O comentário junto a name chama issueApp de nome único do Issue Microfrontend.

**Interpretação:** Atribui identidade à unidade issue-app; a 3.4.7 registra corroboração nos nomes distintos e na ligação com o host.

### 33. client/issue-app/vite.config.js:18

**Observação:** O comentário junto a ./App diz que expõe o ponto de entrada principal do microfrontend.

**Interpretação:** Descreve a interface exposta da unidade; a 3.4.7 registra corroboração na configuração de exposição e no consumo pelo shell.

### 34. client/shell-app/src/App.jsx:13

**Observação:** O comentário diz que o shell verifica o usuário logado em um Gateway.

**Interpretação:** É uma afirmação sobre backend, contradita na 3.4.7: o Apollo Client aponta para a porta 4001 do auth-service; o snapshot não tem gateway.

### 35. client/shell-app/src/App.jsx:30

**Observação:** O comentário identifica o handler como tratamento de login vindo de UserApp.

**Interpretação:** Descreve a origem da comunicação de login; a 3.4.7 registra corroboração no emissor, no listener e na relação entre as unidades.

### 36. client/shell-app/src/App.jsx:36

**Observação:** O comentário identifica o handler como tratamento de logout de outras aplicações.

**Interpretação:** Descreve a comunicação das unidades para o host; a 3.4.7 registra corroboração nos emissores da user-app e da issue-app e na escuta do shell.

### 37. client/shell-app/src/App.jsx:63

**Observação:** O comentário diz que, sem login, será exibida a aplicação de login do usuário.

**Interpretação:** Descreve a condição de composição da user-app; a 3.4.7 registra corroboração na montagem e na relação host → remote.

### 38. client/shell-app/src/App.jsx:66

**Observação:** O comentário diz que, após login, será exibida a aplicação de gestão de ocorrências.

**Interpretação:** Descreve a condição de composição da issue-app; a 3.4.7 registra corroboração na montagem e na relação host → remote.

### 39. 94eaf5d 2025-11-29 (client/shell-app/vite.config.js); 8c2b4f9 2025-12-07 (client/shell-app/vite.config.js)

**Observação:** A 3.4.8 registra que o arquivo do shell foi criado em 94eaf5d, cuja versão não está disponível. A versão legível de 8c2b4f9, que introduz a issue-app, já contém o bloco comentado com só userApp e o ativo com os dois remotes; o arquivo não muda depois até o snapshot.

**Interpretação:** O ponto foi esclarecido: o bloco comentado representa outro estágio, não uma configuração alternativa em uso. A primeira versão indisponível impede afirmar identidade literal com o bloco comentado; isso não torna ambígua a configuração ativa do snapshot.

### 40. 934af61 2025-11-26 (server/package.json; server/microservices/auth-service/auth-microservice.js); 94eaf5d 2025-11-29 (client/shell-app/src/App.jsx; client/shell-app/src/main.jsx); 8c2b4f9 2025-12-07 (client/shell-app/src/App.jsx; client/shell-app/src/main.jsx; server/microservices/auth-service/auth-microservice.js); 0df228d 2025-12-10 (client/user-app/src/App.jsx)

**Observação:** A 3.4.8 registra que nenhum dos oito commits até o snapshot cria gateway ou server/index.js. Na primeira versão legível do shell, 8c2b4f9, os comentários Gateway já acompanham o endereço em 4001; os sinais de 4000 também antecedem o snapshot. As versões iniciais de código citadas na revisão não estão disponíveis.

**Interpretação:** O ponto foi esclarecido: o rótulo Gateway não é resto de um gateway versionado neste repositório. Não se sabe se o serviço em 4000 foi planejado, externo ou abandonado; essa lacuna do passado não altera o endpoint ativo do snapshot.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (client/issue-app/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (client/shell-app/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (client/user-app/package.json:15) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 4 | 3.4.2 (Evidência, client/issue-app/package.json:15); 3.4.3 (client/issue-app, Marcadores e Build); 3.4.4 (client/shell-app/src/App.jsx:11, Observação); 3.4.5 #2 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #3 (Evidência), #4, #5 (Documento e Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #15; configura #23 |
| 5 | 3.4.2 (Evidência, client/shell-app/package.json:14); 3.4.3 (client/shell-app, Marcadores e Build); 3.4.4 (client/shell-app/src/App.jsx:10, :11, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #2, #3, #4 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #16; configura #22; configura #23 |
| 6 | 3.4.2 (Evidência, client/user-app/package.json:15); 3.4.3 (client/user-app, Marcadores e Build); 3.4.4 (client/shell-app/src/App.jsx:10, Observação); 3.4.5 #1 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #3, #4 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #17; configura #22 |
| 7 | 3.4.4 (client/shell-app/src/App.jsx:10) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #22 |
| 8 | 3.4.4 (client/shell-app/src/App.jsx:11) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #23 |
| 9 | 3.4.4 (client/issue-app/src/components/Header.jsx:39) | 3 código | código-fonte | events | arquitetural | moderada | implementa #24 |
| 10 | 3.4.4 (client/shell-app/src/App.jsx:42) | 3 código | código-fonte | events | arquitetural | moderada | implementa #25 |
| 11 | 3.4.4 (client/user-app/src/UserComponent.jsx:56) | 3 código | código-fonte | events | arquitetural | moderada | implementa #25 |
| 12 | 3.4.4 (client/user-app/src/UserComponent.jsx:74) | 3 código | código-fonte | events | arquitetural | moderada | implementa #25 |
| 13 | 3.4.4 (manual client/shell-app/src/App.jsx:64) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #22 |
| 14 | 3.4.4 (manual client/shell-app/src/App.jsx:67) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #23 |
| 15 | 3.4.3 (client/issue-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 16 | 3.4.3 (client/shell-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (client/user-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 18 | 3.4.3 (server) | 4 estrutura | diretório | — | contexto | fraca | — |
| 19 | 3.4.3 (server/microservices/analytics-ai-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 20 | 3.4.3 (server/microservices/auth-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 21 | 3.4.3 (server/microservices/issue-management-service) | 4 estrutura | diretório | — | contexto | fraca | — |
| 22 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #16; liga #17 |
| 23 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #16; liga #15 |
| 24 | 3.4.5 #3 | 5 composição | código-fonte | events | arquitetural | forte | liga #15; liga #16 |
| 25 | 3.4.5 #4 | 5 composição | código-fonte | events | arquitetural | forte | liga #17; liga #16 |
| 26 | 3.4.6 #1 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #15 |
| 27 | 3.4.6 #2 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #16 |
| 28 | 3.4.6 #3 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #17 |
| 29 | 3.4.7 #1 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #22; corrobora #23; corrobora #19; corrobora #20; corrobora #21 |
| 30 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #15; corrobora #16; corrobora #17; corrobora #22; corrobora #23; corrobora #5 |
| 31 | 3.4.7 #3 | 7 documentação | documentação | module-federation | tecnológica | fraca | corrobora #1; corrobora #2; corrobora #3; corrobora #4; corrobora #5; corrobora #6 |
| 32 | 3.4.7 #4 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #23; corrobora #4; corrobora #5; corrobora #6 |
| 33 | 3.4.7 #5 | 7 documentação | comentário | module-federation | arquitetural | fraca | corrobora #23; corrobora #4; corrobora #8 |
| 34 | 3.4.7 #6 | 7 documentação | comentário | — | contexto | fraca | contradiz client/shell-app/src/main.jsx:13-15; contradiz server/microservices/auth-service/config/config.js:9; contradiz #18; contradiz #19; contradiz #20; contradiz #21 |
| 35 | 3.4.7 #7 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #10; corrobora #11; corrobora #25 |
| 36 | 3.4.7 #8 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #9; corrobora #12; corrobora #24; corrobora #25; corrobora #10 |
| 37 | 3.4.7 #9 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #13; corrobora #22 |
| 38 | 3.4.7 #10 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #14; corrobora #23 |
| 39 | 3.4.8 #1 | 8 histórico | histórico | module-federation | arquitetural | fraca | explica #5; explica #27 |
| 40 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica #34 |

## Resumo

Observações: 40. Dimensões (tecnologia: 3, configuração: 3, código: 8, estrutura: 7, composição: 4, build-deploy: 3, documentação: 10, histórico: 2). Força (forte: 7, moderada: 14, fraca: 19, ambígua: 0). Evidência (tecnológica: 7, arquitetural: 27, contexto: 6).

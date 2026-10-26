---
schema: 1
id: 1105927418
full_name: AstroSoup/web-lab-4
commit: 2214561f8c9cb333f1849a0f1d04ec7ab36220cb
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

# 335 — AstroSoup/web-lab-4

## Leitura do repositório

As três declarações de `@module-federation/vite` são sinais isolados (#1–3). A cadeia arquitetural passa pelas configurações que nomeiam os remotes e expõem os módulos (#4–6), pelos imports e renderizações dos dois painéis no host e de PopupWindow no remote de entrada (#7–8, #11), e pelas quatro relações federadas ativas (#15–18). O host também fornece HistoryStore e ErrorStore (#9–10), que sustentam três relações de comunicação bidirecional por estado reativo compartilhado, registradas como `events` (#19–21).

A estrutura confirma o host como unidade frontend (#12), mas mantém os dois remotes como `Undetermined`: há pacote e build próprios, enquanto seus `src/main.js` estão vazios (#13–14). O histórico esclarece que essas entradas foram adicionadas já vazias, sem resolver sua autonomia de execução (#25–26). Isso não anula o consumo federado ativo dos painéis. Os três builds são separados, porém seus resultados são publicados na mesma imagem e no mesmo serviço nginx, sem versionamento independente (#22–24).

A revisão documental tem zero afirmações, portanto não gera observações. Não há sinal textual a confrontar com a implementação. A configuração foi deduplicada em um bloco por unidade; caminhos de publicação nginx permanecem em build/deploy. As fontes são as sete revisões finais e os trechos citados do snapshot, sem alteração de seus julgamentos.

## Observações

### 1. frontend/vite/host/package.json:17

**Observação:** O manifesto declara `@module-federation/vite` na versão `latest`, em `devDependencies`.

**Interpretação:** É um sinal tecnológico isolado de Module Federation; a revisão registra Configurada `Yes`, cuja configuração tem observação própria.

### 2. frontend/vite/remote-inputs/package.json:16

**Observação:** O manifesto declara `@module-federation/vite` na versão `latest`, em `devDependencies`.

**Interpretação:** É um sinal tecnológico isolado de Module Federation; a revisão registra Configurada `Yes`, cuja configuração tem observação própria.

### 3. frontend/vite/remote-results/package.json:16

**Observação:** O manifesto declara `@module-federation/vite` na versão `latest`, em `devDependencies`.

**Interpretação:** É um sinal tecnológico isolado de Module Federation; a revisão registra Configurada `Yes`, cuja configuração tem observação própria.

### 4. frontend/vite/host/vite.config.js:3; frontend/vite/host/vite.config.js:13-38

**Observação:** O plugin `federation` configura `host`, publica `remoteEntry.js`, expõe AuthStore, HistoryStore, ErrorStore e PopupWindow e declara `remote_inputs` em `https://localhost/remote-inputs/remoteEntry.js` e `remote_results` em `https://localhost/remote-results/remoteEntry.js`. Vue e Pinia são singleton.

**Interpretação:** A configuração liga o host a dois remotes nomeados e oferece módulos para consumo no sentido inverso.

### 5. frontend/vite/remote-inputs/vite.config.js:3; frontend/vite/remote-inputs/vite.config.js:13-30

**Observação:** O plugin `federation` configura `remote_inputs`, publica `remoteEntry.js`, expõe `./InputsContainer` e declara o remote `host` em `https://localhost/remoteEntry.js`. Vue e Pinia são singleton.

**Interpretação:** O bloco configura o fornecedor do painel e sua ligação federada de volta ao host; não é apenas uma exposição isolada.

### 6. frontend/vite/remote-results/vite.config.js:3; frontend/vite/remote-results/vite.config.js:13-30

**Observação:** O plugin `federation` configura `remote_results`, publica `remoteEntry.js`, expõe `./ResultsContainer` e declara o remote `host` em `https://localhost/remoteEntry.js`. Vue e Pinia são singleton.

**Interpretação:** O bloco configura o fornecedor do painel e sua ligação federada de volta ao host; não é apenas uma exposição isolada.

### 7. frontend/vite/host/src/pages/MainPage.vue:6; frontend/vite/host/src/pages/MainPage.vue:11; frontend/vite/host/src/pages/MainPage.vue:23; frontend/vite/host/vite.config.js:23-27; frontend/vite/remote-inputs/vite.config.js:14-18

**Observação:** `MainPage` importa `InputsContainer` de `remote_inputs/InputsContainer`, registra o componente e renderiza `<InputsContainer />`. As configurações declaram o remote de destino e a chave exposta correspondente.

**Interpretação:** O host insere o painel de outra unidade por Module Federation. O conjunto citado identifica o destino da tag.

### 8. frontend/vite/host/src/pages/MainPage.vue:7; frontend/vite/host/src/pages/MainPage.vue:11; frontend/vite/host/src/pages/MainPage.vue:24; frontend/vite/host/vite.config.js:28-32; frontend/vite/remote-results/vite.config.js:14-18

**Observação:** `MainPage` importa `ResultsContainer` de `remote_results/ResultsContainer`, registra o componente e renderiza `<ResultsContainer />`. As configurações declaram o remote de destino e a chave exposta correspondente.

**Interpretação:** O host insere o painel de outra unidade por Module Federation. O conjunto citado identifica o destino da tag.

### 9. frontend/vite/host/src/stores/HistoryStore.js:6-24; frontend/vite/host/src/stores/HistoryStore.js:126-143; frontend/vite/remote-inputs/src/InputsContainer.vue:5-29; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:3; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:139-140; frontend/vite/remote-results/src/elements/Table.vue:2-13; frontend/vite/remote-results/src/elements/GroupInput.vue:4-32; frontend/vite/host/src/common/Header.vue:20-22

**Observação:** `defineStore("history", ...)` contém campos do formulário, histórico e grupos. O remote de entrada importa o store do host, altera campos e chama `addRecord`; o canvas lê `history`. O remote de resultados lê o histórico, altera seleção e cria grupos. O host limpa o estado no logout.

**Interpretação:** O store fornece o mecanismo de estado reativo compartilhado usado pelas três unidades; sua definição é a implementação do canal, sem declarar por si a resolução federada dos consumidores.

### 10. frontend/vite/host/src/stores/ErrorStore.js:3-15; frontend/vite/remote-inputs/src/InputsContainer.vue:6; frontend/vite/remote-inputs/src/InputsContainer.vue:28-32; frontend/vite/remote-results/src/elements/GroupInput.vue:3; frontend/vite/remote-results/src/elements/GroupInput.vue:21-25; frontend/vite/host/src/pages/MainPage.vue:13-21

**Observação:** `defineStore("error", ...)` guarda `errorMsg` e `errorTitle`. Os remotes importam o store do host e escrevem nesses campos em situações de erro; `MainPage` lê os campos e os apresenta em `PopupWindow`.

**Interpretação:** O store implementa o canal reativo de mensagens dos remotes ao host; a declaração do store não estabelece sozinha a resolução federada desses consumidores.

### 11. frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:2-9; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:23-24; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:154-155; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175-180; frontend/vite/remote-inputs/vite.config.js:19-25; frontend/vite/host/vite.config.js:20

**Observação:** `GraphCanvas` importa `PopupWindow` de `host/PopupWindow`, registra e renderiza o componente com mensagem e título locais. O remote `host` e a exposição `./PopupWindow` estão declarados nas configurações.

**Interpretação:** O remote de entrada compõe um componente visual fornecido pelo host; os trechos identificam o destino da tag e o contrato federado.

### 12. frontend/vite/host; frontend/vite/host/index.html:11; frontend/vite/host/package.json:8; frontend/vite/host/vite.config.js:5-40; frontend/vite/host/src/main.js:24-40

**Observação:** O diretório tem manifesto e configuração Vite próprios; `index.html` carrega `src/main.js`, que cria a aplicação Vue, instala router e Pinia e monta em `#app`.

**Interpretação:** O limite de unidade frontend está confirmado, conforme Unidade frontend `Yes` da revisão estrutural.

### 13. frontend/vite/remote-inputs; frontend/vite/remote-inputs/index.html:11; frontend/vite/remote-inputs/package.json:8; frontend/vite/remote-inputs/vite.config.js:5-32; frontend/vite/remote-inputs/src/main.js (0 bytes)

**Observação:** O diretório tem manifesto e configuração Vite próprios, expondo `./InputsContainer`. O `index.html` aponta para `src/main.js`, um arquivo vazio.

**Interpretação:** O julgamento estrutural permanece `Undetermined`: o build e o módulo exposto delimitam um pacote de UI, mas não há bootstrap standalone. Continuam plausíveis a leitura como unidade frontend relativamente independente e a de painel dependente da execução do host.

### 14. frontend/vite/remote-results; frontend/vite/remote-results/index.html:11; frontend/vite/remote-results/package.json:8; frontend/vite/remote-results/vite.config.js:5-32; frontend/vite/remote-results/src/main.js (0 bytes)

**Observação:** O diretório tem manifesto e configuração Vite próprios, expondo `./ResultsContainer`. O `index.html` aponta para `src/main.js`, um arquivo vazio.

**Interpretação:** O julgamento estrutural permanece `Undetermined`: o build e o módulo exposto delimitam um pacote de UI, mas não há bootstrap standalone. Continuam plausíveis a leitura como unidade frontend relativamente independente e a de painel dependente da execução do host.

### 15. frontend/vite/host/src/pages/MainPage.vue:6; frontend/vite/host/src/pages/MainPage.vue:23; frontend/vite/host/vite.config.js:23-27; frontend/vite/remote-inputs/vite.config.js:14-18

**Observação:** O host renderiza `InputsContainer` importado de `remote_inputs/InputsContainer`. A entrada do remote aponta para `https://localhost/remote-inputs/remoteEntry.js`, e o fornecedor declara nome, arquivo e exposição correspondentes.

**Interpretação:** É a relação host → remote ativa registrada na 3.4.5, com destino presente no snapshot.

### 16. frontend/vite/host/src/pages/MainPage.vue:7; frontend/vite/host/src/pages/MainPage.vue:24; frontend/vite/host/vite.config.js:28-32; frontend/vite/remote-results/vite.config.js:14-18

**Observação:** O host renderiza `ResultsContainer` importado de `remote_results/ResultsContainer`. A entrada do remote aponta para `https://localhost/remote-results/remoteEntry.js`, e o fornecedor declara nome, arquivo e exposição correspondentes.

**Interpretação:** É a relação host → remote ativa registrada na 3.4.5, com destino presente no snapshot.

### 17. frontend/vite/remote-inputs/vite.config.js:19-25; frontend/vite/host/vite.config.js:14-20; frontend/vite/remote-inputs/src/InputsContainer.vue:5-6; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:2-3; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175

**Observação:** O consumidor declara `host` em `https://localhost/remoteEntry.js` e importa `host/HistoryStore` e `host/ErrorStore`, expostos pelo host. Também importa e renderiza `host/PopupWindow`.

**Interpretação:** É a relação ativa de consumo federado no sentido remote → host, preservando o tipo host → remote usado na revisão de origem.

### 18. frontend/vite/remote-results/vite.config.js:19-25; frontend/vite/host/vite.config.js:14-20; frontend/vite/remote-results/src/elements/GroupInput.vue:3-4; frontend/vite/remote-results/src/elements/Table.vue:2

**Observação:** O consumidor declara `host` em `https://localhost/remoteEntry.js` e importa `host/HistoryStore` e `host/ErrorStore`, expostos pelo host.

**Interpretação:** É a relação ativa de consumo federado no sentido remote → host, preservando o tipo host → remote usado na revisão de origem.

### 19. frontend/vite/host/vite.config.js:18-19; frontend/vite/host/vite.config.js:36; frontend/vite/remote-inputs/vite.config.js:28; frontend/vite/host/src/stores/HistoryStore.js:136-143; frontend/vite/host/src/stores/ErrorStore.js:3-7; frontend/vite/host/src/common/Header.vue:20-22; frontend/vite/host/src/pages/MainPage.vue:13-21; frontend/vite/remote-inputs/src/InputsContainer.vue:5-31; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:139-140

**Observação:** O host expõe HistoryStore e ErrorStore; Pinia é singleton nos dois lados. O remote escreve mensagens de erro exibidas pelo host; no logout o host limpa o histórico e os campos do formulário lidos pelo remote.

**Interpretação:** É uma relação de comunicação bidirecional ativa por serviço reativo compartilhado, registrada como `events` na 3.4.5.

### 20. frontend/vite/host/vite.config.js:18-19; frontend/vite/host/vite.config.js:36; frontend/vite/remote-results/vite.config.js:28; frontend/vite/host/src/stores/HistoryStore.js:136-143; frontend/vite/host/src/stores/ErrorStore.js:3-7; frontend/vite/host/src/common/Header.vue:20-22; frontend/vite/host/src/pages/MainPage.vue:13-21; frontend/vite/remote-results/src/elements/GroupInput.vue:3-24; frontend/vite/remote-results/src/elements/Table.vue:2-13; frontend/vite/remote-results/src/elements/Table.vue:53

**Observação:** O host expõe HistoryStore e ErrorStore; Pinia é singleton nos dois lados. O remote escreve mensagens de erro exibidas pelo host; no logout o host limpa o histórico lido pela tabela do remote.

**Interpretação:** É uma relação de comunicação bidirecional ativa por serviço reativo compartilhado, registrada como `events` na 3.4.5.

### 21. frontend/vite/host/vite.config.js:18; frontend/vite/host/vite.config.js:36; frontend/vite/remote-inputs/vite.config.js:28; frontend/vite/remote-results/vite.config.js:28; frontend/vite/remote-inputs/src/InputsContainer.vue:5-29; frontend/vite/host/src/stores/HistoryStore.js:49; frontend/vite/host/src/stores/HistoryStore.js:126; frontend/vite/remote-results/src/elements/Table.vue:2-13; frontend/vite/remote-results/src/elements/Table.vue:39-53; frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:139-140

**Observação:** Os remotes importam o mesmo HistoryStore do host com Pinia singleton. O remote de entrada acrescenta registros ao histórico consumido pela tabela; o remote de resultados carrega o histórico do backend ao montar, e o canvas do remote de entrada o lê.

**Interpretação:** É a relação ativa de comunicação bidirecional entre remotes pelo estado reativo compartilhado, registrada como `events`, sem chamada direta entre seus componentes.

### 22. frontend/vite/host/package.json:2-8; frontend/vite/host/vite.config.js:5-40; config/nginx/Dockerfile:5; config/nginx/nginx.conf:18-35; config/nginx/nginx.conf:90-93; config/docker-compose.yaml:38-52

**Observação:** O pacote tem `vite build` e configuração próprios. O Dockerfile copia seu `dist` para uma pasta na mesma imagem que contém os outros frontends; um servidor nginx próprio e um caminho TLS o servem. O compose define um serviço `nginx` único. O manifesto usa `private: true` e `version: 0.0.0`.

**Interpretação:** Há build separado e deploy conjunto, com Versionamento `No`, conforme a 3.4.6. O endereço separado não demonstra publicação independente.

### 23. frontend/vite/remote-inputs/package.json:2-8; frontend/vite/remote-inputs/vite.config.js:5-32; config/nginx/Dockerfile:6; config/nginx/nginx.conf:37-53; config/nginx/nginx.conf:95-98; config/docker-compose.yaml:38-52

**Observação:** O pacote tem `vite build` e configuração próprios. O Dockerfile copia seu `dist` para uma pasta na mesma imagem que contém os outros frontends; um servidor nginx próprio e um caminho TLS o servem. O compose define um serviço `nginx` único. O manifesto usa `private: true` e `version: 0.0.0`.

**Interpretação:** Há build separado e deploy conjunto, com Versionamento `No`, conforme a 3.4.6. O endereço separado não demonstra publicação independente.

### 24. frontend/vite/remote-results/package.json:2-8; frontend/vite/remote-results/vite.config.js:5-32; config/nginx/Dockerfile:7; config/nginx/nginx.conf:55-71; config/nginx/nginx.conf:100-103; config/docker-compose.yaml:38-52

**Observação:** O pacote tem `vite build` e configuração próprios. O Dockerfile copia seu `dist` para uma pasta na mesma imagem que contém os outros frontends; um servidor nginx próprio e um caminho TLS o servem. O compose define um serviço `nginx` único. O manifesto usa `private: true` e `version: 0.0.0`.

**Interpretação:** Há build separado e deploy conjunto, com Versionamento `No`, conforme a 3.4.6. O endereço separado não demonstra publicação independente.

### 25. 53e46c0 2025-12-05 (frontend/vite/remote-inputs/src/main.js); 2214561 2025-12-08 (frontend/vite/remote-inputs/src/main.js)

**Observação:** A revisão histórica registra a adição de `src/main.js` em `53e46c0`, já associado ao objeto vazio `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`. O caminho conserva o mesmo objeto até o snapshot, sem alteração posterior registrada.

**Interpretação:** O ponto está `esclarecido`: neste caminho não houve um bootstrap standalone anterior que tenha sido esvaziado. Isso explica a entrada vazia, sem demonstrar abandono ou mudar o `Undetermined` estrutural.

### 26. f5cb3ef 2025-12-08 (frontend/vite/remote-results/src/main.js); 2214561 2025-12-08 (frontend/vite/remote-results/src/main.js)

**Observação:** A revisão histórica registra a adição de `src/main.js` em `f5cb3ef`, já associado ao objeto vazio `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`. O caminho conserva o mesmo objeto até o snapshot, sem alteração posterior registrada.

**Interpretação:** O ponto está `esclarecido`: neste caminho não houve um bootstrap standalone anterior que tenha sido esvaziado. Isso explica a entrada vazia, sem demonstrar abandono ou mudar o `Undetermined` estrutural.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (frontend/vite/host/package.json:17) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (frontend/vite/remote-inputs/package.json:16) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (frontend/vite/remote-results/package.json:16) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 4 | 3.4.2 (frontend/vite/host/package.json:17, Evidência); 3.4.2 (frontend/vite/remote-inputs/package.json:16, Evidência); 3.4.2 (frontend/vite/remote-results/package.json:16, Evidência); 3.4.3 (frontend/vite/host, Marcadores e Build); 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:23 e :24, Observação); 3.4.4 (frontend/vite/host/src/stores/HistoryStore.js:6 e frontend/vite/host/src/stores/ErrorStore.js:3, Observação); 3.4.4 (frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175, Observação); 3.4.5 #1–7 (Configuração); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #12; configura #15; configura #16; configura #17; configura #18; configura #19; configura #20; configura #21 |
| 5 | 3.4.2 (frontend/vite/remote-inputs/package.json:16, Evidência); 3.4.3 (frontend/vite/remote-inputs, Marcadores, Entrada e Build); 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:23, Observação); 3.4.4 (frontend/vite/host/src/stores/HistoryStore.js:6, Observação); 3.4.5 #1, #3, #5, #7 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #13; configura #15; configura #17; configura #19; configura #21 |
| 6 | 3.4.2 (frontend/vite/remote-results/package.json:16, Evidência); 3.4.3 (frontend/vite/remote-results, Marcadores, Entrada e Build); 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:24, Observação); 3.4.4 (frontend/vite/host/src/stores/HistoryStore.js:6, Observação); 3.4.5 #2, #4, #6, #7 (Configuração); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #14; configura #16; configura #18; configura #20; configura #21 |
| 7 | 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:23, manual) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15 |
| 8 | 3.4.4 (frontend/vite/host/src/pages/MainPage.vue:24, manual) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #16 |
| 9 | 3.4.4 (frontend/vite/host/src/stores/HistoryStore.js:6, manual) | 3 código | código-fonte | events | arquitetural | moderada | implementa #17; implementa #18; implementa #19; implementa #20; implementa #21 |
| 10 | 3.4.4 (frontend/vite/host/src/stores/ErrorStore.js:3, manual) | 3 código | código-fonte | events | arquitetural | moderada | implementa #17; implementa #18; implementa #19; implementa #20 |
| 11 | 3.4.4 (frontend/vite/remote-inputs/src/elements/GraphCanvas.vue:175, manual) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #17 |
| 12 | 3.4.3 (frontend/vite/host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.3 (frontend/vite/remote-inputs) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 14 | 3.4.3 (frontend/vite/remote-results) | 4 estrutura | diretório | — | arquitetural | ambígua | — |
| 15 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #12; liga #13 |
| 16 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #12; liga #14 |
| 17 | 3.4.5 #3 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #13; liga #12 |
| 18 | 3.4.5 #4 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #14; liga #12 |
| 19 | 3.4.5 #5 | 5 composição | código-fonte | events | arquitetural | forte | liga #12; liga #13 |
| 20 | 3.4.5 #6 | 5 composição | código-fonte | events | arquitetural | forte | liga #12; liga #14 |
| 21 | 3.4.5 #7 | 5 composição | código-fonte | events | arquitetural | forte | liga #13; liga #14 |
| 22 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #12 |
| 23 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #13 |
| 24 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #14 |
| 25 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #13 |
| 26 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #14 |

## Resumo

Observações: 26. Dimensões (tecnologia: 3, configuração: 3, código: 5, estrutura: 3, composição: 7, build-deploy: 3, documentação: 0, histórico: 2). Força (forte: 13, moderada: 6, fraca: 5, ambígua: 2). Evidência (tecnológica: 3, arquitetural: 23, contexto: 0).

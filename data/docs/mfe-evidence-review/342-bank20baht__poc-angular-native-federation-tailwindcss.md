---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
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

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Leitura do repositório

O snapshot reúne duas unidades Angular com manifestos, entradas e builds próprios (#21–#22). As declarações de Native Federation (#1, #3) se conectam aos builders, ao compartilhamento e às exposições configuradas (#5–#10). O host registra o remote em código (#17) e o incorpora por componente e por rotas (#14–#15, #20), formando a relação ativa host → remote (#23). Essa cadeia sustenta a leitura de composição por Native Federation.

Os builds são separados, mas o CSS do host depende da varredura dos templates do remote; não há deploy observado nem versionamento independente (#24–#25). Os bootstraps locais e a inicialização do remote não ligam unidades (#11–#12, #18–#19). As declarações de @softarc/native-federation-node sem uso direto são sinais isolados (#2, #4). O comentário sobre loadChildren tem corroboração no código (#26), mas os READMEs não acrescentam afirmações à tabela final da 3.4.7. Os dois pontos históricos inconclusivos limitam explicações sobre a origem das sobras, sem tornar ambígua a composição do snapshot (#27–#28).

## Observações

### 1. host/package.json:23

**Observação:** O manifesto de `host` declara `@angular-architects/native-federation` em dependencies, na versão `20.1.6`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a 3.4.2 registra Configurada `Yes`, sustentada pelos builders e pelo código próprios da unidade.

### 2. host/package.json:31

**Observação:** O manifesto de `host` declara `@softarc/native-federation-node` em dependencies, na versão `^2.0.10`.

**Interpretação:** A declaração é um sinal isolado sem uso direto observado: a 3.4.2 registra Configurada `No`; as entradas e configurações usam outro pacote.

### 3. remote/package.json:23

**Observação:** O manifesto de `remote` declara `@angular-architects/native-federation` em dependencies, na versão `20.1.6`.

**Interpretação:** A declaração é um sinal tecnológico isolado; a 3.4.2 registra Configurada `Yes`, sustentada pelos builders e pelo código próprios da unidade.

### 4. remote/package.json:31

**Observação:** O manifesto de `remote` declara `@softarc/native-federation-node` em dependencies, na versão `^2.0.10`.

**Interpretação:** A declaração é um sinal isolado sem uso direto observado: a 3.4.2 registra Configurada `No`; as entradas e configurações usam outro pacote.

### 5. host/angular.json:16-29

**Observação:** O target build usa `@angular-architects/native-federation:build`, delega aos targets host:esbuild de produção e desenvolvimento e adota production como padrão.

**Interpretação:** Configura o mecanismo no build do host, sem declarar outra unidade.

### 6. host/federation.config.js:1-27

**Observação:** `withNativeFederation` envolve a configuração; `shareAll` usa singleton, strictVersion e requiredVersion auto. Há exclusões de subpacotes RxJS e ignoreUnusedDeps habilitado.

**Interpretação:** Configura o compartilhamento na unidade host; não nomeia um destino remoto.

### 7. remote/angular.json:16-31

**Observação:** O target build usa `@angular-architects/native-federation:build`, inclui src/styles.css, delega a remote:esbuild e adota production como padrão.

**Interpretação:** Configura o mecanismo de build do remote, sem ligação explícita a um consumidor.

### 8. remote/federation.config.js:1-34

**Observação:** `withNativeFederation` declara name remote, expõe ./Component a partir de src/app/app.ts e ./routes a partir de src/app/modules/home/home.routes.ts; shareAll usa singleton e strictVersion, com requiredVersion auto.

**Interpretação:** Define a identidade e a superfície exposta de uma unidade; o bloco não declara o host consumidor.

### 9. host/angular.json:30-38

**Observação:** O target serve também usa o builder Native Federation, aponta para host:serve-original:development e habilita dev.

**Interpretação:** Configura o mecanismo no servidor de desenvolvimento do host; não estabelece outra unidade.

### 10. remote/angular.json:32-41

**Observação:** O target serve usa o builder Native Federation, aponta para remote:serve-original:development, habilita dev e inclui src/styles.css.

**Interpretação:** Configura o mecanismo no servidor de desenvolvimento do remote, sem nomear consumidor.

### 11. host/src/main.ts:7

**Observação:** A entrada de `host` importa dinamicamente o arquivo local ./bootstrap depois da inicialização da federação.

**Interpretação:** É bootstrap assíncrono interno; essa construção, isolada, não liga unidades. A 3.4.4 marca Composição `No`.

### 12. remote/src/main.ts:5

**Observação:** A entrada de `remote` importa dinamicamente o arquivo local ./bootstrap depois da inicialização da federação.

**Interpretação:** É bootstrap assíncrono interno; essa construção, isolada, não liga unidades. A 3.4.4 marca Composição `No`.

### 13. host/src/app/app.routes.ts:1

**Observação:** O arquivo importa loadRemoteModule de @angular-architects/native-federation.

**Interpretação:** Disponibiliza o mecanismo de carga usado nas rotas; o import sozinho não nomeia uma unidade de destino.

### 14. host/src/app/app.routes.ts:8-16; remote/federation.config.js:7-8; remote/src/app/app.ts:10; host/src/app/app.config.ts:10

**Observação:** A rota vazia usa loadComponent e loadRemoteModule(remote, ./Component), seleciona m.App e retorna Fallback se a carga falhar; o módulo corresponde ao App exposto pelo remote. As rotas são registradas por provideRouter.

**Interpretação:** A rota liga diretamente o host à UI da unidade remote por Native Federation.

### 15. host/src/app/app.routes.ts:18-28; remote/federation.config.js:9; remote/src/app/modules/home/home.routes.ts:3-14; host/src/app/app.config.ts:10

**Observação:** A rota flights usa loadChildren com loadRemoteModule(remote, ./routes), seleciona APP_ROUTES e retorna fallbackRoutes se falhar. O remote expõe o arquivo desse conjunto de rotas.

**Interpretação:** Liga o caminho flights do host às rotas da unidade remote por Native Federation.

### 16. host/src/main.ts:1

**Observação:** A entrada do host importa initFederation de @angular-architects/native-federation.

**Interpretação:** Prepara o mecanismo de inicialização; o import sozinho não situa a unidade remota.

### 17. host/src/main.ts:3-7; remote/federation.config.js:5

**Observação:** initFederation recebe o mapa remote → http://localhost:4201/remoteEntry.json antes de importar o bootstrap. O nome corresponde ao declarado pelo remote.

**Interpretação:** O código de entrada registra explicitamente o destino de composição do host. Embora receba um mapa, é código executado pela aplicação e pertence à dimensão código.

### 18. remote/src/main.ts:1

**Observação:** A entrada do remote importa initFederation de @angular-architects/native-federation.

**Interpretação:** É presença do mecanismo na própria unidade; a 3.4.4 marca Composição `No` porque a chamada habilitada não resolve outra unidade.

### 19. remote/src/main.ts:3-6

**Observação:** O remote chama initFederation() sem argumentos e depois importa seu bootstrap local.

**Interpretação:** Inicializa o mecanismo na unidade, sem manifesto ou remotes consumidores de outra unidade. A construção tem Composição `No`.

### 20. host/src/app/app.routes.ts:7-29; host/src/app/app.config.ts:10; host/src/app/app.html:2

**Observação:** A tabela exportada de rotas associa a rota vazia ao componente de remote e flights às rotas de remote; provideRouter registra a tabela e o template tem router-outlet.

**Interpretação:** Organiza a inserção das duas exposições remotas na navegação do host.

### 21. host/; host/package.json:1-55; host/angular.json:16-29; host/angular.json:57-60; host/src/main.ts:1-7; host/src/bootstrap.ts:5

**Observação:** O diretório `host` tem manifesto próprio, entrada src/main.ts, bootstrapApplication e alvo de build Native Federation sobre @angular/build:application.

**Interpretação:** Confirma o limite da unidade frontend `host`, registrada como `Yes` na 3.4.3; não há workspace que agrupe as duas pastas.

### 22. remote/; remote/package.json:1-55; remote/angular.json:16-31; remote/angular.json:58-61; remote/src/main.ts:1-5; remote/src/bootstrap.ts:5

**Observação:** O diretório `remote` tem manifesto próprio, entrada src/main.ts, bootstrapApplication e alvo de build Native Federation sobre @angular/build:application.

**Interpretação:** Confirma o limite da unidade frontend `remote`, registrada como `Yes` na 3.4.3; não há workspace que agrupe as duas pastas.

### 23. host/src/main.ts:3-5; host/src/app/app.routes.ts:7-29; remote/federation.config.js:5-10; remote/src/app/app.ts:10; remote/src/app/modules/home/home.routes.ts:3-14; host/src/app/app.config.ts:10

**Observação:** O host registra remoteEntry.json com a chave remote e carrega ./Component e ./routes nas rotas. O remote declara o mesmo nome e expõe os dois destinos. A 3.4.5 registra uma relação host → remote, presente e ativa.

**Interpretação:** A correspondência entre registro, consumo e exposições liga duas unidades frontend por Native Federation; as duas cargas pertencem à mesma relação.

### 24. host/package.json:7; host/angular.json:16-29; host/angular.json:57-98; host/angular.json:99-112; host/src/styles.css:3-4

**Observação:** O host tem ng build e targets próprios. Seu CSS varre o próprio código e ../../remote/src. O serviço observado é o dev-server local na porta 4200; a 3.4.6 registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Há limite de build por aplicação, com dependência dos templates do remote para gerar CSS. Isso não demonstra deploy independente nem inclui o código remoto no artefato do host.

### 25. remote/package.json:7; remote/angular.json:16-31; remote/angular.json:58-95; remote/angular.json:96-109; host/src/main.ts:4

**Observação:** O remote tem ng build e targets próprios. Seu dev-server usa a porta 4201, cujo remoteEntry.json é consumido pelo host; a 3.4.6 registra Build separado, Deploy não observado e Versionamento No.

**Interpretação:** Confirma o limite de build da unidade remote; a URL de desenvolvimento não demonstra publicação ou versionamento independentes.

### 26. host/src/app/app.routes.ts:19-23; remote/federation.config.js:9; remote/src/app/modules/home/home.routes.ts:3-14

**Observação:** O comentário diz “loadChildreas instead of loadComponent !!!” antes de loadChildren, que carrega ./routes de remote e seleciona APP_ROUTES.

**Interpretação:** A afirmação descreve a integração das rotas remotas e está corroborada pela implementação, conforme a 3.4.7; sozinha, é evidência semântica fraca.

### 27. bb8b5ac 2025-09-04 (host/package.json; remote/package.json); f61b3c0 2025-09-13 (host/package.json; remote/package.json); bf201ac 2025-09-17 (host/package.json; remote/package.json)

**Observação:** A 3.4.8 situa a criação e alterações dos manifestos, mas as consultas dos conteúdos iniciais falharam por objeto ausente; o ponto sobre uso anterior de @softarc/native-federation-node ficou inconclusivo.

**Interpretação:** A incerteza é sobre o passado da declaração, sem mudar o No de uso direto no snapshot. Não se pode atribuir a sobra a abandono, cópia ou planejamento.

### 28. f61b3c0 2025-09-13 (host/src/remote.d.ts; host/src/app/app.routes.ts; remote/federation.config.js); 3c1e13e 2025-09-14 (host/src/app/app.routes.ts; remote/federation.config.js); host/src/remote.d.ts:1; host/src/styles.css:2-5

**Observação:** A 3.4.8 situa a adição da declaração remote/Styles?inline em f61b3c0 e alterações nos caminhos de rotas e federação, incluindo 3c1e13e. Os conteúdos antigos consultados não estavam disponíveis. No snapshot não há consumidor dessa declaração nem exposição ./Styles.

**Interpretação:** A origem da declaração permanece inconclusiva, mas isso não abre uma alternativa arquitetural para o snapshot: a composição ativa usa componente e rotas, e o CSS é gerado por varredura dos templates.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (host/package.json:23) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #5; declara #6; declara #13; declara #16 |
| 2 | 3.4.2 (host/package.json:31) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 3 | 3.4.2 (remote/package.json:23) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #7; declara #8; declara #18; declara #19 |
| 4 | 3.4.2 (remote/package.json:31) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 5 | 3.4.2 (host/package.json:23, Evidência); 3.4.3 (host, Marcadores/Build); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #21; configura #24 |
| 6 | 3.4.2 (host/package.json:23, Evidência); 3.4.2 (host/package.json:31, Evidência); 3.4.3 (host, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #21; configura #16 |
| 7 | 3.4.2 (remote/package.json:23, Evidência); 3.4.3 (remote, Marcadores/Build); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #22; configura #25 |
| 8 | 3.4.2 (remote/package.json:23, Evidência); 3.4.2 (remote/package.json:31, Evidência); 3.4.3 (remote, Marcadores); 3.4.4 (host/src/app/app.routes.ts:11, :22; remote/src/main.ts:3, Observação); 3.4.5 #1 (Configuração); 3.4.7 #1 (Evidência) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #14; configura #15; configura #22; configura #23 |
| 9 | 3.4.3 (host, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #21 |
| 10 | 3.4.3 (remote, Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #22 |
| 11 | 3.4.4 (host/src/main.ts:7) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 12 | 3.4.4 (remote/src/main.ts:5) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 13 | 3.4.4 (host/src/app/app.routes.ts:1) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #23 |
| 14 | 3.4.4 (host/src/app/app.routes.ts:11) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #23 |
| 15 | 3.4.4 (host/src/app/app.routes.ts:22) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #23 |
| 16 | 3.4.4 (host/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #23 |
| 17 | 3.4.4 (host/src/main.ts:3) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #23 |
| 18 | 3.4.4 (remote/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 19 | 3.4.4 (remote/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 20 | 3.4.4 (host/src/app/app.routes.ts:7, fora da mineração) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #23 |
| 21 | 3.4.3 (host) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 22 | 3.4.3 (remote) | 4 estrutura | diretório | native-federation | arquitetural | moderada | — |
| 23 | 3.4.5 #1 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #21; liga #22 |
| 24 | 3.4.6 #1 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #21 |
| 25 | 3.4.6 #2 | 6 build-deploy | configuração | native-federation | arquitetural | moderada | publica #22 |
| 26 | 3.4.7 #1 | 7 documentação | comentário | native-federation | arquitetural | fraca | corrobora #15; corrobora #23 |
| 27 | 3.4.8 #1 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #2; explica #4 |
| 28 | 3.4.8 #2 | 8 histórico | histórico | — | contexto | fraca | explica host/src/remote.d.ts:1; explica #24 |

## Resumo

Observações: 28. Dimensões (tecnologia: 4, configuração: 6, código: 10, estrutura: 2, composição: 1, build-deploy: 2, documentação: 1, histórico: 2). Força (forte: 5, moderada: 12, fraca: 11, ambígua: 0). Evidência (tecnológica: 17, arquitetural: 10, contexto: 1).

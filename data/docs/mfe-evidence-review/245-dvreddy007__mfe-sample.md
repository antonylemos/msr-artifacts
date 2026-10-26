---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
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

# 245 — dvreddy007/mfe-sample

## Leitura do repositório

Três aplicações Vue/Vite têm entradas e builds próprios num workspace npm (#21–#24). As declarações de Module Federation (#2–#5) levam às configurações dos dois remotes, que expõem `./entry`, e do host, que compartilha Vue sem declarar remotes estáticos (#6–#8). O manifesto executado pelo host nomeia `app1` e `app2`, suas URLs e rotas (#18); o registro e o carregador genéricos resolvem os módulos e acionam o contrato de montagem e desmontagem (#9–#15, #19–#20). A cadeia resulta nas duas relações ativas host → remote (#25–#26). A renderização interna do Vue não é outra fronteira de composição (#16–#17).

Os builds são separados, mas o workflow publica um zip da árvore sem construir os pacotes; o deploy das três aplicações permanece indeterminado (#27–#29). O histórico situa a adição desse workflow, sem resolver se a publicação foi funcional (#49). A declaração de Lerna é ambígua quanto ao uso da ferramenta, sem mudar os limites das três unidades (#1, #48).

As afirmações documentais descrevem a organização, mas são evidência fraca por si mesmas (#30–#47). Enganam a promessa de build e deploy do workflow (#30), as rotas supostamente vindas dos remotes e independentes neles (#34, #42), a atualização de rotas após o registro (#36) e o comentário que sugere módulos expostos pelo host (#47). O snapshot sustenta rotas centrais num manifesto fixo e host sem `exposes`; o passado dessas divergências continua inconclusivo, sem tornar ambígua a composição observada (#50–#51).

## Observações

### 1. package.json:12

**Observação:** O manifesto da raiz declara `lerna: ^8.1.9` em `devDependencies`.

**Interpretação:** É uma dependência de coordenação de monorepo, com configuração `Undetermined` na 3.4.2: tanto o uso na coordenação local quanto uma declaração sem uso efetivo continuam plausíveis. A declaração não situa unidades frontend.

### 2. packages/app-1/package.json:16

**Observação:** O pacote declara `@module-federation/vite: ^1.2.2` em `devDependencies`.

**Interpretação:** A declaração sinaliza Module Federation; a 3.4.2 registra configuração `Yes`, cuja implementação tem observações próprias.

### 3. packages/app-2/package.json:16

**Observação:** O pacote declara `@module-federation/vite: ^1.2.2` em `devDependencies`.

**Interpretação:** A declaração sinaliza Module Federation; a 3.4.2 registra configuração `Yes`, cuja implementação tem observações próprias.

### 4. packages/host/package.json:18

**Observação:** O pacote declara `@module-federation/runtime: ^0.8.9` em `devDependencies`.

**Interpretação:** A declaração sinaliza Module Federation; a 3.4.2 registra configuração `Yes`, cuja implementação tem observações próprias.

### 5. packages/host/package.json:19

**Observação:** O pacote declara `@module-federation/vite: ^1.2.2` em `devDependencies`.

**Interpretação:** A declaração sinaliza Module Federation; a 3.4.2 registra configuração `Yes`, cuja implementação tem observações próprias.

### 6. packages/app-1/vite.config.js:9-16

**Observação:** O plugin `federation` declara `name: app1`, `filename: remoteEntry.js` e `shared: [vue]`, com `exposes` de `./entry` para `./src/entry.js`.

**Interpretação:** Configura Module Federation nesta unidade, sem nomear outra unidade como destino. Define o contrato que pode ser carregado pelo host.

### 7. packages/app-2/vite.config.js:9-16

**Observação:** O plugin `federation` declara `name: app2`, `filename: remoteEntry.js` e `shared: [vue]`, com `exposes` de `./entry` para `./src/entry.js`.

**Interpretação:** Configura Module Federation nesta unidade, sem nomear outra unidade como destino. Define o contrato que pode ser carregado pelo host.

### 8. packages/host/vite.config.js:10-14

**Observação:** O plugin `federation` declara `name: host`, `filename: remoteEntry.js` e `shared: [vue]`. Não há `exposes` nem `remotes`.

**Interpretação:** Configura Module Federation nesta unidade, sem nomear outra unidade como destino. O `filename` do host não estabelece uma relação como remote.

### 9. packages/host/src/components/Loader.vue:63-84

**Observação:** O componente chama `moduleFederation.loadRemote(mfeConfig.module)` e guarda os métodos retornados.

**Interpretação:** Carrega pelo mecanismo federado o nome recebido por parâmetro, sem fixar o destino nesta chamada.

### 10. packages/host/src/components/Loader.vue:87-108

**Observação:** `initializeRemote` busca a entrada da rota atual e chama a função local `loadRemote(remote)`; roda na montagem e na troca de rota.

**Interpretação:** Conecta a seleção da rota ao carregador genérico de remotes, sem nomear um destino na chamada.

### 11. packages/host/src/plugins/federationPlugin.js:1; packages/host/src/plugins/federationPlugin.js:27-35

**Observação:** O wrapper chama `_loadRemote(`${module}/entry`)` e devolve `mount` e `unmount` do módulo carregado.

**Interpretação:** Usa Module Federation para resolver o módulo parametrizado pelo nome do remote.

### 12. packages/app-1/src/entry.js:6-18

**Observação:** O módulo exporta `mount` recebendo um contêiner e criando uma instância Vue própria.

**Interpretação:** Oferece a parte de montagem do contrato de ciclo de vida consumido pelo host; a declaração isolada não nomeia o consumidor.

### 13. packages/app-1/src/entry.js:20-25

**Observação:** O módulo exporta `unmount`, que desmonta a instância Vue e limpa sua referência.

**Interpretação:** Oferece a parte de desmontagem do contrato de ciclo de vida consumido pelo host; a declaração isolada não nomeia o consumidor.

### 14. packages/app-2/src/entry.js:6-18

**Observação:** O módulo exporta `mount` recebendo um contêiner e criando uma instância Vue própria.

**Interpretação:** Oferece a parte de montagem do contrato de ciclo de vida consumido pelo host; a declaração isolada não nomeia o consumidor.

### 15. packages/app-2/src/entry.js:20-25

**Observação:** O módulo exporta `unmount`, que desmonta a instância Vue e limpa sua referência.

**Interpretação:** Oferece a parte de desmontagem do contrato de ciclo de vida consumido pelo host; a declaração isolada não nomeia o consumidor.

### 16. packages/app-1/src/entry.js:13

**Observação:** `app.mount(container)` renderiza a instância Vue da própria aplicação no contêiner recebido.

**Interpretação:** É renderização interna do Vue. A 3.4.4 registra Composição `No`; a fronteira de composição é o export `mount`, não esta chamada.

### 17. packages/app-2/src/entry.js:13

**Observação:** `app.mount(container)` renderiza a instância Vue da própria aplicação no contêiner recebido.

**Interpretação:** É renderização interna do Vue. A 3.4.4 registra Composição `No`; a fronteira de composição é o export `mount`, não esta chamada.

### 18. packages/host/src/routeManifest.js:1-35

**Observação:** O array declara `app1`, a entrada `http://localhost:5011/remoteEntry.js` e a rota `/app-1`; declara também `app2`, a entrada `http://localhost:5012/remoteEntry.js` e `/app-2`. `getRemotes` extrai os objetos `remote`.

**Interpretação:** Liga explicitamente as rotas do host aos dois remotes nomeados. É código executado pela aplicação, classificado na dimensão 3.

### 19. packages/host/src/plugins/federationPlugin.js:9-18; packages/host/src/main.js:15

**Observação:** O plugin transforma os remotes recebidos em `name`, `entry` e `type: module` e chama `init({ name: host, remotes: mfRemotes })`. O host instala esse plugin com `getRemotes()`.

**Interpretação:** Registra o mecanismo federado com destinos recebidos por parâmetro, sem nomeá-los no bloco de registro.

### 20. packages/host/src/components/Loader.vue:2; packages/host/src/components/Loader.vue:63-84

**Observação:** Depois da carga, o host chama `remoteModule.mount(containerRef.value)`; antes da troca chama `unmount` do módulo anterior.

**Interpretação:** Monta e desmonta o remote carregado no contêiner do host, sem fixar o nome de uma unidade nessa chamada.

### 21. .; package.json:4-9; .github/workflows/main_vdumpavue3.yml:26-33; .github/workflows/main_vdumpavue3.yml:67-73

**Observação:** A raiz declara o workspace `packages/*` e o script `dev: lerna run dev`, sem entrada nem script de build de UI; o workflow compacta e publica a árvore do repositório.

**Interpretação:** É a raiz de coordenação, registrada como Unidade frontend `No`, e não uma quarta aplicação.

### 22. packages/app-1; packages/app-1/index.html:11; packages/app-1/src/main.js:5; packages/app-1/package.json:6-10; packages/app-1/vite.config.js:6-21

**Observação:** O diretório tem manifesto, HTML que carrega `/src/main.js`, entrada que monta Vue, configuração Vite e script `build: vite build` próprios.

**Interpretação:** Confirma o limite de uma unidade frontend, registrada como `Yes` na 3.4.3, sem estabelecer sozinha a ligação entre aplicações.

### 23. packages/app-2; packages/app-2/index.html:11; packages/app-2/src/main.js:5; packages/app-2/package.json:6-10; packages/app-2/vite.config.js:6-21

**Observação:** O diretório tem manifesto, HTML que carrega `/src/main.js`, entrada que monta Vue, configuração Vite e script `build: vite build` próprios.

**Interpretação:** Confirma o limite de uma unidade frontend, registrada como `Yes` na 3.4.3, sem estabelecer sozinha a ligação entre aplicações.

### 24. packages/host; packages/host/index.html:11; packages/host/src/main.js:8-17; packages/host/package.json:6-10; packages/host/vite.config.js:7-24

**Observação:** O diretório tem manifesto, HTML que carrega `/src/main.js`, entrada que monta Vue, configuração Vite e script `build: vite build` próprios.

**Interpretação:** Confirma o limite de uma unidade frontend, registrada como `Yes` na 3.4.3, sem estabelecer sozinha a ligação entre aplicações.

### 25. packages/host/src/routeManifest.js:3-9; packages/app-1/vite.config.js:9-16; packages/app-1/src/entry.js:6-25; packages/host/src/plugins/federationPlugin.js:9-18; packages/host/src/plugins/federationPlugin.js:27-35; packages/host/src/components/Loader.vue:63-108

**Observação:** O manifesto associa a rota `/app-1` ao remote `app1` e seu `remoteEntry.js`. O nome coincide com a configuração de `packages/app-1`, que expõe `./entry`. O host registra o remote, resolve `<remote>/entry` e chama seus exports `mount`/`unmount`.

**Interpretação:** Estabelece a relação ativa host → remote por Module Federation entre unidades do snapshot, conforme a 3.4.5.

### 26. packages/host/src/routeManifest.js:16-22; packages/app-2/vite.config.js:9-16; packages/app-2/src/entry.js:6-25; packages/host/src/plugins/federationPlugin.js:9-18; packages/host/src/plugins/federationPlugin.js:27-35; packages/host/src/components/Loader.vue:63-108

**Observação:** O manifesto associa a rota `/app-2` ao remote `app2` e seu `remoteEntry.js`. O nome coincide com a configuração de `packages/app-2`, que expõe `./entry`. O host registra o remote, resolve `<remote>/entry` e chama seus exports `mount`/`unmount`.

**Interpretação:** Estabelece a relação ativa host → remote por Module Federation entre unidades do snapshot, conforme a 3.4.5.

### 27. packages/app-1/package.json:3-9; packages/app-1/vite.config.js:6-21; .github/workflows/main_vdumpavue3.yml:26-33; .github/workflows/main_vdumpavue3.yml:67-73; package.json:7-9

**Observação:** `packages/app-1` tem `vite build` e configuração próprios, versão `0.0.0` e `private: true`. O workflow roda build opcional na raiz sem script `build`, compacta a árvore e publica o zip no Azure Web App `vdumpavue3`.

**Interpretação:** Build `separado` confirma o limite da aplicação. Deploy `Undetermined` e Versionamento `No` permanecem como na 3.4.6: o workflow não demonstra que a aplicação construída seja servida.

### 28. packages/app-2/package.json:3-9; packages/app-2/vite.config.js:6-21; .github/workflows/main_vdumpavue3.yml:26-33; .github/workflows/main_vdumpavue3.yml:67-73; package.json:7-9

**Observação:** `packages/app-2` tem `vite build` e configuração próprios, versão `0.0.0` e `private: true`. O workflow roda build opcional na raiz sem script `build`, compacta a árvore e publica o zip no Azure Web App `vdumpavue3`.

**Interpretação:** Build `separado` confirma o limite da aplicação. Deploy `Undetermined` e Versionamento `No` permanecem como na 3.4.6: o workflow não demonstra que a aplicação construída seja servida.

### 29. packages/host/package.json:3-9; packages/host/vite.config.js:7-24; .github/workflows/main_vdumpavue3.yml:26-33; .github/workflows/main_vdumpavue3.yml:67-73; package.json:7-9

**Observação:** `packages/host` tem `vite build` e configuração próprios, versão `0.0.0` e `private: true`. O workflow roda build opcional na raiz sem script `build`, compacta a árvore e publica o zip no Azure Web App `vdumpavue3`.

**Interpretação:** Build `separado` confirma o limite da aplicação. Deploy `Undetermined` e Versionamento `No` permanecem como na 3.4.6: o workflow não demonstra que a aplicação construída seja servida.

### 30. .github/workflows/main_vdumpavue3.yml:4

**Observação:** O campo de nome do workflow afirma: "Build and deploy Node.js app to Azure Web App - vdumpavue3".

**Interpretação:** A afirmação de build e deploy é contradita: o workflow publica fontes, e a raiz não define build. Não demonstra deploy funcional das aplicações.

### 31. README.md:3

**Observação:** O README afirma: "demonstrate the Micro Frontend Architecture using Vue 3, Vite, and Module Federation to build modular applications".

**Interpretação:** A apresentação arquitetural é corroborada pelas três unidades e pelas duas relações federadas.

### 32. README.md:3

**Observação:** O README afirma: "Each micro frontend runs with its own Vue instance, initialized separately via `entry.js`, rather than sharing the host's Vue instance.".

**Interpretação:** A separação das instâncias é corroborada pelos exports de montagem; compartilhar a biblioteca Vue não equivale a compartilhar a instância.

### 33. README.md:5

**Observação:** O README afirma: "this project utilizes a Route Manifest to dynamically define and manage routing for different micro frontends".

**Interpretação:** O manifesto central do host deriva as rotas e os remotes; a afirmação é corroborada nesse sentido.

### 34. README.md:7

**Observação:** O README afirma: "Dynamically loading routes from micro frontends".

**Interpretação:** A atribuição das rotas aos remotes é contradita: o manifesto do host define os caminhos, e os remotes só expõem `./entry`.

### 35. README.md:8

**Observação:** O README afirma: "Ensuring seamless navigation between different micro apps".

**Interpretação:** A navegação entre unidades é corroborada pelos links e pela troca de remote no mesmo contêiner; a qualidade da experiência não foi medida.

### 36. README.md:9

**Observação:** O README afirma: "Registering and updating route configurations at runtime".

**Interpretação:** A afirmação é parcial: há registro na criação do roteador, sem atualização posterior demonstrada.

### 37. README.md:10

**Observação:** O README afirma: "Maintaining consistency in route structure across the micro frontends".

**Interpretação:** A forma comum das entradas no manifesto e sua conversão uniforme em rotas corroboram a afirmação.

### 38. README.md:11

**Observação:** O README afirma: "Delegating rendering responsibilities to `Loader.vue`, which mounts or unmounts micro frontends dynamically".

**Interpretação:** A delegação da montagem e desmontagem ao carregador do host é corroborada pelo código.

### 39. README.md:16

**Observação:** O README afirma: "Vite for fast development and bundling".

**Interpretação:** Os builds Vite por aplicação corroboram a afirmação sobre a ferramenta; a velocidade não foi medida.

### 40. README.md:17

**Observação:** O README afirma: "Module Federation to dynamically load micro frontends".

**Interpretação:** A carga federada é corroborada pelas relações ativas e pelo runtime.

### 41. README.md:18

**Observação:** O README afirma: "Lerna for monorepo management".

**Interpretação:** A afirmação é parcial: o script de desenvolvimento invoca Lerna, mas a configuração é mínima e a dependência permanece `Undetermined` na 3.4.2.

### 42. README.md:19

**Observação:** O README afirma: "Independent Routing per micro frontend".

**Interpretação:** O roteamento independente por remote é contradito pelas rotas centrais no host e pelos exports dos remotes sem roteador.

### 43. README.md:28-30

**Observação:** O README afirma: "host/ # Shell application (Main container)", "app-1/ # Micro frontend 1", "app-2/ # Micro frontend 2".

**Interpretação:** Os papéis de shell e remotes são corroborados pelas unidades e relações registradas.

### 44. README.md:32

**Observação:** O README afirma: "package.json # Monorepo package manager with workspaces".

**Interpretação:** O workspace npm é corroborado pelo manifesto da raiz; descreve coordenação de diretórios, não composição.

### 45. README.md:58-63

**Observação:** O README afirma: "Alternatively, you can start each package individually".

**Interpretação:** As entradas e scripts próprios corroboram a execução individual em desenvolvimento; não demonstram deploy separado.

### 46. packages/host/src/plugins/federationPlugin.js:3-6

**Observação:** O comentário afirma: "initializes the module federation plugin before the app is mounted".

**Interpretação:** A ordem de inicialização anunciada é corroborada pela instalação do plugin antes da montagem do host.

### 47. packages/host/vite.config.js:12

**Observação:** O comentário afirma: "Entry point for the host's own remote modules".

**Interpretação:** A afirmação sobre módulos próprios expostos pelo host é contradita pela configuração sem `exposes`.

### 48. e4a97c4 2025-05-17 (package.json; lerna.json)

**Observação:** O primeiro commit já contém a declaração de Lerna, o script `dev` e a configuração mínima; os arquivos não mudam até o snapshot.

**Interpretação:** O histórico não esclarece o uso de Lerna antes da primeira presença observável. A dúvida não estabelece uma alternativa de composição frontend e a dependência segue `Undetermined`.

### 49. e4a97c4 2025-05-17 (package.json); d4cef45 2025-05-25 (.github/workflows/main_vdumpavue3.yml)

**Observação:** O workflow Azure entra sozinho no segundo e último commit, sem mudança nos manifestos que continuam sem build e start na raiz.

**Interpretação:** Continua indeterminado se o deploy serve alguma aplicação ou se a configuração não chegou a produzir uma publicação funcional. Essa dúvida afeta a leitura de deploy das unidades no snapshot.

### 50. e4a97c4 2025-05-17 (README.md; packages/host/src/routeManifest.js; packages/host/src/router/index.js)

**Observação:** README, manifesto e roteador chegam juntos no primeiro commit e permanecem iguais até o snapshot. Não há estágio observável com as rotas vindas dos remotes.

**Interpretação:** É inconclusivo se a documentação correspondeu a outro estágio anterior ao histórico; o snapshot continua claro sobre o roteamento central no host.

### 51. e4a97c4 2025-05-17 (packages/host/vite.config.js)

**Observação:** O comentário sobre módulos remotos do próprio host e a configuração sem `exposes` já coexistem no primeiro commit e não mudam depois.

**Interpretação:** O histórico não esclarece se o comentário veio de uma intenção ou configuração anterior; o snapshot não expõe módulos pelo host.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:12) | 1 tecnologia | manifesto | — | contexto | ambígua | — |
| 2 | 3.4.2 (packages/app-1/package.json:16) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 3 | 3.4.2 (packages/app-2/package.json:16) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #7 |
| 4 | 3.4.2 (packages/host/package.json:18) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #19; declara #11 |
| 5 | 3.4.2 (packages/host/package.json:19) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #8 |
| 6 | 3.4.2 (packages/app-1/package.json:16, Evidência); 3.4.3 (packages/app-1, Marcadores e Build); 3.4.4 (packages/app-1/src/entry.js:6, Observação); 3.4.5 #1 (Configuração); 3.4.6 #1 (Artefatos); 3.4.4 (packages/host/src/plugins/federationPlugin.js:29, Observação); 3.4.7 #5 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #22; configura #12; configura #25 |
| 7 | 3.4.2 (packages/app-2/package.json:16, Evidência); 3.4.3 (packages/app-2, Marcadores e Build); 3.4.4 (packages/app-2/src/entry.js:6, Observação); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos); 3.4.4 (packages/host/src/plugins/federationPlugin.js:29, Observação); 3.4.7 #5 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #23; configura #14; configura #26 |
| 8 | 3.4.2 (packages/host/package.json:19, Evidência); 3.4.3 (packages/host, Marcadores e Build); 3.4.5 #1, #2 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #18 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #24; configura #19 |
| 9 | 3.4.4 (packages/host/src/components/Loader.vue:70, src-load-remote) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #25; implementa #26 |
| 10 | 3.4.4 (packages/host/src/components/Loader.vue:96, src-load-remote) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #25; implementa #26 |
| 11 | 3.4.4 (packages/host/src/plugins/federationPlugin.js:29, src-load-remote) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #25; implementa #26 |
| 12 | 3.4.4 (packages/app-1/src/entry.js:6, src-mount-export) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #25 |
| 13 | 3.4.4 (packages/app-1/src/entry.js:20, src-mount-export) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #25 |
| 14 | 3.4.4 (packages/app-2/src/entry.js:6, src-mount-export) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #26 |
| 15 | 3.4.4 (packages/app-2/src/entry.js:20, src-mount-export) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #26 |
| 16 | 3.4.4 (packages/app-1/src/entry.js:13, src-mount-call) | 3 código | código-fonte | — | contexto | fraca | — |
| 17 | 3.4.4 (packages/app-2/src/entry.js:13, src-mount-call) | 3 código | código-fonte | — | contexto | fraca | — |
| 18 | 3.4.4 (packages/host/src/routeManifest.js:1, manual) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #25; implementa #26 |
| 19 | 3.4.4 (packages/host/src/plugins/federationPlugin.js:15, manual) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #25; implementa #26 |
| 20 | 3.4.4 (packages/host/src/components/Loader.vue:74, manual) | 3 código | código-fonte | module-federation | arquitetural | moderada | implementa #25; implementa #26 |
| 21 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 22 | 3.4.3 (packages/app-1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 23 | 3.4.3 (packages/app-2) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 24 | 3.4.3 (packages/host) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 25 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #24; liga #22 |
| 26 | 3.4.5 #2 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #24; liga #23 |
| 27 | 3.4.6 #1 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #22 |
| 28 | 3.4.6 #2 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #23 |
| 29 | 3.4.6 #3 | 6 build-deploy | manifesto | module-federation | arquitetural | moderada | publica #24 |
| 30 | 3.4.7 #1 | 7 documentação | comentário | — | contexto | fraca | contradiz package.json:7-9; contradiz .github/workflows/main_vdumpavue3.yml:26-33 |
| 31 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26 |
| 32 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #14; corrobora packages/host/src/main.js:8-17 |
| 33 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #18; corrobora packages/host/src/router/index.js:4-22 |
| 34 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #18; contradiz #6; contradiz #7 |
| 35 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #26; corrobora #20; corrobora packages/host/src/App.vue:4-8 |
| 36 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte packages/host/src/router/index.js:4-22; corrobora em parte packages/host/src/main.js:13 |
| 37 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #18; corrobora packages/host/src/router/index.js:5-12 |
| 38 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #9; corrobora #10; corrobora #20 |
| 39 | 3.4.7 #10 | 7 documentação | documentação | — | contexto | fraca | corrobora #27; corrobora #28; corrobora #29 |
| 40 | 3.4.7 #11 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #25; corrobora #26; corrobora #11; corrobora #19 |
| 41 | 3.4.7 #12 | 7 documentação | documentação | — | contexto | fraca | corrobora em parte package.json:4-8; corrobora em parte lerna.json:1-4 |
| 42 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #18; contradiz packages/app-1/src/entry.js:8-13; contradiz packages/app-1/package.json:11-13; contradiz packages/app-2/package.json:11-13 |
| 43 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22; corrobora #23; corrobora #24; corrobora #25; corrobora #26 |
| 44 | 3.4.7 #15 | 7 documentação | documentação | — | contexto | fraca | corrobora #21; corrobora package.json:4-6 |
| 45 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #22; corrobora #23; corrobora #24; corrobora packages/app-1/package.json:7; corrobora packages/app-2/package.json:7; corrobora packages/host/package.json:7 |
| 46 | 3.4.7 #17 | 7 documentação | comentário | module-federation | tecnológica | fraca | corrobora #19; corrobora packages/host/src/main.js:15-17 |
| 47 | 3.4.7 #18 | 7 documentação | comentário | — | arquitetural | fraca | contradiz #8 |
| 48 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #1; explica #41 |
| 49 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | ambígua | explica #27; explica #28; explica #29; explica #30 |
| 50 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #34; explica #36; explica #42 |
| 51 | 3.4.8 #4 | 8 histórico | histórico | — | arquitetural | fraca | explica #8; explica #47 |

## Resumo

Observações: 51. Dimensões (tecnologia: 5, configuração: 3, código: 12, estrutura: 4, composição: 2, build-deploy: 3, documentação: 18, histórico: 4). Força (forte: 3, moderada: 18, fraca: 28, ambígua: 2). Evidência (tecnológica: 12, arquitetural: 30, contexto: 9).

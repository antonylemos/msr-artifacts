---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
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

# 349 — LaurineLeNet/microfrontend-angular-angular

## Leitura do repositório

As evidências formam uma cadeia de Native Federation: declarações de dependência por aplicação (#1, #3, #5), builders e configurações próprias (#7–#15), manifesto com dois remotes (#16), carga por rotas e dashboard (#24–#31, #39–#41) e duas relações ativas do shell (#45, #46). Os diretórios confirmam três unidades frontend (#42–#44), com build e deploy separados em workers próprios (#48–#50). A configuração de publicação não comprova execução do deploy nem versionamento independente.

Athletes e ranking também se comunicam por eventos (#47). As aberturas, emissões e assinatura do canal (#34–#38) se conectam quando o shell monta ambos na mesma origem; executados isoladamente em hosts ou portas diferentes, os canais não se comunicam. O receptor do detalhe de atleta é interno a athletes (#32, #33) e não acrescenta outra relação entre unidades.

As declarações de `@softarc/native-federation-node` não têm uso direto no snapshot (#2, #4, #6). O histórico não explica sua origem (#51–#53), mas essa lacuna sobre o passado não torna ambígua a arquitetura atual. Os bootstraps locais e a inicialização standalone dos remotes (#17–#23) tampouco compõem outras unidades. A revisão documental tem zero afirmações, portanto não gera observações na dimensão 7 e não acrescenta corroboração semântica.

## Observações

### 1. athletes/package.json:14

**Observação:** `@angular-architects/native-federation` (`^21.2.3`) está declarado em `dependencies`.

**Interpretação:** Declara a tecnologia de federação; a configuração e o uso têm observações próprias.

### 2. athletes/package.json:22

**Observação:** `@softarc/native-federation-node` (`^3.3.4`) está declarado em `dependencies`. A revisão não encontrou import nem invocação direta do pacote no código ou build do snapshot.

**Interpretação:** A declaração isolada não demonstra integração entre unidades; os usos registrados de federação pertencem a outro pacote.

### 3. ranking/package.json:14

**Observação:** `@angular-architects/native-federation` (`^21.2.3`) está declarado em `dependencies`.

**Interpretação:** Declara a tecnologia de federação; a configuração e o uso têm observações próprias.

### 4. ranking/package.json:22

**Observação:** `@softarc/native-federation-node` (`^3.3.4`) está declarado em `dependencies`. A revisão não encontrou import nem invocação direta do pacote no código ou build do snapshot.

**Interpretação:** A declaração isolada não demonstra integração entre unidades; os usos registrados de federação pertencem a outro pacote.

### 5. shell/package.json:14

**Observação:** `@angular-architects/native-federation` (`^21.2.3`) está declarado em `dependencies`.

**Interpretação:** Declara a tecnologia de federação; a configuração e o uso têm observações próprias.

### 6. shell/package.json:22

**Observação:** `@softarc/native-federation-node` (`^3.3.4`) está declarado em `dependencies`. A revisão não encontrou import nem invocação direta do pacote no código ou build do snapshot.

**Interpretação:** A declaração isolada não demonstra integração entre unidades; os usos registrados de federação pertencem a outro pacote.

### 7. athletes/angular.json:16-29

**Observação:** O target `build` de `athletes` usa `@angular-architects/native-federation:build`, delega a `athletes:esbuild:production` ou `development` e escolhe produção por padrão.

**Interpretação:** Configura o mecanismo de federação no build de uma unidade, sem declarar um remote de outra unidade.

### 8. athletes/federation.config.js:1-32

**Observação:** `withNativeFederation` declara `name: athletes`, expõe `./Component` de `src/app/race/race.ts` e `./Routes` de `src/app/shell.routes.ts` e usa `shareAll` com `singleton: true`, `strictVersion: true` e `requiredVersion: auto`. Declara exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** Configura Native Federation na própria unidade e o compartilhamento de dependências; oferece módulos para consumo remoto.

### 9. ranking/angular.json:16-29

**Observação:** O target `build` de `ranking` usa `@angular-architects/native-federation:build`, delega a `ranking:esbuild:production` ou `development` e escolhe produção por padrão.

**Interpretação:** Configura o mecanismo de federação no build de uma unidade, sem declarar um remote de outra unidade.

### 10. ranking/federation.config.js:1-31

**Observação:** `withNativeFederation` declara `name: ranking`, expõe `./Component` de `src/app/app.ts` e usa `shareAll` com `singleton: true`, `strictVersion: true` e `requiredVersion: auto`. Declara exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** Configura Native Federation na própria unidade e o compartilhamento de dependências; oferece módulos para consumo remoto.

### 11. shell/angular.json:16-29

**Observação:** O target `build` de `shell` usa `@angular-architects/native-federation:build`, delega a `shell:esbuild:production` ou `development` e escolhe produção por padrão.

**Interpretação:** Configura o mecanismo de federação no build de uma unidade, sem declarar um remote de outra unidade.

### 12. shell/federation.config.js:1-27

**Observação:** `withNativeFederation` declara `name: shell`, não declara `exposes` e usa `shareAll` com `singleton: true`, `strictVersion: true` e `requiredVersion: auto`. Declara exclusões em `skip` e `ignoreUnusedDeps: true`.

**Interpretação:** Configura Native Federation na própria unidade e o compartilhamento de dependências, sem nomear os remotes do host.

### 13. athletes/angular.json:30-39

**Observação:** O target `serve` usa `@angular-architects/native-federation:build`, com `target: athletes:serve-original:development`, `dev: true` e `cacheExternalArtifacts: false`.

**Interpretação:** O servidor de desenvolvimento da unidade passa pelo mecanismo de federação. O bloco não liga outra unidade.

### 14. ranking/angular.json:30-39

**Observação:** O target `serve` usa `@angular-architects/native-federation:build`, com `target: ranking:serve-original:development`, `dev: true` e `cacheExternalArtifacts: false`.

**Interpretação:** O servidor de desenvolvimento da unidade passa pelo mecanismo de federação. O bloco não liga outra unidade.

### 15. shell/angular.json:30-39

**Observação:** O target `serve` usa `@angular-architects/native-federation:build`, com `target: shell:serve-original:development`, `dev: true` e `cacheExternalArtifacts: false`.

**Interpretação:** O servidor de desenvolvimento da unidade passa pelo mecanismo de federação. O bloco não liga outra unidade.

### 16. shell/public/federation.manifest.json:1-4

**Observação:** O manifesto associa `athletes` e `ranking` aos respectivos `remoteEntry.json` em `https://mf-angular-athletes.lenetlaurine.workers.dev` e `https://mf-angular-ranking.lenetlaurine.workers.dev`.

**Interpretação:** A configuração do host declara os dois remotes e os endereços pelos quais os resolve.

### 17. athletes/src/main.ts:3-5; athletes/src/bootstrap.ts:5

**Observação:** `import('./bootstrap')` carrega o bootstrap local depois de `initFederation` sem manifesto.

**Interpretação:** O carregamento assíncrono inicializa a própria unidade. Esta construção não carrega outra aplicação.

### 18. ranking/src/main.ts:3-5; ranking/src/bootstrap.ts:5

**Observação:** `import('./bootstrap')` carrega o bootstrap local depois de `initFederation` sem manifesto.

**Interpretação:** O carregamento assíncrono inicializa a própria unidade. Esta construção não carrega outra aplicação.

### 19. shell/src/main.ts:3-5; shell/src/bootstrap.ts:5

**Observação:** `import('./bootstrap')` carrega o bootstrap local depois de `initFederation` com `federation.manifest.json`.

**Interpretação:** O carregamento assíncrono inicializa a própria unidade. Esta construção não carrega outra aplicação.

### 20. athletes/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara a inicialização standalone da unidade; o import não estabelece composição.

### 21. athletes/src/main.ts:3

**Observação:** Chama `initFederation()` sem manifesto nem nomes de remotes.

**Interpretação:** Inicializa a federação da própria aplicação. O consumo pelo shell ocorre pelos módulos expostos, sem executar este main.

### 22. ranking/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Prepara a inicialização standalone da unidade; o import não estabelece composição.

### 23. ranking/src/main.ts:3

**Observação:** Chama `initFederation()` sem manifesto nem nomes de remotes.

**Interpretação:** Inicializa a federação da própria aplicação. O consumo pelo shell ocorre pelos módulos expostos, sem executar este main.

### 24. shell/src/app/app.routes.ts:1

**Observação:** Importa `loadRemoteModule` de `@angular-architects/native-federation`.

**Interpretação:** Disponibiliza o mecanismo usado nas rotas; o import sozinho não nomeia unidades de destino.

### 25. shell/src/app/app.routes.ts:11-13; shell/src/app/app.config.ts:9; athletes/federation.config.js:6-9; athletes/src/app/shell.routes.ts:7-17

**Observação:** A rota `athletes` usa `loadChildren` com `loadRemoteModule('athletes', './Routes').then(m => m.routes)`. O destino expõe `./Routes` e exporta `routes`; `provideRouter(routes)` registra as rotas do shell.

**Interpretação:** A rota conecta o shell às rotas da unidade athletes por Native Federation.

### 26. shell/src/app/app.routes.ts:16-18; shell/src/app/app.config.ts:9; ranking/federation.config.js:6-8; ranking/src/app/app.ts:19

**Observação:** A rota `ranking` usa `loadComponent` com `loadRemoteModule('ranking', './Component').then(m => m.App)`. O destino expõe `./Component` e exporta `App`; as rotas do shell estão registradas.

**Interpretação:** A rota conecta o shell ao componente da unidade ranking por Native Federation.

### 27. shell/src/app/dashboard/dashboard.ts:10

**Observação:** Importa `loadRemoteModule` de `@angular-architects/native-federation`.

**Interpretação:** Disponibiliza a carga remota usada pelo dashboard; esta linha não nomeia destinos.

### 28. shell/src/app/dashboard/dashboard.ts:56; shell/src/app/dashboard/dashboard.ts:59; athletes/federation.config.js:7; shell/src/app/app.routes.ts:6-9

**Observação:** `ngOnInit` carrega `loadRemoteModule('athletes', './Component')` em `Promise.all` e guarda o export `RaceComponent` para montagem. O dashboard é um componente das rotas do shell e a chave está exposta pelo destino.

**Interpretação:** A chamada nomeia a unidade athletes e seu módulo remoto, conectando o shell ao destino.

### 29. shell/src/app/dashboard/dashboard.ts:57; shell/src/app/dashboard/dashboard.ts:60; ranking/federation.config.js:7; shell/src/app/app.routes.ts:6-9

**Observação:** `ngOnInit` carrega `loadRemoteModule('ranking', './Component')` em `Promise.all` e guarda o export `App` para montagem. O dashboard é um componente das rotas do shell e a chave está exposta pelo destino.

**Interpretação:** A chamada nomeia a unidade ranking e seu módulo remoto, conectando o shell ao destino.

### 30. shell/src/main.ts:1

**Observação:** Importa `initFederation` de `@angular-architects/native-federation`.

**Interpretação:** Disponibiliza a inicialização do runtime, usada com manifesto em outra linha.

### 31. shell/src/main.ts:3

**Observação:** Chama `initFederation('federation.manifest.json')` antes do bootstrap.

**Interpretação:** Prepara a resolução pelo manifesto; a chamada não nomeia os remotes, cujos destinos estão na configuração #16.

### 32. athletes/src/app/athlete-detail/athlete-detail.ts:75

**Observação:** Declara o campo `channel` do tipo `BroadcastChannel` no componente de detalhe de athletes.

**Interpretação:** O campo prepara a comunicação interna descrita na revisão. Não estabelece ligação entre unidades.

### 33. athletes/src/app/athlete-detail/athlete-detail.ts:83-89; athletes/src/app/race/race.ts:46; athletes/src/app/race/race.ts:55

**Observação:** O detalhe abre `BroadcastChannel('athletes-positions')` e atualiza distância e término ao receber o nome da rota. O emissor registrado é RaceComponent, também de athletes.

**Interpretação:** A comunicação é interna a athletes; compartilhar o nome de canal não torna este receptor uma relação entre unidades.

### 34. athletes/src/app/race/race.ts:11; athletes/src/app/race/race.ts:36

**Observação:** Abre `BroadcastChannel(CHANNEL_NAME)`, com `CHANNEL_NAME = 'athletes-positions'`.

**Interpretação:** Implementa o canal usado na troca com ranking, mas a abertura do canal não nomeia o receptor.

### 35. athletes/src/app/race/race.ts:38-50

**Observação:** `advance` publica nome, distância e `finished` com `this.channel.postMessage` após atualizar cada avanço.

**Interpretação:** Implementa a emissão de posições usada na comunicação; a chamada não identifica uma unidade receptora.

### 36. athletes/src/app/race/race.ts:52-56

**Observação:** `reset` publica uma mensagem por atleta, com distância zero e `finished: false`.

**Interpretação:** Implementa a emissão do reinício pelo mesmo canal, sem nomear receptores.

### 37. ranking/src/app/app.ts:38

**Observação:** Declara o campo `channel` do tipo `BroadcastChannel` no App de ranking.

**Interpretação:** Prepara o mecanismo de recepção da unidade, sem nomear seu emissor.

### 38. ranking/src/app/app.ts:11; ranking/src/app/app.ts:41-48

**Observação:** `ngOnInit` abre o canal `athletes-positions` e instala `onmessage` para atualizar o mapa de posições com nome, distância e `finished`.

**Interpretação:** Implementa a recepção usada na troca entre unidades, mas o mecanismo de assinatura não nomeia a unidade emissora.

### 39. shell/src/app/app.routes.ts:5-25; shell/src/app/app.config.ts:9; shell/src/app/app.html:3-5

**Observação:** A tabela declara dashboard, rotas de carga de athletes e ranking e redirecionamento inicial para dashboard. `provideRouter(routes)` a registra e a navegação oferece os três caminhos.

**Interpretação:** O roteamento do shell organiza os dois remotes e sua visualização conjunta.

### 40. shell/src/app/dashboard/dashboard.ts:25; shell/src/app/dashboard/dashboard.ts:59; shell/src/app/dashboard/dashboard.ts:70

**Observação:** `athletesHost.createComponent(this.pendingAthletes)` monta o tipo guardado após a carga no contêiner `athletesHost` do dashboard.

**Interpretação:** A montagem materializa no shell o componente previamente carregado. A chamada usa um tipo guardado e depende da etapa de carga para identificar o remote.

### 41. shell/src/app/dashboard/dashboard.ts:37; shell/src/app/dashboard/dashboard.ts:60; shell/src/app/dashboard/dashboard.ts:75

**Observação:** `rankingHost.createComponent(this.pendingRanking)` monta o tipo guardado após a carga no contêiner `rankingHost` do dashboard.

**Interpretação:** A montagem materializa no shell o componente previamente carregado. A chamada usa um tipo guardado e depende da etapa de carga para identificar o remote.

### 42. athletes/; athletes/package.json:1-11; athletes/src/main.ts:3-5; athletes/src/bootstrap.ts:5; athletes/angular.json:16-29; athletes/angular.json:43-46

**Observação:** O diretório `athletes` contém pacote próprio, entrada que passa por main e bootstrap e target de build de federação sobre `@angular/build:application`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, sem demonstrar sozinho sua ligação com outras unidades.

### 43. ranking/; ranking/package.json:1-11; ranking/src/main.ts:3-5; ranking/src/bootstrap.ts:5; ranking/angular.json:16-29; ranking/angular.json:43-46

**Observação:** O diretório `ranking` contém pacote próprio, entrada que passa por main e bootstrap e target de build de federação sobre `@angular/build:application`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, sem demonstrar sozinho sua ligação com outras unidades.

### 44. shell/; shell/package.json:1-11; shell/src/main.ts:3-5; shell/src/bootstrap.ts:5; shell/angular.json:16-29; shell/angular.json:43-46

**Observação:** O diretório `shell` contém pacote próprio, entrada que passa por main e bootstrap e target de build de federação sobre `@angular/build:application`.

**Interpretação:** Confirma o limite de uma unidade frontend com entrada e build próprios, sem demonstrar sozinho sua ligação com outras unidades.

### 45. shell/src/main.ts:3; shell/public/federation.manifest.json:2; shell/src/app/app.routes.ts:13; shell/src/app/dashboard/dashboard.ts:56; shell/src/app/dashboard/dashboard.ts:70; athletes/federation.config.js:4-9; athletes/wrangler.jsonc:3-16

**Observação:** O shell resolve `athletes` pelo manifesto para seu worker e carrega `./Routes` na rota e `./Component` no dashboard. O nome e as chaves correspondem à configuração do destino, presente no snapshot.

**Interpretação:** Relação ativa host → remote entre shell e athletes, com resolução, exposição e consumo conectados.

### 46. shell/src/main.ts:3; shell/public/federation.manifest.json:3; shell/src/app/app.routes.ts:18; shell/src/app/dashboard/dashboard.ts:57; shell/src/app/dashboard/dashboard.ts:75; ranking/federation.config.js:4-8; ranking/wrangler.jsonc:3-16

**Observação:** O shell resolve `ranking` pelo manifesto para seu worker e carrega `./Component` na rota e no dashboard. O nome e as chaves correspondem à configuração do destino, presente no snapshot.

**Interpretação:** Relação ativa host → remote entre shell e ranking, com resolução, exposição e consumo conectados.

### 47. athletes/src/app/race/race.ts:11; athletes/src/app/race/race.ts:36; athletes/src/app/race/race.ts:46; athletes/src/app/race/race.ts:55; ranking/src/app/app.ts:11; ranking/src/app/app.ts:38-48; shell/src/app/dashboard/dashboard.ts:54-78

**Observação:** RaceComponent em athletes publica posições e reinícios em `athletes-positions`; App de ranking abre o mesmo canal, recebe e atualiza o ranking. O dashboard monta ambos na mesma página.

**Interpretação:** A relação ativa athletes → ranking usa events por BroadcastChannel. Requer mesma origem, atendida quando os dois rodam no shell; a hospedagem isolada em origens diferentes não oferece essa troca.

### 48. athletes/package.json:3-11; athletes/angular.json:16-29; athletes/angular.json:43-46; athletes/wrangler.jsonc:3-16; athletes/public/_headers:1-2; shell/public/federation.manifest.json:2

**Observação:** `ng build` de `athletes` usa target próprio de federação sobre esbuild. O worker `mf-angular-athletes` serve `./dist/athletes/browser` como SPA. O pacote é privado, versão `0.0.0`. O remote tem CORS aberto e o manifesto do shell aponta para o host desse worker.

**Interpretação:** Build e deploy separados confirmam uma fronteira de publicação por aplicação. A revisão não registra versionamento independente nem execução comprovada do deploy.

### 49. ranking/package.json:3-11; ranking/angular.json:16-29; ranking/angular.json:43-46; ranking/wrangler.jsonc:3-16; ranking/public/_headers:1-2; shell/public/federation.manifest.json:3

**Observação:** `ng build` de `ranking` usa target próprio de federação sobre esbuild. O worker `mf-angular-ranking` serve `./dist/ranking/browser` como SPA. O pacote é privado, versão `0.0.0`. O remote tem CORS aberto e o manifesto do shell aponta para o host desse worker.

**Interpretação:** Build e deploy separados confirmam uma fronteira de publicação por aplicação. A revisão não registra versionamento independente nem execução comprovada do deploy.

### 50. shell/package.json:3-11; shell/angular.json:16-29; shell/angular.json:43-46; shell/wrangler.jsonc:3-16

**Observação:** `ng build` de `shell` usa target próprio de federação sobre esbuild. O worker `mf-angular-shell` serve `./dist/shell/browser` como SPA. O pacote é privado, versão `0.0.0`. O snapshot não informa o endereço do worker do shell.

**Interpretação:** Build e deploy separados confirmam uma fronteira de publicação por aplicação. A revisão não registra versionamento independente nem execução comprovada do deploy.

### 51. 73c274c 2026-05-14 (athletes/package.json); 342c92d 2026-06-08 (athletes/package.json)

**Observação:** A revisão histórica registra criação de `athletes/package.json` no commit inicial e modificação no snapshot. O blob inicial está ausente, e sua leitura falhou. Não foi possível determinar se `@softarc/native-federation-node` já estava declarado nem por que permaneceu.

**Interpretação:** O resultado histórico é inconclusivo sobre o passado da dependência. O snapshot continua claro quanto à ausência de uso direto; a dúvida não abre interpretações arquiteturais concorrentes para o estado atual.

### 52. 73c274c 2026-05-14 (ranking/package.json); 342c92d 2026-06-08 (ranking/package.json)

**Observação:** A revisão histórica registra criação de `ranking/package.json` no commit inicial e modificação no snapshot. O blob inicial está ausente, e sua leitura falhou. Não foi possível determinar se `@softarc/native-federation-node` já estava declarado nem por que permaneceu.

**Interpretação:** O resultado histórico é inconclusivo sobre o passado da dependência. O snapshot continua claro quanto à ausência de uso direto; a dúvida não abre interpretações arquiteturais concorrentes para o estado atual.

### 53. 73c274c 2026-05-14 (shell/package.json); 342c92d 2026-06-08 (shell/package.json)

**Observação:** A revisão histórica registra criação de `shell/package.json` no commit inicial e modificação no snapshot. O blob inicial está ausente, e sua leitura falhou. Não foi possível determinar se `@softarc/native-federation-node` já estava declarado nem por que permaneceu.

**Interpretação:** O resultado histórico é inconclusivo sobre o passado da dependência. O snapshot continua claro quanto à ausência de uso direto; a dúvida não abre interpretações arquiteturais concorrentes para o estado atual.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (athletes/package.json:14) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #7; declara #8 |
| 2 | 3.4.2 (athletes/package.json:22) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 3 | 3.4.2 (ranking/package.json:14) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #9; declara #10 |
| 4 | 3.4.2 (ranking/package.json:22) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 5 | 3.4.2 (shell/package.json:14) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | declara #11; declara #12 |
| 6 | 3.4.2 (shell/package.json:22) | 1 tecnologia | manifesto | native-federation | tecnológica | fraca | — |
| 7 | 3.4.2 (athletes/package.json:14) (Evidência (artefato:linha)); 3.4.3 (athletes) (Marcadores, Build); 3.4.6 #1 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #42; configura #48 |
| 8 | 3.4.2 (athletes/package.json:14) (Evidência (artefato:linha)); 3.4.2 (athletes/package.json:22) (Evidência (artefato:linha)); 3.4.3 (athletes) (Marcadores); 3.4.4 (athletes/src/main.ts:3) (Observação); 3.4.4 (shell/src/app/app.routes.ts:13) (Observação); 3.4.4 (shell/src/app/dashboard/dashboard.ts:56) (Observação); 3.4.5 #1 (Configuração) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #42; configura #45 |
| 9 | 3.4.2 (ranking/package.json:14) (Evidência (artefato:linha)); 3.4.3 (ranking) (Marcadores, Build); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #43; configura #49 |
| 10 | 3.4.2 (ranking/package.json:14) (Evidência (artefato:linha)); 3.4.2 (ranking/package.json:22) (Evidência (artefato:linha)); 3.4.3 (ranking) (Marcadores); 3.4.4 (ranking/src/main.ts:3) (Observação); 3.4.4 (shell/src/app/app.routes.ts:18) (Observação); 3.4.4 (shell/src/app/dashboard/dashboard.ts:57) (Observação); 3.4.5 #2 (Configuração) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #43; configura #46 |
| 11 | 3.4.2 (shell/package.json:14) (Evidência (artefato:linha)); 3.4.3 (shell) (Marcadores, Build); 3.4.6 #3 (Artefatos) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #44; configura #50 |
| 12 | 3.4.2 (shell/package.json:14) (Evidência (artefato:linha)); 3.4.2 (shell/package.json:22) (Evidência (artefato:linha)); 3.4.3 (shell) (Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #44 |
| 13 | 3.4.3 (athletes) (Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #42 |
| 14 | 3.4.3 (ranking) (Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #43 |
| 15 | 3.4.3 (shell) (Marcadores) | 2 configuração | configuração | native-federation | tecnológica | moderada | configura #44 |
| 16 | 3.4.4 (shell/src/main.ts:3) (Observação); 3.4.5 #1 (Configuração); 3.4.5 #2 (Configuração); 3.4.6 #1 (Onde é servida); 3.4.6 #2 (Onde é servida) | 2 configuração | configuração | native-federation | arquitetural | forte | configura #31; configura #45; configura #46 |
| 17 | 3.4.4 (athletes/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 18 | 3.4.4 (ranking/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 19 | 3.4.4 (shell/src/main.ts:5) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 20 | 3.4.4 (athletes/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 21 | 3.4.4 (athletes/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 22 | 3.4.4 (ranking/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 23 | 3.4.4 (ranking/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | fraca | — |
| 24 | 3.4.4 (shell/src/app/app.routes.ts:1) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #45; implementa #46 |
| 25 | 3.4.4 (shell/src/app/app.routes.ts:13) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #45 |
| 26 | 3.4.4 (shell/src/app/app.routes.ts:18) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #46 |
| 27 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:10) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #45; implementa #46 |
| 28 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:56) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #45 |
| 29 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:57) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #46 |
| 30 | 3.4.4 (shell/src/main.ts:1) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #45; implementa #46 |
| 31 | 3.4.4 (shell/src/main.ts:3) | 3 código | código-fonte | native-federation | tecnológica | moderada | implementa #45; implementa #46 |
| 32 | 3.4.4 (athletes/src/app/athlete-detail/athlete-detail.ts:75) | 3 código | código-fonte | events | contexto | fraca | — |
| 33 | 3.4.4 (athletes/src/app/athlete-detail/athlete-detail.ts:83) | 3 código | código-fonte | events | contexto | fraca | — |
| 34 | 3.4.4 (athletes/src/app/race/race.ts:36) | 3 código | código-fonte | events | tecnológica | moderada | implementa #47 |
| 35 | 3.4.4 (athletes/src/app/race/race.ts:46) | 3 código | código-fonte | events | tecnológica | moderada | implementa #47 |
| 36 | 3.4.4 (athletes/src/app/race/race.ts:55) | 3 código | código-fonte | events | tecnológica | moderada | implementa #47 |
| 37 | 3.4.4 (ranking/src/app/app.ts:38) | 3 código | código-fonte | events | tecnológica | moderada | implementa #47 |
| 38 | 3.4.4 (ranking/src/app/app.ts:41) | 3 código | código-fonte | events | tecnológica | moderada | implementa #47 |
| 39 | 3.4.4 (shell/src/app/app.routes.ts:5) | 3 código | código-fonte | native-federation | arquitetural | forte | implementa #45; implementa #46 |
| 40 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:70) | 3 código | código-fonte | native-federation | arquitetural | moderada | implementa #45 |
| 41 | 3.4.4 (shell/src/app/dashboard/dashboard.ts:75) | 3 código | código-fonte | native-federation | arquitetural | moderada | implementa #46 |
| 42 | 3.4.3 (athletes) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 43 | 3.4.3 (ranking) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 44 | 3.4.3 (shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 45 | 3.4.5 #1 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #44; liga #42 |
| 46 | 3.4.5 #2 | 5 composição | código-fonte | native-federation | arquitetural | forte | liga #44; liga #43 |
| 47 | 3.4.5 #3 | 5 composição | código-fonte | events | arquitetural | forte | liga #42; liga #43 |
| 48 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #42 |
| 49 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #43 |
| 50 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #44 |
| 51 | 3.4.8 #1 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #2 |
| 52 | 3.4.8 #2 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #4 |
| 53 | 3.4.8 #3 | 8 histórico | histórico | native-federation | tecnológica | fraca | explica #6 |

## Resumo

Observações: 53. Dimensões (tecnologia: 6, configuração: 10, código: 25, estrutura: 3, composição: 3, build-deploy: 3, documentação: 0, histórico: 3). Força (forte: 9, moderada: 26, fraca: 18, ambígua: 0). Evidência (tecnológica: 34, arquitetural: 17, contexto: 2).

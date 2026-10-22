---
schema: 1
id: 979173938
full_name: pmathulan/frontend-coding-exercises
commit: 89a3c271484ece4e37f719db9093c9157721a240
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
  date: 2026-10-21
---

# 009 — pmathulan/frontend-coding-exercises

## Leitura do repositório

O repositório é uma coleção de exercícios, e só `microfrontend-workspace` implementa micro-frontends. Nele, a cadeia de Module Federation é curta:
- **Dependência:** `@angular-architects/module-federation` (#1).
- **Configuração:** o shell declara o remote `mfe1` (#2), e o mfe1 se declara e expõe `./Component` (#3). As duas configurações compartilham as dependências como singletons.
- **Código:** a rota do shell carrega o componente do mfe1 pela URL do `remoteEntry.js` (#7, #10).
- **Relação host → remote:** isso resulta na relação ativa shell → mfe1 (#20).
- **Comunicação:** o compartilhamento como singleton também sustenta um segundo canal entre as mesmas unidades, um serviço com `BehaviorSubject` na biblioteca compartilhada (#11, #21).

A estrutura engana se for lida sozinha:
- **Unidades fora da composição:** há cinco aplicações frontend com limite próprio (#12, #14, #16, #18, #19), mas três delas são exercícios independentes, sem relação com a composição.
- **Build:** todas as aplicações têm build próprio (#22 a #26).
- **Deploy ambíguo:** o único artefato de deploy é um chart Helm genérico que não se liga a nenhuma pasta. Por isso o deploy é ambíguo, e o histórico não resolve a dúvida (#38).

Outros sinais que enganam:
- **Rota comentada:** a rota `mfe2` está comentada (#8), e o histórico não diz se ela chegou a funcionar (#37).
- **Script de CDN:** um script carrega o Bootstrap de uma CDN, e não outra aplicação (#9).
- **README:** a documentação do workspace confere com a implementação, salvo a explicação do alias, que cita um arquivo inexistente (#36).

## Observações

### 1. microfrontend-workspace/package.json:14

**Observação:** `@angular-architects/module-federation` (`^19.0.3`) está declarada em `dependencies`.

**Interpretação:** A tecnologia de federação está presente. A configuração e o código a usam.

### 2. microfrontend-workspace/projects/shell/webpack.config.js:1-18

**Observação:** `withModuleFederationPlugin` declara `name: 'shell'`, expõe `./Component` (o `app.component.ts` do shell), compartilha as dependências com `shareAll` como singletons e declara o remote `mfe1: "mfe1@http://localhost:4201/remoteEntry.js"`.

**Interpretação:** A configuração do host declara o remote mfe1 e onde encontrá-lo em desenvolvimento.

**Nota:** O `angular.json` só aponta o builder genérico `ngx-build-plus:browser` para este arquivo, e o `webpack.prod.config.js` só o reexporta. Os dois não viraram observação. Pela mesma regra, o alias `shared` do `tsconfig.json` (microfrontend-workspace/tsconfig.json:15-18) é um alias de caminho e fica fora da dimensão 2.

### 3. microfrontend-workspace/projects/mfe1/webpack.config.js:1-16

**Observação:** `withModuleFederationPlugin` declara `name: 'mfe1'` e `filename: 'remoteEntry.js'`, expõe `./Component` (o `app.component.ts` do mfe1) e compartilha as dependências com `shareAll` como singletons.

**Interpretação:** O mfe1 está configurado como remote e oferece seu componente a um host.

### 4. microfrontend-workspace/projects/mfe1/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno à unidade.

### 5. microfrontend-workspace/projects/shell/src/main.ts:1

**Observação:** `import('./bootstrap')`.

**Interpretação:** É um bootstrap assíncrono interno ao shell.

### 6. microfrontend-workspace/projects/shell/src/app/app.routes.ts:2

**Observação:** Importa `loadRemoteModule` de `@angular-architects/module-federation`.

**Interpretação:** O mecanismo de carga remota está disponível nas rotas do shell.

### 7. microfrontend-workspace/projects/shell/src/app/app.routes.ts:6-12

**Observação:** A rota `mfe1` usa `loadComponent` com `loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4201/remoteEntry.js', exposedModule: './Component' })` e `m.AppComponent`.

**Interpretação:** O shell carrega em runtime o componente do mfe1, pela URL do remote.

### 8. microfrontend-workspace/projects/shell/src/app/app.routes.ts:14-21

**Observação:** Uma rota `mfe2` com `loadRemoteModule` para `http://localhost:4202/remoteEntry.js` está inteiramente comentada.

**Interpretação:** É uma carga remota desativada, cujo destino não existe no snapshot.

### 9. angular-frontend-practical/src/index.html:13-15

**Observação:** Carrega o Bootstrap de uma CDN.

**Interpretação:** É uma biblioteca de UI, e não outra aplicação frontend. É um falso positivo da busca por script externo.

### 10. microfrontend-workspace/projects/shell/src/app/app.routes.ts:4-24; microfrontend-workspace/projects/shell/src/app/app.config.ts:7

**Observação:** A tabela de rotas do shell nomeia `mfe1` e redireciona a rota vazia para ela. É registrada na configuração do shell.

**Interpretação:** O roteamento do host declara a relação host → remote.

### 11. microfrontend-workspace/projects/shared/src/lib/message.service.ts:8-12

**Observação:** `MessageService` mantém um `BehaviorSubject`, expõe `message$` e publica com `setMessage`.

**Interpretação:** É o mecanismo de comunicação usado entre as unidades. Os participantes (o shell publica, o mfe1 assina) estão na relação #21.

### 12. angular-frontend-practical; angular-frontend-practical/package.json:1-11; angular-frontend-practical/angular.json:17-22; angular-frontend-practical/src/main.ts:1-6

**Observação:** É uma aplicação Angular com manifesto, entrada e build próprios.

**Interpretação:** É uma unidade frontend com limite próprio. É um exercício independente, fora da composição.

### 13. microfrontend-workspace; microfrontend-workspace/package.json:1-12; microfrontend-workspace/angular.json:5-14, 114-122, 222-225

**Observação:** É o manifesto e o `angular.json` do workspace, que declaram os projetos shell, mfe1 e shared, sem UI própria.

**Interpretação:** É a raiz de coordenação do workspace, e não uma unidade.

### 14. microfrontend-workspace/projects/mfe1; microfrontend-workspace/angular.json:125-132, 149-150; microfrontend-workspace/projects/mfe1/src/bootstrap.ts:1-6

**Observação:** É um projeto Angular do workspace com entrada e target de build próprios, sem manifesto local.

**Interpretação:** É uma unidade frontend com limite próprio.

### 15. microfrontend-workspace/projects/shared; microfrontend-workspace/projects/shared/package.json:1-12; microfrontend-workspace/angular.json:222-241

**Observação:** É uma biblioteca com build ng-packagr e sem entrada de aplicação.

**Interpretação:** É uma biblioteca compartilhada, e não uma unidade frontend.

### 16. microfrontend-workspace/projects/shell; microfrontend-workspace/angular.json:17-24, 41-42; microfrontend-workspace/projects/shell/src/bootstrap.ts:1-6

**Observação:** É um projeto Angular do workspace com entrada e target de build próprios, sem manifesto local.

**Interpretação:** É uma unidade frontend com limite próprio.

### 17. rate-limited-scheduler; rate-limited-scheduler/package.json:1-9; rate-limited-scheduler/tsconfig.json:2-13

**Observação:** É um utilitário TypeScript compilado por `tsc`, sem UI.

**Interpretação:** Não é uma unidade frontend.

### 18. react-performance-practical; react-performance-practical/package.json:1-11; react-performance-practical/index.html:10-11; react-performance-practical/vite.config.ts:6-11

**Observação:** É uma aplicação React com manifesto, entrada e build Vite próprios.

**Interpretação:** É uma unidade frontend com limite próprio. É um exercício independente, fora da composição.

### 19. ssr-app; ssr-app/package.json:1-11; ssr-app/angular.json:17-22; ssr-app/src/main.ts:1-6

**Observação:** É uma aplicação Angular com SSR, com manifesto, entrada e build próprios.

**Interpretação:** É uma unidade frontend com limite próprio. É um exercício independente, fora da composição.

### 20. microfrontend-workspace/projects/shell/src/app/app.routes.ts:2-12; microfrontend-workspace/projects/shell/webpack.config.js:14-16; microfrontend-workspace/projects/mfe1/webpack.config.js:5-10

**Observação:** A rota do shell carrega `./Component` de `http://localhost:4201/remoteEntry.js`. O módulo e o nome `mfe1` correspondem à configuração do mfe1.

**Interpretação:** É uma relação host → remote ativa.

### 21. microfrontend-workspace/projects/shared/src/lib/message.service.ts:12; microfrontend-workspace/projects/shell/src/app/app.component.ts:19; microfrontend-workspace/projects/mfe1/src/app/app.component.ts:16-18; microfrontend-workspace/projects/shell/webpack.config.js:11-13; microfrontend-workspace/projects/mfe1/webpack.config.js:12-14

**Observação:** O shell envia mensagens pelo `MessageService`, e o mfe1 as assina. O serviço é compartilhado como singleton pelas duas configurações.

**Interpretação:** É uma relação de comunicação ativa, no sentido shell → mfe1.

### 22. angular-frontend-practical/angular.json:17-22; angular-frontend-practical/package.json:7; spa-helm/Chart.yaml:1-4

**Observação:** Tem target de build e saída próprios. O único artefato de deploy do repositório é um chart Helm genérico, sem vínculo com a pasta.

**Interpretação:** Há uma fronteira de build própria. Não se sabe se o chart publica esta aplicação.

### 23. microfrontend-workspace/angular.json:125-131, 150; spa-helm/Chart.yaml:1-4

**Observação:** Tem target de build e saída `dist/mfe1` próprios, com a mesma instalação de dependências do shell. O chart genérico não se liga à pasta.

**Interpretação:** Há uma fronteira de build própria. Não se sabe se o chart publica esta aplicação.

### 24. microfrontend-workspace/angular.json:17-23, 42; spa-helm/Chart.yaml:1-4

**Observação:** Tem target de build e saída `dist/shell` próprios. O chart genérico não se liga à pasta.

**Interpretação:** Há uma fronteira de build própria. Não se sabe se o chart publica esta aplicação.

### 25. react-performance-practical/vite.config.ts:6-11; react-performance-practical/package.json:8; spa-helm/Chart.yaml:1-4

**Observação:** Tem configuração Vite e build próprios. O chart genérico não se liga à pasta.

**Interpretação:** Há uma fronteira de build própria. Não se sabe se o chart publica esta aplicação.

### 26. ssr-app/angular.json:17-22; ssr-app/package.json:7, 10; spa-helm/Chart.yaml:1-4

**Observação:** Tem target de build próprio e um script que roda o servidor SSR construído. O chart genérico não se liga à pasta.

**Interpretação:** Há uma fronteira de build própria. Não se sabe se o chart publica esta aplicação.

### 27. README.md:3-5

**Observação:** "multiple frontend coding exercises […] Each exercise is organized in its own folder".

**Interpretação:** Descreve o repositório como exercícios independentes, cada um na sua pasta. A afirmação é corroborada.

### 28. microfrontend-workspace/README.md:3

**Observação:** "demonstrates a **Micro-Frontend architecture** using Angular, Module Federation, and a shared library".

**Interpretação:** Apresenta o workspace como arquitetura de micro-frontends com Module Federation. A afirmação é corroborada.

### 29. microfrontend-workspace/README.md:5-6

**Observação:** "**Shell**: The main host application. **MFE1**: A remote micro-frontend loaded at runtime."

**Interpretação:** Descreve os papéis de host e remote. A afirmação é corroborada.

### 30. microfrontend-workspace/README.md:7

**Observação:** "**Shared Library**: Contains services or utilities used across apps."

**Interpretação:** Afirma que a biblioteca é usada pelas aplicações. A afirmação é corroborada.

### 31. microfrontend-workspace/README.md:41

**Observação:** "Navigating to /mfe1 in the shell will dynamically load MFE1 via Module Federation".

**Interpretação:** Descreve a carga do remote sob demanda. A afirmação é corroborada.

### 32. microfrontend-workspace/README.md:46

**Observação:** "Routes are defined […] using loadRemoteModule() from @angular-architects/module-federation."

**Interpretação:** Descreve o mecanismo de carga nas rotas. A afirmação é corroborada.

### 33. microfrontend-workspace/README.md:50

**Observação:** "Shell can share services and state with MFE1 using the shared library."

**Interpretação:** Descreve a comunicação pelo serviço compartilhado. A afirmação é corroborada.

### 34. microfrontend-workspace/README.md:53

**Observação:** "Exposes Angular components or modules via Module Federation."

**Interpretação:** Afirma que o mfe1 expõe componentes por federação. A afirmação é corroborada.

### 35. microfrontend-workspace/README.md:55

**Observação:** "Registered as a remote in Shell's webpack.config.js."

**Interpretação:** Afirma que o mfe1 está declarado como remote na configuração do shell. A afirmação é corroborada.

### 36. microfrontend-workspace/README.md:62

**Observação:** "Aliased in tsconfig.base.json for clean imports (e.g., @shared/message.service)."

**Interpretação:** Descreve um alias num arquivo e com um caminho que não existem. A afirmação é contradita.

### 37. 89a3c27 2025-05-07 (microfrontend-workspace/projects/shell/src/app/app.routes.ts)

**Observação:** O arquivo de rotas chega com a rota `mfe2` já comentada, no único commit.

**Interpretação:** Não se sabe se a rota chegou a funcionar. A dúvida é só sobre o passado: no snapshot, ela está desativada.

### 38. 89a3c27 2025-05-07 (spa-helm)

**Observação:** O chart chega com os exercícios no único commit.

**Interpretação:** O histórico não diz para qual aplicação o chart foi feito. Continuam plausíveis duas leituras do snapshot: o chart publica uma das aplicações, ou é um modelo sem uso.

### 39. 89a3c27 2025-05-07 (microfrontend-workspace/README.md, microfrontend-workspace/tsconfig.json)

**Observação:** O README e o `tsconfig.json` chegam juntos no único commit, e não há versão com `tsconfig.base.json`.

**Interpretação:** Não se sabe se o README descreve uma organização anterior. A dúvida é só sobre o passado: no snapshot, o arquivo não existe.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (microfrontend-workspace/package.json:14) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #2; declara #3; declara #6 |
| 2 | 3.4.2 (microfrontend-workspace/package.json:14, Evidência); 3.4.3 (microfrontend-workspace/projects/shell, Marcadores); 3.4.5 #1, #2 (Configuração); 3.4.7 #7, #9 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #16; configura #20; configura #21 |
| 3 | 3.4.3 (microfrontend-workspace/projects/mfe1, Marcadores); 3.4.5 #1, #2 (Configuração); 3.4.7 #3, #7, #8 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #14; configura #20; configura #21 |
| 4 | 3.4.4 (microfrontend-workspace/projects/mfe1/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 5 | 3.4.4 (microfrontend-workspace/projects/shell/src/main.ts:1) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 6 | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:2) | 3 código | código-fonte | module-federation | tecnológica | moderada | implementa #20 |
| 7 | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:8) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #20 |
| 8 | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:17) | 3 código | código-fonte | module-federation | tecnológica | fraca | — |
| 9 | 3.4.4 (angular-frontend-practical/src/index.html:13) | 3 código | código-fonte | — | contexto | fraca | — |
| 10 | 3.4.4 (microfrontend-workspace/projects/shell/src/app/app.routes.ts:4) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #20 |
| 11 | 3.4.4 (microfrontend-workspace/projects/shared/src/lib/message.service.ts:12) | 3 código | código-fonte | events | tecnológica | moderada | implementa #21 |
| 12 | 3.4.3 (angular-frontend-practical) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.3 (microfrontend-workspace) | 4 estrutura | diretório | — | contexto | fraca | — |
| 14 | 3.4.3 (microfrontend-workspace/projects/mfe1) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.3 (microfrontend-workspace/projects/shared) | 4 estrutura | diretório | — | contexto | fraca | — |
| 16 | 3.4.3 (microfrontend-workspace/projects/shell) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 17 | 3.4.3 (rate-limited-scheduler) | 4 estrutura | diretório | — | contexto | fraca | — |
| 18 | 3.4.3 (react-performance-practical) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 19 | 3.4.3 (ssr-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 20 | 3.4.5 #1 | 5 composição | código-fonte | module-federation | arquitetural | forte | liga #16; liga #14 |
| 21 | 3.4.5 #2 | 5 composição | código-fonte | events | arquitetural | forte | liga #16; liga #14 |
| 22 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #12 |
| 23 | 3.4.6 #2 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #14 |
| 24 | 3.4.6 #3 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #16 |
| 25 | 3.4.6 #4 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #18 |
| 26 | 3.4.6 #5 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #19 |
| 27 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #14; corrobora #16; corrobora #18; corrobora #19 |
| 28 | 3.4.7 #2 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #1; corrobora #20 |
| 29 | 3.4.7 #3 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #20; corrobora #7; corrobora #3 |
| 30 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora microfrontend-workspace/projects/shell/src/app/app.component.ts:4; corrobora microfrontend-workspace/projects/mfe1/src/app/app.component.ts:3 |
| 31 | 3.4.7 #5 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #20; corrobora #7 |
| 32 | 3.4.7 #6 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #6; corrobora #7 |
| 33 | 3.4.7 #7 | 7 documentação | documentação | events | arquitetural | fraca | corrobora #21; corrobora #2; corrobora #3 |
| 34 | 3.4.7 #8 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #3 |
| 35 | 3.4.7 #9 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #2 |
| 36 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz microfrontend-workspace/tsconfig.json:15-18; contradiz microfrontend-workspace/projects/shell/src/app/app.component.ts:4 |
| 37 | 3.4.8 #1 | 8 histórico | histórico | module-federation | tecnológica | fraca | explica #8 |
| 38 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | ambígua | explica #22; explica #23; explica #24; explica #25; explica #26 |
| 39 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #36 |

## Resumo

Observações: 39. Dimensões (tecnologia: 1, configuração: 2, código: 8, estrutura: 8, composição: 2, build-deploy: 5, documentação: 10, histórico: 3). Força (forte: 5, moderada: 13, fraca: 20, ambígua: 1). Evidência (tecnológica: 8, arquitetural: 27, contexto: 4).

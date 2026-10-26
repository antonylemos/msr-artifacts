---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 316 — Tutul33/mf-workspace

## Leitura do repositório

Há dois documentos em inglês, lidos integralmente: `README.md` e `angular_20_microfrontend_app_guide.md`. Ambos são um guia específico deste projeto, não um README padrão do Angular CLI. O conteúdo é praticamente repetido; o README acrescenta a árvore geral do workspace (README.md:213-253). O guia apresenta três aplicações Angular 20, um host e dois remotos, e Native Federation (README.md:3,22-24). Essa descrição corresponde às três unidades da revisão estrutural e às duas relações ativas da revisão de composição (3.4.3, tabela Unidades; 3.4.5 #1-#2). As cinco revisões anteriores estão `final` e têm o mesmo commit da classificação e da aquisição.

Os blocos de configuração e código são exemplos reproduzidos no guia e não viram afirmações separadas: configurações dos remotos, módulos de rotas, componente Home e rotas do host (README.md:67-183; angular_20_microfrontend_app_guide.md:67-183). O exemplo de roteamento corresponde ao código de projects/host-app/src/app/app.routes.ts:4-26; há diferenças de detalhe nos exemplos internos, como o nome `HomeComponent` no guia e `Home` no snapshot (projects/customer-app/src/app/customer/home/home.ts:9; projects/orders-app/src/app/orders/home/home.ts:9). A pequena árvore de README.md:54-63 e angular_20_microfrontend_app_guide.md:54-63 descreve apenas a organização interna de customer-app, sem propriedade sobre as unidades como conjunto; seu `customer-routes.module.ts` aparece sob `src/app`, enquanto o arquivo real está em `src/app/customer` (projects/customer-app/federation.config.js:9). As instruções de criar o workspace vazio (README.md:7-12; angular_20_microfrontend_app_guide.md:7-12), gerar, instalar e inicializar (README.md:16-48; angular_20_microfrontend_app_guide.md:16-48), abrir três terminais e testar URLs do host (README.md:187-209; angular_20_microfrontend_app_guide.md:187-209) são passos do tutorial. Não afirmam deploy nem independência de evolução. Os textos esperados “Customer Home” e “Orders Home” são detalhes de apresentação; os templates reais dizem “Customer home works!” e “Orders home works!” (projects/customer-app/src/app/customer/home/home.html:1; projects/orders-app/src/app/orders/home/home.html:1).

Ocorrências `doc-*` sem linha própria: README.md:1,28 e angular_20_microfrontend_app_guide.md:1,28 são títulos; README.md:246 é o nome do guia na árvore, sem afirmação adicional; README.md:255 e angular_20_microfrontend_app_guide.md:214 são o título de encerramento que repete a configuração da afirmação #1. As ocorrências de README.md:3 e angular_20_microfrontend_app_guide.md:3 estão consolidadas em #1; README.md:258 e angular_20_microfrontend_app_guide.md:217 repetem os papéis de #3-#4. README.md:267 e angular_20_microfrontend_app_guide.md:226 oferecem “Tailwind + Material setup for MFEs” como possível continuação (“Let me know if you want”), sem afirmar implementação atual; o mesmo vale para remotos adicionais (README.md:263-267; angular_20_microfrontend_app_guide.md:222-226). “Standalone components” e “Angular 20 compatible configuration” (README.md:260-261; angular_20_microfrontend_app_guide.md:219-220) tratam de componentes internos e da versão já incluída em #1, sem outra relação entre unidades.

Foram lidos os comentários e campos descritivos dos artefatos citados nas revisões anteriores: package.json (sem `description`), angular.json (sem comentários), .gitignore, .vscode/tasks.json, os três federation.config.js, main.ts, bootstrap.ts, app.config.ts, app.routes.ts e o app.html do host, além dos módulos de rotas dos remotos. Os comentários de federação são instruções genéricas da ferramenta sobre `skip`, compartilhamento e `ignoreUnusedDeps` (projects/host-app/federation.config.js:14-24; projects/customer-app/federation.config.js:21-31; projects/orders-app/federation.config.js:21-31). As exposições alternativas de `./Component` estão comentadas (projects/customer-app/federation.config.js:8; projects/orders-app/federation.config.js:8); não são prosa afirmando uma relação ativa. Nenhum desses comentários acrescenta afirmação arquitetural específica do projeto. O mapa `initFederation` do host aponta `customerApp` para a porta do próprio host (projects/host-app/src/main.ts:3-5; angular.json:114), como já registram 3.4.4 e 3.4.5; as relações documentadas usam as URLs diretas nas rotas (projects/host-app/src/app/app.routes.ts:8-19). A corroboração abaixo é pelos artefatos, sem execução do guia.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | “Host + Customer-App + Orders-App” / “microfrontend setup using Angular 20 and @angular-architects/native-federation” | estrutura | corroborada | 3.4.3 (Unidades: customer-app, host-app e orders-app = Yes); 3.4.2 (@angular-architects/native-federation configurada = Yes); package.json:23-29,36; 3.4.5 #1-#2 |
| 2 | README.md:22 | “host-app → main shell” | estrutura | corroborada | 3.4.5 #1-#2; projects/host-app/src/app/app.html:1-3; projects/host-app/src/app/app.routes.ts:4-20 |
| 3 | README.md:23 | “customer-app → remote” | estrutura | corroborada | 3.4.5 #1; projects/customer-app/federation.config.js:5-10; projects/host-app/src/app/app.routes.ts:6-11 |
| 4 | README.md:24 | “orders-app → remote” | estrutura | corroborada | 3.4.5 #2; projects/orders-app/federation.config.js:5-10; projects/host-app/src/app/app.routes.ts:14-19 |
| 5 | README.md:213-251 | “Folder Structure: MF-WORKSPACE” / “projects” / “customer-app” / “host-app” / “orders-app” / “public” / “dist” / “node_modules” | estrutura | parcial | 3.4.3 (Workspace e Unidades); angular.json:13-14,126-127,239-240; angular.json:68,181,294; .gitignore:4,10,32 |
| 6 | README.md:259 | “Federated routing” | composição | corroborada | 3.4.5 #1-#2; projects/host-app/src/app/app.routes.ts:2-19; projects/customer-app/src/app/customer/customer-routes.module.ts:5-12; projects/orders-app/src/app/orders/orders-routes.module.ts:5-12 |

## Observações

**1. README.md:3.** A frase apresenta o conjunto de três aplicações e a tecnologia. O workspace registra os três projetos (angular.json:6,119,232), o manifesto declara Angular 20 e `@angular-architects/native-federation` (package.json:23-29,36), e a revisão de composição confirma os dois vínculos host → remote (3.4.5 #1-#2). A frase reaparece em angular_20_microfrontend_app_guide.md:3; os títulos de README.md:1,255 e angular_20_microfrontend_app_guide.md:1,214 repetem o mesmo enquadramento. A corroboração é da configuração e das relações no snapshot; a palavra “working” do título de encerramento não representa um teste executado nesta revisão.

**2. README.md:22.** O host é o shell que oferece os links de navegação e o outlet (projects/host-app/src/app/app.html:1-3), com as duas rotas remotas registradas (projects/host-app/src/app/app.routes.ts:4-20). O mesmo papel é repetido em angular_20_microfrontend_app_guide.md:22 e nas listas finais “A host container app” (README.md:257; angular_20_microfrontend_app_guide.md:216). O cabeçalho “Host” da inicialização (README.md:36; angular_20_microfrontend_app_guide.md:36) não acrescenta propriedade.

**3. README.md:23.** Customer-app expõe `./CustomerRoutes` (projects/customer-app/federation.config.js:5-10), carregado pelo host na rota `customers` (projects/host-app/src/app/app.routes.ts:6-11). Essa é a relação de 3.4.5 #1. O papel se repete em angular_20_microfrontend_app_guide.md:23, nos títulos “Customer Remote” e “Configure customer-app (Remote)” dos dois documentos (:40 e :52), e na contagem “Two remote microfrontends” (README.md:258; angular_20_microfrontend_app_guide.md:217), consolidada aqui e em #4.

**4. README.md:24.** Orders-app expõe `./OrdersRoutes` (projects/orders-app/federation.config.js:5-10), consumido pela rota `orders` (projects/host-app/src/app/app.routes.ts:14-19), como em 3.4.5 #2. A frase reaparece em angular_20_microfrontend_app_guide.md:24; o cabeçalho “Orders Remote” (:44 dos dois documentos) e a contagem final de dois remotos repetem o papel sem nova afirmação.

**5. README.md:213-251.** A árvore representa as três aplicações dentro de `projects/`, com configurações de federação e tsconfigs próprios e arquivos de workspace na raiz. Essa parte corresponde à revisão estrutural e aos diretórios configurados (angular.json:13-14,126-127,239-240). A árvore inclui também `public` em cada projeto, `.angular`, `dist` e `node_modules`; esses diretórios não têm arquivos no inventário do snapshot. Os caminhos de `public` estão configurados como entradas de assets (angular.json:68,181,294), mas isso não demonstra seu conteúdo. `.gitignore:4,10,32` exclui saídas, dependências e cache. Assim, o desenho documenta uma árvore de trabalho mais ampla que os arquivos adquiridos: a parte presente é confirmada, o restante não tem artefato, resultando em `parcial`.

**6. README.md:259.** O roteamento federado tem implementação: `loadChildren` chama `loadRemoteModule` para cada URL de `remoteEntry.json` e seleciona o módulo exposto (projects/host-app/src/app/app.routes.ts:2-19). Os módulos remotos registram suas páginas com `RouterModule.forChild` (projects/customer-app/src/app/customer/customer-routes.module.ts:5-12; projects/orders-app/src/app/orders/orders-routes.module.ts:5-12). A afirmação reaparece em angular_20_microfrontend_app_guide.md:218. Os exemplos de rotas dos dois documentos (:159-183) e as instruções de testar `/customers` e `/orders` (:197-209) ilustram a mesma ligação, sem virar novas linhas de tabela.

## Resumo

Afirmações: 6 (corroborada: 5, parcial: 1, contradita: 0, sem corroboração: 0). Temas: (estrutura: 5, composição: 1).

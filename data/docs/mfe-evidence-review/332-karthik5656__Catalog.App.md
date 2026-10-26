---
schema: 1
id: 1350705751
full_name: karthik5656/Catalog.App
commit: 1982e0f3dae5a8508d354f9db91a089ba96d4bd6
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

# 332 — karthik5656/Catalog.App

## Leitura do repositório

O snapshot mostra três unidades React com entrada e build Vite próprios: o shell ui-catalog, o consumer e o merchant (#12–#14). As dependências de federação (#1–#3) levam às configurações dos remotos (#4, #5) e do host (#6, #7). O registro alimenta o gerador de importações lazy (#8), e as rotas do shell montam os componentes remotos (#9, #10). Essa cadeia sustenta duas relações host → remote, ambas ativas e com destino no snapshot (#15, #16), conforme as revisões finais. O arquivo gerado não está versionado, mas o gerador e sua entrada estão presentes; isso não introduz dúvida residual sobre a cadeia registrada.

Os dois remotos declaram name consumerApp, embora o shell use merchantApp para a porta 3001. A 3.4.5 resolveu os destinos pela correspondência de nome/arquivo junto com a porta, por decisão do pesquisador (#15, #16). A divergência de nome continua descrita em #5 e #25; seu efeito em execução não foi verificado. A raiz src/frontend não é unidade nem workspace (#11), e a afirmação documental de workspace é contradita (#21).

Cada aplicação tem build e imagem publicados separadamente (#17–#19), sem versionamento independente. Essa separação não demonstra execução conjunta: o shell embute URLs localhost nas portas de desenvolvimento, as imagens servem na porta 80 e o base do shell difere da raiz servida pelo nginx. O snapshot não fornece Compose ou proxy que componha essas imagens. A promessa de execução conjunta por Compose fica sem corroboração (#39).

As afirmações documentais são evidências fracas. Agents.md confirma boa parte da organização presente (#20, #22, #23, #26, #27), mas também anuncia autenticação ausente, nome divergente e singletons não demonstrados (#24, #25, #28). Os planos descrevem quatro MFEs React 18 e diretórios diferentes, enquanto o snapshot tem três apps React 19 (#29, #36). Event bus, guards e funcionalidades de backend anunciadas não estão implementados (#31–#34, #37, #41). As relações com APIs são contexto, sem constituir composição entre frontends. O widget Assistant não tem implementação sobre a qual avaliar isolamento ou execução standalone (#35, #38).

O histórico explica a anterioridade dos planos, a ausência de workspace/Compose removidos e a coexistência da menção Next.js com Vite (#43, #47, #56, #59). Os demais pontos inconclusivos limitam o que se pode afirmar do passado ou da intenção; não tornam ambígua a organização do snapshot (#44–#46, #48–#55, #57, #58). A ausência de blobs históricos já registrada na 3.4.8 impede concluir abandono ou implementação anterior dessas funções.

## Observações

### 1. src/frontend/apps/ui-catalog-consumer/package.json:13

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em dependencies, versão `^1.4.1`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; a 3.4.2 registra Configurada Yes e a configuração tem observação própria.

### 2. src/frontend/apps/ui-catalog-merchant/package.json:13

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em dependencies, versão `^1.4.1`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; a 3.4.2 registra Configurada Yes e a configuração tem observação própria.

### 3. src/frontend/apps/ui-catalog/package.json:13

**Observação:** O manifesto declara `@originjs/vite-plugin-federation` em dependencies, versão `^1.4.1`.

**Interpretação:** A declaração é um sinal tecnológico isolado de Module Federation; a 3.4.2 registra Configurada Yes e a configuração tem observação própria.

### 4. src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53

**Observação:** A configuração Vite invoca `federation` com `name: "consumerApp"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App" }` e `shared: ["react", "react-dom", "react-router-dom"]`.

**Interpretação:** Configura o mecanismo de exposição e compartilhamento nesta unidade, sem nomear um consumidor. O nome é o mesmo também declarado pelo merchant.

### 5. src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53

**Observação:** A configuração Vite invoca `federation` com `name: "consumerApp"`, `filename: "remoteEntry.js"`, `exposes: { "./App": "./src/App" }` e `shared: ["react", "react-dom", "react-router-dom"]`.

**Interpretação:** Configura o mecanismo de exposição e compartilhamento nesta unidade, sem nomear um consumidor. O nome declarado pelo merchant difere do scope merchantApp usado pelo shell.

### 6. src/frontend/apps/ui-catalog/vite.config.ts:10-17; src/frontend/apps/ui-catalog/vite.config.ts:74-110; src/frontend/apps/ui-catalog/remotes.json:2-15

**Observação:** A configuração do shell constrói o mapa `federationRemotes` com scope e URL de cada entrada de remotes.json e o passa a `federation({ name: "app", remotes: federationRemotes, shared: [...] })`. As entradas nomeiam merchantApp e consumerApp.

**Interpretação:** A configuração do host liga explicitamente outras unidades pelo mecanismo de federação. O bloco da unidade inclui o plugin que gera as importações; sua construção é descrita em #8.

### 7. src/frontend/apps/ui-catalog/remotes.json:1-16

**Observação:** O registro do shell declara merchantApp em `http://localhost:3001/assets/remoteEntry.js`, módulo `./App`, rota merchant, e consumerApp em `http://localhost:3002/assets/remoteEntry.js`, módulo `./App`, rota consumer.

**Interpretação:** O registro nomeia dois destinos de composição do host e parametriza tanto a resolução dos módulos quanto as rotas. É um único bloco de configuração da unidade shell.

### 8. src/frontend/apps/ui-catalog/vite.config.ts:26-59; src/frontend/apps/ui-catalog/vite.config.ts:84; src/frontend/apps/ui-catalog/remotes.json:2-15; src/frontend/apps/ui-catalog/.gitignore:15-16; src/frontend/apps/ui-catalog/src/App.tsx:3

**Observação:** O plugin remoteAppsPlugin gera, para cada entrada, `React.lazy(() => import("${app.scope}/${modulePath}"))` em src/remoteApps.generated.tsx. O buildStart chama generate; o plugin está registrado e App importa remoteApps. O arquivo gerado é ignorado pelo Git.

**Interpretação:** Implementa a carga dinâmica dos módulos remotos definidos pelo registro. O template recebe o destino por parâmetro; o snapshot contém o gerador e a entrada, sem o arquivo gerado.

### 9. src/frontend/apps/ui-catalog/remotes.json:2-15; src/frontend/apps/ui-catalog/vite.config.ts:10-17; src/frontend/apps/ui-catalog/vite.config.ts:85-89

**Observação:** A construção host-relationship registra merchantApp e consumerApp, respectivas URLs, módulo ./App e rotas; a configuração do shell lê esse registro para montar remotes e gerar as entradas de rota.

**Interpretação:** A linha da 3.4.4 nomeia os destinos de composição. Seu artefato é também a configuração de #7: esta observação preserva a linha de código-fonte da revisão, sem acrescentar construção.

### 10. src/frontend/apps/ui-catalog/src/App.tsx:3-28; src/frontend/apps/ui-catalog/remotes.json:2-15; src/frontend/apps/ui-catalog/src/main.tsx:7-10; src/frontend/apps/ui-catalog/index.html:11; src/frontend/apps/ui-catalog/src/components/ShellLayout.tsx:27-31

**Observação:** App percorre remoteApps e monta `<Component />` em Suspense na rota `${route}/*`, sob ShellLayout. O registro fornece merchant e consumer, e o menu usa as mesmas entradas.

**Interpretação:** As rotas ligam os caminhos merchant/* e consumer/* aos componentes remotos. A construção de runtime-composition é Yes na 3.4.4.

### 11. src/frontend; src/frontend/package.json:1-21

**Observação:** O diretório src/frontend tem manifesto com script test de placeholder e packageManager, sem entrada nem build próprios.

**Interpretação:** É raiz de coordenação, marcada Unidade frontend No. Não demonstra uma quarta aplicação nem declaração de workspace.

### 12. src/frontend/apps/ui-catalog; src/frontend/apps/ui-catalog/package.json:1-33; src/frontend/apps/ui-catalog/index.html:11; src/frontend/apps/ui-catalog/src/main.tsx:7; src/frontend/apps/ui-catalog/vite.config.ts:74-110

**Observação:** O diretório contém manifesto próprio, entrada HTML que aponta para src/main.tsx, montagem React com createRoot e build Vite próprio.

**Interpretação:** Confirma o limite de uma unidade frontend (shell), com Unidade frontend Yes na 3.4.3; o limite sozinho não estabelece a composição completa.

### 13. src/frontend/apps/ui-catalog-consumer; src/frontend/apps/ui-catalog-consumer/package.json:1-33; src/frontend/apps/ui-catalog-consumer/index.html:11; src/frontend/apps/ui-catalog-consumer/src/main.tsx:7; src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53

**Observação:** O diretório contém manifesto próprio, entrada HTML que aponta para src/main.tsx, montagem React com createRoot e build Vite próprio.

**Interpretação:** Confirma o limite de uma unidade frontend (remoto consumer), com Unidade frontend Yes na 3.4.3; o limite sozinho não estabelece a composição completa.

### 14. src/frontend/apps/ui-catalog-merchant; src/frontend/apps/ui-catalog-merchant/package.json:1-33; src/frontend/apps/ui-catalog-merchant/index.html:11; src/frontend/apps/ui-catalog-merchant/src/main.tsx:7; src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53

**Observação:** O diretório contém manifesto próprio, entrada HTML que aponta para src/main.tsx, montagem React com createRoot e build Vite próprio.

**Interpretação:** Confirma o limite de uma unidade frontend (remoto merchant), com Unidade frontend Yes na 3.4.3; o limite sozinho não estabelece a composição completa.

### 15. src/frontend/apps/ui-catalog/remotes.json:9-15; src/frontend/apps/ui-catalog/vite.config.ts:14-17; src/frontend/apps/ui-catalog/vite.config.ts:37; src/frontend/apps/ui-catalog/vite.config.ts:85-89; src/frontend/apps/ui-catalog/src/App.tsx:14-28; src/frontend/apps/ui-catalog-consumer/vite.config.ts:9; src/frontend/apps/ui-catalog-consumer/vite.config.ts:16-23; src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23

**Observação:** O shell declara consumerApp na URL da porta 3002, módulo ./App e rota consumer. A configuração gera o import federado e App o monta na rota. O destino expõe ./App em remoteEntry.js e declara name consumerApp.

**Interpretação:** Relação host → remote, No snapshot Yes e Ativa Yes na 3.4.5. A correspondência do destino usa o nome/arquivo declarado junto com a porta, conforme decisão registrada do pesquisador; o nome sozinho é compartilhado pelos dois remotos.

### 16. src/frontend/apps/ui-catalog/remotes.json:2-8; src/frontend/apps/ui-catalog/vite.config.ts:14-17; src/frontend/apps/ui-catalog/vite.config.ts:37; src/frontend/apps/ui-catalog/vite.config.ts:85-89; src/frontend/apps/ui-catalog/src/App.tsx:14-28; src/frontend/apps/ui-catalog-merchant/vite.config.ts:9; src/frontend/apps/ui-catalog-merchant/vite.config.ts:16-23

**Observação:** O shell declara merchantApp na URL da porta 3001, módulo ./App e rota merchant. A configuração gera o import federado e App o monta na rota. O destino expõe ./App em remoteEntry.js e declara name consumerApp.

**Interpretação:** Relação host → remote, No snapshot Yes e Ativa Yes na 3.4.5. A correspondência do destino usa o nome/arquivo declarado junto com a porta, conforme decisão registrada do pesquisador; o scope merchantApp difere do name consumerApp, sem alterar o julgamento final da relação. O efeito em execução não foi verificado.

### 17. src/frontend/apps/ui-catalog/package.json:8; src/frontend/apps/ui-catalog/vite.config.ts:74-110; src/frontend/apps/ui-catalog/Dockerfile:1-23; .github/workflows/ci-pipeline.yml:238-247; src/frontend/apps/ui-catalog/remotes.json:4-11

**Observação:** A aplicação tem script e configuração Vite próprios. Seu Dockerfile instala dependências e executa pnpm run build; a imagem nginx copia somente seu dist e serve na porta 80. Um passo condicionado do CI constrói e publica a imagem própria no GHCR.

**Interpretação:** Build separado e Deploy separado, Versionamento No, conforme 3.4.6. A publicação individual confirma o limite da aplicação; não demonstra a execução conjunta. O shell fixa base /ui-catalog/ e URLs localhost:3001/3002 no build, enquanto nginx serve na raiz; não há proxy que componha as imagens.

### 18. src/frontend/apps/ui-catalog-consumer/package.json:8; src/frontend/apps/ui-catalog-consumer/vite.config.ts:7-53; src/frontend/apps/ui-catalog-consumer/Dockerfile:1-23; .github/workflows/ci-pipeline.yml:250-259; src/frontend/apps/ui-catalog/remotes.json:4-11

**Observação:** A aplicação tem script e configuração Vite próprios. Seu Dockerfile instala dependências e executa pnpm run build; a imagem nginx copia somente seu dist e serve na porta 80. Um passo condicionado do CI constrói e publica a imagem própria no GHCR.

**Interpretação:** Build separado e Deploy separado, Versionamento No, conforme 3.4.6. A publicação individual confirma o limite da aplicação; não demonstra a execução conjunta. A URL de consumo no shell usa a porta Vite 3002, diferente da porta 80 da imagem, sem configuração de orquestração no snapshot.

### 19. src/frontend/apps/ui-catalog-merchant/package.json:8; src/frontend/apps/ui-catalog-merchant/vite.config.ts:7-53; src/frontend/apps/ui-catalog-merchant/Dockerfile:1-23; .github/workflows/ci-pipeline.yml:262-271; src/frontend/apps/ui-catalog/remotes.json:4-11

**Observação:** A aplicação tem script e configuração Vite próprios. Seu Dockerfile instala dependências e executa pnpm run build; a imagem nginx copia somente seu dist e serve na porta 80. Um passo condicionado do CI constrói e publica a imagem própria no GHCR.

**Interpretação:** Build separado e Deploy separado, Versionamento No, conforme 3.4.6. A publicação individual confirma o limite da aplicação; não demonstra a execução conjunta. A URL de consumo no shell usa a porta Vite 3001, diferente da porta 80 da imagem, sem configuração de orquestração no snapshot.

### 20. Agents.md:15

**Observação:** O documento afirma: "React 19 Micro Frontends (MFEs) using Vite and Module Federation.".

**Interpretação:** A afirmação situa o conjunto de MFEs React 19 com Vite e Module Federation e é corroborada pelas unidades e relações do snapshot.

### 21. Agents.md:90-91

**Observação:** O documento afirma: "React 19 Micro Frontends Workspace" / "Root frontend workspace config (pnpm)".

**Interpretação:** A afirmação é contradita: src/frontend não declara workspace; o gerenciador pnpm não estabelece um workspace.

### 22. Agents.md:93-95

**Observação:** O documento afirma: "ui-catalog/ # Host Shell MFE" / "ui-catalog-merchant/ # Merchant / Vendor Catalog MFE" / "ui-catalog-consumer/ # Customer / Shopper Catalog MFE".

**Interpretação:** A afirmação é corroborada: os três diretórios correspondem às unidades e aos papéis host/remotes.

### 23. Agents.md:151

**Observação:** O documento afirma: "Global layout, top navigation, […] dynamic remote MFE router".

**Interpretação:** A afirmação é corroborada pelo layout e pelas rotas que montam os dois remotos.

### 24. Agents.md:151

**Observação:** O documento afirma: "Auth provider context".

**Interpretação:** A afirmação de comunicação por contexto de autenticação é contradita: o shell só monta BrowserRouter, App, rotas e Suspense.

### 25. Agents.md:152

**Observação:** O documento afirma: "Remote (`merchantApp`)".

**Interpretação:** O nome atribuído ao merchant é contradito pelo name consumerApp de sua configuração, embora a relação do shell esteja resolvida pela porta.

### 26. Agents.md:153

**Observação:** O documento afirma: "Remote (`consumerApp`)".

**Interpretação:** O nome do consumer é corroborado pelo name da unidade e pelo scope no shell.

### 27. Agents.md:158-159

**Observação:** O documento afirma: "Remote App Configuration: Defined in remotes.json and resolved dynamically in `remoteApps.generated.tsx`.".

**Interpretação:** A afirmação é corroborada pelo gerador ativo e pela leitura do registro; os endereços são fixados no build, não resolvidos por descoberta em produção.

### 28. Agents.md:160

**Observação:** O documento afirma: "Shell and remotes share singletons for `react`, `react-dom`, and `react-router-dom`.".

**Interpretação:** A afirmação tem corroboração parcial: shared lista as três bibliotecas, mas não declara singleton nem demonstra instância única em runtime.

### 29. documents/component_boundaries.md:16

**Observação:** O documento afirma: "React 18 Micro Frontends (Shell, Catalog, Copilot, Assistant)".

**Interpretação:** O desenho de quatro MFEs React 18 é contradito pelo conjunto de três unidades React 19 do snapshot.

### 30. documents/component_boundaries.md:35

**Observação:** O documento afirma: "Route: /vendor/products" / "Route: /vendor/copilot/:id" (rotas em que o shell monta os MFEs).

**Interpretação:** As rotas anunciadas são contraditas: o shell monta merchant/* e consumer/*, sob /ui-catalog.

### 31. documents/component_boundaries.md:46

**Observação:** O documento afirma: "Exposes a React Context/Event Bus for cross-MFE communication (e.g., `onAuthTokenChange`, `onToastMessage`).".

**Interpretação:** A afirmação de comunicação entre MFEs é contradita: o shell não expõe contexto ou event bus no snapshot.

### 32. documents/component_boundaries.md:51

**Observação:** O documento afirma: "**APIs Consumed**: `CatalogService` via Gateway (`GET/POST/PUT /api/catalog/products`)".

**Interpretação:** A relação com sistema de backend é contexto e é contradita: a página de produtos é estática e o gateway só tem o template WeatherForecast.

### 33. documents/component_boundaries.md:59-61

**Observação:** O documento afirma: "**APIs Consumed**: […] `CatalogService` (`GET /api/catalog/products/:id/enrichment`) […] (`POST /api/catalog/products/:id/approve-enrichment`)" (Copilot MFE).

**Interpretação:** A relação com backend é contexto e é contradita: não há unidade Copilot nem os endpoints de enriquecimento e aprovação anunciados.

### 34. documents/component_boundaries.md:69

**Observação:** O documento afirma: "**APIs Consumed**: `CatalogAssistantService` (`POST /api/assistant/ask` - Server-Sent Events / streaming HTTP)." (Catalog Assistant MFE).

**Interpretação:** A relação com backend é contexto e é contradita: não há unidade Assistant, streaming ou endpoint anunciado; o consumer é placeholder.

### 35. documents/component_boundaries.md:71

**Observação:** O documento afirma: "Isolated, lightweight widget with zero dependency on Vendor MFEs.".

**Interpretação:** A independência de uma unidade Assistant fica sem corroboração: não há widget correspondente sobre o qual avaliar isolamento.

### 36. documents/component_plans/06_shell_mfe.md:10

**Observação:** O documento afirma: "Catalog.AI.App/src/frontend/shell/" (os MFEs ficam em `src/frontend/shell/`, `catalog-mfe/`, `copilot-mfe/` e `catalog-assistant-mfe/`).

**Interpretação:** Os limites documentados são contraditos pelos três diretórios reais em src/frontend/apps/, sem unidades Copilot ou Assistant.

### 37. documents/component_plans/06_shell_mfe.md:18

**Observação:** O documento afirma: "ProtectedRoute.tsx # Auth & Role-based route guard".

**Interpretação:** A afirmação é contradita: as rotas atuais montam remotos com Suspense, sem guard de autenticação ou papel.

### 38. documents/component_plans/09_catalog_assistant_mfe.md:55

**Observação:** O documento afirma: "Standalone widget testing on port `3003`.".

**Interpretação:** A execução standalone do Assistant fica sem corroboração: um script Vite do consumer não demonstra execução de um widget ausente.

### 39. documents/implementation_plan.md:10

**Observação:** O documento afirma: "The entire architecture is designed to run locally using Docker Compose".

**Interpretação:** A execução conjunta por Compose fica sem corroboração: as imagens individuais não demonstram essa orquestração e a ausência do arquivo não prova inviabilidade.

### 40. documents/implementation_plan.md:57

**Observação:** O documento afirma: "React 18 + TypeScript + Vite + Module Federation / Single-SPA.".

**Interpretação:** A afirmação tecnológica é contradita conforme a 3.4.7: Module Federation se confirma, mas Single-SPA não está declarado; a frase não é dividida.

### 41. documents/sequence_diagrams.md:48

**Observação:** O documento afirma: "CatSvc-->>CopilotMFE: Push update via SignalR / Polling" (o serviço de catálogo avisa o MFE por SignalR ou polling).

**Interpretação:** A relação de atualização entre backend e Copilot é contexto e é contradita: não há SignalR/polling nem implementação correspondente.

### 42. documents/typed_api_client_generation_plan.md:65

**Observação:** O documento afirma: "TypeScript clients for the Next.js frontend".

**Interpretação:** A referência tecnológica a Next.js é contradita pelos manifestos e builds Vite dos três apps.

### 43. 284d0ce 2026-08-31 (src/frontend/package.json, Agents.md); 1982e0f 2026-09-01 (src/frontend/package.json, Agents.md)

**Observação:** O manifesto src/frontend/package.json entra em 284d0ce e não muda depois; Agents.md entra em 1982e0f. A listagem não registra declaração de workspace criada ou removida.

**Interpretação:** Esclarecido: os caminhos versionados não mostram workspace anterior removido. Isso explica a divergência documental, sem provar intenção.

### 44. 76edc2f 2026-08-29 (documents/component_plans/06_shell_mfe.md, Agents.md); 1982e0f 2026-09-01 (documents/component_plans/06_shell_mfe.md, Agents.md)

**Observação:** O plano do shell lido em 76edc2f já descreve AuthProvider e AuthContext.tsx; Agents.md repete a função em 1982e0f. Fontes históricas não foram recuperadas integralmente.

**Interpretação:** Inconclusivo quanto ao passado: não distingue contexto só planejado de implementação posteriormente substituída. A ausência atual permanece definida.

### 45. 22d7583 2026-08-31 (src/frontend/apps/ui-catalog-merchant/vite.config.ts, Agents.md); ab5770d 2026-09-01 (src/frontend/apps/ui-catalog-merchant/vite.config.ts, Agents.md); 1982e0f 2026-09-01 (src/frontend/apps/ui-catalog-merchant/vite.config.ts, Agents.md)

**Observação:** A configuração TS do merchant é criada em 22d7583 e alterada em ab5770d. A leitura da primeira versão falha por objeto ausente; 1982e0f só adiciona Agents.md.

**Interpretação:** Inconclusivo quanto à origem do nome: não permite decidir entre consumerApp desde a criação e renomeação posterior. Não reabre os destinos Yes da 3.4.5.

### 46. 22d7583 2026-08-31 (src/frontend/apps/ui-catalog/vite.config.ts, src/frontend/apps/ui-catalog-merchant/vite.config.ts, src/frontend/apps/ui-catalog-consumer/vite.config.ts, Agents.md); ab5770d 2026-09-01 (src/frontend/apps/ui-catalog/vite.config.ts, src/frontend/apps/ui-catalog-merchant/vite.config.ts, src/frontend/apps/ui-catalog-consumer/vite.config.ts, Agents.md); 1982e0f 2026-09-01 (src/frontend/apps/ui-catalog/vite.config.ts, src/frontend/apps/ui-catalog-merchant/vite.config.ts, src/frontend/apps/ui-catalog-consumer/vite.config.ts, Agents.md)

**Observação:** A configuração TS do shell não muda depois de 22d7583; a do merchant muda em ab5770d, quando entra o consumer. A configuração antiga do merchant não pôde ser lida.

**Interpretação:** Inconclusivo quanto ao passado: não prova configuração antiga de singleton ou sua intenção. No snapshot só a lista shared está demonstrada.

### 47. f843c7d 2026-08-29 (documents/component_boundaries.md, documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog/package.json, src/frontend/apps/ui-catalog-consumer/vite.config.ts); 76edc2f 2026-08-29 (documents/component_boundaries.md, documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog/package.json, src/frontend/apps/ui-catalog-consumer/vite.config.ts); 284d0ce 2026-08-31 (documents/component_boundaries.md, documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog/package.json, src/frontend/apps/ui-catalog-consumer/vite.config.ts); ab5770d 2026-09-01 (documents/component_boundaries.md, documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog/package.json, src/frontend/apps/ui-catalog-consumer/vite.config.ts)

**Observação:** Os planos estão no primeiro commit, f843c7d. O plano lido em 76edc2f já descreve shell/ e React 18. O código entra em apps/ui-catalog e apps/ui-catalog-merchant em 284d0ce; consumer entra em ab5770d. A listagem não cria nem remove apps Copilot/Assistant.

**Interpretação:** Esclarecido: o plano precede os diretórios implementados, sem extração observável de quatro apps para três. Não comprova migração de React 18 para 19.

### 48. 76edc2f 2026-08-29 (documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog-merchant/src/App.jsx, src/frontend/apps/ui-catalog/remotes.json); 284d0ce 2026-08-31 (documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog-merchant/src/App.jsx, src/frontend/apps/ui-catalog/remotes.json); ab5770d 2026-09-01 (documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog-merchant/src/App.jsx, src/frontend/apps/ui-catalog/remotes.json)

**Observação:** O plano de 76edc2f contém /vendor/products/*; o App.jsx inicial do merchant em 284d0ce já tem products e orders. remotes.json muda em ab5770d, mas a configuração JS antiga do shell não pôde ser lida.

**Interpretação:** Inconclusivo quanto às rotas passadas do host: não demonstra remoção de rotas vendor. As rotas merchant e consumer do snapshot estão definidas.

### 49. f843c7d 2026-08-29 (documents/component_boundaries.md); 76edc2f 2026-08-29 (documents/component_boundaries.md)

**Observação:** component_boundaries.md entra em f843c7d e muda em 76edc2f. A primeira versão não pôde ser lida e a listagem não registra arquivo explicitamente nomeado como event bus.

**Interpretação:** Inconclusivo quanto a abandono ou conexão passada de um event bus embutido nas fontes substituídas; a ausência atual permanece definida.

### 50. 284d0ce 2026-08-31 (src/frontend/apps/ui-catalog-merchant/src/App.jsx, src/frontend/apps/ui-catalog-merchant/src/App.tsx); 22d7583 2026-08-31 (src/frontend/apps/ui-catalog-merchant/src/App.jsx, src/frontend/apps/ui-catalog-merchant/src/App.tsx)

**Observação:** O App.jsx do merchant em 284d0ce monta três páginas sem chamadas a serviço nesse arquivo. Em 22d7583 JSX é removido e TSX adicionado; o conteúdo histórico das páginas não foi examinado integralmente.

**Interpretação:** Inconclusivo quanto a chamadas HTTP passadas nas páginas; a relação de API ausente no snapshot não muda.

### 51. f843c7d 2026-08-29 (documents/component_boundaries.md, src/frontend/apps/ui-catalog-merchant/src/App.jsx); 284d0ce 2026-08-31 (documents/component_boundaries.md, src/frontend/apps/ui-catalog-merchant/src/App.jsx)

**Observação:** Os planos estão em f843c7d, e a listagem não cria nem remove aplicação Copilot. O App.jsx inicial do merchant monta três páginas sem rota Copilot explícita.

**Interpretação:** Inconclusivo quanto a enriquecimento passado dentro de páginas; a ausência de unidade Copilot e endpoints no snapshot não muda.

### 52. f843c7d 2026-08-29 (documents/component_boundaries.md, src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx); ab5770d 2026-09-01 (documents/component_boundaries.md, src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx)

**Observação:** O consumer entra em ab5770d e permanece sem alterações até o snapshot, com placeholder. O conteúdo histórico completo dos outros frontends não foi recuperado.

**Interpretação:** Inconclusivo quanto a streaming passado em outros frontends; o consumer atual não decorre de uma remoção posterior dentro dessa unidade.

### 53. f843c7d 2026-08-29 (documents/component_boundaries.md, src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx); ab5770d 2026-09-01 (documents/component_boundaries.md, src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx)

**Observação:** A listagem não cria nem remove aplicação Assistant; o consumer entra em ab5770d e permanece sem o widget.

**Interpretação:** Inconclusivo quanto à independência histórica de um widget não recuperado. A ausência da unidade no snapshot permanece definida.

### 54. 76edc2f 2026-08-29 (documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog/src/App.tsx); 22d7583 2026-08-31 (documents/component_plans/06_shell_mfe.md, src/frontend/apps/ui-catalog/src/App.tsx)

**Observação:** ProtectedRoute.tsx já é anunciado no plano lido de 76edc2f. A listagem não adiciona nem remove arquivo desse nome; fontes anteriores do shell não foram integralmente lidas.

**Interpretação:** Inconclusivo quanto a guards embutidos nas fontes antigas. O histórico não comprova abandono e não altera as rotas atuais sem guards.

### 55. f843c7d 2026-08-29 (documents/component_plans/09_catalog_assistant_mfe.md, src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx); ab5770d 2026-09-01 (documents/component_plans/09_catalog_assistant_mfe.md, src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx)

**Observação:** Não há aplicação Assistant na listagem histórica. O consumer surge em ab5770d e permanece como no snapshot, sem widget recuperado para avaliar execução isolada.

**Interpretação:** Inconclusivo quanto à execução standalone histórica do widget ausente; é uma pergunta distinta da independência em relação aos MFEs vendor.

### 56. f843c7d 2026-08-29 (documents/implementation_plan.md, docker/init-scripts/01-init-databases.sql, src/frontend/apps/ui-catalog/Dockerfile); 804ea7a 2026-08-30 (documents/implementation_plan.md, docker/init-scripts/01-init-databases.sql, src/frontend/apps/ui-catalog/Dockerfile); ab5770d 2026-09-01 (documents/implementation_plan.md, docker/init-scripts/01-init-databases.sql, src/frontend/apps/ui-catalog/Dockerfile)

**Observação:** A listagem completa com --no-renames não registra arquivo Compose nos dez commits. docker/ recebe apenas SQL em 804ea7a; os Dockerfiles entram em ab5770d.

**Interpretação:** Esclarecido: não há Compose removido no histórico versionado consultado. Não demonstra ausência de execução externa nem intenção futura.

### 57. f843c7d 2026-08-29 (documents/implementation_plan.md, src/frontend/apps/ui-catalog/package.json); 804ea7a 2026-08-30 (documents/implementation_plan.md, src/frontend/apps/ui-catalog/package.json); ab5770d 2026-09-01 (documents/implementation_plan.md, src/frontend/apps/ui-catalog/package.json)

**Observação:** O plano de implementação existe desde f843c7d e muda em 76edc2f e 804ea7a, antes dos manifestos frontend posteriores. O package.json inicial do shell não pôde ser lido.

**Interpretação:** Inconclusivo quanto a Single-SPA como alternativa planejada ou configuração anterior. O snapshot só demonstra Module Federation.

### 58. f843c7d 2026-08-29 (documents/sequence_diagrams.md, src/frontend/apps/ui-catalog-merchant/src/App.jsx); 284d0ce 2026-08-31 (documents/sequence_diagrams.md, src/frontend/apps/ui-catalog-merchant/src/App.jsx)

**Observação:** sequence_diagrams.md entra em f843c7d e não muda. O App.jsx inicial do merchant não mostra SignalR/polling, mas não permite examinar as páginas históricas.

**Interpretação:** Inconclusivo quanto a uso ou abandono histórico de SignalR/polling. A anterioridade do diagrama não demonstra implementação e não altera a ausência atual.

### 59. ab5770d 2026-09-01 (documents/typed_api_client_generation_plan.md, src/frontend/apps/ui-catalog-consumer/vite.config.ts)

**Observação:** O plano de clientes Next.js entra em ab5770d junto com o consumer Vite; as outras duas configurações Vite já existiam. Depois, 1982e0f só adiciona Agents.md.

**Interpretação:** Esclarecido: a referência a Next.js já nasce junto do conjunto Vite, sem estágio Next.js anterior visível. A origem e a intenção do texto não são demonstradas.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (src/frontend/apps/ui-catalog-consumer/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #4 |
| 2 | 3.4.2 (src/frontend/apps/ui-catalog-merchant/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #5 |
| 3 | 3.4.2 (src/frontend/apps/ui-catalog/package.json:13) | 1 tecnologia | manifesto | module-federation | tecnológica | fraca | declara #6 |
| 4 | 3.4.2 (src/frontend/apps/ui-catalog-consumer/package.json:13, Evidência); 3.4.3 (src/frontend/apps/ui-catalog-consumer, Marcadores e Build); 3.4.4 (src/frontend/apps/ui-catalog/vite.config.ts:37, Observação); 3.4.5 #1 (Configuração); 3.4.6 #2 (Artefatos); 3.4.7 #7, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #13; configura #15 |
| 5 | 3.4.2 (src/frontend/apps/ui-catalog-merchant/package.json:13, Evidência); 3.4.3 (src/frontend/apps/ui-catalog-merchant, Marcadores e Build); 3.4.4 (src/frontend/apps/ui-catalog/vite.config.ts:37, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #3 (Artefatos); 3.4.7 #6, #9 (Evidência) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #14; configura #16 |
| 6 | 3.4.2 (src/frontend/apps/ui-catalog/package.json:13, Evidência); 3.4.3 (src/frontend/apps/ui-catalog, Marcadores e Build); 3.4.4 (src/frontend/apps/ui-catalog/vite.config.ts:37 e src/frontend/apps/ui-catalog/remotes.json:3, Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #1 (Artefatos); 3.4.7 #8, #9 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #8; configura #12; configura #15; configura #16 |
| 7 | 3.4.4 (src/frontend/apps/ui-catalog/remotes.json:3, Arquivo:linha e Observação); 3.4.5 #1, #2 (Configuração); 3.4.6 #2, #3 (Onde é servida); 3.4.7 #6, #7, #8, #11 (Evidência) | 2 configuração | configuração | module-federation | arquitetural | forte | configura #8; configura #9; configura #10; configura #15; configura #16 |
| 8 | 3.4.4 (src/frontend/apps/ui-catalog/vite.config.ts:37) | 3 código | configuração | module-federation | arquitetural | moderada | implementa #15; implementa #16 |
| 9 | 3.4.4 (src/frontend/apps/ui-catalog/remotes.json:3) | 3 código | configuração | module-federation | arquitetural | forte | implementa #15; implementa #16 |
| 10 | 3.4.4 (src/frontend/apps/ui-catalog/src/App.tsx:26) | 3 código | código-fonte | module-federation | arquitetural | forte | implementa #15; implementa #16 |
| 11 | 3.4.3 (src/frontend) | 4 estrutura | diretório | — | contexto | fraca | — |
| 12 | 3.4.3 (src/frontend/apps/ui-catalog) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 13 | 3.4.3 (src/frontend/apps/ui-catalog-consumer) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 14 | 3.4.3 (src/frontend/apps/ui-catalog-merchant) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 15 | 3.4.5 #1 | 5 composição | configuração | module-federation | arquitetural | forte | liga #12; liga #13 |
| 16 | 3.4.5 #2 | 5 composição | configuração | module-federation | arquitetural | forte | liga #12; liga #14 |
| 17 | 3.4.6 #1 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #12 |
| 18 | 3.4.6 #2 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #13 |
| 19 | 3.4.6 #3 | 6 build-deploy | deploy | — | arquitetural | moderada | publica #14 |
| 20 | 3.4.7 #1 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16 |
| 21 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #11 |
| 22 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16 |
| 23 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #10; corrobora #15; corrobora #16 |
| 24 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | contradiz src/frontend/apps/ui-catalog/src/main.tsx:7-13; contradiz src/frontend/apps/ui-catalog/src/App.tsx:9-34 |
| 25 | 3.4.7 #6 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #5 |
| 26 | 3.4.7 #7 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #4; corrobora #7; corrobora #15 |
| 27 | 3.4.7 #8 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora #6; corrobora #7; corrobora #8 |
| 28 | 3.4.7 #9 | 7 documentação | documentação | module-federation | arquitetural | fraca | corrobora em parte #4; corrobora em parte #5; corrobora em parte #6 |
| 29 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #12; contradiz #13; contradiz #14; contradiz src/frontend/apps/ui-catalog/package.json:16 |
| 30 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #7; contradiz #10 |
| 31 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | contradiz src/frontend/apps/ui-catalog/src/App.tsx:9-34; contradiz src/frontend/apps/ui-catalog/src/main.tsx:7-13 |
| 32 | 3.4.7 #13 | 7 documentação | documentação | — | contexto | fraca | contradiz src/frontend/apps/ui-catalog-merchant/src/pages/MerchantProducts.tsx:3-13; contradiz src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-15 |
| 33 | 3.4.7 #14 | 7 documentação | documentação | — | contexto | fraca | contradiz src/frontend/apps/ui-catalog-merchant/src/App.tsx:7-15; contradiz src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-15 |
| 34 | 3.4.7 #15 | 7 documentação | documentação | — | contexto | fraca | contradiz src/frontend/apps/ui-catalog-consumer/src/pages/HomePage.tsx:1-3; contradiz src/backend/Catalog.Gateway/Catalog.Gateway.API/Controllers/WeatherForecastController.cs:5-15 |
| 35 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 36 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #12; contradiz #13; contradiz #14 |
| 37 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #10 |
| 38 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 39 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 40 | 3.4.7 #21 | 7 documentação | documentação | module-federation, single-spa | tecnológica | fraca | contradiz #1; contradiz #2; contradiz #3; contradiz src/frontend/apps/ui-catalog/package.json:12-31 |
| 41 | 3.4.7 #22 | 7 documentação | documentação | — | contexto | fraca | contradiz src/frontend/apps/ui-catalog-merchant/src/App.tsx:7-15; contradiz src/backend/Catalog.App/Catalog.App.Api/Startup.cs:14-44 |
| 42 | 3.4.7 #23 | 7 documentação | documentação | — | tecnológica | fraca | contradiz src/frontend/apps/ui-catalog/package.json:12-31; contradiz src/frontend/apps/ui-catalog-consumer/package.json:12-31; contradiz src/frontend/apps/ui-catalog-merchant/package.json:12-31 |
| 43 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #21 |
| 44 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #24 |
| 45 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #25; explica #5; explica #16 |
| 46 | 3.4.8 #4 | 8 histórico | histórico | — | tecnológica | fraca | explica #28; explica #4; explica #5; explica #6 |
| 47 | 3.4.8 #5 | 8 histórico | histórico | — | arquitetural | fraca | explica #29; explica #36; explica #12; explica #13; explica #14 |
| 48 | 3.4.8 #6 | 8 histórico | histórico | — | arquitetural | fraca | explica #30; explica #7; explica #10 |
| 49 | 3.4.8 #7 | 8 histórico | histórico | — | arquitetural | fraca | explica #31 |
| 50 | 3.4.8 #8 | 8 histórico | histórico | — | contexto | fraca | explica #32 |
| 51 | 3.4.8 #9 | 8 histórico | histórico | — | contexto | fraca | explica #33 |
| 52 | 3.4.8 #10 | 8 histórico | histórico | — | contexto | fraca | explica #34 |
| 53 | 3.4.8 #11 | 8 histórico | histórico | — | arquitetural | fraca | explica #35 |
| 54 | 3.4.8 #12 | 8 histórico | histórico | — | arquitetural | fraca | explica #37 |
| 55 | 3.4.8 #13 | 8 histórico | histórico | — | arquitetural | fraca | explica #38 |
| 56 | 3.4.8 #14 | 8 histórico | histórico | — | arquitetural | fraca | explica #39; explica #17; explica #18; explica #19 |
| 57 | 3.4.8 #15 | 8 histórico | histórico | — | tecnológica | fraca | explica #40 |
| 58 | 3.4.8 #16 | 8 histórico | histórico | — | contexto | fraca | explica #41 |
| 59 | 3.4.8 #17 | 8 histórico | histórico | — | tecnológica | fraca | explica #42 |

## Resumo

Observações: 59. Dimensões (tecnologia: 3, configuração: 4, código: 3, estrutura: 4, composição: 2, build-deploy: 3, documentação: 23, histórico: 17). Força (forte: 6, moderada: 9, fraca: 44, ambígua: 0). Evidência (tecnológica: 10, arquitetural: 40, contexto: 9).

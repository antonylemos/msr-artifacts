---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
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

# 313 — Sara-hkm/creamati-micro-web

## Leitura do repositório

Foram lidos os onze documentos do inventário. Os seis textos próprios, em inglês, são README.md, DEPLOYMENT.md, STATUS.md, implementation-plan-mui-microservices.md, implementation-plan.md e micro-web-golden-sample.md. Os cinco `frontend/<app>/README.md` são o mesmo template integral do Create React App (cada um:1-46); explicam scripts e build de uma aplicação, sem afirmação sobre a arquitetura entre unidades. As cinco revisões 3.4.2–3.4.6 estão `final` e têm o mesmo commit da classificação e da aquisição: `541f8edc7615e399cbbf0fe3f1ae33abe14c4796`.

README.md:3, 7-21 descreve a implementação presente: shell React e quatro aplicações autônomas compostas por iframe. STATUS.md:15-59 reafirma essa leitura e anuncia a próxima fase. DEPLOYMENT.md:3 descreve workflows Vercel, mas os workflows efetivos publicam builds separados no Pages (.github/workflows/deploy-all.yml:73-78, 111-116). O guia micro-web-golden-sample.md:23-36, 95, 172, 223-235 mistura descrição de uma arquitetura federada e entregáveis supostamente concluídos. Essa descrição diverge do iframe observado (frontend/container/src/App.tsx:239-252). A origem dos frames é o Pages de `olivium-dev`, enquanto os workflows deste snapshot publicam no Pages do repositório atual; a revisão de composição resolve os destinos pelos mesmos subdiretórios (3.4.5 #1–4), sem comprovar que o deploy desta conta está no ar.

Os dois planos são listas de trabalho a realizar: implementation-plan.md:3, 10-22, 47-57, 79-83, 106-110, 130-134, 144-176, 199-219 e implementation-plan-mui-microservices.md:3, 9-46, 48-99, 108-112, 138-141, 165-168, 197-200, 292-354. Propõem Module Federation, biblioteca e estado compartilhados, outro conjunto inicial de unidades, MUI e integração com backend. Não são prova de implementação. As árvores de diretórios entram na tabela como documentação estrutural, conforme as instruções desta etapa. Os blocos de comandos/configurações/fontes ficam como exemplos: README.md:25-38, 42-54; DEPLOYMENT.md:21-28, 50-58, 86-106; implementation-plan-mui-microservices.md:52-57, 77-82, 226-247, 255-273, 282-288, 324-348, 399-423; micro-web-golden-sample.md:69-93, 102-125, 137-160, 168-170. Não são artefatos ativos de build ou composição.

Ocorrências `doc-*` sem linha própria, além das repetições identificadas nas Observações:

- README.md:1 e STATUS.md:1, 27 são títulos; README.md:53 é instrução dentro do bloco de comandos. STATUS.md:31 descreve aparência (temas de cores), sem propriedade arquitetural. README.md:58 é melhoria futura, e STATUS.md:57 anuncia preparação para ela, sem afirmar que já há Module Federation.
- DEPLOYMENT.md:52 é código ilustrativo e :110 é recomendação para permitir iframe, não configuração efetiva. :113 recomenda monitoramento, sem propriedade de composição. :9 é instrução de criar projetos Vercel, contextualizada com a afirmação :3.
- implementation-plan-mui-microservices.md:1, 9, 90, 106, 136, 163, 195 são títulos. :3, 91-92, 111, 140, 167, 199 e 362 são objetivo/tarefas/teste futuros da federação. :452 conclui o propósito do plano, sem relatar sua execução. As integrações de backend propostas em :126-130, 153-157, 220-310 não existem no frontend estático atual; detalhes internos e relações só entre backends não entram na tabela.
- implementation-plan.md:1, 46, 78, 105, 129 são títulos. :3 apresenta o plano; :47, 79, 106, 130 são tarefas de federação; :92, 176 são recomendações para autenticação/estado; :208, 229, 269-271, 274 são tarefas ou critérios de validação não assinalados; em particular, :270 é critério futuro de carregamento dos remotes pelo container, não relato de implementação. :287 é recomendação de ordem de deploy, não relato de ordem realizada. :295-298 são links de recursos, não afirmações do projeto.
- micro-web-golden-sample.md:1, 29, 211 são títulos; :4 declara a finalidade do guia. :11 apresenta o contexto conceitual dos micro-frontends, sem afirmar uma propriedade deste projeto. :14-17 define microservices/micro-frontends e seus objetivos em geral; :36 é analogia de autonomia com service mesh, repetindo a conexão pelo container, não outra infraestrutura implantada. :45-46 descreve a alternativa multirrepositório, e :49-52 a alternativa monorepo com ferramentas/workspaces, sem escolher uma para o snapshot. :73, 106 são instruções de configuração. :196, 202-207 recomenda biblioteca/estado compartilhados e otimizações; não relata sua existência. :213-219 descreve a alternativa Single-SPA, não usada aqui. :240 recomenda evolução futura. Os exemplos de unidades :30 e a lista de entregáveis :225-228, ao contrário dessas recomendações, fazem afirmações sobre o golden sample e estão avaliados na tabela ou como repetições nas Observações.

Também foram lidos os campos descritivos e comentários dos artefatos citados nas revisões: `package.json` da raiz e os cinco `frontend/<app>/package.json`; os seis `.github/workflows/deploy-*.yml`; `frontend/container/src/App.tsx`; os quatro `frontend/<app>-app/src/App.tsx`; as cinco entradas `frontend/<app>/src/index.tsx`, os cinco `.env`, os cinco `frontend/<app>/public/index.html` e `frontend/<app>/src/reportWebVitals.ts`, idênticos entre unidades. Também foram conferidos `.cursor/templates/webpack.config.template.js` e `.cursor/templates/RemoteComponent.template.tsx`: seus comentários descrevem modelos com placeholders, não uma integração ativa entre as unidades deste snapshot, como já registra a 3.4.4 (Notas). Os manifestos das unidades não têm `description`; os workflows têm nomes de jobs/passos, sem comentários arquiteturais adicionais. Os comentários do container rotulam áreas visuais (frontend/container/src/App.tsx:29, 80, 131, 259); os das entradas e do HTML são padrão CRA (ex.: frontend/container/src/index.tsx:16-18; frontend/container/public/index.html:13-41). A descrição da raiz é avaliada na última linha. Os textos da UI que afirmam execução individual repetem README.md:18, e os que anunciam Pages (ex.: frontend/analytics-app/src/App.tsx:27; frontend/container/src/App.tsx:229, 276) são compatíveis com os workflows. Não foi executada aplicação, instalação, build, acesso a endereços publicados ou leitura de histórico.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | DEPLOYMENT.md:3 | "This project includes GitHub Actions workflows for automatic deployment of all micro-frontends to Vercel." | build-deploy | contradita | 3.4.6 #1–5; .github/workflows/deploy-all.yml:73-78, 111-116 |
| 2 | DEPLOYMENT.md:11-15 | "Container App - Main application shell; User Management; Data Grid; Analytics; Settings" | estrutura | corroborada | 3.4.3 (cinco unidades Yes); frontend/container/src/App.tsx:12-18, 239-245 |
| 3 | DEPLOYMENT.md:48 | "update the iframe URLs in `frontend/container/src/App.tsx`" | composição | corroborada | 3.4.5 #1–4; frontend/container/src/App.tsx:239-252 |
| 4 | DEPLOYMENT.md:63-65 | "Push to main branch with changes in specific app directory […] Builds and deploys only the changed micro-frontend" | build-deploy | corroborada | 3.4.6 #1–5; .github/workflows/deploy-analytics.yml:3-12, 28-43 |
| 5 | DEPLOYMENT.md:68-70 | "Push to main branch or manual trigger […] Builds, tests, and deploys all micro-frontends" | build-deploy | corroborada | 3.4.6 #1–5; .github/workflows/deploy-all.yml:3-6, 25-47, 49-116 |
| 6 | README.md:7 | "Container App: Main shell with header, footer, and side menu" | estrutura | corroborada | frontend/container/src/App.tsx:29-30, 80-81, 131-132, 259-260 |
| 7 | README.md:8, 18 | "4 Independent Micro-Frontends […] Each micro-frontend runs independently on its own port" | independência | corroborada | 3.4.3 (quatro unidades além do container); frontend/analytics-app/package.json:21; frontend/analytics-app/.env:1; package.json:8-12 |
| 8 | README.md:20 | "Clean separation of concerns between applications" | estrutura | corroborada | 3.4.3 (cinco unidades Yes); 3.4.4 (Notas); frontend/container/src/App.tsx:239-252; frontend/analytics-app/src/index.tsx:4, 7-14 |
| 9 | README.md:21 | "Centralized navigation in the container app" | composição | corroborada | frontend/container/src/App.tsx:8-18, 90-93, 155-158, 239-245 |
| 10 | STATUS.md:5-10 | "All Applications Running" | independência | sem corroboração | — |
| 11 | implementation-plan-mui-microservices.md:28-46 | "Create monorepo structure […] /frontend […] /shared-ui-lib […] /backend […] /docker" | estrutura | parcial | 3.4.3 (Unidades); package.json:8-14 |
| 12 | implementation-plan.md:17-21 | "/container # Main host application; /auth-app # Authentication micro-frontend; /dashboard-app # Dashboard micro-frontend; /profile-app # Profile micro-frontend; /ui-lib # Shared design system (optional)" | estrutura | contradita | 3.4.3 (Unidades); package.json:8-12; frontend/container/src/App.tsx:12-18 |
| 13 | micro-web-golden-sample.md:3 | "golden sample project for micro-web architecture using React + Webpack Module Federation" | composição | contradita | 3.4.2 (nenhuma dependência das tecnologias); 3.4.5 #1–4; frontend/container/src/App.tsx:239-252; frontend/container/package.json:14-22 |
| 14 | micro-web-golden-sample.md:26 | "shared state" (no shell global) | composição | contradita | frontend/container/src/App.tsx:5-10, 239-252; 3.4.4 (Notas) |
| 15 | micro-web-golden-sample.md:27 | "Loads and integrates remote applications dynamically." | composição | corroborada | 3.4.5 #1–4; frontend/container/src/App.tsx:138, 218, 239-252 |
| 16 | micro-web-golden-sample.md:30 | "Each is a standalone React project (e.g., auth-app, dashboard-app, profile-app)." | estrutura | contradita | 3.4.3 (Unidades); frontend/analytics-app/package.json:14-22; package.json:8-12 |
| 17 | micro-web-golden-sample.md:31 | "Each exposes specific pages or components." | composição | contradita | 3.4.4 (Notas); frontend/analytics-app/src/App.tsx:4-36; frontend/analytics-app/src/index.tsx:4, 7-14; frontend/container/src/App.tsx:239-252 |
| 18 | micro-web-golden-sample.md:34 | "Common dependencies like React and ReactDOM are shared to minimize bundle duplication." | composição | contradita | frontend/container/package.json:14-22; frontend/analytics-app/package.json:14-22; .github/workflows/deploy-all.yml:33-39; 3.4.6 #1–5 |
| 19 | micro-web-golden-sample.md:95 | "The container acts as the orchestrator, dynamically pulling in remote modules." | composição | contradita | 3.4.5 #1–4; frontend/container/src/App.tsx:239-252; frontend/container/src/reportWebVitals.ts:3-11 |
| 20 | micro-web-golden-sample.md:184 | "The container fetches remote apps from these URLs in production." | composição | contradita | frontend/container/src/App.tsx:241-244; .github/workflows/deploy-all.yml:86-89, 111-116 |
| 21 | micro-web-golden-sample.md:187 | "Teams deploy without impacting others." | build-deploy | parcial | 3.4.6 #1–5; .github/workflows/deploy-analytics.yml:28-43; .github/workflows/deploy-all.yml:49-116 |
| 22 | micro-web-golden-sample.md:188 | "Versioning and rollback are independent." | build-deploy | sem corroboração | — |
| 23 | micro-web-golden-sample.md:189 | "Horizontal scaling per app." | build-deploy | sem corroboração | — |
| 24 | micro-web-golden-sample.md:199 | "Keep global auth logic in the container. Remotes consume tokens through context or API calls." | composição | contradita | frontend/container/src/App.tsx:5-10, 239-252; frontend/user-management-app/src/App.tsx:4-36; 3.4.4 (Notas) |
| 25 | micro-web-golden-sample.md:225 | "Container app with routing and lazy loading" | composição | contradita | frontend/container/src/App.tsx:1-18, 138, 218, 239-252; 3.4.4 (Notas) |
| 26 | package.json:4 | "Golden sample project demonstrating micro-frontend architecture using React + Webpack Module Federation + Material-UI" | composição | contradita | frontend/container/package.json:5-18; frontend/analytics-app/package.json:5-18; frontend/container/src/App.tsx:1-2, 239-252; 3.4.2 |

## Observações

**1. DEPLOYMENT.md:3.** Há workflows automáticos para as cinco aplicações, mas eles publicam no GitHub Pages, com `peaceiris/actions-gh-pages`, e não no Vercel. A criação de cinco projetos Vercel (:9), os segredos (:21-28) e os endereços de exemplo (:74-80) são instruções de uma implantação proposta, não configurações presentes. Os exemplos de Netlify e Pages (:84-106) também são blocos de configuração, não novos relatos de implantação.

**2. DEPLOYMENT.md:11-15.** As cinco unidades enumeradas existem. A lista reaparece em README.md:7-12 e STATUS.md:6-10, 44-45. Os quatro destinos do container correspondem aos quatro aplicativos e aos subdiretórios dos workflows (3.4.5 #1–4). A relação é de shell e aplicações embutidas; a lista não comprova federação.

**3. DEPLOYMENT.md:48.** A orientação pressupõe corretamente que a integração depende das URLs de iframe no código do container. Elas estão fixas em `olivium-dev.github.io/golden-sample-react-micro-web/`, com quatro caminhos (:241-244). README.md:3, 19 e STATUS.md:17, 29, 39 repetem a integração por iframe. O objeto ilustrativo de DEPLOYMENT.md:50-58 não é o código efetivo; não vira outra linha. DEPLOYMENT.md:110 é recomendação para permitir embedding, sem afirmar uma configuração de CORS implementada.

**4. DEPLOYMENT.md:63-65.** Cada workflow individual filtra os caminhos de sua aplicação e constrói/publica apenas o respectivo build. Também há gatilho por pull request; o texto descreve um dos gatilhos e não o declara exclusivo. A independência de deploy é repetida em DEPLOYMENT.md:117 e micro-web-golden-sample.md:178, 228. O workflow geral também pode executar no mesmo push; portanto, esta linha descreve os workflows individuais, sem garantir que nenhuma outra aplicação seja publicada naquele evento.

**5. DEPLOYMENT.md:68-70.** O workflow geral instala, constrói e testa as cinco aplicações. Depois, um job publica o container e uma matriz publica os quatro micro-frontends, todos no Pages. A publicação depende do job de build e teste (:50, 81).

**6. README.md:7.** O shell contém cabeçalho, menu lateral, área principal e rodapé. STATUS.md:15-18, 44, 47, 75 e micro-web-golden-sample.md:25-26 repetem o papel de shell; o estado compartilhado mencionado neste último documento é tratado separadamente, pois não tem a mesma corroboração.

**7. README.md:8, 18.** Cada micro-frontend tem entrada React, script `start` e porta próprios: user-management 3001, data-grid 3002, analytics 3003 e settings 3004 (respectivos `frontend/<app>/.env:1`). STATUS.md:28, 45-46, 56 repete a autonomia de execução; os textos em `frontend/analytics-app/src/App.tsx:23`, `frontend/data-grid-app/src/App.tsx:23`, `frontend/settings-app/src/App.tsx:23` e `frontend/user-management-app/src/App.tsx:23` também a anunciam. Isso comprova a configuração para execução individual, sem afirmar que os servidores foram executados nesta revisão.

**8. README.md:20.** As unidades têm manifestos e entradas próprios, e o container integra páginas por URL. A revisão de código-fonte registra os quatro aplicativos como páginas sem composição e sem comunicação entre frames. O limite arquitetural é verificável; a expressão qualitativa “clean” não acrescenta uma garantia de qualidade.

**9. README.md:21.** O container mantém a aba ativa, trata cliques no menu e nos cartões e escolhe a URL do iframe. README.md:14 e STATUS.md:16, 30, 38, 55 repetem a navegação entre unidades. Isso é troca de aba/URL, sem React Router nem importação de componentes remotos.

**10. STATUS.md:5-10.** A lista dá os cinco endereços localhost como ativos; STATUS.md:3, 53-56, 75 reforça o relato de funcionamento. Os scripts e portas sustentam a possibilidade de execução individual (afirmação anterior), mas o snapshot não registra os processos ou uma verificação de disponibilidade naquele momento. O funcionamento efetivo declarado permanece sem corroboração.

**11. implementation-plan-mui-microservices.md:28-46.** A árvore proposta inclui exatamente as cinco aplicações existentes em `frontend/`, além de biblioteca compartilhada, backend, Docker e documentação. Os diretórios de aplicações são confirmados; os demais componentes da árvore não têm correspondência como implementação neste snapshot. É uma proposta de ampliação, não evidência de que a pilha inteira já existe. O overview (:9-21) descreve o alvo React/MUI/federação e FastAPI, não o estado do código.

**12. implementation-plan.md:17-21.** A árvore comentada do plano antigo nomeia host, auth, dashboard e profile. O snapshot tem container, user-management, data-grid, analytics e settings sob `frontend/`, com outra divisão de unidades; o dashboard da aba home é interno ao container. micro-web-golden-sample.md:54-62, 129, 226, 238 retoma a mesma proposta com auth/dashboard/profile. A contradição é entre essa estrutura documentada e o snapshot, sem transformar o plano em declaração de trabalho concluído.

**13. micro-web-golden-sample.md:3.** O guia se apresenta como explicação da arquitetura React com Module Federation e conclui, em :235, que o golden sample demonstra essa tecnologia. React se confirma; a composição efetiva é por iframe em aplicações CRA. Não há federação ativa. O fato de README.md:58 a tratar como melhoria futura e STATUS.md:57 anunciar preparação para a integração reforça a diferença entre o guia e o código.

**14. micro-web-golden-sample.md:26.** Navegação e layout existem, como na afirmação do shell. O trecho “shared state” não se confirma: os dois estados do container são aba ativa e abertura do menu, e o iframe recebe somente URL, estilo e título. Os aplicativos não consomem estado do host. A propriedade de estado compartilhado é separada do shell já corroborado porque recebe outra corroboração.

**15. micro-web-golden-sample.md:27.** Sem especificar aqui módulos ou federação, a frase descreve o que o container faz: escolhe uma aplicação em runtime conforme a aba e a integra no iframe. O sentido amplo de “remote applications” é compatível com páginas remotas. O mecanismo específico de módulos citado mais adiante recebe avaliação própria.

**16. micro-web-golden-sample.md:30.** A propriedade de serem projetos React autônomos se confirma para os quatro aplicativos reais, mas os exemplos nomeiam outras unidades, ausentes no snapshot. A frase indivisível recebe contradita pela identificação incorreta, enquanto a independência dos aplicativos presentes já foi registrada em README.md:8, 18.

**17. micro-web-golden-sample.md:31.** O guia atribui aos remotes uma interface de exposição de páginas/componentes. Cada aplicação monta seu próprio App numa página, e o host embute essa página por URL. O `export default App` do aplicativo é usado localmente por sua entrada, não exposto a um consumidor federado. A frase específica sobre `auth/AuthPage` em :127 é uma instância dessa exposição proposta, sem implementação correspondente.

**18. micro-web-golden-sample.md:34.** React e ReactDOM constam nos manifestos das aplicações, mas são empacotados por builds CRA separados. Ter as mesmas dependências não implementa compartilhamento entre unidades nem deduplicação de bundles; o isolamento por iframe não fornece um runtime React comum. :227 repete “Shared React + optional UI lib”; a biblioteca continua opcional e não está implementada.

**19. micro-web-golden-sample.md:95.** O container orquestra a seleção, mas carrega documentos em iframe, não módulos. :172 especifica a busca dinâmica de `remoteEntry.js`, o que também não ocorre. Os exemplos de webpack e imports federados (:75-93, 108-125, 137-160) são blocos de código do guia e não viram linhas adicionais. O import dinâmico do CRA só carrega `web-vitals` localmente.

**20. micro-web-golden-sample.md:184.** “These URLs” remete aos endereços CDN de auth/dashboard/profile com `remoteEntry.js` em :180-182. O código aponta para documentos HTML no Pages de `olivium-dev`, nos caminhos user-management/data-grid/analytics/settings. Os workflows publicam esses subdiretórios no Pages do repositório. Não foi verificada a disponibilidade dos endereços; a contradição é com as URLs e o tipo de recurso configurados.

**21. micro-web-golden-sample.md:187.** Há builds e publicações por aplicação, mas todos usam um site/branch de Pages, e o workflow geral condiciona as publicações ao teste/build das cinco aplicações. Os artefatos confirmam separação de publicação, não a garantia ampla de ausência de impacto em outras equipes ou aplicações.

**22. micro-web-golden-sample.md:188.** Não há mecanismo de versões ou rollback independente demonstrado. A 3.4.6 registra versionamento No nas cinco aplicações: a versão privada `0.1.0` não participa da publicação. Isso não documenta uma política externa de versionamento ou reversão; a garantia do guia não é verificável no snapshot.

**23. micro-web-golden-sample.md:189.** O guia enumera escalabilidade horizontal como benefício. Os workflows descrevem publicação estática no Pages, sem política ou artefato de escalabilidade por aplicação. Nenhum registro confirma nem mede essa propriedade.

**24. micro-web-golden-sample.md:199.** A recomendação de manter autenticação no host não prova implementação; a segunda frase, porém, afirma consumo de tokens pelos remotes. O host não transmite tokens e o aplicativo user-management é uma página estática. Não há contexto ou chamada de API entre unidades, conforme a revisão de código-fonte.

**25. micro-web-golden-sample.md:225.** Na lista de entregáveis marcados como concluídos, o guia declara routing e lazy loading. Há navegação local por estado e seleção de URL de iframe, mas não roteador nem lazy loading de módulos/rotas como no exemplo do guia. A montagem condicional do frame não implementa o carregamento federado descrito.

**26. package.json:4.** A descrição adiciona Material-UI à afirmação de federação. Os manifestos das cinco aplicações não incluem MUI e o container usa elementos HTML com estilos inline; as quatro páginas também usam HTML e CSS locais. A referência à federação repete o guia, mas o mecanismo de UI nomeado adicionalmente muda a propriedade verificável. `keywords` (:17-24) são menções soltas, sem outra linha. README.md:59 trata MUI como melhoria futura.

## Resumo

Afirmações: 26 (corroborada: 9, parcial: 2, contradita: 12, sem corroboração: 3). Temas: (estrutura: 6, composição: 12, build-deploy: 6, independência: 2).

---
schema: 1
id: 1082058462
full_name: Sara-hkm/creamati-micro-web
commit: 541f8edc7615e399cbbf0fe3f1ae33abe14c4796
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

# 313 — Sara-hkm/creamati-micro-web

## Leitura do repositório

A cadeia arquitetural parte do código, sem dependência de tecnologia selecionada na 3.4.2: o container monta um iframe e seleciona uma das quatro URLs pela aba ativa (#1). As cinco aplicações têm entrada e build próprios (#3–#7), e o mesmo iframe sustenta quatro relações ativas do container com analytics, data-grid, settings e user-management (#8–#11). Os builds e as publicações são separados por aplicação, ainda que usem o mesmo site e branch do GitHub Pages (#12–#16). A raiz só coordena comandos (#2).

A correspondência entre os segmentos de URL e os destinos de publicação resolve os quatro destinos nas unidades do snapshot, conforme as revisões finais. As URLs do código apontam para o Pages de `olivium-dev`, enquanto os workflows publicam no Pages deste repositório (#1, #8–#16); não há verificação de disponibilidade nem identidade dos conteúdos publicados. A 3.5 preserva essa resolução e seus limites.

Não há observações de configuração: os blocos dos workflows citados nas tabelas só constroem/publicam aplicações, e os manifestos só definem scripts e dependências convencionais do CRA. As URLs que compõem as unidades estão no código executado pelo container (#1), não em configuração de runtime.

A documentação confirma o shell, a navegação e os limites de execução/publicação (#18–#25, #31), mas também contém sinais enganosos: Vercel (#17), outras unidades (#27, #28, #32), Module Federation e MUI (#29, #42), módulos e dependências compartilhados, autenticação e lazy loading (#30, #33–#36, #40, #41). As garantias de ausência de impacto são apenas parciais (#37); aplicações em execução, rollback e escalabilidade não têm corroboração (#26, #38, #39). Essas afirmações continuam fracas como evidência semântica, inclusive as corroboradas.

O histórico explica a documentação de deploy desatualizada (#43) e a divergência entre unidades propostas e presentes (#44). Não decide se houve federação nos submódulos anteriores ou se era intenção (#45); essa incerteza é sobre o passado e não altera a leitura do snapshot como composição por iframe.

## Observações

### 1. frontend/container/src/App.tsx:239-252; frontend/container/src/App.tsx:8-18; frontend/container/src/App.tsx:93; frontend/container/src/App.tsx:138; frontend/container/src/App.tsx:218; frontend/container/src/index.tsx:4-14; .github/workflows/deploy-all.yml:86-89; .github/workflows/deploy-all.yml:115-116

**Observação:** O `App` montado pela entrada mantém a aba ativa e, fora de `home`, renderiza um `iframe`. Seu `src` seleciona URLs de `olivium-dev.github.io/golden-sample-react-micro-web/` terminadas em `user-management/`, `data-grid/`, `analytics/` ou `settings/`. Esses segmentos coincidem com os destinos de publicação das quatro aplicações na matriz do workflow.

**Interpretação:** O container compõe quatro aplicações por documentos remotos em runtime, com navegação central. A resolução das unidades segue a correspondência de caminhos registrada na 3.4; a origem das URLs é de outra conta, sem comprovação de disponibilidade dos sites.

### 2. .; package.json:8-15; package.json:29

**Observação:** O manifesto da raiz encadeia comandos em cinco diretórios `frontend/*` e declara `concurrently`; não há entrada nem build próprios da raiz.

**Interpretação:** A raiz coordena aplicações e não constitui uma sexta unidade frontend.

### 3. frontend/analytics-app; frontend/analytics-app/src/index.tsx:7-14; frontend/analytics-app/public/index.html:31; frontend/analytics-app/package.json:22

**Observação:** `frontend/analytics-app` possui manifesto próprio, entrada que monta `<App />` numa raiz React, template HTML com `div#root` e script `build` com `react-scripts build`.

**Interpretação:** A entrada e o build próprios confirmam o limite de uma aplicação frontend CRA; isoladamente, não estabelecem sua composição com outras unidades.

### 4. frontend/container; frontend/container/src/index.tsx:7-14; frontend/container/public/index.html:31; frontend/container/package.json:22

**Observação:** `frontend/container` possui manifesto próprio, entrada que monta `<App />` numa raiz React, template HTML com `div#root` e script `build` com `react-scripts build`.

**Interpretação:** A entrada e o build próprios confirmam o limite de uma aplicação frontend CRA; isoladamente, não estabelecem sua composição com outras unidades.

### 5. frontend/data-grid-app; frontend/data-grid-app/src/index.tsx:7-14; frontend/data-grid-app/public/index.html:31; frontend/data-grid-app/package.json:22

**Observação:** `frontend/data-grid-app` possui manifesto próprio, entrada que monta `<App />` numa raiz React, template HTML com `div#root` e script `build` com `react-scripts build`.

**Interpretação:** A entrada e o build próprios confirmam o limite de uma aplicação frontend CRA; isoladamente, não estabelecem sua composição com outras unidades.

### 6. frontend/settings-app; frontend/settings-app/src/index.tsx:7-14; frontend/settings-app/public/index.html:31; frontend/settings-app/package.json:22

**Observação:** `frontend/settings-app` possui manifesto próprio, entrada que monta `<App />` numa raiz React, template HTML com `div#root` e script `build` com `react-scripts build`.

**Interpretação:** A entrada e o build próprios confirmam o limite de uma aplicação frontend CRA; isoladamente, não estabelecem sua composição com outras unidades.

### 7. frontend/user-management-app; frontend/user-management-app/src/index.tsx:7-14; frontend/user-management-app/public/index.html:31; frontend/user-management-app/package.json:22

**Observação:** `frontend/user-management-app` possui manifesto próprio, entrada que monta `<App />` numa raiz React, template HTML com `div#root` e script `build` com `react-scripts build`.

**Interpretação:** A entrada e o build próprios confirmam o limite de uma aplicação frontend CRA; isoladamente, não estabelecem sua composição com outras unidades.

### 8. frontend/container/src/App.tsx:239; frontend/container/src/App.tsx:243; .github/workflows/deploy-all.yml:88; .github/workflows/deploy-all.yml:115-116; .github/workflows/deploy-analytics.yml:42-43

**Observação:** O `iframe` do container escolhe a URL `https://olivium-dev.github.io/golden-sample-react-micro-web/analytics/`. O workflow individual publica `frontend/analytics-app/build` em `analytics`, e a matriz geral associa `analytics-app` ao mesmo destino. A 3.4.5 registra No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** A relação ativa liga `frontend/container` a `frontend/analytics-app` por iframe. A unidade é resolvida pelo caminho de publicação, conforme a 3.4.5, embora a URL aponte para a conta externa `olivium-dev`.

### 9. frontend/container/src/App.tsx:239; frontend/container/src/App.tsx:242; .github/workflows/deploy-all.yml:87; .github/workflows/deploy-all.yml:115-116; .github/workflows/deploy-data-grid.yml:42-43

**Observação:** O `iframe` do container escolhe a URL `https://olivium-dev.github.io/golden-sample-react-micro-web/data-grid/`. O workflow individual publica `frontend/data-grid-app/build` em `data-grid`, e a matriz geral associa `data-grid-app` ao mesmo destino. A 3.4.5 registra No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** A relação ativa liga `frontend/container` a `frontend/data-grid-app` por iframe. A unidade é resolvida pelo caminho de publicação, conforme a 3.4.5, embora a URL aponte para a conta externa `olivium-dev`.

### 10. frontend/container/src/App.tsx:239; frontend/container/src/App.tsx:244; .github/workflows/deploy-all.yml:89; .github/workflows/deploy-all.yml:115-116; .github/workflows/deploy-settings.yml:42-43

**Observação:** O `iframe` do container escolhe a URL `https://olivium-dev.github.io/golden-sample-react-micro-web/settings/`. O workflow individual publica `frontend/settings-app/build` em `settings`, e a matriz geral associa `settings-app` ao mesmo destino. A 3.4.5 registra No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** A relação ativa liga `frontend/container` a `frontend/settings-app` por iframe. A unidade é resolvida pelo caminho de publicação, conforme a 3.4.5, embora a URL aponte para a conta externa `olivium-dev`.

### 11. frontend/container/src/App.tsx:239; frontend/container/src/App.tsx:241; .github/workflows/deploy-all.yml:86; .github/workflows/deploy-all.yml:115-116; .github/workflows/deploy-user-management.yml:42-43

**Observação:** O `iframe` do container escolhe a URL `https://olivium-dev.github.io/golden-sample-react-micro-web/user-management/`. O workflow individual publica `frontend/user-management-app/build` em `user-management`, e a matriz geral associa `user-management-app` ao mesmo destino. A 3.4.5 registra No snapshot `Yes` e Ativa `Yes`.

**Interpretação:** A relação ativa liga `frontend/container` a `frontend/user-management-app` por iframe. A unidade é resolvida pelo caminho de publicação, conforme a 3.4.5, embora a URL aponte para a conta externa `olivium-dev`.

### 12. frontend/analytics-app/package.json:22; .github/workflows/deploy-analytics.yml:3-12; .github/workflows/deploy-analytics.yml:28-43; .github/workflows/deploy-all.yml:80-116

**Observação:** O script de `frontend/analytics-app` usa `react-scripts build`. Seu workflow instala e constrói apenas essa aplicação e publica `frontend/analytics-app/build` em `analytics/` no GitHub Pages com `peaceiris/actions-gh-pages@v3`. O workflow geral tem uma publicação equivalente por aplicação, condicionada a `build-and-test`.

**Interpretação:** Build e deploy são separados por aplicação, ainda que as publicações compartilhem site e branch do Pages. A 3.4.6 registra Versionamento `No`; não há versão usada na publicação. Esses limites sustentam autonomia de entrega, sem garantir ausência de impacto entre aplicações.

### 13. frontend/container/package.json:22; .github/workflows/deploy-container.yml:3-12; .github/workflows/deploy-container.yml:28-44; .github/workflows/deploy-all.yml:49-78

**Observação:** O script de `frontend/container` usa `react-scripts build`. Seu workflow instala e constrói apenas essa aplicação e publica `frontend/container/build` em `container/` no GitHub Pages com `peaceiris/actions-gh-pages@v3`. O workflow geral tem uma publicação equivalente por aplicação, condicionada a `build-and-test`. O workflow individual também declara `cname: micro-frontend-container.github.io`.

**Interpretação:** Build e deploy são separados por aplicação, ainda que as publicações compartilhem site e branch do Pages. A 3.4.6 registra Versionamento `No`; não há versão usada na publicação. Esses limites sustentam autonomia de entrega, sem garantir ausência de impacto entre aplicações.

### 14. frontend/data-grid-app/package.json:22; .github/workflows/deploy-data-grid.yml:3-12; .github/workflows/deploy-data-grid.yml:28-43; .github/workflows/deploy-all.yml:80-116

**Observação:** O script de `frontend/data-grid-app` usa `react-scripts build`. Seu workflow instala e constrói apenas essa aplicação e publica `frontend/data-grid-app/build` em `data-grid/` no GitHub Pages com `peaceiris/actions-gh-pages@v3`. O workflow geral tem uma publicação equivalente por aplicação, condicionada a `build-and-test`.

**Interpretação:** Build e deploy são separados por aplicação, ainda que as publicações compartilhem site e branch do Pages. A 3.4.6 registra Versionamento `No`; não há versão usada na publicação. Esses limites sustentam autonomia de entrega, sem garantir ausência de impacto entre aplicações.

### 15. frontend/settings-app/package.json:22; .github/workflows/deploy-settings.yml:3-12; .github/workflows/deploy-settings.yml:28-43; .github/workflows/deploy-all.yml:80-116

**Observação:** O script de `frontend/settings-app` usa `react-scripts build`. Seu workflow instala e constrói apenas essa aplicação e publica `frontend/settings-app/build` em `settings/` no GitHub Pages com `peaceiris/actions-gh-pages@v3`. O workflow geral tem uma publicação equivalente por aplicação, condicionada a `build-and-test`.

**Interpretação:** Build e deploy são separados por aplicação, ainda que as publicações compartilhem site e branch do Pages. A 3.4.6 registra Versionamento `No`; não há versão usada na publicação. Esses limites sustentam autonomia de entrega, sem garantir ausência de impacto entre aplicações.

### 16. frontend/user-management-app/package.json:22; .github/workflows/deploy-user-management.yml:3-12; .github/workflows/deploy-user-management.yml:28-43; .github/workflows/deploy-all.yml:80-116

**Observação:** O script de `frontend/user-management-app` usa `react-scripts build`. Seu workflow instala e constrói apenas essa aplicação e publica `frontend/user-management-app/build` em `user-management/` no GitHub Pages com `peaceiris/actions-gh-pages@v3`. O workflow geral tem uma publicação equivalente por aplicação, condicionada a `build-and-test`.

**Interpretação:** Build e deploy são separados por aplicação, ainda que as publicações compartilhem site e branch do Pages. A 3.4.6 registra Versionamento `No`; não há versão usada na publicação. Esses limites sustentam autonomia de entrega, sem garantir ausência de impacto entre aplicações.

### 17. DEPLOYMENT.md:3

**Observação:** O guia afirma que os workflows implantam todos os micro-frontends automaticamente no Vercel.

**Interpretação:** A afirmação é contradita pelas publicações no GitHub Pages; o destino documentado não é o configurado.

### 18. DEPLOYMENT.md:11-15

**Observação:** O guia enumera Container App como shell e User Management, Data Grid, Analytics e Settings como aplicações.

**Interpretação:** A enumeração é corroborada pelos cinco limites frontend e pelo conjunto integrado pelo container.

### 19. DEPLOYMENT.md:48

**Observação:** A instrução pede atualizar as URLs de iframe em `frontend/container/src/App.tsx` após o deploy.

**Interpretação:** A instrução é corroborada pelas quatro relações por iframe e identifica onde a integração depende dos endereços publicados.

### 20. DEPLOYMENT.md:63-65

**Observação:** O guia descreve gatilho por push com mudanças no diretório de uma aplicação e build/deploy apenas do micro-frontend alterado.

**Interpretação:** A afirmação é corroborada pelos workflows individuais, sem excluir o workflow geral que pode rodar no mesmo push.

### 21. DEPLOYMENT.md:68-70

**Observação:** O guia descreve um workflow geral acionado por push na main ou manualmente que constrói, testa e publica todos os micro-frontends.

**Interpretação:** A descrição é corroborada pelo workflow geral; cada publicação depende do job de build e teste das cinco aplicações.

### 22. README.md:7

**Observação:** O README descreve o container como shell principal com cabeçalho, rodapé e menu lateral.

**Interpretação:** O papel de shell é corroborado pelas áreas visuais do container; a frase não demonstra sozinha a ligação com outras unidades.

### 23. README.md:8; README.md:18

**Observação:** O README apresenta quatro micro-frontends independentes e diz que cada um executa na própria porta.

**Interpretação:** A configuração de execução individual é corroborada pelas quatro aplicações, seus scripts e portas, sem demonstrar servidores em execução.

### 24. README.md:20

**Observação:** O README afirma separação de responsabilidades entre as aplicações.

**Interpretação:** Os limites das aplicações e a integração por URL corroboram a separação, sem atribuir uma garantia adicional de qualidade à palavra “clean”.

### 25. README.md:21

**Observação:** O README afirma que a navegação é centralizada no container.

**Interpretação:** A afirmação é corroborada pelo estado da aba, pelos handlers do menu e pela escolha da URL no container.

### 26. STATUS.md:5-10

**Observação:** O status anuncia todas as cinco aplicações em execução e lista endereços localhost nas portas 3000 a 3004.

**Interpretação:** A 3.4.7 registra sem corroboração: scripts e portas não comprovam que os processos estavam ativos. A disponibilidade operacional permanece apenas declarada.

### 27. implementation-plan-mui-microservices.md:28-46

**Observação:** A árvore proposta inclui container, user-management, data-grid, analytics e settings em frontend, além de shared-ui-lib, backend e docker.

**Interpretação:** A corroboração é parcial: as cinco aplicações existem, mas os demais componentes propostos não são implementação presente no snapshot.

### 28. implementation-plan.md:17-21

**Observação:** O plano descreve container, auth-app, dashboard-app, profile-app e ui-lib opcional.

**Interpretação:** A divisão de unidades é contradita pela estrutura atual, que contém outros quatro aplicativos além do container. A árvore é proposta, não execução confirmada.

### 29. micro-web-golden-sample.md:3

**Observação:** O guia apresenta o golden sample com React e Webpack Module Federation.

**Interpretação:** A atribuição de Module Federation é contradita pela composição efetiva por iframe; a presença de React não confirma federação.

### 30. micro-web-golden-sample.md:26

**Observação:** O guia inclui estado compartilhado entre as funções do shell global.

**Interpretação:** A propriedade é contradita: os estados do container controlam aba e menu; os frames recebem URL, estilo e título, sem compartilhamento de estado entre aplicações.

### 31. micro-web-golden-sample.md:27

**Observação:** O guia diz que o container carrega e integra aplicações remotas dinamicamente.

**Interpretação:** No sentido de carregar páginas remotas em runtime, a afirmação é corroborada pelas relações de iframe, sem implicar módulos federados.

### 32. micro-web-golden-sample.md:30

**Observação:** O guia apresenta os remotes como projetos React autônomos e exemplifica auth-app, dashboard-app e profile-app.

**Interpretação:** A afirmação é contradita pela identificação de unidades ausentes, embora as aplicações que existem tenham limites próprios.

### 33. micro-web-golden-sample.md:31

**Observação:** O guia diz que cada remote expõe páginas ou componentes específicos.

**Interpretação:** A exposição descrita é contradita: as aplicações montam suas próprias páginas, e o container incorpora documentos por URL, sem consumir uma interface de componentes expostos.

### 34. micro-web-golden-sample.md:34

**Observação:** O guia afirma compartilhamento de React e ReactDOM para minimizar duplicação dos bundles.

**Interpretação:** A afirmação é contradita pelos builds CRA separados; dependências iguais não estabelecem um runtime compartilhado entre frames.

### 35. micro-web-golden-sample.md:95

**Observação:** O guia descreve o container como orquestrador que obtém módulos remotos dinamicamente.

**Interpretação:** A atribuição de carregamento de módulos é contradita pelo carregamento de documentos em iframe; o import dinâmico local de web-vitals não integra unidades.

### 36. micro-web-golden-sample.md:180-184

**Observação:** O guia diz que o container busca em produção as URLs CDN de auth, dashboard e profile terminadas em remoteEntry.js.

**Interpretação:** A afirmação é contradita pelas URLs de documentos no Pages de olivium-dev e pelos outros nomes de aplicações; não foi verificada disponibilidade de endereços.

### 37. micro-web-golden-sample.md:187

**Observação:** O guia afirma que equipes fazem deploy sem impactar outras.

**Interpretação:** A corroboração é parcial: há publicação por aplicação, mas site e branch são comuns e o workflow geral depende do build/teste das cinco; os artefatos não garantem ausência de impacto.

### 38. micro-web-golden-sample.md:188

**Observação:** O guia afirma independência de versionamento e rollback.

**Interpretação:** Sem corroboração na 3.4.7: não há mecanismo de versão ou reversão independente demonstrado, e Versionamento é No para as cinco aplicações.

### 39. micro-web-golden-sample.md:189

**Observação:** O guia anuncia escalabilidade horizontal por aplicação.

**Interpretação:** Sem corroboração: a publicação estática no Pages não demonstra política nem medida de escalabilidade por unidade.

### 40. micro-web-golden-sample.md:199

**Observação:** Após recomendar autenticação global no container, o guia afirma que os remotes consomem tokens por contexto ou chamadas de API.

**Interpretação:** A afirmação de consumo é contradita: o container não transmite tokens e user-management é uma página estática, sem comunicação de autenticação entre unidades.

### 41. micro-web-golden-sample.md:225

**Observação:** A lista de entregáveis concluídos anuncia container com routing e lazy loading.

**Interpretação:** A afirmação é contradita no sentido de roteador e módulos/rotas carregados sob demanda descritos pelo guia: o código troca estado e URL de iframe, sem esse mecanismo.

### 42. package.json:4

**Observação:** O campo description anuncia arquitetura de micro-frontends com React, Webpack Module Federation e Material-UI.

**Interpretação:** A afirmação é contradita: as aplicações CRA compõem por iframe e não incluem MUI. O campo descritivo é sinal enganoso para identificar a tecnologia da composição.

### 43. 81f06d6 2025-09-21 (DEPLOYMENT.md, .github/workflows/); c6d475b 2025-09-21 (.github/workflows/); 5148e21 2025-09-21 (.github/workflows/); 1f789f7 2025-09-21 (.github/workflows/)

**Observação:** A 3.4.8 registra DEPLOYMENT.md criado com os workflows em 81f06d6 e sem alteração posterior. A mensagem de c6d475b anuncia substituição de Vercel por Pages; 5148e21 e 1f789f7 também alteram workflows. Os blobs antigos dos workflows não estavam disponíveis localmente.

**Interpretação:** O ponto é esclarecido por estágios diferentes: a documentação permaneceu enquanto os workflows mudaram. A troca é anunciada pelas mensagens, não confirmada por leitura das versões antigas.

### 44. 4f941bb 2025-09-21 (implementation-plan.md, implementation-plan-mui-microservices.md, micro-web-golden-sample.md, frontend/); 541f8ed 2025-09-22 (frontend/)

**Observação:** A 3.4.8 registra os planos e o guia com conteúdo invariável desde 4f941bb. A árvore tem os cinco nomes atuais desde esse commit, inicialmente como gitlinks sem conteúdo local; 541f8ed substitui os gitlinks pelos arquivos. Nenhum commit da árvore contém auth-app, dashboard-app, profile-app, biblioteca compartilhada, backend ou docker.

**Interpretação:** O ponto é esclarecido no alcance do histórico local: a divisão proposta pelos documentos não aparece na árvore, e os nomes atuais antecedem a recriação. O conteúdo dos antigos submódulos e o período anterior ao primeiro commit não são conhecidos.

### 45. 4f941bb 2025-09-21 (micro-web-golden-sample.md, package.json, .cursor/templates/, frontend/); 541f8ed 2025-09-22 (frontend/container/src/App.tsx, frontend/)

**Observação:** A 3.4.8 registra guia, descrição da raiz e templates presentes desde 4f941bb e sem mudanças posteriores. O iframe entra em 541f8ed, cuja mensagem anuncia incorporação via URLs do Pages. O conteúdo das cinco aplicações antes da recriação não está disponível: eram submódulos externos ausentes do clone.

**Interpretação:** O resultado histórico é inconclusivo entre uma federação anterior nos submódulos e uma intenção nunca implementada. A dúvida se restringe ao passado; no snapshot a composição por iframe está determinada, por isso a força é fraca.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.4 (frontend/container/src/App.tsx:239) | 3 código | código-fonte | iframe | arquitetural | forte | implementa #8; implementa #9; implementa #10; implementa #11 |
| 2 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 3 | 3.4.3 (frontend/analytics-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 4 | 3.4.3 (frontend/container) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 5 | 3.4.3 (frontend/data-grid-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 6 | 3.4.3 (frontend/settings-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 7 | 3.4.3 (frontend/user-management-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 8 | 3.4.5 #1 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #4; liga #3 |
| 9 | 3.4.5 #2 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #4; liga #5 |
| 10 | 3.4.5 #3 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #4; liga #6 |
| 11 | 3.4.5 #4 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #4; liga #7 |
| 12 | 3.4.6 #1 | 6 build-deploy | CI | — | arquitetural | moderada | publica #3 |
| 13 | 3.4.6 #2 | 6 build-deploy | CI | — | arquitetural | moderada | publica #4 |
| 14 | 3.4.6 #3 | 6 build-deploy | CI | — | arquitetural | moderada | publica #5 |
| 15 | 3.4.6 #4 | 6 build-deploy | CI | — | arquitetural | moderada | publica #6 |
| 16 | 3.4.6 #5 | 6 build-deploy | CI | — | arquitetural | moderada | publica #7 |
| 17 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #12; contradiz #13; contradiz #14; contradiz #15; contradiz #16 |
| 18 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora #4; corrobora #5; corrobora #6; corrobora #7 |
| 19 | 3.4.7 #3 | 7 documentação | documentação | iframe | arquitetural | fraca | corrobora #8; corrobora #9; corrobora #10; corrobora #11 |
| 20 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16 |
| 21 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #12; corrobora #13; corrobora #14; corrobora #15; corrobora #16 |
| 22 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora frontend/container/src/App.tsx:29-30; corrobora frontend/container/src/App.tsx:80-81; corrobora frontend/container/src/App.tsx:131-132; corrobora frontend/container/src/App.tsx:259-260 |
| 23 | 3.4.7 #7 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #3; corrobora #5; corrobora #6; corrobora #7; corrobora package.json:8-12; corrobora frontend/analytics-app/.env:1 |
| 24 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1; corrobora #3; corrobora #4; corrobora #5; corrobora #6; corrobora #7 |
| 25 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #1 |
| 26 | 3.4.7 #10 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 27 | 3.4.7 #11 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #3; corrobora em parte #4; corrobora em parte #5; corrobora em parte #6; corrobora em parte #7 |
| 28 | 3.4.7 #12 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #3; contradiz #4; contradiz #5; contradiz #6; contradiz #7 |
| 29 | 3.4.7 #13 | 7 documentação | documentação | module-federation | tecnológica | fraca | contradiz #1; contradiz #8; contradiz #9; contradiz #10; contradiz #11 |
| 30 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | contradiz frontend/container/src/App.tsx:5-10; contradiz #1 |
| 31 | 3.4.7 #15 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #8; corrobora #9; corrobora #10; corrobora #11 |
| 32 | 3.4.7 #16 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #3; contradiz #5; contradiz #6; contradiz #7 |
| 33 | 3.4.7 #17 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #1; contradiz frontend/analytics-app/src/App.tsx:4-36; contradiz frontend/analytics-app/src/index.tsx:4-14 |
| 34 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #12; contradiz #13; contradiz #14; contradiz #15; contradiz #16; contradiz frontend/container/package.json:14-22; contradiz frontend/analytics-app/package.json:14-22 |
| 35 | 3.4.7 #19 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #1; contradiz frontend/container/src/reportWebVitals.ts:3-11 |
| 36 | 3.4.7 #20 | 7 documentação | documentação | module-federation | arquitetural | fraca | contradiz #1; contradiz #8; contradiz #9; contradiz #10; contradiz #11 |
| 37 | 3.4.7 #21 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte #12; corrobora em parte #13; corrobora em parte #14; corrobora em parte #15; corrobora em parte #16 |
| 38 | 3.4.7 #22 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 39 | 3.4.7 #23 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 40 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | contradiz frontend/container/src/App.tsx:5-10; contradiz #1; contradiz frontend/user-management-app/src/App.tsx:4-36 |
| 41 | 3.4.7 #25 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #1 |
| 42 | 3.4.7 #26 | 7 documentação | comentário | module-federation | tecnológica | fraca | contradiz #1; contradiz frontend/container/package.json:5-18; contradiz frontend/analytics-app/package.json:5-18; contradiz frontend/container/src/App.tsx:1-2 |
| 43 | 3.4.8 #1 | 8 histórico | histórico | — | arquitetural | fraca | explica #17 |
| 44 | 3.4.8 #2 | 8 histórico | histórico | — | arquitetural | fraca | explica #27; explica #28; explica #32 |
| 45 | 3.4.8 #3 | 8 histórico | histórico | — | arquitetural | fraca | explica #29; explica #30; explica #33; explica #34; explica #35; explica #36; explica #37; explica #40; explica #41; explica #42 |

## Resumo

Observações: 45. Dimensões (tecnologia: 0, configuração: 0, código: 1, estrutura: 6, composição: 4, build-deploy: 5, documentação: 26, histórico: 3). Força (forte: 5, moderada: 10, fraca: 30, ambígua: 0). Evidência (tecnológica: 2, arquitetural: 42, contexto: 1).

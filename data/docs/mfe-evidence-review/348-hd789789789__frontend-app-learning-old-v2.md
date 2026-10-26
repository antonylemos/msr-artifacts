---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
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

# 348 — hd789789789/frontend-app-learning-old-v2

## Leitura do repositório

A Learning é a única aplicação frontend local, com entrada e build próprios (#28, #32). Sua configuração de desenvolvimento resolve a Discussions MFE externa (#3), incorporada por iframe na aba de discussão e nas barras laterais antiga e nova (#5, #8, #11). Esses pontos implementam uma única relação ativa de incorporação (#30). A aba também recebe mensagens de navegação e altura (#27, #31). Na relação de comunicação, preserva-se a decisão registrada na 3.4.5: a tabela usa a Learning como origem e Discussions como destino, mas o fluxo efetivo das mensagens vai da Discussions para a Learning. Não há envio inverso demonstrado.

A dependência Frontend Plugin Framework (#1) e a afirmação de customização (#37) dizem respeito aos slots da Learning; não há plugin de outra aplicação configurado nas relações finais. O rodapé é biblioteca npm (#39). O script externo de experimentação, os iframes de conteúdo XBlock, os fragmentos locais e os eventos de testes não acrescentam unidades ou relações (#4, #6-7, #9-10, #12-26); public é parte da raiz (#29).

O build é separado, mas deploy e versionamento independente não são demonstrados (#32). O endereço de produção da Discussions está vazio no ambiente do snapshot (#2). A documentação identifica a Learning e descreve sua execução e o ambiente Tutor (#33-36), sem corroborar a configuração externa desse ambiente. A convenção de variáveis comuns a todas as MFEs tem apenas suporte local (#38); o histórico não resolve sua abrangência nem a origem temporal da afirmação (#40). Essa limitação não torna ambígua a composição explícita por iframe.

## Observações

### 1. package.json:48

**Observação:** O manifesto declara @openedx/frontend-plugin-framework na versão ^1.7.0 em dependencies.

**Interpretação:** É a declaração de uma tecnologia de extensão; a revisão de dependências registra Configurada Yes, mas a declaração isolada não estabelece uma relação entre aplicações.

### 2. .env:14

**Observação:** O ambiente de produção declara DISCUSSIONS_MFE_BASE_URL com valor vazio.

**Interpretação:** Há um parâmetro dedicado ao destino de composição da Learning, mas este ambiente não fornece o endereço para resolvê-lo.

**Nota:** Força moderada: embora nomeie o destino, o valor vazio não liga diretamente unidades por um endereço resolvível; a URL concreta tem observação própria em #3.

### 3. .env.development:14

**Observação:** O ambiente de desenvolvimento atribui http://localhost:2002 a DISCUSSIONS_MFE_BASE_URL.

**Interpretação:** A configuração do consumidor nomeia e resolve a Discussions MFE externa, destino dos iframes da Learning. Não demonstra implantação em produção.

### 4. public/index.html:9-11

**Observação:** O template insere um script de www.edx.org/optimizelyjs quando OPTIMIZELY_PROJECT_ID está definido.

**Interpretação:** É um serviço de experimentação de terceiros, registrado como Composição No; a URL externa não identifica outra unidade frontend.

### 5. src/course-home/discussion-tab/DiscussionTab.jsx:20-23; src/index.jsx:98-102; src/index.jsx:174

**Observação:** DiscussionTab monta discussionsUrl com DISCUSSIONS_MFE_BASE_URL, courseId e originalPath e a passa ao src de um iframe. A rota de discussão renderiza DiscussionTab, e a inicialização lê a variável de ambiente.

**Interpretação:** Liga a tela da Learning à Discussions MFE externa por incorporação ativa.

### 6. src/course-home/outline-tab/LmsHtmlFragment.jsx:13-28; src/course-home/outline-tab/LmsHtmlFragment.jsx:48-54

**Observação:** LmsHtmlFragment constrói wholePage com o HTML recebido por prop, base no LMS e script de redimensionamento, e o fornece ao srcDoc de um iframe.

**Interpretação:** É conteúdo de curso montado localmente; Composição No, sem outra unidade frontend.

### 7. src/courseware/course/content-tools/notes-visibility/NotesVisibility.test.jsx:70-73

**Observação:** Um teste cria um elemento iframe e lhe atribui o id unit-iframe.

**Interpretação:** É uma simulação de teste, sem participação na composição da aplicação.

### 8. src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:10; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:21-27; src/courseware/course/new-sidebar/sidebars/discussions-notifications/DiscussionsNotificationsSidebar.tsx:8; src/courseware/course/new-sidebar/sidebars/discussions-notifications/DiscussionsNotificationsSidebar.tsx:26; src/courseware/course/new-sidebar/sidebars/index.ts:1-8; src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26; src/courseware/course/sequence/Sequence.jsx:230

**Observação:** DiscussionsWidget monta a URL de categoria com DISCUSSIONS_MFE_BASE_URL, courseId e unitId e a usa no iframe com ?inContextSidebar. A nova barra renderiza o widget, consta de SIDEBARS e é selecionada pela flag do slot utilizado em Sequence.

**Interpretação:** A nova barra lateral incorpora a mesma Discussions MFE, com seleção ativa condicional.

### 9. src/courseware/course/sequence/Unit/ContentIFrame.jsx:55-64; src/courseware/course/sequence/Unit/ContentIFrame.jsx:75-77; src/courseware/course/sequence/Unit/urls.ts:26

**Observação:** ContentIFrame espalha propriedades que incluem src: iframeUrl; getIFrameUrl forma uma URL LMS_BASE_URL/xblock/id.

**Interpretação:** Exibe conteúdo XBlock servido pelo LMS, registrado como Composição No; uma unidade pedagógica não é outra unidade frontend da classificação.

### 10. src/courseware/course/sequence/Unit/ContentIFrame.jsx:80-100; src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:21-23

**Observação:** O ModalDialog de classe modal-lti pode renderizar iframe com modalOptions.url. O handler de plugin.modal recebe opções e abre o modal.

**Interpretação:** É um modal de conteúdo do curso, não uma relação adicional entre aplicações.

### 11. src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:13; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:23; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40-41; src/courseware/course/sidebar/sidebars/index.js:2; src/courseware/course/sidebar/sidebars/index.js:10-14; src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26

**Observação:** DiscussionsSidebar monta a URL de categoria com DISCUSSIONS_MFE_BASE_URL e a passa ao iframe com ?inContextSidebar. A barra consta de SIDEBARS; o slot seleciona a barra antiga quando a flag da nova visão está desligada.

**Interpretação:** A barra antiga incorpora a Discussions MFE. É outro ponto de uso da mesma relação, alternativo à nova barra.

### 12. src/course-home/courseware-search/hooks.test.jsx:137-139

**Observação:** O teste altera innerWidth e dispara um Event('resize') global.

**Interpretação:** Simula redimensionamento da janela em teste; não comunica unidades frontend.

### 13. src/course-home/discussion-tab/DiscussionTab.test.jsx:61-64

**Observação:** O teste envia uma mensagem de altura por window.postMessage e verifica a altura do iframe de discussão.

**Interpretação:** É simulação de mensagem em Jest; esta linha não implementa o canal de composição em produção.

### 14. src/course-home/outline-tab/LmsHtmlFragment.jsx:21-26; src/course-home/outline-tab/LmsHtmlFragment.jsx:37-45

**Observação:** O script gerado em srcDoc envia lmshtmlfragment.resize a window.parent; o componente escuta message e reajusta a altura.

**Interpretação:** A comunicação atende ao fragmento gerado pela própria Learning, sem conectar outra unidade frontend.

### 15. src/courseware/course/content-tools/notes-visibility/NotesVisibility.jsx:11-14; src/courseware/course/sequence/Unit/ContentIFrame.jsx:55-77; src/courseware/course/sequence/Unit/urls.ts:26

**Observação:** toggleNotes encontra unit-iframe e envia tools.toggleNotes por postMessage com a origem LMS_BASE_URL.

**Interpretação:** O destino é o conteúdo XBlock do curso, não a Discussions MFE nem outra unidade frontend da classificação.

### 16. src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:49-57; src/courseware/course/sequence/Unit/urls.ts:26

**Observação:** Um efeito envia hashName com o hash da janela ao contentWindow do iframe, usando LMS_BASE_URL como origem.

**Interpretação:** Sincroniza a navegação dentro do conteúdo XBlock; Composição No.

### 17. src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:104-119; src/courseware/course/sequence/Unit/urls.ts:26

**Observação:** updateIframeVisibility monta unit.visibilityStatus com posições de tela e envia os dados ao iframe do LMS por postMessage.

**Interpretação:** A mensagem marca a visibilidade do conteúdo do curso, sem constituir relação adicional entre unidades frontend.

### 18. src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:10-14

**Observação:** handleModalClose seleciona um iframe, fecha o estado do modal e envia plugin.modal-close a seu contentWindow.

**Interpretação:** Na revisão de código, o aviso pertence ao modal de conteúdo do curso, registrado como Composição No.

### 19. src/courseware/course/sidebar/sidebars/course-outline/CourseOutlineTray.test.jsx:104-106

**Observação:** O teste define innerWidth e dispara Event('resize') em window.

**Interpretação:** É evento interno de teste, sem composição entre aplicações.

### 20. src/generic/hooks.test.jsx:13-15

**Observação:** Um teste envia { test: 'test' } por window.postMessage e aguarda a chamada do handler.

**Interpretação:** Exercita useEventListener em teste; não é comunicação ativa entre unidades.

### 21. src/generic/hooks.test.jsx:36-43

**Observação:** O teste envia plugin.resize com height: 1234 por window.postMessage e verifica o estado de altura e carga.

**Interpretação:** É uma simulação de useIFrameHeight em Jest, não uma implementação adicional de composição.

### 22. src/setupTest.js:64-69; jest.config.js:3-5

**Observação:** O mock de HTMLDialogElement.prototype.showModal cria um CustomEvent('show_modal').

**Interpretação:** Criação de evento no ambiente jsdom, sem participação na composição.

### 23. src/setupTest.js:66-69; jest.config.js:3-5

**Observação:** O mesmo mock de showModal despacha onShowModal com this.dispatchEvent.

**Interpretação:** Despacho interno de teste, sem comunicação entre aplicações.

### 24. src/setupTest.js:70-73; jest.config.js:3-5

**Observação:** O mock de HTMLDialogElement.prototype.close cria um CustomEvent('close').

**Interpretação:** Criação de evento para simular diálogo em teste, sem composição.

### 25. src/setupTest.js:70-73; jest.config.js:3-5

**Observação:** O mock de close despacha onClose com this.dispatchEvent.

**Interpretação:** Despacho interno de teste, sem relação entre unidades frontend.

### 26. src/setupTest.js:124-133; jest.config.js:3-5

**Observação:** A função auxiliar loadUnit chama `window.postMessage(message, '*')`, usando por padrão uma mensagem plugin.resize de altura 300.

**Interpretação:** Simula a carga de conteúdo do curso em teste; não integra o build da aplicação.

### 27. src/course-home/discussion-tab/DiscussionTab.jsx:13-19; src/course-home/discussion-tab/DiscussionTab.jsx:25; src/generic/hooks.js:29-40; src/generic/hooks.js:47-60

**Observação:** DiscussionTab chama useIFramePluginEvents para tratar discussions.navigate e navegar ao caminho recebido. Também chama useIFrameHeight, que trata plugin.resize, para definir a altura do iframe; o hook registra o listener de message.

**Interpretação:** Implementa a recepção de navegação e altura na aba que embute Discussions. A chamada prepara o mecanismo de mensagens; a relação entre emissor externo e receptor é explicitada em #31.

### 28. .; src/index.jsx:41; public/index.html:17; webpack.prod.config.js:2-5; webpack.dev.config.js:2-4; package.json:13

**Observação:** A raiz contém package.json, src/index.jsx com createRoot, public/index.html com root e configurações que chamam createConfig para webpack-prod e webpack-dev. O script build chama fedx-scripts webpack.

**Interpretação:** Confirma a única unidade frontend local, Learning, com entrada e build próprios. A entrada e o template seguem a convenção do pacote externo de build, sem entry explícito no snapshot.

### 29. public/; public/index.html:17; webpack.prod.config.js:7-16

**Observação:** public contém o template com root, e o build da raiz copia public/static para dist/static.

**Interpretação:** É parte da aplicação da raiz, registrada como Unidade frontend No, sem entrada ou build independentes.

### 30. src/course-home/discussion-tab/DiscussionTab.jsx:20-23; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:21-27; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:23; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40-41; src/index.jsx:174; .env:14; .env.development:14

**Observação:** A relação 1 registra origem ., destino DISCUSSIONS_MFE_BASE_URL, tipo page → embedded-frontend, direção origem → destino, No snapshot No e Ativa Yes. Três iframes carregam esse destino; o ambiente de desenvolvimento fornece sua URL.

**Interpretação:** A Learning compõe a Discussions externa na aba e nas barras laterais. A ausência do código do destino no snapshot não elimina a ligação explícita. A URL de produção permanece em aberto no ambiente.

### 31. src/course-home/discussion-tab/DiscussionTab.jsx:13-19; src/course-home/discussion-tab/DiscussionTab.jsx:20-23; src/course-home/discussion-tab/DiscussionTab.jsx:25; src/generic/hooks.js:29-40; src/generic/hooks.js:59; src/index.jsx:174; .env.development:14

**Observação:** A relação 2 registra ., DISCUSSIONS_MFE_BASE_URL, communication, events, No snapshot No e Ativa Yes. A Learning recebe discussions.navigate e plugin.resize por message. A tabela usa direção origem → destino, com ressalva expressa e decisão registrada de que as mensagens vêm da Discussions para a Learning.

**Interpretação:** É um canal ativo de recepção de mensagens da unidade incorporada, que afeta navegação e altura. Preserva-se a convenção excepcional da revisão final: o fluxo efetivo vai do destino externo para a origem local; não se infere envio pela Learning.

### 32. package.json:13; webpack.prod.config.js:5-16; Makefile:54-66; .github/workflows/validate.yml:17-36; .env.development:8; .env.development:34; package.json:18-20

**Observação:** O build da aplicação chama fedx-scripts webpack, usa createConfig e copia os estáticos. A CI roda make validate.ci, incluindo npm run build; os artefatos enviados pelo workflow são de cobertura. A revisão registra Build separado, Deploy não observado e Versionamento No; os endereços citados são de desenvolvimento.

**Interpretação:** Confirma o limite de build da Learning, separado do código da Discussions externa. A relação publica identifica a unidade cujo build é produzido; não afirma deploy ou publicação do dist, ausentes na revisão.

### 33. README.rst:9-11

**Observação:** O README se apresenta como Learning MFE, responsável pelas páginas do curso voltadas ao estudante.

**Interpretação:** A afirmação identifica uma aplicação frontend e é corroborada pela unidade local e pela composição com Discussions; não implica várias aplicações locais.

### 34. README.rst:52-54

**Observação:** O README orienta excluir a Learning do container mfe do Tutor, que, segundo o texto, normalmente executa todas as MFEs.

**Interpretação:** Descreve a organização das aplicações no ambiente Tutor, sem corroboração no snapshot: falta a configuração externa de containers.

### 35. README.rst:60-61

**Observação:** O README afirma que o comando Tutor inicia LMS, Studio e MFEs exigidas, como authn e account.

**Interpretação:** Situa outras MFEs no ambiente da Learning, mas a inicialização desses serviços não tem corroboração no snapshot.

### 36. README.rst:62-63

**Observação:** O README orienta executar a Learning no host, em vez de um container gerenciado pelo Tutor.

**Interpretação:** A execução própria de desenvolvimento é corroborada pelos scripts start e dev e pelo build registrado; isso não demonstra independência de toda a plataforma.

### 37. README.rst:137-139

**Observação:** O README informa que a MFE pode ser customizada com Frontend Plugin Framework e aponta a documentação dos slots.

**Interpretação:** A capacidade de extensão é corroborada pela dependência e pelo HeaderSlot usado numa página roteada. Não exige substituição configurada nem estabelece outra aplicação.

### 38. README.rst:145-147

**Observação:** O README atribui a todas as MFEs um conjunto comum de variáveis obrigatórias de ambiente.

**Interpretação:** A corroboração é parcial: há ambiente e inicialização da Learning, mas não manifesto de outra MFE que demonstre o conjunto obrigatório comum às unidades.

### 39. src/plugin-slots/FooterSlot/README.md:12

**Observação:** O README do FooterSlot situa sua implementação no repositório frontend-component-footer.

**Interpretação:** A fronteira com a biblioteca externa é corroborada pela dependência npm e pelo uso de FooterSlot. É um componente incorporado ao build, sem demonstrar outra aplicação ou compartilhamento entre duas unidades.

### 40. 1308d1e 2021-08-06 (README.rst); d5a092b 2025-03-26 (README.rst)

**Observação:** A revisão histórica registra alterações do README em 1308d1e, cuja mensagem anuncia documentação das variáveis específicas da Learning, e em d5a092b, cuja mensagem anuncia atualização de links. O blob do README em 1308d1e não pôde ser lido localmente. O ponto ficou inconclusivo.

**Interpretação:** Não se resolve quando a afirmação geral de ambiente surgiu nem sua relação com outros estágios. A incerteza é histórica: o snapshot mantém corroboração parcial da convenção, sem indeterminar a composição com Discussions.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:48) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara src/plugin-slots/HeaderSlot/index.jsx:2 |
| 2 | 3.4.5 #1 (Configuração) | 2 configuração | configuração | iframe | arquitetural | moderada | configura #30 |
| 3 | 3.4.5 #1 (Configuração) | 2 configuração | configuração | iframe | arquitetural | forte | configura #5; configura #8; configura #11; configura #30 |
| 4 | 3.4.4 (public/index.html:10) | 3 código | código-fonte | — | contexto | fraca | — |
| 5 | 3.4.4 (src/course-home/discussion-tab/DiscussionTab.jsx:22) | 3 código | código-fonte | iframe | arquitetural | forte | implementa #30 |
| 6 | 3.4.4 (src/course-home/outline-tab/LmsHtmlFragment.jsx:48) | 3 código | código-fonte | iframe | contexto | fraca | — |
| 7 | 3.4.4 (src/courseware/course/content-tools/notes-visibility/NotesVisibility.test.jsx:72) | 3 código | código-fonte | — | contexto | fraca | — |
| 8 | 3.4.4 (src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:26) | 3 código | código-fonte | iframe | arquitetural | forte | implementa #30 |
| 9 | 3.4.4 (src/courseware/course/sequence/Unit/ContentIFrame.jsx:77) | 3 código | código-fonte | iframe | contexto | fraca | — |
| 10 | 3.4.4 (src/courseware/course/sequence/Unit/ContentIFrame.jsx:93) | 3 código | código-fonte | iframe | contexto | fraca | — |
| 11 | 3.4.4 (src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40) | 3 código | código-fonte | iframe | arquitetural | forte | implementa #30 |
| 12 | 3.4.4 (src/course-home/courseware-search/hooks.test.jsx:139) | 3 código | código-fonte | — | contexto | fraca | — |
| 13 | 3.4.4 (src/course-home/discussion-tab/DiscussionTab.test.jsx:62) | 3 código | código-fonte | — | contexto | fraca | — |
| 14 | 3.4.4 (src/course-home/outline-tab/LmsHtmlFragment.jsx:23) | 3 código | código-fonte | events | contexto | fraca | — |
| 15 | 3.4.4 (src/courseware/course/content-tools/notes-visibility/NotesVisibility.jsx:13) | 3 código | código-fonte | events | contexto | fraca | — |
| 16 | 3.4.4 (src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:55) | 3 código | código-fonte | events | contexto | fraca | — |
| 17 | 3.4.4 (src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:115) | 3 código | código-fonte | events | contexto | fraca | — |
| 18 | 3.4.4 (src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:13) | 3 código | código-fonte | events | contexto | fraca | — |
| 19 | 3.4.4 (src/courseware/course/sidebar/sidebars/course-outline/CourseOutlineTray.test.jsx:106) | 3 código | código-fonte | — | contexto | fraca | — |
| 20 | 3.4.4 (src/generic/hooks.test.jsx:14) | 3 código | código-fonte | — | contexto | fraca | — |
| 21 | 3.4.4 (src/generic/hooks.test.jsx:37) | 3 código | código-fonte | — | contexto | fraca | — |
| 22 | 3.4.4 (src/setupTest.js:67) | 3 código | código-fonte | — | contexto | fraca | — |
| 23 | 3.4.4 (src/setupTest.js:68) | 3 código | código-fonte | — | contexto | fraca | — |
| 24 | 3.4.4 (src/setupTest.js:71) | 3 código | código-fonte | — | contexto | fraca | — |
| 25 | 3.4.4 (src/setupTest.js:72) | 3 código | código-fonte | — | contexto | fraca | — |
| 26 | 3.4.4 (src/setupTest.js:132) | 3 código | código-fonte | — | contexto | fraca | — |
| 27 | 3.4.4 (fora da mineração, src/course-home/discussion-tab/DiscussionTab.jsx:14) | 3 código | código-fonte | events | arquitetural | moderada | implementa #31 |
| 28 | 3.4.3 (.) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 29 | 3.4.3 (public) | 4 estrutura | diretório | — | contexto | fraca | — |
| 30 | 3.4.5 #1 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #28; liga #3 |
| 31 | 3.4.5 #2 | 5 composição | código-fonte | events | arquitetural | forte | liga #28; liga #3 |
| 32 | 3.4.6 #1 | 6 build-deploy | configuração | — | arquitetural | moderada | publica #28 |
| 33 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #28; corrobora #30 |
| 34 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 35 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | — |
| 36 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #32 |
| 37 | 3.4.7 #5 | 7 documentação | documentação | other-mfe-framework | tecnológica | fraca | corrobora #1; corrobora src/plugin-slots/HeaderSlot/index.jsx:9-28 |
| 38 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte .env:6-8; corrobora em parte .env:26-28; corrobora em parte .env:40; corrobora em parte .env:51; corrobora em parte src/index.jsx:166-199 |
| 39 | 3.4.7 #7 | 7 documentação | documentação | — | contexto | fraca | corrobora package.json:37; corrobora src/tab-page/TabPage.jsx:8; corrobora src/tab-page/TabPage.jsx:84; corrobora src/generic/PageNotFound.jsx:6; corrobora src/generic/PageNotFound.jsx:44 |
| 40 | 3.4.8 #1 | 8 histórico | histórico | — | contexto | fraca | explica #38 |

## Resumo

Observações: 40. Dimensões (tecnologia: 1, configuração: 2, código: 24, estrutura: 2, composição: 2, build-deploy: 1, documentação: 7, histórico: 1). Força (forte: 6, moderada: 4, fraca: 30, ambígua: 0). Evidência (tecnológica: 2, arquitetural: 15, contexto: 23).

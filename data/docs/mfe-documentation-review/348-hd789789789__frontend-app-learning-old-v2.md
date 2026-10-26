---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
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

# 348 — hd789789789/frontend-app-learning-old-v2

## Leitura do repositório

A documentação está em inglês: README.rst na raiz, oito decisões em docs/decisions/, READMEs de src/generic/ e src/shared/ e trinta READMEs em src/plugin-slots/. Foram lidos todos os documentos listados como `documentation` na mineração e também o README.rst, presente no snapshot, embora não listado com esse tipo. O README identifica a aplicação como Learning MFE, descreve o desenvolvimento integrado ao Tutor e remete o deploy à documentação geral da Open edX (README.rst:9-11, :24-28, :128-133). Essa remissão não especifica hospedagem nem demonstra uma implantação: a revisão 3.4.6 #1 registra build separado e deploy não observado. A documentação não explica a relação concreta com a Discussions MFE que a revisão 3.4.5 #1 encontra nos iframes da aba e das barras laterais (src/course-home/discussion-tab/DiscussionTab.jsx:20-23; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:23, :40-41; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:21, :26-27).

Os ADRs tratam sobretudo da organização interna da aplicação, APIs, Redux, testes e navegação entre conteúdos do curso. As “units” dos ADRs são unidades de conteúdo pedagógico, não aplicações frontend: o HTML XBlock vem de uma URL do LMS (src/courseware/course/sequence/Unit/urls.ts:26) e entra no ContentIFrame (src/courseware/course/sequence/Unit/ContentIFrame.jsx:55-77), conforme a distinção já registrada na 3.4.4. Por isso, as ocorrências `doc-integration-technology` em docs/decisions/0002-courseware-page-decisions.md:16, :22, :40 e docs/decisions/0009-courseware-api-direction.md:21, :48 ficam nesta leitura, como descrição de conteúdo incorporado e intenções futuras, sem virar afirmações sobre composição de unidades frontend. As ocorrências `doc-mfe-term` em docs/decisions/0002-courseware-page-decisions.md:22, :24, :51, docs/decisions/0003-course-home-decisions.md:5, docs/decisions/0006-thunk-and-api-naming.md:7 e docs/decisions/0008-liberal-courseware-path-handling.md:24, :37 usam MFE como nome da aplicação ao explicar decisões internas ou planos. Não afirmam novas fronteiras ou independência entre aplicações.

Também ficam fora da tabela as ocorrências `doc-mfe-term` em src/generic/README.md:3, :7 e src/shared/README.md:3: descrevem reutilização entre componentes internos e uma possível extração futura, sem demonstrar biblioteca compartilhada entre duas unidades. Os READMEs de slots descrevem pontos de extensão da própria Learning MFE, suas props, conteúdo padrão e exemplos de env.config.jsx; seus blocos de código são exemplos, não configuração ativa. A capacidade geral de extensão aparece na afirmação 5. Em particular, as ocorrências `doc-integration-technology` em src/plugin-slots/ContentIFrameErrorSlot/README.md:1, :3, :9, :20, src/plugin-slots/ContentIFrameLoaderSlot/README.md:1, :3, :6, :14, :22, :30, :36 e src/plugin-slots/README.md:5 são títulos, identificadores, descrição funcional de erro/carregamento do conteúdo e exemplos, não afirmações de integração entre aplicações. A árvore comentada de docs/decisions/0007-testing.md:40-47 organiza fixtures e acesso a dados dentro de courseware, sem dividir unidades frontend. Não há documento de template de ferramenta entre os textos lidos.

Foram lidos os comentários e campos descritivos de package.json, catalog-info.yaml, Makefile, webpack.dev.config.js, webpack.prod.config.js, example.env.config.jsx, .env, .env.development, .env.test, .dockerignore, .npmignore, public/index.html e todos os workflows de .github/workflows/, além de src/index.jsx, src/tab-page/TabPage.jsx, src/generic/PageNotFound.jsx, src/generic/hooks.js, src/plugin-slots/HeaderSlot/index.jsx, src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx e dos três componentes de discussão citados acima. Foram lidos ainda os comentários de src/courseware/course/sequence/Unit/ContentIFrame.jsx e urls.ts. A descrição de catalog-info.yaml:8 repete a afirmação 1; package.json:4 só nomeia a aplicação. Os comentários de src/generic/hooks.js:25-28, :42-45 descrevem callbacks de mensagens e altura do iframe, e o de ContentIFrame.jsx:9-17 explica permissões de conteúdo externo, sem nomear uma nova relação entre unidades. Os demais comentários tratam de tradução, ferramentas, variáveis ou gestão de issues. A configuração por ambiente no build (README.rst:144) e os exemplos de módulos locais (README.rst:103-126) ficam como contexto de configuração e desenvolvimento; não demonstram compartilhamento efetivo entre aplicações.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.rst:9-11 | "This is the Learning MFE (micro-frontend application)" | estrutura | corroborada | 3.4.3 (unidade `.`); 3.4.5 #1; src/index.jsx:98-102; src/course-home/discussion-tab/DiscussionTab.jsx:20-23 |
| 2 | README.rst:52-54 | "it should be excluded from the `mfe` container that otherwise runs every MFE" | build-deploy | sem corroboração | — |
| 3 | README.rst:60-61 | "This command will start the LMS and Studio, and other required MFEs like `authn` and `account`" | independência | sem corroboração | — |
| 4 | README.rst:62-63 | "the learning MFE, which we're going to run on the host instead of in a container managed by Tutor" | independência | corroborada | 3.4.6 #1; package.json:18-20; webpack.dev.config.js:2-4 |
| 5 | README.rst:137-139 | "This MFE can be customized using Frontend Plugin Framework" | composição | corroborada | 3.4.2 (@openedx/frontend-plugin-framework, configurada `Yes`); package.json:48; src/plugin-slots/HeaderSlot/index.jsx:2, :9-28; src/generic/PageNotFound.jsx:8, :20 |
| 6 | README.rst:145-147 | "All micro-frontends have a shared set of required environment variables" | outro | parcial | package.json:41; .env:6-8, :26-28, :40, :51; .env.development:6-8, :25-27, :50-51; src/index.jsx:166-199 |
| 7 | src/plugin-slots/FooterSlot/README.md:12 | "The implementation of the `FooterSlot` component lives in the `frontend-component-footer` repository" | estrutura | corroborada | package.json:37; src/tab-page/TabPage.jsx:8, :84; src/generic/PageNotFound.jsx:6, :44 |

## Observações

**1. README.rst:9-11.** A identificação como Learning MFE é repetida em catalog-info.yaml:8 e, como comparação com outras MFEs da plataforma, em README.rst:131-133. A revisão 3.4.3 encontra uma aplicação local, e a 3.4.5 #1 confirma sua participação numa composição: a rota de discussão renderiza DiscussionTab (src/index.jsx:98-102), que incorpora a Discussions MFE por URL (src/course-home/discussion-tab/DiscussionTab.jsx:20-23). “MFE” aqui não implica que o snapshot contenha várias aplicações locais.

**2. README.rst:52-54.** O texto atribui ao container `mfe` do Tutor a execução conjunta das MFEs e orienta retirar a Learning dessa execução. Não há configuração do Tutor ou de containers no snapshot que confirme ou contradiga essa organização. A recomendação de Tutor em README.rst:24-28 e o comando em :67 são instruções, não artefatos de implantação. A revisão 3.4.6 não observa deploy.

**3. README.rst:60-61.** O texto atribui ao comando do Tutor a inicialização de LMS, Studio e das MFEs authn e account. A inicialização desses serviços pelo Tutor, e quais deles são obrigatórios, não têm configuração verificável neste snapshot. A afirmação fica sem corroboração.

**4. README.rst:62-63.** A execução da Learning no host tem suporte nos scripts próprios de servidor de desenvolvimento (package.json:18-20; webpack.dev.config.js:2-4), conforme a revisão 3.4.6 #1. A afirmação é corroborada; não equivale a afirmar funcionamento isolado de toda a plataforma. README.rst:98 repete a execução da Learning no host, dentro de um comando de troubleshooting.

**5. README.rst:137-139.** O pacote é dependência efetiva (package.json:48), e o HeaderSlot envolve o cabeçalho padrão num PluginSlot com identificador próprio (src/plugin-slots/HeaderSlot/index.jsx:9-28), usado em uma página roteada (src/generic/PageNotFound.jsx:8, :20; src/index.jsx:54). Isso sustenta a capacidade de customização, sem exigir que exista uma substituição configurada. Os READMEs específicos detalham extensões internas, e example.env.config.jsx:1-24 é somente exemplo; a revisão 3.4.5 não o trata como composição ativa com outra aplicação.

**6. README.rst:145-147.** Há configuração local de autenticação, sessão e endereço da aplicação (.env:6-8, :26-28, :40, :51), dependência de frontend-platform (package.json:41) e inicialização com mescla de configuração (src/index.jsx:166-199). Isso confirma o lado Learning da convenção descrita. Nenhuma segunda MFE tem seu manifesto de ambiente no snapshot; a Discussions é apenas destino externo. Portanto não se confirma o conjunto obrigatório comum a todas as MFEs, nem uso compartilhado por duas unidades, e a corroboração fica parcial.

**7. src/plugin-slots/FooterSlot/README.md:12.** A fronteira entre aplicação e biblioteca é confirmada: FooterSlot é importado de @edx/frontend-component-footer (src/tab-page/TabPage.jsx:8, :84; src/generic/PageNotFound.jsx:6, :44), dependência npm declarada em package.json:37. Sua implementação não está em src/plugin-slots/FooterSlot/, que contém a documentação. É um componente de pacote externo, não outra aplicação frontend nem evidência de que duas unidades compartilhem o rodapé.

## Resumo

Afirmações: 7 (corroborada: 4, parcial: 1, contradita: 0, sem corroboração: 2). Temas: (estrutura: 2, composição: 1, build-deploy: 1, independência: 2, outro: 1).

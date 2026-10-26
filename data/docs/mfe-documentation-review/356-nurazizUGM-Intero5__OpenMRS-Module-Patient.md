---
schema: 1
id: 997746951
full_name: nurazizUGM-Intero5/OpenMRS-Module-Patient
commit: c490ce752bac4d0772f28778fe81434dd6c57a00
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

# 356 — nurazizUGM-Intero5/OpenMRS-Module-Patient

## Leitura do repositório

Foram lidos integralmente o README raiz e os 19 READMEs dos pacotes, todos em inglês e específicos do projeto, sem README de template ou documento de terceiros. A documentação apresenta widgets do prontuário OpenMRS, um chart que fornece layout e pontos de extensão e uma biblioteca compartilhada. As revisões 3.4.2–3.4.6 têm status `final` e o mesmo commit da classificação e da aquisição. Os artefatos sustentam esse conjunto, mas a lista do README conserva um pacote Biometrics inexistente e chama a common-lib de microfrontend (README.md:7-26; packages/esm-patient-common-lib/src/index.ts:1-23). Não se altera a classificação nem as etapas anteriores.

As ocorrências doc-* em README.md:7, :23, :46, :50 e :56 e packages/esm-patient-chart-app/README.md:3 estão na tabela. As de README.md:40 e :48 são introduções às instruções de desenvolvimento; a de README.md:165 é encaminhamento para documentação externa de distribuição, sem afirmação de deploy neste snapshot. Os blocos de comandos (README.md:36-38, :42-44, :52-54, :62-109, :122-131; packages/esm-generic-patient-widgets-app/README.md:9-11) foram lidos como exemplos, sem linhas próprias. A frase verificável que acompanha o exemplo Biometrics/Vitals consta da tabela. Não se consultaram os links externos: eles não são artefatos do snapshot.

Os READMEs de allergies, attachments, banner, conditions, immunizations, medications, notes, programs, tests e vitals descrevem sobretudo funções clínicas e aparência dos widgets (README.md:3 de cada pacote); tests também contém um guia de hierarquia de conceitos e filtros (packages/esm-patient-tests-app/README.md:9-71), sem afirmação sobre fronteiras frontend. A biblioteca de motor React é um detalhe interno do wrapper (packages/esm-form-engine-app/README.md:3; packages/esm-form-engine-app/package.json:5; packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:4). A escolha de motor em forms é contexto funcional (packages/esm-patient-forms-app/README.md:3); a composição observável passa pelo form-widget-slot (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95), e o snapshot contém tanto o wrapper Angular quanto o React (3.4.5 #1 e #44). As URLs ampath-forms.vercel.app são links da documentação do motor, não declaração de hospedagem dos apps.

Foram lidos os comentários e campos descritivos dos artefatos citados nas revisões anteriores: package.json raiz e dos 19 pacotes, configurações webpack/Angular/Turbo, workflows em .github/workflows/, Dockerfiles, scripts e Compose de e2e/support/bamboo/ e e2e/support/github/, entradas src/index.ts, registros src/routes.json e arquivos de composição referenciados na 3.4.5 (slots, workspaces, modais, stores, interop e wrappers). As afirmações arquiteturais dos comentários estão abaixo. Os demais comentários tratam de traduções, manutenção, operações internas, regras de formulário e aparência; por exemplo, packages/esm-form-engine-app/src/index.ts:32-93 e packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:10-16. O comentário sobre o current visit afirma compartilhamento de estado entre o chart e o Active Visit Tag do patient search (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:28-31); essa afirmação está na tabela. A limpeza local é comprovada pelo callback que chama setCurrentVisit(null, null) (:32-36 do mesmo artefato), mas o consumo externo não está demonstrado no snapshot. Os callbacks de extensões em packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:615-640 documentam o contrato interno do slot, sem afirmar consumidor em outra unidade. O ambiente Docker é de testes, não prova de implantação produtiva (e2e/support/github/Dockerfile:11-15).

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:7-21 | "It contains various microfrontends that constitute widgets in a patient dashboard" | estrutura | corroborada | 3.4.3 Unidades; 3.4.5 #11-22 |
| 2 | README.md:11 | "Biometrics" | estrutura | contradita | 3.4.3 Unidades; packages/esm-patient-vitals-app/README.md:3 |
| 3 | README.md:23-26 | "two other microfrontends exist that encapsulate cross-cutting concerns" | estrutura | contradita | 3.4.3 Unidades; packages/esm-patient-common-lib/src/index.ts:1-23; packages/esm-patient-common-lib/package.json:9-13 |
| 4 | README.md:32 | "This monorepo uses yarn" | estrutura | corroborada | package.json:5-7; package.json:87 |
| 5 | README.md:46 | "a dev server running `esm-patient-chart` as well as the specified microfrontend" | composição | parcial | package.json:9; packages/esm-patient-allergies-app/package.json:10-11 |
| 6 | README.md:50 | "run the biometrics and vitals microfrontends simultaneously" | composição | contradita | 3.4.3 Unidades; packages/esm-patient-vitals-app/package.json:10-11 |
| 7 | README.md:56 | "run `yarn serve` from within the individual packages and then use import map overrides" | composição | parcial | packages/esm-patient-allergies-app/package.json:11; packages/esm-form-entry-app/package.json:11; 3.4.5 Leitura do repositório |
| 8 | README.md:145 | "The patient header contains the patient banner" | composição | corroborada | packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-banner-app/src/routes.json:22-24 |
| 9 | README.md:149 | "A dashboard is a collection of widgets" | composição | corroborada | packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69-78; 3.4.5 #11-22 |
| 10 | e2e/support/github/run-e2e-docker-env.sh:7 | "get a list of all the apps in this workspace" | estrutura | contradita | e2e/support/github/run-e2e-docker-env.sh:8 |
| 11 | e2e/support/github/run-e2e-docker-env.sh:26-28 | "prepending the login app and primary navigation apps" | composição | contradita | e2e/support/github/run-e2e-docker-env.sh:29-38 |
| 12 | packages/esm-form-entry-app/README.md:3 | "It's essentially a wrapper around an Angular application" | composição | corroborada | packages/esm-form-entry-app/src/bootstrap.ts:12-23; packages/esm-form-entry-app/src/routes.json:8-13; 3.4.5 #1-2 |
| 13 | packages/esm-generic-patient-widgets-app/README.md:3 | "a generic widget that can be added to the patient chart using configuration" | composição | corroborada | packages/esm-generic-patient-widgets-app/src/routes.json:6-15; packages/esm-generic-patient-widgets-app/src/config-schema.ts:3-23; 3.4.5 #9 |
| 14 | packages/esm-patient-chart-app/README.md:3 | "provides the underlying framework on top of which all the individual widgets are run" | composição | corroborada | 3.4.5 #11-22; packages/esm-patient-chart-app/src/root.component.tsx:11-16; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47-92; packages/esm-patient-chart-app/src/index.ts:33-42 |
| 15 | packages/esm-patient-chart-app/src/index.ts:27-28 | "allows @openmrs/esm-patient-common-lib to be accessed by modules that are not using webpack. This is used for ngx-formentry." | composição | parcial | packages/esm-patient-chart-app/src/index.ts:7-8; packages/esm-patient-chart-app/src/index.ts:29; packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:3 |
| 16 | packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:28-31 | "Anything used outside the patient chart [...] must be updated in the callback, which is called when the patient chart unmounts" | outro | parcial | packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:4; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:32-36 |
| 17 | packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:15 | "used not in the refapp, but in other distributions" | composição | sem corroboração | — |
| 18 | packages/esm-patient-common-lib/README.md:3 | "components and utilities shared across widgets in the patient chart" | outro | corroborada | packages/esm-patient-allergies-app/src/index.ts:10; packages/esm-patient-chart-app/src/index.ts:7-8; packages/esm-patient-common-lib/src/index.ts:1-23 |
| 19 | packages/esm-patient-common-lib/src/orders/store.ts:4-7 | "different parts of the application may manage their own order lists" | outro | corroborada | 3.4.5 #36-37; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-40; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38 |
| 20 | packages/esm-patient-flags-app/README.md:3 | "Flags are displayed in the Patient Summary" | composição | corroborada | 3.4.5 #21; packages/esm-patient-flags-app/src/routes.json:25-30 |
| 21 | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:14 | "listen for a message from HFE-UI to close the workspace" | composição | corroborada | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19; 3.4.5 #45 |
| 22 | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:21 | "hide the headers and breadcrumbs of the O2 page on load" | composição | corroborada | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:22-43; 3.4.5 #3 |
| 23 | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27 | "tells HFE-UI to send a message to the parent window to close the workspace when the form is saved or cancelled" | composição | parcial | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19 |
| 24 | packages/esm-patient-lists-app/README.md:3-8 | "The Patient Lists app renders a workspace in the Patient Chart" | estrutura | corroborada | packages/esm-patient-lists-app/src/routes.json:13-29; 3.4.3 Unidades |
| 25 | packages/esm-patient-orders-app/package.json:5 | "Microfrontend for the OpenMRS SPA providing the order basket for the patient chart" | estrutura | corroborada | 3.4.3 Unidades; 3.4.5 #50-51; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38 |

## Observações

**1. README.md:7-21.** A descrição do conjunto é confirmada pelas unidades e seus registros de extensões. A lista identifica allergies, attachments, conditions, forms, immunizations, medications, notes, banner, chart, programs, tests e vitals; as descrições individuais dos respectivos README.md:3 e package.json:5 repetem esses papéis, sem linhas adicionais. Biometrics é separado abaixo porque recebe outra corroboração. A lista não pretende enumerar os 18 apps atuais.

**2. README.md:11.** O item é uma afirmação de existência de widget com pacote próprio: aponta para packages/esm-patient-biometrics-app/README.md. Esse diretório não existe no snapshot. Biometrics aparece como funcionalidade do vitals, não como aquela unidade separada (packages/esm-patient-vitals-app/README.md:3).

**3. README.md:23-26.** A frase chama Common lib e Patient chart de dois microfrontends. O chart é unidade frontend, mas a common-lib é uma biblioteca de reexportações, sem routes.json nem build próprio. Seu papel transversal existe; contá-la como microfrontend contradiz os artefatos. O próprio packages/esm-patient-common-lib/README.md:3 descreve-a como biblioteca.

**4. README.md:32.** Workspaces packages/* e packageManager yarn@4.9.1 corroboram monorepo e ferramenta.

**5. README.md:46.** O script raiz fixa o chart como source e permite encaminhar argumentos ao openmrs develop. O servidor e o processamento adicional de --sources pertencem ao tooling externo, ausente do snapshot; a configuração local confirma a intenção, mas não toda a execução descrita.

**6. README.md:50.** A frase afirma que essas duas unidades podem compor o ambiente simultâneo; o exemplo de README.md:53 usa o diretório inexistente esm-patient-biometrics-app. Vitals tem servidor próprio, mas Biometrics não existe como pacote. É uma propriedade diferente da simples existência registrada na afirmação anterior sobre Biometrics.

**7. README.md:56.** Os scripts serve por app são observáveis. Não há import map nem implementação de overrides no snapshot; essa parte é delegada ao shell/tooling externo. A frase não afirma que os módulos montem uma página isolada.

**8. README.md:145.** O chart monta patient-header-slot e o banner registra patientBanner nesse slot. A localização na tela e as notificações são detalhes visuais, sem novas afirmações arquiteturais.

**9. README.md:149.** DashboardView monta o slot do dashboard e renderiza cada extensão. A descrição de layout em README.md:135-153 contextualiza essa composição; menu, cores e ocupação da tela não são fronteiras adicionais.

**10. e2e/support/github/run-e2e-docker-env.sh:7.** O comentário promete todos os apps, mas o filtro exclui expressamente form-entry-app. A lista contém os outros 17 apps e não a biblioteca. Trata-se do conjunto destinado ao ambiente e2e, não de uma nova contagem do produto.

**11. e2e/support/github/run-e2e-docker-env.sh:26-28.** O comentário descreve a montagem dos módulos na imagem. O objeto efetivamente prefixado contém esm-primary-navigation-app e esm-home-app, não login. Os arquivos empacotados locais são mapeados para /app, como diz a continuação do comentário; a divergência sobre login torna a frase contradita.

**12. packages/esm-form-entry-app/README.md:3.** O widget expõe uma aplicação Angular por lifecycles singleSpaAngular e pelo form-widget-slot consumido por forms e vitals. O campo description em packages/esm-form-entry-app/package.json:5 repete a identificação Angular. A transformação de JSON em formulários e o funcionamento interno do motor não recebem linhas próprias.

**13. packages/esm-generic-patient-widgets-app/README.md:3.** O módulo oferece a extensão switchableObs sem slot fixo, com esquema de configuração. Isso sustenta a possibilidade de atribuí-la por configuração; a intenção de reutilização futura não é evidência de múltiplos consumidores. A description do package.json:5 repete seu papel de widget genérico.

**14. packages/esm-patient-chart-app/README.md:3.** O chart fornece layout, roteamento, workspace e pontos de extensão do prontuário; não se deve confundir esse papel com o shell OpenMRS externo que carrega os bundles. O roteamento local escolhe resumo e dashboards; startupApp instala sincronização offline e rotas cacheáveis. README.md:23-26 e packages/esm-patient-chart-app/package.json:5 reiteram o papel do chart. Visitas, menus e modo offline são capacidades da unidade citadas na mesma frase, não outras unidades.

**15. packages/esm-patient-chart-app/src/index.ts:27-28.** A atribuição a window disponibiliza a biblioteca. Existe import de @openmrs/ngx-formentry no app Angular, mas não há consumidor de _openmrs_esm_patient_common_lib no snapshot além da atribuição. A disponibilidade está confirmada; o consumo alegado e a propriedade de não usar webpack desse consumidor externo não estão demonstrados.

**16. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:28-31.** O comentário afirma que o estado da visita atual é usado fora do chart pelo Active Visit Tag do patient search e que deve ser atualizado no callback de desmontagem. O lado local está comprovado: setCurrentVisit é importado do framework (:4 do mesmo artefato) e o cleanup do useEffect chama setCurrentVisit(null, null) (:32-36). O consumidor Active Visit Tag do patient search não está demonstrado no snapshot; a limpeza local não comprova o compartilhamento alegado com essa unidade externa. Por isso, a afirmação é parcial.

**17. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:15.** O componente e suas chamadas a workspaces estão presentes nas linhas 17-30 do mesmo artefato, mas os manifests das distribuições que confirmariam onde é usado ou excluído não estão no snapshot. Sua existência não confirma uso efetivo em outras distribuições.

**18. packages/esm-patient-common-lib/README.md:3.** Há consumidores reais em ao menos duas unidades, não apenas um pacote disponível: allergies usa createDashboardLink e chart importa a biblioteca e o mesmo helper. As reexportações incluem cards, empty-state, error-state, pagination e workspaces. A description em packages/esm-patient-common-lib/package.json:5 repete a finalidade da biblioteca.

**19. packages/esm-patient-common-lib/src/orders/store.ts:4-7.** O store indexa itens por paciente e grupo. Medications usa o grupo medications, enquanto orders lê o conjunto sem grupo. O comentário de packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:71-78 detalha a mesma afirmação e não gera duplicação. Isso documenta compartilhamento de estado entre unidades.

**20. packages/esm-patient-flags-app/README.md:3.** O papel do módulo e sua integração ao resumo do chart são sustentados pela relação de composição já registrada. packages/esm-patient-flags-app/package.json:5 repete a existência do módulo; a description de packages/esm-patient-flags-app/src/routes.json:40 repete a integração ao resumo; o hook de API descrito no README.md:7 é funcionamento interno e não outra afirmação.

**21. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:14.** O receptor verifica event.data igual a close-workspace e chama o fechamento. Esse contrato de comunicação é explícito, embora a página emissora externa não esteja no snapshot.

**22. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:21.** O comentário identifica a integração da página O2 embutida: o iframe recebe src e o onLoad remove header, patient-header e breadcrumbs. A remoção visual isoladamente não seria linha; aqui identifica a adaptação da unidade frontend externa dentro do workspace.

**23. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27.** A URL aponta para htmlformentryui e inclui returnUrl=post-message:close-workspace, com receptor correspondente. A emissão nos eventos de salvar/cancelar pertence à página externa, ausente do snapshot, portanto só o lado local do contrato é corroborado. Distingue-se da afirmação do receptor pelo sujeito e pela propriedade verificável.

**24. packages/esm-patient-lists-app/README.md:3-8.** O módulo declara workspaces patient-lists e patient-list-details. Seu papel restrito ao prontuário é diferente do app de gerenciamento da home, que não está neste snapshot; não se afirma integração observada com esse app externo. A description em packages/esm-patient-lists-app/package.json:5 repete o papel local.

**25. packages/esm-patient-orders-app/package.json:5.** Orders é unidade frontend própria e agrega os pedidos do carrinho. Seu README.md:3-4 descreve a função de negócio de acesso a pedidos, enquanto a description torna explícito o papel de microfrontend. As relações 50 e 51 documentam a composição com medications e tests.

## Resumo

Afirmações: 25 (corroborada: 14, parcial: 5, contradita: 5, sem corroboração: 1). Temas: (estrutura: 7, composição: 15, outro: 3).

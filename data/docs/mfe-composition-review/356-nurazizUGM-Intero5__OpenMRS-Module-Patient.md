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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 356 — nurazizUGM-Intero5/OpenMRS-Module-Patient

## Leitura do repositório

É uma cópia do monorepo `openmrs-esm-patient-chart`, o módulo de frontend do OpenMRS 3 que reúne
"various microfrontends that constitute widgets in a patient dashboard" (README.md:7). As 18 unidades
`packages/esm-*-app` são módulos ESM: cada uma declara em `src/routes.json` as extensões (componente +
slot), workspaces e modais que oferece. O app shell do OpenMRS, que carrega os módulos pelo import map
e monta essas declarações, não está no snapshot: o desenvolvimento usa o tooling externo `openmrs`
(package.json:9, `openmrs develop`) e import map overrides (README.md:56). Por isso nenhuma unidade
do snapshot é host de todas; cada unidade é host das outras nos pontos em que monta um slot ou abre um
workspace ou modal pelo nome. O propósito é de produto, herdado do upstream, com um único commit do
titular, sem efeito na composição.

Quase todas as relações (45 de 58) são `host → remote`, 43 delas com mecanismo `other`: a origem monta um
`ExtensionSlot` ou chama `launchWorkspace`/`launchPatientWorkspace`, `useLaunchWorkspaceRequiringVisit`,
`showModal` ou `closeWorkspace` com um nome, e o framework `@openmrs/esm-framework` carrega o
componente que o destino registrou com esse nome no seu `routes.json`. O Destino foi resolvido por
esse nome de slot, workspace ou modal. O tipo é `host → remote` porque o destino entra na origem como
componente exposto e carregado em runtime; o mecanismo é `other` porque não é Module Federation nem
`registerApplication` feitos pela origem, e sim o sistema de extensões do framework. A exceção são as
relações 1 e 2, com destino `packages/esm-form-entry-app`: o componente `formWidget` desse app Angular
importa `./bootstrap` (packages/esm-form-entry-app/src/index.ts:66), que gera e exporta lifecycles
`singleSpaAngular` (packages/esm-form-entry-app/src/bootstrap.ts:12-23), e por isso o mecanismo
registrado foi `single-spa`. Esse é o único lugar do snapshot em que a base single-spa e o container
Module Federation que o shell carrega (packages/esm-form-entry-app/webpack.config.js:70-76) estão
visíveis. Nos 17 apps React o `webpack.config.js` só delega ao pacote externo
`openmrs/default-webpack-config`.

O centro da composição é `packages/esm-patient-chart-app`, a página do prontuário. Ele monta o banner,
a barra de flags, a navegação lateral e os dashboards a partir dos slots preenchidos pelas outras
unidades, e abre workspaces delas. As unidades de pedidos (`orders`, `medications`, `tests`) se abrem
mutuamente pelo carrinho `order-basket`. O motor de formulários (`form-engine` e `form-entry`) entra
pelo `form-widget-slot` de `forms` e `vitals`. Muitas chamadas passam por helpers da biblioteca
`packages/esm-patient-common-lib`, que a revisão estrutural não conta como unidade. Nesses casos a
Origem é a unidade que chama o helper. Assim, `useLaunchWorkspaceRequiringVisit` abre o modal
`visit-context-switcher` ou o `start-visit-dialog` do chart quando não há visita
(packages/esm-patient-common-lib/src/workspaces.ts:52-63), e isso liga ao chart cada unidade que usa o
hook.

Há também troca de estado e mensagens. Os dois stores globais da biblioteca, `order-basket` e
`patient-chart-global-store`, são criados por `createGlobalStore` e compartilhados pelo nome no
framework, um serviço reativo; viraram `communication` com mecanismo `events` (relações 36-43). O
módulo de flags escuta o `single-spa:routing-event` do shell (relação 6). O `forms` embute a página
HFE-UI do OpenMRS 2.x num iframe e recebe dela um `postMessage` (relações 3 e 45). O `form-engine`
troca dois eventos de `window` cuja outra ponta não está no snapshot (relações 4 e 5).

Treze relações têm destino só nomeado: slots que nenhum `routes.json` do snapshot preenche (por
exemplo `top-of-all-patient-dashboards-slot`, `visit-form-top-slot`, `medication-info-slot`), slots
de nome dinâmico e o workspace `appointments-form-workspace`. Podem ser preenchidos por módulos de
outros repositórios ou ficar vazios, por isso Destino com o nome, No snapshot e Ativa `Undetermined`.
O que não virou relação: os slots, workspaces e modais que a unidade monta de si mesma (internos,
como já registra a revisão de código-fonte); o ramo sem visita de `launchFormEntryOrHtmlForms`
quando o próprio chart o chama, que abre o `start-visit-dialog` do chart
(packages/esm-patient-common-lib/src/form-entry-interop.ts:51-53); com visita, a mesma chamada
(packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:242, :287)
abre os workspaces de formulário do forms (packages/esm-patient-common-lib/src/form-entry-interop.ts:28-50)
e entra na relação 10; as extensões registradas em slots que nenhuma
unidade do snapshot monta (por exemplo `action-menu-patient-chart-items-slot`, packages/esm-patient-lists-app/src/routes.json:10,
montado pelo shell externo). Por isso `packages/esm-patient-lists-app` fica sem relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | packages/esm-patient-forms-app | packages/esm-form-entry-app | host → remote | origem → destino | single-spa | Yes | Yes | packages/esm-form-entry-app/src/routes.json:9-11 (extensão `form-widget`, componente `formWidget`, em `form-widget-slot`); packages/esm-form-entry-app/webpack.config.js:70-76 (`ModuleFederationPlugin` com `name` do package.json e `exposes` `./start`) | packages/esm-form-entry-app/src/bootstrap.ts:21; packages/esm-form-entry-app/src/bootstrap.ts:22; packages/esm-form-entry-app/src/bootstrap.ts:23; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95 |
| 2 | packages/esm-patient-vitals-app | packages/esm-form-entry-app | host → remote | origem → destino | single-spa | Yes | Yes | packages/esm-form-entry-app/src/routes.json:9-11 (extensão `form-widget`, componente `formWidget`, em `form-widget-slot`); packages/esm-form-entry-app/webpack.config.js:70-76 (`ModuleFederationPlugin` com `name` do package.json e `exposes` `./start`) | packages/esm-form-entry-app/src/bootstrap.ts:21; packages/esm-form-entry-app/src/bootstrap.ts:22; packages/esm-form-entry-app/src/bootstrap.ts:23; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249 |
| 3 | packages/esm-patient-forms-app | htmlformentryui | page → embedded-frontend | origem → destino | iframe | No | Yes | — | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43 |
| 4 | packages/esm-form-engine-app | openmrs:form-view-embedded | communication | Undetermined | events | Undetermined | Undetermined | — | packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15 |
| 5 | packages/esm-form-engine-app | openmrs:form-collapse-toggle | communication | origem → destino | events | Undetermined | Undetermined | — | packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23; packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24 |
| 6 | packages/esm-patient-flags-app | single-spa | communication | origem → destino | events | No | Yes | — | packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56 |
| 7 | packages/esm-form-engine-app | packages/esm-patient-forms-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-forms-app/src/routes.json:85 (workspace `clinical-forms-workspace`) | packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20; packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42 |
| 8 | packages/esm-form-entry-app | packages/esm-patient-chart-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-chart-app/src/routes.json:210 (modal `modify-visit-date-dialog`) | packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259 |
| 9 | packages/esm-generic-patient-widgets-app | config.interpretationSlot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113 |
| 10 | packages/esm-patient-chart-app | packages/esm-patient-forms-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-forms-app/src/routes.json:49 (workspace `patient-form-entry-workspace`); packages/esm-patient-forms-app/src/routes.json:67 (workspace `patient-html-form-entry-workspace`); packages/esm-patient-forms-app/src/routes.json:85 (workspace `clinical-forms-workspace`) | packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25; packages/esm-patient-common-lib/src/form-entry-interop.ts:70; packages/esm-patient-common-lib/src/form-entry-interop.ts:97 |
| 11 | packages/esm-patient-chart-app | packages/esm-patient-vitals-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-vitals-app/src/routes.json:53-58 (`results-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-vitals-biometrics-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:9-11, :34-36 (widgets em `patient-chart-summary-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:18-20, :43-45 (widgets em `patient-chart-vitals-biometrics-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:29-31 (`patient-vitals-info` em `patient-info-slot`); packages/esm-patient-vitals-app/src/routes.json:63-65 (`weight-tile` em `visit-form-header-slot`); packages/esm-patient-vitals-app/src/routes.json:72 (workspace `patient-vitals-biometrics-form-workspace`) | packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124; packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29 |
| 12 | packages/esm-patient-chart-app | packages/esm-patient-allergies-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-allergies-app/src/routes.json:24-31 (`allergies-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-allergies-dashboard-slot`); packages/esm-patient-allergies-app/src/routes.json:17-19 (`allergies-details-widget` no slot do dashboard); packages/esm-patient-allergies-app/src/routes.json:42 (workspace `patient-allergy-form-workspace`) | packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23 |
| 13 | packages/esm-patient-chart-app | packages/esm-patient-attachments-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-attachments-app/src/routes.json:13-17 (`attachments-results-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-attachments-dashboard-slot`); packages/esm-patient-attachments-app/src/routes.json:8-10 (`attachments-overview-widget` no slot do dashboard) | packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47 |
| 14 | packages/esm-patient-chart-app | packages/esm-patient-conditions-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-conditions-app/src/routes.json:26-31 (`conditions-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-conditions-dashboard-slot`); packages/esm-patient-conditions-app/src/routes.json:9-10 (`conditions-overview-widget` em `patient-chart-summary-dashboard-slot`); packages/esm-patient-conditions-app/src/routes.json:18-19 (`conditions-details-widget` no slot do dashboard); packages/esm-patient-conditions-app/src/routes.json:46 (workspace `conditions-form-workspace`) | packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26 |
| 15 | packages/esm-patient-chart-app | packages/esm-patient-immunizations-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-immunizations-app/src/routes.json:18-22 (`immunization-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-immunizations-dashboard-slot`); packages/esm-patient-immunizations-app/src/routes.json:13-15 (`immunization-details-widget` no slot do dashboard) | packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47 |
| 16 | packages/esm-patient-chart-app | packages/esm-patient-medications-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-medications-app/src/routes.json:25-30 (`medications-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-medications-dashboard-slot`); packages/esm-patient-medications-app/src/routes.json:8-10 (`medications-details-widget` no slot do dashboard); packages/esm-patient-medications-app/src/routes.json:16-18 (`active-medications-widget` em `patient-chart-summary-dashboard-slot`) | packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47 |
| 17 | packages/esm-patient-chart-app | packages/esm-patient-orders-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-orders-app/src/routes.json:47-51 (`patient-orders-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-orders-dashboard-slot`); packages/esm-patient-orders-app/src/routes.json:58-60 (`patient-orders-dashboard` no slot do dashboard); packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`) | packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27 |
| 18 | packages/esm-patient-chart-app | packages/esm-patient-programs-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-programs-app/src/routes.json:22-26 (`programs-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-programs-dashboard-slot`); packages/esm-patient-programs-app/src/routes.json:16-17 (`programs-details-widget` no slot do dashboard) | packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47 |
| 19 | packages/esm-patient-chart-app | packages/esm-patient-tests-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-tests-app/src/routes.json:9-13 (`test-results-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-test-results-dashboard-slot`); packages/esm-patient-tests-app/src/routes.json:26-29 (`results-viewer` no slot do dashboard); packages/esm-patient-tests-app/src/routes.json:21-22 (`test-results-filtered-overview` em `test-results-filtered-overview-slot`) | packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13 |
| 20 | packages/esm-patient-chart-app | top-of-all-patient-dashboards-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66 |
| 21 | packages/esm-patient-chart-app | packages/esm-patient-flags-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-flags-app/src/routes.json:26-27 (`patient-flags-overview` em `patient-chart-summary-dashboard-slot`); packages/esm-patient-flags-app/src/routes.json:19-20 (`patient-flag-tags` em `patient-highlights-bar-slot`) | packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68 |
| 22 | packages/esm-patient-chart-app | packages/esm-patient-banner-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-banner-app/src/routes.json:22-23 (`patient-banner` em `patient-header-slot`) | packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389 |
| 23 | packages/esm-patient-chart-app | visit-form-top-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452 |
| 24 | packages/esm-patient-chart-app | extra-visit-attribute-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547 |
| 25 | packages/esm-patient-chart-app | visit-form-bottom-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562 |
| 26 | packages/esm-patient-chart-app | appointments-form-workspace | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24 |
| 27 | packages/esm-patient-chart-app | packages/esm-patient-notes-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-notes-app/src/routes.json:25 (workspace `visit-notes-form-workspace`) | packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281 |
| 28 | packages/esm-patient-chart-app | visit-summary-panels | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159 |
| 29 | packages/esm-patient-forms-app | packages/esm-patient-chart-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` em `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`) | packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94; packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12 |
| 30 | packages/esm-patient-immunizations-app | packages/esm-patient-chart-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`) | packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4 |
| 31 | packages/esm-patient-medications-app | packages/esm-patient-chart-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`) | packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55 |
| 32 | packages/esm-patient-notes-app | packages/esm-patient-chart-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` em `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:113-114 (`patient-details-tile` em `visit-form-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`) | packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497; packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501 |
| 33 | packages/esm-patient-orders-app | packages/esm-patient-chart-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` em `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`) | packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154 |
| 34 | packages/esm-patient-vitals-app | packages/esm-patient-chart-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` em `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`) | packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300 |
| 35 | packages/esm-patient-chart-app | slotName ?? title | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24 |
| 36 | packages/esm-patient-medications-app | packages/esm-patient-orders-app | communication | bidirecional | events | Yes | Yes | — | packages/esm-patient-common-lib/src/orders/store.ts:24 |
| 37 | packages/esm-patient-orders-app | packages/esm-patient-tests-app | communication | bidirecional | events | Yes | Yes | — | packages/esm-patient-common-lib/src/orders/store.ts:24 |
| 38 | packages/esm-patient-chart-app | packages/esm-patient-forms-app | communication | origem → destino | events | Yes | Yes | — | packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10 |
| 39 | packages/esm-patient-chart-app | packages/esm-patient-medications-app | communication | origem → destino | events | Yes | Yes | — | packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10 |
| 40 | packages/esm-patient-chart-app | packages/esm-patient-notes-app | communication | origem → destino | events | Yes | Yes | — | packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10 |
| 41 | packages/esm-patient-chart-app | packages/esm-patient-orders-app | communication | origem → destino | events | Yes | Yes | — | packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10 |
| 42 | packages/esm-patient-chart-app | packages/esm-patient-tests-app | communication | origem → destino | events | Yes | Yes | — | packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10 |
| 43 | packages/esm-patient-chart-app | packages/esm-patient-vitals-app | communication | origem → destino | events | Yes | Yes | — | packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10 |
| 44 | packages/esm-patient-forms-app | packages/esm-form-engine-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-form-engine-app/src/routes.json:8-10 (extensão `react-form-engine-widget`, componente `formRenderer`, em `form-widget-slot`) | packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95 |
| 45 | packages/esm-patient-forms-app | htmlformentryui | communication | origem → destino | events | No | Yes | — | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17 |
| 46 | packages/esm-patient-medications-app | packages/esm-patient-orders-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`); packages/esm-patient-orders-app/src/routes.json:12-21 (`order-price-details` e `order-stock-details` em `order-item-additional-info-slot`) | packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37; packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71; packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25; packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149; packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66; packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103 |
| 47 | packages/esm-patient-medications-app | medication-info-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213 |
| 48 | packages/esm-patient-notes-app | packages/esm-patient-attachments-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-attachments-app/src/routes.json:30 (modal `capture-photo-modal`) | packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315 |
| 49 | packages/esm-patient-notes-app | packages/esm-patient-vitals-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-vitals-app/src/routes.json:63-65 (`weight-tile` em `visit-form-header-slot`) | packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501 |
| 50 | packages/esm-patient-orders-app | packages/esm-patient-medications-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-medications-app/src/routes.json:43 (workspace `add-drug-order`); packages/esm-patient-medications-app/src/routes.json:35-37 (`drug-order-panel` em `order-basket-slot`) | packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156 |
| 51 | packages/esm-patient-orders-app | packages/esm-patient-tests-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-tests-app/src/routes.json:52 (workspace `add-lab-order`); packages/esm-patient-tests-app/src/routes.json:34-36 (`lab-order-panel` em `order-basket-slot`) | packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156 |
| 52 | packages/esm-patient-orders-app | ${matchingOrder.type}-action-menu-items-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534 |
| 53 | packages/esm-patient-orders-app | ${matchingOrder.type}-detail-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561 |
| 54 | packages/esm-patient-orders-app | top-of-lab-order-form-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169 |
| 55 | packages/esm-patient-tests-app | packages/esm-patient-orders-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`); packages/esm-patient-orders-app/src/routes.json:12-21 (`order-price-details` e `order-stock-details` em `order-item-additional-info-slot`) | packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111 |
| 56 | packages/esm-patient-tests-app | top-of-lab-order-form-slot | host → remote | origem → destino | other | Undetermined | Undetermined | — | packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193 |
| 57 | packages/esm-patient-vitals-app | packages/esm-patient-forms-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-patient-forms-app/src/routes.json:49 (workspace `patient-form-entry-workspace`) | packages/esm-patient-vitals-app/src/utils.ts:16 |
| 58 | packages/esm-patient-vitals-app | packages/esm-form-engine-app | host → remote | origem → destino | other | Yes | Yes | packages/esm-form-engine-app/src/routes.json:8-10 (extensão `react-form-engine-widget`, componente `formRenderer`, em `form-widget-slot`) | packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249 |

## Observações

**1. packages/esm-patient-forms-app → packages/esm-form-entry-app.** O workspace de formulário monta
`<ExtensionSlot name="form-widget-slot">` (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95),
e `packages/esm-form-entry-app` registra nesse slot a extensão `form-widget`
(packages/esm-form-entry-app/src/routes.json:9-11). O componente `formWidget` é o `import('./bootstrap')`
(packages/esm-form-entry-app/src/index.ts:66), cujos lifecycles `bootstrap`/`mount`/`unmount` saem de
`singleSpaAngular` (packages/esm-form-entry-app/src/bootstrap.ts:3, :12-19, :21-23). As cinco linhas
de `bootstrap.ts` são do fornecedor e entram na relação do consumidor, aqui e na relação 2. Mecanismo
`single-spa` pelos lifecycles explícitos. A configuração do destino mostra o container que o shell
carrega (`exposes` `./start`, packages/esm-form-entry-app/webpack.config.js:74-76).

**2. packages/esm-patient-vitals-app → packages/esm-form-entry-app.** O formulário de sinais vitais
monta o mesmo `form-widget-slot` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-250),
então recebe o mesmo `form-widget` e os mesmos lifecycles da relação 1. Ativa `Yes` pela linha `Yes`
da revisão de código-fonte, que observa que esse ramo depende de `config.vitals.useFormEngine`.

**3. packages/esm-patient-forms-app → htmlformentryui.** O iframe
(packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43) recebe a URL
`${window.openmrsBase}/htmlformentryui/htmlform/${uiPage}.page?` montada em
packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-30. O Destino é
nomeado pelo segmento de caminho que aparece no artefato: é a página do módulo HFE-UI do OpenMRS 2.x,
servida pelo backend, sem fonte no snapshot, por isso No snapshot `No`.

**4. packages/esm-form-engine-app → openmrs:form-view-embedded.** O toggle assina o evento
`openmrs:form-view-embedded` em `window` (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:14-20).
Nenhum arquivo do snapshot o dispara, e a revisão de código-fonte admite que quem dispara pode ser a
biblioteca `@openmrs/esm-form-engine-lib`, que a própria unidade renderiza. A Origem é a
unidade que participa da troca e o Destino leva o nome do evento. Não se sabe quem envia:
Direção, No snapshot e Ativa `Undetermined`.

**5. packages/esm-form-engine-app → openmrs:form-collapse-toggle.** A unidade cria e dispara o
`CustomEvent('openmrs:form-collapse-toggle')` (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:22-25).
Quem envia é conhecido, e daí `origem → destino`; quem escuta não está no snapshot. O Destino leva o
nome do evento; No snapshot e Ativa `Undetermined`, como nas duas linhas da revisão de código-fonte.

**6. packages/esm-patient-flags-app → single-spa.** `usePatientFlags` assina `single-spa:routing-event`
para acompanhar a URL (packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:47-60). Quem
envia é o single-spa do app shell, fora do snapshot. Por decisão do pesquisador para este caso, a
Origem é a unidade do snapshot que participa da troca e o Destino é o nome externo que aparece no
evento; No snapshot `No`, porque o Destino é identificado como externo. O evento vai do Destino para a
Origem. Ativa `Yes` pela linha `Yes`.

**7. packages/esm-form-engine-app → packages/esm-patient-forms-app.** Ao exibir erro e ao fechar o
formulário sem encontro, o motor de formulários reabre o workspace `clinical-forms-workspace`
(packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20;
packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42), registrado por
packages/esm-patient-forms-app/src/routes.json:85.

**8. packages/esm-form-entry-app → packages/esm-patient-chart-app.** O wrapper Angular abre o modal
`modify-visit-date-dialog` (packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259),
registrado por packages/esm-patient-chart-app/src/routes.json:210. É a única relação em que o app
Angular é origem.

**9. packages/esm-generic-patient-widgets-app → config.interpretationSlot.** O gráfico monta
`<ExtensionSlot name={config.interpretationSlot}>` só quando a configuração tem um nome
(packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:111-113). O padrão é
`''` (packages/esm-generic-patient-widgets-app/src/config-schema.ts:19-23), e nenhum `routes.json`
do snapshot preenche um slot com esse nome. O Destino é a expressão como aparece no artefato; No
snapshot e Ativa `Undetermined`.

**10. packages/esm-patient-chart-app → packages/esm-patient-forms-app.** O chart abre três workspaces
do `forms`: `patient-form-entry-workspace` por `launchEncounterForm`
(packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24) e por `launchFormEntry` da
biblioteca (packages/esm-patient-common-lib/src/form-entry-interop.ts:70); `patient-html-form-entry-workspace`
por `launchHtmlFormEntry` (packages/esm-patient-common-lib/src/form-entry-interop.ts:97); e
`clinical-forms-workspace` pelo botão da visita ativa
(packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25).
As duas linhas da biblioteca entram aqui porque o chart as chama por `launchFormEntryOrHtmlForms`
(packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:242, :287).
O `forms` também chama esse helper (packages/esm-patient-forms-app/src/forms/forms-dashboard.component.tsx:47),
mas para os seus próprios workspaces, o que é interno.

**11. packages/esm-patient-chart-app → packages/esm-patient-vitals-app.** O vitals preenche vários
pontos do chart: o `visit-form-header-slot` do formulário de óbito e do formulário de visita
(packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124;
packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410), a navegação e os
dashboards (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37;
packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69;
packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47) e o `patient-info-slot`
(packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69). O chart também abre
o workspace `patient-vitals-biometrics-form-workspace`
(packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29).

**12. packages/esm-patient-chart-app → packages/esm-patient-allergies-app.** As linhas
packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37 e
packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47 leem e entregam ao
framework as extensões de `patient-chart-dashboard-slot`. A linha
packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69 monta o
slot do dashboard escolhido (`dashboard.slot`). O allergies registra o link do dashboard e o widget
desse slot. O chart ainda abre o workspace `patient-allergy-form-workspace`
(packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23).
Essas três linhas de navegação e dashboard sustentam também as relações 11 e 13-19 e, para
`dashboard.slot`, a 21. Um mesmo slot do chart sustenta uma relação por unidade que o preenche.

**13. packages/esm-patient-chart-app → packages/esm-patient-attachments-app.** Só a navegação e o
dashboard, pelas três linhas da relação 12: o attachments registra o link
(packages/esm-patient-attachments-app/src/routes.json:13-17) e o widget do seu dashboard
(packages/esm-patient-attachments-app/src/routes.json:8-10).

**14. packages/esm-patient-chart-app → packages/esm-patient-conditions-app.** Navegação e dashboards,
como na relação 12, incluindo o widget no resumo `patient-chart-summary-dashboard-slot`
(packages/esm-patient-conditions-app/src/routes.json:9-10), e o workspace `conditions-form-workspace`
aberto pelo botão da visita ativa
(packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26).

**15. packages/esm-patient-chart-app → packages/esm-patient-immunizations-app.** Só a navegação e o
dashboard, pelas três linhas da relação 12 (packages/esm-patient-immunizations-app/src/routes.json:13-22).

**16. packages/esm-patient-chart-app → packages/esm-patient-medications-app.** Navegação e dashboards,
como na relação 12, com o widget de medicamentos ativos no resumo
(packages/esm-patient-medications-app/src/routes.json:16-18).

**17. packages/esm-patient-chart-app → packages/esm-patient-orders-app.** Navegação e dashboard, como
na relação 12, e o workspace `order-basket` aberto pelo botão da visita ativa
(packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27;
packages/esm-patient-orders-app/src/routes.json:68).

**18. packages/esm-patient-chart-app → packages/esm-patient-programs-app.** Só a navegação e o
dashboard, pelas três linhas da relação 12 (packages/esm-patient-programs-app/src/routes.json:16-26).

**19. packages/esm-patient-chart-app → packages/esm-patient-tests-app.** Navegação e dashboard de
resultados, como na relação 12, e o resumo filtrado de exames que o chart monta no resumo da visita
(packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13;
packages/esm-patient-tests-app/src/routes.json:21-22).

**20. packages/esm-patient-chart-app → top-of-all-patient-dashboards-slot.** Slot montado no topo de
todo dashboard (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66)
que nenhum `routes.json` do snapshot preenche. O Destino é o nome do slot; No snapshot e Ativa
`Undetermined`, como nas relações 23-26, 28, 35, 47, 52-54 e 56.

**21. packages/esm-patient-chart-app → packages/esm-patient-flags-app.** O flags não tem dashboard
próprio, mas põe um widget no resumo do chart (packages/esm-patient-flags-app/src/routes.json:26-27),
montado por `dashboard.slot`
(packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69), e a
barra de flags no `patient-highlights-bar-slot`
(packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68).

**22. packages/esm-patient-chart-app → packages/esm-patient-banner-app.** O banner do paciente
(packages/esm-patient-banner-app/src/routes.json:22-23) é montado pelo `patient-header-slot` da página
do prontuário e do formulário de visita
(packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67;
packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389).

**23. packages/esm-patient-chart-app → visit-form-top-slot.** Slot do formulário de visita
(packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:451-456) sem extensão no
snapshot; valores como na relação 20.

**24. packages/esm-patient-chart-app → extra-visit-attribute-slot.** Slot do formulário de visita
(packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547) sem extensão no
snapshot; valores como na relação 20.

**25. packages/esm-patient-chart-app → visit-form-bottom-slot.** Slot do formulário de visita
(packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:561-566) sem extensão no
snapshot; valores como na relação 20.

**26. packages/esm-patient-chart-app → appointments-form-workspace.** O botão da visita ativa abre esse
workspace (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24),
que nenhum `routes.json` do snapshot registra. Provavelmente é de um módulo de agendamentos de outro
repositório, mas o snapshot não o identifica, por isso No snapshot `Undetermined`.

**27. packages/esm-patient-chart-app → packages/esm-patient-notes-app.** O chart abre o workspace
`visit-notes-form-workspace` (packages/esm-patient-notes-app/src/routes.json:25) pelo botão da visita
ativa e pelos dois pontos de edição da tabela de encontros
(packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28;
packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236, :281).

**28. packages/esm-patient-chart-app → visit-summary-panels.** Slot `visitSummaryPanelSlot` =
`'visit-summary-panels'` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:30,
:159) sem extensão no snapshot; valores como na relação 20.

**29. packages/esm-patient-forms-app → packages/esm-patient-chart-app.** O `forms` monta o
`visit-context-header-slot` preenchido pelo chart (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94;
packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12). Sem visita ativa, também
abre modais do chart por helpers da biblioteca. `launchFormEntryOrHtmlForms`
(packages/esm-patient-forms-app/src/forms/forms-dashboard.component.tsx:47) chama
`launchStartVisitPrompt` (packages/esm-patient-common-lib/src/form-entry-interop.ts:52), que abre
`start-visit-dialog` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4). O
`useLaunchWorkspaceRequiringVisit` do botão de formulários
(packages/esm-patient-forms-app/src/clinical-form-action-button.component.tsx:15) abre
`visit-context-switcher` ou `start-visit-dialog` (packages/esm-patient-common-lib/src/workspaces.ts:55, :62).

**30. packages/esm-patient-immunizations-app → packages/esm-patient-chart-app.** Sem visita ativa, o
resumo de imunizações chama `launchStartVisitPrompt`
(packages/esm-patient-immunizations-app/src/immunizations/immunizations-detailed-summary.component.tsx:67),
que abre o `start-visit-dialog` do chart (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4).

**31. packages/esm-patient-medications-app → packages/esm-patient-chart-app.** O medications usa
`useLaunchWorkspaceRequiringVisit` (por exemplo
packages/esm-patient-medications-app/src/active-medications/active-medications.component.tsx:19 e a
linha packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71).
Sem visita, o hook abre os modais `visit-context-switcher` ou `start-visit-dialog` do chart
(packages/esm-patient-common-lib/src/workspaces.ts:55, :62). As duas linhas da biblioteca
(packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4,
packages/esm-patient-common-lib/src/workspaces.ts:55) sustentam a relação. O mesmo vale, pelo hook,
para as relações 29 e 32-34.

**32. packages/esm-patient-notes-app → packages/esm-patient-chart-app.** O formulário de notas monta
o `visit-context-header-slot` e o `visit-form-header-slot`
(packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497, :501), que o chart
preenche (packages/esm-patient-chart-app/src/routes.json:180-181, :113-114). Sem visita, o notes
chama `launchStartVisitPrompt` direto (packages/esm-patient-notes-app/src/notes/notes-main.component.tsx:36)
e pelo hook do botão de nota (packages/esm-patient-notes-app/src/visit-note-action-button.extension.tsx:9).

**33. packages/esm-patient-orders-app → packages/esm-patient-chart-app.** O carrinho abre
`start-visit-dialog` e monta o `visit-context-header-slot`
(packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57, :154). O hook
`useLaunchWorkspaceRequiringVisit` do orders
(packages/esm-patient-orders-app/src/order-basket-action-button/order-basket-action-button.extension.tsx:9)
leva aos modais do chart, como na relação 31.

**34. packages/esm-patient-vitals-app → packages/esm-patient-chart-app.** O formulário de sinais
vitais monta o `visit-context-header-slot` nos dois ramos
(packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268, :300),
e o hook de packages/esm-patient-vitals-app/src/utils.ts:16 leva aos modais do chart, como na relação 31.

**35. packages/esm-patient-chart-app → slotName ?? title.** O grupo de navegação genérico do chart
(packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:36-38) usa o
`DashboardGroupExtension` da biblioteca, que monta `<ExtensionSlot name={slotName ?? title}>`
(packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24). O nome vem da
configuração (padrão `my-group-nav-slot`, packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:11-14),
e nenhum `routes.json` do snapshot preenche esses slots. A Origem é o chart, que chama o componente.
Valores como na relação 20.

**36. packages/esm-patient-medications-app ↔ packages/esm-patient-orders-app (communication).** O
store `order-basket` (packages/esm-patient-common-lib/src/orders/store.ts:24) é lido e escrito por
`useOrderBasket` (packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:86-94). O medications
escreve na sua chave `medications`
(packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19;
packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:31). O carrinho do
orders lê todas as chaves e as limpa com `clearOrders`
(packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38, :106;
packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-60), o que altera o que o medications
lê. Há envio nos dois sentidos, daí `bidirecional`. Mecanismo `events`: é um serviço reativo
compartilhado.

**37. packages/esm-patient-orders-app ↔ packages/esm-patient-tests-app (communication).** O mesmo
store, com o tests escrevendo pedidos de exame na chave do tipo de pedido
(packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:60;
packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:188) e o
carrinho do orders lendo e limpando tudo, como na relação 36. Medications e tests leem só a própria
chave, por isso não há relação entre os dois.

**38. packages/esm-patient-chart-app → packages/esm-patient-forms-app (communication).** O store
`patient-chart-global-store` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:8-10)
só é escrito pela página do prontuário, que grava o paciente corrente
(packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:38-41). O `forms` o lê
pelo `useLaunchWorkspaceRequiringVisit`, que pega `patientUuid` do store
(packages/esm-patient-common-lib/src/workspaces.ts:44). A direção é `origem → destino` porque só o
chart escreve. Mecanismo `events`, como na relação 36.

**39. packages/esm-patient-chart-app → packages/esm-patient-medications-app (communication).** O
medications lê o paciente do store
(packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:362;
packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:116),
além do hook e de `useOrderBasket`, que usa `getPatientUuidFromStore`
(packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:38).

**40. packages/esm-patient-chart-app → packages/esm-patient-notes-app (communication).** O notes lê
o store só pelo hook do botão de nota (packages/esm-patient-notes-app/src/visit-note-action-button.extension.tsx:9;
packages/esm-patient-common-lib/src/workspaces.ts:44).

**41. packages/esm-patient-chart-app → packages/esm-patient-orders-app (communication).** O orders lê
o paciente do store
(packages/esm-patient-orders-app/src/order-basket/general-order-type/orderable-concept-search/orderable-concept-search.workspace.tsx:51),
além do hook e de `useOrderBasket`.

**42. packages/esm-patient-chart-app → packages/esm-patient-tests-app (communication).** O tests lê o
paciente do store
(packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:46;
packages/esm-patient-tests-app/src/test-results/individual-results-table/individual-results-table.component.tsx:56),
além de `useOrderBasket`.

**43. packages/esm-patient-chart-app → packages/esm-patient-vitals-app (communication).** O vitals lê
o paciente do store
(packages/esm-patient-vitals-app/src/components/action-menu/vitals-biometrics-action-menu.component.tsx:15)
e pelo hook de packages/esm-patient-vitals-app/src/utils.ts:16.

**44. packages/esm-patient-forms-app → packages/esm-form-engine-app.** O `form-widget-slot`
(packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95) também recebe o
`react-form-engine-widget` (packages/esm-form-engine-app/src/routes.json:8-10). O mecanismo é `other`
porque o componente `formRenderer` é exposto pelo framework, sem lifecycle single-spa visível no
snapshot.

**45. packages/esm-patient-forms-app → htmlformentryui (communication).** O `forms` escuta `message`
em `window` e fecha o workspace ao receber `'close-workspace'`
(packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19). A
página embutida da relação 3 envia essa mensagem por causa do `returnUrl=post-message:close-workspace`
(packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27, :44). Como na
relação 6, por decisão do pesquisador, a Origem é o `forms` e o Destino é a página externa, com o nome
da relação 3; No snapshot `No`. A mensagem vai do Destino para a Origem. O snapshot não mostra mensagem enviada ao iframe; o `onLoad` só altera o DOM da
página embutida (:22-38).

**46. packages/esm-patient-medications-app → packages/esm-patient-orders-app.** O medications abre,
reabre e fecha o workspace `order-basket` (packages/esm-patient-orders-app/src/routes.json:68) em sete
pontos e monta o `order-item-additional-info-slot`
(packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103),
que o orders preenche (packages/esm-patient-orders-app/src/routes.json:12-21). O `closeWorkspace` entra
na mesma relação: a origem controla o workspace do destino.

**47. packages/esm-patient-medications-app → medication-info-slot.** Slot do formulário de
medicamento (packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213)
sem extensão no snapshot; valores como na relação 20.

**48. packages/esm-patient-notes-app → packages/esm-patient-attachments-app.** O formulário de notas
abre o modal `capture-photo-modal` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315),
registrado por packages/esm-patient-attachments-app/src/routes.json:30.

**49. packages/esm-patient-notes-app → packages/esm-patient-vitals-app.** O
`visit-form-header-slot` do formulário de notas
(packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501) recebe o `weight-tile`
do vitals (packages/esm-patient-vitals-app/src/routes.json:63-65). A mesma linha sustenta a relação 32.

**50. packages/esm-patient-orders-app → packages/esm-patient-medications-app.** A tabela de pedidos
abre o workspace `add-drug-order` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120),
e o carrinho monta o `order-basket-slot` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156),
que recebe o `drug-order-panel` (packages/esm-patient-medications-app/src/routes.json:35-37).

**51. packages/esm-patient-orders-app → packages/esm-patient-tests-app.** Igual à relação 50, com o
workspace `add-lab-order` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121)
e o `lab-order-panel` no `order-basket-slot` (packages/esm-patient-tests-app/src/routes.json:34-36).

**52. packages/esm-patient-orders-app → ${matchingOrder.type}-action-menu-items-slot.** Nome dinâmico
pelo tipo do pedido (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534-535);
nenhum `routes.json` do snapshot preenche slot com esse sufixo. Valores como na relação 20.

**53. packages/esm-patient-orders-app → ${matchingOrder.type}-detail-slot.** Mesmo caso da relação 52
(packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561-562).

**54. packages/esm-patient-orders-app → top-of-lab-order-form-slot.** Slot do formulário de pedido
geral (packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169)
sem extensão no snapshot. O tests monta um slot com o mesmo nome (relação 56); são origens
diferentes e, portanto, linhas diferentes. Valores como na relação 20.

**55. packages/esm-patient-tests-app → packages/esm-patient-orders-app.** Espelho da relação 46 para
exames: o tests abre, reabre e fecha o workspace `order-basket` em sete pontos e monta o
`order-item-additional-info-slot`
(packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68).

**56. packages/esm-patient-tests-app → top-of-lab-order-form-slot.** Slot do formulário de exame
(packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193) sem
extensão no snapshot; valores como na relação 20.

**57. packages/esm-patient-vitals-app → packages/esm-patient-forms-app.** Com
`config.vitals.useFormEngine` ligado, o hook abre o workspace `patient-form-entry-workspace` do
`forms` (packages/esm-patient-vitals-app/src/utils.ts:14-18; packages/esm-patient-forms-app/src/routes.json:49).
O padrão é desligado, mas a linha da revisão de código-fonte é `Yes`, e por isso Ativa `Yes`.

**58. packages/esm-patient-vitals-app → packages/esm-form-engine-app.** O `form-widget-slot` do
formulário de sinais vitais (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249)
recebe o `react-form-engine-widget` (packages/esm-form-engine-app/src/routes.json:8-10), como na
relação 44.

## Resumo

Relações: 58 (host → remote: 45, page → embedded-frontend: 1, communication: 12). Ativas: 43. Destino fora do snapshot: 3.
Unidades sem relação: packages/esm-patient-lists-app.

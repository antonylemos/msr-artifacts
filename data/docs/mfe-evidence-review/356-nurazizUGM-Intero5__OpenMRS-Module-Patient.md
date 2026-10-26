---
schema: 1
id: 997746951
full_name: nurazizUGM-Intero5/OpenMRS-Module-Patient
commit: c490ce752bac4d0772f28778fe81434dd6c57a00
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

# 356 — nurazizUGM-Intero5/OpenMRS-Module-Patient

## Leitura do repositório

O snapshot reúne 18 módulos frontend OpenMRS em um monorepo Yarn, além da raiz de coordenação e de uma biblioteca compartilhada (#134–#153). Cada aplicação tem entrada, bundle e publicação npm próprios (#212–#229); a versão e a release são coordenadas. O ambiente Docker que reúne 17 apps é destinado a testes e2e, e exclui o wrapper Angular. O app shell e o import map que carregam esses módulos ficam fora do snapshot.

A cadeia observável começa nas declarações de `@openmrs/esm-framework` e `single-spa-angular` (#1, #3, #5 e demais manifestos), passa pelos registros de extensões, workspaces e modais (#30–#47), pelos pontos de código que os montam ou abrem (#48–#133), e chega às relações entre unidades (#154–#211). O chart fornece navegação, dashboards e slots preenchidos pelos widgets; forms e vitals recebem os motores de formulário pelo `form-widget-slot`. Orders, medications e tests combinam workspaces, painéis e o carrinho de pedidos. A biblioteca comum auxilia essas ligações, mas não é contada como unidade frontend (PR 142).

O wrapper Angular configura localmente um container Module Federation, com nome próprio, `./start` e dependências singleton (PR 29), e exporta lifecycles single-spa (#50–#54). Esse container não declara remotes consumidores. As relações forms/vitals → form-entry preservam o mecanismo single-spa registrado pela 3.4.5 (#154–#155); as demais montagens usam o sistema de extensões OpenMRS (`other`). Os builds React delegam a configuração padrão ao pacote externo `openmrs`. Não se estende o container Angular aos demais apps por inferência.

Há também estado reativo compartilhado no `order-basket` e no `patient-chart-global-store` (#94–#95, #189–#196), eventos do shell (#60, #159) e a integração da página externa HFE-UI por iframe e mensagem de fechamento (#56, #100, #156, #198). O iframe de visualização de PDF é conteúdo de anexo, sem composição frontend (PR 55). O bootstrap assíncrono local e a declaração de tipos não demonstram ligação entre unidades (#48–#49). Dependências sem uso observado continuam sinais isolados (#4, #6, #14, #15, #17); o Turbo é contexto de orquestração (PR 2).

Os pontos sem contraparte identificada conservam a indeterminação: os dois eventos do toggle, os slots sem fornecedor, os nomes dinâmicos e `appointments-form-workspace` podem receber unidades externas ou permanecer desconectados (#157–#158, #162, #173, #176–#179, #181, #188, #200, #205–#207, #209). Nos ramos de vitals que escolhem o motor externo, a atividade Yes é a da revisão final, embora `config.vitals.useFormEngine` seja false por padrão (#130–#131, #210–#211). A 3.5 não altera esses valores.

A documentação descreve o conjunto, mas conserva Biometrics como pacote separado e chama a biblioteca de microfrontend (#231–#232, #235); dois comentários e2e também divergem do script (#239–#240). O histórico confirma a remoção de Biometrics e a coexistência das duas divergências e2e desde junho de 2024 (#274, #278–#279). Os demais pontos históricos não autorizam inferir retirada ou abandono: faltam conteúdos antigos ou a contraparte é externa (#255–#273, #275–#277, #280–#282). Quando a dúvida é só sobre o passado de uma declaração, a força é fraca; quando mantém aberta a ligação arquitetural no snapshot, é ambígua.

## Observações

### 1. package.json:27; packages/esm-patient-chart-app/src/index.ts:1-6; package.json:5-7; packages/esm-patient-chart-app/package.json:7; packages/esm-form-entry-app/src/index.ts:3; packages/esm-form-entry-app/angular.json:42

**Observação:** O manifesto declara `@openmrs/esm-framework` em `devDependencies`, versão `next`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-chart-app/src/index.ts:1-6 (import de `@openmrs/esm-framework`, pacote hoisted da raiz em `workspaces`, package.json:5-7); packages/esm-patient-chart-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`); packages/esm-form-entry-app/src/index.ts:3 (import do pacote; `main` em packages/esm-form-entry-app/angular.json:42)

### 2. package.json:75; turbo.json:3-11; .github/workflows/ci.yml:52; .github/workflows/ci.yml:90; .github/workflows/ci.yml:159; .github/workflows/e2e.yml:66; .github/workflows/bundle-size.yml:33

**Observação:** O manifesto declara `turbo` em `devDependencies`, versão `^2.5.2`.

**Interpretação:** A declaração é um sinal isolado de monorepo-tool. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: turbo.json:3-11 (tarefa `build` com `dependsOn: ["^build"]` e `outputs: ["dist/**"]`); .github/workflows/ci.yml:52, :90 e :159 e .github/workflows/e2e.yml:66 (`yarn turbo run build`); .github/workflows/bundle-size.yml:33 (`build-script: 'turbo run build'`)

### 3. packages/esm-form-engine-app/package.json:46; packages/esm-form-engine-app/src/index.ts:1; packages/esm-form-engine-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-form-engine-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-form-engine-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 4. packages/esm-form-entry-app/package.json:38

**Observação:** O manifesto declara `@angular-extensions/elements` em `dependencies`, versão `^17.1.1`.

**Interpretação:** A declaração é um sinal isolado de web-components. A revisão 3.4.2 registra Configurada `No`. A revisão não identifica uso da dependência no snapshot; a declaração não demonstra composição.

### 5. packages/esm-form-entry-app/package.json:59; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/index.ts:66; packages/esm-form-entry-app/angular.json:42

**Observação:** O manifesto declara `single-spa-angular` em `dependencies`, versão `^9.0.1`.

**Interpretação:** A declaração é um sinal isolado de single-spa. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-form-entry-app/src/bootstrap.ts:3 (import de `singleSpaAngular`) e :12-23 (`singleSpaAngular({...})` e exportação de `bootstrap`/`mount`/`unmount`); packages/esm-form-entry-app/src/index.ts:66 (`formWidget = () => import('./bootstrap')`); packages/esm-form-entry-app/angular.json:42 (`main: src/index.ts`)

### 6. packages/esm-form-entry-app/package.json:61

**Observação:** O manifesto declara `systemjs-webpack-interop` em `dependencies`, versão `^2.3.7`.

**Interpretação:** A declaração é um sinal isolado de import-maps. A revisão 3.4.2 registra Configurada `No`. A revisão não identifica uso da dependência no snapshot; a declaração não demonstra composição.

### 7. packages/esm-form-entry-app/package.json:68; packages/esm-form-entry-app/src/index.ts:3; packages/esm-form-entry-app/angular.json:42; packages/esm-form-entry-app/webpack.config.js:48

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-form-entry-app/src/index.ts:3 (`defineConfigSchema`, `messageOmrsServiceWorker` do pacote) e :63 (`defineConfigSchema(moduleName, configSchema)`); packages/esm-form-entry-app/angular.json:42 (`main: src/index.ts`) e :52 (`extraWebpackConfig: webpack.config.js`); packages/esm-form-entry-app/webpack.config.js:48 (`entry: src/index.ts`) e :116 (alias `@openmrs/esm-framework`)

### 8. packages/esm-form-entry-app/package.json:69; packages/esm-form-entry-app/src/single-spa-props.ts:2; packages/esm-form-entry-app/src/bootstrap.ts:6; packages/esm-form-entry-app/src/bootstrap.ts:14; packages/esm-form-entry-app/webpack.config.js:77-86; packages/esm-form-entry-app/angular.json:52

**Observação:** O manifesto declara `single-spa` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de single-spa. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-form-entry-app/src/single-spa-props.ts:2 (`import { AppProps } from 'single-spa'`) e :47 (tipo `SingleSpaProps`), usado em packages/esm-form-entry-app/src/bootstrap.ts:6 e :14; packages/esm-form-entry-app/webpack.config.js:77-86 (`peerDependencies`, que inclui `single-spa`, compartilhadas como `singleton` no `ModuleFederationPlugin`), referenciado por packages/esm-form-entry-app/angular.json:52

### 9. packages/esm-generic-patient-widgets-app/package.json:45; packages/esm-generic-patient-widgets-app/src/index.ts:1; packages/esm-generic-patient-widgets-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-generic-patient-widgets-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-generic-patient-widgets-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 10. packages/esm-patient-allergies-app/package.json:44; packages/esm-patient-allergies-app/src/index.ts:1-9; packages/esm-patient-allergies-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-allergies-app/src/index.ts:1-9 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-allergies-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 11. packages/esm-patient-attachments-app/package.json:49; packages/esm-patient-attachments-app/src/index.ts:2; packages/esm-patient-attachments-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-attachments-app/src/index.ts:2 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-attachments-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 12. packages/esm-patient-banner-app/package.json:45; packages/esm-patient-banner-app/src/index.ts:1-7; packages/esm-patient-banner-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-banner-app/src/index.ts:1-7 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-banner-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 13. packages/esm-patient-chart-app/package.json:45; packages/esm-patient-chart-app/src/index.ts:1-6; packages/esm-patient-chart-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-chart-app/src/index.ts:1-6 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-chart-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 14. packages/esm-patient-chart-app/package.json:53

**Observação:** O manifesto declara `single-spa` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de single-spa. A revisão 3.4.2 registra Configurada `No`. A revisão não identifica uso da dependência no snapshot; a declaração não demonstra composição.

### 15. packages/esm-patient-chart-app/package.json:54

**Observação:** O manifesto declara `single-spa-react` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de single-spa. A revisão 3.4.2 registra Configurada `No`. A revisão não identifica uso da dependência no snapshot; a declaração não demonstra composição.

### 16. packages/esm-patient-common-lib/package.json:37; packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:1; packages/esm-patient-common-lib/src/index.ts:9; packages/esm-patient-common-lib/package.json:7; packages/esm-patient-allergies-app/src/index.ts:10; packages/esm-patient-allergies-app/package.json:54

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:1 (`import { showModal } from '@openmrs/esm-framework'`); packages/esm-patient-common-lib/src/index.ts:9 (reexporta o módulo); packages/esm-patient-common-lib/package.json:7 (`main: src/index.ts`); packages/esm-patient-allergies-app/src/index.ts:10 (app importa `@openmrs/esm-patient-common-lib`, `workspace:*` em packages/esm-patient-allergies-app/package.json:54)

### 17. packages/esm-patient-common-lib/package.json:39

**Observação:** O manifesto declara `single-spa` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de single-spa. A revisão 3.4.2 registra Configurada `No`. A revisão não identifica uso da dependência no snapshot; a declaração não demonstra composição.

### 18. packages/esm-patient-conditions-app/package.json:45; packages/esm-patient-conditions-app/src/index.ts:1; packages/esm-patient-conditions-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-conditions-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-conditions-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 19. packages/esm-patient-flags-app/package.json:43; packages/esm-patient-flags-app/src/index.ts:1; packages/esm-patient-flags-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-flags-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-flags-app/package.json:7 (`main: src/index.ts`) e :12 (`webpack --mode production`)

### 20. packages/esm-patient-forms-app/package.json:46; packages/esm-patient-forms-app/src/index.ts:1-7; packages/esm-patient-forms-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-forms-app/src/index.ts:1-7 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-forms-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 21. packages/esm-patient-immunizations-app/package.json:47; packages/esm-patient-immunizations-app/src/index.ts:1; packages/esm-patient-immunizations-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-immunizations-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-immunizations-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 22. packages/esm-patient-lists-app/package.json:43; packages/esm-patient-lists-app/src/index.ts:1; packages/esm-patient-lists-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-lists-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-lists-app/package.json:7 (`main: src/index.ts`) e :12 (`webpack --mode production`)

### 23. packages/esm-patient-medications-app/package.json:45; packages/esm-patient-medications-app/src/index.ts:1; packages/esm-patient-medications-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-medications-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-medications-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 24. packages/esm-patient-notes-app/package.json:43; packages/esm-patient-notes-app/src/index.ts:1-7; packages/esm-patient-notes-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-notes-app/src/index.ts:1-7 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-notes-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 25. packages/esm-patient-orders-app/package.json:45; packages/esm-patient-orders-app/src/index.ts:1; packages/esm-patient-orders-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-orders-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-orders-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 26. packages/esm-patient-programs-app/package.json:45; packages/esm-patient-programs-app/src/index.ts:1; packages/esm-patient-programs-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-programs-app/src/index.ts:1 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-programs-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 27. packages/esm-patient-tests-app/package.json:47; packages/esm-patient-tests-app/src/index.ts:1-7; packages/esm-patient-tests-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-tests-app/src/index.ts:1-7 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-tests-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 28. packages/esm-patient-vitals-app/package.json:46; packages/esm-patient-vitals-app/src/index.ts:1-8; packages/esm-patient-vitals-app/package.json:7

**Observação:** O manifesto declara `@openmrs/esm-framework` em `peerDependencies`, versão `6.x`.

**Interpretação:** A declaração é um sinal isolado de other-mfe-framework. A revisão 3.4.2 registra Configurada `Yes`. O uso registrado é: packages/esm-patient-vitals-app/src/index.ts:1-8 (import de `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-vitals-app/package.json:7 (`main: src/index.ts`) e :13 (`webpack --mode production`)

### 29. packages/esm-form-entry-app/webpack.config.js:27-31; packages/esm-form-entry-app/webpack.config.js:70-87; packages/esm-form-entry-app/package.json:2; packages/esm-form-entry-app/package.json:6-7; packages/esm-form-entry-app/package.json:67-70

**Observação:** O `ModuleFederationPlugin` recebe o nome do pacote `@openmrs/esm-form-entry-app`, a biblioteca global `_openmrs_esm_form_entry_app` e o filename derivado de `browser`. Expõe `./start` para `src/index.ts`. Compartilha os `peerDependencies` e `@openmrs/esm-framework/src/internal`, com `singleton: true` e `shareScope: default`.

**Interpretação:** Configura o container de uma unidade, incluindo exposição e compartilhamento. Não declara outra unidade como remote; o consumidor pertence ao shell externo.

### 30. packages/esm-form-engine-app/src/routes.json:1-25

**Observação:** O registro da unidade declara `extensions`: {"name": "react-form-engine-widget", "component": "formRenderer", "slot": "form-widget-slot"}; `extensions`: {"name": "rfe-form-collapse-toggle", "component": "formCollapseToggle", "slot": "workspace-header-patient-chart-slot"}; `modals`: {"name": "form-engine-delete-question-confirm-modal", "component": "deleteQuestionModal"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 31. packages/esm-generic-patient-widgets-app/src/routes.json:1-17

**Observação:** O registro da unidade declara `extensions`: {"name": "obs-by-encounter-widget", "component": "switchableObs"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 32. packages/esm-patient-allergies-app/src/routes.json:1-48

**Observação:** O registro da unidade declara `extensions`: {"name": "allergy-tile", "component": "allergyTile", "slot": "patient-details-header-slot"}; `extensions`: {"name": "allergies-details-widget", "component": "allergiesDetailedSummary", "slot": "patient-chart-allergies-dashboard-slot"}; `extensions`: {"name": "allergies-summary-dashboard", "component": "allergiesDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "allergy-delete-confirmation-dialog", "component": "allergyDeleteConfirmationDialog"}; `workspaces`: {"name": "patient-allergy-form-workspace", "component": "allergyFormWorkspace"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 33. packages/esm-patient-attachments-app/src/routes.json:1-39

**Observação:** O registro da unidade declara `extensions`: {"name": "attachments-overview-widget", "component": "attachmentsOverview", "slot": "patient-chart-attachments-dashboard-slot"}; `extensions`: {"name": "attachments-results-summary-dashboard", "component": "attachmentsSummaryResultsDashboard", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "capture-photo-widget", "component": "capturePhotoWidget", "slot": "capture-patient-photo-slot"}; `modals`: {"name": "capture-photo-modal", "component": "capturePhotoModal"}; `modals`: {"name": "delete-attachment-modal", "component": "deleteAttachmentModal"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 34. packages/esm-patient-banner-app/src/routes.json:1-49

**Observação:** O registro da unidade declara `extensions`: {"name": "visit-tag", "component": "visitTag", "slot": "patient-banner-tags-slot"}; `extensions`: {"name": "deceased-patient-tag", "component": "deceasedPatientTag", "slot": "patient-banner-tags-slot"}; `extensions`: {"name": "patient-banner", "component": "patientBanner", "slot": "patient-header-slot"}; `extensions`: {"name": "print-identifier-sticker-button", "component": "printIdentifierStickerActionButton", "slot": "patient-actions-slot"}; `modals`: {"name": "print-identifier-sticker-modal", "component": "printIdentifierStickerModal"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 35. packages/esm-patient-chart-app/src/routes.json:1-244

**Observação:** O registro da unidade declara `extensions`: {"name": "charts-summary-dashboard", "component": "patientSummaryDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "encounter-list", "component": "encounterListTableTabs"}; `extensions`: {"name": "start-visit-button", "component": "startVisitActionButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "clinical-views-summary", "component": "clinicalViewsSummary"}; `extensions`: {"name": "stop-visit-button", "component": "stopVisitActionButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "mark-alive-button", "component": "markPatientAliveActionButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "stop-visit-button-patient-search", "component": "stopVisitPatientSearchActionButton", "slot": "patient-search-actions-slot"}; `extensions`: {"name": "delete-visit-button", "component": "deleteVisitActionMenuButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "delete-visit-button", "component": "deleteVisitActionMenuButton", "slot": "patient-search-actions-slot"}; `extensions`: {"name": "mark-patient-deceased-button", "component": "markPatientDeceasedActionButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "encounters-summary-dashboard", "component": "encountersSummaryDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "past-visits-detail-overview", "component": "pastVisitsDetailOverview", "slot": "patient-chart-encounters-dashboard-slot"}; `extensions`: {"name": "patient-details-tile", "component": "patientDetailsTile", "slot": "visit-form-header-slot"}; `extensions`: {"name": "nav-group", "component": "genericNavGroup"}; `extensions`: {"name": "dashboard", "component": "genericDashboard"}; `extensions`: {"name": "start-visit-button-patient-search", "component": "startVisitPatientSearchActionButton", "slot": "start-visit-button-slot"}; `extensions`: {"name": "visit-attribute-tags", "component": "visitAttributeTags", "slot": "patient-banner-tags-slot"}; `extensions`: {"name": "current-visit-summary", "component": "currentVisitSummary"}; `extensions`: {"name": "edit-visit-action-button", "component": "editVisitDetailsActionButton", "slot": "visit-detail-overview-actions"}; `extensions`: {"name": "delete-visit-action-button", "component": "deleteVisitActionButton", "slot": "visit-detail-overview-actions"}; `extensions`: {"name": "active-visit-action-button", "component": "activeVisitActionsComponent", "slot": "active-visit-actions"}; `extensions`: {"name": "visit-context-header", "component": "visitContextHeader", "slot": "visit-context-header-slot"}; `workspaces`: {"name": "mark-patient-deceased-workspace-form", "component": "markPatientDeceasedForm"}; `workspaces`: {"name": "start-visit-workspace-form", "component": "startVisitWorkspace"}; `modals`: {"name": "delete-encounter-modal", "component": "deleteEncounterModal"}; `modals`: {"name": "delete-visit-dialog", "component": "deleteVisitModal"}; `modals`: {"name": "end-visit-dialog", "component": "endVisitModal"}; `modals`: {"name": "mark-patient-alive-modal", "component": "markPatientAliveModal"}; `modals`: {"name": "modify-visit-date-dialog", "component": "modifyVisitDateModal"}; `modals`: {"name": "start-visit-dialog", "component": "startVisitModal"}; `modals`: {"name": "visit-context-switcher", "component": "visitContextSwitcherModal"}; `pages`: {"component": "root", "routeRegex": "^patient/.+/chart"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 36. packages/esm-patient-conditions-app/src/routes.json:1-51

**Observação:** O registro da unidade declara `extensions`: {"name": "conditions-overview-widget", "component": "conditionsOverview", "slot": "patient-chart-summary-dashboard-slot"}; `extensions`: {"name": "conditions-details-widget", "component": "conditionsDetailedSummary", "slot": "patient-chart-conditions-dashboard-slot"}; `extensions`: {"name": "conditions-summary-dashboard", "component": "conditionsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "conditions-widget", "component": "conditionsWidget"}; `extensions`: {"name": "condition-delete-confirmation-dialog", "component": "conditionDeleteConfirmationDialog"}; `workspaces`: {"name": "conditions-form-workspace", "component": "conditionsFormWorkspace"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 37. packages/esm-patient-flags-app/src/routes.json:1-43

**Observação:** O registro da unidade declara `extensions`: {"name": "edit-flags-side-panel-form", "component": "editPatientFlagsWorkspace"}; `extensions`: {"name": "patient-flag-tags", "component": "flagTags", "slot": "patient-highlights-bar-slot"}; `extensions`: {"name": "patient-flags-overview", "component": "flagsOverview", "slot": "patient-chart-summary-dashboard-slot"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 38. packages/esm-patient-forms-app/src/routes.json:1-92

**Observação:** O registro da unidade declara `extensions`: {"name": "offline-tools-dashboard-forms-card", "component": "offlineFormOverviewCard", "slot": "offline-tools-dashboard-cards"}; `extensions`: {"name": "offline-tools-page-forms-link", "component": "offlineFormsNavLink", "slot": "offline-tools-page-slot"}; `extensions`: {"name": "offline-tools-page-forms", "component": "offlineForms", "slot": "offline-tools-page-forms-slot"}; `extensions`: {"name": "clinical-form-action-menu", "component": "clinicalFormActionMenu", "slot": "action-menu-patient-chart-items-slot"}; `extensions`: {"name": "clinical-forms-workspaceExtension", "component": "clinicalFormsWorkspaceExtension", "slot": "ward-patient-clinical-forms-workspace-slot"}; `workspaces`: {"name": "patient-form-entry-workspace", "component": "patientFormEntryWorkspace"}; `workspaces`: {"name": "ward-patient-form-entry-workspace", "component": "patientFormEntryWorkspace"}; `workspaces`: {"name": "patient-html-form-entry-workspace", "component": "patientHtmlFormEntryWorkspace"}; `workspaces`: {"name": "ward-patient-html-form-entry-workspace", "component": "patientHtmlFormEntryWorkspace"}; `workspaces`: {"name": "clinical-forms-workspace", "component": "clinicalFormsWorkspace"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 39. packages/esm-patient-immunizations-app/src/routes.json:1-37

**Observação:** O registro da unidade declara `extensions`: {"name": "immunization-overview-widget", "component": "immunizationsOverview"}; `extensions`: {"name": "immunization-details-widget", "component": "immunizationsDetailedSummary", "slot": "patient-chart-immunizations-dashboard-slot"}; `extensions`: {"name": "immunization-summary-dashboard", "component": "immunizationsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `workspaces`: {"name": "immunization-form-workspace", "component": "immunizationFormWorkspace"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 40. packages/esm-patient-lists-app/src/routes.json:1-31

**Observação:** O registro da unidade declara `extensions`: {"name": "patient-lists-action-menu", "component": "patientListsActionMenu", "slot": "action-menu-patient-chart-items-slot"}; `workspaces`: {"name": "patient-lists", "component": "patientListsWorkspace"}; `workspaces`: {"name": "patient-list-details", "component": "patientListDetailsWorkspace"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 41. packages/esm-patient-medications-app/src/routes.json:1-49

**Observação:** O registro da unidade declara `extensions`: {"name": "medications-details-widget", "component": "medicationsSummary", "slot": "patient-chart-medications-dashboard-slot"}; `extensions`: {"name": "active-medications-widget", "component": "activeMedications", "slot": "patient-chart-summary-dashboard-slot"}; `extensions`: {"name": "medications-summary-dashboard", "component": "medicationsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "drug-order-panel", "component": "drugOrderPanel", "slot": "order-basket-slot"}; `workspaces`: {"name": "add-drug-order", "component": "addDrugOrderWorkspace"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 42. packages/esm-patient-notes-app/src/routes.json:1-32

**Observação:** O registro da unidade declara `extensions`: {"name": "notes-overview-widget", "component": "notesOverview"}; `extensions`: {"name": "visit-note-nav-button", "component": "visitNotesActionButton", "slot": "action-menu-patient-chart-items-slot"}; `workspaces`: {"name": "visit-notes-form-workspace", "component": "visitNotesFormWorkspace"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 43. packages/esm-patient-orders-app/src/routes.json:1-101

**Observação:** O registro da unidade declara `extensions`: {"name": "order-price-details", "component": "orderPriceDetailsExtension", "slot": "order-item-additional-info-slot"}; `extensions`: {"name": "order-stock-details", "component": "orderStockDetailsExtension", "slot": "order-item-additional-info-slot"}; `extensions`: {"name": "order-basket-action-menu", "component": "orderBasketActionMenu"}; `extensions`: {"name": "lab-result", "component": "labResult", "slot": "completed-lab-order-results-slot"}; `extensions`: {"name": "print-lab-results-action-button", "component": "printLabResultsButton", "slot": "print-lab-results-action-button-slot"}; `extensions`: {"name": "patient-orders-summary-dashboard", "component": "ordersDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "patient-orders-dashboard", "component": "ordersDashboard", "slot": "patient-chart-orders-dashboard-slot"}; `workspaces`: {"name": "order-basket", "component": "orderBasketWorkspace"}; `workspaces`: {"name": "patient-orders-form-workspace", "component": "patientOrdersFormWorkspace"}; `workspaces`: {"name": "test-results-form-workspace", "component": "testResultsFormWorkspace"}; `workspaces`: {"name": "orderable-concept-workspace", "component": "orderableConceptSearch"}; `modals`: {"name": "print-lab-results-modal", "component": "printLabResultModal"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 44. packages/esm-patient-programs-app/src/routes.json:1-47

**Observação:** O registro da unidade declara `extensions`: {"name": "programs-overview-widget", "component": "programsOverview"}; `extensions`: {"name": "programs-details-widget", "component": "programsDetailedSummary", "slot": "patient-chart-programs-dashboard-slot"}; `extensions`: {"name": "programs-summary-dashboard", "component": "programsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `workspaces`: {"name": "programs-form-workspace", "component": "programsFormWorkspace"}; `modals`: {"name": "program-delete-confirmation-modal", "component": "deleteProgramConfirmationModal"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 45. packages/esm-patient-tests-app/src/routes.json:1-58

**Observação:** O registro da unidade declara `extensions`: {"name": "test-results-summary-dashboard", "component": "testResultsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "test-results-filtered-overview", "component": "externalOverview", "slot": "test-results-filtered-overview-slot"}; `extensions`: {"name": "results-viewer", "component": "resultsViewer"}; `extensions`: {"name": "lab-order-panel", "component": "labOrderPanel", "slot": "order-basket-slot"}; `workspaces`: {"name": "add-lab-order", "component": "addLabOrderWorkspace"}; `modals`: {"name": "timeline-results-modal", "component": "timelineResultsModal"}; `modals`: {"name": "print-modal", "component": "printModal"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 46. packages/esm-patient-vitals-app/src/routes.json:1-83

**Observação:** O registro da unidade declara `extensions`: {"name": "vitals-overview-widget", "component": "vitalsSummary", "slot": "patient-chart-summary-dashboard-slot"}; `extensions`: {"name": "vitals-details-widget", "component": "vitalsMain", "slot": "patient-chart-vitals-biometrics-dashboard-slot"}; `extensions`: {"name": "patient-vitals-info", "component": "vitalsHeader", "slot": "patient-info-slot"}; `extensions`: {"name": "biometrics-overview-widget", "component": "biometricsOverview", "slot": "patient-chart-summary-dashboard-slot"}; `extensions`: {"name": "biometrics-details-widget", "component": "biometricsDetailedSummary", "slot": "patient-chart-vitals-biometrics-dashboard-slot"}; `extensions`: {"name": "results-summary-dashboard", "component": "vitalsAndBiometricsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "weight-tile", "component": "weightTile", "slot": "visit-form-header-slot"}; `workspaces`: {"name": "patient-vitals-biometrics-form-workspace", "component": "vitalsBiometricsFormWorkspace"}; `modals`: {"name": "vitals-biometrics-delete-confirmation-modal", "component": "vitalsAndBiometricsDeleteConfirmationModal"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 47. packages/esm-form-entry-app/src/routes.json:1-16

**Observação:** O registro da unidade declara `extensions`: {"name": "form-widget", "component": "formWidget", "slot": "form-widget-slot"}.

**Interpretação:** Parametriza os componentes expostos pela unidade para o sistema de extensões do OpenMRS. Os nomes de slots e registros permitem sua resolução pelo framework; este arquivo sozinho não identifica uma segunda unidade consumidora.

### 48. packages/esm-form-entry-app/src/index.ts:66; packages/esm-form-entry-app/src/routes.json:8-11

**Observação:** O trecho contém ` export const formWidget = () => import('./bootstrap'); `. Nos registros citados, packages/esm-form-entry-app/src/routes.json:8-11 declara "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretação:** `formWidget = () => import('./bootstrap')` carrega o próprio `src/bootstrap.ts` da unidade; é `import()` de arquivo local, interno à unidade. O `formWidget` é o componente da extensão `form-widget` (packages/esm-form-entry-app/src/routes.json:8-11); a composição está nos lifecycles abaixo

### 49. packages/esm-form-entry-app/src/declarations.d.ts:3

**Observação:** O trecho contém ` declare const __webpack_share_scopes__; `.

**Interpretação:** `declare const __webpack_share_scopes__;` só declara o tipo do global num `.d.ts`; não executa resolução remota

### 50. packages/esm-form-entry-app/src/bootstrap.ts:21; packages/esm-form-entry-app/src/index.ts:66; packages/esm-form-entry-app/src/routes.json:8-11; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-250; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observação:** O trecho contém ` export const bootstrap = lifecycles.bootstrap; `. Nos registros citados, packages/esm-form-entry-app/src/routes.json:8-11 declara "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretação:** Exporta o lifecycle `bootstrap` criado por `singleSpaAngular` (:12-19). O módulo chega ao framework por `formWidget` (packages/esm-form-entry-app/src/index.ts:66), registrado em `form-widget-slot` (packages/esm-form-entry-app/src/routes.json:8-11); o slot é montado por outras unidades em packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95 e packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-250

### 51. packages/esm-form-entry-app/src/bootstrap.ts:22; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observação:** O trecho contém ` export const mount = lifecycles.mount; `.

**Interpretação:** Exporta o lifecycle `mount` do mesmo `singleSpaAngular` (:12-19), que o framework chama ao montar a extensão `form-widget` no `form-widget-slot` de packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95

### 52. packages/esm-form-entry-app/src/bootstrap.ts:23; packages/esm-form-entry-app/src/routes.json:8-11; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observação:** O trecho contém ` export const unmount = lifecycles.unmount; `. Nos registros citados, packages/esm-form-entry-app/src/routes.json:8-11 declara "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretação:** Exporta o lifecycle `unmount` do mesmo `singleSpaAngular` (:12-19), usado na desmontagem da extensão `form-widget` (packages/esm-form-entry-app/src/routes.json:8-11)

### 53. packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observação:** O trecho contém ` import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular'; `.

**Interpretação:** `import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular'` habilita a criação dos lifecycles em :12-19, exportados em :21-23 para o framework

### 54. packages/esm-form-entry-app/src/bootstrap.ts:12; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observação:** O trecho contém ` const lifecycles = singleSpaAngular({ `.

**Interpretação:** `singleSpaAngular({ bootstrapFunction, template: '<my-app-root />', NgZone })` (:12-19) cria os lifecycles do app Angular, que recebe as props do single-spa em `singleSpaPropsSubject` (:14) e é montado como extensão `form-widget` por outras unidades (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95)

### 55. packages/esm-patient-attachments-app/src/attachments/attachment-preview.component.tsx:56; packages/esm-patient-attachments-app/src/attachments/attachment-preview.component.tsx:53-57

**Observação:** O trecho contém ` <iframe className={styles.pdfViewer} src={attachmentToPreview.src} title="PDFViewer" /> `.

**Interpretação:** `<iframe className={styles.pdfViewer} src={attachmentToPreview.src}>` no ramo `isPdf` (:53-57): mostra o PDF do anexo do paciente, conteúdo e não unidade frontend

### 56. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:50-53; packages/esm-patient-forms-app/src/index.ts:36; packages/esm-patient-forms-app/src/routes.json:67

**Observação:** O trecho contém ` <iframe ref={iframeRef} src={src} className={styles.wrapper} onLoad={onLoad}></iframe> `. Nos registros citados, packages/esm-patient-forms-app/src/routes.json:67 declara "name": "patient-html-form-entry-workspace", "component": "patientHtmlFormEntryWorkspace". A URL recebida pelo iframe é montada como `${window.openmrsBase}/htmlformentryui/htmlform/${uiPage}.page?`, com `returnUrl=post-message:close-workspace`.

**Interpretação:** Embute a página do HFE-UI do OpenMRS 2.x: o `src` é `${window.openmrsBase}/htmlformentryui/htmlform/<page>.page?...` com `returnUrl=post-message:close-workspace` (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44, :50-53); no `onLoad` remove cabeçalho e breadcrumbs da página embutida (:22-38). Ativo pelo workspace `patient-html-form-entry-workspace` (packages/esm-patient-forms-app/src/index.ts:36, packages/esm-patient-forms-app/src/routes.json:67). Unidade alvo externa ao snapshot

### 57. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15; packages/esm-form-engine-app/src/routes.json:13-15; packages/esm-form-engine-app/src/index.ts:19-25

**Observação:** O trecho contém ` window.addEventListener('openmrs:form-view-embedded', handleFormEmbedded); `. Nos registros citados, packages/esm-form-engine-app/src/routes.json:13-15 declara "name": "rfe-form-collapse-toggle", "component": "formCollapseToggle", "slot": "workspace-header-patient-chart-slot".

**Interpretação:** Assina o evento `openmrs:form-view-embedded` em `window` (:14-20) para mostrar o toggle. O componente é a extensão `rfe-form-collapse-toggle` no `workspace-header-patient-chart-slot` (packages/esm-form-engine-app/src/routes.json:13-15, packages/esm-form-engine-app/src/index.ts:19-25). Nenhum arquivo do snapshot dispara esse evento; quem o dispara está fora do snapshot e pode ser a biblioteca `@openmrs/esm-form-engine-lib` renderizada pela própria unidade (packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx) . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 58. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23

**Observação:** O trecho contém ` const FormCollapseToggleEvent = new CustomEvent('openmrs:form-collapse-toggle', { detail: { value } }); `.

**Interpretação:** Cria o `CustomEvent('openmrs:form-collapse-toggle', { detail: { value } })` no `onToggle` (:22-25). Nenhum arquivo do snapshot escuta esse evento, então a unidade alvo não se confirma. A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 59. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24

**Observação:** O trecho contém ` window.dispatchEvent(FormCollapseToggleEvent); `.

**Interpretação:** `window.dispatchEvent(FormCollapseToggleEvent)` dispara o evento criado em :23; o ouvinte está fora do snapshot, como na linha anterior. A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 60. packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56; packages/esm-patient-flags-app/src/flags/flags-highlight-bar.component.tsx:14; packages/esm-patient-flags-app/src/index.ts:3; packages/esm-patient-flags-app/src/routes.json:20

**Observação:** O trecho contém ` window.addEventListener('single-spa:routing-event', listenToRoutingEvent); `. Nos registros citados, packages/esm-patient-flags-app/src/routes.json:20 declara "name": "patient-flag-tags", "slot": "patient-highlights-bar-slot", "component": "flagTags".

**Interpretação:** Assina `single-spa:routing-event` (:55-60) para acompanhar a URL (`e.detail.newUrl`, :47-53). O evento é disparado pelo single-spa do app shell, unidade externa ao snapshot. Ativo: `useCurrentPath` é usado em packages/esm-patient-flags-app/src/flags/flags-highlight-bar.component.tsx:14, componente importado em packages/esm-patient-flags-app/src/index.ts:3 e registrado no `patient-highlights-bar-slot` (packages/esm-patient-flags-app/src/routes.json:20)

### 61. packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20; packages/esm-patient-common-lib/src/form-entry-interop.ts:5; packages/esm-patient-forms-app/src/routes.json:85

**Observação:** O trecho contém ` launchPatientWorkspace(clinicalFormsWorkspaceName); `. Nos registros citados, packages/esm-patient-forms-app/src/routes.json:85 declara "name": "clinical-forms-workspace", "component": "clinicalFormsWorkspace".

**Interpretação:** `launchPatientWorkspace(clinicalFormsWorkspaceName)`, com padrão `clinicalFormsWorkspace` (:14) = `'clinical-forms-workspace'` (packages/esm-patient-common-lib/src/form-entry-interop.ts:5): abre o workspace registrado por packages/esm-patient-forms-app/src/routes.json:85

### 62. packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42; packages/esm-patient-forms-app/src/routes.json:85

**Observação:** O trecho contém ` !encounterUuid && openClinicalFormsWorkspaceOnFormClose && launchPatientWorkspace(clinicalFormsWorkspaceName); `. Nos registros citados, packages/esm-patient-forms-app/src/routes.json:85 declara "name": "clinical-forms-workspace", "component": "clinicalFormsWorkspace".

**Interpretação:** Ao fechar o formulário sem encontro, `launchPatientWorkspace(clinicalFormsWorkspaceName)` (padrão em :33) reabre o workspace `clinical-forms-workspace` de packages/esm-patient-forms-app/src/routes.json:85

### 63. packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259; packages/esm-patient-chart-app/src/routes.json:210

**Observação:** O trecho contém ` const dispose = showModal('modify-visit-date-dialog', { `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:210 declara "name": "modify-visit-date-dialog", "component": "modifyVisitDateModal".

**Interpretação:** `showModal('modify-visit-date-dialog', ...)` abre o modal registrado por packages/esm-patient-chart-app/src/routes.json:210

### 64. packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113

**Observação:** O trecho contém ` <ExtensionSlot name={config.interpretationSlot} style={{ gridTemplateColumns: '1fr' }} /> `.

**Interpretação:** `<ExtensionSlot name={config.interpretationSlot}>` (:111-115) monta as extensões de um slot cujo nome vem da configuração; nenhum `routes.json` do snapshot o preenche, então a unidade alvo não se confirma. A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 65. packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24; packages/esm-patient-chart-app/src/clinical-views/encounter-list/encounter-list.component.tsx:7; packages/esm-patient-forms-app/src/routes.json:49

**Observação:** O trecho contém ` launchPatientWorkspace('patient-form-entry-workspace', { `. Nos registros citados, packages/esm-patient-forms-app/src/routes.json:49 declara "name": "patient-form-entry-workspace", "component": "patientFormEntryWorkspace".

**Interpretação:** `launchPatientWorkspace('patient-form-entry-workspace', ...)` em `launchEncounterForm` (usado em packages/esm-patient-chart-app/src/clinical-views/encounter-list/encounter-list.component.tsx:7) abre o workspace registrado por packages/esm-patient-forms-app/src/routes.json:49

### 66. packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124; packages/esm-patient-chart-app/src/routes.json:114; packages/esm-patient-vitals-app/src/routes.json:65

**Observação:** O trecho contém ` <ExtensionSlot className={styles.dataGridRow} name="visit-form-header-slot" state={memoizedPatientUuid} /> `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:114 declara "name": "patient-details-tile", "slot": "visit-form-header-slot", "component": "patientDetailsTile"; packages/esm-patient-vitals-app/src/routes.json:65 declara "name": "weight-tile", "component": "weightTile", "slot": "visit-form-header-slot".

**Interpretação:** `<ExtensionSlot name="visit-form-header-slot">` monta as extensões do slot, preenchido pela própria unidade (packages/esm-patient-chart-app/src/routes.json:114) e por packages/esm-patient-vitals-app/src/routes.json:65

### 67. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-orders-app/src/routes.json:49; packages/esm-patient-allergies-app/src/routes.json:26; packages/esm-patient-vitals-app/src/routes.json:55

**Observação:** O trecho contém ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:49 declara "name": "patient-orders-summary-dashboard", "component": "ordersDashboardLink", "slot": "patient-chart-dashboard-slot", "slot": "patient-chart-orders-dashboard-slot"; packages/esm-patient-allergies-app/src/routes.json:26 declara "name": "allergies-summary-dashboard", "component": "allergiesDashboardLink", "slot": "patient-chart-dashboard-slot", "slot": "patient-chart-allergies-dashboard-slot"; packages/esm-patient-vitals-app/src/routes.json:55 declara "name": "results-summary-dashboard", "component": "vitalsAndBiometricsDashboardLink", "slot": "patient-chart-dashboard-slot", "slot": "patient-chart-vitals-biometrics-dashboard-slot".

**Interpretação:** Lê do `useExtensionStore()` (:34) as extensões atribuídas a `patient-chart-dashboard-slot` (:37-39) e aos grupos de navegação (:40-45) para montar os dashboards. O slot é preenchido por orders, attachments, allergies, programs, immunizations, medications, conditions, tests, vitals e a própria unidade (`"slot": "patient-chart-dashboard-slot"` em packages/esm-patient-orders-app/src/routes.json:49, packages/esm-patient-allergies-app/src/routes.json:26, packages/esm-patient-vitals-app/src/routes.json:55, entre outros)

### 68. packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66

**Observação:** O trecho contém ` <ExtensionSlot state={state} name="top-of-all-patient-dashboards-slot" /> `.

**Interpretação:** `<ExtensionSlot name="top-of-all-patient-dashboards-slot">` monta extensões no topo de todo dashboard; nenhum `routes.json` do snapshot preenche o slot . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 69. packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/dashboard.meta.ts:2; packages/esm-patient-flags-app/src/routes.json:27; packages/esm-patient-medications-app/src/routes.json:18; packages/esm-patient-conditions-app/src/routes.json:10; packages/esm-patient-vitals-app/src/routes.json:11

**Observação:** O trecho contém ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> `. Nos registros citados, packages/esm-patient-flags-app/src/routes.json:27 declara "name": "patient-flags-overview", "slot": "patient-chart-summary-dashboard-slot", "component": "flagsOverview"; packages/esm-patient-medications-app/src/routes.json:18 declara "name": "active-medications-widget", "component": "activeMedications", "slot": "patient-chart-summary-dashboard-slot"; packages/esm-patient-conditions-app/src/routes.json:10 declara "name": "conditions-overview-widget", "slot": "patient-chart-summary-dashboard-slot", "component": "conditionsOverview"; packages/esm-patient-vitals-app/src/routes.json:11 declara "name": "vitals-overview-widget", "component": "vitalsSummary", "slot": "patient-chart-summary-dashboard-slot".

**Interpretação:** `<ExtensionSlot name={dashboard.slot}>` com `<Extension state={state}>` (:69-78) monta os widgets do dashboard escolhido, com metadados de largura de `useExtensionSlotMeta` (:35). Os slots dos dashboards são preenchidos por outras unidades, por exemplo `patient-chart-summary-dashboard-slot` (packages/esm-patient-chart-app/src/dashboard.meta.ts:2) por packages/esm-patient-flags-app/src/routes.json:27, packages/esm-patient-medications-app/src/routes.json:18, packages/esm-patient-conditions-app/src/routes.json:10 e packages/esm-patient-vitals-app/src/routes.json:11

### 70. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-orders-app/src/routes.json:47-51; packages/esm-patient-allergies-app/src/routes.json:24-31; packages/esm-patient-vitals-app/src/routes.json:53-58

**Observação:** O trecho contém ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); `.

**Interpretação:** `setLeftNav({ name: 'patient-chart-dashboard-slot', ... })` entrega ao framework a navegação lateral formada pelas extensões desse slot, registradas por várias unidades (ver linha de chart-review.component.tsx:37); `unsetLeftNav` na limpeza (:48)

### 71. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-banner-app/src/routes.json:23

**Observação:** O trecho contém ` <ExtensionSlot name="patient-header-slot" state={state} /> `. Nos registros citados, packages/esm-patient-banner-app/src/routes.json:23 declara "name": "patient-banner", "slot": "patient-header-slot", "component": "patientBanner".

**Interpretação:** `<ExtensionSlot name="patient-header-slot">` monta o banner do paciente registrado por packages/esm-patient-banner-app/src/routes.json:23

### 72. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68; packages/esm-patient-flags-app/src/routes.json:20

**Observação:** O trecho contém ` <ExtensionSlot name="patient-highlights-bar-slot" state={state} /> `. Nos registros citados, packages/esm-patient-flags-app/src/routes.json:20 declara "name": "patient-flag-tags", "slot": "patient-highlights-bar-slot", "component": "flagTags".

**Interpretação:** `<ExtensionSlot name="patient-highlights-bar-slot">` monta a barra de flags registrada por packages/esm-patient-flags-app/src/routes.json:20

### 73. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69; packages/esm-patient-vitals-app/src/routes.json:31

**Observação:** O trecho contém ` <ExtensionSlot name="patient-info-slot" state={state} /> `. Nos registros citados, packages/esm-patient-vitals-app/src/routes.json:31 declara "name": "patient-vitals-info", "component": "vitalsHeader", "slot": "patient-info-slot".

**Interpretação:** `<ExtensionSlot name="patient-info-slot">` monta a extensão registrada por packages/esm-patient-vitals-app/src/routes.json:31

### 74. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389-392; packages/esm-patient-banner-app/src/routes.json:23

**Observação:** O trecho contém ` <ExtensionSlot name="patient-header-slot" state={{ patient, `. Nos registros citados, packages/esm-patient-banner-app/src/routes.json:23 declara "name": "patient-banner", "slot": "patient-header-slot", "component": "patientBanner".

**Interpretação:** `<ExtensionSlot name="patient-header-slot">` (:389-390) no formulário de visita monta o banner de packages/esm-patient-banner-app/src/routes.json:23

### 75. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410-413; packages/esm-patient-vitals-app/src/routes.json:65

**Observação:** O trecho contém ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={visitHeaderSlotState} `. Nos registros citados, packages/esm-patient-vitals-app/src/routes.json:65 declara "name": "weight-tile", "component": "weightTile", "slot": "visit-form-header-slot".

**Interpretação:** `<ExtensionSlot name="visit-form-header-slot">` (:410-411) monta extensões da própria unidade e de packages/esm-patient-vitals-app/src/routes.json:65

### 76. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452

**Observação:** O trecho contém ` name="visit-form-top-slot" `.

**Interpretação:** `VisitFormExtensionSlot name="visit-form-top-slot"` (:451-456), que monta `<ExtensionSlot name={name}>` com `<Extension>` (:633-645); nenhum `routes.json` do snapshot preenche o slot . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 77. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547

**Observação:** O trecho contém ` <ExtensionSlot state={{ patientUuid, setExtraVisitInfo }} name="extra-visit-attribute-slot" /> `.

**Interpretação:** `<ExtensionSlot name="extra-visit-attribute-slot">`; nenhum `routes.json` do snapshot preenche o slot . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 78. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562

**Observação:** O trecho contém ` name="visit-form-bottom-slot" `.

**Interpretação:** `VisitFormExtensionSlot name="visit-form-bottom-slot"` (:561-566), mesmo mecanismo de :633-645; nenhum `routes.json` do snapshot preenche o slot . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 79. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23; packages/esm-patient-allergies-app/src/routes.json:42; packages/esm-patient-chart-app/src/index.ts:195; packages/esm-patient-chart-app/src/routes.json:174

**Observação:** O trecho contém ` const launchAllergiesFormWorkspace = useLaunchWorkspaceRequiringVisit('patient-allergy-form-workspace'); `. Nos registros citados, packages/esm-patient-allergies-app/src/routes.json:42 declara "name": "patient-allergy-form-workspace", "component": "allergyFormWorkspace"; packages/esm-patient-chart-app/src/routes.json:174 declara "name": "active-visit-action-button", "slot": "active-visit-actions", "component": "activeVisitActionsComponent".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('patient-allergy-form-workspace')`, acionado nos botões (:67, :121), abre o workspace de packages/esm-patient-allergies-app/src/routes.json:42. Componente ativo: `activeVisitActionsComponent` (packages/esm-patient-chart-app/src/index.ts:195, packages/esm-patient-chart-app/src/routes.json:174)

### 80. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24

**Observação:** O trecho contém ` const launchAppointmentsFormWorkspace = useLaunchWorkspaceRequiringVisit('appointments-form-workspace'); `.

**Interpretação:** `useLaunchWorkspaceRequiringVisit('appointments-form-workspace')` (botões em :73, :127); nenhum `routes.json` do snapshot registra esse workspace, então a unidade alvo não se confirma. A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 81. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25; packages/esm-patient-forms-app/src/routes.json:85

**Observação:** O trecho contém ` const launchClinicalFormsWorkspace = useLaunchWorkspaceRequiringVisit('clinical-forms-workspace'); `. Nos registros citados, packages/esm-patient-forms-app/src/routes.json:85 declara "name": "clinical-forms-workspace", "component": "clinicalFormsWorkspace".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('clinical-forms-workspace')` (botões em :79, :133) abre o workspace de packages/esm-patient-forms-app/src/routes.json:85

### 82. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26; packages/esm-patient-conditions-app/src/routes.json:46

**Observação:** O trecho contém ` const launchConditionsFormWorkspace = useLaunchWorkspaceRequiringVisit('conditions-form-workspace'); `. Nos registros citados, packages/esm-patient-conditions-app/src/routes.json:46 declara "name": "conditions-form-workspace", "component": "conditionsFormWorkspace".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('conditions-form-workspace')` (botões em :61, :115) abre o workspace de packages/esm-patient-conditions-app/src/routes.json:46

### 83. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` const launchOrderBasketFormWorkspace = useLaunchWorkspaceRequiringVisit('order-basket'); `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('order-basket')` (botões em :49, :98) abre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 84. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28; packages/esm-patient-notes-app/src/routes.json:25

**Observação:** O trecho contém ` const launchVisitNotesFormWorkspace = useLaunchWorkspaceRequiringVisit('visit-notes-form-workspace'); `. Nos registros citados, packages/esm-patient-notes-app/src/routes.json:25 declara "name": "visit-notes-form-workspace", "component": "visitNotesFormWorkspace".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('visit-notes-form-workspace')` (botões em :43, :90) abre o workspace de packages/esm-patient-notes-app/src/routes.json:25

### 85. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29; packages/esm-patient-vitals-app/src/routes.json:72

**Observação:** O trecho contém ` const launchVitalsAndBiometricsFormWorkspace = useLaunchWorkspaceRequiringVisit( `. Nos registros citados, packages/esm-patient-vitals-app/src/routes.json:72 declara "name": "patient-vitals-biometrics-form-workspace", "component": "vitalsBiometricsFormWorkspace".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('patient-vitals-biometrics-form-workspace')` (:29-31; botões em :55, :109) abre o workspace de packages/esm-patient-vitals-app/src/routes.json:72

### 86. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236; packages/esm-patient-notes-app/src/routes.json:25

**Observação:** O trecho contém ` launchWorkspace('visit-notes-form-workspace', { `. Nos registros citados, packages/esm-patient-notes-app/src/routes.json:25 declara "name": "visit-notes-form-workspace", "component": "visitNotesFormWorkspace".

**Interpretação:** `launchWorkspace('visit-notes-form-workspace', ...)` para editar a nota de visita abre o workspace de packages/esm-patient-notes-app/src/routes.json:25; nos demais encontros chama `launchFormEntryOrHtmlForms` (:242), registrado nas linhas de packages/esm-patient-common-lib/src/form-entry-interop.ts

### 87. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281; packages/esm-patient-notes-app/src/routes.json:25

**Observação:** O trecho contém ` launchWorkspace('visit-notes-form-workspace', { `. Nos registros citados, packages/esm-patient-notes-app/src/routes.json:25 declara "name": "visit-notes-form-workspace", "component": "visitNotesFormWorkspace".

**Interpretação:** Segundo ponto de edição da tabela: `launchWorkspace('visit-notes-form-workspace', ...)` abre o mesmo workspace de packages/esm-patient-notes-app/src/routes.json:25; alternativa `launchFormEntryOrHtmlForms` em :287

### 88. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13; packages/esm-patient-tests-app/src/routes.json:22

**Observação:** O trecho contém ` return <ExtensionSlot name="test-results-filtered-overview-slot" state={{ filter, patientUuid }} />; `. Nos registros citados, packages/esm-patient-tests-app/src/routes.json:22 declara "name": "test-results-filtered-overview", "slot": "test-results-filtered-overview-slot", "component": "externalOverview".

**Interpretação:** `<ExtensionSlot name="test-results-filtered-overview-slot">` monta a extensão registrada por packages/esm-patient-tests-app/src/routes.json:22

### 89. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159

**Observação:** O trecho contém ` <ExtensionSlot name={visitSummaryPanelSlot}> `.

**Interpretação:** `<ExtensionSlot name={visitSummaryPanelSlot}>` com `<Extension>` (:159-163), slot `visit-summary-panels` (:30), cujas abas vêm de `useAssignedExtensions` (:35); nenhum `routes.json` do snapshot preenche o slot . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 90. packages/esm-patient-common-lib/src/form-entry-interop.ts:70; packages/esm-patient-forms-app/src/routes.json:49; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:242; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:287

**Observação:** O trecho contém ` launchWorkspace(formEntryWorkspaceName, { `. Nos registros citados, packages/esm-patient-forms-app/src/routes.json:49 declara "name": "patient-form-entry-workspace", "component": "patientFormEntryWorkspace".

**Interpretação:** `launchWorkspace(formEntryWorkspaceName, ...)` em `launchFormEntry`, com padrão `'patient-form-entry-workspace'` (:6, :68), abre o workspace de packages/esm-patient-forms-app/src/routes.json:49. Chamado por `launchFormEntryOrHtmlForms` (:36) a partir de outra unidade em packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:242 e :287. Unidade `—`: a biblioteca é `No` na revisão estrutural

### 91. packages/esm-patient-common-lib/src/form-entry-interop.ts:97; packages/esm-patient-forms-app/src/routes.json:67

**Observação:** O trecho contém ` launchWorkspace(workspaceName, { `. Nos registros citados, packages/esm-patient-forms-app/src/routes.json:67 declara "name": "patient-html-form-entry-workspace", "component": "patientHtmlFormEntryWorkspace".

**Interpretação:** `launchWorkspace(workspaceName, ...)` em `launchHtmlFormEntry`, com padrão `'patient-html-form-entry-workspace'` (:7, :95), abre o workspace de packages/esm-patient-forms-app/src/routes.json:67; chamado por `launchFormEntryOrHtmlForms` (:34), usado pelo chart nos mesmos pontos da linha anterior

### 92. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-immunizations-app/src/immunizations/immunizations-detailed-summary.component.tsx:67; packages/esm-patient-notes-app/src/notes/notes-main.component.tsx:36; packages/esm-patient-common-lib/src/form-entry-interop.ts:52; packages/esm-patient-common-lib/src/workspaces.ts:62

**Observação:** O trecho contém ` const dispose = showModal('start-visit-dialog', { `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:214 declara "name": "start-visit-dialog", "component": "startVisitModal".

**Interpretação:** `showModal('start-visit-dialog', ...)` abre o modal de packages/esm-patient-chart-app/src/routes.json:214. Chamado por outras unidades em packages/esm-patient-immunizations-app/src/immunizations/immunizations-detailed-summary.component.tsx:67 e packages/esm-patient-notes-app/src/notes/notes-main.component.tsx:36, e pelos helpers da própria biblioteca (packages/esm-patient-common-lib/src/form-entry-interop.ts:52, packages/esm-patient-common-lib/src/workspaces.ts:62)

### 93. packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24; packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:36

**Observação:** O trecho contém ` <ExtensionSlot name={slotName ?? title} state={{ basePath }} /> `.

**Interpretação:** `<ExtensionSlot name={slotName ?? title}>` monta os links de um grupo de navegação cujo slot vem de quem chama (packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:36); nenhum `routes.json` do snapshot preenche esses slots . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 94. packages/esm-patient-common-lib/src/orders/store.ts:24; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:90; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:86-94; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38; packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:31

**Observação:** O trecho contém ` export const orderBasketStore = createGlobalStore<OrderBasketStore>('order-basket', initialState); `. O helper `useOrderBasket` lê e escreve o store; os consumidores identificados na 3.4.4 são orders e medications.

**Interpretação:** `createGlobalStore<OrderBasketStore>('order-basket', initialState)` define o store global do carrinho de pedidos, compartilhado pelo nome no framework. Lido e escrito por orders e medications via `useOrderBasket` (packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:90), por exemplo em packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx e packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx

### 95. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:39; packages/esm-patient-common-lib/src/workspaces.ts:44; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:38-41; packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:362; packages/esm-patient-orders-app/src/order-basket/general-order-type/orderable-concept-search/orderable-concept-search.workspace.tsx:51

**Observação:** O trecho contém ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); `. O chart grava o paciente no store; medications e orders o leem pelos consumidores citados na revisão.

**Interpretação:** `createGlobalStore<PatientChartStore>('patient-chart-global-store', {})` (:8-10) define o store global do paciente corrente. Escrito pela unidade chart (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:39) e lido por outras unidades, por exemplo packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx e packages/esm-patient-orders-app/src/order-basket/general-order-type/orderable-concept-search/orderable-concept-search.workspace.tsx, além de `useLaunchWorkspaceRequiringVisit` (packages/esm-patient-common-lib/src/workspaces.ts:44)

### 96. packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-chart-app/src/routes.json:218

**Observação:** O trecho contém ` const dispose = showModal('visit-context-switcher', { `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:218 declara "name": "visit-context-switcher", "component": "visitContextSwitcherModal".

**Interpretação:** Em `useLaunchWorkspaceRequiringVisit`, sem visita ativa e com `rde`, `showModal('visit-context-switcher', ...)` abre o modal de packages/esm-patient-chart-app/src/routes.json:218; os `launchWorkspace(workspaceName)` de :52 e :58 abrem o workspace nomeado por quem chama, registrado nas linhas das unidades chamadoras

### 97. packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94; packages/esm-patient-chart-app/src/routes.json:181

**Observação:** O trecho contém ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:181 declara "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretação:** `<ExtensionSlot name="visit-context-header-slot">` monta a extensão registrada por packages/esm-patient-chart-app/src/routes.json:181

### 98. packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-engine-app/src/routes.json:8-10; packages/esm-form-entry-app/src/routes.json:8-11

**Observação:** O trecho contém ` {showForm && formInfo && patientUuid && patient && <ExtensionSlot name="form-widget-slot" state={state} />} `. Nos registros citados, packages/esm-form-engine-app/src/routes.json:8-10 declara "name": "react-form-engine-widget", "component": "formRenderer", "slot": "form-widget-slot"; packages/esm-form-entry-app/src/routes.json:8-11 declara "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretação:** `<ExtensionSlot name="form-widget-slot" state={state}>` monta o motor de formulário das unidades form-engine (packages/esm-form-engine-app/src/routes.json:8-10) e form-entry (packages/esm-form-entry-app/src/routes.json:8-11)

### 99. packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12; packages/esm-patient-chart-app/src/routes.json:181

**Observação:** O trecho contém ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:181 declara "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretação:** `<ExtensionSlot name="visit-context-header-slot">` monta a extensão de packages/esm-patient-chart-app/src/routes.json:181

### 100. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:44; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19

**Observação:** O trecho contém ` window.addEventListener('message', callback); `.

**Interpretação:** `window.addEventListener('message', callback)` (:15-19) recebe `'close-workspace'` da página HFE-UI embutida no iframe de :43, que envia a mensagem por causa do `returnUrl=post-message:close-workspace` (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27, :44). O regex de `src-cross-unit-communication` não pega `'message'`

### 101. packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `launchPatientWorkspace('order-basket')` no `onWorkspaceClose` do próprio workspace reabre o carrinho de packages/esm-patient-orders-app/src/routes.json:68

### 102. packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** Segundo ponto do mesmo workspace: `launchPatientWorkspace('order-basket')` reabre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 103. packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213

**Observação:** O trecho contém ` <ExtensionSlot name="medication-info-slot" state={{ order: orderBasketItem }} /> `.

**Interpretação:** `<ExtensionSlot name="medication-info-slot">`; nenhum `routes.json` do snapshot preenche o slot . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 104. packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `launchPatientWorkspace('order-basket')` ao fechar a busca de medicamentos abre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 105. packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `launchPatientWorkspace('order-basket')` depois de adicionar o item abre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 106. packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` const launchOrderBasket = useLaunchWorkspaceRequiringVisit('order-basket'); `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('order-basket')` abre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 107. packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` closeWorkspace('order-basket', { `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `closeWorkspace('order-basket', ...)` fecha o workspace de packages/esm-patient-orders-app/src/routes.json:68 e, no `onWorkspaceClose`, abre o `add-drug-order` da própria unidade (:57-63)

### 108. packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` closeWorkspace('order-basket', { `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** Segundo ponto (`openDrugForm`, :65-71): `closeWorkspace('order-basket', ...)` fecha o workspace de packages/esm-patient-orders-app/src/routes.json:68 antes de abrir o formulário da própria unidade

### 109. packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103-106; packages/esm-patient-orders-app/src/routes.json:15; packages/esm-patient-orders-app/src/routes.json:21

**Observação:** O trecho contém ` <ExtensionSlot name="order-item-additional-info-slot" state={additionalInfoSlotState} className={styles.additionalInfoContainer} `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:15 declara "name": "order-price-details", "component": "orderPriceDetailsExtension", "slot": "order-item-additional-info-slot"; packages/esm-patient-orders-app/src/routes.json:21 declara "name": "order-stock-details", "component": "orderStockDetailsExtension", "slot": "order-item-additional-info-slot".

**Interpretação:** `<ExtensionSlot name="order-item-additional-info-slot">` (:103-104) monta as extensões de packages/esm-patient-orders-app/src/routes.json:15 e :21

### 110. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315; packages/esm-patient-attachments-app/src/routes.json:30

**Observação:** O trecho contém ` const close = showModal('capture-photo-modal', { `. Nos registros citados, packages/esm-patient-attachments-app/src/routes.json:30 declara "name": "capture-photo-modal", "component": "capturePhotoModal".

**Interpretação:** `showModal('capture-photo-modal', ...)` abre o modal de packages/esm-patient-attachments-app/src/routes.json:30

### 111. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497; packages/esm-patient-chart-app/src/routes.json:181

**Observação:** O trecho contém ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:181 declara "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretação:** `<ExtensionSlot name="visit-context-header-slot">` monta a extensão de packages/esm-patient-chart-app/src/routes.json:181

### 112. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501; packages/esm-patient-chart-app/src/routes.json:114; packages/esm-patient-vitals-app/src/routes.json:65

**Observação:** O trecho contém ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={memoizedState} /> `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:114 declara "name": "patient-details-tile", "slot": "visit-form-header-slot", "component": "patientDetailsTile"; packages/esm-patient-vitals-app/src/routes.json:65 declara "name": "weight-tile", "component": "weightTile", "slot": "visit-form-header-slot".

**Interpretação:** `<ExtensionSlot name="visit-form-header-slot">` monta as extensões de packages/esm-patient-chart-app/src/routes.json:114 e packages/esm-patient-vitals-app/src/routes.json:65

### 113. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120; packages/esm-patient-medications-app/src/routes.json:43

**Observação:** O trecho contém ` const launchAddDrugOrder = useLaunchWorkspaceRequiringVisit('add-drug-order'); `. Nos registros citados, packages/esm-patient-medications-app/src/routes.json:43 declara "name": "add-drug-order", "component": "addDrugOrderWorkspace".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('add-drug-order')` abre o workspace de packages/esm-patient-medications-app/src/routes.json:43

### 114. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121; packages/esm-patient-tests-app/src/routes.json:52

**Observação:** O trecho contém ` const launchModifyLabOrder = useLaunchWorkspaceRequiringVisit('add-lab-order'); `. Nos registros citados, packages/esm-patient-tests-app/src/routes.json:52 declara "name": "add-lab-order", "component": "addLabOrderWorkspace".

**Interpretação:** `useLaunchWorkspaceRequiringVisit('add-lab-order')` abre o workspace de packages/esm-patient-tests-app/src/routes.json:52

### 115. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534-537

**Observação:** O trecho contém `` <ExtensionSlot name={`${matchingOrder.type}-action-menu-items-slot`} state={{ className: styles.menuItem, ``.

**Interpretação:** `` <ExtensionSlot name={`${matchingOrder.type}-action-menu-items-slot`}> `` (:534-535); o nome depende do tipo do pedido e nenhum `routes.json` do snapshot preenche slots com esse sufixo . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 116. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561-564

**Observação:** O trecho contém `` <ExtensionSlot name={`${matchingOrder.type}-detail-slot`} state={{ orderItem: matchingOrder, ``.

**Interpretação:** `` <ExtensionSlot name={`${matchingOrder.type}-detail-slot`}> `` (:561-562); nenhum `routes.json` do snapshot preenche slots com esse sufixo . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 117. packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169

**Observação:** O trecho contém ` <ExtensionSlot name="top-of-lab-order-form-slot" state={{ order: initialOrder }} /> `.

**Interpretação:** `<ExtensionSlot name="top-of-lab-order-form-slot">`; nenhum `routes.json` do snapshot preenche o slot . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 118. packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57; packages/esm-patient-chart-app/src/routes.json:214

**Observação:** O trecho contém ` const dispose = showModal('start-visit-dialog', { `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:214 declara "name": "start-visit-dialog", "component": "startVisitModal".

**Interpretação:** `showModal('start-visit-dialog', ...)` abre o modal de packages/esm-patient-chart-app/src/routes.json:214

### 119. packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154; packages/esm-patient-chart-app/src/routes.json:181

**Observação:** O trecho contém ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:181 declara "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretação:** `<ExtensionSlot name="visit-context-header-slot">` monta a extensão de packages/esm-patient-chart-app/src/routes.json:181

### 120. packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156-159; packages/esm-patient-medications-app/src/routes.json:37; packages/esm-patient-tests-app/src/routes.json:36

**Observação:** O trecho contém ` <ExtensionSlot className={classNames(styles.orderBasketSlot, { [styles.orderBasketSlotTablet]: isTablet, })} `. Nos registros citados, packages/esm-patient-medications-app/src/routes.json:37 declara "name": "drug-order-panel", "component": "drugOrderPanel", "slot": "order-basket-slot"; packages/esm-patient-tests-app/src/routes.json:36 declara "name": "lab-order-panel", "component": "labOrderPanel", "slot": "order-basket-slot".

**Interpretação:** `<ExtensionSlot>` do `order-basket-slot` monta os painéis de packages/esm-patient-medications-app/src/routes.json:37 e packages/esm-patient-tests-app/src/routes.json:36

### 121. packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `launchPatientWorkspace('order-basket')` no `onWorkspaceClose` reabre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 122. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `launchPatientWorkspace('order-basket')` depois de salvar o pedido abre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 123. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** Segundo ponto do formulário: `launchPatientWorkspace('order-basket')` abre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 124. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193

**Observação:** O trecho contém ` <ExtensionSlot name="top-of-lab-order-form-slot" state={{ order: initialOrder }} /> `.

**Interpretação:** `<ExtensionSlot name="top-of-lab-order-form-slot">`; nenhum `routes.json` do snapshot preenche o slot . A contraparte pode pertencer a outra unidade externa ao snapshot ou o ponto pode permanecer sem conexão; essas leituras continuam plausíveis.

### 125. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `launchPatientWorkspace('order-basket')` ao fechar a busca abre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 126. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** Segundo ponto da busca: `launchPatientWorkspace('order-basket')` abre o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 127. packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68-71; packages/esm-patient-orders-app/src/routes.json:15; packages/esm-patient-orders-app/src/routes.json:21

**Observação:** O trecho contém ` <ExtensionSlot name="order-item-additional-info-slot" state={additionalInfoSlotState} className={styles.additionalInfoContainer} `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:15 declara "name": "order-price-details", "component": "orderPriceDetailsExtension", "slot": "order-item-additional-info-slot"; packages/esm-patient-orders-app/src/routes.json:21 declara "name": "order-stock-details", "component": "orderStockDetailsExtension", "slot": "order-item-additional-info-slot".

**Interpretação:** `<ExtensionSlot name="order-item-additional-info-slot">` (:68-69) monta as extensões de packages/esm-patient-orders-app/src/routes.json:15 e :21

### 128. packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` closeWorkspace('order-basket', { `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** `closeWorkspace('order-basket', ...)` fecha o workspace de packages/esm-patient-orders-app/src/routes.json:68 e abre o `add-lab-order` da própria unidade no `onWorkspaceClose` (:98-107)

### 129. packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** O trecho contém ` closeWorkspace('order-basket', { `. Nos registros citados, packages/esm-patient-orders-app/src/routes.json:68 declara "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretação:** Segundo ponto (`openEditLabForm`, :109-120): `closeWorkspace('order-basket', ...)` fecha o workspace de packages/esm-patient-orders-app/src/routes.json:68

### 130. packages/esm-patient-vitals-app/src/utils.ts:16-19; packages/esm-patient-forms-app/src/routes.json:49; packages/esm-patient-vitals-app/src/config-schema.ts:51-53; packages/esm-patient-vitals-app/src/constants.ts:1; packages/esm-patient-vitals-app/src/routes.json:72; packages/esm-patient-vitals-app/src/vitals/vitals-overview.component.tsx:42; packages/esm-patient-vitals-app/src/biometrics/biometrics-base.component.tsx:33; packages/esm-patient-vitals-app/src/vitals-and-biometrics-header/vitals-header.component.tsx:48; packages/esm-patient-vitals-app/src/routes.json:29-30

**Observação:** O trecho contém ` const launchVitalsAndBiometricsForm = useLaunchWorkspaceRequiringVisit( useFormEngine ? 'patient-form-entry-workspace' : patientVitalsBiometricsFormWorkspace, );  `. Nos registros citados, packages/esm-patient-forms-app/src/routes.json:49 declara "name": "patient-form-entry-workspace", "component": "patientFormEntryWorkspace"; packages/esm-patient-vitals-app/src/routes.json:72 declara "name": "patient-vitals-biometrics-form-workspace", "component": "vitalsBiometricsFormWorkspace"; packages/esm-patient-vitals-app/src/routes.json:29-30 declara "name": "patient-vitals-info", "component": "vitalsHeader", "slot": "patient-info-slot".

**Interpretação:** Em `useLaunchVitalsAndBiometricsForm`, `useLaunchWorkspaceRequiringVisit(useFormEngine ? 'patient-form-entry-workspace' : patientVitalsBiometricsFormWorkspace)` (:16-18): com `config.vitals.useFormEngine` ligado, abre o workspace de packages/esm-patient-forms-app/src/routes.json:49; desligado (padrão `false`, packages/esm-patient-vitals-app/src/config-schema.ts:51-53), abre o workspace da própria unidade (packages/esm-patient-vitals-app/src/constants.ts:1, packages/esm-patient-vitals-app/src/routes.json:72). Chamado em packages/esm-patient-vitals-app/src/vitals/vitals-overview.component.tsx:42, packages/esm-patient-vitals-app/src/biometrics/biometrics-base.component.tsx:33 e packages/esm-patient-vitals-app/src/vitals-and-biometrics-header/vitals-header.component.tsx:48 (`vitalsHeader`, packages/esm-patient-vitals-app/src/routes.json:29-30). Ver Notas

### 131. packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-252; packages/esm-form-engine-app/src/routes.json:8-10; packages/esm-form-entry-app/src/routes.json:8-11

**Observação:** O trecho contém ` <ExtensionSlot name="form-widget-slot" state={{ view: 'form', `. Nos registros citados, packages/esm-form-engine-app/src/routes.json:8-10 declara "name": "react-form-engine-widget", "component": "formRenderer", "slot": "form-widget-slot"; packages/esm-form-entry-app/src/routes.json:8-11 declara "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretação:** `<ExtensionSlot name="form-widget-slot">` (:249-250) monta o motor de formulário de packages/esm-form-engine-app/src/routes.json:8-10 e packages/esm-form-entry-app/src/routes.json:8-11

### 132. packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268; packages/esm-patient-chart-app/src/routes.json:181

**Observação:** O trecho contém ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:181 declara "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretação:** No ramo de carregamento (:265-268), `<ExtensionSlot name="visit-context-header-slot">` monta a extensão de packages/esm-patient-chart-app/src/routes.json:181

### 133. packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300; packages/esm-patient-chart-app/src/routes.json:181

**Observação:** O trecho contém ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. Nos registros citados, packages/esm-patient-chart-app/src/routes.json:181 declara "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretação:** No ramo principal do formulário (:298-300), `<ExtensionSlot name="visit-context-header-slot">` monta a extensão de packages/esm-patient-chart-app/src/routes.json:181

### 134. .; package.json:5-7

**Observação:** O diretório `.` tem manifesto `package.json`. Entrada: —. Build: — (só `turbo run` em scripts e CI, sem build próprio). Workspace: package.json:5-7 (raiz que declara `workspaces: ["packages/*"]`).

**Interpretação:** Raiz do workspace sem entrada de aplicação; o build é orquestrado nos pacotes.

### 135. packages/esm-form-engine-app; packages/esm-form-engine-app/package.json:7; packages/esm-form-engine-app/webpack.config.js:2; packages/esm-form-engine-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-form-engine-app` tem manifesto `packages/esm-form-engine-app/package.json`. Entrada: packages/esm-form-engine-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-form-engine-app/webpack.config.js:2 (`openmrs/default-webpack-config`) + packages/esm-form-engine-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 136. packages/esm-form-entry-app; packages/esm-form-entry-app/angular.json:42; packages/esm-form-entry-app/webpack.config.js:48; packages/esm-form-entry-app/angular.json:26-27; packages/esm-form-entry-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-form-entry-app` tem manifesto `packages/esm-form-entry-app/package.json`. Entrada: packages/esm-form-entry-app/angular.json:42 (`main: src/index.ts`); packages/esm-form-entry-app/webpack.config.js:48 (`entry`) e :75 (`exposes ./start`). Build: packages/esm-form-entry-app/angular.json:26-27 (target `build`, `ngx-build-plus:browser`) e :52 (`extraWebpackConfig: webpack.config.js`); packages/esm-form-entry-app/package.json:13 (`ng build --configuration production`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** App Angular com entrada própria (lifecycles single-spa em `src/bootstrap.ts`) e build Angular CLI + webpack próprio.

### 137. packages/esm-generic-patient-widgets-app; packages/esm-generic-patient-widgets-app/package.json:7; packages/esm-generic-patient-widgets-app/webpack.config.js:1; packages/esm-generic-patient-widgets-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-generic-patient-widgets-app` tem manifesto `packages/esm-generic-patient-widgets-app/package.json`. Entrada: packages/esm-generic-patient-widgets-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-generic-patient-widgets-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-generic-patient-widgets-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 138. packages/esm-patient-allergies-app; packages/esm-patient-allergies-app/package.json:7; packages/esm-patient-allergies-app/webpack.config.js:1; packages/esm-patient-allergies-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-allergies-app` tem manifesto `packages/esm-patient-allergies-app/package.json`. Entrada: packages/esm-patient-allergies-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-allergies-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-allergies-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 139. packages/esm-patient-attachments-app; packages/esm-patient-attachments-app/package.json:7; packages/esm-patient-attachments-app/webpack.config.js:1-3; packages/esm-patient-attachments-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-attachments-app` tem manifesto `packages/esm-patient-attachments-app/package.json`. Entrada: packages/esm-patient-attachments-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-attachments-app/webpack.config.js:1-3 (`openmrs/default-webpack-config`) + packages/esm-patient-attachments-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 140. packages/esm-patient-banner-app; packages/esm-patient-banner-app/package.json:7; packages/esm-patient-banner-app/webpack.config.js:1; packages/esm-patient-banner-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-banner-app` tem manifesto `packages/esm-patient-banner-app/package.json`. Entrada: packages/esm-patient-banner-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-banner-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-banner-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 141. packages/esm-patient-chart-app; packages/esm-patient-chart-app/package.json:7; packages/esm-patient-chart-app/webpack.config.js:1; packages/esm-patient-chart-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-chart-app` tem manifesto `packages/esm-patient-chart-app/package.json`. Entrada: packages/esm-patient-chart-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-chart-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-chart-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 142. packages/esm-patient-common-lib; packages/esm-patient-common-lib/package.json:7; packages/esm-patient-common-lib/webpack.config.js:1; packages/esm-patient-common-lib/package.json:9-13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-common-lib` tem manifesto `packages/esm-patient-common-lib/package.json`. Entrada: packages/esm-patient-common-lib/package.json:7 (`main: src/index.ts`, só reexportações de componentes). Build: packages/esm-patient-common-lib/webpack.config.js:1 (`openmrs/default-webpack-config`), sem script `build` em packages/esm-patient-common-lib/package.json:9-13. Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Biblioteca compartilhada consumida pelos apps (`workspace:*`), sem `routes.json` nem script de build.

### 143. packages/esm-patient-conditions-app; packages/esm-patient-conditions-app/package.json:7; packages/esm-patient-conditions-app/webpack.config.js:1; packages/esm-patient-conditions-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-conditions-app` tem manifesto `packages/esm-patient-conditions-app/package.json`. Entrada: packages/esm-patient-conditions-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-conditions-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-conditions-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 144. packages/esm-patient-flags-app; packages/esm-patient-flags-app/package.json:7; packages/esm-patient-flags-app/webpack.config.js:1; packages/esm-patient-flags-app/package.json:12; package.json:5-7

**Observação:** O diretório `packages/esm-patient-flags-app` tem manifesto `packages/esm-patient-flags-app/package.json`. Entrada: packages/esm-patient-flags-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-flags-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-flags-app/package.json:12 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 145. packages/esm-patient-forms-app; packages/esm-patient-forms-app/package.json:7; packages/esm-patient-forms-app/webpack.config.js:1; packages/esm-patient-forms-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-forms-app` tem manifesto `packages/esm-patient-forms-app/package.json`. Entrada: packages/esm-patient-forms-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-forms-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-forms-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 146. packages/esm-patient-immunizations-app; packages/esm-patient-immunizations-app/package.json:7; packages/esm-patient-immunizations-app/webpack.config.js:1; packages/esm-patient-immunizations-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-immunizations-app` tem manifesto `packages/esm-patient-immunizations-app/package.json`. Entrada: packages/esm-patient-immunizations-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-immunizations-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-immunizations-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 147. packages/esm-patient-lists-app; packages/esm-patient-lists-app/package.json:7; packages/esm-patient-lists-app/webpack.config.js:1; packages/esm-patient-lists-app/package.json:12; package.json:5-7

**Observação:** O diretório `packages/esm-patient-lists-app` tem manifesto `packages/esm-patient-lists-app/package.json`. Entrada: packages/esm-patient-lists-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-lists-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-lists-app/package.json:12 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 148. packages/esm-patient-medications-app; packages/esm-patient-medications-app/package.json:7; packages/esm-patient-medications-app/webpack.config.js:1; packages/esm-patient-medications-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-medications-app` tem manifesto `packages/esm-patient-medications-app/package.json`. Entrada: packages/esm-patient-medications-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-medications-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-medications-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 149. packages/esm-patient-notes-app; packages/esm-patient-notes-app/package.json:7; packages/esm-patient-notes-app/webpack.config.js:1; packages/esm-patient-notes-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-notes-app` tem manifesto `packages/esm-patient-notes-app/package.json`. Entrada: packages/esm-patient-notes-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-notes-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-notes-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 150. packages/esm-patient-orders-app; packages/esm-patient-orders-app/package.json:7; packages/esm-patient-orders-app/webpack.config.js:1; packages/esm-patient-orders-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-orders-app` tem manifesto `packages/esm-patient-orders-app/package.json`. Entrada: packages/esm-patient-orders-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-orders-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-orders-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 151. packages/esm-patient-programs-app; packages/esm-patient-programs-app/package.json:7; packages/esm-patient-programs-app/webpack.config.js:1; packages/esm-patient-programs-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-programs-app` tem manifesto `packages/esm-patient-programs-app/package.json`. Entrada: packages/esm-patient-programs-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-programs-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-programs-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 152. packages/esm-patient-tests-app; packages/esm-patient-tests-app/package.json:7; packages/esm-patient-tests-app/webpack.config.js:1; packages/esm-patient-tests-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-tests-app` tem manifesto `packages/esm-patient-tests-app/package.json`. Entrada: packages/esm-patient-tests-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-tests-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-tests-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 153. packages/esm-patient-vitals-app; packages/esm-patient-vitals-app/package.json:7; packages/esm-patient-vitals-app/webpack.config.js:1; packages/esm-patient-vitals-app/package.json:13; package.json:5-7

**Observação:** O diretório `packages/esm-patient-vitals-app` tem manifesto `packages/esm-patient-vitals-app/package.json`. Entrada: packages/esm-patient-vitals-app/package.json:7 (`main: src/index.ts`, lifecycles de componentes React; `src/routes.json`). Build: packages/esm-patient-vitals-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-vitals-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretação:** Módulo ESM com entrada própria que expõe componentes de UI e build webpack próprio.

### 154. packages/esm-form-entry-app/src/bootstrap.ts:21; packages/esm-form-entry-app/src/bootstrap.ts:22; packages/esm-form-entry-app/src/bootstrap.ts:23; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-entry-app/src/routes.json:9-11; packages/esm-form-entry-app/webpack.config.js:70-76; packages/esm-form-entry-app/src/index.ts:66; packages/esm-form-entry-app/src/bootstrap.ts:12-19; packages/esm-form-entry-app/src/bootstrap.ts:21-23; packages/esm-form-entry-app/webpack.config.js:74-76

**Observação:** Os trechos citados contêm ` export const bootstrap = lifecycles.bootstrap; ` (packages/esm-form-entry-app/src/bootstrap.ts:21); ` export const mount = lifecycles.mount; ` (packages/esm-form-entry-app/src/bootstrap.ts:22); ` export const unmount = lifecycles.unmount; ` (packages/esm-form-entry-app/src/bootstrap.ts:23); ` import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular'; ` (packages/esm-form-entry-app/src/bootstrap.ts:3); ` const lifecycles = singleSpaAngular({ ` (packages/esm-form-entry-app/src/bootstrap.ts:12); ` {showForm && formInfo && patientUuid && patient && <ExtensionSlot name="form-widget-slot" state={state} />} ` (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95). Os registros associados são packages/esm-form-entry-app/src/routes.json:9-11 (extensão `form-widget`, componente `formWidget`, em `form-widget-slot`); packages/esm-form-entry-app/webpack.config.js:70-76 (`ModuleFederationPlugin` com `name` do package.json e `exposes` `./start`).

**Interpretação:** A relação 3.4.5 #1 é `host → remote`, de `packages/esm-patient-forms-app` para `packages/esm-form-entry-app`, mecanismo `single-spa`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 155. packages/esm-form-entry-app/src/bootstrap.ts:21; packages/esm-form-entry-app/src/bootstrap.ts:22; packages/esm-form-entry-app/src/bootstrap.ts:23; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249; packages/esm-form-entry-app/src/routes.json:9-11; packages/esm-form-entry-app/webpack.config.js:70-76; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-250

**Observação:** Os trechos citados contêm ` export const bootstrap = lifecycles.bootstrap; ` (packages/esm-form-entry-app/src/bootstrap.ts:21); ` export const mount = lifecycles.mount; ` (packages/esm-form-entry-app/src/bootstrap.ts:22); ` export const unmount = lifecycles.unmount; ` (packages/esm-form-entry-app/src/bootstrap.ts:23); ` import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular'; ` (packages/esm-form-entry-app/src/bootstrap.ts:3); ` const lifecycles = singleSpaAngular({ ` (packages/esm-form-entry-app/src/bootstrap.ts:12); ` <ExtensionSlot name="form-widget-slot" state={{ view: 'form', ` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249). Os registros associados são packages/esm-form-entry-app/src/routes.json:9-11 (extensão `form-widget`, componente `formWidget`, em `form-widget-slot`); packages/esm-form-entry-app/webpack.config.js:70-76 (`ModuleFederationPlugin` com `name` do package.json e `exposes` `./start`).

**Interpretação:** A relação 3.4.5 #2 é `host → remote`, de `packages/esm-patient-vitals-app` para `packages/esm-form-entry-app`, mecanismo `single-spa`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado. O ramo depende de `config.vitals.useFormEngine`; a atividade Yes preserva a decisão da 3.4.

### 156. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-30

**Observação:** Os trechos citados contêm ` <iframe ref={iframeRef} src={src} className={styles.wrapper} onLoad={onLoad}></iframe> ` (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43). O `src` recebe a URL `${window.openmrsBase}/htmlformentryui/htmlform/${uiPage}.page?`, montada no workspace citado.

**Interpretação:** A relação 3.4.5 #3 é `page → embedded-frontend`, de `packages/esm-patient-forms-app` para `htmlformentryui`, mecanismo `iframe`, direção `origem → destino`, No snapshot `No` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 157. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15; packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:14-20

**Observação:** Os trechos citados contêm ` window.addEventListener('openmrs:form-view-embedded', handleFormEmbedded); ` (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15).

**Interpretação:** A relação 3.4.5 #4 é `communication`, de `packages/esm-form-engine-app` para `openmrs:form-view-embedded`, mecanismo `events`, direção `Undetermined`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 158. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23; packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24; packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:22-25

**Observação:** Os trechos citados contêm ` const FormCollapseToggleEvent = new CustomEvent('openmrs:form-collapse-toggle', { detail: { value } }); ` (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23); ` window.dispatchEvent(FormCollapseToggleEvent); ` (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24).

**Interpretação:** A relação 3.4.5 #5 é `communication`, de `packages/esm-form-engine-app` para `openmrs:form-collapse-toggle`, mecanismo `events`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 159. packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56; packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:47-60

**Observação:** Os trechos citados contêm ` window.addEventListener('single-spa:routing-event', listenToRoutingEvent); ` (packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56).

**Interpretação:** A relação 3.4.5 #6 é `communication`, de `packages/esm-patient-flags-app` para `single-spa`, mecanismo `events`, direção `origem → destino`, No snapshot `No` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha. A direção registrada preserva a convenção decidida pelo pesquisador na 3.4.5: a mensagem chega do destino externo à origem local.

### 160. packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20; packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42; packages/esm-patient-forms-app/src/routes.json:85; packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:14; packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:33; packages/esm-patient-common-lib/src/form-entry-interop.ts:5

**Observação:** Os trechos citados contêm ` launchPatientWorkspace(clinicalFormsWorkspaceName); ` (packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20); ` !encounterUuid && openClinicalFormsWorkspaceOnFormClose && launchPatientWorkspace(clinicalFormsWorkspaceName); ` (packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42). O parâmetro `clinicalFormsWorkspaceName` tem valor padrão `clinicalFormsWorkspace` em packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:14 e packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:33; packages/esm-patient-common-lib/src/form-entry-interop.ts:5 declara `export const clinicalFormsWorkspace = 'clinical-forms-workspace';`. Os registros associados são packages/esm-patient-forms-app/src/routes.json:85 (workspace `clinical-forms-workspace`).

**Interpretação:** A relação 3.4.5 #7 é `host → remote`, de `packages/esm-form-engine-app` para `packages/esm-patient-forms-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 161. packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259; packages/esm-patient-chart-app/src/routes.json:210

**Observação:** Os trechos citados contêm ` const dispose = showModal('modify-visit-date-dialog', { ` (packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259). Os registros associados são packages/esm-patient-chart-app/src/routes.json:210 (modal `modify-visit-date-dialog`).

**Interpretação:** A relação 3.4.5 #8 é `host → remote`, de `packages/esm-form-entry-app` para `packages/esm-patient-chart-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 162. packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113; packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:111-113; packages/esm-generic-patient-widgets-app/src/config-schema.ts:19-23

**Observação:** Os trechos citados contêm ` <ExtensionSlot name={config.interpretationSlot} style={{ gridTemplateColumns: '1fr' }} /> ` (packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113).

**Interpretação:** A relação 3.4.5 #9 é `host → remote`, de `packages/esm-generic-patient-widgets-app` para `config.interpretationSlot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 163. packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25; packages/esm-patient-common-lib/src/form-entry-interop.ts:70; packages/esm-patient-common-lib/src/form-entry-interop.ts:97; packages/esm-patient-forms-app/src/routes.json:49; packages/esm-patient-forms-app/src/routes.json:67; packages/esm-patient-forms-app/src/routes.json:85; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:242; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:287; packages/esm-patient-forms-app/src/forms/forms-dashboard.component.tsx:47

**Observação:** Os trechos citados contêm ` launchPatientWorkspace('patient-form-entry-workspace', { ` (packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24); ` const launchClinicalFormsWorkspace = useLaunchWorkspaceRequiringVisit('clinical-forms-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25); ` launchWorkspace(formEntryWorkspaceName, { ` (packages/esm-patient-common-lib/src/form-entry-interop.ts:70); ` launchWorkspace(workspaceName, { ` (packages/esm-patient-common-lib/src/form-entry-interop.ts:97). Os registros associados são packages/esm-patient-forms-app/src/routes.json:49 (workspace `patient-form-entry-workspace`); packages/esm-patient-forms-app/src/routes.json:67 (workspace `patient-html-form-entry-workspace`); packages/esm-patient-forms-app/src/routes.json:85 (workspace `clinical-forms-workspace`).

**Interpretação:** A relação 3.4.5 #10 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-forms-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 164. packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124; packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29; packages/esm-patient-vitals-app/src/routes.json:53-58; packages/esm-patient-vitals-app/src/routes.json:9-11; packages/esm-patient-vitals-app/src/routes.json:34-36; packages/esm-patient-vitals-app/src/routes.json:18-20; packages/esm-patient-vitals-app/src/routes.json:43-45; packages/esm-patient-vitals-app/src/routes.json:29-31; packages/esm-patient-vitals-app/src/routes.json:63-65; packages/esm-patient-vitals-app/src/routes.json:72

**Observação:** Os trechos citados contêm ` <ExtensionSlot className={styles.dataGridRow} name="visit-form-header-slot" state={memoizedPatientUuid} /> ` (packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124); ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` <ExtensionSlot name="patient-info-slot" state={state} /> ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69); ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={visitHeaderSlotState} ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410); ` const launchVitalsAndBiometricsFormWorkspace = useLaunchWorkspaceRequiringVisit( ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29). Os registros associados são packages/esm-patient-vitals-app/src/routes.json:53-58 (`results-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-vitals-biometrics-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:9-11, :34-36 (widgets em `patient-chart-summary-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:18-20, :43-45 (widgets em `patient-chart-vitals-biometrics-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:29-31 (`patient-vitals-info` em `patient-info-slot`); packages/esm-patient-vitals-app/src/routes.json:63-65 (`weight-tile` em `visit-form-header-slot`); packages/esm-patient-vitals-app/src/routes.json:72 (workspace `patient-vitals-biometrics-form-workspace`).

**Interpretação:** A relação 3.4.5 #11 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-vitals-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 165. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23; packages/esm-patient-allergies-app/src/routes.json:24-31; packages/esm-patient-allergies-app/src/routes.json:17-19; packages/esm-patient-allergies-app/src/routes.json:42

**Observação:** Os trechos citados contêm ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` const launchAllergiesFormWorkspace = useLaunchWorkspaceRequiringVisit('patient-allergy-form-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23). Os registros associados são packages/esm-patient-allergies-app/src/routes.json:24-31 (`allergies-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-allergies-dashboard-slot`); packages/esm-patient-allergies-app/src/routes.json:17-19 (`allergies-details-widget` no slot do dashboard); packages/esm-patient-allergies-app/src/routes.json:42 (workspace `patient-allergy-form-workspace`).

**Interpretação:** A relação 3.4.5 #12 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-allergies-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 166. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-attachments-app/src/routes.json:13-17; packages/esm-patient-attachments-app/src/routes.json:8-10

**Observação:** Os trechos citados contêm ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47). Os registros associados são packages/esm-patient-attachments-app/src/routes.json:13-17 (`attachments-results-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-attachments-dashboard-slot`); packages/esm-patient-attachments-app/src/routes.json:8-10 (`attachments-overview-widget` no slot do dashboard).

**Interpretação:** A relação 3.4.5 #13 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-attachments-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 167. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26; packages/esm-patient-conditions-app/src/routes.json:26-31; packages/esm-patient-conditions-app/src/routes.json:9-10; packages/esm-patient-conditions-app/src/routes.json:18-19; packages/esm-patient-conditions-app/src/routes.json:46

**Observação:** Os trechos citados contêm ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` const launchConditionsFormWorkspace = useLaunchWorkspaceRequiringVisit('conditions-form-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26). Os registros associados são packages/esm-patient-conditions-app/src/routes.json:26-31 (`conditions-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-conditions-dashboard-slot`); packages/esm-patient-conditions-app/src/routes.json:9-10 (`conditions-overview-widget` em `patient-chart-summary-dashboard-slot`); packages/esm-patient-conditions-app/src/routes.json:18-19 (`conditions-details-widget` no slot do dashboard); packages/esm-patient-conditions-app/src/routes.json:46 (workspace `conditions-form-workspace`).

**Interpretação:** A relação 3.4.5 #14 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-conditions-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 168. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-immunizations-app/src/routes.json:18-22; packages/esm-patient-immunizations-app/src/routes.json:13-15; packages/esm-patient-immunizations-app/src/routes.json:13-22

**Observação:** Os trechos citados contêm ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47). Os registros associados são packages/esm-patient-immunizations-app/src/routes.json:18-22 (`immunization-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-immunizations-dashboard-slot`); packages/esm-patient-immunizations-app/src/routes.json:13-15 (`immunization-details-widget` no slot do dashboard).

**Interpretação:** A relação 3.4.5 #15 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-immunizations-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 169. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-medications-app/src/routes.json:25-30; packages/esm-patient-medications-app/src/routes.json:8-10; packages/esm-patient-medications-app/src/routes.json:16-18

**Observação:** Os trechos citados contêm ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47). Os registros associados são packages/esm-patient-medications-app/src/routes.json:25-30 (`medications-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-medications-dashboard-slot`); packages/esm-patient-medications-app/src/routes.json:8-10 (`medications-details-widget` no slot do dashboard); packages/esm-patient-medications-app/src/routes.json:16-18 (`active-medications-widget` em `patient-chart-summary-dashboard-slot`).

**Interpretação:** A relação 3.4.5 #16 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-medications-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 170. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27; packages/esm-patient-orders-app/src/routes.json:47-51; packages/esm-patient-orders-app/src/routes.json:58-60; packages/esm-patient-orders-app/src/routes.json:68

**Observação:** Os trechos citados contêm ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` const launchOrderBasketFormWorkspace = useLaunchWorkspaceRequiringVisit('order-basket'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27). Os registros associados são packages/esm-patient-orders-app/src/routes.json:47-51 (`patient-orders-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-orders-dashboard-slot`); packages/esm-patient-orders-app/src/routes.json:58-60 (`patient-orders-dashboard` no slot do dashboard); packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`).

**Interpretação:** A relação 3.4.5 #17 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-orders-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 171. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-programs-app/src/routes.json:22-26; packages/esm-patient-programs-app/src/routes.json:16-17; packages/esm-patient-programs-app/src/routes.json:16-26

**Observação:** Os trechos citados contêm ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47). Os registros associados são packages/esm-patient-programs-app/src/routes.json:22-26 (`programs-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-programs-dashboard-slot`); packages/esm-patient-programs-app/src/routes.json:16-17 (`programs-details-widget` no slot do dashboard).

**Interpretação:** A relação 3.4.5 #18 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-programs-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 172. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13; packages/esm-patient-tests-app/src/routes.json:9-13; packages/esm-patient-tests-app/src/routes.json:26-29; packages/esm-patient-tests-app/src/routes.json:21-22

**Observação:** Os trechos citados contêm ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` return <ExtensionSlot name="test-results-filtered-overview-slot" state={{ filter, patientUuid }} />; ` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13). Os registros associados são packages/esm-patient-tests-app/src/routes.json:9-13 (`test-results-summary-dashboard` em `patient-chart-dashboard-slot`, dashboard `patient-chart-test-results-dashboard-slot`); packages/esm-patient-tests-app/src/routes.json:26-29 (`results-viewer` no slot do dashboard); packages/esm-patient-tests-app/src/routes.json:21-22 (`test-results-filtered-overview` em `test-results-filtered-overview-slot`).

**Interpretação:** A relação 3.4.5 #19 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-tests-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 173. packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66

**Observação:** Os trechos citados contêm ` <ExtensionSlot state={state} name="top-of-all-patient-dashboards-slot" /> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66).

**Interpretação:** A relação 3.4.5 #20 é `host → remote`, de `packages/esm-patient-chart-app` para `top-of-all-patient-dashboards-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 174. packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68; packages/esm-patient-flags-app/src/routes.json:26-27; packages/esm-patient-flags-app/src/routes.json:19-20

**Observação:** Os trechos citados contêm ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` <ExtensionSlot name="patient-highlights-bar-slot" state={state} /> ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68). Os registros associados são packages/esm-patient-flags-app/src/routes.json:26-27 (`patient-flags-overview` em `patient-chart-summary-dashboard-slot`); packages/esm-patient-flags-app/src/routes.json:19-20 (`patient-flag-tags` em `patient-highlights-bar-slot`).

**Interpretação:** A relação 3.4.5 #21 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-flags-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 175. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389; packages/esm-patient-banner-app/src/routes.json:22-23

**Observação:** Os trechos citados contêm ` <ExtensionSlot name="patient-header-slot" state={state} /> ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67); ` <ExtensionSlot name="patient-header-slot" state={{ patient, ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389). Os registros associados são packages/esm-patient-banner-app/src/routes.json:22-23 (`patient-banner` em `patient-header-slot`).

**Interpretação:** A relação 3.4.5 #22 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-banner-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 176. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:451-456

**Observação:** Os trechos citados contêm ` name="visit-form-top-slot" ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452).

**Interpretação:** A relação 3.4.5 #23 é `host → remote`, de `packages/esm-patient-chart-app` para `visit-form-top-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 177. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547

**Observação:** Os trechos citados contêm ` <ExtensionSlot state={{ patientUuid, setExtraVisitInfo }} name="extra-visit-attribute-slot" /> ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547).

**Interpretação:** A relação 3.4.5 #24 é `host → remote`, de `packages/esm-patient-chart-app` para `extra-visit-attribute-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 178. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:561-566

**Observação:** Os trechos citados contêm ` name="visit-form-bottom-slot" ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562).

**Interpretação:** A relação 3.4.5 #25 é `host → remote`, de `packages/esm-patient-chart-app` para `visit-form-bottom-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 179. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24

**Observação:** Os trechos citados contêm ` const launchAppointmentsFormWorkspace = useLaunchWorkspaceRequiringVisit('appointments-form-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24).

**Interpretação:** A relação 3.4.5 #26 é `host → remote`, de `packages/esm-patient-chart-app` para `appointments-form-workspace`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 180. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281; packages/esm-patient-notes-app/src/routes.json:25

**Observação:** Os trechos citados contêm ` const launchVisitNotesFormWorkspace = useLaunchWorkspaceRequiringVisit('visit-notes-form-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28); ` launchWorkspace('visit-notes-form-workspace', { ` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236); ` launchWorkspace('visit-notes-form-workspace', { ` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281). Os registros associados são packages/esm-patient-notes-app/src/routes.json:25 (workspace `visit-notes-form-workspace`).

**Interpretação:** A relação 3.4.5 #27 é `host → remote`, de `packages/esm-patient-chart-app` para `packages/esm-patient-notes-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 181. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:30

**Observação:** Os trechos citados contêm ` <ExtensionSlot name={visitSummaryPanelSlot}> ` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159).

**Interpretação:** A relação 3.4.5 #28 é `host → remote`, de `packages/esm-patient-chart-app` para `visit-summary-panels`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 182. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94; packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12; packages/esm-patient-chart-app/src/routes.json:180-181; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-forms-app/src/forms/forms-dashboard.component.tsx:47; packages/esm-patient-common-lib/src/form-entry-interop.ts:52; packages/esm-patient-forms-app/src/clinical-form-action-button.component.tsx:15; packages/esm-patient-common-lib/src/workspaces.ts:62

**Observação:** Os trechos citados contêm ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12). Os registros associados são packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` em `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretação:** A relação 3.4.5 #29 é `host → remote`, de `packages/esm-patient-forms-app` para `packages/esm-patient-chart-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 183. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-immunizations-app/src/immunizations/immunizations-detailed-summary.component.tsx:67

**Observação:** Os trechos citados contêm ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4). Os registros associados são packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`).

**Interpretação:** A relação 3.4.5 #30 é `host → remote`, de `packages/esm-patient-immunizations-app` para `packages/esm-patient-chart-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 184. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-medications-app/src/active-medications/active-medications.component.tsx:19; packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71; packages/esm-patient-common-lib/src/workspaces.ts:62

**Observação:** Os trechos citados contêm ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55). Os registros associados são packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretação:** A relação 3.4.5 #31 é `host → remote`, de `packages/esm-patient-medications-app` para `packages/esm-patient-chart-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 185. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497; packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501; packages/esm-patient-chart-app/src/routes.json:180-181; packages/esm-patient-chart-app/src/routes.json:113-114; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-notes-app/src/notes/notes-main.component.tsx:36; packages/esm-patient-notes-app/src/visit-note-action-button.extension.tsx:9

**Observação:** Os trechos citados contêm ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497); ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={memoizedState} /> ` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501). Os registros associados são packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` em `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:113-114 (`patient-details-tile` em `visit-form-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretação:** A relação 3.4.5 #32 é `host → remote`, de `packages/esm-patient-notes-app` para `packages/esm-patient-chart-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 186. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154; packages/esm-patient-chart-app/src/routes.json:180-181; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-orders-app/src/order-basket-action-button/order-basket-action-button.extension.tsx:9

**Observação:** Os trechos citados contêm ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55); ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154). Os registros associados são packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` em `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretação:** A relação 3.4.5 #33 é `host → remote`, de `packages/esm-patient-orders-app` para `packages/esm-patient-chart-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 187. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300; packages/esm-patient-chart-app/src/routes.json:180-181; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-vitals-app/src/utils.ts:16

**Observação:** Os trechos citados contêm ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300). Os registros associados são packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` em `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretação:** A relação 3.4.5 #34 é `host → remote`, de `packages/esm-patient-vitals-app` para `packages/esm-patient-chart-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 188. packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24; packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:36-38; packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:11-14

**Observação:** Os trechos citados contêm ` <ExtensionSlot name={slotName ?? title} state={{ basePath }} /> ` (packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24).

**Interpretação:** A relação 3.4.5 #35 é `host → remote`, de `packages/esm-patient-chart-app` para `slotName ?? title`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 189. packages/esm-patient-common-lib/src/orders/store.ts:24; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:86-94; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19; packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:31; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:106; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-60

**Observação:** Os trechos citados contêm ` export const orderBasketStore = createGlobalStore<OrderBasketStore>('order-basket', initialState); ` (packages/esm-patient-common-lib/src/orders/store.ts:24). `packages/esm-patient-medications-app` e `packages/esm-patient-orders-app` leem e alteram o `order-basket` por `useOrderBasket`; o carrinho lê e limpa os pedidos, enquanto a outra unidade mantém sua chave de grupo.

**Interpretação:** A relação 3.4.5 #36 é `communication`, de `packages/esm-patient-medications-app` para `packages/esm-patient-orders-app`, mecanismo `events`, direção `bidirecional`, No snapshot `Yes` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha.

### 190. packages/esm-patient-common-lib/src/orders/store.ts:24; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:60; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:188

**Observação:** Os trechos citados contêm ` export const orderBasketStore = createGlobalStore<OrderBasketStore>('order-basket', initialState); ` (packages/esm-patient-common-lib/src/orders/store.ts:24). `packages/esm-patient-orders-app` e `packages/esm-patient-tests-app` leem e alteram o `order-basket` por `useOrderBasket`; o carrinho lê e limpa os pedidos, enquanto a outra unidade mantém sua chave de grupo.

**Interpretação:** A relação 3.4.5 #37 é `communication`, de `packages/esm-patient-orders-app` para `packages/esm-patient-tests-app`, mecanismo `events`, direção `bidirecional`, No snapshot `Yes` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha.

### 191. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-common-lib/src/store/patient-chart-store.ts:8-10; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:38-41; packages/esm-patient-common-lib/src/workspaces.ts:44

**Observação:** Os trechos citados contêm ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). O chart grava o paciente corrente; `packages/esm-patient-forms-app` lê o estado por meio dos consumidores indicados na revisão 3.4.5 #38.

**Interpretação:** A relação 3.4.5 #38 é `communication`, de `packages/esm-patient-chart-app` para `packages/esm-patient-forms-app`, mecanismo `events`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha.

### 192. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:362; packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:116; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:38

**Observação:** Os trechos citados contêm ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). O chart grava o paciente corrente; `packages/esm-patient-medications-app` lê o estado por meio dos consumidores indicados na revisão 3.4.5 #39.

**Interpretação:** A relação 3.4.5 #39 é `communication`, de `packages/esm-patient-chart-app` para `packages/esm-patient-medications-app`, mecanismo `events`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha.

### 193. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-notes-app/src/visit-note-action-button.extension.tsx:9; packages/esm-patient-common-lib/src/workspaces.ts:44

**Observação:** Os trechos citados contêm ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). O chart grava o paciente corrente; `packages/esm-patient-notes-app` lê o estado por meio dos consumidores indicados na revisão 3.4.5 #40.

**Interpretação:** A relação 3.4.5 #40 é `communication`, de `packages/esm-patient-chart-app` para `packages/esm-patient-notes-app`, mecanismo `events`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha.

### 194. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-orders-app/src/order-basket/general-order-type/orderable-concept-search/orderable-concept-search.workspace.tsx:51

**Observação:** Os trechos citados contêm ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). O chart grava o paciente corrente; `packages/esm-patient-orders-app` lê o estado por meio dos consumidores indicados na revisão 3.4.5 #41.

**Interpretação:** A relação 3.4.5 #41 é `communication`, de `packages/esm-patient-chart-app` para `packages/esm-patient-orders-app`, mecanismo `events`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha.

### 195. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:46; packages/esm-patient-tests-app/src/test-results/individual-results-table/individual-results-table.component.tsx:56

**Observação:** Os trechos citados contêm ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). O chart grava o paciente corrente; `packages/esm-patient-tests-app` lê o estado por meio dos consumidores indicados na revisão 3.4.5 #42.

**Interpretação:** A relação 3.4.5 #42 é `communication`, de `packages/esm-patient-chart-app` para `packages/esm-patient-tests-app`, mecanismo `events`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha.

### 196. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-vitals-app/src/components/action-menu/vitals-biometrics-action-menu.component.tsx:15; packages/esm-patient-vitals-app/src/utils.ts:16

**Observação:** Os trechos citados contêm ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). O chart grava o paciente corrente; `packages/esm-patient-vitals-app` lê o estado por meio dos consumidores indicados na revisão 3.4.5 #43.

**Interpretação:** A relação 3.4.5 #43 é `communication`, de `packages/esm-patient-chart-app` para `packages/esm-patient-vitals-app`, mecanismo `events`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha.

### 197. packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-engine-app/src/routes.json:8-10

**Observação:** Os trechos citados contêm ` {showForm && formInfo && patientUuid && patient && <ExtensionSlot name="form-widget-slot" state={state} />} ` (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95). Os registros associados são packages/esm-form-engine-app/src/routes.json:8-10 (extensão `react-form-engine-widget`, componente `formRenderer`, em `form-widget-slot`).

**Interpretação:** A relação 3.4.5 #44 é `host → remote`, de `packages/esm-patient-forms-app` para `packages/esm-form-engine-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 198. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:44

**Observação:** Os trechos citados contêm ` window.addEventListener('message', callback); ` (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17). O callback verifica `event.data` igual a `close-workspace` e fecha o workspace; a URL do iframe inclui `returnUrl=post-message:close-workspace`.

**Interpretação:** A relação 3.4.5 #45 é `communication`, de `packages/esm-patient-forms-app` para `htmlformentryui`, mecanismo `events`, direção `origem → destino`, No snapshot `No` e Ativa `Yes`. Os trechos ligam as unidades por estado reativo ou mensagens, conforme a relação final; a organização de montagem não é estabelecida por essa troca sozinha. A direção registrada preserva a convenção decidida pelo pesquisador na 3.4.5: a mensagem chega do destino externo à origem local.

### 199. packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37; packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71; packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25; packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149; packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66; packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103; packages/esm-patient-orders-app/src/routes.json:68; packages/esm-patient-orders-app/src/routes.json:12-21

**Observação:** Os trechos citados contêm ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149); ` const launchOrderBasket = useLaunchWorkspaceRequiringVisit('order-basket'); ` (packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71); ` closeWorkspace('order-basket', { ` (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58); ` closeWorkspace('order-basket', { ` (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66); ` <ExtensionSlot name="order-item-additional-info-slot" state={additionalInfoSlotState} className={styles.additionalInfoContainer} ` (packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103). Os registros associados são packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`); packages/esm-patient-orders-app/src/routes.json:12-21 (`order-price-details` e `order-stock-details` em `order-item-additional-info-slot`).

**Interpretação:** A relação 3.4.5 #46 é `host → remote`, de `packages/esm-patient-medications-app` para `packages/esm-patient-orders-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 200. packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213

**Observação:** Os trechos citados contêm ` <ExtensionSlot name="medication-info-slot" state={{ order: orderBasketItem }} /> ` (packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213).

**Interpretação:** A relação 3.4.5 #47 é `host → remote`, de `packages/esm-patient-medications-app` para `medication-info-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 201. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315; packages/esm-patient-attachments-app/src/routes.json:30

**Observação:** Os trechos citados contêm ` const close = showModal('capture-photo-modal', { ` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315). Os registros associados são packages/esm-patient-attachments-app/src/routes.json:30 (modal `capture-photo-modal`).

**Interpretação:** A relação 3.4.5 #48 é `host → remote`, de `packages/esm-patient-notes-app` para `packages/esm-patient-attachments-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 202. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501; packages/esm-patient-vitals-app/src/routes.json:63-65

**Observação:** Os trechos citados contêm ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={memoizedState} /> ` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501). Os registros associados são packages/esm-patient-vitals-app/src/routes.json:63-65 (`weight-tile` em `visit-form-header-slot`).

**Interpretação:** A relação 3.4.5 #49 é `host → remote`, de `packages/esm-patient-notes-app` para `packages/esm-patient-vitals-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 203. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156; packages/esm-patient-medications-app/src/routes.json:43; packages/esm-patient-medications-app/src/routes.json:35-37

**Observação:** Os trechos citados contêm ` const launchAddDrugOrder = useLaunchWorkspaceRequiringVisit('add-drug-order'); ` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120); ` <ExtensionSlot className={classNames(styles.orderBasketSlot, { [styles.orderBasketSlotTablet]: isTablet, })} ` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156). Os registros associados são packages/esm-patient-medications-app/src/routes.json:43 (workspace `add-drug-order`); packages/esm-patient-medications-app/src/routes.json:35-37 (`drug-order-panel` em `order-basket-slot`).

**Interpretação:** A relação 3.4.5 #50 é `host → remote`, de `packages/esm-patient-orders-app` para `packages/esm-patient-medications-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 204. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156; packages/esm-patient-tests-app/src/routes.json:52; packages/esm-patient-tests-app/src/routes.json:34-36

**Observação:** Os trechos citados contêm ` const launchModifyLabOrder = useLaunchWorkspaceRequiringVisit('add-lab-order'); ` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121); ` <ExtensionSlot className={classNames(styles.orderBasketSlot, { [styles.orderBasketSlotTablet]: isTablet, })} ` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156). Os registros associados são packages/esm-patient-tests-app/src/routes.json:52 (workspace `add-lab-order`); packages/esm-patient-tests-app/src/routes.json:34-36 (`lab-order-panel` em `order-basket-slot`).

**Interpretação:** A relação 3.4.5 #51 é `host → remote`, de `packages/esm-patient-orders-app` para `packages/esm-patient-tests-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 205. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534; packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534-535

**Observação:** Os trechos citados contêm `` <ExtensionSlot name={`${matchingOrder.type}-action-menu-items-slot`} state={{ className: styles.menuItem, `` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534).

**Interpretação:** A relação 3.4.5 #52 é `host → remote`, de `packages/esm-patient-orders-app` para `${matchingOrder.type}-action-menu-items-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 206. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561; packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561-562

**Observação:** Os trechos citados contêm `` <ExtensionSlot name={`${matchingOrder.type}-detail-slot`} state={{ orderItem: matchingOrder, `` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561).

**Interpretação:** A relação 3.4.5 #53 é `host → remote`, de `packages/esm-patient-orders-app` para `${matchingOrder.type}-detail-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 207. packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169

**Observação:** Os trechos citados contêm ` <ExtensionSlot name="top-of-lab-order-form-slot" state={{ order: initialOrder }} /> ` (packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169).

**Interpretação:** A relação 3.4.5 #54 é `host → remote`, de `packages/esm-patient-orders-app` para `top-of-lab-order-form-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 208. packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111; packages/esm-patient-orders-app/src/routes.json:68; packages/esm-patient-orders-app/src/routes.json:12-21

**Observação:** Os trechos citados contêm ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208); ` <ExtensionSlot name="order-item-additional-info-slot" state={additionalInfoSlotState} className={styles.additionalInfoContainer} ` (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68); ` closeWorkspace('order-basket', { ` (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99); ` closeWorkspace('order-basket', { ` (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111). Os registros associados são packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`); packages/esm-patient-orders-app/src/routes.json:12-21 (`order-price-details` e `order-stock-details` em `order-item-additional-info-slot`).

**Interpretação:** A relação 3.4.5 #55 é `host → remote`, de `packages/esm-patient-tests-app` para `packages/esm-patient-orders-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado.

### 209. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193

**Observação:** Os trechos citados contêm ` <ExtensionSlot name="top-of-lab-order-form-slot" state={{ order: initialOrder }} /> ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193).

**Interpretação:** A relação 3.4.5 #56 é `host → remote`, de `packages/esm-patient-tests-app` para `top-of-lab-order-form-slot`, mecanismo `other`, direção `origem → destino`, No snapshot `Undetermined` e Ativa `Undetermined`. O destino pode ser fornecido por outra unidade externa ou permanecer sem conexão; o snapshot não permite decidir.

### 210. packages/esm-patient-vitals-app/src/utils.ts:16; packages/esm-patient-forms-app/src/routes.json:49; packages/esm-patient-vitals-app/src/utils.ts:14-18

**Observação:** Os trechos citados contêm ` const launchVitalsAndBiometricsForm = useLaunchWorkspaceRequiringVisit( ` (packages/esm-patient-vitals-app/src/utils.ts:16). Os registros associados são packages/esm-patient-forms-app/src/routes.json:49 (workspace `patient-form-entry-workspace`).

**Interpretação:** A relação 3.4.5 #57 é `host → remote`, de `packages/esm-patient-vitals-app` para `packages/esm-patient-forms-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado. O ramo depende de `config.vitals.useFormEngine`; a atividade Yes preserva a decisão da 3.4.

### 211. packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249; packages/esm-form-engine-app/src/routes.json:8-10

**Observação:** Os trechos citados contêm ` <ExtensionSlot name="form-widget-slot" state={{ view: 'form', ` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249). Os registros associados são packages/esm-form-engine-app/src/routes.json:8-10 (extensão `react-form-engine-widget`, componente `formRenderer`, em `form-widget-slot`).

**Interpretação:** A relação 3.4.5 #58 é `host → remote`, de `packages/esm-patient-vitals-app` para `packages/esm-form-engine-app`, mecanismo `other`, direção `origem → destino`, No snapshot `Yes` e Ativa `Yes`. O consumidor nomeia ou monta a contribuição do destino mediante o mecanismo registrado. O ramo depende de `config.vitals.useFormEngine`; a atividade Yes preserva a decisão da 3.4.

### 212. packages/esm-form-engine-app/package.json:13; packages/esm-form-engine-app/webpack.config.js:2; packages/esm-form-engine-app/package.json:2-3; packages/esm-form-engine-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-form-engine-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-form-engine-app` declara os artefatos: packages/esm-form-engine-app/package.json:13 (`webpack --mode production`); packages/esm-form-engine-app/webpack.config.js:2 (`openmrs/default-webpack-config`); packages/esm-form-engine-app/package.json:2-3, :6 (nome `@openmrs/esm-form-engine-app`, versão `10.2.0`, bundle `dist/openmrs-esm-form-engine-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-form-engine-app` em `https://registry.npmjs.org` (packages/esm-form-engine-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 213. packages/esm-form-entry-app/package.json:13; packages/esm-form-entry-app/angular.json:27; packages/esm-form-entry-app/angular.json:40; packages/esm-form-entry-app/angular.json:52; packages/esm-form-entry-app/webpack.config.js:70-76; packages/esm-form-entry-app/package.json:2-3; packages/esm-form-entry-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-form-entry-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-form-entry-app` declara os artefatos: packages/esm-form-entry-app/package.json:13 (`ng build --configuration production`); packages/esm-form-entry-app/angular.json:27, :40, :52 (builder `ngx-build-plus:browser`, saída `dist`, webpack extra); packages/esm-form-entry-app/webpack.config.js:70-76 (container `ModuleFederationPlugin` com `exposes ./start`); packages/esm-form-entry-app/package.json:2-3, :6 (nome `@openmrs/esm-form-entry-app`, versão `10.2.0`, bundle `dist/openmrs-esm-form-entry-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-form-entry-app` em `https://registry.npmjs.org` (packages/esm-form-entry-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 214. packages/esm-generic-patient-widgets-app/package.json:13; packages/esm-generic-patient-widgets-app/webpack.config.js:1; packages/esm-generic-patient-widgets-app/package.json:2-3; packages/esm-generic-patient-widgets-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-generic-patient-widgets-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-generic-patient-widgets-app` declara os artefatos: packages/esm-generic-patient-widgets-app/package.json:13 (`webpack --mode production`); packages/esm-generic-patient-widgets-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-generic-patient-widgets-app/package.json:2-3, :6 (nome `@openmrs/esm-generic-patient-widgets-app`, versão `10.2.0`, bundle `dist/openmrs-esm-generic-patient-widgets-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-generic-patient-widgets-app` em `https://registry.npmjs.org` (packages/esm-generic-patient-widgets-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 215. packages/esm-patient-allergies-app/package.json:13; packages/esm-patient-allergies-app/webpack.config.js:1; packages/esm-patient-allergies-app/package.json:2-3; packages/esm-patient-allergies-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-allergies-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-allergies-app` declara os artefatos: packages/esm-patient-allergies-app/package.json:13 (`webpack --mode production`); packages/esm-patient-allergies-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-allergies-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-allergies-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-allergies-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-allergies-app` em `https://registry.npmjs.org` (packages/esm-patient-allergies-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 216. packages/esm-patient-attachments-app/package.json:13; packages/esm-patient-attachments-app/webpack.config.js:1-3; packages/esm-patient-attachments-app/package.json:2-3; packages/esm-patient-attachments-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-attachments-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-attachments-app` declara os artefatos: packages/esm-patient-attachments-app/package.json:13 (`webpack --mode production`); packages/esm-patient-attachments-app/webpack.config.js:1-3 (`openmrs/default-webpack-config`); packages/esm-patient-attachments-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-attachments-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-attachments-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-attachments-app` em `https://registry.npmjs.org` (packages/esm-patient-attachments-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 217. packages/esm-patient-banner-app/package.json:13; packages/esm-patient-banner-app/webpack.config.js:1; packages/esm-patient-banner-app/package.json:2-3; packages/esm-patient-banner-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-banner-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-banner-app` declara os artefatos: packages/esm-patient-banner-app/package.json:13 (`webpack --mode production`); packages/esm-patient-banner-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-banner-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-banner-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-banner-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-banner-app` em `https://registry.npmjs.org` (packages/esm-patient-banner-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 218. packages/esm-patient-chart-app/package.json:13; packages/esm-patient-chart-app/webpack.config.js:1; packages/esm-patient-chart-app/package.json:2-3; packages/esm-patient-chart-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-chart-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-chart-app` declara os artefatos: packages/esm-patient-chart-app/package.json:13 (`webpack --mode production`); packages/esm-patient-chart-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-chart-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-chart-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-chart-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-chart-app` em `https://registry.npmjs.org` (packages/esm-patient-chart-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 219. packages/esm-patient-conditions-app/package.json:13; packages/esm-patient-conditions-app/webpack.config.js:1; packages/esm-patient-conditions-app/package.json:2-3; packages/esm-patient-conditions-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-conditions-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-conditions-app` declara os artefatos: packages/esm-patient-conditions-app/package.json:13 (`webpack --mode production`); packages/esm-patient-conditions-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-conditions-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-conditions-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-conditions-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-conditions-app` em `https://registry.npmjs.org` (packages/esm-patient-conditions-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 220. packages/esm-patient-flags-app/package.json:12; packages/esm-patient-flags-app/webpack.config.js:1; packages/esm-patient-flags-app/package.json:2-3; packages/esm-patient-flags-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-flags-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-flags-app` declara os artefatos: packages/esm-patient-flags-app/package.json:12 (`webpack --mode production`); packages/esm-patient-flags-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-flags-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-flags-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-flags-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-flags-app` em `https://registry.npmjs.org` (packages/esm-patient-flags-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 221. packages/esm-patient-forms-app/package.json:13; packages/esm-patient-forms-app/webpack.config.js:1; packages/esm-patient-forms-app/package.json:2-3; packages/esm-patient-forms-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-forms-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-forms-app` declara os artefatos: packages/esm-patient-forms-app/package.json:13 (`webpack --mode production`); packages/esm-patient-forms-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-forms-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-forms-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-forms-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-forms-app` em `https://registry.npmjs.org` (packages/esm-patient-forms-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 222. packages/esm-patient-immunizations-app/package.json:13; packages/esm-patient-immunizations-app/webpack.config.js:1; packages/esm-patient-immunizations-app/package.json:2-3; packages/esm-patient-immunizations-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-immunizations-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-immunizations-app` declara os artefatos: packages/esm-patient-immunizations-app/package.json:13 (`webpack --mode production`); packages/esm-patient-immunizations-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-immunizations-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-immunizations-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-immunizations-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-immunizations-app` em `https://registry.npmjs.org` (packages/esm-patient-immunizations-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 223. packages/esm-patient-lists-app/package.json:12; packages/esm-patient-lists-app/webpack.config.js:1; packages/esm-patient-lists-app/package.json:2-3; packages/esm-patient-lists-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-lists-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-lists-app` declara os artefatos: packages/esm-patient-lists-app/package.json:12 (`webpack --mode production`); packages/esm-patient-lists-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-lists-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-lists-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-lists-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-lists-app` em `https://registry.npmjs.org` (packages/esm-patient-lists-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 224. packages/esm-patient-medications-app/package.json:13; packages/esm-patient-medications-app/webpack.config.js:1; packages/esm-patient-medications-app/package.json:2-3; packages/esm-patient-medications-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-medications-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-medications-app` declara os artefatos: packages/esm-patient-medications-app/package.json:13 (`webpack --mode production`); packages/esm-patient-medications-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-medications-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-medications-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-medications-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-medications-app` em `https://registry.npmjs.org` (packages/esm-patient-medications-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 225. packages/esm-patient-notes-app/package.json:13; packages/esm-patient-notes-app/webpack.config.js:1; packages/esm-patient-notes-app/package.json:2-3; packages/esm-patient-notes-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-notes-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-notes-app` declara os artefatos: packages/esm-patient-notes-app/package.json:13 (`webpack --mode production`); packages/esm-patient-notes-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-notes-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-notes-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-notes-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-notes-app` em `https://registry.npmjs.org` (packages/esm-patient-notes-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 226. packages/esm-patient-orders-app/package.json:13; packages/esm-patient-orders-app/webpack.config.js:1; packages/esm-patient-orders-app/package.json:2-3; packages/esm-patient-orders-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-orders-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-orders-app` declara os artefatos: packages/esm-patient-orders-app/package.json:13 (`webpack --mode production`); packages/esm-patient-orders-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-orders-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-orders-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-orders-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-orders-app` em `https://registry.npmjs.org` (packages/esm-patient-orders-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 227. packages/esm-patient-programs-app/package.json:13; packages/esm-patient-programs-app/webpack.config.js:1; packages/esm-patient-programs-app/package.json:2-3; packages/esm-patient-programs-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-programs-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-programs-app` declara os artefatos: packages/esm-patient-programs-app/package.json:13 (`webpack --mode production`); packages/esm-patient-programs-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-programs-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-programs-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-programs-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-programs-app` em `https://registry.npmjs.org` (packages/esm-patient-programs-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 228. packages/esm-patient-tests-app/package.json:13; packages/esm-patient-tests-app/webpack.config.js:1; packages/esm-patient-tests-app/package.json:2-3; packages/esm-patient-tests-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-tests-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-tests-app` declara os artefatos: packages/esm-patient-tests-app/package.json:13 (`webpack --mode production`); packages/esm-patient-tests-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-tests-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-tests-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-tests-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-tests-app` em `https://registry.npmjs.org` (packages/esm-patient-tests-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 229. packages/esm-patient-vitals-app/package.json:13; packages/esm-patient-vitals-app/webpack.config.js:1; packages/esm-patient-vitals-app/package.json:2-3; packages/esm-patient-vitals-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-vitals-app/package.json:2; .github/workflows/ci.yml:139

**Observação:** A aplicação `packages/esm-patient-vitals-app` declara os artefatos: packages/esm-patient-vitals-app/package.json:13 (`webpack --mode production`); packages/esm-patient-vitals-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-vitals-app/package.json:2-3, :6 (nome `@openmrs/esm-patient-vitals-app`, versão `10.2.0`, bundle `dist/openmrs-esm-patient-vitals-app.js`); package.json:10 (`npm publish` de cada workspace); .github/workflows/ci.yml:161-162 (publicação na release). Publicação: pacote npm `@openmrs/esm-patient-vitals-app` em `https://registry.npmjs.org` (packages/esm-patient-vitals-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretação:** Build `separado` e deploy `separado` delimitam um bundle e pacote npm próprios da unidade. O versionamento registrado é `Yes`; a versão 10.2.0 e a publicação são coordenadas na release do monorepo. A imagem conjunta de testes e2e não define seu deploy produtivo.

### 230. README.md:7-21; packages/esm-patient-allergies-app/README.md:3; packages/esm-patient-allergies-app/package.json:5; packages/esm-patient-attachments-app/README.md:3; packages/esm-patient-attachments-app/package.json:5; packages/esm-patient-conditions-app/README.md:3; packages/esm-patient-conditions-app/package.json:5; packages/esm-patient-forms-app/README.md:3; packages/esm-patient-forms-app/package.json:5; packages/esm-patient-immunizations-app/README.md:3; packages/esm-patient-immunizations-app/package.json:5; packages/esm-patient-medications-app/README.md:3; packages/esm-patient-medications-app/package.json:5; packages/esm-patient-notes-app/README.md:3; packages/esm-patient-notes-app/package.json:5; packages/esm-patient-banner-app/README.md:3; packages/esm-patient-banner-app/package.json:5; packages/esm-patient-chart-app/README.md:3; packages/esm-patient-chart-app/package.json:5; packages/esm-patient-programs-app/README.md:3; packages/esm-patient-programs-app/package.json:5; packages/esm-patient-tests-app/README.md:3; packages/esm-patient-tests-app/package.json:5; packages/esm-patient-vitals-app/README.md:3; packages/esm-patient-vitals-app/package.json:5

**Observação:** O texto afirma: "It contains various microfrontends that constitute widgets in a patient dashboard".

**Interpretação:** A descrição do conjunto é confirmada pelas unidades e seus registros de extensões. A lista identifica allergies, attachments, conditions, forms, immunizations, medications, notes, banner, chart, programs, tests e vitals; as descrições individuais nos READMEs e manifestos dos pacotes listados no cabeçalho repetem esses papéis, sem linhas adicionais. Biometrics é separado abaixo porque recebe outra corroboração. A lista não pretende enumerar os 18 apps atuais.

### 231. README.md:11; packages/esm-patient-vitals-app/README.md:3

**Observação:** O texto afirma: "Biometrics".

**Interpretação:** O item é uma afirmação de existência de widget com pacote próprio: aponta para packages/esm-patient-biometrics-app/README.md. Esse diretório não existe no snapshot. Biometrics aparece como funcionalidade do vitals, não como aquela unidade separada (packages/esm-patient-vitals-app/README.md:3).

### 232. README.md:23-26; packages/esm-patient-common-lib/src/index.ts:1-23; packages/esm-patient-common-lib/package.json:9-13; packages/esm-patient-common-lib/README.md:3

**Observação:** O texto afirma: "two other microfrontends exist that encapsulate cross-cutting concerns".

**Interpretação:** A frase chama Common lib e Patient chart de dois microfrontends. O chart é unidade frontend, mas a common-lib é uma biblioteca de reexportações, sem routes.json nem build próprio. Seu papel transversal existe; contá-la como microfrontend contradiz os artefatos. O próprio packages/esm-patient-common-lib/README.md:3 descreve-a como biblioteca.

### 233. README.md:32; package.json:5-7; package.json:87

**Observação:** O texto afirma: "This monorepo uses yarn".

**Interpretação:** Workspaces packages/* e packageManager yarn@4.9.1 corroboram monorepo e ferramenta.

### 234. README.md:46; package.json:9; packages/esm-patient-allergies-app/package.json:10-11

**Observação:** O texto afirma: "a dev server running `esm-patient-chart` as well as the specified microfrontend".

**Interpretação:** O script raiz fixa o chart como source e permite encaminhar argumentos ao openmrs develop. O servidor e o processamento adicional de --sources pertencem ao tooling externo, ausente do snapshot; a configuração local confirma a intenção, mas não toda a execução descrita.

### 235. README.md:50; packages/esm-patient-vitals-app/package.json:10-11; README.md:53

**Observação:** O texto afirma: "run the biometrics and vitals microfrontends simultaneously".

**Interpretação:** A frase afirma que essas duas unidades podem compor o ambiente simultâneo; o exemplo de README.md:53 usa o diretório inexistente esm-patient-biometrics-app. Vitals tem servidor próprio, mas Biometrics não existe como pacote. É uma propriedade diferente da simples existência registrada na afirmação anterior sobre Biometrics.

### 236. README.md:56; packages/esm-patient-allergies-app/package.json:11; packages/esm-form-entry-app/package.json:11

**Observação:** O texto afirma: "run `yarn serve` from within the individual packages and then use import map overrides".

**Interpretação:** Os scripts serve por app são observáveis. Não há import map nem implementação de overrides no snapshot; essa parte é delegada ao shell/tooling externo. A frase não afirma que os módulos montem uma página isolada.

### 237. README.md:145; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-banner-app/src/routes.json:22-24

**Observação:** O texto afirma: "The patient header contains the patient banner".

**Interpretação:** O chart monta patient-header-slot e o banner registra patientBanner nesse slot. A localização na tela e as notificações são detalhes visuais, sem novas afirmações arquiteturais.

### 238. README.md:149; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69-78; README.md:135-153

**Observação:** O texto afirma: "A dashboard is a collection of widgets".

**Interpretação:** DashboardView monta o slot do dashboard e renderiza cada extensão. A descrição de layout em README.md:135-153 contextualiza essa composição; menu, cores e ocupação da tela não são fronteiras adicionais.

### 239. e2e/support/github/run-e2e-docker-env.sh:7; e2e/support/github/run-e2e-docker-env.sh:8

**Observação:** O texto afirma: "get a list of all the apps in this workspace".

**Interpretação:** O comentário promete todos os apps, mas o filtro exclui expressamente form-entry-app. A lista contém os outros 17 apps e não a biblioteca. Trata-se do conjunto destinado ao ambiente e2e, não de uma nova contagem do produto.

### 240. e2e/support/github/run-e2e-docker-env.sh:26-28; e2e/support/github/run-e2e-docker-env.sh:29-38

**Observação:** O texto afirma: "prepending the login app and primary navigation apps".

**Interpretação:** O comentário descreve a montagem dos módulos na imagem. O objeto efetivamente prefixado contém esm-primary-navigation-app e esm-home-app, não login. Os arquivos empacotados locais são mapeados para /app, como diz a continuação do comentário; a divergência sobre login torna a frase contradita.

### 241. packages/esm-form-entry-app/README.md:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23; packages/esm-form-entry-app/src/routes.json:8-13; packages/esm-form-entry-app/package.json:5

**Observação:** O texto afirma: "It's essentially a wrapper around an Angular application".

**Interpretação:** O widget expõe uma aplicação Angular por lifecycles singleSpaAngular e pelo form-widget-slot consumido por forms e vitals. O campo description em packages/esm-form-entry-app/package.json:5 repete a identificação Angular. A transformação de JSON em formulários e o funcionamento interno do motor não recebem linhas próprias.

### 242. packages/esm-generic-patient-widgets-app/README.md:3; packages/esm-generic-patient-widgets-app/src/routes.json:6-15; packages/esm-generic-patient-widgets-app/src/config-schema.ts:3-23; packages/esm-generic-patient-widgets-app/package.json:5

**Observação:** O texto afirma: "a generic widget that can be added to the patient chart using configuration".

**Interpretação:** O módulo oferece a extensão switchableObs sem slot fixo, com esquema de configuração. Isso sustenta a possibilidade de atribuí-la por configuração; a intenção de reutilização futura não é evidência de múltiplos consumidores. O campo description em packages/esm-generic-patient-widgets-app/package.json:5 repete seu papel de widget genérico.

### 243. packages/esm-patient-chart-app/README.md:3; packages/esm-patient-chart-app/src/root.component.tsx:11-16; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47-92; packages/esm-patient-chart-app/src/index.ts:33-42; README.md:23-26; packages/esm-patient-chart-app/package.json:5

**Observação:** O texto afirma: "provides the underlying framework on top of which all the individual widgets are run".

**Interpretação:** O chart fornece layout, roteamento, workspace e pontos de extensão do prontuário; não se deve confundir esse papel com o shell OpenMRS externo que carrega os bundles. O roteamento local escolhe resumo e dashboards; startupApp instala sincronização offline e rotas cacheáveis. README.md:23-26 e packages/esm-patient-chart-app/package.json:5 reiteram o papel do chart. Visitas, menus e modo offline são capacidades da unidade citadas na mesma frase, não outras unidades.

### 244. packages/esm-patient-chart-app/src/index.ts:27-28; packages/esm-patient-chart-app/src/index.ts:7-8; packages/esm-patient-chart-app/src/index.ts:29; packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:3

**Observação:** O texto afirma: "allows @openmrs/esm-patient-common-lib to be accessed by modules that are not using webpack. This is used for ngx-formentry.".

**Interpretação:** A atribuição a window disponibiliza a biblioteca. Existe import de @openmrs/ngx-formentry no app Angular, mas não há consumidor de _openmrs_esm_patient_common_lib no snapshot além da atribuição. A disponibilidade está confirmada; o consumo alegado e a propriedade de não usar webpack desse consumidor externo não estão demonstrados.

### 245. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:28-31; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:4; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:32-36

**Observação:** O texto afirma: "Anything used outside the patient chart [...] must be updated in the callback, which is called when the patient chart unmounts".

**Interpretação:** O comentário afirma que o estado da visita atual é usado fora do chart pelo Active Visit Tag do patient search e que deve ser atualizado no callback de desmontagem. O lado local está comprovado: setCurrentVisit é importado do framework (:4 do mesmo artefato) e o cleanup do useEffect chama setCurrentVisit(null, null) (:32-36). O consumidor Active Visit Tag do patient search não está demonstrado no snapshot; a limpeza local não comprova o compartilhamento alegado com essa unidade externa. Por isso, a afirmação é parcial.

### 246. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:15

**Observação:** O texto afirma: "used not in the refapp, but in other distributions".

**Interpretação:** O componente e suas chamadas a workspaces estão presentes nas linhas 17-30 do mesmo artefato, mas os manifests das distribuições que confirmariam onde é usado ou excluído não estão no snapshot. Sua existência não confirma uso efetivo em outras distribuições.

### 247. packages/esm-patient-common-lib/README.md:3; packages/esm-patient-allergies-app/src/index.ts:10; packages/esm-patient-chart-app/src/index.ts:7-8; packages/esm-patient-common-lib/src/index.ts:1-23; packages/esm-patient-common-lib/package.json:5

**Observação:** O texto afirma: "components and utilities shared across widgets in the patient chart".

**Interpretação:** Há consumidores reais em ao menos duas unidades, não apenas um pacote disponível: allergies usa createDashboardLink e chart importa a biblioteca e o mesmo helper. As reexportações incluem cards, empty-state, error-state, pagination e workspaces. A description em packages/esm-patient-common-lib/package.json:5 repete a finalidade da biblioteca.

### 248. packages/esm-patient-common-lib/src/orders/store.ts:4-7; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-40; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:71-78

**Observação:** O texto afirma: "different parts of the application may manage their own order lists".

**Interpretação:** O store indexa itens por paciente e grupo. Medications usa o grupo medications, enquanto orders lê o conjunto sem grupo. O comentário de packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:71-78 detalha a mesma afirmação e não gera duplicação. Isso documenta compartilhamento de estado entre unidades.

### 249. packages/esm-patient-flags-app/README.md:3; packages/esm-patient-flags-app/src/routes.json:25-30; packages/esm-patient-flags-app/package.json:5; packages/esm-patient-flags-app/src/routes.json:40; packages/esm-patient-flags-app/README.md:7

**Observação:** O texto afirma: "Flags are displayed in the Patient Summary".

**Interpretação:** O papel do módulo e sua integração ao resumo do chart são sustentados pela relação de composição já registrada. packages/esm-patient-flags-app/package.json:5 repete a existência do módulo; a description de packages/esm-patient-flags-app/src/routes.json:40 repete a integração ao resumo; o hook de API descrito em packages/esm-patient-flags-app/README.md:7 é funcionamento interno e não outra afirmação.

### 250. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:14; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19

**Observação:** O texto afirma: "listen for a message from HFE-UI to close the workspace".

**Interpretação:** O receptor verifica event.data igual a close-workspace e chama o fechamento. Esse contrato de comunicação é explícito, embora a página emissora externa não esteja no snapshot.

### 251. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:21; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:22-43

**Observação:** O texto afirma: "hide the headers and breadcrumbs of the O2 page on load".

**Interpretação:** O comentário identifica a integração da página O2 embutida: o iframe recebe src e o onLoad remove header, patient-header e breadcrumbs. A remoção visual isoladamente não seria linha; aqui identifica a adaptação da unidade frontend externa dentro do workspace.

### 252. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19

**Observação:** O texto afirma: "tells HFE-UI to send a message to the parent window to close the workspace when the form is saved or cancelled".

**Interpretação:** A URL aponta para htmlformentryui e inclui returnUrl=post-message:close-workspace, com receptor correspondente. A emissão nos eventos de salvar/cancelar pertence à página externa, ausente do snapshot, portanto só o lado local do contrato é corroborado. Distingue-se da afirmação do receptor pelo sujeito e pela propriedade verificável.

### 253. packages/esm-patient-lists-app/README.md:3-8; packages/esm-patient-lists-app/src/routes.json:13-29; packages/esm-patient-lists-app/package.json:5

**Observação:** O texto afirma: "The Patient Lists app renders a workspace in the Patient Chart".

**Interpretação:** O módulo declara workspaces patient-lists e patient-list-details. Seu papel restrito ao prontuário é diferente do app de gerenciamento da home, que não está neste snapshot; não se afirma integração observada com esse app externo. A description em packages/esm-patient-lists-app/package.json:5 repete o papel local.

### 254. packages/esm-patient-orders-app/package.json:5; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38; packages/esm-patient-orders-app/README.md:3-4

**Observação:** O texto afirma: "Microfrontend for the OpenMRS SPA providing the order basket for the patient chart".

**Interpretação:** Orders é unidade frontend própria e agrega os pedidos do carrinho. O texto em packages/esm-patient-orders-app/README.md:3-4 descreve a função de negócio de acesso a pedidos, enquanto a description torna explícito o papel de microfrontend. As relações 50 e 51 documentam a composição com medications e tests.

### 255. b50eb9b3 2021-08-08 (packages/esm-form-entry-app/package.json); 3d1e771d 2023-05-22 (packages/esm-form-entry-app/webpack.config.js)

**Observação:** O ponto histórico trata de `@angular-extensions/elements` declarado sem uso em `packages/esm-form-entry-app`. A tabela registra `inconclusivo` e os commits: b50eb9b3 2021-08-08 Moved form entry.

**Interpretação:** O log do manifesto começa em b50eb9b3 (2021-08-08, “Moved form entry”), mas seu blob está ausente. A mensagem de 3d1e771d (2023-05-22, “(fix) Setup `esm-form-entry` to use webpack module federation (PR 1168)”) anuncia uma configuração do wrapper; o webpack desse estágio também não pôde ser lido. Não se confirma uso anterior, substituição ou abandono de elements.

### 256. b50eb9b3 2021-08-08 (packages/esm-form-entry-app/package.json); 3d1e771d 2023-05-22 (packages/esm-form-entry-app/webpack.config.js)

**Observação:** O ponto histórico trata de `systemjs-webpack-interop` declarado sem uso em `packages/esm-form-entry-app`. A tabela registra `inconclusivo` e os commits: b50eb9b3 2021-08-08 Moved form entry; 3d1e771d 2023-05-22 (fix) Setup `esm-form-entry` to use webpack module federation (PR 1168).

**Interpretação:** Os blobs do manifesto em b50eb9b3 e do webpack em 3d1e771d estão ausentes. O anúncio de Module Federation não demonstra o destino de systemjs-webpack-interop, nem que tenha existido uma chamada removida. A declaração sem uso do snapshot permanece sem explicação histórica.

### 257. 28f77b89 2021-03-04 (packages/esm-patient-chart-app/package.json; packages/esm-patient-chart-app/src/index.ts)

**Observação:** O ponto histórico trata de `single-spa` declarado sem uso em `packages/esm-patient-chart-app`. A tabela registra `inconclusivo` e os commits: 28f77b89 2021-03-04 Migrated to monorepo.

**Interpretação:** O log do manifesto e da entrada do chart alcança 28f77b89 (2021-03-04, “Migrated to monorepo”); ambos os conteúdos desse estágio estão ausentes. Não se pode distinguir peer contract mantido para tooling externo de um import que teria sido retirado. O uso atual via framework não comprova uso direto deste pacote no passado.

### 258. 28f77b89 2021-03-04 (packages/esm-patient-chart-app/package.json; packages/esm-patient-chart-app/src/index.ts)

**Observação:** O ponto histórico trata de `single-spa-react` declarado sem uso em `packages/esm-patient-chart-app`. A tabela registra `inconclusivo` e os commits: 28f77b89 2021-03-04 Migrated to monorepo.

**Interpretação:** A mesma lacuna do manifesto e da entrada em 28f77b89 impede verificar se single-spa-react foi usado diretamente antes da delegação ao framework observável no snapshot. Nenhuma intenção ou remoção de uso é inferida da dependência declarada.

### 259. ddb858ef 2021-04-27 (packages/esm-patient-common-lib/package.json)

**Observação:** O ponto histórico trata de `single-spa` declarado sem uso em `packages/esm-patient-common-lib`. A tabela registra `inconclusivo` e os commits: ddb858ef 2021-04-27 Common lib (PR 228).

**Interpretação:** O log do manifesto da biblioteca chega a ddb858ef (2021-04-27, “Common lib (PR 228)”), mas o blob está ausente. A mensagem não informa o papel de single-spa. Não há base para afirmar uso anterior nem abandono dessa declaração.

### 260. ef475921 2024-04-29 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx)

**Observação:** O ponto histórico trata de Emissor de `openmrs:form-view-embedded` não identificado. A tabela registra `inconclusivo` e os commits: ef475921 2024-04-29 (feat) O3-3112: Add form collapse toggle to the `esm-form-engine-app` (PR 1814).

**Interpretação:** A mensagem de ef475921 anuncia a adição do toggle; o conteúdo desse commit está ausente. O log registra depois dc7b090e (2024-06-05, “(fix) Change the form collapse toggle color on tablet (PR 1857)”), sem esclarecer por mensagem quem emite o evento. Não se identifica uma unidade emissora nem se prova abandono. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 261. ef475921 2024-04-29 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx)

**Observação:** O ponto histórico trata de Receptor de `openmrs:form-collapse-toggle` não identificado. A tabela registra `inconclusivo` e os commits: ef475921 2024-04-29 (feat) O3-3112: Add form collapse toggle to the `esm-form-engine-app` (PR 1814).

**Interpretação:** O mesmo arquivo concentra o envio do segundo evento. Seu conteúdo em ef475921 está indisponível. Saber quando o toggle aparece não identifica o ouvinte externo, nem demonstra que o canal tenha sido desconectado. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 262. 6af19736 2022-11-17 (packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx)

**Observação:** O ponto histórico trata de `config.interpretationSlot` sem extensão identificada. A tabela registra `inconclusivo` e os commits: 6af19736 2022-11-17 Possibility to add an ExtensionSlot under graph (PR 848).

**Interpretação:** A mensagem de 6af19736 anuncia um ExtensionSlot sob o gráfico, mas seu conteúdo e o primeiro conteúdo do caminho atual (dddc1457) estão ausentes. O padrão vazio no snapshot (config-schema.ts:19-23) explica a condição local de renderização, sem identificar configuração externa ou uso anterior. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 263. 8a8f19cb 2022-09-08 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx)

**Observação:** O ponto histórico trata de `top-of-all-patient-dashboards-slot` sem fornecedor. A tabela registra `inconclusivo` e os commits: 8a8f19cb 2022-09-08 fix: Adjust `top-of-all-patient-dashboard-slot` appears before dashboard title (PR 800).

**Interpretação:** A mensagem de 8a8f19cb anuncia ajuste de posição de um slot de dashboard; não demonstra qual unidade o preenchia. O conteúdo inicial do caminho atual em e20f1c9a está ausente. Não se conclui se o slot perdeu consumidor ou permanece como ponto de extensão externo. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 264. 164cd3f8 2025-01-09 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx)

**Observação:** O ponto histórico trata de `visit-form-top-slot` sem fornecedor. A tabela registra `inconclusivo` e os commits: 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (PR 2169).

**Interpretação:** O log do caminho atual começa em 164cd3f8, cujo blob está ausente. As alterações do arquivo não bastam para datar esse slot específico ou mostrar um fornecedor removido. Não se reconstrói o caminho anterior a eventuais reorganizações. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 265. 164cd3f8 2025-01-09 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx)

**Observação:** O ponto histórico trata de `extra-visit-attribute-slot` sem fornecedor. A tabela registra `inconclusivo` e os commits: 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (PR 2169).

**Interpretação:** A indisponibilidade do conteúdo em 164cd3f8 impede comparar o slot com esse estágio. A chamada atual sem registro local não demonstra abandono; o log de mudanças do arquivo não identifica consumidores. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 266. 164cd3f8 2025-01-09 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx)

**Observação:** O ponto histórico trata de `visit-form-bottom-slot` sem fornecedor. A tabela registra `inconclusivo` e os commits: 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (PR 2169).

**Interpretação:** O mesmo limite de conteúdo em 164cd3f8 impede estabelecer a história desse segundo ponto de extensão do formulário. Não se infere uma unidade destino por proximidade com os demais slots. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 267. 71a16388 2024-03-05 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx)

**Observação:** O ponto histórico trata de `appointments-form-workspace` e uso em distribuições externas sem confirmação. A tabela registra `inconclusivo` e os commits: 71a16388 2024-03-05 O3-2857 Add visit actions extension in visits (PR 1692).

**Interpretação:** O conteúdo em 71a16388 está ausente. A mensagem anuncia ações de visita, sem identificar um registro de appointments ou os manifests de outras distribuições. O snapshot contém o botão e o comentário sobre distribuições externas (active-visit-buttons.tsx:15), mas nenhum deles comprova a integração externa ou abandono. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 268. 57a6db1b 2023-07-24 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx)

**Observação:** O ponto histórico trata de `visit-summary-panels` sem fornecedor. A tabela registra `inconclusivo` e os commits: 57a6db1b 2023-07-24 (feat) Add an extension slot for additional visit summary items (PR 1286).

**Interpretação:** A mensagem de 57a6db1b anuncia um slot para itens adicionais de resumo; não foi inspecionado o conteúdo dessa mudança. O primeiro blob consultado do caminho, em 9970d8a5, está ausente. A mensagem não resolve quem preenche o slot nem se houve remoção de consumidor. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 269. 449a6faa 2022-03-09 (packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx)

**Observação:** O ponto histórico trata de `slotName ?? title` sem fornecedor identificado. A tabela registra `inconclusivo` e os commits: 449a6faa 2022-03-09 (feat) O3-1108  Left nav should support groupings (PR 595).

**Interpretação:** O log chega a 449a6faa, cuja mensagem anuncia agrupamentos da navegação. O blob desse estágio está ausente; não se determina quando a expressão atual surgiu nem que unidades configurariam os grupos. A existência do helper não prova conexão externa. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 270. a371ea27 2024-05-13 (packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx)

**Observação:** O ponto histórico trata de `medication-info-slot` sem fornecedor. A tabela registra `inconclusivo` e os commits: a371ea27 2024-05-13 (feat) O3 3128: Add extension slots to lab and drug order forms (PR 1818).

**Interpretação:** A mensagem de a371ea27 anuncia slots nos formulários de pedidos. O conteúdo inicial consultado em 64389b35 está ausente; não foi lido o conteúdo do commit anunciado. A mensagem não identifica extensões fornecedoras nem prova abandono. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 271. 24cd98cc 2025-04-24 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx)

**Observação:** O ponto histórico trata de `${matchingOrder.type}-action-menu-items-slot` sem fornecedor. A tabela registra `inconclusivo` e os commits: 24cd98cc 2025-04-24 (fix) O3-4419: Fix order type filtering in order details table (PR 2385).

**Interpretação:** O conteúdo de 24cd98cc pôde ser lido e já contém este slot dinâmico; o log do caminho atual registra só esse commit até o snapshot. Isso estabelece presença nesse caminho e estabilidade posterior, mas não introdução original: o arquivo pode ter vindo de outro caminho. O consumidor continua não identificado. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 272. 24cd98cc 2025-04-24 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx)

**Observação:** O ponto histórico trata de `${matchingOrder.type}-detail-slot` sem fornecedor. A tabela registra `inconclusivo` e os commits: 24cd98cc 2025-04-24 (fix) O3-4419: Fix order type filtering in order details table (PR 2385).

**Interpretação:** O mesmo conteúdo de 24cd98cc já contém o segundo slot dinâmico e não há alteração posterior desse caminho no log. Isso não mostra se uma extensão externa já o preenchia ou se foi desconectada. Não se confunde estabilidade do arquivo com esclarecimento do uso. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 273. 14c1f1ff 2024-12-06 (packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx)

**Observação:** O ponto histórico trata de `top-of-lab-order-form-slot` sem fornecedor nos dois formulários. A tabela registra `inconclusivo` e os commits: 14c1f1ff 2024-12-06 (feat) O3-4223: Allow adding different order types in the order basket (PR 2109).

**Interpretação:** Os dois caminhos atuais aparecem no log em 14c1f1ff, cuja mensagem anuncia diferentes tipos de pedido no carrinho; ambos os blobs estão ausentes. A mesma dúvida foi reunida num ponto porque os dois formulários montam o mesmo slot. Não se comprova introdução do slot, fornecedor removido ou abandono. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 274. e87b8ace 2023-11-08 (README.md; packages/esm-patient-biometrics-app; packages/esm-patient-vitals-app); README.md:11; README.md:50-53

**Observação:** O ponto histórico trata de README mantém Biometrics como app separado e exemplo de composição com Vitals. A tabela registra `esclarecido` e os commits: e87b8ace 2023-11-08 BREAKING: Merge vitals and biometrics apps (PR 1429).

**Interpretação:** O name-status de e87b8ace confirma a remoção do README, manifesto, entrada e routes.json de esm-patient-biometrics-app, com adições de arquivos de biometria no app vitals. Isso sustenta a mudança entre estágios anunciada pela mensagem de fusão, sem afirmar identidade do conteúdo movido, pois os blobs antigos não foram lidos. O README desse commit está ausente, mas o snapshot ainda aponta ao diretório removido e o usa no comando de desenvolvimento (README.md:11, :50-53). A divergência refere-se a uma unidade que existiu antes; não se data a criação original dos exemplos.

### 275. ddb858ef 2021-04-27 (packages/esm-patient-common-lib/package.json); 04e7221e 2021-07-28 (README.md)

**Observação:** O ponto histórico trata de README chama Common lib de microfrontend. A tabela registra `inconclusivo` e os commits: ddb858ef 2021-04-27 Common lib (PR 228); 04e7221e 2021-07-28 Rewrite the README, removing most of it (PR 311).

**Interpretação:** O snapshot resolve o papel atual como biblioteca, mas não a origem de sua inclusão na lista de microfrontends. A mensagem de ddb858ef anuncia Common lib e a de 04e7221e uma reescrita do README. Os blobs do manifesto da biblioteca e desse README estão ausentes, impedindo verificar se a expressão descreveu outra organização ou sempre foi imprecisa.

### 276. 04e7221e 2021-07-28 (README.md)

**Observação:** O ponto histórico trata de Execução conjunta por `openmrs develop` só parcialmente observável. A tabela registra `inconclusivo` e os commits: 04e7221e 2021-07-28 Rewrite the README, removing most of it (PR 311).

**Interpretação:** O snapshot mostra o script e a documentação, mas o tooling que executa --sources é externo. O README antigo consultado em 04e7221e está ausente; o log não fornece a implementação externa nem esclarece eventual mudança do contrato. Não se transforma a limitação do corpus em evidência de abandono. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 277. 04e7221e 2021-07-28 (README.md)

**Observação:** O ponto histórico trata de Import map overrides documentados sem implementação local. A tabela registra `inconclusivo` e os commits: 04e7221e 2021-07-28 Rewrite the README, removing most of it (PR 311).

**Interpretação:** Os scripts serve estão presentes no snapshot; os overrides pertencem ao ambiente externo descrito pelo README. Seu conteúdo antigo em 04e7221e não está disponível. A documentação e o log do arquivo não mostram se o shell externo mantém esse recurso nem se alguma configuração local foi retirada. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 278. ac9ae85e 2024-06-26 (e2e/support/github/run-e2e-docker-env.sh)

**Observação:** O ponto histórico trata de Comentário e2e promete todos os apps, mas exclui form-entry. A tabela registra `esclarecido` e os commits: ac9ae85e 2024-06-26 (chore) O3-3372: Use React Form Engine in E2E Tests (PR 1859).

**Interpretação:** O script de ac9ae85e foi lido: já contém o comentário “all the apps” e o filtro que exclui form-entry-app. Não há alteração posterior desse caminho no log até o snapshot. A mensagem anuncia uso do React Form Engine nos testes. Assim, comentário e exclusão coexistem comprovadamente desde esse estágio; não se deve atribuir a divergência a uma mudança posterior. O conteúdo inicial de 07069195 está ausente, portanto não se data a primeira ocorrência da divergência.

### 279. ac9ae85e 2024-06-26 (e2e/support/github/run-e2e-docker-env.sh)

**Observação:** O ponto histórico trata de Comentário e2e anuncia login, mas prefixa home e navegação. A tabela registra `esclarecido` e os commits: ac9ae85e 2024-06-26 (chore) O3-3372: Use React Form Engine in E2E Tests (PR 1859).

**Interpretação:** O mesmo script de ac9ae85e já tem o comentário sobre login e o objeto que só prefixa esm-primary-navigation-app e esm-home-app. O arquivo não muda depois até o snapshot. A divergência já coexistia nesse estágio, sem ser possível reconstruir seu nascimento: o script de 07069195 está ausente. Não se afirma que login nunca foi montado em outro estágio ou pelo shell externo.

### 280. 93fcb73a 2023-10-25 (packages/esm-patient-chart-app/src/index.ts)

**Observação:** O ponto histórico trata de Consumo externo da biblioteca exposta em window não confirmado. A tabela registra `inconclusivo` e os commits: 93fcb73a 2023-10-25 (feat) Supporting O3-2510: Expose patient-common-lib on window (PR 1430).

**Interpretação:** A mensagem de 93fcb73a anuncia a exposição de patient-common-lib em window, mas seu src/index.ts está ausente. O snapshot confirma a atribuição e o import de ngx-formentry, sem mostrar o consumidor do global. A mensagem não comprova o consumo alegado, sua duração ou abandono. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 281. e20f1c9a 2022-03-07 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx)

**Observação:** O ponto histórico trata de Compartilhamento de current visit com patient search externo não confirmado. A tabela registra `inconclusivo` e os commits: e20f1c9a 2022-03-07 (refactor) esm-patient-chart to organize by functionality; eslint ts files (PR 594).

**Interpretação:** O conteúdo inicial consultado do componente em e20f1c9a está ausente. O snapshot mostra a limpeza com setCurrentVisit, mas não o Active Visit Tag externo citado no comentário. O log local não permite verificar esse consumidor nem concluir se o comentário descreve integração atual ou um estágio anterior. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

### 282. 30f4782c 2024-08-26 (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx)

**Observação:** O ponto histórico trata de HFE-UI externo emitiria mensagem ao salvar ou cancelar. A tabela registra `inconclusivo` e os commits: 30f4782c 2024-08-26 (feat) O3-3799: Open HTML Form Entry Forms within Form Workspace (PR 1963).

**Interpretação:** A mensagem de 30f4782c anuncia a abertura dos formulários HTML num workspace; o conteúdo desse estágio está ausente. A URL e o receptor local estão no snapshot, mas o emissor HFE-UI é externo. Não se confirma historicamente a emissão nos eventos de salvar/cancelar nem se infere abandono do contrato. A conexão com unidade externa e a permanência sem contraparte continuam alternativas plausíveis no snapshot.

## Classificação

| # | Origem | Dimensão | Tipo | Abordagem | Evidência | Força | Relações |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:27) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-chart-app/src/index.ts:1-6 |
| 2 | 3.4.2 (package.json:75) | 1 tecnologia | manifesto | — | contexto | fraca | declara turbo.json:3-11 |
| 3 | 3.4.2 (packages/esm-form-engine-app/package.json:46) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-form-engine-app/src/index.ts:1 |
| 4 | 3.4.2 (packages/esm-form-entry-app/package.json:38) | 1 tecnologia | manifesto | web-components | tecnológica | fraca | — |
| 5 | 3.4.2 (packages/esm-form-entry-app/package.json:59) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #53; declara #48 |
| 6 | 3.4.2 (packages/esm-form-entry-app/package.json:61) | 1 tecnologia | manifesto | import-maps | tecnológica | fraca | — |
| 7 | 3.4.2 (packages/esm-form-entry-app/package.json:68) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-form-entry-app/src/index.ts:3 |
| 8 | 3.4.2 (packages/esm-form-entry-app/package.json:69) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | declara #29 |
| 9 | 3.4.2 (packages/esm-generic-patient-widgets-app/package.json:45) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-generic-patient-widgets-app/src/index.ts:1 |
| 10 | 3.4.2 (packages/esm-patient-allergies-app/package.json:44) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-allergies-app/src/index.ts:1-9 |
| 11 | 3.4.2 (packages/esm-patient-attachments-app/package.json:49) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-attachments-app/src/index.ts:2 |
| 12 | 3.4.2 (packages/esm-patient-banner-app/package.json:45) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-banner-app/src/index.ts:1-7 |
| 13 | 3.4.2 (packages/esm-patient-chart-app/package.json:45) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-chart-app/src/index.ts:1-6 |
| 14 | 3.4.2 (packages/esm-patient-chart-app/package.json:53) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | — |
| 15 | 3.4.2 (packages/esm-patient-chart-app/package.json:54) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | — |
| 16 | 3.4.2 (packages/esm-patient-common-lib/package.json:37) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:1 |
| 17 | 3.4.2 (packages/esm-patient-common-lib/package.json:39) | 1 tecnologia | manifesto | single-spa | tecnológica | fraca | — |
| 18 | 3.4.2 (packages/esm-patient-conditions-app/package.json:45) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-conditions-app/src/index.ts:1 |
| 19 | 3.4.2 (packages/esm-patient-flags-app/package.json:43) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-flags-app/src/index.ts:1 |
| 20 | 3.4.2 (packages/esm-patient-forms-app/package.json:46) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-forms-app/src/index.ts:1-7 |
| 21 | 3.4.2 (packages/esm-patient-immunizations-app/package.json:47) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-immunizations-app/src/index.ts:1 |
| 22 | 3.4.2 (packages/esm-patient-lists-app/package.json:43) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-lists-app/src/index.ts:1 |
| 23 | 3.4.2 (packages/esm-patient-medications-app/package.json:45) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-medications-app/src/index.ts:1 |
| 24 | 3.4.2 (packages/esm-patient-notes-app/package.json:43) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-notes-app/src/index.ts:1-7 |
| 25 | 3.4.2 (packages/esm-patient-orders-app/package.json:45) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-orders-app/src/index.ts:1 |
| 26 | 3.4.2 (packages/esm-patient-programs-app/package.json:45) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-programs-app/src/index.ts:1 |
| 27 | 3.4.2 (packages/esm-patient-tests-app/package.json:47) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-tests-app/src/index.ts:1-7 |
| 28 | 3.4.2 (packages/esm-patient-vitals-app/package.json:46) | 1 tecnologia | manifesto | other-mfe-framework | tecnológica | fraca | declara packages/esm-patient-vitals-app/src/index.ts:1-8 |
| 29 | 3.4.2 (packages/esm-form-entry-app/package.json:69) (Evidência); 3.4.3 (packages/esm-form-entry-app) (Marcadores); 3.4.5 #1 (Configuração); 3.4.5 #2 (Configuração); 3.4.6 #2 (Artefatos) | 2 configuração | configuração | module-federation | tecnológica | moderada | configura #136; configura #154; configura #155 |
| 30 | 3.4.3 (packages/esm-form-engine-app) (Entrada); 3.4.4 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15) (Observação); 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95) (Observação); 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249) (Observação); 3.4.5 #44 (Configuração); 3.4.5 #58 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #135; configura #197; configura #211 |
| 31 | 3.4.3 (packages/esm-generic-patient-widgets-app) (Entrada); 3.4.7 #13 (Evidência) | 2 configuração | configuração | other | tecnológica | moderada | configura #137 |
| 32 | 3.4.3 (packages/esm-patient-allergies-app) (Entrada); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23) (Observação); 3.4.5 #12 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #138; configura #165 |
| 33 | 3.4.3 (packages/esm-patient-attachments-app) (Entrada); 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315) (Observação); 3.4.5 #13 (Configuração); 3.4.5 #48 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #139; configura #166; configura #201 |
| 34 | 3.4.3 (packages/esm-patient-banner-app) (Entrada); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389) (Observação); 3.4.5 #22 (Configuração); 3.4.7 #8 (Evidência) | 2 configuração | configuração | other | tecnológica | moderada | configura #140; configura #175 |
| 35 | 3.4.3 (packages/esm-patient-chart-app) (Entrada); 3.4.4 (packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23) (Observação); 3.4.4 (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4) (Observação); 3.4.4 (packages/esm-patient-common-lib/src/workspaces.ts:55) (Observação); 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94) (Observação); 3.4.4 (packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12) (Observação); 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497) (Observação); 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501) (Observação); 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57) (Observação); 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154) (Observação); 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268) (Observação); 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300) (Observação); 3.4.5 #8 (Configuração); 3.4.5 #29 (Configuração); 3.4.5 #30 (Configuração); 3.4.5 #31 (Configuração); 3.4.5 #32 (Configuração); 3.4.5 #33 (Configuração); 3.4.5 #34 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #141; configura #161; configura #182; configura #183; configura #184; configura #185; configura #186; configura #187 |
| 36 | 3.4.3 (packages/esm-patient-conditions-app) (Entrada); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26) (Observação); 3.4.5 #14 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #143; configura #167 |
| 37 | 3.4.3 (packages/esm-patient-flags-app) (Entrada); 3.4.4 (packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68) (Observação); 3.4.5 #21 (Configuração); 3.4.7 #20 (Evidência) | 2 configuração | configuração | other | tecnológica | moderada | configura #144; configura #174 |
| 38 | 3.4.3 (packages/esm-patient-forms-app) (Entrada); 3.4.4 (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43) (Observação); 3.4.4 (packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20) (Observação); 3.4.4 (packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25) (Observação); 3.4.4 (packages/esm-patient-common-lib/src/form-entry-interop.ts:70) (Observação); 3.4.4 (packages/esm-patient-common-lib/src/form-entry-interop.ts:97) (Observação); 3.4.4 (packages/esm-patient-vitals-app/src/utils.ts:16) (Observação); 3.4.5 #7 (Configuração); 3.4.5 #10 (Configuração); 3.4.5 #57 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #145; configura #160; configura #163; configura #210 |
| 39 | 3.4.3 (packages/esm-patient-immunizations-app) (Entrada); 3.4.5 #15 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #146; configura #168 |
| 40 | 3.4.3 (packages/esm-patient-lists-app) (Entrada); 3.4.7 #24 (Evidência) | 2 configuração | configuração | other | tecnológica | moderada | configura #147 |
| 41 | 3.4.3 (packages/esm-patient-medications-app) (Entrada); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) (Observação); 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120) (Observação); 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156) (Observação); 3.4.5 #16 (Configuração); 3.4.5 #50 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #148; configura #169; configura #203 |
| 42 | 3.4.3 (packages/esm-patient-notes-app) (Entrada); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281) (Observação); 3.4.5 #27 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #149; configura #180 |
| 43 | 3.4.3 (packages/esm-patient-orders-app) (Entrada); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27) (Observação); 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37) (Observação); 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71) (Observação); 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25) (Observação); 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149) (Observação); 3.4.4 (packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71) (Observação); 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58) (Observação); 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66) (Observação); 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103) (Observação); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78) (Observação); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153) (Observação); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163) (Observação); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54) (Observação); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208) (Observação); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68) (Observação); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99) (Observação); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111) (Observação); 3.4.5 #17 (Configuração); 3.4.5 #46 (Configuração); 3.4.5 #55 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #150; configura #170; configura #199; configura #208 |
| 44 | 3.4.3 (packages/esm-patient-programs-app) (Entrada); 3.4.5 #18 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #151; configura #171 |
| 45 | 3.4.3 (packages/esm-patient-tests-app) (Entrada); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13) (Observação); 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121) (Observação); 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156) (Observação); 3.4.5 #19 (Configuração); 3.4.5 #51 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #152; configura #172; configura #204 |
| 46 | 3.4.3 (packages/esm-patient-vitals-app) (Entrada); 3.4.4 (packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410) (Observação); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29) (Observação); 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501) (Observação); 3.4.4 (packages/esm-patient-vitals-app/src/utils.ts:16) (Observação); 3.4.5 #11 (Configuração); 3.4.5 #49 (Configuração) | 2 configuração | configuração | other | tecnológica | moderada | configura #153; configura #164; configura #202 |
| 47 | 3.4.4 (packages/esm-form-entry-app/src/index.ts:66) (Observação); 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:21) (Observação); 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:23) (Observação); 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95) (Observação); 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249) (Observação); 3.4.5 #1 (Configuração); 3.4.5 #2 (Configuração); 3.4.7 #12 (Evidência) | 2 configuração | configuração | other | tecnológica | moderada | configura #136; configura #154; configura #155 |
| 48 | 3.4.4 (packages/esm-form-entry-app/src/index.ts:66) | 3 código | código-fonte | — | tecnológica | fraca | — |
| 49 | 3.4.4 (packages/esm-form-entry-app/src/declarations.d.ts:3) | 3 código | código-fonte | — | contexto | fraca | — |
| 50 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:21) | 3 código | código-fonte | single-spa | arquitetural | moderada | implementa #154; implementa #155 |
| 51 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:22) | 3 código | código-fonte | single-spa | arquitetural | moderada | implementa #154; implementa #155 |
| 52 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:23) | 3 código | código-fonte | single-spa | arquitetural | moderada | implementa #154; implementa #155 |
| 53 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:3) | 3 código | código-fonte | single-spa | arquitetural | moderada | implementa #154; implementa #155 |
| 54 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:12) | 3 código | código-fonte | single-spa | arquitetural | moderada | implementa #154; implementa #155 |
| 55 | 3.4.4 (packages/esm-patient-attachments-app/src/attachments/attachment-preview.component.tsx:56) | 3 código | código-fonte | iframe | contexto | fraca | — |
| 56 | 3.4.4 (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43) | 3 código | código-fonte | iframe | arquitetural | forte | implementa #156 |
| 57 | 3.4.4 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15) | 3 código | código-fonte | events | tecnológica | ambígua | implementa #157 |
| 58 | 3.4.4 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23) | 3 código | código-fonte | events | tecnológica | ambígua | implementa #158 |
| 59 | 3.4.4 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24) | 3 código | código-fonte | events | tecnológica | ambígua | implementa #158 |
| 60 | 3.4.4 (packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56) | 3 código | código-fonte | single-spa | arquitetural | moderada | implementa #159 |
| 61 | 3.4.4 (packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20) | 3 código | código-fonte | other | arquitetural | moderada | implementa #160 |
| 62 | 3.4.4 (packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42) | 3 código | código-fonte | other | arquitetural | moderada | implementa #160 |
| 63 | 3.4.4 (packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259) | 3 código | código-fonte | other | arquitetural | forte | implementa #161 |
| 64 | 3.4.4 (packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #162 |
| 65 | 3.4.4 (packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24) | 3 código | código-fonte | other | arquitetural | forte | implementa #163 |
| 66 | 3.4.4 (packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124) | 3 código | código-fonte | other | arquitetural | forte | implementa #164 |
| 67 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37) | 3 código | código-fonte | other | arquitetural | moderada | implementa #164; implementa #165; implementa #166; implementa #167; implementa #168; implementa #169; implementa #170; implementa #171; implementa #172 |
| 68 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #173 |
| 69 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) | 3 código | código-fonte | other | arquitetural | moderada | implementa #164; implementa #165; implementa #166; implementa #167; implementa #168; implementa #169; implementa #170; implementa #171; implementa #172; implementa #174 |
| 70 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47) | 3 código | código-fonte | other | arquitetural | forte | implementa #164; implementa #165; implementa #166; implementa #167; implementa #168; implementa #169; implementa #170; implementa #171; implementa #172 |
| 71 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67) | 3 código | código-fonte | other | arquitetural | forte | implementa #175 |
| 72 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68) | 3 código | código-fonte | other | arquitetural | forte | implementa #174 |
| 73 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69) | 3 código | código-fonte | other | arquitetural | forte | implementa #164 |
| 74 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389) | 3 código | código-fonte | other | arquitetural | forte | implementa #175 |
| 75 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410) | 3 código | código-fonte | other | arquitetural | forte | implementa #164 |
| 76 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #176 |
| 77 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #177 |
| 78 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #178 |
| 79 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23) | 3 código | código-fonte | other | arquitetural | forte | implementa #165 |
| 80 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #179 |
| 81 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25) | 3 código | código-fonte | other | arquitetural | forte | implementa #163 |
| 82 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26) | 3 código | código-fonte | other | arquitetural | forte | implementa #167 |
| 83 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27) | 3 código | código-fonte | other | arquitetural | forte | implementa #170 |
| 84 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28) | 3 código | código-fonte | other | arquitetural | forte | implementa #180 |
| 85 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29) | 3 código | código-fonte | other | arquitetural | forte | implementa #164 |
| 86 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236) | 3 código | código-fonte | other | arquitetural | forte | implementa #180 |
| 87 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281) | 3 código | código-fonte | other | arquitetural | forte | implementa #180 |
| 88 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13) | 3 código | código-fonte | other | arquitetural | forte | implementa #172 |
| 89 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #181 |
| 90 | 3.4.4 (packages/esm-patient-common-lib/src/form-entry-interop.ts:70) | 3 código | código-fonte | other | arquitetural | moderada | implementa #163 |
| 91 | 3.4.4 (packages/esm-patient-common-lib/src/form-entry-interop.ts:97) | 3 código | código-fonte | other | arquitetural | moderada | implementa #163 |
| 92 | 3.4.4 (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4) | 3 código | código-fonte | other | arquitetural | forte | implementa #182; implementa #183; implementa #184; implementa #185; implementa #186; implementa #187 |
| 93 | 3.4.4 (packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #188 |
| 94 | 3.4.4 (packages/esm-patient-common-lib/src/orders/store.ts:24) | 3 código | código-fonte | events | arquitetural | moderada | implementa #189; implementa #190 |
| 95 | 3.4.4 (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10) | 3 código | código-fonte | events | arquitetural | moderada | implementa #191; implementa #192; implementa #193; implementa #194; implementa #195; implementa #196 |
| 96 | 3.4.4 (packages/esm-patient-common-lib/src/workspaces.ts:55) | 3 código | código-fonte | other | arquitetural | forte | implementa #182; implementa #184; implementa #185; implementa #186; implementa #187 |
| 97 | 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94) | 3 código | código-fonte | other | arquitetural | forte | implementa #182 |
| 98 | 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95) | 3 código | código-fonte | other | arquitetural | forte | implementa #154; implementa #197 |
| 99 | 3.4.4 (packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12) | 3 código | código-fonte | other | arquitetural | forte | implementa #182 |
| 100 | 3.4.4 (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17) | 3 código | código-fonte | events | arquitetural | moderada | implementa #198 |
| 101 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37) | 3 código | código-fonte | other | arquitetural | forte | implementa #199 |
| 102 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71) | 3 código | código-fonte | other | arquitetural | forte | implementa #199 |
| 103 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #200 |
| 104 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25) | 3 código | código-fonte | other | arquitetural | forte | implementa #199 |
| 105 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149) | 3 código | código-fonte | other | arquitetural | forte | implementa #199 |
| 106 | 3.4.4 (packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71) | 3 código | código-fonte | other | arquitetural | forte | implementa #199 |
| 107 | 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58) | 3 código | código-fonte | other | arquitetural | forte | implementa #199 |
| 108 | 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66) | 3 código | código-fonte | other | arquitetural | forte | implementa #199 |
| 109 | 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103) | 3 código | código-fonte | other | arquitetural | forte | implementa #199 |
| 110 | 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315) | 3 código | código-fonte | other | arquitetural | forte | implementa #201 |
| 111 | 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497) | 3 código | código-fonte | other | arquitetural | forte | implementa #185 |
| 112 | 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501) | 3 código | código-fonte | other | arquitetural | forte | implementa #185; implementa #202 |
| 113 | 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120) | 3 código | código-fonte | other | arquitetural | forte | implementa #203 |
| 114 | 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121) | 3 código | código-fonte | other | arquitetural | forte | implementa #204 |
| 115 | 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #205 |
| 116 | 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #206 |
| 117 | 3.4.4 (packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #207 |
| 118 | 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57) | 3 código | código-fonte | other | arquitetural | forte | implementa #186 |
| 119 | 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154) | 3 código | código-fonte | other | arquitetural | forte | implementa #186 |
| 120 | 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156) | 3 código | código-fonte | other | arquitetural | forte | implementa #203; implementa #204 |
| 121 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78) | 3 código | código-fonte | other | arquitetural | forte | implementa #208 |
| 122 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153) | 3 código | código-fonte | other | arquitetural | forte | implementa #208 |
| 123 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163) | 3 código | código-fonte | other | arquitetural | forte | implementa #208 |
| 124 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193) | 3 código | código-fonte | other | tecnológica | ambígua | implementa #209 |
| 125 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54) | 3 código | código-fonte | other | arquitetural | forte | implementa #208 |
| 126 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208) | 3 código | código-fonte | other | arquitetural | forte | implementa #208 |
| 127 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68) | 3 código | código-fonte | other | arquitetural | forte | implementa #208 |
| 128 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99) | 3 código | código-fonte | other | arquitetural | forte | implementa #208 |
| 129 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111) | 3 código | código-fonte | other | arquitetural | forte | implementa #208 |
| 130 | 3.4.4 (packages/esm-patient-vitals-app/src/utils.ts:16) | 3 código | código-fonte | other | arquitetural | forte | implementa #210 |
| 131 | 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249) | 3 código | código-fonte | other | arquitetural | forte | implementa #155; implementa #211 |
| 132 | 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268) | 3 código | código-fonte | other | arquitetural | forte | implementa #187 |
| 133 | 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300) | 3 código | código-fonte | other | arquitetural | forte | implementa #187 |
| 134 | 3.4.3 (.) | 4 estrutura | diretório | — | contexto | fraca | — |
| 135 | 3.4.3 (packages/esm-form-engine-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 136 | 3.4.3 (packages/esm-form-entry-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 137 | 3.4.3 (packages/esm-generic-patient-widgets-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 138 | 3.4.3 (packages/esm-patient-allergies-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 139 | 3.4.3 (packages/esm-patient-attachments-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 140 | 3.4.3 (packages/esm-patient-banner-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 141 | 3.4.3 (packages/esm-patient-chart-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 142 | 3.4.3 (packages/esm-patient-common-lib) | 4 estrutura | diretório | — | contexto | fraca | — |
| 143 | 3.4.3 (packages/esm-patient-conditions-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 144 | 3.4.3 (packages/esm-patient-flags-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 145 | 3.4.3 (packages/esm-patient-forms-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 146 | 3.4.3 (packages/esm-patient-immunizations-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 147 | 3.4.3 (packages/esm-patient-lists-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 148 | 3.4.3 (packages/esm-patient-medications-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 149 | 3.4.3 (packages/esm-patient-notes-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 150 | 3.4.3 (packages/esm-patient-orders-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 151 | 3.4.3 (packages/esm-patient-programs-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 152 | 3.4.3 (packages/esm-patient-tests-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 153 | 3.4.3 (packages/esm-patient-vitals-app) | 4 estrutura | diretório | — | arquitetural | moderada | — |
| 154 | 3.4.5 #1 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #145; liga #136 |
| 155 | 3.4.5 #2 | 5 composição | código-fonte | single-spa | arquitetural | forte | liga #153; liga #136 |
| 156 | 3.4.5 #3 | 5 composição | código-fonte | iframe | arquitetural | forte | liga #145 |
| 157 | 3.4.5 #4 | 5 composição | código-fonte | events | tecnológica | ambígua | liga #135 |
| 158 | 3.4.5 #5 | 5 composição | código-fonte | events | tecnológica | ambígua | liga #135 |
| 159 | 3.4.5 #6 | 5 composição | código-fonte | events | arquitetural | forte | liga #144 |
| 160 | 3.4.5 #7 | 5 composição | código-fonte | other | arquitetural | forte | liga #135; liga #145 |
| 161 | 3.4.5 #8 | 5 composição | código-fonte | other | arquitetural | forte | liga #136; liga #141 |
| 162 | 3.4.5 #9 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #137 |
| 163 | 3.4.5 #10 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #145 |
| 164 | 3.4.5 #11 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #153 |
| 165 | 3.4.5 #12 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #138 |
| 166 | 3.4.5 #13 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #139 |
| 167 | 3.4.5 #14 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #143 |
| 168 | 3.4.5 #15 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #146 |
| 169 | 3.4.5 #16 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #148 |
| 170 | 3.4.5 #17 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #150 |
| 171 | 3.4.5 #18 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #151 |
| 172 | 3.4.5 #19 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #152 |
| 173 | 3.4.5 #20 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #141 |
| 174 | 3.4.5 #21 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #144 |
| 175 | 3.4.5 #22 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #140 |
| 176 | 3.4.5 #23 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #141 |
| 177 | 3.4.5 #24 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #141 |
| 178 | 3.4.5 #25 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #141 |
| 179 | 3.4.5 #26 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #141 |
| 180 | 3.4.5 #27 | 5 composição | código-fonte | other | arquitetural | forte | liga #141; liga #149 |
| 181 | 3.4.5 #28 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #141 |
| 182 | 3.4.5 #29 | 5 composição | código-fonte | other | arquitetural | forte | liga #145; liga #141 |
| 183 | 3.4.5 #30 | 5 composição | código-fonte | other | arquitetural | forte | liga #146; liga #141 |
| 184 | 3.4.5 #31 | 5 composição | código-fonte | other | arquitetural | forte | liga #148; liga #141 |
| 185 | 3.4.5 #32 | 5 composição | código-fonte | other | arquitetural | forte | liga #149; liga #141 |
| 186 | 3.4.5 #33 | 5 composição | código-fonte | other | arquitetural | forte | liga #150; liga #141 |
| 187 | 3.4.5 #34 | 5 composição | código-fonte | other | arquitetural | forte | liga #153; liga #141 |
| 188 | 3.4.5 #35 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #141 |
| 189 | 3.4.5 #36 | 5 composição | código-fonte | events | arquitetural | forte | liga #148; liga #150 |
| 190 | 3.4.5 #37 | 5 composição | código-fonte | events | arquitetural | forte | liga #150; liga #152 |
| 191 | 3.4.5 #38 | 5 composição | código-fonte | events | arquitetural | forte | liga #141; liga #145 |
| 192 | 3.4.5 #39 | 5 composição | código-fonte | events | arquitetural | forte | liga #141; liga #148 |
| 193 | 3.4.5 #40 | 5 composição | código-fonte | events | arquitetural | forte | liga #141; liga #149 |
| 194 | 3.4.5 #41 | 5 composição | código-fonte | events | arquitetural | forte | liga #141; liga #150 |
| 195 | 3.4.5 #42 | 5 composição | código-fonte | events | arquitetural | forte | liga #141; liga #152 |
| 196 | 3.4.5 #43 | 5 composição | código-fonte | events | arquitetural | forte | liga #141; liga #153 |
| 197 | 3.4.5 #44 | 5 composição | código-fonte | other | arquitetural | forte | liga #145; liga #135 |
| 198 | 3.4.5 #45 | 5 composição | código-fonte | events | arquitetural | forte | liga #145 |
| 199 | 3.4.5 #46 | 5 composição | código-fonte | other | arquitetural | forte | liga #148; liga #150 |
| 200 | 3.4.5 #47 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #148 |
| 201 | 3.4.5 #48 | 5 composição | código-fonte | other | arquitetural | forte | liga #149; liga #139 |
| 202 | 3.4.5 #49 | 5 composição | código-fonte | other | arquitetural | forte | liga #149; liga #153 |
| 203 | 3.4.5 #50 | 5 composição | código-fonte | other | arquitetural | forte | liga #150; liga #148 |
| 204 | 3.4.5 #51 | 5 composição | código-fonte | other | arquitetural | forte | liga #150; liga #152 |
| 205 | 3.4.5 #52 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #150 |
| 206 | 3.4.5 #53 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #150 |
| 207 | 3.4.5 #54 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #150 |
| 208 | 3.4.5 #55 | 5 composição | código-fonte | other | arquitetural | forte | liga #152; liga #150 |
| 209 | 3.4.5 #56 | 5 composição | código-fonte | other | tecnológica | ambígua | liga #152 |
| 210 | 3.4.5 #57 | 5 composição | código-fonte | other | arquitetural | forte | liga #153; liga #145 |
| 211 | 3.4.5 #58 | 5 composição | código-fonte | other | arquitetural | forte | liga #153; liga #135 |
| 212 | 3.4.6 #1 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #135 |
| 213 | 3.4.6 #2 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #136 |
| 214 | 3.4.6 #3 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #137 |
| 215 | 3.4.6 #4 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #138 |
| 216 | 3.4.6 #5 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #139 |
| 217 | 3.4.6 #6 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #140 |
| 218 | 3.4.6 #7 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #141 |
| 219 | 3.4.6 #8 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #143 |
| 220 | 3.4.6 #9 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #144 |
| 221 | 3.4.6 #10 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #145 |
| 222 | 3.4.6 #11 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #146 |
| 223 | 3.4.6 #12 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #147 |
| 224 | 3.4.6 #13 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #148 |
| 225 | 3.4.6 #14 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #149 |
| 226 | 3.4.6 #15 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #150 |
| 227 | 3.4.6 #16 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #151 |
| 228 | 3.4.6 #17 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #152 |
| 229 | 3.4.6 #18 | 6 build-deploy | manifesto | — | arquitetural | moderada | publica #153 |
| 230 | 3.4.7 #1 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #164; corrobora #165; corrobora #166; corrobora #167; corrobora #168; corrobora #169; corrobora #170; corrobora #171; corrobora #172; corrobora #174; corrobora #175; corrobora #135; corrobora #136; corrobora #137; corrobora #138; corrobora #139; corrobora #140; corrobora #141; corrobora #143; corrobora #144; corrobora #145; corrobora #146; corrobora #147; corrobora #148; corrobora #149; corrobora #150; corrobora #151; corrobora #152; corrobora #153 |
| 231 | 3.4.7 #2 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #153; contradiz packages/esm-patient-vitals-app/README.md:3 |
| 232 | 3.4.7 #3 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #142; contradiz packages/esm-patient-common-lib/src/index.ts:1-23; contradiz packages/esm-patient-common-lib/package.json:9-13 |
| 233 | 3.4.7 #4 | 7 documentação | documentação | — | arquitetural | fraca | corrobora package.json:5-7; corrobora package.json:87 |
| 234 | 3.4.7 #5 | 7 documentação | documentação | — | arquitetural | fraca | corrobora em parte package.json:9; corrobora em parte packages/esm-patient-allergies-app/package.json:10-11 |
| 235 | 3.4.7 #6 | 7 documentação | documentação | — | arquitetural | fraca | contradiz #153; contradiz packages/esm-patient-vitals-app/package.json:10-11 |
| 236 | 3.4.7 #7 | 7 documentação | documentação | import-maps | arquitetural | fraca | corrobora em parte packages/esm-patient-allergies-app/package.json:11; corrobora em parte packages/esm-form-entry-app/package.json:11 |
| 237 | 3.4.7 #8 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #71; corrobora #34 |
| 238 | 3.4.7 #9 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #164; corrobora #165; corrobora #166; corrobora #167; corrobora #168; corrobora #169; corrobora #170; corrobora #171; corrobora #172; corrobora #174; corrobora #175; corrobora packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69-78 |
| 239 | 3.4.7 #10 | 7 documentação | comentário | — | arquitetural | fraca | contradiz e2e/support/github/run-e2e-docker-env.sh:8 |
| 240 | 3.4.7 #11 | 7 documentação | comentário | — | arquitetural | fraca | contradiz e2e/support/github/run-e2e-docker-env.sh:29-38 |
| 241 | 3.4.7 #12 | 7 documentação | documentação | single-spa | arquitetural | fraca | corrobora #154; corrobora #155; corrobora packages/esm-form-entry-app/src/bootstrap.ts:12-23; corrobora #47 |
| 242 | 3.4.7 #13 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #31; corrobora packages/esm-generic-patient-widgets-app/src/config-schema.ts:3-23 |
| 243 | 3.4.7 #14 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #164; corrobora #165; corrobora #166; corrobora #167; corrobora #168; corrobora #169; corrobora #170; corrobora #171; corrobora #172; corrobora #174; corrobora #175; corrobora packages/esm-patient-chart-app/src/root.component.tsx:11-16; corrobora packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47-92; corrobora packages/esm-patient-chart-app/src/index.ts:33-42 |
| 244 | 3.4.7 #15 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte packages/esm-patient-chart-app/src/index.ts:7-8; corrobora em parte packages/esm-patient-chart-app/src/index.ts:29; corrobora em parte packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:3 |
| 245 | 3.4.7 #16 | 7 documentação | comentário | — | arquitetural | fraca | corrobora em parte packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:4; corrobora em parte packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:32-36 |
| 246 | 3.4.7 #17 | 7 documentação | comentário | — | arquitetural | fraca | — |
| 247 | 3.4.7 #18 | 7 documentação | documentação | — | arquitetural | fraca | corrobora packages/esm-patient-allergies-app/src/index.ts:10; corrobora packages/esm-patient-chart-app/src/index.ts:7-8; corrobora packages/esm-patient-common-lib/src/index.ts:1-23 |
| 248 | 3.4.7 #19 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #189; corrobora #190; corrobora packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-40; corrobora packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19; corrobora packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38 |
| 249 | 3.4.7 #20 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #174; corrobora #37 |
| 250 | 3.4.7 #21 | 7 documentação | comentário | iframe | arquitetural | fraca | corrobora #198; corrobora packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19 |
| 251 | 3.4.7 #22 | 7 documentação | comentário | iframe | arquitetural | fraca | corrobora #156; corrobora packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:22-43 |
| 252 | 3.4.7 #23 | 7 documentação | comentário | iframe | arquitetural | fraca | corrobora em parte packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44; corrobora em parte packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19 |
| 253 | 3.4.7 #24 | 7 documentação | documentação | — | arquitetural | fraca | corrobora #147; corrobora #40 |
| 254 | 3.4.7 #25 | 7 documentação | comentário | — | arquitetural | fraca | corrobora #203; corrobora #204; corrobora #150; corrobora packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38 |
| 255 | 3.4.8 #1 | 8 histórico | histórico | — | tecnológica | fraca | explica #4 |
| 256 | 3.4.8 #2 | 8 histórico | histórico | — | tecnológica | fraca | explica #6 |
| 257 | 3.4.8 #3 | 8 histórico | histórico | — | tecnológica | fraca | explica #14 |
| 258 | 3.4.8 #4 | 8 histórico | histórico | — | tecnológica | fraca | explica #15 |
| 259 | 3.4.8 #5 | 8 histórico | histórico | — | tecnológica | fraca | explica #17 |
| 260 | 3.4.8 #6 | 8 histórico | histórico | — | tecnológica | ambígua | explica #157; explica #57 |
| 261 | 3.4.8 #7 | 8 histórico | histórico | — | tecnológica | ambígua | explica #158; explica #58; explica #59 |
| 262 | 3.4.8 #8 | 8 histórico | histórico | — | tecnológica | ambígua | explica #162; explica #64 |
| 263 | 3.4.8 #9 | 8 histórico | histórico | — | tecnológica | ambígua | explica #173; explica #68 |
| 264 | 3.4.8 #10 | 8 histórico | histórico | — | tecnológica | ambígua | explica #176; explica #76 |
| 265 | 3.4.8 #11 | 8 histórico | histórico | — | tecnológica | ambígua | explica #177; explica #77 |
| 266 | 3.4.8 #12 | 8 histórico | histórico | — | tecnológica | ambígua | explica #178; explica #78 |
| 267 | 3.4.8 #13 | 8 histórico | histórico | — | tecnológica | ambígua | explica #179; explica #246; explica #80 |
| 268 | 3.4.8 #14 | 8 histórico | histórico | — | tecnológica | ambígua | explica #181; explica #89 |
| 269 | 3.4.8 #15 | 8 histórico | histórico | — | tecnológica | ambígua | explica #188; explica #93 |
| 270 | 3.4.8 #16 | 8 histórico | histórico | — | tecnológica | ambígua | explica #200; explica #103 |
| 271 | 3.4.8 #17 | 8 histórico | histórico | — | tecnológica | ambígua | explica #205; explica #115 |
| 272 | 3.4.8 #18 | 8 histórico | histórico | — | tecnológica | ambígua | explica #206; explica #116 |
| 273 | 3.4.8 #19 | 8 histórico | histórico | — | tecnológica | ambígua | explica #207; explica #209; explica #117; explica #124 |
| 274 | 3.4.8 #20 | 8 histórico | histórico | — | arquitetural | fraca | explica #231; explica #235 |
| 275 | 3.4.8 #21 | 8 histórico | histórico | — | arquitetural | fraca | explica #232 |
| 276 | 3.4.8 #22 | 8 histórico | histórico | — | arquitetural | ambígua | explica #234 |
| 277 | 3.4.8 #23 | 8 histórico | histórico | — | arquitetural | ambígua | explica #236 |
| 278 | 3.4.8 #24 | 8 histórico | histórico | — | arquitetural | fraca | explica #239 |
| 279 | 3.4.8 #25 | 8 histórico | histórico | — | arquitetural | fraca | explica #240 |
| 280 | 3.4.8 #26 | 8 histórico | histórico | — | arquitetural | ambígua | explica #244 |
| 281 | 3.4.8 #27 | 8 histórico | histórico | — | arquitetural | ambígua | explica #245 |
| 282 | 3.4.8 #28 | 8 histórico | histórico | — | arquitetural | ambígua | explica #252 |

## Resumo

Observações: 282. Dimensões (tecnologia: 28, configuração: 19, código: 86, estrutura: 20, composição: 58, build-deploy: 18, documentação: 25, histórico: 28). Força (forte: 95, moderada: 70, fraca: 67, ambígua: 50). Evidência (tecnológica: 97, arquitetural: 180, contexto: 5).

## Notas

As regras comuns foram lidas em `docs/mfe-source-review/regras-comuns.md`, pois `docs/mfe-review-pipeline/regras-comuns.md` não existe neste checkout. As sete revisões finais têm o mesmo ID e commit da classificação. Foram usadas somente essas revisões e os trechos citados do snapshot adquirido.

Os 18 `src/routes.json` são configurações de registro por unidade; cada arquivo constitui um bloco da sua unidade, reunindo suas origens nas tabelas. O webpack de form-entry constitui outro bloco, com o plugin de federação. Os demais webpack delegam ao tooling externo; `webpack.prod.config.js` apenas reexporta a configuração; `angular.json` aponta para ela, sem declarar por si um builder de federação. Workspaces de package.json, tarefas Turbo, aliases, portas, URLs de desenvolvimento e os artefatos do ambiente e2e não acrescentam blocos elegíveis de configuração de composição. O JSON de montagem e2e é gerado por um script, não um arquivo de configuração disponível no snapshot.

As direções das relações com o shell e HFE-UI preservam as decisões registradas na 3.4.5: a origem é a unidade local participante, embora a mensagem venha do destino externo. A força das afirmações permanece fraca, mesmo quando corroboradas; a corroboração aparece somente nas relações dirigidas da tabela.

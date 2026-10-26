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

## Repository overview

Snapshot brings 18 OpenMRS frontend modules in Yarn monorepo plus coordination root/shared library (#134–#153). Each application has own entry, bundle/npm publication (#212–#229); version/release coordinated. Docker environment bringing 17 apps intended for e2e tests, excluding Angular wrapper. App shell/import map loading modules outside snapshot.

Observable chain starts in `@openmrs/esm-framework`/`single-spa-angular` declarations (#1, #3, #5 and other manifests), passes through extension/workspace/modal registries (#30–#47), code points mounting/opening them (#48–#133), reaches inter-unit relationships (#154–#211). Chart provides navigation, dashboards/slots filled by widgets; forms/vitals receive form engines through `form-widget-slot`. Orders, medications/tests combine workspaces, panels/order basket. Common library supports links but not counted frontend unit (PR 142).

Angular wrapper locally configures Module Federation container with own name, `./start`/singleton dependencies (PR 29), exports single-spa lifecycles (#50–#54). Container declares no consumer remotes. Forms/vitals → form-entry relationships preserve single-spa mechanism recorded in 3.4.5 (#154–#155); other mounts use OpenMRS extension system (`other`). React builds delegate default configuration to external `openmrs` package. Angular container not extended to other apps by inference.

Also shared reactive state in `order-basket`/`patient-chart-global-store` (#94–#95, #189–#196), shell events (#60, #159), external HFE-UI page integration through iframe/closure message (#56, #100, #156, #198). PDF-preview iframe attachment content without frontend composition (PR 55). Local asynchronous bootstrap/type declaration demonstrate no inter-unit link (#48–#49). Unused observed dependencies remain isolated signals (#4, #6, #14, #15, #17); Turbo orchestration context (PR 2).

Points without identified counterpart retain undetermined judgments: both toggle events, providerless slots, dynamic names/`appointments-form-workspace` may receive external units or remain disconnected (#157–#158, #162, #173, #176–#179, #181, #188, #200, #205–#207, #209). Vitals branches choosing external engine preserve final review’s Active Yes although `config.vitals.useFormEngine` defaults false (#130–#131, #210–#211). Section 3.5 does not alter values.

Documentation describes group but retains Biometrics as separate package/calls library microfrontend (#231–#232, #235); two e2e comments also diverge from script (#239–#240). History confirms Biometrics removal/coexistence of e2e divergences since June 2024 (#274, #278–#279). Other historical points authorize no withdrawal/abandonment inference: old contents missing or counterpart external (#255–#273, #275–#277, #280–#282). Past-only declaration uncertainty weak strength; uncertainty leaving snapshot architectural link open ambiguous.

## Observations

### 1. package.json:27; packages/esm-patient-chart-app/src/index.ts:1-6; package.json:5-7; packages/esm-patient-chart-app/package.json:7; packages/esm-form-entry-app/src/index.ts:3; packages/esm-form-entry-app/angular.json:42

**Observation:** Manifest declares `@openmrs/esm-framework` in `devDependencies`, version `next`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-chart-app/src/index.ts:1-6 (import from `@openmrs/esm-framework`, root-hoisted package in `workspaces`, package.json:5-7); packages/esm-patient-chart-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`); packages/esm-form-entry-app/src/index.ts:3 (import from package; `main` in packages/esm-form-entry-app/angular.json:42)

### 2. package.json:75; turbo.json:3-11; .github/workflows/ci.yml:52; .github/workflows/ci.yml:90; .github/workflows/ci.yml:159; .github/workflows/e2e.yml:66; .github/workflows/bundle-size.yml:33

**Observation:** Manifest declares `turbo` in `devDependencies`, version `^2.5.2`.

**Interpretation:** Declaration is an isolated signal of monorepo-tool. Review 3.4.2 records Configured `Yes`. Recorded usage: turbo.json:3-11 (task `build` with `dependsOn: ["^build"]` and `outputs: ["dist/**"]`); .github/workflows/ci.yml:52, :90 and :159 and .github/workflows/e2e.yml:66 (`yarn turbo run build`); .github/workflows/bundle-size.yml:33 (`build-script: 'turbo run build'`)

### 3. packages/esm-form-engine-app/package.json:46; packages/esm-form-engine-app/src/index.ts:1; packages/esm-form-engine-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-form-engine-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-form-engine-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 4. packages/esm-form-entry-app/package.json:38

**Observation:** Manifest declares `@angular-extensions/elements` in `dependencies`, version `^17.1.1`.

**Interpretation:** Declaration is an isolated signal of web-components. Review 3.4.2 records Configured `No`. Review identifies no snapshot dependency usage; declaration does not demonstrate composition.

### 5. packages/esm-form-entry-app/package.json:59; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/index.ts:66; packages/esm-form-entry-app/angular.json:42

**Observation:** Manifest declares `single-spa-angular` in `dependencies`, version `^9.0.1`.

**Interpretation:** Declaration is an isolated signal of single-spa. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-form-entry-app/src/bootstrap.ts:3 (import from `singleSpaAngular`) and :12-23 (`singleSpaAngular({...})` and export of `bootstrap`/`mount`/`unmount`); packages/esm-form-entry-app/src/index.ts:66 (`formWidget = () => import('./bootstrap')`); packages/esm-form-entry-app/angular.json:42 (`main: src/index.ts`)

### 6. packages/esm-form-entry-app/package.json:61

**Observation:** Manifest declares `systemjs-webpack-interop` in `dependencies`, version `^2.3.7`.

**Interpretation:** Declaration is an isolated signal of import-maps. Review 3.4.2 records Configured `No`. Review identifies no snapshot dependency usage; declaration does not demonstrate composition.

### 7. packages/esm-form-entry-app/package.json:68; packages/esm-form-entry-app/src/index.ts:3; packages/esm-form-entry-app/angular.json:42; packages/esm-form-entry-app/webpack.config.js:48

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-form-entry-app/src/index.ts:3 (`defineConfigSchema`, `messageOmrsServiceWorker` from package) and :63 (`defineConfigSchema(moduleName, configSchema)`); packages/esm-form-entry-app/angular.json:42 (`main: src/index.ts`) and :52 (`extraWebpackConfig: webpack.config.js`); packages/esm-form-entry-app/webpack.config.js:48 (`entry: src/index.ts`) and :116 (alias `@openmrs/esm-framework`)

### 8. packages/esm-form-entry-app/package.json:69; packages/esm-form-entry-app/src/single-spa-props.ts:2; packages/esm-form-entry-app/src/bootstrap.ts:6; packages/esm-form-entry-app/src/bootstrap.ts:14; packages/esm-form-entry-app/webpack.config.js:77-86; packages/esm-form-entry-app/angular.json:52

**Observation:** Manifest declares `single-spa` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of single-spa. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-form-entry-app/src/single-spa-props.ts:2 (`import { AppProps } from 'single-spa'`) and :47 (type `SingleSpaProps`), used in packages/esm-form-entry-app/src/bootstrap.ts:6 and :14; packages/esm-form-entry-app/webpack.config.js:77-86 (`peerDependencies`, which includes `single-spa`, shared as `singleton` no `ModuleFederationPlugin`), referenced by packages/esm-form-entry-app/angular.json:52

### 9. packages/esm-generic-patient-widgets-app/package.json:45; packages/esm-generic-patient-widgets-app/src/index.ts:1; packages/esm-generic-patient-widgets-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-generic-patient-widgets-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-generic-patient-widgets-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 10. packages/esm-patient-allergies-app/package.json:44; packages/esm-patient-allergies-app/src/index.ts:1-9; packages/esm-patient-allergies-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-allergies-app/src/index.ts:1-9 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-allergies-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 11. packages/esm-patient-attachments-app/package.json:49; packages/esm-patient-attachments-app/src/index.ts:2; packages/esm-patient-attachments-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-attachments-app/src/index.ts:2 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-attachments-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 12. packages/esm-patient-banner-app/package.json:45; packages/esm-patient-banner-app/src/index.ts:1-7; packages/esm-patient-banner-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-banner-app/src/index.ts:1-7 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-banner-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 13. packages/esm-patient-chart-app/package.json:45; packages/esm-patient-chart-app/src/index.ts:1-6; packages/esm-patient-chart-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-chart-app/src/index.ts:1-6 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-chart-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 14. packages/esm-patient-chart-app/package.json:53

**Observation:** Manifest declares `single-spa` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of single-spa. Review 3.4.2 records Configured `No`. Review identifies no snapshot dependency usage; declaration does not demonstrate composition.

### 15. packages/esm-patient-chart-app/package.json:54

**Observation:** Manifest declares `single-spa-react` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of single-spa. Review 3.4.2 records Configured `No`. Review identifies no snapshot dependency usage; declaration does not demonstrate composition.

### 16. packages/esm-patient-common-lib/package.json:37; packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:1; packages/esm-patient-common-lib/src/index.ts:9; packages/esm-patient-common-lib/package.json:7; packages/esm-patient-allergies-app/src/index.ts:10; packages/esm-patient-allergies-app/package.json:54

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:1 (`import { showModal } from '@openmrs/esm-framework'`); packages/esm-patient-common-lib/src/index.ts:9 (reexports module); packages/esm-patient-common-lib/package.json:7 (`main: src/index.ts`); packages/esm-patient-allergies-app/src/index.ts:10 (app imports `@openmrs/esm-patient-common-lib`, `workspace:*` in packages/esm-patient-allergies-app/package.json:54)

### 17. packages/esm-patient-common-lib/package.json:39

**Observation:** Manifest declares `single-spa` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of single-spa. Review 3.4.2 records Configured `No`. Review identifies no snapshot dependency usage; declaration does not demonstrate composition.

### 18. packages/esm-patient-conditions-app/package.json:45; packages/esm-patient-conditions-app/src/index.ts:1; packages/esm-patient-conditions-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-conditions-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-conditions-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 19. packages/esm-patient-flags-app/package.json:43; packages/esm-patient-flags-app/src/index.ts:1; packages/esm-patient-flags-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-flags-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-flags-app/package.json:7 (`main: src/index.ts`) and :12 (`webpack --mode production`)

### 20. packages/esm-patient-forms-app/package.json:46; packages/esm-patient-forms-app/src/index.ts:1-7; packages/esm-patient-forms-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-forms-app/src/index.ts:1-7 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-forms-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 21. packages/esm-patient-immunizations-app/package.json:47; packages/esm-patient-immunizations-app/src/index.ts:1; packages/esm-patient-immunizations-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-immunizations-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-immunizations-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 22. packages/esm-patient-lists-app/package.json:43; packages/esm-patient-lists-app/src/index.ts:1; packages/esm-patient-lists-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-lists-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-lists-app/package.json:7 (`main: src/index.ts`) and :12 (`webpack --mode production`)

### 23. packages/esm-patient-medications-app/package.json:45; packages/esm-patient-medications-app/src/index.ts:1; packages/esm-patient-medications-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-medications-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-medications-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 24. packages/esm-patient-notes-app/package.json:43; packages/esm-patient-notes-app/src/index.ts:1-7; packages/esm-patient-notes-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-notes-app/src/index.ts:1-7 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-notes-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 25. packages/esm-patient-orders-app/package.json:45; packages/esm-patient-orders-app/src/index.ts:1; packages/esm-patient-orders-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-orders-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-orders-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 26. packages/esm-patient-programs-app/package.json:45; packages/esm-patient-programs-app/src/index.ts:1; packages/esm-patient-programs-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-programs-app/src/index.ts:1 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-programs-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 27. packages/esm-patient-tests-app/package.json:47; packages/esm-patient-tests-app/src/index.ts:1-7; packages/esm-patient-tests-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-tests-app/src/index.ts:1-7 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-tests-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 28. packages/esm-patient-vitals-app/package.json:46; packages/esm-patient-vitals-app/src/index.ts:1-8; packages/esm-patient-vitals-app/package.json:7

**Observation:** Manifest declares `@openmrs/esm-framework` in `peerDependencies`, version `6.x`.

**Interpretation:** Declaration is an isolated signal of other-mfe-framework. Review 3.4.2 records Configured `Yes`. Recorded usage: packages/esm-patient-vitals-app/src/index.ts:1-8 (import from `@openmrs/esm-framework`, `getSyncLifecycle`/`getAsyncLifecycle`/`defineConfigSchema`); packages/esm-patient-vitals-app/package.json:7 (`main: src/index.ts`) and :13 (`webpack --mode production`)

### 29. packages/esm-form-entry-app/webpack.config.js:27-31; packages/esm-form-entry-app/webpack.config.js:70-87; packages/esm-form-entry-app/package.json:2; packages/esm-form-entry-app/package.json:6-7; packages/esm-form-entry-app/package.json:67-70

**Observation:** `ModuleFederationPlugin` receives package name `@openmrs/esm-form-entry-app`, global library `_openmrs_esm_form_entry_app`, filename derived from `browser`. Exposes `./start` to `src/index.ts`. Shares `peerDependencies` and `@openmrs/esm-framework/src/internal`, with `singleton: true`, `shareScope: default`.

**Interpretation:** Configures unit container including exposure/sharing. Declares no other remote unit; consumer belongs to external shell.

### 30. packages/esm-form-engine-app/src/routes.json:1-25

**Observation:** Unit registry declares `extensions`: {"name": "react-form-engine-widget", "component": "formRenderer", "slot": "form-widget-slot"}; `extensions`: {"name": "rfe-form-collapse-toggle", "component": "formCollapseToggle", "slot": "workspace-header-patient-chart-slot"}; `modals`: {"name": "form-engine-delete-question-confirm-modal", "component": "deleteQuestionModal"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 31. packages/esm-generic-patient-widgets-app/src/routes.json:1-17

**Observation:** Unit registry declares `extensions`: {"name": "obs-by-encounter-widget", "component": "switchableObs"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 32. packages/esm-patient-allergies-app/src/routes.json:1-48

**Observation:** Unit registry declares `extensions`: {"name": "allergy-tile", "component": "allergyTile", "slot": "patient-details-header-slot"}; `extensions`: {"name": "allergies-details-widget", "component": "allergiesDetailedSummary", "slot": "patient-chart-allergies-dashboard-slot"}; `extensions`: {"name": "allergies-summary-dashboard", "component": "allergiesDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "allergy-delete-confirmation-dialog", "component": "allergyDeleteConfirmationDialog"}; `workspaces`: {"name": "patient-allergy-form-workspace", "component": "allergyFormWorkspace"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 33. packages/esm-patient-attachments-app/src/routes.json:1-39

**Observation:** Unit registry declares `extensions`: {"name": "attachments-overview-widget", "component": "attachmentsOverview", "slot": "patient-chart-attachments-dashboard-slot"}; `extensions`: {"name": "attachments-results-summary-dashboard", "component": "attachmentsSummaryResultsDashboard", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "capture-photo-widget", "component": "capturePhotoWidget", "slot": "capture-patient-photo-slot"}; `modals`: {"name": "capture-photo-modal", "component": "capturePhotoModal"}; `modals`: {"name": "delete-attachment-modal", "component": "deleteAttachmentModal"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 34. packages/esm-patient-banner-app/src/routes.json:1-49

**Observation:** Unit registry declares `extensions`: {"name": "visit-tag", "component": "visitTag", "slot": "patient-banner-tags-slot"}; `extensions`: {"name": "deceased-patient-tag", "component": "deceasedPatientTag", "slot": "patient-banner-tags-slot"}; `extensions`: {"name": "patient-banner", "component": "patientBanner", "slot": "patient-header-slot"}; `extensions`: {"name": "print-identifier-sticker-button", "component": "printIdentifierStickerActionButton", "slot": "patient-actions-slot"}; `modals`: {"name": "print-identifier-sticker-modal", "component": "printIdentifierStickerModal"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 35. packages/esm-patient-chart-app/src/routes.json:1-244

**Observation:** Unit registry declares `extensions`: {"name": "charts-summary-dashboard", "component": "patientSummaryDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "encounter-list", "component": "encounterListTableTabs"}; `extensions`: {"name": "start-visit-button", "component": "startVisitActionButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "clinical-views-summary", "component": "clinicalViewsSummary"}; `extensions`: {"name": "stop-visit-button", "component": "stopVisitActionButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "mark-alive-button", "component": "markPatientAliveActionButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "stop-visit-button-patient-search", "component": "stopVisitPatientSearchActionButton", "slot": "patient-search-actions-slot"}; `extensions`: {"name": "delete-visit-button", "component": "deleteVisitActionMenuButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "delete-visit-button", "component": "deleteVisitActionMenuButton", "slot": "patient-search-actions-slot"}; `extensions`: {"name": "mark-patient-deceased-button", "component": "markPatientDeceasedActionButton", "slot": "patient-actions-slot"}; `extensions`: {"name": "encounters-summary-dashboard", "component": "encountersSummaryDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "past-visits-detail-overview", "component": "pastVisitsDetailOverview", "slot": "patient-chart-encounters-dashboard-slot"}; `extensions`: {"name": "patient-details-tile", "component": "patientDetailsTile", "slot": "visit-form-header-slot"}; `extensions`: {"name": "nav-group", "component": "genericNavGroup"}; `extensions`: {"name": "dashboard", "component": "genericDashboard"}; `extensions`: {"name": "start-visit-button-patient-search", "component": "startVisitPatientSearchActionButton", "slot": "start-visit-button-slot"}; `extensions`: {"name": "visit-attribute-tags", "component": "visitAttributeTags", "slot": "patient-banner-tags-slot"}; `extensions`: {"name": "current-visit-summary", "component": "currentVisitSummary"}; `extensions`: {"name": "edit-visit-action-button", "component": "editVisitDetailsActionButton", "slot": "visit-detail-overview-actions"}; `extensions`: {"name": "delete-visit-action-button", "component": "deleteVisitActionButton", "slot": "visit-detail-overview-actions"}; `extensions`: {"name": "active-visit-action-button", "component": "activeVisitActionsComponent", "slot": "active-visit-actions"}; `extensions`: {"name": "visit-context-header", "component": "visitContextHeader", "slot": "visit-context-header-slot"}; `workspaces`: {"name": "mark-patient-deceased-workspace-form", "component": "markPatientDeceasedForm"}; `workspaces`: {"name": "start-visit-workspace-form", "component": "startVisitWorkspace"}; `modals`: {"name": "delete-encounter-modal", "component": "deleteEncounterModal"}; `modals`: {"name": "delete-visit-dialog", "component": "deleteVisitModal"}; `modals`: {"name": "end-visit-dialog", "component": "endVisitModal"}; `modals`: {"name": "mark-patient-alive-modal", "component": "markPatientAliveModal"}; `modals`: {"name": "modify-visit-date-dialog", "component": "modifyVisitDateModal"}; `modals`: {"name": "start-visit-dialog", "component": "startVisitModal"}; `modals`: {"name": "visit-context-switcher", "component": "visitContextSwitcherModal"}; `pages`: {"component": "root", "routeRegex": "^patient/.+/chart"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 36. packages/esm-patient-conditions-app/src/routes.json:1-51

**Observation:** Unit registry declares `extensions`: {"name": "conditions-overview-widget", "component": "conditionsOverview", "slot": "patient-chart-summary-dashboard-slot"}; `extensions`: {"name": "conditions-details-widget", "component": "conditionsDetailedSummary", "slot": "patient-chart-conditions-dashboard-slot"}; `extensions`: {"name": "conditions-summary-dashboard", "component": "conditionsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "conditions-widget", "component": "conditionsWidget"}; `extensions`: {"name": "condition-delete-confirmation-dialog", "component": "conditionDeleteConfirmationDialog"}; `workspaces`: {"name": "conditions-form-workspace", "component": "conditionsFormWorkspace"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 37. packages/esm-patient-flags-app/src/routes.json:1-43

**Observation:** Unit registry declares `extensions`: {"name": "edit-flags-side-panel-form", "component": "editPatientFlagsWorkspace"}; `extensions`: {"name": "patient-flag-tags", "component": "flagTags", "slot": "patient-highlights-bar-slot"}; `extensions`: {"name": "patient-flags-overview", "component": "flagsOverview", "slot": "patient-chart-summary-dashboard-slot"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 38. packages/esm-patient-forms-app/src/routes.json:1-92

**Observation:** Unit registry declares `extensions`: {"name": "offline-tools-dashboard-forms-card", "component": "offlineFormOverviewCard", "slot": "offline-tools-dashboard-cards"}; `extensions`: {"name": "offline-tools-page-forms-link", "component": "offlineFormsNavLink", "slot": "offline-tools-page-slot"}; `extensions`: {"name": "offline-tools-page-forms", "component": "offlineForms", "slot": "offline-tools-page-forms-slot"}; `extensions`: {"name": "clinical-form-action-menu", "component": "clinicalFormActionMenu", "slot": "action-menu-patient-chart-items-slot"}; `extensions`: {"name": "clinical-forms-workspaceExtension", "component": "clinicalFormsWorkspaceExtension", "slot": "ward-patient-clinical-forms-workspace-slot"}; `workspaces`: {"name": "patient-form-entry-workspace", "component": "patientFormEntryWorkspace"}; `workspaces`: {"name": "ward-patient-form-entry-workspace", "component": "patientFormEntryWorkspace"}; `workspaces`: {"name": "patient-html-form-entry-workspace", "component": "patientHtmlFormEntryWorkspace"}; `workspaces`: {"name": "ward-patient-html-form-entry-workspace", "component": "patientHtmlFormEntryWorkspace"}; `workspaces`: {"name": "clinical-forms-workspace", "component": "clinicalFormsWorkspace"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 39. packages/esm-patient-immunizations-app/src/routes.json:1-37

**Observation:** Unit registry declares `extensions`: {"name": "immunization-overview-widget", "component": "immunizationsOverview"}; `extensions`: {"name": "immunization-details-widget", "component": "immunizationsDetailedSummary", "slot": "patient-chart-immunizations-dashboard-slot"}; `extensions`: {"name": "immunization-summary-dashboard", "component": "immunizationsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `workspaces`: {"name": "immunization-form-workspace", "component": "immunizationFormWorkspace"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 40. packages/esm-patient-lists-app/src/routes.json:1-31

**Observation:** Unit registry declares `extensions`: {"name": "patient-lists-action-menu", "component": "patientListsActionMenu", "slot": "action-menu-patient-chart-items-slot"}; `workspaces`: {"name": "patient-lists", "component": "patientListsWorkspace"}; `workspaces`: {"name": "patient-list-details", "component": "patientListDetailsWorkspace"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 41. packages/esm-patient-medications-app/src/routes.json:1-49

**Observation:** Unit registry declares `extensions`: {"name": "medications-details-widget", "component": "medicationsSummary", "slot": "patient-chart-medications-dashboard-slot"}; `extensions`: {"name": "active-medications-widget", "component": "activeMedications", "slot": "patient-chart-summary-dashboard-slot"}; `extensions`: {"name": "medications-summary-dashboard", "component": "medicationsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "drug-order-panel", "component": "drugOrderPanel", "slot": "order-basket-slot"}; `workspaces`: {"name": "add-drug-order", "component": "addDrugOrderWorkspace"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 42. packages/esm-patient-notes-app/src/routes.json:1-32

**Observation:** Unit registry declares `extensions`: {"name": "notes-overview-widget", "component": "notesOverview"}; `extensions`: {"name": "visit-note-nav-button", "component": "visitNotesActionButton", "slot": "action-menu-patient-chart-items-slot"}; `workspaces`: {"name": "visit-notes-form-workspace", "component": "visitNotesFormWorkspace"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 43. packages/esm-patient-orders-app/src/routes.json:1-101

**Observation:** Unit registry declares `extensions`: {"name": "order-price-details", "component": "orderPriceDetailsExtension", "slot": "order-item-additional-info-slot"}; `extensions`: {"name": "order-stock-details", "component": "orderStockDetailsExtension", "slot": "order-item-additional-info-slot"}; `extensions`: {"name": "order-basket-action-menu", "component": "orderBasketActionMenu"}; `extensions`: {"name": "lab-result", "component": "labResult", "slot": "completed-lab-order-results-slot"}; `extensions`: {"name": "print-lab-results-action-button", "component": "printLabResultsButton", "slot": "print-lab-results-action-button-slot"}; `extensions`: {"name": "patient-orders-summary-dashboard", "component": "ordersDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "patient-orders-dashboard", "component": "ordersDashboard", "slot": "patient-chart-orders-dashboard-slot"}; `workspaces`: {"name": "order-basket", "component": "orderBasketWorkspace"}; `workspaces`: {"name": "patient-orders-form-workspace", "component": "patientOrdersFormWorkspace"}; `workspaces`: {"name": "test-results-form-workspace", "component": "testResultsFormWorkspace"}; `workspaces`: {"name": "orderable-concept-workspace", "component": "orderableConceptSearch"}; `modals`: {"name": "print-lab-results-modal", "component": "printLabResultModal"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 44. packages/esm-patient-programs-app/src/routes.json:1-47

**Observation:** Unit registry declares `extensions`: {"name": "programs-overview-widget", "component": "programsOverview"}; `extensions`: {"name": "programs-details-widget", "component": "programsDetailedSummary", "slot": "patient-chart-programs-dashboard-slot"}; `extensions`: {"name": "programs-summary-dashboard", "component": "programsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `workspaces`: {"name": "programs-form-workspace", "component": "programsFormWorkspace"}; `modals`: {"name": "program-delete-confirmation-modal", "component": "deleteProgramConfirmationModal"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 45. packages/esm-patient-tests-app/src/routes.json:1-58

**Observation:** Unit registry declares `extensions`: {"name": "test-results-summary-dashboard", "component": "testResultsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "test-results-filtered-overview", "component": "externalOverview", "slot": "test-results-filtered-overview-slot"}; `extensions`: {"name": "results-viewer", "component": "resultsViewer"}; `extensions`: {"name": "lab-order-panel", "component": "labOrderPanel", "slot": "order-basket-slot"}; `workspaces`: {"name": "add-lab-order", "component": "addLabOrderWorkspace"}; `modals`: {"name": "timeline-results-modal", "component": "timelineResultsModal"}; `modals`: {"name": "print-modal", "component": "printModal"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 46. packages/esm-patient-vitals-app/src/routes.json:1-83

**Observation:** Unit registry declares `extensions`: {"name": "vitals-overview-widget", "component": "vitalsSummary", "slot": "patient-chart-summary-dashboard-slot"}; `extensions`: {"name": "vitals-details-widget", "component": "vitalsMain", "slot": "patient-chart-vitals-biometrics-dashboard-slot"}; `extensions`: {"name": "patient-vitals-info", "component": "vitalsHeader", "slot": "patient-info-slot"}; `extensions`: {"name": "biometrics-overview-widget", "component": "biometricsOverview", "slot": "patient-chart-summary-dashboard-slot"}; `extensions`: {"name": "biometrics-details-widget", "component": "biometricsDetailedSummary", "slot": "patient-chart-vitals-biometrics-dashboard-slot"}; `extensions`: {"name": "results-summary-dashboard", "component": "vitalsAndBiometricsDashboardLink", "slot": "patient-chart-dashboard-slot"}; `extensions`: {"name": "weight-tile", "component": "weightTile", "slot": "visit-form-header-slot"}; `workspaces`: {"name": "patient-vitals-biometrics-form-workspace", "component": "vitalsBiometricsFormWorkspace"}; `modals`: {"name": "vitals-biometrics-delete-confirmation-modal", "component": "vitalsAndBiometricsDeleteConfirmationModal"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 47. packages/esm-form-entry-app/src/routes.json:1-16

**Observation:** Unit registry declares `extensions`: {"name": "form-widget", "component": "formWidget", "slot": "form-widget-slot"}.

**Interpretation:** Parameterizes components exposed by unit for OpenMRS extension system. Slot/registry names allow framework resolution; file alone identifies no second consuming unit.

### 48. packages/esm-form-entry-app/src/index.ts:66; packages/esm-form-entry-app/src/routes.json:8-11

**Observation:** Excerpt contains ` export const formWidget = () => import('./bootstrap'); `. In cited registries, packages/esm-form-entry-app/src/routes.json:8-11 declares "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretation:** `formWidget = () => import('./bootstrap')` loads unit’s own `src/bootstrap.ts`; `import()` of local file internal to unit. `formWidget` is extension `form-widget` component (packages/esm-form-entry-app/src/routes.json:8-11); composition in lifecycles below

### 49. packages/esm-form-entry-app/src/declarations.d.ts:3

**Observation:** Excerpt contains ` declare const __webpack_share_scopes__; `.

**Interpretation:** `declare const __webpack_share_scopes__;` only declares global type in `.d.ts`; executes no remote resolution

### 50. packages/esm-form-entry-app/src/bootstrap.ts:21; packages/esm-form-entry-app/src/index.ts:66; packages/esm-form-entry-app/src/routes.json:8-11; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-250; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observation:** Excerpt contains ` export const bootstrap = lifecycles.bootstrap; `. In cited registries, packages/esm-form-entry-app/src/routes.json:8-11 declares "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretation:** Exports lifecycle `bootstrap` created by `singleSpaAngular` (:12-19). Module reaches framework through `formWidget` (packages/esm-form-entry-app/src/index.ts:66), registered in `form-widget-slot` (packages/esm-form-entry-app/src/routes.json:8-11); slot mounted by other units at packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95 and packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-250

### 51. packages/esm-form-entry-app/src/bootstrap.ts:22; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observation:** Excerpt contains ` export const mount = lifecycles.mount; `.

**Interpretation:** Exports lifecycle `mount` from same `singleSpaAngular` (:12-19), called by framework when mounting extension `form-widget` in `form-widget-slot` at packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95

### 52. packages/esm-form-entry-app/src/bootstrap.ts:23; packages/esm-form-entry-app/src/routes.json:8-11; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observation:** Excerpt contains ` export const unmount = lifecycles.unmount; `. In cited registries, packages/esm-form-entry-app/src/routes.json:8-11 declares "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretation:** Exports lifecycle `unmount` from same `singleSpaAngular` (:12-19), used when unmounting extension `form-widget` (packages/esm-form-entry-app/src/routes.json:8-11)

### 53. packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observation:** Excerpt contains ` import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular'; `.

**Interpretation:** `import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular'` enables lifecycle creation at :12-19, exported at :21-23 to framework

### 54. packages/esm-form-entry-app/src/bootstrap.ts:12; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23

**Observation:** Excerpt contains ` const lifecycles = singleSpaAngular({ `.

**Interpretation:** `singleSpaAngular({ bootstrapFunction, template: '<my-app-root />', NgZone })` (:12-19) creates Angular app lifecycles, receiving single-spa props in `singleSpaPropsSubject` (:14) and mounted as extension `form-widget` by other units (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95)

### 55. packages/esm-patient-attachments-app/src/attachments/attachment-preview.component.tsx:56; packages/esm-patient-attachments-app/src/attachments/attachment-preview.component.tsx:53-57

**Observation:** Excerpt contains ` <iframe className={styles.pdfViewer} src={attachmentToPreview.src} title="PDFViewer" /> `.

**Interpretation:** `<iframe className={styles.pdfViewer} src={attachmentToPreview.src}>` in `isPdf` branch (:53-57): shows patient attachment PDF, content rather than frontend unit

### 56. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:50-53; packages/esm-patient-forms-app/src/index.ts:36; packages/esm-patient-forms-app/src/routes.json:67

**Observation:** Excerpt contains ` <iframe ref={iframeRef} src={src} className={styles.wrapper} onLoad={onLoad}></iframe> `. In cited registries, packages/esm-patient-forms-app/src/routes.json:67 declares "name": "patient-html-form-entry-workspace", "component": "patientHtmlFormEntryWorkspace". URL received by iframe built as `${window.openmrsBase}/htmlformentryui/htmlform/${uiPage}.page?`, with `returnUrl=post-message:close-workspace`.

**Interpretation:** Embeds OpenMRS 2.x HFE-UI page: `src` is `${window.openmrsBase}/htmlformentryui/htmlform/<page>.page?...` with `returnUrl=post-message:close-workspace` (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44, :50-53); `onLoad` removes embedded-page header/breadcrumbs (:22-38). Active through workspace `patient-html-form-entry-workspace` (packages/esm-patient-forms-app/src/index.ts:36, packages/esm-patient-forms-app/src/routes.json:67). Target unit external to snapshot

### 57. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15; packages/esm-form-engine-app/src/routes.json:13-15; packages/esm-form-engine-app/src/index.ts:19-25

**Observation:** Excerpt contains ` window.addEventListener('openmrs:form-view-embedded', handleFormEmbedded); `. In cited registries, packages/esm-form-engine-app/src/routes.json:13-15 declares "name": "rfe-form-collapse-toggle", "component": "formCollapseToggle", "slot": "workspace-header-patient-chart-slot".

**Interpretation:** Subscribes to `openmrs:form-view-embedded` in `window` (:14-20) to show toggle. Component is extension `rfe-form-collapse-toggle` in `workspace-header-patient-chart-slot` (packages/esm-form-engine-app/src/routes.json:13-15, packages/esm-form-engine-app/src/index.ts:19-25). No snapshot file emits event; sender outside snapshot may be library `@openmrs/esm-form-engine-lib` rendered by own unit (packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx). Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 58. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23

**Observation:** Excerpt contains ` const FormCollapseToggleEvent = new CustomEvent('openmrs:form-collapse-toggle', { detail: { value } }); `.

**Interpretation:** Creates `CustomEvent('openmrs:form-collapse-toggle', { detail: { value } })` in `onToggle` (:22-25). No snapshot file listens, so target unit unconfirmed. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 59. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24

**Observation:** Excerpt contains ` window.dispatchEvent(FormCollapseToggleEvent); `.

**Interpretation:** `window.dispatchEvent(FormCollapseToggleEvent)` dispatches event created at :23; listener outside snapshot as previous row. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 60. packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56; packages/esm-patient-flags-app/src/flags/flags-highlight-bar.component.tsx:14; packages/esm-patient-flags-app/src/index.ts:3; packages/esm-patient-flags-app/src/routes.json:20

**Observation:** Excerpt contains ` window.addEventListener('single-spa:routing-event', listenToRoutingEvent); `. In cited registries, packages/esm-patient-flags-app/src/routes.json:20 declares "name": "patient-flag-tags", "slot": "patient-highlights-bar-slot", "component": "flagTags".

**Interpretation:** Subscribes to `single-spa:routing-event` (:55-60) to follow URL (`e.detail.newUrl`, :47-53). Event dispatched by single-spa app shell, external snapshot unit. Active: `useCurrentPath` used in packages/esm-patient-flags-app/src/flags/flags-highlight-bar.component.tsx:14, component imported in packages/esm-patient-flags-app/src/index.ts:3 and registered in `patient-highlights-bar-slot` (packages/esm-patient-flags-app/src/routes.json:20)

### 61. packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20; packages/esm-patient-common-lib/src/form-entry-interop.ts:5; packages/esm-patient-forms-app/src/routes.json:85

**Observation:** Excerpt contains ` launchPatientWorkspace(clinicalFormsWorkspaceName); `. In cited registries, packages/esm-patient-forms-app/src/routes.json:85 declares "name": "clinical-forms-workspace", "component": "clinicalFormsWorkspace".

**Interpretation:** `launchPatientWorkspace(clinicalFormsWorkspaceName)` with default `clinicalFormsWorkspace` (:14) = `'clinical-forms-workspace'` (packages/esm-patient-common-lib/src/form-entry-interop.ts:5): opens workspace registered by packages/esm-patient-forms-app/src/routes.json:85

### 62. packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42; packages/esm-patient-forms-app/src/routes.json:85

**Observation:** Excerpt contains ` !encounterUuid && openClinicalFormsWorkspaceOnFormClose && launchPatientWorkspace(clinicalFormsWorkspaceName); `. In cited registries, packages/esm-patient-forms-app/src/routes.json:85 declares "name": "clinical-forms-workspace", "component": "clinicalFormsWorkspace".

**Interpretation:** When closing form without encounter, `launchPatientWorkspace(clinicalFormsWorkspaceName)` (default at :33) reopens workspace `clinical-forms-workspace` from packages/esm-patient-forms-app/src/routes.json:85

### 63. packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259; packages/esm-patient-chart-app/src/routes.json:210

**Observation:** Excerpt contains ` const dispose = showModal('modify-visit-date-dialog', { `. In cited registries, packages/esm-patient-chart-app/src/routes.json:210 declares "name": "modify-visit-date-dialog", "component": "modifyVisitDateModal".

**Interpretation:** `showModal('modify-visit-date-dialog', ...)` opens modal registered by packages/esm-patient-chart-app/src/routes.json:210

### 64. packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113

**Observation:** Excerpt contains ` <ExtensionSlot name={config.interpretationSlot} style={{ gridTemplateColumns: '1fr' }} /> `.

**Interpretation:** `<ExtensionSlot name={config.interpretationSlot}>` (:111-115) mounts extensions of configuration-named slot; no snapshot `routes.json` fills it, so target unit unconfirmed. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 65. packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24; packages/esm-patient-chart-app/src/clinical-views/encounter-list/encounter-list.component.tsx:7; packages/esm-patient-forms-app/src/routes.json:49

**Observation:** Excerpt contains ` launchPatientWorkspace('patient-form-entry-workspace', { `. In cited registries, packages/esm-patient-forms-app/src/routes.json:49 declares "name": "patient-form-entry-workspace", "component": "patientFormEntryWorkspace".

**Interpretation:** `launchPatientWorkspace('patient-form-entry-workspace', ...)` in `launchEncounterForm` (used in packages/esm-patient-chart-app/src/clinical-views/encounter-list/encounter-list.component.tsx:7) opens workspace registered by packages/esm-patient-forms-app/src/routes.json:49

### 66. packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124; packages/esm-patient-chart-app/src/routes.json:114; packages/esm-patient-vitals-app/src/routes.json:65

**Observation:** Excerpt contains ` <ExtensionSlot className={styles.dataGridRow} name="visit-form-header-slot" state={memoizedPatientUuid} /> `. In cited registries, packages/esm-patient-chart-app/src/routes.json:114 declares "name": "patient-details-tile", "slot": "visit-form-header-slot", "component": "patientDetailsTile"; packages/esm-patient-vitals-app/src/routes.json:65 declares "name": "weight-tile", "component": "weightTile", "slot": "visit-form-header-slot".

**Interpretation:** `<ExtensionSlot name="visit-form-header-slot">` mounts slot extensions filled by own unit (packages/esm-patient-chart-app/src/routes.json:114) and packages/esm-patient-vitals-app/src/routes.json:65

### 67. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-orders-app/src/routes.json:49; packages/esm-patient-allergies-app/src/routes.json:26; packages/esm-patient-vitals-app/src/routes.json:55

**Observation:** Excerpt contains ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => `. In cited registries, packages/esm-patient-orders-app/src/routes.json:49 declares "name": "patient-orders-summary-dashboard", "component": "ordersDashboardLink", "slot": "patient-chart-dashboard-slot", "slot": "patient-chart-orders-dashboard-slot"; packages/esm-patient-allergies-app/src/routes.json:26 declares "name": "allergies-summary-dashboard", "component": "allergiesDashboardLink", "slot": "patient-chart-dashboard-slot", "slot": "patient-chart-allergies-dashboard-slot"; packages/esm-patient-vitals-app/src/routes.json:55 declares "name": "results-summary-dashboard", "component": "vitalsAndBiometricsDashboardLink", "slot": "patient-chart-dashboard-slot", "slot": "patient-chart-vitals-biometrics-dashboard-slot".

**Interpretation:** Reads `useExtensionStore()` (:34) extensions assigned to `patient-chart-dashboard-slot` (:37-39) and navigation groups (:40-45) to assemble dashboards. Slot filled by orders, attachments, allergies, programs, immunizations, medications, conditions, tests, vitals and own unit (`"slot": "patient-chart-dashboard-slot"` in packages/esm-patient-orders-app/src/routes.json:49, packages/esm-patient-allergies-app/src/routes.json:26, packages/esm-patient-vitals-app/src/routes.json:55, among others)

### 68. packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66

**Observation:** Excerpt contains ` <ExtensionSlot state={state} name="top-of-all-patient-dashboards-slot" /> `.

**Interpretation:** `<ExtensionSlot name="top-of-all-patient-dashboards-slot">` mounts extensions atop every dashboard; no snapshot `routes.json` fills slot. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 69. packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/dashboard.meta.ts:2; packages/esm-patient-flags-app/src/routes.json:27; packages/esm-patient-medications-app/src/routes.json:18; packages/esm-patient-conditions-app/src/routes.json:10; packages/esm-patient-vitals-app/src/routes.json:11

**Observation:** Excerpt contains ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> `. In cited registries, packages/esm-patient-flags-app/src/routes.json:27 declares "name": "patient-flags-overview", "slot": "patient-chart-summary-dashboard-slot", "component": "flagsOverview"; packages/esm-patient-medications-app/src/routes.json:18 declares "name": "active-medications-widget", "component": "activeMedications", "slot": "patient-chart-summary-dashboard-slot"; packages/esm-patient-conditions-app/src/routes.json:10 declares "name": "conditions-overview-widget", "slot": "patient-chart-summary-dashboard-slot", "component": "conditionsOverview"; packages/esm-patient-vitals-app/src/routes.json:11 declares "name": "vitals-overview-widget", "component": "vitalsSummary", "slot": "patient-chart-summary-dashboard-slot".

**Interpretation:** `<ExtensionSlot name={dashboard.slot}>` with `<Extension state={state}>` (:69-78) mounts chosen dashboard widgets, with width metadata from `useExtensionSlotMeta` (:35). Dashboard slots filled by other units, for example `patient-chart-summary-dashboard-slot` (packages/esm-patient-chart-app/src/dashboard.meta.ts:2) by packages/esm-patient-flags-app/src/routes.json:27, packages/esm-patient-medications-app/src/routes.json:18, packages/esm-patient-conditions-app/src/routes.json:10 and packages/esm-patient-vitals-app/src/routes.json:11

### 70. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-orders-app/src/routes.json:47-51; packages/esm-patient-allergies-app/src/routes.json:24-31; packages/esm-patient-vitals-app/src/routes.json:53-58

**Observation:** Excerpt contains ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); `.

**Interpretation:** `setLeftNav({ name: 'patient-chart-dashboard-slot', ... })` hands framework side navigation formed by slot extensions registered by multiple units (see chart-review.component.tsx:37 row); `unsetLeftNav` on cleanup (:48)

### 71. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-banner-app/src/routes.json:23

**Observation:** Excerpt contains ` <ExtensionSlot name="patient-header-slot" state={state} /> `. In cited registries, packages/esm-patient-banner-app/src/routes.json:23 declares "name": "patient-banner", "slot": "patient-header-slot", "component": "patientBanner".

**Interpretation:** `<ExtensionSlot name="patient-header-slot">` mounts patient banner registered by packages/esm-patient-banner-app/src/routes.json:23

### 72. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68; packages/esm-patient-flags-app/src/routes.json:20

**Observation:** Excerpt contains ` <ExtensionSlot name="patient-highlights-bar-slot" state={state} /> `. In cited registries, packages/esm-patient-flags-app/src/routes.json:20 declares "name": "patient-flag-tags", "slot": "patient-highlights-bar-slot", "component": "flagTags".

**Interpretation:** `<ExtensionSlot name="patient-highlights-bar-slot">` mounts flags bar registered by packages/esm-patient-flags-app/src/routes.json:20

### 73. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69; packages/esm-patient-vitals-app/src/routes.json:31

**Observation:** Excerpt contains ` <ExtensionSlot name="patient-info-slot" state={state} /> `. In cited registries, packages/esm-patient-vitals-app/src/routes.json:31 declares "name": "patient-vitals-info", "component": "vitalsHeader", "slot": "patient-info-slot".

**Interpretation:** `<ExtensionSlot name="patient-info-slot">` mounts extension registered by packages/esm-patient-vitals-app/src/routes.json:31

### 74. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389-392; packages/esm-patient-banner-app/src/routes.json:23

**Observation:** Excerpt contains ` <ExtensionSlot name="patient-header-slot" state={{ patient, `. In cited registries, packages/esm-patient-banner-app/src/routes.json:23 declares "name": "patient-banner", "slot": "patient-header-slot", "component": "patientBanner".

**Interpretation:** `<ExtensionSlot name="patient-header-slot">` (:389-390) in visit form mounts banner from packages/esm-patient-banner-app/src/routes.json:23

### 75. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410-413; packages/esm-patient-vitals-app/src/routes.json:65

**Observation:** Excerpt contains ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={visitHeaderSlotState} `. In cited registries, packages/esm-patient-vitals-app/src/routes.json:65 declares "name": "weight-tile", "component": "weightTile", "slot": "visit-form-header-slot".

**Interpretation:** `<ExtensionSlot name="visit-form-header-slot">` (:410-411) mounts extensions from own unit and packages/esm-patient-vitals-app/src/routes.json:65

### 76. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452

**Observation:** Excerpt contains ` name="visit-form-top-slot" `.

**Interpretation:** `VisitFormExtensionSlot name="visit-form-top-slot"` (:451-456), mounting `<ExtensionSlot name={name}>` with `<Extension>` (:633-645); no snapshot `routes.json` fills slot. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 77. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547

**Observation:** Excerpt contains ` <ExtensionSlot state={{ patientUuid, setExtraVisitInfo }} name="extra-visit-attribute-slot" /> `.

**Interpretation:** `<ExtensionSlot name="extra-visit-attribute-slot">`; no snapshot `routes.json` fills slot. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 78. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562

**Observation:** Excerpt contains ` name="visit-form-bottom-slot" `.

**Interpretation:** `VisitFormExtensionSlot name="visit-form-bottom-slot"` (:561-566), same mechanism at :633-645; no snapshot `routes.json` fills slot. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 79. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23; packages/esm-patient-allergies-app/src/routes.json:42; packages/esm-patient-chart-app/src/index.ts:195; packages/esm-patient-chart-app/src/routes.json:174

**Observation:** Excerpt contains ` const launchAllergiesFormWorkspace = useLaunchWorkspaceRequiringVisit('patient-allergy-form-workspace'); `. In cited registries, packages/esm-patient-allergies-app/src/routes.json:42 declares "name": "patient-allergy-form-workspace", "component": "allergyFormWorkspace"; packages/esm-patient-chart-app/src/routes.json:174 declares "name": "active-visit-action-button", "slot": "active-visit-actions", "component": "activeVisitActionsComponent".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('patient-allergy-form-workspace')`, triggered in buttons (:67, :121), opens workspace from packages/esm-patient-allergies-app/src/routes.json:42. Active component: `activeVisitActionsComponent` (packages/esm-patient-chart-app/src/index.ts:195, packages/esm-patient-chart-app/src/routes.json:174)

### 80. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24

**Observation:** Excerpt contains ` const launchAppointmentsFormWorkspace = useLaunchWorkspaceRequiringVisit('appointments-form-workspace'); `.

**Interpretation:** `useLaunchWorkspaceRequiringVisit('appointments-form-workspace')` (buttons at :73, :127); no snapshot `routes.json` registers workspace, so target unit unconfirmed. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 81. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25; packages/esm-patient-forms-app/src/routes.json:85

**Observation:** Excerpt contains ` const launchClinicalFormsWorkspace = useLaunchWorkspaceRequiringVisit('clinical-forms-workspace'); `. In cited registries, packages/esm-patient-forms-app/src/routes.json:85 declares "name": "clinical-forms-workspace", "component": "clinicalFormsWorkspace".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('clinical-forms-workspace')` (buttons at :79, :133) opens workspace from packages/esm-patient-forms-app/src/routes.json:85

### 82. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26; packages/esm-patient-conditions-app/src/routes.json:46

**Observation:** Excerpt contains ` const launchConditionsFormWorkspace = useLaunchWorkspaceRequiringVisit('conditions-form-workspace'); `. In cited registries, packages/esm-patient-conditions-app/src/routes.json:46 declares "name": "conditions-form-workspace", "component": "conditionsFormWorkspace".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('conditions-form-workspace')` (buttons at :61, :115) opens workspace from packages/esm-patient-conditions-app/src/routes.json:46

### 83. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` const launchOrderBasketFormWorkspace = useLaunchWorkspaceRequiringVisit('order-basket'); `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('order-basket')` (buttons at :49, :98) opens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 84. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28; packages/esm-patient-notes-app/src/routes.json:25

**Observation:** Excerpt contains ` const launchVisitNotesFormWorkspace = useLaunchWorkspaceRequiringVisit('visit-notes-form-workspace'); `. In cited registries, packages/esm-patient-notes-app/src/routes.json:25 declares "name": "visit-notes-form-workspace", "component": "visitNotesFormWorkspace".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('visit-notes-form-workspace')` (buttons at :43, :90) opens workspace from packages/esm-patient-notes-app/src/routes.json:25

### 85. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29; packages/esm-patient-vitals-app/src/routes.json:72

**Observation:** Excerpt contains ` const launchVitalsAndBiometricsFormWorkspace = useLaunchWorkspaceRequiringVisit( `. In cited registries, packages/esm-patient-vitals-app/src/routes.json:72 declares "name": "patient-vitals-biometrics-form-workspace", "component": "vitalsBiometricsFormWorkspace".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('patient-vitals-biometrics-form-workspace')` (:29-31; buttons at :55, :109) opens workspace from packages/esm-patient-vitals-app/src/routes.json:72

### 86. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236; packages/esm-patient-notes-app/src/routes.json:25

**Observation:** Excerpt contains ` launchWorkspace('visit-notes-form-workspace', { `. In cited registries, packages/esm-patient-notes-app/src/routes.json:25 declares "name": "visit-notes-form-workspace", "component": "visitNotesFormWorkspace".

**Interpretation:** `launchWorkspace('visit-notes-form-workspace', ...)` for visit-note editing opens workspace from packages/esm-patient-notes-app/src/routes.json:25; for other encounters calls `launchFormEntryOrHtmlForms` (:242), recorded in packages/esm-patient-common-lib/src/form-entry-interop.ts rows

### 87. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281; packages/esm-patient-notes-app/src/routes.json:25

**Observation:** Excerpt contains ` launchWorkspace('visit-notes-form-workspace', { `. In cited registries, packages/esm-patient-notes-app/src/routes.json:25 declares "name": "visit-notes-form-workspace", "component": "visitNotesFormWorkspace".

**Interpretation:** Second table-edit point: `launchWorkspace('visit-notes-form-workspace', ...)` opens same workspace from packages/esm-patient-notes-app/src/routes.json:25; alternative `launchFormEntryOrHtmlForms` at :287

### 88. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13; packages/esm-patient-tests-app/src/routes.json:22

**Observation:** Excerpt contains ` return <ExtensionSlot name="test-results-filtered-overview-slot" state={{ filter, patientUuid }} />; `. In cited registries, packages/esm-patient-tests-app/src/routes.json:22 declares "name": "test-results-filtered-overview", "slot": "test-results-filtered-overview-slot", "component": "externalOverview".

**Interpretation:** `<ExtensionSlot name="test-results-filtered-overview-slot">` mounts extension registered by packages/esm-patient-tests-app/src/routes.json:22

### 89. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159

**Observation:** Excerpt contains ` <ExtensionSlot name={visitSummaryPanelSlot}> `.

**Interpretation:** `<ExtensionSlot name={visitSummaryPanelSlot}>` with `<Extension>` (:159-163), slot `visit-summary-panels` (:30), tabs from `useAssignedExtensions` (:35); no snapshot `routes.json` fills slot. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 90. packages/esm-patient-common-lib/src/form-entry-interop.ts:70; packages/esm-patient-forms-app/src/routes.json:49; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:242; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:287

**Observation:** Excerpt contains ` launchWorkspace(formEntryWorkspaceName, { `. In cited registries, packages/esm-patient-forms-app/src/routes.json:49 declares "name": "patient-form-entry-workspace", "component": "patientFormEntryWorkspace".

**Interpretation:** `launchWorkspace(formEntryWorkspaceName, ...)` in `launchFormEntry`, default `'patient-form-entry-workspace'` (:6, :68), opens workspace from packages/esm-patient-forms-app/src/routes.json:49. Called by `launchFormEntryOrHtmlForms` (:36) from another unit at packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:242 and :287. Unit `—`: library `No` in structure review

### 91. packages/esm-patient-common-lib/src/form-entry-interop.ts:97; packages/esm-patient-forms-app/src/routes.json:67

**Observation:** Excerpt contains ` launchWorkspace(workspaceName, { `. In cited registries, packages/esm-patient-forms-app/src/routes.json:67 declares "name": "patient-html-form-entry-workspace", "component": "patientHtmlFormEntryWorkspace".

**Interpretation:** `launchWorkspace(workspaceName, ...)` in `launchHtmlFormEntry`, default `'patient-html-form-entry-workspace'` (:7, :95), opens workspace from packages/esm-patient-forms-app/src/routes.json:67; called by `launchFormEntryOrHtmlForms` (:34), used by chart at same points as previous row

### 92. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-immunizations-app/src/immunizations/immunizations-detailed-summary.component.tsx:67; packages/esm-patient-notes-app/src/notes/notes-main.component.tsx:36; packages/esm-patient-common-lib/src/form-entry-interop.ts:52; packages/esm-patient-common-lib/src/workspaces.ts:62

**Observation:** Excerpt contains ` const dispose = showModal('start-visit-dialog', { `. In cited registries, packages/esm-patient-chart-app/src/routes.json:214 declares "name": "start-visit-dialog", "component": "startVisitModal".

**Interpretation:** `showModal('start-visit-dialog', ...)` opens modal from packages/esm-patient-chart-app/src/routes.json:214. Called by other units at packages/esm-patient-immunizations-app/src/immunizations/immunizations-detailed-summary.component.tsx:67 and packages/esm-patient-notes-app/src/notes/notes-main.component.tsx:36, and own-library helpers (packages/esm-patient-common-lib/src/form-entry-interop.ts:52, packages/esm-patient-common-lib/src/workspaces.ts:62)

### 93. packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24; packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:36

**Observation:** Excerpt contains ` <ExtensionSlot name={slotName ?? title} state={{ basePath }} /> `.

**Interpretation:** `<ExtensionSlot name={slotName ?? title}>` mounts navigation group links with caller-supplied slot (packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:36); no snapshot `routes.json` fills slots. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 94. packages/esm-patient-common-lib/src/orders/store.ts:24; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:90; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:86-94; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38; packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:31

**Observation:** Excerpt contains ` export const orderBasketStore = createGlobalStore<OrderBasketStore>('order-basket', initialState); `. Helper `useOrderBasket` reads/writes store; consumers identified in 3.4.4 are orders and medications.

**Interpretation:** `createGlobalStore<OrderBasketStore>('order-basket', initialState)` defines global order basket store shared by name in framework. Read/written by orders and medications through `useOrderBasket` (packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:90), for example in packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx and packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx

### 95. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:39; packages/esm-patient-common-lib/src/workspaces.ts:44; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:38-41; packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:362; packages/esm-patient-orders-app/src/order-basket/general-order-type/orderable-concept-search/orderable-concept-search.workspace.tsx:51

**Observation:** Excerpt contains ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); `. Chart writes patient to store; medications and orders read it through consumers cited in review.

**Interpretation:** `createGlobalStore<PatientChartStore>('patient-chart-global-store', {})` (:8-10) defines current-patient global store. Written by chart unit (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:39), read by other units, for example packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx and packages/esm-patient-orders-app/src/order-basket/general-order-type/orderable-concept-search/orderable-concept-search.workspace.tsx, plus `useLaunchWorkspaceRequiringVisit` (packages/esm-patient-common-lib/src/workspaces.ts:44)

### 96. packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-chart-app/src/routes.json:218

**Observation:** Excerpt contains ` const dispose = showModal('visit-context-switcher', { `. In cited registries, packages/esm-patient-chart-app/src/routes.json:218 declares "name": "visit-context-switcher", "component": "visitContextSwitcherModal".

**Interpretation:** In `useLaunchWorkspaceRequiringVisit`, without active visit and with `rde`, `showModal('visit-context-switcher', ...)` opens modal from packages/esm-patient-chart-app/src/routes.json:218; `launchWorkspace(workspaceName)` at :52 and :58 open caller-named workspace recorded in calling-unit rows

### 97. packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94; packages/esm-patient-chart-app/src/routes.json:181

**Observation:** Excerpt contains ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. In cited registries, packages/esm-patient-chart-app/src/routes.json:181 declares "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretation:** `<ExtensionSlot name="visit-context-header-slot">` mounts extension registered by packages/esm-patient-chart-app/src/routes.json:181

### 98. packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-engine-app/src/routes.json:8-10; packages/esm-form-entry-app/src/routes.json:8-11

**Observation:** Excerpt contains ` {showForm && formInfo && patientUuid && patient && <ExtensionSlot name="form-widget-slot" state={state} />} `. In cited registries, packages/esm-form-engine-app/src/routes.json:8-10 declares "name": "react-form-engine-widget", "component": "formRenderer", "slot": "form-widget-slot"; packages/esm-form-entry-app/src/routes.json:8-11 declares "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretation:** `<ExtensionSlot name="form-widget-slot" state={state}>` mounts form engine from form-engine (packages/esm-form-engine-app/src/routes.json:8-10) and form-entry (packages/esm-form-entry-app/src/routes.json:8-11) units

### 99. packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12; packages/esm-patient-chart-app/src/routes.json:181

**Observation:** Excerpt contains ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. In cited registries, packages/esm-patient-chart-app/src/routes.json:181 declares "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretation:** `<ExtensionSlot name="visit-context-header-slot">` mounts extension from packages/esm-patient-chart-app/src/routes.json:181

### 100. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:44; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19

**Observation:** Excerpt contains ` window.addEventListener('message', callback); `.

**Interpretation:** `window.addEventListener('message', callback)` (:15-19) receives `'close-workspace'` from HFE-UI page embedded in iframe at :43, sending message because of `returnUrl=post-message:close-workspace` (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27, :44). Regex for `src-cross-unit-communication` does not catch `'message'`

### 101. packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `launchPatientWorkspace('order-basket')` in own workspace’s `onWorkspaceClose` reopens basket from packages/esm-patient-orders-app/src/routes.json:68

### 102. packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** Second point in same workspace: `launchPatientWorkspace('order-basket')` reopens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 103. packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213

**Observation:** Excerpt contains ` <ExtensionSlot name="medication-info-slot" state={{ order: orderBasketItem }} /> `.

**Interpretation:** `<ExtensionSlot name="medication-info-slot">`; no snapshot `routes.json` fills slot. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 104. packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `launchPatientWorkspace('order-basket')` on drug-search close opens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 105. packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `launchPatientWorkspace('order-basket')` after adding item opens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 106. packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` const launchOrderBasket = useLaunchWorkspaceRequiringVisit('order-basket'); `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('order-basket')` opens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 107. packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` closeWorkspace('order-basket', { `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `closeWorkspace('order-basket', ...)` closes workspace from packages/esm-patient-orders-app/src/routes.json:68 and in `onWorkspaceClose` opens own-unit `add-drug-order` (:57-63)

### 108. packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` closeWorkspace('order-basket', { `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** Second point (`openDrugForm`, :65-71): `closeWorkspace('order-basket', ...)` closes workspace from packages/esm-patient-orders-app/src/routes.json:68 before opening own-unit form

### 109. packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103-106; packages/esm-patient-orders-app/src/routes.json:15; packages/esm-patient-orders-app/src/routes.json:21

**Observation:** Excerpt contains ` <ExtensionSlot name="order-item-additional-info-slot" state={additionalInfoSlotState} className={styles.additionalInfoContainer} `. In cited registries, packages/esm-patient-orders-app/src/routes.json:15 declares "name": "order-price-details", "component": "orderPriceDetailsExtension", "slot": "order-item-additional-info-slot"; packages/esm-patient-orders-app/src/routes.json:21 declares "name": "order-stock-details", "component": "orderStockDetailsExtension", "slot": "order-item-additional-info-slot".

**Interpretation:** `<ExtensionSlot name="order-item-additional-info-slot">` (:103-104) mounts extensions from packages/esm-patient-orders-app/src/routes.json:15 and :21

### 110. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315; packages/esm-patient-attachments-app/src/routes.json:30

**Observation:** Excerpt contains ` const close = showModal('capture-photo-modal', { `. In cited registries, packages/esm-patient-attachments-app/src/routes.json:30 declares "name": "capture-photo-modal", "component": "capturePhotoModal".

**Interpretation:** `showModal('capture-photo-modal', ...)` opens modal from packages/esm-patient-attachments-app/src/routes.json:30

### 111. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497; packages/esm-patient-chart-app/src/routes.json:181

**Observation:** Excerpt contains ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. In cited registries, packages/esm-patient-chart-app/src/routes.json:181 declares "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretation:** `<ExtensionSlot name="visit-context-header-slot">` mounts extension from packages/esm-patient-chart-app/src/routes.json:181

### 112. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501; packages/esm-patient-chart-app/src/routes.json:114; packages/esm-patient-vitals-app/src/routes.json:65

**Observation:** Excerpt contains ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={memoizedState} /> `. In cited registries, packages/esm-patient-chart-app/src/routes.json:114 declares "name": "patient-details-tile", "slot": "visit-form-header-slot", "component": "patientDetailsTile"; packages/esm-patient-vitals-app/src/routes.json:65 declares "name": "weight-tile", "component": "weightTile", "slot": "visit-form-header-slot".

**Interpretation:** `<ExtensionSlot name="visit-form-header-slot">` mounts extensions from packages/esm-patient-chart-app/src/routes.json:114 and packages/esm-patient-vitals-app/src/routes.json:65

### 113. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120; packages/esm-patient-medications-app/src/routes.json:43

**Observation:** Excerpt contains ` const launchAddDrugOrder = useLaunchWorkspaceRequiringVisit('add-drug-order'); `. In cited registries, packages/esm-patient-medications-app/src/routes.json:43 declares "name": "add-drug-order", "component": "addDrugOrderWorkspace".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('add-drug-order')` opens workspace from packages/esm-patient-medications-app/src/routes.json:43

### 114. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121; packages/esm-patient-tests-app/src/routes.json:52

**Observation:** Excerpt contains ` const launchModifyLabOrder = useLaunchWorkspaceRequiringVisit('add-lab-order'); `. In cited registries, packages/esm-patient-tests-app/src/routes.json:52 declares "name": "add-lab-order", "component": "addLabOrderWorkspace".

**Interpretation:** `useLaunchWorkspaceRequiringVisit('add-lab-order')` opens workspace from packages/esm-patient-tests-app/src/routes.json:52

### 115. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534-537

**Observation:** Excerpt contains `` <ExtensionSlot name={`${matchingOrder.type}-action-menu-items-slot`} state={{ className: styles.menuItem, ``.

**Interpretation:** `` <ExtensionSlot name={`${matchingOrder.type}-action-menu-items-slot`}> `` (:534-535); name depends on order type/no snapshot `routes.json` fills slots with suffix. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 116. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561-564

**Observation:** Excerpt contains `` <ExtensionSlot name={`${matchingOrder.type}-detail-slot`} state={{ orderItem: matchingOrder, ``.

**Interpretation:** `` <ExtensionSlot name={`${matchingOrder.type}-detail-slot`}> `` (:561-562); no snapshot `routes.json` fills slots with suffix. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 117. packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169

**Observation:** Excerpt contains ` <ExtensionSlot name="top-of-lab-order-form-slot" state={{ order: initialOrder }} /> `.

**Interpretation:** `<ExtensionSlot name="top-of-lab-order-form-slot">`; no snapshot `routes.json` fills slot. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 118. packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57; packages/esm-patient-chart-app/src/routes.json:214

**Observation:** Excerpt contains ` const dispose = showModal('start-visit-dialog', { `. In cited registries, packages/esm-patient-chart-app/src/routes.json:214 declares "name": "start-visit-dialog", "component": "startVisitModal".

**Interpretation:** `showModal('start-visit-dialog', ...)` opens modal from packages/esm-patient-chart-app/src/routes.json:214

### 119. packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154; packages/esm-patient-chart-app/src/routes.json:181

**Observation:** Excerpt contains ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. In cited registries, packages/esm-patient-chart-app/src/routes.json:181 declares "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretation:** `<ExtensionSlot name="visit-context-header-slot">` mounts extension from packages/esm-patient-chart-app/src/routes.json:181

### 120. packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156-159; packages/esm-patient-medications-app/src/routes.json:37; packages/esm-patient-tests-app/src/routes.json:36

**Observation:** Excerpt contains ` <ExtensionSlot className={classNames(styles.orderBasketSlot, { [styles.orderBasketSlotTablet]: isTablet, })} `. In cited registries, packages/esm-patient-medications-app/src/routes.json:37 declares "name": "drug-order-panel", "component": "drugOrderPanel", "slot": "order-basket-slot"; packages/esm-patient-tests-app/src/routes.json:36 declares "name": "lab-order-panel", "component": "labOrderPanel", "slot": "order-basket-slot".

**Interpretation:** `<ExtensionSlot>` of `order-basket-slot` mounts panels from packages/esm-patient-medications-app/src/routes.json:37 and packages/esm-patient-tests-app/src/routes.json:36

### 121. packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `launchPatientWorkspace('order-basket')` in `onWorkspaceClose` reopens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 122. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `launchPatientWorkspace('order-basket')` after saving order opens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 123. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** Second form point: `launchPatientWorkspace('order-basket')` opens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 124. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193

**Observation:** Excerpt contains ` <ExtensionSlot name="top-of-lab-order-form-slot" state={{ order: initialOrder }} /> `.

**Interpretation:** `<ExtensionSlot name="top-of-lab-order-form-slot">`; no snapshot `routes.json` fills slot. Counterpart may belong to another external unit or point remain disconnected; both readings remain plausible.

### 125. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `launchPatientWorkspace('order-basket')` on search close opens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 126. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** Second search point: `launchPatientWorkspace('order-basket')` opens workspace from packages/esm-patient-orders-app/src/routes.json:68

### 127. packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68-71; packages/esm-patient-orders-app/src/routes.json:15; packages/esm-patient-orders-app/src/routes.json:21

**Observation:** Excerpt contains ` <ExtensionSlot name="order-item-additional-info-slot" state={additionalInfoSlotState} className={styles.additionalInfoContainer} `. In cited registries, packages/esm-patient-orders-app/src/routes.json:15 declares "name": "order-price-details", "component": "orderPriceDetailsExtension", "slot": "order-item-additional-info-slot"; packages/esm-patient-orders-app/src/routes.json:21 declares "name": "order-stock-details", "component": "orderStockDetailsExtension", "slot": "order-item-additional-info-slot".

**Interpretation:** `<ExtensionSlot name="order-item-additional-info-slot">` (:68-69) mounts extensions from packages/esm-patient-orders-app/src/routes.json:15 and :21

### 128. packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` closeWorkspace('order-basket', { `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** `closeWorkspace('order-basket', ...)` closes workspace from packages/esm-patient-orders-app/src/routes.json:68 and opens own-unit `add-lab-order` in `onWorkspaceClose` (:98-107)

### 129. packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Excerpt contains ` closeWorkspace('order-basket', { `. In cited registries, packages/esm-patient-orders-app/src/routes.json:68 declares "name": "order-basket", "component": "orderBasketWorkspace".

**Interpretation:** Second point (`openEditLabForm`, :109-120): `closeWorkspace('order-basket', ...)` closes workspace from packages/esm-patient-orders-app/src/routes.json:68

### 130. packages/esm-patient-vitals-app/src/utils.ts:16-19; packages/esm-patient-forms-app/src/routes.json:49; packages/esm-patient-vitals-app/src/config-schema.ts:51-53; packages/esm-patient-vitals-app/src/constants.ts:1; packages/esm-patient-vitals-app/src/routes.json:72; packages/esm-patient-vitals-app/src/vitals/vitals-overview.component.tsx:42; packages/esm-patient-vitals-app/src/biometrics/biometrics-base.component.tsx:33; packages/esm-patient-vitals-app/src/vitals-and-biometrics-header/vitals-header.component.tsx:48; packages/esm-patient-vitals-app/src/routes.json:29-30

**Observation:** Excerpt contains ` const launchVitalsAndBiometricsForm = useLaunchWorkspaceRequiringVisit( useFormEngine ? 'patient-form-entry-workspace' : patientVitalsBiometricsFormWorkspace, );  `. In cited registries, packages/esm-patient-forms-app/src/routes.json:49 declares "name": "patient-form-entry-workspace", "component": "patientFormEntryWorkspace"; packages/esm-patient-vitals-app/src/routes.json:72 declares "name": "patient-vitals-biometrics-form-workspace", "component": "vitalsBiometricsFormWorkspace"; packages/esm-patient-vitals-app/src/routes.json:29-30 declares "name": "patient-vitals-info", "component": "vitalsHeader", "slot": "patient-info-slot".

**Interpretation:** In `useLaunchVitalsAndBiometricsForm`, `useLaunchWorkspaceRequiringVisit(useFormEngine ? 'patient-form-entry-workspace' : patientVitalsBiometricsFormWorkspace)` (:16-18): with `config.vitals.useFormEngine` enabled opens workspace from packages/esm-patient-forms-app/src/routes.json:49; disabled (default `false`, packages/esm-patient-vitals-app/src/config-schema.ts:51-53), opens own-unit workspace (packages/esm-patient-vitals-app/src/constants.ts:1, packages/esm-patient-vitals-app/src/routes.json:72). Called in packages/esm-patient-vitals-app/src/vitals/vitals-overview.component.tsx:42, packages/esm-patient-vitals-app/src/biometrics/biometrics-base.component.tsx:33 and packages/esm-patient-vitals-app/src/vitals-and-biometrics-header/vitals-header.component.tsx:48 (`vitalsHeader`, packages/esm-patient-vitals-app/src/routes.json:29-30). See Notes

### 131. packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-252; packages/esm-form-engine-app/src/routes.json:8-10; packages/esm-form-entry-app/src/routes.json:8-11

**Observation:** Excerpt contains ` <ExtensionSlot name="form-widget-slot" state={{ view: 'form', `. In cited registries, packages/esm-form-engine-app/src/routes.json:8-10 declares "name": "react-form-engine-widget", "component": "formRenderer", "slot": "form-widget-slot"; packages/esm-form-entry-app/src/routes.json:8-11 declares "name": "form-widget", "component": "formWidget", "slot": "form-widget-slot".

**Interpretation:** `<ExtensionSlot name="form-widget-slot">` (:249-250) mounts form engine from packages/esm-form-engine-app/src/routes.json:8-10 and packages/esm-form-entry-app/src/routes.json:8-11

### 132. packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268; packages/esm-patient-chart-app/src/routes.json:181

**Observation:** Excerpt contains ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. In cited registries, packages/esm-patient-chart-app/src/routes.json:181 declares "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretation:** In loading branch (:265-268), `<ExtensionSlot name="visit-context-header-slot">` mounts extension from packages/esm-patient-chart-app/src/routes.json:181

### 133. packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300; packages/esm-patient-chart-app/src/routes.json:181

**Observation:** Excerpt contains ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> `. In cited registries, packages/esm-patient-chart-app/src/routes.json:181 declares "name": "visit-context-header", "slot": "visit-context-header-slot", "component": "visitContextHeader".

**Interpretation:** In main form branch (:298-300), `<ExtensionSlot name="visit-context-header-slot">` mounts extension from packages/esm-patient-chart-app/src/routes.json:181

### 134. .; package.json:5-7

**Observation:** Directory `.` has manifest `package.json`. Entry: —. Build: — (only `turbo run` in scripts and CI, no own build). Workspace: package.json:5-7 (root declaring `workspaces: ["packages/*"]`).

**Interpretation:** Workspace root without application entry; build orchestrated in packages.

### 135. packages/esm-form-engine-app; packages/esm-form-engine-app/package.json:7; packages/esm-form-engine-app/webpack.config.js:2; packages/esm-form-engine-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-form-engine-app` has manifest `packages/esm-form-engine-app/package.json`. Entry: packages/esm-form-engine-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-form-engine-app/webpack.config.js:2 (`openmrs/default-webpack-config`) + packages/esm-form-engine-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 136. packages/esm-form-entry-app; packages/esm-form-entry-app/angular.json:42; packages/esm-form-entry-app/webpack.config.js:48; packages/esm-form-entry-app/angular.json:26-27; packages/esm-form-entry-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-form-entry-app` has manifest `packages/esm-form-entry-app/package.json`. Entry: packages/esm-form-entry-app/angular.json:42 (`main: src/index.ts`); packages/esm-form-entry-app/webpack.config.js:48 (`entry`) and :75 (`exposes ./start`). Build: packages/esm-form-entry-app/angular.json:26-27 (target `build`, `ngx-build-plus:browser`) and :52 (`extraWebpackConfig: webpack.config.js`); packages/esm-form-entry-app/package.json:13 (`ng build --configuration production`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** Angular app with own entry (single-spa lifecycles in `src/bootstrap.ts`) and own Angular CLI + webpack build.

### 137. packages/esm-generic-patient-widgets-app; packages/esm-generic-patient-widgets-app/package.json:7; packages/esm-generic-patient-widgets-app/webpack.config.js:1; packages/esm-generic-patient-widgets-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-generic-patient-widgets-app` has manifest `packages/esm-generic-patient-widgets-app/package.json`. Entry: packages/esm-generic-patient-widgets-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-generic-patient-widgets-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-generic-patient-widgets-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 138. packages/esm-patient-allergies-app; packages/esm-patient-allergies-app/package.json:7; packages/esm-patient-allergies-app/webpack.config.js:1; packages/esm-patient-allergies-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-allergies-app` has manifest `packages/esm-patient-allergies-app/package.json`. Entry: packages/esm-patient-allergies-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-allergies-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-allergies-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 139. packages/esm-patient-attachments-app; packages/esm-patient-attachments-app/package.json:7; packages/esm-patient-attachments-app/webpack.config.js:1-3; packages/esm-patient-attachments-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-attachments-app` has manifest `packages/esm-patient-attachments-app/package.json`. Entry: packages/esm-patient-attachments-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-attachments-app/webpack.config.js:1-3 (`openmrs/default-webpack-config`) + packages/esm-patient-attachments-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 140. packages/esm-patient-banner-app; packages/esm-patient-banner-app/package.json:7; packages/esm-patient-banner-app/webpack.config.js:1; packages/esm-patient-banner-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-banner-app` has manifest `packages/esm-patient-banner-app/package.json`. Entry: packages/esm-patient-banner-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-banner-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-banner-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 141. packages/esm-patient-chart-app; packages/esm-patient-chart-app/package.json:7; packages/esm-patient-chart-app/webpack.config.js:1; packages/esm-patient-chart-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-chart-app` has manifest `packages/esm-patient-chart-app/package.json`. Entry: packages/esm-patient-chart-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-chart-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-chart-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 142. packages/esm-patient-common-lib; packages/esm-patient-common-lib/package.json:7; packages/esm-patient-common-lib/webpack.config.js:1; packages/esm-patient-common-lib/package.json:9-13; package.json:5-7

**Observation:** Directory `packages/esm-patient-common-lib` has manifest `packages/esm-patient-common-lib/package.json`. Entry: packages/esm-patient-common-lib/package.json:7 (`main: src/index.ts`, only component reexports). Build: packages/esm-patient-common-lib/webpack.config.js:1 (`openmrs/default-webpack-config`), without script `build` in packages/esm-patient-common-lib/package.json:9-13. Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** Shared library consumed by apps (`workspace:*`), without `routes.json` or build script.

### 143. packages/esm-patient-conditions-app; packages/esm-patient-conditions-app/package.json:7; packages/esm-patient-conditions-app/webpack.config.js:1; packages/esm-patient-conditions-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-conditions-app` has manifest `packages/esm-patient-conditions-app/package.json`. Entry: packages/esm-patient-conditions-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-conditions-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-conditions-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 144. packages/esm-patient-flags-app; packages/esm-patient-flags-app/package.json:7; packages/esm-patient-flags-app/webpack.config.js:1; packages/esm-patient-flags-app/package.json:12; package.json:5-7

**Observation:** Directory `packages/esm-patient-flags-app` has manifest `packages/esm-patient-flags-app/package.json`. Entry: packages/esm-patient-flags-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-flags-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-flags-app/package.json:12 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 145. packages/esm-patient-forms-app; packages/esm-patient-forms-app/package.json:7; packages/esm-patient-forms-app/webpack.config.js:1; packages/esm-patient-forms-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-forms-app` has manifest `packages/esm-patient-forms-app/package.json`. Entry: packages/esm-patient-forms-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-forms-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-forms-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 146. packages/esm-patient-immunizations-app; packages/esm-patient-immunizations-app/package.json:7; packages/esm-patient-immunizations-app/webpack.config.js:1; packages/esm-patient-immunizations-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-immunizations-app` has manifest `packages/esm-patient-immunizations-app/package.json`. Entry: packages/esm-patient-immunizations-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-immunizations-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-immunizations-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 147. packages/esm-patient-lists-app; packages/esm-patient-lists-app/package.json:7; packages/esm-patient-lists-app/webpack.config.js:1; packages/esm-patient-lists-app/package.json:12; package.json:5-7

**Observation:** Directory `packages/esm-patient-lists-app` has manifest `packages/esm-patient-lists-app/package.json`. Entry: packages/esm-patient-lists-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-lists-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-lists-app/package.json:12 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 148. packages/esm-patient-medications-app; packages/esm-patient-medications-app/package.json:7; packages/esm-patient-medications-app/webpack.config.js:1; packages/esm-patient-medications-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-medications-app` has manifest `packages/esm-patient-medications-app/package.json`. Entry: packages/esm-patient-medications-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-medications-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-medications-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 149. packages/esm-patient-notes-app; packages/esm-patient-notes-app/package.json:7; packages/esm-patient-notes-app/webpack.config.js:1; packages/esm-patient-notes-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-notes-app` has manifest `packages/esm-patient-notes-app/package.json`. Entry: packages/esm-patient-notes-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-notes-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-notes-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 150. packages/esm-patient-orders-app; packages/esm-patient-orders-app/package.json:7; packages/esm-patient-orders-app/webpack.config.js:1; packages/esm-patient-orders-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-orders-app` has manifest `packages/esm-patient-orders-app/package.json`. Entry: packages/esm-patient-orders-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-orders-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-orders-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 151. packages/esm-patient-programs-app; packages/esm-patient-programs-app/package.json:7; packages/esm-patient-programs-app/webpack.config.js:1; packages/esm-patient-programs-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-programs-app` has manifest `packages/esm-patient-programs-app/package.json`. Entry: packages/esm-patient-programs-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-programs-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-programs-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 152. packages/esm-patient-tests-app; packages/esm-patient-tests-app/package.json:7; packages/esm-patient-tests-app/webpack.config.js:1; packages/esm-patient-tests-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-tests-app` has manifest `packages/esm-patient-tests-app/package.json`. Entry: packages/esm-patient-tests-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-tests-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-tests-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 153. packages/esm-patient-vitals-app; packages/esm-patient-vitals-app/package.json:7; packages/esm-patient-vitals-app/webpack.config.js:1; packages/esm-patient-vitals-app/package.json:13; package.json:5-7

**Observation:** Directory `packages/esm-patient-vitals-app` has manifest `packages/esm-patient-vitals-app/package.json`. Entry: packages/esm-patient-vitals-app/package.json:7 (`main: src/index.ts`, React component lifecycles; `src/routes.json`). Build: packages/esm-patient-vitals-app/webpack.config.js:1 (`openmrs/default-webpack-config`) + packages/esm-patient-vitals-app/package.json:13 (`webpack --mode production --color`). Workspace: package.json:5-7 (`packages/*`).

**Interpretation:** ESM module with own entry exposing UI components and own webpack build.

### 154. packages/esm-form-entry-app/src/bootstrap.ts:21; packages/esm-form-entry-app/src/bootstrap.ts:22; packages/esm-form-entry-app/src/bootstrap.ts:23; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-entry-app/src/routes.json:9-11; packages/esm-form-entry-app/webpack.config.js:70-76; packages/esm-form-entry-app/src/index.ts:66; packages/esm-form-entry-app/src/bootstrap.ts:12-19; packages/esm-form-entry-app/src/bootstrap.ts:21-23; packages/esm-form-entry-app/webpack.config.js:74-76

**Observation:** Cited excerpts contain ` export const bootstrap = lifecycles.bootstrap; ` (packages/esm-form-entry-app/src/bootstrap.ts:21); ` export const mount = lifecycles.mount; ` (packages/esm-form-entry-app/src/bootstrap.ts:22); ` export const unmount = lifecycles.unmount; ` (packages/esm-form-entry-app/src/bootstrap.ts:23); ` import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular'; ` (packages/esm-form-entry-app/src/bootstrap.ts:3); ` const lifecycles = singleSpaAngular({ ` (packages/esm-form-entry-app/src/bootstrap.ts:12); ` {showForm && formInfo && patientUuid && patient && <ExtensionSlot name="form-widget-slot" state={state} />} ` (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95). Associated registries: packages/esm-form-entry-app/src/routes.json:9-11 (extension `form-widget`, component `formWidget`, in `form-widget-slot`); packages/esm-form-entry-app/webpack.config.js:70-76 (`ModuleFederationPlugin` with `name` from package.json and `exposes` `./start`).

**Interpretation:** Relationship 3.4.5 #1 is `host → remote`, from `packages/esm-patient-forms-app` to `packages/esm-form-entry-app`, mechanism `single-spa`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 155. packages/esm-form-entry-app/src/bootstrap.ts:21; packages/esm-form-entry-app/src/bootstrap.ts:22; packages/esm-form-entry-app/src/bootstrap.ts:23; packages/esm-form-entry-app/src/bootstrap.ts:3; packages/esm-form-entry-app/src/bootstrap.ts:12; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249; packages/esm-form-entry-app/src/routes.json:9-11; packages/esm-form-entry-app/webpack.config.js:70-76; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249-250

**Observation:** Cited excerpts contain ` export const bootstrap = lifecycles.bootstrap; ` (packages/esm-form-entry-app/src/bootstrap.ts:21); ` export const mount = lifecycles.mount; ` (packages/esm-form-entry-app/src/bootstrap.ts:22); ` export const unmount = lifecycles.unmount; ` (packages/esm-form-entry-app/src/bootstrap.ts:23); ` import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular'; ` (packages/esm-form-entry-app/src/bootstrap.ts:3); ` const lifecycles = singleSpaAngular({ ` (packages/esm-form-entry-app/src/bootstrap.ts:12); ` <ExtensionSlot name="form-widget-slot" state={{ view: 'form', ` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249). Associated registries: packages/esm-form-entry-app/src/routes.json:9-11 (extension `form-widget`, component `formWidget`, in `form-widget-slot`); packages/esm-form-entry-app/webpack.config.js:70-76 (`ModuleFederationPlugin` with `name` from package.json and `exposes` `./start`).

**Interpretation:** Relationship 3.4.5 #2 is `host → remote`, from `packages/esm-patient-vitals-app` to `packages/esm-form-entry-app`, mechanism `single-spa`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism. Branch depends on `config.vitals.useFormEngine`; Yes activity preserves 3.4 decision.

### 156. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-30

**Observation:** Cited excerpts contain ` <iframe ref={iframeRef} src={src} className={styles.wrapper} onLoad={onLoad}></iframe> ` (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43). `src` receives URL `${window.openmrsBase}/htmlformentryui/htmlform/${uiPage}.page?`, built in cited workspace.

**Interpretation:** Relationship 3.4.5 #3 is `page → embedded-frontend`, from `packages/esm-patient-forms-app` to `htmlformentryui`, mechanism `iframe`, direction `source → target`, In snapshot `No` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 157. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15; packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:14-20

**Observation:** Cited excerpts contain ` window.addEventListener('openmrs:form-view-embedded', handleFormEmbedded); ` (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15).

**Interpretation:** Relationship 3.4.5 #4 is `communication`, from `packages/esm-form-engine-app` to `openmrs:form-view-embedded`, mechanism `events`, direction `Undetermined`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 158. packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23; packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24; packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:22-25

**Observation:** Cited excerpts contain ` const FormCollapseToggleEvent = new CustomEvent('openmrs:form-collapse-toggle', { detail: { value } }); ` (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23); ` window.dispatchEvent(FormCollapseToggleEvent); ` (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24).

**Interpretation:** Relationship 3.4.5 #5 is `communication`, from `packages/esm-form-engine-app` to `openmrs:form-collapse-toggle`, mechanism `events`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 159. packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56; packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:47-60

**Observation:** Cited excerpts contain ` window.addEventListener('single-spa:routing-event', listenToRoutingEvent); ` (packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56).

**Interpretation:** Relationship 3.4.5 #6 is `communication`, from `packages/esm-patient-flags-app` to `single-spa`, mechanism `events`, direction `source → target`, In snapshot `No` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization. Recorded direction preserves researcher-decided 3.4.5 convention: message arrives from external target to local source.

### 160. packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20; packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42; packages/esm-patient-forms-app/src/routes.json:85; packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:14; packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:33; packages/esm-patient-common-lib/src/form-entry-interop.ts:5

**Observation:** Cited excerpts contain ` launchPatientWorkspace(clinicalFormsWorkspaceName); ` (packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20); ` !encounterUuid && openClinicalFormsWorkspaceOnFormClose && launchPatientWorkspace(clinicalFormsWorkspaceName); ` (packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42). Parameter `clinicalFormsWorkspaceName` has default value `clinicalFormsWorkspace` in packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:14 and packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:33; packages/esm-patient-common-lib/src/form-entry-interop.ts:5 declares `export const clinicalFormsWorkspace = 'clinical-forms-workspace';`. Associated registries: packages/esm-patient-forms-app/src/routes.json:85 (workspace `clinical-forms-workspace`).

**Interpretation:** Relationship 3.4.5 #7 is `host → remote`, from `packages/esm-form-engine-app` to `packages/esm-patient-forms-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 161. packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259; packages/esm-patient-chart-app/src/routes.json:210

**Observation:** Cited excerpts contain ` const dispose = showModal('modify-visit-date-dialog', { ` (packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259). Associated registries: packages/esm-patient-chart-app/src/routes.json:210 (modal `modify-visit-date-dialog`).

**Interpretation:** Relationship 3.4.5 #8 is `host → remote`, from `packages/esm-form-entry-app` to `packages/esm-patient-chart-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 162. packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113; packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:111-113; packages/esm-generic-patient-widgets-app/src/config-schema.ts:19-23

**Observation:** Cited excerpts contain ` <ExtensionSlot name={config.interpretationSlot} style={{ gridTemplateColumns: '1fr' }} /> ` (packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113).

**Interpretation:** Relationship 3.4.5 #9 is `host → remote`, from `packages/esm-generic-patient-widgets-app` to `config.interpretationSlot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 163. packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25; packages/esm-patient-common-lib/src/form-entry-interop.ts:70; packages/esm-patient-common-lib/src/form-entry-interop.ts:97; packages/esm-patient-forms-app/src/routes.json:49; packages/esm-patient-forms-app/src/routes.json:67; packages/esm-patient-forms-app/src/routes.json:85; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:242; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:287; packages/esm-patient-forms-app/src/forms/forms-dashboard.component.tsx:47

**Observation:** Cited excerpts contain ` launchPatientWorkspace('patient-form-entry-workspace', { ` (packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24); ` const launchClinicalFormsWorkspace = useLaunchWorkspaceRequiringVisit('clinical-forms-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25); ` launchWorkspace(formEntryWorkspaceName, { ` (packages/esm-patient-common-lib/src/form-entry-interop.ts:70); ` launchWorkspace(workspaceName, { ` (packages/esm-patient-common-lib/src/form-entry-interop.ts:97). Associated registries: packages/esm-patient-forms-app/src/routes.json:49 (workspace `patient-form-entry-workspace`); packages/esm-patient-forms-app/src/routes.json:67 (workspace `patient-html-form-entry-workspace`); packages/esm-patient-forms-app/src/routes.json:85 (workspace `clinical-forms-workspace`).

**Interpretation:** Relationship 3.4.5 #10 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-forms-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 164. packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124; packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29; packages/esm-patient-vitals-app/src/routes.json:53-58; packages/esm-patient-vitals-app/src/routes.json:9-11; packages/esm-patient-vitals-app/src/routes.json:34-36; packages/esm-patient-vitals-app/src/routes.json:18-20; packages/esm-patient-vitals-app/src/routes.json:43-45; packages/esm-patient-vitals-app/src/routes.json:29-31; packages/esm-patient-vitals-app/src/routes.json:63-65; packages/esm-patient-vitals-app/src/routes.json:72

**Observation:** Cited excerpts contain ` <ExtensionSlot className={styles.dataGridRow} name="visit-form-header-slot" state={memoizedPatientUuid} /> ` (packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124); ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` <ExtensionSlot name="patient-info-slot" state={state} /> ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69); ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={visitHeaderSlotState} ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410); ` const launchVitalsAndBiometricsFormWorkspace = useLaunchWorkspaceRequiringVisit( ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29). Associated registries: packages/esm-patient-vitals-app/src/routes.json:53-58 (`results-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-vitals-biometrics-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:9-11, :34-36 (widgets in `patient-chart-summary-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:18-20, :43-45 (widgets in `patient-chart-vitals-biometrics-dashboard-slot`); packages/esm-patient-vitals-app/src/routes.json:29-31 (`patient-vitals-info` in `patient-info-slot`); packages/esm-patient-vitals-app/src/routes.json:63-65 (`weight-tile` in `visit-form-header-slot`); packages/esm-patient-vitals-app/src/routes.json:72 (workspace `patient-vitals-biometrics-form-workspace`).

**Interpretation:** Relationship 3.4.5 #11 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-vitals-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 165. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23; packages/esm-patient-allergies-app/src/routes.json:24-31; packages/esm-patient-allergies-app/src/routes.json:17-19; packages/esm-patient-allergies-app/src/routes.json:42

**Observation:** Cited excerpts contain ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` const launchAllergiesFormWorkspace = useLaunchWorkspaceRequiringVisit('patient-allergy-form-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23). Associated registries: packages/esm-patient-allergies-app/src/routes.json:24-31 (`allergies-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-allergies-dashboard-slot`); packages/esm-patient-allergies-app/src/routes.json:17-19 (`allergies-details-widget` in dashboard slot); packages/esm-patient-allergies-app/src/routes.json:42 (workspace `patient-allergy-form-workspace`).

**Interpretation:** Relationship 3.4.5 #12 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-allergies-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 166. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-attachments-app/src/routes.json:13-17; packages/esm-patient-attachments-app/src/routes.json:8-10

**Observation:** Cited excerpts contain ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47). Associated registries: packages/esm-patient-attachments-app/src/routes.json:13-17 (`attachments-results-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-attachments-dashboard-slot`); packages/esm-patient-attachments-app/src/routes.json:8-10 (`attachments-overview-widget` in dashboard slot).

**Interpretation:** Relationship 3.4.5 #13 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-attachments-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 167. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26; packages/esm-patient-conditions-app/src/routes.json:26-31; packages/esm-patient-conditions-app/src/routes.json:9-10; packages/esm-patient-conditions-app/src/routes.json:18-19; packages/esm-patient-conditions-app/src/routes.json:46

**Observation:** Cited excerpts contain ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` const launchConditionsFormWorkspace = useLaunchWorkspaceRequiringVisit('conditions-form-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26). Associated registries: packages/esm-patient-conditions-app/src/routes.json:26-31 (`conditions-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-conditions-dashboard-slot`); packages/esm-patient-conditions-app/src/routes.json:9-10 (`conditions-overview-widget` in `patient-chart-summary-dashboard-slot`); packages/esm-patient-conditions-app/src/routes.json:18-19 (`conditions-details-widget` in dashboard slot); packages/esm-patient-conditions-app/src/routes.json:46 (workspace `conditions-form-workspace`).

**Interpretation:** Relationship 3.4.5 #14 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-conditions-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 168. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-immunizations-app/src/routes.json:18-22; packages/esm-patient-immunizations-app/src/routes.json:13-15; packages/esm-patient-immunizations-app/src/routes.json:13-22

**Observation:** Cited excerpts contain ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47). Associated registries: packages/esm-patient-immunizations-app/src/routes.json:18-22 (`immunization-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-immunizations-dashboard-slot`); packages/esm-patient-immunizations-app/src/routes.json:13-15 (`immunization-details-widget` in dashboard slot).

**Interpretation:** Relationship 3.4.5 #15 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-immunizations-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 169. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-medications-app/src/routes.json:25-30; packages/esm-patient-medications-app/src/routes.json:8-10; packages/esm-patient-medications-app/src/routes.json:16-18

**Observation:** Cited excerpts contain ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47). Associated registries: packages/esm-patient-medications-app/src/routes.json:25-30 (`medications-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-medications-dashboard-slot`); packages/esm-patient-medications-app/src/routes.json:8-10 (`medications-details-widget` in dashboard slot); packages/esm-patient-medications-app/src/routes.json:16-18 (`active-medications-widget` in `patient-chart-summary-dashboard-slot`).

**Interpretation:** Relationship 3.4.5 #16 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-medications-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 170. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27; packages/esm-patient-orders-app/src/routes.json:47-51; packages/esm-patient-orders-app/src/routes.json:58-60; packages/esm-patient-orders-app/src/routes.json:68

**Observation:** Cited excerpts contain ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` const launchOrderBasketFormWorkspace = useLaunchWorkspaceRequiringVisit('order-basket'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27). Associated registries: packages/esm-patient-orders-app/src/routes.json:47-51 (`patient-orders-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-orders-dashboard-slot`); packages/esm-patient-orders-app/src/routes.json:58-60 (`patient-orders-dashboard` in dashboard slot); packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`).

**Interpretation:** Relationship 3.4.5 #17 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-orders-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 171. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-programs-app/src/routes.json:22-26; packages/esm-patient-programs-app/src/routes.json:16-17; packages/esm-patient-programs-app/src/routes.json:16-26

**Observation:** Cited excerpts contain ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47). Associated registries: packages/esm-patient-programs-app/src/routes.json:22-26 (`programs-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-programs-dashboard-slot`); packages/esm-patient-programs-app/src/routes.json:16-17 (`programs-details-widget` in dashboard slot).

**Interpretation:** Relationship 3.4.5 #18 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-programs-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 172. packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13; packages/esm-patient-tests-app/src/routes.json:9-13; packages/esm-patient-tests-app/src/routes.json:26-29; packages/esm-patient-tests-app/src/routes.json:21-22

**Observation:** Cited excerpts contain ` const ungroupedDashboards = extensionStore.slots['patient-chart-dashboard-slot'].assignedExtensions.map((e) => ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37); ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` setLeftNav({ name: 'patient-chart-dashboard-slot', basePath: leftNavBasePath }); ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47); ` return <ExtensionSlot name="test-results-filtered-overview-slot" state={{ filter, patientUuid }} />; ` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13). Associated registries: packages/esm-patient-tests-app/src/routes.json:9-13 (`test-results-summary-dashboard` in `patient-chart-dashboard-slot`, dashboard `patient-chart-test-results-dashboard-slot`); packages/esm-patient-tests-app/src/routes.json:26-29 (`results-viewer` in dashboard slot); packages/esm-patient-tests-app/src/routes.json:21-22 (`test-results-filtered-overview` in `test-results-filtered-overview-slot`).

**Interpretation:** Relationship 3.4.5 #19 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-tests-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 173. packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66

**Observation:** Cited excerpts contain ` <ExtensionSlot state={state} name="top-of-all-patient-dashboards-slot" /> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66).

**Interpretation:** Relationship 3.4.5 #20 is `host → remote`, from `packages/esm-patient-chart-app` to `top-of-all-patient-dashboards-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 174. packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68; packages/esm-patient-flags-app/src/routes.json:26-27; packages/esm-patient-flags-app/src/routes.json:19-20

**Observation:** Cited excerpts contain ` <ExtensionSlot key={dashboard.slot} name={dashboard.slot} className={styles.dashboard}> ` (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69); ` <ExtensionSlot name="patient-highlights-bar-slot" state={state} /> ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68). Associated registries: packages/esm-patient-flags-app/src/routes.json:26-27 (`patient-flags-overview` in `patient-chart-summary-dashboard-slot`); packages/esm-patient-flags-app/src/routes.json:19-20 (`patient-flag-tags` in `patient-highlights-bar-slot`).

**Interpretation:** Relationship 3.4.5 #21 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-flags-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 175. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389; packages/esm-patient-banner-app/src/routes.json:22-23

**Observation:** Cited excerpts contain ` <ExtensionSlot name="patient-header-slot" state={state} /> ` (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67); ` <ExtensionSlot name="patient-header-slot" state={{ patient, ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389). Associated registries: packages/esm-patient-banner-app/src/routes.json:22-23 (`patient-banner` in `patient-header-slot`).

**Interpretation:** Relationship 3.4.5 #22 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-banner-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 176. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:451-456

**Observation:** Cited excerpts contain ` name="visit-form-top-slot" ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452).

**Interpretation:** Relationship 3.4.5 #23 is `host → remote`, from `packages/esm-patient-chart-app` to `visit-form-top-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 177. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547

**Observation:** Cited excerpts contain ` <ExtensionSlot state={{ patientUuid, setExtraVisitInfo }} name="extra-visit-attribute-slot" /> ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547).

**Interpretation:** Relationship 3.4.5 #24 is `host → remote`, from `packages/esm-patient-chart-app` to `extra-visit-attribute-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 178. packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562; packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:561-566

**Observation:** Cited excerpts contain ` name="visit-form-bottom-slot" ` (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562).

**Interpretation:** Relationship 3.4.5 #25 is `host → remote`, from `packages/esm-patient-chart-app` to `visit-form-bottom-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 179. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24

**Observation:** Cited excerpts contain ` const launchAppointmentsFormWorkspace = useLaunchWorkspaceRequiringVisit('appointments-form-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24).

**Interpretation:** Relationship 3.4.5 #26 is `host → remote`, from `packages/esm-patient-chart-app` to `appointments-form-workspace`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 180. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281; packages/esm-patient-notes-app/src/routes.json:25

**Observation:** Cited excerpts contain ` const launchVisitNotesFormWorkspace = useLaunchWorkspaceRequiringVisit('visit-notes-form-workspace'); ` (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28); ` launchWorkspace('visit-notes-form-workspace', { ` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236); ` launchWorkspace('visit-notes-form-workspace', { ` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281). Associated registries: packages/esm-patient-notes-app/src/routes.json:25 (workspace `visit-notes-form-workspace`).

**Interpretation:** Relationship 3.4.5 #27 is `host → remote`, from `packages/esm-patient-chart-app` to `packages/esm-patient-notes-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 181. packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159; packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:30

**Observation:** Cited excerpts contain ` <ExtensionSlot name={visitSummaryPanelSlot}> ` (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159).

**Interpretation:** Relationship 3.4.5 #28 is `host → remote`, from `packages/esm-patient-chart-app` to `visit-summary-panels`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 182. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94; packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12; packages/esm-patient-chart-app/src/routes.json:180-181; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-forms-app/src/forms/forms-dashboard.component.tsx:47; packages/esm-patient-common-lib/src/form-entry-interop.ts:52; packages/esm-patient-forms-app/src/clinical-form-action-button.component.tsx:15; packages/esm-patient-common-lib/src/workspaces.ts:62

**Observation:** Cited excerpts contain ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12). Associated registries: packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` in `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretation:** Relationship 3.4.5 #29 is `host → remote`, from `packages/esm-patient-forms-app` to `packages/esm-patient-chart-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 183. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-immunizations-app/src/immunizations/immunizations-detailed-summary.component.tsx:67

**Observation:** Cited excerpts contain ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4). Associated registries: packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`).

**Interpretation:** Relationship 3.4.5 #30 is `host → remote`, from `packages/esm-patient-immunizations-app` to `packages/esm-patient-chart-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 184. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-medications-app/src/active-medications/active-medications.component.tsx:19; packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71; packages/esm-patient-common-lib/src/workspaces.ts:62

**Observation:** Cited excerpts contain ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55). Associated registries: packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretation:** Relationship 3.4.5 #31 is `host → remote`, from `packages/esm-patient-medications-app` to `packages/esm-patient-chart-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 185. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497; packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501; packages/esm-patient-chart-app/src/routes.json:180-181; packages/esm-patient-chart-app/src/routes.json:113-114; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-notes-app/src/notes/notes-main.component.tsx:36; packages/esm-patient-notes-app/src/visit-note-action-button.extension.tsx:9

**Observation:** Cited excerpts contain ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497); ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={memoizedState} /> ` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501). Associated registries: packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` in `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:113-114 (`patient-details-tile` in `visit-form-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretation:** Relationship 3.4.5 #32 is `host → remote`, from `packages/esm-patient-notes-app` to `packages/esm-patient-chart-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 186. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154; packages/esm-patient-chart-app/src/routes.json:180-181; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-orders-app/src/order-basket-action-button/order-basket-action-button.extension.tsx:9

**Observation:** Cited excerpts contain ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55); ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154). Associated registries: packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` in `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretation:** Relationship 3.4.5 #33 is `host → remote`, from `packages/esm-patient-orders-app` to `packages/esm-patient-chart-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 187. packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4; packages/esm-patient-common-lib/src/workspaces.ts:55; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268; packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300; packages/esm-patient-chart-app/src/routes.json:180-181; packages/esm-patient-chart-app/src/routes.json:214; packages/esm-patient-chart-app/src/routes.json:218; packages/esm-patient-vitals-app/src/utils.ts:16

**Observation:** Cited excerpts contain ` const dispose = showModal('start-visit-dialog', { ` (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4); ` const dispose = showModal('visit-context-switcher', { ` (packages/esm-patient-common-lib/src/workspaces.ts:55); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268); ` <ExtensionSlot name="visit-context-header-slot" state={{ patientUuid }} /> ` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300). Associated registries: packages/esm-patient-chart-app/src/routes.json:180-181 (`visit-context-header` in `visit-context-header-slot`); packages/esm-patient-chart-app/src/routes.json:214 (modal `start-visit-dialog`); packages/esm-patient-chart-app/src/routes.json:218 (modal `visit-context-switcher`).

**Interpretation:** Relationship 3.4.5 #34 is `host → remote`, from `packages/esm-patient-vitals-app` to `packages/esm-patient-chart-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 188. packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24; packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:36-38; packages/esm-patient-chart-app/src/side-nav/generic-nav-group.component.tsx:11-14

**Observation:** Cited excerpts contain ` <ExtensionSlot name={slotName ?? title} state={{ basePath }} /> ` (packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24).

**Interpretation:** Relationship 3.4.5 #35 is `host → remote`, from `packages/esm-patient-chart-app` to `slotName ?? title`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 189. packages/esm-patient-common-lib/src/orders/store.ts:24; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:86-94; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19; packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:31; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:106; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-60

**Observation:** Cited excerpts contain ` export const orderBasketStore = createGlobalStore<OrderBasketStore>('order-basket', initialState); ` (packages/esm-patient-common-lib/src/orders/store.ts:24). `packages/esm-patient-medications-app` and `packages/esm-patient-orders-app` read and modify `order-basket` through `useOrderBasket`; basket reads and clears orders while other unit maintains group key.

**Interpretation:** Relationship 3.4.5 #36 is `communication`, from `packages/esm-patient-medications-app` to `packages/esm-patient-orders-app`, mechanism `events`, direction `bidirectional`, In snapshot `Yes` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization.

### 190. packages/esm-patient-common-lib/src/orders/store.ts:24; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:60; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:188

**Observation:** Cited excerpts contain ` export const orderBasketStore = createGlobalStore<OrderBasketStore>('order-basket', initialState); ` (packages/esm-patient-common-lib/src/orders/store.ts:24). `packages/esm-patient-orders-app` and `packages/esm-patient-tests-app` read and modify `order-basket` through `useOrderBasket`; basket reads and clears orders while other unit maintains group key.

**Interpretation:** Relationship 3.4.5 #37 is `communication`, from `packages/esm-patient-orders-app` to `packages/esm-patient-tests-app`, mechanism `events`, direction `bidirectional`, In snapshot `Yes` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization.

### 191. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-common-lib/src/store/patient-chart-store.ts:8-10; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:38-41; packages/esm-patient-common-lib/src/workspaces.ts:44

**Observation:** Cited excerpts contain ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). Chart writes current patient; `packages/esm-patient-forms-app` reads state through consumers indicated in review 3.4.5 #38.

**Interpretation:** Relationship 3.4.5 #38 is `communication`, from `packages/esm-patient-chart-app` to `packages/esm-patient-forms-app`, mechanism `events`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization.

### 192. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:362; packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:116; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:38

**Observation:** Cited excerpts contain ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). Chart writes current patient; `packages/esm-patient-medications-app` reads state through consumers indicated in review 3.4.5 #39.

**Interpretation:** Relationship 3.4.5 #39 is `communication`, from `packages/esm-patient-chart-app` to `packages/esm-patient-medications-app`, mechanism `events`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization.

### 193. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-notes-app/src/visit-note-action-button.extension.tsx:9; packages/esm-patient-common-lib/src/workspaces.ts:44

**Observation:** Cited excerpts contain ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). Chart writes current patient; `packages/esm-patient-notes-app` reads state through consumers indicated in review 3.4.5 #40.

**Interpretation:** Relationship 3.4.5 #40 is `communication`, from `packages/esm-patient-chart-app` to `packages/esm-patient-notes-app`, mechanism `events`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization.

### 194. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-orders-app/src/order-basket/general-order-type/orderable-concept-search/orderable-concept-search.workspace.tsx:51

**Observation:** Cited excerpts contain ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). Chart writes current patient; `packages/esm-patient-orders-app` reads state through consumers indicated in review 3.4.5 #41.

**Interpretation:** Relationship 3.4.5 #41 is `communication`, from `packages/esm-patient-chart-app` to `packages/esm-patient-orders-app`, mechanism `events`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization.

### 195. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:46; packages/esm-patient-tests-app/src/test-results/individual-results-table/individual-results-table.component.tsx:56

**Observation:** Cited excerpts contain ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). Chart writes current patient; `packages/esm-patient-tests-app` reads state through consumers indicated in review 3.4.5 #42.

**Interpretation:** Relationship 3.4.5 #42 is `communication`, from `packages/esm-patient-chart-app` to `packages/esm-patient-tests-app`, mechanism `events`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization.

### 196. packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10; packages/esm-patient-vitals-app/src/components/action-menu/vitals-biometrics-action-menu.component.tsx:15; packages/esm-patient-vitals-app/src/utils.ts:16

**Observation:** Cited excerpts contain ` const patientChartStore = createGlobalStore<PatientChartStore>(patientChartStoreName, {}); ` (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10). Chart writes current patient; `packages/esm-patient-vitals-app` reads state through consumers indicated in review 3.4.5 #43.

**Interpretation:** Relationship 3.4.5 #43 is `communication`, from `packages/esm-patient-chart-app` to `packages/esm-patient-vitals-app`, mechanism `events`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization.

### 197. packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95; packages/esm-form-engine-app/src/routes.json:8-10

**Observation:** Cited excerpts contain ` {showForm && formInfo && patientUuid && patient && <ExtensionSlot name="form-widget-slot" state={state} />} ` (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95). Associated registries: packages/esm-form-engine-app/src/routes.json:8-10 (extension `react-form-engine-widget`, component `formRenderer`, in `form-widget-slot`).

**Interpretation:** Relationship 3.4.5 #44 is `host → remote`, from `packages/esm-patient-forms-app` to `packages/esm-form-engine-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 198. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:44

**Observation:** Cited excerpts contain ` window.addEventListener('message', callback); ` (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17). Callback checks `event.data` equal to `close-workspace` and closes workspace; iframe URL includes `returnUrl=post-message:close-workspace`.

**Interpretation:** Relationship 3.4.5 #45 is `communication`, from `packages/esm-patient-forms-app` to `htmlformentryui`, mechanism `events`, direction `source → target`, In snapshot `No` and Active `Yes`. Excerpts link units through reactive state or messages per final relationship; exchange alone does not establish mounting organization. Recorded direction preserves researcher-decided 3.4.5 convention: message arrives from external target to local source.

### 199. packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37; packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71; packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25; packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149; packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66; packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103; packages/esm-patient-orders-app/src/routes.json:68; packages/esm-patient-orders-app/src/routes.json:12-21

**Observation:** Cited excerpts contain ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149); ` const launchOrderBasket = useLaunchWorkspaceRequiringVisit('order-basket'); ` (packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71); ` closeWorkspace('order-basket', { ` (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58); ` closeWorkspace('order-basket', { ` (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66); ` <ExtensionSlot name="order-item-additional-info-slot" state={additionalInfoSlotState} className={styles.additionalInfoContainer} ` (packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103). Associated registries: packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`); packages/esm-patient-orders-app/src/routes.json:12-21 (`order-price-details` and `order-stock-details` in `order-item-additional-info-slot`).

**Interpretation:** Relationship 3.4.5 #46 is `host → remote`, from `packages/esm-patient-medications-app` to `packages/esm-patient-orders-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 200. packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213

**Observation:** Cited excerpts contain ` <ExtensionSlot name="medication-info-slot" state={{ order: orderBasketItem }} /> ` (packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213).

**Interpretation:** Relationship 3.4.5 #47 is `host → remote`, from `packages/esm-patient-medications-app` to `medication-info-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 201. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315; packages/esm-patient-attachments-app/src/routes.json:30

**Observation:** Cited excerpts contain ` const close = showModal('capture-photo-modal', { ` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315). Associated registries: packages/esm-patient-attachments-app/src/routes.json:30 (modal `capture-photo-modal`).

**Interpretation:** Relationship 3.4.5 #48 is `host → remote`, from `packages/esm-patient-notes-app` to `packages/esm-patient-attachments-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 202. packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501; packages/esm-patient-vitals-app/src/routes.json:63-65

**Observation:** Cited excerpts contain ` <ExtensionSlot name="visit-form-header-slot" className={styles.dataGridRow} state={memoizedState} /> ` (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501). Associated registries: packages/esm-patient-vitals-app/src/routes.json:63-65 (`weight-tile` in `visit-form-header-slot`).

**Interpretation:** Relationship 3.4.5 #49 is `host → remote`, from `packages/esm-patient-notes-app` to `packages/esm-patient-vitals-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 203. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156; packages/esm-patient-medications-app/src/routes.json:43; packages/esm-patient-medications-app/src/routes.json:35-37

**Observation:** Cited excerpts contain ` const launchAddDrugOrder = useLaunchWorkspaceRequiringVisit('add-drug-order'); ` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120); ` <ExtensionSlot className={classNames(styles.orderBasketSlot, { [styles.orderBasketSlotTablet]: isTablet, })} ` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156). Associated registries: packages/esm-patient-medications-app/src/routes.json:43 (workspace `add-drug-order`); packages/esm-patient-medications-app/src/routes.json:35-37 (`drug-order-panel` in `order-basket-slot`).

**Interpretation:** Relationship 3.4.5 #50 is `host → remote`, from `packages/esm-patient-orders-app` to `packages/esm-patient-medications-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 204. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156; packages/esm-patient-tests-app/src/routes.json:52; packages/esm-patient-tests-app/src/routes.json:34-36

**Observation:** Cited excerpts contain ` const launchModifyLabOrder = useLaunchWorkspaceRequiringVisit('add-lab-order'); ` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121); ` <ExtensionSlot className={classNames(styles.orderBasketSlot, { [styles.orderBasketSlotTablet]: isTablet, })} ` (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156). Associated registries: packages/esm-patient-tests-app/src/routes.json:52 (workspace `add-lab-order`); packages/esm-patient-tests-app/src/routes.json:34-36 (`lab-order-panel` in `order-basket-slot`).

**Interpretation:** Relationship 3.4.5 #51 is `host → remote`, from `packages/esm-patient-orders-app` to `packages/esm-patient-tests-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 205. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534; packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534-535

**Observation:** Cited excerpts contain `` <ExtensionSlot name={`${matchingOrder.type}-action-menu-items-slot`} state={{ className: styles.menuItem, `` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534).

**Interpretation:** Relationship 3.4.5 #52 is `host → remote`, from `packages/esm-patient-orders-app` to `${matchingOrder.type}-action-menu-items-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 206. packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561; packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561-562

**Observation:** Cited excerpts contain `` <ExtensionSlot name={`${matchingOrder.type}-detail-slot`} state={{ orderItem: matchingOrder, `` (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561).

**Interpretation:** Relationship 3.4.5 #53 is `host → remote`, from `packages/esm-patient-orders-app` to `${matchingOrder.type}-detail-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 207. packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169

**Observation:** Cited excerpts contain ` <ExtensionSlot name="top-of-lab-order-form-slot" state={{ order: initialOrder }} /> ` (packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169).

**Interpretation:** Relationship 3.4.5 #54 is `host → remote`, from `packages/esm-patient-orders-app` to `top-of-lab-order-form-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 208. packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99; packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111; packages/esm-patient-orders-app/src/routes.json:68; packages/esm-patient-orders-app/src/routes.json:12-21

**Observation:** Cited excerpts contain ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54); ` onWorkspaceClose: () => launchPatientWorkspace('order-basket'), ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208); ` <ExtensionSlot name="order-item-additional-info-slot" state={additionalInfoSlotState} className={styles.additionalInfoContainer} ` (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68); ` closeWorkspace('order-basket', { ` (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99); ` closeWorkspace('order-basket', { ` (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111). Associated registries: packages/esm-patient-orders-app/src/routes.json:68 (workspace `order-basket`); packages/esm-patient-orders-app/src/routes.json:12-21 (`order-price-details` and `order-stock-details` in `order-item-additional-info-slot`).

**Interpretation:** Relationship 3.4.5 #55 is `host → remote`, from `packages/esm-patient-tests-app` to `packages/esm-patient-orders-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism.

### 209. packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193

**Observation:** Cited excerpts contain ` <ExtensionSlot name="top-of-lab-order-form-slot" state={{ order: initialOrder }} /> ` (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193).

**Interpretation:** Relationship 3.4.5 #56 is `host → remote`, from `packages/esm-patient-tests-app` to `top-of-lab-order-form-slot`, mechanism `other`, direction `source → target`, In snapshot `Undetermined` and Active `Undetermined`. Target may be supplied by another external unit or remain disconnected; snapshot cannot decide.

### 210. packages/esm-patient-vitals-app/src/utils.ts:16; packages/esm-patient-forms-app/src/routes.json:49; packages/esm-patient-vitals-app/src/utils.ts:14-18

**Observation:** Cited excerpts contain ` const launchVitalsAndBiometricsForm = useLaunchWorkspaceRequiringVisit( ` (packages/esm-patient-vitals-app/src/utils.ts:16). Associated registries: packages/esm-patient-forms-app/src/routes.json:49 (workspace `patient-form-entry-workspace`).

**Interpretation:** Relationship 3.4.5 #57 is `host → remote`, from `packages/esm-patient-vitals-app` to `packages/esm-patient-forms-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism. Branch depends on `config.vitals.useFormEngine`; Yes activity preserves 3.4 decision.

### 211. packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249; packages/esm-form-engine-app/src/routes.json:8-10

**Observation:** Cited excerpts contain ` <ExtensionSlot name="form-widget-slot" state={{ view: 'form', ` (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249). Associated registries: packages/esm-form-engine-app/src/routes.json:8-10 (extension `react-form-engine-widget`, component `formRenderer`, in `form-widget-slot`).

**Interpretation:** Relationship 3.4.5 #58 is `host → remote`, from `packages/esm-patient-vitals-app` to `packages/esm-form-engine-app`, mechanism `other`, direction `source → target`, In snapshot `Yes` and Active `Yes`. Consumer names or mounts target contribution through recorded mechanism. Branch depends on `config.vitals.useFormEngine`; Yes activity preserves 3.4 decision.

### 212. packages/esm-form-engine-app/package.json:13; packages/esm-form-engine-app/webpack.config.js:2; packages/esm-form-engine-app/package.json:2-3; packages/esm-form-engine-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-form-engine-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-form-engine-app` declares artifacts: packages/esm-form-engine-app/package.json:13 (`webpack --mode production`); packages/esm-form-engine-app/webpack.config.js:2 (`openmrs/default-webpack-config`); packages/esm-form-engine-app/package.json:2-3, :6 (name `@openmrs/esm-form-engine-app`, version `10.2.0`, bundle `dist/openmrs-esm-form-engine-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-form-engine-app` in `https://registry.npmjs.org` (packages/esm-form-engine-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 213. packages/esm-form-entry-app/package.json:13; packages/esm-form-entry-app/angular.json:27; packages/esm-form-entry-app/angular.json:40; packages/esm-form-entry-app/angular.json:52; packages/esm-form-entry-app/webpack.config.js:70-76; packages/esm-form-entry-app/package.json:2-3; packages/esm-form-entry-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-form-entry-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-form-entry-app` declares artifacts: packages/esm-form-entry-app/package.json:13 (`ng build --configuration production`); packages/esm-form-entry-app/angular.json:27, :40, :52 (builder `ngx-build-plus:browser`, output `dist`, webpack extra); packages/esm-form-entry-app/webpack.config.js:70-76 (container `ModuleFederationPlugin` with `exposes ./start`); packages/esm-form-entry-app/package.json:2-3, :6 (name `@openmrs/esm-form-entry-app`, version `10.2.0`, bundle `dist/openmrs-esm-form-entry-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-form-entry-app` in `https://registry.npmjs.org` (packages/esm-form-entry-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 214. packages/esm-generic-patient-widgets-app/package.json:13; packages/esm-generic-patient-widgets-app/webpack.config.js:1; packages/esm-generic-patient-widgets-app/package.json:2-3; packages/esm-generic-patient-widgets-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-generic-patient-widgets-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-generic-patient-widgets-app` declares artifacts: packages/esm-generic-patient-widgets-app/package.json:13 (`webpack --mode production`); packages/esm-generic-patient-widgets-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-generic-patient-widgets-app/package.json:2-3, :6 (name `@openmrs/esm-generic-patient-widgets-app`, version `10.2.0`, bundle `dist/openmrs-esm-generic-patient-widgets-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-generic-patient-widgets-app` in `https://registry.npmjs.org` (packages/esm-generic-patient-widgets-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 215. packages/esm-patient-allergies-app/package.json:13; packages/esm-patient-allergies-app/webpack.config.js:1; packages/esm-patient-allergies-app/package.json:2-3; packages/esm-patient-allergies-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-allergies-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-allergies-app` declares artifacts: packages/esm-patient-allergies-app/package.json:13 (`webpack --mode production`); packages/esm-patient-allergies-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-allergies-app/package.json:2-3, :6 (name `@openmrs/esm-patient-allergies-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-allergies-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-allergies-app` in `https://registry.npmjs.org` (packages/esm-patient-allergies-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 216. packages/esm-patient-attachments-app/package.json:13; packages/esm-patient-attachments-app/webpack.config.js:1-3; packages/esm-patient-attachments-app/package.json:2-3; packages/esm-patient-attachments-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-attachments-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-attachments-app` declares artifacts: packages/esm-patient-attachments-app/package.json:13 (`webpack --mode production`); packages/esm-patient-attachments-app/webpack.config.js:1-3 (`openmrs/default-webpack-config`); packages/esm-patient-attachments-app/package.json:2-3, :6 (name `@openmrs/esm-patient-attachments-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-attachments-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-attachments-app` in `https://registry.npmjs.org` (packages/esm-patient-attachments-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 217. packages/esm-patient-banner-app/package.json:13; packages/esm-patient-banner-app/webpack.config.js:1; packages/esm-patient-banner-app/package.json:2-3; packages/esm-patient-banner-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-banner-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-banner-app` declares artifacts: packages/esm-patient-banner-app/package.json:13 (`webpack --mode production`); packages/esm-patient-banner-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-banner-app/package.json:2-3, :6 (name `@openmrs/esm-patient-banner-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-banner-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-banner-app` in `https://registry.npmjs.org` (packages/esm-patient-banner-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 218. packages/esm-patient-chart-app/package.json:13; packages/esm-patient-chart-app/webpack.config.js:1; packages/esm-patient-chart-app/package.json:2-3; packages/esm-patient-chart-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-chart-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-chart-app` declares artifacts: packages/esm-patient-chart-app/package.json:13 (`webpack --mode production`); packages/esm-patient-chart-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-chart-app/package.json:2-3, :6 (name `@openmrs/esm-patient-chart-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-chart-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-chart-app` in `https://registry.npmjs.org` (packages/esm-patient-chart-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 219. packages/esm-patient-conditions-app/package.json:13; packages/esm-patient-conditions-app/webpack.config.js:1; packages/esm-patient-conditions-app/package.json:2-3; packages/esm-patient-conditions-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-conditions-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-conditions-app` declares artifacts: packages/esm-patient-conditions-app/package.json:13 (`webpack --mode production`); packages/esm-patient-conditions-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-conditions-app/package.json:2-3, :6 (name `@openmrs/esm-patient-conditions-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-conditions-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-conditions-app` in `https://registry.npmjs.org` (packages/esm-patient-conditions-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 220. packages/esm-patient-flags-app/package.json:12; packages/esm-patient-flags-app/webpack.config.js:1; packages/esm-patient-flags-app/package.json:2-3; packages/esm-patient-flags-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-flags-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-flags-app` declares artifacts: packages/esm-patient-flags-app/package.json:12 (`webpack --mode production`); packages/esm-patient-flags-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-flags-app/package.json:2-3, :6 (name `@openmrs/esm-patient-flags-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-flags-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-flags-app` in `https://registry.npmjs.org` (packages/esm-patient-flags-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 221. packages/esm-patient-forms-app/package.json:13; packages/esm-patient-forms-app/webpack.config.js:1; packages/esm-patient-forms-app/package.json:2-3; packages/esm-patient-forms-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-forms-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-forms-app` declares artifacts: packages/esm-patient-forms-app/package.json:13 (`webpack --mode production`); packages/esm-patient-forms-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-forms-app/package.json:2-3, :6 (name `@openmrs/esm-patient-forms-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-forms-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-forms-app` in `https://registry.npmjs.org` (packages/esm-patient-forms-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 222. packages/esm-patient-immunizations-app/package.json:13; packages/esm-patient-immunizations-app/webpack.config.js:1; packages/esm-patient-immunizations-app/package.json:2-3; packages/esm-patient-immunizations-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-immunizations-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-immunizations-app` declares artifacts: packages/esm-patient-immunizations-app/package.json:13 (`webpack --mode production`); packages/esm-patient-immunizations-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-immunizations-app/package.json:2-3, :6 (name `@openmrs/esm-patient-immunizations-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-immunizations-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-immunizations-app` in `https://registry.npmjs.org` (packages/esm-patient-immunizations-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 223. packages/esm-patient-lists-app/package.json:12; packages/esm-patient-lists-app/webpack.config.js:1; packages/esm-patient-lists-app/package.json:2-3; packages/esm-patient-lists-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-lists-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-lists-app` declares artifacts: packages/esm-patient-lists-app/package.json:12 (`webpack --mode production`); packages/esm-patient-lists-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-lists-app/package.json:2-3, :6 (name `@openmrs/esm-patient-lists-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-lists-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-lists-app` in `https://registry.npmjs.org` (packages/esm-patient-lists-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 224. packages/esm-patient-medications-app/package.json:13; packages/esm-patient-medications-app/webpack.config.js:1; packages/esm-patient-medications-app/package.json:2-3; packages/esm-patient-medications-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-medications-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-medications-app` declares artifacts: packages/esm-patient-medications-app/package.json:13 (`webpack --mode production`); packages/esm-patient-medications-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-medications-app/package.json:2-3, :6 (name `@openmrs/esm-patient-medications-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-medications-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-medications-app` in `https://registry.npmjs.org` (packages/esm-patient-medications-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 225. packages/esm-patient-notes-app/package.json:13; packages/esm-patient-notes-app/webpack.config.js:1; packages/esm-patient-notes-app/package.json:2-3; packages/esm-patient-notes-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-notes-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-notes-app` declares artifacts: packages/esm-patient-notes-app/package.json:13 (`webpack --mode production`); packages/esm-patient-notes-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-notes-app/package.json:2-3, :6 (name `@openmrs/esm-patient-notes-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-notes-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-notes-app` in `https://registry.npmjs.org` (packages/esm-patient-notes-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 226. packages/esm-patient-orders-app/package.json:13; packages/esm-patient-orders-app/webpack.config.js:1; packages/esm-patient-orders-app/package.json:2-3; packages/esm-patient-orders-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-orders-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-orders-app` declares artifacts: packages/esm-patient-orders-app/package.json:13 (`webpack --mode production`); packages/esm-patient-orders-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-orders-app/package.json:2-3, :6 (name `@openmrs/esm-patient-orders-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-orders-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-orders-app` in `https://registry.npmjs.org` (packages/esm-patient-orders-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 227. packages/esm-patient-programs-app/package.json:13; packages/esm-patient-programs-app/webpack.config.js:1; packages/esm-patient-programs-app/package.json:2-3; packages/esm-patient-programs-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-programs-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-programs-app` declares artifacts: packages/esm-patient-programs-app/package.json:13 (`webpack --mode production`); packages/esm-patient-programs-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-programs-app/package.json:2-3, :6 (name `@openmrs/esm-patient-programs-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-programs-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-programs-app` in `https://registry.npmjs.org` (packages/esm-patient-programs-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 228. packages/esm-patient-tests-app/package.json:13; packages/esm-patient-tests-app/webpack.config.js:1; packages/esm-patient-tests-app/package.json:2-3; packages/esm-patient-tests-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-tests-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-tests-app` declares artifacts: packages/esm-patient-tests-app/package.json:13 (`webpack --mode production`); packages/esm-patient-tests-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-tests-app/package.json:2-3, :6 (name `@openmrs/esm-patient-tests-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-tests-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-tests-app` in `https://registry.npmjs.org` (packages/esm-patient-tests-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 229. packages/esm-patient-vitals-app/package.json:13; packages/esm-patient-vitals-app/webpack.config.js:1; packages/esm-patient-vitals-app/package.json:2-3; packages/esm-patient-vitals-app/package.json:6; package.json:10; .github/workflows/ci.yml:161-162; packages/esm-patient-vitals-app/package.json:2; .github/workflows/ci.yml:139

**Observation:** Application `packages/esm-patient-vitals-app` declares artifacts: packages/esm-patient-vitals-app/package.json:13 (`webpack --mode production`); packages/esm-patient-vitals-app/webpack.config.js:1 (`openmrs/default-webpack-config`); packages/esm-patient-vitals-app/package.json:2-3, :6 (name `@openmrs/esm-patient-vitals-app`, version `10.2.0`, bundle `dist/openmrs-esm-patient-vitals-app.js`); package.json:10 (`npm publish` for each workspace); .github/workflows/ci.yml:161-162 (publication on release). Publication: npm package `@openmrs/esm-patient-vitals-app` in `https://registry.npmjs.org` (packages/esm-patient-vitals-app/package.json:2; .github/workflows/ci.yml:139, :161-162).

**Interpretation:** Build `separate` and deployment `separate` delimit own unit bundle/npm package. Recorded versioning `Yes`; version 10.2.0/publication coordinated in monorepo release. Joint e2e test image does not define production deployment.

### 230. README.md:7-21; packages/esm-patient-allergies-app/README.md:3; packages/esm-patient-allergies-app/package.json:5; packages/esm-patient-attachments-app/README.md:3; packages/esm-patient-attachments-app/package.json:5; packages/esm-patient-conditions-app/README.md:3; packages/esm-patient-conditions-app/package.json:5; packages/esm-patient-forms-app/README.md:3; packages/esm-patient-forms-app/package.json:5; packages/esm-patient-immunizations-app/README.md:3; packages/esm-patient-immunizations-app/package.json:5; packages/esm-patient-medications-app/README.md:3; packages/esm-patient-medications-app/package.json:5; packages/esm-patient-notes-app/README.md:3; packages/esm-patient-notes-app/package.json:5; packages/esm-patient-banner-app/README.md:3; packages/esm-patient-banner-app/package.json:5; packages/esm-patient-chart-app/README.md:3; packages/esm-patient-chart-app/package.json:5; packages/esm-patient-programs-app/README.md:3; packages/esm-patient-programs-app/package.json:5; packages/esm-patient-tests-app/README.md:3; packages/esm-patient-tests-app/package.json:5; packages/esm-patient-vitals-app/README.md:3; packages/esm-patient-vitals-app/package.json:5

**Observation:** Text states: "It contains various microfrontends that constitute widgets in a patient dashboard".

**Interpretation:** Group description confirmed by units/extension registries. List identifies allergies, attachments, conditions, forms, immunizations, medications, notes, banner, chart, programs, tests and vitals; individual README/manifest descriptions listed in heading repeat roles without extra rows. Biometrics separated below because differently corroborated. List does not intend to enumerate current 18 apps.

### 231. README.md:11; packages/esm-patient-vitals-app/README.md:3

**Observation:** Text states: "Biometrics".

**Interpretation:** Item asserts widget with own package: points to packages/esm-patient-biometrics-app/README.md. Directory absent in snapshot. Biometrics a vitals feature rather than separate unit (packages/esm-patient-vitals-app/README.md:3).

### 232. README.md:23-26; packages/esm-patient-common-lib/src/index.ts:1-23; packages/esm-patient-common-lib/package.json:9-13; packages/esm-patient-common-lib/README.md:3

**Observation:** Text states: "two other microfrontends exist that encapsulate cross-cutting concerns".

**Interpretation:** Sentence calls Common lib and Patient chart two microfrontends. Chart frontend unit, common-lib reexport library without routes.json/own build. Cross-cutting role exists; counting it as microfrontend contradicts artifacts. packages/esm-patient-common-lib/README.md:3 itself describes library.

### 233. README.md:32; package.json:5-7; package.json:87

**Observation:** Text states: "This monorepo uses yarn".

**Interpretation:** Workspaces packages/* and packageManager yarn@4.9.1 corroborate monorepo/tool.

### 234. README.md:46; package.json:9; packages/esm-patient-allergies-app/package.json:10-11

**Observation:** Text states: "a dev server running `esm-patient-chart` as well as the specified microfrontend".

**Interpretation:** Root script fixes chart as source/allows forwarding arguments to openmrs develop. Server/additional --sources processing belong to external tooling absent in snapshot; local configuration confirms intent rather than entire described execution.

### 235. README.md:50; packages/esm-patient-vitals-app/package.json:10-11; README.md:53

**Observation:** Text states: "run the biometrics and vitals microfrontends simultaneously".

**Interpretation:** Sentence claims two units can compose simultaneous environment; README.md:53 example uses nonexistent esm-patient-biometrics-app directory. Vitals has own server but Biometrics no package. Distinct property from simple existence in earlier Biometrics claim.

### 236. README.md:56; packages/esm-patient-allergies-app/package.json:11; packages/esm-form-entry-app/package.json:11

**Observation:** Text states: "run `yarn serve` from within the individual packages and then use import map overrides".

**Interpretation:** Per-app serve scripts observable. No snapshot import map/override implementation; delegated to external shell/tooling. Sentence does not claim modules mount isolated page.

### 237. README.md:145; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-banner-app/src/routes.json:22-24

**Observation:** Text states: "The patient header contains the patient banner".

**Interpretation:** Chart mounts patient-header-slot/banner registers patientBanner there. Screen position/notifications visual details without new architectural claims.

### 238. README.md:149; packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69-78; README.md:135-153

**Observation:** Text states: "A dashboard is a collection of widgets".

**Interpretation:** DashboardView mounts dashboard slot/renders each extension. README.md:135-153 layout description contextualizes composition; menu, colors/screen occupation no extra boundaries.

### 239. e2e/support/github/run-e2e-docker-env.sh:7; e2e/support/github/run-e2e-docker-env.sh:8

**Observation:** Text states: "get a list of all the apps in this workspace".

**Interpretation:** Comment promises all apps but filter explicitly excludes form-entry-app. List contains other 17 apps without library. Set intended for e2e environment rather than new product count.

### 240. e2e/support/github/run-e2e-docker-env.sh:26-28; e2e/support/github/run-e2e-docker-env.sh:29-38

**Observation:** Text states: "prepending the login app and primary navigation apps".

**Interpretation:** Comment describes image module assembly. Actually prepended object contains esm-primary-navigation-app/esm-home-app, not login. Local packaged files mapped to /app as comment continues; login divergence makes sentence contradicted.

### 241. packages/esm-form-entry-app/README.md:3; packages/esm-form-entry-app/src/bootstrap.ts:12-23; packages/esm-form-entry-app/src/routes.json:8-13; packages/esm-form-entry-app/package.json:5

**Observation:** Text states: "It's essentially a wrapper around an Angular application".

**Interpretation:** Widget exposes Angular application through singleSpaAngular lifecycles/form-widget-slot consumed by forms/vitals. Description field in packages/esm-form-entry-app/package.json:5 repeats Angular identity. JSON-to-form transformation/internal engine behavior receive no own rows.

### 242. packages/esm-generic-patient-widgets-app/README.md:3; packages/esm-generic-patient-widgets-app/src/routes.json:6-15; packages/esm-generic-patient-widgets-app/src/config-schema.ts:3-23; packages/esm-generic-patient-widgets-app/package.json:5

**Observation:** Text states: "a generic widget that can be added to the patient chart using configuration".

**Interpretation:** Module offers switchableObs extension without fixed slot, with configuration schema. Supports possible configuration assignment; future-reuse intent no evidence of multiple consumers. Description field in packages/esm-generic-patient-widgets-app/package.json:5 repeats generic widget role.

### 243. packages/esm-patient-chart-app/README.md:3; packages/esm-patient-chart-app/src/root.component.tsx:11-16; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47-92; packages/esm-patient-chart-app/src/index.ts:33-42; README.md:23-26; packages/esm-patient-chart-app/package.json:5

**Observation:** Text states: "provides the underlying framework on top of which all the individual widgets are run".

**Interpretation:** Chart provides chart layout, routing, workspace/extension points; role distinct from external OpenMRS shell loading bundles. Local routing chooses summary/dashboards; startupApp installs offline sync/cacheable routes. README.md:23-26 and packages/esm-patient-chart-app/package.json:5 reiterate chart role. Visits, menus/offline mode are same-sentence unit capabilities rather than other units.

### 244. packages/esm-patient-chart-app/src/index.ts:27-28; packages/esm-patient-chart-app/src/index.ts:7-8; packages/esm-patient-chart-app/src/index.ts:29; packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:3

**Observation:** Text states: "allows @openmrs/esm-patient-common-lib to be accessed by modules that are not using webpack. This is used for ngx-formentry.".

**Interpretation:** Window assignment makes library available. Angular app imports @openmrs/ngx-formentry, but no snapshot _openmrs_esm_patient_common_lib consumer beyond assignment. Availability confirmed; alleged consumption/consumer’s non-webpack property undemonstrated.

### 245. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:28-31; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:4; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:32-36

**Observation:** Text states: "Anything used outside the patient chart [...] must be updated in the callback, which is called when the patient chart unmounts".

**Interpretation:** Comment claims current-visit state used outside chart by patient-search Active Visit Tag/must update on unmount callback. Local side proven: setCurrentVisit imported from framework (:4 of same artifact), useEffect cleanup calls setCurrentVisit(null, null) (:32-36). Patient-search Active Visit Tag consumer undemonstrated in snapshot; local cleanup proves no alleged sharing with external unit. Hence partial claim.

### 246. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:15

**Observation:** Text states: "used not in the refapp, but in other distributions".

**Interpretation:** Component/workspace calls present at lines 17-30 of same artifact, but distribution manifests confirming usage/exclusion absent. Existence does not confirm effective other-distribution usage.

### 247. packages/esm-patient-common-lib/README.md:3; packages/esm-patient-allergies-app/src/index.ts:10; packages/esm-patient-chart-app/src/index.ts:7-8; packages/esm-patient-common-lib/src/index.ts:1-23; packages/esm-patient-common-lib/package.json:5

**Observation:** Text states: "components and utilities shared across widgets in the patient chart".

**Interpretation:** Actual consumers in at least two units, beyond available package: allergies uses createDashboardLink/chart imports library/same helper. Reexports include cards, empty-state, error-state, pagination/workspaces. Description in packages/esm-patient-common-lib/package.json:5 repeats library purpose.

### 248. packages/esm-patient-common-lib/src/orders/store.ts:4-7; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-40; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:71-78

**Observation:** Text states: "different parts of the application may manage their own order lists".

**Interpretation:** Store indexes items by patient/group. Medications uses medications group, orders reads ungrouped set. Comment in packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:71-78 details same claim without duplication. Documents inter-unit state sharing.

### 249. packages/esm-patient-flags-app/README.md:3; packages/esm-patient-flags-app/src/routes.json:25-30; packages/esm-patient-flags-app/package.json:5; packages/esm-patient-flags-app/src/routes.json:40; packages/esm-patient-flags-app/README.md:7

**Observation:** Text states: "Flags are displayed in the Patient Summary".

**Interpretation:** Module role/integration in chart summary supported by recorded composition relationship. packages/esm-patient-flags-app/package.json:5 repeats module existence; description in packages/esm-patient-flags-app/src/routes.json:40 repeats summary integration; API hook described in packages/esm-patient-flags-app/README.md:7 internal behavior rather than another claim.

### 250. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:14; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19

**Observation:** Text states: "listen for a message from HFE-UI to close the workspace".

**Interpretation:** Receiver checks event.data equal to close-workspace/calls closure. Explicit communication contract although external sending page absent.

### 251. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:21; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:22-43

**Observation:** Text states: "hide the headers and breadcrumbs of the O2 page on load".

**Interpretation:** Comment identifies embedded O2 page integration: iframe receives src/onLoad removes header, patient-header, breadcrumbs. Visual removal alone would not warrant row; here identifies adaptation of external frontend unit within workspace.

### 252. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19

**Observation:** Text states: "tells HFE-UI to send a message to the parent window to close the workspace when the form is saved or cancelled".

**Interpretation:** URL points to htmlformentryui/includes returnUrl=post-message:close-workspace with matching receiver. Save/cancel emission belongs to external page absent in snapshot, so only local contract side corroborated. Distinct from receiver claim by subject/verifiable property.

### 253. packages/esm-patient-lists-app/README.md:3-8; packages/esm-patient-lists-app/src/routes.json:13-29; packages/esm-patient-lists-app/package.json:5

**Observation:** Text states: "The Patient Lists app renders a workspace in the Patient Chart".

**Interpretation:** Module declares patient-lists/patient-list-details workspaces. Chart-restricted role distinct from home management app absent in snapshot; no observed integration claimed with external app. Description in packages/esm-patient-lists-app/package.json:5 repeats local role.

### 254. packages/esm-patient-orders-app/package.json:5; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38; packages/esm-patient-orders-app/README.md:3-4

**Observation:** Text states: "Microfrontend for the OpenMRS SPA providing the order basket for the patient chart".

**Interpretation:** Orders own frontend unit/aggregates basket orders. Text in packages/esm-patient-orders-app/README.md:3-4 describes order-access business function while description makes microfrontend role explicit. Relationships 50 and 51 document medications/tests composition.

### 255. b50eb9b3 2021-08-08 (packages/esm-form-entry-app/package.json); 3d1e771d 2023-05-22 (packages/esm-form-entry-app/webpack.config.js)

**Observation:** Historical point concerns `@angular-extensions/elements` declared unused in `packages/esm-form-entry-app`. Table records `inconclusive` and commits: b50eb9b3 2021-08-08 Moved form entry.

**Interpretation:** Manifest log starts at b50eb9b3 (2021-08-08, “Moved form entry”), but blob absent. Message of 3d1e771d (2023-05-22, “(fix) Setup `esm-form-entry` to use webpack module federation (PR 1168)”) announces wrapper configuration; that stage’s webpack also unreadable. No confirmed earlier elements usage, replacement or abandonment.

### 256. b50eb9b3 2021-08-08 (packages/esm-form-entry-app/package.json); 3d1e771d 2023-05-22 (packages/esm-form-entry-app/webpack.config.js)

**Observation:** Historical point concerns `systemjs-webpack-interop` declared unused in `packages/esm-form-entry-app`. Table records `inconclusive` and commits: b50eb9b3 2021-08-08 Moved form entry; 3d1e771d 2023-05-22 (fix) Setup `esm-form-entry` to use webpack module federation (PR 1168).

**Interpretation:** Manifest blob at b50eb9b3/webpack blob at 3d1e771d absent. Module Federation announcement demonstrates neither fate of systemjs-webpack-interop nor removed call. Snapshot unused declaration historically unexplained.

### 257. 28f77b89 2021-03-04 (packages/esm-patient-chart-app/package.json; packages/esm-patient-chart-app/src/index.ts)

**Observation:** Historical point concerns `single-spa` declared unused in `packages/esm-patient-chart-app`. Table records `inconclusive` and commits: 28f77b89 2021-03-04 Migrated to monorepo.

**Interpretation:** Chart manifest/entry log reaches 28f77b89 (2021-03-04, “Migrated to monorepo”); both stage contents absent. Cannot distinguish retained peer contract for external tooling from removed import. Current framework-based usage proves no past direct package usage.

### 258. 28f77b89 2021-03-04 (packages/esm-patient-chart-app/package.json; packages/esm-patient-chart-app/src/index.ts)

**Observation:** Historical point concerns `single-spa-react` declared unused in `packages/esm-patient-chart-app`. Table records `inconclusive` and commits: 28f77b89 2021-03-04 Migrated to monorepo.

**Interpretation:** Same manifest/entry gap at 28f77b89 prevents checking direct single-spa-react usage before framework delegation observable in snapshot. No intent/usage removal inferred from declared dependency.

### 259. ddb858ef 2021-04-27 (packages/esm-patient-common-lib/package.json)

**Observation:** Historical point concerns `single-spa` declared unused in `packages/esm-patient-common-lib`. Table records `inconclusive` and commits: ddb858ef 2021-04-27 Common lib (PR 228).

**Interpretation:** Library manifest log reaches ddb858ef (2021-04-27, “Common lib (PR 228)”), but blob absent. Message gives no single-spa role. No basis for earlier usage/abandonment claim.

### 260. ef475921 2024-04-29 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx)

**Observation:** Historical point concerns Sender of `openmrs:form-view-embedded` unidentified. Table records `inconclusive` and commits: ef475921 2024-04-29 (feat) O3-3112: Add form collapse toggle to the `esm-form-engine-app` (PR 1814).

**Interpretation:** Message of ef475921 announces toggle addition; commit content absent. Log later records dc7b090e (2024-06-05, “(fix) Change the form collapse toggle color on tablet (PR 1857)”) without message identifying event sender. No sending unit identified/abandonment proven. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 261. ef475921 2024-04-29 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx)

**Observation:** Historical point concerns Receiver of `openmrs:form-collapse-toggle` unidentified. Table records `inconclusive` and commits: ef475921 2024-04-29 (feat) O3-3112: Add form collapse toggle to the `esm-form-engine-app` (PR 1814).

**Interpretation:** Same file contains second-event send. Content at ef475921 unavailable. Knowing when toggle appears identifies no external listener/demonstrates no disconnected channel. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 262. 6af19736 2022-11-17 (packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx)

**Observation:** Historical point concerns `config.interpretationSlot` without identified extension. Table records `inconclusive` and commits: 6af19736 2022-11-17 Possibility to add an ExtensionSlot under graph (PR 848).

**Interpretation:** Message of 6af19736 announces ExtensionSlot under graph, but content/first current-path content (dddc1457) absent. Snapshot empty default (config-schema.ts:19-23) explains local rendering condition without identifying external configuration/earlier usage. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 263. 8a8f19cb 2022-09-08 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx)

**Observation:** Historical point concerns `top-of-all-patient-dashboards-slot` without provider. Table records `inconclusive` and commits: 8a8f19cb 2022-09-08 fix: Adjust `top-of-all-patient-dashboard-slot` appears before dashboard title (PR 800).

**Interpretation:** Message of 8a8f19cb announces dashboard-slot position adjustment without demonstrating filling unit. Initial current-path content in e20f1c9a absent. Cannot conclude whether slot lost consumer or remains external extension point. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 264. 164cd3f8 2025-01-09 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx)

**Observation:** Historical point concerns `visit-form-top-slot` without provider. Table records `inconclusive` and commits: 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (PR 2169).

**Interpretation:** Current-path log starts at 164cd3f8, blob absent. File changes insufficient to date specific slot/show removed provider. Earlier path before possible reorganizations unreconstructed. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 265. 164cd3f8 2025-01-09 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx)

**Observation:** Historical point concerns `extra-visit-attribute-slot` without provider. Table records `inconclusive` and commits: 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (PR 2169).

**Interpretation:** Unavailable content at 164cd3f8 prevents comparing slot with stage. Current call without local registration demonstrates no abandonment; file change log identifies no consumers. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 266. 164cd3f8 2025-01-09 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx)

**Observation:** Historical point concerns `visit-form-bottom-slot` without provider. Table records `inconclusive` and commits: 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (PR 2169).

**Interpretation:** Same content limit at 164cd3f8 prevents establishing history of second form extension point. No target unit inferred through proximity to other slots. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 267. 71a16388 2024-03-05 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx)

**Observation:** Historical point concerns `appointments-form-workspace` and unconfirmed external-distribution usage. Table records `inconclusive` and commits: 71a16388 2024-03-05 O3-2857 Add visit actions extension in visits (PR 1692).

**Interpretation:** Content at 71a16388 absent. Message announces visit actions without identifying appointments registration/other-distribution manifests. Snapshot button/external-distribution comment (active-visit-buttons.tsx:15) prove neither external integration nor abandonment. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 268. 57a6db1b 2023-07-24 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx)

**Observation:** Historical point concerns `visit-summary-panels` without provider. Table records `inconclusive` and commits: 57a6db1b 2023-07-24 (feat) Add an extension slot for additional visit summary items (PR 1286).

**Interpretation:** Message of 57a6db1b announces additional summary-item slot; change content uninspected. First consulted path blob at 9970d8a5 absent. Message resolves neither slot provider nor removed consumer. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 269. 449a6faa 2022-03-09 (packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx)

**Observation:** Historical point concerns `slotName ?? title` without identified provider. Table records `inconclusive` and commits: 449a6faa 2022-03-09 (feat) O3-1108  Left nav should support groupings (PR 595).

**Interpretation:** Log reaches 449a6faa, message announcing navigation groups. Stage blob absent; cannot determine current expression introduction/group-configuring units. Helper existence proves no external connection. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 270. a371ea27 2024-05-13 (packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx)

**Observation:** Historical point concerns `medication-info-slot` without provider. Table records `inconclusive` and commits: a371ea27 2024-05-13 (feat) O3 3128: Add extension slots to lab and drug order forms (PR 1818).

**Interpretation:** Message of a371ea27 announces order-form slots. Initial consulted content at 64389b35 absent; announced commit content unread. Message identifies no providing extensions/proves no abandonment. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 271. 24cd98cc 2025-04-24 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx)

**Observation:** Historical point concerns `${matchingOrder.type}-action-menu-items-slot` without provider. Table records `inconclusive` and commits: 24cd98cc 2025-04-24 (fix) O3-4419: Fix order type filtering in order details table (PR 2385).

**Interpretation:** Content of 24cd98cc readable/already contains dynamic slot; current-path log only that commit through snapshot. Establishes presence at path/later stability, not original introduction: file may come from other path. Consumer unidentified. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 272. 24cd98cc 2025-04-24 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx)

**Observation:** Historical point concerns `${matchingOrder.type}-detail-slot` without provider. Table records `inconclusive` and commits: 24cd98cc 2025-04-24 (fix) O3-4419: Fix order type filtering in order details table (PR 2385).

**Interpretation:** Same 24cd98cc content already contains second dynamic slot/no later path change in log. Does not show whether external extension filled it or disconnected. File stability distinct from clarified usage. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 273. 14c1f1ff 2024-12-06 (packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx; packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx)

**Observation:** Historical point concerns `top-of-lab-order-form-slot` without provider in both forms. Table records `inconclusive` and commits: 14c1f1ff 2024-12-06 (feat) O3-4223: Allow adding different order types in the order basket (PR 2109).

**Interpretation:** Both current paths appear in log at 14c1f1ff, message announcing different basket order types; both blobs absent. Same uncertainty grouped because forms mount same slot. Proves no slot introduction, removed provider or abandonment. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 274. e87b8ace 2023-11-08 (README.md; packages/esm-patient-biometrics-app; packages/esm-patient-vitals-app); README.md:11; README.md:50-53

**Observation:** Historical point concerns README retains Biometrics as separate app/example of Vitals composition. Table records `clarified` and commits: e87b8ace 2023-11-08 BREAKING: Merge vitals and biometrics apps (PR 1429).

**Interpretation:** Name-status of e87b8ace confirms removal of esm-patient-biometrics-app README, manifest, entry and routes.json with biometric-file additions in vitals. Supports inter-stage change announced by merge message without moved-content identity assertion, since old blobs unread. Commit README absent, but snapshot still points to removed directory/uses it in development command (README.md:11, :50-53). Divergence concerns earlier-existing unit; original examples undated.

### 275. ddb858ef 2021-04-27 (packages/esm-patient-common-lib/package.json); 04e7221e 2021-07-28 (README.md)

**Observation:** Historical point concerns README calls Common lib microfrontend. Table records `inconclusive` and commits: ddb858ef 2021-04-27 Common lib (PR 228); 04e7221e 2021-07-28 Rewrite the README, removing most of it (PR 311).

**Interpretation:** Snapshot resolves current library role, not origin of microfrontend-list inclusion. Message of ddb858ef announces Common lib/04e7221e README rewrite. Library manifest/README blobs absent, preventing checking other earlier organization versus always-imprecise phrase.

### 276. 04e7221e 2021-07-28 (README.md)

**Observation:** Historical point concerns Joint execution through `openmrs develop` only partly observable. Table records `inconclusive` and commits: 04e7221e 2021-07-28 Rewrite the README, removing most of it (PR 311).

**Interpretation:** Snapshot shows script/documentation but --sources-executing tooling external. Old consulted README at 04e7221e absent; log supplies neither external implementation nor eventual contract change. Corpus limitation not evidence of abandonment. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 277. 04e7221e 2021-07-28 (README.md)

**Observation:** Historical point concerns Import map overrides documented without local implementation. Table records `inconclusive` and commits: 04e7221e 2021-07-28 Rewrite the README, removing most of it (PR 311).

**Interpretation:** Serve scripts present; overrides belong to README-described external environment. Old content at 04e7221e unavailable. Documentation/file log show neither whether external shell retains feature nor removed local configuration. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 278. ac9ae85e 2024-06-26 (e2e/support/github/run-e2e-docker-env.sh)

**Observation:** Historical point concerns E2e comment promises all apps but excludes form-entry. Table records `clarified` and commits: ac9ae85e 2024-06-26 (chore) O3-3372: Use React Form Engine in E2E Tests (PR 1859).

**Interpretation:** Read script at ac9ae85e already contains “all the apps” comment/filter excluding form-entry-app. No later path change in log through snapshot. Message announces React Form Engine in tests. Comment/exclusion therefore provably coexist since stage; divergence cannot be attributed to later change. Initial 07069195 content absent, so first divergence occurrence undated.

### 279. ac9ae85e 2024-06-26 (e2e/support/github/run-e2e-docker-env.sh)

**Observation:** Historical point concerns E2e comment announces login but prepends home/navigation. Table records `clarified` and commits: ac9ae85e 2024-06-26 (chore) O3-3372: Use React Form Engine in E2E Tests (PR 1859).

**Interpretation:** Same ac9ae85e script already has login comment/object only prepending esm-primary-navigation-app and esm-home-app. File unchanged through snapshot. Divergence coexisted then without reconstructable origin: 07069195 script absent. Does not claim login never mounted in other stage/external shell.

### 280. 93fcb73a 2023-10-25 (packages/esm-patient-chart-app/src/index.ts)

**Observation:** Historical point concerns Unconfirmed external consumption of window-exposed library. Table records `inconclusive` and commits: 93fcb73a 2023-10-25 (feat) Supporting O3-2510: Expose patient-common-lib on window (PR 1430).

**Interpretation:** Message of 93fcb73a announces patient-common-lib exposure on window but src/index.ts absent. Snapshot confirms assignment/ngx-formentry import without global consumer. Message proves neither alleged consumption, duration nor abandonment. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 281. e20f1c9a 2022-03-07 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx)

**Observation:** Historical point concerns Unconfirmed current-visit sharing with external patient search. Table records `inconclusive` and commits: e20f1c9a 2022-03-07 (refactor) esm-patient-chart to organize by functionality; eslint ts files (PR 594).

**Interpretation:** Initial consulted component content at e20f1c9a absent. Snapshot shows setCurrentVisit cleanup, not comment-cited external Active Visit Tag. Local log cannot verify consumer/decide whether comment describes current integration or earlier stage. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

### 282. 30f4782c 2024-08-26 (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx)

**Observation:** Historical point concerns External HFE-UI would send message on save/cancel. Table records `inconclusive` and commits: 30f4782c 2024-08-26 (feat) O3-3799: Open HTML Form Entry Forms within Form Workspace (PR 1963).

**Interpretation:** Message of 30f4782c announces HTML forms opened in workspace; stage content absent. URL/local receiver present, HFE-UI sender external. Neither historically confirmed save/cancel emission nor inferred contract abandonment. Connection to external unit and remaining without counterpart continue as plausible snapshot alternatives.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:27) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-chart-app/src/index.ts:1-6 |
| 2 | 3.4.2 (package.json:75) | 1 technology | manifest | — | context | weak | declares turbo.json:3-11 |
| 3 | 3.4.2 (packages/esm-form-engine-app/package.json:46) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-form-engine-app/src/index.ts:1 |
| 4 | 3.4.2 (packages/esm-form-entry-app/package.json:38) | 1 technology | manifest | web-components | technological | weak | — |
| 5 | 3.4.2 (packages/esm-form-entry-app/package.json:59) | 1 technology | manifest | single-spa | technological | weak | declares #53; declares #48 |
| 6 | 3.4.2 (packages/esm-form-entry-app/package.json:61) | 1 technology | manifest | import-maps | technological | weak | — |
| 7 | 3.4.2 (packages/esm-form-entry-app/package.json:68) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-form-entry-app/src/index.ts:3 |
| 8 | 3.4.2 (packages/esm-form-entry-app/package.json:69) | 1 technology | manifest | single-spa | technological | weak | declares #29 |
| 9 | 3.4.2 (packages/esm-generic-patient-widgets-app/package.json:45) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-generic-patient-widgets-app/src/index.ts:1 |
| 10 | 3.4.2 (packages/esm-patient-allergies-app/package.json:44) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-allergies-app/src/index.ts:1-9 |
| 11 | 3.4.2 (packages/esm-patient-attachments-app/package.json:49) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-attachments-app/src/index.ts:2 |
| 12 | 3.4.2 (packages/esm-patient-banner-app/package.json:45) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-banner-app/src/index.ts:1-7 |
| 13 | 3.4.2 (packages/esm-patient-chart-app/package.json:45) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-chart-app/src/index.ts:1-6 |
| 14 | 3.4.2 (packages/esm-patient-chart-app/package.json:53) | 1 technology | manifest | single-spa | technological | weak | — |
| 15 | 3.4.2 (packages/esm-patient-chart-app/package.json:54) | 1 technology | manifest | single-spa | technological | weak | — |
| 16 | 3.4.2 (packages/esm-patient-common-lib/package.json:37) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:1 |
| 17 | 3.4.2 (packages/esm-patient-common-lib/package.json:39) | 1 technology | manifest | single-spa | technological | weak | — |
| 18 | 3.4.2 (packages/esm-patient-conditions-app/package.json:45) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-conditions-app/src/index.ts:1 |
| 19 | 3.4.2 (packages/esm-patient-flags-app/package.json:43) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-flags-app/src/index.ts:1 |
| 20 | 3.4.2 (packages/esm-patient-forms-app/package.json:46) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-forms-app/src/index.ts:1-7 |
| 21 | 3.4.2 (packages/esm-patient-immunizations-app/package.json:47) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-immunizations-app/src/index.ts:1 |
| 22 | 3.4.2 (packages/esm-patient-lists-app/package.json:43) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-lists-app/src/index.ts:1 |
| 23 | 3.4.2 (packages/esm-patient-medications-app/package.json:45) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-medications-app/src/index.ts:1 |
| 24 | 3.4.2 (packages/esm-patient-notes-app/package.json:43) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-notes-app/src/index.ts:1-7 |
| 25 | 3.4.2 (packages/esm-patient-orders-app/package.json:45) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-orders-app/src/index.ts:1 |
| 26 | 3.4.2 (packages/esm-patient-programs-app/package.json:45) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-programs-app/src/index.ts:1 |
| 27 | 3.4.2 (packages/esm-patient-tests-app/package.json:47) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-tests-app/src/index.ts:1-7 |
| 28 | 3.4.2 (packages/esm-patient-vitals-app/package.json:46) | 1 technology | manifest | other-mfe-framework | technological | weak | declares packages/esm-patient-vitals-app/src/index.ts:1-8 |
| 29 | 3.4.2 (packages/esm-form-entry-app/package.json:69) (Evidence); 3.4.3 (packages/esm-form-entry-app) (Markers); 3.4.5 #1 (Configuration); 3.4.5 #2 (Configuration); 3.4.6 #2 (Artifacts) | 2 configuration | configuration | module-federation | technological | moderate | configures #136; configures #154; configures #155 |
| 30 | 3.4.3 (packages/esm-form-engine-app) (Entry); 3.4.4 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15) (Observation); 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95) (Observation); 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249) (Observation); 3.4.5 #44 (Configuration); 3.4.5 #58 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #135; configures #197; configures #211 |
| 31 | 3.4.3 (packages/esm-generic-patient-widgets-app) (Entry); 3.4.7 #13 (Evidence) | 2 configuration | configuration | other | technological | moderate | configures #137 |
| 32 | 3.4.3 (packages/esm-patient-allergies-app) (Entry); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23) (Observation); 3.4.5 #12 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #138; configures #165 |
| 33 | 3.4.3 (packages/esm-patient-attachments-app) (Entry); 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315) (Observation); 3.4.5 #13 (Configuration); 3.4.5 #48 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #139; configures #166; configures #201 |
| 34 | 3.4.3 (packages/esm-patient-banner-app) (Entry); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389) (Observation); 3.4.5 #22 (Configuration); 3.4.7 #8 (Evidence) | 2 configuration | configuration | other | technological | moderate | configures #140; configures #175 |
| 35 | 3.4.3 (packages/esm-patient-chart-app) (Entry); 3.4.4 (packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23) (Observation); 3.4.4 (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4) (Observation); 3.4.4 (packages/esm-patient-common-lib/src/workspaces.ts:55) (Observation); 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94) (Observation); 3.4.4 (packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12) (Observation); 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497) (Observation); 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501) (Observation); 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57) (Observation); 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154) (Observation); 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268) (Observation); 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300) (Observation); 3.4.5 #8 (Configuration); 3.4.5 #29 (Configuration); 3.4.5 #30 (Configuration); 3.4.5 #31 (Configuration); 3.4.5 #32 (Configuration); 3.4.5 #33 (Configuration); 3.4.5 #34 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #141; configures #161; configures #182; configures #183; configures #184; configures #185; configures #186; configures #187 |
| 36 | 3.4.3 (packages/esm-patient-conditions-app) (Entry); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26) (Observation); 3.4.5 #14 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #143; configures #167 |
| 37 | 3.4.3 (packages/esm-patient-flags-app) (Entry); 3.4.4 (packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68) (Observation); 3.4.5 #21 (Configuration); 3.4.7 #20 (Evidence) | 2 configuration | configuration | other | technological | moderate | configures #144; configures #174 |
| 38 | 3.4.3 (packages/esm-patient-forms-app) (Entry); 3.4.4 (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43) (Observation); 3.4.4 (packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20) (Observation); 3.4.4 (packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25) (Observation); 3.4.4 (packages/esm-patient-common-lib/src/form-entry-interop.ts:70) (Observation); 3.4.4 (packages/esm-patient-common-lib/src/form-entry-interop.ts:97) (Observation); 3.4.4 (packages/esm-patient-vitals-app/src/utils.ts:16) (Observation); 3.4.5 #7 (Configuration); 3.4.5 #10 (Configuration); 3.4.5 #57 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #145; configures #160; configures #163; configures #210 |
| 39 | 3.4.3 (packages/esm-patient-immunizations-app) (Entry); 3.4.5 #15 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #146; configures #168 |
| 40 | 3.4.3 (packages/esm-patient-lists-app) (Entry); 3.4.7 #24 (Evidence) | 2 configuration | configuration | other | technological | moderate | configures #147 |
| 41 | 3.4.3 (packages/esm-patient-medications-app) (Entry); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) (Observation); 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120) (Observation); 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156) (Observation); 3.4.5 #16 (Configuration); 3.4.5 #50 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #148; configures #169; configures #203 |
| 42 | 3.4.3 (packages/esm-patient-notes-app) (Entry); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281) (Observation); 3.4.5 #27 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #149; configures #180 |
| 43 | 3.4.3 (packages/esm-patient-orders-app) (Entry); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27) (Observation); 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37) (Observation); 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71) (Observation); 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25) (Observation); 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149) (Observation); 3.4.4 (packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71) (Observation); 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58) (Observation); 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66) (Observation); 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103) (Observation); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78) (Observation); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153) (Observation); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163) (Observation); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54) (Observation); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208) (Observation); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68) (Observation); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99) (Observation); 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111) (Observation); 3.4.5 #17 (Configuration); 3.4.5 #46 (Configuration); 3.4.5 #55 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #150; configures #170; configures #199; configures #208 |
| 44 | 3.4.3 (packages/esm-patient-programs-app) (Entry); 3.4.5 #18 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #151; configures #171 |
| 45 | 3.4.3 (packages/esm-patient-tests-app) (Entry); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13) (Observation); 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121) (Observation); 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156) (Observation); 3.4.5 #19 (Configuration); 3.4.5 #51 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #152; configures #172; configures #204 |
| 46 | 3.4.3 (packages/esm-patient-vitals-app) (Entry); 3.4.4 (packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410) (Observation); 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29) (Observation); 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501) (Observation); 3.4.4 (packages/esm-patient-vitals-app/src/utils.ts:16) (Observation); 3.4.5 #11 (Configuration); 3.4.5 #49 (Configuration) | 2 configuration | configuration | other | technological | moderate | configures #153; configures #164; configures #202 |
| 47 | 3.4.4 (packages/esm-form-entry-app/src/index.ts:66) (Observation); 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:21) (Observation); 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:23) (Observation); 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95) (Observation); 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249) (Observation); 3.4.5 #1 (Configuration); 3.4.5 #2 (Configuration); 3.4.7 #12 (Evidence) | 2 configuration | configuration | other | technological | moderate | configures #136; configures #154; configures #155 |
| 48 | 3.4.4 (packages/esm-form-entry-app/src/index.ts:66) | 3 code | source code | — | technological | weak | — |
| 49 | 3.4.4 (packages/esm-form-entry-app/src/declarations.d.ts:3) | 3 code | source code | — | context | weak | — |
| 50 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:21) | 3 code | source code | single-spa | architectural | moderate | implements #154; implements #155 |
| 51 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:22) | 3 code | source code | single-spa | architectural | moderate | implements #154; implements #155 |
| 52 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:23) | 3 code | source code | single-spa | architectural | moderate | implements #154; implements #155 |
| 53 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:3) | 3 code | source code | single-spa | architectural | moderate | implements #154; implements #155 |
| 54 | 3.4.4 (packages/esm-form-entry-app/src/bootstrap.ts:12) | 3 code | source code | single-spa | architectural | moderate | implements #154; implements #155 |
| 55 | 3.4.4 (packages/esm-patient-attachments-app/src/attachments/attachment-preview.component.tsx:56) | 3 code | source code | iframe | context | weak | — |
| 56 | 3.4.4 (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:43) | 3 code | source code | iframe | architectural | strong | implements #156 |
| 57 | 3.4.4 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:15) | 3 code | source code | events | technological | ambiguous | implements #157 |
| 58 | 3.4.4 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:23) | 3 code | source code | events | technological | ambiguous | implements #158 |
| 59 | 3.4.4 (packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx:24) | 3 code | source code | events | technological | ambiguous | implements #158 |
| 60 | 3.4.4 (packages/esm-patient-flags-app/src/flags/hooks/usePatientFlags.tsx:56) | 3 code | source code | single-spa | architectural | moderate | implements #159 |
| 61 | 3.4.4 (packages/esm-form-engine-app/src/form-renderer/form-error.component.tsx:20) | 3 code | source code | other | architectural | moderate | implements #160 |
| 62 | 3.4.4 (packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:42) | 3 code | source code | other | architectural | moderate | implements #160 |
| 63 | 3.4.4 (packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:259) | 3 code | source code | other | architectural | strong | implements #161 |
| 64 | 3.4.4 (packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx:113) | 3 code | source code | other | technological | ambiguous | implements #162 |
| 65 | 3.4.4 (packages/esm-patient-chart-app/src/clinical-views/utils/helpers.ts:24) | 3 code | source code | other | architectural | strong | implements #163 |
| 66 | 3.4.4 (packages/esm-patient-chart-app/src/mark-patient-deceased/mark-patient-deceased-form.workspace.tsx:124) | 3 code | source code | other | architectural | strong | implements #164 |
| 67 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/chart-review.component.tsx:37) | 3 code | source code | other | architectural | moderate | implements #164; implements #165; implements #166; implements #167; implements #168; implements #169; implements #170; implements #171; implements #172 |
| 68 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:66) | 3 code | source code | other | technological | ambiguous | implements #173 |
| 69 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69) | 3 code | source code | other | architectural | moderate | implements #164; implements #165; implements #166; implements #167; implements #168; implements #169; implements #170; implements #171; implements #172; implements #174 |
| 70 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47) | 3 code | source code | other | architectural | strong | implements #164; implements #165; implements #166; implements #167; implements #168; implements #169; implements #170; implements #171; implements #172 |
| 71 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67) | 3 code | source code | other | architectural | strong | implements #175 |
| 72 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:68) | 3 code | source code | other | architectural | strong | implements #174 |
| 73 | 3.4.4 (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:69) | 3 code | source code | other | architectural | strong | implements #164 |
| 74 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:389) | 3 code | source code | other | architectural | strong | implements #175 |
| 75 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:410) | 3 code | source code | other | architectural | strong | implements #164 |
| 76 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:452) | 3 code | source code | other | technological | ambiguous | implements #176 |
| 77 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:547) | 3 code | source code | other | technological | ambiguous | implements #177 |
| 78 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:562) | 3 code | source code | other | technological | ambiguous | implements #178 |
| 79 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:23) | 3 code | source code | other | architectural | strong | implements #165 |
| 80 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:24) | 3 code | source code | other | technological | ambiguous | implements #179 |
| 81 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:25) | 3 code | source code | other | architectural | strong | implements #163 |
| 82 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:26) | 3 code | source code | other | architectural | strong | implements #167 |
| 83 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:27) | 3 code | source code | other | architectural | strong | implements #170 |
| 84 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:28) | 3 code | source code | other | architectural | strong | implements #180 |
| 85 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:29) | 3 code | source code | other | architectural | strong | implements #164 |
| 86 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:236) | 3 code | source code | other | architectural | strong | implements #180 |
| 87 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/encounters-table/encounters-table.component.tsx:281) | 3 code | source code | other | architectural | strong | implements #180 |
| 88 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/tests-summary.component.tsx:13) | 3 code | source code | other | architectural | strong | implements #172 |
| 89 | 3.4.4 (packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx:159) | 3 code | source code | other | technological | ambiguous | implements #181 |
| 90 | 3.4.4 (packages/esm-patient-common-lib/src/form-entry-interop.ts:70) | 3 code | source code | other | architectural | moderate | implements #163 |
| 91 | 3.4.4 (packages/esm-patient-common-lib/src/form-entry-interop.ts:97) | 3 code | source code | other | architectural | moderate | implements #163 |
| 92 | 3.4.4 (packages/esm-patient-common-lib/src/launchStartVisitPrompt.tsx:4) | 3 code | source code | other | architectural | strong | implements #182; implements #183; implements #184; implements #185; implements #186; implements #187 |
| 93 | 3.4.4 (packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx:24) | 3 code | source code | other | technological | ambiguous | implements #188 |
| 94 | 3.4.4 (packages/esm-patient-common-lib/src/orders/store.ts:24) | 3 code | source code | events | architectural | moderate | implements #189; implements #190 |
| 95 | 3.4.4 (packages/esm-patient-common-lib/src/store/patient-chart-store.ts:10) | 3 code | source code | events | architectural | moderate | implements #191; implements #192; implements #193; implements #194; implements #195; implements #196 |
| 96 | 3.4.4 (packages/esm-patient-common-lib/src/workspaces.ts:55) | 3 code | source code | other | architectural | strong | implements #182; implements #184; implements #185; implements #186; implements #187 |
| 97 | 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:94) | 3 code | source code | other | architectural | strong | implements #182 |
| 98 | 3.4.4 (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95) | 3 code | source code | other | architectural | strong | implements #154; implements #197 |
| 99 | 3.4.4 (packages/esm-patient-forms-app/src/forms/forms-dashboard.workspace.tsx:12) | 3 code | source code | other | architectural | strong | implements #182 |
| 100 | 3.4.4 (packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:17) | 3 code | source code | events | architectural | moderate | implements #198 |
| 101 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:37) | 3 code | source code | other | architectural | strong | implements #199 |
| 102 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/add-drug-order.workspace.tsx:71) | 3 code | source code | other | architectural | strong | implements #199 |
| 103 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx:213) | 3 code | source code | other | technological | ambiguous | implements #200 |
| 104 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-search/drug-search.component.tsx:25) | 3 code | source code | other | architectural | strong | implements #199 |
| 105 | 3.4.4 (packages/esm-patient-medications-app/src/add-drug-order/drug-search/order-basket-search-results.component.tsx:149) | 3 code | source code | other | architectural | strong | implements #199 |
| 106 | 3.4.4 (packages/esm-patient-medications-app/src/components/medications-details-table.component.tsx:71) | 3 code | source code | other | architectural | strong | implements #199 |
| 107 | 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:58) | 3 code | source code | other | architectural | strong | implements #199 |
| 108 | 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:66) | 3 code | source code | other | architectural | strong | implements #199 |
| 109 | 3.4.4 (packages/esm-patient-medications-app/src/drug-order-basket-panel/order-basket-item-tile.component.tsx:103) | 3 code | source code | other | architectural | strong | implements #199 |
| 110 | 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:315) | 3 code | source code | other | architectural | strong | implements #201 |
| 111 | 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:497) | 3 code | source code | other | architectural | strong | implements #185 |
| 112 | 3.4.4 (packages/esm-patient-notes-app/src/notes/visit-notes-form.workspace.tsx:501) | 3 code | source code | other | architectural | strong | implements #185; implements #202 |
| 113 | 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:120) | 3 code | source code | other | architectural | strong | implements #203 |
| 114 | 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:121) | 3 code | source code | other | architectural | strong | implements #204 |
| 115 | 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:534) | 3 code | source code | other | technological | ambiguous | implements #205 |
| 116 | 3.4.4 (packages/esm-patient-orders-app/src/components/order-details-table.component.tsx:561) | 3 code | source code | other | technological | ambiguous | implements #206 |
| 117 | 3.4.4 (packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx:169) | 3 code | source code | other | technological | ambiguous | implements #207 |
| 118 | 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:57) | 3 code | source code | other | architectural | strong | implements #186 |
| 119 | 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:154) | 3 code | source code | other | architectural | strong | implements #186 |
| 120 | 3.4.4 (packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:156) | 3 code | source code | other | architectural | strong | implements #203; implements #204 |
| 121 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/add-test-order.workspace.tsx:78) | 3 code | source code | other | architectural | strong | implements #208 |
| 122 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:153) | 3 code | source code | other | architectural | strong | implements #208 |
| 123 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:163) | 3 code | source code | other | architectural | strong | implements #208 |
| 124 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx:193) | 3 code | source code | other | technological | ambiguous | implements #209 |
| 125 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:54) | 3 code | source code | other | architectural | strong | implements #208 |
| 126 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/add-test-order/test-type-search.component.tsx:208) | 3 code | source code | other | architectural | strong | implements #208 |
| 127 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-item-tile.component.tsx:68) | 3 code | source code | other | architectural | strong | implements #208 |
| 128 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:99) | 3 code | source code | other | architectural | strong | implements #208 |
| 129 | 3.4.4 (packages/esm-patient-tests-app/src/test-orders/lab-order-basket-panel/lab-order-basket-panel.extension.tsx:111) | 3 code | source code | other | architectural | strong | implements #208 |
| 130 | 3.4.4 (packages/esm-patient-vitals-app/src/utils.ts:16) | 3 code | source code | other | architectural | strong | implements #210 |
| 131 | 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:249) | 3 code | source code | other | architectural | strong | implements #155; implements #211 |
| 132 | 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:268) | 3 code | source code | other | architectural | strong | implements #187 |
| 133 | 3.4.4 (packages/esm-patient-vitals-app/src/vitals-biometrics-form/vitals-biometrics-form.workspace.tsx:300) | 3 code | source code | other | architectural | strong | implements #187 |
| 134 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 135 | 3.4.3 (packages/esm-form-engine-app) | 4 structure | directory | — | architectural | moderate | — |
| 136 | 3.4.3 (packages/esm-form-entry-app) | 4 structure | directory | — | architectural | moderate | — |
| 137 | 3.4.3 (packages/esm-generic-patient-widgets-app) | 4 structure | directory | — | architectural | moderate | — |
| 138 | 3.4.3 (packages/esm-patient-allergies-app) | 4 structure | directory | — | architectural | moderate | — |
| 139 | 3.4.3 (packages/esm-patient-attachments-app) | 4 structure | directory | — | architectural | moderate | — |
| 140 | 3.4.3 (packages/esm-patient-banner-app) | 4 structure | directory | — | architectural | moderate | — |
| 141 | 3.4.3 (packages/esm-patient-chart-app) | 4 structure | directory | — | architectural | moderate | — |
| 142 | 3.4.3 (packages/esm-patient-common-lib) | 4 structure | directory | — | context | weak | — |
| 143 | 3.4.3 (packages/esm-patient-conditions-app) | 4 structure | directory | — | architectural | moderate | — |
| 144 | 3.4.3 (packages/esm-patient-flags-app) | 4 structure | directory | — | architectural | moderate | — |
| 145 | 3.4.3 (packages/esm-patient-forms-app) | 4 structure | directory | — | architectural | moderate | — |
| 146 | 3.4.3 (packages/esm-patient-immunizations-app) | 4 structure | directory | — | architectural | moderate | — |
| 147 | 3.4.3 (packages/esm-patient-lists-app) | 4 structure | directory | — | architectural | moderate | — |
| 148 | 3.4.3 (packages/esm-patient-medications-app) | 4 structure | directory | — | architectural | moderate | — |
| 149 | 3.4.3 (packages/esm-patient-notes-app) | 4 structure | directory | — | architectural | moderate | — |
| 150 | 3.4.3 (packages/esm-patient-orders-app) | 4 structure | directory | — | architectural | moderate | — |
| 151 | 3.4.3 (packages/esm-patient-programs-app) | 4 structure | directory | — | architectural | moderate | — |
| 152 | 3.4.3 (packages/esm-patient-tests-app) | 4 structure | directory | — | architectural | moderate | — |
| 153 | 3.4.3 (packages/esm-patient-vitals-app) | 4 structure | directory | — | architectural | moderate | — |
| 154 | 3.4.5 #1 | 5 composition | source code | single-spa | architectural | strong | links #145; links #136 |
| 155 | 3.4.5 #2 | 5 composition | source code | single-spa | architectural | strong | links #153; links #136 |
| 156 | 3.4.5 #3 | 5 composition | source code | iframe | architectural | strong | links #145 |
| 157 | 3.4.5 #4 | 5 composition | source code | events | technological | ambiguous | links #135 |
| 158 | 3.4.5 #5 | 5 composition | source code | events | technological | ambiguous | links #135 |
| 159 | 3.4.5 #6 | 5 composition | source code | events | architectural | strong | links #144 |
| 160 | 3.4.5 #7 | 5 composition | source code | other | architectural | strong | links #135; links #145 |
| 161 | 3.4.5 #8 | 5 composition | source code | other | architectural | strong | links #136; links #141 |
| 162 | 3.4.5 #9 | 5 composition | source code | other | technological | ambiguous | links #137 |
| 163 | 3.4.5 #10 | 5 composition | source code | other | architectural | strong | links #141; links #145 |
| 164 | 3.4.5 #11 | 5 composition | source code | other | architectural | strong | links #141; links #153 |
| 165 | 3.4.5 #12 | 5 composition | source code | other | architectural | strong | links #141; links #138 |
| 166 | 3.4.5 #13 | 5 composition | source code | other | architectural | strong | links #141; links #139 |
| 167 | 3.4.5 #14 | 5 composition | source code | other | architectural | strong | links #141; links #143 |
| 168 | 3.4.5 #15 | 5 composition | source code | other | architectural | strong | links #141; links #146 |
| 169 | 3.4.5 #16 | 5 composition | source code | other | architectural | strong | links #141; links #148 |
| 170 | 3.4.5 #17 | 5 composition | source code | other | architectural | strong | links #141; links #150 |
| 171 | 3.4.5 #18 | 5 composition | source code | other | architectural | strong | links #141; links #151 |
| 172 | 3.4.5 #19 | 5 composition | source code | other | architectural | strong | links #141; links #152 |
| 173 | 3.4.5 #20 | 5 composition | source code | other | technological | ambiguous | links #141 |
| 174 | 3.4.5 #21 | 5 composition | source code | other | architectural | strong | links #141; links #144 |
| 175 | 3.4.5 #22 | 5 composition | source code | other | architectural | strong | links #141; links #140 |
| 176 | 3.4.5 #23 | 5 composition | source code | other | technological | ambiguous | links #141 |
| 177 | 3.4.5 #24 | 5 composition | source code | other | technological | ambiguous | links #141 |
| 178 | 3.4.5 #25 | 5 composition | source code | other | technological | ambiguous | links #141 |
| 179 | 3.4.5 #26 | 5 composition | source code | other | technological | ambiguous | links #141 |
| 180 | 3.4.5 #27 | 5 composition | source code | other | architectural | strong | links #141; links #149 |
| 181 | 3.4.5 #28 | 5 composition | source code | other | technological | ambiguous | links #141 |
| 182 | 3.4.5 #29 | 5 composition | source code | other | architectural | strong | links #145; links #141 |
| 183 | 3.4.5 #30 | 5 composition | source code | other | architectural | strong | links #146; links #141 |
| 184 | 3.4.5 #31 | 5 composition | source code | other | architectural | strong | links #148; links #141 |
| 185 | 3.4.5 #32 | 5 composition | source code | other | architectural | strong | links #149; links #141 |
| 186 | 3.4.5 #33 | 5 composition | source code | other | architectural | strong | links #150; links #141 |
| 187 | 3.4.5 #34 | 5 composition | source code | other | architectural | strong | links #153; links #141 |
| 188 | 3.4.5 #35 | 5 composition | source code | other | technological | ambiguous | links #141 |
| 189 | 3.4.5 #36 | 5 composition | source code | events | architectural | strong | links #148; links #150 |
| 190 | 3.4.5 #37 | 5 composition | source code | events | architectural | strong | links #150; links #152 |
| 191 | 3.4.5 #38 | 5 composition | source code | events | architectural | strong | links #141; links #145 |
| 192 | 3.4.5 #39 | 5 composition | source code | events | architectural | strong | links #141; links #148 |
| 193 | 3.4.5 #40 | 5 composition | source code | events | architectural | strong | links #141; links #149 |
| 194 | 3.4.5 #41 | 5 composition | source code | events | architectural | strong | links #141; links #150 |
| 195 | 3.4.5 #42 | 5 composition | source code | events | architectural | strong | links #141; links #152 |
| 196 | 3.4.5 #43 | 5 composition | source code | events | architectural | strong | links #141; links #153 |
| 197 | 3.4.5 #44 | 5 composition | source code | other | architectural | strong | links #145; links #135 |
| 198 | 3.4.5 #45 | 5 composition | source code | events | architectural | strong | links #145 |
| 199 | 3.4.5 #46 | 5 composition | source code | other | architectural | strong | links #148; links #150 |
| 200 | 3.4.5 #47 | 5 composition | source code | other | technological | ambiguous | links #148 |
| 201 | 3.4.5 #48 | 5 composition | source code | other | architectural | strong | links #149; links #139 |
| 202 | 3.4.5 #49 | 5 composition | source code | other | architectural | strong | links #149; links #153 |
| 203 | 3.4.5 #50 | 5 composition | source code | other | architectural | strong | links #150; links #148 |
| 204 | 3.4.5 #51 | 5 composition | source code | other | architectural | strong | links #150; links #152 |
| 205 | 3.4.5 #52 | 5 composition | source code | other | technological | ambiguous | links #150 |
| 206 | 3.4.5 #53 | 5 composition | source code | other | technological | ambiguous | links #150 |
| 207 | 3.4.5 #54 | 5 composition | source code | other | technological | ambiguous | links #150 |
| 208 | 3.4.5 #55 | 5 composition | source code | other | architectural | strong | links #152; links #150 |
| 209 | 3.4.5 #56 | 5 composition | source code | other | technological | ambiguous | links #152 |
| 210 | 3.4.5 #57 | 5 composition | source code | other | architectural | strong | links #153; links #145 |
| 211 | 3.4.5 #58 | 5 composition | source code | other | architectural | strong | links #153; links #135 |
| 212 | 3.4.6 #1 | 6 build-deploy | manifest | — | architectural | moderate | publishes #135 |
| 213 | 3.4.6 #2 | 6 build-deploy | manifest | — | architectural | moderate | publishes #136 |
| 214 | 3.4.6 #3 | 6 build-deploy | manifest | — | architectural | moderate | publishes #137 |
| 215 | 3.4.6 #4 | 6 build-deploy | manifest | — | architectural | moderate | publishes #138 |
| 216 | 3.4.6 #5 | 6 build-deploy | manifest | — | architectural | moderate | publishes #139 |
| 217 | 3.4.6 #6 | 6 build-deploy | manifest | — | architectural | moderate | publishes #140 |
| 218 | 3.4.6 #7 | 6 build-deploy | manifest | — | architectural | moderate | publishes #141 |
| 219 | 3.4.6 #8 | 6 build-deploy | manifest | — | architectural | moderate | publishes #143 |
| 220 | 3.4.6 #9 | 6 build-deploy | manifest | — | architectural | moderate | publishes #144 |
| 221 | 3.4.6 #10 | 6 build-deploy | manifest | — | architectural | moderate | publishes #145 |
| 222 | 3.4.6 #11 | 6 build-deploy | manifest | — | architectural | moderate | publishes #146 |
| 223 | 3.4.6 #12 | 6 build-deploy | manifest | — | architectural | moderate | publishes #147 |
| 224 | 3.4.6 #13 | 6 build-deploy | manifest | — | architectural | moderate | publishes #148 |
| 225 | 3.4.6 #14 | 6 build-deploy | manifest | — | architectural | moderate | publishes #149 |
| 226 | 3.4.6 #15 | 6 build-deploy | manifest | — | architectural | moderate | publishes #150 |
| 227 | 3.4.6 #16 | 6 build-deploy | manifest | — | architectural | moderate | publishes #151 |
| 228 | 3.4.6 #17 | 6 build-deploy | manifest | — | architectural | moderate | publishes #152 |
| 229 | 3.4.6 #18 | 6 build-deploy | manifest | — | architectural | moderate | publishes #153 |
| 230 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #164; corroborates #165; corroborates #166; corroborates #167; corroborates #168; corroborates #169; corroborates #170; corroborates #171; corroborates #172; corroborates #174; corroborates #175; corroborates #135; corroborates #136; corroborates #137; corroborates #138; corroborates #139; corroborates #140; corroborates #141; corroborates #143; corroborates #144; corroborates #145; corroborates #146; corroborates #147; corroborates #148; corroborates #149; corroborates #150; corroborates #151; corroborates #152; corroborates #153 |
| 231 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | contradicts #153; contradicts packages/esm-patient-vitals-app/README.md:3 |
| 232 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | contradicts #142; contradicts packages/esm-patient-common-lib/src/index.ts:1-23; contradicts packages/esm-patient-common-lib/package.json:9-13 |
| 233 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates package.json:5-7; corroborates package.json:87 |
| 234 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | partially corroborates package.json:9; partially corroborates packages/esm-patient-allergies-app/package.json:10-11 |
| 235 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | contradicts #153; contradicts packages/esm-patient-vitals-app/package.json:10-11 |
| 236 | 3.4.7 #7 | 7 documentation | documentation | import-maps | architectural | weak | partially corroborates packages/esm-patient-allergies-app/package.json:11; partially corroborates packages/esm-form-entry-app/package.json:11 |
| 237 | 3.4.7 #8 | 7 documentation | documentation | — | architectural | weak | corroborates #71; corroborates #34 |
| 238 | 3.4.7 #9 | 7 documentation | documentation | — | architectural | weak | corroborates #164; corroborates #165; corroborates #166; corroborates #167; corroborates #168; corroborates #169; corroborates #170; corroborates #171; corroborates #172; corroborates #174; corroborates #175; corroborates packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69-78 |
| 239 | 3.4.7 #10 | 7 documentation | comment | — | architectural | weak | contradicts e2e/support/github/run-e2e-docker-env.sh:8 |
| 240 | 3.4.7 #11 | 7 documentation | comment | — | architectural | weak | contradicts e2e/support/github/run-e2e-docker-env.sh:29-38 |
| 241 | 3.4.7 #12 | 7 documentation | documentation | single-spa | architectural | weak | corroborates #154; corroborates #155; corroborates packages/esm-form-entry-app/src/bootstrap.ts:12-23; corroborates #47 |
| 242 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | corroborates #31; corroborates packages/esm-generic-patient-widgets-app/src/config-schema.ts:3-23 |
| 243 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #164; corroborates #165; corroborates #166; corroborates #167; corroborates #168; corroborates #169; corroborates #170; corroborates #171; corroborates #172; corroborates #174; corroborates #175; corroborates packages/esm-patient-chart-app/src/root.component.tsx:11-16; corroborates packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47-92; corroborates packages/esm-patient-chart-app/src/index.ts:33-42 |
| 244 | 3.4.7 #15 | 7 documentation | comment | — | architectural | weak | partially corroborates packages/esm-patient-chart-app/src/index.ts:7-8; partially corroborates packages/esm-patient-chart-app/src/index.ts:29; partially corroborates packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:3 |
| 245 | 3.4.7 #16 | 7 documentation | comment | — | architectural | weak | partially corroborates packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:4; partially corroborates packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:32-36 |
| 246 | 3.4.7 #17 | 7 documentation | comment | — | architectural | weak | — |
| 247 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates packages/esm-patient-allergies-app/src/index.ts:10; corroborates packages/esm-patient-chart-app/src/index.ts:7-8; corroborates packages/esm-patient-common-lib/src/index.ts:1-23 |
| 248 | 3.4.7 #19 | 7 documentation | comment | — | architectural | weak | corroborates #189; corroborates #190; corroborates packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-40; corroborates packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19; corroborates packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38 |
| 249 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | corroborates #174; corroborates #37 |
| 250 | 3.4.7 #21 | 7 documentation | comment | iframe | architectural | weak | corroborates #198; corroborates packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19 |
| 251 | 3.4.7 #22 | 7 documentation | comment | iframe | architectural | weak | corroborates #156; corroborates packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:22-43 |
| 252 | 3.4.7 #23 | 7 documentation | comment | iframe | architectural | weak | partially corroborates packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44; partially corroborates packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19 |
| 253 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates #147; corroborates #40 |
| 254 | 3.4.7 #25 | 7 documentation | comment | — | architectural | weak | corroborates #203; corroborates #204; corroborates #150; corroborates packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38 |
| 255 | 3.4.8 #1 | 8 history | history | — | technological | weak | explains #4 |
| 256 | 3.4.8 #2 | 8 history | history | — | technological | weak | explains #6 |
| 257 | 3.4.8 #3 | 8 history | history | — | technological | weak | explains #14 |
| 258 | 3.4.8 #4 | 8 history | history | — | technological | weak | explains #15 |
| 259 | 3.4.8 #5 | 8 history | history | — | technological | weak | explains #17 |
| 260 | 3.4.8 #6 | 8 history | history | — | technological | ambiguous | explains #157; explains #57 |
| 261 | 3.4.8 #7 | 8 history | history | — | technological | ambiguous | explains #158; explains #58; explains #59 |
| 262 | 3.4.8 #8 | 8 history | history | — | technological | ambiguous | explains #162; explains #64 |
| 263 | 3.4.8 #9 | 8 history | history | — | technological | ambiguous | explains #173; explains #68 |
| 264 | 3.4.8 #10 | 8 history | history | — | technological | ambiguous | explains #176; explains #76 |
| 265 | 3.4.8 #11 | 8 history | history | — | technological | ambiguous | explains #177; explains #77 |
| 266 | 3.4.8 #12 | 8 history | history | — | technological | ambiguous | explains #178; explains #78 |
| 267 | 3.4.8 #13 | 8 history | history | — | technological | ambiguous | explains #179; explains #246; explains #80 |
| 268 | 3.4.8 #14 | 8 history | history | — | technological | ambiguous | explains #181; explains #89 |
| 269 | 3.4.8 #15 | 8 history | history | — | technological | ambiguous | explains #188; explains #93 |
| 270 | 3.4.8 #16 | 8 history | history | — | technological | ambiguous | explains #200; explains #103 |
| 271 | 3.4.8 #17 | 8 history | history | — | technological | ambiguous | explains #205; explains #115 |
| 272 | 3.4.8 #18 | 8 history | history | — | technological | ambiguous | explains #206; explains #116 |
| 273 | 3.4.8 #19 | 8 history | history | — | technological | ambiguous | explains #207; explains #209; explains #117; explains #124 |
| 274 | 3.4.8 #20 | 8 history | history | — | architectural | weak | explains #231; explains #235 |
| 275 | 3.4.8 #21 | 8 history | history | — | architectural | weak | explains #232 |
| 276 | 3.4.8 #22 | 8 history | history | — | architectural | ambiguous | explains #234 |
| 277 | 3.4.8 #23 | 8 history | history | — | architectural | ambiguous | explains #236 |
| 278 | 3.4.8 #24 | 8 history | history | — | architectural | weak | explains #239 |
| 279 | 3.4.8 #25 | 8 history | history | — | architectural | weak | explains #240 |
| 280 | 3.4.8 #26 | 8 history | history | — | architectural | ambiguous | explains #244 |
| 281 | 3.4.8 #27 | 8 history | history | — | architectural | ambiguous | explains #245 |
| 282 | 3.4.8 #28 | 8 history | history | — | architectural | ambiguous | explains #252 |

## Summary

Observations: 282. Dimensions (technology: 28, configuration: 19, code: 86, structure: 20, composition: 58, build-deploy: 18, documentation: 25, history: 28). Strength (strong: 95, moderate: 70, weak: 67, ambiguous: 50). Evidence (technological: 97, architectural: 180, context: 5).

## Notes

Common rules were read in `docs/mfe-source-review/regras-comuns.md`, because `docs/mfe-review-pipeline/regras-comuns.md` does not exist in this checkout. Seven final reviews have same ID/commit as classification. Only these reviews/cited acquired-snapshot excerpts used.

The 18 `src/routes.json` files are per-unit registry configurations; each forms one unit block, gathering origins from tables. Form-entry webpack forms another block with federation plugin. Other webpack files delegate to external tooling; `webpack.prod.config.js` merely reexports configuration; `angular.json` points to it without itself declaring federation builder. package.json workspaces, Turbo tasks, aliases, ports, development URLs/e2e environment artifacts add no eligible composition-configuration blocks. E2e mounting JSON generated by script rather than configuration file available in snapshot.

Shell/HFE-UI relationship directions preserve recorded 3.4.5 decisions: source is local participating unit although message comes from external target. Claim strength remains weak even corroborated; corroboration appears only in table’s directed relationships.

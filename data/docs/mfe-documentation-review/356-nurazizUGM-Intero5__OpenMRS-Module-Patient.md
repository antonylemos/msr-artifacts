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

## Repository overview

Root README and all 19 package READMEs were read in full, all English/project-specific without tool template README or third-party document. Documentation presents OpenMRS patient record widgets, a chart providing layout/extension points and shared library. Reviews 3.4.2–3.4.6 have `final` status, sharing classification/acquisition commit. Artifacts support this set, but README list retains nonexistent Biometrics package and calls common-lib a microfrontend (README.md:7-26; packages/esm-patient-common-lib/src/index.ts:1-23). Classification/previous stages are not changed.

Doc-* occurrences at README.md:7, :23, :46, :50 and :56 and packages/esm-patient-chart-app/README.md:3 are in table. README.md:40 and :48 introduce development instructions; README.md:165 refers to external distribution documentation without snapshot deployment claim. Command blocks (README.md:36-38, :42-44, :52-54, :62-109, :122-131; packages/esm-generic-patient-widgets-app/README.md:9-11) were read as examples without own rows. Verifiable sentence accompanying Biometrics/Vitals example appears in table. External links were not consulted: they are not snapshot artifacts.

Allergies, attachments, banner, conditions, immunizations, medications, notes, programs, tests and vitals READMEs mainly describe clinical functions/widget appearance (README.md:3 each); tests also has concept hierarchy/filter guide (packages/esm-patient-tests-app/README.md:9-71), without frontend-boundary claim. React engine library is wrapper internal detail (packages/esm-form-engine-app/README.md:3; packages/esm-form-engine-app/package.json:5; packages/esm-form-engine-app/src/form-renderer/form-renderer.component.tsx:4). Engine choice in forms is functional context (packages/esm-patient-forms-app/README.md:3); observable composition uses form-widget-slot (packages/esm-patient-forms-app/src/forms/form-entry.workspace.tsx:95), snapshot containing both Angular/React wrappers (3.4.5 #1 and #44). ampath-forms.vercel.app URLs link engine documentation rather than declaring app hosting.

Comments/descriptive fields read in artifacts cited by previous reviews: root/19 package package.json, webpack/Angular/Turbo configurations, .github/workflows/ workflows, Dockerfiles, scripts/Compose in e2e/support/bamboo/ and e2e/support/github/, src/index.ts entries, src/routes.json registrations and composition files referenced by 3.4.5 (slots, workspaces, modals, stores, interop and wrappers). Architectural comment claims are below. Others concern translation, maintenance, internals, form rules and appearance; e.g. packages/esm-form-engine-app/src/index.ts:32-93 and packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:10-16. Current visit comment claims state sharing between chart and patient search Active Visit Tag (packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:28-31); claim is in table. Local cleanup is proven by callback calling setCurrentVisit(null, null) (:32-36 same artifact), but external consumption is undemonstrated in snapshot. Extension callbacks at packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx:615-640 document internal slot contract without claiming consumer in another unit. Docker environment is for tests, not production-deployment proof (e2e/support/github/Dockerfile:11-15).

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.md:7-21 | "It contains various microfrontends that constitute widgets in a patient dashboard" | structure | corroborated | 3.4.3 Units; 3.4.5 #11-22 |
| 2 | README.md:11 | "Biometrics" | structure | contradicted | 3.4.3 Units; packages/esm-patient-vitals-app/README.md:3 |
| 3 | README.md:23-26 | "two other microfrontends exist that encapsulate cross-cutting concerns" | structure | contradicted | 3.4.3 Units; packages/esm-patient-common-lib/src/index.ts:1-23; packages/esm-patient-common-lib/package.json:9-13 |
| 4 | README.md:32 | "This monorepo uses yarn" | structure | corroborated | package.json:5-7; package.json:87 |
| 5 | README.md:46 | "a dev server running `esm-patient-chart` as well as the specified microfrontend" | composition | partial | package.json:9; packages/esm-patient-allergies-app/package.json:10-11 |
| 6 | README.md:50 | "run the biometrics and vitals microfrontends simultaneously" | composition | contradicted | 3.4.3 Units; packages/esm-patient-vitals-app/package.json:10-11 |
| 7 | README.md:56 | "run `yarn serve` from within the individual packages and then use import map overrides" | composition | partial | packages/esm-patient-allergies-app/package.json:11; packages/esm-form-entry-app/package.json:11; 3.4.5 Repository overview |
| 8 | README.md:145 | "The patient header contains the patient banner" | composition | corroborated | packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:67; packages/esm-patient-banner-app/src/routes.json:22-24 |
| 9 | README.md:149 | "A dashboard is a collection of widgets" | composition | corroborated | packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx:69-78; 3.4.5 #11-22 |
| 10 | e2e/support/github/run-e2e-docker-env.sh:7 | "get a list of all the apps in this workspace" | structure | contradicted | e2e/support/github/run-e2e-docker-env.sh:8 |
| 11 | e2e/support/github/run-e2e-docker-env.sh:26-28 | "prepending the login app and primary navigation apps" | composition | contradicted | e2e/support/github/run-e2e-docker-env.sh:29-38 |
| 12 | packages/esm-form-entry-app/README.md:3 | "It's essentially a wrapper around an Angular application" | composition | corroborated | packages/esm-form-entry-app/src/bootstrap.ts:12-23; packages/esm-form-entry-app/src/routes.json:8-13; 3.4.5 #1-2 |
| 13 | packages/esm-generic-patient-widgets-app/README.md:3 | "a generic widget that can be added to the patient chart using configuration" | composition | corroborated | packages/esm-generic-patient-widgets-app/src/routes.json:6-15; packages/esm-generic-patient-widgets-app/src/config-schema.ts:3-23; 3.4.5 #9 |
| 14 | packages/esm-patient-chart-app/README.md:3 | "provides the underlying framework on top of which all the individual widgets are run" | composition | corroborated | 3.4.5 #11-22; packages/esm-patient-chart-app/src/root.component.tsx:11-16; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:47-92; packages/esm-patient-chart-app/src/index.ts:33-42 |
| 15 | packages/esm-patient-chart-app/src/index.ts:27-28 | "allows @openmrs/esm-patient-common-lib to be accessed by modules that are not using webpack. This is used for ngx-formentry." | composition | partial | packages/esm-patient-chart-app/src/index.ts:7-8; packages/esm-patient-chart-app/src/index.ts:29; packages/esm-form-entry-app/src/app/fe-wrapper/fe-wrapper.component.ts:3 |
| 16 | packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:28-31 | "Anything used outside the patient chart [...] must be updated in the callback, which is called when the patient chart unmounts" | other | partial | packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:4; packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:32-36 |
| 17 | packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:15 | "used not in the refapp, but in other distributions" | composition | uncorroborated | — |
| 18 | packages/esm-patient-common-lib/README.md:3 | "components and utilities shared across widgets in the patient chart" | other | corroborated | packages/esm-patient-allergies-app/src/index.ts:10; packages/esm-patient-chart-app/src/index.ts:7-8; packages/esm-patient-common-lib/src/index.ts:1-23 |
| 19 | packages/esm-patient-common-lib/src/orders/store.ts:4-7 | "different parts of the application may manage their own order lists" | other | corroborated | 3.4.5 #36-37; packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:37-40; packages/esm-patient-medications-app/src/drug-order-basket-panel/drug-order-basket-panel.extension.tsx:19; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38 |
| 20 | packages/esm-patient-flags-app/README.md:3 | "Flags are displayed in the Patient Summary" | composition | corroborated | 3.4.5 #21; packages/esm-patient-flags-app/src/routes.json:25-30 |
| 21 | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:14 | "listen for a message from HFE-UI to close the workspace" | composition | corroborated | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19; 3.4.5 #45 |
| 22 | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:21 | "hide the headers and breadcrumbs of the O2 page on load" | composition | corroborated | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:22-43; 3.4.5 #3 |
| 23 | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27 | "tells HFE-UI to send a message to the parent window to close the workspace when the form is saved or cancelled" | composition | partial | packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:29-44; packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:15-19 |
| 24 | packages/esm-patient-lists-app/README.md:3-8 | "The Patient Lists app renders a workspace in the Patient Chart" | structure | corroborated | packages/esm-patient-lists-app/src/routes.json:13-29; 3.4.3 Units |
| 25 | packages/esm-patient-orders-app/package.json:5 | "Microfrontend for the OpenMRS SPA providing the order basket for the patient chart" | structure | corroborated | 3.4.3 Units; 3.4.5 #50-51; packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx:38 |

## Observations

**1. README.md:7-21.** Description of set is confirmed by units/extension registrations. List identifies allergies, attachments, conditions, forms, immunizations, medications, notes, banner, chart, programs, tests and vitals; individual README.md:3 and package.json:5 descriptions repeat roles without extra rows. Biometrics is separate below because corroboration differs. List does not intend to enumerate all 18 current apps.

**2. README.md:11.** Item claims existence of widget with own package: links packages/esm-patient-biometrics-app/README.md. Directory absent from snapshot. Biometrics appears as vitals functionality rather than that separate unit (packages/esm-patient-vitals-app/README.md:3).

**3. README.md:23-26.** Sentence calls Common lib and Patient chart two microfrontends. Chart is frontend unit, but common-lib is reexport library without routes.json or own build. Cross-cutting role exists; counting it as microfrontend contradicts artifacts. Its own packages/esm-patient-common-lib/README.md:3 describes library.

**4. README.md:32.** Workspaces packages/* and packageManager yarn@4.9.1 corroborate monorepo/tool.

**5. README.md:46.** Root script fixes chart as source, allowing arguments to openmrs develop. Server/additional --sources processing belong to external tooling absent from snapshot; local configuration confirms intention but not entire described execution.

**6. README.md:50.** Sentence claims both units can compose simultaneous environment; README.md:53 example uses nonexistent esm-patient-biometrics-app directory. Vitals has own server, Biometrics no package. Different property from simple existence recorded in earlier Biometrics claim.

**7. README.md:56.** Per-app serve scripts are observable. No import map or overrides implementation exists in snapshot; that part is delegated to external shell/tooling. Sentence does not claim modules mount isolated page.

**8. README.md:145.** Chart mounts patient-header-slot, banner registering patientBanner there. Screen location/notifications are visual details without new architectural claims.

**9. README.md:149.** DashboardView mounts dashboard slot, rendering each extension. README.md:135-153 layout description contextualizes composition; menu, colors and screen occupancy are no additional boundaries.

**10. e2e/support/github/run-e2e-docker-env.sh:7.** Comment promises all apps, but filter explicitly excludes form-entry-app. List contains other 17 apps, not library. This set targets e2e environment rather than new product count.

**11. e2e/support/github/run-e2e-docker-env.sh:26-28.** Comment describes image module assembly. Actually prepended object contains esm-primary-navigation-app and esm-home-app, not login. Local packaged files map to /app as comment continuation says; login discrepancy makes sentence contradicted.

**12. packages/esm-form-entry-app/README.md:3.** Widget exposes Angular application through singleSpaAngular lifecycles and form-widget-slot consumed by forms/vitals. description at packages/esm-form-entry-app/package.json:5 repeats Angular identification. JSON-to-form transformation/engine internals receive no own rows.

**13. packages/esm-generic-patient-widgets-app/README.md:3.** Module offers switchableObs extension without fixed slot, with configuration schema. Supports configurable assignment possibility; future reuse intention is no multiple-consumer evidence. package.json:5 description repeats generic widget role.

**14. packages/esm-patient-chart-app/README.md:3.** Chart provides patient record layout, routing, workspace and extension points; distinguish role from external OpenMRS shell loading bundles. Local routing chooses summary/dashboards; startupApp installs offline synchronization/cacheable routes. README.md:23-26 and packages/esm-patient-chart-app/package.json:5 reiterate chart role. Visits, menus and offline mode are same-sentence unit capabilities rather than other units.

**15. packages/esm-patient-chart-app/src/index.ts:27-28.** Assignment to window makes library available. Angular app imports @openmrs/ngx-formentry, but snapshot has no _openmrs_esm_patient_common_lib consumer beyond assignment. Availability confirmed; claimed consumption and external consumer’s non-webpack property undemonstrated.

**16. packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx:28-31.** Comment claims current-visit state is used outside chart by patient search Active Visit Tag, requiring update in unmount callback. Local side proven: setCurrentVisit imports from framework (:4 same artifact), useEffect cleanup calling setCurrentVisit(null, null) (:32-36). Patient search Active Visit Tag consumer undemonstrated in snapshot; local cleanup does not prove claimed sharing with external unit. Hence partial claim.

**17. packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx:15.** Component/workspace calls exist at lines 17-30 same artifact, but distribution manifests confirming use/exclusion are absent. Existence does not confirm actual use in other distributions.

**18. packages/esm-patient-common-lib/README.md:3.** Actual consumers exist in at least two units rather than merely available package: allergies uses createDashboardLink, chart imports library/same helper. Reexports include cards, empty-state, error-state, pagination and workspaces. packages/esm-patient-common-lib/package.json:5 description repeats library purpose.

**19. packages/esm-patient-common-lib/src/orders/store.ts:4-7.** Store indexes items by patient/group. Medications uses medications group, orders reading ungrouped set. packages/esm-patient-common-lib/src/orders/useOrderBasket.ts:71-78 comment details same claim without duplication. Documents inter-unit state sharing.

**20. packages/esm-patient-flags-app/README.md:3.** Module role/integration into chart summary supported by recorded composition relationship. packages/esm-patient-flags-app/package.json:5 repeats module existence; packages/esm-patient-flags-app/src/routes.json:40 description repeats summary integration; README.md:7 API hook is internal functioning rather than another claim.

**21. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:14.** Receiver checks event.data equals close-workspace and calls closure. Communication contract explicit although external emitting page absent from snapshot.

**22. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry-wrapper.component.tsx:21.** Comment identifies embedded O2 page integration: iframe receives src and onLoad removes header, patient-header and breadcrumbs. Visual removal alone would not merit row; here identifies external frontend unit adaptation inside workspace.

**23. packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx:26-27.** URL points to htmlformentryui, including returnUrl=post-message:close-workspace with corresponding receiver. Emission on save/cancel belongs to absent external page, so only local contract side corroborated. Differs from receiver claim in subject/verifiable property.

**24. packages/esm-patient-lists-app/README.md:3-8.** Module declares patient-lists and patient-list-details workspaces. Patient-record-restricted role differs from home management app absent from snapshot; no observed integration with external app claimed. packages/esm-patient-lists-app/package.json:5 description repeats local role.

**25. packages/esm-patient-orders-app/package.json:5.** Orders is own frontend unit aggregating basket orders. README.md:3-4 describes business order-access function, description making microfrontend role explicit. Relationships 50 and 51 document medications/tests composition.

## Summary

Claims: 25 (corroborated: 14, partial: 5, contradicted: 5, uncorroborated: 1). Themes: (structure: 7, composition: 15, other: 3).

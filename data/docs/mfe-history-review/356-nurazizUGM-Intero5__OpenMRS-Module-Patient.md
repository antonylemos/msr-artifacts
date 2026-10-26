---
schema: 1
id: 997746951
full_name: nurazizUGM-Intero5/OpenMRS-Module-Patient
commit: c490ce752bac4d0772f28778fe81434dd6c57a00
inputs:
  clone: data/samples/mfe-sample-001/repos/nurazizUGM-Intero5__OpenMRS-Module-Patient
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 356 — nurazizUGM-Intero5/OpenMRS-Module-Patient

## Repository overview

There are 2,380 reachable commits up to snapshot, from 2019-10-08 to 2025-06-07. Log includes two commits named “Initial commit”, `1bebbfd1` and `14775079`, both from 2019-10-08; they delimit first observable presence in this history, without revealing where code was developed before. Last is `c490ce75` (2025-06-07, “Integrasi Katalog API” (English translation: "API Catalog integration")). Collection is OpenMRS module monorepo described in previous reviews; this stage queries only artifact ambiguities, without building adoption trajectory.

There are five unused dependency declarations in 3.4.2, two event uncertainties and twelve about slots/workspaces in 3.4.4–3.4.5, plus partial or contradicted claims in 3.4.7. No undetermined unit exists in 3.4.3 or undetermined deploy in 3.4.6. Both laboratory slot occurrences and both Biometrics claims were grouped because they concern same uncertainty. External distribution claim was grouped with appointments workspace in same component.

Snapshot was considered first: it shows local contracts, library and app roles, scripts and missing local counterparts. This does not resolve discrepancy origins or external usage. History confirms Biometrics package removal and coexistence of two e2e script discrepancies already in June 2024. Other points remain inconclusive: old blobs are missing or counterpart belongs to shell, distributions or external libraries. Commit messages are distinguished from contents actually read; missing objects triggered no network fetching. Current-path logs do not automatically follow renames or demonstrate original introduction of each construct.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@angular-extensions/elements` declared and unused in `packages/esm-form-entry-app` | 3.4.2 (packages/esm-form-entry-app/package.json:38) | dependency use | b50eb9b3 2021-08-08 Moved form entry | inconclusive |
| 2 | `systemjs-webpack-interop` declared and unused in `packages/esm-form-entry-app` | 3.4.2 (packages/esm-form-entry-app/package.json:61) | dependency use | b50eb9b3 2021-08-08 Moved form entry; 3d1e771d 2023-05-22 (fix) Setup `esm-form-entry` to use webpack module federation (#1168) | inconclusive |
| 3 | `single-spa` declared and unused in `packages/esm-patient-chart-app` | 3.4.2 (packages/esm-patient-chart-app/package.json:53) | dependency use | 28f77b89 2021-03-04 Migrated to monorepo | inconclusive |
| 4 | `single-spa-react` declared and unused in `packages/esm-patient-chart-app` | 3.4.2 (packages/esm-patient-chart-app/package.json:54) | dependency use | 28f77b89 2021-03-04 Migrated to monorepo | inconclusive |
| 5 | `single-spa` declared and unused in `packages/esm-patient-common-lib` | 3.4.2 (packages/esm-patient-common-lib/package.json:39) | dependency use | ddb858ef 2021-04-27 Common lib (#228) | inconclusive |
| 6 | Emitter of `openmrs:form-view-embedded` not identified | 3.4.4 (form-collapse-toggle.component.tsx:15); 3.4.5 #4 | active or abandoned | ef475921 2024-04-29 (feat) O3-3112: Add form collapse toggle to the `esm-form-engine-app` (#1814) | inconclusive |
| 7 | Receiver of `openmrs:form-collapse-toggle` not identified | 3.4.4 (form-collapse-toggle.component.tsx:23-24); 3.4.5 #5 | active or abandoned | ef475921 2024-04-29 (feat) O3-3112: Add form collapse toggle to the `esm-form-engine-app` (#1814) | inconclusive |
| 8 | `config.interpretationSlot` without identified extension | 3.4.4 (obs-graph.component.tsx:113); 3.4.5 #9 | active or abandoned | 6af19736 2022-11-17 Possibility to add an ExtensionSlot under graph (#848) | inconclusive |
| 9 | `top-of-all-patient-dashboards-slot` without provider | 3.4.4 (dashboard-view.component.tsx:66); 3.4.5 #20 | active or abandoned | 8a8f19cb 2022-09-08 fix: Adjust `top-of-all-patient-dashboard-slot` appears before dashboard title (#800) | inconclusive |
| 10 | `visit-form-top-slot` without provider | 3.4.4 (visit-form.workspace.tsx:452); 3.4.5 #23 | active or abandoned | 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (#2169) | inconclusive |
| 11 | `extra-visit-attribute-slot` without provider | 3.4.4 (visit-form.workspace.tsx:547); 3.4.5 #24 | active or abandoned | 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (#2169) | inconclusive |
| 12 | `visit-form-bottom-slot` without provider | 3.4.4 (visit-form.workspace.tsx:562); 3.4.5 #25 | active or abandoned | 164cd3f8 2025-01-09 (fix) O3-4312: Add translation to start visit workspace title (#2169) | inconclusive |
| 13 | `appointments-form-workspace` and external distribution usage unconfirmed | 3.4.4 (active-visit-buttons.tsx:24); 3.4.5 #26; 3.4.7 #17 | active or abandoned | 71a16388 2024-03-05 O3-2857 Add visit actions extension in visits (#1692) | inconclusive |
| 14 | `visit-summary-panels` without provider | 3.4.4 (visit-summary.component.tsx:159); 3.4.5 #28 | active or abandoned | 57a6db1b 2023-07-24 (feat) Add an extension slot for additional visit summary items (#1286) | inconclusive |
| 15 | `slotName ?? title` without identified provider | 3.4.4 (DashboardGroupExtension.tsx:24); 3.4.5 #35 | active or abandoned | 449a6faa 2022-03-09 (feat) O3-1108  Left nav should support groupings (#595) | inconclusive |
| 16 | `medication-info-slot` without provider | 3.4.4 (drug-order-form.component.tsx:213); 3.4.5 #47 | active or abandoned | a371ea27 2024-05-13 (feat) O3 3128: Add extension slots to lab and drug order forms (#1818) | inconclusive |
| 17 | `${matchingOrder.type}-action-menu-items-slot` without provider | 3.4.4 (order-details-table.component.tsx:534); 3.4.5 #52 | active or abandoned | 24cd98cc 2025-04-24 (fix) O3-4419: Fix order type filtering in order details table (#2385) | inconclusive |
| 18 | `${matchingOrder.type}-detail-slot` without provider | 3.4.4 (order-details-table.component.tsx:561); 3.4.5 #53 | active or abandoned | 24cd98cc 2025-04-24 (fix) O3-4419: Fix order type filtering in order details table (#2385) | inconclusive |
| 19 | `top-of-lab-order-form-slot` without provider in both forms | 3.4.4 (general-order-form.component.tsx:169; test-order-form.component.tsx:193); 3.4.5 #54 and #56 | active or abandoned | 14c1f1ff 2024-12-06 (feat) O3-4223: Allow adding different order types in the order basket (#2109) | inconclusive |
| 20 | README retains Biometrics as separate app and composition example with Vitals | 3.4.7 #2 and #6 | conflicting stages | e87b8ace 2023-11-08 BREAKING: Merge vitals and biometrics apps (#1429) | clarified |
| 21 | README calls Common lib a microfrontend | 3.4.7 #3 | conflicting stages | ddb858ef 2021-04-27 Common lib (#228); 04e7221e 2021-07-28 Rewrite the README, removing most of it (#311) | inconclusive |
| 22 | Joint execution through `openmrs develop` só partialmente observável | 3.4.7 #5 | active or abandoned | 04e7221e 2021-07-28 Rewrite the README, removing most of it (#311) | inconclusive |
| 23 | Import map overrides documented without local implementation | 3.4.7 #7 | active or abandoned | 04e7221e 2021-07-28 Rewrite the README, removing most of it (#311) | inconclusive |
| 24 | E2e comment promises all apps, but excludes form-entry | 3.4.7 #10 | conflicting stages | ac9ae85e 2024-06-26 (chore) O3-3372: Use React Form Engine in E2E Tests (#1859) | clarified |
| 25 | E2e comment announces login, but prefixes home and navigation | 3.4.7 #11 | conflicting stages | ac9ae85e 2024-06-26 (chore) O3-3372: Use React Form Engine in E2E Tests (#1859) | clarified |
| 26 | External consumption of library exposed on window unconfirmed | 3.4.7 #15 | active or abandoned | 93fcb73a 2023-10-25 (feat) Supporting O3-2510: Expose patient-common-lib on window (#1430) | inconclusive |
| 27 | Current visit sharing with external patient search unconfirmed | 3.4.7 #16 | active or abandoned | e20f1c9a 2022-03-07 (refactor) esm-patient-chart to organize by functionality; eslint ts files (#594) | inconclusive |
| 28 | External HFE-UI would emit message on save or cancel | 3.4.7 #23 | active or abandoned | 30f4782c 2024-08-26 (feat) O3-3799: Open HTML Form Entry Forms within Form Workspace (#1963) | inconclusive |

## Observations

**1. `@angular-extensions/elements` declared and unused in `packages/esm-form-entry-app`.** Manifest log starts at b50eb9b3 (2021-08-08, “Moved form entry”), but blob is missing. Message of 3d1e771d (2023-05-22, “(fix) Setup `esm-form-entry` to use webpack module federation (#1168)”) announces wrapper configuration; webpack at this stage also could not be read. Earlier usage, replacement or abandonment of elements is not confirmed.

**2. `systemjs-webpack-interop` declared and unused in `packages/esm-form-entry-app`.** Manifest blob at b50eb9b3 and webpack blob at 3d1e771d are missing. Module Federation announcement demonstrates neither fate of systemjs-webpack-interop nor removed call. Unused snapshot declaration remains without historical explanation.

**3. `single-spa` declared and unused in `packages/esm-patient-chart-app`.** Chart manifest and entry log reaches 28f77b89 (2021-03-04, “Migrated to monorepo”); both stage contents are missing. Peer contract retained for external tooling cannot be distinguished from removed import. Current usage through framework does not prove direct package usage in past.

**4. `single-spa-react` declared and unused in `packages/esm-patient-chart-app`.** Same missing manifest and entry at 28f77b89 prevents verifying whether single-spa-react was used directly before delegation to framework observed in snapshot. No intention or usage removal is inferred from declared dependency.

**5. `single-spa` declared and unused in `packages/esm-patient-common-lib`.** Library manifest log reaches ddb858ef (2021-04-27, “Common lib (#228)”), but blob is missing. Message does not reveal single-spa role. No basis asserts earlier usage or abandonment of declaration.

**6. Emitter of `openmrs:form-view-embedded` not identified.** Message of ef475921 announces toggle addition; commit contents are missing. Log subsequently records dc7b090e (2024-06-05, “(fix) Change the form collapse toggle color on tablet (#1857)”), without clarifying event emitter through message. No emitting unit is identified or abandonment proven.

**7. Receiver of `openmrs:form-collapse-toggle` not identified.** Same file sends second event. Contents at ef475921 are unavailable. Knowing when toggle appears identifies neither external listener nor disconnected channel.

**8. `config.interpretationSlot` without identified extension.** Message of 6af19736 announces ExtensionSlot under graph, but contents and first current-path contents (dddc1457) are missing. Empty default in snapshot (config-schema.ts:19-23) explains local rendering condition without identifying external configuration or earlier usage.

**9. `top-of-all-patient-dashboards-slot` without provider.** Message of 8a8f19cb announces dashboard slot position adjustment; it does not demonstrate supplying unit. Initial current-path contents at e20f1c9a are missing. Whether slot lost consumer or remains external extension point cannot be concluded.

**10. `visit-form-top-slot` without provider.** Current-path log begins in 164cd3f8, whose blob is missing. File changes are insufficient to date specific slot or show removed provider. Path before possible reorganizations is not reconstructed.

**11. `extra-visit-attribute-slot` without provider.** Unavailable contents at 164cd3f8 prevent comparing slot with stage. Current call without local registration does not demonstrate abandonment; file change log identifies no consumers.

**12. `visit-form-bottom-slot` without provider.** Same content limitation at 164cd3f8 prevents establishing history of second form extension point. Target unit is not inferred through proximity to other slots.

**13. `appointments-form-workspace` and external distribution usage unconfirmed.** Contents at 71a16388 are missing. Message announces visit actions without identifying appointments registration or other distribution manifests. Snapshot contains button and external distribution comment (active-visit-buttons.tsx:15), but neither proves external integration or abandonment.

**14. `visit-summary-panels` without provider.** Message of 57a6db1b announces slot for additional summary items; change contents were not inspected. First queried path blob, at 9970d8a5, is missing. Message resolves neither slot provider nor consumer removal.

**15. `slotName ?? title` without identified provider.** Log reaches 449a6faa, whose message announces navigation groupings. Stage blob is missing; when current expression appeared or which units would configure groups cannot be determined. Helper existence does not prove external connection.

**16. `medication-info-slot` without provider.** Message of a371ea27 announces slots in order forms. Initial contents queried at 64389b35 are missing; announced commit contents were not read. Message identifies no providing extensions or proves abandonment.

**17. `${matchingOrder.type}-action-menu-items-slot` without provider.** Contents at 24cd98cc could be read and already contain dynamic slot; current-path log records only this commit up to snapshot. This establishes presence at path and later stability, rather than original introduction: file may have come from another path. Consumer remains unidentified.

**18. `${matchingOrder.type}-detail-slot` without provider.** Same contents at 24cd98cc already contain second dynamic slot and path log has no later change. This does not show whether external extension ever filled it or was disconnected. File stability is not confused with usage clarification.

**19. `top-of-lab-order-form-slot` without provider in both forms.** Both current paths appear in log at 14c1f1ff, whose message announces different order types in basket; both blobs are missing. Same uncertainty was grouped because both forms mount same slot. Neither slot introduction, removed provider nor abandonment is proven.

**20. README retains Biometrics as separate app and composition example with Vitals.** Name-status of e87b8ace confirms removal of README, manifest, entry and routes.json of esm-patient-biometrics-app, with biometric file additions in vitals app. This supports stage change announced by merge message without asserting moved-content identity, since old blobs were not read. README at this commit is missing, but snapshot still points to removed directory and uses it in development command (README.md:11, :50-53). Discrepancy refers to previously existing unit; original example creation is not dated.

**21. README calls Common lib a microfrontend.** Snapshot resolves current role as library, but not origin of inclusion in microfrontend list. Message of ddb858ef announces Common lib and 04e7221e announces README rewrite. Library manifest and README blobs are missing, preventing verification of whether expression described another organization or was always inaccurate.

**22. Joint execution through `openmrs develop` only partially observable.** Snapshot shows script and documentation, but tooling executing --sources is external. Old README queried at 04e7221e is missing; log provides neither external implementation nor clarification of possible contract change. Corpus limitation is not transformed into abandonment evidence.

**23. Import map overrides documented without local implementation.** Serve scripts exist in snapshot; overrides belong to external environment described by README. Old contents at 04e7221e are unavailable. Documentation and file log do not show whether external shell retains feature or local configuration was removed.

**24. E2e comment promises all apps, but excludes form-entry.** Script at ac9ae85e was read: already contains comment “all the apps” and filter excluding form-entry-app. Path log has no later change up to snapshot. Message announces React Form Engine usage in tests. Thus comment and exclusion provably coexist since this stage; discrepancy should not be attributed to later change. Initial contents at 07069195 are missing, so first discrepancy occurrence is not dated.

**25. E2e comment announces login, but prefixes home and navigation.** Same script at ac9ae85e already has login comment and object prefixing only esm-primary-navigation-app and esm-home-app. File does not change afterward up to snapshot. Discrepancy already coexisted then, without reconstructing origin: script at 07069195 is missing. Login never mounted in another stage or by external shell is not asserted.

**26. External consumption of library exposed on window unconfirmed.** Message of 93fcb73a announces patient-common-lib exposure on window, but src/index.ts is missing. Snapshot confirms assignment and ngx-formentry import without showing global consumer. Message does not prove alleged consumption, duration or abandonment.

**27. Current visit sharing with external patient search unconfirmed.** Initial queried component contents at e20f1c9a are missing. Snapshot shows clearing with setCurrentVisit, but not external Active Visit Tag cited in comment. Local log cannot verify consumer or conclude whether comment describes current integration or earlier stage.

**28. External HFE-UI would emit message on save or cancel.** Message of 30f4782c announces opening HTML forms in workspace; stage contents are missing. URL and local receiver exist in snapshot, but HFE-UI emitter is external. Emission on save/cancel events is not historically confirmed, nor contract abandonment inferred.

## Commands

All historical hashes used in readings appear in snapshot-limited logs below; they are ancestors. The `show hash:caminho` commands read contents, and last `show --name-status` reads only change metadata. Indicated failures concern missing objects, without download.

```sh
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient rev-list --count c490ce752bac4d0772f28778fe81434dd6c57a00
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- README.md packages/esm-patient-biometrics-app
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-form-entry-app/package.json packages/esm-form-entry-app/webpack.config.js
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- e2e/support/github/run-e2e-docker-env.sh
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/package.json
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-common-lib/package.json
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-orders-app/src/components/order-details-table.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/index.ts
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient log --format=%h%x09%cs%x09%s c490ce752bac4d0772f28778fe81434dd6c57a00 -- packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 28f77b89:packages/esm-patient-chart-app/package.json # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show ddb858ef:packages/esm-patient-common-lib/package.json # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show ef475921:packages/esm-form-engine-app/src/form-collapse-toggle/form-collapse-toggle.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show dddc1457:packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show e20f1c9a:packages/esm-patient-chart-app/src/patient-chart/chart-review/dashboard-view.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 164cd3f8:packages/esm-patient-chart-app/src/visit/visit-form/visit-form.workspace.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 71a16388:packages/esm-patient-chart-app/src/visit/visits-widget/active-visit-buttons/active-visit-buttons.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 9970d8a5:packages/esm-patient-chart-app/src/visit/visits-widget/past-visits-components/visit-summary.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 449a6faa:packages/esm-patient-common-lib/src/nav-group/DashboardGroupExtension.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 64389b35:packages/esm-patient-medications-app/src/add-drug-order/drug-order-form.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 24cd98cc:packages/esm-patient-orders-app/src/components/order-details-table.component.tsx
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 14c1f1ff:packages/esm-patient-orders-app/src/order-basket/general-order-type/general-order-form/general-order-form.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 14c1f1ff:packages/esm-patient-tests-app/src/test-orders/add-test-order/test-order-form.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 28f77b89:packages/esm-patient-chart-app/src/index.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show e20f1c9a:packages/esm-patient-chart-app/src/patient-chart/patient-chart.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 30f4782c:packages/esm-patient-forms-app/src/htmlformentry/html-form-entry.workspace.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show b50eb9b3:packages/esm-form-entry-app/package.json # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 3d1e771d:packages/esm-form-entry-app/webpack.config.js # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 6af19736:packages/esm-generic-patient-widgets-app/src/obs-graph/obs-graph.component.tsx # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 93fcb73a:packages/esm-patient-chart-app/src/index.ts # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 07069195:e2e/support/github/run-e2e-docker-env.sh # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show ac9ae85e:e2e/support/github/run-e2e-docker-env.sh
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show 04e7221e:README.md # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show e87b8ace:README.md # failed: bad object (missing object)
docs/mfe-history-review/tools/hist.sh nurazizUGM-Intero5__OpenMRS-Module-Patient show --format=%h%x09%cs%x09%s --name-status --no-renames e87b8ace -- packages/esm-patient-biometrics-app packages/esm-patient-vitals-app
```

Comparison was performed before and after queries, with empty output and code 0 in both:

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

## Summary

Commits up to the snapshot: 2380 (2019-10-08 to 2025-06-07). Points: 28 (clarified: 3, inconclusive: 25, resolved by the snapshot: 0).

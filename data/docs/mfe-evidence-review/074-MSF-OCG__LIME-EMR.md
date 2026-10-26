---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
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

# 074 — MSF-OCG/LIME-EMR

## Repository overview

OpenMRS 3 distribution packaged through Maven for three sites (Mosul, Matsapha and Bunia), without any frontend application code. Dependency review has no inspected-technology dependency, source review no construct, composition/build-deployment reviews no rows. Thus no observations in dimensions 1, 3, 5 and 6. Both candidate directories `No`: root Playwright test package/Docsify site (#14, #15).

Architecture appears only in configuration, chain ending outside snapshot:
- **Assembly:** `spa-assemble-config.json` pins app-shell version/lists 42 versioned external modules plus six exclusions (#1). Strongest repository declaration, naming composed units.
- **Per-site import map:** each site removes modules from import map/route registry at build (#2 through #4).
- **Slot extensions:** distro UI configuration puts `patient-flags-list`/follow-up table in patient-chart slots (#5). Other configurations remove extensions from other-module slots (#6 through #13).

Composing host `@openmrs/esm-app-shell` external. Build-generated maps (`importmap.json`, `routes.registry.json`) absent from snapshot. No observation links two snapshot units. Configure composition whose parts all in other repositories, per classification (`multi-repo`, 42 units).

`extensionSlots` blocks with `add`/`remove` treated as configuration-declared registrations putting/removing module extension in another’s slot. Excluded blocks only adjusting options, feature flags or `Display conditions` (e.g. distro/configs/openmrs/frontend_config/msf-frontend-config.json:222-231, 273-283). Also excluded `SPA_CONFIG_URLS` list/assembling executions because identify configuration files rather than remotes. Same reason excludes `distro/pom.xml` line pointing assembly script at configuration (distro/pom.xml:493-494), packaging/Docker images, Groovy build-code scripts.

Documentation has 29 claims, all weak under protocol: 11 corroborated, 10 partial, 7 contradicted, 1 uncorroborated. Confirms configuration mechanism (#21, #29, #30, #33, #35, #36, #39) but misleads on:
- module counts/core version (#20, #28; history does not clarify, #46);
- all-site inheritance of follow-up table/task app (#31, #34);
- module definition location (#42);
- automatic CI deployment/"desativadas" images (English translation: "disabled") (#18, #41; history explains former, #45).

App-shell runtime-dependent behavior lacks artifact: import-map loading, configuration precedence/orphan-route effect (#24, #38, #43, #44). Container infrastructure, publication pipeline/images remain context (#16, #18, #19, #25, #26, #41).

No ambiguous observation. Three inconclusive historical points concern past only (#46, #49, #50), each with clear snapshot.

## Observations

### 1. distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:2-55

**Observation:** `coreVersion` is `10.0.1-pre.5320` (:2). `frontendModules` lists 42 versioned packages, 39 `@openmrs/` and 3 `@madiro/` (:3-46). `frontendModuleExcludes` lists six defaults preceded by `__comment` "Excluding modules some default modules to ensure we are using the specified versions." (:47-55).

**Interpretation:** Distro-level file declares app-shell version/external frontend units composing application. Build passes to Ozone-inherited assembly script (distro/pom.xml:493-494). Per 3.4.5, app-shell loads bundles through build-generated import map. Neither app-shell, modules nor map in snapshot.

### 2. sites/bunia/pom.xml:318-331

**Observation:** Execution `remove-importmap-entries` in phase `process-resources` passes `modulesToRemove` = `@madiro/esm-mental-health-app,@madiro/esm-nutrition-app` (:326-327) to `scripts/remove-importmap-entries.groovy` (:331).

**Interpretation:** Bunia removes two modules from distro-inherited composition, deleting build-assembled import-map/route-registry entries.

**Note:** Strength `moderate`. Block names external units but excludes them without linking to any unit. Configures site distribution import-map mechanism.

### 3. sites/matsapha/pom.xml:273-286

**Observation:** Execution `remove-importmap-entries` in phase `process-resources` passes `modulesToRemove` = `@madiro/esm-mental-health-app,@madiro/esm-nutrition-app,@openmrs/esm-ward-app` (:281-282) to `scripts/remove-importmap-entries.groovy` (:286).

**Interpretation:** Matsapha removes three modules from distro-inherited composition, in import map/route registry.

**Note:** Strength `moderate`, same reason as #2.

### 4. sites/mosul/pom.xml:220-234

**Observation:** Execution `remove-importmap-entries` in phase `process-resources` passes `modulesToRemove` = `@openmrs/esm-ward-app,@openmrs/esm-patient-task-list-app` (:228-229) to `scripts/remove-importmap-entries.groovy` (:233).

**Interpretation:** Mosul removes two modules from distro-inherited composition, including task app.

**Note:** Strength `moderate`, same reason as #2.

### 5. distro/configs/openmrs/frontend_config/msf-frontend-config.json:27-221

**Observation:** Within `@openmrs/esm-patient-chart-app` block, `extensionSlots` adds `patient-flags-list` and `obs-table-horizontal-widget` to `patient-chart-test-results-dashboard-slot` (:37-39). Also adds differently tagged `patient-flags-list` to `patient-chart-summary-dashboard-slot`, `patient-chart-medications-dashboard-slot`, `conditions-summary-dashboard` and `patient-appointments-summary-dashboard` (:146-176). Other block slots only adjust extension `Display conditions`.

**Interpretation:** Distro UI configuration puts other-module extensions in patient-chart slots. `patient-flags-list` from assembled flags module (#1, :13). Declared link between two external units, applied by app-shell at runtime.

### 6. sites/mosul/configs/openmrs/frontend_config/msf-mosul-frontend-config.json:18-165

**Observation:** Within `@openmrs/esm-patient-chart-app` block, `extensionSlots` removes `obs-table-horizontal-widget` from `patient-chart-test-results-dashboard-slot` (:25-26). Also removes `clinical-view-section`, `patient-mental-health-summary-dashboard` and `patient-nutrition-summary-dashboard` from `patient-chart-dashboard-slot` (:33-38). No `add` in block.

**Interpretation:** Site undoes distro patient-chart extensions (#5) and mental-health/nutrition module summaries.

**Note:** Strength `moderate`. Block names other-unit extensions to remove from slot rather than link units. Configures one unit’s slot mechanism.

### 7. sites/bunia/configs/openmrs/frontend_config/msf-bunia-frontend-config.json:18-167

**Observation:** Within `@openmrs/esm-patient-chart-app` block, `extensionSlots` removes `obs-table-horizontal-widget` from `patient-chart-test-results-dashboard-slot` (:27-28). Also removes `clinical-view-section`, `patient-mental-health-summary-dashboard` and `patient-nutrition-summary-dashboard` from `patient-chart-dashboard-slot` (:35-40). No `add` in block.

**Interpretation:** Bunia performs same patient-chart removal as Mosul (#6).

**Note:** Strength `moderate`, same reason as #6.

### 8. sites/matsapha/configs/openmrs/frontend_config/msf-matsapha-frontend-config.json:18-165

**Observation:** Within `@openmrs/esm-patient-chart-app` block, `extensionSlots` removes `obs-table-horizontal-widget` from `patient-chart-test-results-dashboard-slot` (:25-26). Also removes `clinical-view-section`, `patient-mental-health-summary-dashboard` and `patient-nutrition-summary-dashboard` from `patient-chart-dashboard-slot` (:33-38). No `add` in block.

**Interpretation:** Matsapha performs same patient-chart removal as Mosul (#6).

**Note:** Strength `moderate`, same reason as #6.

### 9. distro/configs/openmrs/frontend_config/msf-frontend-config.json:2-17

**Observation:** Within `@madiro/esm-home-app` block, `extensionSlots` removes `service-queues-dashboard-link` from `homepage-dashboard-slot` (:4-5). Other block slot only adjusts `Display conditions` of `active-visits-widget` (:7-14).

**Interpretation:** Distro removes other-module link extension from home page (3.4.7 #18).

**Note:** Strength `moderate`, same reason as #6.

### 10. sites/bunia/configs/openmrs/frontend_config/msf-bunia-frontend-config.json:2-8

**Observation:** Within `@madiro/esm-home-app` block, `extensionSlots` removes `service-queues-dashboard-link` from `homepage-dashboard-slot` (:4-5).

**Interpretation:** Bunia repeats distro removal (#9).

**Note:** Strength `moderate`, same reason as #6.

### 11. sites/matsapha/configs/openmrs/frontend_config/msf-matsapha-frontend-config.json:2-8

**Observation:** Within `@madiro/esm-home-app` block, `extensionSlots` removes `service-queues-dashboard-link` from `homepage-dashboard-slot` (:4-5).

**Interpretation:** Matsapha repeats distro removal (#9).

**Note:** Strength `moderate`, same reason as #6.

### 12. sites/mosul/configs/openmrs/frontend_config/msf-mosul-frontend-config.json:2-8

**Observation:** Within `@madiro/esm-home-app` block, `extensionSlots` removes `service-queues-dashboard-link` from `homepage-dashboard-slot` (:4-5).

**Interpretation:** Mosul repeats distro removal (#9).

**Note:** Strength `moderate`, same reason as #6.

### 13. distro/configs/openmrs/frontend_config/msf-frontend-config.json:249-267

**Observation:** Within `@openmrs/esm-primary-navigation-app` block, `extensionSlots` removes `offline-tools-patient-chart-actions-dashboard-link` from `patient-chart-dashboard-slot` (:254-255). Other block slot only adjusts `Display conditions` of `dispensing-link` (:257-264).

**Interpretation:** Distro removes offline-tools link from patient-chart dashboard.

**Note:** Strength `moderate`, same reason as #6.

### 14. .; package.json:5; package.json:6-9

**Observation:** Root `package.json` declares absent snapshot `main: index.js` (:5), only `playwright test` scripts (:6-9). No workspace/deployment.

**Interpretation:** Distribution e2e test package rather than frontend unit.

### 15. docs; docs/index.html:15-35

**Observation:** `docs/index.html` has `<div id="app">`, configures `window.$docsify` with CDN scripts (:15-35). No build/publication workflow.

**Interpretation:** Docsify documentation site rather than system frontend unit.

### 16. README.md:101

**Observation:** "**Containerized** -- Docker Compose orchestration with Traefik SSL".

**Interpretation:** Concerns container infrastructure. Snapshot has Traefik compose, `frontend` service override/frontend image, main compose external. Claim partial.

### 17. README.md:129

**Observation:** "**Distro** (`/distro`) -- Organization-wide MSF base configuration. Defines backend modules, frontend modules, […] shared across all MSF sites."

**Interpretation:** Says frontend modules defined once in distro/inherited by sites. Assembly list (#1)/sites unpacking distro ZIP confirm. Claim corroborated.

### 18. README.md:149-150

**Observation:** diagram "GitHub Repository" "Maven build" "ZIP Artifacts + Docker Images" […] "GitHub Actions deploy" "Execution Server".

**Interpretation:** Concerns distribution publication pipeline. ZIPs/images confirmed but sole deploy-workflow invocation commented. Claim contradicted.

### 19. README.md:160-181

**Observation:** diagram "Runtime Services": "OpenMRS Frontend (ESM)" […] "REST API" […] "OpenMRS Backend (Java 8)"; "Traefik (SSL)" […] "SSL termination" […] "OpenMRS Frontend (ESM)".

**Interpretation:** Places frontend as single service alongside backend/proxy. Snapshot only service overrides/Traefik without frontend route. Claim partial.

### 20. README.md:189

**Observation:** "**Frontend** | OpenMRS 3 ESM microfrontend architecture (41 modules), plus custom Madiro modules (Nutrition, Mental Health)".

**Interpretation:** Describes ESM microfrontend architecture. Type matches assembly (#1), count differs: 42 modules, README excluding `@madiro/esm-home-app`. Claim contradicted.

### 21. README.md:262

**Observation:** "frontend_assembly/ # spa-assemble-config.json (frontend module versions)".

**Interpretation:** Locates module/version list. Matches #1. Claim corroborated.

### 22. README.md:325

**Observation:** "Configuration types that can be overridden at each level: […] Frontend ESM modules (JS bundles)".

**Interpretation:** Says each level can replace frontend modules. Sites only remove import-map modules (#2 through #4). Distro has bundle replacement mechanism (distro/pom.xml:641-655), no snapshot frontend override. Claim partial.

### 23. README.md:326

**Observation:** "Frontend JSON config files (branding, UI widgets, dashboards)" (can be overridden at each level).

**Interpretation:** Says UI configuration overridden per level. Site adds own configuration/undoes distro extension (#6 over #5). Claim corroborated.

### 24. README.md:332

**Observation:** "**Frontend config inheritance** uses `SPA_CONFIG_URLS` in the Docker `.env` file to load multiple JSON configs in order, with later files overriding earlier ones".

**Interpretation:** Describes app-shell configuration loading. Ordered build-list assembly confirmed. Last-wins ordered loading is external app-shell behavior without artifact. Claim partial.

### 25. README.md:391

**Observation:** "**Update** the `.env` file with the site frontend config URL (`maven-antrun-plugin`)".

**Interpretation:** Describes per-site build step. Three `maven-antrun-plugin` executions confirm. Claim corroborated.

### 26. README.md:504

**Observation:** "The `bundled-docker` Maven profile builds pre-configured Docker images and pushes them to Docker Hub under the `msfocg` registry."

**Interpretation:** Concerns distribution image publication. Profile/CI confirm. Claim corroborated.

### 27. README.md:516

**Observation:** "`msfocg/<site>-openmrs-frontend` | amd64, arm64 | OpenMRS frontend SPA with all ESM modules".

**Interpretation:** Says all modules published together in per-site frontend image. Image/platforms confirmed, contents not because Dockerfile generated externally. Claim partial.

### 28. README.md:585

**Observation:** "**Frontend module versions** are defined in […] `spa-assemble-config.json` (Core UI 8.0.1, 40+ ESM modules plus custom Madiro Nutrition and Mental Health apps)".

**Interpretation:** Locates module list/gives numbers. Location/count match #1, core version does not (`10.0.1-pre.5320`). Claim contradicted.

### 29. README.md:823-831

**Observation:** "Flags are filtered by tag and surface in the relevant patient chart dashboard tab" (Test Results, Summary, Medications, Conditions, Appointments).

**Interpretation:** Says where flags extension appears inside another module. Five slots/tags in #5. Claim corroborated.

### 30. README.md:838

**Observation:** "Frontend widget placement: `msf-frontend-config.json` → `patient-flags-list` extension in `@openmrs/esm-patient-chart-app` slots".

**Interpretation:** Names flags-extension/patient-chart slot link. Declared by #5, both modules assembled (#1). Claim corroborated.

### 31. README.md:874-876

**Observation:** "**Status:** Enabled at distro level and inherited by all sites." (follow-up table, `obs-table-horizontal-widget` in `patient-chart-test-results-dashboard-slot`).

**Interpretation:** Distro inserts widget in slot (#5), all three sites removing it (#6 through #8). All-site inheritance disproven. Claim contradicted.

### 32. README.md:897

**Observation:** "Tasks are accessed through the dedicated **Tasks app** in the main navigation."

**Interpretation:** Names task app as own unit. Assembled (#1), navigation access lacks artifact. Claim partial.

### 33. README.md:897

**Observation:** "The service queues dashboard link is intentionally removed from the homepage across all configurations".

**Interpretation:** Concerns extension removed from another module’s slot. Distro/three sites perform removal (#9 through #12). Claim corroborated.

### 34. README.md:901

**Observation:** "**Status:** Enabled at distro level and inherited by all sites." (tasks).

**Interpretation:** Mosul removes task app from import map (#4), so frontend part does not reach all sites. Claim contradicted.

### 35. README.md:1029

**Observation:** "To remove (hide) a frontend app for a specific site without affecting other sites, edit the site's frontend configuration JSON file".

**Interpretation:** Says site composition adjusted through configuration. Mosul removes mental-health/nutrition summaries this way (#6). Claim corroborated.

### 36. README.md:1033

**Observation:** "Use the `\"remove\"` property in an `extensionSlots` configuration to hide the app's UI elements from the page".

**Interpretation:** Names slot-removal mechanism. Used by site/distro (#6, #9, #13). Claim corroborated.

### 37. README.md:1051

**Observation:** "Set `\"Display conditions\"` with a privilege that no role at the site has, effectively hiding it from all users".

**Interpretation:** Names privilege visibility mechanism. Present in distro for restriction only. Hiding from everyone absent. Claim partial.

### 38. README.md:1063-1065

**Observation:** "**Option C: Remove importmap entries via the build (site-level)** […] This strips the specified modules from the importmap at build time so they are never loaded for that site".

**Interpretation:** Describes per-site import-map unit removal. Three-site executions confirm build removal (#2 through #4). "never loaded" is app-shell runtime behavior without artifact. Claim partial.

### 39. README.md:1092

**Observation:** "If the app should be excluded from **all** sites, add it to the `frontendModuleExcludes` array in `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json`".

**Interpretation:** Says all-site unit exclusion occurs in distro assembly. List in #1. Claim corroborated.

### 40. distro/pom.xml:641-642

**Observation:** "Loaded custom patient documents module and ESM patient banner app for stickers functionality. […] Kept for manual override capability if needed."

**Interpretation:** Concerns replacement of unit bundle with own version. `apply-overrides` execution active, no snapshot frontend override; own-banner loading reports past. Claim partial.

### 41. distro/pom.xml:885

**Observation:** "Disable builidng and pushing distro docker images".

**Interpretation:** Concerns image publication. `build`/`push` executions active, CI enabling profile. Claim contradicted.

### 42. docs/README.md:109

**Observation:** "Frontend modules | `frontend_config/` | JSON" (tabela "Configuration types").

**Interpretation:** Places module definition in UI configuration folder. Module list in `frontend_assembly/` (#1). Claim contradicted.

### 43. scripts/remove-importmap-entries.groovy:7-9

**Observation:** "A module is declared in two places that must stay in sync: importmap.json […] -> where the app-shell loads the bundle from; routes.registry.json […] -> the app's pages and extensions".

**Interpretation:** Describes external host loading/registering each unit. Script confirms both maps have per-module entries, maps generated/app-shell external. Claim partial.

### 44. scripts/remove-importmap-entries.groovy:11-15

**Observation:** "Removing a module from the importmap alone leaves its extensions registered against slots […]. The app-shell then retries resolving a package that the importmap cannot supply […] until the browser tab runs out of memory and crashes."

**Interpretation:** Describes external app-shell runtime loading behavior. Claim uncorroborated.

### 45. 758d373 2025-12-16 (.github/workflows/ci.yml, version absent); 7d6db6b 2026-01-08 (.github/workflows/deploy.yml, .github/workflows/run-e2e-tests.yml, .github/workflows/ci.yml, version absent); c08eeee 2026-01-10 (.github/workflows/ci.yml, version absent); a590846 2026-02-12 (.github/workflows/ci.yml, version absent); 1c1b728 2026-03-21 (.github/workflows/ci.yml, version absent); 7312d4c 2026-03-21 (.github/workflows/ci.yml, version absent); 90bdc3a 2026-07-03 (.github/workflows/ci.yml)

**Observation:** Two commit messages announce automatic dev/UAT deployment. Second creates deploy/test workflows present in snapshot. `ci.yml` changes in five further commits, `c08eeee` through `90bdc3a`, earlier versions unavailable.

**Interpretation:** Snapshot commented invocation is remnant of introduced deployment chain rather than never-connected plan. History does not establish when/why disabled.

### 46. 6abb17e 2026-06-22 (message: "migrate to using @madiro/esm-home-app"); 9de5ce9 2026-05-14 (README.md, version absent); c852c54 2026-07-20 (README.md); 886cd9b 2026-08-21 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json); eb80724 2026-09-03 (message: "Update @madiro scoped packages with openmrs framework 10x"); c8fb59c 2026-09-19 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json)

**Observation:** Snapshot README from `c852c54`. Afterwards assembly configuration changes six times, `886cd9b` through `c8fb59c`, `eb80724` announcing `@madiro` package update to framework 10. README-omitted module enters per message in `6abb17e`. Old README/configuration versions unavailable.

**Interpretation:** Unknown when README numbers written or whether matched then-current configuration. Past-only question: snapshot assembly has 42 modules/core `10.0.1-pre.5320`.

### 47. 792c607 2025-05-08 (scripts/apply-overrides.groovy, distro/pom.xml, distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip); 2b6b9e6 2025-05-09 (distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip); a48c566 2025-05-15 (distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip); 3bdf66f 2025-12-04 (distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip, distro/configs/openmrs/frontend_assembly/spa-assemble-config.json, distro/pom.xml); 8324e11 2026-02-14 (distro/configs/openmrs/overrides/modules/drools-1.1.0-SNAPSHOT.omod)

**Observation:** Banner override enters with script in `792c607`, changed in `2b6b9e6` and `a48c566`, deleted in `3bdf66f` alongside backend overrides. No further `overrides/frontend` file created through snapshot. In `overrides/modules`, `8324e11` adds backend module.

**Interpretation:** Unit-bundle replacement existed May through December 2025, then abandoned. Script still connected to build without frontend override.

### 48. 9af9025 2026-03-09 (distro/configs/openmrs/frontend_config/msf-frontend-config.json); c852c54 2026-07-20 (README.md); f71c4f5 2026-09-09 (sites/mosul/configs/openmrs/frontend_config/msf-mosul-frontend-config.json, sites/matsapha/configs/openmrs/frontend_config/msf-matsapha-frontend-config.json, sites/bunia/configs/openmrs/frontend_config/msf-bunia-frontend-config.json)

**Observation:** Widget enters distro only in `9af9025`. README last changes in `c852c54`. Three site configurations remove it together in `f71c4f5`, message saying "is only meant to be visible on demo/distro".

**Interpretation:** README claim from stage all sites inherited widget. Site removal came later.

### 49. d63ea0e 2026-02-13 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json); e88d16f 2026-03-24 (sites/mosul/pom.xml, sites/matsapha/pom.xml, sites/bunia/pom.xml); e36c0c4 2026-04-22 (message: "Bunia - enable task lists"); c852c54 2026-07-20 (README.md); 3862541 2026-08-12 (message: "Re-enable patient task list app for Matsapha")

**Observation:** Task app enters assembly in `d63ea0e`, removed from three sites in `e88d16f`. Messages report return to Bunia (`e36c0c4`, 2026-04-22) and Matsapha (`3862541`, 2026-08-12). README changed before, within and after interval, older versions unavailable.

**Interpretation:** Unknown whether README sentence remains from all-site task-app stage. Past-only question: snapshot Mosul removes app from import map.

### 50. 272b488 2025-11-17 (message: "Build docker images using Bundled-docker and CLI"); 7de2fbe 2026-02-24 (message: "Enable building and deploying of Distro images using bundled docker"); 185e757 2026-02-26 (message: "Fix pushing distro docker images dev tags on snapshot build workflow"); c8fb59c 2026-09-19 (message: "Stop the registration form crashing on the address hierarchy")

**Observation:** Messages suggest stage without distro image builds until `7de2fbe`. `distro/pom.xml` changed in 84 commits, prior versions unavailable.

**Interpretation:** Unknown when comment written. Past-only question: snapshot executions active.

### 51. c60c10b 2024-04-11 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json, distro/configs/openmrs/frontend_config/msf-frontend-config.json); d29d101 2024-05-16 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json); b2e8d52 2024-05-26 (distro/configs/openmrs/frontend_assembly/spa-assemble-config.json); 5e8bc05 2025-05-20 (docs/README.md); 9de5ce9 2026-05-14 (docs/README.md)

**Observation:** Module list in `frontend_assembly/` since first commit. Deleted/recreated at same location in 2024. `docs/README.md` created/changed later.

**Interpretation:** Table not remnant of earlier organization. Modules never defined in `frontend_config/`.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.7 #2, #5, #6, #13, #15, #17, #19, #24, #27 (Evidence) | 2 configuration | configuration | import-maps | architectural | strong | — |
| 2 | 3.4.7 #7, #23 (Evidence) | 2 configuration | configuration | import-maps | architectural | moderate | configures scripts/remove-importmap-entries.groovy:71-100 |
| 3 | 3.4.7 #7, #23 (Evidence) | 2 configuration | configuration | import-maps | architectural | moderate | configures scripts/remove-importmap-entries.groovy:71-100 |
| 4 | 3.4.7 #7, #19, #23 (Evidence) | 2 configuration | configuration | import-maps | architectural | moderate | configures scripts/remove-importmap-entries.groovy:71-100 |
| 5 | 3.4.7 #8, #14, #15, #16, #27 (Evidence) | 2 configuration | configuration | other | architectural | strong | — |
| 6 | 3.4.7 #8, #9, #16, #20, #21 (Evidence) | 2 configuration | configuration | other | architectural | moderate | — |
| 7 | 3.4.7 #16 (Evidence) | 2 configuration | configuration | other | architectural | moderate | — |
| 8 | 3.4.7 #16 (Evidence) | 2 configuration | configuration | other | architectural | moderate | — |
| 9 | 3.4.7 #18, #21, #27 (Evidence) | 2 configuration | configuration | other | architectural | moderate | — |
| 10 | 3.4.7 #18 (Evidence) | 2 configuration | configuration | other | architectural | moderate | — |
| 11 | 3.4.7 #18 (Evidence) | 2 configuration | configuration | other | architectural | moderate | — |
| 12 | 3.4.7 #18 (Evidence) | 2 configuration | configuration | other | architectural | moderate | — |
| 13 | 3.4.7 #21 (Evidence) | 2 configuration | configuration | other | architectural | moderate | — |
| 14 | 3.4.3 (.) | 4 structure | directory | — | context | weak | — |
| 15 | 3.4.3 (docs) | 4 structure | directory | — | context | weak | — |
| 16 | 3.4.7 #1 | 7 documentation | documentation | — | context | weak | partially corroborates scripts/docker-compose-traefik.yml:6-11; partially corroborates scripts/docker-compose-openmrs-override.yml:16-18; partially corroborates distro/pom.xml:901-909 |
| 17 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | corroborates #1; corroborates sites/mosul/pom.xml:22-29, 36-48 |
| 18 | 3.4.7 #3 | 7 documentation | documentation | — | context | weak | contradicts .github/workflows/ci.yml:25-48; contradicts .github/workflows/deploy.yml:3-4 |
| 19 | 3.4.7 #4 | 7 documentation | documentation | — | context | weak | partially corroborates scripts/docker-compose-openmrs-override.yml:2-3, 16-18; partially corroborates scripts/docker-compose-traefik.yml:6-26 |
| 20 | 3.4.7 #5 | 7 documentation | documentation | — | architectural | weak | contradicts #1 |
| 21 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | corroborates #1 |
| 22 | 3.4.7 #7 | 7 documentation | documentation | — | architectural | weak | partially corroborates #2; partially corroborates #3; partially corroborates #4; partially corroborates distro/pom.xml:641-655 |
| 23 | 3.4.7 #8 | 7 documentation | documentation | — | technological | weak | corroborates #5; corroborates #6; corroborates sites/mosul/pom.xml:171-183 |
| 24 | 3.4.7 #9 | 7 documentation | documentation | — | technological | weak | partially corroborates distro/pom.xml:446-447, 459-463; partially corroborates sites/mosul/pom.xml:179-182; partially corroborates #6 |
| 25 | 3.4.7 #10 | 7 documentation | documentation | — | context | weak | corroborates sites/mosul/pom.xml:171-183; corroborates sites/matsapha/pom.xml:224-237; corroborates sites/bunia/pom.xml:238-251 |
| 26 | 3.4.7 #11 | 7 documentation | documentation | — | context | weak | corroborates distro/pom.xml:742-746, 958-971; corroborates .github/workflows/maven-publish.yml:107-108 |
| 27 | 3.4.7 #12 | 7 documentation | documentation | — | architectural | weak | partially corroborates distro/pom.xml:901-909; partially corroborates sites/mosul/pom.xml:429-440 |
| 28 | 3.4.7 #13 | 7 documentation | documentation | — | architectural | weak | contradicts #1 |
| 29 | 3.4.7 #14 | 7 documentation | documentation | — | architectural | weak | corroborates #5 |
| 30 | 3.4.7 #15 | 7 documentation | documentation | other | architectural | weak | corroborates #5; corroborates #1 |
| 31 | 3.4.7 #16 | 7 documentation | documentation | — | architectural | weak | contradicts #6; contradicts #7; contradicts #8 |
| 32 | 3.4.7 #17 | 7 documentation | documentation | — | architectural | weak | partially corroborates #1 |
| 33 | 3.4.7 #18 | 7 documentation | documentation | — | architectural | weak | corroborates #9; corroborates #10; corroborates #11; corroborates #12 |
| 34 | 3.4.7 #19 | 7 documentation | documentation | — | architectural | weak | contradicts #4 |
| 35 | 3.4.7 #20 | 7 documentation | documentation | — | architectural | weak | corroborates #6 |
| 36 | 3.4.7 #21 | 7 documentation | documentation | other | technological | weak | corroborates #6; corroborates #9; corroborates #13 |
| 37 | 3.4.7 #22 | 7 documentation | documentation | — | technological | weak | partially corroborates distro/configs/openmrs/frontend_config/msf-frontend-config.json:222-231, 273-283 |
| 38 | 3.4.7 #23 | 7 documentation | documentation | import-maps | architectural | weak | partially corroborates #2; partially corroborates #3; partially corroborates #4 |
| 39 | 3.4.7 #24 | 7 documentation | documentation | — | architectural | weak | corroborates #1 |
| 40 | 3.4.7 #25 | 7 documentation | comment | — | architectural | weak | partially corroborates distro/pom.xml:643-655 |
| 41 | 3.4.7 #26 | 7 documentation | comment | — | context | weak | contradicts distro/pom.xml:958-971 |
| 42 | 3.4.7 #27 | 7 documentation | documentation | — | architectural | weak | contradicts #1 |
| 43 | 3.4.7 #28 | 7 documentation | comment | import-maps | architectural | weak | partially corroborates scripts/remove-importmap-entries.groovy:71-100, 111-123 |
| 44 | 3.4.7 #29 | 7 documentation | comment | import-maps | technological | weak | — |
| 45 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #18 |
| 46 | 3.4.8 #2 | 8 history | history | — | architectural | weak | explains #20; explains #28 |
| 47 | 3.4.8 #3 | 8 history | history | — | architectural | weak | explains #22; explains #40 |
| 48 | 3.4.8 #4 | 8 history | history | — | architectural | weak | explains #31 |
| 49 | 3.4.8 #5 | 8 history | history | import-maps | architectural | weak | explains #34 |
| 50 | 3.4.8 #6 | 8 history | history | — | context | weak | explains #41 |
| 51 | 3.4.8 #7 | 8 history | history | — | architectural | weak | explains #42 |

## Summary

Observations: 51. Dimensions (technology: 0, configuration: 13, code: 0, structure: 2, composition: 0, build-deploy: 0, documentation: 29, history: 7). Strength (strong: 2, moderate: 11, weak: 38, ambiguous: 0). Evidence (technological: 5, architectural: 36, context: 10).


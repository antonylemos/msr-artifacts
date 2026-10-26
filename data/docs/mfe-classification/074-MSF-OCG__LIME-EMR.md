---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
url: https://github.com/MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [import-maps]
ui_technologies: [react]
build_tools: []
frontend_units: 42
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 074 — MSF-OCG/LIME-EMR

## Context

OpenMRS 3 distribution for humanitarian care, with configurations and packaging for different sites (`README.md:3–5`, `pom.xml:11–16`). Organization into `distro` and `sites` represents distribution variants, not four frontend units. Frontend application code is external: this candidate configures which modules enter the distribution and how their extensions appear in the application.

Clone checked in `data/samples/mfe-sample-001/repos/MSF-OCG__LIME-EMR/`. Rank, ID and SHA match the `cloned` row in `data/samples/mfe-sample-001/clones.csv:75`; `git rev-parse HEAD` returned the front matter SHA and `git cat-file -t` confirmed a commit. Inspection only through `git ls-tree`, `git show` and `git grep` at the fixed SHA, without running builds or accessing external environments.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:3–5` describes an OpenMRS 3/Ozone HIS distribution; `README.md:85–91` lists deployments and reports production in Mosul. Workflow `.github/workflows/build-all.yml:31–51` configures checkout and Maven packaging. Supports the context of an application intended for production, without proving frontend architecture or successful execution on its own. | context |
| Structure / Configuration | `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:2–45` pins the core version and 42 `frontendModules` entries, including home, login, patient chart, nutrition and mental health. `:48–54` excludes six other modules. External units are explicitly referenced by assembly configuration, not merely generic dependencies. | moderate |
| Configuration / Composition | `distro/configs/openmrs/frontend_config/msf-frontend-config.json:2–20` configures home and app-shell; `:27–39` configures patient chart and adds/orders extensions in a slot. `:146–158` adds `patient-flags-list` to summary and medication slots. These are explicit UI relationships in the same application. | moderate |
| Build/deploy / Configuration | `distro/pom.xml:438–447` replaces the frontend configuration name in `.env`; `:452–463` adds configuration to variable `SPA_CONFIG_URLS`. `sites/mosul/pom.xml:171–182` also adds site-specific configuration. There is configured use of UI configurations in packaging, beyond their mere presence in the tree. | moderate |
| Build/deploy / Composition | `sites/mosul/pom.xml:220–234` binds `remove-importmap-entries.groovy` to phase `process-resources`, passing two modules to remove. `scripts/remove-importmap-entries.groovy:30–39` selects the packaged frontend; `:71–100` reads `importmap.json` and `routes.registry.json`, removes corresponding entries and rewrites the files; `:111–123` checks for routes without map entries when both files exist. This is operational code bound to the build, corroborating the map and route-registry mechanism; it is not an observed execution. | moderate |
| Build/deploy / Composition | The same script runs at all three sites, not only Mosul: `sites/bunia/pom.xml:318–331` and `sites/matsapha/pom.xml:273–286`, in addition to `sites/mosul/pom.xml:220–234`. Each removed module is its own import map entry, removed per site without touching the others. An independent review recorded historical commits b4642b8 (2026-02-16, "Remove Mental health and nutrition from matsapha frontend (#352)") and 16603b7 (2026-09-07, "Stop the patient chart crashing…(#451)"), indicating recurring operational use (history read without modification; not rechecked by this annotation). | moderate |
| Documentation / Composition | `README.md:189` describes "OpenMRS 3 ESM microfrontend architecture"; `README.md:1063–1065` and `:1102` say option C removes modules from the import map at build time so they are not loaded at the site. This is documentation: it corroborates that the import map is what the shell uses to load each unit, but does not establish the loader. The README is outdated relative to configuration ("41 modules" in `README.md:189` versus 42 in `spa-assemble-config.json:3–46`), so `frontend_units` follows configuration. | weak |
| Source code / Composition | `scripts/remove-importmap-entries.groovy:7–16` explains that the shell resolves bundles through the import map and pages/extensions through the route registry. This description is consistent with actual editing of both maps (`:71–100`) and configured slots. The shell loader and resulting maps are not tracked in this commit; comments are insufficient to establish the runtime connection. | ambiguous |
| Build/deploy / Structure | `distro/pom.xml:7–11` inherits an external Maven parent (`com.ozonehis:maven-parent:1.0.0-alpha.15`); `:492–494` changes an assembly script in `target/openmrs/frontend_assembly/` that reads `coreVersion` from `target/openmrs_frontend/spa-assemble-config.json`. `distro/assembly.xml:14–18` packages the distribution; `sites/mosul/pom.xml:22–28`, `:39–48` and `:59–70` receives and copies the base distribution ZIP. This shows joint assembly/delivery of artifacts without demonstrating entries, builds or independent deployment of each external unit. | ambiguous |
| Structure / Source code / Configuration | Complete inventory through `git ls-tree -r --name-only` at the SHA: 486 files. Searched for unit manifests, UI sources, bundler configuration and loader artifacts. The only `package.json` contains testing scripts/dependencies (`package.json:6–18`); listed TypeScript files are in `e2e/`. There is no `importmap.json`, `routes.registry.json`, `build-openmrs-frontend.groovy` or path containing `webpack`, `rspack` or `vite`. These generated files are referenced by `scripts/remove-importmap-entries.groovy:71–75` and `distro/pom.xml:493–494`, but their contents cannot be inspected in the commit. | absent |
| Technology / Configuration / Source code | Text search through `git grep -n -i -E` for `module.?federation`, `registerApplication`, `single-spa`, `remoteEntry`, `customElements[.]define`, `System[.]import` and `<iframe` found no occurrences. Scope: commit tree, except `.yarn/`, `yarn.lock`, files ending in `projectState.json`, `staging_config.json` and `adaptor_registry_cache.json`. single-spa, Module Federation or Web Components are not attributed merely from knowledge of the OpenMRS ecosystem. Positive observed evidence is import map handling in `scripts/remove-importmap-entries.groovy:71–100`. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Assembly configuration explicitly references 42 external frontend modules (`distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:3–45`). External units referenced through composition configuration satisfy the criterion; their sources need not be in this repository. |
| Q2 | Yes | Units are external ESM modules individually versioned in assembly configuration (`distro/configs/openmrs/frontend_assembly/spa-assemble-config.json:4–45`); the distribution selects which to compose without importing their sources. |
| Q3 | Yes | Home, shell and patient chart have configuration in the same distribution (`distro/configs/openmrs/frontend_config/msf-frontend-config.json:2–39`), with extensions added in slots (`:146–158`). The build configures their consumption through `.env` and `SPA_CONFIG_URLS` (`distro/pom.xml:438–463`); map-maintenance code relates modules to routes (`scripts/remove-importmap-entries.groovy:71–100`). Units participate in the same configured application. |
| Q4 | Yes | The import map and route-registry mechanism is manipulated by operational code bound to the build (`sites/mosul/pom.xml:220–234`; `scripts/remove-importmap-entries.groovy:71–100`), which removes units per site and checks route/map consistency. |
| Q5 | Yes | Assembly configurations, UI slots and operational import map maintenance establish concrete MFE composition. |

## Rationale

- The `MFE-implemented` rule applies: Q1–Q5 are Yes after joint review.
- `MFE-unit` does not apply: the candidate configures multiple external units and the distribution bringing them together; it does not contain only one unit prepared for an external host.
- There is stronger evidence of a composed application than an isolated mention or dependency, but listing versioned packages does not prove units' operational independence. Maven assembly alone likewise does not prove modules are merged into one bundle: scripts indicate maps used by a shell.
- `frontend_units: 42` counts entries explicitly referenced in `frontendModules`, before site-specific removals; it does not claim 42 active units in every deployment. It includes neither core as an additional unit nor excluded modules. `unit_organization: multi-repo` records referenced external units, not Maven modules as applications.
- `approaches: [import-maps]` records the mechanism observed in configuration/maintenance code, whose effective connection remains under assessment. `ui_technologies: [react]` records the OpenMRS 3 platform's React UI distributed by referenced modules; their sources are not in this repository. The bundler field is empty: unit sources/builds are absent, preventing attribution of webpack or another bundler. Maven is observed as the distribution orchestrator/packager.

## Analysis notes

- **RQ3:** version configuration → slot/route configuration → Maven adjustments in `SPA_CONFIG_URLS` → import map/route-registry maintenance. Bundle generation and loading are external links not yet verified.
- **Protocol:** analysis at the fixed commit; no build execution, clinical-environment access or acquisition occurred. Tracked configuration does not establish deployment success.

## Recorded decision

Promote to **MFE-implemented**. The distribution configures assembly of external ESM modules and their loading through import maps, defines how extensions occupy application slots and contains build code maintaining map/route consistency per deployment.

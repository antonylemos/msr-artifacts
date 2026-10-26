---
schema: 1
id: 1362830676
full_name: wixhub/ecosystem
url: https://github.com/wixhub/ecosystem
commit: c056d727cfd5c7f51f6cd370c9d26496303fd9d7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 8
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 095 — wixhub/ecosystem

## Context

MoveRDM brings together scientific applications for animal migration telemetry, curation and research. The README calls the collection micro-frontends (`README.md:3`), but inspection finds separate Angular applications and shared libraries, without a host or contract composing the applications with one another. `repo_type: production` records the research-tool orientation and portfolio with deployment addresses (`README.md:25–45`), without asserting that published services or builds were executed/verified.

The SHA was checked in `data/samples/mfe-sample-001/clones.csv:96`; the clone is `wixhub__ecosystem`. Complete inventory through `git ls-tree -r c056d727cfd5c7f51f6cd370c9d26496303fd9d7`: **500 regular files** (mode `100644`), **zero symlinks** and **zero gitlinks**. There is no versioned `node_modules/` or submodules. Applications are under prefix `apps/`, not at the clone root.

There are **eight own frontend targets**: `bio-stream`, `data-curation`, `eco-spec`, `metadata-harvester`, `movebank-explorer`, `sensor-streams`, `spatial-temporal` and `zeo`. All have their own `src/main.ts` with Angular bootstrap. `zeo` is still a minimal scaffold, but has an application entry and build. `zeo-e2e` is a test suite, and `libs/config`, `libs/data-access`, `libs/styles` and `libs/ui` are libraries; they do not enter the application count. `frontend_units: 8` records these physical targets; it **does not mean Q1 Yes**, because a composition relationship among them is missing, under precedents 023/028.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:96` records rank 95, id 1362830676, `strategies: terminology` and eligibility `pass`. The origin run is `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-002/candidates.csv:36978` records a description about spatial analysis, telemetry curation, Angular and Nx, without mentioning micro-frontends; empty topics; TypeScript language; MIT license; default branch `main`; creation on 2026-09-09 and last push on 2026-09-17. These are discovery metadata, not architecture confirmation.
- `sqlite3 -readonly` query against database `data/discovery/mfe-round-002/discovery.sqlite`, with `hits JOIN queries ON hits.query_id = queries.query_id` and filter `hits.repository_id = 1362830676`: hits for `terminology-micro-frontend-repositories` and `terminology-micro-frontends-repositories`, endpoint `repositories`, strategy `terminology`, queries respectively `"micro frontend" in:name,description,readme` and `"micro frontends" in:name,description,readme`. Both have empty `path`, without an attributed code line.
- **Field elimination:** name `wixhub/ecosystem` and recorded description lack the searched terms, and topics are empty. The local README contains the thematic expression in `README.md:3`; textual snapshot search finds this mention only in the root README. This points to the README as the observed compatible field, without attributing a location the database does not provide or assuming equivalence between current text and every version indexed by GitHub. The repository name is not MFE evidence.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Source code | All eight entries execute `bootstrapApplication(App, appConfig)`: `apps/bio-stream/src/main.ts:1–5`, `apps/data-curation/src/main.ts:1–5`, `apps/eco-spec/src/main.ts:1–5`, `apps/metadata-harvester/src/main.ts:1–5`, `apps/movebank-explorer/src/main.ts:1–5`, `apps/sensor-streams/src/main.ts:1–5`, `apps/spatial-temporal/src/main.ts:1–5` and `apps/zeo/src/main.ts:1–5`. These are own targets, not slide content, displayed generated code or vendored dependencies. Composition among these entries is not observed. | contrary |
| Build/deploy | The seven `angular.json` files under `apps/` point each build to the application’s own `src/main.ts`: `apps/bio-stream/angular.json:19–24`, `apps/data-curation/angular.json:19–24`, `apps/eco-spec/angular.json:19–24`, `apps/metadata-harvester/angular.json:19–24`, `apps/movebank-explorer/angular.json:19–24`, `apps/sensor-streams/angular.json:19–24`, `apps/spatial-temporal/angular.json:19–24`. The eighth defines its own build and output in `apps/zeo/project.json:9–24`. Distinct entries/builds are observable, but not a composite application. | context |
| Configuration / Technology | Builds use `@angular/build:application` (`apps/bio-stream/angular.json:21`, `apps/zeo/project.json:10`). `nx.json:48–84` registers tool plugins, including task inference through `@nx/vite/plugin`; `package.json:32`, `:57` declares Nx/Vite and Vite. There is no Vite/Webpack/Rspack configuration file or hook directly configuring its bundler. The Nx plugin and dependencies are insufficient to attribute `vite` to `build_tools`; it remains `[]`. Angular is confirmed in source imports and bootstraps. | context |
| Composition (local routes) | `apps/bio-stream/src/app/app.routes.ts:1–13`, `apps/data-curation/src/app/app.routes.ts:1–13` and `apps/sensor-streams/src/app/app.routes.ts:1–13` import internal components. `apps/metadata-harvester/src/app/app.routes.ts:1–11` connects Dashboard, IngestionWizard and DatasetExplorer from the same project. These are not routes to other monorepo applications. | contrary |
| Composition (lazy loading and shell) | `apps/eco-spec/src/app/app.routes.ts:3–10` and `apps/movebank-explorer/src/app/app.routes.ts:3–11` load components through local relative imports. `apps/spatial-temporal/src/app/app.routes.ts:1–13` uses its internal Shell. `apps/zeo/src/app/app.routes.ts:1–3` has empty routes; `apps/zeo/src/app/app.ts:1–9` and `apps/zeo/src/app/app.html:1–2` show NxWelcome and router outlet, not a host of the other seven applications. | contrary |
| Source code / Configuration (sharing) | `tsconfig.base.json:17–21` resolves `@es/ui`, `@es/styles`, `@es/data-access` and `@es/config` to `libs/` sources. The curation Dashboard imports a service, shared Header/Footer and local components (`apps/data-curation/src/app/features/dashboard/dashboard.ts:1–15`). `libs/ui/src/index.ts:1–2` exports Header/Footer; `libs/ui/project.json:6–15` defines a packaged library, and `libs/data-access/project.json:4–22` defines a data library. Component/service sharing does not mount `apps/` targets within one another. | contrary |
| Source code (postMessage) | `apps/eco-spec/src/app/core/services/builder.worker.ts:1–13` receives parameters and returns estimated volume/storage validity. This is calculation Web Worker code, without a frontend interface or inter-application contract. Search for `new Worker`, `onmessage` and `postMessage` in `apps/` finds only this `postMessage`; its instantiation was not confirmed. | context |
| Architecture documentation | `apps/metadata-harvester/ARCHITECTURE_ANALYSIS.md:3–15` describes an Angular application and its stack; `:19–45` organizes Dashboard/IngestionWizard features. `apps/metadata-harvester/ARCHITECTURE.mmd:2–7`, `:54–56` represents App and the same local routes. The curation diagram connects Angular Root, Router and Dashboard (`apps/data-curation/architecture-diagram.mmd:3–17`), not other frontend targets. No ADRs were found in the inventory. | contrary |
| Documentation / Build/deploy | The portfolio lists distinct demos (`README.md:25–45`). The generic micro-frontends mention (`README.md:3`) and documentary links do not constitute an integration contract. The library section describes models, services and utilities (`README.md:47–55`), consistent with observed sharing. | weak |
| Configuration / Source code (negative composition search) | Across the entire commit, in textual files and excluding files whose path contains `lock`, searched for `ModuleFederation`, `module.federation`, `remoteEntry`, `loadRemote`, `single-spa`, `registerApplication`, `registerMicroApps`, `importmap`, `import-map`, `<iframe`, `srcDoc`, `exposes`, `remotes`, `qiankun`, `wujie`, `customElements` and `rewrites`. No mechanism was found; the only result is the ordinary word `exposes` in a test comment (`apps/metadata-harvester/src/app/core/services/metadata-api.service.spec.ts:34`), without exposure configuration. Federation and micro-frontends search located only `README.md:3`; `postMessage` was checked separately as a Worker. | absent |
| Structure / Configuration (negative host search) | The inventory was searched for federation, bundler and composition host/root configuration files; all eight entries and eight route tables were examined. There is no configuration connecting targets or lifecycle export for an external host. Search for `apps/` path imports in sources found no inter-application imports; observed shared imports point to `libs/`. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Eight physical own targets, but no composition relationship: routes load local features (`apps/metadata-harvester/src/app/app.routes.ts:1–11`, `apps/eco-spec/src/app/app.routes.ts:3–10`) and `zeo` does not host them (`apps/zeo/src/app/app.routes.ts:3`, `apps/zeo/src/app/app.html:1–2`). Precedent 023/028 for applications without composition applies. |
| Q2 | No | There are own builds, but neither a set of units of a composite application nor a unit explicitly prepared for an external host. Builds point to their own entries (`apps/bio-stream/angular.json:19–24`, `apps/zeo/project.json:9–24`); observed inter-project links are shared-source libraries (`tsconfig.base.json:17–21`). Under the convention of Q1 No without external preparation, Q2 is No. |
| Q3 | No | There is no host/shell loading all eight applications. The spatial-temporal Shell is an internal component (`apps/spatial-temporal/src/app/app.routes.ts:1–7`); `zeo` only shows NxWelcome (`apps/zeo/src/app/app.html:1–2`). |
| Q4 | No | Composition searches found no mechanism connecting targets. Relative feature imports (`apps/movebank-explorer/src/app/app.routes.ts:3–8`) and shared Header/Footer (`libs/ui/src/index.ts:1–2`) are not composition between frontend units. |
| Q5 | No | Application monorepo without explicit composition, despite the documentary label (`README.md:3`). Local routes and library sharing (`tsconfig.base.json:17–21`) support exclusion. Q5 follows Q1–Q4. |

## Rationale

- Proposed `Non-MFE`: exclusion case of multiple frontend applications without explicit composition. Common domain theme, Nx, libraries and published demos do not establish a single composite application.
- `frontend_units: 8` and `unit_organization: monorepo` describe inventoried own targets. They do not count `zeo-e2e`, data/configuration/UI/style libraries or the Worker. The application count does not overcome absence of the relationship required by precedents 023/028.
- MFE-unit does not apply: there are no exposures or lifecycles preparing any application for an external host. Q2–Q4 remain No, without resorting to Undetermined merely because a presumed host is absent.
- There is no build-time composition decision to arbitrate: source integration concerns library components and services, without application composition. Links are in the documentary portfolio; there is no inter-unit navigation contract establishing the open link-composition case. The Worker is not used as proof of message-based integration.

## Analysis notes

- **RQ1:** the thematic expression in `README.md:3` is the signal found by elimination among discovery fields. Code/configuration contradict its interpretation as implemented MFE. Neither the name, Nx plugin, dependencies nor isolated demos confirm architecture.
- **Protocol (families/templates):** searches in annotations for `wixhub`, `MoveRDM`, `bio-stream`, `eco-spec`, `metadata-harvester`, `data-curation`, `sensor-streams` and `spatial-temporal` found no previously annotated sibling. The README contains Nx scaffold instructions (`README.md:59–103`), and `zeo` retains NxWelcome; no common template with a specific candidate was demonstrated. Precedents 023/028 are criterion analogies, not a code family.
- **History:** non-shallow clone (`git rev-parse --is-shallow-repository`: false); **260 reachable commits** from the evaluated SHA, counted through `git rev-list --count`, including merges and incorporated histories. The log filtered by `README.md`/`nx.json` records workspace initialization in `4542f66` (2026-09-10), repository merges of `wixhub/sensor-streams` in `7f3dfa6` and `wixhub/data-curation` in `7213ccf` (2026-09-11), and portfolio update in `5bb8057` (2026-09-15). This explains app histories preceding metadata-recorded repository creation; it does not imply runtime composition. The pinned commit of 2026-09-17 concerns license and documentation. Complete history has 7 merges "merge main from git@github.com:wixhub/<app>.git" (sensor-streams `7f3dfa6`, bio-stream `20362fc`, data-curation `7213ccf`, eco-spec `a96d986`, movebank-explorer-web `f053d23`, metadata-harvester `6c52b79` and spatial-temporal `2185acd`) and 8 root commits: `4542f66` (2026-09-10, "chore: initialize project", the Nx workspace) and 7 imported histories, from 2026-08-09 to 2026-09-04. The monorepo is therefore consolidation of 7 applications developed as independent repositories, each with its own demo (`README.md:25–45`), plus scaffold `zeo`; this reinforces exclusion of multiple frontend applications without composition and explains creation date (2026-09-09) after history (history read in read-only mode).
- **Protocol (branches and limitations):** only `main`, `origin/main` and `origin/HEAD`, all at the pinned SHA. References recorded without completing the snapshot from another branch. Static, local and read-only inspection; no network, installed dependencies, application, build or test executed. Local Mermaid diagrams were read as documentation; demo links were not accessed. No open decision identified.

---
schema: 1
id: 1228993246
full_name: clarivex-tech/pervaxis-forge
url: https://github.com/clarivex-tech/pervaxis-forge
commit: 890dc0b4c4af914b2282f7546e5f39ead1026595
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 105 — clarivex-tech/pervaxis-forge

## Context

Project-generation tool, with an Angular administrative frontend (Launchpad), .NET API and Scriban engine. Directories `Templates/angular-shell` and `Templates/angular-microfrontend` are generator inputs: it renders files and returns a ZIP, without mounting those projects as units of its own interface (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/PrintGenerator.cs:28–40`; `pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/FileGenerator.cs:33–57`). `repo_type: other` records the tool, following the distinction in 075; its own UI is counted.

## Sample provenance

- Rank 105, ID, identity and strategy `terminology`: `data/samples/mfe-sample-001/sample.csv:106`. Clone, branch `main` and SHA checked in `data/samples/mfe-sample-001/clones.csv:106`. The sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:29521` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:29527` records `pass`. Round 001 had incomplete activity for the recent human commit criterion; 002 records a qualifying commit. Both show null description, empty topics, C# language, MIT license and `fork: false`.
- `sqlite3 -readonly` query, joining `hits` and `queries` by `query_id` and filtering `repository_id=1228993246`, in databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`: both rounds have hits `terminology-microfrontend-repositories` and `terminology-microfrontends-repositories`, strategy `terminology`, endpoint `repositories`, queries `microfrontend in:name,description,readme` and `microfrontends in:name,description,readme`, without a file path. These identifiers are SQLite keys, without textual line numbering.
- By elimination: the name lacks the searched terms, description is null and topics are empty; README mentions “Angular 18 Microfrontend” among generated products (`README.md:28–41`). This is compatible with README retrieval, although hits do not identify the exact matching excerpt. The name and thematic retrieval are not evidence of MFE implementation.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 571 regular files, all mode 100644; zero symlinks and zero gitlinks. There are 348 in `pervaxis-forge-api/`, 201 in `pervaxis-forge-launchpad/`, ten in `docs/`, four in `.github/`, two in `.claude/` and six files at root. There is no versioned `node_modules`. Counts refer to the Git tree, without artificial text lines. | context |
| Structure / Build/deploy | There is a single actual `project.json`, for application `launchpad`, with executor `@nx/angular:application`, its own index, `main.ts` entry and tsconfig (`pervaxis-forge-launchpad/apps/launchpad/project.json:2–14`). Start/build scripts target that same application (`pervaxis-forge-launchpad/package.json:5–10`). Other frontend manifests are `.sbn` templates or cache, without another concrete own target. | contrary |
| Technology / Build/deploy | Angular 21.2.9 and Nx Angular 22.7.0 are declared (`pervaxis-forge-launchpad/package.json:15–24`; `pervaxis-forge-launchpad/package.json:30–40`) and pinned in the lockfile (`pervaxis-forge-launchpad/package-lock.json:292–297`; `pervaxis-forge-launchpad/package-lock.json:631–636`; `pervaxis-forge-launchpad/package-lock.json:6529–6534`). Recorded peers for Nx Angular allow Angular builders from 19 to before 22. The indicated entries and tsconfigs exist. This validates basic static target resolution, without asserting build success. There is no explicit bundler file/hook: `build_tools: []`, without inferring Vite from cache or Webpack from a transitive dependency. | context |
| Source code | The actual bootstrap imports `AppComponent` and `appConfig` and calls `bootstrapApplication` (`pervaxis-forge-launchpad/apps/launchpad/src/main.ts:3–11`). `appConfig` imports and registers `appRoutes` with `provideRouter` (`pervaxis-forge-launchpad/apps/launchpad/src/app/app.config.ts:31–41`). `AppComponent` exists and is exported (`pervaxis-forge-launchpad/apps/launchpad/src/app/app.component.ts:52`). | contrary |
| Source code / Composition | The five lazy routes import local dashboard, enrollment, workspace, generation and unauthorized-access components (`pervaxis-forge-launchpad/apps/launchpad/src/app/app.routes.ts:23–75`). Files exist and export the consumed names: `VerticalDashboardComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/vertical-dashboard/vertical-dashboard.component.ts:239`), `VerticalEnrollmentComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/vertical-enrollment/vertical-enrollment.component.ts:102`), `VerticalWorkspaceComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/vertical-workspace/vertical-workspace.component.ts:64`), `GenerationWizardComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/service-generation/generation-wizard.component.ts:1009`) and `UnauthorizedComponent` (`pervaxis-forge-launchpad/apps/launchpad/src/app/features/unauthorized/unauthorized.component.ts:35`). These are pages of an application with one build; lazy loading does not create independent units. | contrary |
| Configuration | Aliases `@core`, `@features`, `@shared`, `@models`, `@layout` and `@env` resolve within the same application (`pervaxis-forge-launchpad/tsconfig.base.json:17–23`). There is no source import from another own unit: the sole target imports its own pages and services. | context |
| Source code / Structure | The engine project embeds `Templates/**/*.sbn` as resources and references Scriban (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Pervaxis.Forge.Engine.csproj:6–17`). `FileGenerator` loads and renders each template, substitutes name tokens and converts `.sbn`/`.tstemplate` extensions to output files (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/FileGenerator.cs:21–57`). These are not additional apps running in the repository. | contrary |
| Source code | `PrintGenerator` selects `Templates/angular-shell` or `Templates/angular-microfrontend` according to the requested type and packages results (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/PrintGenerator.cs:28–40`). The MFE template contains symbolic export `MFE_ROUTES`, with the component name still parameterized (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Templates/angular-microfrontend/libs/__APP__/src/lib/routes.tstemplate.sbn:19–24`). The shell template leaves its `loadChildren` example commented and parameterized (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Templates/angular-shell/apps/__APP__/src/app/app.routes.tstemplate.sbn:21–32`). There is no remotes ↔ exposes ↔ consumption chain between concrete own units. | contrary |
| Source code | Launchpad calls the generation API and receives a ZIP blob (`pervaxis-forge-launchpad/apps/launchpad/src/app/core/api/generation-api.service.ts:61–85`); it does not import generated code as an application. The exported-product role is demonstrated by code, beyond README. | contrary |
| Technology / Configuration / Composition | Search at the SHA for `ModuleFederation`, `remoteEntry`, `loadRemote`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `exposes` and `remotes`, in `pervaxis-forge-launchpad/apps/`, its `package.json` and `nx.json`: no results. Filename inventory found no Webpack/Rspack/Vite/federation configuration. There is no own unit prepared for an external host or link/iframe/postMessage integration mechanism in this application. | absent |
| Structure / Technology | There are 56 files in `.angular/` and 16 in `.nx/` versioned within Launchpad. A broader search found `registerApplication` and iframe security in prebundled Angular code (`pervaxis-forge-launchpad/.angular/cache/21.2.9/launchpad/vite/deps/chunk-LCXWEOF5.js:6768–6772`; `pervaxis-forge-launchpad/.angular/cache/21.2.9/launchpad/vite/deps/chunk-LCXWEOF5.js:15444–15448`) and transitive federation dependencies in the Nx graph (`pervaxis-forge-launchpad/.nx/workspace-data/parsed-lock-file.dependencies.json:4583–4584`). These are tool/third-party artifacts, not single-spa registration or candidate composition. | context |
| Documentation | The architecture specification depicts an Angular Launchpad UI, REST API and .NET/Scriban engine (`docs/FORGE_TECHNICAL_SPECIFICATION.md:29–85`), consistent with observed targets. README presents the tool and projects it generates (`README.md:8–24`; `README.md:28–41`). Filename inventory for ADR/architecture found no separate ADR; specification and blueprints are architecture documentation, not independent evidence of running MFE. | context |

## Authorship and history

Metadata at the pinned SHA: 377 reachable commits, 166 merges, one root commit (`1ef7ea2f92a9075c3015d19c667ef0db1a3f9d9c`), non-shallow clone. Author/committer pairs: 213 commits `Anand Jayaseelan`/`Anand Jayaseelan` and 164 `anand-clarivex`/`GitHub`. HEAD is the merge of 22/05/2026 “Merge pull request #166 from clarivex-tech/develop”. These are recorded identities, without inferring complete intellectual authorship or provenance of each dependency.

`git log --name-status` by folders shows additions of UI structure, templates and engine in commit `356b537fc9dbf4338bec5384b95e15766dc5e430`, by Anand Jayaseelan (“Add Vertical Enrollment module, split blueprints, and create solution skeletons”). For the routes file, history records changes in `a890cd5611db90d6c3e0c483c857fddf0038eacb` (“implement persistent layout shell”) and `d67784606b5dc7de2fe31c4f0dcc02b220624859` (“complete vertical enrollment integration with hosted BFF”). In folder `Generation/`, `b27ec276ea20c076eca1f7a200fc2daf00d0dd27` changes the generation core and `54228325653e04ba928c3629b109229890ffc429` adds Angular Shell/MFE types to the generator. These records support evolution of the tool in the owner’s history; they do not demonstrate that generated projects compose its UI.

The filename query for `Templates/` ended partially with missing object `180c1f5a87748d994d0e6d7d87f9b32dfbba0ed8`. With `GIT_NO_LAZY_FETCH=1`, there was no remote fetch; this historical portion is unavailable and was not queried again. No historical blob or other-branch content was used. Only refs were recorded: `main`/`origin/main`/`origin/HEAD` at the evaluated SHA, `origin/develop` and various feature/fix branches, plus tag `v1.0.0-rc1`.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One own frontend target, Launchpad (`pervaxis-forge-launchpad/apps/launchpad/project.json:2–14`). Shell/MFE are generator output types (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/PrintGenerator.cs:28–40`); templates and cache do not count as units. |
| Q2 | No | There is no set of units with their own entries and builds to compare. The sole target has its entry/build and imports local pages of the same application (`pervaxis-forge-launchpad/apps/launchpad/project.json:7–14`; `pervaxis-forge-launchpad/apps/launchpad/src/app/app.routes.ts:23–75`). This does not meet the literal requirement for independence between units. |
| Q3 | No | The router connects internal pages, not distinct frontend units (`pervaxis-forge-launchpad/apps/launchpad/src/app/app.config.ts:31–41`; `pervaxis-forge-launchpad/apps/launchpad/src/app/app.routes.ts:23–75`). The engine returns projects as ZIP, without loading them in Launchpad. |
| Q4 | No | No composition mechanism between own units. MFE signals are in output templates, not connected to the administrative application (`pervaxis-forge-api/src/Pervaxis.Forge.Engine/Generation/PrintGenerator.cs:28–40`; `pervaxis-forge-api/src/Pervaxis.Forge.Engine/Templates/angular-shell/apps/__APP__/src/app/app.routes.tstemplate.sbn:27–31`). |
| Q5 | No | Conventional frontend application of a generation tool; it neither implements MFE architecture nor constitutes a unit prepared for an external host. |

## Rationale

- `Non-MFE`: No answers, without an MFE-unit exception. Classification follows from the relationship between engine, templates, output and administrative application; not from the word Forge or README alone.
- `frontend_units: 1` follows from the complete inventory and sole own target with bootstrap/build. It does not count backend, local pages, cached third-party code or products that could be generated. It follows 023/028 and 075/081: MFE content/templates and generator output are not concrete Q1 units.
- Q2 literally applies own entries/builds and absence of direct source imports from another unit. One Launchpad build and local imports do not provide a second independent unit. There is no build-time frontend package composition to adjudicate.
- Q2–Q4 remain No: no own unit prepared for an external host outside the snapshot was found. Unavailability of part of history does not turn the observable SHA structure into Undetermined.
- This does not depend on deciding code sharing (089/100), execution imperfections or an unconnectable external contract (097/103/104). There is no configured/consumed own federation or external Launchpad contract; symbolic templates belong to the generator’s product. Nor is it a platform distribution or third-party host plugin (074/102); third-party caches are separated as in 080.

## Analysis notes

- **RQ1 (families):** searching for `clarivex`, `pervaxis` and `Scriban` in available annotations found no previously annotated sibling/template. Cases 075 and 081 are functional comparators, without asserting common origin. Angular UI remains observable although the MFE theme is mainly in the generated product.
- **RQ1 (misleading signals):** `registerApplication` in Angular runtime refers to testability, not single-spa; the transitive Nx graph is not equivalent to federation configuration. Vite cache does not justify `build_tools: [vite]`.
- **RQ3:** the relevant chain is embedded template → rendering/name substitution → `GeneratedFile` → ZIP. The UI chain is bootstrap → router configuration → local components with checked exports. No link makes Launchpad consume outputs as units.
- **Protocol:** both rounds have the same thematic hits, but differ in eligibility completeness. The analyzed snapshot is exclusively the SHA in `clones.csv`, without incorporating states from other branches, later commits or generated projects.
- **RQ1 (spelling and hit origin):** both discovery queries use spelling without space or hyphen (`microfrontend(s)`), in both rounds, and the sole README occurrence is `README.md:34` ("Angular 18 Microfrontend, fully wired"); discovery metadata have neither description nor topics.
- **RQ2 (output nature):** even the generated product is not runtime composition. Template `angular-microfrontend` generates an Nx library (`libs/__APP__`, with `ng-package.json.sbn` and `project.json.sbn`, exporting `MFE_ROUTES`), and the shell template anticipates consuming it through `loadChildren: () => import('@{{product}}/domain-feature')`, only in an example comment (`app.routes.tstemplate.sbn:27–31`): build-time workspace package import, without federation. "Microfrontend" denotes an Nx routes library in the generator.

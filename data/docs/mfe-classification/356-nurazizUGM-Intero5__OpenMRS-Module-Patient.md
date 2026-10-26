---
schema: 1
id: 997746951
full_name: nurazizUGM-Intero5/OpenMRS-Module-Patient
url: https://github.com/nurazizUGM-Intero5/OpenMRS-Module-Patient
commit: c490ce752bac4d0772f28778fe81434dd6c57a00
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [single-spa]
ui_technologies: [react, angular]
build_tools: [webpack]
frontend_units: 18
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 356 — nurazizUGM-Intero5/OpenMRS-Module-Patient

## Context

Copy of monorepo `openmrs/openmrs-esm-patient-chart`, the “frontend module for the OpenMRS SPA” that “contains various microfrontends that constitute widgets in a patient dashboard” (`README.md:5–7`). Root `package.json` retains name `@openmrs/esm-patient-chart` (`package.json:2`), with workspaces `packages/*` (`:5–7`).

Packages `packages/esm-*-app` are OpenMRS 3 ESM modules. Each exports components wrapped by `getSyncLifecycle`/`getAsyncLifecycle` from `@openmrs/esm-framework` and declares them in `routes.json` as slot extensions or pages. The app shell loading these modules is not in the repository. History belongs to the original project, plus a single owner commit. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:357` records rank 356, ID 997746951, status `cloned`, branch `main` and the front matter commit, which is the clone HEAD. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:357` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:14840` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14846` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same five hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | repositories | `…#created:2025-06` | empty |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | repositories | `…#created:2025-06` | empty |
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | code | `…#size:1000..1149` | `packages/esm-patient-common-lib/package.json` |
| same | code | `…#size:2000..2249` | `packages/esm-patient-chart-app/package.json` |
| same | code | `…#size:3000..3999` | `packages/esm-form-entry-app/package.json` |

Repository hits were collected at 2026-10-07T18:37:52.559Z / 2026-10-08T15:38:14.867Z (singular) and 2026-10-07T22:07:57.374Z / 2026-10-08T15:47:25.710Z (plural). Repository queries append `pushed:>=2025-04-01 created:2025-06-01..2025-06-30`.

Hit metadata (identical in both rounds):
- null description;
- language TypeScript, license `other`, `fork: false`;
- size 23120;
- created at 2025-06-07T05:05:37Z and pushed at 2025-06-07T05:09:12Z.

Matches at the SHA:
- **“microfrontends”:** `README.md:7`, also `:23` and `:48`;
- **“microfrontend”:** `README.md:40` (“To start a dev server for a specific microfrontend”);
- **code:** all three files have sizes within ranges (1.121, 2.046 and 3.227 bytes) and declare `single-spa`:
  - `packages/esm-patient-common-lib/package.json:39`, in `peerDependencies`;
  - `packages/esm-patient-chart-app/package.json:53–54`, `single-spa` and `single-spa-react` in `peerDependencies`;
  - `packages/esm-form-entry-app/package.json:69` in `peerDependencies` and `single-spa-angular` in `:59`.

The last README change is `940f7982` (2025-04-30, original project). The SHA is from 2025-06-07. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1.649 entries, comprising 1.646 regular files `100644` and 3 executables `100755`; zero symlinks and zero gitlinks. `packages/` has 19 packages: 18 `esm-*-app`, each with `src/index.ts` and `src/routes.json`, and library `esm-patient-common-lib`. The README still cites `esm-patient-biometrics-app` (`README.md:11`), absent at the SHA. | strong |
| Configuration / Build (units) | Each app has its own bundle (`"browser": "dist/openmrs-esm-patient-chart-app.js"`, `packages/esm-patient-chart-app/package.json:6`) and own webpack build (`:11`, `:13`). `esm-form-entry-app` is Angular, with `ng build`/`ng serve` (`packages/esm-form-entry-app/package.json:11`, `:13`), `single-spa-angular` (`:59`) and `systemjs-webpack-interop` (`:61`). | strong |
| Source code (shell contract) | `packages/esm-patient-allergies-app/src/index.ts:1–9`, `:25`, `:44–66`: `startupApp` and components exported through `getSyncLifecycle`/`getAsyncLifecycle`. `src/routes.json:7–25` in the same package: extensions connected to slots (`patient-details-header-slot`, `patient-chart-allergies-dashboard-slot`). `packages/esm-patient-chart-app/src/index.ts:42` (`root`) and `src/routes.json:222–228`: page with `routeRegex` `^patient\/.+\/chart`. | moderate |
| Composition (host) | Search at the SHA for `app-shell`, `importmap`/`import-map` and `index.html`: no file. Loading is delegated to external tooling `openmrs` (`package.json:9`, `openmrs develop`; `README.md:46`) and import map overrides (`README.md:56`). Shell, import map and slot resolution are not observable in the repository. | ambiguous |
| Source code (boundaries) | Active search for relative imports with three or more `../` in `packages/` and for imports from other `esm-*-app` packages through `@openmrs/…`. Apps share only `@openmrs/esm-patient-common-lib` (dependency `workspace:*`, `packages/esm-patient-chart-app/package.json:58`; for example `packages/esm-patient-allergies-app/src/index.ts:10`). Only cross-unit traversal: a lib test, `packages/esm-patient-common-lib/src/orders/useOrderableConceptSets.test.ts:3`, importing `../../../esm-patient-tests-app/src/config-schema`. Other `../../../` remain within the package itself or point to root `__mocks__`. | context |
| Owner contribution | The SHA changes only `packages/esm-patient-orders-app/src/order-basket/order-basket.workspace.tsx` (blob `0889dfd` → `d4563cb`). The earlier blob is absent from the partial clone, so the diff was not read. In the SHA file, `:65–88`: `fetch` to OpenMRS REST and `http://127.0.0.1:8000/api/lab-orders`. This is backend integration, without composition effect. | context |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 2.380 commits reachable from the SHA (2.380 across all refs), with 14 merges. Most frequent identities belong to the original project (`kigen.work@gmail.com` 580, `chelashawdonald@yahoo.com` 232, `sharmava05@gmail.com` 129, `florian.rappl@smapiot.com` 97 and bot `github-actions` 96, among others). The root is `1bebbfd1` (2019-10-08, Fatma Ali, “Initial commit”) and the SHA parent is `b381eabc` (2025-05-30, original project).

The owner appears in a single commit, the SHA: `c490ce7` (2025-06-07T12:08:39+07:00, `Nur Aziz <sukabaru09@gmail.com>`, “Integrasi Katalog API”; English translation: “API Catalog Integration”). The repository redistributes the OpenMRS project with `fork: false`; the copy mechanism is not asserted. `git rev-list --objects $SHA --missing=print` lists 15.269 missing objects, none in the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | 18 ESM apps with their own entry point (`src/index.ts`), registration (`src/routes.json`) and bundle (`packages/esm-patient-chart-app/package.json:6`, `:13`); the common lib is not counted. |
| Q2 | Yes | Own builds per package (webpack; Angular CLI in `esm-form-entry-app`). No source code import between apps; sharing uses lib `esm-patient-common-lib`. The only traversal is in a lib test (`useOrderableConceptSets.test.ts:3`), not production code. |
| Q3 | Yes | Modules declare extensions and pages in `routes.json` and export lifecycles to the OpenMRS app shell, the platform’s adopted composition mechanism. |
| Q4 | Yes | `getSyncLifecycle`/`getAsyncLifecycle`, `routes.json` and single-spa dependencies configure the shell and import map loading contract (`esm-patient-allergies-app/src/index.ts:44–66`; `routes.json:7–25`). |
| Q5 | Yes | Q1–Q4 demonstrate independent modules and consistent composition contracts. The upstream copy and external shell are provenance and scope caveats, not architectural absence. |

## Rationale

- Classified as `MFE-implemented`: modules have their own bundles, lifecycles and extension/page registrations consistent with OpenMRS single-spa composition.
- Host and import map are outside this repository, but module loading contracts are observable and consistent.
- It is not `MFE-unit`: there are 18 prepared units, not one.
- `frontend_units: 18` (apps `esm-*-app`, without the common lib), `unit_organization: monorepo`, `approaches: [single-spa]` (single-spa lifecycles through `@openmrs/esm-framework`), `ui_technologies: [react, angular]`, `build_tools: [webpack]`.
- `repo_type: production`: code is from the OpenMRS product; the owner copy is an adaptation with local API integration.

## Analysis notes

- **RQ2:** OpenMRS 3 uses single-spa with extensions/slots declared in `routes.json` and framework-generated lifecycles, with shell import maps. A platform composition variant, distinct from MF remotes or direct `registerApplication` in the repository.
- **RQ1 (misleading signals):** inherited README says “microfrontends” and lists a package absent at the SHA (`README.md:11`).
- **Protocol (families/duplicates):** complete copy of `openmrs-esm-patient-chart` with one owner commit. Deduplication by root commit (`1bebbfd1`) would group copies of the same project.
- **Protocol:** eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Promoted to `MFE-implemented`. The 18 modules have their own bundles, single-spa lifecycles and extension/page registrations for the OpenMRS shell. External shell and import map, as well as the copy’s upstream origin, are provenance caveats; observable composition contracts suffice for classification.

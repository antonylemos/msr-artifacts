---
schema: 1
id: 964887410
full_name: APaCHePE/mf-sidebar
url: https://github.com/APaCHePE/mf-sidebar
commit: 6d2ac6c5f37ed8d9e2ff2cf3662d11e92a70274d
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [single-spa]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 280 — APaCHePE/mf-sidebar

## Context

Angular 19 single-spa application providing a portal sidebar/menu. It exports lifecycles `bootstrap`/`mount`/`unmount` (`src/main.single-spa.ts:16–29`) and is served on port 1004 with its own `deployUrl` (`angular.json:46`, `:76`). The root config registering it is not in the repository. The same owner has `APaCHePE/shell` and other `mf-*` (auth, seguridad, utils-modules etc.) in the rounds, outside the sample. The README is Angular CLI boilerplate. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:281` records rank 280, ID 964887410, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:281` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:12895` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:12900` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `technology-single-spa-package-code#size:1800..1999` | `package.json` | 2026-10-07T22:18:41.101Z / 2026-10-08T16:01:54.988Z |

The effective query is `"single-spa" filename:package.json size:1800..1999`. Code hit metadata records only null description and `fork: false`.

The matched file has 1.897 bytes at the SHA, within the range, and contains `single-spa` (`package.json:35`), `single-spa-angular` (`:36`) and scripts `build:single-spa:mf-sidebar`/`serve:single-spa:mf-sidebar` (`:11–12`). The match does not depend on the README (`README.md:1–59`, Angular CLI boilerplate without the terms). The SHA (2025-07-21) predates the October 2026 collections.

Other owner repositories in the rounds (`data/discovery/mfe-round-002/candidates.csv`): `APaCHePE/shell` (`:12368`), `mf-auth` (`:12369`), `mf-com-consultas` (`:12370`), `mf-ope-reclamos` (`:12901`), `mf-seguridad` (`:13546`) and `mf-utils-modules` (`:14414`). Only `mf-sidebar` is in `sample.csv`; the others were not inspected.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 73 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single Angular project: `angular.json`, `extra-webpack.config.js`, `package.json`, `src/app` (menu, sidebar), `src/shared` (services), `src/single-spa`, `src/assets/ultima` (theme styles). | contrary |
| Source code (lifecycles) | `src/main.single-spa.ts:16–25`: `singleSpaAngular({ bootstrapFunction, template: '<app-sidebars />', Router, NavigationStart, NgZone })`; `:27–29`: `export const bootstrap / mount / unmount`. `src/single-spa/single-spa-props.ts:1–8` and `src/single-spa/asset-url.ts:5–11`: single-spa props and dynamic public path. | strong |
| Configuration (build) | `angular.json:18`, `:22`: builder `@angular-builders/custom-webpack:browser` with `main: src/main.single-spa.ts`; `:41–42`: `extra-webpack.config.js`; `:46`: `deployUrl: http://localhost:1004/`; `:62`, `:68`: `outputHashing: none`; `:74–76`: dev-server on port 1004. `extra-webpack.config.js:1–14`: `singleSpaAngularWebpack` and `externals` for `@test/mf-utils-modules`. `src/app/app.config.ts:45`: `getSingleSpaExtraProviders()`. | strong |
| Source code (external utility module) | `src/shared/servicess/sidebar.services.ts:5–10`: imports `AuthUtils`, `local`, `Session` and `StorageConstants` from `@test/mf-utils-modules`, marked external in webpack (`extra-webpack.config.js:11–13`) and typed in `src/types/extramodule.d.ts:1–83`. This is a shared utility (session, storage, auth), resolved at runtime outside the repository. | ambiguous |
| Source code (integration with other applications) | `src/app/sidebar/sidebar.component.ts:37` and `src/app/app-menu/app.menu.ts:46`: listens for event `module-selected` on `window` (typed in `src/types/custom-events.d.ts:2–5`); `sidebar.services.ts:42–43`: listens for `localStorage` changes “desde otros MF” (English translation: “from other MF”). These are contracts with external applications, not observable here. | moderate |
| Source code (boundaries) | Active search for relative `../../` imports in `src`: only internal traversals to `src/shared` (for example, `src/app/sidebar/sidebar.component.ts:5–6`; `src/app/app-menu/component/app.menuitem.ts:9`). No source code import from another repository or unit. | context |
| Composition | No root config (`registerApplication`, import map) in the repository; the ecosystem shell is in another repository. | absent |
| Documentation | `README.md:1–59`: Angular CLI boilerplate; no architecture mention. | absent |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 12 commits (12 across all refs), no merges, by two identities of the same owner:
- `Apachepe <alexanderspradochoquepata@gmail.com>`: 5 commits, from 2025-04-11 (`ac993da`, “initial commit”) to 2025-05-27;
- `Alex Prado <alexanders.prado@interseguro.com.pe>`: 7 commits, corporate email, from 2025-05-27 to the SHA (`6d2ac6c`, 2025-07-21, “Estilos”; English translation: “Styles”).

Author and committer match. `git rev-list --objects $SHA --missing=print` lists 56 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit. No composition configuration references other units. The `externals` of `@test/mf-utils-modules` (`extra-webpack.config.js:11–13`) points to a utility module (session, storage, auth; `extramodule.d.ts:1–83`), not a frontend unit. |
| Q2 | Yes (for the unit) | Own build with single-spa entry point (`angular.json:18–22`), unhashed output and own `deployUrl` (`angular.json:46`, `:62`). |
| Q3 | Undetermined | The root config registering the application is not in the repository. |
| Q4 | Undetermined | Lifecycles are exported (`src/main.single-spa.ts:27–29`); the side registering them is not observable. |
| Q5 | No | Unit prepared for composition by an unobservable external root config. |

## Rationale

- `MFE-unit` under the exception “a single frontend unit explicitly prepared to be composed by an external host (e.g., … exported single-spa lifecycles), but the composing host is not observable”.
- Same pattern as final 058 (single-spa with exported lifecycles and build prepared for import map) and remotes in 001/050.
- The external utility module (`@test/mf-utils-modules`) is the single-spa shared “utility module” pattern. It is not a frontend unit and enters through `externals`, not composition configuration. Therefore the literal Q1 interpretation discussed in 150/264 does not apply.
- This is not a platform plugin: the ecosystem belongs to the owner.
- `repo_type: production`: internal product with insurer corporate email and business modules (reclamos, seguridad) in the ecosystem. `ui_technologies: [angular]`. `build_tools: [webpack]`: build with `@angular-builders/custom-webpack` and `single-spa-angular/lib/webpack`. `approaches: [single-spa]`.
- There is no open decision.

## Analysis notes

- **RQ2:** single-spa with `single-spa-angular` in standalone Angular 19 (`bootstrapApplication`), cross-application communication through `CustomEvent` on `window` (`module-selected`) and `storage` events, and shared utilities through an external module resolved by import map (`@test/mf-utils-modules`).
- **Checklist (related case):** in 269, the shared remote entered through Module Federation `remotes` and went to review. Here the utility enters through webpack `externals`, without a reference in composition configuration. If the 269 review treats shared utility modules as units, this case should be reassessed in the same decision.
- **Protocol (families/multi-repo):** the ecosystem (shell, auth, com-consultas, ope-reclamos, seguridad, utils-modules) appears in the rounds, outside the sample. With family analysis, Q3/Q4 could be verified in `APaCHePE/shell`.

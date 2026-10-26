---
schema: 1
id: 574926330
full_name: ash-uncover/ward
url: https://github.com/ash-uncover/ward
commit: 82efa7b534d4d76539f6e2c83be3b97e5d38eca4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 304 — ash-uncover/ward

## Context

- **Repository type:** library. npm-published `@sol.ac/ward` is “a small JavaScript library providing tools to ease microfrontend development regardless of the chosen frameworks” (`README.md:6`; `package.json:2–5`).

Provides an inter-frame message bus (`postMessage`) and plugin discovery mechanism described by JSON Schema (`README.md:9–11`). Repository contains only library, schemas and tests; no application uses library to compose units. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:305` records rank 304, ID 574926330, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:305` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:5248` and `data/discovery/mfe-round-002/candidates.csv:5253`, both with `terminology` and `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2022-12` | 2026-10-07T18:21:43.960Z / 2026-10-08T15:36:21.495Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2022-12` | 2026-10-07T22:05:52.765Z / 2026-10-08T15:45:58.325Z |

Effective queries append `pushed:>=2025-04-01 created:2022-12-01..2022-12-31`.

Hit metadata (same in both rounds): null description, no topics, language TypeScript, `fork: false`, size 2416, created at 2022-12-06T11:32:09Z, pushed at 2025-04-05T20:30:37Z.

Without a description, hit comes from README:
- **“microfrontend”:** `README.md:6` (“tools to ease microfrontend development”);
- **“microfrontends”:** plural form does not appear in README; that hit depends on GitHub search text processing, which is not recorded. `package.json` description (“Ward micro frontends frameworks”, `package.json:5`) is not a query-indexed field.

README's last change is `fd2b3ac` (2025-04-05T22:29:27+02:00), and SHA dates from 2025-04-05T22:30:13+02:00. Both precede October 2026 collection, and the SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 108 entries, all regular `100644` files; zero symlinks and zero gitlinks. Library in `src/` (messaging and plugins), JSON schemas in `docs/schemas/`, schema generator in `bin/`, tests in `test/` and PR and npm publication workflows. No `index.html`, application or composed usage example. | contrary |
| Configuration / Build | `package.json:2–19`: package `@sol.ac/ward` with `main`/`types` in `dist` and `files` `bundles`/`dist`; `:20–27`: `tsc` build and webpack bundle. `webpack.config.build.cjs:10–19`: a single entry `src/index.ts` for `bundles/ward.bundle.js`, library distribution. `.github/workflows/publish-npm.yml`: npm publication. | contrary |
| Source code (library) | `src/index.ts:1–40`: class `WardClass` with `PluginManager` and `MessageDispatcher`. `src/message/MessageDispatcher.ts:44`, `:115` and `src/message/services/FrameService.ts:81`: inter-window `postMessage` communication. `src/plugin/loader/model/PluginDataModel.ts:195` and `src/plugin/loader/schema/PluginProvideElementSchema.ts:12`: plugins may provide `iframe`, `webcomponent` or `component` elements. Primitives for micro-frontend composers, rather than composition. | context |
| Composition | No host application or unit in repository uses library to load and mount other units; tests (`test/integration/Ward.integration.spec.ts`, `test/unit/...`) exercise API itself. | absent |
| Source code (boundaries) | No frontend units; no `../../` imports in `src`. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 155 commits (155 across all refs), 25 merges, all with same owner's email:
- 93 by `ash-uncover <ash.uncover@gmail.com>`, 25 with committer `GitHub`;
- 61 by `Antoine MAILLARD <ash.uncover@gmail.com>`;
- 1 by `Antoine MAILLARD <antoine.maillard@sap.com>`.

Records span 2022-12-06 (`634992e`, “Initial commit”) to 2025-04-05 (SHA, “Update .gitignore”). `git rev-list --objects $SHA --missing=print` lists 899 missing objects, none in SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: repository is an npm library (`package.json:2–19`; `webpack.config.build.cjs:10–19`) and no composition configuration references units. |
| Q2 | No | No units. |
| Q3 | No | No host, shell or root config. |
| Q4 | No | Library provides inter-frame messaging and a plugin loader (`src/message/MessageDispatcher.ts:44`; `src/plugin/loader/PluginLoader.ts`), but nothing in repository uses it to connect units. |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- Matches “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: library supporting micro-frontend construction.
- Same framing as 204 (single-spa devtools) and 148 (SDK), both drafts, and by analogy 028 (tool citing MF as a scenario).
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`. `ui_technologies: []`: TypeScript library without UI framework. `build_tools: []`: webpack only packages library, rather than units.
- No decision remains open.

## Analysis notes

- **RQ2:** library anticipates plugins providing `iframe`, `webcomponent` or `component` elements (`PluginDataModel.ts:195`) and an inter-frame `postMessage` bus, an iframe and Web Components composition approach not exercised in repository.
- **Protocol (families):** library consumers, if present in other owner repositories, are not in rounds under same owner (only `ash-uncover/ward` appears in `data/discovery/mfe-round-002/candidates.csv:5253`).
- **Protocol (search):** plural hit `microfrontends` has no literal spelling in README. Eligibility is `pass` in both rounds.

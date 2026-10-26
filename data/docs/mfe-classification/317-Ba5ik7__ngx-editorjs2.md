---
schema: 1
id: 919807021
full_name: Ba5ik7/ngx-editorjs2
url: https://github.com/Ba5ik7/ngx-editorjs2
commit: 65912365bf7834d6722ca295f11934e0f799f00e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 317 — Ba5ik7/ngx-editorjs2

## Context

Angular block editor library inspired by Editor.js (`@tmdjr/ngx-editor-js2`), with a demonstration application (`README.md:1–8`; `projects/ngx-editor-js2/package.json:2–3`; `angular.json:6–7`, `:95–96`). The README lists optional blocks published as separate npm packages. One, “MFE Loader Block”, is described as “Dynamically load and embed micro-frontends using Module Federation” (`README.md:143–150`), but its code is not in this repository. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:318` records rank 317, ID 919807021, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:318` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:11476` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:11482` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-01` | 2026-10-07T22:20:03.469Z / 2026-10-08T15:53:38.009Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-01` | 2026-10-07T22:51:15.534Z / 2026-10-08T16:05:13.495Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2025-01` | 2026-10-07T23:16:43.767Z / 2026-10-08T16:13:50.133Z |

The effective queries append `pushed:>=2025-04-01 created:2025-01-01..2025-01-31`.

Hit metadata (identical in both rounds): description about the Angular block editor, without the searched terms; no topics; language TypeScript; `fork: false`; size 1932; 8 stars; GitHub Pages homepage; created at 2025-01-21T03:44:47Z; pushed at 2026-02-15T03:28:11Z.

Root README matches: the only line is `README.md:144`, “Dynamically load and embed micro-frontends using Module Federation.”
- literally matches “module federation” and, with the hyphen as separator, “micro frontends”;
- singular “micro frontend” does not appear literally; this hit depends on GitHub search text processing, which is not recorded.

The same phrase appears in `projects/ngx-editor-js2/README.md:144`, which is not the indexed README.

The last root README change is `e9f2914` (2025-07-13), and the SHA is from 2026-02-14T22:28:11-05:00 (2026-02-15T03:28:11Z, matching `pushed_at`). Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 70 entries, all regular files `100644`; zero symlinks and zero gitlinks. Angular workspace with `projects/ngx-editor-js2` (library, schematics) and `projects/ngx-editorjs2-demo` (demonstration application), plus `docs/`, `mock/` and publication workflow. | contrary |
| Configuration / Build | `angular.json:6–7`, `:18`, `:22`: application `ngx-editorjs2-demo` with `@angular/build:application` and entry `projects/ngx-editorjs2-demo/src/main.ts`; `angular.json:95–96`, `:102`: library `ngx-editor-js2` with `ng-packagr`. `package.json:5–6`: demo (GitHub Pages) and library builds. `projects/ngx-editor-js2/package.json:2–3`: package `@tmdjr/ngx-editor-js2`. | contrary |
| Source code (demo) | `projects/ngx-editorjs2-demo/src/app/components/document.component.ts:3`, `:13–18`: the demo imports `NgxEditorJs2Component` from `ngx-editor-js2` (workspace library) and renders it; `projects/ngx-editorjs2-demo/src/app/services/app.service.ts:2`: library types. Build-time library consumption. | contrary |
| Source code (schematic) | `projects/ngx-editor-js2/schematics/ng-add/index.ts:61–66`: `ng add` can install external package `@tmdjr/ngx-editor-js2-mfe-loader` with peer `@angular-architects/module-federation`. The MFE Loader block is not in the repository. | weak |
| Documentation | `README.md:143–150`: “MFE Loader Block” as an optional npm package, alongside quote, code and Mermaid blocks (`:120–160`). | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile and root README, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements` and `<iframe`: only `projects/ngx-editor-js2/README.md:144` and the schematic above. No federation configuration. | absent |
| Source code (boundaries) | Relative imports `../../` stay within the library (for example, `projects/ngx-editor-js2/src/lib/components/blocks/header-block.component.ts:2–10`). The demo uses the library through its package name. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). There are 139 commits reachable from the SHA (184 across all refs), 2 merges:
- 136 by `Wesley DuSell`/`Wesley` `<dusellfam@gmail.com>`, 2 with committer `GitHub`;
- 1 by `Adrian Johnson`, with committer `GitHub`.

Records run from 2025-01-19 (`25da15c`, “initial commit”) to the SHA (2026-02-14). Remote branches `codex/…`, `copilot/…` and `gh-pages` were not considered. `git rev-list --objects $SHA --missing=print` lists 446 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single application (the demo) consuming a library from the same workspace (`angular.json:6–22`, `:95–102`; `document.component.ts:3`). No composition configuration references units; the MFE Loader block is an external package cited in the README. |
| Q2 | No | There are not two frontend units; library and demo are not composed units. |
| Q3 | No | No host loading units. |
| Q4 | No | No composition mechanism configured in this repository (recorded search). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “component libraries…” (here an Angular component library, not Web Components) and “repositories mentioning micro-frontends without implementing them”: the micro-frontend loader is an optional block distributed in another package.
- Close to 248 (draft, library citing micro-frontends as a use case) and library cases 015/148/165.
- `repo_type: library`. `frontend_units: 1` and `single-unit` count the demo, like the site in 080. `ui_technologies: [angular]`. `build_tools: []`: the Angular CLI builder and ng-packagr encapsulate the bundler.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** a single README line about a satellite package (“MFE Loader Block”, `README.md:144`) generates three terminology and technology hits. The corresponding code is not in the repository.
- **Protocol (families):** the same owner has `Ba5ik7/ngx-editor-js2-blocks` and `Ba5ik7/seed-mfe-remote` in the rounds (`data/discovery/mfe-round-002/candidates.csv:11728`, `:13194`), outside the sample and not inspected. The MFE Loader block may be in the former, but this was not verified.
- **Protocol (search):** the singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

---
schema: 1
id: 1212374115
full_name: anas-6380/DotNetDevs
url: https://github.com/anas-6380/DotNetDevs
commit: c538dc508770185b82e613f2ce4fbaed207ab9f5
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 372 — anas-6380/DotNetDevs

## Context

Retail ordering platform (“Retail Ordering Platform”, `README.md:1–3`) with an ASP.NET Core API (`RetailOrdering.Api/`) and a single Angular 21 frontend (`retail-ordering-web/`). The README uses “Frontend composition” as a section title about internal frontend organization (`README.md:48–52`), unrelated to unit composition. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:373` records rank 372, ID 1212374115, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:373` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:28558` (`broader`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:28564` (`broader`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-composition`: `"frontend composition" in:name,description,readme` | `broader-frontend-composition` (unpartitioned) | `"frontend composition" in:name,description,readme pushed:>=2025-04-01` | 2026-10-07T23:39:00.779Z / 2026-10-08T16:22:41.410Z |

Hit metadata: null description, no topics, language C#, no license, `fork: false`, size 123, created at 2026-04-16T10:10:02Z, pushed at 2026-04-16T10:15:17Z.

The phrase appears literally in `README.md:48` (“### Frontend composition”), the title of a list about feature structure, shared services, guards and an interceptor (`README.md:49–52`). The last README change is SHA `c538dc5` itself (2026-04-16, “Enhance README and add technical documentation”), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 123 entries, all regular files `100644`; zero symlinks and zero gitlinks. A .NET API (`RetailOrdering.Api/`, `RetailOrdering.slnx`), a single frontend project (`retail-ordering-web/`, 58 files, one `package.json` and one `angular.json`) and Markdown documents at the root. | contrary |
| Configuration | `retail-ordering-web/package.json:4–30`: scripts `ng serve`/`ng build` and Angular 21, without a composition dependency; `retail-ordering-web/angular.json:22–24`: builder `@angular/build:application` with a single `src/main.ts` entry. | contrary |
| Source code | `retail-ordering-web/src/app/app.routes.ts:1–35`: routes `login`, `register`, `customer/*` and `admin`, all with components statically imported from the app itself and protected by guards. | contrary |
| Source code (boundaries) | Search for `../../` in frontend `*.ts`: only internal imports of `core/` and `layout/` from `features/` (for example, `retail-ordering-web/src/app/features/admin/admin-dashboard.component.ts:4–8`). There is a single frontend project. | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile, for `federation`, `single.?spa`, `import.?map`, `iframe`, `customElements` and `micro.?front`: no occurrence. | absent |
| Documentation | `README.md:48–52`: “Frontend composition” as internal Angular app organization. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 2 commits (2 across all refs), no merge, both by `anas-6380` on 2026-04-16: `d71db3e` (“Initial full-stack retail ordering app”) and SHA `c538dc5` (README and technical documentation). `git rev-list --objects $SHA --missing=print` identifies 2 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`retail-ordering-web/`); no composition configuration (recorded search). |
| Q2 | No | There are not two units to assess. |
| Q3 | No | Internal routing (`app.routes.ts:12–35`) organizes components from the same application. |
| Q4 | No | No composition mechanism; “Frontend composition” describes internal structure (`README.md:48–52`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”: an Angular SPA over a .NET API.
- It is not `MFE-unit`: the application exports no contract for an external host.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (Angular `application` builder, `angular.json:22`), `repo_type: example` (“production-style” demonstration project, `README.md:3`).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** broad query `"frontend composition"` matches a section title about internal SPA organization (`README.md:48`).

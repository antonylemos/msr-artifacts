---
schema: 1
id: 1012591256
full_name: jdruper/angular-sandbox
url: https://github.com/jdruper/angular-sandbox
commit: ed38451acdedc80c019cbcbf84a61bc384605ee0
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
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

# 191 — jdruper/angular-sandbox

## Context

“Angular Sandbox Pattern Template” (`README.md:1–7`): single-application Angular 19 template demonstrating the “Sandbox Pattern”, with services isolating business logic from components. Includes PWA support and a synchronization service. “Micro Frontend Ready” appears as a declared scalability quality (`README.md:312`), but repository configures no composition. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:192` records rank 191, ID 1012591256, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:192` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:15913` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:15917` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-07` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:24:04.410Z / 2026-10-08T15:55:14.653Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:39.933Z / 2026-10-08T16:06:16.274Z |

Effective queries append `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Hit metadata:
- description “A production-ready Angular 19 starter template demonstrating the **Sandbox Pattern**…”, without the terms;
- no topics, language TypeScript, `fork: false`, size 218;
- created at 2025-07-02T15:07:24Z, pushed at 2025-07-10T20:40:09Z.

The hit comes from `README.md:312`, “- **Micro Frontend Ready**: Each feature is self-contained”, the only occurrence. Plural “micro frontends” does not appear literally; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is `50277fe` (2025-07-02), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 65 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single Angular project (`angular.json`, `src/app` with `core/`, `features/dashboard/`, `sandbox/` and `shared/`) and architecture documentation in `docs/`. | contrary |
| Configuration / Build | `angular.json:25–29`: builder `@angular/build:application`, one entry `src/main.ts`. `package.json:30–45`: Angular 19 and service worker, without federation, single-spa or Native Federation dependency. `src/app/app.routes.ts:3`: empty routes. | contrary |
| Documentation | `README.md:1–7`: Sandbox pattern in one application. `README.md:310–314`: “Micro Frontend Ready” as a property of self-contained features, alongside “Lazy Loading” and “Service Isolation”. Claimed quality, rather than implemented composition. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA (except `package-lock.json`) for `micro.?front`, `federation`, `remoteEntry` and `single-spa`: only `README.md:312`. | absent |

## Authorship and history

Non-shallow clone; 3 commits, no merges, all by Jose Beita `<jdruper@gmail.com>`: `c8842c6` (2025-07-02, “Basic boilerplate created”), `50277fe` (2025-07-02, “Sandbox pattern creation”) and SHA `ed38451` (2025-07-10, “feat: pwa support and sync service”). No historical blob was read. The clone is partial (`blob:none`) and `git cat-file` confirms object `7919c63…` is unavailable locally; commands depending on it fail under `GIT_NO_LAZY_FETCH=1`, limiting exhaustive attribution of each historical file to what local objects permit.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; “features” are internal folders, rather than units with their own entries. No composition configuration. |
| Q2 | No | There is no second unit whose independence could be assessed; a single build (`angular.json:25–29`). |
| Q3 | No | No host composes units. |
| Q4 | No | No configured composition mechanism (recorded search). |
| Q5 | No | Q1–Q4 are No: Angular application template declaring itself “Micro Frontend Ready”. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”: micro-frontend readiness is a modular architecture claim, without composition.
- A real application exists, hence `frontend_units: 1` and `single-unit`. `ui_technologies: [angular]`, `build_tools: []` (Angular CLI encapsulates the bundler). `repo_type: template` (“starter template”, `README.md:3`).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “Micro Frontend Ready” as a quality of a modular monolithic template.
- **Protocol (search):** plural hit `"micro frontends"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE, Q1–Q5 No, `template`, `[angular]`, one unit and `single-unit`; no open decision (`draft`). One Angular project (entry `src/main.ts`) in 65 regular entries. Historical completeness caveat: missing partial clone object prevents full proof of some old diffs and `name-status`, without affecting reading of cited SHA artifacts or the conclusion.

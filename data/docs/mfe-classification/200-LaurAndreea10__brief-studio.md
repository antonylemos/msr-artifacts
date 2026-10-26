---
schema: 1
id: 1227454539
full_name: LaurAndreea10/brief-studio
url: https://github.com/LaurAndreea10/brief-studio
commit: 6dff88db1ab0aeb85582a8e10807c277f5491c83
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 200 — LaurAndreea10/brief-studio

## Context

“Brief Studio” (`README.md:1–8`): React + Vite marketing tool application (brief generator, mood boards and competitor analysis) using free public APIs, published on GitHub Pages. A single application with state-based navigation (`src/App.jsx:14–30`). Search hit `"single-spa"` comes from expression “The app is a single SPA with view-based routing” (`README.md:137`), rather than the single-spa library. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:201` records rank 200, ID 1227454539, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:201` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:29409` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:29415` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q2` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:35:29.231Z / 2026-10-08T16:21:38.477Z |

Hit metadata:
- description “A free marketing studio”, without the term;
- no topics, language JavaScript, `fork: false`, size 91;
- created at 2026-05-02T17:52:20Z, pushed at 2026-05-02T18:12:50Z;
- homepage `laurandreea10.github.io/brief-studio/`.

The hit comes from `README.md:137`, “The app is a single SPA with view-based routing managed entirely by `useState` in `App.jsx`.”. Spelling is “single SPA”, with a space; GitHub phrase search treats the hyphen in `"single-spa"` as a separator. No SHA file contains `single-spa`.

The README comes from root commit `13d1011` (2026-05-02) and never changed afterward, preceding October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 31 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single Vite project (`index.html`, `src/` with components, views, “engines” and i18n), `CASE_STUDY.md` and a GitHub Pages deployment workflow. | contrary |
| Source code | `src/App.jsx:14–30`: a single root component switches views (`home`, `brief`, `mood`, `competitor`) through `useState`; views are statically imported (`:4–9`). | contrary |
| Configuration / Build | `vite.config.js:4–11`: `react()` and `base: '/brief-studio/'`. `package.json:7–24`: React, framer-motion and Vite, without an MFE dependency. | contrary |
| Search | `git grep -i` at the SHA for `single.?spa`, `micro.?front` and `federation`: only `README.md:137`. | absent |

## Authorship and history

Non-shallow clone; 2 commits, no merges, by `LaurAndreea10` (noreply) through the web interface: `13d1011` (2026-05-02, “Add files via upload”) and SHA `6dff88d` (2026-05-02, “Add GitHub Actions workflow for deployment to Pages”). No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; no composition configuration. |
| Q2 | No | There is no second unit whose independence could be assessed. |
| Q3 | No | No host composes units; `App.jsx` switches internal views. |
| Q4 | No | No composition mechanism (`vite.config.js:4–11`; recorded search). |
| Q5 | No | Q1–Q4 are No: single SPA captured by expression “single SPA”. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. The hit is lexical: “single SPA” meaning one single-page application. Same false positive as 131, 144, 187 and 196.
- A real application exists, hence `frontend_units: 1` and `single-unit`. `ui_technologies: [react]`, `build_tools: [vite]`. `repo_type: other`: published personal tool, without the character of an MFE example, template or library.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** another “single SPA” case captured by technology query `"single-spa"`; recurrence is recorded, without a proposed rule.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

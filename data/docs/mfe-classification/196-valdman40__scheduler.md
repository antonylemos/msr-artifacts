---
schema: 1
id: 1382897771
full_name: valdman40/scheduler
url: https://github.com/valdman40/scheduler
commit: 9d4a656121d62b0f8b5d2271fefbfdbce66ac011
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 196 — valdman40/scheduler

## Context

“Kavua — multi-tenant appointment booking (architecture brief)” (`README.md:1–3`): at the recorded commit, repository contains only planning documentation, a 703-line architecture brief and five implementation plans in `plans/`. There is no code. Described architecture is a single React/Vite SPA (“One build serves both roles”, `README.md:18`). Search hit `"single-spa"` comes from expression “A single SPA built with Vite” (`README.md:669`), rather than the single-spa library. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:197` records rank 196, ID 1382897771, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:197` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:37783` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:37815` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q3` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:36:12.321Z / 2026-10-08T16:21:53.010Z |

Hit metadata:
- null description, no topics, null language, `fork: false`, size 193;
- created at 2026-09-23T06:38:15Z, pushed at 2026-09-23T14:12:12Z.

The hit comes from `README.md:669`, “- **React 18 · Vite 5 · TypeScript**: A single SPA built with Vite…”, the only occurrence. Spelling is “single SPA”, with a space; GitHub phrase search treats the hyphen in `"single-spa"` as a separator. No SHA file contains `single-spa` or micro-frontend mentions.

The README comes from the only commit in `main`, SHA `9d4a656` (2026-09-23), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 7 entries, all regular `100644` files (`README.md` and `plans/README.md`, `plans/PLAN-1…5-*.md`); zero symlinks and zero gitlinks. No code, manifest or configuration. | contrary |
| Documentation | `README.md:5–18`: planned stack (pnpm/Turborepo monorepo with `apps/web`, `apps/api`, `packages/shared`; React/Vite frontend with “One build serves both roles”). `README.md:669`: “A single SPA built with Vite”. Planned frontend is a single application; no frontend composition in the plan. | contrary |
| Search | `git grep -i` at the SHA for `single.?spa`, `micro.?front` and `federation`: only `README.md:669`. | absent |

## Authorship and history

Non-shallow clone; 2 commits across all refs, no merges, by Roy Wald `<roywal@checkpoint.com>`. SHA `9d4a656` (2026-09-23, “Init”) is the only one in `main`. Branch `origin/plan-1-frontend-shell` (`6ca0463`, 2026-09-23, “Plan 1 — monorepo, phone shell, design system, i18n/RTL, mock data”) contains initial implementation and corresponds to `pushed_at`; not considered, as snapshot is the `clones.csv` commit. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the snapshot; only documentation. |
| Q2 | No | Without units, there are no entries or builds. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; planned architecture is a single SPA (`README.md:18`, `669`). |
| Q5 | No | Q1–Q4 are No: architecture brief captured by expression “single SPA”. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. The hit is lexical: “single SPA” meaning a single application. Same false positive as 131, 144 and 187.
- Repository without snapshot implementation, like profiles 011/064/068/073/077/101/111: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** architecture document describing “a single SPA” matches technology query `"single-spa"`.
- **Protocol (snapshot):** initial implementation is in `plan-1-frontend-shell`, outside captured default branch and uninspected; the SHA's documented plan is a single SPA.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

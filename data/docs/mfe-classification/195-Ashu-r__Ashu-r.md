---
schema: 1
id: 295169734
full_name: Ashu-r/Ashu-r
url: https://github.com/Ashu-r/Ashu-r
commit: ae2750dcd0c4a7eab8276093d319573f6e087e8e
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

# 195 — Ashu-r/Ashu-r

## Context

Personal profile repository: a 44-line `README.md` with professional presentation (“Hi, I'm Ashutosh Randive”, `README.md:1–5`), social network SVG icons in `static/icons/` and a workflow generating the profile “snake” animation. README cites professional single-spa experience: a Vue.js frontend migration to React/Vite “via single-spa parcels” (`README.md:21`). No application code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:196` records rank 195, ID 295169734, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:196` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:1391` and `data/discovery/mfe-round-002/candidates.csv:1392`, both `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2020-Q3` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2020-07-01..2020-09-30` | 2026-10-07T23:32:36.867Z / 2026-10-08T16:20:18.974Z |

Hit metadata:
- description “Heya it's me”, without the term;
- no topics, null language, `fork: false`, size 31;
- created at 2020-09-13T14:34:43Z, pushed at 2026-10-08T04:02:55Z, consistent with automatic animation `output` branch updates (`origin/output`, `90af8eb`, by `github-actions[bot]`, “Deploy to GitHub pages”, already on 2026-10-11).

The hit comes from `README.md:21`, “…migration of a legacy Vue.js frontend to a modular React/Vite architecture via single-spa parcels…”, with literal spelling “single-spa”. The README's last change is the SHA itself, `ae2750d` (2026-07-25), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 9 entries, all regular `100644` files: `README.md`, `.github/workflows/snake_animation.yml` and 7 SVG icons; zero symlinks and zero gitlinks. No application code, manifest or build configuration. | contrary |
| Documentation | `README.md:1–5`: professional presentation. `README.md:21`: migration experience through “single-spa parcels” at an employer. Résumé description, without repository implementation. | weak |
| Technology / Configuration / Composition (search) | With inventory limited to README, icons and workflow, `grep -i` for `micro.?front`, `federation` and `single.?spa` finds only `README.md:21`. No mechanism. | absent |

## Authorship and history

Non-shallow clone; 25 commits across all refs, 1 merge, by owner (`Ashu-r`, “Ashutosh”, “Ashutosh Randive”, with `randiveashutosh@gmail.com` and noreply) and 1 by `github-actions[bot]` (animation, on branch `output`). Root is `3450eab` (2020-09-13); SHA is `ae2750d` (2026-07-25, “Revise README content for clarity and detail”). Branch `origin/output` was not considered. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; inventory is README, icons and workflow. |
| Q2 | No | Without units, there are no entries or builds. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; single-spa appears only in résumé text (`README.md:21`). |
| Q5 | No | Q1–Q4 are No: personal profile README. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Repository without implementation, like profiles 011/064/068/073/077/101/111 (and drafts 158/166/173/179/182/188): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** professional single-spa experience described in a profile README matches technology query `"single-spa"` with literal spelling.
- **Protocol (search/eligibility):** eligibility `pass` in both rounds, maintained by automatic profile animation updates.

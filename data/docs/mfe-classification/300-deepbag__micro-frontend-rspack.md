---
schema: 1
id: 1329958608
full_name: deepbag/micro-frontend-rspack
url: https://github.com/deepbag/micro-frontend-rspack
commit: 12ffbcc434814305d41c8fbb875477a744233caa
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

# 300 — deepbag/micro-frontend-rspack

## Context

Empty repository: at the fixed commit, the only one, there is only a one-line `README.md` (“# micro-frontend-rspack”, 23 bytes), created through the GitHub interface. No code, configuration or dependencies. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:301` records rank 300, ID 1329958608, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:301` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:35106` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:35112` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-08` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:40:50.062Z / 2026-10-08T16:01:32.208Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:11:13.636Z / 2026-10-08T16:10:20.504Z |

Effective queries append `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Hit metadata:
- null description, no topics, null language, `fork: false`, size 0;
- created at 2026-08-10T15:14:59Z, pushed at 2026-08-10T15:15:00Z.

Only text is `README.md:1` (“# micro-frontend-rspack”, without final newline), where “micro-frontend” appears within a hyphenated identifier; plural does not appear. Searched fields also include name, and the part responsible for each hit depends on GitHub search text processing, which is not recorded. README belongs to the only commit (2026-08-10), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, regular `100644` file (`README.md`, 23 bytes); zero symlinks and zero gitlinks. No code, configuration or dependencies. | contrary |
| Documentation | `README.md:1`: only a title. | absent |

## Authorship and history

Non-shallow clone; a single commit, `12ffbcc` (2026-08-10, “Initial commit”), by Deep Bag, created through the GitHub interface (committer `GitHub`). Only branch `main`. No objects were missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only a one-line README. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism. |
| Q5 | No | Q1–Q4 are No: empty repository. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”: term is only in title.
- Same framing as draft 265 (initial README-only commit) and profiles 011/064/068/073/077/101/111 (without implementation).
- **Fields:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- No decision remains open.

## Analysis notes

- **Protocol (search):** hyphenated title (or repository name) matches both queries; plural has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

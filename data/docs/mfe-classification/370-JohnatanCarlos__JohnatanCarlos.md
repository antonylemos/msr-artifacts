---
schema: 1
id: 325860876
full_name: JohnatanCarlos/JohnatanCarlos
url: https://github.com/JohnatanCarlos/JohnatanCarlos
commit: 8b50c6e26c8e75077df14e7d07973db141b83e3d
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

# 370 — JohnatanCarlos/JohnatanCarlos

## Context

- **Repository type:** not a software project. It is a GitHub profile README (repository `<usuário>/<usuário>`, description “My Description!”), with a professional introduction, technologies and contacts. It contains personal contact details (`README.md:29`), not reproduced here. Owner/name coincidence is recorded only as repository type, not architectural evidence.

`data/samples/mfe-sample-001/clones.csv:371` records rank 370, ID 325860876, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:371` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:1754` and `data/discovery/mfe-round-002/candidates.csv:1754`, both with `terminology` and `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2020-12` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2020-12-01..2020-12-31` | 2026-10-07T22:16:01.750Z / 2026-10-08T15:51:45.538Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2020-12` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2020-12-01..2020-12-31` | 2026-10-07T22:45:51.456Z / 2026-10-08T16:03:32.620Z |

Hit metadata: description “My Description!”, no topics, null language, no license, `fork: false`, size 15, 1 fork, created at 2020-12-31T19:22:10Z, pushed at 2026-08-30T22:40:09Z.

Plural “Micro Frontends” appears literally in `README.md:12` (“…incluindo arquitetura de Micro Frontends/MFE…”; English translation: “…including Micro Frontends/MFE architecture…”) and `README.md:19` (“`Micro Frontends (MFE)`” in the frontend technology list). Singular “micro frontend” does not appear separately; this hit depends on GitHub search text processing, which is not recorded. The last README change is SHA `8b50c6e` itself (2026-08-30, “Update introduction in README.md”), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, regular file `100644` (`README.md`, 1715 bytes); zero symlinks and zero gitlinks. | absent |
| Documentation | `README.md:12` and `README.md:19`: micro-frontends as professional experience and a technology list item; `README.md:30`: link to an external portfolio, not followed. | weak |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent in the snapshot; without code, there are no imports to search. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 11 reachable commits (11 across all refs), no merge, all by “Johnatan Carlos” through the web interface (committer GitHub), from 2020-12-31 (`e42b2fd`, “Initial commit”) to 2026-08-30 (SHA). All commits touch only `README.md`; history never contained code. `git rev-list --objects $SHA --missing=print` identifies 10 missing historical objects; the SHA blob is present and was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only `README.md` (inventory). |
| Q2 | No | There are no units. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism; micro-frontends appear as experience and technology (`README.md:12`, `19`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”, like profiles 011/064/068/073/077/101/111. In protocol section 3.2, it fits “purely documentation without an implementation”.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, empty arrays.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** profile README (`owner == name`) created in 2020 and reedited in 2026, entering partition `created:2020-12` thanks to a recent push; same pattern as 011.
- **Protocol:** the README exposes a personal email; the annotation does not reproduce it.

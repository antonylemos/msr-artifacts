---
schema: 1
id: 1311273254
full_name: Swatigavhane/swatigavhane
url: https://github.com/Swatigavhane/swatigavhane
commit: 8cb49008ea9d0634d9aa1a2463d124043841f5b8
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

# 352 — Swatigavhane/swatigavhane

## Context

GitHub profile repository: a single `README.md` with introduction and technology list. Micro-frontends appear only as a skill: “**Architecture & Performance**: Frontend Architecture, Micro-frontends, …” (`README.md:8`). There is no code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:353` records rank 352, ID 1311273254, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:353` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:34152` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:34159` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-07` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:39:16.433Z / 2026-10-08T16:01:00.203Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:09:08.693Z / 2026-10-08T16:09:58.275Z |

The effective queries append `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Hit metadata:
- null description, no topics, null language, `fork: false`, size 3;
- created at 2026-07-24T17:25:27Z, pushed at 2026-07-24T17:34:24Z.

The only spelling is “Micro-frontends”, in `README.md:8`. The singular does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The last README change is the SHA itself (2026-07-24), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, regular file `100644` (`README.md`, 688 bytes); zero symlinks and zero gitlinks. | contrary |
| Documentation | `README.md:1–10`: introduction and technology list; `README.md:8` cites “Micro-frontends” as a skill. | weak |

## Authorship and history

Non-shallow clone; 3 linear commits, no merges, all by Swati Gavhane and created through the GitHub interface (committer `GitHub`), on 2026-07-24, from `afb35a6` (“Initial commit”) to SHA `8cb4900` (“Update README.md”). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only a README. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root configuration. |
| Q4 | No | No composition mechanism; only the mention in `README.md:8`. |
| Q5 | No | Q1–Q4 are No: profile repository. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- Same categorization as profile finals 011/064/068/073/077/101/111 and drafts 285, 303 and 337.
- **Fields:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** a skill listed in a profile README matches terminology queries.
- **Protocol (search):** the singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

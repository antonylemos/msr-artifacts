---
schema: 1
id: 1342216834
full_name: h-kod/h-kod
url: https://github.com/h-kod/h-kod
commit: b9ca40378679213183615d2d28cbd7be59bb294e
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

# 337 — h-kod/h-kod

## Context

GitHub profile repository (description “Hüseyin — GitHub profil sayfası”; English translation: “Hüseyin — GitHub profile page”): a single `README.md` with professional introduction and links. Micro-frontends appear only as a field of work: “🧩 **Frontend Architecture · Micro Frontends · Design Systems**” (`README.md:6`). There is no code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:338` records rank 337, ID 1342216834, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:338` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:35828` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:35833` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-08` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:41:05.284Z / 2026-10-08T16:01:37.201Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:11:30.673Z / 2026-10-08T16:10:23.632Z |

The effective queries append `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Hit metadata:
- description “Hüseyin — GitHub profil sayfası” (English translation: “Hüseyin — GitHub profile page”), no topics, null language, `fork: false`, size 0;
- created at 2026-08-21T20:56:58Z, pushed at 2026-08-27T17:38:42Z.

Spelling “Micro Frontends” is in `README.md:6`. The singular does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The README is from the only commit (2026-08-21), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, regular file `100644` (`README.md`, 704 bytes); zero symlinks and zero gitlinks. | contrary |
| Documentation | `README.md:1–12`: professional introduction; `README.md:6` lists “Micro Frontends” among fields of work. | weak |

## Authorship and history

Non-shallow clone; a single commit, `b9ca403` (2026-08-21, “Add profile README”), with author “Hüseyin” and committer `h-kod`. Only branch `main` exists. There was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only a README. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root configuration. |
| Q4 | No | No composition mechanism; only the mention in `README.md:6`. |
| Q5 | No | Q1–Q4 are No: profile repository. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- Same categorization as profile finals 011/064/068/073/077/101/111 and drafts 285 and 303.
- **Fields:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** field of work in a profile README matches terminology queries.
- **Protocol (search):** the singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

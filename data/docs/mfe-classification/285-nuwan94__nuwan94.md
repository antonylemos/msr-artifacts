---
schema: 1
id: 289075385
full_name: nuwan94/nuwan94
url: https://github.com/nuwan94/nuwan94
commit: bcc657db5579a4c7e9599a8855a91a32e4d62422
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

# 285 — nuwan94/nuwan94

## Context

GitHub profile repository: a single `README.md` with personal presentation, links, technology list and statistics widgets. The microfrontends mention is a professional interest line: “Currently building modular **microfrontend** and **microservice** architectures” (`README.md:23`). There is no code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:286` records rank 285, ID 289075385, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred. Personal contact data from README is not reproduced.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:286` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:1300` and `data/discovery/mfe-round-002/candidates.csv:1300`, both `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2020-08` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:19:53.092Z / 2026-10-08T15:35:24.222Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:04:51.192Z / 2026-10-08T15:45:00.997Z |

Effective queries append `pushed:>=2025-04-01 created:2020-08-01..2020-08-31`.

Hit metadata:
- null description, no topics, null language, `fork: false`, size 6;
- created at 2020-08-20T18:05:35Z, pushed at 2025-10-25T18:07:15Z.

Spelling “microfrontend” is at `README.md:23`. Plural does not appear literally; that hit depends on GitHub search text processing, which is not recorded. README's last change is the SHA itself (2025-10-25), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, regular `100644` file (`README.md`, 3,087 bytes); zero symlinks and zero gitlinks. | contrary |
| Documentation | `README.md:18–41`: professional presentation and technology list. `README.md:23`: declared microfrontend architecture interest, without implementation. | weak |

## Authorship and history

Non-shallow clone; 5 linear commits, no merges, all edited through the GitHub interface (committer `GitHub`), from 2020-08-20 (`e91b7fb`, “Initial commit”) to 2025-10-25 (SHA `bcc657d`, “Update README.md”). Authors are “Nuwan Sameera Alawatta” (3) and “Nuwan Alawatta” (2). Only branch `master`. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only a README. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; only mention at `README.md:23`. |
| Q5 | No | Q1–Q4 are No: profile repository. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Same framing as final profile records 011/064/068/073/077/101/111.
- **Fields:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** professional interest mention in a profile README matches terminology queries.
- **Protocol (search):** plural hit has no literal spelling. Eligibility `pass` in both rounds.

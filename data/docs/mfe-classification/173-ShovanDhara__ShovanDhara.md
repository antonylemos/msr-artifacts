---
schema: 1
id: 865249831
full_name: ShovanDhara/ShovanDhara
url: https://github.com/ShovanDhara/ShovanDhara
commit: e049c846aed2c700cc590321b4c8a5b819ea65aa
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

# 173 — ShovanDhara/ShovanDhara

## Context

Personal profile repository: only a 35-line `README.md`, introducing a front-end developer and listing technologies (`README.md:1–8`, `15–30`). “Single SPA” appears in the framework list (`README.md:17`) and “Micro Front-End” in the architecture list (`README.md:21`). There is no code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:174` records rank 173, ID 865249831, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:174` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:10143` and `data/discovery/mfe-round-002/candidates.csv:10149`, both `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2024-Q3` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2024-07-01..2024-09-30` | 2026-10-07T23:33:17.518Z / 2026-10-08T16:20:51.088Z |

Hit metadata:
- description “Profile Information”, without the term;
- no topics, null language, `fork: false`, size 14;
- created at 2024-09-30T08:23:48Z, pushed at 2026-01-01T08:46:44Z.

The hit comes from `README.md:17`, “Framework / Library – Angular (2,5, 7, 11), React, NEXT Js, React Query, Redux, Single SPA”. Spelling is “Single SPA”, with a space; GitHub phrase search treats the hyphen in `"single-spa"` as a separator. Here the expression probably refers to the single-spa library, but only as a skill list item.

The README's last change is the SHA itself, `e049c84` (2026-01-01, “Update README to clarify database and query language”), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, `README.md` (`100644`); zero symlinks and zero gitlinks. No code, manifest or configuration. | contrary |
| Documentation | `README.md:1–8`: introduction (“Hi, there… It's Shovan”, “As a `Front End Developer`…”). `README.md:17`: “Single SPA” among frameworks. `README.md:21`: “Architecture – Monolithic, Micro Front-End”. Declared skills, without a described project. | weak |
| Technology / Configuration / Composition (search) | With inventory limited to the README, `grep -i` for `micro.?front`, `federation`, `single` and `spa` finds only `README.md:17` and `21`. No mechanism. | absent |

## Authorship and history

Non-shallow clone; 9 commits, no merges, all by owner `<shovan.9836@gmail.com>` (“Shovan” 7, “ShovanGit” 2), through the web interface (GitHub committer). They span 2024-09-30 (`96f2c6d`, “Initial commit”) to 2026-01-01 (SHA), and all change only the README. No historical blob was read. The clone is partial (`blob:none`) and historical content search (`git log -S`) fails under `GIT_NO_LAZY_FETCH=1` with a missing promised object; without network, the earlier commit introducing each README mention cannot be determined. The assessed SHA's README and tree are readable.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; inventory is only the README. |
| Q2 | No | Without units, there are no entries or builds. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; “Single SPA” and “Micro Front-End” appear only in skill lists (`README.md:17`, `21`). |
| Q5 | No | Q1–Q4 are No: personal profile README. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Repository without implementation, like profiles 011/064/068/073/077/101/111 (and drafts 158/166): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “Single SPA” skill list item in a profile README suffices for technology query `"single-spa"`. Same spaced spelling as 131/144, here probably referring to the library.
- **Protocol (search):** entry only through this query, with eligibility `pass` in both rounds.
- **Independent review contribution (Lupa):** full agreement with Non-MFE, Q1–Q5 No, `other`, zero units and `none`; no open decision (`draft`). “Single SPA” and “Micro Front-End” mentions are profile skill lists. Adopted correction: the claim that no objects were missing was replaced with the partial clone limitation. Provenance: by elimination the README is the only compatible field, specifically “Single SPA” at `README.md:17`; indexer behavior equating space and hyphen remains inference, rather than a stored fact. Final comparables: 011 and 064.

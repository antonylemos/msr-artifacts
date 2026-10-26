---
schema: 1
id: 1261312292
full_name: arnabbiswas66/arnabbiswas66
url: https://github.com/arnabbiswas66/arnabbiswas66
commit: 53253aa37fec95c10fe0160e31f4dcd48bf9d4c7
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

# 158 — arnabbiswas66/arnabbiswas66

## Context

Personal profile repository: only a 230-line `README.md` presenting professional information, with position, skills and technology badges (`README.md:1–15`). Micro-frontends appear as a listed skill (`README.md:67`) and a badge (`README.md:134`). There is no code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:159` records rank 158, ID 1261312292, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:159` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:31376` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:31384` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-06` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:09.942Z / 2026-10-08T16:00:33.998Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:07:40.889Z / 2026-10-08T16:09:45.214Z |

Effective queries append `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Hit metadata:
- null description, no topics, null language, `fork: false`, size 12;
- created at 2026-06-06T14:16:43Z, pushed at 2026-06-06T14:18:48Z.

Without a description, the hit comes from the README:
- “Micro Frontends”: `README.md:67` (“- Microservices, Micro Frontends, API-first design …”);
- “Micro Frontend”: `README.md:134`, badge alt text `![Micro Frontend](…Micro_Frontend…)`.

The README's last change is the SHA itself, `53253aa` (2026-06-06), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, `README.md` (`100644`); zero symlinks and zero gitlinks. No code, manifest or configuration. | contrary |
| Documentation | `README.md:1–15`: “Hi, I'm Arnab Biswas”, with position and contacts. `README.md:67`: skills. `README.md:134`: “Micro Frontend” badge. Personal presentation, without a description of an implemented system. | weak |
| Technology / Configuration / Composition (search) | With the inventory limited to the README, `grep -i` for `micro.?front`, `federation` and `single-spa` finds only `README.md:67` and `134`. No mechanism. | absent |

## Authorship and history

Non-shallow clone; 3 commits, no merges, all by Arnab Biswas `<arnabbiswas66@gmail.com>` through the web interface (GitHub committer), on 2026-06-06 between 15:16 and 15:18 (+01:00): `8ca9685` (“Initial commit”), `bdb91fd` (“Revamp README.md with personal and project details”) and SHA `53253aa` (“Update years of experience in README”). No historical blob was read. The clone is partial (`blob:none`) and there are two missing promisor objects in reachable history; the only blob in the current tree was read, without network.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; the inventory is only the README. |
| Q2 | No | Without units, there are no entries or builds. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; terms appear only in the skill list and badge (`README.md:67`, `134`). |
| Q5 | No | Q1–Q4 are No: personal profile README. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Repository without implementation, like profiles 011/064/068/073/077/101/111: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** personal presentation README with “Micro Frontends” among declared skills, the same profile as the cited final records.
- **Protocol (search):** both searched spellings are literally in the README. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE and Q1–Q5 No (personal profile mentioning skills, without frontend or composition); no open decision. Adopted correction: the sentence “no objects were missing” was replaced (two missing promisor objects, verified). The assessed commit's README and decision evidence were read.

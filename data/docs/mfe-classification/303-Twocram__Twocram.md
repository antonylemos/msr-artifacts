---
schema: 1
id: 1320881755
full_name: Twocram/Twocram
url: https://github.com/Twocram/Twocram
commit: 6138b959b30039c8d0c65965f81d93f2a8974c98
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

# 303 — Twocram/Twocram

## Context

GitHub profile repository: a single `README.md` with an illustrative TypeScript block presenting author, stack and contacts (`README.md:1–23`). Module Federation appears only as a tool list item (`README.md:13`). No executable code or application. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:304` records rank 303, ID 1320881755, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred. Personal contact data from README is not reproduced.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:304` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:34651` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:34657` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns a single hit in each round. It comes from endpoint `repositories`, query `technology-module-federation-repositories` (`"module federation" in:name,description,readme`), subquery `…#created:2026-08`, with empty `path`. Collection times are 2026-10-07T23:30:05.892Z (001) and 2026-10-08T16:19:18.549Z (002). Effective query appends `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Hit metadata:
- null description, no topics, null language, `fork: false`, size 0;
- created at 2026-08-02T22:37:10Z, pushed at 2026-08-02T22:39:54Z.

Literal spelling is at `README.md:13` (`tooling: ["Vite", "Module Federation", "Vitest", "Jest", "Docker"]`). README belongs to the only commit (2026-08-03), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, regular `100644` file (`README.md`, 610 bytes); zero symlinks and zero gitlinks. | contrary |
| Documentation | `README.md:1–23`: illustrative code block with name, role, stack and contacts; `README.md:13` lists “Module Federation” among tools. | weak |

## Authorship and history

Non-shallow clone; a single commit, `6138b95` (2026-08-03, “feat: initial commit”), by Artem Maslov. Only branch `main`. No objects were missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only a README. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | No host, shell or root configuration. |
| Q4 | No | No composition mechanism; Module Federation only mentioned at `README.md:13`. |
| Q5 | No | Q1–Q4 are No: profile repository. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Same framing as final profile records 011/064/068/073/077/101/111 and draft 285.
- **Fields:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** Module Federation cited as a tool in a profile README matches the repository technology query.
- **Protocol (search):** literal spelling in README. Eligibility changes from `unknown` (001) to `pass` (002).

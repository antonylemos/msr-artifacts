---
schema: 1
id: 951812698
full_name: EvgenyKlyukin/EvgenyKlyukin
url: https://github.com/EvgenyKlyukin/EvgenyKlyukin
commit: 00e199a49c698a2b1ac9eede3fef5dfa542e7450
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

# 233 — EvgenyKlyukin/EvgenyKlyukin

## Context

Personal GitHub profile repository: a single `README.md` (103 lines) with a professional introduction of a fullstack developer focused on backend, AI and data, technology badges and a list of experience. Micro-frontends appear only as declared experience: “Contributed to an internal administration platform using a host application and a connected microfrontend.” (`README.md:94–95`). There is no code. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:234` records rank 233, ID 951812698, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:234` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:12267` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:12272` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-03` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:27:14.489Z / 2026-10-08T15:37:23.336Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:07:04.273Z / 2026-10-08T15:46:56.927Z |

The effective queries append `pushed:>=2025-04-01 created:2025-03-01..2025-03-31`.

Hit metadata:
- null description, no topics, null language, `fork: false`, size 90;
- created at 2025-03-20T09:31:53Z, pushed at 2026-09-26T20:35:29Z.

The match comes from `README.md:95`, “…a host application and a connected microfrontend.”, the only occurrence. The plural “microfrontends” does not appear literally; this hit depends on GitHub search text processing, which is not recorded.

The last README change is the SHA itself, `00e199a` (2026-09-27), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1 entry, `README.md` (`100644`, 4.699 bytes); zero symlinks and zero gitlinks. There is no code, manifest or configuration. | contrary |
| Documentation | `README.md:1–14`: personal introduction. `README.md:84–95`: experience, including contribution to a platform with “host application and a connected microfrontend”. This is declared experience in another context, without a project in this repository. | weak |
| Search | With the inventory reduced to one file, searching for `micro.?front`, `federation` and `single.?spa` finds only `README.md:95`. No mechanism. | absent |

## Authorship and history

Non-shallow clone; 43 linear commits, no merges, all by Evgeny Klyukin `<key.klyukin@gmail.com>`, from 2025-03-20 (`189ea66`, “Initial commit”) to 2026-09-27 (SHA `00e199a`, “Update README.md”), almost all README edits; `6ce72a7` (2026-09-27, “docs: modernize profile README”) rewrote the profile. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; the inventory is only `README.md`. |
| Q2 | No | Without units, there are no entry points or builds. |
| Q3 | No | There is no host, shell or root configuration. |
| Q4 | No | No composition mechanism; the cited micro-frontend is professional experience (`README.md:94–95`). |
| Q5 | No | Q1–Q4 are No: personal profile README. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- Profile repository without implementation, as in finals 011/064/068/073/077/101/111 and drafts 158/166/173/179/182/188/195/198/219: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** professional experience with “host application and a connected microfrontend” in a profile README.
- **Protocol (search):** the plural hit `microfrontends` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

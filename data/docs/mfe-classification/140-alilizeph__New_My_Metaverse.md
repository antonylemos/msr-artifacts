---
schema: 1
id: 1150707772
full_name: alilizeph/New_My_Metaverse
url: https://github.com/alilizeph/New_My_Metaverse
commit: 668aab5cb81412aaa58d40c9b1e1f88ea93869a1
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

# 140 — alilizeph/New_My_Metaverse

## Context

Repository contains only one `README.md`, introducing a planned project: Spring Boot 4 REST API and Angular 21 frontend for a videogame store (`README.md:1–7`). Sections “BACKEND COMPOSITION” and “FRONTEND COMPOSITION” are empty (`README.md:11–20`). No code, configuration or frontend exists in snapshot. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:141` records rank 140, ID 1150707772, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:141` records strategy `broader` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:24468` (`broader`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:24475` (`broader`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-composition`: `"frontend composition" in:name,description,readme` | `broader-frontend-composition` (without partition) | `"frontend composition" in:name,description,readme pushed:>=2025-04-01` | 2026-10-07T23:38:47.022Z / 2026-10-08T16:22:36.838Z |

Hit metadata:
- description “New My Metaverse is an API REST with Spring Boot 4 for backend and Angular 21 for frontend.”;
- no topics, null language, `fork: false`, size 2;
- creation at 2026-02-05T15:44:51Z, push at 2026-02-05T16:08:31Z.

Description lacks phrase. By elimination, retrieval comes from `README.md:18`, “## FRONTEND COMPOSITION”: an empty section heading, with literal phrase (uppercase).

Last README change is SHA itself, `668aab5` (2026-02-05T17:08:31+01:00), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: one entry, `README.md` (`100644`, 650 bytes); zero symlinks and zero gitlinks. No manifest, source code, configuration or assets. | contrary |
| Documentation | `README.md:5–7` describes project (Spring Boot 4 + Angular 21, DTO pattern, game store) as a training graduation project. `README.md:11–20`: sections “BACKEND COMPOSITION”, “Entities and Enums” and “FRONTEND COMPOSITION” are empty. | context |
| Technology / Configuration / Composition (search) | Inventory is only README; complete reading: no mention of micro-frontends, federation, single-spa, iframe or any composition mechanism. “FRONTEND COMPOSITION” (`README.md:18`) is a heading without content. | absent |

## Authorship and history

Non-shallow clone; 2 commits, no merge, both by BUFFARD Alexandre `<118019350+alilizeph@users.noreply.github.com>` on 2026-02-05. Root `c3a0782` (“Initial commit”) adds `README.md`, and SHA `668aab5` (“Update README.md”) changes it (`git log --no-renames --name-status`). No other file existed in reachable history. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in repository; sole file is `README.md`. No composition configuration exists. |
| Q2 | No | Without units, no entries or builds exist. |
| Q3 | No | No host, shell or root configuration exists. |
| Q4 | No | No composition mechanism is configured; “FRONTEND COMPOSITION” is empty heading (`README.md:18`). |
| Q5 | No | Q1–Q4 are No: repository containing only README of planned project. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Same profile as 011/064/068/073/077/101/111: repository without implementation, only README, recorded as `repo_type: other`, `frontend_units: 0` and `unit_organization: none`. In automatic filtering (protocol section 3.2), it would fit “purely documentation without an implementation”.
- Unlike those profiles, README mentions no micro-frontends. Retrieval comes only from generic heading “FRONTEND COMPOSITION”, captured by broad query.
- `ui_technologies: []` and `build_tools: []`: Angular and Spring Boot are only declared in text, without observed artifact.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** broad query `"frontend composition"` matched a README section heading about frontend “composition” (structure), unrelated to unit composition.
- **Protocol (filtering):** repository with metadata size 2 and one tree entry, which automatic “not software projects” filters would eliminate. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE, Q1–Q5 No, `other` and zero units; no open decision. Snapshot has one entry (`README.md`, 650 bytes), without manifest, code, configuration or asset, and history has two commits touching only README. Retrieval comes from literal heading "FRONTEND COMPOSITION" in `README.md:18`, without content below (elimination between name, description, topics and README); hit description ("API REST with Spring Boot 4 … Angular 21 for frontend") lacks queried expression. README predates searches (2026-02-05). Lexical signal is even weaker than profile 011 (empty heading), with same criterion of evaluating implemented snapshot content.

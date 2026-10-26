---
schema: 1
id: 1250413921
full_name: dani-b-g/dani-b-g
url: https://github.com/dani-b-g/dani-b-g
commit: dfdddc9f208ec18b69023ffdc29ffc585d7838ec
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

# 298 — dani-b-g/dani-b-g

## Context

- **Repository type:** not a software project. GitHub profile README (repository `<user>/<user>`), with professional presentation, technology badges, promotion of a side project (TournamentZZZ, hosted outside GitHub) and activity cards. Owner/name equality is recorded only as repository type, rather than architectural evidence.

`data/samples/mfe-sample-001/clones.csv:299` records rank 298, ID 1250413921, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:299` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:30744` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:30751` (`terminology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-05` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T21:13:18.648Z / 2026-10-08T15:42:32.629Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-05` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T22:12:42.392Z / 2026-10-08T15:49:48.534Z |

Hit metadata: null description, no topics, null language, no license, `fork: false`, size 212, created at 2026-05-26T15:53:06Z, pushed at 2026-05-26T16:22:03Z.

Both spellings appear literally in README:
- singular “microfrontend”: `README.md:14` (“a strong focus on Angular, microfrontend architecture, accessibility…”);
- plural “microfrontends”: `README.md:22` (“design systems, microfrontends and scalable UI platforms”), `README.md:89` (“Microfrontends” badge) and `README.md:178` (“Microfrontends → independent delivery without losing product consistency”); also in header URL (`README.md:2`, “Microfrontends” encoded in `desc` parameter).

README's last change is SHA `dfdddc9` itself (2026-05-26, “fix images activity”), before collection on October 7 and 8, 2026. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 4 entries, all regular `100644` files; zero symlinks and zero gitlinks: `.gitignore` (only `/SETUP.md`, `.gitignore:1`), `README.md` and two PNG screenshots in `assets/` referenced by README (`README.md:64–65`). No manifest, code, build configuration or workflow. | absent |
| Documentation | `README.md:14`, `22`, `89` and `178`: micro-frontends as professional focus, badge and engineering principle; `README.md:37–66`: side project TournamentZZZ (Angular 21, NestJS) described and linked to an external website (`README.md:8`, `25`), without repository code; `README.md:119–134`: other author repository links, not followed. | weak |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent in snapshot; no code, hence no relative imports to search for. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 3 reachable commits (3 across all refs), no merges, all by `dani-b-g <daniel.barriga.grados@gmail.com>` (author and committer) on 2026-05-26: root `dd7834d` (“first commit”) adds all four files; `e3be20d` (“fix: cambio github activity”, English translation: “fix: change github activity”) and SHA `dfdddc9` (“fix images activity”) change only `README.md`. History never contained code. No historical blob was read. `git rev-list --objects $SHA --missing=print` identifies 2 missing historical objects; cited SHA blobs were read (PNGs only as tree entries).

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only README, `.gitignore` and two images (inventory). |
| Q2 | No | No units. |
| Q3 | No | No host, shell or root config. |
| Q4 | No | No composition mechanism; micro-frontends appear only as skill and principle (`README.md:22`, `178`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”, like profiles 011/064/068/073/077/101/111. In protocol section 3.2, fits “purely documentation without an implementation”.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, empty arrays.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** profile README (`owner == name`) with several “microfrontend(s)” mentions, including a badge and generated image URL, matching both terminology queries; same pattern as 011.
- **Protocol (search):** both spellings have literal occurrences. Eligibility changes from `unknown` (001, `activity_incomplete`) to `pass` (002).

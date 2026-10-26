---
schema: 1
id: 1213587080
full_name: yesrab/yesrab
url: https://github.com/yesrab/yesrab
commit: 4a3f236d6c5ca7fe095c0a6cfd800aa3a0ec56a1
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

# 360 — yesrab/yesrab

## Context

- **Repository type:** not a software project with an application. GitHub profile repository (`<usuário>/<usuário>`): an introduction README and the author’s LaTeX resume (`main.tex`, class `cvhari.cls`), compiled into PDF by GitHub Actions (description “this is my Letex resume”). Owner/name coincidence is recorded only as repository type, not architectural evidence.

`data/samples/mfe-sample-001/clones.csv:361` records rank 360, ID 1213587080, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:361` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:28616` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:28622` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-04` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-04-30` | 2026-10-07T22:34:37.622Z / 2026-10-08T15:59:05.472Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-04` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-04-30` | 2026-10-07T23:03:00.607Z / 2026-10-08T16:08:51.936Z |

Hit metadata: description “this is my Letex resume”, no topics, language TeX, GPL-3.0 license, `fork: false`, size 26, created at 2026-04-17T14:39:11Z, pushed at 2026-06-28T20:06:18Z.

The only term occurrence in the README is `README.md:3`: “I’m currently learning **advanced NestJS, micro-frontend architecture & scalable RBAC**”, singular and hyphenated (hyphen as separator). Plural “micro frontends” does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The last README change is SHA `4a3f236` itself (2026-06-29, “chore: updated readme”), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 7 entries, all regular files `100644`; zero symlinks and zero gitlinks: `.github/workflows/build-pdf.yml`, `.gitignore`, `.vscode/settings.json`, `LICENSE`, `README.md`, `cvhari.cls` and `main.tex`. No web application code. | absent |
| Build/deploy | `.github/workflows/build-pdf.yml:1–30`: compiles `main.tex` into PDF (`xu-cheng/latex-action`, `:22–26`) and prepares resume publication. | context |
| Documentation | `README.md:3`: micro-frontends as a topic the author is learning; `main.tex:120`: “Micro-frontend Architecture” among practices listed in the resume. | weak |
| Technology / Configuration / Source code / Composition | Nonexistent; without code, there are no imports between units to search. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 7 reachable commits (7 across all refs), no merges, from 2026-04-17 (`7e71690`, “Initial commit”, through the web interface) to 2026-06-29 (SHA). Authorship: the owner with three identities (`yesrab <yesrab.ali111@gmail.com>`, `Yesrab Ali` with the same email, and `yesrabali` with corporate email in `358ee16`). Tag `resume-17-04-2026` not considered separately. History never contained application code. `git rev-list --objects $SHA --missing=print` identifies 4 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; only README, LaTeX resume and PDF workflow (inventory). |
| Q2 | No | There are no units. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism; the term is a study topic and resume item (`README.md:3`; `main.tex:120`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”, as in profiles 011/064/068/073/077/101/111.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, empty arrays.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** profile README (`owner == name`) also versioning a LaTeX resume; “micro-frontend” appears as ongoing learning and a listed practice.

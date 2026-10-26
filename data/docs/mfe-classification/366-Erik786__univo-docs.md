---
schema: 1
id: 1322173014
full_name: Erik786/univo-docs
url: https://github.com/Erik786/univo-docs
commit: 84bd176c0cb4e78e0853fcecbae7fe77510f45d8
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

# 366 — Erik786/univo-docs

## Context

- **Repository type:** not a software project with an implementation. It is product documentation (GitBook) for an LMS platform (“LXS Univo — Product documentation, developer guides and roadmap”), comprising only Markdown and two images. Documentation describes three React micro-frontends maintained in other repositories (`lms-mfe-app`, `lms-mfe-auth`, `lms-mfe-admin`, `architecture/micro-frontends.md:7–11`), whose code is not in this snapshot. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:367` records rank 366, ID 1322173014, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:367` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:34710` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:34716` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-08` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-08-01..2026-08-31` | 2026-10-07T22:40:50.062Z / 2026-10-08T16:01:32.208Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-08` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-08-01..2026-08-31` | 2026-10-07T23:10:56.388Z / 2026-10-08T16:10:16.961Z |

Hit metadata: description “LXS Univo — Product documentation, developer guides and roadmap”, no topics, null language, no license, `fork: false`, size 3239, 1 star, created at 2026-08-03T19:37:40Z, pushed at 2026-09-07T08:53:00Z.

Both spellings appear hyphenated in the README (hyphen as separator): plural in `README.md:33` (“React micro-frontends, GraphQL on AWS Lambda…”) and singular in `README.md:71–73` (“React 17 SPA (micro-frontend)”, component table rows). The last README change is `1ce0772` (2026-09-04), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 41 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are 39 Markdown files (including GitBook `SUMMARY.md` and a translation in `fr/`) and two images in `.gitbook/assets/`. No historical commit added another file type. | absent |
| Documentation (architecture) | `architecture/micro-frontends.md:3`: “three independent micro-frontends, each a separate Create React App (React 17) codebase”; `:7–11`: repositories `lms-mfe-app`, `lms-mfe-auth`, `lms-mfe-admin`, served at `/app`, `/auth`, `/v2-admin`; `:15–17`: separate builds and deployments to S3/CloudFront under one domain; `:21–25`: JWT session in `localStorage` and navigation between MFEs through environment URLs. | weak |
| Documentation (guides) | `developer-guides/mfe-app.md`, `mfe-admin.md`, `mfe-auth.md`: development guides for external MFEs; `README.md:69–78`: platform components table. | context |
| Technology / Configuration / Source code / Composition / Build/deploy | Nonexistent in the snapshot; the three MFEs and their configuration are in other repositories, not referenced by any configuration versioned here. Without code, there are no imports to search. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 34 reachable commits (36 across all refs), 1 merge, from 2026-08-03 (`1b44191`, “Initial commit”) to 2026-09-07 (SHA `84bd176`, “docs(summary): rename Tutor operations entry”). Authorship: “Eric G” in 19 commits (18 through the web interface, 1 through `gitbook-bot`), a server `root` identity in 14 and “Salim (CTO)” in 1. Remote refs `docs/qa-fixes-fr-specs` and `gitbook-home-export` not considered separately. `git rev-list --objects $SHA --missing=print` identifies 91 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the repository; MFEs are only described (`architecture/micro-frontends.md:7–11`), and no composition configuration references them. |
| Q2 | No | There are no units. |
| Q3 | No | There is no host, shell or root config in the snapshot. |
| Q4 | No | No mechanism configured; composition through routes under CloudFront and redirection is described in text (`architecture/micro-frontends.md:15–25`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”; in protocol section 3.2, “repositories that are purely documentation without an implementation”, like final 023 and the content exclusion in 075/081/094/105.
- Documentation describes a real MFE architecture in other repositories, but Q1 requires units in the repository or referenced by composition configuration; here there is no configuration at all.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, empty arrays.
- There is no open decision.

## Analysis notes

- **Protocol (multi-repository ecosystem):** cited repositories `lms-mfe-app`, `lms-mfe-auth` and `lms-mfe-admin` do not appear in the rounds under any owner (search for `/lms-mfe-(app|auth|admin)` in `data/discovery/mfe-round-002/candidates.csv`: no occurrence; the account has only `Erik786/univo-docs`, `:34716`); if private or owned by another organization, the documented architecture is not observable in the corpus.
- **RQ1 (misleading signals):** product documentation with a page dedicated to micro-frontend architecture generates terminology hits without code.
- **RQ2 (documented, not observed):** composition described through routes under CloudFront, shared session through `localStorage` and sibling MFE URLs in build variables, without runtime federation.

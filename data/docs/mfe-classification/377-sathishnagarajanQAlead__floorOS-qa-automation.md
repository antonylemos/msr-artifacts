---
schema: 1
id: 1355778817
full_name: sathishnagarajanQAlead/floorOS-qa-automation
url: https://github.com/sathishnagarajanQAlead/floorOS-qa-automation
commit: f26e76238a0638f51b162049320e3a786ea982ba
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

# 377 — sathishnagarajanQAlead/floorOS-qa-automation

## Context

Playwright E2E testing framework for a system called floorOS, organized by module (CRM, Mill, Costing etc.) so each QA handles one module (`README.md:1–6`). The README and `src/config/modules.ts` describe the tested system as “a shell + remotes micro-frontend”: `app-shell` handles authentication and routing, and each module is mounted at its own path (`README.md:10–12`; `src/config/modules.ts:4–9`). That system’s code is in another repository. Here there are only page objects, fixtures, specs and test cases. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:378` records rank 377, ID 1355778817, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:378` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:36613` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:36621` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-09` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:43:47.840Z / 2026-10-08T16:02:30.405Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:13:00.432Z / 2026-10-08T16:10:54.650Z |

The effective queries append `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 69;
- created at 2026-09-03T09:35:45Z, pushed at 2026-09-03T10:00:55Z.

Spelling “micro-frontend” is in `README.md:10`. Plural does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The last README change is `661fa97` (2026-09-03), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 55 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are `playwright.config.ts`, `src/` (API client, config, fixtures, page objects, utils), `tests/` (specs per module), `test-cases/` (Markdown) and documents. There is no frontend application. | contrary |
| Configuration | `src/config/modules.ts:1–30`: list of tested system modules (`crm`, `mill`, `costing`, `planning`, `techpack`, `master-data`, `admin`, `copilot`), all accessed through the shell (`:7–9`). Configures tests, not composition. | context |
| Documentation | `README.md:10–12`: description of the tested system’s architecture, which is outside the repository. | context |

## Authorship and history

Non-shallow clone; 3 linear commits, no merge, all by Sathish Nagarajan, on 2026-09-03: `661fa97` (“Initial commit: floorOS QA automation framework”), `1285b73` and SHA `f26e762`. Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; the repository contains only E2E tests of an external system. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root composition configuration; the tested shell is outside the repository. |
| Q4 | No | No composition mechanism configured. |
| Q5 | No | Q1–Q4 are No: testing project for an external MFE system. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”: tests exercise an MFE system absent from the snapshot.
- **Fields:** `repo_type: other` (test automation), `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** a QA repository describing the tested system’s architecture matches terminology queries.
- **RQ3:** test organization by module mirrors unit autonomy (`src/config/modules.ts:11–14`), without access to the system.
- **Protocol (search):** the plural hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

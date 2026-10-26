---
schema: 1
id: 1265404002
full_name: angelcolorado/endurance-ui
url: https://github.com/angelcolorado/endurance-ui
commit: 7b53daa4c19ee67815514d07de7c3b9e4a100463
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 361 — angelcolorado/endurance-ui

## Context

Angular SPA (standalone, SSR, Tailwind) for race logistics, with authentication, dashboard, event and logistics modules (`src/app/features/`). The README describes it as “Angular SPA — micro-frontend client for the EnduranceOps race logistics platform.” (`README.md:3`). In the snapshot, however, it is a single Angular application, without federation, host or another unit. `ABOUT_ME.md:5` cites “arquitecturas de micro-frontends” (English translation: “micro-frontends architectures”) as an author interest. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:362` records rank 361, ID 1265404002, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:362` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:31632` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:31640` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-06` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:23.431Z / 2026-10-08T16:00:38.564Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:08:11.673Z / 2026-10-08T16:09:47.363Z |

The effective queries append `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 382;
- created at 2026-06-10T18:38:44Z, pushed at 2026-07-03T22:16:17Z.

Spelling “micro-frontend” is in `README.md:3`. The plural does not appear in the README; it appears in `ABOUT_ME.md:5`, outside the searched fields. This hit depends on GitHub search text processing, which is not recorded. The last README change is the SHA itself (2026-07-03), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 72 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single Angular application (`angular.json`, `src/app/`, `src/main.ts`, `src/main.server.ts`, `src/server.ts`) and documents (`README.md`, `CLAUDE.md`, `ABOUT_ME.md`). | contrary |
| Build | `angular.json`: one project with `@angular/build:application` (`:17`), `dev-server` (`:64`) and `unit-test` (`:76`). No federation builder. | contrary |
| Mechanism search | `git grep` at the SHA, without lockfile, for `federation`, `remoteEntry`, `single-spa`, `iframe` and `loadRemote`: nothing. | absent |
| Documentation | `README.md:3`: “micro-frontend client” for the platform, meaning the client’s expected role, without host or composition in the repository. | weak |

## Authorship and history

Non-shallow clone; 17 linear commits, no merges, all by Angel Colorado, from 2026-06-10 to 2026-07-03 (SHA `7b53daa`). There are 12 remote `feat/*` branches, not considered. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; no other unit referenced by composition configuration. |
| Q2 | No | Without two units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root configuration composing units. |
| Q4 | No | No composition mechanism configured. |
| Q5 | No | Q1–Q4 are No: conventional Angular SPA described as “micro-frontend client”. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”.
- It is not `MFE-unit`: nothing prepares it for composition by an external host, such as `exposes`, lifecycles or Custom Elements.
- **Fields:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (Angular `application` builder, as in 059 and 316), `repo_type: production`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “micro-frontend client” in a single SPA README matches terminology queries.
- **Protocol (search):** the plural is only in `ABOUT_ME.md`, outside the searched fields. Eligibility changes from `unknown` (001) to `pass` (002).

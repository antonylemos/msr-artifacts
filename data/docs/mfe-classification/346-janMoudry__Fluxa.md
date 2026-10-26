---
schema: 1
id: 1140120830
full_name: janMoudry/Fluxa
url: https://github.com/janMoudry/Fluxa
commit: 4f585be3a7ef8ffe1d7456a68ebb0ed74aa1ef52
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 346 — janMoudry/Fluxa

## Context

TypeScript library published as `@jan.moudry/fluxa` (`package.json:2–18`): a typed event bus with propagation in memory, across tabs (`BroadcastChannel`) and across frames (`postMessage`), “designed for embedded widgets, micro-frontends, and apps that need cross-context event routing” (`README.md:1–17`). There is no frontend application; HTML pages in `e2e/pages/` are Playwright test fixtures. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:347` records rank 346, ID 1140120830, status `cloned`, branch `production` and the front matter commit, which is the HEAD of the clone and of `origin/production`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:347` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:23796` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:23803` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-01` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:30:33.914Z / 2026-10-08T15:57:37.603Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:52.560Z / 2026-10-08T16:07:52.165Z |

The effective queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 129;
- created at 2026-01-22T21:17:31Z, pushed at 2026-01-23T19:20:31Z.

README spellings: “micro-frontends” in `README.md:8` and `README.md:94` (“Built for widgets, micro-frontends, and SDKs”). The singular does not appear literally in the README; it appears as a keyword in `package.json:44`, outside the searched fields. This hit depends on GitHub search text processing, which is not recorded. The last README change is `3422879` (2026-01-23), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 46 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are `src/` (core, transports, utils), Vitest tests, Playwright tests with HTML fixture pages in `e2e/`, CI workflows and versioned npm cache files (`.npm/_cacache/…`). | contrary |
| Library | `package.json:2–18`: package with `main`/`module`/`types` in `dist/` and `exports`. `src/transports/PostMessageTransport.ts`, `BroadcastChannelTransport.ts` and `MemoryTransport.ts`: communication channels. | contrary |
| Fixtures | `e2e/pages/host.html:9–35`: test page with `<iframe>` and `bus.registerFramePeer(...)`, used to validate cross-frame propagation. These are library test scenarios, not application units. | context |

## Authorship and history

Non-shallow clone; 15 commits, 2 PR merges made through the GitHub interface, from 2026-01-22 (`74094d0`, “first commit”) to 2026-01-23 (SHA `4f585be`). Authors appear as “jan.moudry”, “Jan Moudrý” and “moudryJan”. The default branch is `production`, the only remote. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; this is a communication library. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root application configuration; pages in `e2e/` are test fixtures. |
| Q4 | No | The repository offers a communication mechanism, not configured composition between units. |
| Q5 | No | Q1–Q4 are No: library supporting micro-frontends. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”.
- Same categorization as 204 and 249 (ecosystem tools and libraries).
- **Fields:** `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** library presenting itself as designed for micro-frontends matches terminology queries.
- **Protocol (search):** the singular hit has no literal spelling in the README. The default branch is `production`. Eligibility changes from `unknown` (001) to `pass` (002).

---
schema: 1
id: 1314279064
full_name: dmytromykhailiuk/location-context-resolver
url: https://github.com/dmytromykhailiuk/location-context-resolver
commit: 79f684de41a5b611f6f98cc2ccd5ce9dc30fde16
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

# 374 — dmytromykhailiuk/location-context-resolver

## Context

TypeScript library published as `@dmytromykhailiuk/location-context-resolver` (`package.json:2–4`, `25–30`). It resolves the origin, pathname relative to the base path and query params of an application and its remote counterpart (`README.md:1–4`, `16–20`). The README presents it as useful for “a micro-frontend mounted under `/my-app` on a host shell, mirrored on its own remote origin” (`README.md:10–11`). The repository contains `src/index.ts`, tests, a documentation page (`index.html`) and a playground. There is no composed application. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:375` records rank 374, ID 1314279064, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:375` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:34318` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:34324` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-07` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:40:01.772Z / 2026-10-08T16:01:15.155Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:10:08.452Z / 2026-10-08T16:10:08.061Z |

The effective queries append `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Hit metadata:
- null description, no topics, language HTML (the documentation page), `fork: false`, size 53;
- created at 2026-07-27T21:07:29Z, pushed at 2026-08-13T16:28:58Z.

Spelling “micro-frontend” is in `README.md:10`. Plural does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The last README change is `1bd9de1` (2026-07-28), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 22 entries, all regular files `100644`; zero symlinks and zero gitlinks: `src/index.ts`, six tests, `playground/`, `index.html` (documentation) and build configs (`tsup`, playground Vite, Vitest, Biome). | contrary |
| Library | `package.json:2–30`: package with `main`/`module`/`types` in `dist/`; `keywords` with `micro-frontend`, `microfrontend` and `module-federation` (`:16–18`). | contrary |
| Documentation | `README.md:10–14`: use cases (micro-frontend under a base path, white-label); the library does not compose units. | context |

## Authorship and history

Non-shallow clone; 2 linear commits by Dmytro Mykhailiuk: `1bd9de1` (2026-07-28, “initial”) and SHA `79f684d` (2026-08-13, “update homepage url”). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; a utility library with documentation page and playground. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root configuration. |
| Q4 | No | No composition mechanism configured. |
| Q5 | No | Q1–Q4 are No: supporting library. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “MFE frameworks and libraries”, like drafts 204, 249 and 346.
- **Fields:** `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** a library citing micro-frontends as a use case matches terminology queries.
- **Protocol (search):** the plural hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

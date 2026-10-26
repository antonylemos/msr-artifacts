---
schema: 1
id: 1226451008
full_name: thirupathi124/SDE-1
url: https://github.com/thirupathi124/SDE-1
commit: 87e0d0122ccca6bf8b0510461ef75e16b0a95d81
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 341 — thirupathi124/SDE-1

## Context

Frontend exercise for a hiring process (“A frontend assignment project for **RAGA.AI**”, `README.md:3`): a single Next.js 16 (App Router) healthcare SaaS application, with Firebase Auth, shadcn/ui and mock JSON data (`README.md:1–34`, `67–74`). Micro-frontends appear only as a future possibility: “…making the app ready for micro-frontend splits or API integration without restructuring pages.” (`README.md:78`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:342` records rank 341, ID 1226451008, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:342` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:29354` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:29360` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-05` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:36:39.291Z / 2026-10-08T15:59:48.873Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:05:10.076Z / 2026-10-08T16:09:15.173Z |

The effective queries append `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 177;
- created at 2026-05-01T12:16:37Z, pushed at 2026-05-01T12:33:54Z.

The only spelling is “micro-frontend”, in `README.md:78`. The plural does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The last README change is `bd37c42` (2026-05-01), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 71 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single Next.js application at the root: `app/` (pages), `components/`, `context/`, `hooks/`, `lib/`, `data/*.json`, `public/` (PWA) and configs. | contrary |
| Configuration | `next.config.ts:1–12`: only `reactStrictMode` and PWA wrapper (`@ducanh2912/next-pwa`); no `rewrites`, zones or federation. | contrary |
| Mechanism search | `git grep` at the SHA, without lockfile, for `micro.?front`, `federation`, `iframe`, `single-spa`, `remoteEntry`, `zones` and `rewrites`: only `README.md:78`. | absent |
| Documentation | `README.md:76–78`: feature folders are internal modules of the same application, “ready for micro-frontend splits” in the future. | contrary |

## Authorship and history

Non-shallow clone; 3 linear commits, no merges, all by `thirupathi-lab`, from 2026-04-28 (`38be4a9`, “Initial commit from Create Next App”) to 2026-05-01 (SHA `87e0d01`, “app process completed”). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application; feature “modules” are internal folders (`README.md:78`). |
| Q2 | No | Without two units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root composition configuration. |
| Q4 | No | No composition mechanism (`next.config.ts:1–12`). |
| Q5 | No | Q1–Q4 are No: conventional Next.js exercise application. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”.
- As in final 094 (interview exercise), exercise status defines only `repo_type: example`. Same categorization as draft 306 (micro-frontends cited as a future possibility).
- **Fields:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react, next]`, `build_tools: []` (Next.js without explicit bundler, as in 094).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** one line about readiness for “micro-frontend splits” matches both terminology queries.
- **Protocol (search):** the plural hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

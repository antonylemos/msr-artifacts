---
schema: 1
id: 1144802780
full_name: chethan2/geniAi_promo_services
url: https://github.com/chethan2/geniAi_promo_services
commit: 8e093776c0b89b5cd8c5b291fed29e47ce380efd
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

# 210 — chethan2/geniAi_promo_services

## Context

“GenAI Marketing Assistant” (`README.md:1–3`): full-stack application generated in Replit (React + Express + PostgreSQL/Drizzle, `README.md:45–51`; `.replit:1–43`). Snapshot contains only root configuration files (`package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `drizzle.config.ts`, `.replit` and others). Folders `client/`, `server/`, `shared/` and `docs/` described in README (`README.md:88–106`) do not exist.

README calls architecture “micro-frontend” (`README.md:51`, `124`), but thereby describes atomic-design levels (atoms, molecules, organisms, layouts; `README.md:124–129`), not composed frontend units. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:211` records rank 210, ID 1144802780, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:211` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:24093` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:24100` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2026-01` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:30:19.747Z / 2026-10-08T15:57:32.444Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:35.430Z / 2026-10-08T16:07:45.338Z |

Effective queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Hit metadata:
- description “GenAI Marketing Assistant - AI-powered promotional content and code generation platform”, without term;
- no topics, TypeScript language, `fork: false`, size 88;
- creation at 2026-01-29T04:10:53Z, push at 2026-01-29T05:17:59Z.

README spellings:
- “Micro-frontend”: `README.md:51` (“**Architecture**: Micro-frontend with atomic design patterns”);
- “micro-frontend”: `README.md:124` (“follows a **micro-frontend architecture** with **atomic design principles**”).

Phrase search treats hyphen as separator. Plural “micro frontends” does not appear literally; this hit depends on unrecorded GitHub search text processing.

README was created in `511fb34` and replaced at SHA `8e09377`, both on 2026-01-29, before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 11 entries, all regular files `100644`; zero symlinks and zero gitlinks: `.gitignore`, `.replit`, `README.md`, `components.json`, `drizzle.config.ts`, `package-lock.json`, `package.json`, `postcss.config.js`, `tailwind.config.ts`, `tsconfig.json` and `vite.config.ts`. No source code. | contrary |
| Configuration / Build | `vite.config.ts:6–40`: one application with `root` at `client` (absent), React and Replit plugins, without federation. `package.json:6–12`: `dev` runs `tsx server/index.ts` (absent) and `build` runs `tsx script/build.ts` (absent). No frontend-composition dependency exists (`package.json:13–107`). | contrary |
| Documentation | `README.md:122–129`: “micro-frontend architecture” explained as atomic design (atoms, molecules, organisms, layouts), that is, component organization within one application. | contrary |
| Search | `git grep -i` at the SHA for `micro.?front`, `federation` and `single.?spa`: only `README.md:51` and `124`. | absent |

## Authorship and history

Non-shallow clone; 2 commits, no merge, by chethan2 (noreply) through web interface, both on 2026-01-29: `511fb34` (“Create README.md”) and SHA `8e09377` (“Add files via upload”), adding 10 configuration files and replacing README. Upload did not include code folders. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in snapshot; only configuration files. Configured application would be single (`vite.config.ts:29`). |
| Q2 | No | Without two units, no independence requires evaluation. |
| Q3 | No | No host, shell or root configuration composes units. |
| Q4 | No | No composition mechanism is configured (`vite.config.ts:6–40`; `package.json:13–107`). |
| Q5 | No | Q1–Q4 are No: “micro-frontend” as atomic-design label, in upload without code. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them”.
- Without snapshot code, as 196 (documentation only): `frontend_units: 0`, `unit_organization: none`. `ui_technologies: []` and `build_tools: []`, because React/Vite application is only configured, without observable source. `repo_type: other`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “micro-frontend architecture” describes atomic design within one SPA.
- **Protocol (search):** plural hit `"micro frontends"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Protocol (snapshot):** published repository contains only root configuration of Replit project; code was not uploaded.

---
schema: 1
id: 1027945631
full_name: DEEPAKsingh74/accio-project
url: https://github.com/DEEPAKsingh74/accio-project
commit: f8d0eeee36f1b8ae94ce1c944c56700e5ab14ddb
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 215 — DEEPAKsingh74/accio-project

## Context

“Accio - AI-Powered Micro-Frontend Playground” (`README.md:1–3`): chatbot generating React components (JSX + CSS) through an LLM via OpenRouter, displaying preview and saving sessions. Two parts:
- `frontend/`: one Next.js 14 application (App Router);
- `backend/`: Express API with MongoDB/Redis.

Preview assembles generated JSX into HTML with React through unpkg and Babel standalone, creates `Blob` and loads it into `<iframe sandbox>` (`frontend/components/CodePreview.tsx:11–66`, `116–121`). Repository description says “This is not related to my work it si a test from accio jobs.” Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:216` records rank 215, ID 1027945631, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:216` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:17015` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:17019` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2025-07` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:23:54.666Z / 2026-10-08T15:55:10.597Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:39.933Z / 2026-10-08T16:06:16.274Z |

Effective queries append `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Hit metadata:
- description “This is not related to my work it si a test from accio jobs.”;
- no topics, TypeScript language, `fork: false`, size 97;
- creation at 2025-07-28T19:19:16Z, push at 2025-07-28T19:22:15Z.

Retrieval comes from `README.md:1`, “# 🚀 Accio - AI-Powered Micro-Frontend Playground”. Phrase search treats hyphen as separator. Plural “micro frontends” does not appear literally; this hit depends on unrecorded GitHub search text processing.

README comes from root commit `8a9267a` (2025-07-29) and was unchanged afterward. It predates October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 34 entries, 33 regular files `100644` and 1 executable `100755` (`setup.sh`); zero symlinks and zero gitlinks. `frontend/` has one Next.js application (`app/`, `components/`, `lib/stores/`, `next.config.js`, `package.json`); `backend/` has Express API (`src/routes`, `models`, `middleware`, `config`). | contrary |
| Source code (frontend) | `frontend/app/page.tsx:1–45`: one page statically importing `ChatInterface`, `CodePreview`, `CodeTabs`, `Header` and `LoginModal`. `frontend/next.config.js:6–13`: only `rewrites` from `/api/:path*` to backend at `localhost:5000`. | contrary |
| Source code (iframe) | `frontend/components/CodePreview.tsx:11–66`: HTML generated at runtime from LLM JSX, loaded through `URL.createObjectURL` in sandbox iframe (`:116–121`). Iframe content is generated preview output, not frontend unit with own entry, build or deployment. | contrary |
| Search | `git grep -i` at the SHA (except lockfiles) for `micro.?front`, `federation`, `single.?spa`, `iframe` and `remoteEntry`: only label “Micro-Frontend Playground” (`README.md:1`; `frontend/app/layout.tsx:8`; `frontend/components/Header.tsx:32`; `backend/package.json:4`; `setup.sh:3`) and preview iframe. No relative import between `frontend/` and `backend/`. | absent |

## Authorship and history

Non-shallow clone; 2 commits, no merge, by Deepak singh `<deepakbisht.developer@gmail.com>`, both on 2025-07-29 (+05:30 time): `8a9267a` (“first commit”, only `README.md`) and SHA `f8d0eee` (“updated project”, remaining 33 files). No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One frontend application (`frontend/`); backend is not frontend unit, and iframe displays runtime-generated code, not another unit. |
| Q2 | No | No second frontend unit exists whose independence could be evaluated. |
| Q3 | No | No host composes units; page mounts local components (`frontend/app/page.tsx:7–11`). |
| Q4 | No | No unit-composition mechanism. Iframe loads `Blob` generated from LLM response (`CodePreview.tsx:59–65`). |
| Q5 | No | Q1–Q4 are No: component generation/preview application labeled “Micro-Frontend Playground”. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “repositories mentioning micro-frontends without implementing them” and “conventional frontend monoliths”.
- “Micro-frontend” here is product label for generating isolated AI components, without corresponding architecture; in 194 term also appeared only in application content, without frontend composition. Iframe does not invoke open iframe-composition decision, because it loads no deployed frontend unit, only locally generated HTML.
- Technical recruitment test according to description; exercise classification follows 023, but class follows Q1–Q4.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react, next]`, `build_tools: []` (Next without explicit bundler configuration, as 180/199), `repo_type: other`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “Micro-Frontend Playground” as product name of AI component generator with iframe preview.
- **Protocol (search):** plural hit `"micro frontends"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

---
schema: 1
id: 1316830018
full_name: In731/NexSupport-Al-_Customer-Support-AI
url: https://github.com/In731/NexSupport-Al-_Customer-Support-AI
commit: 290f3a732db6fa33367af5d4c46094d3333a984e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 334 — In731/NexSupport-Al-_Customer-Support-AI

## Context

B2B support platform with RAG chatbots (Gemini + MongoDB Vector Search), built as a single Next.js application (`src/app/`), with API routes and dashboard, administration and embed-generation pages (`README.md:12–26`). For customer sites there is a plain JavaScript chat widget (`public/chatBot.js`), inserted through a `<script>` tag; it creates its own DOM and talks to the API (`README.md:26`, `50`). The search term appears in “The React frontend orchestrates a Client-Side Queue” (`README.md:226`), about the PDF ingestion queue. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:335` records rank 334, ID 1316830018, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:335` records strategy `broader` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:34453` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:34459` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns a single hit in each round. It comes from endpoint `repositories`, query `broader-frontend-orchestration` (`"frontend orchestration" in:name,description,readme`), subquery `…#created:2026-Q3`, with an empty `path`. Collections are 2026-10-07T23:45:40.806Z (001) and 2026-10-08T16:25:27.031Z (002). The effective query appends `pushed:>=2025-04-01 created:2026-07-01..2026-09-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 2.007;
- created at 2026-07-30T04:34:19Z, pushed at 2026-09-04T19:35:09Z.

The exact phrase does not appear; the match comes from `README.md:226` (“The React frontend orchestrates a Client-Side Queue…”) and depends on GitHub search text processing, which is not recorded. The README is from the SHA itself (2026-09-05), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 49 entries, all regular files `100644`; zero symlinks and zero gitlinks. One Next.js application (`next.config.ts`, `src/app/` with pages and `api/`, `src/components/`, `src/lib/`, `src/model/`), `public/chatBot.js`, Vitest tests in `__tests__/` and a CI workflow. | contrary |
| Widget | `public/chatBot.js:7–8`: derives the API origin from the `src` of its own `<script>` tag. `:46`, `73` onward: creates button and chat box through `document.createElement`. `src/app/embed/page.tsx:1–18`: authenticated page showing the embed snippet (`EmbedClient`). This is a SaaS product widget inserted into third-party sites, without host, composition mechanism or another unit in the repository. | context |
| Mechanism search | `git grep` in the README for `orchestrat`, `micro.?front`, `federation`, `iframe`, `widget` and `embed`: only the `README.md:226` mention and widget and embedding descriptions. No federation, single-spa or import map configuration. | absent |

## Authorship and history

Non-shallow clone:
- **Commits:** 59 across all refs, 3 merges, authored by “In731” (53) and “Mukesh Chaudhari” (6), one (`86d7d6a`, “Delete test-mongo.js”) made through the GitHub interface.
- **Period:** through 2026-09-05 (SHA `290f3a7`, “feat: README.md update with latest changes”).
- **Repository:** a merge cites `In731/Customer-Support-AI` as origin (`2fcbed7`).

Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application (Next.js). Widget `chatBot.js` is part of the product for external sites, not a second unit composed by a repository host. |
| Q2 | No | Without two composed units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root configuration composing units. |
| Q4 | No | No composition mechanism; “orchestrates” describes an ingestion queue (`README.md:226`). |
| Q5 | No | Q1–Q4 are No: conventional SaaS application with an embed widget. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths”.
- Same categorization as 217, 221, 277 and 281, entering through broader query `"frontend orchestration"` through unrelated use of the term.
- It is not MFE-unit: the widget is not a unit prepared for composition by an MFE host, such as `exposes` or single-spa lifecycles. It is a product script for customer sites.
- **Fields:**
  - `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`;
  - `ui_technologies: [react, next]`, `build_tools: []` (Next.js without explicit bundler, as in 013 and 094);
  - `repo_type: production`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “orchestrates” referring to an ingestion queue matches the broader query.
- **Protocol (search):** the exact phrase has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

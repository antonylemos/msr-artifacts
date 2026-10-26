---
schema: 1
id: 1231899916
full_name: Alexssandren/Chatbot_UFSC
url: https://github.com/Alexssandren/Chatbot_UFSC
commit: 170bb0b9448fb20beda16b7bb02f8f06b11afe1d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 288 — Alexssandren/Chatbot_UFSC

## Context

System receiving and analyzing supplementary activity submissions (application + PDF certificates), with an advisor web dashboard (`README.md:1–3`). Fastify + Prisma backend (`backend/`) and a single React + Vite frontend (`frontend/`). Micro-frontends appear only in an out-of-scope item list: “Itens explicitamente **fora** do escopo atual (evitar sem decisão): OCR, anotação em PDF, react-pdf/pdf.js pesado, microfrontends.” (English translation: “Items explicitly **outside** current scope (avoid without a decision): OCR, PDF annotation, heavy react-pdf/pdf.js, microfrontends.”; `README.md:97`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:289` records rank 288, ID 1231899916, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:289` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:29702` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:29708` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-05` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T21:51:29.129Z / 2026-10-08T15:42:48.382Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:12:58.622Z / 2026-10-08T15:49:57.059Z |

Effective queries append `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 575;
- created at 2026-05-07T11:51:32Z, pushed at 2026-07-02T12:28:22Z.

Spelling “microfrontends” is at `README.md:97`. Singular does not appear literally; that hit depends on GitHub search text processing, which is not recorded. README's last change is `5bd8725` (2026-06-07), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 129 entries, all regular `100644` files; zero symlinks and zero gitlinks. There are `backend/` (Fastify, Prisma, tests), `frontend/` (a Vite application with 33 files in `src/`), `docs/` (3 documents), `scripts/`, `docker-compose.yml`, `.bat` scripts and a log in `.cursor/`. | contrary |
| Frontend | `frontend/vite.config.ts:1–15`: only `@vitejs/plugin-react` and `/api` proxy to backend. `frontend/index.html:11`: a single `<script type="module" src="/src/main.tsx">`. | contrary |
| iframe | `frontend/src/components/PdfViewerModal.tsx:199–206`: `<iframe src={url}>` displays uploaded PDFs (`README.md:60`). Document viewing, rather than frontend unit composition. | context |
| Mechanism search | `git grep` at the SHA, excluding lockfiles and logs, for `micro.?front`, `federation`, `single-spa`, `remoteEntry`, `import-map`, `web component` and `customElements`: only `README.md:97`. | absent |
| Documentation | `README.md:97`: micro-frontends listed as out of scope. `docs/INTEGRACAO-CHATBOT.md:1–15`: chatbot integration through API (`POST /api/submissions`), rather than frontend. | contrary |

## Authorship and history

Non-shallow clone; 18 linear commits, no merges, all by `Alexssandren`, from 2026-05-07 to 2026-07-02 (SHA `170bb0b`). Only branch `master`. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend application (`frontend/`); backend is not a frontend unit. |
| Q2 | No | Without two frontend units, there is no independence to assess. |
| Q3 | No | No host, shell or root composition configuration. |
| Q4 | No | No composition mechanism; the only `iframe` displays PDFs. |
| Q5 | No | Q1–Q4 are No: conventional full-stack application declaring micro-frontends out of scope. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”: here the mention is precisely an exclusion.
- **Fields:** `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: production` (deployment checklist, VPS script and institutional system integration, `docs/DEPLOY-CHECKLIST.md`, `scripts/vps-deploy.sh`).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “microfrontends” mention as an out-of-scope item matches terminology queries.
- **Protocol (search):** singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

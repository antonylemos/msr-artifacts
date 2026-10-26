---
schema: 1
id: 1224729508
full_name: eduardoborges/cv
url: https://github.com/eduardoborges/cv
commit: a022fc3dd29f665d9d4686253baea8026ff4e92e
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

# 251 — eduardoborges/cv

## Context

Personal resume written as `README.md`, with scripts converting it to PDF. `scripts/generate-pdf.tsx` reads the README, converts Markdown with `marked`, renders a React wrapper on the server (`renderToStaticMarkup`, `ResumeShell.tsx`) and prints the result with Puppeteer (`scripts/generate-pdf.tsx:1–25`). A workflow generates the PDF as an artifact. Micro-frontends appear only as declared professional experience (`README.md:80`). There is no frontend application. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:252` records rank 251, ID 1224729508, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:252` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:29259` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:29265` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-04` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:35:20.160Z / 2026-10-08T15:59:21.679Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:03:54.282Z / 2026-10-08T16:09:01.413Z |

The effective queries append `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 36;
- created at 2026-04-29T15:10:56Z, pushed at 2026-09-24T16:54:30Z.

The match comes from `README.md:80`, “Defined frontend engineering standards across multiple teams working with React, GraphQL, and Micro Frontends.”, the only occurrence. The singular “micro frontend” does not appear literally; this hit depends on GitHub search text processing, which is not recorded.

The last README change is the SHA itself, `a022fc3` (2026-09-24), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 10 entries, all regular files `100644`; zero symlinks and zero gitlinks: `README.md`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `mise.toml`, `.gitignore`, `.github/workflows/build.yaml` and three scripts in `scripts/`. There is no `index.html`, development server or web application. | contrary |
| Source code | `scripts/generate-pdf.tsx:1–25`: Node script generating `dist/EduardoBorgesResume.pdf` from the README. React is used only to generate static HTML on the server. `package.json:6–9`: `pdf`/`build` scripts run this script with `tsx`. | contrary |
| Documentation | `README.md:1–12`, `80`: professional resume; the mention of “Micro Frontends” describes experience in another context. | weak |
| Search | `git grep -i` at the SHA for `micro.?front`, `federation` and `single.?spa`: only `README.md:80`. | absent |

## Authorship and history

Non-shallow clone; 7 linear commits, no merges, by Eduardo Borges, from 2026-04-29 (`2d72fd3`, “Initial commit”) to 2026-09-24 (SHA `a022fc3`, “Update README.md”), with the PDF generator added in `60ea263`. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; there is only a PDF generation script. |
| Q2 | No | Without units, there is no independence to assess. |
| Q3 | No | There is no host, shell or root configuration. |
| Q4 | No | No composition mechanism; micro-frontends appear only as declared experience (`README.md:80`). |
| Q5 | No | Q1–Q4 are No: personal resume with PDF generator. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- Equivalent to profile repositories without implementation (finals 011/064/068/073/077/101/111 and profile drafts). The PDF script is not a frontend application: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** experience with “Micro Frontends” in a README resume matches terminology queries.
- **Protocol (search):** the singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

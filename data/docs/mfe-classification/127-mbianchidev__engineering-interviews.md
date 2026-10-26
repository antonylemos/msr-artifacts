---
schema: 1
id: 695955368
full_name: mbianchidev/engineering-interviews
url: https://github.com/mbianchidev/engineering-interviews
commit: a66f1531c498a9320fcd0d9a7899f9d53d44762d
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

# 127 — mbianchidev/engineering-interviews

## Context

Engineering interview question bank maintained in `README.md`, accompanied by a Next.js practice site published on GitHub Pages (`README.md:3`; `README.md:18–20`; `SETUP.md:3`). Micro-frontends appear only as two questions in bank, not site architecture. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:128` records rank 127, ID 695955368, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:128` records strategy `terminology` and eligibility `unknown`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:6714` and `data/discovery/mfe-round-002/candidates.csv:6719`, both with eligibility `unknown`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same four hits in each round, all with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2023-09` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2023-09-01..2023-09-30` | 2026-10-07T22:18:29.204Z / 2026-10-08T15:52:58.583Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2023-09` | `"micro frontends" … created:2023-09-01..2023-09-30` | 2026-10-07T22:49:13.466Z / 2026-10-08T16:04:39.648Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2023-09` | `microfrontend … created:2023-09-01..2023-09-30` | 2026-10-07T18:23:17.308Z / 2026-10-08T15:36:40.868Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2023-09` | `microfrontends … created:2023-09-01..2023-09-30` | 2026-10-07T22:06:11.663Z / 2026-10-08T15:46:17.036Z |

Hit metadata record name `engineering-interviews`, description “A platform to prepare for engineering interviews”, topic `interview-preperation`, TypeScript language, `fork: false`, creation at 2023-09-24T18:01:39Z and push at 2026-10-02T08:58:18Z. None of these fields contains searched terms. By elimination, retrieval comes from README: `README.md:399` (“What are microfrontends?”, joined spelling) and `README.md:400` (“What are the benefits of using micro frontends?”, separated spelling). Singular queries (`micro frontend`, `microfrontend`) have no literal singular occurrence. In these two cases, matching depends on GitHub search text processing, unrecorded in hits.

Last change to `README.md` reachable from SHA is `f8df05c` (mbianchidev, 2026-10-02T01:24:11+02:00), before collections on 7 and 8 October. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 40 entries, all regular files `100644`; zero symlinks (`120000`) and zero gitlinks (`160000`). A single `package.json` at root, one `app/` tree, `lib/`, `scripts/`, `tests/`, `public/` and two workflows. No subfolder `package.json` throughout reachable history (`git log --name-only`). | contrary |
| Source code (UI) | `app/layout.tsx:12–29`: one root layout with `SiteHeader` and `{children}`. `app/page.tsx:1–4` imports local components and data, and `app/page.tsx:20–21` links to `/practice` and `/topics` through `next/link`, routes of same App Router. | contrary |
| Source code (boundaries) | Search for `from '../`, `import('../` and `require('../` in TS/TSX/JS/MJS: 16 occurrences. Those using `../../` (`app/topics/[categoryId]/page.tsx:4`; `app/topics/[categoryId]/QuestionItem.tsx:6`) and those using `../` at `app/practice/page.tsx:4–5`, `app/ask-companies/page.tsx:5–6` and `app/topics/page.tsx:4–5` point to `app/components`. `lib/topicPresentation.ts:1` imports a type from `app/components/Icon`; `lib/questionsData.ts:4` imports `public/questions.json`; `scripts/generate-questions.ts:3` imports `lib/parseQuestions`. All remain within same project and no second unit exists to cross into. | contrary |
| Configuration / Build/deploy | `package.json:5–11`: a single `next dev`/`next build` cycle, preceded by JSON generation. `next.config.ts:6–13`: `output: 'export'`, unoptimized images and `basePath`; without bundler hook or composition. `.github/workflows/deploy.yml:38–57`: `npm ci`, `npm run build`, upload of `./out` and Pages publication, in one artifact. | contrary |
| Technology | `package.json:16–18` declares `next` 16.3.8, `react` and `react-dom` 19.3.0, resolved in `package-lock.json:5633–5635`, `6037–6039` and `6046–6048`. Lockfile contains no federation, single-spa, qiankun or wujie packages. | context |
| Source code (generator) | `scripts/generate-questions.ts:3–22` reads README through `parseReadme` (`lib/parseQuestions.ts:31–34`) and writes `public/questions.json`; `lib/questionsData.ts:4–8` imports this JSON for client. It generates question data, not code or frontend units. | context |
| Documentation (thematic signal) | `README.md:397–400`: “Frontend Engineering Scenarios” section with two micro-frontends questions; `public/questions.json:1700–1709` and `public/questions.json:3971–3978` reproduce them as text. They are displayed content, without configuring or connecting units. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` across entire SHA tree, except lockfile, for `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map`, `micro.?front`, `webpack`, `turbopack`, `rspack`, `vite`, `exposes`, `remotes` and `zones`. Only hits are in `README.md:399–400` and copies in `public/questions.json`. | absent |
| Documentation (architecture) | `SETUP.md:3`: “A static Next.js website”. `SETUP.md:14`: no account or backend, with data in `localStorage`. `SETUP.md:62–82`: stack and folder map of one site. `SETUP.md:58–60`: publication through Pages workflow. | context |
| History | See “Authorship and history”: Next site appears on 2025-11-16 and evolves in one project. Paths changed in reachable history record no federation files, remotes, shell or subpackages. | context |

## Authorship and history

Non-shallow clone. `git rev-list` at the SHA: 73 commits, 14 merges and one root, `ea68228` (mbianchidev, 2023-09-25T01:53:42+02:00, “Initial commit #1”). Evaluated SHA is merge of PR #18 (`cp-desktop-interview-workbench`), by Matteo Bianchi, at 2026-10-02T10:58:18+02:00, with parents `b7ef2ba` and `f8df05c`.

Recorded authors across entire history: `copilot-swe-agent[bot]` 33, Matteo Bianchi 27, mbianchidev 11 and Sevi Karakulak 2. In `app/`, `lib/` and `scripts/`: 18 bot commits and 1 by mbianchidev. `git log --no-renames --name-status` by folder records 19 commits in `app`, 6 in `lib`, 1 in `scripts`, 3 in `.github`, 5 in `package.json` and 4 in `next.config.ts`. `layout.tsx`, `package.json`, `next.config.ts` and parser are added in `b42f601` (bot, 2025-11-16, “Transform into Next.js website with practice mode and topic browsing”). `scripts/generate-questions.ts` is added in `90847db` (bot, 2025-11-16). These metadata attribute site construction mainly to Copilot agent commits, accepted through owner merges. They indicate who recorded commits, not intellectual authorship of each excerpt. No indication of code imported from a third-party application exists.

Local refs: `main`, `origin/main` and `origin/HEAD` at evaluated SHA; `origin/cp-desktop-interview-workbench` at `f8df05c`; `origin/copilot/add-auth-layer-stripe-integration` at `4625f1a`. Content of those branches was not considered. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One identifiable frontend unit: a Next project with one `package.json` (`package.json:5–11`) and root layout (`app/layout.tsx:12–29`). No composition configuration references external units (recorded search). Mentions in `README.md:399–400` are questions. |
| Q2 | No | No two units have own entry and build. Pages share single build (`package.json:7`) and import `app/components` and `lib/` from same project (`app/topics/[categoryId]/page.tsx:1–5`). |
| Q3 | No | Root layout wraps routes of same App Router (`app/layout.tsx:21–22`); `app/page.tsx:20–21` only navigates internal pages. No host/shell loads distinct units. |
| Q4 | No | `next.config.ts:6–13` configures only static export and `basePath`; deployment publishes one artifact (`.github/workflows/deploy.yml:41–46`). Search finds no composition mechanism. |
| Q5 | No | Q1–Q4 are No: conventional practice site treating micro-frontends as a question topic. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them” cases. `MFE-unit` does not apply: no `exposes`, lifecycles or other preparation for external host.
- `frontend_units: 1` / `single-unit`: counts materialized Next site. Pages, components, generated JSON and tests are not units. Unlike profiles 011/064/068/073/077/101/111 (`frontend_units: 0`, without application), an implemented application exists here.
- `repo_type: production`: practice tool for actual use, with GitHub Pages publication workflow (`.github/workflows/deploy.yml:38–57`; `SETUP.md:58–60`). Published site was not checked. `ui_technologies: [react, next]` follows manifest and sources. `build_tools: []` follows convention of Next encapsulating bundler without explicit configuration (as in 094 and 124).
- No decision remains open. No iframe, link between distinct applications or build-time composition requires evaluation. Links are internal routes of one app.

## Analysis notes

- **RQ1 (misleading signals):** retrieval comes from two question-bank entries in README (`README.md:399–400`), replicated in generated JSON. Terminology strategy captures repositories treating topic only as content, as in 023.
- **Checklist:** as in 023, MFE content does not count as implementation. As in 075/081/105, generator produces data, not units. As in 094 (interview exercise), an own `single-unit` application exists. No host/remotes chain as in 076/084/096/106/109, unconnectable MFE configuration as in 097/103/104, code-sharing federation as in 089/100 or third-party platform as in 074/080/102 exists.
- **Protocol (search):** singular-query hits depend on GitHub text processing. README has only plural forms.
- **Protocol (family):** no other annotation in `docs/mfe-classification/` cites `mbianchidev`.
- **Independent-review contribution (Lupa):** complete agreement with Non-MFE and Q1–Q5 No; no open decision. Three caveats without class effect: (1) historical path inventory must use `git log --no-renames --format= --name-only`; without `--no-renames` command fails requesting a historical blob absent from partial clone (`GIT_NO_LAZY_FETCH=1`), so no-missing-objects assertion holds only for completed commands; (2) attribution of retrieval to `README.md:399–400` is inference by elimination, without API-returned fragment, and both literal README forms are plural; README at the SHA (last modifying commit, `f8df05c`, 2026-10-01T23:24:11Z) predates searches on 7 and 8/10; (3) comparisons with 094, 124, 013 and 036 are contextual, as they are not final annotations; comparable finals are 003 (conventional application, one unit), 023 (MFE content), 026, 041, 050 and 058 (MFE-unit does not apply). Counted 16 relative-import occurrences ascending directories, none between frontend units.

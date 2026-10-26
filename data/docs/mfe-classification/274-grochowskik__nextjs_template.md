---
schema: 1
id: 1175357381
full_name: grochowskik/nextjs_template
url: https://github.com/grochowskik/nextjs_template
commit: cee3076c8ba029e44dff35c5eb9b2e4327d48932
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 274 — grochowskik/nextjs_template

## Context

Next.js 16 application template (“A production-ready Next.js starter…”, `README.md:1–3`), with API layer, typed forms, Redux Toolkit, TanStack Query, UI library, i18n and access control. The README calls its feature organization “microfrontend-ready” (`README.md:3`, `:34`, `:148–170`) and says it could become Module Federation in the future (`README.md:170`). The repository is a single application, without composition configuration. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:275` records rank 274, ID 1175357381, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:275` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:26039` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:26046` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-03` | 2026-10-07T20:32:52.350Z / 2026-10-08T15:41:53.292Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-03` | 2026-10-07T22:11:56.922Z / 2026-10-08T15:49:26.110Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-03` | 2026-10-07T23:24:38.994Z / 2026-10-08T16:17:35.128Z |

The effective queries append `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Hit metadata (identical in both rounds): description of the Next.js 16 template with authentication, HTTP middleware, TanStack Query, Redux Toolkit and component library, without the searched terms; no topics; language TypeScript; `fork: false`; size 324; created at 2026-03-07T15:49:52Z; pushed at 2026-03-22T09:27:41Z.

Matches in the SHA README:
- **`microfrontend`:** `README.md:3` (“a microfrontend-ready feature structure”), `:34` e `:148` (“## Microfrontend-Ready Feature Structure”).
- **`microfrontends`:** the plural form does not appear in the README; this hit depends on GitHub search text processing, which is not recorded.
- **`"module federation"`:** `README.md:170` (“This structure maps cleanly onto a future module federation setup”).

The last README change is `f6b9c4a` (2026-03-21T11:42:07+01:00), and the SHA (2026-03-22T10:27:14+01:00) coincides with `pushed_at`. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 185 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single Next.js project: `package.json`, `next.config.ts`, `src/app` (routes `/`, `/login`, `/dashboard`), `src/features` (auth, dashboard, notes), `src/core`, `src/ui`, `src/hooks`, `src/utils`, tests and Dockerfiles. | contrary |
| Configuration / Build | `package.json:5–15`, `:16–36`: `next dev/build/start` scripts and dependencies of one app; no federation package. `next.config.ts:3–14`: `output: 'standalone'` and an `rewrites` of `/api/:path*` to the backend (placeholder `/path/to/backend`); no `basePath`, `assetPrefix` or zone. | contrary |
| Source code | `src/app/dashboard/page.tsx:4` and `src/app/login/page.tsx:3`: routes import features statically (`@/features/dashboard`, `@/features/auth`). Features are folders in the same application, compiled in the same build. | contrary |
| Documentation | `README.md:148–170`: feature organization rules (barrel `index.ts` as contract, no import between features) and phrase “maps cleanly onto a future module federation setup: each feature boundary can become its own remote”. This is future intent. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile and README, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `basePath`, `assetPrefix`, `rewrites` and `zones`: only API `rewrites` in `next.config.ts:6`. | absent |
| Source code (boundaries) | There are no relative imports with `../../` in `src`; the project uses alias `@/` within the same application. Feature boundaries are folder conventions, not units with their own entry point and build. | context |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 14 commits (14 across all refs), no merges, all by `Krzysztof Grochowski <krzysztofgrochowski3@gmail.com>` as author and committer, from 2026-03-07 (`7e85d82`, “Initial commit”) to 2026-03-22 (the SHA). Commit `fd51675` (2026-03-11) describes itself as “Restructured repo, renamed components to ui, added features to support microfrontends…”; at the SHA, the result is the feature organization described above. `git rev-list --objects $SHA --missing=print` lists 247 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit: a Next.js app with one `package.json` and one build (`package.json:5–8`). Features are internal folders, and no composition configuration references units. |
| Q2 | No | There are not two units; routes import features statically (`src/app/dashboard/page.tsx:4`). |
| Q3 | No | There is no host loading units; App Router routes pages of the same application. |
| Q4 | No | No composition mechanism; Module Federation is a future possibility (`README.md:170`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “repositories mentioning micro-frontends without implementing them” and “conventional frontend monoliths”: “microfrontend-ready” describes internal feature modularization.
- Same pattern as 263 (draft), where Module Federation was a future item, and close to 146 (draft), where “micro-apps” were internal modules.
- `repo_type: template` (“starter”, `README.md:3`; `package.json:2`, `saas-template`). `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`. `build_tools: []`: Next.js encapsulates the bundler, without explicit bundler configuration (Vite in `vitest.config.ts` serves only tests).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** “microfrontend-ready” as a label for modular feature architecture, with the promise of future Module Federation (`README.md:3`, `:148–170`), generates three terminology and technology hits without corresponding configuration.
- **Protocol (search):** the plural hit `microfrontends` has no literal spelling in the README. Eligibility changes from `unknown` (001) to `pass` (002).

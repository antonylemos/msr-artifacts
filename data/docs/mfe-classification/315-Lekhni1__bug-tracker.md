---
schema: 1
id: 1231840825
full_name: Lekhni1/bug-tracker
url: https://github.com/Lekhni1/bug-tracker
commit: d3e0f8b3473ffc0980e891b5aa72509eabdbae3f
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 315 — Lekhni1/bug-tracker

## Context

Bug tracker (“BuggedOut”) with a React/TypeScript/Vite frontend and Java (Spark) backend with Firestore (`README.md:1–5`, `38–45`). README claims micro-frontend architecture and React/Vue integration (`README.md:57`, `64`), but snapshot has a single React frontend project and no Vue code. Also a versioned third-party script (`git-filter-repo`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:316` records rank 315, ID 1231840825, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:316` records strategy `terminology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:29700` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:29706` (`terminology`, `unknown`, rule `recent-human-commit` with `author_indeterminate`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T22:36:54.296Z / 2026-10-08T15:59:53.854Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-05` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T23:05:29.173Z / 2026-10-08T16:09:18.306Z |

Hit metadata: null description, no topics, language Python, no license, `fork: false`, size 4828, created at 2026-05-07T10:40:52Z, pushed at 2026-05-07T10:43:04Z.

Only term occurrence is `README.md:64`: “Designed a modular micro-frontend architecture for scalable bug tracking features.”, singular and hyphenated (phrase search treats hyphen as separator). Plural “micro frontends” does not appear literally; that hit depends on GitHub search text processing, which is not recorded. Metadata language `Python` is consistent with file `git-filter-repo` (`git-filter-repo:1`, `#!/usr/bin/env python3`), despite `.gitattributes:6` marking `*.py` as undetectable (file lacks extension).

README was introduced in the single commit, SHA itself (2026-05-07), before collection on October 7 and 8, 2026. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 43 entries, all regular `100644` files; zero symlinks and zero gitlinks. Maven backend (`backend/pom.xml`, `backend/src/main/java/com/example/bugtracker/BugTracker.java`, `backend/Dockerfile`), one frontend project in `frontend/bug-tracker-frontend/`, empty `frontend/package-lock.json` (`:1–6`, `"packages": {}`), `.circleci/config.yml`, `vercel.json` and `git-filter-repo`. | contrary |
| Configuration (frontend) | `frontend/bug-tracker-frontend/package.json:5–9`: `vite`/`vite build`; `:10–15`: React 19, axios, react-toastify; no Vue or composition dependency. `frontend/bug-tracker-frontend/vite.config.ts:4–9`: only `react()` and port 3000. | contrary |
| Source code (UI) | `frontend/bug-tracker-frontend/index.html:8–9`: one `#root` and `/src/index.tsx`; `src/index.tsx:7–14`: one `createRoot`; `src/App.tsx:1–8`: renders only `BugTrackerHome`. | contrary |
| Source code (boundaries) | Search for `../` in `*.ts`, `*.tsx`, `*.js`: `src/BugTrackerHome.tsx:18`, `src/components/BugTable.tsx:2` and `src/services/bugService.tsx:2`, all to `bugTypes` within same project (`BugTrackerHome.tsx:18` points to `types/` outside `src/`, a nonexistent inventory path, which has only `src/types/bugTypes.ts`). No second unit to cross into. | context |
| Documentation | `README.md:57`: “Successfully integrated React and Vue in a shared frontend”; `README.md:64`: “modular micro-frontend architecture”. Search for `vue` across the SHA, except lockfiles and `git-filter-repo`, finds only `README.md:57`; lockfiles have no `node_modules/vue`. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA (except lockfiles and `git-filter-repo`) for `micro.?front`, `federation`, `single.?spa`, `import.?map`, `iframe`, `customElements` and `qiankun`: only `README.md:64`. | absent |
| Build/deploy | `.circleci/config.yml:7–20`, `22–34`: one frontend build job and one backend job; `vercel.json:1–9`: a single build with `/bugs` `rewrite` to hosted backend. | contrary |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 1 commit (1 across all refs), no merges: SHA `d3e0f8b` itself (2026-05-07T16:10:04+05:30, “bug tracker project”), author and committer `lekhni kumbhare` with local-host email (`…@lekhnis-MacBook-Air.local`), adding all 43 files. README lists two other contributors (`README.md:11–13`), absent from metadata; metadata shows only one bulk import commit and cannot establish code origin or distinguish authorship (`git-filter-repo` presence is recorded without inferring history rewriting). Round 002 records `author_indeterminate` under human commit rule. `git rev-list --objects $SHA --missing=print` identifies no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`frontend/bug-tracker-frontend/`); README-cited Vue unit is absent from snapshot; no composition configuration (recorded search). |
| Q2 | No | No two units to assess. |
| Q3 | No | No host, shell or root config; UI renders only `BugTrackerHome` (`src/App.tsx:4–6`). |
| Q4 | No | No configured composition mechanism; claims at `README.md:57`, `64` have no corresponding artifact. |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”: README declares micro-frontend architecture and Vue integration not materialized in code.
- Not `MFE-unit`: app exports no external host contract.
- No partial chain (097/103/104), code sharing (089/100) or composed third-party unit (102/074/080). `git-filter-repo` is a third-party tool unrelated to UI.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: example` (project MVP, `README.md:60`).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** README with architectural claims unsupported by code (“micro-frontend architecture”, “React and Vue in a shared frontend”, `README.md:57`, `64`); only manifest and entry inspection dispels signal.
- **Protocol (metadata):** GitHub language `Python` attributed to a third-party script (`git-filter-repo`), rather than project; eligibility `unknown` in both rounds, with reason `author_indeterminate` in 002.

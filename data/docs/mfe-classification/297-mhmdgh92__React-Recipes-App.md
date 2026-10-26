---
schema: 1
id: 1044389461
full_name: mhmdgh92/React-Recipes-App
url: https://github.com/mhmdgh92/React-Recipes-App
commit: 608fd0fab42fcbc85759555fad98f011efa0b396
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

# 297 — mhmdgh92/React-Recipes-App

## Context

Next.js demonstration recipe application (App Router) with React Query, optional Supabase and mock data (`README.md:1–3`, `12–26`). A single frontend project; micro-frontends appear only as a possible future extraction (`README.md:26`, `80`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:298` records rank 297, ID 1044389461, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:298` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:18051` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:18056` (`terminology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-08` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T22:24:46.445Z / 2026-10-08T15:55:27.142Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-08` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T22:56:00.831Z / 2026-10-08T16:06:25.259Z |

Hit metadata: null description, no topics, language JavaScript, license MIT, `fork: false`, size 13301, created at 2025-08-25T15:56:18Z, pushed at 2025-08-25T15:56:46Z.

Hit comes from README: plural “micro frontends” appears literally at `README.md:26` (“**Vite** → optional setup for building micro frontends or standalone tools.”) and `README.md:80` (“Consider using Vite if extracting features into standalone micro frontends.”). Singular “micro frontend” does not appear isolated; that hit depends on GitHub search text processing, which is not recorded.

README was introduced in the single commit, SHA itself (2025-08-25), before collection on October 7 and 8, 2026. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 55 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single root `package.json` and single `src/` with App Router routes (`src/app/`), `features/`, `lib/`, `MockData/`; plus `.DS_Store` files, `.vscode/` and `demo/demo.gif`. No `index.html` or separate Vite entry. | contrary |
| Configuration | `package.json:6–15`: Next `dev`/`build`/`start` (`next dev -p 3000`, `next build`); `next.config.ts:3–8`: only `reactStrictMode` and `typedRoutes`. `vite.config.ts:6–8`: `react()` and `tailwindcss()`, without entry or federation plugin; only script use is `preview` (`package.json:8`). | contrary |
| Source code | `src/app/layout.tsx:13–48`: one root layout with `next/link` navigation (`/`, `/recipes`, `/about`) wrapping `{children}`; pages (`src/app/page.tsx`, `src/app/recipes/page.tsx`, `src/app/recipe/[id]/page.tsx` etc.) belong to the same app. | contrary |
| Source code (iframe) | `src/features/recipes/components/VideoModal.tsx:18–24`: `<iframe src={video}>` embedding YouTube videos (for example, `src/MockData/dataArrays.js:52`), external content, rather than frontend unit. | context |
| Source code (boundaries) | Search for `../` specifiers: only occurrence `src/features/recipes/components/RecipeItem.tsx:1` (`'../types'`, internal to same feature); other imports through alias `@/`. Only one project, without a unit boundary to cross. | context |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except `package-lock.json` and README, for `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `systemjs`, `registerApplication` and `micro.?front`: only video iframe above. `package-lock.json` for `module-federation`, `single-spa`, `originjs`: no occurrences. | absent |
| Documentation | `README.md:26`, `80`: micro-frontends cited as optional Vite use for future feature extraction. | weak |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 1 commit (1 across all refs), no merges: SHA `608fd0f` itself (2025-08-25T18:56:33+03:00, “First launch”), author and committer `MhmdGH92 <mohammedghabyen+1@gmail.com>`, adding all 55 files together. No development sequence; metadata cannot distinguish intellectual authorship. Package name (`"todo-app"`, `package.json:2`) and title `TodoApp` (`src/app/layout.tsx:9–10`) match another account repository in rounds, `mhmdgh92/React-Todo-App` (`data/discovery/mfe-round-002/candidates.csv:17869`), outside the sample and uninspected. `git rev-list --objects $SHA --missing=print` identifies no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (one `package.json`, one App Router in `src/app/`); no composition configuration references other units (recorded search). |
| Q2 | No | No two units to assess. |
| Q3 | No | Root layout (`src/app/layout.tsx:13–48`) routes pages of the same application, rather than distinct units. |
| Q4 | No | No configured composition mechanism; `iframe` embeds external video and micro-frontend mention is future intention (`README.md:80`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. Matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”.
- Not `MFE-unit`: app exports no external host contract (no `exposes`, lifecycles or import map bundle).
- No partial chain (097/103/104), code sharing (089/100) or third-party unit (102/074/080) to assess.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react, next]`, `build_tools: []` (Next-encapsulated bundler; `vite.config.ts` is unused in build, `package.json:9`), `repo_type: example` (“demo Rrecipes application”, `README.md:3`).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “micro frontends” mention as future possibility (`README.md:26`, `80`) in a monolithic app; presence of `vite.config.ts` alongside Next reinforces vocabulary, without effective use.
- **Protocol (family):** package and title inherited from a todo app (`package.json:2`; `src/app/layout.tsx:9–10`), consistent with `mhmdgh92/React-Todo-App` in rounds; only this repository is in sample (`sample.csv:298`).
- **Protocol (search):** singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

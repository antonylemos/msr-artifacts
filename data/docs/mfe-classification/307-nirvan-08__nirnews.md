---
schema: 1
id: 1041837305
full_name: nirvan-08/nirnews
url: https://github.com/nirvan-08/nirnews
commit: 6bb900b5bcf2fc2bd221bc5cb28a1208106dff60
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 307 — nirvan-08/nirnews

## Context

Partial Next.js application upload (“NirNews - Modern News Aggregator”, `layout.tsx:34–38`, generated with v0.app). Repository root contains `page.tsx`, `layout.tsx`, `globals.css`, configuration files and Next development build artifacts (`app-build-manifest.json`, `build-manifest.json`, `react-loadable-manifest.json`, `trace`). Imported folders (`@/components/...`, `@/contexts/...`) are not versioned. Repository description says “microfrontend-inspired architecture”, and `page.tsx:2` imports a component from absent local folder `components/microfrontends/`. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:308` records rank 307, ID 1041837305, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main` (ref `origin/dev` points to same commit). Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:308` records strategy `terminology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:17896` and `data/discovery/mfe-round-002/candidates.csv:17901`, both with `terminology` and `unknown`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-08` | 2026-10-07T18:51:03.164Z / 2026-10-08T15:39:10.714Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-08` | 2026-10-07T22:08:52.872Z / 2026-10-08T15:47:54.490Z |

Effective queries append `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Hit metadata (same in both rounds): description “A modern, mobile-responsive News Aggregator built with Next.js and Tailwind CSS, using a microfrontend-inspired architecture. Features include JWT auth, role-based access, article CRUD, likes, bookmarks, and an admin dashboard. Currently powered by mock data, ready for real API integration.”; no topics; language CSS; `fork: false`; size 85; created at 2025-08-21T04:55:02Z; pushed at 2026-06-09T09:28:59Z.

**Spellings:**
- **`microfrontend`:** matches description (“microfrontend-inspired”). README (`README.md:1`, only title `nirnews`, UTF-16 encoded) lacks term.
- **`microfrontends`:** absent from description and README; that hit depends on GitHub search text processing, which is not recorded. Spelling exists only in import path `page.tsx:2`, and this repository query does not index code files.

README exists only in the single commit, the SHA (2025-08-21T10:45:56+05:30), before October 2026 collection. The SHA's README does not postdate searches. `pushed_at` (2026-06-09) postdates the only reachable commit; cause is unobservable in clone.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 16 entries, all regular `100644` files; zero symlinks and zero gitlinks. There are `page.tsx`, `layout.tsx`, `globals.css`, `next.config.mjs`, `tsconfig.json`, `components.json` (shadcn), `postcss.config.mjs`, `package.json` (`{"type": "commonjs"}`), a package-empty `pnpm-lock.yaml` and `.next` directory artifacts (manifests, `trace`). No `components/`, `contexts/` or `app/` with manifest-listed routes. | contrary |
| Source code | `page.tsx:1–19`: page importing `Header`, `NewsFeed` (from `@/components/microfrontends/news-feed`) and `ErrorBoundary` through alias and rendering them directly. `layout.tsx:5–7`, `:50–54`: theme and authentication providers from missing folders. `tsconfig.json:21–23`: alias `@/*` to root, i.e., static imports inside same application. | contrary |
| Build/deploy (artifacts) | `app-build-manifest.json:1–40`: page chunks from one Next application (`/page`, `/categories/page`, `/login/page`, `/admin/page`, `/about/page`, `/home/page`); `trace` (647 KB) and `react-loadable-manifest.json` are Next 15.2.4 dev server output. Show a single build. | contrary |
| Configuration | `next.config.mjs:1–14`: only ignores lint/TS errors and disables image optimization; no federation, zone or rewrite. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except `trace`, for `micro.?front`, `federation`, `remoteEntry`, `single.?spa` and `iframe`: only import path at `page.tsx:2`. | absent |
| Source code (boundaries) | Imports use alias `@/` within same application; no `../../` imports or other unit to cross into. | context |

## Authorship and history

Non-shallow clone. 1 commit (1 across all refs), no merges: `6bb900b` (2025-08-21T10:45:56+05:30), author `nirvan-08 <nirvann.naveenn@gmail.com>`, committer `GitHub`, “Add files via upload”. Content was submitted through web interface, consistent with partial upload (`.next` artifacts present and code folders absent). `git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single Next.js application with one build (`app-build-manifest.json:1–40`), and no composition configuration. Folder `components/microfrontends/` (`page.tsx:2`) would be a component folder within same app and is not even versioned. |
| Q2 | No | No two units; `NewsFeed` is statically imported by page (`page.tsx:2`, `:12`). |
| Q3 | No | No host loading independent units. |
| Q4 | No | No composition mechanism (`next.config.mjs:1–14`; recorded search). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- Matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”: “microfrontend-inspired” and folder `components/microfrontends/` are internal modularization labels.
- Close to 274 (draft, “microfrontend-ready feature structure”) and 146 (draft, “micro-apps” as internal modules).
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]` (Next.js/React observed in `page.tsx` and `layout.tsx`). `build_tools: []`: Next encapsulates bundler and no explicit configuration exists. `repo_type: example` (personal project generated with v0.app and mock data, according to description).
- Incomplete snapshot does not open a class question: even missing portion, from alias imports and manifests, does not indicate separate units.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** description “microfrontend-inspired architecture” and folder `components/microfrontends/` inside one Next app. Term describes component organization, rather than composition.
- **Protocol (completeness):** partial-upload repository (versioned `.next` artifacts, missing component source code). Architecture assessments in these cases depend on present build artifacts.
- **Protocol (search):** plural hit `microfrontends` has no spelling in indexed fields. Eligibility remains `unknown` in both rounds.

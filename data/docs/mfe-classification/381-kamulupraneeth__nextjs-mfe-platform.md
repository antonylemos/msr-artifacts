---
schema: 1
id: 1254311775
full_name: kamulupraneeth/nextjs-mfe-platform
url: https://github.com/kamulupraneeth/nextjs-mfe-platform
commit: 750571ab7142f074b39122b82f94eaf5dc4181fa
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 381 — kamulupraneeth/nextjs-mfe-platform

## Context

Next.js 16 Multi-Zones demonstration platform (`README.md:1–10`, decoded from UTF-16). It has three independent Next.js applications:
- `host-shell` (port 3000), with global navigation;
- `analytics-dashboard` (3001, `basePath: '/analytics'`);
- `workspace-document` (3002, `basePath: '/workspace'`).

The shell performs `rewrites` of each zone’s routes and assets to the corresponding servers, and cross-zone navigation uses `<a>` with a full reload. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:382` records rank 381, ID 1254311775, status `cloned`, branch `main`, the front matter commit, which is the HEAD of the clone and of `origin/main`, and `replaces` = `979558095`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

The candidate is not in `sample.csv`. It entered as a replacement for rank 259 (`979558095`, `surendra190/microfrontend`), whose clone failed (`data/samples/mfe-sample-001/clones.csv:260`, status `failed`). Its ranking position is `data/samples/mfe-sample-001/ranking.csv:382` (rank 381, strategy `terminology`, eligibility `pass`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:30961` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:30969` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-05` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:35:41.883Z / 2026-10-08T15:59:28.928Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:04:12.402Z / 2026-10-08T16:09:04.849Z |

The effective queries append `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 231;
- created at 2026-05-30T12:09:58Z, pushed at 2026-05-31T15:16:03Z.

Root `README.md` is UTF-16 LE (with BOM). Decoded, it has “Micro-Frontend” in `README.md:1` and “micro-frontend” in `:3` and `:7`; plural does not appear. How GitHub indexes a UTF-16 file is not recorded, nor is search text processing. The last README change is `c201365` (2026-05-31), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 67 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are three Next.js apps (`host-shell`, `analytics-dashboard`, `workspace-document`), each with `package.json`, lockfile, `next.config.ts` and `src/`, plus the root README. | context |
| Composition (shell) | `host-shell/next.config.ts:3–6`, `10–48`: `rewrites` (`beforeFiles`) from `/analytics`, `/analytics/api/metrics`, `/analytics/:path` and `/analytics-assets/_next/:path*` to `ANALYTICS_URL` (`http://localhost:3001` by default). The same applies to `/workspace`, `/workspace/:path*` and `/workspace-assets/_next/:path*` → `WORKSPACE_URL` (3002). | strong |
| Zones | `analytics-dashboard/next.config.ts:5–6`: `basePath: '/analytics'`, `assetPrefix: '/analytics-assets'`. `workspace-document/next.config.ts:5–7`: `basePath: '/workspace'`, `assetPrefix: '/workspace-assets'`. Ports in `*/package.json:6` (3000, 3001, 3002). | strong |
| Navigation | `host-shell/src/components/GlobalNavbar.tsx:10–14`, `40–52`: `<a href>` links to `/`, `/analytics` and `/workspace` (comment `:37–39` about replacing `Link` with `<a>`). | moderate |
| Source code (boundaries) | Search for imports with `../../` at the SHA: none. Each app imports only its own files and packages; there is no shared package. | context |

## Authorship and history

Non-shallow clone; 16 commits across all refs, 4 PR merges through the GitHub interface, from 2026-05-30 (`1dedac6`, “feat(analytics): engineer multi-zone app router architecture…”) to 2026-05-31 (SHA `750571a`). The author appears as “Kamulu Praneeth”, “Praneeth-Kamulu” and `kamulupraneeth`. There are five `feature/*` branches, not considered. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three Next.js apps, with zones referenced by shell `rewrites` (`host-shell/next.config.ts:10–48`). |
| Q2 | Yes | Each app has its own `package.json`, `next.config.ts`, port and build, without code import between apps. |
| Q3 | Yes | The shell routes `/analytics` and `/workspace`, with assets, to zones under one origin. |
| Q4 | Yes | Multi-Zones: `rewrites` in the shell and `basePath`/`assetPrefix` in zones, with `<a>` navigation. Explicit composition configuration, subject to the open decision about composition through routes or links alone. |
| Q5 | Yes | Q1–Q4 Yes, with the same caveat as 013. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “monorepos containing a host and its remotes”, with `status: review` because of the open decision. Same pattern as 013 (final, `review`), 237 and 273: shell with `rewrites`, zones with `basePath`/`assetPrefix` and full-page navigation.
- **Fields:**
  - `approaches: [multi-zones]`, `ui_technologies: [react, next]`, `build_tools: []` (Next.js without explicit bundler, as in 013);
  - `frontend_units: 3`, `unit_organization: monorepo`;
  - `repo_type: example` (demonstration platform with case study in the README).

## Analysis notes

- **RQ2:** Next.js 16 Multi-Zones with per-zone `assetPrefix` to isolate chunks and `rewrites` `beforeFiles` also for zone API routes.
- **Protocol (sample):** replacement candidate (`replaces` 979558095) after clone failure for rank 259.
- **Protocol (search):** UTF-16 LE README; plural has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

1. **Composition through zones:** do Multi-Zones through `rewrites` and full-page navigation count as a composition mechanism for Q4? The same question is pending in 013, 199, 237 and 273. If they count, the case remains `MFE-implemented`; if composition through routes alone does not count, it becomes `Non-MFE`. No new rule is proposed; until the decision, preserve `review`.

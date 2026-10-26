---
schema: 1
id: 1208265953
full_name: kod88vn/poc_next_mfa
url: https://github.com/kod88vn/poc_next_mfa
commit: d20db8260825dc17ad4c68ac6df0595c1c59df23
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

# 273 — kod88vn/poc_next_mfa

## Context

Next.js 16 Multi-Zones proof of concept in an npm workspaces + Turborepo monorepo (`README.md:1–20`; `package.json:4–15`; `turbo.json:1–27`). Three Next.js applications:
- `apps/shell` (port 3000), performing `rewrites` of `/shop` and `/duda` to the other zones;
- `apps/shop` (port 3001, `basePath: '/shop'`);
- `apps/duda` (port 3002, `basePath: '/duda'`), fetching the HTML of an external site built with Duda on the server and rendering it.

All three use library `packages/ui` (`@repo/ui`) and a shared cookie, `mfe_cart_count`. Cross-zone navigation uses `<a>` with a full reload. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:274` records rank 273, ID 1208265953, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:274` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:28212` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:28218` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-04` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T20:52:29.002Z / 2026-10-08T15:42:17.890Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:12:37.047Z / 2026-10-08T15:49:43.133Z |

The effective queries append `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 91;
- created at 2026-04-12T03:30:08Z, pushed at 2026-04-24T20:04:48Z.

Spellings in the README:
- “Microfrontend”: `README.md:1` (“# poc_next_mfa — Next.js 16 Multi-Zone Microfrontend POC”) and `README.md:3` (“A production-style Microfrontend architecture using **Next.js 16 Multi-Zones** and **Turborepo**…”);
- “microfrontends”: the plural does not appear; this hit depends on GitHub search text processing, which is not recorded.

The last README change is `18d620e` (2026-04-12), before the October 2026 collections. The README at the SHA does not postdate the searches. It also does not mention zone `duda`, added later.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 45 entries, all regular files `100644`; zero symlinks and zero gitlinks. Three apps in `apps/` (`shell`, `shop`, `duda`), each with `package.json`, `next.config.js`, `tsconfig.json` and `app/`; library `packages/ui`; at the root, `load-root-env.js`, `turbo.json`, `tests/` and `test-duda-themes.js`. | context |
| Composition (shell) | `apps/shell/next.config.js:25–43`: `rewrites` of `/duda` → `http://localhost:3002/duda`, `/shop` → `http://localhost:3001/shop` and `/shop/:path*` → `http://localhost:3001/shop/:path*`. | strong |
| Zones | `apps/shop/next.config.js:19`: `basePath: '/shop'`; `:29–41`: CORS for the shell origin. `apps/duda/next.config.js:6`, `10–22`: `basePath: '/duda'` and the same header. Own ports in `apps/*/package.json:7–9` (3000, 3001 and 3002). | strong |
| Navigation and state | `packages/ui/src/Header.tsx:45–93`: cross-zone links with `<a href="/">`, `"/shop"` and `"/duda"` (“Cross-zone link: must use <a>”). `apps/shop/app/actions.ts:16–35`: Server Action writing cookie `mfe_cart_count`, read by shell (`apps/shell/app/layout.tsx:27–32`) and duda (`apps/duda/app/layout.tsx:20–27`) layouts. | moderate |
| External content zone | `apps/duda/app/page.tsx:9–14` and `apps/duda/lib/duda-landing.ts:4–5`: fetches HTML from `DUDA_ORIGIN` (default `https://pocmfe.multiscreensite.com/`) and injects it through `dangerouslySetInnerHTML`. `apps/duda/ARCHITECTURE.md:26–36`: describes the flow. The zone is its own Next.js application; content comes from an external site. | context |
| Source code (boundaries) | Relative imports remain within each app (`apps/shop/app/[id]/page.tsx:13`, `apps/duda/app/*.tsx` → `../lib/duda-landing`). All three `next.config.js` use `require('../../load-root-env')` (line 2), a root configuration script reading `.env`. `tests/header-theme-accessibility.test.ts:8` imports from `packages/ui`. There is no import between apps; common code is `@repo/ui`, a workspace dependency (`apps/*/package.json:13`, with `transpilePackages`). | context |

## Authorship and history

Non-shallow clone; 5 linear commits, no merges, all by Jay Quach, from 2026-04-11 (`9afe190`, “Initial commit”, created by GitHub) to 2026-04-24 (SHA `d20db82`, “feat: simplify header navigation and accessibility logic”). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three Next.js apps (`apps/shell`, `apps/shop`, `apps/duda`), referenced by shell `rewrites` (`apps/shell/next.config.js:25–43`). |
| Q2 | Yes | Each app has its own `package.json`, `next.config.js`, port and build (`next build`), without source code imports between apps; common code comes from library `@repo/ui`. |
| Q3 | Yes | The shell routes `/shop/*` and `/duda` to the zones under one origin (`apps/shell/next.config.js:25–43`). |
| Q4 | Yes | Multi-Zones: `rewrites` in the shell, `basePath` in zones and cross-zone navigation with cookie state. This is explicit composition configuration, subject to the open decision about route-only or link composition. |
| Q5 | Yes | Q1–Q4 Yes, with the same caveat as 013. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “monorepos containing a host and its remotes”, with `status: review` due to the open decision. Same pattern as 013 (final, `review`) and 237: shell with `rewrites`, zones with `basePath` and full-page navigation.
- **duda zone:** brings third-party content through a proxy, but is its own repository application; not a third-party platform plugin (102/074/080).
- **Fields:** `approaches: [multi-zones]`, `ui_technologies: [react, next]`, `build_tools: []` (Next.js without explicit bundler, as in 013), `frontend_units: 3` (shell, shop and duda; `packages/ui` is a library), `unit_organization: monorepo`, `repo_type: example` (POC declared in `README.md:1`).

## Analysis notes

- **RQ2:** Next.js 16 Multi-Zones with Turborepo; cross-zone state through a cookie on the same domain (`README.md:13`, `72`); zone proxying an external site (Duda) with a brand theme common to all three zones (`packages/ui/src/dudaBrandTheme.ts`).
- **Protocol (search):** the plural hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

1. **Zone composition:** does Multi-Zones through `rewrites` and full-page navigation count as a composition mechanism for Q4? This is the same question pending in 013, 199 and 237. If it counts, the case remains `MFE-implemented`; if route-only composition does not count, it becomes `Non-MFE`. No new rule is proposed; until the decision, preserve `review`.

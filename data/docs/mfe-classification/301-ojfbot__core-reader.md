---
schema: 1
id: 1170401686
full_name: ojfbot/core-reader
url: https://github.com/ojfbot/core-reader
commit: 480973916c7259c09e91cf8601e88eca4fdce266
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 301 — ojfbot/core-reader

## Context

“Core Reader”, read-only “Frame OS” framework documentation viewer (`README.md:1–5`). A pnpm monorepo with three packages:
- `packages/browser-app`: React/Carbon dashboard, configured as a Module Federation remote (`README.md:11`, `:20`; `packages/browser-app/vite.config.ts:6–8`, `:23–37`);
- `packages/api`: Express server reading files from repository `core`;
- `packages/browser-automation`: Node service with Playwright for visual tests.

Host is external repository `ojfbot/shell` (“Module Federation host”, `README.md:74`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:302` records rank 301, ID 1170401686, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:302` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:25666` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:25673` (`technology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | code | `…#size:800..899` | `packages/browser-app/package.json` | 2026-10-07T22:05:03.417Z / 2026-10-08T15:48:05.846Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2026-03` | empty | 2026-10-07T23:23:54.590Z / 2026-10-08T16:17:20.346Z |

Effective queries append range `size:800..899` (code) and `pushed:>=2025-04-01 created:2026-03-01..2026-03-31` (repositories).

Hit metadata (same in both rounds): description “Frame OS CoreReader — metadata dashboard for core repo commands, ADRs, and roadmap”, no topics, language TypeScript, license MIT, `fork: false`, size 388, created at 2026-03-02T04:39:10Z, pushed at 2026-06-04T23:10:55Z.

SHA matches:
- **Code:** `packages/browser-app/package.json` has 814 bytes, within the range, and declares `@originjs/vite-plugin-federation` (`:22`).
- **README:** “Module Federation” at `README.md:11` (“Module Federation remote — renders inside the Frame OS shell”), `:20`, `:29`, `:59` and `:74`.

Last change to `README.md`/browser-app `package.json` is `9741fa4` (2026-05-06), and SHA dates from 2026-06-04. Both precede October 2026 collection, and the SHA's README does not postdate searches.

Owner has 18 candidates in rounds, including `ojfbot/shell` (`data/discovery/mfe-round-002/candidates.csv:25474`), `core`, `cv-builder`, `BlogEngine`, `TripPlanner` and `frame-ui-components` (for example, `:21099`, `:22130`, `:26806`). Only `core-reader` is in `sample.csv` (`:302`); others were not inspected.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 193 entries, comprising 142 regular `100644` files and 51 symlinks `120000` (`.claude/commands`, 38 in `.claude/skills/`, 12 in `scripts/hooks/`), pointing outside repository to neighboring `core` (for example, `.claude/skills/adr` → `../../../core/.claude/skills/adr`); zero gitlinks. Symlinks are coding assistant tools, rather than units. Packages `packages/browser-app`, `packages/api`, `packages/browser-automation`; ADRs in `decisions/adr/`. | context |
| Configuration (remote) | `packages/browser-app/vite.config.ts:23–37`: `federation({ name: 'core_reader', filename: 'remoteEntry.js', exposes: { './Dashboard': './src/components/Dashboard' }, shared: react, react-dom, @carbon/react, react-redux singletons })`, without `remotes`; `:6–8`: “CoreReader is a Module Federation REMOTE. Shell dev: core_reader@http://localhost:3015/assets/remoteEntry.js; Shell prod: shell reads VITE_REMOTE_CORE_READER”; `:51–57`: port 3015 with CORS for shell. | strong |
| Source code (exposure) | `packages/browser-app/src/components/Dashboard.tsx:1–25`: exposed component with its own Redux `Provider`, tabs (Skills, ADRs, Roadmap, OKRs, Docs, Changes, Events) and `@ojfbot/frame-ui-components` layout. `packages/browser-app/src/main.tsx:9–15`: standalone mounting in `#root`. | moderate |
| Build/deploy | `packages/browser-app/package.json:5–8`: own `vite build`. `vercel.json:1–34`: Vercel deployment with `outputDirectory: packages/browser-app/dist`, and `/assets/*` CORS allowed for `https://frame.jim.software` (`:17–22`), production shell origin. | moderate |
| Composition | No repository host; README points to host in `ojfbot/shell` (`README.md:74`) and records “Module Federation remote registered in shell” (`README.md:59`). | absent |
| Source code (boundaries) | Active search for relative `../../` imports in `packages`: only internal traversals in each package (for example, `packages/browser-app/src/components/changes-tab/FileRow.tsx:2`, `:10`; `packages/browser-automation/src/test-runner/assertions/index.ts:1–2`). Browser-app consumes API through HTTP (`packages/browser-app/src/api/index.ts:2–7`) and common UI through npm package (`@ojfbot/frame-ui-components`, `packages/browser-app/package.json:11`). No other frontend unit in repository. | context |
| Technology | `packages/api/package.json:1–21`: Express; `packages/browser-automation/package.json:1–25`: Playwright and Express. Backends and test tools, rather than frontends. | context |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 55 commits reachable from the SHA (93 across all refs), no merges:
- 45 by `ojfbot <151410806+ojfbot@users.noreply.github.com>` (5 with committer `GitHub`);
- 9 by `ojfbot-clean[bot]`;
- 1 with author `Claude <noreply@anthropic.com>`.

Root is `2f27b66` (2026-03-01, “feat: initial CoreReader Phase 1 implementation”) and SHA is `4809739` (2026-06-04). 20 refs, including unconsidered remote branches. `git rev-list --objects $SHA --missing=print` lists 111 missing objects, none in SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`packages/browser-app`). Federation configuration only has `exposes` and references no other units (`vite.config.ts:23–28`). |
| Q2 | Yes (for the unit) | Its own entry, Vite build and deployment (`packages/browser-app/package.json:5–8`; `vercel.json:2–3`). |
| Q3 | Undetermined | Host (`ojfbot/shell`) is not in repository. |
| Q4 | Undetermined | Remote side is configured (`exposes: ./Dashboard`, `remoteEntry.js`); consumer is unobservable. |
| Q5 | No | Unit prepared for composition by an unobservable external host. |

## Rationale

- `MFE-unit` under exception “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- Matches “repositories containing only a remote unit, without the composing host”, as in 001, 050 and 225 (draft).
- Host belongs to owner's ecosystem (`ojfbot/shell`), rather than a third-party platform (037).
- Shared library `@ojfbot/frame-ui-components` enters through npm (build time) and is not a composed unit.
- `repo_type: production`: Vercel deployment with shell origin in its own domain (`vercel.json:16–20`). `ui_technologies: [react]`, `build_tools: [vite]`, `approaches: [module-federation]`. `frontend_units: 1`: API and browser automation are not frontends.
- No decision remains open.

## Analysis notes

- **RQ1:** 51 symlinks to `../../../core/...` depend on a neighboring `core` repository checkout and are broken in an isolated clone; belong to assistant tooling (`.claude`) and hooks.
- **RQ2:** `@originjs/vite-plugin-federation` remote with `vite-plugin-css-injected-by-js` to carry CSS in exposed chunk (`vite.config.ts:13–22`) and `@carbon/react` singleton.
- **Protocol (families/multi-repo):** Frame OS ecosystem has at least 18 repositories in rounds, including host `ojfbot/shell`. Family analysis could verify Q3/Q4 in shell.

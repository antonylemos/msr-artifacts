---
schema: 1
id: 1285891447
full_name: Ankamsudeep/BEZ
url: https://github.com/Ankamsudeep/BEZ
commit: f98478aeaa74562e53bd29040aec7126d560d500
classification: Non-MFE
checklist: { q1: yes, q2: no, q3: yes, q4: undetermined, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 347 — Ankamsudeep/BEZ

## Context

Npm monorepo with two React/Vite applications, `bez` (main app, base `/`) and `bookkeeping` (base `/bookkeeping/`), described as “BEZ Microfrontend Monorepo” (`README.md:1–9`). Both are published at distinct paths on the same domain through CloudFront/S3 or a local Express server (`README.md:37–63`; `server.js:9–26`). Navigation between them changes the URL. Apps import each other’s source code through path aliases. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:348` records rank 347, ID 1285891447, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:348` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:32734` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:32742` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-07` | 2026-10-07T21:51:56.270Z / 2026-10-08T15:43:13.235Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-07` | 2026-10-07T22:13:42.967Z / 2026-10-08T15:50:15.909Z |

The effective queries append `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Hit metadata (identical in both rounds): null description, no topics, language TypeScript, `fork: false`, size 15189, created at 2026-07-01T08:37:39Z, pushed at 2026-07-01T08:43:26Z.

**Spellings:** “Microfrontend” in `README.md:1` (“# BEZ Microfrontend Monorepo”), matching `microfrontend`. Plural form `microfrontends` does not appear; this hit depends on GitHub search text processing, which is not recorded. Lines `README.md:64–66` contain “B E Z” with interleaved characters, a UTF-16 encoding remnant.

The README exists only in the single commit, the SHA (2026-07-01T14:13:18+05:30, that is, 08:43:18Z), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 743 entries, all regular files `100644`; zero symlinks and zero gitlinks. Root with `package.json` (workspaces `bez` and `bookkeeping`, `package.json:5–8`), `server.js`, `scripts/merge-dist.js` and test configuration; `bez/` and `bookkeeping/` with `package.json`, `vite.config`, `index.html`, `src/` and `tests/`. | context |
| Configuration (apps) | `bez/vite.config.js:6–14`: React, `base: "/"`, port 3000. `bookkeeping/vite.config.ts:5–8`: React, `base: "/bookkeeping/"`, port 3002. Own Vite builds (`bez/package.json:7–8`; `bookkeeping/package.json:7–8`). No federation, single-spa or import map configuration. | moderate |
| Source code (boundaries) | Active cross-import search: `bez/vite.config.js:19` defines alias `@bookkeeping` → `../bookkeeping/src`, and `bez/tsconfig.json:21`, `:24` includes `bookkeeping` sources; `bez/src/AdminV2/components/AdminHeader.tsx:5` imports `AccountSettingsPanel` from `@bookkeeping/chat/components/AccountSettingsPanel`. In reverse, `bookkeeping/vite.config.ts:12` defines `@bez` → `../bez/src`; `bookkeeping/src/chat/components/ChatHeader.tsx:4` imports `SupportForm` from `@bez/AdminV2/…`; `bookkeeping/src/chat/css/chat.scss:4–6` uses three stylesheets from `@bez/…`. Apps compile each other’s source code. | contrary |
| Composition (path routing) | `server.js:9–26`: Express serves `bookkeeping/dist` at `/bookkeeping` and `bez/dist` at `/`, each with SPA fallback. `README.md:41–63`: the same arrangement through S3 and CloudFront behavior rules. `scripts/merge-dist.js:12–16`: copies both `dist` to a single folder. | ambiguous |
| Source code (navigation) | `bez/src/AdminV2/components/AdminHeader.tsx:196–197` and `bez/src/Auth0/components/LoginPage.tsx:141–142`: `window.location.href = "/bookkeeping/chat"`; `bez/src/SecureGeneralLLM/components/Header.jsx:647`: link to `/bookkeeping/chat`. Connection between apps uses full-page navigation. | ambiguous |

## Authorship and history

Non-shallow clone. There is 1 commit (1 across all refs), without merges: `f98478a` (2026-07-01T14:13:18+05:30), author and committer `Sudeep <sudeepankam003@gmail.com>`, “first commit”, adding everything at once. `bookkeeping/CLAUDE.md` indicates coding assistant use; metadata does not distinguish intellectual authorship. `git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two identifiable applications, `bez` and `bookkeeping`, with their own entry point, `index.html` and Vite configuration (`bez/vite.config.js:6–14`; `bookkeeping/vite.config.ts:5–8`). |
| Q2 | No | Under the literal criterion (“units do not import each other's source code directly”), apps import each other’s source code in both directions (`bez/src/AdminV2/components/AdminHeader.tsx:5`; `bookkeeping/src/chat/components/ChatHeader.tsx:4`; `bookkeeping/src/chat/css/chat.scss:4–6`), with aliases pointing to the other folder (`bez/vite.config.js:19`; `bookkeeping/vite.config.ts:12`). |
| Q3 | Yes | The server and CDN configuration route both apps on the same domain by path (`server.js:9–26`; `README.md:50–53`), and the main app leads to the other through navigation (`AdminHeader.tsx:196–197`). |
| Q4 | Undetermined | Connection is only path routing and full-page navigation. Whether this counts as a composition mechanism is an open checklist decision (“Link-only… composition”). |
| Q5 | No | With Q2 No, the general rule gives Non-MFE regardless of the Q4 answer. |

## Rationale

- `Non-MFE` under the rule “at least one question is No” (Q2).
- Source code coupling, with cross-aliases and imports in both directions, contradicts the independence required by the literal Q2 criterion, as in the review proposal for 104.
- The class is independent of the open decision about link-only or route-only composition (Q4).
- This is not a complete chain (076/084/096/106/109): no runtime unit loading mechanism.
- Unlike the `rewrites` shell in 013: here there is no composing shell, only a static server with two path prefixes.
- `frontend_units: 2`, `unit_organization: monorepo`, `ui_technologies: [react]`, `build_tools: [vite]`, `approaches: []` (Non-MFE). `repo_type: production`: product with Auth0 authentication, OAuth integrations, AWS RUM (`bez/package.json:21`) and S3/CloudFront deployment.
- There is no open decision changing the class.

## Analysis notes

- **RQ1 (misleading signals):** “Microfrontend Monorepo” (`README.md:1`) and root package name `bez_microfrontend` (`package.json:2`) describe two SPAs served at distinct paths and sharing sources through aliases; the label does not correspond to unit independence.
- **RQ3:** bidirectional path-alias coupling (`@bookkeeping`, `@bez`) is a pattern to observe in monorepos claiming to be micro-frontends. A `../` search does not detect it, because imports use aliases.
- **Checklist:** “link-only composition” combined with source coupling. The second characteristic resolves the class without deciding the first.
- **Protocol (search):** the plural hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

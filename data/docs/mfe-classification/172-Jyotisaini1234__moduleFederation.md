---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
url: https://github.com/Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 172 — Jyotisaini1234/moduleFederation

## Context

Module Federation example with webpack 5 and two TypeScript React applications. `mfe1` is the host (“Product Listing”), consuming `app2/App` and containing an experimental SSR server. `mfe2` is the remote (“Cart Application”), exposing `./App` (`mfe1/webpack.config.ts:73–89`; `mfe1/src/App.tsx:1–32`; `mfe2/webpack.config.ts:36–44`). The README has only a title (`README.md:1`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:173` records rank 172, ID 1042592063, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:173` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:17958` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:17963` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-08` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T23:19:14.420Z / 2026-10-08T16:15:27.977Z |

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`;
- size 17,269, inflated by previously versioned `node_modules`/`dist` (see Authorship);
- created at 2025-08-22T09:00:54Z, pushed at 2025-09-01T06:08:15Z.

**Hit origin.** The SHA's README contains only “# moduleFederation” (`README.md:1`), in camelCase, without literal phrase “module federation”, and description is null. The hit depends on how GitHub processes the camelCase token in the README or field `name`, which is not recorded. This records provenance only; the name is not used as classification evidence. The README was last changed in the SHA itself (2025-09-01), before October 2026 collection.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 21 entries, all regular `100644` files; zero symlinks and zero gitlinks. Two projects, `mfe1/` and `mfe2/`, each with `package.json`, `package-lock.json`, `tsconfig.json`, `webpack.config.ts`, `public/index.html` and `src/`. No root workspace. | context |
| Configuration (host) | `mfe1/webpack.config.ts:73–89`: `ModuleFederationPlugin({ name: 'app1', remotes: { app2: 'app2@http://localhost:3002/remoteEntry.js' }, shared: react/react-dom singleton })`. `:22–35`: dev server on port 3001 with CORS. | strong |
| Configuration (remote) | `mfe2/webpack.config.ts:36–42`: `ModuleFederationPlugin({ name: 'app2', filename: 'remoteEntry.js', exposes: { './App': './src/App.tsx' }, shared: react/react-dom singleton })`. `:15–18`: port 3002. | strong |
| Source code (consumption) | `mfe1/src/App.tsx:3–12`, `25–27`: `React.lazy(() => import("app2/App"))`, with error fallback and `Suspense`, rendered below the host header. `mfe1/src/types/remotes.d.ts:1–5`: remote module typing. Asynchronous bootstrap in `mfe1/src/index.tsx:3` and `mfe2/src/index.tsx:1`. | strong |
| Source code (SSR) | `mfe1/src/server/server.ts:1–104`: HTTP server with `renderToString(App)` and `window.__SSR__`. `mfe1/src/bootstrap.tsx:14–19`: `hydrateRoot` in this case. No `package.json` script calls the server (`mfe1/package.json:7–10`). `@module-federation/node` and `ignore-loader` are declared (`mfe1/package.json:15`, `29`), but unused in configuration. A side experiment. | context |
| Source code (boundaries) | Searching for `../../` and `../mfe…` imports at the SHA returns nothing. Each project imports only its own modules; connection is through federated `app2/App`. | context |
| Build | `mfe1/package.json:7–10` and `mfe2/package.json:7–10`: each project's own webpack, executed through `ts-node/esm`. | moderate |

## Authorship and history

Non-shallow clone; 6 commits, no merges.
- **Local commits:** 5 by `jyotisainii <jyotisaini5614@gmail.com>`, from 2025-08-22 (`da91d51`, “model federation”, README only) to 2025-08-27. Both projects enter in `a38408a`/`6767cd7`, and SSR in `5cf7cbb`. `0baa0e7` removes versioned build and dependency folders, explaining metadata size.
- **SHA:** `8df0f2a` (2025-09-01, “Update README.md”) is by `JyotiSaini@19`, noreply and through GitHub, and changes only the README.

No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units in the repository, referenced by composition configuration (`mfe1/webpack.config.ts:76–78`; `mfe2/webpack.config.ts:40`). |
| Q2 | Yes | Each unit has its own entry, build and server (`*/webpack.config.ts`; ports 3001/3002), without source code imports between them. |
| Q3 | Yes | The host loads and renders the remote on its own page (`mfe1/src/App.tsx:25–27`). |
| Q4 | Yes | Module Federation configured on both sides and consumed through dynamic import (`mfe1/src/App.tsx:3–4`). |
| Q5 | Yes | Q1–Q4 are Yes: host and remote with Module Federation. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- The chain is complete in the snapshot, as in 076/084/096/106/109. The exposed module is the remote's application (`./App`), rather than a generic component, so the code sharing uncertainty in 089/100 does not apply.
- Experimental SSR and unused dependencies do not affect configured client-side composition.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 2`, `unit_organization: monorepo`, `repo_type: example`.
- No decision remains open.

## Analysis notes

- **RQ2:** classic host and remote with webpack 5 and TypeScript configuration (`ts-node/esm`), with `React.lazy` error fallback for unavailable remote.
- **RQ3:** host SSR attempt (`server.ts`), not integrated into scripts, with `@module-federation/node` declared but unconfigured.
- **Protocol (search):** the README lacks the searched phrase in literal form, only camelCase “moduleFederation”. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, `webpack`, two units and `monorepo`; no open decision (`draft`). Host–remote connection (matching port and `remoteEntry.js`, exposed component mounted by host) does not depend on executing the project. Static caveat: `mfe1/webpack.config.ts:62–65` declares rules with `style-loader` and `css-loader`, absent from `mfe1/package.json` dependencies; no CSS is imported in snapshot code, so this would affect CSS processing only if introduced, and limits any general build claim without preventing the current connection. Editorial adjustment: comparable 076, 084, 096, 106 and 109 are `draft` and serve as provisional parallels, rather than final precedents; normative comparison is anchored in 052 and 007 (final), with 089 and 100 only as review contrasts.

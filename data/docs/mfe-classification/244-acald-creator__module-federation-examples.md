---
schema: 1
id: 617509606
full_name: acald-creator/module-federation-examples
url: https://github.com/acald-creator/module-federation-examples
commit: d81aa4f81ca09655bf54259d802c8be38b201dc9
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 244 — acald-creator/module-federation-examples

## Context

“A comprehensive collection of Module Federation patterns and implementations” (`README.md:1–16`). In practice, the snapshot has a single example, `apps/nextjs-cra/`, about Module Federation with different React versions:
- `dashboard`, Next.js 13 host with `@module-federation/nextjs-mf`;
- `remote`, CRA with `react-app-rewired`, React 18, port 8081;
- `cloud`, CRA with CRACO, React 17, port 8082.

There are also `packages/performance-monitor` (metrics library used by the host) and `scripts/benchmark.js`. Both remotes expose only a `Button` component, which the host displays beside its own button. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:245` records rank 244, ID 617509606, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:245` records strategy `technology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:5721` and `data/discovery/mfe-round-002/candidates.csv:5726`, both with `unknown`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:600..699` | `apps/nextjs-cra/dashboard/package.json` | 2026-10-07T18:20:45.384Z / 2026-10-08T15:36:05.759Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2023-03` (`created:2023-03-01..2023-03-31`) | — | 2026-10-07T23:15:46.527Z / 2026-10-08T16:13:03.022Z |

The `package.json` of `dashboard` has 654 bytes and declares `"@module-federation/nextjs-mf": "^6.1.3"` (`:13`).

Repository hit metadata:
- description “A comprehensive collection of Module Federation patterns and implementations.”;
- no topics, language TypeScript, `fork: false`, size 762;
- created at 2023-03-22T14:39:07Z, pushed at 2025-09-23T19:45:54Z.

Spelling “Module Federation” in `README.md:1`, `3` and `34`. The last README change is `9847672` (2025-09-22), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 112 entries, 111 regular files `100644` and 1 executable `100755` (`scripts/benchmark.js`); zero symlinks and zero gitlinks. Pnpm/lerna workspace (`pnpm-workspace.yaml:1–5`; `package.json:6–10`) with three apps in `apps/nextjs-cra/` and package `packages/performance-monitor`. There is also `CLAUDE.md`. | context |
| Configuration (host) | `apps/nextjs-cra/dashboard/next.config.js:12–31`: `NextFederationPlugin({ name: 'dashboard', remotes: { remote: 'remote@http://localhost:8081/remote.js', cloud: 'cloud@http://localhost:8082/remote.js' }, exposes: './newReact', './newReactDOM', shared react com shareKey 'newReact' })` (English translation of the inline display wording: “shared React with shareKey”). | strong |
| Configuration (remote `remote`) | `apps/nextjs-cra/remote/config-overrides.js:9–37`: `ModuleFederationPlugin({ name: "remote", filename: "remote.js", exposes: { "./Button": "./src/Button" } })`, applied through `react-app-rewired` (`package.json:21–22`, port 8081). | strong |
| Configuration (remote `cloud`) | `apps/nextjs-cra/cloud/craco.config.js:5`: `module.expots = {…}`, with a typo; the object with `ModuleFederationPlugin` is not exported and CRACO does not receive it. Additionally, the exposed key is `"./CloudButton"` (`:28–30`), but the host imports `cloud/Button`. | ambiguous |
| Source code (composition) | `apps/nextjs-cra/dashboard/src/async-pages/index.tsx:7–17`: `dynamic(() => import('remote/Button'))` and `import('cloud/Button')`, `ssr: false`. `:49–54`: displays the host button, the `remote` button and the `cloud` button. `src/pages/index.tsx:3–14`: the entire page is loaded asynchronously. | strong |
| Nature of what is composed | `apps/nextjs-cra/remote/src/Button.tsx:10–15` and `cloud/src/components/Button.tsx:10–15`: a styled button with a logging `useEffect`. The remotes expose neither screens nor functional slices. | ambiguous |
| Source code (boundaries) | There is no code import between apps. `apps/nextjs-cra/remote/config-overrides.js:42–45` includes `../dashboard/src/components` in SWC compilation, but no `remote` file imports that path. `@mf-examples/performance-monitor` is a host workspace package (`dashboard/package.json:12`). | context |

## Authorship and history

Non-shallow clone; 73 commits on `main`, 28 merges, all by Antonette Caldwell. They begin on 2023-03-07 (“Created nextjs project called dashboard”). After a gap, there is a reorganization on 2025-09-22/23 (`24865e8`, “feat: move existing apps to apps/nextjs-cra”), with the performance package and tests. SHA `d81aa4f` (2025-09-23) adds type tests. There are 28 other remote feature and documentation branches, not considered. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | The snapshot demonstrates demo applications and remote buttons, not multiple composed functional frontend units. |
| Q2 | No | Build separation serves the component sharing experiment, not frontend units participating in composition. |
| Q3 | No | The host renders only remote demonstration buttons. |
| Q4 | No | Module Federation is used to distribute components; additionally, remote `cloud` does not export its configuration correctly. |
| Q5 | No | Q1–Q4 characterize experimental code sharing, not an MFE implementation. |

## Rationale

- Classified as `Non-MFE`: the remotes provide only demonstration buttons, characterizing component sharing between React versions.
- **Broken configuration:** remote `cloud` does not work as written (`module.expots`, key `./CloudButton`), reinforcing the absence of functional composition.
- **Fields:** `approaches: []`, `ui_technologies: [react, next]`, `build_tools: [webpack]` (explicit webpack configurations through `nextjs-mf`, `react-app-rewired` and CRACO), `frontend_units: 1`, `unit_organization: monorepo`, `repo_type: example`.

## Analysis notes

- **RQ2:** Next.js 13 host with `nextjs-mf` and CRA remotes with React 17 and 18; the host exposes its own React (`./newReact`) and uses `shareKey` to coexist with different versions.
- **RQ1 (misleading signals):** the description promises a “comprehensive collection”, but the snapshot has one example, with one broken remote.
- **Protocol (search):** eligibility `unknown` in both rounds; the repository entered the sample with `unknown`.

## Recorded decision

Classified as `Non-MFE`. The host consumes only demonstration buttons from remotes, in a component sharing experiment between React versions. Remote `cloud` also has broken configuration; there is no composition of functional frontend units.

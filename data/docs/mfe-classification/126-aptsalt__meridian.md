---
schema: 1
id: 1277695813
full_name: aptsalt/meridian
url: https://github.com/aptsalt/meridian
commit: 2c6fbaa2112cc3ab55cf06786647be1c5aee4bc4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 126 — aptsalt/meridian

## Context

Angular banking-policy assistant demonstration, with deterministic client-side execution and synthetic content (`README.md:12–13`; `README.md:33–35`; `README.md:80–83`). Application has local pages and an HTML presentation. Architecture page and slides describe MFE architecture, but described remote/host registrations and federation artifacts are not implemented in snapshot.

Rank, ID and SHA checked in `data/samples/mfe-sample-001/clones.csv:127`, status `cloned`; HEAD matches front-matter commit. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, without changing snapshot, installing packages, running applications or querying network.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:127` records strategy `terminology` and eligibility `pass`. Sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). Candidate appears in `data/discovery/mfe-round-001/candidates.csv:32346`, with eligibility `unknown`, and `data/discovery/mfe-round-002/candidates.csv:32354`, with `pass`. Metadata record empty topics, TypeScript language, `fork: false`, creation at 2026-06-23T05:43:51Z and push at 2026-06-23T21:38:33Z. Description presents Angular/RAG/MCP/FAPI copilot, without searched micro-frontends expressions.

`sqlite3 -readonly` queries of tables `hits`, `queries` and `subqueries` in `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, by ID 1277695813, record:

| Query | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-06` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-06-01..2026-06-30` | 2026-10-07T22:37:30.229Z / 2026-10-08T16:00:17.941Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-06` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-06-01..2026-06-30` | 2026-10-07T23:07:03.008Z / 2026-10-08T16:09:34.491Z |

Hits have empty `path` and report no matched field/line. By elimination, name and description supply no expressions and no topics exist; README contains nearby spelling **“micro-frontends”** in `README.md:45` and **“micro-frontend ready”** in `README.md:78`. Queries use spaces; observed text uses hyphens. Text is not presented as literal occurrence of space-separated phrases, nor is a search normalization rule presumed; hits and available compatible textual evidence are recorded. Name was not used as architectural evidence.

README was added at root and updated in `e44f777`, 2026-06-23T01:45:05-04:00 (05:45:05Z), without reachable later modification. Its content at the SHA predates October 2026 searches, rather than following them.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r`: 56 regular files `100644`, zero symlinks and zero gitlinks. One `src` tree, one manifest, one Angular configuration and compiled output in `docs/` exist, plus HTML presentation. No versioned `node_modules`, second application project, federation config or `remoteEntry` exists in inventory. Published copy and slides are not additional own units. | contrary |
| Configuration (single target) | `angular.json:8–24` defines only project `meridian`, type application, builder `@angular/build:application` and entry `src/main.ts`. `angular.json:60–70` serves same build. No federation builder or unit-specific bundler configuration exists. | contrary |
| Source code (entry) | `src/index.html:12–14` contains `app-root`; `src/main.ts:1–6` calls `bootstrapApplication(App, appConfig)`. `src/app/app.ts:5–11` uses RouterOutlet and template of same application. | contrary |
| Source code (routes) | `src/app/app.routes.ts:8–41` uses `loadComponent` with local relative imports for Console, Policies, Security, Guardrails and Architecture. `src/app/app.config.ts:23–33` registers this list and preloading in same application. Local lazy loading establishes no independent entries/builds. | contrary |
| Source code (shared state) | `src/app/features/console/console.ts:9–11` imports CopilotEngine and models from local `core`; `src/app/features/policies/policies.ts:8–9` imports corpus/models from same `core`. `src/app/core/copilot-engine.ts:18–34` describes deterministic local execution and exposes root service. Decomposition into features/services does not configure autonomous frontend units. | contrary |
| UI documentation | `src/app/features/architecture/architecture.ts:27–38` says “Module-Federation-ready”. `src/app/features/architecture/architecture.ts:229–256`, within HTML template, describes manifest, `advisor-copilot`, exposure `./CopilotPage`, `loadRemoteModule()` and Native Federation. These are text/code displayed in `<code>` elements, not executed configuration or loader call. | weak |
| Documentation (slides) | `presentation.html:910–943` depicts host `bmo-portal`, payment/loan remotes and advisor-copilot; `presentation.html:958–964` lists Webpack Module Federation, `@angular-architects/mfe`, loadRemoteModule and types package. None of these names has corresponding producer/consumer/config in implementation tree. Copy `docs/presentation.html` has same blob, not another instance. | weak |
| Configuration / Technology (resolution) | `package.json:4–9` calls Angular CLI; `package.json:13–30` declares Angular and builder, without federation package. Lock resolves `@angular/core` 21.2.17 at `package-lock.json:522–524` and `@angular/build` 21.2.16 at `package-lock.json:326–328`; it contains no federation, single-spa, qiankun or wujie package keys. Builder is declared/resolved, but build was not run. CLI encapsulates bundler, without explicit hook. | contrary |
| Source code (boundaries) | Active literal search `git grep -n -F -e '../../' -e '../../../'` in all TS of `src`: five occurrences, at `src/app/features/console/agent-trace.ts:2`, `src/app/features/console/console.ts:9–11` and `src/app/features/policies/policies.ts:8–9`. All resolve to `src/app/core`, not another target. Independence was not asserted through sampling or absent imports. | context |
| Technology / Configuration / Composition (searches) | Search for `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map` and `micro.?frontend`, excluding lockfile and compiled JS, finds declarations in README, slides and Architecture template, without executable mechanism. Configs and all actual routes were read. Published-JS inspection distinguishes template strings from composition calls: text `loadRemoteModule` remains rendered content; `registerApplication` occurrences in Angular runtime are not single-spa registration. | absent |
| Documentation (purpose) | `README.md:33–35` declares client-side mock execution; `README.md:80–83` identifies synthetic content and portfolio/interview demonstration. MFE self-description was not taken as sufficient evidence without unit connection. | context |

## Authorship and history

Metadata from `git rev-list`: **7 commits, 0 merges and 1 root commit**, root `4b8478d53a59475646e4f5dc296d1ecafe0c36b4`; non-shallow clone. Author/committer of observed commits: aptsalt. Root occurs at 2026-06-23T01:43:40-04:00 and introduces application; evaluated SHA occurs at 17:38:31-04:00 that day, with a design-refinement message.

`git log --no-renames --name-status` was queried for `src/app`, `docs`, `presentation.html` and `README.md`. Application is added at root; `b7646cc`, `ce48368` and final SHA modify UI sources. `3060e5f` adds publication `docs/`; final three commits also refresh published artifacts. Presentation is added at root and changed by `1a04000`; README is updated by `e44f777`.

Sequence shows local source/publication evolution; it does not prove original authorship of every excerpt. Angular scaffold artifacts were not counted as vendored units, and no third-party application upstream was identified in read evidence. Historical blobs were not queried; no missing object was found. Historical federation implementation is not inferred from commit titles.

Local references for record only: `master`, `origin/master` and `origin/HEAD` point to evaluated SHA. No other branch appears in local enumeration. Observable architectural documentation is in README, slides and Architecture page, cited above; no separate ADR exists in inventory.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One Angular application with single entry/build (`angular.json:8–24`; `src/main.ts:1–6`). Remotes and host appear only as slide/template content (`presentation.html:910–943`; `src/app/features/architecture/architecture.ts:248–251`), without executable composition references. |
| Q2 | No | Features have no own entries/builds; they share project and local `core` (`angular.json:19–24`; `src/app/features/console/console.ts:9–11`). No unit is actually prepared for an external host. |
| Q3 | No | Router loads local components of same application (`src/app/app.routes.ts:8–41`), without host/shell loading independent units. MFE diagram is not implemented routing. |
| Q4 | No | Builder is standard Angular CLI (`angular.json:20–24`); no remote/exposes/consumption configuration exists. `loadRemoteModule` is displayed as template text (`src/app/features/architecture/architecture.ts:248–251`), not executed. |
| Q5 | No | Q1–Q4 converge: conventional application with MFE content and readiness intent, without implemented architecture instance. |

## Rationale

- `Non-MFE` under conventional frontend and microfrontends mention without implementation. `MFE-unit` does not apply: being described as remote in slides does not equal exposure/contract/build prepared for composition. Q2–Q4 are No, not Undetermined.
- `frontend_units: 1` and `unit_organization: single-unit` count implemented application. Lazy chunks, routes, services, slides and publication copy are not additional units. Demonstration is a real own target; educational content does not reduce count to zero.
- `repo_type: example` follows showcase/portfolio declaration (`README.md:12–13`; `README.md:80–83`). Angular is used in sources and builder; `build_tools: []` because no explicit bundler configuration exists beyond CLI encapsulation. Webpack/Vite/esbuild are not annotated merely for slide mentions or transitive dependencies.
- No open question concerns build-time composition, iframe or links between units; MFE references never go beyond descriptive content. Absent implementation was not rewritten as imperfection of an existing chain.

## Analysis notes

- **Protocol (family):** annotation search for `aptsalt`, `meridian` and `Lumi pattern` found no previously annotated sibling. Scaffold origin demonstrates no copying of a specific candidate.
- **Checklist:** parallel with final 023 regarding MFE as slide content and with 075/081/094/105 regarding distinction between content/proposal and materialized units. Here one application is materialized, but presented MFE architecture was not implemented. Unlike 076/084/096/106/109, no configured chain exists; unlike 097/103/104, no federation config even requires repair; unlike 089/100, no federation serves code sharing.
- **RQ1:** Architecture page and presentation make strong claims of remote, exposure and loading; inventory, builder and local imports are necessary to avoid confusing those claims with actual mechanisms.

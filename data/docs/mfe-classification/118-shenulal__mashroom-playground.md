---
schema: 1
id: 1102884192
full_name: shenulal/mashroom-playground
url: https://github.com/shenulal/mashroom-playground
commit: db50ff104c043d98305c40f006d6ed09bf431bb7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 118 — shenulal/mashroom-playground

## Context

Mashroom Server tutorial with five materialized example projects, a services/API project and a documentary final challenge. Educational purpose is explicit in `README.md:11–22`. Actually implemented pages are four independent demonstrations served by HTTP plugins; portal microfrontends described in guides are not implemented in snapshot.

Rank, ID and SHA checked in `data/samples/mfe-sample-001/clones.csv:119`, status `cloned`; HEAD matches front-matter SHA. Read-only inspection at commit, with `GIT_NO_LAZY_FETCH=1` in all clone Git commands. Dependencies were not installed, examples not run, network objects not fetched and submodules not traversed.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:119` records strategy `terminology` and eligibility `unknown`. Sample source is round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). Candidate appears in `data/discovery/mfe-round-001/candidates.csv:21423` and `data/discovery/mfe-round-002/candidates.csv:21429`, both with eligibility `unknown`, description “A comprehensive, beginner-to-advanced learning environment for Mashroom Server.”, empty topics, `fork: false`, creation at 2025-11-24T06:57:50Z and push at 2025-11-24T07:00:00Z.

Read-only query by ID 1102884192 of tables `hits`, `queries` and `subqueries` in `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite` identified following hits:

| Query | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-11` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T19:17:25.775Z / 2026-10-08T15:40:03.503Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-11` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T22:09:45.099Z / 2026-10-08T15:48:26.230Z |

Hits supply no line, with empty `path`. By elimination, name and description lack searched spellings and no topics exist; README is compatible with retrieval: `README.md:132` contains “Microfrontend container”, `README.md:133` contains “External microfrontends”, `README.md:156` mentions “Portal app (microfrontend)” and `README.md:256` contains “Microfrontends”. No matched line absent from API records is attributed to it. README was introduced in sole commit, at 2025-11-24T06:59:35Z, before October 2026 searches; it is not later than them. Repository name was not used as architectural evidence.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` at the SHA: 54 regular files `100644` (26 JSON, 16 Markdown, 12 JavaScript), zero symlinks and zero gitlinks. Only examples 01–05 exist; examples 06–14 and promised frontend folders are absent from tree. No `node_modules`, lockfile or explicit bundler configuration. | context |
| Source code (actual targets) | Four plugins return HTML pages: `examples/01-basic-architecture/plugins/hello-world-plugin/dist/index.js:15–24`; `examples/02-mashroom-config/plugins/config-demo-plugin/dist/index.js:7–16`; `examples/03-plugin-types/plugins/2-web-app-plugin/dist/index.js:19–27`; `examples/05-dependency-injection/plugins/calculator-api/dist/index.js:22–30`. These are actual handlers, not Markdown snippets. Each page belongs to a separate example. | contrary |
| Configuration (example separation) | Each server points to its local plugin folder and homepage: `examples/01-basic-architecture/mashroom.json:2–5` (`/hello`), `examples/02-mashroom-config/mashroom.json:2–5` (`/config`), `examples/03-plugin-types/mashroom.json:2–5` (`/api`) and `examples/05-dependency-injection/mashroom.json:2–5` (`/calculator`). No root loads all four pages as units of one application. | contrary |
| Configuration / Source code (contracts) | All 26 JSON files were read and parsed: 12 plugin descriptors, including 6 `services`, 5 `web-app` and 1 `middleware`; none `portal-app`. All 12 `bootstrap` paths exist in tree. For example, `examples/03-plugin-types/plugins/2-web-app-plugin/package.json:8–14` points to HTTP handler, and `examples/05-dependency-injection/plugins/calculator-api/package.json:7–13` registers API and service dependencies. Resolving those paths does not turn server plugins into microfrontends. | contrary |
| Configuration / Build/deploy | `complete-project/package.json:5–11` declares server command and Mashroom, portal and theme packages. `complete-project/mashroom.json:4–12` searches local and platform plugins, with index `/portal`. No page/layout has own-unit instances or a configured remote URL. External Mashroom platform is not counted as own unit. | weak |
| Source code (complete project) | `complete-project/plugins/3-task-api/package.json:8–13` registers `web-app` at `/api/tasks`; `complete-project/plugins/3-task-api/dist/index.js:16–31` implements parsing and JSON responses. Inventory contains only logger, task service and task API in this project. The two UIs drawn in `complete-project/README.md:44–48` and listed in `complete-project/README.md:75–88` have no corresponding files. | contrary |
| Documentation (architecture) | `MASHROOM-LEARNING-GUIDE.md:355–385` explains portal and points to absent `examples/09-portal-basics/`. `MASHROOM-LEARNING-GUIDE.md:389–412` displays a `portal-app` object with URL `https://cdn.example.com/widget.js` and points to also-absent example 10. `MASHROOM-LEARNING-GUIDE.md:428–440` shows message-bus publish/subscribe as educational content. None of these snippets is versioned executable configuration or code of applications. | weak |
| Documentation (challenge) | `final-project/README.md:9–24` requests implementation of dashboard and widgets; `final-project/README.md:188–198` lists frontend tasks still as milestones. Only README exists in this directory. Diagram and challenge identify no implemented units. | context |
| Source code (boundaries) | Active literal search `git grep -n -F -e '../../' -e '../../../'` in all `*.js` at the SHA: no occurrence. Search for `require(` and `import ` in JavaScript/JSON finds only `require('express')` in `complete-project/plugins/3-task-api/dist/index.js:19`. Service injection in `examples/05-dependency-injection/plugins/calculator-api/dist/index.js:8–17` is backend, not UI import/composition. Absence of cross-imports does not prove Q2 without composed units having their own entries/builds. | context |
| Technology / Configuration / Composition | Search for `portal-app`, `remoteEntry`, `ModuleFederation`, `registerApplication`, `iframe` and `postMessage` in all JSON/JS: no occurrence. No remotes/exposes/consumption chain exists in those artifacts. Additional JSON search for `mashroom-portal`, `remoteApps`, `task-list`, `task-stats`, `render` and `bootstrap` finds portal dependencies and server bootstraps, without promised frontend targets. | absent |

## Authorship and history

Metadata from `git rev-list` confirm **1 commit, 0 merges and 1 root commit**, the evaluated SHA itself; clone is not shallow. Author and committer: `Shenulal HP`, date 2025-11-24T10:59:35+04:00 (2025-11-24T06:59:35Z), message `first commit`. `git log --no-renames --name-status` for `examples`, `complete-project` and `final-project` shows all those files bulk-added in the same commit. This demonstrates joint introduction, but does not establish that owner originally wrote each file or identify a third-party import; no development sequence is available. Platform is explicitly external (`README.md:246–248`), and was not attributed to owner. Historical blobs were unnecessary and no object was missing.

Local references for record only: `main`, `origin/main` and `origin/HEAD` point to pinned SHA. No other-branch content was incorporated. Relevant architectural documentation appears in guides and complete-project README, cited above; no separate ADR appears in inventory.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Four pages of examples 01/02/03/05 have no composition relationship. Task UIs are only described (`complete-project/README.md:75–88`), and remote is an educational snippet (`MASHROOM-LEARNING-GUIDE.md:400–412`), without materialized configuration. |
| Q2 | No | No units of a composed application with their own entries/builds exist to evaluate. Commands start servers (`examples/01-basic-architecture/package.json:5–10`; `complete-project/package.json:5–11`); server bootstraps and absence of cross-imports do not meet literal criterion. |
| Q3 | No | Examples have separate local configurations; complete project points to platform portal (`complete-project/mashroom.json:4–12`) without registering pages mounting own units. |
| Q4 | No | No configured mechanism actually connects frontend units. Portal dependency (`complete-project/package.json:9–11`) and documentary snippets (`MASHROOM-LEARNING-GUIDE.md:400–435`) do not prove connection. |
| Q5 | No | Q1–Q4 converge: independent HTTP examples and MFE documentation without an implemented composed frontend application. |

## Rationale

- `Non-MFE`: examples without explicit composition and educational microfrontends mentions. Tutorial status does not exclude it: implemented examples actually composing units can satisfy checklist; here the described portal applications themselves are missing.
- `frontend_units: 0` and `unit_organization: none`: four HTML pages of examples 01, 02, 03 and 05 are Express handler responses (Mashroom server `web-app` plugins, `expressApp: (app) => app.get('/', … res.send(`<!DOCTYPE html>…`))`), without client code, own HTML/JS entry, UI manifest or frontend build. Two call themselves APIs (`Time API`, `Calculator API`). They are not counted as frontend units, as in 100 (Express API serving static files) and 116 (backend). This excludes services, middleware, Mashroom server, snippets and announced but absent widgets.
- `repo_type: example` follows educational purpose and structure (`README.md:13–22`). Neither UI libraries/frameworks in own targets nor explicit bundler configuration are observed; `ui_technologies` and `build_tools` remain empty. Mashroom is a server platform, not evidence of a specific own UI.
- This is not `MFE-unit`: no existing frontend target exports an external-host integration contract. Present plugin descriptors concern services, HTTP or middleware. Thus Q2–Q4 are No, without an exception for a prepared external unit.
- No open question concerns composition through links, iframes or build time: none of those relationships is implemented between units. Judging imperfections of an existing chain is unnecessary, since MFE content never left guides.

## Analysis notes

- **Protocol (families):** search across all annotations for `mashroom` and `shenulal` found no previously annotated sibling. Observed technological family is Mashroom, identified through manifests and guides. Comparison with final 028: multiple unrelated targets keep Q1=No; comparison with 023/075/081/094/105: content or merely proposed applications do not count as implementation.
- **Checklist:** platform-plugin rule in final 037 is compatible with not attributing Mashroom host to owner, but here no own prepared remote/portal-app even requires that exception. Unlike 076/084/096/106/109, no configured frontend chain exists; unlike 089/100, no active federation serves code sharing. Case does not depend on deciding composition versus sharing or tolerating connection errors as in 097/103/104.
- **RQ1:** README promises 14 examples (`README.md:111–142`) and task UIs (`README.md:154–158`), whereas inventory materializes only 01–05 and complete-project backend. Documentation and isolated dependencies would overestimate implemented state.
- **Independent-review contribution / resolved disagreement:** Prisma recommended `frontend_units: 0` / `none` instead of 4 / `monorepo` (Lupa draft), with class unchanged. Verified at commit that handlers return HTML through template strings in Express routes, without client UI; adopted 0 / `none`. Alternative recorded for researcher: counting server-rendered pages as frontend targets would require a uniform convention (for example, also for 082), not yet defined.

---
schema: 1
id: 1139783096
full_name: Shashank3778/striverra
url: https://github.com/Shashank3778/striverra
commit: 86b6abfe7a59da0d7ff57c936e0564c67770f79a
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 218 — Shashank3778/striverra

## Context

Copy, with complete history, of Open edX package `@edx/frontend-component-header` (`package.json:2–5`, `23–32`): “A generic header for Open edX micro-frontend applications” (`README.rst:11`). React component library (desktop, mobile and learning headers), published on npm and installed as dependency by platform MFEs: “run the following command in your MFE: npm i --save @edx/frontend-component-header” (`README.rst:59–61`).

Extension points are `PluginSlot` from `@openedx/frontend-plugin-framework` (for example `src/plugin-slots/DesktopHeaderSlot/index.jsx:1–19`). From 2025-11-04 onward, owner added own theme (“striverra theme header”) and versioned `dist/`. Snapshot is default branch `headermfe`. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:219` records rank 218, ID 1139783096, status `cloned`, branch `headermfe` and front-matter commit, which is clone HEAD and `origin/headermfe`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:219` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:23764` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:23771` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories`, with subquery `…#created:2026-01` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:29:52.087Z / 2026-10-08T15:57:22.004Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:26.116Z / 2026-10-08T16:07:42.103Z |

Effective queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Hit metadata:
- null description, no topics, JavaScript language, `fork: false`, size 10.177;
- creation at 2026-01-22T12:10:21Z, push at 2026-01-22T12:53:04Z.

README spellings:
- “micro-frontend”: `README.rst:11` (“A generic header for Open edX micro-frontend applications”), also in `36`, `59`, `77` and `97`;
- “micro-frontends”: `README.rst:53` (“intended to be used in micro-frontends like frontend-app-authentication”).

Phrase search treats hyphen as separator.

Last change to `README.rst` is `02533b0` (2025-07-04, upstream), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 361 entries, 360 regular files `100644` and 1 executable `100755` (`public/index.html`); zero symlinks and zero gitlinks. `src/` has 142 entries (components and `plugin-slots/`), and `dist/` 191 (owner-versioned build); also `example/`, `public/`, `webpack.dev.config.js`, `Makefile` and upstream workflows. | context |
| Configuration | `package.json:2–5`: `"name": "@edx/frontend-component-header"`, `"main": "dist/index.js"`, `files: ["/dist"]` (`:20–22`); `peerDependencies` for `@edx/frontend-platform`, `@openedx/paragon`, `react`, `react-router-dom` (`:66–73`). Npm package consumed by MFEs, not own deployable unit. No `ModuleFederationPlugin`, `remotes`, `registerApplication` or import map. | contrary |
| Documentation | `README.rst:11`, `36`, `59–61`, `97`: component is installed/imported by Open edX MFEs, integrating it at build time. | contrary |
| Source code | `src/plugin-slots/DesktopHeaderSlot/index.jsx:1–19`: `PluginSlot` with ID `org.openedx.frontend.layout.header_desktop.v1`, allowing platform to replace or extend header. Plugin composition is performed by Open edX platform, not this repository. | context |
| Search | `git grep -i` for `micro.?front`, `mfe` and `federation` in `README.rst`, `package.json`, `catalog-info.yaml` and `.env.development`: only documentation text (`README.rst`; `catalog-info.yaml:8`). | absent |

## Authorship and history

Non-shallow clone; 642 commits, 63 merges.
- **Upstream:** root is `afe6705` (2019-09-13, Adam Butterworth, “fix: initial commit”). Most history is Open edX and bots: `renovate[bot]` 250, Renovate Bot 85, edX/2U maintainers and others.
- **Owner:** `Shashank3778 <anku3778@gmail.com>` has 44 commits, from `477de4a` (2025-11-04, “striverra theme header first commit changed the design”) to SHA `86b6abf` (2026-01-22, “headermfe”). Theme, tab, user-menu and `dist/` adjustments.

Repository is marked `fork: false`, but history belongs to upstream project. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Repository is a component library, not frontend unit; no configuration references other units. |
| Q2 | No | Without composed frontend units, no independence requires evaluation. Package integrates into MFEs as npm dependency. |
| Q3 | No | No host, shell or root configuration in repository; platform MFEs mount header. |
| Q4 | No | No configured composition mechanism; `PluginSlot` are extension points consumed by third-party plugin framework. |
| Q5 | No | Q1–Q4 are No: shared component of an MFE ecosystem, without own composition. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “MFE frameworks and libraries” and, by analogy, “component libraries”: UI piece shared by Open edX MFEs, distributed through npm.
- Hosting ecosystem is third-party (Open edX), as in 102/074/080, but repository here is not even a unit of that ecosystem; it is library, as 015 and draft 165.
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: [react]`. `build_tools: []`, since build is encapsulated in `fedx-scripts`/`Makefile` (`package.json:10–18`), without own bundler configuration beyond dev server.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** Open edX header-library README for “micro-frontend applications” matches terminology queries; branch `headermfe` reinforces label.
- **Protocol (sample):** upstream project copy (`fork: false`) with 642 commits, 44 by owner; snapshot is default branch `headermfe`.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

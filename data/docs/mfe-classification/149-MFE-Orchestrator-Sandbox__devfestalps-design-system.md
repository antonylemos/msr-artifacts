---
schema: 1
id: 1101963462
full_name: MFE-Orchestrator-Sandbox/devfestalps-design-system
url: https://github.com/MFE-Orchestrator-Sandbox/devfestalps-design-system
commit: fec8551c39a17b7a53ca6bfc9613b79e64f9bf53
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
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

# 149 — MFE-Orchestrator-Sandbox/devfestalps-design-system

## Context

Vite + React remote generated from “template-vite-remote”, described as “Template for MFE orchestator Vite remote microfrontend” (`README.md:1–2`). It exposes one component through Module Federation, `./Button` (`vite.config.js:9–16`). Workflow publishes `dist` to external “MFE Orchestrator” platform, with slug `devfestalps-design-system` (`.github/workflows/build-and-deploy.yml:63–70`). Host that would consume remote is absent from repository. Repository and owner names are not used as evidence.

`data/samples/mfe-sample-001/clones.csv:150` records rank 149, ID 1101963462, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:150` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:21371` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:21377` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-11` | 2026-10-07T19:17:25.775Z / 2026-10-08T15:40:03.503Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-11` | 2026-10-07T22:09:51.233Z / 2026-10-08T15:48:26.230Z |

Effective queries append `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Hit metadata:
- null description, no topics, CSS language, `fork: false`, size 78;
- creation at 2025-11-22T15:10:11Z and push at 2026-02-16T22:17:36Z, latter from Dependabot branches.

Without description, retrieval comes from README, whose sole spelling is singular “microfrontend”, in `README.md:2`. Plural form “microfrontends” appears in neither README nor description. This hit depends on unrecorded GitHub search text processing, as in 143.

README comes from root `c4148d8` (2025-11-22) and was unchanged afterward. It predates October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 17 entries, all regular files `100644`; zero symlinks and zero gitlinks. One Vite project at root (`package.json`, `vite.config.js`, `index.html`, `src/`, `public/`, `pnpm-lock.yaml`) and workflows in `.github/`. No host or second application. | context |
| Configuration (federation) | `vite.config.js:9–16`: `federation({ name: "remote_app", filename: "remoteEntry.js", exposes: { './Button': './src/components/Button' }, shared: ['react','react-dom'] })`. No `remotes`. `vite.config.js:18–23`: `modulePreload: false`, `target: 'esnext'` and `cssCodeSplit: false`, usual remote adjustments for this plugin. | moderate |
| Source code (exposed module) | `src/components/Button.jsx:6–20`: component `Button` with local counter state and label “DevFest Alps II {state}”, named and default-exported. `src/main.jsx:6–10` and `src/App.jsx:5`, `22`: standalone demo app rendering own `Button`. | moderate |
| Source code (boundaries) | Imports in `src` are all internal (`./App`, `./components/Button`, `./Button.css`, `./assets/react.svg`). Search for `../`, `remotes`, `registerApplication`, `customElements` and `iframe` in `src`, `vite.config.js` and `index.html` returns nothing. | context |
| Build/deploy | `package.json:6–9`: `vite`/`vite build`. `.github/workflows/build-and-deploy.yml:3–13`: workflow triggers on tags or manually. `.github/workflows/build-and-deploy.yml:60–70`: runs `pnpm build` and calls `mfe-orchestrator-hub/github-action@0.0.29` with `microfrontend-slug: devfestalps-design-system`, `domain: https://console.mfe-orchestrator.dev` and `file-path: './dist'`. Tag `1.3.0` exists at SHA. Caches cite `host/node_modules` and `remote/node_modules` (`:48–51`), nonexistent repository directories inherited from template. | moderate |
| Technology | `package.json:10–20`: `react`/`react-dom` ^19.2.0, `@originjs/vite-plugin-federation` ^1.4.1, `@vitejs/plugin-react` and `vite` ^7.1.12. `pnpm-lock.yaml:291`, `548` and `578` resolve `@originjs/vite-plugin-federation` 1.4.1, `react` 19.2.0 and `vite` 7.1.12. | context |

## Authorship and history

Non-shallow clone; 7 commits across all refs, no merge.
- **Root:** `c4148d8` (2025-11-22T15:10:13Z, “Initial commit”) by `MFE Orchestrator Bot <bot@mfe-orchestrator.dev>` adds 17 files. `LICENSE:3` contains “Copyright (c) 2025 MFE Orchestrator Hub”.
- **Human author:** Lorenzo De Francesco `<lorenzo.defrancesco@step4business.com>` makes `bbddfc5` (“first commit”) and SHA `fec8551` (“DEV FEST ALPS 2”). Both only change `src/components/Button.jsx` (`git log --no-renames --name-status`).
- **Dependabot:** `49d14d8` is in `main` history. Later bumps (`270b9c1`, `8fc3dd7`, `9f3b90e`) are on branches `origin/dependabot/*` and were not considered.

Configuration, workflow and app all come from bot-generated commit; original contribution is limited to button content. Historical diff of `Button.jsx` was not read: blob `9f6ea764…` is absent from partial clone and was not fetched. Clone remained unchanged.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One unit. Composition configuration has only `exposes` (`vite.config.js:12–14`) and references no external units. |
| Q2 | Yes (for the unit) | Own entry and build generating `remoteEntry.js` (`vite.config.js:11`; `package.json:8`), published separately (`.github/workflows/build-and-deploy.yml:63–70`). |
| Q3 | Undetermined | Host is absent from repository. Target platform appears only as workflow publication target. |
| Q4 | Undetermined | Remote side is configured; consumer is not observable. |
| Q5 | No | Evidence shows a unit prepared for composition, not an MFE instance in repository. |

## Rationale

- Proposal `MFE-unit` with `status: review`. Q1 is No, but checklist exception applies literally: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- Same pattern as finals 050 (Vite + `@originjs/vite-plugin-federation`, one `exposes`, React `shared` and no `remotes`) and 001. Same checklist vector repeats.
- Review is needed because of what is exposed. In 001/050 exposed modules were widgets or application screens (`ChartWidget`, `TaskDashboard`). Here it is one generic `Button`, and checklist excludes “Module Federation used only for code sharing, not for composing frontend units”, as discussed in 089/100.
- There is also a third-party platform as destination (MFE Orchestrator), in line with 102/074/080 question, and platform-template-generated repository, in line with generator/template cases 075/081/094/105.
- `repo_type: template`: repository is instance of platform template (`README.md:1–2`; bot root commit), with event demonstration content (“DevFest Alps II”). `example` would also be defensible. `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`, `approaches: [module-federation]`.

## Analysis notes

- **RQ2:** Vite Module Federation remote published to a hosted MFE orchestrator (SaaS) through GitHub Action, with version from Git tag. Host and registry remain in platform, outside repository.
- **RQ1 (misleading signals):** “design system” character appears only in name; snapshot exposes a demonstration button. Name was not used as evidence.
- **Protocol (search):** plural hit `microfrontends` has no corresponding spelling in README or description. Eligibility changes from `unknown` (001) to `pass` (002).
- **Protocol (sample):** owner appears to host several repositories generated from same sandbox template. No other was queried.

## Point for joint review

Decide whether a remote whose sole exposed module is generic component (`./Button`), published to a third-party orchestration platform and generated from that platform’s template, counts as “frontend unit explicitly prepared to be composed”.

- **Accept:** configuration is identical to 050, and checklist sets no minimum exposed-module size. Remains `MFE-unit`.
- **Do not accept:** exposing an isolated UI component constitutes “Module Federation used only for code sharing”, as in uncertainty of 089/100. Class becomes `Non-MFE`, with `approaches: []`.

No new rule is proposed. Until decision, preserve `MFE-unit`/`review`.
- **Independent-review contribution (Lupa):** agreement with MFE-unit and `review`, with real interpretive caveat: distinction between remote unit and component sharing when sole export is a generic button (`./Button`). Closest comparable finals are 001 (export `ChartWidget`) and 050 (`TaskDashboard`), both with one remote unit, `exposes`, without repository host and checklist No/Yes/Undetermined/Undetermined/No, finalized as MFE-unit; here export’s functional boundary appears closer to code sharing, justifying no automatic precedent application. 089 and 100 (`Uncertain`/`review`) compare same question without resolving it. Q3 and Q4 Undetermined are inevitable with host/consumer outside snapshot. `repo_type: template` is defensible through automated origin and README, and `example` would also fit demo app configured for deployment; secondary choice without class effect.

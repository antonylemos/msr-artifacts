---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
url: https://github.com/irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 163 — irfanswr/react-microfrontend

## Context

Single-spa example with three sibling projects: `parent-app/` (root config with `single-spa-layout` and import map), `react-child-app/` (React application with `single-spa-react` lifecycles) and `vue-child-app/` (Vue 3 application with `single-spa-vue` lifecycles). The root config registers and routes both applications (`parent-app/src/frontenddevs-root-config.js:1–20`; `parent-app/src/microfrontend-layout.html:1–14`; `parent-app/src/index.ejs:15–42`). No root README. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:164` records rank 163, ID 1041883313, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:164` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:17899` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:17904` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-08` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T18:50:58.228Z / 2026-10-08T15:39:06.213Z |

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 273;
- created at 2025-08-21T06:42:22Z, pushed at 2025-08-21T06:43:14Z.

**Hit origin.** No README at the SHA root; the only README, `vue-child-app/README.md`, lacks the term, and description is null. By elimination, the hit comes from field `name`, containing “microfrontend”. This records provenance; the name is not used as classification evidence. The SHA (2025-08-21) is the only commit and precedes October 2026 collection.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 38 entries, all regular `100644` files; zero symlinks and zero gitlinks. Three projects with their own `package.json`, lockfile and build configuration: `parent-app/`, `react-child-app/` and `vue-child-app/`. No root workspace manifest. | context |
| Configuration (root config) | `parent-app/src/frontenddevs-root-config.js:9–20`: `constructRoutes(microfrontendLayout)`, `constructApplications({ loadApp: ({ name }) => import(name) })`, `registerApplication` for each application, `layoutEngine.activate()` and `start()`. `parent-app/src/microfrontend-layout.html:1–14`: default route with both applications, plus `/react-app` and `/vue-app`. | strong |
| Configuration (import map) | `parent-app/src/index.ejs:15–26`: shared dependency import map (React, react-dom, single-spa through CDN). `parent-app/src/index.ejs:32–42`: in local mode, `@frontenddevs/root-config` → `//localhost:9000/…`, `@frontenddevs/react-mfe` → `http://localhost:8081/frontenddevs-react-mfe.js` and `@frontenddevs/vue-child-app` → `http://localhost:8082/js/app.js`. `:30`: commented production import map. `:52–56`: root config loading after injector. | strong |
| Source code (units) | `react-child-app/src/frontenddevs-react-mfe.js:6–16`: `singleSpaReact` and exports `bootstrap`, `mount` and `unmount`. `vue-child-app/src/main.js:6–26`: `singleSpaVue` and exports lifecycles. | strong |
| Build | `parent-app/webpack.config.js:5–27` (`webpack-config-single-spa`, port 9000 in `package.json:4`). `react-child-app/webpack.config.js:4–15` (`webpack-config-single-spa-react`, port 8081 in `package.json:4`). `vue-child-app/package.json:6–9`, `24` (`vue-cli-service` with `vue-cli-plugin-single-spa`, port 8082). Each project has its own build. Import map path `/js/app.js` is compatible with Vue CLI output, but was not verified through a build. | moderate |
| Source code (boundaries) | Searching for `../` imports and requires across the SHA returns nothing. Imports stay inside each project (for example, `./root.component`, `./App.vue`, `./microfrontend-layout.html`). Units connect only through module names in the import map and layout. | context |

## Authorship and history

Non-shallow clone with a single commit, SHA `00ca0bf` (2025-08-21T13:41:59+07:00, “initial”), by `irfan <irfan@gmail.com>` as author and committer. No alternative branches: `master`, `origin/master` and `origin/HEAD` point to the same SHA. History cannot distinguish `create-single-spa` generated code from authored code, but names, ports and layout are project-specific. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units in the repository: root config and both applications, referenced by layout and import map (`microfrontend-layout.html:4–11`; `index.ejs:36–38`). |
| Q2 | Yes | Each unit has its own entry and build (`webpack.config.js` of each project; `vue-cli-service`) and no source code imports cross between them. |
| Q3 | Yes | Root config registers, routes and mounts both applications on the same page (`frontenddevs-root-config.js:9–20`; `microfrontend-layout.html:1–14`). |
| Q4 | Yes | Single-spa mechanism configured and connected: layout → `constructApplications` → `import(name)` resolved by import map → exported lifecycles (`frontenddevs-react-mfe.js:16`; `main.js:24–26`). |
| Q5 | Yes | Q1–Q4 are Yes: single-spa root config with two applications in different frameworks. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “single-spa root configuration together with its applications” and “examples… that actually compose frontend units”.
- The chain is complete in the snapshot, as in 076/084/096/106/109: root, layout, local import map and lifecycles in both applications. The commented production import map (`index.ejs:29–30`) does not prevent documented local-mode composition, the example's executable path.
- Not code sharing (089/100): units are applications mounted by route. Not a third-party platform (102/074/080) or content (023): executable composition code exists.
- `approaches: [single-spa]`, with import maps as resolution mechanism. `ui_technologies: [react, vue]`. `build_tools: [webpack]`: explicit webpack in root and React; Vue CLI encapsulates webpack. `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example`.
- No decision remains open.

## Analysis notes

- **RQ2:** single-spa with `single-spa-layout` (declarative HTML layout), `@single-spa/import-map-injector` and CDN-shared dependencies, with React and Vue 3 applications.
- **RQ3:** application contents are placeholders (“is mounted!” title, Vue HelloWorld). The repository demonstrates composition, rather than a domain.
- **Protocol (search):** entry only through query `microfrontend`, without root README or description; the hit comes from field `name`. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `single-spa`, `[react, vue]`, `webpack`, three units and `monorepo`; the host → single-spa layout → import map → two children with static lifecycles chain is resolvable, without an open decision (`draft`). Complete checklist citations: Q1 `parent-app/src/microfrontend-layout.html:3–12` and `parent-app/src/index.ejs:35–39`; Q2 `parent-app/package.json:2–11`, `react-child-app/package.json:2–8`, `vue-child-app/package.json:2–9`, `parent-app/webpack.config.js:5–27`, `react-child-app/webpack.config.js:4–15` and `vue-child-app/vue.config.js:1–4` (plugin in `vue-child-app/package.json:21–24`); Q3 `parent-app/src/frontenddevs-root-config.js:9–20` and `parent-app/src/microfrontend-layout.html:1–14`; Q4 `react-child-app/src/frontenddevs-react-mfe.js:6–16` and `vue-child-app/src/main.js:6–26`, with the complete chain in `parent-app/src/frontenddevs-root-config.js:9–20`, `parent-app/src/index.ejs:35–39` and layout `:3–12`; Q5 synthesizes the root/layout/import map/lifecycles chain. Negative `../` search and 38-file `git ls-tree` inventory are command records at the SHA, rather than file citations. Provenance comes from `hits` tables in `data/discovery/mfe-round-001/discovery.sqlite` and `mfe-round-002/discovery.sqlite`, filtered by `repository_id=1041883313`. History (one commit) does not distinguish `create-single-spa` generated code from authored code, and the Vue URL is treated as compatible, without claiming a build was executed.

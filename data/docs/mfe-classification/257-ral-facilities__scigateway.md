---
schema: 1
id: 175218500
full_name: ral-facilities/scigateway
url: https://github.com/ral-facilities/scigateway
commit: fadb600e1fa4c8a64daefbf8f2541998e559979c
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [single-spa]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 257 — ral-facilities/scigateway

## Context

SciGateway, “a ReactJs based parent application within a micro-front end architecture” (`README.md:5–7`), is the parent application of a plugin set providing access to data and compute at large scientific facilities. It is a React + Vite application with authentication, notifications, administration and help pages.

Plugins are not in this repository. They are declared in a runtime `settings.json` (`plugins` list with `name`, `src`, `enable`), loaded through `<script>` and registered in single-spa with a route activated by the plugin itself (`src/state/actions/loadMicroFrontends.tsx:7–85`). For e2e tests, the repository includes the demonstration plugin build (`server/e2e-plugin/main.js`), which the server README says is an artifact from another organization repository (`server/README.md`). Repository and organization names are not used as evidence.

`data/samples/mfe-sample-001/clones.csv:258` records rank 257, ID 175218500, status `cloned`, branch `develop` and the front matter commit, which is the HEAD of the clone and of `origin/develop`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:258` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:458` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:458` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, both from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `…#size:4000..5999` | `package.json` | 2026-10-07T22:21:12.074Z / 2026-10-08T16:03:41.991Z |
| `technology-single-spa-register-code`: `registerApplication singleSpa` | `…#size:2000..2999` | `src/state/actions/loadMicroFrontends.tsx` | 2026-10-07T22:42:13.781Z / 2026-10-08T16:20:51.190Z |

The files have 4.656 and 2.873 bytes at the SHA. `package.json:50` declares `"single-spa": "6.0.3"`, and `loadMicroFrontends.tsx:2`, `31` imports single-spa and calls `singleSpa.registerApplication`. Code hit metadata contains only the description, “SciGateway is the parent application for several plugins providing access to data and compute tools for large Science Facilities”. Entry is through code only.

In both rounds, the same organization has other candidates, including `ral-facilities/scigateway-demo-plugin`, `datagateway`, `operationsgateway` and `inventory-management-system` (`data/discovery/mfe-round-002/candidates.csv`). Only this one is in the sample (`sample.csv:258`); the others were not inspected.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 203 entries, 199 regular files `100644` and 4 executables `100755` (`.yarn/releases/yarn-4.16.0.cjs`, `docker/docker-entrypoint.sh` and two logo SVGs); zero symlinks and zero gitlinks. A single Vite application (`index.html`, `src/`, `vite.config.ts`), plus `server/` (test servers and e2e plugin), `micro-frontend-tools/`, `cypress/`, `docker/`, `demos/` and workflows. | context |
| Composition mechanism | `src/state/actions/loadMicroFrontends.tsx:7–17`: injects `<script src=url>`. `:19–23`: reads the plugin from `window[name]`. `:27–50`: `singleSpa.registerApplication(name, () => loadReactApp(name), activeWhen)`, with routes registered by the plugin (`singleSpaPluginRoutes`; `src/state/reducers/scigateway.reducer.tsx:140–144`). `:52–85`: loads all enabled plugins and reports failures. | strong |
| Configuration (referenced units) | `src/state/actions/scigateway.actions.tsx:361–365`: calls `loadMicroFrontends.init(settings.plugins)`. `public/settings.example.json:15–22`: `demo_plugin` at `http://localhost:5001/main.js`, `enable: false`. `server/e2e-settings.json:7–14`: the same `demo_plugin` at `/plugins/e2e-plugin/main.js`, `enable: true`, served by `server/e2e-test-server.js` (`/settings.json` and `/plugins/*`). Actual `settings.json` files remain outside Git (`.gitignore:34–35`). | strong |
| External unit | `server/e2e-plugin/main.js` (49.578 bytes): UMD bundle defining `demo_plugin` in the global and exposing `bootstrap`/`mount`/`unmount`. `server/README.md`: “simply the build artifacts from the demo plugin (https://github.com/ral-facilities/scigateway-demo-plugin)”, copied from that repository’s build. | strong |
| Tools | `micro-frontend-tools/serve-plugins.js:1–30` (settings location) and `:37–59` (plugin server startup) and `micro-frontend-tools/dev-plugin-settings.example.json:1–14` (the file is not at the root): development script to serve local plugin builds on their own ports. | moderate |
| Source code (boundaries) | The host knows plugins only by URL and global name; there is no plugin code import in `src/`. The e2e plugin is a compiled artifact, not source. | context |

## Authorship and history

Non-shallow clone; `HEAD` has 2.957 commits and 1.095 merges, since 2019-03-12 (`fcc61a6`, “Initial commit”). The largest authors are Louise Davies (855), dependency bots (renovate 329, dependabot-preview 315, dependabot 145), Joel Davies (276), Viktor Bozhinov (181) and Sam Glendenning (143). SHA `fadb600` (2026-10-07, Dependabot PR merge) is HEAD of `develop`, the default branch; there are another 62 remote branches, not considered. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` enumerates 5.996 missing historical objects; necessary current files were readable and no fetch was attempted.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | The host and an external unit referenced by the composition configuration (`demo_plugin` in `public/settings.example.json:15–22` and `server/e2e-settings.json:7–14`). |
| Q2 | Yes | The plugin is built and versioned in another repository and served separately; the host loads it only by URL. |
| Q3 | Yes | The host registers and activates plugins by route in single-spa (`loadMicroFrontends.tsx:31–49`). |
| Q4 | Yes | single-spa with `<script>` loading and registration through `registerApplication`, fed by the `plugins` list in `settings.json` and exercised by the e2e server. |
| Q5 | Yes | Q1–Q4 are Yes: parent application composing external plugins at runtime. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “repositories containing only the host, which references external remote units”, as in 087 (single-spa host with external remote loaded through script).
- Unit URLs come from a runtime configuration file, but unlike 145 (undefined variable), the snapshot has concrete configurations: the example with `demo_plugin` and the e2e configuration, enabling and serving the plugin. The organization maintains these plugins in its own repositories; this is not a third-party platform (102/074/080).
- `approaches: [single-spa]` (single-spa manages the lifecycle; loading uses UMD `<script>`). `ui_technologies: [react]`, `build_tools: [vite]`. `frontend_units: 2` (the host and referenced plugin), `unit_organization: multi-repo`. `repo_type: production`: institutional project with CI, Docker, Jenkins and changelog.
- There is no open decision.

## Analysis notes

- **RQ2:** React host reading the micro-frontends list from `settings.json` at runtime, loading UMD bundles through `<script>` and delegating route activation to single-spa, with plugins registering their own routes through events.
- **Protocol (sample):** other repositories in the same architecture (organization plugins) appear in the rounds, outside the sample.
- **Protocol (search):** entry only through code search. Eligibility changes from `unknown` (001) to `pass` (002). The default branch is `develop`.
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `single-spa`, React/Vite, two units in Q1’s operational sense, `multi-repo` and `production`; no open decision (`draft`). The host has a real consumer, enabled e2e configuration, remote bundle accessible in the tree (`server/e2e-plugin/main.js`, a one-line file assigning global `demo_plugin` and exporting `bootstrap`/`mount`/`unmount`; cite `:1`) and activation/mounting contract: the plugin dispatches `scigateway:api:register_route` events with routes `/plugin1`, `/plugin1/analysis` and `/plugin2`, the reducer stores them in `singleSpaPluginRoutes` and `activeWhen` compares `pathname` against prefixes. `scigateway.actions.tsx:361–365` loads `settings.plugins`, and `start` is called after loading (`:391/:401/:408`); the host loads React 18 and ReactDOM 18 UMD in `index.html`, completing the plugin’s global dependencies. Corrections: 5.996 missing objects; the path of `dev-plugin-settings.example.json`; and server location in `serve-plugins.js:37–59`. Nothing was executed (build, e2e, deploy).

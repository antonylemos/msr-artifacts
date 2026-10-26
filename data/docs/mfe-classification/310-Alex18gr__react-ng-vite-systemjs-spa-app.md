---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
url: https://github.com/Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [react, angular]
build_tools: [webpack, vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Context

Single-spa proof of concept with SystemJS and import maps (`README.md:1–2`): a root config (`root-config/`) registers three applications — React 17 with webpack (`react-app/`), Angular 12 (`angular-app/`) and React 19 with Vite (`react-vite-app/`) — sharing two custom utility modules at runtime (`common-lib-webpack/`, RxJS user state; `styleguide/`, React/MUI components). Also a scaffold Vue project (`vue-app/`) unrelated to root config. README declares POC derives from third-party example `nitinreddy3/react-ng-spa-app`, under MIT license (`README.md:2`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:311` records rank 310, ID 984418769, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:311` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:14010` (`terminology;technology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:14016` (`terminology;technology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same eight hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `repositories` | `…#created:2025-05` | empty |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `repositories` | `…#created:2025-05` | empty |
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `code` | `…#size:1000..1149` | `react-vite-app/package.json` |
| same | `code` | `…#size:1300..1449` | `angular-app/package.json` |
| same | `code` | `…#size:1450..1599` | `root-config/package.json` |
| same | `code` | `…#size:1800..1999` | `styleguide/package.json` |
| same | `code` | `…#size:2000..2249` | `react-app/package.json` |
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `repositories` | `…#created:2025-Q2` | empty |

Collection: round 001 between 2026-10-07T18:35:16.819Z and 2026-10-07T23:33:38.669Z; round 002 between 2026-10-08T15:38:07.285Z and 2026-10-08T16:20:59.766Z. Repository queries append `pushed:>=2025-04-01` and creation partition; code queries append `size` range.

Hit metadata: null description, no topics, language TypeScript, no license, `fork: false`, size 1268, created at 2025-05-15T22:46:06Z, pushed at 2025-05-15T22:56:13Z.

Textual match:
- “microfrontend”: `README.md:2` (“This is a microfrontend architecture poc…”); plural “microfrontends” does not appear literally, and that hit depends on GitHub search text processing, which is not recorded.
- “single-spa”: `README.md:1` (“# Single-spa app with React Angular Vite and SystemJS”).
- Five matched `package.json` contain `single-spa` (for example, `root-config/package.json:47`, `react-app/package.json:44`, `angular-app/package.json:25–26`, `react-vite-app/package.json:17`, `36`); `styleguide/package.json` was not opened beyond inventory and is not cited as evidence.

README's last change is SHA `1fe831d` itself (2025-05-16, “Readme improvements”), before collection on October 7 and 8, 2026; `package.json` files come from root `8a9367e` (2025-05-16). No SHA artifact postdates searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 161 entries, all regular `100644` files; zero symlinks and zero gitlinks. Seven projects with their own `package.json`: `root-config`, `react-app`, `angular-app`, `react-vite-app`, `common-lib-webpack`, `styleguide`, `vue-app`. | strong |
| Configuration (root) | `root-config/src/org1-root-config.ts:3–19`: `registerApplication` of `@org1/react-app` (`/react`), `angular-app` (`/angular`) and `react-vite-app` (`/react-vite`), each through `System.import`; `:21–23`: `start`. `root-config/src/index.ejs:62–84`: local SystemJS import map with `@org1/react-app` → `//localhost:8080/org1-react-app.js`, `angular-app` → `//localhost:4200/main.js`, `react-vite-app` → `//localhost:3001/spa.js`, `styleguide` → `//localhost:3002/styleguide.system.js`, `@paok/common-lib-webpack` → `//localhost:9001/index.js`, with `scopes` giving React 16 to `react-app` and React 19 to `react-vite-app`; `:102–136`: registers shared dependencies in SystemJS and imports root config; `:177–195`: navigation bar with `singleSpaNavigate`. `root-config/package.json:4`: port 9000. | strong |
| Configuration / Source code (react-app) | `react-app/webpack.config.js:5–10`: preset `webpack-config-single-spa-react-ts` with `orgName: "org1"`, `projectName: "react-app"` (generates `org1-react-app.js`); `:13–16`: `externals` for `@paok/common-lib-webpack` and `styleguide`. `react-app/src/org1-react-app.tsx:6–16`: `singleSpaReact` and export of `bootstrap`, `mount`, `unmount`. Port 8080 is undeclared in repository (`react-app/package.json:4`, `webpack serve`); corresponds to preset default, unverified without installation. | strong |
| Configuration / Source code (angular-app) | `angular-app/angular.json:21–36`: builder `@angular-builders/custom-webpack`, `main: src/main.single-spa.ts`, `libraryName: angular-app`, `libraryTarget: umd`, `deployUrl: http://localhost:4200/`. `angular-app/package.json:11`: `ng s … --port 4200`. `angular-app/src/main.single-spa.ts:20–31`, `112–114`: `singleSpaAngular` and exported lifecycles (with attribute-based style control). | strong |
| Configuration / Source code (react-vite-app) | `react-vite-app/vite.config.ts:14–33`: output `format: "system"` with React and shared libs as `external`; `:37–41`: `vite-plugin-single-spa` with `type: "mife"`, `serverPort: 3001`, `spaEntryPoints: ["src/spa.tsx"]`. `react-vite-app/src/spa.tsx:8–15`, `99–101`: `singleSpaReact` and lifecycles with CSS. `react-vite-app/package.json:11`: `dev:single-spa` with watch build and preview. | strong |
| Source code (utility modules) | `common-lib-webpack/webpack.config.js:34–35`, `49–55`: `index.js` in `system` format, port 9001; `common-lib-webpack/src/user-state.ts:3–19`: user state in `BehaviorSubject`. `styleguide/vite.config.ts:19–41`: `system` format library, preview on port 3002. Consumed at runtime: `react-app/src/App.tsx:2`, `react-vite-app/src/App.tsx:5–6`, `angular-app/src/app/app.component.ts:3`, `15–18`, all marked as build externals. | moderate |
| Source code (boundaries) | Search for all `../` in `*.ts`, `*.tsx`, `*.js`, `*.vue`, `*.json`, `*.ejs` and `*.html` (except lockfiles): no source code imports between applications. Only cross-folder references are dependencies `file:../common-lib-webpack` and `file:../styleguide` in `react-app/package.json:56`, `65`, `angular-app/package.json:23` and `react-vite-app/package.json:14`, `18`, for two utility modules, externalized by builds (`react-app/webpack.config.js:13–16`; `angular-app/extra-webpack.config.js:7–10`; `react-vite-app/vite.config.ts:17–23`) and resolved by root config's import map. | strong |
| Structure (outside composition) | `vue-app/package.json:5–9` and `vue-app/src/main.ts:7–11`: Vue 3 scaffold mounting independently in `#app`; absent from root config and import map. | context |
| Documentation | `README.md:12–34`: how to start each application and root at `localhost:9000`, with routes `/react` and `/angular`; does not describe `react-vite`, `styleguide` or `common-lib-webpack`. | moderate |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 2 commits (2 across all refs), no merges, author and committer `alexc <alexchih02@gmail.com>`: root `8a9367e` (2025-05-16, “initial commit”) adds all projects together; SHA `1fe831d` (“Readme improvements”) changes only `README.md`. README declares derivation from `nitinreddy3/react-ng-spa-app` (MIT) (`README.md:2`); as history starts with everything ready, metadata cannot separate what came from original example and what was added (for example, `react-vite-app`, `styleguide`, `common-lib-webpack`, absent from execution documentation). `git rev-list --objects $SHA --missing=print` identifies 1 missing historical object; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `root-config` and three registered applications (`react-app`, `angular-app`, `react-vite-app`), referenced by composition configuration (`root-config/src/org1-root-config.ts:3–19`; `index.ejs:62–84`). |
| Q2 | Yes | Each application has its own entry and build (webpack preset, Angular CLI with custom-webpack, Vite) and port; no source code imports between them, only runtime consumption of externalized utility modules. |
| Q3 | Yes | Root config registers, routes (`activeWhen`) and loads all three applications, with `singleSpaNavigate` navigation (`index.ejs:177–195`). |
| Q4 | Yes | single-spa configured on both sides: `registerApplication` + SystemJS import map with URLs coherent with generated bundles (`org1-react-app.js`, `main.js` at `deployUrl` 4200, `spa.js` at `serverPort` 3001), and exported lifecycles in each application. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- Q1–Q5 are Yes, satisfying the `MFE-implemented` rule. Matches “single-spa root configuration together with its applications” and “examples… that actually compose frontend units” (`repo_type: example`, “poc”, `README.md:2`).
- Chain is complete and coherent for three applications, comparable to complete-chain cases (076/084/096/106/109) and final 058 (single-spa lifecycles with SystemJS bundle), here with root config present.
- Modules `common-lib-webpack` and `styleguide` are runtime shared dependencies (utility modules), rather than composed units; their use does not make code sharing the sole mechanism (089/100), because applications are route-mounted by root config.
- Declared third-party example origin (`README.md:2`) does not make composition external to repository, unlike 102/074/080: root config, applications and import map are in snapshot.
- `frontend_units: 4` counts root config and three registered applications; excludes two utility modules and `vue-app`, without composition relationship (as in reading of 193 for unrelated demos). `approaches: [single-spa]`, `ui_technologies: [react, angular]`, `build_tools: [webpack, vite]`, `unit_organization: monorepo`.
- No open decision changes class.

## Analysis notes

- **RQ2:** single-spa with SystemJS import map and `scopes` for React 16 (UMD) and React 19 (ESM through `esm.sh`) coexistence on same page (`root-config/src/index.ejs:35–48`, `73–82`, `102–134`); Vite application integrated through `vite-plugin-single-spa` (`type: "mife"`); two utility modules shared through import map.
- **RQ3:** cross-framework shared application state through a `BehaviorSubject` in a SystemJS module (`common-lib-webpack/src/user-state.ts:3–19`), consumed by React and Angular.
- **RQ1:** `react-app` port 8080 is not written in repository; coherence with import map depends on `webpack-config-single-spa` preset default, unverified without installation.
- **Protocol (third parties):** declared derivation from `nitinreddy3/react-ng-spa-app` (`README.md:2`); same account has `Alex18gr/microfrontends-in-action-demos` and `Alex18gr/Alex18gr` in rounds (`data/discovery/mfe-round-002/candidates.csv:19652`, `15427`), outside this snapshot.
- **Unit count:** also counting `vue-app`, `styleguide` and `common-lib-webpack` as identifiable frontend projects would yield 7; class does not change.

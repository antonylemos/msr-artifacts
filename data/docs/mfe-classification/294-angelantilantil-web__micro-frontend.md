---
schema: 1
id: 1228275100
full_name: angelantilantil-web/micro-frontend
url: https://github.com/angelantilantil-web/micro-frontend
commit: a5b4cae18e6c3266d737894bba07c24b0959805b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 11
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 294 — angelantilantil-web/micro-frontend

## Context

Demonstration banking dashboard (“This project is for demonstration purposes”, `README.md:203`) with shell `host-app` and ten remote modules, each in its own folder with its own `package.json`, `webpack.config.js` and `src/`, all with Webpack Module Federation. Host consumes seven remotes by route; three modules (`accounts-module`, `cards-module`, `loans-module`) are prepared as remotes, but host does not reference them. Also a Python backend (`ai-agent-backend/`) used by chat module and an uninspected `openapi-mcp-server.zip`. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:295` records rank 294, ID 1228275100, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution, network access or `.zip` extraction occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:295` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:29472` (`terminology;technology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:29478` (`terminology;technology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same four hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `code` | `…#size:2000..2249` | `host-app/webpack.config.js` | 2026-10-07T22:34:13.455Z / 2026-10-08T16:14:00.863Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `repositories` | `…#created:2026-05` | empty | 2026-10-07T22:35:41.883Z / 2026-10-08T15:59:28.928Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `repositories` | `…#created:2026-05` | empty | 2026-10-07T23:04:12.402Z / 2026-10-08T16:09:04.849Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` | `…#created:2026-05` | empty | 2026-10-07T23:26:24.296Z / 2026-10-08T16:18:08.915Z |

Repository queries append `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`; code query appends `size:2000..2249`.

Hit metadata: null description, no topics, language JavaScript, no license, `fork: false`, size 4620, created at 2026-05-03T20:26:09Z, pushed at 2026-07-10T07:04:40Z.

Textual match:
- Code hit file has 2198 bytes at the SHA, within the range, and contains `ModuleFederationPlugin` (`host-app/webpack.config.js:2`, `44`) and `remotes` (`:47`).
- “micro frontend”: `README.md:1` (“Micro Frontend Project”); hyphenated form occurs at `README.md:3`, `21` and `132`.
- “module federation”: `README.md:21`, `134` and `156`.
- Plural “micro frontends” does not appear literally in README; that hit depends on GitHub search text processing, which is not recorded.

Last reachable README change is `fd2169b` (2026-05-25), and `host-app/webpack.config.js`'s is `a1d2264` (2026-05-25). Both precede collection on October 7 and 8, 2026; SHA artifacts do not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 128 entries, all regular `100644` files; zero symlinks and zero gitlinks; no `node_modules` or `dist`. Eleven frontend projects with their own `package.json`, `webpack.config.js`, `src/index.html`, `src/index.js` and `src/App.js`: `host-app` and remotes `business-reports`, `model-portfolio-configuration`, `outgoing-api-logs`, `incoming-api-logs`, `maker-requests`, `vro-uploads`, `ai-agent-module`, `accounts-module`, `cards-module` and `loans-module`. Six files in `ai-agent-backend/models/` are Git LFS pointers (`.gitattributes:1`). | strong |
| Configuration (host) | `host-app/webpack.config.js:44–68`: `ModuleFederationPlugin` with `name: 'hdfcHostApp'` and seven `remotes`: `businessReports@…:3010`, `modelPortfolio@…:3011`, `outgoingApiLogs@…:3012`, `incomingApiLogs@…:3013`, `makerRequests@…:3014`, `vroUploads@…:3015` and `aiAgent@…:3016`, all `/remoteEntry.js` (`:47–55`); singleton and `eager` react/react-dom `shared` (`:56–67`). | strong |
| Configuration (remotes) | Each of seven referenced remotes declares the `name`, port and exposed module consumed by host, for example `business-reports/webpack.config.js:15`, `44–49` (`port: 3010`, `name: 'businessReports'`, `exposes: { './BusinessReportsApp': './src/App.js' }`). Equivalent configurations are at the same lines in `model-portfolio-configuration` (3011, `./ModelPortfolioApp`), `outgoing-api-logs` (3012), `incoming-api-logs` (3013), `maker-requests` (3014), `vro-uploads` (3015) and `ai-agent-module` (3016, `./AIAgentApp`). `package.json` files repeat port in `start` script. | strong |
| Source code (composition) | `host-app/src/App.js:30–57`: seven `React.lazy(() => import('<remote>/<Módulo>'))` with same remote/exposed-module pairs (original placeholder means module); `:230–240`: routes `/business-reports`, `/model-portfolio`, `/outgoing-api`, `/incoming-api`, `/maker-requests`, `/vro-uploads` and `/ai-agent` within `ModuleErrorBoundary` + `Suspense`; `:212–221`: sidebar navigation through `Link`. `/http-access-logs` is host's own placeholder (`:235`). | strong |
| Source code (shared state) | `host-app/src/App.js:5–27`: event bus published in `window.EventBus`. Only three unreferenced remotes read it (`accounts-module/src/App.js:5`, `38–46`; same in `cards-module` and `loans-module`), calling `getAccounts`/`getCards`/`getLoans`, which host does not define. | context |
| Source code (content) | `business-reports/src/App.js:4–11`, `maker-requests/src/App.js:4–11` and `model-portfolio-configuration/src/App.js:4–11` only render “… module content will appear here.”; other referenced remotes have their own screens (for example, `ai-agent-module/src/App.js:87` calls backend at `localhost:8000`). | context |
| Source code (boundaries) | Search for all `import`/`require` in `*.js` (except configs) and `../` in JS, CSS, HTML and JSON: each unit imports only `react`, `react-dom/client`, `react-router-dom` (host), `./App` and `./styles.css`; no `../` at all. Host reaches remotes only through federated specifiers (`App.js:30–54`). | strong |
| Build/deploy | Per-unit `start`/`build` scripts (`host-app/package.json:4–6`, `business-reports/package.json`); `start-all-modules.bat:4–12` starts host, six remotes, Python backend and AI module in separate terminals. All configs use `mode: 'development'` and `localhost` URLs (`host-app/webpack.config.js:7`, `48–54`); no pipeline or deployment. | moderate |
| Documentation | `README.md:3`, `21–30`: host shell and “independent remote modules” through Module Federation; `DOCUMENTATION.md:7–16` also lists `accounts-module`, `cards-module` and `loans-module`, absent from host config. | moderate |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 12 commits reachable from the SHA (13 across all refs; `origin/dev` at `6bf6396` not considered), 1 merge. Metadata authorship: two identities, `angelantilantil-web <angelantil.antil@gmail.com>` (6 commits, all through web interface, GitHub committer) and placeholder `Your Name <your-email@example.com>` (6 local commits), which does not identify author; not attributed to a person. According to `git diff-tree --no-renames --name-status`:
- root `c7a7aa3` (2026-05-03, “Initial commit: HDFC micro-frontend project with host-app and remote modules”) adds host and ten remotes, README and `.bat` at once;
- `a1d2264` (2026-05-25) adds `ai-agent-module` and `ai-agent-backend` and changes host, README and `.bat`;
- 2026-05-27 commits configure backend LFS; 2026-07-09/10 commits, including SHA, only add and remove `openapi-mcp-server.zip`.

Federated structure already existed in root commit; metadata cannot distinguish intellectual authorship or identify third-party origin. No historical blob was read. `git rev-list --objects $SHA --missing=print` identifies 12 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Host and ten remotes in repository; seven remotes referenced by composition configuration (`host-app/webpack.config.js:47–55`). |
| Q2 | Yes | Each unit has its own entry (`src/index.js`), `webpack.config.js`, port and scripts (`business-reports/webpack.config.js:8`, `15`; `host-app/package.json:4–6`), and no source code imports cross units (no `../`; host uses only federated specifiers). |
| Q3 | Yes | Host routes and loads seven remotes (`host-app/src/App.js:30–57`, `230–240`). |
| Q4 | Yes | Module Federation configured on both sides, with matching name, port and exposed key for all seven pairs (`host-app/webpack.config.js:47–55` × `<remoto>/webpack.config.js:15`, `44–49`, original placeholder means remote), and consumed through federated `import()` (`App.js:30–54`). |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- Q1–Q5 are Yes, satisfying the `MFE-implemented` rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units” (`repo_type: example`, `README.md:203`).
- Chain is complete and connectable: unlike 097/103/104, no name, port or exposed key mismatch between host and remotes; comparable to complete-chain cases (076/084/096/106/109).
- Not code sharing (089/100): each remote exposes its whole module screen, mounted as a shell route, rather than a utility or generic component.
- `frontend_units: 11` counts host and ten remotes themselves; eight participate in composition (host + seven). `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `unit_organization: monorepo`.
- No open decision changes class.

## Analysis notes

- **RQ1:** three of seven connected remotes are placeholders (“module content will appear here”); composition is configured and used, but some content is empty. Three remotes (`accounts-module`, `cards-module`, `loans-module`) are ready as remotes (app and service `exposes`) and documented (`DOCUMENTATION.md:8–12`), but unconsumed by host and dependent on event bus methods host does not provide.
- **RQ2:** Webpack 5 `ModuleFederationPlugin` with `shared` `eager: true` on both sides and `React.lazy` loading with per-module fallback (`host-app/src/App.js:30–76`).
- **RQ3:** inter-module communication through global event bus (`window.EventBus`, `host-app/src/App.js:5–27`), used only by unconnected remotes.
- **Protocol (search):** entry through code search and terminology; plural hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Unit count:** if criterion counts only composition-referenced units, value would be 8; class does not change.

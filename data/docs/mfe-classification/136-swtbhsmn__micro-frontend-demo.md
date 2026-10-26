---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
url: https://github.com/swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
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

# 136 — swtbhsmn/micro-frontend-demo

## Context

Minimal Webpack Module Federation demonstration with two React applications in same repository: `app1` (host, port 3001) and `app2` (remote, port 3002). Each has own `package.json`, lockfile, `webpack.config.js` and entry, and host loads remote’s exposed component (`README.txt:1–14`). Repository name is not used as classification evidence.

`data/samples/mfe-sample-001/clones.csv:137` records rank 136, ID 1036507333, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:137` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:17569` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:17574` (`pass`), both with `terminology;technology`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same four hits in each round, all with subquery `#created:2025-08` and empty `path`:

| Query (`q`) | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `… pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T23:19:32.698Z / 2026-10-08T16:15:35.461Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | same | 2026-10-07T22:24:30.125Z / 2026-10-08T15:55:23.048Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | same | 2026-10-07T18:50:58.228Z / 2026-10-08T15:39:06.213Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | same | 2026-10-07T22:08:50.096Z / 2026-10-08T15:47:52.921Z |

Hit metadata: null description, no topics, JavaScript language, `fork: false`, creation at 2025-08-12T07:14:51Z, push at 2025-08-12T07:17:26Z. Repository README is `README.txt`. `README.txt:1` (“Microfrontend Webpack Module Federation demo”) contains joined spelling “Microfrontend” and phrase “Module Federation”. Separated form “micro frontend” is absent from README and corresponds to repository name (`in:name`), recorded here only as retrieval origin. Plural form “microfrontends” appears in none of fields; this hit depends on unrecorded GitHub search text processing.

`README.txt` comes from root `46f21b9` (2025-08-12) and was unchanged at SHA, which only modifies `.gitignore`. Both predate October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 19 entries, all regular files `100644`; zero symlinks and zero gitlinks. Two application directories, `app1/` and `app2/`, each with `package.json`, `package-lock.json`, `webpack.config.js`, `public/index.html` and `src/`, plus `README.txt`, `.gitignore` and three `.DS_Store`. No root manifest or workspaces. | context |
| Configuration (host) | `app1/webpack.config.js:28–34`: `ModuleFederationPlugin` with `name: "app1"`, `remotes: { app2: "app2@http://localhost:3002/remoteEntry.js" }` and `react`/`react-dom` as shared singletons. | strong |
| Configuration (remote) | `app2/webpack.config.js:28–35`: `name: "app2"`, `filename: "remoteEntry.js"`, `exposes: { "./RemoteApp": "./src/RemoteApp" }` and same `shared`. `app2/webpack.config.js:8–14`: `devServer.port: 3002` and `publicPath: "auto"`, consistent with host URL. | strong |
| Source code (consumption) | `app1/src/App.jsx:2`: `React.lazy(() => import('app2/RemoteApp'))`, rendered in `Suspense` (`app1/src/App.jsx:8–10`). Specifier `app2/RemoteApp` matches remote key and exposed key. | strong |
| Source code (exposure) | `app2/src/RemoteApp.jsx:3–5`: default export of exposed component. `app2/src/bootstrap.js:1–6` permits running remote independently. | moderate |
| Source code (boundaries) | Reading all sources: `app1/src/index.js:1` and `app2/src/index.js:1` perform `import('./bootstrap')`; `app1/src/bootstrap.js:3` imports `./App`; `app2/src/bootstrap.js:3` imports `./RemoteApp`. Search for `../` in sources and configs: no occurrence. `app1` accesses `app2` only through federated module `app2/RemoteApp`, without relative-path import. | context |
| Build/deploy | Separate builds and servers: `app1/package.json:5–7` (`webpack serve … --port 3001`) and `app2/package.json:5–7` (`--port 3002`). Each app has own `entry: "./src/index.js"` and `HtmlWebpackPlugin` (`app1/webpack.config.js:6`, `35–37`; `app2/webpack.config.js:6`, `36–38`). No production configuration exists; both run in `mode: "development"` (`app1/webpack.config.js:7`; `app2/webpack.config.js:7`). | moderate |
| Technology | Webpack, React and React DOM declared (`app1/package.json:9–10`, `17`; `app2/package.json:9–10`, `17`) and resolved in both lockfiles: `app1/package-lock.json:3690–3691`, `3702–3703` and `4634–4635`, and same lines in `app2/package-lock.json` (react/react-dom 18.3.1; webpack 5.101.0). `ModuleFederationPlugin` comes from webpack itself (`app1/webpack.config.js:2`; `app2/webpack.config.js:2`). | context |
| Documentation | `README.txt:3–14`: `app1` host at 3001, `app2` remote at 3002; start `app2` first, then `app1`, which “will open at http://localhost:3001 and load remote component from app2”. | moderate |

## Authorship and history

Non-shallow clone; 2 commits, no merge, both by Swetabh Suman `<swtbhsmn@gmail.com>` on 2025-08-12. Root `46f21b9` (“microfrontend-demo”, 12:44:15+05:30) adds all 19 files at once, including host, remote, lockfiles and README. SHA `9cb91ce` (“Update-Code”, 12:46:40+05:30) only changes `.gitignore` (`git log --no-renames --name-status`). Metadata indicate no third-party origin, and history records no separate unit evolution. An attempt to display `.gitignore` patch encountered missing historical blob (`7129f3d`); with `GIT_NO_LAZY_FETCH=1`, it was not fetched. No historical content was used as evidence.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two frontend units in repository, `app1` and `app2`, each with own entry (`app1/webpack.config.js:6`; `app2/webpack.config.js:6`). Host composition configuration references `app2` (`app1/webpack.config.js:30–32`). |
| Q2 | Yes | Each unit has own entry point, manifest, lockfile and build/server (`app1/package.json:5–7`; `app2/package.json:5–7`). No direct source-code import between them: host uses only federated module (`app1/src/App.jsx:2`). |
| Q3 | Yes | Host `app1` loads and renders remote in its application (`app1/src/App.jsx:2`, `8–10`; `README.txt:14`). |
| Q4 | Yes | Module Federation configured on both sides, with consistent name, file, exposed key and port (`app1/webpack.config.js:28–34`; `app2/webpack.config.js:8–10`, `28–35`) and actually consumed (`app1/src/App.jsx:2`). |
| Q5 | Yes | Q1–Q4 are Yes: complete and connectable host → remote chain. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “examples, templates, and proofs of concept that actually compose frontend units”, with `repo_type: example` (`README.txt:1`, `17`: “minimal demo”). Same complete host/remote chain as 076/084/096/106/109.
- Unlike 097/103/104, names, `filename`, port and exposed key align without gap. Unlike 089/100, federation mounts a UI unit in host, not only shares code.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]` (`app1/webpack.config.js:1–2`; `app2/webpack.config.js:1–2`). `frontend_units: 2`.
- `unit_organization: monorepo`: both units are in same repository, without workspaces or monorepo tooling, as independent folders. Template vocabulary does not distinguish this case, and `monorepo` is value recording two units in one repository.
- No decision remains open: runtime composition through Module Federation, without iframe, links or build-time packages.

## Analysis notes

- **RQ2:** webpack 5 Module Federation in minimal form: static URL `remotes`, component `exposes`, singleton `shared` and `index.js` → `import('./bootstrap')` pattern on both sides (`app1/src/index.js:1`; `app2/src/index.js:1`).
- **RQ3:** remote also runs independently through own `bootstrap` (`app2/src/bootstrap.js:1–6`). Unit relationship appears only in host URL (`app1/webpack.config.js:31`) and specifier `app2/RemoteApp`.
- **Protocol (search):** hit for `"micro frontend"` has separated spelling only in repository name; README uses joined form “Microfrontend” (`README.txt:1`). Plural hit has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, two units, `module-federation` and `monorepo` (no formal monorepo tool: two independent applications in same repository, and `monorepo` is available template-vocabulary value); no open decision. Execution was only demonstrated in development mode, limiting runtime and production validation, not static composition evidence. Blob `7129f3d` (historical `.gitignore`) is absent from partial clone, confirmed with `GIT_NO_LAZY_FETCH=1`, and unnecessary to classify snapshot. Provenance: four hits per round (`created:2025-08`); attribution to README.txt:1 ("Webpack Module Federation", "Microfrontend") and name `micro-frontend-demo` is plausible elimination, and plural forms depend on locally unrecorded search text processing. README.txt entered at root `46f21b9` (2025-08-12), before searches.

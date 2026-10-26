---
schema: 1
id: 1136702019
full_name: santhoshreddy500939/webpackconfig
url: https://github.com/santhoshreddy500939/webpackconfig
commit: e1f97e37c21a6893a8dbf8cd6ea7a7f8c4a9058a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 271 — santhoshreddy500939/webpackconfig

## Context

Study project for webpack configuration with React: CSS, Sass and image loaders, split into `common`, `dev` and `prod`. In the last commit, the SHA, a Module Federation host (`hostApp`) was added, referencing an external remote, `RemoteApp@http://localhost:9001/remoteappbuild.js`, and rendering it through `React.lazy(() => import("RemoteApp/microfrontend1"))`. The remote is not in the repository. The README documents only installation steps. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:272` records rank 271, ID 1136702019, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:272` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:23525` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:23532` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-01` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:35:58.148Z / 2026-10-08T15:40:33.737Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:10:21.754Z / 2026-10-08T15:48:43.516Z |

The effective queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Hit metadata:
- description “microfrontends”, no topics, language JavaScript, `fork: false`, size 183;
- created at 2026-01-18T07:17:08Z, pushed at 2026-01-25T08:11:11Z.

Spellings:
- **Plural:** “microfrontends” appears literally only in the repository description.
- **README:** `README.md:1–12` contains none of the spellings.
- **Singular:** “microfrontend” appears in `package.json:2` (`"name": "microfrontend"`), outside the searched fields; this hit depends on GitHub search text processing, which is not recorded.

The last README change is `ba894a8` (2026-01-25), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 15 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single application at the root: `index.html`, `index.js`, `Components/` (Application1, Application2, Header, Paragraph), `assets/Images/webpack.png`, three webpack configs, `package.json`, `package-lock.json`, README and `.gitignore`. | context |
| Configuration (host) | `webpack.common.config.js:4`, `31–36`: `ModuleFederationPlugin({ name: "hostApp", remotes: { RemoteApp: "RemoteApp@http://localhost:9001/remoteappbuild.js" } })`. `webpack.dev.config.js:4–5`, `25`: dev uses `merge(common, …)` and serves on port 9000; `package.json:9`: `build:dev` uses this config. | strong |
| Remote consumption | `Components/Application1/Application1.js:3`, `10–12`: `React.lazy(() => import("RemoteApp/microfrontend1"))` inside `Suspense`. `index.js:5`, `13`: `Application1` is rendered in `App`. | strong |
| External remote | Remote `RemoteApp` (port 9001, file `remoteappbuild.js`, module `./microfrontend1`) is not in the repository or any gitlink. The rounds have another candidate from the same account, `santhoshreddy500939/microfrontendreactapp1` (`unknown`), outside the sample and not inspected. | context |
| Configuration (production) | `webpack.prod.config.js:1–34` does not `merge` with `common`, and declares neither `entry` nor `ModuleFederationPlugin`. Production `build` (`package.json:8`) does not include federation, which exists only in the development flow. | ambiguous |
| Source code (boundaries) | The only `../../` import is `Components/Header/header.js:3` (`../../assets/Images/webpack.png`), within the same application. `Components/Application2/Application2.js:3–7` is a local placeholder (“holder for application2”), not a remote. | context |

## Authorship and history

Non-shallow clone; 11 commits, 1 merge (`70aea9e`, joining a local commit to `87f607a`, the latter created through the GitHub interface), all by account `santhoshreddy500939`, from 2026-01-18 (`9cc9839`, “conveting normal files into reactapp”) to 2026-01-25 (SHA `e1f97e3`, “modulefederation”). The SHA introduces `Application1`/`Application2`, changes `index.js`, `webpack.common.config.js` and `webpack.dev.config.js` and removes `webpack.config.js`. Only branch `master` exists. No historical blob was read. When listing SHA `--stat`, a parent object was unavailable (`04c01ba`) and was not fetched; name-based `diff-tree` worked.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | The host and an external remote referenced by composition configuration (`webpack.common.config.js:33–35`). |
| Q2 | Yes | The host has its own entry point and build; the remote is external and served separately (`localhost:9001`), counting as Yes under the operational criterion. |
| Q3 | Yes | The host loads and mounts the remote in `Application1` (`Application1.js:3`, `10–12`), rendered in `App` (`index.js:13`). |
| Q4 | Yes | `ModuleFederationPlugin` with `remotes`, actually used by `import("RemoteApp/microfrontend1")` in development config (`webpack.dev.config.js:5`). |
| Q5 | Yes | Q1–Q4 are Yes: Module Federation host consuming an external remote. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “repositories containing only the host, which references external remote units”. Same categorization as final 008 (Module Federation host with remotes on `localhost`) and draft 211.
- Unlike 097/103/104, configuration is connectable in the snapshot: the remote name declared in `remotes` is the one imported and rendered.
- **Fields:** `frontend_units: 2` (host and referenced remote), `unit_organization: multi-repo`, `repo_type: example` (study project, seven days of commits, remote on `localhost`), `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`.

## Analysis notes

- **RQ2:** minimal host with webpack 5 native `ModuleFederationPlugin` and one remote, without declared `shared` (`webpack.common.config.js:31–36`).
- **Configuration (production):** production config does not include federation, unlike development config. This does not affect Q4, requiring a configured and connected mechanism, but indicates composition exists only in the development flow.
- **Protocol (search):** the plural appears only in the description; the singular has no literal spelling in the searched fields. Eligibility changes from `unknown` (001) to `pass` (002).

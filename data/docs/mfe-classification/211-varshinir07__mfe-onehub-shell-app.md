---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
url: https://github.com/varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 211 — varshinir07/mfe-onehub-shell-app

## Context

React 19 application generated through Create React App and converted to Webpack 5 with own configuration (`package.json:18–22`; `src/webpack.config.js:1–102`). Module Federation host “onehub”: consumes two external remotes, `subscription` (`localhost:3001`) and `ownership` (`localhost:3002`), and mounts five of their modules in dashboard (`src/pages/Dashboard.jsx:3–26`). Remotes are absent from repository.

README is CRA standard, with heading “mfe-onehub-shell / MFE Remote App for OnehubShell” (`README.md:1–2`). “Remote App” label contradicts host code. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:212` records rank 211, ID 996744917, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:212` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:14759` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14765` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same hit in each round, at endpoint `code`:

| Query (`q`) | Subquery / effective query | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `technology-module-federation-plugin-js-code#size:3000..3999` / `ModuleFederationPlugin remotes extension:js size:3000..3999` | `src/webpack.config.js` | 2026-10-07T22:37:04.337Z / 2026-10-08T16:16:17.639Z |

File is 3.440 bytes at SHA, within range, and contains `ModuleFederationPlugin` (`:3`, `72`) with `remotes` (`:74–78`). Code-hit metadata provide only description “mfe-onehub-shell App”, without topics or dates. Entry is code-only. README (`README.md:1–2`) lacks terminology-searched terms.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 19 entries, all regular files `100644`; zero symlinks and zero gitlinks. One project (CRA scaffold: `public/`, `src/index.js`, `App.js`, tests, `reportWebVitals`), plus `src/pages/Dashboard.jsx` and `src/webpack.config.js`. | context |
| Configuration (host) | `src/webpack.config.js:72–92`: `ModuleFederationPlugin` with `name: 'onehub'`, `remotes: { remote1: 'subscription@http://localhost:3001/remoteEntry.js', remote2: 'ownership@http://localhost:3002/remoteEntry.js' }` and singleton `react`/`react-dom` and `eager`. `package.json:19–20`: `start` and `build` use this configuration (`webpack serve --config src/webpack.config.js`). | strong |
| Source code (composition) | `src/pages/Dashboard.jsx:3–9`: `React.lazy(() => import('remote1/ModemAuthorization'))`, `remote1/SecurityPackage`, `remote1/Card`, `remote2/LabourHourHold` and `remote2/MobileService`. `:15–26`: rendered under `Suspense`, with `Card` receiving host props. `src/App.js:3–8` mounts `Dashboard`. | strong |
| External units | Remotes `subscription` and `ownership` are absent from repository. Configuration references them through name and URL, but no source or documentation locates them beyond `localhost`. In sample, same account has only this repository (`sample.csv`). In both rounds account has one more candidate, `varshinir07/varshinir07`, a profile repository not inspected. | moderate |
| Source code (boundaries) | Relative imports stay within `src/`; no remote code. | context |
| Documentation | `README.md:1–2`: “MFE Remote App for OnehubShell”; remainder is CRA README. Label diverges from observed code role (host). | ambiguous |

## Authorship and history

Non-shallow clone; 2 commits, no merge, by Varshini (noreply) through web interface, both on 2025-06-05: `74cbf87` (“Initial commit”, only `README.md`) and SHA `1ddddc4` (“Created OneHub Shell App”, 19 files). No historical blob was read. Clone is partial (`blob:none`) and `git rev-list --objects --all --missing=print` identifies missing blob `3c7947b…` (initial README version); all cited current-SHA files are present, but earlier README content could not be read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Host and two external units explicitly referenced by composition configuration (`src/webpack.config.js:74–78`). |
| Q2 | Yes | Remotes are external and separately served (`localhost:3001`, `3002`), without source-code import. Host has own entry/build (`src/webpack.config.js:10`; `package.json:19–20`). |
| Q3 | Yes | Host loads and mounts remote modules in dashboard (`src/pages/Dashboard.jsx:15–26`). |
| Q4 | Yes | `ModuleFederationPlugin` with `remotes`, consumed through `import('remote1/…')` and `import('remote2/…')`. |
| Q5 | Yes | Q1–Q4 are Yes: host composing external remotes. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule, inclusion case “repositories containing only the host, which references external remote units”. Same classification as 087: absent remote sources do not equal absent host composition configuration.
- Remotes use fixed `localhost` URLs, not undefined environment variable, so uncertainty of 145/176/199 does not apply.
- Consumed modules are mostly functional screen slices (modem authorization, security package, services) mounted in dashboard; only `Card` is generic component. Thus case does not reduce to code sharing in 089/100.
- `build_tools: [webpack]`: explicit author configuration (`src/webpack.config.js`), used by scripts, unlike unejected CRA of 087. `react-scripts` remains only for `test`/`eject`.
- `frontend_units: 3` (host and two referenced remotes), `unit_organization: multi-repo`, `ui_technologies: [react]`, `repo_type: example` (CRA scaffold, `localhost` URLs, without deployment).
- No decision remains open.

## Analysis notes

- **RQ2:** Webpack 5 host with `ModuleFederationPlugin`, local keys (`remote1`, `remote2`) differing from global container names (`subscription`, `ownership`), and `shared` with `eager: true` without asynchronous bootstrap (`src/index.js:1–12`).
- **RQ1 (misleading signals):** README labels repository “Remote App” although it is host.
- **Protocol (search):** entry only through code search; eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, React/webpack, three referenced units and `multi-repo`; no open decision (`draft`). Explicit checklist case of repository containing only host and referencing external units, as finals 008 (localhost configuration and three referenced units) and 040 (concrete consumption of external component by host), limiting analysis to available side. Limitations to record: providers were not inspected (contrast with generic sharing should not be asserted as inspection of absent providers; intended composition pattern suffices), one historical blob is missing, README build description does not match current scripts/configuration, and `App.js:3–8` includes import and `Dashboard` element, with function block ending at line 10.

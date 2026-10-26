---
schema: 1
id: 1024333329
full_name: BrainDriveAI/BrainDrive-Theme-Service-Bridge-Example-Plugin
url: https://github.com/BrainDriveAI/BrainDrive-Theme-Service-Bridge-Example-Plugin
commit: 431b77cd1676a257ca3ef287520c5b2a5060aa75
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 189 — BrainDriveAI/BrainDrive-Theme-Service-Bridge-Example-Plugin

## Context

Demonstration plugin for the BrainDrive platform (“ServiceExample_Theme”), with three theme modules displayed on platform pages (`README.md:5–35`). A webpack 5 Module Federation remote exposing `./ThemeDisplay`, `./ThemeController`, `./ThemeListener` and `./SettingsExample` (`webpack.config.js:43–65`). Includes `lifecycle_manager.py`, registering the plugin with the platform backend using `scope` and `bundle_location: dist/remoteEntry.js` (`lifecycle_manager.py:95–116`). Host is the BrainDrive platform, in another repository. The repository is archived (`README.md:1`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:190` records rank 189, ID 1024333329, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:190` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:16718` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:16722` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-07-01..2025-07-31` | 2026-10-07T23:19:05.495Z / 2026-10-08T16:15:24.148Z |

Hit metadata:
- description “⚠️ Archived — BrainDrive is building a new system on personalaiarchitecture.org”, without the phrase;
- no topics, language TypeScript, `fork: false`, size 227;
- created at 2025-07-22T14:33:17Z, pushed at 2026-03-08T01:16:59Z.

The hit comes from `README.md:146`, “### Module Federation Architecture”, the only occurrence. The README's last change is the SHA itself, `431b77c` (2026-03-07, archive notice), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 33 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single webpack project at the root (`package.json`, `webpack.config.js`, `public/index.html`, `src/` with components and services), `lifecycle_manager.py`, guides (`DEVELOPER_GUIDE.md`, `ERROR_HANDLING_GUIDE.md`, `references/*.md`) and a screenshot. | context |
| Configuration (federation) | `webpack.config.js:43–65`: `ModuleFederationPlugin({ name: "ServiceExampleTheme", library: { type: "var" }, filename: "remoteEntry.js", exposes: { './ThemeDisplay', './ThemeController', './ThemeListener', './SettingsExample' }, shared: react/react-dom singleton eager })`, without `remotes`. `:10–22`: `publicPath: "auto"`, `var` library. `package.json:5`: `main: dist/remoteEntry.js`. | moderate |
| Configuration (platform registration) | `lifecycle_manager.py:95–116`: plugin data for platform backend, with `scope: "ServiceExampleTheme"`, `bundle_method: "webpack"`, `bundle_location: "dist/remoteEntry.js"` and `plugin_slug`. `:207–220`: installation in `backend/plugins/shared/<slug>/<versão>` (the original placeholder means version). `README.md:37–57`: installation through Plugin Manager and modules dragged onto BrainDrive pages. | moderate |
| Source code (host contract) | `src/services/themeService.ts:1–30`: wrapper for BrainDrive's plugin-provided “Theme Service Bridge”. `src/index.tsx:1–10`: exports modules “for BrainDrive to load”, with standalone development mode using mock services (`:23–40`). | moderate |
| Source code (boundaries) | Imports stay in `src/`; searching for `../../` returns nothing. Platform services arrive at runtime through the bridge, rather than source imports. | context |

## Authorship and history

Non-shallow clone; 4 commits, no merges.
- **Code:** `4edc4b9` (2025-07-22, “First Commit”) and `ddefccb` (2025-09-30, “Updating new repo location”), by David J Jones `<david-j-jones@hotmail.com>`.
- **Archiving:** `5e35e64` and SHA `431b77c` (2026-03-07), by Dave Waring (noreply), change only README with archive notice (`git diff-tree`).

No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single unit; composition configuration only has `exposes` (`webpack.config.js:47–52`) and references no external units. |
| Q2 | Yes (for the unit) | Its own entry and build generating `remoteEntry.js` (`webpack.config.js:12`, `46`; `package.json:6–11`). |
| Q3 | Undetermined | Host (BrainDrive platform) is not in the repository; registration and use are described in `lifecycle_manager.py` and README. |
| Q4 | Undetermined | Remote side is configured; consumer is not observable. |
| Q5 | No | A unit is prepared for composition, rather than an MFE instance in the repository. |

## Rationale

- Proposed `MFE-unit` with `status: review`. The checklist exception literally applies: `exposes`, `remoteEntry.js`, singleton `shared` and host contract, with unobservable host, as in final 001/050/069.
- **Review is justified by the platform question:** only host is BrainDrive's plugin system (Plugin Manager, `lifecycle_manager.py`, Service Bridge). Final 037 classified a unit whose only host is a third-party platform's extension mechanism as `Non-MFE` (102/074/080).
- **First party:** as in 161, platform belongs to the repository's organization (BrainDriveAI), and plugin is a first-party example, rather than a third-party extension.
- Not code sharing (089/100): exposed modules are page modules with their own UI and service.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 1`, `unit_organization: single-unit`, `repo_type: example` (“working demo”, `README.md:17`).

## Analysis notes

- **RQ2:** Module Federation plugin system with backend registration (`scope`, `bundle_location`, per-user installation lifecycle) and host-injected service bridge (theme, API).
- **Protocol (sample):** second MF remote case for an extension platform of its own organization (see 161); both should be decided consistently.
- **Protocol (search):** entry only through query `"module federation"`. Repository is archived and `pushed_at` comes from archive notice. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

Decide whether a Module Federation plugin whose only host is its own organization's extension platform counts as MFE-unit or follows 037.

- **MFE-unit (proposed):** explicit preparation (`exposes`, `remoteEntry.js`, bundle registration) for an unobservable external, first-party host.
- **Non-MFE:** follows 037, because MF is a platform's plugin mechanism and repository is its extension.

No new rule is proposed. Until a decision, preserve `MFE-unit`/`review`, consistent with 161.
- **Independent review contribution (Lupa):** provisional agreement with MFE-unit and `review`; deciding whether to apply MFE-unit exception or platform extension Non-MFE precedent (037) is a real rule question. Final 050 and 069 classify single remotes with `exposes` and absent host as MFE-unit; this case has more explicit evidence of consuming platform and page use. Conversely, 037 applied Non-MFE to a Module Federation remote whose host is a platform's extension mechanism. Plugin owner and BrainDrive belong to the same organization (`README.md:5–7,37–57,217`; `package.json:21`), preventing automatic application of the third-party platform precedent without proving host and plugin form the same decomposable architecture. Citation clarifications: interface `ThemeServiceBridge` starts in `src/services/themeService.ts:33` (cite `:28–33`); `lifecycle_manager.py:207–220` computes the shared storage path and is not, alone, installation (validation and use of `remoteEntry.js` are at `:372–422`, and file copying at `:354–366`); structure table is a `git ls-tree` inventory, rather than a file line.

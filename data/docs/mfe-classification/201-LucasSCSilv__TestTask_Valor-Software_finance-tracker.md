---
schema: 1
id: 1175499187
full_name: LucasSCSilv/TestTask_Valor-Software_finance-tracker
url: https://github.com/LucasSCSilv/TestTask_Valor-Software_finance-tracker
commit: 4d31c68b3991d95f208f27b6ab210411c5b16567
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: undetermined, q5: undetermined }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 201 — LucasSCSilv/TestTask_Valor-Software_finance-tracker

## Context

“FinTrack”, a React + Vite + Supabase personal-finance application with login, dashboard, transactions, income, budget and categories (`README.md:1–5`; `src/App.jsx:43–55`). Route `/reports` loads an external federated module: `lazy(() => import('finance_tracker_reports/reports'))`, with comment “Reports is loaded remotely from finance-tracker-reports via Module Federation. Zephyr resolves the URL automatically at runtime.” (`src/App.jsx:12–14`, `50`). Snapshot build configuration, however, is for a remote: `name: 'finance_tracker_reports'`, `exposes: { './Reports': './src/Reports.jsx' }`, without `remotes` (`vite.config.js:6–16`). Exposed file is absent from snapshot, and `package.json` is also named `finance-tracker-reports` (`package.json:2`). `package-lock.json` belongs to another manifest, `test-task-valor-software` (`package-lock.json:2`, `7–25`). Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:202` records rank 201, ID 1175499187, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:202` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:26049` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:26056` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, at endpoint `code`:

| Query (`q`) | Subquery / effective query | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:600..699` / `"@module-federation" filename:package.json size:600..699` | `package.json` | 2026-10-07T18:20:45.384Z / 2026-10-08T15:36:05.759Z |

`package.json` is 614 bytes at SHA, within range, and contains `"@module-federation/vite": "^1.1.6"` (`package.json:18`). It was added in `d716676` (2026-03-08) and unchanged afterward. Code-hit metadata supply no description, topics or dates. Entry is code-only; README contains no MFE terms (only Zephyr Cloud, `README.md:5`, `13`, `103–110`). Last README change is `bfab541` (2026-03-09), before October 2026 collections.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 20 entries, all regular files `100644`; zero symlinks and zero gitlinks. One Vite project (`index.html`, `src/` with `App.jsx`, `main.jsx`, `components/layout.jsx`, `context/AuthContext.jsx`, `lib/supabase.js` and six pages). No `src/Reports.jsx` or other application. | context |
| Source code (consumption) | `src/App.jsx:12–14`: dynamic import of federated specifier `finance_tracker_reports/reports`. `:16–27`: `ReportsWrapper` passes `userId` to remote component within `Suspense`. `:50`: route `/reports`. `src/components/layout.jsx:9`: navigation item “Reports”. | moderate |
| Configuration (MF) | `vite.config.js:4`, `6–16`, `21`: `federation(mfConfig)` with `name: 'finance_tracker_reports'`, `filename: 'remoteEntry.js'`, `exposes './Reports' → './src/Reports.jsx'` and singleton `shared` for `react`/`react-dom`; `:3`, `22`: `withZephyr()`. No `remotes`. This is remote configuration, not configuration of host consuming it. | ambiguous |
| Configuration (consistency) | Exposed file is absent at SHA. Consumed specifier (`/reports`) does not match exposed key (`./Reports`). Consumer app has same `name` as remote. `react-router-dom` is imported (`src/main.jsx:3`; `src/App.jsx:2`) but absent from `package.json:10–24`; it appears only in another manifest’s lockfile (`package-lock.json:15`), whose root entry (`:7–25`) also does not list `@module-federation/vite` (appears only as resolved package, `:1003`). No `zephyr:dependencies` or other declaration locates remote. | ambiguous |
| Source code (boundaries) | `git grep` for `../..`: no occurrence; relative imports stay within `src/`. No reports-unit code exists. | context |
| Search | `git grep -i` at the SHA (except lockfile) for `zephyr`, `federation`, `remote`, `micro.?front` and `Reports`: only lines cited above. | context |

## Authorship and history

Non-shallow clone; 6 commits, no merge, all by Lucas Silv `<lucasscsilv@outlook.com>`, from 2026-03-07 (`dbca30e`, “Initial commit”, only `README.md`) to 2026-03-09 (SHA `4d31c68`):
- `d716676` (2026-03-08, “commit”): adds entire project and `.__mf__temp/finance_tracker_reports/localSharedImportMap.js`, federation-plugin-generated artifact (`.gitignore:6` ignores `__mf__temp/`, without leading dot);
- `a3a1150` (2026-03-08, “Update App.jsx”): changes `src/App.jsx`;
- `2fd0d56` and `bfab541` (2026-03-09): edit README through web interface;
- SHA `4d31c68` (2026-03-09): removes directory `.__mf__temp/finance_tracker_reports`.

Previous blob of `src/App.jsx` (`d716676`, `46d4070`) and blob of `localSharedImportMap.js` (`76a2f98`) are absent from clone and were not fetched; what `a3a1150` changed is unknown. Artifact `__mf__temp` named `finance_tracker_reports` indicates this remote configuration was executed locally, but snapshot contains no exposed source.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | App explicitly references external unit through federated specifier (`src/App.jsx:12–14`), as host referencing external remote in 087. |
| Q2 | Yes | Reports unit is another project (“finance-tracker-reports”, `src/App.jsx:12`), without source-code import; this repository has own build (`package.json:5–9`). |
| Q3 | Yes | App mounts remote component at route `/reports` (`src/App.jsx:16–27`, `50`). |
| Q4 | Undetermined | Module Federation is configured (`vite.config.js:6–16`, `21`), but as remote, exposing nonexistent file and without `remotes`; consumption depends on Zephyr resolution undeclared in repository. Under criterion, “a configuration whose actual use is unclear is Undetermined”. |
| Q5 | Undetermined | No No answer and Q4 Undetermined. |

## Rationale

- `Uncertain` under rule “No question is No, but at least one is Undetermined”, with `status: review`.
- **Consumer side:** code mounts external remote through route, as 087. Unlike 087, host configuration declares no remote; resolution is attributed to Zephyr only in comment (`src/App.jsx:13`). URL and environment variable are missing, weaker than 145.
- **Configured side:** MF configuration belongs to reports remote itself, with absent exposed source. Snapshot appears to mix host with configuration copied from remote project (same `name` in `vite.config.js:7` and `package.json:2`; lockfile from another manifest).
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 2` (this app and external reports remote), `unit_organization: multi-repo`. `repo_type: example`: technical-assessment task, according to lockfile `test-task-valor-software` (`package-lock.json:2`), without documented production use.

## Analysis notes

- **RQ2:** Vite Module Federation with Zephyr Cloud, where remote resolution is left to deployment platform, without `remotes` declaration in repository.
- **RQ1 (misleading signals):** `@module-federation/vite` in `package.json` is real and connected to build, but configuration contradicts app’s code role.
- **Protocol (search):** entry only through code search in `package.json`. Eligibility changes from `unknown` (001) to `pass` (002).
- **Protocol (snapshot):** two historical blobs absent from partial clone, not fetched.

## Recorded decision

Retained as `Uncertain`. Federated import and remote-component mounting exist, but available configuration defines project as remote, exposes absent file and declares no origin for consumed remote. Zephyr resolution is only commented, without verifiable snapshot configuration.

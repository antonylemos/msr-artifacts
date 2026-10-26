---
schema: 1
id: 1285686414
full_name: SerenityInAllThings/Backstage_test
url: https://github.com/SerenityInAllThings/Backstage_test
commit: 3daa194eb7e5e1629bd4c1b063d45a06d64ef12a
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 247 — SerenityInAllThings/Backstage_test

## Context

Complete copy of the Backstage framework repository (“an open source framework for building developer portals”, `README.md:1–22`), with upstream history (74.430 commits in `HEAD`, since 2020) and one owner commit on default branch `test`. Commit `3daa194` (“Adding api keys plugin”) adds two plugins, `plugins/api-keys` and `plugins/api-keys-backend`. The frontend is integrated into the Backstage example app (`packages/app`) as a workspace dependency and direct import.

Module Federation appears only in the framework’s own dynamic plugin loading libraries (`packages/frontend-dynamic-feature-loader`, `packages/module-federation-common`, `packages/cli-module-build`, `packages/backend-dynamic-feature-service`), which are the source of the matches. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:248` records rank 247, ID 1285686414, status `cloned`, branch `test` and the front matter commit, which is the HEAD of the clone and of `origin/test`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:248` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:32720` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:32728` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same four hits in each round, all from endpoint `code` and query `technology-module-federation-package-code`: `"@module-federation" filename:package.json`.

| Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|
| `…#size:1800..1999` | `packages/frontend-dynamic-feature-loader/package.json` | 2026-10-07T19:47:05.277Z / 2026-10-08T15:42:35.449Z |
| `…#size:1800..1999` | `packages/module-federation-common/package.json` | 2026-10-07T19:47:05.277Z / 2026-10-08T15:42:35.449Z |
| `…#size:3000..3999` | `packages/cli-module-build/package.json` | 2026-10-07T20:33:04.318Z / 2026-10-08T15:43:48.071Z |
| `…#size:3000..3999` | `packages/backend-dynamic-feature-service/package.json` | 2026-10-07T20:33:07.125Z / 2026-10-08T15:43:53.217Z |

For example:
- `packages/frontend-dynamic-feature-loader/package.json` (1.881 bytes) declares `@backstage/frontend-dynamic-feature-loader`, with role `web-library` (`:2–6`) and dependencies `@module-federation/enhanced`, `runtime` and `sdk` (`:38–40`);
- `packages/module-federation-common/package.json` (1.823 bytes) describes itself as “Helper library for module federation” (`:4`).

Code hit metadata is empty. Entry is through code only; the README is Backstage’s and was not used in the search.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 11.877 entries, comprising 11.815 regular files `100644`, 60 executables `100755` and 2 symlinks `120000`; zero gitlinks. The symlinks are `.claude/CLAUDE.md` → `../AGENTS.md` and `.cursor/rules/backstage-project.mdc` → `../../AGENTS.md`, and are broken at the SHA, which removed `AGENTS.md`. This is the Backstage monorepo (`packages/`, `plugins/`, `microsite/`, `docs/`, `beps/` and others). | context |
| Technology (matches) | The four matched `package.json` are framework libraries and tools for dynamic plugins with Module Federation (for example `packages/frontend-dynamic-feature-loader/package.json:2–6`, `38–40`). They are mechanisms the framework offers to third parties, not composition configured by this repository. | contrary |
| Owner contribution | `3daa194` (37 files): creates `plugins/api-keys` and `plugins/api-keys-backend`, changes `app-config.yaml`, `packages/backend` and `packages/app`, and removes `AGENTS.md`. `packages/app/package.json:82`: `"@internal/plugin-api-keys": "workspace:^"`. `packages/app/src/modules/appModuleNav.tsx:35`, `127`: direct import of `ApiKeysNavGate`. The plugin enters the app through a package dependency, without federation. | contrary |
| App | `packages/app/package.json:1–12`: `example-app`, role `frontend`, the framework’s example app. Searching for `frontend-dynamic-feature-loader` in `packages/app` finds no use. | context |

## Authorship and history

Non-shallow clone. `HEAD` has 74.430 commits, 21.630 merges and around 2.386 distinct authors; the root is `1a19a01c4b` (2020-01-25, Stefan Ålund, “Create README.md”), from the upstream project. The owner’s only commits are by Peterson V `<petersonvgama@gmail.com>`:
- `3daa194` (2026-07-01, the SHA, “Adding api keys plugin”), on `test`;
- `cc006f5` (2026-07-01, “Testing”), on `origin/test2`, not considered.

An attempt to read the diff of `packages/app/package.json` at the SHA found a missing historical object in the partial clone (`387abe8`), which was not fetched; the contribution description relies on the changed-file list and SHA state.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | The repository is the framework with an example app; plugins, including the owner’s, enter as workspace packages (`packages/app/package.json:82`), and no configuration in this repository references units composed at runtime. |
| Q2 | No | The plugins have no independent build or deployment in the use made here; they compile inside the app. |
| Q3 | No | The app mounts statically imported components (`appModuleNav.tsx:35`, `127`); there is no host loading separate units. |
| Q4 | No | Module Federation exists only as a framework library (dynamic plugin loading), unused by the app or owner contribution. Under the criterion, a declared dependency alone is No. |
| Q5 | No | Q1–Q4 are No: copy of a portal framework with a static test plugin. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: the repository is the framework itself, whose dynamic plugin packages match code search.
- The owner contribution is a plugin integrated at build time as a workspace dependency. The open decision about build-time composition does not apply, because the plugin is neither published nor deployed as an independent unit; it is code in the same app build.
- `frontend_units: 1` (the `example-app`), `unit_organization: single-unit`, `ui_technologies: [react]`, `build_tools: []` (build encapsulated by the Backstage CLI), `repo_type: other` (framework copy for testing).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** copies of frameworks supporting Module Federation (Backstage) match code search for `@module-federation` in `package.json`.
- **Protocol (sample):** repository not marked as a fork, but with complete upstream history; the snapshot is default branch `test`, and branch `test2` was not considered.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

---
schema: 1
id: 1050538328
full_name: bank20baht/poc-angular-native-federation-tailwindcss
url: https://github.com/bank20baht/poc-angular-native-federation-tailwindcss
commit: d2f9722e77b754318c831138d54aebbfd093ee1e
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 342 — bank20baht/poc-angular-native-federation-tailwindcss

## Context

Native Federation proof of concept in Angular 20 with Tailwind CSS 4 and daisyUI (repository description): a host (`host/`) and remote (`remote/`), each with its own Angular workspace, `federation.config.js`, `package.json` and lockfiles. The history’s declared focus is making remote Tailwind styling work inside the host, resolved by making host Tailwind scan remote source code (`host/src/styles.css:4`). The root README has only the title (`README.md:1`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:343` records rank 342, ID 1050538328, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:343` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:18434` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:18439` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-09` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T19:02:49.821Z / 2026-10-08T15:39:32.098Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-09` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T22:09:10.723Z / 2026-10-08T15:48:05.193Z |

Hit metadata: description “POC angular v20 microfrontend with Native Federation Styling with Tailwindcss v4”, no topics, language TypeScript, no license, `fork: false`, size 382, created at 2025-09-04T15:13:04Z, pushed at 2025-09-18T17:14:52Z.

The match comes from the description: singular “microfrontend” appears literally there; the root README (`README.md:1`, “# Native Federation Angular”) does not contain the term, and plural “microfrontends” does not appear literally, so that hit depends on GitHub search text processing, which is not recorded. The README comes from commit `bb8b5ac` (2025-09-04) and does not postdate the October 2026 searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 72 entries, all regular files `100644`; zero symlinks and zero gitlinks. Two independent Angular workspaces (`host/`, `remote/`), each with `angular.json`, `package.json`, `package-lock.json`, `bun.lock`, `federation.config.js`, `src/main.ts` → `src/bootstrap.ts`. | strong |
| Configuration (host) | `host/federation.config.js:3–27`: `withNativeFederation` with singleton `shareAll`. `host/src/main.ts:3–5`: `initFederation({ 'remote': 'http://localhost:4201/remoteEntry.json' })` before bootstrap. `host/angular.json:17`, `31`, `111`: builder `@angular-architects/native-federation:build`, original server on port 4200. | strong |
| Configuration (remote) | `remote/federation.config.js:5–10`: `name: 'remote'`, `exposes` `./Component` (`src/app/app.ts`) and `./routes` (`src/app/modules/home/home.routes.ts`); singleton `shareAll`. `remote/angular.json:17`, `108`: same builder, port 4201, matching the host URL. | strong |
| Source code (composition) | `host/src/app/app.routes.ts:7–28`: route `''` with `loadRemoteModule('remote', './Component')` → `m.App` and route `flights` with `loadRemoteModule('remote', './routes')` → `m.APP_ROUTES`, both with local fallback; `remote/src/app/app.ts:10` exports `App` and `remote/src/app/modules/home/home.routes.ts:3–14` exports `APP_ROUTES`. | strong |
| Build (cross-unit styling) | `host/src/styles.css:2–5`: `@import "tailwindcss" source(none)` with `@source "./app/**/*.{html,js}"` and `@source "../../remote/src/**/*.{html,js}"`, meaning host CSS is generated from classes used in remote templates (for example, `remote/src/app/app.html:1–10`). The remote has its own Tailwind (`remote/src/styles.css:2–3`). History: `f61b3c0` (2025-09-13), “can render style from remote but tailwindcss host must scan remote first”. | ambiguous |
| Source code (boundaries) | Search for `../` in `*.ts`, `*.css`, `*.html`, `*.json` and `*.js` (except lockfiles): only occurrence `host/src/styles.css:4`, the CSS scan above. No TypeScript code import between `host` and `remote`; the host reaches the remote only through `loadRemoteModule`. `host/src/remote.d.ts:1` declares a module `remote/Styles?inline` unused in code. | moderate |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 11 commits reachable from the SHA (14 across all refs), 1 merge (the SHA itself, from `feature/tailwindcss@4`), from 2025-09-04 (`bb8b5ac`, “feat: module federation with native federation in angular 20”) to 2025-09-19. Authorship: `Nattapong Promthong <banker.z412@gmail.com>` in all commits. Remote refs `feature/nx`, `feature/tailwindcss`, `feature/tailwindcss@3` and `feature/tailwindcss@4` were not considered separately. The commit sequence (safelist, remote scan, Tailwind 3 and 4) documents the cross-unit styling issue. The account has other MFE POCs in the rounds (`bank20baht/poc-angular-module-federation`, `poc-angular-native-federation`, `poc-microfrontend-angular`; `data/discovery/mfe-round-002/candidates.csv:18050`, `19064`, `22401`), outside this snapshot. `git rev-list --objects $SHA --missing=print` identifies 35 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `host` and `remote`, the latter referenced by composition configuration (`host/src/main.ts:3–5`). |
| Q2 | Yes | Own entry point, builder, port and lockfiles per unit and no source code import between them. See review point about CSS scanning (`host/src/styles.css:4`). |
| Q3 | Yes | The host routes and loads the remote component and routes (`host/src/app/app.routes.ts:7–28`). |
| Q4 | Yes | Native Federation configured on both sides, with matching name, exposed keys and port, and used through `initFederation` + `loadRemoteModule`. |
| Q5 | Yes | Q1–Q4 converge, subject to the review point. |

## Rationale

- `MFE-implemented` (decision recorded below). It matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”; same approach as final 059 (Native Federation with host and remotes in a monorepo).
- The federation chain is complete and consistent (contrast with 097/103/104); comparable to complete-chain cases (076/084/096/106/109).
- The remote exposes a page component and a route set mounted by the host, not utilities (contrast with 089/100).
- `frontend_units: 2`, `unit_organization: monorepo`, `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (builder `application` behind Native Federation, `host/angular.json:57–59`), `repo_type: example`.

## Analysis notes

- **RQ2:** Native Federation in Angular 20 with remote routes and local fallback through `catch` in `loadRemoteModule`.
- **RQ3:** utility styling (Tailwind/daisyUI) generated by the host from remote source code, CSS-level build coupling described in history as a requirement (“host must scan remote first”).
- **Protocol (family):** the account maintains a series of Angular MFE POCs in the rounds; only this one is in the sample.

## Recorded decision

- **Question:** the host generates CSS by scanning `../../remote/src/**` (`host/src/styles.css:4`), so new classes used by the remote are styled only after rebuilding the host. There is no code import between units, the literal Q2 criterion, but host build depends on remote source code. Comparison with final 042’s “deployment dependency” (code compiled inside the bundle; here, CSS generation only) and the note in 128 (shared library scanning, not another unit).
- **Researchers’ decision:** build-time CSS coupling does not weigh on Q2. `MFE-implemented` retained.
- **New rule:** none proposed.

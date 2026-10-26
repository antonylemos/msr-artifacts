---
schema: 1
id: 1238664148
full_name: LaurineLeNet/microfrontend-angular-angular
url: https://github.com/LaurineLeNet/microfrontend-angular-angular
commit: 342c92dff482f1ee0a4bcc05f9302361a7354352
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 349 — LaurineLeNet/microfrontend-angular-angular

## Context

Native Federation example in Angular with three independent workspaces: a shell (`shell/`) and two remotes (`athletes/`, a simulated race with athlete list and detail; `ranking/`, real-time ranking). The shell loads remotes through a manifest pointing to separate Cloudflare Workers deployments, and both remotes exchange data through `BroadcastChannel`. There is no root README; folder READMEs are Angular CLI boilerplate. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:350` records rank 349, ID 1238664148, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:350` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:30073` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:30080` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-05` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T21:51:22.008Z / 2026-10-08T15:42:43.341Z |

Hit metadata: null description, no topics, language TypeScript, no license, `fork: false`, size 257, created at 2026-05-14T10:32:10Z, pushed at 2026-06-08T14:47:23Z.

There is no root README at the SHA, description is null and folder READMEs (`shell/README.md`, `athletes/README.md`, `ranking/README.md`) do not contain the term (search for `microfrontend`/`micro-frontend` in `*.md`: no occurrences). The only compatible searched field is the repository name; this only explains the match and is not used as architectural evidence. Folder READMEs come from root commit `73c274c` (2026-05-14), before the October 2026 collections.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 97 entries, all regular files `100644`; zero symlinks and zero gitlinks. Three Angular workspaces (`shell`, `athletes`, `ranking`), each with `angular.json`, `package.json`, `bun.lock`, `federation.config.js`, `src/main.ts` → `src/bootstrap.ts` and `wrangler.jsonc`. | strong |
| Configuration (shell) | `shell/federation.config.js:3–8`: `withNativeFederation({ name: 'shell', shared: shareAll(singleton) })`; `shell/public/federation.manifest.json:1–4`: `athletes` → `https://mf-angular-athletes.lenetlaurine.workers.dev/remoteEntry.json`, `ranking` → `https://mf-angular-ranking.lenetlaurine.workers.dev/remoteEntry.json`; `shell/src/main.ts:3–6`: `initFederation('federation.manifest.json')` before bootstrap. | strong |
| Configuration (remotes) | `athletes/federation.config.js:3–9`: `name: 'athletes'`, `exposes` `./Component` (`race.ts`) and `./Routes` (`shell.routes.ts`). `ranking/federation.config.js:3–8`: `name: 'ranking'`, `exposes` `./Component` (`app.ts`). `athletes/public/_headers:1–2` (and equivalent in `ranking/public/`): CORS `*`. | strong |
| Source code (composition) | `shell/src/app/app.routes.ts:10–19`: route `athletes` with `loadRemoteModule('athletes', './Routes')` → `m.routes` and route `ranking` with `loadRemoteModule('ranking', './Component')` → `m.App`; `shell/src/app/dashboard/dashboard.ts:54–79`: dashboard loads both `./Component` and mounts them through `createComponent` in side-by-side panels. Exported names match (`athletes/src/app/shell.routes.ts:7`; `athletes/src/app/race/race.ts:19`; `ranking/src/app/app.ts:19`). `shell/src/app/app.html:1–8`: common navigation. | strong |
| Source code (communication) | `athletes/src/app/race/race.ts:36`, `46`, `55` publish positions on a `BroadcastChannel`; `ranking/src/app/app.ts:11`, `38–48` subscribe to it. Runtime communication without code imports. | moderate |
| Build/deploy | One `wrangler.jsonc` per unit (`shell/wrangler.jsonc:3`, `athletes/wrangler.jsonc:3`, `ranking/wrangler.jsonc:3`: `mf-angular-shell`, `mf-angular-athletes`, `mf-angular-ranking`), each publishing its own `dist/<app>/browser`; worker names match manifest hosts. Commit `342c92d`: “feat: deployment”. | strong |
| Source code (boundaries) | Search for `../` in `*.ts`, `*.js`, `*.json`, `*.css` and `*.html` (except lockfiles): only relative `routerLink` within `athletes` (`athletes/src/app/athlete-detail/athlete-detail.html:2`; `athletes/src/app/athlete-list/athlete-list.html:6`). No source code import between the three units. | strong |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 4 commits (4 across all refs), no merges: three by `Laurine <lenetlaurine@gmail.com>` (2026-05-14 to 2026-05-29: “working”, “routing in athlete”, “routing”) and SHA `342c92d` (2026-06-08, “feat: deployment”) by `HCaupert <hcaupert@takima.fr>`. The account has other MFE variations in the rounds (`LaurineLeNet/microfrontend-gateway`, `microfrontend-single-spa`, `microfrontend-react-mod-fed`, `microfrontend-mamiejs-angularnew`; `data/discovery/mfe-round-002/candidates.csv:30075`, `30078`, `30313`, `30738`); only this one is in the sample. `git rev-list --objects $SHA --missing=print` identifies 18 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `shell`, `athletes` and `ranking`, both remotes referenced by the manifest (`shell/public/federation.manifest.json:1–4`). |
| Q2 | Yes | Own entry point, `federation.config.js`, lockfile and deployment per unit (`wrangler.jsonc` in each folder); no source code import between them. |
| Q3 | Yes | The shell routes and mounts remotes (`shell/src/app/app.routes.ts:10–19`; `shell/src/app/dashboard/dashboard.ts:54–79`). |
| Q4 | Yes | Native Federation configured on both sides, with matching names and exposed keys and manifest pointing to separate deployments, and used through `initFederation` + `loadRemoteModule`. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- Q1–Q5 are Yes, satisfying the `MFE-implemented` rule. It matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”; same approach as final 059 (Native Federation with manifest), here with separate deployment per unit.
- The chain is complete and connectable (contrast with 097/103/104), comparable to complete-chain cases (076/084/096/106/109). Remotes expose screens and routes, not utilities (contrast with 089/100).
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (Native Federation over the Angular application builder), `repo_type: example`.
- There is no open decision.

## Analysis notes

- **RQ2:** Native Federation with runtime manifest and deployment of each unit as a Cloudflare Worker serving static assets with CORS (`_headers`).
- **RQ3:** communication between remotes through `BroadcastChannel` (`athletes-positions`), without shell-shared state; the same remote is consumed in two ways (routes and component mounted in the dashboard).
- **Protocol (family):** the account maintains several MFE variants in the rounds, named by technology; only this one is in the sample.

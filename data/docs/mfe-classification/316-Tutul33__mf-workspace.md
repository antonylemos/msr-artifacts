---
schema: 1
id: 1098942873
full_name: Tutul33/mf-workspace
url: https://github.com/Tutul33/mf-workspace
commit: eb6d1cc782f44fa05b6a6d83c23edf20487af9db
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

# 316 — Tutul33/mf-workspace

## Context

Angular 20 workspace with `@angular-architects/native-federation`, assembled as a step-by-step guide (`README.md:1–3`). Three projects in `projects/`:
- `host-app` (port 4200);
- `customer-app` (port 4301);
- `orders-app` (port 4302).

Host route-loads route modules exposed by both remotes, using `loadRemoteModule`. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:317` records rank 316, ID 1098942873, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:317` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:21202` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:21208` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-11` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:17:25.775Z / 2026-10-08T15:40:03.503Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:45.099Z / 2026-10-08T15:48:26.230Z |

Effective queries append `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Hit metadata:
- null description, no topics, language HTML, `fork: false`, size 143;
- created at 2025-11-18T10:49:50Z, pushed at 2025-11-18T11:00:09Z.

README spellings:
- “Microfrontend”: `README.md:1` (“# Angular 20 + Native Federation (Microfrontend) — Step-by-Step Guide”) and `README.md:3` (“…microfrontend setup…”);
- “microfrontends”: `README.md:258` (“- Two remote microfrontends”).

README's last change is the SHA itself (2025-11-18), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 65 entries, all regular `100644` files; zero symlinks and zero gitlinks. Three projects in `projects/` (54 files), each with `federation.config.js`, `src/main.ts` → `bootstrap.ts` and its own tsconfigs. Root contains one `angular.json`, one `package.json` and a guide (`angular_20_microfrontend_app_guide.md`). | context |
| Builds | `angular.json`: all three projects use builder `@angular-architects/native-federation:build` (`:18`, `131`, `244`) over `@angular/build:application` (`:60`, `173`, `286`), with `dev-server` on ports 4200, 4301 and 4302 (`:114`, `227`, `340`). | strong |
| Remotes | `projects/customer-app/federation.config.js:5–10`: `name: 'customer-app'`, `exposes: { './CustomerRoutes': …customer-routes.module.ts }`. `projects/orders-app/federation.config.js:5–10`: `name: 'orders-app'`, `exposes: { './OrdersRoutes': … }`. Exposed modules are `RouterModule.forChild` with page `Home` (`customer-routes.module.ts:5–12`; `orders-routes.module.ts:5–12`). | strong |
| Host | `projects/host-app/src/app/app.routes.ts:2–20`: routes `customers` and `orders` with `loadChildren: () => loadRemoteModule({ remoteEntry: 'http://localhost:4301/remoteEntry.json', exposedModule: './CustomerRoutes' })` and same for `4302`/`./OrdersRoutes`. `app.html:1–3`: links and `<router-outlet>`. `federation.config.js:3–27`: singleton `shareAll`. | strong |
| Inconsistency | `projects/host-app/src/main.ts:3–5`: `initFederation({ customerApp: 'http://localhost:4200/remoteEntry.json' })` points to host's own port, with a name matching no remote. Routes do not use this map: pass `remoteEntry` URL directly to `loadRemoteModule`. | ambiguous |
| Source code (boundaries) | Search for `../../` imports in `projects/`: none. Each project imports only its own files and npm packages. Dependencies live in a single workspace `package.json`, standard in Angular CLI. | context |

## Authorship and history

Non-shallow clone; 5 linear commits, no merges, all by Tutul Chakma, on 2025-11-18, from `1137709` (“initial commit”) to SHA `eb6d1cc` (“Commit”). Only branch `master`. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Host and two remotes in repository, referenced by host routes (`app.routes.ts:9–10`, `17–18`). |
| Q2 | Yes | Each project has its own entry (`main.ts` → `bootstrap.ts`), `native-federation` build and port in `angular.json`, without source code imports between projects. |
| Q3 | Yes | Host routes and mounts remote modules at `customers` and `orders` (`app.routes.ts:4–20`; `app.html:3`). |
| Q4 | Yes | Native Federation: `loadRemoteModule` with `remoteEntry`/`exposedModule` coherent with remote `exposes` and `angular.json` ports. |
| Q5 | Yes | Q1–Q4 are Yes: host and remotes composed at runtime, with complete snapshot chain. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in case “monorepos containing a host and its remotes”. Chain is complete in snapshot, as in 076/084/096/106/109.
- `initFederation` with incorrect URL does not prevent composition, because routes load remotes through direct URLs.
- **Fields:** `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (as in final 059, Angular `application` builder with Native Federation), `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example` (step-by-step guide).
- No decision remains open.

## Analysis notes

- **RQ2:** Native Federation in Angular 20 with route modules (`NgModule` + `RouterModule.forChild`) exposed and loaded through `loadChildren`.
- **Protocol (search):** both spellings are literally in README. Eligibility changes from `unknown` (001) to `pass` (002).

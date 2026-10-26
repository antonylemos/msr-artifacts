---
schema: 1
id: 1134331975
full_name: andreea-lipan/cozy-desk-micro-frontends
url: https://github.com/andreea-lipan/cozy-desk-micro-frontends
commit: 7050669405cfdce6e0bf593fdfdb4d94ef5ad5dc
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

# 139 — andreea-lipan/cozy-desk-micro-frontends

## Context

Angular micro-frontends tutorial with Native Federation (`@angular-architects/native-federation`). Three independent Angular projects at repository root: `test-base`, dynamic host at port 4200, and remotes `tea-tracker` (4222) and `sticky-notes` (4333) (`README.md:1`; `README.md:30–38`; `README.md:141–183`). Host loads each remote through a route using federation manifest. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:140` records rank 139, ID 1134331975, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:140` records strategy `terminology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:23372` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:23379` (`terminology`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same two hits in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-01` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T22:29:39.577Z / 2026-10-08T15:57:17.577Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-01` | `"micro frontends" … created:2026-01-01..2026-01-31` | 2026-10-07T22:59:16.743Z / 2026-10-08T16:07:38.509Z |

Hit metadata: null description, no topics, HTML language, `fork: false`, creation at 2026-01-14T15:18:44Z, push at 2026-01-14T16:09:49Z. README contains both literal spellings: singular “micro frontend” in `README.md:24` (“(or micro frontend)”) and `README.md:93`, and plural “micro frontends” in `README.md:1` (“# Micro frontends in Angular”), `README.md:15` and `README.md:17`.

Last README change is SHA itself, `7050669` (2026-01-14T18:09:45+02:00), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 96 entries, all regular files `100644`; zero symlinks and zero gitlinks. Three sibling Angular projects, `test-base/`, `tea-tracker/` and `sticky-notes/`, each with `package.json`, `package-lock.json`, `angular.json`, `federation.config.js`, `tsconfig*` and `src/`, and one `README.md` at root. No root manifest or workspaces. | context |
| Configuration (host) | `test-base/federation.config.js:3–8`: `withNativeFederation({ name: 'test-base', shared: shareAll(...) })`, without `exposes`. `test-base/public/federation.manifest.json:1–4`: `"tea-tracker": "http://localhost:4222/remoteEntry.json"` and `"sticky-notes": "http://localhost:4333/remoteEntry.json"`. `test-base/src/main.ts:1–6`: `initFederation('federation.manifest.json')` before bootstrap. `public/` is copied as asset (`test-base/angular.json:48–53`). | strong |
| Configuration (remotes) | `tea-tracker/federation.config.js:3–8` and `sticky-notes/federation.config.js:3–8`: `name` matching manifest key and `exposes: { './App': './src/app/app.ts' }`. Dev ports 4222 and 4333 in `serve-original` (`tea-tracker/angular.json:97`; `sticky-notes/angular.json:96–98`), matching manifest URLs. Each remote also calls `initFederation()` (`tea-tracker/src/main.ts:1–6`; `sticky-notes/src/main.ts:1–6`). | strong |
| Source code (consumption) | `test-base/src/app/app.routes.ts:11–19`: routes `tea-tracker` and `sticky-notes` with `loadComponent: () => loadRemoteModule('<remote>', './App').then((m) => m.App)`. `test-base/src/app/app.html:5–27`: menu with `routerLink` for routes and `<router-outlet>`. Exposed modules export `App` (`tea-tracker/src/app/app.ts:11–13`; `sticky-notes/src/app/app.ts:11–13`), rendering feature component (`<app-tea-tracker/>` and `<app-sticky-notes/>` at line 1 of each `src/app/app.html`). | strong |
| Source code (boundaries) | Search for `../` in `*.ts`, `*.js` and `*.json` (except lockfiles): no occurrence. Imports are local to each project (for example, `tea-tracker/src/app/app.ts:3`; `test-base/src/app/app.routes.ts:2`). Host accesses remotes only through `loadRemoteModule`. | context |
| Build/deploy | Each project has builder `@angular-architects/native-federation:build` wrapping `@angular/build:application` (esbuild) and its `dev-server` (`test-base/angular.json:16–99`; `tea-tracker/angular.json:17`, `31`, `44`, `86`; `sticky-notes/angular.json:16–99`), with `browser: src/main.ts` and polyfill `es-module-shims`. Scripts `ng serve`/`ng build` are own to each `package.json` (`test-base/package.json:4–10`). | moderate |
| Technology | In all three lockfiles: `@angular-architects/native-federation` 21.0.4, `@angular/build` 21.0.5 and `@angular/core` 21.0.8 (`*/package-lock.json:264–265`, `994–995`, `1191–1192`). | context |
| Documentation | `README.md:91–208`: creation of remote `tea-tracker` with `ng g @angular-architects/native-federation:init --type remote --port 4222`. `README.md:288–331`: creation of host as `dynamic-host` at port 4200. `README.md:336–357`: routes with `loadRemoteModule`. `README.md:364–431`: manifest and execution (`ng serve --port 4222`, `ng serve --port 4200`). Tutorial uses `src/assets/federation.manifest.json` (`README.md:366–395`), but code uses `public/federation.manifest.json` and `initFederation('federation.manifest.json')`, consistent with one another. | moderate |

## Authorship and history

Non-shallow clone; 3 commits, no merge, all by `andreea <andreea.alexandra.lipan@gmail.com>` on 2026-01-14. Root `6e2d0ab` (“first commit”, 17:20) adds all three projects, README and tutorial images; `0a2cc14` and SHA `7050669` (“update readme”, 18:05 and 18:09) only change `README.md` (`git log --no-renames --name-status`). Since host and remotes enter together, history records no separate unit evolution. Metadata indicate no third-party code beyond Angular and Native Federation scaffolds described in tutorial. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three frontend units in repository, `test-base`, `tea-tracker` and `sticky-notes`, each with own entry (`*/angular.json`, `browser: src/main.ts`). Host manifest references both remotes (`test-base/public/federation.manifest.json:1–4`). |
| Q2 | Yes | Each unit has own `package.json`, lockfile, `angular.json`, `federation.config.js`, port and build. No source-code import between them (search for `../` has no occurrences); host only uses `loadRemoteModule`. |
| Q3 | Yes | Host routes and mounts remotes in its `router-outlet` (`test-base/src/app/app.routes.ts:11–19`; `test-base/src/app/app.html:5–27`). |
| Q4 | Yes | Native Federation configured on both sides, with consistent names, key `./App`, export `App` and ports (`test-base/public/federation.manifest.json:1–4`; `tea-tracker/federation.config.js:3–8`; `sticky-notes/federation.config.js:3–8`; `tea-tracker/angular.json:97`; `sticky-notes/angular.json:97`), initialized (`test-base/src/main.ts:3`) and consumed in code (`test-base/src/app/app.routes.ts:14`, `18`). |
| Q5 | Yes | Q1–Q4 are Yes: complete and connectable dynamic host → two remotes chain. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “examples, templates, and proofs of concept that actually compose frontend units”, with `repo_type: example` (step-by-step tutorial; `README.md:84–88`). Same approach as 059 (Native Federation) and complete chain as 076/084/096/106/109.
- Unlike 097/103/104, names, URLs, ports and exposes align. Unlike 089/100, each remote exposes entire application component (`App`), mounted as host route, not an isolated presentation component.
- `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (`@angular/build:application` wrapped by Native Federation builder), following 059 convention. `frontend_units: 3`. `unit_organization: monorepo`: sibling projects in same repository, without workspace tooling, as in 136.
- No decision remains open: runtime composition through Native Federation, without iframe, links between applications or build-time packages.

## Analysis notes

- **RQ2:** Native Federation (Angular 21) with `dynamic-host` host using manifest in `public/` and `loadRemoteModule` in `loadComponent` routes. Remotes expose root application component.
- **RQ1:** README tutorial diverges from code in path detail (`src/assets/` vs `public/`) and omits `sticky-notes` port. Versioned artifacts should prevail over text.
- **Protocol (search):** README literally contains searched singular and plural spellings. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, three units, `native-federation` and `esbuild`; no open decision. Most direct final comparator: 059 (Angular 21, Native Federation, esbuild, host and two remotes, MFE-implemented with Q1–Q5 Yes); 076 is also a shell/remotes example, but is `draft`. Case differs from 059 as tutorial/example rather than production. First commit (`6e2d0ab`, 2026-01-14) introduces host and remotes together, without separate unit evolution, and already recorded differences between README tutorial text and snapshot code do not change class. README predates searches (last commit at SHA itself, 2026-01-14).

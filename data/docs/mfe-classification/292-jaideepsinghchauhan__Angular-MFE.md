---
schema: 1
id: 1010507438
full_name: jaideepsinghchauhan/Angular-MFE
url: https://github.com/jaideepsinghchauhan/Angular-MFE
commit: 7648339ce74e8c78f86680e8ef8011e1010cc3e3
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 292 — jaideepsinghchauhan/Angular-MFE

## Context

Nx 21 monorepo with Angular 20 and Module Federation (`@nx/module-federation`): one host (`appshell/host`) and two remotes (`appshell/mfe1`, `appshell/mfe2`), plus two shared libraries, one for data and another for UI (`README.md:1–3`; `libs/shared/data`, `libs/shared/ui`). Host loads remote-exposed routes through lazy loading. Also `apps/angular-monorepo`, the default Nx-generated application, without a composition relationship. README is a workspace setup tutorial. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:293` records rank 292, ID 1010507438, status `cloned`, branch `master` (default) and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:293` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:15772` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:15776` (`technology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-06` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-06-01..2025-06-30` | 2026-10-07T23:18:22.174Z / 2026-10-08T16:15:05.653Z |

Hit metadata (same in both rounds): null description, no topics, language TypeScript, `fork: false`, size 265, created at 2025-06-29T08:08:34Z, pushed at 2025-06-29T08:22:08Z.

Without a description, hit comes from README: “module federation” at `README.md:134` (“the mapping in host module federation config file for both mfes”), `:138` and `:171` (“Update mfe1 module federation with this new route”).

README's last change is SHA (2025-06-29T13:52:07+05:30, i.e., 08:22:07Z), matching `pushed_at` and preceding October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 141 entries, all regular `100644` files; zero symlinks and zero gitlinks. Nx workspace (`nx.json`, `package.json`, `tsconfig.base.json`) with `appshell/host`, `appshell/mfe1`, `appshell/mfe2` (each with `project.json`, `module-federation.config.ts`, `webpack.config.ts`, `webpack.prod.config.ts` and `src/`), e2e projects, `libs/shared/data`, `libs/shared/ui` and `apps/angular-monorepo` (default Nx app). | context |
| Configuration (host) | `appshell/host/module-federation.config.ts:3–18`: `name: 'host'`, `remotes: ['mfe1', 'mfe2']`. `appshell/host/webpack.config.ts:1–9` and `webpack.prod.config.ts:9–24`: `withModuleFederation(config)`. `appshell/host/project.json:10`, `:15`, `:25–26`: `@nx/angular:webpack-browser` build with its own entry; `:59–64`: `module-federation-dev-server` on port 4200. | strong |
| Configuration (remotes) | `appshell/mfe1/module-federation.config.ts:3–10`: `name: 'mfe1'`, `exposes: { './Routes': …/entry.routes.ts, './GreetingComponent': …/greeting.component.ts }`. `appshell/mfe2/module-federation.config.ts:3–8`: `name: 'mfe2'`, `exposes: { './Routes': …/entry.routes.ts }`. Their own builds (`appshell/mfe1/project.json:10`, `:15`; ports 4201 and 4202 in `appshell/mfe1/project.json:63` and `appshell/mfe2/project.json:63`). | strong |
| Source code (composition) | `appshell/host/src/main.ts:1` → `bootstrap.ts:1–5`. `appshell/host/src/app/app.routes.ts:5–12`: routes `mfe2` and `mfe1` with `loadChildren: () => import('mfe2/Routes')` / `import('mfe1/Routes')`, obtaining `remoteRoutes`, exported by `appshell/mfe1/src/app/remote-entry/entry.routes.ts:4`. `appshell/host/src/app/app.html:1–5`, `:17`: menu and `router-outlet`. | strong |
| Configuration (mismatched link) | `appshell/host/src/app/app.routes.ts:13–17` imports `mfe1/GreetingRoutes` (declared in `appshell/host/src/remotes.d.ts:8–11`), but `mfe1` exposes `./GreetingComponent`, rather than `./GreetingRoutes` (`appshell/mfe1/module-federation.config.ts:5–8`). README itself instructs adding `./GreetingRoutes` (`README.md:171–176`) and shows file with `./GreetingComponent` (`:181–189`). Route `/greeting` has no corresponding module; routes `mfe1` and `mfe2` do. | ambiguous |
| Source code (boundaries) | Active search for relative `../../` imports in `appshell`, `apps` and `libs`: only `eslint.config.mjs` importing root configuration. Host and `mfe1` use shared libraries through aliases (`appshell/host/src/app/app.ts:4–5`; `appshell/mfe1/src/app/remote-entry/entry.ts:4`; `tsconfig.base.json:18–19`). `tsconfig.base.json:20–21` maps `mfe1/Routes` and `mfe2/Routes` to remote sources, Nx's typing convention; at build, `withModuleFederation` treats these modules as remotes. No direct file imports between apps. | context |
| Documentation | `README.md:1–3`: “1 host/Appshell and 2 MFE's and 2 Libraries”; `README.md:131–144`: host and remote generation steps and explanation of connection through remote entry and lazy loading. | moderate |

## Authorship and history

Non-shallow clone. 4 commits (4 across all refs), no merges:
- `f716548` (2025-06-17, “Initial commit”) and `6a85acf` (2025-06-29, “Initial commit”, adding workspace) are by `Singh, Jaideep <jaideep.singh@dell.com>`, with same committer;
- `0a0848e` and SHA `7648339` (2025-06-29, “Update README.md”) are by `Jaideep singh <johny.s.chauhan@gmail.com>`, with committer `GitHub`.

`git rev-list --objects $SHA --missing=print` lists 7 missing objects, none in SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units: `host`, `mfe1` and `mfe2`, remotes referenced in `remotes: ['mfe1', 'mfe2']` (`appshell/host/module-federation.config.ts:17`). `apps/angular-monorepo` and libraries are not counted. |
| Q2 | Yes | Each unit has its own `project.json`, entry, webpack config and build (for example, `appshell/host/project.json:10–26`; `appshell/mfe1/project.json:10–26`). No source code imports between apps; sharing is through libraries and Nx type mapping (recorded search). |
| Q3 | Yes | Host routes and loads remote routes (`appshell/host/src/app/app.routes.ts:5–12`; `app.html:1–5`, `:17`). |
| Q4 | Yes | Module Federation configured on both sides, with matching names and exposed module `./Routes` for `mfe1` and `mfe2` (`appshell/mfe1/module-federation.config.ts:4–6`; `appshell/mfe2/module-federation.config.ts:4–6`; `app.routes.ts:7`, `:11`). Additional link `mfe1/GreetingRoutes` matches no `exposes`, but does not invalidate both main connections. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- Complete chain as in 076/084/096/106/109 for routes `mfe1` and `mfe2`.
- Mismatch `GreetingRoutes` × `GreetingComponent` affects only an extra route, unlike 103/193, where main connection was uncertain.
- Not code sharing (089/100): remotes expose routes mounted by host router. Shared libraries (button and `UserService`) are parallel build-time integration, rather than composition mechanism.
- `frontend_units: 3`, `unit_organization: monorepo`, `ui_technologies: [angular]`, `build_tools: [webpack]` (`@nx/angular:webpack-browser`), `approaches: [module-federation]`, `repo_type: example` (tutorial in `README.md`).
- No open decision changes class.

## Analysis notes

- **RQ1:** tutorial README differs from code (`README.md:171–176` requests `./GreetingRoutes`; configuration has `./GreetingComponent`), and host imports nonexistent module. Citing README as configuration would produce an apparently complete chain also for `/greeting`.
- **RQ3:** mappings `mfe1/Routes` and `mfe2/Routes` in `tsconfig.base.json:20–21` point to remote sources by Nx convention. An automatic cross-import search would see coupling; `withModuleFederation` packaging treats these specifiers as remotes.
- **Checklist:** if researchers consider a mismatched exposed/consumed link should make Q4 Undetermined even when other links connect, as in 193, class would become `Uncertain`. This draft does not adopt that reading, because main routes match.
- **Protocol (search):** entry only through technology query `"module federation"` in README. Eligibility changes from `unknown` (001) to `pass` (002).

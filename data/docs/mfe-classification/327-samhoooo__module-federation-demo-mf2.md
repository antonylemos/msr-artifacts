---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
url: https://github.com/samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 327 — samhoooo/module-federation-demo-mf2

## Context

Module Federation 2.0 example with React and Rspack (`README.md:1–14`; description and homepage in a Medium article). `header-app` is the remote, exposing `./Header`, publishing `mf-manifest.json` and generating types. `home-app` is the host, consuming `HeaderApp/Header` through the manifest. Both apps are independent, without a root workspace. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:328` records rank 327, ID 1330154796, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:328` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:35115` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:35121` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same eight hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontend`: `topic:microfrontend` | no partition | 2026-10-07T18:18:32.629Z / 2026-10-08T15:34:17.861Z |
| `terminology-topic-microfrontends`: `topic:microfrontends` | no partition | 2026-10-07T18:18:43.496Z / 2026-10-08T15:34:28.993Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-08` | 2026-10-07T22:03:25.543Z / 2026-10-08T15:43:54.026Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-08` | 2026-10-07T22:14:21.283Z / 2026-10-08T15:50:38.475Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-08` | 2026-10-07T22:41:19.736Z / 2026-10-08T16:01:41.703Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-08` | 2026-10-07T23:11:30.673Z / 2026-10-08T16:10:23.632Z |
| `technology-topic-module-federation`: `topic:module-federation` | no partition | 2026-10-07T23:13:42.957Z / 2026-10-08T16:11:12.560Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-08` | 2026-10-07T23:29:42.617Z / 2026-10-08T16:19:11.037Z |

Queries append `pushed:>=2025-04-01` and, when partitioned, `created:2026-08-01..2026-08-31`.

Hit metadata (identical in both rounds): description “A simple demo on Microfrontend with Module Federation 2.0 in React”; topics including `microfrontend`, `microfrontends`, `microfront-end`, `microfrontends-demo` and `module-federation`; language JavaScript; `fork: false`; size 29; homepage in a Medium article; created at 2026-08-10T18:56:01Z; pushed at 2026-08-11T19:33:23Z.

**Spellings:**
- **Topics:** the three `topic:` hits directly match topics.
- **Description:** “Microfrontend” and “Module Federation”.
- **README:** “micro frontend” in `README.md:3` (“designed with micro frontend architectural pattern using Module Federation 2.0”) and “Module Federation” in the same passage.
- **Plurals:** “microfrontends” and “micro frontends” do not appear in description or README; these hits depend on search text processing, which is not recorded.

The README was last changed at the SHA (2026-08-11T20:33:23+01:00, that is, 19:33:23Z), equal to `pushed_at` and before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 29 entries, all regular files `100644`; zero symlinks and zero gitlinks. Two independent projects, `header-app/` and `home-app/`, each with `package.json`, `rspack.config.js`, `public/index.html`, `src/` and `tsconfig.json`; `home-app/@mf-types/` versions generated remote types. No `package.json` at the root. | context |
| Configuration (remote) | `header-app/rspack.config.js:57–75`: `ModuleFederationPlugin({ name: "HeaderApp", filename: "remoteEntry.js", exposes: { "./Header": "./src/App" }, dts: true, shared: react/react-dom singleton })`; `:7`, `:9–12`, `:22–24`: entry point `./src/entry.ts`, port 4001, `publicPath` `http://localhost:4001/`. | strong |
| Configuration (host) | `home-app/rspack.config.js:46–66`: `ModuleFederationPlugin({ name: "HomeApp", remotes: { HeaderApp: "HeaderApp@http://localhost:4001/mf-manifest.json" }, dts: true, shared … })`; `:6`, `:8–10`: own entry point and port 4000. | strong |
| Source code (composition) | `home-app/src/App.tsx:11`, `:13`, `:18–20`: imports `HeaderVariant` and `lazy(() => import('HeaderApp/Header'))` and renders `<Header title=… variant=… />` in `Suspense`. `header-app/src/App.tsx:4–22`: component `App` with props `title` and `variant`, exported as default. | strong |
| Configuration (chain match) | Name `HeaderApp` and port 4001 in host `remotes` match remote `name` and `devServer.port`; module `HeaderApp/Header` matches `exposes: "./Header"`. | strong |
| Source code (boundaries) | Active search for `../` in `header-app/src` and `home-app/src`: no occurrences. The host does not import remote sources: `home-app/tsconfig.json:15–17` maps `HeaderApp/*` to `./@mf-types/HeaderApp/*`, a copy of generated types (`home-app/@mf-types/HeaderApp/Header.d.ts:1–2`). | context |
| Build/deploy | Own builds with Rspack (`header-app/package.json:9–13`; `home-app/package.json:9–13`); separate development servers (4000/4001). Independent deployment is not provisioned. | moderate |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 3 commits (3 across all refs), no merges, with the same email `samho1996@gmail.com`:
- `eeac072` (2026-08-10, `samhoooo`, “Add Module Federation 2 demo: header-app remote + home-app host”) adds code;
- `0a010ce` and SHA `0a621b6` (2026-08-10 and 2026-08-11, `Sam Ho`, committer `GitHub`) edit the README.

`git rev-list --objects $SHA --missing=print` lists 2 missing objects, none in the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units, `header-app` and `home-app`, the first referenced in host `remotes` (`home-app/rspack.config.js:51–53`). |
| Q2 | Yes | Own entry point, Rspack configuration, port and build for each app (`header-app/rspack.config.js:7`, `:9–12`; `home-app/rspack.config.js:6`, `:8–10`; both `package.json:9–13`). No source code import between them (recorded search). |
| Q3 | Yes | The host mounts the remote component on its page (`home-app/src/App.tsx:13`, `:18–20`). |
| Q4 | Yes | Module Federation 2.0 configured on both sides, with matching manifest, name, port and exposed module, consumed through `import('HeaderApp/Header')`. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. It matches “examples… that actually compose frontend units” and “monorepos containing a host and its remotes”.
- Same form as final 052, where the host mounts `headerMf/Header` (and `productsMf/Products`) through `React.lazy`. Here the remote exposes a layout section (header with variants), not a utility.
- **Granularity:** the remote exposes a single page component. The minimum exposure or code sharing question remains open in 089/100 and was raised in 193 (draft, also with a single component). This case is not treated as code sharing, because the component is a UI section mounted by the host, like the `Header` accepted in 052.
- This is not an unconnectable chain (097/103/104): name, manifest and module match.
- `frontend_units: 2`, `unit_organization: monorepo` (two projects in one repository, without a workspace), `ui_technologies: [react]`, `build_tools: [rspack]`, `approaches: [module-federation]`, `repo_type: example`.
- There is no open decision specific to this case.

## Analysis notes

- **RQ2:** MF 2.0 with `@module-federation/enhanced/rspack`, remote resolved through `mf-manifest.json` and generated remote types (`dts: true`) versioned in `home-app/@mf-types/`.
- **Checklist:** if the 089/100 decision treats single-component exposure as code sharing, this case and 193 should be reviewed together. Final 052, with `Header` and `Products`, indicates exposed layout sections count as composition.
- **Protocol (families):** the same owner has `samhoooo/module-federation-demo-react` in the rounds (`data/discovery/mfe-round-002/candidates.csv:5609`), outside the sample and not inspected.
- **Protocol (search):** eight hits (topics, description and README). Plurals have no literal spelling in description or README. Eligibility changes from `unknown` (001) to `pass` (002).

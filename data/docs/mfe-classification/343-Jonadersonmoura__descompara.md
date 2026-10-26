---
schema: 1
id: 1316095122
full_name: Jonadersonmoura/descompara
url: https://github.com/Jonadersonmoura/descompara
commit: 3dd51466a7d9eece3bcb46e0663ad5ad614daf32
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 343 — Jonadersonmoura/descompara

## Context

POC for an automotive insurance system (“Descompara Seguros”) in Angular 22 + Nx with Native Federation (`@angular-architects/native-federation`) (`README.md:1–13`). A `shell` (host, port 4200) discovers three remotes at runtime through a manifest: `marAberto` (4201), `intranet` (4202) and `admin` (4203). Libraries `libs/shared/*` (types, UI, data-access, guards, theme) are shared through path mapping (`README.md:15–31`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:344` records rank 343, ID 1316095122, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:344` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:34410` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:34416` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same five hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | code | `…#size:2000..2249` | `package.json` | 2026-10-07T19:59:50.512Z / 2026-10-08T15:42:49.049Z |
| `technology-native-federation-package-code`: `"@angular-architects/native-federation" filename:package.json` | code | no partition | `package.json` | 2026-10-07T22:12:44.990Z / 2026-10-08T15:55:59.759Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | repositories | `…#created:2026-07` | empty | 2026-10-07T21:52:21.405Z / 2026-10-08T15:43:27.808Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | repositories | `…#created:2026-07` | empty | 2026-10-07T22:13:48.430Z / 2026-10-08T15:50:19.281Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2026-07` | empty | 2026-10-07T23:28:59.650Z / 2026-10-08T16:18:56.800Z |

Repository queries append `pushed:>=2025-04-01 created:2026-07-01..2026-07-31`.

Hit metadata (identical in both rounds): null description, no topics, language JavaScript, `fork: false`, size 307, created at 2026-07-29T12:15:36Z, pushed at 2026-07-29T12:37:31Z.

Matches at the SHA:
- **Code:** `package.json` (2.051 bytes, within the range) declares `@module-federation/enhanced` (`:18`) and `@angular-architects/native-federation` (`:58`).
- **“microfrontends” and “module federation”:** `README.md:3` (“construído como microfrontends com Angular 22 + Nx, usando Module Federation nativo”; English translation: “built as microfrontends with Angular twenty-two + Nx, using native Module Federation”), also `:31`.
- **“microfrontend”:** the singular does not appear literally; this hit depends on GitHub search text processing, which is not recorded.

The README exists only in the single commit, the SHA (2026-07-29T09:37:20-03:00, that is, 12:37:20Z), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 273 entries, all regular files `100644`; zero symlinks and zero gitlinks. Nx workspace with `shell/`, `marAberto/`, `intranet/` and `admin/` (each with `project.json`, `federation.config.mjs`, `src/main.ts`, `src/bootstrap.ts`), e2e projects, `libs/shared/{types,ui,data-access,guards,theme}` and coding assistant skill/configuration files. | strong |
| Configuration (host) | `shell/federation.config.mjs:3–18`: `withNativeFederation({ name: 'shell', shared: shareAll(singleton, strictVersion) })`. `shell/public/federation.manifest.json:1–5`: `admin` → `http://localhost:4203/remoteEntry.json`, `intranet` → `:4202`, `marAberto` → `:4201`. `shell/src/main.ts:3–5`: `initFederation('/federation.manifest.json')` before bootstrap. | strong |
| Configuration (remotes) | `admin/federation.config.mjs:4`, `:8–10`: `name: 'admin'`, `exposes: { './Routes': './admin/src/app/remote-entry/entry.routes.ts' }`; same in `intranet/federation.config.mjs:4`, `:8–10` and `marAberto/federation.config.mjs:4`, `:8–10`. `admin/src/main.ts:3–5`: `initFederation({ admin: './remoteEntry.json' })` and own bootstrap (`admin/src/bootstrap.ts:1–5`). | strong |
| Source code (composition) | `shell/src/app/app.routes.ts:2`, `:4–20`: routes `''`, `intranet` and `admin` with `loadRemoteModule('<remote>', './Routes').then(m => m.remoteRoutes)`. `admin/src/app/remote-entry/entry.routes.ts:7–16` (and equivalents in `intranet` and `marAberto`): export `remoteRoutes` with `RemoteEntry`, `Home` and `Login`; `admin/src/app/remote-entry/entry.ts:6–13` applies the environment theme. | strong |
| Configuration (chain match) | Manifest names (`admin`, `intranet`, `marAberto`) match remote `name`; `./Routes` matches `exposes`; ports 4201–4203 match `serve` in each `project.json` (for example, `admin/project.json:131`). | strong |
| Build/deploy | `shell/project.json:10`, `:26`, `:64`, `:70`, `:91`: build `@angular-architects/native-federation:build` over `@angular/build:application`, `outputPath: dist/shell`, entry point `shell/src/main.ts`; `admin/project.json:10`, `:73`, `:79`, `:100`: same with `dist/admin`. Own dev-servers (ports 4200–4203). | moderate |
| Source code (boundaries) | Active search for relative `../../` imports in `shell`, `admin`, `intranet`, `marAberto` and `libs`: only lib `eslint.config.mjs` to root config. Apps use libs through aliases (`tsconfig.base.json:22–30`, for example `@descompara/shared-guards` in `admin/src/app/remote-entry/entry.routes.ts:2`) and theme through `@use 'libs/shared/theme/src/lib/tokens'` (`admin/src/styles.scss:1`). No direct import between apps. | context |
| Documentation | `README.md:48–52`: remotes expose `./Routes`, shell loads each at runtime through the manifest and `shareAll` guarantees a single Angular and RxJS instance. `README.md:56` claims guards are in `shell/src/app/app.routes.ts`, but code places them in remote routes (`admin/src/app/remote-entry/entry.routes.ts:12`). | moderate |

## Authorship and history

Non-shallow clone. There is 1 commit (1 across all refs), without merges: `3dd5146` (2026-07-29T09:37:20-03:00), author and committer `Jonaderson\Avaya <jmoura@avaya.com>`, “inclusão do projeto” (English translation: “addition of the project”), adding the entire workspace at once. Presence of `AGENTS.md`, `CLAUDE.md` and skills for various tools (`.agents/`, `.cursor/`, `.github/skills/` etc.) indicates coding assistant use; metadata does not distinguish intellectual authorship. `git rev-list --objects $SHA --missing=print` lists no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four units: `shell`, `marAberto`, `intranet` and `admin`, the remotes referenced in the federation manifest (`shell/public/federation.manifest.json:1–5`). Shared libs are not counted. |
| Q2 | Yes | Each unit has its own `federation.config.mjs`, entry point, `project.json`, build and dev-server (`shell/project.json:10–91`; `admin/project.json:10–131`). No source code import between apps; sharing uses aliased libs (recorded search). |
| Q3 | Yes | The shell routes and loads all three remotes (`shell/src/app/app.routes.ts:4–20`). |
| Q4 | Yes | Native Federation configured on both sides and used through `initFederation` + `loadRemoteModule`, with matching names, exposed module and ports. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. It matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- Same pattern as final 059 (Native Federation with manifest, `initFederation` and route-based `loadRemoteModule`, shared libs through path mapping).
- Complete chain as in 076/084/096/106/109.
- This is not code sharing (089/100): remotes expose entire application areas (routes with home and login).
- `frontend_units: 4`, `unit_organization: monorepo`, `approaches: [native-federation]`, `ui_technologies: [angular]`, `build_tools: [esbuild]` (builder `@angular/build:application` through Native Federation, as in 059), `repo_type: example` (“POC”, `README.md:3`, with mock data).
- There is no open decision.

## Analysis notes

- **RQ2:** Native Federation (Angular 22) with host JSON manifest, `initFederation` with a local map in remotes for standalone execution and `shareAll` with `strictVersion`. `package.json` also declares `@module-federation/enhanced` and `@nx/module-federation` (`package.json:18`, `:23`), unused by app federation configs.
- **RQ3:** environment theme through attribute `data-theme` in each remote root component, with CSS tokens from a shared lib (`README.md:33–46`; `admin/src/app/remote-entry/entry.ts:11`).
- **RQ1:** the README differs from code about guard location (`README.md:56` × `entry.routes.ts`).
- **Protocol (search):** the singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

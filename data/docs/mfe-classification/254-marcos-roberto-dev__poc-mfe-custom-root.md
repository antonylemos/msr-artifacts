---
schema: 1
id: 1131085284
full_name: marcos-roberto-dev/poc-mfe-custom-root
url: https://github.com/marcos-roberto-dev/poc-mfe-custom-root
commit: 6ae6565dc49a391729b62588c5fccf37d2be104b
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [vue]
build_tools: [vite, webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 254 — marcos-roberto-dev/poc-mfe-custom-root

## Context

Single-spa proof of concept with Vue 3 and Vite, in four independent folders, without a root README:
- `content-app` and `topbar-app`: micro-frontends exporting lifecycles `bootstrap`/`mount`/`unmount` through `single-spa-vue`;
- `root-app`: Vue “custom root” mounting both as single-spa parcels (`mountRootParcel`), resolved through a native import map;
- `root-classic`: classic single-spa root config (webpack, `single-spa-layout`, injected import map) registering the same two apps.

The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:255` records rank 254, ID 1131085284, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:255` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:23091` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:23098` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same four hits in each round, all from endpoint `code` and query `technology-single-spa-package-code`: `"single-spa" filename:package.json`.

| Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|
| `…#size:500..599` | `content-app/package.json` | 2026-10-07T22:14:11.747Z / 2026-10-08T15:57:41.924Z |
| `…#size:500..599` | `root-app/package.json` | 2026-10-07T22:14:11.747Z / 2026-10-08T15:57:41.924Z |
| `…#size:500..599` | `topbar-app/package.json` | 2026-10-07T22:14:11.747Z / 2026-10-08T15:57:41.924Z |
| `…#size:1450..1599` | `root-classic/package.json` | 2026-10-07T22:16:50.452Z / 2026-10-08T16:00:17.579Z |

The files declare `single-spa`:
- `content-app/package.json:12` and `topbar-app/package.json:12`, with `single-spa-vue`;
- `root-app/package.json:12–14`, with `single-spa-vue` and `vite-plugin-single-spa`;
- `root-classic/package.json:45–47`, with `single-spa-layout`.

Code hit metadata contains only the summarized repository object (ID, name, owner, null `description`, false `fork`, URLs), without enrichment fields; it is not an empty object. Folder READMEs are the “Vue 3 + TypeScript + Vite” template (`root-app/README.md:1–3`); entry is through code only.

In both rounds, the same account has another candidate, `marcos-roberto-dev/poc-web-components` (ID 1068467110), outside the sample and not inspected.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 72 entries, all regular files `100644`; zero symlinks and zero gitlinks. Four projects (`content-app`, `topbar-app`, `root-app`, `root-classic`), each with `package.json`, lockfile and its own build configuration (Vite in the first three, webpack in `root-classic`). There is no root workspace. | context |
| Remotes | `content-app/src/main.ts:8–22` and `topbar-app/src/main.ts:8–22`: `singleSpaVue({ createApp, appOptions })` and exports of `bootstrap`, `mount` and `unmount`. `topbar-app/vite.config.ts:8–18`: build in `system` format with output `app.js`. | strong |
| Custom host | `root-app/index.html:11–18`: `<script type="importmap">` with `@org/content-app` → `http://127.0.0.1:5174/src/main.ts` and `@org/header-app` → `http://127.0.0.1:5175/src/main.ts`; SystemJS and `import-map-overrides` (`:21`, `33–41`). `root-app/src/App.vue:6–9`: two `ParcelWrapper`. `root-app/src/components/ParcelWrapper.vue:10–46`: loads the module through `dynamicImport(appName)` (`root-app/src/utils/dynamicImport.ts:10–38`, native `import()` with `System.import` fallback) and mounts with `Parcel` from `single-spa-vue/parcel` and `mountRootParcel`. | strong |
| Classic host | `root-classic/src/org-root-config.ts:1–20`: `constructRoutes`/`constructApplications` from `microfrontend-layout.html` and `registerApplication` + `start`. `root-classic/src/microfrontend-layout.html:20–25`: default route with `@org/topbar-app` and `@org/content-app`. `root-classic/src/index.ejs:29–38`: local import map with the same apps on 5174/5175. | strong |
| Source code (boundaries) | There is no code import between projects. `content-app/tsconfig.app.json:15` and `root-app/tsconfig.app.json:15` include type declaration files from the other project, some nonexistent in the snapshot (`content-app/src/@types/…`); these are types, not executed code. `root-app/src/modules/Topbar/` has a local topbar copy, whose import is commented out (`root-app/src/App.vue:3`, `7`). | context |
| Configuration (inconsistencies) | The topbar name varies between hosts (`@org/header-app` in `root-app`, `@org/topbar-app` in `root-classic`). Ports 5174/5175 are not fixed in remote `vite.config.ts` and depend on startup order. `root-app/mfe-app.json:1–7` lists another port (5173) for content. | ambiguous |

## Authorship and history

Non-shallow clone; 4 linear commits, no merges, by Marcos Roberto on 2026-01-09:
- `546aa27` (“tada: start poc project MFE”, 67 files), with personal email;
- `0cccd59`, `f2f2494` and SHA `6ae6565`, with corporate email, about the topbar component and formatting.

No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` enumerates 11 missing historical objects; rename detection fails because it depends on a missing historical blob, and folder logs were repeated with `--no-renames`. The current blobs used as evidence were accessible.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four units in the repository; remotes are referenced by host import maps and layouts (`root-app/index.html:11–18`; `root-classic/src/microfrontend-layout.html:20–25`). |
| Q2 | Yes | Each project has its own `package.json`, lockfile, build configuration and server, without code imports between them. |
| Q3 | Yes | The hosts mount the remotes: parcels in `root-app` (`App.vue:6–9`) and registered applications in `root-classic` (`org-root-config.ts:10–20`). |
| Q4 | Yes | single-spa with import maps: lifecycles exported in the remotes and mounting through `mountRootParcel`/`registerApplication`. |
| Q5 | Yes | Q1–Q4 are Yes: two single-spa remotes composed by two alternative hosts. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. It matches “single-spa root configuration together with its applications” and “examples… that actually compose frontend units”. The chain is complete in the snapshot, as in 076/084/096/106/109.
- Name and port inconsistencies between hosts are characteristic of an ongoing PoC, and each host has an import map consistent with its own layout, demonstrating composition implemented in development; execution of both hosts was not proved, nor is there a complete production chain.
- `approaches: [single-spa]`, with import maps as the resolution mechanism, as in other single-spa cases. `ui_technologies: [vue]`. `build_tools: [vite, webpack]` (Vite in the Vue apps, webpack in the root config). `frontend_units: 4` (two hosts and two remotes), `unit_organization: monorepo`, `repo_type: example`.
- There is no open decision.

## Analysis notes

- **RQ2:** compares a custom single-spa root in Vue, with parcels resolved through native import map and SystemJS fallback, with the classic root config from `create-single-spa`, with `single-spa-layout` and import map injector.
- **Protocol (search):** entry only through code search in the four `package.json`. Eligibility changes from `unknown` (001) to `pass` (002). The default branch is `master`.
- **Independent review contribution (Lupa):** agreement with MFE-implemented, Q1–Q5 Yes, four frontend projects, `monorepo`, Vue, Vite/webpack and `single-spa`; no open decision (`draft`). Disagrees with the guarantee that inconsistencies do not prevent composition in both hosts: sources demonstrate composition implemented in development, without proving execution of both or a production chain. The remotes leave `createApp(App).mount('#app')` commented out and only export lifecycles, so they have no active standalone mode. There is a cross-project typing dependency (`content-app` includes shims from `root-app`; `root-app` includes missing paths in `content-app/src/@types`), limiting `content-app` typecheck isolation outside the monorepo, but this is not a runtime import, and `vue-tsc` was not executed. Alternative map `mfe-app.json:1–7` (content on 5173, `vue.global.js`) is not imported by the inspected active entry point; the topbar `vite.config.ts:8–18` (`system` format, entry `app.js`) is not the development ESM URL in active maps. The root’s personal email and other commits’ corporate emails do not prove two human authors. Q2, Q4 and Q5 should cite evidence and record port, format and production conditions.

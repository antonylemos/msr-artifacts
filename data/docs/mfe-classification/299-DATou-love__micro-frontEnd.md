---
schema: 1
id: 1088828444
full_name: DATou-love/micro-frontEnd
url: https://github.com/DATou-love/micro-frontEnd
commit: 8e52e7d4fee1bc193922a8bea0f5ede7a0cb9942
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [qiankun]
ui_technologies: [vue]
build_tools: [vite, webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 299 — DATou-love/micro-frontEnd

## Context

Minimal qiankun example: a Vue 3/Vite host (`main-vue3/`) registers two sub-applications; one, Vue 2/Vue CLI (`sub-vue2/`), is in repository and exports qiankun lifecycles; the other (`sub-react16`, `//localhost:3000`) is only referenced by configuration and absent from snapshot. Folder READMEs are generator boilerplates; no root README. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:300` records rank 299, ID 1088828444, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:300` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:20640` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:20646` (`terminology`, `pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories`, with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-11` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T22:27:42.863Z / 2026-10-08T15:56:36.768Z |

Hit metadata: description “微前端” (English translation: “micro-frontend”, in Chinese), no topics, language Vue, no license, `fork: false`, size 129, created at 2025-11-03T14:10:37Z, pushed at 2025-11-03T14:13:02Z.

No README at SHA root, and READMEs at `main-vue3/README.md:1–5` and `sub-vue2/README.md:1–24` do not contain “micro frontend”. Description lacks Latin spelling. Only compatible searched field is repository name (`micro-frontEnd`), recorded solely as hit explanation, rather than architectural evidence; search text processing is not recorded. Since READMEs come from the single commit (2025-11-03), they do not postdate October 2026 searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 36 entries, all regular `100644` files; zero symlinks and zero gitlinks. Two projects: `main-vue3/` (`package.json`, `vite.config.ts`, `index.html`, `src/`) and `sub-vue2/` (`package.json`, `vue.config.js`, `public/index.html`, `src/`); `.gitignore:1` excludes `node_modules/`. | strong |
| Configuration (host) | `main-vue3/package.json:11–15`: `qiankun` ^2.10.16 (resolved to 2.10.16 in `main-vue3/package-lock.json:1263–1265`). `main-vue3/src/main.ts:10–23`: `registerMicroApps` with `sub-vue2` (`entry: '//localhost:8081'`, `container: '#subapp-viewport'`, `activeRule: '/sub-vue2'`) and `sub-react16` (`//localhost:3000`, `/sub-react16`); `:26–36`: `start({ sandbox: { strictStyleIsolation: true } })`. `main-vue3/vite.config.ts:8–11`: port 7100. | strong |
| Source code (host) | `main-vue3/src/App.vue:4–11`: links `/sub-vue2` and `/sub-react16` and container `<div id="subapp-viewport">`; `:26–32`: hides own `router-view` on sub-app routes. | strong |
| Configuration (sub-app) | `sub-vue2/vue.config.js:5–10`: `port: 8081` and CORS `*`, matching host `entry`; `:12–20`: output `library: 'subVue2'`, `libraryTarget: 'umd'`, its own `chunkLoadingGlobal`, as qiankun requires. `sub-vue2/public/index.html:8`: `<base href="/sub-vue2/">`; `:16–17`: `#subapp-viewport` and `#app`. | strong |
| Source code (sub-app) | `sub-vue2/src/main.js:19–29`: detects `window.__POWERED_BY_QIANKUN__`, adjusts `__webpack_public_path__` and mounts independently only outside qiankun; `:32–46`: exports `bootstrap`, `mount(props)` and `unmount`. `sub-vue2/src/router/index.js:10–13`: `mode: 'history'`, `base: '/sub-vue2'`, coherent with `activeRule`. | strong |
| Source code (mounting) | `sub-vue2/src/main.js:10–16`: `render` mounts in `container.querySelector('#app')`. With `strictStyleIsolation: true` (`main-vue3/src/main.ts:30`), qiankun isolates sub-app content in shadow DOM; if received `container` is the shadow root host, this query misses `#app` and mounting would not appear. Library internals are outside snapshot and were not executed. | ambiguous |
| Composition (external unit) | `sub-react16` (`main-vue3/src/main.ts:17–22`) has no repository code; searching for `react` and `3000` outside lockfiles finds only these lines and `App.vue:7`, `29`. | context |
| Source code (boundaries) | Search for `../` specifiers in `*.ts`, `*.js`, `*.vue` and `*.json` (except lockfiles): only `main-vue3/src/router/index.ts:4–5` and `sub-vue2/src/router/index.js:3–4`, internal to each project. No import crosses `main-vue3` ↔ `sub-vue2`; host reaches sub-app only through `entry` URL. | strong |
| Build/deploy | Separate builds: `main-vue3/package.json:6–10` (`vite`, `vue-tsc -b && vite build`) and `sub-vue2/package.json:5–9` (`vue-cli-service serve/build`); only `localhost` development configuration, without pipeline or deployment. | moderate |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 1 commit (1 across all refs), no merges: SHA `8e52e7d` itself (2025-11-03T22:12:39+08:00, “主应用vue3，子应用vue2”, English translation: “main app Vue 3, sub-app Vue 2”), author and committer `zhou_hmeng <zhou_hmeng@cvicse.com>`, adding all 36 files together. No development sequence; metadata does not distinguish intellectual authorship. `git rev-list --objects $SHA --missing=print` identifies no missing objects.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `main-vue3` and `sub-vue2` in repository, plus `sub-react16` referenced by composition configuration (`main-vue3/src/main.ts:10–23`). |
| Q2 | Yes | Own entry and build (`main-vue3/index.html:11`, `vite.config.ts`; `sub-vue2/src/main.js`, `vue.config.js`), own port and no source code imports between projects. |
| Q3 | Yes | Host registers and routes sub-apps through `activeRule` and mounts them in `#subapp-viewport` (`main-vue3/src/main.ts:10–23`; `App.vue:4–11`). |
| Q4 | Yes | qiankun configured on both sides: `entry` matches sub-app port (`main.ts:13` × `vue.config.js:6`), UMD output and exported lifecycles (`vue.config.js:12–20`; `sub-vue2/src/main.js:32–46`), `base` coherent with `activeRule`. See review point about mounting under `strictStyleIsolation`. |
| Q5 | Yes | Q1–Q4 converge, subject to review point. |

## Rationale

- `MFE-implemented` (recorded decision below). Matches “examples… that actually compose frontend units” and “monorepos containing a host and its remotes” (here, qiankun host and one repository sub-app, plus one referenced external sub-app).
- Configuration chain is complete for `sub-vue2`: registration, port, container, UMD format, lifecycles and route base match; no name or address mismatch as in 097/103/104. Comparable to complete-chain cases (076/084/096/106/109) and final 029 (qiankun).
- Not code sharing (089/100): sub-app is a whole application with its own routes, mounted by host.
- `frontend_units: 3` counts both present units and configuration-referenced `sub-react16` (Q1 criterion); only two are observable. `approaches: [qiankun]`, `ui_technologies: [vue]`, `build_tools: [vite, webpack]` (Vite in host; Vue CLI/webpack in sub-app, `vue.config.js:12–20`), `repo_type: example`.

## Analysis notes

- **RQ2:** qiankun with Vue 3 host and Vue 2 sub-app (different framework versions), enabled `strictStyleIsolation` and a third sub-app (`sub-react16`) declared without code.
- **RQ1:** evidence is entirely in `main.ts`/`vue.config.js`/`main.js`; READMEs are boilerplate and search hit comes from no snapshot architectural artifact.
- **Protocol (search):** no corresponding spelling in README or Latin description; eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

- **Question:** configuration connects host and sub-app, but mounting may fail at execution: with `strictStyleIsolation: true` (`main-vue3/src/main.ts:30`), sub-app searches for `#app` through `container.querySelector` (`sub-vue2/src/main.js:16`), which does not reach shadow root content. Depends on qiankun 2.10.16 internals and is unverifiable in snapshot without execution.
- **Chosen alternative:** execution defect does not change Q4; mechanism is configured and connects units (loading, lifecycles, route), and an actual composition strategy exists. `MFE-implemented` retained.
- **New rule:** none proposed.

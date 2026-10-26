---
schema: 1
id: 62270168
full_name: hisland/my-learn
url: https://github.com/hisland/my-learn
commit: 2efedcf3f5184328f2f86d0c11bce54ab44ee7ce
classification: Non-MFE
checklist: { q1: yes, q2: no, q3: yes, q4: yes, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 168 — hisland/my-learn

## Context

Personal study experiment repository, maintained since 2013. The README says: “这里面是我平时学习的时候做测试或者练习的一些文件”, English translation: files for everyday study tests and exercises (`README.md:1–7`). There are 119 top-level directories, each an independent demo (webpack1–5, React, Vue, Deno, Rust, SQL etc.). Two concern micro-frontends:
- `single-spa/00.very-easy-vanilla-js/`, a single-spa root config with one vanilla application;
- `qiankun/`, initial qiankun tests.

The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:169` records rank 168, ID 62270168, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:169` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:120` and `data/discovery/mfe-round-002/candidates.csv:120`, both `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `code`:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `…#size:200..299` | `single-spa/00.very-easy-vanilla-js/package.json` | 2026-10-07T22:13:35.821Z / 2026-10-08T15:56:59.527Z |
| `technology-single-spa-register-code`: `registerApplication singleSpa` | `…#size:0..999` | `single-spa/00.very-easy-vanilla-js/single-spa.config.js` | 2026-10-07T22:41:18.293Z / 2026-10-08T16:20:13.242Z |

Matched files exist at the SHA:
- `package.json`, 283 bytes, within the range, declares `"single-spa": "^5.6.0"` in `package.json:13`;
- `single-spa.config.js` contains `singleSpa.registerApplication` at `:15`.

Code hit metadata records only description “my learn tests”, without topics, language or dates. The hit does not depend on the README, which does not mention micro-frontends. The README was last changed in `932ed95` (2018-10-02), long before collection. Matched files come from `f7d01f7` (2020-09-22).

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 7,543 entries, 7,516 regular `100644` files, 25 executables `100755` and 2 symlinks `120000` (`vuex/vue.js` → `vue-2.5.16.js`, `vuex/vuex.js` → `vuex-3.0.1.js`, internal); zero gitlinks. 119 top-level directories with independent demos, without workspace or common configuration. | context |
| Source code (single-spa) | `single-spa/00.very-easy-vanilla-js/single-spa.config.js:2–16`: `registerApplication({ name: 'app1', app: () => import('./app1/app1.js'), activeWhen: '#/app1' })` and `start()`. `app1/app1.js:3–21`: vanilla lifecycles writing “App 1 is mounted!”. `index.html:4`: loads `single-spa.config.js` as a module. `package.json:6–8`: no build script, only placeholder `test`. | moderate |
| Source code (single-spa boundary) | The root config imports `app1` source through a relative path (`single-spa.config.js:9`, `import('./app1/app1.js')`). No separate entry, build or deployment for `app1`: both “units” are modules in the same directory and loading context. | contrary |
| Source code (qiankun) | `qiankun/easy/webpack.config.js:5–43`: two builds (`bundle` from `main.js` and `app1` as UMD). `qiankun/easy/main.js:1–2` only exposes the qiankun module in `window.kkk`. `qiankun/easy/main2.js:1–8` calls `loadMicroApp` for `//localhost:7100`, but is neither a build entry nor loaded by `index.html:5`. `app1/main.js:7–31` exports lifecycles, but nothing registers it; `app2/main.js:1` only does `console.log(2)`. No connected composition. | contrary |
| Search | `git grep -l -i` at the SHA (except lockfiles and `.min.js`) for `ModuleFederationPlugin`, `remoteEntry`, `registerMicroApps`, `loadMicroApp`, `registerApplication`, `single-spa`, `qiankun`, `micro.?front`, `import-map`, `importmap`, `wujie` and `micro-app`. Finds only files in `single-spa/` and `qiankun/` and `deno-api/08.Deno-import-maps/` (Deno import maps, unrelated to frontend). | context |

## Authorship and history

Non-shallow clone; 1,140 commits reachable from the SHA, no merges, from 2013-07-03 (`2c18c7c`, “normal commit”) to 2026-08-21 (SHA, “add nacos-docker-compose 2.3.2”). Authors are `hisland <hisland@qq.com>` (1,115) and two corporate identities of the same name, “何定良” (22) and “hedingliang” (3). The single-spa demo was added in one commit, `f7d01f7` (2020-09-22); qiankun in `fc9aa07` (2023-05-24). Neither was changed afterward. No historical blob was read. The clone is partial (`blob:none`) and broad history reading with `--name-status` encounters a missing promisor object (`fb9e2cf…`); per-folder logs supporting the relevant chronology are available.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | In the single-spa demo, root config and `app1` are referenced by composition configuration (`registerApplication`, `single-spa.config.js:15`). |
| Q2 | No | `app1` has no separate entry or build and is imported as source by root config (`single-spa.config.js:9`): “units do not import each other's source code directly” is not satisfied. In the qiankun demo, separate builds exist, but no unit is registered (see Q4). |
| Q3 | Yes | Root config registers and activates `app1` by hash route (`single-spa.config.js:14–16`). |
| Q4 | Yes | single-spa configured and called in root config (`registerApplication` + `start`). The qiankun demo does not connect units. |
| Q5 | No | There is a No answer: study demo using the single-spa API within one loading context, in an exercise repository. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”: Q2 literally fails, because both parts of the single-spa demo lack separate entries or builds and one imports the other's source.
- The case also matches “MFE-related dependencies that are unused or experimental” (disconnected qiankun demo) and study and exercise content, as in 023/094, in a repository of “monorepos containing several unrelated frontend applications”, as in 028.
- Not code sharing (089/100), a third-party platform or a complete chain (076/084/096/106/109).
- `frontend_units: 2` counts only the root config + `app1` pair referenced by composition configuration (Q1 criterion). The repository's dozens of independent demos are not composition units and were not added, as in 080, where only the actual target was counted. `unit_organization: monorepo`.
- `ui_technologies: []` (vanilla JS) and `build_tools: []` (demo has no build); `approaches: []`, under the Non-MFE convention. `repo_type: other`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** code searches for `"single-spa"` in `package.json` and `registerApplication` capture minimal study demos within exercise repositories. Here, a root config without build imports application source.
- **Count:** choosing `frontend_units: 2` and `monorepo` concerns only the single-spa demo; another possible reading is treating the whole repository as a collection without composition units (`0`/`none`). Class does not change.
- **Protocol (search):** entry exclusively through code search, with eligibility `pass` in both rounds. Code hit metadata lacks dates and topics.

### Analyst/reviewer disagreement (count and technology fields)

Independent reviewer (Lupa) agrees with Non-MFE, Q2 No, `repo_type: other` and `draft` (class is independent of fields). Disagrees with `frontend_units: 2`, `ui_technologies: []` and `build_tools: []`: these fields describe only the single-spa demo (root config + `app1`), rather than the whole repository, a collection of experiments with other frontend demos (for example, `00-vite4-echarts`, `01-vite4-g6`, `02-vite4-vue3-ts`, `03-vite4-react18-ts`, `04-vue3-vite5-threejs` and `svelte-test`, with Vite, React, Vue and Rollup/Svelte in `package.json:6–26`, and entry pages such as `03-vite4-react18-ts/index.html:10–11`). The template defines `frontend_units` as units in the repository or referenced by composition configuration and requests observed technologies and bundlers; final 028 counts three isolated, uncomposed frontend apps, so isolated units are not discarded from the field.

Verified at the SHA: there are 99 `package.json` manifests (many backend experiments, such as `eggjs2/`) and 667 `index.html` files, and accurately counting frontend demos would require inventorying all of them; this count was not performed. `frontend_units: 2`, `ui_technologies: []` and `build_tools: []` retained as a picture restricted to the single-spa demo, recorded as incomplete, and `monorepo` (collection of isolated projects). Researcher alternatives: redo count and fields with an inventory of all demos, or apply a convention for study collection repositories (`0`/`none`). Class does not change. The warning also remains that drafts 094 and 076 and `review` record 080 cited above are not final.

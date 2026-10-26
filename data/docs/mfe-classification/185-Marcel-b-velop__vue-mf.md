---
schema: 1
id: 1101991974
full_name: Marcel-b-velop/vue-mf
url: https://github.com/Marcel-b-velop/vue-mf
commit: ed270d34b0542cb1a0ce26aafc2aeba4bca994e1
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 185 — Marcel-b-velop/vue-mf

## Context

“Vue Module Federation” (`README.md:1–11`), with German README: experimental pnpm monorepo with four Vue 3 + Vite projects, connected through `@originjs/vite-plugin-federation`.
- `host` maintains navigation, header and footer and loads pages as remote modules.
- `app-1` and `app-2` are page and login/registration form remotes.
- `lib` is a remote with a `Confirm` dialog, an `apiClient` and shared types.

There is also a .NET API and an IdentityServer in `Api/`. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:186` records rank 185, ID 1101991974, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:186` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:21375` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:21381` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-11` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T23:21:18.809Z / 2026-10-08T16:16:23.699Z |

Hit metadata:
- description “Vue Mf Example”, without the phrase;
- no topics, language HTML, `fork: false`, size 2,628;
- created at 2025-11-22T16:09:15Z, pushed at 2025-12-27T18:56:06Z.

The hit comes from `README.md:1`, “# Vue Module Federation”, the only occurrence. The README's last change in SHA history is `312d8f3` (2025-11-23), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 141 entries, all regular `100644` files; zero symlinks and zero gitlinks. Four frontend projects (`host/`, `app-1/`, `app-2/`, `lib/`), each with `package.json` and `vite.config.ts`, a root pnpm workspace (`pnpm-workspace.yaml:1–5`; `package.json:1–14`), directory `Api/` (.NET) and versioned test artifacts (`lib/playwright-report/`, `lib/test-results/`, 20 files: 18 in `playwright-report/` and 2 in `test-results/`), plus `.DS_Store`. | context |
| Configuration (host) | `host/vite.config.ts:11–26`: `federation({ name: "host-app", remotes: { "remote-app1": "http://localhost:5174/assets/remoteEntry.js", "remote-app2": "…:5175/…", "remote-lib": "…:5177/…" }, shared: vue, pinia, primevue, axios })`. | strong |
| Configuration (remotes) | `app-1/vite.config.ts:11–27`: `exposes` `./App1` and `remotes` `remote-lib`. `app-2/vite.config.ts:11–30`: `exposes` `./App2`, `./Home`, `./LoginForm`, `./RegisterForm`, and `remotes` `remote-lib`; port 5175 (`:40`). `lib/vite.config.ts:17–32`: `exposes` `./Confirm`, `./apiClient` and `./types`. Preview ports: `app-1/package.json:10` (5174), `app-2/package.json:10` (5175), `lib/package.json:9` (5177). | strong |
| Source code (consumption) | `host/src/main.ts:12–21`: `defineAsyncComponent(() => import("remote-app1/App1"))`, `remote-app2/App2` and `remote-lib/Confirm`, registered as global components. `host/src/views/Home.vue:1`: `<AppOne />` at route `/`. `host/src/router/index.ts:7–8`: routes `/login` and `/register` with `import('remote-app2/LoginForm')` and `RegisterForm`. `app-1/src/main.ts:8–11` and `app-1/src/composables/api.ts:1`: consumption of `remote-lib/apiClient` and `Confirm`. | strong |
| Source code (boundaries) | Searching for `../../` and `../<projeto>` imports at the SHA returns nothing (the original placeholder means project). Cross-project imports are only federated (`remote-*/…`) and module declarations in `vite-env.d.ts`. | context |
| Documentation | `README.md:3–11`: goal of pages loaded as “Remote Module” by host. `README.md:20–56`: resolved problems (sharing Vue, Pinia and PrimeVue; Tailwind; type declarations). `README.md:58–62`: host, App1 and Lib work locally; production behavior not yet tested. | moderate |
| Build/CI | `.github/workflows/node.js.yml:1–34`: workspace `pnpm install` and `pnpm build` and .NET API build/test. Each project has its own `vite build`. | moderate |

## Authorship and history

Non-shallow clone. There are 29 commits reachable from the SHA (4 merges; 52 across all refs), all by Marcel Benders, under three emails: `b-velop.com`, `outlook.de` and noreply.
- **Dates:** from 2025-11-22 (`9ab7627`, “Initial commit”) to 2025-11-30.
- **SHA:** `ed270d3`, “Merge pull request #3 from Marcel-b-velop/feature/wip”.
- **Outside snapshot:** branch `origin/feature/wip` has later commits (through 2025-12-27, for example “Anmeldung usw”, English translation: “Login etc.”); `pushed_at` corresponds to it.

No historical blob was read. The clone is partial (`blob:none`): `git log --name-status` for `host/` and `Api/` emits errors when attempting to obtain missing objects (`git cat-file` does not find them), while those for `app-1/`, `app-2/` and `lib/` complete; historical reconstruction of `host/` and `Api/` is limited, without affecting SHA tree and code.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four units in the repository, referenced by composition configurations (`host/vite.config.ts:15–19`; `app-1/vite.config.ts:18–20`; `app-2/vite.config.ts:21–23`). |
| Q2 | Yes | Each unit has its own entry, build and preview port (`*/vite.config.ts`; `*/package.json`), without source code imports between them. |
| Q3 | Yes | Host mounts `App1` at route `/` and `app-2` forms at `/login` and `/register` (`host/src/views/Home.vue:1`; `host/src/router/index.ts:7–8`). |
| Q4 | Yes | Module Federation configured and consumed in host and remotes (`host/src/main.ts:12–14`; `app-1/src/main.ts:8–11`). |
| Q5 | Yes | Q1–Q4 are Yes: Vue host with three remotes, one a shared component and service library. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- The chain is complete in the snapshot, as in 076/084/096/106/109.
- **Code sharing:** remote `lib` (dialog, `apiClient`, types) has code sharing character, as in the uncertainty in 089/100. But application composition does not depend on it: host mounts `app-1` and `app-2` screens by route.
- **Production:** README says testing was only local (`README.md:62`). URLs are `localhost`, but composition is configured and consumed.
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [vue]`, `build_tools: [vite]`, `frontend_units: 4` (host, app-1, app-2, lib), `unit_organization: monorepo`, `repo_type: example`.
- No decision remains open.

## Analysis notes

- **RQ2:** Module Federation in Vite with `@originjs/vite-plugin-federation`. Uses `shared` with `generate: false, import: false` in remotes to delegate Vue, Pinia, PrimeVue and axios to host, and a “lib” remote as a runtime shared component and service channel.
- **RQ3:** README records practical integration problems: PrimeVue sharing with `version`/`requiredVersion`, Tailwind CSS requiring `cssCodeSplit: false`, remote module declarations.
- **Protocol (snapshot):** later evolution (authentication, “Wichteln”, English translation: “Secret Santa”) is in `feature/wip`, outside the snapshot.
- **Protocol (search):** entry only through query `"module federation"`. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, Vue/Vite, four units and `monorepo`; no open decision (`draft`). Host (`host-app`) and remotes (`remote-app1`, `remote-app2`, `remote-lib`) have aligned names, exposures and URLs (`host/vite.config.ts:11–19`; `app-1/vite.config.ts:11–20`; `app-2/vite.config.ts:11–23,33–47`; `lib/vite.config.ts:17–32`), and composition chain is observable in code. Adopted, verified corrections: 20 versioned test artifacts (rather than 18); workflow citation extended to `:1–34`; missing partial clone objects. README says testing was only local (`README.md:62`) and is outdated about `App2`, without affecting class. Final comparables: 017 and 046.

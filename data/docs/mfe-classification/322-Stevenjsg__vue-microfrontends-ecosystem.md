---
schema: 1
id: 1106098608
full_name: Stevenjsg/vue-microfrontends-ecosystem
url: https://github.com/Stevenjsg/vue-microfrontends-ecosystem
commit: 8501b8bd6e1d2491eb7838ae38b264a826f4c453
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

# 322 — Stevenjsg/vue-microfrontends-ecosystem

## Context

Micro-frontend ecosystem with Vue 3, Vite and `@originjs/vite-plugin-federation`, in a pnpm + Turborepo monorepo (`README.mkd:1–9`; `package.json:6–10`; `pnpm-workspace.yaml:1–3`). Four applications in `apps/`:
- `shell` (port 5000), host;
- `dashboard` (5001), `cms` (5002) and `kanban` (5003), remotes.

There is also library `packages/ui-kit`. The shell declares all three remotes, but only imports and renders component `dashboard/Widget`. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:323` records rank 322, ID 1106098608, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:323` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:21602` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:21608` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories`, with subquery `…#created:2025-11` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:17:20.528Z / 2026-10-08T15:39:57.387Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:37.231Z / 2026-10-08T15:48:23.201Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:21:09.536Z / 2026-10-08T16:16:19.379Z |

The effective queries append `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 40;
- created at 2025-11-28T16:18:12Z, pushed at 2025-11-29T13:08:35Z.

The repository README is `README.mkd`. Spellings:
- “Microfrontend”: `README.mkd:1` (“# 🚀 Vue 3 Microfrontend Ecosystem”) and `README.mkd:3`;
- “microfrontends”: `README.mkd:9`, `121`, `146`;
- “Module Federation”: `README.mkd:3`, `69`, `106` and `151`.

The last README change is `94399d2` (2025-11-28), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 65 entries, all regular files `100644`; zero symlinks and zero gitlinks. Four Vue apps in `apps/` (`shell`, `dashboard`, `cms`, `kanban`), each with `package.json`, `vite.config.ts`, `index.html` and `src/`. Also `packages/ui-kit` and, at the root, `package.json`, `pnpm-workspace.yaml`, `turbo.json` and `README.mkd`. | context |
| Host | `apps/shell/vite.config.ts:19–27`: `federation({ name: "shell", remotes: { dashboard: "http://localhost:5001/assets/remoteEntry.js", cms: "…5002…", kanban: "…5003…" }, shared: ["vue"] })`. | strong |
| Remotes | `apps/dashboard/vite.config.ts:18–25`: `name: "dashboard_app"`, `filename: "remoteEntry.js"`, `exposes: { "./Widget": "./src/components/WidgetDinero.vue" }`, port 5001. `apps/cms/vite.config.ts:16–23` (`./Cms`, 5002) and `apps/kanban/vite.config.ts:16–23` (`./Kanban`, 5003) expose each app’s `App.vue`. | strong |
| Consumption | `apps/shell/src/App.vue:5–7`: `defineAsyncComponent(() => import('dashboard/Widget'))`, rendered in `Suspense` (`:21–28`). `apps/shell/src/vite-env.d.ts:3–7` declares the module type. `cms` and `kanban` are in `remotes`, but no shell file imports them. | strong |
| Source code (boundaries) | Search for imports with `../` in `apps/` and `packages/`: none. The only cross-folder import is `apps/shell/src/App.vue:3` (`@repo/ui-kit/src/index.ts`), a workspace dependency (`apps/shell/package.json:12`), not another app. | context |
| Execution | `package.json:10`: `dev:hybrid` starts the shell in dev and all three remotes with `serve:prod` (build + preview), as recommended by the plugin. | context |

## Authorship and history

Non-shallow clone; 11 linear commits, no merge, from 2025-11-28 (`e3cc334`, “first commit”, author “Steven”) to 2025-11-29 (SHA `8501b8b`). The others are by “Steven J. Silva Gomez”, one (`80a16ce`, “Delete .turbo directory”) through the GitHub interface. Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Shell and three remotes in the repository, referenced in `remotes` (`apps/shell/vite.config.ts:21–25`). |
| Q2 | Yes | Each app has its own `package.json`, `vite.config.ts`, entry and port, without code import between apps; common code comes from `@repo/ui-kit`. |
| Q3 | Yes | The shell mounts the remote widget from `dashboard` (`App.vue:5–7`, `21–28`). |
| Q4 | Yes | `@originjs/vite-plugin-federation` with `remotes` in the shell and `exposes` in remotes, actually used in import `dashboard/Widget`. |
| Q5 | Yes | Q1–Q4 are Yes: host and remote composed at runtime, with a complete snapshot chain for `dashboard`. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “monorepos containing a host and its remotes”. The shell → dashboard chain is complete in the snapshot, as in 076/084/096/106/109.
- **Units:** `frontend_units: 4` counts the four apps referenced by composition configuration (Q1 criterion). Only `dashboard` is consumed; `cms` and `kanban` are declared, but without import. Unlike 128 and 305, remotes are not commented out here.
- **Fields:** `approaches: [module-federation]`, `ui_technologies: [vue]`, `build_tools: [vite]`, `unit_organization: monorepo`, `repo_type: example`.
- There is no open decision.

## Analysis notes

- **RQ2:** federation with `@originjs/vite-plugin-federation` in Vue 3. Remotes must be served through build/preview (`dev:hybrid`), and the shell consumes an isolated component (`Widget`), not an entire application.
- **RQ3:** remote `name` (`dashboard_app`) differs from the key used in the host (`dashboard`). The plugin resolves through the URL; compatibility was not verified by execution.
- **Protocol (search):** all spellings are literally in `README.mkd`. Eligibility changes from `unknown` (001) to `pass` (002).

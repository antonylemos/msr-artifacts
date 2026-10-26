---
schema: 1
id: 1099550821
full_name: RafaM-dev/hostRepo
url: https://github.com/RafaM-dev/hostRepo
commit: e68ba940850001cc7231849cb8a44097f0e12853
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 284 — RafaM-dev/hostRepo

## Context

React + Vite host for a Rick and Morty character explorer, made as a technical test: “En esta prueba, evaluaremos su capacidad para construir la aplicación…” (English translation: “In this test, we will assess your ability to build the application…”; `src/features/home/Home.tsx:26–29`). Host uses `@originjs/vite-plugin-federation` to consume remote `mf-remoteDetails` (`http://localhost:5001/assets/remoteEntry.js`). It imports remote component `DetailEpisode` and renders it in the episode list. Remote is not in this repository. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:285` records rank 284, ID 1099550821, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:285` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:21239` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:21245` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same four hits in each round:

| Query (`q`) | Endpoint / subquery / `path` | Collection 001 / 002 (UTC) |
|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `code` / `…#size:1000..1149` / `package.json` | 2026-10-07T22:05:55.727Z / 2026-10-08T15:48:59.698Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `repositories` / `…#created:2025-11` / empty | 2026-10-07T22:27:42.863Z / 2026-10-08T15:56:36.768Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `repositories` / `…#created:2025-11` / empty | 2026-10-07T22:58:04.349Z / 2026-10-08T16:07:10.669Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` / `…#created:2025-11` / empty | 2026-10-07T23:21:09.536Z / 2026-10-08T16:16:19.379Z |

Effective repository queries append `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Repository hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 3,277;
- created at 2025-11-19T06:16:10Z, pushed at 2025-11-19T07:00:05Z.

`package.json` (1,034 bytes) declares `@originjs/vite-plugin-federation` at `package.json:26`.

README spellings:
- “micro frontends”: “micro-frontends” at `README.md:3` (“…que implementa arquitectura de micro-frontends mediante Module Federation”, English translation: “…implementing micro-frontends architecture through Module Federation”), `73` and `300`;
- “micro frontend”: “micro-frontend” at `README.md:40`, “Micro-frontend” at `103` and “Micro-frontend” at `347`;
- “Module Federation”: `README.md:3`, `75`, `298` and `328`, among other lines.

README's last change is the SHA itself (2025-11-19), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 41 entries, all regular `100644` files; zero symlinks and zero gitlinks. A single Vite application at root (`index.html`, `src/`, `public/`, `vite.config.ts`, TS, ESLint, Tailwind and PostCSS configs) and an empty root file `remote-root@0.0.0` (0 bytes). | context |
| Configuration (host) | `vite.config.ts:3`, `8–15`: `federation({ name: "host", filename: "remoteEntry.js", remotes: { "mf-remoteDetails": "http://localhost:5001/assets/remoteEntry.js" }, shared: ["react", "react-dom"] })`. | strong |
| Remote consumption | `src/features/episodes_list/ListEpisodes.tsx:15`: `import DetailEpisode from "mf-remoteDetails/DetailEpisode"`. `:96–100` (in file): `<DetailEpisode character={selectedCharacter} open=… onClose=… />`. `src/declare.d.ts:1–4`: remote module type declaration. `src/App.tsx:10–12`: `ListEpisodes` at route `/episodes`. | strong |
| External remote | Remote `mf-remoteDetails` (port 5001, module `./DetailEpisode`) is not in the repository. Rounds contain other candidates from the same account (`RafaM-dev/remoteRepo`, `remote-morty`, `host-remote-rick`), outside the sample and uninspected. | context |
| Documentation | `README.md:3`, `40–52`, `73–103`: host integrating a remote that must be started first. `README.md:332–347` shows another configuration, `remote_root` at `localhost:5174`, differing from SHA's `vite.config.ts`. | weak |
| Source code (boundaries) | Imports with `../../` and `../../../` stay inside `src/` (for example, `ListEpisodes.tsx:3–4` → `src/store`). No import leaves the repository. | context |

## Authorship and history

Non-shallow clone; 7 linear commits, no merges, all by `RafaDev-gft`, on 2025-11-19, from `8a62219` (“first commit”, already including `vite.config.ts` and `src/declare.d.ts`) to SHA `e68ba94` (README update). Only branch `main`. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Host and one external remote referenced by composition configuration (`vite.config.ts:11–13`). |
| Q2 | Yes | Host has its own entry and build; remote is external and separately served (`localhost:5001`), counting as Yes under operational criterion. |
| Q3 | Yes | Host imports and renders remote component in `ListEpisodes`, mounted at route `/episodes` (`ListEpisodes.tsx:15`; `App.tsx:11`). |
| Q4 | Yes | `@originjs/vite-plugin-federation` with `remotes` coherent with import `mf-remoteDetails/DetailEpisode`, used on page. |
| Q5 | Yes | Q1–Q4 are Yes: Module Federation host consuming an external remote. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in case “repositories containing only the host, which references external remote units”. Same framing as final 008 and drafts 211 and 271 (host with remote at `localhost`).
- Being a technical test does not change class, as in final 094, where exercise determined only `repo_type`. Here it leads to `repo_type: example`.
- **Fields:** `frontend_units: 2` (host and referenced remote), `unit_organization: multi-repo`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`.
- No decision remains open.

## Analysis notes

- **RQ2:** Vite host with static remote component import (`DetailEpisode`) receiving host props (`character`, `open`, `onClose`); only `react` and `react-dom` shared.
- **Protocol (documentation):** README describes a different remote and port (`remote_root`, 5174) from effective configuration (`mf-remoteDetails`, 5001). Classification follows configuration.
- **Protocol (sample):** same account has three other candidates with host and remote names; only this one entered the sample.
- **Protocol (search):** entry through code (`package.json`) and three repository queries, with hyphenated README spellings. Eligibility changes from `unknown` (001) to `pass` (002).

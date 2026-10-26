---
schema: 1
id: 990877766
full_name: lmedhub/zephyr-microfrontends
url: https://github.com/lmedhub/zephyr-microfrontends
commit: c6e6a9f7d59a3b422002af26c57617d6c486a532
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [rspack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 324 — lmedhub/zephyr-microfrontends

## Context

Micro-frontend demonstration with Rspack, Module Federation, React and Zephyr Cloud (`frontend/README.md:1–9`), with a Go URL shortener backend (`backend/`). Four applications in `frontend/apps/`:
- `host` (React, porta 3000);
- `remote-header` (React, 3001);
- `remote-footer` (React, 3002);
- `url-shortener` (Vue 3, 3003).

The host renders the remote header and footer with `React.lazy` and mounts the remote Vue component with `createApp`. All configs are wrapped by `withZephyr()` (`zephyr-webpack-plugin`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:325` records rank 324, ID 990877766, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:325` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:14397` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14403` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same six hits in each round:

| Query (`q`) | Endpoint / subquery / `path` | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `repositories` / `…#created:2025-05` / empty | 2026-10-07T18:35:16.819Z / 2026-10-08T15:38:07.285Z |
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `code` / `…#size:3000..3999` / `frontend/package.json` | 2026-10-07T20:33:07.125Z / 2026-10-08T15:43:53.217Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `repositories` / `…#created:2025-05` / empty | 2026-10-07T22:07:46.490Z / 2026-10-08T15:47:18.495Z |
| `technology-module-federation-plugin-ts-code`: `ModuleFederationPlugin remotes extension:ts` | `code` / `…#size:2000..2249` / `frontend/apps/remote-footer/rspack.config.ts` and `frontend/apps/remote-header/rspack.config.ts` | 2026-10-07T22:39:43.946Z / 2026-10-08T16:18:55.602Z |
| same | `code` / `…#size:2500..2749` / `frontend/apps/host/rspack.config.ts` | 2026-10-07T22:39:55.652Z / 2026-10-08T16:19:06.277Z |

The effective repository queries append `pushed:>=2025-04-01 created:2025-05-01..2025-05-31`.

Repository hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 436;
- created at 2025-05-26T19:27:45Z, pushed at 2025-06-04T14:27:41Z.

Code hit files contain the searched term: `frontend/package.json:59` (`"@module-federation/enhanced"`) and `ModuleFederationPlugin` with `remotes` in all three `rspack.config.ts` (for example, `frontend/apps/host/rspack.config.ts:82–88`).

The SHA has no root README (`git ls-tree`: only `.gitignore`, `backend` and `frontend`). Root `README.md` was moved, with the same blob, to `frontend/README.md` in `8b5da15` (2025-06-02), before the October 2026 collections. `frontend/README.md:1` has “Microfrontends” and `:7` has “microfrontends”. Without a root README at the SHA, the origin of repository hits (name or previously indexed README) cannot be determined; search processing is not recorded.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 60 entries, all regular files `100644`; zero symlinks and zero gitlinks. Four apps in `frontend/apps/`, each with `package.json`, lockfile, `rspack.config.ts`, `index.html` and `src/`. Also `frontend/package.json`, `frontend/README.md` and the Go backend (`backend/`, with versioned `url_shortener.db`). | context |
| Host | `frontend/apps/host/rspack.config.ts:7`, `82–94`: `withZephyr()` and `ModuleFederationPlugin({ name: "host", remotes: { remote_header: "…3001/remoteEntry.js", remote_footer: "…3002…", url_shortener: "…3003…" }, shared: { react, "react-dom", vue } })`. | strong |
| Remotes | `frontend/apps/remote-header/rspack.config.ts:73–84`: `exposes: { "./Header" }`. `frontend/apps/remote-footer/rspack.config.ts:73–84`: `exposes: { "./Footer" }`. `frontend/apps/url-shortener/rspack.config.ts:74–87`: `exposes: { "./Shortener": "./src/Shortener.vue" }`, with shared Vue. | strong |
| Consumption | `frontend/apps/host/src/App.tsx:6–7`, `12–22`: `React.lazy` of `remote_header/Header` and `remote_footer/Footer` in `Suspense`. `frontend/apps/host/src/utils/VueShortener.tsx:10–16`: `import("url_shortener/Shortener")` mounted with `createApp(...).mount(containerRef.current)`. `src/types/federated-modules.d.ts:1–17` types all three modules. | strong |
| Source code (boundaries) | Search for imports with `../` in `frontend/`: none. Each app imports only local files and packages. | context |
| Zephyr | All configs use `withZephyr()`. `frontend/apps/host/package.json:4–7`: `"zephyr:dependencies"` with `remote-header` and `remote-footer`. Zephyr Cloud deployment is not verifiable in the snapshot; local composition through `localhost` URLs is. | context |

## Authorship and history

Non-shallow clone; 16 commits across all refs and in SHA history, 5 PR merges through the GitHub interface, all by `lmedhub`, from 2025-05-26 (`35e664c`, “Initial commit”) to 2025-06-04 (SHA `c6e6a9f`, “Merge pull request #5 …”). Four other remote branches (`config/*`, `feat/zephyr-mf-integration`, `misc/basic-zephyr-app`), not considered. While listing `--name-status` of `8b5da15` with rename detection, one object (`1954fa5`) was unavailable and was not fetched; tree comparison without rename detection showed the README move.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Host and three remotes in the repository, referenced in `remotes` (`frontend/apps/host/rspack.config.ts:84–88`). |
| Q2 | Yes | Each app has its own `package.json`, lockfile, `rspack.config.ts`, entry and port, without code import between apps. |
| Q3 | Yes | The host mounts header, footer and the remote Vue component (`App.tsx:12–22`; `VueShortener.tsx:10–16`). |
| Q4 | Yes | Rspack Module Federation with consistent `remotes`/`exposes` and actual use of all three remote modules. |
| Q5 | Yes | Q1–Q4 are Yes: host and remotes, React and Vue, composed at runtime, with a complete snapshot chain. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule, in the case “monorepos containing a host and its remotes”. The chain is complete in the snapshot, as in 076/084/096/106/109.
- **Fields:**
  - `approaches: [module-federation]`, `ui_technologies: [react, vue]`, `build_tools: [rspack]`;
  - `frontend_units: 4`, `unit_organization: monorepo`;
  - `repo_type: example` (demonstration declared in `frontend/README.md:3`).
- There is no open decision.

## Analysis notes

- **RQ2:** hybrid React + Vue composition: the React host mounts a remote Vue component with `createApp`, with Vue shared as a singleton. Deployment integrates with Zephyr Cloud (`withZephyr`, `zephyr:dependencies`).
- **Protocol (search):** the README is outside the root at the SHA; the root README existed until `8b5da15`. Entry also through three code queries. Eligibility changes from `unknown` (001) to `pass` (002).

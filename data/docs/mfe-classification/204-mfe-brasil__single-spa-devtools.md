---
schema: 1
id: 986682535
full_name: mfe-brasil/single-spa-devtools
url: https://github.com/mfe-brasil/single-spa-devtools
commit: 315f830fc0adeb55e1a8caf32d0eb3bc8b6a08c7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 204 — mfe-brasil/single-spa-devtools

## Context

“single-spa-devtools” (`README.md:1–8`): development tools for single-spa projects, in Nx/Bun monorepo with two packages.
- `packages/webpack-plugin`: Webpack plugin for third-party `root-config`. Injects code into first `.js` asset to open local WebSocket, report `single-spa:*` events and intercept `importMapOverrides`.
- `packages/vscode-extension`: VS Code extension that, at SHA, only registers generator’s “Hello World” command.

No frontend application or root-config exists in repository. Repository and organization names are not used as evidence.

`data/samples/mfe-sample-001/clones.csv:205` records rank 204, ID 986682535, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:205` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:14146` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14152` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same five hits in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2025-05` | 2026-10-07T18:32:57.228Z / 2026-10-08T15:38:02.120Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2025-05` | 2026-10-07T22:07:46.490Z / 2026-10-08T15:47:18.495Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-05` | 2026-10-07T22:21:59.654Z / 2026-10-08T15:54:21.435Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-05` | 2026-10-07T22:53:32.599Z / 2026-10-08T16:05:43.863Z |
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `…#created:2025-Q2` | 2026-10-07T23:33:38.669Z / 2026-10-08T16:20:59.766Z |

Effective queries append `pushed:>=2025-04-01` and `created:2025-05-01..2025-05-31` (terminology) or `created:2025-04-01..2025-06-30` (single-spa).

Hit metadata:
- description “Tool ecosystem designed to enhance the development of single-spa and microfrontend-based applications”;
- no topics, TypeScript language, `fork: false`, size 88;
- creation at 2025-05-20T01:25:46Z, push at 2026-08-08T04:38:57Z.

README spellings:
- “single-spa”: `README.md:1`, `5`, `7`;
- “microfrontend”: `README.md:5` (“single-spa and microfrontend-based applications”), same as description;
- “microfrontends”: `README.md:23` (“debugging of microfrontends”);
- “Micro Frontends”: `README.md:7` (“active MFEs (Micro Frontends)”).

Singular “micro frontend” appears literally in neither README nor description; this hit depends on unrecorded GitHub search text processing.

README was last changed in `bf9106d` (2025-05-20), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 33 entries, all regular files `100644`; zero symlinks and zero gitlinks. Nx/Bun root (`package.json:38–40`, `nx.json`, `bun.lock`) with `packages/webpack-plugin` and `packages/vscode-extension`, plus `.github/` (CI, dependabot, CODEOWNERS) and `.vscode/`. No `index.html`, root-config, `registerApplication` or import map. | contrary |
| Source code (plugin) | `packages/webpack-plugin/src/index.ts:18–62`: `SingleSpaDevtoolsWebpackPlugin` concatenates code to first `.js` asset. `packages/webpack-plugin/src/injectedCodeSource.ts:4–20`, `22–42`, `63–88`: WebSocket to `ws://127.0.0.1:9764` (`index.ts:5`), patch of `window.importMapOverrides` and listening to `single-spa:*` events. Tool for third-party projects; it composes no units. | contrary |
| Source code (extension) | `packages/vscode-extension/src/extension.ts:7–23` and `package.json:14–21`: only scaffold command `helloWorld`. Functions described in README (`README.md:12–17`) do not exist at SHA. | contrary |
| Documentation | `packages/webpack-plugin/README.md:14`: “The initial implementation of the plugin only logs a message to the console…”, and roadmap `:49–52` leaves import-map monitoring and WebSocket pending. SHA code already injects WebSocket, so README is outdated relative to code. | context |
| Search | `git grep -i` at the SHA (except lockfile and Markdown) for `registerApplication`, `importmap` and `.html`: only `injectedCodeSource.ts` and `global.d.ts:3` (`importMapOverrides`). Search for imports `../..` in `packages` returns nothing. | absent |

## Authorship and history

Non-shallow clone; 8 commits across all refs, no merge. 7 by Eliseu dos Santos da Silva `<s.eliseu@proton.me>`, from 2025-05-20 (`be9286b`, “Initial commit”) to 2025-05-24 (SHA `315f830`, “chore: update configuration files and scripts…”), and 1 by `dependabot[bot]` in `origin/dependabot/npm_and_yarn/npm_and_yarn-161e398bfc` (`54e8d56`, 2026-08-08, `nx` update). Latter corresponds to `pushed_at` and was not considered. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; packages are a Webpack plugin and a VS Code extension. |
| Q2 | No | Without frontend units, no independence requires evaluation. |
| Q3 | No | No host, shell or root-config; plugin targets root-config of other projects (`packages/webpack-plugin/README.md:28–38`). |
| Q4 | No | No composition mechanism configured between repository units. Code instruments third-party single-spa and `import-map-overrides` (`injectedCodeSource.ts:13–42`, `63–88`). |
| Q5 | No | Q1–Q4 are No: development tool for single-spa ecosystems. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Matches “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”: tool supporting micro-frontends development, without implementing them.
- Same classification as 015 and draft 165 (library/plugin): `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`. `ui_technologies: []` and `build_tools: []`, since no frontend units exist; Webpack appears as plugin target and extension bundler, not UI bundler.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** description and README with “single-spa” and “microfrontend” in tooling repository. Root README describes functions absent from code (“Hello World” extension).
- **Protocol (search):** singular hit `"micro frontend"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002). `pushed_at` of 2026-08-08 comes from Dependabot branch, not default branch.

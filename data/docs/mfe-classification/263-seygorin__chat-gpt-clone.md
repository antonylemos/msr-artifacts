---
schema: 1
id: 1053862045
full_name: seygorin/chat-gpt-clone
url: https://github.com/seygorin/chat-gpt-clone
commit: f4017d3949daa6e17535d2a83377dd1e9ae7d708
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 263 — seygorin/chat-gpt-clone

## Context

ChatGPT clone in Angular 20, with Gemini chat, authentication and persistence in Firebase (`README.md:1–3`, `:21–31`). It is a single Angular application, organized by features. Module Federation and micro-frontends appear only as a future item in a README optimization list (`README.md:428`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:264` records rank 263, ID 1053862045, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:264` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:18623` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:18629` (`pass`), both with `terminology;technology`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-09` | 2026-10-07T22:26:15.828Z / 2026-10-08T15:56:00.250Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-09` | 2026-10-07T22:57:04.160Z / 2026-10-08T16:06:48.173Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2025-09` | 2026-10-07T23:20:17.641Z / 2026-10-08T16:15:54.936Z |

The effective queries append `pushed:>=2025-04-01 created:2025-09-01..2025-09-30`.

Hit metadata (identical in both rounds): description of the ChatGPT clone in Angular 20, without the searched terms; topics `angular`, `firebase`, `rxjs`, `signals`, `typecript`; language HTML; MIT license; `fork: false`; size 751; homepage on Netlify; created at 2025-09-10T03:28:24Z; pushed at 2025-10-07T18:05:42Z.

The match comes from the README. The only line with the terms is `README.md:428`, “Module federation for micro-frontends (future)”:
- literally matches “module federation” and, with the hyphen as separator, “micro frontends”;
- the singular form “micro frontend” does not appear literally; this hit depends on GitHub search text processing, which is not recorded.

The last README change is `64bc0db` (2025-09-28T19:28:47+05:00). The SHA, merge of PR #1 (2025-10-07T23:05:34+05:00, that is, 18:05:34Z), coincides with `pushed_at`. Both predate the October 2026 collections, and the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 106 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single Angular project: `package.json`, `angular.json` with one project `chat-gpt-clone` (`angular.json:12–13`), `src/` with `core`, `features` (auth, chat, main, settings, sidebar) and `shared`, plus tests, e2e and `netlify.toml`. | contrary |
| Configuration / Build | `angular.json:21–23`: builder `@angular/build:application` with entry point `src/main.ts`. `package.json:4–9`, `:31–45`: `ng serve/build` scripts and Angular, Firebase and Gemini dependencies; no federation package. | contrary |
| Source code | `src/main.ts:1–5`: `bootstrapApplication(AppComponent, appConfig)`. `src/app/app.routes.ts:6–53`: all routes use `loadComponent` with `import('./features/…')` or `import('./shared/…')` from the same project (internal lazy loading). | contrary |
| Source code (boundaries) | Active import search for `../../` or more in `src`: only traversals between folders of the same application, for example `src/app/features/auth/components/login.component.ts:4–5` (to `shared/`) and `src/app/core/services/gemini.service.ts:7` (to `environments/`). This confirms a single unit with internal modules, not independent units. | contrary |
| Documentation | `README.md:428`: “Module federation for micro-frontends (future)”, roadmap item in a bundle optimization list. `README.md:21–31`: stack of a single Angular app. | weak |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA, except lockfile, README and `playwright-report`, for `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `registerApplication` and `loadRemote`: no occurrences. | absent |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 24 commits (24 across all refs), one a merge (the SHA, PR #1 from `develop`). All belong to the same owner, with three identities:
- `Sergey <seygorin@gmail.com>` for most development;
- `Sergey Gorin <s.gorin@mediana.kz>` in the first three code commits (2025-09-10 and 2025-09-11);
- `Sergey Gorin <69956633+seygorin@users.noreply.github.com>`, with committer `GitHub`, in the root commit and merge.

Development is incremental, from 2025-09-10 (“init: start blank project”) to 2025-09-28. `git rev-list --objects $SHA --missing=print` lists 155 missing objects, none in the SHA tree. No historical blob was read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit: one Angular project with one entry point and one build (`angular.json:12–23`; `src/main.ts:1–5`). No composition configuration (recorded search). |
| Q2 | No | There are not two units; features are imported by the same application, including through relative paths between folders (`login.component.ts:4–5`). |
| Q3 | No | There is no host loading units; routing lazily loads internal components (`app.routes.ts:6–53`). |
| Q4 | No | No composition mechanism; Module Federation is a future intention (`README.md:428`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”.
- It matches “conventional frontend monoliths” and “repositories mentioning micro-frontends without implementing them”: the mention is only a roadmap item.
- `frontend_units: 1`, `single-unit`, `ui_technologies: [angular]`. `build_tools: []`: the Angular CLI builder encapsulates the bundler, and there is no explicit bundler configuration. `README.md:30` cites “Angular CLI with Vite”, but a tool is not recorded based only on documentation.
- `repo_type: example`: portfolio/study project (“to do some stuff” in the first code commit), published on Netlify.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** a single roadmap line (“Module federation for micro-frontends (future)”, `README.md:428`) in an extensive README (452 lines) suffices for three terminology and technology hits.
- **Protocol (search):** the singular hit has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).

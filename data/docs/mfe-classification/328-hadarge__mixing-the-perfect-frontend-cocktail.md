---
schema: 1
id: 1023885635
full_name: hadarge/mixing-the-perfect-frontend-cocktail
url: https://github.com/hadarge/mixing-the-perfect-frontend-cocktail
commit: e7c5673b9b1aa4fdcb2a9fed774c01d3a1b15b9e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [vue, react, angular]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 328 — hadarge/mixing-the-perfect-frontend-cocktail

## Context

Example repository for a meetup talk about exposing Vue components as Custom Elements and consuming them in other frameworks; topics include “Micro frontends using Web Components” (`README.md:1–13`, `95–99`). It has three applications:
- `vueApp` (Vite, port 3333), generating a Web Components bundle (`wcMain`);
- `reactApp` (Vite, port 2222, according to the README);
- `angularApp` (Angular CLI, port 4200).

React and Angular render `<like-button>` and `<video-player>` and load the Web Components bundle from `http://127.0.0.1:8080/assets/wcMain2.js`. At the SHA, however, the Vue build does not generate `wcMain2.js`, and current `wcMain.ts` registers only `<my-element>`: registrations of `like-button` and `video-player` are commented out. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:329` records rank 328, ID 1023885635, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:329` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:16687` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:16691` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same three hits in each round, all from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-07` | 2026-10-07T22:23:25.993Z / 2026-10-08T15:55:00.383Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-07` | 2026-10-07T22:55:22.281Z / 2026-10-08T16:06:09.612Z |
| `technology-web-components-mfe-repositories`: `"web components" "micro frontends" in:readme` | (no partition) | 2026-10-07T23:36:44.830Z / 2026-10-08T16:22:04.662Z |

Terminology queries append `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Hit metadata:
- null description, no topics, language Vue, `fork: false`, size 199;
- created at 2025-07-21T21:14:27Z, pushed at 2025-07-23T06:29:37Z.

Spellings in the README:
- “Micro frontends”: `README.md:13` (“🧩 Micro frontends using Web Components”);
- “micro frontend”: `README.md:91` (“…powerful micro frontend possibilities…”);
- “Web Components”: `README.md:3`, `13`, `88`, `90`.

The last README change is `9cf3b04` (2025-07-22), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 71 entries, all regular files `100644`; zero symlinks and zero gitlinks. Three apps (`vueApp`, `reactApp`, `angularApp`), each with `package.json`, lockfile, build config and `src/`; at the root, `README.md` and `.idea/`. | context |
| Producer (Vue) | `vueApp/vite.config.ts:18–29`: entry points `main` and `wcMain` with output `assets/[name].js`, thus generating `assets/wcMain.js`. `vueApp/package.json:8–12`: `build` performs build and `serve` (`http-server --cors` in `dist`). `vueApp/src/webcomponents/defineLikeButton.ts:1–12`: `defineCustomElement(LikeButton)` registered as `like-button`. `vueApp/src/wcMain.ts:1–3`: registers only `my-element`; registrations of `like-button` and `video-player` are commented out (`:5–10`, `20–24`). | ambiguous |
| Consumer (Angular) | `angularApp/src/index.html:9`: `<script type="module" src="http://127.0.0.1:8080/assets/wcMain2.js">`. `angularApp/src/app/app.html:190–191`: `<video-player>` and `<like-button #likeBtn>`. `angularApp/src/app/app.ts:9`, `14–27`: `CUSTOM_ELEMENTS_SCHEMA` and callback `onLikeChange`. | moderate |
| Consumer (React) | `reactApp/src/App.tsx:61–73`: `<LikeButton>` and `<VideoPlayer>`, wrappers of `CustomElement` (`reactApp/src/components/Base.tsx:15–27`). `:77–82`: “Dynamic load” button injecting the same `wcMain2.js`. `reactApp/index.html:9` and `reactApp/src/main.tsx:5` have static loading commented out. | moderate |
| Mismatch | `git grep wcMain2` at the SHA: only consumer references; no entry point or `wcMain2` file in `vueApp`. Consumed elements (`like-button`, `video-player`) are not registered by current `wcMain.ts`. The SHA (“import name change”) changes `wcMain.ts`, `component1.*`, `wcindex.html` and `reactApp/src/main.tsx`, and the previous commit is named “init state”. | contrary |
| Source code (boundaries) | Search for `../../` imports at the SHA: none; `reactApp/src/main.tsx:5` and `vueApp/src/main.ts:4` have cross-app imports commented out. Each app imports only its own files and packages. | context |

## Authorship and history

Non-shallow clone; 10 linear commits, no merges, all by `hadarge`, from 2025-07-22 (`5ff9ea5`, “first commit”) to 2025-07-23 (SHA `e7c5673`, “import name change”). These include `0ede992` (“align react and angular to use the vue package”) and `6713980` (“init state”). Only branch `main` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Although three applications exist, no external unit is actually integrated: host references do not match the Vue-produced bundle. |
| Q2 | No | Project separation does not form units participating in functional composition in the snapshot. |
| Q3 | No | Hosts attempt to render elements the producer does not register and point to a nonexistent bundle. |
| Q4 | No | `wcMain2.js` is not generated and consumed Custom Elements are commented out; the integration chain is disconnected. |
| Q5 | No | Q1–Q4 do not demonstrate functional composition between frontend units. |

## Rationale

- Classified as `Non-MFE`: consumers point to a nonexistent bundle and attempt to use elements the producer does not register in the snapshot.
- **Comparison:** producer and consumers exist, but the integration connection is objectively disconnected in this version.
- **Fields:**
  - `approaches: [web-components]` (Vue Custom Elements distributed through script, as in 049);
  - `ui_technologies: [vue, react, angular]`;
  - `build_tools: [vite]` (Vite in Vue and React apps; Angular uses `@angular/build`);
  - `frontend_units: 3`, `unit_organization: monorepo`;
  - `repo_type: example` (talk repository).

## Analysis notes

- **RQ2:** Web Components as a cross-framework integration mechanism: Vue `defineCustomElement` is consumed by React (wrapper assigning properties and callbacks) and Angular (`CUSTOM_ELEMENTS_SCHEMA` and `ViewChild`).
- **Protocol (search):** entry also through the Web Components technology query, with literal spellings. Eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Classified as `Non-MFE`. React and Angular point to `wcMain2.js`, a file the Vue build does not produce, and consumed elements are commented out in the producer. The analyzed version contains no connected composition.

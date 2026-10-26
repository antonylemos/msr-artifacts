---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
url: https://github.com/horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 164 — horoshopodumaj/micro-frontends

## Context

Module Federation demonstration with Rspack, a Russian README and three applications:
- `host` (React), consuming `remote`;
- `remote` (React), exposing `./RemoteContent` and consuming `vue_remote`;
- `vue-remote` (Vue 3), exposing `./Counter` and `vue` itself.

The README calls this “nested federation” host → remote → vue_remote (`README.md:1–34`, `133`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:165` records rank 164, ID 1384034898, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:165` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:37818` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:37850` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same five hits in each round, from endpoint `repositories`, with subquery `…#created:2026-09` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T22:03:48.491Z / 2026-10-08T15:44:10.757Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:14:40.356Z / 2026-10-08T15:50:44.553Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:42:26.531Z / 2026-10-08T16:02:06.454Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:12:35.014Z / 2026-10-08T16:10:44.980Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:31:04.154Z / 2026-10-08T16:19:36.684Z |

Effective queries append `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 86;
- created at 2026-09-23T18:46:24Z, pushed at 2026-09-23T18:58:30Z.

README spellings:
- “Microfrontends”: `README.md:1` (“# Microfrontends Demo (Rspack + Module Federation)”);
- “Module Federation”: `README.md:1`, `3`, `136`.

The forms “microfrontend” (singular), “micro frontend” and “micro frontends” do not appear in the README or description; elsewhere the README uses Russian “микрофронтенд…” (English translation: “microfrontend…”) and “microfront” (`README.md:24`, `30`). The `"micro frontend"`/`"micro frontends"` hits may come from field `name` (`micro-frontends`, with hyphen as separator), and the `microfrontend` hit from GitHub search text processing, which is not recorded. This records provenance only; the name is not used as classification evidence.

The README was created in the SHA itself, `e1e0a52` (2026-09-23), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 46 entries, all regular `100644` files; zero symlinks and zero gitlinks. Three projects with their own `package.json`, `rspack.config.ts` and `module-federation.config.ts`: `host/`, `remote/` and `vue-remote/`. The README calls the last `vue_remote/` (`README.md:62`, `78`, `123`), the container name, rather than the directory name. No root workspace. | context |
| Configuration (host) | `host/module-federation.config.ts:1–8`: `remotes: { remote: 'remote@http://localhost:3001/remoteEntry.js' }`, `exposes: {}`, `shared` react/react-dom. `host/rspack.config.ts:5`, `81`: `ModuleFederationPlugin` from `@module-federation/enhanced/rspack`. | strong |
| Configuration (remote) | `remote/module-federation.config.ts:1–11`: `filename: 'remoteEntry.js'`, `remotes: { vue_remote: 'vue_remote@http://localhost:3002/remoteEntry.js' }`, `exposes: { './RemoteContent' }`. `remote/rspack.config.ts:24–34`, `81`: port 3001, `publicPath` `http://localhost:3001/`. | strong |
| Configuration (vue-remote) | `vue-remote/module-federation.config.ts:1–14`: `exposes: { './Counter': './src/Counter.vue', './vue': 'vue' }`, singleton and eager vue `shared`. `vue-remote/rspack.config.ts:23–34`, `78–82`: port 3002, `VueLoaderPlugin`, `ModuleFederationPlugin`. | strong |
| Source code (consumption) | `host/src/App.tsx:3`, `19`: `import RemoteContent from 'remote/RemoteContent'`, rendered in content. `remote/src/RemoteContent.tsx:2`, `10`: uses `CounterWrapper`. `remote/src/CounterWrapper.tsx:2–13`: imports `vue_remote/Counter` and `createApp` from `vue_remote/vue` and mounts the Vue component in a `div` (React → Vue). `host/src/index.ts:1`, `remote/src/index.ts:1` and `vue-remote/src/index.ts:1`: asynchronous bootstrap. | strong |
| Source code (boundaries) | Searching for `../` imports and requires across the SHA returns nothing. Cross-unit imports use only federated names (`remote/…`, `vue_remote/…`). Type declarations are local: `host/@mf-types/remote/*.d.ts` (generated remote types) and `remote/src/types/remote.d.ts:1–11`. | context |
| Build/deploy | `host/package.json:4–8`, `remote/package.json:4–8` and `vue-remote/package.json:4–8`: `rspack build`/`rspack serve` in each project, with ports 3000/3001/3002 (`README.md:40–44`). | moderate |

## Authorship and history

Non-shallow clone with 2 commits, no merges, by Diana Murtazina:
- `5501ade` (2026-09-23T21:46:17+03:00, “demo micro frontends”, `<murka8831@yandex.ru>`) adds the 45 code files;
- SHA `e1e0a52` (2026-09-23T21:58:30+03:00, “Create README.md”, noreply, through GitHub) adds only the README.

No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units in the repository, referenced by composition configurations (`host/module-federation.config.ts:3–5`; `remote/module-federation.config.ts:4–6`). |
| Q2 | Yes | Each unit has its own entry, build and server (`*/rspack.config.ts`; `*/package.json`), without source code imports between them. |
| Q3 | Yes | The host mounts `RemoteContent` (`host/src/App.tsx:19`), which in turn mounts Vue `Counter` (`remote/src/CounterWrapper.tsx:9–10`) on the same page. |
| Q4 | Yes | Module Federation configured and consumed in both links: `remotes` → `exposes` → federated import → render/mount (`host/src/App.tsx:3`; `remote/src/CounterWrapper.tsx:2–3`). |
| Q5 | Yes | Q1–Q4 are Yes: nested MF example between React and Vue. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- The chain is complete in the snapshot, as in 076/084/096/106/109, and nested: `remote` is simultaneously a producer for the host and a consumer of `vue_remote`.
- Not code sharing (089/100): the host composes the content area with a remote UI fragment, and `remote` mounts a Vue component as an application (`createApp`). Components are simple, but the host → remote link composes an application section. Exposing `./vue` serves to mount the component, rather than being the object of composition.
- No third-party platform (102/074/080) or content without implementation (023).
- `approaches: [module-federation]`, `ui_technologies: [react, vue]`, `build_tools: [rspack]`, `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example`.
- No decision remains open.

## Analysis notes

- **RQ2:** nested Module Federation (host → remote → vue_remote) with `@module-federation/enhanced` in Rspack. Cross-framework integration exposes `vue` itself (`./vue`) to mount the Vue component inside React.
- **RQ3:** remote types generated in `host/@mf-types/` and versioned.
- **Protocol (search):** five queries match. Only “Microfrontends” and “Module Federation” have literal spellings (`README.md:1`); other hits depend on GitHub text processing. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, `[react, vue]`, `rspack`, three units and `monorepo`; no open decision (`draft`). Composition is executable in two links: React host → React remote → remote Vue component. Clarifications: (1) intermediate component `remote/src/RemoteContent.tsx:2–10` connects the federated exposure to the Vue wrapper and belongs in the chain; generated types are in `host/@mf-types/remote/RemoteContent.d.ts:1–12`; (2) Q2 and Q5 should point to concrete paths per unit (`host`, `remote` and `vue-remote`: each one's `rspack.config.ts` and `package.json`) and the composition chain, rather than wildcards; (3) verified cleanup defect: `remote/src/CounterWrapper.tsx:12` returns `counter.unmount` without invoking it (`return () => counter.unmount`), which may prevent Vue app unmounting when React cleans up the effect, without eliminating mounting or the federated connection; (4) verified documentation inconsistency: the README says to enter `vue_remote` (`README.md:62,78,123`), but the directory is `vue-remote`, and `vue_remote` is the federated container name, so literally copied commands may fail; (5) provenance: the database records terms, hits and metadata, but not the matched field; null description and empty topics eliminate those two fields, not the README (`Microfrontends` and `Module Federation` in `README.md:1,3,136`), so origin cannot be recovered by field (name `micro-frontends` is plausible for spaced phrases); this does not affect classification. The README (2026-09-23) precedes searches.

---
schema: 1
id: 939127087
full_name: tessOu56/micro_frontends
url: https://github.com/tessOu56/micro_frontends
commit: 7aa20b25af6f893cc96499dbace9875bfd349efc
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 092 — tessOu56/micro_frontends

## Context

Lab with a React application in `apps/web3/` importing a button from workspace library `@my-org/ui`. The README identifies this scope and denies federation (`README.md:3–10`); classification is also based on code and configuration, not this statement alone.

The SHA matches `data/samples/mfe-sample-001/clones.csv:93`. The complete inventory through `git ls-tree -r 7aa20b25af6f893cc96499dbace9875bfd349efc` contains **2.486 entries: 2.308 regular or executable files, 177 symlinks (mode 120000, all under `node_modules/`, typical of pnpm) and one gitlink**. Of these, **2.453 entries are under `node_modules/` directories**; outside them there are 32 blobs and the gitlink. One own frontend implementation is observed, in `apps/web3/`. `packages/ui/` is a single-component library, and vendored packages are not additional targets. `frontend_units: 1` and `unit_organization: single-unit` describe frontend targets, although overall repository organization is an application-and-library monorepo.

Gitlink `apps/web3/apps/sso-ui` points to `e5bbee185dfcc659f37a98206f8e039f35edf961`; `.gitmodules:1–3` identifies external repository `arwoosa/sso-ui`. This directory was not entered, the submodule was not initialized and the network was not used. Absence of host integration was evaluated in the snapshot’s own files, without assuming submodule content.

**Branches, for the record only:** `main`, `origin/main` and `origin/HEAD` point to the pinned SHA; there is also `origin/cursor/docs-readme-proof-w3` at `30a66e21aa235ffc78d33bb78db92bd2550a5fa7`, whose content does not support this annotation. The clone is not shallow and the actual count of commits reachable from the evaluated SHA is **4**, checked through `git rev-list --count`.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:93` records `strategies: terminology;technology` and `eligibility_status: pass`. `data/samples/mfe-sample-001/manifest.json:2–5` identifies the origin as `data/discovery/mfe-round-002`. That round’s database was queried exclusively with `sqlite3 -readonly`.

In table `hits`, filtering `repository_id = 939127087` and joining `query_id` with `queries`, four records were found. All are repository searches (`endpoint = repositories`), with empty `path`, not code results locating a specific file:

| query_id | strategy | Query recorded in `queries.q` |
|---|---|---|
| `technology-module-federation-repositories` | `technology` | `"module federation" in:name,description,readme` |
| `terminology-micro-frontend-repositories` | `terminology` | `"micro frontend" in:name,description,readme` |
| `terminology-micro-frontends-repositories` | `terminology` | `"micro frontends" in:name,description,readme` |
| `terminology-topic-microfrontends` | `terminology` | `topic:microfrontends` |

Audit source: `data/discovery/mfe-round-002/discovery.sqlite`, tables `hits`/`queries`, identified by the keys above; SQLite records do not have textual line numbering. Reproducible read query:

```sql
SELECT q.query_id, q.strategy, q.endpoint, q.q, h.path
FROM hits h JOIN queries q ON q.query_id = h.query_id
WHERE h.repository_id = 939127087
ORDER BY q.query_id, h.path;
```

These hits explain the recorded strategies, without confirming the technology. The README contains the phrase Module Federation in a negation (`README.md:3`, `README.md:10`); discovery metadata (at query time, not snapshot time) explains the hits: the description is "Turbo + pnpm monorepo lab — shared React UI package consumed by a Vite host app (micro-frontend exploration)." and topics include `microfrontends`, `monorepo`, `pnpm`, `react`, `turbo` and `vite` (`data/discovery/mfe-round-002/candidates.csv`, read in read-only mode). The topic generates the `terminology-topic-microfrontends` hit; "micro frontend(s)" comes from the description and repository name (`micro_frontends`, `README.md:1`); and the `technology-module-federation-repositories` hit can only come from the negation in `README.md:3` and `:10`, since the description lacks the term. This is concrete RQ1 evidence: the technology strategy was triggered by an explicit technology negation. Round 001 records the same hits. None of this proves implemented federation.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Configuration | `pnpm-workspace.yaml:1–3` includes `apps/*` and `packages/*`; `package.json:7–10` executes Turbo tasks. Application `web3` has Vite scripts in `apps/web3/package.json:6–8`; the UI package declares `main: index.jsx` and only a dev script in `packages/ui/package.json:5–8`. There is no second own application target with UI entry/build. | contrary |
| Technology / Source code (entry) | `apps/web3/index.html:9–10` provides `#root` and loads `src/index.jsx`. `apps/web3/src/index.jsx:1–8` imports React/ReactDOM and `Button` from `@my-org/ui`, defines a local App component and mounts it. There is no remote import, external router or SSO submodule loading. | contrary |
| Source code (shared library) | `packages/ui/index.jsx:1–3` exports only a styled button. `apps/web3/package.json:13–16` declares the `workspace:*` dependency, and `apps/web3/src/index.jsx:1–5` consumes it through static import. This is library component sharing in the application build, without a demonstrated separate frontend unit. | contrary |
| Configuration (Vite) | `apps/web3/vite.config.js:1–12` configures the React plugin, root and server on port 5173. It declares no federation, remotes/exposes, import map or mounting of another application. The bundler is explicit in this file, besides the scripts in `apps/web3/package.json:6–8`. | contrary |
| Structure / Composition (gitlink) | `.gitmodules:1–3` records the SSO submodule; it is a mode 160000 Git entry, not expanded own source. Searching `sso-ui` in own code/configuration found it only in `.gitmodules`. The README calls the submodule exploration (`README.md:10`). No consumer connects this gitlink to the observed application. | context |
| Documentation | `README.md:3–10` delimits a Vite-host-and-library lab, without federation; `README.md:15–19` describes the pieces; `README.md:28` states local execution without deployment. The inventory contains no ADRs, `docs/` directory or other own architecture document/diagram. Successors cited in `README.md:11` were not treated as units composed in this snapshot. | context |
| History | Four commits: `bf2c53f84d452b7d4ad469b460490ddb787faaeb` (2025-02-26, init), `d96562187949c9a962ffec89bb129c1939c5250b` (2025-03-07, git setting), `bccd80e021ca22f7098f2d8bfbb0984b365a259c` (2026-09-02, docs: add README — monorepo host + shared UI lab) and the evaluated SHA (2026-09-17, docs(readme): recruiter-facing GitHub audit Wave 3 stub (#1)). Objects compared through `git ls-tree`: entry, Vite config and button have the same blobs in all four commits (`apps/web3/src/index.jsx:1–8`, `apps/web3/vite.config.js:1–12`, `packages/ui/index.jsx:1–3`). The gitlink and `.gitmodules` appear in the second and remain unchanged. Architectural evolution was not inferred from commit titles. | context |
| Technology / Configuration / Source code (negative search) | All own `.js`, `.jsx`, `.json`, `.html`, `.md`, `.yaml` and `.gitmodules` files, excluding `node_modules/`, `.turbo/`, lockfiles and the gitlink, were searched for `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` and `srcDoc`. There are only negative Module Federation mentions in the README, not composition configuration/code. | absent |
| Structure (negative unit/preparation search) | HTML entries and application manifests outside dependencies and the gitlink were searched: one HTML entry in `apps/web3/`; `packages/ui/` has no HTML, mount/unmount, application bootstrap, remote configuration or own application build. The submodule is not referenced by composition configuration, and successor links in the README are documentation, without an integration contract. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One own application (`apps/web3/index.html:9–10`, `apps/web3/src/index.jsx:1–8`). The other package is a button library (`packages/ui/index.jsx:1–3`); the SSO gitlink has no observable consumer. There is no configuration composing or referencing two frontend units. |
| Q2 | No | There is neither a set of independent frontend units nor a unit prepared for an external host. The application has a Vite build (`apps/web3/package.json:6–8`), but the library is statically imported by `apps/web3/src/index.jsx:1` and declares only its component file in `packages/ui/package.json:5`. |
| Q3 | No | The local tree only mounts App and Button (`apps/web3/src/index.jsx:4–8`); there is no host/shell loading other applications. The host designation in the README does not replace this criterion. |
| Q4 | No | Vite config only enables React and server (`apps/web3/vite.config.js:4–11`); library consumption is static import. No composition mechanism or SSO contract was found. |
| Q5 | No | Code and configuration demonstrate a conventional application with a shared library (`apps/web3/src/index.jsx:1–8`, `packages/ui/index.jsx:1–3`), consistent with limitations documented in `README.md:3–10`. Q5 follows Q1–Q4, without override. |

## Rationale

- Proposed `Non-MFE`, Q1–Q5 No: an application lab with a shared library, without composition implementation between frontend units.
- It is not MFE-unit: the only observed frontend exports no lifecycles/modules to an external host. Q2–Q4 are No, without inferring preparation from the repository name or gitlink existence.
- The case does not depend on the open build-time composition decision: the shared package is only a Button component, without application entry, mounting contract or own unit build. Not every workspace dependency becomes a frontend application. Nor is there federation used only as code sharing, as in the doubt in 089: this candidate has no implemented federation.
- The library and versioned dependencies do not count in Q1/`frontend_units`. Successors and submodule have no observable implemented composition relationship; the distinction in precedents 023/028 between targets/references and a composite application applies. There is no iframe/link with contract or platform plugin to review.
- `build_tools: [vite]` records explicit application configuration; `ui_technologies: [react]` records observed imports and mounting. Turbo/pnpm organize tasks/packages and are not additional unit bundlers.

## Analysis notes

- **RQ1 (sampling):** `sample.csv` records both strategies and the four database hits detail them. Technology search in metadata/README can hit a technology negation. Code and configuration observation remains necessary.
- **RQ1 (inventory):** 2.453 vendored entries and the gitlink were separated from own implementation. The submodule was not expanded, its content was not attributed to the candidate and dependencies or Turbo logs/cookies were not counted as frontend units.
- **Protocol (families):** searches in annotations for `tessOu56` and `sso-ui` found no previously recorded siblings. `README.md:11` identifies `nx-playground` and `ai-search-portal` as successors by the same author; they were not accessed and this does not demonstrate architecture or template duplication in the candidate. Case 089 is a sharing/composition boundary comparison, without evidence of a shared family; here static library sharing is explicit and without remote orchestration.
- **Protocol (limitations):** only the pinned commit, trees/metadata from the four ancestor commits and local read-only discovery records were used. Installation, build, app, tests or submodule commands were not run, nor was the network used. Lack of submodule inspection does not prevent classifying the observed host: there is no reference to it as a unit in configuration or consumer code.

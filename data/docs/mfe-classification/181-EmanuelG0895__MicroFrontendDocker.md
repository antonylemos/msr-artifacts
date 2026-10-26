---
schema: 1
id: 1009817207
full_name: EmanuelG0895/MicroFrontendDocker
url: https://github.com/EmanuelG0895/MicroFrontendDocker
commit: 137ba29996f64553efd3401f8ad619646d8a78e5
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 181 — EmanuelG0895/MicroFrontendDocker

## Context

“Prueba Técnica - Microfrontends con Module Federation” (English translation: “Technical Test - Microfrontends with Module Federation”; `README.md:1–12`): technical test with three React + TypeScript applications in Rspack, using `@module-federation/enhanced`, packaged with Docker Compose and Nginx.
- `MF-Shell` is the host, consuming `MF_CharacterDetail/View` and `MF_Characters/Vista`.
- `MF-CharacterDetail` exposes the character list.
- `MF-Characters` exposes the detail screen.

The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:182` records rank 181, ID 1009817207, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:182` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:15729` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:15733` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same four hits in each round, from endpoint `repositories`, with subquery `…#created:2025-06` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:37:52.559Z / 2026-10-08T15:38:14.867Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:07:57.374Z / 2026-10-08T15:47:25.710Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:22:18.917Z / 2026-10-08T15:54:28.552Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:17:55.163Z / 2026-10-08T16:14:22.984Z |

Effective queries append `pushed:>=2025-04-01 created:2025-06-01..2025-06-30`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, size 126;
- created at 2025-06-27T19:04:41Z, pushed at 2025-08-19T18:51:17Z.

README spellings:
- “Microfrontends”: `README.md:1`;
- “microfrontends”: `README.md:3`, `7`;
- “Microfrontend”: `README.md:201`, `206`;
- “Module Federation”: `README.md:1`, `3`, `108`, `222`.

The separated form “micro frontend” does not appear in the README or description; that hit depends on GitHub search text processing (or field `name`), which is not recorded.

The README's last change is `feccf9f` (2025-06-27). The SHA (2025-08-19) does not change the README (`git diff-tree`). Both precede October 2026 collection, and the SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 88 entries, all regular `100644` files; zero symlinks and zero gitlinks. Three projects, `MF-Shell/`, `MF-Characters/` and `MF-CharacterDetail/`, each with `package.json`, `rspack.config.ts`, `module-federation.config.ts` and `src/`. Root contains `Dockerfile` (shell's), `docker-compose.yml`, `nginx.conf` and validation scripts. `MF-Characters` and `MF-CharacterDetail` also have `webpack.config.js` unused by scripts (`package.json:4–9`, using `rspack`). | context |
| Configuration (host) | `MF-Shell/module-federation.config.ts:1–12`: `remotes` `MF_CharacterDetail@http://localhost:3003/remoteEntry.js` and `MF_Characters@http://localhost:3002/remoteEntry.js`, with singleton react and react-dom `shared`. `MF-Shell/rspack.config.ts:5`, `24`, `98`: `ModuleFederationPlugin` from `@module-federation/enhanced/rspack`, port 3000. | strong |
| Configuration (remotes) | `MF-CharacterDetail/module-federation.config.ts:1–10`: `exposes` `./View` and `./CharacterInfo` (`./src/components/view.tsx`). `MF-CharacterDetail/rspack.config.ts:25`, `38`: port 3003. `MF-Characters/module-federation.config.ts:1–8`: `exposes` `./Vista`. `MF-Characters/rspack.config.ts:25`, `33`: port 3002. Development ports match host `remotes`. | strong |
| Source code (consumption) | `MF-Shell/src/App.tsx:6–8`, `25–40`: `React.lazy(() => import("MF_CharacterDetail/View"))` at route `/` and `Details` at `/details/:id`. `MF-Shell/src/app/details.tsx:3`, `13`: `React.lazy(() => import("MF_Characters/Vista"))`. `MF-CharacterDetail/src/components/view.tsx:7–27`: `onCharacterClick` forwarded by host. `MF-Shell/src/index.ts:1`: asynchronous bootstrap. `MF-Shell/@mf-types/`: generated remote types. | strong |
| Source code (boundaries) | Searching for `../../` imports at the SHA returns nothing. Cross-project imports are only federated. | context |
| Build/deploy | `docker-compose.yml:1–60`: services `nginx`, `mf-shell`, `mf-characters` and `mf-character-detail`, each with its own image. `nginx.conf:6–53`: per-service upstreams and routes. In production, `start:prod` uses ports 3000/3001/3002 (`MF-*/package.json:9`), different from `remotes` URLs (3002/3003), and README records this problem type (“Los puertos de Module Federation no coinciden…”, English translation: “Module Federation ports do not match…”; `README.md:157`). The chain is coherent in development mode. | moderate |

## Authorship and history

Non-shallow clone; 18 commits, no merges, all by `EmanuelG0895` (noreply).
- **Development:** almost all on 2025-06-27, from `4f9653f` (“Initial commit”) to `feccf9f` (“README”), through messages “micrfrontend con buscador…” (English translation: “micrfrontend with search…”), “ruta creada y funcionando” (English translation: “route created and working”) and Docker commits.
- **SHA:** `137ba29` (2025-08-19, “Update ports, module federation, and type definitions”) changes `MF-Shell/module-federation.config.ts`, `webpack.config.js`, types in `@mf-types` and `api.ts` (`git diff-tree`).

No historical blob was read. The clone is partial (`blob:none`): `git log --name-status` of `MF-Shell` stops with `lazy fetching disabled` when requesting object `140fae5…`, which `git cat-file` confirms unavailable; `MF-Characters` and `MF-CharacterDetail` histories reach their initial additions. The assessed tree is complete and all 18 visible commits have the same recorded authorship, but the entire historical `MF-Shell` change list is not certified.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units in the repository, referenced by shell composition configuration (`MF-Shell/module-federation.config.ts:3–6`). |
| Q2 | Yes | Each unit has its own entry, build, port and Docker image (`MF-*/rspack.config.ts`; `docker-compose.yml`), without source code imports between them. |
| Q3 | Yes | Shell mounts both remote screens by route (`MF-Shell/src/App.tsx:25–40`; `src/app/details.tsx:13`). |
| Q4 | Yes | Module Federation configured in host and remotes and consumed through federated `import()`. Dev ports match (`MF-Shell/module-federation.config.ts:4–5`; `MF-Characters/rspack.config.ts:25`; `MF-CharacterDetail/rspack.config.ts:25`). |
| Q5 | Yes | Q1–Q4 are Yes: shell with two remotes in Rspack and Module Federation. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units”.
- The chain is complete in the development snapshot, as in 076/084/096/106/109. Remotes expose domain screens mounted by route, rather than generic components (089/100).
- Production Docker configuration port mismatch is an operational defect and does not remove configured and consumed composition.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rspack]` (`webpack.config.js` files are unused remnants), `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example` (technical test).
- No decision remains open.

## Analysis notes

- **RQ2:** Module Federation with Rspack and `@module-federation/enhanced`, generated remote types (`@mf-types`) and Docker Compose with Nginx as per-unit proxy.
- **RQ3:** port inconsistency between dev (3002/3003) and prod (3001/3002) in `remotes` URLs, identified in the README itself as a known problem. Module names also do not match content: `MF_CharacterDetail` exposes the list, `MF_Characters` exposes detail.
- **Protocol (search):** four queries match; separated hit `"micro frontend"` has no literal spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented and Q1–Q5 Yes (`draft`), without an open methodological decision. Three independent React applications, each with package, entry and Rspack build; shell applies Module Federation in configuration used by scripts (`MF-Shell/module-federation.config.ts:4–5`), declares two remotes and imports their exposures through names matching modules and exports. Material caveat, verified at the SHA: composition is demonstrated for development (remotes at `localhost:3002` and `3003`, `MF-Characters/rspack.config.ts:25,33` and `MF-CharacterDetail/rspack.config.ts:25,38`); production Docker/Nginx profile listens on 3001 and 3002 (`start:prod`, `EXPOSE`, `README.md:10–11`) and Nginx does not route `/remoteEntry.js` or chunks through expected URLs, so chain coherence holds for development, rather than production deployment (as in final 007, where the development path suffices). `shared-hooks` is extra configuration without resolution or use. Hit origin for “micro frontend” is probably CamelCase name `MicroFrontendDocker`, a hypothesis rather than a proven field. “Prueba Técnica” (English translation: “Technical Test”; `README.md:1–3`) supports `example`.

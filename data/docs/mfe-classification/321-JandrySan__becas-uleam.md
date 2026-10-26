---
schema: 1
id: 1294611998
full_name: JandrySan/becas-uleam
url: https://github.com/JandrySan/becas-uleam
commit: 613ce6ac8c615f494d214e3d1e01fa3d08e02267
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [iframe]
ui_technologies: [vue, react, angular]
build_tools: [vite, esbuild]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 321 — JandrySan/becas-uleam

## Context

Integrated academic project (“Proyecto integrado Demo Day”; English translation: “Integrated Demo Day project”, `README.md:1`) for a university’s scholarship workflow: a vanilla-TS container handles single login and loads, through `<iframe>`, three modules in different frameworks — Vue (`1verificador-vue/`, eligibility), React (`2postulacion-react/`, application) and Angular (`3seguimiento-angular/`, tracking) —, each assigned to a team member (`README.md:5–10`, `82–88`). The README says it avoided Module Federation in favor of iframes under the same domain (`README.md:94`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:322` records rank 321, ID 1294611998, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:322` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:33178` (`technology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:33186` (`technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2026-07` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-07-31` | 2026-10-07T23:29:11.347Z / 2026-10-08T16:19:00.527Z |

Hit metadata: null description, no topics, language TypeScript, no license, `fork: false`, size 1509, created at 2026-07-09T04:02:23Z, pushed at 2026-07-10T16:49:02Z, Vercel homepage.

The hit comes from the only term occurrence in the README, a negation: `README.md:94` (“…integrar aplicaciones hechas con frameworks distintos sin usar herramientas complejas como module federation”; English translation: “…integrate applications built with different frameworks without using complex tools such as module federation”). The last README change is `997197b` (2026-07-09), before the collections on October 7 and 8, 2026; the README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 108 entries, all regular files `100644`; zero symlinks and zero gitlinks. Container at the root (`index.html`, `src/main.ts`, `package.json`, implicit Vite `vite.config`), three modules with their own `package.json` and entry, pnpm workspace (`pnpm-workspace.yaml:1–4`; `package.json:7–11`). `1verificador-vue/verificador/` is a nested Vue scaffold (`verificador/src/main.ts:1–5`), outside the workspace and integrated build. `3seguimiento-angular/.angular/cache/` versions Angular CLI cache. | context |
| Source code (container) | `index.html:23–27`: tabs with `data-src` `/vue/`, `/react/` and `/angular/#/seguimiento`; `index.html:61`: `<iframe id="moduleFrame">`. `src/main.ts:87–97`: changes `frame.src` according to the tab; `:24–34`: development uses `localhost:5173/vue/`, `5174/react/` and `4200/#/seguimiento`; `:120–130`: enables modules by role (administrator only tracking). | moderate |
| Source code (cross-window contract) | Container → modules: `src/main.ts:75–85` sends `BECAS_PORTAL_STATE` (session, token, user) through `postMessage`; modules → container: `src/main.ts:189–209` handles `BECAS_DATOS_ESTUDIANTE`, navigation requests (`modulo: 'postulacion'`/`'seguimiento'`) and `BECAS_*_READY` signals. Module sides: `1verificador-vue/src/views/HomeView.vue:92–103` (student data and navigation request); `2postulacion-react/src/context/PostulacionContext.tsx:56–60`, `69` and `src/pages/VistaPrevia.tsx:99`; `3seguimiento-angular/src/app/app.component.ts:17–31`. | moderate |
| Configuration (modules) | Publication base consistent with container subfolders: `1verificador-vue/vite.config.ts:4–7` (`base: '/vue/'`) and `src/main.ts:15–18` (hash history); `2postulacion-react/vite.config.ts:4–7` (`base: '/react/'`) and `src/main.tsx:11` (`HashRouter`); `3seguimiento-angular/package.json:7` (`ng build --base-href /angular/`) and `src/main.ts:14–16` (`withHashLocation`). | moderate |
| Build/deploy | `package.json:14`: `start` starts container and modules on separate ports; `:17`: `build` builds the container and each module separately and `scripts/build-integrado.mjs:14–19` copies the `dist` to `dist/vue`, `dist/react` and `dist/angular`; `vercel.json:2–6`: a single static deployment. `scripts/generar-angular-env.mjs:63–69` generates the Angular environment from root variables. | moderate |
| Source code (boundaries) | Scan of all relative specifiers (61) in `*.ts`, `*.tsx`, `*.vue`, `*.mjs`, `*.js` and `*.css` (except lockfile and Angular cache), resolved against each project root: none leaves the source project. Modules import code from neither the container nor one another; each has its own Supabase client (`src/services/supabase.ts` in each folder), and common state passes through `localStorage` and messages. | strong |
| Technology / Configuration (search) | `git grep -i` at the SHA, except lockfile and Angular cache, for `federation`, `single.?spa`, `import.?map`, `micro.?front` and `qiankun`: only the negation in `README.md:94`. | absent |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 10 reachable commits (10 across all refs), no merge, from 2026-07-08 to 2026-07-10. Metadata authorship: `JandrySan` (8 commits, noreply email) and `remanCO Skill Issue <alavajg@gmail.com>` (2 commits, `997197b` and `9796f8d`). Root `2f53246` (“estructura”; English translation: “structure”) already adds the container and three modules; subsequent commits adjust Supabase, pnpm workspace, Vercel and Angular environment. The README assigns each module to a member (`README.md:84–88`, still with placeholders “Integrante 1–3”; English translation: “Member one–three”), but metadata shows only two identities and does not allow authorship separation by module. `git rev-list --objects $SHA --missing=print` identifies 47 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Container and three frontend modules in the repository, referenced by the container (`index.html:23–27`). |
| Q2 | Yes | Own entry, build and development port per module (`package.json:14`, `17`; configs in each folder) and no source code import between them; deployment is single, but builds are separate and only copied (`scripts/build-integrado.mjs:14–19`). |
| Q3 | Yes | The container loads and switches modules in a common area, with single login and navigation through tabs and messages (`src/main.ts:87–97`, `189–209`). |
| Q4 | Yes | The container loads modules through `<iframe>` in a common area and maintains a bidirectional contract through `postMessage`, with consistent route bases and builds (`src/main.ts:75–97`, `189–209`). |
| Q5 | Yes | Q1–Q4 demonstrate independent modules composed by a common container. |

## Rationale

- Classified as `MFE-implemented`: the container composes three independent modules through iframe, with shared login and navigation and bidirectional message exchange.
- It is not `MFE-unit`: the container is in the snapshot. No code sharing (089/100) or third-party unit (102/074/080).
- `frontend_units: 4` (container and three modules; scaffold `1verificador-vue/verificador/` not counted), `approaches: [iframe]`, `ui_technologies: [vue, react, angular]` (container is TypeScript without a framework), `build_tools: [vite, esbuild]` (Vite in container, Vue and React; Angular `application` builder, `3seguimiento-angular/angular.json:14`), `repo_type: example` (academic Demo Day project).

## Analysis notes

- **RQ1 (misleading signals):** entered through search `"module federation"` because of a phrase denying use of Module Federation (`README.md:94`).
- **RQ2:** iframe composition with typed message contract (`BECAS_PORTAL_STATE`, `BECAS_*_READY`, navigation requests), shared session through `localStorage` under the same domain, hash routing in subfolders and integrated build in a single static `dist`.
- **RQ3:** modules assigned by framework to distinct members (`README.md:84–88`, `92`), as explicit justification for team independence.
- **Protocol:** `3seguimiento-angular/src/environments/environment.generated.ts` is versioned, although the generator says it should not be committed to the repository (`scripts/generar-angular-env.mjs:76–77`); its content is not reproduced here.

## Recorded decision

Promoted to `MFE-implemented`. The container integrates three modules in distinct frameworks, with separate builds, shared login and navigation, iframes in a common area and a bidirectional contract through `postMessage`. Joint final deployment does not eliminate observed composition boundaries.

---
schema: 1
id: 1082162546
full_name: LucasMJuarez/monorepo-nx-vite
url: https://github.com/LucasMJuarez/monorepo-nx-vite
commit: c298b28bab0af47ef32f442a5ab560105b72e4af
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 137 — LucasMJuarez/monorepo-nx-vite

## Context

Nx workspace with two React/Vite applications, `apps/host` (port 4200) and `apps/remote` (port 4201), linked through `@originjs/vite-plugin-federation`, plus generated and unused library `apps/my-utils` (`README-MODULE-FEDERATION.md:1–27`). Host consumes only remote’s exposed `Button` component; remote also exposes `./App`, unused by any consumer. Root `README.md` is standard Nx generator text. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:138` records rank 137, ID 1082162546, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:138` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:20232` (`technology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:20238` (`technology`, `pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from code search with `path` `package.json`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `technology-vite-federation-package-code#size:1800..1999` | `"@originjs/vite-plugin-federation" filename:package.json size:1800..1999` | 2026-10-07T22:07:29.627Z / 2026-10-08T15:50:41.268Z |

Matched file is root `package.json` (1.872 bytes at SHA, within range), whose line `package.json:24` declares `"@originjs/vite-plugin-federation": "^1.4.1"`. Hit metadata contain description “monorepo de react usando nx con vite de bundler” (English translation: “React monorepo using Nx with Vite as bundler”), without populated topics, language or dates. Retrieval does not depend on README. Root `README.md` mentions neither federation nor micro-frontends; `README-MODULE-FEDERATION.md:1` and `README-MODULE-FEDERATION.md:162` mention “Module Federation” and “micro-frontends”, but are not README. `package.json` and READMEs are from SHA (2025-10-23), before October 2026 collections.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 57 entries, all regular files `100644`; zero symlinks and zero gitlinks. Three projects exist in `apps/`: `host` and `remote`, each with own `index.html`, `src/main.tsx`, `vite.config.ts`, `package.json` and tsconfigs, and `my-utils`, a Vite library in `lib` mode (`apps/my-utils/vite.config.ts:23–42`). Also `nx.json`, `package.json` and `package-lock.json` at root and one `packages/.gitkeep`. | context |
| Configuration (host) | `apps/host/vite.config.ts:17–26`: `federation({ name: 'host', remotes: { remote: 'http://localhost:4201/assets/remoteEntry.js' }, shared: ['react', 'react-dom'] })`. Server and preview at port 4200 (`apps/host/vite.config.ts:9–16`). | strong |
| Configuration (remote) | `apps/remote/vite.config.ts:16–27`: `name: 'remote'`, `filename: 'remoteEntry.js'`, `exposes: { './Button': './src/components/Button', './App': './src/app/app' }`. Server and preview at port 4201 (`apps/remote/vite.config.ts:8–15`). Both exposed paths exist (`apps/remote/src/components/Button.tsx:10–25`; `apps/remote/src/app/app.tsx:8–60`). | strong |
| Source code (consumption) | `apps/host/src/components/RemoteButtonWrapper.tsx:3`: `React.lazy(() => import('remote/Button'))`, rendered with props in `Suspense` (`apps/host/src/components/RemoteButtonWrapper.tsx:7–13`) and used at host route `/` (`apps/host/src/app/app.tsx:4`, `30–40`). `apps/host/src/types/remotes.d.ts:1–13` types `remote/Button` and `remote/App`, but only `remote/Button` is imported. | strong |
| Source code (boundaries) | Search for `from '../` and `import('../` in `apps`: `apps/host/src/app/app.tsx:4` (`../components/RemoteButtonWrapper`) and `apps/remote/src/app/app.tsx:4` (`../components/Button`) stay within each app. Files `eslint.config.mjs` import `../eslint.config.mjs` (`apps/host/eslint.config.mjs:2`; `apps/remote/eslint.config.mjs:2`), lint configuration. No code import between `host` and `remote` or from `my-utils`; host accesses remote only through federated module. Host `tsconfig.app.json` extends common base (`apps/host/tsconfig.app.json:2`). | context |
| Build/deploy | Each app has `vite.config.ts` with own `outDir` (`apps/host/vite.config.ts:31–38`; `apps/remote/vite.config.ts:32–38`), with targets inferred through plugin `@nx/vite` (`nx.json:37–49`). Root scripts: `start:host`/`start:remote` (`nx serve …`), parallel `start:all` and `build:host`/`build:remote`/`build:all` (`package.json:5–12`). | moderate |
| Configuration (operability) | Root declares `workspaces` `["packages/*", "host", "remote", "my-utils"]` (`package.json:56–61`), and lockfile records links to `host`, `remote` and `my-utils` at root (`package-lock.json:11–16`, `65–72`, `4529–4540`, `19374–19377`). Those directories do not exist at SHA, which has `apps/host`, `apps/remote` and `apps/my-utils`. `README-MODULE-FEDERATION.md:7–13` also describes root `host/` and `remote/`. App `package.json` files are named `@org-gcba/host` and `@org-gcba/remote` (`apps/host/package.json:2`; `apps/remote/package.json:2`), while scripts call `nx serve host`/`remote`. Documented flow (`README-MODULE-FEDERATION.md:59–68`, `149–152`) serves both apps in dev mode, but host points to `assets/remoteEntry.js`, remote build artifact. Configuration chain aligns; documented execution path was neither demonstrated nor executed. | ambiguous |
| Technology | Lockfile: `@originjs/vite-plugin-federation` 1.4.1, `vite` 7.1.12, `react`/`react-dom` 19.2.0 and `nx` 22.0.1 (`package-lock.json:4541–4542`, `18694–18695`, `16281–16282`, `16290–16291`, `14469–14470`). | context |
| Documentation | `README-MODULE-FEDERATION.md:29–55` reproduces remote/host configurations; `README-MODULE-FEDERATION.md:104–124` documents `remote/Button` consumption; `README-MODULE-FEDERATION.md:158–163` lists Module Federation advantages and “arquitecturas de micro-frontends” (English translation: “micro-frontend architectures”). `README.md:1–90` is standard Nx workspace text. | context |

## Authorship and history

Non-shallow clone; 2 commits, no merge, both by “lucas juarez `<lujuarez@emeal.nttdata.com>`” on 2025-10-23. Root `20e3b2a` (“Initial commit”, 16:23) creates empty Nx workspace (`nx.json`, `package.json`, lockfile, `README.md`, `packages/.gitkeep`). SHA `c298b28` (“monorepo config vite + nx + module-federations”, 17:34) adds `apps/host`, `apps/remote`, `apps/my-utils`, `README-MODULE-FEDERATION.md` and `vitest.workspace.ts` and modifies `package.json`, `package-lock.json`, `nx.json` and `tsconfig.json` (`git log --no-renames --name-status`). Since host and remote enter in same commit, history records no separate unit evolution.

Ref `origin/feature/add-host-components-shared` (`cf86e9d`, 2025-10-24, “add header inside host and shared in remote”) descends from SHA; content was not considered. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two frontend units in repository, `apps/host` and `apps/remote`, each with own entry (`apps/host/index.html:13–14`; `apps/remote/src/main.tsx:6–16`). Host configuration references remote (`apps/host/vite.config.ts:21–23`). `my-utils` is library, not unit. |
| Q2 | Yes | Each unit has own entry point, `vite.config.ts`, port and `outDir` (`apps/host/vite.config.ts:9–38`; `apps/remote/vite.config.ts:8–38`). No direct source-code import between them (recorded search); host uses only `remote/Button`. |
| Q3 | Yes | Host loads and renders remote component at its route `/` (`apps/host/src/components/RemoteButtonWrapper.tsx:3–13`; `apps/host/src/app/app.tsx:30–40`). |
| Q4 | Yes | Module Federation configured on both sides, with consistent name, exposed key, `filename`, port and `assets/` path (`apps/host/vite.config.ts:19–25`; `apps/remote/vite.config.ts:18–26`), and consumed in code (`apps/host/src/components/RemoteButtonWrapper.tsx:3`). Workspace/script inconsistencies are recorded as `ambígua` (English translation: “ambiguous”) and in review point. |
| Q5 | No | Only consumed remote module is a reusable button; complete App exposed by remote is not loaded. |

## Q5 justification

Q1–Q4 Yes would indicate Q5 Yes. Divergence rests on two points:

1. **Code sharing:** sole actual integration is a presentation `Button` exposed by remote and rendered by host (`apps/host/src/components/RemoteButtonWrapper.tsx:3–13`; `apps/remote/src/components/Button.tsx:10–25`). Exposed `./App` (`apps/remote/vite.config.ts:23`) is not consumed. Same boundary between unit composition and “Module Federation used only for code sharing” left open in 089 (button pair and hook) and 100 (MovieCard), both `Uncertain`/`review`.
2. **Operability:** workspaces and lockfile point to nonexistent directories, scripts use project names differing from package names, and documented flow serves remote in dev mode while host URL points to build artifact (row “Configuration (operability)”). Vite configuration aligns, but documented path demonstrates no connection.

Neither point produces a conclusive No, and neither resolves without judgment about a still-open criterion or execution.

## Rationale

- Exclusion of Module Federation used only for code sharing applies: sole actual integration is a reusable button.
- This is not `MFE-unit`: host and remote are in snapshot. No third-party platform (074/080/102) or composition through iframe, links or build-time packages exists.
- Unlike 097/103/104, configuration chain is consistent and resolvable in read files. Operability uncertainty concerns scripts, workspaces and documentation, not nonexistent names or exposes. Unlike 128, where documented flow (remote build + preview) completed chain, documented flow here uses dev serve on both sides.
- `repo_type: example` (`README-MODULE-FEDERATION.md:3`: “Este proyecto demuestra…”; English translation: “This project demonstrates…”). `approaches: [module-federation]` records observed mechanism. `ui_technologies: [react]`, `build_tools: [vite]` (`apps/*/vite.config.ts`). `frontend_units: 2`: `host` and `remote`, without counting `my-utils` (unused lib). `unit_organization: monorepo` (Nx workspace).

## Analysis notes

- **RQ2:** `@originjs/vite-plugin-federation` in Nx workspace with targets inferred through `@nx/vite`, `shared` as simple list and remote exposing one component and entire app.
- **RQ1 (misleading signals):** documentation and workspaces describe structure (`host/`, `remote/` at root) differing from versioned structure (`apps/…`), suggesting directory move without updating `package.json`, lockfile and README.
- **Protocol (search):** entry exclusively through code search in root `package.json`, without depending on README or description.

## Point for joint review

1. **Code sharing (principal, same point as 089/100):** decide whether remote `Button` rendered in host suffices as frontend-unit contribution.
   - **Accept as composition:** Q5 Yes and `MFE-implemented`.
   - **Apply code-sharing exclusion:** `Non-MFE`, `approaches: []`, reassessing Q1–Q4 according to decision for 089/100.
   - Joint decision with 089/100 is recommended to maintain consistency.
2. **Operability (secondary):** decide whether consistent Vite configuration suffices for Q4/Q5, as in 128, or divergence between workspaces/lockfile/scripts/README and `apps/` structure requires lowering Q4 to Undetermined. This would not change current class (`Uncertain`), but matters if point 1 is resolved in favor of composition.

Until decision, preserve `Uncertain`/`review`.

### Analyst–reviewer disagreement (for joint review)

Independent reviewer (Lupa) agrees with Q1 to Q4 Yes and `review`, but recommends Q5 No and Non-MFE, with `approaches: []`. Rationale: sole consumed integration is a generic button, `remote/Button` (`apps/host/src/components/RemoteButtonWrapper.tsx:3`), presented as "componente de botão reutilizável" (English translation: “reusable button component”) (`README-MODULE-FEDERATION.md:25–27`); `remote/App` ("aplicação completa"; English translation: “complete application”), also exposed (`apps/remote/vite.config.ts:23`) and typed in `apps/host/src/types/remotes.d.ts:10–13`, is not imported by host. Reviewer considers case closest to exclusion of Module Federation used only for code sharing. Finals 040 (`ModalRegister`) and 052 (`Header` and `Products`) show component-level composition, but with modules representing an application function or feature. 089 and 100 remain `review` and do not resolve case.

Retained `Uncertain`/`review`, as Q5 diverges from Q1 to Q4 and requires joint decision. Alternatives: Q5 No (justified override) and Non-MFE with `approaches: []`; or consider Button a composed UI unit, with MFE-implemented and all answers Yes. This decision should be made together with 089 and 100. Workspace inconsistency (`package.json:56–61` declares `host`, `remote` and `my-utils` at root, but projects are in `apps/`) is an operability finding, not an independent reason to lower Q4. Nothing was executed.

---
schema: 1
id: 1145815182
full_name: fudoyoki/ai-portal-mfe-example
url: https://github.com/fudoyoki/ai-portal-mfe-example
commit: f1fd5b0a988c45334a49d3992ebc84cb6ea5ae94
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 128 — fudoyoki/ai-portal-mfe-example

## Context

Npm-workspaces + Turborepo monorepo (`package.json:5–11`; `turbo.json:3–7`) with two Vite/React frontend applications — `apps/shell` (host) and `apps/mfe-dashboard` (remote) — linked through `@originjs/vite-plugin-federation`, two shared packages (`packages/ui-kit`, `packages/shared-types`) and a NestJS BFF (`apps/bff`). Chat, Tools and Admin remotes are only planned: commented in host configuration and displayed as “Coming soon” (`apps/shell/vite.config.ts:32–35`; `apps/shell/src/App.tsx:177–178`). Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:129` records rank 128, ID 1145815182, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:129` records strategies `terminology;technology` and eligibility `unknown`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:24141` and `data/discovery/mfe-round-002/candidates.csv:24148`, both with `terminology;technology` and eligibility `unknown`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same three hits in each round, all at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-01` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2026-01-01..2026-01-31` | 2026-10-07T23:22:25.187Z / 2026-10-08T16:16:50.018Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-01` | `"micro frontend" … created:2026-01-01..2026-01-31` | 2026-10-07T22:30:06.184Z / 2026-10-08T15:57:26.919Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-01` | `"micro frontends" … created:2026-01-01..2026-01-31` | 2026-10-07T22:59:35.430Z / 2026-10-08T16:07:45.338Z |

Hit metadata: description “Micro-frontend architecture example with Vite + React + Module Federation + NestJS BFF”, no topics, TypeScript language, `fork: false`, creation at 2026-01-30T08:48:59Z, push at 2026-01-30T15:21:37Z. Since hits do not record matched field, two possible sources exist: description and README. `module federation` appears in `README.md:3` (“Vite + React + Module Federation”), `README.md:70`, `README.md:111`, `README.md:148` and `README.md:279`. Hyphenated spelling “Micro-Frontend”/“micro-frontend” appears in `README.md:1` and `README.md:3`. No plural form (“micro frontends”/“micro-frontends”) appears in description or README. Plural-query hit depends on unrecorded GitHub search text processing.

Last reachable change to `README.md` is SHA itself, `f1fd5b0` (2026-01-30T16:21:36+01:00), before collections on 7 and 8 October 2026. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 55 entries, all regular files `100644`; zero symlinks and zero gitlinks. Workspaces `apps/*` and `packages/*` (`package.json:5–8`). Two frontend apps, each with `package.json`, `index.html`, `src/main.tsx`, `vite.config.ts`, `Dockerfile` and `nginx.conf`. Two library packages and a BFF also exist. No versioned lockfile. | context |
| Configuration (host) | `apps/shell/vite.config.ts:28–36`: `federation({ name: 'shell', remotes: { mfeDashboard: getRemoteUrl('mfeDashboard') } })`. Development URL is `http://localhost:3001/assets/remoteEntry.js` (`apps/shell/vite.config.ts:8–10`, `17–19`). `shared` declares singletons of `react`, `react-dom`, `react-router-dom` and both internal packages (`apps/shell/vite.config.ts:39–59`). | strong |
| Configuration (remote) | `apps/mfe-dashboard/vite.config.ts:11–17`: `name: 'mfeDashboard'`, `filename: 'remoteEntry.js'`, `exposes: { './DashboardApp': './src/DashboardApp.tsx' }`. Port 3001 with `strictPort` (`apps/mfe-dashboard/vite.config.ts:6`, `42–50`). Values of `shared` mirror host (`apps/mfe-dashboard/vite.config.ts:20–39`). | strong |
| Source code (consumption) | `apps/shell/src/App.tsx:7`: `React.lazy(() => import('mfeDashboard/DashboardApp'))`, mounted at route `/dashboard/*` with `Suspense` and error boundary, receiving `user` and `basePath` (`apps/shell/src/App.tsx:167–176`). Specifier matches remote name and exposed key. `apps/shell/src/vite-env.d.ts:4–8` types module with `MfeProps`. | strong |
| Source code (exposure) | `apps/mfe-dashboard/src/DashboardApp.tsx:89–97`: default export `DashboardApp({ user, basePath })` with internal routes. `MfeProps` is defined in `packages/shared-types/src/index.ts:48–51`. | strong |
| Source code (boundaries) | Search for all `import`/`export … from`/`import(` in TS/TSX and for `../` throughout SHA text. Shell and dashboard import only local files (`./…`), npm dependencies and `@ai-portal/ui-kit`/`@ai-portal/shared-types`, declared as workspace dependencies (`apps/shell/package.json:14–15`; `apps/mfe-dashboard/package.json:14–15`). Only `../` occurrences are `../../packages/ui-kit/src/**` in Tailwind `content` (`apps/shell/tailwind.config.js:6`; `apps/mfe-dashboard/tailwind.config.js:6`), reading shared package to generate CSS classes. No import directly connects shell and dashboard. | context |
| Build/deploy | Each app has own build, `tsc && vite build` (`apps/shell/package.json:8`; `apps/mfe-dashboard/package.json:8`), and own nginx image at unit port (`apps/shell/Dockerfile:18–33`; `apps/mfe-dashboard/Dockerfile:18–33`). They are separate compose services (`docker-compose.yml:5–27`). `apps/mfe-dashboard/nginx.conf:6–9` declares CORS; `:21–26` writes a no-cache block for `remoteEntry.js`, but generic `.js` regex (`:16–19`) comes first and is selected for `/assets/remoteEntry.js`, so specific block fails its purpose for this request (shell repeats order in `apps/shell/nginx.conf:12–20`). Directives are written, without proven behavior. | moderate |
| Documentation (execution) | `README.md:68–105`: build dashboard, run shell in dev and dashboard in `preview` at 3001, then open `/dashboard` to see remote inside shell. `README.md:109–115` explains `remoteEntry.js` is generated only at build (`dist/assets/remoteEntry.js`), matching host development URL. | moderate |
| Configuration (production) | Production remote URL is `${CDN_URL || 'https://cdn.example.com'}/mfeDashboard/remoteEntry.js` (`apps/shell/vite.config.ts:21–22`). `apps/shell/Dockerfile:18–20` does not define `CDN_URL`. README publishes at `s3://cdn/mfe-dashboard/` (`README.md:194–195`), a different path from `/mfeDashboard/` and without `assets/`. Development compose runs dashboard with `npm run dev` (`docker-compose.dev.yml:27`), contradicting `README.md:109–115`. Demonstrated connection is local development; in production/Docker paths, host does not point to served remote. | ambiguous |
| Technology | `@originjs/vite-plugin-federation` `^1.3.6`, `vite` `^5.4.0`, `react`/`react-dom` `^18.3.0` declared in both apps (`apps/shell/package.json:16–17`, `22`, `30`; `apps/mfe-dashboard/package.json:16–17`, `21`, `29`). Without lockfile, versions are unresolved. | context |
| Documentation (inconsistencies) | `README.md:205–214` cites `sonar-project.properties` in each app and `npm run test:coverage`, but none of these files exists in inventory and frontend apps do not define `test:coverage` (`apps/shell/package.json:6–12`). This does not affect composition. | context |
| History | See “Authorship and history”: host, remote, packages and federation configuration originate together in root commit. | context |

## Authorship and history

Non-shallow clone; 9 commits, no merge, one root `2a87116` (“Initial commit: MFE architecture with Vite + React + Module Federation”, 2026-01-30T09:48:55+01:00). All commits have author and committer `fudoyoki <fudoyoki@fudoyokis-Mac-Pro.local>` and were made on 2026-01-30, between 09:48 and 16:21 (+01:00). `git log --no-renames --name-status` by folder:
- `apps/shell`: files added in `2a87116`; Docker/nginx in `26c3601`; workspace adjustment in `7e48df8`; `AuthProvider` moved in `d0748ce`.
- `apps/mfe-dashboard`: added in `2a87116`; Docker/nginx in `26c3601`; workspace in `7e48df8`; import cleanup in `912587f`.
- `packages`: added in `2a87116`; `./package.json` included in `exports` “for Vite Module Federation compatibility” in `1167458`.
- `apps/bff`: added in `2a87116`, with adjustments in `3ced632` and `972a03e`.
- `README.md`: `2a87116`, `26c3601` and evaluated SHA.

Complete structure appears at once in first commit and receives only brief corrections afterward. Metadata record one author and do not indicate code origin (own writing, generated or copied). No upstream or third-party template reference was found. Refs: `main`, `origin/main` and `origin/HEAD` at SHA. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two frontend units in repository: `apps/shell` and `apps/mfe-dashboard`, each with own entry (`apps/shell/index.html:11`; `apps/mfe-dashboard/index.html:11`). Composition configuration references dashboard (`apps/shell/vite.config.ts:30–31`). Chat, Tools and Admin are commented and do not count. |
| Q2 | Yes | Each unit has own entry point and build (`apps/shell/package.json:8`; `apps/mfe-dashboard/package.json:8`; `apps/*/src/main.tsx`) and own image/service (`docker-compose.yml:5–27`). Import search found no direct source-code import between them; only workspace packages are shared. |
| Q3 | Yes | Host mounts remote at route `/dashboard/*` within its layout (`apps/shell/src/App.tsx:7`, `167–176`, `184–189`). |
| Q4 | Yes | Module Federation configured on both sides, with consistent name, exposed key and file (`apps/shell/vite.config.ts:28–31`; `apps/mfe-dashboard/vite.config.ts:11–17`) and used in code (`apps/shell/src/App.tsx:7`). Development URL matches port and build path served through `preview` (`README.md:76–115`). |
| Q5 | Yes | Q1–Q4 are Yes: complete host → remote chain, connectable in documented flow. Placeholder production URL does not undo this connection. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “examples … that actually compose frontend units”, with `repo_type: example`. Same complete host/remote chain as 076/084/096/106/109.
- Unlike 097/103/104, configuration is not unconnectable: names, exposed key, `filename`, port and `assets/` path align in documented development flow. Unlike 089/100, federation composes a route-mounted UI unit, not only shares code. No third-party platform (074/080/102) exists.
- `repo_type: example`: README presents itself as example (`README.md:1–3`); user and statistics are mocks (`apps/shell/src/context/AuthContext.tsx:6–15`; `apps/mfe-dashboard/src/DashboardApp.tsx:5–10`); production URL is placeholder.
- `frontend_units: 2` (shell and dashboard). `ui-kit` and `shared-types` are libraries, BFF is backend and commented remotes do not count. `unit_organization: monorepo`. `build_tools: [vite]` comes from explicit `vite.config.ts` files; Turborepo and tsup orchestrate or package libraries and are not units’ bundler.

## Analysis notes

- **RQ2:** Module Federation through `@originjs/vite-plugin-federation`, with remote consumed by `React.lazy` and props typed through shared package (`MfeProps`). README documents requirement for remote `build` + `preview` with this plugin (`README.md:109–115`).
- **RQ3:** internal packages are workspace dependencies and also federation `shared` singletons (`apps/shell/vite.config.ts:52–58`). Tailwind in both apps reads `ui-kit` source code (`apps/*/tailwind.config.js:6`). This is a build relationship with library, not between units.
- **RQ1 (misleading signals):** production configuration (`CDN_URL` with placeholder), development compose with `vite dev` in remote and SonarQube mention disagree with artifacts. Looking only at Docker would reveal host without reachable remote.
- **Protocol (search):** plural-query hit “micro frontends” has no corresponding plural spelling in description or README; it depends on GitHub search text processing.
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, two units and `example`; no open decision. Adopted correction: nginx reading above (verified, regexes evaluated in order). Recorded limitations: local connection examined statically, without execution; `singleton: true` in `shared` is not certified without installed plugin; `docker-compose.dev.yml:27` runs remote with `vite dev`, contrary to documented preview flow; README and host disagree on CDN path (`/mfe-dashboard/` versus `/mfeDashboard/remoteEntry.js`), without demonstrated production chain. Final precedents: 007 (complete host/remote pair suffices without working production), 008 (concrete chain suffices with missing remote) and 012 (contrast: plan without configuration and consumption); 076/084/096/106/109 are draft and 097, 103, 104, 089 and 100 draft or review, as contextual comparison.

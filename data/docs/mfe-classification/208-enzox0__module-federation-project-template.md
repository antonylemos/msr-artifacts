---
schema: 1
id: 1253360837
full_name: enzox0/module-federation-project-template
url: https://github.com/enzox0/module-federation-project-template
commit: b3c96cb653137038838f32097018cf8f8182b9f2
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: template
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 208 — enzox0/module-federation-project-template

## Context

“Module Federation App Template” (`README.md:1–5`): pnpm/Turbo monorepo template (`pnpm-workspace.yaml:1–3`; `turbo.json:1–20`) with five React/Vite applications in `apps/`, all with `@originjs/vite-plugin-federation`:
- `shell` (host, port 3000);
- four remotes, `auth-mf` (3001), `dashboard-mf` (3002), `admin-mf` (3003) and `messaging-mf` (3004).

Also workspace packages (`packages/ui`, `shared`, `sdk`, `types`, `config`) and largely placeholder infrastructure (Kubernetes, Terraform, CD only printing “Deploying...”). Remotes are stubs: `admin-mf`, `dashboard-mf` and `messaging-mf` render only a title, and `auth-mf` a login form with `alert`. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:209` records rank 208, ID 1253360837, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:209` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:30903` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:30911` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same six hits in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontends`: `topic:microfrontends` | `terminology-topic-microfrontends` | 2026-10-07T18:18:39.946Z / 2026-10-08T15:34:24.726Z |
| `terminology-topic-micro-frontends`: `topic:micro-frontends` | `terminology-topic-micro-frontends` | 2026-10-07T18:18:55.202Z / 2026-10-08T15:34:40.023Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-05` | 2026-10-07T21:13:18.648Z / 2026-10-08T15:42:32.629Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-05` | 2026-10-07T22:12:42.392Z / 2026-10-08T15:49:48.534Z |
| `technology-topic-module-federation`: `topic:module-federation` | `technology-topic-module-federation` | 2026-10-07T23:13:33.138Z / 2026-10-08T16:11:08.769Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-05` | 2026-10-07T23:25:52.495Z / 2026-10-08T16:18:01.374Z |

Effective queries append `pushed:>=2025-04-01` and, for text searches, `created:2026-05-01..2026-05-31`.

Hit metadata:
- description “Production-ready Module Federation monorepo with React, Vite, TypeScript & Turbo. Build scalable microfrontend architectures with independent deployment, shared packages, and real-time health monitoring.”;
- topics `micro-frontends`, `microfrontends` and `module-federation`, among others; TypeScript language, `fork: false`, size 104;
- creation at 2026-05-29T11:37:16Z, push at 2026-05-29T14:05:57Z.

README spellings:
- “microfrontend”: `README.md:3` (“a complete microfrontend architecture”);
- “Microfrontends”/“microfrontends”: `README.md:13`, `27`, `100`;
- “Module Federation”: `README.md:1`, `3`, `98`.

README comes from `76d4857` (2026-05-29) and was unchanged afterward. It predates October 2026 collections, and README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 174 entries, all regular files `100644`; zero symlinks and zero gitlinks. Each app has own `package.json`, `index.html`, `vite.config.ts`, `module-federation.config.ts`, `src/` and `Dockerfile`. Compiled `.js` and `.d.ts` of `vite.config` and `module-federation.config` are also versioned in each app. | context |
| Configuration (host) | `apps/shell/module-federation.config.ts:1–11`: `name: 'shell'`, `remotes` `authMf`, `dashboardMf`, `adminMf` and `messagingMf` at `http://localhost:3001…3004/dist/assets/remoteEntry.js`, with `shared` for `react`, `react-dom` and `react-router-dom`. `apps/shell/vite.config.ts:1–7`: `federation(mfConfig)`. | strong |
| Configuration (remotes) | `apps/auth-mf/module-federation.config.ts:1–8`: `name: 'authMf'`, `exposes: { './App': './src/exposes.tsx' }`. `admin-mf`, `dashboard-mf` and `messaging-mf` follow same pattern (`adminMf`, `dashboardMf`, `messagingMf`). Ports in `vite.config.ts` (3001–3004) and `dev` scripts match host. | strong |
| Source code (composition) | `apps/shell/src/App.tsx:7–10`: `lazy(() => import('authMf/App'))` and other three. `:36–75`: routes `/auth`, `/admin`, `/dashboard` and `/messaging` with `ErrorBoundary` and `Suspense`. `apps/shell/src/vite-env.d.ts:3–21` declares modules. `apps/shell/src/components/RemoteHealthCheck.tsx:11–16` checks all four `remoteEntry.js`. | strong |
| Source code (boundaries) | Search for `../..`, `import('../..` and `apps/` in `apps` and `packages`: only Dockerfile `COPY` lines. Apps do not import each other’s code. Packages `@mf/*` are declared in shell (`apps/shell/package.json:18–21`), but no app `src/` imports them. | context |
| Configuration (inconsistency) | `apps/shell/module-federation.config.js:1–11`, versioned alongside `.ts`, points remotes to `localhost:3004…3007/assets/remoteEntry.js`, ports not matching remotes. `vite.config.ts` and `vite.config.js` import `./module-federation.config` without extension. Which file resolves: independent review verified, for standard versioned-script flow (lockfile Vite 5.4.21, with `vite.config.js` before `vite.config.ts` in `DEFAULT_CONFIG_FILES`, so scripts without `--config` choose `apps/shell/vite.config.js`), that in-memory bundling of this file with esbuild 0.21.5 includes `apps/shell/module-federation.config.ts` and endpoints 3001 to 3004 with `/dist/assets/remoteEntry.js`; obsolete `.js` (3004 to 3007) does not govern shell import in this flow. Remote/module names are identical in both. | ambiguous |
| Build/deploy | Per-app builds (`apps/*/package.json:6–11`, `tsc && vite build`), orchestrated through `turbo run build` (`package.json:11–12`). `apps/shell/Dockerfile:1–12` (and equivalents) generates nginx image per app. Kubernetes and Terraform are placeholders (`infrastructure/kubernetes/shell/index.yaml:1`), and CD only prints “Deploying...” (`.github/workflows/cd.yml:14–15`). | moderate |

## Authorship and history

Non-shallow clone; 60 linear commits, no merge, all by renzsiguenza `<renzsiguenza0000@gmail.com>`. All from 2026-05-29, between 21:46 (`d503356`, “chore: initialize project with root package configuration”) and 22:05 (SHA `b3c96cb`, “docs: add Quick Start and Running guides…”). Each commit adds part of template with conventional message, pattern of publishing an already complete project in steps. README description credits “enzox0” (`README.md:5`), repository-owning account. No historical blob was read. Clone is partial (`blob:none`) and `git rev-list --objects --all --missing=print` identifies one missing object (`47ef22b…`, historical version of `.gitignore`); no current architectural evidence depends on it.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Five repository units, four referenced by shell composition configuration (`apps/shell/module-federation.config.ts:4–9`). |
| Q2 | Yes | Each app has own entry, `vite.config` and build, plus own Dockerfile, without source-code imports between apps. |
| Q3 | Yes | Shell mounts four remotes through routes (`apps/shell/src/App.tsx:36–75`). |
| Q4 | Yes | Module Federation configured in host (`remotes`) and remotes (`exposes`), consumed through `import('authMf/App')` and equivalents. |
| Q5 | Yes | Q1–Q4 are Yes: template with shell and four runtime-composed remotes. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes” and “templates… that actually compose frontend units”. Chain is complete in snapshot, as in 076/084/096/106/109 and draft 202, using same plugin and `…/dist/assets/remoteEntry.js` pattern.
- Remotes expose route-mounted applications, even as stubs; not component sharing (089/100). Minimal remote content is consistent with `repo_type: template` and does not reduce case to educational content (023/094), since composition is configured and consumed.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 5` (shell and four remotes; packages `@mf/*` are not frontend units), `unit_organization: monorepo`.
- Port divergence in `module-federation.config.js` remains recorded as note and does not change answers: remote/module names and code consumption are same in both files.

## Analysis notes

- **RQ2:** `@originjs/vite-plugin-federation` with host and four remotes, per-route `ErrorBoundary`/`Suspense` and `remoteEntry.js` availability checker.
- **RQ1 (misleading signals):** “Production-ready” description contrasts with stub remotes and placeholder infrastructure.
- **Protocol (search):** repository enters through six queries (three topics and three textual). Eligibility changes from `unknown` (001) to `pass` (002).
- **Protocol (snapshot):** compiled `.js`/`.d.ts` versioned alongside `.ts` diverge in shell-remote ports. A case to observe in configuration-artifact mining.
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, `template`, `module-federation`, React/Vite, five units and `monorepo`; no open decision (`draft`). Ambiguity of which `module-federation.config` shell uses was resolved offline: with lockfile Vite 5.4.21, `vite.config.js` precedes `vite.config.ts` in default order, and in-memory bundling (esbuild 0.21.5 from local cache, without generating clone files) shows `module-federation.config.ts` with ports 3001 to 3004; obsolete `.js` (3004 to 3007) is a divergent compiled artifact not governing standard flow. Adopted corrections: negative-search and historical-completeness reports (one missing object, verified). Q2, Q4 and Q5 rows should cite manifests, entries, imports and configs.

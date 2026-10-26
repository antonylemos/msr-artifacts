---
schema: 1
id: 1015183048
full_name: harshad-eden/module-federation
url: https://github.com/harshad-eden/module-federation
commit: dde74e678a749ccbf3951e173bf980649034c5d4
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 202 — harshad-eden/module-federation

## Context

“Module Federation Insurance Platform” (`README.md:1–7`; `package.json:2–4`): pnpm monorepo (`pnpm-workspace.yaml:1–3`) with four React/Vite applications in `apps/`. One `shell` (host, port 3000) and three remotes, `sales-portal` (3001), `underwriter-portal` (3002) and `product-config` (3004), all with `@originjs/vite-plugin-federation`. Also two shared packages in `packages/`, `shared-ui` (shadcn/ui components) and `shared-types`. Documentation describes six applications (`README.md:11–19`, `85–88`), but `employer-portal` and `service-provider` are absent from snapshot. Data are fictitious (“Mock Data”, `README.md:172`). Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:203` records rank 202, ID 1015183048, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main` (also `origin/dev`). Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:203` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:16055` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:16059` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same three hits in each round, at endpoint `repositories`, with subquery `…#created:2025-07` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:41:51.271Z / 2026-10-08T15:38:43.455Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:08:32.515Z / 2026-10-08T15:47:41.994Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:18:34.983Z / 2026-10-08T16:15:11.909Z |

Effective queries append `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Hit metadata:
- null description, no topics, TypeScript language, `fork: false`, size 83;
- creation at 2025-07-07T06:07:40Z, push at 2025-07-07T15:54:46Z.

README spellings:
- “microfrontend”: `README.md:7` (“to create a microfrontend architecture”), also in `254` (“Each microfrontend exposes”) and, capitalized, in `227`;
- “microfrontends”: `README.md:164` (“Dynamically loads all microfrontends”);
- “Module Federation”: `README.md:1`, `3`, `7` e outras.

Last README change is SHA itself, `dde74e6` (2025-07-07), adding `# module-federation` at file end (`README.md:447`). This predates October 2026 collections, so README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 84 entries, all regular files `100644`; zero symlinks and zero gitlinks. Four apps, each with `package.json`, `vite.config.ts`, `index.html` and `src/`, plus two packages in `packages/` and five Markdown documents at root (`README.md`, `ARCHITECTURE_DOCUMENTATION.md`, `DEPLOYMENT_GUIDE.md`, `NAVIGATION_AND_EMBEDDING.md`, `TODO.md`), plus `context.md`. No workflows. | context |
| Configuration (host) | `apps/shell/vite.config.ts:8–16`: `federation({ name: "shell", remotes: { salesPortal, underwriterPortal, productConfig } })` at `http://localhost:3001/3002/3004/dist/assets/remoteEntry.js`, with `shared` for `react`, `react-dom` and `react-router-dom`. | strong |
| Configuration (remotes) | `apps/sales-portal/vite.config.ts:8–15` (`salesPortal`, port 3001), `apps/underwriter-portal/vite.config.ts:8–15` (`underwriterPortal`, 3002) and `apps/product-config/vite.config.ts:8–15` (`productConfig`, 3004): `filename: "remoteEntry.js"` and `exposes: { "./App": "./src/App.tsx" }`. Names and ports match host. | strong |
| Source code (composition) | `apps/shell/src/App.tsx:13–16`: routes `/sales/*`, `/underwriter/*` and `/products/*`. `apps/shell/src/components/SalesPortal.tsx:4–28`, `67–87`: `lazy(() => import("salesPortal/App"))` with fallback, `Suspense` and `ErrorBoundary`. `UnderwriterPortal.tsx:5` and `ProductConfig.tsx:5` do same. `apps/shell/src/types/remotes.d.ts:1–14` declares three modules. | strong |
| Source code (boundaries) | Search for `from '../`, `import('../` and `require('../` in `apps` and `packages` finds only internal imports of `packages/shared-ui` (`src/components/ui/*.tsx` → `../../lib/utils`, `../../hooks/use-mobile`). Apps use `@insurance/shared-ui` and `@insurance/shared-types` as dependencies `workspace:*` (for example `apps/sales-portal/package.json:14–15`; `apps/sales-portal/src/App.tsx:3`), and host reaches remotes only through federated specifiers. | context |
| Build/deploy | Each app has own `dev`, `build` and `preview` (`apps/shell/package.json:5–9`; `apps/sales-portal/package.json:5–9`). Root orchestrates through `concurrently` (`package.json:11–27`). `DEPLOYMENT_GUIDE.md:35–46`, `136–141` recommends one Vercel project per app, with remote URLs through variables `VITE_*` (`:54–63`, `80–84`), but SHA configuration uses only `localhost` URLs. | moderate |
| Documentation | `NAVIGATION_AND_EMBEDDING.md:5–25`: shell renders sales portal within layout through Module Federation, without redirection. | context |

## Authorship and history

Non-shallow clone; 2 commits, no merge, by Harshad `<harshad@edencaremedical.com>`, both on 2025-07-07: `ac5fbbc` (“mono repo with single deployement”), adding entire content, and SHA `dde74e6` (“first commit”), changing only `README.md`. `origin/dev` points to same SHA. Previous README blob (`f6de22a`) is absent from partial clone and was not fetched; no other historical blob was read. Message “single deployement” does not match snapshot, which has per-app builds and per-app deployment guide.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four repository units, referenced by host composition configuration (`apps/shell/vite.config.ts:10–14`). |
| Q2 | Yes | Each app has own entry, `vite.config.ts` and build scripts. No source-code imports between apps; common code comes from workspace packages. |
| Q3 | Yes | Shell mounts three remotes through routes within layout (`apps/shell/src/App.tsx:11–18`; `SalesPortal.tsx:67–87`). |
| Q4 | Yes | Module Federation configured in host (`remotes`) and remotes (`exposes`), consumed through `import("salesPortal/App")` and equivalents. |
| Q5 | Yes | Q1–Q4 are Yes: shell with three runtime-composed remotes. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes”. Chain is complete in snapshot, as in 076/084/096/106/109.
- Remotes expose whole applications mounted through routes, not shared components (unlike 089/100). Packages `shared-ui`/`shared-types` are workspace libraries, not frontend units, and do not enter `frontend_units`.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 4`, `unit_organization: monorepo`. `repo_type: example`: demonstration platform with fictitious data, URLs only at `localhost` and documentation of six apps, three nonexistent.
- No decision remains open.

## Analysis notes

- **RQ2:** `@originjs/vite-plugin-federation` with `remotes` pointing to `…/dist/assets/remoteEntry.js` on each remote development server. Remotes mount own `Routes` under host router, with shared `react-router-dom`.
- **RQ1 (misleading signals):** documentation promises six domains and separate environment-variable deployment, while code has three remotes and fixed `localhost` URLs.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, React/Vite, four units and `monorepo`; no open decision (`draft`). Corrections: six documented apps minus four present yield two merely documented apps (not three); previous README blob (`f6de22a…`) is absent from partial clone, so final line `# module-federation` (`README.md:447`) cannot be verified as sole textual addition of last commit (README is from July 2025, before searches). Operational caveat to record: host remotes use `http://localhost:<porta>/dist/assets/remoteEntry.js` (`apps/shell/vite.config.ts:11–13`), app `dev` scripts only start Vite and root `dev` builds only libraries (`package.json:11–15`), and no `dist` exists in tree; development flow from clone thus needs building remotes and exposing `dist` directory (README suggests serving `dist` as root, `README.md:392–395`, yielding `/assets/remoteEntry.js` without `/dist` prefix), and no base, proxy or rewrite reconciles both modes in configs. Guide variables `VITE_*` are instructions for future change, not consumed configuration. This limits immediate executability claim without making configured and consumed mechanism uncertain. Q2, Q4 and Q5 rows should cite manifests and entries, imports and configs.

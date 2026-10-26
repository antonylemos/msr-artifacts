---
schema: 1
id: 1254401059
full_name: shermondevelopment/microfrontend-shop
url: https://github.com/shermondevelopment/microfrontend-shop
commit: 913349b85c59bff3b982808ac6d931b62f1d73bc
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

# 246 — shermondevelopment/microfrontend-shop

## Context

“Microfrontend Challenge” (`README.md:1–38`): React 19 + Vite e-commerce with `@module-federation/vite`, in an npm workspaces monorepo (`package.json:4–8`) with four applications:
- `host` (port 3000), the shell;
- remotes `header` (3001, header with cart), `footer` (3002) and `products` (3003, product listing).

There are also shared packages in `packages/` (`shared` with Zustand and React Query, `types`, `ui` and configs). The README and a CI/CD workflow describe deployment of each app to separate S3 + CloudFront (`README.md:142–162`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:247` records rank 246, ID 1254401059, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:247` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:30967` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:30975` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same six hits in each round:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:3000..3999` | `package.json` | 2026-10-07T20:33:04.318Z / 2026-10-08T15:43:48.071Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T21:13:18.648Z / 2026-10-08T15:42:32.629Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T22:12:42.392Z / 2026-10-08T15:49:48.534Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T22:36:39.291Z / 2026-10-08T15:59:48.873Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T23:05:29.173Z / 2026-10-08T16:09:18.306Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-05` | — | 2026-10-07T23:26:24.296Z / 2026-10-08T16:18:08.915Z |

The effective queries append `pushed:>=2025-04-01` and, in textual searches, `created:2026-05-01..2026-05-31`. The root `package.json` (3.465 bytes) declares `"@module-federation/vite": "^1.16.0"` (`:48`).

Repository hit metadata:
- description “Projeto de Micro Frontends com React + Vite + Module Federation, organizado em um monorepo com apps independentes e pacotes compartilhados.” (English translation: “Micro Frontends project with React + Vite + Module Federation, organized in a monorepo with independent apps and shared packages.”);
- no topics, language TypeScript, `fork: false`, size 449;
- created at 2026-05-30T14:15:44Z, pushed at 2026-08-27T21:43:31Z.

Spellings in the README:
- “Microfrontend”: `README.md:1`;
- “microfrontends”: `README.md:3`, `142`;
- “Module Federation”: `README.md:3`.

“Micro Frontends” appears in the description. The last README change is `b9fa9c4` (2026-06-17), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 102 entries, all regular files `100644`; zero symlinks and zero gitlinks. Four apps in `apps/` (`host`, `header`, `footer`, `products`), each with `package.json`, `vite.config.ts`, `index.html`, `src/` and TS/Tailwind/ESLint configs; packages in `packages/` (`shared`, `types`, `ui`, `config/*`); `scripts/ci/affected-workspaces.mjs`; workflow `.github/workflows/ci-cd.yml`; semantic-release. | context |
| Configuration (host) | `apps/host/vite.config.ts:22–65`: `federation({ name: 'host', remotes: { header, footer, products } })`, each with `type: 'module'` and `entry` from `VITE_*_REMOTE_URL`, falling back to `http://localhost:300x/remoteEntry.js` (`:12–15`); singleton `shared` of `react`, `react-dom`, `zustand`, `@microfrontend/shared`, `@tanstack/react-query`. | strong |
| Configuration (remotes) | `apps/header/vite.config.ts:13–37`: `name: "header"`, `filename: "remoteEntry.js"`, `exposes: { "./Header": "./src/Header.tsx" }`. `apps/products/vite.config.ts:13–37`: `./ProductsList`. `apps/footer/vite.config.ts:13–21`: `./Footer`. Ports 3001/3003/3002, matching the host. | strong |
| Source code (composition) | `apps/host/src/App.tsx:5–7`: `lazy(() => import('header/Header'))`, `footer/Footer` and `products/ProductsList`. `:10–32`: mounts all three with `RemoteErrorBoundary` and `Suspense`, with skeletons from package `ui`. `apps/host/src/remotes.d.ts:1–20` declares the modules. | strong |
| Build/deploy | `package.json:13–22`: `dev:*`, `build:*`, `preview:*` scripts per app. `.github/workflows/ci-cd.yml:31–152`: detects affected workspaces, tests and deploys per app (matrix) to S3 with CloudFront invalidation, passing remote URLs through variables (`:102–104`). | strong |
| Source code (boundaries) | The apps import workspace packages (`@microfrontend/ui`, `@microfrontend/shared`: `apps/host/src/App.tsx:2`; `apps/products/src/components/Product.tsx:1`), declared as federation singletons. The only `../../` between folders are the apps’ `eslint.config.js`, importing the lint config from `packages/config` (`apps/host/eslint.config.js:2`), a development tool rather than code from another unit. | context |

## Authorship and history

Non-shallow clone; 66 commits, 6 merges. There are 56 by Vitor shermon `<victorshermon@yahoo.com>`, 8 by the same author as `66441063+shermondevelopment@users.noreply.github.com` (the eight are not all merges: there are only six merges in total, and author and commit type should not be confused) and 2 by `semantic-release-bot`. They range from 2026-05-27 (`08c6287`, “chore: initial commit”) to 2026-08-27; SHA `913349b` is “chore(release): 1.1.0 [skip ci]”. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` identifies 167 missing historical objects; the necessary current blobs were available.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Four units in the repository, three referenced by the host composition configuration (`apps/host/vite.config.ts:25–47`). |
| Q2 | Yes | Each app has its own `vite.config.ts`, entry point, port and deployment (per-app deployment matrix in CI). There are no source code imports between apps; common code comes from workspace packages. |
| Q3 | Yes | The host mounts header, product list and footer on the page (`apps/host/src/App.tsx:10–32`). |
| Q4 | Yes | Module Federation (`@module-federation/vite`) with `remotes` in the host and `exposes` in the remotes, consumed through federated imports. |
| Q5 | Yes | Q1–Q4 are Yes: shell with three remotes composed at runtime, with independent deployment. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. It matches “monorepos containing a host and its remotes”. The chain is complete in the snapshot, as in 076/084/096/106/109.
- The remotes are page slices with their own state and data (cart in the header, listing with React Query), not utilities (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 4` (packages do not count), `unit_organization: monorepo`, `repo_type: example` (“Challenge”, `README.md:1`, with demonstration API and products).
- There is no open decision.

## Analysis notes

- **RQ2:** `type: 'module'` remotes with URLs from environment variables and local fallback; global state shared as a federated singleton (`@microfrontend/shared` with Zustand); deployment per affected app to S3/CloudFront with manual rollback.
- **Protocol (search):** the repository enters through six queries (code and textual). Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with MFE-implemented, Q1–Q5 Yes, four frontend units, `monorepo`, React/Vite and `module-federation`; no open decision (`draft`). Host and remote configuration resolves to existing exports, federated imports are used and the units are mounted together. Verified corrections: 167 missing objects; 66 ancestral commits, 6 merges, 56 commits with the personal email, 8 with noreply and 2 by `semantic-release-bot`; code search uses only `"@module-federation" filename:package.json size:3000..3999`, without `pushed`, while repository searches use `in:name,description,readme`, `pushed:>=2025-04-01` and `created:2026-05-01..2026-05-31`. The four `eslint.config.js` point to a `dist` of the common configuration absent until generation (root script `lint` runs `build:eslint-config` first), an expected generation dependency, not missing source; `cacheDir`, `outDir` and `tsBuildInfoFile` traverse `../../` as outputs, not unit imports. `singleton` is observed configuration, and deployment was not executed.

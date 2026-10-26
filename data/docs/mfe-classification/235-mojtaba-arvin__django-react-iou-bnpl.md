---
schema: 1
id: 989410278
full_name: mojtaba-arvin/django-react-iou-bnpl
url: https://github.com/mojtaba-arvin/django-react-iou-bnpl
commit: bf4da7610d2a1343b2f97eab1dfeb6b026e50e19
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 235 — mojtaba-arvin/django-react-iou-bnpl

## Context

Full-stack “Buy Now, Pay Later” system with a Django backend (`backend/`, account, customer, merchant, plan, installment, notification and analytics apps) and React + TypeScript frontend “using **Micro-Frontend** architecture” (`README.md:10`). The frontend is a pnpm workspace (`frontend/pnpm-workspace.yaml:1–5`) with four packages:
- `shell`, the webpack host on port 3000;
- `customer-app` (port 3001) and `merchant-app` (port 3002), Module Federation remotes;
- `shared` (`@bnpl/shared`), a common library of domain, authentication, data providers and administration components (react-admin).

The shell loads a configuration factory (`createAdminAppConfig`) from the remotes that defines each area’s screens and mounts each area under its route. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:236` records rank 235, ID 989410278, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:236` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:14305` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14311` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same six hits in each round:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-topic-microfrontend`: `topic:microfrontend` | `terminology-topic-microfrontend` | — | 2026-10-07T18:18:32.629Z / 2026-10-08T15:34:17.861Z |
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:4000..5999` | `frontend/package.json` | 2026-10-07T20:52:26.866Z / 2026-10-08T15:44:06.777Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-05` | — | 2026-10-07T22:22:07.713Z / 2026-10-08T15:54:24.657Z |
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:3000..3999` | `frontend/shell/webpack.config.js` | 2026-10-07T22:36:52.447Z / 2026-10-08T16:16:07.711Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-05` | — | 2026-10-07T22:53:32.599Z / 2026-10-08T16:05:43.863Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2025-05` | — | 2026-10-07T23:17:46.435Z / 2026-10-08T16:14:17.715Z |

The effective queries append `pushed:>=2025-04-01` and, in textual searches, `created:2025-05-01..2025-05-31`. `frontend/package.json` (4.631 bytes) declares `@module-federation/typescript` (`:40`). `frontend/shell/webpack.config.js` (3.229 bytes) contains `ModuleFederationPlugin` with `remotes` (`:3`, `59–94`).

Repository hit metadata:
- description “A full-stack BNPL system … uses micro-frontends with TypeScript…”;
- topics `microfrontend`, `reactjs`, `typescript`, `django` and others;
- language Python, `fork: false`, size 822;
- created at 2025-05-24T03:36:54Z, pushed at 2025-06-14T15:44:55Z.

Spellings in the README:
- “Micro-Frontend”: `README.md:10`, `391`;
- “Micro‑Frontend (Module Federation)”: `README.md:42`, with a nonbreaking hyphen;
- “microfrontend”: `README.md:6`, in the badge;
- the plural “micro-frontends” is in the description.

The last README change is the SHA itself, `bf4da76` (2025-06-14), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 289 entries, 288 regular files `100644` and 1 executable `100755` (`backend/manage.py`); zero symlinks and zero gitlinks. `frontend/` has `shell/`, `customer-app/`, `merchant-app/` and `shared/` (113 entries; the entire `frontend/` directory has 121), each with `package.json`, `webpack.config.js` (except `shared`), Jest tests and layered `src/`. `backend/` is a Django project; there are `docker-compose.dev.yml`, `docs/` and two backend workflows. | context |
| Configuration (host) | `frontend/shell/webpack.config.js:59–94`: `ModuleFederationPlugin({ name: "shell", remotes: { customer_app: "customer_app@http://localhost:3001/remoteEntry.js", merchant_app: "merchant_app@http://localhost:3002/remoteEntry.js" }, shared: react, react-dom, react-router-dom, react-admin, @tanstack/react-query singleton })`. | strong |
| Configuration (remotes) | `frontend/customer-app/webpack.config.js:81–116`: in remote mode, `name: "customer_app"`, `filename: "remoteEntry.js"`, `exposes: { "./createAdminAppConfig": "./src/application/services/create-admin-app-config.service.ts" }`; in standalone mode, its own entry point with `HtmlWebpackPlugin` (`:14–22`, `74–79`). `frontend/merchant-app/webpack.config.js:81–116` does the same with `merchant_app`, on port 3002 (`:121`). | strong |
| Source code (composition) | `frontend/shell/src/infrastructure/shell/remote-modules/customer-app.adapter.ts:7–14`: `await import('customer_app/createAdminAppConfig')` and call with `basename` and `onBack`. `frontend/shell/src/infrastructure/shell/shell-app.bootstrap.tsx:34–37`, `47–66`: loads both configurations and mounts `<AdminApp {...props} />` under `${customerBasePath}/*` and `${merchantBasePath}/*`, with `ErrorBoundary` and `Suspense`. `frontend/customer-app/src/application/services/create-admin-app-config.service.ts:7–25`: the exported configuration brings the remote’s own screens (`InstallmentList`, `PlanList`, `PlanShow`). | strong |
| Shared code | The three apps resolve `@bnpl/shared` to `../shared/src` through a webpack alias (`frontend/shell/webpack.config.js:35–38`; `frontend/customer-app/webpack.config.js:33–36`) and declare `"@bnpl/shared": "workspace:*"` (`frontend/shell/package.json:11–13`; `frontend/customer-app/package.json:13–15`). This is a workspace library integrated at build time into each unit, not another frontend unit. | context |
| Source code (boundaries) | Search for relative imports to `shell`, `customer-app`, `merchant-app` or `shared`: no occurrences. Shell and remotes do not import each other’s source code; connection is through the federated module. | context |

## Authorship and history

Non-shallow clone; 170 commits ancestral to the SHA, 12 merges (the count of 172 covers all refs: `1969f9f` and `7f15b38` are outside the evaluated ancestry), all by Mojtaba Arvin `<m.arvin@live.com>`, from 2025-05-23 (`8461370`, “Initial commit”) to 2025-06-14 (SHA `bf4da76`, “docs(readme): add table of contents”). Work took place in feature branches (`frontend/shell`, `frontend/customer-app`, `frontend/merchant-app`, `feature/frontend-shared` and several `feature/backend-*`), integrated into `main`. The `frontend/*` branches have no commits beyond `main`; no branch was considered separately. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects $SHA --missing=print` finds 114 missing historical objects; the current files establishing the architectural chain were available, and no objects were fetched.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three frontend units in the repository, two referenced by the host composition configuration (`frontend/shell/webpack.config.js:61–64`). |
| Q2 | Yes | Each app has its own `package.json`, `webpack.config.js`, entry point, port and build script. There are no source code imports between them; common code comes from workspace package `@bnpl/shared`. |
| Q3 | Yes | The shell mounts the customer and merchant areas by route (`shell-app.bootstrap.tsx:47–66`). |
| Q4 | Yes | Module Federation with `remotes` in the host and `exposes` in the remotes, consumed through `import('customer_app/createAdminAppConfig')` and equivalent. |
| Q5 | Yes | Q1–Q4 are Yes: shell composing two administration areas from remotes at runtime. |

## Rationale

- `MFE-implemented` under the Q1–Q5 Yes rule. It matches “monorepos containing a host and its remotes”. The chain is complete in the snapshot, as in 076/084/096/106/109.
- The exposed module is a configuration factory, not a React component. It loads the screens and resources of each area (`create-admin-app-config.service.ts:12–24`), which the shell renders with `AdminApp` from the common library. This is composition of functional slices, not utility sharing (089/100).
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 3` (library `shared` does not count), `unit_organization: monorepo`, `repo_type: example` (portfolio project with `localhost` URLs and Docker development environment).
- There is no open decision.

## Analysis notes

- **RQ2:** remotes expose a react-admin configuration factory instead of components; the shell injects `basename` and `onBack`. Each remote has standalone and remote modes in the same `webpack.config.js`.
- **Protocol (search):** the repository enters through six queries (topic, textual and code). Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** agreement with MFE-implemented, Q1–Q5 Yes, three frontend units in `monorepo`, React/webpack and `module-federation`; no open decision (`draft`). The federated contract is actually used: the factories return configurations with references to area components and the shell renders them by route. Verified corrections: 170 ancestral commits (rather than 172); 114 missing historical objects; directory `frontend` has 121 entries and the four directories `shell`, `customer-app`, `merchant-app` and `shared` total 113 (rather than 69, as previously reported); library `shared` and backend do not increase the frontend unit count; the scope of code query qualifiers should be delimited. Operational caveats: the shell starts both loads in `useEffect` and waits for both before rendering, without `catch` on the promises (`:34–40`), and `ErrorBoundary`/`Suspense` around `AdminApp` do not demonstrate handling of the earlier asynchronous failure; the README standalone commands (`:245–261`) swap the customer and merchant filter names. These are robustness and instruction issues, without making the federated connection undetermined. Q2, Q4 and Q5 should cite the evidence, preserving the caveats about `shared` and the remote factory.

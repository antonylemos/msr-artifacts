---
schema: 1
id: 1019893852
full_name: lguilhermecardoso/mfe-react-vite-example
url: https://github.com/lguilhermecardoso/mfe-react-vite-example
commit: ddf474192c82d47341b22be009915913c9227eca
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
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

# 351 — lguilhermecardoso/mfe-react-vite-example

## Context

Micro-frontends example with React, Vite and `@originjs/vite-plugin-federation` (`README.md:1–3`): a container (`root-app/`) and four remotes (`mf-login`, `mf-navbar`, `mf-dashboard`, `mf-personagem-detalhe`), each an independent project with its own `package.json` (`README.md:33`), published together in GitHub Pages subfolders. The repository also versions build output (`dist/`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:352` records rank 351, ID 1019893852, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:352` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:16376` (`terminology;technology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:16380` (`terminology;technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same eight hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `repositories` | `…#created:2025-07` | empty |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `repositories` | `…#created:2025-07` | empty |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` | `…#created:2025-07` | empty |
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `code` | `…#size:800..899` | `mf-login/package.json`, `mf-dashboard/package.json`, `mf-navbar/package.json`, `root-app/package.json`, `mf-personagem-detalhe/package.json` (one hit per file) |

Collections: round 001 between 2026-10-07T18:38:09.546Z and 2026-10-07T23:18:44.074Z; round 002 between 2026-10-08T15:38:32.098Z and 2026-10-08T16:15:15.681Z. Repository queries append `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Hit metadata: null description, no topics, language TypeScript, no license, `fork: false`, size 347, created at 2025-07-15T03:34:19Z, pushed at 2025-07-17T23:37:09Z.

Text matches in the README: “MicroFrontend” (singular) in `README.md:1`; “Microfrontends” (plural) in `README.md:3`; “Module Federation” in `README.md:1`, `3`, `24` and `90`. The five matched `package.json` have between 834 and 899 bytes at the SHA (within the range). The README comes from root commit `6cdaf6f` (2025-07-15) and was not changed afterward; it does not postdate the October 2026 searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 157 entries, 156 regular files `100644` and 1 executable `100755` (`build-all.sh`); zero symlinks and zero gitlinks. Five Vite projects with their own `package.json`, `vite.config.ts`, `index.html` and `src/`; versioned `dist/` with each one’s output. | strong |
| Configuration (container) | `root-app/vite.config.ts:11–24`: `remotes` `mf_login`, `mf_dashboard`, `mf_personagem_detalhe` and `mf_navbar`, with local URL (`localhost:4173–4176/assets/remoteEntry.js`) or production URL (`https://lguilhermecardoso.github.io/mfe-react-vite-example/<mf>/assets/remoteEntry.js`), according to `IS_LOCAL` (`root-app/.env:1`, `false`); `:31–35`: `federation({ name: "root_app", remotes, shared: ["react","react-dom"] })`. | strong |
| Configuration (remotes) | `mf-login/vite.config.ts:10–17` (`name: "mf_login"`, `exposes: { "./Login": "./src/App.tsx" }`), `mf-navbar/vite.config.ts:10–17` (`./Navbar`), `mf-dashboard/vite.config.ts:10–17` (`./Dashboard`) and `mf-personagem-detalhe/vite.config.ts:10–17` (`./PersonagemDetalhe`), all with `filename: "remoteEntry.js"` and output in `../dist/<mf>` (`:22–23`). | strong |
| Source code (composition) | `root-app/src/App.tsx:5–8`: `React.lazy(() => import("mf_navbar/Navbar"))`, `mf_login/Login`, `mf_dashboard/Dashboard` and `mf_personagem_detalhe/PersonagemDetalhe`; `:56–99`: conditional navbar and routes `/login`, `/dashboard`, `/personagem/:id`, with props and callbacks between container and remotes (`onAuthSuccess`, `onCharacterClick`, `onBack`). `root-app/src/declarations.d.ts:1–4`: remote module types. | strong |
| Build/deploy | `build-all.sh:8–23`: separate build of each unit to `dist/<unidade>` and copy of the container to the root; `.github/workflows/deploy.yml:19–27`: publishes `dist` to GitHub Pages. The versioned container bundle contains four production URLs (`dist/root-app/assets/index-DVv4evQ9.js:33`), and generated `remoteEntry.js` loads exposed chunks by relative path (`dist/mf-login/assets/remoteEntry.js`, `"./__federation_expose_Login-…"`). | moderate |
| Source code (boundaries) | Search for `from '../'`/`import('../'` in `*.ts` and `*.tsx`: no occurrences. Remotes do not import the container or each other; user state passes through props and `localStorage` (`root-app/src/App.tsx:10–13`, `36–46`). | strong |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 14 reachable commits (15 across all refs, including remote ref `gh-pages`, not considered), no merges, all by `Guilherme Cardoso <guilherme.cardoso@furk.tech>`, from 2025-07-15 (`6cdaf6f`, “first commit”) to 2025-07-17 (SHA `ddf4741`, “trigger deploy”). `git rev-list --objects $SHA --missing=print` identifies 29 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `root-app` and four remotes, referenced by composition configuration (`root-app/vite.config.ts:11–24`). |
| Q2 | Yes | Own `package.json`, `vite.config.ts`, entry point and build per unit (`build-all.sh:8–21`), without source code import between them. |
| Q3 | Yes | The container loads and routes remotes (`root-app/src/App.tsx:5–8`, `56–99`). |
| Q4 | Yes | Module Federation configured on both sides, with matching names and exposed keys and production URLs corresponding to published folders, consumed through federated `import()`. |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- Q1–Q5 are Yes, satisfying the `MFE-implemented` rule. It matches “monorepos containing a host and its remotes” and “examples… that actually compose frontend units” (`repo_type: example`).
- Complete and consistent chain for all four remotes (contrast with 097/103/104); comparable to complete-chain cases (076/084/096/106/109). Remotes expose screens and the navigation bar, not utilities (contrast with 089/100).
- Deployment is joint (one `dist` on GitHub Pages), but builds are separate and the container loads remotes at runtime by URL, as in final 059’s deployment note.
- `frontend_units: 5`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`.
- There is no open decision.

## Analysis notes

- **RQ2:** `@originjs/vite-plugin-federation` switching remote URLs between local environment and GitHub Pages through an environment variable (`root-app/vite.config.ts:9–24`).
- **RQ1:** versioned build output (`dist/`, with `remoteEntry.js` and `__federation_*`), generating additional signals in code searches.
- **Protocol:** the README refers to `ROADMAP.md` (`README.md:106`), but the versioned file is `roadmap.md`.

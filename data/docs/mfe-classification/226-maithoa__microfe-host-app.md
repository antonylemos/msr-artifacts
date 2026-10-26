---
schema: 1
id: 1210733898
full_name: maithoa/microfe-host-app
url: https://github.com/maithoa/microfe-host-app
commit: 996ff4545e180a5c5464b2c578bba05e48929745
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 226 — maithoa/microfe-host-app

## Context

React 19 + Vite 8 application generated from official template (standard “React + TypeScript + Vite” README, `README.md:1–75`). Module Federation host configuration with `@originjs/vite-plugin-federation` (`vite.config.ts:10–16`) consumes external remote, `remote_app`, at `http://localhost:5174/assets/remoteEntry.js`. Host loads two remote components, `Header` and `Button` (`src/components/RemoteComponentWrapper.tsx:5–6`), on template homepage (`src/App.tsx:22–28`). Remote is absent from repository. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:227` records rank 226, ID 1210733898, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:227` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:28441` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:28447` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same hit in each round, at endpoint `code`:

| Query (`q`) | Subquery / effective query | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `technology-vite-federation-package-code#size:900..999` / `"@originjs/vite-plugin-federation" filename:package.json size:900..999` | `package.json` | 2026-10-07T22:05:11.216Z / 2026-10-08T15:48:17.420Z |

`package.json` is 959 bytes at SHA, within range, and declares `"@originjs/vite-plugin-federation": "^1.4.1"` (`:20`). Code-hit metadata provide only description “Micro FE Host App”, without topics or dates. Entry is code-only; template README lacks searched terms.

In both rounds same account has another candidate, `maithoa/microfe-remote-app` (ID 1210735523; `data/discovery/mfe-round-002/candidates.csv`), outside sample (`sample.csv:227` is sole account entry) and uninspected.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 21 entries, all regular files `100644`; zero symlinks and zero gitlinks. One Vite project (`index.html`, `src/`, `public/`, `vite.config.ts`, tsconfigs, ESLint). | context |
| Configuration (host) | `vite.config.ts:10–16`: `federation({ name: 'host-app', remotes: { remote_app: 'http://localhost:5174/assets/remoteEntry.js' }, shared: ['react', 'react-dom'] })`; `build` with `target: "esnext"` and `modulePreload: false` (`:18–23`). | strong |
| Source code (consumption) | `src/components/RemoteComponentWrapper.tsx:5–6`: `React.lazy(() => import('remote_app/Header'))` and `import('remote_app/Button')`. `:15–33`: renders both under `Suspense`, passing `text` and `onClick` to button. `src/types/remote-app.d.ts:2–13` declares modules. `src/App.tsx:8`, `28`: mounted in page. | strong |
| Nature of consumption | `Header` (without props) and `Button` (`text`, `onClick`) are generic UI components, not functional application slices. Remaining page is Vite template content (`src/App.tsx:15–122`). | ambiguous |
| External unit | Remote is absent from snapshot; fixed URL `localhost:5174`, without documentation. | ambiguous |
| Source code (boundaries) | Relative imports stay within `src/`; no remote code. | context |

## Authorship and history

Non-shallow clone; 1 commit, `996ff45` (2026-04-14, “First repo init & commit”), by maithoa (noreply). No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Snapshot demonstrates host and generic remote components, not second functional frontend unit. |
| Q2 | No | Remote build separation serves component sharing, not composed frontend units. |
| Q3 | No | Host page only renders `Header` and `Button`, without integrating external functional slice. |
| Q4 | No | Module Federation distributes UI components, not application composition. |
| Q5 | No | Q1–Q4 characterize code sharing, not microfrontends. |

## Rationale

- Classified as `Non-MFE`: Module Federation distributes only generic UI components (`Header`, `Button`) to template page, constituting code sharing.
- **Fields:** `approaches: []`, `ui_technologies: [react]`, `build_tools: [vite]`, `frontend_units: 1`, `unit_organization: multi-repo`, `repo_type: example` (Vite template with federation demonstration).

## Analysis notes

- **RQ2:** host `@originjs/vite-plugin-federation` in Vite 8 with remote at `localhost`, tutorial host/remote pattern.
- **Protocol (sample):** same account has another candidate in rounds, outside sample and uninspected; snapshot locates remote nowhere beyond `localhost:5174`.
- **Protocol (search):** entry only through code search; eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Classified as `Non-MFE`. Host consumes only generic header and button from external remote, on standard Vite page. UI component sharing, not frontend-unit composition.

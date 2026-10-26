---
schema: 1
id: 1255336417
full_name: cMancillaValle/ARGOS-SiVIA
url: https://github.com/cMancillaValle/ARGOS-SiVIA
commit: 4f6ef7f491ec9fc2d3e852f271e0c360549fad65
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [web-components]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 378 — cMancillaValle/ARGOS-SiVIA

## Context

Academic computer vision security platform (“ARGOS - SiViA”; repository description): FastAPI backend with AI modules, a main frontend in HTML/JS without a framework (`frontend/`) and a chat assistant (“Hermes IA”) developed separately in React/TypeScript/Vite (`frontend-hermes/`), built as a Web Component and embedded in the dashboard (`README.md:58–64`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:379` records rank 378, ID 1255336417, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:379` records strategy `terminology` and eligibility `unknown`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:31029` and `data/discovery/mfe-round-002/candidates.csv:31037`, both with `terminology` and `unknown` (rule `recent-human-commit` with `activity_incomplete`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T22:36:26.100Z / 2026-10-08T15:59:43.953Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-05` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T23:05:10.076Z / 2026-10-08T16:09:15.173Z |

Hit metadata: Spanish description about the security platform (without the terms), no topics, language HTML, no license, `fork: false`, size 406, created at 2026-05-31T17:49:59Z, pushed at 2026-09-28T02:36:30Z.

**README postdates the searches.** The README at the SHA was changed in `221f58c` (2026-10-09T23:39:47-05:00, “Migración de Flask a FastAPI completada.”; English translation: “Flask to FastAPI migration completed.”), and SHA `4f6ef7f` itself is from 2026-10-10, both after the collections on October 7 and 8, 2026. The version current during the searches is `6fc3f39` (2026-09-15), whose blob (`754b795…`) is absent from the partial clone and was not fetched; the exact matching line cannot be cited. In the SHA README, the hyphenated singular appears in `README.md:63` (“Micro-frontend independiente construido en **React + TypeScript** con **Vite**”; English translation: “Independent micro-frontend built in **React + TypeScript** with **Vite**”), `:70`, `:101`, `:208` and `:312`; plural “micro frontends” does not appear literally.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 144 entries, all regular files `100644`; zero symlinks and zero gitlinks. Two frontend units: `frontend/` (static HTML/CSS/JS with `dashboard.html`, `views/`, `js/router.js`) and `frontend-hermes/` (Vite/React project with `package.json`, `vite.config.ts`, `src/`); Python backend in `backend/`. | strong |
| Configuration (Hermes unit) | `frontend-hermes/vite.config.ts:10–16`: library build with entry `src/hermes-widget.tsx`, format `iife`, file `hermes-widget.js`, bundled React (`:17–23`) and JS-injected CSS (`:3`, `8`). `frontend-hermes/package.json:6–11`: own build (`tsc -b && vite build`). | strong |
| Source code (contract) | `frontend-hermes/src/hermes-widget.tsx:6–59`: custom element `hermes-widget` with Shadow DOM, observed attributes `token`, `api-base` and `modulo` (`:10–12`), mounting React `App` (`:37–46`) and `customElements.define` (`:57–58`). `frontend-hermes/src/App.tsx:35–40`: listens for events `toggle-hermes` and `close-hermes` on `window`. | strong |
| Source code (host) | `frontend/dashboard.html:359–361`: `<hermes-widget id="hermes-ai-widget" api-base="/api" modulo="dashboard">`; `:366`: `<script src="/hermes/hermes-widget.js">`; `:726–730`: injects the token into the attribute after router boot. `frontend/components/topbar.html:25–26` and `frontend/dashboard.html:421`: dispatch `toggle-hermes`/`close-hermes`. | strong |
| Build/deploy | `backend/main.py:92`: `HERMES_DIST` points to `frontend-hermes/dist`; `:281–287`: route `/hermes/{filename}` serves the widget build; `:291–293`: the rest of `frontend/` as static files. `ngrok_tunnel.py:50–62`: builds the widget before exposing the server. `.gitignore:59`: `frontend-hermes/dist/` is not versioned. Joint deployment on the same server, with separate builds. | moderate |
| Source code (boundaries) | Search for `../` in `frontend-hermes/src` and configs: only internal imports (`HermesChat.tsx:6–7`, `useChat.ts:5–6` etc.). The host does not import widget code; it loads the bundle by URL and communicates through attributes and events. | strong |
| Documentation | `README.md:58–64`, `101–108`, `208–214`: Hermes described as “micro-frontend independiente” (English translation: “independent micro-frontend”) and “Widget embebible del chatbot” (English translation: “Embeddable chatbot widget”). | moderate |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 12 reachable commits (12 across all refs), no merge, from 2026-09-15 (`cdc871d`) to 2026-10-10 (SHA). Authorship: `cMancillaValle` (10 commits) and `evallejog` (2), both with institutional email from the same university. The Hermes widget already exists in `6fc3f39` (2026-09-15, “Finalizar merge con repositorio remoto”; English translation: “Finish merge with remote repository”); the FastAPI migration (`221f58c`) and SHA postdate the searches. Remote ref `fastAPIpoc` not considered separately. `git rev-list --objects $SHA --missing=print` identifies 51 missing historical objects, including the README blob current during the searches; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units in the repository: the static frontend and Hermes widget, referenced by the host (`frontend/dashboard.html:361`, `366`). |
| Q2 | Yes | The widget has its own entry and build (`frontend-hermes/vite.config.ts:10–16`); the host is static without a build; no source code import between them. |
| Q3 | Yes | The dashboard loads and mounts the widget and passes session and context to it (`frontend/dashboard.html:359–366`, `726–730`). |
| Q4 | Yes | Web Component with explicit contract (attributes and events) loaded through `<script>` from the build served at `/hermes/` (`backend/main.py:281–287`). |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- Q1–Q5 are Yes, satisfying the `MFE-implemented` rule. It follows the pattern of final 043: a separately built unit composed at runtime as a custom element by a host, not a component package imported at build time (not a “component library using Web Components”).
- The connection is resolvable in the snapshot (entry → `hermes-widget.js` → route `/hermes/` → `<script>` in the host), unlike 328 and 103. The widget is complete functionality with its own state and API, not a utility (contrast with 089/100).
- Deployment is joint (the same FastAPI serves both), but builds are separate and loading occurs at runtime, as in the deployment note of final 059.
- `frontend_units: 2`, `unit_organization: monorepo`, `approaches: [web-components]`, `ui_technologies: [react]` (the host uses no UI library), `build_tools: [vite]`, `repo_type: example` (academic project).
- There is no open decision changing classification.

## Analysis notes

- **Protocol (README postdates the searches):** the README and SHA are from October 9–10, 2026, after collections; the README version current during the searches is not in the partial clone. Classification uses the fixed SHA; the hit’s text match was not verified line by line.
- **RQ2:** React Web Component packaged as IIFE with Shadow DOM and injected CSS, embedded in a vanilla frontend; contract through attributes (`token`, `api-base`, `modulo`) and global events.
- **RQ3:** host→widget communication through attributes and `CustomEvent` on `window`; the widget consumes the same backend API (`api-base`).
- **Protocol (eligibility):** `unknown` in both rounds (`activity_incomplete`).

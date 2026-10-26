---
schema: 1
id: 1363110249
full_name: Residencias-Faculdade/MicroFrontend
url: https://github.com/Residencias-Faculdade/MicroFrontend
commit: 5726e54de24e6b6a1ff1fd004b82db909314640c
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [web-components]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 143 — Residencias-Faculdade/MicroFrontend

## Context

Framework-free Vite + TypeScript shell, with Keycloak authentication, reading registry `public/microfrontends.json` and, at runtime, injecting each external frontend’s `main.js` and mounting its custom element (`README.md:1–3`; `README.md:28–30`; `src/main.ts:137–232`). Registry at SHA points to one external unit, `member-manager`, deployed on Vercel by another team (`public/microfrontends.json:1–8`). Only host is in repository. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:144` records rank 143, ID 1363110249, status `cloned` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred; external unit was not accessed.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:144` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:36985` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:36994` (`pass`), both with `terminology;technology`.

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same six hits in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Collection 001 / 002 (UTC) |
|---|---|---|
| `technology-web-components-mfe-repositories`: `"web components" "micro frontends" in:readme` | without partition | 2026-10-07T23:37:09.864Z / 2026-10-08T16:22:11.019Z |
| `technology-web-components-microfrontends-repositories`: `"web components" microfrontends in:readme` | without partition | 2026-10-07T23:38:04.548Z / 2026-10-08T16:22:26.391Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:42:26.531Z / 2026-10-08T16:02:06.454Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-09` | 2026-10-07T23:12:51.823Z / 2026-10-08T16:10:51.803Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:03:36.641Z / 2026-10-08T15:44:00.702Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:14:31.271Z / 2026-10-08T15:50:41.576Z |

Effective queries append `pushed:>=2025-04-01` and, for terminology queries, `created:2026-09-01..2026-09-30`.

Hit metadata:
- description “Casca orquestradora de Micro Frontends com Web Components. Vite + Nginx + Keycloak SSO, descoberta runtime por microfrontends.json, Shadow DOM isolado e deploy desacoplado sem rebuild da shell.” (English translation: “Micro Frontends orchestration shell with Web Components. Vite + Nginx + Keycloak SSO, runtime discovery through microfrontends.json, isolated Shadow DOM and decoupled deployment without rebuilding the shell.”);
- no topics, TypeScript language, creation at 2026-09-09T19:02:57Z, push at 2026-09-30T19:44:25Z, homepage `micro-frontend-rho.vercel.app`.

README spellings:
- “Micro Frontends” e “Web Components”: `README.md:1`.
- “micro frontends”: `README.md:68` (“0 micro frontends disponíveis”; English translation: “zero micro frontends available”).
- “microfrontends”, as token in `microfrontends.json`: `README.md:30`, `60` and `183`.
- “MICROFRONTEND” / “Microfrontend”, as filename tokens: `README.md:172`, `212` and `213`.

Separated singular form “micro frontend” is absent from README and description; this hit depends on unrecorded GitHub search text processing. README comes from root `c296e85` (2026-09-09) and was unchanged afterward, so predates October 2026 collections.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 23 entries, all regular files `100644`; zero symlinks and zero gitlinks. One Vite project at root (`package.json`, `vite.config.ts`, `index.html`, `src/`, `public/`), plus `Dockerfile`, `Dockerfile.keycloak`, `docker-compose.yml`, `nginx.conf` and `keycloak/realm.json`. No plugged-in frontend is in repository. Cited documents `CONEXAO-MICROFRONTEND.md`, `Requisitos-Microfrontend.md` and `Arquitetura-Visual.md` (`README.md:212–214`) do not exist in inventory. | context |
| Configuration (registry) | `public/microfrontends.json:1–8`: entry `{ "tag": "member-manager", "title": "Members CRUD", "url": "https://crud-member-manager.vercel.app/main.js" }`, with comment “Projeto da equipe 2 (Member Manager)” (English translation: “Team two project (Member Manager)”). README example (`posts-crud` at `localhost:4200`, `README.md:62–65`) was removed at SHA (“fix: Exclusão do localhost project”; English translation: “fix: Removal of localhost project”). | strong |
| Source code (composition) | `src/main.ts:138–175`: `fetch('/microfrontends.json')`; for each entry creates sidebar button and wrapper with `<${entry.tag}></${entry.tag}>`. `src/main.ts:179–215`: on selection, calls `loadScript(entry.url, entry.tag)`. `src/main.ts:219–232`: if `customElements.get(tag)` does not yet exist, injects `<script type="module" src=url>`. `index.html:24–33`: layout with `#sidebarNav` and `#microfrontends`. | strong |
| Documentation (contract) | `README.md:89–106`: mandatory external-frontend contract, with stable `main.js` calling `customElements.define(tag, …)`, hyphenated tag, CORS `*` and Shadow DOM. `README.md:153–174`: Angular/React/Vanilla examples and frontend never performing `import` from shell. `README.md:178–198`: plugging in means adding JSON entry, without shell rebuild. | moderate |
| Source code (boundaries) | Imports in `src`: `src/main.ts:5` (`keycloak-js`) and `src/main.ts:16` (`./components/loader/box-loader`); `src/components/ui/box-loader.tsx:2` imports `./3d-box-loader-animation`. No `../` or external-unit code; connection is only URL and tag. React components in `src/components/ui/*.tsx` are not imported by `main.ts`. | context |
| Build/deploy | `package.json:6–10`: host `vite`/`tsc && vite build`. `Dockerfile:1–18` and `nginx.conf:1–26` serve shell. `docker-compose.yml:17–30` anticipates service `posts-crud` with context `../Caio/aprendendo/primeiro-projeto`, outside repository. `keycloak/realm.json:30–37` records redirect URIs for 3000/4200–4202 and `https://micro-frontend-rho.vercel.app/*`. Unit `member-manager` has own Vercel deployment (registry URL). | moderate |
| Technology | Lockfile: `keycloak-js` 26.2.4, `vite` 6.4.3 and `react` 19.2.8 (`package-lock.json:1500–1501`, `1769–1770`, `1604–1605`). React/`@vitejs/plugin-react` are declared (`package.json:11–22`; `vite.config.ts:2`, `6`), but executed shell is framework-free TypeScript (`src/main.ts`). | context |

## Authorship and history

Non-shallow clone; 11 commits, no merge, all by `exdrama23 <alecviniciusflamengo@gmail.com>`. Root `c296e85` (2026-09-09, “feat: NGX shell + posts-crud + docs”) adds entire shell. Other commits, from 2026-09-30, adjust dependencies, Keycloak deployment on Render and registry. Among these, `d48027b` (“registra member-manager da equipe 2 na shell”; English translation: “registers team two member-manager in shell”) and SHA `5726e54` (“Exclusão do localhost project”; English translation: “Removal of localhost project”) change `public/microfrontends.json` (`git log --no-renames --name-status`). Message of `08f2381` mentions “modificação do opencode” (English translation: “opencode modification”), an assistance tool; metadata cannot separate intellectual authorship. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two units: host (`index.html:34`; `src/main.ts`) and external unit `member-manager`, explicitly referenced by composition configuration (`public/microfrontends.json:4–6`), as external-unit criterion permits. |
| Q2 | Yes | External unit is separately deployed (own Vercel URL, `public/microfrontends.json:6`) and no code import connects host and unit; only URL and tag connect them (`src/main.ts:219–232`). |
| Q3 | Yes | Host loads and mounts unit on its page (`src/main.ts:146–175`, `179–215`). |
| Q4 | Yes | Configured and used mechanism: declarative registry, `<script type="module">` injection and custom-element mounting (`public/microfrontends.json:1–8`; `src/main.ts:138–232`). |
| Q5 | Yes | Q1–Q4 are Yes: host composing an external unit at runtime through Web Components. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “repositories containing only the host, which references external remote units”, as 008, 040 and 087 (final or proposed), and pattern of 043/049, with Web Components loaded from another origin at runtime.
- This is not “component library using Web Components”: host defines no components, only loads external applications registered through URL. Not a third-party platform (074/080/102): shell and contract belong to repository itself.
- `approaches: [web-components]`, for mounting custom elements defined by external bundle, loaded through `<script type="module">`, as in 043. `frontend_units: 2` (host + `member-manager`), `unit_organization: multi-repo`. `build_tools: [vite]` (`vite.config.ts:1–14`). `ui_technologies: [react]`: React, ReactDOM and React plugin are declared host dependencies, although executed loader does not import `.tsx` components.
- `repo_type: example`: academic activity between teams (`package.json:2`: `atividadengx-shell`; registry “equipe 2”; English translation: “team two”), with published demo (Vercel homepage).
- No decision remains open: runtime composition through script and custom element, without iframe, links between applications or build-time packages.

## Analysis notes

- **RQ2:** composition through runtime JSON registry and ESM script injection defining custom elements, with documented contract for external Angular/React/Vanilla frontends (`README.md:89–174`).
- **RQ3:** host contains no plugged-in unit. Relationship depends on external URL and documents absent from repository (`README.md:212–214`). Existence and behavior of `crud-member-manager.vercel.app/main.js` were not verified (no network).
- **Protocol (search):** six queries match, including both Web Components + micro-frontends queries in `in:readme`. Singular hit `"micro frontend"` has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, two units, `multi-repo`, `web-components` and `vite`; no open decision. Confirmed current registry (`public/microfrontends.json:1–8`) has one entry (`member-manager`, external deployment URL) and `src/main.ts:137–232` performs registry `fetch`, creates tag and injects `<script type="module">`; remote content was not opened. `docker-compose.yml:17–30` describes service `posts-crud` outside current registry, not added as unit; `README.md:62–65` shows an old entry, not SHA configuration. `ui_technologies: [react]` records declared React dependencies; React components in `src/components/ui/*.tsx` do not enter graph imported by `src/main.ts`. Singular query `"micro frontend"` matches neither README nor description literally, depending on search text processing; README (`c296e85`, 2026-09-09) predates searches. `repo_type: example` is reasonable given package name (`atividadengx-shell`) and team comment, although README presents it as shell library. Final comparators: 008, 040, 087 (host with external remotes), with 043 and 049 for Web Components mounting.

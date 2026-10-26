---
schema: 1
id: 571288769
full_name: openmfe/demo-microfrontend
url: https://github.com/openmfe/demo-microfrontend
commit: 5cfca8d8d3fa2e5fbfb4e01ed23db80df22e5804
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [web-components]
ui_technologies: []
build_tools: [rollup]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 184 — openmfe/demo-microfrontend

## Context

“MFE Demo” (`README.md:1–3`): demonstration microfrontend following the OpenMFE specification. The frontend is a plain JavaScript custom element `<hotel-offers>` with Shadow DOM, bundled as IIFE by Rollup. It comes with an OpenMFE manifest (`frontend/src/openmfe/manifest.yaml`) describing tag, attributes, events and prerendering and semantic URLs, served by an Express backend. Repository description presents it as a demo and “boilerplate for new projects”. The host that would embed the element is not in the repository; `frontend/src/index.html` is only a preview page (“This is just a preview file”, `index.html:4–6`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:185` records rank 184, ID 571288769, status `cloned`, branch `main` and the front matter commit, which is HEAD of the clone and `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:185` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:5199` and `data/discovery/mfe-round-002/candidates.csv:5204`, both `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2022-11` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:21:42.189Z / 2026-10-08T15:36:19.819Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:05:51.315Z / 2026-10-08T15:45:56.552Z |

Effective queries append `pushed:>=2025-04-01 created:2022-11-01..2022-11-30`.

Hit metadata:
- description “A demo microfrontend, used to show common patterns and as a boilerplate for new projects.”;
- no topics, language JavaScript, `fork: false`, size 197;
- created at 2022-11-27T18:53:12Z, pushed at 2026-05-31T13:36:32Z.

Spellings:
- “microfrontend”: `README.md:3` (“This is a demo of a microfrontend…”) and description;
- “microfrontends”: plural does not appear in the README or description; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is `914da7f` (2022-03-24), long before collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 27 entries, 25 regular `100644` files and 2 executables `100755` (`.env`, `dev.sh`); zero symlinks and zero gitlinks. There are `frontend/` (Rollup, `src/main.js`, `src/openmfe/`, fonts) and `backend/` (Express with `runtime`, `prerender` and `semantic`, and a JSON cache). | context |
| Source code (unit) | `frontend/src/main.js:1–17`, `161`: class `HotelOffers extends HTMLElement` with Shadow DOM, `observedAttributes` `region` and `customElements.define('hotel-offers', HotelOffers)`. `:111–116`: fetches data from `__BACKEND_URL__/api`. `:131–136`: emits `CustomEvent` (`hotel-offers.add-to-wishlist`, `openmfe.analytics`). | strong |
| Configuration (OpenMFE manifest) | `frontend/src/openmfe/manifest.yaml:1–80`: specification `version`, `tag: hotel-offers`, `url.frontend: ../main.js`, `url.prerender`/`url.semantic`, attributes with schema, events with schema and examples. Declared contract for external hosts. `frontend/rollup.config.js:30–46`: copies manifest to `dist/openmfe`, replacing URLs. | strong |
| Build/deploy | `frontend/rollup.config.js:6–11`: output `dist/main.js` in IIFE format. `frontend/package.json:8–14`: `rollup`, `browser-sync`/`serve` on port `MFE_FRONTEND_PORT`. `frontend/serve.json:1–9`: CORS `*` for loading by other origins. `backend/src/index.js:1–33`: server for `api`, `prerender` and `semantic` endpoints. | moderate |
| Source code (host) | `frontend/src/index.html:4–6`, `27–39`: preview page inserting `<hotel-offers region="1197">`, loading `/main.js` and listening to events. Declares itself a development file, rather than a composing host. | context |
| Source code (boundaries) | `frontend/src/main.js` imports no other modules; connection to backend is through HTTP. No `../` imports between `frontend` and `backend`. | context |

## Authorship and history

Non-shallow clone; 13 commits, no merges, all by Alexander Günsche (`git@lxg.de` 12, `lxg@amazon.com` 1). Development spans 2022-02-02 (`f0320f5`, “initial commit”) to 2022-07-28 (`0f4b12f`, “add ISC license”). SHA `5cfca8d` (2026-05-31, “Modernise build deps for current Node (20+)”) changes only `package.json`, `package-lock.json` and `rollup.config.js` (`git diff-tree`) and keeps `pushed_at` recent. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`<hotel-offers>`); manifest describes the unit itself and references no others. Backend is not a frontend unit. |
| Q2 | Yes (for the unit) | Its own entry and build generating `dist/main.js` (`rollup.config.js:6–11`), served with CORS for other origins (`serve.json`). |
| Q3 | Undetermined | The host that would embed the element is not in the repository; `index.html` is only a preview (`index.html:4–6`). |
| Q4 | Undetermined | Unit side is prepared (custom element plus OpenMFE manifest); consumer is not observable. |
| Q5 | No | A unit is prepared for composition by an external host, rather than an MFE instance in the repository. |

## Rationale

- `MFE-unit` under the checklist exception: “a single frontend unit explicitly prepared to be composed by an external host…, but the composing host is not observable”. Matches “repositories containing only a remote unit, without the composing host”.
- Same pattern as final 004, where preparation is a custom element with Shadow DOM and stable shell entry. Here preparation is even more explicit: a standardized manifest (OpenMFE) with attribute and event contract.
- Not a “component library using Web Components”: a domain unit (hotel offers) with its own backend and integration contract, rather than a component library. No third-party platform as only host (102/074/080, 037): OpenMFE specification is open and any application can be host.
- `approaches: [web-components]`, `ui_technologies: []` (plain JavaScript custom element), `build_tools: [rollup]`, `frontend_units: 1`, `unit_organization: single-unit`. `repo_type: example` (“demo”, `README.md:3`); as description also says “boilerplate”, `template` would be defensible.
- No decision remains open.

## Analysis notes

- **RQ2:** Web Components micro-frontend with declarative OpenMFE manifest (attributes, JSON Schema events, prerendering and semantic endpoint) and `CustomEvent` events for host, including channel `openmfe.analytics`.
- **RQ3:** unit includes its own backend (data, HTML prerendering, semantics); host contract is entirely declarative.
- **Protocol (search/eligibility):** plural hit `microfrontends` has no literal spelling. Eligibility `pass` in both rounds, with `pushed_at` maintained by a dependency update in 2026.
- **Independent review contribution (Lupa):** full agreement with MFE-unit and Q1 No, Q2 Yes, Q3/Q4 Undetermined, Q5 No; no open architectural uncertainty (`draft`). Unit is a custom element with Shadow DOM, independent Rollup build, OpenMFE manifest and CORS configuration; `index.html` is a development preview and does not demonstrate a host. Metadata disagreement without class effect: reviewer recommends `repo_type: template` instead of `example`, because recorded search description says the repository also serves “as a boilerplate for new projects”, while README calls it a demo (`README.md:1–3`). Final records distinguish generic boilerplate (014) and widget template (051), both `template`, from custom element demo (004), `example`. `example` retained (executable demo), and alternative `template` is a taxonomy choice for researcher validation, alongside pending `repo_type` harmonization.

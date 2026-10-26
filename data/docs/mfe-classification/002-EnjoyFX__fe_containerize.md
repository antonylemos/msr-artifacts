---
schema: 1
id: 1202215420
full_name: EnjoyFX/fe_containerize
url: https://github.com/EnjoyFX/fe_containerize
commit: f05a9de5c996497b2277614bf4cc473456d85b7e
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [runtime-script]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 002 — EnjoyFX/fe_containerize

## Context

Demonstration application (`README.md`, "Демо застосунок" [English translation: "Demo application"]) with a `frontend/` host, a `microfrontend/` widget, a NestJS backend (`backend/`) and a database (`db/`). Composition uses dynamic loading of an IIFE bundle at runtime, with a `mount`/`unmount` contract registered globally, outside the three approaches initially envisaged (Module Federation, single-spa and Web Components).

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | No MFE dependencies (no Module Federation, single-spa or Web Components); `frontend/package.json` and `microfrontend/package.json` have only React and Vite | absent |
| Structure | Two frontend units: `frontend/` and `microfrontend/`, each with its own `package.json`, `vite.config.js`, `Dockerfile`, `nginx.conf` and entry point; independent versions (`frontend/package.json:4` 1.0.0, `microfrontend/package.json:4` 1.0.1) | strong |
| Structure | `backend/` (NestJS) and `db/` are not frontend units | context |
| Configuration | `microfrontend/vite.config.js:25-29`: `build.lib` with `name: 'MicroFrontendWidget'` and `formats: ['iife']`, the global expected by the host | moderate |
| Source code (exposure) | `microfrontend/src/main.jsx:7` `export function mount(container)` and `:14` `export function unmount(container)` | strong |
| Source code (consumption) | `frontend/src/RemoteWidget.jsx:8` injects `<script>` dynamically; `:13-14` calls `window.MicroFrontendWidget.mount(container)`; `:25-26` calls `unmount` during cleanup; `frontend/src/App.jsx:802` renders `<RemoteWidget src="/mfe/widget.iife.js?v=...">` in the side panel | strong |
| Source code | Search for direct imports between `frontend/src` and `microfrontend/src`: none (supports the units' independence) | absent |
| Composition | `frontend/nginx.conf:57-58`: `location /mfe/ { proxy_pass http://microfrontend:80/; }` links host and widget over the network | strong |
| Build/deploy | `docker-compose.yml:35-36` `microfrontend` service with its own build; `:46` `frontend` depends on `microfrontend`; `helm/fe-containerize/templates/microfrontend.yaml:2-4` its own `Deployment` (`:44` `Service`) | strong |
| Documentation | `README.md:17` "loads JS bundle at runtime" in the diagram; `README.md:32` `microfrontend` described as "Незалежний widget" (English translation: "independent widget"); consistent with the code | moderate |
| History | `640fb99`, `d7bbe3d` (widget's own version), `f36930d` "Disable caching for microfrontend assets to prevent stale bundles", `bbd5537` "Add cache-busting query param to widget.iife.js URL" | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `frontend/` and `microfrontend/`, two frontend units in the repository |
| Q2 | Yes | Their own entry, build, image and deployment (`docker-compose.yml:35-36`, `helm/.../microfrontend.yaml`); no source code imports between the units |
| Q3 | Yes | The host (`frontend`) mounts the widget on the same screen (`App.jsx:802`, `RemoteWidget.jsx:13-14`) |
| Q4 | Yes | Mechanism configured and in use: IIFE build with a global (`vite.config.js:25-29`), `mount`/`unmount` contract (`main.jsx:7,14`), runtime loading (`RemoteWidget.jsx:8`) and proxy (`nginx.conf:57-58`) |
| Q5 | Yes | Q1–Q4 converge |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches the inclusion case "examples, templates, and proofs of concept that actually compose frontend units": composition is simple (a single widget, without routing or communication between MFEs), but explicit and observable in the code and infrastructure.
- Does not fit any Non-MFE case: no dead dependency, no mere mention of the term, and no apps without composition.
- Loading uses `<script>` at runtime, not a link or iframe, so it does not depend on the checklist's unresolved decisions.

## Analysis notes

- **RQ1:** architectural evidence without technology evidence; no MFE-associated dependency, and MFE appears only in source code, build and infrastructure.
- **RQ2:** an emerging approach (IIFE + global + `mount`/`unmount`), outside Module Federation, single-spa and Web Components.

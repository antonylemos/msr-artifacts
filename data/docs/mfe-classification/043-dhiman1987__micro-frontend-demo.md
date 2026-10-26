---
schema: 1
id: 1009887363
full_name: dhiman1987/micro-frontend-demo
url: https://github.com/dhiman1987/micro-frontend-demo
commit: cae01436907388ad75de4a33cfc2c7a5ae256406
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [web-components]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 043 — dhiman1987/micro-frontend-demo

## Context

- **Implementation approach:** Web Components (custom elements loaded through `<script>` from separate origins at runtime; app3 is React in a custom element with Shadow DOM)
- **Repository type:** example/proof of concept ("micro-frontend playground", `README.md:3`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Four directories: `app-shell/` (static HTML), `app1/` and `app2/` (Vanilla JS, each with standalone `index.html` and `app.js`) and `app3/` (React + Vite, with its own `package.json` and `vite.config.js`) | strong |
| Composition (shell) | `app-shell/index.html:14-15`: `<script type="module" src="http://localhost:3001/app.js">` + `<hello-app>`; `:20-21`: `http://localhost:3002/app.js` + `<world-app>`; `:26-27`: `http://localhost:3003/my-counter-app.iife.js` + `<my-counter-app theme="dark" maxcount="7">` | strong |
| Source code (units) | `app1/app.js:1-6`: `customElements.define('hello-app', …)`; analogous `app2/app.js` (`world-app`); `app3/src/MyCounterElement.jsx:6-28`: custom element with `attachShadow`, reads attributes `theme`/`maxCount` and mounts React in the shadow root; `:28` `customElements.define('my-counter-app', …)` | strong |
| Configuration (app3) | `app3/vite.config.js:9-15`: `build.lib` with `formats: ['iife']`, `name: 'MyCounterApp'`, `fileName: 'my-counter-app'`, generating a self-contained bundle for the shell | moderate |
| Source code (contract) | HTML attributes as the host → unit interface (`theme`, `maxcount`) | moderate |
| Build/deploy | Each unit served through its own `http-server` with CORS on distinct ports (3000–3003) (`README.md:44-70`); app3 with its own build | moderate |
| Documentation | `README.md:3-8,35`: "3 independently deployed apps… dropped into the shell via `<script>` and custom elements, simulating real-world frontend autonomy" | moderate |
| Technology | `app3/package.json:13-17`: React, Lit and `@lit/react` (`MyCounterLitElement.jsx` is an alternative variant) | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `app-shell`, `app1`, `app2` and `app3` |
| Q2 | Yes | Each unit has an entry and is served from its own origin; app3 has its own build; none imports another's source code; the shell references only URLs |
| Q3 | Yes | The shell mounts all three units on the same page (`app-shell/index.html:11-29`) |
| Q4 | Yes | Runtime script loading + custom element registration, configured and in use |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- This is not a "component library using Web Components": each custom element is a unit served and (according to the README) deployed separately, composed at runtime by a shell; not a component package imported at build time.
- Matches "examples… and proofs of concept that actually compose frontend units".

## Analysis notes

- **RQ2:** pure Web Components approach (without an MFE framework), with one React unit encapsulated in Shadow DOM and an IIFE build.
- **RQ1 (simplicity):** `app1` and `app2` are trivial custom elements (only displaying text); the case is instructional, but the composition mechanism is complete.

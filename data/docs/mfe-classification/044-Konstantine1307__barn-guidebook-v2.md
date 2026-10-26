---
schema: 1
id: 1269992629
full_name: Konstantine1307/barn-guidebook-v2
url: https://github.com/Konstantine1307/barn-guidebook-v2
commit: e2c640db04352845a395e287b9f9fd62d0a70a59
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: []
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 044 — Konstantine1307/barn-guidebook-v2

## Context

- **Repository type:** template (PWA accommodation guide; "This is the template… Each property gets its own copy", `README.md:7-8`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:3-5` "Single Page Application (SPA) — Vanilla HTML + CSS + TypeScript… Web Components, CSS custom properties, History API routing"; same in `ARCHITECTURE.md:5`; no mention of micro-frontends | context |
| Configuration | `vite.config.ts:17-30`: a single input (`src/index.html`), `VitePWA`; no federation, `build.lib` or multiple entries | absent |
| Source code (Web Components) | `src/components/guide-navbar.ts:138`, `guide-drawer.ts:174`, `guide-modal.ts:77`: `customElements.define(...)` for internal UI components (navbar, drawer, modal), compiled in the same bundle | contrary |
| Source code (routing) | `src/scripts/router.ts` + `src/components/sections/*.ts`: SPA sections rendered by the internal router (History API) | contrary |
| Structure | A single app (one `package.json`, one entry) | contrary |
| Build/deploy | `public/_headers`, `_redirects`, `_routes.json`: single deployment on Cloudflare Pages | contrary |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`vite.config.ts:24-26`) |
| Q2 | No | Web Components share the same build and bundle |
| Q3 | No | No host, shell or root config composing units; the router is internal |
| Q4 | No | No composition mechanism between units; `customElements.define` is used for internal UI components |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is a monolithic SPA in plain TypeScript using native Web Components as its component model, not as boundaries between independent units.
- Matches "conventional frontend monoliths". By analogy, also "component libraries using Web Components": custom elements are internal components of the app itself.
- It probably entered through the implementation search ("Web Components").

## Analysis notes

- **RQ1 (misleading signals):** `customElements.define` is only technology evidence; here it serves as a SPA's component model. Contrast with repository 043, where each custom element is a separately served unit composed at runtime.

---
schema: 1
id: 999942277
full_name: ducknem2086/vue-lifecycle-demo
url: https://github.com/ducknem2086/vue-lifecycle-demo
commit: daf0b5aa249ddc7421b6f8e8da6bb350dbc36611
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [single-spa]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 058 — ducknem2086/vue-lifecycle-demo

## Context

- **Implementation approach:** single-spa (`single-spa-vue`, SystemJS bundle for an import map)
- **Repository type:** example/proof of concept (Vue 3 study project; Vietnamese README about lifecycle hooks)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:26`: `single-spa-vue` ^3.0.1 | weak |
| Source code (lifecycles) | `src/main.ts:2,45-69`: `singleSpaVue({ createApp, appOptions: { render() { return h(App, …) } }, handleInstance(app) { … vuetify, PrimeVue, pinia, router } })`; `:71-73`: `export const bootstrap / mount / unmount`, the lifecycles of a single-spa application | strong |
| Configuration (build) | `vite.config.ts:11-24`: `input: 'src/main.ts'`, `preserveEntrySignatures: 'strict'`, `output.format: 'system'`, `entryFileNames: 'js/app.js'`, `base: ''` and `server.origin: 'http://localhost:1111'`, that is, SystemJS output for a root config to load through an import map | strong |
| Structure | A single Vue app (CRUD views for "proposal", "config", "business") | contrary |
| Composition | No single-spa root config (`registerApplication`, import map) in the repository | absent |
| History | `31d4b39` "migrate to spa": conversion of the app into a single-spa application | moderate |
| Documentation | `README.md`: notes about Vue 3 lifecycle hooks; no mention of architecture | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single unit; no composition configuration references other units |
| Q2 | Yes (for this unit) | Its own build in SystemJS format (`vite.config.ts:11-24`) |
| Q3 | Undetermined | The root config registering the application is not in the repository |
| Q4 | Undetermined | Lifecycles are exported; the side registering them is not observable |
| Q5 | No | A unit prepared for composition, not an MFE instance in the repository |

## Rationale

- Q1 is No; the MFE-unit exception applies, using the checklist's own example: "exported single-spa lifecycles" with an unobservable host.
- Preparation is complete: exported lifecycles, SystemJS build with preserved signatures and a fixed origin for the import map.

## Analysis notes

- **RQ1 (misleading signals, inverse):** the name ("vue-lifecycle-demo") and README (Vue lifecycle hooks) do not indicate MFE; evidence is only in `main.ts`, `vite.config.ts` and the "migrate to spa" commit. "Lifecycle" has two meanings here: Vue hooks and single-spa lifecycles.

---
schema: 1
id: 1125343429
full_name: PureMunky/widget-template
url: https://github.com/PureMunky/widget-template
commit: b24dfbc3126dee7a923534246e06abca53eaa802
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 051 — PureMunky/widget-template

## Context

- **Implementation approach:** Module Federation (`@originjs/vite-plugin-federation`)
- **Repository type:** template ("Production-ready template for creating widgets that can be dynamically loaded into the micro-frontend dashboard", `README.md:1-3`)
- **Assessed commit:** `b24dfbc` (only commit)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:3`: widgets "dynamically loaded into the micro-frontend dashboard via Module Federation"; `README.md:107-109` and `CUSTOMIZATION_GUIDE.md:215-246`: register the widget in the dashboard's `public/widgets.json`; `README.md:39,209`: keep the React version the same as the dashboard's | weak |
| Configuration | `vite.config.js:9-25`: `federation({ name: 'exampleWidget', filename: 'remoteEntry.js', exposes: { './Widget': './src/Widget.jsx' }, shared: { react, react-dom singletons ^19 } })`; `:34` `base: '/widget-template/'` for GitHub Pages | moderate |
| Source code | `src/Widget.jsx:5-17`: "This component is exposed via Module Federation and loaded by the dashboard"; forwards host `props` to `BasicWidget`; `src/widgets/StatefulWidget.jsx` as an alternative example | moderate |
| Structure | A single unit (one `package.json`, one entry) | contrary |
| Composition | The dashboard host (with `widgets.json`) is in another repository of the author ("Check the main dashboard repository", `README.md:288`), outside the sample | absent |
| Build/deploy | `.github/workflows/deploy.yml:11-44`: its own GitHub Pages deployment | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single unit; composition config has only `exposes` (`vite.config.js:12-14`) |
| Q2 | Yes (for this unit) | Its own build and deployment (`deploy.yml`) |
| Q3 | Undetermined | The dashboard host is not in the repository |
| Q4 | Undetermined | Remote side configured; the host (which reads `widgets.json`) is not observable |
| Q5 | No | A unit prepared for composition, not an MFE instance in the repository |

## Rationale

- Q1 is No; the MFE-unit exception applies: a unit explicitly prepared (`exposes`, props contract, `shared` aligned with the host) for an unobservable external host.
- The platform plugin rule (010, 022, 035, 037) does not apply: the host is the author's own micro-frontends dashboard (an application, not a third-party platform with an extension mechanism).

## Point for joint review

- The boundary between a "platform plugin" and a "remote for a host in the same ecosystem" is narrow here: the template lets others create widgets for the author's dashboard. I treated it as MFE-unit because the dashboard is a composed application (not a product/platform), and registration in `widgets.json` is the host's composition configuration.

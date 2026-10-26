---
schema: 1
id: 1401956079
full_name: mmss1995/SkewForge
url: https://github.com/mmss1995/SkewForge
commit: 848f9a66cbf2aa33ffd0054898aea3d8119fc6a7
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react, vue]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 028 — mmss1995/SkewForge

## Context

- **Repository type:** library/tool (self-hosted "version skew protection" gateway for SPAs, with CLI, client runtime, plugins and dashboard)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation (purpose) | `README.md:3`: "Self-hosted version skew protection. Tabs opened before a deploy keep working after it…"; `:19-29`: resolves missing-chunk errors after deployment in SPAs with code splitting | context |
| Structure | Monorepo with packages `@skewforge/{core,client,server,cli,vite,react,vue}` (`packages/*/package.json:2`), an administrative dashboard (`apps/dashboard`, `@skewforge/dashboard`) and two examples (`examples/react-app`, `examples/vue-app`) | contrary |
| Configuration | `examples/react-app/vite.config.ts:5-12`: `react()` + `skewforge()` and vendor splitting; `apps/dashboard/vite.config.ts:7-13`: React + Tailwind + admin API proxy; no federation config, `remotes`, `exposes` or import map | absent |
| Composition | No app loads another: the dashboard administers the gateway; examples are isolated demonstration apps (React and Vue) served by the gateway | absent |
| Documentation (MF) | `README.md:49` and `docs/how-it-works.md:39`: the gateway serves Module Federation `remoteEntry.js` from the correct deployment (compatibility); `README.md:214`: "[ ] Module Federation mode" in the roadmap (compatibility/future) | weak |
| Build/deploy | `Dockerfile`, `docker-compose.yml`, `deploy/nginx.conf`: package the gateway and dashboard | contrary |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | The repository's frontend apps (`apps/dashboard`, `examples/react-app`, `examples/vue-app`) do not form units of the same application; no composition config references other units |
| Q2 | No | No units of the same application to assess |
| Q3 | No | No host/shell loads, mounts or routes the apps; the gateway selects deployment versions of the same app, rather than composing distinct apps |
| Q4 | No | No composition mechanism configured |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is deployment infrastructure tooling (asset versioning and deployment-based routing), not an application composed of micro-frontends.
- The repository's multiple frontend apps are mutually independent (administrative dashboard and examples), matching "monorepos containing several unrelated frontend applications".
- Module Federation appears only as a scenario supported by the gateway and a roadmap item, corresponding by analogy to "MFE frameworks and libraries" and "repositories mentioning micro-frontends without implementing them".

## Analysis notes

- **RQ1 (misleading signals):** infrastructure tools citing `remoteEntry.js`/Module Federation as a use case appear in technology searches.
- **RQ3 (gateway ≠ shell):** per-request routing selects a version of the same app; it does not compose distinct units (contrast with repository 013's `rewrites` shell).

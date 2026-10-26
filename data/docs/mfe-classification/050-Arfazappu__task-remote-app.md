---
schema: 1
id: 981968069
full_name: Arfazappu/task-remote-app
url: https://github.com/Arfazappu/task-remote-app
commit: a5eba71aa7f4a9386a26b497ecd70f439d56ec4e
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
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

# 050 — Arfazappu/task-remote-app

## Context

- **Implementation approach:** Module Federation (`@originjs/vite-plugin-federation`)
- **Repository type:** example/proof of concept (task app with Supabase; README is Vite boilerplate)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Configuration | `vite.config.js:8-15`: `federation({ name: 'taskApp', filename: 'remoteEntry.js', exposes: { './TaskDashboard': './src/TaskDashboard.jsx' }, shared: ['react', 'react-dom'] })`; no `remotes` | moderate |
| Source code | `src/TaskDashboard.jsx:4`: `export default function TaskDashboard()`, the exposed component; `src/main.jsx` + `src/App.jsx` mount standalone; `supabase.js` accesses the backend | moderate |
| Structure | A single app (one `package.json`, one entry) | contrary |
| Composition | No host in the repository; the name ("task-remote-app") indicates its role as a remote for an external, unobservable host | absent |
| Build/deploy | History: `01bc8f8` "workflow setup" added `.github/workflows/deploy-login.yml` (copied from a "Login" app), later renamed to `deploy-task.yml` and removed in `8406479` ("Delete .github directory"); there is currently no pipeline in the repository | weak |
| Documentation | `README.md:1-12`: React + Vite template boilerplate | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single unit; composition config has only `exposes` (`vite.config.js:11-13`) |
| Q2 | Yes (for this unit) | Its own build generating `remoteEntry.js` |
| Q3 | Undetermined | The host is not in the repository |
| Q4 | Undetermined | The remote side is configured; the consumer is not observable |
| Q5 | No | The evidence shows a unit prepared for composition, not an MFE instance in the repository |

## Rationale

- Q1 is No; the MFE-unit exception applies: a single unit "explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…)", with an unobservable host.
- Matches "repositories containing only a remote unit, without the composing host", as in repository 001.

## Analysis notes

- **RQ1 (history):** the workflow copied from a "Login App" (`deploy-login.yml`) suggests an architecture with several remotes (login, task) and a host, each in its own repository; none of them is in the sample.

---
schema: 1
id: 720247595
full_name: threatcode/dump-data
url: https://github.com/threatcode/dump-data
commit: 0dd27890107d57d13df72f775d8a66dc7cb83d20
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [angularjs]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 055 — threatcode/dump-data

## Context

- **Repository type:** production-oriented (legacy RingID frontend in AngularJS 1.8, modernized with Vite and pnpm workspaces; 58 commits)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | pnpm monorepo with a single app (`apps/main-app/`, AngularJS) and supporting packages (`packages/{common,resources,scripts,styles,templates}`) (`README.md:21-37`); `newsportal/` and `webapp/` are subfolders of the same app | contrary |
| Configuration | `vite.config.js:50-63`: a single input (`main: '/index.html'`); aliases for `apps/main-app/app` and `packages/` (`:88-93`); template cache and imagemin plugins; no federation | absent |
| Source code | AngularJS modules (`app.module.js`, `chat.module.js`, etc.) in one bundle | contrary |
| Documentation (plan) | `ARCHITECTURE.md:242-247` "Micro-Frontend Approach — During migration, consider: … iframes, … module federation"; `MIGRATION-PLAN.md:46,55,99,124-140,196` recommends incremental migration to React with micro-frontends (Module Federation or single-spa); `README.md:210-215` roadmap "[ ] Set up micro-frontends"; `TODO.md:279,288`; `MIGRATION.md:111` (future plan) | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`vite.config.js:56-58`) |
| Q2 | No | Packages in `packages/` are imported through aliases in the same build |
| Q3 | No | No host, shell or root config composing units |
| Q4 | No | No composition mechanism; MFE only in the migration plan |
| Q5 | No | Q1–Q4 converge; documentation itself treats MFE as the next step ("[ ] Set up micro-frontends") |

## Rationale

- This is an AngularJS monolith undergoing build modernization; micro-frontends appear only as a recommended strategy for a future migration.
- Matches "repositories mentioning micro-frontends without implementing them" and "conventional frontend monoliths". Same pattern as repositories 012 and 034.

## Analysis notes

- **RQ1 (misleading signals):** migration-plan documents (`MIGRATION-PLAN.md`) with "Module Federation"/"Single-SPA" in still-monolithic repositories; the unchecked roadmap (`[ ]`) is direct evidence of absence.

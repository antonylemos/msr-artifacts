---
schema: 1
id: 1398629157
full_name: Bouabidi/automotive-market-dashboard
url: https://github.com/Bouabidi/automotive-market-dashboard
commit: ca78a1c1214febd9ad105afec72e55a2210cb633
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 034 — Bouabidi/automotive-market-dashboard

## Context

- **Repository type:** example/proof of concept (portfolio/study project with interview documentation: `INTERVIEW-ARCHITECTURE.md`, `INTERVIEW-MICRO-FRONTENDS.md`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `apps/frontend/` (one Angular 22 app) and `apps/backend/` (NestJS + Prisma); a single frontend unit | contrary |
| Technology | `apps/frontend/package.json`: no federation dependency (Native Federation, MF or single-spa) | absent |
| Configuration | `apps/frontend/angular.json:21`: builder `@angular/build:application` (esbuild); a single project | absent |
| Source code | `apps/frontend/src/app/app.routes.ts:7-33`: `loadComponent`/`loadChildren` with local `import()` (lazy loading of internal features, including a component named `AppShell`); no occurrences of `federation`, `loadRemote` or `remoteEntry` in `apps/frontend/src` | contrary |
| Documentation (decision) | `docs/adr/ADR-003-micro-frontends.md:1,3-5,11-13`: "Defer Runtime Micro Frontends Until Independent Deployment Is Justified", status **Accepted**, "Keep the current application as a modular monolith"; `docs/architecture/WHY-NOT-MICRO-FRONTENDS-YET.md:1-9`: "one Angular application… share one Angular build"; `MICRO-FRONTEND-ARCHITECTURE.md:3-7`: "small, validated Angular 22 modular monolith… does not yet have… [what would] justify runtime federation" | contrary |
| Documentation (future) | `MICRO-FRONTEND-ARCHITECTURE.md:24-46`: diagram of the future federation boundary and strangler migration plan (Shell + Products/Dashboard/Analytics remotes, Native Federation after compatibility validation) (plan) | weak |
| Build/deploy | `apps/frontend/Dockerfile`, `docker-compose.yml` and `.github/workflows/ci.yml`: a single frontend build and image | contrary |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`apps/frontend`) |
| Q2 | No | Features (Products, Dashboard) share build and deployment and are loaded through local `import()` (`app.routes.ts:7-33`) |
| Q3 | No | `AppShell` is an internal layout component, not a host for independent units |
| Q4 | No | No composition mechanism; documentation explicitly states that federation has not been adopted (`ADR-003`) |
| Q5 | No | Q1–Q4 converge, and the documentation itself confirms it |

## Rationale

- This is an Angular modular monolith with lazy loading; MFE boundaries are only documented as a future target.
- Documentation formally records the decision **not** to adopt micro-frontends now (ADR-003, "Accepted"; "WHY-NOT-MICRO-FRONTENDS-YET.md").
- Matches "repositories mentioning micro-frontends without implementing them" and "conventional frontend monoliths".

## Analysis notes

- **RQ1 (misleading signals):** several documents with "MICRO-FRONTEND" in their names (`MICRO-FRONTEND-ARCHITECTURE.md`, `INTERVIEW-MICRO-FRONTENDS.md`, `ADR-003-micro-frontends.md`) and an `AppShell` component, but the documented decision is contrary. Similar to repository 012, but with an explicit ADR.
- **RQ1 (negative evidence):** an "Accepted" ADR rejecting MFE is strong evidence of absence, not merely absence of evidence.

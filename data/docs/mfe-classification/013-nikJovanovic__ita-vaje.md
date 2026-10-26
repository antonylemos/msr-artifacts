---
schema: 1
id: 1170818206
full_name: nikJovanovic/ita-vaje
url: https://github.com/nikJovanovic/ita-vaje
commit: 842a007f3e2690f8a521f951fc899c4af560e931
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [multi-zones]
ui_technologies: [react, next]
build_tools: []
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 013 — nikJovanovic/ita-vaje

## Context

- **Implementation approach:** Next.js Multi-Zones, with route-based composition through `rewrites` in the shell and link navigation between zones (outside the three initial approaches)
- **Repository type:** example/proof of concept (academic assignment, "vaje" = exercises; "PC Build Planner")
- **Classification:** MFE-implemented (depends on an unresolved decision; see review)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Four Next.js apps: `shell/`, `catalog-mfe/`, `builds-mfe/` and `auth-mfe/`, each with its own `package.json`, `next.config.ts`, `Dockerfile`, `src/app/layout.tsx` and tests; plus five backend services (`parts-service`, `builds-service`, `users-service`, `web-bff`, `mobile-bff`) | strong |
| Configuration (host) | `shell/next.config.ts:6-29`: `rewrites()` maps `/catalog`, `/builds` and `/auth` (and the `/<zona>-static/_next/*` assets, where the original placeholder zona means "zone") to `CATALOG_URL` (3001), `BUILDS_URL` (3002) and `AUTH_URL` (3003) | strong |
| Configuration (zones) | `catalog-mfe/next.config.ts:6`, `builds-mfe/next.config.ts:6`, `auth-mfe/next.config.ts:6`: their own `assetPrefix` (`/catalog-static`, `/builds-static`, `/auth-static`) to coexist under the shell's origin | strong |
| Source code (navigation) | `shell/src/components/Header.tsx:28-37`: `<a href="/">`, `<a href="/catalog">`, `<a href="/builds">`, simple links (full navigation between zones); each zone renders the entire page with its own layout | moderate |
| Source code (duplication) | `Header.tsx`, `Footer.tsx` and `src/lib/{auth,auth-client,bff,jwt}.ts` duplicated in each app (copying, not importing); no app imports another's source code (supports the units' independence) | moderate |
| Source code (shared state) | Session shared through a JWT cookie read in each zone (`Header.tsx:5,12`, `readJwtFromDocument`) | moderate |
| Build/deploy | `docker-compose.yml:157-211`: one service per zone; `shell` receives `CATALOG_URL`/`BUILDS_URL`/`AUTH_URL` (`:200-202`, `:209-211`); `.github/workflows/{shell,catalog-mfe,builds-mfe,auth-mfe}.yml` with CI per app, triggered by `paths` (`catalog-mfe.yml:3-7`) | strong |
| Documentation | `README.md:11` "Micro-Frontends (Next.js Multi-Zones) — one shell + 3 feature zones stitched together by path rewrites. Each zone is its own Next.js app, own Dockerfile, own CI pipeline."; diagram in `README.md:14-45`; section `:60` | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `shell`, `catalog-mfe`, `builds-mfe` and `auth-mfe` |
| Q2 | Yes | Each app has its own entry, build, Dockerfile, CI and service; common code is duplicated, not imported |
| Q3 | Yes | The shell routes `/catalog`, `/builds` and `/auth` to zones under the same origin (`shell/next.config.ts:10-28`) |
| Q4 | Yes | `rewrites` in the shell + `assetPrefix` in the zones, configured and connected in `docker-compose.yml:200-211` |
| Q5 | Yes | Q1–Q4 converge; see review point below |

## Rationale

- Q1–Q5 are Yes, satisfying the MFE-implemented rule.
- Multi-Zones is a mechanism documented by Next.js for micro-frontends: the shell works as a reverse path router, and each zone delivers its vertical slice of the application.
- Matches "monorepos containing a host and its remotes", here with server-side route composition rather than client-side mounting.

## Analysis notes

- **RQ2:** emerging approach (Next.js Multi-Zones / server-side route composition).
- **RQ3:** independence is supported through code duplication (Header, auth) and session sharing through a JWT cookie, without a shared library.

## Point for joint review

- Composition occurs at the route level: the shell does not mount zones on the same page; each zone serves entire pages, and switching zones is full navigation through `<a href>`.
- This is close to the unresolved decision "link-only or iframe composition". I considered Q4 = Yes because there is more than links: the shell's `rewrites` bring zones together under one origin and route space, and `assetPrefix` values coordinate assets, so explicit composition configuration exists.
- If the unresolved decision is settled by requiring same-page (client-side) composition, this repository becomes Non-MFE ("multiple frontend applications without explicit composition" does not literally apply, but Q3/Q4 would fail).
- Suggested rule: "composition through path routing (reverse proxy, rewrites, Multi-Zones) under the same origin counts as a composition mechanism for Q4; links between applications on different origins do not count".

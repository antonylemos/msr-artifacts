---
schema: 1
id: 1297539319
full_name: Efraim0601/union-portal
url: https://github.com/Efraim0601/union-portal
commit: b11a3e3aa55aff8195e0cde0026ccbd45245266d
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [native-federation]
ui_technologies: [angular]
build_tools: [esbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 059 — Efraim0601/union-portal

## Context

- **Implementation approach:** Native Federation (`@angular-architects/native-federation`, Angular 21, esbuild) with a manifest
- **Repository type:** production-oriented ("Afriland Union" bank portal: staff app and diaspora customer onboarding; deployment on a server with nginx and Docker; 37 commits)
- **Assessed commit:** `b11a3e3` (default branch `master`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:1-30`: "Monorepo Angular CLI 21… host + remotes via module federation"; diagram `shell (host, :4200) ──loadRemoteModule──► promote (:4201) / diaspora (:4202)`; libraries `@union/design-system` and `@union/auth` (SSO through `localStorage`); "reproduz a arquitetura de `portal-client-firstpay`" [English translation: "reproduces the architecture of portal-client-firstpay"] from the bank | moderate |
| Structure | `projects/shell` (host), `projects/promote` and `projects/diaspora` (remotes), each with `federation.config.js`, `src/main.ts`, `src/bootstrap.ts` and its own proxy; libraries `projects/design-system` and `projects/auth` | strong |
| Configuration (host) | `projects/shell/federation.config.js:3-9`: `withNativeFederation({ name: 'shell', shared: shareAll(singleton) })`; `projects/shell/public/federation.manifest.json:1-4`: `promote` → `http://localhost:4201/remoteEntry.json`, `diaspora` → `:4202`; `deploy/federation.manifest.prod.json:1-4`: in production, `/remotes/promote/remoteEntry.json` and `/remotes/diaspora/remoteEntry.json` | strong |
| Configuration (remotes) | `projects/promote/federation.config.js:3-10` and `projects/diaspora/federation.config.js:8-9`: `exposes: { './Routes': '…/remote.routes.ts' }` | strong |
| Source code (composition) | `projects/shell/src/main.ts:1-5`: `initFederation('federation.manifest.json')` before bootstrap; `projects/shell/src/app/app.routes.ts:2,11-18`: `promote` and `diaspora` routes with `loadRemoteModule('<remote>', './Routes')` | strong |
| Source code | No source code imports between `shell`, `promote` and `diaspora`; common libraries participate through path mapping and `shareAll` (supports the units' independence) | absent |
| Build/deploy | `Dockerfile:20-22`: three separate `ng build` commands (`shell`, `promote` with `--base-href /remotes/promote/`, `diaspora` with `/remotes/diaspora/`); `deploy/nginx.conf:29-38`: each remote served under `/remotes/<app>/`; `deploy/server/deploy.sh`: server deployment (separate builds, single image) | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `shell`, `promote` and `diaspora` |
| Q2 | Yes | Each app has its own entry, `federation.config.js` and build (`Dockerfile:20-22`); no source code imports between apps |
| Q3 | Yes | The shell routes to and loads remotes (`app.routes.ts:11-18`) |
| Q4 | Yes | Native Federation configured (development/production manifest) and used through `initFederation` + `loadRemoteModule` |
| Q5 | Yes | Q1–Q4 converge; see deployment note |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "monorepos containing a host and its remotes", with manifest-based runtime composition.

## Analysis notes

- **Checklist (deployment criterion from repository 042):** all three apps are packaged in the **same Docker image** and deployed together. Unlike repository 042, there is no build coupling: each app has its own `ng build`, and the shell loads remotes at runtime through the manifest; a remote can be rebuilt and replaced in `/remotes/<app>/` without rebuilding the shell. Joint packaging is a deployment choice, not a build dependency. If the "deployment dependency" rule is interpreted as requiring separate deployment, the case deserves review.
- **RQ2:** Native Federation (esbuild/ESM variant of MF for Angular), first occurrence in the sample.
- **RQ3:** distinct manifests per environment (`public/federation.manifest.json` development × `deploy/federation.manifest.prod.json` production), SSO between MFEs through shared `localStorage` (`@union/auth`).

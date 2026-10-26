---
schema: 1
id: 1080660279
full_name: pgarr/microfrontend-template
url: https://github.com/pgarr/microfrontend-template
commit: 8869e1289ab5b8e758cb6a465425997296b6ca32
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: template
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 046 — pgarr/microfrontend-template

## Context

- **Implementation approach:** Module Federation (webpack 5) with a `mount(el, options)` contract; React + Vue hybrid
- **Repository type:** template (named "microfrontend-template"; same course structure as repositories 007 and 017; no README)
- **Assessed commit:** `8869e12` (default branch `master`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Four apps at the root: `container`, `marketing`, `auth` (React) and `dashboard` (Vue, `dashboard/src/bootstrap.js:1,6` `createApp`), each with `package.json`, `config/webpack.{common,dev,prod}.js`, `public/index.html`, `src/index.js` and `src/bootstrap.js` | strong |
| Configuration (host) | `container/config/webpack.dev.js:19-23`: `remotes` for `marketing` (8081), `auth` (8082) and `dashboard` (8083); `container/config/webpack.prod.js:16-20`: the same at `${domain}/<app>/latest/remoteEntry.js` | strong |
| Configuration (remotes) | `{auth,dashboard,marketing}/config/webpack.prod.js:14-17`: `name`, `filename: 'remoteEntry.js'`, `exposes` (`./AuthApp`, `./DashboardApp`, `./MarketingApp` → `./src/bootstrap`) | strong |
| Source code (composition) | `container/src/App.js:8-10` `lazy` loading of wrappers; `:29-37` routes `/auth/*`, `/dashboard` and `/*` mount each remote | strong |
| Source code (integration) | `container/src/components/AuthApp.js:1,13` and `MarketingApp.js:1,13`: `import { mount } from '<remote>/<App>'` + `mount(ref.current, { … })` with `onParentNavigate`; `DashboardApp.js:1,8` mounts the Vue remote | strong |
| Build/deploy | `.github/workflows/{container,marketing,auth,dashboard}.yml`: one workflow per app, triggered by `paths` (`auth.yml:6`), with `aws s3 sync dist s3://…/<app>/latest` (`:23`) and CloudFront invalidation for `remoteEntry.js` (`:28`) | strong |
| Documentation | No README | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `container`, `marketing`, `auth` and `dashboard` |
| Q2 | Yes | Each app has its own webpack, entry and deployment workflow (S3 by prefix); no source code imports between apps |
| Q3 | Yes | The container routes to and mounts all three remotes (`App.js:29-37`) |
| Q4 | Yes | `remotes`/`exposes` in development and production, used through `mount` (`AuthApp.js:1,13`) |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "monorepos containing a host and its remotes", "hybrid implementations" (Vue remote in a React container) and "examples, templates… that actually compose frontend units".

## Analysis notes

- **Protocol (family):** same architecture as repositories 007 (incomplete) and 017 (complete): `container` + `marketing`/`auth`/`dashboard`, `mount(el)` + `onParentNavigate`, S3/CloudFront deployment by `<app>/latest` prefix. Three occurrences so far; it should be recorded as a family of repositories derived from the same instructional material in analysis (RQ1/RQ2), to avoid overestimating the frequency of certain artifacts.
- **Protocol (family, difference from 017):** uses `react-router-dom` v6 (`Routes`, `Navigate`) in the container, instead of `Switch`/`Redirect`.

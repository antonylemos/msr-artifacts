---
schema: 1
id: 1009749841
full_name: AlanOlimpio/list
url: https://github.com/AlanOlimpio/list
commit: 6ff9bfa3a94bb5920f60aabacc8f56298cbf4326
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 040 — AlanOlimpio/list

## Context

- **Implementation approach:** Module Federation (webpack 5), with a bidirectional unit: exposes `./ListRoutes` and consumes external remote `RegisterApp`
- **Repository type:** example/proof of concept (project from the course "Webpack do básico ao avançado" [English translation: "Webpack from basic to advanced"], `README.md:1-3`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | A single app (`ListApp`) in the repository; the README mentions "cada micro front end" [English translation: "each micro front end"] (`README.md:29`), but the others are in separate repositories | context |
| Configuration | `webpack.config.js:46-72`: `ModuleFederationPlugin` with `name: 'ListApp'`, `filename: 'remoteEntry.js'`, `exposes: { './ListRoutes' }` **and** `remotes: { RegisterApp: 'RegisterApp@https://register-navy-ten.vercel.app/remoteEntry.js' }`; singleton `shared` for react, react-dom and react-router-dom | strong |
| Source code (consumption) | `src/components/ListRoutes/ListRoutes.js:5`: `React.lazy(() => import('RegisterApp/ModalRegister'))`; `:10-12`: mounts the remote component on nested route `register` within `List` | strong |
| Source code (exposure) | `ListRoutes` exposed to an external container; `src/index.js:1` `import('./bootstrap')`; `src/bootstrap.js:7-15` mounts standalone | moderate |
| Build/deploy | `vercel.json`: its own Vercel deployment; remote `RegisterApp` is also served from Vercel (`register-navy-ten.vercel.app`), in another deployment (independent deployments) | strong |
| Documentation | `README.md:1,15,29`: "module federation", "micro front end" | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `ListApp` (in the repository) + `RegisterApp` (external, referenced in `remotes`, `webpack.config.js:52-55`) |
| Q2 | Yes | `ListApp` has its own build and deployment; `RegisterApp` is external and deployed separately (its own production URL) |
| Q3 | Yes | `ListApp` mounts remote `ModalRegister` in its route tree (`ListRoutes.js:10-12`) |
| Q4 | Yes | `remotes` configured and used through `import('RegisterApp/ModalRegister')` (`ListRoutes.js:5`) |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "repositories containing only the host, which references external remote units" (as in repository 008): the app consumes an external remote deployed separately. At the same time, it exposes `ListRoutes` to a container absent from the repository.

## Analysis notes

- **RQ3:** bidirectional unit (host and remote simultaneously): consumes `RegisterApp` and exposes `ListRoutes`. The full architecture (probably container + list + register) is distributed across several repositories of the author; only this one appears in the sample.
- **RQ1 (build/deploy):** fixed production URL in `remotes` (`webpack.config.js:54`), without development/production separation.

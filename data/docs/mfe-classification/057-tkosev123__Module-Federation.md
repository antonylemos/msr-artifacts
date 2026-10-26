---
schema: 1
id: 1208101025
full_name: tkosev123/Module-Federation
url: https://github.com/tkosev123/Module-Federation
commit: 75672a7639bdeff1d555f96a209f3f014fa692a3
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react-native]
build_tools: [rspack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 057 — tkosev123/Module-Federation

## Context

- **Implementation approach:** Module Federation for React Native (Re.Pack + Rspack, `ModuleFederationPluginV2`)
- **Repository type:** example/proof of concept (React Native "deposit" app newly created through the CLI, with an exposed `Counter`)
- **Classification:** MFE-unit (subject to the mobile scope decision, as in repository 025)
- **Assessed commit:** `75672a76` (only commit)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | A single React Native app (`package.json:2` `"name": "deposit"`, `index.js`, `App.tsx`, `android/`, `ios/`); tracked `node_modules/` (of the 34,490 files, almost all are dependencies) | contrary |
| Technology | `package.json:13-17,27`: `@module-federation/{enhanced,runtime,sdk,…}` 0.10.0 and `@callstack/repack` ^5.1.0-rc.0 | weak |
| Configuration | `rspack.config.mjs:39-47`: `Repack.plugins.ModuleFederationPluginV2({ name: 'Deposit', filename: 'Deposit.container.js.bundle', exposes: { './Counter': './Counter' }, shared: … })`; no `remotes` | moderate |
| Source code | `Counter.tsx:4`: exposed component (counter); `App.tsx:8-20`: default template screen (`NewAppScreen`), without remote usage | moderate |
| Build/deploy (artifacts) | `build/generated/{android,ios}/@mf-types/Counter.d.ts`, `@mf-types.zip`: MF-generated types for consumers | moderate |
| Composition | No host in the repository | absent |
| Documentation | `README.md`: React Native CLI boilerplate | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single unit; composition config has only `exposes` (`rspack.config.mjs:44-46`) |
| Q2 | Yes (for this unit) | Its own container bundle (`Deposit.container.js.bundle`) |
| Q3 | Undetermined | The host is not in the repository |
| Q4 | Undetermined | Remote side configured (and types generated for the consumer); the consumer is not observable |
| Q5 | No | A unit prepared for composition, not an MFE instance in the repository |

## Rationale

- Q1 is No; the MFE-unit exception applies: a Re.Pack remote with `exposes` and generated types for an unobservable external host.
- Same pattern as 001/050, but in **React Native**.

## Point for joint review

- **Mobile scope:** as in repository 025, units belong to a native app, not web. If the study is restricted to web, the case becomes Non-MFE (out of scope). This is the second occurrence; the rule should be fixed in the checklist.

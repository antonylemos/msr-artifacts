---
schema: 1
id: 1247892038
full_name: raiane-honorato/software-eng-mba
url: https://github.com/raiane-honorato/software-eng-mba
commit: c569ccc6582475495a637d44ceed33c62c0f6e86
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react-native]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 025 — raiane-honorato/software-eng-mba

## Context

- **Implementation approach:** Module Federation 2 for React Native (Re.Pack + Rspack, `ModuleFederationPluginV2`)
- **Repository type:** example/proof of concept (MBA final project, "Abordagens de Micro Frontend em React Native" [English translation: "Micro Frontend Approaches in React Native"], `README.md:1-3`)
- **Classification:** MFE-implemented (subject to a scope decision: React Native **mobile** app, not web)
- **Checklist:** applied to `apps/repack/`.

The repository implements the same app (MyGym) three times to compare modularization regimes (`README.md:27-33`):

| Version | Regime | Directory |
|---|---|---|
| Monolith | baseline | `apps/monolith/` |
| Turborepo | build-time (`@mygym/*` packages merged into a single bundle) | `apps/turborepo/` |
| Re.Pack | runtime (host + mini-apps loaded over the network through MF) | `apps/repack/` |

There is also `apps/repack-poc/` (minimal host + remote, `HelloScreen`). The assessment below focuses on `apps/repack/`.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `apps/repack/packages/`: apps `host`, `check-in` and `dashboard` (each with `package.json`, `index.js`, `rspack.config.mjs`, `App.tsx`) and libraries `store`, `ui`, `theme`, `navigation`, `utils`, `data`, `shared-deps` | strong |
| Configuration (host) | `apps/repack/packages/host/rspack.config.mjs:45-51`: `ModuleFederationPluginV2` with `name: 'host'` and `remotes` `checkin@http://localhost:9001/${platform}/mf-manifest.json` and `dashboard@http://localhost:9002/${platform}/mf-manifest.json` | strong |
| Configuration (remotes) | `check-in/rspack.config.mjs:39-46`: `name: 'checkin'`, `exposes: { './CheckInStack' }`; `dashboard/rspack.config.mjs:39-44`: `name: 'dashboard'`, `exposes: { './DashboardStack' }`; shared singletons through `shared-deps/sharedDeps.mjs` | strong |
| Source code (composition) | `host/src/screens/CheckInTab.tsx:11-13`: `React.lazy(() => import('checkin/CheckInStack'))`; `:17-24`: wraps in `ErrorBoundary` + `Suspense`; analogous `DashboardTab.tsx`; `host/src/navigation/RootNavigator.tsx:52-53`: the `Home` and `FindGyms` tabs mount remotes | strong |
| Source code (independence) | `check-in` and `dashboard` do not import one another; they communicate only through shared store `@mygym/store` (Zustand) (`README.md:22`); `host` does not depend on mini-app packages in `package.json` | strong |
| Build/deploy | Each mini-app has its own bundler and dev server (ports 9001/9002); `apps/repack/mprocs.yaml` orchestrates processes; OTA deployment cited as motivation, without a pipeline in the repository | moderate |
| Documentation | `README.md:1-33`; `apps/repack/ARCHITECTURE.md` and each version's `README.md` describe host, mini-apps, `exposes`/`remotes` and runtime loading | moderate |
| Structure (Turborepo version) | `apps/turborepo/`: modules as packages integrated at build-time into a single bundle | ambiguous |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `host`, `check-in` and `dashboard` |
| Q2 | Yes | Each mini-app has its own entry, `rspack.config.mjs` and dev server; no source code imports between `check-in` and `dashboard` |
| Q3 | Yes | The host mounts remotes in tabs (`RootNavigator.tsx:52-53`) |
| Q4 | Yes | MF configured (`remotes`/`exposes`) and used through `import('checkin/CheckInStack')` at runtime (`CheckInTab.tsx:11-13`) |
| Q5 | Yes | Q1–Q4 converge |

## Rationale

- Q1–Q5 are Yes for the Re.Pack version, satisfying the MFE-implemented rule.
- Matches "monorepos containing a host and its remotes" and "examples… and proofs of concept that actually compose frontend units".

## Analysis notes

- **RQ2:** MF approach in React Native (Re.Pack/Rspack, `mf-manifest.json` per platform); if scope includes mobile, it is its own category.
- **RQ3:** controlled comparison within the same repository (monolith × build-time × runtime) with the same domain code, a rare case useful for relating artifacts to integration regimes.

## Point for joint review

- **Scope (mobile vs web):** the protocol defines MFE as decomposition of a **web** application's frontend (section 1). Here, units are React Native mini-apps loaded in a native app. If the study is restricted to web, the repository becomes Non-MFE (out of scope). I suggest recording the decision as an explicit checklist rule ("frontend units are web frontends" or "mobile MFEs are included").
- **Turborepo version:** build-time composition; does not affect classification (the Re.Pack version already satisfies it), but directly exemplifies the unresolved decision about build-time composition.

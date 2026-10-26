---
schema: 1
id: 1137873652
full_name: rgonzalez-dev/portfolio-system-ux-angular
url: https://github.com/rgonzalez-dev/portfolio-system-ux-angular
commit: 7499ea45debd958e3de52db4f8672741a8e01352
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

# 012 — rgonzalez-dev/portfolio-system-ux-angular

## Context

- **Repository type:** example/proof of concept (portfolio system with demonstration data)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:38-39`: `@angular-architects/module-federation` and `@angular-architects/module-federation-tools` ^20 declared | weak |
| Configuration | `angular.json:17` builder `@angular/build:application` (esbuild), `:19` a single entry `src/main.ts`; no `webpack.config.js`, no `withModuleFederationPlugin`, `remotes` or `exposes` | contrary |
| Source code | No occurrences of `loadRemoteModule`, `remoteEntry` or federation in `src/` | absent |
| Source code | `src/app/app.routes.ts:4-58`: all routes use `loadComponent` with local `import()` (`./shell/features/...`, `./protected-features/...`), that is, ordinary lazy loading within the same app | contrary |
| Structure | A single Angular app; the `src/app/shell/` and `src/app/protected-features/` folders are internal organization, not units with their own entry or build | contrary |
| Documentation | `ARCHITECTURE_OPTION4.md:1-7` "Enhanced Lazy Loading + Module Federation… Foundation for future micro frontend (MFE) separation"; `:199-220` phased plan ("Phase 2: Polyrepo…", "Phase 3: Full Module Federation Setup"); `:284-296` "Module Federation (Future)"; `PHASE1_IMPLEMENTATION.md:5,248` "MFE-ready structure… Next: Phase 2 - Polyrepo migration with Module Federation" (future intent) | weak |
| History | `81513c4` "refactoring to support MFE in the future"; `7499ea4` "refactoring project structure for MFE support v2" (intent) | moderate |
| Build/deploy | A single build; no CI/CD | contrary |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`angular.json:19`); no composition config references external units |
| Q2 | No | `shell/` and `protected-features/` share entry, build and deployment and are imported directly (`app.routes.ts:11-54`) |
| Q3 | No | The "shell" is an internal folder, not a host loading units |
| Q4 | No | The MF dependency is declared (`package.json:38-39`), but without configuration or use; under the operational criterion, "a declared dependency alone is No" |
| Q5 | No | Q1–Q4 converge; the documentation describes a future migration, not the current state |

## Rationale

- The repository is an Angular monolith with route-based lazy loading, organized into folders anticipating a future separation into MFEs.
- Matches two Non-MFE cases: "MFE-related dependencies that are unused or experimental" (`package.json:38-39`, unused) and "repositories mentioning micro-frontends without implementing them" (`ARCHITECTURE_OPTION4.md`, `PHASE1_IMPLEMENTATION.md`).
- Under the protocol (section 3.4.7, documentation review), documentation contradicted by implementation artifacts is insufficient evidence. Here, the documentation itself admits that MF is "Future".

## Analysis notes

- **RQ1 (misleading signals):** this case combines an MF dependency, a folder named `shell`, architecture documents with "Module Federation" in the title and "MFE support" commits. All surface signals point to MFE, but the implementation is a monolith.
- **RQ1 (history):** commits show preparation for MFE (phase 1 of a planned migration), not adoption.

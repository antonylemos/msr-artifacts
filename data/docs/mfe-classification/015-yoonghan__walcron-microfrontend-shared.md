---
schema: 1
id: 650844107
full_name: yoonghan/walcron-microfrontend-shared
url: https://github.com/yoonghan/walcron-microfrontend-shared
commit: 0035a85fd9ee3295126b8786391ac90f56d93377
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 015 — yoonghan/walcron-microfrontend-shared

## Context

- **Repository type:** production-oriented (component library published on GitHub Packages, version 12.1.2, CI and SonarCloud)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | No Module Federation, single-spa or Web Components dependency; no occurrences of `federation`, `remoteEntry`, `customElements` or `single-spa` outside `dist/` | absent |
| Configuration (build) | `vite.config.ts:15-29`: `build.lib` with entry `src/index.ts`, `name: "Micro Frontend Shared"`, `react`/`react-dom` as `external`; that is, an npm library build, not an app build | ambiguous |
| Configuration (package) | `package.json:2` `@yoonghan/walcron-microfrontend-shared`; `:11-12` `publishConfig` for `npm.pkg.github.com`; `:22` version 12.1.2; `:24-27` `main`/`module`/`exports` | contrary |
| Source code | `src/components/` with `Accordion`, `Announcement`, `Menu`, `MiniMenu` and `ScrollableCard`, plus `helpers`, `hooks` and `util`, exported through `src/index.ts` | contrary |
| Structure | `pages/`, `renderer/` and `server/` form a demonstration site (Vike, only in `development`, `vite.config.ts:13`); `.storybook/` documents the components | contrary |
| Build/deploy | `.github/workflows/*.yml` with testing, compliance and package publication; tracked `dist/` | contrary |
| Documentation | `README.md:1-3` "A shared library used within the eco-system of Walcron. All components can be reused…"; `:46-52` instructions for `npm version` and `npm publish` | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend application units; the repository is a React component library (`vite.config.ts:16-20`) |
| Q2 | No | No units to assess |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism; the library is consumed through npm package imports |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is a shared component library, published as an npm package for use by MFEs in an ecosystem ("Walcron") located in other repositories.
- The MFE-unit exception does not apply: the library is not a unit prepared for runtime composition by a host (no `exposes`, lifecycles or custom element), but a build dependency.
- Matches the Non-MFE cases "repositories mentioning micro-frontends without implementing them" (the term is only in the name) and, by analogy, "component libraries". The name "microfrontend" indicates the usage context, not this repository's architecture.

## Analysis notes

- **RQ1 (misleading signals):** "microfrontend" appears in the repository and package names, which probably brought it in through the explicit search. It supports an MFE ecosystem but is not an implementation.
- **Protocol (multi-repository ecosystem):** no other Walcron ecosystem repository is in the sample. The ecosystem could be investigated if the study considered multi-repository implementations.

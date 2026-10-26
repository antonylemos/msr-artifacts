---
schema: 1
id: 1120549779
full_name: fiftyknots/e2e-tests
url: https://github.com/fiftyknots/e2e-tests
commit: 1d946b5e434c76b14679d90aaa856a2d9d071fa4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 086 — fiftyknots/e2e-tests

## Context

E2E suite for the external PackTrac system. The target application is described in the README, but is not implemented in this repository. Own code automates navigation and checks in a browser controlled by Playwright (`e2e/helpers.ts:6–11`, `e2e/helpers.ts:39–64`); the configuration points to an external URL (`playwright.config.ts:27–32`).

Commit checked against `data/samples/mfe-sample-001/clones.csv:87`. The complete inventory through `git ls-tree -r --name-only 1d946b5e434c76b14679d90aaa856a2d9d071fa4` contains exactly 12 files: README, `.gitignore`, npm manifest and lockfile, `playwright.config.ts`, workflow and six TypeScript files in `e2e/` (five specs and one helper). There is no versioned `node_modules/`, frontend application sources, HTML entries or own UI targets. The `node_modules/...` keys in `package-lock.json` are dependency records, not implementation directories present in the tree. This inventory supports `frontend_units: 0`, rather than null.

**Branches, for the record only:** `main`, `origin/main` and `origin/HEAD` point to the evaluated commit. There is also `origin/deploy/pnp` at `d5891604aace4313a34d2150e05aca1c838e9985`. Only the references were enumerated; no content from this other commit was used in the classification.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:1–12` identifies an E2E suite for authentication, permissions and interactions with iframes called micro-frontends. `README.md:16–20` identifies Playwright and the external demonstration environment. The words micro-frontend and the iframe titles describe the system under test; they do not demonstrate MFE implementation in the candidate. | context |
| Structure / Technology | `package.json:6–8` offers only `playwright test`; `package.json:20–22` declares Playwright and Node types as development dependencies. There is no frontend build script. The `main` field in `package.json:5` cites `index.js`, but this file does not exist in the inventoried tree. | contrary |
| Configuration (test target) | `playwright.config.ts:14–15` selects the `e2e` directory; `playwright.config.ts:27–32` defines `BASE_URL` or `https://demo.packtrac.com`; `playwright.config.ts:35–39` configures Chromium. These projects are test runner configurations, not frontend units. `playwright.config.ts:73–78` contains only a commented-out `webServer` example, without an active local server configured. | contrary |
| Source code (external consumption) | `e2e/helpers.ts:6–11` navigates to the root of the target URL, fills in the login and waits for the dashboard. `e2e/helpers.ts:39–64` clicks User Management, locates the iframe by title and checks table data. The helper neither creates the iframe nor defines its origin or contract with the host. | context |
| Source code (iframes observed by tests) | `e2e/retailer.spec.ts:45–61` navigates to Products and queries an existing iframe. `e2e/retailer.spec.ts:80–96` navigates to EPR Reports and queries another iframe. These are Playwright selectors and assertions about external pages, not unit mounting code. | context |
| Source code (other specs) | `e2e/packaging-specialist.spec.ts:1–2`, `e2e/packaging-technologist.spec.ts:1–2`, `e2e/qa-technologist.spec.ts:1–2` and `e2e/sustainability-team-member.spec.ts:1–2` import the runner and local helpers. External interaction examples: `e2e/qa-technologist.spec.ts:43–55` and `e2e/sustainability-team-member.spec.ts:39–51`. They do not constitute renderable targets. | context |
| Build/deploy | `.github/workflows/playwright.yml:12–21` checks out this repository, installs dependencies and browsers and runs tests; `.github/workflows/playwright.yml:22–27` publishes the report. There is no frontend application build or deployment in this workflow. | contrary |
| Technical documentation | `README.md:60–66` documents the iframe interaction pattern; `README.md:80–89` inventories the specs; `README.md:233–243` documents the configurable test URL. This documentation concerns test automation, without providing PackTrac composition configuration. The inventory of 12 paths was searched for ADRs, `docs/` directories, architecture files and architecture images/diagrams; none was found. | context |
| Structure / Configuration (negative unit search) | The complete tree was searched for `.html`, `.tsx`, `.jsx`, `.vue`, `.svelte` entry files, application `main`/`bootstrap` entries, `src/`, `apps/`, `modules/` directories and Vite/Webpack/Rspack/Angular/Next configurations. These targets are absent. Only `package.json` exists as a project npm manifest; its script is the test script already cited. `package-lock.json:7–14` confirms the suite root and its development dependencies. | absent |
| Configuration / Source code (negative composition and preparation search) | Own text files in the snapshot were searched for `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map` and `postMessage`: no results. There are no exposures, lifecycles or integration contract of an own unit with an external host. | absent |
| Source code (negative mounting search) | `createRoot`, `hydrateRoot`, `createApp`, `bootstrapApplication`, `platformBrowserDynamic`, `setContent`, `page.route`, `page.evaluate`, `document.createElement`, `appendChild`, `<iframe` and iframe attribute `src` were searched: no results in own text files. The `frameLocator` results are consumption by tests, exemplified in `e2e/helpers.ts:46` and `e2e/retailer.spec.ts:55`, not composition implementation. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No own frontend target in the complete inventory. The configuration contains only tests and an external address (`playwright.config.ts:14–15`, `playwright.config.ts:27–39`); iframe names in `e2e/helpers.ts:46` and `e2e/retailer.spec.ts:55–88` are selectors, not references in composition configuration. |
| Q2 | No | There are no frontend units to evaluate. `package.json:6–8` contains only test execution and `package.json:20–22` the runner dependencies; no own unit build/entry was found. |
| Q3 | No | The candidate contains no application host, shell or root loading units. `e2e/helpers.ts:6–11` visits the external application and `e2e/helpers.ts:39–46` navigates and selects existing content; this is consumption automation, not host implementation. |
| Q4 | No | There is no own composition mechanism. The concrete operation is `frameLocator` and assertions in `e2e/retailer.spec.ts:80–96`; searches for mounting, exposures and integration contracts were negative. The `baseURL` configuration in `playwright.config.ts:29` is the test browser’s target. |
| Q5 | No | The set demonstrates an E2E suite for an external system (`package.json:6–8`, `playwright.config.ts:27–39`, `e2e/helpers.ts:39–64`), without unit or composition implementation in this snapshot. Q5 follows Q1–Q4, without override. |

## Rationale

- Q1–Q5 are No: `Non-MFE` applies. The repository implements tests of an application described as MFE, not an instance of that architecture. The recorded type is `other`, because it is a test suite.
- The criterion from precedents 023/028 requires own targets and composition; mentions, selectors and tested scenarios do not count as Q1 units. The six test/helper routines/files are not six frontend applications either.
- It is not MFE-unit: no own unit or preparation for composition by an absent host was found. Therefore Q2–Q4 are No, without using Undetermined merely because the tested system is outside the snapshot.
- The iframes do not open a methodological decision in this candidate: there is no own implementation of iframe, messages or host/unit contract. Even if PackTrac has an MFE architecture, this fact cannot automatically be transferred to the suite testing it. `approaches`, `ui_technologies` and `build_tools` remain empty; Playwright and Chromium are not unit UI technology or bundlers.

## Analysis notes

- **RQ1:** comments about micro-frontend loading time and selectors such as `iframe[title="..."]` are signals of an external system. They are not equivalent to `src`, registration, mounting or an explicit integration contract implemented by the candidate. The term also appears in `README.md:76`, `:172` and `:315` and in spec wait comments (for example, `e2e/helpers.ts:43`, `e2e/retailer.spec.ts:52` and `:85`), always as a label for the system under test.
- **RQ3:** the external URL is configurable, but changing `BASE_URL` only changes the target of the same suite. It does not register or compose different frontend units.
- **Protocol:** searches in existing annotations for `fiftyknots`, `PackTrac` and `e2e-tests` found no previously recorded family. `playwright.config.ts:3–12` and `playwright.config.ts:73–78` retain generic Playwright configuration comments and examples; they do not demonstrate common origin with a specific candidate. Case 023 is close only as a warning about MFE mentions without unit implementation; it does not indicate a repository family.
- **Protocol:** tests were not run and the demonstration environment was not accessed. The classification describes artifacts at the pinned commit, without asserting the external application’s current state or that assertions pass.

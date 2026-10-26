---
schema: 1
id: 808731653
full_name: dynamic-framework/dynamic-business-team-members-template
url: https://github.com/dynamic-framework/dynamic-business-team-members-template
commit: dc47b11d17f7b48c20539ec4c1e6092aeb866fc6
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: template
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 153 — dynamic-framework/dynamic-business-team-members-template

## Context

“Team members” widget template for Modyo, a commercial third-party CMS and digital platform, built with design system `@dynamic-framework/ui-react`. Installed through `npx @modyo/cli@latest get …` (`README.md:8–15`) and published to a Modyo site through `@modyo/cli push --publish` (`package.json:84–86`; `README.md:23–50`). The bundle is an ordinary React application mounting itself in element `#teamMembers` (`src/index.tsx:27`). It reads Liquid variables that the platform resolves in the page (`src/config/widgetConfig.ts:4–23`). There is no host, `exposes`, lifecycle or custom element. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:154` records rank 153, ID 808731653, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:154` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:8664` and `data/discovery/mfe-round-002/candidates.csv:8670`, both `pass`.

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same four hits in each round, from endpoint `repositories`, with subquery `…#created:2024-05` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:24:26.868Z / 2026-10-08T15:36:57.317Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:06:27.976Z / 2026-10-08T15:46:35.370Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:19:06.663Z / 2026-10-08T15:53:16.104Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:50:06.381Z / 2026-10-08T16:04:55.845Z |

Effective queries append `pushed:>=2025-04-01 created:2024-05-01..2024-05-31`.

Hit metadata:
- null description, no topics, language TypeScript, `fork: false`, `is_template: false`, size 1,606;
- created at 2024-05-31T17:37:37Z, pushed at 2025-12-22T07:26:49Z.

Without a description, the hit comes from the README:
- “micro frontend”: `README.md:32` and `README.md:42`, in comments of the `.env` block;
- “Micro Frontend”: `README.md:45`;
- “microfrontends”: `README.md:53`.

The spellings “microfrontend”, singular without a space, and “micro frontends”, plural with a space, do not appear in the README. These two hits depend on GitHub search text processing, which is not recorded, as in 143/149/150.

The README's last change is `0f5e566` (2024-05-31), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 117 entries, 116 regular `100644` files and 1 executable `100755` (`.husky/commit-msg`); zero symlinks and zero gitlinks. A single webpack project is at the root (`.config/webpack.js`, `public/index.html`, `src/`), without a second frontend or host. | context |
| Build | `package.json:78`, `87`: `webpack build`/`webpack serve` with `.config/webpack.js`. `.config/webpack.js:44`: single entry `src/index.tsx`. `.config/getOutput.js:3–21`: output `build/[name].js`, without `library` or module format. `.config/getPlugins.js:7–62`: HTML, CSS and `asset-manifest.json`, without `ModuleFederationPlugin`. | contrary |
| Source code (mounting) | `src/index.tsx:27–49`: `createRoot(document.getElementById('teamMembers'))` and immediate `render`. `public/index.html:35`: `<div id="teamMembers">`. `README.md:17–21`: root id must be unique in the site. No `mount`/`unmount`, `customElements.define` or export for a host. | contrary |
| Configuration (platform) | `src/config/widgetConfig.ts:4–23`: `{{site.*}}`/`{{vars.*}}` variables resolved by Liquid in the Modyo page. `src/config/liquidConfig.ts:5–9` and `src/config/liquid.json:1–16`: only in development do values come from local JSON and `liquidjs`. `.env.example:9–29` and `README.md:26–50`: account, site, token and `WIDGET_NAME` for Modyo `push`. `.config/webpack.js:27–31`: `allowedHosts` includes `.modyo.cloud` for CLI preview. | moderate |
| Documentation / license | `README.md:32`, `42`, `45`, `53` call the widget a “micro frontend”. `LICENSE.md:1–3`: Modyo license agreement. `LICENSE.md:43`, `95`: “Micro Frontend or Widget Software” and “Micro Frontend Template Software” as Modyo products. | weak |
| Source code (boundaries) / search | Relative imports stay inside `src`, for example `src/config/widgetConfig.ts:1–2`. Searching for `../../../` in `src` returns nothing. `git grep -i` at the SHA (except `package-lock.json`) for `micro.?front`, `federation`, `single-spa`, `customElements`, `registerApplication` and `exposes` finds only text in `README.md`, `.env.example` and `LICENSE.md`. | absent |
| Technology | `package.json:5–21`: React ^18.3.1, `@dynamic-framework/ui-react` ^1.36.2, Redux Toolkit, Formik, `liquidjs`. `package.json:72–75`: `webpack` ^5.89.0 and `webpack-dev-server` ^5.2.2. | context |

## Authorship and history

Non-shallow clone.
- **Commits reachable from the SHA:** 21, of which 4 are PR merges; 25 across all refs.
- **Authors:** Eduard Baron, with `@modyo.com` and noreply, 9 commits and author of root `2652330` (2024-05-31, “Initial commit”) and widget base `0f5e566`. Also Johann Felipe Rojas (7), Luis Nazarit (3), Abê (1) and `dependabot[bot]` (1). Several use `@modyo.com` email: this template is maintained by Modyo itself.
- **Workflows:** use reusable organization workflows (`.github/workflows/use-build-catalog.yml:9–11`, `use-build-demo.yml:9–11`, `use-checks.yml:10–12`).
- **Refs outside the snapshot:** `build/dynamic-catalog`, `build/dynamic-demo`, `feat/template`, `chore/*` and `dependabot/*` (with `c14c49d`, 2025-12-22) were not considered.

No historical blob was read. The clone is partial (`blob:none`) and historical blobs are unavailable without network (the reviewer counted 125 missing objects through `git rev-list --objects --missing=print`); with `GIT_NO_LAZY_FETCH=1`, `git log --name-status` fails in `src` and `.github`. The SHA snapshot was read in full, but per-folder history is incomplete and completeness in `src` is not claimed.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit, without composition configuration referencing other units. |
| Q2 | Yes (for this unit) | Its own entry and build (`.config/webpack.js:44`; `package.json:78`), published separately on the platform (`package.json:86`). |
| Q3 | Undetermined | The Modyo page that would insert the widget is not in the repository. Only the unique id and Liquid variables indicate coexistence with other widgets (`README.md:21`; `src/config/widgetConfig.ts:4–23`). |
| Q4 | Undetermined | The insertion mechanism belongs to the unobservable Modyo platform. The repository has only the autonomous bundle and CLI `push`. |
| Q5 | No | The unit targets only a third-party platform's widget mechanism; there is no MFE instance in the repository. |

## Rationale

- Proposed `Non-MFE`, with `status: review`. Same vector and reasoning as final 037 (ioBroker Admin): the unit's only host is a third-party platform, and the mechanism is that platform's extension mechanism. The researchers' decision in 037 was `Non-MFE`, despite a literal `MFE-unit` reading.
- Host preparation is weaker here than in 037 and final MFE-unit cases 001/004/050/058/069. No `exposes`, single-spa lifecycles or custom element; only a bundle mounting itself in a `div` with a fixed id and reading Liquid variables. Thus the exception “explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`, exported single-spa lifecycles)” does not directly fit either.
- The third-party question (102/074/080) is the same: real composition happens in the Modyo platform. A template distributed through the platform CLI resembles generator/template cases (075/081/094/105).
- `repo_type: template` (`README.md:8–21`; `LICENSE.md:95`), although metadata records `is_template: false`. `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`, under the Non-MFE convention.

## Analysis notes

- **RQ1 (misleading signals):** “micro frontend” is the platform's commercial name for widgets (`README.md:32–45`; `LICENSE.md:43`, `95`). MFE vocabulary comes from the product, not a repository composition mechanism.
- **RQ2:** CMS composition (widget inserted in a page, configuration through Liquid, deployment through platform CLI), outside the repository.
- **Protocol (sample):** other widget templates from the same platform may be in the sample (unverified) and should be treated consistently.
- **Protocol (search):** four terminology queries, two without corresponding literal spellings. Eligibility `pass` in both rounds.

## Point for joint review

Decide whether a third-party CMS platform widget (Modyo), without its own MFE mechanism in the repository, follows precedent 037.

- **Non-MFE (proposed):** follows 037, where the only host is a third-party platform's extension mechanism. Additionally, explicit preparation of the kind illustrated by the MFE-unit exception is absent.
- **MFE-unit:** the widget is a unit with its own build and deployment, prepared for coexistence in the page (unique id, Liquid variables) and described as “micro frontend” by the platform. If Modyo's widget mechanism is accepted as composition, it would become `MFE-unit` with `approaches` to be named, for example `runtime-script`, as in 002.

No new rule is proposed. Until a decision, preserve `Non-MFE`/`review`.

The unresolved decision is the scope of the third-party platform rule (037, 010, 035, 022) for Modyo CMS/CLI widgets without visible host configuration; platform plugin policy has already been decided in those precedents. If the researcher considers this family covered by them, the record can be promoted to `final` as `Non-MFE`.
- **Independent review contribution (Lupa):** agreement with Non-MFE and `review`. Adopted correction: the claim that no historical objects were missing was removed (see authorship). Support for Q4: `README.md:23–50` and `package.json:84–86` show preparation and publication as a Modyo widget, but the host page is absent from the repository; for the Q5 override: `README.md:8–21,23–50`, `LICENSE.md:43,95` and decisions 037, 035 and 010 (third-party platform rule). The useful contrast is final 002, which has two units, a host-injected script, `mount`/`unmount` contract and deployment connection, evidence absent here. `repo_type: template` describes the artifact and does not contradict GitHub's `is_template: false`, a different property.

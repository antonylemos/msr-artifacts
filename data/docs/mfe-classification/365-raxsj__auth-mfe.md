---
schema: 1
id: 1016015339
full_name: raxsj/auth-mfe
url: https://github.com/raxsj/auth-mfe
commit: 8cbfd69064acc826225c0c2fc306f60642c765db
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 365 — raxsj/auth-mfe

## Context

Copy, with history, of application `@edx/frontend-app-authn` (`package.json:2`), the Open edX authentication MFE: “a micro-frontend application responsible for the login, registration and password reset functionality” (`README.rst:11`). It is a React SPA with `@edx/frontend-platform`. One route, `EmbeddableRegistrationPage`, is designed for embedding in an external page: after registration, it notifies `window.parent` through `postMessage` (`src/register/components/EmbeddableRegistrationPage.jsx:114–117`).

The repository’s default branch is `embeddable-registration-form`. The last two commits, by owner `rax` through the GitHub interface, change only `src/MainApp.jsx` and comment out the `Logistration` import and login route with `#`, syntax that is not a valid JSX comment (`src/MainApp.jsx:24`, `46–51`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:366` records rank 365, ID 1016015339, status `cloned`, branch `embeddable-registration-form` and the front matter commit, which is the HEAD of the clone and of `origin/embeddable-registration-form`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:366` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:16103` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:16107` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-07` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:23:25.993Z / 2026-10-08T15:55:00.383Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:55:12.654Z / 2026-10-08T16:06:06.142Z |

The effective queries append `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Hit metadata:
- null description, no topics, language JavaScript, `fork: false`, size 21.088;
- default branch `embeddable-registration-form`;
- created at 2025-07-08T11:11:16Z, pushed at 2025-07-08T11:19:14Z.

Spellings in `README.rst`:
- “micro-frontend”: `README.rst:11` and `:53` (“The authentication micro-frontend also requires…”);
- “micro-frontends”: `README.rst:51` (“All micro-frontends have a shared set of required environment variables…”).

The last README change is `54319c6` (2023-05-04), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 260 entries, 250 regular files `100644` and 10 executables `100755` (dotfiles, `LICENSE` and some files in `src/`); zero symlinks and zero gitlinks. A single application (`src/`, `public/`, `webpack.prod.config.js` over `@edx/frontend-build`). | context |
| Embeddable unit | `src/MainApp.jsx:42–45`: route `REGISTER_EMBEDDED_PAGE`, allowed only with parameter `host` (`src/common-components/EmbeddedRegistrationRoute.jsx:13–22`). `EmbeddableRegistrationPage.jsx:114–117`: `window.parent.postMessage({ action: REDIRECT, … }, host)`. The page is designed for loading by an external hosting page, which is not in the repository. | moderate |
| Platform | `README.rst:11–13`, `29`, `51`: Open edX MFE, deployed with Devstack and configured through variables common to all platform MFEs. | context |
| Owner change | `68ee3f7` and SHA `8cbfd69` (2025-07-08, “Update MainApp.jsx”, author `rax`, committer `GitHub`) change only `src/MainApp.jsx`, leaving `#import …` and `# <Route …>` (`:24`, `46–51`), which are not valid JSX comments. | context |
| Mechanism search | `git grep` in `src/` for `<iframe`, `federation` and `remoteEntry`: nothing. The only external connection is `postMessage` to `parent`. | absent |

## Authorship and history

Non-shallow clone:
- **SHA history:** 1.049 commits, 137 merges, from 2020-09-28 to 2025-07-08, almost all by Open edX/2U maintainers and bots (Zainab Amir, renovate, Waheed Ahmed, Syed Sajjad Hussain Shah).
- **Refs:** 1.515 commits across all refs, with 38 remote branches (`master`, `open-release/*`, `2u-main` etc.), not considered.
- **Owner:** only the two commits by `rax` in `src/MainApp.jsx`.

No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit; the hosting page that would embed registration is neither in the repository nor referenced by composition configuration. |
| Q2 | Yes | The application has its own build and deployment (`package.json`, `fedx-scripts`). |
| Q3 | Undetermined | The page is designed for embedding by an external host (`postMessage` to `parent`), but this host is not observable. |
| Q4 | Undetermined | The mechanism would be iframe embedding by the external page, not configured here. |
| Q5 | No | Third-party Open edX platform MFE, copied with minimal changes, as in finals 037/010/035. |

## Rationale

- `Non-MFE` under the vector of final 037 (q1 no, q2 yes, q3/q4 undetermined, q5 no). The unit belongs to a third-party platform ecosystem (Open edX), rather than a decomposition by the repository author.
- It would not be an ordinary `MFE-unit` either: the “external host” is the platform website, and the mechanism, iframe with `postMessage`, falls under the open iframe decision.
- **Comparison:** like 218 (Open edX package copy) and 348 (Learning MFE copy). Unlike 348, here no other unit is referenced by the application.
- **Fields:**
  - `frontend_units: 1`, `unit_organization: single-unit`, `approaches: []`;
  - `ui_technologies: [react]`, `build_tools: []` (build encapsulated in `@edx/frontend-build`, as in 218);
  - `repo_type: production` (Open edX production application).
- There is no open decision.

## Analysis notes

- **RQ2:** embeddable registration with `postMessage` to `parent` restricted to the `host` provided in the URL, an Open edX/2U platform integration pattern.
- **Protocol (sample):** the same account has `raxsj/brand-digcomp` and `raxsj/edly-io-brand` in the rounds, outside the sample and not inspected. The repository’s default branch is not the upstream main branch.
- **Protocol (search):** spellings are literally in `README.rst`. Eligibility changes from `unknown` (001) to `pass` (002).

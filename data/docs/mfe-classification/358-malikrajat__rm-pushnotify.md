---
schema: 1
id: 922087440
full_name: malikrajat/rm-pushnotify
url: https://github.com/malikrajat/rm-pushnotify
commit: b74e0fc121be8bde71217326f02ac46bf747ffe6
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: [rollup]
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 358 — malikrajat/rm-pushnotify

## Context

- **Repository type:** JavaScript library published on npm (`rm-pushnotify`, `package.json:2–14`) for requesting permission, registering service workers and displaying browser push notifications. The snapshot contains only distribution artifacts (CJS, ESM, types, `sw.js`), documentation and images. Micro-frontends appear only in the README author biography (`README.md:886`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:359` records rank 358, ID 922087440, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:359` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:11521` and `data/discovery/mfe-round-002/candidates.csv:11527`, both with `terminology` and `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-01` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-01-01..2025-01-31` | 2026-10-07T22:20:03.469Z / 2026-10-08T15:53:38.009Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-01` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-01-01..2025-01-31` | 2026-10-07T22:51:15.534Z / 2026-10-08T16:05:13.495Z |

Hit metadata: notification library description (without the terms), topics `library`, `npm`, `npm-package`, `package`, language JavaScript, MIT license, `fork: false`, size 2214, 19 stars, created at 2025-01-25T09:31:05Z, pushed at 2026-07-12T10:21:38Z, npm homepage.

The only term occurrence in the repository is `README.md:886`, in section “Author” (`:882`): “…specializing in micro-frontends, AI-native development, React, and Angular.” Hyphenated plural matches “micro frontends” (hyphen as separator); singular does not appear separately, and this hit depends on GitHub search text processing, which is not recorded. The last README change is `8940c55` (2026-07-12), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 14 entries, 10 regular files `100644` and 4 executables `100755` (`.gitignore`, `README.md`, `index.d.ts`, `sw.js`); zero symlinks and zero gitlinks. Files: `package.json`, `rm-pushnotify.cjs`/`.esm.js` and maps, `index.d.ts`, `sw.js`, `README.md`, `CHANGELOG.md`, `LICENSE`, `.npmignore` and two images in `assets/`. No application source code or `index.html`. | contrary |
| Configuration (package) | `package.json:5–14`: library `main`, `module`, `types` and `exports`; `:89–94`: Rollup build scripts and tests (`rollup.config` and `test/` are not versioned); `:128–131`: npm publication. | contrary |
| Source code | `index.d.ts:1–11`: only class `PushNotification` (permission, service worker registration and update, notification); `rm-pushnotify.esm.js` (beginning): singleton class implementation; `sw.js:11–20`: service worker `push` event handler. No UI, routing or mounting. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA for `micro.?front`: only `README.md:886`; no composition artifact (federation, single-spa, import map, lifecycles). Without application code, there are no imports between units to search. | absent |
| Documentation | `README.md:882–887`: author biography citing micro-frontends as professional expertise. | weak |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 17 reachable commits (17 across all refs), 7 merges, from 2025-01-25 (`b3852a6`, “project init”) to 2026-07-12 (SHA `b74e0fc`, PR #8 merge, tag `v2.1.0`). Authorship: Rajat (`11173135+malikrajat@users.noreply.github.com`) in all commits, 7 through the web interface. Tags `v1.0.0`, `v2.0.0`, `v2.1.0` and remote refs `v-2.0.0`/`v1.0.0` were not considered separately. The account has several `rm-*` libraries in the rounds (for example, `malikrajat/rm-toast-notification`, `data/discovery/mfe-round-002/candidates.csv:11077`) and repository `malikrajat/mfa-nx-ng-react` (`:18592`), outside the sample. `git rev-list --objects $SHA --missing=print` identifies 23 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit: notification library without an application (`index.d.ts:1–11`; `package.json:5–14`); no composition configuration. |
| Q2 | No | There are no units. |
| Q3 | No | There is no host, shell or root config. |
| Q4 | No | No composition mechanism; the term appears only in the author biography (`README.md:886`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”; the repository is a browser utility library, not a composed application.
- The mention has the same nature as profiles 011/064/068/073/077/101/111 (author skill), here within a library README.
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: [rollup]` (`package.json:89–92`, `104–110`).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** author biography with “micro-frontends” at the foot of a library README matches terminology searches.
- **Protocol (family):** the author publishes a series of `rm-*` libraries present in the rounds; only this one is in the sample.

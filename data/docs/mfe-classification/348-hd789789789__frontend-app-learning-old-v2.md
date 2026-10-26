---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
url: https://github.com/hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: production
approaches: [iframe]
ui_technologies: [react]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Context

Copy, with complete history, of application `@edx/frontend-app-learning` (`package.json:2`), the “Learning MFE (micro-frontend application)” in the Open edX platform (`README.rst:9–11`). A React SPA (Paragon, `@edx/frontend-platform`) among the several MFEs Open edX deploys separately. This copy:
- includes platform header and footer as npm packages (`package.json:37–38`);
- provides Frontend Plugin Framework extension points (`README.rst:137–139`; `example.env.config.jsx:1–24`);
- embeds the Discussions MFE, another platform application, through `<iframe>` with URL `DISCUSSIONS_MFE_BASE_URL`.

No commit belongs to the repository owner. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:349` records rank 348, ID 1098656325, status `cloned`, branch `master` and the front matter commit, which is the HEAD of the clone and of `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:349` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:21192` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:21198` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-11` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:28:09.204Z / 2026-10-08T15:56:45.972Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:58:13.574Z / 2026-10-08T16:07:13.967Z |

The effective queries append `pushed:>=2025-04-01 created:2025-11-01..2025-11-30`.

Hit metadata:
- description “Front-end for the Open edX course experience, implemented using React and Paragon.”, no topics, null language, `fork: false`, size 20.342;
- created at 2025-11-18T01:17:18Z and pushed at 2025-11-17T16:55:09Z: push predates creation, consistent with history import.

Spellings in `README.rst`:
- “micro-frontend”: `README.rst:9` (“This is the Learning MFE (micro-frontend application)…”) e `:149` (“The learning micro-frontend also supports…”);
- “micro-frontends”: `README.rst:145` (“All micro-frontends have a shared set of required environment variables…”).

The last README change is `d5a092b` (2025-03-26), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 646 entries, 639 regular files `100644` and 7 executables `100755` (`.dockerignore`, `.eslintignore`, `.gitignore`, `.npmignore`, `src/index.jsx`, `src/index.scss`, `src/setupTest.js`); zero symlinks and zero gitlinks. A single application (`src/`, `public/`, `webpack.*.config.js` over `@openedx/frontend-build`). | context |
| Composition (iframe) | `src/course-home/discussion-tab/DiscussionTab.jsx:20–23`: `<iframe src={`${getConfig().DISCUSSIONS_MFE_BASE_URL}/${courseId}/${originalPath}`}>` in the discussion tab. The same pattern appears in sidebars (`src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:13`, `23`; `…/new-sidebar/…/DiscussionsWidget.tsx:10`, `21`). `src/index.jsx:174` reads `DISCUSSIONS_MFE_BASE_URL`, and `.env.development:14` defines it as `http://localhost:2002`. | moderate |
| Platform | `README.rst:131–133`: “similar to all the other Open edX MFEs”. Header and footer come as npm dependencies (`package.json:37–38`). `example.env.config.jsx:1–24`: plugin through `@openedx/frontend-plugin-framework` (`DIRECT_PLUGIN`, imported as a package). `.env.development:8–35`: URLs for LMS and other platform applications, navigated by link. | context |
| Copy authorship | History from 2019-05-02 to 2025-11-16, with 1.518 commits across all refs (20 merges), all by Open edX maintainers and bots (for example, renovate, David Joy, Michael Terry, Carla Duarte, edX Transifex Bot). The SHA (`d987aed`, “chore: update browserslist DB (#1826)”, by the edX requirements bot) is an upstream commit. | context |

## Authorship and history

Non-shallow clone; 1.518 commits across all refs, 20 merges, from 2019-05-02 to 2025-11-16. Most frequent authors are `renovate[bot]` (179), “Renovate Bot” (119), David Joy (106), Michael Terry (97) and Carla Duarte (75). No commit belongs to the repository owner. Only branch `master` exists. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | The application and an external unit (Discussions MFE) referenced by configuration (`DISCUSSIONS_MFE_BASE_URL`, `src/index.jsx:174`; `.env.development:14`) and embedded in the screen. |
| Q2 | Yes | The Discussions MFE is deployed separately, at its own URL. |
| Q3 | Yes | The application shows the external unit in the tab and sidebars (`DiscussionTab.jsx:20–23`; `DiscussionsSidebar.jsx:23`). |
| Q4 | Yes | The application embeds Discussions MFE through an iframe, at concrete interface points and with a configured URL (`DiscussionTab.jsx:20–23`; `.env.development:14`). |
| Q5 | Yes | Q1–Q4 demonstrate two independent units composed in the platform. Upstream origin is a provenance note, not a denial of observed implementation. |

## Rationale

- Classified as `MFE-implemented`: Learning MFE embeds Discussions MFE through an iframe in defined interface areas.
- **Provenance:** the application belongs to the Open edX ecosystem and was copied in full; classification considers observed implementation and records that origin.
- **Fields:**
  - `approaches: [iframe]`, `ui_technologies: [react]`, `build_tools: []` (build encapsulated in `@openedx/frontend-build`/`fedx-scripts`, as in 218);
  - `frontend_units: 2` (the application and referenced Discussions MFE), `unit_organization: multi-repo`;
  - `repo_type: production` (Open edX production application).

## Analysis notes

- **RQ2:** in the Open edX ecosystem, “MFE” denotes separately deployed SPAs linked by URL. Header and footer are npm packages, extensions enter through plugin slots and Discussions MFE is embedded through an iframe.
- **Protocol (sample):** complete upstream repository copy without declared fork (`fork: false`). The owner has no commits.
- **Protocol (search):** spellings appear literally in `README.rst`. Eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Promoted to `MFE-implemented`. Learning MFE concretely embeds Discussions MFE through an iframe, with configured URL and defined display points. History shows an Open edX upstream copy without owner contribution; this provenance is recorded, but does not invalidate composition present in the snapshot.

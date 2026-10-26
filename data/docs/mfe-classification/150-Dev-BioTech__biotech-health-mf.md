---
schema: 1
id: 1115557843
full_name: Dev-BioTech/biotech-health-mf
url: https://github.com/Dev-BioTech/biotech-health-mf
commit: 47525024cdcf770fb0a0bd17418bb00bf30b5c41
classification: MFE-unit
checklist: { q1: yes, q2: yes, q3: undetermined, q4: no, q5: no }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 150 — Dev-BioTech/biotech-health-mf

## Context

“Health” module of BioTech livestock-management platform, with vaccination, health records and diagnoses. README presents it as microfrontend accessed through “Shell Application” at `biotech-shell.vercel.app` (`README.md:1`, `30`). Repository contains only this Vite + React project. It is configured as Module Federation remote `healthMF`, exposing five screens and a store (`vite.config.js:27–45`), and also declares remote `authMF` at `localhost:5001` (`vite.config.js:30–32`), imported by no code. Shell and `authMF` are absent from repository. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:151` records rank 150, ID 1115557843, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:151` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:22138` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:22144` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same three hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | repositories | `…#created:2025-12` | empty | 2026-10-07T19:25:56.873Z / 2026-10-08T15:40:18.421Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | repositories | `…#created:2025-12` | empty | 2026-10-07T22:10:09.900Z / 2026-10-08T15:48:38.435Z |
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | code | `…#size:1300..1449` | `package.json` | 2026-10-07T22:06:50.926Z / 2026-10-08T15:49:54.689Z |

Effective terminology queries append `pushed:>=2025-04-01 created:2025-12-01..2025-12-31`. Code query appends `size:1300..1449`.

Hit metadata:
- null description, no topics, JavaScript language, `fork: false`, size 135;
- creation at 2025-12-13T04:52:46Z, push at 2026-06-11T19:43:22Z;
- homepage `biotech-health-mf.vercel.app`.

Spellings and lines:
- **Terminology:** without description, retrieval comes from README, whose sole spelling is “Microfrontend”, in `README.md:1` and `README.md:30`. Plural “microfrontends” appears in neither README nor description, so this hit depends on unrecorded GitHub search text processing, as in 143 and 149.
- **Code:** `package.json` at the SHA is 1.374 bytes, within range, and declares `"@originjs/vite-plugin-federation": "^1.4.1"` in `package.json:35`.

Last README change is `3401e6e` (2025-12-16), before SHA (2026-03-01) and October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 37 entries, all regular files `100644`; zero symlinks and zero gitlinks. One Vite project at root (`package.json`, `vite.config.js`, `index.html`, `src/`, `vercel.json`), organized by features (`dashboard`, `health-records`, `vaccination`) and `shared`. No shell, host or second frontend. | context |
| Configuration (exposure) | `vite.config.js:27–45`: `federation({ name: "healthMF", filename: "remoteEntry.js", exposes: { "./HealthDashboard", "./HealthRecordsView", "./VaccinationCalendar", "./HealthRecords", "./DiagnosticHistory", "./HealthStore" } })`. `vite.config.js:46–62`: singleton `shared` for `react`, `react-dom`, `react-router-dom`, `zustand`, `framer-motion` and `lucide-react`. `vite.config.js:65–70`: remote adjustments (`modulePreload: false`, `cssCodeSplit: false`). | moderate |
| Configuration (declared remote) | `vite.config.js:30–32`: `remotes: { authMF: "http://localhost:5001/assets/remoteEntry.js" }`. `git grep authMF` at the SHA finds only this line: no `import("authMF/…")` or static import. Declared reference without consumer. | ambiguous |
| Source code (shell contract) | `src/features/dashboard/components/HealthDashboard.jsx:11–15`: exposed screen with callbacks `onViewRecords`, `onViewCalendar` and `onViewDiagnostics`. `src/shared/utils/auth.js:1–4`, `10–15`: reads `auth-storage` from `localStorage`, “used by the Shell and Auth MF”. `src/shared/utils/apiClient.js:18–47`: JWT from `auth-storage` and `auth-change` on 401. `src/shared/utils/alertService.js:3–9`: `CustomEvent("biotech-toast")` as “Bus de eventos para comunicación entre microfrontends” (English translation: “Event bus for communication between microfrontends”). `src/App.jsx:9–37`: standalone app switching same screens. | moderate |
| Source code (boundaries) | Imports `../` remain within `src`, for example `src/features/dashboard/components/HealthDashboard.jsx:9` and `src/shared/services/healthService.js:1`. Aliases `@` and `@shared` point to `./src` (`vite.config.js:9–10`). Alias `@shared-services` → `../biotech-shell/src/shared/services` (`vite.config.js:11–15`), alongside `server.fs.allow: [".."]` (`vite.config.js:21–23`), would cross boundary into shell repository, but `git grep @shared-services` finds no use in `src`. | context |
| Build/deploy | `package.json:6–11`: `vite build` and `preview --port 5004`. `vercel.json:2–25`: SPA rewrite and CORS `*`, compatible with serving `remoteEntry.js` to another origin. README points to deployed shell (`README.md:17`, `30`). | moderate |
| Technology | `package.json:12–48`: React ^19.1.0, Zustand, React Router, Tailwind 4, Vite ^6.3.5 and `@originjs/vite-plugin-federation` ^1.4.1. No lockfile exists in inventory. | context |

## Authorship and history

Non-shallow clone.
- **Commits reachable from SHA:** 39, including 17 PR merges. All by Nikol Velasquez, under three identities of same owner:
  - `159703935+Nikotastic@users.noreply.github.com`: 17;
  - `velasqueznikol10@gmail.com` as “Nikol Velasquez”: 16;
  - same email as “Nikotastic”: 6.
- **Beginning:** root is `712cdf4` (2025-12-12, “first commit”), followed by `de41fd2` (“initialize project architecture with auth modules…”).
- **Vite configuration:** `vite.config.js` changes in `712cdf4`, `de41fd2`, `55322e3`, `3401e6e`, `14567d5`, `3da3a4e` and `f5793e7` (`git log -- vite.config.js`). `git log -S authMF` did not complete because of missing blob in partial clone (`65be4a37…`), not fetched; clone remained unchanged.
- **Branches outside snapshot:** `origin/develop` (`57884ad`, 2026-03-22) and `origin/feature/conexion-back` (`4b47a9f`, 2026-06-11, commits by Juan HN `<juanandres072004@hotmail.com>`) have commits later than SHA. Metadata `pushed_at` (2026-06-11) corresponds to latter. Under procedure, only commit in `clones.csv` was considered.

README credits design to another collaborator (`README.md:78–79`).

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Under literal criterion, composition configuration explicitly references external unit: `remotes: { authMF }` (`vite.config.js:30–32`). Added to `healthMF`, present in repository, this makes two units. |
| Q2 | Yes | `healthMF` has own entry/build (`index.html:11`; `package.json:8`). `authMF` would be separately deployed (own URL, `vite.config.js:31`). No source-code import connects them; alias to `../biotech-shell` is unused. |
| Q3 | Undetermined | `healthMF` does not load, mount or route `authMF`. Common application would be shell, absent from repository and appearing only in `README.md:17`, `30`. |
| Q4 | No | Sole configured repository connection, `remotes: authMF`, has no consumer (`git grep authMF`): under criterion, “A declared dependency alone is No”. Side `exposes` is configured, but consumer is not observable. |
| Q5 | No | Evidence shows a unit prepared for composition by external host, not an MFE instance in repository. |

## Rationale

- Proposal `MFE-unit` with `status: review`. One No answer exists, but checklist exception applies: “a single frontend unit explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`…), but the composing host is not observable”.
- Same pattern as finals 050/069: Vite + `@originjs/vite-plugin-federation`, screen-component `exposes` (`TaskDashboard` in 050, `./Main` in 069), `shared` and container contract, here through `localStorage` and `window` events.
- Difference from 050/069 is declared but unconsumed `remotes: authMF`. It makes Q1 Yes under literal criterion and Q4 No under declared-dependency rule. It completes no chain, as in 076/084/096/106/109, nor is it an incomplete host whose connectivity requires discussion, as in 097/103/104: repository consumes nothing from remote.
- Not code sharing, as in 089/100: exposures are domain screens with navigation callbacks and store, not generic components. No third-party platform (102/074/080): shell belongs to same ecosystem.
- `frontend_units: 2` and `unit_organization: multi-repo` follow template Q1 criterion, counting `authMF`. MFE-unit precedents without `remotes` record `1`/`single-unit`. `repo_type: example`: academic-team or portfolio project, with Vercel demo, not distributed product. `ui_technologies: [react]`, `build_tools: [vite]`, `approaches: [module-federation]`.

## Analysis notes

- **RQ2:** Vite Module Federation remote exposing screens and Zustand store, communicating through shell via `localStorage` (`auth-storage`) and `CustomEvent` in `window`. Source-code alias to shell repository (`../biotech-shell`) and `fs.allow: [".."]` indicate side-by-side development of sibling repositories, without snapshot use.
- **RQ1 (misleading signals):** `remotes` declared without consumption; README lists features (“Treatment Log”, “Vet Visits”) beyond exposed screens.
- **Protocol (snapshot and branches):** later commits, including another author, are in `develop` and `feature/conexion-back`, outside snapshot.
- **Protocol (search):** plural hit `microfrontends` has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

Decide how to treat a unit with `exposes` that also declares in `remotes` an external remote never consumed.

- **Adopted reading:** Q1 Yes under literal criterion (composition-configuration reference), Q4 No (declaration without use) and exception `MFE-unit`, because repository contains a single unit prepared for external host. Remains `frontend_units: 2`/`multi-repo`.
- **Alternative:** disregard unconsumed reference in count, treating it as “MFE-related dependencies that are unused”. Becomes Q1 No, Q4 Undetermined, `frontend_units: 1`/`single-unit`, same vector as 050 and same class `MFE-unit`.

- **Third reading (consequence recorded by independent review):** apply Q1 counting scope also to exception. With `authMF` counted in Q1 (`frontend_units: 2`), no single unit exists in architectural scope, and exception `MFE-unit` does not apply; since Q4 is No, general rule yields `Non-MFE`, with `approaches: []`.

Class, therefore, is not independent of reading: first two yield `MFE-unit` (first counts only local unit `healthMF` for exception; second disregards unconsumed remote), and third yields `Non-MFE`. Checklist wording "single frontend unit" does not delimit scope. No new rule is proposed; decision remains for researcher, and annotation remains `review`. Q3 remains Undetermined, since without shell, connectivity is not inferred through copying `auth-storage` or isolated README. Q1 No is not proposed as independent alternative, because checklist counts configuration-referenced remotes and `authMF` is in `remotes`.
- **Independent-review contribution (Lupa):** partial agreement. Agrees with unit `healthMF` as remote, Q3 Undetermined, Q4 No and `review`; disagreed with assertion that class does not change between readings, corrected above. Final comparators: 050 and 069 (Vite remote with `exposes`, absent host, Q1 No, one unit, MFE-unit); here `authMF` in `remotes`, never consumed, changes Q1/Q4 and prevents copying vector. 089 and 100 are `review` for another question.

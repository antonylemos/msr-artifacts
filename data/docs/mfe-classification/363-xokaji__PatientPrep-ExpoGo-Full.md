---
schema: 1
id: 1048938294
full_name: xokaji/PatientPrep-ExpoGo-Full
url: https://github.com/xokaji/PatientPrep-ExpoGo-Full
commit: 6bcb12fdef92fe62697c21a7f9897bd4c9a3bf55
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react-native]
build_tools: [metro]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 363 — xokaji/PatientPrep-ExpoGo-Full

## Context

Mobile patient preparation application (Expo/React Native) in an Nx monorepo with a Node.js API (Express), a FastAPI API with Neo4j for a chatbot and internal libraries in `libs/` (repository description; `README.md:1–4`). The README claims “a micro-frontend approach for the frontend” (`README.md:4`), but there is a single client application, which imports libraries through relative paths. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:364` records rank 363, ID 1048938294, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:364` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:18334` (`terminology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:18339` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-09` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T22:26:02.618Z / 2026-10-08T15:55:54.999Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-09` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-09-01..2025-09-30` | 2026-10-07T22:56:53.972Z / 2026-10-08T16:06:44.857Z |

Hit metadata: description “PatientPrep – Mobile-first healthcare prep app with Expo frontend, FastAPI + Neo4j chatbot, and modular Node.js backend in an Nx monorepo.”, topics `expo`, `expressjs`, `fastapi`, `neo4j`, `nx-workspace`, `typescript`, language TypeScript, no license, `fork: false`, size 5085, created at 2025-09-02T08:48:56Z, pushed at 2025-09-22T05:36:53Z.

The only term occurrence is `README.md:4`: “…with a micro-frontend approach for the frontend and modular backend services.”, singular and hyphenated (hyphen as separator). Plural “micro frontends” does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The last README change is SHA `6bcb12f` itself (2025-09-21, “Update README.md”), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 122 entries, all regular files `100644`; zero symlinks and zero gitlinks. A single client app (`apps/mobile-app`), two backends (`apps/patient-prep-api`, `apps/chatbot-api`, with versioned `__pycache__` files), e2e tests and libraries in `libs/` (`ui`, `auth`, `appointment`, `utils`). | contrary |
| Configuration | `apps/mobile-app/project.json:4`, `8–27`: Nx `application` project with `@nx/expo` executors (`start`, `build`, `run-ios`, `run-android`); `apps/mobile-app/package.json:8–23`: Expo and React Native, without a composition dependency. `libs/ui/project.json:5`, `8`: `projectType: "library"` without targets. | contrary |
| Source code | `apps/mobile-app/src/app/App.tsx:1–56`: a single stack navigator with login, registration, tabs, appointments, form and chatbot screens; disables the Nx boundaries rule (`:1`, `eslint-disable @nx/enforce-module-boundaries`). | contrary |
| Source code (boundaries) | Relative imports leaving the app for libraries: `apps/mobile-app/src/app/App.tsx:7`, `9` (`../../../../libs/ui/src/lib/BottomTabs`, `../../../../libs/appointment/AppointmentForm`), `apps/mobile-app/src/screens/AppointmentScreen.tsx:13–17`, `ChatBotScreen.tsx:13`, `LoginScreen.tsx:12`. The `libs` are code compiled inside the app, not units with their own entry and build. | contrary |
| Technology / Configuration / Composition (search) | `git grep -i` at the SHA (except `.pyc`) for `micro.?front`, `federation`, `single.?spa`, `import.?map`, `webview` and `iframe`: only `README.md:4`. | absent |
| Documentation | `README.md:4`: self-description “micro-frontend approach”, without a corresponding artifact. | weak |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 65 commits reachable from the SHA (92 across all refs), 32 merges, from 2025-09-02 (`ae291b5`, “Initial Commit with Nx + Expo”) to 2025-09-21 (SHA). All reachable commits have author `RaVindu Mahiti <142285997+xokaji@users.noreply.github.com>` (35 through the web interface). There are 14 remote branch refs besides `main`, several named after people (`authSetup/Ravindu`, `bottomTabs/Thirandi`, `homeTab/Dewnaka` etc.), suggesting teamwork integrated through owner merges; they were not considered separately. `git rev-list --objects $SHA --missing=print` identifies 131 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`apps/mobile-app`); the `libs` have neither their own entry nor build (`libs/ui/project.json:5–8`); no composition configuration. |
| Q2 | No | There are not two units; the app imports library source code directly (`apps/mobile-app/src/app/App.tsx:7`, `9`). |
| Q3 | No | A single internal navigator composes screens and components from the same application (`App.tsx:14–56`). |
| Q4 | No | No composition mechanism; “micro-frontend approach” is self-description (`README.md:4`). |
| Q5 | No | Q1–Q4 converge. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “conventional frontend monoliths” (internal modularization in `libs/` within a single app) and “repositories mentioning micro-frontends without implementing them”.
- Same criterion as final 042: code from other folders compiled into the single bundle does not form independent units; here there is not even a second application.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react-native]` (Expo), `build_tools: [metro]` (`apps/mobile-app/metro.config.js:1–23`, Metro configuration through `withNxMetro` with an SVG transformer), `repo_type: example` (academic/demonstrative team project, `README.md:4`, “demonstrates”).
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** Nx monorepo with `apps/` and `libs/` described as a “micro-frontend approach”, but with a single client app and relative imports to libraries.
- **Protocol:** the repository versions a Firebase service credential (`apps/patient-prep-api/patientprepsl-…-firebase-adminsdk-….json`) and `__pycache__` files; their content is not reproduced here.

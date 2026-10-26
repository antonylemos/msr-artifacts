---
schema: 1
id: 1174301349
full_name: UserTharushi/companion-disease-risk-ai
url: https://github.com/UserTharushi/companion-disease-risk-ai
commit: 373de0e6083b86b2707913da037735130c8f5503
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 8
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 355 — UserTharushi/companion-disease-risk-ai

## Context

Academic decision-support project for disease risk in companion animals (`README.md:1–3`; folder `docs/coursework/`): npm/Turbo monorepo with a shell and seven React/Vite micro-frontends with `@originjs/vite-plugin-federation` (`apps/`), Node.js and Python microservices and shared type and utility packages. The README itself says the application actually used is `apps/mfe-auth`, running independently, and “The shell + other MFEs are scaffold” (`README.md:80`). The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:356` records rank 355, ID 1174301349, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:356` records strategies `terminology;technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:25945` (`terminology;technology`, `unknown`, rule `recent-human-commit` with `activity_incomplete`) and `data/discovery/mfe-round-002/candidates.csv:25952` (`terminology;technology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same eleven hits in each round:

| Query (`q`) | Endpoint | Subquery | `path` |
|---|---|---|---|
| `technology-vite-federation-package-code`: `"@originjs/vite-plugin-federation" filename:package.json` | `code` | `…#size:800..899` | `apps/mfe-admin`, `apps/mfe-vet-discovery`, `apps/mfe-vaccination`, `apps/shell`, `apps/mfe-pet-profile`, `apps/mfe-risk-results`, `apps/mfe-symptom-checker` (`/package.json`, one hit per file) |
| same | `code` | `…#size:1600..1799` | `apps/mfe-auth/package.json` |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `repositories` | `…#created:2026-03` | empty |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `repositories` | `…#created:2026-03` | empty |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` | `…#created:2026-03` | empty |

Collections: round 001 between 2026-10-07T22:04:45.444Z and 2026-10-07T23:24:16.712Z; round 002 between 2026-10-08T15:47:47.202Z and 2026-10-08T16:17:28.504Z.

Hit metadata: null description, no topics, language TypeScript, no license, `fork: false`, size 17638, created at 2026-03-06T09:35:58Z, pushed at 2026-08-03T07:34:15Z.

README match: `README.md:7` (“React + Tailwind + Module Federation micro-frontends + PWA”) literally contains “Module Federation” and hyphenated plural “micro-frontends”, matching “micro frontends” with the hyphen as separator; singular “micro frontend” does not appear separately, and this hit depends on GitHub search text processing, which is not recorded. The last README change is `46d7f21` (2026-07-18), before the collections on October 7 and 8, 2026; it does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 354 entries, all regular files `100644`; zero symlinks and zero gitlinks. Eight frontend projects in `apps/` (`shell` and seven `mfe-*`), each with `package.json`, `vite.config.ts`, `index.html` and `src/`; backends in `backend/services/`; `packages/shared-types` and `packages/shared-utils`; npm and Turbo workspaces at the root (`package.json:5–18`). | strong |
| Configuration (shell) | `apps/shell/vite.config.ts:9–21`: `federation({ name: "shell", remotes: { mfeAuth, mfePetProfile, mfeSymptom, mfeRiskResults, mfeVetDiscover, mfeVaccination, mfeAdmin } })`, with `http://localhost:3001` through `3007` `/assets/remoteEntry.js`, and `shared` React, ReactDOM, React Router and Zustand. | strong |
| Configuration (remotes) | Each `apps/mfe-*/vite.config.ts` declares `name` matching the shell key and `exposes` `./App` (plus pages), for example `apps/mfe-pet-profile/vite.config.ts:9–15`, `apps/mfe-admin/vite.config.ts:9–17`; scripts use the same ports (`apps/mfe-pet-profile/package.json`: `vite --port 3002` and `vite preview --port 3002`, through `mfe-admin` on 3007). `apps/mfe-auth/vite.config.ts:9–17`: `name: "mfeAuth"`, `exposes` `./App`, `./LoginPage`, `./RegisterPage`. | strong |
| Source code (composition) | `apps/shell/src/App.tsx:18–23`: `lazy(() => import("mfePetProfile/App"))` and the other five remotes; `:47–54`: routes under `ShellLayout` with common navigation (`apps/shell/src/layouts/ShellLayout.tsx:11–16`, `51–65`). `mfeAuth` is not imported: `apps/shell/src/App.tsx:8–15`, `44` redirect `/auth/*` to `http://localhost:3001` (“Auth MFE runs standalone… redirect to it instead of federating”). | moderate |
| Documentation / Build/deploy (actual use) | `README.md:80`: “The primary user-facing app is `apps/mfe-auth` (port 3001)… The shell + other MFEs are scaffold.” `docker-compose.yml:11–34`: only services `shell` and `mfe-auth`; the other six remotes do not start. `apps/shell/Dockerfile:15`: the shell runs `vite` in dev mode. Several remote pages are placeholders (for example, `apps/mfe-symptom-checker/src/pages/ChatbotPage.tsx:5`, “Symptom Checker MFE scaffold page.”), while `mfe-auth` concentrates complete dashboards (for example, `apps/mfe-auth/src/pages/PetOwnerDashboardPage.tsx`, 112863 bytes). | ambiguous |
| Source code (boundaries) | Scan of 281 relative specifiers in `apps/**` and `packages/**` (`*.ts`, `*.tsx`), resolved against each project root: none leaves the source project. Apps share only types from workspace package `@companion-ai/shared-types` (for example, `apps/mfe-pet-profile/src/lib/api.ts:1`, `import type`). | strong |

## Authorship and history

Non-shallow, partial clone (`blob:none`). 65 reachable commits (65 across all refs), 4 merges, from 2026-03-06 (`f3cfb0e`, “Initial commit”) to 2026-08-03 (SHA `373de0e`). Authorship: the owner with three identities (`UserTharushi`, 39; `MGTE Ranasinghe`, 24; `Tharushi Ranasinghe` through the web interface, 2), same noreply email in two. Remote refs `import/local-initial-2026-04-09` and `pr/import-into-main` not considered separately. Shell federation configuration exists since `1d5c716` (2026-03-25, “project setup”). Root `CLAUDE.md` indicates coding assistant use. `git rev-list --objects $SHA --missing=print` identifies 309 missing historical objects; cited SHA files were read.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Shell and seven micro-frontends in the repository, six referenced and imported by the shell (`apps/shell/vite.config.ts:11–19`; `apps/shell/src/App.tsx:18–23`). |
| Q2 | Yes | Own `package.json`, `vite.config.ts`, port and build per app; no source code import between them (only shared package types). |
| Q3 | Yes | The shell routes six remotes under a layout with common navigation (`apps/shell/src/App.tsx:47–54`). |
| Q4 | Yes | The shell configures six remotes with matching names, `./App` keys and ports and consumes them through federated imports. The README describing them as scaffold limits production evidence, but does not invalidate composition implemented in the snapshot. |
| Q5 | Yes | Q1–Q4 demonstrate implemented shell/remote architecture; scaffold status is recorded as a maturity caveat. |

## Rationale

- Classified as `MFE-implemented`: shell and six remotes form a complete federated chain, with consistent configuration and consumption.
- The statement that shell and remotes are scaffold is a maturity and production-use caveat, not absence of implemented architecture.
- `frontend_units: 8` (shell and seven `mfe-*`), `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`, `repo_type: example` (course assignment, `docs/coursework/`).

## Analysis notes

- **RQ1 (misleading signals):** eight `package.json` with `@originjs/vite-plugin-federation` and consistent shell configuration, but the README declares composition is scaffold and the product is standalone `mfe-auth`.
- **RQ2:** `@originjs/vite-plugin-federation` with a shell mixing federation (six remotes) and URL redirection (auth).
- **Protocol:** course project with reports and presentations in `docs/` and multiple identities of the same author.

## Recorded decision

Promoted to `MFE-implemented`. The shell declares and consumes six remotes through Module Federation, with consistent names, ports and exposed modules. The README characterizes this part as scaffold and local deployment does not run it fully; this records limited maturity, but does not eliminate composition implemented in code.

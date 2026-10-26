---
schema: 1
id: 1325875170
full_name: ArthTechX/PrepMate
url: https://github.com/ArthTechX/PrepMate
commit: 4aad7d956c0c3ea11955345076f25e70745d8f49
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 124 — ArthTechX/PrepMate

## Context

Full-stack mock-interview application, with profile, PDF resume, voice interview, assessment and report (`README.md:3–14`). A single Next.js/React UI consumes API routes and AI/media services. Page iframe displays a PDF; Anam avatar streams to a video element, not another mounted frontend application.

Rank, ID and SHA checked in `data/samples/mfe-sample-001/clones.csv:125`, status `cloned`; HEAD matches front-matter commit. Every clone Git command used `GIT_NO_LAZY_FETCH=1`. Read-only SHA inspection, without installing dependencies, running builds/servers, using network or changing clone.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:125` records rank 124, strategy `technology` and eligibility `pass`. Sample source is round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). Candidate appears in `data/discovery/mfe-round-001/candidates.csv:34901`, with eligibility `unknown`, and `data/discovery/mfe-round-002/candidates.csv:34907`, with `pass`. Both record null description, empty topics, TypeScript language, `fork: false`, creation at 2026-08-06T20:48:47Z and push at 2026-08-06T21:10:23Z.

`sqlite3 -readonly` queries of tables `hits`, `queries` and `subqueries` in `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, by ID 1325875170, show one hit in each round:

- Query `technology-single-spa-repositories`, strategy `technology`, text **`"single-spa" in:name,description,readme`**.
- Subquery `technology-single-spa-repositories#created:2026-Q3`.
- Effective query `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30`.
- Collections: 2026-10-07T23:36:12.321Z in round 001 and 2026-10-08T16:21:53.010Z in round 002; empty `path`, without matched line/field.

By elimination, name and description lack searched term and no topics exist. Nearby observed textual signal is **“Single SPA”**, with space and capitals, in `README.md:542`: `Page[page.tsx - Single SPA]`. Expression appears in file diagram describing a single page, without citing single-spa framework. This spelling is not rewritten as literal `single-spa` occurrence, nor is a search normalization asserted to have produced hit; API recorded no such explanation. Entire README belongs to sole commit, from 2026-08-06T21:08:58Z, before October searches, not after. Repository name was not used as architectural evidence.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r`: 43 regular files `100644`, zero symlinks and zero gitlinks. One Next manifest/config, `app/layout.tsx`, `app/page.tsx`, API routes, server libraries, Prisma and assets. No second frontend target, host/remote, submodule, versioned `node_modules` or explicit bundler configuration. | contrary |
| Source code (UI) | `app/layout.tsx:20–33` supplies root layout wrapping `children`; `app/page.tsx:1–3` defines client page with React hooks. Inventory contains only this interface page; remaining `app/api` routes are endpoints. No independent-region entries/builds exist. | contrary |
| Configuration / Build/deploy | `package.json:5–12` defines a single `next dev/build/start` cycle, plus Prisma tasks. `next.config.ts:1–7` exports empty configuration, without bundler hook, remotes or composition. `tsconfig.json:21–23` resolves `@/*` to local root. Folders `app`, `lib/agents` and `prisma` do not constitute frontend units through directory separation. | contrary |
| Technology (resolution) | `package.json:20–25` declares Next 16.1.6 and React/ReactDOM 19.2.3, resolved in `package-lock.json:5554–5556`, `package-lock.json:6213–6215` and `package-lock.json:6222–6224`. Next encapsulates bundler; Webpack/Turbopack is not inferred from transitive dependencies or framework name. Installation/build was not run. | context |
| Source code (iframe) | `app/page.tsx:1464–1475` labels “Resume preview (PDF)” and points iframe to `/api/resumes/${selectedResume.id}/pdf`. `app/api/resumes/[resumeId]/pdf/route.ts:25–41` fetches file and returns `Content-Type: application/pdf` and inline disposition. This is document visualization, without contract between frontend units. | contrary |
| Source code (avatar) | `app/page.tsx:208–235` obtains token through local API, imports Anam SDK and calls `streamToVideoElement("anam-video")`; `app/page.tsx:237–240` creates PCM audio input. Implementation delivers media to a DOM element, without loading a remote UI with own entry/build. SDK is declared (`package.json:15`) and resolved in `package-lock.json:50–52`. | context |
| Source code (boundaries) | Active literal search for `../../` and `../../../` in all JS/TS/TSX at the SHA: no occurrence. Only two TSX files are layout and page of the same target. Absent traversals do not establish independence of nonexistent units; local aliases were not treated as composition. | context |
| Technology / Configuration / Composition | Text-file search, excluding lockfile, for `module.?federation`, `remoteEntry`, `registerApplication`, `single.?spa`, `qiankun`, `wujie`, `postMessage`, `iframe`, `customElements`, `import.?map` and `micro.?frontend` returns only “Single SPA” in diagram (`README.md:542`), PDF iframe and endpoint comment (`app/api/resumes/[resumeId]/pdf/route.ts:6–9`). Additional search for `single-spa`, `registerApplication`, `ModuleFederation`, `remoteEntry`, `exposes`, `remotes` and `importmap` in TS/TSX/JSON finds none of these mechanisms, including lockfile. | absent |
| Documentation (architecture) | HLD distinguishes a React client and Next/API server from external services (`README.md:44–77`). Layer diagram describes “Single-Page React UI” (`README.md:80–105`), and file map identifies `page.tsx` as “Single SPA” (`README.md:537–549`). This documentation is consistent with inventory and code, not evidence of single-spa framework. No separate ADR exists in inventory. | context |

## Authorship and history

Metadata from `git rev-list`: **1 commit, 0 merges and 1 root commit**, the evaluated SHA itself; non-shallow clone. Author and committer `Arth Kumar`, at 2026-08-07T02:38:58+05:30 (2026-08-06T21:08:58Z), message `Initial commit`.

`git log --no-renames --name-status` for `app`, `lib` and `prisma` shows joint addition of 14, 15 and 1 files, respectively, in same commit. No granular evolution demonstrates original writing of each excerpt by owner. Bulk addition proves neither vendoring nor automatic generation, and no declared upstream was found in read evidence; content was treated as materialized candidate implementation, with this authorship limitation. External SDKs are dependencies and were not attributed to owner as own units. Historical blobs were not read, and no missing object was found.

Local references for record only: `main`, `origin/main` and `origin/HEAD` point to pinned SHA. No other branch appears in local enumeration; this does not guarantee none exist on server. No content external to snapshot was incorporated.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One Next application, with own layout/page and single build cycle (`app/layout.tsx:20–33`; `app/page.tsx:1–3`; `package.json:5–8`). Iframe is a PDF and avatar is media, not other frontend units. |
| Q2 | No | No set of units with independent entries/builds. Page and API routes share Next project (`package.json:5–12`; `next.config.ts:1–7`); library/service organization creates no frontend units. |
| Q3 | No | Layout wraps own page (`app/layout.tsx:20–33`), without host/shell loading, mounting or routing distinct units. Resume iframe (`app/page.tsx:1464–1475`) presents data. |
| Q4 | No | No composition mechanism is configured. Next configuration is empty (`next.config.ts:1–7`); iframe returns PDF (`app/api/resumes/[resumeId]/pdf/route.ts:36–41`) and SDK streams media (`app/page.tsx:231–240`). |
| Q5 | No | Q1–Q4 converge: single conventional frontend with APIs/AI/media, without observable MFE architecture. “Single SPA” (`README.md:542`) does not identify single-spa library. |

## Rationale

- `Non-MFE` under conventional monolithic frontend case. This is not a unit prepared for an external host; thus `MFE-unit` does not apply and Q2–Q4 are No, not Undetermined.
- `frontend_units: 1` and `unit_organization: single-unit` record sole own target. APIs, AI agents, libraries and media/documents do not increase count.
- `repo_type: production` describes application intended for interview-preparation flow (`README.md:3–14`), without asserting verified operational deployment. `ui_technologies: [react, next]` follows Next convention; `build_tools: []` because no explicit bundler configuration exists.
- No methodological question remains open about iframe/link/build-time composition: iframe target was verified as PDF and no second application is identified. No generic exclusion rule is applied to every iframe; concrete content of this case is evaluated.

## Analysis notes

- **Protocol (family):** annotation search for `ArthTechX`, `PrepMate` and `Anam` found no previously annotated sibling. Standard Next artifacts do not prove common lineage with specific candidate.
- **RQ1:** technology strategy retrieved candidate through query `"single-spa"`, while nearby textual evidence is “Single SPA” meaning a single interface. Hit does not confirm library use; SDK names and iframe tags also require inspecting consumer and content.
- **Checklist:** unlike 076/084/096/106/109, no unit chain exists; unlike 097/103/104, no MFE configuration requires repairing connection; unlike 089/100, no federation shares components. Nor is this merely proposed/generated content as in 023/075/081/105: UI is implemented, but as one conventional target. External dependencies do not make system a third-party platform plugin as discussed in 037/074/102.
- **RQ1 (misleading-signal family, with 110):** 110 and 124 were retrieved through same query `technology-single-spa-repositories`, and both READMEs have "single SPA" (`110: README.md:11`; `124: README.md:542`, "Page[page.tsx - Single SPA]") describing a single page, not single-spa library. Space-separated spelling matches query term; recurrent false positive to consider in RQ1.

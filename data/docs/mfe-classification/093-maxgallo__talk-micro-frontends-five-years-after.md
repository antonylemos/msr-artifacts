---
schema: 1
id: 886350855
full_name: maxgallo/talk-micro-frontends-five-years-after
url: https://github.com/maxgallo/talk-micro-frontends-five-years-after
commit: beed57f182dd6ab0cc9fc7e721f657c0d354be13
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
  date: 2026-10-23
---

# 093 — maxgallo/talk-micro-frontends-five-years-after

## Context

Talk material: Markdown source, PDF, images and Excalidraw drawings about evolution of DAZN’s frontend architecture. The README points to slide versions and presentation tools (`README.md:5–12`); content details composition, routing and architectural decisions, without implementing the described applications or orchestrator (`slides.md:333–362`, `slides.md:462–485`). Classification follows this content and inventory inspection, not the repository name.

Commit checked against `data/samples/mfe-sample-001/clones.csv:94`. Complete inventory through `git ls-tree -r beed57f182dd6ab0cc9fc7e721f657c0d354be13`: **58 regular files, zero symlinks and zero gitlinks**; all modes are `100644`. There is no versioned `node_modules/` or submodule. There are two Markdown files, one PDF, `.gitignore` and 54 files under `images/` (38 PNG, 14 Excalidraw, one JPG and one GIF). There is no application manifest, HTML entry or frontend-unit source. Therefore `frontend_units: 0` is an observable inventory result, not lack of access.

**Branches and history:** `master`, `origin/master` and `origin/HEAD` point to the pinned SHA. Local tag `ijs-munich-2024` points to `cc48ac05d7c583b9e436c80ef4f04c0f713ba68b`, a snapshot ancestor; it was recorded without replacing the evaluated commit. The clone is not shallow and `git rev-list --count` returns **8 commits** reachable from the SHA.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:94` records `strategies: terminology` and `eligibility_status: pass`. The sample origin is `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`). In `data/discovery/mfe-round-002/candidates.csv:10651`, the row for ID `886350855` records description “Slides for the talk done at jsday 2025 in Bologna”, `topics: []`, `language: null` and default branch `master`. These metadata contextualize the material, but are not proof of implementation absence/presence; that conclusion comes from inspected artifacts.

Query exclusively through `sqlite3 -readonly` against database `data/discovery/mfe-round-002/discovery.sqlite`, tables `hits` and `queries`, found two hits for `repository_id = 886350855`:

| query_id | strategy | endpoint | Query in `queries.q` |
|---|---|---|---|
| `terminology-micro-frontend-repositories` | `terminology` | `repositories` | `"micro frontend" in:name,description,readme` |
| `terminology-micro-frontends-repositories` | `terminology` | `repositories` | `"micro frontends" in:name,description,readme` |

Both have empty `path`: they are repository search results, without an identified code excerpt. The description recorded at discovery ("Slides for the talk done at jsday 2025 in Bologna") lacks the term and topics are empty, so the hit is compatible with the repository name and `README.md:1` (discovery-time metadata, read in read-only mode). For audit, SQLite rows are identified by these keys, since the database has no textual numbering:

```sql
SELECT q.query_id, q.strategy, q.endpoint, q.q, h.path
FROM hits h JOIN queries q ON q.query_id = h.query_id
WHERE h.repository_id = 886350855
ORDER BY q.query_id, h.path;
```

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation / Structure | `README.md:5–7` points to `slides.pdf` and `slides.md`; `README.md:9–12` identifies Deckset and Excalidraw as tools. Source `slides.md:1–13` uses presentation theme and delimiters, not an application entry. | context |
| Documentation (external architecture) | `slides.md:333–360` presents composition, orchestrator and six DAZN micro-frontends in diagrams/notes. `slides.md:483–485` presents another architecture through an image. These descriptions are talk subjects; the repository contains no sources, builds or executable configuration of these systems. | context |
| Documentation (mechanisms) | `slides.md:45–46`, `slides.md:172` and `slides.md:445` mention SystemJS, Module Federation and Single-SPA as compared topics. `slides.md:462–478` discusses a SystemJS wrapper and release policies. There is no executable loading or registration call in these passages. | context |
| Documentation (composition and communication) | `slides.md:201–242` references composition/routing diagrams; `slides.md:300–314` lists storage, URL parameters, event bus and props as alternatives. This is presentation text, not an implemented contract between this candidate’s units. | context |
| Documentation / Structure (drawings) | `images/monolith_vs_vertical_mfes.excalidraw:1–7` identifies Excalidraw data and graphical elements; the drawing is referenced in `slides.md:147–150`. The 14 Excalidraw sources and their images are visual material, not application packages or Q1 units. | context |
| Documentation (ADRs) | `slides.md:533–547` contains a commented-out section about RFCs and Architecture Decision Records as recommended practice. The inventory contains no own ADR, `docs/` directory, example implementation or deployment configuration of discussed applications. The ADR mention does not demonstrate a decision record of an application implemented here. | context |
| History | Eight commits, from `162257586b16e220158a9e25b6939d0457087188` (2024-11-10, initial commit) to the evaluated SHA (2025-04-08, fix: typo). Among them, `38a509c7d6a905cfdafe41abed4198bc56598f3b` (2024-11-12, feat: add architecture comparison), `7fbe6a385e6880cd77fa3c2a0198ee6ad99db408` (2024-11-13, feat: decision framework slides) and `b78b1de2363802f10e8f136914ac3635a8051867` (2025-04-08, feat: add qr code at the end) concern material evolution. Inspection of paths in all eight trees found no `package.json`, `.js/.jsx/.ts/.tsx` sources, HTML entries, Vue or Svelte. Current content remains the deck, including the closing QR in `slides.md:700–707`. Application implementation was not inferred from commit titles. | context |
| Structure / Build/deploy (negative search) | All SHA paths inventoried: searched for application manifests, HTML/JS/TS/JSX/TSX/Vue/Svelte sources and entries, app directories, Webpack/Vite/Next/Angular configurations and build/deployment workflows. None was found. PDF, images and Markdown do not provide own frontend-unit builds/entries. | absent |
| Configuration / Source code (negative search) | Markdown files and textual `.excalidraw` sources were searched for `ModuleFederation`, `module.federation`, `single.?spa`, `SystemJS`, `registerApplication`, `remoteEntry`, `mount(`, `unmount(`, `<iframe`, `postMessage`, `exposes:` and `remotes:`. Results are only textual technology mentions already cited in `slides.md`; no implemented registrations, loaders, exposures, lifecycles or contracts were found. The scope does not treat PDF/image pixels as executable code. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Zero frontend application targets in the inventory. The material referenced in `README.md:5–12` is a deck; the six MFEs mentioned in `slides.md:353–362` are external-architecture content, not units present or referenced by executable composition configuration. |
| Q2 | No | There are no units with their own entries/builds. Deckset and Excalidraw are presentation tools (`README.md:9–12`), not MFE application builds; no application manifest or source was found. |
| Q3 | No | There is no implemented host/root. The orchestrator appears as subject and image in `slides.md:342–349`; there is no code loading, mounting or routing applications in this snapshot. |
| Q4 | No | Module Federation, single-spa and SystemJS appear in notes/slides (`slides.md:45–46`, `slides.md:445`, `slides.md:462–478`), without executable configuration or consumption. There is no own iframe/link/postMessage contract. |
| Q5 | No | The set demonstrates a presentation about MFE, without phenomenon implementation in the candidate (`README.md:5–12`, `slides.md:333–362`). Q5 follows Q1–Q4, without override. |

## Rationale

- Proposed `Non-MFE`, Q1–Q5 No. This directly corresponds to exclusion of a repository discussing MFE without implementing it and final precedent 023 for slides.
- Talk applications, technologies and diagrams do not count as Q1 units. Nor is the PDF/deck counted as a corpus application; `frontend_units: 0`, `ui_technologies: []`, `build_tools: []` and `approaches: []` follow the criterion applied to presentation material.
- It is not MFE-unit: there is no own unit prepared for an external host; therefore Q2–Q4 are No, without using Undetermined because of absence of the external system described in the talk.
- There is no open platform plugin, code-sharing, package composition, iframe/link or faulty-execution question. Presentation recommendations and conceptual examples were promoted neither to methodological rules nor observed implementation.

## Analysis notes

- **RQ1 (sampling):** the candidate entered through the repository terminology searches recorded above. Name, description and terms in the deck are metadata/thematic content; none alone confirms implemented architecture.
- **Protocol (families/templates):** searches in annotations for `maxgallo` and `five years after` found no previously annotated sibling. Case `docs/mfe-classification/023-arunkumarsubburaj__mfe_slide_dev.md` is analogous as a presentation, but uses Slidev, whereas this material points to Deckset/Excalidraw. There is no evidence of a common template or shared ancestry.
- **Protocol (inspection):** 58 regular files, zero symlinks/gitlinks and eight reachable commits were checked, without expanding dependencies or querying the network. Markdown was the talk’s textual source; the PDF version was inventoried, without confusing it with implementation or requiring redundant extraction to support Q1–Q5. Applications, builds or presentation tools were not run.

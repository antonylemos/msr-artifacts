---
schema: 1
id: 490787580
full_name: gorillaworkout/gorillaworkout
url: https://github.com/gorillaworkout/gorillaworkout
commit: e8b828415f8fbc3212042bdd9cd081aeaea9c3d7
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

# 115 — gorillaworkout/gorillaworkout

## Context

Personal Markdown/HTML profile/portfolio: introduction of Bayu Darmawan, professional work, links to external projects, technologies, statistics and contacts (`README.md:1–16`; `README.md:27–34`). Reported ESMX work (`README.md:14`) and link to an MFE demo (`README.md:33`) are neither code nor candidate composition configuration. Repository name was not used to infer its type or architecture.

## Sample provenance

- Rank 115, ID, identity and strategy `terminology`: `data/samples/mfe-sample-001/sample.csv:116`. Clone, branch `main` and SHA checked in `data/samples/mfe-sample-001/clones.csv:116`. The sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:4158` and `data/discovery/mfe-round-002/candidates.csv:4161` record eligibility `pass` in both, description `Gorillaworkout portfoliom`, empty topics, null language/license, `fork: false` and last push `2026-02-26T06:45:45Z`.
- `sqlite3 -readonly` query of databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits`, `queries` and `subqueries`, by `repository_id=490787580`: both record the same two hits, strategy `terminology`, endpoint `repositories`, empty `path` and `partition_label: created:2022-05`.

| Query | Spelling of `q` | Subquery | Spelling of `q_effective` |
|---|---|---|---|
| `terminology-micro-frontend-repositories` | `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2022-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2022-05-01..2022-05-31` |
| `terminology-micro-frontends-repositories` | `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2022-05` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2022-05-01..2022-05-31` |

Values of `fetched_at`, in order of the two rows, are `2026-10-07T22:17:26.274Z` and `2026-10-07T22:47:40.607Z` in round 001; `2026-10-08T15:52:24.335Z` and `2026-10-08T16:04:06.905Z` in round 002. SQLite identifiers receive no artificial text lines.

By elimination, name and description lack searched terms, and topics are empty. In README, exact spellings are `micro-frontend architectures` (`README.md:14`) and `ESMX micro-frontend demo` (`README.md:33`), hyphenated and singular. Queries use spaces and include a plural variant; no literal plural appears in these excerpts. Hits are compatible with README retrieval, without identifying exact excerpt/normalization or confirming MFE implementation.

README at the SHA **is not later than searches**: HEAD merges portfolio at `2026-02-26T13:45:45+07:00` (`2026-02-26T06:45:45Z`). Last file-modifying commit shown by `git log --name-status -- README.md`, `96039ce5d18491c32e94b9808b84ec5ced6c9421`, is from `2026-02-26T06:45:12Z`; both predate October collections. Chronology was checked through metadata, without reading historical blob.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: one regular file, mode 100644, `README.md`; zero symlinks and zero gitlinks. No sources, manifests, lockfiles, application entries, build/composition configs, submodules or vendored dependencies. Zero units follows from an entirely observable tree, not lack of access. Git inventory has no artificial textual code lines. | contrary |
| Documentation | The person introduces himself and reports professional work (`README.md:1–16`). “Building micro-frontend architectures with ESMX framework” (`README.md:14`) is a profile statement, without executable configuration. | context |
| Composition / Documentation | Project table is a portfolio of external links (`README.md:29–34`). MySuperApp is described as an ESMX demo with React/Vue in one SPA (`README.md:33`), but no sources, remotes, configuration entry URLs, lifecycles or candidate host loading it exist. A portfolio link is not a unit reference through composition configuration. Destinations were not accessed. | contrary |
| Technology | Next.js, React, Vue, TypeScript and Docker appear as project technologies or badges (`README.md:31–34`; `README.md:44–66`). Without candidate code or manifest using them, they do not populate `ui_technologies`, `build_tools` or `approaches`. ESMX is not counted for an isolated mention. | weak |
| Source code / Composition | Images, statistics and contact links are introductory content (`README.md:4–5`; `README.md:79–97`; `README.md:102–116`). GitHub Markdown rendering implements no frontend unit, nor integration contract between applications. | context |
| Technology / Configuration / Build/deploy | Complete inventory searched for npm/workspace manifests, HTML/JS/TS entries, Webpack/Vite/Rspack/ESMX/federation configs, import maps and build/deploy scripts: nonexistent. README text search for `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap`, imports/exports and `require(`: no results. No remotes ↔ exposes ↔ consumption chain or unit prepared for an external host exists. | absent |
| Source code (boundaries) | Active search `git grep -n -F -e '../../' -e '../../../'` across entire SHA tree: no results. Absence of sources and unit boundaries confirmed by inventory, without using absent imports as positive proof of independence. | absent |
| Documentation / History | Complete README reading and inventory: no ADR or additional architectural documentation. Metadata record profile/portfolio maintenance, without application code in snapshot. | context |

## Authorship and history

Metadata at the SHA: 11 reachable commits, one merge, one root commit `8d662a748cb2e12588ff38d4767108fa9b4c5bd0`, non-shallow clone. Ten commits record author `Bayu Darmawan` and committer `GitHub`; one records `gorillaworkout` in both. Neither equivalence between identities nor intellectual authorship of external software described in profile is presumed.

`git log --no-renames --name-status -- README.md`, always with `GIT_NO_LAZY_FETCH=1`, shows README addition at root, from 10/05/2022, and subsequent document revisions. `96039ce5d18491c32e94b9808b84ec5ced6c9421` modifies profile/projects on 26/02/2026; HEAD is merge “Update portfolio: active projects & tech stack (#2)” that same day. No object was missing in these queries; no historical blob was necessary.

Refs `main`, `origin/main` and `origin/HEAD` point to evaluated SHA. `origin/update-portfolio-readme` points to `96039ce5d18491c32e94b9808b84ec5ced6c9421`; only ref metadata were recorded, without reading alternative-branch content. No code folders exist for per-unit import/authorship analysis. Authorship of profile commits does not prove authorship or architecture of external sites.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Zero units after complete inventory of one README. Professional report and portfolio links are neither implementation nor composition configuration (`README.md:14`; `README.md:29–34`). |
| Q2 | No | No units with their own entries/builds or sources to compare. Technologies are described in text (`README.md:31–34`), without corresponding tree projects. Complete relative-import search is negative. |
| Q3 | No | Document offers introductory external links; no host loads, mounts or routes units (`README.md:29–34`). |
| Q4 | No | ESMX appears as external work/demo technology, not a configured and used candidate mechanism (`README.md:14`; `README.md:33`). No executable composition chain exists. |
| Q5 | No | Personal profile without frontend implementation, consistent with exclusion of MFE mentions without implemented architecture. |

## Rationale

- `Non-MFE`: Q1–Q5 No, without MFE-unit exception. `repo_type: other`, `frontend_units: 0` and `unit_organization: none` follow finals 011/064/068 and personal-profile comparators 073/077/101/111. Zero is an observed count, not `null` for inaccessibility.
- Q1 requires units or references through composition configuration. A portfolio entry describing an MFE demo does not provide this. Q2 requires unit entries/builds and source independence, not absent imports in a document. Q4 requires configured mechanism and actual connection, not framework name or demo link.
- Architecture of MySuperApp or any external destination is not decided. Analyzed object is this profile snapshot. Informative links do not make the profile an MFE host, and case does not depend on adjudicating the general link-composition rule.
- No unit is prepared for an external host, so Q2–Q4 remain No. This is neither unconnectable configuration as in 097/103/104, federation/code sharing as in 089/100, third-party platform/code as discussed in 074/102/080 nor concrete chain as in 076/084/096/106/109.
- Mentioned technologies and projects are README content, not implemented targets; separation of content/actual code in precedents 023/075/081/094/105 prevents adding them. No open decision concerns build time, iframe or execution imperfection.

## Analysis notes

- **RQ1 (families):** searches for `gorillaworkout`, `MySuperApp` and `ESMX` in available annotations found no same-owner sibling or implementation of cited demo. Comparison concerns profiles reporting MFE experience or pointing to external projects, especially 073/111, without asserting common origin.
- **RQ3:** chain is profile → report/external link, without a link to own build, source, entry or composition configuration. Images and badges add no units.
- **Protocol:** queries/subqueries and spellings were preserved; README predates searches. Hyphenated singular mention is not converted into literal plural, nor is a matching excerpt attributed to database beyond its records.

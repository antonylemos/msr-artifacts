---
schema: 1
id: 1249073440
full_name: dobettest-plus/micro-frontend
url: https://github.com/dobettest-plus/micro-frontend
commit: a43b1d3dc4b9394c557c35f171adbbf7a141fac1
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

# 114 — dobettest-plus/micro-frontend

## Context

Repository containing only a two-line README: title `# micro-frontend` (`README.md:1`) and literal text `????? - qiankun ??? + ???` (`README.md:2`). Question marks are ASCII bytes present in blob, not a decoding error in this inspection; presumed content was not reconstructed. The qiankun mention is accompanied by no code, dependency, configuration or executable example.

## Sample provenance

- Rank 114, ID, identity and strategy `terminology`: `data/samples/mfe-sample-001/sample.csv:115`. Clone, branch `main` and SHA checked in `data/samples/mfe-sample-001/clones.csv:115`. The sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:30663` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:30670`, `pass`. Both have literal description `????? - qiankun ??? + ???`, empty topics, null language/license, `fork: false` and last push `2026-05-25T10:21:34Z`. Repository size rounded to zero in metadata does not replace inventory of the present blob.
- `sqlite3 -readonly` query in databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits`, `queries` and `subqueries`, by `repository_id=1249073440`: both have the two hits below, strategy `terminology`, endpoint `repositories`, empty `path` and `partition_label: created:2026-05`.

| Query | Spelling of `q` | Subquery | Spelling of `q_effective` |
|---|---|---|---|
| `terminology-micro-frontend-repositories` | `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2026-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` |
| `terminology-micro-frontends-repositories` | `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2026-05` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` |

Values of `fetched_at`, in order of the two rows, are `2026-10-07T22:35:41.883Z` and `2026-10-07T23:04:31.322Z` in round 001; `2026-10-08T15:59:28.928Z` and `2026-10-08T16:09:08.068Z` in round 002. SQLite identifiers receive no artificial line numbers.

By elimination, description mentions qiankun but not searched terms, and topics are empty. Name and README title contain hyphenated singular form `micro-frontend` (`README.md:1`), whereas queries use spaces and include a plural variant. No literal plural exists in document. Database identifies neither which of the two fields nor which normalization produced each hit; matching is not attributed exclusively to README. Name, mention and thematic retrieval are not implementation evidence.

README at the SHA **is not later than searches**: the sole commit adding it is from `2026-05-25T18:21:33+08:00` (`2026-05-25T10:21:33Z`), before all four October collections. Inspecting historical blobs or other-branch content was unnecessary.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: one regular file mode 100644, `README.md`; zero symlinks and zero gitlinks. No sources, manifests, lockfiles, HTML/JS/TS entries, build configurations, submodules or vendored code. Zero units follows from a completely inventoried tree, not lack of observability. Git inventory has no artificial text lines. | contrary |
| Documentation | `README.md:1` is only a thematic title; `README.md:2` contains name qiankun and literal question marks. The two lines identify no host, concrete units, entry URLs, lifecycle or composition configuration. | weak |
| Technology / Configuration / Source code | Search in the sole file for `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap`, imports/exports and `require(`: sole result is word `qiankun` in `README.md:2`, as prose. No API call, declared dependency or actually configured/used mechanism exists. | absent |
| Source code (boundaries) | Active search `git grep -n -F -e '../../' -e '../../../'` across entire SHA tree: no results. Inventory confirms absence of sources and unit boundaries; this is not positive proof of independence. | absent |
| Build/deploy / Composition | Complete tree searched for npm/workspace manifests, bundler/federation/qiankun configs, import maps, build scripts, application entries and exports/lifecycles: nonexistent. No remotes ↔ exposes ↔ consumption chain or unit prepared for an external host exists. | absent |
| Documentation / History | Complete README reading and inventory: no ADR, additional architecture documentation, exercise code, generator or demonstration. History records only README addition, not architecture implementation. | context |

## Authorship and history

Metadata: a single reachable commit, zero merges, one root commit, all `a43b1d3dc4b9394c557c35f171adbbf7a141fac1` itself; non-shallow clone. Recorded author `Ivan`, committer `GitHub`, message “Initial commit”. `git log --no-renames --name-status -- README.md` confirms addition of `README.md`. All Git commands in clone used `GIT_NO_LAZY_FETCH=1`.

The only observed refs are `main`, `origin/main` and `origin/HEAD`, at the evaluated SHA. No object was missing in queries, nor was a historical blob read. No code folders exist for per-unit attribution; Git identity of document addition proves neither implementation nor authorship of external software. Text generation or third-party import is not inferred without evidence.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Zero units in complete inventory; two lines name only topic/technology (`README.md:1–2`). No configuration references an external unit. |
| Q2 | No | No units with own entries/builds or sources to compare; only README (`README.md:1–2`). Complete relative-import search is negative, without supporting independence. |
| Q3 | No | No host/shell/root config loads, mounts or routes units. README identifies no composition (`README.md:1–2`). |
| Q4 | No | Word qiankun is the sole technological occurrence (`README.md:2`), without dependency, configuration or use. Thus no mechanism actually connects units. |
| Q5 | No | Thematic mention without frontend implementation; characterizes neither MFE nor MFE-unit. |

## Rationale

- `Non-MFE`: Q1–Q5 No, without MFE-unit exception. `repo_type: other` records a minimal initial document, without inferring personal profile, library, executable template or implemented exercise.
- Q1 requires concrete units or composition configuration references; title and mentioned technology supply none. Q2 requires entries/builds and independence between sources; absence of imports alone does not yield Yes. Q4 requires configured and used composition; here even a dependency is absent.
- `frontend_units: 0`, `unit_organization: none` and empty UI/build/approaches follow from complete tree. This is not `null`: content is observable. `qiankun` is not recorded in approaches for an isolated mention.
- Matches exclusion of repositories mentioning microfrontends without implementing them. Finals 023/028 and comparators 075/081/094/105 distinguish content, generators and actually composed software; here even a demo application is absent. Unlike profiles 011/064/068/073/077/101/111, text does not introduce a person, but code absence yields the same architectural result.
- This is neither unconnectable integration as in 097/103/104, code sharing requiring adjudication as in 089/100, third-party distribution/plugin as discussed in 074/102/080 nor host/remotes chain as in 076/084/096/106/109. None of those alternatives is supported by snapshot.
- Without a unit prepared for an external host, Q2–Q4 remain No. No decision remains open about links, iframe, build-time composition or execution imperfection; builds/tests/network were not run.

## Analysis notes

- **RQ1 (families):** searching for `dobettest-plus` in available annotations found no same-owner sibling. Comparison with content cases is methodological, without asserting common origin.
- **RQ1 (misleading signal):** thematic title and qiankun can motivate discovery without any implementation artifact. Characters `?` were preserved according to bytes, without presumed translation or reconstruction.
- **Protocol:** queries/subqueries and spellings were preserved. Name and README are fields compatible with hits, which supply no exact location; README at the SHA predates searches.
- **Protocol (precedent):** most direct comparator is final 030 (`030-jyotithakre05__module-federation.md`): repository with a single "Initial commit", only thematic name, Non-MFE, `other`, 0 units, `none`. It sits alongside 023; 028 is less analogous (library with three units without composition).
- **Protocol ("?" characters):** `?` in `README.md:2` are literal `0x3f` bytes in blob, and description recorded in hits of both rounds already contains the same `?`. Loss of original, probably non-ASCII characters occurred at origin, not in clone or export; content is not reconstructed. `qiankun` appears only as a mention, hence `approaches: []`.

---
schema: 1
id: 144581300
full_name: folio-org/mod-licenses
url: https://github.com/folio-org/mod-licenses
commit: 4c5d99de25a98d305ac07d651433bbc38ffcef85
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 175 — folio-org/mod-licenses

## Context

“FOLIO service module - licenses” (`README.md:1–10`): Grails/Groovy backend service for the FOLIO library platform, with an OpenAPI-documented REST API. The repository contains no frontend. Expression “module-federation” in the README (`README.md:103`) refers to federation of backend module instances (tables `federation_lock`, `app_instance`, `README.md:87–92`), rather than frontend Module Federation. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:176` records rank 175, ID 144581300, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:176` records strategy `technology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:317` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:317` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:<2019-01-01` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:<2019-01-01` | 2026-10-07T23:13:59.494Z / 2026-10-08T16:11:19.454Z |

Hit metadata:
- description “FOLIO service module - licenses”, without the phrase;
- no topics, language Groovy, `fork: false`, size 3,688;
- created at 2018-08-13T13:08:50Z, pushed at 2026-09-24T08:35:19Z.

The hit comes from `README.md:103`, “Since the introduction of module-federation for this module…”, hyphenated and the phrase's only occurrence; phrase search treats the hyphen as a separator. The README's last change is `a000cda` (2026-07-22), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 293 entries, 273 regular `100644` files and 20 executables `100755`; zero symlinks and zero gitlinks. Grails service in `service/` (`grails-app/`, `src/`, `build.gradle`, Gradle and Grails wrappers), OpenAPI documentation in `docs/API/` (134 files), `ramls/`, `scripts/`, `tools/`, `Dockerfile` and Jenkinsfiles. No `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.html` or `.gsp` files. | contrary |
| Documentation (meaning of “federation”) | `README.md:76–92`: Liquibase locks and `mod_licenses__system.federation_lock`, “to facilitate multiple instances accessing the same data”. `README.md:94–106`: connection pool problems and “federated locks” after introducing “module-federation”. Coordination between backend instances. | contrary |
| Configuration | The only `package.json` is `docs/API/config/package.json:1–13`, used to preview and package OpenAPI documentation with `@redocly/cli`. Not a frontend application. | context |
| Search | `git grep -i` at the SHA for `ModuleFederation`, `remoteEntry` and `single-spa`: no results. | absent |

## Authorship and history

Non-shallow clone; 744 commits reachable from the SHA, 165 merges, 29 distinct authors. Main authors are Ian Ibbotson (227, author of root `9b802ba`, 2018-08-13), Steve Osguthorpe (163) and EthanFreestone (97). SHA is `4c5d99d` (2026-08-21, “ci: Gradle workflows -- ERM-4143”). There are 31 remote branches, not considered. `git log -S "module-federation"` on the README did not complete because of a missing blob in the partial clone (`07bce3a5…`), which was not fetched; the clone remained unchanged.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the repository (inventory without UI files). |
| Q2 | No | Without frontend units, there are no entries or builds to assess. |
| Q3 | No | No frontend host, shell or root configuration. |
| Q4 | No | No frontend composition mechanism; “module-federation” denotes federation of backend instances (`README.md:87–106`). |
| Q5 | No | Q1–Q4 are No: backend service captured through homonymy. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. The hit is lexical: “module-federation” with another technical meaning.
- Same false positive type as draft 144 (backend without frontend captured by a homonymous expression, there “single SPA”). `frontend_units: 0` and `unit_organization: none`, as in profiles without frontend (011/064/068/073/077/101/111), although this is production software.
- `repo_type: production`: FOLIO platform service module, with releases and CI. `ui_technologies: []` and `build_tools: []`.
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** “module federation” also names federation of backend instances (distributed FOLIO locks). Technology query `"module federation"` captures this use unrelated to frontend.
- **Protocol (search):** entry only through this query, in partition `created:<2019-01-01`. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent review contribution (Lupa):** full agreement with Non-MFE, Q1–Q5 No, `production`, zero units and `none`; no open decision (`draft`). Occurrence “module-federation” (`README.md:103`, also line 87) explains that introducing federation for the module doubled the system schema connection pool, i.e., coordination of instances and database connections of the FOLIO service, rather than frontend composition. The repository has no `.js`, `.jsx`, `.ts`, `.tsx`, `.vue`, `.html` or `.gsp` files; `docs/API/config/package.json:1–13` configures `@redocly/cli` for OpenAPI specifications and `../../` findings are OpenAPI `$ref`. The clone is partial for blobs: historical search `git log -S'module-federation' -- README.md` fails because of a missing promisor object, limiting only the expression's introduction date. The README (last commit `a000cda`, July 2026) precedes searches. Attribution of the hit to the README is by elimination (name `mod-licenses`, description `FOLIO service module - licenses`, no topics). Final comparables: 030 (name false positive) and 064 (mention without units).

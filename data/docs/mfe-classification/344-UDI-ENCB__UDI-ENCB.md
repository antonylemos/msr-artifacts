---
schema: 1
id: 917305220
full_name: UDI-ENCB/UDI-ENCB
url: https://github.com/UDI-ENCB/UDI-ENCB
commit: 28d311607500d409b68324f572c2fd908dcffba2
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

# 344 — UDI-ENCB/UDI-ENCB

## Context

Documentation repository for an administrative system (description “Config files for my GitHub profile.”, topics `config` and `github-config`). Contains only three files: a `README.md` with general architecture, an SVG diagram and the API gateway `nginx.conf`. The README describes a “microfrontend”: a main container in another repository (`UDI-FRONT`) installing each application as a React component through npm/GitHub and displaying them through `react-router` (`README.md:34`, `203`). None of these frontends is in this repository. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:345` records rank 344, ID 917305220, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access. Example secret values in the README are not reproduced.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:345` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:11430` and `data/discovery/mfe-round-002/candidates.csv:11436`, both with `pass`.

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-01` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:25:45.558Z / 2026-10-08T15:37:14.194Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:06:50.848Z / 2026-10-08T15:46:51.097Z |

The effective queries append `pushed:>=2025-04-01 created:2025-01-01..2025-01-31`.

Hit metadata:
- description “Config files for my GitHub profile.”, topics `config` and `github-config`, null language, `fork: false`, size 22;
- created at 2025-01-15T18:27:54Z, pushed at 2026-04-13T16:42:49Z.

Spelling “microfrontend” is in `README.md:34` (“…se opto por un sistema de "microfrontend".”; English translation: “…a 'microfrontend' system was chosen.”). The plural does not appear literally; this hit depends on GitHub search text processing, which is not recorded. The README is from the only commit (2026-04-13), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 3 entries, all regular files `100644`; zero symlinks and zero gitlinks: `README.md`, `Diagramas/ArquitecturaPrincipal.svg` and `nginx.conf`. There is no frontend code. | contrary |
| Documentation | `README.md:34`: main container in `UDI-FRONT`; each app “se sirve como un componente, este componente es descargado por el contenedor principal y mostrado mediante react router” (English translation: “is served as a component; this component is downloaded by the main container and displayed through react router”). `README.md:52–80`: list of apps and repositories (`UDI-ADMIN-COMUNIDAD`, `ADMIN-CUENTAS-FRONT`, `FRON-APARTADO-AULAS`). `README.md:203–205`: each app is a React component installed through GitHub/npm, in private repositories. | weak |
| Configuration | `nginx.conf:3–55`: `upstream`s and `location /api/...` for three APIs and `location /` serving `/var/www/html`. This is the backend and container static build gateway, not a frontend composition mechanism. | context |

## Authorship and history

Non-shallow clone; a single commit, `28d3116` (2026-04-13, “add documentation”), by “Tzintzun”. Only branch `main` exists. There was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit in the repository; units are cited only in documentation, with no composition configuration referencing them. |
| Q2 | No | Without units in the snapshot, there is no independence to assess. |
| Q3 | No | There is no host, shell or root composition configuration in the repository; the container is in `UDI-FRONT`. |
| Q4 | No | No composition mechanism configured; described integration (npm packages at build time) is not in the snapshot. |
| Q5 | No | Q1–Q4 are No: architecture documentation repository. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”.
- As in finals 023 and 097, diagrams and documentation descriptions do not count as units. Described composition (React components installed through npm) would be close to the open build-time composition decision, but there is no code or configuration in this snapshot to assess it.
- **Fields:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ2:** documented architecture (container `UDI-FRONT` + apps as private npm packages routed through `react-router`) would be build-time composition. No other `UDI-ENCB/*` repository appears in `candidates.csv` from either round; cited repositories were not inspected.
- **Protocol (search):** the plural hit has no literal spelling. Eligibility `pass` in both rounds.

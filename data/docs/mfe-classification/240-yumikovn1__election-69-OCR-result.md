---
schema: 1
id: 1173586650
full_name: yumikovn1/election-69-OCR-result
url: https://github.com/yumikovn1/election-69-OCR-result
commit: ed014fd0e1c36fe5da5fe064260a942e2cb070ea
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

# 240 — yumikovn1/election-69-OCR-result

## Context

Open dataset: official results of the 2026 Thai election, extracted through OCR from Electoral Commission PDFs and structured as JSON (`README.md:1–5`). The content is almost entirely data (`data/matched/`, `data/ocr-output/`, `data/csv/`), plus an extensive README and an image. There is no code or frontend application. The only connection to the topic is `microfrontends` in the repository metadata. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:241` records rank 240, ID 1173586650, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:241` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:25906` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:25913` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery / effective query | Collection 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontends`: `topic:microfrontends` | `terminology-topic-microfrontends` / `topic:microfrontends pushed:>=2025-04-01` | 2026-10-07T18:18:43.496Z / 2026-10-08T15:34:28.993Z |

Hit metadata:
- description “Provide structured, machine-readable JSON of the official 2026 Thai election results extracted via OCR from Election Commission PDFs.”;
- topics `microfrontends`, `continuous-delivery`, `ocr`, `open-data`, `election-data` and others;
- null language, `fork: false`, size 2.650;
- created at 2026-03-05T14:31:21Z;
- pushed at 2026-10-06T06:03:02Z in round 001 and 2026-10-08T14:45:34Z in round 002.

The README contains neither “micro”, “frontend” nor “federation”. Entry is due only to the topic declared on GitHub.

SHA `ed014fd` (2026-10-12, “Update README.md”) postdates both collections and changes only the README. The earlier README version is `c0eb8bc` (2026-03-07). Because entry came from the topic, rather than README text, the change does not affect provenance.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 1.599 entries, all regular files `100644`; zero symlinks and zero gitlinks. There are 1.590 JSON files in `data/matched/` and `data/ocr-output/`, 3 CSVs in `data/csv/`, a ZIP, a `REMOVED_WRONG_PDF` marker, `assets/ect-announcement.jpeg`, `README.md`, `.gitignore` and a `.DS_Store`. There is no code, manifest or configuration. | contrary |
| Documentation | `README.md:1–25`: dataset description, disclaimer in English and Thai and quality issues in the source PDFs. | contrary |
| Metadata | Topic `microfrontends` without a content match; other topics (`continuous-delivery`, `geospatial`, `shapefile`) also have no corresponding artifact. | weak |
| Search | `git grep -i` in `README.md` for `micro`, `federation` and `frontend`: no occurrences. | absent |

## Authorship and history

Non-shallow clone; 29 linear commits, no merges. There are 26 by Chanon Ngerntongdee `<killernay@gmail.com>` and 3 by yumikovn1, from 2026-02-21 (`60f0c97`, “first commit”) to 2026-10-12 (SHA `ed014fd`). Data and README commits predate repository creation on GitHub (2026-03-05), indicating history was uploaded later. No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend unit; the repository has only data. |
| Q2 | No | Without units, there are no entry points or builds. |
| Q3 | No | There is no host, shell or root configuration. |
| Q4 | No | No composition mechanism; the term appears only as a topic. |
| Q5 | No | Q1–Q4 are No: open data repository with an unrelated topic. |

## Rationale

- `Non-MFE` under the rule “at least one question is No”. It matches “repositories mentioning micro-frontends without implementing them”, here only through the topic.
- Repository without implementation, as in profiles 011/064/068/073/077/101/111: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` and `build_tools: []`.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** topic `microfrontends` applied to an open dataset without code; the topic query captures labels unrelated to the content.
- **Protocol (snapshot):** the SHA in `clones.csv` postdates the collections, but changes only the README, which was not the source of the match.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

---
schema: 1
id: 990440505
full_name: ai-robotics-estonia/Testing_AI_algorithms_for_automatic_extraction_and_application_of_guitar_effects_to_enable_products
url: https://github.com/ai-robotics-estonia/Testing_AI_algorithms_for_automatic_extraction_and_application_of_guitar_effects_to_enable_products
commit: 9795d0886221f04366d246c4f66f09e0c12ac55d
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
approaches: []
ui_technologies: [gradio]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 217 — ai-robotics-estonia/Testing_AI_algorithms_for_automatic_extraction_and_application_of_guitar_effects_to_enable_products

## Context

“Blind Extraction and Modelling of Guitar Effects” (`README.md:1–9`): demonstration project (Noise Machine OÜ company, TalTech team, Dec/2024–Apr/2025) with three-block audio AI pipeline:
- stem separation through HT Demucs (`block1/`);
- effect removal (`block2/`);
- effect modeling through GCNTF (`block3/`).

One Python Gradio interface (`app.py`). Models, audio, PDF and images are Git LFS pointers (`.gitattributes:1–6`). Search retrieval comes from phrase “serves as the frontend, orchestrating calls to backend Python scripts” (`README.md:138`), not frontend orchestration. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:218` records rank 217, ID 990440505, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, execution, LFS download or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:218` records strategy `broader` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:14370` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:14376` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same hit in each round, at endpoint `repositories` and with empty `path`:

| Query (`q`) | Subquery / effective query | Collection 001 / 002 (UTC) |
|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2025-Q2` / `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2025-04-01..2025-06-30` | 2026-10-07T23:40:41.203Z / 2026-10-08T16:23:48.452Z |

Hit metadata:
- null description, no topics, Python language, `fork: false`, size 49;
- creation at 2025-05-26T05:55:45Z, push at 2025-06-26T08:59:23Z.

Literal spelling “frontend orchestration” is absent. Closest excerpt is `README.md:138`, “The Gradio application (`app.py`) serves as the frontend, orchestrating calls to backend Python scripts…”, and “orchestrates” appears in `:113`. Retrieval depends on unrecorded GitHub search text processing (stemming and punctuation).

Last README change is SHA itself, `9795d08` (2025-06-26), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 41 entries, all regular files `100644`; zero symlinks and zero gitlinks. Python code (`app.py`, `block1/`, `block2/`, `block3/gcntf/`, `utils/`), conda environments (`env.yaml`, `env_cuda.yaml`) and LFS pointers (`Report.pdf`, `diagram.png`, `.wav`, `.pt`, `.th`, `.onnx`). No `package.json`, HTML or JavaScript. | contrary |
| Source code | `app.py:8`, `14–17`, `279`: one `gr.Blocks` application importing wrappers of three blocks. Single Python interface calling local functions. | contrary |
| Documentation | `README.md:113`, `121`, `138`: Gradio application is “the frontend”, orchestrating backend-script calls. Processing-step orchestration, not frontend units. | contrary |
| Search | `git grep -i` at the SHA for `micro.?front`, `federation`, `single.?spa` and `orchestrat`: only cited README lines. | absent |

## Authorship and history

Non-shallow clone; 4 commits, no merge:
- `60f7dab` (2025-05-26, “Initial commit”): by DmitriDerevjanko through web interface, with `LICENSE` and `README.md`;
- `0c8fc00` and `0096f26` (2025-06-26): by Andrei Gužovski `<anguzo@taltech.ee>`, add gitignore/LFS, report, README and code;
- SHA `9795d08` (2025-06-26, “Update README.md”): by katreeljas through web interface.

No historical blob was read, and LFS objects were not downloaded.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Single interface (Gradio, `app.py:279`); no other frontend unit referenced. |
| Q2 | No | No second unit exists whose independence could be evaluated. |
| Q3 | No | No host composes units; `app.py` calls local Python functions. |
| Q4 | No | No composition mechanism; “orchestrating” describes script calls (`README.md:138`). |
| Q5 | No | Q1–Q4 are No: audio AI pipeline with Gradio UI, retrieved through broad query. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Retrieval is lexical, as draft 178 and previous cases of query `"frontend orchestration"`: “frontend” orchestrating backend or tool calls.
- `frontend_units: 1`, `unit_organization: single-unit` (Gradio interface), `ui_technologies: [gradio]`, `build_tools: []` (no bundler), `repo_type: other` (R&D demonstration project).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** broad query `"frontend orchestration"` captures “serves as the frontend, orchestrating calls” in Python project without own web frontend.
- **Protocol (search):** searched spelling is not literal. Eligibility changes from `unknown` (001) to `pass` (002).
- **Protocol (snapshot):** LFS binary artifacts remain pointers in clone.

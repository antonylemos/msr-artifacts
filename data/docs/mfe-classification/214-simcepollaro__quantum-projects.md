---
schema: 1
id: 1408914785
full_name: simcepollaro/quantum-projects
url: https://github.com/simcepollaro/quantum-projects
commit: 21c54ed2315b39d4ed66f5cbaf32bc6f011061bf
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

# 214 — simcepollaro/quantum-projects

## Context

Quantum-computing projects with Qiskit (`README.md:1–4`). Own content is a Python script (`QEC_test.py`, quantum-error correction in Bell pairs), four figures, `README.md`, `LICENSE` and `.gitignore`. Repository also versions entire Python virtual environment (`quantum/`, with `pyvenv.cfg`) including JupyterLab. JupyterLab `package.json` within environment is retrieval origin. No own frontend code exists. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:215` records rank 214, ID 1408914785, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:215` records strategy `technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:38550` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:38588` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same hit in each round, at endpoint `code`:

| Query (`q`) | Subquery / effective query | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `technology-module-federation-package-code#size:>=10000` / `"@module-federation" filename:package.json size:>=10000` | `quantum/share/jupyter/lab/static/package.json` | 2026-10-07T21:13:18.193Z / 2026-10-08T15:44:29.580Z |

File is 14.693 bytes at SHA, within range. Manifest is `@jupyterlab/application-top` (`:2`) with `"@module-federation/runtime-tools": "^2.0.0"` in `devDependencies` (`:211`), same third-party manifest as draft 205. Entered in `69b22f5` (2026-10-07T22:43:35+02:00, or 20:43:35Z), about half an hour before round 001 collection, unchanged afterward.

Code-hit metadata provide only description “Some examples of quantum computing project with qiskit”, without topics or dates, and lacking term. Entry is code-only. README (`README.md:1–4`) mentions neither micro-frontends nor Module Federation.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 597 entries, including 545 regular files `100644`, 48 executables `100755` (scripts in `quantum/bin/`) and 4 symlinks `120000` (`quantum/bin/python` → `/usr/bin/python`, `python3` and `python3.12` → `python`, `quantum/lib64` → `lib`); zero gitlinks. Only 8 entries lie outside `quantum/`: `QEC_test.py`, four PNGs, `README.md`, `LICENSE` and `.gitignore`. All 4 `package.json` are in `quantum/`. | contrary |
| Source code | `QEC_test.py`: Qiskit script. No `.js`, `.ts`, `.vue` or `.html` file outside `quantum/`. | contrary |
| Technology (hit) | `quantum/share/jupyter/lab/static/package.json:2`, `211`: development dependency of JupyterLab’s own build, third-party code installed in virtual environment. Not configuration of this project. | contrary |
| Search | `git grep -i` at the SHA, excluding `quantum/`, for `micro.?front` and `federation`: no occurrence. | absent |

## Authorship and history

Non-shallow clone; 5 linear commits, no merge, all by Simone Cepollaro `<sim.cepollaro@gmail.com>` (two as `simcepollaro` through web interface), between 2026-10-07 and 2026-10-08:
- `26d6173`: “Initial commit”, with README, LICENSE and `.gitignore`;
- `69b22f5`: adds script and 589 files in `quantum/`;
- `df752a3`: changes README;
- `e90118b`: adds `N_Bell.py`;
- SHA `21c54ed` (2026-10-08T01:09:09Z): renames `N_Bell.py` to `QEC_test.py`.

SHA is later than collection 001 and earlier than 002, but matched file did not change between them. No historical blob was read and no object was missing.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No own frontend unit; code is a Python script. |
| Q2 | No | Without units, no frontend entries or builds require evaluation. |
| Q3 | No | No host, shell or root configuration exists. |
| Q4 | No | Sole signal is dependency declared in vendored JupyterLab manifest (`quantum/share/jupyter/lab/static/package.json:211`); “a declared dependency alone is No”, and it does not even belong to project. |
| Q5 | No | Q1–Q4 are No: Qiskit project with versioned virtual environment. |

## Rationale

- `Non-MFE` under rule “at least one question is No”. Same case as draft 205: third-party code (JupyterLab) inside versioned virtual environment, unrelated to project. Unlike 102/074/080, where third-party platform hosted units.
- `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`, `repo_type: other` (personal study projects, `README.md:3`).
- No decision remains open.

## Analysis notes

- **RQ1 (misleading signals):** second sample case (with 205) of JupyterLab `@module-federation/runtime-tools` in versioned virtual environment matching code search for `package.json`.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002). Repository was created and matched on same day as collection 001.

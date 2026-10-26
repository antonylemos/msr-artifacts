---
schema: 1
id: 1267284042
full_name: Byron2306/EdgeK-BEAST
url: https://github.com/Byron2306/EdgeK-BEAST
commit: 320bb1f48d84a59353d5252687fb305dfa06b166
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 071 — Byron2306/EdgeK-BEAST

## Context

- **Repository type:** production-oriented / research (governance layer for coding agents through MCP + desktop IDE; 32,864 files)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:5-12`: "BEAST - Auditable, Governed AI Editing via MCP and Gateway… governance layer for coding agents and editor clients"; no mention of micro-frontends | context |
| Structure | `app/` (Python kernel), `desktop-ide/` (desktop IDE: `main/`, `renderer/`, `extensions/`, plus tracked `.bundle-build/` and `.beast-python-tools/`), `benchmarks/`, `evidence/`, `seeds/`, dozens of phase reports | contrary |
| Technology (third-party MF) | `desktop-ide/.beast-python-tools/jupyterlab/staging/webpack.config.js`, `…/labextensions/@jupyter-notebook/lab-extension/static/remoteEntry.*.js`, `…/galata-extension/static/remoteEntry.*.js`: JupyterLab vendored in an embedded Python environment, using Module Federation as its extension system (vendored third-party technology) | context |
| Source code (false positive) | `app/kernel/compute/forge_kv_hf_official.py:17`: `"RemoteEntryNotFoundError"` (Hugging Face Hub library exception) | context |
| Source code (project-authored, frontend) | `desktop-ide/renderer/` and `desktop-ide/main/`: desktop IDE (Electron); no federation configuration, `remotes`/`exposes` or unit composition | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No composed project-authored frontend units; the desktop IDE is a single application |
| Q2 | No | No units to compare |
| Q3 | No | No host, shell or root config composing units |
| Q4 | No | The `remoteEntry.js` files are extension builds from vendored JupyterLab (third-party dependency), not composition configured by the author |
| Q5 | No | Q1–Q4 converge |

## Rationale

- The repository does not implement micro-frontends. Module Federation signals come from a JupyterLab copy (with its MF-based extension system) packaged in the IDE's Python environment, and from a Hugging Face exception name.
- By analogy with the platform plugin rule (010, 022, 035, 037): MF as a third-party platform extension mechanism (JupyterLab), here not even used by the author, only vendored.

## Analysis notes

- **RQ1 (misleading signals):** vendored dependencies (Python environments, `site-packages`, tracked build bundles) introduce `remoteEntry.js` and `webpack.config.js` with MF into the repository; content searches should exclude dependency and build directories.

---
schema: 1
id: 694120665
full_name: y-a-v-a/msaada
url: https://github.com/y-a-v-a/msaada
commit: cd1d32896272fbe9e56f384339e7fee1865d9a57
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
  date: 2026-10-14
---

# 005 — y-a-v-a/msaada

## Context

- **Repository type:** production-oriented application (CLI tool with releases)
- **Assessed commit:** `cd1d328` (HEAD of the default branch; release `v0.3.1` exists, but the result does not change)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `Cargo.toml:2-7`: Rust crate `msaada`, "Serve a directory as document root over a given port. This is a development tool."; `:17-38`: `actix-web`, `actix-files`, `actix-cors`. No `package.json` or frontend dependency. | absent |
| Source code | Search for `micro-front`, `federation`, `single-spa`, `customElements`, `web component` and `composition` with no occurrences | absent |
| Source code | `src/spa.rs:9-57`: `simple_spa_handler` provides route fallback to `index.html` (server-side SPA support) | context |
| Structure | `src/index_template.html`, `style_template.css` and `main_template.js` are static templates embedded through `include_str!` (`src/main.rs:554-556`) for the `--init` command; they are not a frontend application | contrary |
| Build/deploy | `.github/workflows/release.yaml` publishes binaries; no frontend build | context |
| Documentation | `README.md:9-11`: "A slick, simple HTTP server for local web development"; no mention of micro-frontends | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | No frontend units; the repository is an HTTP server in Rust (`Cargo.toml:2-7`) |
| Q2 | No | No units to assess |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- The repository contains no frontend application. It is a static file server for local development, written in Rust.
- Under the protocol's automatic filtering criteria (section 3.2), this repository would fit "repositories containing no relevant frontend implementation". Under the checklist, all answers are No.
- "SPA Support" (`README.md:17`, `src/spa.rs`) is server-side routing fallback, not frontend composition.

## Analysis notes

- **RQ1 (misleading signals):** no MFE term appears in the repository. It was probably captured through broad terms (e.g., SPA, frontend, serve) during discovery; the originating query in `discovery.sqlite` should be checked.

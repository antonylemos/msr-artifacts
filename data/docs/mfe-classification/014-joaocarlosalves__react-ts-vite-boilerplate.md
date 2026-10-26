---
schema: 1
id: 1023904818
full_name: joaocarlosalves/react-ts-vite-boilerplate
url: https://github.com/joaocarlosalves/react-ts-vite-boilerplate
commit: 8b86f8496f6404e2ab6b4e89d5da81ce316e3028
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 014 — joaocarlosalves/react-ts-vite-boilerplate

## Context

- **Repository type:** template (React + TypeScript + Vite boilerplate, "STILL IN PROGRESS", `README.md:3-5`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json:14-22`: React 19, React Router, Jest, Babel, testing-library; no MFE dependency | absent |
| Configuration | `vite.config.ts:9-17`: only `@vitejs/plugin-react` and test coverage; no federation, `build.lib` or multiple entries | absent |
| Source code | `src/main.tsx:3-16`: a single `createRoot` with `BrowserRouter`; pages and layout (`src/pages/`, `src/layout/`) imported statically | contrary |
| Source code | No occurrences of `federation`, `single-spa`, `customElements` or `remoteEntry` | absent |
| Structure | A single app (one `package.json`, one `index.html`, one entry) | contrary |
| Documentation | `README.md:24`: "micro frontend" appears only in the author's bio among professional skills | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`src/main.tsx:15`) |
| Q2 | No | No units to compare |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is React SPA boilerplate; nothing in it prepares a unit for composition, so the MFE-unit exception does not apply.
- Matches "conventional frontend monoliths" and "repositories mentioning micro-frontends without implementing them": the term appears only in the author's bio (`README.md:24`).

## Analysis notes

- **RQ1 (misleading signals):** as in repository 011, the term comes from the professional self-description in the README, not the project.

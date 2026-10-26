---
schema: 1
id: 1274976133
full_name: naman8033/hack2skill
url: https://github.com/naman8033/hack2skill
commit: 11ea6f0c338364ef8398cdadaf1df97c831f6435
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 047 — naman8033/hack2skill

## Context

- **Repository type:** example/proof of concept ("Smart Cooking Planner" hackathon project, deployed on Vercel)
- **Assessed commit:** `11ea6f0` (only commit)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json`: React + Vite; no MFE dependency | absent |
| Configuration | `vite.config.js:5-7`: only `@vitejs/plugin-react` | absent |
| Source code | `src/main.jsx:6`: a single `createRoot`; components in `src/components/` imported by `src/App.jsx`; `src/services/geminiService.js` calls the Gemini API | contrary |
| Structure | A single app (one `package.json`, one entry, one `vercel.json`) | contrary |
| Documentation | `README.md:3`: "production-ready React **micro-app**"; no mention of micro-frontends | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`src/main.jsx:6`) |
| Q2 | No | No units to compare |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is a monolithic React hackathon SPA.
- "micro-app" (`README.md:3`) means a small app, not the architecture. Same case as repository 003 (bitebudget), which uses the same expression.
- Matches "conventional frontend monoliths".

## Analysis notes

- **RQ1 (misleading signals):** "micro-app" in READMEs for small AI-generated apps (Gemini) recurs (003, 047); probably captured through broad terms.

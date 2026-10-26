---
schema: 1
id: 1274987236
full_name: Aprameya-C-V/bitebudget
url: https://github.com/Aprameya-C-V/bitebudget
commit: e20162fcd808b03f78fb397e6b660841cce4d0c3
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 003 — Aprameya-C-V/bitebudget

## Context

Full-stack app deployed on Vercel/Render: a React SPA served by an Express server that also proxies the Gemini API.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json`: React 19, Vite, Tailwind, Express, `@google/genai`, `motion`; no Module Federation, single-spa or Web Components dependency | absent |
| Source code | Search for `micro-front`, `federation`, `single-spa`, `customElements`, `remoteEntry`, `import(` and `lazy(`: no occurrences | absent |
| Structure | A single `package.json` at the root and a single entry point (`src/main.tsx:6`, `createRoot(...).render`) | contrary |
| Source code (internal composition) | `src/App.tsx:3-7`: the five components (`ScheduleInput`, `FridgeScanner`, `MealPlanViewer`, `SubstitutionsPanel`, `CookTodo`) are statically imported from `./components`, as in a monolith | contrary |
| Structure (backend) | `server.ts:239-247`: Express serves the SPA (Vite middleware in development, `express.static` in production) and proxies the Gemini API; `api/index.ts` is the Vercel serverless adapter. It is not a frontend unit. | context |
| Build/deploy | `package.json:8`: a single build (`vite build` + `esbuild server.ts`); `vercel.json`: rewrites only for `/api` and SPA fallback to `/index.html` | contrary |
| Documentation | `README.md:3`: "full-stack AI micro-app"; no description of a micro-frontends architecture | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`src/main.tsx:6`); no composition configuration referencing external units |
| Q2 | No | No units to compare; components share entry, build and deployment and are imported directly (`src/App.tsx:3-7`) |
| Q3 | No | No host, shell or root config loading units |
| Q4 | No | No composition mechanism configured or declared |
| Q5 | No | Q1–Q4 converge |

## Rationale

- All answers are No, so the repository is Non-MFE. The MFE-unit exception does not apply: the single unit is not prepared for composition by an external host (no `exposes`, exported lifecycles or mounting contract).
- Matches the case "conventional frontend monoliths": a SPA with internal components composed through static imports.
- "micro-app" (`README.md:3`) means a small app, not the architecture. Even if it were an MFE claim, documentation is insufficient without corroboration in code.

## Analysis notes

- **RQ1:** misleading signal; the term "micro-app" is a likely reason the repository entered the candidate pool through broad terms.

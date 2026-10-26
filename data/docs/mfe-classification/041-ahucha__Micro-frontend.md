---
schema: 1
id: 1192728522
full_name: ahucha/Micro-frontend
url: https://github.com/ahucha/Micro-frontend
commit: 72c6f439b29b8e3b47e79b1b3ba0e8fe77a790a6
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 041 — ahucha/Micro-frontend

## Context

- **Repository type:** example/proof of concept (instructional exercise "PixelArena - Checkpoint 1 : Le Bug du Lobby" [English translation: "PixelArena - Checkpoint 1: The Lobby Bug"], `README.md:1`)
- **Assessed commit:** `72c6f43` (only commit)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:1-37`: exercise where the student changes the Lobby button's color; `:41-46` asks whether the other buttons also changed "e por quê" [English translation: "and why"]; `:55-62` labels each CSS with an "Equipe" [English translation: "Team"] (Navbar, Lobby, Leaderboard) | context |
| Structure | A single React app: `src/App.jsx` and three components in `src/components/` (`Navbar`, `Lobby`, `Leaderboard`) | contrary |
| Configuration | `webpack.config.js:1-40`: webpack with Babel, CSS and `HtmlWebpackPlugin`; no `ModuleFederationPlugin`; `package.json` without MFE dependencies | absent |
| Source code | `src/index.js:5-6` a single `createRoot`; `src/App.jsx:2-4` statically imports `Navbar`, `Lobby` and `Leaderboard` | contrary |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`src/index.js:5`) |
| Q2 | No | The "teams" are directly imported components (`App.jsx:2-4`), with one build |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is the starting point of a micro-frontends exercise: a React monolith where global CSS from different "teams" collides (the bug the student must discover), probably to motivate separation into MFEs in later checkpoints.
- The repository name ("Micro-frontend") reflects the course topic, not the implementation.
- Matches "conventional frontend monoliths" and "repositories mentioning micro-frontends without implementing them".

## Analysis notes

- **RQ1 (misleading signals):** the term is in the repository name; the content is the instructional "before" of an MFE migration.

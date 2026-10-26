---
schema: 1
id: 1373391675
full_name: thimadera/thimadera.github.io
url: https://github.com/thimadera/thimadera.github.io
commit: 52c2f80cd40faefcadcd54f94a1518325bb1d5a4
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 032 — thimadera/thimadera.github.io

## Context

- **Repository type:** production-oriented (personal/portfolio site on GitHub Pages, `.github/workflows/deploy.yml`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | `package.json`: React + Vite + Tailwind; no MFE dependency | absent |
| Configuration | `vite.config.ts:1-20`: React, Tailwind and a local SEO plugin (`seoHtml`); no federation | absent |
| Source code | `src/main.tsx:8`: a single `createRoot`; portfolio sections (`src/components/{Hero,About,Experience,Projects,…}.tsx`) imported by `src/App.tsx` | contrary |
| Structure | A single app (one `package.json`, one entry); `posts/*.html` are static blog pages | contrary |
| Documentation (content) | `README.md:21` "Microfrontends (single-spa)" as a skill; `linkedin-about.md:1,9`; `src/data/experience.ts:39-40,53-54` and `src/i18n/translations.ts:100,201` describe the author's professional experience on a portal of "20+ Angular microfrontends" with single-spa | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`src/main.tsx:8`) |
| Q2 | No | No units to compare |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is a monolithic React portfolio site.
- "microfrontends"/"single-spa" appear as the author's résumé data (experience on another, private project), not as this repository's architecture.
- Matches "conventional frontend monoliths" and "repositories mentioning micro-frontends without implementing them".

## Analysis notes

- **RQ1 (misleading signals):** same pattern as repositories 011, 014 and 019, here with the term also in source code (`src/data/experience.ts`, `src/i18n/translations.ts`) as textual content, misleading code searches.

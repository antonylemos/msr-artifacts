---
schema: 1
id: 992844774
full_name: FaduxD/brain-agro
url: https://github.com/FaduxD/brain-agro
commit: 64e626686c86268bfd856cd9e28f8ba472a3977a
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

# 024 — FaduxD/brain-agro

## Context

- **Repository type:** example/proof of concept ("Brain Agriculture" technical test, `README.md:3`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `client/` (React + Vite SPA) and `server/` (NestJS + Prisma); a single frontend unit | contrary |
| Technology | No MFE dependency in `client/package.json` | absent |
| Configuration | `client/vite.config.ts:5-23`: only `@vitejs/plugin-react`, `/api` proxy and icon alias; no federation | absent |
| Source code | `client/src/main.tsx:15-22`: a single `createRoot` with `Router` (`client/src/router.tsx`); `home`, `dashboard` and `management` pages imported internally | contrary |
| Source code | No occurrences of `federation`, `single-spa`, `customElements` or `remoteEntry` | absent |
| Documentation | `README.md:70`: "Estruture o projeto como um microfrontend (opcional);" [English translation: "Structure the project as a microfrontend (optional);"] in the technical test instructions (optional requirement, not implemented) | weak |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`client/src/main.tsx:15`) |
| Q2 | No | No units to compare |
| Q3 | No | No host, shell or root config |
| Q4 | No | No composition mechanism |
| Q5 | No | Q1–Q4 converge |

## Rationale

- The frontend is a monolithic React SPA with a NestJS backend.
- "microfrontend" appears only in the technical test instructions as an optional requirement (`README.md:70`), which the candidate did not implement.
- Matches "conventional frontend monoliths" and "repositories mentioning micro-frontends without implementing them".

## Analysis notes

- **RQ1 (misleading signals):** the term comes from the test instructions copied into the README (third-party text), not an author's decision. Technical test instructions may appear frequently in the sample.

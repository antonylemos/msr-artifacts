---
schema: 1
id: 1342735218
full_name: portable-genai/operational-resilience-mapping
url: https://github.com/portable-genai/operational-resilience-mapping
commit: 39502428edc71341641d7cdf7eda4557d3a0aa3a
classification: Non-MFE
checklist: { q1: no, q2: yes, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 036 — portable-genai/operational-resilience-mapping

## Context

- **Repository type:** template (Python backend service "scaffolded from the catalog commons", with a `rename_fork.py` script for forks and `make drop-ui` to remove the UI)
- **Classification:** Non-MFE (depends on the unresolved decision about iframe; alternative: MFE-unit)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | The repository is primarily a hexagonal Python service (`src/operational_resilience_mapping/`, `tests/`, `infra/terraform/`, `eval/`); `ui/` is a single optional Next.js app | contrary |
| Documentation | `README.md:80-84` "`ui/` is a Next.js micro-frontend that runs standalone or embeds in a client application"; `ui/README.md:1-5` "embeds into a client's existing web application as an iframe"; `ui/package.json:6` "Embeddable micro-frontend…"; `ARCHITECTURE.md:50`, `AGENTS.md:59` | weak |
| Configuration (embedding) | `ui/lib/embed-policy.mjs:14-21,172-193,325-349`: `frame-ancestors` allowlist (`UI_FRAME_ANCESTORS`), consistent `X-Frame-Options` and CORS per tenant (`:205-230`, `UI_TENANT_ORIGINS`); `ui/proxy.ts:12` applies the headers (allows embedding) | moderate |
| Source code (contract with the host) | `ui/README.md:142-150`: to embed, register the parent's origin and use `<iframe src="…">`; "The host page passes no identity. That is the design". No `postMessage`, `window.parent`, navigation registration or host props in `ui/app` or `ui/lib` (isolated iframe) | absent |
| Composition | No host in the repository; the "client's existing web application" is generic/hypothetical (`https://portal.client.example`) | absent |
| Build/deploy | `.github/workflows/gate.yaml:44`: `ui-check` in the CI gate; `infra/terraform/production_edge.tf:18`: "the micro-frontend ships no Dockerfile" | weak |
| Technology | No MFE dependency in `ui/package.json` | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (`ui/`); no composition configuration references other units |
| Q2 | Yes (for this unit) | Next.js with its own build, separate from the Python service |
| Q3 | No | No identifiable host, either in the repository or by reference; the parent is any client application that registers |
| Q4 | No | The only mechanism is a generic iframe without a host contract (`ui/README.md:147-150`); this is embedding permission, not configured composition |
| Q5 | No | Q1, Q3 and Q4 converge |

## Rationale

- The "micro-frontend" here is an iframe-embeddable console for a backend service: the app only permits embedding (framing allowlist and CORS) and has no integration contract with any specific host.
- Unlike repository 031 (MFE-unit), where the app had a named shell (`j26-app`), navigation registration consumed by the shell and a `postMessage` protocol. Under the rule suggested in 031 ("iframe counts when there is an explicit host contract; an isolated iframe does not count"), this case is excluded.
- Matches "repositories mentioning micro-frontends without implementing them": the term describes the embeddable UI, but there is no composition of units.

## Analysis notes

- **RQ1 (misleading signals):** "micro-frontend" used for "iframe-embeddable UI" in template-generated backend service repositories.

## Point for joint review

- If the iframe decision is permissive (any unit prepared for iframe counts), the case becomes **MFE-unit**, since embedding preparation is explicit and tested (`ui/tests/embed-policy.test.mjs`).
- The 031 × 036 distinction is a good pair for calibrating the iframe rule.

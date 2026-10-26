---
schema: 1
id: 1145306346
full_name: issueset/astro-react-19-hook-issue2
url: https://github.com/issueset/astro-react-19-hook-issue2
commit: f229f38065bc24ad660216843305306500d4c003
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [astro, preact, react, solid, svelte, vue]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 026 — issueset/astro-react-19-hook-issue2

## Context

- **Repository type:** example/proof of concept (bug reproduction, named "…-hook-issue2", based on Astro's official `framework-multiple` template)
- **Assessed commit:** `f229f38` (only commit, "init")

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Documentation | `README.md:1` "Kitchen Sink: Microfrontends with Astro"; `:3-5` generated through `npm create astro@latest -- --template framework-multiple`; `:11` "showcases Astro's built-in support for multiple frameworks" | context |
| Technology | `package.json:2` `@example/framework-multiple`; `:13-22` integrations `@astrojs/{preact,react,solid-js,svelte,vue}` | weak |
| Configuration | `astro.config.mjs:13-19`: all five framework integrations in a single Astro project (multi-framework) | moderate |
| Source code | `src/pages/index.astro:5-11` statically imports one counter per framework from `src/components/<framework>/`; `:27-40` renders each as an island (`client:visible`) | ambiguous |
| Structure | A single project (one `package.json`, one Astro build); components are files within the same `src/` | contrary |
| Build/deploy | A single build; `.codesandbox/Dockerfile` only for the sandbox | contrary |
| History | A single commit | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | A single frontend unit (Astro project); counters are components, not units with their own entry or build |
| Q2 | No | Components share a build and are imported directly (`index.astro:5-11`) |
| Q3 | No | The page imports components; it does not load, mount or route independent units |
| Q4 | No | Astro islands with multiple frameworks are build-time component composition within one app, not a mechanism connecting independent units |
| Q5 | No | Q1–Q4 converge |

## Rationale

- This is Astro's official "framework-multiple" template, copied to reproduce a bug (React 19 hooks). The title "Microfrontends with Astro" belongs to the template.
- Mixing frameworks on the same page (islands) does not make components relatively independent units: they have no entry, build or deployment of their own.
- Matches "conventional frontend monoliths" and "repositories mentioning micro-frontends without implementing them".

## Analysis notes

- **RQ1 (misleading signals):** multi-framework ≠ MFE. Having React, Vue, Svelte, Solid and Preact on the same page resembles MFE heterogeneity, but it is a single unit with one build.
- **Protocol (duplicates):** issue-reproduction repositories based on official templates tend to repeat the same content (the name suggests an "issue1" exists). It is worth checking whether other template clones are in the sample.

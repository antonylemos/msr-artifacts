---
schema: 1
id: 1028839722
full_name: mrgleam/mf-tanstack-demo
url: https://github.com/mrgleam/mf-tanstack-demo
commit: a7175973b0594cecfd32126b0bb65e71c627a6c3
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 045 — mrgleam/mf-tanstack-demo

## Context

- **Implementation approach:** Module Federation (`@originjs/vite-plugin-federation`) with TanStack Router route composition; Kong gateway for routing
- **Repository type:** example/proof of concept ("demo", `README.md:1`)

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `shell/` (host) and `shop/` (remote), each with `package.json`, `vite.config.ts`, `index.html` and `src/main.tsx`; `kong-shell/` and `kong-remote/` with gateway configs (`README.md:5-11`) | strong |
| Configuration (host) | `shell/vite.config.ts:8-13`: `federation({ remotes: { shop: 'http://localhost:3001/shop/assets/remoteEntry.js' }, shared: [react, react-dom, @tanstack/react-router] })` | strong |
| Configuration (remote) | `shop/vite.config.ts:6-14`: `base: '/shop/'`, `federation({ name: 'shop', filename: 'remoteEntry.js', exposes: { './ShopRoutes': './src/routes/ShopRoutes.tsx' } })` | strong |
| Source code (loading) | `shell/src/moduleLoader.ts:26-81`: loader with cache, retries and fallback; `:127-136`: `MODULE_CONFIGS.shop` with `import('shop/ShopRoutes')` and fallback `{ routes: [] }` | strong |
| Source code (composition) | `shell/src/router.tsx:53-92`: loads configured modules and grafts remote routes (`shopRoutes`) into the shell's route tree (`replaceParentRoute(modules.shopRoutes, root)`) | strong |
| Configuration (gateway) | `kong-remote/kong.yml:3-12`: `/` → shell (3000), `/shop` → shop (3001); `kong-shell/kong.yml:4-8`: only `/` → shell (layout controlled by the shell) | moderate |
| Source code | No source code imports between `shell` and `shop` (supports the units' independence) | absent |
| Documentation | `README.md:1` "Microfrontend Monorepo with Vite, TanStack Router, and Module Federation"; `:7-10` host, remote and gateway roles | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `shell` and `shop` |
| Q2 | Yes | Their own entry, `vite.config.ts` and dev server (3000/3001); no source code imports between apps |
| Q3 | Yes | The shell grafts `shop` routes into its router (`router.tsx:53-92`) |
| Q4 | Yes | `remotes`/`exposes` configured and used through `import('shop/ShopRoutes')` (`moduleLoader.ts:130`) |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "monorepos containing a host and its remotes".

## Analysis notes

- **RQ3:** the remote exposes **routes** (not a component), and the host integrates them into the TanStack Router tree, a routing-level composition.
- **RQ3 (resilience):** loader with retry and fallback (`moduleLoader.ts`) if the remote is unavailable, an artifact showing concern for deployment independence.
- **RQ3 (gateway):** the two Kong configs show two access modes: remote through the shell (`kong-shell`) or also standalone (`kong-remote`).

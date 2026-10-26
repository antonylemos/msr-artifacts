---
schema: 1
id: 1098119003
full_name: Vishal-Kamra/Microfrontend-examples
url: https://github.com/Vishal-Kamra/Microfrontend-examples
commit: eeb848822ba0bad3549c04a36f5c9dfb72ae7fe8
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 007 — Vishal-Kamra/Microfrontend-examples

## Context

- **Implementation approach:** Module Federation (webpack 5 `ModuleFederationPlugin`) with a `mount(el)` contract exported by remotes
- **Repository type:** example/proof of concept (named "Microfrontend-examples", two instructional examples, no README)
- **Assessed commit:** `eeb8488` (the repository's only commit)

## Observed evidence

The repository contains two independent examples, `simple-js/` and `react-js/`. Under the protocol (section 3.1), both examples count as observations of the same repository implementation, not as separate implementations.

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure (`simple-js`) | Three units, `Container/`, `Products/` and `Cart/`, each with its own `package.json`, `webpack.config.js`, `public/index.html` and `src/index.js` | strong |
| Configuration (`simple-js`, host) | `simple-js/Container/webpack.config.js:10-15`: `name: "container"`, `remotes` for `products@…:8081/remoteEntry.js` and `cart@…:8082/remoteEntry.js` | strong |
| Configuration (`simple-js`, remotes) | `simple-js/Products/webpack.config.js:10-16` exposes `./ProductsIndex`; `simple-js/Cart/webpack.config.js:10-16` exposes `./CartShow`; both with singleton `shared` for `@faker-js/faker` | strong |
| Source code (`simple-js`) | `simple-js/Container/src/index.js:1` `import('./bootstrap')`; `simple-js/Container/src/bootstrap.js:1-5` imports `mount` from `products/ProductsIndex` and `cart/CartShow` and mounts into the `#dev-products` and `#dev-cart` elements (`public/index.html:9-10`) | strong |
| Source code (`simple-js`) | `simple-js/Products/src/bootstrap.js:3` and `simple-js/Cart/src/bootstrap.js:3` export `mount(el)`; `:14-18` / `:10-14` mount independently in development | strong |
| Structure (`react-js`) | `container/` and `marketing/` are complete; `auth/` and `dashboard/` (Vue) have only `package.json`, without code or config (partial) | strong |
| Configuration (`react-js`) | `react-js/container/config/webpack.dev.js:19-25`: `remotes: { marketing }`; `react-js/marketing/config/webpack.dev.js:19-26`: exposes `./MarketingApp`; `shared: packageJson.dependencies` | strong |
| Source code (`react-js`) | `react-js/container/src/components/MarketingApp.js:3-12` imports `mount` from `marketing/MarketingApp` and mounts through `useRef`/`useEffect`; `react-js/container/src/App.js:8` renders `<MarketingApp />`; `react-js/marketing/src/bootstrap.js:6-22` exports `mount` | strong |
| Build/deploy | `react-js/*/config/webpack.prod.js` files are empty; no CI/CD, Dockerfile or hosting config. Only development servers on distinct ports (8080/8081/8082). | weak |
| Source code | No unit directly imports another's source code; everything goes through MF (supports the units' independence) | absent |
| Documentation | No README | absent |
| History | A single commit | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | `simple-js`: `Container`, `Products` and `Cart`; `react-js`: `container` and `marketing` |
| Q2 | Yes | Each unit has its own entry, `webpack.config` and dev server; no source code imports between units. There is no independent deployment, but the checklist requires only their own entry and build. |
| Q3 | Yes | The container mounts remotes on the same page (`simple-js/Container/src/bootstrap.js:4-5`; `react-js/container/src/App.js:8`) |
| Q4 | Yes | MF configured on both sides (`remotes`/`exposes`) and used through remote module imports (`bootstrap.js:1-2`, `MarketingApp.js:3`) |
| Q5 | Yes | Q1–Q4 converge; no discrepancy to justify |

## Rationale

- Q1–Q5 are all Yes, satisfying the MFE-implemented rule.
- Matches "examples, templates, and proofs of concept that actually compose frontend units" and "monorepos containing a host and its remotes" (twice).
- The `react-js` example is incomplete (`auth` and `dashboard` are only manifests, and production configs are empty), but `container` + `marketing` already satisfy the checklist. `simple-js` is complete.

## Analysis notes

- **RQ1:** evidence comes entirely from configuration and code; there is no documentation, deployment or history. This is a typical instructional example using the `mount(el)` + asynchronous `bootstrap` pattern.
- **RQ2:** `dashboard/package.json` declares Vue 3, indicating the intention of a multi-framework example (React + Vue), but without implementation in the snapshot; it does not count as hybrid.

---
schema: 1
id: 1147094315
full_name: DoniaMahmoud/react-microfrontend
url: https://github.com/DoniaMahmoud/react-microfrontend
commit: adc0ef9de42ce63b3082f8297d0146b59ac0d612
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vanilla]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 330 — DoniaMahmoud/react-microfrontend

## Context

Teaching example of Module Federation in plain JavaScript: a `container` (host) and two remotes, `products` and `cart`, generating HTML with fake data (`faker`). Same structure as final 007’s `simple-js` example (container/products/cart, ports 8080/8081/8082, `mount(el)`). There is no README in the tree, and no React in the snapshot. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:331` records rank 330, ID 1147094315, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:331` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:24227` (`terminology`, `unknown`) and `data/discovery/mfe-round-002/candidates.csv:24234` (`terminology`, `pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns one hit per round, from endpoint `repositories` and with an empty `path`:

| Query (`q`) | Subquery | Effective query | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-02` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-02-01..2026-02-28` | 2026-10-07T19:59:51.558Z / 2026-10-08T15:41:15.380Z |

Hit metadata (identical in both rounds): null description, no topics, language JavaScript, `fork: false`, size 57, created at 2026-02-01T07:15:27Z, pushed at 2026-02-01T08:25:38Z.

**Spelling:** there is no README in the snapshot (`git ls-tree -r` without `README*`) and description is null. Spelling `microfrontend` exists only in the repository name, covered by `in:name`. The name explains sample entry, but is not architectural evidence. Without a README, there is no line to cite or README date question; the SHA (2026-02-01T10:25:24+02:00) predates collections.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 20 entries, all regular files `100644`; zero symlinks and zero gitlinks. Three projects, `container/`, `products/` and `cart/`, each with `package.json`, lockfile, `webpack.config.js`, `public/index.html` and `src/index.js` + `src/bootstrap.js`; plus `.gitignore` and a `.DS_Store`. | context |
| Configuration (host) | `container/webpack.config.js:10–16`: `ModuleFederationPlugin({ name: "container", remotes: { products: "products@http://localhost:8081/remoteEntry.js", cart: "cart@http://localhost:8082/remoteEntry.js" } })`; `:6–8`: port 8080. | strong |
| Configuration (remotes) | `products/webpack.config.js:10–16`: `name: "products"`, `filename: "remoteEntry.js"`, `exposes: { "./ProductsIndex": "./src/bootstrap" }`, `shared: ["faker"]`; port 8081 (`:6–8`). `cart/webpack.config.js:10–16`: `name: "cart"`, `exposes: { "./CartShow": "./src/bootstrap" }`, `shared: ["faker"]`; port 8082 (`:6–8`). | strong |
| Source code (composition) | `container/src/index.js:2` → `container/src/bootstrap.js:1–2`: `import { mount as mountProducts } from "products/ProductsIndex"` and `import { mount as mountCart } from "cart/CartShow"`; `:6–7`: mounts each in `#my-products` and `#my-cart` (`container/public/index.html:5–6`). | strong |
| Source code (remotes) | `products/src/bootstrap.js:4–13`, `:26` and `cart/src/bootstrap.js:3–6`, `:15`: export `mount(el)`, writing HTML into the received element; `products/src/bootstrap.js:17–25` and `cart/src/bootstrap.js:8–13`: standalone mounting in development. | strong |
| Configuration (chain match) | Names `products`/`cart`, modules `ProductsIndex`/`CartShow` and host ports 8081/8082 match remote `name`, `exposes` and `devServer.port`. | strong |
| Source code (boundaries) | Active relative import search: only `import("./bootstrap")` within each project; the host accesses remotes only through federated modules. No source code import between units. | context |
| Build/deploy | Each project has its own `package.json` with `webpack serve` (`container/package.json:6–8`; `products/package.json:6–8`; `cart/package.json:6–8`). Only development mode (`mode: "development"` in all three `webpack.config.js:5`); no deployment configured. | moderate |

## Authorship and history

Non-shallow and partial clone (`blob:none`). There are 3 commits (3 across all refs), no merges, all by `DoniaMahmoud <donia1999mahmoud@gmail.com>` as author and committer, on 2026-02-01:
- `9c0bdef`, “Add basic configs of microfrontend apps and host”;
- `6b01d5d`, “Use faker library as shared dependency between remote apps”;
- SHA `adc0ef9`, “Refactor remote apps to be used in isolation”.

`git rev-list --objects $SHA --missing=print` lists 9 missing objects, none in the SHA tree.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units, `container`, `products` and `cart`, the remotes referenced in host `remotes` (`container/webpack.config.js:12–15`). |
| Q2 | Yes | Each unit has its own entry point, HTML, webpack configuration, port and `package.json`; no source code import between them (recorded search). |
| Q3 | Yes | The host mounts both remotes on the same page (`container/src/bootstrap.js:6–7`; `container/public/index.html:5–6`). |
| Q4 | Yes | Module Federation configured on both sides, with matching names, modules and ports, and consumption through `import { mount } from "products/ProductsIndex"` / `"cart/CartShow"` (`container/src/bootstrap.js:1–2`). |
| Q5 | Yes | Q1–Q4 converge. |

## Rationale

- `MFE-implemented`: Q1–Q5 Yes. It matches “examples… that actually compose frontend units” and “monorepos containing a host and its remotes”.
- Same chain and structure as final 007’s `simple-js` (and draft 106’s `ecomm/` example): host with `remotes`, remotes with `mount(el)` mounted in page elements.
- This is not code sharing (089/100): each remote exposes a mounting function for a page fragment with its own data. Shared `faker` is a dependency, not the composition mechanism.
- This is not an unconnectable chain (097/103/104).
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [module-federation]`, `build_tools: [webpack]`, `repo_type: example`. `ui_technologies: [vanilla]`: plain JavaScript with `innerHTML`, without UI framework; React in the name is not in the code.
- There is no open decision.

## Analysis notes

- **RQ1 (misleading signals):** the repository name cites React, but code is plain JavaScript; only the name matched search (there is no README or description).
- **Protocol (families/duplicates):** container/products/cart structure with `faker` is the course material also present in final 007 (`simple-js`) and draft 106 (`ecomm/`). Course examples appear repeatedly in the sample as independent repositories.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

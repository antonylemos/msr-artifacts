---
schema: 1
id: 977924934
full_name: narendra814/micronew2
url: https://github.com/narendra814/micronew2
commit: cd856ad01781d18a3248819fb27fb866277c85f6
classification: Uncertain
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: undetermined }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 242 — narendra814/micronew2

## Context

The snapshot has only two files:
- `README.md`, written as a message (“Subject: Micro-Frontend Demo Application… Dear Team… Best regards, [Your Name]”, `README.md:1–68`);
- `micro.rar`, a compressed archive.

The README describes a demo with three micro-frontends, `container` (shell), `products` and `cart` (`README.md:9–12`). Code exists only inside the RAR. To inspect it, the blob was read from the Git object and listed and extracted to standard output with `bsdtar`, without writing files. The archive contains `micro-frontend-demo/` with the three webpack 5 + Module Federation projects and a root `package.json`. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:243` records rank 242, ID 977924934, status `cloned`, branch `main` and the front matter commit, which is the HEAD of the clone and of `origin/main`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. There was no installation, build, execution, extraction to disk or network access.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:243` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID appears in `data/discovery/mfe-round-001/candidates.csv:13658` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:13664` (`pass`).

A `sqlite3 -readonly` query against tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2025-05` and an empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:21:34.178Z / 2026-10-08T15:54:11.457Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:52:58.133Z / 2026-10-08T16:05:37.452Z |

The effective queries append `pushed:>=2025-04-01 created:2025-05-01..2025-05-31`.

Hit metadata:
- null description, no topics, null language, `fork: false`, size 179;
- created at 2025-05-05T07:35:37Z, pushed at 2025-05-05T07:41:02Z.

Spellings in the README:
- “Micro-Frontend”: `README.md:1`;
- “micro-frontend”: `README.md:5`;
- “micro-frontends”: `README.md:9–10`.

The README comes from SHA `cd856ad` (2025-05-05, “Create README.md”), before the October 2026 collections. The README at the SHA does not postdate the searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 2 entries, `README.md` and `micro.rar` (182.210 bytes, signature `Rar!`), both `100644`; zero symlinks and zero gitlinks. There is no source code versioned as files. | ambiguous |
| Archive content | RAR listing: `micro-frontend-demo/{container,products,cart}/` with `package.json`, `package-lock.json`, `webpack.config.js`, `public/index.html` and `src/` (`index.js` → `bootstrap.js`), `micro-frontend-demo/start.js`, and `package.json` and `package-lock.json` at the root (April/May 2025 dates). | context |
| Configuration (host, in RAR) | `micro-frontend-demo/container/webpack.config.js:34–41`: `ModuleFederationPlugin({ name: 'container', remotes: { products: 'products@http://localhost:8081/remoteEntry.js', cart: 'cart@http://localhost:8082/remoteEntry.js' } })`; port 8090 (`:11`). | strong, conditional on the archive |
| Configuration (remotes, in RAR) | `micro-frontend-demo/products/webpack.config.js:33–40`: `name: 'products'`, `exposes: { './ProductsApp': './src/bootstrap' }`, port 8081. `micro-frontend-demo/cart/webpack.config.js:33–40`: `name: 'cart'`, `./CartApp`, port 8082. | strong, conditional on the archive |
| Source code (composition, in RAR) | `micro-frontend-demo/container/src/components/ProductsApp.js:1–20` and `CartApp.js:1–21`: `import { mount } from 'products/ProductsApp'` / `'cart/CartApp'` and `mount(ref.current, { … })`, passing cart callbacks. `container/src/App.js:56–59`: routes `/` and `/cart`. `products/src/bootstrap.js:6–26`: exported `mount`. | strong, conditional on the archive |
| Documentation | `README.md:50–53`: ports 3000/3001/3002, differing from the archive configurations (8090/8081/8082). `README.md:18–20`: “Concurrently package”; `start.js` opens terminals only on Windows. | ambiguous |

## Authorship and history

Non-shallow clone; 2 commits, no merges, by narendra814 (noreply) through the web interface, on 2025-05-05: `b9fe010` (“Add files via upload”, the RAR) and SHA `cd856ad` (“Create README.md”). Relative imports between projects could not be searched with `git grep` because the code is compressed; in the cited files read, the only import is `../App` within `container` itself (`ProductsApp.js:3`). No historical blob was read and there was no missing object.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three units inside the archive, two referenced by the container composition configuration (`container/webpack.config.js:36–39`). |
| Q2 | Yes | Each project in the archive has its own `package.json`, `webpack.config.js` and port; in the files read, there are no code imports between projects. |
| Q3 | Yes | The container mounts the remotes by route (`container/src/App.js:56–59`). |
| Q4 | Yes | Module Federation with `remotes` and `exposes`, consumed through `import { mount }` (`ProductsApp.js:2`, `10–12`). |
| Q5 | Undetermined | The chain is complete, but only inside a compressed archive versioned as a binary; the repository does not version the source code as files. |

## Rationale

- Proposed `Uncertain`: Q1–Q4 would be Yes based on RAR content, but Q5 remains Undetermined, with explicit justification and `status: review`.
- If archive content counts as “in the repository”, the case is the course pattern from 174/177/197/216 (container with remote `mount`) and becomes `MFE-implemented`, a complete chain as in 076/084/096/106/109.
- If it does not count, the repository has only a message-style README and a binary. It would resemble cases without observable implementation and become `Non-MFE`.
- **Fields:** based on archive content, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example`.

## Analysis notes

- **Protocol (mining):** code is inside `micro.rar`; acquisition and file-based mining would not see it without extraction.
- **RQ1 (misleading signals):** email-style README with placeholder “[Your Name]”, with ports differing from those configured.
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Retained as `Uncertain`. The RAR contains a complete Module Federation chain, but the repository does not version this code as observable source files; it presents only a binary and a README with conflicting information. This inadequate form of distribution prevents promoting the implementation.

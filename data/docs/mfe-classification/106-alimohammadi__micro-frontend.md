---
schema: 1
id: 971885751
full_name: alimohammadi/micro-frontend
url: https://github.com/alimohammadi/micro-frontend
commit: 7a05f74105f816f60621d9ba9171b269aa8e5cab
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
  date: 2026-10-23
---

# 106 — alimohammadi/micro-frontend

## Context

Two federated composition examples: `ecomm/` contains container, products and cart in JavaScript/DOM; `packages/` contains container and Marketing in React. Each example composes its own application. Following final precedent 007, the repository’s two examples are recorded together, with five concrete targets; this does not assert that all five participate in a single global application. `packages/auth` and `packages/dashboard` contain only manifests/lockfiles, without entries, configurations or code, and are not additional units.

## Sample provenance

- Rank, ID and strategy `terminology`: `data/samples/mfe-sample-001/sample.csv:107`. Clone, branch `main` and SHA match `data/samples/mfe-sample-001/clones.csv:107`. Sample origin in round 002: `data/samples/mfe-sample-001/manifest.json:2–5`.
- `data/discovery/mfe-round-001/candidates.csv:13377` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:13382`, `pass`. Both record description `Repository for microfrontend course source code`, empty topics, JavaScript language, null license and `fork: false`.
- Read-only queries of databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits` and `queries` and filtering `repository_id=971885751`: both rounds record the same four strategy `terminology` hits, endpoint `repositories`, without file paths. Exact spellings:
  - `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme`;
  - `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme`;
  - `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme`;
  - `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme`.
- The entire README is line `# micro-frontend` (`README.md:1`), hyphenated and singular. Description contains `microfrontend`, joined and singular. By elimination, topics do not explain retrieval; name/README contain the hyphenated form and description contains the joined form. Hits identify neither the exact field nor search-engine normalization. There is no literal plural in README, nor are all hits attributed to it. The name is retrieval context, without architectural confirmatory value; classification below relies on configuration and code consumption.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 50 regular files, all mode 100644; zero symlinks and zero gitlinks. Twenty files in `ecomm/`, 27 in `packages/` and three at root. No versioned `node_modules` or submodules. Two `ecomm/products/dist/` files are build output, not another unit. Git-tree counts, without artificial line numbers. | context |
| Structure / Build/deploy | `ecomm/container`, `ecomm/products` and `ecomm/cart` have their own manifests, lockfiles, `src/index.js`, HTML and `webpack.config.js`. Their `webpack serve` scripts trigger local builds (`ecomm/container/package.json:5–7`; `ecomm/products/package.json:5–7`; `ecomm/cart/package.json:5–7`). Default `src/index.js` entries exist and asynchronously import bootstrap/mount (`ecomm/container/src/index.js:1`; `ecomm/products/src/index.js:1`; `ecomm/cart/src/index.js:1`). | strong |
| Configuration / Composition (ecomm) | The host configures `products` → `products@http://localhost:8081/remoteEntry.js` and alias `carts` → `cart@http://localhost:8082/remoteEntry.js` (`ecomm/container/webpack.config.js:18–23`). Providers match: `products`, port 8081, file `remoteEntry.js`, `./ProductsIndex` → `./src/mount.js` (`ecomm/products/webpack.config.js:6–16`); `cart`, port 8082, `./CartShow` → `./src/mount` (`ecomm/cart/webpack.config.js:6–15`). Plural alias `carts` in the consumer correctly points to singular remote container `cart`. | strong |
| Source code (ecomm) | The host imports named `mount` exports from `products/ProductsIndex` and `carts/CartShow` and calls them with elements `#my-products` and `#my-cart` (`ecomm/container/src/bootstrap.js:1–6`). Both elements exist (`ecomm/container/public/index.html:8–11`). Products exports `mount(el)` and writes the list into the element (`ecomm/products/src/mount.js:5–12`; `ecomm/products/src/mount.js:31`); cart exports `mount(el)` and writes its panel (`ecomm/cart/src/mount.js:3–7`; `ecomm/cart/src/mount.js:26`). The received contract is a DOM element, exactly what the host passes. | strong |
| Source code / Build/deploy (isolation) | Remotes also mount independently in development when their local element exists (`ecomm/products/src/mount.js:19–23`; `ecomm/products/public/index.html:9`; `ecomm/cart/src/mount.js:14–18`; `ecomm/cart/public/index.html:9`). This distinguishes composition from a mere function library, despite small examples and Faker use for fictitious data. | strong |
| Structure / Build/deploy (React) | `packages/container` and `packages/marketing` have their own sources, entries, HTML, manifests, lockfiles and Webpack configs. Start/build explicitly indicate development/production configs (`packages/container/package.json:4–6`; `packages/marketing/package.json:4–6`). Common configuration applies Babel/React (`packages/container/config/webpack.common.js:4–17`; `packages/marketing/config/webpack.common.js:2–15`). | strong |
| Configuration / Composition (React) | The host configures `marketing@http://localhost:8081/remoteEntry.js` (`packages/container/config/webpack.dev.js:16–22`); the remote is named `marketing`, publishes `remoteEntry.js` and exposes `./MarketingApp` → `./src/bootstrap` (`packages/marketing/config/webpack.dev.js:17–23`). Indicated common files, manifests, HTML and sources exist. | strong |
| Source code (React) | The adapter imports `{ mount }` from `marketing/MarketingApp`, passes `ref.current` in the effect and renders the corresponding div (`packages/container/src/components/MarketingApp.js:1–12`). The host renders the adapter (`packages/container/src/App.js:3–11`). The remote exports the same `mount(el)` and executes `ReactDom.render(<App />, el)` (`packages/marketing/src/bootstrap.js:1–17`); there is no export-name or argument mismatch between provider and consumer. | strong |
| Source code (application unit) | Marketing contains an application with its own Landing/Pricing pages and router (`packages/marketing/src/App.js:1–20`), plus conditional standalone bootstrap (`packages/marketing/src/bootstrap.js:9–13`) and local element (`packages/marketing/public/index.html:9`). The exposed mount initializes that application, not merely a button/hook. Host bootstrap mounts its own App in `#root` (`packages/container/src/bootstrap.js:1–5`; `packages/container/public/index.html:9`). | strong |
| Technology / Build/deploy | CommonJS configs are consistent with manifests without `type: module`. The five manifests declare dependencies used by configurations, and their respective lockfiles contain all these packages. Examples: Webpack 5.99.6 in ecomm (`ecomm/cart/package-lock.json:6869–6874`; `ecomm/products/package-lock.json:6869–6874`; `ecomm/container/package-lock.json:6852–6857`) and 5.99.7 in React (`packages/container/package-lock.json:10064–10069`; `packages/marketing/package-lock.json:10064–10069`). CLI 4.10 and dev-server 3.11 have peers compatible with Webpack 5, according to lockfiles. React/ReactDOM 17 are declared and pinned (`packages/marketing/package.json:11–13`; `packages/marketing/package-lock.json:7781–7799`). Static resolution check; installation/build/server were not run. | moderate |
| Configuration / Build/deploy (limits) | Both examples reuse ports 8080/8081 and must be considered separately. React production has configs and depends on `PRODUCTION_DOMAIN` in the host (`packages/container/config/webpack.prod.js:6–20`); no configured value was found in the snapshot. This limits the production deployment claim, without undoing the complete development chain. Incorrect `name` `container` in the products manifest (`ecomm/products/package.json:2`) does not change explicit federated name `products`. | context |
| Structure / Technology | Inventory of `packages/auth/` and `packages/dashboard/`: only `package.json` and lockfile, without code, entry, HTML or build configuration. React/Vue dependencies in those manifests (`packages/auth/package.json:7–12`; `packages/dashboard/package.json:7–12`) do not confirm implemented units. Vue does not enter `ui_technologies`. | absent |
| Source code / Composition | Inspection of source imports of all five targets and search for relative imports crossing into `products/cart/marketing/container/src`: no direct access to another unit’s sources; observed connections use MF. Text search in textual SHA files, excluding lockfiles and `ecomm/products/dist/`, for `single-spa`, `registerApplication`, `qiankun`, `wujie`, `customElements`, `postMessage` and `iframe`: no results. No additional approach is supported. | absent |
| Documentation | README contains only the title (`README.md:1`). Inventory of 50 paths: no ADR or other Markdown/architecture document, nor project generator. Classification does not depend on descriptive documentation. | context |

## Authorship and history

Metadata at the pinned SHA: 13 reachable commits, zero merges, one root commit `de130a50a2b7c406234a22c394cbfa37216522a4`, non-shallow clone. All record author and committer `Ali Mohammadi`, between 24/04/2025 and 08/05/2025. The only refs are `main`, `origin/main` and `origin/HEAD`, all at the evaluated SHA.

`git log --no-renames --name-status` by folder, with `GIT_NO_LAZY_FETCH=1`, shows incremental evolution. In `ecomm/`, the root commit adds container/products; `ff27de28f7d8deacde1c62ffe10d11e4b8f5ad38` modifies container configuration and adds its bootstrap; `3817fd66df866586efa8a539e1603d26d9c4c1a3` adds cart; `a8c742c5439831109aab630effc092905d6761ec` and `c784f558d5ddd0ca07d92454955d2bbdd96d27f3` add standalone mounts and change consumption/configuration.

In `packages/`, `00dbb64db539caaf22b5701f70f026f70a37a3dc` adds initial manifests; `02977ce34aba29060231547e958ddf30e5801624` adds Marketing code/configuration; `3f24bcd5f430154a88fc1cf9ac841e50d27596ae` adds container; `97d5c5303cb70765ffaba6dae274351cf2737d7e` adds the Marketing adapter and changes both sides of federation; HEAD adds Header and adjusts manifests/configs. No object was missing in these queries; reading historical blobs was unnecessary.

The candidates description identifies course code. Metadata support incremental adaptation under the owner’s identity, but do not prove original authorship of every excerpt. The pattern resembles case 007; direct copying or specific common origin was not established. This is not a vendored third-party folder separate from the target: these sources are the very examples built and composed by candidate manifests and configurations.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three concrete, explicitly connected units in `ecomm/` and two in `packages/`, with sources/entries/configurations; `ecomm/container/webpack.config.js:18–23` and `packages/container/config/webpack.dev.js:16–22` connect their respective remotes. Both examples are aggregated as in final 007, without counting empty manifests. |
| Q2 | Yes | Each target has its own entry and Webpack build; observable scripts and configs, without direct source import from another unit (`ecomm/container/package.json:5–7`; `ecomm/products/package.json:5–7`; `ecomm/cart/package.json:5–7`; `packages/container/package.json:4–6`; `packages/marketing/package.json:4–6`). Q2 requires neither a script literally named build nor proven production deployment: dev-server builds each target. |
| Q3 | Yes | In each example, container mounts its remotes in the same application: products/cart in their own elements (`ecomm/container/src/bootstrap.js:1–6`) and Marketing in the React adapter rendered by host (`packages/container/src/components/MarketingApp.js:1–12`; `packages/container/src/App.js:3–11`). |
| Q4 | Yes | Configuration on both sides and actual source consumption: aliases/names, URLs/ports, exposes, existing destinations and `mount` exports match. `ecomm/products/webpack.config.js:10–16`, `ecomm/cart/webpack.config.js:10–15`, `packages/marketing/config/webpack.dev.js:17–23` and consumers above. This is neither an isolated dependency nor unused configuration. |
| Q5 | Yes | Both chains converge on application composition with own entries/builds. There is no interpretive divergence regarding Q1–Q4; this fits examples that actually compose units. |

## Rationale

- `MFE-implemented`, with Q1–Q5 Yes: monorepo with host/remote examples and code-verifiable integration. Final precedent 007 has practically the same organization and mounting contract, including auth/dashboard still unimplemented. `repo_type: example` matches course code, fictitious data and demonstration pages.
- The count is five, with React only in the two implemented units in `packages/`; the three DOM targets in `ecomm/` imply no additional framework. Faker generates UI data, not frontend projects; the generator-output exclusion of 075/081/105 does not apply. Products dist is a compiled duplicate of the same target, not a sixth unit.
- Unlike 097/103/104, entries, exposed destinations, consumed exports, arguments and mounting elements exist and match; an absent external host is unnecessary to understand the chain. Configs are triggered by scripts or discovered through Webpack defaults, with packages present in lockfiles.
- Unlike the boundary in 089/100, the contract starts units with their own UI and standalone mode, not merely button/hook sharing. Sharing Faker/React through MF is not decisive evidence: mounts and remote consumption are. The chain is comparable to 076/084/096, with a more specific final precedent in 007.
- 074/102 concern third-party distribution/platform; here there is no external platform host, and history records incremental example implementation in the repository itself. As in 080, a third-party dependency or compiled source does not become an additional unit; that does not automatically eliminate adapted course examples.
- Absence of confirmed deployment, a `PRODUCTION_DOMAIN` value, explicit router synchronization or auth/dashboard implementation does not prevent establishing development composition. No concrete impediment was detected in the chain requiring Q4 to be treated as Undetermined. There is no open decision about build-time packages, links or iframes.

## Analysis notes

- **RQ1 (family):** `docs/mfe-classification/007-Vishal-Kamra__Microfrontend-examples.md` records two examples with `ProductsIndex`, `CartShow`, `marketing/MarketingApp`, contract `mount(el)` and the same auth/dashboard placeholders. Similarity indicates an educational implementation family, not identical commits or proven provenance. Searches for these identifiers and course references found no other sibling in consulted annotations.
- **RQ2:** Module Federation composition with asynchronous bootstrap and explicit DOM mounting; React is internal to Marketing/container in the second example. Internal navigation links are not the integration mechanism between units.
- **RQ3:** central evidence is the build/entry → remotes/exposes configuration → named export → consumer → DOM destination chain. Repository name, README title and dependencies alone would be insufficient.
- **Protocol:** singular/plural and hyphenated/joined hit spellings were preserved. Search records do not permit automatically attributing the plural hit to a README containing only a singular title.

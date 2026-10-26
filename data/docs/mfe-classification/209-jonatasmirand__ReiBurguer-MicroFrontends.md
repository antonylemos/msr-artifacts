---
schema: 1
id: 1117824036
full_name: jonatasmirand/ReiBurguer-MicroFrontends
url: https://github.com/jonatasmirand/ReiBurguer-MicroFrontends
commit: 268d79ae1ff2579a9c9877adba0e1b87cfac1dff
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, next]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 209 — jonatasmirand/ReiBurguer-MicroFrontends

## Context

“ReiBurguer – Micro Frontends + Module Federation” (`README.md:2–15`): learning project with three Next.js 14 / React 18 applications in sibling folders, without workspace:
- `container`, host, at default port;
- `cardapio`, remote at port 3001;
- `pedido`, remote at port 3002.

All use `@module-federation/nextjs-mf`. Container loads both remotes on same page, and they communicate through browser Custom Events (`README.md:42–72`). Metadata homepage points to Vercel deployment. Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:210` records rank 209, ID 1117824036, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:210` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:22268` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:22274` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same eight hits in each round.

Code search:

| Query (`q`) | Subquery | `path` | Collection 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | `…#size:400..499` | `container/package.json` | 2026-10-07T18:19:01.958Z / 2026-10-08T15:34:47.034Z |
| same | `…#size:400..499` | `pedido/package.json` | 2026-10-07T18:19:01.958Z / 2026-10-08T15:34:47.034Z |
| same | `…#size:500..599` | `cardapio/package.json` | 2026-10-07T18:19:48.108Z / 2026-10-08T15:35:35.478Z |

Files are 489, 498 and 500 bytes at SHA, within ranges, and contain `"@module-federation/nextjs-mf": "^8.8.47"` (`container/package.json:12`; `pedido/package.json:12`; `cardapio/package.json:12`).

Repository search, with subquery `…#created:2025-12` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:25:56.873Z / 2026-10-08T15:40:18.421Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:09:59.973Z / 2026-10-08T15:48:34.496Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:28:32.293Z / 2026-10-08T15:56:53.991Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:58:44.000Z / 2026-10-08T16:07:26.672Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:21:42.264Z / 2026-10-08T16:16:33.462Z |

Effective queries append `pushed:>=2025-04-01 created:2025-12-01..2025-12-31`.

Repository-hit metadata:
- description “Projeto para testar aprendizado com Modulate Federation incluindo três Micro Frontends divididos em (container, cardápio e pedido)” (English translation: “Project to test learning with Modulate Federation including three Micro Frontends divided into container, menu and order”);
- no topics, JavaScript language, `fork: false`, size 425;
- creation at 2025-12-16T21:43:05Z, push at 2026-01-04T13:50:43Z;
- homepage `rei-burguer-micro-frontends.vercel.app`.

README spellings:
- “Micro Frontends”: `README.md:2` and `4`;
- “Microfrontends”: `README.md:7` (“uma arquitetura de Microfrontends”; English translation: “a Microfrontends architecture”); “microfrontends” in `18` and `42`;
- “microfrontend”: `README.md:24` (“cada microfrontend individualmente”; English translation: “each microfrontend individually”) and `89`;
- “Module Federation”: `README.md:2`, `10`, `32`, `74`. Description spells it “Modulate Federation”.

Last README change is SHA itself, `268d79a` (2026-01-04), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 54 entries, all regular files `100644`; zero symlinks and zero gitlinks. Three Next.js projects with own `package.json`, `package-lock.json`, `next.config` and `src/`. Root `package-lock.json` has no packages (`package-lock.json:1–6`), and no workspace exists. | context |
| Configuration (host) | `container/next.config.mjs:7–29`: `NextFederationPlugin` with `name: 'container'` and `remotes` `pedido@http://localhost:3002/_next/static/chunks/remoteEntry.js` and `cardapio@http://localhost:3001/…`, with singleton `react`/`react-dom`. | strong |
| Configuration (remotes) | `cardapio/next.config.js:5–19`: `name: "cardapio"`, `exposes: { "./Cardapio": "./src/components/Cardapio.jsx" }`. `pedido/next.config.mjs:7–29`: `name: 'pedido'`, `exposes: { './Pedido': './src/_components/Pedido.jsx' }`. Ports in `dev` scripts (`cardapio/package.json:6`, `--port 3001`; `pedido/package.json:6`, `--port 3002`) match host. | strong |
| Source code (composition) | `container/src/pages/index.js:5–6`: `dynamic(() => import("cardapio/Cardapio"), { ssr: false })` and same for `pedido/Pedido`. `:20–26`: both mounted on page. | strong |
| Source code (integration) | `cardapio/src/components/Cardapio.jsx:30–43` dispatches `CustomEvent("adicionarCarrinho")` in `window.top`; `pedido/src/_components/Pedido.jsx:7–16` listens to same event. Menu images come from remote origin (`Cardapio.jsx:21`, `http://localhost:3001${prato.imagem}`). | moderate |
| Source code (boundaries) | Search for `../..` and `../container`, `../cardapio` and `../pedido`: no occurrence. Each app uses alias `@/*` for own `src` (`cardapio/jsconfig.json`). | context |
| Configuration (residue) | `cardapio` has two configuration files. `next.config.js` exposes `./src/components/Cardapio.jsx`, existing; `next.config.mjs:12–14` exposes `./src/_components/Cardapio.jsx`, nonexistent. Under Next 14 search order, `next.config.js` takes precedence. Also residue in `Cardapio.jsx:5–8`: function `adicionarPedido` dispatches another event and is not called. | ambiguous |

## Authorship and history

Non-shallow clone; 5 commits, no merge, all by Jonatas Miranda `<jonatasmiranda97.jm@gmail.com>` (as `jonatasmirand` and, at SHA, through web interface):
- `8e7f1d9` (2025-12-14, “Subindo projeto”; English translation: “Uploading project”): adds `container`, `pedido` and README, with `cardapio` as gitlink (`160000`);
- `670f5e2` (2025-12-14): adjusts README;
- `682204a` (2025-12-16, “Adiciona micro frontend Cardapio”; English translation: “Adds Cardapio micro frontend”): updates gitlink;
- `b7c02c3` (2025-12-16, “Converte cardapio de sub-repo para pasta normal”; English translation: “Converts cardapio from sub-repo to regular folder”): removes gitlink and adds regular files of `cardapio/`;
- SHA `268d79a` (2026-01-04): updates README.

No gitlink remains at SHA. No historical blob was read. Clone is partial (`blob:none`) and `git rev-list --objects --all --missing=print` reveals two missing historical README blobs (`0f5d153…` in first commit and `47e33dd…` in snapshots from `670f5e2` to `b7c02c3`); current README and other SHA evidence were read, and log metadata/filenames are available.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Three repository units, two referenced by host composition configuration (`container/next.config.mjs:12–15`). |
| Q2 | Yes | Each app has own `package.json`, lockfile, `next.config` and server, without source-code imports between them. |
| Q3 | Yes | Container mounts both remotes on homepage (`container/src/pages/index.js:5–6`, `20–26`). |
| Q4 | Yes | Module Federation (`nextjs-mf`) configured in host (`remotes`) and remotes (`exposes`), consumed through `dynamic(() => import("cardapio/Cardapio"))` and `import("pedido/Pedido")`. |
| Q5 | Yes | Q1–Q4 are Yes: Next.js host with two remotes and event communication. |

## Rationale

- `MFE-implemented` under Q1–Q5 Yes rule. Matches “monorepos containing a host and its remotes”. Chain is complete in snapshot, as in 076/084/096/106/109.
- Remotes expose screen slices with own state (menu and order) communicating through events, not shared components. Not 089/100 case.
- `approaches: [module-federation]`, `ui_technologies: [react, next]`, `frontend_units: 3`, `unit_organization: monorepo` (three apps in one repository, without workspace), `repo_type: example` (“Projeto para testar aprendizado”; English translation: “Project to test learning”, `README.md:4`).
- `build_tools: [webpack]`: federation is applied through `webpack(config)` in each `next.config` and `dev` scripts define `NEXT_PRIVATE_LOCAL_WEBPACK=true`. Differs from drafts 180/199, where Next had no explicit bundler configuration and remained `[]`.
- No decision remains open.

## Analysis notes

- **RQ2:** `nextjs-mf` in Next 14 (Pages Router) with `dynamic(..., { ssr: false })` and `CustomEvent` communication in `window.top`. README warns MF is unsupported in Next > 15 (`README.md:6`).
- **Protocol (snapshot):** `cardapio` was gitlink in first two commits and became regular folder in `b7c02c3`; SHA has no gitlinks.
- **Protocol (search):** repository enters through code (three `package.json`) and five text queries. Eligibility changes from `unknown` (001) to `pass` (002).
- **Independent-review contribution (Lupa):** complete agreement with MFE-implemented, Q1–Q5 Yes, `module-federation`, `[react, next]`, `webpack`, three units and `monorepo`; no open decision (`draft`). History: `cardapio` first appears as gitlink (`8e7f1d9` and `670f5e2`, target `907edba…`; `682204a`, target `54865bb…`) and is then replaced with regular files, so a third snapshot still carries gitlink; container and pedido enter in `8e7f1d9`. Execution caveats to record: ports 3001 and 3002 are in `dev`, and all three `start` scripts use only `next start`, requiring explicit ports for simultaneous production running; remotes and images use fixed `localhost` URLs; Vercel homepage is metadata, not validated deployment; script command `set` may be nonportable; README warning about Next above 15 is documentary declaration, and declared version differs from lockfile resolution. This limits executability and portability without making configured and consumed snapshot mechanism uncertain.

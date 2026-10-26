---
schema: 1
id: 1027727587
full_name: agsosa/react-next-umd-remote-modules-poc
url: https://github.com/agsosa/react-next-umd-remote-modules-poc
commit: 130ddb6f8b73b85ec0065160bc49a764c80d49ba
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [runtime-script]
ui_technologies: [react, next]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 203 — agsosa/react-next-umd-remote-modules-poc

## Context

“UMD-based Microfrontends PoC” (`README.md:1–17`): two Next.js 15 / React 19 applications, `shell` and `mf-1`. `mf-1` runs as own app (port 3001) and additionally compiles three components (`Header`, `Fulfilment`, `FulfilmentDetails`) through Vite into a UMD bundle served at `/remote-modules/bundle.js`. `shell` loads this bundle at runtime through `<script>` and renders components from `window.MF1_RemoteModules`. README states solution is “not Module Federation” (`README.md:12`) and presents it as “remote component sharing” (`README.md:3`, `138`). Vercel deployment is indicated in README (`README.md:7–8`) and metadata (homepage). Repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:204` records rank 203, ID 1027727587, status `cloned`, branch `main` and front-matter commit, which is clone HEAD and `origin/main`. Every clone Git command used `GIT_NO_LAZY_FETCH=1`, reading through `${SHA}:caminho`. No installation, build, execution or network access occurred.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:204` records strategies `terminology;technology` and eligibility `pass`. Sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). ID appears in `data/discovery/mfe-round-001/candidates.csv:16998` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:17002` (`pass`).

`sqlite3 -readonly` query of tables `hits`, `queries` and `subqueries` from both rounds, filtered by ID, returns same three hits in each round, at endpoint `repositories`, with subquery `…#created:2025-07` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:41:46.312Z / 2026-10-08T15:38:37.705Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:08:19.765Z / 2026-10-08T15:47:35.096Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:18:44.074Z / 2026-10-08T16:15:15.681Z |

Effective queries append `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Hit metadata:
- null description, no topics, TypeScript language, `fork: false`, size 258;
- creation at 2025-07-28T12:50:25Z, push at 2025-07-29T00:02:39Z;
- homepage `react-next-umd-remote-modules-poc-s.vercel.app`.

README spellings:
- “microfrontend”: `README.md:125` (“Each microfrontend can be developed independently”), also in `132` and `138`;
- “microfrontends”: `README.md:3` (“implementation of microfrontends using UMD”); “Microfrontends” in `1` and `12`;
- “Module Federation”: `README.md:3` (“similar to Module Federation”), `12` (“not Module Federation”) and `138`.

Hit for `"module federation"` comes from mentions contrasting solution with Module Federation; code contains no Module Federation.

Last README change is `ed8c864` (2025-07-28), before October 2026 collections. README at the SHA is not later than searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 50 entries, all regular files `100644`; zero symlinks and zero gitlinks. Two projects with own `package.json`, `package-lock.json`, `next.config` and `src/` (`shell/`, `mf-1/`), without root workspace. `mf-1/public/remote-modules/bundle.js` (123 KB) is versioned generated UMD bundle. `shell/src/data/orders.ts` and `mf-1/src/data/orders.ts` are same blob (`64c31a3`), a copy rather than import. | context |
| Configuration (producer) | `mf-1/vite.mf.ts:27–47`: entry `src/RemoteModules/RemoteModules.ts`, `format: "umd"`, `name: "MF1_RemoteModules"`, `entryFileNames: "bundle.js"`, `outDir: "public/remote-modules"`, `react`/`react-dom` external as globals. `mf-1/package.json:6–12`: `build` = `build:vite && next build`; `dev` runs Next and Vite in watch. `mf-1/src/RemoteModules/RemoteModules.ts:1–10` exports three components wrapped in `withProviders`. `mf-1/next.config.ts:9–23`: `Cache-Control` for `/remote-modules/:path*` in production. | strong |
| Configuration (consumer) | `shell/next.config.js:7–9`: `publicRuntimeConfig.MF1_BASE_URL` = `process.env.MF1_BASE_URL \|\| 'http://localhost:3001'`. | strong |
| Source code (composition) | `shell/src/hooks/useRemoteModule.ts:35–37`, `79–99`: publishes `React`/`ReactDOM` in `window`, injects `<script src=url>` and reads `window[moduleName][componentName]`. `shell/src/components/RemoteHeader.tsx:14–22`, `37` and `RemoteFulfilment.tsx:29–33`, `64–69` load `MF1_BASE_URL + "/remote-modules/bundle.js"` and render component with props and callbacks. Used in `shell/src/pages/fulfilment.tsx:29–33`, `index.tsx:178` and `orders/[id].tsx:273`, `289`, `410`. `shell/src/types/mf1-remote-components.d.ts:3–29` defines contract. | strong |
| Source code (boundaries) | Search for `../..`, `mf-1/` and `shell/` in `shell/src`, `mf-1/src` and configurations: only internal imports in `shell/src/pages/orders/[id].tsx:4–6` (`../../data`, `../../components`). No import crosses from `shell/` to `mf-1/` or vice versa. `mf-1` uses same components locally (`mf-1/src/pages/fulfilment.tsx:3–4`; `index.tsx:3–4`). | context |
| Nature of exposures | `Header` is common header (2,8 KB). `Fulfilment` (`mf-1/src/RemoteModules/Fulfilment.tsx:155–363`) is order-processing screen with own state (`useState(mockOrders)`, `:157`). `FulfilmentDetails` is order detail. README describes goal as component sharing (`README.md:3`, `126`, `138`). | ambiguous |

## Authorship and history

Non-shallow clone; 17 linear commits, no merge, all by Alejandro Sosa `<aleej.gs@gmail.com>` on 2025-07-28. Root is `6d2fa15` (“Initial commit”), followed by `b50998d` (“Init”), several “wip” and adjustments: `77ded93` (“Add env var for remote urls”), `500c3c4` (“Add cache control to mf1 production builds”), `03aa81d` (“Create README.md”) and `ed8c864` (“Add styled components theme, update readme, cleanup”). SHA `130ddb6` (“Delete settings.local.json”) only removes `.claude/settings.local.json`; that blob was not read. Spanish comments (`mf-1/vite.mf.ts:8–9`, `35`, `39`) mention coordination between teams and Kubernetes pods, without corresponding deployment artifact in repository.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Two repository units (`shell/`, `mf-1/`); bundle URL of `mf-1` is configured in shell (`shell/next.config.js:7–9`). |
| Q2 | Yes | Each unit has own entry, `package.json` and build (`mf-1/package.json:6–12`; `shell/package.json:5–9`). No source-code import connects them; connection uses served bundle. |
| Q3 | Yes | Shell renders remote components in its pages (`shell/src/pages/fulfilment.tsx:29–33`; `orders/[id].tsx:410`). |
| Q4 | Yes | Runtime `<script>` loading mechanism configured on both sides (`mf-1/vite.mf.ts:27–47`; `shell/src/hooks/useRemoteModule.ts:79–99`) and consumed. Neither link nor iframe. |
| Q5 | Yes | Beyond reusable header, remote bundle supplies fulfillment and order-detail screens, with own state, rendered as shell-page content. This constitutes frontend-unit composition, not merely code sharing. |

## Rationale

- Classified as `MFE-implemented`: shell loads and composes at runtime an external unit supplying complete domain screens plus header component.
- **Mechanism:** same as 002 (`runtime-script`, final `MFE-implemented`): Vite-generated bundle, loaded through `<script>` and read from global. There, however, remote exposed `mount`/`unmount` of own widget. Here React components depend on host React (`external`, `README.md:39–43`), receive `router` and shell callbacks (`RemoteHeader.tsx:37`) and are also used locally by `mf-1`.
- **Composition or sharing:** `Fulfilment` and `FulfilmentDetails` are domain screens with own state occupying shell-route content, closer to composition. `Header` is a reused layout component, closer to sharing. In 089/100 same boundary left Q5 Undetermined.
- **Fields:** `approaches: [runtime-script]` (template slug, first case 002), `ui_technologies: [react, next]`, `build_tools: [vite]` (remote bundle made by Vite; Next follows 199 convention), `frontend_units: 2`, `unit_organization: monorepo` (two projects in one repository, without workspace), `repo_type: example` (declared PoC, `README.md:1`; `mf-1/next.config.ts:25`).

## Analysis notes

- **RQ2:** Vite-generated UMD from Next.js application, served through its `public/` and loaded in host with React exposed in `window`. Router is passed through props because `useRouter` does not work in remote (`README.md:102–110`).
- **RQ1 (misleading signals):** hit for `"module federation"` comes from phrases denying Module Federation use (`README.md:3`, `12`, `138`).
- **Protocol (search):** eligibility changes from `unknown` (001) to `pass` (002).

## Recorded decision

Promoted to `MFE-implemented`. `mf-1` produces a UMD bundle loaded by `shell` at runtime and used to compose complete fulfillment and order-detail screens. Although it also exposes a reusable header, remote screens with own state demonstrate frontend-unit composition.

---
schema: 1
id: 1044372265
full_name: lucky-pyco/webpack-module-federation
url: https://github.com/lucky-pyco/webpack-module-federation
commit: 4548c35f738c1b6508367317cef9d1ea2ba79edb
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 100 — lucky-pyco/webpack-module-federation

## Context

Cinema booking interface example with four own React targets: `HomePageApp`, `DetailsPageApp`, `SeatSelectionApp` and the component showcase `ReactComponents`. There is also an Express API in `MF_Server`. Only HomePageApp and ReactComponents are connected by federation: the former imports and renders MovieCard exposed by the latter. DetailsPageApp and SeatSelectionApp have entries/builds, but do not participate in this chain in the snapshot.

Federation configuration has observable compatible producer, consumer and packages. The doubt is interpretive: does sharing an image/title card from a component showcase constitute frontend-unit composition or merely code sharing, excluded by the checklist? The caution of 089 is followed, without creating a minimum-size rule or requiring a complete screen. Q1–Q4 record the technical chain; Q5 remains Undetermined, with rationale and joint review.

Clone confirmed: `lucky-pyco__webpack-module-federation`; SHA according to `data/samples/mfe-sample-001/clones.csv:101`. Complete inventory through `git ls-tree -r 4548c35f738c1b6508367317cef9d1ea2ba79edb`: **80 regular files** (mode `100644`), **zero symlinks** and **zero gitlinks**. There is no versioned `node_modules/` or submodules. `frontend_units: 4` counts the four own targets with entries and builds, including the executable showcase; it counts neither buttons/cards individually nor the API. Two of these four targets have a federated connection; the number does not assert that the other two are composed. There is no root manifest, although a root `package-lock.json` exists; build configurations and scripts belong to their respective subfolders.

## Sample provenance

- `data/samples/mfe-sample-001/sample.csv:101` records rank 100, id 1044372265, `strategies: technology` and eligibility `pass`. The origin round is `data/discovery/mfe-round-002` (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:18050` and `data/discovery/mfe-round-002/candidates.csv:18055` record strategy `technology`, null description, empty topics, JavaScript language, null license, default branch `master`, creation and last push on 2025-08-25. These are discovery metadata, not architecture confirmation.
- In both databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, queried with `sqlite3 -readonly`, joining `hits JOIN queries` through `query_id` and filtering `hits.repository_id = 1044372265` returns only `technology-module-federation-repositories`: strategy `technology`, endpoint `repositories`, query `"module federation" in:name,description,readme`, empty `path`. These records have no localized code hit.
- **Field elimination:** the tree has no README, and recorded description/topics are empty. Among name/description/topics/README fields, the only available thematic-compatible text field is name `webpack-module-federation`. This identifies the discovery signal by elimination, without reproducing GitHub indexing or using the name as architectural evidence. Evaluation below depends exclusively on configurations and sources.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | All four manifests have their own build/serve with `webpack.config.js`: `HomePageApp/package.json:6–9`, `DetailsPageApp/package.json:6–9`, `SeatSelectionApp/package.json:6–9`, `ReactComponents/package.json:6–9`. Each configuration defines local entry and dist (`HomePageApp/webpack.config.js:6–18`, `DetailsPageApp/webpack.config.js:5–18`, `SeatSelectionApp/webpack.config.js:5–17`, `ReactComponents/webpack.config.js:6–18`). These are four physical targets, without inferring composition of all four. | moderate |
| Source code (entries) | `HomePageApp/src/index.js:1–5` and `ReactComponents/src/index.js:1–5` mount local Apps with ReactDOM. Details and SeatSelection also have their own ReactDOM entries (`DetailsPageApp/src/index.js:1–11`, `SeatSelectionApp/src/index.js:1–11`). They are not units extracted from documentary content or vendored dependencies. | moderate |
| Configuration (host and remote) | `HomePageApp/webpack.config.js:26–32` instantiates ModuleFederationPlugin and defines `components@http://localhost:3002/remoteEntry.js`. `ReactComponents/webpack.config.js:26–33` uses name `components`, filename `remoteEntry.js` and exposes `./MovieCard` and `./SnowButton`; its dev server uses port 3002 (`:13–18`). Name, URL, port and consumed key match. | strong |
| Configuration (package resolution) | Configs require plugins and Webpack (`HomePageApp/webpack.config.js:1–4`, `ReactComponents/webpack.config.js:1–4`). These packages are declared together with used loaders/presets (`HomePageApp/package.json:20–36`, `ReactComponents/package.json:17–41`). The host lock records Webpack 5.101.3, HtmlWebpackPlugin 5.6.4 and MiniCssExtractPlugin 2.9.4 (`HomePageApp/package-lock.json:6783–6785`, `:4173–4175`, `:4831–4833`); the remote lock records the same versions (`ReactComponents/package-lock.json:9287–9289`, `:5500–5502`, `:6657–6659`). The federation plugin comes from `webpack.container`, consistent with declared/locked Webpack 5, not a missing package. | moderate |
| Configuration (other builds) | Dependencies of requires/loaders/presets in all four configs were checked against all four manifests; all are declared. Autoprefixer is required by PostCSS configs (`HomePageApp/postcss.config.js:1–3`, `ReactComponents/postcss.config.js:1–3`) and declared in `HomePageApp/package.json:25` and `ReactComponents/package.json:21`. Details/SeatSelection declare Webpack 5 and the same plugins/loaders (`DetailsPageApp/package.json:19–34`, `SeatSelectionApp/package.json:19–34`), but have no own lockfiles in the inventory. Verification is static; it does not assert resolution in executed installation/build. | context |
| Source code (actual consumption) | `HomePageApp/src/App.js:1–8` reaches HomeContent. This declares `React.lazy(() => import('components/MovieCard'))` (`HomePageApp/src/components/HomeContent/HomeContent.jsx:6`) and renders `<MovieCard/>` under Suspense in the list (`:28–46`). The exposed module has a corresponding default export (`ReactComponents/src/components/MovieCard/MovieCard.jsx:5–22`). The mechanism is neither an isolated dependency nor dead configuration. | strong |
| Source code (remote element granularity) | MovieCard receives title/image, builds an image URL and renders image plus Typography (`ReactComponents/src/components/MovieCard/MovieCard.jsx:3–22`). The host fetches movies but does not pass their data to the card (`HomePageApp/src/components/HomeContent/HomeContent.jsx:16–18`, `:28–35`), which uses default values. This supports interpretation as a reusable presentation component, retaining doubt about code sharing. | ambiguous |
| Source code (producer showcase) | `ReactComponents/src/App.js:3–11` imports local components; `:22–40` demonstrates MovieCard, buttons, typography and dropdown. Federation exposes only card and button, not this App or routes (`ReactComponents/webpack.config.js:29–32`). SnowButton has visual implementation (`ReactComponents/src/components/Button/Snow/Snow.jsx:4–7`, `:56`) and is used in the showcase (`ReactComponents/src/App.js:28`), but no federated consumer of it was found. | ambiguous |
| Configuration / Source code (other targets) | Details and SeatSelection use conventional configurations without ModuleFederationPlugin (`DetailsPageApp/webpack.config.js:20–26`, `SeatSelectionApp/webpack.config.js:19–25`); their Apps import only local content (`DetailsPageApp/src/App.js:1–8`, `SeatSelectionApp/src/App.js:1–8`). No remotes, exposes or navigation connection linking them to the host were found. | contrary |
| Source code (partial business flow) | QuickBooking only assembles data and writes it to the console (`HomePageApp/src/components/QuickBooking/QuickBooking.jsx:9–16`); optional callback movieClicked is not supplied by App (`HomePageApp/src/components/HomeContent/HomeContent.jsx:22–25`, `HomePageApp/src/App.js:8`). The common booking domain does not establish composition with Details/SeatSelection. This does not erase the observed federated card import. | context |
| Source code (server) | `MF_Server/index.js:1–13` creates Express, serves images/static files and returns movie data, on port 5555 (`:38–40`). This is API/assets; its manifest declares Express/CORS (`MF_Server/package.json:11–16`), not another frontend or federated host. | context |
| Structure / Source code (negative searches) | The inventory was searched for README, ADRs, architecture documents/diagrams and submodules: absent. Sources/configs of all four targets, excluding lockfiles, were searched for `SnowButton` consumption, `DetailsPageApp`/`SeatSelectionApp` imports, `window.location`, `location.href`, `<Route`, `<Link`, `iframe`, `postMessage`, `single-spa`, `registerApplication` and `importmap`. SnowButton appears only in producer/showcase; the others establish no further integration. Observed import audit found no relative paths crossing into another application’s sources; the federated specifier is `components/MovieCard`. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | Projects are physical targets, but the only consumed federated artifact is a presentation card from a component showcase; there are no composed frontend units. |
| Q2 | No | Separate builds do not establish MFE unit independence when the only accepted relationship is component sharing. |
| Q3 | No | HomePageApp inserts a reusable visual component, without its producer’s own functional region, page or flow. |
| Q4 | No | Module Federation is configured and consumed, but exclusively to distribute a component from a UI library/showcase. |
| Q5 | No | The case falls under the code-sharing and component-library exclusion. |

## Rationale

- The exclusion of Module Federation used only for code sharing applies. The only remote consumption is `MovieCard`, supplied by a component showcase.
- The federation technical chain is real, but there is no remote functional unit, page or flow integrated into the host interface.
- `approaches: []` records that Module Federation is not accepted as an MFE approach here; DetailsPageApp and SeatSelectionApp remain targets without a composition connection.
- `frontend_units: 4` counts own executable targets, not exposed modules; `repo_type: example` corresponds to the showcase’s and partial booking flow’s demonstration nature. `ui_technologies: [react]` and `build_tools: [webpack]` follow from sources and actual configurations.

## Analysis notes

- **RQ1:** the only discovery hit in each round is a repository hit, compatible by elimination with the name. Positive federation evidence comes from sources/configs; the class is not inferred from name or plugin presence.
- **RQ3:** host → HomeContent → lazy import of components/MovieCard → producer exposure → default-export component. The SnowButton chain ends at exposure/showcase, and Details/SeatSelection have their own entries without a found connection to the host application. These limitations must appear in the analysis even if the card is accepted as sufficient composition.
- **Checklist (comparators):** case 089 keeps Q5 under review for shared components/hook; it is the closest interpretive parallel. Case 083 retains review of entry-chain sufficiency given an execution defect. Here no equivalent mismatch in container name, exposed key or consumed card path was found; 083’s execution doubt is not transferred to Q4 without evidence. Cases 076/084/096 have host and remotes with an explicit chain; that technical chain is present here too, but functional granularity is the open decision. Consulted annotations 089/083 are in `review`, and 076/084/096 in `draft`; none was promoted to final and no proposed rule was treated as decided.
- **Protocol (families/templates):** searches in annotations for `lucky-pyco`, `webpack-module-federation`, `HomePageApp`, `ReactComponents`, `Avenger hi`, `QuickBooking` and `10-react-project` found no sibling. All four manifests repeat name `10-react-project` and configs have similar structure, indicating a common internal base; no external origin or shared template with a specific candidate was demonstrated.
- **History and branches:** non-shallow clone; **1 reachable commit**, **0 merges** and **1 root commit**, the evaluated SHA itself, with subject “init” and date 2025-08-25. Counts checked through `git rev-list --count`, `--count --merges` and `--max-parents=0`. Only `master`, `origin/master` and `origin/HEAD`, all at this SHA; no other branch used to complete the snapshot.
- **Protocol (limitations):** network/submodules were not accessed, nor installation, build, server or browser executed. Operational behavior of local servers, API, data or external images is not asserted. The review point is code-sharing exclusion, not a new requirement for successful execution.

## Recorded decision

Promote to **Non-MFE**. Federation delivers only `MovieCard` from a component showcase to HomePageApp; this is reusable UI sharing, without functional-unit composition. The other applications do not participate in a composition chain in the snapshot.

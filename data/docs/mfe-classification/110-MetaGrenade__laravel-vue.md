---
schema: 1
id: 953923333
full_name: MetaGrenade/laravel-vue
url: https://github.com/MetaGrenade/laravel-vue
commit: 4863e02a377a775631e7131a037db0cd5a238288
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 110 — MetaGrenade/laravel-vue

## Context

MetaForge is a Laravel/Vue/Inertia boilerplate for SaaS, commerce and community. Forum, blog, support, store and administration are functional modules of a single application, with local Vue pages and client/SSR entries of the same frontend (`README.md:3`; `README.md:11`; `README.md:17–28`; `vite.config.ts:11–14`). `repo_type: template` records the explicit starter-kit/boilerplate purpose, without assuming the set is merely empty scaffold (`composer.json:3–12`).

## Sample provenance

- Rank 110, ID, identity and strategy `technology`: `data/samples/mfe-sample-001/sample.csv:111`. Clone, branch `main` and SHA checked in `data/samples/mfe-sample-001/clones.csv:111`. Sample origin in round 002: `data/samples/mfe-sample-001/manifest.json:2–5`.
- `data/discovery/mfe-round-001/candidates.csv:12331` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:12336`, `pass`. Both describe a Laravel/Vue starter kit and “Single Page Applications (SPA)”, with topics including `single-page-app`, PHP language, MIT license and `fork: false`. Last pushes recorded in exports are 07/10 and 08/10/2026; clones SHA is later, from 09/10/2026. Snapshots are not mixed.
- `sqlite3 -readonly` query, joining `hits` and `queries` and filtering `repository_id=953923333`, in databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`: both have one hit `technology-single-spa-repositories`, strategy `technology`, endpoint `repositories`, exact query `"single-spa" in:name,description,readme`, without a file path. SQLite identifier, without artificial text line.
- Literal spelling `single-spa` does not appear in README at the evaluated SHA. The closest exact excerpt is “theme initialization in a single SPA shell” (`README.md:11`). Name lacks the term; description/topics discuss SPA and `single-page-app`. It is impossible to attribute a unique field, normalization or historical excerpt to the hit by elimination. Search records do not provide that location. README at the SHA is later than searches (modified in `73ebe70`, 2026-10-09, after searches on 2026-10-07 and 2026-10-08), and the blob current during searches is absent from partial clone (history unavailable, without object fetching). By elimination, README is the only queried field where "single" is adjacent to "spa" in the snapshot, but attribution is not demonstrable. Query retrieving the candidate is `technology-single-spa-repositories` (subquery `#created:2025-Q1`, compatible with root of 2025-03-24). Retrieval may reflect terminological approximation or a previous state; this remains a provenance limitation, not evidence of implemented single-spa. Name and isolated dependencies do not confirm architecture.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 1.187 regular files, all mode 100644; zero symlinks and zero gitlinks. There are 407 in `app/`, 387 in `resources/`, 154 in `database/`, 145 in `tests/`, 27 in `config/`, 11 in `.github/`, ten in `storage/`, seven in `routes/`, six in `public/`, three in `bootstrap/`, three in `docs/`, two in `lang/` and 25 at root. No versioned `node_modules` or `vendor`, submodule or second npm manifest. Git-tree counts, without artificial text lines. | context |
| Configuration / Build/deploy | One npm manifest and one Vite config. Scripts `build`, `build:ssr` and `dev` use the same Vite (`package.json:5–13`). Laravel plugin points to CSS/client app and SSR (`vite.config.ts:11–14`), followed by Inertia/Vue plugins (`vite.config.ts:23–32`). No own target/build exists for forum, blog, ACP or store. | contrary |
| Source code (client entry) | `resources/js/app.ts:1–5` imports Inertia and local utilities; `createInertiaApp` resolves `pages: './pages'`, registers Ziggy and initializes global behavior (`resources/js/app.ts:11–28`). Bootstrap is shared by pages, without independent application registration. | contrary |
| Source code (SSR) | `resources/js/ssr.ts:1–22` uses the same `createInertiaApp`, folder `./pages` and Ziggy. Server-side entry renders the same UI; it is not a second frontend unit composed with client. | contrary |
| Source code / Composition | Root Blade loads CSS, bootstrap and Vue page through the same Vite pipeline and presents the Inertia app (`resources/views/app.blade.php:42–57`). Dashboard controller selects local page `Dashboard` with props (`app/Http/Controllers/DashboardController.php:24–36`), which imports layout/components from the same tree (`resources/js/pages/Dashboard.vue:1–9`). Inertia page navigation is not equivalent to composition between applications with independent builds. | contrary |
| Configuration / Source code | Alias `@` points to `resources/js`; `ziggy-js` points to the Composer package installed under `vendor/tightenco/ziggy` (`vite.config.ts:34–38`), declared in `composer.json:15–26`. Vendor absence from snapshot is a normal dependency-installation condition, not a remote frontend. Configuration `codeSplitting` creates a Vue/Inertia runtime chunk, without a second unit (`vite.config.ts:40–49`). | context |
| Source code (complete boundary search) | Ran `git grep -n -F -e '../../' -e '../../../'` at the SHA across all `resources/js`, and repeated in every `*.vue`, `*.ts` and `*.js` file in repository: a single result, `resources/js/pages/Welcome.vue:43`, glob `../../images/tech-icons/*.svg`. File explains these are SVGs embedded in build (`resources/js/pages/Welcome.vue:39–43`). Path leaves `js/pages` for assets of the same application, without crossing another unit’s boundary. Absence is not generalized from a file sample. | context |
| Technology / Resolution | Vue, Inertia, Vite and plugins are declared (`package.json:15–16`; `package.json:39–48`; `package.json:54–64`). Lockfile pins Vue 3.5.43 (`package-lock.json:6336–6340`), Vite 8.3.2 (`package-lock.json:6002–6006`), Vue plugin 6.0.9 (`package-lock.json:2461–2465`), Inertia Vite/Vue 3.8.0 (`package-lock.json:530–547`) and Laravel plugin 3.2.0 (`package-lock.json:4286–4290`). Recorded peers allow the Vite/Vue versions used. Basic static resolution verified; dependencies were not installed and builds were not run. | context |
| Technology / Configuration / Composition | Text search at the SHA, excluding `package-lock.json`/`composer.lock`, for `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements.define`, `postMessage`, `iframe`, `loadRemote`, `microfrontend`, `micro-frontend` and `micro frontend`: no MF/single-spa composition or preparation of a unit for an external host. `iframe` hits concern sanitization/tests and a Stripe Elements comment, not own-application loaders. Inventory/configurations provide no remotes ↔ exposes ↔ consumption chain, import map or MFE lifecycles. | absent |
| Source code (third parties) | Billing loads Stripe.js from vendor URL (`resources/js/pages/settings/Billing.vue:79–99`) and creates/mounts its Payment Element (`resources/js/pages/settings/Billing.vue:159–186`). Iframe comment concerns that widget’s appearance (`resources/js/lib/stripeAppearance.ts:4–8`). This identifies third-party payment integration, not a second own frontend target of the candidate. Commerce documentation also describes redirection to provider checkout (`docs/commerce.md:7–16`), without composition of own frontend applications through links. | context |
| Structure / Source code (third parties) | API documentation page uses Swagger UI from CDN (`resources/views/api/docs.blade.php:7–20`), an API visualization tool; it is neither an independent product unit nor a remote configured for SPA composition. SVG assets, UI/editor libraries and vendor scripts are not added to `frontend_units`. | context |
| Documentation | README identifies a single SPA shell and describes client/SSR entries and business modules (`README.md:11`; `README.md:36–47`; `README.md:219–222`). The three files in `docs/` are roadmap, commerce and i18n; no ADR/MFE architecture document exists in inventory. `docs/commerce.md:5–16` documents functional purchase flow, not frontend independence. | context |

## Authorship and history

Metadata at the SHA: 529 reachable commits, 127 merges, one root commit `02684523887f0515e53900ac45e6ae345934f51f`, non-shallow clone. Root is from 24/03/2025, author `MetaGrenade`; HEAD is from 09/10/2026, author `Caleb Harrod`, about coupons/checkout. Author/committer pairs: 240 `Caleb Harrod`/`Caleb Harrod`, 181 `Caleb Harrod`/`GitHub`, 104 `MetaGrenade`/`MetaGrenade`, two `dependabot[bot]`/`GitHub` and two `Snow`/`Snow`. Neither equivalence between identities nor complete intellectual authorship is presumed from these records.

`git log --no-renames --name-status` for `resources/js`, `resources/views` and `vite.config.ts`, always with `GIT_NO_LAZY_FETCH=1`, shows page/layout sources and bootstraps added in early history, and continued application evolution. Root adds Vite config and Blade; `108d2d2fa8115ef3562651623ffbe96d4402daf0` (Caleb Harrod) changes both during stack update, and `3ff2ddc280895b5a26b7981b7765ced1ff6b5a4d` changes them during design modernization. HEAD adds/modifies commerce components and pages, types, ACP layout and coupons in `resources/js`. No object was missing in these queries; no historical blob was necessary.

Composer manifest identifies base `laravel/vue-starter-kit` (`composer.json:3–12`). This records scaffold origin/framework, without turning the entire implementation into vendored third-party code or attributing starter-kit authorship to the owner. History evidences work on the own target, but does not prove originality of every component. Only refs `main`/`origin/main`/`origin/HEAD` at the SHA, other feature branches and `origin/metagrenade.com` were recorded; no content from those branches entered analysis.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One Vue/Inertia frontend, with client and SSR entries for the same pages (`vite.config.ts:11–14`; `resources/js/app.ts:11–25`; `resources/js/ssr.ts:6–22`). Business modules, widgets and API documentation are not additional own units. |
| Q2 | No | No set of units with their own entries/builds. Pages and components share pipeline and local sources (`package.json:5–8`; `resources/views/app.blade.php:42–57`; `resources/js/pages/Dashboard.vue:1–9`). Complete search for `../../`/`../../../` finds only an asset glob (`resources/js/pages/Welcome.vue:43`), without establishing a second independent unit. |
| Q3 | No | Inertia resolves pages of one application; Blade presents that same app, not a host mounting/routing distinct units (`resources/js/app.ts:11–25`; `resources/views/app.blade.php:42–57`). |
| Q4 | No | Conventional Vite/Inertia configuration, without a mechanism configured and used to connect frontend units (`vite.config.ts:9–38`; `resources/js/app.ts:11–25`). Single-spa/MF search reveals no integration chain. |
| Q5 | No | Single-application boilerplate; presence of SPA in retrieval and vendor integrations provide no evidence of MFE architecture or MFE-unit. |

## Rationale

- `Non-MFE`, with Q1–Q5 No. `frontend_units: 1` follows from complete inventory and client/SSR entries of the same application. It is not MFE-unit: no target is prepared for an external host; Q2–Q4 remain No.
- Q1/Q2 applied literally: multiple functional areas or client/SSR bundles are not multiple applications with relatively independent entries/builds. Relative-path grep ran across the entire indicated source scope, without extrapolating absence from a sample.
- Q4 requires mechanism and actual composition use. Single SPA in application description does not mean the single-spa library; alias, code splitting and Inertia page resolution do not create remotes/exposes. There is no configured but unconnectable integration as in 097/103/104, nor actual federation requiring code-sharing adjudication as in 089/100.
- Unlike host/remotes chains in 076/084/096/106/109 and final 007, modules here share bootstrap, manifest and build. Candidate 109 independence is neither reassessed nor presumed to classify this snapshot.
- Starter-kit origin and vendors are explicit, as cautions in 074/102/080 require, without confusing this project with an entire platform distribution or plugin whose sole host is third-party. Stripe Elements/Checkout and Swagger UI are payment/documentation integrations; no second own frontend unit depends on resolving the general links/iframes criterion.
- This is not merely educational/generator/exercise content: an implemented application exists. Precedents 023/075/081/094 prevent counting instructions, generated results or common components as extra units, without excluding the actual target.
- `repo_type: template` follows declared boilerplate purpose and manifest. `ui_technologies: [vue]`; Laravel/Inertia are backend/adaptation stack, without another independent UI. `build_tools: [vite]` rests on explicit configuration; no separate bundler is added merely for an underlying dependency.

## Analysis notes

- **RQ1 (families):** searches for `MetaGrenade`, `MetaForge`, `laravel-vue` and `inertia` in available annotations found no previously annotated sibling/template. Laravel base is explicit, but was not investigated through network or historical blob comparison.
- **RQ1 (misleading signal):** `"single-spa"` hit in repository search does not equal single-spa dependency/configuration. SPA description and excerpt `README.md:11` are semantically distinct; snapshot README lacks the query’s literal spelling.
- **RQ3:** observed chain is controller → local Inertia page → common Vue bootstrap/layout, with client/SSR build of the same set. The sole `../../` occurrence in JS/TS/Vue sources accesses local SVGs; negative evidence has declared full scope.
- **Protocol:** exact hit attribution remains undemonstrated, since database identifies neither field/excerpt and snapshot is later than exports. This retrieval limitation is not an open classification decision about architecture, observable at the pinned SHA.
- **RQ1 (connection with 124):** the same pattern ("single SPA" in README, same query `technology-single-spa-repositories`) occurs in 124 (`README.md:542`).

---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
url: https://github.com/vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation, iframe]
ui_technologies: [react, vue, angular]
build_tools: [webpack]
frontend_units: 7
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-22
---

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Context

Instructional example with one React host, two React remotes, one Vue remote and one Angular remote. Beyond this federated core of five local units, the host has routes to two external applications in iframes (`host/src/App.jsx:31–41`, `:190–197`). Repository type is corroborated by the learning context in `README.md:1–8` and demonstration screens, not used as proof of composition.

Clone checked in `data/samples/mfe-sample-001/repos/vigneshwaran-chandrasekaran__microfrontend/`. Rank, ID and SHA match the `cloned` row in `data/samples/mfe-sample-001/clones.csv:79`; `git rev-parse HEAD` returned the front matter SHA and `git cat-file -t` confirmed a commit. Complete 65-file inventory through `git ls-tree -r --name-only`, without gitlinks in the `git ls-tree -r` inventory. Citations were checked through `git show` and searches through `git grep`, always at the fixed SHA. No builds were run or external endpoints accessed.

The class and Yes answers below are supported by the five-unit federated core, independently of iframes. `frontend_units: 7` is a provisional descriptive count: five local applications and two external applications explicitly referenced in routes. Inclusion of these two references in the methodological count remains open to joint review; no claim is made that their sources, frameworks or builds are available in this candidate.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | `package.json:7–12` installs and builds the five projects separately, starts individual servers and copies results to distinct directories. The inventory contains the five projects with their own manifests and sources; these are not merely README names. | moderate |
| Configuration / Source code / Build/deploy (host) | `host/package.json:6–8` defines start/build; `host/webpack.config.js:49` defines entry; `host/src/index.js:7` loads bootstrap; `host/src/bootstrap.js:3–14` mounts the React application and its store. | moderate |
| Configuration / Source code / Build/deploy (React 1) | `react-mfe-1/package.json:6–8` defines start/build; `react-mfe-1/webpack.config.js:12–17` defines entry and port, and `:43–54` configures `reactMfe1`, `remoteEntry.js` and `./mount`. `react-mfe-1/src/bootstrap.js:3–14` mounts the standalone application; `react-mfe-1/src/mount.js:5–20` exports the function mounting the same application in the host-provided element. | strong |
| Configuration / Source code / Build/deploy (React 2) | `react-mfe-2/package.json:6–8` defines start/build; `react-mfe-2/webpack.config.js:11–16` defines entry and port, and `:42–47` configures `reactMfe2`, `remoteEntry.js` and `./mount`. `react-mfe-2/src/bootstrap.js:1–12` mounts the standalone application; `react-mfe-2/src/mount.js:1–16` exports mounting in the external element. | strong |
| Configuration / Source code / Build/deploy (Vue) | `vue-mfe/package.json:6–8` defines start/build; `vue-mfe/webpack.config.js:13–18` defines entry and port, and `:58–63` configures `vueMfe`, `remoteEntry.js` and `./mount`. `vue-mfe/src/bootstrap.js:2–5` mounts the standalone application; `vue-mfe/src/mount.js:5–13` creates and mounts the Vue application in the received element. | strong |
| Configuration / Source code / Build/deploy (Angular) | `angular-mfe/package.json:6–8` defines start/build; `angular-mfe/angular.json:12–22` connects the custom-webpack builder to federation configuration and entry `src/main.ts`. `angular-mfe/webpack.config.js:23–30` configures `angularMfe`, `remoteEntry.js` and `./mount`. `angular-mfe/src/main.ts:4–9` is standalone initialization; `angular-mfe/src/mount.ts:13–34` exports mounting with element creation and `AppModule` bootstrap. | strong |
| Composition / Configuration (host) | `host/webpack.config.js:30–46` defines four remotes, using subdirectory endpoints in production and local ports in development. Angular is loaded through `promise import(...)`; the others use named containers. `:79–89` actually passes `remotes` to `ModuleFederationPlugin`. Names and exposures match the four providers above. | strong |
| Composition / Source code (consumption) | `host/src/App.jsx:31–35` declares loaders with imports of `reactMfe1/mount`, `reactMfe2/mount`, `vueMfe/mount` and `angularMfe/mount`. `:48–69` resolves the module and calls `mount(container)`; `:177–188` connects each loader to a route rendering `MfeContainer`. Exposed modules are used, beyond configuration/dependency. | strong |
| Source code (interfaces) | `react-mfe-1/src/App.jsx:13–35` implements a counter; `react-mfe-2/src/App.jsx:13–60` implements a form and greeting; `vue-mfe/src/App.vue:7–31` renders theme selection, with state in `:35–57`; `angular-mfe/src/app/app.component.html:8–21` renders facts and a button connected to the component (`angular-mfe/src/app/app.component.ts:24–31`). Exposures mount application screens, not merely shared libraries. | strong |
| Structure / Source code (independence) | Inspected `from` references, side-effect imports, `import()` and `require()` in all `.js`, `.jsx`, `.ts` and `.vue` sources under the five `src/` directories: 26 relative specifiers, none resolving to another project. Non-relative specifiers are libraries and the four federated imports in `host/src/App.jsx:32–35`. Searched other manifests for project dependencies: none. Inspected Webpack configurations introduce no aliases to other units' sources; the Vue alias points to the Vue distribution (`vue-mfe/webpack.config.js:29–34`), and the Angular tsconfig defines no `paths` (`angular-mfe/tsconfig.json:3–22`). | absent |
| Composition / Source code (iframe) | `host/src/App.jsx:38–41` configures Route Map and Multibank on two external domains; `:95–103` renders `<iframe src={url}>`; `:190–197` connects each iframe to a route in the same shell. The mechanism is implemented, but its acceptance as MFE composition is an unresolved checklist decision. These applications' internal independence was not inspected. | ambiguous |
| Build/deploy | `package.json:9–12` builds the four remotes, then the host, and copies separate `dist` directories for publication. `vercel.json:2–5` uses this assembly and defines a SPA rewrite. Remote sources are not imported into the host build: it resolves federation endpoints at runtime (`host/webpack.config.js:30–46`). Each project also has its own `vercel.json` (`react-mfe-1/vercel.json:1–10`, with CORS on `/remoteEntry.js`; `host/vercel.json:1–7`). History shows publication changed from separate Vercel projects to a single domain: commits 027c8f7, 204f174 and 50e2db2 (2026-04-11, "fix: single-domain deployment - build all MFEs into one dist folder for Vercel"), retaining separate builds and `remoteEntry.js` files. Joint publication is an operational choice, not build-time composition (history read without modification). | moderate |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Five identifiable local units with their own entries/builds, including host and four providers. The four remotes are in effective configuration (`host/webpack.config.js:30–46`, `:79–89`) and host loaders (`host/src/App.jsx:31–35`). The two additional iframe references are unnecessary to satisfy the minimum of two units. |
| Q2 | Yes | All five federated-core units have their own entries, builds and bootstrap, individually recorded in the table; import inspection found no direct access to another unit's sources. For example, `react-mfe-1/package.json:6–8`, `react-mfe-1/webpack.config.js:12–17` and `react-mfe-1/src/bootstrap.js:3–14`. Host consumption uses federated names (`host/src/App.jsx:32–35`). This answer does not extrapolate independence to the two external iframe contents. |
| Q3 | Yes | The same host routes all four remotes and calls their mounting functions in the DOM container (`host/src/App.jsx:48–69`, `:177–188`), under `BrowserRouter` (`:207–211`). |
| Q4 | Yes | Module Federation actually connects `remotes`, exposures and consumption: `host/webpack.config.js:79–89`; `react-mfe-1/webpack.config.js:43–54`; `react-mfe-2/webpack.config.js:42–47`; `vue-mfe/webpack.config.js:58–63`; `angular-mfe/webpack.config.js:23–30`; `host/src/App.jsx:31–35`, `:59–62`. Federation supports this answer without deciding whether additional iframes satisfy Q4. |
| Q5 | Yes | The federated core satisfies Q1–Q4: independent units, common routes and calls to exposed functions mounting React, Vue and Angular (`host/src/App.jsx:31–69`, `:177–188`; mount functions documented in the table). This suffices to propose an MFE instance; iframe inclusion remains open and status is `review`. |

## Rationale

- `MFE-implemented` is proposed: Q1–Q5 are Yes based on the host and four federated remotes. Matches inclusion cases of a host/remotes monorepo, an example actually composing units and an implementation with multiple frameworks.
- It is not `MFE-unit`, since host and providers are present and connected; it is not merely code sharing, since exposures mount complete interfaces.
- Copying results to a publication directory is not taken as build-time package composition. These are separate builds and `remoteEntry.js` containers resolved at runtime, without direct remote-source imports (`package.json:9–12`; `host/webpack.config.js:30–46`; `host/src/App.jsx:32–35`).
- `approaches` records observed mechanisms: federation and iframe. The presence of `iframe` in the field does not resolve methodological eligibility. `ui_technologies` covers only inspected local units, without inferring external-site frameworks; the build uses Webpack, including Angular's custom-webpack integration.
- `unit_organization: monorepo` describes the local five-project core. There are also two external iframe endpoints. The provisional count of seven frontend references and characterization of additional composition require joint decision, as below. The “Six independent apps” number from `README.md:6–7` was not used as the count, since the tree contains five local applications and code references two more.

## Analysis notes

- **RQ1:** reciprocal configuration and mounting functions support the architecture; the README and repository name are not the decision's basis. The README's stated total differs from artifacts.
- **RQ2:** cross-framework federation with common contract `mount(element)`; two external incorporation paths through iframe coexist in the shell.
- **Protocol:** analysis is static at the recorded commit. It does not confirm build success, current endpoint operation or complete mounting/unmounting behavior; no acquisition/mining was initiated.

## Point for joint review

- **Iframe and count:** apply the still-unresolved methodological decision to Route Map and Multibank (`host/src/App.jsx:38–41`, `:95–103`, `:190–197`). There are two actual embedding routes, but their sources or builds were not inspected. Decide whether these references count as MFE units and whether the iframe approach enters the final architectural characterization.
- **Recording alternatives:** retain the descriptive count of seven units/references and characterize hybrid composition if iframes are accepted; or record five federated units and treat both iframes only as external context. `frontend_units: 7` and `approaches: [module-federation, iframe]` are provisional under `review`, not a new rule.
- **Rule suggested in 031:** annotation 031 suggests iframe counts when there is an explicit integration contract with the shell (registration, messages, routing). Here, iframes are simple external-URL embeds, without `postMessage` or route registration (`host/src/App.jsx:95–103`). If that rule is adopted, the record becomes `frontend_units: 5` and `approaches: [module-federation]`, with iframes only as context, equivalent to criterion 008 (host + remotes referenced through federation configuration). Setting 5 would already be possible without waiting for the decision, since the class and Q1–Q5 do not depend on it.
- **Proposed class:** the host + four-remotes core supports `MFE-implemented` and all Yes answers without depending on iframe acceptance. Confirm this framing in the joint decision and consolidate count/approaches; there is no Q5 override or promotion to `final` in this annotation.

---
schema: 1
id: 1116305586
full_name: webdevqadeer/frontend-development
url: https://github.com/webdevqadeer/frontend-development
commit: f8d264873c9182d4f3a0628f18f7618b019a2f79
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 083 — webdevqadeer/frontend-development

## Context

The snapshot contains a marketplace example in `react/mv-marketplace/`: a shell and four React applications (`admin`, `buyer`, `payment`, `seller`), plus the `mvp-theme` library. Workspaces and separate commands are in `react/mv-marketplace/package.json:4–18`. Remote configuration and consumption are present, but there is a case inconsistency in the shell entry, detailed below.

Read-only inspection of the commit recorded in `data/samples/mfe-sample-001/clones.csv:84`. The complete inventory through `git ls-tree -r --name-only f8d264873c9182d4f3a0628f18f7618b019a2f79` contains 4.633 files: 4.566 under `node_modules/` and 67 outside those directories. The unit count considers the five own targets in `apps/`, excluding vendored dependencies and the library. The local references `main`, `origin/main` and `origin/HEAD` point to the same commit; recorded only as context, without expanding the snapshot.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | The five application workspaces and the library are declared in `react/mv-marketplace/package.json:4–10`. `react/mv-marketplace/package.json:15` runs each application build separately; `react/mv-marketplace/apps/shell/package.json:6–10`, `react/mv-marketplace/apps/admin/package.json:6–10`, `react/mv-marketplace/apps/buyer/package.json:6–10`, `react/mv-marketplace/apps/payment/package.json:6–10` and `react/mv-marketplace/apps/seller/package.json:6–10` contain their own Vite scripts. | moderate |
| Source code / Technology | Each application has an entry with `createRoot` and an App component: `react/mv-marketplace/apps/admin/src/main.jsx:1–9`, `react/mv-marketplace/apps/buyer/src/main.jsx:1–9`, `react/mv-marketplace/apps/payment/src/main.jsx:1–9`, `react/mv-marketplace/apps/seller/src/main.jsx:1–9` and `react/mv-marketplace/apps/shell/src/main.jsx:1–9`. The remotes render their own interfaces in `react/mv-marketplace/apps/admin/src/App.jsx:1–2`, `react/mv-marketplace/apps/buyer/src/App.jsx:2–9`, `react/mv-marketplace/apps/payment/src/App.jsx:1–2` and `react/mv-marketplace/apps/seller/src/App.jsx:4–5`. | moderate |
| Configuration (host) | The shell instantiates the federation plugin and points `buyer_app`, `seller_app`, `admin_app` and `payment_app` to four `remoteEntry.js` files on ports 5001–5004; it shares React and ReactDOM in `react/mv-marketplace/apps/shell/vite.config.js:9–18`. | strong |
| Configuration (remotes) | There are concrete exposures of `./App` from `./src/App.jsx`, with `remoteEntry.js` and corresponding preview ports: `react/mv-marketplace/apps/admin/vite.config.js:8–20`, `react/mv-marketplace/apps/buyer/vite.config.js:8–20`, `react/mv-marketplace/apps/payment/vite.config.js:8–18` and `react/mv-marketplace/apps/seller/vite.config.js:8–18`. | strong |
| Composition / Source code | `react/mv-marketplace/apps/shell/src/router.jsx:4–7` imports the four federated modules with `React.lazy`; `react/mv-marketplace/apps/shell/src/router.jsx:11–17` places them in routes `/`, `/seller`, `/admin` and `/payment`. `react/mv-marketplace/apps/shell/src/app.jsx:1–9` imports this router and inserts it in the layout. There is consumer code, beyond configuration and dependency. | strong |
| Source code (entry chain) | `react/mv-marketplace/apps/shell/index.html:11` loads `main.jsx`, but `react/mv-marketplace/apps/shell/src/main.jsx:3` imports `./App.jsx`. The Git inventory records only `react/mv-marketplace/apps/shell/src/app.jsx`, whose component is in `react/mv-marketplace/apps/shell/src/app.jsx:5–15`; the exact query for `apps/shell/src/App.jsx` under the same prefix returns no file. On case-sensitive systems, this entry does not reach the router as written. No build was run and the filesystem used by the author was not assumed. | ambiguous |
| Structure / Configuration (library) | `react/mv-marketplace/packages/mvp-theme/vite.config.js:7–16` defines an ES/UMD library build, and `react/mv-marketplace/packages/mvp-theme/src/index.js:1` re-exports a Button. `react/mv-marketplace/apps/shell/vite.config.js:16` also declares a generic remote `package` on port 5005, repeated in the remotes, but the library does not configure federation. No sixth frontend application associated with this declaration was identified. | context |
| Source code (negative search) | Audit of all imports in own `.js`/`.jsx` files under `react/mv-marketplace/apps/*/src/`: the eight relative imports remain within their respective application; there is no direct source-code import from another application. The only external unit imports are the four in `react/mv-marketplace/apps/shell/src/router.jsx:4–7`. `package/` and `mv-theme` were also searched in this scope, without consumption found; the port 5005 declaration does not support another actually composed unit. | absent |
| Configuration / Source code (negative search) | `git grep` at the commit, in `react/mv-marketplace/apps/` and `react/mv-marketplace/packages/mvp-theme/src/`, searched for `<iframe`, `postMessage`, `srcDoc`, `single-spa`, `registerApplication`, `registerMicroApps`, `customElements.define`, `importmap` and `import-map`; no results. The observed composition depends on the federated imports already cited. | absent |
| Documentation | `react/mv-marketplace/apps/shell/README.md:1–8` is generic React + Vite text. This README, the repository name or the plugin dependency alone is not used to confirm MFE. | context |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Five own targets, with an explicit composition relationship: workspaces in `react/mv-marketplace/package.json:6–10`, four remotes in `react/mv-marketplace/apps/shell/vite.config.js:12–15` and consumption in `react/mv-marketplace/apps/shell/src/router.jsx:4–17`. The library and `node_modules/` are not additional units. |
| Q2 | Yes | Own entries in `react/mv-marketplace/apps/admin/src/main.jsx:1–9`, `react/mv-marketplace/apps/buyer/src/main.jsx:1–9`, `react/mv-marketplace/apps/payment/src/main.jsx:1–9`, `react/mv-marketplace/apps/seller/src/main.jsx:1–9` and `react/mv-marketplace/apps/shell/src/main.jsx:1–9`; separate builds in `react/mv-marketplace/package.json:15`. The audit of own imports found no direct source imports between applications. The shell entry inconsistency is recorded in Q4, without erasing its existence as a separate target. |
| Q3 | Yes | The shell brings the four interfaces together in routes of the same application in `react/mv-marketplace/apps/shell/src/router.jsx:11–17`; its component incorporates the router in `react/mv-marketplace/apps/shell/src/app.jsx:1–9`. This answer identifies the explicit relationship in code, without asserting successful execution. |
| Q4 | Yes | The shell declares and consumes the four remotes through Module Federation (`react/mv-marketplace/apps/shell/vite.config.js:9–18`; `react/mv-marketplace/apps/shell/src/router.jsx:4–17`). The case difference between `App.jsx` and `app.jsx` is a portability defect, but does not invalidate the implemented composition mechanism. |
| Q5 | Yes | Host, remotes, exposures and dynamic consumption are implemented; the set satisfies the MFE classification. |

## Rationale

- The `MFE-implemented` rule applies: Q1–Q5 are Yes after joint review.
- The code corresponds to an example shell with its own remotes and separate builds. The components are minimal demonstration interfaces; their exposures and routes are implemented in project files, not merely as teaching content in documentation. Therefore the exclusion of targets without a composition relationship in precedents 023/028 does not apply.
- It is not MFE-unit: the host itself is present. Nor is it a plugin whose only host is a third-party platform. The ES/UMD library is used neither to support build-time composition nor to increase the unit count.

## Analysis notes

- **RQ1:** federated imports and routes support the composition intent and code; the mismatch between the imported path and recorded name prevents assuming execution of this chain in every environment. Dependencies were not installed, services were not run and files were not corrected.
- **Protocol:** there is architectural similarity to `docs/mfe-classification/045-mrgleam__mf-tanstack-demo.md` and `docs/mfe-classification/070-viernesviernes__EmerTech-Lab-Assignment-3.md` (React/Vite, shell and remotes). Searching annotations for `webdevqadeer`, `mv-marketplace`, `mvp-theme` and `multi.vendor` found no indication of a previously recorded family. The generic README does not demonstrate common origin or template duplication.

- **Evidence for the Q4 decision (independent review, checked at the commit):** `node_modules/` is versioned and contains only native Windows binaries (`@esbuild/win32-x64`, `@rollup/rollup-win32-x64-gnu` and `-msvc`, `@swc/core-win32-x64-msvc`, in `react/mv-marketplace/node_modules/`), without linux/darwin equivalents. This indicates that the author installed and built on Windows, a case-insensitive filesystem, where `./App.jsx` opens `app.jsx`. The shell’s `main.jsx` has the same blob as the other four apps (unchanged Vite template). By inference, the defect concerns portability rather than a missing connection; no observed execution confirms it.
- **Observations without effect on Q4:** (R1) remote `payment` uses `name: "payment-app"` (`apps/payment/vite.config.js:9`), whereas the host calls it through `payment_app` (`apps/shell/vite.config.js:15`; `router.jsx:7`), which the federation plugin tends to resolve by key and URL, ambiguous strength. (R2) The remotes only fix the port in `preview`, and the root `dev:apps` script (`package.json:18`) runs `vite` in development; this is an operational flow detail. (R3) Remote `package` (localhost:5005) is declared in the shell and remotes, but no target serves or imports it: a dead declaration.

## Recorded decision

Promote to **MFE-implemented**. The shell configures four remotes, each remote exposes its application through `remoteEntry.js`, and the shell imports them dynamically in routes. The discrepancy between `App.jsx` and `app.jsx` is recorded as a portability defect, without undoing the evidence of Module Federation composition.

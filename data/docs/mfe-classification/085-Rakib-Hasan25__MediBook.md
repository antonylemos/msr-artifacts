---
schema: 1
id: 1166034786
full_name: Rakib-Hasan25/MediBook
url: https://github.com/Rakib-Hasan25/MediBook
commit: 57e8016c1157757418d01cbd6e3646e1ec87ee1c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 085 — Rakib-Hasan25/MediBook

## Context

Medical appointment system with two own React targets: the main application in `frontend/` and a simulated payment gateway in `payment-system-frontend/`. The main application opens the second in another tab and passes identifiers through the query string; neither frontend is mounted inside the other. The decision about this navigation as MFE composition remains open. Type `example` records the demonstration gateway flow, with explicit success, failure and delay actions (`payment-system-frontend/src/App.tsx:184–227`; `README.md:58–62`), without asserting that the observed system is in production.

Commit checked against `data/samples/mfe-sample-001/clones.csv:86`. The complete inventory through `git ls-tree -r --name-only 57e8016c1157757418d01cbd6e3646e1ec87ee1c` contains 29.266 files: 29.156 under `frontend/node_modules/` and 110 outside `node_modules/`. Cited paths are relative to the snapshot root. `frontend/dist/` is output of the same application, not another unit. `backend/` and `firebase-functions/doctor-approval/functions/` provide services; their functions are not frontend units. `frontend_units: 2` counts only the two identified own targets.

The local references `main`, `origin/main` and `origin/HEAD` point to the same pinned commit; recorded only as context. No other snapshots or remote queries were used.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure / Build/deploy | There are two own manifests, with separate builds: `frontend/package.json:6–11` and `payment-system-frontend/package.json:6–11`. Each target mounts its App through `createRoot`: `frontend/src/main.tsx:1–11` and `payment-system-frontend/src/main.tsx:1–10`. Hosting configurations are also their own in `frontend/apphosting.yaml:5–7` and `payment-system-frontend/apphosting.yaml:5–7`. | moderate |
| Technology / Configuration | Both use React and Vite in their respective configurations: `frontend/vite.config.ts:1–15` and `payment-system-frontend/vite.config.ts:1–14`. Each `@` alias resolves its own `src`; these files contain no federation configuration. The mere presence of two projects does not confirm MFE. | context |
| Source code (main app) | `frontend/src/App.tsx:3–9` imports local pages; `frontend/src/App.tsx:142–179` registers local routes, including doctor details at `/dashboard/patient/:doctorId`. `frontend/src/App.tsx:184–190` mounts the router and authentication context. The gateway is neither imported nor mounted in this tree. | context |
| Source code (connection between targets) | `frontend/src/pages/PatientDoctorDetails.tsx:63–71` creates `slotid`, `userid` and `patientid` and calls `window.open` with `VITE_PAYMENT_GATWAY_URL`, target `_blank` and `noopener,noreferrer`. The actual button calls the handler in `frontend/src/pages/PatientDoctorDetails.tsx:178–184`. `frontend/apphosting.yaml:15–19` configures the gateway URL. Navigation is implemented, not merely mentioned as integration. | ambiguous |
| Source code (received contract) | `payment-system-frontend/src/App.tsx:19–29` reads identifiers from the query string, accepting the lowercase variants sent by the main application. `payment-system-frontend/src/App.tsx:31–53` uses these values to load the payment session. This connects the two targets to the same booking flow; it does not by itself demonstrate interface composition. | ambiguous |
| Source code (service integration) | `payment-system-frontend/src/services/paymentGatewayService.ts:42–65` queries `/payment-gateway/session`; `payment-system-frontend/src/services/paymentService.ts:38–48` initiates payment over HTTP. `backend/src/index.js:31–33` registers domain APIs, and `backend/src/routes/paymentGateway.js:10–13` and `backend/src/routes/paymentGateway.js:37–40` implement the endpoints. Shared API integration is distinct from loading a frontend unit. | context |
| Source code (simulation) | `payment-system-frontend/src/App.tsx:90–115` starts payment and sends the selected action; `payment-system-frontend/src/App.tsx:204–227` exposes success, failure and delay buttons. `payment-system-frontend/src/services/paymentActionService.ts:15–22` calls the payment function over HTTP. These are services and business effects, without a UI mounting channel in the main app. | context |
| Architecture documentation | `README.md:15–25` calls the system micro-frontends/microservices and distinguishes a main frontend from another simulating a third-party gateway. `README.md:19` references `assets/architecture-image.png`; the figure was inspected at the commit and shows the two frontends separately, together with API, functions and Firebase services. `README.md:45–66` describes booking, gateway and webhook flow. This documentation contextualizes the observed navigation, but MFE terminology alone does not confirm the class. | context |
| Documentation (templates) | `frontend/README.md:1–8` and `payment-system-frontend/README.md:1–8` retain generic React + TypeScript + Vite text. Scaffold content demonstrates neither a shared family with another candidate nor composition implementation. | context |
| Source code (negative coupling search) | Static/dynamic imports and re-exports were audited in 36 `.ts`, `.tsx` and `.js` files in both frontend directories, excluding `node_modules/` and `dist/`: no relative import crosses a target boundary to the other; `@/` imports resolve to local sources according to `frontend/vite.config.ts:10–13` and `payment-system-frontend/vite.config.ts:9–12`. No named import of the other application was found. | absent |
| Technology / Configuration / Source code (negative composition search) | All own `.ts`, `.tsx`, `.js`, `.json`, `.yaml`, `.html` and `.md` files in the snapshot, excluding `node_modules/`, `dist/` and `package-lock.json`, were searched for `ModuleFederation`, `module.federation`, `remoteEntry`, `exposes:`, `remotes:`, `single-spa`, `registerApplication`, `registerMicroApps`, `qiankun`, `wujie`, `customElements.define`, `importmap`, `import-map`, `postMessage`, `<iframe` and `srcDoc`: no results. The concrete evidence of frontend-to-frontend connection is opening by URL, not one of these mechanisms. | absent |
| Composition (negative return channel search) | Own code/configuration/documentation files, excluding dependencies, builds and lockfiles, were searched for `window.open`, `window.location`, `location.href`, `location.assign`, `returnUrl`, `callbackUrl` and `redirect`. The main-to-payment connection found is `frontend/src/pages/PatientDoctorDetails.tsx:71`; in the gateway, reception occurs through `window.location.search` in `payment-system-frontend/src/App.tsx:20`. No navigation callback back to the main application was found. No `postMessage` was found in this scope either; there is no evidence of an inter-window communication contract beyond input parameters. | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | There are two physical targets, but the gateway is presented as a simulated external application; opening a new tab does not establish units of the same composite application. |
| Q2 | No | Separate builds are insufficient without an accepted MFE composition relationship between the targets. |
| Q3 | No | The main application only opens an external URL in a new tab (`frontend/src/pages/PatientDoctorDetails.tsx:63–71`); it neither mounts the gateway nor includes it in its routes. |
| Q4 | No | There is no federation, iframe, import map, cross-mounting or inter-window communication channel; URL input parameters do not constitute a composition mechanism. |
| Q5 | No | The flow is business integration through navigation to a simulated external gateway, not an application composed of frontend units. |

## Rationale

- The `Non-MFE` rule applies: the relationship between the two applications is navigation to another tab, not frontend unit composition.
- `approaches: []` remains correct: no MFE mechanism was observed. URL parameters provide the gateway input contract, without federation, iframe, import map, host or inter-window communication.
- Separate builds and functional identifier passing demonstrate business integration, but do not change the absence of composition. The term “micro-frontends” in the README does not replace architectural evidence.

## Analysis notes

- **RQ1:** the 29.156 files under `frontend/node_modules/` were excluded from own evidence counts and searches. The bundle under `frontend/dist/` does not increase `frontend_units` either. No build or service was run in this inspection.
- **RQ1 (documentation):** the inventory was searched for `docs/`, `adr/` and `adrs/` directories and ADR files, without own artifacts found. Available architecture documentation is the README and its images (`README.md:15–25`, `README.md:45–66`); the architecture figure was inspected as context, without using the drawing as isolated proof of composition.
- **Protocol:** searching existing annotations for `MediBook` and `Rakib-Hasan25` found no previously recorded family. Internal READMEs indicate React/TypeScript/Vite scaffold, without evidence of common origin with a specific candidate. There is methodological proximity to the open link-only/iframe decision in `docs/mfe-classification/031-Scouterna__j26-tags.md`, but that precedent has a shell contract through iframe and messages, absent here; it is not evidence of a shared family or template.

## Recorded decision

Promote to **Non-MFE**. The main application opens the simulated gateway in another tab, with URL parameters, but neither loads it into a host nor maintains an interface integration channel. This characterizes navigation and business flow integration with an external application, not micro-frontend composition.

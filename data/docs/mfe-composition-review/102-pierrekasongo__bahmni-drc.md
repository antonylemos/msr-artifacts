---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 102 — pierrekasongo/bahmni-drc

## Repository overview

A local Bahmni/OpenMRS distribution: the snapshot contains Bahmni's AngularJS frontend
(`openmrs-module-bahmniapps/ui`), backends, configurations and the Compose assembling the services. The
only snapshot frontend unit is `openmrs-module-bahmniapps/ui`, a set of AngularJS pages
(clinical, adt, bedmanagement, registration etc.) served by Apache. Micro frontend composition
resides in a React bridge (`openmrs-module-bahmniapps/micro-frontends`), which the structural
review does not count as a unit: Webpack builds it into
`ui/app/micro-frontends-dist` (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:21-25`),
and host pages load it through `<script>` (`openmrs-module-bahmniapps/ui/app/clinical/index.html:92-96`).
Hence the bridge does not appear as Source: relationships originate from `openmrs-module-bahmniapps/ui`,
which uses the components.

The host is a Module Federation container (`name: "bahmni_mfe_host"`, `exposes: {}`,
`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40`) consuming a single remote,
`bahmni_ipd`, under alias `@openmrs-mf/ipd` (`:38`). The `remoteEntry.js` URL is assembled at
runtime under the page's origin, at `/ipd/remoteEntry.js` (`:113-135`); the proxy forwards `/ipd`
to the `ipd` service (`bahmni-proxy/resources/bahmni-proxy.conf:31-33`), running the external image
`bahmni/microfrontend-ipd` (`docker-compose.yml:586-593`, tag `1.0.0` in `.env:193`). The remote has
no sources in the snapshot. Two of its modules are consumed (`IpdDashboard`, `CareViewDashboard`),
wrapped in React and registered as AngularJS components with `react2angular`
(`openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:19-34`); host pages mount the
tags on the clinical application's IPD route and the adt and bedmanagement `careViewDashboard` route,
passing `host-data`/`host-api`.

The registration application also has an extension point opening an iframe with `src` from
configuration and listening for `message` from the embedded window
(`openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21`, `:35-54`).
No snapshot configuration declares this extension point, so target and sender remain
unidentified. What did not become a relationship: the same bridge's `next-ui` bundle registers only local
components (`openmrs-module-bahmniapps/micro-frontends/src/next-ui/index.js:1-39`); loading bridge
bundles through the pages (`openmrs-module-bahmniapps/ui/app/clinical/index.html:95`) is internal to the
host; other iframes (gallery PDF, printing, vendored library) do not load units.
The purpose is a product (clinical distribution), with MFE architecture inherited from upstream Bahmni.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | openmrs-module-bahmniapps/ui | bahmni_ipd | host → remote | source → target | module-federation | No | Yes | openmrs-module-bahmniapps/micro-frontends/webpack.config.js:34-40 (`ModuleFederationPlugin` `bahmni_mfe_host`, remote `@openmrs-mf/ipd` → `bahmni_ipd`, `exposes: {}`); openmrs-module-bahmniapps/micro-frontends/webpack.config.js:113-135 (URL `/ipd/remoteEntry.js` under the page origin, proxy for `get`/`init`); bahmni-proxy/resources/bahmni-proxy.conf:31-33 (`ProxyPass /ipd http://ipd/ipd`); docker-compose.yml:586-593 (service `ipd`, image `bahmni/microfrontend-ipd`); .env:193 (`IPD_TAG=1.0.0`) | openmrs-module-bahmniapps/micro-frontends/webpack.config.js:119; openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38; openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6; openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21; openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:31; openmrs-module-bahmniapps/ui/app/clinical/app.js:328; openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1; openmrs-module-bahmniapps/ui/app/adt/app.js:55; openmrs-module-bahmniapps/ui/app/bedmanagement/app.js:137 |
| 2 | openmrs-module-bahmniapps/ui | org.bahmni.registration.identifier | page → embedded-frontend | source → target | iframe | Undetermined | Undetermined | — | openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93 |
| 3 | openmrs-module-bahmniapps/ui | org.bahmni.registration.identifier | communication | Undetermined | events | Undetermined | Undetermined | — | openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39 |

## Observations

**1. openmrs-module-bahmniapps/ui → bahmni_ipd.** The target is named as it appears in
configuration, `bahmni_ipd` (`openmrs-module-bahmniapps/micro-frontends/webpack.config.js:38`): the
snapshot lacks the remote configuration (`name`, `exposes`) needed to check it. `In snapshot = No`
because the remote is identified as external: the `/ipd` path in the URL assembled at `:115-121` is
forwarded to the `ipd` service (`bahmni-proxy/resources/bahmni-proxy.conf:31-33`), using the published
image `bahmni/microfrontend-ipd:${IPD_TAG}` (`docker-compose.yml:586-588`); the volume that
would point to local sources is commented out (`:591-592`). The Source is `openmrs-module-bahmniapps/ui`,
not the bridge: the bridge lines (config, `lazy(() => import("@openmrs-mf/ipd/..."))` in
`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:6` and
`openmrs-module-bahmniapps/micro-frontends/src/ipd/CareViewDashboard.jsx:6`,
`react2angular` registration in `openmrs-module-bahmniapps/micro-frontends/src/ipd/index.js:21` and `:31`) reside
in a `No` directory in the structural review, and the unit loading and mounting the remote is the host, through
module `bahmni.mfe.ipd` included in `openmrs-module-bahmniapps/ui/app/clinical/init.js:7-9` and the
tags in `openmrs-module-bahmniapps/ui/app/clinical/common/views/visitIpd.html:1`,
`openmrs-module-bahmniapps/ui/app/adt/app.js:55` and `openmrs-module-bahmniapps/ui/app/bedmanagement/app.js:137`.
Both consumed exposures (`IpdDashboard`, `CareViewDashboard`) belong to the same remote and form
one row. Direction goes from host to remote; the `hostData`/`hostApi` contract passes data and
callbacks from host to remote UI (`openmrs-module-bahmniapps/micro-frontends/src/ipd/IpdDashboard.jsx:20-28`),
part of this loading rather than message communication. `Active = Yes` through the `Yes`
source code review lines.

**2. openmrs-module-bahmniapps/ui → org.bahmni.registration.identifier.** The iframe
`extension-popup` (`openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93`)
receives `src` from the application configuration's `org.bahmni.registration.identifier` extension point
(`openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21`,
`:35-37`). The target takes the extension point's name, the only identifier appearing in the
artifact. No snapshot file declares this point (search returns only the controller and its
test), so whether the content is a local or external unit is unknown: `In snapshot = Undetermined`.
`Active = Undetermined` because the only code line is `Undetermined`.

**3. openmrs-module-bahmniapps/ui → org.bahmni.registration.identifier.** The host registers
`$window.addEventListener("message", ...)` when opening the popup and, with the received `patient` or `patientUuid`,
fills the form or navigates
(`openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39-54`). The
Source is `openmrs-module-bahmniapps/ui`, the only structural review unit participating in the exchange;
the Target is the iframe content from relationship 2, named as there. The host only receives: there is no
`postMessage` from the host to the embedded window in `openmrs-module-bahmniapps/ui/app/registration`,
ruling out `bidirectional`, and the receiving Source is not the sender, ruling out
`source → target`. The expected sender is the embedded window, but the handler checks neither
`source` nor `origin` of the message (`openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39-40`), and the extension
point content cannot be resolved in the snapshot, so the sender is not established: `Direction = Undetermined`.
`In snapshot = Undetermined` because the Target is the same unresolved extension point as relationship 2;
`Active = Undetermined` because the only code line is `Undetermined`.

## Summary

Relationships: 3 (host → remote: 1, page → embedded-frontend: 1, communication: 1). Active: 1. Target outside the snapshot: 1.
Units without a relationship: none.


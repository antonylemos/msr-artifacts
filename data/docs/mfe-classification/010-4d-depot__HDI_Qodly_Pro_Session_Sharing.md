---
schema: 1
id: 1104280056
full_name: 4d-depot/HDI_Qodly_Pro_Session_Sharing
url: https://github.com/4d-depot/HDI_Qodly_Pro_Session_Sharing
commit: d48ce168ca0299322a5227d1c5cc506c8daeb3b1
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: no }
repo_type: example
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-14
---

# 010 — 4d-depot/HDI_Qodly_Pro_Session_Sharing

## Context

- **Repository type:** example/proof of concept (4D "HDI", How Do I, demo about session sharing between 4D and Qodly)
- **Classification:** Non-MFE (through Q5, with justification; requires joint review)

The repository is a 4D project (database + 4D language) with a Qodly page (4D's low-code web platform). There is no `package.json` or project-authored JavaScript source code. Two structures resemble frontend composition:

1. **4D web area → Qodly page:** a 4D desktop form embeds the Qodly page in a web area, sharing the session through OTP.
2. **Qodly custom components:** two precompiled widgets (map and rating) from the "Qodly Team", distributed as Module Federation remotes and loaded by the Qodly renderer, which is the platform and is outside the repository.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Technology | No `package.json`; 4D project (`Project/warehouse_locator.4DProject`, `Project/Sources/**/*.4dm`) | absent |
| Configuration (composition) | `Project/Sources/Shared/CustomComponents/manifest.json:2-27`: two components, `qodly_map` 0.4.6 and `qodly_rating` 0.3.0, each with `scope`, `module: "components"`, `remoteEntryFileName: "components.js"` and a `url` under `/$shared/CustomComponents/...`; author "Qodly Team" (`:6-9`, `:19-22`) | moderate |
| Build/deploy (artifacts) | `CustomComponents/qodly_*/components.js` + `assets/*__loadShare__*`, `*__mf_v__runtimeInit__*`, `virtualExposes-*.js`, `hostInit-*.js`: compiled Module Federation output (Vite), without source in the repository (technology) | moderate |
| Composition (use) | `Project/Sources/WebForms/warehouses.WebForm:776` uses `SingleMap` and `:857`/`:896` uses `Rating`; the Qodly page consumes remote widgets | moderate |
| Composition (host) | Remotes are loaded by the Qodly renderer (`/$lib/renderer/`), part of the 4D platform, not the repository | context |
| Source code (desktop embedding) | `Project/Sources/Forms/Home/form.4DForm:88-99`: `webArea` object `warehouseDetails`; `ObjectMethods/warehouseDetails.4dm:7-10`: `authentify`, `getOTP` and `WA OPEN URL` to `http://localhost/$lib/renderer/?w=warehouses&$4DSID=<otp>`; `ObjectMethods/warehouseList.4dm:12`: `WA EXECUTE JAVASCRIPT FUNCTION(… "Qodly.setSource" … "warehouseId" …)` | moderate |
| Source code (session) | `Project/Sources/Methods/getOTP.4dm:12` `Session.createOTP(60)`; `Methods/authentify.4dm:5-6` sets session privileges | moderate |
| Structure | One Qodly page (`WebForms/warehouses.WebForm`) and one 4D desktop form (`Forms/Home`); `WebFolder/index.html` is the default 4D server page | ambiguous |
| Build/deploy | No CI/CD; everything is served by the same 4D server | contrary |
| Documentation | `README.md:1-3` points to a 4D blog post and explains how to open the project in 4D; no mention of micro-frontends | absent |

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | The Qodly page + the two remotes (`qodly_map`, `qodly_rating`) referenced by the composition config (`CustomComponents/manifest.json:2-27`) |
| Q2 | Yes | Widgets have their own build and version (precompiled by the Qodly Team, `manifest.json:4,17`); no source code imports. Caveat: they are vendored and served by the same server, without separate deployment. |
| Q3 | Yes | Widgets are rendered on the same page (`warehouses.WebForm:776,857`) by the Qodly renderer |
| Q4 | Yes | MF remotes (`components.js`, `loadShare`, `runtimeInit`) registered in the manifest and used on the page |
| Q5 | **No** (override) | See rationale below |

## Rationale for Q5

The checklist is literally satisfied for Q1–Q4, but the evidence does not support an MFE architecture:

- **The units are widgets, not parts of the application.** `qodly_map` and `qodly_rating` are reusable third-party UI components (author "Qodly Team"), equivalent to a component library. They do not decompose the application's frontend into parts with their own responsibilities.
- **MF is the platform's plugin mechanism, not an architectural choice of the repository.** The host is the Qodly renderer, and remotes are compiled artifacts copied into the project. The repository does not configure federation; it only consumes the low-code platform's extension mechanism.
- **Closest Non-MFE cases:** "component libraries using Web Components" (here through MF) and "Module Federation used only for code sharing, not for composing frontend units".
- **The 4D web area does not change the picture.** It is a 4D desktop app embedding a web page in a webview, which falls under the unresolved decision "link-only or iframe composition". The 4D form is also not a web frontend unit.

## Rationale

- Q5 is No by override, so the repository is Non-MFE.
- The repository is a 4D ↔ Qodly session-sharing demo, and MF signals come from platform artifacts.

## Analysis notes

- **RQ1 (misleading signals):** compiled artifacts with MF names (`__loadShare__`, `remoteEntryFileName`) appear without any project-authored federation config. An automatic search for these terms would produce a false positive.

## Point for joint review

- The Q5 override must be reviewed jointly under the checklist rules.
- If the case recurs (low-code platforms or CMSs using MF or Web Components as a plugin mechanism), it should become an explicit rule, for example: "plugins/extensions loaded through an external platform's mechanism, without project-authored composition configuration, are Non-MFE".
- The 4D web area with OTP depends on the unresolved decision about iframe/webview.

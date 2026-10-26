---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Repository overview

English documentation: root README.rst, eight decisions in docs/decisions/, src/generic/ and src/shared/ READMEs and thirty src/plugin-slots/ READMEs. All documents mined as `documentation` and snapshot README.rst, although not listed with that type, were read. README identifies Learning MFE, describes Tutor-integrated development and refers deployment to general Open edX documentation (README.rst:9-11, :24-28, :128-133). Reference specifies no hosting and demonstrates no deployment: review 3.4.6 #1 records separate build/deployment not observed. Documentation does not explain concrete Discussions MFE relationship found by review 3.4.5 #1 in tab/sidebar iframes (src/course-home/discussion-tab/DiscussionTab.jsx:20-23; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:23, :40-41; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:21, :26-27).

ADRs mainly concern application internals, APIs, Redux, tests and course-content navigation. ADR “units” are pedagogical content units rather than frontend applications: XBlock HTML comes from LMS URL (src/courseware/course/sequence/Unit/urls.ts:26), entering ContentIFrame (src/courseware/course/sequence/Unit/ContentIFrame.jsx:55-77), per distinction already recorded in 3.4.4. Thus `doc-integration-technology` occurrences at docs/decisions/0002-courseware-page-decisions.md:16, :22, :40 and docs/decisions/0009-courseware-api-direction.md:21, :48 remain here as embedded-content descriptions/future intentions rather than frontend-unit composition claims. `doc-mfe-term` occurrences at docs/decisions/0002-courseware-page-decisions.md:22, :24, :51, docs/decisions/0003-course-home-decisions.md:5, docs/decisions/0006-thunk-and-api-naming.md:7 and docs/decisions/0008-liberal-courseware-path-handling.md:24, :37 use MFE as application name in internal decisions/plans. They claim no new inter-application boundaries/independence.

Also excluded from table: `doc-mfe-term` occurrences at src/generic/README.md:3, :7 and src/shared/README.md:3 describe internal component reuse and possible future extraction without demonstrating a library shared by two units. Slot READMEs describe Learning MFE extension points, props, defaults and env.config.jsx examples; code blocks are examples rather than active configuration. General extensibility appears in claim 5. Specifically, `doc-integration-technology` occurrences at src/plugin-slots/ContentIFrameErrorSlot/README.md:1, :3, :9, :20, src/plugin-slots/ContentIFrameLoaderSlot/README.md:1, :3, :6, :14, :22, :30, :36 and src/plugin-slots/README.md:5 are titles, identifiers, functional content error/loading descriptions and examples rather than inter-application integration claims. Annotated tree docs/decisions/0007-testing.md:40-47 organizes fixtures/data access within courseware without dividing frontend units. No tool template document occurs among texts read.

Comments/descriptive fields read in package.json, catalog-info.yaml, Makefile, webpack.dev.config.js, webpack.prod.config.js, example.env.config.jsx, .env, .env.development, .env.test, .dockerignore, .npmignore, public/index.html and all .github/workflows/ workflows, plus src/index.jsx, src/tab-page/TabPage.jsx, src/generic/PageNotFound.jsx, src/generic/hooks.js, src/plugin-slots/HeaderSlot/index.jsx, src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx and three discussion components cited above. Also read comments in src/courseware/course/sequence/Unit/ContentIFrame.jsx and urls.ts. catalog-info.yaml:8 description repeats claim 1; package.json:4 merely names application. src/generic/hooks.js:25-28, :42-45 comments describe message callbacks/iframe height, while ContentIFrame.jsx:9-17 explains external-content permissions without naming another inter-unit relationship. Other comments concern translation, tools, variables or issue management. Build environment configuration (README.rst:144) and local module examples (README.rst:103-126) remain configuration/development context without demonstrating effective inter-application sharing.

## Claims

| # | Document | Claim | Theme | Corroboration | Evidence |
|---|---|---|---|---|---|
| 1 | README.rst:9-11 | "This is the Learning MFE (micro-frontend application)" | structure | corroborated | 3.4.3 (unit `.`); 3.4.5 #1; src/index.jsx:98-102; src/course-home/discussion-tab/DiscussionTab.jsx:20-23 |
| 2 | README.rst:52-54 | "it should be excluded from the `mfe` container that otherwise runs every MFE" | build-deploy | uncorroborated | — |
| 3 | README.rst:60-61 | "This command will start the LMS and Studio, and other required MFEs like `authn` and `account`" | independence | uncorroborated | — |
| 4 | README.rst:62-63 | "the learning MFE, which we're going to run on the host instead of in a container managed by Tutor" | independence | corroborated | 3.4.6 #1; package.json:18-20; webpack.dev.config.js:2-4 |
| 5 | README.rst:137-139 | "This MFE can be customized using Frontend Plugin Framework" | composition | corroborated | 3.4.2 (@openedx/frontend-plugin-framework, configured `Yes`); package.json:48; src/plugin-slots/HeaderSlot/index.jsx:2, :9-28; src/generic/PageNotFound.jsx:8, :20 |
| 6 | README.rst:145-147 | "All micro-frontends have a shared set of required environment variables" | other | partial | package.json:41; .env:6-8, :26-28, :40, :51; .env.development:6-8, :25-27, :50-51; src/index.jsx:166-199 |
| 7 | src/plugin-slots/FooterSlot/README.md:12 | "The implementation of the `FooterSlot` component lives in the `frontend-component-footer` repository" | structure | corroborated | package.json:37; src/tab-page/TabPage.jsx:8, :84; src/generic/PageNotFound.jsx:6, :44 |

## Observations

**1. README.rst:9-11.** Learning MFE identification repeats at catalog-info.yaml:8 and, compared with other platform MFEs, README.rst:131-133. Review 3.4.3 finds one local application, and 3.4.5 #1 confirms composition participation: discussion route renders DiscussionTab (src/index.jsx:98-102), embedding Discussions MFE through URL (src/course-home/discussion-tab/DiscussionTab.jsx:20-23). “MFE” here does not imply multiple local applications in snapshot.

**2. README.rst:52-54.** Text attributes joint MFE execution to Tutor `mfe` container, instructing removal of Learning. Snapshot has no Tutor/container configuration confirming or contradicting organization. Tutor recommendation at README.rst:24-28 and command at :67 are instructions rather than deployment artifacts. Review 3.4.6 observes no deployment.

**3. README.rst:60-61.** Text attributes LMS, Studio and authn/account MFE startup to Tutor command. Tutor startup of these services and which are mandatory lack verifiable snapshot configuration. Claim remains uncorroborated.

**4. README.rst:62-63.** Host execution of Learning is supported by own development-server scripts (package.json:18-20; webpack.dev.config.js:2-4), per review 3.4.6 #1. Claim is corroborated without asserting whole-platform isolated operation. README.rst:98 repeats host execution in troubleshooting command.

**5. README.rst:137-139.** Package is effective dependency (package.json:48), and HeaderSlot wraps default header in PluginSlot with own identifier (src/plugin-slots/HeaderSlot/index.jsx:9-28), used in routed page (src/generic/PageNotFound.jsx:8, :20; src/index.jsx:54). Supports customization capability without requiring configured replacement. Specific READMEs detail internal extensions, and example.env.config.jsx:1-24 is only example; review 3.4.5 does not treat it as active composition with another application.

**6. README.rst:145-147.** Local authentication/session/application-address configuration exists (.env:6-8, :26-28, :40, :51), frontend-platform dependency (package.json:41) and initialization merging configuration (src/index.jsx:166-199). Confirms Learning side of described convention. No second MFE has environment manifest in snapshot; Discussions is external target only. Thus mandatory set common to all MFEs and shared use by two units are unconfirmed, leaving partial corroboration.

**7. src/plugin-slots/FooterSlot/README.md:12.** Application/library boundary is confirmed: FooterSlot imports from @edx/frontend-component-footer (src/tab-page/TabPage.jsx:8, :84; src/generic/PageNotFound.jsx:6, :44), declared npm dependency at package.json:37. Implementation is not in src/plugin-slots/FooterSlot/, containing documentation. It is an external package component rather than another frontend application or evidence of two units sharing footer.

## Summary

Claims: 7 (corroborated: 4, partial: 1, contradicted: 0, uncorroborated: 2). Themes: (structure: 2, composition: 1, build-deploy: 1, independence: 2, other: 1).

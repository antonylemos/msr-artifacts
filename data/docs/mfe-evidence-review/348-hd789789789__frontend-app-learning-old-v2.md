---
schema: 1
id: 1098656325
full_name: hd789789789/frontend-app-learning-old-v2
commit: d987aed86134f6fa2a2a79d85f72fe44cfc0e5ee
inputs:
  - docs/mfe-dependency-review
  - docs/mfe-structure-review
  - docs/mfe-source-review
  - docs/mfe-composition-review
  - docs/mfe-build-deploy-review
  - docs/mfe-documentation-review
  - docs/mfe-history-review
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Repository overview

Learning sole local frontend application with own entry/build (#28, #32). Development configuration resolves external Discussions MFE (#3), embedded through iframe in discussion tab/old and new sidebars (#5, #8, #11). Points implement one active embedding relationship (#30). Tab also receives navigation/height messages (#27, #31). Communication preserves recorded 3.4.5 decision: table uses Learning source/Discussions target, but effective messages flow Discussions → Learning. No reverse send demonstrated.

Frontend Plugin Framework dependency (#1)/customization claim (#37) concern Learning slots; no other-application plugin configured in final relationships. Footer npm library (#39). External experimentation script, XBlock-content iframes, local fragments/test events add no units/relationships (#4, #6-7, #9-10, #12-26); public part of root (#29).

Build separate but deployment/independent versioning undemonstrated (#32). Production Discussions address empty in snapshot environment (#2). Documentation identifies Learning/describes execution/Tutor environment (#33-36) without corroborating its external configuration. Common mandatory environment-variable convention for all MFEs has only local support (#38); history resolves neither scope nor temporal claim origin (#40). Limit does not make explicit iframe composition ambiguous.

## Observations

### 1. package.json:48

**Observation:** Manifest declares @openedx/frontend-plugin-framework version ^1.7.0 in dependencies.

**Interpretation:** Extension technology declaration; dependency review records Configured Yes, but isolated declaration establishes no inter-application relationship.

### 2. .env:14

**Observation:** Production environment declares DISCUSSIONS_MFE_BASE_URL empty.

**Interpretation:** Dedicated Learning composition-target parameter, but this environment provides no resolving address.

**Note:** Moderate strength: although naming target, empty value does not directly link units through resolvable address; concrete URL has own observation in #3.

### 3. .env.development:14

**Observation:** Development environment assigns http://localhost:2002 to DISCUSSIONS_MFE_BASE_URL.

**Interpretation:** Consumer configuration names/resolves external Discussions MFE, target of Learning iframes. No production deployment demonstrated.

### 4. public/index.html:9-11

**Observation:** Template inserts script from www.edx.org/optimizelyjs when OPTIMIZELY_PROJECT_ID defined.

**Interpretation:** Third-party experimentation service, Composition No; external URL identifies no other frontend unit.

### 5. src/course-home/discussion-tab/DiscussionTab.jsx:20-23; src/index.jsx:98-102; src/index.jsx:174

**Observation:** DiscussionTab builds discussionsUrl with DISCUSSIONS_MFE_BASE_URL, courseId, originalPath, passes to iframe src. Discussion route renders DiscussionTab/initialization reads environment variable.

**Interpretation:** Links Learning screen to external Discussions MFE through active embedding.

### 6. src/course-home/outline-tab/LmsHtmlFragment.jsx:13-28; src/course-home/outline-tab/LmsHtmlFragment.jsx:48-54

**Observation:** LmsHtmlFragment builds wholePage from prop-received HTML, LMS base/resize script, supplies to iframe srcDoc.

**Interpretation:** Locally mounted course content; Composition No, without other frontend unit.

### 7. src/courseware/course/content-tools/notes-visibility/NotesVisibility.test.jsx:70-73

**Observation:** Test creates iframe element/assigns id unit-iframe.

**Interpretation:** Test simulation without application-composition participation.

### 8. src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:10; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:21-27; src/courseware/course/new-sidebar/sidebars/discussions-notifications/DiscussionsNotificationsSidebar.tsx:8; src/courseware/course/new-sidebar/sidebars/discussions-notifications/DiscussionsNotificationsSidebar.tsx:26; src/courseware/course/new-sidebar/sidebars/index.ts:1-8; src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26; src/courseware/course/sequence/Sequence.jsx:230

**Observation:** DiscussionsWidget builds category URL with DISCUSSIONS_MFE_BASE_URL, courseId, unitId, uses in iframe with ?inContextSidebar. New sidebar renders widget, appears in SIDEBARS/selected by slot flag used in Sequence.

**Interpretation:** New sidebar embeds same Discussions MFE with conditional active selection.

### 9. src/courseware/course/sequence/Unit/ContentIFrame.jsx:55-64; src/courseware/course/sequence/Unit/ContentIFrame.jsx:75-77; src/courseware/course/sequence/Unit/urls.ts:26

**Observation:** ContentIFrame spreads properties including src: iframeUrl; getIFrameUrl forms LMS_BASE_URL/xblock/id URL.

**Interpretation:** Displays LMS-served XBlock content, Composition No; pedagogical unit not another frontend classification unit.

### 10. src/courseware/course/sequence/Unit/ContentIFrame.jsx:80-100; src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:21-23

**Observation:** ModalDialog with modal-lti class may render iframe with modalOptions.url. plugin.modal handler receives options/opens modal.

**Interpretation:** Course-content modal rather than additional inter-application relationship.

### 11. src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:13; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:23; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40-41; src/courseware/course/sidebar/sidebars/index.js:2; src/courseware/course/sidebar/sidebars/index.js:10-14; src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26

**Observation:** DiscussionsSidebar builds category URL with DISCUSSIONS_MFE_BASE_URL/passes to iframe with ?inContextSidebar. Sidebar in SIDEBARS; slot selects old sidebar when new-view flag off.

**Interpretation:** Old sidebar embeds Discussions MFE. Another usage point of same relationship, alternative to new sidebar.

### 12. src/course-home/courseware-search/hooks.test.jsx:137-139

**Observation:** Test changes innerWidth/dispatches global Event('resize').

**Interpretation:** Simulates window resize in test without communicating frontend units.

### 13. src/course-home/discussion-tab/DiscussionTab.test.jsx:61-64

**Observation:** Test sends height message through window.postMessage/checks discussion iframe height.

**Interpretation:** Jest message simulation; line does not implement production composition channel.

### 14. src/course-home/outline-tab/LmsHtmlFragment.jsx:21-26; src/course-home/outline-tab/LmsHtmlFragment.jsx:37-45

**Observation:** srcDoc-generated script sends lmshtmlfragment.resize to window.parent; component listens for message/adjusts height.

**Interpretation:** Communication serves own Learning-generated fragment, connecting no other frontend unit.

### 15. src/courseware/course/content-tools/notes-visibility/NotesVisibility.jsx:11-14; src/courseware/course/sequence/Unit/ContentIFrame.jsx:55-77; src/courseware/course/sequence/Unit/urls.ts:26

**Observation:** toggleNotes finds unit-iframe/sends tools.toggleNotes through postMessage with LMS_BASE_URL origin.

**Interpretation:** Target course XBlock content, neither Discussions MFE nor other frontend classification unit.

### 16. src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:49-57; src/courseware/course/sequence/Unit/urls.ts:26

**Observation:** Effect sends hashName with window hash to iframe contentWindow using LMS_BASE_URL origin.

**Interpretation:** Synchronizes navigation inside XBlock content; Composition No.

### 17. src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:104-119; src/courseware/course/sequence/Unit/urls.ts:26

**Observation:** updateIframeVisibility builds unit.visibilityStatus with screen positions/sends data to LMS iframe through postMessage.

**Interpretation:** Message marks course-content visibility without additional frontend-unit relationship.

### 18. src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:10-14

**Observation:** handleModalClose selects iframe, closes modal state/sends plugin.modal-close to contentWindow.

**Interpretation:** Code review assigns notification to course-content modal, Composition No.

### 19. src/courseware/course/sidebar/sidebars/course-outline/CourseOutlineTray.test.jsx:104-106

**Observation:** Test sets innerWidth/dispatches Event('resize') in window.

**Interpretation:** Internal test event without inter-application composition.

### 20. src/generic/hooks.test.jsx:13-15

**Observation:** Test sends { test: 'test' } through window.postMessage/awaits handler call.

**Interpretation:** Exercises useEventListener in test, not active inter-unit communication.

### 21. src/generic/hooks.test.jsx:36-43

**Observation:** Test sends plugin.resize with height: 1234 through window.postMessage/checks height/loading state.

**Interpretation:** Jest useIFrameHeight simulation rather than additional composition implementation.

### 22. src/setupTest.js:64-69; jest.config.js:3-5

**Observation:** HTMLDialogElement.prototype.showModal mock creates CustomEvent('show_modal').

**Interpretation:** Event creation in jsdom without composition participation.

### 23. src/setupTest.js:66-69; jest.config.js:3-5

**Observation:** Same showModal mock dispatches onShowModal through this.dispatchEvent.

**Interpretation:** Internal test dispatch without inter-application communication.

### 24. src/setupTest.js:70-73; jest.config.js:3-5

**Observation:** HTMLDialogElement.prototype.close mock creates CustomEvent('close').

**Interpretation:** Event creation simulating test dialog without composition.

### 25. src/setupTest.js:70-73; jest.config.js:3-5

**Observation:** Close mock dispatches onClose through this.dispatchEvent.

**Interpretation:** Internal test dispatch without frontend-unit relationship.

### 26. src/setupTest.js:124-133; jest.config.js:3-5

**Observation:** Helper loadUnit calls `window.postMessage(message, '*')`, defaulting to plugin.resize message with height 300.

**Interpretation:** Simulates course-content loading in test; not part of application build.

### 27. src/course-home/discussion-tab/DiscussionTab.jsx:13-19; src/course-home/discussion-tab/DiscussionTab.jsx:25; src/generic/hooks.js:29-40; src/generic/hooks.js:47-60

**Observation:** DiscussionTab calls useIFramePluginEvents to handle discussions.navigate/navigate to received path. Also calls useIFrameHeight handling plugin.resize for iframe height; hook registers message listener.

**Interpretation:** Implements navigation/height reception in Discussions-embedding tab. Call prepares message mechanism; external sender/receiver relationship explicit in #31.

### 28. .; src/index.jsx:41; public/index.html:17; webpack.prod.config.js:2-5; webpack.dev.config.js:2-4; package.json:13

**Observation:** Root contains package.json, src/index.jsx with createRoot, public/index.html with root/configurations calling createConfig for webpack-prod/webpack-dev. Build script calls fedx-scripts webpack.

**Interpretation:** Confirms sole local frontend unit Learning with own entry/build. Entry/template follow external build-package convention without explicit snapshot entry.

### 29. public/; public/index.html:17; webpack.prod.config.js:7-16

**Observation:** public contains template with root; root build copies public/static to dist/static.

**Interpretation:** Part of root application, Frontend unit No, without independent entry/build.

### 30. src/course-home/discussion-tab/DiscussionTab.jsx:20-23; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:21-27; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:23; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40-41; src/index.jsx:174; .env:14; .env.development:14

**Observation:** Relationship 1 records source ., target DISCUSSIONS_MFE_BASE_URL, type page → embedded-frontend, direction source → target, In snapshot No/Active Yes. Three iframes load target; development environment supplies URL.

**Interpretation:** Learning composes external Discussions in tab/sidebars. Missing target code in snapshot does not eliminate explicit link. Production URL remains open in environment.

### 31. src/course-home/discussion-tab/DiscussionTab.jsx:13-19; src/course-home/discussion-tab/DiscussionTab.jsx:20-23; src/course-home/discussion-tab/DiscussionTab.jsx:25; src/generic/hooks.js:29-40; src/generic/hooks.js:59; src/index.jsx:174; .env.development:14

**Observation:** Relationship 2 records ., DISCUSSIONS_MFE_BASE_URL, communication, events, In snapshot No/Active Yes. Learning receives discussions.navigate/plugin.resize through message. Table uses source → target direction with explicit qualification/recorded decision that messages come from Discussions to Learning.

**Interpretation:** Active embedded-unit message reception channel affects navigation/height. Preserves final review exceptional convention: effective flow external target → local source; no inferred Learning send.

### 32. package.json:13; webpack.prod.config.js:5-16; Makefile:54-66; .github/workflows/validate.yml:17-36; .env.development:8; .env.development:34; package.json:18-20

**Observation:** Application build calls fedx-scripts webpack, uses createConfig/copies statics. CI runs make validate.ci including npm run build; workflow-uploaded artifacts coverage. Review records separate Build, unobserved Deployment, Versioning No; cited addresses development.

**Interpretation:** Confirms Learning build boundary separate from external Discussions code. Publishes relationship identifies built unit without asserting dist deployment/publication absent in review.

### 33. README.rst:9-11

**Observation:** README presents Learning MFE responsible for student-facing course pages.

**Interpretation:** Identifies frontend application, corroborated by local unit/Discussions composition; implies no multiple local applications.

### 34. README.rst:52-54

**Observation:** README instructs excluding Learning from Tutor mfe container, normally running all MFEs according to text.

**Interpretation:** Describes Tutor application organization without snapshot corroboration: external container configuration absent.

### 35. README.rst:60-61

**Observation:** README claims Tutor command starts LMS, Studio/required MFEs such as authn/account.

**Interpretation:** Situates other MFEs in Learning environment, but service startup uncorroborated in snapshot.

### 36. README.rst:62-63

**Observation:** README instructs running Learning on host instead of Tutor-managed container.

**Interpretation:** Own development execution corroborated by start/dev scripts/recorded build; does not demonstrate independence from entire platform.

### 37. README.rst:137-139

**Observation:** README says MFE customizable through Frontend Plugin Framework/points to slot documentation.

**Interpretation:** Extension ability corroborated by dependency/HeaderSlot used in routed page. Requires no configured replacement/establishes no other application.

### 38. README.rst:145-147

**Observation:** README attributes common mandatory environment variables to all MFEs.

**Interpretation:** Partial corroboration: Learning environment/initialization present but no other MFE manifest demonstrating mandatory set common to units.

### 39. src/plugin-slots/FooterSlot/README.md:12

**Observation:** FooterSlot README places implementation in frontend-component-footer repository.

**Interpretation:** External library boundary corroborated by npm dependency/FooterSlot usage. Build-incorporated component without demonstrating another application/two-unit sharing.

### 40. 1308d1e 2021-08-06 (README.rst); d5a092b 2025-03-26 (README.rst)

**Observation:** History review records README changes in 1308d1e, whose message announces Learning-specific variable documentation, and d5a092b, announcing link update. README blob in 1308d1e unreadable locally. Point inconclusive.

**Interpretation:** Does not resolve general environment claim introduction/relationship to other stages. Historical uncertainty: snapshot retains partial convention corroboration without making Discussions composition undetermined.

## Classification

| # | Origin | Dimension | Type | Approach | Evidence | Strength | Relationships |
|---|---|---|---|---|---|---|---|
| 1 | 3.4.2 (package.json:48) | 1 technology | manifest | other-mfe-framework | technological | weak | declares src/plugin-slots/HeaderSlot/index.jsx:2 |
| 2 | 3.4.5 #1 (Configuration) | 2 configuration | configuration | iframe | architectural | moderate | configures #30 |
| 3 | 3.4.5 #1 (Configuration) | 2 configuration | configuration | iframe | architectural | strong | configures #5; configures #8; configures #11; configures #30 |
| 4 | 3.4.4 (public/index.html:10) | 3 code | source code | — | context | weak | — |
| 5 | 3.4.4 (src/course-home/discussion-tab/DiscussionTab.jsx:22) | 3 code | source code | iframe | architectural | strong | implements #30 |
| 6 | 3.4.4 (src/course-home/outline-tab/LmsHtmlFragment.jsx:48) | 3 code | source code | iframe | context | weak | — |
| 7 | 3.4.4 (src/courseware/course/content-tools/notes-visibility/NotesVisibility.test.jsx:72) | 3 code | source code | — | context | weak | — |
| 8 | 3.4.4 (src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:26) | 3 code | source code | iframe | architectural | strong | implements #30 |
| 9 | 3.4.4 (src/courseware/course/sequence/Unit/ContentIFrame.jsx:77) | 3 code | source code | iframe | context | weak | — |
| 10 | 3.4.4 (src/courseware/course/sequence/Unit/ContentIFrame.jsx:93) | 3 code | source code | iframe | context | weak | — |
| 11 | 3.4.4 (src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40) | 3 code | source code | iframe | architectural | strong | implements #30 |
| 12 | 3.4.4 (src/course-home/courseware-search/hooks.test.jsx:139) | 3 code | source code | — | context | weak | — |
| 13 | 3.4.4 (src/course-home/discussion-tab/DiscussionTab.test.jsx:62) | 3 code | source code | — | context | weak | — |
| 14 | 3.4.4 (src/course-home/outline-tab/LmsHtmlFragment.jsx:23) | 3 code | source code | events | context | weak | — |
| 15 | 3.4.4 (src/courseware/course/content-tools/notes-visibility/NotesVisibility.jsx:13) | 3 code | source code | events | context | weak | — |
| 16 | 3.4.4 (src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:55) | 3 code | source code | events | context | weak | — |
| 17 | 3.4.4 (src/courseware/course/sequence/Unit/hooks/useIFrameBehavior.ts:115) | 3 code | source code | events | context | weak | — |
| 18 | 3.4.4 (src/courseware/course/sequence/Unit/hooks/useModalIFrameData.js:13) | 3 code | source code | events | context | weak | — |
| 19 | 3.4.4 (src/courseware/course/sidebar/sidebars/course-outline/CourseOutlineTray.test.jsx:106) | 3 code | source code | — | context | weak | — |
| 20 | 3.4.4 (src/generic/hooks.test.jsx:14) | 3 code | source code | — | context | weak | — |
| 21 | 3.4.4 (src/generic/hooks.test.jsx:37) | 3 code | source code | — | context | weak | — |
| 22 | 3.4.4 (src/setupTest.js:67) | 3 code | source code | — | context | weak | — |
| 23 | 3.4.4 (src/setupTest.js:68) | 3 code | source code | — | context | weak | — |
| 24 | 3.4.4 (src/setupTest.js:71) | 3 code | source code | — | context | weak | — |
| 25 | 3.4.4 (src/setupTest.js:72) | 3 code | source code | — | context | weak | — |
| 26 | 3.4.4 (src/setupTest.js:132) | 3 code | source code | — | context | weak | — |
| 27 | 3.4.4 (outside mining, src/course-home/discussion-tab/DiscussionTab.jsx:14) | 3 code | source code | events | architectural | moderate | implements #31 |
| 28 | 3.4.3 (.) | 4 structure | directory | — | architectural | moderate | — |
| 29 | 3.4.3 (public) | 4 structure | directory | — | context | weak | — |
| 30 | 3.4.5 #1 | 5 composition | source code | iframe | architectural | strong | links #28; links #3 |
| 31 | 3.4.5 #2 | 5 composition | source code | events | architectural | strong | links #28; links #3 |
| 32 | 3.4.6 #1 | 6 build-deploy | configuration | — | architectural | moderate | publishes #28 |
| 33 | 3.4.7 #1 | 7 documentation | documentation | — | architectural | weak | corroborates #28; corroborates #30 |
| 34 | 3.4.7 #2 | 7 documentation | documentation | — | architectural | weak | — |
| 35 | 3.4.7 #3 | 7 documentation | documentation | — | architectural | weak | — |
| 36 | 3.4.7 #4 | 7 documentation | documentation | — | architectural | weak | corroborates #32 |
| 37 | 3.4.7 #5 | 7 documentation | documentation | other-mfe-framework | technological | weak | corroborates #1; corroborates src/plugin-slots/HeaderSlot/index.jsx:9-28 |
| 38 | 3.4.7 #6 | 7 documentation | documentation | — | architectural | weak | partially corroborates .env:6-8; partially corroborates .env:26-28; partially corroborates .env:40; partially corroborates .env:51; partially corroborates src/index.jsx:166-199 |
| 39 | 3.4.7 #7 | 7 documentation | documentation | — | context | weak | corroborates package.json:37; corroborates src/tab-page/TabPage.jsx:8; corroborates src/tab-page/TabPage.jsx:84; corroborates src/generic/PageNotFound.jsx:6; corroborates src/generic/PageNotFound.jsx:44 |
| 40 | 3.4.8 #1 | 8 history | history | — | context | weak | explains #38 |

## Summary

Observations: 40. Dimensions (technology: 1, configuration: 2, code: 24, structure: 2, composition: 2, build-deploy: 1, documentation: 7, history: 1). Strength (strong: 6, moderate: 4, weak: 30, ambiguous: 0). Evidence (technological: 2, architectural: 15, context: 23).

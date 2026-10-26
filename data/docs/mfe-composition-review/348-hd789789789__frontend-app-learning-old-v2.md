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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 348 — hd789789789/frontend-app-learning-old-v2

## Repository overview

The snapshot is a copy of the Open edX platform's Learning MFE, the React application rendering course pages for students (README.rst:9-11). It is a product, and root `.` is the snapshot's only unit. Classification's other unit, Discussions MFE, is deployed separately and outside the snapshot. Learning MFE embeds it through `<iframe>` with a URL assembled from `DISCUSSIONS_MFE_BASE_URL`, coming from the environment (src/index.jsx:174; .env.development:14). This happens in three places: the discussion tab (src/course-home/discussion-tab/DiscussionTab.jsx:20-23) and both content sidebars, old (src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:23, :40-41) and new (src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:21, :26-27). The slot selects a sidebar through `isNewDiscussionSidebarViewEnabled` (src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26). The discussion tab also provides the only messaging channel with the other unit: Learning MFE listens to `postMessage` from the iframe to navigate and adjust height (src/course-home/discussion-tab/DiscussionTab.jsx:13-19; src/generic/hooks.js:29-40, :59). Messages in the other direction do not appear.

The rest of the mining findings did not become relationships. Iframes and messages exchanged with XBlock content served by the LMS (`${LMS_BASE_URL}/xblock/${id}`, src/courseware/course/sequence/Unit/urls.ts:26), modal `plugin.modal` and `srcDoc` fragments are course content, not another frontend unit, according to the source code review. The Optimizely script (public/index.html:10) is a third-party service. The platform header and footer enter as npm packages at build time (package.json:37-38). Frontend Plugin Framework (package.json:48) provides slots such as the header slot (src/plugin-slots/HeaderSlot/index.jsx:9-10), but no plugin is configured in the snapshot: the only `env.config` is `example.env.config.jsx`, referenced by no build. There is no relationship for those slots.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | DISCUSSIONS_MFE_BASE_URL | page → embedded-frontend | source → target | iframe | No | Yes | .env:14 (`DISCUSSIONS_MFE_BASE_URL=''`); .env.development:14 (`DISCUSSIONS_MFE_BASE_URL='http://localhost:2002'`) | src/course-home/discussion-tab/DiscussionTab.jsx:22; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:26; src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:40 |
| 2 | . | DISCUSSIONS_MFE_BASE_URL | communication | source → target | events | No | Yes | — | src/course-home/discussion-tab/DiscussionTab.jsx:14 |

## Observations

**1. . → DISCUSSIONS_MFE_BASE_URL.** The target is Discussions MFE, identified through the variable name (src/index.jsx:174) and discussion tab iframe title (`title="discussion"`, src/course-home/discussion-tab/DiscussionTab.jsx:27). No snapshot unit matches it, and the structural review lists only `.`; hence In snapshot = `No`. The production URL remains empty in `.env` (.env:14) and is filled on deployment. In development and testing, it points to `http://localhost:2002` (.env.development:14; .env.test:14). All three iframes are `Yes` in the source code review. The tab enters through route `DECODE_ROUTES.DISCUSSION` (src/index.jsx:98-102), while both sidebars alternate through the slot flag (src/plugin-slots/NotificationsDiscussionsSidebarSlot/index.tsx:26). Because each sidebar loads its URL with `?inContextSidebar` (src/courseware/course/sidebar/sidebars/discussions/DiscussionsSidebar.jsx:41; src/courseware/course/new-sidebar/sidebars/discussions-notifications/discussions/DiscussionsWidget.tsx:27), the same target appears in different screen forms, but remains one relationship.

**2. . → DISCUSSIONS_MFE_BASE_URL.** The sender is Discussions MFE, inside the discussion tab iframe. Learning MFE only receives: `useIFramePluginEvents` registers a `message` listener on `window` and dispatches by `type` (src/generic/hooks.js:29-40). The tab handles `discussions.navigate`, navigating to the path supplied by the other unit (src/course-home/discussion-tab/DiscussionTab.jsx:14-19), and `plugin.resize`, through `useIFrameHeight` (src/course-home/discussion-tab/DiscussionTab.jsx:13; src/generic/hooks.js:59), to adjust height (src/course-home/discussion-tab/DiscussionTab.jsx:25). The snapshot shows no message sent to the discussion iframe. Step 3 requires the Source of `communication` to be the sender, but the sender is outside the snapshot and Source must be a unit from the structural review. By the researcher's decision, only for this case, Source is `.` and Target is Discussions MFE, with the same target name as relationship 1; hence In snapshot = `No` (see "Recorded decision"). Direction remains `source → target`, the table's only value for one-way sending, but messages go from Target to Source. Both message types pass through one `postMessage` channel, hence `events`. Configuration = `—`, because message types are fixed in code. Active = `Yes` through the manual `Yes` source code review line. Outside `src/generic/hooks.js`, only the discussion tab uses `useIFramePluginEvents` or `useIFrameHeight`. Sidebars do not listen to discussion messages.

## Summary

Relationships: 2 (page → embedded-frontend: 1, communication: 1). Active: 2. Target outside the snapshot: 2.
Units without a relationship: none.

## Recorded decision

Relationship 2 is a `postMessage` channel where only Discussions MFE sends, inside the discussion tab iframe, and Learning MFE only receives (src/generic/hooks.js:29-40; src/course-home/discussion-tab/DiscussionTab.jsx:13-19). Question: in `communication`, Source is the sending unit (INSTRUCTIONS.md, step 3, "Origem", English translation: "Source"), but the sender is outside the snapshot, and Source must be a `Yes` or `Undetermined` directory from the structural review, listing only `.`. Researcher's decision, only for this case: Source `.`; Target with the same name as relationship 1's target, `DISCUSSIONS_MFE_BASE_URL`; Direction `source → target`, the table's only value for one-way sending, with the caveat in Observation 2 that messages go from Target to Source.

---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
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

# 049 — LebLeb03/UX308_Assignment2_2025

## Repository overview

A course assignment (UX308) based on the `cd-wordpress` template, which presents itself as "a consumer of microfrontends" and invites composition of "work from autonomous teams" (README.md:13-15). The snapshot has only a WordPress site's `wp-content/` (themes, plugins, mu-plugins); WordPress core and the build come from the external `wp-pwa` tool. The only unit is the `.` directory, `Undetermined` in the structural review, and it is the source of all relationships. No target is in the snapshot.

The composition described by the classification (the `<x-subscriberform>` form loaded from `lebleb03.github.io/Contact_form_UX308/`) was in page content stored in `wp-content/database/.ht.sqlite`, removed as a binary by normalization. Hence it does not appear in the source code review and does not become a relationship here.

What becomes a relationship is the source code review's manual constructs, all in PHP. The `chatbot` child theme ("For intergating chat bot", child of `dark-mode`; wp-content/themes/chatbot/style.css:2-5) enqueues two bundles from other origins as ES modules: one from the same author's `Assignment_1_UX308` repository and another author's `chatter/fab.js` (wp-content/themes/chatbot/functions.php:14-15). The Akismet plugin embeds through `<iframe>` the statistics interface from `tools.akismet.com` in its administration screens (wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44). All three relationships have Active `Undetermined` because the active theme and plugins are database options, and the database is absent from the snapshot.

What does not become a relationship: the `x-year` custom element (`CopyrightYear`), a copyright-year utility enqueued by the child theme itself (wp-content/themes/chatbot/functions.php:13) and defined in wp-content/themes/chatbot/customElements.js:7, internal to the host; its copy in the One Click Child Theme plugin's template file; and third-party library events and iframes (Bootstrap, sticky-sidebar, Colorbox), all `No` in the source code review.

## Relationships

| # | Source | Target | Type | Direction | Mechanism | In snapshot | Active | Configuration | Code |
|---|---|---|---|---|---|---|---|---|---|
| 1 | . | https://lebleb03.github.io/Assignment_1_UX308/index.js | other | source → target | script | No | Undetermined | — | wp-content/themes/chatbot/functions.php:14 |
| 2 | . | https://rhildred.github.io/chatter/fab.js | other | source → target | script | No | Undetermined | — | wp-content/themes/chatbot/functions.php:15 |
| 3 | . | tools.akismet.com | page → embedded-frontend | source → target | iframe | No | Undetermined | — | wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44 |

## Observations

**1. . → https://lebleb03.github.io/Assignment_1_UX308/index.js.** `theme_enqueue_styles`, hooked to `wp_enqueue_scripts` (wp-content/themes/chatbot/functions.php:6-7), calls `wp_enqueue_script_module('custom_module1', "https://lebleb03.github.io/Assignment_1_UX308/index.js")` (wp-content/themes/chatbot/functions.php:14), including the bundle from another origin as an ES module on the site's pages. The target is another repository by the same author, with no match in the snapshot, and is recorded by URL. Type `other`: the host only loads the bundle through a script; it neither uses a tag defined by it, mounts it through a global API nor imports exposed modules, so none of the specific types applies, and what the bundle does on the page is not observable. Active `Undetermined` because the only code line is `Undetermined`: whether `chatbot` is the active theme is unknown.

**2. . → https://rhildred.github.io/chatter/fab.js.** The same function and mechanism as relationship 1: `wp_enqueue_script_module('custom_module2', "https://rhildred.github.io/chatter/fab.js")` (wp-content/themes/chatbot/functions.php:15). The target belongs to another author and origin, recorded by URL. The child theme's name ("For intergating chat bot"; wp-content/themes/chatbot/style.css:3) suggests that this bundle is the chatbot, but how it enters the page is not observable; hence type `other`, as in relationship 1. Active `Undetermined` for the same reason.

**3. . → tools.akismet.com.** Both Akismet administration screens embed pages from `tools.akismet.com/1.0/`: `user-stats.php` on the statistics screen (wp-content/plugins/akismet/views/stats.php:11) and `snapshot.php` in the configuration screen's summary chart (wp-content/plugins/akismet/views/config.php:44). Both URLs belong to the same external service, so they form one relationship, with the target written as the host appearing in both artifacts. Both views are reached through `display_page` (wp-content/plugins/akismet/class.akismet-admin.php:1113-1120), coming from the options menu registered by the plugin (wp-content/plugins/akismet/class.akismet-admin.php:131-135). The target is a third-party service, not the author's, and the relationship is in the administration area, rather than the site's public pages. Active `Undetermined` because plugin activation resides in the database.

## Summary

Relationships: 3 (other: 2, page → embedded-frontend: 1). Active: 0. Target outside the snapshot: 3.
Units without a relationship: none.


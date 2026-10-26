---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
mining:
  output: data/mining/mfe-mining-001
  version: "1"
  config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 049 — LebLeb03/UX308_Assignment2_2025

## Mined constructs

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| src-bundle-url | wp-content/themes/resume-kit/assets/js/bootstrap.js:4973 | . | none | No | The line is the header comment `Bootstrap (v5.0.1): index.umd.js` within the Bootstrap bundle distributed with the theme (wp-content/themes/resume-kit/assets/js/bootstrap.js:4971-4976, followed by `var index_umd = {` at :4977); it is the signature of the library file itself rather than the URL of another unit’s bundle. |
| src-custom-element | wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:1 | . | custom-element | No | `class CopyrightYear extends HTMLElement` in a template file of the One Click Child Theme plugin: the plugin only copies it to the child theme it generates (wp-content/mu-plugins/one-click-child-theme/one-click-child-theme.php:571-572); nothing in the snapshot loads the file in `templates/`. |
| src-custom-element | wp-content/mu-plugins/one-click-child-theme/templates/customElements.js:7 | . | custom-element | No | `customElements.define("x-year", CopyrightYear)` in the same plugin template file; only copied during child theme generation (wp-content/mu-plugins/one-click-child-theme/one-click-child-theme.php:572) and not loaded in its current location. |
| src-custom-element | wp-content/themes/chatbot/customElements.js:1 | . | custom-element | No | `class CopyrightYear extends HTMLElement` in the `chatbot` child theme, enqueued by wp-content/themes/chatbot/functions.php:13; the element only writes the current year (wp-content/themes/chatbot/customElements.js:2-4) and is internal to the host site itself rather than another unit. |
| src-custom-element | wp-content/themes/chatbot/customElements.js:7 | . | custom-element | No | `customElements.define("x-year", CopyrightYear)` from the `chatbot` child theme; an internal host element (copyright year utility), and the `<x-year>` tag does not appear in any snapshot file (`grep -rn "<x-"` returns no results). |
| src-custom-element | wp-content/themes/resume-kit/assets/js/bootstrap.js:290 | . | none | No | `if (!document.documentElement.attachShadow)` is a support check within the Bootstrap bundle’s `findShadowRoot` utility (wp-content/themes/resume-kit/assets/js/bootstrap.js:289-300); it does not package any unit as a custom element. |
| src-iframe | wp-content/plugins/ecommerce-product-catalog/js/colorbox/jquery.colorbox.js:101 | . | none | No | `document.createElement('iframe')` within `createIframe` in jQuery Colorbox, the catalog plugin’s lightbox library (wp-content/plugins/ecommerce-product-catalog/js/colorbox/jquery.colorbox.js:100-112); the frame displays the content passed to the lightbox rather than another frontend unit. |
| src-cross-unit-communication | wp-content/plugins/akismet/_inc/akismet-frontend.js:20 | . | none | No | `window.addEventListener( 'testPassive', null, opts )` detects passive listener support and is immediately followed by the corresponding `removeEventListener` (wp-content/plugins/akismet/_inc/akismet-frontend.js:14-22); there is no communication between units. |
| src-cross-unit-communication | wp-content/themes/pressbook/js/sticky-sidebar.js:612 | . | none | No | `new CustomEvent(eventName, { detail: data })` in the internal `eventTrigger` helper of the theme’s sticky-sidebar library (wp-content/themes/pressbook/js/sticky-sidebar.js:609-618); the event belongs to the library itself, within a single unit. |
| src-cross-unit-communication | wp-content/themes/pressbook/js/sticky-sidebar.js:617 | . | none | No | `element.dispatchEvent(event)` triggers the event created at :612, in the same sticky-sidebar library `eventTrigger` helper; internal library event. |
| src-cross-unit-communication | wp-content/themes/resume-kit/assets/js/bootstrap.js:201 | . | none | No | `element.dispatchEvent(new Event(TRANSITION_END))` in the Bootstrap bundle’s `triggerTransitionEnd` (wp-content/themes/resume-kit/assets/js/bootstrap.js:200-202); a CSS transition event of the library itself. |
| src-cross-unit-communication | wp-content/themes/resume-kit/assets/js/bootstrap.js:671 | . | none | No | `evt = new CustomEvent(event, {` in Bootstrap’s internal event dispatcher (wp-content/themes/resume-kit/assets/js/bootstrap.js:667-674); creates the library component event rather than an inter-unit channel. |
| src-cross-unit-communication | wp-content/themes/resume-kit/assets/js/bootstrap.js:694 | . | none | No | `element.dispatchEvent(evt)` triggers the event assembled at :671, in the same Bootstrap dispatcher (wp-content/themes/resume-kit/assets/js/bootstrap.js:692-695); internal library event. |

## Constructs outside mining

| Pattern | File:line | Unit | Category | Composition | Observation |
|---|---|---|---|---|---|
| manual | wp-content/themes/chatbot/functions.php:14 | . | script-loading | Undetermined | `wp_enqueue_script_module('custom_module1',"https://lebleb03.github.io/Assignment_1_UX308/index.js")` enqueues, as an ES module, the bundle from another origin (`Assignment_1_UX308`, another repository by the same author, outside the snapshot), within `theme_enqueue_styles` connected to `wp_enqueue_scripts` at wp-content/themes/chatbot/functions.php:6-7. Remains `Undetermined` because the `chatbot` child theme (wp-content/themes/chatbot/style.css:2-5, child of `dark-mode`) cannot be confirmed as the active theme: the option is in the database, which is not in the snapshot. |
| manual | wp-content/themes/chatbot/functions.php:15 | . | script-loading | Undetermined | `wp_enqueue_script_module('custom_module2',"https://rhildred.github.io/chatter/fab.js")` enqueues the `chatter/fab.js` bundle from another origin and another author in the same `theme_enqueue_styles` function (wp-content/themes/chatbot/functions.php:7-16). `Undetermined` for the same reason as line :14: the active theme is not observable in the snapshot. |
| manual | wp-content/plugins/akismet/views/stats.php:11 | . | embedding | Undetermined | `<iframe id="stats-iframe" src="https://tools.akismet.com/1.0/user-stats.php?blog=…&token=…">` embeds the detailed statistics interface served by `tools.akismet.com`, an external unit outside the snapshot, in the administration screen. The entry chain reaches the line: `admin_menu` → `add_submenu_page(… 'Akismet_Admin', 'display_page')` (wp-content/plugins/akismet/class.akismet-admin.php:66,133) → `display_page` dispatches to `display_stats_page` when `view=stats` (class.akismet-admin.php:1114-1117) → `Akismet::view( 'stats' )` (class.akismet-admin.php:1175-1177) → `include` of `views/stats.php` (wp-content/plugins/akismet/class.akismet.php:1721-1725). `Undetermined` because the plugin cannot be confirmed as active: the active plugin list is in the database, which is not in the snapshot. |
| manual | wp-content/plugins/akismet/views/config.php:44 | . | embedding | Undetermined | `<iframe id="stats-iframe" … src="https://tools.akismet.com/1.0/snapshot.php?blog=…&token=…">` embeds the summary chart from the same external `tools.akismet.com` interface in the `akismet-new-snapshot__chart` block of the configuration screen (wp-content/plugins/akismet/views/config.php:41-45). Same entry chain, through the `else` branch of `display_page` → `display_configuration_page` → `Akismet::view( 'config', … )` (wp-content/plugins/akismet/class.akismet-admin.php:1114-1120,1179-1277). `Undetermined` for the same reason as the `stats.php` row: plugin activation is not observable in the snapshot. |

## Summary

Constructs participating in composition: 0.

## Notes

- Mining misses all four manual constructs because `source` covers only `**/*.{js,jsx,mjs,cjs,ts,tsx,vue,svelte,html,ejs}` (manifest.json, `config.artifactTypes.source`): `wp-content/themes/chatbot/functions.php` appears in `artifacts.csv` without a type (artifacts.csv:525) and is not scanned; the same applies to `wp-content/plugins/akismet/views/stats.php` and `.../views/config.php`. In a WordPress site, remote bundle loading and embedding of external interfaces go through PHP (`wp_enqueue_script_module`, `<iframe>` in a view), beyond the reach of `src-*` patterns.
- The four manual rows point to units outside the snapshot and to other origins (`lebleb03.github.io/Assignment_1_UX308`, `rhildred.github.io/chatter`, `tools.akismet.com`), different from the unit cited by the classification (`Contact_form_UX308`, `<x-subscriberform>`), whose evidence is in page content in `wp-content/database/.ht.sqlite` — removed from the snapshot as binary, according to the structural review. The composition described in the classification therefore does not appear in either table.
- `Undetermined` in all four rows follows the rule to use `Undetermined` when in doubt between `Yes` and `Undetermined`: in the two `functions.php` rows, enqueueing is unconditional, but activation of the `chatbot` child theme depends on a database option absent from the snapshot; in the two Akismet rows, the entry chain runs from the administration menu to the view `include`, but plugin activation also depends on the database.
- Recurring false positive of `src-cross-unit-communication` and `src-custom-element`: 9 of the 13 rows are in third-party libraries bundled with WordPress themes and plugins (Bootstrap 5.0.1, sticky-sidebar, Colorbox, Akismet), and the other 4 are the `x-year` utility, two in the One Click Child Theme plugin’s template file and two in its copy in the `chatbot` child theme.
- The entire unit is a single directory (`.`, `Undetermined` in the structural review), so all rows receive `.`.

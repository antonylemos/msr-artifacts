---
schema: 1
id: 956247829
full_name: LebLeb03/UX308_Assignment2_2025
commit: c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
inputs:
  clone: data/samples/mfe-sample-001/repos/LebLeb03__UX308_Assignment2_2025
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 049 — LebLeb03/UX308_Assignment2_2025

## Repository overview

History up to snapshot has 14 commits, from 2025-03-27 to 2025-04-03, without merges. First, `d7866b4` (2025-03-27, "Initial commit"), already contains template site: `README.md`, `package.json`, root `.gitignore`, workflow `.github/workflows/main.yml`, database `wp-content/database/.ht.sqlite` and third-party themes and plugins, including Akismet with views cited by previous reviews. These artifacts have only first observable presence: first commit does not say where they came from. The `README.md`, `.gitignore` and Akismet views never change afterward.

Author additions begin in second commit, `57dac07` (2025-03-28, "added this"), creating child theme `chatbot` (`style.css`, `functions.php`, `customElements.js`) and changing database. From there to `436e204` (2025-03-29, "added fab back"), seven commits modify `wp-content/themes/chatbot/functions.php`; messages announce switches from "Order.js" to "Index" and tests with a "Fab". Last four commits, on 2025-04-03 ("added contact", "added everything", "added Contact", "Just finishing up"), only change database.

Clone locally contains snapshot version contents, but not most old versions: of eight `functions.php` versions, only `52bc0e2` is available, identical to snapshot (same object `718279d`). Database, removed from normalized snapshot as binary, is in snapshot commit tree and could be read.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Host `.` has no application entry in snapshot; WordPress core comes from external tool `wp-pwa` | 3.4.3 (. `Undetermined`) | active or abandoned | d7866b4 2025-03-27 Initial commit | resolved by the snapshot |
| 2 | Whether child theme `chatbot`, enqueueing both remote bundles, is active theme is unknown | 3.4.4 (wp-content/themes/chatbot/functions.php:14, :15); 3.4.5 #1, #2; 3.4.7 #4 | active or abandoned | 57dac07 2025-03-28 added this; 52bc0e2 2025-03-28 index not Index; 436e204 2025-03-29 added fab back; c09cbbe 2025-04-03 Just finishing up | clarified |
| 3 | Whether Akismet plugin, whose views embed `tools.akismet.com` through iframe, is active is unknown | 3.4.4 (wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44); 3.4.5 #3 | active or abandoned | d7866b4 2025-03-27 Initial commit; c09cbbe 2025-04-03 Just finishing up | clarified |

## Observations

**1. Host `.` has no application entry in snapshot.** Snapshot itself explains absence: `package.json` scripts are all calls to `wp-pwa` (package.json:6-9), and `.gitignore` ignores `dist` and `.wordpress` (.gitignore:3,5), containing generated site and WordPress assembled by tool. History agrees: `.gitignore` comes from first commit and never changes, and after first commit the only path outside `wp-content/` modified up to snapshot is `package.json`, in `57dac07`; no path with `.wordpress` or `dist` appears in history. Entry was never versioned, not deleted. Point does not change structural review: unit still lacks observable entry in repository.

**2. Whether child theme `chatbot` is active theme is unknown.** Theme does not come from template: author creates it in `57dac07`, and `functions.php` changes in seven following commits. Snapshot version matches `52bc0e2` (object `718279d`), last change in `436e204`, whose message announces return of "fab"; versions at `eb29f11` and `6724d46` are absent from clone, so their changes cannot be read. In database versioned in snapshot commit (`wp-content/database/.ht.sqlite`, read through `show` and queried in a copy outside `data/`, read-only), table `wp_options` has `stylesheet` = `chatbot`, `template` = `dark-mode` and `current_theme` = `chatbot`. Within this database, `chatbot` is snapshot active theme, and `functions.php` enqueueing both remote bundles (wp-content/themes/chatbot/functions.php:14-15) belongs to active theme. Database does not show whether site published by workflow was generated from it, because tool `wp-pwa` is outside repository, or what bundles do on page. Previous reviews remain unchanged.

**3. Whether Akismet plugin is active is unknown.** Akismet views are in first commit with other template plugins, and no commit up to snapshot changes them. In same snapshot-commit database, `active_plugins` lists a single plugin, `ecommerce-product-catalog/ecommerce-product-catalog.php`; Akismet is not among active plugins. Within this database, administration screens with iframes to `tools.akismet.com` (wp-content/plugins/akismet/views/stats.php:11; wp-content/plugins/akismet/views/config.php:44) are not reached in snapshot: plugin is a copy inherited from template, present but disabled. Database does not say whether it was previously activated.

## Commands

```
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 rev-list --count c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 rev-list --count --merges c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 log --reverse --format='%h %ad %s' --date=short c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 log --format='== %h %ad %s' --date=short --name-status --no-renames c09cbbe990a83a84c0e22c6b794472cf61fc6bf7 -- wp-content/themes/chatbot wp-content/plugins/akismet/views wp-content/database
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 log --format='== %h %ad %s' --date=short --name-status --no-renames c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 57dac07 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e a2c795a2eca982741227232976f28136b109a696   # missing
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 2f649dd -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e dc27618f98752aa71bbf79e293566142b24e4d41   # missing
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 8fdf63f -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e 55403e8a5980a3902658cb742e893e98057ccc7e   # missing
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 29f42e0 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e ef49b23315b1dc7cfd54037a9b32854cd867164f   # missing
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 52bc0e2 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e 718279dbce7f825168857f8ffaa8f32c004760d1   # available
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree eb29f11 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e d925b4fd88ff16bf58b4a2e54eab5455f6542e48   # missing
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 6724d46 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 cat-file -e 27ef0863f9a70068ae8f2a5b6ada50dfb7370cae   # missing
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree 436e204 -- wp-content/themes/chatbot/functions.php
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree c09cbbe990a83a84c0e22c6b794472cf61fc6bf7 -- wp-content/database/.ht.sqlite
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 show c09cbbe990a83a84c0e22c6b794472cf61fc6bf7:wp-content/database/.ht.sqlite
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree c09cbbe990a83a84c0e22c6b794472cf61fc6bf7
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree c09cbbe990a83a84c0e22c6b794472cf61fc6bf7 -- wp-content/themes/ wp-content/plugins/
docs/mfe-history-review/tools/hist.sh LebLeb03__UX308_Assignment2_2025 ls-tree c09cbbe990a83a84c0e22c6b794472cf61fc6bf7 -- wp-content/themes/chatbot/functions.php
```

## Summary

Commits up to the snapshot: 14 (2025-03-27 to 2025-04-03). Points: 3 (clarified: 2, inconclusive: 0, resolved by the snapshot: 1).

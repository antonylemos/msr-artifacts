---
schema: 1
id: 970061359
full_name: pierrekasongo/bahmni-drc
commit: 80390077a0a2375568289d01bcde52a082dc28e0
inputs:
  clone: data/samples/mfe-sample-001/repos/pierrekasongo__bahmni-drc
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 102 — pierrekasongo/bahmni-drc

## Repository overview

History up to snapshot has 42 commits, no merge, from 2025-04-21 to 2025-06-19. First, `ee1e6fc` (2025-04-21, "First commit"), has only four entries, all gitlinks (mode `160000`), without `.gitmodules`: `bahmni-core`, `bahmni-java-utils`, `default-config` and `openmrs-module-bahmniapps`, the latter pointing to commit `6f15c4c`, absent from clone. Next day, `f710945` (2025-04-22, "Adding subfolders") removes four gitlinks and creates four directories as regular trees with all files. This is an observable introduction through copying: Bahmni host, React/Module Federation bridge and clinical configuration contents arrive together, from repositories previously only referenced. Clone does not reveal upstream version or modifications.

Other 40 commits concern distribution: translations (from `f3ee559`, 2025-04-23, to `ae836e9`, 2025-06-19), master and location data configuration, proxy, Docker and Compose. In bridge `openmrs-module-bahmniapps/micro-frontends`, only commit after copy is `d1faead` (2025-06-12, "translating micro-frontends"), changing only `public/i18n/locale_fr.json`. Last commit is snapshot itself, `8039007` (2025-06-19, "Fixing locations").

Clone shows messages, dates, touched files and object identifiers. Contents of earlier versions of files changed after copying are unavailable (`cat-file` fails for registry `app.json` and four changed `ui` pages). Results below rely on files unchanged since `f710945`, whose contents match snapshot.

Queries revealed a difference between commit and snapshot: commit has `openmrs-module-bahmniapps/ui/dist/` (created in `f445aea`, 2025-05-18, "Adding dist folder") and `ipd.min.js`, `next-ui.min.js` and `shared.min.js` in `ui/app/micro-frontends-dist`. Acquisition removed them from snapshot through rules `preset:build-output` and `path:**/*.min.js` (`data/acquisitions/mfe-corpus-001/corpus/pierrekasongo__bahmni-drc/normalization.json`). Thus build and deploy review says snapshot lacks `ui/dist` and `.min.js`; claim applies to snapshot and changes no point.

Reviews 3.4.2, 3.4.3 and 3.4.6 left nothing open. Inactive construct and two `Undetermined` constructs in 3.4.4, two `Undetermined` relationships in 3.4.5 and four `contradicted` claims in 3.4.7 became three points.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | Vendored magnific-popup library iframe template is referenced by no page or build | 3.4.4 (openmrs-module-bahmniapps/ui/app/lib/magnific-popup/jquery.magnific-popup.js:1593) | active or abandoned | f710945 2025-04-22 Adding subfolders; f3ee559 2025-04-23 Adding translations; 1ed2b99 2025-05-01 Customizing masterdata | clarified |
| 2 | Registry `extension-popup` iframe and `message` listener depend on extension point `org.bahmni.registration.identifier`, declared by no configuration | 3.4.4 (openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html:93; openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:39); 3.4.5 #2, #3 | active or abandoned | f710945 2025-04-22 Adding subfolders; f3ee559 2025-04-23 Adding translations; 1ed2b99 2025-05-01 Customizing masterdata; f44767d 2025-05-01 Renaming default visit | clarified |
| 3 | Bridge README calls local bundles `ipd`, `next-ui` and `shared` micro-frontends, though they are part of host | 3.4.7 #7, #8, #10, #11 | conflicting stages | ee1e6fc 2025-04-21 First commit; f710945 2025-04-22 Adding subfolders; d1faead 2025-06-12 translating micro-frontends | clarified |

## Observations

**1. Vendored magnific-popup library iframe template is referenced by no page or build.** Both files in `openmrs-module-bahmniapps/ui/app/lib/magnific-popup/` arrive in `f710945`, with Bahmni tree copy, and no commit up to snapshot changes them. The `ui/Gruntfile.js` also does not change after copy, and no file in `ui/app` was removed in history. Apart from translations and images, only four `ui` page files change after copy: `admin/index.html`, `home/index.html` and `home/views/dashboard.html` in `f3ee559`, whose message announces translations, and `registration/views/patientcommon.html` in `1ed2b99`, whose message announces master data customization. Earlier versions of these four are unavailable, so history does not exclude one having referenced library. Limited to what is visible: library is part of copied contents, and distribution neither connected nor disconnected it afterward. History does not say whether it was used upstream before copy.

**2. Registry `extension-popup` iframe and `message` listener depend on extension point `org.bahmni.registration.identifier`, declared by no configuration.** Controller reads this point with `getExtensions("org.bahmni.registration.identifier", "link")` (openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js:21), and registry extension points are in configuration `extension.json`, in `extensionPointId` entries (default-config/openmrs/apps/registration/extension.json:4, :15, :26, :36). Iframe template, directive and controller arrive in `f710945` and do not change up to snapshot. The `default-config/openmrs/apps/registration/extension.json` also arrives in `f710945` and has same object (`847ccfb`) in `f710945`, `f3ee559`, `1ed2b99` and snapshot: it never had other contents, and no configuration file was removed in history. In same directory, only `app.json` changes, in `f3ee559`, `1ed2b99` and `f44767d`; old versions are unavailable, and messages announce translations, master data and default visit name. Limited to `extension.json`: extension point was never declared in this history, so distribution did not deactivate iframe and listener; they are code inherited from copy that its configuration does not trigger. History does not say whether another configuration outside repository declares it.

**3. Bridge README calls local bundles `ipd`, `next-ui` and `shared` micro-frontends, though they are part of host.** The `openmrs-module-bahmniapps/micro-frontends/README.md`, `webpack.config.js`, `package.json` and bridge `src/` arrive together in `f710945`, when tree replaces first-commit gitlink for `openmrs-module-bahmniapps` (`ee1e6fc`), and none changes up to snapshot; only subsequent directory commit, `d1faead`, touches only `public/i18n/locale_fr.json`. Text and contradicting code therefore belong to same stage in this history: there is no earlier bridge version with bundles as separate units, nor distribution edit of README. Wording arrives with copied contents. History does not show upstream, so it does not say whether text described another arrangement before copy.

## Commands

```
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # before: identical
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc rev-list --count 80390077a0a2375568289d01bcde52a082dc28e0
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc rev-list --count --merges 80390077a0a2375568289d01bcde52a082dc28e0
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc show --name-status --no-renames --format='=== %h %ad %s' --date=short ee1e6fc
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc show --name-status --no-renames --format='=== %h %ad %s' --date=short ee1e6fc
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc show --name-status --no-renames --format='=== %h %ad %s' --date=short f710945
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree ee1e6fc
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc show -s --format='%h %ad%n%B' --date=short f710945
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree f710945
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/micro-frontends/README.md openmrs-module-bahmniapps/micro-frontends/webpack.config.js openmrs-module-bahmniapps/micro-frontends/src openmrs-module-bahmniapps/micro-frontends/package.json
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/registration/views/patientIdentifier.html openmrs-module-bahmniapps/ui/app/registration/controllers/patientCommonController.js openmrs-module-bahmniapps/ui/app/registration/directives/extraPatientIdentifiers.js
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/lib/magnific-popup
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree 80390077a0a2375568289d01bcde52a082dc28e0 -- default-config/openmrs/apps/registration/
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- default-config/openmrs/apps/registration
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --diff-filter=D --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree f710945 -- default-config/openmrs/apps/registration/app.json default-config/openmrs/apps/registration/extension.json
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:default-config/openmrs/apps/registration/app.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree f3ee559 -- default-config/openmrs/apps/registration/app.json default-config/openmrs/apps/registration/extension.json
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f3ee559:default-config/openmrs/apps/registration/app.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree 1ed2b99 -- default-config/openmrs/apps/registration/app.json default-config/openmrs/apps/registration/extension.json
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t 1ed2b99:default-config/openmrs/apps/registration/app.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h' 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/dist
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --format='@@ %h' 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/dist
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/dist/
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree -r --name-only 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/micro-frontends-dist
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/lib/magnific-popup openmrs-module-bahmniapps/ui/Gruntfile.js
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc ls-tree -r --name-only 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app/lib/magnific-popup
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/ui/app/admin/index.html   # failure: missing object
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/ui/app/home/index.html   # failure: missing object
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/ui/app/home/views/dashboard.html   # failure: missing object
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/ui/app/registration/views/patientcommon.html   # failure: missing object
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t f710945:openmrs-module-bahmniapps/package/docker/index.html   # failure: missing object
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-only --no-renames --format='@@ %h' 80390077a0a2375568289d01bcde52a082dc28e0 -- '*.html'
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --full-history --name-status --no-renames --diff-filter=MD --format='@@ %h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/ui/app openmrs-module-bahmniapps/ui/Gruntfile.js
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc cat-file -t 6f15c4c3fd52a253a5bb3368d6908dd08123c56c   # failure: missing object (gitlink commit)
docs/mfe-history-review/tools/hist.sh pierrekasongo__bahmni-drc log --format='%h %ad %s' --date=short 80390077a0a2375568289d01bcde52a082dc28e0 -- openmrs-module-bahmniapps/micro-frontends
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt   # after: identical
```

## Summary

Commits up to the snapshot: 42 (2025-04-21 to 2025-06-19). Points: 3 (clarified: 3, inconclusive: 0, resolved by the snapshot: 0).

---
schema: 1
id: 754013249
full_name: MSF-OCG/LIME-EMR
commit: 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
inputs:
  clone: data/samples/mfe-sample-001/repos/MSF-OCG__LIME-EMR
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 074 — MSF-OCG/LIME-EMR

## Repository overview

History up to snapshot has 1036 commits, including 28 merges, from 2024-04-11 to 2026-10-06. First is `c60c10b` (2024-04-11, "Initial setup for distro, iraq and mosul"). Already contains `distro/configs/openmrs/frontend_assembly/spa-assemble-config.json` and `distro/configs/openmrs/frontend_config/msf-frontend-config.json`: separation between module list and UI configuration is first observable presence, not introduction. Last is snapshot itself, `4de9e41` (2026-10-06, "(feat) Add a Matsapha User Administrator role (#472)").

Reviews 3.4.2 to 3.4.6 left nothing open for history: no inspected-technology dependency, both candidate directories are `No`, and no composition construct, relationship or application with deploy exists. All points come from 3.4.7. The `contradicted` claims and `partial` claims where difference may be remnant of an earlier stage became points. Other `partial` claims (#1, #4, #9, #12, #17, #22, #23, #28) and `uncorroborated` claim (#29) depend on external artifacts or app-shell runtime behavior, not shown by this repository’s history.

Relevant milestones are:

- `README.md` last changed in `c852c54` (2026-07-20, "(feat) LIME2-1269 Enable RDE
  feature flag and bump frontend module versions (#444)"): object at this commit matches snapshot. The `spa-assemble-config.json` changed six further times afterward, from `886cd9b` (2026-08-21) to `c8fb59c` (2026-09-19).
- CI deploy chain originates in `758d373` (2025-12-16) and `7d6db6b` (2026-01-08), creating `deploy.yml` and `run-e2e-tests.yml`.
- Frontend override (`openmrs-esm-patient-banner-app.zip`) existed from `792c607` (2025-05-08) to `3bdf66f` (2025-12-04).

Clone shows messages, dates, touched files and object identifiers. Old version contents differing from snapshot are unavailable (old `ci.yml`, `README.md`, `spa-assemble-config.json` and `distro/pom.xml`: `show` and `cat-file` fail). Thus history says when each file changed, not changes within it, and several results rely only on messages.

A difference between commit and snapshot appeared during query: commit contains `distro/configs/openmrs/overrides/modules/drools-1.1.0-SNAPSHOT.omod`, removed from snapshot by acquisition due to size (`normalization.json:61`, reason `max-file-bytes`, 26178920 bytes). Directory `overrides/frontend` is absent from commit.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | README describes automatic CI deploy to dev and UAT, while only call to `deploy.yml` is commented out | 3.4.7 #3 | active or abandoned | 758d373 2025-12-16 Add ability to auto deploy LIME-MOSUL on LIME Azure DEV instance (#327); 7d6db6b 2026-01-08 Add ability to auto deploy LIME-MOSUL on LIME Azure UAT instance  (#329); c08eeee 2026-01-10 Allow release to be Triggered manually and also add UAT port to ssh (#337); a590846 2026-02-12 (chore) fix failing builds; 1c1b728 2026-03-21 (chore) Deprecate upload artifact action (#391); 7312d4c 2026-03-21 (fix) Failing ci condition; 90bdc3a 2026-07-03 (chore) Fix nodejs 20 deprecation notice | clarified |
| 2 | README discusses 41 modules plus two Madiro modules and Core UI 8.0.1, while configuration has 42 modules and `coreVersion` 10.0.1-pre | 3.4.7 #5, #13 | conflicting stages | 6abb17e 2026-06-22 LIME2-1241 Fixes to dependency resolutions and migrate to using @madiro/esm-home-app (#437); c852c54 2026-07-20 (feat) LIME2-1269 Enable RDE feature flag and bump frontend module versions (#444); 886cd9b 2026-08-21 (chore) Update openmrs frontend package versions; eb80724 2026-09-03 (chore) Update @madiro scoped packages with openmrs framework 10x; c8fb59c 2026-09-19 (fix) Stop the registration form crashing on the address hierarchy (#468) | inconclusive |
| 3 | Frontend module override mechanism is in distro build, but no frontend override exists, and comment says it loaded a custom banner | 3.4.7 #7, #25 | active or abandoned | 792c607 2025-05-08 Use patient Identifier Report Template in LIME (#159); 2b6b9e6 2025-05-09 Rebase the custom banner (#164); a48c566 2025-05-15 (fix) LIME2-739: Patient ID not fully visible in patient banner (#168); 3bdf66f 2025-12-04 LIME2-1001 Add Patient Identifier Sticker from OMRS product to LIME (#317); 8324e11 2026-02-14 Patient flags based on "Flags in 2025" specification (#355) | clarified |
| 4 | README says follow-up table is inherited by all sites, while all three sites remove it | 3.4.7 #16 | conflicting stages | 9af9025 2026-03-09 Adds follow up table demo and adds missing demo configurations; c852c54 2026-07-20 (feat) LIME2-1269 Enable RDE feature flag and bump frontend module versions (#444); f71c4f5 2026-09-09 LIME2-1292 Hide the follow-up demo table from the Results tab (#456) | clarified |
| 5 | README says tasks are inherited by all sites, while Mosul removes task app from import map | 3.4.7 #19 | conflicting stages | d63ea0e 2026-02-13 (feat) Support for task management (#350); e88d16f 2026-03-24 (fix) Exclude task-list from mosul, bunia and matsapha + CHANGELOG (#394); e36c0c4 2026-04-22 LIME2-1195 Bunia - enable task lists (#406); c852c54 2026-07-20 (feat) LIME2-1269 Enable RDE feature flag and bump frontend module versions (#444); 3862541 2026-08-12 (fix) Re-enable patient task list app for Matsapha | inconclusive |
| 6 | Comment says distro image building and uploading are disabled, while executions are active | 3.4.7 #26 | active or abandoned | 272b488 2025-11-17 (BREAKING) Build docker images using Bundled-docker and CLI (#197); 7de2fbe 2026-02-24 Enable building and deploying of Distro images using bundled docker (#364); 185e757 2026-02-26 Fix pushing distro docker images dev tags on snapshot build workflow; c8fb59c 2026-09-19 (fix) Stop the registration form crashing on the address hierarchy (#468) | inconclusive |
| 7 | `docs/README.md` places frontend modules in `frontend_config/`, while module list is in `frontend_assembly/` | 3.4.7 #27 | conflicting stages | c60c10b 2024-04-11 Initial setup for distro, iraq and mosul; d29d101 2024-05-16 deletes spa-assemble-config.json overrides; b2e8d52 2024-05-26 Adds spa-assemble-config to pull latest frontend packages; 5e8bc05 2025-05-20 (docs) LIME2-653 LIME Documentation (#145); 9de5ce9 2026-05-14 Docs and readme update (#395) | clarified |

## Observations

**1. README describes automatic CI deploy to dev and UAT, while only call to `deploy.yml` is commented out.** Message of `758d373` (2025-12-16) announces "Add ability to auto deploy
LIME-MOSUL on LIME Azure DEV instance", and commit changes `ci.yml`. The `7d6db6b` (2026-01-08) creates `deploy.yml` and `run-e2e-tests.yml` and changes `ci.yml`. Message announces UAT deploy and ends with "Uncomment conditions for deployment jobs in CI". Both workflows created there reach snapshot. The `deploy.yml` last changed in `5aa015c` (2026-01-22). After `7d6db6b`, `ci.yml` changed in five commits (`c08eeee`, `a590846`, `1c1b728`, `7312d4c`, `90bdc3a`). Previous `ci.yml` versions are unavailable (`cat-file` fails), so which commented out call or whether it ever ran cannot be known. Conclusion within these workflows: chain described by README was introduced, according to messages, in December 2025 and January 2026, and commented call in snapshot is its remnant, not a plan never connected. History does not say when or why it was disabled.

**2. README discusses 41 modules plus two Madiro modules and Core UI 8.0.1, while configuration has 42 modules and `coreVersion` 10.0.1-pre.** Snapshot `README.md` is object from `c852c54` (2026-07-20), whose message announces "bump frontend module versions". Afterward, `spa-assemble-config.json` changed six more times, from `886cd9b` (2026-08-21) to `c8fb59c` (2026-09-19), and message of `eb80724` (2026-09-03) announces "Update @madiro scoped packages with
openmrs framework 10x". Module omitted by README, `@madiro/esm-home-app`, enters according to message of `6abb17e` (2026-06-22, "migrate to using @madiro/esm-home-app"). Before `c852c54`, but after `9de5ce9` (2026-05-14, "Docs and readme update (#395)"). Old README and configuration versions are unavailable (`show c852c54:…spa-assemble-config.json` and `cat-file 9de5ce9:README.md` fail). Commit where numbers were written or whether they matched configuration at that moment cannot be known. Inconclusive.

**3. Frontend module override mechanism is in distro build, but no frontend override exists, and comment says it loaded a custom banner.** The `792c607` (2025-05-08) creates `scripts/apply-overrides.groovy`, modifies `distro/pom.xml` and adds `distro/configs/openmrs/overrides/frontend/openmrs-esm-patient-banner-app.zip` and an override backend module. Message body announces "Add patient Banner common-reports module overrides". Banner ZIP changes in `2b6b9e6` (2025-05-09, "Rebase the custom banner (#164)") and `a48c566` (2025-05-15), and is deleted in `3bdf66f` (2025-12-04, "Add Patient Identifier Sticker from OMRS
product to LIME"). Same commit deletes `patientdocuments-1.0.0-SNAPSHOT.omod` and `reporting-1.27.0.omod`, and modifies `spa-assemble-config.json` and `distro/pom.xml`. No other file is created in `overrides/frontend` up to snapshot. Directory `overrides/modules` remains: `8324e11` (2026-02-14) adds `drools-1.1.0-SNAPSHOT.omod`, present in snapshot commit and removed from snapshot only by acquisition (see Overview). Conclusion within these files: frontend override existed between May and December 2025 and was abandoned in `3bdf66f`, when custom banner and document module left together, as comment at `distro/pom.xml:641-642` reports. Script remains connected to build and still has a backend module to replace in commit. Switch of labels to `esm-patient-label-printing-app` is announced only by message of `3bdf66f`; old configuration content is unavailable.

**4. README says follow-up table is inherited by all sites, while all three sites remove it.** The `9af9025` (2026-03-09, "Adds follow up table demo and adds missing demo configurations") changes only distro configuration. README saying "Enabled at distro level and inherited by all sites" has not changed since `c852c54` (2026-07-20). All three site configurations change together in `f71c4f5` (2026-09-09, "Hide the follow-up demo table from the Results tab"). Message explains: distro puts widget in slot, "so every site inherits it", and "the widget is only meant to be
visible on demo/distro", so removed in each site. Conclusion: README claim belongs to stage before `f71c4f5`, when all sites inherited widget, and site removal came after last README change. None changes 3.4.7 `contradicted`.

**5. README says tasks are inherited by all sites, while Mosul removes task app from import map.** Message of `d63ea0e` (2026-02-13, "Support for task management") announces task module, and commit changes `spa-assemble-config.json`. The `e88d16f` (2026-03-24, "Exclude
task-list from mosul, bunia and matsapha") modifies `pom.xml` files of all three sites. Then, according to messages, app returns to Bunia in `e36c0c4` (2026-04-22, "Bunia - enable task lists") and Matsapha in `3862541` (2026-08-12, "Re-enable patient task list app for Matsapha"). Mosul `pom.xml` has no reactivating commit. Messages indicate a stage from 2026-02-13 to 2026-03-24 when all sites inherited app. README text, however, cannot be dated. Changed before, during and after interval (`cf192b2` 2026-03-13, `903783b` 2026-03-24, `9de5ce9` 2026-05-14, `c852c54` 2026-07-20), and old versions are unavailable. Whether phrase is remnant of that stage cannot be known. Inconclusive.

**6. Comment says distro image building and uploading are disabled, while executions are active.** Images begin being built with bundled docker in `272b488` (2025-11-17), according to message. Message of `7de2fbe` (2026-02-24) announces "Enable building and
deploying of Distro images using bundled docker", and `185e757` (2026-02-26) corrects tag uploading. Suggests a stage when distro images were not built. However, `distro/pom.xml` changed in 84 commits, and previous versions are unavailable (`cat-file
176b378:distro/pom.xml` fails). When comment was written or whether it described a stage before `7de2fbe` cannot be known. Inconclusive.

**7. `docs/README.md` places frontend modules in `frontend_config/`, while module list is in `frontend_assembly/`.** The `spa-assemble-config.json` has resided in `distro/configs/openmrs/frontend_assembly/` since first commit (`c60c10b`). Deleted in `d29d101` (2024-05-16) and recreated at same location in `b2e8d52` (2024-05-26). The only JSON files created in `frontend_config/` directories up to snapshot are UI configurations (`msf-frontend-config.json` and each site’s) and translations configuration (`6bb0e1a`, 2026-04-02). The `docs/README.md` is created in `5e8bc05` (2025-05-20) and changed in `adda4f4` (2025-05-22) and `9de5ce9` (2026-05-14), always when module list already resided in `frontend_assembly/`. Conclusion within names and locations of these files: table is not remnant of an earlier repository organization. Modules were never defined in `frontend_config/`.

## Commands

```
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR rev-list --count 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR rev-list --count --merges 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --reverse --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- .github/workflows/deploy.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- .github/workflows/run-e2e-tests.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 90bdc3a -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 7312d4c -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 1c1b728 -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree a590846 -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree c08eeee -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 7d6db6b -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 758d373 -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- .github/workflows/ci.yml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 7312d4c:.github/workflows/ci.yml   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 1c1b728:.github/workflows/ci.yml   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t a590846:.github/workflows/ci.yml   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t c08eeee:.github/workflows/ci.yml   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 7d6db6b:.github/workflows/ci.yml   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 758d373:.github/workflows/ci.yml   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 90bdc3a   # failure: -s and --name-status incompatible
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 7312d4c   # failure: -s and --name-status incompatible
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 1c1b728   # failure: -s and --name-status incompatible
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short a590846   # failure: -s and --name-status incompatible
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short c08eeee   # failure: -s and --name-status incompatible
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 7d6db6b   # failure: -s and --name-status incompatible
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show -s --name-status --format='%h %ad%n%B' --date=short 758d373   # failure: -s and --name-status incompatible
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 90bdc3a
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 7312d4c
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 1c1b728
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short a590846
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short c08eeee
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 7d6db6b
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 758d373
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/frontend_assembly/spa-assemble-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- README.md
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR rev-list --count 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- README.md
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- README.md
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree c852c54 -- README.md distro/configs/openmrs/frontend_assembly/spa-assemble-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/frontend_assembly/spa-assemble-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show c852c54:distro/configs/openmrs/frontend_assembly/spa-assemble-config.json   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short c852c54
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short 886cd9b
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short 23dbe73
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short eb80724
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short c3a7e96
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short 17d1b1f
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad %s' --date=short c8fb59c
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 9de5ce9 -- README.md
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 9de5ce9:README.md   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 9de5ce9
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 6abb17e
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- scripts/apply-overrides.groovy
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --full-history --name-status --no-renames --format='@@ %h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- '*configs/openmrs/overrides*'
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --full-history --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/overrides/modules/drools-1.1.0-SNAPSHOT.omod
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree -r 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/overrides
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 3bdf66f
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 792c607
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad %s' --date=short 8324e11 -- distro scripts
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/mosul/configs/openmrs/frontend_config/msf-mosul-frontend-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/matsapha/configs/openmrs/frontend_config/msf-matsapha-frontend-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/bunia/configs/openmrs/frontend_config/msf-bunia-frontend-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/configs/openmrs/frontend_config/msf-frontend-config.json
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short f71c4f5
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='%h %ad%n%B' --date=short 9af9025
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/mosul/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- scripts/remove-importmap-entries.groovy
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short e88d16f
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short e36c0c4
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short 16603b7
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short d63ea0e
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/bunia/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- sites/matsapha/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR rev-list --count 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree c8fb59c -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR ls-tree 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- distro/pom.xml
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR cat-file -t 176b378:distro/pom.xml   # failure: missing object
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short 7de2fbe
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short 185e757
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR show --name-status --no-renames --format='=== %h %ad%n%B' --date=short 272b488
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --full-history --name-status --no-renames --diff-filter=AD --format='@@ %h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- '*spa-assemble-config*' '*spa-build*' '*frontend_config/*.json'
docs/mfe-history-review/tools/hist.sh MSF-OCG__LIME-EMR log --format='%h %ad %s' --date=short 4de9e4139c74b15c5af0cdc02a97c2e2eadf56de -- docs/README.md documentation/README.md
```

## Summary

Commits up to the snapshot: 1036 (2024-04-11 to 2026-10-06). Points: 7 (clarified: 4, inconclusive: 3, resolved by the snapshot: 0).

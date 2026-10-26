---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
inputs:
  clone: data/samples/mfe-sample-001/repos/Alex18gr__react-ng-vite-systemjs-spa-app
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Repository overview

History up to snapshot has two commits, both from 2025-05-16. Root `8a9367e` (2025-05-16, “initial commit”) adds all projects; `1fe831d` (2025-05-16, “Readme improvements”) changes only `README.md`. Thus manifests, configurations and sources involved in points below did not change between first observable presence and snapshot. Initial tree listing confirms queried React, React/Vite and root config files. This is not gradual composition introduction: composition already appears complete in first versioned state.

Historical clarification is limited to artifact continuity across both commits. It proves neither previous dependency usage, execution of commented-out passages nor abandonment. It also cannot separate code origins regarding external example mentioned at README.md:2. Relevant snapshot contents are same files added at root, since only later change is README; no old contents or missing objects needed requesting. Structural and composition reviews have no `Undetermined` values, build/deploy has no `Undetermined` deploy, and all three documentation claims are corroborated.

## Points

| # | Point | Origin | Question | Commits | Result |
|---|---|---|---|---|---|
| 1 | `@types/systemjs` is declared in react-app without explicit reference | 3.4.2 (react-app/package.json:60) | dependency use | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 2 | Usage of `ts-config-single-spa` by react-app build is undetermined | 3.4.2 (react-app/package.json:45) | dependency use | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 3 | `webpack-config-single-spa-react` is declared, but configuration uses another preset | 3.4.2 (react-app/package.json:49) | dependency use | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 4 | `webpack-config-single-spa-ts` is declared in react-app without usage in this unit | 3.4.2 (react-app/package.json:51) | dependency use | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 5 | React-vite-app declares `systemjs` and contains commented-out dynamic styleguide loading | 3.4.2 (react-vite-app/package.json:19); 3.4.4 (react-vite-app/src/App.tsx:26) | dependency use | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 6 | Root config declares `systemjs`, but loads SystemJS through CDN | 3.4.2 (root-config/package.json:48) | dependency use | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 7 | Usage of types `@types/systemjs` by root config build is undetermined | 3.4.2 (root-config/package.json:23) | dependency use | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 8 | Usage of `ts-config-single-spa` by root config build is undetermined | 3.4.2 (root-config/package.json:36) | dependency use | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 9 | Instructions and import-map-overrides restriction meta are commented out | 3.4.4 (root-config/src/index.ejs:22-24) | active or abandoned | — | resolved by the snapshot |
| 10 | Production map is commented out, while unit map exists only in local mode | 3.4.4 (root-config/src/index.ejs:60); 3.4.5, Overview; 3.4.6, Overview and observation 4 | active or abandoned | 8a9367e 2025-05-16 initial commit; 1fe831d 2025-05-16 Readme improvements | clarified |
| 11 | There is a commented-out import call for root config itself | 3.4.4 (root-config/src/index.ejs:197) | active or abandoned | — | resolved by the snapshot |
| 12 | ZoneJS script on root config page is commented out | 3.4.4 (root-config/src/index.ejs:91) | active or abandoned | — | resolved by the snapshot |

## Observations

**1. SystemJS types in react-app.** Manifest, tsconfig, declarations and unit sources are added in `8a9367e` and unchanged up to `1fe831d`. History clarifies declaration without explicit reference already accompanies first observable state; no usage removal is recorded between states. It explains neither declaration reason nor implicit compiler usage. Snapshot `No` remains.

**2. ts-config-single-spa in react-app.** Tsconfig extension and build with Babel/webpack preset already coexist at root and do not change afterward. Result clarifies continuity, without resolving internal tsconfig reading by installed preset, outside available artifacts. The `Undetermined` in 3.4.2 remains; intention or abandonment is not inferred.

**3. React preset without TypeScript.** Declaration of `webpack-config-single-spa-react` and direct usage of `webpack-config-single-spa-react-ts` already coexist in first state and remain identical. No replacement is recorded in this history. This delineates absence of earlier observable stage with direct usage of former, without proving origin or motivation. The `No` remains.

**4. TypeScript preset in react-app.** React-app manifest and webpack are added at root without later change. Usage of `webpack-config-single-spa-ts` in another project, root-config, also already exists in this state; no transfer between units is recorded. Conclusion is only continuity of declaration without direct usage in this unit, retaining `No`.

**5. SystemJS and styleguide import in react-vite-app.** Manifest, App.tsx and vite.config.ts are added at root and do not change. Thus static styleguide import (react-vite-app/src/App.tsx:6) already coexisted with commented-out dynamic block (:20-34), rather than replacement appearing between available commits. Static import is used in JSX (:83-89); commented-out passage would use global `System`, without demonstrating usage of `systemjs` copy declared in manifest. History clarifies coexistence since first state, but cannot determine earlier experiment, copying or abandonment. Dependency and construct `No` remain.

**6. SystemJS in root config.** package.json and index.ejs are added at root and do not change: declared dependency already coexisted with CDN loading (root-config/src/index.ejs:95-99). No migration between installed package and CDN is recorded. This is limited historical conclusion; installed dependency usage is not proven, and `Undetermined` remains.

**7. SystemJS types in root config.** Manifest, tsconfig, declarations and sources are identical since first commit. Generic type inclusion and global `System` accesses do not belong to different stages of available history. This clarifies continuity, but does not verify internal preset typechecking; `Undetermined` remains.

**8. ts-config-single-spa in root config.** Tsconfig extending package and build with Babel/webpack preset already coexist in first state and do not change. No historical tool change explains declaration. Clarification is limited to file continuity; internal reading by preset remains outside snapshot and `Undetermined` remains.

**9. Optional import-map-overrides configuration.** Snapshot resolves point: root-config/src/index.ejs:22 instructs uncommenting line to restrict environments; :24 contains `denylist:prod.example.com`, still inside HTML comment. Library remains loaded at :93 and panel declared at :199. This is template configuration option, rather than evidence of abandoned production environment. No specific historical query was necessary.

**10. Production map.** index.ejs and root config scripts already exist at root and do not change up to snapshot. Thus commented-out production map (:59-60) and unit map conditional on `isLocal` (:62-85) already coexist at first observable presence. No active map removal or deploy artifact addition or removal occurs between both commits. This clarifies versioned scope, but proves neither planning, abandonment nor external publication. Deploy remains `not observed`.

**11. Duplicate root config import.** Snapshot itself contains active call `System.import('@org1/root-config')` at root-config/src/index.ejs:135 and commented-out repetition at :197. Thus comment does not mean root loading was deactivated. Coexistence resolves reading without attributing historical cause to comment.

**12. ZoneJS script.** Snapshot itself has `import 'zone.js/dist/zone'` at angular-app/src/main.single-spa.ts:14, entry configured at angular-app/angular.json:25. It also declares src/polyfills.ts at angular.json:26, whose :60 imports `zone.js`. Commented-out CDN script in host does not demonstrate ZoneJS absence in application. This resolves apparent gap without inferring when or why script was commented out.

## Commands

```sh
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
docs/mfe-history-review/tools/hist.sh Alex18gr__react-ng-vite-systemjs-spa-app log --reverse --format='%H %ad %s' --date=short --name-status 1fe831db68f3ee26779b7c411b39326eed40198f
docs/mfe-history-review/tools/hist.sh Alex18gr__react-ng-vite-systemjs-spa-app rev-list --count 1fe831db68f3ee26779b7c411b39326eed40198f
docs/mfe-history-review/tools/hist.sh Alex18gr__react-ng-vite-systemjs-spa-app ls-tree -r 8a9367e8cf74242209cff0dd485377744809cc67 -- react-app root-config react-vite-app
LC_ALL=C docs/mfe-history-review/tools/fingerprint.sh | cmp - docs/mfe-history-review/tools/fingerprint-before.txt
```

First `log` command attempt was blocked before query because sandbox did not allow writing mandatory record at tools/commands.log. Same command was repeated with authorization and executed successfully. Both fingerprint comparisons ended with code 0, without differences. No query failed with missing object.

## Summary

Commits up to the snapshot: 2 (2025-05-16 to 2025-05-16). Points: 12 (clarified: 9, inconclusive: 0, resolved by the snapshot: 3).

---
schema: 1
id: 1131809149
full_name: sattasundar/SwiftSuper
url: https://github.com/sattasundar/SwiftSuper
commit: a779c4541bce1bae898e1e41cbf5e1b42435ac8c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [swiftui, react-native]
build_tools: []
frontend_units: 4
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 159 — sattasundar/SwiftSuper

## Context

“Swift SuperApp”: **native iOS** app (SwiftUI) presented as “demonstrating a micro-frontend architecture for native iOS development” (`README.md:3`). The repository contains only the host. “Mini Apps” are registered in `MiniAppManager` and displayed in `TabView` tabs:
- `Books` and `PrayerTime`, remote Swift packages from other repositories, integrated through Swift Package Manager;
- `Oblation`, a React Native mini-app loaded by `RCTRootViewFactory` from a JS bundle served by Metro or embedded in the app.

The `MiniApp` contract comes from remote package `Core`. Mini-app code, including `Packages/Oblation`, is not in the repository. The repository name is not used as evidence.

`data/samples/mfe-sample-001/clones.csv:160` records rank 159, ID 1131809149, status `cloned`, branch `master` and the front matter commit, which is HEAD of the clone and `origin/master`. Every Git command in the clone used `GIT_NO_LAZY_FETCH=1`, with reading through `${SHA}:caminho` (the original placeholder means SHA:path). No installation, build, execution or network access occurred; remote packages were not accessed.

## Sample provenance

`data/samples/mfe-sample-001/sample.csv:160` records strategy `terminology` and eligibility `pass`. The sample comes from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). The ID is in `data/discovery/mfe-round-001/candidates.csv:23139` (`unknown`) and `data/discovery/mfe-round-002/candidates.csv:23146` (`pass`).

A `sqlite3 -readonly` query of the `hits`, `queries` and `subqueries` tables from both rounds, filtered by ID, returns the same two hits in each round, from endpoint `repositories`, with subquery `…#created:2026-01` and empty `path`:

| Query (`q`) | Collection 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:30:54.687Z / 2026-10-08T15:57:44.440Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:58.776Z / 2026-10-08T16:07:54.827Z |

Effective queries append `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Hit metadata:
- null description, no topics, language Swift, `fork: false`, size 68;
- created at 2026-01-10T18:28:35Z, pushed at 2026-01-13T22:31:02Z.

Without a description, the hit comes from `README.md:3`, “…demonstrating a micro-frontend architecture…”, hyphenated and the only occurrence. The plural “micro frontends” does not appear in the README; that hit depends on GitHub search text processing, which is not recorded.

The README's last change is `6564d15` (2026-01-14), before October 2026 collection. The SHA's README does not postdate searches.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | `git ls-tree -r` at the SHA: 24 entries, all regular `100644` files; zero symlinks and zero gitlinks. There is an Xcode project (`SwiftSuper.xcodeproj`, `SwiftSuper.xcworkspace`), Swift sources in `SwiftSuper/`, `Podfile` and React Native `package.json`. No `Packages/` or `index.js`, although the README cites them (`README.md:64`, `81`, `205–207`). `.gitignore:1–6` ignores only `node_modules`, `build`, `Pods` and lockfiles. | context |
| Configuration (packages) | `SwiftSuper.xcodeproj/project.pbxproj:149–151`, `509–534`: `XCRemoteSwiftPackageReference` for `Core`, `Books` and `PrayerTime` (`github.com/sattasundar/...`). `SwiftSuper.xcworkspace/xcshareddata/swiftpm/Package.resolved:4–30`: the three dependencies pinned on branch `master`. Integrated at build time into the host binary. | moderate |
| Source code (registration and mounting) | `SwiftSuper/MiniAppManager.swift:1–25`: imports `Core`, `PrayerTime` and `Books` and registers `PrayerTimeMiniApp()`, `BooksMiniApp()` and `OblationMiniApp()`. `SwiftSuper/ContentView.swift:16–61`: one tab per mini-app, with `MiniAppWrapper` calling `makeRootViewController`. | strong |
| Source code (React Native) | `SwiftSuper/OblationMiniApp.swift:11–37`: `rootViewFactory().view(withModuleName: "Oblation", …)` with bundle from `http://localhost:8081/index.bundle?platform=ios` in debug or `main.jsbundle` in release. `SwiftSuper/AppDelegate.swift:5–46`: `RCTAppDelegate`, `sourceURL` preferring a local OTA bundle. `SwiftSuper/BundleManager.swift:31–78`: simulated OTA download (“MOCK”). `Podfile:7–22`, `package.json:8–11`: React Native 0.83.1. | moderate |
| Documentation | `README.md:7–45`: host and “Mini Apps” (`Books`, `PrayerTime`, `Oblation`). `README.md:101–147`: several RN mini-apps aggregated into a single `index.js` and bundled by Metro. `README.md:156–175`: OTA update strategy. | moderate |
| Source code (boundaries) | The host imports mini-apps as Swift modules (`MiniAppManager.swift:2–4`), i.e., package source code compiled together. No relative imports outside the project. `Oblation` is connected only by RN module name and bundle URL. | context |

## Authorship and history

Non-shallow clone; 11 commits, 1 merge (`dbc27cc`), all by the same owner. There are 10 by `sundarsatta@outlook.com` (9 as “sattasundar”, 1 through GitHub) and root `1d45b1d` (2026-01-10, “Initialize SwiftSuper project structure…”) by `Sattasundar.Parida <sattasundar.parida@gordian.com>`. According to `git log --no-renames --name-status`:
- `8c729e4` adds remote package references;
- `7d725a4` (2026-01-14, “Implement to load react native mini app inside swift superapp”) adds `AppDelegate.swift`, `OblationMiniApp.swift`, `Podfile` and `package.json`;
- `dcbda1e` adds `BundleManager.swift`;
- the SHA changes only `project.pbxproj`.

Repositories `Core`, `Books` and `PrayerTime` were not consulted. No historical blob was read. The clone is partial (`blob:none`) and `git rev-list --objects --missing=print` reports 13 missing promisor objects in reachable history; snapshot blobs were read locally, without network, and historical conclusions depending on them remain limited.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | Yes | Host plus three units referenced by host configuration: `Books` and `PrayerTime` (`project.pbxproj:509–534`; `Package.resolved:4–30`) and `Oblation`, an RN module loaded by name and bundle URL (`OblationMiniApp.swift:16–31`). |
| Q2 | Undetermined | `Books` and `PrayerTime` live in their own repositories, but are compiled into the host binary (`MiniAppManager.swift:2–4`): this is the open decision “Build-time composition… is independent deployment required?”. `Oblation` has its own JS bundle with planned OTA updates, but its source and build are not observable (`README.md:79–96`, `101–147`). |
| Q3 | Yes | The host registers and mounts mini-apps in tabs (`MiniAppManager.swift:17–22`; `ContentView.swift:16–46`). |
| Q4 | Undetermined | Connection is through SPM at build time (open decision) and `RCTRootViewFactory` at runtime for a bundle whose source is not in the repository (`OblationMiniApp.swift:15–31`). Actual use cannot be verified in the snapshot. |
| Q5 | No | The case is a native iOS super-app with Swift/React Native mini-apps, outside the study's web frontend scope. |

## Rationale

- The `Non-MFE` rule applies: the study is restricted to web frontends, whereas the host is native SwiftUI and units are Swift/React Native.
- **Build-time:** Swift mini-apps are packages integrated at build time, the case anticipated by the open build-time composition decision (`approaches: [build-time-packages]`, slug anticipated in the template).
- **RN mechanism:** runtime RN bundle loading through `RCTRootViewFactory` has no template slug; recorded in the Notes.
- **Inapplicable precedents:** not code sharing (089/100) or a third-party platform (102/074/080). The chain is incomplete in the snapshot (076/084/096/106/109), because mini-apps are external.
- **Fields:** `frontend_units: 4` (host, `Books`, `PrayerTime`, `Oblation`), `unit_organization: multi-repo`. `ui_technologies: [swiftui, react-native]`. `build_tools: []`: the RN mini-app bundler is not declared separately and `Oblation`'s JS entry (`index.js`) is absent from the snapshot, preventing proof of a unit bundle; however, Metro is referenced as a toolchain (`@react-native/metro-config` and script `react-native start`, `package.json:5–6,17–21`) and there is a host `.xcodeproj` with `Podfile`, so claiming no explicit configuration would be inaccurate. The field decision (record Metro or only bundlers of units built in the snapshot) remains subject to study convention. `repo_type: example`, because of the demonstration with simulated OTA (`BundleManager.swift:31–78`).

## Analysis notes

- **RQ2:** native super-app with mini-apps through three routes: Swift packages (build time), React Native bundle loaded by module name (runtime) and documented OTA strategy (`README.md:156–175`). This broadens vocabulary beyond the catalog's web approaches.
- **RQ3:** documentation describes local `Packages/` (`README.md:205–207`) absent from the repository; actual units are remote.
- **Protocol (scope):** third mobile or native case (after 025 and 057). The scope rule should be fixed in the checklist.
- **Protocol (search):** the plural hit has no corresponding spelling. Eligibility changes from `unknown` (001) to `pass` (002).

## Point for joint review

1. **Native and mobile scope:** do native iOS app units (SwiftUI and React Native) enter the study? If not, the class is `Non-MFE` (out of scope), as anticipated in 025/057.
2. **If included:**
   - **Build time:** do Swift packages integrated at build time satisfy Q2/Q4?
   - **Oblation:** does loading the RN bundle, whose source is outside the snapshot, suffice for Q4?
   - **Outcome:** with both answers positive, the class would be `MFE-implemented`, with a host referencing external units, as in 008/040/087.

No new rule is proposed. Until a decision, preserve `Uncertain`/`review`.
- **Independent review contribution (Lupa):** agreement with `Uncertain`/`review`. Disagrees with Q4: proposes Q4 = Yes for the SwiftPM route, because packages `Core`, `Books` and `PrayerTime` are referenced by URL and revision in Xcode (`project.pbxproj`; `Package.resolved`), their names are imported and instantiated and the host registers and mounts them (`MiniAppManager.swift:17–24`; `ContentView.swift:16–46`), i.e., build/link connection and protocol execution, rather than only a declared dependency; for `Oblation`, registration, JS entry and a demonstrable bundle are missing. Q4 retained as Undetermined, because this route is precisely the build-time composition whose sufficiency is open in the checklist (`docs/mfe-classification-checklist.md:69–72`), and Q2 and Q5 remain Undetermined; the alternative is recorded for joint decision (Q4 Yes for SwiftPM, with the normative uncertainty moved to Q2). Precedents 025 and 057 retain mobile/native scope under review; if the protocol is web-only, the result would be Non-MFE by scope. Remote source limitations must not become a favorable conclusion based on documentation.

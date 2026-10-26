---
schema: 1
id: 810080366
full_name: dcblakesley/Controls
url: https://github.com/dcblakesley/Controls
commit: 60fed83f345f65a29984115994d0dad6ce0e389c
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [blazor]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 112 — dcblakesley/Controls

## Context

WssBlazorControls is a Blazor form-control and UI library distributed as a NuGet package, with demonstration components in another Razor Class Library and a Blazor test/demo application. Support for MFE consumers is real at asset-resolution and component-tree configuration level, but constitutes neither an MFE application unit nor composition between applications in this repository (`README.md:6–19`; `README.md:63–71`; `Controls/Helpers/JsModuleUrl.cs:3–16`).

`frontend_units: 1` counts the FormTesting application, with host and WebAssembly client of the same application. It does not add Controls/Controls.Demo, demo pages, bUnit/E2E tests, helper JS files or screenshots. Count follows from complete inventory and inspected projects/entries.

## Sample provenance

- Rank 112, ID, identity and strategy `terminology`: `data/samples/mfe-sample-001/sample.csv:113`. Clone, branch `master` and SHA checked in `data/samples/mfe-sample-001/clones.csv:113`. The sample derives from round 002 (`data/samples/mfe-sample-001/manifest.json:2–5`).
- `data/discovery/mfe-round-001/candidates.csv:8701` records eligibility `unknown`; `data/discovery/mfe-round-002/candidates.csv:8707`, `pass`. Both record null description, empty topics, C# language, MIT license, `fork: false` and last push `2026-10-01T16:01:33Z`.
- `sqlite3 -readonly` query in databases `data/discovery/mfe-round-001/discovery.sqlite` and `data/discovery/mfe-round-002/discovery.sqlite`, joining `hits`, `queries` and `subqueries`, by `repository_id=810080366`: both have the two hits below, strategy `terminology`, endpoint `repositories`, empty `path` and `partition_label: created:2024-06`.

| Query | Spelling of `q` | Subquery | Spelling of `q_effective` |
|---|---|---|---|
| `terminology-micro-frontend-repositories` | `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2024-06` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2024-06-01..2024-06-30` |
| `terminology-micro-frontends-repositories` | `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2024-06` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2024-06-01..2024-06-30` |

Values of `fetched_at`, in order of the two queries, are `2026-10-07T22:19:13.262Z` and `2026-10-07T22:50:12.634Z` in round 001; `2026-10-08T15:53:18.150Z` and `2026-10-08T16:04:57.527Z` in round 002. SQLite identifiers are not code-line references.

By elimination, name, null description and empty topics do not explain terms. README contains hyphenated singular form `micro-frontend` in `README.md:68`, `:262`, `:274` and `:1360`, and plural `micro-frontends` in `README.md:2285`. Queries use space-separated words. These spellings are compatible with README retrieval, but database identifies neither exact excerpt nor matching normalization. Name and hits do not confirm architecture.

README at the SHA **is not later than searches**: its last modifying commit is HEAD itself, from `2026-10-01T09:01:29-07:00` (`2026-10-01T16:01:29Z`), before all four collection times. Chronology was checked through metadata; no historical README needed reading.

## Observed evidence

| Dimension | Observation (artifact:line) | Strength |
|---|---|---|
| Structure | Complete inventory through `git ls-tree -r` of the SHA: 490 regular files, all mode 100644; zero symlinks and zero gitlinks. `Controls/`: 184 files; `Controls.Demo/`: 51; `FormTesting/`: 246; `.claude/` and `.github/`: one each; seven files at root. No `node_modules`, npm manifest, submodule or JS bundler configuration. Git-tree counts, without artificial text lines. | context |
| Structure / Build/deploy | Controls uses `Microsoft.NET.Sdk.Razor`, target `net10.0` and PackageId `WssBlazorControls` (`Controls/Controls.csproj:1–14`); Controls.Demo is also a Razor Class Library and declares a demo-component package (`Controls.Demo/Controls.Demo.csproj:1–14`; `Controls.Demo/Controls.Demo.csproj:33–38`). Demo references Controls as library (`Controls.Demo/Controls.Demo.csproj:65–67`), not application remote. | contrary |
| Structure / Build/deploy | Host uses `Microsoft.NET.Sdk.Web`, references client and Blazor WebAssembly Server package (`FormTesting/FormTesting/FormTesting.csproj:1–14`); client uses BlazorWebAssembly SDK, target `net10.0`, and references Controls/Controls.Demo (`FormTesting/FormTesting.Client/FormTesting.Client.csproj:1–18`). These are parts of the same demo application, not multiple independent composed UIs. | contrary |
| Source code (host/client) | Host registers Razor Components with interactive WebAssembly and maps `App` with client assembly (`FormTesting/FormTesting/Program.cs:9–13`; `FormTesting/FormTesting/Program.cs:31–37`). Client starts a `WebAssemblyHostBuilder` (`FormTesting/FormTesting.Client/Program.cs:7–11`). Root page presents `Routes` and Blazor runtime (`FormTesting/FormTesting/Components/App.razor:18–22`); `Routes` uses the client’s own assembly (`FormTesting/FormTesting.Client/Routes.razor:1–5`). | contrary |
| Source code (consumption) | Page `/` imports Controls/Controls.Demo and directly renders `<EditControlsDemo />`, optionally under `FormDefaults` (`FormTesting/FormTesting.Client/Pages/Examples.razor:1–23`). These are application-consumed components, without a second unit’s own build/browser-entry. Styles and scripts are RCL assets (`FormTesting/FormTesting/Components/App.razor:11–13`; `FormTesting/FormTesting/Components/App.razor:20–22`). | contrary |
| Configuration / Source code (MFE support) | `FormDefaults.AssetBase` is a parameter prefixing absolute URLs of `wss-*.js` modules (`Controls/FormDefaults.razor.cs:61–72`). `JsModuleUrl.Resolve` returns a file URL under `_content/WssBlazorControls/`, using default origin or supplied base (`Controls/Helpers/JsModuleUrl.cs:9–16`). This mechanism loads control assets, without selecting/mounting applications or publishing an MFE lifecycle. | moderate |
| Source code (actual feature use) | Interoperability performs fallback import of `edit-controls.js` and repeats helper call when necessary (`Controls/JsInteropEc.cs:150–182`). Test page `JsInteropFallback` wraps a local form with `AssetBase` (`FormTesting/FormTesting.Client/Pages/JsInteropFallback.razor:1–8`). Showcase hook points modules to a nonexistent path to test degraded mode, restricting it to same-origin paths (`FormTesting/FormTesting.Client/Pages/Examples.razor:6–14`; `FormTesting/FormTesting.Client/Pages/Examples.razor:30–49`). This confirms library functionality, without supplying a second MFE unit. | context |
| Source code (boundary search) | Ran `git grep` for literals `../../`, `../../../` and Windows variant `..\..\` in all `*.cs`, `*.razor`, `*.js`, `*.ts` and `*.csproj` files at the SHA. Four results: references to Controls/Controls.Demo in client project (`FormTesting/FormTesting.Client/FormTesting.Client.csproj:17–18`) and test project (`FormTesting/FormTesting.Client.Tests/FormTesting.Client.Tests.csproj:30–33`). These are project/library references; neither absence of references between folders nor independence through sampling is asserted. | context |
| Technology / Build/deploy | .NET SDKs and targets are declared; library, demo, host and client use Blazor 10.0.12 packages (`Controls/Controls.csproj:93–95`; `Controls.Demo/Controls.Demo.csproj:57–66`; `FormTesting/FormTesting/FormTesting.csproj:11–14`; `FormTesting/FormTesting.Client/FormTesting.Client.csproj:11–18`). ProjectReference paths and entries exist. No restore lockfile or JS bundler configuration exists in inventory. No restore/build run: `build_tools: []` does not infer a bundler from .NET/Blazor. | context |
| Technology / Configuration / Composition | Text search at the SHA for `ModuleFederation`, `remoteEntry`, `registerApplication`, `single-spa`, `qiankun`, `wujie`, `customElements`, `postMessage`, `iframe`, `importmap` and `loadRemote`: no application-composition chain. Microfrontend mentions in comments/documentation concern consumers and assets. Iframe hits in host Bootstrap CSS are not own integration implementation; host Bootstrap assets do not become a frontend unit. | absent |
| Documentation / Architecture | README describes library and NuGet installation (`README.md:6–26`) and scenario where an external host does not serve library assets (`README.md:63–71`). Project architecture documentation describes Controls, RCL Demo and host/client (`CLAUDE.md:45–49`) and states consumers are frequently MFEs, guiding per-tree defaults (`CLAUDE.md:51–58`). This informs compatibility requirements, not concrete consumers composed by snapshot. No separate ADR exists in inventory; architectural guidance and README are observed sources. | context |

## Authorship and history

Metadata at the SHA: 991 reachable commits, 19 merges, one root commit `27e4a4861f464732e01095be296dcb8a4e7d9538`, non-shallow clone. All record author and committer `David Blakesley`; root is from 03/06/2024 (UTC of 04/06), HEAD from 01/10/2026. The only refs are `master`, `origin/master` and `origin/HEAD`, at the evaluated SHA; no other-branch content was used.

`git log --no-renames --name-status` for `Controls/`, `Controls.Demo/`, `FormTesting/FormTesting.Client/` and `FormTesting/FormTesting/`, always with `GIT_NO_LAZY_FETCH=1`, shows evolution of controls and demo application. `333421926e4856b723defe9e08b6c9c8e18711ab` (“Add project files.”) adds host/client; `e832dbde048395010bfe0f33cb50cd4cfb9e01e8` extracts demo components into separate RCL/package; `8fca42015bbb2ea41d541678163165e8d1da9eb1` updates .NET and test dependencies; HEAD modifies comments/sources and removes old documentation/images. No object was missing in these queries, nor were historical blobs read.

Git identity and history support maintenance under the owner, without proving originality of every component or Blazor scaffold. Bootstrap is third-party styling code in host; it was not counted as own target. Demo library extraction and project references were not reinterpreted as remote application implementation.

## Checklist

| # | Answer | Evidence |
|---|---|---|
| Q1 | No | One host/client demo application, consuming two RCLs as libraries (`FormTesting/FormTesting/FormTesting.csproj:11–14`; `FormTesting/FormTesting.Client/FormTesting.Client.csproj:16–18`). Asset compatibility with MFE consumers identifies no other concrete frontend unit (`Controls/Helpers/JsModuleUrl.cs:9–16`). |
| Q2 | No | Library builds and application host/client parts exist, without two frontend units having independent entries/builds for composition. Page imports local components through project references (`FormTesting/FormTesting.Client/Pages/Examples.razor:1–23`; `FormTesting/FormTesting.Client/FormTesting.Client.csproj:16–18`). Complete path search was performed and records observed links. |
| Q3 | No | Router loads pages from the same client assembly and root uses conventional Blazor runtime (`FormTesting/FormTesting.Client/Routes.razor:1–5`; `FormTesting/FormTesting/Components/App.razor:18–22`), without a host composing distinct frontend units. |
| Q4 | No | Implemented mechanism resolves/imports control helpers (`Controls/Helpers/JsModuleUrl.cs:9–16`; `Controls/JsInteropEc.cs:177–182`), not connections between applications. No remotes/exposes/consumption chain or other candidate MFE contract exists. |
| Q5 | No | Library with demo and MFE-consumer support; no MFE architecture is implemented or application unit prepared for an external host in this snapshot. |

## Rationale

- `Non-MFE`: Q1–Q5 No. `repo_type: library`; one own demo application, without counting controls, RCL Demo, E2E/bUnit tests or external libraries as units.
- Q1 requires frontend targets or explicit composition configuration references. `AssetBase` points to JS files, not a unit. Q2 requires units’ own entries/builds, not merely compilable .NET library projects. Q4 requires a configured mechanism connecting units: importing JS helpers and rendering RCL components does not satisfy this criterion.
- MFE-support code was found and inspected; it was not dismissed as a mere README word. Its actual use concerns asset origin, control defaults and JS interop degradation. It exposes no application with an external-host contract, so MFE-unit does not apply; Q2–Q4 remain No.
- No open question concerns composition of applications published as build-time packages. Observed packages are control/demo libraries; Blazor host/client share one application, not two independent frontends. Adaptation to MFE consumers does not turn the library itself into a composed consumer.
- Unlike 097/103/104, no promised host/remotes chain requires connectivity interpretation. Unlike 089/100, no federation requires code-sharing adjudication. Cases 076/084/096/106/109 and final 007 have application targets linked by an explicit mechanism; here the link is conventional library consumption.
- Cautions in 074/102/080 about origin/third-party code were applied to Bootstrap assets and scaffold, without erasing the own demo target. This is not a personal profile as in 011/064/068/073/077/101/111; instructions/snippets/tests are also not counted as units, following 023/075/081/094/105.
- `ui_technologies: [blazor]` follows from SDKs, bootstrap and Razor; `build_tools: []` because no bundler is explicitly configured. Restore, build, tests and application were not run. No classification decision remains open about links, iframes or execution failure decisive for Q4.

## Analysis notes

- **RQ1 (families):** searches for `dcblakesley`, `WssBlazor`, `blazor` and `AssetBase` in available annotations found no previously annotated sibling/template. Closest functional comparator is 108, a library with showcase, without attributing common origin.
- **RQ1 (misleading signals):** a library can have requirements and code specific to MFE environments without being MFE-unit. Line `README.md:2285` describes hypothetical/external consumers, not observable candidate remotes.
- **RQ3:** actual chain is Blazor application → Controls/Demo RCLs → JS helpers in `_content`. `AssetBase` changes only helper origin; resolution adds no routing, mount or build of another application.
- **Protocol:** query/subquery spellings were preserved; hyphenated singular/plural README predates searches. Retrieval metadata indicate textual compatibility, without certifying exact matching field/excerpt or architecture.
- **Protocol (precedent):** most direct comparator is final 015 (`015-yoonghan__walcron-microfrontend-shared.md`), an MFE-consumer component library classified Non-MFE as a build dependency, not runtime-composed unit. Count consistent with 015 (no own app, 0) and 108 (showcase, 1); here `FormTesting` is the app (1). Independent review fully agreed with class and fields.

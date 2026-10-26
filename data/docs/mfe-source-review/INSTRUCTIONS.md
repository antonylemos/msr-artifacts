# Method: source code review

Paths beginning with `docs/` preserve the organization of the source project (`repo-miner`). In this package, the corresponding analyses are in `data/docs/`. The paths and hashes recorded in the analyses retain their provenance role.

This document describes how the source code review was conducted and how to read the
`NNN-<owner>__<name>.md` files in this folder. Each file records the review of one corpus repository,
and the steps below follow the review order: reading the snapshot files comes before any judgment.

## Objective

Protocol section 3.4.4 (*Source code mining*): inspect source code for
constructs that show **how frontend units interact**. The objective is not to record
that a technology is present, but how the construct contributes to the architecture.
Mining has already located occurrences of the `src-*` patterns, line by line. This stage reads each
one, decides whether it participates in composition and searches for constructs that mining missed.

This stage does not record the complete relationship between units (direction, participants): that is
protocol section 3.4.5, covered in the composition relationship review. It does not reclassify the
repository or modify files in `../mfe-classification/`.

## Sources consulted (read only)

| What | Path |
|---|---|
| Repository list | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Occurrences | `data/mining/mfe-mining-001/repos/<owner>__<name>/matches.csv` (rows with `pattern` starting with `src-`) |
| Patterns and regular expressions | `data/mining/mfe-mining-001/manifest.json` (`config.patterns`) |
| Mining version and hash | `data/mining/mfe-mining-001/manifest.json` (`version`, `configSha256`) |
| Units | `docs/mfe-structure-review/NNN-<owner>__<name>.md` ("Units" table) |
| Snapshot files | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classification (id, commit, context) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Every `artifact:line` is relative to the snapshot's `files/` directory. The review never uses the clone in `data/samples/`.

The review does not modify anything in `data/` or rerun `mine` or `inspect-dependencies`.

Classifications, previous reviews and configurations in `config/` are consulted without modification.

## Output

One `docs/mfe-source-review/NNN-<owner>__<name>.md` file per repository, with the **same name**
as its classification file. The complete example is `008-mrmechazilla__host-app.md`.

Each file has this structure:

1. Front matter with the fields described in step 1.
2. Title `# NNN — <owner>/<name>`.
3. "Mined constructs" section: a table with the columns `Pattern`, `File:line`, `Unit`,
   `Category`, `Composition` and `Observation`.
4. "Constructs outside mining" section: a table with the same columns.
5. "Summary" section.
6. Optional "Notes" section and, when `status` is `review`, the "Point for joint review" section.

## Procedure per repository

### 1. File header

The `NNN` in the filename comes from the corresponding file in `../mfe-classification/`. The front matter records:

- `id`, `full_name`, `commit`: copied from the classification's front matter.
- `mining.output`: `data/mining/mfe-mining-001`.
- `mining.version` and `mining.config_sha256`: copied from `version` and `configSha256` in the mining `manifest.json`.
- `annotation.method`: `manual`.
- `annotation.status`: `draft` while the review has not been validated. Final validation is the researcher's responsibility, and only the researcher promotes the status to `final`.
- `annotation.date`: review date, in `YYYY-MM-DD` format.

The `commit` must match the acquisition's `acquisition.csv`. If it differs, the review is interrupted
and the discrepancy is recorded in "Point for joint review".

### 2. Copying the `matches.csv` rows

The "Mined constructs" table has one row for each row of `matches.csv` whose `pattern`
starts with `src-`, **in the same order**, without merging or omitting rows:

| Table column | CSV column |
|---|---|
| Pattern | `pattern` |
| File:line | `path` + `:` + `line` (only `path` if `line` is empty) |

Values are neither corrected nor normalized. With no `src-` rows, replace the table with the sentence
"No src-* occurrences in matches.csv."

### 3. Reading each row

For each row, open the file at the indicated line and read the surrounding block or function.

**Unit.** The application to which the file belongs. Start from the file and move up the directories:
the unit is the first directory in the structural review's "Units" table that contains the file
and was **not** judged `No` (that is, `Yes` or `Undetermined`). Compare complete path segments
(`app` does not contain `app-2/x`; `.` contains everything). If all directories containing the file are
`No`, or none exists, the unit is `—`.

| File | Containing directories, from deepest upwards | Unit |
|---|---|---|
| `src/main.ts` | `src` (No) → `.` (Yes) | `.` |
| `projects/cart/src/main.ts` | `projects/cart` (Undetermined) → `.` (No) | `projects/cart` |
| `projects/shared-lib/src/x.ts` | `projects/shared-lib` (No) → `.` (No) | `—` |

Skip `No` because it is not an application: either the file belongs to the application above it (such as
`src/` in an Angular project), or it belongs to none (library, server). Do not skip `Undetermined`:
it is an application directory with a problematic entry or build.

**Category.** Choose a category according to the construct's action:

| Category | When |
|---|---|
| `dynamic-loading` | A dynamic `import()` that loads a module at runtime (e.g., `import('remote/App')`, `import('./bootstrap')`, `React.lazy`, `defineAsyncComponent`). |
| `script-loading` | Loading another unit's bundle through a static or injected script (e.g., `<script src="https://...">`, `createElement('script')`, an `iife`/`umd` bundle URL passed to its loader). |
| `remote-resolution` | Resolving a remote module by name, manifest or entry URL (e.g., `loadRemoteModule`, `loadRemote`, `loadManifest`, `initFederation`, `registerRemotes`). |
| `custom-element` | Defining a custom element for consumption (`customElements.define`, `extends HTMLElement`, `createCustomElement`, `attachShadow`) or consuming it (tag in HTML or JSX). |
| `runtime-composition` | Mounting, unmounting or registering applications at runtime (`mount`/`unmount`, `registerApplication`, `registerMicroApps`, single-spa or qiankun lifecycles). |
| `host-relationship` | A declaration in code of which applications the host uses and where (a route table or application registry naming the units), when the line is the declaration rather than the loading call. |
| `embedding` | Embedding another unit in a page (`<iframe>`, `createElement('iframe')`). |
| `communication` | An inter-unit communication mechanism, where it is defined or triggered (`CustomEvent`/`dispatchEvent`, `postMessage`, `BroadcastChannel`, the `storage` event, a shared reactive service or bus). |
| `other` | Another composition mechanism that does not fit the categories above; the Observation explains it. |
| `none` | The line is not a composition construct: a pattern false positive (e.g., `dispatchEvent` for an internal event, `mount` from a testing library). |

An `import { x } from '<pacote>'` line receives the category of the use it enables. The original placeholder `<pacote>` means `<package>`.

**Composition.** Apply these decision rules in this order:

| Answer | When |
|---|---|
| `No` | The construct is inactive (commented out, in a file that no other file imports or no build uses), is internal to the unit itself (e.g., `import('./bootstrap')`, `import()` of a local file), or its category is `none`. |
| `Yes` | The construct is active and loads, resolves, mounts, registers, defines for consumption or communicates with **another** unit, within the snapshot or external (a remote at another URL). |
| `Undetermined` | Whether the construct is active or which unit is the target cannot be confirmed. |

To confirm that the construct is active, follow the chain to a unit entry point
(e.g., `main.ts` → `bootstrap.ts` → `app.config.ts` → `app.routes.ts`). A package `import`
line is `Yes` when the use it enables is `Yes`, and `No` when that use is `No`.

**Observation.** Record what the construct does, the target unit when present and the evidence
(`artifact:line`) supporting the answer. For `No`, explain the reason (e.g., "entire file
commented out, `/*` on line 1 and `*/` on line 28"). When in doubt between `Yes` and `Undetermined`, answer
`Undetermined` and explain in "Notes".

### 4. Searching for constructs outside mining

The `src-*` patterns are evaluated line by line and miss multiline constructs, custom element
consumption and loading through other APIs. Therefore, search each unit's source files
(ignoring lockfiles, `node_modules`, tests and generated files), for example with:

```sh
grep -rnE "import\(|React\.lazy|defineAsyncComponent|loadRemote|loadRemoteModule|loadManifest|initFederation|registerRemotes|System\.import|importShim|customElements|registerApplication|registerMicroApps|<iframe|postMessage|CustomEvent|BroadcastChannel|createElement\(['\"]script" data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files
```

For each custom element defined, also search for use of its tag (e.g., `<hello-app>`) in HTML,
JSX and templates.

Each construct found that is **not** in `matches.csv` becomes a row in the
"Constructs outside mining" table, with Pattern = `manual` and the same rules as step 3, **only**
if it is one of these types:

| Becomes a manual row | Example |
|---|---|
| A loading, resolution, mounting or registration call missed by the pattern (multiline, another API) | `loadRemote(` with arguments on the next line; qiankun's `start()` |
| `import()`, `React.lazy` or `defineAsyncComponent` for a module from another unit | `React.lazy(() => import('shop/ShopRoutes'))` |
| Rendering or mounting another unit's component in the host | `<MusicLibrary />` imported from the remote; a remote's `mount(ref.current)` |
| Use of another unit's custom element tag | `<hello-app>` in the shell's HTML |
| A declaration in the host of which applications it uses and where (route table, application registry) | `Routes` naming the remotes; `APP_CONFIGS` |
| An explicit inter-unit communication mechanism: a line where the mechanism is defined or triggered | `dispatchEvent(new CustomEvent(...))`, `postMessage`, `BroadcastChannel`, a service or bus shared between units |

The following do **not** become rows (when useful, include them in the Observation for the corresponding loading or mounting row):
- callbacks and props passed to or received from a remote (e.g., `onNavigate`, `onSignIn`, `isAdmin`) and attribute reads;
- an `import` line without a call: the call becomes the row, and the import goes in its Observation (e.g., `loadRemote` imported in a multiline `import { ... }`);
- an ordinary `export` of the exposed component or routes (exposure is already in the build configuration);
- each usage point of an already recorded communication mechanism (subscription, sending, `removeEventListener`);
- subsequent steps of the same construct: a construct with several steps (extracting, reassigning, adding) becomes **one** row at the first step, and the others go in the Observation.

With no additional constructs, replace the table with the sentence: "No additional constructs."

### 5. Summary

The "Summary" section contains exactly the sentence: "Constructs participating in composition: N (category: n, ...)." with N
equal to the number of `Yes` rows in both tables and categories in order of appearance.
For zero: "Constructs participating in composition: 0."

The summary counts rows annotated `Yes`, not unique composition mechanisms. In the mining table,
every occurrence is preserved and counted, including when different patterns point to
the same line or when an import and a call belong to the same mechanism. In the manual table,
the criteria in step 4 prevent rows added for repeated evidence or steps.

### 6. Notes and joint review

- **Notes** (optional): recurring false positives, constructs missed by mining, target units outside the snapshot, disagreement with the classification.
- **Point for joint review**: required if `status: review`.

When something contradicts the repository classification, the review does not propose changing it; record
the contradiction in "Notes".

## Consistency checks

Before considering a file complete, check that:

- its filename matches the classification's;
- `commit` matches the classification and `acquisition.csv`;
- `version` and `config_sha256` match the mining `manifest.json`;
- the number of rows in the first table equals the number of `src-*` rows in `matches.csv` (or the fixed sentence is present), and the two copied columns are identical;
- every `Unit` is a `Yes` or `Undetermined` directory from the repository's structural review, or `—`;
- every row has `Category` and `Composition` from the vocabulary and an observation with evidence;
- rows in the second table do not repeat `matches.csv` occurrences, all belong to a type listed in step 4, and none is a callback, prop, ordinary export, usage point of an already recorded mechanism or subsequent step of another row (or the fixed sentence is present);
- the "Summary" counts exactly the `Yes` rows in both tables;
- every citation was opened in the snapshot, and the cited line contains what was described;
- the file contains no comments or completion placeholders;
- `status` is `draft` or the value set by the researcher.

## When mining changes

If `mine` runs with another catalog (new `version`, new `config_sha256`), the files
in this folder remain valid only for the version recorded in the front matter. Repositories whose
`matches.csv` changed must be reviewed again, with the `mining` block updated.

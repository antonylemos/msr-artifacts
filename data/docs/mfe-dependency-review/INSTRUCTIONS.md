# Method: manual dependency review

Paths beginning with `docs/` preserve the organization of the source project (`repo-miner`). In this package, the corresponding analyses are in `data/docs/`. The paths and hashes recorded in the analyses retain their provenance role.

This document describes how the manual dependency review was conducted and how to read the
`NNN-<owner>__<name>.md` files in this folder. Each file records the review of one corpus repository,
and the steps below follow the order in which the review is conducted: reading the snapshot files
comes before any judgment.

## Objective

For each dependency listed by `inspect-dependencies`, decide whether the package is
**configured and in use** in the snapshot, citing the file and line. The inspection has already
extracted the name, version, section and line mechanically; this stage adds only the judgment.

This stage does **not** reclassify the repository, modify the files in
`../mfe-classification/`, or assess architecture. It answers one question per row: is the package
configured and in use?

## Sources consulted (read only)

| What | Path |
| ---- | ---- |
| Repository list | `data/inspections/mfe-dependencies-001/summary.csv` |
| Repository dependencies | `data/inspections/mfe-dependencies-001/repos/<owner>__<name>/dependencies.csv` |
| Inspection version and hash | `data/inspections/mfe-dependencies-001/manifest.json` (`version`, `configSha256`) |
| Snapshot files | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classification (id, commit, context) | `docs/mfe-classification/NNN-<owner>__<name>.md` |
| Q4 criterion | `docs/mfe-classification-checklist.md` |

The cited checklist is a methodological reference from the source project and is not reproduced in this package.

Every `artifact:line` is relative to the snapshot's `files/` directory. The review never uses the clone in
`data/samples/`: the snapshot is the tree of the classified commit, whereas the clone may be in another state.

The review does not modify anything in `data/` or rerun `mine` or `inspect-dependencies`.

Classifications, previous reviews and configurations in `config/` are consulted without modification.

## Output

One `docs/mfe-dependency-review/NNN-<owner>__<name>.md` file per repository, with the
**same name** as its classification file. The complete example is `008-mrmechazilla__host-app.md`.

Each file has this structure:

1. Front matter with the fields described in step 1.
2. Title `# NNN — <owner>/<name>`.
3. "Dependencies" section: a table with the columns `Manifest:line`, `Section`, `Package`, `Version`,
   `Technology`, `Configured` and `Evidence (artifact:line)`.
4. Optional "Notes" section and, when `status` is `review`, the "Point for joint review" section.

## Procedure per repository

### 1. File header

The `NNN` in the filename comes from the corresponding file in `../mfe-classification/`. The front matter records:

- `id`, `full_name`, `commit`: copied from the classification's front matter.
- `inspection.output`: `data/inspections/mfe-dependencies-001`.
- `inspection.version` and `inspection.config_sha256`: copied from `version` and `configSha256` in the inspection's `manifest.json`.
- `annotation.method`: `manual`.
- `annotation.status`: `draft` while the review has not been validated. Final validation is the researcher's responsibility, and only the researcher promotes the status to `final`.
- `annotation.date`: review date, in `YYYY-MM-DD` format.

The `commit` must match the acquisition's `acquisition.csv`. If it differs, the review is interrupted
and the discrepancy is recorded in "Point for joint review".

### 2. Copying the CSV rows

The table has one row for each row of `dependencies.csv`, **in the same order**, without merging or omitting rows:

| Table column | CSV column |
| ------------ | ---------- |
| Manifest:line | `manifest` + `:` + `line` (only `manifest` if `line` is empty) |
| Section | `section` |
| Package | `package` |
| Version | `version` |
| Technology | `technology` |

Values are neither corrected nor normalized: they appear exactly as they do in the CSV.

**CSV containing only the header:** replace the table with the sentence
"No dependencies for the technologies in dependencies.csv."
In this case, do not search for configuration to fill the file: a technology without its own package
(for example, Module Federation built into webpack 5) is already recorded in the classification.

### 3. Judging each row

For each row, open the files and decide the `Configured` column.

1. Open the manifest at the indicated line and confirm that the package is declared there, in the indicated section.
2. Open each item in `same_package_matches` at the indicated line, then those in `other_package_matches`.
   A file's package is the directory of the nearest `package.json` above it; subdirectories without their own `package.json` (`src/`, `projects/<app>/`) belong to the package above.
   Read the surrounding block or function, rather than just the line.
3. **Also search outside the lists.** The lists contain only the patterns that the inspection configuration
   associated with the technology (usually `cfg-*`). Code usage, such as `import ... from '<pacote>'`, may be absent from them.
   Search for the package name in the snapshot's source and build files, for example with:
   `grep -rn "<pacote>" data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files --include='*.{js,ts,mjs,cjs,json}'`
   (ignore lockfiles and `node_modules`, if present). The original command placeholder `<pacote>` means `<package>`.
4. Apply these decision rules in this order:

| Answer | When |
| ------ | ---- |
| `Yes` | A build or source file imports or invokes the package (plugin, function, builder), **and** that file is used: referenced by the build (e.g., `angular.json` → `extraWebpackConfig`) or an application entry point/route. |
| `Undetermined` | Configuration or code uses the package, but its use cannot be confirmed: a file not referenced by any build, commented-out code, or incomplete or contradictory configuration. |
| `No` | No file imports or invokes the package; there is only the manifest declaration (and perhaps scripts or documentation). |

Observations:
- Mentioning the package in a `package.json` script, a `README` or a lockfile is **not** usage.
- An occurrence in another package counts, provided the file uses **this** package (e.g., a dependency hoisted to the monorepo root, with the plugin configured in `apps/shell/`).
- Each row corresponds to a technology: if the same package appears under two technologies, judge each row using the evidence for that technology.
- When in doubt between `Yes` and `Undetermined`, answer `Undetermined` and explain in "Notes".

### 4. Recording the evidence

The `Evidence (artifact:line)` column contains:
- the minimum evidence supporting the answer: where the package is imported or invoked and, for `Yes`, what shows that the file is used;
- `path:line` or `path:start-end`, separated by `; `, with a short description in parentheses and code in backticks;
- for `No`, what was searched for and where (e.g., `no import of "@scope/x" in src/ and build configs (grep)`);
- for `Undetermined`, what exists and why there is uncertainty.

### 5. Notes and joint review

- **Notes** (optional): misleading signals, evidence found only outside the inspection lists, a package regex that seemed too broad, or a case that should become a rule.
- **Point for joint review**: required if `status: review`. Records the row whose answer depends on the researcher's decision.

When something contradicts the repository classification, the review does not propose changing it; record
the contradiction in "Notes".

## Consistency checks

Before considering a file complete, check that:

- its filename matches the classification's;
- `commit` matches the classification and `acquisition.csv`;
- `version` and `config_sha256` match the inspection's `manifest.json`;
- the number of table rows equals the number of data rows in `dependencies.csv` (or the fixed sentence is present);
- the five copied columns are identical to the CSV;
- every row has `Configured` in `Yes | No | Undetermined` and at least one piece of evidence;
- every cited piece of evidence was opened in the snapshot, and the cited line contains what was described;
- the file contains no comments or completion placeholders;
- `status` is `draft` or the value set by the researcher.

## When the inspection changes

If `inspect-dependencies` runs with another configuration (new `version`, new `config_sha256`),
the files in this folder remain valid only for the version recorded in the front matter.
Repositories whose `dependencies.csv` changed must be reviewed again, with the `inspection` block updated.

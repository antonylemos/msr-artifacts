# Method: structural review

Paths beginning with `docs/` preserve the organization of the source project (`repo-miner`). In this package, the corresponding analyses are in `data/docs/`. The paths and hashes recorded in the analyses retain their provenance role.

This document describes how the structural review was conducted and how to read the
`NNN-<owner>__<name>.md` files in this folder. Each file records the review of one corpus repository,
and the steps below follow the review order: reading the snapshot files comes before any judgment.

## Objective

Protocol section 3.4.3 (*Structural mining*): identify the **frontend application boundaries**
in each repository. Mining has already mechanically listed candidate directories
(`units.csv`). This stage records the observable structural characteristics of each
candidate and decides whether it is a frontend unit.

The analysis is cautious: multiple application directories show decomposition, but do **not** establish
an MFE implementation. This stage does not reclassify the repository, assess composition
(protocol section 3.4.5), or modify files in `../mfe-classification/`.

## Sources consulted (read only)

| What | Path |
|---|---|
| Repository list | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Candidate units | `data/mining/mfe-mining-001/repos/<owner>__<name>/units.csv` |
| File types | `data/mining/mfe-mining-001/repos/<owner>__<name>/artifacts.csv` |
| Workspace, deployment and CI occurrences | `data/mining/mfe-mining-001/repos/<owner>__<name>/matches.csv` (`ws-*`, `ops-*`, `ci-*` patterns) |
| Mining version and hash | `data/mining/mfe-mining-001/manifest.json` (`version`, `configSha256`) |
| Snapshot files | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classification (id, commit, context) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Every `artifact:line` is relative to the snapshot's `files/` directory. The review never uses the clone in `data/samples/`.

The review does not modify anything in `data/` or rerun `mine` or `inspect-dependencies`.

Classifications, previous reviews and configurations in `config/` are consulted without modification.

## Output

One `docs/mfe-structure-review/NNN-<owner>__<name>.md` file per repository, with the
**same name** as its classification file. The complete example is `008-mrmechazilla__host-app.md`.

Each file has this structure:

1. Front matter with the fields described in step 1.
2. Title `# NNN — <owner>/<name>`.
3. "Workspace" section: a workspace declaration or the fixed sentence indicating its absence.
4. "Units" section: a table with the columns `Directory`, `Markers`, `Manifest`, `Entry`,
   `Build`, `Workspace`, `Deploy`, `Frontend unit` and `Rationale`.
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

### 2. Recording the workspace

Search for the repository's workspace declaration and record it on one line in the "Workspace" section.
Accepted forms are:
- `pnpm-workspace.yaml`, `lerna.json`, `rush.json`, `turbo.json`, `nx.json`;
- `workspaces` in a `package.json`;
- `projects` in `angular.json` with more than one project, or Nx's `project.json`.

The `ws-workspaces` occurrences in `matches.csv` and the `workspace-config` files in `artifacts.csv`
are the starting point; confirm the declaration by opening the file. Without a declaration, use the fixed sentence:
"No workspace declaration."

### 3. Copying the `units.csv` rows

The table has one row for each row of `units.csv`, **in the same order**, without merging or omitting rows:

| Table column | CSV column |
|---|---|
| Directory | `directory` |
| Markers | `markers` |

Values are neither corrected nor normalized: they appear exactly as they do in the CSV.
Do not add directories absent from `units.csv`; if a unit is missing, record its absence in "Notes".

### 4. Filling in the characteristics

For each row, open the directory's files and fill each column with `artifact:line` and a
short description in parentheses, or `—` when absent:

| Column | What to look for |
|---|---|
| Manifest | Does `<dir>/package.json` exist? Cite the path. |
| Entry | Where the application entry is declared or used by the build: `main`/`browser`/`index` in `angular.json` or `project.json`; `entry` in webpack/rspack/rsbuild; the directory's `index.html` in Vite; `source.entry` in rsbuild (or the `src/index.*` convention when absent). |
| Build | Its own build configuration and how it is invoked: `vite.config.*`, `webpack.config.*`, `rsbuild.config.*` with the `build` script in `package.json:line`, or the `build` target in `angular.json`/`project.json`. A static page that needs no build: `— (static, no build)`. |
| Workspace | The line of the declaration from step 2 that includes the directory (e.g., `pnpm-workspace.yaml:2` with `packages/*`). |
| Deploy | A separate build or deployment artifact for this directory: a `Dockerfile` in the directory, a CI job that builds or publishes only this directory, hosting configuration (`vercel.json`, `netlify.toml`). Start with the `ops-*` and `ci-*` occurrences in `matches.csv`. |

A characteristic inherited from another row does not count for this one: for example, `src/index.html`
used by the root `angular.json` is the entry for the `.` row, not the `src` row.

### 5. Judging each row

Decide the `Frontend unit` column using these rules in this order:

| Answer | When |
|---|---|
| `No` | The directory is part of another unit (its entry or build is used by another row's build, such as `src/` in an Angular project), is a library or shared package without an application entry, is not frontend (server, tool, documentation), or has neither entry nor build (for example, only `package.json` and a lockfile). |
| `Yes` | The directory has its own entry that starts a UI **and** its own build (configuration or target), **or** requires no build, so it can be built or served independently as a frontend application. No build required: its entry is an HTML file in the directory itself that loads static files (JS, CSS) directly, without npm package imports requiring a bundler. |
| `Undetermined` | It has an entry or a build, but not clearly both, or the artifacts are contradictory (for example, a declared build referencing a file missing from the snapshot). |

The `Rationale` column contains a short sentence. When in doubt between `Yes` and `Undetermined`, answer
`Undetermined` and explain in "Notes".

Observations:
- A unit outside the snapshot (a remote in another repository, cited by the classification) does not become a row; record it in "Notes".
- A frontend unit can exist without its own `package.json` (projects in an Angular or Nx workspace).
- Separate deployment reinforces the boundary but is not required for `Yes`.

### 6. Summary

The "Summary" section contains exactly the sentence: "Frontend applications in the snapshot: N (dir1, dir2, ...)." with the
`Yes` rows in table order. For zero: "Frontend applications in the snapshot: 0."
This count represents the frontend application boundaries observable in the snapshot, whether or not they
participate in composition. It is not the classification's `frontend_units`, which counts the units of the MFE application,
including those outside the repository.
If N differs from the classification's `frontend_units`, explain the difference in "Notes" (for example, external units).

### 7. Notes and joint review

- **Notes** (optional): external units, differences from the classification, a unit missing from `units.csv`, misleading signals.
- **Point for joint review**: required if `status: review`.

When something contradicts the repository classification, the review does not propose changing it; record
the contradiction in "Notes".

## Consistency checks

Before considering a file complete, check that:

- its filename matches the classification's;
- `commit` matches the classification and `acquisition.csv`;
- `version` and `config_sha256` match the mining `manifest.json`;
- the "Workspace" section has a declaration with `artifact:line` or the fixed sentence;
- the number of table rows equals the number of data rows in `units.csv`, and the two copied columns are identical;
- every characteristic cell has `artifact:line` or `—`;
- every row has `Frontend unit` in `Yes | No | Undetermined` and a rationale;
- the "Summary" lists exactly the `Yes` rows;
- every citation was opened in the snapshot, and the cited line contains what was described;
- the file contains no comments or completion placeholders;
- `status` is `draft` or the value set by the researcher.

## When mining changes

If `mine` runs with another catalog (new `version`, new `config_sha256`), the files
in this folder remain valid only for the version recorded in the front matter. Repositories whose
`units.csv` changed must be reviewed again, with the `mining` block updated.

# Method: composition relationship review

Paths beginning with `docs/` preserve the organization of the source project. In this package, the corresponding analyses are in `data/docs/`. The paths and hashes recorded in the analyses retain their provenance role.

This document describes how the composition relationship review was conducted and how to read the `NNN-<owner>__<name>.md` files in this folder. Each file records the review of one corpus repository.

## Objective

**Composition-relationship mining:** for each composition relationship, record the participating units and, when observable, the direction.

The source code review recorded **constructs**, one per line of code. This stage combines them with configuration declarations into **relationships between units**. In repository R045, three shell constructs and `remotes` in `vite.config.ts` become one relationship: `shell → shop`, `host → remote`.

The file has two parts with different roles:

- **The table expresses the criteria.** Each column has a fixed vocabulary and rule, so relationships can be counted and compared across repositories.
- **The text provides the interpretation.** The "Repository overview" and "Observations" paragraphs are free-form. They capture what the table cannot express, letting readers understand the project without returning to the code.

This stage does not search for new code constructs, reclassify the repository, or modify previous reviews.

## Sources consulted (read-only)

| What | Path |
| :--- | :--- |
| Repository list | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Units | `docs/mfe-structure-review/NNN-<owner>__<name>.md` ("Units" table) |
| Configuration | `docs/mfe-dependency-review/NNN-<owner>__<name>.md` (`Configured` = `Yes` rows) and configurations cited in previous reviews |
| Constructs | `docs/mfe-source-review/NNN-<owner>__<name>.md` (`Composition` = `Yes` or `Undetermined` rows in both tables) |
| Manifests | `data/mining/mfe-mining-001/manifest.json` and `data/inspections/mfe-dependencies-001/manifest.json` |
| Snapshot files | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classification (id, commit) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Every `artifact:line` is relative to the snapshot's `files/` directory. The review never uses `data/samples/` or modifies anything in `data/`.

Classifications, previous reviews, and configurations in `config/` are consulted without modification.

## Output

One `docs/mfe-composition-review/NNN-<owner>__<name>.md` file per repository, with the **same name** as its classification file. The complete example is `008-mrmechazilla__host-app.md`.

Each file has this structure:

1. Front matter with the fields described in step 1.
2. Title `# NNN — <owner>/<name>`.
3. "Repository overview" section: free-form text.
4. "Relationships" section: a table with the columns `#`, `Source`, `Target`, `Type`, `Direction`, `Mechanism`, `In snapshot`, `Active`, `Configuration` and `Code`.
5. "Observations" section: one paragraph per relationship.
6. "Summary" section and, when `status` is `review`, the "Point for joint review" section.

## Procedure per repository

### 1. File header

The front matter records `id`, `full_name` and `commit`, copied from the classification; `inputs.mining`, copied from the source code review; `inputs.inspection`, copied from the dependency review; `status: draft` while the review has not been validated (only the researcher promotes the status to `final`); and the review date.

The three previous reviews must be `final` and have the same `commit` as `acquisition.csv`, and the input blocks must match the manifests. If anything differs, change `status` to `review` and record the discrepancy in "Point for joint review".

### 2. Gathering the evidence

- **Code:** the `Yes` and `Undetermined` rows from both source code review tables.
- **Configuration:** declarations linking units (`remotes`, `exposes`/`name`/`filename`, import map, application registry) in configurations associated with `Configured = Yes` rows and those already cited by previous reviews. Configuration **of the target** opened to resolve it (`name`, `exposes`, `filename`, `base`/`publicPath`, port) is also included, even if it had not been cited before.

### 3. Building the relationships

Evidence with the same Source, Target and Type triple becomes **one** row.

**Source.** The unit that loads, registers, uses, or embeds the other; in `communication`, the one that sends. It is a `Yes` or `Undetermined` directory from the structural review. The source code review's `Unit` column indicates where the evidence is, not who the Source is: provider-side custom element definitions, life cycles, and `exposes` belong to the consumer's relationship.

**Target.** The unit's directory when there is an explicit match in the snapshot (the remote's `name`/`exposes`, `base`/`publicPath`, filename, tag defined in the unit). A port alone is insufficient. Without a match, the Target is the name or URL as it appears in the artifact.

**Type:**

| Type | When |
| :--- |: --- |
| `host → remote` | The source loads modules or components exposed by the target (Module Federation, remote `import()`, `loadRemote`). |
| `root-config → application` | The source registers the target in an orchestrator (`registerApplication`, `registerMicroApps`). `mount`/`unmount` alone is insufficient. |
| `application → custom-element` | The source uses the target's custom element tag. The script loading the tag belongs to the same relationship. |
| `page → embedded-frontend` | The source embeds the target through `<iframe>` or loads its bundle through a script and mounts it through a global API. |
| `communication` | Units exchange messages (`CustomEvent`, `postMessage`, `BroadcastChannel`, shared reactive service). A separate row, even if the pair already has another relationship. |
| `other` | Another relationship, explained in the corresponding paragraph. |

A mixed relationship receives the type corresponding to how the target enters the source: loaded as a module → `host → remote`; registered in an orchestrator → `root-config → application`.

**Row order:** by the position of the first citation in the Code column in the source code review; relationships without Code go last; ties are ordered alphabetically by Target.

### 4. Filling in the columns

| Column | Values |
| :----- | :----- |
| # | Relationship number, used in the "Observations" paragraphs. |
| Direction | `source → target`; `bidirectional` only in `communication` with sending in both directions (Source and Target in alphabetical order); `Undetermined` when the sender or consumer is unknown. |
| Mechanism | `module-federation`, `native-federation`, `single-spa`, `qiankun`, `web-components`, `iframe`, `script`, `events` or `other`. `native-federation` is federation based on ES modules and import maps (`@angular-architects/native-federation`), without the webpack runtime; it is not a variant of `module-federation`. |
| In snapshot | `Yes` (target resolved to a unit), `No` (target identified as external), `Undetermined` (identity or location not established). |
| Active | `Yes` if at least one `Yes` row from the source code review supports the relationship; `Undetermined` if there are only `Undetermined` rows; `No` if the relationship appears only in configuration. |
| Configuration | `artifact:line (what it declares)`, separated by `; `, or `—`. |
| Code | `File:line` exactly as in the source code review, in that review's order, separated by `; `, or `—`. A line supporting several relationships appears in all of them. Every `Yes`/`Undetermined` row from the source code review appears in at least one relationship. |

### 5. Texts

**Repository overview.** One or more free-form paragraphs about the project as a whole: who the host is, how the units enter, which mechanisms it uses, the repository's purpose (demonstration, template, product), distinctive features, and what did not become a relationship (exposure without a consumer, a commented-out route, an isolated unit, callbacks exchanged between units).

**Observations.** One paragraph per relationship, in table order, beginning with `**N. Source → Target.**`. The text is free-form: how the target was resolved, what supports or limits
the row's values and what is particular to that relationship.

In both texts, cite `artifact:line` when making a claim about the code, and open each citation in the snapshot.

### 6. Summary

The summary has exactly two lines:

```
Relationships: N (type: n, ...). Active: a. Target outside the snapshot: f.
Units without a relationship: <Yes directories from the structural review outside all relationships, separated by ", "; "none" if there are none>.
```

`N` = table rows, types in order of appearance; `a` = Active `Yes`; `f` = In snapshot `No`.

When something contradicts the repository classification, the review does not propose changing it; record the discrepancy in "Repository overview".

## Consistency checks

Before considering a file complete, check that:

- the front matter follows step 1;
- every `Yes`/`Undetermined` row from the source code review is in the Code column of at least one relationship, with identical `File:line`;
- no two rows have the same Source, Target, Type triple;
- column values use the vocabularies from step 4;
- there is one "Observations" paragraph for each table row;
- every citation was opened in the snapshot;
- the "Summary" agrees with the table;
- the file contains no comments or completion placeholders.

## When a previous review changes

If a repository's structural, dependency or source code review changes, that repository's file
must be reviewed again, with `annotation.date` updated.

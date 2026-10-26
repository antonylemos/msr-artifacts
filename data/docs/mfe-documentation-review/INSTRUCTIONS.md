# Method: documentation review

Paths beginning with `docs/` preserve the organization of the source project (`repo-miner`). In this package, the corresponding analyses are in `data/docs/`. The paths and hashes recorded in the analyses retain their provenance role.

This document describes how the documentation review was conducted and how to read the
`NNN-<owner>__<name>.md` files in this folder. Each file records the review of one corpus repository.

## Objective

Protocol section 3.4.7 (*Documentation and semantic mining*): record what the documentation
claims about the architecture and compare each claim with implementation artifacts.
Documentation is semantic evidence: it provides context, but is not accepted when it contradicts
artifacts and is insufficient on its own to support an architectural interpretation.

Previous reviews (protocol sections 3.4.2 through 3.4.6) already recorded what the artifacts show. This stage reads
what the texts **say** and indicates, for each claim, whether the reviews and snapshot confirm it.
In repository 033, the README says that the two applications were "deployed as 2 separate Netlify
sites"; the build and deployment review found an artifact only for the remote. The claim is `partial`.

The file has two parts with different roles:

- **The table expresses the criteria.** Each column has a fixed vocabulary and rule, so claims
  can be counted and compared across repositories.
- **The text provides the interpretation.** The "Repository overview" and "Observations" paragraphs are free-form.
  They record what the table cannot express, allowing readers to understand the documentation without opening it.

This stage does not reclassify the repository or modify previous reviews.

## Sources consulted (read only)

| What | Path |
|---|---|
| Repository list | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Documentation occurrences | `data/mining/mfe-mining-001/repos/<owner>__<name>/matches.csv` (`doc-*` patterns) |
| Documents | `data/mining/mfe-mining-001/repos/<owner>__<name>/artifacts.csv` (`documentation` type) |
| Previous reviews | `docs/mfe-dependency-review/`, `docs/mfe-structure-review/`, `docs/mfe-source-review/`, `docs/mfe-composition-review/`, `docs/mfe-build-deploy-review/` (same filename) |
| Manifest | `data/mining/mfe-mining-001/manifest.json` |
| Snapshot files | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classification (id, commit) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Every `artifact:line` is relative to the snapshot's `files/` directory. The review never uses `data/samples/` or modifies anything in `data/`.

Previous reviews, data and configurations consulted are sources of evidence and are not
modified in this stage. Final validation is the researcher's responsibility.

## Output

One `docs/mfe-documentation-review/NNN-<owner>__<name>.md` file per repository, with the **same name**
as its classification file.

Each file has this structure:

1. Front matter with the fields described in step 1.
2. Title `# NNN — <owner>/<name>`.
3. "Repository overview" section: free-form text.
4. "Claims" section: a table with the columns `#`, `Document`, `Claim`, `Theme`, `Corroboration` and `Evidence`.
5. "Observations" section: one paragraph per claim.
6. "Summary" section.

## Procedure per repository

### 1. File header

The front matter records `id`, `full_name` and `commit`, copied from the classification; `inputs.mining`,
copied from the manifest; `status: draft` while the review has not been validated (only the researcher promotes the
status to `final`); and the review date.

The five previous reviews must be `final` and have the same `commit` as `acquisition.csv`.
If anything differs, change `status` to `review` and record the discrepancy in "Point for joint review".

### 2. Gathering the texts

- **Documents:** read in full all `documentation` files from `artifacts.csv` (`.md`) that
  discuss the project. Cite third-party files or files generated from a tool template (e.g., the default Vite
  or Angular CLI README, an automatic changelog) in the Overview, without creating a row, unless
  they contain a claim about this project.
  Within a document, code blocks reproducing source files, configurations or commands
  do not become rows (cite them in the Overview); diagrams and annotated directory trees are documentation and
  become rows like any other text.
- **`doc-*` occurrences:** open each one. Every occurrence appears in a table row or is cited
  in the Overview as a non-claim (title, isolated mention, execution instruction).
- **Comments and descriptive fields:** read comments and fields such as the `package.json`
  `description` in artifacts cited by previous reviews (configurations,
  Dockerfiles, workflows, composition code). Those making architectural claims also become rows.

### 3. Filling in the table

An **architectural claim** is a sentence stating something verifiable about frontend units as a
whole: that the project is or contains micro-frontends; which units exist and their roles (host,
remote, shell); how they compose (technology, runtime loading); how they are built and
deployed; whether they run, are developed or evolve independently; what they share
(libraries, assets, session) and what infrastructure they depend on (gateway, proxy, backends). Extract the
claim even when it appears within a command, a list or a functional description (e.g.,
"(app complète, standalone)" [English translation: "complete, standalone app"] beside an `npm run`).

Exclude: internal details of a unit (dependency injection, interceptors, simulated authentication),
relationships only between backends, infrastructure details that do not change how units are
composed or deployed (port, certificate, environment variables, access restriction), systems
outside the snapshot that do not connect to the units, and business, appearance or installation details. Include any relevant
ones in the Overview.

The same claim repeated in several places becomes **one** row, at the first location according to the order
below; include the others in its paragraph. To decide whether passages in different places make the same
claim: changing the subject, mechanism or verifiable property creates another claim (e.g., "host/remotes architecture" and "the shell loads each remote through
`loadRemoteModule`" are two claims). A technology name counts as a mechanism: text naming
a different technology from that recorded in the dependency review (e.g., "module federation" where there is
`native-federation`) is another, `contradicted` claim, even if another passage corrects the name.

Within a single sentence, split a claim into more than one row only when the parts would receive different
corroboration values. If the sentence is not split and covers more than one theme, the Theme is the first property
it mentions.

A "shared" library, asset or session is `corroborated` when at least two
units use it in the snapshot; existing or being available (alias, folder) is insufficient.

**Row order:** by document path, in byte order (uppercase before lowercase, as in `LC_ALL=C sort`), then by line.

| Column | Values |
|---|---|
| # | Claim number, used in the "Observations" paragraphs. |
| Document | `artifact:line` (or range). |
| Claim | A short passage in quotation marks, in its original language. If it is neither Portuguese nor English, the translation follows in parentheses. |
| Theme | `structure` (units and boundaries), `composition` (how units connect, technology, runtime), `build-deploy` (build, deployment, hosting), `independence` (the unit runs, is developed or evolves independently, without reference to build or deployment), `other`. |
| Corroboration | `corroborated`: previous reviews or the snapshot confirm the claim. `partial`: they confirm part of it, and the remainder has no artifact. `contradicted`: artifacts show the opposite, at least in part. `uncorroborated`: no artifact in the snapshot confirms or contradicts it (e.g., production usage, a published address without configuration). |
| Evidence | The previous review and its row or relationship (e.g., `3.4.6 #2`, `3.4.5 #1`) and/or `artifact:line` from the snapshot, separated by `; `. `—` only for `uncorroborated`. |

Within a claim that is not split, `contradicted` takes precedence over `partial`: if one part is
confirmed and another refuted, the claim is `contradicted`, and the paragraph states which part is confirmed.

### 4. Texts

**Repository overview.** One or more free-form paragraphs: what documentation exists, in which language,
what it says about the project as a whole and how it compares with what previous reviews show.
List the `doc-*` occurrences that did not become rows, template documents without claims and the
artifacts whose comments were read.

**Observations.** One paragraph per claim, in table order, beginning with `**N. Document.**`.
The text is free-form: what the claim says and what supports, limits or contradicts it.

In both texts, cite `artifact:line` when making a claim about the code, and open each citation in the snapshot.

### 5. Summary

The summary has exactly one line:

```
Claims: N (corroborated: c, partial: p, contradicted: x, uncorroborated: s). Themes: (theme: n, ...).
```

In Corroboration, all four values always appear in this order; in Themes, only those present, in vocabulary
order. Without claims: "Claims: 0."

When something contradicts the repository classification, the review does not propose changing it; record
the discrepancy in "Repository overview".

## Consistency checks

Before considering a file complete, check that:

- the front matter follows step 1;
- every `doc-*` occurrence is in a table row or cited in the Overview;
- no claim appears in two rows, and the order follows step 3;
- values use the vocabularies from step 3, and only `uncorroborated` has Evidence `—`;
- there is one "Observations" paragraph for each table row;
- every citation was opened in the snapshot;
- the "Summary" agrees with the table;
- the file contains no comments or completion placeholders.

## When a previous review changes

If a previous review of a repository changes, that repository's file must be reviewed
again, with `annotation.date` updated.

# Method: build and deployment review

Paths beginning with `docs/` preserve the organization of the source project (`repo-miner`). In this package, the corresponding analyses are in `data/docs/`. The paths and hashes recorded in the analyses retain their provenance role.

This document describes how the build and deployment review was conducted and how to read the `NNN-<owner>__<name>.md` files in this folder. Each file records the review of one corpus repository.

## Objective

**Build and deployment mining**: examine build and deployment configurations for evidence that frontend units are **built or deployed separately**. Relevant artifacts are: CI/CD workflows, Dockerfiles, deployment manifests, hosting configurations, independently versioned frontend packages, and remote hosting configurations.

The structural review already identified **one** build artifact and **one** deployment artifact per directory, where present. This stage starts from that review and answers, for each application, whether build and deployment are **separate or joint**. In repository R059, each application has its own build, but all three are published in a single nginx image: `separate` build, `joint` deployment.

The file has two parts with different roles:

- **The table expresses the criteria.** Each column has a fixed vocabulary and rules, so it is possible to count and compare applications across repositories.
- **The text provides the interpretation.** The "Repository overview" and "Observations" paragraphs are free-form. They capture what the table cannot express, letting readers understand the project without returning to the code.

This stage does not reclassify the repository or modify previous reviews.

## Sources consulted (read-only)

| What | Path |
| :--- | :--- |
| Repository list | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Applications | `docs/mfe-structure-review/NNN-<owner>__<name>.md` ("Units" table, Build, Workspace and Deploy columns) |
| Deployment and CI occurrences | `data/mining/mfe-mining-001/repos/<owner>__<name>/matches.csv` (`ops-*`, `ci-*`, `cfg-public-path` patterns) |
| Remote addresses | `docs/mfe-composition-review/NNN-<owner>__<name>.md` (Configuration column) |
| Manifest | `data/mining/mfe-mining-001/manifest.json` |
| Snapshot files | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classification (id, commit) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Every `artifact:line` is relative to the snapshot's `files/` directory. The review never uses `data/samples/` or modifies anything in `data/`.

Previous reviews, data, and configurations consulted are evidence sources and are not modified at this stage.

## Output

One `docs/mfe-build-deploy-review/NNN-<owner>__<name>.md` file per repository, with the **same name** as its classification file. Each file has this structure:

1. Front matter with the fields described in step 1.
2. Title `# NNN — <owner>/<name>`.
3. "Repository overview" section: free-form text.
4. "Applications" section: a table with the columns `#`, `Application`, `Build`, `Deploy`, `Where served`,
   `Versioning` and `Artifacts`.
5. "Observations" section: one paragraph per application.
6. "Summary" section.

## Procedure per repository

### 1. File header

The front matter records `id`, `full_name` and `commit`, copied from the classification; `inputs.mining`, copied from the structural review; `status: draft` while the review has not been validated; and the review date.

The structural and composition reviews must be `final`, share the same `commit` as `acquisition.csv`, and the input block must match the manifest. If anything differs, change `status` to `review` and record the discrepancy in "Point for joint review".

### 2. Gathering the artifacts

- Artifacts from the structural review's Build, Workspace, and Deploy columns.
- Every file pointed to by an `ops-*`, `ci-*`, or `cfg-public-path` occurrence in `matches.csv`.
- The `package.json` build scripts (at the root and in each application) and what they invoke.
- Remote addresses in the composition review's Configuration column.

Open each one. Every file pointed to by `matches.csv` appears in "Artifacts" or is explained in the text (e.g., a backend Dockerfile, a `cors` occurrence in an API server).

### 3. Filling in the table

The table has one row per `Yes` or `Undetermined` directory from the structural review, in that review's order. If there are none, replace the table with the sentence: "No frontend applications in the structural review."

| Column | Values |
| :----- | :----- |
| # | Application number, used in the "Observations" paragraphs. |
| Application | Directory, as in the structural review. |
| Build | `separate`: the application has its own build, which generates an artifact solely for it (even if a root script triggers all builds). `joint`: the application's code is included in the same build artifact as another application. `no build`: a static page served as is. `Undetermined`: cannot be established. |
| Deploy | `separate`: an artifact in the snapshot packages or publishes the application separately (image, compose service, CI job, its own hosting configuration). A dedicated job or service supports `separate` only when it packages or publishes the application separately from the others; running separate builds is insufficient. `joint`: the application is published in the same artifact as another (one image, one hosting deployment). `not observed`: no deployment artifact in the snapshot covers the application; commands used only in development (`vite`, `webpack serve`, `ng serve`, a manually run `http-server`) do not count. `Undetermined`: an artifact exists, but whether it covers the application or is in use cannot be established; or some artifacts publish the application separately while others publish it together with another (describe both forms in the application's paragraph). |
| Where served | Address where the application is published or served, with `artifact:line` (URL, path such as `/remotes/promote/`, port). Separate multiple addresses with `; `; use `—` if none exists. |
| Versioning | `Yes`: the application has its own version used to publish or release it (e.g., a job publishing the package with its name and version). `No`: not observed in the snapshot; if the `version` field is not used for publishing, it is `No`. |
| Artifacts | `artifact:line (what it does)`, separated by `; `, or `—`. Those supporting Build, Deploy, and Versioning. |

`not observed` records absence of evidence, not evidence of absence: the application may be published by something outside the repository. `Undetermined` records ambiguous evidence: a deployment artifact exists, but its relationship to the application cannot be resolved in the snapshot.

Documentation (README) is not a deployment artifact: its claims go into the text and the documentation review, but do not determine the Deploy column.

### 4. Texts

**Repository overview.** One or more free-form paragraphs about how the repository is built, packaged, and published: scripts and workspace, CI, images, compose, proxy, hosting; whether the configuration is for development or production; artifacts that do not cover any frontend application; contradictions between artifacts. Write for readers who will not open the code.

**Observations.** One paragraph per application, in table order, beginning with `**N. application.**`. The text is free-form: what supports or limits the row's values, what the application shares with others, and what is particular to it.

In both texts, cite `artifact:line` when making a claim about the code, and open each citation in the snapshot.

### 5. Summary

The summary has exactly one line:

```
Applications: N. Build (value: n, ...). Deploy (value: n, ...). Independent versioning: v.
```

`N` = table rows; in Build and Deploy, only values present, in the vocabulary order from step 3; `v` = Versioning `Yes`. Without applications: "Applications: 0."

When something contradicts the repository classification, the review does not propose changing it; record the discrepancy in "Repository overview".

## Consistency checks

Before considering a file complete, check that:

- the front matter follows step 1;
- there is one row for each `Yes` or `Undetermined` directory from the structural review, in that review's order;
- column values use the vocabularies from step 3;
- every file pointed to by `ops-*`, `ci-*`, or `cfg-public-path` appears in "Artifacts" or in the text;
- there is one "Observations" paragraph for each table row;
- every citation was opened in the snapshot;
- the "Summary" agrees with the table;
- the file contains no comments or completion placeholders.

## When a previous review changes

If a repository's structural or composition review changes, that repository's file must be reviewed again, with `annotation.date` updated.

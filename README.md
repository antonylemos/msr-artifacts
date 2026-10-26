# Research artifacts — Micro frontends (MFE)

This package brings together data and analyses from a study of public GitHub repositories that are candidates for implementing micro frontends. It covers candidate discovery, sampling, screening, corpus acquisition, mining, dependency inspection and qualitative reviews. This file explains how the package is organized and the order in which to consult it. Results are in the sources indicated below, and all links are relative.

## Folder map

| Folder | Purpose |
|---|---|
| [`config/`](config/) | Executable research method: eligibility protocol, query catalog, and sampling, acquisition, mining and inspection configurations. |
| [`data/discovery/`](data/discovery/) | Candidate discovery round, with hits per query, a diagnostic report, and text parts of the candidate CSV and SQL dump. |
| [`data/samples/`](data/samples/) | Random sample of eligible candidates and cloning records. |
| [`data/docs/`](data/docs/) | Analytical texts: classifications and eight reviews per repository, each review family with a methodology document. |
| [`data/acquisitions/`](data/acquisitions/) | Acquired corpus: a snapshot of each repository at the studied commit. Supporting material. |
| [`data/mining/`](data/mining/) and [`data/inspections/`](data/inspections/) | Structured mining and dependency inspection data, per repository. |
| [`data/clones/`](data/clones/) | Archived repository clones used in the historical review. Supporting material. |

The [inventory](data/inventory.json) records the origin, hashes and representation of materials in this cut. The [integrity guide](data/README.md) explains how to check them. Analysis metadata and manifests preserve the source's scientific references; hashes of texts after editorial revision are in the inventory. Discovery parts and clones have [reconstruction instructions](data/discovery/mfe-round-002/README.md) and [archive verification guidance](data/clones/README.md).

## Evaluation sequence

Analysis files have the same name at every stage (`NNN-<owner>__<name>.md`). This allows the same repository to be followed from one stage to the next.

1. **Method.** Start with [`config/protocols/micro-frontends.json`](config/protocols/micro-frontends.json), which defines eligibility, and the [query catalog](config/catalogs/micro-frontends.json), where each query includes its search rationale. Other configurations in [`config/`](config/) parameterize subsequent stages.
2. **Discovery.** Read the [diagnostic report](data/discovery/mfe-round-002/report.md) for each query's coverage and search limitations. Candidates are in the [CSV parts](data/discovery/mfe-round-002/candidates/), and the database is preserved in the [SQL dump parts](data/discovery/mfe-round-002/discovery.sql.parts/). The [reconstruction guide](data/discovery/mfe-round-002/README.md) explains how to obtain complete files and verify their integrity.
3. **Sampling.** The [manifest](data/samples/mfe-sample-001/manifest.json) describes random sampling, and [`sample.csv`](data/samples/mfe-sample-001/sample.csv) lists the sample.
4. **Screening.** [Classifications](data/docs/mfe-classification/) record the decision for each repository and its supporting evidence. This is the first stage with analytical text.
5. **Corpus acquisition.** [`acquisition.csv`](data/acquisitions/mfe-corpus-001/acquisition.csv) lists corpus repositories and their studied commits. Snapshots in [`corpus/`](data/acquisitions/mfe-corpus-001/corpus/) support checking evidence cited in reviews.
6. **Mining.** Data in [`data/mining/mfe-mining-001/`](data/mining/mfe-mining-001/) provides artifacts, patterns and units per repository, starting from the [summary](data/mining/mfe-mining-001/summary.csv).
7. **Dependency inspection.** Data in [`data/inspections/mfe-dependencies-001/`](data/inspections/mfe-dependencies-001/) provides dependencies by technology, starting from the [summary](data/inspections/mfe-dependencies-001/summary.csv).
8. **Qualitative reviews.** In each folder, first read `INSTRUCTIONS.md`, describing the review method, then the analysis files. The order is:
   1. [dependencies](data/docs/mfe-dependency-review/INSTRUCTIONS.md): whether each package is configured and in use;
   2. [structure](data/docs/mfe-structure-review/INSTRUCTIONS.md): which directories are frontend units;
   3. [source code](data/docs/mfe-source-review/INSTRUCTIONS.md): which code constructs make units interact;
   4. [composition](data/docs/mfe-composition-review/INSTRUCTIONS.md): which relationships connect units;
   5. [build and deployment](data/docs/mfe-build-deploy-review/INSTRUCTIONS.md): whether build and deployment are separate or joint;
   6. [documentation](data/docs/mfe-documentation-review/INSTRUCTIONS.md): what documentation claims and whether artifacts confirm it;
   7. [history](data/docs/mfe-history-review/INSTRUCTIONS.md): what commit history clarifies about ambiguous points. [Clones](data/clones/) support checking these queries;
   8. [evidence](data/docs/mfe-evidence-review/INSTRUCTIONS.md): synthesis of previous reviews into observations classified by dimension and strength.

# Method: evidence extraction and classification

Paths beginning with `docs/` preserve the organization of the source project (`repo-miner`). In this package, the corresponding analyses are in `data/docs/`. The paths and hashes recorded in the analyses retain their provenance role.

This document describes how evidence extraction and classification were conducted and how to read the
`NNN-<owner>__<name>.md` files in this folder. Each file records the analysis of one corpus repository.

## Objective

Protocol section 3.5 (*Evidence Extraction and Classification*): turn what the stage 3.4 reviews
recorded into **observations**. Each observation separates what is in the artifact
(observation) from what it indicates about the architecture (interpretation). It is then classified by
dimension, evidence type and strength.

Stage 3.5 **classifies, it does not mine**. Every observation comes from the final 3.4 reviews, and those reviews'
values do not change here. If something seems missing or wrong in 3.4, the analysis does not add or correct it:
record the point in "Point for joint review", and the researcher decides.

The file follows the protocol's order:

- **Observations:** in text, one per block, with **Observation** and **Interpretation** separated, as in the
  protocol's examples.
- **Classification:** in a table, one row per observation, with the classification fields.

## Sources consulted (read only)

| Stage | Review | Dimension |
|---|---|---|
| 3.4.2 | `docs/mfe-dependency-review/` | 1. technology and dependency |
| 3.4 tables | cited configuration files (step 2) | 2. configuration |
| 3.4.4 | `docs/mfe-source-review/` | 3. source code |
| 3.4.3 | `docs/mfe-structure-review/` | 4. structural |
| 3.4.5 | `docs/mfe-composition-review/` | 5. composition |
| 3.4.6 | `docs/mfe-build-deploy-review/` | 6. build and deployment |
| 3.4.7 | `docs/mfe-documentation-review/` | 7. documentation |
| 3.4.8 | `docs/mfe-history-review/` | 8. history |

All have the same filename. Open the snapshot (`data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/`)
to check paths and lines and read the passages that become observations, in order to
describe them. Do not consult clones in `data/samples/`.

Previous reviews, data and configurations consulted are sources of evidence and are not
modified in this stage. Final validation is the researcher's responsibility.

## Output

One `docs/mfe-evidence-review/NNN-<owner>__<name>.md` file per repository, with the **same name**
as its classification file.

Each file has this structure:

1. Front matter with the fields described in step 1.
2. Title `# NNN — <owner>/<name>`.
3. "Repository overview" section: free-form text.
4. "Observations" section: one numbered block per observation.
5. "Classification" section: a table with one row per observation.
6. "Summary" section.

## Procedure per repository

### 1. File header

The front matter records `id`, `full_name` and `commit`, copied from the classification; `status: draft`
while the analysis has not been validated (only the researcher promotes the status to `final`); and the analysis date.

### 2. Deriving observations

**One review row becomes one observation**, including `No` rows (e.g., a backend
directory, an unused dependency): the study also describes misleading signals and absences.

- **3.4.2:** one per dependency.
- **3.4.3:** one per directory in the units table.
- **3.4.4:** one per construct, from both tables.
- **3.4.5:** one per relationship.
- **3.4.6:** one per application.
- **3.4.7:** one per claim.
- **3.4.8:** one per point.

**The only exception is configuration (dimension 2).** Configuration files cited in
**any table** of the 3.4 reviews become observations, **only for blocks declaring an element
of composition**:
- a federation builder or plugin;
- a remote or host name;
- an exposed module;
- shared dependencies;
- a remote URL: the address through which the consumer resolves the remote (manifest, Module Federation `remotes`, import map). Publishing paths, such as an nginx `location`, belong to deployment (dimension 6). Development server proxies (e.g., Vite's `server.proxy`) also only forward paths and are excluded;
- an import map;
- an application registration declared in a configuration file (e.g., single-spa layout, an import map). Project registration in a workspace (e.g., `projects` in `angular.json`, `workspaces` in `package.json`) is structure (dimension 4).

Scope and unit:
- **A citation with lines** covers the block containing those lines.
- **A citation without lines** (e.g., a file in the Markers column) covers all blocks in the file that declare a composition element.
- **Unit of observation:** one block per unit. In a file for a single unit (e.g., `federation.config.js`), the block is the unit's entire configuration. In a file serving several units (e.g., `angular.json`), it is each target of each project.
- **Configuration files only, according to the file's function.** A configuration file is what a tool reads to assemble the build or runtime: JSON, YAML, `angular.json`, import map, manifest, and also JavaScript or TypeScript files dedicated to a tool (e.g., `federation.config.js`, `webpack.config.js`, `vite.config.ts`). Code executed by the application belongs to dimension 3, through its 3.4.4 row, even when it registers or routes units (e.g., `registerApplication`, routes naming remotes).

Exclude:
- citations appearing only in free-form texts;
- values that the review itself marked as supporting, such as "only corroborates" or development ports;
- blocks that do not declare a composition element, such as styles, path aliases or targets that only point to another target.

The same block cited in several places becomes a single observation, with all origins.

**Observation order:** by dimension (1 through 8) and, within each, in the source review's order. For
configuration, order by first origin, in stage and table-row order. Blocks with
the same first origin follow path and line order within the file.

### 3. Writing observations

Each observation is a numbered block beginning with `### N. Artifact`. The heading lists **all
passages** (`path:line`, separated by `; `) needed to support the observation (protocol:
*artifact path* and *location*):
- **Structure:** the directory, with entry and build passages.
- **Composition:** the line naming the target and the configurations resolving it.
- **Build and deployment:** the build artifacts and deployment artifacts.
- **History:** the point's commits, as `hash date (path)`.

```
### N. path:line; path:line

**Observation:** what is in the artifact, without judgment (raw observation).

**Interpretation:** what the observation indicates about the architecture.

**Note:** only when there is an additional note (additional notes), e.g., justification for a strength outside the guidance in step 5.
```

### 4. Filling in the classification table

| Column | Values |
|---|---|
| # | Observation number, matching the block. |
| Origin | Review and row (e.g., `3.4.2 (package.json:28)`, `3.4.3 (projects/shell)`, `3.4.5 #1`, `3.4.7 #3`); for configuration, also the column (e.g., `3.4.5 #1, #2 (Configuration)`). Separate multiple origins with `; `. |
| Dimension | `1 technology`, `2 configuration`, `3 code`, `4 structure`, `5 composition`, `6 build-deploy`, `7 documentation`, `8 history`. |
| Type | The main artifact's type: `manifest`, `configuration`, `source code`, `directory`, `deploy` (Dockerfile, compose, nginx, chart, deployment script), `CI`, `documentation` (text file), `comment` (comment or descriptive field in another artifact), `history`. |
| Approach | The mechanism shown by the observation itself, using the 3.4 names (`native-federation`, `module-federation`, `single-spa`, `web-components`, `iframe`, …), or `—`. For a claim, the mechanism it names. |
| Evidence | `technological`: shows the presence, configuration or use of an MFE technology or mechanism, without situating units. `architectural`: shows frontend units (their boundaries, build or deployment) or links between them. `context`: shows neither (e.g., backend, coordination root, external systems); retained to explain false positives and limitations. Examples below. |
| Strength | See step 5. |
| Relationships | `type target`, separated by `; `, or `—`. See step 6. |

Evidence examples:

| Case | Evidence | Why |
|---|---|---|
| Configuration of a unit with its own name, exposed modules or shared dependencies | `technological` | Configures the mechanism in one unit without naming another. |
| Host configuration naming remotes (manifest, `remotes`) | `architectural` | Links the host to other units. |
| A communication or loading mechanism implemented but not connected to any unit | `technological` | The mechanism exists; no unit uses it. |
| Local asynchronous bootstrap (`import('./bootstrap')`) without another mechanism in the same observation | `technological`, Approach `—` | A pattern associated with Module Federation, but the line alone does not show the technology. |
| Internal framework rendering (e.g., Vue's `app.mount`) | `context` | Not an MFE mechanism. |
| A frontend unit directory, build or deployment per application | `architectural` | Shows a unit's boundary. |
| Workspace root without a UI, backend, API proxy | `context` | Neither a frontend unit nor an MFE mechanism. |
| A claim about how frontend units are organized (e.g., "frontend monorepo", "host/remotes") | `architectural` | Discusses the units as a whole. |
| A claim that only names a technology | `technological` | Does not situate units. |
| A claim about backends or external systems | `context` | Does not discuss frontend units. |

### 5. Strength

Strength measures **how much the observation, on its own, supports an interpretation of MFE architecture**
(relatively independent frontend units linked by a composition mechanism). Judge it
by the observation's content, not by what other observations confirm; corroboration belongs in Relationships.

The criteria come from the protocol:
- **strong:** directly links relatively independent units through an explicit composition mechanism;
- **moderate:** a technology or composition mechanism configured or used, or a confirmed unit boundary, without establishing the full organization on its own;
- **weak:** an isolated signal, or a construct that does not participate in composition;
- **ambiguous:** competing interpretations remain plausible.

The table below is **guidance for the common case**. It derives from the value already recorded in 3.4. When
strength departs from this guidance, a justification must be recorded in the block's **Note**.

| Origin | Common case | Strength |
|---|---|---|
| 3.4.2 | Configured `Yes` or `No` | `weak` (the declaration is an isolated signal; configuration has its own observation) |
| 3.4.2 | Configured `Undetermined` | `ambiguous` |
| configuration | declares units from elsewhere as remotes, applications or targets (e.g., a host manifest or configuration naming remotes) | `strong` (protocol example: "a host configuration declares catalog and checkout as remote applications") |
| configuration | configures the mechanism in a single unit (builder, own name, exposed modules, shared dependencies) | `moderate` |
| 3.4.4 | Composition `Yes`, and the line names the target unit (call, route, tag, registration) | `strong` |
| 3.4.4 | Composition `Yes`, and the line is a route linking a path to a remote component, on its own or in a route table | `strong` |
| 3.4.4 | Composition `Yes`, and the line only imports, prepares, calls or renders the mechanism outside a route (e.g., `mount(el)`, `<Componente />`), or receives the unit as a parameter | `moderate` |
| 3.4.4 | Composition `No` | `weak` |
| 3.4.4 | Composition `Undetermined` | `ambiguous` |
| 3.4.3 | Frontend unit `Yes` | `moderate` |
| 3.4.3 | `No` | `weak` |
| 3.4.3 | `Undetermined` | `ambiguous` |
| 3.4.5 | Active `Yes` | `strong` |
| 3.4.5 | Active `No` | `moderate` |
| 3.4.5 | Active `Undetermined` | `ambiguous` |
| 3.4.6 | Build or Deploy `separate` | `moderate` |
| 3.4.6 | none `separate`, at least one `Undetermined` | `ambiguous` |
| 3.4.6 | other cases | `weak` |
| 3.4.7 | any | `weak`: a claim does not configure, use or link anything; on its own, it is semantic evidence (protocol, 3.4.7) |
| 3.4.8 | `inconclusive`, and the unresolved question changes the architectural reading of the snapshot (e.g., whether a composition target exists) | `ambiguous` |
| 3.4.8 | `inconclusive`, and the question concerns only the past (e.g., when a dependency was added), with the snapshot clear | `weak` |
| 3.4.8 | `clarified` or `resolved by the snapshot` | `weak` (explains another observation, without supporting the architecture on its own) |

The original illustrative JSX identifier `<Componente />` is preserved; its name means "Component".

Strength refers to the **snapshot**. The Interpretation of an `ambiguous` observation states which
architectural interpretations remain plausible.

### 6. Relationships

Read `type target` as "this observation *type* the target". The target is an observation in the file (`#n`) or,
when the artifact has no observation of its own, a passage (`path:line`). The relationship appears only in the subject's
row, without the inverse.

| Type | Subject → target |
|---|---|
| `declares` | dependency → configuration or code using the declared technology |
| `configures` | configuration → unit, code or relationship that it parameterizes |
| `implements` | code → composition relationship |
| `links` | composition relationship → source and target units |
| `publishes` | build and deployment → unit |
| `corroborates`, `partially corroborates`, `contradicts` | claim → what confirms, partly confirms or refutes it, according to the Corroboration and Evidence from 3.4.7. The target is what actually confirms or refutes it, rather than an undetermined observation about the same subject. |
| `explains` | historical point → observations it addresses |

### 7. Repository overview

The "Repository overview" shows how evidence combines in this repository: which chain supports
the architecture (e.g., dependency → configuration → code → relationship), which signals are misleading and what
remains ambiguous. Cite observations by `#n`. Write for readers who will not open the previous reviews.

### 8. Summary

```
Observations: N. Dimensions (technology: a, configuration: b, code: c, structure: d, composition: e, build-deploy: f, documentation: g, history: h). Strength (strong: s, moderate: m, weak: w, ambiguous: u). Evidence (technological: t, architectural: r, context: x).
```

The 3.4 values are not changed: 3.5 classifies what is there.

## Consistency checks

Before considering a file complete, check that:

- the front matter follows step 1;
- every row of the 3.4 reviews became an observation, and only configurations from step 2 were added;
- each block has an Observation without judgment and a separate Interpretation;
- strength follows the criteria from step 5, and every strength outside the guidance has a Note;
- every `#n` reference exists in the file, and the blocks and table have the same numbers;
- the "Summary" agrees with the table.

## What comes from the protocol and what is a convention of this study

**From the protocol (section 3.5):**
- the fields of each observation;
- the separation between observation and interpretation;
- the distinction between technological and architectural evidence;
- the 8 dimensions;
- the four strength levels and their definitions.

**Operational conventions of this study, to make extraction repeatable:**
- deriving observations from the 3.4 rows;
- the configuration selection rule;
- the `context` value;
- observation order;
- the strength guidance table;
- the relationship vocabulary and direction, without inverses;
- the Summary format.

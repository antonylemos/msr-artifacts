# Method: historical review

Paths beginning with `docs/` preserve the organization of the source project (`repo-miner`). In this package, the corresponding analyses are in `data/docs/`. The paths and hashes recorded in the analyses retain their provenance role.

This document describes how the historical review was conducted and how to read the
`NNN-<owner>__<name>.md` files in this folder. Each file records the review of one corpus repository.

## Objective

Protocol section 3.4.8 (*Historical mining*): use commit history **only to resolve ambiguities
in the snapshot**: whether an MFE-related dependency is used, when a composition mechanism
was introduced, whether an application was extracted from another, whether a configuration is active
or abandoned, and whether conflicting artifacts belong to different stages. The study does not construct
adoption trajectories.

History **does not change judgments about the snapshot**: an unused dependency remains `No`.
It adds the explanation (abandoned, planned but never connected, copied from elsewhere), which
protocol stage 3.5 uses to distinguish misleading evidence from evidence of abandonment.

The file has two parts with different roles:

- **The table expresses the criteria:** one point per row, with a fixed vocabulary.
- **The text provides the interpretation:** free-form, covering what history shows and what it does not.

## Main rule: data must not be modified

History is in the clones under `data/samples/mfe-sample-001/repos/`, which may only be **read**.
The clones were created with `--filter=blob:none`: a command requiring a missing object
would download that object and write to the clone. Protection has two parts: detection and prevention.

1. **Detect.** Before any query, compare the clones' fingerprint with the
   reference (`tools/fingerprint.sh`, compared with `tools/fingerprint-before.txt`, both in
   `docs/mfe-history-review/`). It covers the entire clone (`.git` and working tree): path,
   type, permissions, size, date and sha256 of each file. Repeat the comparison upon completion.
   Any difference interrupts the review and is reported to the researcher.
2. **Prevent.** Run queries **only** through
   `docs/mfe-history-review/tools/hist.sh <owner__name> <subcomando> ...`, from the repository
   root. The script accepts only `log`, `show`, `rev-list`, `ls-tree` and `cat-file`, and only
   options from a closed list (format, date, `--name-status`, `--name-only`, `--no-renames`,
   `--full-history`, `--reverse`, `--merges`, `--diff-filter`, `--count`, `-r`, `-t`, `-e`, `-s`);
   all other options are rejected, including `--output`, `--filters`, `--textconv` and diffs.
   Revisions may only be hashes or `hash:caminho`. Git runs without network fetching (`--no-lazy-fetch`),
   optional writes, automatic maintenance, global or system configuration, or external diff,
   and each command is recorded in `docs/mfe-history-review/tools/commands.log`.
3. Limit every query to the snapshot commit: pass the front matter's `commit` as the revision
   (e.g., `log <commit> -- <caminho>`). Exclude commits after the snapshot.

The preserved command placeholders `<subcomando>` and `<caminho>` mean `<subcommand>` and `<path>`; `hash:caminho` means `hash:path`.

No other Git command is run in the clones, and files inside them are not read directly.
Protection is at the application level, not the filesystem level: it is ensured by using only the script and comparing
fingerprints.

The clones mentioned at the original paths are published in [`data/clones/`](../../clones/README.md), with reconstruction instructions and integrity hashes.

The `tools/` scripts and `commands.log` are not part of this package. Each repository's commands
remain recorded in the "Commands" section of its corresponding file.

**What the clone reveals:** messages, dates and, with `--name-status`, which files each commit
created, modified or removed; with `ls-tree`, paths and object identifiers for each
version. An old version's contents can be read (`show <commit>:<caminho>`) when the object is already
available locally; missing objects make the command fail, without fetching or writing anything.
Author names are not cited; references use a short hash, date and message.

## Sources consulted (read only)

| What | Path |
|---|---|
| Repository and commit list | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Previous reviews | `docs/mfe-dependency-review/`, `docs/mfe-structure-review/`, `docs/mfe-source-review/`, `docs/mfe-composition-review/`, `docs/mfe-build-deploy-review/`, `docs/mfe-documentation-review/` (same filename) |
| Snapshot | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Clone, only through `tools/hist.sh` | `data/samples/mfe-sample-001/repos/<owner>__<name>/` |

Previous reviews, data and configurations consulted are sources of evidence and are not
modified in this stage. Final validation is the researcher's responsibility.

## Output

One `docs/mfe-history-review/NNN-<owner>__<name>.md` file per repository, with the **same name**
as its classification file.

Each file has this structure:

1. Front matter with the fields described in step 1.
2. Title `# NNN — <owner>/<name>`.
3. "Repository overview" section: free-form text.
4. "Points" section: a table with the columns `#`, `Point`, `Origin`, `Question`, `Commits` and `Result`.
5. "Observations" section: one paragraph per point.
6. "Commands" section: executed commands in a code block.
7. "Summary" section.

## Procedure per repository

### 1. File header

The front matter records `id`, `full_name` and `commit`, copied from the classification; `inputs.clone`;
`status: draft` while the review has not been validated (only the researcher promotes the status to `final`);
and the review date.

### 2. Gathering ambiguous points

From previous reviews, collect what the snapshot left unresolved and history may clarify:

- declared dependencies that are unused or whose usage is `Undetermined` (protocol section 3.4.2);
- `Undetermined` units (3.4.3);
- inactive, commented-out or `Undetermined` constructs (3.4.4) and `Undetermined` relationships (3.4.5);
- `Undetermined` deployment (3.4.6);
- `contradicted` or `partial` claims that may reflect intention, remnants of an earlier stage or copying (3.4.7).

Before consulting history, check whether the snapshot itself resolves the point (e.g., a `.gitignore`
that explains a missing file); in that case, retain the point in the table as `resolved by the snapshot`.
Claims and constructs about the same uncertainty become a single point, with all origins. The following do not
become points: infrastructure details that reviews excluded from the table (port, certificate) and
naming inaccuracies already resolved by the snapshot itself (e.g., a README that says "module federation"
and, a few lines later, names the correct technology).

### 3. Filling in the table

**Row order:** by the point's first origin, in stage order (3.4.2 through 3.4.7) and, within a stage, in order of appearance in that review.

| Column | Values |
|---|---|
| # | Point number. |
| Point | What is ambiguous, in one sentence. |
| Origin | Review and row or relationship (e.g., `3.4.2 (package.json:28)`, `3.4.7 #3`). |
| Question | `dependency use`, `introduction of composition`, `extraction`, `active or abandoned`, `conflicting stages`. |
| Commits | Short hash, date and message of commits supporting the result, separated by `; `, or `—`. |
| Result | `clarified`: history answers the question, within the limits of the artifacts consulted (e.g., "these files have not changed since the first commit"). Knowing when a file or comment appeared does not by itself prove usage, abandonment or intent. `inconclusive`: history does not answer, usually because old content is unavailable. `resolved by the snapshot`: the snapshot itself answers, without a history query. |

### 4. Texts

**Repository overview.** The minimum context: commit count, period and milestones needed
for the points raised. Distinguish "first observable presence" (the artifact is already in the first
commit) from "introduction" (a commit that creates it): the first commit does not reveal where the code was developed
beforehand. Write for readers who will not open the history.

**Observations.** One paragraph per point, in table order, beginning with `**N. Point.**`: what
history shows, what it does not show and the conclusion. When only the commit message is available, say "the
message announces…", without presenting the change's content as inspected.

**Commands.** Commands used for this repository, with the full path `docs/mfe-history-review/tools/hist.sh`, in a code block, including queries that failed because of a missing object (with the failure annotated).

### 5. Summary

```
Commits up to the snapshot: C (YYYY-MM-DD to YYYY-MM-DD). Points: N (clarified: e, inconclusive: i, resolved by the snapshot: s).
```

Without points: `Commits up to the snapshot: C (YYYY-MM-DD to YYYY-MM-DD). Points: 0.`

Values from previous reviews are not changed: history explains, it does not reclassify.

## Consistency checks

Before considering a file complete, check that:

- the front matter follows step 1;
- all queries went through `tools/hist.sh`, limited to the snapshot commit;
- the clones' fingerprint after queries matches the one from before;
- values use the vocabularies from step 3, and there is one paragraph per point;
- every cited hash appears in the output of a command listed in "Commands";
- the "Summary" agrees with the table;
- no author name appears in the text.

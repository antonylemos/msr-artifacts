# Discovery reconstruction and audit

[`candidates/`](candidates/) stores the candidate CSV as text parts, with complete records and a header in each file. [`discovery.sql.parts/`](discovery.sql.parts/) preserves the output of `sqlite3 ... .dump`, also as text. The command is **`.dump`**, with a leading dot; it exports schema and data as SQL. The [SQLite documentation](https://www.sqlite.org/cli.html#converting_an_entire_database_to_a_text_file) describes export and restoration.

Parts have a target size of 8 MiB. The system does not cut a CSV record or SQL line to meet the target size, and five-digit names retain source order. The [candidate](candidates/manifest.json) and [SQL dump](discovery.sql.parts/manifest.json) manifests record sizes, hashes, and reconstruction checks.

Text allows data comparison with local tools without depending on Git LFS. Splitting reduces each file's size, but it does not reduce total data volume or guarantee full display in the GitHub browser interface. Clones have their own [guide](../../clones/README.md).

## Candidates

Run commands from this folder. First, check all parts:

```sh
shasum -a 256 -c candidates/SHA256SUMS
```

Reconstruct the CSV only if it does not already exist. The header is written once; `tail` removes only the first line of each part, without interpreting or reformatting records:

```sh
test ! -e candidates.csv && (
  head -n 1 candidates/part-00001.csv
  for part in candidates/part-*.csv; do
    tail -n +2 "$part"
  done
) > candidates.csv
shasum -a 256 -c candidates/RESTORED_SHA256SUMS
```

The reconstructed file must be byte-identical to the source and match the `candidates.csv` hash in the historical discovery manifest. Git ignores the complete file; it tracks parts.

## SQLite

The dump was produced from a consistent copy obtained through the SQLite backup API, without modifying the source database. SQL files form a single stream: they are not migrations or independent scripts. The first part contains the transaction's beginning, and the last part contains its end.

Check parts before executing any SQL:

```sh
shasum -a 256 -c discovery.sql.parts/SHA256SUMS
cat discovery.sql.parts/part-*.sql | shasum -a 256
```

The stream's hash must match `dumpSha256` in the manifest. To restore, choose a new file; do not use the pre-existing local database:

```sh
test ! -e discovery-restored.sqlite && \
  cat discovery.sql.parts/part-*.sql | sqlite3 -bail discovery-restored.sqlite
sqlite3 discovery-restored.sqlite 'PRAGMA integrity_check; PRAGMA foreign_key_check;'
sqlite3 discovery-restored.sqlite '.sha3sum --sha3-256 --schema'
```

The expected result is `ok`, no foreign-key violations, and the same `contentSha3_256` recorded in the dump manifest. Validation of this delivery also compared the schema and every table's count with the source copy. The reconstructed SQLite file may have different bytes because of internal organization; verified equivalence concerns schema and data.

Original discovery manifests remain intact. Report wording was revised, so consult its hash in the [inventory](../../inventory.json). The historical manifest retains the source report's hash.

# Package integrity and provenance

The [inventory](inventory.json) records the imported cut, material selection, sizes, and SHA-256 hashes. Scope retains the stages already represented in this package: discovery, sampling, classifications, corpus, mining, inspection, eight reviews, and their methods. Clones correspond to the 100 corpus repositories. This import excludes templates, operational documents, consolidated analyses, profiles, and source tool backups.

## Checking files

Run from the package root, with Python 3.11 or later:

```sh
python3 - <<'PY'
import hashlib
import json
from pathlib import Path

inventory = json.loads(Path('data/inventory.json').read_text())
records = inventory['items'] + inventory['generatedMetadata'] + inventory['configurations']
for item in records:
    path = Path(item['destination'])
    assert path.stat().st_size == item['bytes'], path
    with path.open('rb') as stream:
        assert hashlib.file_digest(stream, 'sha256').hexdigest() == item['sha256'], path
assert inventory['totals']['files'] == len(inventory['items'])
assert inventory['totals']['bytes'] == sum(item['bytes'] for item in inventory['items'])
print(f'{len(records)} files checked')
PY
```

The inventory excludes itself. Git ignores the reconstructed complete candidate and SQLite files; it tracks them in parts. Consult the [discovery reconstruction](discovery/mfe-round-002/README.md) and [clone](clones/README.md) guides to also verify reassembly.

## Including snapshots in Git

Snapshots preserve studied projects' `.gitignore` files. These rules, together with this repository's rules, may hide files belonging to the acquired corpus. The exact list is in `git.ignoredSnapshotPaths` in the inventory.

When preparing a commit, explicitly include the corpus with `-f`, from the package root, so these files are also tracked:

```sh
git add -f -- data/acquisitions/mfe-corpus-001/corpus/
```

The command affects only the acquired corpus; other artifacts can be added normally. The package update does not run this command, make a commit, or change what was already staged in the index.

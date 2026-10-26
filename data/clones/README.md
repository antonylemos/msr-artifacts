# Clones for historical consultation

This folder contains the 100 corpus repositories, including their working tree and `.git` directory. The [manifest](manifest.json) links each clone to its `acquisition.csv` commit and records file and part hashes. Selection is the same as for the historical review.

Smaller archives are `OWNER__REPO.tar.gz`. Larger archives were split into binary parts of up to 25 MiB, with suffixes `.part-00001`, `.part-00002`, etc. A single part is not a valid tar archive. Concatenation in numeric order reconstructs the original archive.

To check the files, run in this folder:

```sh
shasum -a 256 -c SHA256SUMS
```

To extract a whole or split archive, replace `OWNER__REPO` with the desired name:

```sh
mkdir -p unpacked
tar -xzf OWNER__REPO.tar.gz -C unpacked
# For a split clone, use this command instead of the previous one:
cat OWNER__REPO.tar.gz.part-* | tar -xz -C unpacked
```

Consult history with `git -C unpacked/OWNER__REPO log`. The `unpacked/` folder is ignored by this package's Git rules. Import checked each clone's commit and compared the contents of every archive member with its source; part hashes were also verified after splitting.

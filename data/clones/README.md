# Clones para consulta histórica

Esta pasta contém os 100 repositórios do corpus, com a árvore de trabalho e o diretório `.git`. O [manifesto](manifest.json) relaciona cada clone ao commit de `acquisition.csv` e registra os hashes dos arquivos e das partes. A seleção é a mesma da revisão histórica.

Os arquivos menores são `OWNER__REPO.tar.gz`. Arquivos maiores foram divididos em partes binárias de até 25 MiB, com sufixos `.part-00001`, `.part-00002` etc. Uma parte isolada não é um arquivo tar válido. A concatenação em ordem numérica recompõe o arquivo compactado original.

Para conferir os arquivos, execute nesta pasta:

```sh
shasum -a 256 -c SHA256SUMS
```

Para extrair um arquivo inteiro ou dividido, substitua `OWNER__REPO` pelo nome desejado:

```sh
mkdir -p unpacked
tar -xzf OWNER__REPO.tar.gz -C unpacked
# Para um clone dividido, use este comando no lugar do anterior:
cat OWNER__REPO.tar.gz.part-* | tar -xz -C unpacked
```

Consulte o histórico com `git -C unpacked/OWNER__REPO log`. A pasta `unpacked/` é ignorada pelo Git deste pacote. A importação conferiu o commit de cada clone e comparou o conteúdo de cada membro do arquivo compactado com sua fonte; os hashes das partes também foram verificados após a divisão.

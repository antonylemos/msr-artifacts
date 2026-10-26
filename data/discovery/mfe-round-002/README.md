# Reconstrução e auditoria da descoberta

`candidates/` preserva o CSV de candidatos em partes textuais com registros completos e cabeçalho em cada arquivo. `discovery.sql.parts/` preserva a saída de `sqlite3 ... .dump`, também em texto. O comando é **`.dump`**, com ponto: ele exporta o esquema e os dados como SQL. A [documentação do SQLite](https://www.sqlite.org/cli.html#converting_an_entire_database_to_a_text_file) descreve a exportação e a restauração.

As partes têm tamanho alvo de 8 MiB. Um registro CSV ou uma linha SQL não é cortado para atender ao tamanho alvo. Os nomes com cinco dígitos mantêm a ordem da fonte. Os manifestos de [candidatos](candidates/manifest.json) e do [dump SQL](discovery.sql.parts/manifest.json) registram tamanhos, hashes e as verificações da reconstrução.

O texto permite comparar os dados com ferramentas locais sem depender de Git LFS. A divisão reduz o tamanho de cada arquivo, mas não reduz o volume total dos dados nem garante a visualização integral no navegador do GitHub. Os clones têm seu próprio [guia](../../clones/README.md).

## Candidatos

Execute os comandos a partir desta pasta. Primeiro confira todas as partes:

```sh
shasum -a 256 -c candidates/SHA256SUMS
```

Reconstrua o CSV somente se ele ainda não existir. O cabeçalho é escrito uma vez; `tail` remove apenas a primeira linha de cada parte, sem interpretar ou reformatar os registros:

```sh
test ! -e candidates.csv && (
  head -n 1 candidates/part-00001.csv
  for part in candidates/part-*.csv; do
    tail -n +2 "$part"
  done
) > candidates.csv
shasum -a 256 -c candidates/RESTORED_SHA256SUMS
```

O arquivo reconstruído deve ser idêntico byte a byte à fonte e ao hash de `candidates.csv` no manifesto histórico da descoberta. O arquivo completo é ignorado pelo Git; as partes são versionadas.

## SQLite

O dump foi produzido a partir de uma cópia consistente obtida pela API de backup do SQLite, sem modificar o banco de origem. Os arquivos SQL compõem um único fluxo: não são migrações nem scripts independentes. A primeira parte contém o início da transação e a última, seu encerramento.

Confira as partes antes de executar qualquer SQL:

```sh
shasum -a 256 -c discovery.sql.parts/SHA256SUMS
cat discovery.sql.parts/part-*.sql | shasum -a 256
```

O hash do fluxo deve corresponder a `dumpSha256` no manifesto. Para restaurar, escolha um arquivo novo; não use o banco local preexistente:

```sh
test ! -e discovery-restored.sqlite && \
  cat discovery.sql.parts/part-*.sql | sqlite3 -bail discovery-restored.sqlite
sqlite3 discovery-restored.sqlite 'PRAGMA integrity_check; PRAGMA foreign_key_check;'
sqlite3 discovery-restored.sqlite '.sha3sum --sha3-256 --schema'
```

O resultado esperado é `ok`, nenhuma violação de chave estrangeira e o mesmo `contentSha3_256` registrado no manifesto do dump. A validação desta entrega também comparou o esquema e a contagem de todas as tabelas com a cópia de origem. O arquivo SQLite reconstruído pode ter bytes diferentes por causa da organização interna; a equivalência verificada é do esquema e dos dados.

Os manifestos originais da descoberta permanecem intactos. A redação do relatório foi revisada, portanto seu hash editorial deve ser consultado no [inventário](../../inventory.json), enquanto o manifesto histórico conserva o hash do relatório na fonte.

# Integridade e proveniência do pacote

O [inventário](inventory.json) registra o corte importado, a seleção dos materiais, seus tamanhos e hashes SHA-256. O escopo mantém as etapas já representadas neste pacote: descoberta, amostragem, classificações, corpus, mineração, inspeção, oito revisões e seus métodos. Os clones correspondem aos 100 repositórios do corpus. Templates, documentos operacionais, análises consolidadas, perfis e backups da ferramenta de origem não integram esta importação.

Em `items`, `bytes` e `sha256` descrevem o arquivo entregue. Nos textos revisados, `sourceBytes` e `sourceSha256` descrevem a fonte científica importada, e `representation: editorial-revision` identifica a diferença editorial. O front matter das análises mantém os metadados atuais da fonte, inclusive hashes, commits, datas e status. Os manifestos científicos também permanecem intactos; suas referências não foram substituídas pelos hashes editoriais.

`editorial` distingue a leitura da narrativa da conferência mecânica de tabelas, código e campos científicos. As evidências dos repositórios não foram reavaliadas e nenhum julgamento científico foi refeito. `sourceFindings` registra inconsistências preexistentes observadas durante a leitura, sem tratá-las como decisões novas nem corrigir os resultados por inferência.

## Conferência dos arquivos

Execute a partir da raiz do pacote, com Python 3.11 ou superior:

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
print(f'{len(records)} arquivos conferidos')
PY
```

O inventário não inclui a si próprio. Os arquivos completos reconstruídos de candidatos e SQLite são ignorados pelo Git; a representação versionada está nas partes. Consulte os guias de [reconstrução da descoberta](discovery/mfe-round-002/README.md) e de [clones](clones/README.md) para verificar também sua recomposição.

## Inclusão dos snapshots no Git

Os snapshots preservam os `.gitignore` dos projetos estudados. Essas regras, além das regras deste repositório, podem ocultar arquivos que fazem parte do corpus adquirido. A lista exata está em `git.ignoredSnapshotPaths` no inventário.

Ao preparar um commit, inclua o corpus explicitamente com `-f`, a partir da raiz do pacote, para que esses arquivos também sejam versionados:

```sh
git add -f -- data/acquisitions/mfe-corpus-001/corpus/
```

O comando atua somente no corpus adquirido. Os demais artefatos podem ser adicionados normalmente. A atualização do pacote não executa esse comando, não faz commit e preserva o que já estava preparado no index.

# Método: revisão histórica

Este documento descreve como foi feita a revisão histórica e como ler os arquivos
`NNN-<owner>__<name>.md` desta pasta. Cada arquivo registra a revisão de um repositório do corpus.

## Objetivo

Seção 3.4.8 do protocolo (*Historical mining*): usar o histórico de commits **só para resolver
ambiguidades do snapshot**: se uma dependência relacionada a MFE é usada, quando um mecanismo de
composição foi introduzido, se uma aplicação foi extraída de outra, se uma configuração está ativa
ou abandonada, e se artefatos conflitantes pertencem a estágios diferentes. O estudo não constrói
trajetórias de adoção.

O histórico **não muda os julgamentos sobre o snapshot**: uma dependência sem uso continua `No`.
Ele acrescenta a explicação (abandonado, planejado e nunca conectado, copiado de outro lugar), que a
etapa 3.5 do protocolo usa para separar evidência enganosa de evidência de abandono.

O arquivo tem duas partes com papéis diferentes:

- **A tabela é o critério:** um ponto por linha, com vocabulário fixo.
- **O texto é a leitura:** livre, com o que o histórico mostra e o que não mostra.

## Regra principal: os dados não podem ser modificados

O histórico está nos clones de `data/samples/mfe-sample-001/repos/`, que só podem ser **lidos**.
Os clones foram feitos com `--filter=blob:none`: um comando que precise de um objeto ausente
baixaria esse objeto e gravaria no clone. A proteção tem duas partes: detectar e impedir.

1. **Detectar.** Antes de qualquer consulta, compara-se a impressão digital dos clones com a de
   referência (`tools/fingerprint.sh`, comparado com `tools/fingerprint-before.txt`, ambos em
   `docs/mfe-history-review/`). Ela cobre o clone inteiro (`.git` e árvore de trabalho): caminho,
   tipo, permissões, tamanho, data e sha256 de cada arquivo. A comparação é repetida ao terminar.
   Qualquer diferença interrompe a revisão e é comunicada ao pesquisador.
2. **Impedir.** As consultas são feitas **só** por
   `docs/mfe-history-review/tools/hist.sh <owner__name> <subcomando> ...`, a partir da raiz do
   repositório. O script aceita apenas `log`, `show`, `rev-list`, `ls-tree` e `cat-file`, e só as
   opções de uma lista fechada (formato, data, `--name-status`, `--name-only`, `--no-renames`,
   `--full-history`, `--reverse`, `--merges`, `--diff-filter`, `--count`, `-r`, `-t`, `-e`, `-s`);
   qualquer outra opção é recusada, inclusive `--output`, `--filters`, `--textconv` e diffs.
   Revisões só como hash ou `hash:caminho`. O git roda sem busca na rede (`--no-lazy-fetch`), sem
   escritas opcionais, sem manutenção automática, sem configuração global ou de sistema e sem diff
   externo, e cada comando fica em `docs/mfe-history-review/tools/commands.log`.
3. Toda consulta é limitada ao commit do snapshot: o `commit` do front matter entra como revisão
   (ex.: `log <commit> -- <caminho>`). Commits posteriores ao snapshot não entram.

Nenhum outro comando git é executado nos clones, e os arquivos dentro deles não são lidos diretamente.
A proteção é de aplicação, não do sistema de arquivos: o que a garante é usar só o script e comparar
as impressões digitais.

Os scripts de `tools/` e o registro `commands.log` não fazem parte deste pacote. Os comandos de cada
repositório continuam registrados na seção "Comandos" do respectivo arquivo.

**O que o clone permite ver:** mensagens, datas e, com `--name-status`, quais arquivos cada commit
criou, alterou ou removeu; com `ls-tree`, os caminhos e os identificadores dos objetos de cada
versão. O conteúdo de uma versão antiga pode ser lido (`show <commit>:<caminho>`) quando o objeto já
está disponível localmente; objetos ausentes fazem o comando falhar, sem busca e sem gravar nada.
Nomes de autores não são citados; as referências usam hash curto, data e mensagem.

## Fontes consultadas (somente leitura)

| O quê | Caminho |
|---|---|
| Lista de repositórios e commits | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Revisões anteriores | `docs/mfe-dependency-review/`, `docs/mfe-structure-review/`, `docs/mfe-source-review/`, `docs/mfe-composition-review/`, `docs/mfe-build-deploy-review/`, `docs/mfe-documentation-review/` (mesmo nome de arquivo) |
| Snapshot | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Clone, só por `tools/hist.sh` | `data/samples/mfe-sample-001/repos/<owner>__<name>/` |

## Produto

Um arquivo `docs/mfe-history-review/NNN-<owner>__<name>.md` por repositório, com o **mesmo nome**
do arquivo de classificação.

Cada arquivo tem esta estrutura:

1. Front matter com os campos descritos no passo 1.
2. Título `# NNN — <owner>/<name>`.
3. Seção "Leitura do repositório": texto livre.
4. Seção "Pontos": uma tabela com as colunas `#`, `Ponto`, `Origem`, `Pergunta`, `Commits` e `Resultado`.
5. Seção "Observações": um parágrafo por ponto.
6. Seção "Comandos": os comandos executados, em bloco de código.
7. Seção "Resumo".

## Procedimento por repositório

### 1. Cabeçalho do arquivo

O front matter registra `id`, `full_name` e `commit`, copiados da classificação; `inputs.clone`;
`status: draft` enquanto a revisão não foi validada (só o pesquisador promove o status para `final`);
e a data da revisão.

### 2. Levantamento dos pontos ambíguos

Nas revisões anteriores, coleta-se o que o snapshot deixou em aberto e que o histórico pode esclarecer:

- dependências declaradas sem uso ou com uso `Undetermined` (seção 3.4.2 do protocolo);
- unidades `Undetermined` (3.4.3);
- construções inativas, comentadas ou `Undetermined` (3.4.4) e relações `Undetermined` (3.4.5);
- deploy `Undetermined` (3.4.6);
- afirmações `contradita` ou `parcial` que possam ser intenção, resto de um estágio anterior ou cópia (3.4.7).

Antes de consultar o histórico, verifica-se se o próprio snapshot resolve o ponto (ex.: um `.gitignore`
que explica um arquivo ausente); nesse caso o ponto fica na tabela, como `resolvido pelo snapshot`.
Afirmações e construções sobre a mesma dúvida viram um ponto só, com todas as origens. Não viram
ponto: detalhes de infraestrutura que as revisões deixaram fora da tabela (porta, certificado) e
imprecisões de nome já resolvidas pelo próprio snapshot (ex.: um README que diz "module federation"
e, linhas depois, nomeia a tecnologia certa).

### 3. Preenchimento da tabela

**Ordem das linhas:** pela primeira origem do ponto, na ordem das etapas (3.4.2 a 3.4.7) e, dentro da etapa, na ordem em que aparece naquela revisão.

| Coluna | Valores |
|---|---|
| # | Número do ponto. |
| Ponto | O que é ambíguo, numa frase. |
| Origem | A revisão e a linha ou relação (ex.: `3.4.2 (package.json:28)`, `3.4.7 #3`). |
| Pergunta | `uso de dependência`, `introdução da composição`, `extração`, `ativo ou abandonado`, `estágios em conflito`. |
| Commits | Hash curto, data e mensagem dos commits que sustentam o resultado, separados por `; `, ou `—`. |
| Resultado | `esclarecido`: o histórico responde à pergunta, delimitada aos artefatos consultados (ex.: "estes arquivos não mudaram desde o primeiro commit"). Saber quando um arquivo ou comentário apareceu não prova, sozinho, uso, abandono ou intenção. `inconclusivo`: o histórico não responde, em geral porque o conteúdo antigo não está disponível. `resolvido pelo snapshot`: o próprio snapshot responde, sem consulta. |

### 4. Textos

**Leitura do repositório.** O contexto mínimo: número de commits, período e os marcos necessários
aos pontos levantados. O texto diferencia "primeira presença observável" (o artefato já está no primeiro
commit) de "introdução" (um commit que o cria): o primeiro commit não diz onde o código foi feito
antes. É escrito para quem não vai abrir o histórico.

**Observações.** Um parágrafo por ponto, na ordem da tabela, começando por `**N. Ponto.**`: o que o
histórico mostra, o que ele não mostra e a conclusão. Quando só há a mensagem do commit, o texto diz "a
mensagem anuncia…", sem apresentar o conteúdo da mudança como inspecionado.

**Comandos.** Os comandos usados para este repositório, com o caminho completo `docs/mfe-history-review/tools/hist.sh`, em bloco de código, incluindo as consultas que falharam por objeto ausente (com a falha anotada).

### 5. Resumo

```
Commits até o snapshot: C (AAAA-MM-DD a AAAA-MM-DD). Pontos: N (esclarecido: e, inconclusivo: i, resolvido pelo snapshot: s).
```

Sem pontos: `Commits até o snapshot: C (AAAA-MM-DD a AAAA-MM-DD). Pontos: 0.`

Os valores das revisões anteriores não são alterados: o histórico explica, não reclassifica.

## Verificações de consistência

Antes de considerar um arquivo concluído, confere-se que:

- o front matter segue o passo 1;
- todas as consultas foram feitas por `tools/hist.sh`, limitadas ao commit do snapshot;
- a impressão digital dos clones, depois das consultas, é igual à de antes;
- os valores usam os vocabulários do passo 3, e há um parágrafo por ponto;
- todo hash citado aparece na saída de um comando listado em "Comandos";
- o "Resumo" confere com a tabela;
- nenhum nome de autor aparece no texto.

# Método: revisão manual de dependências

Este documento descreve como foi feita a revisão manual de dependências e como ler os arquivos
`NNN-<owner>__<name>.md` desta pasta. Cada arquivo registra a revisão de um repositório do corpus,
e a ordem dos passos abaixo é a ordem em que a revisão é conduzida: ler os arquivos do snapshot
vem antes de qualquer julgamento.

## Objetivo

Para cada dependência listada pelo `inspect-dependencies`, decidir se o pacote está
**configurado e em uso** no snapshot, citando arquivo e linha. A inspeção já extraiu
nome, versão, seção e linha de forma mecânica; esta etapa só acrescenta o julgamento.

Esta etapa **não** reclassifica o repositório, não altera os arquivos de
`../mfe-classification/` e não avalia arquitetura. Ela responde a uma pergunta por linha: o pacote
está configurado e em uso?

## Fontes consultadas (somente leitura)

| O quê                                | Caminho                                                                           |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| Lista de repositórios                | `data/inspections/mfe-dependencies-001/summary.csv`                               |
| Dependências do repositório          | `data/inspections/mfe-dependencies-001/repos/<owner>__<name>/dependencies.csv`    |
| Versão e hash da inspeção            | `data/inspections/mfe-dependencies-001/manifest.json` (`version`, `configSha256`) |
| Arquivos do snapshot                 | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/`                  |
| Classificação (id, commit, contexto) | `docs/mfe-classification/NNN-<owner>__<name>.md`                                  |

O critério do Q4 da classificação está definido em um documento de critérios que não faz parte
deste pacote (o inventário em `data/inventory.json` registra a ausência).

Todo `artefato:linha` é relativo a `files/` do snapshot. A revisão nunca usa o clone em
`data/samples/`: o snapshot é a árvore do commit classificado, e o clone pode estar em outro estado.

A revisão não modifica nada em `data/` e não reexecuta `mine` nem `inspect-dependencies`.

## Produto

Um arquivo `docs/mfe-dependency-review/NNN-<owner>__<name>.md` por repositório, com o
**mesmo nome** do arquivo de classificação. O exemplo completo é `008-mrmechazilla__host-app.md`.

Cada arquivo tem esta estrutura:

1. Front matter com os campos descritos no passo 1.
2. Título `# NNN — <owner>/<name>`.
3. Seção "Dependências": uma tabela com as colunas `Manifesto:linha`, `Seção`, `Pacote`, `Versão`,
   `Tecnologia`, `Configurada` e `Evidência (artefato:linha)`.
4. Seção "Notas" (opcional) e, quando o `status` é `review`, a seção "Ponto para revisão conjunta".

## Procedimento por repositório

### 1. Cabeçalho do arquivo

O `NNN` do nome vem do arquivo correspondente em `../mfe-classification/`. O front matter registra:

- `id`, `full_name`, `commit`: copiados do front matter da classificação.
- `inspection.output`: `data/inspections/mfe-dependencies-001`.
- `inspection.version` e `inspection.config_sha256`: copiados de `version` e `configSha256` do `manifest.json` da inspeção.
- `annotation.method`: `manual`.
- `annotation.status`: `draft` enquanto a revisão não foi validada. A validação final cabe ao pesquisador, e só ele promove o status para `final`.
- `annotation.date`: data da revisão, no formato `AAAA-MM-DD`.

O `commit` deve ser o mesmo do `acquisition.csv` da aquisição. Se divergir, a revisão é interrompida
e a divergência é registrada em "Ponto para revisão conjunta".

### 2. Cópia das linhas do CSV

A tabela tem uma linha para cada linha de `dependencies.csv`, **na mesma ordem**, sem juntar nem omitir linhas:

| Coluna da tabela | Coluna do CSV                                                     |
| ---------------- | ----------------------------------------------------------------- |
| Manifesto:linha  | `manifest` + `:` + `line` (só `manifest` se `line` estiver vazia) |
| Seção            | `section`                                                         |
| Pacote           | `package`                                                         |
| Versão           | `version`                                                         |
| Tecnologia       | `technology`                                                      |

Os valores não são corrigidos nem normalizados: aparecem exatamente como estão no CSV.

**CSV só com o cabeçalho:** a tabela é substituída pela frase
"Nenhuma dependência das tecnologias no dependencies.csv."
Nesse caso não se procura configuração para preencher o arquivo: a tecnologia sem pacote próprio
(por exemplo, Module Federation embutido no webpack 5) já fica registrada na classificação.

### 3. Julgamento de cada linha

Para cada linha, os arquivos são abertos e a coluna `Configurada` é decidida.

1. Abrir o manifesto na linha indicada e confirmar que o pacote está declarado ali, na seção indicada.
2. Abrir cada item de `same_package_matches` na linha indicada e, depois, os de `other_package_matches`.
   O pacote de um arquivo é o diretório do `package.json` mais próximo acima dele; subdiretórios sem `package.json` próprio (`src/`, `projects/<app>/`) pertencem ao pacote de cima.
   O trecho em volta (bloco ou função) é lido, não só a linha.
3. **Procurar também fora das listas.** As listas só trazem os padrões que a configuração da inspeção
   associou à tecnologia (em geral `cfg-*`). Uso em código, como `import ... from '<pacote>'`, pode não estar nelas.
   O nome do pacote é procurado nos arquivos de código e de build do snapshot, por exemplo com:
   `grep -rn "<pacote>" data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files --include='*.{js,ts,mjs,cjs,json}'`
   (lockfiles e `node_modules`, se houver, são ignorados).
4. A decisão segue estas regras, nesta ordem:

| Resposta       | Quando                                                                                                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Yes`          | Um arquivo de build ou de código importa ou invoca o pacote (plugin, função, builder), **e** esse arquivo é usado: referenciado pelo build (ex.: `angular.json` → `extraWebpackConfig`) ou é um ponto de entrada/rota da aplicação. |
| `Undetermined` | Há configuração ou código que usa o pacote, mas não dá para confirmar que é usado: arquivo não referenciado por nenhum build, código comentado, configuração incompleta ou contraditória.                                           |
| `No`           | Nenhum arquivo importa ou invoca o pacote; só a declaração no manifesto (e, talvez, scripts ou documentação).                                                                                                                       |

Observações:
- Mencionar o pacote em um script do `package.json`, em `README` ou em lockfile **não** é uso.
- A ocorrência em outro pacote conta, desde que o arquivo use **este** pacote (ex.: dependência hoisted na raiz de um monorepo, plugin configurado em `apps/shell/`).
- Cada linha corresponde a uma tecnologia: se o mesmo pacote aparece em duas tecnologias, cada linha é julgada pela evidência daquela tecnologia.
- Na dúvida entre `Yes` e `Undetermined`, a resposta é `Undetermined`, com a explicação em "Notas".

### 4. Registro da evidência

A coluna `Evidência (artefato:linha)` traz:
- a evidência mínima que sustenta a resposta: onde o pacote é importado ou invocado e, para `Yes`, o que mostra que o arquivo é usado;
- o formato `caminho:linha` ou `caminho:inicio-fim`, separados por `; `, com uma descrição curta entre parênteses e o código entre crases;
- para `No`, o que foi procurado e onde (ex.: `sem import de "@scope/x" em src/ e configs de build (grep)`);
- para `Undetermined`, o que existe e o motivo da dúvida.

### 5. Notas e revisão conjunta

- **Notas** (opcional): sinais enganosos, evidência que só apareceu fora das listas da inspeção, regex de pacote que pareceu ampla demais, ou caso que deveria virar regra.
- **Ponto para revisão conjunta**: obrigatório se `status: review`. Registra a linha cuja resposta depende de decisão do pesquisador.

Quando algo contradiz a classificação do repositório, a revisão não propõe mudá-la; a contradição
é registrada em "Notas".

## Verificações de consistência

Antes de considerar um arquivo concluído, confere-se que:

- o nome do arquivo é igual ao da classificação;
- `commit` é igual ao da classificação e ao do `acquisition.csv`;
- `version` e `config_sha256` são os do `manifest.json` da inspeção;
- o número de linhas da tabela é igual ao de linhas de dados do `dependencies.csv` (ou a frase fixa está presente);
- as cinco colunas copiadas são idênticas ao CSV;
- toda linha tem `Configurada` em `Yes | No | Undetermined` e pelo menos uma evidência;
- toda evidência foi aberta no snapshot, e a linha citada contém o que foi descrito;
- o arquivo não contém comentários ou marcações de preenchimento;
- `status` é `draft` ou o valor definido pelo pesquisador.

## Quando a inspeção mudar

Se `inspect-dependencies` for executado com outra configuração (nova `version`, novo `config_sha256`),
os arquivos desta pasta continuam válidos só para a versão registrada no front matter.
Os repositórios cujo `dependencies.csv` mudou precisam ser revisados de novo, com o bloco `inspection` atualizado.

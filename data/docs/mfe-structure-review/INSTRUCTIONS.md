# Método: revisão estrutural

Este documento descreve como foi feita a revisão estrutural e como ler os arquivos
`NNN-<owner>__<name>.md` desta pasta. Cada arquivo registra a revisão de um repositório do corpus,
e os passos abaixo seguem a ordem da revisão: ler os arquivos do snapshot vem antes de qualquer julgamento.

## Objetivo

Seção 3.4.3 do protocolo (*Structural mining*): identificar as **fronteiras das aplicações
frontend** de cada repositório. A mineração já listou, de forma mecânica, os diretórios
candidatos (`units.csv`). Esta etapa registra, para cada um, as características estruturais
observáveis e decide se ele é uma unidade frontend.

A análise é cautelosa: vários diretórios de aplicação mostram decomposição, mas **não** estabelecem
uma implementação MFE. Esta etapa não reclassifica o repositório, não avalia composição
(seção 3.4.5 do protocolo) e não altera os arquivos de `../mfe-classification/`.

## Fontes consultadas (somente leitura)

| O quê | Caminho |
|---|---|
| Lista de repositórios | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Unidades candidatas | `data/mining/mfe-mining-001/repos/<owner>__<name>/units.csv` |
| Tipos de cada arquivo | `data/mining/mfe-mining-001/repos/<owner>__<name>/artifacts.csv` |
| Ocorrências de workspace, deploy e CI | `data/mining/mfe-mining-001/repos/<owner>__<name>/matches.csv` (padrões `ws-*`, `ops-*`, `ci-*`) |
| Versão e hash da mineração | `data/mining/mfe-mining-001/manifest.json` (`version`, `configSha256`) |
| Arquivos do snapshot | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classificação (id, commit, contexto) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Todo `artefato:linha` é relativo a `files/` do snapshot. A revisão nunca usa o clone em `data/samples/`.

A revisão não modifica nada em `data/` e não reexecuta `mine` nem `inspect-dependencies`.

## Produto

Um arquivo `docs/mfe-structure-review/NNN-<owner>__<name>.md` por repositório, com o
**mesmo nome** do arquivo de classificação. O exemplo completo é `008-mrmechazilla__host-app.md`.

Cada arquivo tem esta estrutura:

1. Front matter com os campos descritos no passo 1.
2. Título `# NNN — <owner>/<name>`.
3. Seção "Workspace": uma declaração de workspace ou a frase fixa de ausência.
4. Seção "Unidades": uma tabela com as colunas `Diretório`, `Marcadores`, `Manifesto`, `Entrada`,
   `Build`, `Workspace`, `Deploy`, `Unidade frontend` e `Motivo`.
5. Seção "Resumo".
6. Seção "Notas" (opcional) e, quando o `status` é `review`, a seção "Ponto para revisão conjunta".

## Procedimento por repositório

### 1. Cabeçalho do arquivo

O `NNN` do nome vem do arquivo correspondente em `../mfe-classification/`. O front matter registra:

- `id`, `full_name`, `commit`: copiados do front matter da classificação.
- `mining.output`: `data/mining/mfe-mining-001`.
- `mining.version` e `mining.config_sha256`: copiados de `version` e `configSha256` do `manifest.json` da mineração.
- `annotation.method`: `manual`.
- `annotation.status`: `draft` enquanto a revisão não foi validada. A validação final cabe ao pesquisador, e só ele promove o status para `final`.
- `annotation.date`: data da revisão, no formato `AAAA-MM-DD`.

O `commit` deve ser o mesmo do `acquisition.csv` da aquisição. Se divergir, a revisão é interrompida
e a divergência é registrada em "Ponto para revisão conjunta".

### 2. Registro do workspace

A declaração de workspace do repositório é procurada e registrada em uma linha na seção "Workspace".
As formas aceitas são:
- `pnpm-workspace.yaml`, `lerna.json`, `rush.json`, `turbo.json`, `nx.json`;
- `workspaces` em um `package.json`;
- `projects` em `angular.json` com mais de um projeto, ou `project.json` do Nx.

As ocorrências `ws-workspaces` do `matches.csv` e os arquivos `workspace-config` do `artifacts.csv`
são o ponto de partida; a declaração é confirmada abrindo o arquivo. Sem declaração, a frase fixa é:
"Nenhuma declaração de workspace."

### 3. Cópia das linhas do `units.csv`

A tabela tem uma linha para cada linha de `units.csv`, **na mesma ordem**, sem juntar nem omitir linhas:

| Coluna da tabela | Coluna do CSV |
|---|---|
| Diretório | `directory` |
| Marcadores | `markers` |

Os valores não são corrigidos nem normalizados: aparecem exatamente como estão no CSV.
Diretórios que não estão no `units.csv` não são acrescentados; se faltar uma unidade, a falta é registrada em "Notas".

### 4. Preenchimento das características

Para cada linha, os arquivos do diretório são abertos e cada coluna recebe `artefato:linha` com uma
descrição curta entre parênteses, ou `—` quando não há:

| Coluna | O que procurar |
|---|---|
| Manifesto | `<dir>/package.json` existe? Cite o caminho. |
| Entrada | Onde a entrada da aplicação é declarada ou usada pelo build: `main`/`browser`/`index` no `angular.json` ou `project.json`; `entry` no webpack/rspack/rsbuild; `index.html` do diretório no Vite; `source.entry` no rsbuild (ou a convenção `src/index.*` quando não há). |
| Build | Configuração de build própria e como é invocada: `vite.config.*`, `webpack.config.*`, `rsbuild.config.*` com o script `build` do `package.json:linha`, ou o alvo `build` no `angular.json`/`project.json`. Página estática que não precisa de build: `— (estático, sem build)`. |
| Workspace | Linha da declaração do passo 2 que inclui o diretório (ex.: `pnpm-workspace.yaml:2` com `packages/*`). |
| Deploy | Artefato de build ou deploy separado para este diretório: `Dockerfile` no diretório, job de CI que constrói ou publica só este diretório, configuração de hospedagem (`vercel.json`, `netlify.toml`). O ponto de partida são as ocorrências `ops-*` e `ci-*` do `matches.csv`. |

Uma característica herdada de outra linha não conta para esta: por exemplo, o `src/index.html`
usado pelo `angular.json` da raiz é a entrada da linha `.`, não da linha `src`.

### 5. Julgamento de cada linha

A coluna `Unidade frontend` é decidida com estas regras, nesta ordem:

| Resposta | Quando |
|---|---|
| `No` | O diretório é parte de outra unidade (sua entrada ou build são usados pelo build de outra linha, como `src/` de um projeto Angular), é biblioteca ou pacote compartilhado sem entrada de aplicação, não é frontend (servidor, ferramenta, documentação), ou não tem entrada nem build (por exemplo, só `package.json` e lockfile). |
| `Yes` | O diretório tem entrada própria que inicia uma UI **e** build próprio (configuração ou alvo) **ou** não precisa de build, de modo que pode ser construído ou servido como aplicação frontend sozinho. Não precisa de build: a entrada é um HTML do próprio diretório que carrega diretamente arquivos estáticos (JS, CSS), sem imports de pacotes npm que exijam bundler. |
| `Undetermined` | Tem entrada ou build, mas não ambos de forma clara, ou os artefatos são contraditórios (por exemplo, um build declarado que referencia um arquivo ausente do snapshot). |

A coluna `Motivo` traz uma frase curta. Na dúvida entre `Yes` e `Undetermined`, a resposta é
`Undetermined`, com a explicação em "Notas".

Observações:
- Uma unidade fora do snapshot (remote em outro repositório, citado pela classificação) não vira linha; ela é registrada em "Notas".
- Uma unidade frontend sem `package.json` próprio é possível (projetos de um workspace Angular ou Nx).
- Deploy separado reforça a fronteira, mas não é exigido para `Yes`.

### 6. Resumo

A seção "Resumo" traz exatamente a frase: "Aplicações frontend no snapshot: N (dir1, dir2, ...)." com as
linhas `Yes`, na ordem da tabela. Com zero: "Aplicações frontend no snapshot: 0."
Essa contagem são as fronteiras de aplicação frontend observáveis no snapshot, participem ou não da
composição. Ela não é o `frontend_units` da classificação, que conta as unidades da aplicação MFE,
inclusive as que estão fora do repositório.
Se N diferir de `frontend_units` da classificação, a diferença é explicada em "Notas" (por exemplo, unidades externas).

### 7. Notas e revisão conjunta

- **Notas** (opcional): unidades externas, diferença em relação à classificação, unidade que faltou no `units.csv`, sinais enganosos.
- **Ponto para revisão conjunta**: obrigatório se `status: review`.

Quando algo contradiz a classificação do repositório, a revisão não propõe mudá-la; a contradição
é registrada em "Notas".

## Verificações de consistência

Antes de considerar um arquivo concluído, confere-se que:

- o nome do arquivo é igual ao da classificação;
- `commit` é igual ao da classificação e ao do `acquisition.csv`;
- `version` e `config_sha256` são os do `manifest.json` da mineração;
- a seção "Workspace" tem uma declaração com `artefato:linha` ou a frase fixa;
- o número de linhas da tabela é igual ao de linhas de dados do `units.csv`, e as duas colunas copiadas são idênticas;
- toda célula de característica tem `artefato:linha` ou `—`;
- toda linha tem `Unidade frontend` em `Yes | No | Undetermined` e um motivo;
- o "Resumo" lista exatamente as linhas `Yes`;
- toda citação foi aberta no snapshot, e a linha citada contém o que foi descrito;
- o arquivo não contém comentários ou marcações de preenchimento;
- `status` é `draft` ou o valor definido pelo pesquisador.

## Quando a mineração mudar

Se `mine` for executado com outro catálogo (nova `version`, novo `config_sha256`), os arquivos
desta pasta continuam válidos só para a versão registrada no front matter. Os repositórios cujo
`units.csv` mudou precisam ser revisados de novo, com o bloco `mining` atualizado.

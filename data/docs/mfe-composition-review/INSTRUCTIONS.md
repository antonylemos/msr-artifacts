# Método: revisão de relações de composição

Este documento descreve como foi feita a revisão de relações de composição e como ler os arquivos
`NNN-<owner>__<name>.md` desta pasta. Cada arquivo registra a revisão de um repositório do corpus.

## Objetivo

Seção 3.4.5 do protocolo (*Composition-relationship mining*): para cada relação de composição,
registrar as unidades que participam e, quando observável, a direção.

A revisão de código-fonte (seção 3.4.4 do protocolo) registrou **construções**, uma por linha de código. Esta etapa
as junta, com as declarações de configuração, em **relações entre unidades**. No repositório 045,
três construções do shell e o `remotes` do `vite.config.ts` viram uma relação: `shell → shop`,
`host → remote`.

O arquivo tem duas partes com papéis diferentes:

- **A tabela é o critério.** Cada coluna tem vocabulário fixo e regra, para que as relações
  possam ser contadas e comparadas entre repositórios.
- **O texto é a leitura.** A "Leitura do repositório" e os parágrafos de "Observações" são livres.
  Eles registram o que a tabela não expressa, para que quem lê entenda o projeto sem voltar ao código.

Esta etapa não procura construções de código novas, não reclassifica o repositório e não altera
as revisões anteriores.

## Fontes consultadas (somente leitura)

| O quê | Caminho |
|---|---|
| Lista de repositórios | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Unidades | `docs/mfe-structure-review/NNN-<owner>__<name>.md` (tabela "Unidades") |
| Configuração | `docs/mfe-dependency-review/NNN-<owner>__<name>.md` (linhas `Configurada` = `Yes`) e configurações citadas nas revisões anteriores |
| Construções | `docs/mfe-source-review/NNN-<owner>__<name>.md` (linhas `Composição` = `Yes` ou `Undetermined`, nas duas tabelas) |
| Manifests | `data/mining/mfe-mining-001/manifest.json` e `data/inspections/mfe-dependencies-001/manifest.json` |
| Arquivos do snapshot | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classificação (id, commit) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Todo `artefato:linha` é relativo a `files/` do snapshot. A revisão nunca usa `data/samples/` e não modifica nada em `data/`.

## Produto

Um arquivo `docs/mfe-composition-review/NNN-<owner>__<name>.md` por repositório, com o **mesmo nome**
do arquivo de classificação. O exemplo completo é `008-mrmechazilla__host-app.md`.

Cada arquivo tem esta estrutura:

1. Front matter com os campos descritos no passo 1.
2. Título `# NNN — <owner>/<name>`.
3. Seção "Leitura do repositório": texto livre.
4. Seção "Relações": uma tabela com as colunas `#`, `Origem`, `Destino`, `Tipo`, `Direção`, `Mecanismo`,
   `No snapshot`, `Ativa`, `Configuração` e `Código`.
5. Seção "Observações": um parágrafo por relação.
6. Seção "Resumo" e, quando o `status` é `review`, a seção "Ponto para revisão conjunta".

## Procedimento por repositório

### 1. Cabeçalho do arquivo

O front matter registra `id`, `full_name` e `commit`, copiados da classificação; `inputs.mining`, copiado
da revisão de código-fonte; `inputs.inspection`, copiado da revisão de dependências; `status: draft`
enquanto a revisão não foi validada (só o pesquisador promove o status para `final`); e a data da revisão.

As três revisões anteriores devem estar `final` e ter o mesmo `commit` do `acquisition.csv`, e os blocos
de inputs devem bater com os manifests. Se algo divergir, o `status` passa a `review` e a divergência
é registrada em "Ponto para revisão conjunta".

### 2. Levantamento das evidências

- **Código:** as linhas `Yes` e `Undetermined` das duas tabelas da revisão de código-fonte.
- **Configuração:** as declarações que ligam unidades (`remotes`, `exposes`/`name`/`filename`,
  import map, registro de aplicações) nas configurações das linhas `Configurada = Yes` e nas já
  citadas pelas revisões anteriores. A configuração **do destino** aberta para resolvê-lo
  (`name`, `exposes`, `filename`, `base`/`publicPath`, porta) também entra, mesmo que não tenha
  sido citada antes.

### 3. Montagem das relações

Evidências com o mesmo trio Origem, Destino e Tipo viram **uma** linha.

**Origem.** A unidade que carrega, registra, usa ou embute a outra; em `communication`, a que
envia. É um diretório `Yes` ou `Undetermined` da revisão estrutural. A coluna `Unidade` da revisão
de código-fonte diz onde a evidência está, não quem é a Origem: definições de custom elements,
lifecycles e `exposes` do fornecedor entram na relação do consumidor.

**Destino.** O diretório da unidade, quando há correspondência explícita no snapshot (`name`/`exposes`
do remote, `base`/`publicPath`, nome do arquivo, tag definida na unidade). Porta sozinha não basta.
Sem correspondência, o Destino é o nome ou a URL como aparece no artefato.

**Tipo:**

| Tipo | Quando |
|---|---|
| `host → remote` | A origem carrega módulos ou componentes expostos pelo destino (Module Federation, `import()` remoto, `loadRemote`). |
| `root-config → application` | A origem registra o destino num orquestrador (`registerApplication`, `registerMicroApps`). `mount`/`unmount` sozinho não basta. |
| `application → custom-element` | A origem usa a tag de um custom element do destino. O script que carrega a tag entra na mesma relação. |
| `page → embedded-frontend` | A origem embute o destino por `<iframe>` ou carrega seu bundle por script e o monta por API global. |
| `communication` | As unidades trocam mensagens (`CustomEvent`, `postMessage`, `BroadcastChannel`, serviço reativo compartilhado). Linha própria, mesmo que o par já tenha outra relação. |
| `other` | Outra relação, explicada no parágrafo correspondente. |

Uma relação mista recebe o tipo da forma como o destino entra na origem: carregado como módulo
→ `host → remote`; registrado num orquestrador → `root-config → application`.

**Ordem das linhas:** pela posição da primeira citação da coluna Código na revisão de
código-fonte; relações sem Código no fim; empates em ordem alfabética do Destino.

### 4. Preenchimento das colunas

| Coluna | Valores |
|---|---|
| # | Número da relação, usado nos parágrafos de "Observações". |
| Direção | `origem → destino`; `bidirecional` só em `communication` com envio nos dois sentidos (Origem e Destino em ordem alfabética); `Undetermined` quando não se sabe quem envia ou consome. |
| Mecanismo | `module-federation`, `native-federation`, `single-spa`, `qiankun`, `web-components`, `iframe`, `script`, `events` ou `other`. `native-federation` é a federação baseada em ES modules e import maps (`@angular-architects/native-federation`), sem o runtime do webpack; não é uma variante de `module-federation`. |
| No snapshot | `Yes` (destino resolvido numa unidade), `No` (destino identificado como externo), `Undetermined` (identidade ou localização não estabelecida). |
| Ativa | `Yes` se ao menos uma linha `Yes` da revisão de código-fonte sustenta a relação; `Undetermined` se só há linhas `Undetermined`; `No` se a relação só aparece na configuração. |
| Configuração | `artefato:linha (o que declara)`, separados por `; `, ou `—`. |
| Código | `Arquivo:linha` exatamente como na revisão de código-fonte, na ordem de lá, separados por `; `, ou `—`. Uma linha que sustenta várias relações aparece em todas. Toda linha `Yes`/`Undetermined` da revisão de código-fonte aparece em ao menos uma relação. |

### 5. Textos

**Leitura do repositório.** Um ou mais parágrafos livres sobre o projeto como um todo: quem é o
host, como as unidades entram, que mecanismos usa, o propósito do repositório (demonstração,
template, produto), particularidades e o que não virou relação (exposição sem consumidor, rota
comentada, unidade isolada, callbacks trocados entre unidades). O texto é escrito para quem não vai abrir o código.

**Observações.** Um parágrafo por relação, na ordem da tabela, começando por
`**N. Origem → Destino.**`. O texto é livre: como o destino foi resolvido, o que sustenta ou limita
os valores da linha e o que for particular a essa relação.

Nos dois textos, `artefato:linha` é citado ao afirmar algo sobre o código, e cada citação é aberta no snapshot.

### 6. Resumo

O resumo tem exatamente duas linhas:

```
Relações: N (tipo: n, ...). Ativas: a. Destino fora do snapshot: f.
Unidades sem relação: <diretórios Yes da revisão estrutural fora de todas as relações, separados por ", "; "nenhuma" se não houver>.
```

`N` = linhas da tabela, tipos na ordem em que aparecem; `a` = Ativa `Yes`; `f` = No snapshot `No`.

Quando algo contradiz a classificação do repositório, a revisão não propõe mudá-la; a divergência
é registrada na "Leitura do repositório".

## Verificações de consistência

Antes de considerar um arquivo concluído, confere-se que:

- o front matter segue o passo 1;
- toda linha `Yes`/`Undetermined` da revisão de código-fonte está na coluna Código de ao menos uma relação, com o `Arquivo:linha` idêntico;
- não há duas linhas com o mesmo trio Origem, Destino, Tipo;
- os valores das colunas usam os vocabulários do passo 4;
- há um parágrafo em "Observações" para cada linha da tabela;
- toda citação foi aberta no snapshot;
- o "Resumo" confere com a tabela;
- o arquivo não contém comentários ou marcações de preenchimento.

## Quando uma revisão anterior mudar

Se a revisão estrutural, de dependências ou de código-fonte de um repositório mudar, o arquivo
desse repositório precisa ser revisado de novo, com `annotation.date` atualizado.

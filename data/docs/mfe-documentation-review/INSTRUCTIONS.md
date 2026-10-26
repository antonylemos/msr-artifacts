# Método: revisão de documentação

Os caminhos começados por `docs/` preservam a organização do projeto de origem (`repo-miner`). Neste pacote, as análises correspondentes estão em `data/docs/`. Os caminhos e hashes registrados nas análises mantêm sua função de proveniência.

Este documento descreve como foi feita a revisão de documentação e como ler os arquivos
`NNN-<owner>__<name>.md` desta pasta. Cada arquivo registra a revisão de um repositório do corpus.

## Objetivo

Seção 3.4.7 do protocolo (*Documentation and semantic mining*): registrar o que a documentação
afirma sobre a arquitetura e confrontar cada afirmação com os artefatos de implementação.
A documentação é evidência semântica: vale como contexto, mas não é aceita quando contradiz os
artefatos, e não basta sozinha para sustentar uma interpretação arquitetural.

As revisões anteriores (seções 3.4.2 a 3.4.6 do protocolo) já registraram o que os artefatos mostram. Esta etapa lê
o que os textos **dizem** e aponta, para cada afirmação, se as revisões e o snapshot a confirmam.
No repositório 033, o README diz que as duas aplicações foram "deployed as 2 separate Netlify
sites"; a revisão de build e deploy encontrou artefato só para o remote. A afirmação é `parcial`.

O arquivo tem duas partes com papéis diferentes:

- **A tabela é o critério.** Cada coluna tem vocabulário fixo e regra, para que as afirmações
  possam ser contadas e comparadas entre repositórios.
- **O texto é a leitura.** A "Leitura do repositório" e os parágrafos de "Observações" são livres.
  Eles registram o que a tabela não expressa, para que quem lê entenda a documentação sem abri-la.

Esta etapa não reclassifica o repositório e não altera as revisões anteriores.

## Fontes consultadas (somente leitura)

| O quê | Caminho |
|---|---|
| Lista de repositórios | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Ocorrências de documentação | `data/mining/mfe-mining-001/repos/<owner>__<name>/matches.csv` (padrões `doc-*`) |
| Documentos | `data/mining/mfe-mining-001/repos/<owner>__<name>/artifacts.csv` (tipo `documentation`) |
| Revisões anteriores | `docs/mfe-dependency-review/`, `docs/mfe-structure-review/`, `docs/mfe-source-review/`, `docs/mfe-composition-review/`, `docs/mfe-build-deploy-review/` (mesmo nome de arquivo) |
| Manifest | `data/mining/mfe-mining-001/manifest.json` |
| Arquivos do snapshot | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classificação (id, commit) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Todo `artefato:linha` é relativo a `files/` do snapshot. A revisão nunca usa `data/samples/` e não modifica nada em `data/`.

As revisões anteriores, os dados e as configurações consultados são fontes de evidência e não
são alterados nesta etapa. A validação final cabe ao pesquisador.

## Produto

Um arquivo `docs/mfe-documentation-review/NNN-<owner>__<name>.md` por repositório, com o **mesmo nome**
do arquivo de classificação.

Cada arquivo tem esta estrutura:

1. Front matter com os campos descritos no passo 1.
2. Título `# NNN — <owner>/<name>`.
3. Seção "Leitura do repositório": texto livre.
4. Seção "Afirmações": uma tabela com as colunas `#`, `Documento`, `Afirmação`, `Tema`, `Corroboração` e `Evidência`.
5. Seção "Observações": um parágrafo por afirmação.
6. Seção "Resumo".

## Procedimento por repositório

### 1. Cabeçalho do arquivo

O front matter registra `id`, `full_name` e `commit`, copiados da classificação; `inputs.mining`,
copiado do manifest; `status: draft` enquanto a revisão não foi validada (só o pesquisador promove o
status para `final`); e a data da revisão.

As cinco revisões anteriores devem estar `final` e ter o mesmo `commit` do `acquisition.csv`.
Se algo divergir, o `status` passa a `review` e a divergência é registrada em "Ponto para revisão conjunta".

### 2. Levantamento dos textos

- **Documentos:** todos os arquivos `documentation` do `artifacts.csv` (`.md`) que
  falam do projeto são lidos inteiros. Arquivos de terceiros ou gerados por template de ferramenta (ex.: README padrão
  do Vite ou do Angular CLI, changelog automático) são citados na Leitura, sem virar linha, salvo
  se trouxerem afirmação sobre este projeto.
  Dentro de um documento, blocos de código que reproduzem arquivos-fonte, configurações ou comandos
  não viram linha (são citados na Leitura); diagramas e árvores de pastas comentadas são documentação e
  viram linha como qualquer outro texto.
- **Ocorrências `doc-*`:** cada uma é aberta. Toda ocorrência aparece numa linha da tabela ou é citada
  na Leitura como não afirmação (título, menção solta, instrução de execução).
- **Comentários e campos descritivos:** nos artefatos que as revisões anteriores citam (configurações,
  Dockerfiles, workflows, código de composição), os comentários e campos como a `description`
  do `package.json` são lidos. Os que fazem afirmação arquitetural também viram linha.

### 3. Preenchimento da tabela

**Afirmação arquitetural** é uma frase que diz algo verificável sobre as unidades frontend como
conjunto: que o projeto é ou contém micro-frontends; quais unidades existem e que papel têm (host,
remote, shell); como se compõem (tecnologia, carregamento em runtime); como são construídas e
implantadas; se rodam, são desenvolvidas ou evoluem sozinhas; o que compartilham entre si
(bibliotecas, assets, sessão) e de que infraestrutura dependem (gateway, proxy, backends). A
afirmação é extraída mesmo quando vem dentro de um comando, de uma lista ou de uma descrição funcional (ex.:
"(app complète, standalone)" ao lado de um `npm run`).

Não entram: detalhes internos de uma unidade (injeção de dependências, interceptadores, autenticação
simulada), relações só entre backends, detalhes da infraestrutura que não mudam como as unidades são
compostas ou implantadas (porta, certificado, variáveis de ambiente, restrição de acesso), sistemas
fora do snapshot que não se ligam às unidades, e negócio, aparência ou instalação. O que for relevante
entre eles vai na Leitura.

A mesma afirmação repetida em vários lugares vira **uma** linha, no primeiro lugar pela ordem
abaixo; os demais vão no parágrafo dela. Para decidir se trechos em lugares diferentes são a mesma
afirmação: mudar o sujeito, o mecanismo ou a propriedade verificável faz outra afirmação (ex.: "arquitetura host/remotes" e "o shell carrega cada remote por
`loadRemoteModule`" são duas). O nome de uma tecnologia conta como mecanismo: um texto que nomeia
tecnologia diferente da registrada na revisão de dependências (ex.: "module federation" onde há
`native-federation`) é outra afirmação, `contradita`, mesmo que outro trecho corrija o nome.

Dentro de uma mesma frase, a afirmação se divide em mais de uma linha só quando as partes receberiam corroborações
diferentes. Se a frase não se divide e fala de mais de um tema, o Tema é o da primeira propriedade
que ela menciona.

Uma biblioteca, um asset ou uma sessão "compartilhados" são `corroborada` quando ao menos duas
unidades os usam no snapshot; existir ou estar disponível (alias, pasta) não basta.

**Ordem das linhas:** pelo caminho do documento, em ordem de bytes (maiúsculas antes de minúsculas, como `LC_ALL=C sort`), depois pela linha.

| Coluna | Valores |
|---|---|
| # | Número da afirmação, usado nos parágrafos de "Observações". |
| Documento | `artefato:linha` (ou intervalo). |
| Afirmação | Trecho curto entre aspas, no idioma original. Se não for português nem inglês, a tradução vem entre parênteses. |
| Tema | `estrutura` (unidades e fronteiras), `composição` (como as unidades se ligam, tecnologia, runtime), `build-deploy` (build, deploy, hospedagem), `independência` (a unidade roda, é desenvolvida ou evolui sozinha, sem referência a build ou deploy), `outro`. |
| Corroboração | `corroborada`: as revisões anteriores ou o snapshot confirmam a afirmação. `parcial`: confirmam parte dela, e o resto não tem artefato. `contradita`: os artefatos mostram o contrário, ao menos em parte. `sem corroboração`: nenhum artefato do snapshot confirma nem contradiz (ex.: uso em produção, endereço publicado sem configuração). |
| Evidência | A revisão anterior e a linha ou relação dela (ex.: `3.4.6 #2`, `3.4.5 #1`) e/ou `artefato:linha` do snapshot, separados por `; `. `—` só em `sem corroboração`. |

Dentro de uma afirmação que não se divide, `contradita` prevalece sobre `parcial`: se uma parte é
confirmada e outra é desmentida, a afirmação é `contradita`, e o parágrafo diz qual parte se confirma.

### 4. Textos

**Leitura do repositório.** Um ou mais parágrafos livres: que documentação existe, em que idioma,
o que ela diz do projeto como um todo e como se compara com o que as revisões anteriores mostram.
O texto lista as ocorrências `doc-*` que não viraram linha, os documentos de template sem afirmação e os
artefatos cujos comentários foram lidos.

**Observações.** Um parágrafo por afirmação, na ordem da tabela, começando por `**N. Documento.**`.
O texto é livre: o que a afirmação diz, o que a sustenta, limita ou contradiz.

Nos dois textos, `artefato:linha` é citado ao afirmar algo sobre o código, e cada citação é aberta no snapshot.

### 5. Resumo

O resumo tem exatamente uma linha:

```
Afirmações: N (corroborada: c, parcial: p, contradita: x, sem corroboração: s). Temas: (tema: n, ...).
```

Na Corroboração, os quatro valores aparecem sempre, nessa ordem; em Temas, só os presentes, na ordem do
vocabulário. Sem afirmações: "Afirmações: 0."

Quando algo contradiz a classificação do repositório, a revisão não propõe mudá-la; a divergência
é registrada na "Leitura do repositório".

## Verificações de consistência

Antes de considerar um arquivo concluído, confere-se que:

- o front matter segue o passo 1;
- toda ocorrência `doc-*` está numa linha da tabela ou citada na Leitura;
- nenhuma afirmação aparece em duas linhas, e a ordem segue o passo 3;
- os valores usam os vocabulários do passo 3, e só `sem corroboração` tem Evidência `—`;
- há um parágrafo em "Observações" para cada linha da tabela;
- toda citação foi aberta no snapshot;
- o "Resumo" confere com a tabela;
- o arquivo não contém comentários ou marcações de preenchimento.

## Quando uma revisão anterior mudar

Se uma revisão anterior de um repositório mudar, o arquivo desse repositório precisa ser revisado
de novo, com `annotation.date` atualizado.

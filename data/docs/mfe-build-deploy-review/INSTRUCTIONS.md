# Método: revisão de build e deploy

Este documento descreve como foi feita a revisão de build e deploy e como ler os arquivos
`NNN-<owner>__<name>.md` desta pasta. Cada arquivo registra a revisão de um repositório do corpus.

## Objetivo

Seção 3.4.6 do protocolo (*Build and deployment mining*): examinar as configurações de build e
deploy em busca de evidência de que as unidades frontend são **construídas ou implantadas
separadamente**. Artefatos relevantes: workflows de CI/CD, Dockerfiles, manifestos de deploy,
configurações de hospedagem, pacotes frontend versionados de forma independente e configurações
de hospedagem dos remotes.

A revisão estrutural (seção 3.4.3 do protocolo) já apontou, por diretório, **um** artefato de build e **um** de
deploy, quando havia. Esta etapa parte dela e responde, por aplicação, se o build e o deploy são
**separados ou conjuntos**. No repositório 059, cada aplicação tem build próprio, mas as três são
publicadas numa única imagem nginx: build `separado`, deploy `conjunto`.

O arquivo tem duas partes com papéis diferentes:

- **A tabela é o critério.** Cada coluna tem vocabulário fixo e regra, para que as aplicações
  possam ser contadas e comparadas entre repositórios.
- **O texto é a leitura.** A "Leitura do repositório" e os parágrafos de "Observações" são livres.
  Eles registram o que a tabela não expressa, para que quem lê entenda o projeto sem voltar ao código.

Esta etapa não reclassifica o repositório e não altera as revisões anteriores.

## Fontes consultadas (somente leitura)

| O quê | Caminho |
|---|---|
| Lista de repositórios | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Aplicações | `docs/mfe-structure-review/NNN-<owner>__<name>.md` (tabela "Unidades", colunas Build, Workspace e Deploy) |
| Ocorrências de deploy e CI | `data/mining/mfe-mining-001/repos/<owner>__<name>/matches.csv` (padrões `ops-*`, `ci-*`, `cfg-public-path`) |
| Endereços dos remotes | `docs/mfe-composition-review/NNN-<owner>__<name>.md` (coluna Configuração) |
| Manifest | `data/mining/mfe-mining-001/manifest.json` |
| Arquivos do snapshot | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classificação (id, commit) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Todo `artefato:linha` é relativo a `files/` do snapshot. A revisão nunca usa `data/samples/` e não modifica nada em `data/`.

## Produto

Um arquivo `docs/mfe-build-deploy-review/NNN-<owner>__<name>.md` por repositório, com o **mesmo nome**
do arquivo de classificação.

Cada arquivo tem esta estrutura:

1. Front matter com os campos descritos no passo 1.
2. Título `# NNN — <owner>/<name>`.
3. Seção "Leitura do repositório": texto livre.
4. Seção "Aplicações": uma tabela com as colunas `#`, `Aplicação`, `Build`, `Deploy`, `Onde é servida`,
   `Versionamento` e `Artefatos`.
5. Seção "Observações": um parágrafo por aplicação.
6. Seção "Resumo".

## Procedimento por repositório

### 1. Cabeçalho do arquivo

O front matter registra `id`, `full_name` e `commit`, copiados da classificação; `inputs.mining`,
copiado da revisão estrutural; `status: draft` enquanto a revisão não foi validada (só o pesquisador
promove o status para `final`); e a data da revisão.

As revisões estrutural e de composição devem estar `final` e ter o mesmo `commit` do
`acquisition.csv`, e o bloco de inputs deve bater com o manifest. Se algo divergir, o `status` passa a
`review` e a divergência é registrada em "Ponto para revisão conjunta".

### 2. Levantamento dos artefatos

- Os artefatos das colunas Build, Workspace e Deploy da revisão estrutural.
- Cada arquivo apontado por uma ocorrência `ops-*`, `ci-*` ou `cfg-public-path` do `matches.csv`.
- Os scripts de build dos `package.json` (o da raiz e o de cada aplicação) e o que eles invocam.
- Os endereços dos remotes na coluna Configuração da revisão de composição.

Cada um é aberto. Todo arquivo apontado pelo `matches.csv` aparece em "Artefatos" ou é explicado
no texto (ex.: Dockerfile do backend, ocorrência `cors` num servidor de API).

### 3. Preenchimento da tabela

A tabela tem uma linha por diretório `Yes` ou `Undetermined` da revisão estrutural, na ordem de lá.
Sem nenhum, a tabela é substituída pela frase: "Nenhuma aplicação frontend na revisão estrutural."

| Coluna | Valores |
|---|---|
| # | Número da aplicação, usado nos parágrafos de "Observações". |
| Aplicação | Diretório, como na revisão estrutural. |
| Build | `separado`: a aplicação tem build próprio, que gera um artefato só dela (mesmo que um script da raiz dispare os builds de todas). `conjunto`: o código da aplicação sai no mesmo artefato de build de outra aplicação. `sem build`: página estática servida como está. `Undetermined`: não dá para estabelecer. |
| Deploy | `separado`: um artefato do snapshot empacota ou publica a aplicação à parte (imagem, serviço do compose, job de CI, configuração de hospedagem própria). Job ou serviço próprio só sustenta `separado` quando empacota ou publica a aplicação à parte das demais; executar builds separados não basta. `conjunto`: a aplicação é publicada no mesmo artefato que outra (uma imagem, um deploy de hospedagem). `não observado`: nenhum artefato de deploy do snapshot cobre a aplicação; comandos usados só em desenvolvimento (`vite`, `webpack serve`, `ng serve`, um `http-server` rodado à mão) não contam. `Undetermined`: há artefato, mas não dá para estabelecer se cobre a aplicação ou se está em uso; ou há artefatos que publicam a aplicação à parte e outros que a publicam junto com outra (as duas formas são descritas no parágrafo da aplicação). |
| Onde é servida | Endereço onde a aplicação é publicada ou servida, com artefato:linha (URL, caminho como `/remotes/promote/`, porta). Vários endereços são separados por `; `; `—` se não houver. |
| Versionamento | `Yes`: a aplicação tem versão própria usada para publicá-la ou liberá-la (ex.: job que publica o pacote com o nome e a versão dela). `No`: não foi observado no snapshot; um campo `version` sem uso na publicação é `No`. |
| Artefatos | `artefato:linha (o que faz)`, separados por `; `, ou `—`. Os que sustentam Build, Deploy e Versionamento. |

`não observado` registra ausência de evidência, não evidência de ausência: a aplicação pode ser
publicada por algo fora do repositório. `Undetermined` registra evidência ambígua: existe um
artefato de deploy, mas sua relação com a aplicação não se resolve no snapshot (ex.: chart genérico
que não nomeia nenhuma aplicação).

Documentação (README) não é artefato de deploy: o que ela afirma vai para o texto e para a revisão
de documentação (seção 3.4.7 do protocolo), mas não decide a coluna Deploy.

### 4. Textos

**Leitura do repositório.** Um ou mais parágrafos livres sobre como o repositório é construído,
empacotado e publicado: scripts e workspace, CI, imagens, compose, proxy, hospedagem; se é
configuração de desenvolvimento ou de produção; artefatos que não cobrem nenhuma aplicação
frontend; contradições entre artefatos. O texto é escrito para quem não vai abrir o código.

**Observações.** Um parágrafo por aplicação, na ordem da tabela, começando por
`**N. aplicação.**`. O texto é livre: o que sustenta ou limita os valores da linha, o que a aplicação
compartilha com as outras e o que for particular a ela.

Nos dois textos, `artefato:linha` é citado ao afirmar algo sobre o código, e cada citação é aberta no snapshot.

### 5. Resumo

O resumo tem exatamente uma linha:

```
Aplicações: N. Build (valor: n, ...). Deploy (valor: n, ...). Versionamento independente: v.
```

`N` = linhas da tabela; em Build e Deploy, só os valores presentes, na ordem do vocabulário do
passo 3; `v` = Versionamento `Yes`. Sem aplicações: "Aplicações: 0."

Quando algo contradiz a classificação do repositório, a revisão não propõe mudá-la; a divergência
é registrada na "Leitura do repositório".

## Verificações de consistência

Antes de considerar um arquivo concluído, confere-se que:

- o front matter segue o passo 1;
- há uma linha para cada diretório `Yes` ou `Undetermined` da revisão estrutural, na ordem de lá;
- os valores das colunas usam os vocabulários do passo 3;
- todo arquivo apontado por `ops-*`, `ci-*` ou `cfg-public-path` aparece em "Artefatos" ou no texto;
- há um parágrafo em "Observações" para cada linha da tabela;
- toda citação foi aberta no snapshot;
- o "Resumo" confere com a tabela;
- o arquivo não contém comentários ou marcações de preenchimento.

## Quando uma revisão anterior mudar

Se a revisão estrutural ou de composição de um repositório mudar, o arquivo desse repositório
precisa ser revisado de novo, com `annotation.date` atualizado.

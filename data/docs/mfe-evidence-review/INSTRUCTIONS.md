# Método: extração e classificação de evidências

Os caminhos começados por `docs/` preservam a organização do projeto de origem (`repo-miner`). Neste pacote, as análises correspondentes estão em `data/docs/`. Os caminhos e hashes registrados nas análises mantêm sua função de proveniência.

Este documento descreve como foi feita a extração e a classificação de evidências e como ler os
arquivos `NNN-<owner>__<name>.md` desta pasta. Cada arquivo registra a análise de um repositório do corpus.

## Objetivo

Seção 3.5 do protocolo (*Evidence Extraction and Classification*): transformar o que as revisões
da etapa 3.4 registraram em **observações**. Cada observação separa o que está no artefato
(observação) do que isso indica sobre a arquitetura (interpretação). Depois, é classificada por
dimensão, por tipo de evidência e por força.

A etapa 3.5 **classifica, não minera**. Toda observação vem das revisões finais da 3.4, e os valores dessas
revisões não mudam aqui. Se algo parecer faltar ou estar errado na 3.4, a análise não acrescenta nem corrige:
registra o ponto em "Ponto para revisão conjunta", e quem decide é o pesquisador.

O arquivo segue a ordem do protocolo:

- **Observações:** em texto, uma por bloco, com **Observação** e **Interpretação** separadas, como nos
  exemplos do protocolo.
- **Classificação:** em tabela, uma linha por observação, com os campos de classificação.

## Fontes consultadas (somente leitura)

| Etapa | Revisão | Dimensão |
|---|---|---|
| 3.4.2 | `docs/mfe-dependency-review/` | 1. tecnologia e dependência |
| tabelas da 3.4 | arquivos de configuração citados (passo 2) | 2. configuração |
| 3.4.4 | `docs/mfe-source-review/` | 3. código-fonte |
| 3.4.3 | `docs/mfe-structure-review/` | 4. estrutural |
| 3.4.5 | `docs/mfe-composition-review/` | 5. composição |
| 3.4.6 | `docs/mfe-build-deploy-review/` | 6. build e deploy |
| 3.4.7 | `docs/mfe-documentation-review/` | 7. documentação |
| 3.4.8 | `docs/mfe-history-review/` | 8. histórico |

Todas têm o mesmo nome de arquivo. O snapshot (`data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/`)
é aberto para conferir caminho e linha e para ler os trechos que viram observação, a fim de
descrevê-los. Os clones de `data/samples/` não são consultados.

As revisões anteriores, os dados e as configurações consultados são fontes de evidência e não
são alterados nesta etapa. A validação final cabe ao pesquisador.

## Produto

Um arquivo `docs/mfe-evidence-review/NNN-<owner>__<name>.md` por repositório, com o **mesmo nome**
do arquivo de classificação.

Cada arquivo tem esta estrutura:

1. Front matter com os campos descritos no passo 1.
2. Título `# NNN — <owner>/<name>`.
3. Seção "Leitura do repositório": texto livre.
4. Seção "Observações": um bloco numerado por observação.
5. Seção "Classificação": uma tabela com uma linha por observação.
6. Seção "Resumo".

## Procedimento por repositório

### 1. Cabeçalho do arquivo

O front matter registra `id`, `full_name` e `commit`, copiados da classificação; `status: draft`
enquanto a análise não foi validada (só o pesquisador promove o status para `final`); e a data da análise.

### 2. Derivação das observações

**Uma linha de revisão vira uma observação**, inclusive as linhas com `No` (ex.: um diretório de
backend, uma dependência sem uso): o estudo também descreve sinais enganosos e ausências.

- **3.4.2:** uma por dependência.
- **3.4.3:** uma por diretório da tabela de unidades.
- **3.4.4:** uma por construção, das duas tabelas.
- **3.4.5:** uma por relação.
- **3.4.6:** uma por aplicação.
- **3.4.7:** uma por afirmação.
- **3.4.8:** uma por ponto.

**A única exceção é a configuração (dimensão 2).** Os arquivos de configuração citados em
**qualquer tabela** das revisões da 3.4 viram observações, **só nos blocos que declaram um elemento
da composição**:
- builder ou plugin de federação;
- nome de remote ou de host;
- módulo exposto;
- dependências compartilhadas;
- URL de remote: o endereço pelo qual o consumidor resolve o remote (manifesto, `remotes` do Module Federation, import map). Caminhos de publicação, como um `location` do nginx, são deploy (dimensão 6). Proxies de servidor de desenvolvimento (ex.: `server.proxy` do Vite) também só encaminham caminhos e não entram;
- import map;
- registro de aplicação declarado num arquivo de configuração (ex.: o layout do single-spa, um import map). O registro de projetos num workspace (ex.: `projects` do `angular.json`, `workspaces` do `package.json`) é estrutura (dimensão 4).

Alcance e unidade:
- **Citação com linhas** cobre o bloco que contém essas linhas.
- **Citação sem linhas** (ex.: um arquivo na coluna Marcadores) cobre todos os blocos do arquivo que declaram elemento da composição.
- **Unidade de observação:** um bloco por unidade. Num arquivo de uma unidade só (ex.: `federation.config.js`), o bloco é a configuração inteira da unidade. Num arquivo que serve várias unidades (ex.: `angular.json`), é cada target de cada projeto.
- **Só arquivos de configuração, pela função do arquivo.** Um arquivo de configuração é o que uma ferramenta lê para montar o build ou o runtime: JSON, YAML, `angular.json`, import map, manifesto, e também arquivos JavaScript ou TypeScript dedicados a uma ferramenta (ex.: `federation.config.js`, `webpack.config.js`, `vite.config.ts`). Código que a aplicação executa fica na dimensão 3, pela linha da 3.4.4, mesmo quando registra ou roteia unidades (ex.: `registerApplication`, rotas que nomeiam remotes).

Ficam de fora:
- citações que só aparecem nos textos livres;
- valores que a própria revisão marcou como apoio, como "só corrobora" ou as portas de desenvolvimento;
- blocos que não declaram elemento da composição, como estilos, aliases de caminho ou targets que só apontam para outro target.

O mesmo bloco citado em vários lugares vira uma observação só, com todas as origens.

**Ordem das observações:** pela dimensão (1 a 8) e, dentro dela, na ordem da revisão de origem. Na
configuração, a ordem é pela primeira origem, na ordem das etapas e das linhas da tabela. Blocos com
a mesma primeira origem seguem a ordem de caminho e de linha no arquivo.

### 3. Escrita das observações

Cada observação é um bloco numerado, que começa por `### N. Artefato`. O cabeçalho lista **todos os
trechos** (`caminho:linha`, separados por `; `) necessários para sustentar a observação (protocolo:
*artifact path* e *location*):
- **Estrutura:** o diretório, com os trechos de entrada e build.
- **Composição:** a linha que nomeia o destino e as configurações que a resolvem.
- **Build e deploy:** os artefatos de build e os de deploy.
- **Histórico:** os commits do ponto, como `hash data (caminho)`.

```
### N. caminho:linha; caminho:linha

**Observação:** o que está no artefato, sem julgamento (raw observation).

**Interpretação:** o que a observação indica sobre a arquitetura.

**Nota:** só quando houver nota adicional (additional notes), ex.: a justificativa de uma força fora da orientação do passo 5.
```

### 4. Preenchimento da tabela de classificação

| Coluna | Valores |
|---|---|
| # | Número da observação, igual ao do bloco. |
| Origem | Revisão e linha (ex.: `3.4.2 (package.json:28)`, `3.4.3 (projects/shell)`, `3.4.5 #1`, `3.4.7 #3`); para configuração, a coluna também (ex.: `3.4.5 #1, #2 (Configuração)`). Várias origens separadas por `; `. |
| Dimensão | `1 tecnologia`, `2 configuração`, `3 código`, `4 estrutura`, `5 composição`, `6 build-deploy`, `7 documentação`, `8 histórico`. |
| Tipo | O tipo do artefato principal: `manifesto`, `configuração`, `código-fonte`, `diretório`, `deploy` (Dockerfile, compose, nginx, chart, script de deploy), `CI`, `documentação` (arquivo de texto), `comentário` (comentário ou campo descritivo em outro artefato), `histórico`. |
| Abordagem | O mecanismo que a própria observação mostra, com os nomes da 3.4 (`native-federation`, `module-federation`, `single-spa`, `web-components`, `iframe`, …), ou `—`. Numa afirmação, o mecanismo que ela nomeia. |
| Evidência | `tecnológica`: mostra a presença, a configuração ou o uso de uma tecnologia ou mecanismo de MFE, sem situar unidades. `arquitetural`: mostra unidades frontend (seus limites, build ou deploy) ou a ligação entre elas. `contexto`: não mostra nem uma coisa nem outra (ex.: backend, raiz de coordenação, sistemas externos); fica para explicar falsos positivos e limites. Exemplos abaixo. |
| Força | Ver passo 5. |
| Relações | `tipo alvo`, separados por `; `, ou `—`. Ver passo 6. |

Exemplos de Evidência:

| Caso | Evidência | Por quê |
|---|---|---|
| Configuração de uma unidade com nome próprio, módulos expostos ou dependências compartilhadas | `tecnológica` | Configura o mecanismo numa unidade, sem nomear outra. |
| Configuração do host que nomeia os remotes (manifesto, `remotes`) | `arquitetural` | Liga o host a outras unidades. |
| Mecanismo de comunicação ou carga implementado e não conectado a nenhuma unidade | `tecnológica` | O mecanismo existe; nenhuma unidade o usa. |
| Bootstrap assíncrono local (`import('./bootstrap')`) sem outro mecanismo na mesma observação | `tecnológica`, Abordagem `—` | Padrão associado ao Module Federation, mas a linha sozinha não mostra a tecnologia. |
| Renderização interna de um framework (ex.: `app.mount` do Vue) | `contexto` | Não é mecanismo de MFE. |
| Diretório de unidade frontend, build ou deploy por aplicação | `arquitetural` | Mostra o limite de uma unidade. |
| Raiz de workspace sem UI, backend, proxy de API | `contexto` | Não é unidade frontend nem mecanismo de MFE. |
| Afirmação sobre como as unidades frontend se organizam (ex.: "monorepo frontend", "host/remotes") | `arquitetural` | Fala das unidades como conjunto. |
| Afirmação que só nomeia uma tecnologia | `tecnológica` | Não situa unidades. |
| Afirmação sobre backends ou sistemas externos | `contexto` | Não fala de unidades frontend. |

### 5. Força

A força mede **quanto a observação, sozinha, sustenta a interpretação de arquitetura de MFE**
(unidades frontend relativamente independentes ligadas por um mecanismo de composição). É julgada
pelo conteúdo da observação, não pelo que outras confirmam; a corroboração fica em Relações.

Os critérios são os do protocolo:
- **forte:** liga diretamente unidades relativamente independentes por um mecanismo de composição explícito;
- **moderada:** uma tecnologia ou um mecanismo de composição configurado ou usado, ou o limite de uma unidade confirmado, sem estabelecer sozinho a organização completa;
- **fraca:** sinal isolado, ou construção que não participa da composição;
- **ambígua:** interpretações concorrentes continuam plausíveis.

A tabela abaixo é a **orientação do caso comum**. Ela vem do valor que a 3.4 já registrou. Quando a
força se afasta dela, a justificativa é registrada obrigatoriamente na **Nota** do bloco.

| Origem | Caso comum | Força |
|---|---|---|
| 3.4.2 | Configurada `Yes` ou `No` | `fraca` (a declaração é sinal isolado; a configuração tem observação própria) |
| 3.4.2 | Configurada `Undetermined` | `ambígua` |
| configuração | declara unidades de outra parte como remotes, aplicações ou destinos (ex.: manifesto ou configuração do host que nomeia os remotes) | `forte` (exemplo do protocolo: "a host configuration declares catalog and checkout as remote applications") |
| configuração | configura o mecanismo numa unidade só (builder, nome próprio, módulos expostos, dependências compartilhadas) | `moderada` |
| 3.4.4 | Composição `Yes`, e a linha nomeia a unidade de destino (chamada, rota, tag, registro) | `forte` |
| 3.4.4 | Composição `Yes`, e a linha é uma rota que liga um caminho a um componente remoto, sozinha ou numa tabela de rotas | `forte` |
| 3.4.4 | Composição `Yes`, e a linha só importa, prepara, chama ou renderiza o mecanismo fora de uma rota (ex.: `mount(el)`, `<Componente />`), ou recebe a unidade por parâmetro | `moderada` |
| 3.4.4 | Composição `No` | `fraca` |
| 3.4.4 | Composição `Undetermined` | `ambígua` |
| 3.4.3 | Unidade frontend `Yes` | `moderada` |
| 3.4.3 | `No` | `fraca` |
| 3.4.3 | `Undetermined` | `ambígua` |
| 3.4.5 | Ativa `Yes` | `forte` |
| 3.4.5 | Ativa `No` | `moderada` |
| 3.4.5 | Ativa `Undetermined` | `ambígua` |
| 3.4.6 | Build ou Deploy `separado` | `moderada` |
| 3.4.6 | nenhum `separado`, algum `Undetermined` | `ambígua` |
| 3.4.6 | demais | `fraca` |
| 3.4.7 | qualquer | `fraca`: uma afirmação não configura, não usa e não liga nada; sozinha, é evidência semântica (protocolo, 3.4.7) |
| 3.4.8 | `inconclusivo`, e a dúvida aberta muda a leitura arquitetural do snapshot (ex.: se um destino de composição existe) | `ambígua` |
| 3.4.8 | `inconclusivo`, e a dúvida é só sobre o passado (ex.: quando uma dependência entrou), com o snapshot claro | `fraca` |
| 3.4.8 | `esclarecido` ou `resolvido pelo snapshot` | `fraca` (explica outra observação, sem sustentar sozinha a arquitetura) |

A força se refere ao **snapshot**. A Interpretação de uma observação `ambígua` diz quais
interpretações arquiteturais continuam plausíveis.

### 6. Relações

`tipo alvo` lê-se como "esta observação *tipo* o alvo". O alvo é uma observação do arquivo (`#n`) ou,
quando o artefato não tem observação própria, um trecho (`caminho:linha`). A relação fica só na linha
do sujeito, sem a inversa.

| Tipo | Sujeito → alvo |
|---|---|
| `declara` | dependência → configuração ou código que usa a tecnologia declarada |
| `configura` | configuração → unidade, código ou relação que ela parametriza |
| `implementa` | código → relação de composição |
| `liga` | relação de composição → unidades de origem e destino |
| `publica` | build e deploy → unidade |
| `corrobora`, `corrobora em parte`, `contradiz` | afirmação → o que a confirma, confirma em parte ou desmente, conforme a Corroboração e a Evidência da 3.4.7. O alvo é o que de fato confirma ou desmente, e não uma observação indeterminada sobre o mesmo assunto. |
| `explica` | ponto histórico → observações de que ele trata |

### 7. Leitura do repositório

A "Leitura do repositório" mostra como as evidências se combinam neste repositório: qual cadeia sustenta
a arquitetura (ex.: dependência → configuração → código → relação), que sinais enganam e o que
fica ambíguo. As observações são citadas por `#n`. O texto é escrito para quem não vai abrir as revisões anteriores.

### 8. Resumo

```
Observações: N. Dimensões (tecnologia: a, configuração: b, código: c, estrutura: d, composição: e, build-deploy: f, documentação: g, histórico: h). Força (forte: s, moderada: m, fraca: w, ambígua: u). Evidência (tecnológica: t, arquitetural: r, contexto: x).
```

Os valores da 3.4 não são alterados: a 3.5 classifica o que está lá.

## Verificações de consistência

Antes de considerar um arquivo concluído, confere-se que:

- o front matter segue o passo 1;
- toda linha das revisões da 3.4 virou uma observação, e só as configurações do passo 2 foram acrescentadas;
- cada bloco tem Observação sem julgamento e Interpretação separada;
- a força segue os critérios do passo 5, e toda força fora da orientação tem Nota;
- toda referência `#n` existe no arquivo, e os blocos e a tabela têm os mesmos números;
- o "Resumo" confere com a tabela.

## O que vem do protocolo e o que é convenção deste estudo

**Vem do protocolo (seção 3.5):**
- os campos de cada observação;
- a separação entre observação e interpretação;
- a distinção entre evidência tecnológica e arquitetural;
- as 8 dimensões;
- os quatro níveis de força e suas definições.

**É convenção operacional deste estudo, para que a extração seja repetível:**
- derivar as observações das linhas da 3.4;
- a regra de seleção da configuração;
- o valor `contexto`;
- a ordem das observações;
- a tabela de orientação da força;
- o vocabulário e a direção das relações, sem inversas;
- o formato do Resumo.

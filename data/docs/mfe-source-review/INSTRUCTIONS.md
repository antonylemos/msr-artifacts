# Método: revisão de código-fonte

Este documento descreve como foi feita a revisão de código-fonte e como ler os arquivos
`NNN-<owner>__<name>.md` desta pasta. Cada arquivo registra a revisão de um repositório do corpus,
e os passos abaixo seguem a ordem da revisão: ler os arquivos do snapshot vem antes de qualquer julgamento.

## Objetivo

Seção 3.4.4 do protocolo (*Source code mining*): inspecionar o código-fonte em busca de
construções que mostram **como as unidades frontend interagem**. O objetivo não é registrar
que uma tecnologia está presente, mas como a construção contribui para a arquitetura.
A mineração já localizou, linha a linha, as ocorrências dos padrões `src-*`. Esta etapa lê cada
uma, decide se ela participa da composição e procura as construções que a mineração não pegou.

Esta etapa não registra a relação completa entre unidades (direção, participantes): isso é a
seção 3.4.5 do protocolo, tratada na revisão de relações de composição. Ela não reclassifica o
repositório e não altera os arquivos de `../mfe-classification/`.

## Fontes consultadas (somente leitura)

| O quê | Caminho |
|---|---|
| Lista de repositórios | `data/acquisitions/mfe-corpus-001/acquisition.csv` |
| Ocorrências | `data/mining/mfe-mining-001/repos/<owner>__<name>/matches.csv` (linhas com `pattern` começando por `src-`) |
| Padrões e expressões regulares | `data/mining/mfe-mining-001/manifest.json` (`config.patterns`) |
| Versão e hash da mineração | `data/mining/mfe-mining-001/manifest.json` (`version`, `configSha256`) |
| Unidades | `docs/mfe-structure-review/NNN-<owner>__<name>.md` (tabela "Unidades") |
| Arquivos do snapshot | `data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files/` |
| Classificação (id, commit, contexto) | `docs/mfe-classification/NNN-<owner>__<name>.md` |

Todo `artefato:linha` é relativo a `files/` do snapshot. A revisão nunca usa o clone em `data/samples/`.

A revisão não modifica nada em `data/` e não reexecuta `mine` nem `inspect-dependencies`.

## Produto

Um arquivo `docs/mfe-source-review/NNN-<owner>__<name>.md` por repositório, com o **mesmo nome**
do arquivo de classificação. O exemplo completo é `008-mrmechazilla__host-app.md`.

Cada arquivo tem esta estrutura:

1. Front matter com os campos descritos no passo 1.
2. Título `# NNN — <owner>/<name>`.
3. Seção "Construções da mineração": uma tabela com as colunas `Padrão`, `Arquivo:linha`, `Unidade`,
   `Categoria`, `Composição` e `Observação`.
4. Seção "Construções fora da mineração": uma tabela com as mesmas colunas.
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

### 2. Cópia das linhas do `matches.csv`

Na tabela "Construções da mineração", há uma linha para cada linha do `matches.csv` cujo `pattern`
começa com `src-`, **na mesma ordem**, sem juntar nem omitir linhas:

| Coluna da tabela | Coluna do CSV |
|---|---|
| Padrão | `pattern` |
| Arquivo:linha | `path` + `:` + `line` (só `path` se `line` estiver vazia) |

Os valores não são corrigidos nem normalizados. Sem nenhuma linha `src-`, a tabela é substituída pela frase
"Nenhuma ocorrência src-* no matches.csv."

### 3. Leitura de cada linha

Para cada linha, o arquivo é aberto na linha indicada e o bloco ou a função em volta é lido.

**Unidade.** A aplicação a que o arquivo pertence. Parte-se do arquivo e sobe-se pelos diretórios:
a unidade é o primeiro diretório da tabela "Unidades" da revisão estrutural que contém o arquivo
e **não** foi julgado `No` (ou seja, `Yes` ou `Undetermined`). Os segmentos de caminho são comparados
por inteiro (`app` não contém `app-2/x`; `.` contém todos). Se todos os diretórios que contêm o arquivo forem
`No`, ou não houver nenhum, a unidade é `—`.

| Arquivo | Diretórios que o contêm, do mais fundo para cima | Unidade |
|---|---|---|
| `src/main.ts` | `src` (No) → `.` (Yes) | `.` |
| `projects/cart/src/main.ts` | `projects/cart` (Undetermined) → `.` (No) | `projects/cart` |
| `projects/shared-lib/src/x.ts` | `projects/shared-lib` (No) → `.` (No) | `—` |

`No` é pulado porque não é uma aplicação: ou o arquivo pertence à aplicação acima dele (como o
`src/` de um projeto Angular), ou não pertence a nenhuma (biblioteca, servidor). `Undetermined`
não é pulado: é um diretório de aplicação com entrada ou build problemáticos.

**Categoria.** Uma categoria é escolhida pela ação da construção:

| Categoria | Quando |
|---|---|
| `dynamic-loading` | `import()` dinâmico que carrega um módulo em runtime (ex.: `import('remote/App')`, `import('./bootstrap')`, `React.lazy`, `defineAsyncComponent`). |
| `script-loading` | Carga do bundle de outra unidade por script, estático ou injetado (ex.: `<script src="https://...">`, `createElement('script')`, URL de bundle `iife`/`umd` passada para quem o carrega). |
| `remote-resolution` | Resolução de um módulo remoto por nome, manifesto ou URL de entrada (ex.: `loadRemoteModule`, `loadRemote`, `loadManifest`, `initFederation`, `registerRemotes`). |
| `custom-element` | Definição de custom element para consumo (`customElements.define`, `extends HTMLElement`, `createCustomElement`, `attachShadow`) ou consumo dele (tag em HTML ou JSX). |
| `runtime-composition` | Montagem, desmontagem ou registro de aplicações em runtime (`mount`/`unmount`, `registerApplication`, `registerMicroApps`, lifecycles do single-spa ou do qiankun). |
| `host-relationship` | Declaração no código de quais aplicações o host usa e onde (tabela de rotas ou registro de aplicações que nomeia as unidades), quando a linha é a declaração e não a chamada de carregamento. |
| `embedding` | Embutimento de outra unidade numa página (`<iframe>`, `createElement('iframe')`). |
| `communication` | Mecanismo de comunicação entre unidades, onde é definido ou disparado (`CustomEvent`/`dispatchEvent`, `postMessage`, `BroadcastChannel`, evento `storage`, serviço ou barramento reativo compartilhado). |
| `other` | Outro mecanismo de composição que não cabe nas categorias acima; a Observação o explica. |
| `none` | A linha não é uma construção de composição: falso positivo do padrão (ex.: `dispatchEvent` de um evento interno, `mount` de uma biblioteca de testes). |

Uma linha de `import { x } from '<pacote>'` recebe a categoria do uso que ela habilita.

**Composição.** A decisão segue estas regras, nesta ordem:

| Resposta | Quando |
|---|---|
| `No` | A construção está inativa (comentada, em arquivo que nenhum outro importa ou que nenhum build usa), é interna à própria unidade (ex.: `import('./bootstrap')`, `import()` de um arquivo local) ou a categoria é `none`. |
| `Yes` | A construção está ativa e carrega, resolve, monta, registra, define para consumo ou se comunica com **outra** unidade, do snapshot ou externa (remote em outra URL). |
| `Undetermined` | Não dá para confirmar se a construção está ativa, ou qual unidade é o alvo. |

Para confirmar que a construção está ativa, segue-se a cadeia até um ponto de entrada da unidade
(ex.: `main.ts` → `bootstrap.ts` → `app.config.ts` → `app.routes.ts`). Uma linha de `import`
de pacote é `Yes` quando o uso que ela habilita é `Yes`, e `No` quando ele é `No`.

**Observação.** A coluna registra o que a construção faz, a unidade alvo quando houver e a evidência
(`artefato:linha`) que sustenta a resposta. Para `No`, explica o motivo (ex.: "arquivo inteiro
comentado, `/*` na linha 1 e `*/` na linha 28"). Na dúvida entre `Yes` e `Undetermined`, a resposta é
`Undetermined`, com a explicação em "Notas".

### 4. Busca de construções fora da mineração

Os padrões `src-*` são avaliados linha a linha e perdem construções em várias linhas, consumo de
custom elements e carregamentos com outras APIs. Por isso, os arquivos de código de cada unidade
são pesquisados (ignorando lockfiles, `node_modules`, testes e arquivos gerados), por exemplo com:

```sh
grep -rnE "import\(|React\.lazy|defineAsyncComponent|loadRemote|loadRemoteModule|loadManifest|initFederation|registerRemotes|System\.import|importShim|customElements|registerApplication|registerMicroApps|<iframe|postMessage|CustomEvent|BroadcastChannel|createElement\(['\"]script" data/acquisitions/mfe-corpus-001/corpus/<owner>__<name>/files
```

Para cada custom element definido, procura-se também o uso da tag (ex.: `<hello-app>`) em HTML,
JSX e templates.

Cada construção encontrada que **não** está no `matches.csv` vira uma linha da tabela
"Construções fora da mineração", com Padrão = `manual` e as mesmas regras do passo 3, **somente**
se for de um destes tipos:

| Vira linha manual | Exemplo |
|---|---|
| Chamada de carregamento, resolução, montagem ou registro que o padrão não pegou (em várias linhas, outra API) | `loadRemote(` com argumentos na linha seguinte; `start()` do qiankun |
| `import()`, `React.lazy` ou `defineAsyncComponent` de um módulo de outra unidade | `React.lazy(() => import('shop/ShopRoutes'))` |
| Renderização ou montagem do componente de outra unidade no host | `<MusicLibrary />` importado do remote; `mount(ref.current)` de um remote |
| Uso da tag de um custom element de outra unidade | `<hello-app>` no HTML do shell |
| Declaração no host de quais aplicações ele usa e onde (tabela de rotas, registro de aplicações) | `Routes` que nomeia os remotes; `APP_CONFIGS` |
| Mecanismo explícito de comunicação entre unidades: uma linha onde o mecanismo é definido ou disparado | `dispatchEvent(new CustomEvent(...))`, `postMessage`, `BroadcastChannel`, serviço ou barramento compartilhado entre unidades |

**Não** viram linha (quando for útil, entram na Observação da linha de carregamento ou montagem correspondente):
- callbacks e props passados a um remote ou recebidos dele (ex.: `onNavigate`, `onSignIn`, `isAdmin`) e leitura de atributos;
- linha de `import` sem chamada: a chamada é que vira linha, e o import vai na Observação dela (ex.: `loadRemote` importado num `import { ... }` de várias linhas);
- `export` comum do componente ou das rotas expostas (a exposição já está na configuração de build);
- cada ponto de uso de um mecanismo de comunicação já registrado (assinatura, envio, `removeEventListener`);
- passos seguintes de uma mesma construção: uma construção em vários passos (extrair, reatribuir, acrescentar) vira **uma** linha, no primeiro passo, e os demais vão na Observação.

Sem nenhuma construção adicional, a tabela é substituída pela frase: "Nenhuma construção adicional."

### 5. Resumo

A seção "Resumo" traz exatamente a frase: "Construções com composição: N (categoria: n, ...)." com N
igual ao número de linhas `Yes` das duas tabelas e as categorias na ordem em que aparecem.
Com zero: "Construções com composição: 0."

O resumo conta linhas anotadas com `Yes`, não mecanismos únicos de composição. Na tabela da
mineração, cada ocorrência é preservada e contada, inclusive quando padrões diferentes apontam para
a mesma linha ou quando import e chamada pertencem ao mesmo mecanismo. Na tabela manual,
os critérios do passo 4 evitam linhas acrescentadas por evidências ou etapas repetidas.

### 6. Notas e revisão conjunta

- **Notas** (opcional): falsos positivos recorrentes, construções que a mineração perdeu, unidades alvo fora do snapshot, divergência com a classificação.
- **Ponto para revisão conjunta**: obrigatório se `status: review`.

Quando algo contradiz a classificação do repositório, a revisão não propõe mudá-la; a contradição
é registrada em "Notas".

## Verificações de consistência

Antes de considerar um arquivo concluído, confere-se que:

- o nome do arquivo é igual ao da classificação;
- `commit` é igual ao da classificação e ao do `acquisition.csv`;
- `version` e `config_sha256` são os do `manifest.json` da mineração;
- o número de linhas da primeira tabela é igual ao de linhas `src-*` do `matches.csv` (ou a frase fixa está presente), e as duas colunas copiadas são idênticas;
- toda `Unidade` é um diretório `Yes` ou `Undetermined` da revisão estrutural do repositório, ou `—`;
- toda linha tem `Categoria` e `Composição` do vocabulário e uma observação com evidência;
- as linhas da segunda tabela não repetem ocorrências do `matches.csv`, são todas de um tipo da lista do passo 4 e nenhuma é callback, prop, export comum, ponto de uso de um mecanismo já registrado ou passo seguinte de outra linha (ou a frase fixa está presente);
- o "Resumo" conta exatamente as linhas `Yes` das duas tabelas;
- toda citação foi aberta no snapshot, e a linha citada contém o que foi descrito;
- o arquivo não contém comentários ou marcações de preenchimento;
- `status` é `draft` ou o valor definido pelo pesquisador.

## Quando a mineração mudar

Se `mine` for executado com outro catálogo (nova `version`, novo `config_sha256`), os arquivos
desta pasta continuam válidos só para a versão registrada no front matter. Os repositórios cujo
`matches.csv` mudou precisam ser revisados de novo, com o bloco `mining` atualizado.

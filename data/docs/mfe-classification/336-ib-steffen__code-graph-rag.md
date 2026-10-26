---
schema: 1
id: 1204064013
full_name: ib-steffen/code-graph-rag
url: https://github.com/ib-steffen/code-graph-rag
commit: 017443a481852a363d4ed6fd1fb0c70425236f67
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 336 — ib-steffen/code-graph-rag

## Contexto

Ferramenta Python (“Code-Graph-RAG”) que constrói um grafo de conhecimento de bases de código e o consulta com LLMs. É distribuída como pacote (`pyproject.toml:1–12`) e CLI `cgr`. O README e o histórico pertencem ao projeto `vitali87/code-graph-rag`: os badges do README apontam para esse repositório (`README.md:8–12`), e os commits são do autor original e de colaboradores. O repositório do titular foi criado em 2026-04-07, depois do último commit alcançável. Não há frontend: o termo da busca resulta da justaposição de “/path/to/frontend \” e “--orchestrator” em linhas consecutivas de um exemplo de linha de comando. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:337` registra rank 336, ID 1204064013, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:337` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:27965` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:27971` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2026-Q2` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2026-04-01..2026-06-30` | 2026-10-07T23:44:19.637Z / 2026-10-08T16:24:59.268Z |

Metadados do hit (iguais nas duas rodadas): descrição “Code Graph RAG”, sem tópicos, linguagem Python, licença MIT, `fork: false`, tamanho 62990, criação em 2026-04-07T16:51:37Z, push em 2026-04-07T16:55:54Z.

**Grafia:** o README do SHA não contém a frase “frontend orchestration”.
- A sequência mais próxima é `README.md:473` (“--repo-path /path/to/frontend \”) seguida de `README.md:474` (“--orchestrator google:gemini-2.0-flash-thinking-exp-01-21”): “frontend” e “orchestrator” ficam adjacentes depois de barra invertida e quebra de linha.
- Casar “orchestrator” com “orchestration” dependeria de normalização morfológica da busca do GitHub, que não está registrada.

Não se afirma qual trecho a API casou, porque ela não informa linha. As demais ocorrências de “orchestrator” referem-se ao modelo LLM principal (`README.md:163–207`, `:531`, `:653–662`).

A última alteração do README é `c19d06f` (2026-03-24), e o SHA (2026-03-24T13:24:10Z) é um commit de versão do bot. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 483 entradas, sendo 480 arquivos regulares `100644` e 3 executáveis `100755` (scripts de shell); zero symlinks e zero gitlinks (`.gitmodules` existe, mas vazio). `codebase_rag/` (359 arquivos Python), `docs/` (MkDocs), `benchmarks/`, `optimize/`, `codec/`, `cgr/`, `scripts/`, workflows. | contrária |
| Configuração | `pyproject.toml:1–12`: pacote `code-graph-rag` 0.0.166, “The ultimate RAG for your monorepo…”, Python ≥ 3.12, ambiente “Console”. `mkdocs.yml` e `docs/overrides/main.html`: site de documentação, não aplicação. | contrária |
| Código-fonte | Não há arquivos `.ts`, `.tsx`, `.js`, `.jsx` ou `.vue` no inventário; o único `.html` é `docs/overrides/main.html` (template do MkDocs). | contrária |
| Documentação | `README.md:470–479`: exemplos de `cgr optimize javascript --repo-path /path/to/frontend`, em que “frontend” é um caminho de exemplo de repositório a analisar. | contexto |
| Tecnologia / Composição (busca) | `git grep -i` nos Markdown do SHA por `micro.?front` e `federation`: nenhuma ocorrência. | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 1.652 commits alcançáveis a partir do SHA (1.659 em todos os refs), 245 merges. Os principais autores são `vitali87`/`Vitali Avagyan <eheva87@gmail.com>` (1.123 + 235), `github-actions[bot]` (142) e `dependabot[bot]` (30), além de colaboradores. A raiz é `9044d16` (2025-06-16), e o SHA é de 2026-03-24, anterior à criação do repositório do titular (2026-04-07). Não há commit do titular. Os branches `dependabot/…` (com commits de 2026-04-07) não foram considerados. Isso indica uma cópia ou importação do projeto original com `fork: false`; o mecanismo não é afirmado. `git rev-list --objects $SHA --missing=print` lista 4.533 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend: ferramenta Python de linha de comando (`pyproject.toml:1–12`; inventário sem código de UI). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; “orchestrator” é o modelo LLM principal da ferramenta (`README.md:653–662`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Não há menção a micro-frontends: o hit vem de tokens próximos num exemplo de CLI (`README.md:473–474`), como os falsos positivos lexicais de 279, 312 e 320 (rascunhos).
- A redistribuição de código de terceiros (074/080/102/122) não altera a classe, já que nenhuma alternativa leva a MFE.
- `repo_type: library` (pacote e CLI), `frontend_units: 0`, `unit_organization: none`, arrays de tecnologia vazios. O site MkDocs de documentação não foi contado como unidade, por ser gerado de Markdown por ferramenta Python sem frontend autoral (diferente do portal Rspress de 248).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos) / Protocolo (busca):** a consulta `"frontend orchestration"` casou um README sem a frase, provavelmente por tokens próximos (“/path/to/frontend \” / “--orchestrator”) e normalização “orchestrator” → “orchestration”. É o quarto caso de ruído da consulta ampla nesta série (279, 312, 320).
- **Protocolo (famílias/duplicatas):** há várias cópias do mesmo projeto nas rodadas (por exemplo, `yulongwanxue/code-graph-rag`, `Lazur/code-graph-rag`, `mr-teslaa/code-graph-rag` e `anasdeyra/code-graph-rag`; `data/discovery/mfe-round-002/candidates.csv:27715`, `:29009`, `:29419`, `:31376`). Uma deduplicação por histórico idêntico reduziria a revisão manual.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).

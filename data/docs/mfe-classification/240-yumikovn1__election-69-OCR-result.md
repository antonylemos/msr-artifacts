---
schema: 1
id: 1173586650
full_name: yumikovn1/election-69-OCR-result
url: https://github.com/yumikovn1/election-69-OCR-result
commit: ed014fd0e1c36fe5da5fe064260a942e2cb070ea
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 240 — yumikovn1/election-69-OCR-result

## Contexto

Conjunto de dados abertos: resultados oficiais da eleição tailandesa de 2026, extraídos por OCR dos PDFs da Comissão Eleitoral e estruturados em JSON (`README.md:1–5`). O conteúdo é quase todo de dados (`data/matched/`, `data/ocr-output/`, `data/csv/`), mais um README extenso e uma imagem. Não há código nem aplicação frontend. A única ligação com o tema é o tópico `microfrontends` nos metadados do repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:241` registra rank 240, ID 1173586650, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:241` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:25906` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:25913` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta / consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontends`: `topic:microfrontends` | `terminology-topic-microfrontends` / `topic:microfrontends pushed:>=2025-04-01` | 2026-10-07T18:18:43.496Z / 2026-10-08T15:34:28.993Z |

Metadados do hit:
- descrição “Provide structured, machine-readable JSON of the official 2026 Thai election results extracted via OCR from Election Commission PDFs.”;
- tópicos `microfrontends`, `continuous-delivery`, `ocr`, `open-data`, `election-data` e outros;
- linguagem nula, `fork: false`, tamanho 2.650;
- criação em 2026-03-05T14:31:21Z;
- push em 2026-10-06T06:03:02Z na rodada 001 e 2026-10-08T14:45:34Z na rodada 002.

O README não contém “micro”, “frontend” nem “federation”. A entrada se deve apenas ao tópico declarado no GitHub.

O SHA `ed014fd` (2026-10-12, “Update README.md”) é posterior às duas coletas e só altera o README. A versão anterior do README é `c0eb8bc` (2026-03-07). Como a entrada veio do tópico, e não do texto do README, a alteração não afeta a proveniência.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1.599 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há 1.590 arquivos JSON em `data/matched/` e `data/ocr-output/`, 3 CSV em `data/csv/`, um ZIP, um marcador `REMOVED_WRONG_PDF`, `assets/ect-announcement.jpeg`, `README.md`, `.gitignore` e um `.DS_Store`. Não há código, manifesto nem configuração. | contrária |
| Documentação | `README.md:1–25`: descrição do conjunto de dados, aviso de isenção em inglês e tailandês e problemas de qualidade dos PDFs de origem. | contrária |
| Metadados | Tópico `microfrontends` sem correspondência no conteúdo; outros tópicos (`continuous-delivery`, `geospatial`, `shapefile`) também não têm artefato correspondente. | fraca |
| Busca | `git grep -i` em `README.md` por `micro`, `federation` e `frontend`: nenhuma ocorrência. | ausente |

## Autoria e histórico

Clone não raso; 29 commits lineares, nenhum merge. São 26 de Chanon Ngerntongdee `<killernay@gmail.com>` e 3 de yumikovn1, de 2026-02-21 (`60f0c97`, “first commit”) a 2026-10-12 (SHA `ed014fd`). Os commits de dados e README são anteriores à criação do repositório no GitHub (2026-03-05), o que indica que o histórico foi enviado depois. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o repositório só tem dados. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; o termo só aparece como tópico. |
| Q5 | No | Q1–Q4 são No: repositório de dados abertos com tópico não relacionado. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”, aqui apenas pelo tópico.
- Repositório sem implementação, como os perfis 011/064/068/073/077/101/111: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** tópico `microfrontends` aplicado a um conjunto de dados abertos sem código; a consulta de tópico capta rótulos sem relação com o conteúdo.
- **Protocolo (snapshot):** o SHA de `clones.csv` é posterior às coletas, mas só muda o README, que não foi a origem do acerto.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).

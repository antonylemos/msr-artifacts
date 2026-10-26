---
schema: 1
id: 906200654
full_name: fr0ster/simplest_sap_rap_example
url: https://github.com/fr0ster/simplest_sap_rap_example
commit: 3c01bceea3f32af02d674fce13152def85bb19ed
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

# 186 — fr0ster/simplest_sap_rap_example

## Contexto

Guia em Markdown para construir uma aplicação SAP RAP (ABAP RESTful Application Programming) em iterações (`README.md:1–12`). As pastas `1st_iteration/` a `10th_iteration/` contêm notas e trechos de CDS, behavior definitions e serviços, além de capturas de tela e um XML de serviço. Não há aplicação frontend. “Micro Frontend” só aparece no título de um tutorial externo listado no README (“Luigi Micro Frontend Framework”, `README.md:196`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:187` registra rank 186, ID 906200654, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:187` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:11207` e `data/discovery/mfe-round-002/candidates.csv:11213`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2024-12` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:19:53.790Z / 2026-10-08T15:53:34.234Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:51:03.894Z / 2026-10-08T16:05:10.484Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2024-12-01..2024-12-31`.

Metadados do hit:
- descrição “The simplest SAP RAP example”, sem os termos;
- sem tópicos, linguagem nula, `fork: false`, tamanho 4.025;
- criação em 2024-12-20T11:26:46Z, push em 2025-05-08T12:53:42Z.

O acerto vem de `README.md:196`, “Create an Application with the Luigi Micro Frontend Framework”, título de tutorial da SAP listado como link e única ocorrência. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `3c01bce` (2025-05-08), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 93 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São notas `.md` por iteração, imagens PNG, `10th_iteration/ZE2E100_SOL_2_SRV.xml`, `LICENSE`, `README.md` e um `.code-workspace`. Não há `package.json`, HTML de entrada, código JavaScript/TypeScript nem configuração de bundler. | contrária |
| Documentação | `README.md:1–12`: guia iterativo de SAP RAP. `README.md:141`, `196`: links para tutoriais SAP, entre eles “Luigi Micro Frontend Framework”. É referência externa, não implementação. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA por `micro.?front`: só `README.md:196`. Nenhum mecanismo de composição. | ausente |

## Autoria e histórico

Clone não raso; 126 commits, 2 merges, todos de Oleksii Kyslytsia, com três e-mails: `oleksij.kyslytsja@gmail.com` (115), `oleksii_kyslytsia@epam.com` (10) e `oleksii_kyslytsai@epam.com` (1). Vão de 2024-12-20 (`14d5d40`, “Initial commit”) a 2025-05-08 (SHA). Os commits recentes acrescentam links de tutoriais ao README. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`): as consultas por caminho de `2nd_iteration`, `4th_iteration`, `5th_iteration` e `10th_iteration` retornam erros de objetos promisor indisponíveis com `GIT_NO_LAZY_FETCH=1`; o histórico local confirma o autor único, mas não se atesta a completude do `name-status` dessas pastas. O SHA avaliado é integral (93 blobs disponíveis).

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é documentação e artefatos de SAP RAP. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; “Micro Frontend” é título de tutorial externo (`README.md:196`). |
| Q5 | No | Q1–Q4 são No: guia de desenvolvimento SAP RAP com link para tutorial de micro-frontends. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- É conteúdo didático, como em 023, e não tem unidade frontend, como os perfis 011/064/068/073/077/101/111. Daí `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** um link para tutorial externo (“Luigi Micro Frontend Framework”) numa lista de recursos basta para a consulta terminológica.
- **Protocolo (busca):** o hit plural `"micro frontends"` não tem grafia literal. Elegibilidade `pass` nas duas rodadas.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No; sem decisão aberta (`draft`). O SHA contém documentação e exemplos SAP RAP, sem unidades frontend nem configuração de composição, e o sinal de descoberta vem de um título externo listado no README (`README.md:196`). Divergência de campo não resolvida pelo checklist: `repo_type: other` é defensável se o rótulo classifica o artefato entregue (guia documental sem aplicação frontend observável), enquanto `example` seria mais preciso se classificar o propósito didático (o README descreve um processo iterativo para construir uma aplicação); o template aceita ambos (`_template.md:12`) sem regra explícita para guias de exemplo não executáveis. Mantido `other`, e o limite entre os dois entra na harmonização pendente de `repo_type`. A auditoria do histórico por caminho está limitada pelo clone parcial.

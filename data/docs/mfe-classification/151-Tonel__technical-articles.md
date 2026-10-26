---
schema: 1
id: 429000637
full_name: Tonel/technical-articles
url: https://github.com/Tonel/technical-articles
commit: e9ca1be4e8bd82ead194db60fd05add5d4ef5e64
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

# 151 — Tonel/technical-articles

## Contexto

Portfólio pessoal de um redator técnico: um único `README.md` de 1.185 linhas com links para artigos publicados em blogs de terceiros, agrupados por veículo (`README.md:1–2`). Dois desses links tratam de micro-frontends (`README.md:1120–1121`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:152` registra rank 151, ID 429000637, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:152` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:3278` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:3280` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2021-11` | 2026-10-07T22:16:52.775Z / 2026-10-08T15:52:11.066Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2021-11` | 2026-10-07T22:47:02.757Z / 2026-10-08T16:03:54.572Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2021-11-01..2021-11-30`.

Metadados do hit:
- descrição “All my technical articles”, sem tópicos, linguagem nula, `fork: false`, tamanho 1.268;
- criação em 2021-11-17T10:26:30Z, push em 2026-10-04T13:19:47Z.

Sem as grafias na descrição, a hipótese mais provável por eliminação é que o acerto venha do README, cujos trechos no SHA são (hipótese não confirmada, pois o README do SHA é posterior às buscas):
- “Micro Frontend”: `README.md:1120` (“…Adopt a Micro Frontend Architecture”);
- “Micro Frontends”: `README.md:1121` (“5 Pitfalls of Using Micro Frontends…”).

**README do SHA posterior às buscas.** O SHA `e9ca1be` (2026-10-11T14:56:53+02:00, autor e committer) altera o README depois das coletas de 7 e 8 de outubro de 2026. O `pushed_at` do hit (2026-10-04) corresponde ao commit anterior `ade7166` (2026-10-04T15:19:47+02:00), versão vigente nas buscas. Essa versão não pôde ser lida: o blob `440873d7…` falta no clone parcial e não foi buscado. Não se verificou se as linhas 1120–1121 já estavam nela. A presença das duas grafias no SHA é compatível com os hits, e a classificação não depende disso.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md` (`100644`); zero symlinks e zero gitlinks. Não há código, manifesto ou configuração. | contrária |
| Documentação | `README.md:1–2`: “Technical Articles by Antonello Zanini”. O restante é uma lista de links externos por veículo. `README.md:1120–1121`: dois artigos sobre micro-frontends no SitePoint. Não há texto próprio sobre arquitetura nem implementação. | fraca |
| Tecnologia / Configuração / Composição (busca) | Com o inventário reduzido ao README, `grep -i` por `micro.?front`, `federation` e `single-spa` só acha `README.md:1120–1121`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 633 commits, nenhum merge, todos de Antonello Zanini `<66549111+Tonel@users.noreply.github.com>`, de 2021-11-17 (`db239ef`, “Create index.md”) a 2026-10-11 (SHA). São quase todos “Update README.md” feitos pela interface web (committer GitHub). O histórico é a atualização contínua de uma lista de publicações. Nenhum blob histórico foi lido; o blob da versão `ade7166` falta, como descrito acima.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só o README. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; os termos só aparecem em títulos de artigos externos (`README.md:1120–1121`). |
| Q5 | No | Q1–Q4 são No: lista de links para artigos. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- É conteúdo, como 023, e repositório sem implementação, como os perfis 011/064/068/073/077/101/111, por isso `frontend_units: 0` e `unit_organization: none`.
- `repo_type: other`: portfólio de artigos, sem aplicação, exemplo, template ou biblioteca.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** títulos de artigos em uma lista de portfólio bastam para as consultas terminológicas de frase exata. Também passam no filtro `pushed:>=2025-04-01`, porque a lista é atualizada com frequência.
- **Protocolo (snapshot):** o commit clonado (2026-10-11) é posterior às coletas, e a versão buscada (`ade7166`) não está legível no clone parcial. Isso não afeta a classificação, mas o README do snapshot não é exatamente o indexado na busca.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância com Non-MFE e Q1–Q5 No (o snapshot é só um README-portfólio com links externos, sem unidade, fonte executável, configuração nem composição). Correção adotada: o README do SHA é posterior às coletas, então os títulos em `README.md:1120–1121` provam que as grafias estão no snapshot, mas não que estavam na versão indexada pelo GitHub nas buscas; o blob anterior não está no clone. A origem do acerto fica como hipótese por eliminação de nome e descrição, sem efeito na classe.

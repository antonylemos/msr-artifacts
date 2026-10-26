---
schema: 1
id: 400136693
full_name: aregee/aregee
url: https://github.com/aregee/aregee
commit: 9f2a1a6d464df104958182b150a33aaa7110a936
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

# 188 — aregee/aregee

## Contexto

Repositório de perfil pessoal: só um `README.md` de 46 linhas com apresentação profissional (“Hi, I'm Rahul”, `README.md:1–8`) e uma lista de publicações e palestras. Três itens tratam de micro-frontends: um artigo, a revisão técnica de um livro e uma palestra (`README.md:38`, `40`, `43`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:189` registra rank 188, ID 400136693, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:189` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:2827` e `data/discovery/mfe-round-002/candidates.csv:2829`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2021-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:20:45.235Z / 2026-10-08T15:35:47.813Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:05:14.727Z / 2026-10-08T15:45:24.541Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:16:38.658Z / 2026-10-08T15:52:04.331Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:46:42.926Z / 2026-10-08T16:03:49.073Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2021-08-01..2021-08-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 13;
- criação em 2021-08-26T10:58:11Z, push em 2026-08-17T22:08:35Z.

Grafias no README:
- “Micro Frontends”: `README.md:38` (título do artigo “Breaking Down the Last Monolith: Micro Frontends”);
- “MicroFrontends”: `README.md:40` (“The Art of MicroFrontends”);
- “micro-frontend”: `README.md:43` (“micro-frontend runtime and migration (JSFoo)”).

A forma singular unida “microfrontend” só aparece como parte de “MicroFrontends”; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `9f2a1a6` (2026-08-18), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md` (`100644`); zero symlinks e zero gitlinks. Não há código, manifesto ou configuração. | contrária |
| Documentação | `README.md:1–8`: apresentação profissional. `README.md:38–43`: publicações e palestras sobre micro-frontends, com links externos. É histórico do autor, sem implementação no repositório. | fraca |
| Tecnologia / Configuração / Composição (busca) | Com o inventário reduzido ao README, `grep -i` por `micro.?front`, `federation` e `single.?spa` só acha `README.md:38`, `40` e `43`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 7 commits, nenhum merge, todos de Rahul Gaur `<rahul.nbg@gmail.com>` pela interface web (committer GitHub), de 2021-08-26 (`c5625ed`, “Initial commit”) a 2026-08-18 (SHA, “update profile”). Todos alteram só o README. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só o README. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; os termos só aparecem em títulos de publicações e palestras (`README.md:38–43`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório sem implementação, como os perfis 011/064/068/073/077/101/111 (e os rascunhos 158/166/173/179/182): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de perfil com publicações sobre micro-frontends; casa as quatro consultas terminológicas.
- **Protocolo (busca):** elegibilidade `pass` nas duas rodadas, mantida por edições do perfil.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No e os campos do rascunho; sem decisão aberta (`draft`) e sem erro material nas citações. Ressalva de proveniência: a origem exata do hit `microfrontend` não pode ser atribuída com certeza ao processamento do GitHub com os dados locais.

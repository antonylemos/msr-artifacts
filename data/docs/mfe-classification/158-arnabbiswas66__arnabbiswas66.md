---
schema: 1
id: 1261312292
full_name: arnabbiswas66/arnabbiswas66
url: https://github.com/arnabbiswas66/arnabbiswas66
commit: 53253aa37fec95c10fe0160e31f4dcd48bf9d4c7
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

# 158 — arnabbiswas66/arnabbiswas66

## Contexto

Repositório de perfil pessoal: só um `README.md` de 230 linhas, de apresentação profissional, com cargo, competências e badges de tecnologia (`README.md:1–15`). Micro-frontends aparecem como competência listada (`README.md:67`) e como badge (`README.md:134`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:159` registra rank 158, ID 1261312292, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:159` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:31376` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:31384` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-06` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:38:09.942Z / 2026-10-08T16:00:33.998Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:07:40.889Z / 2026-10-08T16:09:45.214Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-06-01..2026-06-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 12;
- criação em 2026-06-06T14:16:43Z, push em 2026-06-06T14:18:48Z.

Sem descrição, o acerto vem do README:
- “Micro Frontends”: `README.md:67` (“- Microservices, Micro Frontends, API-first design …”);
- “Micro Frontend”: `README.md:134`, texto alternativo do badge `![Micro Frontend](…Micro_Frontend…)`.

A última alteração do README é o próprio SHA, `53253aa` (2026-06-06), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md` (`100644`); zero symlinks e zero gitlinks. Não há código, manifesto ou configuração. | contrária |
| Documentação | `README.md:1–15`: “Hi, I'm Arnab Biswas”, com cargo e contatos. `README.md:67`: competências. `README.md:134`: badge “Micro Frontend”. É apresentação pessoal, sem descrição de sistema implementado. | fraca |
| Tecnologia / Configuração / Composição (busca) | Com o inventário reduzido ao README, `grep -i` por `micro.?front`, `federation` e `single-spa` só acha `README.md:67` e `134`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 3 commits, nenhum merge, todos de Arnab Biswas `<arnabbiswas66@gmail.com>` pela interface web (committer GitHub), em 2026-06-06 entre 15:16 e 15:18 (+01:00): `8ca9685` (“Initial commit”), `bdb91fd` (“Revamp README.md with personal and project details”) e o SHA `53253aa` (“Update years of experience in README”). Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e há dois objetos promisor ausentes no histórico alcançável; o único blob da árvore atual foi lido, sem rede.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só o README. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; os termos só aparecem em lista de competências e badge (`README.md:67`, `134`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório sem implementação, como os perfis 011/064/068/073/077/101/111: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de apresentação pessoal com “Micro Frontends” entre as competências declaradas, o mesmo perfil dos finais citados.
- **Protocolo (busca):** as duas grafias buscadas estão literalmente no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No (perfil pessoal com menções de competência, sem frontend nem composição); sem decisão aberta. Correção adotada: a frase "não houve objeto ausente" foi substituída (dois objetos promisor ausentes, verificado). O README do commit avaliado e as evidências decisórias foram lidos.

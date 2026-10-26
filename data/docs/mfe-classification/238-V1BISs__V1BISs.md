---
schema: 1
id: 1209274755
full_name: V1BISs/V1BISs
url: https://github.com/V1BISs/V1BISs
commit: 8fd737a326e2cf01588d9d044d541d7382ff4d6a
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

# 238 — V1BISs/V1BISs

## Contexto

Repositório de perfil pessoal do GitHub: um único `README.md` (45 linhas) com apresentação profissional de engenheiro frontend, ícones de tecnologias, estatísticas e contatos. Micro-frontends e Module Federation aparecem como especialidade declarada: “Frontend Engineer · Micro-frontends · Performance” (`README.md:3`) e “I specialize in **micro-frontend architecture** (Webpack Module Federation)” (`README.md:14`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:239` registra rank 238, ID 1209274755, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:239` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:28287` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:28293` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-04` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:34:23.585Z / 2026-10-08T15:59:00.892Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:02:24.367Z / 2026-10-08T16:08:43.501Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:25:15.531Z / 2026-10-08T16:17:46.913Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 6;
- criação em 2026-04-13T09:05:26Z, push em 2026-04-27T16:40:44Z.

Grafias no README:
- “Micro-frontends”: `README.md:3`;
- “micro-frontend”: `README.md:14`;
- “Module Federation”: `README.md:14` (“Webpack Module Federation”).

A busca de frase trata o hífen como separador. A última alteração do README é o próprio SHA, `8fd737a` (2026-04-27), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md` (`100644`, 1.666 bytes); zero symlinks e zero gitlinks. Não há código, manifesto nem configuração. | contrária |
| Documentação | `README.md:3`, `12–16`: especialidade e práticas de trabalho declaradas. `README.md:28–30`: remete a um projeto fixado no perfil, fora deste repositório. | fraca |
| Busca | Com o inventário reduzido a um arquivo, a busca por `micro.?front`, `federation` e `single.?spa` acha só `README.md:3` e `14`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 4 commits lineares, nenhum merge, do titular (noreply) pela interface web, de 2026-04-13 (`2f249bc`, “Initial commit”) a 2026-04-27 (SHA `8fd737a`, “Update README.md”), todos edições do README. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só `README.md`. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; Module Federation só aparece como especialidade (`README.md:14`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório de perfil sem implementação, como os finais 011/064/068/073/077/101/111 e os rascunhos 158/166/173/179/182/188/195/198/219/233: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** especialidade em “micro-frontend architecture (Webpack Module Federation)” num README de perfil casa as consultas terminológicas e de tecnologia.
- **Protocolo (busca):** as grafias com hífen casam as consultas de frase. A elegibilidade muda de `unknown` (001) para `pass` (002).

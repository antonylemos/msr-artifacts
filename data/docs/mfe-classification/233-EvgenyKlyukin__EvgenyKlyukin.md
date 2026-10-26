---
schema: 1
id: 951812698
full_name: EvgenyKlyukin/EvgenyKlyukin
url: https://github.com/EvgenyKlyukin/EvgenyKlyukin
commit: 00e199a49c698a2b1ac9eede3fef5dfa542e7450
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

# 233 — EvgenyKlyukin/EvgenyKlyukin

## Contexto

Repositório de perfil pessoal do GitHub: um único `README.md` (103 linhas) com apresentação profissional de desenvolvedor fullstack focado em backend, IA e dados, badges de tecnologias e uma lista de experiências. Micro-frontends aparecem só como experiência declarada: “Contributed to an internal administration platform using a host application and a connected microfrontend.” (`README.md:94–95`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:234` registra rank 233, ID 951812698, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:234` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:12267` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:12272` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-03` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:27:14.489Z / 2026-10-08T15:37:23.336Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:07:04.273Z / 2026-10-08T15:46:56.927Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-03-01..2025-03-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 90;
- criação em 2025-03-20T09:31:53Z, push em 2026-09-26T20:35:29Z.

O acerto vem de `README.md:95`, “…a host application and a connected microfrontend.”, única ocorrência. O plural “microfrontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `00e199a` (2026-09-27), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md` (`100644`, 4.699 bytes); zero symlinks e zero gitlinks. Não há código, manifesto nem configuração. | contrária |
| Documentação | `README.md:1–14`: apresentação pessoal. `README.md:84–95`: experiências, entre elas a contribuição a uma plataforma com “host application and a connected microfrontend”. É experiência declarada em outro contexto, sem projeto neste repositório. | fraca |
| Busca | Com o inventário reduzido a um arquivo, a busca por `micro.?front`, `federation` e `single.?spa` acha só `README.md:95`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 43 commits lineares, nenhum merge, todos de Evgeny Klyukin `<key.klyukin@gmail.com>`, de 2025-03-20 (`189ea66`, “Initial commit”) a 2026-09-27 (SHA `00e199a`, “Update README.md”), quase todos edições do README; `6ce72a7` (2026-09-27, “docs: modernize profile README”) reescreveu o perfil. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só `README.md`. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; o micro-frontend citado é experiência profissional (`README.md:94–95`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório de perfil sem implementação, como os finais 011/064/068/073/077/101/111 e os rascunhos 158/166/173/179/182/188/195/198/219: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** experiência profissional com “host application and a connected microfrontend” num README de perfil.
- **Protocolo (busca):** o hit plural `microfrontends` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).

---
schema: 1
id: 289075385
full_name: nuwan94/nuwan94
url: https://github.com/nuwan94/nuwan94
commit: bcc657db5579a4c7e9599a8855a91a32e4d62422
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

# 285 — nuwan94/nuwan94

## Contexto

Repositório de perfil do GitHub: um único `README.md` com apresentação pessoal, links, lista de tecnologias e widgets de estatísticas. A menção a microfrontends é uma linha de interesse profissional: “Currently building modular **microfrontend** and **microservice** architectures” (`README.md:23`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:286` registra rank 285, ID 289075385, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede. Os dados de contato pessoal do README não são reproduzidos.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:286` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:1300` e `data/discovery/mfe-round-002/candidates.csv:1300`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2020-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:19:53.092Z / 2026-10-08T15:35:24.222Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:04:51.192Z / 2026-10-08T15:45:00.997Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2020-08-01..2020-08-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 6;
- criação em 2020-08-20T18:05:35Z, push em 2025-10-25T18:07:15Z.

A grafia “microfrontend” está em `README.md:23`. O plural não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA (2025-10-25), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 3.087 bytes); zero symlinks e zero gitlinks. | contrária |
| Documentação | `README.md:18–41`: apresentação profissional e lista de tecnologias. `README.md:23`: interesse declarado em arquiteturas de microfrontend, sem implementação. | fraca |

## Autoria e histórico

Clone não raso; 5 commits lineares, nenhum merge, todos editados na interface do GitHub (committer `GitHub`), de 2020-08-20 (`e91b7fb`, “Initial commit”) a 2025-10-25 (SHA `bcc657d`, “Update README.md”). Os autores são “Nuwan Sameera Alawatta” (3) e “Nuwan Alawatta” (2). Só há o branch `master`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só um README. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; só a menção em `README.md:23`. |
| Q5 | No | Q1–Q4 são No: repositório de perfil. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo enquadramento dos finais de perfil 011/064/068/073/077/101/111.
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** menção de interesse profissional num README de perfil casa as consultas terminológicas.
- **Protocolo (busca):** o hit plural não tem grafia literal. Elegibilidade `pass` nas duas rodadas.

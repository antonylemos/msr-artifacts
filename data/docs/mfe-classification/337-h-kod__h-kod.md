---
schema: 1
id: 1342216834
full_name: h-kod/h-kod
url: https://github.com/h-kod/h-kod
commit: b9ca40378679213183615d2d28cbd7be59bb294e
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

# 337 — h-kod/h-kod

## Contexto

Repositório de perfil do GitHub (descrição “Hüseyin — GitHub profil sayfası”): um único `README.md` com apresentação profissional e links. Micro-frontends aparecem só como área de atuação: “🧩 **Frontend Architecture · Micro Frontends · Design Systems**” (`README.md:6`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:338` registra rank 337, ID 1342216834, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:338` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35828` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:35833` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:41:05.284Z / 2026-10-08T16:01:37.201Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:11:30.673Z / 2026-10-08T16:10:23.632Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Metadados do hit:
- descrição “Hüseyin — GitHub profil sayfası”, sem tópicos, linguagem nula, `fork: false`, tamanho 0;
- criação em 2026-08-21T20:56:58Z, push em 2026-08-27T17:38:42Z.

A grafia “Micro Frontends” está em `README.md:6`. O singular não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. O README é do único commit (2026-08-21), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 704 bytes); zero symlinks e zero gitlinks. | contrária |
| Documentação | `README.md:1–12`: apresentação profissional; `README.md:6` lista “Micro Frontends” entre as áreas de atuação. | fraca |

## Autoria e histórico

Clone não raso; um único commit, `b9ca403` (2026-08-21, “Add profile README”), com autor “Hüseyin” e committer `h-kod`. Só há o branch `main`. Não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só um README. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; só a menção em `README.md:6`. |
| Q5 | No | Q1–Q4 são No: repositório de perfil. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo enquadramento dos finais de perfil 011/064/068/073/077/101/111 e dos rascunhos 285 e 303.
- **Campos:** `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** área de atuação num README de perfil casa as consultas terminológicas.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).

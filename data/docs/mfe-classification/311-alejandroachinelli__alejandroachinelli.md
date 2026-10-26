---
schema: 1
id: 1239821984
full_name: alejandroachinelli/alejandroachinelli
url: https://github.com/alejandroachinelli/alejandroachinelli
commit: 6b51d0d82f932743d0d4e219d8eba77fad4b98dc
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

# 311 — alejandroachinelli/alejandroachinelli

## Contexto

- **Tipo de repositório:** não é projeto de software (README de perfil do GitHub, em espanhol).

O snapshot contém só `README.md`, com apresentação profissional, experiência e stack. “Microfrontends” aparece como tarefa realizada num emprego anterior (“Microfrontends con React + Webpack”, `README.md:25`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:312` registra rank 311, ID 1239821984, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:312` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30132` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:30139` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-05` | 2026-10-07T21:51:22.008Z / 2026-10-08T15:42:43.341Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-05` | 2026-10-07T22:12:45.060Z / 2026-10-08T15:49:51.653Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-05-01..2026-05-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 5, criação em 2026-05-15T13:29:56Z, push em 2026-05-15T15:57:54Z.

Sem descrição, o acerto vem do README. A única grafia correspondente é “Microfrontends” (`README.md:25`), que casa literalmente `microfrontends`. A forma singular `microfrontend` não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

O SHA (2026-05-15T12:57:50-03:00, isto é, 15:57:50Z) é a última alteração do README, coincide com o `pushed_at` e antecede as coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md`, arquivo regular `100644`; zero symlinks e zero gitlinks. Não há código, manifesto nem build. | ausente |
| Documentação | `README.md:1–12`: apresentação como desenvolvedor .NET e React; `README.md:20–28`: tabela de experiência, com “Microfrontends con React + Webpack” na Ensitech (`:25`); `README.md:32–90`: stack em badges; `README.md:94–107`: portfólio com uma API .NET em outro repositório. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes; nenhuma configuração de federação, single-spa, import map, iframe ou Web Components. Imports relativos entre unidades não se aplicam (não há código). | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 3 commits (3 em todos os refs), nenhum merge, todos de `Alejandro Martin Achinelli <alejandromartin.achinelli@gmail.com>` como autor e committer, em 2026-05-15 (`5b808f5`, `5ad5082` e o SHA `6b51d0d`). Pelo `git log --no-renames --name-status`, um commit adiciona e dois modificam `README.md`. `git rev-list --objects $SHA --missing=print` lista 2 objetos ausentes, nenhum na árvore do SHA (versões anteriores do README).

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só `README.md` (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; “Microfrontends” é experiência profissional declarada (`README.md:25`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Mesmo padrão dos perfis 011/064/068/073/077/101/111; `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, arrays de tecnologia vazios.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (busca):** o hit singular `microfrontend` não tem grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002). O padrão `owner == name` reforça a sugestão de filtro automático registrada em 011.

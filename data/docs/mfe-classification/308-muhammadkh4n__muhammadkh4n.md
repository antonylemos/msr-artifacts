---
schema: 1
id: 992051423
full_name: muhammadkh4n/muhammadkh4n
url: https://github.com/muhammadkh4n/muhammadkh4n
commit: 8d69a1c44220cee5073fc363a0df600c355f7dc5
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

# 308 — muhammadkh4n/muhammadkh4n

## Contexto

- **Tipo de repositório:** não é projeto de software. É o README de perfil do GitHub (repositório `<usuário>/<usuário>`) em forma de currículo: resumo, competências, histórico profissional, projetos, formação e certificações. Contém dados de contato pessoais (`README.md:3`), que não são reproduzidos aqui. A coincidência entre dono e nome é registrada só como tipo de repositório, não como evidência arquitetural.

`data/samples/mfe-sample-001/clones.csv:309` registra rank 308, ID 992051423, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:309` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14471` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:14477` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-05` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-05-01..2025-05-31` | 2026-10-07T18:35:16.819Z / 2026-10-08T15:38:07.285Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-05` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2025-05-01..2025-05-31` | 2026-10-07T22:07:46.490Z / 2026-10-08T15:47:18.495Z |

Metadados do hit: descrição nula, sem tópicos, linguagem nula, sem licença, `fork: false`, tamanho 10, criação em 2025-05-28T14:42:04Z, push em 2025-05-28T14:45:24Z.

O plural “MicroFrontends” aparece literalmente no README em `README.md:16` (lista de competências de frontend), `README.md:77` (“Built with Next.js using a MicroFrontends architecture”, projeto profissional Droppe), `README.md:82` e `README.md:89` (tecnologias dos projetos Care.com/HomePay e Benzinga Pro). O singular “microfrontend” não aparece isolado; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA `8d69a1c` (2025-05-28), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, arquivo regular `100644` (`README.md`, 7789 bytes); zero symlinks e zero gitlinks. | ausente |
| Documentação | `README.md:16`, `77`, `82` e `89`: micro-frontends como competência e como arquitetura de projetos profissionais de terceiros (Droppe, Care.com/HomePay, Benzinga Pro), cujo código não está no repositório. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes no snapshot; sem código, portanto sem imports relativos a buscar. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 4 commits alcançáveis (4 em todos os refs), nenhum merge, todos de `Muhammad Khan` (autor; committer GitHub, interface web) em 2025-05-28: a raiz `5197db7` (“Initial commit”) adiciona `README.md`; `b460e3e` e o SHA `8d69a1c` alteram o README; `6f7ca2d` não altera arquivos. O histórico nunca conteve código. Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 2 objetos históricos ausentes; o blob do SHA está presente e foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só `README.md` (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; micro-frontends aparecem só como competência e experiência profissional (`README.md:16`, `77`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”, como os perfis 011/064/068/073/077/101/111. Na seção 3.2 do protocolo, cabe em “purely documentation without an implementation”.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, arrays vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de perfil em forma de currículo (`owner == name`) com “MicroFrontends” em competências e projetos de empregadores; mesmo padrão de 011.
- **Protocolo:** o README expõe telefone e e-mail pessoais; a anotação não os reproduz.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).

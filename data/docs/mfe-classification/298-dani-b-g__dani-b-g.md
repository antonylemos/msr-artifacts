---
schema: 1
id: 1250413921
full_name: dani-b-g/dani-b-g
url: https://github.com/dani-b-g/dani-b-g
commit: dfdddc9f208ec18b69023ffdc29ffc585d7838ec
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

# 298 — dani-b-g/dani-b-g

## Contexto

- **Tipo de repositório:** não é projeto de software. É o README de perfil do GitHub (repositório `<usuário>/<usuário>`), com apresentação profissional, badges de tecnologias, divulgação de um projeto paralelo (TournamentZZZ, hospedado fora do GitHub) e cartões de atividade. A coincidência entre dono e nome é registrada só como tipo de repositório, não como evidência arquitetural.

`data/samples/mfe-sample-001/clones.csv:299` registra rank 298, ID 1250413921, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:299` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:30744` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:30751` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-05` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T21:13:18.648Z / 2026-10-08T15:42:32.629Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2026-05` | `microfrontends in:name,description,readme pushed:>=2025-04-01 created:2026-05-01..2026-05-31` | 2026-10-07T22:12:42.392Z / 2026-10-08T15:49:48.534Z |

Metadados do hit: descrição nula, sem tópicos, linguagem nula, sem licença, `fork: false`, tamanho 212, criação em 2026-05-26T15:53:06Z, push em 2026-05-26T16:22:03Z.

Ambas as grafias aparecem literalmente no README:
- singular “microfrontend”: `README.md:14` (“a strong focus on Angular, microfrontend architecture, accessibility…”);
- plural “microfrontends”: `README.md:22` (“design systems, microfrontends and scalable UI platforms”), `README.md:89` (badge “Microfrontends”) e `README.md:178` (“Microfrontends → independent delivery without losing product consistency”); também na URL do cabeçalho (`README.md:2`, “Microfrontends” codificado no parâmetro `desc`).

A última alteração do README é o próprio SHA `dfdddc9` (2026-05-26, “fix images activity”), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 4 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks: `.gitignore` (só `/SETUP.md`, `.gitignore:1`), `README.md` e duas capturas PNG em `assets/` referenciadas pelo README (`README.md:64–65`). Não há manifesto, código, configuração de build nem workflow. | ausente |
| Documentação | `README.md:14`, `22`, `89` e `178`: micro-frontends como foco profissional, badge e princípio de engenharia; `README.md:37–66`: projeto paralelo TournamentZZZ (Angular 21, NestJS) descrito e linkado a um site externo (`README.md:8`, `25`), sem código no repositório; `README.md:119–134`: links para outros repositórios do autor, não seguidos. | fraca |
| Tecnologia / Configuração / Código-fonte / Composição / Build/deploy | Inexistentes no snapshot; sem código, portanto sem imports relativos a buscar. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 3 commits alcançáveis (3 em todos os refs), nenhum merge, todos de `dani-b-g <daniel.barriga.grados@gmail.com>` (autor e committer) em 2026-05-26: a raiz `dd7834d` (“first commit”) adiciona os quatro arquivos; `e3be20d` (“fix: cambio github activity”) e o SHA `dfdddc9` (“fix images activity”) só alteram `README.md`. O histórico nunca conteve código. Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 2 objetos históricos ausentes; os blobs do SHA citados foram lidos (as PNG apenas como entradas da árvore).

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; só README, `.gitignore` e duas imagens (inventário). |
| Q2 | No | Não há unidades. |
| Q3 | No | Não há host, shell nem root config. |
| Q4 | No | Nenhum mecanismo de composição; micro-frontends aparecem só como competência e princípio (`README.md:22`, `178`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”, como os perfis 011/064/068/073/077/101/111. Na seção 3.2 do protocolo, cabe em “purely documentation without an implementation”.
- `repo_type: other`, `frontend_units: 0`, `unit_organization: none`, arrays vazios.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de perfil (`owner == name`) com várias menções a “microfrontend(s)”, inclusive em badge e em URL de imagem gerada, que casam as duas consultas terminológicas; mesmo padrão de 011.
- **Protocolo (busca):** as duas grafias têm ocorrência literal. A elegibilidade muda de `unknown` (001, `activity_incomplete`) para `pass` (002).

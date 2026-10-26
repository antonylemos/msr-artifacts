---
schema: 1
id: 1362609771
full_name: hqadeer-nisum-com/nisumpk-mfe-training-final-project-MFE-training-assignment
url: https://github.com/hqadeer-nisum-com/nisumpk-mfe-training-final-project-MFE-training-assignment
commit: e99743b91b738c8fc87791b68faccf8704cbabee
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

# 147 — hqadeer-nisum-com/nisumpk-mfe-training-final-project-MFE-training-assignment

## Contexto

No commit registrado, o repositório contém só `LICENSE` e um `README.md` de 1.535 linhas com o **enunciado** do projeto final de um treinamento em micro-frontends. O enunciado pede shell/gateway, ao menos dois MFEs, Module Federation obrigatório, monorepo, CI/CD etc. (`README.md:1–30`; `README.md:61`; `README.md:261–289`). Não há implementação no snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:148` registra rank 147, ID 1362609771, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:148` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:36962` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:36971` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `#created:2026-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:31:04.154Z / 2026-10-08T16:19:36.684Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:42:26.531Z / 2026-10-08T16:02:06.454Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:12:26.297Z / 2026-10-08T16:10:41.677Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Metadados do hit: descrição nula, sem tópicos, linguagem nula, `fork: false`, tamanho 149, criação em 2026-09-09T11:48:36Z, push em 2026-09-29T10:24:38Z. Sem descrição, o acerto vem do README, que tem as três grafias literais:
- “Micro Frontend”: `README.md:1`, `7`, `13`;
- “Micro Frontends”: `README.md:30`;
- “Module Federation”: `README.md:14`, `41`.

A última alteração do README é o próprio SHA, `e99743b` (2026-09-09T03:29:03+05:00), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 2 entradas, `LICENSE` e `README.md`, ambas `100644`; zero symlinks e zero gitlinks. Não há código, manifesto ou configuração. | contrária |
| Documentação (enunciado) | `README.md:1–30`: “Final Project for the Micro Frontend (MFE) Training … you will design and build…”. `README.md:61`: “Your project must contain at least two Micro Frontends and one Gateway/Shell application”. `README.md:261–289`: Module Federation obrigatório, Gateway como host, MFEs como remotes. `README.md:663`, `827–863`: variáveis e deploy esperados. O texto prescreve o que o aluno deve construir; não descreve artefatos existentes. | fraca |
| Tecnologia / Configuração / Composição (busca) | O inventário é só README e LICENSE; leitura e `git grep -i` por termos MFE só acham o enunciado. Nenhum mecanismo configurado. | ausente |

## Autoria e histórico

Clone não raso; 3 commits, nenhum merge, todos de `moiznisum <msiddique@nisum.com>`. A raiz `d1f0526` (“Initial commit”, 2026-09-09T03:21:47+05:00) adiciona `LICENSE` e `README.md`; `6c81bdb` e o SHA `e99743b` só alteram o README (`git log --no-renames --name-status`). O commit-raiz é anterior à criação do repositório nos metadados (2026-09-09T11:48:36Z), compatível com repositório gerado a partir de template de enunciado. Nenhum blob histórico foi lido e não houve objeto ausente.

Existe o ref `origin/feature/final-project-assignment` (`72e4f64`, hqadeer-nisum-com, 2026-09-29, “fix checkout request content type”), que descende do SHA (`git merge-base --is-ancestor`). O `pushed_at` dos metadados (2026-09-29) corresponde a esse branch. Pelo procedimento, o snapshot classificado é o commit registrado em `clones.csv`; o conteúdo desse branch não foi lido nem considerado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no snapshot; só README e LICENSE. As unidades do enunciado (`README.md:61`) são requisitos, não artefatos nem referências de configuração. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição configurado; Module Federation aparece só como requisito (`README.md:261–289`). |
| Q5 | No | Q1–Q4 são No: enunciado de exercício sem implementação no commit registrado. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”. É conteúdo didático, como 023, e repositório sem implementação, como os perfis 011/064/068/073/077/101/111, por isso `frontend_units: 0` e `unit_organization: none`.
- `repo_type: other`: enunciado de treinamento, sem aplicação de exemplo, template de código ou biblioteca. `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta sobre o checklist aplicado ao snapshot.

## Notas para análise

- **Protocolo (snapshot e branches):** existe o ref `origin/feature/final-project-assignment`, descendente do SHA, mas a existência do branch e o subject de seu commit não demonstram que haja nele uma implementação MFE; o conteúdo não foi lido. A amostra classifica o commit de `clones.csv` (branch `main`), e o caso é Non-MFE pelo snapshot. Registra-se como limitação de cobertura, sem inspecionar o branch.
- **RQ1 (sinais enganosos):** enunciados de treinamento com vocabulário MFE denso (Module Federation, host, remotes) passam por todas as consultas terminológicas e de tecnologia sem conter código.
- **Protocolo (busca):** as três grafias buscadas estão literalmente no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No (o snapshot é uma licença e um README que prescreve um exercício, sem implementação, manifesto, entrada de frontend nem unidade remota); sem decisão aberta. Correção adotada: a hipótese de que a solução do aluno esteja no branch remoto foi retirada, pois não é sustentada sem ler outro snapshot.

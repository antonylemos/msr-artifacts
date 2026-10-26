---
schema: 1
id: 1150707772
full_name: alilizeph/New_My_Metaverse
url: https://github.com/alilizeph/New_My_Metaverse
commit: 668aab5cb81412aaa58d40c9b1e1f88ea93869a1
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

# 140 — alilizeph/New_My_Metaverse

## Contexto

O repositório só tem um `README.md`, com a apresentação de um projeto planejado: API REST Spring Boot 4 e frontend Angular 21 para uma loja de videogames (`README.md:1–7`). As seções “BACKEND COMPOSITION” e “FRONTEND COMPOSITION” estão vazias (`README.md:11–20`). Não há código, configuração nem frontend no snapshot. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:141` registra rank 140, ID 1150707772, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:141` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24468` (`broader`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:24475` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-composition`: `"frontend composition" in:name,description,readme` | `broader-frontend-composition` (sem partição) | `"frontend composition" in:name,description,readme pushed:>=2025-04-01` | 2026-10-07T23:38:47.022Z / 2026-10-08T16:22:36.838Z |

Metadados do hit:
- descrição “New My Metaverse is an API REST with Spring Boot 4 for backend and Angular 21 for frontend.”;
- sem tópicos, linguagem nula, `fork: false`, tamanho 2;
- criação em 2026-02-05T15:44:51Z, push em 2026-02-05T16:08:31Z.

A descrição não contém a frase. Por eliminação, o acerto vem de `README.md:18`, “## FRONTEND COMPOSITION”: um título de seção vazio, com a frase literal (maiúsculas).

A última alteração do README é o próprio SHA, `668aab5` (2026-02-05T17:08:31+01:00), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: uma entrada, `README.md` (`100644`, 650 bytes); zero symlinks e zero gitlinks. Não há manifesto, código-fonte, configuração ou assets. | contrária |
| Documentação | `README.md:5–7` descreve o projeto (Spring Boot 4 + Angular 21, padrão DTO, loja de games) como trabalho de conclusão de formação. `README.md:11–20`: as seções “BACKEND COMPOSITION”, “Entities and Enums” e “FRONTEND COMPOSITION” estão vazias. | contexto |
| Tecnologia / Configuração / Composição (busca) | O inventário é só o README; leitura integral: nenhuma menção a micro-frontends, federação, single-spa, iframe ou qualquer mecanismo de composição. “FRONTEND COMPOSITION” (`README.md:18`) é título de seção sem conteúdo. | ausente |

## Autoria e histórico

Clone não raso; 2 commits, nenhum merge, ambos de BUFFARD Alexandre `<118019350+alilizeph@users.noreply.github.com>` em 2026-02-05. A raiz `c3a0782` (“Initial commit”) adiciona `README.md`, e o SHA `668aab5` (“Update README.md”) o altera (`git log --no-renames --name-status`). Nenhum outro arquivo existiu na história alcançável. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no repositório; o único arquivo é `README.md`. Não há configuração de composição. |
| Q2 | No | Sem unidades, não há entradas nem builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição configurado; “FRONTEND COMPOSITION” é título vazio (`README.md:18`). |
| Q5 | No | Q1–Q4 são No: repositório só com README de projeto planejado. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Mesmo perfil de 011/064/068/073/077/101/111: repositório sem implementação, só com README, registrado como `repo_type: other`, `frontend_units: 0` e `unit_organization: none`. Na filtragem automática (seção 3.2 do protocolo), caberia em “purely documentation without an implementation”.
- Diferentemente desses perfis, o README não menciona micro-frontends. O acerto vem só do título genérico “FRONTEND COMPOSITION”, captado pela consulta ampla.
- `ui_technologies: []` e `build_tools: []`: Angular e Spring Boot são só declarados em texto, sem artefato observado.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** a consulta ampla `"frontend composition"` casou um título de seção de README sobre a “composição” (estrutura) do frontend, sem relação com composição de unidades.
- **Protocolo (filtragem):** repositório de tamanho 2 nos metadados e uma única entrada na árvore, que filtros automáticos de “not software projects” eliminariam. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `other` e zero unidades; sem decisão aberta. O snapshot tem uma única entrada (`README.md`, 650 bytes), sem manifesto, código, configuração nem asset, e o histórico tem dois commits que só tocam o README. O acerto vem do cabeçalho literal "FRONTEND COMPOSITION" em `README.md:18`, que não tem conteúdo sob ele (eliminação entre nome, descrição, tópicos e README); a descrição do hit ("API REST with Spring Boot 4 … Angular 21 for frontend") não contém a expressão consultada. O README é anterior às buscas (2026-02-05). O sinal lexical é ainda mais fraco que o do perfil 011 (título vazio), com o mesmo critério de avaliar o conteúdo implementado do snapshot.

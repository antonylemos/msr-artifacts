---
schema: 1
id: 865249831
full_name: ShovanDhara/ShovanDhara
url: https://github.com/ShovanDhara/ShovanDhara
commit: e049c846aed2c700cc590321b4c8a5b819ea65aa
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

# 173 — ShovanDhara/ShovanDhara

## Contexto

Repositório de perfil pessoal: só um `README.md` de 35 linhas, com apresentação de um desenvolvedor front-end e listas de tecnologias (`README.md:1–8`, `15–30`). “Single SPA” aparece na lista de frameworks (`README.md:17`) e “Micro Front-End” na de arquiteturas (`README.md:21`). Não há código. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:174` registra rank 173, ID 865249831, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:174` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:10143` e `data/discovery/mfe-round-002/candidates.csv:10149`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2024-Q3` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2024-07-01..2024-09-30` | 2026-10-07T23:33:17.518Z / 2026-10-08T16:20:51.088Z |

Metadados do hit:
- descrição “Profile Information”, sem o termo;
- sem tópicos, linguagem nula, `fork: false`, tamanho 14;
- criação em 2024-09-30T08:23:48Z, push em 2026-01-01T08:46:44Z.

O acerto vem de `README.md:17`, “Framework / Library – Angular (2,5, 7, 11), React, NEXT Js, React Query, Redux, Single SPA”. A grafia é “Single SPA”, com espaço; a busca de frase do GitHub trata o hífen de `"single-spa"` como separador. Aqui a expressão provavelmente se refere à biblioteca single-spa, mas só como item de lista de competências.

A última alteração do README é o próprio SHA, `e049c84` (2026-01-01, “Update README to clarify database and query language”), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md` (`100644`); zero symlinks e zero gitlinks. Não há código, manifesto ou configuração. | contrária |
| Documentação | `README.md:1–8`: apresentação (“Hi, there… It's Shovan”, “As a `Front End Developer`…”). `README.md:17`: “Single SPA” entre frameworks. `README.md:21`: “Architecture – Monolithic, Micro Front-End”. São competências declaradas, sem projeto descrito. | fraca |
| Tecnologia / Configuração / Composição (busca) | Com o inventário reduzido ao README, `grep -i` por `micro.?front`, `federation`, `single` e `spa` só acha `README.md:17` e `21`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 9 commits, nenhum merge, todos do titular `<shovan.9836@gmail.com>` (“Shovan” 7, “ShovanGit” 2), pela interface web (committer GitHub). Vão de 2024-09-30 (`96f2c6d`, “Initial commit”) a 2026-01-01 (SHA), e todos alteram só o README. Nenhum blob histórico foi lido. O clone é parcial (`blob:none`) e uma busca histórica por conteúdo (`git log -S`) falha sob `GIT_NO_LAZY_FETCH=1` com objeto prometido ausente; sem rede, não se determina em que commit anterior cada menção do README foi introduzida. O README e a árvore do SHA avaliado são legíveis.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só o README. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; “Single SPA” e “Micro Front-End” só aparecem em listas de competências (`README.md:17`, `21`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório sem implementação, como os perfis 011/064/068/073/077/101/111 (e os rascunhos 158/166): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** item “Single SPA” de lista de competências em README de perfil basta para a consulta de tecnologia `"single-spa"`. É a mesma grafia com espaço que em 131/144, aqui com provável referência à biblioteca.
- **Protocolo (busca):** entrada só por essa consulta, com elegibilidade `pass` nas duas rodadas.
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `other`, zero unidades e `none`; sem decisão aberta (`draft`). As menções a "Single SPA" e "Micro Front-End" são listas de competências do perfil. Correção adotada: a afirmação de que não havia objeto ausente foi substituída pela limitação de clone parcial. Proveniência: por eliminação o README é o único campo compatível, especificamente "Single SPA" em `README.md:17`; o comportamento do indexador que equipara espaço e hífen permanece inferência, e não fato guardado. Comparáveis finais: 011 e 064.

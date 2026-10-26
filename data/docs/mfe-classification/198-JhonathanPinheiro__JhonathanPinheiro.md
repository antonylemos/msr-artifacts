---
schema: 1
id: 347764242
full_name: JhonathanPinheiro/JhonathanPinheiro
url: https://github.com/JhonathanPinheiro/JhonathanPinheiro
commit: c63d8ed0cc2ed67f1b5cc2f8f407544dcc3abaf4
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

# 198 — JhonathanPinheiro/JhonathanPinheiro

## Contexto

Repositório de perfil pessoal (“Config files for my GitHub profile.”): um `README.md` de 107 linhas com apresentação profissional e um workflow que gera a animação “snake” de contribuições e a publica no branch `output` (`.github/workflows/main.yml:1–25`). Micro-frontends e Module Federation aparecem num bloco de competências formatado como código (`README.md:34`) e numa lista de estudos (`README.md:38`). Não há código de aplicação. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:199` registra rank 198, ID 347764242, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:199` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:2036` e `data/discovery/mfe-round-002/candidates.csv:2038`, ambos com `pass`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2021-03` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:20:21.180Z / 2026-10-08T15:35:37.949Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:05:05.275Z / 2026-10-08T15:45:14.737Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:14:55.083Z / 2026-10-08T16:12:13.253Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2021-03-01..2021-03-31`.

Metadados do hit:
- descrição “Config files for my GitHub profile.”;
- tópicos `config` e `github-config`, linguagem nula, `fork: false`, tamanho 97;
- criação em 2021-03-14T21:58:23Z, push em 2026-06-08T13:41:33Z.

Grafias no README:
- “Webpack Module Federation” e “Microfrontends”: `README.md:34` (`infra: ["Webpack Module Federation", "Microfrontends"]`);
- “Microfrontends”: `README.md:38` (“Aprofundando arquitetura Front-end e Microfrontends”).

A forma singular “microfrontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `c63d8ed` (2026-06-08), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 2 entradas, `README.md` e `.github/workflows/main.yml`, ambas `100644`; zero symlinks e zero gitlinks. Não há código de aplicação, manifesto nem configuração de build. | contrária |
| Documentação | `README.md:1–8`: cabeçalho gráfico do perfil. `README.md:34`: lista de competências de infraestrutura com “Webpack Module Federation” e “Microfrontends”. `README.md:38`: tema de estudo atual. São competências declaradas, sem projeto descrito. | fraca |
| Tecnologia / Configuração / Composição (busca) | Com o inventário reduzido a README e workflow, `grep -i` por `micro.?front`, `federation` e `single.?spa` só acha `README.md:34` e `38`. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 84 commits em todos os refs, nenhum merge, do titular (“Jhonathan Pinheiro” 80, “JhonathanPinheiro” 3, pela interface web) e 1 de `github-actions[bot]` no branch `output`. A raiz é `8c7e299` (2021-03-14, “Create README.md”); o SHA é `c63d8ed` (2026-06-08, “Remove GitHub Streak badge from README”). O branch `origin/output` não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só README e workflow. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; Module Federation só aparece na lista de competências (`README.md:34`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório sem implementação, como os perfis 011/064/068/073/077/101/111 (e os rascunhos de perfil 158/166/173/179/182/188/195): `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** competências “Webpack Module Federation” e “Microfrontends” em README de perfil casam consultas terminológicas e de tecnologia.
- **Protocolo (busca):** o hit singular `microfrontend` não tem grafia literal. Elegibilidade `pass` nas duas rodadas.

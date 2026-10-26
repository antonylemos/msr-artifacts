---
schema: 1
id: 1327803024
full_name: Vaishu321/Vaishu321
url: https://github.com/Vaishu321/Vaishu321
commit: a3224812b4223f82142cd29085a7de06471782a5
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

# 166 — Vaishu321/Vaishu321

## Contexto

Repositório de perfil pessoal: só um `README.md` de 341 linhas, com apresentação profissional, competências e descrição de projetos de trabalho (`README.md:1–12`). Um desses projetos, “Tech Factory GPS Chatbot”, é descrito como de “micro-frontend architecture” com Module Federation (`README.md:164–177`), mas nem o código nem um link específico para o repositório do projeto estão neste repositório (a seção tem apenas um link de GitHub que aponta ao perfil geral, `README.md:186`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:167` registra rank 166, ID 1327803024, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:167` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35010` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:35016` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-08` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:41:05.284Z / 2026-10-08T16:01:37.201Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:11:13.636Z / 2026-10-08T16:10:20.504Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:30:18.304Z / 2026-10-08T16:19:22.114Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-08-01..2026-08-31`.

Metadados do hit:
- descrição de apresentação pessoal (“Hi! I'm Vaishnavi, a full-stack developer…”), sem os termos;
- sem tópicos, linguagem nula, `fork: false`, tamanho 77;
- criação em 2026-08-08T13:49:15Z, push em 2026-08-14T19:14:45Z.

Grafias no README:
- “Micro-frontend” e “micro-frontend”: `README.md:48`, `164`, `166`, `171`, `177`, `228`;
- “Module Federation”: `README.md:170`, `177`, `228`.

A busca de frase trata o hífen como separador. O plural “micro frontends” não aparece no README nem na descrição; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `a322481` (2026-08-15), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1 entrada, `README.md` (`100644`); zero symlinks e zero gitlinks. Não há código, manifesto ou configuração. | contrária |
| Documentação | `README.md:1–12`: cabeçalho de perfil (nome, cargo, badges). `README.md:48`: competência “Micro-frontend architecture and Next.js full-stack development”. `README.md:164–177`: projeto “Tech Factory GPS Chatbot” com “Module Federation” e “independent deployment”. `README.md:222–230`: realizações profissionais (“Implemented micro-frontend integrations…”). São descrições de experiência, sem código nem link para o projeto. | fraca |
| Tecnologia / Configuração / Composição (busca) | Com o inventário reduzido ao README, `grep -i` por `micro.?front`, `federation` e `single-spa` só acha as linhas acima. Nenhum mecanismo. | ausente |

## Autoria e histórico

Clone não raso; 13 commits, nenhum merge, todos de Vaishnavi G N `<138749951+Vaishu321@users.noreply.github.com>`, de 2026-08-08 (`7c2d85b`, “Initial commit”) a 2026-08-15 (SHA, “Remove GitHub Analytics from README”). Os committers são “GitHub” (interface web) ou a própria autora. Todos alteram só o README. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; o inventário é só o README. O projeto descrito em `README.md:164–177` não está no repositório nem é referenciado por configuração. |
| Q2 | No | Sem unidades, não há entradas ou builds. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição; Module Federation só aparece em texto de currículo (`README.md:170`, `177`, `228`). |
| Q5 | No | Q1–Q4 são No: README de perfil pessoal. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- Repositório sem implementação, como os perfis 011/064/068/073/077/101/111 e o rascunho 158: `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de perfil com experiência profissional em MFE e Module Federation casa consultas terminológicas e de tecnologia sem conter código.
- **Protocolo (busca):** o hit plural `"micro frontends"` não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `other`, zero unidades e `none`; sem decisão aberta (`draft`). O snapshot é um README de perfil que descreve um projeto externo; correção adotada: o link de GitHub da seção do projeto aponta ao perfil, não a um repositório do chatbot (`README.md:186`, verificado). Q1 a Q3 e Q5 devem citar `README.md:164–186` e o inventário integral da árvore (resultado de comando, não citação de arquivo). Proveniência: a frase separada e o plural não aparecem literalmente no README, mas formas hifenizadas do singular aparecem (`README.md:48,164,166,171,177,228`); por eliminação o README é a fonte plausível, e a normalização da busca não é observável nas bases. A palavra `federation` no README é só documentação.

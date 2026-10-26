---
schema: 1
id: 294506410
full_name: IsaacAlves7/js
url: https://github.com/IsaacAlves7/js
commit: 783471e1f8e13dfaf4a623ea613bcb19027cb282
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

# 167 — IsaacAlves7/js

## Contexto

Repositório de estudos de JavaScript e TypeScript. O conteúdo central é um README de 1.202 linhas, um material didático em português com apresentação do autor e links para outros repositórios de estudo (`README.md:1–10`, `23`). Ele acompanha exercícios soltos em `js/` e `TypeScript/`, exemplos de Deno (`Deno/`) e uma API GraphQL de curso (`graphql-api/`). Micro-frontends aparecem uma única vez, como área de atuação do autor (`README.md:23`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:168` registra rank 167, ID 294506410, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:168` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:1382` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:1381` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2020-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:15:56.090Z / 2026-10-08T15:51:39.765Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:45:38.815Z / 2026-10-08T16:03:26.342Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2020-09-01..2020-09-30`.

Metadados do hit:
- descrição “📜 It's a repository of JavaScript and TypeScript (JS/TS) programming language and his content.”, sem os termos;
- 20 tópicos (`javascript`, `reactjs`, `angular`, `vuejs`, `webpack`, `typescript` etc.), nenhum de MFE;
- linguagem JavaScript, `fork: false`, tamanho 9.661;
- criação em 2020-09-10T19:41:51Z, push em 2026-05-28T19:36:49Z.

O acerto vem de `README.md:23`, “…trabalhando com arquitetura de micro-frontends…”, com grafia hifenizada e única ocorrência. A busca de frase trata o hífen como separador. A forma singular “micro frontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é o próprio SHA, `783471e` (2026-05-28), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 50 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `README.md`, `.gitignore` e quatro diretórios: `js/` (exercícios numerados, por exemplo “1) Visita na Feira.js”, `heapSort.js`), `TypeScript/` (exemplos de sintaxe com `package.json` só com `ts-node`/`typescript`), `Deno/` (scripts e uma API REST) e `graphql-api/` (API Node/Apollo de curso, `package.json` com repositório `alura-cursos/1922-graphql`). `graphql-api/index.html` tem 0 bytes. Não há aplicação frontend. | contrária |
| Documentação | `README.md:1–10`: links para outros repositórios de estudo e o título “It's a repository of JavaScript (JS)”. `README.md:23`: apresentação profissional com “arquitetura de micro-frontends”. O restante é material didático. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA (exceto lockfiles e README) por `federation`, `remoteEntry`, `single-spa` e `registerApplication`: nenhum resultado. No README, `micro.?front` só aparece em `README.md:23`. | ausente |

## Autoria e histórico

Clone não raso. Há 4.001 commits em todos os refs, mas só 2.047 são alcançáveis a partir do SHA, com 1 merge. Todos são do mesmo titular: “Isaac Alves Pinheiro” (2.030), “Isaac Alves” (14) e “IsaacAlves7” (3). A raiz é `254a10f` (2020-09-10, “first commit”). As mensagens mais frequentes são “Update README.md” (2.010), por edição web. Os branches `Ionic`, `TS`, `angular`, `data-structure`, `electron`, `exercises` e `jQuery` não foram considerados. O `git log -S` no README não completou por blob ausente no clone parcial (`b259189e…`), que não foi buscado; o clone ficou inalterado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend no snapshot; só exercícios, scripts Deno e uma API Node. Nenhuma configuração de composição. |
| Q2 | No | Sem unidades frontend, não há entradas ou builds a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz. |
| Q4 | No | Nenhum mecanismo de composição (busca registrada). |
| Q5 | No | Q1–Q4 são No: repositório de estudos que menciona micro-frontends uma vez como área de atuação. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- É conteúdo e exercício, como 023, e não tem unidade frontend, como os perfis 011/064/068/073/077/101/111. Daí `frontend_units: 0`, `unit_organization: none`, `repo_type: other`, `ui_technologies: []` e `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README didático extenso, atualizado com frequência pela web, com uma única menção a micro-frontends na apresentação do autor. O filtro `pushed:>=2025-04-01` é satisfeito pelas edições do README.
- **Protocolo (busca):** o hit singular `"micro frontend"` não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `other`, zero unidades e `none`; sem decisão aberta (`draft`). O repositório é material de estudo (exercícios JavaScript/TypeScript, scripts e APIs de backend) e `micro-frontends` (`README.md:23`, única ocorrência de `micro.?front`) é autodescrição profissional. Citações de apoio para Q1 a Q5: `README.md:23`, `TypeScript/index.ts:1–7`, `Deno/Deno REST API/index.ts:1–9` e `graphql-api/package.json:5–13`; a ausência de unidades decorre do inventário `git ls-tree` do SHA (`graphql-api/index.html` é um blob vazio, sem linhas). Em `graphql-api/package.json`, `main` aponta a um `index.js` ausente na raiz do pacote, enquanto o script `start` aponta a `api/index.js`, que existe, mas usa `typeDefs` e `resolvers` não definidos nele e não inicia o servidor (`graphql-api/package.json:5–8`; `graphql-api/api/index.js:1–14`). Os badges de `README.md:1` levam a outros branches e repositórios, navegação e não composição no SHA classificado, que é o único commit classificado (não todas as refs). Proveniência do hit plural: o README só tem a forma hifenizada `micro-frontends`; por eliminação de nome e descrição o README é a fonte plausível, e a normalização da busca não está nas bases. A busca histórica `git log -S` falhou por blob promisor ausente (`b259189…`); não se buscou o blob nem se inferiu a data de criação da menção.

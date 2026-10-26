---
schema: 1
id: 1312909367
full_name: kaleidae-lab/ASCII-Voice
url: https://github.com/kaleidae-lab/ASCII-Voice
commit: 3b5be08a76f1cb4f80e499206187407fa3ef2529
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [react]
build_tools: [vite]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 187 — kaleidae-lab/ASCII-Voice

## Contexto

Scaffold Vite + React + TypeScript gerado pela plataforma de criação colaborativa Kaleidae para uma “node” chamada “ASCII starts to move.” (`README.md:1–9`). O app é um placeholder: “This is scaffolding. Gut it. Make something.” (`src/App.tsx:3`, `18`). O acerto da busca `"single-spa"` vem da expressão “just a single SPA” (`README.md:9`), não da biblioteca single-spa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:188` registra rank 187, ID 1312909367, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:188` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:34237` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:34244` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2026-Q3` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-09-30` | 2026-10-07T23:35:46.002Z / 2026-10-08T16:21:44.098Z |

Metadados do hit:
- descrição “Kaleidae node — sparked by ASCII starts to move.”, sem o termo;
- sem tópicos, linguagem TypeScript, `fork: false`, tamanho 8;
- criação em 2026-07-26T15:17:59Z, push em 2026-07-26T15:18:11Z.

O acerto vem de `README.md:9`, “No router, no SSR — just a single SPA.”. A grafia é “single SPA”, com espaço; a busca de frase do GitHub trata o hífen de `"single-spa"` como separador. Nenhum arquivo do SHA contém `single-spa`.

A última alteração do README é `6b9bd4d` (2026-07-27, “update README.md (kaleidae scaffold)”), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 10 entradas, todas arquivos regulares `100644` (`.gitignore`, `.kaleidae/context.md`, `README.md`, `index.html`, `package.json`, `src/App.tsx`, `src/main.tsx`, `src/styles.css`, `tsconfig.json`, `vite.config.ts`); zero symlinks e zero gitlinks. Há um único projeto Vite. | contrária |
| Código-fonte / Configuração | `src/main.tsx:1–13` monta `App`. `src/App.tsx:1–22` é um placeholder animado. `vite.config.ts:4–6`: só `react()`. `package.json:11–21`: React, Vite e TypeScript, sem dependência MFE. | contrária |
| Documentação | `README.md:9`: “Scaffolded from the `vite-react` template… just a single SPA”. `README.md:27–33`: `kaleidae push` para publicar na plataforma. `.kaleidae/context.md:1–42`: instruções, em japonês, para um assistente de IA acompanhar o autor. | contexto |
| Busca | `git grep -i` no SHA por `single` e `spa`: só `README.md:9` e `.kaleidae/context.md` (a palavra “Spark”). Nenhum mecanismo de composição. | ausente |

## Autoria e histórico

Clone não raso; 11 commits, nenhum merge. A raiz é `ffdb9b7` (2026-07-26T15:18:00Z, “Initial commit”, `kaleidae-lab`, via GitHub). Os outros 10 são de `Kaleidae <kaleidae@kaleidae.invalid>`, um por segundo, cada um adicionando um arquivo do scaffold (“add … (kaleidae scaffold)”), até o SHA `3b5be08` (“add .gitignore”). É geração automática da plataforma, sem trabalho humano posterior. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma configuração de composição. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição (`vite.config.ts:4–6`; busca registrada). |
| Q5 | No | Q1–Q4 são No: scaffold de SPA captado pela expressão “single SPA”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. O acerto é lexical: “single SPA” no sentido de uma única aplicação de página única.
- É o mesmo falso positivo da consulta `"single-spa"` registrado em 131, 144 e 173. Aqui o README afirma literalmente o contrário de uma composição: “just a single SPA”.
- O repositório é saída de gerador de plataforma (commits automáticos de `kaleidae.invalid`), na linha dos casos de gerador 075/081/094/105, mas aqui com uma aplicação concreta, embora placeholder. Por isso `frontend_units: 1` e `single-unit`.
- `repo_type: template`: scaffold inicial para o autor substituir. `ui_technologies: [react]`, `build_tools: [vite]`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** mais um caso de “single SPA” captado pela consulta de tecnologia `"single-spa"` (ver também 131, 144 e 173). Fica registrada a recorrência para avaliação do protocolo de busca, sem proposta de regra.
- **Protocolo (amostra):** repositórios gerados automaticamente por plataformas de scaffolding entram pela busca; o histórico (autor `*.invalid`, um commit por arquivo por segundo) os identifica.
- **Protocolo (busca):** elegibilidade `unknown` (001) → `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE e Q1–Q5 No; sem decisão aberta (`draft`). Correções de precisão, sem efeito na classe: a palavra "Spark" aparece em `.kaleidae/context.md:4` e `:38` (verificado), distinta da pilha Vite/React/TypeScript em `:21`; e a explicação do tokenizador do hit "single SPA" é inferência, e não fato gravado nas bases. A árvore, o histórico e as buscas negativas são evidências de inspeção estrutural, sem linha citável. O candidato tem uma aplicação real de scaffold (unidade única Vite/React), com evidência ainda mais direta contra MFE do que o final 023; o contraste com 004 é que lá há uma unidade com custom element e entrada de build preparada para host externo, condição ausente aqui.

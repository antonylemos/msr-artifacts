---
schema: 1
id: 1118660441
full_name: OnlyArkMani/Flowboard
url: https://github.com/OnlyArkMani/Flowboard
commit: 200d6ecd1b2cac34b65ce47b496f276de3234a01
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 131 — OnlyArkMani/Flowboard

## Contexto

“BatchOps”, plataforma de processamento em lote para instituições de ensino: backend Django/DRF com workers RQ e uma única SPA React/Vite (`README.md:1–3`; `README.md:44–61`). O acerto da busca `"single-spa"` vem da expressão “Single SPA” (uma única SPA) no README, não da biblioteca single-spa. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:132` registra rank 131, ID 1118660441, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:132` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:22320` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:22326` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `technology-single-spa-repositories#created:2025-Q4` | `"single-spa" in:name,description,readme pushed:>=2025-04-01 created:2025-10-01..2025-12-31` | 2026-10-07T23:34:22.612Z / 2026-10-08T16:21:14.951Z |

Metadados do hit: descrição “Delloite Capstone Project Repo”, sem tópicos, linguagem TypeScript, `fork: false`, criação em 2025-12-18T05:07:10Z, push em 2026-01-22T20:15:27Z. Nome e descrição não contêm o termo. Por eliminação, o acerto vem de `README.md:48`: “| Frontend | React + Vite + TypeScript | Single SPA in `frontend/src/App.tsx`. |”. A grafia observada é “Single SPA”, com espaço; a busca de frase do GitHub trata o hífen de `"single-spa"` como separador. Nenhum outro arquivo de texto do SHA fora de `frontend/node_modules`, `__pycache__` e `backend/storage` contém `single.?spa`. O lockfile também não contém o pacote.

O README do SHA vem de `39117f9` (“Final Project Commit”, 2026-01-23T01:37:19+05:30); o SHA é o merge seguinte, com o mesmo README. Os dois antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 6.126 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. São 5.723 em `frontend/node_modules` versionado (160 entradas de topo, incluindo `.vite` e `.bin`), 328 em `backend/storage` (arquivos gerados) e `.pyc` em `__pycache__`. O código próprio do frontend é `frontend/index.html`, `frontend/src/main.tsx`, `frontend/src/App.tsx`, `frontend/src/lib/api.ts`, `frontend/src/vite-env.d.ts`, `frontend/src/app.css` e configs. Há um só `package.json` de aplicação (`frontend/package.json`); não há `vite.config.*` nem `tsconfig` próprio. | contrária |
| Código-fonte (UI) | `frontend/index.html:9–10`: uma raiz `#root` carregando `/src/main.tsx`. `frontend/src/main.tsx:3–9` renderiza `App`. `frontend/src/App.tsx` (5.025 linhas) concentra a UI; o comentário “APP SHELL” em `frontend/src/App.tsx:4339–4341` marca o componente raiz `App` do mesmo arquivo, sem carregar unidades. | contrária |
| Documentação (arquitetura) | `README.md:44–61`: uma camada frontend (“Single SPA in `frontend/src/App.tsx`”) e serviços backend/worker/scheduler/redis/db. `FILE_GUIDE.md:203–236` lista os arquivos do frontend, todos do mesmo projeto. | contrária |
| Código-fonte (fronteiras) | `frontend/src/main.tsx:3` importa `./App`; `frontend/src/App.tsx:1–3` importa React, `./lib/api` e `./app.css`; `frontend/src/lib/api.ts:1` importa `axios`. Busca por `../` nos fontes próprios: nenhuma ocorrência. Não há segunda unidade cuja fronteira pudesse ser atravessada. | contexto |
| Configuração / Build/deploy | `frontend/package.json:6–11`: um único ciclo `vite`/`tsc -b && vite build`. Dependências: React 18, `react-router-dom`, `axios` (`frontend/package.json:12–17`), resolvidas em `frontend/package-lock.json:3757–3758`, `3770–3771` e `4086–4087` (react/react-dom 18.3.1, vite 5.4.21). `docker-compose.yml:1–106` sobe só Postgres, Redis, MailHog e três serviços Django; o frontend não é conteinerizado. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, excluindo `frontend/node_modules`, `*.pyc` e `backend/storage`, por `single.?spa`, `micro.?front`, `module.?federation`, `remoteEntry`, `registerApplication`, `qiankun`, `wujie`, `import.?map`, `customElements` e `<iframe`: único acerto em `README.md:48`. O lockfile não contém `single-spa` nem federation, e o topo de `frontend/node_modules` não tem pacote desses. | ausente |
| Código-fonte (integração) | `frontend/src/lib/api.ts:3`, `22–27`, `83–132`: cliente axios para a API Django (`VITE_API_BASE_URL`, `frontend/.env:1`). É integração com backend, não composição de UI. | contexto |

## Autoria e histórico

Clone não raso. O SHA é um merge (“Resolve merge conflicts and keep local versions”, 2026-01-23T01:45:15+05:30) com pais `39117f9` e `170aabf`. Há três commits-raiz:
- `2f769d4` (“Initial commit”, 2025-12-18);
- `e3fc9f7` (“Initial commit for Flowboard project”, 2025-12-18), unido ao primeiro em `c78acee`;
- `39117f9` (“Final Project Commit”, 2026-01-23), raiz isolada com o projeto inteiro.

A árvore do SHA difere de `39117f9` só pela adição de `frontend/.env` e difere de `170aabf` em 53 caminhos (`git diff --name-only`). `git rev-list --count` no SHA: 72 commits, 2 merges. Todos os commits são de Ark Mani `<arkmanimishra@gmail.com>`. Na linha de `170aabf`, 57 dos 70 commits têm data de 2026-01-14 e vários carimbos no mesmo segundo, com mensagens “chore: … placeholder/stubs” (`git log --format`). O padrão é compatível com commits gerados em lote, mas os metadados não provam isso.

`frontend/node_modules`, `README.md` e `frontend/src` entram pela raiz `39117f9`, pela simplificação padrão do `git log`. `git log --full-history -- README.md` mostra também `55bc72b` (2026-01-14) na outra linha. Não há indício de código de terceiro além das dependências npm versionadas. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend: SPA com uma raiz e um `package.json` (`frontend/index.html:9–10`; `frontend/package.json:6–11`; `README.md:48`). Não existe configuração de composição referenciando unidades externas (busca registrada). |
| Q2 | No | Sem duas unidades, não há entradas ou builds independentes; os fontes só importam módulos locais e pacotes npm (`frontend/src/main.tsx:3`; `frontend/src/App.tsx:1–3`). |
| Q3 | No | O “APP SHELL” é o componente raiz `App` da própria SPA (`frontend/src/App.tsx:4339–4341`), sem carregar ou montar unidades distintas. |
| Q4 | No | Nenhum mecanismo de composição está configurado; `single-spa` não está declarado nem resolvido (busca no SHA e no lockfile). |
| Q5 | No | Q1–Q4 são No: SPA monolítica com backend, captada pela expressão “Single SPA”. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”. Não há preparo para host externo, então `MFE-unit` não se aplica.
- O sinal da busca é lexical: “Single SPA” (`README.md:48`) descreve uma SPA única e não menciona o framework single-spa. Diferentemente de 089/100 ou 097/103/104, não há sequer dependência ou configuração MFE a avaliar.
- `repo_type: example`: a descrição do repositório o apresenta como projeto de capstone, e o histórico termina em “Final Project Commit”. É um trabalho acadêmico, como o exercício de 094, não uma implantação operacional observada.
- `ui_technologies: [react]` (`frontend/package.json:14–15`). `build_tools: [vite]`: os scripts chamam o Vite diretamente (`frontend/package.json:7–9`), ainda que sem arquivo de configuração. `frontend_units: 1` / `single-unit`.
- Não há decisão aberta: nenhum iframe, link entre aplicações ou composição em build time.

## Notas para análise

- **RQ1 (sinais enganosos):** a consulta de tecnologia `"single-spa"` casa a frase comum “Single SPA”, porque a busca de frase do GitHub ignora o hífen. É um falso positivo lexical recorrente em potencial para essa consulta.
- **Protocolo (completude):** o repositório versiona `frontend/node_modules` (5.723 arquivos), `__pycache__` e `backend/storage`. Buscas textuais precisam excluí-los para não confundir dependências com código próprio. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, `example`, uma unidade React/Vite e `single-unit`; sem decisão aberta. Ajustes, sem efeito na classe: (1) proveniência: o acerto de "single-spa" é inferência compatível com o único texto observado ("single SPA" como página única), sem afirmar regra geral de hífen do GitHub; mesma família de falso positivo de 110 e 124; (2) `tsc -b` não tem `tsconfig` de projeto versionado (os `tsconfig` do snapshot estão todos em `frontend/node_modules`), então o build não foi demonstrado; (3) `FILE_GUIDE.md:209` cita `#app`, enquanto `index.html` e `main.tsx` usam `#root`; os artefatos executáveis concordam entre si; (4) autoria: conservada a ressalva sobre a simplificação dos logs, acrescida do histórico completo por pasta, que mostra fontes e dependências já na linha de dezembro; não se infere origem ou autoria intelectual do padrão de datas.

---
schema: 1
id: 1140120830
full_name: janMoudry/Fluxa
url: https://github.com/janMoudry/Fluxa
commit: 4f585be3a7ef8ffe1d7456a68ebb0ed74aa1ef52
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
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

# 346 — janMoudry/Fluxa

## Contexto

Biblioteca TypeScript publicada como `@jan.moudry/fluxa` (`package.json:2–18`): um event bus tipado com propagação em memória, entre abas (`BroadcastChannel`) e entre frames (`postMessage`), “designed for embedded widgets, micro-frontends, and apps that need cross-context event routing” (`README.md:1–17`). Não há aplicação frontend; as páginas HTML em `e2e/pages/` são fixtures de teste Playwright. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:347` registra rank 346, ID 1140120830, status `cloned`, branch `production` e o commit do front matter, que é o HEAD do clone e de `origin/production`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:347` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23796` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:23803` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-01` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:30:33.914Z / 2026-10-08T15:57:37.603Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:52.560Z / 2026-10-08T16:07:52.165Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 129;
- criação em 2026-01-22T21:17:31Z, push em 2026-01-23T19:20:31Z.

Grafias no README: “micro-frontends” em `README.md:8` e `README.md:94` (“Built for widgets, micro-frontends, and SDKs”). O singular não aparece literalmente no README; aparece como keyword em `package.json:44`, fora dos campos buscados. Esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é `3422879` (2026-01-23), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 46 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `src/` (core, transports, utils), testes Vitest, testes Playwright com páginas HTML de fixture em `e2e/`, workflows de CI e arquivos de cache do npm versionados (`.npm/_cacache/…`). | contrária |
| Biblioteca | `package.json:2–18`: pacote com `main`/`module`/`types` em `dist/` e `exports`. `src/transports/PostMessageTransport.ts`, `BroadcastChannelTransport.ts` e `MemoryTransport.ts`: canais de comunicação. | contrária |
| Fixtures | `e2e/pages/host.html:9–35`: página de teste com `<iframe>` e `bus.registerFramePeer(...)`, usada para validar a propagação entre frames. São cenários de teste da biblioteca, não unidades de aplicação. | contexto |

## Autoria e histórico

Clone não raso; 15 commits, 2 merges de PR feitos na interface do GitHub, de 2026-01-22 (`74094d0`, “first commit”) a 2026-01-23 (SHA `4f585be`). Os autores aparecem como “jan.moudry”, “Jan Moudrý” e “moudryJan”. O branch padrão é `production`, o único remoto. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Nenhuma unidade frontend; é uma biblioteca de comunicação. |
| Q2 | No | Sem unidades, não há independência a avaliar. |
| Q3 | No | Não há host, shell ou configuração raiz de aplicação; as páginas de `e2e/` são fixtures de teste. |
| Q4 | No | O repositório oferece um mecanismo de comunicação, não uma composição configurada entre unidades. |
| Q5 | No | Q1–Q4 são No: biblioteca de apoio a micro-frontends. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE frameworks and libraries (e.g., single-spa itself, federation plugins)”.
- Mesmo enquadramento de 204 e 249 (ferramentas e bibliotecas do ecossistema).
- **Campos:** `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: []`, `build_tools: []`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** biblioteca que se apresenta como feita para micro-frontends casa as consultas terminológicas.
- **Protocolo (busca):** o hit singular não tem grafia literal no README. O branch padrão é `production`. A elegibilidade muda de `unknown` (001) para `pass` (002).

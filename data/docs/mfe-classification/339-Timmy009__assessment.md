---
schema: 1
id: 1104937309
full_name: Timmy009/assessment
url: https://github.com/Timmy009/assessment
commit: 98ad61aa1d535c30a43fe1b9ee0841ffc910f724
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 339 — Timmy009/assessment

## Contexto

Dashboard de criptomoedas em tempo real com Next.js 16, React 19, WebSocket, Zustand e Recharts (`README.md:1–3`): uma única aplicação Next com App Router, rotas de API próprias e testes Jest. Micro-frontends aparecem só como possibilidade futura (`README.md:405–406`). O README manda clonar outro repositório (`WapSecure/Trading-Dashboard-`, `README.md:9–10`), e o histórico traz commits de outro autor antes do titular. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:340` registra rank 339, ID 1104937309, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:340` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:21531` (`terminology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:21537` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `terminology-micro-frontend-repositories#created:2025-11` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T22:28:19.008Z / 2026-10-08T15:56:49.264Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `terminology-micro-frontends-repositories#created:2025-11` | `"micro frontends" in:name,description,readme pushed:>=2025-04-01 created:2025-11-01..2025-11-30` | 2026-10-07T22:58:23.165Z / 2026-10-08T16:07:17.586Z |

Metadados do hit: descrição nula, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 172, criação em 2025-11-26T22:50:21Z, push em 2025-11-26T22:54:12Z.

A única ocorrência do termo é `README.md:406` (“Micro-frontend architecture possible”, sob “Future Ready:”, `:405`), singular e hifenizada, com o hífen tratado como separador. O plural “micro frontends” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A última alteração do README é o próprio SHA `98ad61a` (2025-11-26), anterior às coletas de 7 e 8 de outubro de 2026; não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 64 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único `package.json` na raiz e um único App Router em `app/` (páginas, componentes, hooks, stores, providers, rotas de API e testes). | contrária |
| Configuração | `package.json:5–14`: `next dev`/`next build`/`next start` e Jest; `:15–24`: Next 16, React 19, React Query, Zustand, Recharts. `next.config.ts:3–5`: configuração vazia. Nenhuma dependência ou plugin de composição. | contrária |
| Código-fonte | `app/layout.tsx:14–25`: um layout raiz com providers; `app/page.tsx:23–28`: link para `/dashboard`; `app/dashboard/page.tsx:3–21`: importa estaticamente `TradingDashboard` e demais componentes do próprio `app/`. | contrária |
| Código-fonte (fronteiras) | Busca por `../` em `*.ts`/`*.tsx`: só imports internos (testes para o componente vizinho e `app/providers/WebSocketProvider.tsx:12` → `app/stores/alert-store`). Há um só projeto; não há fronteira entre unidades. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile e README, por `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `iframe`, `customElements`, `qiankun` e `micro.?front`: nenhuma ocorrência; o lockfile não tem `node_modules/@module-federation` nem `single-spa`. | ausente |
| Documentação | `README.md:405–406`: micro-frontends como possibilidade futura. | fraca |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 8 commits alcançáveis (8 em todos os refs), nenhum merge. Os sete primeiros, de 2025-11-10 a 2025-11-11, são de `wapsecure` (dois e-mails), a partir de `408a10a` (“Initial commit from Create Next App”) e `414e789` (“feature: Real-time cryptocurrency trading dashboard”, 52 arquivos); o SHA `98ad61a` (2025-11-26, “fix: resolve all test failures and apply senior engineer standards”, 28 arquivos) é de `Timileyin Bamgbose`, com e-mail de máquina local. O histórico foi trazido de outro autor; a URL de clone no README aponta para `WapSecure/Trading-Dashboard-` (`README.md:9–10`), não inspecionado. Os metadados não permitem separar o que é autoria do titular. `git rev-list --objects $SHA --missing=print` identifica 53 objetos históricos ausentes; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend (um `package.json`, um App Router); nenhuma configuração de composição (busca registrada). |
| Q2 | No | Não há duas unidades a avaliar. |
| Q3 | No | O layout raiz e as páginas pertencem à mesma aplicação (`app/layout.tsx:14–25`; `app/dashboard/page.tsx:3–21`). |
| Q4 | No | Nenhum mecanismo de composição; micro-frontends são possibilidade futura (`README.md:406`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”.
- Não é `MFE-unit`: a aplicação não exporta contrato para host externo.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: [react, next]`, `build_tools: []` (bundler encapsulado pelo Next, sem configuração explícita), `repo_type: example` (aplicação de demonstração; o commit do titular cita “senior engineer standards”, compatível com avaliação técnica, sem que isso seja afirmado no README lido).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** menção a micro-frontends em lista de “Future Ready” do README de uma aplicação monolítica.
- **Protocolo (terceiros e duplicatas):** histórico de outro autor (`wapsecure`) com a URL de clone de `WapSecure/Trading-Dashboard-` no README; `WapSecure/Trading-Dashboard-` também está nas rodadas (`data/discovery/mfe-round-002/candidates.csv:20944`), fora da amostra e não inspecionado; este candidato é provável cópia com um commit adicional, o que a filtragem automática não agrupou.

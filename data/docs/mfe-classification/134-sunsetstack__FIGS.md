---
schema: 1
id: 987231654
full_name: sunsetstack/FIGS
url: https://github.com/sunsetstack/FIGS
commit: 60fcd717bc5c2116dc6294fffd397406641f0598
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: production
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

# 134 — sunsetstack/FIGS

## Contexto

Sistema de microsserviços para dados do mercado cripto (coleta, persistência em TimescaleDB, API de consulta, scraping e análise de sentimento), em um monorepo npm workspaces orquestrado por Docker Compose (`README.md:1–4`; `README.md:25–33`; `package.json:6–14`). A única UI é o workspace chamado `micro-frontend`, uma SPA React/Vite que consome a `signal-query-api` (`README.md:30`). “Micro-frontend” aqui nomeia o serviço frontend dentro de uma arquitetura de microsserviços de backend; não há composição de unidades frontend. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:135` registra rank 134, ID 987231654, branch `master`, status `cloned` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:135` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14177` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:14183` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-05` | `"micro frontend" in:name,description,readme pushed:>=2025-04-01 created:2025-05-01..2025-05-31` | 2026-10-07T22:21:59.654Z / 2026-10-08T15:54:21.435Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-05` | `"micro frontends" … created:2025-05-01..2025-05-31` | 2026-10-07T22:53:32.599Z / 2026-10-08T16:05:43.863Z |

Metadados do hit: descrição “Crypto market analysis platform with microservices architecture”, sem tópicos, linguagem TypeScript, `fork: false`, criação em 2025-05-20T19:12:48Z, push em 2026-05-28T10:24:12Z. A descrição não contém o termo. Por eliminação, o acerto vem de `README.md:30`, “- **micro-frontend**: Displays data from signal-query-api”: o nome do serviço, no singular e com hífen. Não há forma plural no README; o hit de `"micro frontends"` depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração de `README.md` alcançável é `7537aa4` (Dimitar Kolarov, 2025-08-30T19:55:00+03:00). Ela e o SHA (2026-01-29) antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas. O `pushed_at` dos metadados (2026-05-28) é posterior ao SHA, por pushes em outros refs (`origin/development`, `origin/v2`), cujo conteúdo não foi considerado.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 178 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Os workspaces são `common`, `data-collector`, `signal-persister`, `signal-query-api`, `micro-frontend`, `scraper-service` e `seeder` (`package.json:6–14`), além de `sentiment-analysis-service` (Python) e `timescaledb-init`. Só `micro-frontend` tem `index.html` e configuração de bundler; os outros são serviços Node/Nest/Python. Nenhum `vite.config` ou `webpack.config` além de `micro-frontend/vite.config.ts` em toda a história alcançável (`git log --name-only`). | contrária |
| Código-fonte (UI) | `micro-frontend/index.html:10–11`: uma raiz `#root` carregando `/src/main.tsx`. `micro-frontend/src/main.tsx:4–9` renderiza `App`. `micro-frontend/src/App.tsx:1–25` alterna entre `DashboardPage` e `IndicatorsPage` locais por estado (`useState<Page>`), sem roteamento entre aplicações. | contrária |
| Configuração / Build/deploy | `micro-frontend/vite.config.ts:5–15`: plugins React e Tailwind e proxy `/api`, sem federação. `micro-frontend/package.json:6–11`: `vite`/`vite build`. `micro-frontend/micro-frontend.dockerfile:20–28` constrói só esse workspace e o serve por nginx, e `micro-frontend/nginx.conf:8–14` faz fallback SPA e proxy `/api/` para `signal-query-api`. `docker-compose.yml:157–163` expõe o serviço `micro-frontend` em `3001:80`. | contrária |
| Código-fonte (fronteiras) | Busca por `../` em `micro-frontend` (exceto lockfile): todos os imports relativos, inclusive `../../` (por exemplo, `micro-frontend/src/components/Chart/FinancialChart.tsx:16–17`), apontam para `types/`, `contexts/` e outros diretórios de `micro-frontend/src`. `micro-frontend/package.json:13` declara `@financialsignalsgatheringsystem/common`, mas nenhum fonte de `micro-frontend/src` o importa. Não há segunda unidade frontend cuja fronteira pudesse ser atravessada. | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfiles, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie` e `exposes`. Os acertos são só o nome do workspace e do serviço (`README.md:30`, `package.json:11`, `docker-compose.yml:157–161`, `tsconfig.json:8`, `eslint.config.js:54` e as linhas `COPY micro-frontend/package.json` dos Dockerfiles). Os dois lockfiles não contêm `federation` nem `single-spa`. | ausente |
| Documentação (arquitetura) | `README.md:25–33` lista sete “Microservices”, um deles o frontend. `micro-frontend/README.md:1–8` é o README padrão do template React + TypeScript + Vite. `micro-frontend/index.html:7` mantém o título “Vite + React + TS”. | contexto |

## Autoria e histórico

Clone não raso. `git rev-list` no SHA: 417 commits, 89 merges, raiz `c9e5538` (danzin, 2025-05-20, “initial commit with a starter and a single data gathering point”). O SHA é o merge do PR #86 (`danzin/development`) por “Sunrise” em 2026-01-29T14:01:41+02:00. Autores:
- `danzin <excl.d.k@gmail.com>`: 302;
- `Dimitar Kolarov <danzin@users.noreply.github.com>`: 112;
- `Sunrise <excl.d.k@gmail.com>`: 2;
- `google-labs-jules[bot]`: 1.

Os três primeiros compartilham e-mail ou login (`excl.d.k@gmail.com`, `danzin`), o que indica o mesmo titular. Por pasta, `micro-frontend` tem 73 commits, todos de `danzin`; `micro-frontend/package.json` e `vite.config.ts` entram em `dcbe8ec` (2025-06-16, “inital starter for the frontend service”). Os metadados mostram um único frontend evoluindo como serviço do monorepo, sem divisão posterior em unidades. Refs `origin/development` (`2620af2`) e `origin/v2` (`c1bbdd9`) existem; seu conteúdo não foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend, o workspace `micro-frontend` (`micro-frontend/index.html:10–11`; `micro-frontend/package.json:6–11`). Os demais workspaces são serviços backend. Não existe configuração de composição que referencie unidades externas (busca registrada). |
| Q2 | No | Sem duas unidades frontend, não há entradas ou builds frontend independentes a comparar; a independência de build e deploy (`micro-frontend/micro-frontend.dockerfile:20–28`) é entre o frontend e os serviços backend. |
| Q3 | No | Nenhum host ou shell carrega unidades. `micro-frontend/src/App.tsx:15–24` alterna páginas locais do mesmo app. |
| Q4 | No | `micro-frontend/vite.config.ts:5–15` não configura composição, e nenhum mecanismo foi encontrado. O nginx só faz proxy para a API (`micro-frontend/nginx.conf:12–14`). |
| Q5 | No | Q1–Q4 são No: SPA única nomeada “micro-frontend” dentro de um sistema de microsserviços backend. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths”: uma SPA convencional, ainda que implantada como serviço independente.
- `MFE-unit` não se aplica: o checklist exige uma unidade “explicitly prepared to be composed by an external host (e.g., Module Federation `exposes`, exported single-spa lifecycles)”. Aqui não há `exposes`, lifecycles ou export para host; a SPA monta a própria raiz (`micro-frontend/src/main.tsx:6–9`) e é servida como site completo (`micro-frontend/nginx.conf:8–10`). Por isso Q2–Q4 são No, não Undetermined.
- O nome do workspace funciona como rótulo, como as autodeclarações de 023/129, só que no nome do serviço e não em texto descritivo. Diferentemente de 097/103/104, não existe configuração MFE, nem quebrada.
- `repo_type: production`: sistema de uso próprio em evolução contínua, com Docker Compose completo e implantação planejada (`README.md:19–22`), não exemplo didático nem template. A implantação não foi verificada. `ui_technologies: [react]`, `build_tools: [vite]` (`micro-frontend/vite.config.ts:1–6`), `frontend_units: 1` e `single-unit`: a unidade única fica num monorepo de serviços, mas como única unidade frontend.
- Não há decisão aberta: nenhum iframe, link entre aplicações ou composição em build time.

## Notas para análise

- **RQ1 (sinais enganosos):** “micro-frontend” como nome de pasta, pacote e serviço Docker para o único frontend de uma arquitetura de microsserviços. O termo aparece em README, manifestos, compose, tsconfig, ESLint e Dockerfiles, o que infla buscas textuais sem nenhum mecanismo de composição.
- **Protocolo (busca):** o acerto vem do nome do serviço em `README.md:30`. O hit no plural não tem grafia correspondente. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com Non-MFE, Q1–Q5 No, uma unidade React/Vite e `single-unit`; o workspace `micro-frontend` é uma SPA completa sem preparo para host nem composição com outra unidade, e o proxy de `/api` para `signal-query-api` é comunicação com backend. Registros: 417 commits, 89 merges; `micro-frontend` tem 73 commits, todos de `danzin`, e `package.json` e `vite.config.ts` entram em `dcbe8ec` (2025-06-16); a mesma conta aparece com dois nomes/e-mails, sem provar autoria intelectual. O README (`README.md:30`, último commit `7537aa4`, 2025-08-30) é anterior às buscas, e a origem do acerto é inferência por eliminação. O `pushed_at` do hit (2026-05-28) é posterior ao SHA; as refs `origin/development` e `origin/v2` não foram usadas. `repo_type: production` é razoável pela descrição de plataforma com serviços integrados, mas o README da UI ainda é de template e a implantação AWS é planejada (`README.md:19–22`); o rótulo não prova operação em produção.

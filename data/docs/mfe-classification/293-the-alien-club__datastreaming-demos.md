---
schema: 1
id: 1080315685
full_name: the-alien-club/datastreaming-demos
url: https://github.com/the-alien-club/datastreaming-demos
commit: 9d93211bf02f2a23a09a10c732649e524e273af1
classification: Non-MFE
checklist: { q1: yes, q2: yes, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [react, next]
build_tools: []
frontend_units: 5
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 293 — the-alien-club/datastreaming-demos

## Contexto

Coleção de demos da plataforma Alien Intelligence Data Streaming (`README.md:1–3`): cinco aplicações Next.js independentes, cada uma em sua pasta (`alien-agents/`, `avatar/`, `bnf/`, `openaire/packages/frontend/`, `publisher-demo/`), mais serviços sem UI (`bnf/broker`, `bnf/worker-v2`, `openaire/packages/mcp`, `openaire/packages/viz-mcp`). Três delas são publicadas no mesmo host (`demo.alien.club`) sob prefixos distintos por VirtualServices Istio separados; a quarta (`bnf`) tem subdomínio próprio e `avatar` não tem chart. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:294` registra rank 293, ID 1080315685, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução, acesso à rede ou leitura do submódulo.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:294` registra a estratégia `broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:20110` (`broader`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:20116` (`broader`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `broader-frontend-orchestration#created:2025-Q4` | `"frontend orchestration" in:name,description,readme pushed:>=2025-04-01 created:2025-10-01..2025-12-31` | 2026-10-07T23:41:29.688Z / 2026-10-08T16:24:05.096Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, licença MIT, `fork: false`, tamanho 22303;
- criação em 2025-10-21T07:35:39Z, push em 2026-07-22T15:51:04Z.

A grafia “frontend orchestration” não aparece literalmente. A única ocorrência de “orchestrat” no README é `README.md:41`: “The frontend orchestrates 5 specialized agents that call a dedicated MCP server” (demo OpenAIRE), em que um frontend orquestra agentes de IA, não unidades frontend. O acerto depende do processamento textual da busca do GitHub (flexão), que não está registrado.

A última alteração alcançável do README é `dc7e52b` (2026-06-08), anterior às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1247 entradas, 1232 arquivos regulares `100644`, 14 executáveis `100755`, zero symlinks e 1 gitlink (`160000`), `openaire/environment/plugin`, submódulo de `the-alien-club/claude-marketplace` (`.gitmodules:1–4`), não percorrido. Não há `workspaces` nem orquestrador de monorepo na raiz; cada projeto tem `package.json` próprio. | contexto |
| Estrutura (unidades frontend) | Cinco apps Next.js com scripts `dev`/`build`/`start` próprios: `alien-agents/package.json` (Next 16.2.4), `avatar/package.json` (15.5.6), `bnf/package.json` (16.2.9), `openaire/packages/frontend/package.json` (14.2.15, React 18) e `publisher-demo/package.json` (16.2.4). `bnf/broker`, `bnf/worker-v2`, `openaire/packages/mcp` e `openaire/packages/viz-mcp` são servidores `tsx`/`tsc` sem UI. `bnf/design/` (31 arquivos) é um pacote de handoff de design, com `support.js` gerado (`bnf/design/support.js:1`), não uma app. | contexto |
| Documentação | `README.md:5–114` apresenta quatro demos distintas (Alien Agents, OpenAIRE, Avatar, Publisher Demo), cada uma com tech stack e “Quick Start” próprios; não descreve uma aplicação única nem navegação entre elas. | contrária |
| Build/deploy (mesmo host) | `alien-agents/helm/alien-agents-chart/values.yaml:36–39`: `demo.alien.club`, `path: /agents`, `gateway: shared`. `openaire/helm/openaire-chart/values.yaml:22–23`: `demo.alien.club`, `/openaire`. `publisher-demo/helm/publisher-demo-chart/values.yaml:17–26`: no mesmo host, toma o catch-all `/` e o comentário afirma que “the two existing demos keep their routes and everything else lands here”; `publisher-demo/helm/DEPLOY.md:4–5` repete a coexistência. Cada chart tem seu próprio VirtualService (por exemplo, `openaire/helm/openaire-chart/templates/virtualservice.yaml:11–25`, roteando o prefixo ao serviço próprio). | ambígua |
| Configuração (basePath) | `alien-agents/next.config.ts:7`, `14`: `basePath` de `NEXT_PUBLIC_BASE_PATH`, fixado em `/agents` no build (`alien-agents/Dockerfile:20–21`). `openaire/packages/frontend/next.config.mjs:4–6` e `lib/basePath.ts:5–8`: `/openaire` em produção. `bnf/next.config.ts:26–52` e `publisher-demo/next.config.ts:3–9`: sem `basePath`. Nenhum `rewrites`, `assetPrefix` ou proxy para outra app em qualquer `next.config`. | contrária |
| Código-fonte (navegação) | Busca por literais `/agents` e `/openaire` (com ou sem `https://demo.alien.club`) em `publisher-demo`, `avatar`, `bnf` e `openaire/packages/frontend`, fora de Markdown e lockfiles: só ocorrências internas do próprio `openaire` (`lib/basePath.ts:7`; comentário em `app/api/auth/[...all]/route.ts:9`). Em `publisher-demo`, as menções a `openaire`/`bnf` são nomes de servidores MCP no cálculo de preços (`publisher-demo/app/api/demo/pricing/route.ts:175–180`), não links de UI. Nenhuma app linka, carrega ou embute outra. | ausente |
| Código-fonte (fronteiras) | Varredura de todos os especificadores relativos (`./`, `../`) em `*.ts`, `*.tsx`, `*.js`, `*.mjs`, `*.jsx`, `*.cjs` e `*.css` do SHA (811 especificadores), resolvidos contra a raiz de cada projeto: nenhum sai do projeto de origem. Os `../../` encontrados (por exemplo, `alien-agents/app/api/chat/cancel/route.ts:3`) ficam dentro da própria app. Cada `tsconfig.json` mapeia `@/*` para `./*` do próprio projeto (por exemplo, `alien-agents/tsconfig.json:21–22`). | contexto |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfiles, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `qiankun`, `wujie`, `systemjs`, `loadRemote`, `registerApplication`, `multi.?zone` e `assetPrefix`: só `customElements.get` no runtime gerado de design (`bnf/design/support.js:1095–1135`) e um falso positivo (`openaire/packages/mcp/src/utils/sanitize.ts:20`). `<iframe`: nenhuma ocorrência. `package.json`/lockfiles por `@module-federation`, `single-spa`, `qiankun`, `@originjs`: nenhuma. | ausente |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 414 commits alcançáveis a partir do SHA (447 em todos os refs), 11 merges, raiz `7771f68` (2025-10-21, “Initial commit”, Xqua). O SHA é o merge do PR #3 (`feature/bnf-prod-cutover-config`, 2026-07-22, autor Xqua, committer GitHub). Há 17 refs remotos `feature/*`, `fix/*` e `staging`, cujo conteúdo não foi considerado.

Autoria por metadados: Leo, com dois e-mails (`leo@jogl.io`, 380 commits; `leo@alien.club`, 13), concentra quase todo o histórico; seguem `nomeforme` (15), Xqua com dois e-mails (4) e `yoratoni` (2). Pelo `git log --no-renames` por pasta, as demos entram em momentos diferentes: `avatar` em 2025-10-21 (7 commits), `openaire` em 2025-12-01 (64), `alien-agents` em 2026-05-29 (20 sob esse nome; o README a descreve como antigo “LDS Chatbot”, `README.md:11`), `publisher-demo` em 2026-06-08 (37) e `bnf` em 2026-06-18 (150). A sequência é de demos acrescentadas uma a uma, não de uma aplicação decomposta. Os metadados não separam autoria intelectual; `CLAUDE.md` e `.claude/skills` em `alien-agents/` indicam uso de assistente de código. Nenhum blob histórico foi lido. `git rev-list --objects $SHA --missing=print` identifica 3074 objetos históricos ausentes; os arquivos do SHA citados foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Cinco unidades frontend identificáveis no repositório: `alien-agents`, `avatar`, `bnf`, `openaire/packages/frontend` e `publisher-demo`, cada uma com `package.json` e scripts Next próprios. Q1 conta unidades identificáveis no repositório, referenciadas ou não por configuração de composição (cf. 146). |
| Q2 | Yes | Entrada e build próprios por app (`next build` em cada `package.json`; Dockerfiles e charts separados) e nenhum import de código-fonte entre elas (varredura de especificadores relativos; `@/*` local em cada `tsconfig.json`). |
| Q3 | No | O README apresenta demos distintas (`README.md:5–114`); nenhuma app carrega, monta ou linka outra. A publicação de três delas no mesmo host é coexistência declarada (`publisher-demo/helm/publisher-demo-chart/values.yaml:19–23`), sem shell, host ou root config comum. |
| Q4 | No | Nenhum mecanismo de composição frontend configurado (busca registrada); os `basePath` só isolam cada app sob seu prefixo, sem `rewrites`/`assetPrefix` de uma app para outra. |
| Q5 | No | Q3 e Q4 são No: coleção de demos independentes. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “monorepos containing several unrelated frontend applications” e a “multiple frontend applications without explicit composition”.
- O roteamento por prefixo no gateway Istio de `demo.alien.club` distribui requisições entre produtos diferentes no mesmo domínio, configurado separadamente por chart; não há shell nem navegação entre eles. Como no final 028, roteamento de infraestrutura não é composição de unidades. O contraste com 013 (Multi-Zones) é que lá um shell próprio declara `rewrites` para zonas com `assetPrefix` e liga as zonas por links de um mesmo produto; aqui não há nenhum dos três.
- Não é `MFE-unit`: nenhuma app exporta contrato para host externo. Não há cadeia parcial (097/103/104), federação para code sharing (089/100) nem unidade de terceiros composta (102/074/080). O submódulo (`openaire/environment/plugin`) aponta a um marketplace de plugins do assistente de código, não a uma unidade frontend.
- `frontend_units: 5`, `unit_organization: monorepo`, `ui_technologies: [react, next]` (como em 013), `build_tools: []` (bundler encapsulado pelo Next, sem configuração explícita de bundler), `repo_type: example` (“Collection of demo applications”, `README.md:3`).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “frontend orchestrates … agents” (`README.md:41`) casa a consulta ampla `"frontend orchestration"` por flexão; trata de orquestração de agentes de IA.
- **RQ3 (gateway ≠ shell):** vários produtos sob o mesmo host com prefixos (`/agents`, `/openaire`, `/`) por VirtualServices independentes. Se o pesquisador quiser tratar co-hospedagem por prefixo como sinal de composição por rota, o caso deve ser reavaliado junto com 013 (ainda `review`); pela evidência do snapshot (produtos distintos, sem shell nem links), não foi tratado assim.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001, `activity_incomplete`) para `pass` (002).

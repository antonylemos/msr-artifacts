---
schema: 1
id: 1147440284
full_name: electometro-org/app
url: https://github.com/electometro-org/app
commit: 2ca538163085797c8eac3b8a3aa7138389b24e3c
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

# 192 — electometro-org/app

## Contexto

“Electometro” (homepage `electometro.org`): webapp React + Vite de alinhamento eleitoral, um quiz com resultados, eleições do Peru e do Chile, implantada no Cloudflare Workers. Há uma única aplicação frontend. Ativos e configuração do Worker vêm de dois submódulos (`external/peru-assets`, `external/cf-workers`). Uma configuração Vercel com microfrontends existiu e foi removida (ADR 0002, `docs/DECISIONS/0002-architecture-refactor.md:30–31`; `CHANGELOG.md:38–39`). O README ainda diz que a SPA é às vezes montada sob o sub-caminho `/electometro` de um “host microfrontend” (`README.md:299–301`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:193` registra rank 192, ID 1147440284, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede; os submódulos não foram obtidos.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:193` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24254` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:24261` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-02` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:59:56.167Z / 2026-10-08T15:41:20.219Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:11:17.037Z / 2026-10-08T15:49:10.515Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-02-01..2026-02-28`.

Metadados do hit:
- descrição “Voting Alignment WebApp”, sem os termos;
- sem tópicos, linguagem JavaScript, `fork: false`, tamanho 1.396;
- criação em 2026-02-01T18:43:40Z, push em 2026-10-04T19:49:30Z.

O acerto vem de `README.md:301`, “microfrontend. Hash routing avoids server rewrite requirements for deep links.”, continuação de “mounted under a sub-path (`/electometro`) of a host” (`README.md:300`). A forma “microfrontends” não aparece no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README no histórico do SHA é `eb3d4b6` (2026-08-04), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas. O `pushed_at` (2026-10-04) corresponde a algum dos branches remotos, não ao SHA (2026-08-04).

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 152 entradas, 150 arquivos regulares `100644` e **2 gitlinks `160000`**: `external/cf-workers` (`dea6a02…`) e `external/peru-assets` (`ada4e0d…`), declarados em `.gitmodules:1–8` (repositórios `electometro-org/cf-workers` e `electometro-org/peru`). Os objetos não estão no clone. Zero symlinks versionados; os symlinks `public`, `i18n` e `wrangler` para os submódulos são criados localmente (`AGENTS.md:24–27`). Há uma única aplicação em `src/` (contextos, hooks, widgets, eleições). | contexto |
| Configuração / Build | `vite.config.js:1–5`, `178–180`: `react()`, `legacy()`, plugin Cloudflare e `base: '/electometro/'` (`ASSETS_SUBDIR`, `:28`). `package.json:6–19`, `20–49`: `vite build` e `wrangler deploy`, sem dependência de federação, single-spa ou import maps. | contrária |
| Histórico de decisão | `docs/DECISIONS/0002-architecture-refactor.md:30–31`: “Remove the multi-target (`DEPLOY_TARGET`) matrix and Vercel/microfrontends configuration”. `AGENTS.md:28–29`, `91`: “do not reintroduce `vercel.json`, `microfrontends.json`…”, “Don't reintroduce Vercel/microfrontend config”. `CHANGELOG.md:38–39`: mesma remoção. | contrária |
| Documentação (montagem em host) | `README.md:299–301`: a SPA estática é “sometimes mounted under a sub-path (`/electometro`) of a host microfrontend”. O `base` `/electometro/` e o `HashRouter` dão suporte a essa montagem por caminho. O host não está no repositório, e nenhum artefato do snapshot configura essa integração. | ambígua |
| Busca | `git grep -i` no SHA (exceto lockfiles) por `micro.?front`, `federation`, `remoteEntry` e `single-spa`: só `README.md:301`, `AGENTS.md:29`, `91`, `CHANGELOG.md:39` e o ADR citado. | ausente |

## Autoria e histórico

Clone não raso. Há 441 commits alcançáveis a partir do SHA (37 merges; 524 em todos os refs). Os autores são `seffs`/“Seff” (noreply, 417 no total do SHA), `chrissummer1311` (23) e `nicolasleonri` (1). A raiz é `57ee939` (2026-02-04, “Initial release”); o SHA é `2ca5381` (2026-08-04, “fix(wrangler): restore wrangler.toml”). O histórico registra o deploy na Vercel (`7255e5d`, 2026-05-11, “feat: deploy into vercel”) e a revisão dessa migração (`eb5de1d`, 2026-08-04). Os oito branches remotos (`feat/*`, `architecture/analytics` etc.) não foram considerados. O `git log -S microfrontends.json` não completou por blob ausente no clone parcial (`dc1cc5d9…`), que não foi buscado; o clone ficou inalterado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; nenhuma configuração de composição no snapshot. Os submódulos são ativos e configuração de Worker, não unidades frontend. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | O repositório não contém host. A montagem sob host externo é só mencionada (`README.md:299–301`). |
| Q4 | No | Nenhum mecanismo de composição configurado; a configuração de microfrontends da Vercel foi removida (`docs/DECISIONS/0002-architecture-refactor.md:30–31`; `AGENTS.md:28–29`). |
| Q5 | No | Q1–Q4 são No: SPA única cuja integração em host é externa e só por sub-caminho. |

## Motivo

- Proposta `Non-MFE` com `status: review`. Corresponde a “conventional frontend monoliths” e, para o histórico, a “MFE-related dependencies that are unused”: a configuração de microfrontends existiu e foi deliberadamente removida.
- A revisão se justifica pela frase do README sobre montagem sob o sub-caminho de um “host microfrontend”, junto com `base: '/electometro/'`. Isso é composição por caminho (roteamento/link no host), o tipo da decisão aberta do checklist “Link-only or iframe composition”, aqui sem host nem configuração observáveis.
- Não se aplica MFE-unit com segurança: a preparação é só servir a SPA sob um caminho base, sem `exposes`, lifecycles, custom element ou registro.
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`, `build_tools: [vite]`. `repo_type: production` (site público, deploy em Cloudflare).

## Notas para análise

- **RQ1 (sinais enganosos):** projeto que abandonou uma configuração de microfrontends (Vercel) mas mantém referências no README, no ADR, no CHANGELOG e nas instruções de agente.
- **RQ3:** o histórico registra a passagem por microfrontends da Vercel e o retorno a build único. Pode interessar como caso de reversão, fora do snapshot.
- **Protocolo (busca):** o hit plural não tem grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Ponto para revisão conjunta

Decidir se a menção a montagem sob o sub-caminho de um host externo (`README.md:299–301`), com `base` dedicado e sem configuração de composição no snapshot, basta para tratar o repositório como unidade preparada para composição.

- **Non-MFE (proposto):** não há mecanismo configurado; a configuração MFE foi removida (ADR 0002), e o caso se reduz a uma SPA servida sob caminho.
- **MFE-unit:** se a composição por caminho (zonas, links) contar como mecanismo e o `base` com `HashRouter` for preparação explícita para o host externo.

Não se propõe regra nova. Até a decisão, preservar `Non-MFE`/`review`.
- **Contribuição da revisão independente (Lupa):** concordância com Non-MFE (provisória) e `review`; não há base para promover a `final`. Q1 a Q5 No descrevem corretamente o snapshot pela leitura literal do checklist; a alternativa real é MFE-unit por montagem em subcaminho: o README diz que a SPA às vezes é montada sob `/electometro` de um host microfrontend (`README.md:299–301`), o Vite configura esse `base` (`vite.config.js:212–221`) e a aplicação usa `HashRouter`. O repositório não contém a configuração do host, e o checklist deixa em aberto se composição por caminho conta; a questão não resolvida é essa regra, e não uma configuração MFE cujo uso seja obscuro. Os submódulos ausentes são identificados como ativos de tradução e backend/Worker (`external/peru-assets`, `external/cf-workers`), não como aplicações frontend nem remotes. Correções de rastreabilidade: Q1, Q2 e Q5 devem citar `src/main.jsx:13–31`, `src/App.jsx:2,302–328` e `vite.config.js:212–221`; os symlinks `public`, `i18n` e `wrangler` descritos em `AGENTS.md:25–27` não existem no clone inspecionado (os submódulos estão vazios), e devem ser apresentados como configuração esperada não materializada, não como conteúdo observado no checkout, de modo que o build e a configuração externos não foram integralmente resolvidos offline. A busca histórica `git log -S'microfrontends.json'` e a travessia ampla de `git log --name-status` falham por blobs promisor ausentes (`dc1cc5d…`, `aacaae4…`), e os refs locais mostram 16 branches além de `origin/HEAD`.

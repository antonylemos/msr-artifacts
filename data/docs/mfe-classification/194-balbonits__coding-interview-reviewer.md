---
schema: 1
id: 1221149467
full_name: balbonits/coding-interview-reviewer
url: https://github.com/balbonits/coding-interview-reviewer
commit: 9b5689881e324f0c8d6c07423ba86bc5b3782430
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 194 — balbonits/coding-interview-reviewer

## Contexto

“Coding Interview Reviewer” (`README.md:1–5`): aplicação Next.js pessoal de preparação para entrevistas de front-end, com exercícios de código ao vivo (Sandpack), notas, cursos em MDX, entrevistador simulado por IA e feed de notícias. Foi construída com assistente de código, como o próprio README declara. Micro-frontends aparecem como conteúdo de estudo: um exercício “MFE Registry” (`content/exercises/mfe-registry/`), um curso e uma nota sobre microsserviços e micro-frontends. Não há composição de frontends. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:195` registra rank 194, ID 1221149467, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:195` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:29042` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:29048` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-04` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T21:13:13.798Z / 2026-10-08T15:42:26.675Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:12:37.047Z / 2026-10-08T15:49:43.133Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-04-01..2026-04-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 1.162;
- criação em 2026-04-25T20:21:07Z, push em 2026-05-05T06:02:31Z.

O acerto vem de `README.md:61`, “| MFE Registry | Microfrontends — prefix router | vanilla-ts |”, linha da tabela de exercícios e única ocorrência. A forma singular “microfrontend” não aparece no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `1028925` (2026-04-26), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 294 entradas, 292 arquivos regulares `100644` e 2 executáveis `100755` (`scripts/dev.sh`, `scripts/restart-dev.sh`); zero symlinks e zero gitlinks. Há um único projeto Next.js (`app/`, `components/`, `lib/`, `next.config.ts`), conteúdo em `content/` (140 arquivos de exercícios, 26 de notas, 15 de cursos), testes Playwright e uma configuração SearXNG. | contrária |
| Configuração / Build | `next.config.ts:3–5`: só `reactCompiler: true`. `package.json:5–40`: Next 16.2.4, React 19, Sandpack e MDX, sem dependência de federação, single-spa ou import maps. | contrária |
| Conteúdo (sinal da busca) | `content/exercises/mfe-registry/meta.json:1–8`: exercício “Micro-Frontend App Shell Registry” (template `vanilla-ts`). `content/exercises/mfe-registry/problem.mdx:1–25`: enunciado de uma classe `MfeRegistry` (registro e resolução de rotas), com `starter.ts`, `solution.ts` e `tests.ts`. Também há `content/courses/microservices-microfrontends.mdx` e `content/notes/microservices-microfrontend.mdx`. É material de estudo executado no sandbox da aplicação. | fraca |
| Busca | `git grep -il` no SHA (exceto `package-lock.json`) por `micro.?front`, `federation`, `remoteEntry` e `single-spa`: só README e arquivos em `content/`. | ausente |

## Autoria e histórico

Clone não raso; 46 commits, 1 merge, todos de John Dilig `<balbonits@users.noreply.github.com>`, de 2026-04-25 (`61aadda`, “Initial commit: Day 1 + Day 2…”) a 2026-05-04 (SHA, “Code sandboxes (JS+Java) + typography + Compiler + notes + E2E”). `AGENTS.md` e `CLAUDE.md` e a declaração do README (`README.md:5`) indicam geração assistida por IA; os metadados não separam autoria intelectual. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação frontend; o “MFE Registry” é um exercício de conteúdo, não unidade nem configuração de composição. |
| Q2 | No | Não há segunda unidade cuja independência possa ser avaliada. |
| Q3 | No | Não há host compondo unidades. |
| Q4 | No | Nenhum mecanismo de composição configurado (`next.config.ts:3–5`; busca registrada). |
| Q5 | No | Q1–Q4 são No: aplicação de estudo cujo conteúdo inclui exercícios e notas sobre micro-frontends. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them”.
- O sinal é conteúdo e exercício, como em 023 e 094: um exercício de “app shell registry” resolvido em TypeScript puro dentro do sandbox não é composição de unidades frontend. Há uma aplicação real, por isso `frontend_units: 1` e `single-unit`.
- `ui_technologies: [react, next]`, `build_tools: []` (Next encapsula o bundler). `repo_type: other`: ferramenta pessoal de estudo.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** exercício nomeado “MFE Registry” e cursos sobre micro-frontends num app de estudo; o README casa as consultas terminológicas pela tabela de exercícios.
- **Protocolo (busca):** o hit singular `microfrontend` não tem grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância com Non-MFE e `draft`: uma única aplicação Next.js, com conteúdo didático sobre microfrontends e um exercício `MfeRegistry` executado no sandbox de código da própria aplicação, sem unidade frontend remota nem configuração que componha aplicações. As lacunas apontadas são de evidência no registro, e não ambiguidade arquitetural.

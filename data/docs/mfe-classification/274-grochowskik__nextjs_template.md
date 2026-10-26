---
schema: 1
id: 1175357381
full_name: grochowskik/nextjs_template
url: https://github.com/grochowskik/nextjs_template
commit: cee3076c8ba029e44dff35c5eb9b2e4327d48932
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 274 — grochowskik/nextjs_template

## Contexto

Template de aplicação Next.js 16 (“A production-ready Next.js starter…”, `README.md:1–3`), com camada de API, formulários tipados, Redux Toolkit, TanStack Query, biblioteca de UI, i18n e controle de acesso. O README chama a organização por features de “microfrontend-ready” (`README.md:3`, `:34`, `:148–170`) e diz que ela poderia virar Module Federation no futuro (`README.md:170`). O repositório é uma única aplicação, sem configuração de composição. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:275` registra rank 274, ID 1175357381, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:275` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:26039` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:26046` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-03` | 2026-10-07T20:32:52.350Z / 2026-10-08T15:41:53.292Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-03` | 2026-10-07T22:11:56.922Z / 2026-10-08T15:49:26.110Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-03` | 2026-10-07T23:24:38.994Z / 2026-10-08T16:17:35.128Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Metadados do hit (iguais nas duas rodadas): descrição sobre o template Next.js 16 com autenticação, middleware HTTP, TanStack Query, Redux Toolkit e biblioteca de componentes, sem os termos buscados; sem tópicos; linguagem TypeScript; `fork: false`; tamanho 324; criação em 2026-03-07T15:49:52Z; push em 2026-03-22T09:27:41Z.

Correspondências no README do SHA:
- **`microfrontend`:** `README.md:3` (“a microfrontend-ready feature structure”), `:34` e `:148` (“## Microfrontend-Ready Feature Structure”).
- **`microfrontends`:** a forma plural não aparece no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado.
- **`"module federation"`:** `README.md:170` (“This structure maps cleanly onto a future module federation setup”).

A última alteração do README é `f6b9c4a` (2026-03-21T11:42:07+01:00), e o SHA (2026-03-22T10:27:14+01:00) coincide com o `pushed_at`. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 185 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Next.js: `package.json`, `next.config.ts`, `src/app` (rotas `/`, `/login`, `/dashboard`), `src/features` (auth, dashboard, notes), `src/core`, `src/ui`, `src/hooks`, `src/utils`, testes e Dockerfiles. | contrária |
| Configuração / Build | `package.json:5–15`, `:16–36`: scripts `next dev/build/start` e dependências de uma app; nenhum pacote de federação. `next.config.ts:3–14`: `output: 'standalone'` e um `rewrites` de `/api/:path*` para o backend (placeholder `/path/to/backend`); nenhum `basePath`, `assetPrefix` ou zona. | contrária |
| Código-fonte | `src/app/dashboard/page.tsx:4` e `src/app/login/page.tsx:3`: as rotas importam features estaticamente (`@/features/dashboard`, `@/features/auth`). As features são pastas da mesma aplicação, compiladas no mesmo build. | contrária |
| Documentação | `README.md:148–170`: regras de organização por features (barrel `index.ts` como contrato, sem import entre features) e a frase “maps cleanly onto a future module federation setup: each feature boundary can become its own remote”. É intenção futura. | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile e README, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun`, `wujie`, `basePath`, `assetPrefix`, `rewrites` e `zones`: só o `rewrites` de API em `next.config.ts:6`. | ausente |
| Código-fonte (fronteiras) | Não há imports relativos com `../../` em `src`; o projeto usa o alias `@/` dentro da mesma aplicação. As fronteiras entre features são convenção de pastas, não unidades com entry e build próprios. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 14 commits (14 em todos os refs), nenhum merge, todos de `Krzysztof Grochowski <krzysztofgrochowski3@gmail.com>` como autor e committer, de 2026-03-07 (`7e85d82`, “Initial commit”) a 2026-03-22 (o SHA). O commit `fd51675` (2026-03-11) se descreve como “Restructured repo, renamed components to ui, added features to support microfrontends…”; no SHA, o resultado é a organização por features descrita acima. `git rev-list --objects $SHA --missing=print` lista 247 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend: uma app Next.js com um `package.json` e um build (`package.json:5–8`). As features são pastas internas, e nenhuma configuração de composição referencia unidades. |
| Q2 | No | Não há duas unidades; as rotas importam as features estaticamente (`src/app/dashboard/page.tsx:4`). |
| Q3 | No | Não há host que carregue unidades; o App Router roteia páginas da mesma aplicação. |
| Q4 | No | Nenhum mecanismo de composição; Module Federation é possibilidade futura (`README.md:170`). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “repositories mentioning micro-frontends without implementing them” e a “conventional frontend monoliths”: “microfrontend-ready” descreve modularização interna por features.
- Mesmo padrão de 263 (rascunho), em que Module Federation era item futuro, e próximo de 146 (rascunho), em que “micro-apps” eram módulos internos.
- `repo_type: template` (“starter”, `README.md:3`; `package.json:2`, `saas-template`). `frontend_units: 1`, `single-unit`, `ui_technologies: [react]`. `build_tools: []`: o Next.js encapsula o bundler, sem configuração explícita de bundler (o Vite em `vitest.config.ts` serve só aos testes).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** “microfrontend-ready” como rótulo de arquitetura modular por features, com promessa de futura Module Federation (`README.md:3`, `:148–170`), gera três hits terminológicos e de tecnologia sem nenhuma configuração correspondente.
- **Protocolo (busca):** o hit plural `microfrontends` não tem grafia literal no README. A elegibilidade muda de `unknown` (001) para `pass` (002).

---
schema: 1
id: 1041837305
full_name: nirvan-08/nirnews
url: https://github.com/nirvan-08/nirnews
commit: 6bb900b5bcf2fc2bd221bc5cb28a1208106dff60
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
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

# 307 — nirvan-08/nirnews

## Contexto

Upload parcial de uma aplicação Next.js (“NirNews - Modern News Aggregator”, `layout.tsx:34–38`, gerada com v0.app). A raiz do repositório contém `page.tsx`, `layout.tsx`, `globals.css`, arquivos de configuração e artefatos de build de desenvolvimento do Next (`app-build-manifest.json`, `build-manifest.json`, `react-loadable-manifest.json`, `trace`). As pastas importadas (`@/components/...`, `@/contexts/...`) não estão versionadas. A descrição do repositório diz “microfrontend-inspired architecture”, e `page.tsx:2` importa um componente de uma pasta local `components/microfrontends/`, ausente. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:308` registra rank 307, ID 1041837305, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main` (o ref `origin/dev` aponta para o mesmo commit). Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:308` registra a estratégia `terminology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17896` e `data/discovery/mfe-round-002/candidates.csv:17901`, ambos com `terminology` e `unknown`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-08` | 2026-10-07T18:51:03.164Z / 2026-10-08T15:39:10.714Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `terminology-microfrontends-repositories#created:2025-08` | 2026-10-07T22:08:52.872Z / 2026-10-08T15:47:54.490Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-08-01..2025-08-31`.

Metadados do hit (iguais nas duas rodadas): descrição “A modern, mobile-responsive News Aggregator built with Next.js and Tailwind CSS, using a microfrontend-inspired architecture. Features include JWT auth, role-based access, article CRUD, likes, bookmarks, and an admin dashboard. Currently powered by mock data, ready for real API integration.”; sem tópicos; linguagem CSS; `fork: false`; tamanho 85; criação em 2025-08-21T04:55:02Z; push em 2026-06-09T09:28:59Z.

**Grafias:**
- **`microfrontend`:** casa a descrição (“microfrontend-inspired”). O README (`README.md:1`, só o título `nirnews`, codificado em UTF-16) não contém o termo.
- **`microfrontends`:** não aparece na descrição nem no README; esse hit depende do processamento textual da busca do GitHub, que não está registrado. A grafia existe só no caminho de import `page.tsx:2`, e arquivos de código não são indexados por essa consulta de repositórios.

O README só existe no commit único, que é o SHA (2025-08-21T10:45:56+05:30), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas. O `pushed_at` (2026-06-09) é posterior ao único commit alcançável; a causa não é observável no clone.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 16 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há `page.tsx`, `layout.tsx`, `globals.css`, `next.config.mjs`, `tsconfig.json`, `components.json` (shadcn), `postcss.config.mjs`, `package.json` (`{"type": "commonjs"}`), um `pnpm-lock.yaml` vazio de pacotes e artefatos do diretório `.next` (manifests, `trace`). Não há `components/`, `contexts/` nem `app/` com as rotas listadas nos manifests. | contrária |
| Código-fonte | `page.tsx:1–19`: página que importa `Header`, `NewsFeed` (de `@/components/microfrontends/news-feed`) e `ErrorBoundary` por alias e os renderiza diretamente. `layout.tsx:5–7`, `:50–54`: providers de tema e autenticação de pastas ausentes. `tsconfig.json:21–23`: alias `@/*` para a raiz, ou seja, imports estáticos dentro da mesma aplicação. | contrária |
| Build/deploy (artefatos) | `app-build-manifest.json:1–40`: chunks de páginas de uma só aplicação Next (`/page`, `/categories/page`, `/login/page`, `/admin/page`, `/about/page`, `/home/page`); `trace` (647 KB) e `react-loadable-manifest.json` são saída do dev server do Next 15.2.4. Mostram um único build. | contrária |
| Configuração | `next.config.mjs:1–14`: só ignora erros de lint/TS e desativa otimização de imagens; nenhuma federação, zona ou rewrite. | contrária |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto `trace`, por `micro.?front`, `federation`, `remoteEntry`, `single.?spa` e `iframe`: só o caminho de import em `page.tsx:2`. | ausente |
| Código-fonte (fronteiras) | Os imports usam o alias `@/` dentro da mesma aplicação; não há imports `../../` nem outra unidade para cruzar. | contexto |

## Autoria e histórico

Clone não raso. Há 1 commit (1 em todos os refs), sem merges: `6bb900b` (2025-08-21T10:45:56+05:30), autor `nirvan-08 <nirvann.naveenn@gmail.com>`, committer `GitHub`, “Add files via upload”. O conteúdo foi enviado pela interface web, o que é compatível com o upload parcial (artefatos `.next` presentes e pastas de código ausentes). `git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação Next.js com um único build (`app-build-manifest.json:1–40`), e nenhuma configuração de composição. A pasta `components/microfrontends/` (`page.tsx:2`) seria uma pasta de componentes da mesma app e nem está versionada. |
| Q2 | No | Não há duas unidades; `NewsFeed` é importado estaticamente pela página (`page.tsx:2`, `:12`). |
| Q3 | No | Não há host que carregue unidades independentes. |
| Q4 | No | Nenhum mecanismo de composição (`next.config.mjs:1–14`; busca registrada). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “conventional frontend monoliths” e a “repositories mentioning micro-frontends without implementing them”: “microfrontend-inspired” e a pasta `components/microfrontends/` são rótulos de modularização interna.
- Próximo de 274 (rascunho, “microfrontend-ready feature structure”) e de 146 (rascunho, “micro-apps” como módulos internos).
- `frontend_units: 1`, `single-unit`, `ui_technologies: [react]` (Next.js/React observados em `page.tsx` e `layout.tsx`). `build_tools: []`: Next encapsula o bundler e não há configuração explícita. `repo_type: example` (projeto pessoal gerado com v0.app e dados mock, segundo a descrição).
- O snapshot incompleto não abre questão de classe: nem a parte ausente, pelos imports por alias e pelos manifests, indica unidades separadas.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** a descrição “microfrontend-inspired architecture” e uma pasta `components/microfrontends/` dentro de uma app Next única. O termo descreve organização de componentes, não composição.
- **Protocolo (completude):** repositório com upload parcial (artefatos `.next` versionados, código-fonte de componentes ausente). Avaliações de arquitetura nesses casos dependem dos artefatos de build presentes.
- **Protocolo (busca):** o hit plural `microfrontends` não tem grafia nos campos indexados. A elegibilidade permanece `unknown` nas duas rodadas.

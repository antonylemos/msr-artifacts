---
schema: 1
id: 1296132432
full_name: Surabhi-helium/DA-microfrontend
url: https://github.com/Surabhi-helium/DA-microfrontend
commit: c653dc1f76e260a856ace1b0e87ea33fac14746e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: template
approaches: []
ui_technologies: []
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 267 — Surabhi-helium/DA-microfrontend

## Contexto

- **Tipo de repositório:** template. É uma cópia gerada, sem alterações, do “Author Kit” da Adobe para sites AEM Edge Delivery com autoria pelo Document Authoring (da.live).

O README é o do template (`README.md:1–7`, “Author Kit… Use this template to make a new repo”), e `package.json:2`, `:18–25` aponta para `aemsites/author-kit`. O site é uma única base de código servida pela plataforma AEM: `head.html` carrega `scripts/scripts.js` e `scripts/ak.js`, que decoram a página e carregam blocos (`blocks/*`) da mesma base de código. O termo “microfrontend” só aparece no nome do repositório, que não é usado como evidência arquitetural.

`data/samples/mfe-sample-001/clones.csv:268` registra rank 267, ID 1296132432, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, execução ou acesso à rede (da.live e aem.live não foram consultados).

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:268` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:33264` (`terminology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:33272` (`terminology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2026-07` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2026-07-01..2026-07-31` | 2026-10-07T21:52:05.260Z / 2026-10-08T15:43:18.809Z |

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem JavaScript, licença Apache-2.0, `fork: false`, tamanho 178, criação em 2026-07-10T06:28:36Z, push em 2026-07-10T06:28:40Z.

**Grafia:** a descrição é nula e o README (`README.md:1–118`) não contém “microfrontend”, “micro-frontend” nem “micro frontend” (busca `git grep -i 'micro.?front'` no SHA: nenhuma ocorrência). O único lugar com a grafia é o nome do repositório (`DA-microfrontend`), que a consulta cobre por `in:name`. O nome explica a entrada na amostra, mas não é evidência de arquitetura.

O README só existe no commit único, que é o SHA (2026-07-10T11:58:40+05:30, isto é, 06:28:40Z). Ele coincide com o `pushed_at` e antecede as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 89 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Uma única base de site: `head.html`, `scripts/`, `styles/`, `blocks/` (10 blocos, como header, footer, hero, card, fragment), `tools/` (quick-edit, scheduler, sidekick, da), `deps/` (Lit compilado e RUM), `workers/website/` (Cloudflare Worker de proxy) e testes. | contrária |
| Configuração / Build | `package.json:6–14`: só lint, testes e `build:lit` (empacota a dependência Lit com esbuild); sem build da aplicação, que é servida sem build pela plataforma AEM (`README.md:14–18`). `workers/website/wrangler.toml:1–9`: worker apontando para `aemsites/author-kit`. | contrária |
| Código-fonte (carga de blocos) | `head.html:2–4` carrega `styles/styles.css`, `scripts/scripts.js` e `scripts/ak.js`. `scripts/ak.js:60–68`, `:79`, `:345–360`: `loadBlock`/`loadExperience` fazem `import(\`${codeBase}/${type}/${name}/${name}.js\`)` do mesmo `codeBase` do site (`:37`). Os blocos são componentes de página da mesma base de código, não unidades com entry e build próprios. | contrária |
| Código-fonte (ferramentas da plataforma) | `scripts/scripts.js:42–48`: com `?dapreview` ou `?quick-edit`, carrega `tools/da/da.js` ou `tools/quick-edit/quick-edit.js`. `tools/da/da.js:1–14` importa `scripts/dapreview.js` de `https://da.live` ou de branches `da-live--adobe`; `tools/quick-edit/quick-edit.js:3–19`, `:39–47`: injeta um import map para `da-lit`/`da-y-wrapper` em `da.live` e importa o plugin de edição rápida de `da.live/nx`. São ferramentas de autoria da plataforma Adobe, carregadas em modo de edição ou preview. | ambígua |
| Código-fonte (fronteiras) | Busca ativa de imports `../../`: blocos e ferramentas importam `scripts/ak.js`, `scripts/utils/*` e `deps/lit` do mesmo site (por exemplo, `blocks/header/header.js:1`; `tools/scheduler/scheduler.js:1–2`; `tools/quick-edit/quick-edit.js:1`). Confirma uma única base de código acoplada, sem unidades independentes. | contrária |
| Tecnologia / Composição (busca) | `git grep -i` no SHA, exceto o Lit compilado, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements`, `<iframe`, `qiankun` e `wujie`: o import map de `quick-edit.js:3–14`; `customElements.define` do `aem-scheduler` (`tools/scheduler/scheduler.js:97`), ferramenta interna; um iframe de YouTube (`blocks/youtube/youtube.js:4`); e `@web/dev-server-import-maps`, só no test runner (`package.json:29`). Nenhum mecanismo compondo unidades frontend próprias. | ausente |
| Documentação | `README.md:79–93`: padrões Page/Section/Block/Auto Block do Edge Delivery; `README.md:59–63`: ferramentas Sidekick e Quick Edit. Nenhuma menção a micro-frontends. | contexto |

## Autoria e histórico

Clone não raso. Há 1 commit, que é o SHA e a raiz (1 em todos os refs), sem merges: autor `Surabhi-helium <surabhi@iamhelium.com.au>`, committer `GitHub <noreply@github.com>`, 2026-07-10T11:58:40+05:30, “Initial commit”. É o padrão de um repositório criado por “Use this template” (`README.md:7`). O conteúdo é o template `aemsites/author-kit` (`package.json:18–25`; `workers/website/wrangler.toml:6`; `404.html:18`), sem alteração posterior do titular, e a identidade registrada não demonstra autoria do código. `git rev-list --objects $SHA --missing=print` não lista objetos ausentes.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única base de site (inventário; `head.html:2–4`). Os blocos são componentes da mesma base, carregados pelo `codeBase` comum (`scripts/ak.js:37`, `:60–68`). As ferramentas da da.live são tooling de autoria da plataforma, não unidades frontend do repositório referenciadas por configuração de composição. |
| Q2 | No | Não há duas unidades com entry e build próprios. Blocos e ferramentas importam `scripts/ak.js` e utilitários por caminhos relativos (`blocks/header/header.js:1`; `tools/quick-edit/quick-edit.js:1`). |
| Q3 | No | Não há host que carregue unidades independentes; `ak.js` decora a página e carrega blocos do próprio site (`scripts/ak.js:345–360`). |
| Q4 | No | Nenhum mecanismo de composição de unidades. O import map e o `import()` remoto de `quick-edit.js:3–19` e `da.js:1–4` carregam ferramentas de edição da plataforma em modo de autoria. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “conventional frontend monoliths”: um site Edge Delivery com blocos de página carregados dinamicamente da mesma base.
- O carregamento remoto de ferramentas da da.live é tooling de uma plataforma de terceiros (CMS/autoria). Mesmo que fosse lido como composição, cairia na regra de plugins/extensões de plataforma do final 037, com o mesmo resultado.
- É também uma cópia não modificada de template de terceiros (`aemsites/author-kit`). O tratamento de redistribuições segue aberto em 074/080/102/122, mas não altera a classe.
- O termo da busca está só no nome do repositório (`DA-microfrontend`); nenhum artefato menciona micro-frontends.
- `repo_type: template`, `frontend_units: 1`, `single-unit`. `ui_technologies: []`: JavaScript vanilla, com Lit só na ferramenta `aem-scheduler`. `build_tools: []`: o esbuild empacota apenas a dependência Lit (`package.json:14`), e o site é servido sem build.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** o hit vem exclusivamente do nome do repositório. O conteúdo é um template oficial da Adobe sem relação com micro-frontends. O carregamento dinâmico de blocos por `import()` e o import map do Quick Edit têm forma técnica parecida com composição em runtime, mas operam dentro de uma base de código ou trazem ferramentas da plataforma.
- **Protocolo (famílias/duplicatas):** outra instância do mesmo template está nas rodadas (`feffef/da-author-kit`, `data/discovery/mfe-round-002/candidates.csv:21087`), fora da amostra e não inspecionada. Repositórios gerados de template com `fork: false` entram como candidatos distintos.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).

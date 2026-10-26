---
schema: 1
id: 1177333595
full_name: TimmyUXD/assignment-333
url: https://github.com/TimmyUXD/assignment-333
commit: cad8a78d843259c96e9c2119821cd6a3665d059b
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [wordpress]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 380 — TimmyUXD/assignment-333

## Contexto

Site WordPress criado a partir do template `cd-wordpress` (WordPress Playground com banco SQLite versionado, CLI `wp-pwa` e deploy em GitHub Pages). O site, “assignment 3”, é um catálogo de vinhos: tema-filho `economics-child` sobre `economics` e o plugin `ecommerce-product-catalog`. O README é o texto do template: descreve o projeto como “consumer of microfrontends” e aponta um exemplo externo (`README.md:1–15`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:381` registra rank 380, ID 1177333595, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

O banco `wp-content/database/.ht.sqlite` do SHA foi lido com `sqlite3 -readonly` numa cópia temporária fora do repositório, removida após a consulta.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:381` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:26174` (`unknown`, `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:26181` (`pass`), ambos com `terminology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-03` | 2026-10-07T20:15:07.163Z / 2026-10-08T15:41:35.968Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-03` | 2026-10-07T22:11:29.411Z / 2026-10-08T15:49:19.998Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`.

Metadados do hit (iguais nas duas rodadas): descrição nula, sem tópicos, linguagem PHP, licença MIT, `fork: false`, tamanho 27600, criação em 2026-03-09T23:38:44Z, push em 2026-03-16T23:20:37Z.

**Grafias:** as duas estão em `README.md:13` (“The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](https://github.com/diy-pwa/paypal-microfrontend) here.”).

O README vem do commit inicial `8b2065f` (2026-03-09) e não foi alterado depois. É o mesmo blob (`7451429`) do README do final 119, ou seja, texto do template. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 1.262 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Seis arquivos do template na raiz (`README.md`, `package.json`, `.github/workflows/main.yml`, `.gitignore`, `LICENSE.txt`, `.devcontainer/devcontainer.json`) e `wp-content/` do Playground. Em `wp-content/`: banco SQLite, mu-plugins, plugins `ecommerce-product-catalog` (668 arquivos), `akismet` e `tiny-gtag-js-analytics`, temas padrão `twentytwenty*`, `economics`, `economics-child` e `wpico`, e `uploads/2026` (35 arquivos). | contexto |
| Configuração / Build | `package.json:2–10`: só `wp-pwa` (`dev`, `preview`, `build assignment-333`); nenhum bundler nem configuração de composição. | contrária |
| Conteúdo (banco) | `wp_options`: `template` = `economics`, `stylesheet` = `economics-child`, `blogname` = “assignment 3” e plugins ativos `ecommerce-product-catalog` e `tiny-gtag-js-analytics`. `wp_posts` publicados: “Hello world!”, “Sample Page”, “Products”, navegação, estilos globais e cinco `al_product` de vinhos. Busca em `post_content` por `<script`, `<x-`, `iframe`, `microfrontend`, `paypal` e `x-year`: nenhuma ocorrência. | contrária |
| Tema (scripts) | `wp-content/themes/economics-child/functions.php:6–14`: enfileira os estilos e o script local `customElements.js`. `wp-content/themes/economics-child/customElements.js:1–7` define `<x-year>`, com o mesmo blob (`6a4b5cd`) do modelo `wp-content/mu-plugins/one-click-child-theme/templates/customElements.js`. É código gerado pelo plugin de tema-filho, não usado no conteúdo (busca acima). | ausente |
| Tecnologia / Composição (busca) | `git grep` no SHA por `microfrontend`, `micro-frontend`, `paypal-micro`, `remoteEntry` e `customElements.define`, fora dos plugins de terceiros grandes: só `README.md:13` e os dois `customElements.js` acima. Os `wp_enqueue_script` e `<script src=` dos temas e plugins carregam só arquivos locais ou o Google Tag Manager (`wp-content/plugins/tiny-gtag-js-analytics/tiny-gtag-js-analytics.php:483`). | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 3 commits alcançáveis a partir do SHA (5 em todos os refs, incluindo os deploys de `origin/gh-pages`), sem merges:
- `8b2065f` (2026-03-09, “Initial commit”, `Timmy Fatukasi <timmyking05@gmail.com>`, committer GitHub): o template;
- `2968aec` (2026-03-10, “wines pt2”, `Timmy Fatukasi`): adiciona `wp-content/` (banco, mu-plugins, plugins, temas e uploads);
- `cad8a78` (2026-03-16, “add folder for wp-pwa build”), o SHA: altera só `package.json`.

Os commits de `gh-pages` são de `TimmyUXD` (“deploy: …”).

`git rev-list --objects $SHA --missing=print` lista 1 objeto ausente, `75eb2e7`: o `package.json` anterior ao SHA, igual ao do template no final 119. Não pertence à árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um site WordPress (tema-filho + catálogo), sem duas unidades próprias nem referência de composição a unidades externas. O conteúdo do banco não carrega script ou elemento de outra origem (busca registrada). |
| Q2 | No | Não há conjunto de unidades com entradas ou builds próprios; `package.json:2–10` só tem os comandos globais do site. |
| Q3 | No | Não há host que monte unidades: o tema renderiza o conteúdo WordPress, e o único custom element (`x-year`) é código gerado não usado. |
| Q4 | No | Nenhum mecanismo de composição configurado. A menção do README (`README.md:13`) é texto do template, e o exemplo PayPal citado não é carregado pelo site. |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “conventional frontend monoliths” e a menção temática sem composição.
- Mesmo enquadramento do final 119 e dos rascunhos 160/206/224 da família `cd-wordpress`. Difere de 049 (script de outra origem e elemento no conteúdo) e de 260 (módulos remotos enfileirados no tema): aqui não há carga externa.
- Plugins e temas de terceiros (catálogo, Akismet, temas padrão, `economics`) não contam como unidades nem como composição autoral (cuidados de 074/080/102).
- `frontend_units: 1` (o site), `single-unit`, `ui_technologies: [wordpress]`, `build_tools: []` (CLI `wp-pwa`) e `repo_type: example` seguem 119.
- Não há decisão aberta.

## Notas para análise

- **Protocolo (família):** a filiação ao template `cd-wordpress` é verificável por blobs: `README.md` (`7451429`) e `.github/workflows/main.yml` (`a4a3cb6`) são iguais aos do final 119. O `package.json` foi alterado no SHA (nome do build).
- **RQ1 (sinais enganosos):** o README do template (“consumer of microfrontends”, `README.md:13`) leva trabalhos da disciplina às consultas terminológicas, mas a composição depende do conteúdo de cada site; aqui não há nenhuma.
- **Protocolo:** a elegibilidade muda de `unknown` (001) para `pass` (002).

---
schema: 1
id: 960060577
full_name: Olga-steblyk/UX308-Assignment2-take2
url: https://github.com/Olga-steblyk/UX308-Assignment2-take2
commit: 9c0ac6ca84d0dff34bdd55ded8fae4e5ff2248ca
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [wordpress]
build_tools: []
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 260 — Olga-steblyk/UX308-Assignment2-take2

## Contexto

Site WordPress (Playground + SQLite) de trabalho de disciplina (“Assignment 2 Take 2”, descrição do repositório), versionado em `wp-content/` e exportado como site estático para o GitHub Pages pela CLI `wp-pwa`. A infraestrutura vem do template `cd-wordpress` (`README.md:1–15`; `package.json:2–10`; `.github/workflows/main.yml:28–32`), cujo README declara a intenção de ser “a consumer of microfrontends”.

Diferentemente dos rascunhos 160/206/224, o tema filho ativo (`every-byte-child-theme`) carrega em todas as páginas dois módulos ES de outra origem, do mesmo autor (`functions.php:14–15`):
- `https://olga-steblyk.github.io/Assignment1_UX308/order.js`;
- `https://olga-steblyk.github.io/Assignment1_UX308/fab.js`.

O conteúdo das páginas, porém, não usa nenhum elemento desses módulos. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:261` registra rank 260, ID 960060577, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Para inspecionar o banco, o blob `wp-content/database/.ht.sqlite` foi copiado para um diretório temporário fora de `data/`, consultado com `sqlite3 -readonly` e apagado. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:261` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:12592` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:12597` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2025-04` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T18:28:59.843Z / 2026-10-08T15:37:41.421Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:07:24.011Z / 2026-10-08T15:47:06.493Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-04-01..2025-04-30`.

Metadados do hit:
- descrição “Assignment 2 Take 2”, sem tópicos, linguagem PHP, `fork: false`, tamanho 26.142;
- criação em 2025-04-03T19:48:02Z, push em 2025-04-04T00:31:52Z.

As duas grafias buscadas estão em `README.md:13`: “The idea of this is as a consumer of microfrontends. There is an example microfrontend for [paypal standard](…)”. O README vem do commit-raiz `beb7a90` (2025-04-03) e não foi alterado depois, sendo anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 910 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Na raiz há 6 arquivos do template; os outros 904 estão em `wp-content/`: temas `every-byte-child-theme`, `twentytwentyfour` e `twentytwentythree`; plugins `akismet` e `ecommerce-product-catalog`; mu-plugins do Playground; banco `wp-content/database/.ht.sqlite`. | contexto |
| Configuração (carga de unidade externa) | `wp-content/themes/every-byte-child-theme/functions.php:6–16`: `wp_enqueue_script_module` de `order.js` e `fab.js` em `olga-steblyk.github.io/Assignment1_UX308/` (`:14–15`), além do script local `customElements.js` (`:13`). Esses módulos são servidos por outra origem e outro repositório do autor; seu conteúdo não está no snapshot. | moderada |
| Conteúdo (banco) | Na cópia temporária do banco, `wp_options` tem `stylesheet` = `every-byte-child-theme`, `template` = `twentytwentyfive`, `active_plugins` = `ecommerce-product-catalog` e `blogname` “Evry-byte”. Publicados: “Sample Page”, “Products” (`[show_product_catalog]`), o post “Hello world!” e uma navegação. A busca de bytes por `<x-`, `olga-steblyk.github.io`, `order.js`, `fab.js`, `<script`, `type="module"`, `<iframe`, `wp:html` e `microfrontend` não retorna nada. Nenhum elemento ou ponto de montagem dos módulos remotos aparece no conteúdo. | ambígua |
| Código local | `wp-content/themes/every-byte-child-theme/customElements.js:1–7`: custom element `x-year`, local e trivial, não usado no conteúdo. | contexto |
| Tema pai | O tema filho declara `Template: twentytwentyfive` (`style.css:5`), mas `wp-content/themes/twentytwentyfive/` foi removido em `6bf78ea`; o WordPress Playground pode supri-lo fora do repositório. | contexto |
| Busca | Fora do banco, `micro.?front` só aparece no README do template. | contexto |

## Autoria e histórico

Clone não raso; 20 commits em todos os refs, nenhum merge, todos de Olga-Stebko (noreply), em 2025-04-03 e 2025-04-04. Em `main`, depois do commit-raiz `beb7a90` (template), vêm:
- `1329d94` (“included important aspects”), que cria o tema filho;
- `df7d38c` (“attempt to include chat feature”), que altera `functions.php`;
- o SHA `9c0ac6c` (“fixed order.js”), que altera `functions.php` e o banco.

O branch `origin/codespace-opulent-guide-x4pxr5vpxq5hvprx` tem commits posteriores (até 2025-04-04, “added index.html”, “chnged the php functions to be index.js”). O `gh-pages` é a saída de deploy. Nenhum desses branches foi considerado. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | O snapshot demonstra apenas o site WordPress; os scripts externos sem ponto de montagem observável não demonstram uma segunda unidade frontend integrada. |
| Q2 | No | Não há unidade frontend independente observável na composição; há somente URLs de módulos externos. |
| Q3 | No | O conteúdo não contém elemento, contêiner ou outro uso dos módulos enfileirados. |
| Q4 | No | Enfileirar scripts externos sem uso observável não demonstra um mecanismo de composição de frontend. |
| Q5 | No | Q1–Q4 não demonstram composição entre unidades frontend. |

## Motivo

- Classificado como `Non-MFE`: o snapshot só prova o carregamento de scripts externos, não sua montagem ou integração como unidades frontend.
- **Comparação:** diferentemente de 049, não há elemento remoto no conteúdo; a carga isolada aproxima-se dos casos sem composição observável.
- **Campos:** `approaches: []`, `ui_technologies: [wordpress]`, `build_tools: []` (CLI `wp-pwa`), `frontend_units: 1`, `unit_organization: multi-repo`, `repo_type: example`.

## Notas para análise

- **RQ2:** composição por enfileiramento de módulos ES remotos no tema WordPress (`wp_enqueue_script_module`), em vez de inserção no conteúdo como em 049.
- **Protocolo (snapshot):** o branch de codespace tem alterações posteriores em `functions.php`, fora do snapshot.
- **Protocolo (busca):** as duas grafias buscadas estão literalmente em `README.md:13`. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Classificado como `Non-MFE`. Os módulos externos são enfileirados pelo tema, mas o snapshot não contém elemento, contêiner ou outro ponto de montagem que demonstre seu uso. A simples carga de scripts externos não comprova composição de unidades frontend.

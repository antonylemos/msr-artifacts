---
schema: 1
id: 919807021
full_name: Ba5ik7/ngx-editorjs2
url: https://github.com/Ba5ik7/ngx-editorjs2
commit: 65912365bf7834d6722ca295f11934e0f799f00e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [angular]
build_tools: []
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 317 — Ba5ik7/ngx-editorjs2

## Contexto

Biblioteca Angular de editor de blocos inspirado no Editor.js (`@tmdjr/ngx-editor-js2`), com uma aplicação de demonstração (`README.md:1–8`; `projects/ngx-editor-js2/package.json:2–3`; `angular.json:6–7`, `:95–96`). O README lista blocos opcionais publicados como pacotes npm separados. Um deles, “MFE Loader Block”, é descrito como “Dynamically load and embed micro-frontends using Module Federation” (`README.md:143–150`), mas seu código não está neste repositório. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:318` registra rank 317, ID 919807021, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:318` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:11476` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:11482` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-01` | 2026-10-07T22:20:03.469Z / 2026-10-08T15:53:38.009Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-01` | 2026-10-07T22:51:15.534Z / 2026-10-08T16:05:13.495Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2025-01` | 2026-10-07T23:16:43.767Z / 2026-10-08T16:13:50.133Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2025-01-01..2025-01-31`.

Metadados do hit (iguais nas duas rodadas): descrição sobre o editor de blocos Angular, sem os termos buscados; sem tópicos; linguagem TypeScript; `fork: false`; tamanho 1932; 8 estrelas; homepage no GitHub Pages; criação em 2025-01-21T03:44:47Z; push em 2026-02-15T03:28:11Z.

Correspondências no README raiz: a única linha é `README.md:144`, “Dynamically load and embed micro-frontends using Module Federation.”
- casa literalmente “module federation” e, com o hífen como separador, “micro frontends”;
- a forma singular “micro frontend” não aparece literalmente; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A mesma frase aparece em `projects/ngx-editor-js2/README.md:144`, que não é o README indexado.

A última alteração do README raiz é `e9f2914` (2025-07-13), e o SHA é de 2026-02-14T22:28:11-05:00 (2026-02-15T03:28:11Z, igual ao `pushed_at`). Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 70 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Workspace Angular com `projects/ngx-editor-js2` (biblioteca, schematics) e `projects/ngx-editorjs2-demo` (aplicação de demonstração), mais `docs/`, `mock/` e workflow de publicação. | contrária |
| Configuração / Build | `angular.json:6–7`, `:18`, `:22`: aplicação `ngx-editorjs2-demo` com `@angular/build:application` e entry `projects/ngx-editorjs2-demo/src/main.ts`; `angular.json:95–96`, `:102`: biblioteca `ngx-editor-js2` com `ng-packagr`. `package.json:5–6`: builds do demo (GitHub Pages) e da biblioteca. `projects/ngx-editor-js2/package.json:2–3`: pacote `@tmdjr/ngx-editor-js2`. | contrária |
| Código-fonte (demo) | `projects/ngx-editorjs2-demo/src/app/components/document.component.ts:3`, `:13–18`: o demo importa `NgxEditorJs2Component` de `ngx-editor-js2` (biblioteca do workspace) e o renderiza; `projects/ngx-editorjs2-demo/src/app/services/app.service.ts:2`: tipos da biblioteca. É consumo de biblioteca em build time. | contrária |
| Código-fonte (schematic) | `projects/ngx-editor-js2/schematics/ng-add/index.ts:61–66`: o `ng add` sabe instalar o pacote externo `@tmdjr/ngx-editor-js2-mfe-loader` com peer `@angular-architects/module-federation`. O bloco MFE Loader não está no repositório. | fraca |
| Documentação | `README.md:143–150`: “MFE Loader Block” como pacote npm opcional, ao lado de blocos de citação, código e Mermaid (`:120–160`). | fraca |
| Tecnologia / Configuração / Composição (busca) | `git grep -i` no SHA, exceto lockfile e README raiz, por `micro.?front`, `federation`, `single.?spa`, `remoteEntry`, `import.?map`, `customElements` e `<iframe`: só `projects/ngx-editor-js2/README.md:144` e o schematic acima. Nenhuma configuração de federação. | ausente |
| Código-fonte (fronteiras) | Os imports relativos `../../` ficam dentro da biblioteca (por exemplo, `projects/ngx-editor-js2/src/lib/components/blocks/header-block.component.ts:2–10`). O demo usa a biblioteca pelo nome do pacote. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 139 commits alcançáveis a partir do SHA (184 em todos os refs), 2 merges:
- 136 de `Wesley DuSell`/`Wesley` `<dusellfam@gmail.com>`, 2 deles com committer `GitHub`;
- 1 de `Adrian Johnson`, com committer `GitHub`.

Os registros vão de 2025-01-19 (`25da15c`, “initial commit”) ao SHA (2026-02-14). Os branches remotos `codex/…`, `copilot/…` e `gh-pages` não foram considerados. `git rev-list --objects $SHA --missing=print` lista 446 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única aplicação (o demo) que consome uma biblioteca do mesmo workspace (`angular.json:6–22`, `:95–102`; `document.component.ts:3`). Nenhuma configuração de composição referencia unidades; o bloco MFE Loader é pacote externo citado no README. |
| Q2 | No | Não há duas unidades frontend; biblioteca e demo não são unidades compostas. |
| Q3 | No | Não há host que carregue unidades. |
| Q4 | No | Nenhum mecanismo de composição configurado neste repositório (busca registrada). |
| Q5 | No | Q1–Q4 convergem. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”.
- Corresponde a “component libraries…” (aqui uma biblioteca de componentes Angular, não Web Components) e a “repositories mentioning micro-frontends without implementing them”: o carregador de micro-frontends é um bloco opcional distribuído em outro pacote.
- Próximo de 248 (rascunho, biblioteca que cita micro-frontends como cenário) e dos casos de biblioteca 015/148/165.
- `repo_type: library`. `frontend_units: 1` e `single-unit` contam o demo, como o site de 080. `ui_technologies: [angular]`. `build_tools: []`: o builder do Angular CLI e o ng-packagr encapsulam o bundler.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** uma única linha de README sobre um pacote-satélite (“MFE Loader Block”, `README.md:144`) gera três hits terminológicos e de tecnologia. O código correspondente não está no repositório.
- **Protocolo (famílias):** o mesmo dono tem nas rodadas `Ba5ik7/ngx-editor-js2-blocks` e `Ba5ik7/seed-mfe-remote` (`data/discovery/mfe-round-002/candidates.csv:11728`, `:13194`), fora da amostra e não inspecionados. O bloco MFE Loader pode estar no primeiro, mas isso não foi verificado.
- **Protocolo (busca):** o hit singular não tem grafia literal. A elegibilidade muda de `unknown` (001) para `pass` (002).

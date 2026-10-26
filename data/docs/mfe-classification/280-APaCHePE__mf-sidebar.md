---
schema: 1
id: 964887410
full_name: APaCHePE/mf-sidebar
url: https://github.com/APaCHePE/mf-sidebar
commit: 6d2ac6c5f37ed8d9e2ff2cf3662d11e92a70274d
classification: MFE-unit
checklist: { q1: no, q2: yes, q3: undetermined, q4: undetermined, q5: no }
repo_type: production
approaches: [single-spa]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 1
unit_organization: single-unit
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 280 — APaCHePE/mf-sidebar

## Contexto

Aplicação single-spa em Angular 19 que fornece a barra lateral/menu de um portal. Ela exporta os lifecycles `bootstrap`/`mount`/`unmount` (`src/main.single-spa.ts:16–29`) e é servida na porta 1004 com `deployUrl` próprio (`angular.json:46`, `:76`). O root config que a registra não está no repositório. O mesmo titular tem nas rodadas um `APaCHePE/shell` e outros `mf-*` (auth, seguridad, utils-modules etc.), fora da amostra. O README é o boilerplate do Angular CLI. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:281` registra rank 280, ID 964887410, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:281` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:12895` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:12900` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `technology-single-spa-package-code#size:1800..1999` | `package.json` | 2026-10-07T22:18:41.101Z / 2026-10-08T16:01:54.988Z |

A consulta efetiva é `"single-spa" filename:package.json size:1800..1999`. Os metadados do hit de código registram só descrição nula e `fork: false`.

O arquivo casado tem 1.897 bytes no SHA, dentro da faixa, e contém `single-spa` (`package.json:35`), `single-spa-angular` (`:36`) e os scripts `build:single-spa:mf-sidebar`/`serve:single-spa:mf-sidebar` (`:11–12`). O acerto não depende do README (`README.md:1–59`, boilerplate do Angular CLI sem os termos). O SHA (2025-07-21) é anterior às coletas de outubro de 2026.

Outros repositórios do titular nas rodadas (`data/discovery/mfe-round-002/candidates.csv`): `APaCHePE/shell` (`:12368`), `mf-auth` (`:12369`), `mf-com-consultas` (`:12370`), `mf-ope-reclamos` (`:12901`), `mf-seguridad` (`:13546`) e `mf-utils-modules` (`:14414`). Só `mf-sidebar` está em `sample.csv`; os demais não foram inspecionados.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 73 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Um único projeto Angular: `angular.json`, `extra-webpack.config.js`, `package.json`, `src/app` (menu, sidebar), `src/shared` (serviços), `src/single-spa`, `src/assets/ultima` (estilos do tema). | contrária |
| Código-fonte (lifecycles) | `src/main.single-spa.ts:16–25`: `singleSpaAngular({ bootstrapFunction, template: '<app-sidebars />', Router, NavigationStart, NgZone })`; `:27–29`: `export const bootstrap / mount / unmount`. `src/single-spa/single-spa-props.ts:1–8` e `src/single-spa/asset-url.ts:5–11`: props single-spa e caminho público dinâmico. | forte |
| Configuração (build) | `angular.json:18`, `:22`: builder `@angular-builders/custom-webpack:browser` com `main: src/main.single-spa.ts`; `:41–42`: `extra-webpack.config.js`; `:46`: `deployUrl: http://localhost:1004/`; `:62`, `:68`: `outputHashing: none`; `:74–76`: dev-server na porta 1004. `extra-webpack.config.js:1–14`: `singleSpaAngularWebpack` e `externals` para `@test/mf-utils-modules`. `src/app/app.config.ts:45`: `getSingleSpaExtraProviders()`. | forte |
| Código-fonte (módulo utilitário externo) | `src/shared/servicess/sidebar.services.ts:5–10`: importa `AuthUtils`, `local`, `Session` e `StorageConstants` de `@test/mf-utils-modules`, marcado como external no webpack (`extra-webpack.config.js:11–13`) e tipado em `src/types/extramodule.d.ts:1–83`. É utilitário compartilhado (sessão, storage, auth), resolvido em runtime fora do repositório. | ambígua |
| Código-fonte (integração com outras aplicações) | `src/app/sidebar/sidebar.component.ts:37` e `src/app/app-menu/app.menu.ts:46`: escuta o evento `module-selected` em `window` (tipado em `src/types/custom-events.d.ts:2–5`); `sidebar.services.ts:42–43`: escuta mudanças de `localStorage` “desde otros MF”. São contratos com aplicações externas, não observáveis aqui. | moderada |
| Código-fonte (fronteiras) | Busca ativa de imports relativos `../../` em `src`: só travessias internas para `src/shared` (por exemplo, `src/app/sidebar/sidebar.component.ts:5–6`; `src/app/app-menu/component/app.menuitem.ts:9`). Nenhum import de código-fonte de outro repositório ou unidade. | contexto |
| Composição | Nenhum root config (`registerApplication`, import map) no repositório; o shell do ecossistema está em outro repositório. | ausente |
| Documentação | `README.md:1–59`: boilerplate do Angular CLI; nenhuma menção à arquitetura. | ausente |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 12 commits (12 em todos os refs), nenhum merge, de duas identidades do mesmo titular:
- `Apachepe <alexanderspradochoquepata@gmail.com>`: 5 commits, de 2025-04-11 (`ac993da`, “initial commit”) a 2025-05-27;
- `Alex Prado <alexanders.prado@interseguro.com.pe>`: 7 commits, e-mail corporativo, de 2025-05-27 ao SHA (`6d2ac6c`, 2025-07-21, “Estilos”).

Autor e committer coincidem. `git rev-list --objects $SHA --missing=print` lista 56 objetos ausentes, nenhum na árvore do SHA. Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Uma única unidade frontend. Nenhuma configuração de composição referencia outras unidades. O `externals` de `@test/mf-utils-modules` (`extra-webpack.config.js:11–13`) aponta para um módulo utilitário (sessão, storage, auth; `extramodule.d.ts:1–83`), não para uma unidade frontend. |
| Q2 | Yes (para a unidade) | Build próprio com entry single-spa (`angular.json:18–22`), saída sem hash e `deployUrl` próprio (`angular.json:46`, `:62`). |
| Q3 | Undetermined | O root config que registra a aplicação não está no repositório. |
| Q4 | Undetermined | Os lifecycles estão exportados (`src/main.single-spa.ts:27–29`); o lado que os registra não é observável. |
| Q5 | No | Unidade preparada para composição por um root config externo não observável. |

## Motivo

- `MFE-unit` pela exceção “a single frontend unit explicitly prepared to be composed by an external host (e.g., … exported single-spa lifecycles), but the composing host is not observable”.
- Mesmo padrão do final 058 (single-spa com lifecycles exportados e build preparado para import map) e dos remotes de 001/050.
- O módulo utilitário externo (`@test/mf-utils-modules`) é o padrão single-spa de “utility module” compartilhado. Ele não é unidade frontend e entra por `externals`, não por configuração de composição. Por isso não se aplica a leitura literal de Q1 discutida em 150/264.
- Não é plugin de plataforma: o ecossistema é do próprio titular.
- `repo_type: production`: produto interno com e-mail corporativo de seguradora e módulos de negócio (reclamos, seguridad) no ecossistema. `ui_technologies: [angular]`. `build_tools: [webpack]`: build com `@angular-builders/custom-webpack` e `single-spa-angular/lib/webpack`. `approaches: [single-spa]`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** single-spa com `single-spa-angular` em Angular 19 standalone (`bootstrapApplication`), comunicação entre aplicações por `CustomEvent` em `window` (`module-selected`) e por eventos `storage`, e utilitários compartilhados via módulo externo resolvido por import map (`@test/mf-utils-modules`).
- **Checklist (caso próximo):** em 269, o remote compartilhado entrava por `remotes` de Module Federation e foi para revisão. Aqui o utilitário entra por `externals` de webpack, sem referência em configuração de composição. Se a revisão de 269 tratar módulos utilitários compartilhados como unidades, este caso deve ser reavaliado na mesma decisão.
- **Protocolo (famílias/multi-repo):** o ecossistema (shell, auth, com-consultas, ope-reclamos, seguridad, utils-modules) está nas rodadas, fora da amostra. Com análise de famílias, Q3/Q4 poderiam ser verificados no `APaCHePE/shell`.

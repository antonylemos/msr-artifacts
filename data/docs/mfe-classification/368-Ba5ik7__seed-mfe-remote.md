---
schema: 1
id: 969679126
full_name: Ba5ik7/seed-mfe-remote
url: https://github.com/Ba5ik7/seed-mfe-remote
commit: 3565dd875bd5bd89f14f88b1325e00aeb11cdf96
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: template
approaches: [module-federation]
ui_technologies: [angular]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 368 — Ba5ik7/seed-mfe-remote

## Contexto

Workspace Angular CLI 19 com dois projetos:
- `seed-mfe-remote`: um remote Module Federation (`@angular-architects/module-federation` + `ngx-build-plus`) que expõe um componente `RemoteWidget`;
- `demo`: um host que carrega esse componente de duas formas, montado num `ViewContainerRef` e por uma rota `remote`.

O conteúdo é mínimo (“Remote Widget LOADED!!!!”). O conjunto funciona como semente de remote acompanhada de um host de demonstração. O README é o texto padrão gerado pelo Angular CLI, com a porta ajustada para 4202 (`README.md:1–3`, `:13`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:369` registra rank 368, ID 969679126, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:369` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:13189` (`technology`, `unknown`) e `data/discovery/mfe-round-002/candidates.csv:13194` (`technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, ambos do endpoint `code`:

| Consulta (`q`) | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-angular-module-federation-package-code`: `"@angular-architects/module-federation" filename:package.json` | `…#size:1150..1299` | `package.json` | 2026-10-07T22:09:45.284Z / 2026-10-08T15:52:53.240Z |
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `…#size:300..399` | `projects/demo/webpack.config.js` | 2026-10-07T22:21:49.595Z / 2026-10-08T16:04:25.151Z |

Os metadados do hit de código e de `candidates.csv` registram só descrição nula e `fork: false`.

Correspondências no SHA:
- **`package.json`** (1.236 bytes, dentro da faixa): `"@angular-architects/module-federation": "^19.0.3"` em `package.json:14`.
- **`projects/demo/webpack.config.js`** (345 bytes, dentro da faixa): `withModuleFederationPlugin` em `:1` e `:3`, e `remotes` em `:5–7`.
  - O termo `ModuleFederationPlugin` aparece só como parte de `withModuleFederationPlugin`.
  - O casamento depende da tokenização da busca de código do GitHub, que não está registrada.

O acerto não depende do README, que não menciona micro-frontends nem federação. Os dois arquivos foram alterados pela última vez no SHA (2025-04-20), antes das coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 35 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Raiz com `angular.json`, `package.json`, `tsconfig.json` e `.vscode/`; `projects/demo/` e `projects/seed-mfe-remote/` com `src/main.ts`, `src/bootstrap.ts`, `index.html` e `webpack.config.js`/`webpack.prod.config.js`. | forte |
| Configuração (remote) | `projects/seed-mfe-remote/webpack.config.js:3–14`: `withModuleFederationPlugin({ name: 'seedMfeRemote', exposes: { './RemoteWidget': './projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts' }, shared: shareAll(singleton, strictVersion) })`. | forte |
| Configuração (host) | `projects/demo/webpack.config.js:3–12`: `remotes: { "seedMfeRemote": "http://localhost:4202/remoteEntry.js" }` e `shareAll`. | forte |
| Código-fonte (composição) | `projects/demo/src/app/app.component.ts:24–36`: `loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4202/remoteEntry.js', exposedModule: './RemoteWidget' })` e `createComponent(RemoteWidgetComponent)` no `ViewContainerRef` (`:12`, `:21–22`). `projects/demo/src/app/app.routes.ts:5–13`: rota `remote` com `loadComponent` pelo mesmo `loadRemoteModule`. `projects/seed-mfe-remote/src/app/remote-widget/remote-widget.component.ts:3–10`: componente exportado. | forte |
| Configuração (correspondência da cadeia) | A URL `http://localhost:4202/remoteEntry.js` do host coincide com a porta do dev-server do remote (`angular.json:80`), e `./RemoteWidget` coincide com `exposes`. O host serve na porta 4201 (`angular.json:185`). | forte |
| Build | `angular.json:18–39`, `:68–82`: `ngx-build-plus:browser`/`dev-server` para `seed-mfe-remote`, `outputPath: dist/seed-mfe-remote`, `main` e `extraWebpackConfig` próprios. `angular.json:123–144`, `:173–187`: idem para `demo` (`dist/demo`). Os entries delegam a `bootstrap.ts` (`projects/demo/src/main.ts:1–2`; `projects/seed-mfe-remote/src/main.ts:1–2`). | moderada |
| Código-fonte (fronteiras) | Busca ativa por imports com `../` e por caminhos do outro projeto em `projects/`: nenhum import cruzado; a única ocorrência de `seed-mfe-remote/` é o caminho em `exposes` (`projects/seed-mfe-remote/webpack.config.js:8`). | contexto |
| Documentação | `README.md:1–59`: README padrão do Angular CLI, sem menção a micro-frontends; `:13` com a porta 4202. | contexto |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). Há 2 commits (2 em todos os refs), sem merges, ambos de `Wesley DuSell <dusellfam@gmail.com>` (autor e committer):
- `b95ce7d` (2025-04-19, “initial commit”): adiciona o workspace gerado pelo Angular CLI (README, `angular.json`, `package.json`, configurações);
- `3565dd8` (2025-04-20, “INIT”), o SHA: adiciona `projects/demo/` e `projects/seed-mfe-remote/` e altera `angular.json`, `package.json`, README e `tsconfig.json`.

`git rev-list --objects $SHA --missing=print` lista 6 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades: o remote `seedMfeRemote` e o host `demo`, que o referencia em `remotes` (`projects/demo/webpack.config.js:5–7`). |
| Q2 | Yes | Cada projeto tem entry, configuração webpack, `outputPath` e dev-server próprios (`angular.json:18–39`, `:68–82`, `:123–144`, `:173–187`). Não há import de código-fonte entre eles (busca registrada). |
| Q3 | Yes | O host monta o componente remoto (`projects/demo/src/app/app.component.ts:24–36`) e o roteia em `remote` (`projects/demo/src/app/app.routes.ts:5–13`). |
| Q4 | Yes | Module Federation configurada nos dois lados e usada por `loadRemoteModule`, com URL, porta e módulo exposto correspondentes. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “examples, templates… that actually compose frontend units”, como o final 046 (template com host e remotes).
- Cadeia completa como em 076/084/096/106/109, em escala mínima.
- Difere do final 051 (template de remote sozinho, `MFE-unit`): aqui o host está no repositório e consome o remote.
- Não é code sharing (089/100): o host carrega e monta um componente remoto em runtime, embora o componente seja trivial.
- Não é conteúdo, gerador ou exercício (023/075/081/094/105): a composição está configurada e conectada.
- `frontend_units: 2`, `unit_organization: monorepo` (dois projetos no mesmo workspace Angular), `approaches: [module-federation]`, `ui_technologies: [angular]`, `build_tools: [webpack]` (`ngx-build-plus` com webpack). `repo_type: template` (semente de remote com host de demonstração).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** o host combina `remotes` estáticos no webpack (`projects/demo/webpack.config.js:5–7`) com `loadRemoteModule` de `type: 'module'` e URL explícita (`app.component.ts:26–30`). A entrada `seedMfeRemote` em `remotes` não é usada pelas chamadas, que passam a URL direto.
- **RQ1:** repositório mínimo, com conteúdo de teste (“Remote Widget LOADED!!!!”) e README padrão do CLI; a classe vem só da configuração. O `demo` funciona como host de verificação da semente, papel que corresponde ao do container em templates como o 046.
- **Protocolo (busca):** o hit `ModuleFederationPlugin remotes extension:js` casou um arquivo em que o termo só aparece dentro de `withModuleFederationPlugin`. A elegibilidade muda de `unknown` (001) para `pass` (002).

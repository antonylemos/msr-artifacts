---
schema: 1
id: 984418769
full_name: Alex18gr/react-ng-vite-systemjs-spa-app
url: https://github.com/Alex18gr/react-ng-vite-systemjs-spa-app
commit: 1fe831db68f3ee26779b7c411b39326eed40198f
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [react, angular]
build_tools: [webpack, vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 310 — Alex18gr/react-ng-vite-systemjs-spa-app

## Contexto

Prova de conceito de single-spa com SystemJS e import maps (`README.md:1–2`): um root config (`root-config/`) registra três aplicações — React 17 com webpack (`react-app/`), Angular 12 (`angular-app/`) e React 19 com Vite (`react-vite-app/`) —, que compartilham em runtime dois módulos utilitários próprios (`common-lib-webpack/`, estado de usuário com RxJS; `styleguide/`, componentes React/MUI). Há ainda um projeto Vue de scaffold (`vue-app/`) sem relação com o root config. O README declara que a POC parte do exemplo de terceiro `nitinreddy3/react-ng-spa-app`, sob licença MIT (`README.md:2`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:311` registra rank 310, ID 984418769, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:311` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14010` (`terminology;technology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:14016` (`terminology;technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos oito hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `repositories` | `…#created:2025-05` | vazio |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `repositories` | `…#created:2025-05` | vazio |
| `technology-single-spa-package-code`: `"single-spa" filename:package.json` | `code` | `…#size:1000..1149` | `react-vite-app/package.json` |
| idem | `code` | `…#size:1300..1449` | `angular-app/package.json` |
| idem | `code` | `…#size:1450..1599` | `root-config/package.json` |
| idem | `code` | `…#size:1800..1999` | `styleguide/package.json` |
| idem | `code` | `…#size:2000..2249` | `react-app/package.json` |
| `technology-single-spa-repositories`: `"single-spa" in:name,description,readme` | `repositories` | `…#created:2025-Q2` | vazio |

Coletas: rodada 001 entre 2026-10-07T18:35:16.819Z e 2026-10-07T23:33:38.669Z; rodada 002 entre 2026-10-08T15:38:07.285Z e 2026-10-08T16:20:59.766Z. As consultas de repositório acrescentam `pushed:>=2025-04-01` e a partição de criação; as de código, a faixa de `size`.

Metadados do hit: descrição nula, sem tópicos, linguagem TypeScript, sem licença, `fork: false`, tamanho 1268, criação em 2025-05-15T22:46:06Z, push em 2025-05-15T22:56:13Z.

Correspondência textual:
- “microfrontend”: `README.md:2` (“This is a microfrontend architecture poc…”); o plural “microfrontends” não aparece literalmente, e esse hit depende do processamento textual da busca do GitHub, que não está registrado.
- “single-spa”: `README.md:1` (“# Single-spa app with React Angular Vite and SystemJS”).
- Os cinco `package.json` casados contêm `single-spa` (por exemplo, `root-config/package.json:47`, `react-app/package.json:44`, `angular-app/package.json:25–26`, `react-vite-app/package.json:17`, `36`); `styleguide/package.json` não foi aberto além do inventário e não é citado como evidência.

A última alteração do README é o próprio SHA `1fe831d` (2025-05-16, “Readme improvements”), anterior às coletas de 7 e 8 de outubro de 2026; os `package.json` vêm da raiz `8a9367e` (2025-05-16). Nenhum artefato do SHA é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 161 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Sete projetos com `package.json` próprio: `root-config`, `react-app`, `angular-app`, `react-vite-app`, `common-lib-webpack`, `styleguide`, `vue-app`. | forte |
| Configuração (root) | `root-config/src/org1-root-config.ts:3–19`: `registerApplication` de `@org1/react-app` (`/react`), `angular-app` (`/angular`) e `react-vite-app` (`/react-vite`), cada um por `System.import`; `:21–23`: `start`. `root-config/src/index.ejs:62–84`: import map SystemJS local com `@org1/react-app` → `//localhost:8080/org1-react-app.js`, `angular-app` → `//localhost:4200/main.js`, `react-vite-app` → `//localhost:3001/spa.js`, `styleguide` → `//localhost:3002/styleguide.system.js`, `@paok/common-lib-webpack` → `//localhost:9001/index.js`, com `scopes` que dão React 16 ao `react-app` e React 19 ao `react-vite-app`; `:102–136`: registra dependências compartilhadas no SystemJS e importa o root config; `:177–195`: barra de navegação com `singleSpaNavigate`. `root-config/package.json:4`: porta 9000. | forte |
| Configuração / Código-fonte (react-app) | `react-app/webpack.config.js:5–10`: preset `webpack-config-single-spa-react-ts` com `orgName: "org1"`, `projectName: "react-app"` (gera `org1-react-app.js`); `:13–16`: `externals` para `@paok/common-lib-webpack` e `styleguide`. `react-app/src/org1-react-app.tsx:6–16`: `singleSpaReact` e exportação de `bootstrap`, `mount`, `unmount`. A porta 8080 não é declarada no repositório (`react-app/package.json:4`, `webpack serve`); corresponde ao padrão do preset, não verificado sem instalação. | forte |
| Configuração / Código-fonte (angular-app) | `angular-app/angular.json:21–36`: builder `@angular-builders/custom-webpack`, `main: src/main.single-spa.ts`, `libraryName: angular-app`, `libraryTarget: umd`, `deployUrl: http://localhost:4200/`. `angular-app/package.json:11`: `ng s … --port 4200`. `angular-app/src/main.single-spa.ts:20–31`, `112–114`: `singleSpaAngular` e lifecycles exportados (com controle de estilos por atributo). | forte |
| Configuração / Código-fonte (react-vite-app) | `react-vite-app/vite.config.ts:14–33`: saída `format: "system"` com React e libs compartilhadas como `external`; `:37–41`: `vite-plugin-single-spa` com `type: "mife"`, `serverPort: 3001`, `spaEntryPoints: ["src/spa.tsx"]`. `react-vite-app/src/spa.tsx:8–15`, `99–101`: `singleSpaReact` e lifecycles com CSS. `react-vite-app/package.json:11`: `dev:single-spa` com build em watch e preview. | forte |
| Código-fonte (módulos utilitários) | `common-lib-webpack/webpack.config.js:34–35`, `49–55`: `index.js` em formato `system`, porta 9001; `common-lib-webpack/src/user-state.ts:3–19`: estado de usuário em `BehaviorSubject`. `styleguide/vite.config.ts:19–41`: biblioteca em formato `system`, preview na porta 3002. Consumidos em runtime: `react-app/src/App.tsx:2`, `react-vite-app/src/App.tsx:5–6`, `angular-app/src/app/app.component.ts:3`, `15–18`, todos marcados como externos nos builds. | moderada |
| Código-fonte (fronteiras) | Busca por todo `../` em `*.ts`, `*.tsx`, `*.js`, `*.vue`, `*.json`, `*.ejs` e `*.html` (exceto lockfiles): nenhum import de código-fonte entre as aplicações. As únicas referências entre pastas são dependências `file:../common-lib-webpack` e `file:../styleguide` em `react-app/package.json:56`, `65`, `angular-app/package.json:23` e `react-vite-app/package.json:14`, `18`, para os dois módulos utilitários, que os builds externalizam (`react-app/webpack.config.js:13–16`; `angular-app/extra-webpack.config.js:7–10`; `react-vite-app/vite.config.ts:17–23`) e o root config resolve pelo import map. | forte |
| Estrutura (fora da composição) | `vue-app/package.json:5–9` e `vue-app/src/main.ts:7–11`: scaffold Vue 3 que monta sozinho em `#app`; não aparece no root config nem no import map. | contexto |
| Documentação | `README.md:12–34`: como subir cada aplicação e o root em `localhost:9000`, com rotas `/react` e `/angular`; não descreve `react-vite`, `styleguide` nem `common-lib-webpack`. | moderada |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 2 commits (2 em todos os refs), nenhum merge, autor e committer `alexc <alexchih02@gmail.com>`: a raiz `8a9367e` (2025-05-16, “initial commit”) adiciona todos os projetos em bloco; o SHA `1fe831d` (“Readme improvements”) só altera `README.md`. O README declara derivação de `nitinreddy3/react-ng-spa-app` (MIT) (`README.md:2`); como o histórico começa com tudo pronto, não é possível separar pelos metadados o que veio do exemplo de origem e o que foi acrescentado (por exemplo, `react-vite-app`, `styleguide`, `common-lib-webpack`, ausentes da documentação de execução). `git rev-list --objects $SHA --missing=print` identifica 1 objeto histórico ausente; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `root-config` e as três aplicações registradas (`react-app`, `angular-app`, `react-vite-app`), referenciadas pela configuração de composição (`root-config/src/org1-root-config.ts:3–19`; `index.ejs:62–84`). |
| Q2 | Yes | Cada aplicação tem entrada e build próprios (preset webpack, Angular CLI com custom-webpack, Vite) e porta própria; não há import de código-fonte entre elas, só consumo em runtime de módulos utilitários externalizados. |
| Q3 | Yes | O root config registra, roteia (`activeWhen`) e carrega as três aplicações, com navegação por `singleSpaNavigate` (`index.ejs:177–195`). |
| Q4 | Yes | single-spa configurado nos dois lados: `registerApplication` + import map SystemJS com URLs coerentes com os bundles gerados (`org1-react-app.js`, `main.js` em `deployUrl` 4200, `spa.js` em `serverPort` 3001), e lifecycles exportados em cada aplicação. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- Q1–Q5 são Yes, o que satisfaz a regra de `MFE-implemented`. Corresponde a “single-spa root configuration together with its applications” e a “examples… that actually compose frontend units” (`repo_type: example`, “poc”, `README.md:2`).
- A cadeia é completa e coerente para as três aplicações, comparável aos casos de cadeia completa (076/084/096/106/109) e ao final 058 (lifecycles single-spa com bundle SystemJS), aqui com o root config presente.
- Os módulos `common-lib-webpack` e `styleguide` são dependências compartilhadas em runtime (utility modules), não unidades compostas; seu uso não caracteriza code sharing como mecanismo único (089/100), porque as aplicações são montadas por rota pelo root config.
- A origem declarada em exemplo de terceiro (`README.md:2`) não torna a composição externa ao repositório, ao contrário de 102/074/080: o root config, as aplicações e o import map estão no snapshot.
- `frontend_units: 4` conta o root config e as três aplicações registradas; não conta os dois módulos utilitários nem o `vue-app`, sem relação de composição (como a leitura de 193 para demos não relacionadas). `approaches: [single-spa]`, `ui_technologies: [react, angular]`, `build_tools: [webpack, vite]`, `unit_organization: monorepo`.
- Não há decisão aberta que mude a classe.

## Notas para análise

- **RQ2:** single-spa com import map SystemJS e `scopes` para conviverem React 16 (UMD) e React 19 (ESM via `esm.sh`) na mesma página (`root-config/src/index.ejs:35–48`, `73–82`, `102–134`); aplicação Vite integrada por `vite-plugin-single-spa` (`type: "mife"`); dois utility modules compartilhados por import map.
- **RQ3:** estado compartilhado entre aplicações de frameworks diferentes por um `BehaviorSubject` em módulo SystemJS (`common-lib-webpack/src/user-state.ts:3–19`), consumido por React e Angular.
- **RQ1:** a porta 8080 do `react-app` não está escrita no repositório; a coerência com o import map depende do padrão do preset `webpack-config-single-spa`, não verificado sem instalação.
- **Protocolo (terceiros):** derivação declarada de `nitinreddy3/react-ng-spa-app` (`README.md:2`); a mesma conta tem `Alex18gr/microfrontends-in-action-demos` e `Alex18gr/Alex18gr` nas rodadas (`data/discovery/mfe-round-002/candidates.csv:19652`, `15427`), fora deste snapshot.
- **Contagem de unidades:** contando também `vue-app`, `styleguide` e `common-lib-webpack` como projetos frontend identificáveis, o valor seria 7; a classe não muda.

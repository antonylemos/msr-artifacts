---
schema: 1
id: 1041883313
full_name: irfanswr/react-microfrontend
url: https://github.com/irfanswr/react-microfrontend
commit: 00ca0bf8640b7015f760f377f76c971b11fdc95c
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [single-spa]
ui_technologies: [react, vue]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 163 — irfanswr/react-microfrontend

## Contexto

Exemplo single-spa com três projetos irmãos: `parent-app/` (root config com `single-spa-layout` e import map), `react-child-app/` (aplicação React com lifecycles `single-spa-react`) e `vue-child-app/` (aplicação Vue 3 com lifecycles `single-spa-vue`). O root config registra e roteia as duas aplicações (`parent-app/src/frontenddevs-root-config.js:1–20`; `parent-app/src/microfrontend-layout.html:1–14`; `parent-app/src/index.ejs:15–42`). Não há README na raiz. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:164` registra rank 163, ID 1041883313, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:164` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17899` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:17904` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `terminology-microfrontend-repositories#created:2025-08` | `microfrontend in:name,description,readme pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T18:50:58.228Z / 2026-10-08T15:39:06.213Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 273;
- criação em 2025-08-21T06:42:22Z, push em 2025-08-21T06:43:14Z.

**Origem do acerto.** Não há README na raiz do SHA; o único README, `vue-child-app/README.md`, não contém o termo, e a descrição é nula. Por eliminação, o acerto vem do campo `name`, que contém “microfrontend”. Isso registra a proveniência; o nome não é usado como evidência de classificação. O SHA (2025-08-21) é o único commit e é anterior às coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 38 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos com `package.json`, lockfile e configuração de build próprios: `parent-app/`, `react-child-app/` e `vue-child-app/`. Não há manifesto de workspace na raiz. | contexto |
| Configuração (root config) | `parent-app/src/frontenddevs-root-config.js:9–20`: `constructRoutes(microfrontendLayout)`, `constructApplications({ loadApp: ({ name }) => import(name) })`, `registerApplication` para cada aplicação, `layoutEngine.activate()` e `start()`. `parent-app/src/microfrontend-layout.html:1–14`: rota padrão com as duas aplicações, mais `/react-app` e `/vue-app`. | forte |
| Configuração (import map) | `parent-app/src/index.ejs:15–26`: import map de dependências compartilhadas (React, react-dom, single-spa por CDN). `parent-app/src/index.ejs:32–42`: em modo local, `@frontenddevs/root-config` → `//localhost:9000/…`, `@frontenddevs/react-mfe` → `http://localhost:8081/frontenddevs-react-mfe.js` e `@frontenddevs/vue-child-app` → `http://localhost:8082/js/app.js`. `:30`: import map de produção comentado. `:52–56`: carga do root config após o injetor. | forte |
| Código-fonte (unidades) | `react-child-app/src/frontenddevs-react-mfe.js:6–16`: `singleSpaReact` e exporta `bootstrap`, `mount` e `unmount`. `vue-child-app/src/main.js:6–26`: `singleSpaVue` e exporta os lifecycles. | forte |
| Build | `parent-app/webpack.config.js:5–27` (`webpack-config-single-spa`, porta 9000 em `package.json:4`). `react-child-app/webpack.config.js:4–15` (`webpack-config-single-spa-react`, porta 8081 em `package.json:4`). `vue-child-app/package.json:6–9`, `24` (`vue-cli-service` com `vue-cli-plugin-single-spa`, porta 8082). Cada projeto tem build próprio. O caminho `/js/app.js` do import map é compatível com a saída do Vue CLI, mas não foi verificado por build. | moderada |
| Código-fonte (fronteiras) | A busca por imports e requires `../` em todo o SHA não retorna nada. Os imports ficam dentro de cada projeto (por exemplo, `./root.component`, `./App.vue`, `./microfrontend-layout.html`). A ligação entre unidades é só por nome de módulo no import map e no layout. | contexto |

## Autoria e histórico

Clone não raso com um único commit, o SHA `00ca0bf` (2025-08-21T13:41:59+07:00, “initial”), de `irfan <irfan@gmail.com>` como autor e committer. Não há branches alternativos: `master`, `origin/master` e `origin/HEAD` apontam ao mesmo SHA. O histórico não permite distinguir código gerado por `create-single-spa` de código autoral, mas os nomes, portas e layout são específicos do projeto. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades no repositório: o root config e as duas aplicações, referenciadas pelo layout e pelo import map (`microfrontend-layout.html:4–11`; `index.ejs:36–38`). |
| Q2 | Yes | Cada unidade tem entrada e build próprios (`webpack.config.js` de cada projeto; `vue-cli-service`) e não há imports de código-fonte entre elas. |
| Q3 | Yes | O root config registra, roteia e monta as duas aplicações na mesma página (`frontenddevs-root-config.js:9–20`; `microfrontend-layout.html:1–14`). |
| Q4 | Yes | Mecanismo single-spa configurado e conectado: layout → `constructApplications` → `import(name)` resolvido pelo import map → lifecycles exportados (`frontenddevs-react-mfe.js:16`; `main.js:24–26`). |
| Q5 | Yes | Q1–Q4 são Yes: root config single-spa com duas aplicações em frameworks distintos. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “single-spa root configuration together with its applications” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot, como em 076/084/096/106/109: root, layout, import map local e lifecycles nas duas aplicações. O import map de produção comentado (`index.ejs:29–30`) não impede a composição documentada em modo local, que é o caminho executável do exemplo.
- Não é code sharing (089/100): as unidades são aplicações montadas por rota. Não é plataforma de terceiros (102/074/080) nem conteúdo (023): há código executável de composição.
- `approaches: [single-spa]`, com import maps como mecanismo de resolução. `ui_technologies: [react, vue]`. `build_tools: [webpack]`: webpack explícito no root e no React; o Vue CLI encapsula o webpack. `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** single-spa com `single-spa-layout` (layout HTML declarativo), `@single-spa/import-map-injector` e dependências compartilhadas por CDN, com aplicações React e Vue 3.
- **RQ3:** os conteúdos das aplicações são placeholders (título “is mounted!”, HelloWorld do Vue). O repositório demonstra a composição, não um domínio.
- **Protocolo (busca):** entrada só pela consulta `microfrontend`, sem README na raiz nem descrição; o acerto vem do campo `name`. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `single-spa`, `[react, vue]`, `webpack`, três unidades e `monorepo`; a cadeia host → layout single-spa → import map → dois filhos com lifecycles estáticos é resolvível, sem decisão aberta (`draft`). Citações completas para o checklist: Q1 `parent-app/src/microfrontend-layout.html:3–12` e `parent-app/src/index.ejs:35–39`; Q2 `parent-app/package.json:2–11`, `react-child-app/package.json:2–8`, `vue-child-app/package.json:2–9`, `parent-app/webpack.config.js:5–27`, `react-child-app/webpack.config.js:4–15` e `vue-child-app/vue.config.js:1–4` (plugin em `vue-child-app/package.json:21–24`); Q3 `parent-app/src/frontenddevs-root-config.js:9–20` e `parent-app/src/microfrontend-layout.html:1–14`; Q4 `react-child-app/src/frontenddevs-react-mfe.js:6–16` e `vue-child-app/src/main.js:6–26`, com a cadeia completa em `parent-app/src/frontenddevs-root-config.js:9–20`, `parent-app/src/index.ejs:35–39` e o layout `:3–12`; Q5 sintetiza a cadeia root/layout/import map/lifecycles. A busca negativa de `../` e o inventário de 38 arquivos por `git ls-tree` são registros de comando no SHA, não citações de arquivo. A proveniência vem das tabelas `hits` de `data/discovery/mfe-round-001/discovery.sqlite` e `mfe-round-002/discovery.sqlite`, filtradas por `repository_id=1041883313`. O histórico (um commit) não distingue código gerado por `create-single-spa` de código autoral, e a URL Vue é tratada como compatível, sem afirmar que o build foi executado.

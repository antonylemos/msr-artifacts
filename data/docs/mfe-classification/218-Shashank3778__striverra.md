---
schema: 1
id: 1139783096
full_name: Shashank3778/striverra
url: https://github.com/Shashank3778/striverra
commit: 86b6abfe7a59da0d7ff57c936e0564c67770f79a
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: library
approaches: []
ui_technologies: [react]
build_tools: []
frontend_units: 0
unit_organization: none
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 218 — Shashank3778/striverra

## Contexto

Cópia, com histórico completo, do pacote `@edx/frontend-component-header` da Open edX (`package.json:2–5`, `23–32`): “A generic header for Open edX micro-frontend applications” (`README.rst:11`). É uma biblioteca de componentes React (cabeçalhos desktop, mobile e de aprendizado), publicada em npm e instalada como dependência pelas MFEs da plataforma: “run the following command in your MFE: npm i --save @edx/frontend-component-header” (`README.rst:59–61`).

Os pontos de extensão são `PluginSlot` do `@openedx/frontend-plugin-framework` (por exemplo `src/plugin-slots/DesktopHeaderSlot/index.jsx:1–19`). A partir de 2025-11-04, o titular adicionou um tema próprio (“striverra theme header”) e versionou `dist/`. O snapshot é o branch padrão `headermfe`. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:219` registra rank 218, ID 1139783096, status `cloned`, branch `headermfe` e o commit do front matter, que é o HEAD do clone e de `origin/headermfe`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:219` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23764` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:23771` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-01` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:29:52.087Z / 2026-10-08T15:57:22.004Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T22:59:26.116Z / 2026-10-08T16:07:42.103Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 10.177;
- criação em 2026-01-22T12:10:21Z, push em 2026-01-22T12:53:04Z.

Grafias no README:
- “micro-frontend”: `README.rst:11` (“A generic header for Open edX micro-frontend applications”), também em `36`, `59`, `77` e `97`;
- “micro-frontends”: `README.rst:53` (“intended to be used in micro-frontends like frontend-app-authentication”).

A busca de frase trata o hífen como separador.

A última alteração do `README.rst` é `02533b0` (2025-07-04, upstream), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 361 entradas, 360 arquivos regulares `100644` e 1 executável `100755` (`public/index.html`); zero symlinks e zero gitlinks. `src/` tem 142 entradas (componentes e `plugin-slots/`), e `dist/` tem 191 (build versionado pelo titular); há também `example/`, `public/`, `webpack.dev.config.js`, `Makefile` e workflows upstream. | contexto |
| Configuração | `package.json:2–5`: `"name": "@edx/frontend-component-header"`, `"main": "dist/index.js"`, `files: ["/dist"]` (`:20–22`); `peerDependencies` de `@edx/frontend-platform`, `@openedx/paragon`, `react`, `react-router-dom` (`:66–73`). É pacote npm consumido por MFEs, não unidade implantável própria. Não há `ModuleFederationPlugin`, `remotes`, `registerApplication` ou import map. | contrária |
| Documentação | `README.rst:11`, `36`, `59–61`, `97`: o componente é instalado e importado pelas MFEs da Open edX, que o integram em build time. | contrária |
| Código-fonte | `src/plugin-slots/DesktopHeaderSlot/index.jsx:1–19`: `PluginSlot` com ID `org.openedx.frontend.layout.header_desktop.v1`, que permite à plataforma substituir ou estender o cabeçalho. A composição por plugins é feita pela plataforma Open edX, não por este repositório. | contexto |
| Busca | `git grep -i` por `micro.?front`, `mfe` e `federation` em `README.rst`, `package.json`, `catalog-info.yaml` e `.env.development`: só textos de documentação (`README.rst`; `catalog-info.yaml:8`). | ausente |

## Autoria e histórico

Clone não raso; 642 commits, 63 merges.
- **Upstream:** a raiz é `afe6705` (2019-09-13, Adam Butterworth, “fix: initial commit”). A maior parte do histórico é da Open edX e bots: `renovate[bot]` 250, Renovate Bot 85, mantenedores da edX/2U e outros.
- **Titular:** `Shashank3778 <anku3778@gmail.com>` tem 44 commits, de `477de4a` (2025-11-04, “striverra theme header first commit changed the design”) ao SHA `86b6abf` (2026-01-22, “headermfe”). São ajustes de tema, abas, menu de usuário e `dist/`.

O repositório é marcado `fork: false`, mas o histórico é o do projeto upstream. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | O repositório é uma biblioteca de componentes, não uma unidade frontend; nenhuma configuração referencia outras unidades. |
| Q2 | No | Sem unidades frontend em composição, não há independência a avaliar. O pacote é integrado às MFEs como dependência npm. |
| Q3 | No | Não há host, shell ou configuração raiz neste repositório; quem monta o cabeçalho são as MFEs da plataforma. |
| Q4 | No | Nenhum mecanismo de composição configurado; os `PluginSlot` são pontos de extensão consumidos pelo framework de plugins de terceiros. |
| Q5 | No | Q1–Q4 são No: componente compartilhado de um ecossistema de MFEs, sem composição própria. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “MFE frameworks and libraries” e, por analogia, a “component libraries”: é uma peça de UI compartilhada pelas MFEs da Open edX, distribuída por npm.
- O ecossistema hospedeiro é de terceiros (Open edX), como em 102/074/080, mas aqui o repositório nem é uma unidade daquele ecossistema; é uma biblioteca, como 015 e o rascunho 165.
- `repo_type: library`, `frontend_units: 0`, `unit_organization: none`, `approaches: []`, `ui_technologies: [react]`. `build_tools: []`, pois o build é encapsulado em `fedx-scripts`/`Makefile` (`package.json:10–18`), sem configuração de bundler do autor além do dev server.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** README de biblioteca de cabeçalho para “micro-frontend applications” da Open edX casa as consultas terminológicas; o branch `headermfe` reforça o rótulo.
- **Protocolo (amostra):** cópia de projeto upstream (`fork: false`) com 642 commits, dos quais 44 do titular; o snapshot é o branch padrão `headermfe`.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).

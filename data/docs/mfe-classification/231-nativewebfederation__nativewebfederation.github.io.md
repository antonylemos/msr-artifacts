---
schema: 1
id: 1396672130
full_name: nativewebfederation/nativewebfederation.github.io
url: https://github.com/nativewebfederation/nativewebfederation.github.io
commit: e4b2eea741a61065a6f6cbebe4c57f6e227c5450
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: other
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

# 231 — nativewebfederation/nativewebfederation.github.io

## Contexto

Site estático no GitHub Pages da “Native Web Federation (NWF)”, que se apresenta como comitê de padrões e grupo de pesquisa para padrões web “zero-dependency” (`README.md:1–6`). O README lista fases de um programa de especificação (`README.md:10–43`); a fase 2, “The Native Microfrontend (MFE) Protocol”, está em “Architectural Scoping” (`:18–22`).

O site é HTML/JS sem framework. Cada página (`index.html`, `blueprint/index.html`) contém um `<iframe>` que carrega um parcial `*.rmd.html` do próprio site. O parcial então substitui o próprio iframe pelo conteúdo do seu `<template>` (`frameElement.replaceWith(...)`), mecanismo que o projeto chama de “Remote Module Definition (RMD)”. Há um submódulo Git, `sovereigncommonsdistributed`, apontado por links de navegação. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:232` registra rank 231, ID 1396672130, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. O submódulo não foi inicializado. Não houve instalação, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:232` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:38133` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:38168` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontends`: `topic:microfrontends` | `terminology-topic-microfrontends` | 2026-10-07T18:18:43.496Z / 2026-10-08T15:34:28.993Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:03:58.018Z / 2026-10-08T15:44:15.548Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-09` | 2026-10-07T22:14:56.510Z / 2026-10-08T15:50:50.128Z |
| `technology-web-components-microfrontends-repositories`: `"web components" microfrontends in:readme` | `technology-web-components-microfrontends-repositories` | 2026-10-07T23:38:33.427Z / 2026-10-08T16:22:32.538Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e, nas buscas por mês, `created:2026-09-01..2026-09-30`.

Metadados do hit:
- descrição “The formal reference implementation, protocols, and standard specifications of the Native Web Federation.”;
- tópicos `microfrontends`, `web-components`, `federation` e outros;
- linguagem HTML, `fork: false`, tamanho 287;
- criação em 2026-09-29T22:42:53Z, push em 2026-10-06T22:42:47Z;
- homepage `nativewebfederation.github.io`.

Grafias:
- “Microfrontend”: `README.md:18` (“Phase 2: The Native Microfrontend (MFE) Protocol”);
- “Web Components”: `README.md:21`;
- o plural “microfrontends” não aparece literalmente no README; o tópico `microfrontends` responde pela consulta de tópico, e as consultas textuais no plural dependem do processamento da busca do GitHub, que não está registrado.

O README foi alterado pela última vez em `31d8a8c` (2026-09-30), antes das coletas. O SHA `e4b2eea` (2026-10-09T22:29:56Z), porém, é posterior às duas coletas: os commits posteriores (`a7de990`, `e4b2eea`) alteram `app/app.rmd.html`, logos e o ponteiro do submódulo, sem tocar no README.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 47 entradas, 46 arquivos regulares `100644` e 1 gitlink `160000` (`sovereigncommonsdistributed`, `.gitmodules:1–3`); zero symlinks. Há páginas (`index.html`, `blueprint/index.html`, `donors/index.html`), parciais (`app/app.rmd.html`, `app/children/footer/footer.rmd.html`, `blueprint/blueprint.rmd.html`), utilitários JS em `core/`, `lib/marked.min.js`, estilos e imagens. Não há manifesto de app nem bundler; `package.json:6–9` só tem um servidor de desenvolvimento (gulp + browser-sync, `gulpfile.dev.js:9–14`). | contexto |
| Código-fonte (parciais) | `index.html:14`: `<iframe src="./app/app.rmd.html">`. `app/app.rmd.html:222–228`: o parcial inclui o iframe do rodapé e executa `frameElement.replaceWith(content)`. `blueprint/blueprint.rmd.html:13–26`: busca `blueprint.md`, converte com `marked` e substitui o iframe. Os parciais são arquivos do mesmo site e do mesmo deploy, sem build ou entrada próprios. | contrária |
| Submódulo | `.gitmodules:1–3` aponta para `sovereigncommonsdistributed`. O site só o referencia por links (`app/children/footer/footer.rmd.html:56–59`; `app/app.rmd.html:196`); nenhum arquivo do snapshot carrega código dele. O gitlink não foi inicializado. | contexto |
| Documentação | `README.md:18–22` e `blueprint/blueprint.md:39–41`: o protocolo MFE é objetivo futuro (“Architectural Scoping”), descrito como plano de trabalho. | fraca |
| Busca | `git grep -i` no SHA por `micro.?front`: só `README.md:18`, `app/app.rmd.html:57` e `blueprint/blueprint.md:9`, `14`, `39`, `41`, todos textos descritivos. | contexto |

## Autoria e histórico

Clone não raso; 13 commits lineares, nenhum merge, todos de Cody Skylark Carlson `<otocarlson@gmail.com>` (o primeiro, `d2291fa`, como `cScarlson` pela interface web), de 2026-09-29 a 2026-10-09. Mensagens com prefixo “-1:” descrevem página, README, manifesto, favicons, deploy e logos. Nenhum blob histórico foi lido e não houve objeto ausente. O commit do gitlink não foi buscado.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Um único site; os `*.rmd.html` são parciais de conteúdo do mesmo site, e o submódulo só é referenciado por links. |
| Q2 | No | Os parciais não têm entrada, build ou deploy próprios e são servidos juntos pelo mesmo site estático. |
| Q3 | No | Não há host compondo unidades; as páginas incluem seus próprios fragmentos. |
| Q4 | No | O mecanismo de iframe com autossubstituição funciona como inclusão de fragmentos HTML de um mesmo site, não como composição de unidades frontend (`index.html:14`; `app/app.rmd.html:226–227`). |
| Q5 | No | Q1–Q4 são No: site institucional de um programa de especificação que trata micro-frontends como fase futura. |

## Motivo

- `Non-MFE` pela regra “at least one question is No”. Corresponde a “repositories mentioning micro-frontends without implementing them” e a “conventional frontend monoliths”.
- O uso de `<iframe>` não depende da decisão aberta sobre composição por iframe: os fragmentos carregados são parciais do próprio site, sem independência de build ou deploy (Q2 No).
- Sem unidades compostas, não cabem os casos 102/074/080 (terceiros). O submódulo é apenas destino de links de navegação.
- `frontend_units: 1`, `unit_organization: single-unit`, `ui_technologies: []` (HTML/JS sem biblioteca de UI), `build_tools: []` (sem bundler), `repo_type: other` (site institucional).
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** tópico `microfrontends` e menção a um “Native Microfrontend (MFE) Protocol” ainda em escopo, num site institucional de especificação.
- **Protocolo (snapshot):** o SHA de `clones.csv` é posterior às duas coletas, mas os arquivos que contêm os termos buscados (README, descrição e tópicos) não mudaram nesse intervalo.
- **Protocolo (busca):** a elegibilidade muda de `unknown` (001) para `pass` (002).

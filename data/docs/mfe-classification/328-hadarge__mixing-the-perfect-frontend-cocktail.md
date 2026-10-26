---
schema: 1
id: 1023885635
full_name: hadarge/mixing-the-perfect-frontend-cocktail
url: https://github.com/hadarge/mixing-the-perfect-frontend-cocktail
commit: e7c5673b9b1aa4fdcb2a9fed774c01d3a1b15b9e
classification: Non-MFE
checklist: { q1: no, q2: no, q3: no, q4: no, q5: no }
repo_type: example
approaches: []
ui_technologies: [vue, react, angular]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 328 — hadarge/mixing-the-perfect-frontend-cocktail

## Contexto

Repositório de exemplo de uma palestra de meetup sobre expor componentes Vue como Custom Elements e consumi-los em outros frameworks; entre os temas está “Micro frontends using Web Components” (`README.md:1–13`, `95–99`). Tem três aplicações:
- `vueApp` (Vite, porta 3333), que gera um bundle de Web Components (`wcMain`);
- `reactApp` (Vite, porta 2222, segundo o README);
- `angularApp` (Angular CLI, porta 4200).

React e Angular renderizam `<like-button>` e `<video-player>` e carregam o bundle de Web Components de `http://127.0.0.1:8080/assets/wcMain2.js`. No SHA, porém, o build do Vue não gera `wcMain2.js`, e o `wcMain.ts` atual registra só `<my-element>`: os registros de `like-button` e `video-player` estão comentados. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:329` registra rank 328, ID 1023885635, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:329` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:16687` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:16691` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, todos do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2025-07` | 2026-10-07T22:23:25.993Z / 2026-10-08T15:55:00.383Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2025-07` | 2026-10-07T22:55:22.281Z / 2026-10-08T16:06:09.612Z |
| `technology-web-components-mfe-repositories`: `"web components" "micro frontends" in:readme` | (sem partição) | 2026-10-07T23:36:44.830Z / 2026-10-08T16:22:04.662Z |

As consultas de terminologia acrescentam `pushed:>=2025-04-01 created:2025-07-01..2025-07-31`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem Vue, `fork: false`, tamanho 199;
- criação em 2025-07-21T21:14:27Z, push em 2025-07-23T06:29:37Z.

Grafias no README:
- “Micro frontends”: `README.md:13` (“🧩 Micro frontends using Web Components”);
- “micro frontend”: `README.md:91` (“…powerful micro frontend possibilities…”);
- “Web Components”: `README.md:3`, `13`, `88`, `90`.

A última alteração do README é `9cf3b04` (2025-07-22), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 71 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três apps (`vueApp`, `reactApp`, `angularApp`), cada uma com `package.json`, lockfile, config de build e `src/`; na raiz, `README.md` e `.idea/`. | contexto |
| Produtor (Vue) | `vueApp/vite.config.ts:18–29`: entradas `main` e `wcMain` com saída `assets/[name].js`, ou seja, gera `assets/wcMain.js`. `vueApp/package.json:8–12`: `build` faz build e `serve` (`http-server --cors` em `dist`). `vueApp/src/webcomponents/defineLikeButton.ts:1–12`: `defineCustomElement(LikeButton)` registrado como `like-button`. `vueApp/src/wcMain.ts:1–3`: registra só `my-element`; os registros de `like-button` e `video-player` estão comentados (`:5–10`, `20–24`). | ambígua |
| Consumidor (Angular) | `angularApp/src/index.html:9`: `<script type="module" src="http://127.0.0.1:8080/assets/wcMain2.js">`. `angularApp/src/app/app.html:190–191`: `<video-player>` e `<like-button #likeBtn>`. `angularApp/src/app/app.ts:9`, `14–27`: `CUSTOM_ELEMENTS_SCHEMA` e callback `onLikeChange`. | moderada |
| Consumidor (React) | `reactApp/src/App.tsx:61–73`: `<LikeButton>` e `<VideoPlayer>`, wrappers de `CustomElement` (`reactApp/src/components/Base.tsx:15–27`). `:77–82`: botão “Dynamic load” que injeta o mesmo `wcMain2.js`. `reactApp/index.html:9` e `reactApp/src/main.tsx:5` têm a carga estática comentada. | moderada |
| Descompasso | `git grep wcMain2` no SHA: só as referências dos consumidores; nenhum entry ou arquivo `wcMain2` no `vueApp`. Os elementos consumidos (`like-button`, `video-player`) não são registrados pelo `wcMain.ts` atual. O SHA (“import name change”) altera `wcMain.ts`, `component1.*`, `wcindex.html` e `reactApp/src/main.tsx`, e o commit anterior se chama “init state”. | contrária |
| Código-fonte (fronteiras) | Busca por imports com `../../` no SHA: nenhum; `reactApp/src/main.tsx:5` e `vueApp/src/main.ts:4` têm imports entre apps comentados. Cada app só importa os próprios arquivos e pacotes. | contexto |

## Autoria e histórico

Clone não raso; 10 commits lineares, nenhum merge, todos de `hadarge`, de 2025-07-22 (`5ff9ea5`, “first commit”) a 2025-07-23 (SHA `e7c5673`, “import name change”). Entre eles estão `0ede992` (“align react and angular to use the vue package”) e `6713980` (“init state”). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | No | Embora existam três aplicações, não há unidade externa efetivamente integrada: a referência dos hosts não corresponde ao bundle produzido pelo Vue. |
| Q2 | No | A separação dos projetos não forma unidades participantes de uma composição funcional no snapshot. |
| Q3 | No | Os hosts tentam renderizar elementos que o produtor não registra e apontam para um bundle inexistente. |
| Q4 | No | `wcMain2.js` não é gerado e os Custom Elements consumidos estão comentados; a cadeia de integração está desconectada. |
| Q5 | No | Q1–Q4 não demonstram composição funcional entre unidades frontend. |

## Motivo

- Classificado como `Non-MFE`: os consumidores apontam para um bundle inexistente e tentam usar elementos que o produtor não registra no snapshot.
- **Comparação:** há produtor e consumidores, mas a ligação de integração está objetivamente desconectada nesta versão.
- **Campos:**
  - `approaches: [web-components]` (Custom Elements Vue distribuídos por script, como em 049);
  - `ui_technologies: [vue, react, angular]`;
  - `build_tools: [vite]` (Vite nas apps Vue e React; o Angular usa `@angular/build`);
  - `frontend_units: 3`, `unit_organization: monorepo`;
  - `repo_type: example` (repositório de palestra).

## Notas para análise

- **RQ2:** Web Components como mecanismo de integração entre frameworks: o Vue `defineCustomElement` é consumido por React (wrapper que atribui propriedades e callbacks) e por Angular (`CUSTOM_ELEMENTS_SCHEMA` e `ViewChild`).
- **Protocolo (busca):** entrada também pela consulta tecnológica de Web Components, com grafias literais. A elegibilidade muda de `unknown` (001) para `pass` (002).

## Decisão registrada

Classificado como `Non-MFE`. React e Angular apontam para `wcMain2.js`, arquivo que o build Vue não produz, e os elementos consumidos estão comentados no produtor. A versão analisada não contém uma composição conectada.

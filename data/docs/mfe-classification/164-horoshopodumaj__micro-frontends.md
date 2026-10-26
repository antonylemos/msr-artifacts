---
schema: 1
id: 1384034898
full_name: horoshopodumaj/micro-frontends
url: https://github.com/horoshopodumaj/micro-frontends
commit: e1e0a52e4ce5b444ad774b3db87bfaf30cbacf05
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react, vue]
build_tools: [rspack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 164 — horoshopodumaj/micro-frontends

## Contexto

Demonstração de Module Federation com Rspack, com README em russo e três aplicações:
- `host` (React), que consome `remote`;
- `remote` (React), que expõe `./RemoteContent` e consome `vue_remote`;
- `vue-remote` (Vue 3), que expõe `./Counter` e o próprio `vue`.

O README chama isso de “federação aninhada” host → remote → vue_remote (`README.md:1–34`, `133`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:165` registra rank 164, ID 1384034898, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:165` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:37818` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:37850` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos cinco hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-09` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T22:03:48.491Z / 2026-10-08T15:44:10.757Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:14:40.356Z / 2026-10-08T15:50:44.553Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | 2026-10-07T22:42:26.531Z / 2026-10-08T16:02:06.454Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | 2026-10-07T23:12:35.014Z / 2026-10-08T16:10:44.980Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | 2026-10-07T23:31:04.154Z / 2026-10-08T16:19:36.684Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 86;
- criação em 2026-09-23T18:46:24Z, push em 2026-09-23T18:58:30Z.

Grafias no README:
- “Microfrontends”: `README.md:1` (“# Microfrontends Demo (Rspack + Module Federation)”);
- “Module Federation”: `README.md:1`, `3`, `136`.

As formas “microfrontend” (singular), “micro frontend” e “micro frontends” não aparecem no README nem na descrição; nos demais pontos o README usa o russo “микрофронтенд…” e “microfront” (`README.md:24`, `30`). Os hits `"micro frontend"`/`"micro frontends"` podem vir do campo `name` (`micro-frontends`, com hífen como separador), e o hit `microfrontend` do processamento textual da busca do GitHub, que não está registrado. Isso registra só a proveniência; o nome não é usado como evidência de classificação.

O README foi criado no próprio SHA, `e1e0a52` (2026-09-23), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 46 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos com `package.json`, `rspack.config.ts` e `module-federation.config.ts` próprios: `host/`, `remote/` e `vue-remote/`. O README chama o último de `vue_remote/` (`README.md:62`, `78`, `123`), que é o nome do container, não o do diretório. Não há workspace na raiz. | contexto |
| Configuração (host) | `host/module-federation.config.ts:1–8`: `remotes: { remote: 'remote@http://localhost:3001/remoteEntry.js' }`, `exposes: {}`, `shared` react/react-dom. `host/rspack.config.ts:5`, `81`: `ModuleFederationPlugin` de `@module-federation/enhanced/rspack`. | forte |
| Configuração (remote) | `remote/module-federation.config.ts:1–11`: `filename: 'remoteEntry.js'`, `remotes: { vue_remote: 'vue_remote@http://localhost:3002/remoteEntry.js' }`, `exposes: { './RemoteContent' }`. `remote/rspack.config.ts:24–34`, `81`: porta 3001, `publicPath` `http://localhost:3001/`. | forte |
| Configuração (vue-remote) | `vue-remote/module-federation.config.ts:1–14`: `exposes: { './Counter': './src/Counter.vue', './vue': 'vue' }`, `shared` vue singleton e eager. `vue-remote/rspack.config.ts:23–34`, `78–82`: porta 3002, `VueLoaderPlugin`, `ModuleFederationPlugin`. | forte |
| Código-fonte (consumo) | `host/src/App.tsx:3`, `19`: `import RemoteContent from 'remote/RemoteContent'`, renderizado no conteúdo. `remote/src/RemoteContent.tsx:2`, `10`: usa `CounterWrapper`. `remote/src/CounterWrapper.tsx:2–13`: importa `vue_remote/Counter` e `createApp` de `vue_remote/vue` e monta o componente Vue num `div` (React → Vue). `host/src/index.ts:1`, `remote/src/index.ts:1` e `vue-remote/src/index.ts:1`: bootstrap assíncrono. | forte |
| Código-fonte (fronteiras) | A busca por imports e requires `../` em todo o SHA não retorna nada. Os imports entre unidades usam só nomes federados (`remote/…`, `vue_remote/…`). As declarações de tipos são locais: `host/@mf-types/remote/*.d.ts` (tipos gerados do remoto) e `remote/src/types/remote.d.ts:1–11`. | contexto |
| Build/deploy | `host/package.json:4–8`, `remote/package.json:4–8` e `vue-remote/package.json:4–8`: `rspack build`/`rspack serve` em cada projeto, com portas 3000/3001/3002 (`README.md:40–44`). | moderada |

## Autoria e histórico

Clone não raso com 2 commits, nenhum merge, de Diana Murtazina:
- `5501ade` (2026-09-23T21:46:17+03:00, “demo micro frontends”, `<murka8831@yandex.ru>`) adiciona os 45 arquivos de código;
- o SHA `e1e0a52` (2026-09-23T21:58:30+03:00, “Create README.md”, noreply, via GitHub) adiciona só o README.

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades no repositório, referenciadas pelas configurações de composição (`host/module-federation.config.ts:3–5`; `remote/module-federation.config.ts:4–6`). |
| Q2 | Yes | Cada unidade tem entrada, build e servidor próprios (`*/rspack.config.ts`; `*/package.json`), sem imports de código-fonte entre elas. |
| Q3 | Yes | O host monta `RemoteContent` (`host/src/App.tsx:19`), que por sua vez monta o `Counter` Vue (`remote/src/CounterWrapper.tsx:9–10`) na mesma página. |
| Q4 | Yes | Module Federation configurado e consumido nos dois elos: `remotes` → `exposes` → import federado → render/mount (`host/src/App.tsx:3`; `remote/src/CounterWrapper.tsx:2–3`). |
| Q5 | Yes | Q1–Q4 são Yes: exemplo de MF aninhada entre React e Vue. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot, como em 076/084/096/106/109, e aninhada: o `remote` é ao mesmo tempo produtor para o host e consumidor do `vue_remote`.
- Não é code sharing (089/100): o host compõe a área de conteúdo com um fragmento de UI remoto, e o `remote` monta um componente Vue como aplicação (`createApp`). Os componentes são simples, mas o elo host → remote compõe uma seção da aplicação. A exposição de `./vue` serve para montar o componente, não é o objeto da composição.
- Não há plataforma de terceiros (102/074/080) nem conteúdo sem implementação (023).
- `approaches: [module-federation]`, `ui_technologies: [react, vue]`, `build_tools: [rspack]`, `frontend_units: 3`, `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** Module Federation aninhada (host → remote → vue_remote) com `@module-federation/enhanced` em Rspack. A integração entre frameworks se faz expondo o próprio `vue` (`./vue`) para montar o componente Vue dentro do React.
- **RQ3:** tipos do remoto gerados em `host/@mf-types/` e versionados.
- **Protocolo (busca):** cinco consultas casam. Só “Microfrontends” e “Module Federation” têm grafia literal (`README.md:1`); os demais hits dependem do processamento textual do GitHub. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, `[react, vue]`, `rspack`, três unidades e `monorepo`; sem decisão aberta (`draft`). A composição é executável em dois elos: host React → remote React → componente Vue remoto. Precisões: (1) o componente intermediário `remote/src/RemoteContent.tsx:2–10` conecta a exposição federada ao wrapper Vue e entra na cadeia; os tipos gerados estão em `host/@mf-types/remote/RemoteContent.d.ts:1–12`; (2) Q2 e Q5 devem apontar caminhos concretos por unidade (`host`, `remote` e `vue-remote`: `rspack.config.ts` e `package.json` de cada uma) e a cadeia de composição, em vez de curingas; (3) defeito de limpeza verificado: `remote/src/CounterWrapper.tsx:12` retorna `counter.unmount` sem invocá-lo (`return () => counter.unmount`), o que pode impedir a desmontagem do app Vue quando o React limpa o efeito, sem eliminar a montagem nem a ligação federada; (4) inconsistência documental verificada: o README manda entrar em `vue_remote` (`README.md:62,78,123`), mas o diretório é `vue-remote`, e `vue_remote` é o nome do container federado, de modo que os comandos copiados literalmente podem falhar; (5) proveniência: o banco registra os termos, os hits e os metadados, mas não o campo casado; descrição nula e tópicos vazios eliminam esses dois campos, e não o README (`Microfrontends` e `Module Federation` em `README.md:1,3,136`), de modo que a origem não é recuperável por campo (o nome `micro-frontends` é plausível para as frases com espaço); isso não afeta a classificação. O README (2026-09-23) é anterior às buscas.

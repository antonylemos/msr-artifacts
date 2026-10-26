---
schema: 1
id: 985556796
full_name: dvreddy007/mfe-sample
url: https://github.com/dvreddy007/mfe-sample
commit: d4cef45fce1d97c3d4d80d232dc9e9fbad9cfd1a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [vue]
build_tools: [vite]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 245 — dvreddy007/mfe-sample

## Contexto

“Micro Frontend Sample” (`README.md:1–3`): monorepo Lerna/npm workspaces com um host Vue 3 e dois remotes Vue 3, todos em Vite com `@module-federation/vite`. O host registra os remotes em runtime por um manifesto de rotas e monta cada um num contêiner por `mount`/`unmount` (`README.md:5–11`, `:72`). A instrução de instalação manda clonar outro repositório, `https://github.com/lmlong-huynh/micro-frontend-sample.git` (`README.md:39–43`), o que indica que o conteúdo provém de um exemplo de terceiro. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:246` registra rank 245, ID 985556796, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:246` registra as estratégias `terminology;technology;broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:14069` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:14075` (`pass`), ambos com as três estratégias.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos sete hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-package-code`: `"@module-federation" filename:package.json` | code | `…#size:300..399` | `packages/app-1/package.json` | 2026-10-07T18:18:51.057Z / 2026-10-08T15:34:35.243Z |
| idem | code | `…#size:300..399` | `packages/app-2/package.json` | 2026-10-07T18:18:51.057Z / 2026-10-08T15:34:35.243Z |
| idem | code | `…#size:400..499` | `packages/host/package.json` | 2026-10-07T18:19:01.958Z / 2026-10-08T15:34:47.034Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | repositories | `…#created:2025-05` | vazio | 2026-10-07T22:21:34.178Z / 2026-10-08T15:54:11.457Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | repositories | `…#created:2025-05` | vazio | 2026-10-07T22:52:58.133Z / 2026-10-08T16:05:37.452Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2025-05` | vazio | 2026-10-07T23:17:40.301Z / 2026-10-08T16:14:14.931Z |
| `broader-micro-apps`: `"micro apps" frontend in:name,description,readme` | repositories | `…#created:2025-Q2` | vazio | 2026-10-07T23:48:17.033Z / 2026-10-08T16:26:41.575Z |

As consultas de repositório acrescentam `pushed:>=2025-04-01` e `created:2025-05-01..2025-05-31` (ou `2025-04-01..2025-06-30` para `broader-micro-apps`); as de código acrescentam a faixa `size:`.

Metadados do hit (iguais nas duas rodadas): descrição “mfe-sample”, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 83, criação em 2025-05-18T02:54:06Z, push em 2025-05-25T23:45:05Z.

Correspondências no SHA:
- **Código:** os três `package.json` casados declaram `@module-federation/vite` (`packages/app-1/package.json:16`; `packages/app-2/package.json:16`; `packages/host/package.json:18–19`, este também com `@module-federation/runtime`). Tamanhos no SHA: 351, 351 e 422 bytes, dentro das faixas.
- **“micro frontend”:** `README.md:1` (“Micro Frontend Sample”), também `:3`, `:15`, `:65`.
- **“micro frontends”:** `README.md:7` (“from micro frontends”), `:10`, `:11`.
- **“module federation”:** `README.md:3`, `:17`, `:72`.
- **“micro apps” + frontend:** `README.md:8` (“between different micro apps”), com “frontend” em `README.md:3` e outras linhas.

O `README.md` só existe no commit-raiz `e4a97c4` (2025-05-17) e não foi alterado depois; o SHA (2025-05-25) só adiciona o workflow. Ambos antecedem as coletas de outubro de 2026, e o README do SHA não é posterior às buscas.

**Repositório de origem citado:** `lmlong-huynh/micro-frontend-sample` (ID 929178189) consta como candidato nas duas rodadas (`data/discovery/mfe-round-001/candidates.csv:11705`; `data/discovery/mfe-round-002/candidates.csv:11710`), estratégia `technology`, descrição “A sample project using Vite, Module Federation and Vue”, `fork: false`, elegibilidade `fail` por `push_before_threshold`. Não está em `sample.csv` e não foi inspecionado; nenhuma comparação de conteúdo foi feita.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 50 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Raiz com `package.json` (workspaces `packages/*`, `package.json:4–6`), `lerna.json`, lockfile e workflow; três pacotes `packages/host`, `packages/app-1`, `packages/app-2`, cada um com `package.json`, `vite.config.js`, `index.html` e `src/`. Cada pacote tem `.__mf__temp/<nome>/localSharedImportMap.js`, arquivo gerado pelo plugin (`:2`) e versionado. | contexto |
| Configuração (remotes) | `packages/app-1/vite.config.js:9–16`: `federation({ name: 'app1', filename: 'remoteEntry.js', exposes: { './entry': './src/entry.js' }, shared: ['vue'] })`, porta 5011 (`:18–20`). `packages/app-2/vite.config.js:9–16`: idem com `name: 'app2'`, porta 5012 (`:18–20`). | forte |
| Código-fonte (contrato dos remotes) | `packages/app-1/src/entry.js:6–25` e `packages/app-2/src/entry.js:6–25`: `export const mount = (container)` cria uma instância Vue própria e a monta no contêiner; `export const unmount`. Cada remote também roda isolado por `src/main.js:1–5` e `index.html:11`. | forte |
| Configuração (host) | `packages/host/vite.config.js:10–14`: `federation({ name: 'host', filename: 'remoteEntry.js', shared: ['vue'] })`, sem `remotes` estáticos; porta 5010 (`:21–23`). `packages/host/src/routeManifest.js:1–28`: `module: 'app1'`, `entry: 'http://localhost:5011/remoteEntry.js'`, rota `/app-1`; `module: 'app2'`, `entry: 'http://localhost:5012/remoteEntry.js'`, rota `/app-2`. | forte |
| Código-fonte (composição) | `packages/host/src/main.js:5–6`, `:15`: `app.use(federationPlugin, getRemotes())`. `packages/host/src/plugins/federationPlugin.js:9–18`: `init({ name: 'host', remotes })` de `@module-federation/runtime` com `type: 'module'`; `:28–34`: `loadRemote(`${module}/entry`)` devolve `mount`/`unmount`. `packages/host/src/router/index.js:4–12`: cada rota do manifesto aponta para `Loader.vue`. `packages/host/src/components/Loader.vue:63–84`, `:87–109`: localiza o remote pela rota, desmonta o anterior, carrega e chama `mount(containerRef)`. `packages/host/src/App.vue:4–8`: navegação para `/app-1` e `/app-2` com `RouterView`. | forte |
| Configuração (correspondência da cadeia) | Os nomes do manifesto (`app1`, `app2`) coincidem com os `name` dos remotes; `./entry` coincide com o `exposes`; as portas 5011/5012 coincidem com `server.port` de cada remote. | forte |
| Código-fonte (fronteiras) | Busca ativa `git grep -E '\.\./'` em `packages/` no SHA: só `packages/host/src/components/Loader.vue:10` e `packages/host/src/router/index.js:2`, ambos `../routeManifest` dentro de `packages/host/src`. Nenhum import entre `host`, `app-1` e `app-2`; os imports dos remotes são locais (`./App.vue`, `./components/HelloWorld.vue`). | contexto |
| Build/deploy | Cada pacote tem `dev`/`build`/`preview` próprios com Vite (`packages/*/package.json:6–10`); a raiz só tem `dev: lerna run dev` (`package.json:7–9`). `.github/workflows/main_vdumpavue3.yml:26–33`, `:67–73`: `npm install`, `npm run build --if-present` na raiz (que não define `build`), zip do repositório e deploy num único Azure Web App. O workflow não constrói nem publica os remotes separadamente; as URLs do manifesto são `localhost`. | fraca |
| Documentação | `README.md:3`, `:11`, `:72`: host carrega App 1 e App 2 por Module Federation e monta via `Loader.vue`. `README.md:78–98` mostra um `routeManifest` em `packages/host/src/router/` com `module: 'app1/App'`, que difere do arquivo real (`packages/host/src/routeManifest.js`); a citação de configuração usa o arquivo real. `README.md:39–43`: clonar `lmlong-huynh/micro-frontend-sample`. | moderada |
| Código-fonte (conteúdo dos remotes) | `packages/app-1/src/App.vue:1–10` e `packages/app-2/src/App.vue:1–10`: componente do scaffold Vite (logo + `HelloWorld` com contador), cada um uma aplicação Vue inteira montada por rota, não um utilitário. | contexto |

## Autoria e histórico

Clone não raso; 2 commits (2 em todos os refs), nenhum merge. A raiz `e4a97c4` (2025-05-17T22:05:40-05:00, “push first commit”), de `dvreddy007 <dvreddy007@gmail.com>`, adiciona em bloco os 49 arquivos do projeto, incluindo os três pacotes e os `.__mf__temp` gerados. O SHA `d4cef45` (2025-05-25T18:45:05-05:00), de `Venkateswara Reddy Dumpa <dvreddy007@gmail.com>` (mesmo e-mail), só adiciona `.github/workflows/main_vdumpavue3.yml`, com mensagem no formato do assistente de deploy do Azure. Autor e committer coincidem em ambos. A introdução em bloco não demonstra autoria original; o próprio README aponta outro repositório como origem (`README.md:41`). `git rev-list --objects $SHA --missing=print` não lista objetos ausentes. Refs: `main`, `origin/main` e `origin/HEAD` no SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades: `host`, `app-1` e `app-2`, os remotes referenciados pela configuração de composição (`packages/host/src/routeManifest.js:3–6`, `:16–19`). |
| Q2 | Yes | Cada unidade tem entry e build próprios (`packages/*/index.html:11`; `packages/*/vite.config.js`; `packages/*/package.json:6–10`), e não há import de código-fonte entre unidades (busca de `../` registrada). |
| Q3 | Yes | O host roteia e monta os remotes (`packages/host/src/router/index.js:4–12`; `packages/host/src/components/Loader.vue:63–84`; `packages/host/src/App.vue:4–8`). |
| Q4 | Yes | Module Federation configurado nos remotes (`exposes`) e usado pelo host via `init` + `loadRemote` (`packages/host/src/plugins/federationPlugin.js:15–18`, `:29`), com nomes, módulo exposto e portas correspondentes. |
| Q5 | Yes | A cadeia técnica é completa e a classificação avalia a implementação observada no repositório. A origem declarada em `lmlong-huynh/micro-frontend-sample` é registrada como proveniência, mas não invalida a composição presente. |

## Motivo

- Classificado como `MFE-implemented`: host e remotes implementam uma cadeia completa de Module Federation, com descoberta dinâmica, carregamento e ciclo de vida `mount`/`unmount`.
- Pelos critérios técnicos, o caso corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”. É a mesma cadeia completa de 076/084/096/106/109: remotes com `exposes`, host que registra e carrega, e nomes/portas coincidentes.
- Não é code sharing (089/100): cada remote é uma aplicação Vue inteira com instância própria montada por rota, não um componente ou utilitário importado.
- Não é cadeia inconsistente (097/103/104): nomes, módulo exposto (`./entry`) e portas correspondem.
- Não é plugin de plataforma (037, 102): o host está no próprio repositório. A questão é a origem do repositório inteiro, não a de um host externo.
- O deploy Azure (`main_vdumpavue3.yml`) não publica as unidades separadamente e as URLs do manifesto são de desenvolvimento (`localhost`). Q2 se apoia no critério literal (entry e build próprios, sem imports cruzados), como no final 059.
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [vue]`, `build_tools: [vite]`, `repo_type: example`.

## Notas para análise

- **RQ2:** Module Federation 2.0 em Vite (`@module-federation/vite`) com registro dinâmico de remotes pelo runtime (`@module-federation/runtime` `init`/`loadRemote`) a partir de um manifesto de rotas, em vez de `remotes` estáticos no config do host. Remotes expõem um contrato `mount`/`unmount` com instância Vue própria por remote.
- **RQ1 (sinais enganosos):** o snippet de manifesto no README (`README.md:78–98`, `app1/App`, caminho `router/routeManifest.js`) diverge do código real (`./entry`, `src/routeManifest.js`); citar o README como configuração levaria a uma cadeia aparentemente inconsistente.
- **RQ1:** arquivos `.__mf__temp/*/localSharedImportMap.js` gerados pelo plugin e versionados indicam que o projeto foi executado localmente antes do commit; não indicam de quem é o código.
- **Protocolo (duplicatas/famílias):** o upstream declarado está nas duas rodadas com elegibilidade `fail` (push anterior a 2025-04-01), fora da amostra. Há outros candidatos com nome `micro-frontend-sample` nas rodadas (por exemplo, `data/discovery/mfe-round-002/candidates.csv:6848`, `:7570`, `:14234`, `:20568`), não inspecionados; não se presume parentesco. Cópias de exemplos de terceiros com `fork: false` passam pela filtragem quando o original é antigo e a cópia é recente.

## Decisão registrada

Promovido para `MFE-implemented`. O repositório contém host e dois remotes Vue com descoberta por manifesto, carregamento por Module Federation e ciclo de vida próprio por rota. O README declara que o código é derivado de `lmlong-huynh/micro-frontend-sample`; essa proveniência fica registrada, mas a classificação considera a implementação observada no candidato.

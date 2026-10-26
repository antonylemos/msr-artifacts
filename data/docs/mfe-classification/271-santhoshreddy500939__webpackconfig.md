---
schema: 1
id: 1136702019
full_name: santhoshreddy500939/webpackconfig
url: https://github.com/santhoshreddy500939/webpackconfig
commit: e1f97e37c21a6893a8dbf8cd6ea7a7f8c4a9058a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: multi-repo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 271 — santhoshreddy500939/webpackconfig

## Contexto

Projeto de estudo de configuração do webpack com React: loaders de CSS, Sass e imagens, separação em `common`, `dev` e `prod`. No último commit, o SHA, foi acrescentado um host Module Federation (`hostApp`) que referencia um remoto externo, `RemoteApp@http://localhost:9001/remoteappbuild.js`, e o renderiza via `React.lazy(() => import("RemoteApp/microfrontend1"))`. O remoto não está no repositório. O README só documenta os passos de instalação. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:272` registra rank 271, ID 1136702019, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:272` registra a estratégia `terminology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23525` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:23532` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos dois hits em cada rodada, do endpoint `repositories`, com subconsulta `…#created:2026-01` e `path` vazio:

| Consulta (`q`) | Coleta 001 / 002 (UTC) |
|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | 2026-10-07T19:35:58.148Z / 2026-10-08T15:40:33.737Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | 2026-10-07T22:10:21.754Z / 2026-10-08T15:48:43.516Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit:
- descrição “microfrontends”, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 183;
- criação em 2026-01-18T07:17:08Z, push em 2026-01-25T08:11:11Z.

Grafias:
- **Plural:** “microfrontends” aparece literalmente só na descrição do repositório.
- **README:** `README.md:1–12` não contém nenhuma das grafias.
- **Singular:** “microfrontend” aparece em `package.json:2` (`"name": "microfrontend"`), fora dos campos buscados; esse hit depende do processamento textual da busca do GitHub, que não está registrado.

A última alteração do README é `ba894a8` (2026-01-25), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 15 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Uma única aplicação na raiz: `index.html`, `index.js`, `Components/` (Application1, Application2, Header, Paragraph), `assets/Images/webpack.png`, três configs webpack, `package.json`, `package-lock.json`, README e `.gitignore`. | contexto |
| Configuração (host) | `webpack.common.config.js:4`, `31–36`: `ModuleFederationPlugin({ name: "hostApp", remotes: { RemoteApp: "RemoteApp@http://localhost:9001/remoteappbuild.js" } })`. `webpack.dev.config.js:4–5`, `25`: o dev faz `merge(common, …)` e serve na porta 9000; `package.json:9`: `build:dev` usa essa config. | forte |
| Consumo do remoto | `Components/Application1/Application1.js:3`, `10–12`: `React.lazy(() => import("RemoteApp/microfrontend1"))` dentro de `Suspense`. `index.js:5`, `13`: `Application1` é renderizado no `App`. | forte |
| Remoto externo | O remoto `RemoteApp` (porta 9001, arquivo `remoteappbuild.js`, módulo `./microfrontend1`) não está no repositório nem em nenhum gitlink. Nas rodadas há outro candidato da mesma conta, `santhoshreddy500939/microfrontendreactapp1` (`unknown`), fora da amostra e não inspecionado. | contexto |
| Configuração (produção) | `webpack.prod.config.js:1–34` não faz `merge` com a `common`, não declara `entry` nem `ModuleFederationPlugin`. O `build` de produção (`package.json:8`) não inclui a federação, que existe só no fluxo de desenvolvimento. | ambígua |
| Código-fonte (fronteiras) | O único import com `../../` é `Components/Header/header.js:3` (`../../assets/Images/webpack.png`), dentro da mesma aplicação. `Components/Application2/Application2.js:3–7` é um placeholder local (“holder for application2”), não um remoto. | contexto |

## Autoria e histórico

Clone não raso; 11 commits, 1 merge (`70aea9e`, que une um commit local a `87f607a`, este criado na interface do GitHub), todos da conta `santhoshreddy500939`, de 2026-01-18 (`9cc9839`, “conveting normal files into reactapp”) a 2026-01-25 (SHA `e1f97e3`, “modulefederation”). O SHA introduz `Application1`/`Application2`, altera `index.js`, `webpack.common.config.js` e `webpack.dev.config.js` e remove `webpack.config.js`. Só há o branch `master`. Nenhum blob histórico foi lido. Ao listar o `--stat` do SHA, um objeto do pai não estava disponível (`04c01ba`) e não foi buscado; o `diff-tree` por nomes funcionou.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | O host e um remoto externo referenciado pela configuração de composição (`webpack.common.config.js:33–35`). |
| Q2 | Yes | O host tem entry e build próprios; o remoto é externo e servido separadamente (`localhost:9001`), o que conta como Yes pelo critério operacional. |
| Q3 | Yes | O host carrega e monta o remoto em `Application1` (`Application1.js:3`, `10–12`), renderizado no `App` (`index.js:13`). |
| Q4 | Yes | `ModuleFederationPlugin` com `remotes`, efetivamente usado por `import("RemoteApp/microfrontend1")` na config de desenvolvimento (`webpack.dev.config.js:5`). |
| Q5 | Yes | Q1–Q4 são Yes: host Module Federation que consome um remoto externo. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “repositories containing only the host, which references external remote units”. Mesmo enquadramento do final 008 (host Module Federation com remotos em `localhost`) e do rascunho 211.
- Diferentemente de 097/103/104, a configuração é conectável no snapshot: o nome do remoto declarado em `remotes` é o mesmo importado e renderizado.
- **Campos:** `frontend_units: 2` (host e remoto referenciado), `unit_organization: multi-repo`, `repo_type: example` (projeto de estudo, sete dias de commits, remoto em `localhost`), `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`.

## Notas para análise

- **RQ2:** host mínimo com `ModuleFederationPlugin` nativo do webpack 5 e um remoto, sem `shared` declarado (`webpack.common.config.js:31–36`).
- **Configuração (produção):** a config de produção não inclui a federação, ao contrário da de desenvolvimento. Não afeta Q4, que exige mecanismo configurado e conectado, mas indica que a composição só existe no fluxo de desenvolvimento.
- **Protocolo (busca):** o plural está só na descrição; o singular não tem grafia literal nos campos buscados. A elegibilidade muda de `unknown` (001) para `pass` (002).

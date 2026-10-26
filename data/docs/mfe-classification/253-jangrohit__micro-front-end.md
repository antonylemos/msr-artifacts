---
schema: 1
id: 1176812762
full_name: jangrohit/micro-front-end
url: https://github.com/jangrohit/micro-front-end
commit: c6c0dbc9fb78b8baab20e74394647ca40b521355
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 253 — jangrohit/micro-front-end

## Contexto

Exemplo de micro-frontends com Webpack 5 Module Federation em `packages/`: `container` (host React) carrega em runtime o remote `marketing` (React, páginas Landing e Pricing) (`README.md:1–3`, `:7–15`). `packages/auth` e `packages/dashboard` têm só `package.json` e lockfile e não estão ligados ao host (`README.md:3`, `:47–48`). A estrutura `container`/`marketing`/`auth`/`dashboard` é a mesma do final 017 e do rascunho 106. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:254` registra rank 253, ID 1176812762, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:254` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:26122` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:26129` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos cinco hits em cada rodada:

| Consulta (`q`) | Endpoint | Subconsulta | `path` | Coleta 001 / 002 (UTC) |
|---|---|---|---|---|
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | code | `…#size:600..699` | `packages/container/config/webpack.dev.js` | 2026-10-07T22:23:05.816Z / 2026-10-08T16:05:36.364Z |
| idem | code | `…#size:800..899` | `packages/container/config/webpack.prod.js` | 2026-10-07T22:24:25.945Z / 2026-10-08T16:06:42.334Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | repositories | `…#created:2026-03` | vazio | 2026-10-07T22:33:05.012Z / 2026-10-08T15:58:29.833Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | repositories | `…#created:2026-03` | vazio | 2026-10-07T23:01:18.996Z / 2026-10-08T16:08:27.917Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | repositories | `…#created:2026-03` | vazio | 2026-10-07T23:23:54.590Z / 2026-10-08T16:17:20.346Z |

As consultas de repositório acrescentam `pushed:>=2025-04-01 created:2026-03-01..2026-03-31`; as de código, a faixa `size:`.

Metadados do hit (iguais nas duas rodadas): descrição “Micro front end application ”, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 148, criação em 2026-03-09T12:02:03Z, push em 2026-09-27T13:40:59Z.

Correspondências no SHA:
- **Código:** os dois arquivos casados têm 637 e 815 bytes, dentro das faixas, e contêm `ModuleFederationPlugin` e `remotes` (`packages/container/config/webpack.dev.js:3`, `:14–20`; `packages/container/config/webpack.prod.js:3`, `:19–25`).
- **“micro frontend”:** `README.md:1` (“# Micro Frontend Project”) e `README.md:3`. A descrição "Micro front end" não contém a frase literal; o nome `micro-front-end` e a descrição são variantes com separadores, e não se pode provar que o buscador não as considerou, pois o processamento textual não está registrado (o README é evidência textual direta, sem exclusividade demonstrável).
- **“micro frontends”:** `README.md:3` (“connected to the host as micro frontends”).
- **“module federation”:** `README.md:3` (“Webpack 5 Module Federation”), também `:19`, `:25`, `:39`.

O README só existe no SHA (`c6c0dbc`, “Create README.md”, 2026-09-27T19:10:55+05:30, isto é, 13:40:55Z), que coincide com o `pushed_at`. Ele antecede as coletas de outubro de 2026, e o README do SHA não é posterior às buscas. Os dois arquivos do hit de código também não foram alterados depois.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 30 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Sem `package.json` na raiz. `packages/container` e `packages/marketing` têm `package.json`, lockfile, `config/webpack.{common,dev,prod}.js`, `public/index.html` e `src/`. `packages/auth` e `packages/dashboard` têm só `package.json` e lockfile. Dois workflows em `.github/workflows/`. | contexto |
| Configuração (host) | `packages/container/config/webpack.dev.js:14–20`: `ModuleFederationPlugin({ name: "container", remotes: { marketing: "marketing@http://localhost:8081/remoteEntry.js" }, shared })`. `packages/container/config/webpack.prod.js:19–25`: o mesmo remote em `${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`; `publicPath: "/container/latest/"` (`:10`). | forte |
| Configuração (remote) | `packages/marketing/config/webpack.dev.js:15–22` e `packages/marketing/config/webpack.prod.js:19–26`: `name: "marketing"`, `filename: "remoteEntry.js"`, `exposes: { "./MarketingApp": "./src/bootstrap" }`; porta 8081 (`webpack.dev.js:9`), `publicPath: "/marketing/latest/"` (`webpack.prod.js:10`). | forte |
| Código-fonte (composição) | `packages/container/src/components/MarketingApp.js:3`: `import { mount } from "marketing/MarketingApp"`; `:8–11`: chama `mount(ref.current)` num `div` do host. `packages/container/src/App.js:2`, `:17–20`: renderiza `Header` e `MarketingApp`. `packages/marketing/src/bootstrap.js:5–7`, `:17`: exporta `mount(el)`; `:9–14`: montagem isolada em desenvolvimento. Ambos usam `src/index.js:1` → `import("./bootstrap")`. | forte |
| Configuração (correspondência da cadeia) | O nome `marketing` no `remotes` do host coincide com o `name` do remote; o módulo `MarketingApp` coincide com `./MarketingApp` em `exposes`; a porta 8081 e o caminho `/marketing/latest/` coincidem com `devServer.port` e `publicPath` do remote. | forte |
| Código-fonte (fronteiras) | Busca ativa nos imports de `packages/container/src` e `packages/marketing/src`: só imports locais (`./App`, `./components/*`) e de pacotes npm. O host referencia o remote apenas pelo módulo federado `marketing/MarketingApp`. Não há `../` em `src/`; os `require("../package.json")` dos configs (`webpack.dev.js:4`, `webpack.prod.js:4`) leem o manifesto do próprio pacote. | contexto |
| Build/deploy | Build próprio por pacote (`packages/container/package.json:4–7`; `packages/marketing/package.json:4–7`). `.github/workflows/container.yml:8–9`, `:30–42` e `.github/workflows/marketing.yml:8–9`, `:30–40`: workflows separados por caminho, cada um constrói o pacote e sincroniza `dist` para `s3://…/container/latest` ou `…/marketing/latest`, com invalidação de CloudFront (`index.html` do container, `remoteEntry.js` do marketing). | forte |
| Estrutura (pacotes inativos) | `packages/auth/package.json:1–29` só tem script de teste; `packages/dashboard/package.json:4–7` referencia `config/webpack.*.js` ausentes na árvore. Nenhum dos dois é referenciado pelo host. `README.md:47–48` registra o mesmo estado. | contexto |
| Documentação | `README.md:17–39`: descreve host, remote, carregamento em runtime e montagem por `mount`. `README.md:104` afirma que o repositório não inclui pipeline de deploy, o que diverge dos workflows presentes; a citação de deploy usa os workflows. `README.md:106–108` registra `BrowserRouter` aninhado entre host e remote. | moderada |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 15 commits (15 em todos os refs), nenhum merge, todos de `Rohit Jangid <rohitjangid1931995@gmail.com>` como autor e committer:
- a raiz `f107f7b` (2026-03-09T17:36:13+05:30, “initial commit”) adiciona em bloco os quatro pacotes;
- `9abb742` e `343ea03` (2026-03-09, “created container deploy script”, “added deploy scripts”) ajustam os configs de produção do container e do marketing;
- de 2026-09-27 são os commits `5d05e98` (workflow do container), `cbf22ee` (“update public path”), `8c1fbfa` (invalidação de CloudFront), `988cc53` (`Header`), `c4c1e01` (“fix css conflict name space”) e o SHA (README).

Por caminho (`git log --no-renames`): `packages/container` 9 commits, `packages/marketing` 4, `packages/auth` 1, `packages/dashboard` 1, `.github` 4. A estrutura coincide com a de cursos de micro-frontends (final 017); a introdução em bloco não permite afirmar se o código foi escrito do zero ou seguido de material didático, e não há declaração de origem de terceiro no repositório.

`git rev-list --objects $SHA --missing=print` lista 19 objetos ausentes, nenhum na árvore do SHA (versões anteriores de arquivos alterados). Nenhum blob histórico foi lido.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades: `container` e `marketing`, este referenciado no `remotes` do host (`packages/container/config/webpack.dev.js:16–18`). `auth` e `dashboard` não são contados, porque não têm entry nem código. |
| Q2 | Yes | Cada unidade tem entry (`src/index.js` → `bootstrap.js`), HTML, configs Webpack e build próprios (`packages/*/package.json:4–7`), além de workflows de deploy separados. Não há import de código-fonte entre elas (busca registrada). |
| Q3 | Yes | O host monta o remote na sua página (`packages/container/src/components/MarketingApp.js:8–11`; `packages/container/src/App.js:17–20`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nome, módulo exposto, porta e caminho de produção correspondentes, e consumido por `import { mount } from "marketing/MarketingApp"` (`MarketingApp.js:3`). |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- Mesma cadeia completa de 076/084/096/106/109 e do final 017 (mesma estrutura de curso, com `container` e remotes por `mount`). Aqui só `marketing` está ligado; `auth` e `dashboard` são esqueletos não referenciados.
- Não é code sharing (089/100): o remote é uma aplicação React com rotas próprias (`packages/marketing/src/App.js:14–18`), montada pelo host.
- Não é cadeia não conectável (097/103/104): nome, módulo e endereços correspondem.
- Não é conteúdo ou exercício sem implementação (023/075/081/094/105): as duas unidades existem e se compõem.
- `frontend_units: 2`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [react]` (Vue só aparece nas dependências do `dashboard` sem código), `build_tools: [webpack]`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ1 (sinais enganosos):** `README.md:104` diz que não há pipeline de deploy, mas há dois workflows com deploy separado por unidade; a documentação está defasada em relação ao código.
- **RQ1:** `packages/dashboard/package.json` declara Vue/PrimeVue sem código nem configuração; contar tecnologias pelos manifestos superestimaria a heterogeneidade.
- **RQ3:** deploy independente por unidade com convenção `/<app>/latest/` em S3/CloudFront, invalidando o `remoteEntry.js` do remote e o `index.html` do host.
- **Protocolo (famílias):** a estrutura `container`/`marketing`/`auth`/`dashboard` também aparece em 017 (final) e 106 (rascunho). Sem declaração de upstream no repositório, não se presume cópia de um candidato específico.
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, duas unidades, `monorepo`, React/webpack e `module-federation`; sem decisão aberta (`draft`). Os 19 objetos históricos ausentes estão registrados corretamente. Precisão sobre os roteadores: há `BrowserRouter` no host e no remoto, mas `marketing/src/bootstrap.js:6` chama `ReactDOM.render` criando uma raiz React separada dentro do elemento do host, de modo que o contexto do roteador do host não é herdado, e o erro de Router aninhado do README (`README.md:106–108`) não deve ser tratado como falha reproduzida; a limitação concreta é a ausência de contrato de sincronização de navegação entre as duas raízes (o wrapper só passa `el`, sem `initialPath`/`onNavigate`/`onParentNavigate`, e não retorna cleanup), o que é robustez e não invalida a montagem federada. `README.md:104` afirma ausência de pipeline, contradita pelos dois workflows versionados. `auth` e `dashboard` não são unidades (auth sem aplicação, dashboard com configs ausentes e sem ligação ao host). Nada foi executado.

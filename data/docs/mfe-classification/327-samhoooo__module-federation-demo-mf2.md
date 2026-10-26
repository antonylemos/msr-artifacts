---
schema: 1
id: 1330154796
full_name: samhoooo/module-federation-demo-mf2
url: https://github.com/samhoooo/module-federation-demo-mf2
commit: 0a621b661bc717fb3433ec3c5dbbcfb027d0a94a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rspack]
frontend_units: 2
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 327 — samhoooo/module-federation-demo-mf2

## Contexto

Exemplo de Module Federation 2.0 com React e Rspack (`README.md:1–14`; descrição e homepage num artigo do Medium). `header-app` é o remote, que expõe `./Header`, publica `mf-manifest.json` e gera tipos. `home-app` é o host, que consome `HeaderApp/Header` pelo manifesto. As duas apps são independentes, sem workspace na raiz. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:328` registra rank 327, ID 1330154796, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:328` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:35115` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:35121` (`pass`), ambos com `terminology;technology`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos oito hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-topic-microfrontend`: `topic:microfrontend` | sem partição | 2026-10-07T18:18:32.629Z / 2026-10-08T15:34:17.861Z |
| `terminology-topic-microfrontends`: `topic:microfrontends` | sem partição | 2026-10-07T18:18:43.496Z / 2026-10-08T15:34:28.993Z |
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-08` | 2026-10-07T22:03:25.543Z / 2026-10-08T15:43:54.026Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-08` | 2026-10-07T22:14:21.283Z / 2026-10-08T15:50:38.475Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-08` | 2026-10-07T22:41:19.736Z / 2026-10-08T16:01:41.703Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-08` | 2026-10-07T23:11:30.673Z / 2026-10-08T16:10:23.632Z |
| `technology-topic-module-federation`: `topic:module-federation` | sem partição | 2026-10-07T23:13:42.957Z / 2026-10-08T16:11:12.560Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-08` | 2026-10-07T23:29:42.617Z / 2026-10-08T16:19:11.037Z |

As consultas acrescentam `pushed:>=2025-04-01` e, quando particionadas, `created:2026-08-01..2026-08-31`.

Metadados do hit (iguais nas duas rodadas): descrição “A simple demo on Microfrontend with Module Federation 2.0 in React”; tópicos que incluem `microfrontend`, `microfrontends`, `microfront-end`, `microfrontends-demo` e `module-federation`; linguagem JavaScript; `fork: false`; tamanho 29; homepage num artigo do Medium; criação em 2026-08-10T18:56:01Z; push em 2026-08-11T19:33:23Z.

**Grafias:**
- **Tópicos:** os três hits de `topic:` casam diretamente os tópicos.
- **Descrição:** “Microfrontend” e “Module Federation”.
- **README:** “micro frontend” em `README.md:3` (“designed with micro frontend architectural pattern using Module Federation 2.0”) e “Module Federation” no mesmo trecho.
- **Plurais:** “microfrontends” e “micro frontends” não aparecem em descrição ou README; esses hits dependem do processamento textual da busca, que não está registrado.

O README foi alterado pela última vez no SHA (2026-08-11T20:33:23+01:00, isto é, 19:33:23Z), igual ao `pushed_at` e anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 29 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Dois projetos independentes, `header-app/` e `home-app/`, cada um com `package.json`, `rspack.config.js`, `public/index.html`, `src/` e `tsconfig.json`; `home-app/@mf-types/` versiona os tipos gerados do remote. Sem `package.json` na raiz. | contexto |
| Configuração (remote) | `header-app/rspack.config.js:57–75`: `ModuleFederationPlugin({ name: "HeaderApp", filename: "remoteEntry.js", exposes: { "./Header": "./src/App" }, dts: true, shared: react/react-dom singleton })`; `:7`, `:9–12`, `:22–24`: entry `./src/entry.ts`, porta 4001, `publicPath` `http://localhost:4001/`. | forte |
| Configuração (host) | `home-app/rspack.config.js:46–66`: `ModuleFederationPlugin({ name: "HomeApp", remotes: { HeaderApp: "HeaderApp@http://localhost:4001/mf-manifest.json" }, dts: true, shared … })`; `:6`, `:8–10`: entry própria e porta 4000. | forte |
| Código-fonte (composição) | `home-app/src/App.tsx:11`, `:13`, `:18–20`: importa `HeaderVariant` e `lazy(() => import('HeaderApp/Header'))` e renderiza `<Header title=… variant=… />` em `Suspense`. `header-app/src/App.tsx:4–22`: componente `App` com props `title` e `variant`, exportado como default. | forte |
| Configuração (correspondência da cadeia) | O nome `HeaderApp` e a porta 4001 do `remotes` do host correspondem ao `name` e ao `devServer.port` do remote; o módulo `HeaderApp/Header` corresponde a `exposes: "./Header"`. | forte |
| Código-fonte (fronteiras) | Busca ativa de `../` em `header-app/src` e `home-app/src`: nenhuma ocorrência. O host não importa fontes do remote: `home-app/tsconfig.json:15–17` mapeia `HeaderApp/*` para `./@mf-types/HeaderApp/*`, cópia de tipos gerados (`home-app/@mf-types/HeaderApp/Header.d.ts:1–2`). | contexto |
| Build/deploy | Builds próprios com Rspack (`header-app/package.json:9–13`; `home-app/package.json:9–13`); servidores de desenvolvimento separados (4000/4001). O deploy independente não é provisionado. | moderada |

## Autoria e histórico

Clone não raso e parcial (`blob:none`). São 3 commits (3 em todos os refs), nenhum merge, do mesmo e-mail `samho1996@gmail.com`:
- `eeac072` (2026-08-10, `samhoooo`, “Add Module Federation 2 demo: header-app remote + home-app host”) adiciona o código;
- `0a010ce` e o SHA `0a621b6` (2026-08-10 e 2026-08-11, `Sam Ho`, committer `GitHub`) editam o README.

`git rev-list --objects $SHA --missing=print` lista 2 objetos ausentes, nenhum na árvore do SHA.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades, `header-app` e `home-app`, a primeira referenciada no `remotes` do host (`home-app/rspack.config.js:51–53`). |
| Q2 | Yes | Entry, configuração Rspack, porta e build próprios para cada app (`header-app/rspack.config.js:7`, `:9–12`; `home-app/rspack.config.js:6`, `:8–10`; os dois `package.json:9–13`). Não há import de código-fonte entre elas (busca registrada). |
| Q3 | Yes | O host monta o componente do remote na sua página (`home-app/src/App.tsx:13`, `:18–20`). |
| Q4 | Yes | Module Federation 2.0 configurado nos dois lados, com manifesto, nome, porta e módulo exposto correspondentes, consumido por `import('HeaderApp/Header')`. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- `MFE-implemented`: Q1–Q5 Yes. Corresponde a “examples… that actually compose frontend units” e a “monorepos containing a host and its remotes”.
- Mesma forma do final 052, em que o host monta `headerMf/Header` (e `productsMf/Products`) por `React.lazy`. Aqui o remote expõe uma seção de layout (cabeçalho com variantes), não um utilitário.
- **Granularidade:** o remote expõe um único componente de página. A questão de exposição mínima ou code sharing segue aberta em 089/100 e foi levantada em 193 (rascunho, também com um único componente). Este caso não é tratado como code sharing, porque o componente é uma seção de UI montada pelo host, como o `Header` aceito em 052.
- Não é cadeia não conectável (097/103/104): nome, manifesto e módulo correspondem.
- `frontend_units: 2`, `unit_organization: monorepo` (dois projetos num repositório, sem workspace), `ui_technologies: [react]`, `build_tools: [rspack]`, `approaches: [module-federation]`, `repo_type: example`.
- Não há decisão aberta própria deste caso.

## Notas para análise

- **RQ2:** MF 2.0 com `@module-federation/enhanced/rspack`, remote resolvido por `mf-manifest.json` e tipos remotos gerados (`dts: true`) e versionados em `home-app/@mf-types/`.
- **Checklist:** se a decisão de 089/100 tratar a exposição de um único componente como code sharing, este caso e 193 devem ser revistos juntos. O final 052, com `Header` e `Products`, indica que seções de layout expostas contam como composição.
- **Protocolo (famílias):** o mesmo dono tem `samhoooo/module-federation-demo-react` nas rodadas (`data/discovery/mfe-round-002/candidates.csv:5609`), fora da amostra e não inspecionado.
- **Protocolo (busca):** oito hits (tópicos, descrição e README). Os plurais não têm grafia literal na descrição nem no README. A elegibilidade muda de `unknown` (001) para `pass` (002).

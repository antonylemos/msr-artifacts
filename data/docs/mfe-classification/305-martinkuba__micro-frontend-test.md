---
schema: 1
id: 1130037642
full_name: martinkuba/micro-frontend-test
url: https://github.com/martinkuba/micro-frontend-test
commit: f629b5bec52818c0c0c1cdc115bcd3d712ebbb93
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

# 305 — martinkuba/micro-frontend-test

## Contexto

Aplicação de teste do Grafana Faro SDK numa arquitetura de micro-frontends (`README.md:1–10`). É um monorepo npm workspaces com três pacotes webpack 5:
- `packages/shell`: host, porta 3000;
- `packages/main-content`: remoto, porta 3001;
- `packages/sidebar`: remoto, porta 3002, desligado no SHA.

O shell consome `mainContent/MainContent` via `ModuleFederationPlugin` e o renderiza; o `sidebar` tem configuração de remoto, mas sua referência e sua montagem estão comentadas no shell. Cada unidade inicializa sua própria instância do Faro. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:306` registra rank 305, ID 1130037642, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:306` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:23015` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:23022` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos quatro hits em cada rodada:

| Consulta (`q`) | Endpoint / subconsulta / `path` | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `repositories` / `…#created:2026-01` / vazio | 2026-10-07T22:29:39.577Z / 2026-10-08T15:57:17.577Z |
| `technology-module-federation-plugin-js-code`: `ModuleFederationPlugin remotes extension:js` | `code` / `…#size:1450..1599` / `packages/shell/webpack.config.js` | 2026-10-07T22:30:06.269Z / 2026-10-08T16:10:59.938Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `repositories` / `…#created:2026-01` / vazio | 2026-10-07T22:59:16.743Z / 2026-10-08T16:07:38.509Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `repositories` / `…#created:2026-01` / vazio | 2026-10-07T23:22:25.187Z / 2026-10-08T16:16:50.018Z |

As consultas efetivas de repositório acrescentam `pushed:>=2025-04-01 created:2026-01-01..2026-01-31`.

Metadados do hit de repositório:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 69;
- criação em 2026-01-08T00:07:14Z, push em 2026-01-08T00:07:30Z.

O arquivo do hit de código tem 1.484 bytes e contém `ModuleFederationPlugin` e `remotes` (`packages/shell/webpack.config.js:32–35`).

Grafias no README:
- “micro frontend”: `README.md:1` (“# Micro Frontend Test App”), `3` e `8`;
- “micro frontends”: `README.md:7` (“Host application that loads remote micro frontends”) e `10`;
- “Module Federation”: `README.md:10` (“Uses Webpack Module Federation to dynamically load micro frontends at runtime.”).

O README é do próprio SHA (2026-01-07), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 23 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três pacotes em `packages/` (`shell`, `main-content`, `sidebar`), cada um com `package.json`, `webpack.config.js` e `src/`; na raiz, `package.json` com workspaces (`package.json:14–18`), `tsconfig.json` e lockfile. | contexto |
| Configuração (host) | `packages/shell/webpack.config.js:32–43`: `ModuleFederationPlugin({ name: 'shell', remotes: { mainContent: 'mainContent@http://localhost:3001/remoteEntry.js' } })`; o remoto `sidebar` está comentado (`:36`). Também declara `react`, `react-dom` e `@grafana/faro-web-sdk` como singletons. | forte |
| Configuração (remotos) | `packages/main-content/webpack.config.js:30–42`: `name: 'mainContent'`, `filename: 'remoteEntry.js'`, `exposes: { './MainContent': './src/MainContent' }`, porta 3001. `packages/sidebar/webpack.config.js:30–42`: `name: 'sidebar'`, `exposes: { './Sidebar' }`, porta 3002, sem compartilhar o Faro (`:40`). | forte |
| Consumo | `packages/shell/src/App.tsx:6`: `React.lazy(() => import('mainContent/MainContent'))`. `:199–203`: montado dentro de `ErrorBoundary`/`Suspense`. O import e a montagem do `Sidebar` estão comentados (`:7`, `:206–214`). `packages/shell/src/index.tsx:2`: `import('./bootstrap')`, a fronteira assíncrona. | forte |
| Execução | `package.json:7–10`: `start` sobe em paralelo só `main-content` e `shell`; `start:sidebar` existe à parte. Histórico: “removed side app for now” (`3174dd1`). | contexto |
| Código-fonte (fronteiras) | Busca por imports com `../` em `packages/`: nenhum. Cada pacote só importa arquivos locais (`./faro`, `./MainContent`) e dependências npm. | contexto |

## Autoria e histórico

Clone não raso; 11 commits lineares, nenhum merge, todos de Martin Kuba, de 2026-01-06 (`efec921`, “init”) a 2026-01-07 (SHA `f629b5b`, “added readme”). Entre eles estão “run all apps on different ports to guarantee separation” (`aaf32b6`) e “removed side app for now” (`3174dd1`). Só há o branch `main`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Host `shell` e remoto `mainContent` no repositório, referenciado em `remotes` (`packages/shell/webpack.config.js:34–35`); o `sidebar` também é unidade, mas está desconectado. |
| Q2 | Yes | Cada pacote tem `webpack.config.js`, entry, porta e build próprios, sem import de código entre pacotes. |
| Q3 | Yes | O shell monta o remoto `MainContent` (`App.tsx:6`, `199–203`). |
| Q4 | Yes | Module Federation do webpack 5 com `remotes`/`exposes` coerentes e o módulo remoto efetivamente importado e renderizado. |
| Q5 | Yes | Q1–Q4 são Yes: host e remoto compostos em runtime, com cadeia completa no snapshot. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes, no caso “monorepos containing a host and its remotes”. A cadeia está completa no snapshot, como em 076/084/096/106/109.
- **Unidades:** `frontend_units: 2` (shell e main-content). O `sidebar` tem configuração de remoto, mas não está conectado no SHA; seguindo o critério de 128 (“os remotes comentados não contam”), não entra na contagem.
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `unit_organization: monorepo`, `repo_type: example` (aplicação de teste de observabilidade com Faro).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** cada unidade inicializa sua própria instância do Grafana Faro (`packages/*/src/faro.ts`). O SDK é `shared` singleton entre shell e main-content, mas não no sidebar (`packages/sidebar/webpack.config.js:40`). É um caso de observabilidade distribuída em MFE.
- **Protocolo (busca):** entrada por três consultas terminológicas e tecnológicas de repositório, com grafias literais no README, e pela consulta de código no `webpack.config.js` do shell. A elegibilidade muda de `unknown` (001) para `pass` (002).

---
schema: 1
id: 1042592063
full_name: Jyotisaini1234/moduleFederation
url: https://github.com/Jyotisaini1234/moduleFederation
commit: 8df0f2a8d23cd31eebd2f54463cd0b665fe1fe29
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

# 172 — Jyotisaini1234/moduleFederation

## Contexto

Exemplo de Module Federation com webpack 5 e duas aplicações React em TypeScript. `mfe1` é o host (“Product Listing”), consome `app2/App` e tem um servidor SSR experimental. `mfe2` é o remoto (“Cart Application”), que expõe `./App` (`mfe1/webpack.config.ts:73–89`; `mfe1/src/App.tsx:1–32`; `mfe2/webpack.config.ts:36–44`). O README tem só um título (`README.md:1`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:173` registra rank 172, ID 1042592063, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:173` registra a estratégia `technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:17958` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:17963` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um hit por rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `technology-module-federation-repositories#created:2025-08` | `"module federation" in:name,description,readme pushed:>=2025-04-01 created:2025-08-01..2025-08-31` | 2026-10-07T23:19:14.420Z / 2026-10-08T16:15:27.977Z |

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`;
- tamanho 17.269, inflado por `node_modules`/`dist` versionados no passado (ver Autoria);
- criação em 2025-08-22T09:00:54Z, push em 2025-09-01T06:08:15Z.

**Origem do acerto.** O README do SHA contém só “# moduleFederation” (`README.md:1`), em camelCase, sem a frase literal “module federation”, e a descrição é nula. O acerto depende de como o GitHub processa o token camelCase no README ou no campo `name`, o que não está registrado. Isso registra só a proveniência; o nome não é usado como evidência de classificação. O README foi alterado por último no próprio SHA (2025-09-01), antes das coletas de outubro de 2026.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 21 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há dois projetos, `mfe1/` e `mfe2/`, cada um com `package.json`, `package-lock.json`, `tsconfig.json`, `webpack.config.ts`, `public/index.html` e `src/`. Não há workspace na raiz. | contexto |
| Configuração (host) | `mfe1/webpack.config.ts:73–89`: `ModuleFederationPlugin({ name: 'app1', remotes: { app2: 'app2@http://localhost:3002/remoteEntry.js' }, shared: react/react-dom singleton })`. `:22–35`: dev server na porta 3001 com CORS. | forte |
| Configuração (remoto) | `mfe2/webpack.config.ts:36–42`: `ModuleFederationPlugin({ name: 'app2', filename: 'remoteEntry.js', exposes: { './App': './src/App.tsx' }, shared: react/react-dom singleton })`. `:15–18`: porta 3002. | forte |
| Código-fonte (consumo) | `mfe1/src/App.tsx:3–12`, `25–27`: `React.lazy(() => import("app2/App"))`, com fallback de erro e `Suspense`, renderizado abaixo do cabeçalho do host. `mfe1/src/types/remotes.d.ts:1–5`: tipagem do módulo remoto. Bootstrap assíncrono em `mfe1/src/index.tsx:3` e `mfe2/src/index.tsx:1`. | forte |
| Código-fonte (SSR) | `mfe1/src/server/server.ts:1–104`: servidor HTTP com `renderToString(App)` e `window.__SSR__`. `mfe1/src/bootstrap.tsx:14–19`: `hydrateRoot` nesse caso. O servidor não é chamado por nenhum script do `package.json` (`mfe1/package.json:7–10`). `@module-federation/node` e `ignore-loader` estão declarados (`mfe1/package.json:15`, `29`), mas não são usados na configuração. É um experimento lateral. | contexto |
| Código-fonte (fronteiras) | A busca por imports `../../` e `../mfe…` no SHA não retorna nada. Cada projeto importa só os próprios módulos; a ligação é por `app2/App` federado. | contexto |
| Build | `mfe1/package.json:7–10` e `mfe2/package.json:7–10`: webpack próprio de cada projeto, executado via `ts-node/esm`. | moderada |

## Autoria e histórico

Clone não raso; 6 commits, nenhum merge.
- **Commits locais:** 5 são de `jyotisainii <jyotisaini5614@gmail.com>`, de 2025-08-22 (`da91d51`, “model federation”, só o README) a 2025-08-27. Os dois projetos entram em `a38408a`/`6767cd7`, e o SSR em `5cf7cbb`. `0baa0e7` remove pastas de build e dependências versionadas, o que explica o tamanho nos metadados.
- **SHA:** `8df0f2a` (2025-09-01, “Update README.md”) é de `JyotiSaini@19`, noreply e via GitHub, e só altera o README.

Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Duas unidades no repositório, referenciadas pela configuração de composição (`mfe1/webpack.config.ts:76–78`; `mfe2/webpack.config.ts:40`). |
| Q2 | Yes | Cada unidade tem entrada, build e servidor próprios (`*/webpack.config.ts`; portas 3001/3002), sem imports de código-fonte entre elas. |
| Q3 | Yes | O host carrega e renderiza o remoto na própria página (`mfe1/src/App.tsx:25–27`). |
| Q4 | Yes | Module Federation configurado nos dois lados e consumido por import dinâmico (`mfe1/src/App.tsx:3–4`). |
| Q5 | Yes | Q1–Q4 são Yes: host e remoto com Module Federation. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units”.
- A cadeia está completa no snapshot, como em 076/084/096/106/109. O módulo exposto é a aplicação do remoto (`./App`), não um componente genérico, por isso não cabe a dúvida de code sharing de 089/100.
- O SSR experimental e as dependências não usadas não afetam a composição client-side configurada.
- `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`, `frontend_units: 2`, `unit_organization: monorepo`, `repo_type: example`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** host e remoto clássicos com webpack 5 e configuração em TypeScript (`ts-node/esm`), com fallback de erro no `React.lazy` para remoto indisponível.
- **RQ3:** tentativa de SSR no host (`server.ts`), não integrada aos scripts, com `@module-federation/node` declarado e não configurado.
- **Protocolo (busca):** o README não traz a frase buscada em forma literal, só “moduleFederation” em camelCase. A elegibilidade muda de `unknown` (001) para `pass` (002).
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, `webpack`, duas unidades e `monorepo`; sem decisão aberta (`draft`). A conexão host–remote (porta e `remoteEntry.js` correspondentes, componente exposto montado pelo host) não depende de executar o projeto. Ressalva estática: `mfe1/webpack.config.ts:62–65` declara regras com `style-loader` e `css-loader`, ausentes das dependências do `mfe1/package.json`; não há CSS importado no código do snapshot, de modo que isso só afetaria o processamento de CSS se introduzido, e limita qualquer afirmação de build geral sem impedir a conexão atual. Ajuste editorial: os comparáveis 076, 084, 096, 106 e 109 estão em `draft` e servem como paralelo provisório, não como precedente final; a comparação normativa se ancora em 052 e 007 (finais), com 089 e 100 apenas como contraste de revisão.

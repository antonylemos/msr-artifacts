---
schema: 1
id: 1366618635
full_name: tonoizer/react-mf-patch-skew-repro
url: https://github.com/tonoizer/react-mf-patch-skew-repro
commit: 92739d5e61a09a9b31e6b53f0662f6f9e71b5e3a
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: other
approaches: [module-federation]
ui_technologies: [react]
build_tools: [vite]
frontend_units: 4
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 309 — tonoizer/react-mf-patch-skew-repro

## Contexto

Reprodução mínima de um defeito do `@module-federation/vite` 1.21.6 (`README.md:1–5`). Builds de produção de apps Vite federadas quebram quando React é compartilhado como singleton (`requiredVersion: '^19.2.4'`) e cada app instala um patch diferente de React 19.2.x. Para isso, o repositório monta um monorepo pnpm com quatro aplicações React + Vite:
- `host`, que consome `remote_a` e `remote_b`;
- `remote_a`, que expõe `./App` e é host aninhado de `remote_c`;
- `remote_b` e `remote_c`, que expõem `./App`.

Os resultados de execução estão versionados em `evidence/`, gerados por um script Playwright (`scripts/capture.mjs`). Segundo esse registro, o host quebra antes de montar os remotos. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:310` registra rank 309, ID 1366618635, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:310` registra a estratégia `technology` e elegibilidade `unknown`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:37120` e `data/discovery/mfe-round-002/candidates.csv:37130`, ambos com `unknown`. Na rodada 002, o motivo da regra `recent-human-commit` é `author_indeterminate`.

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna um único hit em cada rodada. Ele vem do endpoint `repositories`, consulta `technology-module-federation-repositories` (`"module federation" in:name,description,readme`), subconsulta `…#created:2026-09`, com `path` vazio. As coletas são 2026-10-07T23:31:16.131Z (001) e 2026-10-08T16:19:39.829Z (002). A consulta efetiva acrescenta `pushed:>=2025-04-01 created:2026-09-01..2026-09-30`.

Metadados do hit:
- descrição “Repro: React patch skew #527 with @module-federation/vite singleton shares”, sem tópicos, linguagem JavaScript, `fork: false`, tamanho 32;
- criação em 2026-09-11T19:31:40Z, push em 2026-09-11T19:31:43Z.

A frase “module federation” aparece só como nome de pacote e escopo (`@module-federation/vite`, em `README.md:1` e `24`), não como a frase “Module Federation”. O hit depende do processamento textual da busca do GitHub, que não está registrado. O README é do único commit (2026-09-11), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 37 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há quatro pacotes (`host`, `remote_a`, `remote_b`, `remote_c`), cada um com `package.json`, `vite.config.js`, `index.html` e `src/`. Também há `pnpm-workspace.yaml:1–5`, `scripts/capture.mjs` e 10 arquivos de saída em `evidence/`. | contexto |
| Configuração (host) | `host/vite.config.js:19–36`: `federation({ name: 'host', remotes: { remote_a: { entry: 'http://localhost:5001/remoteEntry.js' }, remote_b: { entry: 'http://localhost:5002/remoteEntry.js' } }, shared, shareStrategy: 'version-first' })`. | forte |
| Configuração (remotos) | `remote_a/vite.config.js:19–35`: `exposes: { './App' }` e `remotes: { remote_c: … 5003 }`, ou seja, host aninhado. `remote_b/vite.config.js:19–28` e `remote_c/vite.config.js:19–28`: `exposes: { './App' }`. Cada pacote fixa um patch de React diferente (`*/package.json:11–12`: 19.2.8, 19.2.4, 19.2.6, 19.2.8). | forte |
| Consumo | `host/src/App.jsx:3–4`: `lazy(() => import('remote_a/App'))` e `import('remote_b/App')`, montados em `Suspense`/`ErrorBoundary` (`:74–89`). `remote_a/src/App.jsx:3`, `11–13`: monta `remote_c/App`. | forte |
| Resultado registrado | `evidence/RESULT.json`: veredito “PASS”, ou seja, defeito reproduzido. Para o host: “blank page; TypeError Cannot read properties of null (reading useState)”. Para `remote_a`: “Host never mounts remotes (host crashes first)”. `README.md:48–52` descreve o comportamento esperado como falha. | ambígua |
| Código-fonte (fronteiras) | Busca por imports com `../` no SHA: nenhum. Cada pacote só importa arquivos locais e dependências npm. | contexto |

## Autoria e histórico

Clone não raso; um único commit, `92739d5` (2026-09-11, “Add React patch-skew repro for @module-federation/vite 1.21.6”), de `tonoizer`. Só há o branch `main`. Não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Quatro aplicações React/Vite no repositório, referenciadas por `remotes` (`host/vite.config.js:21–32`; `remote_a/vite.config.js:25–31`). |
| Q2 | Yes | Cada pacote tem `package.json`, Vite, entry, porta e versão de React próprios, sem import de código entre pacotes. |
| Q3 | Yes | O host monta `remote_a` e `remote_b` (`host/src/App.jsx:74–89`), e `remote_a` monta `remote_c`. |
| Q4 | Yes | `@module-federation/vite` com `remotes`/`exposes` coerentes e imports efetivos dos módulos remotos. |
| Q5 | Yes | A composição completa é implementada em código e configuração; a falha registrada é o resultado deliberadamente reproduzido pelo experimento, não ausência da arquitetura MFE. |

## Motivo

- Classificado como `MFE-implemented`: o experimento implementa uma cadeia completa host → remotos → remoto aninhado para reproduzir uma falha específica de runtime.
- **Contraste:** no rascunho 227 (reprodução de defeito do webpack), o remoto expunha uma string e não havia unidade frontend, o que deu `Non-MFE`. Aqui há unidades React e uma cadeia host → remoto → remoto aninhado completa na configuração e no código. Pela lista do checklist, cabem tanto “examples, templates, and proofs of concept that actually compose frontend units” quanto “MFE-related dependencies that are unused or experimental”.
- **Campos:**
  - `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [vite]`;
  - `frontend_units: 4`, `unit_organization: monorepo`;
  - `repo_type: other` (reprodução de defeito de ferramenta, como em 227).

## Notas para análise

- **RQ2/RQ3:** caso documentado de falha de compartilhamento de singletons React entre patches diferentes com `@module-federation/vite` (`README.md:3–5`, `16–24`), com share registry versionado (`evidence/share-owners.json`). Pode servir como evidência de problemas de versionamento de dependências compartilhadas.
- **Protocolo (busca):** a grafia da consulta só aparece como nome de pacote. Elegibilidade `unknown` nas duas rodadas.

## Decisão registrada

Promovido para `MFE-implemented`. O repositório implementa quatro aplicações federadas, com host, remotos e remote aninhado configurados e consumidos. A falha de runtime é intencional e constitui o objeto da reprodução, não uma ausência de composição arquitetural.

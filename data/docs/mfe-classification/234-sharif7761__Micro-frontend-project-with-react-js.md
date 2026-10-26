---
schema: 1
id: 1158060733
full_name: sharif7761/Micro-frontend-project-with-react-js
url: https://github.com/sharif7761/Micro-frontend-project-with-react-js
commit: cb2083fd77ddcb4d6493af653e0ce523ba0be010
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [rsbuild]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 234 — sharif7761/Micro-frontend-project-with-react-js

## Contexto

“Simple Micro Frontend Project”, “A minimal micro frontend architecture to understand Module Federation structure” (`README.md:1–13`): três aplicações React/Rsbuild com `@module-federation/rsbuild-plugin`:
- `core_simple`, o shell (porta 3000), com roteamento;
- `users_simple` (porta 3002), lista de usuários vinda da JSONPlaceholder, que expõe `./UserList`;
- `common_simple` (porta 3001), que expõe os componentes `Button` e `Card` consumidos pelos outros dois.

O shell monta `UserList` em `/users` e usa `Button`/`Card` remotos na página inicial. O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:235` registra rank 234, ID 1158060733, status `cloned`, branch `master` e o commit do front matter, que é o HEAD do clone e de `origin/master`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:235` registra as estratégias `terminology;technology;broader` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:24911` (`unknown`) e `data/discovery/mfe-round-002/candidates.csv:24918` (`pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos seis hits em cada rodada, do endpoint `repositories` e com `path` vazio:

| Consulta (`q`) | Subconsulta | Coleta 001 / 002 (UTC) |
|---|---|---|
| `terminology-microfrontend-repositories`: `microfrontend in:name,description,readme` | `…#created:2026-02` | 2026-10-07T19:59:51.558Z / 2026-10-08T15:41:15.380Z |
| `terminology-microfrontends-repositories`: `microfrontends in:name,description,readme` | `…#created:2026-02` | 2026-10-07T22:11:11.394Z / 2026-10-08T15:49:08.317Z |
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T22:31:08.731Z / 2026-10-08T15:57:49.131Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T23:00:06.384Z / 2026-10-08T16:07:57.795Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-02` | 2026-10-07T23:23:04.794Z / 2026-10-08T16:17:03.151Z |
| `broader-frontend-orchestration`: `"frontend orchestration" in:name,description,readme` | `…#created:2026-Q1` | 2026-10-07T23:42:06.074Z / 2026-10-08T16:24:17.763Z |

As consultas efetivas acrescentam `pushed:>=2025-04-01` e `created:2026-02-01..2026-02-28` (ou `2026-01-01..2026-03-31` na consulta ampla).

Metadados do hit:
- descrição nula, sem tópicos, linguagem TypeScript, `fork: false`, tamanho 36;
- criação em 2026-02-14T18:26:08Z, push em 2026-02-14T18:27:47Z.

Grafias no README:
- “Micro Frontend”/“micro frontend”: `README.md:1`, `3`;
- “micro frontends”: `README.md:42` (“Lazy loads micro frontends”);
- “microfrontend”: `README.md:8` (`simple-microfrontend/`);
- “Module Federation”: `README.md:3`, `103`, `144`;
- “Orchestrates”: `README.md:43` (“Orchestrates the entire application”), sem a grafia literal “frontend orchestration”.

O plural colado “microfrontends” não aparece literalmente. O README vem do único commit, o SHA (2026-02-15), anterior às coletas de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 34 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Há três projetos (`common_simple/`, `core_simple/`, `users_simple/`), cada um com `package.json`, lockfile, `rsbuild.config.ts`, `public/index.html` e `src/`, mais um `package.json` de scripts na raiz e documentos (`ARCHITECTURE.md`, `STRUCTURE.md`, `QUICK_START.md`). | contexto |
| Configuração (host) | `core_simple/rsbuild.config.ts:8–29`: `pluginModuleFederation({ name: 'core_simple', remotes: { common_simple: …:3001/remoteEntry.js, users_simple: …:3002/remoteEntry.js }, shared: react/react-dom eager singleton, react-router-dom })`. | forte |
| Configuração (remotos) | `users_simple/rsbuild.config.ts:8–31`: `exposes: { './UserList': './src/App.tsx' }` e `remotes: { common_simple }`. `common_simple/rsbuild.config.ts:8–26`: `exposes: { './Button', './Card' }`. Portas 3002 e 3001 (`:34`, `:29`) coincidem com o host. | forte |
| Código-fonte (composição) | `core_simple/src/App.tsx:9`: `lazy(() => import('users_simple/UserList'))`; `:56–61`: rota `/users` monta `UserList`; `:4–6`, `15–26`: `Button` e `Card` remotos na página inicial. `users_simple/src/App.tsx:3–5`, `40–53`: consome `Button`/`Card` de `common_simple`. `core_simple/src/index.tsx` importa `bootstrap` (bootstrap assíncrono). | forte |
| Natureza das unidades | `users_simple` é uma fatia funcional (lista de usuários com busca de dados, `users_simple/src/App.tsx:14–56`) montada por rota. `common_simple` é uma biblioteca de componentes servida por federação, compartilhada pelos outros dois. | moderada |
| Código-fonte (fronteiras) | Busca por imports `../` em `*.ts`/`*.tsx`: nenhuma ocorrência entre projetos; `common_simple/src/App.tsx:2–3` importa os próprios componentes (`./components`). Os projetos só se ligam pelos módulos federados. | contexto |

## Autoria e histórico

Clone não raso; 1 commit, o SHA `cb2083f` (2026-02-15, “first commit”), de ahmed7761 `<sharif7761@gmail.com>`. Nenhum blob histórico foi lido e não houve objeto ausente.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | Três unidades no repositório, duas referenciadas pela configuração de composição do host (`core_simple/rsbuild.config.ts:11–14`). |
| Q2 | Yes | Cada projeto tem `package.json`, lockfile, `rsbuild.config.ts`, entrada e porta próprios, sem imports de código-fonte entre eles. |
| Q3 | Yes | O shell monta `UserList` por rota (`core_simple/src/App.tsx:56–61`). |
| Q4 | Yes | Module Federation (plugin Rsbuild) com `remotes` no host e em `users_simple` e `exposes` nos remotos, consumido por imports federados. |
| Q5 | Yes | Q1–Q4 são Yes: shell que compõe um micro-frontend funcional por rota, mais uma biblioteca de componentes federada. |

## Motivo

- `MFE-implemented` pela regra Q1–Q5 Yes. Corresponde a “monorepos containing a host and its remotes”. A cadeia shell → `users_simple` está completa no snapshot, como em 076/084/096/106/109.
- **Compartilhamento de componentes:** `common_simple` é compartilhamento de componentes por federação, o padrão discutido em 089/100. Aqui, porém, ele coexiste com a composição efetiva de uma fatia funcional por rota (`users_simple`), que basta para Q3/Q4.
- **Campos:** `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [rsbuild]` (como 029), `frontend_units: 3` (os três alvos executáveis, inclusive `common_simple`, que tem app próprio de demonstração, `common_simple/src/App.tsx`), `unit_organization: monorepo`, `repo_type: example` (“to understand Module Federation structure”, `README.md:3`).
- Não há decisão aberta.

## Notas para análise

- **RQ2:** três papéis num exemplo mínimo: shell, micro-frontend funcional e biblioteca de componentes federada consumida tanto pelo shell quanto pelo micro-frontend.
- **Protocolo (busca):** o repositório entra por seis consultas, inclusive a ampla `"frontend orchestration"`, sem grafia literal desta nem do plural colado. A elegibilidade muda de `unknown` (001) para `pass` (002). O branch padrão é `master`.
- **Contribuição da revisão independente (Lupa):** concordância integral com MFE-implemented, Q1–Q5 Yes, `module-federation`, React/Rsbuild, três unidades e `monorepo`; sem decisão aberta (`draft`). A prova de arquitetura MFE é `core_simple` → `users_simple`, e `common_simple` é o demonstrador de uma biblioteca federada (o `App` demonstrador dela não é o que o shell monta), de modo que a decisão se mantém mesmo contando apenas shell e `users_simple` como unidades funcionais. Correções verificadas no SHA: `core_simple/src/App.tsx` importa `Button` (`:4`) e `Card` (`:6`) de `common_simple`, mas renderiza somente `Card` na Home (`:15–26`); `Button` é import não utilizado, e a descrição de que o shell usa `Button` e `Card` remotos na página inicial deve ser lida com essa precisão. As configurações não especificam `html.template`, então não se afirma que `public/index.html` seja um template explicitamente selecionado pelo Rsbuild (a entrada convencional é `src/index.tsx`). Os termos de busca sem grafia literal têm proveniência limitada. `rev-list --objects --missing=print` não mostra objeto ausente.

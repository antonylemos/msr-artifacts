---
schema: 1
id: 1205888629
full_name: farzanemadani/todo-app-using-mfe
url: https://github.com/farzanemadani/todo-app-using-mfe
commit: 21fc4773aa4d577351ce2000de48b52a73db8378
classification: MFE-implemented
checklist: { q1: yes, q2: yes, q3: yes, q4: yes, q5: yes }
repo_type: example
approaches: [module-federation]
ui_technologies: [react]
build_tools: [webpack]
frontend_units: 3
unit_organization: monorepo
annotation:
  method: manual
  status: final
  date: 2026-10-23
---

# 318 — farzanemadani/todo-app-using-mfe

## Contexto

Exemplo pequeno de Module Federation com webpack 5 e React 19: um host (`host-app/`) roteia dois remotes, um formulário de tarefas (`todoForm-app/`) e uma lista (`todoList-app/`), que compartilham os dados por `localStorage` (`README.md:3–11`). Cada app tem `package.json`, configs de webpack de desenvolvimento e produção e entrada própria; não há `package.json` na raiz (`README.md:127`). O nome do repositório não é usado como evidência.

`data/samples/mfe-sample-001/clones.csv:319` registra rank 318, ID 1205888629, status `cloned`, branch `main` e o commit do front matter, que é o HEAD do clone e de `origin/main`. Todo comando Git no clone usou `GIT_NO_LAZY_FETCH=1`, com leitura por `${SHA}:caminho`. Não houve instalação, build, execução ou acesso à rede.

## Proveniência na amostra

`data/samples/mfe-sample-001/sample.csv:319` registra as estratégias `terminology;technology` e elegibilidade `pass`. A amostra vem da rodada 002 (`data/samples/mfe-sample-001/manifest.json:2–5`). O ID consta em `data/discovery/mfe-round-001/candidates.csv:28074` (`terminology;technology`, `unknown`, regra `recent-human-commit` com `activity_incomplete`) e `data/discovery/mfe-round-002/candidates.csv:28080` (`terminology;technology`, `pass`).

Consulta `sqlite3 -readonly` às tabelas `hits`, `queries` e `subqueries` das duas rodadas, filtrada pelo ID, retorna os mesmos três hits em cada rodada, do endpoint `repositories`, com `path` vazio:

| Consulta (`q`) | Subconsulta | Consulta efetiva | Coleta 001 / 002 (UTC) |
|---|---|---|---|
| `terminology-micro-frontend-repositories`: `"micro frontend" in:name,description,readme` | `…#created:2026-04` | `… pushed:>=2025-04-01 created:2026-04-01..2026-04-30` | 2026-10-07T22:34:23.585Z / 2026-10-08T15:59:00.892Z |
| `terminology-micro-frontends-repositories`: `"micro frontends" in:name,description,readme` | `…#created:2026-04` | idem | 2026-10-07T23:02:41.710Z / 2026-10-08T16:08:48.189Z |
| `technology-module-federation-repositories`: `"module federation" in:name,description,readme` | `…#created:2026-04` | idem | 2026-10-07T23:25:04.169Z / 2026-10-08T16:17:43.049Z |

Metadados do hit: descrição “Built with React 19, Webpack 5, Module Federation”, sem tópicos, linguagem JavaScript, sem licença, `fork: false`, tamanho 9, criação em 2026-04-09T11:31:37Z, push em 2026-04-26T09:15:18Z.

Correspondência textual:
- “micro frontends”: `README.md:1` (“# Todo App Using Micro Frontends”), literal;
- “micro frontend”: só nas formas hifenizadas `README.md:3` (“micro-frontend project”) e `README.md:15` (“Micro-frontend architecture”), com o hífen tratado como separador;
- “module federation”: descrição do repositório e `README.md:3`, `11`, `26`, `113`.

O README foi introduzido em `3847612` e alterado no próprio SHA `21fc477` (ambos em 2026-04-26), anteriores às coletas de 7 e 8 de outubro de 2026. O README do SHA não é posterior às buscas.

## Evidências observadas

| Dimensão | Observação (artefato:linha) | Força |
|---|---|---|
| Estrutura | `git ls-tree -r` no SHA: 29 entradas, todas arquivos regulares `100644`; zero symlinks e zero gitlinks. Três projetos (`host-app`, `todoForm-app`, `todoList-app`), cada um com `package.json`, `webpack.dev.js`, `webpack.prod.js`, `public/index.html` e `src/` com `bootstrap.js` → `index.js`. | forte |
| Configuração (host) | `host-app/webpack.dev.js:45–55`: `ModuleFederationPlugin` com `name: 'host_app'` e `remotes` `todoForm_app@http://localhost:3001/remoteEntry.js` e `todoList_app@http://localhost:3002/remoteEntry.js`; `shared` com as dependências do `package.json` (`:5`, `52–54`); porta 3000 (`:13–16`). `host-app/webpack.prod.js:7–8`, `49–59`: mesmos remotes via constantes, ainda em `localhost` (o README reconhece, `README.md:128`). | forte |
| Configuração (remotes) | `todoForm-app/webpack.dev.js:15–18`, `48–57`: porta 3001, `name: 'todoForm_app'`, `exposes: { "./TodoForm": './src/components/todoForm.jsx' }`. `todoList-app/webpack.dev.js:14–17`, `47–56`: porta 3002, `name: 'todoList_app'`, `exposes: { "./todoList": './src/components/ToDoList.jsx' }`. Os `webpack.prod.js` repetem `name` e `exposes`. | forte |
| Código-fonte (composição) | `host-app/src/App.jsx:2–3`: `React.lazy(() => import('todoForm_app/TodoForm'))` e `import('todoList_app/todoList')`, com chaves e nomes iguais aos expostos; `:12–22`: rotas `/` (lista), `/add` e `/edit/:id` (formulário) em `Suspense`. `host-app/src/bootstrap.js:1` e `host-app/src/index.js:5–10`: entrada assíncrona e `BrowserRouter`. | forte |
| Código-fonte (remotes) | `todoForm-app/src/components/todoForm.jsx:5–98` e `todoList-app/src/components/ToDoList.jsx:6–60`: telas funcionais (criar/editar e listar/excluir) que usam `useNavigate`/`useParams` do roteador do host e `localStorage` (`todoForm.jsx:16`, `27–29`; `ToDoList.jsx:8`, `12`). Cada remote monta isolado por `src/index.js:3–4`. | forte |
| Código-fonte (fronteiras) | Busca por `../` em `*.js`, `*.jsx`, `*.json` e `*.html`: só `todoForm-app/src/components/todoForm.jsx:4` e `todoList-app/src/components/ToDoList.jsx:3` (`'../index.css'`, internos ao próprio app). Nenhum import de código-fonte entre os três projetos; o host só alcança os remotes pelos especificadores federados. | forte |
| Build/deploy | Scripts `start`/`build` próprios por app (`host-app/package.json:5–9`; idem nos remotes), saídas separadas em `build/` (`README.md:97–105`). Sem pipeline nem deploy. | moderada |

## Autoria e histórico

Clone não raso, parcial (`blob:none`). 3 commits (3 em todos os refs), nenhum merge, autor e committer `farzanemadani <farzane.madani@gmail.com>`: a raiz `67d1b09` (2026-04-12, “first commit”) adiciona os três apps e `.gitignore`; `3847612` e o SHA `21fc477` (2026-04-26, “feat:add readme”) adicionam e ajustam o README. A estrutura federada já está no commit-raiz; os metadados não separam autoria intelectual. `git rev-list --objects $SHA --missing=print` identifica 1 objeto histórico ausente; os arquivos citados do SHA foram lidos.

## Checklist

| # | Resposta | Evidência |
|---|---|---|
| Q1 | Yes | `host-app`, `todoForm-app` e `todoList-app`, os dois remotes referenciados pela configuração do host (`host-app/webpack.dev.js:48–51`). |
| Q2 | Yes | Entrada (`src/bootstrap.js`), webpack e porta próprios por app; nenhum import de código-fonte entre eles. |
| Q3 | Yes | O host roteia e carrega os remotes (`host-app/src/App.jsx:2–3`, `12–22`). |
| Q4 | Yes | Module Federation configurado nos dois lados, com nomes, portas e chaves expostas coincidentes (`host-app/webpack.dev.js:49–50` × `todoForm-app/webpack.dev.js:16`, `49–52` e `todoList-app/webpack.dev.js:15`, `48–51`), consumido por `import()` federado. |
| Q5 | Yes | Q1–Q4 convergem. |

## Motivo

- Q1–Q5 são Yes, o que satisfaz a regra de `MFE-implemented`. Corresponde a “monorepos containing a host and its remotes” e a “examples… that actually compose frontend units” (`repo_type: example`, “A small React micro-frontend project”, `README.md:3`).
- A cadeia é completa e conectável, sem divergência de nome, porta ou chave exposta (contraste com 097/103/104); comparável aos casos de cadeia completa (076/084/096/106/109).
- Não é code sharing (089/100): cada remote expõe uma tela inteira montada como rota do host.
- `frontend_units: 3`, `unit_organization: monorepo`, `approaches: [module-federation]`, `ui_technologies: [react]`, `build_tools: [webpack]`.
- Não há decisão aberta.

## Notas para análise

- **RQ2:** Module Federation do webpack 5 com `shared` gerado a partir de todas as `dependencies` do `package.json` (sem `singleton`), e remotes que dependem do contexto de roteamento do host (`useNavigate`, `useParams`).
- **RQ3:** integração de estado entre unidades por `localStorage` (chave `todos`), sem API nem event bus (`README.md:11`, `54`).
- **RQ1:** o título do cabeçalho do host é “Monolyth - TodoApp” (`host-app/src/components/header.jsx:7`), texto de interface sem efeito arquitetural.

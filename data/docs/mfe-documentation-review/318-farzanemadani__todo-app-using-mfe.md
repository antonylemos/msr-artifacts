---
schema: 1
id: 1205888629
full_name: farzanemadani/todo-app-using-mfe
commit: 21fc4773aa4d577351ce2000de48b52a73db8378
inputs:
  mining:
    output: data/mining/mfe-mining-001
    version: "1"
    config_sha256: 477ce8efa222a5170fdb68af51036d481c9688dda919aab993aa9f3db328fbf2
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 318 — farzanemadani/todo-app-using-mfe

## Leitura do repositório

A documentação é só o README da raiz (README.md:1-129), em inglês, o único artefato
`documentation` do `artifacts.csv`. Ele descreve o projeto como um exemplo pequeno de micro-frontends
com React e Module Federation do webpack: três aplicações (`host-app`, o shell com o roteador, e dois
remotes, `todoForm-app` e `todoList-app`), os endereços `remoteEntry.js` que o host carrega, as rotas
em que cada remote entra, a troca de dados pelo `localStorage`, o build separado de cada aplicação e
os módulos expostos. Termina com notas que reconhecem os limites do exemplo: sem `package.json` na
raiz, configuração de produção do host ainda em `localhost`, dados só no navegador.

O README confere com as revisões anteriores em todos os pontos. A revisão de dependências não
registra tecnologia (o `ModuleFederationPlugin` vem do próprio `webpack`, host-app/webpack.prod.js:4,
sem pacote próprio), e a revisão de composição registra o mecanismo `module-federation` nas relações
1 e 2; por isso "Webpack Module Federation" não nomeia tecnologia diferente da registrada. O README
não afirma deploy: ao contrário, diz que a configuração de produção precisaria de outras URLs
(README.md:128), o que bate com o `não observado` da revisão de build e deploy.

Ficaram fora da tabela:
- o título "Todo App Using Micro Frontends" (README.md:1) e os títulos de seção "Module Federation
  Setup" (README.md:113) e "Host remotes" (README.md:115), que nomeiam o tema sem afirmar nada além
  das linhas da tabela;
- as funcionalidades e a pilha da aplicação (README.md:17-19, 24-30): tarefas, `react-router-dom`,
  `react-hot-toast`, React 19, Webpack 5, Babel, CSS. "Module Federation" na lista (README.md:26)
  repete a afirmação 1; o roteamento entre as telas é a afirmação 7;
- a árvore de pastas sem comentários (README.md:34-39), que repete as três pastas da afirmação 2;
- as instruções de instalação e execução (README.md:58-71, 89-93), os blocos de comando
  (README.md:67-71, 77-87, 99-103) e a lista de portas (README.md:107-111), que é detalhe de
  infraestrutura; as portas 3001 e 3002 aparecem na afirmação 6 só como parte das URLs dos remotes.

Ocorrências `doc-*` que não viraram linha: README.md:1 (título), README.md:26 (item da pilha, na
afirmação 1), README.md:113 (título de seção), README.md:115 (título de seção, ver afirmação 10) e
README.md:15 (repetição, no parágrafo da afirmação 2). As demais estão nas afirmações da tabela: README.md:3 na 1, README.md:11 na 3,
README.md:43 na 6 e README.md:128 na 13.

Foram lidos os artefatos que as revisões anteriores citam: os três `package.json` (a `description`
está vazia em todos, host-app/package.json:12; todoForm-app/package.json:12;
todoList-app/package.json:13), os seis `webpack.*.js`, os `index.js`, `bootstrap.js` e `App.jsx`
das três aplicações, `host-app/src/components/header.jsx`, os dois componentes expostos e os três
`public/index.html`. Os comentários dos `webpack.prod.js` só desativam código (`devServer`,
`ReactRefreshWebpackPlugin`, a entrada antiga `./src/index.js`, por exemplo
todoForm-app/webpack.prod.js:3, 8, 15-18) e não afirmam nada sobre a arquitetura. Os títulos das
páginas ("Todo - Host App" etc., host-app/public/index.html:6) e o "Monolyth - TodoApp" do cabeçalho
do host (host-app/src/components/header.jsx:7) são texto de interface.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "A small React micro-frontend project built with Webpack Module Federation." | estrutura | corroborada | 3.4.3 (três unidades `Yes`); 3.4.5 #1, #2; host-app/webpack.prod.js:4, 49-55 |
| 2 | README.md:5-9 | "splits a todo application into three separate apps: `host-app`: the shell application and router; `todoForm-app`: the remote responsible for adding and editing tasks; `todoList-app`: the remote responsible for listing and deleting tasks" | estrutura | corroborada | 3.4.3 (host-app, todoForm-app, todoList-app `Yes`); 3.4.5 #1, #2; host-app/src/index.js:7-9; host-app/src/App.jsx:12-22 |
| 3 | README.md:11 | "The apps communicate through Module Federation and share todo data through `localStorage`." | composição | corroborada | 3.4.5 #1, #2, #3; todoForm-app/src/components/todoForm.jsx:29, 40; todoList-app/src/components/ToDoList.jsx:8, 12 |
| 4 | README.md:16 | "Lazy-loaded remote modules using `React.lazy` and `Suspense`" | composição | corroborada | 3.4.4 (host-app/src/App.jsx:2 e :3, dynamic-loading); host-app/src/App.jsx:13-21 |
| 5 | README.md:20 | "Separate development and production webpack configs for each app" | build-deploy | corroborada | 3.4.3 (coluna Build); host-app/package.json:7-8; todoForm-app/package.json:7-8; todoList-app/package.json:8-9 |
| 6 | README.md:43-46 | "The `host-app` […] loads two remote applications: `todoForm_app` from `http://localhost:3001/remoteEntry.js`; `todoList_app` from `http://localhost:3002/remoteEntry.js`" | composição | corroborada | 3.4.5 #1, #2; host-app/webpack.dev.js:48-51; host-app/webpack.prod.js:7-8, 52-55 |
| 7 | README.md:48-52 | "Routes in the host: `/`: shows the todo list remote; `/add`: opens the add-task form remote; `/edit/:id`: opens the edit-task form remote" | composição | corroborada | 3.4.4 (host-app/src/App.jsx:12, host-relationship; :14, :17, :20, runtime-composition); host-app/src/App.jsx:12-22 |
| 8 | README.md:75 | "Start each app in a separate terminal" (cada aplicação roda no próprio processo) | independência | corroborada | 3.4.6 #1-#3 (servidores de desenvolvimento); host-app/webpack.dev.js:13-16; todoForm-app/webpack.dev.js:15-18; todoList-app/webpack.dev.js:14-17 |
| 9 | README.md:97, 105 | "Build each app separately […] Production bundles are generated in each app's `build/` directory." | build-deploy | corroborada | 3.4.6 #1-#3 (`separado`); host-app/webpack.prod.js:12-15; todoForm-app/webpack.prod.js:10-13; todoList-app/webpack.prod.js:9-12 |
| 10 | README.md:115-118 | "Host remotes: `todoForm_app/TodoForm`; `todoList_app/todoList`" | composição | corroborada | 3.4.4 (host-app/src/App.jsx:2 e :3); 3.4.5 #1, #2 |
| 11 | README.md:120-123 | "`todoForm-app` exposes `./TodoForm`; `todoList-app` exposes `./todoList`" | composição | corroborada | 3.4.5 #1, #2; todoForm-app/webpack.prod.js:51-52; todoList-app/webpack.prod.js:50-51 |
| 12 | README.md:127 | "There is no root `package.json`, so dependencies are installed per app." | estrutura | corroborada | 3.4.3 (Workspace: nenhuma declaração; Notas); host-app/package.json:13-32; todoForm-app/package.json:13-32; todoList-app/package.json:14-32 |
| 13 | README.md:128 | "The production config in `host-app` currently points to remotes on `localhost`, so deployment would need updated remote URLs." | build-deploy | corroborada | 3.4.6 #1-#3 (`não observado`); host-app/webpack.prod.js:7-8, 53-54 |
| 14 | README.md:129 | "Todo data is browser-local only and is not backed by an API or database." | outro | corroborada | 3.4.5 #3; todoForm-app/src/components/todoForm.jsx:16-40; todoList-app/src/components/ToDoList.jsx:8-12 |

## Observações

**1. README.md:3.** O snapshot tem três aplicações React com build webpack próprio, ligadas pelo
`ModuleFederationPlugin` do webpack (host-app/webpack.prod.js:4, 49-55), o que a revisão de
composição registrou como duas relações host → remote com mecanismo `module-federation`. A pilha
repete "Module Federation" (README.md:26). A revisão de dependências não lista tecnologia porque o
plugin vem do pacote `webpack` (host-app/package.json:30), sem dependência própria de federação.

**2. README.md:5-9.** As três pastas são as três unidades `Yes` da revisão estrutural. O host tem o
roteador (`BrowserRouter`, host-app/src/index.js:7-9) e monta os dois remotes nas rotas
(host-app/src/App.jsx:12-22). Os papéis funcionais conferem: o formulário é montado em `/add` e
`/edit/:id` e grava a tarefa (todoForm-app/src/components/todoForm.jsx:25-42); a lista lê e exclui
(todoList-app/src/components/ToDoList.jsx:8-12). A mesma afirmação aparece em "Micro-frontend
architecture with a host and two remotes" (README.md:15) e na árvore de pastas (README.md:34-39).

**3. README.md:11.** A primeira parte é a federação das relações 1 e 2 da revisão de composição. A
segunda é a relação 3: as duas telas leem e gravam a chave `todos` (todoForm-app/src/components/todoForm.jsx:16, 27-29, 33-40;
todoList-app/src/components/ToDoList.jsx:8, 12), portanto ao menos duas unidades usam o mesmo dado; o
host não toca nele. A chave é repetida em README.md:54. O compartilhamento só vale com as duas telas
na página do host, na mesma origem; isoladas, nas portas 3001 e 3002, cada uma teria o próprio
`localStorage`, o que o README não diz.

**4. README.md:16.** O host declara os dois componentes remotos com `React.lazy(() => import(...))`
(host-app/src/App.jsx:2-3) e cada rota os envolve em `Suspense` com fallback "loading"
(host-app/src/App.jsx:13-21).

**5. README.md:20.** Cada aplicação tem `webpack.dev.js` (modo `development`, com `devServer`) e
`webpack.prod.js` (modo `production`), usados pelos scripts `start` e `build` do próprio
`package.json` (host-app/package.json:7-8; todoForm-app/package.json:7-8;
todoList-app/package.json:8-9), como a revisão estrutural registrou na coluna Build.

**6. README.md:43-46.** Os dois endereços estão no `remotes` do host, literais na configuração de
desenvolvimento (host-app/webpack.dev.js:48-51) e por constantes na de produção
(host-app/webpack.prod.js:7-8, 52-55). Os nomes `todoForm_app` e `todoList_app` batem com o `name`
dos remotes (todoForm-app/webpack.prod.js:49; todoList-app/webpack.prod.js:48). A porta 3000 do host
(host-app/webpack.dev.js:14) é detalhe de infraestrutura e fica no trecho só como contexto.

**7. README.md:48-52.** As três rotas estão em host-app/src/App.jsx:12-22: `/` com `ToDoList`, `/add`
com `TodoForm` e `/edit/:id` com `TodoForm type='edit'`. O README não diz, mas os remotes navegam
entre si pelo roteador do host (todoList-app/src/components/ToDoList.jsx:21;
todoForm-app/src/components/todoForm.jsx:31, 42), como a revisão de composição descreve.

**8. README.md:75.** A instrução diz que cada aplicação é iniciada à parte, cada uma com o próprio
`webpack serve` (`start` em host-app/package.json:7; todoForm-app/package.json:7;
todoList-app/package.json:8) e `devServer` próprio nas portas 3000, 3001 e 3002. É isso que se
confirma: processos separados. O README não afirma que cada remote funciona sozinho, e o snapshot
não o sustentaria por inteiro: o `App.jsx` de todoForm-app só renderiza `<div>App</div>`
(todoForm-app/src/App.jsx:3-7), e o de todoList-app renderiza `ToDoList`
(todoList-app/src/App.jsx:7), que usa `useNavigate` (todoList-app/src/components/ToDoList.jsx:7) sem
`BrowserRouter` na entrada do remote (todoList-app/src/index.js:3-4).

**9. README.md:97, 105.** As duas frases dizem a mesma coisa: um build por aplicação, cada um com
saída própria. Cada `webpack.prod.js` grava `bundle.js` em `build/` do próprio projeto
(host-app/webpack.prod.js:12-15; todoForm-app/webpack.prod.js:10-13; todoList-app/webpack.prod.js:9-12),
e não há script que dispare os três juntos; a revisão de build e deploy marcou as três como
`separado`. O bloco de comandos entre as frases (README.md:99-103) repete os scripts `build`.

**10. README.md:115-118.** Os dois especificadores são os dos `import()` do host
(host-app/src/App.jsx:2-3), resolvidos pelos remotes declarados em host-app/webpack.prod.js:53-54.
O título "Host remotes" (README.md:115) é a ocorrência `doc-host-remote` desta seção.

**11. README.md:120-123.** As exposições conferem com os dois remotes, nas duas configurações:
`./TodoForm` aponta para `./src/components/todoForm.jsx` (todoForm-app/webpack.prod.js:51-52;
todoForm-app/webpack.dev.js:51-52) e `./todoList`, em minúsculas, para
`./src/components/ToDoList.jsx` (todoList-app/webpack.prod.js:50-51; todoList-app/webpack.dev.js:50-51).

**12. README.md:127.** Não há `package.json` na raiz do snapshot, e os três `package.json` não
declaram `workspaces`; cada um lista as próprias `dependencies` e `devDependencies`
(host-app/package.json:13-32; todoForm-app/package.json:13-32; todoList-app/package.json:14-32). A
instrução de instalar dentro de cada aplicação (README.md:65) é a consequência dita aqui.

**13. README.md:128.** As constantes `todoformAppurl` e `todolistAppurl` do `webpack.prod.js` do host
valem `http://localhost:3001` e `http://localhost:3002` (host-app/webpack.prod.js:7-8) e alimentam
os remotes (host-app/webpack.prod.js:53-54). Nenhum artefato do snapshot publica as aplicações, e o
próprio README trata o deploy como trabalho por fazer.

**14. README.md:129.** O único armazenamento das tarefas é o `localStorage`
(todoForm-app/src/components/todoForm.jsx:16-40; todoList-app/src/components/ToDoList.jsx:8-12);
não há chamada de rede nos `src/` das três aplicações nem backend no snapshot.

## Resumo

Afirmações: 14 (corroborada: 14, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 3, composição: 6, build-deploy: 3, independência: 1, outro: 1).

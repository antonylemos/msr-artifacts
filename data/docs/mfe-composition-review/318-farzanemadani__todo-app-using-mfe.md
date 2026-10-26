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
  inspection:
    output: data/inspections/mfe-dependencies-001
    version: "1"
    config_sha256: 8cb9527ff8cf32adfc90d629a85fdd23c38af7223d7ca1f2c3d4f1e8aa284f1e
annotation:
  method: manual
  status: final
  date: 2026-10-24
---

# 318 — farzanemadani/todo-app-using-mfe

## Leitura do repositório

Exemplo pequeno de Module Federation com webpack 5 e React, com três projetos lado a lado e sem
`package.json` na raiz. `host-app` é o host (porta 3000, host-app/webpack.dev.js:13-16) e declara
dois remotes, `todoForm_app` na porta 3001 e `todoList_app` na porta 3002, tanto na configuração
de desenvolvimento (host-app/webpack.dev.js:48-51) quanto na de produção
(host-app/webpack.prod.js:52-55, com as URLs nas constantes de :7-8, ainda em `localhost`). Cada
remote expõe uma única tela: todoForm-app expõe `./TodoForm`
(todoForm-app/webpack.dev.js:49-52; todoForm-app/webpack.prod.js:49-52) e todoList-app expõe
`./todoList` (todoList-app/webpack.dev.js:48-51; todoList-app/webpack.prod.js:48-51). As três
configurações compartilham todas as `dependencies` do próprio `package.json`, sem `singleton`
(por exemplo host-app/webpack.prod.js:56-58).

O host carrega as duas telas com `React.lazy` e `import()` federado
(host-app/src/App.jsx:2-3) e as monta como rotas dentro de `Suspense`: `/` mostra a lista, `/add`
e `/edit/:id` mostram o formulário, este último com `type='edit'` (host-app/src/App.jsx:12-22). O
roteador é o `BrowserRouter` do host (host-app/src/index.js:7-9); os remotes usam esse contexto
para navegar entre si (`navigate('/add')` e `navigate(`/edit/${todo.id}`)` em
todoList-app/src/components/ToDoList.jsx:21, :48; `navigate('/')` em
todoForm-app/src/components/todoForm.jsx:31, :42, :91) e para ler o parâmetro da rota
(todoForm-app/src/components/todoForm.jsx:14). As duas telas trocam os dados pela chave `todos`
do `localStorage`, que ambas leem e gravam, sem evento `storage` nem outro canal.

Não viraram relação os `import('./index.js')` dos três `bootstrap.js` (por exemplo
host-app/src/bootstrap.js:1), internos a cada unidade, nem a navegação entre os remotes, que
passa pelo roteador do host e não declara ligação própria. Os `App.jsx` dos remotes servem só à
execução isolada: o de todoList-app renderiza `<ToDoList/>` (todoList-app/src/App.jsx:7) e o de
todoForm-app só um `<div>App</div>` (todoForm-app/src/App.jsx:3-7). O título "Monolyth -
TodoApp" no cabeçalho do host (host-app/src/components/header.jsx:7) é só texto de interface.
Toda unidade `Yes` da revisão estrutural participa de ao menos uma relação.

## Relações

| # | Origem | Destino | Tipo | Direção | Mecanismo | No snapshot | Ativa | Configuração | Código |
|---|---|---|---|---|---|---|---|---|---|
| 1 | host-app | todoForm-app | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.dev.js:49 (remote `todoForm_app@http://localhost:3001/remoteEntry.js`); host-app/webpack.prod.js:53 (remote `todoForm_app@${todoformAppurl}/remoteEntry.js`, URL em :7); todoForm-app/webpack.dev.js:49 (`name:'todoForm_app'`); todoForm-app/webpack.dev.js:51-52 (expõe `./TodoForm`); todoForm-app/webpack.prod.js:49 (`name:'todoForm_app'`); todoForm-app/webpack.prod.js:51-52 (expõe `./TodoForm`); todoForm-app/webpack.dev.js:16 (porta 3001) | host-app/src/App.jsx:2; host-app/src/App.jsx:12; host-app/src/App.jsx:17; host-app/src/App.jsx:20 |
| 2 | host-app | todoList-app | host → remote | origem → destino | module-federation | Yes | Yes | host-app/webpack.dev.js:50 (remote `todoList_app@http://localhost:3002/remoteEntry.js`); host-app/webpack.prod.js:54 (remote `todoList_app@${todolistAppurl}/remoteEntry.js`, URL em :8); todoList-app/webpack.dev.js:48 (`name:'todoList_app'`); todoList-app/webpack.dev.js:50-51 (expõe `./todoList`); todoList-app/webpack.prod.js:48 (`name:'todoList_app'`); todoList-app/webpack.prod.js:50-51 (expõe `./todoList`); todoList-app/webpack.dev.js:15 (porta 3002) | host-app/src/App.jsx:3; host-app/src/App.jsx:12; host-app/src/App.jsx:14 |
| 3 | todoForm-app | todoList-app | communication | bidirecional | other | Yes | Yes | — | todoForm-app/src/components/todoForm.jsx:29 |

## Observações

**1. host-app → todoForm-app.** `import('todoForm_app/TodoForm')` (host-app/src/App.jsx:2) usa a
chave do remote declarado em host-app/webpack.dev.js:49 e host-app/webpack.prod.js:53, que bate
com o `name: 'todoForm_app'` de todoForm-app (todoForm-app/webpack.dev.js:49;
todoForm-app/webpack.prod.js:49), e o caminho `TodoForm` bate com a exposição `./TodoForm`, que
aponta para `./src/components/todoForm.jsx` (todoForm-app/webpack.dev.js:51-52;
todoForm-app/webpack.prod.js:51-52). A porta 3001 (todoForm-app/webpack.dev.js:16) só corrobora;
no `webpack.prod.js` do remote a porta está comentada (todoForm-app/webpack.prod.js:16). O host
monta o formulário em duas rotas, `/add` (host-app/src/App.jsx:16-18) e `/edit/:id` com
`type='edit'` (host-app/src/App.jsx:19-21), e a linha manual de `Routes`
(host-app/src/App.jsx:12) entra nesta relação e na 2. A cadeia é ativa: a entrada do host
(host-app/webpack.prod.js:11) passa por host-app/src/bootstrap.js:1 e host-app/src/index.js:5-10
até o `App`.

**2. host-app → todoList-app.** `import('todoList_app/todoList')` (host-app/src/App.jsx:3) usa o
remote de host-app/webpack.dev.js:50 e host-app/webpack.prod.js:54, que bate com o
`name: 'todoList_app'` (todoList-app/webpack.dev.js:48; todoList-app/webpack.prod.js:48) e com a
exposição `./todoList`, em minúsculas como no especificador, que aponta para
`./src/components/ToDoList.jsx` (todoList-app/webpack.dev.js:50-51;
todoList-app/webpack.prod.js:50-51). A porta 3002 (todoList-app/webpack.dev.js:15) só corrobora.
A lista é montada na rota `/` (host-app/src/App.jsx:13-15), a mesma para onde o formulário volta
depois de salvar.

**3. todoForm-app ↔ todoList-app.** A troca é por estado compartilhado na chave `todos` do
`localStorage`, não por eventos, por isso o mecanismo é `other`; não há canal de eventos a juntar.
O formulário grava a lista ao adicionar (todoForm-app/src/components/todoForm.jsx:27-29) e ao
editar (:33-40), e a lista lê a chave ao montar (todoList-app/src/components/ToDoList.jsx:8). O
sentido inverso também existe: a exclusão na lista regrava a chave
(todoList-app/src/components/ToDoList.jsx:12), e o formulário a lê ao abrir para edição e antes de
cada gravação (todoForm-app/src/components/todoForm.jsx:16, :27, :33), daí `bidirecional`, com as
unidades em ordem alfabética. Ninguém escuta o evento `storage`: a lista só vê a gravação do
formulário porque é montada de novo depois de `navigate('/')`
(todoForm-app/src/components/todoForm.jsx:31, :42). A chave só é a mesma quando as duas telas
rodam na página do host, numa única origem; isoladas, nas portas 3001 e 3002, cada uma tem seu
`localStorage`. A revisão de código-fonte registrou o canal numa linha de todoForm-app
(todoForm-app/src/components/todoForm.jsx:29), que é a única da coluna Código. Nenhuma declaração
de configuração liga as unidades por esse canal, e a Configuração fica `—`.

## Resumo

Relações: 3 (host → remote: 2, communication: 1). Ativas: 3. Destino fora do snapshot: 0.
Unidades sem relação: nenhuma.

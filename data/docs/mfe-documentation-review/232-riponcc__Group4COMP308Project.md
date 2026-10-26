---
schema: 1
id: 1104733457
full_name: riponcc/Group4COMP308Project
commit: 59db8c8172c1e0efde31fe32c5135226a41cd044
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

# 232 — riponcc/Group4COMP308Project

## Leitura do repositório

A documentação do projeto é o README.md da raiz, em inglês. Ele apresenta um "Municipal Issue
Management System" de disciplina (COMP308, Centennial College; README.md:259, 271), com três
microsserviços de backend e três aplicações frontend unidas por Module Federation: um shell host e
dois módulos, user e issue (README.md:3, 19-27). Os outros três arquivos `documentation` do
`artifacts.csv`, client/shell-app/README.md, client/user-app/README.md e client/issue-app/README.md,
são o README padrão do template React + Vite, idênticos entre si (client/shell-app/README.md:1-3) e
sem afirmação sobre o projeto; não viram linha.

No que diz das unidades frontend, o README confere com as revisões anteriores: três aplicações
React/Vite com `@originjs/vite-plugin-federation`, o shell como host dos remotes `userApp` e
`issueApp`. Ele não diz como o shell alterna entre as duas (por login, com eventos em `window`);
isso só aparece nos comentários do código, que viraram linhas (#7 a #10). O único ponto que destoa
é o comentário que chama de "Gateway" o endpoint consultado pelo shell, que é o auth-service (#6).

As cinco ocorrências `doc-*` (todas `doc-integration-technology`) estão nas linhas 1 a 3 da tabela:
README.md:3 e :12 na linha 1, README.md:25 e :234 na linha 2, e README.md:41 na linha 3.

Não viraram linha, no README: a lista de papéis da equipe (README.md:11-15), que descreve tarefas
das pessoas, inclusive "DevOps: Service orchestration, environment configuration, deployment"
(README.md:15), sem dizer como as unidades são implantadas; as portas e funções dos microsserviços
(README.md:19-22, 194-214, 233), que são só de backend; as bibliotecas do frontend (README.md:40-45),
que não dizem nada sobre as unidades como conjunto; as portas das aplicações (README.md:25-27), um
detalhe de infraestrutura; a segurança, incluindo "JWT-based authentication across all services" e
"CORS configuration for frontend access" (README.md:218-222); e as seções de funcionalidades,
aparência, testes, limitações e planos (README.md:154-190, 224-255). Os blocos de comando de
instalação, `.env` e execução (README.md:63-66, 69-89, 97-115, 121-149) não viram linha. Eles
mandam subir os seis processos em terminais separados, o shell em `npm run dev` e a user-app e a
issue-app em `npm run preview` (README.md:138-148), e abrir `http://localhost:3000` (README.md:152);
a revisão de build e deploy já os registrou na Leitura dela.

Foram lidos os comentários dos artefatos que as revisões anteriores citam: os três `vite.config.js`,
os três `package.json` de `client/`, client/shell-app/src/App.jsx e main.jsx, client/user-app/src/App.jsx
e UserComponent.jsx, client/issue-app/src/App.jsx, main.jsx e components/Header.jsx, e
server/package.json. Os `package.json` de `client/` não têm `description`, e a de server/package.json
é vazia (server/package.json:4). Não são arquiteturais: os comentários com o nome do arquivo
(client/shell-app/vite.config.js:27; client/user-app/vite.config.js:2, que dá o caminho errado
`user-app/src/vite.config.js`; client/issue-app/vite.config.js:1; client/user-app/src/App.jsx:1;
client/issue-app/src/App.jsx:2; client/issue-app/src/components/Header.jsx:1); os de porta
(client/shell-app/vite.config.js:24, dentro da configuração antiga toda comentada de :1-26, e :54;
client/issue-app/vite.config.js:8); "Initial check from GraphQL" (client/shell-app/src/App.jsx:45),
um detalhe da autenticação do shell; os de configuração do Apollo Client
(client/user-app/src/App.jsx:5, 17; client/issue-app/src/App.jsx:43); e os que separam rotas,
componentes e menus por papel dentro da issue-app (client/issue-app/src/App.jsx:17-38, 63-151, 184;
client/issue-app/src/components/Header.jsx:59-81) e as mutações da user-app
(client/user-app/src/UserComponent.jsx:8). Os comentários que repetem afirmações estão nos
parágrafos das linhas 2 e 6.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:3 | "built with microservices architecture and React Module Federation" | composição | corroborada | 3.4.2 (três linhas `@originjs/vite-plugin-federation`, Configurada `Yes`); 3.4.5 #1-#2; 3.4.3 (três microsserviços em `server/microservices/`) |
| 2 | README.md:24-27 | "Shell App (Port 3000): Main Module Federation host / User App (Port 3001): Authentication module / Issue App (Port 3002): Issue management module" | estrutura | corroborada | 3.4.3 (client/shell-app, client/user-app e client/issue-app `Yes`); 3.4.5 #1-#2; client/shell-app/vite.config.js:36-42 |
| 3 | README.md:41 | "Vite (Module Federation)" (a federação é feita com o Vite) | composição | corroborada | 3.4.2 (três linhas `@originjs/vite-plugin-federation`); client/shell-app/vite.config.js:30, 36; client/user-app/vite.config.js:5, 10; client/issue-app/vite.config.js:4, 14 |
| 4 | client/issue-app/vite.config.js:15 | "Unique name for Issue Microfrontend" | composição | corroborada | 3.4.5 #2; client/issue-app/vite.config.js:15; client/shell-app/vite.config.js:37, 41; client/user-app/vite.config.js:11 |
| 5 | client/issue-app/vite.config.js:18 | "Expose main microfrontend entrypoint" | composição | corroborada | 3.4.5 #2; client/issue-app/vite.config.js:17-18; client/shell-app/src/App.jsx:11 |
| 6 | client/shell-app/src/App.jsx:13 | "Check logged-in user from Gateway" (o shell consulta o usuário num gateway) | composição | contradita | client/shell-app/src/main.jsx:13-15; server/microservices/auth-service/config/config.js:9; 3.4.3 (server e os três microsserviços) |
| 7 | client/shell-app/src/App.jsx:30 | "Handle login from UserApp" | composição | corroborada | 3.4.4 (client/shell-app/src/App.jsx:42; client/user-app/src/UserComponent.jsx:56); 3.4.5 #4 |
| 8 | client/shell-app/src/App.jsx:36 | "Handle logout from other apps" | composição | corroborada | 3.4.4 (client/user-app/src/UserComponent.jsx:74; client/issue-app/src/components/Header.jsx:39); 3.4.5 #3-#4; client/shell-app/src/App.jsx:43 |
| 9 | client/shell-app/src/App.jsx:63 | "If not logged in → Show User Login App" | composição | corroborada | 3.4.4 (manual client/shell-app/src/App.jsx:64); 3.4.5 #1 |
| 10 | client/shell-app/src/App.jsx:66 | "After login → Show Issue Management App" | composição | corroborada | 3.4.4 (manual client/shell-app/src/App.jsx:67); 3.4.5 #2 |

## Observações

**1. README.md:3.** A frase de abertura diz que o sistema usa arquitetura de microsserviços e
"React Module Federation". As três aplicações de `client/` têm `@originjs/vite-plugin-federation`
configurado (3.4.2), e o shell carrega a user-app e a issue-app por federação (3.4.5 #1-#2). A
parte dos microsserviços é de backend: são os três serviços de `server/microservices/`, que a
revisão estrutural marcou como não frontend. "Frontend Development: React Module Federation"
(README.md:12) repete a afirmação, como papel da equipe.

**2. README.md:24-27.** A lista dá as três aplicações frontend e os papéis: o shell como host de
Module Federation, a user-app como módulo de autenticação e a issue-app como módulo de gestão de
ocorrências. É o que a revisão estrutural e a de composição registram: três unidades, com o shell
declarando os remotes `userApp` e `issueApp` (client/shell-app/vite.config.js:39-42), a user-app
servindo a tela de login e cadastro e a issue-app a gestão de ocorrências. As portas da lista
conferem com os scripts (3.4.6), mas não pesam na corroboração. Repetem a afirmação "3 Frontend
modules with Module Federation" (README.md:234), o comentário "Microfrontends" sobre os dois imports
remotos do shell, com os papéis "login/register" e "issue reporter" (client/shell-app/src/App.jsx:9-11),
e "Added Issue App" ao lado do remote `issueApp` (client/shell-app/vite.config.js:41).

**3. README.md:41.** Na pilha do frontend, o README põe o Module Federation entre parênteses ao
lado do Vite. A federação vem de um plugin do Vite, `@originjs/vite-plugin-federation`, importado e
chamado na configuração de cada aplicação (client/shell-app/vite.config.js:30, 36;
client/user-app/vite.config.js:5, 10; client/issue-app/vite.config.js:4, 14). O README não nomeia o
plugin, mas o mecanismo é o mesmo que a revisão de dependências registrou.

**4. client/issue-app/vite.config.js:15.** O comentário diz que `issueApp` é o nome único do
microfrontend da issue-app. Os três nomes de federação são distintos (`shellApp`, `userApp` e
`issueApp`; client/shell-app/vite.config.js:37; client/user-app/vite.config.js:11;
client/issue-app/vite.config.js:15), e o shell usa exatamente `issueApp` para declarar e importar o
remote (client/shell-app/vite.config.js:41; client/shell-app/src/App.jsx:11).

**5. client/issue-app/vite.config.js:18.** O comentário diz que a issue-app expõe o seu ponto de
entrada principal. A entrada exposta é `'./App': './src/App'` (client/issue-app/vite.config.js:17-18),
e é esse módulo que o shell importa e renderiza depois do login (client/shell-app/src/App.jsx:11, 67;
3.4.5 #2).

**6. client/shell-app/src/App.jsx:13.** O comentário diz que o shell verifica o usuário logado num
gateway, e "// Gateway" ao lado do endereço do Apollo Client do shell (client/shell-app/src/main.jsx:14)
repete a afirmação. O endereço é `http://localhost:4001/graphql` (client/shell-app/src/main.jsx:13-15),
a porta do auth-service (server/microservices/auth-service/config/config.js:9; README.md:20). O
snapshot não tem gateway: `server/` tem só o manifesto vazio e os três microsserviços (3.4.3). Há
sinais de um gateway na porta 4000 que não está no snapshot: um Apollo Client comentado da user-app,
com o comentário "Set up Apollo Client for the gateway" (client/user-app/src/App.jsx:17-22), a origem
`http://localhost:4000` no CORS do auth-service (server/microservices/auth-service/auth-microservice.js:160)
e o esquema montado como subgrafo (server/microservices/auth-service/auth-microservice.js:174). Mas o
código ativo do shell consulta o auth-service diretamente, e a afirmação é `contradita`.

**7. client/shell-app/src/App.jsx:30.** O comentário está no handler do evento `loginSuccess`, que o
shell escuta em `window` (client/shell-app/src/App.jsx:31-34, 42) e que a user-app dispara ao
concluir o login (client/user-app/src/UserComponent.jsx:56). É a relação de comunicação 3.4.5 #4.

**8. client/shell-app/src/App.jsx:36.** O comentário está no handler do evento `logout`
(client/shell-app/src/App.jsx:37-40, 43). As "other apps" são as duas unidades: a user-app dispara
`logout` na mutação de logout (client/user-app/src/UserComponent.jsx:74) e a issue-app pelo
cabeçalho (client/issue-app/src/components/Header.jsx:39), relações 3.4.5 #4 e #3.

**9. client/shell-app/src/App.jsx:63.** Sem login, o shell renderiza `<UserApp />`
(client/shell-app/src/App.jsx:64), o `./App` da user-app, que monta o formulário de login e cadastro
(client/user-app/src/App.jsx:31). Corresponde à linha manual da revisão de código-fonte e à relação
3.4.5 #1.

**10. client/shell-app/src/App.jsx:66.** Com login, o shell renderiza `<IssueApp>` e passa o usuário
da query `CurrentUser` (client/shell-app/src/App.jsx:67), o `./App` da issue-app. Corresponde à
linha manual da revisão de código-fonte e à relação 3.4.5 #2.

## Resumo

Afirmações: 10 (corroborada: 9, parcial: 0, contradita: 1, sem corroboração: 0). Temas: (estrutura: 1, composição: 9).

---
schema: 1
id: 1036507333
full_name: swtbhsmn/micro-frontend-demo
commit: 9cb91cec30b991952a8bb405e8362b064256a26e
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

# 136 — swtbhsmn/micro-frontend-demo

## Leitura do repositório

A única documentação é o `README.txt` da raiz, em inglês, com 18 linhas. O `artifacts.csv` não tem nenhum arquivo do tipo `documentation` (o `README.txt` vem com a coluna `artifact_types` vazia), e o `matches.csv` não tem ocorrências `doc-*`. Como o arquivo é prosa sobre o projeto como um todo, foi lido inteiro e entra na tabela, como na revisão do repositório 013. Ele diz que o repositório é uma demonstração de micro-frontends com Module Federation do webpack, nomeia as duas aplicações e seus papéis, ensina a rodá-las e diz que o host carrega o componente do remote (README.txt:1-14). Tudo isso confere com as revisões anteriores: duas unidades (`app1` e `app2`), uma relação host → remote por Module Federation, build separado em modo development e nenhum deploy observado.

Não viraram linha: os passos de execução (README.txt:7-13), que são instrução de execução — um terminal por pasta, `npm install` e `npm start`, primeiro o `app2` e depois o `app1` —, e que a revisão de build e deploy já usou para descrever a execução local; a ordem dos passos reflete que o host só compõe com o servidor do remote no ar (app1/webpack.config.js:31). Também não viraram linha as notas finais (README.txt:16-18): "minimal demo" é o tipo do repositório, "Node >= 18 and npm" é instalação e o ajuste de portas em `webpack.config.js` é detalhe de infraestrutura.

Foram lidos os artefatos que as revisões anteriores citam: os dois `package.json` (sem campo `description`; app1/package.json:1-21; app2/package.json:1-21), os dois `webpack.config.js`, os `index.js`, `bootstrap.js`, app1/src/App.jsx, app2/src/RemoteApp.jsx e os dois `public/index.html`. Nenhum deles tem comentário. Os textos de interface repetem os papéis do README — os títulos "App1 Host" e "App2 Remote" (app1/public/index.html:3; app2/public/index.html:3) e o cabeçalho "Host App (app1)" (app1/src/App.jsx:7) —, mas são texto da página, não documentação, e só são citados aqui.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.txt:1 | "Microfrontend Webpack Module Federation demo" | estrutura | corroborada | 3.4.3 (app1 e app2 `Yes`); 3.4.5 #1; app1/webpack.config.js:2,28; app2/webpack.config.js:2,28 |
| 2 | README.txt:3-5 | "Two apps: / - app1 (host) -> http://localhost:3001 / - app2 (remote) -> http://localhost:3002" | estrutura | corroborada | 3.4.3 (app1 e app2 `Yes`); 3.4.5 #1; 3.4.6 #1; 3.4.6 #2 |
| 3 | README.txt:14 | "app1 will open at http://localhost:3001 and load remote component from app2" | composição | corroborada | 3.4.5 #1; 3.4.4 (`src-remote-import`, app1/src/App.jsx:2); app1/src/App.jsx:2,8-10 |

## Observações

**1. README.txt:1.** O título diz que o projeto é uma demonstração de micro-frontends com Module Federation do webpack. A revisão estrutural registrou duas unidades frontend, `app1` e `app2`, e as duas configurações usam o `ModuleFederationPlugin` que vem no próprio pacote `webpack` (app1/webpack.config.js:2,28; app2/webpack.config.js:2,28), base da relação 3.4.5 #1. Por o plugin vir do `webpack`, e não de um pacote próprio, a revisão de dependências não tem linha de tecnologia; a tecnologia nomeada no título é a mesma que a revisão de composição registrou (`module-federation`), então não há divergência de nome.

**2. README.txt:3-5.** As duas aplicações existem, cada uma com pasta, `package.json` e configuração webpack próprios (3.4.3), e os papéis conferem: `app1` declara o remote `app2` (app1/webpack.config.js:30-31) e `app2` se publica com `remoteEntry.js` e expõe `./RemoteApp` (app2/webpack.config.js:29-32), relação 3.4.5 #1. As portas 3001 e 3002 são as dos servidores de desenvolvimento (app1/webpack.config.js:8-9; app2/webpack.config.js:8-9; app1/package.json:6; app2/package.json:6), registradas em 3.4.6 #1 e #2; são detalhe de infraestrutura e não mudam a afirmação. Os títulos das páginas e o cabeçalho do host repetem os papéis (ver Leitura).

**3. README.txt:14.** O host carrega em runtime o componente exposto pelo remote: `React.lazy(() => import('app2/RemoteApp'))` (app1/src/App.jsx:2), renderizado dentro de `Suspense` (app1/src/App.jsx:8-10), resolvido pelo `remoteEntry.js` em `http://localhost:3002` (app1/webpack.config.js:31). É a relação ativa 3.4.5 #1 e a construção `src-remote-import` da revisão de código-fonte. O componente remoto é só um `div` com uma frase (app2/src/RemoteApp.jsx:3-5). A abertura em `http://localhost:3001` é a do `webpack serve --open` na porta 3001 (app1/package.json:6).

## Resumo

Afirmações: 3 (corroborada: 3, parcial: 0, contradita: 0, sem corroboração: 0). Temas: (estrutura: 2, composição: 1).

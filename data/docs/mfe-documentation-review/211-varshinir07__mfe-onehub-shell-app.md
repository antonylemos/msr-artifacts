---
schema: 1
id: 996744917
full_name: varshinir07/mfe-onehub-shell-app
commit: 1ddddc4241157e335c1b6e39372f050aa1705c1d
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

# 211 — varshinir07/mfe-onehub-shell-app

## Leitura do repositório

O único arquivo `documentation` do `artifacts.csv` é o `README.md`, em inglês. Só as duas primeiras linhas são do projeto: o título "# mfe-onehub-shell" (README.md:1), que não faz afirmação, e a frase "MFE Remote App for OnehubShell" (README.md:2), que é a afirmação 1. Daí em diante é o README padrão do Create React App (README.md:4-74), que descreve `npm start`, `npm test`, `npm run build` e `npm run eject` e remete à documentação do CRA. Frases como "Builds the app for production to the `build` folder" e "Your app is ready to be deployed!" (README.md:27-31) são do template e não viram linha; a revisão de build e deploy já registrou que elas não conferem com o script real, que grava `dist/` em modo de desenvolvimento (package.json:20; src/webpack.config.js:7, 25-29).

A documentação que fala da arquitetura está nos comentários de `src/webpack.config.js` e numa linha de `src/pages/Dashboard.jsx`. Eles descrevem o que as revisões anteriores encontraram: uma aplicação que usa Module Federation, consome módulos de duas aplicações remotas fora do snapshot e compartilha `react` e `react-dom` como singleton (3.4.3; 3.4.5 #1-#2). O README diz o contrário quanto ao papel: chama o projeto de "Remote App", mas ele é o host `onehub`, que declara `remotes` e não expõe nada (src/webpack.config.js:72-92). A classificação já apontou essa divergência como sinal enganoso.

A mineração tem duas ocorrências `doc-mfe-term`, ambas no README: README.md:1 ("# mfe-onehub-shell") é o título e não faz afirmação; README.md:2 ("MFE Remote App for OnehubShell") é a afirmação 1.

Comentários e campos descritivos lidos: os comentários de `src/webpack.config.js`, dos quais só os de :71, :75 e :80 fazem afirmação sobre as unidades (#3 a #5); os demais tratam do build da própria aplicação (modo de desenvolvimento, :6; entrada, :9; servidor, :12-21; saída e `publicPath`, :24-28; loaders, :31-60; template HTML, :67; nome, :73; resolução e alias, :95-99); o comentário de src/pages/Dashboard.jsx:21 (#2); o `package.json`, sem `description` (package.json:1-51); e o texto de template do CRA em `public/index.html` (a `description` "Web site created using create-react-app", public/index.html:8-11, e os comentários de :13-16, :18-26 e :32-41), em `public/manifest.json` (public/manifest.json:2-3), em src/index.js:14-16 e em src/setupTests.js:1-4, sem afirmação.

## Afirmações

| # | Documento | Afirmação | Tema | Corroboração | Evidência |
|---|---|---|---|---|---|
| 1 | README.md:2 | "MFE Remote App for OnehubShell" | estrutura | contradita | 3.4.5 #1-#2; src/webpack.config.js:72-92 |
| 2 | src/pages/Dashboard.jsx:21 | "Using Card from Remote App" | composição | corroborada | 3.4.4 (src-remote-import src/pages/Dashboard.jsx:9; manual src/pages/Dashboard.jsx:22); 3.4.5 #1 |
| 3 | src/webpack.config.js:71 | "Module Federation configuration for micro-frontends" | composição | corroborada | 3.4.5 #1-#2; src/webpack.config.js:3, 72-92 |
| 4 | src/webpack.config.js:75 | "Remote apps to consume modules from" | composição | corroborada | 3.4.5 #1-#2; src/webpack.config.js:76-77; src/pages/Dashboard.jsx:3-9 |
| 5 | src/webpack.config.js:80 | "Share React and ReactDOM as singletons to avoid version conflicts" | composição | parcial | src/webpack.config.js:79-91 |

## Observações

**1. README.md:2.** A frase diz que o repositório é uma aplicação remote de micro-frontend, a ser consumida por um "OnehubShell". A parte "MFE" se confirma: o projeto participa de uma composição por Module Federation (3.4.5 #1-#2). O papel, não: o snapshot traz só o host, que se chama `onehub`, declara dois `remotes` e não tem `exposes` (src/webpack.config.js:72-92), e a revisão de composição o registra como origem das duas relações host → remote, sem nenhuma em que ele seja destino. Por isso a afirmação é `contradita`. O "OnehubShell" a que o README se refere é, pelo nome, o próprio projeto (o `name` do container é `onehub`, src/webpack.config.js:73; o título é "mfe-onehub-shell", README.md:1), o que reforça a leitura de que o rótulo "Remote" foi um engano do autor; a classificação registrou o mesmo.

**2. src/pages/Dashboard.jsx:21.** O comentário fica logo acima do `<Card>` e diz que o componente vem da aplicação remota. Confere: `Card` é carregado por `React.lazy(() => import('remote1/Card'))` (src/pages/Dashboard.jsx:9), e `remote1` é o container `subscription` em `http://localhost:3001/remoteEntry.js` (src/webpack.config.js:76). A revisão de código-fonte registra a carga e a renderização com as props `topic` e `description` (src/pages/Dashboard.jsx:22-25), e a de composição inclui essa linha na relação `.` → `subscription` (3.4.5 #1). O remote não está no snapshot; o que se confirma é o lado do host.

**3. src/webpack.config.js:71.** O comentário apresenta o bloco do `ModuleFederationPlugin` (src/webpack.config.js:3, 72-92) como configuração para micro-frontends. A tecnologia é a registrada pela revisão de composição para as duas relações (mecanismo `module-federation`, 3.4.5 #1-#2), e o host realmente compõe módulos de duas unidades externas (3.4.4). A revisão de dependências não tem linha porque o plugin vem do próprio `webpack` (`require('webpack').container`, src/webpack.config.js:3), sem pacote de federação no dependencies.csv.

**4. src/webpack.config.js:75.** O comentário diz que as entradas de `remotes` são aplicações remotas de que o host consome módulos. As duas entradas, `remote1: 'subscription@http://localhost:3001/remoteEntry.js'` e `remote2: 'ownership@http://localhost:3002/remoteEntry.js'` (src/webpack.config.js:76-77), são usadas pelos cinco `import('remote1/…')` e `import('remote2/…')` do Dashboard (src/pages/Dashboard.jsx:3-9), registrados nas relações 3.4.5 #1 e #2. Que são aplicações próprias, servidas em outras portas, fica no nível do que a configuração diz: as unidades não estão no snapshot (3.4.3, Notas).

**5. src/webpack.config.js:80.** O host declara `react` e `react-dom` como `singleton`, com `requiredVersion: '^19.1.0'` e `eager: true` (src/webpack.config.js:79-91). Compartilhar só se confirma quando ao menos duas unidades usam a biblioteca no snapshot, e os remotes `subscription` e `ownership` estão fora dele; não há como ver se eles declaram o mesmo `shared`. Confirma-se a parte do host, e a do outro lado não tem artefato: `parcial`. O motivo dado ("to avoid version conflicts") é o propósito usual do `singleton` e não tem verificação própria.

## Resumo

Afirmações: 5 (corroborada: 3, parcial: 1, contradita: 1, sem corroboração: 0). Temas: (estrutura: 1, composição: 4).

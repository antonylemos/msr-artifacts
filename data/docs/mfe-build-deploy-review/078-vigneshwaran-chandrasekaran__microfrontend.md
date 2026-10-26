---
schema: 1
id: 1206226526
full_name: vigneshwaran-chandrasekaran/microfrontend
commit: 28c70f8b2b748f07872a8dd1f56240d8a3415c05
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

# 078 — vigneshwaran-chandrasekaran/microfrontend

## Leitura do repositório

São cinco projetos npm independentes, sem workspace: cada um tem `package.json`, lockfile e
configuração de build próprios, e o script `build` de cada um gera um `dist` só dele
(`webpack --mode production` em host/package.json:8, react-mfe-1/package.json:8,
react-mfe-2/package.json:8 e vue-mfe/package.json:8; `ng build` em angular-mfe/package.json:8, com
saída em `dist/angular-mfe`, angular-mfe/angular.json:18). O `package.json` da raiz só orquestra:
instala cada projeto com `npm install --prefix` (package.json:7), dispara os builds dos quatro
remotes e depois o do host (package.json:9-10, 12) e, por fim, copia os cinco `dist` para um único
`dist` da raiz, o host na raiz e cada remote num subdiretório com o seu nome (package.json:11).

Há dois caminhos de publicação na Vercel, ambos no snapshot e sem CI, Dockerfile ou compose. O
`vercel.json` da raiz roda `install:all` e `build:all` e publica esse `dist` combinado, com um
rewrite para o `index.html` do host em rotas sem extensão (vercel.json:2-6). Ao mesmo tempo, cada
um dos cinco diretórios tem o seu `vercel.json`, que roda o `npm run build` do projeto e publica só
o `dist` dele (host/vercel.json:2-3, react-mfe-1/vercel.json:2-3, react-mfe-2/vercel.json:2-3,
vue-mfe/vercel.json:2-3, angular-mfe/vercel.json:2-3); os dos quatro remotes ainda liberam CORS para
o `remoteEntry.js` e os demais `.js` (por exemplo react-mfe-1/vercel.json:4-18), o que só faz
sentido se o remote for servido em outra origem que não a do host.

Os artefatos se contradizem quanto a qual dos dois caminhos está em uso. A configuração de
produção do host aponta os remotes para caminhos relativos do mesmo domínio,
`/react-mfe-1/remoteEntry.js` etc. (host/webpack.config.js:30-31, 34-40), e o remote Angular fixa
`publicPath: '/angular-mfe/'` em produção (angular-mfe/webpack.config.js:35-36); ambos só se
resolvem no layout do `dist` combinado da raiz. Já o comentário do cabeçalho do host diz que, em
produção, os endereços viriam de variáveis de ambiente de cada projeto Vercel (`REACT_MFE1_URL`
etc., host/webpack.config.js:8-14), mas o código não lê essas variáveis; o comentário seguinte
descreve o arranjo atual, por subdiretórios do mesmo domínio (host/webpack.config.js:17-19). O
README descreve só a publicação conjunta, um único projeto Vercel com raiz em `/`
(README.md:489-490, 534-536), e dá o endereço público https://microfrontend-beta.vercel.app
(README.md:473-485); por ser documentação, isso fica no texto e não decide a coluna Deploy. Os
`vercel.json` por diretório parecem resto de uma publicação separada anterior, mas o snapshot não
permite afirmar que estejam fora de uso.

As ocorrências `ops-deployment-file` são os seis `vercel.json`; as `ops-cors` são os cabeçalhos dos
quatro `vercel.json` de remote e os `headers` do `devServer`, que só valem em desenvolvimento
(host/webpack.config.js:56-58, react-mfe-1/webpack.config.js:19-21, react-mfe-2/webpack.config.js:18-20,
vue-mfe/webpack.config.js:20-22). As `ops-hosting` estão todas no README.md (linhas 3 a 535). As
`cfg-public-path` são o `publicPath: 'auto'` dos três remotes webpack (react-mfe-1/webpack.config.js:25,
react-mfe-2/webpack.config.js:24, vue-mfe/webpack.config.js:26) e o `publicPath` condicional do
Angular (angular-mfe/webpack.config.js:36). Não há backend nem servidor de API no snapshot. As duas
aplicações externas exibidas em iframe pelo host (Route Map e Multibank) estão em outros domínios e
fora do snapshot; não viram linha.

## Aplicações

| # | Aplicação | Build | Deploy | Onde é servida | Versionamento | Artefatos |
|---|---|---|---|---|---|---|
| 1 | angular-mfe | separado | Undetermined | `/angular-mfe/` no `dist` conjunto (package.json:11; host/webpack.config.js:31; angular-mfe/webpack.config.js:36); raiz do projeto Vercel próprio, domínio não registrado no snapshot (angular-mfe/vercel.json:2-3); `http://localhost:4200` em desenvolvimento (angular-mfe/angular.json:54) | No | angular-mfe/angular.json:12-18 (target `build` com webpack customizado e saída `dist/angular-mfe`); angular-mfe/package.json:8 (`ng build`); angular-mfe/vercel.json:2-3 (publica só `dist/angular-mfe`); package.json:9 (build disparado pela raiz); package.json:11 (cópia para `dist/angular-mfe`); vercel.json:2-3 (publicação conjunta do `dist`) |
| 2 | host | separado | Undetermined | `/` no `dist` conjunto (package.json:11; vercel.json:3-6); raiz do projeto Vercel próprio, domínio não registrado no snapshot (host/vercel.json:2-3); `http://localhost:3005` em desenvolvimento (host/webpack.config.js:54) | No | host/webpack.config.js:48-49 (configuração e entrada próprias); host/package.json:8 (`webpack --mode production`); host/vercel.json:2-3 (publica só `dist` do host); package.json:10 (build disparado pela raiz); package.json:11 (cópia para a raiz do `dist`); vercel.json:2-3 (publicação conjunta do `dist`) |
| 3 | react-mfe-1 | separado | Undetermined | `/react-mfe-1/` no `dist` conjunto (package.json:11; host/webpack.config.js:36); raiz do projeto Vercel próprio, domínio não registrado no snapshot (react-mfe-1/vercel.json:2-3); `http://localhost:3001` em desenvolvimento (react-mfe-1/webpack.config.js:17) | No | react-mfe-1/webpack.config.js:11-12 (configuração e entrada próprias); react-mfe-1/package.json:8 (`webpack --mode production`); react-mfe-1/vercel.json:2-18 (publica só `dist` do react-mfe-1, com CORS); package.json:9 (build disparado pela raiz); package.json:11 (cópia para `dist/react-mfe-1`); vercel.json:2-3 (publicação conjunta do `dist`) |
| 4 | react-mfe-2 | separado | Undetermined | `/react-mfe-2/` no `dist` conjunto (package.json:11; host/webpack.config.js:37); raiz do projeto Vercel próprio, domínio não registrado no snapshot (react-mfe-2/vercel.json:2-3); `http://localhost:3002` em desenvolvimento (react-mfe-2/webpack.config.js:16) | No | react-mfe-2/webpack.config.js:10-11 (configuração e entrada próprias); react-mfe-2/package.json:8 (`webpack --mode production`); react-mfe-2/vercel.json:2-18 (publica só `dist` do react-mfe-2, com CORS); package.json:9 (build disparado pela raiz); package.json:11 (cópia para `dist/react-mfe-2`); vercel.json:2-3 (publicação conjunta do `dist`) |
| 5 | vue-mfe | separado | Undetermined | `/vue-mfe/` no `dist` conjunto (package.json:11; host/webpack.config.js:38); raiz do projeto Vercel próprio, domínio não registrado no snapshot (vue-mfe/vercel.json:2-3); `http://localhost:3003` em desenvolvimento (vue-mfe/webpack.config.js:18) | No | vue-mfe/webpack.config.js:12-13 (configuração e entrada próprias); vue-mfe/package.json:8 (`webpack --mode production`); vue-mfe/vercel.json:2-18 (publica só `dist` do vue-mfe, com CORS); package.json:9 (build disparado pela raiz); package.json:11 (cópia para `dist/vue-mfe`); vercel.json:2-3 (publicação conjunta do `dist`) |

## Observações

**1. angular-mfe.** Build separado: o target `build` do Angular CLI, com o webpack parcial que
adiciona a federação, gera `dist/angular-mfe` só com esta aplicação (angular-mfe/angular.json:12-18;
angular-mfe/webpack.config.js:23-30). Deploy `Undetermined`: o angular-mfe/vercel.json:2-3 publica
esse diretório à parte, enquanto o vercel.json:2-3 da raiz o publica, copiado para
`dist/angular-mfe` (package.json:11), junto com as outras quatro. Das cinco, é a que mais depende do
layout conjunto: em produção o `publicPath` fixo `/angular-mfe/` (angular-mfe/webpack.config.js:36)
faz os chunks serem pedidos nesse subcaminho, que não existe se o projeto for publicado sozinho
na raiz de um domínio. A versão `1.0.0` (angular-mfe/package.json:3) não é usada na publicação.

**2. host.** Build separado: configuração webpack própria, em função do `--mode`
(host/webpack.config.js:23-24, 48-49), e script `build` próprio (host/package.json:8). Deploy
`Undetermined`: host/vercel.json:2-3 publica só o `dist` do host; o vercel.json da raiz o põe na
raiz do `dist` conjunto (package.json:11; vercel.json:3-6). Os remotes de produção estão gravados
no build do host como caminhos relativos do mesmo domínio (host/webpack.config.js:30-31, 34-40):
publicado sozinho, o host não encontraria os remotes, e trocar o endereço de um remote exige
reconstruir o host. O comentário sobre variáveis de ambiente por projeto Vercel
(host/webpack.config.js:8-14) não corresponde ao código. Sem versão própria usada na publicação
(host/package.json:3).

**3. react-mfe-1.** Build separado (react-mfe-1/webpack.config.js:11-12; react-mfe-1/package.json:8),
com `publicPath: 'auto'` (react-mfe-1/webpack.config.js:25), que deixa os chunks serem resolvidos a
partir de onde o `remoteEntry.js` for servido, de modo que o mesmo build serve aos dois caminhos.
Deploy `Undetermined`: react-mfe-1/vercel.json:2-3 o publica à parte, com CORS liberado para o
`remoteEntry.js` (react-mfe-1/vercel.json:4-18); o vercel.json da raiz o publica em
`/react-mfe-1/` do `dist` conjunto (package.json:11), que é o endereço que o host usa em produção
(host/webpack.config.js:36). Versão `1.0.0` (react-mfe-1/package.json:3) sem uso na publicação.

**4. react-mfe-2.** Mesmo arranjo do react-mfe-1: build próprio (react-mfe-2/webpack.config.js:10-11;
react-mfe-2/package.json:8) com `publicPath: 'auto'` (react-mfe-2/webpack.config.js:24);
publicação à parte por react-mfe-2/vercel.json:2-18 e conjunta em `/react-mfe-2/`
(package.json:11; host/webpack.config.js:37). Versão `1.0.0` (react-mfe-2/package.json:3) sem uso
na publicação.

**5. vue-mfe.** Mesmo arranjo dos remotes React, com vue-loader no build próprio
(vue-mfe/webpack.config.js:12-13, 37-55; vue-mfe/package.json:8) e `publicPath: 'auto'`
(vue-mfe/webpack.config.js:26); publicação à parte por vue-mfe/vercel.json:2-18 e conjunta em
`/vue-mfe/` (package.json:11; host/webpack.config.js:38). Versão `1.0.0` (vue-mfe/package.json:3)
sem uso na publicação.

## Resumo

Aplicações: 5. Build (separado: 5). Deploy (Undetermined: 5). Versionamento independente: 0.
